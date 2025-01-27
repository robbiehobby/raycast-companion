import { MenuBarExtra } from "@raycast/api";
import React, { useEffect, useState } from "react";

function Command() {
  const [name, setName] = useState<string | false>(false);

  useEffect(() => {
    async function getName() {
      const { execa } = await import("execa");
      try {
        const ssid = (await execa`/usr/sbin/ipconfig getsummary en0`.pipe`grep ${` SSID :`}`).stdout;
        setName(ssid.replace("SSID :", "").trim());
      } catch (_e) {
        setName("");
      }
    }
    getName();
  }, []);

  return <MenuBarExtra isLoading={!name} title={name || "Not connected"}></MenuBarExtra>;
}

export default Command;
