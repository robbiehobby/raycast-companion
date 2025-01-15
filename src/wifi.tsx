import { MenuBarExtra } from "@raycast/api";
import React, { useEffect, useState } from "react";
import { promisify } from "node:util";
import { exec } from "child_process";

const execPromise = promisify(exec);

function Command() {
  const [name, setName] = useState<string | false>(false);

  useEffect(() => {
    async function getName() {
      const { stdout } = await execPromise(
        `zsh -l -c "ipconfig getsummary en0" | awk -F ' SSID : '  '/ SSID : / {print $2}'`,
      );
      setName(stdout);
    }
    getName();
  }, []);

  return <MenuBarExtra isLoading={!name} title={name || "Not connected"}></MenuBarExtra>;
}

export default Command;
