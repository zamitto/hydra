import { useEffect, useState } from "react";
import { Button, CheckboxField, TextField } from "@renderer/components";

import * as styles from "./settings.css";
import { useTranslation } from "react-i18next";
import { UserPreferences } from "@types";

export function Settings() {
  const [form, setForm] = useState({
    downloadsPath: "",
    downloadNotificationsEnabled: false,
    repackUpdatesNotificationsEnabled: false,
    telemetryEnabled: false,
  });

  const { t } = useTranslation("settings");

  useEffect(() => {
    Promise.all([
      window.electron.getDefaultDownloadsPath(),
      window.electron.getUserPreferences(),
    ]).then(([path, userPreferences]) => {
      setForm({
        downloadsPath: userPreferences?.downloadsPath || path,
        downloadNotificationsEnabled:
          userPreferences?.downloadNotificationsEnabled,
        repackUpdatesNotificationsEnabled:
          userPreferences?.repackUpdatesNotificationsEnabled,
        telemetryEnabled: userPreferences?.telemetryEnabled,
      });
    });
  }, []);

  const updateUserPreferences = <T extends keyof UserPreferences>(
    field: T,
    value: UserPreferences[T]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    window.electron.updateUserPreferences({
      [field]: value,
    });
  };

  const handleChooseDownloadsPath = async () => {
    const { filePaths } = await window.electron.showOpenDialog({
      defaultPath: form.downloadsPath,
      properties: ["openDirectory"],
    });

    if (filePaths && filePaths.length > 0) {
      const path = filePaths[0];
      updateUserPreferences("downloadsPath", path);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.downloadsPathField}>
          <TextField
            label={t("downloads_path")}
            value={form.downloadsPath}
            readOnly
            disabled
          />

          <Button
            style={{ alignSelf: "flex-end" }}
            theme="outline"
            onClick={handleChooseDownloadsPath}
          >
            {t("change")}
          </Button>
        </div>

        <h3>{t("notifications")}</h3>

        <CheckboxField
          label={t("enable_download_notifications")}
          checked={form.downloadNotificationsEnabled}
          onChange={() =>
            updateUserPreferences(
              "downloadNotificationsEnabled",
              !form.downloadNotificationsEnabled
            )
          }
        />

        <CheckboxField
          label={t("enable_repack_list_notifications")}
          checked={form.repackUpdatesNotificationsEnabled}
          onChange={() =>
            updateUserPreferences(
              "repackUpdatesNotificationsEnabled",
              !form.repackUpdatesNotificationsEnabled
            )
          }
        />

        <h3>{t("telemetry")}</h3>

        <CheckboxField
          label={t("telemetry_description")}
          checked={form.telemetryEnabled}
          onChange={() =>
            updateUserPreferences("telemetryEnabled", !form.telemetryEnabled)
          }
        />
      </div>
    </section>
  );
}
