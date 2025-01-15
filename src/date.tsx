import React, { useState } from "react";
import { Action, ActionPanel, Color, List } from "@raycast/api";
import { parseDate } from "chrono-node";
import dayjs from "dayjs";
import advancedFormatPlugin from "dayjs/plugin/advancedFormat";
import weekOfYearPlugin from "dayjs/plugin/weekOfYear";
import utcPlugin from "dayjs/plugin/utc";
import timezonePlugin from "dayjs/plugin/timezone";
import relativeTimePlugin from "dayjs/plugin/relativeTime";

dayjs.extend(advancedFormatPlugin);
dayjs.extend(weekOfYearPlugin);
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);
dayjs.extend(relativeTimePlugin);

function handleConversion(input: string, timezone: string) {
  if (input.match(/^\d+$/)) {
    input = new Date(parseInt(input, 10) * 1000).toString();
  }
  const parsedDate = parseDate(input);
  if (!parsedDate || parsedDate.toString() === "Invalid Date") return [];

  const date = dayjs(parsedDate).tz(timezone);
  const fromNow = date.fromNow();
  return [
    { label: "Unix (s)", value: date.unix() },
    { label: "Unix (ms)", value: date.valueOf() },
    { label: "Human Readable", value: date.format("MMMM Do, YYYY [at] hh:mm:ss A (zzz)") },
    { label: "DateTime", value: date.format("YYYY-MM-DD HH:mm:ss") },
    { label: "UTC", value: date.toString() },
    { label: "ISO 8601", value: date.toISOString() },
    { label: "Week of Year", value: date.format("wo dddd [of] YYYY") },
    { label: "In / Ago", value: String(fromNow).charAt(0).toUpperCase() + String(fromNow).slice(1) },
  ];
}

function Command() {
  const [input, setInput] = useState("now");
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [items, setItems] = useState<{ label: string; value: string | number }[]>([]);

  async function onTimezoneChange(value: string) {
    setTimezone(value);
    setItems(handleConversion(input, value));
  }
  async function onSearchTextChange(value: string) {
    setInput(value);
    setItems(handleConversion(value, timezone));
  }

  return (
    <List
      searchBarPlaceholder="Date"
      filtering={false}
      searchText={input}
      onSearchTextChange={onSearchTextChange}
      searchBarAccessory={
        <List.Dropdown tooltip="Timezone" onChange={onTimezoneChange} defaultValue={timezone}>
          {Intl.supportedValuesOf("timeZone").map((zone, index) => (
            <List.Dropdown.Item key={index} value={zone} title={zone} />
          ))}
        </List.Dropdown>
      }
    >
      {items.map((item, index) => (
        <List.Item
          key={index}
          title={`${item.value}`}
          accessories={[{ tag: { value: item.label, color: Color.SecondaryText } }]}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard content={item.value} />
              <Action.Paste content={item.value} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

export default Command;
