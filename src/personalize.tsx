import React, { useEffect, useState } from "react";
import { Action, ActionPanel, getPreferenceValues, Grid, Icon, showToast, Toast } from "@raycast/api";
import { promises as fs } from "node:fs";
import path from "node:path";
import getAllApplications, { ExtendedApplication } from "./utils/applications.ts";
import runTask from "./utils/task.ts";

const options = getPreferenceValues();
const script = `
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
    await showToast({ title: "Personalizing...", style: Toast.Style.Animated });
    await Promise.all(
      items.map(async (item) => {
        const exec = script.trim().replace("$1", item.icon).replace("$2", item.app.path);
        await runTask([`sudo osascript <<EOF >/dev/null || die\n${exec}\nEOF`]);
      }),
    );
    await runTask(["killall", "Dock"]);
    await showToast({ title: "Personalization complete" });
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
