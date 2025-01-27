import React, { useEffect, useState } from "react";
import { Action, ActionPanel, getPreferenceValues, Grid, Icon, showToast, Toast } from "@raycast/api";
import { promises as fs } from "node:fs";
import path from "node:path";
import getAllApplications, { ExtendedApplication } from "./utils/applications.ts";

const options = getPreferenceValues();
const osaScript = `
use framework "Foundation"
set sourcePath to "$1"
set destPath to "$2"
set imageData to (current application's NSImage's alloc()'s initWithContentsOfFile:sourcePath)
(current application's NSWorkspace's sharedWorkspace()'s setIcon:imageData forFile:destPath options:2)`;

type ItemData = { icon: string; app: ExtendedApplication };

function Command() {
  const [state, setState] = useState<ItemData[]>([]);

  useEffect(() => {
    async function getIcons() {
      const files = await fs.readdir(options.folder, { withFileTypes: true });
      const apps = await getAllApplications();
      const items: ItemData[] = [];

      files.forEach((file) => {
        const icon = path.join(file.path, file.name);
        const iconName = path.basename(file.name, ".icns");
        const matches = apps.filter((app) => app.name === iconName);
        matches.forEach((app) => items.push({ icon, app }));
      });

      setState(items);
    }
    getIcons();
  }, []);

  async function handleApply(items: ItemData[]) {
    const { execa } = await import("execa");
    await showToast({ title: "Applying icons...", style: Toast.Style.Animated });
    await Promise.all(
      items.map(async (item) => {
        const input = osaScript.trim().replace("$1", item.icon).replace("$2", item.app.path);
        await execa({ input })`/usr/bin/sudo /usr/bin/osascript`;
      }),
    );
    await execa`killall Dock`;
    await showToast({ title: "Icons applied" });
  }

  return (
    <Grid columns={5}>
      {state.map((item, index) => (
        <Grid.Item
          key={index}
          title={item.app.name}
          content={item.icon}
          actions={
            <ActionPanel>
              <Action title="Apply Icon" icon={Icon.Check} onAction={() => handleApply([item])} />
              <Action title="Apply All Icons" icon={Icon.Check} onAction={() => handleApply(state)} />
            </ActionPanel>
          }
        />
      ))}
    </Grid>
  );
}

export default Command;
