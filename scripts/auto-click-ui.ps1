# Auto-click the lvgljs SDL window at client coordinates (1024x600 display space).
#
# Usage (attach to a running lvgljs.exe):
#   .\scripts\auto-click-ui.ps1 -X 780 -Y 410 -Repeat 20 -IntervalMs 400
#
# Launch widgets demo, wait for window, then click:
#   .\scripts\auto-click-ui.ps1 -Launch -Demo .\demo\widgets\index.js -X 780 -Y 410 -Repeat 30
#
# Preset (auto-launches widgets demo if lvgljs is not already running):
#   .\scripts\auto-click-ui.ps1 -SequenceFile scripts/data/widgets-birthday-leak.json -LoopCount 30
#
# Tips:
#   - X/Y are pixels inside the LVGL client area (origin top-left), not screen coords.
#   - Use -ShowClientRect to print the window size once focused.
#   - widgets profile tab is roughly bottom-right; birthday input ~ (780, 410) on 1024x600.

[CmdletBinding()]
param(
    [int]$X = 0,
    [int]$Y = 0,
    [int]$Repeat = 1,
    [int]$IntervalMs = 300,
    [int]$InitialDelayMs = 500,
    [int]$WaitForWindowMs = 15000,
    [int]$LaunchSettleMs = 2500,
    [string]$ProcessName = "lvgljs",
    [string]$ExePath = ".\build\x64-pc-windows-msvc\lvgljs.exe",
    [string]$Demo = "",
    [switch]$Launch,
    [switch]$AttachOnly,
    [string]$SequenceJson = "",
    [string]$SequenceFile = "",
    [int]$LoopCount = 1,
    [switch]$ShowClientRect,
    [switch]$NoActivate
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type @"
using System;
using System.Runtime.InteropServices;
using System.Text;

public static class LvglClickNative
{
    public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);

    [StructLayout(LayoutKind.Sequential)]
    public struct POINT
    {
        public int X;
        public int Y;
    }

    [StructLayout(LayoutKind.Sequential)]
    public struct RECT
    {
        public int Left;
        public int Top;
        public int Right;
        public int Bottom;
    }

    [StructLayout(LayoutKind.Sequential)]
    public struct INPUT
    {
        public uint type;
        public MOUSEINPUT mi;
    }

    [StructLayout(LayoutKind.Sequential)]
    public struct MOUSEINPUT
    {
        public int dx;
        public int dy;
        public uint mouseData;
        public uint dwFlags;
        public uint time;
        public IntPtr dwExtraInfo;
    }

    public const uint INPUT_MOUSE = 0;
    public const uint MOUSEEVENTF_MOVE = 0x0001;
    public const uint MOUSEEVENTF_LEFTDOWN = 0x0002;
    public const uint MOUSEEVENTF_LEFTUP = 0x0004;
    public const uint MOUSEEVENTF_ABSOLUTE = 0x8000;

    [DllImport("user32.dll")]
    public static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);

    [DllImport("user32.dll")]
    public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);

    [DllImport("user32.dll")]
    public static extern bool IsWindowVisible(IntPtr hWnd);

    [DllImport("user32.dll", CharSet = CharSet.Unicode)]
    public static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);

    [DllImport("user32.dll")]
    public static extern bool GetClientRect(IntPtr hWnd, out RECT lpRect);

    [DllImport("user32.dll")]
    public static extern bool ClientToScreen(IntPtr hWnd, ref POINT lpPoint);

    [DllImport("user32.dll")]
    public static extern bool SetForegroundWindow(IntPtr hWnd);

    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

    [DllImport("user32.dll")]
    public static extern uint SendInput(uint nInputs, INPUT[] pInputs, int cbSize);

    [DllImport("user32.dll")]
    public static extern int GetSystemMetrics(int nIndex);

    public static IntPtr FindMainWindowForPid(uint pid)
    {
        IntPtr found = IntPtr.Zero;
        EnumWindows((hWnd, _) =>
        {
            if (!IsWindowVisible(hWnd))
            {
                return true;
            }

            uint windowPid;
            GetWindowThreadProcessId(hWnd, out windowPid);
            if (windowPid != pid)
            {
                return true;
            }

            var title = new StringBuilder(256);
            GetWindowText(hWnd, title, title.Capacity);
            var text = title.ToString();
            if (text.Length == 0)
            {
                return true;
            }

            found = hWnd;
            return false;
        }, IntPtr.Zero);
        return found;
    }

    public static void MoveMouseAbsolute(int screenX, int screenY)
    {
        int screenW = GetSystemMetrics(0);
        int screenH = GetSystemMetrics(1);
        int nx = (int)Math.Round(screenX * 65535.0 / Math.Max(screenW - 1, 1));
        int ny = (int)Math.Round(screenY * 65535.0 / Math.Max(screenH - 1, 1));

        var inputs = new INPUT[1];
        inputs[0].type = INPUT_MOUSE;
        inputs[0].mi.dx = nx;
        inputs[0].mi.dy = ny;
        inputs[0].mi.dwFlags = MOUSEEVENTF_MOVE | MOUSEEVENTF_ABSOLUTE;
        SendInput(1, inputs, Marshal.SizeOf(typeof(INPUT)));
    }

    public static void LeftClick()
    {
        var down = new INPUT[1];
        down[0].type = INPUT_MOUSE;
        down[0].mi.dwFlags = MOUSEEVENTF_LEFTDOWN;
        SendInput(1, down, Marshal.SizeOf(typeof(INPUT)));

        var up = new INPUT[1];
        up[0].type = INPUT_MOUSE;
        up[0].mi.dwFlags = MOUSEEVENTF_LEFTUP;
        SendInput(1, up, Marshal.SizeOf(typeof(INPUT)));
    }
}
"@

function Resolve-RepoRoot {
    $root = Split-Path -Parent $PSScriptRoot
    if (-not (Test-Path (Join-Path $root "lv_conf.h"))) {
        throw "Expected repo root at $root"
    }
    return $root
}

function Wait-LvglWindow {
    param(
        [uint32]$ProcessId,
        [int]$TimeoutMs
    )

    $deadline = [DateTime]::UtcNow.AddMilliseconds($TimeoutMs)
    while ([DateTime]::UtcNow -lt $deadline) {
        $hwnd = [LvglClickNative]::FindMainWindowForPid($ProcessId)
        if ($hwnd -ne [IntPtr]::Zero) {
            return $hwnd
        }
        Start-Sleep -Milliseconds 200
    }
    throw "Timed out after ${TimeoutMs}ms waiting for lvgljs window (pid=$ProcessId)."
}

function Get-ClientSize {
    param([IntPtr]$Hwnd)

    $rect = New-Object LvglClickNative+RECT
    if (-not [LvglClickNative]::GetClientRect($Hwnd, [ref]$rect)) {
        throw "GetClientRect failed."
    }
    return @{
        Width  = $rect.Right - $rect.Left
        Height = $rect.Bottom - $rect.Top
    }
}

function Send-ClientClick {
    param(
        [IntPtr]$Hwnd,
        [int]$ClientX,
        [int]$ClientY,
        [switch]$Activate
    )

    if ($Activate) {
        [void][LvglClickNative]::ShowWindow($Hwnd, 9) # SW_RESTORE
        [void][LvglClickNative]::SetForegroundWindow($Hwnd)
        Start-Sleep -Milliseconds 120
    }

    $point = New-Object LvglClickNative+POINT
    $point.X = $ClientX
    $point.Y = $ClientY
    if (-not [LvglClickNative]::ClientToScreen($Hwnd, [ref]$point)) {
        throw "ClientToScreen failed for ($ClientX, $ClientY)."
    }

    [LvglClickNative]::MoveMouseAbsolute($point.X, $point.Y)
    Start-Sleep -Milliseconds 30
    [LvglClickNative]::LeftClick()
}

function Get-StepIntProperty {
    param(
        [object]$Step,
        [string]$Name,
        [int]$Default = 0
    )

    $prop = $Step.PSObject.Properties[$Name]
    if ($null -eq $prop) {
        return $Default
    }
    return [int]$prop.Value
}

function Get-ClickSequence {
    if ($SequenceFile) {
        $path = if ([System.IO.Path]::IsPathRooted($SequenceFile)) { $SequenceFile } else { Join-Path $repoRoot $SequenceFile }
        if (-not (Test-Path $path)) {
            throw "Sequence file not found: $path"
        }
        return @(Get-Content -Raw $path | ConvertFrom-Json)
    }

    if ($SequenceJson) {
        return @($SequenceJson | ConvertFrom-Json)
    }

    return @(
        [pscustomobject]@{
            x          = $X
            y          = $Y
            repeat     = $Repeat
            intervalMs = $IntervalMs
            delayMs    = $InitialDelayMs
        }
    )
}

function Start-LvglProcess {
    param(
        [string]$DemoPath
    )

    if (-not (Test-Path $ExePath)) {
        throw "lvgljs exe not found: $ExePath"
    }

    $runArgs = @("run")
    if ($DemoPath) {
        $runArgs += (Resolve-Path $DemoPath).Path
    }

    Write-Host "Launching: $ExePath $($runArgs -join ' ')"
    return Start-Process -FilePath (Resolve-Path $ExePath).Path -ArgumentList $runArgs -PassThru
}

function Get-DefaultDemoPath {
    $widgetsDemo = Join-Path $repoRoot "demo\widgets\index.js"
    if (Test-Path $widgetsDemo) {
        return $widgetsDemo
    }
    return ""
}

$repoRoot = Resolve-RepoRoot
Set-Location $repoRoot

$proc = $null
$autoLaunched = $false
$shouldLaunch = $Launch
if (-not $shouldLaunch -and -not $AttachOnly) {
    $existing = Get-Process -Name $ProcessName -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $existing) {
        $shouldLaunch = $true
        if (-not $Demo) {
            $Demo = Get-DefaultDemoPath
        }
        Write-Host "No running '$ProcessName' process; auto-launching demo."
    } else {
        $proc = $existing
    }
}

if ($shouldLaunch) {
    if (-not $Demo) {
        $Demo = Get-DefaultDemoPath
    }
    $proc = Start-LvglProcess -DemoPath $Demo
    $autoLaunched = $true
    if ($WaitForWindowMs -lt 20000) {
        $WaitForWindowMs = 20000
    }
    Start-Sleep -Milliseconds 500
} elseif (-not $proc) {
    $existing = Get-Process -Name $ProcessName -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $existing) {
        throw "No running process named '$ProcessName'. Start lvgljs first, omit -AttachOnly, or pass -Launch."
    }
    $proc = $existing
}

$hwnd = Wait-LvglWindow -ProcessId $proc.Id -TimeoutMs $WaitForWindowMs
Write-Host "Window handle: $hwnd (pid=$($proc.Id))"

$client = Get-ClientSize -Hwnd $hwnd
Write-Host "Client size: $($client.Width) x $($client.Height)"

if ($autoLaunched -and $LaunchSettleMs -gt 0) {
    Write-Host "Waiting ${LaunchSettleMs}ms for demo to render..."
    Start-Sleep -Milliseconds $LaunchSettleMs
}

if ($ShowClientRect) {
    return
}

$activate = -not $NoActivate
$steps = Get-ClickSequence

for ($loop = 1; $loop -le $LoopCount; $loop++) {
    if ($LoopCount -gt 1) {
        Write-Host "Sequence loop $loop/$LoopCount"
    }

    foreach ($step in $steps) {
        $delay = Get-StepIntProperty -Step $step -Name delayMs -Default 0
        if ($delay -gt 0) {
            Start-Sleep -Milliseconds $delay
        }

        $sx = Get-StepIntProperty -Step $step -Name x
        $sy = Get-StepIntProperty -Step $step -Name y
        $count = Get-StepIntProperty -Step $step -Name repeat -Default 1
        $gap = Get-StepIntProperty -Step $step -Name intervalMs -Default $IntervalMs

        if ($sx -lt 0 -or $sy -lt 0) {
            throw "Click coordinates must be non-negative (got $sx, $sy)."
        }

        Write-Host "Clicking client ($sx, $sy) x$count every ${gap}ms"
        for ($i = 1; $i -le $count; $i++) {
            Send-ClientClick -Hwnd $hwnd -ClientX $sx -ClientY $sy -Activate:($activate -and ($i -eq 1))
            Write-Host "  click $i/$count"
            if ($i -lt $count -and $gap -gt 0) {
                Start-Sleep -Milliseconds $gap
            }
        }
    }
}

Write-Host "Done."
