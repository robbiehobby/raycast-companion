import { getSelectedText, Clipboard, closeMainWindow, popToRoot, Toast, showToast } from "@raycast/api";

async function Command() {
  try {
    const text = await getSelectedText();
    let transformedText = text.toUpperCase();
    if (text === transformedText) transformedText = text.toLowerCase();
    await Clipboard.paste(transformedText);
    await popToRoot();
    await closeMainWindow();
  } catch (_error) {
    await showToast({ style: Toast.Style.Failure, title: "Text could not be transformed" });
  }
}

export default Command;
