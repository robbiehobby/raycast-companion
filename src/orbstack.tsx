import { MenuBarExtra } from "@raycast/api";
import React, { useEffect, useState } from "react";
import { homedir } from "node:os";
import { readFile } from "fs/promises";
import path from "node:path";

function Command() {
  const [name, setName] = useState<string | false>(false);

  useEffect(() => {
    async function getName() {
      try {
        setName(path.basename(JSON.parse(await readFile(`${homedir()}/.orbstack/vmconfig.json`, "utf8")).data_dir));
      } catch (_e) {
        setName("Default");
      }
    }
    getName();
  }, []);

  return <MenuBarExtra isLoading={!name} title={name || ""}></MenuBarExtra>;
}

export default Command;
