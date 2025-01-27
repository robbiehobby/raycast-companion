"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/orbstack.tsx
var orbstack_exports = {};
__export(orbstack_exports, {
  default: () => orbstack_default
});
module.exports = __toCommonJS(orbstack_exports);
var import_api = require("@raycast/api");
var import_react = require("react");
var import_node_os = require("node:os");
var import_promises = require("fs/promises");
var import_node_path = __toESM(require("node:path"));
function Command() {
  const [name, setName] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    async function getName() {
      try {
        setName(import_node_path.default.basename(JSON.parse(await (0, import_promises.readFile)(`${(0, import_node_os.homedir)()}/.orbstack/vmconfig.json`, "utf8")).data_dir));
      } catch (_e) {
        setName("Default");
      }
    }
    getName();
  }, []);
  return /* @__PURE__ */ _jsx(import_api.MenuBarExtra, { isLoading: !name, title: name || "" });
}
var orbstack_default = Command;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL29yYnN0YWNrLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgTWVudUJhckV4dHJhIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGhvbWVkaXIgfSBmcm9tIFwibm9kZTpvc1wiO1xuaW1wb3J0IHsgcmVhZEZpbGUgfSBmcm9tIFwiZnMvcHJvbWlzZXNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuZnVuY3Rpb24gQ29tbWFuZCgpIHtcbiAgY29uc3QgW25hbWUsIHNldE5hbWVdID0gdXNlU3RhdGU8c3RyaW5nIHwgZmFsc2U+KGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGFzeW5jIGZ1bmN0aW9uIGdldE5hbWUoKSB7XG4gICAgICB0cnkge1xuICAgICAgICBzZXROYW1lKHBhdGguYmFzZW5hbWUoSlNPTi5wYXJzZShhd2FpdCByZWFkRmlsZShgJHtob21lZGlyKCl9Ly5vcmJzdGFjay92bWNvbmZpZy5qc29uYCwgXCJ1dGY4XCIpKS5kYXRhX2RpcikpO1xuICAgICAgfSBjYXRjaCAoX2UpIHtcbiAgICAgICAgc2V0TmFtZShcIkRlZmF1bHRcIik7XG4gICAgICB9XG4gICAgfVxuICAgIGdldE5hbWUoKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiA8TWVudUJhckV4dHJhIGlzTG9hZGluZz17IW5hbWV9IHRpdGxlPXtuYW1lIHx8IFwiXCJ9PjwvTWVudUJhckV4dHJhPjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tbWFuZDtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBNkI7QUFDN0IsbUJBQTJDO0FBQzNDLHFCQUF3QjtBQUN4QixzQkFBeUI7QUFDekIsdUJBQWlCO0FBRWpCLFNBQVMsVUFBVTtBQUNqQixRQUFNLENBQUMsTUFBTSxPQUFPLFFBQUksdUJBQXlCLEtBQUs7QUFFdEQsOEJBQVUsTUFBTTtBQUNkLG1CQUFlLFVBQVU7QUFDdkIsVUFBSTtBQUNGLGdCQUFRLGlCQUFBQSxRQUFLLFNBQVMsS0FBSyxNQUFNLFVBQU0sMEJBQVMsT0FBRyx3QkFBUSxDQUFDLDRCQUE0QixNQUFNLENBQUMsRUFBRSxRQUFRLENBQUM7QUFBQSxNQUM1RyxTQUFTLElBQUk7QUFDWCxnQkFBUSxTQUFTO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBQ0EsWUFBUTtBQUFBLEVBQ1YsR0FBRyxDQUFDLENBQUM7QUFFTCxTQUFPLHFCQUFDLDJCQUFhLFdBQVcsQ0FBQyxNQUFNLE9BQU8sUUFBUSxJQUFJO0FBQzVEO0FBRUEsSUFBTyxtQkFBUTsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
