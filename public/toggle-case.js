"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/toggle-case.tsx
var toggle_case_exports = {};
__export(toggle_case_exports, {
  default: () => toggle_case_default
});
module.exports = __toCommonJS(toggle_case_exports);
var import_api = require("@raycast/api");
async function Command() {
  try {
    const text = await (0, import_api.getSelectedText)();
    let transformedText = text.toUpperCase();
    if (text === transformedText) transformedText = text.toLowerCase();
    await import_api.Clipboard.paste(transformedText);
    await (0, import_api.popToRoot)();
    await (0, import_api.closeMainWindow)();
  } catch (_error) {
    await (0, import_api.showToast)({ style: import_api.Toast.Style.Failure, title: "Text could not be transformed" });
  }
}
var toggle_case_default = Command;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3RvZ2dsZS1jYXNlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgZ2V0U2VsZWN0ZWRUZXh0LCBDbGlwYm9hcmQsIGNsb3NlTWFpbldpbmRvdywgcG9wVG9Sb290LCBUb2FzdCwgc2hvd1RvYXN0IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuXG5hc3luYyBmdW5jdGlvbiBDb21tYW5kKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHRleHQgPSBhd2FpdCBnZXRTZWxlY3RlZFRleHQoKTtcbiAgICBsZXQgdHJhbnNmb3JtZWRUZXh0ID0gdGV4dC50b1VwcGVyQ2FzZSgpO1xuICAgIGlmICh0ZXh0ID09PSB0cmFuc2Zvcm1lZFRleHQpIHRyYW5zZm9ybWVkVGV4dCA9IHRleHQudG9Mb3dlckNhc2UoKTtcbiAgICBhd2FpdCBDbGlwYm9hcmQucGFzdGUodHJhbnNmb3JtZWRUZXh0KTtcbiAgICBhd2FpdCBwb3BUb1Jvb3QoKTtcbiAgICBhd2FpdCBjbG9zZU1haW5XaW5kb3coKTtcbiAgfSBjYXRjaCAoX2Vycm9yKSB7XG4gICAgYXdhaXQgc2hvd1RvYXN0KHsgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsIHRpdGxlOiBcIlRleHQgY291bGQgbm90IGJlIHRyYW5zZm9ybWVkXCIgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tbWFuZDtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF5RjtBQUV6RixlQUFlLFVBQVU7QUFDdkIsTUFBSTtBQUNGLFVBQU0sT0FBTyxVQUFNLDRCQUFnQjtBQUNuQyxRQUFJLGtCQUFrQixLQUFLLFlBQVk7QUFDdkMsUUFBSSxTQUFTLGdCQUFpQixtQkFBa0IsS0FBSyxZQUFZO0FBQ2pFLFVBQU0scUJBQVUsTUFBTSxlQUFlO0FBQ3JDLGNBQU0sc0JBQVU7QUFDaEIsY0FBTSw0QkFBZ0I7QUFBQSxFQUN4QixTQUFTLFFBQVE7QUFDZixjQUFNLHNCQUFVLEVBQUUsT0FBTyxpQkFBTSxNQUFNLFNBQVMsT0FBTyxnQ0FBZ0MsQ0FBQztBQUFBLEVBQ3hGO0FBQ0Y7QUFFQSxJQUFPLHNCQUFROyIsCiAgIm5hbWVzIjogW10KfQo=
