import React, { useEffect, useMemo, useRef, useState } from "react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router";
import {
  Arc,
  Button,
  Checkbox,
  CreateStyle,
  Dimensions,
  I18nProvider,
  Render,
  Slider,
  Text,
  useI18n,
  useT,
  View,
} from "lvgljs-ui";

const { width, height } = Dimensions.window;

declare const require: any;
const messages = (locale: string) => {
  if (locale === "zh") return require("./i18n/zh.json");
  return require("./i18n/en.json");
};

function Header({
  title,
  autoFocusBack,
}: {
  title: string;
  autoFocusBack?: boolean;
}) {
  const t = useT();
  const navigate = useNavigate();

  return (
    <View style={style.header}>
      <Button
        autoFocus={autoFocusBack}
        style={style.backBtn}
        onFocusedStyle={style.focused}
        onClick={() => navigate(-1)}
      >
        <Text style={style.backText}>{t("header.back")}</Text>
      </Button>
      <Text style={style.headerTitle}>{title}</Text>
    </View>
  );
}

function Page1List() {
  const t = useT();
  const items = useMemo(() => Array.from({ length: 40 }).map((_, i) => i + 1), []);

  return (
    <View style={style.pageRoot}>
      <Header title={t("p1.title")} autoFocusBack={false} />

      <View style={style.content}>
        <View style={style.scrollBox}>
          {items.map((n) => (
            <View
              key={n}
              autoFocus={n === 1}
              addToFocusGroup
              onFocusedStyle={style.focused}
              style={style.listRow}
              onClick={() => {
                // no-op (demo)
              }}
            >
              <Text style={style.rowText}>{t("p1.item", { n })}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function Page2Info() {
  const pageCount = 4;
  const pagerRef = useRef<any>();
  const pageRefs = useRef<any[]>([]);

  const [active, setActive] = useState(0);
  const t = useT();

  const pageColors = useMemo(
    () => ["red", "blue", "green", "orange"],
    []
  );

  const scrollTo = (idx: number) => {
    if (idx < 0 || idx >= pageCount) return;
    setActive(idx);
    const target = pageRefs.current[idx];
    target?.scrollIntoView?.();
  };

  useEffect(() => {
    scrollTo(0);
  }, []);

  return (
    <View style={style.pageRoot}>
      <Header title={t("p2.title")} autoFocusBack />
      <View
        ref={pagerRef}
        style={style.pager}
      >
        {Array.from({ length: pageCount }).map((_, i) => (
          <View
            onFocusedStyle={style.pageFocused}
            addToFocusGroup
            key={i}
            ref={(ins) => (pageRefs.current[i] = ins)}
            style={[
              style.page,
              { "background-color": pageColors[i % pageColors.length] },
            ]}
          >
            <Text style={style.pageTitle}>Page {i + 1}</Text>
            <Text style={style.pageDesc}>
              flex-row + scroll-snap-x + scrollIntoView()
            </Text>
          </View>
        ))}
      </View>

      <View style={style.controls}>
        <Button
          style={style.navBtn}
          onClick={() => scrollTo(active - 1)}
        >
          <Text>{"<"}</Text>
        </Button>

        <View style={style.dots}>
          {Array.from({ length: pageCount }).map((_, i) => (
            <View
              key={i}
              style={[
                style.dot,
                i === active ? style.dotActive : style.dotInactive,
              ]}
            />
          ))}
        </View>

        <Button
          style={style.navBtn}
          onClick={() => scrollTo(active + 1)}
        >
          <Text>{">"}</Text>
        </Button>
      </View>
    </View>
  );
}

function Page3Controls() {
  const t = useT();
  const [slider, setSlider] = useState(30);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  return (
    <View style={style.pageRoot}>
      <Header title={t("p3.title")} autoFocusBack />

      <View style={style.content}>
        <View style={style.scrollBox}>
          <Text style={style.sectionTitle}>{t("p3.slider")}</Text>
          <Slider
            style={style.slider}
            indicatorStyle={style.sliderIndicator}
            knobStyle={style.sliderKnob}
            onKnobPressedStyle={style.sliderKnobPressed}
            onIndicatorPressedStyle={style.sliderIndicatorPressed}
            range={[0, 100]}
            value={slider}
            onChange={(e) => setSlider(e.value)}
          />
          <Text style={style.rowText}>
            {t("p3.currentValue", { value: Math.round(slider) })}
          </Text>

          <View style={style.divider} />

          <Text style={style.sectionTitle}>{t("p3.checkbox")}</Text>
          <Checkbox
            checked={checked1}
            text={t("p3.option1")}
            onChange={(e) => setChecked1(!!e.checked)}
          />
          <Checkbox
            checked={checked2}
            text={t("p3.option2")}
            onChange={(e) => setChecked2(!!e.checked)}
          />

          <View style={style.divider} />

          <Text style={style.sectionTitle}>{t("p3.buttonText")}</Text>
          <Button
            style={style.actionBtn}
            onFocusedStyle={style.focused}
            onClick={() => {
              setSlider(50);
              setChecked1(false);
              setChecked2(true);
            }}
          >
            <Text style={style.actionBtnText}>{t("p3.reset")}</Text>
          </Button>

          <Text style={style.hintText}>{t("p3.hint")}</Text>
        </View>
      </View>
    </View>
  );
}

function Page4Countdown() {
  const t = useT();
  const total = 60;
  const [remain, setRemain] = useState(total);

  useEffect(() => {
    setRemain(total);
    const t: ReturnType<typeof setInterval> = setInterval(() => {
      setRemain((r) => (r <= 0 ? 0 : r - 1));
    }, 1000);
    return () => clearInterval(t as any);
  }, []);

  const elapsed = total - remain;
  const angle = Math.floor((elapsed / total) * 360);
  return (
    <View style={style.pageRoot}>
      <Header title={t("p4.title")} autoFocusBack />

      <View style={style.centerContent}>
        <Arc
          style={style.arc}
          indicatorStyle={style.arcIndicator}
          knobStyle={style.arcKnobHidden}
          range={[0, total]}
          value={elapsed}
          rotation={270}
          backgroundStartAngle={0}
          backgroundEndAngle={360}
          startAngle={0}
          endAngle={angle}
          mode="normal"
          changeRate={360}
          onChange={() => {
            // keep non-interactive for this demo
          }}
        />
        <Text style={style.bigText}>{t("p4.time", { remain })}</Text>
        <Button
          style={style.actionBtn}
          onFocusedStyle={style.focused}
          onClick={() => setRemain(total)}
        >
          <Text style={style.actionBtnText}>{t("p4.restart")}</Text>
        </Button>
      </View>
    </View>
  );
}

function LangSwitcher() {
  const t = useT();
  const { locale, setLocale } = useI18n();
  return (
    <View style={style.langBar}>
      <Text style={style.langLabel}>{t("nav.lang")}</Text>
      <Button
        style={[style.langBtn, locale === "zh" ? style.langBtnActive : style.langBtnInactive]}
        onFocusedStyle={style.focused}
        onClick={() => setLocale("zh")}
      >
        <Text style={[style.langBtnText, locale === "zh" ? style.langBtnTextActive : style.langBtnTextInactive]}>
          中文
        </Text>
      </Button>
      <Button
        style={[style.langBtn, locale === "en" ? style.langBtnActive : style.langBtnInactive]}
        onFocusedStyle={style.focused}
        onClick={() => setLocale("en")}
      >
        <Text style={[style.langBtnText, locale === "en" ? style.langBtnTextActive : style.langBtnTextInactive]}>
          EN
        </Text>
      </Button>
    </View>
  );
}

function Home() {
  const t = useT();
  const navigate = useNavigate();
  const btnW = Math.floor((width - 24 * 2 - 12) / 2);
  const btnH = 72;

  return (
    <View style={style.pageRoot}>
      <View style={style.homeHeader}>
        <Text style={style.homeTitle}>{t("nav.title")}</Text>
        <Text style={style.homeSubTitle}>{t("nav.subTitle")}</Text>
        <LangSwitcher />
      </View>

      <View style={style.homeGrid}>
        <Button autoFocus
          style={[style.homeBtn, { width: btnW, height: btnH }]}
          onFocusedStyle={style.focused}
          onClick={() => navigate("/p1")}
        >
          <Text style={style.homeBtnText}>{t("nav.page1")}</Text>
        </Button>
        <Button
          style={[style.homeBtn, { width: btnW, height: btnH }]}
          onFocusedStyle={style.focused}
          onClick={() => navigate("/p2")}
        >
          <Text style={style.homeBtnText}>{t("nav.page2")}</Text>
        </Button>
        <Button
          style={[style.homeBtn, { width: btnW, height: btnH }]}
          onFocusedStyle={style.focused}
          onClick={() => navigate("/p3")}
        >
          <Text style={style.homeBtnText}>{t("nav.page3")}</Text>
        </Button>
        <Button
          style={[style.homeBtn, { width: btnW, height: btnH }]}
          onFocusedStyle={style.focused}
          onClick={() => navigate("/p4")}
        >
          <Text style={style.homeBtnText}>{t("nav.page4")}</Text>
        </Button>
      </View>
    </View>
  );
}

function App() {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/p1" element={<Page1List />} />
        <Route path="/p2" element={<Page2Info />} />
        <Route path="/p3" element={<Page3Controls />} />
        <Route path="/p4" element={<Page4Countdown />} />
      </Routes>
    </MemoryRouter>
  );
}

function Root() {
  return (
    <I18nProvider messages={messages} defaultLocale="en" fallbackLocale="en">
      <App />
    </I18nProvider>
  );
}

const style = CreateStyle({
  pageRoot: {
    width,
    height,
    padding: 0,
    "background-color": "black",
    display: "flex",
    "flex-direction": "column",
    overflow: "hidden",
  },

  header: {
    width,
    height: 52,
    display: "flex",
    "flex-direction": "row",
    "align-items": "center",
    "background-color": "0x202020",
  },
  backBtn: {
    width: 44,
    height: 36,
    "border-radius": 10,
    "background-color": "0x404040",
    margin: "0 8px",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
  },
  backText: { "text-color": "white", "font-size": 18 },
  headerTitle: { "text-color": "white", "font-size": 16 },

  content: {
    width,
    height: height - 52,
    padding: 12,
    display: "flex",
    "flex-direction": "column",
  },
  centerContent: {
    width,
    height: height - 52,
    display: "flex",
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center",
  },

  focused: {
    "border-width": 3,
    "border-color": "0x00bcd4",
  },

  scrollBox: {
    width: width - 24,
    height: height - 52 - 24,
    padding: 8,
    "background-color": "0x101010",
    "border-radius": 10,
    overflow: 0, // make scrollable
    "overflow-scrolling": 1,
    display: "flex",
    "flex-direction": "column",
  },

  listRow: {
    width: "100%",
    height: 44,
    "border-radius": 10,
    "background-color": "0x2a2a2a",
    margin: "0 0 8px 0",
    padding: "0 10px",
    display: "flex",
    "align-items": "center",
    "justify-content": "flex-start",
    "scroll-on-focus": 1,
  },
  rowText: { "text-color": "white", "font-size": 14 },

  infoCard: {
    width: width - 24,
    height: height - 52 - 140,
    padding: 12,
    "background-color": "0x101010",
    "border-radius": 12,
  },
  infoTitle: { "text-color": "white", "font-size": 18, "padding-bottom": 8 },
  infoBody: { "text-color": "0xd0d0d0", "font-size": 14 },
  infoControls: {
    width: width - 24,
    height: 60,
    margin: "10px 0 0 0",
    display: "flex",
    "flex-direction": "row",
    "justify-content": "space-between",
    "align-items": "center",
  },
  navBtn: {
    width: 60,
    height: 50,
    "border-radius": 25,
    "background-color": "white",
  },
  navBtnText: { "text-color": "black", "font-size": 18 },
  dots: {
    display: "flex",
    "flex-flow": 0, // row
    "justify-content": 3,
    "align-items": 2,
    width: width - 140,
    height: 50,
  },
  dot: {
    width: 10,
    height: 10,
    "border-radius": 0x7fff,
  },
  dotActive: {
    "background-color": "white",
    opacity: 255,
  },
  dotInactive: {
    "background-color": "grey",
    opacity: 80,
  },
  pageFocused: {
    "background-color": "white",
    opacity: 255,
  },
  // Horizontal scroll container
  pager: {
    width,
    height: height - 80,
    "border-width": 0,
    "border-radius": 0,

    display: "flex",
    "flex-direction": "column",

    overflow: 0, // 0 -> add_flag(SCROLLABLE)
    "overflow-scrolling": 1,

    "scroll-snap-x": 3, // LV_SCROLL_SNAP_CENTER (this repo lvgl: NONE=0 START=1 END=2 CENTER=3)
  },
  page: {
    width,
    height: height - 80,
    "border-radius": 0,
    "border-width": 0,
    "padding": 16,
    "scroll-enable-snap": 1,
  },
  pageTitle: {
    "text-color": "white",
  },
  pageDesc: {
    "text-color": "white",
  },
  controls: {
    width,
    height: 80,
    display: "flex",
    "flex-flow": 0, // row
    "justify-content": 3, // space-evenly
    "align-items": 2, // center
    "background-color": "grey",
  },
  debugBar: {
    width,
    height: 40,
    "background-color": "black",
  },
  debugText: {
    "text-color": "white",
  },

  sectionTitle: {
    "text-color": "white",
    "font-size": 16,
    "padding-bottom": 6,
  },
  divider: {
    width: "100%",
    height: 1,
    "background-color": "0x303030",
    margin: "10px 0",
  },
  slider: {
    "background-color": "0x404040",
    "border-radius": 0x7fff,
    padding: "-2px 0",
  },
  sliderIndicator: { "background-color": "0x00bcd4", "border-radius": 0x7fff },
  sliderIndicatorPressed: { "background-color": "0x00838F" },
  sliderKnob: {
    "background-color": "white",
    "border-width": 2,
    "border-color": "0x00bcd4",
    "border-radius": 0x7fff,
    padding: 6,
  },
  sliderKnobPressed: { "border-color": "0x00838F", "background-color": "0x00838F" },

  actionBtn: {
    width: width - 24,
    height: 44,
    "border-radius": 12,
    "background-color": "white",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    margin: "6px 0 0 0",
  },
  actionBtnText: { "text-color": "black", "font-size": 14 },
  hintText: {
    width: "100%",
    "text-color": "0xb0b0b0",
    "font-size": 12,
    "padding-top": 10,
  },

  arc: {
    width: 220,
    height: 220,
    "arc-width": 18,
    "arc-color": "red",
    "arc-rounded": true,
    "background-color": "black",
  },
  arcIndicator: { "arc-width": 18, "arc-color": "0x00bcd4", "arc-rounded": true },
  arcKnobHidden: { width: 1, height: 1, opacity: 0 },
  bigText: { "text-color": "black", "font-size": 26, "padding-top": 10 },

  homeHeader: {
    width,
    height: 100,
    padding: "18px 24px 0 24px",
  },
  homeTitle: { "text-color": "white", "font-size": 20 },
  homeSubTitle: { "text-color": "0xb0b0b0", "font-size": 12, "padding-top": 6 },
  langBar: {
    width: "100%",
    height: 32,
    display: "flex",
    "flex-direction": "row",
    "align-items": "center",
    "justify-content": "flex-start",
    margin: "10px 0 0 0",
  },
  langLabel: { "text-color": "0xb0b0b0", "font-size": 12, padding: "0 8px 0 0" },
  langBtn: {
    width: 56,
    height: 26,
    "border-radius": 10,
    margin: "0 8px 0 0",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
  },
  langBtnActive: { "background-color": "white" },
  langBtnInactive: { "background-color": "0x1d1d1d" },
  langBtnText: { "font-size": 12 },
  langBtnTextActive: { "text-color": "black" },
  langBtnTextInactive: { "text-color": "white" },
  homeGrid: {
    width,
    height: height - 100,
    padding: "0 24px",
    display: "flex",
    "flex-direction": "row",
    "flex-wrap": "wrap",
    "justify-content": "space-between",
    "align-content": "flex-start",
  },
  homeBtn: {
    "background-color": "0x1d1d1d",
    "border-radius": 14,
    margin: "0 0 12px 0",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
  },
  homeBtnText: { "text-color": "white", "font-size": 16 },
});

Render.render(<Root />);


