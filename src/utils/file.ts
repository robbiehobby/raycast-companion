type File = { mime?: string; extension?: string };

export async function getFileInfo(file: string) {
  const { execa } = await import("execa");
  const data: File = {};

  let process;
  process = await execa`/usr/bin/file -b ${file} --mime-type`;
  data.mime = process.stdout;
  process = await execa`/usr/bin/file -b ${file} --extension`;
  data.extension = process.stdout;

  return data;
}

export function getDataUri(base64: string, info?: File) {
  return `data:${info?.mime};base64,${base64}`;
}
