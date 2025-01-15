import runTask from "./task.ts";

type File = { mime?: string; extension?: string };

export async function getFileInfo(file: string) {
  const data: File = {};
  data.mime = await runTask(["file", "-b", file, "--mime-type"]);
  data.extension = await runTask(["file", "-b", file, "--extension"]);
  return data;
}

export function getDataUri(base64: string, info?: File) {
  return `data:${info?.mime};base64,${base64}`;
}
