import React from "react";
import ReactDOM from "react-dom/client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Provider } from "react-redux";
import LanguageDetector from "i18next-browser-languagedetector";
import { HashRouter, Route, Routes } from "react-router-dom";

import { init } from "@sentry/electron/renderer";
import { init as reactInit } from "@sentry/react";

import "@fontsource/fira-mono/400.css";
import "@fontsource/fira-mono/500.css";
import "@fontsource/fira-mono/700.css";
import "@fontsource/fira-sans/400.css";
import "@fontsource/fira-sans/500.css";
import "@fontsource/fira-sans/700.css";
import "react-loading-skeleton/dist/skeleton.css";

import { App } from "./app";
import {
  Home,
  Downloads,
  GameDetails,
  SearchResults,
  Settings,
  Catalogue,
} from "@renderer/pages";

import { store } from "./store";

import * as resources from "@locales";

if (import.meta.env.RENDERER_VITE_SENTRY_DSN) {
  init(
    {
      dsn: import.meta.env.RENDERER_VITE_SENTRY_DSN,
      beforeSend: async (event) => {
        const userPreferences = await window.electron.getUserPreferences();

        if (userPreferences?.telemetryEnabled) return event;
        return null;
      },
    },
    reactInit
  );
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    window.electron.updateUserPreferences({ language: i18n.language });
  });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/catalogue" Component={Catalogue} />
            <Route path="/downloads" Component={Downloads} />
            <Route path="/game/:shop/:objectID" Component={GameDetails} />
            <Route path="/search" Component={SearchResults} />
            <Route path="/settings" Component={Settings} />
          </Routes>
        </App>
      </HashRouter>
      {/* <RouterProvider router={router} /> */}
    </Provider>
  </React.StrictMode>
);
