import { Action, ActionPanel, Detail, Form, useNavigation } from "@raycast/api";
import React, { useState } from "react";
import useEncoder from "./utils/encoder.ts";
import truncateText from "./utils/truncate.ts";

function Command() {
  const [source, setSource] = useState("text");
  const { encode, decode } = useEncoder();
  const { push } = useNavigation();

  async function handleEncodeDecode(values: { op: string; type: string; input: string | string[] }) {
    const { op, type, input } = values;
    const data = type === "file" ? input[0] : input;
    const result = op === "encode" ? await encode(type, data as string) : await decode(type, data as string);

    let preview = `\`\`\`\n${truncateText(result.text)}\n\`\`\``;
    if (result.file && result.text.match(/^image\//)) preview = `![](${result.data})`;

    push(
      <Detail
        markdown={preview}
        actions={
          <ActionPanel>
            <Action.CopyToClipboard content={result.file ? { file: result.file } : result.text} />
            {result.data && <Action.CopyToClipboard title="Copy Data to Clipboard" content={result.data} />}
          </ActionPanel>
        }
      />,
    );
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={handleEncodeDecode} />
        </ActionPanel>
      }
    >
      <Form.Dropdown id="op">
        <Form.Dropdown.Item value="encode" title="Encode" />
        <Form.Dropdown.Item value="decode" title="Decode" />
      </Form.Dropdown>
      <Form.Dropdown id="type" onChange={setSource}>
        <Form.Dropdown.Item value="text" title="Plain Text" />
        <Form.Dropdown.Item value="file" title="File" />
      </Form.Dropdown>
      {source === "text" && <Form.TextArea id="input" />}
      {source === "file" && <Form.FilePicker id="input" title="" allowMultipleSelection={false} />}
    </Form>
  );
}

export default Command;
