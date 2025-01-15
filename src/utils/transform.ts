import { promises as fs } from "fs";
import path from "node:path";
import crypto from "node:crypto";
import { environment } from "@raycast/api";
import { useEffect } from "react";
import { getDataUri, getFileInfo } from "./file.ts";

const tmp = path.join(environment.supportPath, "transform");
fs.mkdir(tmp, { recursive: true });

type TransformResult = { text: string; data?: string; file?: string };

function useTransform() {
  useEffect(() => {
    return () => {
      async function housekeeping() {
        (await fs.readdir(tmp)).forEach((file) => fs.rm(path.join(tmp, file)));
      }
      housekeeping();
    };
  }, []);

  async function encode(type: string, data: string): Promise<TransformResult> {
    if (type === "text") return { text: Buffer.from(data).toString("base64") };
    const text = Buffer.from(await fs.readFile(data)).toString("base64");
    return { text, data: getDataUri(text, await getFileInfo(data)) };
  }

  async function decode(type: string, data: string): Promise<TransformResult> {
    const result =
      type === "text"
        ? Buffer.from(data.replace(/^data:.*;base64,/, ""), "base64")
        : Buffer.from(await fs.readFile(data, "utf8"), "base64");

    const file = path.join(tmp, crypto.randomUUID());
    await fs.writeFile(file, result, "utf8");
    const info = await getFileInfo(file);

    if (info.mime === "image/svg+xml") info.extension = "svg";
    if (info.extension !== "???") {
      await fs.rename(file, `${file}.${info.extension}`);
      return {
        text: `${info.mime}`,
        file: `${file}.${info.extension}`,
        data: getDataUri(Buffer.from(result).toString("base64"), info),
      };
    }

    await fs.rm(file);
    return { text: result.toString() };
  }

  return { encode, decode };
}

export default useTransform;
