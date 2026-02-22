import React from "react";
import { MemoryRouter, Route, Routes } from "react-router";
import { I18nProvider, Render } from "lvgljs-ui";
import { HomePage } from "./pages/HomePage";
import { LogListPage } from "./pages/LogListPage";
import { LogDetailPage } from "./pages/LogDetailPage";
import { DeviceInfoPage } from "./pages/DeviceInfoPage";
import { DeviceStatusPage } from "./pages/DeviceStatusPage";
import { SettingsPage } from "./pages/SettingsPage";
import { LanguageSettingsPage } from "./pages/LanguageSettingsPage";
import { CountdownSettingsPage } from "./pages/CountdownSettingsPage";
import { ExportLogsPage } from "./pages/ExportLogsPage";
import { ClearLogsPage } from "./pages/ClearLogsPage";

declare const require: any;
const messages = (locale: string) => {
  if (locale === "en") return require("./i18n/en.json");
  if (locale === "ja") return require("./i18n/ja.json");
  return require("./i18n/zh.json");
};

function App() {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logs" element={<LogListPage />} />
        <Route path="/logs/:id" element={<LogDetailPage />} />
        <Route path="/device-info" element={<DeviceInfoPage />} />
        <Route path="/device-status" element={<DeviceStatusPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/language" element={<LanguageSettingsPage />} />
        <Route path="/settings/countdown" element={<CountdownSettingsPage />} />
        <Route path="/settings/export-logs" element={<ExportLogsPage />} />
        <Route path="/settings/clear-logs" element={<ClearLogsPage />} />
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

Render.render(<Root />);
