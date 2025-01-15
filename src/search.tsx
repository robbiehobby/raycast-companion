import { Action, ActionPanel, List, popToRoot } from "@raycast/api";
import React, { useEffect, useState } from "react";
import getAllApplications, { ExtendedApplication } from "./utils/applications.ts";

function sortApps(apps: ExtendedApplication[]) {
  return apps.sort((a, b) =>
    a.name.localeCompare(b.name, Intl.DateTimeFormat().resolvedOptions().locale, {
      sensitivity: "base",
    }),
  );
}

function Command() {
  const [apps, setApps] = useState<ExtendedApplication[]>([]);

  useEffect(() => {
    async function getApps() {
      setApps(sortApps(await getAllApplications()));
    }
    getApps();
  }, []);

  async function onTypeChange(value: string) {
    setApps(sortApps((await getAllApplications()).filter((app) => (value === "all" ? true : app.type === value))));
  }

  return (
    <List
      searchBarAccessory={
        <List.Dropdown tooltip="Type" onChange={onTypeChange}>
          <List.Dropdown.Item title="All" value="all" />
          <List.Dropdown.Item title="System" value="system" />
          <List.Dropdown.Item title="User" value="user" />
        </List.Dropdown>
      }
    >
      {apps.map((app) => (
        <List.Item
          key={app.bundleId}
          title={app.name}
          subtitle={app.bundleId}
          icon={{ fileIcon: app.path }}
          keywords={[app.bundleId ? app.bundleId : ""]}
          accessories={(app.type === "user" && [{ tag: "User Installed" }]) || []}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard
                title="Copy Bundle ID to Clipboard"
                content={app.bundleId ? app.bundleId : ""}
                onCopy={() => popToRoot()}
              />
              <Action.Paste
                title="Paste Bundle ID to Active App"
                content={app.bundleId ? app.bundleId : ""}
                onPaste={() => popToRoot()}
              />
              <Action.CopyToClipboard
                title="Copy Path to Clipboard"
                content={app.path}
                onCopy={() => popToRoot()}
                shortcut={{ modifiers: ["opt", "cmd"], key: "c" }}
              />
              <Action.Paste
                title="Paste Path to Active App"
                content={app.path}
                onPaste={() => popToRoot()}
                shortcut={{ modifiers: ["opt", "cmd"], key: "v" }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

export default Command;
