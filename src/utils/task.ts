import { promisify } from "node:util";
import { exec } from "child_process";
import { quote } from "shell-quote";
import { showFailureToast } from "@raycast/utils";

const execPromise = promisify(exec);

async function runTask(args: string[], options?: { cwd?: string; json?: boolean; silent?: boolean }) {
  try {
    const escaped = `"${quote(args)}"`.replace(/^""/, '"').replace(/""$/, '"');
    const process = await execPromise(`/bin/zsh -l -c ${escaped}`, {
      cwd: options?.cwd?.length ? options.cwd : "",
    });
    if (options?.json === true) return JSON.parse(process.stdout);
    return process.stdout.trim();
  } catch (error) {
    const _error = error as { stderr: string };
    if (!options?.silent) {
      await showFailureToast(error, { title: _error.stderr });
    }
    return false;
  }
}

export default runTask;
