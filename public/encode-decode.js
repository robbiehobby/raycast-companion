"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// node_modules/is-plain-obj/index.js
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
var init_is_plain_obj = __esm({
  "node_modules/is-plain-obj/index.js"() {
  }
});

// node_modules/execa/lib/arguments/file-url.js
var import_node_url, safeNormalizeFileUrl, normalizeDenoExecPath, isDenoExecPath, normalizeFileUrl;
var init_file_url = __esm({
  "node_modules/execa/lib/arguments/file-url.js"() {
    import_node_url = require("node:url");
    safeNormalizeFileUrl = (file, name) => {
      const fileString = normalizeFileUrl(normalizeDenoExecPath(file));
      if (typeof fileString !== "string") {
        throw new TypeError(`${name} must be a string or a file URL: ${fileString}.`);
      }
      return fileString;
    };
    normalizeDenoExecPath = (file) => isDenoExecPath(file) ? file.toString() : file;
    isDenoExecPath = (file) => typeof file !== "string" && file && Object.getPrototypeOf(file) === String.prototype;
    normalizeFileUrl = (file) => file instanceof URL ? (0, import_node_url.fileURLToPath)(file) : file;
  }
});

// node_modules/execa/lib/methods/parameters.js
var normalizeParameters;
var init_parameters = __esm({
  "node_modules/execa/lib/methods/parameters.js"() {
    init_is_plain_obj();
    init_file_url();
    normalizeParameters = (rawFile, rawArguments = [], rawOptions = {}) => {
      const filePath = safeNormalizeFileUrl(rawFile, "First argument");
      const [commandArguments, options] = isPlainObject(rawArguments) ? [[], rawArguments] : [rawArguments, rawOptions];
      if (!Array.isArray(commandArguments)) {
        throw new TypeError(`Second argument must be either an array of arguments or an options object: ${commandArguments}`);
      }
      if (commandArguments.some((commandArgument) => typeof commandArgument === "object" && commandArgument !== null)) {
        throw new TypeError(`Second argument must be an array of strings: ${commandArguments}`);
      }
      const normalizedArguments = commandArguments.map(String);
      const nullByteArgument = normalizedArguments.find((normalizedArgument) => normalizedArgument.includes("\0"));
      if (nullByteArgument !== void 0) {
        throw new TypeError(`Arguments cannot contain null bytes ("\\0"): ${nullByteArgument}`);
      }
      if (!isPlainObject(options)) {
        throw new TypeError(`Last argument must be an options object: ${options}`);
      }
      return [filePath, normalizedArguments, options];
    };
  }
});

// node_modules/execa/lib/utils/uint-array.js
var import_node_string_decoder, objectToString, isArrayBuffer, isUint8Array, bufferToUint8Array, textEncoder, stringToUint8Array, textDecoder, uint8ArrayToString, joinToString, uint8ArraysToStrings, joinToUint8Array, stringsToUint8Arrays, concatUint8Arrays, getJoinLength;
var init_uint_array = __esm({
  "node_modules/execa/lib/utils/uint-array.js"() {
    import_node_string_decoder = require("node:string_decoder");
    ({ toString: objectToString } = Object.prototype);
    isArrayBuffer = (value) => objectToString.call(value) === "[object ArrayBuffer]";
    isUint8Array = (value) => objectToString.call(value) === "[object Uint8Array]";
    bufferToUint8Array = (buffer) => new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    textEncoder = new TextEncoder();
    stringToUint8Array = (string) => textEncoder.encode(string);
    textDecoder = new TextDecoder();
    uint8ArrayToString = (uint8Array) => textDecoder.decode(uint8Array);
    joinToString = (uint8ArraysOrStrings, encoding) => {
      const strings = uint8ArraysToStrings(uint8ArraysOrStrings, encoding);
      return strings.join("");
    };
    uint8ArraysToStrings = (uint8ArraysOrStrings, encoding) => {
      if (encoding === "utf8" && uint8ArraysOrStrings.every((uint8ArrayOrString) => typeof uint8ArrayOrString === "string")) {
        return uint8ArraysOrStrings;
      }
      const decoder = new import_node_string_decoder.StringDecoder(encoding);
      const strings = uint8ArraysOrStrings.map((uint8ArrayOrString) => typeof uint8ArrayOrString === "string" ? stringToUint8Array(uint8ArrayOrString) : uint8ArrayOrString).map((uint8Array) => decoder.write(uint8Array));
      const finalString = decoder.end();
      return finalString === "" ? strings : [...strings, finalString];
    };
    joinToUint8Array = (uint8ArraysOrStrings) => {
      if (uint8ArraysOrStrings.length === 1 && isUint8Array(uint8ArraysOrStrings[0])) {
        return uint8ArraysOrStrings[0];
      }
      return concatUint8Arrays(stringsToUint8Arrays(uint8ArraysOrStrings));
    };
    stringsToUint8Arrays = (uint8ArraysOrStrings) => uint8ArraysOrStrings.map((uint8ArrayOrString) => typeof uint8ArrayOrString === "string" ? stringToUint8Array(uint8ArrayOrString) : uint8ArrayOrString);
    concatUint8Arrays = (uint8Arrays) => {
      const result = new Uint8Array(getJoinLength(uint8Arrays));
      let index = 0;
      for (const uint8Array of uint8Arrays) {
        result.set(uint8Array, index);
        index += uint8Array.length;
      }
      return result;
    };
    getJoinLength = (uint8Arrays) => {
      let joinLength = 0;
      for (const uint8Array of uint8Arrays) {
        joinLength += uint8Array.length;
      }
      return joinLength;
    };
  }
});

// node_modules/execa/lib/methods/template.js
var import_node_child_process, isTemplateString, parseTemplates, parseTemplate, splitByWhitespaces, DELIMITERS, ESCAPE_LENGTH, concatTokens, parseExpression, getSubprocessResult;
var init_template = __esm({
  "node_modules/execa/lib/methods/template.js"() {
    import_node_child_process = require("node:child_process");
    init_is_plain_obj();
    init_uint_array();
    isTemplateString = (templates) => Array.isArray(templates) && Array.isArray(templates.raw);
    parseTemplates = (templates, expressions) => {
      let tokens = [];
      for (const [index, template] of templates.entries()) {
        tokens = parseTemplate({
          templates,
          expressions,
          tokens,
          index,
          template
        });
      }
      if (tokens.length === 0) {
        throw new TypeError("Template script must not be empty");
      }
      const [file, ...commandArguments] = tokens;
      return [file, commandArguments, {}];
    };
    parseTemplate = ({ templates, expressions, tokens, index, template }) => {
      if (template === void 0) {
        throw new TypeError(`Invalid backslash sequence: ${templates.raw[index]}`);
      }
      const { nextTokens, leadingWhitespaces, trailingWhitespaces } = splitByWhitespaces(template, templates.raw[index]);
      const newTokens = concatTokens(tokens, nextTokens, leadingWhitespaces);
      if (index === expressions.length) {
        return newTokens;
      }
      const expression = expressions[index];
      const expressionTokens = Array.isArray(expression) ? expression.map((expression2) => parseExpression(expression2)) : [parseExpression(expression)];
      return concatTokens(newTokens, expressionTokens, trailingWhitespaces);
    };
    splitByWhitespaces = (template, rawTemplate) => {
      if (rawTemplate.length === 0) {
        return { nextTokens: [], leadingWhitespaces: false, trailingWhitespaces: false };
      }
      const nextTokens = [];
      let templateStart = 0;
      const leadingWhitespaces = DELIMITERS.has(rawTemplate[0]);
      for (let templateIndex = 0, rawIndex = 0; templateIndex < template.length; templateIndex += 1, rawIndex += 1) {
        const rawCharacter = rawTemplate[rawIndex];
        if (DELIMITERS.has(rawCharacter)) {
          if (templateStart !== templateIndex) {
            nextTokens.push(template.slice(templateStart, templateIndex));
          }
          templateStart = templateIndex + 1;
        } else if (rawCharacter === "\\") {
          const nextRawCharacter = rawTemplate[rawIndex + 1];
          if (nextRawCharacter === "\n") {
            templateIndex -= 1;
            rawIndex += 1;
          } else if (nextRawCharacter === "u" && rawTemplate[rawIndex + 2] === "{") {
            rawIndex = rawTemplate.indexOf("}", rawIndex + 3);
          } else {
            rawIndex += ESCAPE_LENGTH[nextRawCharacter] ?? 1;
          }
        }
      }
      const trailingWhitespaces = templateStart === template.length;
      if (!trailingWhitespaces) {
        nextTokens.push(template.slice(templateStart));
      }
      return { nextTokens, leadingWhitespaces, trailingWhitespaces };
    };
    DELIMITERS = /* @__PURE__ */ new Set([" ", "	", "\r", "\n"]);
    ESCAPE_LENGTH = { x: 3, u: 5 };
    concatTokens = (tokens, nextTokens, isSeparated) => isSeparated || tokens.length === 0 || nextTokens.length === 0 ? [...tokens, ...nextTokens] : [
      ...tokens.slice(0, -1),
      `${tokens.at(-1)}${nextTokens[0]}`,
      ...nextTokens.slice(1)
    ];
    parseExpression = (expression) => {
      const typeOfExpression = typeof expression;
      if (typeOfExpression === "string") {
        return expression;
      }
      if (typeOfExpression === "number") {
        return String(expression);
      }
      if (isPlainObject(expression) && ("stdout" in expression || "isMaxBuffer" in expression)) {
        return getSubprocessResult(expression);
      }
      if (expression instanceof import_node_child_process.ChildProcess || Object.prototype.toString.call(expression) === "[object Promise]") {
        throw new TypeError("Unexpected subprocess in template expression. Please use ${await subprocess} instead of ${subprocess}.");
      }
      throw new TypeError(`Unexpected "${typeOfExpression}" in template expression`);
    };
    getSubprocessResult = ({ stdout }) => {
      if (typeof stdout === "string") {
        return stdout;
      }
      if (isUint8Array(stdout)) {
        return uint8ArrayToString(stdout);
      }
      if (stdout === void 0) {
        throw new TypeError(`Missing result.stdout in template expression. This is probably due to the previous subprocess' "stdout" option.`);
      }
      throw new TypeError(`Unexpected "${typeof stdout}" stdout in template expression`);
    };
  }
});

// node_modules/execa/lib/utils/standard-stream.js
var import_node_process, isStandardStream, STANDARD_STREAMS, STANDARD_STREAMS_ALIASES, getStreamName;
var init_standard_stream = __esm({
  "node_modules/execa/lib/utils/standard-stream.js"() {
    import_node_process = __toESM(require("node:process"), 1);
    isStandardStream = (stream) => STANDARD_STREAMS.includes(stream);
    STANDARD_STREAMS = [import_node_process.default.stdin, import_node_process.default.stdout, import_node_process.default.stderr];
    STANDARD_STREAMS_ALIASES = ["stdin", "stdout", "stderr"];
    getStreamName = (fdNumber) => STANDARD_STREAMS_ALIASES[fdNumber] ?? `stdio[${fdNumber}]`;
  }
});

// node_modules/execa/lib/arguments/specific.js
var import_node_util, normalizeFdSpecificOptions, normalizeFdSpecificOption, getStdioLength, normalizeFdSpecificValue, normalizeOptionObject, compareFdName, getFdNameOrder, parseFdName, parseFd, FD_REGEXP, addDefaultValue, verboseDefault, DEFAULT_OPTIONS, FD_SPECIFIC_OPTIONS, getFdSpecificValue;
var init_specific = __esm({
  "node_modules/execa/lib/arguments/specific.js"() {
    import_node_util = require("node:util");
    init_is_plain_obj();
    init_standard_stream();
    normalizeFdSpecificOptions = (options) => {
      const optionsCopy = { ...options };
      for (const optionName of FD_SPECIFIC_OPTIONS) {
        optionsCopy[optionName] = normalizeFdSpecificOption(options, optionName);
      }
      return optionsCopy;
    };
    normalizeFdSpecificOption = (options, optionName) => {
      const optionBaseArray = Array.from({ length: getStdioLength(options) + 1 });
      const optionArray = normalizeFdSpecificValue(options[optionName], optionBaseArray, optionName);
      return addDefaultValue(optionArray, optionName);
    };
    getStdioLength = ({ stdio }) => Array.isArray(stdio) ? Math.max(stdio.length, STANDARD_STREAMS_ALIASES.length) : STANDARD_STREAMS_ALIASES.length;
    normalizeFdSpecificValue = (optionValue, optionArray, optionName) => isPlainObject(optionValue) ? normalizeOptionObject(optionValue, optionArray, optionName) : optionArray.fill(optionValue);
    normalizeOptionObject = (optionValue, optionArray, optionName) => {
      for (const fdName of Object.keys(optionValue).sort(compareFdName)) {
        for (const fdNumber of parseFdName(fdName, optionName, optionArray)) {
          optionArray[fdNumber] = optionValue[fdName];
        }
      }
      return optionArray;
    };
    compareFdName = (fdNameA, fdNameB) => getFdNameOrder(fdNameA) < getFdNameOrder(fdNameB) ? 1 : -1;
    getFdNameOrder = (fdName) => {
      if (fdName === "stdout" || fdName === "stderr") {
        return 0;
      }
      return fdName === "all" ? 2 : 1;
    };
    parseFdName = (fdName, optionName, optionArray) => {
      if (fdName === "ipc") {
        return [optionArray.length - 1];
      }
      const fdNumber = parseFd(fdName);
      if (fdNumber === void 0 || fdNumber === 0) {
        throw new TypeError(`"${optionName}.${fdName}" is invalid.
It must be "${optionName}.stdout", "${optionName}.stderr", "${optionName}.all", "${optionName}.ipc", or "${optionName}.fd3", "${optionName}.fd4" (and so on).`);
      }
      if (fdNumber >= optionArray.length) {
        throw new TypeError(`"${optionName}.${fdName}" is invalid: that file descriptor does not exist.
Please set the "stdio" option to ensure that file descriptor exists.`);
      }
      return fdNumber === "all" ? [1, 2] : [fdNumber];
    };
    parseFd = (fdName) => {
      if (fdName === "all") {
        return fdName;
      }
      if (STANDARD_STREAMS_ALIASES.includes(fdName)) {
        return STANDARD_STREAMS_ALIASES.indexOf(fdName);
      }
      const regexpResult = FD_REGEXP.exec(fdName);
      if (regexpResult !== null) {
        return Number(regexpResult[1]);
      }
    };
    FD_REGEXP = /^fd(\d+)$/;
    addDefaultValue = (optionArray, optionName) => optionArray.map((optionValue) => optionValue === void 0 ? DEFAULT_OPTIONS[optionName] : optionValue);
    verboseDefault = (0, import_node_util.debuglog)("execa").enabled ? "full" : "none";
    DEFAULT_OPTIONS = {
      lines: false,
      buffer: true,
      maxBuffer: 1e3 * 1e3 * 100,
      verbose: verboseDefault,
      stripFinalNewline: true
    };
    FD_SPECIFIC_OPTIONS = ["lines", "buffer", "maxBuffer", "verbose", "stripFinalNewline"];
    getFdSpecificValue = (optionArray, fdNumber) => fdNumber === "ipc" ? optionArray.at(-1) : optionArray[fdNumber];
  }
});

// node_modules/execa/lib/verbose/values.js
var isVerbose, isFullVerbose, getVerboseFunction, getFdVerbose, getFdGenericVerbose, isVerboseFunction, VERBOSE_VALUES;
var init_values = __esm({
  "node_modules/execa/lib/verbose/values.js"() {
    init_specific();
    isVerbose = ({ verbose }, fdNumber) => getFdVerbose(verbose, fdNumber) !== "none";
    isFullVerbose = ({ verbose }, fdNumber) => !["none", "short"].includes(getFdVerbose(verbose, fdNumber));
    getVerboseFunction = ({ verbose }, fdNumber) => {
      const fdVerbose = getFdVerbose(verbose, fdNumber);
      return isVerboseFunction(fdVerbose) ? fdVerbose : void 0;
    };
    getFdVerbose = (verbose, fdNumber) => fdNumber === void 0 ? getFdGenericVerbose(verbose) : getFdSpecificValue(verbose, fdNumber);
    getFdGenericVerbose = (verbose) => verbose.find((fdVerbose) => isVerboseFunction(fdVerbose)) ?? VERBOSE_VALUES.findLast((fdVerbose) => verbose.includes(fdVerbose));
    isVerboseFunction = (fdVerbose) => typeof fdVerbose === "function";
    VERBOSE_VALUES = ["none", "short", "full"];
  }
});

// node_modules/execa/lib/arguments/escape.js
var import_node_process2, import_node_util2, joinCommand, escapeLines, escapeControlCharacters, escapeControlCharacter, getSpecialCharRegExp, SPECIAL_CHAR_REGEXP, COMMON_ESCAPES, ASTRAL_START, quoteString, NO_ESCAPE_REGEXP;
var init_escape = __esm({
  "node_modules/execa/lib/arguments/escape.js"() {
    import_node_process2 = require("node:process");
    import_node_util2 = require("node:util");
    joinCommand = (filePath, rawArguments) => {
      const fileAndArguments = [filePath, ...rawArguments];
      const command = fileAndArguments.join(" ");
      const escapedCommand = fileAndArguments.map((fileAndArgument) => quoteString(escapeControlCharacters(fileAndArgument))).join(" ");
      return { command, escapedCommand };
    };
    escapeLines = (lines) => (0, import_node_util2.stripVTControlCharacters)(lines).split("\n").map((line) => escapeControlCharacters(line)).join("\n");
    escapeControlCharacters = (line) => line.replaceAll(SPECIAL_CHAR_REGEXP, (character) => escapeControlCharacter(character));
    escapeControlCharacter = (character) => {
      const commonEscape = COMMON_ESCAPES[character];
      if (commonEscape !== void 0) {
        return commonEscape;
      }
      const codepoint = character.codePointAt(0);
      const codepointHex = codepoint.toString(16);
      return codepoint <= ASTRAL_START ? `\\u${codepointHex.padStart(4, "0")}` : `\\U${codepointHex}`;
    };
    getSpecialCharRegExp = () => {
      try {
        return new RegExp("\\p{Separator}|\\p{Other}", "gu");
      } catch {
        return /[\s\u0000-\u001F\u007F-\u009F\u00AD]/g;
      }
    };
    SPECIAL_CHAR_REGEXP = getSpecialCharRegExp();
    COMMON_ESCAPES = {
      " ": " ",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t"
    };
    ASTRAL_START = 65535;
    quoteString = (escapedArgument) => {
      if (NO_ESCAPE_REGEXP.test(escapedArgument)) {
        return escapedArgument;
      }
      return import_node_process2.platform === "win32" ? `"${escapedArgument.replaceAll('"', '""')}"` : `'${escapedArgument.replaceAll("'", "'\\''")}'`;
    };
    NO_ESCAPE_REGEXP = /^[\w./-]+$/;
  }
});

// node_modules/is-unicode-supported/index.js
function isUnicodeSupported() {
  const { env } = import_node_process3.default;
  const { TERM, TERM_PROGRAM } = env;
  if (import_node_process3.default.platform !== "win32") {
    return TERM !== "linux";
  }
  return Boolean(env.WT_SESSION) || Boolean(env.TERMINUS_SUBLIME) || env.ConEmuTask === "{cmd::Cmder}" || TERM_PROGRAM === "Terminus-Sublime" || TERM_PROGRAM === "vscode" || TERM === "xterm-256color" || TERM === "alacritty" || TERM === "rxvt-unicode" || TERM === "rxvt-unicode-256color" || env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
var import_node_process3;
var init_is_unicode_supported = __esm({
  "node_modules/is-unicode-supported/index.js"() {
    import_node_process3 = __toESM(require("node:process"), 1);
  }
});

// node_modules/figures/index.js
var common, specialMainSymbols, specialFallbackSymbols, mainSymbols, fallbackSymbols, shouldUseMain, figures, figures_default, replacements;
var init_figures = __esm({
  "node_modules/figures/index.js"() {
    init_is_unicode_supported();
    common = {
      circleQuestionMark: "(?)",
      questionMarkPrefix: "(?)",
      square: "\u2588",
      squareDarkShade: "\u2593",
      squareMediumShade: "\u2592",
      squareLightShade: "\u2591",
      squareTop: "\u2580",
      squareBottom: "\u2584",
      squareLeft: "\u258C",
      squareRight: "\u2590",
      squareCenter: "\u25A0",
      bullet: "\u25CF",
      dot: "\u2024",
      ellipsis: "\u2026",
      pointerSmall: "\u203A",
      triangleUp: "\u25B2",
      triangleUpSmall: "\u25B4",
      triangleDown: "\u25BC",
      triangleDownSmall: "\u25BE",
      triangleLeftSmall: "\u25C2",
      triangleRightSmall: "\u25B8",
      home: "\u2302",
      heart: "\u2665",
      musicNote: "\u266A",
      musicNoteBeamed: "\u266B",
      arrowUp: "\u2191",
      arrowDown: "\u2193",
      arrowLeft: "\u2190",
      arrowRight: "\u2192",
      arrowLeftRight: "\u2194",
      arrowUpDown: "\u2195",
      almostEqual: "\u2248",
      notEqual: "\u2260",
      lessOrEqual: "\u2264",
      greaterOrEqual: "\u2265",
      identical: "\u2261",
      infinity: "\u221E",
      subscriptZero: "\u2080",
      subscriptOne: "\u2081",
      subscriptTwo: "\u2082",
      subscriptThree: "\u2083",
      subscriptFour: "\u2084",
      subscriptFive: "\u2085",
      subscriptSix: "\u2086",
      subscriptSeven: "\u2087",
      subscriptEight: "\u2088",
      subscriptNine: "\u2089",
      oneHalf: "\xBD",
      oneThird: "\u2153",
      oneQuarter: "\xBC",
      oneFifth: "\u2155",
      oneSixth: "\u2159",
      oneEighth: "\u215B",
      twoThirds: "\u2154",
      twoFifths: "\u2156",
      threeQuarters: "\xBE",
      threeFifths: "\u2157",
      threeEighths: "\u215C",
      fourFifths: "\u2158",
      fiveSixths: "\u215A",
      fiveEighths: "\u215D",
      sevenEighths: "\u215E",
      line: "\u2500",
      lineBold: "\u2501",
      lineDouble: "\u2550",
      lineDashed0: "\u2504",
      lineDashed1: "\u2505",
      lineDashed2: "\u2508",
      lineDashed3: "\u2509",
      lineDashed4: "\u254C",
      lineDashed5: "\u254D",
      lineDashed6: "\u2574",
      lineDashed7: "\u2576",
      lineDashed8: "\u2578",
      lineDashed9: "\u257A",
      lineDashed10: "\u257C",
      lineDashed11: "\u257E",
      lineDashed12: "\u2212",
      lineDashed13: "\u2013",
      lineDashed14: "\u2010",
      lineDashed15: "\u2043",
      lineVertical: "\u2502",
      lineVerticalBold: "\u2503",
      lineVerticalDouble: "\u2551",
      lineVerticalDashed0: "\u2506",
      lineVerticalDashed1: "\u2507",
      lineVerticalDashed2: "\u250A",
      lineVerticalDashed3: "\u250B",
      lineVerticalDashed4: "\u254E",
      lineVerticalDashed5: "\u254F",
      lineVerticalDashed6: "\u2575",
      lineVerticalDashed7: "\u2577",
      lineVerticalDashed8: "\u2579",
      lineVerticalDashed9: "\u257B",
      lineVerticalDashed10: "\u257D",
      lineVerticalDashed11: "\u257F",
      lineDownLeft: "\u2510",
      lineDownLeftArc: "\u256E",
      lineDownBoldLeftBold: "\u2513",
      lineDownBoldLeft: "\u2512",
      lineDownLeftBold: "\u2511",
      lineDownDoubleLeftDouble: "\u2557",
      lineDownDoubleLeft: "\u2556",
      lineDownLeftDouble: "\u2555",
      lineDownRight: "\u250C",
      lineDownRightArc: "\u256D",
      lineDownBoldRightBold: "\u250F",
      lineDownBoldRight: "\u250E",
      lineDownRightBold: "\u250D",
      lineDownDoubleRightDouble: "\u2554",
      lineDownDoubleRight: "\u2553",
      lineDownRightDouble: "\u2552",
      lineUpLeft: "\u2518",
      lineUpLeftArc: "\u256F",
      lineUpBoldLeftBold: "\u251B",
      lineUpBoldLeft: "\u251A",
      lineUpLeftBold: "\u2519",
      lineUpDoubleLeftDouble: "\u255D",
      lineUpDoubleLeft: "\u255C",
      lineUpLeftDouble: "\u255B",
      lineUpRight: "\u2514",
      lineUpRightArc: "\u2570",
      lineUpBoldRightBold: "\u2517",
      lineUpBoldRight: "\u2516",
      lineUpRightBold: "\u2515",
      lineUpDoubleRightDouble: "\u255A",
      lineUpDoubleRight: "\u2559",
      lineUpRightDouble: "\u2558",
      lineUpDownLeft: "\u2524",
      lineUpBoldDownBoldLeftBold: "\u252B",
      lineUpBoldDownBoldLeft: "\u2528",
      lineUpDownLeftBold: "\u2525",
      lineUpBoldDownLeftBold: "\u2529",
      lineUpDownBoldLeftBold: "\u252A",
      lineUpDownBoldLeft: "\u2527",
      lineUpBoldDownLeft: "\u2526",
      lineUpDoubleDownDoubleLeftDouble: "\u2563",
      lineUpDoubleDownDoubleLeft: "\u2562",
      lineUpDownLeftDouble: "\u2561",
      lineUpDownRight: "\u251C",
      lineUpBoldDownBoldRightBold: "\u2523",
      lineUpBoldDownBoldRight: "\u2520",
      lineUpDownRightBold: "\u251D",
      lineUpBoldDownRightBold: "\u2521",
      lineUpDownBoldRightBold: "\u2522",
      lineUpDownBoldRight: "\u251F",
      lineUpBoldDownRight: "\u251E",
      lineUpDoubleDownDoubleRightDouble: "\u2560",
      lineUpDoubleDownDoubleRight: "\u255F",
      lineUpDownRightDouble: "\u255E",
      lineDownLeftRight: "\u252C",
      lineDownBoldLeftBoldRightBold: "\u2533",
      lineDownLeftBoldRightBold: "\u252F",
      lineDownBoldLeftRight: "\u2530",
      lineDownBoldLeftBoldRight: "\u2531",
      lineDownBoldLeftRightBold: "\u2532",
      lineDownLeftRightBold: "\u252E",
      lineDownLeftBoldRight: "\u252D",
      lineDownDoubleLeftDoubleRightDouble: "\u2566",
      lineDownDoubleLeftRight: "\u2565",
      lineDownLeftDoubleRightDouble: "\u2564",
      lineUpLeftRight: "\u2534",
      lineUpBoldLeftBoldRightBold: "\u253B",
      lineUpLeftBoldRightBold: "\u2537",
      lineUpBoldLeftRight: "\u2538",
      lineUpBoldLeftBoldRight: "\u2539",
      lineUpBoldLeftRightBold: "\u253A",
      lineUpLeftRightBold: "\u2536",
      lineUpLeftBoldRight: "\u2535",
      lineUpDoubleLeftDoubleRightDouble: "\u2569",
      lineUpDoubleLeftRight: "\u2568",
      lineUpLeftDoubleRightDouble: "\u2567",
      lineUpDownLeftRight: "\u253C",
      lineUpBoldDownBoldLeftBoldRightBold: "\u254B",
      lineUpDownBoldLeftBoldRightBold: "\u2548",
      lineUpBoldDownLeftBoldRightBold: "\u2547",
      lineUpBoldDownBoldLeftRightBold: "\u254A",
      lineUpBoldDownBoldLeftBoldRight: "\u2549",
      lineUpBoldDownLeftRight: "\u2540",
      lineUpDownBoldLeftRight: "\u2541",
      lineUpDownLeftBoldRight: "\u253D",
      lineUpDownLeftRightBold: "\u253E",
      lineUpBoldDownBoldLeftRight: "\u2542",
      lineUpDownLeftBoldRightBold: "\u253F",
      lineUpBoldDownLeftBoldRight: "\u2543",
      lineUpBoldDownLeftRightBold: "\u2544",
      lineUpDownBoldLeftBoldRight: "\u2545",
      lineUpDownBoldLeftRightBold: "\u2546",
      lineUpDoubleDownDoubleLeftDoubleRightDouble: "\u256C",
      lineUpDoubleDownDoubleLeftRight: "\u256B",
      lineUpDownLeftDoubleRightDouble: "\u256A",
      lineCross: "\u2573",
      lineBackslash: "\u2572",
      lineSlash: "\u2571"
    };
    specialMainSymbols = {
      tick: "\u2714",
      info: "\u2139",
      warning: "\u26A0",
      cross: "\u2718",
      squareSmall: "\u25FB",
      squareSmallFilled: "\u25FC",
      circle: "\u25EF",
      circleFilled: "\u25C9",
      circleDotted: "\u25CC",
      circleDouble: "\u25CE",
      circleCircle: "\u24DE",
      circleCross: "\u24E7",
      circlePipe: "\u24BE",
      radioOn: "\u25C9",
      radioOff: "\u25EF",
      checkboxOn: "\u2612",
      checkboxOff: "\u2610",
      checkboxCircleOn: "\u24E7",
      checkboxCircleOff: "\u24BE",
      pointer: "\u276F",
      triangleUpOutline: "\u25B3",
      triangleLeft: "\u25C0",
      triangleRight: "\u25B6",
      lozenge: "\u25C6",
      lozengeOutline: "\u25C7",
      hamburger: "\u2630",
      smiley: "\u32E1",
      mustache: "\u0DF4",
      star: "\u2605",
      play: "\u25B6",
      nodejs: "\u2B22",
      oneSeventh: "\u2150",
      oneNinth: "\u2151",
      oneTenth: "\u2152"
    };
    specialFallbackSymbols = {
      tick: "\u221A",
      info: "i",
      warning: "\u203C",
      cross: "\xD7",
      squareSmall: "\u25A1",
      squareSmallFilled: "\u25A0",
      circle: "( )",
      circleFilled: "(*)",
      circleDotted: "( )",
      circleDouble: "( )",
      circleCircle: "(\u25CB)",
      circleCross: "(\xD7)",
      circlePipe: "(\u2502)",
      radioOn: "(*)",
      radioOff: "( )",
      checkboxOn: "[\xD7]",
      checkboxOff: "[ ]",
      checkboxCircleOn: "(\xD7)",
      checkboxCircleOff: "( )",
      pointer: ">",
      triangleUpOutline: "\u2206",
      triangleLeft: "\u25C4",
      triangleRight: "\u25BA",
      lozenge: "\u2666",
      lozengeOutline: "\u25CA",
      hamburger: "\u2261",
      smiley: "\u263A",
      mustache: "\u250C\u2500\u2510",
      star: "\u2736",
      play: "\u25BA",
      nodejs: "\u2666",
      oneSeventh: "1/7",
      oneNinth: "1/9",
      oneTenth: "1/10"
    };
    mainSymbols = { ...common, ...specialMainSymbols };
    fallbackSymbols = { ...common, ...specialFallbackSymbols };
    shouldUseMain = isUnicodeSupported();
    figures = shouldUseMain ? mainSymbols : fallbackSymbols;
    figures_default = figures;
    replacements = Object.entries(specialMainSymbols);
  }
});

// node_modules/yoctocolors/base.js
var import_node_tty, hasColors, format, reset, bold, dim, italic, underline, overline, inverse, hidden, strikethrough, black, red, green, yellow, blue, magenta, cyan, white, gray, bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite, bgGray, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright, bgRedBright, bgGreenBright, bgYellowBright, bgBlueBright, bgMagentaBright, bgCyanBright, bgWhiteBright;
var init_base = __esm({
  "node_modules/yoctocolors/base.js"() {
    import_node_tty = __toESM(require("node:tty"), 1);
    hasColors = import_node_tty.default?.WriteStream?.prototype?.hasColors?.() ?? false;
    format = (open, close) => {
      if (!hasColors) {
        return (input) => input;
      }
      const openCode = `\x1B[${open}m`;
      const closeCode = `\x1B[${close}m`;
      return (input) => {
        const string = input + "";
        let index = string.indexOf(closeCode);
        if (index === -1) {
          return openCode + string + closeCode;
        }
        let result = openCode;
        let lastIndex = 0;
        while (index !== -1) {
          result += string.slice(lastIndex, index) + openCode;
          lastIndex = index + closeCode.length;
          index = string.indexOf(closeCode, lastIndex);
        }
        result += string.slice(lastIndex) + closeCode;
        return result;
      };
    };
    reset = format(0, 0);
    bold = format(1, 22);
    dim = format(2, 22);
    italic = format(3, 23);
    underline = format(4, 24);
    overline = format(53, 55);
    inverse = format(7, 27);
    hidden = format(8, 28);
    strikethrough = format(9, 29);
    black = format(30, 39);
    red = format(31, 39);
    green = format(32, 39);
    yellow = format(33, 39);
    blue = format(34, 39);
    magenta = format(35, 39);
    cyan = format(36, 39);
    white = format(37, 39);
    gray = format(90, 39);
    bgBlack = format(40, 49);
    bgRed = format(41, 49);
    bgGreen = format(42, 49);
    bgYellow = format(43, 49);
    bgBlue = format(44, 49);
    bgMagenta = format(45, 49);
    bgCyan = format(46, 49);
    bgWhite = format(47, 49);
    bgGray = format(100, 49);
    redBright = format(91, 39);
    greenBright = format(92, 39);
    yellowBright = format(93, 39);
    blueBright = format(94, 39);
    magentaBright = format(95, 39);
    cyanBright = format(96, 39);
    whiteBright = format(97, 39);
    bgRedBright = format(101, 49);
    bgGreenBright = format(102, 49);
    bgYellowBright = format(103, 49);
    bgBlueBright = format(104, 49);
    bgMagentaBright = format(105, 49);
    bgCyanBright = format(106, 49);
    bgWhiteBright = format(107, 49);
  }
});

// node_modules/yoctocolors/index.js
var init_yoctocolors = __esm({
  "node_modules/yoctocolors/index.js"() {
    init_base();
    init_base();
  }
});

// node_modules/execa/lib/verbose/default.js
var defaultVerboseFunction, serializeTimestamp, padField, getFinalIcon, ICONS, identity, COLORS;
var init_default = __esm({
  "node_modules/execa/lib/verbose/default.js"() {
    init_figures();
    init_yoctocolors();
    defaultVerboseFunction = ({
      type,
      message,
      timestamp,
      piped,
      commandId,
      result: { failed = false } = {},
      options: { reject = true }
    }) => {
      const timestampString = serializeTimestamp(timestamp);
      const icon = ICONS[type]({ failed, reject, piped });
      const color = COLORS[type]({ reject });
      return `${gray(`[${timestampString}]`)} ${gray(`[${commandId}]`)} ${color(icon)} ${color(message)}`;
    };
    serializeTimestamp = (timestamp) => `${padField(timestamp.getHours(), 2)}:${padField(timestamp.getMinutes(), 2)}:${padField(timestamp.getSeconds(), 2)}.${padField(timestamp.getMilliseconds(), 3)}`;
    padField = (field, padding) => String(field).padStart(padding, "0");
    getFinalIcon = ({ failed, reject }) => {
      if (!failed) {
        return figures_default.tick;
      }
      return reject ? figures_default.cross : figures_default.warning;
    };
    ICONS = {
      command: ({ piped }) => piped ? "|" : "$",
      output: () => " ",
      ipc: () => "*",
      error: getFinalIcon,
      duration: getFinalIcon
    };
    identity = (string) => string;
    COLORS = {
      command: () => bold,
      output: () => identity,
      ipc: () => identity,
      error: ({ reject }) => reject ? redBright : yellowBright,
      duration: () => gray
    };
  }
});

// node_modules/execa/lib/verbose/custom.js
var applyVerboseOnLines, applyVerboseFunction, appendNewline;
var init_custom = __esm({
  "node_modules/execa/lib/verbose/custom.js"() {
    init_values();
    applyVerboseOnLines = (printedLines, verboseInfo, fdNumber) => {
      const verboseFunction = getVerboseFunction(verboseInfo, fdNumber);
      return printedLines.map(({ verboseLine, verboseObject }) => applyVerboseFunction(verboseLine, verboseObject, verboseFunction)).filter((printedLine) => printedLine !== void 0).map((printedLine) => appendNewline(printedLine)).join("");
    };
    applyVerboseFunction = (verboseLine, verboseObject, verboseFunction) => {
      if (verboseFunction === void 0) {
        return verboseLine;
      }
      const printedLine = verboseFunction(verboseLine, verboseObject);
      if (typeof printedLine === "string") {
        return printedLine;
      }
    };
    appendNewline = (printedLine) => printedLine.endsWith("\n") ? printedLine : `${printedLine}
`;
  }
});

// node_modules/execa/lib/verbose/log.js
var import_node_util3, verboseLog, getVerboseObject, getPrintedLines, getPrintedLine, serializeVerboseMessage, TAB_SIZE;
var init_log = __esm({
  "node_modules/execa/lib/verbose/log.js"() {
    import_node_util3 = require("node:util");
    init_escape();
    init_default();
    init_custom();
    verboseLog = ({ type, verboseMessage, fdNumber, verboseInfo, result }) => {
      const verboseObject = getVerboseObject({ type, result, verboseInfo });
      const printedLines = getPrintedLines(verboseMessage, verboseObject);
      const finalLines = applyVerboseOnLines(printedLines, verboseInfo, fdNumber);
      if (finalLines !== "") {
        console.warn(finalLines.slice(0, -1));
      }
    };
    getVerboseObject = ({
      type,
      result,
      verboseInfo: { escapedCommand, commandId, rawOptions: { piped = false, ...options } }
    }) => ({
      type,
      escapedCommand,
      commandId: `${commandId}`,
      timestamp: /* @__PURE__ */ new Date(),
      piped,
      result,
      options
    });
    getPrintedLines = (verboseMessage, verboseObject) => verboseMessage.split("\n").map((message) => getPrintedLine({ ...verboseObject, message }));
    getPrintedLine = (verboseObject) => {
      const verboseLine = defaultVerboseFunction(verboseObject);
      return { verboseLine, verboseObject };
    };
    serializeVerboseMessage = (message) => {
      const messageString = typeof message === "string" ? message : (0, import_node_util3.inspect)(message);
      const escapedMessage = escapeLines(messageString);
      return escapedMessage.replaceAll("	", " ".repeat(TAB_SIZE));
    };
    TAB_SIZE = 2;
  }
});

// node_modules/execa/lib/verbose/start.js
var logCommand;
var init_start = __esm({
  "node_modules/execa/lib/verbose/start.js"() {
    init_values();
    init_log();
    logCommand = (escapedCommand, verboseInfo) => {
      if (!isVerbose(verboseInfo)) {
        return;
      }
      verboseLog({
        type: "command",
        verboseMessage: escapedCommand,
        verboseInfo
      });
    };
  }
});

// node_modules/execa/lib/verbose/info.js
var getVerboseInfo, getCommandId, COMMAND_ID, validateVerbose;
var init_info = __esm({
  "node_modules/execa/lib/verbose/info.js"() {
    init_values();
    getVerboseInfo = (verbose, escapedCommand, rawOptions) => {
      validateVerbose(verbose);
      const commandId = getCommandId(verbose);
      return {
        verbose,
        escapedCommand,
        commandId,
        rawOptions
      };
    };
    getCommandId = (verbose) => isVerbose({ verbose }) ? COMMAND_ID++ : void 0;
    COMMAND_ID = 0n;
    validateVerbose = (verbose) => {
      for (const fdVerbose of verbose) {
        if (fdVerbose === false) {
          throw new TypeError(`The "verbose: false" option was renamed to "verbose: 'none'".`);
        }
        if (fdVerbose === true) {
          throw new TypeError(`The "verbose: true" option was renamed to "verbose: 'short'".`);
        }
        if (!VERBOSE_VALUES.includes(fdVerbose) && !isVerboseFunction(fdVerbose)) {
          const allowedValues = VERBOSE_VALUES.map((allowedValue) => `'${allowedValue}'`).join(", ");
          throw new TypeError(`The "verbose" option must not be ${fdVerbose}. Allowed values are: ${allowedValues} or a function.`);
        }
      }
    };
  }
});

// node_modules/execa/lib/return/duration.js
var import_node_process4, getStartTime, getDurationMs;
var init_duration = __esm({
  "node_modules/execa/lib/return/duration.js"() {
    import_node_process4 = require("node:process");
    getStartTime = () => import_node_process4.hrtime.bigint();
    getDurationMs = (startTime) => Number(import_node_process4.hrtime.bigint() - startTime) / 1e6;
  }
});

// node_modules/execa/lib/arguments/command.js
var handleCommand;
var init_command = __esm({
  "node_modules/execa/lib/arguments/command.js"() {
    init_start();
    init_info();
    init_duration();
    init_escape();
    init_specific();
    handleCommand = (filePath, rawArguments, rawOptions) => {
      const startTime = getStartTime();
      const { command, escapedCommand } = joinCommand(filePath, rawArguments);
      const verbose = normalizeFdSpecificOption(rawOptions, "verbose");
      const verboseInfo = getVerboseInfo(verbose, escapedCommand, { ...rawOptions });
      logCommand(escapedCommand, verboseInfo);
      return {
        command,
        escapedCommand,
        startTime,
        verboseInfo
      };
    };
  }
});

// node_modules/isexe/windows.js
var require_windows = __commonJS({
  "node_modules/isexe/windows.js"(exports2, module2) {
    module2.exports = isexe;
    isexe.sync = sync;
    var fs2 = require("fs");
    function checkPathExt(path7, options) {
      var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
      if (!pathext) {
        return true;
      }
      pathext = pathext.split(";");
      if (pathext.indexOf("") !== -1) {
        return true;
      }
      for (var i2 = 0; i2 < pathext.length; i2++) {
        var p = pathext[i2].toLowerCase();
        if (p && path7.substr(-p.length).toLowerCase() === p) {
          return true;
        }
      }
      return false;
    }
    function checkStat(stat, path7, options) {
      if (!stat.isSymbolicLink() && !stat.isFile()) {
        return false;
      }
      return checkPathExt(path7, options);
    }
    function isexe(path7, options, cb) {
      fs2.stat(path7, function(er, stat) {
        cb(er, er ? false : checkStat(stat, path7, options));
      });
    }
    function sync(path7, options) {
      return checkStat(fs2.statSync(path7), path7, options);
    }
  }
});

// node_modules/isexe/mode.js
var require_mode = __commonJS({
  "node_modules/isexe/mode.js"(exports2, module2) {
    module2.exports = isexe;
    isexe.sync = sync;
    var fs2 = require("fs");
    function isexe(path7, options, cb) {
      fs2.stat(path7, function(er, stat) {
        cb(er, er ? false : checkStat(stat, options));
      });
    }
    function sync(path7, options) {
      return checkStat(fs2.statSync(path7), options);
    }
    function checkStat(stat, options) {
      return stat.isFile() && checkMode(stat, options);
    }
    function checkMode(stat, options) {
      var mod = stat.mode;
      var uid = stat.uid;
      var gid = stat.gid;
      var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
      var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
      var u2 = parseInt("100", 8);
      var g = parseInt("010", 8);
      var o2 = parseInt("001", 8);
      var ug = u2 | g;
      var ret = mod & o2 || mod & g && gid === myGid || mod & u2 && uid === myUid || mod & ug && myUid === 0;
      return ret;
    }
  }
});

// node_modules/isexe/index.js
var require_isexe = __commonJS({
  "node_modules/isexe/index.js"(exports2, module2) {
    var fs2 = require("fs");
    var core;
    if (process.platform === "win32" || global.TESTING_WINDOWS) {
      core = require_windows();
    } else {
      core = require_mode();
    }
    module2.exports = isexe;
    isexe.sync = sync;
    function isexe(path7, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = {};
      }
      if (!cb) {
        if (typeof Promise !== "function") {
          throw new TypeError("callback not provided");
        }
        return new Promise(function(resolve, reject) {
          isexe(path7, options || {}, function(er, is) {
            if (er) {
              reject(er);
            } else {
              resolve(is);
            }
          });
        });
      }
      core(path7, options || {}, function(er, is) {
        if (er) {
          if (er.code === "EACCES" || options && options.ignoreErrors) {
            er = null;
            is = false;
          }
        }
        cb(er, is);
      });
    }
    function sync(path7, options) {
      try {
        return core.sync(path7, options || {});
      } catch (er) {
        if (options && options.ignoreErrors || er.code === "EACCES") {
          return false;
        } else {
          throw er;
        }
      }
    }
  }
});

// node_modules/which/which.js
var require_which = __commonJS({
  "node_modules/which/which.js"(exports2, module2) {
    var isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
    var path7 = require("path");
    var COLON = isWindows ? ";" : ":";
    var isexe = require_isexe();
    var getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" });
    var getPathInfo = (cmd, opt) => {
      const colon = opt.colon || COLON;
      const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [""] : [
        // windows always checks the cwd first
        ...isWindows ? [process.cwd()] : [],
        ...(opt.path || process.env.PATH || /* istanbul ignore next: very unusual */
        "").split(colon)
      ];
      const pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
      const pathExt = isWindows ? pathExtExe.split(colon) : [""];
      if (isWindows) {
        if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
          pathExt.unshift("");
      }
      return {
        pathEnv,
        pathExt,
        pathExtExe
      };
    };
    var which = (cmd, opt, cb) => {
      if (typeof opt === "function") {
        cb = opt;
        opt = {};
      }
      if (!opt)
        opt = {};
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      const step = (i2) => new Promise((resolve, reject) => {
        if (i2 === pathEnv.length)
          return opt.all && found.length ? resolve(found) : reject(getNotFoundError(cmd));
        const ppRaw = pathEnv[i2];
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
        const pCmd = path7.join(pathPart, cmd);
        const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        resolve(subStep(p, i2, 0));
      });
      const subStep = (p, i2, ii) => new Promise((resolve, reject) => {
        if (ii === pathExt.length)
          return resolve(step(i2 + 1));
        const ext = pathExt[ii];
        isexe(p + ext, { pathExt: pathExtExe }, (er, is) => {
          if (!er && is) {
            if (opt.all)
              found.push(p + ext);
            else
              return resolve(p + ext);
          }
          return resolve(subStep(p, i2, ii + 1));
        });
      });
      return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
    };
    var whichSync = (cmd, opt) => {
      opt = opt || {};
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      for (let i2 = 0; i2 < pathEnv.length; i2++) {
        const ppRaw = pathEnv[i2];
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
        const pCmd = path7.join(pathPart, cmd);
        const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        for (let j = 0; j < pathExt.length; j++) {
          const cur = p + pathExt[j];
          try {
            const is = isexe.sync(cur, { pathExt: pathExtExe });
            if (is) {
              if (opt.all)
                found.push(cur);
              else
                return cur;
            }
          } catch (ex) {
          }
        }
      }
      if (opt.all && found.length)
        return found;
      if (opt.nothrow)
        return null;
      throw getNotFoundError(cmd);
    };
    module2.exports = which;
    which.sync = whichSync;
  }
});

// node_modules/path-key/index.js
var require_path_key = __commonJS({
  "node_modules/path-key/index.js"(exports2, module2) {
    "use strict";
    var pathKey2 = (options = {}) => {
      const environment2 = options.env || process.env;
      const platform2 = options.platform || process.platform;
      if (platform2 !== "win32") {
        return "PATH";
      }
      return Object.keys(environment2).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
    };
    module2.exports = pathKey2;
    module2.exports.default = pathKey2;
  }
});

// node_modules/cross-spawn/lib/util/resolveCommand.js
var require_resolveCommand = __commonJS({
  "node_modules/cross-spawn/lib/util/resolveCommand.js"(exports2, module2) {
    "use strict";
    var path7 = require("path");
    var which = require_which();
    var getPathKey = require_path_key();
    function resolveCommandAttempt(parsed, withoutPathExt) {
      const env = parsed.options.env || process.env;
      const cwd = process.cwd();
      const hasCustomCwd = parsed.options.cwd != null;
      const shouldSwitchCwd = hasCustomCwd && process.chdir !== void 0 && !process.chdir.disabled;
      if (shouldSwitchCwd) {
        try {
          process.chdir(parsed.options.cwd);
        } catch (err) {
        }
      }
      let resolved;
      try {
        resolved = which.sync(parsed.command, {
          path: env[getPathKey({ env })],
          pathExt: withoutPathExt ? path7.delimiter : void 0
        });
      } catch (e) {
      } finally {
        if (shouldSwitchCwd) {
          process.chdir(cwd);
        }
      }
      if (resolved) {
        resolved = path7.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
      }
      return resolved;
    }
    function resolveCommand(parsed) {
      return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
    }
    module2.exports = resolveCommand;
  }
});

// node_modules/cross-spawn/lib/util/escape.js
var require_escape = __commonJS({
  "node_modules/cross-spawn/lib/util/escape.js"(exports2, module2) {
    "use strict";
    var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
    function escapeCommand(arg) {
      arg = arg.replace(metaCharsRegExp, "^$1");
      return arg;
    }
    function escapeArgument(arg, doubleEscapeMetaChars) {
      arg = `${arg}`;
      arg = arg.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"');
      arg = arg.replace(/(?=(\\+?)?)\1$/, "$1$1");
      arg = `"${arg}"`;
      arg = arg.replace(metaCharsRegExp, "^$1");
      if (doubleEscapeMetaChars) {
        arg = arg.replace(metaCharsRegExp, "^$1");
      }
      return arg;
    }
    module2.exports.command = escapeCommand;
    module2.exports.argument = escapeArgument;
  }
});

// node_modules/shebang-regex/index.js
var require_shebang_regex = __commonJS({
  "node_modules/shebang-regex/index.js"(exports2, module2) {
    "use strict";
    module2.exports = /^#!(.*)/;
  }
});

// node_modules/shebang-command/index.js
var require_shebang_command = __commonJS({
  "node_modules/shebang-command/index.js"(exports2, module2) {
    "use strict";
    var shebangRegex = require_shebang_regex();
    module2.exports = (string = "") => {
      const match = string.match(shebangRegex);
      if (!match) {
        return null;
      }
      const [path7, argument] = match[0].replace(/#! ?/, "").split(" ");
      const binary = path7.split("/").pop();
      if (binary === "env") {
        return argument;
      }
      return argument ? `${binary} ${argument}` : binary;
    };
  }
});

// node_modules/cross-spawn/lib/util/readShebang.js
var require_readShebang = __commonJS({
  "node_modules/cross-spawn/lib/util/readShebang.js"(exports2, module2) {
    "use strict";
    var fs2 = require("fs");
    var shebangCommand = require_shebang_command();
    function readShebang(command) {
      const size = 150;
      const buffer = Buffer.alloc(size);
      let fd;
      try {
        fd = fs2.openSync(command, "r");
        fs2.readSync(fd, buffer, 0, size, 0);
        fs2.closeSync(fd);
      } catch (e) {
      }
      return shebangCommand(buffer.toString());
    }
    module2.exports = readShebang;
  }
});

// node_modules/cross-spawn/lib/parse.js
var require_parse = __commonJS({
  "node_modules/cross-spawn/lib/parse.js"(exports2, module2) {
    "use strict";
    var path7 = require("path");
    var resolveCommand = require_resolveCommand();
    var escape = require_escape();
    var readShebang = require_readShebang();
    var isWin = process.platform === "win32";
    var isExecutableRegExp = /\.(?:com|exe)$/i;
    var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
    function detectShebang(parsed) {
      parsed.file = resolveCommand(parsed);
      const shebang = parsed.file && readShebang(parsed.file);
      if (shebang) {
        parsed.args.unshift(parsed.file);
        parsed.command = shebang;
        return resolveCommand(parsed);
      }
      return parsed.file;
    }
    function parseNonShell(parsed) {
      if (!isWin) {
        return parsed;
      }
      const commandFile = detectShebang(parsed);
      const needsShell = !isExecutableRegExp.test(commandFile);
      if (parsed.options.forceShell || needsShell) {
        const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
        parsed.command = path7.normalize(parsed.command);
        parsed.command = escape.command(parsed.command);
        parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
        const shellCommand = [parsed.command].concat(parsed.args).join(" ");
        parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
        parsed.command = process.env.comspec || "cmd.exe";
        parsed.options.windowsVerbatimArguments = true;
      }
      return parsed;
    }
    function parse(command, args, options) {
      if (args && !Array.isArray(args)) {
        options = args;
        args = null;
      }
      args = args ? args.slice(0) : [];
      options = Object.assign({}, options);
      const parsed = {
        command,
        args,
        options,
        file: void 0,
        original: {
          command,
          args
        }
      };
      return options.shell ? parsed : parseNonShell(parsed);
    }
    module2.exports = parse;
  }
});

// node_modules/cross-spawn/lib/enoent.js
var require_enoent = __commonJS({
  "node_modules/cross-spawn/lib/enoent.js"(exports2, module2) {
    "use strict";
    var isWin = process.platform === "win32";
    function notFoundError(original, syscall) {
      return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
        code: "ENOENT",
        errno: "ENOENT",
        syscall: `${syscall} ${original.command}`,
        path: original.command,
        spawnargs: original.args
      });
    }
    function hookChildProcess(cp, parsed) {
      if (!isWin) {
        return;
      }
      const originalEmit = cp.emit;
      cp.emit = function(name, arg1) {
        if (name === "exit") {
          const err = verifyENOENT(arg1, parsed);
          if (err) {
            return originalEmit.call(cp, "error", err);
          }
        }
        return originalEmit.apply(cp, arguments);
      };
    }
    function verifyENOENT(status, parsed) {
      if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, "spawn");
      }
      return null;
    }
    function verifyENOENTSync(status, parsed) {
      if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, "spawnSync");
      }
      return null;
    }
    module2.exports = {
      hookChildProcess,
      verifyENOENT,
      verifyENOENTSync,
      notFoundError
    };
  }
});

// node_modules/cross-spawn/index.js
var require_cross_spawn = __commonJS({
  "node_modules/cross-spawn/index.js"(exports2, module2) {
    "use strict";
    var cp = require("child_process");
    var parse = require_parse();
    var enoent = require_enoent();
    function spawn2(command, args, options) {
      const parsed = parse(command, args, options);
      const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
      enoent.hookChildProcess(spawned, parsed);
      return spawned;
    }
    function spawnSync2(command, args, options) {
      const parsed = parse(command, args, options);
      const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
      result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
      return result;
    }
    module2.exports = spawn2;
    module2.exports.spawn = spawn2;
    module2.exports.sync = spawnSync2;
    module2.exports._parse = parse;
    module2.exports._enoent = enoent;
  }
});

// node_modules/npm-run-path/node_modules/path-key/index.js
function pathKey(options = {}) {
  const {
    env = process.env,
    platform: platform2 = process.platform
  } = options;
  if (platform2 !== "win32") {
    return "PATH";
  }
  return Object.keys(env).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
}
var init_path_key = __esm({
  "node_modules/npm-run-path/node_modules/path-key/index.js"() {
  }
});

// node_modules/unicorn-magic/default.js
var init_default2 = __esm({
  "node_modules/unicorn-magic/default.js"() {
  }
});

// node_modules/unicorn-magic/node.js
function toPath(urlOrPath) {
  return urlOrPath instanceof URL ? (0, import_node_url2.fileURLToPath)(urlOrPath) : urlOrPath;
}
function traversePathUp(startPath) {
  return {
    *[Symbol.iterator]() {
      let currentPath = import_node_path.default.resolve(toPath(startPath));
      let previousPath;
      while (previousPath !== currentPath) {
        yield currentPath;
        previousPath = currentPath;
        currentPath = import_node_path.default.resolve(currentPath, "..");
      }
    }
  };
}
var import_node_util4, import_node_child_process2, import_node_path, import_node_url2, execFileOriginal, TEN_MEGABYTES_IN_BYTES;
var init_node = __esm({
  "node_modules/unicorn-magic/node.js"() {
    import_node_util4 = require("node:util");
    import_node_child_process2 = require("node:child_process");
    import_node_path = __toESM(require("node:path"), 1);
    import_node_url2 = require("node:url");
    init_default2();
    execFileOriginal = (0, import_node_util4.promisify)(import_node_child_process2.execFile);
    TEN_MEGABYTES_IN_BYTES = 10 * 1024 * 1024;
  }
});

// node_modules/npm-run-path/index.js
var import_node_process5, import_node_path2, npmRunPath, applyPreferLocal, applyExecPath, npmRunPathEnv;
var init_npm_run_path = __esm({
  "node_modules/npm-run-path/index.js"() {
    import_node_process5 = __toESM(require("node:process"), 1);
    import_node_path2 = __toESM(require("node:path"), 1);
    init_path_key();
    init_node();
    npmRunPath = ({
      cwd = import_node_process5.default.cwd(),
      path: pathOption = import_node_process5.default.env[pathKey()],
      preferLocal = true,
      execPath: execPath2 = import_node_process5.default.execPath,
      addExecPath = true
    } = {}) => {
      const cwdPath = import_node_path2.default.resolve(toPath(cwd));
      const result = [];
      const pathParts = pathOption.split(import_node_path2.default.delimiter);
      if (preferLocal) {
        applyPreferLocal(result, pathParts, cwdPath);
      }
      if (addExecPath) {
        applyExecPath(result, pathParts, execPath2, cwdPath);
      }
      return pathOption === "" || pathOption === import_node_path2.default.delimiter ? `${result.join(import_node_path2.default.delimiter)}${pathOption}` : [...result, pathOption].join(import_node_path2.default.delimiter);
    };
    applyPreferLocal = (result, pathParts, cwdPath) => {
      for (const directory of traversePathUp(cwdPath)) {
        const pathPart = import_node_path2.default.join(directory, "node_modules/.bin");
        if (!pathParts.includes(pathPart)) {
          result.push(pathPart);
        }
      }
    };
    applyExecPath = (result, pathParts, execPath2, cwdPath) => {
      const pathPart = import_node_path2.default.resolve(cwdPath, toPath(execPath2), "..");
      if (!pathParts.includes(pathPart)) {
        result.push(pathPart);
      }
    };
    npmRunPathEnv = ({ env = import_node_process5.default.env, ...options } = {}) => {
      env = { ...env };
      const pathName = pathKey({ env });
      options.path = env[pathName];
      env[pathName] = npmRunPath(options);
      return env;
    };
  }
});

// node_modules/execa/lib/return/final-error.js
var getFinalError, DiscardedError, setErrorName, isExecaError, execaErrorSymbol, isErrorInstance, ExecaError, ExecaSyncError;
var init_final_error = __esm({
  "node_modules/execa/lib/return/final-error.js"() {
    getFinalError = (originalError, message, isSync) => {
      const ErrorClass = isSync ? ExecaSyncError : ExecaError;
      const options = originalError instanceof DiscardedError ? {} : { cause: originalError };
      return new ErrorClass(message, options);
    };
    DiscardedError = class extends Error {
    };
    setErrorName = (ErrorClass, value) => {
      Object.defineProperty(ErrorClass.prototype, "name", {
        value,
        writable: true,
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ErrorClass.prototype, execaErrorSymbol, {
        value: true,
        writable: false,
        enumerable: false,
        configurable: false
      });
    };
    isExecaError = (error) => isErrorInstance(error) && execaErrorSymbol in error;
    execaErrorSymbol = Symbol("isExecaError");
    isErrorInstance = (value) => Object.prototype.toString.call(value) === "[object Error]";
    ExecaError = class extends Error {
    };
    setErrorName(ExecaError, ExecaError.name);
    ExecaSyncError = class extends Error {
    };
    setErrorName(ExecaSyncError, ExecaSyncError.name);
  }
});

// node_modules/human-signals/build/src/realtime.js
var getRealtimeSignals, getRealtimeSignal, SIGRTMIN, SIGRTMAX;
var init_realtime = __esm({
  "node_modules/human-signals/build/src/realtime.js"() {
    getRealtimeSignals = () => {
      const length = SIGRTMAX - SIGRTMIN + 1;
      return Array.from({ length }, getRealtimeSignal);
    };
    getRealtimeSignal = (value, index) => ({
      name: `SIGRT${index + 1}`,
      number: SIGRTMIN + index,
      action: "terminate",
      description: "Application-specific signal (realtime)",
      standard: "posix"
    });
    SIGRTMIN = 34;
    SIGRTMAX = 64;
  }
});

// node_modules/human-signals/build/src/core.js
var SIGNALS;
var init_core = __esm({
  "node_modules/human-signals/build/src/core.js"() {
    SIGNALS = [
      {
        name: "SIGHUP",
        number: 1,
        action: "terminate",
        description: "Terminal closed",
        standard: "posix"
      },
      {
        name: "SIGINT",
        number: 2,
        action: "terminate",
        description: "User interruption with CTRL-C",
        standard: "ansi"
      },
      {
        name: "SIGQUIT",
        number: 3,
        action: "core",
        description: "User interruption with CTRL-\\",
        standard: "posix"
      },
      {
        name: "SIGILL",
        number: 4,
        action: "core",
        description: "Invalid machine instruction",
        standard: "ansi"
      },
      {
        name: "SIGTRAP",
        number: 5,
        action: "core",
        description: "Debugger breakpoint",
        standard: "posix"
      },
      {
        name: "SIGABRT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "ansi"
      },
      {
        name: "SIGIOT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "bsd"
      },
      {
        name: "SIGBUS",
        number: 7,
        action: "core",
        description: "Bus error due to misaligned, non-existing address or paging error",
        standard: "bsd"
      },
      {
        name: "SIGEMT",
        number: 7,
        action: "terminate",
        description: "Command should be emulated but is not implemented",
        standard: "other"
      },
      {
        name: "SIGFPE",
        number: 8,
        action: "core",
        description: "Floating point arithmetic error",
        standard: "ansi"
      },
      {
        name: "SIGKILL",
        number: 9,
        action: "terminate",
        description: "Forced termination",
        standard: "posix",
        forced: true
      },
      {
        name: "SIGUSR1",
        number: 10,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
      },
      {
        name: "SIGSEGV",
        number: 11,
        action: "core",
        description: "Segmentation fault",
        standard: "ansi"
      },
      {
        name: "SIGUSR2",
        number: 12,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
      },
      {
        name: "SIGPIPE",
        number: 13,
        action: "terminate",
        description: "Broken pipe or socket",
        standard: "posix"
      },
      {
        name: "SIGALRM",
        number: 14,
        action: "terminate",
        description: "Timeout or timer",
        standard: "posix"
      },
      {
        name: "SIGTERM",
        number: 15,
        action: "terminate",
        description: "Termination",
        standard: "ansi"
      },
      {
        name: "SIGSTKFLT",
        number: 16,
        action: "terminate",
        description: "Stack is empty or overflowed",
        standard: "other"
      },
      {
        name: "SIGCHLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "posix"
      },
      {
        name: "SIGCLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "other"
      },
      {
        name: "SIGCONT",
        number: 18,
        action: "unpause",
        description: "Unpaused",
        standard: "posix",
        forced: true
      },
      {
        name: "SIGSTOP",
        number: 19,
        action: "pause",
        description: "Paused",
        standard: "posix",
        forced: true
      },
      {
        name: "SIGTSTP",
        number: 20,
        action: "pause",
        description: 'Paused using CTRL-Z or "suspend"',
        standard: "posix"
      },
      {
        name: "SIGTTIN",
        number: 21,
        action: "pause",
        description: "Background process cannot read terminal input",
        standard: "posix"
      },
      {
        name: "SIGBREAK",
        number: 21,
        action: "terminate",
        description: "User interruption with CTRL-BREAK",
        standard: "other"
      },
      {
        name: "SIGTTOU",
        number: 22,
        action: "pause",
        description: "Background process cannot write to terminal output",
        standard: "posix"
      },
      {
        name: "SIGURG",
        number: 23,
        action: "ignore",
        description: "Socket received out-of-band data",
        standard: "bsd"
      },
      {
        name: "SIGXCPU",
        number: 24,
        action: "core",
        description: "Process timed out",
        standard: "bsd"
      },
      {
        name: "SIGXFSZ",
        number: 25,
        action: "core",
        description: "File too big",
        standard: "bsd"
      },
      {
        name: "SIGVTALRM",
        number: 26,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
      },
      {
        name: "SIGPROF",
        number: 27,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
      },
      {
        name: "SIGWINCH",
        number: 28,
        action: "ignore",
        description: "Terminal window size changed",
        standard: "bsd"
      },
      {
        name: "SIGIO",
        number: 29,
        action: "terminate",
        description: "I/O is available",
        standard: "other"
      },
      {
        name: "SIGPOLL",
        number: 29,
        action: "terminate",
        description: "Watched event",
        standard: "other"
      },
      {
        name: "SIGINFO",
        number: 29,
        action: "ignore",
        description: "Request for process information",
        standard: "other"
      },
      {
        name: "SIGPWR",
        number: 30,
        action: "terminate",
        description: "Device running out of power",
        standard: "systemv"
      },
      {
        name: "SIGSYS",
        number: 31,
        action: "core",
        description: "Invalid system call",
        standard: "other"
      },
      {
        name: "SIGUNUSED",
        number: 31,
        action: "terminate",
        description: "Invalid system call",
        standard: "other"
      }
    ];
  }
});

// node_modules/human-signals/build/src/signals.js
var import_node_os, getSignals, normalizeSignal;
var init_signals = __esm({
  "node_modules/human-signals/build/src/signals.js"() {
    import_node_os = require("node:os");
    init_core();
    init_realtime();
    getSignals = () => {
      const realtimeSignals = getRealtimeSignals();
      const signals2 = [...SIGNALS, ...realtimeSignals].map(normalizeSignal);
      return signals2;
    };
    normalizeSignal = ({
      name,
      number: defaultNumber,
      description,
      action,
      forced = false,
      standard
    }) => {
      const {
        signals: { [name]: constantSignal }
      } = import_node_os.constants;
      const supported = constantSignal !== void 0;
      const number = supported ? constantSignal : defaultNumber;
      return { name, number, description, supported, action, forced, standard };
    };
  }
});

// node_modules/human-signals/build/src/main.js
var import_node_os2, getSignalsByName, getSignalByName, signalsByName, getSignalsByNumber, getSignalByNumber, findSignalByNumber, signalsByNumber;
var init_main = __esm({
  "node_modules/human-signals/build/src/main.js"() {
    import_node_os2 = require("node:os");
    init_realtime();
    init_signals();
    getSignalsByName = () => {
      const signals2 = getSignals();
      return Object.fromEntries(signals2.map(getSignalByName));
    };
    getSignalByName = ({
      name,
      number,
      description,
      supported,
      action,
      forced,
      standard
    }) => [name, { name, number, description, supported, action, forced, standard }];
    signalsByName = getSignalsByName();
    getSignalsByNumber = () => {
      const signals2 = getSignals();
      const length = SIGRTMAX + 1;
      const signalsA = Array.from(
        { length },
        (value, number) => getSignalByNumber(number, signals2)
      );
      return Object.assign({}, ...signalsA);
    };
    getSignalByNumber = (number, signals2) => {
      const signal = findSignalByNumber(number, signals2);
      if (signal === void 0) {
        return {};
      }
      const { name, description, supported, action, forced, standard } = signal;
      return {
        [number]: {
          name,
          number,
          description,
          supported,
          action,
          forced,
          standard
        }
      };
    };
    findSignalByNumber = (number, signals2) => {
      const signal = signals2.find(({ name }) => import_node_os2.constants.signals[name] === number);
      if (signal !== void 0) {
        return signal;
      }
      return signals2.find((signalA) => signalA.number === number);
    };
    signalsByNumber = getSignalsByNumber();
  }
});

// node_modules/execa/lib/terminate/signal.js
var import_node_os3, normalizeKillSignal, normalizeSignalArgument, normalizeSignal2, normalizeSignalInteger, getSignalsIntegerToName, signalsIntegerToName, normalizeSignalName, getAvailableSignals, getAvailableSignalNames, getAvailableSignalIntegers, getSignalDescription;
var init_signal = __esm({
  "node_modules/execa/lib/terminate/signal.js"() {
    import_node_os3 = require("node:os");
    init_main();
    normalizeKillSignal = (killSignal) => {
      const optionName = "option `killSignal`";
      if (killSignal === 0) {
        throw new TypeError(`Invalid ${optionName}: 0 cannot be used.`);
      }
      return normalizeSignal2(killSignal, optionName);
    };
    normalizeSignalArgument = (signal) => signal === 0 ? signal : normalizeSignal2(signal, "`subprocess.kill()`'s argument");
    normalizeSignal2 = (signalNameOrInteger, optionName) => {
      if (Number.isInteger(signalNameOrInteger)) {
        return normalizeSignalInteger(signalNameOrInteger, optionName);
      }
      if (typeof signalNameOrInteger === "string") {
        return normalizeSignalName(signalNameOrInteger, optionName);
      }
      throw new TypeError(`Invalid ${optionName} ${String(signalNameOrInteger)}: it must be a string or an integer.
${getAvailableSignals()}`);
    };
    normalizeSignalInteger = (signalInteger, optionName) => {
      if (signalsIntegerToName.has(signalInteger)) {
        return signalsIntegerToName.get(signalInteger);
      }
      throw new TypeError(`Invalid ${optionName} ${signalInteger}: this signal integer does not exist.
${getAvailableSignals()}`);
    };
    getSignalsIntegerToName = () => new Map(Object.entries(import_node_os3.constants.signals).reverse().map(([signalName, signalInteger]) => [signalInteger, signalName]));
    signalsIntegerToName = getSignalsIntegerToName();
    normalizeSignalName = (signalName, optionName) => {
      if (signalName in import_node_os3.constants.signals) {
        return signalName;
      }
      if (signalName.toUpperCase() in import_node_os3.constants.signals) {
        throw new TypeError(`Invalid ${optionName} '${signalName}': please rename it to '${signalName.toUpperCase()}'.`);
      }
      throw new TypeError(`Invalid ${optionName} '${signalName}': this signal name does not exist.
${getAvailableSignals()}`);
    };
    getAvailableSignals = () => `Available signal names: ${getAvailableSignalNames()}.
Available signal numbers: ${getAvailableSignalIntegers()}.`;
    getAvailableSignalNames = () => Object.keys(import_node_os3.constants.signals).sort().map((signalName) => `'${signalName}'`).join(", ");
    getAvailableSignalIntegers = () => [...new Set(Object.values(import_node_os3.constants.signals).sort((signalInteger, signalIntegerTwo) => signalInteger - signalIntegerTwo))].join(", ");
    getSignalDescription = (signal) => signalsByName[signal].description;
  }
});

// node_modules/execa/lib/terminate/kill.js
var import_promises, normalizeForceKillAfterDelay, DEFAULT_FORCE_KILL_TIMEOUT, subprocessKill, parseKillArguments, emitKillError, setKillTimeout, killOnTimeout;
var init_kill = __esm({
  "node_modules/execa/lib/terminate/kill.js"() {
    import_promises = require("node:timers/promises");
    init_final_error();
    init_signal();
    normalizeForceKillAfterDelay = (forceKillAfterDelay) => {
      if (forceKillAfterDelay === false) {
        return forceKillAfterDelay;
      }
      if (forceKillAfterDelay === true) {
        return DEFAULT_FORCE_KILL_TIMEOUT;
      }
      if (!Number.isFinite(forceKillAfterDelay) || forceKillAfterDelay < 0) {
        throw new TypeError(`Expected the \`forceKillAfterDelay\` option to be a non-negative integer, got \`${forceKillAfterDelay}\` (${typeof forceKillAfterDelay})`);
      }
      return forceKillAfterDelay;
    };
    DEFAULT_FORCE_KILL_TIMEOUT = 1e3 * 5;
    subprocessKill = ({ kill, options: { forceKillAfterDelay, killSignal }, onInternalError, context, controller }, signalOrError, errorArgument) => {
      const { signal, error } = parseKillArguments(signalOrError, errorArgument, killSignal);
      emitKillError(error, onInternalError);
      const killResult = kill(signal);
      setKillTimeout({
        kill,
        signal,
        forceKillAfterDelay,
        killSignal,
        killResult,
        context,
        controller
      });
      return killResult;
    };
    parseKillArguments = (signalOrError, errorArgument, killSignal) => {
      const [signal = killSignal, error] = isErrorInstance(signalOrError) ? [void 0, signalOrError] : [signalOrError, errorArgument];
      if (typeof signal !== "string" && !Number.isInteger(signal)) {
        throw new TypeError(`The first argument must be an error instance or a signal name string/integer: ${String(signal)}`);
      }
      if (error !== void 0 && !isErrorInstance(error)) {
        throw new TypeError(`The second argument is optional. If specified, it must be an error instance: ${error}`);
      }
      return { signal: normalizeSignalArgument(signal), error };
    };
    emitKillError = (error, onInternalError) => {
      if (error !== void 0) {
        onInternalError.reject(error);
      }
    };
    setKillTimeout = async ({ kill, signal, forceKillAfterDelay, killSignal, killResult, context, controller }) => {
      if (signal === killSignal && killResult) {
        killOnTimeout({
          kill,
          forceKillAfterDelay,
          context,
          controllerSignal: controller.signal
        });
      }
    };
    killOnTimeout = async ({ kill, forceKillAfterDelay, context, controllerSignal }) => {
      if (forceKillAfterDelay === false) {
        return;
      }
      try {
        await (0, import_promises.setTimeout)(forceKillAfterDelay, void 0, { signal: controllerSignal });
        if (kill("SIGKILL")) {
          context.isForcefullyTerminated ??= true;
        }
      } catch {
      }
    };
  }
});

// node_modules/execa/lib/utils/abort-signal.js
var import_node_events, onAbortedSignal;
var init_abort_signal = __esm({
  "node_modules/execa/lib/utils/abort-signal.js"() {
    import_node_events = require("node:events");
    onAbortedSignal = async (mainSignal, stopSignal) => {
      if (!mainSignal.aborted) {
        await (0, import_node_events.once)(mainSignal, "abort", { signal: stopSignal });
      }
    };
  }
});

// node_modules/execa/lib/terminate/cancel.js
var validateCancelSignal, throwOnCancel, terminateOnCancel;
var init_cancel = __esm({
  "node_modules/execa/lib/terminate/cancel.js"() {
    init_abort_signal();
    validateCancelSignal = ({ cancelSignal }) => {
      if (cancelSignal !== void 0 && Object.prototype.toString.call(cancelSignal) !== "[object AbortSignal]") {
        throw new Error(`The \`cancelSignal\` option must be an AbortSignal: ${String(cancelSignal)}`);
      }
    };
    throwOnCancel = ({ subprocess, cancelSignal, gracefulCancel, context, controller }) => cancelSignal === void 0 || gracefulCancel ? [] : [terminateOnCancel(subprocess, cancelSignal, context, controller)];
    terminateOnCancel = async (subprocess, cancelSignal, context, { signal }) => {
      await onAbortedSignal(cancelSignal, signal);
      context.terminationReason ??= "cancel";
      subprocess.kill();
      throw cancelSignal.reason;
    };
  }
});

// node_modules/execa/lib/ipc/validation.js
var validateIpcMethod, validateIpcOption, validateConnection, throwOnEarlyDisconnect, throwOnStrictDeadlockError, getStrictResponseError, throwOnMissingStrict, throwOnStrictDisconnect, getAbortDisconnectError, throwOnMissingParent, handleEpipeError, handleSerializationError, isSerializationError, SERIALIZATION_ERROR_CODES, SERIALIZATION_ERROR_MESSAGES, getMethodName, getNamespaceName, getOtherProcessName, disconnect;
var init_validation = __esm({
  "node_modules/execa/lib/ipc/validation.js"() {
    validateIpcMethod = ({ methodName, isSubprocess, ipc, isConnected: isConnected2 }) => {
      validateIpcOption(methodName, isSubprocess, ipc);
      validateConnection(methodName, isSubprocess, isConnected2);
    };
    validateIpcOption = (methodName, isSubprocess, ipc) => {
      if (!ipc) {
        throw new Error(`${getMethodName(methodName, isSubprocess)} can only be used if the \`ipc\` option is \`true\`.`);
      }
    };
    validateConnection = (methodName, isSubprocess, isConnected2) => {
      if (!isConnected2) {
        throw new Error(`${getMethodName(methodName, isSubprocess)} cannot be used: the ${getOtherProcessName(isSubprocess)} has already exited or disconnected.`);
      }
    };
    throwOnEarlyDisconnect = (isSubprocess) => {
      throw new Error(`${getMethodName("getOneMessage", isSubprocess)} could not complete: the ${getOtherProcessName(isSubprocess)} exited or disconnected.`);
    };
    throwOnStrictDeadlockError = (isSubprocess) => {
      throw new Error(`${getMethodName("sendMessage", isSubprocess)} failed: the ${getOtherProcessName(isSubprocess)} is sending a message too, instead of listening to incoming messages.
This can be fixed by both sending a message and listening to incoming messages at the same time:

const [receivedMessage] = await Promise.all([
	${getMethodName("getOneMessage", isSubprocess)},
	${getMethodName("sendMessage", isSubprocess, "message, {strict: true}")},
]);`);
    };
    getStrictResponseError = (error, isSubprocess) => new Error(`${getMethodName("sendMessage", isSubprocess)} failed when sending an acknowledgment response to the ${getOtherProcessName(isSubprocess)}.`, { cause: error });
    throwOnMissingStrict = (isSubprocess) => {
      throw new Error(`${getMethodName("sendMessage", isSubprocess)} failed: the ${getOtherProcessName(isSubprocess)} is not listening to incoming messages.`);
    };
    throwOnStrictDisconnect = (isSubprocess) => {
      throw new Error(`${getMethodName("sendMessage", isSubprocess)} failed: the ${getOtherProcessName(isSubprocess)} exited without listening to incoming messages.`);
    };
    getAbortDisconnectError = () => new Error(`\`cancelSignal\` aborted: the ${getOtherProcessName(true)} disconnected.`);
    throwOnMissingParent = () => {
      throw new Error("`getCancelSignal()` cannot be used without setting the `cancelSignal` subprocess option.");
    };
    handleEpipeError = ({ error, methodName, isSubprocess }) => {
      if (error.code === "EPIPE") {
        throw new Error(`${getMethodName(methodName, isSubprocess)} cannot be used: the ${getOtherProcessName(isSubprocess)} is disconnecting.`, { cause: error });
      }
    };
    handleSerializationError = ({ error, methodName, isSubprocess, message }) => {
      if (isSerializationError(error)) {
        throw new Error(`${getMethodName(methodName, isSubprocess)}'s argument type is invalid: the message cannot be serialized: ${String(message)}.`, { cause: error });
      }
    };
    isSerializationError = ({ code, message }) => SERIALIZATION_ERROR_CODES.has(code) || SERIALIZATION_ERROR_MESSAGES.some((serializationErrorMessage) => message.includes(serializationErrorMessage));
    SERIALIZATION_ERROR_CODES = /* @__PURE__ */ new Set([
      // Message is `undefined`
      "ERR_MISSING_ARGS",
      // Message is a function, a bigint, a symbol
      "ERR_INVALID_ARG_TYPE"
    ]);
    SERIALIZATION_ERROR_MESSAGES = [
      // Message is a promise or a proxy, with `serialization: 'advanced'`
      "could not be cloned",
      // Message has cycles, with `serialization: 'json'`
      "circular structure",
      // Message has cycles inside toJSON(), with `serialization: 'json'`
      "call stack size exceeded"
    ];
    getMethodName = (methodName, isSubprocess, parameters = "") => methodName === "cancelSignal" ? "`cancelSignal`'s `controller.abort()`" : `${getNamespaceName(isSubprocess)}${methodName}(${parameters})`;
    getNamespaceName = (isSubprocess) => isSubprocess ? "" : "subprocess.";
    getOtherProcessName = (isSubprocess) => isSubprocess ? "parent process" : "subprocess";
    disconnect = (anyProcess) => {
      if (anyProcess.connected) {
        anyProcess.disconnect();
      }
    };
  }
});

// node_modules/execa/lib/utils/deferred.js
var createDeferred;
var init_deferred = __esm({
  "node_modules/execa/lib/utils/deferred.js"() {
    createDeferred = () => {
      const methods = {};
      const promise = new Promise((resolve, reject) => {
        Object.assign(methods, { resolve, reject });
      });
      return Object.assign(promise, methods);
    };
  }
});

// node_modules/execa/lib/arguments/fd-options.js
var getToStream, getFromStream, SUBPROCESS_OPTIONS, getFdNumber, parseFdNumber, validateFdNumber, getInvalidStdioOptionMessage, getInvalidStdioOption, getUsedDescriptor, getOptionName, serializeOptionValue;
var init_fd_options = __esm({
  "node_modules/execa/lib/arguments/fd-options.js"() {
    init_specific();
    getToStream = (destination, to = "stdin") => {
      const isWritable = true;
      const { options, fileDescriptors } = SUBPROCESS_OPTIONS.get(destination);
      const fdNumber = getFdNumber(fileDescriptors, to, isWritable);
      const destinationStream = destination.stdio[fdNumber];
      if (destinationStream === null) {
        throw new TypeError(getInvalidStdioOptionMessage(fdNumber, to, options, isWritable));
      }
      return destinationStream;
    };
    getFromStream = (source, from = "stdout") => {
      const isWritable = false;
      const { options, fileDescriptors } = SUBPROCESS_OPTIONS.get(source);
      const fdNumber = getFdNumber(fileDescriptors, from, isWritable);
      const sourceStream = fdNumber === "all" ? source.all : source.stdio[fdNumber];
      if (sourceStream === null || sourceStream === void 0) {
        throw new TypeError(getInvalidStdioOptionMessage(fdNumber, from, options, isWritable));
      }
      return sourceStream;
    };
    SUBPROCESS_OPTIONS = /* @__PURE__ */ new WeakMap();
    getFdNumber = (fileDescriptors, fdName, isWritable) => {
      const fdNumber = parseFdNumber(fdName, isWritable);
      validateFdNumber(fdNumber, fdName, isWritable, fileDescriptors);
      return fdNumber;
    };
    parseFdNumber = (fdName, isWritable) => {
      const fdNumber = parseFd(fdName);
      if (fdNumber !== void 0) {
        return fdNumber;
      }
      const { validOptions, defaultValue } = isWritable ? { validOptions: '"stdin"', defaultValue: "stdin" } : { validOptions: '"stdout", "stderr", "all"', defaultValue: "stdout" };
      throw new TypeError(`"${getOptionName(isWritable)}" must not be "${fdName}".
It must be ${validOptions} or "fd3", "fd4" (and so on).
It is optional and defaults to "${defaultValue}".`);
    };
    validateFdNumber = (fdNumber, fdName, isWritable, fileDescriptors) => {
      const fileDescriptor = fileDescriptors[getUsedDescriptor(fdNumber)];
      if (fileDescriptor === void 0) {
        throw new TypeError(`"${getOptionName(isWritable)}" must not be ${fdName}. That file descriptor does not exist.
Please set the "stdio" option to ensure that file descriptor exists.`);
      }
      if (fileDescriptor.direction === "input" && !isWritable) {
        throw new TypeError(`"${getOptionName(isWritable)}" must not be ${fdName}. It must be a readable stream, not writable.`);
      }
      if (fileDescriptor.direction !== "input" && isWritable) {
        throw new TypeError(`"${getOptionName(isWritable)}" must not be ${fdName}. It must be a writable stream, not readable.`);
      }
    };
    getInvalidStdioOptionMessage = (fdNumber, fdName, options, isWritable) => {
      if (fdNumber === "all" && !options.all) {
        return `The "all" option must be true to use "from: 'all'".`;
      }
      const { optionName, optionValue } = getInvalidStdioOption(fdNumber, options);
      return `The "${optionName}: ${serializeOptionValue(optionValue)}" option is incompatible with using "${getOptionName(isWritable)}: ${serializeOptionValue(fdName)}".
Please set this option with "pipe" instead.`;
    };
    getInvalidStdioOption = (fdNumber, { stdin, stdout, stderr, stdio }) => {
      const usedDescriptor = getUsedDescriptor(fdNumber);
      if (usedDescriptor === 0 && stdin !== void 0) {
        return { optionName: "stdin", optionValue: stdin };
      }
      if (usedDescriptor === 1 && stdout !== void 0) {
        return { optionName: "stdout", optionValue: stdout };
      }
      if (usedDescriptor === 2 && stderr !== void 0) {
        return { optionName: "stderr", optionValue: stderr };
      }
      return { optionName: `stdio[${usedDescriptor}]`, optionValue: stdio[usedDescriptor] };
    };
    getUsedDescriptor = (fdNumber) => fdNumber === "all" ? 1 : fdNumber;
    getOptionName = (isWritable) => isWritable ? "to" : "from";
    serializeOptionValue = (value) => {
      if (typeof value === "string") {
        return `'${value}'`;
      }
      return typeof value === "number" ? `${value}` : "Stream";
    };
  }
});

// node_modules/execa/lib/utils/max-listeners.js
var import_node_events2, incrementMaxListeners;
var init_max_listeners = __esm({
  "node_modules/execa/lib/utils/max-listeners.js"() {
    import_node_events2 = require("node:events");
    incrementMaxListeners = (eventEmitter, maxListenersIncrement, signal) => {
      const maxListeners = eventEmitter.getMaxListeners();
      if (maxListeners === 0 || maxListeners === Number.POSITIVE_INFINITY) {
        return;
      }
      eventEmitter.setMaxListeners(maxListeners + maxListenersIncrement);
      (0, import_node_events2.addAbortListener)(signal, () => {
        eventEmitter.setMaxListeners(eventEmitter.getMaxListeners() - maxListenersIncrement);
      });
    };
  }
});

// node_modules/execa/lib/ipc/reference.js
var addReference, addReferenceCount, removeReference, removeReferenceCount, undoAddedReferences, redoAddedReferences;
var init_reference = __esm({
  "node_modules/execa/lib/ipc/reference.js"() {
    addReference = (channel, reference) => {
      if (reference) {
        addReferenceCount(channel);
      }
    };
    addReferenceCount = (channel) => {
      channel.refCounted();
    };
    removeReference = (channel, reference) => {
      if (reference) {
        removeReferenceCount(channel);
      }
    };
    removeReferenceCount = (channel) => {
      channel.unrefCounted();
    };
    undoAddedReferences = (channel, isSubprocess) => {
      if (isSubprocess) {
        removeReferenceCount(channel);
        removeReferenceCount(channel);
      }
    };
    redoAddedReferences = (channel, isSubprocess) => {
      if (isSubprocess) {
        addReferenceCount(channel);
        addReferenceCount(channel);
      }
    };
  }
});

// node_modules/execa/lib/ipc/incoming.js
var import_node_events3, import_promises2, onMessage, onDisconnect, INCOMING_MESSAGES;
var init_incoming = __esm({
  "node_modules/execa/lib/ipc/incoming.js"() {
    import_node_events3 = require("node:events");
    import_promises2 = require("node:timers/promises");
    init_outgoing();
    init_reference();
    init_strict();
    init_graceful();
    onMessage = async ({ anyProcess, channel, isSubprocess, ipcEmitter }, wrappedMessage) => {
      if (handleStrictResponse(wrappedMessage) || handleAbort(wrappedMessage)) {
        return;
      }
      if (!INCOMING_MESSAGES.has(anyProcess)) {
        INCOMING_MESSAGES.set(anyProcess, []);
      }
      const incomingMessages = INCOMING_MESSAGES.get(anyProcess);
      incomingMessages.push(wrappedMessage);
      if (incomingMessages.length > 1) {
        return;
      }
      while (incomingMessages.length > 0) {
        await waitForOutgoingMessages(anyProcess, ipcEmitter, wrappedMessage);
        await import_promises2.scheduler.yield();
        const message = await handleStrictRequest({
          wrappedMessage: incomingMessages[0],
          anyProcess,
          channel,
          isSubprocess,
          ipcEmitter
        });
        incomingMessages.shift();
        ipcEmitter.emit("message", message);
        ipcEmitter.emit("message:done");
      }
    };
    onDisconnect = async ({ anyProcess, channel, isSubprocess, ipcEmitter, boundOnMessage }) => {
      abortOnDisconnect();
      const incomingMessages = INCOMING_MESSAGES.get(anyProcess);
      while (incomingMessages?.length > 0) {
        await (0, import_node_events3.once)(ipcEmitter, "message:done");
      }
      anyProcess.removeListener("message", boundOnMessage);
      redoAddedReferences(channel, isSubprocess);
      ipcEmitter.connected = false;
      ipcEmitter.emit("disconnect");
    };
    INCOMING_MESSAGES = /* @__PURE__ */ new WeakMap();
  }
});

// node_modules/execa/lib/ipc/forward.js
var import_node_events4, getIpcEmitter, IPC_EMITTERS, forwardEvents, isConnected;
var init_forward = __esm({
  "node_modules/execa/lib/ipc/forward.js"() {
    import_node_events4 = require("node:events");
    init_incoming();
    init_reference();
    getIpcEmitter = (anyProcess, channel, isSubprocess) => {
      if (IPC_EMITTERS.has(anyProcess)) {
        return IPC_EMITTERS.get(anyProcess);
      }
      const ipcEmitter = new import_node_events4.EventEmitter();
      ipcEmitter.connected = true;
      IPC_EMITTERS.set(anyProcess, ipcEmitter);
      forwardEvents({
        ipcEmitter,
        anyProcess,
        channel,
        isSubprocess
      });
      return ipcEmitter;
    };
    IPC_EMITTERS = /* @__PURE__ */ new WeakMap();
    forwardEvents = ({ ipcEmitter, anyProcess, channel, isSubprocess }) => {
      const boundOnMessage = onMessage.bind(void 0, {
        anyProcess,
        channel,
        isSubprocess,
        ipcEmitter
      });
      anyProcess.on("message", boundOnMessage);
      anyProcess.once("disconnect", onDisconnect.bind(void 0, {
        anyProcess,
        channel,
        isSubprocess,
        ipcEmitter,
        boundOnMessage
      }));
      undoAddedReferences(channel, isSubprocess);
    };
    isConnected = (anyProcess) => {
      const ipcEmitter = IPC_EMITTERS.get(anyProcess);
      return ipcEmitter === void 0 ? anyProcess.channel !== null : ipcEmitter.connected;
    };
  }
});

// node_modules/execa/lib/ipc/strict.js
var import_node_events5, handleSendStrict, count, validateStrictDeadlock, handleStrictRequest, handleStrictResponse, waitForStrictResponse, STRICT_RESPONSES, throwOnDisconnect, REQUEST_TYPE, RESPONSE_TYPE;
var init_strict = __esm({
  "node_modules/execa/lib/ipc/strict.js"() {
    import_node_events5 = require("node:events");
    init_deferred();
    init_max_listeners();
    init_send();
    init_validation();
    init_forward();
    init_outgoing();
    handleSendStrict = ({ anyProcess, channel, isSubprocess, message, strict }) => {
      if (!strict) {
        return message;
      }
      const ipcEmitter = getIpcEmitter(anyProcess, channel, isSubprocess);
      const hasListeners = hasMessageListeners(anyProcess, ipcEmitter);
      return {
        id: count++,
        type: REQUEST_TYPE,
        message,
        hasListeners
      };
    };
    count = 0n;
    validateStrictDeadlock = (outgoingMessages, wrappedMessage) => {
      if (wrappedMessage?.type !== REQUEST_TYPE || wrappedMessage.hasListeners) {
        return;
      }
      for (const { id } of outgoingMessages) {
        if (id !== void 0) {
          STRICT_RESPONSES[id].resolve({ isDeadlock: true, hasListeners: false });
        }
      }
    };
    handleStrictRequest = async ({ wrappedMessage, anyProcess, channel, isSubprocess, ipcEmitter }) => {
      if (wrappedMessage?.type !== REQUEST_TYPE || !anyProcess.connected) {
        return wrappedMessage;
      }
      const { id, message } = wrappedMessage;
      const response = { id, type: RESPONSE_TYPE, message: hasMessageListeners(anyProcess, ipcEmitter) };
      try {
        await sendMessage({
          anyProcess,
          channel,
          isSubprocess,
          ipc: true
        }, response);
      } catch (error) {
        ipcEmitter.emit("strict:error", error);
      }
      return message;
    };
    handleStrictResponse = (wrappedMessage) => {
      if (wrappedMessage?.type !== RESPONSE_TYPE) {
        return false;
      }
      const { id, message: hasListeners } = wrappedMessage;
      STRICT_RESPONSES[id]?.resolve({ isDeadlock: false, hasListeners });
      return true;
    };
    waitForStrictResponse = async (wrappedMessage, anyProcess, isSubprocess) => {
      if (wrappedMessage?.type !== REQUEST_TYPE) {
        return;
      }
      const deferred = createDeferred();
      STRICT_RESPONSES[wrappedMessage.id] = deferred;
      const controller = new AbortController();
      try {
        const { isDeadlock, hasListeners } = await Promise.race([
          deferred,
          throwOnDisconnect(anyProcess, isSubprocess, controller)
        ]);
        if (isDeadlock) {
          throwOnStrictDeadlockError(isSubprocess);
        }
        if (!hasListeners) {
          throwOnMissingStrict(isSubprocess);
        }
      } finally {
        controller.abort();
        delete STRICT_RESPONSES[wrappedMessage.id];
      }
    };
    STRICT_RESPONSES = {};
    throwOnDisconnect = async (anyProcess, isSubprocess, { signal }) => {
      incrementMaxListeners(anyProcess, 1, signal);
      await (0, import_node_events5.once)(anyProcess, "disconnect", { signal });
      throwOnStrictDisconnect(isSubprocess);
    };
    REQUEST_TYPE = "execa:ipc:request";
    RESPONSE_TYPE = "execa:ipc:response";
  }
});

// node_modules/execa/lib/ipc/outgoing.js
var startSendMessage, endSendMessage, waitForOutgoingMessages, OUTGOING_MESSAGES, hasMessageListeners, getMinListenerCount;
var init_outgoing = __esm({
  "node_modules/execa/lib/ipc/outgoing.js"() {
    init_deferred();
    init_specific();
    init_fd_options();
    init_strict();
    startSendMessage = (anyProcess, wrappedMessage, strict) => {
      if (!OUTGOING_MESSAGES.has(anyProcess)) {
        OUTGOING_MESSAGES.set(anyProcess, /* @__PURE__ */ new Set());
      }
      const outgoingMessages = OUTGOING_MESSAGES.get(anyProcess);
      const onMessageSent = createDeferred();
      const id = strict ? wrappedMessage.id : void 0;
      const outgoingMessage = { onMessageSent, id };
      outgoingMessages.add(outgoingMessage);
      return { outgoingMessages, outgoingMessage };
    };
    endSendMessage = ({ outgoingMessages, outgoingMessage }) => {
      outgoingMessages.delete(outgoingMessage);
      outgoingMessage.onMessageSent.resolve();
    };
    waitForOutgoingMessages = async (anyProcess, ipcEmitter, wrappedMessage) => {
      while (!hasMessageListeners(anyProcess, ipcEmitter) && OUTGOING_MESSAGES.get(anyProcess)?.size > 0) {
        const outgoingMessages = [...OUTGOING_MESSAGES.get(anyProcess)];
        validateStrictDeadlock(outgoingMessages, wrappedMessage);
        await Promise.all(outgoingMessages.map(({ onMessageSent }) => onMessageSent));
      }
    };
    OUTGOING_MESSAGES = /* @__PURE__ */ new WeakMap();
    hasMessageListeners = (anyProcess, ipcEmitter) => ipcEmitter.listenerCount("message") > getMinListenerCount(anyProcess);
    getMinListenerCount = (anyProcess) => SUBPROCESS_OPTIONS.has(anyProcess) && !getFdSpecificValue(SUBPROCESS_OPTIONS.get(anyProcess).options.buffer, "ipc") ? 1 : 0;
  }
});

// node_modules/execa/lib/ipc/send.js
var import_node_util5, sendMessage, sendMessageAsync, sendOneMessage, getSendMethod, PROCESS_SEND_METHODS;
var init_send = __esm({
  "node_modules/execa/lib/ipc/send.js"() {
    import_node_util5 = require("node:util");
    init_validation();
    init_outgoing();
    init_strict();
    sendMessage = ({ anyProcess, channel, isSubprocess, ipc }, message, { strict = false } = {}) => {
      const methodName = "sendMessage";
      validateIpcMethod({
        methodName,
        isSubprocess,
        ipc,
        isConnected: anyProcess.connected
      });
      return sendMessageAsync({
        anyProcess,
        channel,
        methodName,
        isSubprocess,
        message,
        strict
      });
    };
    sendMessageAsync = async ({ anyProcess, channel, methodName, isSubprocess, message, strict }) => {
      const wrappedMessage = handleSendStrict({
        anyProcess,
        channel,
        isSubprocess,
        message,
        strict
      });
      const outgoingMessagesState = startSendMessage(anyProcess, wrappedMessage, strict);
      try {
        await sendOneMessage({
          anyProcess,
          methodName,
          isSubprocess,
          wrappedMessage,
          message
        });
      } catch (error) {
        disconnect(anyProcess);
        throw error;
      } finally {
        endSendMessage(outgoingMessagesState);
      }
    };
    sendOneMessage = async ({ anyProcess, methodName, isSubprocess, wrappedMessage, message }) => {
      const sendMethod = getSendMethod(anyProcess);
      try {
        await Promise.all([
          waitForStrictResponse(wrappedMessage, anyProcess, isSubprocess),
          sendMethod(wrappedMessage)
        ]);
      } catch (error) {
        handleEpipeError({ error, methodName, isSubprocess });
        handleSerializationError({
          error,
          methodName,
          isSubprocess,
          message
        });
        throw error;
      }
    };
    getSendMethod = (anyProcess) => {
      if (PROCESS_SEND_METHODS.has(anyProcess)) {
        return PROCESS_SEND_METHODS.get(anyProcess);
      }
      const sendMethod = (0, import_node_util5.promisify)(anyProcess.send.bind(anyProcess));
      PROCESS_SEND_METHODS.set(anyProcess, sendMethod);
      return sendMethod;
    };
    PROCESS_SEND_METHODS = /* @__PURE__ */ new WeakMap();
  }
});

// node_modules/execa/lib/ipc/graceful.js
var import_promises3, sendAbort, getCancelSignal, startIpc, cancelListening, handleAbort, GRACEFUL_CANCEL_TYPE, abortOnDisconnect, cancelController;
var init_graceful = __esm({
  "node_modules/execa/lib/ipc/graceful.js"() {
    import_promises3 = require("node:timers/promises");
    init_send();
    init_forward();
    init_validation();
    sendAbort = (subprocess, message) => {
      const methodName = "cancelSignal";
      validateConnection(methodName, false, subprocess.connected);
      return sendOneMessage({
        anyProcess: subprocess,
        methodName,
        isSubprocess: false,
        wrappedMessage: { type: GRACEFUL_CANCEL_TYPE, message },
        message
      });
    };
    getCancelSignal = async ({ anyProcess, channel, isSubprocess, ipc }) => {
      await startIpc({
        anyProcess,
        channel,
        isSubprocess,
        ipc
      });
      return cancelController.signal;
    };
    startIpc = async ({ anyProcess, channel, isSubprocess, ipc }) => {
      if (cancelListening) {
        return;
      }
      cancelListening = true;
      if (!ipc) {
        throwOnMissingParent();
        return;
      }
      if (channel === null) {
        abortOnDisconnect();
        return;
      }
      getIpcEmitter(anyProcess, channel, isSubprocess);
      await import_promises3.scheduler.yield();
    };
    cancelListening = false;
    handleAbort = (wrappedMessage) => {
      if (wrappedMessage?.type !== GRACEFUL_CANCEL_TYPE) {
        return false;
      }
      cancelController.abort(wrappedMessage.message);
      return true;
    };
    GRACEFUL_CANCEL_TYPE = "execa:ipc:cancel";
    abortOnDisconnect = () => {
      cancelController.abort(getAbortDisconnectError());
    };
    cancelController = new AbortController();
  }
});

// node_modules/execa/lib/terminate/graceful.js
var validateGracefulCancel, throwOnGracefulCancel, sendOnAbort, getReason;
var init_graceful2 = __esm({
  "node_modules/execa/lib/terminate/graceful.js"() {
    init_abort_signal();
    init_graceful();
    init_kill();
    validateGracefulCancel = ({ gracefulCancel, cancelSignal, ipc, serialization }) => {
      if (!gracefulCancel) {
        return;
      }
      if (cancelSignal === void 0) {
        throw new Error("The `cancelSignal` option must be defined when setting the `gracefulCancel` option.");
      }
      if (!ipc) {
        throw new Error("The `ipc` option cannot be false when setting the `gracefulCancel` option.");
      }
      if (serialization === "json") {
        throw new Error("The `serialization` option cannot be 'json' when setting the `gracefulCancel` option.");
      }
    };
    throwOnGracefulCancel = ({
      subprocess,
      cancelSignal,
      gracefulCancel,
      forceKillAfterDelay,
      context,
      controller
    }) => gracefulCancel ? [sendOnAbort({
      subprocess,
      cancelSignal,
      forceKillAfterDelay,
      context,
      controller
    })] : [];
    sendOnAbort = async ({ subprocess, cancelSignal, forceKillAfterDelay, context, controller: { signal } }) => {
      await onAbortedSignal(cancelSignal, signal);
      const reason = getReason(cancelSignal);
      await sendAbort(subprocess, reason);
      killOnTimeout({
        kill: subprocess.kill,
        forceKillAfterDelay,
        context,
        controllerSignal: signal
      });
      context.terminationReason ??= "gracefulCancel";
      throw cancelSignal.reason;
    };
    getReason = ({ reason }) => {
      if (!(reason instanceof DOMException)) {
        return reason;
      }
      const error = new Error(reason.message);
      Object.defineProperty(error, "stack", {
        value: reason.stack,
        enumerable: false,
        configurable: true,
        writable: true
      });
      return error;
    };
  }
});

// node_modules/execa/lib/terminate/timeout.js
var import_promises4, validateTimeout, throwOnTimeout, killAfterTimeout;
var init_timeout = __esm({
  "node_modules/execa/lib/terminate/timeout.js"() {
    import_promises4 = require("node:timers/promises");
    init_final_error();
    validateTimeout = ({ timeout }) => {
      if (timeout !== void 0 && (!Number.isFinite(timeout) || timeout < 0)) {
        throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
      }
    };
    throwOnTimeout = (subprocess, timeout, context, controller) => timeout === 0 || timeout === void 0 ? [] : [killAfterTimeout(subprocess, timeout, context, controller)];
    killAfterTimeout = async (subprocess, timeout, context, { signal }) => {
      await (0, import_promises4.setTimeout)(timeout, void 0, { signal });
      context.terminationReason ??= "timeout";
      subprocess.kill();
      throw new DiscardedError();
    };
  }
});

// node_modules/execa/lib/methods/node.js
var import_node_process6, import_node_path3, mapNode, handleNodeOption;
var init_node2 = __esm({
  "node_modules/execa/lib/methods/node.js"() {
    import_node_process6 = require("node:process");
    import_node_path3 = __toESM(require("node:path"), 1);
    init_file_url();
    mapNode = ({ options }) => {
      if (options.node === false) {
        throw new TypeError('The "node" option cannot be false with `execaNode()`.');
      }
      return { options: { ...options, node: true } };
    };
    handleNodeOption = (file, commandArguments, {
      node: shouldHandleNode = false,
      nodePath = import_node_process6.execPath,
      nodeOptions = import_node_process6.execArgv.filter((nodeOption) => !nodeOption.startsWith("--inspect")),
      cwd,
      execPath: formerNodePath,
      ...options
    }) => {
      if (formerNodePath !== void 0) {
        throw new TypeError('The "execPath" option has been removed. Please use the "nodePath" option instead.');
      }
      const normalizedNodePath = safeNormalizeFileUrl(nodePath, 'The "nodePath" option');
      const resolvedNodePath = import_node_path3.default.resolve(cwd, normalizedNodePath);
      const newOptions = {
        ...options,
        nodePath: resolvedNodePath,
        node: shouldHandleNode,
        cwd
      };
      if (!shouldHandleNode) {
        return [file, commandArguments, newOptions];
      }
      if (import_node_path3.default.basename(file, ".exe") === "node") {
        throw new TypeError('When the "node" option is true, the first argument does not need to be "node".');
      }
      return [
        resolvedNodePath,
        [...nodeOptions, file, ...commandArguments],
        { ipc: true, ...newOptions, shell: false }
      ];
    };
  }
});

// node_modules/execa/lib/ipc/ipc-input.js
var import_node_v8, validateIpcInputOption, validateAdvancedInput, validateJsonInput, validateIpcInput, sendIpcInput;
var init_ipc_input = __esm({
  "node_modules/execa/lib/ipc/ipc-input.js"() {
    import_node_v8 = require("node:v8");
    validateIpcInputOption = ({ ipcInput, ipc, serialization }) => {
      if (ipcInput === void 0) {
        return;
      }
      if (!ipc) {
        throw new Error("The `ipcInput` option cannot be set unless the `ipc` option is `true`.");
      }
      validateIpcInput[serialization](ipcInput);
    };
    validateAdvancedInput = (ipcInput) => {
      try {
        (0, import_node_v8.serialize)(ipcInput);
      } catch (error) {
        throw new Error("The `ipcInput` option is not serializable with a structured clone.", { cause: error });
      }
    };
    validateJsonInput = (ipcInput) => {
      try {
        JSON.stringify(ipcInput);
      } catch (error) {
        throw new Error("The `ipcInput` option is not serializable with JSON.", { cause: error });
      }
    };
    validateIpcInput = {
      advanced: validateAdvancedInput,
      json: validateJsonInput
    };
    sendIpcInput = async (subprocess, ipcInput) => {
      if (ipcInput === void 0) {
        return;
      }
      await subprocess.sendMessage(ipcInput);
    };
  }
});

// node_modules/execa/lib/arguments/encoding-option.js
var validateEncoding, TEXT_ENCODINGS, BINARY_ENCODINGS, ENCODINGS, getCorrectEncoding, ENCODING_ALIASES, serializeEncoding;
var init_encoding_option = __esm({
  "node_modules/execa/lib/arguments/encoding-option.js"() {
    validateEncoding = ({ encoding }) => {
      if (ENCODINGS.has(encoding)) {
        return;
      }
      const correctEncoding = getCorrectEncoding(encoding);
      if (correctEncoding !== void 0) {
        throw new TypeError(`Invalid option \`encoding: ${serializeEncoding(encoding)}\`.
Please rename it to ${serializeEncoding(correctEncoding)}.`);
      }
      const correctEncodings = [...ENCODINGS].map((correctEncoding2) => serializeEncoding(correctEncoding2)).join(", ");
      throw new TypeError(`Invalid option \`encoding: ${serializeEncoding(encoding)}\`.
Please rename it to one of: ${correctEncodings}.`);
    };
    TEXT_ENCODINGS = /* @__PURE__ */ new Set(["utf8", "utf16le"]);
    BINARY_ENCODINGS = /* @__PURE__ */ new Set(["buffer", "hex", "base64", "base64url", "latin1", "ascii"]);
    ENCODINGS = /* @__PURE__ */ new Set([...TEXT_ENCODINGS, ...BINARY_ENCODINGS]);
    getCorrectEncoding = (encoding) => {
      if (encoding === null) {
        return "buffer";
      }
      if (typeof encoding !== "string") {
        return;
      }
      const lowerEncoding = encoding.toLowerCase();
      if (lowerEncoding in ENCODING_ALIASES) {
        return ENCODING_ALIASES[lowerEncoding];
      }
      if (ENCODINGS.has(lowerEncoding)) {
        return lowerEncoding;
      }
    };
    ENCODING_ALIASES = {
      // eslint-disable-next-line unicorn/text-encoding-identifier-case
      "utf-8": "utf8",
      "utf-16le": "utf16le",
      "ucs-2": "utf16le",
      ucs2: "utf16le",
      binary: "latin1"
    };
    serializeEncoding = (encoding) => typeof encoding === "string" ? `"${encoding}"` : String(encoding);
  }
});

// node_modules/execa/lib/arguments/cwd.js
var import_node_fs, import_node_path4, import_node_process7, normalizeCwd, getDefaultCwd, fixCwdError;
var init_cwd = __esm({
  "node_modules/execa/lib/arguments/cwd.js"() {
    import_node_fs = require("node:fs");
    import_node_path4 = __toESM(require("node:path"), 1);
    import_node_process7 = __toESM(require("node:process"), 1);
    init_file_url();
    normalizeCwd = (cwd = getDefaultCwd()) => {
      const cwdString = safeNormalizeFileUrl(cwd, 'The "cwd" option');
      return import_node_path4.default.resolve(cwdString);
    };
    getDefaultCwd = () => {
      try {
        return import_node_process7.default.cwd();
      } catch (error) {
        error.message = `The current directory does not exist.
${error.message}`;
        throw error;
      }
    };
    fixCwdError = (originalMessage, cwd) => {
      if (cwd === getDefaultCwd()) {
        return originalMessage;
      }
      let cwdStat;
      try {
        cwdStat = (0, import_node_fs.statSync)(cwd);
      } catch (error) {
        return `The "cwd" option is invalid: ${cwd}.
${error.message}
${originalMessage}`;
      }
      if (!cwdStat.isDirectory()) {
        return `The "cwd" option is not a directory: ${cwd}.
${originalMessage}`;
      }
      return originalMessage;
    };
  }
});

// node_modules/execa/lib/arguments/options.js
var import_node_path5, import_node_process8, import_cross_spawn, normalizeOptions, addDefaultOptions, getEnv;
var init_options = __esm({
  "node_modules/execa/lib/arguments/options.js"() {
    import_node_path5 = __toESM(require("node:path"), 1);
    import_node_process8 = __toESM(require("node:process"), 1);
    import_cross_spawn = __toESM(require_cross_spawn(), 1);
    init_npm_run_path();
    init_kill();
    init_signal();
    init_cancel();
    init_graceful2();
    init_timeout();
    init_node2();
    init_ipc_input();
    init_encoding_option();
    init_cwd();
    init_file_url();
    init_specific();
    normalizeOptions = (filePath, rawArguments, rawOptions) => {
      rawOptions.cwd = normalizeCwd(rawOptions.cwd);
      const [processedFile, processedArguments, processedOptions] = handleNodeOption(filePath, rawArguments, rawOptions);
      const { command: file, args: commandArguments, options: initialOptions } = import_cross_spawn.default._parse(processedFile, processedArguments, processedOptions);
      const fdOptions = normalizeFdSpecificOptions(initialOptions);
      const options = addDefaultOptions(fdOptions);
      validateTimeout(options);
      validateEncoding(options);
      validateIpcInputOption(options);
      validateCancelSignal(options);
      validateGracefulCancel(options);
      options.shell = normalizeFileUrl(options.shell);
      options.env = getEnv(options);
      options.killSignal = normalizeKillSignal(options.killSignal);
      options.forceKillAfterDelay = normalizeForceKillAfterDelay(options.forceKillAfterDelay);
      options.lines = options.lines.map((lines, fdNumber) => lines && !BINARY_ENCODINGS.has(options.encoding) && options.buffer[fdNumber]);
      if (import_node_process8.default.platform === "win32" && import_node_path5.default.basename(file, ".exe") === "cmd") {
        commandArguments.unshift("/q");
      }
      return { file, commandArguments, options };
    };
    addDefaultOptions = ({
      extendEnv = true,
      preferLocal = false,
      cwd,
      localDir: localDirectory = cwd,
      encoding = "utf8",
      reject = true,
      cleanup = true,
      all = false,
      windowsHide = true,
      killSignal = "SIGTERM",
      forceKillAfterDelay = true,
      gracefulCancel = false,
      ipcInput,
      ipc = ipcInput !== void 0 || gracefulCancel,
      serialization = "advanced",
      ...options
    }) => ({
      ...options,
      extendEnv,
      preferLocal,
      cwd,
      localDirectory,
      encoding,
      reject,
      cleanup,
      all,
      windowsHide,
      killSignal,
      forceKillAfterDelay,
      gracefulCancel,
      ipcInput,
      ipc,
      serialization
    });
    getEnv = ({ env: envOption, extendEnv, preferLocal, node, localDirectory, nodePath }) => {
      const env = extendEnv ? { ...import_node_process8.default.env, ...envOption } : envOption;
      if (preferLocal || node) {
        return npmRunPathEnv({
          env,
          cwd: localDirectory,
          execPath: nodePath,
          preferLocal,
          addExecPath: node
        });
      }
      return env;
    };
  }
});

// node_modules/strip-final-newline/index.js
function stripFinalNewline(input) {
  if (typeof input === "string") {
    return stripFinalNewlineString(input);
  }
  if (!(ArrayBuffer.isView(input) && input.BYTES_PER_ELEMENT === 1)) {
    throw new Error("Input must be a string or a Uint8Array");
  }
  return stripFinalNewlineBinary(input);
}
var stripFinalNewlineString, stripFinalNewlineBinary, LF, LF_BINARY, CR, CR_BINARY;
var init_strip_final_newline = __esm({
  "node_modules/strip-final-newline/index.js"() {
    stripFinalNewlineString = (input) => input.at(-1) === LF ? input.slice(0, input.at(-2) === CR ? -2 : -1) : input;
    stripFinalNewlineBinary = (input) => input.at(-1) === LF_BINARY ? input.subarray(0, input.at(-2) === CR_BINARY ? -2 : -1) : input;
    LF = "\n";
    LF_BINARY = LF.codePointAt(0);
    CR = "\r";
    CR_BINARY = CR.codePointAt(0);
  }
});

// node_modules/is-stream/index.js
function isStream(stream, { checkOpen = true } = {}) {
  return stream !== null && typeof stream === "object" && (stream.writable || stream.readable || !checkOpen || stream.writable === void 0 && stream.readable === void 0) && typeof stream.pipe === "function";
}
function isWritableStream(stream, { checkOpen = true } = {}) {
  return isStream(stream, { checkOpen }) && (stream.writable || !checkOpen) && typeof stream.write === "function" && typeof stream.end === "function" && typeof stream.writable === "boolean" && typeof stream.writableObjectMode === "boolean" && typeof stream.destroy === "function" && typeof stream.destroyed === "boolean";
}
function isReadableStream(stream, { checkOpen = true } = {}) {
  return isStream(stream, { checkOpen }) && (stream.readable || !checkOpen) && typeof stream.read === "function" && typeof stream.readable === "boolean" && typeof stream.readableObjectMode === "boolean" && typeof stream.destroy === "function" && typeof stream.destroyed === "boolean";
}
function isDuplexStream(stream, options) {
  return isWritableStream(stream, options) && isReadableStream(stream, options);
}
var init_is_stream = __esm({
  "node_modules/is-stream/index.js"() {
  }
});

// node_modules/@sec-ant/readable-stream/dist/ponyfill/asyncIterator.js
function i() {
  return this[n].next();
}
function o(r) {
  return this[n].return(r);
}
function h({ preventCancel: r = false } = {}) {
  const e = this.getReader(), t = new c(
    e,
    r
  ), s = Object.create(u);
  return s[n] = t, s;
}
var a, c, n, u;
var init_asyncIterator = __esm({
  "node_modules/@sec-ant/readable-stream/dist/ponyfill/asyncIterator.js"() {
    a = Object.getPrototypeOf(
      Object.getPrototypeOf(
        /* istanbul ignore next */
        async function* () {
        }
      ).prototype
    );
    c = class {
      #t;
      #n;
      #r = false;
      #e = void 0;
      constructor(e, t) {
        this.#t = e, this.#n = t;
      }
      next() {
        const e = () => this.#s();
        return this.#e = this.#e ? this.#e.then(e, e) : e(), this.#e;
      }
      return(e) {
        const t = () => this.#i(e);
        return this.#e ? this.#e.then(t, t) : t();
      }
      async #s() {
        if (this.#r)
          return {
            done: true,
            value: void 0
          };
        let e;
        try {
          e = await this.#t.read();
        } catch (t) {
          throw this.#e = void 0, this.#r = true, this.#t.releaseLock(), t;
        }
        return e.done && (this.#e = void 0, this.#r = true, this.#t.releaseLock()), e;
      }
      async #i(e) {
        if (this.#r)
          return {
            done: true,
            value: e
          };
        if (this.#r = true, !this.#n) {
          const t = this.#t.cancel(e);
          return this.#t.releaseLock(), await t, {
            done: true,
            value: e
          };
        }
        return this.#t.releaseLock(), {
          done: true,
          value: e
        };
      }
    };
    n = Symbol();
    Object.defineProperty(i, "name", { value: "next" });
    Object.defineProperty(o, "name", { value: "return" });
    u = Object.create(a, {
      next: {
        enumerable: true,
        configurable: true,
        writable: true,
        value: i
      },
      return: {
        enumerable: true,
        configurable: true,
        writable: true,
        value: o
      }
    });
  }
});

// node_modules/@sec-ant/readable-stream/dist/ponyfill/fromAnyIterable.js
var init_fromAnyIterable = __esm({
  "node_modules/@sec-ant/readable-stream/dist/ponyfill/fromAnyIterable.js"() {
  }
});

// node_modules/@sec-ant/readable-stream/dist/ponyfill/index.js
var init_ponyfill = __esm({
  "node_modules/@sec-ant/readable-stream/dist/ponyfill/index.js"() {
    init_asyncIterator();
    init_fromAnyIterable();
  }
});

// node_modules/get-stream/source/stream.js
var getAsyncIterable, toString, getStreamIterable, handleStreamEnd, nodeImports;
var init_stream = __esm({
  "node_modules/get-stream/source/stream.js"() {
    init_is_stream();
    init_ponyfill();
    getAsyncIterable = (stream) => {
      if (isReadableStream(stream, { checkOpen: false }) && nodeImports.on !== void 0) {
        return getStreamIterable(stream);
      }
      if (typeof stream?.[Symbol.asyncIterator] === "function") {
        return stream;
      }
      if (toString.call(stream) === "[object ReadableStream]") {
        return h.call(stream);
      }
      throw new TypeError("The first argument must be a Readable, a ReadableStream, or an async iterable.");
    };
    ({ toString } = Object.prototype);
    getStreamIterable = async function* (stream) {
      const controller = new AbortController();
      const state = {};
      handleStreamEnd(stream, controller, state);
      try {
        for await (const [chunk] of nodeImports.on(stream, "data", { signal: controller.signal })) {
          yield chunk;
        }
      } catch (error) {
        if (state.error !== void 0) {
          throw state.error;
        } else if (!controller.signal.aborted) {
          throw error;
        }
      } finally {
        stream.destroy();
      }
    };
    handleStreamEnd = async (stream, controller, state) => {
      try {
        await nodeImports.finished(stream, {
          cleanup: true,
          readable: true,
          writable: false,
          error: false
        });
      } catch (error) {
        state.error = error;
      } finally {
        controller.abort();
      }
    };
    nodeImports = {};
  }
});

// node_modules/get-stream/source/contents.js
var getStreamContents, appendFinalChunk, appendChunk, addNewChunk, getChunkType, objectToString2, MaxBufferError;
var init_contents = __esm({
  "node_modules/get-stream/source/contents.js"() {
    init_stream();
    getStreamContents = async (stream, { init, convertChunk, getSize, truncateChunk, addChunk, getFinalChunk, finalize }, { maxBuffer = Number.POSITIVE_INFINITY } = {}) => {
      const asyncIterable = getAsyncIterable(stream);
      const state = init();
      state.length = 0;
      try {
        for await (const chunk of asyncIterable) {
          const chunkType = getChunkType(chunk);
          const convertedChunk = convertChunk[chunkType](chunk, state);
          appendChunk({
            convertedChunk,
            state,
            getSize,
            truncateChunk,
            addChunk,
            maxBuffer
          });
        }
        appendFinalChunk({
          state,
          convertChunk,
          getSize,
          truncateChunk,
          addChunk,
          getFinalChunk,
          maxBuffer
        });
        return finalize(state);
      } catch (error) {
        const normalizedError = typeof error === "object" && error !== null ? error : new Error(error);
        normalizedError.bufferedData = finalize(state);
        throw normalizedError;
      }
    };
    appendFinalChunk = ({ state, getSize, truncateChunk, addChunk, getFinalChunk, maxBuffer }) => {
      const convertedChunk = getFinalChunk(state);
      if (convertedChunk !== void 0) {
        appendChunk({
          convertedChunk,
          state,
          getSize,
          truncateChunk,
          addChunk,
          maxBuffer
        });
      }
    };
    appendChunk = ({ convertedChunk, state, getSize, truncateChunk, addChunk, maxBuffer }) => {
      const chunkSize = getSize(convertedChunk);
      const newLength = state.length + chunkSize;
      if (newLength <= maxBuffer) {
        addNewChunk(convertedChunk, state, addChunk, newLength);
        return;
      }
      const truncatedChunk = truncateChunk(convertedChunk, maxBuffer - state.length);
      if (truncatedChunk !== void 0) {
        addNewChunk(truncatedChunk, state, addChunk, maxBuffer);
      }
      throw new MaxBufferError();
    };
    addNewChunk = (convertedChunk, state, addChunk, newLength) => {
      state.contents = addChunk(convertedChunk, state, newLength);
      state.length = newLength;
    };
    getChunkType = (chunk) => {
      const typeOfChunk = typeof chunk;
      if (typeOfChunk === "string") {
        return "string";
      }
      if (typeOfChunk !== "object" || chunk === null) {
        return "others";
      }
      if (globalThis.Buffer?.isBuffer(chunk)) {
        return "buffer";
      }
      const prototypeName = objectToString2.call(chunk);
      if (prototypeName === "[object ArrayBuffer]") {
        return "arrayBuffer";
      }
      if (prototypeName === "[object DataView]") {
        return "dataView";
      }
      if (Number.isInteger(chunk.byteLength) && Number.isInteger(chunk.byteOffset) && objectToString2.call(chunk.buffer) === "[object ArrayBuffer]") {
        return "typedArray";
      }
      return "others";
    };
    ({ toString: objectToString2 } = Object.prototype);
    MaxBufferError = class extends Error {
      name = "MaxBufferError";
      constructor() {
        super("maxBuffer exceeded");
      }
    };
  }
});

// node_modules/get-stream/source/utils.js
var identity2, noop, getContentsProperty, throwObjectStream, getLengthProperty;
var init_utils = __esm({
  "node_modules/get-stream/source/utils.js"() {
    identity2 = (value) => value;
    noop = () => void 0;
    getContentsProperty = ({ contents }) => contents;
    throwObjectStream = (chunk) => {
      throw new Error(`Streams in object mode are not supported: ${String(chunk)}`);
    };
    getLengthProperty = (convertedChunk) => convertedChunk.length;
  }
});

// node_modules/get-stream/source/array.js
async function getStreamAsArray(stream, options) {
  return getStreamContents(stream, arrayMethods, options);
}
var initArray, increment, addArrayChunk, arrayMethods;
var init_array = __esm({
  "node_modules/get-stream/source/array.js"() {
    init_contents();
    init_utils();
    initArray = () => ({ contents: [] });
    increment = () => 1;
    addArrayChunk = (convertedChunk, { contents }) => {
      contents.push(convertedChunk);
      return contents;
    };
    arrayMethods = {
      init: initArray,
      convertChunk: {
        string: identity2,
        buffer: identity2,
        arrayBuffer: identity2,
        dataView: identity2,
        typedArray: identity2,
        others: identity2
      },
      getSize: increment,
      truncateChunk: noop,
      addChunk: addArrayChunk,
      getFinalChunk: noop,
      finalize: getContentsProperty
    };
  }
});

// node_modules/get-stream/source/array-buffer.js
async function getStreamAsArrayBuffer(stream, options) {
  return getStreamContents(stream, arrayBufferMethods, options);
}
var initArrayBuffer, useTextEncoder, textEncoder2, useUint8Array, useUint8ArrayWithOffset, truncateArrayBufferChunk, addArrayBufferChunk, resizeArrayBufferSlow, resizeArrayBuffer, getNewContentsLength, SCALE_FACTOR, finalizeArrayBuffer, hasArrayBufferResize, arrayBufferMethods;
var init_array_buffer = __esm({
  "node_modules/get-stream/source/array-buffer.js"() {
    init_contents();
    init_utils();
    initArrayBuffer = () => ({ contents: new ArrayBuffer(0) });
    useTextEncoder = (chunk) => textEncoder2.encode(chunk);
    textEncoder2 = new TextEncoder();
    useUint8Array = (chunk) => new Uint8Array(chunk);
    useUint8ArrayWithOffset = (chunk) => new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength);
    truncateArrayBufferChunk = (convertedChunk, chunkSize) => convertedChunk.slice(0, chunkSize);
    addArrayBufferChunk = (convertedChunk, { contents, length: previousLength }, length) => {
      const newContents = hasArrayBufferResize() ? resizeArrayBuffer(contents, length) : resizeArrayBufferSlow(contents, length);
      new Uint8Array(newContents).set(convertedChunk, previousLength);
      return newContents;
    };
    resizeArrayBufferSlow = (contents, length) => {
      if (length <= contents.byteLength) {
        return contents;
      }
      const arrayBuffer = new ArrayBuffer(getNewContentsLength(length));
      new Uint8Array(arrayBuffer).set(new Uint8Array(contents), 0);
      return arrayBuffer;
    };
    resizeArrayBuffer = (contents, length) => {
      if (length <= contents.maxByteLength) {
        contents.resize(length);
        return contents;
      }
      const arrayBuffer = new ArrayBuffer(length, { maxByteLength: getNewContentsLength(length) });
      new Uint8Array(arrayBuffer).set(new Uint8Array(contents), 0);
      return arrayBuffer;
    };
    getNewContentsLength = (length) => SCALE_FACTOR ** Math.ceil(Math.log(length) / Math.log(SCALE_FACTOR));
    SCALE_FACTOR = 2;
    finalizeArrayBuffer = ({ contents, length }) => hasArrayBufferResize() ? contents : contents.slice(0, length);
    hasArrayBufferResize = () => "resize" in ArrayBuffer.prototype;
    arrayBufferMethods = {
      init: initArrayBuffer,
      convertChunk: {
        string: useTextEncoder,
        buffer: useUint8Array,
        arrayBuffer: useUint8Array,
        dataView: useUint8ArrayWithOffset,
        typedArray: useUint8ArrayWithOffset,
        others: throwObjectStream
      },
      getSize: getLengthProperty,
      truncateChunk: truncateArrayBufferChunk,
      addChunk: addArrayBufferChunk,
      getFinalChunk: noop,
      finalize: finalizeArrayBuffer
    };
  }
});

// node_modules/get-stream/source/string.js
async function getStreamAsString(stream, options) {
  return getStreamContents(stream, stringMethods, options);
}
var initString, useTextDecoder, addStringChunk, truncateStringChunk, getFinalStringChunk, stringMethods;
var init_string = __esm({
  "node_modules/get-stream/source/string.js"() {
    init_contents();
    init_utils();
    initString = () => ({ contents: "", textDecoder: new TextDecoder() });
    useTextDecoder = (chunk, { textDecoder: textDecoder2 }) => textDecoder2.decode(chunk, { stream: true });
    addStringChunk = (convertedChunk, { contents }) => contents + convertedChunk;
    truncateStringChunk = (convertedChunk, chunkSize) => convertedChunk.slice(0, chunkSize);
    getFinalStringChunk = ({ textDecoder: textDecoder2 }) => {
      const finalChunk = textDecoder2.decode();
      return finalChunk === "" ? void 0 : finalChunk;
    };
    stringMethods = {
      init: initString,
      convertChunk: {
        string: identity2,
        buffer: useTextDecoder,
        arrayBuffer: useTextDecoder,
        dataView: useTextDecoder,
        typedArray: useTextDecoder,
        others: throwObjectStream
      },
      getSize: getLengthProperty,
      truncateChunk: truncateStringChunk,
      addChunk: addStringChunk,
      getFinalChunk: getFinalStringChunk,
      finalize: getContentsProperty
    };
  }
});

// node_modules/get-stream/source/exports.js
var init_exports = __esm({
  "node_modules/get-stream/source/exports.js"() {
    init_array();
    init_array_buffer();
    init_string();
    init_contents();
  }
});

// node_modules/get-stream/source/index.js
var import_node_events6, import_promises5;
var init_source = __esm({
  "node_modules/get-stream/source/index.js"() {
    import_node_events6 = require("node:events");
    import_promises5 = require("node:stream/promises");
    init_stream();
    init_exports();
    Object.assign(nodeImports, { on: import_node_events6.on, finished: import_promises5.finished });
  }
});

// node_modules/execa/lib/io/max-buffer.js
var handleMaxBuffer, getMaxBufferUnit, checkIpcMaxBuffer, getMaxBufferMessage, getMaxBufferInfo, isMaxBufferSync, truncateMaxBufferSync, getMaxBufferSync;
var init_max_buffer = __esm({
  "node_modules/execa/lib/io/max-buffer.js"() {
    init_source();
    init_standard_stream();
    init_specific();
    handleMaxBuffer = ({ error, stream, readableObjectMode, lines, encoding, fdNumber }) => {
      if (!(error instanceof MaxBufferError)) {
        throw error;
      }
      if (fdNumber === "all") {
        return error;
      }
      const unit = getMaxBufferUnit(readableObjectMode, lines, encoding);
      error.maxBufferInfo = { fdNumber, unit };
      stream.destroy();
      throw error;
    };
    getMaxBufferUnit = (readableObjectMode, lines, encoding) => {
      if (readableObjectMode) {
        return "objects";
      }
      if (lines) {
        return "lines";
      }
      if (encoding === "buffer") {
        return "bytes";
      }
      return "characters";
    };
    checkIpcMaxBuffer = (subprocess, ipcOutput, maxBuffer) => {
      if (ipcOutput.length !== maxBuffer) {
        return;
      }
      const error = new MaxBufferError();
      error.maxBufferInfo = { fdNumber: "ipc" };
      throw error;
    };
    getMaxBufferMessage = (error, maxBuffer) => {
      const { streamName, threshold, unit } = getMaxBufferInfo(error, maxBuffer);
      return `Command's ${streamName} was larger than ${threshold} ${unit}`;
    };
    getMaxBufferInfo = (error, maxBuffer) => {
      if (error?.maxBufferInfo === void 0) {
        return { streamName: "output", threshold: maxBuffer[1], unit: "bytes" };
      }
      const { maxBufferInfo: { fdNumber, unit } } = error;
      delete error.maxBufferInfo;
      const threshold = getFdSpecificValue(maxBuffer, fdNumber);
      if (fdNumber === "ipc") {
        return { streamName: "IPC output", threshold, unit: "messages" };
      }
      return { streamName: getStreamName(fdNumber), threshold, unit };
    };
    isMaxBufferSync = (resultError, output, maxBuffer) => resultError?.code === "ENOBUFS" && output !== null && output.some((result) => result !== null && result.length > getMaxBufferSync(maxBuffer));
    truncateMaxBufferSync = (result, isMaxBuffer, maxBuffer) => {
      if (!isMaxBuffer) {
        return result;
      }
      const maxBufferValue = getMaxBufferSync(maxBuffer);
      return result.length > maxBufferValue ? result.slice(0, maxBufferValue) : result;
    };
    getMaxBufferSync = ([, stdoutMaxBuffer]) => stdoutMaxBuffer;
  }
});

// node_modules/execa/lib/return/message.js
var import_node_util6, createMessages, getErrorPrefix, getForcefulSuffix, getOriginalMessage, serializeIpcMessage, serializeMessagePart, serializeMessageItem;
var init_message = __esm({
  "node_modules/execa/lib/return/message.js"() {
    import_node_util6 = require("node:util");
    init_strip_final_newline();
    init_uint_array();
    init_cwd();
    init_escape();
    init_max_buffer();
    init_signal();
    init_final_error();
    createMessages = ({
      stdio,
      all,
      ipcOutput,
      originalError,
      signal,
      signalDescription,
      exitCode,
      escapedCommand,
      timedOut,
      isCanceled,
      isGracefullyCanceled,
      isMaxBuffer,
      isForcefullyTerminated,
      forceKillAfterDelay,
      killSignal,
      maxBuffer,
      timeout,
      cwd
    }) => {
      const errorCode = originalError?.code;
      const prefix = getErrorPrefix({
        originalError,
        timedOut,
        timeout,
        isMaxBuffer,
        maxBuffer,
        errorCode,
        signal,
        signalDescription,
        exitCode,
        isCanceled,
        isGracefullyCanceled,
        isForcefullyTerminated,
        forceKillAfterDelay,
        killSignal
      });
      const originalMessage = getOriginalMessage(originalError, cwd);
      const suffix = originalMessage === void 0 ? "" : `
${originalMessage}`;
      const shortMessage = `${prefix}: ${escapedCommand}${suffix}`;
      const messageStdio = all === void 0 ? [stdio[2], stdio[1]] : [all];
      const message = [
        shortMessage,
        ...messageStdio,
        ...stdio.slice(3),
        ipcOutput.map((ipcMessage) => serializeIpcMessage(ipcMessage)).join("\n")
      ].map((messagePart) => escapeLines(stripFinalNewline(serializeMessagePart(messagePart)))).filter(Boolean).join("\n\n");
      return { originalMessage, shortMessage, message };
    };
    getErrorPrefix = ({
      originalError,
      timedOut,
      timeout,
      isMaxBuffer,
      maxBuffer,
      errorCode,
      signal,
      signalDescription,
      exitCode,
      isCanceled,
      isGracefullyCanceled,
      isForcefullyTerminated,
      forceKillAfterDelay,
      killSignal
    }) => {
      const forcefulSuffix = getForcefulSuffix(isForcefullyTerminated, forceKillAfterDelay);
      if (timedOut) {
        return `Command timed out after ${timeout} milliseconds${forcefulSuffix}`;
      }
      if (isGracefullyCanceled) {
        if (signal === void 0) {
          return `Command was gracefully canceled with exit code ${exitCode}`;
        }
        return isForcefullyTerminated ? `Command was gracefully canceled${forcefulSuffix}` : `Command was gracefully canceled with ${signal} (${signalDescription})`;
      }
      if (isCanceled) {
        return `Command was canceled${forcefulSuffix}`;
      }
      if (isMaxBuffer) {
        return `${getMaxBufferMessage(originalError, maxBuffer)}${forcefulSuffix}`;
      }
      if (errorCode !== void 0) {
        return `Command failed with ${errorCode}${forcefulSuffix}`;
      }
      if (isForcefullyTerminated) {
        return `Command was killed with ${killSignal} (${getSignalDescription(killSignal)})${forcefulSuffix}`;
      }
      if (signal !== void 0) {
        return `Command was killed with ${signal} (${signalDescription})`;
      }
      if (exitCode !== void 0) {
        return `Command failed with exit code ${exitCode}`;
      }
      return "Command failed";
    };
    getForcefulSuffix = (isForcefullyTerminated, forceKillAfterDelay) => isForcefullyTerminated ? ` and was forcefully terminated after ${forceKillAfterDelay} milliseconds` : "";
    getOriginalMessage = (originalError, cwd) => {
      if (originalError instanceof DiscardedError) {
        return;
      }
      const originalMessage = isExecaError(originalError) ? originalError.originalMessage : String(originalError?.message ?? originalError);
      const escapedOriginalMessage = escapeLines(fixCwdError(originalMessage, cwd));
      return escapedOriginalMessage === "" ? void 0 : escapedOriginalMessage;
    };
    serializeIpcMessage = (ipcMessage) => typeof ipcMessage === "string" ? ipcMessage : (0, import_node_util6.inspect)(ipcMessage);
    serializeMessagePart = (messagePart) => Array.isArray(messagePart) ? messagePart.map((messageItem) => stripFinalNewline(serializeMessageItem(messageItem))).filter(Boolean).join("\n") : serializeMessageItem(messagePart);
    serializeMessageItem = (messageItem) => {
      if (typeof messageItem === "string") {
        return messageItem;
      }
      if (isUint8Array(messageItem)) {
        return uint8ArrayToString(messageItem);
      }
      return "";
    };
  }
});

// node_modules/execa/lib/return/result.js
var makeSuccessResult, makeEarlyError, makeError, getErrorProperties, omitUndefinedProperties, normalizeExitPayload;
var init_result = __esm({
  "node_modules/execa/lib/return/result.js"() {
    init_signal();
    init_duration();
    init_final_error();
    init_message();
    makeSuccessResult = ({
      command,
      escapedCommand,
      stdio,
      all,
      ipcOutput,
      options: { cwd },
      startTime
    }) => omitUndefinedProperties({
      command,
      escapedCommand,
      cwd,
      durationMs: getDurationMs(startTime),
      failed: false,
      timedOut: false,
      isCanceled: false,
      isGracefullyCanceled: false,
      isTerminated: false,
      isMaxBuffer: false,
      isForcefullyTerminated: false,
      exitCode: 0,
      stdout: stdio[1],
      stderr: stdio[2],
      all,
      stdio,
      ipcOutput,
      pipedFrom: []
    });
    makeEarlyError = ({
      error,
      command,
      escapedCommand,
      fileDescriptors,
      options,
      startTime,
      isSync
    }) => makeError({
      error,
      command,
      escapedCommand,
      startTime,
      timedOut: false,
      isCanceled: false,
      isGracefullyCanceled: false,
      isMaxBuffer: false,
      isForcefullyTerminated: false,
      stdio: Array.from({ length: fileDescriptors.length }),
      ipcOutput: [],
      options,
      isSync
    });
    makeError = ({
      error: originalError,
      command,
      escapedCommand,
      startTime,
      timedOut,
      isCanceled,
      isGracefullyCanceled,
      isMaxBuffer,
      isForcefullyTerminated,
      exitCode: rawExitCode,
      signal: rawSignal,
      stdio,
      all,
      ipcOutput,
      options: {
        timeoutDuration,
        timeout = timeoutDuration,
        forceKillAfterDelay,
        killSignal,
        cwd,
        maxBuffer
      },
      isSync
    }) => {
      const { exitCode, signal, signalDescription } = normalizeExitPayload(rawExitCode, rawSignal);
      const { originalMessage, shortMessage, message } = createMessages({
        stdio,
        all,
        ipcOutput,
        originalError,
        signal,
        signalDescription,
        exitCode,
        escapedCommand,
        timedOut,
        isCanceled,
        isGracefullyCanceled,
        isMaxBuffer,
        isForcefullyTerminated,
        forceKillAfterDelay,
        killSignal,
        maxBuffer,
        timeout,
        cwd
      });
      const error = getFinalError(originalError, message, isSync);
      Object.assign(error, getErrorProperties({
        error,
        command,
        escapedCommand,
        startTime,
        timedOut,
        isCanceled,
        isGracefullyCanceled,
        isMaxBuffer,
        isForcefullyTerminated,
        exitCode,
        signal,
        signalDescription,
        stdio,
        all,
        ipcOutput,
        cwd,
        originalMessage,
        shortMessage
      }));
      return error;
    };
    getErrorProperties = ({
      error,
      command,
      escapedCommand,
      startTime,
      timedOut,
      isCanceled,
      isGracefullyCanceled,
      isMaxBuffer,
      isForcefullyTerminated,
      exitCode,
      signal,
      signalDescription,
      stdio,
      all,
      ipcOutput,
      cwd,
      originalMessage,
      shortMessage
    }) => omitUndefinedProperties({
      shortMessage,
      originalMessage,
      command,
      escapedCommand,
      cwd,
      durationMs: getDurationMs(startTime),
      failed: true,
      timedOut,
      isCanceled,
      isGracefullyCanceled,
      isTerminated: signal !== void 0,
      isMaxBuffer,
      isForcefullyTerminated,
      exitCode,
      signal,
      signalDescription,
      code: error.cause?.code,
      stdout: stdio[1],
      stderr: stdio[2],
      all,
      stdio,
      ipcOutput,
      pipedFrom: []
    });
    omitUndefinedProperties = (result) => Object.fromEntries(Object.entries(result).filter(([, value]) => value !== void 0));
    normalizeExitPayload = (rawExitCode, rawSignal) => {
      const exitCode = rawExitCode === null ? void 0 : rawExitCode;
      const signal = rawSignal === null ? void 0 : rawSignal;
      const signalDescription = signal === void 0 ? void 0 : getSignalDescription(rawSignal);
      return { exitCode, signal, signalDescription };
    };
  }
});

// node_modules/parse-ms/index.js
function parseNumber(milliseconds) {
  return {
    days: Math.trunc(milliseconds / 864e5),
    hours: Math.trunc(milliseconds / 36e5 % 24),
    minutes: Math.trunc(milliseconds / 6e4 % 60),
    seconds: Math.trunc(milliseconds / 1e3 % 60),
    milliseconds: Math.trunc(milliseconds % 1e3),
    microseconds: Math.trunc(toZeroIfInfinity(milliseconds * 1e3) % 1e3),
    nanoseconds: Math.trunc(toZeroIfInfinity(milliseconds * 1e6) % 1e3)
  };
}
function parseBigint(milliseconds) {
  return {
    days: milliseconds / 86400000n,
    hours: milliseconds / 3600000n % 24n,
    minutes: milliseconds / 60000n % 60n,
    seconds: milliseconds / 1000n % 60n,
    milliseconds: milliseconds % 1000n,
    microseconds: 0n,
    nanoseconds: 0n
  };
}
function parseMilliseconds(milliseconds) {
  switch (typeof milliseconds) {
    case "number": {
      if (Number.isFinite(milliseconds)) {
        return parseNumber(milliseconds);
      }
      break;
    }
    case "bigint": {
      return parseBigint(milliseconds);
    }
  }
  throw new TypeError("Expected a finite number or bigint");
}
var toZeroIfInfinity;
var init_parse_ms = __esm({
  "node_modules/parse-ms/index.js"() {
    toZeroIfInfinity = (value) => Number.isFinite(value) ? value : 0;
  }
});

// node_modules/pretty-ms/index.js
function prettyMilliseconds(milliseconds, options) {
  const isBigInt = typeof milliseconds === "bigint";
  if (!isBigInt && !Number.isFinite(milliseconds)) {
    throw new TypeError("Expected a finite number or bigint");
  }
  options = { ...options };
  const sign = milliseconds < 0 ? "-" : "";
  milliseconds = milliseconds < 0 ? -milliseconds : milliseconds;
  if (options.colonNotation) {
    options.compact = false;
    options.formatSubMilliseconds = false;
    options.separateMilliseconds = false;
    options.verbose = false;
  }
  if (options.compact) {
    options.unitCount = 1;
    options.secondsDecimalDigits = 0;
    options.millisecondsDecimalDigits = 0;
  }
  let result = [];
  const floorDecimals = (value, decimalDigits) => {
    const flooredInterimValue = Math.floor(value * 10 ** decimalDigits + SECOND_ROUNDING_EPSILON);
    const flooredValue = Math.round(flooredInterimValue) / 10 ** decimalDigits;
    return flooredValue.toFixed(decimalDigits);
  };
  const add = (value, long, short, valueString) => {
    if ((result.length === 0 || !options.colonNotation) && isZero(value) && !(options.colonNotation && short === "m")) {
      return;
    }
    valueString ??= String(value);
    if (options.colonNotation) {
      const wholeDigits = valueString.includes(".") ? valueString.split(".")[0].length : valueString.length;
      const minLength = result.length > 0 ? 2 : 1;
      valueString = "0".repeat(Math.max(0, minLength - wholeDigits)) + valueString;
    } else {
      valueString += options.verbose ? " " + pluralize(long, value) : short;
    }
    result.push(valueString);
  };
  const parsed = parseMilliseconds(milliseconds);
  const days = BigInt(parsed.days);
  if (options.hideYearAndDays) {
    add(BigInt(days) * 24n + BigInt(parsed.hours), "hour", "h");
  } else {
    if (options.hideYear) {
      add(days, "day", "d");
    } else {
      add(days / 365n, "year", "y");
      add(days % 365n, "day", "d");
    }
    add(Number(parsed.hours), "hour", "h");
  }
  add(Number(parsed.minutes), "minute", "m");
  if (!options.hideSeconds) {
    if (options.separateMilliseconds || options.formatSubMilliseconds || !options.colonNotation && milliseconds < 1e3) {
      const seconds = Number(parsed.seconds);
      const milliseconds2 = Number(parsed.milliseconds);
      const microseconds = Number(parsed.microseconds);
      const nanoseconds = Number(parsed.nanoseconds);
      add(seconds, "second", "s");
      if (options.formatSubMilliseconds) {
        add(milliseconds2, "millisecond", "ms");
        add(microseconds, "microsecond", "\xB5s");
        add(nanoseconds, "nanosecond", "ns");
      } else {
        const millisecondsAndBelow = milliseconds2 + microseconds / 1e3 + nanoseconds / 1e6;
        const millisecondsDecimalDigits = typeof options.millisecondsDecimalDigits === "number" ? options.millisecondsDecimalDigits : 0;
        const roundedMilliseconds = millisecondsAndBelow >= 1 ? Math.round(millisecondsAndBelow) : Math.ceil(millisecondsAndBelow);
        const millisecondsString = millisecondsDecimalDigits ? millisecondsAndBelow.toFixed(millisecondsDecimalDigits) : roundedMilliseconds;
        add(
          Number.parseFloat(millisecondsString),
          "millisecond",
          "ms",
          millisecondsString
        );
      }
    } else {
      const seconds = (isBigInt ? Number(milliseconds % ONE_DAY_IN_MILLISECONDS) : milliseconds) / 1e3 % 60;
      const secondsDecimalDigits = typeof options.secondsDecimalDigits === "number" ? options.secondsDecimalDigits : 1;
      const secondsFixed = floorDecimals(seconds, secondsDecimalDigits);
      const secondsString = options.keepDecimalsOnWholeSeconds ? secondsFixed : secondsFixed.replace(/\.0+$/, "");
      add(Number.parseFloat(secondsString), "second", "s", secondsString);
    }
  }
  if (result.length === 0) {
    return sign + "0" + (options.verbose ? " milliseconds" : "ms");
  }
  const separator = options.colonNotation ? ":" : " ";
  if (typeof options.unitCount === "number") {
    result = result.slice(0, Math.max(options.unitCount, 1));
  }
  return sign + result.join(separator);
}
var isZero, pluralize, SECOND_ROUNDING_EPSILON, ONE_DAY_IN_MILLISECONDS;
var init_pretty_ms = __esm({
  "node_modules/pretty-ms/index.js"() {
    init_parse_ms();
    isZero = (value) => value === 0 || value === 0n;
    pluralize = (word, count2) => count2 === 1 || count2 === 1n ? word : `${word}s`;
    SECOND_ROUNDING_EPSILON = 1e-7;
    ONE_DAY_IN_MILLISECONDS = 24n * 60n * 60n * 1000n;
  }
});

// node_modules/execa/lib/verbose/error.js
var logError;
var init_error = __esm({
  "node_modules/execa/lib/verbose/error.js"() {
    init_log();
    logError = (result, verboseInfo) => {
      if (result.failed) {
        verboseLog({
          type: "error",
          verboseMessage: result.shortMessage,
          verboseInfo,
          result
        });
      }
    };
  }
});

// node_modules/execa/lib/verbose/complete.js
var logResult, logDuration;
var init_complete = __esm({
  "node_modules/execa/lib/verbose/complete.js"() {
    init_pretty_ms();
    init_values();
    init_log();
    init_error();
    logResult = (result, verboseInfo) => {
      if (!isVerbose(verboseInfo)) {
        return;
      }
      logError(result, verboseInfo);
      logDuration(result, verboseInfo);
    };
    logDuration = (result, verboseInfo) => {
      const verboseMessage = `(done in ${prettyMilliseconds(result.durationMs)})`;
      verboseLog({
        type: "duration",
        verboseMessage,
        verboseInfo,
        result
      });
    };
  }
});

// node_modules/execa/lib/return/reject.js
var handleResult;
var init_reject = __esm({
  "node_modules/execa/lib/return/reject.js"() {
    init_complete();
    handleResult = (result, verboseInfo, { reject }) => {
      logResult(result, verboseInfo);
      if (result.failed && reject) {
        throw result;
      }
      return result;
    };
  }
});

// node_modules/execa/lib/stdio/type.js
var getStdioItemType, getTransformObjectType, getDuplexType, getTransformStreamType, validateNonGeneratorType, checkUndefinedOption, getGeneratorObjectType, checkBooleanOption, isGenerator, isAsyncGenerator, isSyncGenerator, isTransformOptions, isUrl, isRegularUrl, isFilePathObject, FILE_PATH_KEYS, isFilePathString, isUnknownStdioString, KNOWN_STDIO_STRINGS, isReadableStream2, isWritableStream2, isWebStream, isTransformStream, isAsyncIterableObject, isIterableObject, isObject, TRANSFORM_TYPES, FILE_TYPES, SPECIAL_DUPLICATE_TYPES_SYNC, SPECIAL_DUPLICATE_TYPES, FORBID_DUPLICATE_TYPES, TYPE_TO_MESSAGE;
var init_type = __esm({
  "node_modules/execa/lib/stdio/type.js"() {
    init_is_stream();
    init_is_plain_obj();
    init_uint_array();
    getStdioItemType = (value, optionName) => {
      if (isAsyncGenerator(value)) {
        return "asyncGenerator";
      }
      if (isSyncGenerator(value)) {
        return "generator";
      }
      if (isUrl(value)) {
        return "fileUrl";
      }
      if (isFilePathObject(value)) {
        return "filePath";
      }
      if (isWebStream(value)) {
        return "webStream";
      }
      if (isStream(value, { checkOpen: false })) {
        return "native";
      }
      if (isUint8Array(value)) {
        return "uint8Array";
      }
      if (isAsyncIterableObject(value)) {
        return "asyncIterable";
      }
      if (isIterableObject(value)) {
        return "iterable";
      }
      if (isTransformStream(value)) {
        return getTransformStreamType({ transform: value }, optionName);
      }
      if (isTransformOptions(value)) {
        return getTransformObjectType(value, optionName);
      }
      return "native";
    };
    getTransformObjectType = (value, optionName) => {
      if (isDuplexStream(value.transform, { checkOpen: false })) {
        return getDuplexType(value, optionName);
      }
      if (isTransformStream(value.transform)) {
        return getTransformStreamType(value, optionName);
      }
      return getGeneratorObjectType(value, optionName);
    };
    getDuplexType = (value, optionName) => {
      validateNonGeneratorType(value, optionName, "Duplex stream");
      return "duplex";
    };
    getTransformStreamType = (value, optionName) => {
      validateNonGeneratorType(value, optionName, "web TransformStream");
      return "webTransform";
    };
    validateNonGeneratorType = ({ final, binary, objectMode }, optionName, typeName) => {
      checkUndefinedOption(final, `${optionName}.final`, typeName);
      checkUndefinedOption(binary, `${optionName}.binary`, typeName);
      checkBooleanOption(objectMode, `${optionName}.objectMode`);
    };
    checkUndefinedOption = (value, optionName, typeName) => {
      if (value !== void 0) {
        throw new TypeError(`The \`${optionName}\` option can only be defined when using a generator, not a ${typeName}.`);
      }
    };
    getGeneratorObjectType = ({ transform, final, binary, objectMode }, optionName) => {
      if (transform !== void 0 && !isGenerator(transform)) {
        throw new TypeError(`The \`${optionName}.transform\` option must be a generator, a Duplex stream or a web TransformStream.`);
      }
      if (isDuplexStream(final, { checkOpen: false })) {
        throw new TypeError(`The \`${optionName}.final\` option must not be a Duplex stream.`);
      }
      if (isTransformStream(final)) {
        throw new TypeError(`The \`${optionName}.final\` option must not be a web TransformStream.`);
      }
      if (final !== void 0 && !isGenerator(final)) {
        throw new TypeError(`The \`${optionName}.final\` option must be a generator.`);
      }
      checkBooleanOption(binary, `${optionName}.binary`);
      checkBooleanOption(objectMode, `${optionName}.objectMode`);
      return isAsyncGenerator(transform) || isAsyncGenerator(final) ? "asyncGenerator" : "generator";
    };
    checkBooleanOption = (value, optionName) => {
      if (value !== void 0 && typeof value !== "boolean") {
        throw new TypeError(`The \`${optionName}\` option must use a boolean.`);
      }
    };
    isGenerator = (value) => isAsyncGenerator(value) || isSyncGenerator(value);
    isAsyncGenerator = (value) => Object.prototype.toString.call(value) === "[object AsyncGeneratorFunction]";
    isSyncGenerator = (value) => Object.prototype.toString.call(value) === "[object GeneratorFunction]";
    isTransformOptions = (value) => isPlainObject(value) && (value.transform !== void 0 || value.final !== void 0);
    isUrl = (value) => Object.prototype.toString.call(value) === "[object URL]";
    isRegularUrl = (value) => isUrl(value) && value.protocol !== "file:";
    isFilePathObject = (value) => isPlainObject(value) && Object.keys(value).length > 0 && Object.keys(value).every((key) => FILE_PATH_KEYS.has(key)) && isFilePathString(value.file);
    FILE_PATH_KEYS = /* @__PURE__ */ new Set(["file", "append"]);
    isFilePathString = (file) => typeof file === "string";
    isUnknownStdioString = (type, value) => type === "native" && typeof value === "string" && !KNOWN_STDIO_STRINGS.has(value);
    KNOWN_STDIO_STRINGS = /* @__PURE__ */ new Set(["ipc", "ignore", "inherit", "overlapped", "pipe"]);
    isReadableStream2 = (value) => Object.prototype.toString.call(value) === "[object ReadableStream]";
    isWritableStream2 = (value) => Object.prototype.toString.call(value) === "[object WritableStream]";
    isWebStream = (value) => isReadableStream2(value) || isWritableStream2(value);
    isTransformStream = (value) => isReadableStream2(value?.readable) && isWritableStream2(value?.writable);
    isAsyncIterableObject = (value) => isObject(value) && typeof value[Symbol.asyncIterator] === "function";
    isIterableObject = (value) => isObject(value) && typeof value[Symbol.iterator] === "function";
    isObject = (value) => typeof value === "object" && value !== null;
    TRANSFORM_TYPES = /* @__PURE__ */ new Set(["generator", "asyncGenerator", "duplex", "webTransform"]);
    FILE_TYPES = /* @__PURE__ */ new Set(["fileUrl", "filePath", "fileNumber"]);
    SPECIAL_DUPLICATE_TYPES_SYNC = /* @__PURE__ */ new Set(["fileUrl", "filePath"]);
    SPECIAL_DUPLICATE_TYPES = /* @__PURE__ */ new Set([...SPECIAL_DUPLICATE_TYPES_SYNC, "webStream", "nodeStream"]);
    FORBID_DUPLICATE_TYPES = /* @__PURE__ */ new Set(["webTransform", "duplex"]);
    TYPE_TO_MESSAGE = {
      generator: "a generator",
      asyncGenerator: "an async generator",
      fileUrl: "a file URL",
      filePath: "a file path string",
      fileNumber: "a file descriptor number",
      webStream: "a web stream",
      nodeStream: "a Node.js stream",
      webTransform: "a web TransformStream",
      duplex: "a Duplex stream",
      native: "any value",
      iterable: "an iterable",
      asyncIterable: "an async iterable",
      string: "a string",
      uint8Array: "a Uint8Array"
    };
  }
});

// node_modules/execa/lib/transform/object-mode.js
var getTransformObjectModes, getOutputObjectModes, getInputObjectModes, getFdObjectMode;
var init_object_mode = __esm({
  "node_modules/execa/lib/transform/object-mode.js"() {
    init_type();
    getTransformObjectModes = (objectMode, index, newTransforms, direction) => direction === "output" ? getOutputObjectModes(objectMode, index, newTransforms) : getInputObjectModes(objectMode, index, newTransforms);
    getOutputObjectModes = (objectMode, index, newTransforms) => {
      const writableObjectMode = index !== 0 && newTransforms[index - 1].value.readableObjectMode;
      const readableObjectMode = objectMode ?? writableObjectMode;
      return { writableObjectMode, readableObjectMode };
    };
    getInputObjectModes = (objectMode, index, newTransforms) => {
      const writableObjectMode = index === 0 ? objectMode === true : newTransforms[index - 1].value.readableObjectMode;
      const readableObjectMode = index !== newTransforms.length - 1 && (objectMode ?? writableObjectMode);
      return { writableObjectMode, readableObjectMode };
    };
    getFdObjectMode = (stdioItems, direction) => {
      const lastTransform = stdioItems.findLast(({ type }) => TRANSFORM_TYPES.has(type));
      if (lastTransform === void 0) {
        return false;
      }
      return direction === "input" ? lastTransform.value.writableObjectMode : lastTransform.value.readableObjectMode;
    };
  }
});

// node_modules/execa/lib/transform/normalize.js
var normalizeTransforms, getTransforms, normalizeTransform, normalizeDuplex, normalizeTransformStream, normalizeGenerator, sortTransforms;
var init_normalize = __esm({
  "node_modules/execa/lib/transform/normalize.js"() {
    init_is_plain_obj();
    init_encoding_option();
    init_type();
    init_object_mode();
    normalizeTransforms = (stdioItems, optionName, direction, options) => [
      ...stdioItems.filter(({ type }) => !TRANSFORM_TYPES.has(type)),
      ...getTransforms(stdioItems, optionName, direction, options)
    ];
    getTransforms = (stdioItems, optionName, direction, { encoding }) => {
      const transforms = stdioItems.filter(({ type }) => TRANSFORM_TYPES.has(type));
      const newTransforms = Array.from({ length: transforms.length });
      for (const [index, stdioItem] of Object.entries(transforms)) {
        newTransforms[index] = normalizeTransform({
          stdioItem,
          index: Number(index),
          newTransforms,
          optionName,
          direction,
          encoding
        });
      }
      return sortTransforms(newTransforms, direction);
    };
    normalizeTransform = ({ stdioItem, stdioItem: { type }, index, newTransforms, optionName, direction, encoding }) => {
      if (type === "duplex") {
        return normalizeDuplex({ stdioItem, optionName });
      }
      if (type === "webTransform") {
        return normalizeTransformStream({
          stdioItem,
          index,
          newTransforms,
          direction
        });
      }
      return normalizeGenerator({
        stdioItem,
        index,
        newTransforms,
        direction,
        encoding
      });
    };
    normalizeDuplex = ({
      stdioItem,
      stdioItem: {
        value: {
          transform,
          transform: { writableObjectMode, readableObjectMode },
          objectMode = readableObjectMode
        }
      },
      optionName
    }) => {
      if (objectMode && !readableObjectMode) {
        throw new TypeError(`The \`${optionName}.objectMode\` option can only be \`true\` if \`new Duplex({objectMode: true})\` is used.`);
      }
      if (!objectMode && readableObjectMode) {
        throw new TypeError(`The \`${optionName}.objectMode\` option cannot be \`false\` if \`new Duplex({objectMode: true})\` is used.`);
      }
      return {
        ...stdioItem,
        value: { transform, writableObjectMode, readableObjectMode }
      };
    };
    normalizeTransformStream = ({ stdioItem, stdioItem: { value }, index, newTransforms, direction }) => {
      const { transform, objectMode } = isPlainObject(value) ? value : { transform: value };
      const { writableObjectMode, readableObjectMode } = getTransformObjectModes(objectMode, index, newTransforms, direction);
      return {
        ...stdioItem,
        value: { transform, writableObjectMode, readableObjectMode }
      };
    };
    normalizeGenerator = ({ stdioItem, stdioItem: { value }, index, newTransforms, direction, encoding }) => {
      const {
        transform,
        final,
        binary: binaryOption = false,
        preserveNewlines = false,
        objectMode
      } = isPlainObject(value) ? value : { transform: value };
      const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
      const { writableObjectMode, readableObjectMode } = getTransformObjectModes(objectMode, index, newTransforms, direction);
      return {
        ...stdioItem,
        value: {
          transform,
          final,
          binary,
          preserveNewlines,
          writableObjectMode,
          readableObjectMode
        }
      };
    };
    sortTransforms = (newTransforms, direction) => direction === "input" ? newTransforms.reverse() : newTransforms;
  }
});

// node_modules/execa/lib/stdio/direction.js
var import_node_process9, getStreamDirection, getStdioItemDirection, KNOWN_DIRECTIONS, anyDirection, alwaysInput, guessStreamDirection, getStandardStreamDirection, DEFAULT_DIRECTION;
var init_direction = __esm({
  "node_modules/execa/lib/stdio/direction.js"() {
    import_node_process9 = __toESM(require("node:process"), 1);
    init_is_stream();
    init_type();
    getStreamDirection = (stdioItems, fdNumber, optionName) => {
      const directions = stdioItems.map((stdioItem) => getStdioItemDirection(stdioItem, fdNumber));
      if (directions.includes("input") && directions.includes("output")) {
        throw new TypeError(`The \`${optionName}\` option must not be an array of both readable and writable values.`);
      }
      return directions.find(Boolean) ?? DEFAULT_DIRECTION;
    };
    getStdioItemDirection = ({ type, value }, fdNumber) => KNOWN_DIRECTIONS[fdNumber] ?? guessStreamDirection[type](value);
    KNOWN_DIRECTIONS = ["input", "output", "output"];
    anyDirection = () => void 0;
    alwaysInput = () => "input";
    guessStreamDirection = {
      generator: anyDirection,
      asyncGenerator: anyDirection,
      fileUrl: anyDirection,
      filePath: anyDirection,
      iterable: alwaysInput,
      asyncIterable: alwaysInput,
      uint8Array: alwaysInput,
      webStream: (value) => isWritableStream2(value) ? "output" : "input",
      nodeStream(value) {
        if (!isReadableStream(value, { checkOpen: false })) {
          return "output";
        }
        return isWritableStream(value, { checkOpen: false }) ? void 0 : "input";
      },
      webTransform: anyDirection,
      duplex: anyDirection,
      native(value) {
        const standardStreamDirection = getStandardStreamDirection(value);
        if (standardStreamDirection !== void 0) {
          return standardStreamDirection;
        }
        if (isStream(value, { checkOpen: false })) {
          return guessStreamDirection.nodeStream(value);
        }
      }
    };
    getStandardStreamDirection = (value) => {
      if ([0, import_node_process9.default.stdin].includes(value)) {
        return "input";
      }
      if ([1, 2, import_node_process9.default.stdout, import_node_process9.default.stderr].includes(value)) {
        return "output";
      }
    };
    DEFAULT_DIRECTION = "output";
  }
});

// node_modules/execa/lib/ipc/array.js
var normalizeIpcStdioArray;
var init_array2 = __esm({
  "node_modules/execa/lib/ipc/array.js"() {
    normalizeIpcStdioArray = (stdioArray, ipc) => ipc && !stdioArray.includes("ipc") ? [...stdioArray, "ipc"] : stdioArray;
  }
});

// node_modules/execa/lib/stdio/stdio-option.js
var normalizeStdioOption, getStdioArray, hasAlias, addDefaultValue2, normalizeStdioSync, isOutputPipeOnly;
var init_stdio_option = __esm({
  "node_modules/execa/lib/stdio/stdio-option.js"() {
    init_standard_stream();
    init_array2();
    init_values();
    normalizeStdioOption = ({ stdio, ipc, buffer, ...options }, verboseInfo, isSync) => {
      const stdioArray = getStdioArray(stdio, options).map((stdioOption, fdNumber) => addDefaultValue2(stdioOption, fdNumber));
      return isSync ? normalizeStdioSync(stdioArray, buffer, verboseInfo) : normalizeIpcStdioArray(stdioArray, ipc);
    };
    getStdioArray = (stdio, options) => {
      if (stdio === void 0) {
        return STANDARD_STREAMS_ALIASES.map((alias) => options[alias]);
      }
      if (hasAlias(options)) {
        throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${STANDARD_STREAMS_ALIASES.map((alias) => `\`${alias}\``).join(", ")}`);
      }
      if (typeof stdio === "string") {
        return [stdio, stdio, stdio];
      }
      if (!Array.isArray(stdio)) {
        throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
      }
      const length = Math.max(stdio.length, STANDARD_STREAMS_ALIASES.length);
      return Array.from({ length }, (_, fdNumber) => stdio[fdNumber]);
    };
    hasAlias = (options) => STANDARD_STREAMS_ALIASES.some((alias) => options[alias] !== void 0);
    addDefaultValue2 = (stdioOption, fdNumber) => {
      if (Array.isArray(stdioOption)) {
        return stdioOption.map((item) => addDefaultValue2(item, fdNumber));
      }
      if (stdioOption === null || stdioOption === void 0) {
        return fdNumber >= STANDARD_STREAMS_ALIASES.length ? "ignore" : "pipe";
      }
      return stdioOption;
    };
    normalizeStdioSync = (stdioArray, buffer, verboseInfo) => stdioArray.map((stdioOption, fdNumber) => !buffer[fdNumber] && fdNumber !== 0 && !isFullVerbose(verboseInfo, fdNumber) && isOutputPipeOnly(stdioOption) ? "ignore" : stdioOption);
    isOutputPipeOnly = (stdioOption) => stdioOption === "pipe" || Array.isArray(stdioOption) && stdioOption.every((item) => item === "pipe");
  }
});

// node_modules/execa/lib/stdio/native.js
var import_node_fs2, import_node_tty2, handleNativeStream, handleNativeStreamSync, getTargetFd, getTargetFdNumber, handleNativeStreamAsync, getStandardStream;
var init_native = __esm({
  "node_modules/execa/lib/stdio/native.js"() {
    import_node_fs2 = require("node:fs");
    import_node_tty2 = __toESM(require("node:tty"), 1);
    init_is_stream();
    init_standard_stream();
    init_uint_array();
    init_fd_options();
    handleNativeStream = ({ stdioItem, stdioItem: { type }, isStdioArray, fdNumber, direction, isSync }) => {
      if (!isStdioArray || type !== "native") {
        return stdioItem;
      }
      return isSync ? handleNativeStreamSync({ stdioItem, fdNumber, direction }) : handleNativeStreamAsync({ stdioItem, fdNumber });
    };
    handleNativeStreamSync = ({ stdioItem, stdioItem: { value, optionName }, fdNumber, direction }) => {
      const targetFd = getTargetFd({
        value,
        optionName,
        fdNumber,
        direction
      });
      if (targetFd !== void 0) {
        return targetFd;
      }
      if (isStream(value, { checkOpen: false })) {
        throw new TypeError(`The \`${optionName}: Stream\` option cannot both be an array and include a stream with synchronous methods.`);
      }
      return stdioItem;
    };
    getTargetFd = ({ value, optionName, fdNumber, direction }) => {
      const targetFdNumber = getTargetFdNumber(value, fdNumber);
      if (targetFdNumber === void 0) {
        return;
      }
      if (direction === "output") {
        return { type: "fileNumber", value: targetFdNumber, optionName };
      }
      if (import_node_tty2.default.isatty(targetFdNumber)) {
        throw new TypeError(`The \`${optionName}: ${serializeOptionValue(value)}\` option is invalid: it cannot be a TTY with synchronous methods.`);
      }
      return { type: "uint8Array", value: bufferToUint8Array((0, import_node_fs2.readFileSync)(targetFdNumber)), optionName };
    };
    getTargetFdNumber = (value, fdNumber) => {
      if (value === "inherit") {
        return fdNumber;
      }
      if (typeof value === "number") {
        return value;
      }
      const standardStreamIndex = STANDARD_STREAMS.indexOf(value);
      if (standardStreamIndex !== -1) {
        return standardStreamIndex;
      }
    };
    handleNativeStreamAsync = ({ stdioItem, stdioItem: { value, optionName }, fdNumber }) => {
      if (value === "inherit") {
        return { type: "nodeStream", value: getStandardStream(fdNumber, value, optionName), optionName };
      }
      if (typeof value === "number") {
        return { type: "nodeStream", value: getStandardStream(value, value, optionName), optionName };
      }
      if (isStream(value, { checkOpen: false })) {
        return { type: "nodeStream", value, optionName };
      }
      return stdioItem;
    };
    getStandardStream = (fdNumber, value, optionName) => {
      const standardStream = STANDARD_STREAMS[fdNumber];
      if (standardStream === void 0) {
        throw new TypeError(`The \`${optionName}: ${value}\` option is invalid: no such standard stream.`);
      }
      return standardStream;
    };
  }
});

// node_modules/execa/lib/stdio/input-option.js
var handleInputOptions, handleInputOption, getInputType, handleInputFileOption, getInputFileType;
var init_input_option = __esm({
  "node_modules/execa/lib/stdio/input-option.js"() {
    init_is_stream();
    init_uint_array();
    init_type();
    handleInputOptions = ({ input, inputFile }, fdNumber) => fdNumber === 0 ? [
      ...handleInputOption(input),
      ...handleInputFileOption(inputFile)
    ] : [];
    handleInputOption = (input) => input === void 0 ? [] : [{
      type: getInputType(input),
      value: input,
      optionName: "input"
    }];
    getInputType = (input) => {
      if (isReadableStream(input, { checkOpen: false })) {
        return "nodeStream";
      }
      if (typeof input === "string") {
        return "string";
      }
      if (isUint8Array(input)) {
        return "uint8Array";
      }
      throw new Error("The `input` option must be a string, a Uint8Array or a Node.js Readable stream.");
    };
    handleInputFileOption = (inputFile) => inputFile === void 0 ? [] : [{
      ...getInputFileType(inputFile),
      optionName: "inputFile"
    }];
    getInputFileType = (inputFile) => {
      if (isUrl(inputFile)) {
        return { type: "fileUrl", value: inputFile };
      }
      if (isFilePathString(inputFile)) {
        return { type: "filePath", value: { file: inputFile } };
      }
      throw new Error("The `inputFile` option must be a file path string or a file URL.");
    };
  }
});

// node_modules/execa/lib/stdio/duplicate.js
var filterDuplicates, getDuplicateStream, getOtherStdioItems, validateDuplicateStreamSync, getDuplicateStreamInstance, hasSameValue, validateDuplicateTransform, throwOnDuplicateStream;
var init_duplicate = __esm({
  "node_modules/execa/lib/stdio/duplicate.js"() {
    init_type();
    filterDuplicates = (stdioItems) => stdioItems.filter((stdioItemOne, indexOne) => stdioItems.every((stdioItemTwo, indexTwo) => stdioItemOne.value !== stdioItemTwo.value || indexOne >= indexTwo || stdioItemOne.type === "generator" || stdioItemOne.type === "asyncGenerator"));
    getDuplicateStream = ({ stdioItem: { type, value, optionName }, direction, fileDescriptors, isSync }) => {
      const otherStdioItems = getOtherStdioItems(fileDescriptors, type);
      if (otherStdioItems.length === 0) {
        return;
      }
      if (isSync) {
        validateDuplicateStreamSync({
          otherStdioItems,
          type,
          value,
          optionName,
          direction
        });
        return;
      }
      if (SPECIAL_DUPLICATE_TYPES.has(type)) {
        return getDuplicateStreamInstance({
          otherStdioItems,
          type,
          value,
          optionName,
          direction
        });
      }
      if (FORBID_DUPLICATE_TYPES.has(type)) {
        validateDuplicateTransform({
          otherStdioItems,
          type,
          value,
          optionName
        });
      }
    };
    getOtherStdioItems = (fileDescriptors, type) => fileDescriptors.flatMap(({ direction, stdioItems }) => stdioItems.filter((stdioItem) => stdioItem.type === type).map((stdioItem) => ({ ...stdioItem, direction })));
    validateDuplicateStreamSync = ({ otherStdioItems, type, value, optionName, direction }) => {
      if (SPECIAL_DUPLICATE_TYPES_SYNC.has(type)) {
        getDuplicateStreamInstance({
          otherStdioItems,
          type,
          value,
          optionName,
          direction
        });
      }
    };
    getDuplicateStreamInstance = ({ otherStdioItems, type, value, optionName, direction }) => {
      const duplicateStdioItems = otherStdioItems.filter((stdioItem) => hasSameValue(stdioItem, value));
      if (duplicateStdioItems.length === 0) {
        return;
      }
      const differentStdioItem = duplicateStdioItems.find((stdioItem) => stdioItem.direction !== direction);
      throwOnDuplicateStream(differentStdioItem, optionName, type);
      return direction === "output" ? duplicateStdioItems[0].stream : void 0;
    };
    hasSameValue = ({ type, value }, secondValue) => {
      if (type === "filePath") {
        return value.file === secondValue.file;
      }
      if (type === "fileUrl") {
        return value.href === secondValue.href;
      }
      return value === secondValue;
    };
    validateDuplicateTransform = ({ otherStdioItems, type, value, optionName }) => {
      const duplicateStdioItem = otherStdioItems.find(({ value: { transform } }) => transform === value.transform);
      throwOnDuplicateStream(duplicateStdioItem, optionName, type);
    };
    throwOnDuplicateStream = (stdioItem, optionName, type) => {
      if (stdioItem !== void 0) {
        throw new TypeError(`The \`${stdioItem.optionName}\` and \`${optionName}\` options must not target ${TYPE_TO_MESSAGE[type]} that is the same.`);
      }
    };
  }
});

// node_modules/execa/lib/stdio/handle.js
var handleStdio, getFileDescriptor, initializeStdioItems, initializeStdioItem, validateStdioArray, INVALID_STDIO_ARRAY_OPTIONS, validateStreams, validateFileStdio, validateFileObjectMode, getFinalFileDescriptors, getFinalFileDescriptor, addStreamProperties, cleanupCustomStreams, forwardStdio;
var init_handle = __esm({
  "node_modules/execa/lib/stdio/handle.js"() {
    init_standard_stream();
    init_normalize();
    init_object_mode();
    init_type();
    init_direction();
    init_stdio_option();
    init_native();
    init_input_option();
    init_duplicate();
    handleStdio = (addProperties3, options, verboseInfo, isSync) => {
      const stdio = normalizeStdioOption(options, verboseInfo, isSync);
      const initialFileDescriptors = stdio.map((stdioOption, fdNumber) => getFileDescriptor({
        stdioOption,
        fdNumber,
        options,
        isSync
      }));
      const fileDescriptors = getFinalFileDescriptors({
        initialFileDescriptors,
        addProperties: addProperties3,
        options,
        isSync
      });
      options.stdio = fileDescriptors.map(({ stdioItems }) => forwardStdio(stdioItems));
      return fileDescriptors;
    };
    getFileDescriptor = ({ stdioOption, fdNumber, options, isSync }) => {
      const optionName = getStreamName(fdNumber);
      const { stdioItems: initialStdioItems, isStdioArray } = initializeStdioItems({
        stdioOption,
        fdNumber,
        options,
        optionName
      });
      const direction = getStreamDirection(initialStdioItems, fdNumber, optionName);
      const stdioItems = initialStdioItems.map((stdioItem) => handleNativeStream({
        stdioItem,
        isStdioArray,
        fdNumber,
        direction,
        isSync
      }));
      const normalizedStdioItems = normalizeTransforms(stdioItems, optionName, direction, options);
      const objectMode = getFdObjectMode(normalizedStdioItems, direction);
      validateFileObjectMode(normalizedStdioItems, objectMode);
      return { direction, objectMode, stdioItems: normalizedStdioItems };
    };
    initializeStdioItems = ({ stdioOption, fdNumber, options, optionName }) => {
      const values = Array.isArray(stdioOption) ? stdioOption : [stdioOption];
      const initialStdioItems = [
        ...values.map((value) => initializeStdioItem(value, optionName)),
        ...handleInputOptions(options, fdNumber)
      ];
      const stdioItems = filterDuplicates(initialStdioItems);
      const isStdioArray = stdioItems.length > 1;
      validateStdioArray(stdioItems, isStdioArray, optionName);
      validateStreams(stdioItems);
      return { stdioItems, isStdioArray };
    };
    initializeStdioItem = (value, optionName) => ({
      type: getStdioItemType(value, optionName),
      value,
      optionName
    });
    validateStdioArray = (stdioItems, isStdioArray, optionName) => {
      if (stdioItems.length === 0) {
        throw new TypeError(`The \`${optionName}\` option must not be an empty array.`);
      }
      if (!isStdioArray) {
        return;
      }
      for (const { value, optionName: optionName2 } of stdioItems) {
        if (INVALID_STDIO_ARRAY_OPTIONS.has(value)) {
          throw new Error(`The \`${optionName2}\` option must not include \`${value}\`.`);
        }
      }
    };
    INVALID_STDIO_ARRAY_OPTIONS = /* @__PURE__ */ new Set(["ignore", "ipc"]);
    validateStreams = (stdioItems) => {
      for (const stdioItem of stdioItems) {
        validateFileStdio(stdioItem);
      }
    };
    validateFileStdio = ({ type, value, optionName }) => {
      if (isRegularUrl(value)) {
        throw new TypeError(`The \`${optionName}: URL\` option must use the \`file:\` scheme.
For example, you can use the \`pathToFileURL()\` method of the \`url\` core module.`);
      }
      if (isUnknownStdioString(type, value)) {
        throw new TypeError(`The \`${optionName}: { file: '...' }\` option must be used instead of \`${optionName}: '...'\`.`);
      }
    };
    validateFileObjectMode = (stdioItems, objectMode) => {
      if (!objectMode) {
        return;
      }
      const fileStdioItem = stdioItems.find(({ type }) => FILE_TYPES.has(type));
      if (fileStdioItem !== void 0) {
        throw new TypeError(`The \`${fileStdioItem.optionName}\` option cannot use both files and transforms in objectMode.`);
      }
    };
    getFinalFileDescriptors = ({ initialFileDescriptors, addProperties: addProperties3, options, isSync }) => {
      const fileDescriptors = [];
      try {
        for (const fileDescriptor of initialFileDescriptors) {
          fileDescriptors.push(getFinalFileDescriptor({
            fileDescriptor,
            fileDescriptors,
            addProperties: addProperties3,
            options,
            isSync
          }));
        }
        return fileDescriptors;
      } catch (error) {
        cleanupCustomStreams(fileDescriptors);
        throw error;
      }
    };
    getFinalFileDescriptor = ({
      fileDescriptor: { direction, objectMode, stdioItems },
      fileDescriptors,
      addProperties: addProperties3,
      options,
      isSync
    }) => {
      const finalStdioItems = stdioItems.map((stdioItem) => addStreamProperties({
        stdioItem,
        addProperties: addProperties3,
        direction,
        options,
        fileDescriptors,
        isSync
      }));
      return { direction, objectMode, stdioItems: finalStdioItems };
    };
    addStreamProperties = ({ stdioItem, addProperties: addProperties3, direction, options, fileDescriptors, isSync }) => {
      const duplicateStream = getDuplicateStream({
        stdioItem,
        direction,
        fileDescriptors,
        isSync
      });
      if (duplicateStream !== void 0) {
        return { ...stdioItem, stream: duplicateStream };
      }
      return {
        ...stdioItem,
        ...addProperties3[direction][stdioItem.type](stdioItem, options)
      };
    };
    cleanupCustomStreams = (fileDescriptors) => {
      for (const { stdioItems } of fileDescriptors) {
        for (const { stream } of stdioItems) {
          if (stream !== void 0 && !isStandardStream(stream)) {
            stream.destroy();
          }
        }
      }
    };
    forwardStdio = (stdioItems) => {
      if (stdioItems.length > 1) {
        return stdioItems.some(({ value: value2 }) => value2 === "overlapped") ? "overlapped" : "pipe";
      }
      const [{ type, value }] = stdioItems;
      return type === "native" ? value : "pipe";
    };
  }
});

// node_modules/execa/lib/stdio/handle-sync.js
var import_node_fs3, handleStdioSync, forbiddenIfSync, forbiddenNativeIfSync, throwInvalidSyncValue, addProperties, addPropertiesSync;
var init_handle_sync = __esm({
  "node_modules/execa/lib/stdio/handle-sync.js"() {
    import_node_fs3 = require("node:fs");
    init_uint_array();
    init_handle();
    init_type();
    handleStdioSync = (options, verboseInfo) => handleStdio(addPropertiesSync, options, verboseInfo, true);
    forbiddenIfSync = ({ type, optionName }) => {
      throwInvalidSyncValue(optionName, TYPE_TO_MESSAGE[type]);
    };
    forbiddenNativeIfSync = ({ optionName, value }) => {
      if (value === "ipc" || value === "overlapped") {
        throwInvalidSyncValue(optionName, `"${value}"`);
      }
      return {};
    };
    throwInvalidSyncValue = (optionName, value) => {
      throw new TypeError(`The \`${optionName}\` option cannot be ${value} with synchronous methods.`);
    };
    addProperties = {
      generator() {
      },
      asyncGenerator: forbiddenIfSync,
      webStream: forbiddenIfSync,
      nodeStream: forbiddenIfSync,
      webTransform: forbiddenIfSync,
      duplex: forbiddenIfSync,
      asyncIterable: forbiddenIfSync,
      native: forbiddenNativeIfSync
    };
    addPropertiesSync = {
      input: {
        ...addProperties,
        fileUrl: ({ value }) => ({ contents: [bufferToUint8Array((0, import_node_fs3.readFileSync)(value))] }),
        filePath: ({ value: { file } }) => ({ contents: [bufferToUint8Array((0, import_node_fs3.readFileSync)(file))] }),
        fileNumber: forbiddenIfSync,
        iterable: ({ value }) => ({ contents: [...value] }),
        string: ({ value }) => ({ contents: [value] }),
        uint8Array: ({ value }) => ({ contents: [value] })
      },
      output: {
        ...addProperties,
        fileUrl: ({ value }) => ({ path: value }),
        filePath: ({ value: { file, append } }) => ({ path: file, append }),
        fileNumber: ({ value }) => ({ path: value }),
        iterable: forbiddenIfSync,
        string: forbiddenIfSync,
        uint8Array: forbiddenIfSync
      }
    };
  }
});

// node_modules/execa/lib/io/strip-newline.js
var stripNewline, getStripFinalNewline;
var init_strip_newline = __esm({
  "node_modules/execa/lib/io/strip-newline.js"() {
    init_strip_final_newline();
    stripNewline = (value, { stripFinalNewline: stripFinalNewline2 }, fdNumber) => getStripFinalNewline(stripFinalNewline2, fdNumber) && value !== void 0 && !Array.isArray(value) ? stripFinalNewline(value) : value;
    getStripFinalNewline = (stripFinalNewline2, fdNumber) => fdNumber === "all" ? stripFinalNewline2[1] || stripFinalNewline2[2] : stripFinalNewline2[fdNumber];
  }
});

// node_modules/execa/lib/transform/split.js
var getSplitLinesGenerator, splitLinesSync, splitLinesItemSync, initializeSplitLines, splitGenerator, getNewlineLength, linesFinal, getAppendNewlineGenerator, appendNewlineGenerator, concatString, linesStringInfo, concatUint8Array, linesUint8ArrayInfo;
var init_split = __esm({
  "node_modules/execa/lib/transform/split.js"() {
    getSplitLinesGenerator = (binary, preserveNewlines, skipped, state) => binary || skipped ? void 0 : initializeSplitLines(preserveNewlines, state);
    splitLinesSync = (chunk, preserveNewlines, objectMode) => objectMode ? chunk.flatMap((item) => splitLinesItemSync(item, preserveNewlines)) : splitLinesItemSync(chunk, preserveNewlines);
    splitLinesItemSync = (chunk, preserveNewlines) => {
      const { transform, final } = initializeSplitLines(preserveNewlines, {});
      return [...transform(chunk), ...final()];
    };
    initializeSplitLines = (preserveNewlines, state) => {
      state.previousChunks = "";
      return {
        transform: splitGenerator.bind(void 0, state, preserveNewlines),
        final: linesFinal.bind(void 0, state)
      };
    };
    splitGenerator = function* (state, preserveNewlines, chunk) {
      if (typeof chunk !== "string") {
        yield chunk;
        return;
      }
      let { previousChunks } = state;
      let start = -1;
      for (let end = 0; end < chunk.length; end += 1) {
        if (chunk[end] === "\n") {
          const newlineLength = getNewlineLength(chunk, end, preserveNewlines, state);
          let line = chunk.slice(start + 1, end + 1 - newlineLength);
          if (previousChunks.length > 0) {
            line = concatString(previousChunks, line);
            previousChunks = "";
          }
          yield line;
          start = end;
        }
      }
      if (start !== chunk.length - 1) {
        previousChunks = concatString(previousChunks, chunk.slice(start + 1));
      }
      state.previousChunks = previousChunks;
    };
    getNewlineLength = (chunk, end, preserveNewlines, state) => {
      if (preserveNewlines) {
        return 0;
      }
      state.isWindowsNewline = end !== 0 && chunk[end - 1] === "\r";
      return state.isWindowsNewline ? 2 : 1;
    };
    linesFinal = function* ({ previousChunks }) {
      if (previousChunks.length > 0) {
        yield previousChunks;
      }
    };
    getAppendNewlineGenerator = ({ binary, preserveNewlines, readableObjectMode, state }) => binary || preserveNewlines || readableObjectMode ? void 0 : { transform: appendNewlineGenerator.bind(void 0, state) };
    appendNewlineGenerator = function* ({ isWindowsNewline = false }, chunk) {
      const { unixNewline, windowsNewline, LF: LF2, concatBytes } = typeof chunk === "string" ? linesStringInfo : linesUint8ArrayInfo;
      if (chunk.at(-1) === LF2) {
        yield chunk;
        return;
      }
      const newline = isWindowsNewline ? windowsNewline : unixNewline;
      yield concatBytes(chunk, newline);
    };
    concatString = (firstChunk, secondChunk) => `${firstChunk}${secondChunk}`;
    linesStringInfo = {
      windowsNewline: "\r\n",
      unixNewline: "\n",
      LF: "\n",
      concatBytes: concatString
    };
    concatUint8Array = (firstChunk, secondChunk) => {
      const chunk = new Uint8Array(firstChunk.length + secondChunk.length);
      chunk.set(firstChunk, 0);
      chunk.set(secondChunk, firstChunk.length);
      return chunk;
    };
    linesUint8ArrayInfo = {
      windowsNewline: new Uint8Array([13, 10]),
      unixNewline: new Uint8Array([10]),
      LF: 10,
      concatBytes: concatUint8Array
    };
  }
});

// node_modules/execa/lib/transform/validate.js
var import_node_buffer, getValidateTransformInput, validateStringTransformInput, getValidateTransformReturn, validateObjectTransformReturn, validateStringTransformReturn, validateEmptyReturn;
var init_validate = __esm({
  "node_modules/execa/lib/transform/validate.js"() {
    import_node_buffer = require("node:buffer");
    init_uint_array();
    getValidateTransformInput = (writableObjectMode, optionName) => writableObjectMode ? void 0 : validateStringTransformInput.bind(void 0, optionName);
    validateStringTransformInput = function* (optionName, chunk) {
      if (typeof chunk !== "string" && !isUint8Array(chunk) && !import_node_buffer.Buffer.isBuffer(chunk)) {
        throw new TypeError(`The \`${optionName}\` option's transform must use "objectMode: true" to receive as input: ${typeof chunk}.`);
      }
      yield chunk;
    };
    getValidateTransformReturn = (readableObjectMode, optionName) => readableObjectMode ? validateObjectTransformReturn.bind(void 0, optionName) : validateStringTransformReturn.bind(void 0, optionName);
    validateObjectTransformReturn = function* (optionName, chunk) {
      validateEmptyReturn(optionName, chunk);
      yield chunk;
    };
    validateStringTransformReturn = function* (optionName, chunk) {
      validateEmptyReturn(optionName, chunk);
      if (typeof chunk !== "string" && !isUint8Array(chunk)) {
        throw new TypeError(`The \`${optionName}\` option's function must yield a string or an Uint8Array, not ${typeof chunk}.`);
      }
      yield chunk;
    };
    validateEmptyReturn = (optionName, chunk) => {
      if (chunk === null || chunk === void 0) {
        throw new TypeError(`The \`${optionName}\` option's function must not call \`yield ${chunk}\`.
Instead, \`yield\` should either be called with a value, or not be called at all. For example:
  if (condition) { yield value; }`);
      }
    };
  }
});

// node_modules/execa/lib/transform/encoding-transform.js
var import_node_buffer2, import_node_string_decoder2, getEncodingTransformGenerator, encodingUint8ArrayGenerator, encodingStringGenerator, encodingStringFinal;
var init_encoding_transform = __esm({
  "node_modules/execa/lib/transform/encoding-transform.js"() {
    import_node_buffer2 = require("node:buffer");
    import_node_string_decoder2 = require("node:string_decoder");
    init_uint_array();
    getEncodingTransformGenerator = (binary, encoding, skipped) => {
      if (skipped) {
        return;
      }
      if (binary) {
        return { transform: encodingUint8ArrayGenerator.bind(void 0, new TextEncoder()) };
      }
      const stringDecoder = new import_node_string_decoder2.StringDecoder(encoding);
      return {
        transform: encodingStringGenerator.bind(void 0, stringDecoder),
        final: encodingStringFinal.bind(void 0, stringDecoder)
      };
    };
    encodingUint8ArrayGenerator = function* (textEncoder3, chunk) {
      if (import_node_buffer2.Buffer.isBuffer(chunk)) {
        yield bufferToUint8Array(chunk);
      } else if (typeof chunk === "string") {
        yield textEncoder3.encode(chunk);
      } else {
        yield chunk;
      }
    };
    encodingStringGenerator = function* (stringDecoder, chunk) {
      yield isUint8Array(chunk) ? stringDecoder.write(chunk) : chunk;
    };
    encodingStringFinal = function* (stringDecoder) {
      const lastChunk = stringDecoder.end();
      if (lastChunk !== "") {
        yield lastChunk;
      }
    };
  }
});

// node_modules/execa/lib/transform/run-async.js
var import_node_util7, pushChunks, transformChunk, finalChunks, generatorFinalChunks, destroyTransform, identityGenerator;
var init_run_async = __esm({
  "node_modules/execa/lib/transform/run-async.js"() {
    import_node_util7 = require("node:util");
    pushChunks = (0, import_node_util7.callbackify)(async (getChunks, state, getChunksArguments, transformStream) => {
      state.currentIterable = getChunks(...getChunksArguments);
      try {
        for await (const chunk of state.currentIterable) {
          transformStream.push(chunk);
        }
      } finally {
        delete state.currentIterable;
      }
    });
    transformChunk = async function* (chunk, generators, index) {
      if (index === generators.length) {
        yield chunk;
        return;
      }
      const { transform = identityGenerator } = generators[index];
      for await (const transformedChunk of transform(chunk)) {
        yield* transformChunk(transformedChunk, generators, index + 1);
      }
    };
    finalChunks = async function* (generators) {
      for (const [index, { final }] of Object.entries(generators)) {
        yield* generatorFinalChunks(final, Number(index), generators);
      }
    };
    generatorFinalChunks = async function* (final, index, generators) {
      if (final === void 0) {
        return;
      }
      for await (const finalChunk of final()) {
        yield* transformChunk(finalChunk, generators, index + 1);
      }
    };
    destroyTransform = (0, import_node_util7.callbackify)(async ({ currentIterable }, error) => {
      if (currentIterable !== void 0) {
        await (error ? currentIterable.throw(error) : currentIterable.return());
        return;
      }
      if (error) {
        throw error;
      }
    });
    identityGenerator = function* (chunk) {
      yield chunk;
    };
  }
});

// node_modules/execa/lib/transform/run-sync.js
var pushChunksSync, runTransformSync, transformChunkSync, finalChunksSync, generatorFinalChunksSync, identityGenerator2;
var init_run_sync = __esm({
  "node_modules/execa/lib/transform/run-sync.js"() {
    pushChunksSync = (getChunksSync, getChunksArguments, transformStream, done) => {
      try {
        for (const chunk of getChunksSync(...getChunksArguments)) {
          transformStream.push(chunk);
        }
        done();
      } catch (error) {
        done(error);
      }
    };
    runTransformSync = (generators, chunks) => [
      ...chunks.flatMap((chunk) => [...transformChunkSync(chunk, generators, 0)]),
      ...finalChunksSync(generators)
    ];
    transformChunkSync = function* (chunk, generators, index) {
      if (index === generators.length) {
        yield chunk;
        return;
      }
      const { transform = identityGenerator2 } = generators[index];
      for (const transformedChunk of transform(chunk)) {
        yield* transformChunkSync(transformedChunk, generators, index + 1);
      }
    };
    finalChunksSync = function* (generators) {
      for (const [index, { final }] of Object.entries(generators)) {
        yield* generatorFinalChunksSync(final, Number(index), generators);
      }
    };
    generatorFinalChunksSync = function* (final, index, generators) {
      if (final === void 0) {
        return;
      }
      for (const finalChunk of final()) {
        yield* transformChunkSync(finalChunk, generators, index + 1);
      }
    };
    identityGenerator2 = function* (chunk) {
      yield chunk;
    };
  }
});

// node_modules/execa/lib/transform/generator.js
var import_node_stream, generatorToStream, runGeneratorsSync, addInternalGenerators;
var init_generator = __esm({
  "node_modules/execa/lib/transform/generator.js"() {
    import_node_stream = require("node:stream");
    init_type();
    init_split();
    init_validate();
    init_encoding_transform();
    init_run_async();
    init_run_sync();
    generatorToStream = ({
      value,
      value: { transform, final, writableObjectMode, readableObjectMode },
      optionName
    }, { encoding }) => {
      const state = {};
      const generators = addInternalGenerators(value, encoding, optionName);
      const transformAsync = isAsyncGenerator(transform);
      const finalAsync = isAsyncGenerator(final);
      const transformMethod = transformAsync ? pushChunks.bind(void 0, transformChunk, state) : pushChunksSync.bind(void 0, transformChunkSync);
      const finalMethod = transformAsync || finalAsync ? pushChunks.bind(void 0, finalChunks, state) : pushChunksSync.bind(void 0, finalChunksSync);
      const destroyMethod = transformAsync || finalAsync ? destroyTransform.bind(void 0, state) : void 0;
      const stream = new import_node_stream.Transform({
        writableObjectMode,
        writableHighWaterMark: (0, import_node_stream.getDefaultHighWaterMark)(writableObjectMode),
        readableObjectMode,
        readableHighWaterMark: (0, import_node_stream.getDefaultHighWaterMark)(readableObjectMode),
        transform(chunk, encoding2, done) {
          transformMethod([chunk, generators, 0], this, done);
        },
        flush(done) {
          finalMethod([generators], this, done);
        },
        destroy: destroyMethod
      });
      return { stream };
    };
    runGeneratorsSync = (chunks, stdioItems, encoding, isInput) => {
      const generators = stdioItems.filter(({ type }) => type === "generator");
      const reversedGenerators = isInput ? generators.reverse() : generators;
      for (const { value, optionName } of reversedGenerators) {
        const generators2 = addInternalGenerators(value, encoding, optionName);
        chunks = runTransformSync(generators2, chunks);
      }
      return chunks;
    };
    addInternalGenerators = ({ transform, final, binary, writableObjectMode, readableObjectMode, preserveNewlines }, encoding, optionName) => {
      const state = {};
      return [
        { transform: getValidateTransformInput(writableObjectMode, optionName) },
        getEncodingTransformGenerator(binary, encoding, writableObjectMode),
        getSplitLinesGenerator(binary, preserveNewlines, writableObjectMode, state),
        { transform, final },
        { transform: getValidateTransformReturn(readableObjectMode, optionName) },
        getAppendNewlineGenerator({
          binary,
          preserveNewlines,
          readableObjectMode,
          state
        })
      ].filter(Boolean);
    };
  }
});

// node_modules/execa/lib/io/input-sync.js
var addInputOptionsSync, getInputFdNumbers, addInputOptionSync, applySingleInputGeneratorsSync, validateSerializable;
var init_input_sync = __esm({
  "node_modules/execa/lib/io/input-sync.js"() {
    init_generator();
    init_uint_array();
    init_type();
    addInputOptionsSync = (fileDescriptors, options) => {
      for (const fdNumber of getInputFdNumbers(fileDescriptors)) {
        addInputOptionSync(fileDescriptors, fdNumber, options);
      }
    };
    getInputFdNumbers = (fileDescriptors) => new Set(Object.entries(fileDescriptors).filter(([, { direction }]) => direction === "input").map(([fdNumber]) => Number(fdNumber)));
    addInputOptionSync = (fileDescriptors, fdNumber, options) => {
      const { stdioItems } = fileDescriptors[fdNumber];
      const allStdioItems = stdioItems.filter(({ contents }) => contents !== void 0);
      if (allStdioItems.length === 0) {
        return;
      }
      if (fdNumber !== 0) {
        const [{ type, optionName }] = allStdioItems;
        throw new TypeError(`Only the \`stdin\` option, not \`${optionName}\`, can be ${TYPE_TO_MESSAGE[type]} with synchronous methods.`);
      }
      const allContents = allStdioItems.map(({ contents }) => contents);
      const transformedContents = allContents.map((contents) => applySingleInputGeneratorsSync(contents, stdioItems));
      options.input = joinToUint8Array(transformedContents);
    };
    applySingleInputGeneratorsSync = (contents, stdioItems) => {
      const newContents = runGeneratorsSync(contents, stdioItems, "utf8", true);
      validateSerializable(newContents);
      return joinToUint8Array(newContents);
    };
    validateSerializable = (newContents) => {
      const invalidItem = newContents.find((item) => typeof item !== "string" && !isUint8Array(item));
      if (invalidItem !== void 0) {
        throw new TypeError(`The \`stdin\` option is invalid: when passing objects as input, a transform must be used to serialize them to strings or Uint8Arrays: ${invalidItem}.`);
      }
    };
  }
});

// node_modules/execa/lib/verbose/output.js
var shouldLogOutput, fdUsesVerbose, PIPED_STDIO_VALUES, logLines, logLinesSync, isPipingStream, logLine;
var init_output = __esm({
  "node_modules/execa/lib/verbose/output.js"() {
    init_encoding_option();
    init_type();
    init_log();
    init_values();
    shouldLogOutput = ({ stdioItems, encoding, verboseInfo, fdNumber }) => fdNumber !== "all" && isFullVerbose(verboseInfo, fdNumber) && !BINARY_ENCODINGS.has(encoding) && fdUsesVerbose(fdNumber) && (stdioItems.some(({ type, value }) => type === "native" && PIPED_STDIO_VALUES.has(value)) || stdioItems.every(({ type }) => TRANSFORM_TYPES.has(type)));
    fdUsesVerbose = (fdNumber) => fdNumber === 1 || fdNumber === 2;
    PIPED_STDIO_VALUES = /* @__PURE__ */ new Set(["pipe", "overlapped"]);
    logLines = async (linesIterable, stream, fdNumber, verboseInfo) => {
      for await (const line of linesIterable) {
        if (!isPipingStream(stream)) {
          logLine(line, fdNumber, verboseInfo);
        }
      }
    };
    logLinesSync = (linesArray, fdNumber, verboseInfo) => {
      for (const line of linesArray) {
        logLine(line, fdNumber, verboseInfo);
      }
    };
    isPipingStream = (stream) => stream._readableState.pipes.length > 0;
    logLine = (line, fdNumber, verboseInfo) => {
      const verboseMessage = serializeVerboseMessage(line);
      verboseLog({
        type: "output",
        verboseMessage,
        fdNumber,
        verboseInfo
      });
    };
  }
});

// node_modules/execa/lib/io/output-sync.js
var import_node_fs4, transformOutputSync, transformOutputResultSync, runOutputGeneratorsSync, serializeChunks, logOutputSync, writeToFiles;
var init_output_sync = __esm({
  "node_modules/execa/lib/io/output-sync.js"() {
    import_node_fs4 = require("node:fs");
    init_output();
    init_generator();
    init_split();
    init_uint_array();
    init_type();
    init_max_buffer();
    transformOutputSync = ({ fileDescriptors, syncResult: { output }, options, isMaxBuffer, verboseInfo }) => {
      if (output === null) {
        return { output: Array.from({ length: 3 }) };
      }
      const state = {};
      const outputFiles = /* @__PURE__ */ new Set([]);
      const transformedOutput = output.map((result, fdNumber) => transformOutputResultSync({
        result,
        fileDescriptors,
        fdNumber,
        state,
        outputFiles,
        isMaxBuffer,
        verboseInfo
      }, options));
      return { output: transformedOutput, ...state };
    };
    transformOutputResultSync = ({ result, fileDescriptors, fdNumber, state, outputFiles, isMaxBuffer, verboseInfo }, { buffer, encoding, lines, stripFinalNewline: stripFinalNewline2, maxBuffer }) => {
      if (result === null) {
        return;
      }
      const truncatedResult = truncateMaxBufferSync(result, isMaxBuffer, maxBuffer);
      const uint8ArrayResult = bufferToUint8Array(truncatedResult);
      const { stdioItems, objectMode } = fileDescriptors[fdNumber];
      const chunks = runOutputGeneratorsSync([uint8ArrayResult], stdioItems, encoding, state);
      const { serializedResult, finalResult = serializedResult } = serializeChunks({
        chunks,
        objectMode,
        encoding,
        lines,
        stripFinalNewline: stripFinalNewline2,
        fdNumber
      });
      logOutputSync({
        serializedResult,
        fdNumber,
        state,
        verboseInfo,
        encoding,
        stdioItems,
        objectMode
      });
      const returnedResult = buffer[fdNumber] ? finalResult : void 0;
      try {
        if (state.error === void 0) {
          writeToFiles(serializedResult, stdioItems, outputFiles);
        }
        return returnedResult;
      } catch (error) {
        state.error = error;
        return returnedResult;
      }
    };
    runOutputGeneratorsSync = (chunks, stdioItems, encoding, state) => {
      try {
        return runGeneratorsSync(chunks, stdioItems, encoding, false);
      } catch (error) {
        state.error = error;
        return chunks;
      }
    };
    serializeChunks = ({ chunks, objectMode, encoding, lines, stripFinalNewline: stripFinalNewline2, fdNumber }) => {
      if (objectMode) {
        return { serializedResult: chunks };
      }
      if (encoding === "buffer") {
        return { serializedResult: joinToUint8Array(chunks) };
      }
      const serializedResult = joinToString(chunks, encoding);
      if (lines[fdNumber]) {
        return { serializedResult, finalResult: splitLinesSync(serializedResult, !stripFinalNewline2[fdNumber], objectMode) };
      }
      return { serializedResult };
    };
    logOutputSync = ({ serializedResult, fdNumber, state, verboseInfo, encoding, stdioItems, objectMode }) => {
      if (!shouldLogOutput({
        stdioItems,
        encoding,
        verboseInfo,
        fdNumber
      })) {
        return;
      }
      const linesArray = splitLinesSync(serializedResult, false, objectMode);
      try {
        logLinesSync(linesArray, fdNumber, verboseInfo);
      } catch (error) {
        state.error ??= error;
      }
    };
    writeToFiles = (serializedResult, stdioItems, outputFiles) => {
      for (const { path: path7, append } of stdioItems.filter(({ type }) => FILE_TYPES.has(type))) {
        const pathString = typeof path7 === "string" ? path7 : path7.toString();
        if (append || outputFiles.has(pathString)) {
          (0, import_node_fs4.appendFileSync)(path7, serializedResult);
        } else {
          outputFiles.add(pathString);
          (0, import_node_fs4.writeFileSync)(path7, serializedResult);
        }
      }
    };
  }
});

// node_modules/execa/lib/resolve/all-sync.js
var getAllSync;
var init_all_sync = __esm({
  "node_modules/execa/lib/resolve/all-sync.js"() {
    init_uint_array();
    init_strip_newline();
    getAllSync = ([, stdout, stderr], options) => {
      if (!options.all) {
        return;
      }
      if (stdout === void 0) {
        return stderr;
      }
      if (stderr === void 0) {
        return stdout;
      }
      if (Array.isArray(stdout)) {
        return Array.isArray(stderr) ? [...stdout, ...stderr] : [...stdout, stripNewline(stderr, options, "all")];
      }
      if (Array.isArray(stderr)) {
        return [stripNewline(stdout, options, "all"), ...stderr];
      }
      if (isUint8Array(stdout) && isUint8Array(stderr)) {
        return concatUint8Arrays([stdout, stderr]);
      }
      return `${stdout}${stderr}`;
    };
  }
});

// node_modules/execa/lib/resolve/exit-async.js
var import_node_events7, waitForExit, waitForExitOrError, waitForSubprocessExit, waitForSuccessfulExit, isSubprocessErrorExit, isFailedExit;
var init_exit_async = __esm({
  "node_modules/execa/lib/resolve/exit-async.js"() {
    import_node_events7 = require("node:events");
    init_final_error();
    waitForExit = async (subprocess, context) => {
      const [exitCode, signal] = await waitForExitOrError(subprocess);
      context.isForcefullyTerminated ??= false;
      return [exitCode, signal];
    };
    waitForExitOrError = async (subprocess) => {
      const [spawnPayload, exitPayload] = await Promise.allSettled([
        (0, import_node_events7.once)(subprocess, "spawn"),
        (0, import_node_events7.once)(subprocess, "exit")
      ]);
      if (spawnPayload.status === "rejected") {
        return [];
      }
      return exitPayload.status === "rejected" ? waitForSubprocessExit(subprocess) : exitPayload.value;
    };
    waitForSubprocessExit = async (subprocess) => {
      try {
        return await (0, import_node_events7.once)(subprocess, "exit");
      } catch {
        return waitForSubprocessExit(subprocess);
      }
    };
    waitForSuccessfulExit = async (exitPromise) => {
      const [exitCode, signal] = await exitPromise;
      if (!isSubprocessErrorExit(exitCode, signal) && isFailedExit(exitCode, signal)) {
        throw new DiscardedError();
      }
      return [exitCode, signal];
    };
    isSubprocessErrorExit = (exitCode, signal) => exitCode === void 0 && signal === void 0;
    isFailedExit = (exitCode, signal) => exitCode !== 0 || signal !== null;
  }
});

// node_modules/execa/lib/resolve/exit-sync.js
var getExitResultSync, getResultError;
var init_exit_sync = __esm({
  "node_modules/execa/lib/resolve/exit-sync.js"() {
    init_final_error();
    init_max_buffer();
    init_exit_async();
    getExitResultSync = ({ error, status: exitCode, signal, output }, { maxBuffer }) => {
      const resultError = getResultError(error, exitCode, signal);
      const timedOut = resultError?.code === "ETIMEDOUT";
      const isMaxBuffer = isMaxBufferSync(resultError, output, maxBuffer);
      return {
        resultError,
        exitCode,
        signal,
        timedOut,
        isMaxBuffer
      };
    };
    getResultError = (error, exitCode, signal) => {
      if (error !== void 0) {
        return error;
      }
      return isFailedExit(exitCode, signal) ? new DiscardedError() : void 0;
    };
  }
});

// node_modules/execa/lib/methods/main-sync.js
var import_node_child_process3, execaCoreSync, handleSyncArguments, normalizeSyncOptions, validateSyncOptions, throwInvalidSyncOption, spawnSubprocessSync, runSubprocessSync, normalizeSpawnSyncOptions, getSyncResult;
var init_main_sync = __esm({
  "node_modules/execa/lib/methods/main-sync.js"() {
    import_node_child_process3 = require("node:child_process");
    init_command();
    init_options();
    init_result();
    init_reject();
    init_handle_sync();
    init_strip_newline();
    init_input_sync();
    init_output_sync();
    init_max_buffer();
    init_all_sync();
    init_exit_sync();
    execaCoreSync = (rawFile, rawArguments, rawOptions) => {
      const { file, commandArguments, command, escapedCommand, startTime, verboseInfo, options, fileDescriptors } = handleSyncArguments(rawFile, rawArguments, rawOptions);
      const result = spawnSubprocessSync({
        file,
        commandArguments,
        options,
        command,
        escapedCommand,
        verboseInfo,
        fileDescriptors,
        startTime
      });
      return handleResult(result, verboseInfo, options);
    };
    handleSyncArguments = (rawFile, rawArguments, rawOptions) => {
      const { command, escapedCommand, startTime, verboseInfo } = handleCommand(rawFile, rawArguments, rawOptions);
      const syncOptions = normalizeSyncOptions(rawOptions);
      const { file, commandArguments, options } = normalizeOptions(rawFile, rawArguments, syncOptions);
      validateSyncOptions(options);
      const fileDescriptors = handleStdioSync(options, verboseInfo);
      return {
        file,
        commandArguments,
        command,
        escapedCommand,
        startTime,
        verboseInfo,
        options,
        fileDescriptors
      };
    };
    normalizeSyncOptions = (options) => options.node && !options.ipc ? { ...options, ipc: false } : options;
    validateSyncOptions = ({ ipc, ipcInput, detached, cancelSignal }) => {
      if (ipcInput) {
        throwInvalidSyncOption("ipcInput");
      }
      if (ipc) {
        throwInvalidSyncOption("ipc: true");
      }
      if (detached) {
        throwInvalidSyncOption("detached: true");
      }
      if (cancelSignal) {
        throwInvalidSyncOption("cancelSignal");
      }
    };
    throwInvalidSyncOption = (value) => {
      throw new TypeError(`The "${value}" option cannot be used with synchronous methods.`);
    };
    spawnSubprocessSync = ({ file, commandArguments, options, command, escapedCommand, verboseInfo, fileDescriptors, startTime }) => {
      const syncResult = runSubprocessSync({
        file,
        commandArguments,
        options,
        command,
        escapedCommand,
        fileDescriptors,
        startTime
      });
      if (syncResult.failed) {
        return syncResult;
      }
      const { resultError, exitCode, signal, timedOut, isMaxBuffer } = getExitResultSync(syncResult, options);
      const { output, error = resultError } = transformOutputSync({
        fileDescriptors,
        syncResult,
        options,
        isMaxBuffer,
        verboseInfo
      });
      const stdio = output.map((stdioOutput, fdNumber) => stripNewline(stdioOutput, options, fdNumber));
      const all = stripNewline(getAllSync(output, options), options, "all");
      return getSyncResult({
        error,
        exitCode,
        signal,
        timedOut,
        isMaxBuffer,
        stdio,
        all,
        options,
        command,
        escapedCommand,
        startTime
      });
    };
    runSubprocessSync = ({ file, commandArguments, options, command, escapedCommand, fileDescriptors, startTime }) => {
      try {
        addInputOptionsSync(fileDescriptors, options);
        const normalizedOptions = normalizeSpawnSyncOptions(options);
        return (0, import_node_child_process3.spawnSync)(file, commandArguments, normalizedOptions);
      } catch (error) {
        return makeEarlyError({
          error,
          command,
          escapedCommand,
          fileDescriptors,
          options,
          startTime,
          isSync: true
        });
      }
    };
    normalizeSpawnSyncOptions = ({ encoding, maxBuffer, ...options }) => ({ ...options, encoding: "buffer", maxBuffer: getMaxBufferSync(maxBuffer) });
    getSyncResult = ({ error, exitCode, signal, timedOut, isMaxBuffer, stdio, all, options, command, escapedCommand, startTime }) => error === void 0 ? makeSuccessResult({
      command,
      escapedCommand,
      stdio,
      all,
      ipcOutput: [],
      options,
      startTime
    }) : makeError({
      error,
      command,
      escapedCommand,
      timedOut,
      isCanceled: false,
      isGracefullyCanceled: false,
      isMaxBuffer,
      isForcefullyTerminated: false,
      exitCode,
      signal,
      stdio,
      all,
      ipcOutput: [],
      options,
      startTime,
      isSync: true
    });
  }
});

// node_modules/execa/lib/ipc/get-one.js
var import_node_events8, getOneMessage, getOneMessageAsync, getMessage, throwOnDisconnect2, throwOnStrictError;
var init_get_one = __esm({
  "node_modules/execa/lib/ipc/get-one.js"() {
    import_node_events8 = require("node:events");
    init_validation();
    init_forward();
    init_reference();
    getOneMessage = ({ anyProcess, channel, isSubprocess, ipc }, { reference = true, filter } = {}) => {
      validateIpcMethod({
        methodName: "getOneMessage",
        isSubprocess,
        ipc,
        isConnected: isConnected(anyProcess)
      });
      return getOneMessageAsync({
        anyProcess,
        channel,
        isSubprocess,
        filter,
        reference
      });
    };
    getOneMessageAsync = async ({ anyProcess, channel, isSubprocess, filter, reference }) => {
      addReference(channel, reference);
      const ipcEmitter = getIpcEmitter(anyProcess, channel, isSubprocess);
      const controller = new AbortController();
      try {
        return await Promise.race([
          getMessage(ipcEmitter, filter, controller),
          throwOnDisconnect2(ipcEmitter, isSubprocess, controller),
          throwOnStrictError(ipcEmitter, isSubprocess, controller)
        ]);
      } catch (error) {
        disconnect(anyProcess);
        throw error;
      } finally {
        controller.abort();
        removeReference(channel, reference);
      }
    };
    getMessage = async (ipcEmitter, filter, { signal }) => {
      if (filter === void 0) {
        const [message] = await (0, import_node_events8.once)(ipcEmitter, "message", { signal });
        return message;
      }
      for await (const [message] of (0, import_node_events8.on)(ipcEmitter, "message", { signal })) {
        if (filter(message)) {
          return message;
        }
      }
    };
    throwOnDisconnect2 = async (ipcEmitter, isSubprocess, { signal }) => {
      await (0, import_node_events8.once)(ipcEmitter, "disconnect", { signal });
      throwOnEarlyDisconnect(isSubprocess);
    };
    throwOnStrictError = async (ipcEmitter, isSubprocess, { signal }) => {
      const [error] = await (0, import_node_events8.once)(ipcEmitter, "strict:error", { signal });
      throw getStrictResponseError(error, isSubprocess);
    };
  }
});

// node_modules/execa/lib/ipc/get-each.js
var import_node_events9, getEachMessage, loopOnMessages, stopOnDisconnect, abortOnStrictError, iterateOnMessages, throwIfStrictError;
var init_get_each = __esm({
  "node_modules/execa/lib/ipc/get-each.js"() {
    import_node_events9 = require("node:events");
    init_validation();
    init_forward();
    init_reference();
    getEachMessage = ({ anyProcess, channel, isSubprocess, ipc }, { reference = true } = {}) => loopOnMessages({
      anyProcess,
      channel,
      isSubprocess,
      ipc,
      shouldAwait: !isSubprocess,
      reference
    });
    loopOnMessages = ({ anyProcess, channel, isSubprocess, ipc, shouldAwait, reference }) => {
      validateIpcMethod({
        methodName: "getEachMessage",
        isSubprocess,
        ipc,
        isConnected: isConnected(anyProcess)
      });
      addReference(channel, reference);
      const ipcEmitter = getIpcEmitter(anyProcess, channel, isSubprocess);
      const controller = new AbortController();
      const state = {};
      stopOnDisconnect(anyProcess, ipcEmitter, controller);
      abortOnStrictError({
        ipcEmitter,
        isSubprocess,
        controller,
        state
      });
      return iterateOnMessages({
        anyProcess,
        channel,
        ipcEmitter,
        isSubprocess,
        shouldAwait,
        controller,
        state,
        reference
      });
    };
    stopOnDisconnect = async (anyProcess, ipcEmitter, controller) => {
      try {
        await (0, import_node_events9.once)(ipcEmitter, "disconnect", { signal: controller.signal });
        controller.abort();
      } catch {
      }
    };
    abortOnStrictError = async ({ ipcEmitter, isSubprocess, controller, state }) => {
      try {
        const [error] = await (0, import_node_events9.once)(ipcEmitter, "strict:error", { signal: controller.signal });
        state.error = getStrictResponseError(error, isSubprocess);
        controller.abort();
      } catch {
      }
    };
    iterateOnMessages = async function* ({ anyProcess, channel, ipcEmitter, isSubprocess, shouldAwait, controller, state, reference }) {
      try {
        for await (const [message] of (0, import_node_events9.on)(ipcEmitter, "message", { signal: controller.signal })) {
          throwIfStrictError(state);
          yield message;
        }
      } catch {
        throwIfStrictError(state);
      } finally {
        controller.abort();
        removeReference(channel, reference);
        if (!isSubprocess) {
          disconnect(anyProcess);
        }
        if (shouldAwait) {
          await anyProcess;
        }
      }
    };
    throwIfStrictError = ({ error }) => {
      if (error) {
        throw error;
      }
    };
  }
});

// node_modules/execa/lib/ipc/methods.js
var import_node_process10, addIpcMethods, getIpcExport, getIpcMethods;
var init_methods = __esm({
  "node_modules/execa/lib/ipc/methods.js"() {
    import_node_process10 = __toESM(require("node:process"), 1);
    init_send();
    init_get_one();
    init_get_each();
    init_graceful();
    addIpcMethods = (subprocess, { ipc }) => {
      Object.assign(subprocess, getIpcMethods(subprocess, false, ipc));
    };
    getIpcExport = () => {
      const anyProcess = import_node_process10.default;
      const isSubprocess = true;
      const ipc = import_node_process10.default.channel !== void 0;
      return {
        ...getIpcMethods(anyProcess, isSubprocess, ipc),
        getCancelSignal: getCancelSignal.bind(void 0, {
          anyProcess,
          channel: anyProcess.channel,
          isSubprocess,
          ipc
        })
      };
    };
    getIpcMethods = (anyProcess, isSubprocess, ipc) => ({
      sendMessage: sendMessage.bind(void 0, {
        anyProcess,
        channel: anyProcess.channel,
        isSubprocess,
        ipc
      }),
      getOneMessage: getOneMessage.bind(void 0, {
        anyProcess,
        channel: anyProcess.channel,
        isSubprocess,
        ipc
      }),
      getEachMessage: getEachMessage.bind(void 0, {
        anyProcess,
        channel: anyProcess.channel,
        isSubprocess,
        ipc
      })
    });
  }
});

// node_modules/execa/lib/return/early-error.js
var import_node_child_process4, import_node_stream2, handleEarlyError, createDummyStreams, createDummyStream, readable, writable, duplex, handleDummyPromise;
var init_early_error = __esm({
  "node_modules/execa/lib/return/early-error.js"() {
    import_node_child_process4 = require("node:child_process");
    import_node_stream2 = require("node:stream");
    init_handle();
    init_result();
    init_reject();
    handleEarlyError = ({ error, command, escapedCommand, fileDescriptors, options, startTime, verboseInfo }) => {
      cleanupCustomStreams(fileDescriptors);
      const subprocess = new import_node_child_process4.ChildProcess();
      createDummyStreams(subprocess, fileDescriptors);
      Object.assign(subprocess, { readable, writable, duplex });
      const earlyError = makeEarlyError({
        error,
        command,
        escapedCommand,
        fileDescriptors,
        options,
        startTime,
        isSync: false
      });
      const promise = handleDummyPromise(earlyError, verboseInfo, options);
      return { subprocess, promise };
    };
    createDummyStreams = (subprocess, fileDescriptors) => {
      const stdin = createDummyStream();
      const stdout = createDummyStream();
      const stderr = createDummyStream();
      const extraStdio = Array.from({ length: fileDescriptors.length - 3 }, createDummyStream);
      const all = createDummyStream();
      const stdio = [stdin, stdout, stderr, ...extraStdio];
      Object.assign(subprocess, {
        stdin,
        stdout,
        stderr,
        all,
        stdio
      });
    };
    createDummyStream = () => {
      const stream = new import_node_stream2.PassThrough();
      stream.end();
      return stream;
    };
    readable = () => new import_node_stream2.Readable({ read() {
    } });
    writable = () => new import_node_stream2.Writable({ write() {
    } });
    duplex = () => new import_node_stream2.Duplex({ read() {
    }, write() {
    } });
    handleDummyPromise = async (error, verboseInfo, options) => handleResult(error, verboseInfo, options);
  }
});

// node_modules/execa/lib/stdio/handle-async.js
var import_node_fs5, import_node_buffer3, import_node_stream3, handleStdioAsync, forbiddenIfAsync, addProperties2, addPropertiesAsync;
var init_handle_async = __esm({
  "node_modules/execa/lib/stdio/handle-async.js"() {
    import_node_fs5 = require("node:fs");
    import_node_buffer3 = require("node:buffer");
    import_node_stream3 = require("node:stream");
    init_generator();
    init_handle();
    init_type();
    handleStdioAsync = (options, verboseInfo) => handleStdio(addPropertiesAsync, options, verboseInfo, false);
    forbiddenIfAsync = ({ type, optionName }) => {
      throw new TypeError(`The \`${optionName}\` option cannot be ${TYPE_TO_MESSAGE[type]}.`);
    };
    addProperties2 = {
      fileNumber: forbiddenIfAsync,
      generator: generatorToStream,
      asyncGenerator: generatorToStream,
      nodeStream: ({ value }) => ({ stream: value }),
      webTransform({ value: { transform, writableObjectMode, readableObjectMode } }) {
        const objectMode = writableObjectMode || readableObjectMode;
        const stream = import_node_stream3.Duplex.fromWeb(transform, { objectMode });
        return { stream };
      },
      duplex: ({ value: { transform } }) => ({ stream: transform }),
      native() {
      }
    };
    addPropertiesAsync = {
      input: {
        ...addProperties2,
        fileUrl: ({ value }) => ({ stream: (0, import_node_fs5.createReadStream)(value) }),
        filePath: ({ value: { file } }) => ({ stream: (0, import_node_fs5.createReadStream)(file) }),
        webStream: ({ value }) => ({ stream: import_node_stream3.Readable.fromWeb(value) }),
        iterable: ({ value }) => ({ stream: import_node_stream3.Readable.from(value) }),
        asyncIterable: ({ value }) => ({ stream: import_node_stream3.Readable.from(value) }),
        string: ({ value }) => ({ stream: import_node_stream3.Readable.from(value) }),
        uint8Array: ({ value }) => ({ stream: import_node_stream3.Readable.from(import_node_buffer3.Buffer.from(value)) })
      },
      output: {
        ...addProperties2,
        fileUrl: ({ value }) => ({ stream: (0, import_node_fs5.createWriteStream)(value) }),
        filePath: ({ value: { file, append } }) => ({ stream: (0, import_node_fs5.createWriteStream)(file, append ? { flags: "a" } : {}) }),
        webStream: ({ value }) => ({ stream: import_node_stream3.Writable.fromWeb(value) }),
        iterable: forbiddenIfAsync,
        asyncIterable: forbiddenIfAsync,
        string: forbiddenIfAsync,
        uint8Array: forbiddenIfAsync
      }
    };
  }
});

// node_modules/@sindresorhus/merge-streams/index.js
function mergeStreams(streams) {
  if (!Array.isArray(streams)) {
    throw new TypeError(`Expected an array, got \`${typeof streams}\`.`);
  }
  for (const stream of streams) {
    validateStream(stream);
  }
  const objectMode = streams.some(({ readableObjectMode }) => readableObjectMode);
  const highWaterMark = getHighWaterMark(streams, objectMode);
  const passThroughStream = new MergedStream({
    objectMode,
    writableHighWaterMark: highWaterMark,
    readableHighWaterMark: highWaterMark
  });
  for (const stream of streams) {
    passThroughStream.add(stream);
  }
  return passThroughStream;
}
var import_node_events10, import_node_stream4, import_promises6, getHighWaterMark, MergedStream, onMergedStreamFinished, onMergedStreamEnd, onInputStreamsUnpipe, validateStream, endWhenStreamsDone, afterMergedStreamFinished, onInputStreamEnd, onInputStreamUnpipe, endStream, errorOrAbortStream, isAbortError, abortStream, errorStream, noop2, updateMaxListeners, PASSTHROUGH_LISTENERS_COUNT, PASSTHROUGH_LISTENERS_PER_STREAM;
var init_merge_streams = __esm({
  "node_modules/@sindresorhus/merge-streams/index.js"() {
    import_node_events10 = require("node:events");
    import_node_stream4 = require("node:stream");
    import_promises6 = require("node:stream/promises");
    getHighWaterMark = (streams, objectMode) => {
      if (streams.length === 0) {
        return (0, import_node_stream4.getDefaultHighWaterMark)(objectMode);
      }
      const highWaterMarks = streams.filter(({ readableObjectMode }) => readableObjectMode === objectMode).map(({ readableHighWaterMark }) => readableHighWaterMark);
      return Math.max(...highWaterMarks);
    };
    MergedStream = class extends import_node_stream4.PassThrough {
      #streams = /* @__PURE__ */ new Set([]);
      #ended = /* @__PURE__ */ new Set([]);
      #aborted = /* @__PURE__ */ new Set([]);
      #onFinished;
      #unpipeEvent = Symbol("unpipe");
      #streamPromises = /* @__PURE__ */ new WeakMap();
      add(stream) {
        validateStream(stream);
        if (this.#streams.has(stream)) {
          return;
        }
        this.#streams.add(stream);
        this.#onFinished ??= onMergedStreamFinished(this, this.#streams, this.#unpipeEvent);
        const streamPromise = endWhenStreamsDone({
          passThroughStream: this,
          stream,
          streams: this.#streams,
          ended: this.#ended,
          aborted: this.#aborted,
          onFinished: this.#onFinished,
          unpipeEvent: this.#unpipeEvent
        });
        this.#streamPromises.set(stream, streamPromise);
        stream.pipe(this, { end: false });
      }
      async remove(stream) {
        validateStream(stream);
        if (!this.#streams.has(stream)) {
          return false;
        }
        const streamPromise = this.#streamPromises.get(stream);
        if (streamPromise === void 0) {
          return false;
        }
        this.#streamPromises.delete(stream);
        stream.unpipe(this);
        await streamPromise;
        return true;
      }
    };
    onMergedStreamFinished = async (passThroughStream, streams, unpipeEvent) => {
      updateMaxListeners(passThroughStream, PASSTHROUGH_LISTENERS_COUNT);
      const controller = new AbortController();
      try {
        await Promise.race([
          onMergedStreamEnd(passThroughStream, controller),
          onInputStreamsUnpipe(passThroughStream, streams, unpipeEvent, controller)
        ]);
      } finally {
        controller.abort();
        updateMaxListeners(passThroughStream, -PASSTHROUGH_LISTENERS_COUNT);
      }
    };
    onMergedStreamEnd = async (passThroughStream, { signal }) => {
      try {
        await (0, import_promises6.finished)(passThroughStream, { signal, cleanup: true });
      } catch (error) {
        errorOrAbortStream(passThroughStream, error);
        throw error;
      }
    };
    onInputStreamsUnpipe = async (passThroughStream, streams, unpipeEvent, { signal }) => {
      for await (const [unpipedStream] of (0, import_node_events10.on)(passThroughStream, "unpipe", { signal })) {
        if (streams.has(unpipedStream)) {
          unpipedStream.emit(unpipeEvent);
        }
      }
    };
    validateStream = (stream) => {
      if (typeof stream?.pipe !== "function") {
        throw new TypeError(`Expected a readable stream, got: \`${typeof stream}\`.`);
      }
    };
    endWhenStreamsDone = async ({ passThroughStream, stream, streams, ended, aborted: aborted2, onFinished, unpipeEvent }) => {
      updateMaxListeners(passThroughStream, PASSTHROUGH_LISTENERS_PER_STREAM);
      const controller = new AbortController();
      try {
        await Promise.race([
          afterMergedStreamFinished(onFinished, stream, controller),
          onInputStreamEnd({
            passThroughStream,
            stream,
            streams,
            ended,
            aborted: aborted2,
            controller
          }),
          onInputStreamUnpipe({
            stream,
            streams,
            ended,
            aborted: aborted2,
            unpipeEvent,
            controller
          })
        ]);
      } finally {
        controller.abort();
        updateMaxListeners(passThroughStream, -PASSTHROUGH_LISTENERS_PER_STREAM);
      }
      if (streams.size > 0 && streams.size === ended.size + aborted2.size) {
        if (ended.size === 0 && aborted2.size > 0) {
          abortStream(passThroughStream);
        } else {
          endStream(passThroughStream);
        }
      }
    };
    afterMergedStreamFinished = async (onFinished, stream, { signal }) => {
      try {
        await onFinished;
        if (!signal.aborted) {
          abortStream(stream);
        }
      } catch (error) {
        if (!signal.aborted) {
          errorOrAbortStream(stream, error);
        }
      }
    };
    onInputStreamEnd = async ({ passThroughStream, stream, streams, ended, aborted: aborted2, controller: { signal } }) => {
      try {
        await (0, import_promises6.finished)(stream, {
          signal,
          cleanup: true,
          readable: true,
          writable: false
        });
        if (streams.has(stream)) {
          ended.add(stream);
        }
      } catch (error) {
        if (signal.aborted || !streams.has(stream)) {
          return;
        }
        if (isAbortError(error)) {
          aborted2.add(stream);
        } else {
          errorStream(passThroughStream, error);
        }
      }
    };
    onInputStreamUnpipe = async ({ stream, streams, ended, aborted: aborted2, unpipeEvent, controller: { signal } }) => {
      await (0, import_node_events10.once)(stream, unpipeEvent, { signal });
      if (!stream.readable) {
        return (0, import_node_events10.once)(signal, "abort", { signal });
      }
      streams.delete(stream);
      ended.delete(stream);
      aborted2.delete(stream);
    };
    endStream = (stream) => {
      if (stream.writable) {
        stream.end();
      }
    };
    errorOrAbortStream = (stream, error) => {
      if (isAbortError(error)) {
        abortStream(stream);
      } else {
        errorStream(stream, error);
      }
    };
    isAbortError = (error) => error?.code === "ERR_STREAM_PREMATURE_CLOSE";
    abortStream = (stream) => {
      if (stream.readable || stream.writable) {
        stream.destroy();
      }
    };
    errorStream = (stream, error) => {
      if (!stream.destroyed) {
        stream.once("error", noop2);
        stream.destroy(error);
      }
    };
    noop2 = () => {
    };
    updateMaxListeners = (passThroughStream, increment2) => {
      const maxListeners = passThroughStream.getMaxListeners();
      if (maxListeners !== 0 && maxListeners !== Number.POSITIVE_INFINITY) {
        passThroughStream.setMaxListeners(maxListeners + increment2);
      }
    };
    PASSTHROUGH_LISTENERS_COUNT = 2;
    PASSTHROUGH_LISTENERS_PER_STREAM = 1;
  }
});

// node_modules/execa/lib/io/pipeline.js
var import_promises7, pipeStreams, onSourceFinish, endDestinationStream, onDestinationFinish, abortSourceStream;
var init_pipeline = __esm({
  "node_modules/execa/lib/io/pipeline.js"() {
    import_promises7 = require("node:stream/promises");
    init_standard_stream();
    pipeStreams = (source, destination) => {
      source.pipe(destination);
      onSourceFinish(source, destination);
      onDestinationFinish(source, destination);
    };
    onSourceFinish = async (source, destination) => {
      if (isStandardStream(source) || isStandardStream(destination)) {
        return;
      }
      try {
        await (0, import_promises7.finished)(source, { cleanup: true, readable: true, writable: false });
      } catch {
      }
      endDestinationStream(destination);
    };
    endDestinationStream = (destination) => {
      if (destination.writable) {
        destination.end();
      }
    };
    onDestinationFinish = async (source, destination) => {
      if (isStandardStream(source) || isStandardStream(destination)) {
        return;
      }
      try {
        await (0, import_promises7.finished)(destination, { cleanup: true, readable: false, writable: true });
      } catch {
      }
      abortSourceStream(source);
    };
    abortSourceStream = (source) => {
      if (source.readable) {
        source.destroy();
      }
    };
  }
});

// node_modules/execa/lib/io/output-async.js
var pipeOutputAsync, pipeTransform, SUBPROCESS_STREAM_PROPERTIES, pipeStdioItem, setStandardStreamMaxListeners, MAX_LISTENERS_INCREMENT;
var init_output_async = __esm({
  "node_modules/execa/lib/io/output-async.js"() {
    init_merge_streams();
    init_standard_stream();
    init_max_listeners();
    init_type();
    init_pipeline();
    pipeOutputAsync = (subprocess, fileDescriptors, controller) => {
      const pipeGroups = /* @__PURE__ */ new Map();
      for (const [fdNumber, { stdioItems, direction }] of Object.entries(fileDescriptors)) {
        for (const { stream } of stdioItems.filter(({ type }) => TRANSFORM_TYPES.has(type))) {
          pipeTransform(subprocess, stream, direction, fdNumber);
        }
        for (const { stream } of stdioItems.filter(({ type }) => !TRANSFORM_TYPES.has(type))) {
          pipeStdioItem({
            subprocess,
            stream,
            direction,
            fdNumber,
            pipeGroups,
            controller
          });
        }
      }
      for (const [outputStream, inputStreams] of pipeGroups.entries()) {
        const inputStream = inputStreams.length === 1 ? inputStreams[0] : mergeStreams(inputStreams);
        pipeStreams(inputStream, outputStream);
      }
    };
    pipeTransform = (subprocess, stream, direction, fdNumber) => {
      if (direction === "output") {
        pipeStreams(subprocess.stdio[fdNumber], stream);
      } else {
        pipeStreams(stream, subprocess.stdio[fdNumber]);
      }
      const streamProperty = SUBPROCESS_STREAM_PROPERTIES[fdNumber];
      if (streamProperty !== void 0) {
        subprocess[streamProperty] = stream;
      }
      subprocess.stdio[fdNumber] = stream;
    };
    SUBPROCESS_STREAM_PROPERTIES = ["stdin", "stdout", "stderr"];
    pipeStdioItem = ({ subprocess, stream, direction, fdNumber, pipeGroups, controller }) => {
      if (stream === void 0) {
        return;
      }
      setStandardStreamMaxListeners(stream, controller);
      const [inputStream, outputStream] = direction === "output" ? [stream, subprocess.stdio[fdNumber]] : [subprocess.stdio[fdNumber], stream];
      const outputStreams = pipeGroups.get(inputStream) ?? [];
      pipeGroups.set(inputStream, [...outputStreams, outputStream]);
    };
    setStandardStreamMaxListeners = (stream, { signal }) => {
      if (isStandardStream(stream)) {
        incrementMaxListeners(stream, MAX_LISTENERS_INCREMENT, signal);
      }
    };
    MAX_LISTENERS_INCREMENT = 2;
  }
});

// node_modules/signal-exit/dist/mjs/signals.js
var signals;
var init_signals2 = __esm({
  "node_modules/signal-exit/dist/mjs/signals.js"() {
    signals = [];
    signals.push("SIGHUP", "SIGINT", "SIGTERM");
    if (process.platform !== "win32") {
      signals.push(
        "SIGALRM",
        "SIGABRT",
        "SIGVTALRM",
        "SIGXCPU",
        "SIGXFSZ",
        "SIGUSR2",
        "SIGTRAP",
        "SIGSYS",
        "SIGQUIT",
        "SIGIOT"
        // should detect profiler and enable/disable accordingly.
        // see #21
        // 'SIGPROF'
      );
    }
    if (process.platform === "linux") {
      signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
    }
  }
});

// node_modules/signal-exit/dist/mjs/index.js
var processOk, kExitEmitter, global2, ObjectDefineProperty, Emitter, SignalExitBase, signalExitWrap, SignalExitFallback, SignalExit, process9, onExit, load, unload;
var init_mjs = __esm({
  "node_modules/signal-exit/dist/mjs/index.js"() {
    init_signals2();
    processOk = (process10) => !!process10 && typeof process10 === "object" && typeof process10.removeListener === "function" && typeof process10.emit === "function" && typeof process10.reallyExit === "function" && typeof process10.listeners === "function" && typeof process10.kill === "function" && typeof process10.pid === "number" && typeof process10.on === "function";
    kExitEmitter = Symbol.for("signal-exit emitter");
    global2 = globalThis;
    ObjectDefineProperty = Object.defineProperty.bind(Object);
    Emitter = class {
      emitted = {
        afterExit: false,
        exit: false
      };
      listeners = {
        afterExit: [],
        exit: []
      };
      count = 0;
      id = Math.random();
      constructor() {
        if (global2[kExitEmitter]) {
          return global2[kExitEmitter];
        }
        ObjectDefineProperty(global2, kExitEmitter, {
          value: this,
          writable: false,
          enumerable: false,
          configurable: false
        });
      }
      on(ev, fn) {
        this.listeners[ev].push(fn);
      }
      removeListener(ev, fn) {
        const list = this.listeners[ev];
        const i2 = list.indexOf(fn);
        if (i2 === -1) {
          return;
        }
        if (i2 === 0 && list.length === 1) {
          list.length = 0;
        } else {
          list.splice(i2, 1);
        }
      }
      emit(ev, code, signal) {
        if (this.emitted[ev]) {
          return false;
        }
        this.emitted[ev] = true;
        let ret = false;
        for (const fn of this.listeners[ev]) {
          ret = fn(code, signal) === true || ret;
        }
        if (ev === "exit") {
          ret = this.emit("afterExit", code, signal) || ret;
        }
        return ret;
      }
    };
    SignalExitBase = class {
    };
    signalExitWrap = (handler) => {
      return {
        onExit(cb, opts) {
          return handler.onExit(cb, opts);
        },
        load() {
          return handler.load();
        },
        unload() {
          return handler.unload();
        }
      };
    };
    SignalExitFallback = class extends SignalExitBase {
      onExit() {
        return () => {
        };
      }
      load() {
      }
      unload() {
      }
    };
    SignalExit = class extends SignalExitBase {
      // "SIGHUP" throws an `ENOSYS` error on Windows,
      // so use a supported signal instead
      /* c8 ignore start */
      #hupSig = process9.platform === "win32" ? "SIGINT" : "SIGHUP";
      /* c8 ignore stop */
      #emitter = new Emitter();
      #process;
      #originalProcessEmit;
      #originalProcessReallyExit;
      #sigListeners = {};
      #loaded = false;
      constructor(process10) {
        super();
        this.#process = process10;
        this.#sigListeners = {};
        for (const sig of signals) {
          this.#sigListeners[sig] = () => {
            const listeners = this.#process.listeners(sig);
            let { count: count2 } = this.#emitter;
            const p = process10;
            if (typeof p.__signal_exit_emitter__ === "object" && typeof p.__signal_exit_emitter__.count === "number") {
              count2 += p.__signal_exit_emitter__.count;
            }
            if (listeners.length === count2) {
              this.unload();
              const ret = this.#emitter.emit("exit", null, sig);
              const s = sig === "SIGHUP" ? this.#hupSig : sig;
              if (!ret)
                process10.kill(process10.pid, s);
            }
          };
        }
        this.#originalProcessReallyExit = process10.reallyExit;
        this.#originalProcessEmit = process10.emit;
      }
      onExit(cb, opts) {
        if (!processOk(this.#process)) {
          return () => {
          };
        }
        if (this.#loaded === false) {
          this.load();
        }
        const ev = opts?.alwaysLast ? "afterExit" : "exit";
        this.#emitter.on(ev, cb);
        return () => {
          this.#emitter.removeListener(ev, cb);
          if (this.#emitter.listeners["exit"].length === 0 && this.#emitter.listeners["afterExit"].length === 0) {
            this.unload();
          }
        };
      }
      load() {
        if (this.#loaded) {
          return;
        }
        this.#loaded = true;
        this.#emitter.count += 1;
        for (const sig of signals) {
          try {
            const fn = this.#sigListeners[sig];
            if (fn)
              this.#process.on(sig, fn);
          } catch (_) {
          }
        }
        this.#process.emit = (ev, ...a2) => {
          return this.#processEmit(ev, ...a2);
        };
        this.#process.reallyExit = (code) => {
          return this.#processReallyExit(code);
        };
      }
      unload() {
        if (!this.#loaded) {
          return;
        }
        this.#loaded = false;
        signals.forEach((sig) => {
          const listener = this.#sigListeners[sig];
          if (!listener) {
            throw new Error("Listener not defined for signal: " + sig);
          }
          try {
            this.#process.removeListener(sig, listener);
          } catch (_) {
          }
        });
        this.#process.emit = this.#originalProcessEmit;
        this.#process.reallyExit = this.#originalProcessReallyExit;
        this.#emitter.count -= 1;
      }
      #processReallyExit(code) {
        if (!processOk(this.#process)) {
          return 0;
        }
        this.#process.exitCode = code || 0;
        this.#emitter.emit("exit", this.#process.exitCode, null);
        return this.#originalProcessReallyExit.call(this.#process, this.#process.exitCode);
      }
      #processEmit(ev, ...args) {
        const og = this.#originalProcessEmit;
        if (ev === "exit" && processOk(this.#process)) {
          if (typeof args[0] === "number") {
            this.#process.exitCode = args[0];
          }
          const ret = og.call(this.#process, ev, ...args);
          this.#emitter.emit("exit", this.#process.exitCode, null);
          return ret;
        } else {
          return og.call(this.#process, ev, ...args);
        }
      }
    };
    process9 = globalThis.process;
    ({
      onExit: (
        /**
         * Called when the process is exiting, whether via signal, explicit
         * exit, or running out of stuff to do.
         *
         * If the global process object is not suitable for instrumentation,
         * then this will be a no-op.
         *
         * Returns a function that may be used to unload signal-exit.
         */
        onExit
      ),
      load: (
        /**
         * Load the listeners.  Likely you never need to call this, unless
         * doing a rather deep integration with signal-exit functionality.
         * Mostly exposed for the benefit of testing.
         *
         * @internal
         */
        load
      ),
      unload: (
        /**
         * Unload the listeners.  Likely you never need to call this, unless
         * doing a rather deep integration with signal-exit functionality.
         * Mostly exposed for the benefit of testing.
         *
         * @internal
         */
        unload
      )
    } = signalExitWrap(processOk(process9) ? new SignalExit(process9) : new SignalExitFallback()));
  }
});

// node_modules/execa/lib/terminate/cleanup.js
var import_node_events11, cleanupOnExit;
var init_cleanup = __esm({
  "node_modules/execa/lib/terminate/cleanup.js"() {
    import_node_events11 = require("node:events");
    init_mjs();
    cleanupOnExit = (subprocess, { cleanup, detached }, { signal }) => {
      if (!cleanup || detached) {
        return;
      }
      const removeExitHandler = onExit(() => {
        subprocess.kill();
      });
      (0, import_node_events11.addAbortListener)(signal, () => {
        removeExitHandler();
      });
    };
  }
});

// node_modules/execa/lib/pipe/pipe-arguments.js
var normalizePipeArguments, getDestinationStream, getDestination, mapDestinationArguments, getSourceStream;
var init_pipe_arguments = __esm({
  "node_modules/execa/lib/pipe/pipe-arguments.js"() {
    init_parameters();
    init_duration();
    init_fd_options();
    init_file_url();
    normalizePipeArguments = ({ source, sourcePromise, boundOptions, createNested }, ...pipeArguments) => {
      const startTime = getStartTime();
      const {
        destination,
        destinationStream,
        destinationError,
        from,
        unpipeSignal
      } = getDestinationStream(boundOptions, createNested, pipeArguments);
      const { sourceStream, sourceError } = getSourceStream(source, from);
      const { options: sourceOptions, fileDescriptors } = SUBPROCESS_OPTIONS.get(source);
      return {
        sourcePromise,
        sourceStream,
        sourceOptions,
        sourceError,
        destination,
        destinationStream,
        destinationError,
        unpipeSignal,
        fileDescriptors,
        startTime
      };
    };
    getDestinationStream = (boundOptions, createNested, pipeArguments) => {
      try {
        const {
          destination,
          pipeOptions: { from, to, unpipeSignal } = {}
        } = getDestination(boundOptions, createNested, ...pipeArguments);
        const destinationStream = getToStream(destination, to);
        return {
          destination,
          destinationStream,
          from,
          unpipeSignal
        };
      } catch (error) {
        return { destinationError: error };
      }
    };
    getDestination = (boundOptions, createNested, firstArgument, ...pipeArguments) => {
      if (Array.isArray(firstArgument)) {
        const destination = createNested(mapDestinationArguments, boundOptions)(firstArgument, ...pipeArguments);
        return { destination, pipeOptions: boundOptions };
      }
      if (typeof firstArgument === "string" || firstArgument instanceof URL || isDenoExecPath(firstArgument)) {
        if (Object.keys(boundOptions).length > 0) {
          throw new TypeError('Please use .pipe("file", ..., options) or .pipe(execa("file", ..., options)) instead of .pipe(options)("file", ...).');
        }
        const [rawFile, rawArguments, rawOptions] = normalizeParameters(firstArgument, ...pipeArguments);
        const destination = createNested(mapDestinationArguments)(rawFile, rawArguments, rawOptions);
        return { destination, pipeOptions: rawOptions };
      }
      if (SUBPROCESS_OPTIONS.has(firstArgument)) {
        if (Object.keys(boundOptions).length > 0) {
          throw new TypeError("Please use .pipe(options)`command` or .pipe($(options)`command`) instead of .pipe(options)($`command`).");
        }
        return { destination: firstArgument, pipeOptions: pipeArguments[0] };
      }
      throw new TypeError(`The first argument must be a template string, an options object, or an Execa subprocess: ${firstArgument}`);
    };
    mapDestinationArguments = ({ options }) => ({ options: { ...options, stdin: "pipe", piped: true } });
    getSourceStream = (source, from) => {
      try {
        const sourceStream = getFromStream(source, from);
        return { sourceStream };
      } catch (error) {
        return { sourceError: error };
      }
    };
  }
});

// node_modules/execa/lib/pipe/throw.js
var handlePipeArgumentsError, getPipeArgumentsError, createNonCommandError, PIPE_COMMAND_MESSAGE;
var init_throw = __esm({
  "node_modules/execa/lib/pipe/throw.js"() {
    init_result();
    init_pipeline();
    handlePipeArgumentsError = ({
      sourceStream,
      sourceError,
      destinationStream,
      destinationError,
      fileDescriptors,
      sourceOptions,
      startTime
    }) => {
      const error = getPipeArgumentsError({
        sourceStream,
        sourceError,
        destinationStream,
        destinationError
      });
      if (error !== void 0) {
        throw createNonCommandError({
          error,
          fileDescriptors,
          sourceOptions,
          startTime
        });
      }
    };
    getPipeArgumentsError = ({ sourceStream, sourceError, destinationStream, destinationError }) => {
      if (sourceError !== void 0 && destinationError !== void 0) {
        return destinationError;
      }
      if (destinationError !== void 0) {
        abortSourceStream(sourceStream);
        return destinationError;
      }
      if (sourceError !== void 0) {
        endDestinationStream(destinationStream);
        return sourceError;
      }
    };
    createNonCommandError = ({ error, fileDescriptors, sourceOptions, startTime }) => makeEarlyError({
      error,
      command: PIPE_COMMAND_MESSAGE,
      escapedCommand: PIPE_COMMAND_MESSAGE,
      fileDescriptors,
      options: sourceOptions,
      startTime,
      isSync: false
    });
    PIPE_COMMAND_MESSAGE = "source.pipe(destination)";
  }
});

// node_modules/execa/lib/pipe/sequence.js
var waitForBothSubprocesses;
var init_sequence = __esm({
  "node_modules/execa/lib/pipe/sequence.js"() {
    waitForBothSubprocesses = async (subprocessPromises) => {
      const [
        { status: sourceStatus, reason: sourceReason, value: sourceResult = sourceReason },
        { status: destinationStatus, reason: destinationReason, value: destinationResult = destinationReason }
      ] = await subprocessPromises;
      if (!destinationResult.pipedFrom.includes(sourceResult)) {
        destinationResult.pipedFrom.push(sourceResult);
      }
      if (destinationStatus === "rejected") {
        throw destinationResult;
      }
      if (sourceStatus === "rejected") {
        throw sourceResult;
      }
      return destinationResult;
    };
  }
});

// node_modules/execa/lib/pipe/streaming.js
var import_promises8, pipeSubprocessStream, pipeFirstSubprocessStream, pipeMoreSubprocessStream, cleanupMergedStreamsMap, MERGED_STREAMS, SOURCE_LISTENERS_PER_PIPE, DESTINATION_LISTENERS_PER_PIPE;
var init_streaming = __esm({
  "node_modules/execa/lib/pipe/streaming.js"() {
    import_promises8 = require("node:stream/promises");
    init_merge_streams();
    init_max_listeners();
    init_pipeline();
    pipeSubprocessStream = (sourceStream, destinationStream, maxListenersController) => {
      const mergedStream = MERGED_STREAMS.has(destinationStream) ? pipeMoreSubprocessStream(sourceStream, destinationStream) : pipeFirstSubprocessStream(sourceStream, destinationStream);
      incrementMaxListeners(sourceStream, SOURCE_LISTENERS_PER_PIPE, maxListenersController.signal);
      incrementMaxListeners(destinationStream, DESTINATION_LISTENERS_PER_PIPE, maxListenersController.signal);
      cleanupMergedStreamsMap(destinationStream);
      return mergedStream;
    };
    pipeFirstSubprocessStream = (sourceStream, destinationStream) => {
      const mergedStream = mergeStreams([sourceStream]);
      pipeStreams(mergedStream, destinationStream);
      MERGED_STREAMS.set(destinationStream, mergedStream);
      return mergedStream;
    };
    pipeMoreSubprocessStream = (sourceStream, destinationStream) => {
      const mergedStream = MERGED_STREAMS.get(destinationStream);
      mergedStream.add(sourceStream);
      return mergedStream;
    };
    cleanupMergedStreamsMap = async (destinationStream) => {
      try {
        await (0, import_promises8.finished)(destinationStream, { cleanup: true, readable: false, writable: true });
      } catch {
      }
      MERGED_STREAMS.delete(destinationStream);
    };
    MERGED_STREAMS = /* @__PURE__ */ new WeakMap();
    SOURCE_LISTENERS_PER_PIPE = 2;
    DESTINATION_LISTENERS_PER_PIPE = 1;
  }
});

// node_modules/execa/lib/pipe/abort.js
var import_node_util8, unpipeOnAbort, unpipeOnSignalAbort;
var init_abort = __esm({
  "node_modules/execa/lib/pipe/abort.js"() {
    import_node_util8 = require("node:util");
    init_throw();
    unpipeOnAbort = (unpipeSignal, unpipeContext) => unpipeSignal === void 0 ? [] : [unpipeOnSignalAbort(unpipeSignal, unpipeContext)];
    unpipeOnSignalAbort = async (unpipeSignal, { sourceStream, mergedStream, fileDescriptors, sourceOptions, startTime }) => {
      await (0, import_node_util8.aborted)(unpipeSignal, sourceStream);
      await mergedStream.remove(sourceStream);
      const error = new Error("Pipe canceled by `unpipeSignal` option.");
      throw createNonCommandError({
        error,
        fileDescriptors,
        sourceOptions,
        startTime
      });
    };
  }
});

// node_modules/execa/lib/pipe/setup.js
var pipeToSubprocess, handlePipePromise, getSubprocessPromises;
var init_setup = __esm({
  "node_modules/execa/lib/pipe/setup.js"() {
    init_is_plain_obj();
    init_pipe_arguments();
    init_throw();
    init_sequence();
    init_streaming();
    init_abort();
    pipeToSubprocess = (sourceInfo, ...pipeArguments) => {
      if (isPlainObject(pipeArguments[0])) {
        return pipeToSubprocess.bind(void 0, {
          ...sourceInfo,
          boundOptions: { ...sourceInfo.boundOptions, ...pipeArguments[0] }
        });
      }
      const { destination, ...normalizedInfo } = normalizePipeArguments(sourceInfo, ...pipeArguments);
      const promise = handlePipePromise({ ...normalizedInfo, destination });
      promise.pipe = pipeToSubprocess.bind(void 0, {
        ...sourceInfo,
        source: destination,
        sourcePromise: promise,
        boundOptions: {}
      });
      return promise;
    };
    handlePipePromise = async ({
      sourcePromise,
      sourceStream,
      sourceOptions,
      sourceError,
      destination,
      destinationStream,
      destinationError,
      unpipeSignal,
      fileDescriptors,
      startTime
    }) => {
      const subprocessPromises = getSubprocessPromises(sourcePromise, destination);
      handlePipeArgumentsError({
        sourceStream,
        sourceError,
        destinationStream,
        destinationError,
        fileDescriptors,
        sourceOptions,
        startTime
      });
      const maxListenersController = new AbortController();
      try {
        const mergedStream = pipeSubprocessStream(sourceStream, destinationStream, maxListenersController);
        return await Promise.race([
          waitForBothSubprocesses(subprocessPromises),
          ...unpipeOnAbort(unpipeSignal, {
            sourceStream,
            mergedStream,
            sourceOptions,
            fileDescriptors,
            startTime
          })
        ]);
      } finally {
        maxListenersController.abort();
      }
    };
    getSubprocessPromises = (sourcePromise, destination) => Promise.allSettled([sourcePromise, destination]);
  }
});

// node_modules/execa/lib/io/iterate.js
var import_node_events12, import_node_stream5, iterateOnSubprocessStream, stopReadingOnExit, iterateForResult, stopReadingOnStreamEnd, iterateOnStream, DEFAULT_OBJECT_HIGH_WATER_MARK, HIGH_WATER_MARK, iterateOnData, getGenerators;
var init_iterate = __esm({
  "node_modules/execa/lib/io/iterate.js"() {
    import_node_events12 = require("node:events");
    import_node_stream5 = require("node:stream");
    init_encoding_transform();
    init_split();
    init_run_sync();
    iterateOnSubprocessStream = ({ subprocessStdout, subprocess, binary, shouldEncode, encoding, preserveNewlines }) => {
      const controller = new AbortController();
      stopReadingOnExit(subprocess, controller);
      return iterateOnStream({
        stream: subprocessStdout,
        controller,
        binary,
        shouldEncode: !subprocessStdout.readableObjectMode && shouldEncode,
        encoding,
        shouldSplit: !subprocessStdout.readableObjectMode,
        preserveNewlines
      });
    };
    stopReadingOnExit = async (subprocess, controller) => {
      try {
        await subprocess;
      } catch {
      } finally {
        controller.abort();
      }
    };
    iterateForResult = ({ stream, onStreamEnd, lines, encoding, stripFinalNewline: stripFinalNewline2, allMixed }) => {
      const controller = new AbortController();
      stopReadingOnStreamEnd(onStreamEnd, controller, stream);
      const objectMode = stream.readableObjectMode && !allMixed;
      return iterateOnStream({
        stream,
        controller,
        binary: encoding === "buffer",
        shouldEncode: !objectMode,
        encoding,
        shouldSplit: !objectMode && lines,
        preserveNewlines: !stripFinalNewline2
      });
    };
    stopReadingOnStreamEnd = async (onStreamEnd, controller, stream) => {
      try {
        await onStreamEnd;
      } catch {
        stream.destroy();
      } finally {
        controller.abort();
      }
    };
    iterateOnStream = ({ stream, controller, binary, shouldEncode, encoding, shouldSplit, preserveNewlines }) => {
      const onStdoutChunk = (0, import_node_events12.on)(stream, "data", {
        signal: controller.signal,
        highWaterMark: HIGH_WATER_MARK,
        // Backward compatibility with older name for this option
        // See https://github.com/nodejs/node/pull/52080#discussion_r1525227861
        // @todo Remove after removing support for Node 21
        highWatermark: HIGH_WATER_MARK
      });
      return iterateOnData({
        onStdoutChunk,
        controller,
        binary,
        shouldEncode,
        encoding,
        shouldSplit,
        preserveNewlines
      });
    };
    DEFAULT_OBJECT_HIGH_WATER_MARK = (0, import_node_stream5.getDefaultHighWaterMark)(true);
    HIGH_WATER_MARK = DEFAULT_OBJECT_HIGH_WATER_MARK;
    iterateOnData = async function* ({ onStdoutChunk, controller, binary, shouldEncode, encoding, shouldSplit, preserveNewlines }) {
      const generators = getGenerators({
        binary,
        shouldEncode,
        encoding,
        shouldSplit,
        preserveNewlines
      });
      try {
        for await (const [chunk] of onStdoutChunk) {
          yield* transformChunkSync(chunk, generators, 0);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          throw error;
        }
      } finally {
        yield* finalChunksSync(generators);
      }
    };
    getGenerators = ({ binary, shouldEncode, encoding, shouldSplit, preserveNewlines }) => [
      getEncodingTransformGenerator(binary, encoding, !shouldEncode),
      getSplitLinesGenerator(binary, preserveNewlines, !shouldSplit, {})
    ].filter(Boolean);
  }
});

// node_modules/execa/lib/io/contents.js
var import_promises9, getStreamOutput, logOutputAsync, resumeStream, getStreamContents2, getBufferedData, handleBufferedData;
var init_contents2 = __esm({
  "node_modules/execa/lib/io/contents.js"() {
    import_promises9 = require("node:timers/promises");
    init_source();
    init_uint_array();
    init_output();
    init_iterate();
    init_max_buffer();
    init_strip_newline();
    getStreamOutput = async ({ stream, onStreamEnd, fdNumber, encoding, buffer, maxBuffer, lines, allMixed, stripFinalNewline: stripFinalNewline2, verboseInfo, streamInfo }) => {
      const logPromise = logOutputAsync({
        stream,
        onStreamEnd,
        fdNumber,
        encoding,
        allMixed,
        verboseInfo,
        streamInfo
      });
      if (!buffer) {
        await Promise.all([resumeStream(stream), logPromise]);
        return;
      }
      const stripFinalNewlineValue = getStripFinalNewline(stripFinalNewline2, fdNumber);
      const iterable = iterateForResult({
        stream,
        onStreamEnd,
        lines,
        encoding,
        stripFinalNewline: stripFinalNewlineValue,
        allMixed
      });
      const [output] = await Promise.all([
        getStreamContents2({
          stream,
          iterable,
          fdNumber,
          encoding,
          maxBuffer,
          lines
        }),
        logPromise
      ]);
      return output;
    };
    logOutputAsync = async ({ stream, onStreamEnd, fdNumber, encoding, allMixed, verboseInfo, streamInfo: { fileDescriptors } }) => {
      if (!shouldLogOutput({
        stdioItems: fileDescriptors[fdNumber]?.stdioItems,
        encoding,
        verboseInfo,
        fdNumber
      })) {
        return;
      }
      const linesIterable = iterateForResult({
        stream,
        onStreamEnd,
        lines: true,
        encoding,
        stripFinalNewline: true,
        allMixed
      });
      await logLines(linesIterable, stream, fdNumber, verboseInfo);
    };
    resumeStream = async (stream) => {
      await (0, import_promises9.setImmediate)();
      if (stream.readableFlowing === null) {
        stream.resume();
      }
    };
    getStreamContents2 = async ({ stream, stream: { readableObjectMode }, iterable, fdNumber, encoding, maxBuffer, lines }) => {
      try {
        if (readableObjectMode || lines) {
          return await getStreamAsArray(iterable, { maxBuffer });
        }
        if (encoding === "buffer") {
          return new Uint8Array(await getStreamAsArrayBuffer(iterable, { maxBuffer }));
        }
        return await getStreamAsString(iterable, { maxBuffer });
      } catch (error) {
        return handleBufferedData(handleMaxBuffer({
          error,
          stream,
          readableObjectMode,
          lines,
          encoding,
          fdNumber
        }));
      }
    };
    getBufferedData = async (streamPromise) => {
      try {
        return await streamPromise;
      } catch (error) {
        return handleBufferedData(error);
      }
    };
    handleBufferedData = ({ bufferedData }) => isArrayBuffer(bufferedData) ? new Uint8Array(bufferedData) : bufferedData;
  }
});

// node_modules/execa/lib/resolve/wait-stream.js
var import_promises10, waitForStream, handleStdinDestroy, spyOnStdinDestroy, setStdinCleanedUp, handleStreamError, shouldIgnoreStreamError, isInputFileDescriptor, isStreamAbort, isStreamEpipe;
var init_wait_stream = __esm({
  "node_modules/execa/lib/resolve/wait-stream.js"() {
    import_promises10 = require("node:stream/promises");
    waitForStream = async (stream, fdNumber, streamInfo, { isSameDirection, stopOnExit = false } = {}) => {
      const state = handleStdinDestroy(stream, streamInfo);
      const abortController = new AbortController();
      try {
        await Promise.race([
          ...stopOnExit ? [streamInfo.exitPromise] : [],
          (0, import_promises10.finished)(stream, { cleanup: true, signal: abortController.signal })
        ]);
      } catch (error) {
        if (!state.stdinCleanedUp) {
          handleStreamError(error, fdNumber, streamInfo, isSameDirection);
        }
      } finally {
        abortController.abort();
      }
    };
    handleStdinDestroy = (stream, { originalStreams: [originalStdin], subprocess }) => {
      const state = { stdinCleanedUp: false };
      if (stream === originalStdin) {
        spyOnStdinDestroy(stream, subprocess, state);
      }
      return state;
    };
    spyOnStdinDestroy = (subprocessStdin, subprocess, state) => {
      const { _destroy } = subprocessStdin;
      subprocessStdin._destroy = (...destroyArguments) => {
        setStdinCleanedUp(subprocess, state);
        _destroy.call(subprocessStdin, ...destroyArguments);
      };
    };
    setStdinCleanedUp = ({ exitCode, signalCode }, state) => {
      if (exitCode !== null || signalCode !== null) {
        state.stdinCleanedUp = true;
      }
    };
    handleStreamError = (error, fdNumber, streamInfo, isSameDirection) => {
      if (!shouldIgnoreStreamError(error, fdNumber, streamInfo, isSameDirection)) {
        throw error;
      }
    };
    shouldIgnoreStreamError = (error, fdNumber, streamInfo, isSameDirection = true) => {
      if (streamInfo.propagating) {
        return isStreamEpipe(error) || isStreamAbort(error);
      }
      streamInfo.propagating = true;
      return isInputFileDescriptor(streamInfo, fdNumber) === isSameDirection ? isStreamEpipe(error) : isStreamAbort(error);
    };
    isInputFileDescriptor = ({ fileDescriptors }, fdNumber) => fdNumber !== "all" && fileDescriptors[fdNumber].direction === "input";
    isStreamAbort = (error) => error?.code === "ERR_STREAM_PREMATURE_CLOSE";
    isStreamEpipe = (error) => error?.code === "EPIPE";
  }
});

// node_modules/execa/lib/resolve/stdio.js
var waitForStdioStreams, waitForSubprocessStream;
var init_stdio = __esm({
  "node_modules/execa/lib/resolve/stdio.js"() {
    init_contents2();
    init_wait_stream();
    waitForStdioStreams = ({ subprocess, encoding, buffer, maxBuffer, lines, stripFinalNewline: stripFinalNewline2, verboseInfo, streamInfo }) => subprocess.stdio.map((stream, fdNumber) => waitForSubprocessStream({
      stream,
      fdNumber,
      encoding,
      buffer: buffer[fdNumber],
      maxBuffer: maxBuffer[fdNumber],
      lines: lines[fdNumber],
      allMixed: false,
      stripFinalNewline: stripFinalNewline2,
      verboseInfo,
      streamInfo
    }));
    waitForSubprocessStream = async ({ stream, fdNumber, encoding, buffer, maxBuffer, lines, allMixed, stripFinalNewline: stripFinalNewline2, verboseInfo, streamInfo }) => {
      if (!stream) {
        return;
      }
      const onStreamEnd = waitForStream(stream, fdNumber, streamInfo);
      if (isInputFileDescriptor(streamInfo, fdNumber)) {
        await onStreamEnd;
        return;
      }
      const [output] = await Promise.all([
        getStreamOutput({
          stream,
          onStreamEnd,
          fdNumber,
          encoding,
          buffer,
          maxBuffer,
          lines,
          allMixed,
          stripFinalNewline: stripFinalNewline2,
          verboseInfo,
          streamInfo
        }),
        onStreamEnd
      ]);
      return output;
    };
  }
});

// node_modules/execa/lib/resolve/all-async.js
var makeAllStream, waitForAllStream, getAllStream, getAllMixed;
var init_all_async = __esm({
  "node_modules/execa/lib/resolve/all-async.js"() {
    init_merge_streams();
    init_stdio();
    makeAllStream = ({ stdout, stderr }, { all }) => all && (stdout || stderr) ? mergeStreams([stdout, stderr].filter(Boolean)) : void 0;
    waitForAllStream = ({ subprocess, encoding, buffer, maxBuffer, lines, stripFinalNewline: stripFinalNewline2, verboseInfo, streamInfo }) => waitForSubprocessStream({
      ...getAllStream(subprocess, buffer),
      fdNumber: "all",
      encoding,
      maxBuffer: maxBuffer[1] + maxBuffer[2],
      lines: lines[1] || lines[2],
      allMixed: getAllMixed(subprocess),
      stripFinalNewline: stripFinalNewline2,
      verboseInfo,
      streamInfo
    });
    getAllStream = ({ stdout, stderr, all }, [, bufferStdout, bufferStderr]) => {
      const buffer = bufferStdout || bufferStderr;
      if (!buffer) {
        return { stream: all, buffer };
      }
      if (!bufferStdout) {
        return { stream: stderr, buffer };
      }
      if (!bufferStderr) {
        return { stream: stdout, buffer };
      }
      return { stream: all, buffer };
    };
    getAllMixed = ({ all, stdout, stderr }) => all && stdout && stderr && stdout.readableObjectMode !== stderr.readableObjectMode;
  }
});

// node_modules/execa/lib/verbose/ipc.js
var shouldLogIpc, logIpcOutput;
var init_ipc = __esm({
  "node_modules/execa/lib/verbose/ipc.js"() {
    init_log();
    init_values();
    shouldLogIpc = (verboseInfo) => isFullVerbose(verboseInfo, "ipc");
    logIpcOutput = (message, verboseInfo) => {
      const verboseMessage = serializeVerboseMessage(message);
      verboseLog({
        type: "ipc",
        verboseMessage,
        fdNumber: "ipc",
        verboseInfo
      });
    };
  }
});

// node_modules/execa/lib/ipc/buffer-messages.js
var waitForIpcOutput, getBufferedIpcOutput;
var init_buffer_messages = __esm({
  "node_modules/execa/lib/ipc/buffer-messages.js"() {
    init_max_buffer();
    init_ipc();
    init_specific();
    init_get_each();
    waitForIpcOutput = async ({
      subprocess,
      buffer: bufferArray,
      maxBuffer: maxBufferArray,
      ipc,
      ipcOutput,
      verboseInfo
    }) => {
      if (!ipc) {
        return ipcOutput;
      }
      const isVerbose2 = shouldLogIpc(verboseInfo);
      const buffer = getFdSpecificValue(bufferArray, "ipc");
      const maxBuffer = getFdSpecificValue(maxBufferArray, "ipc");
      for await (const message of loopOnMessages({
        anyProcess: subprocess,
        channel: subprocess.channel,
        isSubprocess: false,
        ipc,
        shouldAwait: false,
        reference: true
      })) {
        if (buffer) {
          checkIpcMaxBuffer(subprocess, ipcOutput, maxBuffer);
          ipcOutput.push(message);
        }
        if (isVerbose2) {
          logIpcOutput(message, verboseInfo);
        }
      }
      return ipcOutput;
    };
    getBufferedIpcOutput = async (ipcOutputPromise, ipcOutput) => {
      await Promise.allSettled([ipcOutputPromise]);
      return ipcOutput;
    };
  }
});

// node_modules/execa/lib/resolve/wait-subprocess.js
var import_node_events13, waitForSubprocessResult, waitForOriginalStreams, waitForCustomStreamsEnd, throwOnSubprocessError;
var init_wait_subprocess = __esm({
  "node_modules/execa/lib/resolve/wait-subprocess.js"() {
    import_node_events13 = require("node:events");
    init_is_stream();
    init_timeout();
    init_cancel();
    init_graceful2();
    init_standard_stream();
    init_type();
    init_contents2();
    init_buffer_messages();
    init_ipc_input();
    init_all_async();
    init_stdio();
    init_exit_async();
    init_wait_stream();
    waitForSubprocessResult = async ({
      subprocess,
      options: {
        encoding,
        buffer,
        maxBuffer,
        lines,
        timeoutDuration: timeout,
        cancelSignal,
        gracefulCancel,
        forceKillAfterDelay,
        stripFinalNewline: stripFinalNewline2,
        ipc,
        ipcInput
      },
      context,
      verboseInfo,
      fileDescriptors,
      originalStreams,
      onInternalError,
      controller
    }) => {
      const exitPromise = waitForExit(subprocess, context);
      const streamInfo = {
        originalStreams,
        fileDescriptors,
        subprocess,
        exitPromise,
        propagating: false
      };
      const stdioPromises = waitForStdioStreams({
        subprocess,
        encoding,
        buffer,
        maxBuffer,
        lines,
        stripFinalNewline: stripFinalNewline2,
        verboseInfo,
        streamInfo
      });
      const allPromise = waitForAllStream({
        subprocess,
        encoding,
        buffer,
        maxBuffer,
        lines,
        stripFinalNewline: stripFinalNewline2,
        verboseInfo,
        streamInfo
      });
      const ipcOutput = [];
      const ipcOutputPromise = waitForIpcOutput({
        subprocess,
        buffer,
        maxBuffer,
        ipc,
        ipcOutput,
        verboseInfo
      });
      const originalPromises = waitForOriginalStreams(originalStreams, subprocess, streamInfo);
      const customStreamsEndPromises = waitForCustomStreamsEnd(fileDescriptors, streamInfo);
      try {
        return await Promise.race([
          Promise.all([
            {},
            waitForSuccessfulExit(exitPromise),
            Promise.all(stdioPromises),
            allPromise,
            ipcOutputPromise,
            sendIpcInput(subprocess, ipcInput),
            ...originalPromises,
            ...customStreamsEndPromises
          ]),
          onInternalError,
          throwOnSubprocessError(subprocess, controller),
          ...throwOnTimeout(subprocess, timeout, context, controller),
          ...throwOnCancel({
            subprocess,
            cancelSignal,
            gracefulCancel,
            context,
            controller
          }),
          ...throwOnGracefulCancel({
            subprocess,
            cancelSignal,
            gracefulCancel,
            forceKillAfterDelay,
            context,
            controller
          })
        ]);
      } catch (error) {
        context.terminationReason ??= "other";
        return Promise.all([
          { error },
          exitPromise,
          Promise.all(stdioPromises.map((stdioPromise) => getBufferedData(stdioPromise))),
          getBufferedData(allPromise),
          getBufferedIpcOutput(ipcOutputPromise, ipcOutput),
          Promise.allSettled(originalPromises),
          Promise.allSettled(customStreamsEndPromises)
        ]);
      }
    };
    waitForOriginalStreams = (originalStreams, subprocess, streamInfo) => originalStreams.map((stream, fdNumber) => stream === subprocess.stdio[fdNumber] ? void 0 : waitForStream(stream, fdNumber, streamInfo));
    waitForCustomStreamsEnd = (fileDescriptors, streamInfo) => fileDescriptors.flatMap(({ stdioItems }, fdNumber) => stdioItems.filter(({ value, stream = value }) => isStream(stream, { checkOpen: false }) && !isStandardStream(stream)).map(({ type, value, stream = value }) => waitForStream(stream, fdNumber, streamInfo, {
      isSameDirection: TRANSFORM_TYPES.has(type),
      stopOnExit: type === "native"
    })));
    throwOnSubprocessError = async (subprocess, { signal }) => {
      const [error] = await (0, import_node_events13.once)(subprocess, "error", { signal });
      throw error;
    };
  }
});

// node_modules/execa/lib/convert/concurrent.js
var initializeConcurrentStreams, addConcurrentStream, waitForConcurrentStreams;
var init_concurrent = __esm({
  "node_modules/execa/lib/convert/concurrent.js"() {
    init_deferred();
    initializeConcurrentStreams = () => ({
      readableDestroy: /* @__PURE__ */ new WeakMap(),
      writableFinal: /* @__PURE__ */ new WeakMap(),
      writableDestroy: /* @__PURE__ */ new WeakMap()
    });
    addConcurrentStream = (concurrentStreams, stream, waitName) => {
      const weakMap = concurrentStreams[waitName];
      if (!weakMap.has(stream)) {
        weakMap.set(stream, []);
      }
      const promises = weakMap.get(stream);
      const promise = createDeferred();
      promises.push(promise);
      const resolve = promise.resolve.bind(promise);
      return { resolve, promises };
    };
    waitForConcurrentStreams = async ({ resolve, promises }, subprocess) => {
      resolve();
      const [isSubprocessExit] = await Promise.race([
        Promise.allSettled([true, subprocess]),
        Promise.all([false, ...promises])
      ]);
      return !isSubprocessExit;
    };
  }
});

// node_modules/execa/lib/convert/shared.js
var import_promises11, safeWaitForSubprocessStdin, safeWaitForSubprocessStdout, waitForSubprocessStdin, waitForSubprocessStdout, waitForSubprocess, destroyOtherStream;
var init_shared = __esm({
  "node_modules/execa/lib/convert/shared.js"() {
    import_promises11 = require("node:stream/promises");
    init_wait_stream();
    safeWaitForSubprocessStdin = async (subprocessStdin) => {
      if (subprocessStdin === void 0) {
        return;
      }
      try {
        await waitForSubprocessStdin(subprocessStdin);
      } catch {
      }
    };
    safeWaitForSubprocessStdout = async (subprocessStdout) => {
      if (subprocessStdout === void 0) {
        return;
      }
      try {
        await waitForSubprocessStdout(subprocessStdout);
      } catch {
      }
    };
    waitForSubprocessStdin = async (subprocessStdin) => {
      await (0, import_promises11.finished)(subprocessStdin, { cleanup: true, readable: false, writable: true });
    };
    waitForSubprocessStdout = async (subprocessStdout) => {
      await (0, import_promises11.finished)(subprocessStdout, { cleanup: true, readable: true, writable: false });
    };
    waitForSubprocess = async (subprocess, error) => {
      await subprocess;
      if (error) {
        throw error;
      }
    };
    destroyOtherStream = (stream, isOpen, error) => {
      if (error && !isStreamAbort(error)) {
        stream.destroy(error);
      } else if (isOpen) {
        stream.destroy();
      }
    };
  }
});

// node_modules/execa/lib/convert/readable.js
var import_node_stream6, import_node_util9, createReadable, getSubprocessStdout, getReadableOptions, getReadableMethods, onRead, onStdoutFinished, onReadableDestroy, destroyOtherReadable;
var init_readable = __esm({
  "node_modules/execa/lib/convert/readable.js"() {
    import_node_stream6 = require("node:stream");
    import_node_util9 = require("node:util");
    init_encoding_option();
    init_fd_options();
    init_iterate();
    init_deferred();
    init_concurrent();
    init_shared();
    createReadable = ({ subprocess, concurrentStreams, encoding }, { from, binary: binaryOption = true, preserveNewlines = true } = {}) => {
      const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
      const { subprocessStdout, waitReadableDestroy } = getSubprocessStdout(subprocess, from, concurrentStreams);
      const { readableEncoding, readableObjectMode, readableHighWaterMark } = getReadableOptions(subprocessStdout, binary);
      const { read, onStdoutDataDone } = getReadableMethods({
        subprocessStdout,
        subprocess,
        binary,
        encoding,
        preserveNewlines
      });
      const readable2 = new import_node_stream6.Readable({
        read,
        destroy: (0, import_node_util9.callbackify)(onReadableDestroy.bind(void 0, { subprocessStdout, subprocess, waitReadableDestroy })),
        highWaterMark: readableHighWaterMark,
        objectMode: readableObjectMode,
        encoding: readableEncoding
      });
      onStdoutFinished({
        subprocessStdout,
        onStdoutDataDone,
        readable: readable2,
        subprocess
      });
      return readable2;
    };
    getSubprocessStdout = (subprocess, from, concurrentStreams) => {
      const subprocessStdout = getFromStream(subprocess, from);
      const waitReadableDestroy = addConcurrentStream(concurrentStreams, subprocessStdout, "readableDestroy");
      return { subprocessStdout, waitReadableDestroy };
    };
    getReadableOptions = ({ readableEncoding, readableObjectMode, readableHighWaterMark }, binary) => binary ? { readableEncoding, readableObjectMode, readableHighWaterMark } : { readableEncoding, readableObjectMode: true, readableHighWaterMark: DEFAULT_OBJECT_HIGH_WATER_MARK };
    getReadableMethods = ({ subprocessStdout, subprocess, binary, encoding, preserveNewlines }) => {
      const onStdoutDataDone = createDeferred();
      const onStdoutData = iterateOnSubprocessStream({
        subprocessStdout,
        subprocess,
        binary,
        shouldEncode: !binary,
        encoding,
        preserveNewlines
      });
      return {
        read() {
          onRead(this, onStdoutData, onStdoutDataDone);
        },
        onStdoutDataDone
      };
    };
    onRead = async (readable2, onStdoutData, onStdoutDataDone) => {
      try {
        const { value, done } = await onStdoutData.next();
        if (done) {
          onStdoutDataDone.resolve();
        } else {
          readable2.push(value);
        }
      } catch {
      }
    };
    onStdoutFinished = async ({ subprocessStdout, onStdoutDataDone, readable: readable2, subprocess, subprocessStdin }) => {
      try {
        await waitForSubprocessStdout(subprocessStdout);
        await subprocess;
        await safeWaitForSubprocessStdin(subprocessStdin);
        await onStdoutDataDone;
        if (readable2.readable) {
          readable2.push(null);
        }
      } catch (error) {
        await safeWaitForSubprocessStdin(subprocessStdin);
        destroyOtherReadable(readable2, error);
      }
    };
    onReadableDestroy = async ({ subprocessStdout, subprocess, waitReadableDestroy }, error) => {
      if (await waitForConcurrentStreams(waitReadableDestroy, subprocess)) {
        destroyOtherReadable(subprocessStdout, error);
        await waitForSubprocess(subprocess, error);
      }
    };
    destroyOtherReadable = (stream, error) => {
      destroyOtherStream(stream, stream.readable, error);
    };
  }
});

// node_modules/execa/lib/convert/writable.js
var import_node_stream7, import_node_util10, createWritable, getSubprocessStdin, getWritableMethods, onWrite, onWritableFinal, onStdinFinished, onWritableDestroy, destroyOtherWritable;
var init_writable = __esm({
  "node_modules/execa/lib/convert/writable.js"() {
    import_node_stream7 = require("node:stream");
    import_node_util10 = require("node:util");
    init_fd_options();
    init_concurrent();
    init_shared();
    createWritable = ({ subprocess, concurrentStreams }, { to } = {}) => {
      const { subprocessStdin, waitWritableFinal, waitWritableDestroy } = getSubprocessStdin(subprocess, to, concurrentStreams);
      const writable2 = new import_node_stream7.Writable({
        ...getWritableMethods(subprocessStdin, subprocess, waitWritableFinal),
        destroy: (0, import_node_util10.callbackify)(onWritableDestroy.bind(void 0, {
          subprocessStdin,
          subprocess,
          waitWritableFinal,
          waitWritableDestroy
        })),
        highWaterMark: subprocessStdin.writableHighWaterMark,
        objectMode: subprocessStdin.writableObjectMode
      });
      onStdinFinished(subprocessStdin, writable2);
      return writable2;
    };
    getSubprocessStdin = (subprocess, to, concurrentStreams) => {
      const subprocessStdin = getToStream(subprocess, to);
      const waitWritableFinal = addConcurrentStream(concurrentStreams, subprocessStdin, "writableFinal");
      const waitWritableDestroy = addConcurrentStream(concurrentStreams, subprocessStdin, "writableDestroy");
      return { subprocessStdin, waitWritableFinal, waitWritableDestroy };
    };
    getWritableMethods = (subprocessStdin, subprocess, waitWritableFinal) => ({
      write: onWrite.bind(void 0, subprocessStdin),
      final: (0, import_node_util10.callbackify)(onWritableFinal.bind(void 0, subprocessStdin, subprocess, waitWritableFinal))
    });
    onWrite = (subprocessStdin, chunk, encoding, done) => {
      if (subprocessStdin.write(chunk, encoding)) {
        done();
      } else {
        subprocessStdin.once("drain", done);
      }
    };
    onWritableFinal = async (subprocessStdin, subprocess, waitWritableFinal) => {
      if (await waitForConcurrentStreams(waitWritableFinal, subprocess)) {
        if (subprocessStdin.writable) {
          subprocessStdin.end();
        }
        await subprocess;
      }
    };
    onStdinFinished = async (subprocessStdin, writable2, subprocessStdout) => {
      try {
        await waitForSubprocessStdin(subprocessStdin);
        if (writable2.writable) {
          writable2.end();
        }
      } catch (error) {
        await safeWaitForSubprocessStdout(subprocessStdout);
        destroyOtherWritable(writable2, error);
      }
    };
    onWritableDestroy = async ({ subprocessStdin, subprocess, waitWritableFinal, waitWritableDestroy }, error) => {
      await waitForConcurrentStreams(waitWritableFinal, subprocess);
      if (await waitForConcurrentStreams(waitWritableDestroy, subprocess)) {
        destroyOtherWritable(subprocessStdin, error);
        await waitForSubprocess(subprocess, error);
      }
    };
    destroyOtherWritable = (stream, error) => {
      destroyOtherStream(stream, stream.writable, error);
    };
  }
});

// node_modules/execa/lib/convert/duplex.js
var import_node_stream8, import_node_util11, createDuplex, onDuplexDestroy;
var init_duplex = __esm({
  "node_modules/execa/lib/convert/duplex.js"() {
    import_node_stream8 = require("node:stream");
    import_node_util11 = require("node:util");
    init_encoding_option();
    init_readable();
    init_writable();
    createDuplex = ({ subprocess, concurrentStreams, encoding }, { from, to, binary: binaryOption = true, preserveNewlines = true } = {}) => {
      const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
      const { subprocessStdout, waitReadableDestroy } = getSubprocessStdout(subprocess, from, concurrentStreams);
      const { subprocessStdin, waitWritableFinal, waitWritableDestroy } = getSubprocessStdin(subprocess, to, concurrentStreams);
      const { readableEncoding, readableObjectMode, readableHighWaterMark } = getReadableOptions(subprocessStdout, binary);
      const { read, onStdoutDataDone } = getReadableMethods({
        subprocessStdout,
        subprocess,
        binary,
        encoding,
        preserveNewlines
      });
      const duplex2 = new import_node_stream8.Duplex({
        read,
        ...getWritableMethods(subprocessStdin, subprocess, waitWritableFinal),
        destroy: (0, import_node_util11.callbackify)(onDuplexDestroy.bind(void 0, {
          subprocessStdout,
          subprocessStdin,
          subprocess,
          waitReadableDestroy,
          waitWritableFinal,
          waitWritableDestroy
        })),
        readableHighWaterMark,
        writableHighWaterMark: subprocessStdin.writableHighWaterMark,
        readableObjectMode,
        writableObjectMode: subprocessStdin.writableObjectMode,
        encoding: readableEncoding
      });
      onStdoutFinished({
        subprocessStdout,
        onStdoutDataDone,
        readable: duplex2,
        subprocess,
        subprocessStdin
      });
      onStdinFinished(subprocessStdin, duplex2, subprocessStdout);
      return duplex2;
    };
    onDuplexDestroy = async ({ subprocessStdout, subprocessStdin, subprocess, waitReadableDestroy, waitWritableFinal, waitWritableDestroy }, error) => {
      await Promise.all([
        onReadableDestroy({ subprocessStdout, subprocess, waitReadableDestroy }, error),
        onWritableDestroy({
          subprocessStdin,
          subprocess,
          waitWritableFinal,
          waitWritableDestroy
        }, error)
      ]);
    };
  }
});

// node_modules/execa/lib/convert/iterable.js
var createIterable, iterateOnStdoutData;
var init_iterable = __esm({
  "node_modules/execa/lib/convert/iterable.js"() {
    init_encoding_option();
    init_fd_options();
    init_iterate();
    createIterable = (subprocess, encoding, {
      from,
      binary: binaryOption = false,
      preserveNewlines = false
    } = {}) => {
      const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
      const subprocessStdout = getFromStream(subprocess, from);
      const onStdoutData = iterateOnSubprocessStream({
        subprocessStdout,
        subprocess,
        binary,
        shouldEncode: true,
        encoding,
        preserveNewlines
      });
      return iterateOnStdoutData(onStdoutData, subprocessStdout, subprocess);
    };
    iterateOnStdoutData = async function* (onStdoutData, subprocessStdout, subprocess) {
      try {
        yield* onStdoutData;
      } finally {
        if (subprocessStdout.readable) {
          subprocessStdout.destroy();
        }
        await subprocess;
      }
    };
  }
});

// node_modules/execa/lib/convert/add.js
var addConvertedStreams;
var init_add = __esm({
  "node_modules/execa/lib/convert/add.js"() {
    init_concurrent();
    init_readable();
    init_writable();
    init_duplex();
    init_iterable();
    addConvertedStreams = (subprocess, { encoding }) => {
      const concurrentStreams = initializeConcurrentStreams();
      subprocess.readable = createReadable.bind(void 0, { subprocess, concurrentStreams, encoding });
      subprocess.writable = createWritable.bind(void 0, { subprocess, concurrentStreams });
      subprocess.duplex = createDuplex.bind(void 0, { subprocess, concurrentStreams, encoding });
      subprocess.iterable = createIterable.bind(void 0, subprocess, encoding);
      subprocess[Symbol.asyncIterator] = createIterable.bind(void 0, subprocess, encoding, {});
    };
  }
});

// node_modules/execa/lib/methods/promise.js
var mergePromise, nativePromisePrototype, descriptors;
var init_promise = __esm({
  "node_modules/execa/lib/methods/promise.js"() {
    mergePromise = (subprocess, promise) => {
      for (const [property, descriptor] of descriptors) {
        const value = descriptor.value.bind(promise);
        Reflect.defineProperty(subprocess, property, { ...descriptor, value });
      }
    };
    nativePromisePrototype = (async () => {
    })().constructor.prototype;
    descriptors = ["then", "catch", "finally"].map((property) => [
      property,
      Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property)
    ]);
  }
});

// node_modules/execa/lib/methods/main-async.js
var import_node_events14, import_node_child_process5, execaCoreAsync, handleAsyncArguments, handleAsyncOptions, spawnSubprocessAsync, handlePromise, getAsyncResult;
var init_main_async = __esm({
  "node_modules/execa/lib/methods/main-async.js"() {
    import_node_events14 = require("node:events");
    import_node_child_process5 = require("node:child_process");
    init_source();
    init_command();
    init_options();
    init_fd_options();
    init_methods();
    init_result();
    init_reject();
    init_early_error();
    init_handle_async();
    init_strip_newline();
    init_output_async();
    init_kill();
    init_cleanup();
    init_setup();
    init_all_async();
    init_wait_subprocess();
    init_add();
    init_deferred();
    init_promise();
    execaCoreAsync = (rawFile, rawArguments, rawOptions, createNested) => {
      const { file, commandArguments, command, escapedCommand, startTime, verboseInfo, options, fileDescriptors } = handleAsyncArguments(rawFile, rawArguments, rawOptions);
      const { subprocess, promise } = spawnSubprocessAsync({
        file,
        commandArguments,
        options,
        startTime,
        verboseInfo,
        command,
        escapedCommand,
        fileDescriptors
      });
      subprocess.pipe = pipeToSubprocess.bind(void 0, {
        source: subprocess,
        sourcePromise: promise,
        boundOptions: {},
        createNested
      });
      mergePromise(subprocess, promise);
      SUBPROCESS_OPTIONS.set(subprocess, { options, fileDescriptors });
      return subprocess;
    };
    handleAsyncArguments = (rawFile, rawArguments, rawOptions) => {
      const { command, escapedCommand, startTime, verboseInfo } = handleCommand(rawFile, rawArguments, rawOptions);
      const { file, commandArguments, options: normalizedOptions } = normalizeOptions(rawFile, rawArguments, rawOptions);
      const options = handleAsyncOptions(normalizedOptions);
      const fileDescriptors = handleStdioAsync(options, verboseInfo);
      return {
        file,
        commandArguments,
        command,
        escapedCommand,
        startTime,
        verboseInfo,
        options,
        fileDescriptors
      };
    };
    handleAsyncOptions = ({ timeout, signal, ...options }) => {
      if (signal !== void 0) {
        throw new TypeError('The "signal" option has been renamed to "cancelSignal" instead.');
      }
      return { ...options, timeoutDuration: timeout };
    };
    spawnSubprocessAsync = ({ file, commandArguments, options, startTime, verboseInfo, command, escapedCommand, fileDescriptors }) => {
      let subprocess;
      try {
        subprocess = (0, import_node_child_process5.spawn)(file, commandArguments, options);
      } catch (error) {
        return handleEarlyError({
          error,
          command,
          escapedCommand,
          fileDescriptors,
          options,
          startTime,
          verboseInfo
        });
      }
      const controller = new AbortController();
      (0, import_node_events14.setMaxListeners)(Number.POSITIVE_INFINITY, controller.signal);
      const originalStreams = [...subprocess.stdio];
      pipeOutputAsync(subprocess, fileDescriptors, controller);
      cleanupOnExit(subprocess, options, controller);
      const context = {};
      const onInternalError = createDeferred();
      subprocess.kill = subprocessKill.bind(void 0, {
        kill: subprocess.kill.bind(subprocess),
        options,
        onInternalError,
        context,
        controller
      });
      subprocess.all = makeAllStream(subprocess, options);
      addConvertedStreams(subprocess, options);
      addIpcMethods(subprocess, options);
      const promise = handlePromise({
        subprocess,
        options,
        startTime,
        verboseInfo,
        fileDescriptors,
        originalStreams,
        command,
        escapedCommand,
        context,
        onInternalError,
        controller
      });
      return { subprocess, promise };
    };
    handlePromise = async ({ subprocess, options, startTime, verboseInfo, fileDescriptors, originalStreams, command, escapedCommand, context, onInternalError, controller }) => {
      const [
        errorInfo,
        [exitCode, signal],
        stdioResults,
        allResult,
        ipcOutput
      ] = await waitForSubprocessResult({
        subprocess,
        options,
        context,
        verboseInfo,
        fileDescriptors,
        originalStreams,
        onInternalError,
        controller
      });
      controller.abort();
      onInternalError.resolve();
      const stdio = stdioResults.map((stdioResult, fdNumber) => stripNewline(stdioResult, options, fdNumber));
      const all = stripNewline(allResult, options, "all");
      const result = getAsyncResult({
        errorInfo,
        exitCode,
        signal,
        stdio,
        all,
        ipcOutput,
        context,
        options,
        command,
        escapedCommand,
        startTime
      });
      return handleResult(result, verboseInfo, options);
    };
    getAsyncResult = ({ errorInfo, exitCode, signal, stdio, all, ipcOutput, context, options, command, escapedCommand, startTime }) => "error" in errorInfo ? makeError({
      error: errorInfo.error,
      command,
      escapedCommand,
      timedOut: context.terminationReason === "timeout",
      isCanceled: context.terminationReason === "cancel" || context.terminationReason === "gracefulCancel",
      isGracefullyCanceled: context.terminationReason === "gracefulCancel",
      isMaxBuffer: errorInfo.error instanceof MaxBufferError,
      isForcefullyTerminated: context.isForcefullyTerminated,
      exitCode,
      signal,
      stdio,
      all,
      ipcOutput,
      options,
      startTime,
      isSync: false
    }) : makeSuccessResult({
      command,
      escapedCommand,
      stdio,
      all,
      ipcOutput,
      options,
      startTime
    });
  }
});

// node_modules/execa/lib/methods/bind.js
var mergeOptions, mergeOption, DEEP_OPTIONS;
var init_bind = __esm({
  "node_modules/execa/lib/methods/bind.js"() {
    init_is_plain_obj();
    init_specific();
    mergeOptions = (boundOptions, options) => {
      const newOptions = Object.fromEntries(
        Object.entries(options).map(([optionName, optionValue]) => [
          optionName,
          mergeOption(optionName, boundOptions[optionName], optionValue)
        ])
      );
      return { ...boundOptions, ...newOptions };
    };
    mergeOption = (optionName, boundOptionValue, optionValue) => {
      if (DEEP_OPTIONS.has(optionName) && isPlainObject(boundOptionValue) && isPlainObject(optionValue)) {
        return { ...boundOptionValue, ...optionValue };
      }
      return optionValue;
    };
    DEEP_OPTIONS = /* @__PURE__ */ new Set(["env", ...FD_SPECIFIC_OPTIONS]);
  }
});

// node_modules/execa/lib/methods/create.js
var createExeca, callBoundExeca, parseArguments;
var init_create = __esm({
  "node_modules/execa/lib/methods/create.js"() {
    init_is_plain_obj();
    init_parameters();
    init_template();
    init_main_sync();
    init_main_async();
    init_bind();
    createExeca = (mapArguments, boundOptions, deepOptions, setBoundExeca) => {
      const createNested = (mapArguments2, boundOptions2, setBoundExeca2) => createExeca(mapArguments2, boundOptions2, deepOptions, setBoundExeca2);
      const boundExeca = (...execaArguments) => callBoundExeca({
        mapArguments,
        deepOptions,
        boundOptions,
        setBoundExeca,
        createNested
      }, ...execaArguments);
      if (setBoundExeca !== void 0) {
        setBoundExeca(boundExeca, createNested, boundOptions);
      }
      return boundExeca;
    };
    callBoundExeca = ({ mapArguments, deepOptions = {}, boundOptions = {}, setBoundExeca, createNested }, firstArgument, ...nextArguments) => {
      if (isPlainObject(firstArgument)) {
        return createNested(mapArguments, mergeOptions(boundOptions, firstArgument), setBoundExeca);
      }
      const { file, commandArguments, options, isSync } = parseArguments({
        mapArguments,
        firstArgument,
        nextArguments,
        deepOptions,
        boundOptions
      });
      return isSync ? execaCoreSync(file, commandArguments, options) : execaCoreAsync(file, commandArguments, options, createNested);
    };
    parseArguments = ({ mapArguments, firstArgument, nextArguments, deepOptions, boundOptions }) => {
      const callArguments = isTemplateString(firstArgument) ? parseTemplates(firstArgument, nextArguments) : [firstArgument, ...nextArguments];
      const [initialFile, initialArguments, initialOptions] = normalizeParameters(...callArguments);
      const mergedOptions = mergeOptions(mergeOptions(deepOptions, boundOptions), initialOptions);
      const {
        file = initialFile,
        commandArguments = initialArguments,
        options = mergedOptions,
        isSync = false
      } = mapArguments({ file: initialFile, commandArguments: initialArguments, options: mergedOptions });
      return {
        file,
        commandArguments,
        options,
        isSync
      };
    };
  }
});

// node_modules/execa/lib/methods/command.js
var mapCommandAsync, mapCommandSync, parseCommand, parseCommandString, SPACES_REGEXP;
var init_command2 = __esm({
  "node_modules/execa/lib/methods/command.js"() {
    mapCommandAsync = ({ file, commandArguments }) => parseCommand(file, commandArguments);
    mapCommandSync = ({ file, commandArguments }) => ({ ...parseCommand(file, commandArguments), isSync: true });
    parseCommand = (command, unusedArguments) => {
      if (unusedArguments.length > 0) {
        throw new TypeError(`The command and its arguments must be passed as a single string: ${command} ${unusedArguments}.`);
      }
      const [file, ...commandArguments] = parseCommandString(command);
      return { file, commandArguments };
    };
    parseCommandString = (command) => {
      if (typeof command !== "string") {
        throw new TypeError(`The command must be a string: ${String(command)}.`);
      }
      const trimmedCommand = command.trim();
      if (trimmedCommand === "") {
        return [];
      }
      const tokens = [];
      for (const token of trimmedCommand.split(SPACES_REGEXP)) {
        const previousToken = tokens.at(-1);
        if (previousToken && previousToken.endsWith("\\")) {
          tokens[tokens.length - 1] = `${previousToken.slice(0, -1)} ${token}`;
        } else {
          tokens.push(token);
        }
      }
      return tokens;
    };
    SPACES_REGEXP = / +/g;
  }
});

// node_modules/execa/lib/methods/script.js
var setScriptSync, mapScriptAsync, mapScriptSync, getScriptOptions, getScriptStdinOption, deepScriptOptions;
var init_script = __esm({
  "node_modules/execa/lib/methods/script.js"() {
    setScriptSync = (boundExeca, createNested, boundOptions) => {
      boundExeca.sync = createNested(mapScriptSync, boundOptions);
      boundExeca.s = boundExeca.sync;
    };
    mapScriptAsync = ({ options }) => getScriptOptions(options);
    mapScriptSync = ({ options }) => ({ ...getScriptOptions(options), isSync: true });
    getScriptOptions = (options) => ({ options: { ...getScriptStdinOption(options), ...options } });
    getScriptStdinOption = ({ input, inputFile, stdio }) => input === void 0 && inputFile === void 0 && stdio === void 0 ? { stdin: "inherit" } : {};
    deepScriptOptions = { preferLocal: true };
  }
});

// node_modules/execa/index.js
var execa_exports = {};
__export(execa_exports, {
  $: () => $,
  ExecaError: () => ExecaError,
  ExecaSyncError: () => ExecaSyncError,
  execa: () => execa,
  execaCommand: () => execaCommand,
  execaCommandSync: () => execaCommandSync,
  execaNode: () => execaNode,
  execaSync: () => execaSync,
  getCancelSignal: () => getCancelSignal2,
  getEachMessage: () => getEachMessage2,
  getOneMessage: () => getOneMessage2,
  parseCommandString: () => parseCommandString,
  sendMessage: () => sendMessage2
});
var execa, execaSync, execaCommand, execaCommandSync, execaNode, $, sendMessage2, getOneMessage2, getEachMessage2, getCancelSignal2;
var init_execa = __esm({
  "node_modules/execa/index.js"() {
    init_create();
    init_command2();
    init_node2();
    init_script();
    init_methods();
    init_command2();
    init_final_error();
    execa = createExeca(() => ({}));
    execaSync = createExeca(() => ({ isSync: true }));
    execaCommand = createExeca(mapCommandAsync);
    execaCommandSync = createExeca(mapCommandSync);
    execaNode = createExeca(mapNode);
    $ = createExeca(mapScriptAsync, {}, deepScriptOptions, setScriptSync);
    ({
      sendMessage: sendMessage2,
      getOneMessage: getOneMessage2,
      getEachMessage: getEachMessage2,
      getCancelSignal: getCancelSignal2
    } = getIpcExport());
  }
});

// src/encode-decode.tsx
var encode_decode_exports = {};
__export(encode_decode_exports, {
  default: () => encode_decode_default
});
module.exports = __toCommonJS(encode_decode_exports);
var import_api2 = require("@raycast/api");
var import_react2 = require("react");

// src/utils/encoder.ts
var import_fs = require("fs");
var import_node_path6 = __toESM(require("node:path"));
var import_node_crypto = __toESM(require("node:crypto"));
var import_api = require("@raycast/api");
var import_react = require("react");

// src/utils/file.ts
async function getFileInfo(file) {
  const { execa: execa2 } = await Promise.resolve().then(() => (init_execa(), execa_exports));
  const data = {};
  let process10;
  process10 = await execa2`/usr/bin/file -b ${file} --mime-type`;
  data.mime = process10.stdout;
  process10 = await execa2`/usr/bin/file -b ${file} --extension`;
  data.extension = process10.stdout;
  return data;
}
function getDataUri(base64, info) {
  return `data:${info?.mime};base64,${base64}`;
}

// src/utils/encoder.ts
var tmp = import_node_path6.default.join(import_api.environment.supportPath, "encoder");
import_fs.promises.mkdir(tmp, { recursive: true });
function useEncoder() {
  (0, import_react.useEffect)(() => {
    return () => {
      async function housekeeping() {
        (await import_fs.promises.readdir(tmp)).forEach((file) => import_fs.promises.rm(import_node_path6.default.join(tmp, file)));
      }
      housekeeping();
    };
  }, []);
  async function encode(type, data) {
    if (type === "text") return { text: Buffer.from(data).toString("base64") };
    const file = await import_fs.promises.readFile(data);
    const text = file.toString("base64");
    return { text, data: getDataUri(text, await getFileInfo(data)) };
  }
  async function decode(type, data) {
    const result = type === "text" ? Buffer.from(data.replace(/^data:.*;base64,/, ""), "base64") : Buffer.from(await import_fs.promises.readFile(data, "utf8"), "base64");
    const file = import_node_path6.default.join(tmp, import_node_crypto.default.randomUUID());
    await import_fs.promises.writeFile(file, result);
    const info = await getFileInfo(file);
    if (info.mime === "image/svg+xml") info.extension = "svg";
    if (info.extension !== "???") {
      await import_fs.promises.rename(file, `${file}.${info.extension}`);
      return {
        text: `${info.mime}`,
        file: `${file}.${info.extension}`,
        data: getDataUri(Buffer.from(result.buffer).toString("base64"), info)
      };
    }
    await import_fs.promises.rm(file);
    return { text: result.toString() };
  }
  return { encode, decode };
}
var encoder_default = useEncoder;

// src/utils/truncate.ts
function truncateText(text, length = 1e3, suffix = "<...>") {
  if (text.length > length) return `${text.substring(0, length)} ${suffix}`;
  return text;
}
var truncate_default = truncateText;

// src/encode-decode.tsx
function Command() {
  const [source, setSource] = (0, import_react2.useState)("text");
  const { encode, decode } = encoder_default();
  const { push } = (0, import_api2.useNavigation)();
  async function handleEncodeDecode(values) {
    const { op, type, input } = values;
    const data = type === "file" ? input[0] : input;
    const result = op === "encode" ? await encode(type, data) : await decode(type, data);
    let preview = `\`\`\`
${truncate_default(result.text)}
\`\`\``;
    if (result.file && result.text.match(/^image\//)) preview = `![](${result.data})`;
    push(
      /* @__PURE__ */ _jsx(
        import_api2.Detail,
        {
          markdown: preview,
          actions: /* @__PURE__ */ _jsx(import_api2.ActionPanel, null, /* @__PURE__ */ _jsx(import_api2.Action.CopyToClipboard, { content: result.file ? { file: result.file } : result.text }), result.data && /* @__PURE__ */ _jsx(import_api2.Action.CopyToClipboard, { title: "Copy Data to Clipboard", content: result.data }))
        }
      )
    );
  }
  return /* @__PURE__ */ _jsx(
    import_api2.Form,
    {
      actions: /* @__PURE__ */ _jsx(import_api2.ActionPanel, null, /* @__PURE__ */ _jsx(import_api2.Action.SubmitForm, { title: "Submit", onSubmit: handleEncodeDecode }))
    },
    /* @__PURE__ */ _jsx(import_api2.Form.Dropdown, { id: "op" }, /* @__PURE__ */ _jsx(import_api2.Form.Dropdown.Item, { value: "encode", title: "Encode" }), /* @__PURE__ */ _jsx(import_api2.Form.Dropdown.Item, { value: "decode", title: "Decode" })),
    /* @__PURE__ */ _jsx(import_api2.Form.Dropdown, { id: "type", onChange: setSource }, /* @__PURE__ */ _jsx(import_api2.Form.Dropdown.Item, { value: "text", title: "Plain Text" }), /* @__PURE__ */ _jsx(import_api2.Form.Dropdown.Item, { value: "file", title: "File" })),
    source === "text" && /* @__PURE__ */ _jsx(import_api2.Form.TextArea, { id: "input" }),
    source === "file" && /* @__PURE__ */ _jsx(import_api2.Form.FilePicker, { id: "input", title: "", allowMultipleSelection: false })
  );
}
var encode_decode_default = Command;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL2lzLXBsYWluLW9iai9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2FyZ3VtZW50cy9maWxlLXVybC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL21ldGhvZHMvcGFyYW1ldGVycy5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3V0aWxzL3VpbnQtYXJyYXkuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9tZXRob2RzL3RlbXBsYXRlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvdXRpbHMvc3RhbmRhcmQtc3RyZWFtLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvYXJndW1lbnRzL3NwZWNpZmljLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvdmVyYm9zZS92YWx1ZXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9hcmd1bWVudHMvZXNjYXBlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9pcy11bmljb2RlLXN1cHBvcnRlZC9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZmlndXJlcy9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMveW9jdG9jb2xvcnMvYmFzZS5qcyIsICIuLi9ub2RlX21vZHVsZXMveW9jdG9jb2xvcnMvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi92ZXJib3NlL2RlZmF1bHQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi92ZXJib3NlL2N1c3RvbS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3ZlcmJvc2UvbG9nLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvdmVyYm9zZS9zdGFydC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3ZlcmJvc2UvaW5mby5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3JldHVybi9kdXJhdGlvbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2FyZ3VtZW50cy9jb21tYW5kLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9pc2V4ZS93aW5kb3dzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9pc2V4ZS9tb2RlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9pc2V4ZS9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvd2hpY2gvd2hpY2guanMiLCAiLi4vbm9kZV9tb2R1bGVzL3BhdGgta2V5L2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jcm9zcy1zcGF3bi9saWIvdXRpbC9yZXNvbHZlQ29tbWFuZC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY3Jvc3Mtc3Bhd24vbGliL3V0aWwvZXNjYXBlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zaGViYW5nLXJlZ2V4L2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zaGViYW5nLWNvbW1hbmQvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Nyb3NzLXNwYXduL2xpYi91dGlsL3JlYWRTaGViYW5nLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jcm9zcy1zcGF3bi9saWIvcGFyc2UuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Nyb3NzLXNwYXduL2xpYi9lbm9lbnQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Nyb3NzLXNwYXduL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9ucG0tcnVuLXBhdGgvbm9kZV9tb2R1bGVzL3BhdGgta2V5L2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy91bmljb3JuLW1hZ2ljL2RlZmF1bHQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3VuaWNvcm4tbWFnaWMvbm9kZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvbnBtLXJ1bi1wYXRoL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvcmV0dXJuL2ZpbmFsLWVycm9yLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9odW1hbi1zaWduYWxzL2J1aWxkL3NyYy9yZWFsdGltZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvaHVtYW4tc2lnbmFscy9idWlsZC9zcmMvY29yZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvaHVtYW4tc2lnbmFscy9idWlsZC9zcmMvc2lnbmFscy5qcyIsICIuLi9ub2RlX21vZHVsZXMvaHVtYW4tc2lnbmFscy9idWlsZC9zcmMvbWFpbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3Rlcm1pbmF0ZS9zaWduYWwuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi90ZXJtaW5hdGUva2lsbC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3V0aWxzL2Fib3J0LXNpZ25hbC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3Rlcm1pbmF0ZS9jYW5jZWwuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9pcGMvdmFsaWRhdGlvbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3V0aWxzL2RlZmVycmVkLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvYXJndW1lbnRzL2ZkLW9wdGlvbnMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi91dGlscy9tYXgtbGlzdGVuZXJzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvaXBjL3JlZmVyZW5jZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2lwYy9pbmNvbWluZy5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2lwYy9mb3J3YXJkLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvaXBjL3N0cmljdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2lwYy9vdXRnb2luZy5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2lwYy9zZW5kLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvaXBjL2dyYWNlZnVsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvdGVybWluYXRlL2dyYWNlZnVsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvdGVybWluYXRlL3RpbWVvdXQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9tZXRob2RzL25vZGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9pcGMvaXBjLWlucHV0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvYXJndW1lbnRzL2VuY29kaW5nLW9wdGlvbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2FyZ3VtZW50cy9jd2QuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9hcmd1bWVudHMvb3B0aW9ucy5qcyIsICIuLi9ub2RlX21vZHVsZXMvc3RyaXAtZmluYWwtbmV3bGluZS9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvaXMtc3RyZWFtL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac2VjLWFudC9yZWFkYWJsZS1zdHJlYW0vZGlzdC9wb255ZmlsbC9hc3luY0l0ZXJhdG9yLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac2VjLWFudC9yZWFkYWJsZS1zdHJlYW0vZGlzdC9wb255ZmlsbC9mcm9tQW55SXRlcmFibGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzZWMtYW50L3JlYWRhYmxlLXN0cmVhbS9kaXN0L3BvbnlmaWxsL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9nZXQtc3RyZWFtL3NvdXJjZS9zdHJlYW0uanMiLCAiLi4vbm9kZV9tb2R1bGVzL2dldC1zdHJlYW0vc291cmNlL2NvbnRlbnRzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9nZXQtc3RyZWFtL3NvdXJjZS91dGlscy5qcyIsICIuLi9ub2RlX21vZHVsZXMvZ2V0LXN0cmVhbS9zb3VyY2UvYXJyYXkuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2dldC1zdHJlYW0vc291cmNlL2FycmF5LWJ1ZmZlci5qcyIsICIuLi9ub2RlX21vZHVsZXMvZ2V0LXN0cmVhbS9zb3VyY2Uvc3RyaW5nLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9nZXQtc3RyZWFtL3NvdXJjZS9leHBvcnRzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9nZXQtc3RyZWFtL3NvdXJjZS9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2lvL21heC1idWZmZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9yZXR1cm4vbWVzc2FnZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3JldHVybi9yZXN1bHQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3BhcnNlLW1zL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wcmV0dHktbXMvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi92ZXJib3NlL2Vycm9yLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvdmVyYm9zZS9jb21wbGV0ZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3JldHVybi9yZWplY3QuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9zdGRpby90eXBlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvdHJhbnNmb3JtL29iamVjdC1tb2RlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvdHJhbnNmb3JtL25vcm1hbGl6ZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3N0ZGlvL2RpcmVjdGlvbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2lwYy9hcnJheS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3N0ZGlvL3N0ZGlvLW9wdGlvbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3N0ZGlvL25hdGl2ZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3N0ZGlvL2lucHV0LW9wdGlvbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3N0ZGlvL2R1cGxpY2F0ZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3N0ZGlvL2hhbmRsZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3N0ZGlvL2hhbmRsZS1zeW5jLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvaW8vc3RyaXAtbmV3bGluZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3RyYW5zZm9ybS9zcGxpdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3RyYW5zZm9ybS92YWxpZGF0ZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3RyYW5zZm9ybS9lbmNvZGluZy10cmFuc2Zvcm0uanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi90cmFuc2Zvcm0vcnVuLWFzeW5jLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvdHJhbnNmb3JtL3J1bi1zeW5jLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvdHJhbnNmb3JtL2dlbmVyYXRvci5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2lvL2lucHV0LXN5bmMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi92ZXJib3NlL291dHB1dC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2lvL291dHB1dC1zeW5jLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvcmVzb2x2ZS9hbGwtc3luYy5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3Jlc29sdmUvZXhpdC1hc3luYy5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3Jlc29sdmUvZXhpdC1zeW5jLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvbWV0aG9kcy9tYWluLXN5bmMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9pcGMvZ2V0LW9uZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2lwYy9nZXQtZWFjaC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2lwYy9tZXRob2RzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvcmV0dXJuL2Vhcmx5LWVycm9yLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvc3RkaW8vaGFuZGxlLWFzeW5jLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac2luZHJlc29yaHVzL21lcmdlLXN0cmVhbXMvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9pby9waXBlbGluZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2lvL291dHB1dC1hc3luYy5qcyIsICIuLi9ub2RlX21vZHVsZXMvc2lnbmFsLWV4aXQvc3JjL3NpZ25hbHMudHMiLCAiLi4vbm9kZV9tb2R1bGVzL3NpZ25hbC1leGl0L3NyYy9pbmRleC50cyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3Rlcm1pbmF0ZS9jbGVhbnVwLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvcGlwZS9waXBlLWFyZ3VtZW50cy5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3BpcGUvdGhyb3cuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9waXBlL3NlcXVlbmNlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvcGlwZS9zdHJlYW1pbmcuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9waXBlL2Fib3J0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvcGlwZS9zZXR1cC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2lvL2l0ZXJhdGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9pby9jb250ZW50cy5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3Jlc29sdmUvd2FpdC1zdHJlYW0uanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9yZXNvbHZlL3N0ZGlvLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvcmVzb2x2ZS9hbGwtYXN5bmMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi92ZXJib3NlL2lwYy5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2lwYy9idWZmZXItbWVzc2FnZXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9yZXNvbHZlL3dhaXQtc3VicHJvY2Vzcy5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2NvbnZlcnQvY29uY3VycmVudC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2NvbnZlcnQvc2hhcmVkLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvY29udmVydC9yZWFkYWJsZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2NvbnZlcnQvd3JpdGFibGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9jb252ZXJ0L2R1cGxleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2NvbnZlcnQvaXRlcmFibGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9jb252ZXJ0L2FkZC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL21ldGhvZHMvcHJvbWlzZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL21ldGhvZHMvbWFpbi1hc3luYy5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL21ldGhvZHMvYmluZC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXhlY2EvbGliL21ldGhvZHMvY3JlYXRlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvbWV0aG9kcy9jb21tYW5kLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9leGVjYS9saWIvbWV0aG9kcy9zY3JpcHQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2V4ZWNhL2luZGV4LmpzIiwgIi4uL3NyYy9lbmNvZGUtZGVjb2RlLnRzeCIsICIuLi9zcmMvdXRpbHMvZW5jb2Rlci50cyIsICIuLi9zcmMvdXRpbHMvZmlsZS50cyIsICIuLi9zcmMvdXRpbHMvdHJ1bmNhdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcblx0aWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcgfHwgdmFsdWUgPT09IG51bGwpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRjb25zdCBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpO1xuXHRyZXR1cm4gKHByb3RvdHlwZSA9PT0gbnVsbCB8fCBwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGUgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvdHlwZSkgPT09IG51bGwpICYmICEoU3ltYm9sLnRvU3RyaW5nVGFnIGluIHZhbHVlKSAmJiAhKFN5bWJvbC5pdGVyYXRvciBpbiB2YWx1ZSk7XG59XG4iLCAiaW1wb3J0IHtmaWxlVVJMVG9QYXRofSBmcm9tICdub2RlOnVybCc7XG5cbi8vIEFsbG93IHNvbWUgYXJndW1lbnRzL29wdGlvbnMgdG8gYmUgZWl0aGVyIGEgZmlsZSBwYXRoIHN0cmluZyBvciBhIGZpbGUgVVJMXG5leHBvcnQgY29uc3Qgc2FmZU5vcm1hbGl6ZUZpbGVVcmwgPSAoZmlsZSwgbmFtZSkgPT4ge1xuXHRjb25zdCBmaWxlU3RyaW5nID0gbm9ybWFsaXplRmlsZVVybChub3JtYWxpemVEZW5vRXhlY1BhdGgoZmlsZSkpO1xuXG5cdGlmICh0eXBlb2YgZmlsZVN0cmluZyAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGAke25hbWV9IG11c3QgYmUgYSBzdHJpbmcgb3IgYSBmaWxlIFVSTDogJHtmaWxlU3RyaW5nfS5gKTtcblx0fVxuXG5cdHJldHVybiBmaWxlU3RyaW5nO1xufTtcblxuLy8gSW4gRGVubyBub2RlOnByb2Nlc3MgZXhlY1BhdGggaXMgYSBzcGVjaWFsIG9iamVjdCwgbm90IGp1c3QgYSBzdHJpbmc6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZGVub2xhbmQvZGVuby9ibG9iL2Y0NjAxODhlNTgzZjAwMTQ0MDAwYWEwZDhhZGUwODIxOGQ0N2MzYzEvZXh0L25vZGUvcG9seWZpbGxzL3Byb2Nlc3MudHMjTDM0NFxuY29uc3Qgbm9ybWFsaXplRGVub0V4ZWNQYXRoID0gZmlsZSA9PiBpc0Rlbm9FeGVjUGF0aChmaWxlKVxuXHQ/IGZpbGUudG9TdHJpbmcoKVxuXHQ6IGZpbGU7XG5cbmV4cG9ydCBjb25zdCBpc0Rlbm9FeGVjUGF0aCA9IGZpbGUgPT4gdHlwZW9mIGZpbGUgIT09ICdzdHJpbmcnXG5cdCYmIGZpbGVcblx0JiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGZpbGUpID09PSBTdHJpbmcucHJvdG90eXBlO1xuXG4vLyBTYW1lIGJ1dCBhbHNvIGFsbG93cyBvdGhlciB2YWx1ZXMsIGUuZy4gYGJvb2xlYW5gIGZvciB0aGUgYHNoZWxsYCBvcHRpb25cbmV4cG9ydCBjb25zdCBub3JtYWxpemVGaWxlVXJsID0gZmlsZSA9PiBmaWxlIGluc3RhbmNlb2YgVVJMID8gZmlsZVVSTFRvUGF0aChmaWxlKSA6IGZpbGU7XG4iLCAiaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnaXMtcGxhaW4tb2JqJztcbmltcG9ydCB7c2FmZU5vcm1hbGl6ZUZpbGVVcmx9IGZyb20gJy4uL2FyZ3VtZW50cy9maWxlLXVybC5qcyc7XG5cbi8vIFRoZSBjb21tYW5kIGBhcmd1bWVudHNgIGFuZCBgb3B0aW9uc2AgYXJlIGJvdGggb3B0aW9uYWwuXG4vLyBUaGlzIGFsc28gZG9lcyBiYXNpYyB2YWxpZGF0aW9uIG9uIHRoZW0gYW5kIG9uIHRoZSBjb21tYW5kIGZpbGUuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplUGFyYW1ldGVycyA9IChyYXdGaWxlLCByYXdBcmd1bWVudHMgPSBbXSwgcmF3T3B0aW9ucyA9IHt9KSA9PiB7XG5cdGNvbnN0IGZpbGVQYXRoID0gc2FmZU5vcm1hbGl6ZUZpbGVVcmwocmF3RmlsZSwgJ0ZpcnN0IGFyZ3VtZW50Jyk7XG5cdGNvbnN0IFtjb21tYW5kQXJndW1lbnRzLCBvcHRpb25zXSA9IGlzUGxhaW5PYmplY3QocmF3QXJndW1lbnRzKVxuXHRcdD8gW1tdLCByYXdBcmd1bWVudHNdXG5cdFx0OiBbcmF3QXJndW1lbnRzLCByYXdPcHRpb25zXTtcblxuXHRpZiAoIUFycmF5LmlzQXJyYXkoY29tbWFuZEFyZ3VtZW50cykpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBTZWNvbmQgYXJndW1lbnQgbXVzdCBiZSBlaXRoZXIgYW4gYXJyYXkgb2YgYXJndW1lbnRzIG9yIGFuIG9wdGlvbnMgb2JqZWN0OiAke2NvbW1hbmRBcmd1bWVudHN9YCk7XG5cdH1cblxuXHRpZiAoY29tbWFuZEFyZ3VtZW50cy5zb21lKGNvbW1hbmRBcmd1bWVudCA9PiB0eXBlb2YgY29tbWFuZEFyZ3VtZW50ID09PSAnb2JqZWN0JyAmJiBjb21tYW5kQXJndW1lbnQgIT09IG51bGwpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgU2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYW4gYXJyYXkgb2Ygc3RyaW5nczogJHtjb21tYW5kQXJndW1lbnRzfWApO1xuXHR9XG5cblx0Y29uc3Qgbm9ybWFsaXplZEFyZ3VtZW50cyA9IGNvbW1hbmRBcmd1bWVudHMubWFwKFN0cmluZyk7XG5cdGNvbnN0IG51bGxCeXRlQXJndW1lbnQgPSBub3JtYWxpemVkQXJndW1lbnRzLmZpbmQobm9ybWFsaXplZEFyZ3VtZW50ID0+IG5vcm1hbGl6ZWRBcmd1bWVudC5pbmNsdWRlcygnXFwwJykpO1xuXHRpZiAobnVsbEJ5dGVBcmd1bWVudCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgQXJndW1lbnRzIGNhbm5vdCBjb250YWluIG51bGwgYnl0ZXMgKFwiXFxcXDBcIik6ICR7bnVsbEJ5dGVBcmd1bWVudH1gKTtcblx0fVxuXG5cdGlmICghaXNQbGFpbk9iamVjdChvcHRpb25zKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYExhc3QgYXJndW1lbnQgbXVzdCBiZSBhbiBvcHRpb25zIG9iamVjdDogJHtvcHRpb25zfWApO1xuXHR9XG5cblx0cmV0dXJuIFtmaWxlUGF0aCwgbm9ybWFsaXplZEFyZ3VtZW50cywgb3B0aW9uc107XG59O1xuIiwgImltcG9ydCB7U3RyaW5nRGVjb2Rlcn0gZnJvbSAnbm9kZTpzdHJpbmdfZGVjb2Rlcic7XG5cbmNvbnN0IHt0b1N0cmluZzogb2JqZWN0VG9TdHJpbmd9ID0gT2JqZWN0LnByb3RvdHlwZTtcblxuZXhwb3J0IGNvbnN0IGlzQXJyYXlCdWZmZXIgPSB2YWx1ZSA9PiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcblxuLy8gSXMgZWl0aGVyIFVpbnQ4QXJyYXkgb3IgQnVmZmVyXG5leHBvcnQgY29uc3QgaXNVaW50OEFycmF5ID0gdmFsdWUgPT4gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IFVpbnQ4QXJyYXldJztcblxuZXhwb3J0IGNvbnN0IGJ1ZmZlclRvVWludDhBcnJheSA9IGJ1ZmZlciA9PiBuZXcgVWludDhBcnJheShidWZmZXIuYnVmZmVyLCBidWZmZXIuYnl0ZU9mZnNldCwgYnVmZmVyLmJ5dGVMZW5ndGgpO1xuXG5jb25zdCB0ZXh0RW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpO1xuY29uc3Qgc3RyaW5nVG9VaW50OEFycmF5ID0gc3RyaW5nID0+IHRleHRFbmNvZGVyLmVuY29kZShzdHJpbmcpO1xuXG5jb25zdCB0ZXh0RGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpO1xuZXhwb3J0IGNvbnN0IHVpbnQ4QXJyYXlUb1N0cmluZyA9IHVpbnQ4QXJyYXkgPT4gdGV4dERlY29kZXIuZGVjb2RlKHVpbnQ4QXJyYXkpO1xuXG5leHBvcnQgY29uc3Qgam9pblRvU3RyaW5nID0gKHVpbnQ4QXJyYXlzT3JTdHJpbmdzLCBlbmNvZGluZykgPT4ge1xuXHRjb25zdCBzdHJpbmdzID0gdWludDhBcnJheXNUb1N0cmluZ3ModWludDhBcnJheXNPclN0cmluZ3MsIGVuY29kaW5nKTtcblx0cmV0dXJuIHN0cmluZ3Muam9pbignJyk7XG59O1xuXG5jb25zdCB1aW50OEFycmF5c1RvU3RyaW5ncyA9ICh1aW50OEFycmF5c09yU3RyaW5ncywgZW5jb2RpbmcpID0+IHtcblx0aWYgKGVuY29kaW5nID09PSAndXRmOCcgJiYgdWludDhBcnJheXNPclN0cmluZ3MuZXZlcnkodWludDhBcnJheU9yU3RyaW5nID0+IHR5cGVvZiB1aW50OEFycmF5T3JTdHJpbmcgPT09ICdzdHJpbmcnKSkge1xuXHRcdHJldHVybiB1aW50OEFycmF5c09yU3RyaW5ncztcblx0fVxuXG5cdGNvbnN0IGRlY29kZXIgPSBuZXcgU3RyaW5nRGVjb2RlcihlbmNvZGluZyk7XG5cdGNvbnN0IHN0cmluZ3MgPSB1aW50OEFycmF5c09yU3RyaW5nc1xuXHRcdC5tYXAodWludDhBcnJheU9yU3RyaW5nID0+IHR5cGVvZiB1aW50OEFycmF5T3JTdHJpbmcgPT09ICdzdHJpbmcnXG5cdFx0XHQ/IHN0cmluZ1RvVWludDhBcnJheSh1aW50OEFycmF5T3JTdHJpbmcpXG5cdFx0XHQ6IHVpbnQ4QXJyYXlPclN0cmluZylcblx0XHQubWFwKHVpbnQ4QXJyYXkgPT4gZGVjb2Rlci53cml0ZSh1aW50OEFycmF5KSk7XG5cdGNvbnN0IGZpbmFsU3RyaW5nID0gZGVjb2Rlci5lbmQoKTtcblx0cmV0dXJuIGZpbmFsU3RyaW5nID09PSAnJyA/IHN0cmluZ3MgOiBbLi4uc3RyaW5ncywgZmluYWxTdHJpbmddO1xufTtcblxuZXhwb3J0IGNvbnN0IGpvaW5Ub1VpbnQ4QXJyYXkgPSB1aW50OEFycmF5c09yU3RyaW5ncyA9PiB7XG5cdGlmICh1aW50OEFycmF5c09yU3RyaW5ncy5sZW5ndGggPT09IDEgJiYgaXNVaW50OEFycmF5KHVpbnQ4QXJyYXlzT3JTdHJpbmdzWzBdKSkge1xuXHRcdHJldHVybiB1aW50OEFycmF5c09yU3RyaW5nc1swXTtcblx0fVxuXG5cdHJldHVybiBjb25jYXRVaW50OEFycmF5cyhzdHJpbmdzVG9VaW50OEFycmF5cyh1aW50OEFycmF5c09yU3RyaW5ncykpO1xufTtcblxuY29uc3Qgc3RyaW5nc1RvVWludDhBcnJheXMgPSB1aW50OEFycmF5c09yU3RyaW5ncyA9PiB1aW50OEFycmF5c09yU3RyaW5ncy5tYXAodWludDhBcnJheU9yU3RyaW5nID0+IHR5cGVvZiB1aW50OEFycmF5T3JTdHJpbmcgPT09ICdzdHJpbmcnXG5cdD8gc3RyaW5nVG9VaW50OEFycmF5KHVpbnQ4QXJyYXlPclN0cmluZylcblx0OiB1aW50OEFycmF5T3JTdHJpbmcpO1xuXG5leHBvcnQgY29uc3QgY29uY2F0VWludDhBcnJheXMgPSB1aW50OEFycmF5cyA9PiB7XG5cdGNvbnN0IHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KGdldEpvaW5MZW5ndGgodWludDhBcnJheXMpKTtcblxuXHRsZXQgaW5kZXggPSAwO1xuXHRmb3IgKGNvbnN0IHVpbnQ4QXJyYXkgb2YgdWludDhBcnJheXMpIHtcblx0XHRyZXN1bHQuc2V0KHVpbnQ4QXJyYXksIGluZGV4KTtcblx0XHRpbmRleCArPSB1aW50OEFycmF5Lmxlbmd0aDtcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuXG5jb25zdCBnZXRKb2luTGVuZ3RoID0gdWludDhBcnJheXMgPT4ge1xuXHRsZXQgam9pbkxlbmd0aCA9IDA7XG5cdGZvciAoY29uc3QgdWludDhBcnJheSBvZiB1aW50OEFycmF5cykge1xuXHRcdGpvaW5MZW5ndGggKz0gdWludDhBcnJheS5sZW5ndGg7XG5cdH1cblxuXHRyZXR1cm4gam9pbkxlbmd0aDtcbn07XG4iLCAiaW1wb3J0IHtDaGlsZFByb2Nlc3N9IGZyb20gJ25vZGU6Y2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICdpcy1wbGFpbi1vYmonO1xuaW1wb3J0IHtpc1VpbnQ4QXJyYXksIHVpbnQ4QXJyYXlUb1N0cmluZ30gZnJvbSAnLi4vdXRpbHMvdWludC1hcnJheS5qcyc7XG5cbi8vIENoZWNrIHdoZXRoZXIgdGhlIHRlbXBsYXRlIHN0cmluZyBzeW50YXggaXMgYmVpbmcgdXNlZFxuZXhwb3J0IGNvbnN0IGlzVGVtcGxhdGVTdHJpbmcgPSB0ZW1wbGF0ZXMgPT4gQXJyYXkuaXNBcnJheSh0ZW1wbGF0ZXMpICYmIEFycmF5LmlzQXJyYXkodGVtcGxhdGVzLnJhdyk7XG5cbi8vIENvbnZlcnQgZXhlY2FgZmlsZSAuLi5jb21tYW5kQXJndW1lbnRzYCB0byBleGVjYShmaWxlLCBjb21tYW5kQXJndW1lbnRzKVxuZXhwb3J0IGNvbnN0IHBhcnNlVGVtcGxhdGVzID0gKHRlbXBsYXRlcywgZXhwcmVzc2lvbnMpID0+IHtcblx0bGV0IHRva2VucyA9IFtdO1xuXG5cdGZvciAoY29uc3QgW2luZGV4LCB0ZW1wbGF0ZV0gb2YgdGVtcGxhdGVzLmVudHJpZXMoKSkge1xuXHRcdHRva2VucyA9IHBhcnNlVGVtcGxhdGUoe1xuXHRcdFx0dGVtcGxhdGVzLFxuXHRcdFx0ZXhwcmVzc2lvbnMsXG5cdFx0XHR0b2tlbnMsXG5cdFx0XHRpbmRleCxcblx0XHRcdHRlbXBsYXRlLFxuXHRcdH0pO1xuXHR9XG5cblx0aWYgKHRva2Vucy5sZW5ndGggPT09IDApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdUZW1wbGF0ZSBzY3JpcHQgbXVzdCBub3QgYmUgZW1wdHknKTtcblx0fVxuXG5cdGNvbnN0IFtmaWxlLCAuLi5jb21tYW5kQXJndW1lbnRzXSA9IHRva2Vucztcblx0cmV0dXJuIFtmaWxlLCBjb21tYW5kQXJndW1lbnRzLCB7fV07XG59O1xuXG5jb25zdCBwYXJzZVRlbXBsYXRlID0gKHt0ZW1wbGF0ZXMsIGV4cHJlc3Npb25zLCB0b2tlbnMsIGluZGV4LCB0ZW1wbGF0ZX0pID0+IHtcblx0aWYgKHRlbXBsYXRlID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIGJhY2tzbGFzaCBzZXF1ZW5jZTogJHt0ZW1wbGF0ZXMucmF3W2luZGV4XX1gKTtcblx0fVxuXG5cdGNvbnN0IHtuZXh0VG9rZW5zLCBsZWFkaW5nV2hpdGVzcGFjZXMsIHRyYWlsaW5nV2hpdGVzcGFjZXN9ID0gc3BsaXRCeVdoaXRlc3BhY2VzKHRlbXBsYXRlLCB0ZW1wbGF0ZXMucmF3W2luZGV4XSk7XG5cdGNvbnN0IG5ld1Rva2VucyA9IGNvbmNhdFRva2Vucyh0b2tlbnMsIG5leHRUb2tlbnMsIGxlYWRpbmdXaGl0ZXNwYWNlcyk7XG5cblx0aWYgKGluZGV4ID09PSBleHByZXNzaW9ucy5sZW5ndGgpIHtcblx0XHRyZXR1cm4gbmV3VG9rZW5zO1xuXHR9XG5cblx0Y29uc3QgZXhwcmVzc2lvbiA9IGV4cHJlc3Npb25zW2luZGV4XTtcblx0Y29uc3QgZXhwcmVzc2lvblRva2VucyA9IEFycmF5LmlzQXJyYXkoZXhwcmVzc2lvbilcblx0XHQ/IGV4cHJlc3Npb24ubWFwKGV4cHJlc3Npb24gPT4gcGFyc2VFeHByZXNzaW9uKGV4cHJlc3Npb24pKVxuXHRcdDogW3BhcnNlRXhwcmVzc2lvbihleHByZXNzaW9uKV07XG5cdHJldHVybiBjb25jYXRUb2tlbnMobmV3VG9rZW5zLCBleHByZXNzaW9uVG9rZW5zLCB0cmFpbGluZ1doaXRlc3BhY2VzKTtcbn07XG5cbi8vIExpa2UgYHN0cmluZy5zcGxpdCgvWyBcXHRcXHJcXG5dKy8pYCBleGNlcHQgbmV3bGluZXMgYW5kIHRhYnMgYXJlOlxuLy8gIC0gaWdub3JlZCB3aGVuIGlucHV0IGFzIGEgYmFja3NsYXNoIHNlcXVlbmNlIGxpa2U6IGBlY2hvIGZvb1xcbiBiYXJgXG4vLyAgLSBub3QgaWdub3JlZCB3aGVuIGlucHV0IGRpcmVjdGx5XG4vLyBUaGUgb25seSB3YXkgdG8gZGlzdGluZ3Vpc2ggdGhvc2UgaW4gSmF2YVNjcmlwdCBpcyB0byB1c2UgYSB0YWdnZWQgdGVtcGxhdGUgYW5kIGNvbXBhcmU6XG4vLyAgLSB0aGUgZmlyc3QgYXJyYXkgYXJndW1lbnQsIHdoaWNoIGRvZXMgbm90IGVzY2FwZSBiYWNrc2xhc2ggc2VxdWVuY2VzXG4vLyAgLSBpdHMgYHJhd2AgcHJvcGVydHksIHdoaWNoIGVzY2FwZXMgdGhlbVxuY29uc3Qgc3BsaXRCeVdoaXRlc3BhY2VzID0gKHRlbXBsYXRlLCByYXdUZW1wbGF0ZSkgPT4ge1xuXHRpZiAocmF3VGVtcGxhdGUubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuIHtuZXh0VG9rZW5zOiBbXSwgbGVhZGluZ1doaXRlc3BhY2VzOiBmYWxzZSwgdHJhaWxpbmdXaGl0ZXNwYWNlczogZmFsc2V9O1xuXHR9XG5cblx0Y29uc3QgbmV4dFRva2VucyA9IFtdO1xuXHRsZXQgdGVtcGxhdGVTdGFydCA9IDA7XG5cdGNvbnN0IGxlYWRpbmdXaGl0ZXNwYWNlcyA9IERFTElNSVRFUlMuaGFzKHJhd1RlbXBsYXRlWzBdKTtcblxuXHRmb3IgKFxuXHRcdGxldCB0ZW1wbGF0ZUluZGV4ID0gMCwgcmF3SW5kZXggPSAwO1xuXHRcdHRlbXBsYXRlSW5kZXggPCB0ZW1wbGF0ZS5sZW5ndGg7XG5cdFx0dGVtcGxhdGVJbmRleCArPSAxLCByYXdJbmRleCArPSAxXG5cdCkge1xuXHRcdGNvbnN0IHJhd0NoYXJhY3RlciA9IHJhd1RlbXBsYXRlW3Jhd0luZGV4XTtcblx0XHRpZiAoREVMSU1JVEVSUy5oYXMocmF3Q2hhcmFjdGVyKSkge1xuXHRcdFx0aWYgKHRlbXBsYXRlU3RhcnQgIT09IHRlbXBsYXRlSW5kZXgpIHtcblx0XHRcdFx0bmV4dFRva2Vucy5wdXNoKHRlbXBsYXRlLnNsaWNlKHRlbXBsYXRlU3RhcnQsIHRlbXBsYXRlSW5kZXgpKTtcblx0XHRcdH1cblxuXHRcdFx0dGVtcGxhdGVTdGFydCA9IHRlbXBsYXRlSW5kZXggKyAxO1xuXHRcdH0gZWxzZSBpZiAocmF3Q2hhcmFjdGVyID09PSAnXFxcXCcpIHtcblx0XHRcdGNvbnN0IG5leHRSYXdDaGFyYWN0ZXIgPSByYXdUZW1wbGF0ZVtyYXdJbmRleCArIDFdO1xuXHRcdFx0aWYgKG5leHRSYXdDaGFyYWN0ZXIgPT09ICdcXG4nKSB7XG5cdFx0XHRcdC8vIEhhbmRsZXMgZXNjYXBlZCBuZXdsaW5lcyBpbiB0ZW1wbGF0ZXNcblx0XHRcdFx0dGVtcGxhdGVJbmRleCAtPSAxO1xuXHRcdFx0XHRyYXdJbmRleCArPSAxO1xuXHRcdFx0fSBlbHNlIGlmIChuZXh0UmF3Q2hhcmFjdGVyID09PSAndScgJiYgcmF3VGVtcGxhdGVbcmF3SW5kZXggKyAyXSA9PT0gJ3snKSB7XG5cdFx0XHRcdHJhd0luZGV4ID0gcmF3VGVtcGxhdGUuaW5kZXhPZignfScsIHJhd0luZGV4ICsgMyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyYXdJbmRleCArPSBFU0NBUEVfTEVOR1RIW25leHRSYXdDaGFyYWN0ZXJdID8/IDE7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgdHJhaWxpbmdXaGl0ZXNwYWNlcyA9IHRlbXBsYXRlU3RhcnQgPT09IHRlbXBsYXRlLmxlbmd0aDtcblx0aWYgKCF0cmFpbGluZ1doaXRlc3BhY2VzKSB7XG5cdFx0bmV4dFRva2Vucy5wdXNoKHRlbXBsYXRlLnNsaWNlKHRlbXBsYXRlU3RhcnQpKTtcblx0fVxuXG5cdHJldHVybiB7bmV4dFRva2VucywgbGVhZGluZ1doaXRlc3BhY2VzLCB0cmFpbGluZ1doaXRlc3BhY2VzfTtcbn07XG5cbmNvbnN0IERFTElNSVRFUlMgPSBuZXcgU2V0KFsnICcsICdcXHQnLCAnXFxyJywgJ1xcbiddKTtcblxuLy8gTnVtYmVyIG9mIGNoYXJhY3RlcnMgaW4gYmFja3NsYXNoIGVzY2FwZSBzZXF1ZW5jZXM6IFxcMCBcXHhYWCBvciBcXHVYWFhYXG4vLyBcXGNYIGlzIGFsbG93ZWQgaW4gUmVnRXhwcyBidXQgbm90IGluIHN0cmluZ3Ncbi8vIE9jdGFsIHNlcXVlbmNlcyBhcmUgbm90IGFsbG93ZWQgaW4gc3RyaWN0IG1vZGVcbmNvbnN0IEVTQ0FQRV9MRU5HVEggPSB7eDogMywgdTogNX07XG5cbmNvbnN0IGNvbmNhdFRva2VucyA9ICh0b2tlbnMsIG5leHRUb2tlbnMsIGlzU2VwYXJhdGVkKSA9PiBpc1NlcGFyYXRlZFxuXHR8fCB0b2tlbnMubGVuZ3RoID09PSAwXG5cdHx8IG5leHRUb2tlbnMubGVuZ3RoID09PSAwXG5cdD8gWy4uLnRva2VucywgLi4ubmV4dFRva2Vuc11cblx0OiBbXG5cdFx0Li4udG9rZW5zLnNsaWNlKDAsIC0xKSxcblx0XHRgJHt0b2tlbnMuYXQoLTEpfSR7bmV4dFRva2Vuc1swXX1gLFxuXHRcdC4uLm5leHRUb2tlbnMuc2xpY2UoMSksXG5cdF07XG5cbi8vIEhhbmRsZSBgJHtleHByZXNzaW9ufWAgaW5zaWRlIHRoZSB0ZW1wbGF0ZSBzdHJpbmcgc3ludGF4XG5jb25zdCBwYXJzZUV4cHJlc3Npb24gPSBleHByZXNzaW9uID0+IHtcblx0Y29uc3QgdHlwZU9mRXhwcmVzc2lvbiA9IHR5cGVvZiBleHByZXNzaW9uO1xuXG5cdGlmICh0eXBlT2ZFeHByZXNzaW9uID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBleHByZXNzaW9uO1xuXHR9XG5cblx0aWYgKHR5cGVPZkV4cHJlc3Npb24gPT09ICdudW1iZXInKSB7XG5cdFx0cmV0dXJuIFN0cmluZyhleHByZXNzaW9uKTtcblx0fVxuXG5cdGlmIChpc1BsYWluT2JqZWN0KGV4cHJlc3Npb24pICYmICgnc3Rkb3V0JyBpbiBleHByZXNzaW9uIHx8ICdpc01heEJ1ZmZlcicgaW4gZXhwcmVzc2lvbikpIHtcblx0XHRyZXR1cm4gZ2V0U3VicHJvY2Vzc1Jlc3VsdChleHByZXNzaW9uKTtcblx0fVxuXG5cdGlmIChleHByZXNzaW9uIGluc3RhbmNlb2YgQ2hpbGRQcm9jZXNzIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChleHByZXNzaW9uKSA9PT0gJ1tvYmplY3QgUHJvbWlzZV0nKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXRlbXBsYXRlLWN1cmx5LWluLXN0cmluZ1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgc3VicHJvY2VzcyBpbiB0ZW1wbGF0ZSBleHByZXNzaW9uLiBQbGVhc2UgdXNlICR7YXdhaXQgc3VicHJvY2Vzc30gaW5zdGVhZCBvZiAke3N1YnByb2Nlc3N9LicpO1xuXHR9XG5cblx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVW5leHBlY3RlZCBcIiR7dHlwZU9mRXhwcmVzc2lvbn1cIiBpbiB0ZW1wbGF0ZSBleHByZXNzaW9uYCk7XG59O1xuXG5jb25zdCBnZXRTdWJwcm9jZXNzUmVzdWx0ID0gKHtzdGRvdXR9KSA9PiB7XG5cdGlmICh0eXBlb2Ygc3Rkb3V0ID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBzdGRvdXQ7XG5cdH1cblxuXHRpZiAoaXNVaW50OEFycmF5KHN0ZG91dCkpIHtcblx0XHRyZXR1cm4gdWludDhBcnJheVRvU3RyaW5nKHN0ZG91dCk7XG5cdH1cblxuXHRpZiAoc3Rkb3V0ID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdNaXNzaW5nIHJlc3VsdC5zdGRvdXQgaW4gdGVtcGxhdGUgZXhwcmVzc2lvbi4gVGhpcyBpcyBwcm9iYWJseSBkdWUgdG8gdGhlIHByZXZpb3VzIHN1YnByb2Nlc3NcXCcgXCJzdGRvdXRcIiBvcHRpb24uJyk7XG5cdH1cblxuXHR0aHJvdyBuZXcgVHlwZUVycm9yKGBVbmV4cGVjdGVkIFwiJHt0eXBlb2Ygc3Rkb3V0fVwiIHN0ZG91dCBpbiB0ZW1wbGF0ZSBleHByZXNzaW9uYCk7XG59O1xuIiwgImltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2Vzcyc7XG5cbmV4cG9ydCBjb25zdCBpc1N0YW5kYXJkU3RyZWFtID0gc3RyZWFtID0+IFNUQU5EQVJEX1NUUkVBTVMuaW5jbHVkZXMoc3RyZWFtKTtcbmV4cG9ydCBjb25zdCBTVEFOREFSRF9TVFJFQU1TID0gW3Byb2Nlc3Muc3RkaW4sIHByb2Nlc3Muc3Rkb3V0LCBwcm9jZXNzLnN0ZGVycl07XG5leHBvcnQgY29uc3QgU1RBTkRBUkRfU1RSRUFNU19BTElBU0VTID0gWydzdGRpbicsICdzdGRvdXQnLCAnc3RkZXJyJ107XG5leHBvcnQgY29uc3QgZ2V0U3RyZWFtTmFtZSA9IGZkTnVtYmVyID0+IFNUQU5EQVJEX1NUUkVBTVNfQUxJQVNFU1tmZE51bWJlcl0gPz8gYHN0ZGlvWyR7ZmROdW1iZXJ9XWA7XG4iLCAiaW1wb3J0IHtkZWJ1Z2xvZ30gZnJvbSAnbm9kZTp1dGlsJztcbmltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJ2lzLXBsYWluLW9iaic7XG5pbXBvcnQge1NUQU5EQVJEX1NUUkVBTVNfQUxJQVNFU30gZnJvbSAnLi4vdXRpbHMvc3RhbmRhcmQtc3RyZWFtLmpzJztcblxuLy8gU29tZSBvcHRpb25zIGNhbiBoYXZlIGRpZmZlcmVudCB2YWx1ZXMgZm9yIGBzdGRvdXRgL2BzdGRlcnJgL2BmZDNgLlxuLy8gVGhpcyBub3JtYWxpemVzIHRob3NlIHRvIGFycmF5IG9mIHZhbHVlcy5cbi8vIEZvciBleGFtcGxlLCBge3ZlcmJvc2U6IHtzdGRvdXQ6ICdub25lJywgc3RkZXJyOiAnZnVsbCd9fWAgYmVjb21lcyBge3ZlcmJvc2U6IFsnbm9uZScsICdub25lJywgJ2Z1bGwnXX1gXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRmRTcGVjaWZpY09wdGlvbnMgPSBvcHRpb25zID0+IHtcblx0Y29uc3Qgb3B0aW9uc0NvcHkgPSB7Li4ub3B0aW9uc307XG5cblx0Zm9yIChjb25zdCBvcHRpb25OYW1lIG9mIEZEX1NQRUNJRklDX09QVElPTlMpIHtcblx0XHRvcHRpb25zQ29weVtvcHRpb25OYW1lXSA9IG5vcm1hbGl6ZUZkU3BlY2lmaWNPcHRpb24ob3B0aW9ucywgb3B0aW9uTmFtZSk7XG5cdH1cblxuXHRyZXR1cm4gb3B0aW9uc0NvcHk7XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRmRTcGVjaWZpY09wdGlvbiA9IChvcHRpb25zLCBvcHRpb25OYW1lKSA9PiB7XG5cdGNvbnN0IG9wdGlvbkJhc2VBcnJheSA9IEFycmF5LmZyb20oe2xlbmd0aDogZ2V0U3RkaW9MZW5ndGgob3B0aW9ucykgKyAxfSk7XG5cdGNvbnN0IG9wdGlvbkFycmF5ID0gbm9ybWFsaXplRmRTcGVjaWZpY1ZhbHVlKG9wdGlvbnNbb3B0aW9uTmFtZV0sIG9wdGlvbkJhc2VBcnJheSwgb3B0aW9uTmFtZSk7XG5cdHJldHVybiBhZGREZWZhdWx0VmFsdWUob3B0aW9uQXJyYXksIG9wdGlvbk5hbWUpO1xufTtcblxuY29uc3QgZ2V0U3RkaW9MZW5ndGggPSAoe3N0ZGlvfSkgPT4gQXJyYXkuaXNBcnJheShzdGRpbylcblx0PyBNYXRoLm1heChzdGRpby5sZW5ndGgsIFNUQU5EQVJEX1NUUkVBTVNfQUxJQVNFUy5sZW5ndGgpXG5cdDogU1RBTkRBUkRfU1RSRUFNU19BTElBU0VTLmxlbmd0aDtcblxuY29uc3Qgbm9ybWFsaXplRmRTcGVjaWZpY1ZhbHVlID0gKG9wdGlvblZhbHVlLCBvcHRpb25BcnJheSwgb3B0aW9uTmFtZSkgPT4gaXNQbGFpbk9iamVjdChvcHRpb25WYWx1ZSlcblx0PyBub3JtYWxpemVPcHRpb25PYmplY3Qob3B0aW9uVmFsdWUsIG9wdGlvbkFycmF5LCBvcHRpb25OYW1lKVxuXHQ6IG9wdGlvbkFycmF5LmZpbGwob3B0aW9uVmFsdWUpO1xuXG5jb25zdCBub3JtYWxpemVPcHRpb25PYmplY3QgPSAob3B0aW9uVmFsdWUsIG9wdGlvbkFycmF5LCBvcHRpb25OYW1lKSA9PiB7XG5cdGZvciAoY29uc3QgZmROYW1lIG9mIE9iamVjdC5rZXlzKG9wdGlvblZhbHVlKS5zb3J0KGNvbXBhcmVGZE5hbWUpKSB7XG5cdFx0Zm9yIChjb25zdCBmZE51bWJlciBvZiBwYXJzZUZkTmFtZShmZE5hbWUsIG9wdGlvbk5hbWUsIG9wdGlvbkFycmF5KSkge1xuXHRcdFx0b3B0aW9uQXJyYXlbZmROdW1iZXJdID0gb3B0aW9uVmFsdWVbZmROYW1lXTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gb3B0aW9uQXJyYXk7XG59O1xuXG4vLyBFbnN1cmUgcHJpb3JpdHkgb3JkZXIgd2hlbiBzZXR0aW5nIGJvdGggYHN0ZG91dGAvYHN0ZGVycmAsIGBmZDFgL2BmZDJgLCBhbmQgYGFsbGBcbmNvbnN0IGNvbXBhcmVGZE5hbWUgPSAoZmROYW1lQSwgZmROYW1lQikgPT4gZ2V0RmROYW1lT3JkZXIoZmROYW1lQSkgPCBnZXRGZE5hbWVPcmRlcihmZE5hbWVCKSA/IDEgOiAtMTtcblxuY29uc3QgZ2V0RmROYW1lT3JkZXIgPSBmZE5hbWUgPT4ge1xuXHRpZiAoZmROYW1lID09PSAnc3Rkb3V0JyB8fCBmZE5hbWUgPT09ICdzdGRlcnInKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRyZXR1cm4gZmROYW1lID09PSAnYWxsJyA/IDIgOiAxO1xufTtcblxuY29uc3QgcGFyc2VGZE5hbWUgPSAoZmROYW1lLCBvcHRpb25OYW1lLCBvcHRpb25BcnJheSkgPT4ge1xuXHRpZiAoZmROYW1lID09PSAnaXBjJykge1xuXHRcdHJldHVybiBbb3B0aW9uQXJyYXkubGVuZ3RoIC0gMV07XG5cdH1cblxuXHRjb25zdCBmZE51bWJlciA9IHBhcnNlRmQoZmROYW1lKTtcblx0aWYgKGZkTnVtYmVyID09PSB1bmRlZmluZWQgfHwgZmROdW1iZXIgPT09IDApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBcIiR7b3B0aW9uTmFtZX0uJHtmZE5hbWV9XCIgaXMgaW52YWxpZC5cbkl0IG11c3QgYmUgXCIke29wdGlvbk5hbWV9LnN0ZG91dFwiLCBcIiR7b3B0aW9uTmFtZX0uc3RkZXJyXCIsIFwiJHtvcHRpb25OYW1lfS5hbGxcIiwgXCIke29wdGlvbk5hbWV9LmlwY1wiLCBvciBcIiR7b3B0aW9uTmFtZX0uZmQzXCIsIFwiJHtvcHRpb25OYW1lfS5mZDRcIiAoYW5kIHNvIG9uKS5gKTtcblx0fVxuXG5cdGlmIChmZE51bWJlciA+PSBvcHRpb25BcnJheS5sZW5ndGgpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBcIiR7b3B0aW9uTmFtZX0uJHtmZE5hbWV9XCIgaXMgaW52YWxpZDogdGhhdCBmaWxlIGRlc2NyaXB0b3IgZG9lcyBub3QgZXhpc3QuXG5QbGVhc2Ugc2V0IHRoZSBcInN0ZGlvXCIgb3B0aW9uIHRvIGVuc3VyZSB0aGF0IGZpbGUgZGVzY3JpcHRvciBleGlzdHMuYCk7XG5cdH1cblxuXHRyZXR1cm4gZmROdW1iZXIgPT09ICdhbGwnID8gWzEsIDJdIDogW2ZkTnVtYmVyXTtcbn07XG5cbi8vIFVzZSB0aGUgc2FtZSBzeW50YXggZm9yIGZkLXNwZWNpZmljIG9wdGlvbnMgYW5kIHRoZSBgZnJvbWAvYHRvYCBvcHRpb25zXG5leHBvcnQgY29uc3QgcGFyc2VGZCA9IGZkTmFtZSA9PiB7XG5cdGlmIChmZE5hbWUgPT09ICdhbGwnKSB7XG5cdFx0cmV0dXJuIGZkTmFtZTtcblx0fVxuXG5cdGlmIChTVEFOREFSRF9TVFJFQU1TX0FMSUFTRVMuaW5jbHVkZXMoZmROYW1lKSkge1xuXHRcdHJldHVybiBTVEFOREFSRF9TVFJFQU1TX0FMSUFTRVMuaW5kZXhPZihmZE5hbWUpO1xuXHR9XG5cblx0Y29uc3QgcmVnZXhwUmVzdWx0ID0gRkRfUkVHRVhQLmV4ZWMoZmROYW1lKTtcblx0aWYgKHJlZ2V4cFJlc3VsdCAhPT0gbnVsbCkge1xuXHRcdHJldHVybiBOdW1iZXIocmVnZXhwUmVzdWx0WzFdKTtcblx0fVxufTtcblxuY29uc3QgRkRfUkVHRVhQID0gL15mZChcXGQrKSQvO1xuXG5jb25zdCBhZGREZWZhdWx0VmFsdWUgPSAob3B0aW9uQXJyYXksIG9wdGlvbk5hbWUpID0+IG9wdGlvbkFycmF5Lm1hcChvcHRpb25WYWx1ZSA9PiBvcHRpb25WYWx1ZSA9PT0gdW5kZWZpbmVkXG5cdD8gREVGQVVMVF9PUFRJT05TW29wdGlvbk5hbWVdXG5cdDogb3B0aW9uVmFsdWUpO1xuXG4vLyBEZWZhdWx0IHZhbHVlIGZvciB0aGUgYHZlcmJvc2VgIG9wdGlvblxuY29uc3QgdmVyYm9zZURlZmF1bHQgPSBkZWJ1Z2xvZygnZXhlY2EnKS5lbmFibGVkID8gJ2Z1bGwnIDogJ25vbmUnO1xuXG5jb25zdCBERUZBVUxUX09QVElPTlMgPSB7XG5cdGxpbmVzOiBmYWxzZSxcblx0YnVmZmVyOiB0cnVlLFxuXHRtYXhCdWZmZXI6IDEwMDAgKiAxMDAwICogMTAwLFxuXHR2ZXJib3NlOiB2ZXJib3NlRGVmYXVsdCxcblx0c3RyaXBGaW5hbE5ld2xpbmU6IHRydWUsXG59O1xuXG4vLyBMaXN0IG9mIG9wdGlvbnMgd2hpY2ggY2FuIGhhdmUgZGlmZmVyZW50IHZhbHVlcyBmb3IgYHN0ZG91dGAvYHN0ZGVycmBcbmV4cG9ydCBjb25zdCBGRF9TUEVDSUZJQ19PUFRJT05TID0gWydsaW5lcycsICdidWZmZXInLCAnbWF4QnVmZmVyJywgJ3ZlcmJvc2UnLCAnc3RyaXBGaW5hbE5ld2xpbmUnXTtcblxuLy8gUmV0cmlldmUgZmQtc3BlY2lmaWMgb3B0aW9uXG5leHBvcnQgY29uc3QgZ2V0RmRTcGVjaWZpY1ZhbHVlID0gKG9wdGlvbkFycmF5LCBmZE51bWJlcikgPT4gZmROdW1iZXIgPT09ICdpcGMnXG5cdD8gb3B0aW9uQXJyYXkuYXQoLTEpXG5cdDogb3B0aW9uQXJyYXlbZmROdW1iZXJdO1xuIiwgImltcG9ydCB7Z2V0RmRTcGVjaWZpY1ZhbHVlfSBmcm9tICcuLi9hcmd1bWVudHMvc3BlY2lmaWMuanMnO1xuXG4vLyBUaGUgYHZlcmJvc2VgIG9wdGlvbiBjYW4gaGF2ZSBkaWZmZXJlbnQgdmFsdWVzIGZvciBgc3Rkb3V0YC9gc3RkZXJyYFxuZXhwb3J0IGNvbnN0IGlzVmVyYm9zZSA9ICh7dmVyYm9zZX0sIGZkTnVtYmVyKSA9PiBnZXRGZFZlcmJvc2UodmVyYm9zZSwgZmROdW1iZXIpICE9PSAnbm9uZSc7XG5cbi8vIFdoZXRoZXIgSVBDIGFuZCBvdXRwdXQgYW5kIGxvZ2dlZFxuZXhwb3J0IGNvbnN0IGlzRnVsbFZlcmJvc2UgPSAoe3ZlcmJvc2V9LCBmZE51bWJlcikgPT4gIVsnbm9uZScsICdzaG9ydCddLmluY2x1ZGVzKGdldEZkVmVyYm9zZSh2ZXJib3NlLCBmZE51bWJlcikpO1xuXG4vLyBUaGUgYHZlcmJvc2VgIG9wdGlvbiBjYW4gYmUgYSBmdW5jdGlvbiB0byBjdXN0b21pemUgbG9nZ2luZ1xuZXhwb3J0IGNvbnN0IGdldFZlcmJvc2VGdW5jdGlvbiA9ICh7dmVyYm9zZX0sIGZkTnVtYmVyKSA9PiB7XG5cdGNvbnN0IGZkVmVyYm9zZSA9IGdldEZkVmVyYm9zZSh2ZXJib3NlLCBmZE51bWJlcik7XG5cdHJldHVybiBpc1ZlcmJvc2VGdW5jdGlvbihmZFZlcmJvc2UpID8gZmRWZXJib3NlIDogdW5kZWZpbmVkO1xufTtcblxuLy8gV2hlbiB1c2luZyBgdmVyYm9zZToge3N0ZG91dCwgc3RkZXJyLCBmZDMsIGlwY31gOlxuLy8gIC0gYHZlcmJvc2Uuc3Rkb3V0fHN0ZGVycnxmZDNgIGlzIHVzZWQgZm9yICdvdXRwdXQnXG4vLyAgLSBgdmVyYm9zZS5pcGNgIGlzIG9ubHkgdXNlZCBmb3IgJ2lwYydcbi8vICAtIGhpZ2hlc3QgYHZlcmJvc2UuKmAgdmFsdWUgaXMgdXNlZCBmb3IgJ2NvbW1hbmQnLCAnZXJyb3InIGFuZCAnZHVyYXRpb24nXG5jb25zdCBnZXRGZFZlcmJvc2UgPSAodmVyYm9zZSwgZmROdW1iZXIpID0+IGZkTnVtYmVyID09PSB1bmRlZmluZWRcblx0PyBnZXRGZEdlbmVyaWNWZXJib3NlKHZlcmJvc2UpXG5cdDogZ2V0RmRTcGVjaWZpY1ZhbHVlKHZlcmJvc2UsIGZkTnVtYmVyKTtcblxuLy8gV2hlbiB1c2luZyBgdmVyYm9zZToge3N0ZG91dCwgc3RkZXJyLCBmZDMsIGlwY31gIGFuZCBsb2dnaW5nIGlzIG5vdCBzcGVjaWZpYyB0byBhIGZpbGUgZGVzY3JpcHRvci5cbi8vIFdlIHRoZW4gdXNlIHRoZSBoaWdoZXN0IGB2ZXJib3NlLipgIHZhbHVlLCB1c2luZyB0aGUgZm9sbG93aW5nIG9yZGVyOlxuLy8gIC0gZnVuY3Rpb24gPiAnZnVsbCcgPiAnc2hvcnQnID4gJ25vbmUnXG4vLyAgLSBpZiBzZXZlcmFsIGZ1bmN0aW9ucyBhcmUgZGVmaW5lZDogc3Rkb3V0ID4gc3RkZXJyID4gZmQzID4gaXBjXG5jb25zdCBnZXRGZEdlbmVyaWNWZXJib3NlID0gdmVyYm9zZSA9PiB2ZXJib3NlLmZpbmQoZmRWZXJib3NlID0+IGlzVmVyYm9zZUZ1bmN0aW9uKGZkVmVyYm9zZSkpXG5cdD8/IFZFUkJPU0VfVkFMVUVTLmZpbmRMYXN0KGZkVmVyYm9zZSA9PiB2ZXJib3NlLmluY2x1ZGVzKGZkVmVyYm9zZSkpO1xuXG4vLyBXaGV0aGVyIHRoZSBgdmVyYm9zZWAgb3B0aW9uIGlzIGN1c3RvbWl6ZWQgdXNpbmcgYSBmdW5jdGlvblxuZXhwb3J0IGNvbnN0IGlzVmVyYm9zZUZ1bmN0aW9uID0gZmRWZXJib3NlID0+IHR5cGVvZiBmZFZlcmJvc2UgPT09ICdmdW5jdGlvbic7XG5cbmV4cG9ydCBjb25zdCBWRVJCT1NFX1ZBTFVFUyA9IFsnbm9uZScsICdzaG9ydCcsICdmdWxsJ107XG4iLCAiaW1wb3J0IHtwbGF0Zm9ybX0gZnJvbSAnbm9kZTpwcm9jZXNzJztcbmltcG9ydCB7c3RyaXBWVENvbnRyb2xDaGFyYWN0ZXJzfSBmcm9tICdub2RlOnV0aWwnO1xuXG4vLyBDb21wdXRlIGByZXN1bHQuY29tbWFuZGAgYW5kIGByZXN1bHQuZXNjYXBlZENvbW1hbmRgXG5leHBvcnQgY29uc3Qgam9pbkNvbW1hbmQgPSAoZmlsZVBhdGgsIHJhd0FyZ3VtZW50cykgPT4ge1xuXHRjb25zdCBmaWxlQW5kQXJndW1lbnRzID0gW2ZpbGVQYXRoLCAuLi5yYXdBcmd1bWVudHNdO1xuXHRjb25zdCBjb21tYW5kID0gZmlsZUFuZEFyZ3VtZW50cy5qb2luKCcgJyk7XG5cdGNvbnN0IGVzY2FwZWRDb21tYW5kID0gZmlsZUFuZEFyZ3VtZW50c1xuXHRcdC5tYXAoZmlsZUFuZEFyZ3VtZW50ID0+IHF1b3RlU3RyaW5nKGVzY2FwZUNvbnRyb2xDaGFyYWN0ZXJzKGZpbGVBbmRBcmd1bWVudCkpKVxuXHRcdC5qb2luKCcgJyk7XG5cdHJldHVybiB7Y29tbWFuZCwgZXNjYXBlZENvbW1hbmR9O1xufTtcblxuLy8gUmVtb3ZlIEFOU0kgc2VxdWVuY2VzIGFuZCBlc2NhcGUgY29udHJvbCBjaGFyYWN0ZXJzIGFuZCBuZXdsaW5lc1xuZXhwb3J0IGNvbnN0IGVzY2FwZUxpbmVzID0gbGluZXMgPT4gc3RyaXBWVENvbnRyb2xDaGFyYWN0ZXJzKGxpbmVzKVxuXHQuc3BsaXQoJ1xcbicpXG5cdC5tYXAobGluZSA9PiBlc2NhcGVDb250cm9sQ2hhcmFjdGVycyhsaW5lKSlcblx0LmpvaW4oJ1xcbicpO1xuXG5jb25zdCBlc2NhcGVDb250cm9sQ2hhcmFjdGVycyA9IGxpbmUgPT4gbGluZS5yZXBsYWNlQWxsKFNQRUNJQUxfQ0hBUl9SRUdFWFAsIGNoYXJhY3RlciA9PiBlc2NhcGVDb250cm9sQ2hhcmFjdGVyKGNoYXJhY3RlcikpO1xuXG5jb25zdCBlc2NhcGVDb250cm9sQ2hhcmFjdGVyID0gY2hhcmFjdGVyID0+IHtcblx0Y29uc3QgY29tbW9uRXNjYXBlID0gQ09NTU9OX0VTQ0FQRVNbY2hhcmFjdGVyXTtcblx0aWYgKGNvbW1vbkVzY2FwZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNvbW1vbkVzY2FwZTtcblx0fVxuXG5cdGNvbnN0IGNvZGVwb2ludCA9IGNoYXJhY3Rlci5jb2RlUG9pbnRBdCgwKTtcblx0Y29uc3QgY29kZXBvaW50SGV4ID0gY29kZXBvaW50LnRvU3RyaW5nKDE2KTtcblx0cmV0dXJuIGNvZGVwb2ludCA8PSBBU1RSQUxfU1RBUlRcblx0XHQ/IGBcXFxcdSR7Y29kZXBvaW50SGV4LnBhZFN0YXJ0KDQsICcwJyl9YFxuXHRcdDogYFxcXFxVJHtjb2RlcG9pbnRIZXh9YDtcbn07XG5cbi8vIENoYXJhY3RlcnMgdGhhdCB3b3VsZCBjcmVhdGUgaXNzdWVzIHdoZW4gcHJpbnRlZCBhcmUgZXNjYXBlZCB1c2luZyB0aGUgXFx1IG9yIFxcVSBub3RhdGlvbi5cbi8vIFRob3NlIGluY2x1ZGUgY29udHJvbCBjaGFyYWN0ZXJzIGFuZCBuZXdsaW5lcy5cbi8vIFRoZSBcXHUgYW5kIFxcVSBub3RhdGlvbiBpcyBCYXNoIHNwZWNpZmljLCBidXQgdGhlcmUgaXMgbm8gd2F5IHRvIGRvIHRoaXMgaW4gYSBzaGVsbC1hZ25vc3RpYyB3YXkuXG4vLyBTb21lIHNoZWxscyBkbyBub3QgZXZlbiBoYXZlIGEgd2F5IHRvIHByaW50IHRob3NlIGNoYXJhY3RlcnMgaW4gYW4gZXNjYXBlZCBmYXNoaW9uLlxuLy8gVGhlcmVmb3JlLCB3ZSBwcmlvcml0aXplIHByaW50aW5nIHRob3NlIHNhZmVseSwgaW5zdGVhZCBvZiBhbGxvd2luZyB0aG9zZSB0byBiZSBjb3B5LXBhc3RlZC5cbi8vIExpc3Qgb2YgVW5pY29kZSBjaGFyYWN0ZXIgY2F0ZWdvcmllczogaHR0cHM6Ly93d3cuZmlsZWZvcm1hdC5pbmZvL2luZm8vdW5pY29kZS9jYXRlZ29yeS9pbmRleC5odG1cbmNvbnN0IGdldFNwZWNpYWxDaGFyUmVnRXhwID0gKCkgPT4ge1xuXHR0cnkge1xuXHRcdC8vIFRoaXMgdGhyb3dzIHdoZW4gdXNpbmcgTm9kZS5qcyB3aXRob3V0IElDVSBzdXBwb3J0LlxuXHRcdC8vIFdoZW4gdXNpbmcgYSBSZWdFeHAgbGl0ZXJhbCwgdGhpcyB3b3VsZCB0aHJvdyBhdCBwYXJzaW5nLXRpbWUsIGluc3RlYWQgb2YgcnVudGltZS5cblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLXJlZ2V4LWxpdGVyYWxzXG5cdFx0cmV0dXJuIG5ldyBSZWdFeHAoJ1xcXFxwe1NlcGFyYXRvcn18XFxcXHB7T3RoZXJ9JywgJ2d1Jyk7XG5cdH0gY2F0Y2gge1xuXHRcdC8vIFNpbWlsYXIgdG8gdGhlIGFib3ZlIFJlZ0V4cCwgYnV0IHdvcmtzIGV2ZW4gd2hlbiBOb2RlLmpzIGhhcyBiZWVuIGJ1aWx0IHdpdGhvdXQgSUNVIHN1cHBvcnQuXG5cdFx0Ly8gVW5saWtlIHRoZSBhYm92ZSBSZWdFeHAsIGl0IG9ubHkgY292ZXJzIHdoaXRlc3BhY2VzIGFuZCBDMC9DMSBjb250cm9sIGNoYXJhY3RlcnMuXG5cdFx0Ly8gSXQgZG9lcyBub3QgY292ZXIgc29tZSBlZGdlIGNhc2VzLCBzdWNoIGFzIFVuaWNvZGUgcmVzZXJ2ZWQgY2hhcmFjdGVycy5cblx0XHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9leGVjYS9pc3N1ZXMvMTE0M1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250cm9sLXJlZ2V4XG5cdFx0cmV0dXJuIC9bXFxzXFx1MDAwMC1cXHUwMDFGXFx1MDA3Ri1cXHUwMDlGXFx1MDBBRF0vZztcblx0fVxufTtcblxuY29uc3QgU1BFQ0lBTF9DSEFSX1JFR0VYUCA9IGdldFNwZWNpYWxDaGFyUmVnRXhwKCk7XG5cbi8vIEFjY2VwdGVkIGJ5ICQnLi4uJyBpbiBCYXNoLlxuLy8gRXhjbHVkZSBcXGEgXFxlIFxcdiB3aGljaCBhcmUgYWNjZXB0ZWQgaW4gQmFzaCBidXQgbm90IGluIEphdmFTY3JpcHQgKGV4Y2VwdCBcXHYpIGFuZCBKU09OLlxuY29uc3QgQ09NTU9OX0VTQ0FQRVMgPSB7XG5cdCcgJzogJyAnLFxuXHQnXFxiJzogJ1xcXFxiJyxcblx0J1xcZic6ICdcXFxcZicsXG5cdCdcXG4nOiAnXFxcXG4nLFxuXHQnXFxyJzogJ1xcXFxyJyxcblx0J1xcdCc6ICdcXFxcdCcsXG59O1xuXG4vLyBVcCB1bnRpbCB0aGF0IGNvZGVwb2ludCwgXFx1IG5vdGF0aW9uIGNhbiBiZSB1c2VkIGluc3RlYWQgb2YgXFxVXG5jb25zdCBBU1RSQUxfU1RBUlQgPSA2NV81MzU7XG5cbi8vIFNvbWUgY2hhcmFjdGVycyBhcmUgc2hlbGwtc3BlY2lmaWMsIGkuZS4gbmVlZCB0byBiZSBlc2NhcGVkIHdoZW4gdGhlIGNvbW1hbmQgaXMgY29weS1wYXN0ZWQgdGhlbiBydW4uXG4vLyBFc2NhcGluZyBpcyBzaGVsbC1zcGVjaWZpYy4gV2UgY2Fubm90IGtub3cgd2hpY2ggc2hlbGwgaXMgdXNlZDogYHByb2Nlc3MucGxhdGZvcm1gIGRldGVjdGlvbiBpcyBub3QgZW5vdWdoLlxuLy8gRm9yIGV4YW1wbGUsIFdpbmRvd3MgdXNlcnMgY291bGQgYmUgdXNpbmcgYGNtZC5leGVgLCBQb3dlcnNoZWxsIG9yIEJhc2ggZm9yIFdpbmRvd3Mgd2hpY2ggYWxsIHVzZSBkaWZmZXJlbnQgZXNjYXBpbmcuXG4vLyBXZSB1c2UgJy4uLicgb24gVW5peCwgd2hpY2ggaXMgUE9TSVggc2hlbGwgY29tcGxpYW50IGFuZCBlc2NhcGUgYWxsIGNoYXJhY3RlcnMgYnV0ICcgc28gdGhpcyBpcyBmYWlybHkgc2FmZS5cbi8vIE9uIFdpbmRvd3MsIHdlIGFzc3VtZSBjbWQuZXhlIGlzIHVzZWQgYW5kIGVzY2FwZSB3aXRoIFwiLi4uXCIsIHdoaWNoIGFsc28gd29ya3Mgd2l0aCBQb3dlcnNoZWxsLlxuY29uc3QgcXVvdGVTdHJpbmcgPSBlc2NhcGVkQXJndW1lbnQgPT4ge1xuXHRpZiAoTk9fRVNDQVBFX1JFR0VYUC50ZXN0KGVzY2FwZWRBcmd1bWVudCkpIHtcblx0XHRyZXR1cm4gZXNjYXBlZEFyZ3VtZW50O1xuXHR9XG5cblx0cmV0dXJuIHBsYXRmb3JtID09PSAnd2luMzInXG5cdFx0PyBgXCIke2VzY2FwZWRBcmd1bWVudC5yZXBsYWNlQWxsKCdcIicsICdcIlwiJyl9XCJgXG5cdFx0OiBgJyR7ZXNjYXBlZEFyZ3VtZW50LnJlcGxhY2VBbGwoJ1xcJycsICdcXCdcXFxcXFwnXFwnJyl9J2A7XG59O1xuXG5jb25zdCBOT19FU0NBUEVfUkVHRVhQID0gL15bXFx3Li8tXSskLztcbiIsICJpbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1VuaWNvZGVTdXBwb3J0ZWQoKSB7XG5cdGNvbnN0IHtlbnZ9ID0gcHJvY2Vzcztcblx0Y29uc3Qge1RFUk0sIFRFUk1fUFJPR1JBTX0gPSBlbnY7XG5cblx0aWYgKHByb2Nlc3MucGxhdGZvcm0gIT09ICd3aW4zMicpIHtcblx0XHRyZXR1cm4gVEVSTSAhPT0gJ2xpbnV4JzsgLy8gTGludXggY29uc29sZSAoa2VybmVsKVxuXHR9XG5cblx0cmV0dXJuIEJvb2xlYW4oZW52LldUX1NFU1NJT04pIC8vIFdpbmRvd3MgVGVybWluYWxcblx0XHR8fCBCb29sZWFuKGVudi5URVJNSU5VU19TVUJMSU1FKSAvLyBUZXJtaW51cyAoPDAuMi4yNylcblx0XHR8fCBlbnYuQ29uRW11VGFzayA9PT0gJ3tjbWQ6OkNtZGVyfScgLy8gQ29uRW11IGFuZCBjbWRlclxuXHRcdHx8IFRFUk1fUFJPR1JBTSA9PT0gJ1Rlcm1pbnVzLVN1YmxpbWUnXG5cdFx0fHwgVEVSTV9QUk9HUkFNID09PSAndnNjb2RlJ1xuXHRcdHx8IFRFUk0gPT09ICd4dGVybS0yNTZjb2xvcidcblx0XHR8fCBURVJNID09PSAnYWxhY3JpdHR5J1xuXHRcdHx8IFRFUk0gPT09ICdyeHZ0LXVuaWNvZGUnXG5cdFx0fHwgVEVSTSA9PT0gJ3J4dnQtdW5pY29kZS0yNTZjb2xvcidcblx0XHR8fCBlbnYuVEVSTUlOQUxfRU1VTEFUT1IgPT09ICdKZXRCcmFpbnMtSmVkaVRlcm0nO1xufVxuIiwgImltcG9ydCBpc1VuaWNvZGVTdXBwb3J0ZWQgZnJvbSAnaXMtdW5pY29kZS1zdXBwb3J0ZWQnO1xuXG5jb25zdCBjb21tb24gPSB7XG5cdGNpcmNsZVF1ZXN0aW9uTWFyazogJyg/KScsXG5cdHF1ZXN0aW9uTWFya1ByZWZpeDogJyg/KScsXG5cdHNxdWFyZTogJ1x1MjU4OCcsXG5cdHNxdWFyZURhcmtTaGFkZTogJ1x1MjU5MycsXG5cdHNxdWFyZU1lZGl1bVNoYWRlOiAnXHUyNTkyJyxcblx0c3F1YXJlTGlnaHRTaGFkZTogJ1x1MjU5MScsXG5cdHNxdWFyZVRvcDogJ1x1MjU4MCcsXG5cdHNxdWFyZUJvdHRvbTogJ1x1MjU4NCcsXG5cdHNxdWFyZUxlZnQ6ICdcdTI1OEMnLFxuXHRzcXVhcmVSaWdodDogJ1x1MjU5MCcsXG5cdHNxdWFyZUNlbnRlcjogJ1x1MjVBMCcsXG5cdGJ1bGxldDogJ1x1MjVDRicsXG5cdGRvdDogJ1x1MjAyNCcsXG5cdGVsbGlwc2lzOiAnXHUyMDI2Jyxcblx0cG9pbnRlclNtYWxsOiAnXHUyMDNBJyxcblx0dHJpYW5nbGVVcDogJ1x1MjVCMicsXG5cdHRyaWFuZ2xlVXBTbWFsbDogJ1x1MjVCNCcsXG5cdHRyaWFuZ2xlRG93bjogJ1x1MjVCQycsXG5cdHRyaWFuZ2xlRG93blNtYWxsOiAnXHUyNUJFJyxcblx0dHJpYW5nbGVMZWZ0U21hbGw6ICdcdTI1QzInLFxuXHR0cmlhbmdsZVJpZ2h0U21hbGw6ICdcdTI1QjgnLFxuXHRob21lOiAnXHUyMzAyJyxcblx0aGVhcnQ6ICdcdTI2NjUnLFxuXHRtdXNpY05vdGU6ICdcdTI2NkEnLFxuXHRtdXNpY05vdGVCZWFtZWQ6ICdcdTI2NkInLFxuXHRhcnJvd1VwOiAnXHUyMTkxJyxcblx0YXJyb3dEb3duOiAnXHUyMTkzJyxcblx0YXJyb3dMZWZ0OiAnXHUyMTkwJyxcblx0YXJyb3dSaWdodDogJ1x1MjE5MicsXG5cdGFycm93TGVmdFJpZ2h0OiAnXHUyMTk0Jyxcblx0YXJyb3dVcERvd246ICdcdTIxOTUnLFxuXHRhbG1vc3RFcXVhbDogJ1x1MjI0OCcsXG5cdG5vdEVxdWFsOiAnXHUyMjYwJyxcblx0bGVzc09yRXF1YWw6ICdcdTIyNjQnLFxuXHRncmVhdGVyT3JFcXVhbDogJ1x1MjI2NScsXG5cdGlkZW50aWNhbDogJ1x1MjI2MScsXG5cdGluZmluaXR5OiAnXHUyMjFFJyxcblx0c3Vic2NyaXB0WmVybzogJ1x1MjA4MCcsXG5cdHN1YnNjcmlwdE9uZTogJ1x1MjA4MScsXG5cdHN1YnNjcmlwdFR3bzogJ1x1MjA4MicsXG5cdHN1YnNjcmlwdFRocmVlOiAnXHUyMDgzJyxcblx0c3Vic2NyaXB0Rm91cjogJ1x1MjA4NCcsXG5cdHN1YnNjcmlwdEZpdmU6ICdcdTIwODUnLFxuXHRzdWJzY3JpcHRTaXg6ICdcdTIwODYnLFxuXHRzdWJzY3JpcHRTZXZlbjogJ1x1MjA4NycsXG5cdHN1YnNjcmlwdEVpZ2h0OiAnXHUyMDg4Jyxcblx0c3Vic2NyaXB0TmluZTogJ1x1MjA4OScsXG5cdG9uZUhhbGY6ICdcdTAwQkQnLFxuXHRvbmVUaGlyZDogJ1x1MjE1MycsXG5cdG9uZVF1YXJ0ZXI6ICdcdTAwQkMnLFxuXHRvbmVGaWZ0aDogJ1x1MjE1NScsXG5cdG9uZVNpeHRoOiAnXHUyMTU5Jyxcblx0b25lRWlnaHRoOiAnXHUyMTVCJyxcblx0dHdvVGhpcmRzOiAnXHUyMTU0Jyxcblx0dHdvRmlmdGhzOiAnXHUyMTU2Jyxcblx0dGhyZWVRdWFydGVyczogJ1x1MDBCRScsXG5cdHRocmVlRmlmdGhzOiAnXHUyMTU3Jyxcblx0dGhyZWVFaWdodGhzOiAnXHUyMTVDJyxcblx0Zm91ckZpZnRoczogJ1x1MjE1OCcsXG5cdGZpdmVTaXh0aHM6ICdcdTIxNUEnLFxuXHRmaXZlRWlnaHRoczogJ1x1MjE1RCcsXG5cdHNldmVuRWlnaHRoczogJ1x1MjE1RScsXG5cdGxpbmU6ICdcdTI1MDAnLFxuXHRsaW5lQm9sZDogJ1x1MjUwMScsXG5cdGxpbmVEb3VibGU6ICdcdTI1NTAnLFxuXHRsaW5lRGFzaGVkMDogJ1x1MjUwNCcsXG5cdGxpbmVEYXNoZWQxOiAnXHUyNTA1Jyxcblx0bGluZURhc2hlZDI6ICdcdTI1MDgnLFxuXHRsaW5lRGFzaGVkMzogJ1x1MjUwOScsXG5cdGxpbmVEYXNoZWQ0OiAnXHUyNTRDJyxcblx0bGluZURhc2hlZDU6ICdcdTI1NEQnLFxuXHRsaW5lRGFzaGVkNjogJ1x1MjU3NCcsXG5cdGxpbmVEYXNoZWQ3OiAnXHUyNTc2Jyxcblx0bGluZURhc2hlZDg6ICdcdTI1NzgnLFxuXHRsaW5lRGFzaGVkOTogJ1x1MjU3QScsXG5cdGxpbmVEYXNoZWQxMDogJ1x1MjU3QycsXG5cdGxpbmVEYXNoZWQxMTogJ1x1MjU3RScsXG5cdGxpbmVEYXNoZWQxMjogJ1x1MjIxMicsXG5cdGxpbmVEYXNoZWQxMzogJ1x1MjAxMycsXG5cdGxpbmVEYXNoZWQxNDogJ1x1MjAxMCcsXG5cdGxpbmVEYXNoZWQxNTogJ1x1MjA0MycsXG5cdGxpbmVWZXJ0aWNhbDogJ1x1MjUwMicsXG5cdGxpbmVWZXJ0aWNhbEJvbGQ6ICdcdTI1MDMnLFxuXHRsaW5lVmVydGljYWxEb3VibGU6ICdcdTI1NTEnLFxuXHRsaW5lVmVydGljYWxEYXNoZWQwOiAnXHUyNTA2Jyxcblx0bGluZVZlcnRpY2FsRGFzaGVkMTogJ1x1MjUwNycsXG5cdGxpbmVWZXJ0aWNhbERhc2hlZDI6ICdcdTI1MEEnLFxuXHRsaW5lVmVydGljYWxEYXNoZWQzOiAnXHUyNTBCJyxcblx0bGluZVZlcnRpY2FsRGFzaGVkNDogJ1x1MjU0RScsXG5cdGxpbmVWZXJ0aWNhbERhc2hlZDU6ICdcdTI1NEYnLFxuXHRsaW5lVmVydGljYWxEYXNoZWQ2OiAnXHUyNTc1Jyxcblx0bGluZVZlcnRpY2FsRGFzaGVkNzogJ1x1MjU3NycsXG5cdGxpbmVWZXJ0aWNhbERhc2hlZDg6ICdcdTI1NzknLFxuXHRsaW5lVmVydGljYWxEYXNoZWQ5OiAnXHUyNTdCJyxcblx0bGluZVZlcnRpY2FsRGFzaGVkMTA6ICdcdTI1N0QnLFxuXHRsaW5lVmVydGljYWxEYXNoZWQxMTogJ1x1MjU3RicsXG5cdGxpbmVEb3duTGVmdDogJ1x1MjUxMCcsXG5cdGxpbmVEb3duTGVmdEFyYzogJ1x1MjU2RScsXG5cdGxpbmVEb3duQm9sZExlZnRCb2xkOiAnXHUyNTEzJyxcblx0bGluZURvd25Cb2xkTGVmdDogJ1x1MjUxMicsXG5cdGxpbmVEb3duTGVmdEJvbGQ6ICdcdTI1MTEnLFxuXHRsaW5lRG93bkRvdWJsZUxlZnREb3VibGU6ICdcdTI1NTcnLFxuXHRsaW5lRG93bkRvdWJsZUxlZnQ6ICdcdTI1NTYnLFxuXHRsaW5lRG93bkxlZnREb3VibGU6ICdcdTI1NTUnLFxuXHRsaW5lRG93blJpZ2h0OiAnXHUyNTBDJyxcblx0bGluZURvd25SaWdodEFyYzogJ1x1MjU2RCcsXG5cdGxpbmVEb3duQm9sZFJpZ2h0Qm9sZDogJ1x1MjUwRicsXG5cdGxpbmVEb3duQm9sZFJpZ2h0OiAnXHUyNTBFJyxcblx0bGluZURvd25SaWdodEJvbGQ6ICdcdTI1MEQnLFxuXHRsaW5lRG93bkRvdWJsZVJpZ2h0RG91YmxlOiAnXHUyNTU0Jyxcblx0bGluZURvd25Eb3VibGVSaWdodDogJ1x1MjU1MycsXG5cdGxpbmVEb3duUmlnaHREb3VibGU6ICdcdTI1NTInLFxuXHRsaW5lVXBMZWZ0OiAnXHUyNTE4Jyxcblx0bGluZVVwTGVmdEFyYzogJ1x1MjU2RicsXG5cdGxpbmVVcEJvbGRMZWZ0Qm9sZDogJ1x1MjUxQicsXG5cdGxpbmVVcEJvbGRMZWZ0OiAnXHUyNTFBJyxcblx0bGluZVVwTGVmdEJvbGQ6ICdcdTI1MTknLFxuXHRsaW5lVXBEb3VibGVMZWZ0RG91YmxlOiAnXHUyNTVEJyxcblx0bGluZVVwRG91YmxlTGVmdDogJ1x1MjU1QycsXG5cdGxpbmVVcExlZnREb3VibGU6ICdcdTI1NUInLFxuXHRsaW5lVXBSaWdodDogJ1x1MjUxNCcsXG5cdGxpbmVVcFJpZ2h0QXJjOiAnXHUyNTcwJyxcblx0bGluZVVwQm9sZFJpZ2h0Qm9sZDogJ1x1MjUxNycsXG5cdGxpbmVVcEJvbGRSaWdodDogJ1x1MjUxNicsXG5cdGxpbmVVcFJpZ2h0Qm9sZDogJ1x1MjUxNScsXG5cdGxpbmVVcERvdWJsZVJpZ2h0RG91YmxlOiAnXHUyNTVBJyxcblx0bGluZVVwRG91YmxlUmlnaHQ6ICdcdTI1NTknLFxuXHRsaW5lVXBSaWdodERvdWJsZTogJ1x1MjU1OCcsXG5cdGxpbmVVcERvd25MZWZ0OiAnXHUyNTI0Jyxcblx0bGluZVVwQm9sZERvd25Cb2xkTGVmdEJvbGQ6ICdcdTI1MkInLFxuXHRsaW5lVXBCb2xkRG93bkJvbGRMZWZ0OiAnXHUyNTI4Jyxcblx0bGluZVVwRG93bkxlZnRCb2xkOiAnXHUyNTI1Jyxcblx0bGluZVVwQm9sZERvd25MZWZ0Qm9sZDogJ1x1MjUyOScsXG5cdGxpbmVVcERvd25Cb2xkTGVmdEJvbGQ6ICdcdTI1MkEnLFxuXHRsaW5lVXBEb3duQm9sZExlZnQ6ICdcdTI1MjcnLFxuXHRsaW5lVXBCb2xkRG93bkxlZnQ6ICdcdTI1MjYnLFxuXHRsaW5lVXBEb3VibGVEb3duRG91YmxlTGVmdERvdWJsZTogJ1x1MjU2MycsXG5cdGxpbmVVcERvdWJsZURvd25Eb3VibGVMZWZ0OiAnXHUyNTYyJyxcblx0bGluZVVwRG93bkxlZnREb3VibGU6ICdcdTI1NjEnLFxuXHRsaW5lVXBEb3duUmlnaHQ6ICdcdTI1MUMnLFxuXHRsaW5lVXBCb2xkRG93bkJvbGRSaWdodEJvbGQ6ICdcdTI1MjMnLFxuXHRsaW5lVXBCb2xkRG93bkJvbGRSaWdodDogJ1x1MjUyMCcsXG5cdGxpbmVVcERvd25SaWdodEJvbGQ6ICdcdTI1MUQnLFxuXHRsaW5lVXBCb2xkRG93blJpZ2h0Qm9sZDogJ1x1MjUyMScsXG5cdGxpbmVVcERvd25Cb2xkUmlnaHRCb2xkOiAnXHUyNTIyJyxcblx0bGluZVVwRG93bkJvbGRSaWdodDogJ1x1MjUxRicsXG5cdGxpbmVVcEJvbGREb3duUmlnaHQ6ICdcdTI1MUUnLFxuXHRsaW5lVXBEb3VibGVEb3duRG91YmxlUmlnaHREb3VibGU6ICdcdTI1NjAnLFxuXHRsaW5lVXBEb3VibGVEb3duRG91YmxlUmlnaHQ6ICdcdTI1NUYnLFxuXHRsaW5lVXBEb3duUmlnaHREb3VibGU6ICdcdTI1NUUnLFxuXHRsaW5lRG93bkxlZnRSaWdodDogJ1x1MjUyQycsXG5cdGxpbmVEb3duQm9sZExlZnRCb2xkUmlnaHRCb2xkOiAnXHUyNTMzJyxcblx0bGluZURvd25MZWZ0Qm9sZFJpZ2h0Qm9sZDogJ1x1MjUyRicsXG5cdGxpbmVEb3duQm9sZExlZnRSaWdodDogJ1x1MjUzMCcsXG5cdGxpbmVEb3duQm9sZExlZnRCb2xkUmlnaHQ6ICdcdTI1MzEnLFxuXHRsaW5lRG93bkJvbGRMZWZ0UmlnaHRCb2xkOiAnXHUyNTMyJyxcblx0bGluZURvd25MZWZ0UmlnaHRCb2xkOiAnXHUyNTJFJyxcblx0bGluZURvd25MZWZ0Qm9sZFJpZ2h0OiAnXHUyNTJEJyxcblx0bGluZURvd25Eb3VibGVMZWZ0RG91YmxlUmlnaHREb3VibGU6ICdcdTI1NjYnLFxuXHRsaW5lRG93bkRvdWJsZUxlZnRSaWdodDogJ1x1MjU2NScsXG5cdGxpbmVEb3duTGVmdERvdWJsZVJpZ2h0RG91YmxlOiAnXHUyNTY0Jyxcblx0bGluZVVwTGVmdFJpZ2h0OiAnXHUyNTM0Jyxcblx0bGluZVVwQm9sZExlZnRCb2xkUmlnaHRCb2xkOiAnXHUyNTNCJyxcblx0bGluZVVwTGVmdEJvbGRSaWdodEJvbGQ6ICdcdTI1MzcnLFxuXHRsaW5lVXBCb2xkTGVmdFJpZ2h0OiAnXHUyNTM4Jyxcblx0bGluZVVwQm9sZExlZnRCb2xkUmlnaHQ6ICdcdTI1MzknLFxuXHRsaW5lVXBCb2xkTGVmdFJpZ2h0Qm9sZDogJ1x1MjUzQScsXG5cdGxpbmVVcExlZnRSaWdodEJvbGQ6ICdcdTI1MzYnLFxuXHRsaW5lVXBMZWZ0Qm9sZFJpZ2h0OiAnXHUyNTM1Jyxcblx0bGluZVVwRG91YmxlTGVmdERvdWJsZVJpZ2h0RG91YmxlOiAnXHUyNTY5Jyxcblx0bGluZVVwRG91YmxlTGVmdFJpZ2h0OiAnXHUyNTY4Jyxcblx0bGluZVVwTGVmdERvdWJsZVJpZ2h0RG91YmxlOiAnXHUyNTY3Jyxcblx0bGluZVVwRG93bkxlZnRSaWdodDogJ1x1MjUzQycsXG5cdGxpbmVVcEJvbGREb3duQm9sZExlZnRCb2xkUmlnaHRCb2xkOiAnXHUyNTRCJyxcblx0bGluZVVwRG93bkJvbGRMZWZ0Qm9sZFJpZ2h0Qm9sZDogJ1x1MjU0OCcsXG5cdGxpbmVVcEJvbGREb3duTGVmdEJvbGRSaWdodEJvbGQ6ICdcdTI1NDcnLFxuXHRsaW5lVXBCb2xkRG93bkJvbGRMZWZ0UmlnaHRCb2xkOiAnXHUyNTRBJyxcblx0bGluZVVwQm9sZERvd25Cb2xkTGVmdEJvbGRSaWdodDogJ1x1MjU0OScsXG5cdGxpbmVVcEJvbGREb3duTGVmdFJpZ2h0OiAnXHUyNTQwJyxcblx0bGluZVVwRG93bkJvbGRMZWZ0UmlnaHQ6ICdcdTI1NDEnLFxuXHRsaW5lVXBEb3duTGVmdEJvbGRSaWdodDogJ1x1MjUzRCcsXG5cdGxpbmVVcERvd25MZWZ0UmlnaHRCb2xkOiAnXHUyNTNFJyxcblx0bGluZVVwQm9sZERvd25Cb2xkTGVmdFJpZ2h0OiAnXHUyNTQyJyxcblx0bGluZVVwRG93bkxlZnRCb2xkUmlnaHRCb2xkOiAnXHUyNTNGJyxcblx0bGluZVVwQm9sZERvd25MZWZ0Qm9sZFJpZ2h0OiAnXHUyNTQzJyxcblx0bGluZVVwQm9sZERvd25MZWZ0UmlnaHRCb2xkOiAnXHUyNTQ0Jyxcblx0bGluZVVwRG93bkJvbGRMZWZ0Qm9sZFJpZ2h0OiAnXHUyNTQ1Jyxcblx0bGluZVVwRG93bkJvbGRMZWZ0UmlnaHRCb2xkOiAnXHUyNTQ2Jyxcblx0bGluZVVwRG91YmxlRG93bkRvdWJsZUxlZnREb3VibGVSaWdodERvdWJsZTogJ1x1MjU2QycsXG5cdGxpbmVVcERvdWJsZURvd25Eb3VibGVMZWZ0UmlnaHQ6ICdcdTI1NkInLFxuXHRsaW5lVXBEb3duTGVmdERvdWJsZVJpZ2h0RG91YmxlOiAnXHUyNTZBJyxcblx0bGluZUNyb3NzOiAnXHUyNTczJyxcblx0bGluZUJhY2tzbGFzaDogJ1x1MjU3MicsXG5cdGxpbmVTbGFzaDogJ1x1MjU3MScsXG59O1xuXG5jb25zdCBzcGVjaWFsTWFpblN5bWJvbHMgPSB7XG5cdHRpY2s6ICdcdTI3MTQnLFxuXHRpbmZvOiAnXHUyMTM5Jyxcblx0d2FybmluZzogJ1x1MjZBMCcsXG5cdGNyb3NzOiAnXHUyNzE4Jyxcblx0c3F1YXJlU21hbGw6ICdcdTI1RkInLFxuXHRzcXVhcmVTbWFsbEZpbGxlZDogJ1x1MjVGQycsXG5cdGNpcmNsZTogJ1x1MjVFRicsXG5cdGNpcmNsZUZpbGxlZDogJ1x1MjVDOScsXG5cdGNpcmNsZURvdHRlZDogJ1x1MjVDQycsXG5cdGNpcmNsZURvdWJsZTogJ1x1MjVDRScsXG5cdGNpcmNsZUNpcmNsZTogJ1x1MjRERScsXG5cdGNpcmNsZUNyb3NzOiAnXHUyNEU3Jyxcblx0Y2lyY2xlUGlwZTogJ1x1MjRCRScsXG5cdHJhZGlvT246ICdcdTI1QzknLFxuXHRyYWRpb09mZjogJ1x1MjVFRicsXG5cdGNoZWNrYm94T246ICdcdTI2MTInLFxuXHRjaGVja2JveE9mZjogJ1x1MjYxMCcsXG5cdGNoZWNrYm94Q2lyY2xlT246ICdcdTI0RTcnLFxuXHRjaGVja2JveENpcmNsZU9mZjogJ1x1MjRCRScsXG5cdHBvaW50ZXI6ICdcdTI3NkYnLFxuXHR0cmlhbmdsZVVwT3V0bGluZTogJ1x1MjVCMycsXG5cdHRyaWFuZ2xlTGVmdDogJ1x1MjVDMCcsXG5cdHRyaWFuZ2xlUmlnaHQ6ICdcdTI1QjYnLFxuXHRsb3plbmdlOiAnXHUyNUM2Jyxcblx0bG96ZW5nZU91dGxpbmU6ICdcdTI1QzcnLFxuXHRoYW1idXJnZXI6ICdcdTI2MzAnLFxuXHRzbWlsZXk6ICdcdTMyRTEnLFxuXHRtdXN0YWNoZTogJ1x1MERGNCcsXG5cdHN0YXI6ICdcdTI2MDUnLFxuXHRwbGF5OiAnXHUyNUI2Jyxcblx0bm9kZWpzOiAnXHUyQjIyJyxcblx0b25lU2V2ZW50aDogJ1x1MjE1MCcsXG5cdG9uZU5pbnRoOiAnXHUyMTUxJyxcblx0b25lVGVudGg6ICdcdTIxNTInLFxufTtcblxuY29uc3Qgc3BlY2lhbEZhbGxiYWNrU3ltYm9scyA9IHtcblx0dGljazogJ1x1MjIxQScsXG5cdGluZm86ICdpJyxcblx0d2FybmluZzogJ1x1MjAzQycsXG5cdGNyb3NzOiAnXHUwMEQ3Jyxcblx0c3F1YXJlU21hbGw6ICdcdTI1QTEnLFxuXHRzcXVhcmVTbWFsbEZpbGxlZDogJ1x1MjVBMCcsXG5cdGNpcmNsZTogJyggKScsXG5cdGNpcmNsZUZpbGxlZDogJygqKScsXG5cdGNpcmNsZURvdHRlZDogJyggKScsXG5cdGNpcmNsZURvdWJsZTogJyggKScsXG5cdGNpcmNsZUNpcmNsZTogJyhcdTI1Q0IpJyxcblx0Y2lyY2xlQ3Jvc3M6ICcoXHUwMEQ3KScsXG5cdGNpcmNsZVBpcGU6ICcoXHUyNTAyKScsXG5cdHJhZGlvT246ICcoKiknLFxuXHRyYWRpb09mZjogJyggKScsXG5cdGNoZWNrYm94T246ICdbXHUwMEQ3XScsXG5cdGNoZWNrYm94T2ZmOiAnWyBdJyxcblx0Y2hlY2tib3hDaXJjbGVPbjogJyhcdTAwRDcpJyxcblx0Y2hlY2tib3hDaXJjbGVPZmY6ICcoICknLFxuXHRwb2ludGVyOiAnPicsXG5cdHRyaWFuZ2xlVXBPdXRsaW5lOiAnXHUyMjA2Jyxcblx0dHJpYW5nbGVMZWZ0OiAnXHUyNUM0Jyxcblx0dHJpYW5nbGVSaWdodDogJ1x1MjVCQScsXG5cdGxvemVuZ2U6ICdcdTI2NjYnLFxuXHRsb3plbmdlT3V0bGluZTogJ1x1MjVDQScsXG5cdGhhbWJ1cmdlcjogJ1x1MjI2MScsXG5cdHNtaWxleTogJ1x1MjYzQScsXG5cdG11c3RhY2hlOiAnXHUyNTBDXHUyNTAwXHUyNTEwJyxcblx0c3RhcjogJ1x1MjczNicsXG5cdHBsYXk6ICdcdTI1QkEnLFxuXHRub2RlanM6ICdcdTI2NjYnLFxuXHRvbmVTZXZlbnRoOiAnMS83Jyxcblx0b25lTmludGg6ICcxLzknLFxuXHRvbmVUZW50aDogJzEvMTAnLFxufTtcblxuZXhwb3J0IGNvbnN0IG1haW5TeW1ib2xzID0gey4uLmNvbW1vbiwgLi4uc3BlY2lhbE1haW5TeW1ib2xzfTtcbmV4cG9ydCBjb25zdCBmYWxsYmFja1N5bWJvbHMgPSB7Li4uY29tbW9uLCAuLi5zcGVjaWFsRmFsbGJhY2tTeW1ib2xzfTtcblxuY29uc3Qgc2hvdWxkVXNlTWFpbiA9IGlzVW5pY29kZVN1cHBvcnRlZCgpO1xuY29uc3QgZmlndXJlcyA9IHNob3VsZFVzZU1haW4gPyBtYWluU3ltYm9scyA6IGZhbGxiYWNrU3ltYm9scztcbmV4cG9ydCBkZWZhdWx0IGZpZ3VyZXM7XG5cbmNvbnN0IHJlcGxhY2VtZW50cyA9IE9iamVjdC5lbnRyaWVzKHNwZWNpYWxNYWluU3ltYm9scyk7XG5cbi8vIE9uIHRlcm1pbmFscyB3aGljaCBkbyBub3Qgc3VwcG9ydCBVbmljb2RlIHN5bWJvbHMsIHN1YnN0aXR1dGUgdGhlbSB0byBvdGhlciBzeW1ib2xzXG5leHBvcnQgY29uc3QgcmVwbGFjZVN5bWJvbHMgPSAoc3RyaW5nLCB7dXNlRmFsbGJhY2sgPSAhc2hvdWxkVXNlTWFpbn0gPSB7fSkgPT4ge1xuXHRpZiAodXNlRmFsbGJhY2spIHtcblx0XHRmb3IgKGNvbnN0IFtrZXksIG1haW5TeW1ib2xdIG9mIHJlcGxhY2VtZW50cykge1xuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2VBbGwobWFpblN5bWJvbCwgZmFsbGJhY2tTeW1ib2xzW2tleV0pO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBzdHJpbmc7XG59O1xuIiwgImltcG9ydCB0dHkgZnJvbSAnbm9kZTp0dHknO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8td2FybmluZy1jb21tZW50c1xuLy8gVE9ETzogVXNlIGEgYmV0dGVyIG1ldGhvZCB3aGVuIGl0J3MgYWRkZWQgdG8gTm9kZS5qcyAoaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL3B1bGwvNDAyNDApXG4vLyBMb3RzIG9mIG9wdGlvbmFscyBoZXJlIHRvIHN1cHBvcnQgRGVuby5cbmNvbnN0IGhhc0NvbG9ycyA9IHR0eT8uV3JpdGVTdHJlYW0/LnByb3RvdHlwZT8uaGFzQ29sb3JzPy4oKSA/PyBmYWxzZTtcblxuY29uc3QgZm9ybWF0ID0gKG9wZW4sIGNsb3NlKSA9PiB7XG5cdGlmICghaGFzQ29sb3JzKSB7XG5cdFx0cmV0dXJuIGlucHV0ID0+IGlucHV0O1xuXHR9XG5cblx0Y29uc3Qgb3BlbkNvZGUgPSBgXFx1MDAxQlske29wZW59bWA7XG5cdGNvbnN0IGNsb3NlQ29kZSA9IGBcXHUwMDFCWyR7Y2xvc2V9bWA7XG5cblx0cmV0dXJuIGlucHV0ID0+IHtcblx0XHRjb25zdCBzdHJpbmcgPSBpbnB1dCArICcnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWltcGxpY2l0LWNvZXJjaW9uIC0tIFRoaXMgaXMgZmFzdGVyLlxuXHRcdGxldCBpbmRleCA9IHN0cmluZy5pbmRleE9mKGNsb3NlQ29kZSk7XG5cblx0XHRpZiAoaW5kZXggPT09IC0xKSB7XG5cdFx0XHQvLyBOb3RlOiBJbnRlbnRpb25hbGx5IG5vdCB1c2luZyBzdHJpbmcgaW50ZXJwb2xhdGlvbiBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucy5cblx0XHRcdHJldHVybiBvcGVuQ29kZSArIHN0cmluZyArIGNsb3NlQ29kZTtcblx0XHR9XG5cblx0XHQvLyBIYW5kbGUgbmVzdGVkIGNvbG9ycy5cblxuXHRcdC8vIFdlIGNvdWxkIGhhdmUgZG9uZSB0aGlzLCBidXQgaXQncyB0b28gc2xvdyAoYXMgb2YgTm9kZS5qcyAyMikuXG5cdFx0Ly8gcmV0dXJuIG9wZW5Db2RlICsgc3RyaW5nLnJlcGxhY2VBbGwoY2xvc2VDb2RlLCBvcGVuQ29kZSkgKyBjbG9zZUNvZGU7XG5cblx0XHRsZXQgcmVzdWx0ID0gb3BlbkNvZGU7XG5cdFx0bGV0IGxhc3RJbmRleCA9IDA7XG5cblx0XHR3aGlsZSAoaW5kZXggIT09IC0xKSB7XG5cdFx0XHRyZXN1bHQgKz0gc3RyaW5nLnNsaWNlKGxhc3RJbmRleCwgaW5kZXgpICsgb3BlbkNvZGU7XG5cdFx0XHRsYXN0SW5kZXggPSBpbmRleCArIGNsb3NlQ29kZS5sZW5ndGg7XG5cdFx0XHRpbmRleCA9IHN0cmluZy5pbmRleE9mKGNsb3NlQ29kZSwgbGFzdEluZGV4KTtcblx0XHR9XG5cblx0XHRyZXN1bHQgKz0gc3RyaW5nLnNsaWNlKGxhc3RJbmRleCkgKyBjbG9zZUNvZGU7XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9O1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc2V0ID0gZm9ybWF0KDAsIDApO1xuZXhwb3J0IGNvbnN0IGJvbGQgPSBmb3JtYXQoMSwgMjIpO1xuZXhwb3J0IGNvbnN0IGRpbSA9IGZvcm1hdCgyLCAyMik7XG5leHBvcnQgY29uc3QgaXRhbGljID0gZm9ybWF0KDMsIDIzKTtcbmV4cG9ydCBjb25zdCB1bmRlcmxpbmUgPSBmb3JtYXQoNCwgMjQpO1xuZXhwb3J0IGNvbnN0IG92ZXJsaW5lID0gZm9ybWF0KDUzLCA1NSk7XG5leHBvcnQgY29uc3QgaW52ZXJzZSA9IGZvcm1hdCg3LCAyNyk7XG5leHBvcnQgY29uc3QgaGlkZGVuID0gZm9ybWF0KDgsIDI4KTtcbmV4cG9ydCBjb25zdCBzdHJpa2V0aHJvdWdoID0gZm9ybWF0KDksIDI5KTtcblxuZXhwb3J0IGNvbnN0IGJsYWNrID0gZm9ybWF0KDMwLCAzOSk7XG5leHBvcnQgY29uc3QgcmVkID0gZm9ybWF0KDMxLCAzOSk7XG5leHBvcnQgY29uc3QgZ3JlZW4gPSBmb3JtYXQoMzIsIDM5KTtcbmV4cG9ydCBjb25zdCB5ZWxsb3cgPSBmb3JtYXQoMzMsIDM5KTtcbmV4cG9ydCBjb25zdCBibHVlID0gZm9ybWF0KDM0LCAzOSk7XG5leHBvcnQgY29uc3QgbWFnZW50YSA9IGZvcm1hdCgzNSwgMzkpO1xuZXhwb3J0IGNvbnN0IGN5YW4gPSBmb3JtYXQoMzYsIDM5KTtcbmV4cG9ydCBjb25zdCB3aGl0ZSA9IGZvcm1hdCgzNywgMzkpO1xuZXhwb3J0IGNvbnN0IGdyYXkgPSBmb3JtYXQoOTAsIDM5KTtcblxuZXhwb3J0IGNvbnN0IGJnQmxhY2sgPSBmb3JtYXQoNDAsIDQ5KTtcbmV4cG9ydCBjb25zdCBiZ1JlZCA9IGZvcm1hdCg0MSwgNDkpO1xuZXhwb3J0IGNvbnN0IGJnR3JlZW4gPSBmb3JtYXQoNDIsIDQ5KTtcbmV4cG9ydCBjb25zdCBiZ1llbGxvdyA9IGZvcm1hdCg0MywgNDkpO1xuZXhwb3J0IGNvbnN0IGJnQmx1ZSA9IGZvcm1hdCg0NCwgNDkpO1xuZXhwb3J0IGNvbnN0IGJnTWFnZW50YSA9IGZvcm1hdCg0NSwgNDkpO1xuZXhwb3J0IGNvbnN0IGJnQ3lhbiA9IGZvcm1hdCg0NiwgNDkpO1xuZXhwb3J0IGNvbnN0IGJnV2hpdGUgPSBmb3JtYXQoNDcsIDQ5KTtcbmV4cG9ydCBjb25zdCBiZ0dyYXkgPSBmb3JtYXQoMTAwLCA0OSk7XG5cbmV4cG9ydCBjb25zdCByZWRCcmlnaHQgPSBmb3JtYXQoOTEsIDM5KTtcbmV4cG9ydCBjb25zdCBncmVlbkJyaWdodCA9IGZvcm1hdCg5MiwgMzkpO1xuZXhwb3J0IGNvbnN0IHllbGxvd0JyaWdodCA9IGZvcm1hdCg5MywgMzkpO1xuZXhwb3J0IGNvbnN0IGJsdWVCcmlnaHQgPSBmb3JtYXQoOTQsIDM5KTtcbmV4cG9ydCBjb25zdCBtYWdlbnRhQnJpZ2h0ID0gZm9ybWF0KDk1LCAzOSk7XG5leHBvcnQgY29uc3QgY3lhbkJyaWdodCA9IGZvcm1hdCg5NiwgMzkpO1xuZXhwb3J0IGNvbnN0IHdoaXRlQnJpZ2h0ID0gZm9ybWF0KDk3LCAzOSk7XG5cbmV4cG9ydCBjb25zdCBiZ1JlZEJyaWdodCA9IGZvcm1hdCgxMDEsIDQ5KTtcbmV4cG9ydCBjb25zdCBiZ0dyZWVuQnJpZ2h0ID0gZm9ybWF0KDEwMiwgNDkpO1xuZXhwb3J0IGNvbnN0IGJnWWVsbG93QnJpZ2h0ID0gZm9ybWF0KDEwMywgNDkpO1xuZXhwb3J0IGNvbnN0IGJnQmx1ZUJyaWdodCA9IGZvcm1hdCgxMDQsIDQ5KTtcbmV4cG9ydCBjb25zdCBiZ01hZ2VudGFCcmlnaHQgPSBmb3JtYXQoMTA1LCA0OSk7XG5leHBvcnQgY29uc3QgYmdDeWFuQnJpZ2h0ID0gZm9ybWF0KDEwNiwgNDkpO1xuZXhwb3J0IGNvbnN0IGJnV2hpdGVCcmlnaHQgPSBmb3JtYXQoMTA3LCA0OSk7XG4iLCAiZXhwb3J0ICogZnJvbSAnLi9iYXNlLmpzJztcbmV4cG9ydCAqIGFzIGRlZmF1bHQgZnJvbSAnLi9iYXNlLmpzJztcbiIsICJpbXBvcnQgZmlndXJlcyBmcm9tICdmaWd1cmVzJztcbmltcG9ydCB7XG5cdGdyYXksXG5cdGJvbGQsXG5cdHJlZEJyaWdodCxcblx0eWVsbG93QnJpZ2h0LFxufSBmcm9tICd5b2N0b2NvbG9ycyc7XG5cbi8vIERlZmF1bHQgd2hlbiBgdmVyYm9zZWAgaXMgbm90IGEgZnVuY3Rpb25cbmV4cG9ydCBjb25zdCBkZWZhdWx0VmVyYm9zZUZ1bmN0aW9uID0gKHtcblx0dHlwZSxcblx0bWVzc2FnZSxcblx0dGltZXN0YW1wLFxuXHRwaXBlZCxcblx0Y29tbWFuZElkLFxuXHRyZXN1bHQ6IHtmYWlsZWQgPSBmYWxzZX0gPSB7fSxcblx0b3B0aW9uczoge3JlamVjdCA9IHRydWV9LFxufSkgPT4ge1xuXHRjb25zdCB0aW1lc3RhbXBTdHJpbmcgPSBzZXJpYWxpemVUaW1lc3RhbXAodGltZXN0YW1wKTtcblx0Y29uc3QgaWNvbiA9IElDT05TW3R5cGVdKHtmYWlsZWQsIHJlamVjdCwgcGlwZWR9KTtcblx0Y29uc3QgY29sb3IgPSBDT0xPUlNbdHlwZV0oe3JlamVjdH0pO1xuXHRyZXR1cm4gYCR7Z3JheShgWyR7dGltZXN0YW1wU3RyaW5nfV1gKX0gJHtncmF5KGBbJHtjb21tYW5kSWR9XWApfSAke2NvbG9yKGljb24pfSAke2NvbG9yKG1lc3NhZ2UpfWA7XG59O1xuXG4vLyBQcmVwZW5kaW5nIHRoZSB0aW1lc3RhbXAgYWxsb3dzIGRlYnVnZ2luZyB0aGUgc2xvdyBwYXRocyBvZiBhIHN1YnByb2Nlc3NcbmNvbnN0IHNlcmlhbGl6ZVRpbWVzdGFtcCA9IHRpbWVzdGFtcCA9PiBgJHtwYWRGaWVsZCh0aW1lc3RhbXAuZ2V0SG91cnMoKSwgMil9OiR7cGFkRmllbGQodGltZXN0YW1wLmdldE1pbnV0ZXMoKSwgMil9OiR7cGFkRmllbGQodGltZXN0YW1wLmdldFNlY29uZHMoKSwgMil9LiR7cGFkRmllbGQodGltZXN0YW1wLmdldE1pbGxpc2Vjb25kcygpLCAzKX1gO1xuXG5jb25zdCBwYWRGaWVsZCA9IChmaWVsZCwgcGFkZGluZykgPT4gU3RyaW5nKGZpZWxkKS5wYWRTdGFydChwYWRkaW5nLCAnMCcpO1xuXG5jb25zdCBnZXRGaW5hbEljb24gPSAoe2ZhaWxlZCwgcmVqZWN0fSkgPT4ge1xuXHRpZiAoIWZhaWxlZCkge1xuXHRcdHJldHVybiBmaWd1cmVzLnRpY2s7XG5cdH1cblxuXHRyZXR1cm4gcmVqZWN0ID8gZmlndXJlcy5jcm9zcyA6IGZpZ3VyZXMud2FybmluZztcbn07XG5cbmNvbnN0IElDT05TID0ge1xuXHRjb21tYW5kOiAoe3BpcGVkfSkgPT4gcGlwZWQgPyAnfCcgOiAnJCcsXG5cdG91dHB1dDogKCkgPT4gJyAnLFxuXHRpcGM6ICgpID0+ICcqJyxcblx0ZXJyb3I6IGdldEZpbmFsSWNvbixcblx0ZHVyYXRpb246IGdldEZpbmFsSWNvbixcbn07XG5cbmNvbnN0IGlkZW50aXR5ID0gc3RyaW5nID0+IHN0cmluZztcblxuY29uc3QgQ09MT1JTID0ge1xuXHRjb21tYW5kOiAoKSA9PiBib2xkLFxuXHRvdXRwdXQ6ICgpID0+IGlkZW50aXR5LFxuXHRpcGM6ICgpID0+IGlkZW50aXR5LFxuXHRlcnJvcjogKHtyZWplY3R9KSA9PiByZWplY3QgPyByZWRCcmlnaHQgOiB5ZWxsb3dCcmlnaHQsXG5cdGR1cmF0aW9uOiAoKSA9PiBncmF5LFxufTtcbiIsICJpbXBvcnQge2dldFZlcmJvc2VGdW5jdGlvbn0gZnJvbSAnLi92YWx1ZXMuanMnO1xuXG4vLyBBcHBseSB0aGUgYHZlcmJvc2VgIGZ1bmN0aW9uIG9uIGVhY2ggbGluZVxuZXhwb3J0IGNvbnN0IGFwcGx5VmVyYm9zZU9uTGluZXMgPSAocHJpbnRlZExpbmVzLCB2ZXJib3NlSW5mbywgZmROdW1iZXIpID0+IHtcblx0Y29uc3QgdmVyYm9zZUZ1bmN0aW9uID0gZ2V0VmVyYm9zZUZ1bmN0aW9uKHZlcmJvc2VJbmZvLCBmZE51bWJlcik7XG5cdHJldHVybiBwcmludGVkTGluZXNcblx0XHQubWFwKCh7dmVyYm9zZUxpbmUsIHZlcmJvc2VPYmplY3R9KSA9PiBhcHBseVZlcmJvc2VGdW5jdGlvbih2ZXJib3NlTGluZSwgdmVyYm9zZU9iamVjdCwgdmVyYm9zZUZ1bmN0aW9uKSlcblx0XHQuZmlsdGVyKHByaW50ZWRMaW5lID0+IHByaW50ZWRMaW5lICE9PSB1bmRlZmluZWQpXG5cdFx0Lm1hcChwcmludGVkTGluZSA9PiBhcHBlbmROZXdsaW5lKHByaW50ZWRMaW5lKSlcblx0XHQuam9pbignJyk7XG59O1xuXG5jb25zdCBhcHBseVZlcmJvc2VGdW5jdGlvbiA9ICh2ZXJib3NlTGluZSwgdmVyYm9zZU9iamVjdCwgdmVyYm9zZUZ1bmN0aW9uKSA9PiB7XG5cdGlmICh2ZXJib3NlRnVuY3Rpb24gPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiB2ZXJib3NlTGluZTtcblx0fVxuXG5cdGNvbnN0IHByaW50ZWRMaW5lID0gdmVyYm9zZUZ1bmN0aW9uKHZlcmJvc2VMaW5lLCB2ZXJib3NlT2JqZWN0KTtcblx0aWYgKHR5cGVvZiBwcmludGVkTGluZSA9PT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gcHJpbnRlZExpbmU7XG5cdH1cbn07XG5cbmNvbnN0IGFwcGVuZE5ld2xpbmUgPSBwcmludGVkTGluZSA9PiBwcmludGVkTGluZS5lbmRzV2l0aCgnXFxuJylcblx0PyBwcmludGVkTGluZVxuXHQ6IGAke3ByaW50ZWRMaW5lfVxcbmA7XG4iLCAiaW1wb3J0IHtpbnNwZWN0fSBmcm9tICdub2RlOnV0aWwnO1xuaW1wb3J0IHtlc2NhcGVMaW5lc30gZnJvbSAnLi4vYXJndW1lbnRzL2VzY2FwZS5qcyc7XG5pbXBvcnQge2RlZmF1bHRWZXJib3NlRnVuY3Rpb259IGZyb20gJy4vZGVmYXVsdC5qcyc7XG5pbXBvcnQge2FwcGx5VmVyYm9zZU9uTGluZXN9IGZyb20gJy4vY3VzdG9tLmpzJztcblxuLy8gVGhpcyBwcmludHMgb24gc3RkZXJyLlxuLy8gSWYgdGhlIHN1YnByb2Nlc3MgcHJpbnRzIG9uIHN0ZG91dCBhbmQgaXMgdXNpbmcgYHN0ZG91dDogJ2luaGVyaXQnYCxcbi8vIHRoZXJlIGlzIGEgY2hhbmNlIGJvdGggd3JpdGVzIHdpbGwgY29tcGV0ZSAoaW50cm9kdWNpbmcgYSByYWNlIGNvbmRpdGlvbikuXG4vLyBUaGlzIG1lYW5zIHRoZWlyIHJlc3BlY3RpdmUgb3JkZXIgaXMgbm90IGRldGVybWluaXN0aWMuXG4vLyBJbiBwYXJ0aWN1bGFyLCB0aGlzIG1lYW5zIHRoZSB2ZXJib3NlIGNvbW1hbmQgbGluZXMgbWlnaHQgYmUgYWZ0ZXIgdGhlIHN0YXJ0IG9mIHRoZSBzdWJwcm9jZXNzIG91dHB1dC5cbi8vIFVzaW5nIHN5bmNocm9ub3VzIEkvTyBkb2VzIG5vdCBzb2x2ZSB0aGlzIHByb2JsZW0uXG4vLyBIb3dldmVyLCB0aGlzIG9ubHkgc2VlbXMgdG8gaGFwcGVuIHdoZW4gdGhlIHN0ZG91dC9zdGRlcnIgdGFyZ2V0XG4vLyAoZS5nLiBhIHRlcm1pbmFsKSBpcyBiZWluZyB3cml0dGVuIHRvIGJ5IG1hbnkgc3VicHJvY2Vzc2VzIGF0IG9uY2UsIHdoaWNoIGlzIHVubGlrZWx5IGluIHJlYWwgc2NlbmFyaW9zLlxuZXhwb3J0IGNvbnN0IHZlcmJvc2VMb2cgPSAoe3R5cGUsIHZlcmJvc2VNZXNzYWdlLCBmZE51bWJlciwgdmVyYm9zZUluZm8sIHJlc3VsdH0pID0+IHtcblx0Y29uc3QgdmVyYm9zZU9iamVjdCA9IGdldFZlcmJvc2VPYmplY3Qoe3R5cGUsIHJlc3VsdCwgdmVyYm9zZUluZm99KTtcblx0Y29uc3QgcHJpbnRlZExpbmVzID0gZ2V0UHJpbnRlZExpbmVzKHZlcmJvc2VNZXNzYWdlLCB2ZXJib3NlT2JqZWN0KTtcblx0Y29uc3QgZmluYWxMaW5lcyA9IGFwcGx5VmVyYm9zZU9uTGluZXMocHJpbnRlZExpbmVzLCB2ZXJib3NlSW5mbywgZmROdW1iZXIpO1xuXHRpZiAoZmluYWxMaW5lcyAhPT0gJycpIHtcblx0XHRjb25zb2xlLndhcm4oZmluYWxMaW5lcy5zbGljZSgwLCAtMSkpO1xuXHR9XG59O1xuXG5jb25zdCBnZXRWZXJib3NlT2JqZWN0ID0gKHtcblx0dHlwZSxcblx0cmVzdWx0LFxuXHR2ZXJib3NlSW5mbzoge2VzY2FwZWRDb21tYW5kLCBjb21tYW5kSWQsIHJhd09wdGlvbnM6IHtwaXBlZCA9IGZhbHNlLCAuLi5vcHRpb25zfX0sXG59KSA9PiAoe1xuXHR0eXBlLFxuXHRlc2NhcGVkQ29tbWFuZCxcblx0Y29tbWFuZElkOiBgJHtjb21tYW5kSWR9YCxcblx0dGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuXHRwaXBlZCxcblx0cmVzdWx0LFxuXHRvcHRpb25zLFxufSk7XG5cbmNvbnN0IGdldFByaW50ZWRMaW5lcyA9ICh2ZXJib3NlTWVzc2FnZSwgdmVyYm9zZU9iamVjdCkgPT4gdmVyYm9zZU1lc3NhZ2Vcblx0LnNwbGl0KCdcXG4nKVxuXHQubWFwKG1lc3NhZ2UgPT4gZ2V0UHJpbnRlZExpbmUoey4uLnZlcmJvc2VPYmplY3QsIG1lc3NhZ2V9KSk7XG5cbmNvbnN0IGdldFByaW50ZWRMaW5lID0gdmVyYm9zZU9iamVjdCA9PiB7XG5cdGNvbnN0IHZlcmJvc2VMaW5lID0gZGVmYXVsdFZlcmJvc2VGdW5jdGlvbih2ZXJib3NlT2JqZWN0KTtcblx0cmV0dXJuIHt2ZXJib3NlTGluZSwgdmVyYm9zZU9iamVjdH07XG59O1xuXG4vLyBTZXJpYWxpemUgYW55IHR5cGUgdG8gYSBsaW5lIHN0cmluZywgZm9yIGxvZ2dpbmdcbmV4cG9ydCBjb25zdCBzZXJpYWxpemVWZXJib3NlTWVzc2FnZSA9IG1lc3NhZ2UgPT4ge1xuXHRjb25zdCBtZXNzYWdlU3RyaW5nID0gdHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnID8gbWVzc2FnZSA6IGluc3BlY3QobWVzc2FnZSk7XG5cdGNvbnN0IGVzY2FwZWRNZXNzYWdlID0gZXNjYXBlTGluZXMobWVzc2FnZVN0cmluZyk7XG5cdHJldHVybiBlc2NhcGVkTWVzc2FnZS5yZXBsYWNlQWxsKCdcXHQnLCAnICcucmVwZWF0KFRBQl9TSVpFKSk7XG59O1xuXG4vLyBTYW1lIGFzIGB1dGlsLmluc3BlY3QoKWBcbmNvbnN0IFRBQl9TSVpFID0gMjtcbiIsICJpbXBvcnQge2lzVmVyYm9zZX0gZnJvbSAnLi92YWx1ZXMuanMnO1xuaW1wb3J0IHt2ZXJib3NlTG9nfSBmcm9tICcuL2xvZy5qcyc7XG5cbi8vIFdoZW4gYHZlcmJvc2VgIGlzIGBzaG9ydHxmdWxsfGN1c3RvbWAsIHByaW50IGVhY2ggY29tbWFuZFxuZXhwb3J0IGNvbnN0IGxvZ0NvbW1hbmQgPSAoZXNjYXBlZENvbW1hbmQsIHZlcmJvc2VJbmZvKSA9PiB7XG5cdGlmICghaXNWZXJib3NlKHZlcmJvc2VJbmZvKSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHZlcmJvc2VMb2coe1xuXHRcdHR5cGU6ICdjb21tYW5kJyxcblx0XHR2ZXJib3NlTWVzc2FnZTogZXNjYXBlZENvbW1hbmQsXG5cdFx0dmVyYm9zZUluZm8sXG5cdH0pO1xufTtcbiIsICJpbXBvcnQge2lzVmVyYm9zZSwgVkVSQk9TRV9WQUxVRVMsIGlzVmVyYm9zZUZ1bmN0aW9ufSBmcm9tICcuL3ZhbHVlcy5qcyc7XG5cbi8vIEluZm9ybWF0aW9uIGNvbXB1dGVkIGJlZm9yZSBzcGF3bmluZywgdXNlZCBieSB0aGUgYHZlcmJvc2VgIG9wdGlvblxuZXhwb3J0IGNvbnN0IGdldFZlcmJvc2VJbmZvID0gKHZlcmJvc2UsIGVzY2FwZWRDb21tYW5kLCByYXdPcHRpb25zKSA9PiB7XG5cdHZhbGlkYXRlVmVyYm9zZSh2ZXJib3NlKTtcblx0Y29uc3QgY29tbWFuZElkID0gZ2V0Q29tbWFuZElkKHZlcmJvc2UpO1xuXHRyZXR1cm4ge1xuXHRcdHZlcmJvc2UsXG5cdFx0ZXNjYXBlZENvbW1hbmQsXG5cdFx0Y29tbWFuZElkLFxuXHRcdHJhd09wdGlvbnMsXG5cdH07XG59O1xuXG5jb25zdCBnZXRDb21tYW5kSWQgPSB2ZXJib3NlID0+IGlzVmVyYm9zZSh7dmVyYm9zZX0pID8gQ09NTUFORF9JRCsrIDogdW5kZWZpbmVkO1xuXG4vLyBQcmVwZW5kaW5nIHRoZSBgcGlkYCBpcyB1c2VmdWwgd2hlbiBtdWx0aXBsZSBjb21tYW5kcyBwcmludCB0aGVpciBvdXRwdXQgYXQgdGhlIHNhbWUgdGltZS5cbi8vIEhvd2V2ZXIsIHdlIGNhbm5vdCB1c2UgdGhlIHJlYWwgUElEIHNpbmNlIHRoaXMgaXMgbm90IGF2YWlsYWJsZSB3aXRoIGBjaGlsZF9wcm9jZXNzLnNwYXduU3luYygpYC5cbi8vIEFsc28sIHdlIGNhbm5vdCB1c2UgdGhlIHJlYWwgUElEIGlmIHdlIHdhbnQgdG8gcHJpbnQgaXQgYmVmb3JlIGBjaGlsZF9wcm9jZXNzLnNwYXduKClgIGlzIHJ1bi5cbi8vIEFzIGEgcHJvLCBpdCBpcyBzaG9ydGVyIHRoYW4gYSBub3JtYWwgUElEIGFuZCBuZXZlciByZS11c2VzIHRoZSBzYW1lIGlkLlxuLy8gQXMgYSBjb24sIGl0IGNhbm5vdCBiZSB1c2VkIHRvIHNlbmQgc2lnbmFscy5cbmxldCBDT01NQU5EX0lEID0gMG47XG5cbmNvbnN0IHZhbGlkYXRlVmVyYm9zZSA9IHZlcmJvc2UgPT4ge1xuXHRmb3IgKGNvbnN0IGZkVmVyYm9zZSBvZiB2ZXJib3NlKSB7XG5cdFx0aWYgKGZkVmVyYm9zZSA9PT0gZmFsc2UpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcInZlcmJvc2U6IGZhbHNlXCIgb3B0aW9uIHdhcyByZW5hbWVkIHRvIFwidmVyYm9zZTogXFwnbm9uZVxcJ1wiLicpO1xuXHRcdH1cblxuXHRcdGlmIChmZFZlcmJvc2UgPT09IHRydWUpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcInZlcmJvc2U6IHRydWVcIiBvcHRpb24gd2FzIHJlbmFtZWQgdG8gXCJ2ZXJib3NlOiBcXCdzaG9ydFxcJ1wiLicpO1xuXHRcdH1cblxuXHRcdGlmICghVkVSQk9TRV9WQUxVRVMuaW5jbHVkZXMoZmRWZXJib3NlKSAmJiAhaXNWZXJib3NlRnVuY3Rpb24oZmRWZXJib3NlKSkge1xuXHRcdFx0Y29uc3QgYWxsb3dlZFZhbHVlcyA9IFZFUkJPU0VfVkFMVUVTLm1hcChhbGxvd2VkVmFsdWUgPT4gYCcke2FsbG93ZWRWYWx1ZX0nYCkuam9pbignLCAnKTtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBcInZlcmJvc2VcIiBvcHRpb24gbXVzdCBub3QgYmUgJHtmZFZlcmJvc2V9LiBBbGxvd2VkIHZhbHVlcyBhcmU6ICR7YWxsb3dlZFZhbHVlc30gb3IgYSBmdW5jdGlvbi5gKTtcblx0XHR9XG5cdH1cbn07XG4iLCAiaW1wb3J0IHtocnRpbWV9IGZyb20gJ25vZGU6cHJvY2Vzcyc7XG5cbi8vIFN0YXJ0IGNvdW50aW5nIHRpbWUgYmVmb3JlIHNwYXduaW5nIHRoZSBzdWJwcm9jZXNzXG5leHBvcnQgY29uc3QgZ2V0U3RhcnRUaW1lID0gKCkgPT4gaHJ0aW1lLmJpZ2ludCgpO1xuXG4vLyBDb21wdXRlIGR1cmF0aW9uIGFmdGVyIHRoZSBzdWJwcm9jZXNzIGVuZGVkLlxuLy8gUHJpbnRlZCBieSB0aGUgYHZlcmJvc2VgIG9wdGlvbi5cbmV4cG9ydCBjb25zdCBnZXREdXJhdGlvbk1zID0gc3RhcnRUaW1lID0+IE51bWJlcihocnRpbWUuYmlnaW50KCkgLSBzdGFydFRpbWUpIC8gMWU2O1xuIiwgImltcG9ydCB7bG9nQ29tbWFuZH0gZnJvbSAnLi4vdmVyYm9zZS9zdGFydC5qcyc7XG5pbXBvcnQge2dldFZlcmJvc2VJbmZvfSBmcm9tICcuLi92ZXJib3NlL2luZm8uanMnO1xuaW1wb3J0IHtnZXRTdGFydFRpbWV9IGZyb20gJy4uL3JldHVybi9kdXJhdGlvbi5qcyc7XG5pbXBvcnQge2pvaW5Db21tYW5kfSBmcm9tICcuL2VzY2FwZS5qcyc7XG5pbXBvcnQge25vcm1hbGl6ZUZkU3BlY2lmaWNPcHRpb259IGZyb20gJy4vc3BlY2lmaWMuanMnO1xuXG4vLyBDb21wdXRlIGByZXN1bHQuY29tbWFuZGAsIGByZXN1bHQuZXNjYXBlZENvbW1hbmRgIGFuZCBgdmVyYm9zZWAtcmVsYXRlZCBpbmZvcm1hdGlvblxuZXhwb3J0IGNvbnN0IGhhbmRsZUNvbW1hbmQgPSAoZmlsZVBhdGgsIHJhd0FyZ3VtZW50cywgcmF3T3B0aW9ucykgPT4ge1xuXHRjb25zdCBzdGFydFRpbWUgPSBnZXRTdGFydFRpbWUoKTtcblx0Y29uc3Qge2NvbW1hbmQsIGVzY2FwZWRDb21tYW5kfSA9IGpvaW5Db21tYW5kKGZpbGVQYXRoLCByYXdBcmd1bWVudHMpO1xuXHRjb25zdCB2ZXJib3NlID0gbm9ybWFsaXplRmRTcGVjaWZpY09wdGlvbihyYXdPcHRpb25zLCAndmVyYm9zZScpO1xuXHRjb25zdCB2ZXJib3NlSW5mbyA9IGdldFZlcmJvc2VJbmZvKHZlcmJvc2UsIGVzY2FwZWRDb21tYW5kLCB7Li4ucmF3T3B0aW9uc30pO1xuXHRsb2dDb21tYW5kKGVzY2FwZWRDb21tYW5kLCB2ZXJib3NlSW5mbyk7XG5cdHJldHVybiB7XG5cdFx0Y29tbWFuZCxcblx0XHRlc2NhcGVkQ29tbWFuZCxcblx0XHRzdGFydFRpbWUsXG5cdFx0dmVyYm9zZUluZm8sXG5cdH07XG59O1xuIiwgIm1vZHVsZS5leHBvcnRzID0gaXNleGVcbmlzZXhlLnN5bmMgPSBzeW5jXG5cbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJylcblxuZnVuY3Rpb24gY2hlY2tQYXRoRXh0IChwYXRoLCBvcHRpb25zKSB7XG4gIHZhciBwYXRoZXh0ID0gb3B0aW9ucy5wYXRoRXh0ICE9PSB1bmRlZmluZWQgP1xuICAgIG9wdGlvbnMucGF0aEV4dCA6IHByb2Nlc3MuZW52LlBBVEhFWFRcblxuICBpZiAoIXBhdGhleHQpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgcGF0aGV4dCA9IHBhdGhleHQuc3BsaXQoJzsnKVxuICBpZiAocGF0aGV4dC5pbmRleE9mKCcnKSAhPT0gLTEpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aGV4dC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwID0gcGF0aGV4dFtpXS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKHAgJiYgcGF0aC5zdWJzdHIoLXAubGVuZ3RoKS50b0xvd2VyQ2FzZSgpID09PSBwKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gY2hlY2tTdGF0IChzdGF0LCBwYXRoLCBvcHRpb25zKSB7XG4gIGlmICghc3RhdC5pc1N5bWJvbGljTGluaygpICYmICFzdGF0LmlzRmlsZSgpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIGNoZWNrUGF0aEV4dChwYXRoLCBvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBpc2V4ZSAocGF0aCwgb3B0aW9ucywgY2IpIHtcbiAgZnMuc3RhdChwYXRoLCBmdW5jdGlvbiAoZXIsIHN0YXQpIHtcbiAgICBjYihlciwgZXIgPyBmYWxzZSA6IGNoZWNrU3RhdChzdGF0LCBwYXRoLCBvcHRpb25zKSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gc3luYyAocGF0aCwgb3B0aW9ucykge1xuICByZXR1cm4gY2hlY2tTdGF0KGZzLnN0YXRTeW5jKHBhdGgpLCBwYXRoLCBvcHRpb25zKVxufVxuIiwgIm1vZHVsZS5leHBvcnRzID0gaXNleGVcbmlzZXhlLnN5bmMgPSBzeW5jXG5cbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJylcblxuZnVuY3Rpb24gaXNleGUgKHBhdGgsIG9wdGlvbnMsIGNiKSB7XG4gIGZzLnN0YXQocGF0aCwgZnVuY3Rpb24gKGVyLCBzdGF0KSB7XG4gICAgY2IoZXIsIGVyID8gZmFsc2UgOiBjaGVja1N0YXQoc3RhdCwgb3B0aW9ucykpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHN5bmMgKHBhdGgsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGNoZWNrU3RhdChmcy5zdGF0U3luYyhwYXRoKSwgb3B0aW9ucylcbn1cblxuZnVuY3Rpb24gY2hlY2tTdGF0IChzdGF0LCBvcHRpb25zKSB7XG4gIHJldHVybiBzdGF0LmlzRmlsZSgpICYmIGNoZWNrTW9kZShzdGF0LCBvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBjaGVja01vZGUgKHN0YXQsIG9wdGlvbnMpIHtcbiAgdmFyIG1vZCA9IHN0YXQubW9kZVxuICB2YXIgdWlkID0gc3RhdC51aWRcbiAgdmFyIGdpZCA9IHN0YXQuZ2lkXG5cbiAgdmFyIG15VWlkID0gb3B0aW9ucy51aWQgIT09IHVuZGVmaW5lZCA/XG4gICAgb3B0aW9ucy51aWQgOiBwcm9jZXNzLmdldHVpZCAmJiBwcm9jZXNzLmdldHVpZCgpXG4gIHZhciBteUdpZCA9IG9wdGlvbnMuZ2lkICE9PSB1bmRlZmluZWQgP1xuICAgIG9wdGlvbnMuZ2lkIDogcHJvY2Vzcy5nZXRnaWQgJiYgcHJvY2Vzcy5nZXRnaWQoKVxuXG4gIHZhciB1ID0gcGFyc2VJbnQoJzEwMCcsIDgpXG4gIHZhciBnID0gcGFyc2VJbnQoJzAxMCcsIDgpXG4gIHZhciBvID0gcGFyc2VJbnQoJzAwMScsIDgpXG4gIHZhciB1ZyA9IHUgfCBnXG5cbiAgdmFyIHJldCA9IChtb2QgJiBvKSB8fFxuICAgIChtb2QgJiBnKSAmJiBnaWQgPT09IG15R2lkIHx8XG4gICAgKG1vZCAmIHUpICYmIHVpZCA9PT0gbXlVaWQgfHxcbiAgICAobW9kICYgdWcpICYmIG15VWlkID09PSAwXG5cbiAgcmV0dXJuIHJldFxufVxuIiwgInZhciBmcyA9IHJlcXVpcmUoJ2ZzJylcbnZhciBjb3JlXG5pZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJyB8fCBnbG9iYWwuVEVTVElOR19XSU5ET1dTKSB7XG4gIGNvcmUgPSByZXF1aXJlKCcuL3dpbmRvd3MuanMnKVxufSBlbHNlIHtcbiAgY29yZSA9IHJlcXVpcmUoJy4vbW9kZS5qcycpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNleGVcbmlzZXhlLnN5bmMgPSBzeW5jXG5cbmZ1bmN0aW9uIGlzZXhlIChwYXRoLCBvcHRpb25zLCBjYikge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IG9wdGlvbnNcbiAgICBvcHRpb25zID0ge31cbiAgfVxuXG4gIGlmICghY2IpIHtcbiAgICBpZiAodHlwZW9mIFByb21pc2UgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NhbGxiYWNrIG5vdCBwcm92aWRlZCcpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGlzZXhlKHBhdGgsIG9wdGlvbnMgfHwge30sIGZ1bmN0aW9uIChlciwgaXMpIHtcbiAgICAgICAgaWYgKGVyKSB7XG4gICAgICAgICAgcmVqZWN0KGVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoaXMpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGNvcmUocGF0aCwgb3B0aW9ucyB8fCB7fSwgZnVuY3Rpb24gKGVyLCBpcykge1xuICAgIC8vIGlnbm9yZSBFQUNDRVMgYmVjYXVzZSB0aGF0IGp1c3QgbWVhbnMgd2UgYXJlbid0IGFsbG93ZWQgdG8gcnVuIGl0XG4gICAgaWYgKGVyKSB7XG4gICAgICBpZiAoZXIuY29kZSA9PT0gJ0VBQ0NFUycgfHwgb3B0aW9ucyAmJiBvcHRpb25zLmlnbm9yZUVycm9ycykge1xuICAgICAgICBlciA9IG51bGxcbiAgICAgICAgaXMgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBjYihlciwgaXMpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHN5bmMgKHBhdGgsIG9wdGlvbnMpIHtcbiAgLy8gbXkga2luZ2RvbSBmb3IgYSBmaWx0ZXJlZCBjYXRjaFxuICB0cnkge1xuICAgIHJldHVybiBjb3JlLnN5bmMocGF0aCwgb3B0aW9ucyB8fCB7fSlcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmlnbm9yZUVycm9ycyB8fCBlci5jb2RlID09PSAnRUFDQ0VTJykge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVyXG4gICAgfVxuICB9XG59XG4iLCAiY29uc3QgaXNXaW5kb3dzID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJyB8fFxuICAgIHByb2Nlc3MuZW52Lk9TVFlQRSA9PT0gJ2N5Z3dpbicgfHxcbiAgICBwcm9jZXNzLmVudi5PU1RZUEUgPT09ICdtc3lzJ1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBDT0xPTiA9IGlzV2luZG93cyA/ICc7JyA6ICc6J1xuY29uc3QgaXNleGUgPSByZXF1aXJlKCdpc2V4ZScpXG5cbmNvbnN0IGdldE5vdEZvdW5kRXJyb3IgPSAoY21kKSA9PlxuICBPYmplY3QuYXNzaWduKG5ldyBFcnJvcihgbm90IGZvdW5kOiAke2NtZH1gKSwgeyBjb2RlOiAnRU5PRU5UJyB9KVxuXG5jb25zdCBnZXRQYXRoSW5mbyA9IChjbWQsIG9wdCkgPT4ge1xuICBjb25zdCBjb2xvbiA9IG9wdC5jb2xvbiB8fCBDT0xPTlxuXG4gIC8vIElmIGl0IGhhcyBhIHNsYXNoLCB0aGVuIHdlIGRvbid0IGJvdGhlciBzZWFyY2hpbmcgdGhlIHBhdGhlbnYuXG4gIC8vIGp1c3QgY2hlY2sgdGhlIGZpbGUgaXRzZWxmLCBhbmQgdGhhdCdzIGl0LlxuICBjb25zdCBwYXRoRW52ID0gY21kLm1hdGNoKC9cXC8vKSB8fCBpc1dpbmRvd3MgJiYgY21kLm1hdGNoKC9cXFxcLykgPyBbJyddXG4gICAgOiAoXG4gICAgICBbXG4gICAgICAgIC8vIHdpbmRvd3MgYWx3YXlzIGNoZWNrcyB0aGUgY3dkIGZpcnN0XG4gICAgICAgIC4uLihpc1dpbmRvd3MgPyBbcHJvY2Vzcy5jd2QoKV0gOiBbXSksXG4gICAgICAgIC4uLihvcHQucGF0aCB8fCBwcm9jZXNzLmVudi5QQVRIIHx8XG4gICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IHZlcnkgdW51c3VhbCAqLyAnJykuc3BsaXQoY29sb24pLFxuICAgICAgXVxuICAgIClcbiAgY29uc3QgcGF0aEV4dEV4ZSA9IGlzV2luZG93c1xuICAgID8gb3B0LnBhdGhFeHQgfHwgcHJvY2Vzcy5lbnYuUEFUSEVYVCB8fCAnLkVYRTsuQ01EOy5CQVQ7LkNPTSdcbiAgICA6ICcnXG4gIGNvbnN0IHBhdGhFeHQgPSBpc1dpbmRvd3MgPyBwYXRoRXh0RXhlLnNwbGl0KGNvbG9uKSA6IFsnJ11cblxuICBpZiAoaXNXaW5kb3dzKSB7XG4gICAgaWYgKGNtZC5pbmRleE9mKCcuJykgIT09IC0xICYmIHBhdGhFeHRbMF0gIT09ICcnKVxuICAgICAgcGF0aEV4dC51bnNoaWZ0KCcnKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwYXRoRW52LFxuICAgIHBhdGhFeHQsXG4gICAgcGF0aEV4dEV4ZSxcbiAgfVxufVxuXG5jb25zdCB3aGljaCA9IChjbWQsIG9wdCwgY2IpID0+IHtcbiAgaWYgKHR5cGVvZiBvcHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IG9wdFxuICAgIG9wdCA9IHt9XG4gIH1cbiAgaWYgKCFvcHQpXG4gICAgb3B0ID0ge31cblxuICBjb25zdCB7IHBhdGhFbnYsIHBhdGhFeHQsIHBhdGhFeHRFeGUgfSA9IGdldFBhdGhJbmZvKGNtZCwgb3B0KVxuICBjb25zdCBmb3VuZCA9IFtdXG5cbiAgY29uc3Qgc3RlcCA9IGkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChpID09PSBwYXRoRW52Lmxlbmd0aClcbiAgICAgIHJldHVybiBvcHQuYWxsICYmIGZvdW5kLmxlbmd0aCA/IHJlc29sdmUoZm91bmQpXG4gICAgICAgIDogcmVqZWN0KGdldE5vdEZvdW5kRXJyb3IoY21kKSlcblxuICAgIGNvbnN0IHBwUmF3ID0gcGF0aEVudltpXVxuICAgIGNvbnN0IHBhdGhQYXJ0ID0gL15cIi4qXCIkLy50ZXN0KHBwUmF3KSA/IHBwUmF3LnNsaWNlKDEsIC0xKSA6IHBwUmF3XG5cbiAgICBjb25zdCBwQ21kID0gcGF0aC5qb2luKHBhdGhQYXJ0LCBjbWQpXG4gICAgY29uc3QgcCA9ICFwYXRoUGFydCAmJiAvXlxcLltcXFxcXFwvXS8udGVzdChjbWQpID8gY21kLnNsaWNlKDAsIDIpICsgcENtZFxuICAgICAgOiBwQ21kXG5cbiAgICByZXNvbHZlKHN1YlN0ZXAocCwgaSwgMCkpXG4gIH0pXG5cbiAgY29uc3Qgc3ViU3RlcCA9IChwLCBpLCBpaSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChpaSA9PT0gcGF0aEV4dC5sZW5ndGgpXG4gICAgICByZXR1cm4gcmVzb2x2ZShzdGVwKGkgKyAxKSlcbiAgICBjb25zdCBleHQgPSBwYXRoRXh0W2lpXVxuICAgIGlzZXhlKHAgKyBleHQsIHsgcGF0aEV4dDogcGF0aEV4dEV4ZSB9LCAoZXIsIGlzKSA9PiB7XG4gICAgICBpZiAoIWVyICYmIGlzKSB7XG4gICAgICAgIGlmIChvcHQuYWxsKVxuICAgICAgICAgIGZvdW5kLnB1c2gocCArIGV4dClcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJldHVybiByZXNvbHZlKHAgKyBleHQpXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzb2x2ZShzdWJTdGVwKHAsIGksIGlpICsgMSkpXG4gICAgfSlcbiAgfSlcblxuICByZXR1cm4gY2IgPyBzdGVwKDApLnRoZW4ocmVzID0+IGNiKG51bGwsIHJlcyksIGNiKSA6IHN0ZXAoMClcbn1cblxuY29uc3Qgd2hpY2hTeW5jID0gKGNtZCwgb3B0KSA9PiB7XG4gIG9wdCA9IG9wdCB8fCB7fVxuXG4gIGNvbnN0IHsgcGF0aEVudiwgcGF0aEV4dCwgcGF0aEV4dEV4ZSB9ID0gZ2V0UGF0aEluZm8oY21kLCBvcHQpXG4gIGNvbnN0IGZvdW5kID0gW11cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhFbnYubGVuZ3RoOyBpICsrKSB7XG4gICAgY29uc3QgcHBSYXcgPSBwYXRoRW52W2ldXG4gICAgY29uc3QgcGF0aFBhcnQgPSAvXlwiLipcIiQvLnRlc3QocHBSYXcpID8gcHBSYXcuc2xpY2UoMSwgLTEpIDogcHBSYXdcblxuICAgIGNvbnN0IHBDbWQgPSBwYXRoLmpvaW4ocGF0aFBhcnQsIGNtZClcbiAgICBjb25zdCBwID0gIXBhdGhQYXJ0ICYmIC9eXFwuW1xcXFxcXC9dLy50ZXN0KGNtZCkgPyBjbWQuc2xpY2UoMCwgMikgKyBwQ21kXG4gICAgICA6IHBDbWRcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGF0aEV4dC5sZW5ndGg7IGogKyspIHtcbiAgICAgIGNvbnN0IGN1ciA9IHAgKyBwYXRoRXh0W2pdXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpcyA9IGlzZXhlLnN5bmMoY3VyLCB7IHBhdGhFeHQ6IHBhdGhFeHRFeGUgfSlcbiAgICAgICAgaWYgKGlzKSB7XG4gICAgICAgICAgaWYgKG9wdC5hbGwpXG4gICAgICAgICAgICBmb3VuZC5wdXNoKGN1cilcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gY3VyXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGV4KSB7fVxuICAgIH1cbiAgfVxuXG4gIGlmIChvcHQuYWxsICYmIGZvdW5kLmxlbmd0aClcbiAgICByZXR1cm4gZm91bmRcblxuICBpZiAob3B0Lm5vdGhyb3cpXG4gICAgcmV0dXJuIG51bGxcblxuICB0aHJvdyBnZXROb3RGb3VuZEVycm9yKGNtZClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3aGljaFxud2hpY2guc3luYyA9IHdoaWNoU3luY1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcGF0aEtleSA9IChvcHRpb25zID0ge30pID0+IHtcblx0Y29uc3QgZW52aXJvbm1lbnQgPSBvcHRpb25zLmVudiB8fCBwcm9jZXNzLmVudjtcblx0Y29uc3QgcGxhdGZvcm0gPSBvcHRpb25zLnBsYXRmb3JtIHx8IHByb2Nlc3MucGxhdGZvcm07XG5cblx0aWYgKHBsYXRmb3JtICE9PSAnd2luMzInKSB7XG5cdFx0cmV0dXJuICdQQVRIJztcblx0fVxuXG5cdHJldHVybiBPYmplY3Qua2V5cyhlbnZpcm9ubWVudCkucmV2ZXJzZSgpLmZpbmQoa2V5ID0+IGtleS50b1VwcGVyQ2FzZSgpID09PSAnUEFUSCcpIHx8ICdQYXRoJztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0aEtleTtcbi8vIFRPRE86IFJlbW92ZSB0aGlzIGZvciB0aGUgbmV4dCBtYWpvciByZWxlYXNlXG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gcGF0aEtleTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCB3aGljaCA9IHJlcXVpcmUoJ3doaWNoJyk7XG5jb25zdCBnZXRQYXRoS2V5ID0gcmVxdWlyZSgncGF0aC1rZXknKTtcblxuZnVuY3Rpb24gcmVzb2x2ZUNvbW1hbmRBdHRlbXB0KHBhcnNlZCwgd2l0aG91dFBhdGhFeHQpIHtcbiAgICBjb25zdCBlbnYgPSBwYXJzZWQub3B0aW9ucy5lbnYgfHwgcHJvY2Vzcy5lbnY7XG4gICAgY29uc3QgY3dkID0gcHJvY2Vzcy5jd2QoKTtcbiAgICBjb25zdCBoYXNDdXN0b21Dd2QgPSBwYXJzZWQub3B0aW9ucy5jd2QgIT0gbnVsbDtcbiAgICAvLyBXb3JrZXIgdGhyZWFkcyBkbyBub3QgaGF2ZSBwcm9jZXNzLmNoZGlyKClcbiAgICBjb25zdCBzaG91bGRTd2l0Y2hDd2QgPSBoYXNDdXN0b21Dd2QgJiYgcHJvY2Vzcy5jaGRpciAhPT0gdW5kZWZpbmVkICYmICFwcm9jZXNzLmNoZGlyLmRpc2FibGVkO1xuXG4gICAgLy8gSWYgYSBjdXN0b20gYGN3ZGAgd2FzIHNwZWNpZmllZCwgd2UgbmVlZCB0byBjaGFuZ2UgdGhlIHByb2Nlc3MgY3dkXG4gICAgLy8gYmVjYXVzZSBgd2hpY2hgIHdpbGwgZG8gc3RhdCBjYWxscyBidXQgZG9lcyBub3Qgc3VwcG9ydCBhIGN1c3RvbSBjd2RcbiAgICBpZiAoc2hvdWxkU3dpdGNoQ3dkKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwcm9jZXNzLmNoZGlyKHBhcnNlZC5vcHRpb25zLmN3ZCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLyogRW1wdHkgKi9cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCByZXNvbHZlZDtcblxuICAgIHRyeSB7XG4gICAgICAgIHJlc29sdmVkID0gd2hpY2guc3luYyhwYXJzZWQuY29tbWFuZCwge1xuICAgICAgICAgICAgcGF0aDogZW52W2dldFBhdGhLZXkoeyBlbnYgfSldLFxuICAgICAgICAgICAgcGF0aEV4dDogd2l0aG91dFBhdGhFeHQgPyBwYXRoLmRlbGltaXRlciA6IHVuZGVmaW5lZCxcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvKiBFbXB0eSAqL1xuICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChzaG91bGRTd2l0Y2hDd2QpIHtcbiAgICAgICAgICAgIHByb2Nlc3MuY2hkaXIoY3dkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIHdlIHN1Y2Nlc3NmdWxseSByZXNvbHZlZCwgZW5zdXJlIHRoYXQgYW4gYWJzb2x1dGUgcGF0aCBpcyByZXR1cm5lZFxuICAgIC8vIE5vdGUgdGhhdCB3aGVuIGEgY3VzdG9tIGBjd2RgIHdhcyB1c2VkLCB3ZSBuZWVkIHRvIHJlc29sdmUgdG8gYW4gYWJzb2x1dGUgcGF0aCBiYXNlZCBvbiBpdFxuICAgIGlmIChyZXNvbHZlZCkge1xuICAgICAgICByZXNvbHZlZCA9IHBhdGgucmVzb2x2ZShoYXNDdXN0b21Dd2QgPyBwYXJzZWQub3B0aW9ucy5jd2QgOiAnJywgcmVzb2x2ZWQpO1xuICAgIH1cblxuICAgIHJldHVybiByZXNvbHZlZDtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUNvbW1hbmQocGFyc2VkKSB7XG4gICAgcmV0dXJuIHJlc29sdmVDb21tYW5kQXR0ZW1wdChwYXJzZWQpIHx8IHJlc29sdmVDb21tYW5kQXR0ZW1wdChwYXJzZWQsIHRydWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc29sdmVDb21tYW5kO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLy8gU2VlIGh0dHA6Ly93d3cucm9idmFuZGVyd291ZGUuY29tL2VzY2FwZWNoYXJzLnBocFxuY29uc3QgbWV0YUNoYXJzUmVnRXhwID0gLyhbKClcXF1bJSFeXCJgPD4mfDssICo/XSkvZztcblxuZnVuY3Rpb24gZXNjYXBlQ29tbWFuZChhcmcpIHtcbiAgICAvLyBFc2NhcGUgbWV0YSBjaGFyc1xuICAgIGFyZyA9IGFyZy5yZXBsYWNlKG1ldGFDaGFyc1JlZ0V4cCwgJ14kMScpO1xuXG4gICAgcmV0dXJuIGFyZztcbn1cblxuZnVuY3Rpb24gZXNjYXBlQXJndW1lbnQoYXJnLCBkb3VibGVFc2NhcGVNZXRhQ2hhcnMpIHtcbiAgICAvLyBDb252ZXJ0IHRvIHN0cmluZ1xuICAgIGFyZyA9IGAke2FyZ31gO1xuXG4gICAgLy8gQWxnb3JpdGhtIGJlbG93IGlzIGJhc2VkIG9uIGh0dHBzOi8vcW50bS5vcmcvY21kXG4gICAgLy8gSXQncyBzbGlnaHRseSBhbHRlcmVkIHRvIGRpc2FibGUgSlMgYmFja3RyYWNraW5nIHRvIGF2b2lkIGhhbmdpbmcgb24gc3BlY2lhbGx5IGNyYWZ0ZWQgaW5wdXRcbiAgICAvLyBQbGVhc2Ugc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3h5c3R1ZGlvL25vZGUtY3Jvc3Mtc3Bhd24vcHVsbC8xNjAgZm9yIG1vcmUgaW5mb3JtYXRpb25cblxuICAgIC8vIFNlcXVlbmNlIG9mIGJhY2tzbGFzaGVzIGZvbGxvd2VkIGJ5IGEgZG91YmxlIHF1b3RlOlxuICAgIC8vIGRvdWJsZSB1cCBhbGwgdGhlIGJhY2tzbGFzaGVzIGFuZCBlc2NhcGUgdGhlIGRvdWJsZSBxdW90ZVxuICAgIGFyZyA9IGFyZy5yZXBsYWNlKC8oPz0oXFxcXCs/KT8pXFwxXCIvZywgJyQxJDFcXFxcXCInKTtcblxuICAgIC8vIFNlcXVlbmNlIG9mIGJhY2tzbGFzaGVzIGZvbGxvd2VkIGJ5IHRoZSBlbmQgb2YgdGhlIHN0cmluZ1xuICAgIC8vICh3aGljaCB3aWxsIGJlY29tZSBhIGRvdWJsZSBxdW90ZSBsYXRlcik6XG4gICAgLy8gZG91YmxlIHVwIGFsbCB0aGUgYmFja3NsYXNoZXNcbiAgICBhcmcgPSBhcmcucmVwbGFjZSgvKD89KFxcXFwrPyk/KVxcMSQvLCAnJDEkMScpO1xuXG4gICAgLy8gQWxsIG90aGVyIGJhY2tzbGFzaGVzIG9jY3VyIGxpdGVyYWxseVxuXG4gICAgLy8gUXVvdGUgdGhlIHdob2xlIHRoaW5nOlxuICAgIGFyZyA9IGBcIiR7YXJnfVwiYDtcblxuICAgIC8vIEVzY2FwZSBtZXRhIGNoYXJzXG4gICAgYXJnID0gYXJnLnJlcGxhY2UobWV0YUNoYXJzUmVnRXhwLCAnXiQxJyk7XG5cbiAgICAvLyBEb3VibGUgZXNjYXBlIG1ldGEgY2hhcnMgaWYgbmVjZXNzYXJ5XG4gICAgaWYgKGRvdWJsZUVzY2FwZU1ldGFDaGFycykge1xuICAgICAgICBhcmcgPSBhcmcucmVwbGFjZShtZXRhQ2hhcnNSZWdFeHAsICdeJDEnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJnO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5jb21tYW5kID0gZXNjYXBlQ29tbWFuZDtcbm1vZHVsZS5leHBvcnRzLmFyZ3VtZW50ID0gZXNjYXBlQXJndW1lbnQ7XG4iLCAiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAvXiMhKC4qKS87XG4iLCAiJ3VzZSBzdHJpY3QnO1xuY29uc3Qgc2hlYmFuZ1JlZ2V4ID0gcmVxdWlyZSgnc2hlYmFuZy1yZWdleCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzdHJpbmcgPSAnJykgPT4ge1xuXHRjb25zdCBtYXRjaCA9IHN0cmluZy5tYXRjaChzaGViYW5nUmVnZXgpO1xuXG5cdGlmICghbWF0Y2gpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGNvbnN0IFtwYXRoLCBhcmd1bWVudF0gPSBtYXRjaFswXS5yZXBsYWNlKC8jISA/LywgJycpLnNwbGl0KCcgJyk7XG5cdGNvbnN0IGJpbmFyeSA9IHBhdGguc3BsaXQoJy8nKS5wb3AoKTtcblxuXHRpZiAoYmluYXJ5ID09PSAnZW52Jykge1xuXHRcdHJldHVybiBhcmd1bWVudDtcblx0fVxuXG5cdHJldHVybiBhcmd1bWVudCA/IGAke2JpbmFyeX0gJHthcmd1bWVudH1gIDogYmluYXJ5O1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHNoZWJhbmdDb21tYW5kID0gcmVxdWlyZSgnc2hlYmFuZy1jb21tYW5kJyk7XG5cbmZ1bmN0aW9uIHJlYWRTaGViYW5nKGNvbW1hbmQpIHtcbiAgICAvLyBSZWFkIHRoZSBmaXJzdCAxNTAgYnl0ZXMgZnJvbSB0aGUgZmlsZVxuICAgIGNvbnN0IHNpemUgPSAxNTA7XG4gICAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jKHNpemUpO1xuXG4gICAgbGV0IGZkO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgZmQgPSBmcy5vcGVuU3luYyhjb21tYW5kLCAncicpO1xuICAgICAgICBmcy5yZWFkU3luYyhmZCwgYnVmZmVyLCAwLCBzaXplLCAwKTtcbiAgICAgICAgZnMuY2xvc2VTeW5jKGZkKTtcbiAgICB9IGNhdGNoIChlKSB7IC8qIEVtcHR5ICovIH1cblxuICAgIC8vIEF0dGVtcHQgdG8gZXh0cmFjdCBzaGViYW5nIChudWxsIGlzIHJldHVybmVkIGlmIG5vdCBhIHNoZWJhbmcpXG4gICAgcmV0dXJuIHNoZWJhbmdDb21tYW5kKGJ1ZmZlci50b1N0cmluZygpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWFkU2hlYmFuZztcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCByZXNvbHZlQ29tbWFuZCA9IHJlcXVpcmUoJy4vdXRpbC9yZXNvbHZlQ29tbWFuZCcpO1xuY29uc3QgZXNjYXBlID0gcmVxdWlyZSgnLi91dGlsL2VzY2FwZScpO1xuY29uc3QgcmVhZFNoZWJhbmcgPSByZXF1aXJlKCcuL3V0aWwvcmVhZFNoZWJhbmcnKTtcblxuY29uc3QgaXNXaW4gPSBwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInO1xuY29uc3QgaXNFeGVjdXRhYmxlUmVnRXhwID0gL1xcLig/OmNvbXxleGUpJC9pO1xuY29uc3QgaXNDbWRTaGltUmVnRXhwID0gL25vZGVfbW9kdWxlc1tcXFxcL10uYmluW1xcXFwvXVteXFxcXC9dK1xcLmNtZCQvaTtcblxuZnVuY3Rpb24gZGV0ZWN0U2hlYmFuZyhwYXJzZWQpIHtcbiAgICBwYXJzZWQuZmlsZSA9IHJlc29sdmVDb21tYW5kKHBhcnNlZCk7XG5cbiAgICBjb25zdCBzaGViYW5nID0gcGFyc2VkLmZpbGUgJiYgcmVhZFNoZWJhbmcocGFyc2VkLmZpbGUpO1xuXG4gICAgaWYgKHNoZWJhbmcpIHtcbiAgICAgICAgcGFyc2VkLmFyZ3MudW5zaGlmdChwYXJzZWQuZmlsZSk7XG4gICAgICAgIHBhcnNlZC5jb21tYW5kID0gc2hlYmFuZztcblxuICAgICAgICByZXR1cm4gcmVzb2x2ZUNvbW1hbmQocGFyc2VkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2VkLmZpbGU7XG59XG5cbmZ1bmN0aW9uIHBhcnNlTm9uU2hlbGwocGFyc2VkKSB7XG4gICAgaWYgKCFpc1dpbikge1xuICAgICAgICByZXR1cm4gcGFyc2VkO1xuICAgIH1cblxuICAgIC8vIERldGVjdCAmIGFkZCBzdXBwb3J0IGZvciBzaGViYW5nc1xuICAgIGNvbnN0IGNvbW1hbmRGaWxlID0gZGV0ZWN0U2hlYmFuZyhwYXJzZWQpO1xuXG4gICAgLy8gV2UgZG9uJ3QgbmVlZCBhIHNoZWxsIGlmIHRoZSBjb21tYW5kIGZpbGVuYW1lIGlzIGFuIGV4ZWN1dGFibGVcbiAgICBjb25zdCBuZWVkc1NoZWxsID0gIWlzRXhlY3V0YWJsZVJlZ0V4cC50ZXN0KGNvbW1hbmRGaWxlKTtcblxuICAgIC8vIElmIGEgc2hlbGwgaXMgcmVxdWlyZWQsIHVzZSBjbWQuZXhlIGFuZCB0YWtlIGNhcmUgb2YgZXNjYXBpbmcgZXZlcnl0aGluZyBjb3JyZWN0bHlcbiAgICAvLyBOb3RlIHRoYXQgYGZvcmNlU2hlbGxgIGlzIGFuIGhpZGRlbiBvcHRpb24gdXNlZCBvbmx5IGluIHRlc3RzXG4gICAgaWYgKHBhcnNlZC5vcHRpb25zLmZvcmNlU2hlbGwgfHwgbmVlZHNTaGVsbCkge1xuICAgICAgICAvLyBOZWVkIHRvIGRvdWJsZSBlc2NhcGUgbWV0YSBjaGFycyBpZiB0aGUgY29tbWFuZCBpcyBhIGNtZC1zaGltIGxvY2F0ZWQgaW4gYG5vZGVfbW9kdWxlcy8uYmluL2BcbiAgICAgICAgLy8gVGhlIGNtZC1zaGltIHNpbXBseSBjYWxscyBleGVjdXRlIHRoZSBwYWNrYWdlIGJpbiBmaWxlIHdpdGggTm9kZUpTLCBwcm94eWluZyBhbnkgYXJndW1lbnRcbiAgICAgICAgLy8gQmVjYXVzZSB0aGUgZXNjYXBlIG9mIG1ldGFjaGFycyB3aXRoIF4gZ2V0cyBpbnRlcnByZXRlZCB3aGVuIHRoZSBjbWQuZXhlIGlzIGZpcnN0IGNhbGxlZCxcbiAgICAgICAgLy8gd2UgbmVlZCB0byBkb3VibGUgZXNjYXBlIHRoZW1cbiAgICAgICAgY29uc3QgbmVlZHNEb3VibGVFc2NhcGVNZXRhQ2hhcnMgPSBpc0NtZFNoaW1SZWdFeHAudGVzdChjb21tYW5kRmlsZSk7XG5cbiAgICAgICAgLy8gTm9ybWFsaXplIHBvc2l4IHBhdGhzIGludG8gT1MgY29tcGF0aWJsZSBwYXRocyAoZS5nLjogZm9vL2JhciAtPiBmb29cXGJhcilcbiAgICAgICAgLy8gVGhpcyBpcyBuZWNlc3Nhcnkgb3RoZXJ3aXNlIGl0IHdpbGwgYWx3YXlzIGZhaWwgd2l0aCBFTk9FTlQgaW4gdGhvc2UgY2FzZXNcbiAgICAgICAgcGFyc2VkLmNvbW1hbmQgPSBwYXRoLm5vcm1hbGl6ZShwYXJzZWQuY29tbWFuZCk7XG5cbiAgICAgICAgLy8gRXNjYXBlIGNvbW1hbmQgJiBhcmd1bWVudHNcbiAgICAgICAgcGFyc2VkLmNvbW1hbmQgPSBlc2NhcGUuY29tbWFuZChwYXJzZWQuY29tbWFuZCk7XG4gICAgICAgIHBhcnNlZC5hcmdzID0gcGFyc2VkLmFyZ3MubWFwKChhcmcpID0+IGVzY2FwZS5hcmd1bWVudChhcmcsIG5lZWRzRG91YmxlRXNjYXBlTWV0YUNoYXJzKSk7XG5cbiAgICAgICAgY29uc3Qgc2hlbGxDb21tYW5kID0gW3BhcnNlZC5jb21tYW5kXS5jb25jYXQocGFyc2VkLmFyZ3MpLmpvaW4oJyAnKTtcblxuICAgICAgICBwYXJzZWQuYXJncyA9IFsnL2QnLCAnL3MnLCAnL2MnLCBgXCIke3NoZWxsQ29tbWFuZH1cImBdO1xuICAgICAgICBwYXJzZWQuY29tbWFuZCA9IHByb2Nlc3MuZW52LmNvbXNwZWMgfHwgJ2NtZC5leGUnO1xuICAgICAgICBwYXJzZWQub3B0aW9ucy53aW5kb3dzVmVyYmF0aW1Bcmd1bWVudHMgPSB0cnVlOyAvLyBUZWxsIG5vZGUncyBzcGF3biB0aGF0IHRoZSBhcmd1bWVudHMgYXJlIGFscmVhZHkgZXNjYXBlZFxuICAgIH1cblxuICAgIHJldHVybiBwYXJzZWQ7XG59XG5cbmZ1bmN0aW9uIHBhcnNlKGNvbW1hbmQsIGFyZ3MsIG9wdGlvbnMpIHtcbiAgICAvLyBOb3JtYWxpemUgYXJndW1lbnRzLCBzaW1pbGFyIHRvIG5vZGVqc1xuICAgIGlmIChhcmdzICYmICFBcnJheS5pc0FycmF5KGFyZ3MpKSB7XG4gICAgICAgIG9wdGlvbnMgPSBhcmdzO1xuICAgICAgICBhcmdzID0gbnVsbDtcbiAgICB9XG5cbiAgICBhcmdzID0gYXJncyA/IGFyZ3Muc2xpY2UoMCkgOiBbXTsgLy8gQ2xvbmUgYXJyYXkgdG8gYXZvaWQgY2hhbmdpbmcgdGhlIG9yaWdpbmFsXG4gICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpOyAvLyBDbG9uZSBvYmplY3QgdG8gYXZvaWQgY2hhbmdpbmcgdGhlIG9yaWdpbmFsXG5cbiAgICAvLyBCdWlsZCBvdXIgcGFyc2VkIG9iamVjdFxuICAgIGNvbnN0IHBhcnNlZCA9IHtcbiAgICAgICAgY29tbWFuZCxcbiAgICAgICAgYXJncyxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgZmlsZTogdW5kZWZpbmVkLFxuICAgICAgICBvcmlnaW5hbDoge1xuICAgICAgICAgICAgY29tbWFuZCxcbiAgICAgICAgICAgIGFyZ3MsXG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIERlbGVnYXRlIGZ1cnRoZXIgcGFyc2luZyB0byBzaGVsbCBvciBub24tc2hlbGxcbiAgICByZXR1cm4gb3B0aW9ucy5zaGVsbCA/IHBhcnNlZCA6IHBhcnNlTm9uU2hlbGwocGFyc2VkKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGlzV2luID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJztcblxuZnVuY3Rpb24gbm90Rm91bmRFcnJvcihvcmlnaW5hbCwgc3lzY2FsbCkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBFcnJvcihgJHtzeXNjYWxsfSAke29yaWdpbmFsLmNvbW1hbmR9IEVOT0VOVGApLCB7XG4gICAgICAgIGNvZGU6ICdFTk9FTlQnLFxuICAgICAgICBlcnJubzogJ0VOT0VOVCcsXG4gICAgICAgIHN5c2NhbGw6IGAke3N5c2NhbGx9ICR7b3JpZ2luYWwuY29tbWFuZH1gLFxuICAgICAgICBwYXRoOiBvcmlnaW5hbC5jb21tYW5kLFxuICAgICAgICBzcGF3bmFyZ3M6IG9yaWdpbmFsLmFyZ3MsXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGhvb2tDaGlsZFByb2Nlc3MoY3AsIHBhcnNlZCkge1xuICAgIGlmICghaXNXaW4pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9yaWdpbmFsRW1pdCA9IGNwLmVtaXQ7XG5cbiAgICBjcC5lbWl0ID0gZnVuY3Rpb24gKG5hbWUsIGFyZzEpIHtcbiAgICAgICAgLy8gSWYgZW1pdHRpbmcgXCJleGl0XCIgZXZlbnQgYW5kIGV4aXQgY29kZSBpcyAxLCB3ZSBuZWVkIHRvIGNoZWNrIGlmXG4gICAgICAgIC8vIHRoZSBjb21tYW5kIGV4aXN0cyBhbmQgZW1pdCBhbiBcImVycm9yXCIgaW5zdGVhZFxuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL0luZGlnb1VuaXRlZC9ub2RlLWNyb3NzLXNwYXduL2lzc3Vlcy8xNlxuICAgICAgICBpZiAobmFtZSA9PT0gJ2V4aXQnKSB7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSB2ZXJpZnlFTk9FTlQoYXJnMSwgcGFyc2VkKTtcblxuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbEVtaXQuY2FsbChjcCwgJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcmlnaW5hbEVtaXQuYXBwbHkoY3AsIGFyZ3VtZW50cyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcHJlZmVyLXJlc3QtcGFyYW1zXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gdmVyaWZ5RU5PRU5UKHN0YXR1cywgcGFyc2VkKSB7XG4gICAgaWYgKGlzV2luICYmIHN0YXR1cyA9PT0gMSAmJiAhcGFyc2VkLmZpbGUpIHtcbiAgICAgICAgcmV0dXJuIG5vdEZvdW5kRXJyb3IocGFyc2VkLm9yaWdpbmFsLCAnc3Bhd24nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gdmVyaWZ5RU5PRU5UU3luYyhzdGF0dXMsIHBhcnNlZCkge1xuICAgIGlmIChpc1dpbiAmJiBzdGF0dXMgPT09IDEgJiYgIXBhcnNlZC5maWxlKSB7XG4gICAgICAgIHJldHVybiBub3RGb3VuZEVycm9yKHBhcnNlZC5vcmlnaW5hbCwgJ3NwYXduU3luYycpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBob29rQ2hpbGRQcm9jZXNzLFxuICAgIHZlcmlmeUVOT0VOVCxcbiAgICB2ZXJpZnlFTk9FTlRTeW5jLFxuICAgIG5vdEZvdW5kRXJyb3IsXG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY3AgPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJyk7XG5jb25zdCBwYXJzZSA9IHJlcXVpcmUoJy4vbGliL3BhcnNlJyk7XG5jb25zdCBlbm9lbnQgPSByZXF1aXJlKCcuL2xpYi9lbm9lbnQnKTtcblxuZnVuY3Rpb24gc3Bhd24oY29tbWFuZCwgYXJncywgb3B0aW9ucykge1xuICAgIC8vIFBhcnNlIHRoZSBhcmd1bWVudHNcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZShjb21tYW5kLCBhcmdzLCBvcHRpb25zKTtcblxuICAgIC8vIFNwYXduIHRoZSBjaGlsZCBwcm9jZXNzXG4gICAgY29uc3Qgc3Bhd25lZCA9IGNwLnNwYXduKHBhcnNlZC5jb21tYW5kLCBwYXJzZWQuYXJncywgcGFyc2VkLm9wdGlvbnMpO1xuXG4gICAgLy8gSG9vayBpbnRvIGNoaWxkIHByb2Nlc3MgXCJleGl0XCIgZXZlbnQgdG8gZW1pdCBhbiBlcnJvciBpZiB0aGUgY29tbWFuZFxuICAgIC8vIGRvZXMgbm90IGV4aXN0cywgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vSW5kaWdvVW5pdGVkL25vZGUtY3Jvc3Mtc3Bhd24vaXNzdWVzLzE2XG4gICAgZW5vZW50Lmhvb2tDaGlsZFByb2Nlc3Moc3Bhd25lZCwgcGFyc2VkKTtcblxuICAgIHJldHVybiBzcGF3bmVkO1xufVxuXG5mdW5jdGlvbiBzcGF3blN5bmMoY29tbWFuZCwgYXJncywgb3B0aW9ucykge1xuICAgIC8vIFBhcnNlIHRoZSBhcmd1bWVudHNcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZShjb21tYW5kLCBhcmdzLCBvcHRpb25zKTtcblxuICAgIC8vIFNwYXduIHRoZSBjaGlsZCBwcm9jZXNzXG4gICAgY29uc3QgcmVzdWx0ID0gY3Auc3Bhd25TeW5jKHBhcnNlZC5jb21tYW5kLCBwYXJzZWQuYXJncywgcGFyc2VkLm9wdGlvbnMpO1xuXG4gICAgLy8gQW5hbHl6ZSBpZiB0aGUgY29tbWFuZCBkb2VzIG5vdCBleGlzdCwgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vSW5kaWdvVW5pdGVkL25vZGUtY3Jvc3Mtc3Bhd24vaXNzdWVzLzE2XG4gICAgcmVzdWx0LmVycm9yID0gcmVzdWx0LmVycm9yIHx8IGVub2VudC52ZXJpZnlFTk9FTlRTeW5jKHJlc3VsdC5zdGF0dXMsIHBhcnNlZCk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNwYXduO1xubW9kdWxlLmV4cG9ydHMuc3Bhd24gPSBzcGF3bjtcbm1vZHVsZS5leHBvcnRzLnN5bmMgPSBzcGF3blN5bmM7XG5cbm1vZHVsZS5leHBvcnRzLl9wYXJzZSA9IHBhcnNlO1xubW9kdWxlLmV4cG9ydHMuX2Vub2VudCA9IGVub2VudDtcbiIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXRoS2V5KG9wdGlvbnMgPSB7fSkge1xuXHRjb25zdCB7XG5cdFx0ZW52ID0gcHJvY2Vzcy5lbnYsXG5cdFx0cGxhdGZvcm0gPSBwcm9jZXNzLnBsYXRmb3JtXG5cdH0gPSBvcHRpb25zO1xuXG5cdGlmIChwbGF0Zm9ybSAhPT0gJ3dpbjMyJykge1xuXHRcdHJldHVybiAnUEFUSCc7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0LmtleXMoZW52KS5yZXZlcnNlKCkuZmluZChrZXkgPT4ga2V5LnRvVXBwZXJDYXNlKCkgPT09ICdQQVRIJykgfHwgJ1BhdGgnO1xufVxuIiwgImV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxheSh7c2Vjb25kcywgbWlsbGlzZWNvbmRzfSA9IHt9KSB7XG5cdGxldCBkdXJhdGlvbjtcblx0aWYgKHR5cGVvZiBzZWNvbmRzID09PSAnbnVtYmVyJykge1xuXHRcdGR1cmF0aW9uID0gc2Vjb25kcyAqIDEwMDA7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG1pbGxpc2Vjb25kcyA9PT0gJ251bWJlcicpIHtcblx0XHRkdXJhdGlvbiA9IG1pbGxpc2Vjb25kcztcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhbiBvYmplY3Qgd2l0aCBlaXRoZXIgYHNlY29uZHNgIG9yIGBtaWxsaXNlY29uZHNgLicpO1xuXHR9XG5cblx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuXHRcdHNldFRpbWVvdXQocmVzb2x2ZSwgZHVyYXRpb24pO1xuXHR9KTtcbn1cbiIsICJpbXBvcnQge3Byb21pc2lmeX0gZnJvbSAnbm9kZTp1dGlsJztcbmltcG9ydCB7ZXhlY0ZpbGUgYXMgZXhlY0ZpbGVDYWxsYmFjaywgZXhlY0ZpbGVTeW5jIGFzIGV4ZWNGaWxlU3luY09yaWdpbmFsfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7ZmlsZVVSTFRvUGF0aH0gZnJvbSAnbm9kZTp1cmwnO1xuXG5jb25zdCBleGVjRmlsZU9yaWdpbmFsID0gcHJvbWlzaWZ5KGV4ZWNGaWxlQ2FsbGJhY2spO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9QYXRoKHVybE9yUGF0aCkge1xuXHRyZXR1cm4gdXJsT3JQYXRoIGluc3RhbmNlb2YgVVJMID8gZmlsZVVSTFRvUGF0aCh1cmxPclBhdGgpIDogdXJsT3JQYXRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm9vdERpcmVjdG9yeShwYXRoSW5wdXQpIHtcblx0cmV0dXJuIHBhdGgucGFyc2UodG9QYXRoKHBhdGhJbnB1dCkpLnJvb3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzZVBhdGhVcChzdGFydFBhdGgpIHtcblx0cmV0dXJuIHtcblx0XHQqIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuXHRcdFx0bGV0IGN1cnJlbnRQYXRoID0gcGF0aC5yZXNvbHZlKHRvUGF0aChzdGFydFBhdGgpKTtcblx0XHRcdGxldCBwcmV2aW91c1BhdGg7XG5cblx0XHRcdHdoaWxlIChwcmV2aW91c1BhdGggIT09IGN1cnJlbnRQYXRoKSB7XG5cdFx0XHRcdHlpZWxkIGN1cnJlbnRQYXRoO1xuXHRcdFx0XHRwcmV2aW91c1BhdGggPSBjdXJyZW50UGF0aDtcblx0XHRcdFx0Y3VycmVudFBhdGggPSBwYXRoLnJlc29sdmUoY3VycmVudFBhdGgsICcuLicpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdH07XG59XG5cbmNvbnN0IFRFTl9NRUdBQllURVNfSU5fQllURVMgPSAxMCAqIDEwMjQgKiAxMDI0O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY0ZpbGUoZmlsZSwgYXJndW1lbnRzXywgb3B0aW9ucyA9IHt9KSB7XG5cdHJldHVybiBleGVjRmlsZU9yaWdpbmFsKGZpbGUsIGFyZ3VtZW50c18sIHtcblx0XHRtYXhCdWZmZXI6IFRFTl9NRUdBQllURVNfSU5fQllURVMsXG5cdFx0Li4ub3B0aW9ucyxcblx0fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjRmlsZVN5bmMoZmlsZSwgYXJndW1lbnRzXyA9IFtdLCBvcHRpb25zID0ge30pIHtcblx0cmV0dXJuIGV4ZWNGaWxlU3luY09yaWdpbmFsKGZpbGUsIGFyZ3VtZW50c18sIHtcblx0XHRtYXhCdWZmZXI6IFRFTl9NRUdBQllURVNfSU5fQllURVMsXG5cdFx0ZW5jb2Rpbmc6ICd1dGY4Jyxcblx0XHRzdGRpbzogJ3BpcGUnLFxuXHRcdC4uLm9wdGlvbnMsXG5cdH0pO1xufVxuXG5leHBvcnQgKiBmcm9tICcuL2RlZmF1bHQuanMnO1xuIiwgImltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2Vzcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHBhdGhLZXkgZnJvbSAncGF0aC1rZXknO1xuaW1wb3J0IHt0b1BhdGgsIHRyYXZlcnNlUGF0aFVwfSBmcm9tICd1bmljb3JuLW1hZ2ljJztcblxuZXhwb3J0IGNvbnN0IG5wbVJ1blBhdGggPSAoe1xuXHRjd2QgPSBwcm9jZXNzLmN3ZCgpLFxuXHRwYXRoOiBwYXRoT3B0aW9uID0gcHJvY2Vzcy5lbnZbcGF0aEtleSgpXSxcblx0cHJlZmVyTG9jYWwgPSB0cnVlLFxuXHRleGVjUGF0aCA9IHByb2Nlc3MuZXhlY1BhdGgsXG5cdGFkZEV4ZWNQYXRoID0gdHJ1ZSxcbn0gPSB7fSkgPT4ge1xuXHRjb25zdCBjd2RQYXRoID0gcGF0aC5yZXNvbHZlKHRvUGF0aChjd2QpKTtcblx0Y29uc3QgcmVzdWx0ID0gW107XG5cdGNvbnN0IHBhdGhQYXJ0cyA9IHBhdGhPcHRpb24uc3BsaXQocGF0aC5kZWxpbWl0ZXIpO1xuXG5cdGlmIChwcmVmZXJMb2NhbCkge1xuXHRcdGFwcGx5UHJlZmVyTG9jYWwocmVzdWx0LCBwYXRoUGFydHMsIGN3ZFBhdGgpO1xuXHR9XG5cblx0aWYgKGFkZEV4ZWNQYXRoKSB7XG5cdFx0YXBwbHlFeGVjUGF0aChyZXN1bHQsIHBhdGhQYXJ0cywgZXhlY1BhdGgsIGN3ZFBhdGgpO1xuXHR9XG5cblx0cmV0dXJuIHBhdGhPcHRpb24gPT09ICcnIHx8IHBhdGhPcHRpb24gPT09IHBhdGguZGVsaW1pdGVyXG5cdFx0PyBgJHtyZXN1bHQuam9pbihwYXRoLmRlbGltaXRlcil9JHtwYXRoT3B0aW9ufWBcblx0XHQ6IFsuLi5yZXN1bHQsIHBhdGhPcHRpb25dLmpvaW4ocGF0aC5kZWxpbWl0ZXIpO1xufTtcblxuY29uc3QgYXBwbHlQcmVmZXJMb2NhbCA9IChyZXN1bHQsIHBhdGhQYXJ0cywgY3dkUGF0aCkgPT4ge1xuXHRmb3IgKGNvbnN0IGRpcmVjdG9yeSBvZiB0cmF2ZXJzZVBhdGhVcChjd2RQYXRoKSkge1xuXHRcdGNvbnN0IHBhdGhQYXJ0ID0gcGF0aC5qb2luKGRpcmVjdG9yeSwgJ25vZGVfbW9kdWxlcy8uYmluJyk7XG5cdFx0aWYgKCFwYXRoUGFydHMuaW5jbHVkZXMocGF0aFBhcnQpKSB7XG5cdFx0XHRyZXN1bHQucHVzaChwYXRoUGFydCk7XG5cdFx0fVxuXHR9XG59O1xuXG4vLyBFbnN1cmUgdGhlIHJ1bm5pbmcgYG5vZGVgIGJpbmFyeSBpcyB1c2VkXG5jb25zdCBhcHBseUV4ZWNQYXRoID0gKHJlc3VsdCwgcGF0aFBhcnRzLCBleGVjUGF0aCwgY3dkUGF0aCkgPT4ge1xuXHRjb25zdCBwYXRoUGFydCA9IHBhdGgucmVzb2x2ZShjd2RQYXRoLCB0b1BhdGgoZXhlY1BhdGgpLCAnLi4nKTtcblx0aWYgKCFwYXRoUGFydHMuaW5jbHVkZXMocGF0aFBhcnQpKSB7XG5cdFx0cmVzdWx0LnB1c2gocGF0aFBhcnQpO1xuXHR9XG59O1xuXG5leHBvcnQgY29uc3QgbnBtUnVuUGF0aEVudiA9ICh7ZW52ID0gcHJvY2Vzcy5lbnYsIC4uLm9wdGlvbnN9ID0ge30pID0+IHtcblx0ZW52ID0gey4uLmVudn07XG5cblx0Y29uc3QgcGF0aE5hbWUgPSBwYXRoS2V5KHtlbnZ9KTtcblx0b3B0aW9ucy5wYXRoID0gZW52W3BhdGhOYW1lXTtcblx0ZW52W3BhdGhOYW1lXSA9IG5wbVJ1blBhdGgob3B0aW9ucyk7XG5cblx0cmV0dXJuIGVudjtcbn07XG4iLCAiLy8gV2hlbiB0aGUgc3VicHJvY2VzcyBmYWlscywgdGhpcyBpcyB0aGUgZXJyb3IgaW5zdGFuY2UgYmVpbmcgcmV0dXJuZWQuXG4vLyBJZiBhbm90aGVyIGVycm9yIGluc3RhbmNlIGlzIGJlaW5nIHRocm93biwgaXQgaXMga2VwdCBhcyBgZXJyb3IuY2F1c2VgLlxuZXhwb3J0IGNvbnN0IGdldEZpbmFsRXJyb3IgPSAob3JpZ2luYWxFcnJvciwgbWVzc2FnZSwgaXNTeW5jKSA9PiB7XG5cdGNvbnN0IEVycm9yQ2xhc3MgPSBpc1N5bmMgPyBFeGVjYVN5bmNFcnJvciA6IEV4ZWNhRXJyb3I7XG5cdGNvbnN0IG9wdGlvbnMgPSBvcmlnaW5hbEVycm9yIGluc3RhbmNlb2YgRGlzY2FyZGVkRXJyb3IgPyB7fSA6IHtjYXVzZTogb3JpZ2luYWxFcnJvcn07XG5cdHJldHVybiBuZXcgRXJyb3JDbGFzcyhtZXNzYWdlLCBvcHRpb25zKTtcbn07XG5cbi8vIEluZGljYXRlcyB0aGF0IHRoZSBlcnJvciBpcyB1c2VkIG9ubHkgdG8gaW50ZXJydXB0IGNvbnRyb2wgZmxvdywgYnV0IG5vdCBpbiB0aGUgcmV0dXJuIHZhbHVlXG5leHBvcnQgY2xhc3MgRGlzY2FyZGVkRXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxuXG4vLyBQcm9wZXIgd2F5IHRvIHNldCBgZXJyb3IubmFtZWA6IGl0IHNob3VsZCBiZSBpbmhlcml0ZWQgYW5kIG5vbi1lbnVtZXJhYmxlXG5jb25zdCBzZXRFcnJvck5hbWUgPSAoRXJyb3JDbGFzcywgdmFsdWUpID0+IHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KEVycm9yQ2xhc3MucHJvdG90eXBlLCAnbmFtZScsIHtcblx0XHR2YWx1ZSxcblx0XHR3cml0YWJsZTogdHJ1ZSxcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdH0pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoRXJyb3JDbGFzcy5wcm90b3R5cGUsIGV4ZWNhRXJyb3JTeW1ib2wsIHtcblx0XHR2YWx1ZTogdHJ1ZSxcblx0XHR3cml0YWJsZTogZmFsc2UsXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0fSk7XG59O1xuXG4vLyBVbmxpa2UgYGluc3RhbmNlb2ZgLCB0aGlzIHdvcmtzIGFjcm9zcyByZWFsbXNcbmV4cG9ydCBjb25zdCBpc0V4ZWNhRXJyb3IgPSBlcnJvciA9PiBpc0Vycm9ySW5zdGFuY2UoZXJyb3IpICYmIGV4ZWNhRXJyb3JTeW1ib2wgaW4gZXJyb3I7XG5cbmNvbnN0IGV4ZWNhRXJyb3JTeW1ib2wgPSBTeW1ib2woJ2lzRXhlY2FFcnJvcicpO1xuXG5leHBvcnQgY29uc3QgaXNFcnJvckluc3RhbmNlID0gdmFsdWUgPT4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRXJyb3JdJztcblxuLy8gV2UgdXNlIHR3byBkaWZmZXJlbnQgRXJyb3IgY2xhc3NlcyBmb3IgYXN5bmMvc3luYyBtZXRob2RzIHNpbmNlIHRoZXkgaGF2ZSBzbGlnaHRseSBkaWZmZXJlbnQgc2hhcGUgYW5kIHR5cGVzXG5leHBvcnQgY2xhc3MgRXhlY2FFcnJvciBleHRlbmRzIEVycm9yIHt9XG5zZXRFcnJvck5hbWUoRXhlY2FFcnJvciwgRXhlY2FFcnJvci5uYW1lKTtcblxuZXhwb3J0IGNsYXNzIEV4ZWNhU3luY0Vycm9yIGV4dGVuZHMgRXJyb3Ige31cbnNldEVycm9yTmFtZShFeGVjYVN5bmNFcnJvciwgRXhlY2FTeW5jRXJyb3IubmFtZSk7XG4iLCAiXG5leHBvcnQgY29uc3QgZ2V0UmVhbHRpbWVTaWduYWxzPSgpPT57XG5jb25zdCBsZW5ndGg9U0lHUlRNQVgtU0lHUlRNSU4rMTtcbnJldHVybiBBcnJheS5mcm9tKHtsZW5ndGh9LGdldFJlYWx0aW1lU2lnbmFsKVxufTtcblxuY29uc3QgZ2V0UmVhbHRpbWVTaWduYWw9KHZhbHVlLGluZGV4KT0+KHtcbm5hbWU6YFNJR1JUJHtpbmRleCsxfWAsXG5udW1iZXI6U0lHUlRNSU4raW5kZXgsXG5hY3Rpb246XCJ0ZXJtaW5hdGVcIixcbmRlc2NyaXB0aW9uOlwiQXBwbGljYXRpb24tc3BlY2lmaWMgc2lnbmFsIChyZWFsdGltZSlcIixcbnN0YW5kYXJkOlwicG9zaXhcIlxufSk7XG5cbmNvbnN0IFNJR1JUTUlOPTM0O1xuZXhwb3J0IGNvbnN0IFNJR1JUTUFYPTY0OyIsICJcblxuZXhwb3J0IGNvbnN0IFNJR05BTFM9W1xue1xubmFtZTpcIlNJR0hVUFwiLFxubnVtYmVyOjEsXG5hY3Rpb246XCJ0ZXJtaW5hdGVcIixcbmRlc2NyaXB0aW9uOlwiVGVybWluYWwgY2xvc2VkXCIsXG5zdGFuZGFyZDpcInBvc2l4XCJcbn0sXG57XG5uYW1lOlwiU0lHSU5UXCIsXG5udW1iZXI6MixcbmFjdGlvbjpcInRlcm1pbmF0ZVwiLFxuZGVzY3JpcHRpb246XCJVc2VyIGludGVycnVwdGlvbiB3aXRoIENUUkwtQ1wiLFxuc3RhbmRhcmQ6XCJhbnNpXCJcbn0sXG57XG5uYW1lOlwiU0lHUVVJVFwiLFxubnVtYmVyOjMsXG5hY3Rpb246XCJjb3JlXCIsXG5kZXNjcmlwdGlvbjpcIlVzZXIgaW50ZXJydXB0aW9uIHdpdGggQ1RSTC1cXFxcXCIsXG5zdGFuZGFyZDpcInBvc2l4XCJcbn0sXG57XG5uYW1lOlwiU0lHSUxMXCIsXG5udW1iZXI6NCxcbmFjdGlvbjpcImNvcmVcIixcbmRlc2NyaXB0aW9uOlwiSW52YWxpZCBtYWNoaW5lIGluc3RydWN0aW9uXCIsXG5zdGFuZGFyZDpcImFuc2lcIlxufSxcbntcbm5hbWU6XCJTSUdUUkFQXCIsXG5udW1iZXI6NSxcbmFjdGlvbjpcImNvcmVcIixcbmRlc2NyaXB0aW9uOlwiRGVidWdnZXIgYnJlYWtwb2ludFwiLFxuc3RhbmRhcmQ6XCJwb3NpeFwiXG59LFxue1xubmFtZTpcIlNJR0FCUlRcIixcbm51bWJlcjo2LFxuYWN0aW9uOlwiY29yZVwiLFxuZGVzY3JpcHRpb246XCJBYm9ydGVkXCIsXG5zdGFuZGFyZDpcImFuc2lcIlxufSxcbntcbm5hbWU6XCJTSUdJT1RcIixcbm51bWJlcjo2LFxuYWN0aW9uOlwiY29yZVwiLFxuZGVzY3JpcHRpb246XCJBYm9ydGVkXCIsXG5zdGFuZGFyZDpcImJzZFwiXG59LFxue1xubmFtZTpcIlNJR0JVU1wiLFxubnVtYmVyOjcsXG5hY3Rpb246XCJjb3JlXCIsXG5kZXNjcmlwdGlvbjpcblwiQnVzIGVycm9yIGR1ZSB0byBtaXNhbGlnbmVkLCBub24tZXhpc3RpbmcgYWRkcmVzcyBvciBwYWdpbmcgZXJyb3JcIixcbnN0YW5kYXJkOlwiYnNkXCJcbn0sXG57XG5uYW1lOlwiU0lHRU1UXCIsXG5udW1iZXI6NyxcbmFjdGlvbjpcInRlcm1pbmF0ZVwiLFxuZGVzY3JpcHRpb246XCJDb21tYW5kIHNob3VsZCBiZSBlbXVsYXRlZCBidXQgaXMgbm90IGltcGxlbWVudGVkXCIsXG5zdGFuZGFyZDpcIm90aGVyXCJcbn0sXG57XG5uYW1lOlwiU0lHRlBFXCIsXG5udW1iZXI6OCxcbmFjdGlvbjpcImNvcmVcIixcbmRlc2NyaXB0aW9uOlwiRmxvYXRpbmcgcG9pbnQgYXJpdGhtZXRpYyBlcnJvclwiLFxuc3RhbmRhcmQ6XCJhbnNpXCJcbn0sXG57XG5uYW1lOlwiU0lHS0lMTFwiLFxubnVtYmVyOjksXG5hY3Rpb246XCJ0ZXJtaW5hdGVcIixcbmRlc2NyaXB0aW9uOlwiRm9yY2VkIHRlcm1pbmF0aW9uXCIsXG5zdGFuZGFyZDpcInBvc2l4XCIsXG5mb3JjZWQ6dHJ1ZVxufSxcbntcbm5hbWU6XCJTSUdVU1IxXCIsXG5udW1iZXI6MTAsXG5hY3Rpb246XCJ0ZXJtaW5hdGVcIixcbmRlc2NyaXB0aW9uOlwiQXBwbGljYXRpb24tc3BlY2lmaWMgc2lnbmFsXCIsXG5zdGFuZGFyZDpcInBvc2l4XCJcbn0sXG57XG5uYW1lOlwiU0lHU0VHVlwiLFxubnVtYmVyOjExLFxuYWN0aW9uOlwiY29yZVwiLFxuZGVzY3JpcHRpb246XCJTZWdtZW50YXRpb24gZmF1bHRcIixcbnN0YW5kYXJkOlwiYW5zaVwiXG59LFxue1xubmFtZTpcIlNJR1VTUjJcIixcbm51bWJlcjoxMixcbmFjdGlvbjpcInRlcm1pbmF0ZVwiLFxuZGVzY3JpcHRpb246XCJBcHBsaWNhdGlvbi1zcGVjaWZpYyBzaWduYWxcIixcbnN0YW5kYXJkOlwicG9zaXhcIlxufSxcbntcbm5hbWU6XCJTSUdQSVBFXCIsXG5udW1iZXI6MTMsXG5hY3Rpb246XCJ0ZXJtaW5hdGVcIixcbmRlc2NyaXB0aW9uOlwiQnJva2VuIHBpcGUgb3Igc29ja2V0XCIsXG5zdGFuZGFyZDpcInBvc2l4XCJcbn0sXG57XG5uYW1lOlwiU0lHQUxSTVwiLFxubnVtYmVyOjE0LFxuYWN0aW9uOlwidGVybWluYXRlXCIsXG5kZXNjcmlwdGlvbjpcIlRpbWVvdXQgb3IgdGltZXJcIixcbnN0YW5kYXJkOlwicG9zaXhcIlxufSxcbntcbm5hbWU6XCJTSUdURVJNXCIsXG5udW1iZXI6MTUsXG5hY3Rpb246XCJ0ZXJtaW5hdGVcIixcbmRlc2NyaXB0aW9uOlwiVGVybWluYXRpb25cIixcbnN0YW5kYXJkOlwiYW5zaVwiXG59LFxue1xubmFtZTpcIlNJR1NUS0ZMVFwiLFxubnVtYmVyOjE2LFxuYWN0aW9uOlwidGVybWluYXRlXCIsXG5kZXNjcmlwdGlvbjpcIlN0YWNrIGlzIGVtcHR5IG9yIG92ZXJmbG93ZWRcIixcbnN0YW5kYXJkOlwib3RoZXJcIlxufSxcbntcbm5hbWU6XCJTSUdDSExEXCIsXG5udW1iZXI6MTcsXG5hY3Rpb246XCJpZ25vcmVcIixcbmRlc2NyaXB0aW9uOlwiQ2hpbGQgcHJvY2VzcyB0ZXJtaW5hdGVkLCBwYXVzZWQgb3IgdW5wYXVzZWRcIixcbnN0YW5kYXJkOlwicG9zaXhcIlxufSxcbntcbm5hbWU6XCJTSUdDTERcIixcbm51bWJlcjoxNyxcbmFjdGlvbjpcImlnbm9yZVwiLFxuZGVzY3JpcHRpb246XCJDaGlsZCBwcm9jZXNzIHRlcm1pbmF0ZWQsIHBhdXNlZCBvciB1bnBhdXNlZFwiLFxuc3RhbmRhcmQ6XCJvdGhlclwiXG59LFxue1xubmFtZTpcIlNJR0NPTlRcIixcbm51bWJlcjoxOCxcbmFjdGlvbjpcInVucGF1c2VcIixcbmRlc2NyaXB0aW9uOlwiVW5wYXVzZWRcIixcbnN0YW5kYXJkOlwicG9zaXhcIixcbmZvcmNlZDp0cnVlXG59LFxue1xubmFtZTpcIlNJR1NUT1BcIixcbm51bWJlcjoxOSxcbmFjdGlvbjpcInBhdXNlXCIsXG5kZXNjcmlwdGlvbjpcIlBhdXNlZFwiLFxuc3RhbmRhcmQ6XCJwb3NpeFwiLFxuZm9yY2VkOnRydWVcbn0sXG57XG5uYW1lOlwiU0lHVFNUUFwiLFxubnVtYmVyOjIwLFxuYWN0aW9uOlwicGF1c2VcIixcbmRlc2NyaXB0aW9uOlwiUGF1c2VkIHVzaW5nIENUUkwtWiBvciBcXFwic3VzcGVuZFxcXCJcIixcbnN0YW5kYXJkOlwicG9zaXhcIlxufSxcbntcbm5hbWU6XCJTSUdUVElOXCIsXG5udW1iZXI6MjEsXG5hY3Rpb246XCJwYXVzZVwiLFxuZGVzY3JpcHRpb246XCJCYWNrZ3JvdW5kIHByb2Nlc3MgY2Fubm90IHJlYWQgdGVybWluYWwgaW5wdXRcIixcbnN0YW5kYXJkOlwicG9zaXhcIlxufSxcbntcbm5hbWU6XCJTSUdCUkVBS1wiLFxubnVtYmVyOjIxLFxuYWN0aW9uOlwidGVybWluYXRlXCIsXG5kZXNjcmlwdGlvbjpcIlVzZXIgaW50ZXJydXB0aW9uIHdpdGggQ1RSTC1CUkVBS1wiLFxuc3RhbmRhcmQ6XCJvdGhlclwiXG59LFxue1xubmFtZTpcIlNJR1RUT1VcIixcbm51bWJlcjoyMixcbmFjdGlvbjpcInBhdXNlXCIsXG5kZXNjcmlwdGlvbjpcIkJhY2tncm91bmQgcHJvY2VzcyBjYW5ub3Qgd3JpdGUgdG8gdGVybWluYWwgb3V0cHV0XCIsXG5zdGFuZGFyZDpcInBvc2l4XCJcbn0sXG57XG5uYW1lOlwiU0lHVVJHXCIsXG5udW1iZXI6MjMsXG5hY3Rpb246XCJpZ25vcmVcIixcbmRlc2NyaXB0aW9uOlwiU29ja2V0IHJlY2VpdmVkIG91dC1vZi1iYW5kIGRhdGFcIixcbnN0YW5kYXJkOlwiYnNkXCJcbn0sXG57XG5uYW1lOlwiU0lHWENQVVwiLFxubnVtYmVyOjI0LFxuYWN0aW9uOlwiY29yZVwiLFxuZGVzY3JpcHRpb246XCJQcm9jZXNzIHRpbWVkIG91dFwiLFxuc3RhbmRhcmQ6XCJic2RcIlxufSxcbntcbm5hbWU6XCJTSUdYRlNaXCIsXG5udW1iZXI6MjUsXG5hY3Rpb246XCJjb3JlXCIsXG5kZXNjcmlwdGlvbjpcIkZpbGUgdG9vIGJpZ1wiLFxuc3RhbmRhcmQ6XCJic2RcIlxufSxcbntcbm5hbWU6XCJTSUdWVEFMUk1cIixcbm51bWJlcjoyNixcbmFjdGlvbjpcInRlcm1pbmF0ZVwiLFxuZGVzY3JpcHRpb246XCJUaW1lb3V0IG9yIHRpbWVyXCIsXG5zdGFuZGFyZDpcImJzZFwiXG59LFxue1xubmFtZTpcIlNJR1BST0ZcIixcbm51bWJlcjoyNyxcbmFjdGlvbjpcInRlcm1pbmF0ZVwiLFxuZGVzY3JpcHRpb246XCJUaW1lb3V0IG9yIHRpbWVyXCIsXG5zdGFuZGFyZDpcImJzZFwiXG59LFxue1xubmFtZTpcIlNJR1dJTkNIXCIsXG5udW1iZXI6MjgsXG5hY3Rpb246XCJpZ25vcmVcIixcbmRlc2NyaXB0aW9uOlwiVGVybWluYWwgd2luZG93IHNpemUgY2hhbmdlZFwiLFxuc3RhbmRhcmQ6XCJic2RcIlxufSxcbntcbm5hbWU6XCJTSUdJT1wiLFxubnVtYmVyOjI5LFxuYWN0aW9uOlwidGVybWluYXRlXCIsXG5kZXNjcmlwdGlvbjpcIkkvTyBpcyBhdmFpbGFibGVcIixcbnN0YW5kYXJkOlwib3RoZXJcIlxufSxcbntcbm5hbWU6XCJTSUdQT0xMXCIsXG5udW1iZXI6MjksXG5hY3Rpb246XCJ0ZXJtaW5hdGVcIixcbmRlc2NyaXB0aW9uOlwiV2F0Y2hlZCBldmVudFwiLFxuc3RhbmRhcmQ6XCJvdGhlclwiXG59LFxue1xubmFtZTpcIlNJR0lORk9cIixcbm51bWJlcjoyOSxcbmFjdGlvbjpcImlnbm9yZVwiLFxuZGVzY3JpcHRpb246XCJSZXF1ZXN0IGZvciBwcm9jZXNzIGluZm9ybWF0aW9uXCIsXG5zdGFuZGFyZDpcIm90aGVyXCJcbn0sXG57XG5uYW1lOlwiU0lHUFdSXCIsXG5udW1iZXI6MzAsXG5hY3Rpb246XCJ0ZXJtaW5hdGVcIixcbmRlc2NyaXB0aW9uOlwiRGV2aWNlIHJ1bm5pbmcgb3V0IG9mIHBvd2VyXCIsXG5zdGFuZGFyZDpcInN5c3RlbXZcIlxufSxcbntcbm5hbWU6XCJTSUdTWVNcIixcbm51bWJlcjozMSxcbmFjdGlvbjpcImNvcmVcIixcbmRlc2NyaXB0aW9uOlwiSW52YWxpZCBzeXN0ZW0gY2FsbFwiLFxuc3RhbmRhcmQ6XCJvdGhlclwiXG59LFxue1xubmFtZTpcIlNJR1VOVVNFRFwiLFxubnVtYmVyOjMxLFxuYWN0aW9uOlwidGVybWluYXRlXCIsXG5kZXNjcmlwdGlvbjpcIkludmFsaWQgc3lzdGVtIGNhbGxcIixcbnN0YW5kYXJkOlwib3RoZXJcIlxufV07IiwgImltcG9ydHtjb25zdGFudHN9ZnJvbVwibm9kZTpvc1wiO1xuXG5pbXBvcnR7U0lHTkFMU31mcm9tXCIuL2NvcmUuanNcIjtcbmltcG9ydHtnZXRSZWFsdGltZVNpZ25hbHN9ZnJvbVwiLi9yZWFsdGltZS5qc1wiO1xuXG5cblxuZXhwb3J0IGNvbnN0IGdldFNpZ25hbHM9KCk9PntcbmNvbnN0IHJlYWx0aW1lU2lnbmFscz1nZXRSZWFsdGltZVNpZ25hbHMoKTtcbmNvbnN0IHNpZ25hbHM9Wy4uLlNJR05BTFMsLi4ucmVhbHRpbWVTaWduYWxzXS5tYXAobm9ybWFsaXplU2lnbmFsKTtcbnJldHVybiBzaWduYWxzXG59O1xuXG5cblxuXG5cblxuXG5jb25zdCBub3JtYWxpemVTaWduYWw9KHtcbm5hbWUsXG5udW1iZXI6ZGVmYXVsdE51bWJlcixcbmRlc2NyaXB0aW9uLFxuYWN0aW9uLFxuZm9yY2VkPWZhbHNlLFxuc3RhbmRhcmRcbn0pPT57XG5jb25zdHtcbnNpZ25hbHM6e1tuYW1lXTpjb25zdGFudFNpZ25hbH1cbn09Y29uc3RhbnRzO1xuY29uc3Qgc3VwcG9ydGVkPWNvbnN0YW50U2lnbmFsIT09dW5kZWZpbmVkO1xuY29uc3QgbnVtYmVyPXN1cHBvcnRlZD9jb25zdGFudFNpZ25hbDpkZWZhdWx0TnVtYmVyO1xucmV0dXJue25hbWUsbnVtYmVyLGRlc2NyaXB0aW9uLHN1cHBvcnRlZCxhY3Rpb24sZm9yY2VkLHN0YW5kYXJkfVxufTsiLCAiaW1wb3J0e2NvbnN0YW50c31mcm9tXCJub2RlOm9zXCI7XG5cbmltcG9ydHtTSUdSVE1BWH1mcm9tXCIuL3JlYWx0aW1lLmpzXCI7XG5pbXBvcnR7Z2V0U2lnbmFsc31mcm9tXCIuL3NpZ25hbHMuanNcIjtcblxuXG5cbmNvbnN0IGdldFNpZ25hbHNCeU5hbWU9KCk9PntcbmNvbnN0IHNpZ25hbHM9Z2V0U2lnbmFscygpO1xucmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhzaWduYWxzLm1hcChnZXRTaWduYWxCeU5hbWUpKVxufTtcblxuY29uc3QgZ2V0U2lnbmFsQnlOYW1lPSh7XG5uYW1lLFxubnVtYmVyLFxuZGVzY3JpcHRpb24sXG5zdXBwb3J0ZWQsXG5hY3Rpb24sXG5mb3JjZWQsXG5zdGFuZGFyZFxufSk9PltuYW1lLHtuYW1lLG51bWJlcixkZXNjcmlwdGlvbixzdXBwb3J0ZWQsYWN0aW9uLGZvcmNlZCxzdGFuZGFyZH1dO1xuXG5leHBvcnQgY29uc3Qgc2lnbmFsc0J5TmFtZT1nZXRTaWduYWxzQnlOYW1lKCk7XG5cblxuXG5cbmNvbnN0IGdldFNpZ25hbHNCeU51bWJlcj0oKT0+e1xuY29uc3Qgc2lnbmFscz1nZXRTaWduYWxzKCk7XG5jb25zdCBsZW5ndGg9U0lHUlRNQVgrMTtcbmNvbnN0IHNpZ25hbHNBPUFycmF5LmZyb20oe2xlbmd0aH0sKHZhbHVlLG51bWJlcik9PlxuZ2V0U2lnbmFsQnlOdW1iZXIobnVtYmVyLHNpZ25hbHMpXG4pO1xucmV0dXJuIE9iamVjdC5hc3NpZ24oe30sLi4uc2lnbmFsc0EpXG59O1xuXG5jb25zdCBnZXRTaWduYWxCeU51bWJlcj0obnVtYmVyLHNpZ25hbHMpPT57XG5jb25zdCBzaWduYWw9ZmluZFNpZ25hbEJ5TnVtYmVyKG51bWJlcixzaWduYWxzKTtcblxuaWYoc2lnbmFsPT09dW5kZWZpbmVkKXtcbnJldHVybnt9XG59XG5cbmNvbnN0e25hbWUsZGVzY3JpcHRpb24sc3VwcG9ydGVkLGFjdGlvbixmb3JjZWQsc3RhbmRhcmR9PXNpZ25hbDtcbnJldHVybntcbltudW1iZXJdOntcbm5hbWUsXG5udW1iZXIsXG5kZXNjcmlwdGlvbixcbnN1cHBvcnRlZCxcbmFjdGlvbixcbmZvcmNlZCxcbnN0YW5kYXJkXG59XG59XG59O1xuXG5cblxuY29uc3QgZmluZFNpZ25hbEJ5TnVtYmVyPShudW1iZXIsc2lnbmFscyk9PntcbmNvbnN0IHNpZ25hbD1zaWduYWxzLmZpbmQoKHtuYW1lfSk9PmNvbnN0YW50cy5zaWduYWxzW25hbWVdPT09bnVtYmVyKTtcblxuaWYoc2lnbmFsIT09dW5kZWZpbmVkKXtcbnJldHVybiBzaWduYWxcbn1cblxucmV0dXJuIHNpZ25hbHMuZmluZCgoc2lnbmFsQSk9PnNpZ25hbEEubnVtYmVyPT09bnVtYmVyKVxufTtcblxuZXhwb3J0IGNvbnN0IHNpZ25hbHNCeU51bWJlcj1nZXRTaWduYWxzQnlOdW1iZXIoKTsiLCAiaW1wb3J0IHtjb25zdGFudHN9IGZyb20gJ25vZGU6b3MnO1xuaW1wb3J0IHtzaWduYWxzQnlOYW1lfSBmcm9tICdodW1hbi1zaWduYWxzJztcblxuLy8gTm9ybWFsaXplIHNpZ25hbHMgZm9yIGNvbXBhcmlzb24gcHVycG9zZS5cbi8vIEFsc28gdmFsaWRhdGUgdGhlIHNpZ25hbCBleGlzdHMuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplS2lsbFNpZ25hbCA9IGtpbGxTaWduYWwgPT4ge1xuXHRjb25zdCBvcHRpb25OYW1lID0gJ29wdGlvbiBga2lsbFNpZ25hbGAnO1xuXHRpZiAoa2lsbFNpZ25hbCA9PT0gMCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgJHtvcHRpb25OYW1lfTogMCBjYW5ub3QgYmUgdXNlZC5gKTtcblx0fVxuXG5cdHJldHVybiBub3JtYWxpemVTaWduYWwoa2lsbFNpZ25hbCwgb3B0aW9uTmFtZSk7XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplU2lnbmFsQXJndW1lbnQgPSBzaWduYWwgPT4gc2lnbmFsID09PSAwXG5cdD8gc2lnbmFsXG5cdDogbm9ybWFsaXplU2lnbmFsKHNpZ25hbCwgJ2BzdWJwcm9jZXNzLmtpbGwoKWBcXCdzIGFyZ3VtZW50Jyk7XG5cbmNvbnN0IG5vcm1hbGl6ZVNpZ25hbCA9IChzaWduYWxOYW1lT3JJbnRlZ2VyLCBvcHRpb25OYW1lKSA9PiB7XG5cdGlmIChOdW1iZXIuaXNJbnRlZ2VyKHNpZ25hbE5hbWVPckludGVnZXIpKSB7XG5cdFx0cmV0dXJuIG5vcm1hbGl6ZVNpZ25hbEludGVnZXIoc2lnbmFsTmFtZU9ySW50ZWdlciwgb3B0aW9uTmFtZSk7XG5cdH1cblxuXHRpZiAodHlwZW9mIHNpZ25hbE5hbWVPckludGVnZXIgPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIG5vcm1hbGl6ZVNpZ25hbE5hbWUoc2lnbmFsTmFtZU9ySW50ZWdlciwgb3B0aW9uTmFtZSk7XG5cdH1cblxuXHR0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkICR7b3B0aW9uTmFtZX0gJHtTdHJpbmcoc2lnbmFsTmFtZU9ySW50ZWdlcil9OiBpdCBtdXN0IGJlIGEgc3RyaW5nIG9yIGFuIGludGVnZXIuXFxuJHtnZXRBdmFpbGFibGVTaWduYWxzKCl9YCk7XG59O1xuXG5jb25zdCBub3JtYWxpemVTaWduYWxJbnRlZ2VyID0gKHNpZ25hbEludGVnZXIsIG9wdGlvbk5hbWUpID0+IHtcblx0aWYgKHNpZ25hbHNJbnRlZ2VyVG9OYW1lLmhhcyhzaWduYWxJbnRlZ2VyKSkge1xuXHRcdHJldHVybiBzaWduYWxzSW50ZWdlclRvTmFtZS5nZXQoc2lnbmFsSW50ZWdlcik7XG5cdH1cblxuXHR0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkICR7b3B0aW9uTmFtZX0gJHtzaWduYWxJbnRlZ2VyfTogdGhpcyBzaWduYWwgaW50ZWdlciBkb2VzIG5vdCBleGlzdC5cXG4ke2dldEF2YWlsYWJsZVNpZ25hbHMoKX1gKTtcbn07XG5cbmNvbnN0IGdldFNpZ25hbHNJbnRlZ2VyVG9OYW1lID0gKCkgPT4gbmV3IE1hcChPYmplY3QuZW50cmllcyhjb25zdGFudHMuc2lnbmFscylcblx0LnJldmVyc2UoKVxuXHQubWFwKChbc2lnbmFsTmFtZSwgc2lnbmFsSW50ZWdlcl0pID0+IFtzaWduYWxJbnRlZ2VyLCBzaWduYWxOYW1lXSkpO1xuXG5jb25zdCBzaWduYWxzSW50ZWdlclRvTmFtZSA9IGdldFNpZ25hbHNJbnRlZ2VyVG9OYW1lKCk7XG5cbmNvbnN0IG5vcm1hbGl6ZVNpZ25hbE5hbWUgPSAoc2lnbmFsTmFtZSwgb3B0aW9uTmFtZSkgPT4ge1xuXHRpZiAoc2lnbmFsTmFtZSBpbiBjb25zdGFudHMuc2lnbmFscykge1xuXHRcdHJldHVybiBzaWduYWxOYW1lO1xuXHR9XG5cblx0aWYgKHNpZ25hbE5hbWUudG9VcHBlckNhc2UoKSBpbiBjb25zdGFudHMuc2lnbmFscykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgJHtvcHRpb25OYW1lfSAnJHtzaWduYWxOYW1lfSc6IHBsZWFzZSByZW5hbWUgaXQgdG8gJyR7c2lnbmFsTmFtZS50b1VwcGVyQ2FzZSgpfScuYCk7XG5cdH1cblxuXHR0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkICR7b3B0aW9uTmFtZX0gJyR7c2lnbmFsTmFtZX0nOiB0aGlzIHNpZ25hbCBuYW1lIGRvZXMgbm90IGV4aXN0LlxcbiR7Z2V0QXZhaWxhYmxlU2lnbmFscygpfWApO1xufTtcblxuY29uc3QgZ2V0QXZhaWxhYmxlU2lnbmFscyA9ICgpID0+IGBBdmFpbGFibGUgc2lnbmFsIG5hbWVzOiAke2dldEF2YWlsYWJsZVNpZ25hbE5hbWVzKCl9LlxuQXZhaWxhYmxlIHNpZ25hbCBudW1iZXJzOiAke2dldEF2YWlsYWJsZVNpZ25hbEludGVnZXJzKCl9LmA7XG5cbmNvbnN0IGdldEF2YWlsYWJsZVNpZ25hbE5hbWVzID0gKCkgPT4gT2JqZWN0LmtleXMoY29uc3RhbnRzLnNpZ25hbHMpXG5cdC5zb3J0KClcblx0Lm1hcChzaWduYWxOYW1lID0+IGAnJHtzaWduYWxOYW1lfSdgKVxuXHQuam9pbignLCAnKTtcblxuY29uc3QgZ2V0QXZhaWxhYmxlU2lnbmFsSW50ZWdlcnMgPSAoKSA9PiBbLi4ubmV3IFNldChPYmplY3QudmFsdWVzKGNvbnN0YW50cy5zaWduYWxzKVxuXHQuc29ydCgoc2lnbmFsSW50ZWdlciwgc2lnbmFsSW50ZWdlclR3bykgPT4gc2lnbmFsSW50ZWdlciAtIHNpZ25hbEludGVnZXJUd28pKV1cblx0LmpvaW4oJywgJyk7XG5cbi8vIEh1bWFuLWZyaWVuZGx5IGRlc2NyaXB0aW9uIG9mIGEgc2lnbmFsXG5leHBvcnQgY29uc3QgZ2V0U2lnbmFsRGVzY3JpcHRpb24gPSBzaWduYWwgPT4gc2lnbmFsc0J5TmFtZVtzaWduYWxdLmRlc2NyaXB0aW9uO1xuIiwgImltcG9ydCB7c2V0VGltZW91dH0gZnJvbSAnbm9kZTp0aW1lcnMvcHJvbWlzZXMnO1xuaW1wb3J0IHtpc0Vycm9ySW5zdGFuY2V9IGZyb20gJy4uL3JldHVybi9maW5hbC1lcnJvci5qcyc7XG5pbXBvcnQge25vcm1hbGl6ZVNpZ25hbEFyZ3VtZW50fSBmcm9tICcuL3NpZ25hbC5qcyc7XG5cbi8vIE5vcm1hbGl6ZSB0aGUgYGZvcmNlS2lsbEFmdGVyRGVsYXlgIG9wdGlvblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUZvcmNlS2lsbEFmdGVyRGVsYXkgPSBmb3JjZUtpbGxBZnRlckRlbGF5ID0+IHtcblx0aWYgKGZvcmNlS2lsbEFmdGVyRGVsYXkgPT09IGZhbHNlKSB7XG5cdFx0cmV0dXJuIGZvcmNlS2lsbEFmdGVyRGVsYXk7XG5cdH1cblxuXHRpZiAoZm9yY2VLaWxsQWZ0ZXJEZWxheSA9PT0gdHJ1ZSkge1xuXHRcdHJldHVybiBERUZBVUxUX0ZPUkNFX0tJTExfVElNRU9VVDtcblx0fVxuXG5cdGlmICghTnVtYmVyLmlzRmluaXRlKGZvcmNlS2lsbEFmdGVyRGVsYXkpIHx8IGZvcmNlS2lsbEFmdGVyRGVsYXkgPCAwKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgdGhlIFxcYGZvcmNlS2lsbEFmdGVyRGVsYXlcXGAgb3B0aW9uIHRvIGJlIGEgbm9uLW5lZ2F0aXZlIGludGVnZXIsIGdvdCBcXGAke2ZvcmNlS2lsbEFmdGVyRGVsYXl9XFxgICgke3R5cGVvZiBmb3JjZUtpbGxBZnRlckRlbGF5fSlgKTtcblx0fVxuXG5cdHJldHVybiBmb3JjZUtpbGxBZnRlckRlbGF5O1xufTtcblxuY29uc3QgREVGQVVMVF9GT1JDRV9LSUxMX1RJTUVPVVQgPSAxMDAwICogNTtcblxuLy8gTW9ua2V5LXBhdGNoZXMgYHN1YnByb2Nlc3Mua2lsbCgpYCB0byBhZGQgYGZvcmNlS2lsbEFmdGVyRGVsYXlgIGJlaGF2aW9yIGFuZCBgLmtpbGwoZXJyb3IpYFxuZXhwb3J0IGNvbnN0IHN1YnByb2Nlc3NLaWxsID0gKFxuXHR7a2lsbCwgb3B0aW9uczoge2ZvcmNlS2lsbEFmdGVyRGVsYXksIGtpbGxTaWduYWx9LCBvbkludGVybmFsRXJyb3IsIGNvbnRleHQsIGNvbnRyb2xsZXJ9LFxuXHRzaWduYWxPckVycm9yLFxuXHRlcnJvckFyZ3VtZW50LFxuKSA9PiB7XG5cdGNvbnN0IHtzaWduYWwsIGVycm9yfSA9IHBhcnNlS2lsbEFyZ3VtZW50cyhzaWduYWxPckVycm9yLCBlcnJvckFyZ3VtZW50LCBraWxsU2lnbmFsKTtcblx0ZW1pdEtpbGxFcnJvcihlcnJvciwgb25JbnRlcm5hbEVycm9yKTtcblx0Y29uc3Qga2lsbFJlc3VsdCA9IGtpbGwoc2lnbmFsKTtcblx0c2V0S2lsbFRpbWVvdXQoe1xuXHRcdGtpbGwsXG5cdFx0c2lnbmFsLFxuXHRcdGZvcmNlS2lsbEFmdGVyRGVsYXksXG5cdFx0a2lsbFNpZ25hbCxcblx0XHRraWxsUmVzdWx0LFxuXHRcdGNvbnRleHQsXG5cdFx0Y29udHJvbGxlcixcblx0fSk7XG5cdHJldHVybiBraWxsUmVzdWx0O1xufTtcblxuY29uc3QgcGFyc2VLaWxsQXJndW1lbnRzID0gKHNpZ25hbE9yRXJyb3IsIGVycm9yQXJndW1lbnQsIGtpbGxTaWduYWwpID0+IHtcblx0Y29uc3QgW3NpZ25hbCA9IGtpbGxTaWduYWwsIGVycm9yXSA9IGlzRXJyb3JJbnN0YW5jZShzaWduYWxPckVycm9yKVxuXHRcdD8gW3VuZGVmaW5lZCwgc2lnbmFsT3JFcnJvcl1cblx0XHQ6IFtzaWduYWxPckVycm9yLCBlcnJvckFyZ3VtZW50XTtcblxuXHRpZiAodHlwZW9mIHNpZ25hbCAhPT0gJ3N0cmluZycgJiYgIU51bWJlci5pc0ludGVnZXIoc2lnbmFsKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGFuIGVycm9yIGluc3RhbmNlIG9yIGEgc2lnbmFsIG5hbWUgc3RyaW5nL2ludGVnZXI6ICR7U3RyaW5nKHNpZ25hbCl9YCk7XG5cdH1cblxuXHRpZiAoZXJyb3IgIT09IHVuZGVmaW5lZCAmJiAhaXNFcnJvckluc3RhbmNlKGVycm9yKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBzZWNvbmQgYXJndW1lbnQgaXMgb3B0aW9uYWwuIElmIHNwZWNpZmllZCwgaXQgbXVzdCBiZSBhbiBlcnJvciBpbnN0YW5jZTogJHtlcnJvcn1gKTtcblx0fVxuXG5cdHJldHVybiB7c2lnbmFsOiBub3JtYWxpemVTaWduYWxBcmd1bWVudChzaWduYWwpLCBlcnJvcn07XG59O1xuXG4vLyBGYWlscyByaWdodCBhd2F5IHdoZW4gY2FsbGluZyBgc3VicHJvY2Vzcy5raWxsKGVycm9yKWAuXG4vLyBEb2VzIG5vdCB3YWl0IGZvciBhY3R1YWwgc2lnbmFsIHRlcm1pbmF0aW9uLlxuLy8gVXNlcyBhIGRlZmVycmVkIHByb21pc2UgaW5zdGVhZCBvZiB0aGUgYGVycm9yYCBldmVudCBvbiB0aGUgc3VicHJvY2VzcywgYXMgdGhpcyBpcyBsZXNzIGludHJ1c2l2ZS5cbmNvbnN0IGVtaXRLaWxsRXJyb3IgPSAoZXJyb3IsIG9uSW50ZXJuYWxFcnJvcikgPT4ge1xuXHRpZiAoZXJyb3IgIT09IHVuZGVmaW5lZCkge1xuXHRcdG9uSW50ZXJuYWxFcnJvci5yZWplY3QoZXJyb3IpO1xuXHR9XG59O1xuXG5jb25zdCBzZXRLaWxsVGltZW91dCA9IGFzeW5jICh7a2lsbCwgc2lnbmFsLCBmb3JjZUtpbGxBZnRlckRlbGF5LCBraWxsU2lnbmFsLCBraWxsUmVzdWx0LCBjb250ZXh0LCBjb250cm9sbGVyfSkgPT4ge1xuXHRpZiAoc2lnbmFsID09PSBraWxsU2lnbmFsICYmIGtpbGxSZXN1bHQpIHtcblx0XHRraWxsT25UaW1lb3V0KHtcblx0XHRcdGtpbGwsXG5cdFx0XHRmb3JjZUtpbGxBZnRlckRlbGF5LFxuXHRcdFx0Y29udGV4dCxcblx0XHRcdGNvbnRyb2xsZXJTaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuXHRcdH0pO1xuXHR9XG59O1xuXG4vLyBGb3JjZWZ1bGx5IHRlcm1pbmF0ZSBhIHN1YnByb2Nlc3MgYWZ0ZXIgYSB0aW1lb3V0XG5leHBvcnQgY29uc3Qga2lsbE9uVGltZW91dCA9IGFzeW5jICh7a2lsbCwgZm9yY2VLaWxsQWZ0ZXJEZWxheSwgY29udGV4dCwgY29udHJvbGxlclNpZ25hbH0pID0+IHtcblx0aWYgKGZvcmNlS2lsbEFmdGVyRGVsYXkgPT09IGZhbHNlKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dHJ5IHtcblx0XHRhd2FpdCBzZXRUaW1lb3V0KGZvcmNlS2lsbEFmdGVyRGVsYXksIHVuZGVmaW5lZCwge3NpZ25hbDogY29udHJvbGxlclNpZ25hbH0pO1xuXHRcdGlmIChraWxsKCdTSUdLSUxMJykpIHtcblx0XHRcdGNvbnRleHQuaXNGb3JjZWZ1bGx5VGVybWluYXRlZCA/Pz0gdHJ1ZTtcblx0XHR9XG5cdH0gY2F0Y2gge31cbn07XG4iLCAiaW1wb3J0IHtvbmNlfSBmcm9tICdub2RlOmV2ZW50cyc7XG5cbi8vIENvbWJpbmVzIGB1dGlsLmFib3J0ZWQoKWAgYW5kIGBldmVudHMuYWRkQWJvcnRMaXN0ZW5lcigpYDogcHJvbWlzZS1iYXNlZCBhbmQgY2xlYW5lZCB1cCB3aXRoIGEgc3RvcCBzaWduYWxcbmV4cG9ydCBjb25zdCBvbkFib3J0ZWRTaWduYWwgPSBhc3luYyAobWFpblNpZ25hbCwgc3RvcFNpZ25hbCkgPT4ge1xuXHRpZiAoIW1haW5TaWduYWwuYWJvcnRlZCkge1xuXHRcdGF3YWl0IG9uY2UobWFpblNpZ25hbCwgJ2Fib3J0Jywge3NpZ25hbDogc3RvcFNpZ25hbH0pO1xuXHR9XG59O1xuIiwgImltcG9ydCB7b25BYm9ydGVkU2lnbmFsfSBmcm9tICcuLi91dGlscy9hYm9ydC1zaWduYWwuanMnO1xuXG4vLyBWYWxpZGF0ZSB0aGUgYGNhbmNlbFNpZ25hbGAgb3B0aW9uXG5leHBvcnQgY29uc3QgdmFsaWRhdGVDYW5jZWxTaWduYWwgPSAoe2NhbmNlbFNpZ25hbH0pID0+IHtcblx0aWYgKGNhbmNlbFNpZ25hbCAhPT0gdW5kZWZpbmVkICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjYW5jZWxTaWduYWwpICE9PSAnW29iamVjdCBBYm9ydFNpZ25hbF0nKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBUaGUgXFxgY2FuY2VsU2lnbmFsXFxgIG9wdGlvbiBtdXN0IGJlIGFuIEFib3J0U2lnbmFsOiAke1N0cmluZyhjYW5jZWxTaWduYWwpfWApO1xuXHR9XG59O1xuXG4vLyBUZXJtaW5hdGUgdGhlIHN1YnByb2Nlc3Mgd2hlbiBhYm9ydGluZyB0aGUgYGNhbmNlbFNpZ25hbGAgb3B0aW9uIGFuZCBgZ3JhY2VmdWxTaWduYWxgIGlzIGBmYWxzZWBcbmV4cG9ydCBjb25zdCB0aHJvd09uQ2FuY2VsID0gKHtzdWJwcm9jZXNzLCBjYW5jZWxTaWduYWwsIGdyYWNlZnVsQ2FuY2VsLCBjb250ZXh0LCBjb250cm9sbGVyfSkgPT4gY2FuY2VsU2lnbmFsID09PSB1bmRlZmluZWQgfHwgZ3JhY2VmdWxDYW5jZWxcblx0PyBbXVxuXHQ6IFt0ZXJtaW5hdGVPbkNhbmNlbChzdWJwcm9jZXNzLCBjYW5jZWxTaWduYWwsIGNvbnRleHQsIGNvbnRyb2xsZXIpXTtcblxuY29uc3QgdGVybWluYXRlT25DYW5jZWwgPSBhc3luYyAoc3VicHJvY2VzcywgY2FuY2VsU2lnbmFsLCBjb250ZXh0LCB7c2lnbmFsfSkgPT4ge1xuXHRhd2FpdCBvbkFib3J0ZWRTaWduYWwoY2FuY2VsU2lnbmFsLCBzaWduYWwpO1xuXHRjb250ZXh0LnRlcm1pbmF0aW9uUmVhc29uID8/PSAnY2FuY2VsJztcblx0c3VicHJvY2Vzcy5raWxsKCk7XG5cdHRocm93IGNhbmNlbFNpZ25hbC5yZWFzb247XG59O1xuIiwgIi8vIFZhbGlkYXRlIHRoZSBJUEMgY2hhbm5lbCBpcyBjb25uZWN0ZWQgYmVmb3JlIHJlY2VpdmluZy9zZW5kaW5nIG1lc3NhZ2VzXG5leHBvcnQgY29uc3QgdmFsaWRhdGVJcGNNZXRob2QgPSAoe21ldGhvZE5hbWUsIGlzU3VicHJvY2VzcywgaXBjLCBpc0Nvbm5lY3RlZH0pID0+IHtcblx0dmFsaWRhdGVJcGNPcHRpb24obWV0aG9kTmFtZSwgaXNTdWJwcm9jZXNzLCBpcGMpO1xuXHR2YWxpZGF0ZUNvbm5lY3Rpb24obWV0aG9kTmFtZSwgaXNTdWJwcm9jZXNzLCBpc0Nvbm5lY3RlZCk7XG59O1xuXG4vLyBCZXR0ZXIgZXJyb3IgbWVzc2FnZSB3aGVuIGZvcmdldHRpbmcgdG8gc2V0IGBpcGM6IHRydWVgIGFuZCB1c2luZyB0aGUgSVBDIG1ldGhvZHNcbmNvbnN0IHZhbGlkYXRlSXBjT3B0aW9uID0gKG1ldGhvZE5hbWUsIGlzU3VicHJvY2VzcywgaXBjKSA9PiB7XG5cdGlmICghaXBjKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGAke2dldE1ldGhvZE5hbWUobWV0aG9kTmFtZSwgaXNTdWJwcm9jZXNzKX0gY2FuIG9ubHkgYmUgdXNlZCBpZiB0aGUgXFxgaXBjXFxgIG9wdGlvbiBpcyBcXGB0cnVlXFxgLmApO1xuXHR9XG59O1xuXG4vLyBCZXR0ZXIgZXJyb3IgbWVzc2FnZSB3aGVuIG9uZSBwcm9jZXNzIGRvZXMgbm90IHNlbmQvcmVjZWl2ZSBtZXNzYWdlcyBvbmNlIHRoZSBvdGhlciBwcm9jZXNzIGhhcyBkaXNjb25uZWN0ZWQuXG4vLyBUaGlzIGFsc28gbWFrZXMgaXQgY2xlYXIgdGhhdCBhbnkgYnVmZmVyZWQgbWVzc2FnZXMgYXJlIGxvc3Qgb25jZSBlaXRoZXIgcHJvY2VzcyBoYXMgZGlzY29ubmVjdGVkLlxuLy8gQWxzbyB3aGVuIGFib3J0aW5nIGBjYW5jZWxTaWduYWxgIGFmdGVyIGRpc2Nvbm5lY3RpbmcgdGhlIElQQy5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUNvbm5lY3Rpb24gPSAobWV0aG9kTmFtZSwgaXNTdWJwcm9jZXNzLCBpc0Nvbm5lY3RlZCkgPT4ge1xuXHRpZiAoIWlzQ29ubmVjdGVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGAke2dldE1ldGhvZE5hbWUobWV0aG9kTmFtZSwgaXNTdWJwcm9jZXNzKX0gY2Fubm90IGJlIHVzZWQ6IHRoZSAke2dldE90aGVyUHJvY2Vzc05hbWUoaXNTdWJwcm9jZXNzKX0gaGFzIGFscmVhZHkgZXhpdGVkIG9yIGRpc2Nvbm5lY3RlZC5gKTtcblx0fVxufTtcblxuLy8gV2hlbiBgZ2V0T25lTWVzc2FnZSgpYCBjb3VsZCBub3QgY29tcGxldGUgZHVlIHRvIGFuIGVhcmx5IGRpc2Nvbm5lY3Rpb25cbmV4cG9ydCBjb25zdCB0aHJvd09uRWFybHlEaXNjb25uZWN0ID0gaXNTdWJwcm9jZXNzID0+IHtcblx0dGhyb3cgbmV3IEVycm9yKGAke2dldE1ldGhvZE5hbWUoJ2dldE9uZU1lc3NhZ2UnLCBpc1N1YnByb2Nlc3MpfSBjb3VsZCBub3QgY29tcGxldGU6IHRoZSAke2dldE90aGVyUHJvY2Vzc05hbWUoaXNTdWJwcm9jZXNzKX0gZXhpdGVkIG9yIGRpc2Nvbm5lY3RlZC5gKTtcbn07XG5cbi8vIFdoZW4gYm90aCBwcm9jZXNzZXMgdXNlIGBzZW5kTWVzc2FnZSgpYCB3aXRoIGBzdHJpY3RgIGF0IHRoZSBzYW1lIHRpbWVcbmV4cG9ydCBjb25zdCB0aHJvd09uU3RyaWN0RGVhZGxvY2tFcnJvciA9IGlzU3VicHJvY2VzcyA9PiB7XG5cdHRocm93IG5ldyBFcnJvcihgJHtnZXRNZXRob2ROYW1lKCdzZW5kTWVzc2FnZScsIGlzU3VicHJvY2Vzcyl9IGZhaWxlZDogdGhlICR7Z2V0T3RoZXJQcm9jZXNzTmFtZShpc1N1YnByb2Nlc3MpfSBpcyBzZW5kaW5nIGEgbWVzc2FnZSB0b28sIGluc3RlYWQgb2YgbGlzdGVuaW5nIHRvIGluY29taW5nIG1lc3NhZ2VzLlxuVGhpcyBjYW4gYmUgZml4ZWQgYnkgYm90aCBzZW5kaW5nIGEgbWVzc2FnZSBhbmQgbGlzdGVuaW5nIHRvIGluY29taW5nIG1lc3NhZ2VzIGF0IHRoZSBzYW1lIHRpbWU6XG5cbmNvbnN0IFtyZWNlaXZlZE1lc3NhZ2VdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuXHQke2dldE1ldGhvZE5hbWUoJ2dldE9uZU1lc3NhZ2UnLCBpc1N1YnByb2Nlc3MpfSxcblx0JHtnZXRNZXRob2ROYW1lKCdzZW5kTWVzc2FnZScsIGlzU3VicHJvY2VzcywgJ21lc3NhZ2UsIHtzdHJpY3Q6IHRydWV9Jyl9LFxuXSk7YCk7XG59O1xuXG4vLyBXaGVuIHRoZSBvdGhlciBwcm9jZXNzIHVzZWQgYHN0cmljdGAgYnV0IHRoZSBjdXJyZW50IHByb2Nlc3MgaGFkIEkvTyBlcnJvciBjYWxsaW5nIGBzZW5kTWVzc2FnZSgpYCBmb3IgdGhlIHJlc3BvbnNlXG5leHBvcnQgY29uc3QgZ2V0U3RyaWN0UmVzcG9uc2VFcnJvciA9IChlcnJvciwgaXNTdWJwcm9jZXNzKSA9PiBuZXcgRXJyb3IoYCR7Z2V0TWV0aG9kTmFtZSgnc2VuZE1lc3NhZ2UnLCBpc1N1YnByb2Nlc3MpfSBmYWlsZWQgd2hlbiBzZW5kaW5nIGFuIGFja25vd2xlZGdtZW50IHJlc3BvbnNlIHRvIHRoZSAke2dldE90aGVyUHJvY2Vzc05hbWUoaXNTdWJwcm9jZXNzKX0uYCwge2NhdXNlOiBlcnJvcn0pO1xuXG4vLyBXaGVuIHVzaW5nIGBzdHJpY3RgIGJ1dCB0aGUgb3RoZXIgcHJvY2VzcyB3YXMgbm90IGxpc3RlbmluZyBmb3IgbWVzc2FnZXNcbmV4cG9ydCBjb25zdCB0aHJvd09uTWlzc2luZ1N0cmljdCA9IGlzU3VicHJvY2VzcyA9PiB7XG5cdHRocm93IG5ldyBFcnJvcihgJHtnZXRNZXRob2ROYW1lKCdzZW5kTWVzc2FnZScsIGlzU3VicHJvY2Vzcyl9IGZhaWxlZDogdGhlICR7Z2V0T3RoZXJQcm9jZXNzTmFtZShpc1N1YnByb2Nlc3MpfSBpcyBub3QgbGlzdGVuaW5nIHRvIGluY29taW5nIG1lc3NhZ2VzLmApO1xufTtcblxuLy8gV2hlbiB1c2luZyBgc3RyaWN0YCBidXQgdGhlIG90aGVyIHByb2Nlc3MgZGlzY29ubmVjdGVkIGJlZm9yZSByZWNlaXZpbmcgdGhlIG1lc3NhZ2VcbmV4cG9ydCBjb25zdCB0aHJvd09uU3RyaWN0RGlzY29ubmVjdCA9IGlzU3VicHJvY2VzcyA9PiB7XG5cdHRocm93IG5ldyBFcnJvcihgJHtnZXRNZXRob2ROYW1lKCdzZW5kTWVzc2FnZScsIGlzU3VicHJvY2Vzcyl9IGZhaWxlZDogdGhlICR7Z2V0T3RoZXJQcm9jZXNzTmFtZShpc1N1YnByb2Nlc3MpfSBleGl0ZWQgd2l0aG91dCBsaXN0ZW5pbmcgdG8gaW5jb21pbmcgbWVzc2FnZXMuYCk7XG59O1xuXG4vLyBXaGVuIHRoZSBjdXJyZW50IHByb2Nlc3MgZGlzY29ubmVjdHMgd2hpbGUgdGhlIHN1YnByb2Nlc3MgaXMgbGlzdGVuaW5nIHRvIGBjYW5jZWxTaWduYWxgXG5leHBvcnQgY29uc3QgZ2V0QWJvcnREaXNjb25uZWN0RXJyb3IgPSAoKSA9PiBuZXcgRXJyb3IoYFxcYGNhbmNlbFNpZ25hbFxcYCBhYm9ydGVkOiB0aGUgJHtnZXRPdGhlclByb2Nlc3NOYW1lKHRydWUpfSBkaXNjb25uZWN0ZWQuYCk7XG5cbi8vIFdoZW4gdGhlIHN1YnByb2Nlc3MgdXNlcyBgY2FuY2VsU2lnbmFsYCBidXQgbm90IHRoZSBjdXJyZW50IHByb2Nlc3NcbmV4cG9ydCBjb25zdCB0aHJvd09uTWlzc2luZ1BhcmVudCA9ICgpID0+IHtcblx0dGhyb3cgbmV3IEVycm9yKCdgZ2V0Q2FuY2VsU2lnbmFsKClgIGNhbm5vdCBiZSB1c2VkIHdpdGhvdXQgc2V0dGluZyB0aGUgYGNhbmNlbFNpZ25hbGAgc3VicHJvY2VzcyBvcHRpb24uJyk7XG59O1xuXG4vLyBFUElQRSBjYW4gaGFwcGVuIHdoZW4gc2VuZGluZyBhIG1lc3NhZ2UgdG8gYSBzdWJwcm9jZXNzIHRoYXQgaXMgY2xvc2luZyBidXQgaGFzIG5vdCBkaXNjb25uZWN0ZWQgeWV0XG5leHBvcnQgY29uc3QgaGFuZGxlRXBpcGVFcnJvciA9ICh7ZXJyb3IsIG1ldGhvZE5hbWUsIGlzU3VicHJvY2Vzc30pID0+IHtcblx0aWYgKGVycm9yLmNvZGUgPT09ICdFUElQRScpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYCR7Z2V0TWV0aG9kTmFtZShtZXRob2ROYW1lLCBpc1N1YnByb2Nlc3MpfSBjYW5ub3QgYmUgdXNlZDogdGhlICR7Z2V0T3RoZXJQcm9jZXNzTmFtZShpc1N1YnByb2Nlc3MpfSBpcyBkaXNjb25uZWN0aW5nLmAsIHtjYXVzZTogZXJyb3J9KTtcblx0fVxufTtcblxuLy8gQmV0dGVyIGVycm9yIG1lc3NhZ2Ugd2hlbiBzZW5kaW5nIG1lc3NhZ2VzIHdoaWNoIGNhbm5vdCBiZSBzZXJpYWxpemVkLlxuLy8gV29ya3Mgd2l0aCBib3RoIGBzZXJpYWxpemF0aW9uOiAnYWR2YW5jZWQnYCBhbmQgYHNlcmlhbGl6YXRpb246ICdqc29uJ2AuXG5leHBvcnQgY29uc3QgaGFuZGxlU2VyaWFsaXphdGlvbkVycm9yID0gKHtlcnJvciwgbWV0aG9kTmFtZSwgaXNTdWJwcm9jZXNzLCBtZXNzYWdlfSkgPT4ge1xuXHRpZiAoaXNTZXJpYWxpemF0aW9uRXJyb3IoZXJyb3IpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGAke2dldE1ldGhvZE5hbWUobWV0aG9kTmFtZSwgaXNTdWJwcm9jZXNzKX0ncyBhcmd1bWVudCB0eXBlIGlzIGludmFsaWQ6IHRoZSBtZXNzYWdlIGNhbm5vdCBiZSBzZXJpYWxpemVkOiAke1N0cmluZyhtZXNzYWdlKX0uYCwge2NhdXNlOiBlcnJvcn0pO1xuXHR9XG59O1xuXG5jb25zdCBpc1NlcmlhbGl6YXRpb25FcnJvciA9ICh7Y29kZSwgbWVzc2FnZX0pID0+IFNFUklBTElaQVRJT05fRVJST1JfQ09ERVMuaGFzKGNvZGUpXG5cdHx8IFNFUklBTElaQVRJT05fRVJST1JfTUVTU0FHRVMuc29tZShzZXJpYWxpemF0aW9uRXJyb3JNZXNzYWdlID0+IG1lc3NhZ2UuaW5jbHVkZXMoc2VyaWFsaXphdGlvbkVycm9yTWVzc2FnZSkpO1xuXG4vLyBgZXJyb3IuY29kZWAgc2V0IGJ5IE5vZGUuanMgd2hlbiBpdCBmYWlsZWQgdG8gc2VyaWFsaXplIHRoZSBtZXNzYWdlXG5jb25zdCBTRVJJQUxJWkFUSU9OX0VSUk9SX0NPREVTID0gbmV3IFNldChbXG5cdC8vIE1lc3NhZ2UgaXMgYHVuZGVmaW5lZGBcblx0J0VSUl9NSVNTSU5HX0FSR1MnLFxuXHQvLyBNZXNzYWdlIGlzIGEgZnVuY3Rpb24sIGEgYmlnaW50LCBhIHN5bWJvbFxuXHQnRVJSX0lOVkFMSURfQVJHX1RZUEUnLFxuXSk7XG5cbi8vIGBlcnJvci5tZXNzYWdlYCBzZXQgYnkgTm9kZS5qcyB3aGVuIGl0IGZhaWxlZCB0byBzZXJpYWxpemUgdGhlIG1lc3NhZ2VcbmNvbnN0IFNFUklBTElaQVRJT05fRVJST1JfTUVTU0FHRVMgPSBbXG5cdC8vIE1lc3NhZ2UgaXMgYSBwcm9taXNlIG9yIGEgcHJveHksIHdpdGggYHNlcmlhbGl6YXRpb246ICdhZHZhbmNlZCdgXG5cdCdjb3VsZCBub3QgYmUgY2xvbmVkJyxcblx0Ly8gTWVzc2FnZSBoYXMgY3ljbGVzLCB3aXRoIGBzZXJpYWxpemF0aW9uOiAnanNvbidgXG5cdCdjaXJjdWxhciBzdHJ1Y3R1cmUnLFxuXHQvLyBNZXNzYWdlIGhhcyBjeWNsZXMgaW5zaWRlIHRvSlNPTigpLCB3aXRoIGBzZXJpYWxpemF0aW9uOiAnanNvbidgXG5cdCdjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWQnLFxuXTtcblxuY29uc3QgZ2V0TWV0aG9kTmFtZSA9IChtZXRob2ROYW1lLCBpc1N1YnByb2Nlc3MsIHBhcmFtZXRlcnMgPSAnJykgPT4gbWV0aG9kTmFtZSA9PT0gJ2NhbmNlbFNpZ25hbCdcblx0PyAnYGNhbmNlbFNpZ25hbGBcXCdzIGBjb250cm9sbGVyLmFib3J0KClgJ1xuXHQ6IGAke2dldE5hbWVzcGFjZU5hbWUoaXNTdWJwcm9jZXNzKX0ke21ldGhvZE5hbWV9KCR7cGFyYW1ldGVyc30pYDtcblxuY29uc3QgZ2V0TmFtZXNwYWNlTmFtZSA9IGlzU3VicHJvY2VzcyA9PiBpc1N1YnByb2Nlc3MgPyAnJyA6ICdzdWJwcm9jZXNzLic7XG5cbmNvbnN0IGdldE90aGVyUHJvY2Vzc05hbWUgPSBpc1N1YnByb2Nlc3MgPT4gaXNTdWJwcm9jZXNzID8gJ3BhcmVudCBwcm9jZXNzJyA6ICdzdWJwcm9jZXNzJztcblxuLy8gV2hlbiBhbnkgZXJyb3IgYXJpc2VzLCB3ZSBkaXNjb25uZWN0IHRoZSBJUEMuXG4vLyBPdGhlcndpc2UsIGl0IGlzIGxpa2VseSB0aGF0IG9uZSBvZiB0aGUgcHJvY2Vzc2VzIHdpbGwgc3RvcCBzZW5kaW5nL3JlY2VpdmluZyBtZXNzYWdlcy5cbi8vIFRoaXMgd291bGQgbGVhdmUgdGhlIG90aGVyIHByb2Nlc3MgaGFuZ2luZy5cbmV4cG9ydCBjb25zdCBkaXNjb25uZWN0ID0gYW55UHJvY2VzcyA9PiB7XG5cdGlmIChhbnlQcm9jZXNzLmNvbm5lY3RlZCkge1xuXHRcdGFueVByb2Nlc3MuZGlzY29ubmVjdCgpO1xuXHR9XG59O1xuIiwgImV4cG9ydCBjb25zdCBjcmVhdGVEZWZlcnJlZCA9ICgpID0+IHtcblx0Y29uc3QgbWV0aG9kcyA9IHt9O1xuXHRjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdE9iamVjdC5hc3NpZ24obWV0aG9kcywge3Jlc29sdmUsIHJlamVjdH0pO1xuXHR9KTtcblx0cmV0dXJuIE9iamVjdC5hc3NpZ24ocHJvbWlzZSwgbWV0aG9kcyk7XG59O1xuIiwgImltcG9ydCB7cGFyc2VGZH0gZnJvbSAnLi9zcGVjaWZpYy5qcyc7XG5cbi8vIFJldHJpZXZlIHN0cmVhbSB0YXJnZXRlZCBieSB0aGUgYHRvYCBvcHRpb25cbmV4cG9ydCBjb25zdCBnZXRUb1N0cmVhbSA9IChkZXN0aW5hdGlvbiwgdG8gPSAnc3RkaW4nKSA9PiB7XG5cdGNvbnN0IGlzV3JpdGFibGUgPSB0cnVlO1xuXHRjb25zdCB7b3B0aW9ucywgZmlsZURlc2NyaXB0b3JzfSA9IFNVQlBST0NFU1NfT1BUSU9OUy5nZXQoZGVzdGluYXRpb24pO1xuXHRjb25zdCBmZE51bWJlciA9IGdldEZkTnVtYmVyKGZpbGVEZXNjcmlwdG9ycywgdG8sIGlzV3JpdGFibGUpO1xuXHRjb25zdCBkZXN0aW5hdGlvblN0cmVhbSA9IGRlc3RpbmF0aW9uLnN0ZGlvW2ZkTnVtYmVyXTtcblxuXHRpZiAoZGVzdGluYXRpb25TdHJlYW0gPT09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGdldEludmFsaWRTdGRpb09wdGlvbk1lc3NhZ2UoZmROdW1iZXIsIHRvLCBvcHRpb25zLCBpc1dyaXRhYmxlKSk7XG5cdH1cblxuXHRyZXR1cm4gZGVzdGluYXRpb25TdHJlYW07XG59O1xuXG4vLyBSZXRyaWV2ZSBzdHJlYW0gdGFyZ2V0ZWQgYnkgdGhlIGBmcm9tYCBvcHRpb25cbmV4cG9ydCBjb25zdCBnZXRGcm9tU3RyZWFtID0gKHNvdXJjZSwgZnJvbSA9ICdzdGRvdXQnKSA9PiB7XG5cdGNvbnN0IGlzV3JpdGFibGUgPSBmYWxzZTtcblx0Y29uc3Qge29wdGlvbnMsIGZpbGVEZXNjcmlwdG9yc30gPSBTVUJQUk9DRVNTX09QVElPTlMuZ2V0KHNvdXJjZSk7XG5cdGNvbnN0IGZkTnVtYmVyID0gZ2V0RmROdW1iZXIoZmlsZURlc2NyaXB0b3JzLCBmcm9tLCBpc1dyaXRhYmxlKTtcblx0Y29uc3Qgc291cmNlU3RyZWFtID0gZmROdW1iZXIgPT09ICdhbGwnID8gc291cmNlLmFsbCA6IHNvdXJjZS5zdGRpb1tmZE51bWJlcl07XG5cblx0aWYgKHNvdXJjZVN0cmVhbSA9PT0gbnVsbCB8fCBzb3VyY2VTdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoZ2V0SW52YWxpZFN0ZGlvT3B0aW9uTWVzc2FnZShmZE51bWJlciwgZnJvbSwgb3B0aW9ucywgaXNXcml0YWJsZSkpO1xuXHR9XG5cblx0cmV0dXJuIHNvdXJjZVN0cmVhbTtcbn07XG5cbi8vIEtlZXBzIHRyYWNrIG9mIHRoZSBvcHRpb25zIHBhc3NlZCB0byBlYWNoIEV4ZWNhIGNhbGxcbmV4cG9ydCBjb25zdCBTVUJQUk9DRVNTX09QVElPTlMgPSBuZXcgV2Vha01hcCgpO1xuXG5jb25zdCBnZXRGZE51bWJlciA9IChmaWxlRGVzY3JpcHRvcnMsIGZkTmFtZSwgaXNXcml0YWJsZSkgPT4ge1xuXHRjb25zdCBmZE51bWJlciA9IHBhcnNlRmROdW1iZXIoZmROYW1lLCBpc1dyaXRhYmxlKTtcblx0dmFsaWRhdGVGZE51bWJlcihmZE51bWJlciwgZmROYW1lLCBpc1dyaXRhYmxlLCBmaWxlRGVzY3JpcHRvcnMpO1xuXHRyZXR1cm4gZmROdW1iZXI7XG59O1xuXG5jb25zdCBwYXJzZUZkTnVtYmVyID0gKGZkTmFtZSwgaXNXcml0YWJsZSkgPT4ge1xuXHRjb25zdCBmZE51bWJlciA9IHBhcnNlRmQoZmROYW1lKTtcblx0aWYgKGZkTnVtYmVyICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gZmROdW1iZXI7XG5cdH1cblxuXHRjb25zdCB7dmFsaWRPcHRpb25zLCBkZWZhdWx0VmFsdWV9ID0gaXNXcml0YWJsZVxuXHRcdD8ge3ZhbGlkT3B0aW9uczogJ1wic3RkaW5cIicsIGRlZmF1bHRWYWx1ZTogJ3N0ZGluJ31cblx0XHQ6IHt2YWxpZE9wdGlvbnM6ICdcInN0ZG91dFwiLCBcInN0ZGVyclwiLCBcImFsbFwiJywgZGVmYXVsdFZhbHVlOiAnc3Rkb3V0J307XG5cdHRocm93IG5ldyBUeXBlRXJyb3IoYFwiJHtnZXRPcHRpb25OYW1lKGlzV3JpdGFibGUpfVwiIG11c3Qgbm90IGJlIFwiJHtmZE5hbWV9XCIuXG5JdCBtdXN0IGJlICR7dmFsaWRPcHRpb25zfSBvciBcImZkM1wiLCBcImZkNFwiIChhbmQgc28gb24pLlxuSXQgaXMgb3B0aW9uYWwgYW5kIGRlZmF1bHRzIHRvIFwiJHtkZWZhdWx0VmFsdWV9XCIuYCk7XG59O1xuXG5jb25zdCB2YWxpZGF0ZUZkTnVtYmVyID0gKGZkTnVtYmVyLCBmZE5hbWUsIGlzV3JpdGFibGUsIGZpbGVEZXNjcmlwdG9ycykgPT4ge1xuXHRjb25zdCBmaWxlRGVzY3JpcHRvciA9IGZpbGVEZXNjcmlwdG9yc1tnZXRVc2VkRGVzY3JpcHRvcihmZE51bWJlcildO1xuXHRpZiAoZmlsZURlc2NyaXB0b3IgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYFwiJHtnZXRPcHRpb25OYW1lKGlzV3JpdGFibGUpfVwiIG11c3Qgbm90IGJlICR7ZmROYW1lfS4gVGhhdCBmaWxlIGRlc2NyaXB0b3IgZG9lcyBub3QgZXhpc3QuXG5QbGVhc2Ugc2V0IHRoZSBcInN0ZGlvXCIgb3B0aW9uIHRvIGVuc3VyZSB0aGF0IGZpbGUgZGVzY3JpcHRvciBleGlzdHMuYCk7XG5cdH1cblxuXHRpZiAoZmlsZURlc2NyaXB0b3IuZGlyZWN0aW9uID09PSAnaW5wdXQnICYmICFpc1dyaXRhYmxlKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgXCIke2dldE9wdGlvbk5hbWUoaXNXcml0YWJsZSl9XCIgbXVzdCBub3QgYmUgJHtmZE5hbWV9LiBJdCBtdXN0IGJlIGEgcmVhZGFibGUgc3RyZWFtLCBub3Qgd3JpdGFibGUuYCk7XG5cdH1cblxuXHRpZiAoZmlsZURlc2NyaXB0b3IuZGlyZWN0aW9uICE9PSAnaW5wdXQnICYmIGlzV3JpdGFibGUpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBcIiR7Z2V0T3B0aW9uTmFtZShpc1dyaXRhYmxlKX1cIiBtdXN0IG5vdCBiZSAke2ZkTmFtZX0uIEl0IG11c3QgYmUgYSB3cml0YWJsZSBzdHJlYW0sIG5vdCByZWFkYWJsZS5gKTtcblx0fVxufTtcblxuY29uc3QgZ2V0SW52YWxpZFN0ZGlvT3B0aW9uTWVzc2FnZSA9IChmZE51bWJlciwgZmROYW1lLCBvcHRpb25zLCBpc1dyaXRhYmxlKSA9PiB7XG5cdGlmIChmZE51bWJlciA9PT0gJ2FsbCcgJiYgIW9wdGlvbnMuYWxsKSB7XG5cdFx0cmV0dXJuICdUaGUgXCJhbGxcIiBvcHRpb24gbXVzdCBiZSB0cnVlIHRvIHVzZSBcImZyb206IFxcJ2FsbFxcJ1wiLic7XG5cdH1cblxuXHRjb25zdCB7b3B0aW9uTmFtZSwgb3B0aW9uVmFsdWV9ID0gZ2V0SW52YWxpZFN0ZGlvT3B0aW9uKGZkTnVtYmVyLCBvcHRpb25zKTtcblx0cmV0dXJuIGBUaGUgXCIke29wdGlvbk5hbWV9OiAke3NlcmlhbGl6ZU9wdGlvblZhbHVlKG9wdGlvblZhbHVlKX1cIiBvcHRpb24gaXMgaW5jb21wYXRpYmxlIHdpdGggdXNpbmcgXCIke2dldE9wdGlvbk5hbWUoaXNXcml0YWJsZSl9OiAke3NlcmlhbGl6ZU9wdGlvblZhbHVlKGZkTmFtZSl9XCIuXG5QbGVhc2Ugc2V0IHRoaXMgb3B0aW9uIHdpdGggXCJwaXBlXCIgaW5zdGVhZC5gO1xufTtcblxuY29uc3QgZ2V0SW52YWxpZFN0ZGlvT3B0aW9uID0gKGZkTnVtYmVyLCB7c3RkaW4sIHN0ZG91dCwgc3RkZXJyLCBzdGRpb30pID0+IHtcblx0Y29uc3QgdXNlZERlc2NyaXB0b3IgPSBnZXRVc2VkRGVzY3JpcHRvcihmZE51bWJlcik7XG5cblx0aWYgKHVzZWREZXNjcmlwdG9yID09PSAwICYmIHN0ZGluICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4ge29wdGlvbk5hbWU6ICdzdGRpbicsIG9wdGlvblZhbHVlOiBzdGRpbn07XG5cdH1cblxuXHRpZiAodXNlZERlc2NyaXB0b3IgPT09IDEgJiYgc3Rkb3V0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4ge29wdGlvbk5hbWU6ICdzdGRvdXQnLCBvcHRpb25WYWx1ZTogc3Rkb3V0fTtcblx0fVxuXG5cdGlmICh1c2VkRGVzY3JpcHRvciA9PT0gMiAmJiBzdGRlcnIgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiB7b3B0aW9uTmFtZTogJ3N0ZGVycicsIG9wdGlvblZhbHVlOiBzdGRlcnJ9O1xuXHR9XG5cblx0cmV0dXJuIHtvcHRpb25OYW1lOiBgc3RkaW9bJHt1c2VkRGVzY3JpcHRvcn1dYCwgb3B0aW9uVmFsdWU6IHN0ZGlvW3VzZWREZXNjcmlwdG9yXX07XG59O1xuXG5jb25zdCBnZXRVc2VkRGVzY3JpcHRvciA9IGZkTnVtYmVyID0+IGZkTnVtYmVyID09PSAnYWxsJyA/IDEgOiBmZE51bWJlcjtcblxuY29uc3QgZ2V0T3B0aW9uTmFtZSA9IGlzV3JpdGFibGUgPT4gaXNXcml0YWJsZSA/ICd0bycgOiAnZnJvbSc7XG5cbmV4cG9ydCBjb25zdCBzZXJpYWxpemVPcHRpb25WYWx1ZSA9IHZhbHVlID0+IHtcblx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gYCcke3ZhbHVlfSdgO1xuXHR9XG5cblx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgPyBgJHt2YWx1ZX1gIDogJ1N0cmVhbSc7XG59O1xuIiwgImltcG9ydCB7YWRkQWJvcnRMaXN0ZW5lcn0gZnJvbSAnbm9kZTpldmVudHMnO1xuXG4vLyBUZW1wb3JhcmlseSBpbmNyZWFzZSB0aGUgbWF4aW11bSBudW1iZXIgb2YgbGlzdGVuZXJzIG9uIGFuIGV2ZW50RW1pdHRlclxuZXhwb3J0IGNvbnN0IGluY3JlbWVudE1heExpc3RlbmVycyA9IChldmVudEVtaXR0ZXIsIG1heExpc3RlbmVyc0luY3JlbWVudCwgc2lnbmFsKSA9PiB7XG5cdGNvbnN0IG1heExpc3RlbmVycyA9IGV2ZW50RW1pdHRlci5nZXRNYXhMaXN0ZW5lcnMoKTtcblx0aWYgKG1heExpc3RlbmVycyA9PT0gMCB8fCBtYXhMaXN0ZW5lcnMgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGV2ZW50RW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMobWF4TGlzdGVuZXJzICsgbWF4TGlzdGVuZXJzSW5jcmVtZW50KTtcblx0YWRkQWJvcnRMaXN0ZW5lcihzaWduYWwsICgpID0+IHtcblx0XHRldmVudEVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKGV2ZW50RW1pdHRlci5nZXRNYXhMaXN0ZW5lcnMoKSAtIG1heExpc3RlbmVyc0luY3JlbWVudCk7XG5cdH0pO1xufTtcbiIsICIvLyBCeSBkZWZhdWx0LCBOb2RlLmpzIGtlZXBzIHRoZSBzdWJwcm9jZXNzIGFsaXZlIHdoaWxlIGl0IGhhcyBhIGBtZXNzYWdlYCBvciBgZGlzY29ubmVjdGAgbGlzdGVuZXIuXG4vLyBXZSByZXBsaWNhdGUgdGhlIHNhbWUgbG9naWMgZm9yIHRoZSBldmVudHMgdGhhdCB3ZSBwcm94eS5cbi8vIFRoaXMgZW5zdXJlcyB0aGUgc3VicHJvY2VzcyBpcyBrZXB0IGFsaXZlIHdoaWxlIGBnZXRPbmVNZXNzYWdlKClgIGFuZCBgZ2V0RWFjaE1lc3NhZ2UoKWAgYXJlIG9uZ29pbmcuXG4vLyBUaGlzIGlzIG5vdCBhIHByb2JsZW0gd2l0aCBgc2VuZE1lc3NhZ2UoKWAgc2luY2UgTm9kZS5qcyBoYW5kbGVzIHRoYXQgbWV0aG9kIGF1dG9tYXRpY2FsbHkuXG4vLyBXZSBkbyBub3QgdXNlIGBhbnlQcm9jZXNzLmNoYW5uZWwucmVmKClgIHNpbmNlIHRoaXMgd291bGQgcHJldmVudCB0aGUgYXV0b21hdGljIGAuY2hhbm5lbC5yZWZDb3VudGVkKClgIE5vZGUuanMgaXMgZG9pbmcuXG4vLyBXZSBrZWVwIGEgcmVmZXJlbmNlIHRvIGBhbnlQcm9jZXNzLmNoYW5uZWxgIHNpbmNlIGl0IG1pZ2h0IGJlIGBudWxsYCB3aGlsZSBgZ2V0T25lTWVzc2FnZSgpYCBvciBgZ2V0RWFjaE1lc3NhZ2UoKWAgaXMgc3RpbGwgcHJvY2Vzc2luZyBkZWJvdW5jZWQgbWVzc2FnZXMuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2Jsb2IvMmFhZWFhODYzYzM1YmVmYTJlYmFhOThmYjc3MzdlYzg0ZGY0ZDhlOS9saWIvaW50ZXJuYWwvY2hpbGRfcHJvY2Vzcy5qcyNMNTQ3XG5leHBvcnQgY29uc3QgYWRkUmVmZXJlbmNlID0gKGNoYW5uZWwsIHJlZmVyZW5jZSkgPT4ge1xuXHRpZiAocmVmZXJlbmNlKSB7XG5cdFx0YWRkUmVmZXJlbmNlQ291bnQoY2hhbm5lbCk7XG5cdH1cbn07XG5cbmNvbnN0IGFkZFJlZmVyZW5jZUNvdW50ID0gY2hhbm5lbCA9PiB7XG5cdGNoYW5uZWwucmVmQ291bnRlZCgpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZVJlZmVyZW5jZSA9IChjaGFubmVsLCByZWZlcmVuY2UpID0+IHtcblx0aWYgKHJlZmVyZW5jZSkge1xuXHRcdHJlbW92ZVJlZmVyZW5jZUNvdW50KGNoYW5uZWwpO1xuXHR9XG59O1xuXG5jb25zdCByZW1vdmVSZWZlcmVuY2VDb3VudCA9IGNoYW5uZWwgPT4ge1xuXHRjaGFubmVsLnVucmVmQ291bnRlZCgpO1xufTtcblxuLy8gVG8gcHJveHkgZXZlbnRzLCB3ZSBzZXR1cCBzb21lIGdsb2JhbCBsaXN0ZW5lcnMgb24gdGhlIGBtZXNzYWdlYCBhbmQgYGRpc2Nvbm5lY3RgIGV2ZW50cy5cbi8vIFRob3NlIHNob3VsZCBub3Qga2VlcCB0aGUgc3VicHJvY2VzcyBhbGl2ZSwgc28gd2UgcmVtb3ZlIHRoZSBhdXRvbWF0aWMgY291bnRpbmcgdGhhdCBOb2RlLmpzIGlzIGRvaW5nLlxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9ibG9iLzFiOTY1MjcwYTljMjczZDRjZjcwZTg4MDhlOWQyOGI5YWRhNzg0NGYvbGliL2NoaWxkX3Byb2Nlc3MuanMjTDE4MFxuZXhwb3J0IGNvbnN0IHVuZG9BZGRlZFJlZmVyZW5jZXMgPSAoY2hhbm5lbCwgaXNTdWJwcm9jZXNzKSA9PiB7XG5cdGlmIChpc1N1YnByb2Nlc3MpIHtcblx0XHRyZW1vdmVSZWZlcmVuY2VDb3VudChjaGFubmVsKTtcblx0XHRyZW1vdmVSZWZlcmVuY2VDb3VudChjaGFubmVsKTtcblx0fVxufTtcblxuLy8gUmV2ZXJzZSBpdCBkdXJpbmcgYGRpc2Nvbm5lY3RgXG5leHBvcnQgY29uc3QgcmVkb0FkZGVkUmVmZXJlbmNlcyA9IChjaGFubmVsLCBpc1N1YnByb2Nlc3MpID0+IHtcblx0aWYgKGlzU3VicHJvY2Vzcykge1xuXHRcdGFkZFJlZmVyZW5jZUNvdW50KGNoYW5uZWwpO1xuXHRcdGFkZFJlZmVyZW5jZUNvdW50KGNoYW5uZWwpO1xuXHR9XG59O1xuIiwgImltcG9ydCB7b25jZX0gZnJvbSAnbm9kZTpldmVudHMnO1xuaW1wb3J0IHtzY2hlZHVsZXJ9IGZyb20gJ25vZGU6dGltZXJzL3Byb21pc2VzJztcbmltcG9ydCB7d2FpdEZvck91dGdvaW5nTWVzc2FnZXN9IGZyb20gJy4vb3V0Z29pbmcuanMnO1xuaW1wb3J0IHtyZWRvQWRkZWRSZWZlcmVuY2VzfSBmcm9tICcuL3JlZmVyZW5jZS5qcyc7XG5pbXBvcnQge2hhbmRsZVN0cmljdFJlcXVlc3QsIGhhbmRsZVN0cmljdFJlc3BvbnNlfSBmcm9tICcuL3N0cmljdC5qcyc7XG5pbXBvcnQge2hhbmRsZUFib3J0LCBhYm9ydE9uRGlzY29ubmVjdH0gZnJvbSAnLi9ncmFjZWZ1bC5qcyc7XG5cbi8vIEJ5IGRlZmF1bHQsIE5vZGUuanMgYnVmZmVycyBgbWVzc2FnZWAgZXZlbnRzLlxuLy8gIC0gQnVmZmVyaW5nIGhhcHBlbnMgd2hlbiB0aGVyZSBpcyBhIGBtZXNzYWdlYCBldmVudCBpcyBlbWl0dGVkIGJ1dCB0aGVyZSBpcyBubyBoYW5kbGVyLlxuLy8gIC0gQXMgc29vbiBhcyBhIGBtZXNzYWdlYCBldmVudCBoYW5kbGVyIGlzIHNldCwgYWxsIGJ1ZmZlcmVkIGBtZXNzYWdlYCBldmVudHMgYXJlIGVtaXR0ZWQsIGVtcHR5aW5nIHRoZSBidWZmZXIuXG4vLyAgLSBUaGlzIGhhcHBlbnMgYm90aCBpbiB0aGUgY3VycmVudCBwcm9jZXNzIGFuZCB0aGUgc3VicHJvY2Vzcy5cbi8vICAtIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvYmxvYi81MDE1NDZlOGYzNzA1OWNkNTc3MDQxZTIzOTQxYjY0MGQwZDRkNDA2L2xpYi9pbnRlcm5hbC9jaGlsZF9wcm9jZXNzLmpzI0w3MTlcbi8vIFRoaXMgaXMgaGVscGZ1bC4gTm90YWJseSwgdGhpcyBhbGxvd3Mgc2VuZGluZyBtZXNzYWdlcyB0byBhIHN1YnByb2Nlc3MgdGhhdCdzIHN0aWxsIGluaXRpYWxpemluZy5cbi8vIEhvd2V2ZXIsIGl0IGhhcyBzZXZlcmFsIHByb2JsZW1zLlxuLy8gIC0gVGhpcyB3b3JrcyB3aXRoIGBldmVudHMub24oKWAgYnV0IG5vdCBgZXZlbnRzLm9uY2UoKWAgc2luY2UgYWxsIGJ1ZmZlcmVkIG1lc3NhZ2VzIGFyZSBlbWl0dGVkIGF0IG9uY2UuXG4vLyAgICBGb3IgZXhhbXBsZSwgdXNlcnMgY2Fubm90IGNhbGwgYGF3YWl0IGdldE9uZU1lc3NhZ2UoKWAvYGdldEVhY2hNZXNzYWdlKClgIG11bHRpcGxlIHRpbWVzIGluIGEgcm93LlxuLy8gIC0gV2hlbiBhIHVzZXIgaW50ZW50aW9uYWxseSBzdGFydHMgbGlzdGVuaW5nIHRvIGBtZXNzYWdlYCBhdCBhIHNwZWNpZmljIHBvaW50IGluIHRpbWUsIHBhc3QgYG1lc3NhZ2VgIGV2ZW50cyBhcmUgcmVwbGF5ZWQsIHdoaWNoIG1pZ2h0IGJlIHVuZXhwZWN0ZWQuXG4vLyAgLSBCdWZmZXJpbmcgaXMgdW5saW1pdGVkLCB3aGljaCBtaWdodCBsZWFkIHRvIGFuIG91dC1vZi1tZW1vcnkgY3Jhc2guXG4vLyAgLSBUaGlzIGRvZXMgbm90IHdvcmsgd2VsbCB3aXRoIG11bHRpcGxlIGNvbnN1bWVycy5cbi8vICAgIEZvciBleGFtcGxlLCBFeGVjYSBjb25zdW1lcyBldmVudHMgd2l0aCBib3RoIGByZXN1bHQuaXBjT3V0cHV0YCBhbmQgbWFudWFsIElQQyBjYWxscyBsaWtlIGBnZXRPbmVNZXNzYWdlKClgLlxuLy8gICAgU2luY2UgYHJlc3VsdC5pcGNPdXRwdXRgIHJlYWRzIGFsbCBpbmNvbWluZyBtZXNzYWdlcywgbm8gYnVmZmVyaW5nIGhhcHBlbnMgZm9yIG1hbnVhbCBJUEMgY2FsbHMuXG4vLyAgLSBGb3JnZXR0aW5nIHRvIHNldHVwIGEgYG1lc3NhZ2VgIGxpc3RlbmVyLCBvciBzZXR0aW5nIGl0IHVwIHRvbyBsYXRlLCBpcyBhIHByb2dyYW1taW5nIG1pc3Rha2UuXG4vLyAgICBUaGUgZGVmYXVsdCBiZWhhdmlvciBkb2VzIG5vdCBhbGxvdyB1c2VycyB0byByZWFsaXplIHRoZXkgbWFkZSB0aGF0IG1pc3Rha2UuXG4vLyBUbyBzb2x2ZSB0aG9zZSBwcm9ibGVtcywgaW5zdGVhZCBvZiBidWZmZXJpbmcgbWVzc2FnZXMsIHdlIGRlYm91bmNlIHRoZW0uXG4vLyBUaGUgYG1lc3NhZ2VgIGV2ZW50IHNvIGl0IGlzIGVtaXR0ZWQgYXQgbW9zdCBvbmNlIHBlciBtYWNyb3Rhc2suXG5leHBvcnQgY29uc3Qgb25NZXNzYWdlID0gYXN5bmMgKHthbnlQcm9jZXNzLCBjaGFubmVsLCBpc1N1YnByb2Nlc3MsIGlwY0VtaXR0ZXJ9LCB3cmFwcGVkTWVzc2FnZSkgPT4ge1xuXHRpZiAoaGFuZGxlU3RyaWN0UmVzcG9uc2Uod3JhcHBlZE1lc3NhZ2UpIHx8IGhhbmRsZUFib3J0KHdyYXBwZWRNZXNzYWdlKSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmICghSU5DT01JTkdfTUVTU0FHRVMuaGFzKGFueVByb2Nlc3MpKSB7XG5cdFx0SU5DT01JTkdfTUVTU0FHRVMuc2V0KGFueVByb2Nlc3MsIFtdKTtcblx0fVxuXG5cdGNvbnN0IGluY29taW5nTWVzc2FnZXMgPSBJTkNPTUlOR19NRVNTQUdFUy5nZXQoYW55UHJvY2Vzcyk7XG5cdGluY29taW5nTWVzc2FnZXMucHVzaCh3cmFwcGVkTWVzc2FnZSk7XG5cblx0aWYgKGluY29taW5nTWVzc2FnZXMubGVuZ3RoID4gMSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHdoaWxlIChpbmNvbWluZ01lc3NhZ2VzLmxlbmd0aCA+IDApIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuXHRcdGF3YWl0IHdhaXRGb3JPdXRnb2luZ01lc3NhZ2VzKGFueVByb2Nlc3MsIGlwY0VtaXR0ZXIsIHdyYXBwZWRNZXNzYWdlKTtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuXHRcdGF3YWl0IHNjaGVkdWxlci55aWVsZCgpO1xuXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3Bcblx0XHRjb25zdCBtZXNzYWdlID0gYXdhaXQgaGFuZGxlU3RyaWN0UmVxdWVzdCh7XG5cdFx0XHR3cmFwcGVkTWVzc2FnZTogaW5jb21pbmdNZXNzYWdlc1swXSxcblx0XHRcdGFueVByb2Nlc3MsXG5cdFx0XHRjaGFubmVsLFxuXHRcdFx0aXNTdWJwcm9jZXNzLFxuXHRcdFx0aXBjRW1pdHRlcixcblx0XHR9KTtcblxuXHRcdGluY29taW5nTWVzc2FnZXMuc2hpZnQoKTtcblx0XHRpcGNFbWl0dGVyLmVtaXQoJ21lc3NhZ2UnLCBtZXNzYWdlKTtcblx0XHRpcGNFbWl0dGVyLmVtaXQoJ21lc3NhZ2U6ZG9uZScpO1xuXHR9XG59O1xuXG4vLyBJZiB0aGUgYG1lc3NhZ2VgIGV2ZW50IGlzIGN1cnJlbnRseSBkZWJvdW5jZWQsIHRoZSBgZGlzY29ubmVjdGAgZXZlbnQgbXVzdCB3YWl0IGZvciBpdFxuZXhwb3J0IGNvbnN0IG9uRGlzY29ubmVjdCA9IGFzeW5jICh7YW55UHJvY2VzcywgY2hhbm5lbCwgaXNTdWJwcm9jZXNzLCBpcGNFbWl0dGVyLCBib3VuZE9uTWVzc2FnZX0pID0+IHtcblx0YWJvcnRPbkRpc2Nvbm5lY3QoKTtcblxuXHRjb25zdCBpbmNvbWluZ01lc3NhZ2VzID0gSU5DT01JTkdfTUVTU0FHRVMuZ2V0KGFueVByb2Nlc3MpO1xuXHR3aGlsZSAoaW5jb21pbmdNZXNzYWdlcz8ubGVuZ3RoID4gMCkge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG5cdFx0YXdhaXQgb25jZShpcGNFbWl0dGVyLCAnbWVzc2FnZTpkb25lJyk7XG5cdH1cblxuXHRhbnlQcm9jZXNzLnJlbW92ZUxpc3RlbmVyKCdtZXNzYWdlJywgYm91bmRPbk1lc3NhZ2UpO1xuXHRyZWRvQWRkZWRSZWZlcmVuY2VzKGNoYW5uZWwsIGlzU3VicHJvY2Vzcyk7XG5cdGlwY0VtaXR0ZXIuY29ubmVjdGVkID0gZmFsc2U7XG5cdGlwY0VtaXR0ZXIuZW1pdCgnZGlzY29ubmVjdCcpO1xufTtcblxuY29uc3QgSU5DT01JTkdfTUVTU0FHRVMgPSBuZXcgV2Vha01hcCgpO1xuIiwgImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdub2RlOmV2ZW50cyc7XG5pbXBvcnQge29uTWVzc2FnZSwgb25EaXNjb25uZWN0fSBmcm9tICcuL2luY29taW5nLmpzJztcbmltcG9ydCB7dW5kb0FkZGVkUmVmZXJlbmNlc30gZnJvbSAnLi9yZWZlcmVuY2UuanMnO1xuXG4vLyBGb3J3YXJkIHRoZSBgbWVzc2FnZWAgYW5kIGBkaXNjb25uZWN0YCBldmVudHMgZnJvbSB0aGUgcHJvY2VzcyBhbmQgc3VicHJvY2VzcyB0byBhIHByb3h5IGVtaXR0ZXIuXG4vLyBUaGlzIHByZXZlbnRzIHRoZSBgZXJyb3JgIGV2ZW50IGZyb20gc3RvcHBpbmcgSVBDLlxuLy8gVGhpcyBhbHNvIGFsbG93cyBkZWJvdW5jaW5nIHRoZSBgbWVzc2FnZWAgZXZlbnQuXG5leHBvcnQgY29uc3QgZ2V0SXBjRW1pdHRlciA9IChhbnlQcm9jZXNzLCBjaGFubmVsLCBpc1N1YnByb2Nlc3MpID0+IHtcblx0aWYgKElQQ19FTUlUVEVSUy5oYXMoYW55UHJvY2VzcykpIHtcblx0XHRyZXR1cm4gSVBDX0VNSVRURVJTLmdldChhbnlQcm9jZXNzKTtcblx0fVxuXG5cdC8vIFVzZSBhbiBgRXZlbnRFbWl0dGVyYCwgbGlrZSB0aGUgYHByb2Nlc3NgIHRoYXQgaXMgYmVpbmcgcHJveGllZFxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItZXZlbnQtdGFyZ2V0XG5cdGNvbnN0IGlwY0VtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cdGlwY0VtaXR0ZXIuY29ubmVjdGVkID0gdHJ1ZTtcblx0SVBDX0VNSVRURVJTLnNldChhbnlQcm9jZXNzLCBpcGNFbWl0dGVyKTtcblx0Zm9yd2FyZEV2ZW50cyh7XG5cdFx0aXBjRW1pdHRlcixcblx0XHRhbnlQcm9jZXNzLFxuXHRcdGNoYW5uZWwsXG5cdFx0aXNTdWJwcm9jZXNzLFxuXHR9KTtcblx0cmV0dXJuIGlwY0VtaXR0ZXI7XG59O1xuXG5jb25zdCBJUENfRU1JVFRFUlMgPSBuZXcgV2Vha01hcCgpO1xuXG4vLyBUaGUgYG1lc3NhZ2VgIGFuZCBgZGlzY29ubmVjdGAgZXZlbnRzIGFyZSBidWZmZXJlZCBpbiB0aGUgc3VicHJvY2VzcyB1bnRpbCB0aGUgZmlyc3QgbGlzdGVuZXIgaXMgc2V0dXAuXG4vLyBIb3dldmVyLCB1bmJ1ZmZlcmluZyBoYXBwZW5zIGFmdGVyIG9uZSB0aWNrLCBzbyB0aGlzIGdpdmUgZW5vdWdoIHRpbWUgZm9yIHRoZSBjYWxsZXIgdG8gc2V0dXAgdGhlIGxpc3RlbmVyIG9uIHRoZSBwcm94eSBlbWl0dGVyIGZpcnN0LlxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9ibG9iLzJhYWVhYTg2M2MzNWJlZmEyZWJhYTk4ZmI3NzM3ZWM4NGRmNGQ4ZTkvbGliL2ludGVybmFsL2NoaWxkX3Byb2Nlc3MuanMjTDcyMVxuY29uc3QgZm9yd2FyZEV2ZW50cyA9ICh7aXBjRW1pdHRlciwgYW55UHJvY2VzcywgY2hhbm5lbCwgaXNTdWJwcm9jZXNzfSkgPT4ge1xuXHRjb25zdCBib3VuZE9uTWVzc2FnZSA9IG9uTWVzc2FnZS5iaW5kKHVuZGVmaW5lZCwge1xuXHRcdGFueVByb2Nlc3MsXG5cdFx0Y2hhbm5lbCxcblx0XHRpc1N1YnByb2Nlc3MsXG5cdFx0aXBjRW1pdHRlcixcblx0fSk7XG5cdGFueVByb2Nlc3Mub24oJ21lc3NhZ2UnLCBib3VuZE9uTWVzc2FnZSk7XG5cdGFueVByb2Nlc3Mub25jZSgnZGlzY29ubmVjdCcsIG9uRGlzY29ubmVjdC5iaW5kKHVuZGVmaW5lZCwge1xuXHRcdGFueVByb2Nlc3MsXG5cdFx0Y2hhbm5lbCxcblx0XHRpc1N1YnByb2Nlc3MsXG5cdFx0aXBjRW1pdHRlcixcblx0XHRib3VuZE9uTWVzc2FnZSxcblx0fSkpO1xuXHR1bmRvQWRkZWRSZWZlcmVuY2VzKGNoYW5uZWwsIGlzU3VicHJvY2Vzcyk7XG59O1xuXG4vLyBDaGVjayB3aGV0aGVyIHRoZXJlIG1pZ2h0IHN0aWxsIGJlIHNvbWUgYG1lc3NhZ2VgIGV2ZW50cyB0byByZWNlaXZlXG5leHBvcnQgY29uc3QgaXNDb25uZWN0ZWQgPSBhbnlQcm9jZXNzID0+IHtcblx0Y29uc3QgaXBjRW1pdHRlciA9IElQQ19FTUlUVEVSUy5nZXQoYW55UHJvY2Vzcyk7XG5cdHJldHVybiBpcGNFbWl0dGVyID09PSB1bmRlZmluZWRcblx0XHQ/IGFueVByb2Nlc3MuY2hhbm5lbCAhPT0gbnVsbFxuXHRcdDogaXBjRW1pdHRlci5jb25uZWN0ZWQ7XG59O1xuIiwgImltcG9ydCB7b25jZX0gZnJvbSAnbm9kZTpldmVudHMnO1xuaW1wb3J0IHtjcmVhdGVEZWZlcnJlZH0gZnJvbSAnLi4vdXRpbHMvZGVmZXJyZWQuanMnO1xuaW1wb3J0IHtpbmNyZW1lbnRNYXhMaXN0ZW5lcnN9IGZyb20gJy4uL3V0aWxzL21heC1saXN0ZW5lcnMuanMnO1xuaW1wb3J0IHtzZW5kTWVzc2FnZX0gZnJvbSAnLi9zZW5kLmpzJztcbmltcG9ydCB7dGhyb3dPbk1pc3NpbmdTdHJpY3QsIHRocm93T25TdHJpY3REaXNjb25uZWN0LCB0aHJvd09uU3RyaWN0RGVhZGxvY2tFcnJvcn0gZnJvbSAnLi92YWxpZGF0aW9uLmpzJztcbmltcG9ydCB7Z2V0SXBjRW1pdHRlcn0gZnJvbSAnLi9mb3J3YXJkLmpzJztcbmltcG9ydCB7aGFzTWVzc2FnZUxpc3RlbmVyc30gZnJvbSAnLi9vdXRnb2luZy5qcyc7XG5cbi8vIFdoZW4gdXNpbmcgdGhlIGBzdHJpY3RgIG9wdGlvbiwgd3JhcCB0aGUgbWVzc2FnZSB3aXRoIG1ldGFkYXRhIGR1cmluZyBgc2VuZE1lc3NhZ2UoKWBcbmV4cG9ydCBjb25zdCBoYW5kbGVTZW5kU3RyaWN0ID0gKHthbnlQcm9jZXNzLCBjaGFubmVsLCBpc1N1YnByb2Nlc3MsIG1lc3NhZ2UsIHN0cmljdH0pID0+IHtcblx0aWYgKCFzdHJpY3QpIHtcblx0XHRyZXR1cm4gbWVzc2FnZTtcblx0fVxuXG5cdGNvbnN0IGlwY0VtaXR0ZXIgPSBnZXRJcGNFbWl0dGVyKGFueVByb2Nlc3MsIGNoYW5uZWwsIGlzU3VicHJvY2Vzcyk7XG5cdGNvbnN0IGhhc0xpc3RlbmVycyA9IGhhc01lc3NhZ2VMaXN0ZW5lcnMoYW55UHJvY2VzcywgaXBjRW1pdHRlcik7XG5cdHJldHVybiB7XG5cdFx0aWQ6IGNvdW50KyssXG5cdFx0dHlwZTogUkVRVUVTVF9UWVBFLFxuXHRcdG1lc3NhZ2UsXG5cdFx0aGFzTGlzdGVuZXJzLFxuXHR9O1xufTtcblxubGV0IGNvdW50ID0gMG47XG5cbi8vIEhhbmRsZXMgd2hlbiBib3RoIHByb2Nlc3NlcyBhcmUgY2FsbGluZyBgc2VuZE1lc3NhZ2UoKWAgd2l0aCBgc3RyaWN0YCBhdCB0aGUgc2FtZSB0aW1lLlxuLy8gSWYgbmVpdGhlciBwcm9jZXNzIGlzIGxpc3RlbmluZywgdGhpcyB3b3VsZCBjcmVhdGUgYSBkZWFkbG9jay4gV2UgZGV0ZWN0IGl0IGFuZCB0aHJvdy5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVN0cmljdERlYWRsb2NrID0gKG91dGdvaW5nTWVzc2FnZXMsIHdyYXBwZWRNZXNzYWdlKSA9PiB7XG5cdGlmICh3cmFwcGVkTWVzc2FnZT8udHlwZSAhPT0gUkVRVUVTVF9UWVBFIHx8IHdyYXBwZWRNZXNzYWdlLmhhc0xpc3RlbmVycykge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGZvciAoY29uc3Qge2lkfSBvZiBvdXRnb2luZ01lc3NhZ2VzKSB7XG5cdFx0aWYgKGlkICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFNUUklDVF9SRVNQT05TRVNbaWRdLnJlc29sdmUoe2lzRGVhZGxvY2s6IHRydWUsIGhhc0xpc3RlbmVyczogZmFsc2V9KTtcblx0XHR9XG5cdH1cbn07XG5cbi8vIFRoZSBvdGhlciBwcm9jZXNzIHRoZW4gc2VuZHMgdGhlIGFja25vd2xlZGdtZW50IGJhY2sgYXMgYSByZXNwb25zZVxuZXhwb3J0IGNvbnN0IGhhbmRsZVN0cmljdFJlcXVlc3QgPSBhc3luYyAoe3dyYXBwZWRNZXNzYWdlLCBhbnlQcm9jZXNzLCBjaGFubmVsLCBpc1N1YnByb2Nlc3MsIGlwY0VtaXR0ZXJ9KSA9PiB7XG5cdGlmICh3cmFwcGVkTWVzc2FnZT8udHlwZSAhPT0gUkVRVUVTVF9UWVBFIHx8ICFhbnlQcm9jZXNzLmNvbm5lY3RlZCkge1xuXHRcdHJldHVybiB3cmFwcGVkTWVzc2FnZTtcblx0fVxuXG5cdGNvbnN0IHtpZCwgbWVzc2FnZX0gPSB3cmFwcGVkTWVzc2FnZTtcblx0Y29uc3QgcmVzcG9uc2UgPSB7aWQsIHR5cGU6IFJFU1BPTlNFX1RZUEUsIG1lc3NhZ2U6IGhhc01lc3NhZ2VMaXN0ZW5lcnMoYW55UHJvY2VzcywgaXBjRW1pdHRlcil9O1xuXG5cdHRyeSB7XG5cdFx0YXdhaXQgc2VuZE1lc3NhZ2Uoe1xuXHRcdFx0YW55UHJvY2Vzcyxcblx0XHRcdGNoYW5uZWwsXG5cdFx0XHRpc1N1YnByb2Nlc3MsXG5cdFx0XHRpcGM6IHRydWUsXG5cdFx0fSwgcmVzcG9uc2UpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlwY0VtaXR0ZXIuZW1pdCgnc3RyaWN0OmVycm9yJywgZXJyb3IpO1xuXHR9XG5cblx0cmV0dXJuIG1lc3NhZ2U7XG59O1xuXG4vLyBSZWNlcHRpb24gb2YgdGhlIGFja25vd2xlZGdtZW50IHJlc3BvbnNlXG5leHBvcnQgY29uc3QgaGFuZGxlU3RyaWN0UmVzcG9uc2UgPSB3cmFwcGVkTWVzc2FnZSA9PiB7XG5cdGlmICh3cmFwcGVkTWVzc2FnZT8udHlwZSAhPT0gUkVTUE9OU0VfVFlQRSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGNvbnN0IHtpZCwgbWVzc2FnZTogaGFzTGlzdGVuZXJzfSA9IHdyYXBwZWRNZXNzYWdlO1xuXHRTVFJJQ1RfUkVTUE9OU0VTW2lkXT8ucmVzb2x2ZSh7aXNEZWFkbG9jazogZmFsc2UsIGhhc0xpc3RlbmVyc30pO1xuXHRyZXR1cm4gdHJ1ZTtcbn07XG5cbi8vIFdhaXQgZm9yIHRoZSBvdGhlciBwcm9jZXNzIHRvIHJlY2VpdmUgdGhlIG1lc3NhZ2UgZnJvbSBgc2VuZE1lc3NhZ2UoKWBcbmV4cG9ydCBjb25zdCB3YWl0Rm9yU3RyaWN0UmVzcG9uc2UgPSBhc3luYyAod3JhcHBlZE1lc3NhZ2UsIGFueVByb2Nlc3MsIGlzU3VicHJvY2VzcykgPT4ge1xuXHRpZiAod3JhcHBlZE1lc3NhZ2U/LnR5cGUgIT09IFJFUVVFU1RfVFlQRSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGRlZmVycmVkID0gY3JlYXRlRGVmZXJyZWQoKTtcblx0U1RSSUNUX1JFU1BPTlNFU1t3cmFwcGVkTWVzc2FnZS5pZF0gPSBkZWZlcnJlZDtcblx0Y29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuXHR0cnkge1xuXHRcdGNvbnN0IHtpc0RlYWRsb2NrLCBoYXNMaXN0ZW5lcnN9ID0gYXdhaXQgUHJvbWlzZS5yYWNlKFtcblx0XHRcdGRlZmVycmVkLFxuXHRcdFx0dGhyb3dPbkRpc2Nvbm5lY3QoYW55UHJvY2VzcywgaXNTdWJwcm9jZXNzLCBjb250cm9sbGVyKSxcblx0XHRdKTtcblxuXHRcdGlmIChpc0RlYWRsb2NrKSB7XG5cdFx0XHR0aHJvd09uU3RyaWN0RGVhZGxvY2tFcnJvcihpc1N1YnByb2Nlc3MpO1xuXHRcdH1cblxuXHRcdGlmICghaGFzTGlzdGVuZXJzKSB7XG5cdFx0XHR0aHJvd09uTWlzc2luZ1N0cmljdChpc1N1YnByb2Nlc3MpO1xuXHRcdH1cblx0fSBmaW5hbGx5IHtcblx0XHRjb250cm9sbGVyLmFib3J0KCk7XG5cdFx0ZGVsZXRlIFNUUklDVF9SRVNQT05TRVNbd3JhcHBlZE1lc3NhZ2UuaWRdO1xuXHR9XG59O1xuXG5jb25zdCBTVFJJQ1RfUkVTUE9OU0VTID0ge307XG5cbmNvbnN0IHRocm93T25EaXNjb25uZWN0ID0gYXN5bmMgKGFueVByb2Nlc3MsIGlzU3VicHJvY2Vzcywge3NpZ25hbH0pID0+IHtcblx0aW5jcmVtZW50TWF4TGlzdGVuZXJzKGFueVByb2Nlc3MsIDEsIHNpZ25hbCk7XG5cdGF3YWl0IG9uY2UoYW55UHJvY2VzcywgJ2Rpc2Nvbm5lY3QnLCB7c2lnbmFsfSk7XG5cdHRocm93T25TdHJpY3REaXNjb25uZWN0KGlzU3VicHJvY2Vzcyk7XG59O1xuXG5jb25zdCBSRVFVRVNUX1RZUEUgPSAnZXhlY2E6aXBjOnJlcXVlc3QnO1xuY29uc3QgUkVTUE9OU0VfVFlQRSA9ICdleGVjYTppcGM6cmVzcG9uc2UnO1xuIiwgImltcG9ydCB7Y3JlYXRlRGVmZXJyZWR9IGZyb20gJy4uL3V0aWxzL2RlZmVycmVkLmpzJztcbmltcG9ydCB7Z2V0RmRTcGVjaWZpY1ZhbHVlfSBmcm9tICcuLi9hcmd1bWVudHMvc3BlY2lmaWMuanMnO1xuaW1wb3J0IHtTVUJQUk9DRVNTX09QVElPTlN9IGZyb20gJy4uL2FyZ3VtZW50cy9mZC1vcHRpb25zLmpzJztcbmltcG9ydCB7dmFsaWRhdGVTdHJpY3REZWFkbG9ja30gZnJvbSAnLi9zdHJpY3QuanMnO1xuXG4vLyBXaGVuIGBzZW5kTWVzc2FnZSgpYCBpcyBvbmdvaW5nLCBhbnkgYG1lc3NhZ2VgIGJlaW5nIHJlY2VpdmVkIHdhaXRzIGJlZm9yZSBiZWluZyBlbWl0dGVkLlxuLy8gVGhpcyBhbGxvd3MgY2FsbGluZyBvbmUgb3IgbXVsdGlwbGUgYGF3YWl0IHNlbmRNZXNzYWdlKClgIGZvbGxvd2VkIGJ5IGBhd2FpdCBnZXRPbmVNZXNzYWdlKClgL2Bhd2FpdCBnZXRFYWNoTWVzc2FnZSgpYC5cbi8vIFdpdGhvdXQgcnVubmluZyBpbnRvIGEgcmFjZSBjb25kaXRpb24gd2hlbiB0aGUgb3RoZXIgcHJvY2VzcyBzZW5kcyBhIHJlc3BvbnNlIHRvbyBmYXN0LCBiZWZvcmUgdGhlIGN1cnJlbnQgcHJvY2VzcyBzZXQgdXAgYSBsaXN0ZW5lci5cbmV4cG9ydCBjb25zdCBzdGFydFNlbmRNZXNzYWdlID0gKGFueVByb2Nlc3MsIHdyYXBwZWRNZXNzYWdlLCBzdHJpY3QpID0+IHtcblx0aWYgKCFPVVRHT0lOR19NRVNTQUdFUy5oYXMoYW55UHJvY2VzcykpIHtcblx0XHRPVVRHT0lOR19NRVNTQUdFUy5zZXQoYW55UHJvY2VzcywgbmV3IFNldCgpKTtcblx0fVxuXG5cdGNvbnN0IG91dGdvaW5nTWVzc2FnZXMgPSBPVVRHT0lOR19NRVNTQUdFUy5nZXQoYW55UHJvY2Vzcyk7XG5cdGNvbnN0IG9uTWVzc2FnZVNlbnQgPSBjcmVhdGVEZWZlcnJlZCgpO1xuXHRjb25zdCBpZCA9IHN0cmljdCA/IHdyYXBwZWRNZXNzYWdlLmlkIDogdW5kZWZpbmVkO1xuXHRjb25zdCBvdXRnb2luZ01lc3NhZ2UgPSB7b25NZXNzYWdlU2VudCwgaWR9O1xuXHRvdXRnb2luZ01lc3NhZ2VzLmFkZChvdXRnb2luZ01lc3NhZ2UpO1xuXHRyZXR1cm4ge291dGdvaW5nTWVzc2FnZXMsIG91dGdvaW5nTWVzc2FnZX07XG59O1xuXG5leHBvcnQgY29uc3QgZW5kU2VuZE1lc3NhZ2UgPSAoe291dGdvaW5nTWVzc2FnZXMsIG91dGdvaW5nTWVzc2FnZX0pID0+IHtcblx0b3V0Z29pbmdNZXNzYWdlcy5kZWxldGUob3V0Z29pbmdNZXNzYWdlKTtcblx0b3V0Z29pbmdNZXNzYWdlLm9uTWVzc2FnZVNlbnQucmVzb2x2ZSgpO1xufTtcblxuLy8gQXdhaXQgd2hpbGUgYHNlbmRNZXNzYWdlKClgIGlzIG9uZ29pbmcsIHVubGVzcyB0aGVyZSBpcyBhbHJlYWR5IGEgYG1lc3NhZ2VgIGxpc3RlbmVyXG5leHBvcnQgY29uc3Qgd2FpdEZvck91dGdvaW5nTWVzc2FnZXMgPSBhc3luYyAoYW55UHJvY2VzcywgaXBjRW1pdHRlciwgd3JhcHBlZE1lc3NhZ2UpID0+IHtcblx0d2hpbGUgKCFoYXNNZXNzYWdlTGlzdGVuZXJzKGFueVByb2Nlc3MsIGlwY0VtaXR0ZXIpICYmIE9VVEdPSU5HX01FU1NBR0VTLmdldChhbnlQcm9jZXNzKT8uc2l6ZSA+IDApIHtcblx0XHRjb25zdCBvdXRnb2luZ01lc3NhZ2VzID0gWy4uLk9VVEdPSU5HX01FU1NBR0VTLmdldChhbnlQcm9jZXNzKV07XG5cdFx0dmFsaWRhdGVTdHJpY3REZWFkbG9jayhvdXRnb2luZ01lc3NhZ2VzLCB3cmFwcGVkTWVzc2FnZSk7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3Bcblx0XHRhd2FpdCBQcm9taXNlLmFsbChvdXRnb2luZ01lc3NhZ2VzLm1hcCgoe29uTWVzc2FnZVNlbnR9KSA9PiBvbk1lc3NhZ2VTZW50KSk7XG5cdH1cbn07XG5cbmNvbnN0IE9VVEdPSU5HX01FU1NBR0VTID0gbmV3IFdlYWtNYXAoKTtcblxuLy8gV2hldGhlciBhbnkgYG1lc3NhZ2VgIGxpc3RlbmVyIGlzIHNldHVwXG5leHBvcnQgY29uc3QgaGFzTWVzc2FnZUxpc3RlbmVycyA9IChhbnlQcm9jZXNzLCBpcGNFbWl0dGVyKSA9PiBpcGNFbWl0dGVyLmxpc3RlbmVyQ291bnQoJ21lc3NhZ2UnKSA+IGdldE1pbkxpc3RlbmVyQ291bnQoYW55UHJvY2Vzcyk7XG5cbi8vIFdoZW4gYGJ1ZmZlcmAgaXMgYGZhbHNlYCwgd2Ugc2V0IHVwIGEgYG1lc3NhZ2VgIGxpc3RlbmVyIHRoYXQgc2hvdWxkIGJlIGlnbm9yZWQuXG4vLyBUaGF0IGxpc3RlbmVyIGlzIG9ubHkgbWVhbnQgdG8gaW50ZXJjZXB0IGBzdHJpY3RgIGFja25vd2xlZGdlbWVudCByZXNwb25zZXMuXG5jb25zdCBnZXRNaW5MaXN0ZW5lckNvdW50ID0gYW55UHJvY2VzcyA9PiBTVUJQUk9DRVNTX09QVElPTlMuaGFzKGFueVByb2Nlc3MpXG5cdCYmICFnZXRGZFNwZWNpZmljVmFsdWUoU1VCUFJPQ0VTU19PUFRJT05TLmdldChhbnlQcm9jZXNzKS5vcHRpb25zLmJ1ZmZlciwgJ2lwYycpXG5cdD8gMVxuXHQ6IDA7XG4iLCAiaW1wb3J0IHtwcm9taXNpZnl9IGZyb20gJ25vZGU6dXRpbCc7XG5pbXBvcnQge1xuXHR2YWxpZGF0ZUlwY01ldGhvZCxcblx0aGFuZGxlRXBpcGVFcnJvcixcblx0aGFuZGxlU2VyaWFsaXphdGlvbkVycm9yLFxuXHRkaXNjb25uZWN0LFxufSBmcm9tICcuL3ZhbGlkYXRpb24uanMnO1xuaW1wb3J0IHtzdGFydFNlbmRNZXNzYWdlLCBlbmRTZW5kTWVzc2FnZX0gZnJvbSAnLi9vdXRnb2luZy5qcyc7XG5pbXBvcnQge2hhbmRsZVNlbmRTdHJpY3QsIHdhaXRGb3JTdHJpY3RSZXNwb25zZX0gZnJvbSAnLi9zdHJpY3QuanMnO1xuXG4vLyBMaWtlIGBbc3ViXXByb2Nlc3Muc2VuZCgpYCBidXQgcHJvbWlzZS1iYXNlZC5cbi8vIFdlIGRvIG5vdCBgYXdhaXQgc3VicHJvY2Vzc2AgZHVyaW5nIGAuc2VuZE1lc3NhZ2UoKWAgbm9yIGAuZ2V0T25lTWVzc2FnZSgpYCBzaW5jZSB0aG9zZSBtZXRob2RzIGFyZSB0cmFuc2llbnQuXG4vLyBVc2VycyB3b3VsZCBzdGlsbCBuZWVkIHRvIGBhd2FpdCBzdWJwcm9jZXNzYCBhZnRlciB0aGUgbWV0aG9kIGlzIGRvbmUuXG4vLyBBbHNvLCB0aGlzIHdvdWxkIHByZXZlbnQgYHVuaGFuZGxlZFJlamVjdGlvbmAgZXZlbnQgZnJvbSBiZWluZyBlbWl0dGVkLCBtYWtpbmcgaXQgc2lsZW50LlxuZXhwb3J0IGNvbnN0IHNlbmRNZXNzYWdlID0gKHthbnlQcm9jZXNzLCBjaGFubmVsLCBpc1N1YnByb2Nlc3MsIGlwY30sIG1lc3NhZ2UsIHtzdHJpY3QgPSBmYWxzZX0gPSB7fSkgPT4ge1xuXHRjb25zdCBtZXRob2ROYW1lID0gJ3NlbmRNZXNzYWdlJztcblx0dmFsaWRhdGVJcGNNZXRob2Qoe1xuXHRcdG1ldGhvZE5hbWUsXG5cdFx0aXNTdWJwcm9jZXNzLFxuXHRcdGlwYyxcblx0XHRpc0Nvbm5lY3RlZDogYW55UHJvY2Vzcy5jb25uZWN0ZWQsXG5cdH0pO1xuXG5cdHJldHVybiBzZW5kTWVzc2FnZUFzeW5jKHtcblx0XHRhbnlQcm9jZXNzLFxuXHRcdGNoYW5uZWwsXG5cdFx0bWV0aG9kTmFtZSxcblx0XHRpc1N1YnByb2Nlc3MsXG5cdFx0bWVzc2FnZSxcblx0XHRzdHJpY3QsXG5cdH0pO1xufTtcblxuY29uc3Qgc2VuZE1lc3NhZ2VBc3luYyA9IGFzeW5jICh7YW55UHJvY2VzcywgY2hhbm5lbCwgbWV0aG9kTmFtZSwgaXNTdWJwcm9jZXNzLCBtZXNzYWdlLCBzdHJpY3R9KSA9PiB7XG5cdGNvbnN0IHdyYXBwZWRNZXNzYWdlID0gaGFuZGxlU2VuZFN0cmljdCh7XG5cdFx0YW55UHJvY2Vzcyxcblx0XHRjaGFubmVsLFxuXHRcdGlzU3VicHJvY2Vzcyxcblx0XHRtZXNzYWdlLFxuXHRcdHN0cmljdCxcblx0fSk7XG5cdGNvbnN0IG91dGdvaW5nTWVzc2FnZXNTdGF0ZSA9IHN0YXJ0U2VuZE1lc3NhZ2UoYW55UHJvY2Vzcywgd3JhcHBlZE1lc3NhZ2UsIHN0cmljdCk7XG5cdHRyeSB7XG5cdFx0YXdhaXQgc2VuZE9uZU1lc3NhZ2Uoe1xuXHRcdFx0YW55UHJvY2Vzcyxcblx0XHRcdG1ldGhvZE5hbWUsXG5cdFx0XHRpc1N1YnByb2Nlc3MsXG5cdFx0XHR3cmFwcGVkTWVzc2FnZSxcblx0XHRcdG1lc3NhZ2UsXG5cdFx0fSk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0ZGlzY29ubmVjdChhbnlQcm9jZXNzKTtcblx0XHR0aHJvdyBlcnJvcjtcblx0fSBmaW5hbGx5IHtcblx0XHRlbmRTZW5kTWVzc2FnZShvdXRnb2luZ01lc3NhZ2VzU3RhdGUpO1xuXHR9XG59O1xuXG4vLyBVc2VkIGludGVybmFsbHkgYnkgYGNhbmNlbFNpZ25hbGBcbmV4cG9ydCBjb25zdCBzZW5kT25lTWVzc2FnZSA9IGFzeW5jICh7YW55UHJvY2VzcywgbWV0aG9kTmFtZSwgaXNTdWJwcm9jZXNzLCB3cmFwcGVkTWVzc2FnZSwgbWVzc2FnZX0pID0+IHtcblx0Y29uc3Qgc2VuZE1ldGhvZCA9IGdldFNlbmRNZXRob2QoYW55UHJvY2Vzcyk7XG5cblx0dHJ5IHtcblx0XHRhd2FpdCBQcm9taXNlLmFsbChbXG5cdFx0XHR3YWl0Rm9yU3RyaWN0UmVzcG9uc2Uod3JhcHBlZE1lc3NhZ2UsIGFueVByb2Nlc3MsIGlzU3VicHJvY2VzcyksXG5cdFx0XHRzZW5kTWV0aG9kKHdyYXBwZWRNZXNzYWdlKSxcblx0XHRdKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRoYW5kbGVFcGlwZUVycm9yKHtlcnJvciwgbWV0aG9kTmFtZSwgaXNTdWJwcm9jZXNzfSk7XG5cdFx0aGFuZGxlU2VyaWFsaXphdGlvbkVycm9yKHtcblx0XHRcdGVycm9yLFxuXHRcdFx0bWV0aG9kTmFtZSxcblx0XHRcdGlzU3VicHJvY2Vzcyxcblx0XHRcdG1lc3NhZ2UsXG5cdFx0fSk7XG5cdFx0dGhyb3cgZXJyb3I7XG5cdH1cbn07XG5cbi8vIFtzdWJdcHJvY2Vzcy5zZW5kKCkgcHJvbWlzaWZpZWQsIG1lbW9pemVkXG5jb25zdCBnZXRTZW5kTWV0aG9kID0gYW55UHJvY2VzcyA9PiB7XG5cdGlmIChQUk9DRVNTX1NFTkRfTUVUSE9EUy5oYXMoYW55UHJvY2VzcykpIHtcblx0XHRyZXR1cm4gUFJPQ0VTU19TRU5EX01FVEhPRFMuZ2V0KGFueVByb2Nlc3MpO1xuXHR9XG5cblx0Y29uc3Qgc2VuZE1ldGhvZCA9IHByb21pc2lmeShhbnlQcm9jZXNzLnNlbmQuYmluZChhbnlQcm9jZXNzKSk7XG5cdFBST0NFU1NfU0VORF9NRVRIT0RTLnNldChhbnlQcm9jZXNzLCBzZW5kTWV0aG9kKTtcblx0cmV0dXJuIHNlbmRNZXRob2Q7XG59O1xuXG5jb25zdCBQUk9DRVNTX1NFTkRfTUVUSE9EUyA9IG5ldyBXZWFrTWFwKCk7XG4iLCAiaW1wb3J0IHtzY2hlZHVsZXJ9IGZyb20gJ25vZGU6dGltZXJzL3Byb21pc2VzJztcbmltcG9ydCB7c2VuZE9uZU1lc3NhZ2V9IGZyb20gJy4vc2VuZC5qcyc7XG5pbXBvcnQge2dldElwY0VtaXR0ZXJ9IGZyb20gJy4vZm9yd2FyZC5qcyc7XG5pbXBvcnQge3ZhbGlkYXRlQ29ubmVjdGlvbiwgZ2V0QWJvcnREaXNjb25uZWN0RXJyb3IsIHRocm93T25NaXNzaW5nUGFyZW50fSBmcm9tICcuL3ZhbGlkYXRpb24uanMnO1xuXG4vLyBTZW5kIGFuIElQQyBtZXNzYWdlIHNvIHRoZSBzdWJwcm9jZXNzIHBlcmZvcm1zIGEgZ3JhY2VmdWwgdGVybWluYXRpb25cbmV4cG9ydCBjb25zdCBzZW5kQWJvcnQgPSAoc3VicHJvY2VzcywgbWVzc2FnZSkgPT4ge1xuXHRjb25zdCBtZXRob2ROYW1lID0gJ2NhbmNlbFNpZ25hbCc7XG5cdHZhbGlkYXRlQ29ubmVjdGlvbihtZXRob2ROYW1lLCBmYWxzZSwgc3VicHJvY2Vzcy5jb25uZWN0ZWQpO1xuXHRyZXR1cm4gc2VuZE9uZU1lc3NhZ2Uoe1xuXHRcdGFueVByb2Nlc3M6IHN1YnByb2Nlc3MsXG5cdFx0bWV0aG9kTmFtZSxcblx0XHRpc1N1YnByb2Nlc3M6IGZhbHNlLFxuXHRcdHdyYXBwZWRNZXNzYWdlOiB7dHlwZTogR1JBQ0VGVUxfQ0FOQ0VMX1RZUEUsIG1lc3NhZ2V9LFxuXHRcdG1lc3NhZ2UsXG5cdH0pO1xufTtcblxuLy8gV2hlbiB0aGUgc2lnbmFsIGlzIGJlaW5nIHVzZWQsIHN0YXJ0IGxpc3RlbmluZyBmb3IgaW5jb21pbmcgbWVzc2FnZXMuXG4vLyBVbmJ1ZmZlcmluZyBtZXNzYWdlcyB0YWtlcyBvbmUgbWljcm90YXNrIHRvIGNvbXBsZXRlLCBzbyB0aGlzIG11c3QgYmUgYXN5bmMuXG5leHBvcnQgY29uc3QgZ2V0Q2FuY2VsU2lnbmFsID0gYXN5bmMgKHthbnlQcm9jZXNzLCBjaGFubmVsLCBpc1N1YnByb2Nlc3MsIGlwY30pID0+IHtcblx0YXdhaXQgc3RhcnRJcGMoe1xuXHRcdGFueVByb2Nlc3MsXG5cdFx0Y2hhbm5lbCxcblx0XHRpc1N1YnByb2Nlc3MsXG5cdFx0aXBjLFxuXHR9KTtcblx0cmV0dXJuIGNhbmNlbENvbnRyb2xsZXIuc2lnbmFsO1xufTtcblxuY29uc3Qgc3RhcnRJcGMgPSBhc3luYyAoe2FueVByb2Nlc3MsIGNoYW5uZWwsIGlzU3VicHJvY2VzcywgaXBjfSkgPT4ge1xuXHRpZiAoY2FuY2VsTGlzdGVuaW5nKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y2FuY2VsTGlzdGVuaW5nID0gdHJ1ZTtcblxuXHRpZiAoIWlwYykge1xuXHRcdHRocm93T25NaXNzaW5nUGFyZW50KCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKGNoYW5uZWwgPT09IG51bGwpIHtcblx0XHRhYm9ydE9uRGlzY29ubmVjdCgpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGdldElwY0VtaXR0ZXIoYW55UHJvY2VzcywgY2hhbm5lbCwgaXNTdWJwcm9jZXNzKTtcblx0YXdhaXQgc2NoZWR1bGVyLnlpZWxkKCk7XG59O1xuXG5sZXQgY2FuY2VsTGlzdGVuaW5nID0gZmFsc2U7XG5cbi8vIFJlY2VwdGlvbiBvZiBJUEMgbWVzc2FnZSB0byBwZXJmb3JtIGEgZ3JhY2VmdWwgdGVybWluYXRpb25cbmV4cG9ydCBjb25zdCBoYW5kbGVBYm9ydCA9IHdyYXBwZWRNZXNzYWdlID0+IHtcblx0aWYgKHdyYXBwZWRNZXNzYWdlPy50eXBlICE9PSBHUkFDRUZVTF9DQU5DRUxfVFlQRSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGNhbmNlbENvbnRyb2xsZXIuYWJvcnQod3JhcHBlZE1lc3NhZ2UubWVzc2FnZSk7XG5cdHJldHVybiB0cnVlO1xufTtcblxuY29uc3QgR1JBQ0VGVUxfQ0FOQ0VMX1RZUEUgPSAnZXhlY2E6aXBjOmNhbmNlbCc7XG5cbi8vIFdoZW4gdGhlIGN1cnJlbnQgcHJvY2VzcyBkaXNjb25uZWN0cyBlYXJseSwgdGhlIHN1YnByb2Nlc3MgYGNhbmNlbFNpZ25hbGAgaXMgYWJvcnRlZC5cbi8vIE90aGVyd2lzZSwgdGhlIHNpZ25hbCB3b3VsZCBuZXZlciBiZSBhYmxlIHRvIGJlIGFib3J0ZWQgbGF0ZXIgb24uXG5leHBvcnQgY29uc3QgYWJvcnRPbkRpc2Nvbm5lY3QgPSAoKSA9PiB7XG5cdGNhbmNlbENvbnRyb2xsZXIuYWJvcnQoZ2V0QWJvcnREaXNjb25uZWN0RXJyb3IoKSk7XG59O1xuXG5jb25zdCBjYW5jZWxDb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuIiwgImltcG9ydCB7b25BYm9ydGVkU2lnbmFsfSBmcm9tICcuLi91dGlscy9hYm9ydC1zaWduYWwuanMnO1xuaW1wb3J0IHtzZW5kQWJvcnR9IGZyb20gJy4uL2lwYy9ncmFjZWZ1bC5qcyc7XG5pbXBvcnQge2tpbGxPblRpbWVvdXR9IGZyb20gJy4va2lsbC5qcyc7XG5cbi8vIFZhbGlkYXRlIHRoZSBgZ3JhY2VmdWxDYW5jZWxgIG9wdGlvblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlR3JhY2VmdWxDYW5jZWwgPSAoe2dyYWNlZnVsQ2FuY2VsLCBjYW5jZWxTaWduYWwsIGlwYywgc2VyaWFsaXphdGlvbn0pID0+IHtcblx0aWYgKCFncmFjZWZ1bENhbmNlbCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmIChjYW5jZWxTaWduYWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignVGhlIGBjYW5jZWxTaWduYWxgIG9wdGlvbiBtdXN0IGJlIGRlZmluZWQgd2hlbiBzZXR0aW5nIHRoZSBgZ3JhY2VmdWxDYW5jZWxgIG9wdGlvbi4nKTtcblx0fVxuXG5cdGlmICghaXBjKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgYGlwY2Agb3B0aW9uIGNhbm5vdCBiZSBmYWxzZSB3aGVuIHNldHRpbmcgdGhlIGBncmFjZWZ1bENhbmNlbGAgb3B0aW9uLicpO1xuXHR9XG5cblx0aWYgKHNlcmlhbGl6YXRpb24gPT09ICdqc29uJykge1xuXHRcdHRocm93IG5ldyBFcnJvcignVGhlIGBzZXJpYWxpemF0aW9uYCBvcHRpb24gY2Fubm90IGJlIFxcJ2pzb25cXCcgd2hlbiBzZXR0aW5nIHRoZSBgZ3JhY2VmdWxDYW5jZWxgIG9wdGlvbi4nKTtcblx0fVxufTtcblxuLy8gU2VuZCBhYm9ydCByZWFzb24gdG8gdGhlIHN1YnByb2Nlc3Mgd2hlbiBhYm9ydGluZyB0aGUgYGNhbmNlbFNpZ25hbGAgb3B0aW9uIGFuZCBgZ3JhY2VmdWxDYW5jZWxgIGlzIGB0cnVlYFxuZXhwb3J0IGNvbnN0IHRocm93T25HcmFjZWZ1bENhbmNlbCA9ICh7XG5cdHN1YnByb2Nlc3MsXG5cdGNhbmNlbFNpZ25hbCxcblx0Z3JhY2VmdWxDYW5jZWwsXG5cdGZvcmNlS2lsbEFmdGVyRGVsYXksXG5cdGNvbnRleHQsXG5cdGNvbnRyb2xsZXIsXG59KSA9PiBncmFjZWZ1bENhbmNlbFxuXHQ/IFtzZW5kT25BYm9ydCh7XG5cdFx0c3VicHJvY2Vzcyxcblx0XHRjYW5jZWxTaWduYWwsXG5cdFx0Zm9yY2VLaWxsQWZ0ZXJEZWxheSxcblx0XHRjb250ZXh0LFxuXHRcdGNvbnRyb2xsZXIsXG5cdH0pXVxuXHQ6IFtdO1xuXG5jb25zdCBzZW5kT25BYm9ydCA9IGFzeW5jICh7c3VicHJvY2VzcywgY2FuY2VsU2lnbmFsLCBmb3JjZUtpbGxBZnRlckRlbGF5LCBjb250ZXh0LCBjb250cm9sbGVyOiB7c2lnbmFsfX0pID0+IHtcblx0YXdhaXQgb25BYm9ydGVkU2lnbmFsKGNhbmNlbFNpZ25hbCwgc2lnbmFsKTtcblx0Y29uc3QgcmVhc29uID0gZ2V0UmVhc29uKGNhbmNlbFNpZ25hbCk7XG5cdGF3YWl0IHNlbmRBYm9ydChzdWJwcm9jZXNzLCByZWFzb24pO1xuXHRraWxsT25UaW1lb3V0KHtcblx0XHRraWxsOiBzdWJwcm9jZXNzLmtpbGwsXG5cdFx0Zm9yY2VLaWxsQWZ0ZXJEZWxheSxcblx0XHRjb250ZXh0LFxuXHRcdGNvbnRyb2xsZXJTaWduYWw6IHNpZ25hbCxcblx0fSk7XG5cdGNvbnRleHQudGVybWluYXRpb25SZWFzb24gPz89ICdncmFjZWZ1bENhbmNlbCc7XG5cdHRocm93IGNhbmNlbFNpZ25hbC5yZWFzb247XG59O1xuXG4vLyBUaGUgZGVmYXVsdCBgcmVhc29uYCBpcyBhIERPTUV4Y2VwdGlvbiwgd2hpY2ggaXMgbm90IHNlcmlhbGl6YWJsZSB3aXRoIFY4XG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2lzc3Vlcy81MzIyNVxuY29uc3QgZ2V0UmVhc29uID0gKHtyZWFzb259KSA9PiB7XG5cdGlmICghKHJlYXNvbiBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbikpIHtcblx0XHRyZXR1cm4gcmVhc29uO1xuXHR9XG5cblx0Y29uc3QgZXJyb3IgPSBuZXcgRXJyb3IocmVhc29uLm1lc3NhZ2UpO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXJyb3IsICdzdGFjaycsIHtcblx0XHR2YWx1ZTogcmVhc29uLnN0YWNrLFxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHR3cml0YWJsZTogdHJ1ZSxcblx0fSk7XG5cdHJldHVybiBlcnJvcjtcbn07XG4iLCAiaW1wb3J0IHtzZXRUaW1lb3V0fSBmcm9tICdub2RlOnRpbWVycy9wcm9taXNlcyc7XG5pbXBvcnQge0Rpc2NhcmRlZEVycm9yfSBmcm9tICcuLi9yZXR1cm4vZmluYWwtZXJyb3IuanMnO1xuXG4vLyBWYWxpZGF0ZSBgdGltZW91dGAgb3B0aW9uXG5leHBvcnQgY29uc3QgdmFsaWRhdGVUaW1lb3V0ID0gKHt0aW1lb3V0fSkgPT4ge1xuXHRpZiAodGltZW91dCAhPT0gdW5kZWZpbmVkICYmICghTnVtYmVyLmlzRmluaXRlKHRpbWVvdXQpIHx8IHRpbWVvdXQgPCAwKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIHRoZSBcXGB0aW1lb3V0XFxgIG9wdGlvbiB0byBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyLCBnb3QgXFxgJHt0aW1lb3V0fVxcYCAoJHt0eXBlb2YgdGltZW91dH0pYCk7XG5cdH1cbn07XG5cbi8vIEZhaWxzIHdoZW4gdGhlIGB0aW1lb3V0YCBvcHRpb24gaXMgZXhjZWVkZWRcbmV4cG9ydCBjb25zdCB0aHJvd09uVGltZW91dCA9IChzdWJwcm9jZXNzLCB0aW1lb3V0LCBjb250ZXh0LCBjb250cm9sbGVyKSA9PiB0aW1lb3V0ID09PSAwIHx8IHRpbWVvdXQgPT09IHVuZGVmaW5lZFxuXHQ/IFtdXG5cdDogW2tpbGxBZnRlclRpbWVvdXQoc3VicHJvY2VzcywgdGltZW91dCwgY29udGV4dCwgY29udHJvbGxlcildO1xuXG5jb25zdCBraWxsQWZ0ZXJUaW1lb3V0ID0gYXN5bmMgKHN1YnByb2Nlc3MsIHRpbWVvdXQsIGNvbnRleHQsIHtzaWduYWx9KSA9PiB7XG5cdGF3YWl0IHNldFRpbWVvdXQodGltZW91dCwgdW5kZWZpbmVkLCB7c2lnbmFsfSk7XG5cdGNvbnRleHQudGVybWluYXRpb25SZWFzb24gPz89ICd0aW1lb3V0Jztcblx0c3VicHJvY2Vzcy5raWxsKCk7XG5cdHRocm93IG5ldyBEaXNjYXJkZWRFcnJvcigpO1xufTtcbiIsICJpbXBvcnQge2V4ZWNQYXRoLCBleGVjQXJndn0gZnJvbSAnbm9kZTpwcm9jZXNzJztcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XG5pbXBvcnQge3NhZmVOb3JtYWxpemVGaWxlVXJsfSBmcm9tICcuLi9hcmd1bWVudHMvZmlsZS11cmwuanMnO1xuXG4vLyBgZXhlY2FOb2RlKClgIGlzIGEgc2hvcnRjdXQgZm9yIGBleGVjYSguLi4sIHtub2RlOiB0cnVlfSlgXG5leHBvcnQgY29uc3QgbWFwTm9kZSA9ICh7b3B0aW9uc30pID0+IHtcblx0aWYgKG9wdGlvbnMubm9kZSA9PT0gZmFsc2UpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJub2RlXCIgb3B0aW9uIGNhbm5vdCBiZSBmYWxzZSB3aXRoIGBleGVjYU5vZGUoKWAuJyk7XG5cdH1cblxuXHRyZXR1cm4ge29wdGlvbnM6IHsuLi5vcHRpb25zLCBub2RlOiB0cnVlfX07XG59O1xuXG4vLyBBcHBsaWVzIHRoZSBgbm9kZTogdHJ1ZWAgb3B0aW9uLCBhbmQgdGhlIHJlbGF0ZWQgYG5vZGVQYXRoYC9gbm9kZU9wdGlvbnNgIG9wdGlvbnMuXG4vLyBNb2RpZmllcyB0aGUgZmlsZSBjb21tYW5kcy9hcmd1bWVudHMgdG8gZW5zdXJlIHRoZSBzYW1lIE5vZGUgYmluYXJ5IGFuZCBmbGFncyBhcmUgcmUtdXNlZC5cbi8vIEFsc28gYWRkcyBgaXBjOiB0cnVlYCBhbmQgYHNoZWxsOiBmYWxzZWAuXG5leHBvcnQgY29uc3QgaGFuZGxlTm9kZU9wdGlvbiA9IChmaWxlLCBjb21tYW5kQXJndW1lbnRzLCB7XG5cdG5vZGU6IHNob3VsZEhhbmRsZU5vZGUgPSBmYWxzZSxcblx0bm9kZVBhdGggPSBleGVjUGF0aCxcblx0bm9kZU9wdGlvbnMgPSBleGVjQXJndi5maWx0ZXIobm9kZU9wdGlvbiA9PiAhbm9kZU9wdGlvbi5zdGFydHNXaXRoKCctLWluc3BlY3QnKSksXG5cdGN3ZCxcblx0ZXhlY1BhdGg6IGZvcm1lck5vZGVQYXRoLFxuXHQuLi5vcHRpb25zXG59KSA9PiB7XG5cdGlmIChmb3JtZXJOb2RlUGF0aCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwiZXhlY1BhdGhcIiBvcHRpb24gaGFzIGJlZW4gcmVtb3ZlZC4gUGxlYXNlIHVzZSB0aGUgXCJub2RlUGF0aFwiIG9wdGlvbiBpbnN0ZWFkLicpO1xuXHR9XG5cblx0Y29uc3Qgbm9ybWFsaXplZE5vZGVQYXRoID0gc2FmZU5vcm1hbGl6ZUZpbGVVcmwobm9kZVBhdGgsICdUaGUgXCJub2RlUGF0aFwiIG9wdGlvbicpO1xuXHRjb25zdCByZXNvbHZlZE5vZGVQYXRoID0gcGF0aC5yZXNvbHZlKGN3ZCwgbm9ybWFsaXplZE5vZGVQYXRoKTtcblx0Y29uc3QgbmV3T3B0aW9ucyA9IHtcblx0XHQuLi5vcHRpb25zLFxuXHRcdG5vZGVQYXRoOiByZXNvbHZlZE5vZGVQYXRoLFxuXHRcdG5vZGU6IHNob3VsZEhhbmRsZU5vZGUsXG5cdFx0Y3dkLFxuXHR9O1xuXG5cdGlmICghc2hvdWxkSGFuZGxlTm9kZSkge1xuXHRcdHJldHVybiBbZmlsZSwgY29tbWFuZEFyZ3VtZW50cywgbmV3T3B0aW9uc107XG5cdH1cblxuXHRpZiAocGF0aC5iYXNlbmFtZShmaWxlLCAnLmV4ZScpID09PSAnbm9kZScpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdXaGVuIHRoZSBcIm5vZGVcIiBvcHRpb24gaXMgdHJ1ZSwgdGhlIGZpcnN0IGFyZ3VtZW50IGRvZXMgbm90IG5lZWQgdG8gYmUgXCJub2RlXCIuJyk7XG5cdH1cblxuXHRyZXR1cm4gW1xuXHRcdHJlc29sdmVkTm9kZVBhdGgsXG5cdFx0Wy4uLm5vZGVPcHRpb25zLCBmaWxlLCAuLi5jb21tYW5kQXJndW1lbnRzXSxcblx0XHR7aXBjOiB0cnVlLCAuLi5uZXdPcHRpb25zLCBzaGVsbDogZmFsc2V9LFxuXHRdO1xufTtcbiIsICJpbXBvcnQge3NlcmlhbGl6ZX0gZnJvbSAnbm9kZTp2OCc7XG5cbi8vIFZhbGlkYXRlIHRoZSBgaXBjSW5wdXRgIG9wdGlvblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlSXBjSW5wdXRPcHRpb24gPSAoe2lwY0lucHV0LCBpcGMsIHNlcmlhbGl6YXRpb259KSA9PiB7XG5cdGlmIChpcGNJbnB1dCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKCFpcGMpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBgaXBjSW5wdXRgIG9wdGlvbiBjYW5ub3QgYmUgc2V0IHVubGVzcyB0aGUgYGlwY2Agb3B0aW9uIGlzIGB0cnVlYC4nKTtcblx0fVxuXG5cdHZhbGlkYXRlSXBjSW5wdXRbc2VyaWFsaXphdGlvbl0oaXBjSW5wdXQpO1xufTtcblxuY29uc3QgdmFsaWRhdGVBZHZhbmNlZElucHV0ID0gaXBjSW5wdXQgPT4ge1xuXHR0cnkge1xuXHRcdHNlcmlhbGl6ZShpcGNJbnB1dCk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgYGlwY0lucHV0YCBvcHRpb24gaXMgbm90IHNlcmlhbGl6YWJsZSB3aXRoIGEgc3RydWN0dXJlZCBjbG9uZS4nLCB7Y2F1c2U6IGVycm9yfSk7XG5cdH1cbn07XG5cbmNvbnN0IHZhbGlkYXRlSnNvbklucHV0ID0gaXBjSW5wdXQgPT4ge1xuXHR0cnkge1xuXHRcdEpTT04uc3RyaW5naWZ5KGlwY0lucHV0KTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBgaXBjSW5wdXRgIG9wdGlvbiBpcyBub3Qgc2VyaWFsaXphYmxlIHdpdGggSlNPTi4nLCB7Y2F1c2U6IGVycm9yfSk7XG5cdH1cbn07XG5cbmNvbnN0IHZhbGlkYXRlSXBjSW5wdXQgPSB7XG5cdGFkdmFuY2VkOiB2YWxpZGF0ZUFkdmFuY2VkSW5wdXQsXG5cdGpzb246IHZhbGlkYXRlSnNvbklucHV0LFxufTtcblxuLy8gV2hlbiB0aGUgYGlwY0lucHV0YCBvcHRpb24gaXMgc2V0LCBpdCBpcyBzZW50IGFzIGFuIGluaXRpYWwgSVBDIG1lc3NhZ2UgdG8gdGhlIHN1YnByb2Nlc3NcbmV4cG9ydCBjb25zdCBzZW5kSXBjSW5wdXQgPSBhc3luYyAoc3VicHJvY2VzcywgaXBjSW5wdXQpID0+IHtcblx0aWYgKGlwY0lucHV0ID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRhd2FpdCBzdWJwcm9jZXNzLnNlbmRNZXNzYWdlKGlwY0lucHV0KTtcbn07XG4iLCAiLy8gVmFsaWRhdGUgYGVuY29kaW5nYCBvcHRpb25cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUVuY29kaW5nID0gKHtlbmNvZGluZ30pID0+IHtcblx0aWYgKEVOQ09ESU5HUy5oYXMoZW5jb2RpbmcpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgY29ycmVjdEVuY29kaW5nID0gZ2V0Q29ycmVjdEVuY29kaW5nKGVuY29kaW5nKTtcblx0aWYgKGNvcnJlY3RFbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBvcHRpb24gXFxgZW5jb2Rpbmc6ICR7c2VyaWFsaXplRW5jb2RpbmcoZW5jb2RpbmcpfVxcYC5cblBsZWFzZSByZW5hbWUgaXQgdG8gJHtzZXJpYWxpemVFbmNvZGluZyhjb3JyZWN0RW5jb2RpbmcpfS5gKTtcblx0fVxuXG5cdGNvbnN0IGNvcnJlY3RFbmNvZGluZ3MgPSBbLi4uRU5DT0RJTkdTXS5tYXAoY29ycmVjdEVuY29kaW5nID0+IHNlcmlhbGl6ZUVuY29kaW5nKGNvcnJlY3RFbmNvZGluZykpLmpvaW4oJywgJyk7XG5cdHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgb3B0aW9uIFxcYGVuY29kaW5nOiAke3NlcmlhbGl6ZUVuY29kaW5nKGVuY29kaW5nKX1cXGAuXG5QbGVhc2UgcmVuYW1lIGl0IHRvIG9uZSBvZjogJHtjb3JyZWN0RW5jb2RpbmdzfS5gKTtcbn07XG5cbmNvbnN0IFRFWFRfRU5DT0RJTkdTID0gbmV3IFNldChbJ3V0ZjgnLCAndXRmMTZsZSddKTtcbmV4cG9ydCBjb25zdCBCSU5BUllfRU5DT0RJTkdTID0gbmV3IFNldChbJ2J1ZmZlcicsICdoZXgnLCAnYmFzZTY0JywgJ2Jhc2U2NHVybCcsICdsYXRpbjEnLCAnYXNjaWknXSk7XG5jb25zdCBFTkNPRElOR1MgPSBuZXcgU2V0KFsuLi5URVhUX0VOQ09ESU5HUywgLi4uQklOQVJZX0VOQ09ESU5HU10pO1xuXG5jb25zdCBnZXRDb3JyZWN0RW5jb2RpbmcgPSBlbmNvZGluZyA9PiB7XG5cdGlmIChlbmNvZGluZyA9PT0gbnVsbCkge1xuXHRcdHJldHVybiAnYnVmZmVyJztcblx0fVxuXG5cdGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgbG93ZXJFbmNvZGluZyA9IGVuY29kaW5nLnRvTG93ZXJDYXNlKCk7XG5cdGlmIChsb3dlckVuY29kaW5nIGluIEVOQ09ESU5HX0FMSUFTRVMpIHtcblx0XHRyZXR1cm4gRU5DT0RJTkdfQUxJQVNFU1tsb3dlckVuY29kaW5nXTtcblx0fVxuXG5cdGlmIChFTkNPRElOR1MuaGFzKGxvd2VyRW5jb2RpbmcpKSB7XG5cdFx0cmV0dXJuIGxvd2VyRW5jb2Rpbmc7XG5cdH1cbn07XG5cbmNvbnN0IEVOQ09ESU5HX0FMSUFTRVMgPSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3RleHQtZW5jb2RpbmctaWRlbnRpZmllci1jYXNlXG5cdCd1dGYtOCc6ICd1dGY4Jyxcblx0J3V0Zi0xNmxlJzogJ3V0ZjE2bGUnLFxuXHQndWNzLTInOiAndXRmMTZsZScsXG5cdHVjczI6ICd1dGYxNmxlJyxcblx0YmluYXJ5OiAnbGF0aW4xJyxcbn07XG5cbmNvbnN0IHNlcmlhbGl6ZUVuY29kaW5nID0gZW5jb2RpbmcgPT4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyA/IGBcIiR7ZW5jb2Rpbmd9XCJgIDogU3RyaW5nKGVuY29kaW5nKTtcbiIsICJpbXBvcnQge3N0YXRTeW5jfSBmcm9tICdub2RlOmZzJztcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnO1xuaW1wb3J0IHtzYWZlTm9ybWFsaXplRmlsZVVybH0gZnJvbSAnLi9maWxlLXVybC5qcyc7XG5cbi8vIE5vcm1hbGl6ZSBgY3dkYCBvcHRpb25cbmV4cG9ydCBjb25zdCBub3JtYWxpemVDd2QgPSAoY3dkID0gZ2V0RGVmYXVsdEN3ZCgpKSA9PiB7XG5cdGNvbnN0IGN3ZFN0cmluZyA9IHNhZmVOb3JtYWxpemVGaWxlVXJsKGN3ZCwgJ1RoZSBcImN3ZFwiIG9wdGlvbicpO1xuXHRyZXR1cm4gcGF0aC5yZXNvbHZlKGN3ZFN0cmluZyk7XG59O1xuXG5jb25zdCBnZXREZWZhdWx0Q3dkID0gKCkgPT4ge1xuXHR0cnkge1xuXHRcdHJldHVybiBwcm9jZXNzLmN3ZCgpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGVycm9yLm1lc3NhZ2UgPSBgVGhlIGN1cnJlbnQgZGlyZWN0b3J5IGRvZXMgbm90IGV4aXN0LlxcbiR7ZXJyb3IubWVzc2FnZX1gO1xuXHRcdHRocm93IGVycm9yO1xuXHR9XG59O1xuXG4vLyBXaGVuIGBjd2RgIG9wdGlvbiBoYXMgYW4gaW52YWxpZCB2YWx1ZSwgcHJvdmlkZSB3aXRoIGEgYmV0dGVyIGVycm9yIG1lc3NhZ2VcbmV4cG9ydCBjb25zdCBmaXhDd2RFcnJvciA9IChvcmlnaW5hbE1lc3NhZ2UsIGN3ZCkgPT4ge1xuXHRpZiAoY3dkID09PSBnZXREZWZhdWx0Q3dkKCkpIHtcblx0XHRyZXR1cm4gb3JpZ2luYWxNZXNzYWdlO1xuXHR9XG5cblx0bGV0IGN3ZFN0YXQ7XG5cdHRyeSB7XG5cdFx0Y3dkU3RhdCA9IHN0YXRTeW5jKGN3ZCk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0cmV0dXJuIGBUaGUgXCJjd2RcIiBvcHRpb24gaXMgaW52YWxpZDogJHtjd2R9LlxcbiR7ZXJyb3IubWVzc2FnZX1cXG4ke29yaWdpbmFsTWVzc2FnZX1gO1xuXHR9XG5cblx0aWYgKCFjd2RTdGF0LmlzRGlyZWN0b3J5KCkpIHtcblx0XHRyZXR1cm4gYFRoZSBcImN3ZFwiIG9wdGlvbiBpcyBub3QgYSBkaXJlY3Rvcnk6ICR7Y3dkfS5cXG4ke29yaWdpbmFsTWVzc2FnZX1gO1xuXHR9XG5cblx0cmV0dXJuIG9yaWdpbmFsTWVzc2FnZTtcbn07XG4iLCAiaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2Vzcyc7XG5pbXBvcnQgY3Jvc3NTcGF3biBmcm9tICdjcm9zcy1zcGF3bic7XG5pbXBvcnQge25wbVJ1blBhdGhFbnZ9IGZyb20gJ25wbS1ydW4tcGF0aCc7XG5pbXBvcnQge25vcm1hbGl6ZUZvcmNlS2lsbEFmdGVyRGVsYXl9IGZyb20gJy4uL3Rlcm1pbmF0ZS9raWxsLmpzJztcbmltcG9ydCB7bm9ybWFsaXplS2lsbFNpZ25hbH0gZnJvbSAnLi4vdGVybWluYXRlL3NpZ25hbC5qcyc7XG5pbXBvcnQge3ZhbGlkYXRlQ2FuY2VsU2lnbmFsfSBmcm9tICcuLi90ZXJtaW5hdGUvY2FuY2VsLmpzJztcbmltcG9ydCB7dmFsaWRhdGVHcmFjZWZ1bENhbmNlbH0gZnJvbSAnLi4vdGVybWluYXRlL2dyYWNlZnVsLmpzJztcbmltcG9ydCB7dmFsaWRhdGVUaW1lb3V0fSBmcm9tICcuLi90ZXJtaW5hdGUvdGltZW91dC5qcyc7XG5pbXBvcnQge2hhbmRsZU5vZGVPcHRpb259IGZyb20gJy4uL21ldGhvZHMvbm9kZS5qcyc7XG5pbXBvcnQge3ZhbGlkYXRlSXBjSW5wdXRPcHRpb259IGZyb20gJy4uL2lwYy9pcGMtaW5wdXQuanMnO1xuaW1wb3J0IHt2YWxpZGF0ZUVuY29kaW5nLCBCSU5BUllfRU5DT0RJTkdTfSBmcm9tICcuL2VuY29kaW5nLW9wdGlvbi5qcyc7XG5pbXBvcnQge25vcm1hbGl6ZUN3ZH0gZnJvbSAnLi9jd2QuanMnO1xuaW1wb3J0IHtub3JtYWxpemVGaWxlVXJsfSBmcm9tICcuL2ZpbGUtdXJsLmpzJztcbmltcG9ydCB7bm9ybWFsaXplRmRTcGVjaWZpY09wdGlvbnN9IGZyb20gJy4vc3BlY2lmaWMuanMnO1xuXG4vLyBOb3JtYWxpemUgdGhlIG9wdGlvbnMgb2JqZWN0LCBhbmQgc29tZXRpbWVzIGFsc28gdGhlIGZpbGUgcGF0aHMgYW5kIGFyZ3VtZW50cy5cbi8vIEFwcGxpZXMgZGVmYXVsdCB2YWx1ZXMsIHZhbGlkYXRlIGFsbG93ZWQgb3B0aW9ucywgbm9ybWFsaXplIHRoZW0uXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplT3B0aW9ucyA9IChmaWxlUGF0aCwgcmF3QXJndW1lbnRzLCByYXdPcHRpb25zKSA9PiB7XG5cdHJhd09wdGlvbnMuY3dkID0gbm9ybWFsaXplQ3dkKHJhd09wdGlvbnMuY3dkKTtcblx0Y29uc3QgW3Byb2Nlc3NlZEZpbGUsIHByb2Nlc3NlZEFyZ3VtZW50cywgcHJvY2Vzc2VkT3B0aW9uc10gPSBoYW5kbGVOb2RlT3B0aW9uKGZpbGVQYXRoLCByYXdBcmd1bWVudHMsIHJhd09wdGlvbnMpO1xuXG5cdGNvbnN0IHtjb21tYW5kOiBmaWxlLCBhcmdzOiBjb21tYW5kQXJndW1lbnRzLCBvcHRpb25zOiBpbml0aWFsT3B0aW9uc30gPSBjcm9zc1NwYXduLl9wYXJzZShwcm9jZXNzZWRGaWxlLCBwcm9jZXNzZWRBcmd1bWVudHMsIHByb2Nlc3NlZE9wdGlvbnMpO1xuXG5cdGNvbnN0IGZkT3B0aW9ucyA9IG5vcm1hbGl6ZUZkU3BlY2lmaWNPcHRpb25zKGluaXRpYWxPcHRpb25zKTtcblx0Y29uc3Qgb3B0aW9ucyA9IGFkZERlZmF1bHRPcHRpb25zKGZkT3B0aW9ucyk7XG5cdHZhbGlkYXRlVGltZW91dChvcHRpb25zKTtcblx0dmFsaWRhdGVFbmNvZGluZyhvcHRpb25zKTtcblx0dmFsaWRhdGVJcGNJbnB1dE9wdGlvbihvcHRpb25zKTtcblx0dmFsaWRhdGVDYW5jZWxTaWduYWwob3B0aW9ucyk7XG5cdHZhbGlkYXRlR3JhY2VmdWxDYW5jZWwob3B0aW9ucyk7XG5cdG9wdGlvbnMuc2hlbGwgPSBub3JtYWxpemVGaWxlVXJsKG9wdGlvbnMuc2hlbGwpO1xuXHRvcHRpb25zLmVudiA9IGdldEVudihvcHRpb25zKTtcblx0b3B0aW9ucy5raWxsU2lnbmFsID0gbm9ybWFsaXplS2lsbFNpZ25hbChvcHRpb25zLmtpbGxTaWduYWwpO1xuXHRvcHRpb25zLmZvcmNlS2lsbEFmdGVyRGVsYXkgPSBub3JtYWxpemVGb3JjZUtpbGxBZnRlckRlbGF5KG9wdGlvbnMuZm9yY2VLaWxsQWZ0ZXJEZWxheSk7XG5cdG9wdGlvbnMubGluZXMgPSBvcHRpb25zLmxpbmVzLm1hcCgobGluZXMsIGZkTnVtYmVyKSA9PiBsaW5lcyAmJiAhQklOQVJZX0VOQ09ESU5HUy5oYXMob3B0aW9ucy5lbmNvZGluZykgJiYgb3B0aW9ucy5idWZmZXJbZmROdW1iZXJdKTtcblxuXHRpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJyAmJiBwYXRoLmJhc2VuYW1lKGZpbGUsICcuZXhlJykgPT09ICdjbWQnKSB7XG5cdFx0Ly8gIzExNlxuXHRcdGNvbW1hbmRBcmd1bWVudHMudW5zaGlmdCgnL3EnKTtcblx0fVxuXG5cdHJldHVybiB7ZmlsZSwgY29tbWFuZEFyZ3VtZW50cywgb3B0aW9uc307XG59O1xuXG5jb25zdCBhZGREZWZhdWx0T3B0aW9ucyA9ICh7XG5cdGV4dGVuZEVudiA9IHRydWUsXG5cdHByZWZlckxvY2FsID0gZmFsc2UsXG5cdGN3ZCxcblx0bG9jYWxEaXI6IGxvY2FsRGlyZWN0b3J5ID0gY3dkLFxuXHRlbmNvZGluZyA9ICd1dGY4Jyxcblx0cmVqZWN0ID0gdHJ1ZSxcblx0Y2xlYW51cCA9IHRydWUsXG5cdGFsbCA9IGZhbHNlLFxuXHR3aW5kb3dzSGlkZSA9IHRydWUsXG5cdGtpbGxTaWduYWwgPSAnU0lHVEVSTScsXG5cdGZvcmNlS2lsbEFmdGVyRGVsYXkgPSB0cnVlLFxuXHRncmFjZWZ1bENhbmNlbCA9IGZhbHNlLFxuXHRpcGNJbnB1dCxcblx0aXBjID0gaXBjSW5wdXQgIT09IHVuZGVmaW5lZCB8fCBncmFjZWZ1bENhbmNlbCxcblx0c2VyaWFsaXphdGlvbiA9ICdhZHZhbmNlZCcsXG5cdC4uLm9wdGlvbnNcbn0pID0+ICh7XG5cdC4uLm9wdGlvbnMsXG5cdGV4dGVuZEVudixcblx0cHJlZmVyTG9jYWwsXG5cdGN3ZCxcblx0bG9jYWxEaXJlY3RvcnksXG5cdGVuY29kaW5nLFxuXHRyZWplY3QsXG5cdGNsZWFudXAsXG5cdGFsbCxcblx0d2luZG93c0hpZGUsXG5cdGtpbGxTaWduYWwsXG5cdGZvcmNlS2lsbEFmdGVyRGVsYXksXG5cdGdyYWNlZnVsQ2FuY2VsLFxuXHRpcGNJbnB1dCxcblx0aXBjLFxuXHRzZXJpYWxpemF0aW9uLFxufSk7XG5cbmNvbnN0IGdldEVudiA9ICh7ZW52OiBlbnZPcHRpb24sIGV4dGVuZEVudiwgcHJlZmVyTG9jYWwsIG5vZGUsIGxvY2FsRGlyZWN0b3J5LCBub2RlUGF0aH0pID0+IHtcblx0Y29uc3QgZW52ID0gZXh0ZW5kRW52ID8gey4uLnByb2Nlc3MuZW52LCAuLi5lbnZPcHRpb259IDogZW52T3B0aW9uO1xuXG5cdGlmIChwcmVmZXJMb2NhbCB8fCBub2RlKSB7XG5cdFx0cmV0dXJuIG5wbVJ1blBhdGhFbnYoe1xuXHRcdFx0ZW52LFxuXHRcdFx0Y3dkOiBsb2NhbERpcmVjdG9yeSxcblx0XHRcdGV4ZWNQYXRoOiBub2RlUGF0aCxcblx0XHRcdHByZWZlckxvY2FsLFxuXHRcdFx0YWRkRXhlY1BhdGg6IG5vZGUsXG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gZW52O1xufTtcbiIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdHJpcEZpbmFsTmV3bGluZShpbnB1dCkge1xuXHRpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBzdHJpcEZpbmFsTmV3bGluZVN0cmluZyhpbnB1dCk7XG5cdH1cblxuXHRpZiAoIShBcnJheUJ1ZmZlci5pc1ZpZXcoaW5wdXQpICYmIGlucHV0LkJZVEVTX1BFUl9FTEVNRU5UID09PSAxKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignSW5wdXQgbXVzdCBiZSBhIHN0cmluZyBvciBhIFVpbnQ4QXJyYXknKTtcblx0fVxuXG5cdHJldHVybiBzdHJpcEZpbmFsTmV3bGluZUJpbmFyeShpbnB1dCk7XG59XG5cbmNvbnN0IHN0cmlwRmluYWxOZXdsaW5lU3RyaW5nID0gaW5wdXQgPT5cblx0aW5wdXQuYXQoLTEpID09PSBMRlxuXHRcdD8gaW5wdXQuc2xpY2UoMCwgaW5wdXQuYXQoLTIpID09PSBDUiA/IC0yIDogLTEpXG5cdFx0OiBpbnB1dDtcblxuY29uc3Qgc3RyaXBGaW5hbE5ld2xpbmVCaW5hcnkgPSBpbnB1dCA9PlxuXHRpbnB1dC5hdCgtMSkgPT09IExGX0JJTkFSWVxuXHRcdD8gaW5wdXQuc3ViYXJyYXkoMCwgaW5wdXQuYXQoLTIpID09PSBDUl9CSU5BUlkgPyAtMiA6IC0xKVxuXHRcdDogaW5wdXQ7XG5cbmNvbnN0IExGID0gJ1xcbic7XG5jb25zdCBMRl9CSU5BUlkgPSBMRi5jb2RlUG9pbnRBdCgwKTtcbmNvbnN0IENSID0gJ1xccic7XG5jb25zdCBDUl9CSU5BUlkgPSBDUi5jb2RlUG9pbnRBdCgwKTtcbiIsICJleHBvcnQgZnVuY3Rpb24gaXNTdHJlYW0oc3RyZWFtLCB7Y2hlY2tPcGVuID0gdHJ1ZX0gPSB7fSkge1xuXHRyZXR1cm4gc3RyZWFtICE9PSBudWxsXG5cdFx0JiYgdHlwZW9mIHN0cmVhbSA9PT0gJ29iamVjdCdcblx0XHQmJiAoc3RyZWFtLndyaXRhYmxlIHx8IHN0cmVhbS5yZWFkYWJsZSB8fCAhY2hlY2tPcGVuIHx8IChzdHJlYW0ud3JpdGFibGUgPT09IHVuZGVmaW5lZCAmJiBzdHJlYW0ucmVhZGFibGUgPT09IHVuZGVmaW5lZCkpXG5cdFx0JiYgdHlwZW9mIHN0cmVhbS5waXBlID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNXcml0YWJsZVN0cmVhbShzdHJlYW0sIHtjaGVja09wZW4gPSB0cnVlfSA9IHt9KSB7XG5cdHJldHVybiBpc1N0cmVhbShzdHJlYW0sIHtjaGVja09wZW59KVxuXHRcdCYmIChzdHJlYW0ud3JpdGFibGUgfHwgIWNoZWNrT3Blbilcblx0XHQmJiB0eXBlb2Ygc3RyZWFtLndyaXRlID09PSAnZnVuY3Rpb24nXG5cdFx0JiYgdHlwZW9mIHN0cmVhbS5lbmQgPT09ICdmdW5jdGlvbidcblx0XHQmJiB0eXBlb2Ygc3RyZWFtLndyaXRhYmxlID09PSAnYm9vbGVhbidcblx0XHQmJiB0eXBlb2Ygc3RyZWFtLndyaXRhYmxlT2JqZWN0TW9kZSA9PT0gJ2Jvb2xlYW4nXG5cdFx0JiYgdHlwZW9mIHN0cmVhbS5kZXN0cm95ID09PSAnZnVuY3Rpb24nXG5cdFx0JiYgdHlwZW9mIHN0cmVhbS5kZXN0cm95ZWQgPT09ICdib29sZWFuJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVhZGFibGVTdHJlYW0oc3RyZWFtLCB7Y2hlY2tPcGVuID0gdHJ1ZX0gPSB7fSkge1xuXHRyZXR1cm4gaXNTdHJlYW0oc3RyZWFtLCB7Y2hlY2tPcGVufSlcblx0XHQmJiAoc3RyZWFtLnJlYWRhYmxlIHx8ICFjaGVja09wZW4pXG5cdFx0JiYgdHlwZW9mIHN0cmVhbS5yZWFkID09PSAnZnVuY3Rpb24nXG5cdFx0JiYgdHlwZW9mIHN0cmVhbS5yZWFkYWJsZSA9PT0gJ2Jvb2xlYW4nXG5cdFx0JiYgdHlwZW9mIHN0cmVhbS5yZWFkYWJsZU9iamVjdE1vZGUgPT09ICdib29sZWFuJ1xuXHRcdCYmIHR5cGVvZiBzdHJlYW0uZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdCYmIHR5cGVvZiBzdHJlYW0uZGVzdHJveWVkID09PSAnYm9vbGVhbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0R1cGxleFN0cmVhbShzdHJlYW0sIG9wdGlvbnMpIHtcblx0cmV0dXJuIGlzV3JpdGFibGVTdHJlYW0oc3RyZWFtLCBvcHRpb25zKVxuXHRcdCYmIGlzUmVhZGFibGVTdHJlYW0oc3RyZWFtLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVHJhbnNmb3JtU3RyZWFtKHN0cmVhbSwgb3B0aW9ucykge1xuXHRyZXR1cm4gaXNEdXBsZXhTdHJlYW0oc3RyZWFtLCBvcHRpb25zKVxuXHRcdCYmIHR5cGVvZiBzdHJlYW0uX3RyYW5zZm9ybSA9PT0gJ2Z1bmN0aW9uJztcbn1cbiIsICJjb25zdCBhID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKFxuICBPYmplY3QuZ2V0UHJvdG90eXBlT2YoXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBhc3luYyBmdW5jdGlvbiogKCkge1xuICAgIH1cbiAgKS5wcm90b3R5cGVcbik7XG5jbGFzcyBjIHtcbiAgI3Q7XG4gICNuO1xuICAjciA9ICExO1xuICAjZSA9IHZvaWQgMDtcbiAgY29uc3RydWN0b3IoZSwgdCkge1xuICAgIHRoaXMuI3QgPSBlLCB0aGlzLiNuID0gdDtcbiAgfVxuICBuZXh0KCkge1xuICAgIGNvbnN0IGUgPSAoKSA9PiB0aGlzLiNzKCk7XG4gICAgcmV0dXJuIHRoaXMuI2UgPSB0aGlzLiNlID8gdGhpcy4jZS50aGVuKGUsIGUpIDogZSgpLCB0aGlzLiNlO1xuICB9XG4gIHJldHVybihlKSB7XG4gICAgY29uc3QgdCA9ICgpID0+IHRoaXMuI2koZSk7XG4gICAgcmV0dXJuIHRoaXMuI2UgPyB0aGlzLiNlLnRoZW4odCwgdCkgOiB0KCk7XG4gIH1cbiAgYXN5bmMgI3MoKSB7XG4gICAgaWYgKHRoaXMuI3IpXG4gICAgICByZXR1cm4ge1xuICAgICAgICBkb25lOiAhMCxcbiAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgfTtcbiAgICBsZXQgZTtcbiAgICB0cnkge1xuICAgICAgZSA9IGF3YWl0IHRoaXMuI3QucmVhZCgpO1xuICAgIH0gY2F0Y2ggKHQpIHtcbiAgICAgIHRocm93IHRoaXMuI2UgPSB2b2lkIDAsIHRoaXMuI3IgPSAhMCwgdGhpcy4jdC5yZWxlYXNlTG9jaygpLCB0O1xuICAgIH1cbiAgICByZXR1cm4gZS5kb25lICYmICh0aGlzLiNlID0gdm9pZCAwLCB0aGlzLiNyID0gITAsIHRoaXMuI3QucmVsZWFzZUxvY2soKSksIGU7XG4gIH1cbiAgYXN5bmMgI2koZSkge1xuICAgIGlmICh0aGlzLiNyKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZG9uZTogITAsXG4gICAgICAgIHZhbHVlOiBlXG4gICAgICB9O1xuICAgIGlmICh0aGlzLiNyID0gITAsICF0aGlzLiNuKSB7XG4gICAgICBjb25zdCB0ID0gdGhpcy4jdC5jYW5jZWwoZSk7XG4gICAgICByZXR1cm4gdGhpcy4jdC5yZWxlYXNlTG9jaygpLCBhd2FpdCB0LCB7XG4gICAgICAgIGRvbmU6ICEwLFxuICAgICAgICB2YWx1ZTogZVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuI3QucmVsZWFzZUxvY2soKSwge1xuICAgICAgZG9uZTogITAsXG4gICAgICB2YWx1ZTogZVxuICAgIH07XG4gIH1cbn1cbmNvbnN0IG4gPSBTeW1ib2woKTtcbmZ1bmN0aW9uIGkoKSB7XG4gIHJldHVybiB0aGlzW25dLm5leHQoKTtcbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShpLCBcIm5hbWVcIiwgeyB2YWx1ZTogXCJuZXh0XCIgfSk7XG5mdW5jdGlvbiBvKHIpIHtcbiAgcmV0dXJuIHRoaXNbbl0ucmV0dXJuKHIpO1xufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwibmFtZVwiLCB7IHZhbHVlOiBcInJldHVyblwiIH0pO1xuY29uc3QgdSA9IE9iamVjdC5jcmVhdGUoYSwge1xuICBuZXh0OiB7XG4gICAgZW51bWVyYWJsZTogITAsXG4gICAgY29uZmlndXJhYmxlOiAhMCxcbiAgICB3cml0YWJsZTogITAsXG4gICAgdmFsdWU6IGlcbiAgfSxcbiAgcmV0dXJuOiB7XG4gICAgZW51bWVyYWJsZTogITAsXG4gICAgY29uZmlndXJhYmxlOiAhMCxcbiAgICB3cml0YWJsZTogITAsXG4gICAgdmFsdWU6IG9cbiAgfVxufSk7XG5mdW5jdGlvbiBoKHsgcHJldmVudENhbmNlbDogciA9ICExIH0gPSB7fSkge1xuICBjb25zdCBlID0gdGhpcy5nZXRSZWFkZXIoKSwgdCA9IG5ldyBjKFxuICAgIGUsXG4gICAgclxuICApLCBzID0gT2JqZWN0LmNyZWF0ZSh1KTtcbiAgcmV0dXJuIHNbbl0gPSB0LCBzO1xufVxuZXhwb3J0IHtcbiAgaCBhcyBhc3luY0l0ZXJhdG9yXG59O1xuIiwgImZ1bmN0aW9uIGMobikge1xuICBjb25zdCB0ID0gYShuKTtcbiAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbShcbiAgICB7XG4gICAgICBhc3luYyBwdWxsKGUpIHtcbiAgICAgICAgY29uc3QgeyB2YWx1ZTogciwgZG9uZTogbyB9ID0gYXdhaXQgdC5uZXh0KCk7XG4gICAgICAgIG8gPyBlLmNsb3NlKCkgOiBlLmVucXVldWUocik7XG4gICAgICB9LFxuICAgICAgYXN5bmMgY2FuY2VsKGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0LnJldHVybiA9PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIGF3YWl0IHQucmV0dXJuKGUpICE9IFwib2JqZWN0XCIpXG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInJldHVybigpIGZ1bGZpbGxzIHdpdGggYSBub24tb2JqZWN0LlwiKTtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgICB9XG4gICAgfSxcbiAgICBuZXcgQ291bnRRdWV1aW5nU3RyYXRlZ3koe1xuICAgICAgaGlnaFdhdGVyTWFyazogMFxuICAgIH0pXG4gICk7XG59XG5mdW5jdGlvbiBhKG4pIHtcbiAgbGV0IHQgPSBuW1N5bWJvbC5hc3luY0l0ZXJhdG9yXT8uYmluZChuKTtcbiAgaWYgKHQgPT09IHZvaWQgMCkge1xuICAgIGNvbnN0IHIgPSBuW1N5bWJvbC5pdGVyYXRvcl0oKSwgbyA9IHtcbiAgICAgIFtTeW1ib2wuaXRlcmF0b3JdOiAoKSA9PiByXG4gICAgfTtcbiAgICB0ID0gYXN5bmMgZnVuY3Rpb24qICgpIHtcbiAgICAgIHJldHVybiB5aWVsZCogbztcbiAgICB9O1xuICB9XG4gIHJldHVybiB0KCk7XG59XG5leHBvcnQge1xuICBjIGFzIGZyb21BbnlJdGVyYWJsZVxufTtcbiIsICJpbXBvcnQgeyBhc3luY0l0ZXJhdG9yIGFzIGUgfSBmcm9tIFwiLi9hc3luY0l0ZXJhdG9yLmpzXCI7XG5pbXBvcnQgeyBmcm9tQW55SXRlcmFibGUgYXMgYSB9IGZyb20gXCIuL2Zyb21BbnlJdGVyYWJsZS5qc1wiO1xuZXhwb3J0IHtcbiAgZSBhcyBhc3luY0l0ZXJhdG9yLFxuICBhIGFzIGZyb21BbnlJdGVyYWJsZVxufTtcbiIsICJpbXBvcnQge2lzUmVhZGFibGVTdHJlYW19IGZyb20gJ2lzLXN0cmVhbSc7XG5pbXBvcnQge2FzeW5jSXRlcmF0b3J9IGZyb20gJ0BzZWMtYW50L3JlYWRhYmxlLXN0cmVhbS9wb255ZmlsbCc7XG5cbmV4cG9ydCBjb25zdCBnZXRBc3luY0l0ZXJhYmxlID0gc3RyZWFtID0+IHtcblx0aWYgKGlzUmVhZGFibGVTdHJlYW0oc3RyZWFtLCB7Y2hlY2tPcGVuOiBmYWxzZX0pICYmIG5vZGVJbXBvcnRzLm9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gZ2V0U3RyZWFtSXRlcmFibGUoc3RyZWFtKTtcblx0fVxuXG5cdGlmICh0eXBlb2Ygc3RyZWFtPy5bU3ltYm9sLmFzeW5jSXRlcmF0b3JdID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIHN0cmVhbTtcblx0fVxuXG5cdC8vIGBSZWFkYWJsZVN0cmVhbVtTeW1ib2wuYXN5bmNJdGVyYXRvcl1gIHN1cHBvcnQgaXMgbWlzc2luZyBpbiBtdWx0aXBsZSBicm93c2Vycywgc28gd2UgcG9ueWZpbGwgaXRcblx0aWYgKHRvU3RyaW5nLmNhbGwoc3RyZWFtKSA9PT0gJ1tvYmplY3QgUmVhZGFibGVTdHJlYW1dJykge1xuXHRcdHJldHVybiBhc3luY0l0ZXJhdG9yLmNhbGwoc3RyZWFtKTtcblx0fVxuXG5cdHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgUmVhZGFibGUsIGEgUmVhZGFibGVTdHJlYW0sIG9yIGFuIGFzeW5jIGl0ZXJhYmxlLicpO1xufTtcblxuY29uc3Qge3RvU3RyaW5nfSA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8vIFRoZSBkZWZhdWx0IGl0ZXJhYmxlIGZvciBOb2RlLmpzIHN0cmVhbXMgZG9lcyBub3QgYWxsb3cgZm9yIG11bHRpcGxlIHJlYWRlcnMgYXQgb25jZSwgc28gd2UgcmUtaW1wbGVtZW50IGl0XG5jb25zdCBnZXRTdHJlYW1JdGVyYWJsZSA9IGFzeW5jIGZ1bmN0aW9uICogKHN0cmVhbSkge1xuXHRjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXHRjb25zdCBzdGF0ZSA9IHt9O1xuXHRoYW5kbGVTdHJlYW1FbmQoc3RyZWFtLCBjb250cm9sbGVyLCBzdGF0ZSk7XG5cblx0dHJ5IHtcblx0XHRmb3IgYXdhaXQgKGNvbnN0IFtjaHVua10gb2Ygbm9kZUltcG9ydHMub24oc3RyZWFtLCAnZGF0YScsIHtzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsfSkpIHtcblx0XHRcdHlpZWxkIGNodW5rO1xuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHQvLyBTdHJlYW0gZmFpbHVyZSwgZm9yIGV4YW1wbGUgZHVlIHRvIGBzdHJlYW0uZGVzdHJveShlcnJvcilgXG5cdFx0aWYgKHN0YXRlLmVycm9yICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRocm93IHN0YXRlLmVycm9yO1xuXHRcdC8vIGBlcnJvcmAgZXZlbnQgZGlyZWN0bHkgZW1pdHRlZCBvbiBzdHJlYW1cblx0XHR9IGVsc2UgaWYgKCFjb250cm9sbGVyLnNpZ25hbC5hYm9ydGVkKSB7XG5cdFx0XHR0aHJvdyBlcnJvcjtcblx0XHQvLyBPdGhlcndpc2UsIHN0cmVhbSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5XG5cdFx0fVxuXHRcdC8vIFRoZSBgZmluYWxseWAgYmxvY2sgYWxzbyBydW5zIHdoZW4gdGhlIGNhbGxlciB0aHJvd3MsIGZvciBleGFtcGxlIGR1ZSB0byB0aGUgYG1heEJ1ZmZlcmAgb3B0aW9uXG5cdH0gZmluYWxseSB7XG5cdFx0c3RyZWFtLmRlc3Ryb3koKTtcblx0fVxufTtcblxuY29uc3QgaGFuZGxlU3RyZWFtRW5kID0gYXN5bmMgKHN0cmVhbSwgY29udHJvbGxlciwgc3RhdGUpID0+IHtcblx0dHJ5IHtcblx0XHRhd2FpdCBub2RlSW1wb3J0cy5maW5pc2hlZChzdHJlYW0sIHtcblx0XHRcdGNsZWFudXA6IHRydWUsXG5cdFx0XHRyZWFkYWJsZTogdHJ1ZSxcblx0XHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHRcdGVycm9yOiBmYWxzZSxcblx0XHR9KTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRzdGF0ZS5lcnJvciA9IGVycm9yO1xuXHR9IGZpbmFsbHkge1xuXHRcdGNvbnRyb2xsZXIuYWJvcnQoKTtcblx0fVxufTtcblxuLy8gTG9hZGVkIGJ5IHRoZSBOb2RlIGVudHJ5cG9pbnQsIGJ1dCBub3QgYnkgdGhlIGJyb3dzZXIgb25lLlxuLy8gVGhpcyBwcmV2ZW50cyB1c2luZyBkeW5hbWljIGltcG9ydHMuXG5leHBvcnQgY29uc3Qgbm9kZUltcG9ydHMgPSB7fTtcbiIsICJpbXBvcnQge2dldEFzeW5jSXRlcmFibGV9IGZyb20gJy4vc3RyZWFtLmpzJztcblxuZXhwb3J0IGNvbnN0IGdldFN0cmVhbUNvbnRlbnRzID0gYXN5bmMgKHN0cmVhbSwge2luaXQsIGNvbnZlcnRDaHVuaywgZ2V0U2l6ZSwgdHJ1bmNhdGVDaHVuaywgYWRkQ2h1bmssIGdldEZpbmFsQ2h1bmssIGZpbmFsaXplfSwge21heEJ1ZmZlciA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWX0gPSB7fSkgPT4ge1xuXHRjb25zdCBhc3luY0l0ZXJhYmxlID0gZ2V0QXN5bmNJdGVyYWJsZShzdHJlYW0pO1xuXG5cdGNvbnN0IHN0YXRlID0gaW5pdCgpO1xuXHRzdGF0ZS5sZW5ndGggPSAwO1xuXG5cdHRyeSB7XG5cdFx0Zm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiBhc3luY0l0ZXJhYmxlKSB7XG5cdFx0XHRjb25zdCBjaHVua1R5cGUgPSBnZXRDaHVua1R5cGUoY2h1bmspO1xuXHRcdFx0Y29uc3QgY29udmVydGVkQ2h1bmsgPSBjb252ZXJ0Q2h1bmtbY2h1bmtUeXBlXShjaHVuaywgc3RhdGUpO1xuXHRcdFx0YXBwZW5kQ2h1bmsoe1xuXHRcdFx0XHRjb252ZXJ0ZWRDaHVuayxcblx0XHRcdFx0c3RhdGUsXG5cdFx0XHRcdGdldFNpemUsXG5cdFx0XHRcdHRydW5jYXRlQ2h1bmssXG5cdFx0XHRcdGFkZENodW5rLFxuXHRcdFx0XHRtYXhCdWZmZXIsXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRhcHBlbmRGaW5hbENodW5rKHtcblx0XHRcdHN0YXRlLFxuXHRcdFx0Y29udmVydENodW5rLFxuXHRcdFx0Z2V0U2l6ZSxcblx0XHRcdHRydW5jYXRlQ2h1bmssXG5cdFx0XHRhZGRDaHVuayxcblx0XHRcdGdldEZpbmFsQ2h1bmssXG5cdFx0XHRtYXhCdWZmZXIsXG5cdFx0fSk7XG5cdFx0cmV0dXJuIGZpbmFsaXplKHN0YXRlKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRjb25zdCBub3JtYWxpemVkRXJyb3IgPSB0eXBlb2YgZXJyb3IgPT09ICdvYmplY3QnICYmIGVycm9yICE9PSBudWxsID8gZXJyb3IgOiBuZXcgRXJyb3IoZXJyb3IpO1xuXHRcdG5vcm1hbGl6ZWRFcnJvci5idWZmZXJlZERhdGEgPSBmaW5hbGl6ZShzdGF0ZSk7XG5cdFx0dGhyb3cgbm9ybWFsaXplZEVycm9yO1xuXHR9XG59O1xuXG5jb25zdCBhcHBlbmRGaW5hbENodW5rID0gKHtzdGF0ZSwgZ2V0U2l6ZSwgdHJ1bmNhdGVDaHVuaywgYWRkQ2h1bmssIGdldEZpbmFsQ2h1bmssIG1heEJ1ZmZlcn0pID0+IHtcblx0Y29uc3QgY29udmVydGVkQ2h1bmsgPSBnZXRGaW5hbENodW5rKHN0YXRlKTtcblx0aWYgKGNvbnZlcnRlZENodW5rICE9PSB1bmRlZmluZWQpIHtcblx0XHRhcHBlbmRDaHVuayh7XG5cdFx0XHRjb252ZXJ0ZWRDaHVuayxcblx0XHRcdHN0YXRlLFxuXHRcdFx0Z2V0U2l6ZSxcblx0XHRcdHRydW5jYXRlQ2h1bmssXG5cdFx0XHRhZGRDaHVuayxcblx0XHRcdG1heEJ1ZmZlcixcblx0XHR9KTtcblx0fVxufTtcblxuY29uc3QgYXBwZW5kQ2h1bmsgPSAoe2NvbnZlcnRlZENodW5rLCBzdGF0ZSwgZ2V0U2l6ZSwgdHJ1bmNhdGVDaHVuaywgYWRkQ2h1bmssIG1heEJ1ZmZlcn0pID0+IHtcblx0Y29uc3QgY2h1bmtTaXplID0gZ2V0U2l6ZShjb252ZXJ0ZWRDaHVuayk7XG5cdGNvbnN0IG5ld0xlbmd0aCA9IHN0YXRlLmxlbmd0aCArIGNodW5rU2l6ZTtcblxuXHRpZiAobmV3TGVuZ3RoIDw9IG1heEJ1ZmZlcikge1xuXHRcdGFkZE5ld0NodW5rKGNvbnZlcnRlZENodW5rLCBzdGF0ZSwgYWRkQ2h1bmssIG5ld0xlbmd0aCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgdHJ1bmNhdGVkQ2h1bmsgPSB0cnVuY2F0ZUNodW5rKGNvbnZlcnRlZENodW5rLCBtYXhCdWZmZXIgLSBzdGF0ZS5sZW5ndGgpO1xuXG5cdGlmICh0cnVuY2F0ZWRDaHVuayAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0YWRkTmV3Q2h1bmsodHJ1bmNhdGVkQ2h1bmssIHN0YXRlLCBhZGRDaHVuaywgbWF4QnVmZmVyKTtcblx0fVxuXG5cdHRocm93IG5ldyBNYXhCdWZmZXJFcnJvcigpO1xufTtcblxuY29uc3QgYWRkTmV3Q2h1bmsgPSAoY29udmVydGVkQ2h1bmssIHN0YXRlLCBhZGRDaHVuaywgbmV3TGVuZ3RoKSA9PiB7XG5cdHN0YXRlLmNvbnRlbnRzID0gYWRkQ2h1bmsoY29udmVydGVkQ2h1bmssIHN0YXRlLCBuZXdMZW5ndGgpO1xuXHRzdGF0ZS5sZW5ndGggPSBuZXdMZW5ndGg7XG59O1xuXG5jb25zdCBnZXRDaHVua1R5cGUgPSBjaHVuayA9PiB7XG5cdGNvbnN0IHR5cGVPZkNodW5rID0gdHlwZW9mIGNodW5rO1xuXG5cdGlmICh0eXBlT2ZDaHVuayA9PT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gJ3N0cmluZyc7XG5cdH1cblxuXHRpZiAodHlwZU9mQ2h1bmsgIT09ICdvYmplY3QnIHx8IGNodW5rID09PSBudWxsKSB7XG5cdFx0cmV0dXJuICdvdGhlcnMnO1xuXHR9XG5cblx0aWYgKGdsb2JhbFRoaXMuQnVmZmVyPy5pc0J1ZmZlcihjaHVuaykpIHtcblx0XHRyZXR1cm4gJ2J1ZmZlcic7XG5cdH1cblxuXHRjb25zdCBwcm90b3R5cGVOYW1lID0gb2JqZWN0VG9TdHJpbmcuY2FsbChjaHVuayk7XG5cblx0aWYgKHByb3RvdHlwZU5hbWUgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXScpIHtcblx0XHRyZXR1cm4gJ2FycmF5QnVmZmVyJztcblx0fVxuXG5cdGlmIChwcm90b3R5cGVOYW1lID09PSAnW29iamVjdCBEYXRhVmlld10nKSB7XG5cdFx0cmV0dXJuICdkYXRhVmlldyc7XG5cdH1cblxuXHRpZiAoXG5cdFx0TnVtYmVyLmlzSW50ZWdlcihjaHVuay5ieXRlTGVuZ3RoKVxuXHRcdCYmIE51bWJlci5pc0ludGVnZXIoY2h1bmsuYnl0ZU9mZnNldClcblx0XHQmJiBvYmplY3RUb1N0cmluZy5jYWxsKGNodW5rLmJ1ZmZlcikgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSdcblx0KSB7XG5cdFx0cmV0dXJuICd0eXBlZEFycmF5Jztcblx0fVxuXG5cdHJldHVybiAnb3RoZXJzJztcbn07XG5cbmNvbnN0IHt0b1N0cmluZzogb2JqZWN0VG9TdHJpbmd9ID0gT2JqZWN0LnByb3RvdHlwZTtcblxuZXhwb3J0IGNsYXNzIE1heEJ1ZmZlckVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXHRuYW1lID0gJ01heEJ1ZmZlckVycm9yJztcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcignbWF4QnVmZmVyIGV4Y2VlZGVkJyk7XG5cdH1cbn1cbiIsICJleHBvcnQgY29uc3QgaWRlbnRpdHkgPSB2YWx1ZSA9PiB2YWx1ZTtcblxuZXhwb3J0IGNvbnN0IG5vb3AgPSAoKSA9PiB1bmRlZmluZWQ7XG5cbmV4cG9ydCBjb25zdCBnZXRDb250ZW50c1Byb3BlcnR5ID0gKHtjb250ZW50c30pID0+IGNvbnRlbnRzO1xuXG5leHBvcnQgY29uc3QgdGhyb3dPYmplY3RTdHJlYW0gPSBjaHVuayA9PiB7XG5cdHRocm93IG5ldyBFcnJvcihgU3RyZWFtcyBpbiBvYmplY3QgbW9kZSBhcmUgbm90IHN1cHBvcnRlZDogJHtTdHJpbmcoY2h1bmspfWApO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldExlbmd0aFByb3BlcnR5ID0gY29udmVydGVkQ2h1bmsgPT4gY29udmVydGVkQ2h1bmsubGVuZ3RoO1xuIiwgImltcG9ydCB7Z2V0U3RyZWFtQ29udGVudHN9IGZyb20gJy4vY29udGVudHMuanMnO1xuaW1wb3J0IHtpZGVudGl0eSwgbm9vcCwgZ2V0Q29udGVudHNQcm9wZXJ0eX0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdHJlYW1Bc0FycmF5KHN0cmVhbSwgb3B0aW9ucykge1xuXHRyZXR1cm4gZ2V0U3RyZWFtQ29udGVudHMoc3RyZWFtLCBhcnJheU1ldGhvZHMsIG9wdGlvbnMpO1xufVxuXG5jb25zdCBpbml0QXJyYXkgPSAoKSA9PiAoe2NvbnRlbnRzOiBbXX0pO1xuXG5jb25zdCBpbmNyZW1lbnQgPSAoKSA9PiAxO1xuXG5jb25zdCBhZGRBcnJheUNodW5rID0gKGNvbnZlcnRlZENodW5rLCB7Y29udGVudHN9KSA9PiB7XG5cdGNvbnRlbnRzLnB1c2goY29udmVydGVkQ2h1bmspO1xuXHRyZXR1cm4gY29udGVudHM7XG59O1xuXG5jb25zdCBhcnJheU1ldGhvZHMgPSB7XG5cdGluaXQ6IGluaXRBcnJheSxcblx0Y29udmVydENodW5rOiB7XG5cdFx0c3RyaW5nOiBpZGVudGl0eSxcblx0XHRidWZmZXI6IGlkZW50aXR5LFxuXHRcdGFycmF5QnVmZmVyOiBpZGVudGl0eSxcblx0XHRkYXRhVmlldzogaWRlbnRpdHksXG5cdFx0dHlwZWRBcnJheTogaWRlbnRpdHksXG5cdFx0b3RoZXJzOiBpZGVudGl0eSxcblx0fSxcblx0Z2V0U2l6ZTogaW5jcmVtZW50LFxuXHR0cnVuY2F0ZUNodW5rOiBub29wLFxuXHRhZGRDaHVuazogYWRkQXJyYXlDaHVuayxcblx0Z2V0RmluYWxDaHVuazogbm9vcCxcblx0ZmluYWxpemU6IGdldENvbnRlbnRzUHJvcGVydHksXG59O1xuIiwgImltcG9ydCB7Z2V0U3RyZWFtQ29udGVudHN9IGZyb20gJy4vY29udGVudHMuanMnO1xuaW1wb3J0IHtub29wLCB0aHJvd09iamVjdFN0cmVhbSwgZ2V0TGVuZ3RoUHJvcGVydHl9IGZyb20gJy4vdXRpbHMuanMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RyZWFtQXNBcnJheUJ1ZmZlcihzdHJlYW0sIG9wdGlvbnMpIHtcblx0cmV0dXJuIGdldFN0cmVhbUNvbnRlbnRzKHN0cmVhbSwgYXJyYXlCdWZmZXJNZXRob2RzLCBvcHRpb25zKTtcbn1cblxuY29uc3QgaW5pdEFycmF5QnVmZmVyID0gKCkgPT4gKHtjb250ZW50czogbmV3IEFycmF5QnVmZmVyKDApfSk7XG5cbmNvbnN0IHVzZVRleHRFbmNvZGVyID0gY2h1bmsgPT4gdGV4dEVuY29kZXIuZW5jb2RlKGNodW5rKTtcbmNvbnN0IHRleHRFbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKCk7XG5cbmNvbnN0IHVzZVVpbnQ4QXJyYXkgPSBjaHVuayA9PiBuZXcgVWludDhBcnJheShjaHVuayk7XG5cbmNvbnN0IHVzZVVpbnQ4QXJyYXlXaXRoT2Zmc2V0ID0gY2h1bmsgPT4gbmV3IFVpbnQ4QXJyYXkoY2h1bmsuYnVmZmVyLCBjaHVuay5ieXRlT2Zmc2V0LCBjaHVuay5ieXRlTGVuZ3RoKTtcblxuY29uc3QgdHJ1bmNhdGVBcnJheUJ1ZmZlckNodW5rID0gKGNvbnZlcnRlZENodW5rLCBjaHVua1NpemUpID0+IGNvbnZlcnRlZENodW5rLnNsaWNlKDAsIGNodW5rU2l6ZSk7XG5cbi8vIGBjb250ZW50c2AgaXMgYW4gaW5jcmVhc2luZ2x5IGdyb3dpbmcgYFVpbnQ4QXJyYXlgLlxuY29uc3QgYWRkQXJyYXlCdWZmZXJDaHVuayA9IChjb252ZXJ0ZWRDaHVuaywge2NvbnRlbnRzLCBsZW5ndGg6IHByZXZpb3VzTGVuZ3RofSwgbGVuZ3RoKSA9PiB7XG5cdGNvbnN0IG5ld0NvbnRlbnRzID0gaGFzQXJyYXlCdWZmZXJSZXNpemUoKSA/IHJlc2l6ZUFycmF5QnVmZmVyKGNvbnRlbnRzLCBsZW5ndGgpIDogcmVzaXplQXJyYXlCdWZmZXJTbG93KGNvbnRlbnRzLCBsZW5ndGgpO1xuXHRuZXcgVWludDhBcnJheShuZXdDb250ZW50cykuc2V0KGNvbnZlcnRlZENodW5rLCBwcmV2aW91c0xlbmd0aCk7XG5cdHJldHVybiBuZXdDb250ZW50cztcbn07XG5cbi8vIFdpdGhvdXQgYEFycmF5QnVmZmVyLnJlc2l6ZSgpYCwgYGNvbnRlbnRzYCBzaXplIGlzIGFsd2F5cyBhIHBvd2VyIG9mIDIuXG4vLyBUaGlzIG1lYW5zIGl0cyBsYXN0IGJ5dGVzIGFyZSB6ZXJvZXMgKG5vdCBzdHJlYW0gZGF0YSksIHdoaWNoIG5lZWQgdG8gYmVcbi8vIHRyaW1tZWQgYXQgdGhlIGVuZCB3aXRoIGBBcnJheUJ1ZmZlci5zbGljZSgpYC5cbmNvbnN0IHJlc2l6ZUFycmF5QnVmZmVyU2xvdyA9IChjb250ZW50cywgbGVuZ3RoKSA9PiB7XG5cdGlmIChsZW5ndGggPD0gY29udGVudHMuYnl0ZUxlbmd0aCkge1xuXHRcdHJldHVybiBjb250ZW50cztcblx0fVxuXG5cdGNvbnN0IGFycmF5QnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGdldE5ld0NvbnRlbnRzTGVuZ3RoKGxlbmd0aCkpO1xuXHRuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcikuc2V0KG5ldyBVaW50OEFycmF5KGNvbnRlbnRzKSwgMCk7XG5cdHJldHVybiBhcnJheUJ1ZmZlcjtcbn07XG5cbi8vIFdpdGggYEFycmF5QnVmZmVyLnJlc2l6ZSgpYCwgYGNvbnRlbnRzYCBzaXplIG1hdGNoZXMgZXhhY3RseSB0aGUgc2l6ZSBvZlxuLy8gdGhlIHN0cmVhbSBkYXRhLiBJdCBkb2VzIG5vdCBpbmNsdWRlIGV4dHJhbmVvdXMgemVyb2VzIHRvIHRyaW0gYXQgdGhlIGVuZC5cbi8vIFRoZSB1bmRlcmx5aW5nIGBBcnJheUJ1ZmZlcmAgZG9lcyBhbGxvY2F0ZSBhIG51bWJlciBvZiBieXRlcyB0aGF0IGlzIGEgcG93ZXJcbi8vIG9mIDIsIGJ1dCB0aG9zZSBieXRlcyBhcmUgb25seSB2aXNpYmxlIGFmdGVyIGNhbGxpbmcgYEFycmF5QnVmZmVyLnJlc2l6ZSgpYC5cbmNvbnN0IHJlc2l6ZUFycmF5QnVmZmVyID0gKGNvbnRlbnRzLCBsZW5ndGgpID0+IHtcblx0aWYgKGxlbmd0aCA8PSBjb250ZW50cy5tYXhCeXRlTGVuZ3RoKSB7XG5cdFx0Y29udGVudHMucmVzaXplKGxlbmd0aCk7XG5cdFx0cmV0dXJuIGNvbnRlbnRzO1xuXHR9XG5cblx0Y29uc3QgYXJyYXlCdWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIobGVuZ3RoLCB7bWF4Qnl0ZUxlbmd0aDogZ2V0TmV3Q29udGVudHNMZW5ndGgobGVuZ3RoKX0pO1xuXHRuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcikuc2V0KG5ldyBVaW50OEFycmF5KGNvbnRlbnRzKSwgMCk7XG5cdHJldHVybiBhcnJheUJ1ZmZlcjtcbn07XG5cbi8vIFJldHJpZXZlIHRoZSBjbG9zZXN0IGBsZW5ndGhgIHRoYXQgaXMgYm90aCA+PSBhbmQgYSBwb3dlciBvZiAyXG5jb25zdCBnZXROZXdDb250ZW50c0xlbmd0aCA9IGxlbmd0aCA9PiBTQ0FMRV9GQUNUT1IgKiogTWF0aC5jZWlsKE1hdGgubG9nKGxlbmd0aCkgLyBNYXRoLmxvZyhTQ0FMRV9GQUNUT1IpKTtcblxuY29uc3QgU0NBTEVfRkFDVE9SID0gMjtcblxuY29uc3QgZmluYWxpemVBcnJheUJ1ZmZlciA9ICh7Y29udGVudHMsIGxlbmd0aH0pID0+IGhhc0FycmF5QnVmZmVyUmVzaXplKCkgPyBjb250ZW50cyA6IGNvbnRlbnRzLnNsaWNlKDAsIGxlbmd0aCk7XG5cbi8vIGBBcnJheUJ1ZmZlci5zbGljZSgpYCBpcyBzbG93LiBXaGVuIGBBcnJheUJ1ZmZlci5yZXNpemUoKWAgaXMgYXZhaWxhYmxlXG4vLyAoTm9kZSA+PTIwLjAuMCwgU2FmYXJpID49MTYuNCBhbmQgQ2hyb21lKSwgd2UgY2FuIHVzZSBpdCBpbnN0ZWFkLlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXdhcm5pbmctY29tbWVudHNcbi8vIFRPRE86IHJlbW92ZSBhZnRlciBkcm9wcGluZyBzdXBwb3J0IGZvciBOb2RlIDIwLlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXdhcm5pbmctY29tbWVudHNcbi8vIFRPRE86IHVzZSBgQXJyYXlCdWZmZXIudHJhbnNmZXJUb0ZpeGVkTGVuZ3RoKClgIGluc3RlYWQgb25jZSBpdCBpcyBhdmFpbGFibGVcbmNvbnN0IGhhc0FycmF5QnVmZmVyUmVzaXplID0gKCkgPT4gJ3Jlc2l6ZScgaW4gQXJyYXlCdWZmZXIucHJvdG90eXBlO1xuXG5jb25zdCBhcnJheUJ1ZmZlck1ldGhvZHMgPSB7XG5cdGluaXQ6IGluaXRBcnJheUJ1ZmZlcixcblx0Y29udmVydENodW5rOiB7XG5cdFx0c3RyaW5nOiB1c2VUZXh0RW5jb2Rlcixcblx0XHRidWZmZXI6IHVzZVVpbnQ4QXJyYXksXG5cdFx0YXJyYXlCdWZmZXI6IHVzZVVpbnQ4QXJyYXksXG5cdFx0ZGF0YVZpZXc6IHVzZVVpbnQ4QXJyYXlXaXRoT2Zmc2V0LFxuXHRcdHR5cGVkQXJyYXk6IHVzZVVpbnQ4QXJyYXlXaXRoT2Zmc2V0LFxuXHRcdG90aGVyczogdGhyb3dPYmplY3RTdHJlYW0sXG5cdH0sXG5cdGdldFNpemU6IGdldExlbmd0aFByb3BlcnR5LFxuXHR0cnVuY2F0ZUNodW5rOiB0cnVuY2F0ZUFycmF5QnVmZmVyQ2h1bmssXG5cdGFkZENodW5rOiBhZGRBcnJheUJ1ZmZlckNodW5rLFxuXHRnZXRGaW5hbENodW5rOiBub29wLFxuXHRmaW5hbGl6ZTogZmluYWxpemVBcnJheUJ1ZmZlcixcbn07XG4iLCAiaW1wb3J0IHtnZXRTdHJlYW1Db250ZW50c30gZnJvbSAnLi9jb250ZW50cy5qcyc7XG5pbXBvcnQge1xuXHRpZGVudGl0eSxcblx0Z2V0Q29udGVudHNQcm9wZXJ0eSxcblx0dGhyb3dPYmplY3RTdHJlYW0sXG5cdGdldExlbmd0aFByb3BlcnR5LFxufSBmcm9tICcuL3V0aWxzLmpzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0cmVhbUFzU3RyaW5nKHN0cmVhbSwgb3B0aW9ucykge1xuXHRyZXR1cm4gZ2V0U3RyZWFtQ29udGVudHMoc3RyZWFtLCBzdHJpbmdNZXRob2RzLCBvcHRpb25zKTtcbn1cblxuY29uc3QgaW5pdFN0cmluZyA9ICgpID0+ICh7Y29udGVudHM6ICcnLCB0ZXh0RGVjb2RlcjogbmV3IFRleHREZWNvZGVyKCl9KTtcblxuY29uc3QgdXNlVGV4dERlY29kZXIgPSAoY2h1bmssIHt0ZXh0RGVjb2Rlcn0pID0+IHRleHREZWNvZGVyLmRlY29kZShjaHVuaywge3N0cmVhbTogdHJ1ZX0pO1xuXG5jb25zdCBhZGRTdHJpbmdDaHVuayA9IChjb252ZXJ0ZWRDaHVuaywge2NvbnRlbnRzfSkgPT4gY29udGVudHMgKyBjb252ZXJ0ZWRDaHVuaztcblxuY29uc3QgdHJ1bmNhdGVTdHJpbmdDaHVuayA9IChjb252ZXJ0ZWRDaHVuaywgY2h1bmtTaXplKSA9PiBjb252ZXJ0ZWRDaHVuay5zbGljZSgwLCBjaHVua1NpemUpO1xuXG5jb25zdCBnZXRGaW5hbFN0cmluZ0NodW5rID0gKHt0ZXh0RGVjb2Rlcn0pID0+IHtcblx0Y29uc3QgZmluYWxDaHVuayA9IHRleHREZWNvZGVyLmRlY29kZSgpO1xuXHRyZXR1cm4gZmluYWxDaHVuayA9PT0gJycgPyB1bmRlZmluZWQgOiBmaW5hbENodW5rO1xufTtcblxuY29uc3Qgc3RyaW5nTWV0aG9kcyA9IHtcblx0aW5pdDogaW5pdFN0cmluZyxcblx0Y29udmVydENodW5rOiB7XG5cdFx0c3RyaW5nOiBpZGVudGl0eSxcblx0XHRidWZmZXI6IHVzZVRleHREZWNvZGVyLFxuXHRcdGFycmF5QnVmZmVyOiB1c2VUZXh0RGVjb2Rlcixcblx0XHRkYXRhVmlldzogdXNlVGV4dERlY29kZXIsXG5cdFx0dHlwZWRBcnJheTogdXNlVGV4dERlY29kZXIsXG5cdFx0b3RoZXJzOiB0aHJvd09iamVjdFN0cmVhbSxcblx0fSxcblx0Z2V0U2l6ZTogZ2V0TGVuZ3RoUHJvcGVydHksXG5cdHRydW5jYXRlQ2h1bms6IHRydW5jYXRlU3RyaW5nQ2h1bmssXG5cdGFkZENodW5rOiBhZGRTdHJpbmdDaHVuayxcblx0Z2V0RmluYWxDaHVuazogZ2V0RmluYWxTdHJpbmdDaHVuayxcblx0ZmluYWxpemU6IGdldENvbnRlbnRzUHJvcGVydHksXG59O1xuIiwgImV4cG9ydCB7Z2V0U3RyZWFtQXNBcnJheX0gZnJvbSAnLi9hcnJheS5qcyc7XG5leHBvcnQge2dldFN0cmVhbUFzQXJyYXlCdWZmZXJ9IGZyb20gJy4vYXJyYXktYnVmZmVyLmpzJztcbmV4cG9ydCB7Z2V0U3RyZWFtQXNCdWZmZXJ9IGZyb20gJy4vYnVmZmVyLmpzJztcbmV4cG9ydCB7Z2V0U3RyZWFtQXNTdHJpbmcgYXMgZGVmYXVsdH0gZnJvbSAnLi9zdHJpbmcuanMnO1xuZXhwb3J0IHtNYXhCdWZmZXJFcnJvcn0gZnJvbSAnLi9jb250ZW50cy5qcyc7XG4iLCAiaW1wb3J0IHtvbn0gZnJvbSAnbm9kZTpldmVudHMnO1xuaW1wb3J0IHtmaW5pc2hlZH0gZnJvbSAnbm9kZTpzdHJlYW0vcHJvbWlzZXMnO1xuaW1wb3J0IHtub2RlSW1wb3J0c30gZnJvbSAnLi9zdHJlYW0uanMnO1xuXG5PYmplY3QuYXNzaWduKG5vZGVJbXBvcnRzLCB7b24sIGZpbmlzaGVkfSk7XG5cbmV4cG9ydCB7XG5cdGRlZmF1bHQsXG5cdGdldFN0cmVhbUFzQXJyYXksXG5cdGdldFN0cmVhbUFzQXJyYXlCdWZmZXIsXG5cdGdldFN0cmVhbUFzQnVmZmVyLFxuXHRNYXhCdWZmZXJFcnJvcixcbn0gZnJvbSAnLi9leHBvcnRzLmpzJztcbiIsICJpbXBvcnQge01heEJ1ZmZlckVycm9yfSBmcm9tICdnZXQtc3RyZWFtJztcbmltcG9ydCB7Z2V0U3RyZWFtTmFtZX0gZnJvbSAnLi4vdXRpbHMvc3RhbmRhcmQtc3RyZWFtLmpzJztcbmltcG9ydCB7Z2V0RmRTcGVjaWZpY1ZhbHVlfSBmcm9tICcuLi9hcmd1bWVudHMvc3BlY2lmaWMuanMnO1xuXG4vLyBXaGVuIHRoZSBgbWF4QnVmZmVyYCBvcHRpb24gaXMgaGl0LCBhIE1heEJ1ZmZlckVycm9yIGlzIHRocm93bi5cbi8vIFRoZSBzdHJlYW0gaXMgYWJvcnRlZCwgdGhlbiBzcGVjaWZpYyBpbmZvcm1hdGlvbiBpcyBrZXB0IGZvciB0aGUgZXJyb3IgbWVzc2FnZS5cbmV4cG9ydCBjb25zdCBoYW5kbGVNYXhCdWZmZXIgPSAoe2Vycm9yLCBzdHJlYW0sIHJlYWRhYmxlT2JqZWN0TW9kZSwgbGluZXMsIGVuY29kaW5nLCBmZE51bWJlcn0pID0+IHtcblx0aWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBNYXhCdWZmZXJFcnJvcikpIHtcblx0XHR0aHJvdyBlcnJvcjtcblx0fVxuXG5cdGlmIChmZE51bWJlciA9PT0gJ2FsbCcpIHtcblx0XHRyZXR1cm4gZXJyb3I7XG5cdH1cblxuXHRjb25zdCB1bml0ID0gZ2V0TWF4QnVmZmVyVW5pdChyZWFkYWJsZU9iamVjdE1vZGUsIGxpbmVzLCBlbmNvZGluZyk7XG5cdGVycm9yLm1heEJ1ZmZlckluZm8gPSB7ZmROdW1iZXIsIHVuaXR9O1xuXHRzdHJlYW0uZGVzdHJveSgpO1xuXHR0aHJvdyBlcnJvcjtcbn07XG5cbmNvbnN0IGdldE1heEJ1ZmZlclVuaXQgPSAocmVhZGFibGVPYmplY3RNb2RlLCBsaW5lcywgZW5jb2RpbmcpID0+IHtcblx0aWYgKHJlYWRhYmxlT2JqZWN0TW9kZSkge1xuXHRcdHJldHVybiAnb2JqZWN0cyc7XG5cdH1cblxuXHRpZiAobGluZXMpIHtcblx0XHRyZXR1cm4gJ2xpbmVzJztcblx0fVxuXG5cdGlmIChlbmNvZGluZyA9PT0gJ2J1ZmZlcicpIHtcblx0XHRyZXR1cm4gJ2J5dGVzJztcblx0fVxuXG5cdHJldHVybiAnY2hhcmFjdGVycyc7XG59O1xuXG4vLyBDaGVjayB0aGUgYG1heEJ1ZmZlcmAgb3B0aW9uIHdpdGggYHJlc3VsdC5pcGNPdXRwdXRgXG5leHBvcnQgY29uc3QgY2hlY2tJcGNNYXhCdWZmZXIgPSAoc3VicHJvY2VzcywgaXBjT3V0cHV0LCBtYXhCdWZmZXIpID0+IHtcblx0aWYgKGlwY091dHB1dC5sZW5ndGggIT09IG1heEJ1ZmZlcikge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGVycm9yID0gbmV3IE1heEJ1ZmZlckVycm9yKCk7XG5cdGVycm9yLm1heEJ1ZmZlckluZm8gPSB7ZmROdW1iZXI6ICdpcGMnfTtcblx0dGhyb3cgZXJyb3I7XG59O1xuXG4vLyBFcnJvciBtZXNzYWdlIHdoZW4gYG1heEJ1ZmZlcmAgaXMgaGl0XG5leHBvcnQgY29uc3QgZ2V0TWF4QnVmZmVyTWVzc2FnZSA9IChlcnJvciwgbWF4QnVmZmVyKSA9PiB7XG5cdGNvbnN0IHtzdHJlYW1OYW1lLCB0aHJlc2hvbGQsIHVuaXR9ID0gZ2V0TWF4QnVmZmVySW5mbyhlcnJvciwgbWF4QnVmZmVyKTtcblx0cmV0dXJuIGBDb21tYW5kJ3MgJHtzdHJlYW1OYW1lfSB3YXMgbGFyZ2VyIHRoYW4gJHt0aHJlc2hvbGR9ICR7dW5pdH1gO1xufTtcblxuY29uc3QgZ2V0TWF4QnVmZmVySW5mbyA9IChlcnJvciwgbWF4QnVmZmVyKSA9PiB7XG5cdGlmIChlcnJvcj8ubWF4QnVmZmVySW5mbyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIHtzdHJlYW1OYW1lOiAnb3V0cHV0JywgdGhyZXNob2xkOiBtYXhCdWZmZXJbMV0sIHVuaXQ6ICdieXRlcyd9O1xuXHR9XG5cblx0Y29uc3Qge21heEJ1ZmZlckluZm86IHtmZE51bWJlciwgdW5pdH19ID0gZXJyb3I7XG5cdGRlbGV0ZSBlcnJvci5tYXhCdWZmZXJJbmZvO1xuXG5cdGNvbnN0IHRocmVzaG9sZCA9IGdldEZkU3BlY2lmaWNWYWx1ZShtYXhCdWZmZXIsIGZkTnVtYmVyKTtcblx0aWYgKGZkTnVtYmVyID09PSAnaXBjJykge1xuXHRcdHJldHVybiB7c3RyZWFtTmFtZTogJ0lQQyBvdXRwdXQnLCB0aHJlc2hvbGQsIHVuaXQ6ICdtZXNzYWdlcyd9O1xuXHR9XG5cblx0cmV0dXJuIHtzdHJlYW1OYW1lOiBnZXRTdHJlYW1OYW1lKGZkTnVtYmVyKSwgdGhyZXNob2xkLCB1bml0fTtcbn07XG5cbi8vIFRoZSBvbmx5IHdheSB0byBhcHBseSBgbWF4QnVmZmVyYCB3aXRoIGBzcGF3blN5bmMoKWAgaXMgdG8gdXNlIHRoZSBuYXRpdmUgYG1heEJ1ZmZlcmAgb3B0aW9uIE5vZGUuanMgcHJvdmlkZXMuXG4vLyBIb3dldmVyLCB0aGlzIGhhcyBtdWx0aXBsZSBsaW1pdGF0aW9ucywgYW5kIGNhbm5vdCBiZWhhdmUgdGhlIGV4YWN0IHNhbWUgd2F5IGFzIHRoZSBhc3luYyBiZWhhdmlvci5cbi8vIFdoZW4gdGhlIGBtYXhCdWZmZXJgIGlzIGhpdCwgYSBgRU5PQlVGU2AgZXJyb3IgaXMgdGhyb3duLlxuZXhwb3J0IGNvbnN0IGlzTWF4QnVmZmVyU3luYyA9IChyZXN1bHRFcnJvciwgb3V0cHV0LCBtYXhCdWZmZXIpID0+IHJlc3VsdEVycm9yPy5jb2RlID09PSAnRU5PQlVGUydcblx0JiYgb3V0cHV0ICE9PSBudWxsXG5cdCYmIG91dHB1dC5zb21lKHJlc3VsdCA9PiByZXN1bHQgIT09IG51bGwgJiYgcmVzdWx0Lmxlbmd0aCA+IGdldE1heEJ1ZmZlclN5bmMobWF4QnVmZmVyKSk7XG5cbi8vIFdoZW4gYG1heEJ1ZmZlcmAgaXMgaGl0LCBlbnN1cmUgdGhlIHJlc3VsdCBpcyB0cnVuY2F0ZWRcbmV4cG9ydCBjb25zdCB0cnVuY2F0ZU1heEJ1ZmZlclN5bmMgPSAocmVzdWx0LCBpc01heEJ1ZmZlciwgbWF4QnVmZmVyKSA9PiB7XG5cdGlmICghaXNNYXhCdWZmZXIpIHtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Y29uc3QgbWF4QnVmZmVyVmFsdWUgPSBnZXRNYXhCdWZmZXJTeW5jKG1heEJ1ZmZlcik7XG5cdHJldHVybiByZXN1bHQubGVuZ3RoID4gbWF4QnVmZmVyVmFsdWUgPyByZXN1bHQuc2xpY2UoMCwgbWF4QnVmZmVyVmFsdWUpIDogcmVzdWx0O1xufTtcblxuLy8gYHNwYXduU3luYygpYCBkb2VzIG5vdCBhbGxvdyBkaWZmZXJlbnRpYXRpbmcgYG1heEJ1ZmZlcmAgcGVyIGZpbGUgZGVzY3JpcHRvciwgc28gd2UgYWx3YXlzIHVzZSBgc3Rkb3V0YFxuZXhwb3J0IGNvbnN0IGdldE1heEJ1ZmZlclN5bmMgPSAoWywgc3Rkb3V0TWF4QnVmZmVyXSkgPT4gc3Rkb3V0TWF4QnVmZmVyO1xuIiwgImltcG9ydCB7aW5zcGVjdH0gZnJvbSAnbm9kZTp1dGlsJztcbmltcG9ydCBzdHJpcEZpbmFsTmV3bGluZSBmcm9tICdzdHJpcC1maW5hbC1uZXdsaW5lJztcbmltcG9ydCB7aXNVaW50OEFycmF5LCB1aW50OEFycmF5VG9TdHJpbmd9IGZyb20gJy4uL3V0aWxzL3VpbnQtYXJyYXkuanMnO1xuaW1wb3J0IHtmaXhDd2RFcnJvcn0gZnJvbSAnLi4vYXJndW1lbnRzL2N3ZC5qcyc7XG5pbXBvcnQge2VzY2FwZUxpbmVzfSBmcm9tICcuLi9hcmd1bWVudHMvZXNjYXBlLmpzJztcbmltcG9ydCB7Z2V0TWF4QnVmZmVyTWVzc2FnZX0gZnJvbSAnLi4vaW8vbWF4LWJ1ZmZlci5qcyc7XG5pbXBvcnQge2dldFNpZ25hbERlc2NyaXB0aW9ufSBmcm9tICcuLi90ZXJtaW5hdGUvc2lnbmFsLmpzJztcbmltcG9ydCB7RGlzY2FyZGVkRXJyb3IsIGlzRXhlY2FFcnJvcn0gZnJvbSAnLi9maW5hbC1lcnJvci5qcyc7XG5cbi8vIENvbXB1dGVzIGBlcnJvci5tZXNzYWdlYCwgYGVycm9yLnNob3J0TWVzc2FnZWAgYW5kIGBlcnJvci5vcmlnaW5hbE1lc3NhZ2VgXG5leHBvcnQgY29uc3QgY3JlYXRlTWVzc2FnZXMgPSAoe1xuXHRzdGRpbyxcblx0YWxsLFxuXHRpcGNPdXRwdXQsXG5cdG9yaWdpbmFsRXJyb3IsXG5cdHNpZ25hbCxcblx0c2lnbmFsRGVzY3JpcHRpb24sXG5cdGV4aXRDb2RlLFxuXHRlc2NhcGVkQ29tbWFuZCxcblx0dGltZWRPdXQsXG5cdGlzQ2FuY2VsZWQsXG5cdGlzR3JhY2VmdWxseUNhbmNlbGVkLFxuXHRpc01heEJ1ZmZlcixcblx0aXNGb3JjZWZ1bGx5VGVybWluYXRlZCxcblx0Zm9yY2VLaWxsQWZ0ZXJEZWxheSxcblx0a2lsbFNpZ25hbCxcblx0bWF4QnVmZmVyLFxuXHR0aW1lb3V0LFxuXHRjd2QsXG59KSA9PiB7XG5cdGNvbnN0IGVycm9yQ29kZSA9IG9yaWdpbmFsRXJyb3I/LmNvZGU7XG5cdGNvbnN0IHByZWZpeCA9IGdldEVycm9yUHJlZml4KHtcblx0XHRvcmlnaW5hbEVycm9yLFxuXHRcdHRpbWVkT3V0LFxuXHRcdHRpbWVvdXQsXG5cdFx0aXNNYXhCdWZmZXIsXG5cdFx0bWF4QnVmZmVyLFxuXHRcdGVycm9yQ29kZSxcblx0XHRzaWduYWwsXG5cdFx0c2lnbmFsRGVzY3JpcHRpb24sXG5cdFx0ZXhpdENvZGUsXG5cdFx0aXNDYW5jZWxlZCxcblx0XHRpc0dyYWNlZnVsbHlDYW5jZWxlZCxcblx0XHRpc0ZvcmNlZnVsbHlUZXJtaW5hdGVkLFxuXHRcdGZvcmNlS2lsbEFmdGVyRGVsYXksXG5cdFx0a2lsbFNpZ25hbCxcblx0fSk7XG5cdGNvbnN0IG9yaWdpbmFsTWVzc2FnZSA9IGdldE9yaWdpbmFsTWVzc2FnZShvcmlnaW5hbEVycm9yLCBjd2QpO1xuXHRjb25zdCBzdWZmaXggPSBvcmlnaW5hbE1lc3NhZ2UgPT09IHVuZGVmaW5lZCA/ICcnIDogYFxcbiR7b3JpZ2luYWxNZXNzYWdlfWA7XG5cdGNvbnN0IHNob3J0TWVzc2FnZSA9IGAke3ByZWZpeH06ICR7ZXNjYXBlZENvbW1hbmR9JHtzdWZmaXh9YDtcblx0Y29uc3QgbWVzc2FnZVN0ZGlvID0gYWxsID09PSB1bmRlZmluZWQgPyBbc3RkaW9bMl0sIHN0ZGlvWzFdXSA6IFthbGxdO1xuXHRjb25zdCBtZXNzYWdlID0gW1xuXHRcdHNob3J0TWVzc2FnZSxcblx0XHQuLi5tZXNzYWdlU3RkaW8sXG5cdFx0Li4uc3RkaW8uc2xpY2UoMyksXG5cdFx0aXBjT3V0cHV0Lm1hcChpcGNNZXNzYWdlID0+IHNlcmlhbGl6ZUlwY01lc3NhZ2UoaXBjTWVzc2FnZSkpLmpvaW4oJ1xcbicpLFxuXHRdXG5cdFx0Lm1hcChtZXNzYWdlUGFydCA9PiBlc2NhcGVMaW5lcyhzdHJpcEZpbmFsTmV3bGluZShzZXJpYWxpemVNZXNzYWdlUGFydChtZXNzYWdlUGFydCkpKSlcblx0XHQuZmlsdGVyKEJvb2xlYW4pXG5cdFx0LmpvaW4oJ1xcblxcbicpO1xuXHRyZXR1cm4ge29yaWdpbmFsTWVzc2FnZSwgc2hvcnRNZXNzYWdlLCBtZXNzYWdlfTtcbn07XG5cbmNvbnN0IGdldEVycm9yUHJlZml4ID0gKHtcblx0b3JpZ2luYWxFcnJvcixcblx0dGltZWRPdXQsXG5cdHRpbWVvdXQsXG5cdGlzTWF4QnVmZmVyLFxuXHRtYXhCdWZmZXIsXG5cdGVycm9yQ29kZSxcblx0c2lnbmFsLFxuXHRzaWduYWxEZXNjcmlwdGlvbixcblx0ZXhpdENvZGUsXG5cdGlzQ2FuY2VsZWQsXG5cdGlzR3JhY2VmdWxseUNhbmNlbGVkLFxuXHRpc0ZvcmNlZnVsbHlUZXJtaW5hdGVkLFxuXHRmb3JjZUtpbGxBZnRlckRlbGF5LFxuXHRraWxsU2lnbmFsLFxufSkgPT4ge1xuXHRjb25zdCBmb3JjZWZ1bFN1ZmZpeCA9IGdldEZvcmNlZnVsU3VmZml4KGlzRm9yY2VmdWxseVRlcm1pbmF0ZWQsIGZvcmNlS2lsbEFmdGVyRGVsYXkpO1xuXG5cdGlmICh0aW1lZE91dCkge1xuXHRcdHJldHVybiBgQ29tbWFuZCB0aW1lZCBvdXQgYWZ0ZXIgJHt0aW1lb3V0fSBtaWxsaXNlY29uZHMke2ZvcmNlZnVsU3VmZml4fWA7XG5cdH1cblxuXHRpZiAoaXNHcmFjZWZ1bGx5Q2FuY2VsZWQpIHtcblx0XHRpZiAoc2lnbmFsID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiBgQ29tbWFuZCB3YXMgZ3JhY2VmdWxseSBjYW5jZWxlZCB3aXRoIGV4aXQgY29kZSAke2V4aXRDb2RlfWA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGlzRm9yY2VmdWxseVRlcm1pbmF0ZWRcblx0XHRcdD8gYENvbW1hbmQgd2FzIGdyYWNlZnVsbHkgY2FuY2VsZWQke2ZvcmNlZnVsU3VmZml4fWBcblx0XHRcdDogYENvbW1hbmQgd2FzIGdyYWNlZnVsbHkgY2FuY2VsZWQgd2l0aCAke3NpZ25hbH0gKCR7c2lnbmFsRGVzY3JpcHRpb259KWA7XG5cdH1cblxuXHRpZiAoaXNDYW5jZWxlZCkge1xuXHRcdHJldHVybiBgQ29tbWFuZCB3YXMgY2FuY2VsZWQke2ZvcmNlZnVsU3VmZml4fWA7XG5cdH1cblxuXHRpZiAoaXNNYXhCdWZmZXIpIHtcblx0XHRyZXR1cm4gYCR7Z2V0TWF4QnVmZmVyTWVzc2FnZShvcmlnaW5hbEVycm9yLCBtYXhCdWZmZXIpfSR7Zm9yY2VmdWxTdWZmaXh9YDtcblx0fVxuXG5cdGlmIChlcnJvckNvZGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBgQ29tbWFuZCBmYWlsZWQgd2l0aCAke2Vycm9yQ29kZX0ke2ZvcmNlZnVsU3VmZml4fWA7XG5cdH1cblxuXHRpZiAoaXNGb3JjZWZ1bGx5VGVybWluYXRlZCkge1xuXHRcdHJldHVybiBgQ29tbWFuZCB3YXMga2lsbGVkIHdpdGggJHtraWxsU2lnbmFsfSAoJHtnZXRTaWduYWxEZXNjcmlwdGlvbihraWxsU2lnbmFsKX0pJHtmb3JjZWZ1bFN1ZmZpeH1gO1xuXHR9XG5cblx0aWYgKHNpZ25hbCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGBDb21tYW5kIHdhcyBraWxsZWQgd2l0aCAke3NpZ25hbH0gKCR7c2lnbmFsRGVzY3JpcHRpb259KWA7XG5cdH1cblxuXHRpZiAoZXhpdENvZGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBgQ29tbWFuZCBmYWlsZWQgd2l0aCBleGl0IGNvZGUgJHtleGl0Q29kZX1gO1xuXHR9XG5cblx0cmV0dXJuICdDb21tYW5kIGZhaWxlZCc7XG59O1xuXG5jb25zdCBnZXRGb3JjZWZ1bFN1ZmZpeCA9IChpc0ZvcmNlZnVsbHlUZXJtaW5hdGVkLCBmb3JjZUtpbGxBZnRlckRlbGF5KSA9PiBpc0ZvcmNlZnVsbHlUZXJtaW5hdGVkXG5cdD8gYCBhbmQgd2FzIGZvcmNlZnVsbHkgdGVybWluYXRlZCBhZnRlciAke2ZvcmNlS2lsbEFmdGVyRGVsYXl9IG1pbGxpc2Vjb25kc2Bcblx0OiAnJztcblxuY29uc3QgZ2V0T3JpZ2luYWxNZXNzYWdlID0gKG9yaWdpbmFsRXJyb3IsIGN3ZCkgPT4ge1xuXHRpZiAob3JpZ2luYWxFcnJvciBpbnN0YW5jZW9mIERpc2NhcmRlZEVycm9yKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3Qgb3JpZ2luYWxNZXNzYWdlID0gaXNFeGVjYUVycm9yKG9yaWdpbmFsRXJyb3IpXG5cdFx0PyBvcmlnaW5hbEVycm9yLm9yaWdpbmFsTWVzc2FnZVxuXHRcdDogU3RyaW5nKG9yaWdpbmFsRXJyb3I/Lm1lc3NhZ2UgPz8gb3JpZ2luYWxFcnJvcik7XG5cdGNvbnN0IGVzY2FwZWRPcmlnaW5hbE1lc3NhZ2UgPSBlc2NhcGVMaW5lcyhmaXhDd2RFcnJvcihvcmlnaW5hbE1lc3NhZ2UsIGN3ZCkpO1xuXHRyZXR1cm4gZXNjYXBlZE9yaWdpbmFsTWVzc2FnZSA9PT0gJycgPyB1bmRlZmluZWQgOiBlc2NhcGVkT3JpZ2luYWxNZXNzYWdlO1xufTtcblxuY29uc3Qgc2VyaWFsaXplSXBjTWVzc2FnZSA9IGlwY01lc3NhZ2UgPT4gdHlwZW9mIGlwY01lc3NhZ2UgPT09ICdzdHJpbmcnXG5cdD8gaXBjTWVzc2FnZVxuXHQ6IGluc3BlY3QoaXBjTWVzc2FnZSk7XG5cbmNvbnN0IHNlcmlhbGl6ZU1lc3NhZ2VQYXJ0ID0gbWVzc2FnZVBhcnQgPT4gQXJyYXkuaXNBcnJheShtZXNzYWdlUGFydClcblx0PyBtZXNzYWdlUGFydC5tYXAobWVzc2FnZUl0ZW0gPT4gc3RyaXBGaW5hbE5ld2xpbmUoc2VyaWFsaXplTWVzc2FnZUl0ZW0obWVzc2FnZUl0ZW0pKSkuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpXG5cdDogc2VyaWFsaXplTWVzc2FnZUl0ZW0obWVzc2FnZVBhcnQpO1xuXG5jb25zdCBzZXJpYWxpemVNZXNzYWdlSXRlbSA9IG1lc3NhZ2VJdGVtID0+IHtcblx0aWYgKHR5cGVvZiBtZXNzYWdlSXRlbSA9PT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gbWVzc2FnZUl0ZW07XG5cdH1cblxuXHRpZiAoaXNVaW50OEFycmF5KG1lc3NhZ2VJdGVtKSkge1xuXHRcdHJldHVybiB1aW50OEFycmF5VG9TdHJpbmcobWVzc2FnZUl0ZW0pO1xuXHR9XG5cblx0cmV0dXJuICcnO1xufTtcbiIsICJpbXBvcnQge2dldFNpZ25hbERlc2NyaXB0aW9ufSBmcm9tICcuLi90ZXJtaW5hdGUvc2lnbmFsLmpzJztcbmltcG9ydCB7Z2V0RHVyYXRpb25Nc30gZnJvbSAnLi9kdXJhdGlvbi5qcyc7XG5pbXBvcnQge2dldEZpbmFsRXJyb3J9IGZyb20gJy4vZmluYWwtZXJyb3IuanMnO1xuaW1wb3J0IHtjcmVhdGVNZXNzYWdlc30gZnJvbSAnLi9tZXNzYWdlLmpzJztcblxuLy8gT2JqZWN0IHJldHVybmVkIG9uIHN1YnByb2Nlc3Mgc3VjY2Vzc1xuZXhwb3J0IGNvbnN0IG1ha2VTdWNjZXNzUmVzdWx0ID0gKHtcblx0Y29tbWFuZCxcblx0ZXNjYXBlZENvbW1hbmQsXG5cdHN0ZGlvLFxuXHRhbGwsXG5cdGlwY091dHB1dCxcblx0b3B0aW9uczoge2N3ZH0sXG5cdHN0YXJ0VGltZSxcbn0pID0+IG9taXRVbmRlZmluZWRQcm9wZXJ0aWVzKHtcblx0Y29tbWFuZCxcblx0ZXNjYXBlZENvbW1hbmQsXG5cdGN3ZCxcblx0ZHVyYXRpb25NczogZ2V0RHVyYXRpb25NcyhzdGFydFRpbWUpLFxuXHRmYWlsZWQ6IGZhbHNlLFxuXHR0aW1lZE91dDogZmFsc2UsXG5cdGlzQ2FuY2VsZWQ6IGZhbHNlLFxuXHRpc0dyYWNlZnVsbHlDYW5jZWxlZDogZmFsc2UsXG5cdGlzVGVybWluYXRlZDogZmFsc2UsXG5cdGlzTWF4QnVmZmVyOiBmYWxzZSxcblx0aXNGb3JjZWZ1bGx5VGVybWluYXRlZDogZmFsc2UsXG5cdGV4aXRDb2RlOiAwLFxuXHRzdGRvdXQ6IHN0ZGlvWzFdLFxuXHRzdGRlcnI6IHN0ZGlvWzJdLFxuXHRhbGwsXG5cdHN0ZGlvLFxuXHRpcGNPdXRwdXQsXG5cdHBpcGVkRnJvbTogW10sXG59KTtcblxuLy8gT2JqZWN0IHJldHVybmVkIG9uIHN1YnByb2Nlc3MgZmFpbHVyZSBiZWZvcmUgc3Bhd25pbmdcbmV4cG9ydCBjb25zdCBtYWtlRWFybHlFcnJvciA9ICh7XG5cdGVycm9yLFxuXHRjb21tYW5kLFxuXHRlc2NhcGVkQ29tbWFuZCxcblx0ZmlsZURlc2NyaXB0b3JzLFxuXHRvcHRpb25zLFxuXHRzdGFydFRpbWUsXG5cdGlzU3luYyxcbn0pID0+IG1ha2VFcnJvcih7XG5cdGVycm9yLFxuXHRjb21tYW5kLFxuXHRlc2NhcGVkQ29tbWFuZCxcblx0c3RhcnRUaW1lLFxuXHR0aW1lZE91dDogZmFsc2UsXG5cdGlzQ2FuY2VsZWQ6IGZhbHNlLFxuXHRpc0dyYWNlZnVsbHlDYW5jZWxlZDogZmFsc2UsXG5cdGlzTWF4QnVmZmVyOiBmYWxzZSxcblx0aXNGb3JjZWZ1bGx5VGVybWluYXRlZDogZmFsc2UsXG5cdHN0ZGlvOiBBcnJheS5mcm9tKHtsZW5ndGg6IGZpbGVEZXNjcmlwdG9ycy5sZW5ndGh9KSxcblx0aXBjT3V0cHV0OiBbXSxcblx0b3B0aW9ucyxcblx0aXNTeW5jLFxufSk7XG5cbi8vIE9iamVjdCByZXR1cm5lZCBvbiBzdWJwcm9jZXNzIGZhaWx1cmVcbmV4cG9ydCBjb25zdCBtYWtlRXJyb3IgPSAoe1xuXHRlcnJvcjogb3JpZ2luYWxFcnJvcixcblx0Y29tbWFuZCxcblx0ZXNjYXBlZENvbW1hbmQsXG5cdHN0YXJ0VGltZSxcblx0dGltZWRPdXQsXG5cdGlzQ2FuY2VsZWQsXG5cdGlzR3JhY2VmdWxseUNhbmNlbGVkLFxuXHRpc01heEJ1ZmZlcixcblx0aXNGb3JjZWZ1bGx5VGVybWluYXRlZCxcblx0ZXhpdENvZGU6IHJhd0V4aXRDb2RlLFxuXHRzaWduYWw6IHJhd1NpZ25hbCxcblx0c3RkaW8sXG5cdGFsbCxcblx0aXBjT3V0cHV0LFxuXHRvcHRpb25zOiB7XG5cdFx0dGltZW91dER1cmF0aW9uLFxuXHRcdHRpbWVvdXQgPSB0aW1lb3V0RHVyYXRpb24sXG5cdFx0Zm9yY2VLaWxsQWZ0ZXJEZWxheSxcblx0XHRraWxsU2lnbmFsLFxuXHRcdGN3ZCxcblx0XHRtYXhCdWZmZXIsXG5cdH0sXG5cdGlzU3luYyxcbn0pID0+IHtcblx0Y29uc3Qge2V4aXRDb2RlLCBzaWduYWwsIHNpZ25hbERlc2NyaXB0aW9ufSA9IG5vcm1hbGl6ZUV4aXRQYXlsb2FkKHJhd0V4aXRDb2RlLCByYXdTaWduYWwpO1xuXHRjb25zdCB7b3JpZ2luYWxNZXNzYWdlLCBzaG9ydE1lc3NhZ2UsIG1lc3NhZ2V9ID0gY3JlYXRlTWVzc2FnZXMoe1xuXHRcdHN0ZGlvLFxuXHRcdGFsbCxcblx0XHRpcGNPdXRwdXQsXG5cdFx0b3JpZ2luYWxFcnJvcixcblx0XHRzaWduYWwsXG5cdFx0c2lnbmFsRGVzY3JpcHRpb24sXG5cdFx0ZXhpdENvZGUsXG5cdFx0ZXNjYXBlZENvbW1hbmQsXG5cdFx0dGltZWRPdXQsXG5cdFx0aXNDYW5jZWxlZCxcblx0XHRpc0dyYWNlZnVsbHlDYW5jZWxlZCxcblx0XHRpc01heEJ1ZmZlcixcblx0XHRpc0ZvcmNlZnVsbHlUZXJtaW5hdGVkLFxuXHRcdGZvcmNlS2lsbEFmdGVyRGVsYXksXG5cdFx0a2lsbFNpZ25hbCxcblx0XHRtYXhCdWZmZXIsXG5cdFx0dGltZW91dCxcblx0XHRjd2QsXG5cdH0pO1xuXHRjb25zdCBlcnJvciA9IGdldEZpbmFsRXJyb3Iob3JpZ2luYWxFcnJvciwgbWVzc2FnZSwgaXNTeW5jKTtcblx0T2JqZWN0LmFzc2lnbihlcnJvciwgZ2V0RXJyb3JQcm9wZXJ0aWVzKHtcblx0XHRlcnJvcixcblx0XHRjb21tYW5kLFxuXHRcdGVzY2FwZWRDb21tYW5kLFxuXHRcdHN0YXJ0VGltZSxcblx0XHR0aW1lZE91dCxcblx0XHRpc0NhbmNlbGVkLFxuXHRcdGlzR3JhY2VmdWxseUNhbmNlbGVkLFxuXHRcdGlzTWF4QnVmZmVyLFxuXHRcdGlzRm9yY2VmdWxseVRlcm1pbmF0ZWQsXG5cdFx0ZXhpdENvZGUsXG5cdFx0c2lnbmFsLFxuXHRcdHNpZ25hbERlc2NyaXB0aW9uLFxuXHRcdHN0ZGlvLFxuXHRcdGFsbCxcblx0XHRpcGNPdXRwdXQsXG5cdFx0Y3dkLFxuXHRcdG9yaWdpbmFsTWVzc2FnZSxcblx0XHRzaG9ydE1lc3NhZ2UsXG5cdH0pKTtcblx0cmV0dXJuIGVycm9yO1xufTtcblxuY29uc3QgZ2V0RXJyb3JQcm9wZXJ0aWVzID0gKHtcblx0ZXJyb3IsXG5cdGNvbW1hbmQsXG5cdGVzY2FwZWRDb21tYW5kLFxuXHRzdGFydFRpbWUsXG5cdHRpbWVkT3V0LFxuXHRpc0NhbmNlbGVkLFxuXHRpc0dyYWNlZnVsbHlDYW5jZWxlZCxcblx0aXNNYXhCdWZmZXIsXG5cdGlzRm9yY2VmdWxseVRlcm1pbmF0ZWQsXG5cdGV4aXRDb2RlLFxuXHRzaWduYWwsXG5cdHNpZ25hbERlc2NyaXB0aW9uLFxuXHRzdGRpbyxcblx0YWxsLFxuXHRpcGNPdXRwdXQsXG5cdGN3ZCxcblx0b3JpZ2luYWxNZXNzYWdlLFxuXHRzaG9ydE1lc3NhZ2UsXG59KSA9PiBvbWl0VW5kZWZpbmVkUHJvcGVydGllcyh7XG5cdHNob3J0TWVzc2FnZSxcblx0b3JpZ2luYWxNZXNzYWdlLFxuXHRjb21tYW5kLFxuXHRlc2NhcGVkQ29tbWFuZCxcblx0Y3dkLFxuXHRkdXJhdGlvbk1zOiBnZXREdXJhdGlvbk1zKHN0YXJ0VGltZSksXG5cdGZhaWxlZDogdHJ1ZSxcblx0dGltZWRPdXQsXG5cdGlzQ2FuY2VsZWQsXG5cdGlzR3JhY2VmdWxseUNhbmNlbGVkLFxuXHRpc1Rlcm1pbmF0ZWQ6IHNpZ25hbCAhPT0gdW5kZWZpbmVkLFxuXHRpc01heEJ1ZmZlcixcblx0aXNGb3JjZWZ1bGx5VGVybWluYXRlZCxcblx0ZXhpdENvZGUsXG5cdHNpZ25hbCxcblx0c2lnbmFsRGVzY3JpcHRpb24sXG5cdGNvZGU6IGVycm9yLmNhdXNlPy5jb2RlLFxuXHRzdGRvdXQ6IHN0ZGlvWzFdLFxuXHRzdGRlcnI6IHN0ZGlvWzJdLFxuXHRhbGwsXG5cdHN0ZGlvLFxuXHRpcGNPdXRwdXQsXG5cdHBpcGVkRnJvbTogW10sXG59KTtcblxuY29uc3Qgb21pdFVuZGVmaW5lZFByb3BlcnRpZXMgPSByZXN1bHQgPT4gT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC5lbnRyaWVzKHJlc3VsdCkuZmlsdGVyKChbLCB2YWx1ZV0pID0+IHZhbHVlICE9PSB1bmRlZmluZWQpKTtcblxuLy8gYHNpZ25hbGAgYW5kIGBleGl0Q29kZWAgZW1pdHRlZCBvbiBgc3VicHJvY2Vzcy5vbignZXhpdCcpYCBldmVudCBjYW4gYmUgYG51bGxgLlxuLy8gV2Ugbm9ybWFsaXplIHRoZW0gdG8gYHVuZGVmaW5lZGBcbmNvbnN0IG5vcm1hbGl6ZUV4aXRQYXlsb2FkID0gKHJhd0V4aXRDb2RlLCByYXdTaWduYWwpID0+IHtcblx0Y29uc3QgZXhpdENvZGUgPSByYXdFeGl0Q29kZSA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IHJhd0V4aXRDb2RlO1xuXHRjb25zdCBzaWduYWwgPSByYXdTaWduYWwgPT09IG51bGwgPyB1bmRlZmluZWQgOiByYXdTaWduYWw7XG5cdGNvbnN0IHNpZ25hbERlc2NyaXB0aW9uID0gc2lnbmFsID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBnZXRTaWduYWxEZXNjcmlwdGlvbihyYXdTaWduYWwpO1xuXHRyZXR1cm4ge2V4aXRDb2RlLCBzaWduYWwsIHNpZ25hbERlc2NyaXB0aW9ufTtcbn07XG4iLCAiY29uc3QgdG9aZXJvSWZJbmZpbml0eSA9IHZhbHVlID0+IE51bWJlci5pc0Zpbml0ZSh2YWx1ZSkgPyB2YWx1ZSA6IDA7XG5cbmZ1bmN0aW9uIHBhcnNlTnVtYmVyKG1pbGxpc2Vjb25kcykge1xuXHRyZXR1cm4ge1xuXHRcdGRheXM6IE1hdGgudHJ1bmMobWlsbGlzZWNvbmRzIC8gODZfNDAwXzAwMCksXG5cdFx0aG91cnM6IE1hdGgudHJ1bmMobWlsbGlzZWNvbmRzIC8gM182MDBfMDAwICUgMjQpLFxuXHRcdG1pbnV0ZXM6IE1hdGgudHJ1bmMobWlsbGlzZWNvbmRzIC8gNjBfMDAwICUgNjApLFxuXHRcdHNlY29uZHM6IE1hdGgudHJ1bmMobWlsbGlzZWNvbmRzIC8gMTAwMCAlIDYwKSxcblx0XHRtaWxsaXNlY29uZHM6IE1hdGgudHJ1bmMobWlsbGlzZWNvbmRzICUgMTAwMCksXG5cdFx0bWljcm9zZWNvbmRzOiBNYXRoLnRydW5jKHRvWmVyb0lmSW5maW5pdHkobWlsbGlzZWNvbmRzICogMTAwMCkgJSAxMDAwKSxcblx0XHRuYW5vc2Vjb25kczogTWF0aC50cnVuYyh0b1plcm9JZkluZmluaXR5KG1pbGxpc2Vjb25kcyAqIDFlNikgJSAxMDAwKSxcblx0fTtcbn1cblxuZnVuY3Rpb24gcGFyc2VCaWdpbnQobWlsbGlzZWNvbmRzKSB7XG5cdHJldHVybiB7XG5cdFx0ZGF5czogbWlsbGlzZWNvbmRzIC8gODZfNDAwXzAwMG4sXG5cdFx0aG91cnM6IG1pbGxpc2Vjb25kcyAvIDNfNjAwXzAwMG4gJSAyNG4sXG5cdFx0bWludXRlczogbWlsbGlzZWNvbmRzIC8gNjBfMDAwbiAlIDYwbixcblx0XHRzZWNvbmRzOiBtaWxsaXNlY29uZHMgLyAxMDAwbiAlIDYwbixcblx0XHRtaWxsaXNlY29uZHM6IG1pbGxpc2Vjb25kcyAlIDEwMDBuLFxuXHRcdG1pY3Jvc2Vjb25kczogMG4sXG5cdFx0bmFub3NlY29uZHM6IDBuLFxuXHR9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZU1pbGxpc2Vjb25kcyhtaWxsaXNlY29uZHMpIHtcblx0c3dpdGNoICh0eXBlb2YgbWlsbGlzZWNvbmRzKSB7XG5cdFx0Y2FzZSAnbnVtYmVyJzoge1xuXHRcdFx0aWYgKE51bWJlci5pc0Zpbml0ZShtaWxsaXNlY29uZHMpKSB7XG5cdFx0XHRcdHJldHVybiBwYXJzZU51bWJlcihtaWxsaXNlY29uZHMpO1xuXHRcdFx0fVxuXG5cdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRjYXNlICdiaWdpbnQnOiB7XG5cdFx0XHRyZXR1cm4gcGFyc2VCaWdpbnQobWlsbGlzZWNvbmRzKTtcblx0XHR9XG5cblx0XHQvLyBObyBkZWZhdWx0XG5cdH1cblxuXHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIGZpbml0ZSBudW1iZXIgb3IgYmlnaW50Jyk7XG59XG4iLCAiaW1wb3J0IHBhcnNlTWlsbGlzZWNvbmRzIGZyb20gJ3BhcnNlLW1zJztcblxuY29uc3QgaXNaZXJvID0gdmFsdWUgPT4gdmFsdWUgPT09IDAgfHwgdmFsdWUgPT09IDBuO1xuY29uc3QgcGx1cmFsaXplID0gKHdvcmQsIGNvdW50KSA9PiAoY291bnQgPT09IDEgfHwgY291bnQgPT09IDFuKSA/IHdvcmQgOiBgJHt3b3JkfXNgO1xuXG5jb25zdCBTRUNPTkRfUk9VTkRJTkdfRVBTSUxPTiA9IDAuMDAwXzAwMF8xO1xuY29uc3QgT05FX0RBWV9JTl9NSUxMSVNFQ09ORFMgPSAyNG4gKiA2MG4gKiA2MG4gKiAxMDAwbjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJldHR5TWlsbGlzZWNvbmRzKG1pbGxpc2Vjb25kcywgb3B0aW9ucykge1xuXHRjb25zdCBpc0JpZ0ludCA9IHR5cGVvZiBtaWxsaXNlY29uZHMgPT09ICdiaWdpbnQnO1xuXHRpZiAoIWlzQmlnSW50ICYmICFOdW1iZXIuaXNGaW5pdGUobWlsbGlzZWNvbmRzKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgZmluaXRlIG51bWJlciBvciBiaWdpbnQnKTtcblx0fVxuXG5cdG9wdGlvbnMgPSB7Li4ub3B0aW9uc307XG5cblx0Y29uc3Qgc2lnbiA9IG1pbGxpc2Vjb25kcyA8IDAgPyAnLScgOiAnJztcblx0bWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmRzIDwgMCA/IC1taWxsaXNlY29uZHMgOiBtaWxsaXNlY29uZHM7IC8vIENhbm5vdCB1c2UgYE1hdGguYWJzKClgIGJlY2F1c2Ugb2YgQmlnSW50IHN1cHBvcnQuXG5cblx0aWYgKG9wdGlvbnMuY29sb25Ob3RhdGlvbikge1xuXHRcdG9wdGlvbnMuY29tcGFjdCA9IGZhbHNlO1xuXHRcdG9wdGlvbnMuZm9ybWF0U3ViTWlsbGlzZWNvbmRzID0gZmFsc2U7XG5cdFx0b3B0aW9ucy5zZXBhcmF0ZU1pbGxpc2Vjb25kcyA9IGZhbHNlO1xuXHRcdG9wdGlvbnMudmVyYm9zZSA9IGZhbHNlO1xuXHR9XG5cblx0aWYgKG9wdGlvbnMuY29tcGFjdCkge1xuXHRcdG9wdGlvbnMudW5pdENvdW50ID0gMTtcblx0XHRvcHRpb25zLnNlY29uZHNEZWNpbWFsRGlnaXRzID0gMDtcblx0XHRvcHRpb25zLm1pbGxpc2Vjb25kc0RlY2ltYWxEaWdpdHMgPSAwO1xuXHR9XG5cblx0bGV0IHJlc3VsdCA9IFtdO1xuXG5cdGNvbnN0IGZsb29yRGVjaW1hbHMgPSAodmFsdWUsIGRlY2ltYWxEaWdpdHMpID0+IHtcblx0XHRjb25zdCBmbG9vcmVkSW50ZXJpbVZhbHVlID0gTWF0aC5mbG9vcigodmFsdWUgKiAoMTAgKiogZGVjaW1hbERpZ2l0cykpICsgU0VDT05EX1JPVU5ESU5HX0VQU0lMT04pO1xuXHRcdGNvbnN0IGZsb29yZWRWYWx1ZSA9IE1hdGgucm91bmQoZmxvb3JlZEludGVyaW1WYWx1ZSkgLyAoMTAgKiogZGVjaW1hbERpZ2l0cyk7XG5cdFx0cmV0dXJuIGZsb29yZWRWYWx1ZS50b0ZpeGVkKGRlY2ltYWxEaWdpdHMpO1xuXHR9O1xuXG5cdGNvbnN0IGFkZCA9ICh2YWx1ZSwgbG9uZywgc2hvcnQsIHZhbHVlU3RyaW5nKSA9PiB7XG5cdFx0aWYgKFxuXHRcdFx0KHJlc3VsdC5sZW5ndGggPT09IDAgfHwgIW9wdGlvbnMuY29sb25Ob3RhdGlvbilcblx0XHRcdCYmIGlzWmVybyh2YWx1ZSlcblx0XHRcdCYmICEob3B0aW9ucy5jb2xvbk5vdGF0aW9uICYmIHNob3J0ID09PSAnbScpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dmFsdWVTdHJpbmcgPz89IFN0cmluZyh2YWx1ZSk7XG5cdFx0aWYgKG9wdGlvbnMuY29sb25Ob3RhdGlvbikge1xuXHRcdFx0Y29uc3Qgd2hvbGVEaWdpdHMgPSB2YWx1ZVN0cmluZy5pbmNsdWRlcygnLicpID8gdmFsdWVTdHJpbmcuc3BsaXQoJy4nKVswXS5sZW5ndGggOiB2YWx1ZVN0cmluZy5sZW5ndGg7XG5cdFx0XHRjb25zdCBtaW5MZW5ndGggPSByZXN1bHQubGVuZ3RoID4gMCA/IDIgOiAxO1xuXHRcdFx0dmFsdWVTdHJpbmcgPSAnMCcucmVwZWF0KE1hdGgubWF4KDAsIG1pbkxlbmd0aCAtIHdob2xlRGlnaXRzKSkgKyB2YWx1ZVN0cmluZztcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFsdWVTdHJpbmcgKz0gb3B0aW9ucy52ZXJib3NlID8gJyAnICsgcGx1cmFsaXplKGxvbmcsIHZhbHVlKSA6IHNob3J0O1xuXHRcdH1cblxuXHRcdHJlc3VsdC5wdXNoKHZhbHVlU3RyaW5nKTtcblx0fTtcblxuXHRjb25zdCBwYXJzZWQgPSBwYXJzZU1pbGxpc2Vjb25kcyhtaWxsaXNlY29uZHMpO1xuXHRjb25zdCBkYXlzID0gQmlnSW50KHBhcnNlZC5kYXlzKTtcblxuXHRpZiAob3B0aW9ucy5oaWRlWWVhckFuZERheXMpIHtcblx0XHRhZGQoKEJpZ0ludChkYXlzKSAqIDI0bikgKyBCaWdJbnQocGFyc2VkLmhvdXJzKSwgJ2hvdXInLCAnaCcpO1xuXHR9IGVsc2Uge1xuXHRcdGlmIChvcHRpb25zLmhpZGVZZWFyKSB7XG5cdFx0XHRhZGQoZGF5cywgJ2RheScsICdkJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGFkZChkYXlzIC8gMzY1biwgJ3llYXInLCAneScpO1xuXHRcdFx0YWRkKGRheXMgJSAzNjVuLCAnZGF5JywgJ2QnKTtcblx0XHR9XG5cblx0XHRhZGQoTnVtYmVyKHBhcnNlZC5ob3VycyksICdob3VyJywgJ2gnKTtcblx0fVxuXG5cdGFkZChOdW1iZXIocGFyc2VkLm1pbnV0ZXMpLCAnbWludXRlJywgJ20nKTtcblxuXHRpZiAoIW9wdGlvbnMuaGlkZVNlY29uZHMpIHtcblx0XHRpZiAoXG5cdFx0XHRvcHRpb25zLnNlcGFyYXRlTWlsbGlzZWNvbmRzXG5cdFx0XHR8fCBvcHRpb25zLmZvcm1hdFN1Yk1pbGxpc2Vjb25kc1xuXHRcdFx0fHwgKCFvcHRpb25zLmNvbG9uTm90YXRpb24gJiYgbWlsbGlzZWNvbmRzIDwgMTAwMClcblx0XHQpIHtcblx0XHRcdGNvbnN0IHNlY29uZHMgPSBOdW1iZXIocGFyc2VkLnNlY29uZHMpO1xuXHRcdFx0Y29uc3QgbWlsbGlzZWNvbmRzID0gTnVtYmVyKHBhcnNlZC5taWxsaXNlY29uZHMpO1xuXHRcdFx0Y29uc3QgbWljcm9zZWNvbmRzID0gTnVtYmVyKHBhcnNlZC5taWNyb3NlY29uZHMpO1xuXHRcdFx0Y29uc3QgbmFub3NlY29uZHMgPSBOdW1iZXIocGFyc2VkLm5hbm9zZWNvbmRzKTtcblxuXHRcdFx0YWRkKHNlY29uZHMsICdzZWNvbmQnLCAncycpO1xuXG5cdFx0XHRpZiAob3B0aW9ucy5mb3JtYXRTdWJNaWxsaXNlY29uZHMpIHtcblx0XHRcdFx0YWRkKG1pbGxpc2Vjb25kcywgJ21pbGxpc2Vjb25kJywgJ21zJyk7XG5cdFx0XHRcdGFkZChtaWNyb3NlY29uZHMsICdtaWNyb3NlY29uZCcsICdcdTAwQjVzJyk7XG5cdFx0XHRcdGFkZChuYW5vc2Vjb25kcywgJ25hbm9zZWNvbmQnLCAnbnMnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IG1pbGxpc2Vjb25kc0FuZEJlbG93XG5cdFx0XHRcdFx0PSBtaWxsaXNlY29uZHNcblx0XHRcdFx0XHQrIChtaWNyb3NlY29uZHMgLyAxMDAwKVxuXHRcdFx0XHRcdCsgKG5hbm9zZWNvbmRzIC8gMWU2KTtcblxuXHRcdFx0XHRjb25zdCBtaWxsaXNlY29uZHNEZWNpbWFsRGlnaXRzXG5cdFx0XHRcdFx0PSB0eXBlb2Ygb3B0aW9ucy5taWxsaXNlY29uZHNEZWNpbWFsRGlnaXRzID09PSAnbnVtYmVyJ1xuXHRcdFx0XHRcdFx0PyBvcHRpb25zLm1pbGxpc2Vjb25kc0RlY2ltYWxEaWdpdHNcblx0XHRcdFx0XHRcdDogMDtcblxuXHRcdFx0XHRjb25zdCByb3VuZGVkTWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmRzQW5kQmVsb3cgPj0gMVxuXHRcdFx0XHRcdD8gTWF0aC5yb3VuZChtaWxsaXNlY29uZHNBbmRCZWxvdylcblx0XHRcdFx0XHQ6IE1hdGguY2VpbChtaWxsaXNlY29uZHNBbmRCZWxvdyk7XG5cblx0XHRcdFx0Y29uc3QgbWlsbGlzZWNvbmRzU3RyaW5nID0gbWlsbGlzZWNvbmRzRGVjaW1hbERpZ2l0c1xuXHRcdFx0XHRcdD8gbWlsbGlzZWNvbmRzQW5kQmVsb3cudG9GaXhlZChtaWxsaXNlY29uZHNEZWNpbWFsRGlnaXRzKVxuXHRcdFx0XHRcdDogcm91bmRlZE1pbGxpc2Vjb25kcztcblxuXHRcdFx0XHRhZGQoXG5cdFx0XHRcdFx0TnVtYmVyLnBhcnNlRmxvYXQobWlsbGlzZWNvbmRzU3RyaW5nKSxcblx0XHRcdFx0XHQnbWlsbGlzZWNvbmQnLFxuXHRcdFx0XHRcdCdtcycsXG5cdFx0XHRcdFx0bWlsbGlzZWNvbmRzU3RyaW5nLFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBzZWNvbmRzID0gKFxuXHRcdFx0XHQoaXNCaWdJbnQgPyBOdW1iZXIobWlsbGlzZWNvbmRzICUgT05FX0RBWV9JTl9NSUxMSVNFQ09ORFMpIDogbWlsbGlzZWNvbmRzKVxuXHRcdFx0XHQvIDEwMDBcblx0XHRcdCkgJSA2MDtcblx0XHRcdGNvbnN0IHNlY29uZHNEZWNpbWFsRGlnaXRzXG5cdFx0XHRcdD0gdHlwZW9mIG9wdGlvbnMuc2Vjb25kc0RlY2ltYWxEaWdpdHMgPT09ICdudW1iZXInXG5cdFx0XHRcdFx0PyBvcHRpb25zLnNlY29uZHNEZWNpbWFsRGlnaXRzXG5cdFx0XHRcdFx0OiAxO1xuXHRcdFx0Y29uc3Qgc2Vjb25kc0ZpeGVkID0gZmxvb3JEZWNpbWFscyhzZWNvbmRzLCBzZWNvbmRzRGVjaW1hbERpZ2l0cyk7XG5cdFx0XHRjb25zdCBzZWNvbmRzU3RyaW5nID0gb3B0aW9ucy5rZWVwRGVjaW1hbHNPbldob2xlU2Vjb25kc1xuXHRcdFx0XHQ/IHNlY29uZHNGaXhlZFxuXHRcdFx0XHQ6IHNlY29uZHNGaXhlZC5yZXBsYWNlKC9cXC4wKyQvLCAnJyk7XG5cdFx0XHRhZGQoTnVtYmVyLnBhcnNlRmxvYXQoc2Vjb25kc1N0cmluZyksICdzZWNvbmQnLCAncycsIHNlY29uZHNTdHJpbmcpO1xuXHRcdH1cblx0fVxuXG5cdGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuIHNpZ24gKyAnMCcgKyAob3B0aW9ucy52ZXJib3NlID8gJyBtaWxsaXNlY29uZHMnIDogJ21zJyk7XG5cdH1cblxuXHRjb25zdCBzZXBhcmF0b3IgPSBvcHRpb25zLmNvbG9uTm90YXRpb24gPyAnOicgOiAnICc7XG5cdGlmICh0eXBlb2Ygb3B0aW9ucy51bml0Q291bnQgPT09ICdudW1iZXInKSB7XG5cdFx0cmVzdWx0ID0gcmVzdWx0LnNsaWNlKDAsIE1hdGgubWF4KG9wdGlvbnMudW5pdENvdW50LCAxKSk7XG5cdH1cblxuXHRyZXR1cm4gc2lnbiArIHJlc3VsdC5qb2luKHNlcGFyYXRvcik7XG59XG4iLCAiaW1wb3J0IHt2ZXJib3NlTG9nfSBmcm9tICcuL2xvZy5qcyc7XG5cbi8vIFdoZW4gYHZlcmJvc2VgIGlzIGBzaG9ydHxmdWxsfGN1c3RvbWAsIHByaW50IGVhY2ggY29tbWFuZCdzIGVycm9yIHdoZW4gaXQgZmFpbHNcbmV4cG9ydCBjb25zdCBsb2dFcnJvciA9IChyZXN1bHQsIHZlcmJvc2VJbmZvKSA9PiB7XG5cdGlmIChyZXN1bHQuZmFpbGVkKSB7XG5cdFx0dmVyYm9zZUxvZyh7XG5cdFx0XHR0eXBlOiAnZXJyb3InLFxuXHRcdFx0dmVyYm9zZU1lc3NhZ2U6IHJlc3VsdC5zaG9ydE1lc3NhZ2UsXG5cdFx0XHR2ZXJib3NlSW5mbyxcblx0XHRcdHJlc3VsdCxcblx0XHR9KTtcblx0fVxufTtcbiIsICJpbXBvcnQgcHJldHR5TXMgZnJvbSAncHJldHR5LW1zJztcbmltcG9ydCB7aXNWZXJib3NlfSBmcm9tICcuL3ZhbHVlcy5qcyc7XG5pbXBvcnQge3ZlcmJvc2VMb2d9IGZyb20gJy4vbG9nLmpzJztcbmltcG9ydCB7bG9nRXJyb3J9IGZyb20gJy4vZXJyb3IuanMnO1xuXG4vLyBXaGVuIGB2ZXJib3NlYCBpcyBgc2hvcnR8ZnVsbHxjdXN0b21gLCBwcmludCBlYWNoIGNvbW1hbmQncyBjb21wbGV0aW9uLCBkdXJhdGlvbiBhbmQgZXJyb3JcbmV4cG9ydCBjb25zdCBsb2dSZXN1bHQgPSAocmVzdWx0LCB2ZXJib3NlSW5mbykgPT4ge1xuXHRpZiAoIWlzVmVyYm9zZSh2ZXJib3NlSW5mbykpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRsb2dFcnJvcihyZXN1bHQsIHZlcmJvc2VJbmZvKTtcblx0bG9nRHVyYXRpb24ocmVzdWx0LCB2ZXJib3NlSW5mbyk7XG59O1xuXG5jb25zdCBsb2dEdXJhdGlvbiA9IChyZXN1bHQsIHZlcmJvc2VJbmZvKSA9PiB7XG5cdGNvbnN0IHZlcmJvc2VNZXNzYWdlID0gYChkb25lIGluICR7cHJldHR5TXMocmVzdWx0LmR1cmF0aW9uTXMpfSlgO1xuXHR2ZXJib3NlTG9nKHtcblx0XHR0eXBlOiAnZHVyYXRpb24nLFxuXHRcdHZlcmJvc2VNZXNzYWdlLFxuXHRcdHZlcmJvc2VJbmZvLFxuXHRcdHJlc3VsdCxcblx0fSk7XG59O1xuIiwgImltcG9ydCB7bG9nUmVzdWx0fSBmcm9tICcuLi92ZXJib3NlL2NvbXBsZXRlLmpzJztcblxuLy8gQXBwbGllcyB0aGUgYHJlamVjdGAgb3B0aW9uLlxuLy8gQWxzbyBwcmludCB0aGUgZmluYWwgbG9nIGxpbmUgd2l0aCBgdmVyYm9zZWAuXG5leHBvcnQgY29uc3QgaGFuZGxlUmVzdWx0ID0gKHJlc3VsdCwgdmVyYm9zZUluZm8sIHtyZWplY3R9KSA9PiB7XG5cdGxvZ1Jlc3VsdChyZXN1bHQsIHZlcmJvc2VJbmZvKTtcblxuXHRpZiAocmVzdWx0LmZhaWxlZCAmJiByZWplY3QpIHtcblx0XHR0aHJvdyByZXN1bHQ7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiIsICJpbXBvcnQge2lzU3RyZWFtIGFzIGlzTm9kZVN0cmVhbSwgaXNEdXBsZXhTdHJlYW19IGZyb20gJ2lzLXN0cmVhbSc7XG5pbXBvcnQgaXNQbGFpbk9iaiBmcm9tICdpcy1wbGFpbi1vYmonO1xuaW1wb3J0IHtpc1VpbnQ4QXJyYXl9IGZyb20gJy4uL3V0aWxzL3VpbnQtYXJyYXkuanMnO1xuXG4vLyBUaGUgYHN0ZGluYC9gc3Rkb3V0YC9gc3RkZXJyYCBvcHRpb24gY2FuIGJlIG9mIG1hbnkgdHlwZXMuIFRoaXMgZGV0ZWN0cyBpdC5cbmV4cG9ydCBjb25zdCBnZXRTdGRpb0l0ZW1UeXBlID0gKHZhbHVlLCBvcHRpb25OYW1lKSA9PiB7XG5cdGlmIChpc0FzeW5jR2VuZXJhdG9yKHZhbHVlKSkge1xuXHRcdHJldHVybiAnYXN5bmNHZW5lcmF0b3InO1xuXHR9XG5cblx0aWYgKGlzU3luY0dlbmVyYXRvcih2YWx1ZSkpIHtcblx0XHRyZXR1cm4gJ2dlbmVyYXRvcic7XG5cdH1cblxuXHRpZiAoaXNVcmwodmFsdWUpKSB7XG5cdFx0cmV0dXJuICdmaWxlVXJsJztcblx0fVxuXG5cdGlmIChpc0ZpbGVQYXRoT2JqZWN0KHZhbHVlKSkge1xuXHRcdHJldHVybiAnZmlsZVBhdGgnO1xuXHR9XG5cblx0aWYgKGlzV2ViU3RyZWFtKHZhbHVlKSkge1xuXHRcdHJldHVybiAnd2ViU3RyZWFtJztcblx0fVxuXG5cdGlmIChpc05vZGVTdHJlYW0odmFsdWUsIHtjaGVja09wZW46IGZhbHNlfSkpIHtcblx0XHRyZXR1cm4gJ25hdGl2ZSc7XG5cdH1cblxuXHRpZiAoaXNVaW50OEFycmF5KHZhbHVlKSkge1xuXHRcdHJldHVybiAndWludDhBcnJheSc7XG5cdH1cblxuXHRpZiAoaXNBc3luY0l0ZXJhYmxlT2JqZWN0KHZhbHVlKSkge1xuXHRcdHJldHVybiAnYXN5bmNJdGVyYWJsZSc7XG5cdH1cblxuXHRpZiAoaXNJdGVyYWJsZU9iamVjdCh2YWx1ZSkpIHtcblx0XHRyZXR1cm4gJ2l0ZXJhYmxlJztcblx0fVxuXG5cdGlmIChpc1RyYW5zZm9ybVN0cmVhbSh2YWx1ZSkpIHtcblx0XHRyZXR1cm4gZ2V0VHJhbnNmb3JtU3RyZWFtVHlwZSh7dHJhbnNmb3JtOiB2YWx1ZX0sIG9wdGlvbk5hbWUpO1xuXHR9XG5cblx0aWYgKGlzVHJhbnNmb3JtT3B0aW9ucyh2YWx1ZSkpIHtcblx0XHRyZXR1cm4gZ2V0VHJhbnNmb3JtT2JqZWN0VHlwZSh2YWx1ZSwgb3B0aW9uTmFtZSk7XG5cdH1cblxuXHRyZXR1cm4gJ25hdGl2ZSc7XG59O1xuXG5jb25zdCBnZXRUcmFuc2Zvcm1PYmplY3RUeXBlID0gKHZhbHVlLCBvcHRpb25OYW1lKSA9PiB7XG5cdGlmIChpc0R1cGxleFN0cmVhbSh2YWx1ZS50cmFuc2Zvcm0sIHtjaGVja09wZW46IGZhbHNlfSkpIHtcblx0XHRyZXR1cm4gZ2V0RHVwbGV4VHlwZSh2YWx1ZSwgb3B0aW9uTmFtZSk7XG5cdH1cblxuXHRpZiAoaXNUcmFuc2Zvcm1TdHJlYW0odmFsdWUudHJhbnNmb3JtKSkge1xuXHRcdHJldHVybiBnZXRUcmFuc2Zvcm1TdHJlYW1UeXBlKHZhbHVlLCBvcHRpb25OYW1lKTtcblx0fVxuXG5cdHJldHVybiBnZXRHZW5lcmF0b3JPYmplY3RUeXBlKHZhbHVlLCBvcHRpb25OYW1lKTtcbn07XG5cbmNvbnN0IGdldER1cGxleFR5cGUgPSAodmFsdWUsIG9wdGlvbk5hbWUpID0+IHtcblx0dmFsaWRhdGVOb25HZW5lcmF0b3JUeXBlKHZhbHVlLCBvcHRpb25OYW1lLCAnRHVwbGV4IHN0cmVhbScpO1xuXHRyZXR1cm4gJ2R1cGxleCc7XG59O1xuXG5jb25zdCBnZXRUcmFuc2Zvcm1TdHJlYW1UeXBlID0gKHZhbHVlLCBvcHRpb25OYW1lKSA9PiB7XG5cdHZhbGlkYXRlTm9uR2VuZXJhdG9yVHlwZSh2YWx1ZSwgb3B0aW9uTmFtZSwgJ3dlYiBUcmFuc2Zvcm1TdHJlYW0nKTtcblx0cmV0dXJuICd3ZWJUcmFuc2Zvcm0nO1xufTtcblxuY29uc3QgdmFsaWRhdGVOb25HZW5lcmF0b3JUeXBlID0gKHtmaW5hbCwgYmluYXJ5LCBvYmplY3RNb2RlfSwgb3B0aW9uTmFtZSwgdHlwZU5hbWUpID0+IHtcblx0Y2hlY2tVbmRlZmluZWRPcHRpb24oZmluYWwsIGAke29wdGlvbk5hbWV9LmZpbmFsYCwgdHlwZU5hbWUpO1xuXHRjaGVja1VuZGVmaW5lZE9wdGlvbihiaW5hcnksIGAke29wdGlvbk5hbWV9LmJpbmFyeWAsIHR5cGVOYW1lKTtcblx0Y2hlY2tCb29sZWFuT3B0aW9uKG9iamVjdE1vZGUsIGAke29wdGlvbk5hbWV9Lm9iamVjdE1vZGVgKTtcbn07XG5cbmNvbnN0IGNoZWNrVW5kZWZpbmVkT3B0aW9uID0gKHZhbHVlLCBvcHRpb25OYW1lLCB0eXBlTmFtZSkgPT4ge1xuXHRpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBcXGAke29wdGlvbk5hbWV9XFxgIG9wdGlvbiBjYW4gb25seSBiZSBkZWZpbmVkIHdoZW4gdXNpbmcgYSBnZW5lcmF0b3IsIG5vdCBhICR7dHlwZU5hbWV9LmApO1xuXHR9XG59O1xuXG5jb25zdCBnZXRHZW5lcmF0b3JPYmplY3RUeXBlID0gKHt0cmFuc2Zvcm0sIGZpbmFsLCBiaW5hcnksIG9iamVjdE1vZGV9LCBvcHRpb25OYW1lKSA9PiB7XG5cdGlmICh0cmFuc2Zvcm0gIT09IHVuZGVmaW5lZCAmJiAhaXNHZW5lcmF0b3IodHJhbnNmb3JtKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBcXGAke29wdGlvbk5hbWV9LnRyYW5zZm9ybVxcYCBvcHRpb24gbXVzdCBiZSBhIGdlbmVyYXRvciwgYSBEdXBsZXggc3RyZWFtIG9yIGEgd2ViIFRyYW5zZm9ybVN0cmVhbS5gKTtcblx0fVxuXG5cdGlmIChpc0R1cGxleFN0cmVhbShmaW5hbCwge2NoZWNrT3BlbjogZmFsc2V9KSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBcXGAke29wdGlvbk5hbWV9LmZpbmFsXFxgIG9wdGlvbiBtdXN0IG5vdCBiZSBhIER1cGxleCBzdHJlYW0uYCk7XG5cdH1cblxuXHRpZiAoaXNUcmFuc2Zvcm1TdHJlYW0oZmluYWwpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlIFxcYCR7b3B0aW9uTmFtZX0uZmluYWxcXGAgb3B0aW9uIG11c3Qgbm90IGJlIGEgd2ViIFRyYW5zZm9ybVN0cmVhbS5gKTtcblx0fVxuXG5cdGlmIChmaW5hbCAhPT0gdW5kZWZpbmVkICYmICFpc0dlbmVyYXRvcihmaW5hbCkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgXFxgJHtvcHRpb25OYW1lfS5maW5hbFxcYCBvcHRpb24gbXVzdCBiZSBhIGdlbmVyYXRvci5gKTtcblx0fVxuXG5cdGNoZWNrQm9vbGVhbk9wdGlvbihiaW5hcnksIGAke29wdGlvbk5hbWV9LmJpbmFyeWApO1xuXHRjaGVja0Jvb2xlYW5PcHRpb24ob2JqZWN0TW9kZSwgYCR7b3B0aW9uTmFtZX0ub2JqZWN0TW9kZWApO1xuXG5cdHJldHVybiBpc0FzeW5jR2VuZXJhdG9yKHRyYW5zZm9ybSkgfHwgaXNBc3luY0dlbmVyYXRvcihmaW5hbCkgPyAnYXN5bmNHZW5lcmF0b3InIDogJ2dlbmVyYXRvcic7XG59O1xuXG5jb25zdCBjaGVja0Jvb2xlYW5PcHRpb24gPSAodmFsdWUsIG9wdGlvbk5hbWUpID0+IHtcblx0aWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHZhbHVlICE9PSAnYm9vbGVhbicpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgXFxgJHtvcHRpb25OYW1lfVxcYCBvcHRpb24gbXVzdCB1c2UgYSBib29sZWFuLmApO1xuXHR9XG59O1xuXG5jb25zdCBpc0dlbmVyYXRvciA9IHZhbHVlID0+IGlzQXN5bmNHZW5lcmF0b3IodmFsdWUpIHx8IGlzU3luY0dlbmVyYXRvcih2YWx1ZSk7XG5leHBvcnQgY29uc3QgaXNBc3luY0dlbmVyYXRvciA9IHZhbHVlID0+IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFzeW5jR2VuZXJhdG9yRnVuY3Rpb25dJztcbmNvbnN0IGlzU3luY0dlbmVyYXRvciA9IHZhbHVlID0+IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG5jb25zdCBpc1RyYW5zZm9ybU9wdGlvbnMgPSB2YWx1ZSA9PiBpc1BsYWluT2JqKHZhbHVlKVxuXHQmJiAodmFsdWUudHJhbnNmb3JtICE9PSB1bmRlZmluZWQgfHwgdmFsdWUuZmluYWwgIT09IHVuZGVmaW5lZCk7XG5cbmV4cG9ydCBjb25zdCBpc1VybCA9IHZhbHVlID0+IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IFVSTF0nO1xuZXhwb3J0IGNvbnN0IGlzUmVndWxhclVybCA9IHZhbHVlID0+IGlzVXJsKHZhbHVlKSAmJiB2YWx1ZS5wcm90b2NvbCAhPT0gJ2ZpbGU6JztcblxuY29uc3QgaXNGaWxlUGF0aE9iamVjdCA9IHZhbHVlID0+IGlzUGxhaW5PYmoodmFsdWUpXG5cdCYmIE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPiAwXG5cdCYmIE9iamVjdC5rZXlzKHZhbHVlKS5ldmVyeShrZXkgPT4gRklMRV9QQVRIX0tFWVMuaGFzKGtleSkpXG5cdCYmIGlzRmlsZVBhdGhTdHJpbmcodmFsdWUuZmlsZSk7XG5jb25zdCBGSUxFX1BBVEhfS0VZUyA9IG5ldyBTZXQoWydmaWxlJywgJ2FwcGVuZCddKTtcbmV4cG9ydCBjb25zdCBpc0ZpbGVQYXRoU3RyaW5nID0gZmlsZSA9PiB0eXBlb2YgZmlsZSA9PT0gJ3N0cmluZyc7XG5cbmV4cG9ydCBjb25zdCBpc1Vua25vd25TdGRpb1N0cmluZyA9ICh0eXBlLCB2YWx1ZSkgPT4gdHlwZSA9PT0gJ25hdGl2ZSdcblx0JiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJ1xuXHQmJiAhS05PV05fU1RESU9fU1RSSU5HUy5oYXModmFsdWUpO1xuY29uc3QgS05PV05fU1RESU9fU1RSSU5HUyA9IG5ldyBTZXQoWydpcGMnLCAnaWdub3JlJywgJ2luaGVyaXQnLCAnb3ZlcmxhcHBlZCcsICdwaXBlJ10pO1xuXG5jb25zdCBpc1JlYWRhYmxlU3RyZWFtID0gdmFsdWUgPT4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgUmVhZGFibGVTdHJlYW1dJztcbmV4cG9ydCBjb25zdCBpc1dyaXRhYmxlU3RyZWFtID0gdmFsdWUgPT4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgV3JpdGFibGVTdHJlYW1dJztcbmNvbnN0IGlzV2ViU3RyZWFtID0gdmFsdWUgPT4gaXNSZWFkYWJsZVN0cmVhbSh2YWx1ZSkgfHwgaXNXcml0YWJsZVN0cmVhbSh2YWx1ZSk7XG5jb25zdCBpc1RyYW5zZm9ybVN0cmVhbSA9IHZhbHVlID0+IGlzUmVhZGFibGVTdHJlYW0odmFsdWU/LnJlYWRhYmxlKSAmJiBpc1dyaXRhYmxlU3RyZWFtKHZhbHVlPy53cml0YWJsZSk7XG5cbmNvbnN0IGlzQXN5bmNJdGVyYWJsZU9iamVjdCA9IHZhbHVlID0+IGlzT2JqZWN0KHZhbHVlKSAmJiB0eXBlb2YgdmFsdWVbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID09PSAnZnVuY3Rpb24nO1xuY29uc3QgaXNJdGVyYWJsZU9iamVjdCA9IHZhbHVlID0+IGlzT2JqZWN0KHZhbHVlKSAmJiB0eXBlb2YgdmFsdWVbU3ltYm9sLml0ZXJhdG9yXSA9PT0gJ2Z1bmN0aW9uJztcbmNvbnN0IGlzT2JqZWN0ID0gdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbDtcblxuLy8gVHlwZXMgd2hpY2ggbW9kaWZ5IGBzdWJwcm9jZXNzLnN0ZCpgXG5leHBvcnQgY29uc3QgVFJBTlNGT1JNX1RZUEVTID0gbmV3IFNldChbJ2dlbmVyYXRvcicsICdhc3luY0dlbmVyYXRvcicsICdkdXBsZXgnLCAnd2ViVHJhbnNmb3JtJ10pO1xuLy8gVHlwZXMgd2hpY2ggd3JpdGUgdG8gYSBmaWxlIG9yIGEgZmlsZSBkZXNjcmlwdG9yXG5leHBvcnQgY29uc3QgRklMRV9UWVBFUyA9IG5ldyBTZXQoWydmaWxlVXJsJywgJ2ZpbGVQYXRoJywgJ2ZpbGVOdW1iZXInXSk7XG4vLyBXaGVuIHR3byBmaWxlIGRlc2NyaXB0b3JzIG9mIHRoaXMgdHlwZSBzaGFyZSB0aGUgc2FtZSB0YXJnZXQsIHdlIG5lZWQgdG8gZG8gc29tZSBzcGVjaWFsIGxvZ2ljXG5leHBvcnQgY29uc3QgU1BFQ0lBTF9EVVBMSUNBVEVfVFlQRVNfU1lOQyA9IG5ldyBTZXQoWydmaWxlVXJsJywgJ2ZpbGVQYXRoJ10pO1xuZXhwb3J0IGNvbnN0IFNQRUNJQUxfRFVQTElDQVRFX1RZUEVTID0gbmV3IFNldChbLi4uU1BFQ0lBTF9EVVBMSUNBVEVfVFlQRVNfU1lOQywgJ3dlYlN0cmVhbScsICdub2RlU3RyZWFtJ10pO1xuLy8gRG8gbm90IGFsbG93IHR3byBmaWxlIGRlc2NyaXB0b3JzIG9mIHRoaXMgdHlwZSBzaGFyaW5nIHRoZSBzYW1lIHRhcmdldFxuZXhwb3J0IGNvbnN0IEZPUkJJRF9EVVBMSUNBVEVfVFlQRVMgPSBuZXcgU2V0KFsnd2ViVHJhbnNmb3JtJywgJ2R1cGxleCddKTtcblxuLy8gQ29udmVydCB0eXBlcyB0byBodW1hbi1mcmllbmRseSBzdHJpbmdzIGZvciBlcnJvciBtZXNzYWdlc1xuZXhwb3J0IGNvbnN0IFRZUEVfVE9fTUVTU0FHRSA9IHtcblx0Z2VuZXJhdG9yOiAnYSBnZW5lcmF0b3InLFxuXHRhc3luY0dlbmVyYXRvcjogJ2FuIGFzeW5jIGdlbmVyYXRvcicsXG5cdGZpbGVVcmw6ICdhIGZpbGUgVVJMJyxcblx0ZmlsZVBhdGg6ICdhIGZpbGUgcGF0aCBzdHJpbmcnLFxuXHRmaWxlTnVtYmVyOiAnYSBmaWxlIGRlc2NyaXB0b3IgbnVtYmVyJyxcblx0d2ViU3RyZWFtOiAnYSB3ZWIgc3RyZWFtJyxcblx0bm9kZVN0cmVhbTogJ2EgTm9kZS5qcyBzdHJlYW0nLFxuXHR3ZWJUcmFuc2Zvcm06ICdhIHdlYiBUcmFuc2Zvcm1TdHJlYW0nLFxuXHRkdXBsZXg6ICdhIER1cGxleCBzdHJlYW0nLFxuXHRuYXRpdmU6ICdhbnkgdmFsdWUnLFxuXHRpdGVyYWJsZTogJ2FuIGl0ZXJhYmxlJyxcblx0YXN5bmNJdGVyYWJsZTogJ2FuIGFzeW5jIGl0ZXJhYmxlJyxcblx0c3RyaW5nOiAnYSBzdHJpbmcnLFxuXHR1aW50OEFycmF5OiAnYSBVaW50OEFycmF5Jyxcbn07XG4iLCAiaW1wb3J0IHtUUkFOU0ZPUk1fVFlQRVN9IGZyb20gJy4uL3N0ZGlvL3R5cGUuanMnO1xuXG4vKlxuUmV0cmlldmUgdGhlIGBvYmplY3RNb2RlYHMgb2YgYSBzaW5nbGUgdHJhbnNmb3JtLlxuYG9iamVjdE1vZGVgIGRldGVybWluZXMgdGhlIHJldHVybiB2YWx1ZSdzIHR5cGUsIGkuZS4gdGhlIGByZWFkYWJsZU9iamVjdE1vZGVgLlxuVGhlIGNodW5rIGFyZ3VtZW50J3MgdHlwZSBpcyBiYXNlZCBvbiB0aGUgcHJldmlvdXMgZ2VuZXJhdG9yJ3MgcmV0dXJuIHZhbHVlLCBpLmUuIHRoZSBgd3JpdGFibGVPYmplY3RNb2RlYCBpcyBiYXNlZCBvbiB0aGUgcHJldmlvdXMgYHJlYWRhYmxlT2JqZWN0TW9kZWAuXG5UaGUgbGFzdCBpbnB1dCdzIGdlbmVyYXRvciBpcyByZWFkIGJ5IGBzdWJwcm9jZXNzLnN0ZGluYCB3aGljaDpcbi0gc2hvdWxkIG5vdCBiZSBpbiBgb2JqZWN0TW9kZWAgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMuXG4tIGNhbiBvbmx5IGJlIHN0cmluZ3MsIEJ1ZmZlcnMgYW5kIFVpbnQ4QXJyYXlzLlxuVGhlcmVmb3JlIGl0cyBgcmVhZGFibGVPYmplY3RNb2RlYCBtdXN0IGJlIGBmYWxzZWAuXG5UaGUgc2FtZSBhcHBsaWVzIHRvIHRoZSBmaXJzdCBvdXRwdXQncyBnZW5lcmF0b3IncyBgd3JpdGFibGVPYmplY3RNb2RlYC5cbiovXG5leHBvcnQgY29uc3QgZ2V0VHJhbnNmb3JtT2JqZWN0TW9kZXMgPSAob2JqZWN0TW9kZSwgaW5kZXgsIG5ld1RyYW5zZm9ybXMsIGRpcmVjdGlvbikgPT4gZGlyZWN0aW9uID09PSAnb3V0cHV0J1xuXHQ/IGdldE91dHB1dE9iamVjdE1vZGVzKG9iamVjdE1vZGUsIGluZGV4LCBuZXdUcmFuc2Zvcm1zKVxuXHQ6IGdldElucHV0T2JqZWN0TW9kZXMob2JqZWN0TW9kZSwgaW5kZXgsIG5ld1RyYW5zZm9ybXMpO1xuXG5jb25zdCBnZXRPdXRwdXRPYmplY3RNb2RlcyA9IChvYmplY3RNb2RlLCBpbmRleCwgbmV3VHJhbnNmb3JtcykgPT4ge1xuXHRjb25zdCB3cml0YWJsZU9iamVjdE1vZGUgPSBpbmRleCAhPT0gMCAmJiBuZXdUcmFuc2Zvcm1zW2luZGV4IC0gMV0udmFsdWUucmVhZGFibGVPYmplY3RNb2RlO1xuXHRjb25zdCByZWFkYWJsZU9iamVjdE1vZGUgPSBvYmplY3RNb2RlID8/IHdyaXRhYmxlT2JqZWN0TW9kZTtcblx0cmV0dXJuIHt3cml0YWJsZU9iamVjdE1vZGUsIHJlYWRhYmxlT2JqZWN0TW9kZX07XG59O1xuXG5jb25zdCBnZXRJbnB1dE9iamVjdE1vZGVzID0gKG9iamVjdE1vZGUsIGluZGV4LCBuZXdUcmFuc2Zvcm1zKSA9PiB7XG5cdGNvbnN0IHdyaXRhYmxlT2JqZWN0TW9kZSA9IGluZGV4ID09PSAwXG5cdFx0PyBvYmplY3RNb2RlID09PSB0cnVlXG5cdFx0OiBuZXdUcmFuc2Zvcm1zW2luZGV4IC0gMV0udmFsdWUucmVhZGFibGVPYmplY3RNb2RlO1xuXHRjb25zdCByZWFkYWJsZU9iamVjdE1vZGUgPSBpbmRleCAhPT0gbmV3VHJhbnNmb3Jtcy5sZW5ndGggLSAxICYmIChvYmplY3RNb2RlID8/IHdyaXRhYmxlT2JqZWN0TW9kZSk7XG5cdHJldHVybiB7d3JpdGFibGVPYmplY3RNb2RlLCByZWFkYWJsZU9iamVjdE1vZGV9O1xufTtcblxuLy8gUmV0cmlldmUgdGhlIGBvYmplY3RNb2RlYCBvZiBhIGZpbGUgZGVzY3JpcHRvciwgZS5nLiBgc3Rkb3V0YCBvciBgc3RkZXJyYFxuZXhwb3J0IGNvbnN0IGdldEZkT2JqZWN0TW9kZSA9IChzdGRpb0l0ZW1zLCBkaXJlY3Rpb24pID0+IHtcblx0Y29uc3QgbGFzdFRyYW5zZm9ybSA9IHN0ZGlvSXRlbXMuZmluZExhc3QoKHt0eXBlfSkgPT4gVFJBTlNGT1JNX1RZUEVTLmhhcyh0eXBlKSk7XG5cdGlmIChsYXN0VHJhbnNmb3JtID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRyZXR1cm4gZGlyZWN0aW9uID09PSAnaW5wdXQnXG5cdFx0PyBsYXN0VHJhbnNmb3JtLnZhbHVlLndyaXRhYmxlT2JqZWN0TW9kZVxuXHRcdDogbGFzdFRyYW5zZm9ybS52YWx1ZS5yZWFkYWJsZU9iamVjdE1vZGU7XG59O1xuIiwgImltcG9ydCBpc1BsYWluT2JqIGZyb20gJ2lzLXBsYWluLW9iaic7XG5pbXBvcnQge0JJTkFSWV9FTkNPRElOR1N9IGZyb20gJy4uL2FyZ3VtZW50cy9lbmNvZGluZy1vcHRpb24uanMnO1xuaW1wb3J0IHtUUkFOU0ZPUk1fVFlQRVN9IGZyb20gJy4uL3N0ZGlvL3R5cGUuanMnO1xuaW1wb3J0IHtnZXRUcmFuc2Zvcm1PYmplY3RNb2Rlc30gZnJvbSAnLi9vYmplY3QtbW9kZS5qcyc7XG5cbi8vIFRyYW5zZm9ybXMgZ2VuZXJhdG9ycy9kdXBsZXgvVHJhbnNmb3JtU3RyZWFtIGNhbiBoYXZlIG11bHRpcGxlIHNoYXBlcy5cbi8vIFRoaXMgbm9ybWFsaXplcyBpdCBhbmQgYXBwbGllcyBkZWZhdWx0IHZhbHVlcy5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVUcmFuc2Zvcm1zID0gKHN0ZGlvSXRlbXMsIG9wdGlvbk5hbWUsIGRpcmVjdGlvbiwgb3B0aW9ucykgPT4gW1xuXHQuLi5zdGRpb0l0ZW1zLmZpbHRlcigoe3R5cGV9KSA9PiAhVFJBTlNGT1JNX1RZUEVTLmhhcyh0eXBlKSksXG5cdC4uLmdldFRyYW5zZm9ybXMoc3RkaW9JdGVtcywgb3B0aW9uTmFtZSwgZGlyZWN0aW9uLCBvcHRpb25zKSxcbl07XG5cbmNvbnN0IGdldFRyYW5zZm9ybXMgPSAoc3RkaW9JdGVtcywgb3B0aW9uTmFtZSwgZGlyZWN0aW9uLCB7ZW5jb2Rpbmd9KSA9PiB7XG5cdGNvbnN0IHRyYW5zZm9ybXMgPSBzdGRpb0l0ZW1zLmZpbHRlcigoe3R5cGV9KSA9PiBUUkFOU0ZPUk1fVFlQRVMuaGFzKHR5cGUpKTtcblx0Y29uc3QgbmV3VHJhbnNmb3JtcyA9IEFycmF5LmZyb20oe2xlbmd0aDogdHJhbnNmb3Jtcy5sZW5ndGh9KTtcblxuXHRmb3IgKGNvbnN0IFtpbmRleCwgc3RkaW9JdGVtXSBvZiBPYmplY3QuZW50cmllcyh0cmFuc2Zvcm1zKSkge1xuXHRcdG5ld1RyYW5zZm9ybXNbaW5kZXhdID0gbm9ybWFsaXplVHJhbnNmb3JtKHtcblx0XHRcdHN0ZGlvSXRlbSxcblx0XHRcdGluZGV4OiBOdW1iZXIoaW5kZXgpLFxuXHRcdFx0bmV3VHJhbnNmb3Jtcyxcblx0XHRcdG9wdGlvbk5hbWUsXG5cdFx0XHRkaXJlY3Rpb24sXG5cdFx0XHRlbmNvZGluZyxcblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiBzb3J0VHJhbnNmb3JtcyhuZXdUcmFuc2Zvcm1zLCBkaXJlY3Rpb24pO1xufTtcblxuY29uc3Qgbm9ybWFsaXplVHJhbnNmb3JtID0gKHtzdGRpb0l0ZW0sIHN0ZGlvSXRlbToge3R5cGV9LCBpbmRleCwgbmV3VHJhbnNmb3Jtcywgb3B0aW9uTmFtZSwgZGlyZWN0aW9uLCBlbmNvZGluZ30pID0+IHtcblx0aWYgKHR5cGUgPT09ICdkdXBsZXgnKSB7XG5cdFx0cmV0dXJuIG5vcm1hbGl6ZUR1cGxleCh7c3RkaW9JdGVtLCBvcHRpb25OYW1lfSk7XG5cdH1cblxuXHRpZiAodHlwZSA9PT0gJ3dlYlRyYW5zZm9ybScpIHtcblx0XHRyZXR1cm4gbm9ybWFsaXplVHJhbnNmb3JtU3RyZWFtKHtcblx0XHRcdHN0ZGlvSXRlbSxcblx0XHRcdGluZGV4LFxuXHRcdFx0bmV3VHJhbnNmb3Jtcyxcblx0XHRcdGRpcmVjdGlvbixcblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiBub3JtYWxpemVHZW5lcmF0b3Ioe1xuXHRcdHN0ZGlvSXRlbSxcblx0XHRpbmRleCxcblx0XHRuZXdUcmFuc2Zvcm1zLFxuXHRcdGRpcmVjdGlvbixcblx0XHRlbmNvZGluZyxcblx0fSk7XG59O1xuXG5jb25zdCBub3JtYWxpemVEdXBsZXggPSAoe1xuXHRzdGRpb0l0ZW0sXG5cdHN0ZGlvSXRlbToge1xuXHRcdHZhbHVlOiB7XG5cdFx0XHR0cmFuc2Zvcm0sXG5cdFx0XHR0cmFuc2Zvcm06IHt3cml0YWJsZU9iamVjdE1vZGUsIHJlYWRhYmxlT2JqZWN0TW9kZX0sXG5cdFx0XHRvYmplY3RNb2RlID0gcmVhZGFibGVPYmplY3RNb2RlLFxuXHRcdH0sXG5cdH0sXG5cdG9wdGlvbk5hbWUsXG59KSA9PiB7XG5cdGlmIChvYmplY3RNb2RlICYmICFyZWFkYWJsZU9iamVjdE1vZGUpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgXFxgJHtvcHRpb25OYW1lfS5vYmplY3RNb2RlXFxgIG9wdGlvbiBjYW4gb25seSBiZSBcXGB0cnVlXFxgIGlmIFxcYG5ldyBEdXBsZXgoe29iamVjdE1vZGU6IHRydWV9KVxcYCBpcyB1c2VkLmApO1xuXHR9XG5cblx0aWYgKCFvYmplY3RNb2RlICYmIHJlYWRhYmxlT2JqZWN0TW9kZSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBcXGAke29wdGlvbk5hbWV9Lm9iamVjdE1vZGVcXGAgb3B0aW9uIGNhbm5vdCBiZSBcXGBmYWxzZVxcYCBpZiBcXGBuZXcgRHVwbGV4KHtvYmplY3RNb2RlOiB0cnVlfSlcXGAgaXMgdXNlZC5gKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0Li4uc3RkaW9JdGVtLFxuXHRcdHZhbHVlOiB7dHJhbnNmb3JtLCB3cml0YWJsZU9iamVjdE1vZGUsIHJlYWRhYmxlT2JqZWN0TW9kZX0sXG5cdH07XG59O1xuXG5jb25zdCBub3JtYWxpemVUcmFuc2Zvcm1TdHJlYW0gPSAoe3N0ZGlvSXRlbSwgc3RkaW9JdGVtOiB7dmFsdWV9LCBpbmRleCwgbmV3VHJhbnNmb3JtcywgZGlyZWN0aW9ufSkgPT4ge1xuXHRjb25zdCB7dHJhbnNmb3JtLCBvYmplY3RNb2RlfSA9IGlzUGxhaW5PYmoodmFsdWUpID8gdmFsdWUgOiB7dHJhbnNmb3JtOiB2YWx1ZX07XG5cdGNvbnN0IHt3cml0YWJsZU9iamVjdE1vZGUsIHJlYWRhYmxlT2JqZWN0TW9kZX0gPSBnZXRUcmFuc2Zvcm1PYmplY3RNb2RlcyhvYmplY3RNb2RlLCBpbmRleCwgbmV3VHJhbnNmb3JtcywgZGlyZWN0aW9uKTtcblx0cmV0dXJuICh7XG5cdFx0Li4uc3RkaW9JdGVtLFxuXHRcdHZhbHVlOiB7dHJhbnNmb3JtLCB3cml0YWJsZU9iamVjdE1vZGUsIHJlYWRhYmxlT2JqZWN0TW9kZX0sXG5cdH0pO1xufTtcblxuY29uc3Qgbm9ybWFsaXplR2VuZXJhdG9yID0gKHtzdGRpb0l0ZW0sIHN0ZGlvSXRlbToge3ZhbHVlfSwgaW5kZXgsIG5ld1RyYW5zZm9ybXMsIGRpcmVjdGlvbiwgZW5jb2Rpbmd9KSA9PiB7XG5cdGNvbnN0IHtcblx0XHR0cmFuc2Zvcm0sXG5cdFx0ZmluYWwsXG5cdFx0YmluYXJ5OiBiaW5hcnlPcHRpb24gPSBmYWxzZSxcblx0XHRwcmVzZXJ2ZU5ld2xpbmVzID0gZmFsc2UsXG5cdFx0b2JqZWN0TW9kZSxcblx0fSA9IGlzUGxhaW5PYmoodmFsdWUpID8gdmFsdWUgOiB7dHJhbnNmb3JtOiB2YWx1ZX07XG5cdGNvbnN0IGJpbmFyeSA9IGJpbmFyeU9wdGlvbiB8fCBCSU5BUllfRU5DT0RJTkdTLmhhcyhlbmNvZGluZyk7XG5cdGNvbnN0IHt3cml0YWJsZU9iamVjdE1vZGUsIHJlYWRhYmxlT2JqZWN0TW9kZX0gPSBnZXRUcmFuc2Zvcm1PYmplY3RNb2RlcyhvYmplY3RNb2RlLCBpbmRleCwgbmV3VHJhbnNmb3JtcywgZGlyZWN0aW9uKTtcblx0cmV0dXJuIHtcblx0XHQuLi5zdGRpb0l0ZW0sXG5cdFx0dmFsdWU6IHtcblx0XHRcdHRyYW5zZm9ybSxcblx0XHRcdGZpbmFsLFxuXHRcdFx0YmluYXJ5LFxuXHRcdFx0cHJlc2VydmVOZXdsaW5lcyxcblx0XHRcdHdyaXRhYmxlT2JqZWN0TW9kZSxcblx0XHRcdHJlYWRhYmxlT2JqZWN0TW9kZSxcblx0XHR9LFxuXHR9O1xufTtcblxuY29uc3Qgc29ydFRyYW5zZm9ybXMgPSAobmV3VHJhbnNmb3JtcywgZGlyZWN0aW9uKSA9PiBkaXJlY3Rpb24gPT09ICdpbnB1dCcgPyBuZXdUcmFuc2Zvcm1zLnJldmVyc2UoKSA6IG5ld1RyYW5zZm9ybXM7XG4iLCAiaW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJztcbmltcG9ydCB7XG5cdGlzU3RyZWFtIGFzIGlzTm9kZVN0cmVhbSxcblx0aXNSZWFkYWJsZVN0cmVhbSBhcyBpc05vZGVSZWFkYWJsZVN0cmVhbSxcblx0aXNXcml0YWJsZVN0cmVhbSBhcyBpc05vZGVXcml0YWJsZVN0cmVhbSxcbn0gZnJvbSAnaXMtc3RyZWFtJztcbmltcG9ydCB7aXNXcml0YWJsZVN0cmVhbX0gZnJvbSAnLi90eXBlLmpzJztcblxuLy8gRm9yIGBzdGRpb1tmZE51bWJlcl1gIGJleW9uZCBzdGRpbi9zdGRvdXQvc3RkZXJyLCB3ZSBuZWVkIHRvIGd1ZXNzIHdoZXRoZXIgdGhlIHZhbHVlIHBhc3NlZCBpcyBpbnRlbmRlZCBmb3IgaW5wdXRzIG9yIG91dHB1dHMuXG4vLyBUaGlzIGFsbG93cyB1cyB0byBrbm93IHdoZXRoZXIgdG8gcGlwZSBfaW50b18gb3IgX2Zyb21fIHRoZSBzdHJlYW0uXG4vLyBXaGVuIGBzdGRpb1tmZE51bWJlcl1gIGlzIGEgc2luZ2xlIHZhbHVlLCB0aGlzIGd1ZXNzIGlzIGZhaXJseSBzdHJhaWdodGZvcndhcmQuXG4vLyBIb3dldmVyLCB3aGVuIGl0IGlzIGFuIGFycmF5IGluc3RlYWQsIHdlIGFsc28gbmVlZCB0byBtYWtlIHN1cmUgdGhlIGRpZmZlcmVudCB2YWx1ZXMgYXJlIG5vdCBpbmNvbXBhdGlibGUgd2l0aCBlYWNoIG90aGVyLlxuZXhwb3J0IGNvbnN0IGdldFN0cmVhbURpcmVjdGlvbiA9IChzdGRpb0l0ZW1zLCBmZE51bWJlciwgb3B0aW9uTmFtZSkgPT4ge1xuXHRjb25zdCBkaXJlY3Rpb25zID0gc3RkaW9JdGVtcy5tYXAoc3RkaW9JdGVtID0+IGdldFN0ZGlvSXRlbURpcmVjdGlvbihzdGRpb0l0ZW0sIGZkTnVtYmVyKSk7XG5cblx0aWYgKGRpcmVjdGlvbnMuaW5jbHVkZXMoJ2lucHV0JykgJiYgZGlyZWN0aW9ucy5pbmNsdWRlcygnb3V0cHV0JykpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgXFxgJHtvcHRpb25OYW1lfVxcYCBvcHRpb24gbXVzdCBub3QgYmUgYW4gYXJyYXkgb2YgYm90aCByZWFkYWJsZSBhbmQgd3JpdGFibGUgdmFsdWVzLmApO1xuXHR9XG5cblx0cmV0dXJuIGRpcmVjdGlvbnMuZmluZChCb29sZWFuKSA/PyBERUZBVUxUX0RJUkVDVElPTjtcbn07XG5cbmNvbnN0IGdldFN0ZGlvSXRlbURpcmVjdGlvbiA9ICh7dHlwZSwgdmFsdWV9LCBmZE51bWJlcikgPT4gS05PV05fRElSRUNUSU9OU1tmZE51bWJlcl0gPz8gZ3Vlc3NTdHJlYW1EaXJlY3Rpb25bdHlwZV0odmFsdWUpO1xuXG4vLyBgc3RkaW5gL2BzdGRvdXRgL2BzdGRlcnJgIGhhdmUgYSBrbm93biBkaXJlY3Rpb25cbmNvbnN0IEtOT1dOX0RJUkVDVElPTlMgPSBbJ2lucHV0JywgJ291dHB1dCcsICdvdXRwdXQnXTtcblxuY29uc3QgYW55RGlyZWN0aW9uID0gKCkgPT4gdW5kZWZpbmVkO1xuY29uc3QgYWx3YXlzSW5wdXQgPSAoKSA9PiAnaW5wdXQnO1xuXG4vLyBgc3RyaW5nYCBjYW4gb25seSBiZSBhZGRlZCB0aHJvdWdoIHRoZSBgaW5wdXRgIG9wdGlvbiwgaS5lLiBkb2VzIG5vdCBuZWVkIHRvIGJlIGhhbmRsZWQgaGVyZVxuY29uc3QgZ3Vlc3NTdHJlYW1EaXJlY3Rpb24gPSB7XG5cdGdlbmVyYXRvcjogYW55RGlyZWN0aW9uLFxuXHRhc3luY0dlbmVyYXRvcjogYW55RGlyZWN0aW9uLFxuXHRmaWxlVXJsOiBhbnlEaXJlY3Rpb24sXG5cdGZpbGVQYXRoOiBhbnlEaXJlY3Rpb24sXG5cdGl0ZXJhYmxlOiBhbHdheXNJbnB1dCxcblx0YXN5bmNJdGVyYWJsZTogYWx3YXlzSW5wdXQsXG5cdHVpbnQ4QXJyYXk6IGFsd2F5c0lucHV0LFxuXHR3ZWJTdHJlYW06IHZhbHVlID0+IGlzV3JpdGFibGVTdHJlYW0odmFsdWUpID8gJ291dHB1dCcgOiAnaW5wdXQnLFxuXHRub2RlU3RyZWFtKHZhbHVlKSB7XG5cdFx0aWYgKCFpc05vZGVSZWFkYWJsZVN0cmVhbSh2YWx1ZSwge2NoZWNrT3BlbjogZmFsc2V9KSkge1xuXHRcdFx0cmV0dXJuICdvdXRwdXQnO1xuXHRcdH1cblxuXHRcdHJldHVybiBpc05vZGVXcml0YWJsZVN0cmVhbSh2YWx1ZSwge2NoZWNrT3BlbjogZmFsc2V9KSA/IHVuZGVmaW5lZCA6ICdpbnB1dCc7XG5cdH0sXG5cdHdlYlRyYW5zZm9ybTogYW55RGlyZWN0aW9uLFxuXHRkdXBsZXg6IGFueURpcmVjdGlvbixcblx0bmF0aXZlKHZhbHVlKSB7XG5cdFx0Y29uc3Qgc3RhbmRhcmRTdHJlYW1EaXJlY3Rpb24gPSBnZXRTdGFuZGFyZFN0cmVhbURpcmVjdGlvbih2YWx1ZSk7XG5cdFx0aWYgKHN0YW5kYXJkU3RyZWFtRGlyZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiBzdGFuZGFyZFN0cmVhbURpcmVjdGlvbjtcblx0XHR9XG5cblx0XHRpZiAoaXNOb2RlU3RyZWFtKHZhbHVlLCB7Y2hlY2tPcGVuOiBmYWxzZX0pKSB7XG5cdFx0XHRyZXR1cm4gZ3Vlc3NTdHJlYW1EaXJlY3Rpb24ubm9kZVN0cmVhbSh2YWx1ZSk7XG5cdFx0fVxuXHR9LFxufTtcblxuY29uc3QgZ2V0U3RhbmRhcmRTdHJlYW1EaXJlY3Rpb24gPSB2YWx1ZSA9PiB7XG5cdGlmIChbMCwgcHJvY2Vzcy5zdGRpbl0uaW5jbHVkZXModmFsdWUpKSB7XG5cdFx0cmV0dXJuICdpbnB1dCc7XG5cdH1cblxuXHRpZiAoWzEsIDIsIHByb2Nlc3Muc3Rkb3V0LCBwcm9jZXNzLnN0ZGVycl0uaW5jbHVkZXModmFsdWUpKSB7XG5cdFx0cmV0dXJuICdvdXRwdXQnO1xuXHR9XG59O1xuXG4vLyBXaGVuIGFtYmlndW91cywgd2UgaW5pdGlhbGx5IGtlZXAgdGhlIGRpcmVjdGlvbiBhcyBgdW5kZWZpbmVkYC5cbi8vIFRoaXMgYWxsb3dzIGFycmF5cyBvZiBgc3RkaW9gIHZhbHVlcyB0byByZXNvbHZlIHRoZSBhbWJpZ3VpdHkuXG4vLyBGb3IgZXhhbXBsZSwgYHN0ZGlvWzNdOiBEdXBsZXhTdHJlYW1gIGlzIGFtYmlndW91cywgYnV0IGBzdGRpb1szXTogW0R1cGxleFN0cmVhbSwgV3JpdGFibGVTdHJlYW1dYCBpcyBub3QuXG4vLyBXaGVuIHRoZSBhbWJpZ3VpdHkgcmVtYWlucywgd2UgZGVmYXVsdCB0byBgb3V0cHV0YCBzaW5jZSBpdCBpcyB0aGUgbW9zdCBjb21tb24gdXNlIGNhc2UgZm9yIGFkZGl0aW9uYWwgZmlsZSBkZXNjcmlwdG9ycy5cbmNvbnN0IERFRkFVTFRfRElSRUNUSU9OID0gJ291dHB1dCc7XG4iLCAiLy8gVGhlIGBpcGNgIG9wdGlvbiBhZGRzIGFuIGBpcGNgIGl0ZW0gdG8gdGhlIGBzdGRpb2Agb3B0aW9uXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplSXBjU3RkaW9BcnJheSA9IChzdGRpb0FycmF5LCBpcGMpID0+IGlwYyAmJiAhc3RkaW9BcnJheS5pbmNsdWRlcygnaXBjJylcblx0PyBbLi4uc3RkaW9BcnJheSwgJ2lwYyddXG5cdDogc3RkaW9BcnJheTtcbiIsICJpbXBvcnQge1NUQU5EQVJEX1NUUkVBTVNfQUxJQVNFU30gZnJvbSAnLi4vdXRpbHMvc3RhbmRhcmQtc3RyZWFtLmpzJztcbmltcG9ydCB7bm9ybWFsaXplSXBjU3RkaW9BcnJheX0gZnJvbSAnLi4vaXBjL2FycmF5LmpzJztcbmltcG9ydCB7aXNGdWxsVmVyYm9zZX0gZnJvbSAnLi4vdmVyYm9zZS92YWx1ZXMuanMnO1xuXG4vLyBBZGQgc3VwcG9ydCBmb3IgYHN0ZGluYC9gc3Rkb3V0YC9gc3RkZXJyYCBhcyBhbiBhbGlhcyBmb3IgYHN0ZGlvYC5cbi8vIEFsc28gbm9ybWFsaXplIHRoZSBgc3RkaW9gIG9wdGlvbi5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVTdGRpb09wdGlvbiA9ICh7c3RkaW8sIGlwYywgYnVmZmVyLCAuLi5vcHRpb25zfSwgdmVyYm9zZUluZm8sIGlzU3luYykgPT4ge1xuXHRjb25zdCBzdGRpb0FycmF5ID0gZ2V0U3RkaW9BcnJheShzdGRpbywgb3B0aW9ucykubWFwKChzdGRpb09wdGlvbiwgZmROdW1iZXIpID0+IGFkZERlZmF1bHRWYWx1ZShzdGRpb09wdGlvbiwgZmROdW1iZXIpKTtcblx0cmV0dXJuIGlzU3luY1xuXHRcdD8gbm9ybWFsaXplU3RkaW9TeW5jKHN0ZGlvQXJyYXksIGJ1ZmZlciwgdmVyYm9zZUluZm8pXG5cdFx0OiBub3JtYWxpemVJcGNTdGRpb0FycmF5KHN0ZGlvQXJyYXksIGlwYyk7XG59O1xuXG5jb25zdCBnZXRTdGRpb0FycmF5ID0gKHN0ZGlvLCBvcHRpb25zKSA9PiB7XG5cdGlmIChzdGRpbyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIFNUQU5EQVJEX1NUUkVBTVNfQUxJQVNFUy5tYXAoYWxpYXMgPT4gb3B0aW9uc1thbGlhc10pO1xuXHR9XG5cblx0aWYgKGhhc0FsaWFzKG9wdGlvbnMpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBJdCdzIG5vdCBwb3NzaWJsZSB0byBwcm92aWRlIFxcYHN0ZGlvXFxgIGluIGNvbWJpbmF0aW9uIHdpdGggb25lIG9mICR7U1RBTkRBUkRfU1RSRUFNU19BTElBU0VTLm1hcChhbGlhcyA9PiBgXFxgJHthbGlhc31cXGBgKS5qb2luKCcsICcpfWApO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBzdGRpbyA9PT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gW3N0ZGlvLCBzdGRpbywgc3RkaW9dO1xuXHR9XG5cblx0aWYgKCFBcnJheS5pc0FycmF5KHN0ZGlvKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIFxcYHN0ZGlvXFxgIHRvIGJlIG9mIHR5cGUgXFxgc3RyaW5nXFxgIG9yIFxcYEFycmF5XFxgLCBnb3QgXFxgJHt0eXBlb2Ygc3RkaW99XFxgYCk7XG5cdH1cblxuXHRjb25zdCBsZW5ndGggPSBNYXRoLm1heChzdGRpby5sZW5ndGgsIFNUQU5EQVJEX1NUUkVBTVNfQUxJQVNFUy5sZW5ndGgpO1xuXHRyZXR1cm4gQXJyYXkuZnJvbSh7bGVuZ3RofSwgKF8sIGZkTnVtYmVyKSA9PiBzdGRpb1tmZE51bWJlcl0pO1xufTtcblxuY29uc3QgaGFzQWxpYXMgPSBvcHRpb25zID0+IFNUQU5EQVJEX1NUUkVBTVNfQUxJQVNFUy5zb21lKGFsaWFzID0+IG9wdGlvbnNbYWxpYXNdICE9PSB1bmRlZmluZWQpO1xuXG5jb25zdCBhZGREZWZhdWx0VmFsdWUgPSAoc3RkaW9PcHRpb24sIGZkTnVtYmVyKSA9PiB7XG5cdGlmIChBcnJheS5pc0FycmF5KHN0ZGlvT3B0aW9uKSkge1xuXHRcdHJldHVybiBzdGRpb09wdGlvbi5tYXAoaXRlbSA9PiBhZGREZWZhdWx0VmFsdWUoaXRlbSwgZmROdW1iZXIpKTtcblx0fVxuXG5cdGlmIChzdGRpb09wdGlvbiA9PT0gbnVsbCB8fCBzdGRpb09wdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGZkTnVtYmVyID49IFNUQU5EQVJEX1NUUkVBTVNfQUxJQVNFUy5sZW5ndGggPyAnaWdub3JlJyA6ICdwaXBlJztcblx0fVxuXG5cdHJldHVybiBzdGRpb09wdGlvbjtcbn07XG5cbi8vIFVzaW5nIGBidWZmZXI6IGZhbHNlYCB3aXRoIHN5bmNocm9ub3VzIG1ldGhvZHMgaW1wbGllcyBgc3Rkb3V0YC9gc3RkZXJyYDogYGlnbm9yZWAuXG4vLyBVbmxlc3MgdGhlIG91dHB1dCBpcyBuZWVkZWQsIGUuZy4gZHVlIHRvIGB2ZXJib3NlOiAnZnVsbCdgIG9yIHRvIHJlZGlyZWN0aW5nIHRvIGEgZmlsZS5cbmNvbnN0IG5vcm1hbGl6ZVN0ZGlvU3luYyA9IChzdGRpb0FycmF5LCBidWZmZXIsIHZlcmJvc2VJbmZvKSA9PiBzdGRpb0FycmF5Lm1hcCgoc3RkaW9PcHRpb24sIGZkTnVtYmVyKSA9PlxuXHQhYnVmZmVyW2ZkTnVtYmVyXVxuXHQmJiBmZE51bWJlciAhPT0gMFxuXHQmJiAhaXNGdWxsVmVyYm9zZSh2ZXJib3NlSW5mbywgZmROdW1iZXIpXG5cdCYmIGlzT3V0cHV0UGlwZU9ubHkoc3RkaW9PcHRpb24pXG5cdFx0PyAnaWdub3JlJ1xuXHRcdDogc3RkaW9PcHRpb24pO1xuXG5jb25zdCBpc091dHB1dFBpcGVPbmx5ID0gc3RkaW9PcHRpb24gPT4gc3RkaW9PcHRpb24gPT09ICdwaXBlJ1xuXHR8fCAoQXJyYXkuaXNBcnJheShzdGRpb09wdGlvbikgJiYgc3RkaW9PcHRpb24uZXZlcnkoaXRlbSA9PiBpdGVtID09PSAncGlwZScpKTtcbiIsICJpbXBvcnQge3JlYWRGaWxlU3luY30gZnJvbSAnbm9kZTpmcyc7XG5pbXBvcnQgdHR5IGZyb20gJ25vZGU6dHR5JztcbmltcG9ydCB7aXNTdHJlYW0gYXMgaXNOb2RlU3RyZWFtfSBmcm9tICdpcy1zdHJlYW0nO1xuaW1wb3J0IHtTVEFOREFSRF9TVFJFQU1TfSBmcm9tICcuLi91dGlscy9zdGFuZGFyZC1zdHJlYW0uanMnO1xuaW1wb3J0IHtidWZmZXJUb1VpbnQ4QXJyYXl9IGZyb20gJy4uL3V0aWxzL3VpbnQtYXJyYXkuanMnO1xuaW1wb3J0IHtzZXJpYWxpemVPcHRpb25WYWx1ZX0gZnJvbSAnLi4vYXJndW1lbnRzL2ZkLW9wdGlvbnMuanMnO1xuXG4vLyBXaGVuIHdlIHVzZSBtdWx0aXBsZSBgc3RkaW9gIHZhbHVlcyBmb3IgdGhlIHNhbWUgc3RyZWFtcywgd2UgcGFzcyAncGlwZScgdG8gYGNoaWxkX3Byb2Nlc3Muc3Bhd24oKWAuXG4vLyBXZSB0aGVuIGVtdWxhdGUgdGhlIHBpcGluZyBkb25lIGJ5IGNvcmUgTm9kZS5qcy5cbi8vIFRvIGRvIHNvLCB3ZSB0cmFuc2Zvcm0gdGhlIGZvbGxvd2luZyB2YWx1ZXM6XG4vLyAgLSBOb2RlLmpzIHN0cmVhbXMgYXJlIG1hcmtlZCBhcyBgdHlwZTogbm9kZVN0cmVhbWBcbi8vICAtICdpbmhlcml0JyBiZWNvbWVzIGBwcm9jZXNzLnN0ZGlufHN0ZG91dHxzdGRlcnJgXG4vLyAgLSBhbnkgZmlsZSBkZXNjcmlwdG9yIGludGVnZXIgYmVjb21lcyBgcHJvY2Vzcy5zdGRpb1tmZE51bWJlcl1gXG4vLyBBbGwgb2YgdGhlIGFib3ZlIHRyYW5zZm9ybWF0aW9ucyB0ZWxsIEV4ZWNhIHRvIHBlcmZvcm0gbWFudWFsIHBpcGluZy5cbmV4cG9ydCBjb25zdCBoYW5kbGVOYXRpdmVTdHJlYW0gPSAoe3N0ZGlvSXRlbSwgc3RkaW9JdGVtOiB7dHlwZX0sIGlzU3RkaW9BcnJheSwgZmROdW1iZXIsIGRpcmVjdGlvbiwgaXNTeW5jfSkgPT4ge1xuXHRpZiAoIWlzU3RkaW9BcnJheSB8fCB0eXBlICE9PSAnbmF0aXZlJykge1xuXHRcdHJldHVybiBzdGRpb0l0ZW07XG5cdH1cblxuXHRyZXR1cm4gaXNTeW5jXG5cdFx0PyBoYW5kbGVOYXRpdmVTdHJlYW1TeW5jKHtzdGRpb0l0ZW0sIGZkTnVtYmVyLCBkaXJlY3Rpb259KVxuXHRcdDogaGFuZGxlTmF0aXZlU3RyZWFtQXN5bmMoe3N0ZGlvSXRlbSwgZmROdW1iZXJ9KTtcbn07XG5cbi8vIFN5bmNocm9ub3VzIG1ldGhvZHMgdXNlIGEgZGlmZmVyZW50IGxvZ2ljLlxuLy8gJ2luaGVyaXQnLCBmaWxlIGRlc2NyaXB0b3JzIGFuZCBwcm9jZXNzLnN0ZCogYXJlIGhhbmRsZWQgYnkgcmVhZEZpbGVTeW5jKCkvd3JpdGVGaWxlU3luYygpLlxuY29uc3QgaGFuZGxlTmF0aXZlU3RyZWFtU3luYyA9ICh7c3RkaW9JdGVtLCBzdGRpb0l0ZW06IHt2YWx1ZSwgb3B0aW9uTmFtZX0sIGZkTnVtYmVyLCBkaXJlY3Rpb259KSA9PiB7XG5cdGNvbnN0IHRhcmdldEZkID0gZ2V0VGFyZ2V0RmQoe1xuXHRcdHZhbHVlLFxuXHRcdG9wdGlvbk5hbWUsXG5cdFx0ZmROdW1iZXIsXG5cdFx0ZGlyZWN0aW9uLFxuXHR9KTtcblx0aWYgKHRhcmdldEZkICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gdGFyZ2V0RmQ7XG5cdH1cblxuXHRpZiAoaXNOb2RlU3RyZWFtKHZhbHVlLCB7Y2hlY2tPcGVuOiBmYWxzZX0pKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlIFxcYCR7b3B0aW9uTmFtZX06IFN0cmVhbVxcYCBvcHRpb24gY2Fubm90IGJvdGggYmUgYW4gYXJyYXkgYW5kIGluY2x1ZGUgYSBzdHJlYW0gd2l0aCBzeW5jaHJvbm91cyBtZXRob2RzLmApO1xuXHR9XG5cblx0cmV0dXJuIHN0ZGlvSXRlbTtcbn07XG5cbmNvbnN0IGdldFRhcmdldEZkID0gKHt2YWx1ZSwgb3B0aW9uTmFtZSwgZmROdW1iZXIsIGRpcmVjdGlvbn0pID0+IHtcblx0Y29uc3QgdGFyZ2V0RmROdW1iZXIgPSBnZXRUYXJnZXRGZE51bWJlcih2YWx1ZSwgZmROdW1iZXIpO1xuXHRpZiAodGFyZ2V0RmROdW1iZXIgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmIChkaXJlY3Rpb24gPT09ICdvdXRwdXQnKSB7XG5cdFx0cmV0dXJuIHt0eXBlOiAnZmlsZU51bWJlcicsIHZhbHVlOiB0YXJnZXRGZE51bWJlciwgb3B0aW9uTmFtZX07XG5cdH1cblxuXHRpZiAodHR5LmlzYXR0eSh0YXJnZXRGZE51bWJlcikpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgXFxgJHtvcHRpb25OYW1lfTogJHtzZXJpYWxpemVPcHRpb25WYWx1ZSh2YWx1ZSl9XFxgIG9wdGlvbiBpcyBpbnZhbGlkOiBpdCBjYW5ub3QgYmUgYSBUVFkgd2l0aCBzeW5jaHJvbm91cyBtZXRob2RzLmApO1xuXHR9XG5cblx0cmV0dXJuIHt0eXBlOiAndWludDhBcnJheScsIHZhbHVlOiBidWZmZXJUb1VpbnQ4QXJyYXkocmVhZEZpbGVTeW5jKHRhcmdldEZkTnVtYmVyKSksIG9wdGlvbk5hbWV9O1xufTtcblxuY29uc3QgZ2V0VGFyZ2V0RmROdW1iZXIgPSAodmFsdWUsIGZkTnVtYmVyKSA9PiB7XG5cdGlmICh2YWx1ZSA9PT0gJ2luaGVyaXQnKSB7XG5cdFx0cmV0dXJuIGZkTnVtYmVyO1xuXHR9XG5cblx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblxuXHRjb25zdCBzdGFuZGFyZFN0cmVhbUluZGV4ID0gU1RBTkRBUkRfU1RSRUFNUy5pbmRleE9mKHZhbHVlKTtcblx0aWYgKHN0YW5kYXJkU3RyZWFtSW5kZXggIT09IC0xKSB7XG5cdFx0cmV0dXJuIHN0YW5kYXJkU3RyZWFtSW5kZXg7XG5cdH1cbn07XG5cbmNvbnN0IGhhbmRsZU5hdGl2ZVN0cmVhbUFzeW5jID0gKHtzdGRpb0l0ZW0sIHN0ZGlvSXRlbToge3ZhbHVlLCBvcHRpb25OYW1lfSwgZmROdW1iZXJ9KSA9PiB7XG5cdGlmICh2YWx1ZSA9PT0gJ2luaGVyaXQnKSB7XG5cdFx0cmV0dXJuIHt0eXBlOiAnbm9kZVN0cmVhbScsIHZhbHVlOiBnZXRTdGFuZGFyZFN0cmVhbShmZE51bWJlciwgdmFsdWUsIG9wdGlvbk5hbWUpLCBvcHRpb25OYW1lfTtcblx0fVxuXG5cdGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG5cdFx0cmV0dXJuIHt0eXBlOiAnbm9kZVN0cmVhbScsIHZhbHVlOiBnZXRTdGFuZGFyZFN0cmVhbSh2YWx1ZSwgdmFsdWUsIG9wdGlvbk5hbWUpLCBvcHRpb25OYW1lfTtcblx0fVxuXG5cdGlmIChpc05vZGVTdHJlYW0odmFsdWUsIHtjaGVja09wZW46IGZhbHNlfSkpIHtcblx0XHRyZXR1cm4ge3R5cGU6ICdub2RlU3RyZWFtJywgdmFsdWUsIG9wdGlvbk5hbWV9O1xuXHR9XG5cblx0cmV0dXJuIHN0ZGlvSXRlbTtcbn07XG5cbi8vIE5vZGUuanMgZG9lcyBub3QgYWxsb3cgdG8gZWFzaWx5IHJldHJpZXZlIGZpbGUgZGVzY3JpcHRvcnMgYmV5b25kIHN0ZGluL3N0ZG91dC9zdGRlcnIgYXMgc3RyZWFtcy5cbi8vICAtIGBmcy5jcmVhdGVSZWFkU3RyZWFtKClgL2Bmcy5jcmVhdGVXcml0ZVN0cmVhbSgpYCB3aXRoIHRoZSBgZmRgIG9wdGlvbiBkbyBub3Qgd29yayB3aXRoIGNoYXJhY3RlciBkZXZpY2VzIHRoYXQgdXNlIGJsb2NraW5nIHJlYWRzL3dyaXRlcyAoc3VjaCBhcyBpbnRlcmFjdGl2ZSBUVFlzKS5cbi8vICAtIFVzaW5nIGEgVENQIGBTb2NrZXRgIHdvdWxkIHdvcmsgYnV0IGJlIHJhdGhlciBjb21wbGV4IHRvIGltcGxlbWVudC5cbi8vIFNpbmNlIHRoaXMgaXMgYW4gZWRnZSBjYXNlLCB3ZSBzaW1wbHkgdGhyb3cgYW4gZXJyb3IgbWVzc2FnZS5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL2V4ZWNhL3B1bGwvNjQzI2Rpc2N1c3Npb25fcjE0MzU5MDU3MDdcbmNvbnN0IGdldFN0YW5kYXJkU3RyZWFtID0gKGZkTnVtYmVyLCB2YWx1ZSwgb3B0aW9uTmFtZSkgPT4ge1xuXHRjb25zdCBzdGFuZGFyZFN0cmVhbSA9IFNUQU5EQVJEX1NUUkVBTVNbZmROdW1iZXJdO1xuXG5cdGlmIChzdGFuZGFyZFN0cmVhbSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlIFxcYCR7b3B0aW9uTmFtZX06ICR7dmFsdWV9XFxgIG9wdGlvbiBpcyBpbnZhbGlkOiBubyBzdWNoIHN0YW5kYXJkIHN0cmVhbS5gKTtcblx0fVxuXG5cdHJldHVybiBzdGFuZGFyZFN0cmVhbTtcbn07XG4iLCAiaW1wb3J0IHtpc1JlYWRhYmxlU3RyZWFtfSBmcm9tICdpcy1zdHJlYW0nO1xuaW1wb3J0IHtpc1VpbnQ4QXJyYXl9IGZyb20gJy4uL3V0aWxzL3VpbnQtYXJyYXkuanMnO1xuaW1wb3J0IHtpc1VybCwgaXNGaWxlUGF0aFN0cmluZ30gZnJvbSAnLi90eXBlLmpzJztcblxuLy8gQXBwZW5kIHRoZSBgc3RkaW5gIG9wdGlvbiB3aXRoIHRoZSBgaW5wdXRgIGFuZCBgaW5wdXRGaWxlYCBvcHRpb25zXG5leHBvcnQgY29uc3QgaGFuZGxlSW5wdXRPcHRpb25zID0gKHtpbnB1dCwgaW5wdXRGaWxlfSwgZmROdW1iZXIpID0+IGZkTnVtYmVyID09PSAwXG5cdD8gW1xuXHRcdC4uLmhhbmRsZUlucHV0T3B0aW9uKGlucHV0KSxcblx0XHQuLi5oYW5kbGVJbnB1dEZpbGVPcHRpb24oaW5wdXRGaWxlKSxcblx0XVxuXHQ6IFtdO1xuXG5jb25zdCBoYW5kbGVJbnB1dE9wdGlvbiA9IGlucHV0ID0+IGlucHV0ID09PSB1bmRlZmluZWQgPyBbXSA6IFt7XG5cdHR5cGU6IGdldElucHV0VHlwZShpbnB1dCksXG5cdHZhbHVlOiBpbnB1dCxcblx0b3B0aW9uTmFtZTogJ2lucHV0Jyxcbn1dO1xuXG5jb25zdCBnZXRJbnB1dFR5cGUgPSBpbnB1dCA9PiB7XG5cdGlmIChpc1JlYWRhYmxlU3RyZWFtKGlucHV0LCB7Y2hlY2tPcGVuOiBmYWxzZX0pKSB7XG5cdFx0cmV0dXJuICdub2RlU3RyZWFtJztcblx0fVxuXG5cdGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuICdzdHJpbmcnO1xuXHR9XG5cblx0aWYgKGlzVWludDhBcnJheShpbnB1dCkpIHtcblx0XHRyZXR1cm4gJ3VpbnQ4QXJyYXknO1xuXHR9XG5cblx0dGhyb3cgbmV3IEVycm9yKCdUaGUgYGlucHV0YCBvcHRpb24gbXVzdCBiZSBhIHN0cmluZywgYSBVaW50OEFycmF5IG9yIGEgTm9kZS5qcyBSZWFkYWJsZSBzdHJlYW0uJyk7XG59O1xuXG5jb25zdCBoYW5kbGVJbnB1dEZpbGVPcHRpb24gPSBpbnB1dEZpbGUgPT4gaW5wdXRGaWxlID09PSB1bmRlZmluZWQgPyBbXSA6IFt7XG5cdC4uLmdldElucHV0RmlsZVR5cGUoaW5wdXRGaWxlKSxcblx0b3B0aW9uTmFtZTogJ2lucHV0RmlsZScsXG59XTtcblxuY29uc3QgZ2V0SW5wdXRGaWxlVHlwZSA9IGlucHV0RmlsZSA9PiB7XG5cdGlmIChpc1VybChpbnB1dEZpbGUpKSB7XG5cdFx0cmV0dXJuIHt0eXBlOiAnZmlsZVVybCcsIHZhbHVlOiBpbnB1dEZpbGV9O1xuXHR9XG5cblx0aWYgKGlzRmlsZVBhdGhTdHJpbmcoaW5wdXRGaWxlKSkge1xuXHRcdHJldHVybiB7dHlwZTogJ2ZpbGVQYXRoJywgdmFsdWU6IHtmaWxlOiBpbnB1dEZpbGV9fTtcblx0fVxuXG5cdHRocm93IG5ldyBFcnJvcignVGhlIGBpbnB1dEZpbGVgIG9wdGlvbiBtdXN0IGJlIGEgZmlsZSBwYXRoIHN0cmluZyBvciBhIGZpbGUgVVJMLicpO1xufTtcbiIsICJpbXBvcnQge1xuXHRTUEVDSUFMX0RVUExJQ0FURV9UWVBFU19TWU5DLFxuXHRTUEVDSUFMX0RVUExJQ0FURV9UWVBFUyxcblx0Rk9SQklEX0RVUExJQ0FURV9UWVBFUyxcblx0VFlQRV9UT19NRVNTQUdFLFxufSBmcm9tICcuL3R5cGUuanMnO1xuXG4vLyBEdXBsaWNhdGVzIGluIHRoZSBzYW1lIGZpbGUgZGVzY3JpcHRvciBpcyBtb3N0IGxpa2VseSBhbiBlcnJvci5cbi8vIEhvd2V2ZXIsIHRoaXMgY2FuIGJlIHVzZWZ1bCB3aXRoIGdlbmVyYXRvcnMuXG5leHBvcnQgY29uc3QgZmlsdGVyRHVwbGljYXRlcyA9IHN0ZGlvSXRlbXMgPT4gc3RkaW9JdGVtcy5maWx0ZXIoKHN0ZGlvSXRlbU9uZSwgaW5kZXhPbmUpID0+XG5cdHN0ZGlvSXRlbXMuZXZlcnkoKHN0ZGlvSXRlbVR3bywgaW5kZXhUd28pID0+IHN0ZGlvSXRlbU9uZS52YWx1ZSAhPT0gc3RkaW9JdGVtVHdvLnZhbHVlXG5cdFx0fHwgaW5kZXhPbmUgPj0gaW5kZXhUd29cblx0XHR8fCBzdGRpb0l0ZW1PbmUudHlwZSA9PT0gJ2dlbmVyYXRvcidcblx0XHR8fCBzdGRpb0l0ZW1PbmUudHlwZSA9PT0gJ2FzeW5jR2VuZXJhdG9yJykpO1xuXG4vLyBDaGVjayBpZiB0d28gZmlsZSBkZXNjcmlwdG9ycyBhcmUgc2hhcmluZyB0aGUgc2FtZSB0YXJnZXQuXG4vLyBGb3IgZXhhbXBsZSBge3N0ZG91dDoge2ZpbGU6ICcuL291dHB1dC50eHQnfSwgc3RkZXJyOiB7ZmlsZTogJy4vb3V0cHV0LnR4dCd9fWAuXG5leHBvcnQgY29uc3QgZ2V0RHVwbGljYXRlU3RyZWFtID0gKHtzdGRpb0l0ZW06IHt0eXBlLCB2YWx1ZSwgb3B0aW9uTmFtZX0sIGRpcmVjdGlvbiwgZmlsZURlc2NyaXB0b3JzLCBpc1N5bmN9KSA9PiB7XG5cdGNvbnN0IG90aGVyU3RkaW9JdGVtcyA9IGdldE90aGVyU3RkaW9JdGVtcyhmaWxlRGVzY3JpcHRvcnMsIHR5cGUpO1xuXHRpZiAob3RoZXJTdGRpb0l0ZW1zLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmIChpc1N5bmMpIHtcblx0XHR2YWxpZGF0ZUR1cGxpY2F0ZVN0cmVhbVN5bmMoe1xuXHRcdFx0b3RoZXJTdGRpb0l0ZW1zLFxuXHRcdFx0dHlwZSxcblx0XHRcdHZhbHVlLFxuXHRcdFx0b3B0aW9uTmFtZSxcblx0XHRcdGRpcmVjdGlvbixcblx0XHR9KTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAoU1BFQ0lBTF9EVVBMSUNBVEVfVFlQRVMuaGFzKHR5cGUpKSB7XG5cdFx0cmV0dXJuIGdldER1cGxpY2F0ZVN0cmVhbUluc3RhbmNlKHtcblx0XHRcdG90aGVyU3RkaW9JdGVtcyxcblx0XHRcdHR5cGUsXG5cdFx0XHR2YWx1ZSxcblx0XHRcdG9wdGlvbk5hbWUsXG5cdFx0XHRkaXJlY3Rpb24sXG5cdFx0fSk7XG5cdH1cblxuXHRpZiAoRk9SQklEX0RVUExJQ0FURV9UWVBFUy5oYXModHlwZSkpIHtcblx0XHR2YWxpZGF0ZUR1cGxpY2F0ZVRyYW5zZm9ybSh7XG5cdFx0XHRvdGhlclN0ZGlvSXRlbXMsXG5cdFx0XHR0eXBlLFxuXHRcdFx0dmFsdWUsXG5cdFx0XHRvcHRpb25OYW1lLFxuXHRcdH0pO1xuXHR9XG59O1xuXG4vLyBWYWx1ZXMgc2hhcmVkIGJ5IG11bHRpcGxlIGZpbGUgZGVzY3JpcHRvcnNcbmNvbnN0IGdldE90aGVyU3RkaW9JdGVtcyA9IChmaWxlRGVzY3JpcHRvcnMsIHR5cGUpID0+IGZpbGVEZXNjcmlwdG9yc1xuXHQuZmxhdE1hcCgoe2RpcmVjdGlvbiwgc3RkaW9JdGVtc30pID0+IHN0ZGlvSXRlbXNcblx0XHQuZmlsdGVyKHN0ZGlvSXRlbSA9PiBzdGRpb0l0ZW0udHlwZSA9PT0gdHlwZSlcblx0XHQubWFwKChzdGRpb0l0ZW0gPT4gKHsuLi5zdGRpb0l0ZW0sIGRpcmVjdGlvbn0pKSkpO1xuXG4vLyBXaXRoIGBleGVjYVN5bmMoKWAsIGRvIG5vdCBhbGxvdyBzZXR0aW5nIGEgZmlsZSBwYXRoIGJvdGggaW4gaW5wdXQgYW5kIG91dHB1dFxuY29uc3QgdmFsaWRhdGVEdXBsaWNhdGVTdHJlYW1TeW5jID0gKHtvdGhlclN0ZGlvSXRlbXMsIHR5cGUsIHZhbHVlLCBvcHRpb25OYW1lLCBkaXJlY3Rpb259KSA9PiB7XG5cdGlmIChTUEVDSUFMX0RVUExJQ0FURV9UWVBFU19TWU5DLmhhcyh0eXBlKSkge1xuXHRcdGdldER1cGxpY2F0ZVN0cmVhbUluc3RhbmNlKHtcblx0XHRcdG90aGVyU3RkaW9JdGVtcyxcblx0XHRcdHR5cGUsXG5cdFx0XHR2YWx1ZSxcblx0XHRcdG9wdGlvbk5hbWUsXG5cdFx0XHRkaXJlY3Rpb24sXG5cdFx0fSk7XG5cdH1cbn07XG5cbi8vIFdoZW4gdHdvIGZpbGUgZGVzY3JpcHRvcnMgc2hhcmUgdGhlIGZpbGUgb3Igc3RyZWFtLCB3ZSBuZWVkIHRvIHJlLXVzZSB0aGUgc2FtZSB1bmRlcmx5aW5nIHN0cmVhbS5cbi8vIE90aGVyd2lzZSwgdGhlIHN0cmVhbSB3b3VsZCBiZSBjbG9zZWQgdHdpY2Ugd2hlbiBwaXBpbmcgZW5kcy5cbi8vIFRoaXMgaXMgb25seSBhbiBpc3N1ZSB3aXRoIG91dHB1dCBmaWxlIGRlc2NyaXB0b3JzLlxuLy8gVGhpcyBpcyBub3QgYSBwcm9ibGVtIHdpdGggZ2VuZXJhdG9yIGZ1bmN0aW9ucyBzaW5jZSB0aG9zZSBjcmVhdGUgYSBuZXcgaW5zdGFuY2UgZm9yIGVhY2ggZmlsZSBkZXNjcmlwdG9yLlxuLy8gV2UgYWxzbyBmb3JiaWQgaW5wdXQgYW5kIG91dHB1dCBmaWxlIGRlc2NyaXB0b3JzIHNoYXJpbmcgdGhlIHNhbWUgZmlsZSBvciBzdHJlYW0sIHNpbmNlIHRoYXQgZG9lcyBub3QgbWFrZSBzZW5zZS5cbmNvbnN0IGdldER1cGxpY2F0ZVN0cmVhbUluc3RhbmNlID0gKHtvdGhlclN0ZGlvSXRlbXMsIHR5cGUsIHZhbHVlLCBvcHRpb25OYW1lLCBkaXJlY3Rpb259KSA9PiB7XG5cdGNvbnN0IGR1cGxpY2F0ZVN0ZGlvSXRlbXMgPSBvdGhlclN0ZGlvSXRlbXMuZmlsdGVyKHN0ZGlvSXRlbSA9PiBoYXNTYW1lVmFsdWUoc3RkaW9JdGVtLCB2YWx1ZSkpO1xuXHRpZiAoZHVwbGljYXRlU3RkaW9JdGVtcy5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBkaWZmZXJlbnRTdGRpb0l0ZW0gPSBkdXBsaWNhdGVTdGRpb0l0ZW1zLmZpbmQoc3RkaW9JdGVtID0+IHN0ZGlvSXRlbS5kaXJlY3Rpb24gIT09IGRpcmVjdGlvbik7XG5cdHRocm93T25EdXBsaWNhdGVTdHJlYW0oZGlmZmVyZW50U3RkaW9JdGVtLCBvcHRpb25OYW1lLCB0eXBlKTtcblxuXHRyZXR1cm4gZGlyZWN0aW9uID09PSAnb3V0cHV0JyA/IGR1cGxpY2F0ZVN0ZGlvSXRlbXNbMF0uc3RyZWFtIDogdW5kZWZpbmVkO1xufTtcblxuY29uc3QgaGFzU2FtZVZhbHVlID0gKHt0eXBlLCB2YWx1ZX0sIHNlY29uZFZhbHVlKSA9PiB7XG5cdGlmICh0eXBlID09PSAnZmlsZVBhdGgnKSB7XG5cdFx0cmV0dXJuIHZhbHVlLmZpbGUgPT09IHNlY29uZFZhbHVlLmZpbGU7XG5cdH1cblxuXHRpZiAodHlwZSA9PT0gJ2ZpbGVVcmwnKSB7XG5cdFx0cmV0dXJuIHZhbHVlLmhyZWYgPT09IHNlY29uZFZhbHVlLmhyZWY7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWUgPT09IHNlY29uZFZhbHVlO1xufTtcblxuLy8gV2UgZG8gbm90IGFsbG93IHR3byBmaWxlIGRlc2NyaXB0b3JzIHRvIHNoYXJlIHRoZSBzYW1lIER1cGxleCBvciBUcmFuc2Zvcm1TdHJlYW0uXG4vLyBUaGlzIGlzIGJlY2F1c2UgdGhvc2UgYXJlIHNldCBkaXJlY3RseSB0byBgc3VicHJvY2Vzcy5zdGQqYC5cbi8vIEZvciBleGFtcGxlLCB0aGlzIGNvdWxkIHJlc3VsdCBpbiBgc3VicHJvY2Vzcy5zdGRvdXRgIGFuZCBgc3VicHJvY2Vzcy5zdGRlcnJgIGJlaW5nIHRoZSBzYW1lIHZhbHVlLlxuLy8gVGhpcyBtZWFucyByZWFkaW5nIGZyb20gZWl0aGVyIHdvdWxkIGdldCBkYXRhIGZyb20gYm90aCBzdGRvdXQgYW5kIHN0ZGVyci5cbmNvbnN0IHZhbGlkYXRlRHVwbGljYXRlVHJhbnNmb3JtID0gKHtvdGhlclN0ZGlvSXRlbXMsIHR5cGUsIHZhbHVlLCBvcHRpb25OYW1lfSkgPT4ge1xuXHRjb25zdCBkdXBsaWNhdGVTdGRpb0l0ZW0gPSBvdGhlclN0ZGlvSXRlbXMuZmluZCgoe3ZhbHVlOiB7dHJhbnNmb3JtfX0pID0+IHRyYW5zZm9ybSA9PT0gdmFsdWUudHJhbnNmb3JtKTtcblx0dGhyb3dPbkR1cGxpY2F0ZVN0cmVhbShkdXBsaWNhdGVTdGRpb0l0ZW0sIG9wdGlvbk5hbWUsIHR5cGUpO1xufTtcblxuY29uc3QgdGhyb3dPbkR1cGxpY2F0ZVN0cmVhbSA9IChzdGRpb0l0ZW0sIG9wdGlvbk5hbWUsIHR5cGUpID0+IHtcblx0aWYgKHN0ZGlvSXRlbSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlIFxcYCR7c3RkaW9JdGVtLm9wdGlvbk5hbWV9XFxgIGFuZCBcXGAke29wdGlvbk5hbWV9XFxgIG9wdGlvbnMgbXVzdCBub3QgdGFyZ2V0ICR7VFlQRV9UT19NRVNTQUdFW3R5cGVdfSB0aGF0IGlzIHRoZSBzYW1lLmApO1xuXHR9XG59O1xuIiwgImltcG9ydCB7Z2V0U3RyZWFtTmFtZSwgaXNTdGFuZGFyZFN0cmVhbX0gZnJvbSAnLi4vdXRpbHMvc3RhbmRhcmQtc3RyZWFtLmpzJztcbmltcG9ydCB7bm9ybWFsaXplVHJhbnNmb3Jtc30gZnJvbSAnLi4vdHJhbnNmb3JtL25vcm1hbGl6ZS5qcyc7XG5pbXBvcnQge2dldEZkT2JqZWN0TW9kZX0gZnJvbSAnLi4vdHJhbnNmb3JtL29iamVjdC1tb2RlLmpzJztcbmltcG9ydCB7XG5cdGdldFN0ZGlvSXRlbVR5cGUsXG5cdGlzUmVndWxhclVybCxcblx0aXNVbmtub3duU3RkaW9TdHJpbmcsXG5cdEZJTEVfVFlQRVMsXG59IGZyb20gJy4vdHlwZS5qcyc7XG5pbXBvcnQge2dldFN0cmVhbURpcmVjdGlvbn0gZnJvbSAnLi9kaXJlY3Rpb24uanMnO1xuaW1wb3J0IHtub3JtYWxpemVTdGRpb09wdGlvbn0gZnJvbSAnLi9zdGRpby1vcHRpb24uanMnO1xuaW1wb3J0IHtoYW5kbGVOYXRpdmVTdHJlYW19IGZyb20gJy4vbmF0aXZlLmpzJztcbmltcG9ydCB7aGFuZGxlSW5wdXRPcHRpb25zfSBmcm9tICcuL2lucHV0LW9wdGlvbi5qcyc7XG5pbXBvcnQge2ZpbHRlckR1cGxpY2F0ZXMsIGdldER1cGxpY2F0ZVN0cmVhbX0gZnJvbSAnLi9kdXBsaWNhdGUuanMnO1xuXG4vLyBIYW5kbGUgYGlucHV0YCwgYGlucHV0RmlsZWAsIGBzdGRpbmAsIGBzdGRvdXRgIGFuZCBgc3RkZXJyYCBvcHRpb25zLCBiZWZvcmUgc3Bhd25pbmcsIGluIGFzeW5jL3N5bmMgbW9kZVxuLy8gVGhleSBhcmUgY29udmVydGVkIGludG8gYW4gYXJyYXkgb2YgYGZpbGVEZXNjcmlwdG9yc2AuXG4vLyBFYWNoIGBmaWxlRGVzY3JpcHRvcmAgaXMgbm9ybWFsaXplZCwgdmFsaWRhdGVkIGFuZCBjb250YWlucyBhbGwgaW5mb3JtYXRpb24gbmVjZXNzYXJ5IGZvciBmdXJ0aGVyIGhhbmRsaW5nLlxuZXhwb3J0IGNvbnN0IGhhbmRsZVN0ZGlvID0gKGFkZFByb3BlcnRpZXMsIG9wdGlvbnMsIHZlcmJvc2VJbmZvLCBpc1N5bmMpID0+IHtcblx0Y29uc3Qgc3RkaW8gPSBub3JtYWxpemVTdGRpb09wdGlvbihvcHRpb25zLCB2ZXJib3NlSW5mbywgaXNTeW5jKTtcblx0Y29uc3QgaW5pdGlhbEZpbGVEZXNjcmlwdG9ycyA9IHN0ZGlvLm1hcCgoc3RkaW9PcHRpb24sIGZkTnVtYmVyKSA9PiBnZXRGaWxlRGVzY3JpcHRvcih7XG5cdFx0c3RkaW9PcHRpb24sXG5cdFx0ZmROdW1iZXIsXG5cdFx0b3B0aW9ucyxcblx0XHRpc1N5bmMsXG5cdH0pKTtcblx0Y29uc3QgZmlsZURlc2NyaXB0b3JzID0gZ2V0RmluYWxGaWxlRGVzY3JpcHRvcnMoe1xuXHRcdGluaXRpYWxGaWxlRGVzY3JpcHRvcnMsXG5cdFx0YWRkUHJvcGVydGllcyxcblx0XHRvcHRpb25zLFxuXHRcdGlzU3luYyxcblx0fSk7XG5cdG9wdGlvbnMuc3RkaW8gPSBmaWxlRGVzY3JpcHRvcnMubWFwKCh7c3RkaW9JdGVtc30pID0+IGZvcndhcmRTdGRpbyhzdGRpb0l0ZW1zKSk7XG5cdHJldHVybiBmaWxlRGVzY3JpcHRvcnM7XG59O1xuXG5jb25zdCBnZXRGaWxlRGVzY3JpcHRvciA9ICh7c3RkaW9PcHRpb24sIGZkTnVtYmVyLCBvcHRpb25zLCBpc1N5bmN9KSA9PiB7XG5cdGNvbnN0IG9wdGlvbk5hbWUgPSBnZXRTdHJlYW1OYW1lKGZkTnVtYmVyKTtcblx0Y29uc3Qge3N0ZGlvSXRlbXM6IGluaXRpYWxTdGRpb0l0ZW1zLCBpc1N0ZGlvQXJyYXl9ID0gaW5pdGlhbGl6ZVN0ZGlvSXRlbXMoe1xuXHRcdHN0ZGlvT3B0aW9uLFxuXHRcdGZkTnVtYmVyLFxuXHRcdG9wdGlvbnMsXG5cdFx0b3B0aW9uTmFtZSxcblx0fSk7XG5cdGNvbnN0IGRpcmVjdGlvbiA9IGdldFN0cmVhbURpcmVjdGlvbihpbml0aWFsU3RkaW9JdGVtcywgZmROdW1iZXIsIG9wdGlvbk5hbWUpO1xuXHRjb25zdCBzdGRpb0l0ZW1zID0gaW5pdGlhbFN0ZGlvSXRlbXMubWFwKHN0ZGlvSXRlbSA9PiBoYW5kbGVOYXRpdmVTdHJlYW0oe1xuXHRcdHN0ZGlvSXRlbSxcblx0XHRpc1N0ZGlvQXJyYXksXG5cdFx0ZmROdW1iZXIsXG5cdFx0ZGlyZWN0aW9uLFxuXHRcdGlzU3luYyxcblx0fSkpO1xuXHRjb25zdCBub3JtYWxpemVkU3RkaW9JdGVtcyA9IG5vcm1hbGl6ZVRyYW5zZm9ybXMoc3RkaW9JdGVtcywgb3B0aW9uTmFtZSwgZGlyZWN0aW9uLCBvcHRpb25zKTtcblx0Y29uc3Qgb2JqZWN0TW9kZSA9IGdldEZkT2JqZWN0TW9kZShub3JtYWxpemVkU3RkaW9JdGVtcywgZGlyZWN0aW9uKTtcblx0dmFsaWRhdGVGaWxlT2JqZWN0TW9kZShub3JtYWxpemVkU3RkaW9JdGVtcywgb2JqZWN0TW9kZSk7XG5cdHJldHVybiB7ZGlyZWN0aW9uLCBvYmplY3RNb2RlLCBzdGRpb0l0ZW1zOiBub3JtYWxpemVkU3RkaW9JdGVtc307XG59O1xuXG4vLyBXZSBtYWtlIHN1cmUgcGFzc2luZyBhbiBhcnJheSB3aXRoIGEgc2luZ2xlIGl0ZW0gYmVoYXZlcyB0aGUgc2FtZSBhcyBwYXNzaW5nIHRoYXQgaXRlbSB3aXRob3V0IGFuIGFycmF5LlxuLy8gVGhpcyBpcyB3aGF0IHVzZXJzIHdvdWxkIGV4cGVjdC5cbi8vIEZvciBleGFtcGxlLCBgc3Rkb3V0OiBbJ2lnbm9yZSddYCBiZWhhdmVzIHRoZSBzYW1lIGFzIGBzdGRvdXQ6ICdpZ25vcmUnYC5cbmNvbnN0IGluaXRpYWxpemVTdGRpb0l0ZW1zID0gKHtzdGRpb09wdGlvbiwgZmROdW1iZXIsIG9wdGlvbnMsIG9wdGlvbk5hbWV9KSA9PiB7XG5cdGNvbnN0IHZhbHVlcyA9IEFycmF5LmlzQXJyYXkoc3RkaW9PcHRpb24pID8gc3RkaW9PcHRpb24gOiBbc3RkaW9PcHRpb25dO1xuXHRjb25zdCBpbml0aWFsU3RkaW9JdGVtcyA9IFtcblx0XHQuLi52YWx1ZXMubWFwKHZhbHVlID0+IGluaXRpYWxpemVTdGRpb0l0ZW0odmFsdWUsIG9wdGlvbk5hbWUpKSxcblx0XHQuLi5oYW5kbGVJbnB1dE9wdGlvbnMob3B0aW9ucywgZmROdW1iZXIpLFxuXHRdO1xuXG5cdGNvbnN0IHN0ZGlvSXRlbXMgPSBmaWx0ZXJEdXBsaWNhdGVzKGluaXRpYWxTdGRpb0l0ZW1zKTtcblx0Y29uc3QgaXNTdGRpb0FycmF5ID0gc3RkaW9JdGVtcy5sZW5ndGggPiAxO1xuXHR2YWxpZGF0ZVN0ZGlvQXJyYXkoc3RkaW9JdGVtcywgaXNTdGRpb0FycmF5LCBvcHRpb25OYW1lKTtcblx0dmFsaWRhdGVTdHJlYW1zKHN0ZGlvSXRlbXMpO1xuXHRyZXR1cm4ge3N0ZGlvSXRlbXMsIGlzU3RkaW9BcnJheX07XG59O1xuXG5jb25zdCBpbml0aWFsaXplU3RkaW9JdGVtID0gKHZhbHVlLCBvcHRpb25OYW1lKSA9PiAoe1xuXHR0eXBlOiBnZXRTdGRpb0l0ZW1UeXBlKHZhbHVlLCBvcHRpb25OYW1lKSxcblx0dmFsdWUsXG5cdG9wdGlvbk5hbWUsXG59KTtcblxuY29uc3QgdmFsaWRhdGVTdGRpb0FycmF5ID0gKHN0ZGlvSXRlbXMsIGlzU3RkaW9BcnJheSwgb3B0aW9uTmFtZSkgPT4ge1xuXHRpZiAoc3RkaW9JdGVtcy5sZW5ndGggPT09IDApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgXFxgJHtvcHRpb25OYW1lfVxcYCBvcHRpb24gbXVzdCBub3QgYmUgYW4gZW1wdHkgYXJyYXkuYCk7XG5cdH1cblxuXHRpZiAoIWlzU3RkaW9BcnJheSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGZvciAoY29uc3Qge3ZhbHVlLCBvcHRpb25OYW1lfSBvZiBzdGRpb0l0ZW1zKSB7XG5cdFx0aWYgKElOVkFMSURfU1RESU9fQVJSQVlfT1BUSU9OUy5oYXModmFsdWUpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFRoZSBcXGAke29wdGlvbk5hbWV9XFxgIG9wdGlvbiBtdXN0IG5vdCBpbmNsdWRlIFxcYCR7dmFsdWV9XFxgLmApO1xuXHRcdH1cblx0fVxufTtcblxuLy8gVXNpbmcgdGhvc2UgYHN0ZGlvYCB2YWx1ZXMgdG9nZXRoZXIgd2l0aCBvdGhlcnMgZm9yIHRoZSBzYW1lIHN0cmVhbSBkb2VzIG5vdCBtYWtlIHNlbnNlLCBzbyB3ZSBtYWtlIGl0IGZhaWwuXG4vLyBIb3dldmVyLCB3ZSBkbyBhbGxvdyBpdCBpZiB0aGUgYXJyYXkgaGFzIGEgc2luZ2xlIGl0ZW0uXG5jb25zdCBJTlZBTElEX1NURElPX0FSUkFZX09QVElPTlMgPSBuZXcgU2V0KFsnaWdub3JlJywgJ2lwYyddKTtcblxuY29uc3QgdmFsaWRhdGVTdHJlYW1zID0gc3RkaW9JdGVtcyA9PiB7XG5cdGZvciAoY29uc3Qgc3RkaW9JdGVtIG9mIHN0ZGlvSXRlbXMpIHtcblx0XHR2YWxpZGF0ZUZpbGVTdGRpbyhzdGRpb0l0ZW0pO1xuXHR9XG59O1xuXG5jb25zdCB2YWxpZGF0ZUZpbGVTdGRpbyA9ICh7dHlwZSwgdmFsdWUsIG9wdGlvbk5hbWV9KSA9PiB7XG5cdGlmIChpc1JlZ3VsYXJVcmwodmFsdWUpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlIFxcYCR7b3B0aW9uTmFtZX06IFVSTFxcYCBvcHRpb24gbXVzdCB1c2UgdGhlIFxcYGZpbGU6XFxgIHNjaGVtZS5cbkZvciBleGFtcGxlLCB5b3UgY2FuIHVzZSB0aGUgXFxgcGF0aFRvRmlsZVVSTCgpXFxgIG1ldGhvZCBvZiB0aGUgXFxgdXJsXFxgIGNvcmUgbW9kdWxlLmApO1xuXHR9XG5cblx0aWYgKGlzVW5rbm93blN0ZGlvU3RyaW5nKHR5cGUsIHZhbHVlKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBcXGAke29wdGlvbk5hbWV9OiB7IGZpbGU6ICcuLi4nIH1cXGAgb3B0aW9uIG11c3QgYmUgdXNlZCBpbnN0ZWFkIG9mIFxcYCR7b3B0aW9uTmFtZX06ICcuLi4nXFxgLmApO1xuXHR9XG59O1xuXG5jb25zdCB2YWxpZGF0ZUZpbGVPYmplY3RNb2RlID0gKHN0ZGlvSXRlbXMsIG9iamVjdE1vZGUpID0+IHtcblx0aWYgKCFvYmplY3RNb2RlKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgZmlsZVN0ZGlvSXRlbSA9IHN0ZGlvSXRlbXMuZmluZCgoe3R5cGV9KSA9PiBGSUxFX1RZUEVTLmhhcyh0eXBlKSk7XG5cdGlmIChmaWxlU3RkaW9JdGVtICE9PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgXFxgJHtmaWxlU3RkaW9JdGVtLm9wdGlvbk5hbWV9XFxgIG9wdGlvbiBjYW5ub3QgdXNlIGJvdGggZmlsZXMgYW5kIHRyYW5zZm9ybXMgaW4gb2JqZWN0TW9kZS5gKTtcblx0fVxufTtcblxuLy8gU29tZSBgc3RkaW9gIHZhbHVlcyByZXF1aXJlIEV4ZWNhIHRvIGNyZWF0ZSBzdHJlYW1zLlxuLy8gRm9yIGV4YW1wbGUsIGZpbGUgcGF0aHMgY3JlYXRlIGZpbGUgcmVhZC93cml0ZSBzdHJlYW1zLlxuLy8gVGhvc2UgdHJhbnNmb3JtYXRpb25zIGFyZSBzcGVjaWZpZWQgaW4gYGFkZFByb3BlcnRpZXNgLCB3aGljaCBpcyBib3RoIGRpcmVjdGlvbi1zcGVjaWZpYyBhbmQgdHlwZS1zcGVjaWZpYy5cbmNvbnN0IGdldEZpbmFsRmlsZURlc2NyaXB0b3JzID0gKHtpbml0aWFsRmlsZURlc2NyaXB0b3JzLCBhZGRQcm9wZXJ0aWVzLCBvcHRpb25zLCBpc1N5bmN9KSA9PiB7XG5cdGNvbnN0IGZpbGVEZXNjcmlwdG9ycyA9IFtdO1xuXG5cdHRyeSB7XG5cdFx0Zm9yIChjb25zdCBmaWxlRGVzY3JpcHRvciBvZiBpbml0aWFsRmlsZURlc2NyaXB0b3JzKSB7XG5cdFx0XHRmaWxlRGVzY3JpcHRvcnMucHVzaChnZXRGaW5hbEZpbGVEZXNjcmlwdG9yKHtcblx0XHRcdFx0ZmlsZURlc2NyaXB0b3IsXG5cdFx0XHRcdGZpbGVEZXNjcmlwdG9ycyxcblx0XHRcdFx0YWRkUHJvcGVydGllcyxcblx0XHRcdFx0b3B0aW9ucyxcblx0XHRcdFx0aXNTeW5jLFxuXHRcdFx0fSkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmaWxlRGVzY3JpcHRvcnM7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y2xlYW51cEN1c3RvbVN0cmVhbXMoZmlsZURlc2NyaXB0b3JzKTtcblx0XHR0aHJvdyBlcnJvcjtcblx0fVxufTtcblxuY29uc3QgZ2V0RmluYWxGaWxlRGVzY3JpcHRvciA9ICh7XG5cdGZpbGVEZXNjcmlwdG9yOiB7ZGlyZWN0aW9uLCBvYmplY3RNb2RlLCBzdGRpb0l0ZW1zfSxcblx0ZmlsZURlc2NyaXB0b3JzLFxuXHRhZGRQcm9wZXJ0aWVzLFxuXHRvcHRpb25zLFxuXHRpc1N5bmMsXG59KSA9PiB7XG5cdGNvbnN0IGZpbmFsU3RkaW9JdGVtcyA9IHN0ZGlvSXRlbXMubWFwKHN0ZGlvSXRlbSA9PiBhZGRTdHJlYW1Qcm9wZXJ0aWVzKHtcblx0XHRzdGRpb0l0ZW0sXG5cdFx0YWRkUHJvcGVydGllcyxcblx0XHRkaXJlY3Rpb24sXG5cdFx0b3B0aW9ucyxcblx0XHRmaWxlRGVzY3JpcHRvcnMsXG5cdFx0aXNTeW5jLFxuXHR9KSk7XG5cdHJldHVybiB7ZGlyZWN0aW9uLCBvYmplY3RNb2RlLCBzdGRpb0l0ZW1zOiBmaW5hbFN0ZGlvSXRlbXN9O1xufTtcblxuY29uc3QgYWRkU3RyZWFtUHJvcGVydGllcyA9ICh7c3RkaW9JdGVtLCBhZGRQcm9wZXJ0aWVzLCBkaXJlY3Rpb24sIG9wdGlvbnMsIGZpbGVEZXNjcmlwdG9ycywgaXNTeW5jfSkgPT4ge1xuXHRjb25zdCBkdXBsaWNhdGVTdHJlYW0gPSBnZXREdXBsaWNhdGVTdHJlYW0oe1xuXHRcdHN0ZGlvSXRlbSxcblx0XHRkaXJlY3Rpb24sXG5cdFx0ZmlsZURlc2NyaXB0b3JzLFxuXHRcdGlzU3luYyxcblx0fSk7XG5cblx0aWYgKGR1cGxpY2F0ZVN0cmVhbSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIHsuLi5zdGRpb0l0ZW0sIHN0cmVhbTogZHVwbGljYXRlU3RyZWFtfTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0Li4uc3RkaW9JdGVtLFxuXHRcdC4uLmFkZFByb3BlcnRpZXNbZGlyZWN0aW9uXVtzdGRpb0l0ZW0udHlwZV0oc3RkaW9JdGVtLCBvcHRpb25zKSxcblx0fTtcbn07XG5cbi8vIFRoZSBzdHJlYW0gZXJyb3IgaGFuZGxpbmcgaXMgcGVyZm9ybWVkIGJ5IHRoZSBwaXBpbmcgbG9naWMgYWJvdmUsIHdoaWNoIGNhbm5vdCBiZSBwZXJmb3JtZWQgYmVmb3JlIHN1YnByb2Nlc3Mgc3Bhd25pbmcuXG4vLyBJZiB0aGUgc3VicHJvY2VzcyBzcGF3bmluZyBmYWlscyAoZS5nLiBkdWUgdG8gYW4gaW52YWxpZCBjb21tYW5kKSwgdGhlIHN0cmVhbXMgbmVlZCB0byBiZSBtYW51YWxseSBkZXN0cm95ZWQuXG4vLyBXZSBuZWVkIHRvIGNyZWF0ZSB0aG9zZSBzdHJlYW1zIGJlZm9yZSBzdWJwcm9jZXNzIHNwYXduaW5nLCBpbiBjYXNlIHRoZWlyIGNyZWF0aW9uIGZhaWxzLCBlLmcuIHdoZW4gcGFzc2luZyBhbiBpbnZhbGlkIGdlbmVyYXRvciBhcyBhcmd1bWVudC5cbi8vIExpa2UgdGhpcywgYW4gZXhjZXB0aW9uIHdvdWxkIGJlIHRocm93biwgd2hpY2ggd291bGQgcHJldmVudCBzcGF3bmluZyBhIHN1YnByb2Nlc3MuXG5leHBvcnQgY29uc3QgY2xlYW51cEN1c3RvbVN0cmVhbXMgPSBmaWxlRGVzY3JpcHRvcnMgPT4ge1xuXHRmb3IgKGNvbnN0IHtzdGRpb0l0ZW1zfSBvZiBmaWxlRGVzY3JpcHRvcnMpIHtcblx0XHRmb3IgKGNvbnN0IHtzdHJlYW19IG9mIHN0ZGlvSXRlbXMpIHtcblx0XHRcdGlmIChzdHJlYW0gIT09IHVuZGVmaW5lZCAmJiAhaXNTdGFuZGFyZFN0cmVhbShzdHJlYW0pKSB7XG5cdFx0XHRcdHN0cmVhbS5kZXN0cm95KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuXG4vLyBXaGVuIHRoZSBgc3RkKjogSXRlcmFibGUgfCBXZWJTdHJlYW0gfCBVUkwgfCBmaWxlUGF0aGAsIGBpbnB1dGAgb3IgYGlucHV0RmlsZWAgb3B0aW9uIGlzIHVzZWQsIHdlIHBpcGUgdG8gYHN1YnByb2Nlc3Muc3RkKmAuXG4vLyBXaGVuIHRoZSBgc3RkKjogQXJyYXlgIG9wdGlvbiBpcyB1c2VkLCB3ZSBlbXVsYXRlIHNvbWUgb2YgdGhlIG5hdGl2ZSB2YWx1ZXMgKCdpbmhlcml0JywgTm9kZS5qcyBzdHJlYW0gYW5kIGZpbGUgZGVzY3JpcHRvciBpbnRlZ2VyKS4gVG8gZG8gc28sIHdlIGFsc28gbmVlZCB0byBwaXBlIHRvIGBzdWJwcm9jZXNzLnN0ZCpgLlxuLy8gVGhlcmVmb3JlIHRoZSBgc3RkKmAgb3B0aW9ucyBtdXN0IGJlIGVpdGhlciBgcGlwZWAgb3IgYG92ZXJsYXBwZWRgLiBPdGhlciB2YWx1ZXMgZG8gbm90IHNldCBgc3VicHJvY2Vzcy5zdGQqYC5cbmNvbnN0IGZvcndhcmRTdGRpbyA9IHN0ZGlvSXRlbXMgPT4ge1xuXHRpZiAoc3RkaW9JdGVtcy5sZW5ndGggPiAxKSB7XG5cdFx0cmV0dXJuIHN0ZGlvSXRlbXMuc29tZSgoe3ZhbHVlfSkgPT4gdmFsdWUgPT09ICdvdmVybGFwcGVkJykgPyAnb3ZlcmxhcHBlZCcgOiAncGlwZSc7XG5cdH1cblxuXHRjb25zdCBbe3R5cGUsIHZhbHVlfV0gPSBzdGRpb0l0ZW1zO1xuXHRyZXR1cm4gdHlwZSA9PT0gJ25hdGl2ZScgPyB2YWx1ZSA6ICdwaXBlJztcbn07XG4iLCAiaW1wb3J0IHtyZWFkRmlsZVN5bmN9IGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0IHtidWZmZXJUb1VpbnQ4QXJyYXl9IGZyb20gJy4uL3V0aWxzL3VpbnQtYXJyYXkuanMnO1xuaW1wb3J0IHtoYW5kbGVTdGRpb30gZnJvbSAnLi9oYW5kbGUuanMnO1xuaW1wb3J0IHtUWVBFX1RPX01FU1NBR0V9IGZyb20gJy4vdHlwZS5qcyc7XG5cbi8vIE5vcm1hbGl6ZSBgaW5wdXRgLCBgaW5wdXRGaWxlYCwgYHN0ZGluYCwgYHN0ZG91dGAgYW5kIGBzdGRlcnJgIG9wdGlvbnMsIGJlZm9yZSBzcGF3bmluZywgaW4gc3luYyBtb2RlXG5leHBvcnQgY29uc3QgaGFuZGxlU3RkaW9TeW5jID0gKG9wdGlvbnMsIHZlcmJvc2VJbmZvKSA9PiBoYW5kbGVTdGRpbyhhZGRQcm9wZXJ0aWVzU3luYywgb3B0aW9ucywgdmVyYm9zZUluZm8sIHRydWUpO1xuXG5jb25zdCBmb3JiaWRkZW5JZlN5bmMgPSAoe3R5cGUsIG9wdGlvbk5hbWV9KSA9PiB7XG5cdHRocm93SW52YWxpZFN5bmNWYWx1ZShvcHRpb25OYW1lLCBUWVBFX1RPX01FU1NBR0VbdHlwZV0pO1xufTtcblxuY29uc3QgZm9yYmlkZGVuTmF0aXZlSWZTeW5jID0gKHtvcHRpb25OYW1lLCB2YWx1ZX0pID0+IHtcblx0aWYgKHZhbHVlID09PSAnaXBjJyB8fCB2YWx1ZSA9PT0gJ292ZXJsYXBwZWQnKSB7XG5cdFx0dGhyb3dJbnZhbGlkU3luY1ZhbHVlKG9wdGlvbk5hbWUsIGBcIiR7dmFsdWV9XCJgKTtcblx0fVxuXG5cdHJldHVybiB7fTtcbn07XG5cbmNvbnN0IHRocm93SW52YWxpZFN5bmNWYWx1ZSA9IChvcHRpb25OYW1lLCB2YWx1ZSkgPT4ge1xuXHR0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgXFxgJHtvcHRpb25OYW1lfVxcYCBvcHRpb24gY2Fubm90IGJlICR7dmFsdWV9IHdpdGggc3luY2hyb25vdXMgbWV0aG9kcy5gKTtcbn07XG5cbi8vIENyZWF0ZSBzdHJlYW1zIHVzZWQgaW50ZXJuYWxseSBmb3IgcmVkaXJlY3Rpbmcgd2hlbiB1c2luZyBzcGVjaWZpYyB2YWx1ZXMgZm9yIHRoZSBgc3RkKmAgb3B0aW9ucywgaW4gc3luYyBtb2RlLlxuLy8gRm9yIGV4YW1wbGUsIGBzdGRpbjoge2ZpbGV9YCByZWFkcyB0aGUgZmlsZSBzeW5jaHJvbm91c2x5LCB0aGVuIHBhc3NlcyBpdCBhcyB0aGUgYGlucHV0YCBvcHRpb24uXG5jb25zdCBhZGRQcm9wZXJ0aWVzID0ge1xuXHRnZW5lcmF0b3IoKSB7fSxcblx0YXN5bmNHZW5lcmF0b3I6IGZvcmJpZGRlbklmU3luYyxcblx0d2ViU3RyZWFtOiBmb3JiaWRkZW5JZlN5bmMsXG5cdG5vZGVTdHJlYW06IGZvcmJpZGRlbklmU3luYyxcblx0d2ViVHJhbnNmb3JtOiBmb3JiaWRkZW5JZlN5bmMsXG5cdGR1cGxleDogZm9yYmlkZGVuSWZTeW5jLFxuXHRhc3luY0l0ZXJhYmxlOiBmb3JiaWRkZW5JZlN5bmMsXG5cdG5hdGl2ZTogZm9yYmlkZGVuTmF0aXZlSWZTeW5jLFxufTtcblxuY29uc3QgYWRkUHJvcGVydGllc1N5bmMgPSB7XG5cdGlucHV0OiB7XG5cdFx0Li4uYWRkUHJvcGVydGllcyxcblx0XHRmaWxlVXJsOiAoe3ZhbHVlfSkgPT4gKHtjb250ZW50czogW2J1ZmZlclRvVWludDhBcnJheShyZWFkRmlsZVN5bmModmFsdWUpKV19KSxcblx0XHRmaWxlUGF0aDogKHt2YWx1ZToge2ZpbGV9fSkgPT4gKHtjb250ZW50czogW2J1ZmZlclRvVWludDhBcnJheShyZWFkRmlsZVN5bmMoZmlsZSkpXX0pLFxuXHRcdGZpbGVOdW1iZXI6IGZvcmJpZGRlbklmU3luYyxcblx0XHRpdGVyYWJsZTogKHt2YWx1ZX0pID0+ICh7Y29udGVudHM6IFsuLi52YWx1ZV19KSxcblx0XHRzdHJpbmc6ICh7dmFsdWV9KSA9PiAoe2NvbnRlbnRzOiBbdmFsdWVdfSksXG5cdFx0dWludDhBcnJheTogKHt2YWx1ZX0pID0+ICh7Y29udGVudHM6IFt2YWx1ZV19KSxcblx0fSxcblx0b3V0cHV0OiB7XG5cdFx0Li4uYWRkUHJvcGVydGllcyxcblx0XHRmaWxlVXJsOiAoe3ZhbHVlfSkgPT4gKHtwYXRoOiB2YWx1ZX0pLFxuXHRcdGZpbGVQYXRoOiAoe3ZhbHVlOiB7ZmlsZSwgYXBwZW5kfX0pID0+ICh7cGF0aDogZmlsZSwgYXBwZW5kfSksXG5cdFx0ZmlsZU51bWJlcjogKHt2YWx1ZX0pID0+ICh7cGF0aDogdmFsdWV9KSxcblx0XHRpdGVyYWJsZTogZm9yYmlkZGVuSWZTeW5jLFxuXHRcdHN0cmluZzogZm9yYmlkZGVuSWZTeW5jLFxuXHRcdHVpbnQ4QXJyYXk6IGZvcmJpZGRlbklmU3luYyxcblx0fSxcbn07XG4iLCAiaW1wb3J0IHN0cmlwRmluYWxOZXdsaW5lRnVuY3Rpb24gZnJvbSAnc3RyaXAtZmluYWwtbmV3bGluZSc7XG5cbi8vIEFwcGx5IGBzdHJpcEZpbmFsTmV3bGluZWAgb3B0aW9uLCB3aGljaCBhcHBsaWVzIHRvIGByZXN1bHQuc3Rkb3V0fHN0ZGVycnxhbGx8c3RkaW9bKl1gLlxuLy8gSWYgdGhlIGBsaW5lc2Agb3B0aW9uIGlzIHVzZWQsIGl0IGlzIGFwcGxpZWQgb24gZWFjaCBsaW5lLCBidXQgdXNpbmcgYSBkaWZmZXJlbnQgZnVuY3Rpb24uXG5leHBvcnQgY29uc3Qgc3RyaXBOZXdsaW5lID0gKHZhbHVlLCB7c3RyaXBGaW5hbE5ld2xpbmV9LCBmZE51bWJlcikgPT4gZ2V0U3RyaXBGaW5hbE5ld2xpbmUoc3RyaXBGaW5hbE5ld2xpbmUsIGZkTnVtYmVyKSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICFBcnJheS5pc0FycmF5KHZhbHVlKVxuXHQ/IHN0cmlwRmluYWxOZXdsaW5lRnVuY3Rpb24odmFsdWUpXG5cdDogdmFsdWU7XG5cbi8vIFJldHJpZXZlIGBzdHJpcEZpbmFsTmV3bGluZWAgb3B0aW9uIHZhbHVlLCBpbmNsdWRpbmcgd2l0aCBgc3VicHJvY2Vzcy5hbGxgXG5leHBvcnQgY29uc3QgZ2V0U3RyaXBGaW5hbE5ld2xpbmUgPSAoc3RyaXBGaW5hbE5ld2xpbmUsIGZkTnVtYmVyKSA9PiBmZE51bWJlciA9PT0gJ2FsbCdcblx0PyBzdHJpcEZpbmFsTmV3bGluZVsxXSB8fCBzdHJpcEZpbmFsTmV3bGluZVsyXVxuXHQ6IHN0cmlwRmluYWxOZXdsaW5lW2ZkTnVtYmVyXTtcbiIsICIvLyBTcGxpdCBjaHVua3MgbGluZS13aXNlIGZvciBnZW5lcmF0b3JzIHBhc3NlZCB0byB0aGUgYHN0ZCpgIG9wdGlvbnNcbmV4cG9ydCBjb25zdCBnZXRTcGxpdExpbmVzR2VuZXJhdG9yID0gKGJpbmFyeSwgcHJlc2VydmVOZXdsaW5lcywgc2tpcHBlZCwgc3RhdGUpID0+IGJpbmFyeSB8fCBza2lwcGVkXG5cdD8gdW5kZWZpbmVkXG5cdDogaW5pdGlhbGl6ZVNwbGl0TGluZXMocHJlc2VydmVOZXdsaW5lcywgc3RhdGUpO1xuXG4vLyBTYW1lIGJ1dCBmb3Igc3luY2hyb25vdXMgbWV0aG9kc1xuZXhwb3J0IGNvbnN0IHNwbGl0TGluZXNTeW5jID0gKGNodW5rLCBwcmVzZXJ2ZU5ld2xpbmVzLCBvYmplY3RNb2RlKSA9PiBvYmplY3RNb2RlXG5cdD8gY2h1bmsuZmxhdE1hcChpdGVtID0+IHNwbGl0TGluZXNJdGVtU3luYyhpdGVtLCBwcmVzZXJ2ZU5ld2xpbmVzKSlcblx0OiBzcGxpdExpbmVzSXRlbVN5bmMoY2h1bmssIHByZXNlcnZlTmV3bGluZXMpO1xuXG5jb25zdCBzcGxpdExpbmVzSXRlbVN5bmMgPSAoY2h1bmssIHByZXNlcnZlTmV3bGluZXMpID0+IHtcblx0Y29uc3Qge3RyYW5zZm9ybSwgZmluYWx9ID0gaW5pdGlhbGl6ZVNwbGl0TGluZXMocHJlc2VydmVOZXdsaW5lcywge30pO1xuXHRyZXR1cm4gWy4uLnRyYW5zZm9ybShjaHVuayksIC4uLmZpbmFsKCldO1xufTtcblxuY29uc3QgaW5pdGlhbGl6ZVNwbGl0TGluZXMgPSAocHJlc2VydmVOZXdsaW5lcywgc3RhdGUpID0+IHtcblx0c3RhdGUucHJldmlvdXNDaHVua3MgPSAnJztcblx0cmV0dXJuIHtcblx0XHR0cmFuc2Zvcm06IHNwbGl0R2VuZXJhdG9yLmJpbmQodW5kZWZpbmVkLCBzdGF0ZSwgcHJlc2VydmVOZXdsaW5lcyksXG5cdFx0ZmluYWw6IGxpbmVzRmluYWwuYmluZCh1bmRlZmluZWQsIHN0YXRlKSxcblx0fTtcbn07XG5cbi8vIFRoaXMgaW1wZXJhdGl2ZSBsb2dpYyBpcyBtdWNoIGZhc3RlciB0aGFuIHVzaW5nIGBTdHJpbmcuc3BsaXQoKWAgYW5kIHVzZXMgdmVyeSBsb3cgbWVtb3J5LlxuY29uc3Qgc3BsaXRHZW5lcmF0b3IgPSBmdW5jdGlvbiAqIChzdGF0ZSwgcHJlc2VydmVOZXdsaW5lcywgY2h1bmspIHtcblx0aWYgKHR5cGVvZiBjaHVuayAhPT0gJ3N0cmluZycpIHtcblx0XHR5aWVsZCBjaHVuaztcblx0XHRyZXR1cm47XG5cdH1cblxuXHRsZXQge3ByZXZpb3VzQ2h1bmtzfSA9IHN0YXRlO1xuXHRsZXQgc3RhcnQgPSAtMTtcblxuXHRmb3IgKGxldCBlbmQgPSAwOyBlbmQgPCBjaHVuay5sZW5ndGg7IGVuZCArPSAxKSB7XG5cdFx0aWYgKGNodW5rW2VuZF0gPT09ICdcXG4nKSB7XG5cdFx0XHRjb25zdCBuZXdsaW5lTGVuZ3RoID0gZ2V0TmV3bGluZUxlbmd0aChjaHVuaywgZW5kLCBwcmVzZXJ2ZU5ld2xpbmVzLCBzdGF0ZSk7XG5cdFx0XHRsZXQgbGluZSA9IGNodW5rLnNsaWNlKHN0YXJ0ICsgMSwgZW5kICsgMSAtIG5ld2xpbmVMZW5ndGgpO1xuXG5cdFx0XHRpZiAocHJldmlvdXNDaHVua3MubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRsaW5lID0gY29uY2F0U3RyaW5nKHByZXZpb3VzQ2h1bmtzLCBsaW5lKTtcblx0XHRcdFx0cHJldmlvdXNDaHVua3MgPSAnJztcblx0XHRcdH1cblxuXHRcdFx0eWllbGQgbGluZTtcblx0XHRcdHN0YXJ0ID0gZW5kO1xuXHRcdH1cblx0fVxuXG5cdGlmIChzdGFydCAhPT0gY2h1bmsubGVuZ3RoIC0gMSkge1xuXHRcdHByZXZpb3VzQ2h1bmtzID0gY29uY2F0U3RyaW5nKHByZXZpb3VzQ2h1bmtzLCBjaHVuay5zbGljZShzdGFydCArIDEpKTtcblx0fVxuXG5cdHN0YXRlLnByZXZpb3VzQ2h1bmtzID0gcHJldmlvdXNDaHVua3M7XG59O1xuXG5jb25zdCBnZXROZXdsaW5lTGVuZ3RoID0gKGNodW5rLCBlbmQsIHByZXNlcnZlTmV3bGluZXMsIHN0YXRlKSA9PiB7XG5cdGlmIChwcmVzZXJ2ZU5ld2xpbmVzKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRzdGF0ZS5pc1dpbmRvd3NOZXdsaW5lID0gZW5kICE9PSAwICYmIGNodW5rW2VuZCAtIDFdID09PSAnXFxyJztcblx0cmV0dXJuIHN0YXRlLmlzV2luZG93c05ld2xpbmUgPyAyIDogMTtcbn07XG5cbmNvbnN0IGxpbmVzRmluYWwgPSBmdW5jdGlvbiAqICh7cHJldmlvdXNDaHVua3N9KSB7XG5cdGlmIChwcmV2aW91c0NodW5rcy5sZW5ndGggPiAwKSB7XG5cdFx0eWllbGQgcHJldmlvdXNDaHVua3M7XG5cdH1cbn07XG5cbi8vIFVubGVzcyBgcHJlc2VydmVOZXdsaW5lczogdHJ1ZWAgaXMgdXNlZCwgd2Ugc3RyaXAgdGhlIG5ld2xpbmUgb2YgZWFjaCBsaW5lLlxuLy8gVGhpcyByZS1hZGRzIHRoZW0gYWZ0ZXIgdGhlIHVzZXIgYHRyYW5zZm9ybWAgY29kZSBoYXMgcnVuLlxuZXhwb3J0IGNvbnN0IGdldEFwcGVuZE5ld2xpbmVHZW5lcmF0b3IgPSAoe2JpbmFyeSwgcHJlc2VydmVOZXdsaW5lcywgcmVhZGFibGVPYmplY3RNb2RlLCBzdGF0ZX0pID0+IGJpbmFyeSB8fCBwcmVzZXJ2ZU5ld2xpbmVzIHx8IHJlYWRhYmxlT2JqZWN0TW9kZVxuXHQ/IHVuZGVmaW5lZFxuXHQ6IHt0cmFuc2Zvcm06IGFwcGVuZE5ld2xpbmVHZW5lcmF0b3IuYmluZCh1bmRlZmluZWQsIHN0YXRlKX07XG5cbmNvbnN0IGFwcGVuZE5ld2xpbmVHZW5lcmF0b3IgPSBmdW5jdGlvbiAqICh7aXNXaW5kb3dzTmV3bGluZSA9IGZhbHNlfSwgY2h1bmspIHtcblx0Y29uc3Qge3VuaXhOZXdsaW5lLCB3aW5kb3dzTmV3bGluZSwgTEYsIGNvbmNhdEJ5dGVzfSA9IHR5cGVvZiBjaHVuayA9PT0gJ3N0cmluZycgPyBsaW5lc1N0cmluZ0luZm8gOiBsaW5lc1VpbnQ4QXJyYXlJbmZvO1xuXG5cdGlmIChjaHVuay5hdCgtMSkgPT09IExGKSB7XG5cdFx0eWllbGQgY2h1bms7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgbmV3bGluZSA9IGlzV2luZG93c05ld2xpbmUgPyB3aW5kb3dzTmV3bGluZSA6IHVuaXhOZXdsaW5lO1xuXHR5aWVsZCBjb25jYXRCeXRlcyhjaHVuaywgbmV3bGluZSk7XG59O1xuXG5jb25zdCBjb25jYXRTdHJpbmcgPSAoZmlyc3RDaHVuaywgc2Vjb25kQ2h1bmspID0+IGAke2ZpcnN0Q2h1bmt9JHtzZWNvbmRDaHVua31gO1xuXG5jb25zdCBsaW5lc1N0cmluZ0luZm8gPSB7XG5cdHdpbmRvd3NOZXdsaW5lOiAnXFxyXFxuJyxcblx0dW5peE5ld2xpbmU6ICdcXG4nLFxuXHRMRjogJ1xcbicsXG5cdGNvbmNhdEJ5dGVzOiBjb25jYXRTdHJpbmcsXG59O1xuXG5jb25zdCBjb25jYXRVaW50OEFycmF5ID0gKGZpcnN0Q2h1bmssIHNlY29uZENodW5rKSA9PiB7XG5cdGNvbnN0IGNodW5rID0gbmV3IFVpbnQ4QXJyYXkoZmlyc3RDaHVuay5sZW5ndGggKyBzZWNvbmRDaHVuay5sZW5ndGgpO1xuXHRjaHVuay5zZXQoZmlyc3RDaHVuaywgMCk7XG5cdGNodW5rLnNldChzZWNvbmRDaHVuaywgZmlyc3RDaHVuay5sZW5ndGgpO1xuXHRyZXR1cm4gY2h1bms7XG59O1xuXG5jb25zdCBsaW5lc1VpbnQ4QXJyYXlJbmZvID0ge1xuXHR3aW5kb3dzTmV3bGluZTogbmV3IFVpbnQ4QXJyYXkoWzB4MEQsIDB4MEFdKSxcblx0dW5peE5ld2xpbmU6IG5ldyBVaW50OEFycmF5KFsweDBBXSksXG5cdExGOiAweDBBLFxuXHRjb25jYXRCeXRlczogY29uY2F0VWludDhBcnJheSxcbn07XG4iLCAiaW1wb3J0IHtCdWZmZXJ9IGZyb20gJ25vZGU6YnVmZmVyJztcbmltcG9ydCB7aXNVaW50OEFycmF5fSBmcm9tICcuLi91dGlscy91aW50LWFycmF5LmpzJztcblxuLy8gVmFsaWRhdGUgdGhlIHR5cGUgb2YgY2h1bmsgYXJndW1lbnQgcGFzc2VkIHRvIHRyYW5zZm9ybSBnZW5lcmF0b3JzXG5leHBvcnQgY29uc3QgZ2V0VmFsaWRhdGVUcmFuc2Zvcm1JbnB1dCA9ICh3cml0YWJsZU9iamVjdE1vZGUsIG9wdGlvbk5hbWUpID0+IHdyaXRhYmxlT2JqZWN0TW9kZVxuXHQ/IHVuZGVmaW5lZFxuXHQ6IHZhbGlkYXRlU3RyaW5nVHJhbnNmb3JtSW5wdXQuYmluZCh1bmRlZmluZWQsIG9wdGlvbk5hbWUpO1xuXG5jb25zdCB2YWxpZGF0ZVN0cmluZ1RyYW5zZm9ybUlucHV0ID0gZnVuY3Rpb24gKiAob3B0aW9uTmFtZSwgY2h1bmspIHtcblx0aWYgKHR5cGVvZiBjaHVuayAhPT0gJ3N0cmluZycgJiYgIWlzVWludDhBcnJheShjaHVuaykgJiYgIUJ1ZmZlci5pc0J1ZmZlcihjaHVuaykpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgXFxgJHtvcHRpb25OYW1lfVxcYCBvcHRpb24ncyB0cmFuc2Zvcm0gbXVzdCB1c2UgXCJvYmplY3RNb2RlOiB0cnVlXCIgdG8gcmVjZWl2ZSBhcyBpbnB1dDogJHt0eXBlb2YgY2h1bmt9LmApO1xuXHR9XG5cblx0eWllbGQgY2h1bms7XG59O1xuXG4vLyBWYWxpZGF0ZSB0aGUgdHlwZSBvZiB0aGUgdmFsdWUgcmV0dXJuZWQgYnkgdHJhbnNmb3JtIGdlbmVyYXRvcnNcbmV4cG9ydCBjb25zdCBnZXRWYWxpZGF0ZVRyYW5zZm9ybVJldHVybiA9IChyZWFkYWJsZU9iamVjdE1vZGUsIG9wdGlvbk5hbWUpID0+IHJlYWRhYmxlT2JqZWN0TW9kZVxuXHQ/IHZhbGlkYXRlT2JqZWN0VHJhbnNmb3JtUmV0dXJuLmJpbmQodW5kZWZpbmVkLCBvcHRpb25OYW1lKVxuXHQ6IHZhbGlkYXRlU3RyaW5nVHJhbnNmb3JtUmV0dXJuLmJpbmQodW5kZWZpbmVkLCBvcHRpb25OYW1lKTtcblxuY29uc3QgdmFsaWRhdGVPYmplY3RUcmFuc2Zvcm1SZXR1cm4gPSBmdW5jdGlvbiAqIChvcHRpb25OYW1lLCBjaHVuaykge1xuXHR2YWxpZGF0ZUVtcHR5UmV0dXJuKG9wdGlvbk5hbWUsIGNodW5rKTtcblx0eWllbGQgY2h1bms7XG59O1xuXG5jb25zdCB2YWxpZGF0ZVN0cmluZ1RyYW5zZm9ybVJldHVybiA9IGZ1bmN0aW9uICogKG9wdGlvbk5hbWUsIGNodW5rKSB7XG5cdHZhbGlkYXRlRW1wdHlSZXR1cm4ob3B0aW9uTmFtZSwgY2h1bmspO1xuXG5cdGlmICh0eXBlb2YgY2h1bmsgIT09ICdzdHJpbmcnICYmICFpc1VpbnQ4QXJyYXkoY2h1bmspKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlIFxcYCR7b3B0aW9uTmFtZX1cXGAgb3B0aW9uJ3MgZnVuY3Rpb24gbXVzdCB5aWVsZCBhIHN0cmluZyBvciBhbiBVaW50OEFycmF5LCBub3QgJHt0eXBlb2YgY2h1bmt9LmApO1xuXHR9XG5cblx0eWllbGQgY2h1bms7XG59O1xuXG5jb25zdCB2YWxpZGF0ZUVtcHR5UmV0dXJuID0gKG9wdGlvbk5hbWUsIGNodW5rKSA9PiB7XG5cdGlmIChjaHVuayA9PT0gbnVsbCB8fCBjaHVuayA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlIFxcYCR7b3B0aW9uTmFtZX1cXGAgb3B0aW9uJ3MgZnVuY3Rpb24gbXVzdCBub3QgY2FsbCBcXGB5aWVsZCAke2NodW5rfVxcYC5cbkluc3RlYWQsIFxcYHlpZWxkXFxgIHNob3VsZCBlaXRoZXIgYmUgY2FsbGVkIHdpdGggYSB2YWx1ZSwgb3Igbm90IGJlIGNhbGxlZCBhdCBhbGwuIEZvciBleGFtcGxlOlxuICBpZiAoY29uZGl0aW9uKSB7IHlpZWxkIHZhbHVlOyB9YCk7XG5cdH1cbn07XG4iLCAiaW1wb3J0IHtCdWZmZXJ9IGZyb20gJ25vZGU6YnVmZmVyJztcbmltcG9ydCB7U3RyaW5nRGVjb2Rlcn0gZnJvbSAnbm9kZTpzdHJpbmdfZGVjb2Rlcic7XG5pbXBvcnQge2lzVWludDhBcnJheSwgYnVmZmVyVG9VaW50OEFycmF5fSBmcm9tICcuLi91dGlscy91aW50LWFycmF5LmpzJztcblxuLypcbldoZW4gdXNpbmcgYmluYXJ5IGVuY29kaW5ncywgYWRkIGFuIGludGVybmFsIGdlbmVyYXRvciB0aGF0IGNvbnZlcnRzIGNodW5rcyBmcm9tIGBCdWZmZXJgIHRvIGBzdHJpbmdgIG9yIGBVaW50OEFycmF5YC5cbkNodW5rcyBtaWdodCBiZSBCdWZmZXIsIFVpbnQ4QXJyYXkgb3Igc3RyaW5ncyBzaW5jZTpcbi0gYHN1YnByb2Nlc3Muc3Rkb3V0fHN0ZGVycmAgZW1pdHMgQnVmZmVyc1xuLSBgc3VicHJvY2Vzcy5zdGRpbi53cml0ZSgpYCBhY2NlcHRzIEJ1ZmZlciwgVWludDhBcnJheSBvciBzdHJpbmdcbi0gUHJldmlvdXMgZ2VuZXJhdG9ycyBtaWdodCByZXR1cm4gVWludDhBcnJheSBvciBzdHJpbmdcblxuSG93ZXZlciwgdGhvc2UgYXJlIGNvbnZlcnRlZCB0byBCdWZmZXI6XG4tIG9uIHdyaXRlczogYER1cGxleC53cml0YWJsZWAgYGRlY29kZVN0cmluZ3M6IHRydWVgIGRlZmF1bHQgb3B0aW9uXG4tIG9uIHJlYWRzOiBgRHVwbGV4LnJlYWRhYmxlYCBgcmVhZGFibGVFbmNvZGluZzogbnVsbGAgZGVmYXVsdCBvcHRpb25cbiovXG5leHBvcnQgY29uc3QgZ2V0RW5jb2RpbmdUcmFuc2Zvcm1HZW5lcmF0b3IgPSAoYmluYXJ5LCBlbmNvZGluZywgc2tpcHBlZCkgPT4ge1xuXHRpZiAoc2tpcHBlZCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmIChiaW5hcnkpIHtcblx0XHRyZXR1cm4ge3RyYW5zZm9ybTogZW5jb2RpbmdVaW50OEFycmF5R2VuZXJhdG9yLmJpbmQodW5kZWZpbmVkLCBuZXcgVGV4dEVuY29kZXIoKSl9O1xuXHR9XG5cblx0Y29uc3Qgc3RyaW5nRGVjb2RlciA9IG5ldyBTdHJpbmdEZWNvZGVyKGVuY29kaW5nKTtcblx0cmV0dXJuIHtcblx0XHR0cmFuc2Zvcm06IGVuY29kaW5nU3RyaW5nR2VuZXJhdG9yLmJpbmQodW5kZWZpbmVkLCBzdHJpbmdEZWNvZGVyKSxcblx0XHRmaW5hbDogZW5jb2RpbmdTdHJpbmdGaW5hbC5iaW5kKHVuZGVmaW5lZCwgc3RyaW5nRGVjb2RlciksXG5cdH07XG59O1xuXG5jb25zdCBlbmNvZGluZ1VpbnQ4QXJyYXlHZW5lcmF0b3IgPSBmdW5jdGlvbiAqICh0ZXh0RW5jb2RlciwgY2h1bmspIHtcblx0aWYgKEJ1ZmZlci5pc0J1ZmZlcihjaHVuaykpIHtcblx0XHR5aWVsZCBidWZmZXJUb1VpbnQ4QXJyYXkoY2h1bmspO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBjaHVuayA9PT0gJ3N0cmluZycpIHtcblx0XHR5aWVsZCB0ZXh0RW5jb2Rlci5lbmNvZGUoY2h1bmspO1xuXHR9IGVsc2Uge1xuXHRcdHlpZWxkIGNodW5rO1xuXHR9XG59O1xuXG5jb25zdCBlbmNvZGluZ1N0cmluZ0dlbmVyYXRvciA9IGZ1bmN0aW9uICogKHN0cmluZ0RlY29kZXIsIGNodW5rKSB7XG5cdHlpZWxkIGlzVWludDhBcnJheShjaHVuaykgPyBzdHJpbmdEZWNvZGVyLndyaXRlKGNodW5rKSA6IGNodW5rO1xufTtcblxuY29uc3QgZW5jb2RpbmdTdHJpbmdGaW5hbCA9IGZ1bmN0aW9uICogKHN0cmluZ0RlY29kZXIpIHtcblx0Y29uc3QgbGFzdENodW5rID0gc3RyaW5nRGVjb2Rlci5lbmQoKTtcblx0aWYgKGxhc3RDaHVuayAhPT0gJycpIHtcblx0XHR5aWVsZCBsYXN0Q2h1bms7XG5cdH1cbn07XG4iLCAiaW1wb3J0IHtjYWxsYmFja2lmeX0gZnJvbSAnbm9kZTp1dGlsJztcblxuLy8gQXBwbGllcyBhIHNlcmllcyBvZiBnZW5lcmF0b3IgZnVuY3Rpb25zIGFzeW5jaHJvbm91c2x5XG5leHBvcnQgY29uc3QgcHVzaENodW5rcyA9IGNhbGxiYWNraWZ5KGFzeW5jIChnZXRDaHVua3MsIHN0YXRlLCBnZXRDaHVua3NBcmd1bWVudHMsIHRyYW5zZm9ybVN0cmVhbSkgPT4ge1xuXHRzdGF0ZS5jdXJyZW50SXRlcmFibGUgPSBnZXRDaHVua3MoLi4uZ2V0Q2h1bmtzQXJndW1lbnRzKTtcblxuXHR0cnkge1xuXHRcdGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2Ygc3RhdGUuY3VycmVudEl0ZXJhYmxlKSB7XG5cdFx0XHR0cmFuc2Zvcm1TdHJlYW0ucHVzaChjaHVuayk7XG5cdFx0fVxuXHR9IGZpbmFsbHkge1xuXHRcdGRlbGV0ZSBzdGF0ZS5jdXJyZW50SXRlcmFibGU7XG5cdH1cbn0pO1xuXG4vLyBGb3IgZWFjaCBuZXcgY2h1bmssIGFwcGx5IGVhY2ggYHRyYW5zZm9ybSgpYCBtZXRob2RcbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1DaHVuayA9IGFzeW5jIGZ1bmN0aW9uICogKGNodW5rLCBnZW5lcmF0b3JzLCBpbmRleCkge1xuXHRpZiAoaW5kZXggPT09IGdlbmVyYXRvcnMubGVuZ3RoKSB7XG5cdFx0eWllbGQgY2h1bms7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3Qge3RyYW5zZm9ybSA9IGlkZW50aXR5R2VuZXJhdG9yfSA9IGdlbmVyYXRvcnNbaW5kZXhdO1xuXHRmb3IgYXdhaXQgKGNvbnN0IHRyYW5zZm9ybWVkQ2h1bmsgb2YgdHJhbnNmb3JtKGNodW5rKSkge1xuXHRcdHlpZWxkICogdHJhbnNmb3JtQ2h1bmsodHJhbnNmb3JtZWRDaHVuaywgZ2VuZXJhdG9ycywgaW5kZXggKyAxKTtcblx0fVxufTtcblxuLy8gQXQgdGhlIGVuZCwgYXBwbHkgZWFjaCBgZmluYWwoKWAgbWV0aG9kLCBmb2xsb3dlZCBieSB0aGUgYHRyYW5zZm9ybSgpYCBtZXRob2Qgb2YgdGhlIG5leHQgdHJhbnNmb3Jtc1xuZXhwb3J0IGNvbnN0IGZpbmFsQ2h1bmtzID0gYXN5bmMgZnVuY3Rpb24gKiAoZ2VuZXJhdG9ycykge1xuXHRmb3IgKGNvbnN0IFtpbmRleCwge2ZpbmFsfV0gb2YgT2JqZWN0LmVudHJpZXMoZ2VuZXJhdG9ycykpIHtcblx0XHR5aWVsZCAqIGdlbmVyYXRvckZpbmFsQ2h1bmtzKGZpbmFsLCBOdW1iZXIoaW5kZXgpLCBnZW5lcmF0b3JzKTtcblx0fVxufTtcblxuY29uc3QgZ2VuZXJhdG9yRmluYWxDaHVua3MgPSBhc3luYyBmdW5jdGlvbiAqIChmaW5hbCwgaW5kZXgsIGdlbmVyYXRvcnMpIHtcblx0aWYgKGZpbmFsID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRmb3IgYXdhaXQgKGNvbnN0IGZpbmFsQ2h1bmsgb2YgZmluYWwoKSkge1xuXHRcdHlpZWxkICogdHJhbnNmb3JtQ2h1bmsoZmluYWxDaHVuaywgZ2VuZXJhdG9ycywgaW5kZXggKyAxKTtcblx0fVxufTtcblxuLy8gQ2FuY2VsIGFueSBvbmdvaW5nIGFzeW5jIGdlbmVyYXRvciB3aGVuIHRoZSBUcmFuc2Zvcm0gaXMgZGVzdHJveWVkLCBlLmcuIHdoZW4gdGhlIHN1YnByb2Nlc3MgZXJyb3JzXG5leHBvcnQgY29uc3QgZGVzdHJveVRyYW5zZm9ybSA9IGNhbGxiYWNraWZ5KGFzeW5jICh7Y3VycmVudEl0ZXJhYmxlfSwgZXJyb3IpID0+IHtcblx0aWYgKGN1cnJlbnRJdGVyYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0YXdhaXQgKGVycm9yID8gY3VycmVudEl0ZXJhYmxlLnRocm93KGVycm9yKSA6IGN1cnJlbnRJdGVyYWJsZS5yZXR1cm4oKSk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKGVycm9yKSB7XG5cdFx0dGhyb3cgZXJyb3I7XG5cdH1cbn0pO1xuXG5jb25zdCBpZGVudGl0eUdlbmVyYXRvciA9IGZ1bmN0aW9uICogKGNodW5rKSB7XG5cdHlpZWxkIGNodW5rO1xufTtcbiIsICIvLyBEdXBsaWNhdGUgdGhlIGNvZGUgZnJvbSBgcnVuLWFzeW5jLmpzYCBidXQgYXMgc3luY2hyb25vdXMgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgcHVzaENodW5rc1N5bmMgPSAoZ2V0Q2h1bmtzU3luYywgZ2V0Q2h1bmtzQXJndW1lbnRzLCB0cmFuc2Zvcm1TdHJlYW0sIGRvbmUpID0+IHtcblx0dHJ5IHtcblx0XHRmb3IgKGNvbnN0IGNodW5rIG9mIGdldENodW5rc1N5bmMoLi4uZ2V0Q2h1bmtzQXJndW1lbnRzKSkge1xuXHRcdFx0dHJhbnNmb3JtU3RyZWFtLnB1c2goY2h1bmspO1xuXHRcdH1cblxuXHRcdGRvbmUoKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRkb25lKGVycm9yKTtcblx0fVxufTtcblxuLy8gUnVuIHN5bmNocm9ub3VzIGdlbmVyYXRvcnMgd2l0aCBgZXhlY2FTeW5jKClgXG5leHBvcnQgY29uc3QgcnVuVHJhbnNmb3JtU3luYyA9IChnZW5lcmF0b3JzLCBjaHVua3MpID0+IFtcblx0Li4uY2h1bmtzLmZsYXRNYXAoY2h1bmsgPT4gWy4uLnRyYW5zZm9ybUNodW5rU3luYyhjaHVuaywgZ2VuZXJhdG9ycywgMCldKSxcblx0Li4uZmluYWxDaHVua3NTeW5jKGdlbmVyYXRvcnMpLFxuXTtcblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybUNodW5rU3luYyA9IGZ1bmN0aW9uICogKGNodW5rLCBnZW5lcmF0b3JzLCBpbmRleCkge1xuXHRpZiAoaW5kZXggPT09IGdlbmVyYXRvcnMubGVuZ3RoKSB7XG5cdFx0eWllbGQgY2h1bms7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3Qge3RyYW5zZm9ybSA9IGlkZW50aXR5R2VuZXJhdG9yfSA9IGdlbmVyYXRvcnNbaW5kZXhdO1xuXHRmb3IgKGNvbnN0IHRyYW5zZm9ybWVkQ2h1bmsgb2YgdHJhbnNmb3JtKGNodW5rKSkge1xuXHRcdHlpZWxkICogdHJhbnNmb3JtQ2h1bmtTeW5jKHRyYW5zZm9ybWVkQ2h1bmssIGdlbmVyYXRvcnMsIGluZGV4ICsgMSk7XG5cdH1cbn07XG5cbmV4cG9ydCBjb25zdCBmaW5hbENodW5rc1N5bmMgPSBmdW5jdGlvbiAqIChnZW5lcmF0b3JzKSB7XG5cdGZvciAoY29uc3QgW2luZGV4LCB7ZmluYWx9XSBvZiBPYmplY3QuZW50cmllcyhnZW5lcmF0b3JzKSkge1xuXHRcdHlpZWxkICogZ2VuZXJhdG9yRmluYWxDaHVua3NTeW5jKGZpbmFsLCBOdW1iZXIoaW5kZXgpLCBnZW5lcmF0b3JzKTtcblx0fVxufTtcblxuY29uc3QgZ2VuZXJhdG9yRmluYWxDaHVua3NTeW5jID0gZnVuY3Rpb24gKiAoZmluYWwsIGluZGV4LCBnZW5lcmF0b3JzKSB7XG5cdGlmIChmaW5hbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Zm9yIChjb25zdCBmaW5hbENodW5rIG9mIGZpbmFsKCkpIHtcblx0XHR5aWVsZCAqIHRyYW5zZm9ybUNodW5rU3luYyhmaW5hbENodW5rLCBnZW5lcmF0b3JzLCBpbmRleCArIDEpO1xuXHR9XG59O1xuXG5jb25zdCBpZGVudGl0eUdlbmVyYXRvciA9IGZ1bmN0aW9uICogKGNodW5rKSB7XG5cdHlpZWxkIGNodW5rO1xufTtcbiIsICJpbXBvcnQge1RyYW5zZm9ybSwgZ2V0RGVmYXVsdEhpZ2hXYXRlck1hcmt9IGZyb20gJ25vZGU6c3RyZWFtJztcbmltcG9ydCB7aXNBc3luY0dlbmVyYXRvcn0gZnJvbSAnLi4vc3RkaW8vdHlwZS5qcyc7XG5pbXBvcnQge2dldFNwbGl0TGluZXNHZW5lcmF0b3IsIGdldEFwcGVuZE5ld2xpbmVHZW5lcmF0b3J9IGZyb20gJy4vc3BsaXQuanMnO1xuaW1wb3J0IHtnZXRWYWxpZGF0ZVRyYW5zZm9ybUlucHV0LCBnZXRWYWxpZGF0ZVRyYW5zZm9ybVJldHVybn0gZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG5pbXBvcnQge2dldEVuY29kaW5nVHJhbnNmb3JtR2VuZXJhdG9yfSBmcm9tICcuL2VuY29kaW5nLXRyYW5zZm9ybS5qcyc7XG5pbXBvcnQge1xuXHRwdXNoQ2h1bmtzLFxuXHR0cmFuc2Zvcm1DaHVuayxcblx0ZmluYWxDaHVua3MsXG5cdGRlc3Ryb3lUcmFuc2Zvcm0sXG59IGZyb20gJy4vcnVuLWFzeW5jLmpzJztcbmltcG9ydCB7XG5cdHB1c2hDaHVua3NTeW5jLFxuXHR0cmFuc2Zvcm1DaHVua1N5bmMsXG5cdGZpbmFsQ2h1bmtzU3luYyxcblx0cnVuVHJhbnNmb3JtU3luYyxcbn0gZnJvbSAnLi9ydW4tc3luYy5qcyc7XG5cbi8qXG5HZW5lcmF0b3JzIGNhbiBiZSB1c2VkIHRvIHRyYW5zZm9ybS9maWx0ZXIgc3RhbmRhcmQgc3RyZWFtcy5cblxuR2VuZXJhdG9ycyBoYXZlIGEgc2ltcGxlIHN5bnRheCwgeWV0IGFsbG93cyBhbGwgb2YgdGhlIGZvbGxvd2luZzpcbi0gU2hhcmluZyBgc3RhdGVgIGJldHdlZW4gY2h1bmtzXG4tIEZsdXNoaW5nIGxvZ2ljLCBieSB1c2luZyBhIGBmaW5hbGAgZnVuY3Rpb25cbi0gQXN5bmNocm9ub3VzIGxvZ2ljXG4tIEVtaXR0aW5nIG11bHRpcGxlIGNodW5rcyBmcm9tIGEgc2luZ2xlIHNvdXJjZSBjaHVuaywgZXZlbiBpZiBzcGFjZWQgaW4gdGltZSwgYnkgdXNpbmcgbXVsdGlwbGUgYHlpZWxkYFxuLSBGaWx0ZXJpbmcsIGJ5IHVzaW5nIG5vIGB5aWVsZGBcblxuVGhlcmVmb3JlLCB0aGVyZSBpcyBubyBuZWVkIHRvIGFsbG93IE5vZGUuanMgb3Igd2ViIHRyYW5zZm9ybSBzdHJlYW1zLlxuXG5UaGUgYGhpZ2hXYXRlck1hcmtgIGlzIGtlcHQgYXMgdGhlIGRlZmF1bHQgdmFsdWUsIHNpbmNlIHRoaXMgaXMgd2hhdCBgc3VicHJvY2Vzcy5zdGQqYCB1c2VzLlxuXG5DaHVua3MgYXJlIGN1cnJlbnRseSBwcm9jZXNzZWQgc2VyaWFsbHkuIFdlIGNvdWxkIGFkZCBhIGBjb25jdXJyZW5jeWAgb3B0aW9uIHRvIHBhcmFsbGVsaXplIGluIHRoZSBmdXR1cmUuXG5cblRyYW5zZm9ybSBhbiBhcnJheSBvZiBnZW5lcmF0b3IgZnVuY3Rpb25zIGludG8gYSBgVHJhbnNmb3JtYCBzdHJlYW0uXG5gRHVwbGV4LmZyb20oZ2VuZXJhdG9yKWAgY2Fubm90IGJlIHVzZWQgYmVjYXVzZSBpdCBkb2VzIG5vdCBhbGxvdyBzZXR0aW5nIHRoZSBgb2JqZWN0TW9kZWAgYW5kIGBoaWdoV2F0ZXJNYXJrYC5cbiovXG5leHBvcnQgY29uc3QgZ2VuZXJhdG9yVG9TdHJlYW0gPSAoe1xuXHR2YWx1ZSxcblx0dmFsdWU6IHt0cmFuc2Zvcm0sIGZpbmFsLCB3cml0YWJsZU9iamVjdE1vZGUsIHJlYWRhYmxlT2JqZWN0TW9kZX0sXG5cdG9wdGlvbk5hbWUsXG59LCB7ZW5jb2Rpbmd9KSA9PiB7XG5cdGNvbnN0IHN0YXRlID0ge307XG5cdGNvbnN0IGdlbmVyYXRvcnMgPSBhZGRJbnRlcm5hbEdlbmVyYXRvcnModmFsdWUsIGVuY29kaW5nLCBvcHRpb25OYW1lKTtcblxuXHRjb25zdCB0cmFuc2Zvcm1Bc3luYyA9IGlzQXN5bmNHZW5lcmF0b3IodHJhbnNmb3JtKTtcblx0Y29uc3QgZmluYWxBc3luYyA9IGlzQXN5bmNHZW5lcmF0b3IoZmluYWwpO1xuXHRjb25zdCB0cmFuc2Zvcm1NZXRob2QgPSB0cmFuc2Zvcm1Bc3luY1xuXHRcdD8gcHVzaENodW5rcy5iaW5kKHVuZGVmaW5lZCwgdHJhbnNmb3JtQ2h1bmssIHN0YXRlKVxuXHRcdDogcHVzaENodW5rc1N5bmMuYmluZCh1bmRlZmluZWQsIHRyYW5zZm9ybUNodW5rU3luYyk7XG5cdGNvbnN0IGZpbmFsTWV0aG9kID0gdHJhbnNmb3JtQXN5bmMgfHwgZmluYWxBc3luY1xuXHRcdD8gcHVzaENodW5rcy5iaW5kKHVuZGVmaW5lZCwgZmluYWxDaHVua3MsIHN0YXRlKVxuXHRcdDogcHVzaENodW5rc1N5bmMuYmluZCh1bmRlZmluZWQsIGZpbmFsQ2h1bmtzU3luYyk7XG5cdGNvbnN0IGRlc3Ryb3lNZXRob2QgPSB0cmFuc2Zvcm1Bc3luYyB8fCBmaW5hbEFzeW5jXG5cdFx0PyBkZXN0cm95VHJhbnNmb3JtLmJpbmQodW5kZWZpbmVkLCBzdGF0ZSlcblx0XHQ6IHVuZGVmaW5lZDtcblxuXHRjb25zdCBzdHJlYW0gPSBuZXcgVHJhbnNmb3JtKHtcblx0XHR3cml0YWJsZU9iamVjdE1vZGUsXG5cdFx0d3JpdGFibGVIaWdoV2F0ZXJNYXJrOiBnZXREZWZhdWx0SGlnaFdhdGVyTWFyayh3cml0YWJsZU9iamVjdE1vZGUpLFxuXHRcdHJlYWRhYmxlT2JqZWN0TW9kZSxcblx0XHRyZWFkYWJsZUhpZ2hXYXRlck1hcms6IGdldERlZmF1bHRIaWdoV2F0ZXJNYXJrKHJlYWRhYmxlT2JqZWN0TW9kZSksXG5cdFx0dHJhbnNmb3JtKGNodW5rLCBlbmNvZGluZywgZG9uZSkge1xuXHRcdFx0dHJhbnNmb3JtTWV0aG9kKFtjaHVuaywgZ2VuZXJhdG9ycywgMF0sIHRoaXMsIGRvbmUpO1xuXHRcdH0sXG5cdFx0Zmx1c2goZG9uZSkge1xuXHRcdFx0ZmluYWxNZXRob2QoW2dlbmVyYXRvcnNdLCB0aGlzLCBkb25lKTtcblx0XHR9LFxuXHRcdGRlc3Ryb3k6IGRlc3Ryb3lNZXRob2QsXG5cdH0pO1xuXHRyZXR1cm4ge3N0cmVhbX07XG59O1xuXG4vLyBBcHBsaWVzIHRyYW5zZm9ybSBnZW5lcmF0b3JzIGluIHN5bmMgbW9kZVxuZXhwb3J0IGNvbnN0IHJ1bkdlbmVyYXRvcnNTeW5jID0gKGNodW5rcywgc3RkaW9JdGVtcywgZW5jb2RpbmcsIGlzSW5wdXQpID0+IHtcblx0Y29uc3QgZ2VuZXJhdG9ycyA9IHN0ZGlvSXRlbXMuZmlsdGVyKCh7dHlwZX0pID0+IHR5cGUgPT09ICdnZW5lcmF0b3InKTtcblx0Y29uc3QgcmV2ZXJzZWRHZW5lcmF0b3JzID0gaXNJbnB1dCA/IGdlbmVyYXRvcnMucmV2ZXJzZSgpIDogZ2VuZXJhdG9ycztcblxuXHRmb3IgKGNvbnN0IHt2YWx1ZSwgb3B0aW9uTmFtZX0gb2YgcmV2ZXJzZWRHZW5lcmF0b3JzKSB7XG5cdFx0Y29uc3QgZ2VuZXJhdG9ycyA9IGFkZEludGVybmFsR2VuZXJhdG9ycyh2YWx1ZSwgZW5jb2RpbmcsIG9wdGlvbk5hbWUpO1xuXHRcdGNodW5rcyA9IHJ1blRyYW5zZm9ybVN5bmMoZ2VuZXJhdG9ycywgY2h1bmtzKTtcblx0fVxuXG5cdHJldHVybiBjaHVua3M7XG59O1xuXG4vLyBHZW5lcmF0b3JzIHVzZWQgaW50ZXJuYWxseSB0byBjb252ZXJ0IHRoZSBjaHVuayB0eXBlLCB2YWxpZGF0ZSBpdCwgYW5kIHNwbGl0IGludG8gbGluZXNcbmNvbnN0IGFkZEludGVybmFsR2VuZXJhdG9ycyA9IChcblx0e3RyYW5zZm9ybSwgZmluYWwsIGJpbmFyeSwgd3JpdGFibGVPYmplY3RNb2RlLCByZWFkYWJsZU9iamVjdE1vZGUsIHByZXNlcnZlTmV3bGluZXN9LFxuXHRlbmNvZGluZyxcblx0b3B0aW9uTmFtZSxcbikgPT4ge1xuXHRjb25zdCBzdGF0ZSA9IHt9O1xuXHRyZXR1cm4gW1xuXHRcdHt0cmFuc2Zvcm06IGdldFZhbGlkYXRlVHJhbnNmb3JtSW5wdXQod3JpdGFibGVPYmplY3RNb2RlLCBvcHRpb25OYW1lKX0sXG5cdFx0Z2V0RW5jb2RpbmdUcmFuc2Zvcm1HZW5lcmF0b3IoYmluYXJ5LCBlbmNvZGluZywgd3JpdGFibGVPYmplY3RNb2RlKSxcblx0XHRnZXRTcGxpdExpbmVzR2VuZXJhdG9yKGJpbmFyeSwgcHJlc2VydmVOZXdsaW5lcywgd3JpdGFibGVPYmplY3RNb2RlLCBzdGF0ZSksXG5cdFx0e3RyYW5zZm9ybSwgZmluYWx9LFxuXHRcdHt0cmFuc2Zvcm06IGdldFZhbGlkYXRlVHJhbnNmb3JtUmV0dXJuKHJlYWRhYmxlT2JqZWN0TW9kZSwgb3B0aW9uTmFtZSl9LFxuXHRcdGdldEFwcGVuZE5ld2xpbmVHZW5lcmF0b3Ioe1xuXHRcdFx0YmluYXJ5LFxuXHRcdFx0cHJlc2VydmVOZXdsaW5lcyxcblx0XHRcdHJlYWRhYmxlT2JqZWN0TW9kZSxcblx0XHRcdHN0YXRlLFxuXHRcdH0pLFxuXHRdLmZpbHRlcihCb29sZWFuKTtcbn07XG4iLCAiaW1wb3J0IHtydW5HZW5lcmF0b3JzU3luY30gZnJvbSAnLi4vdHJhbnNmb3JtL2dlbmVyYXRvci5qcyc7XG5pbXBvcnQge2pvaW5Ub1VpbnQ4QXJyYXksIGlzVWludDhBcnJheX0gZnJvbSAnLi4vdXRpbHMvdWludC1hcnJheS5qcyc7XG5pbXBvcnQge1RZUEVfVE9fTUVTU0FHRX0gZnJvbSAnLi4vc3RkaW8vdHlwZS5qcyc7XG5cbi8vIEFwcGx5IGBzdGRpbmAvYGlucHV0YC9gaW5wdXRGaWxlYCBvcHRpb25zLCBiZWZvcmUgc3Bhd25pbmcsIGluIHN5bmMgbW9kZSwgYnkgY29udmVydGluZyBpdCB0byB0aGUgYGlucHV0YCBvcHRpb25cbmV4cG9ydCBjb25zdCBhZGRJbnB1dE9wdGlvbnNTeW5jID0gKGZpbGVEZXNjcmlwdG9ycywgb3B0aW9ucykgPT4ge1xuXHRmb3IgKGNvbnN0IGZkTnVtYmVyIG9mIGdldElucHV0RmROdW1iZXJzKGZpbGVEZXNjcmlwdG9ycykpIHtcblx0XHRhZGRJbnB1dE9wdGlvblN5bmMoZmlsZURlc2NyaXB0b3JzLCBmZE51bWJlciwgb3B0aW9ucyk7XG5cdH1cbn07XG5cbmNvbnN0IGdldElucHV0RmROdW1iZXJzID0gZmlsZURlc2NyaXB0b3JzID0+IG5ldyBTZXQoT2JqZWN0LmVudHJpZXMoZmlsZURlc2NyaXB0b3JzKVxuXHQuZmlsdGVyKChbLCB7ZGlyZWN0aW9ufV0pID0+IGRpcmVjdGlvbiA9PT0gJ2lucHV0Jylcblx0Lm1hcCgoW2ZkTnVtYmVyXSkgPT4gTnVtYmVyKGZkTnVtYmVyKSkpO1xuXG5jb25zdCBhZGRJbnB1dE9wdGlvblN5bmMgPSAoZmlsZURlc2NyaXB0b3JzLCBmZE51bWJlciwgb3B0aW9ucykgPT4ge1xuXHRjb25zdCB7c3RkaW9JdGVtc30gPSBmaWxlRGVzY3JpcHRvcnNbZmROdW1iZXJdO1xuXHRjb25zdCBhbGxTdGRpb0l0ZW1zID0gc3RkaW9JdGVtcy5maWx0ZXIoKHtjb250ZW50c30pID0+IGNvbnRlbnRzICE9PSB1bmRlZmluZWQpO1xuXHRpZiAoYWxsU3RkaW9JdGVtcy5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAoZmROdW1iZXIgIT09IDApIHtcblx0XHRjb25zdCBbe3R5cGUsIG9wdGlvbk5hbWV9XSA9IGFsbFN0ZGlvSXRlbXM7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgT25seSB0aGUgXFxgc3RkaW5cXGAgb3B0aW9uLCBub3QgXFxgJHtvcHRpb25OYW1lfVxcYCwgY2FuIGJlICR7VFlQRV9UT19NRVNTQUdFW3R5cGVdfSB3aXRoIHN5bmNocm9ub3VzIG1ldGhvZHMuYCk7XG5cdH1cblxuXHRjb25zdCBhbGxDb250ZW50cyA9IGFsbFN0ZGlvSXRlbXMubWFwKCh7Y29udGVudHN9KSA9PiBjb250ZW50cyk7XG5cdGNvbnN0IHRyYW5zZm9ybWVkQ29udGVudHMgPSBhbGxDb250ZW50cy5tYXAoY29udGVudHMgPT4gYXBwbHlTaW5nbGVJbnB1dEdlbmVyYXRvcnNTeW5jKGNvbnRlbnRzLCBzdGRpb0l0ZW1zKSk7XG5cdG9wdGlvbnMuaW5wdXQgPSBqb2luVG9VaW50OEFycmF5KHRyYW5zZm9ybWVkQ29udGVudHMpO1xufTtcblxuY29uc3QgYXBwbHlTaW5nbGVJbnB1dEdlbmVyYXRvcnNTeW5jID0gKGNvbnRlbnRzLCBzdGRpb0l0ZW1zKSA9PiB7XG5cdGNvbnN0IG5ld0NvbnRlbnRzID0gcnVuR2VuZXJhdG9yc1N5bmMoY29udGVudHMsIHN0ZGlvSXRlbXMsICd1dGY4JywgdHJ1ZSk7XG5cdHZhbGlkYXRlU2VyaWFsaXphYmxlKG5ld0NvbnRlbnRzKTtcblx0cmV0dXJuIGpvaW5Ub1VpbnQ4QXJyYXkobmV3Q29udGVudHMpO1xufTtcblxuY29uc3QgdmFsaWRhdGVTZXJpYWxpemFibGUgPSBuZXdDb250ZW50cyA9PiB7XG5cdGNvbnN0IGludmFsaWRJdGVtID0gbmV3Q29udGVudHMuZmluZChpdGVtID0+IHR5cGVvZiBpdGVtICE9PSAnc3RyaW5nJyAmJiAhaXNVaW50OEFycmF5KGl0ZW0pKTtcblx0aWYgKGludmFsaWRJdGVtICE9PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgXFxgc3RkaW5cXGAgb3B0aW9uIGlzIGludmFsaWQ6IHdoZW4gcGFzc2luZyBvYmplY3RzIGFzIGlucHV0LCBhIHRyYW5zZm9ybSBtdXN0IGJlIHVzZWQgdG8gc2VyaWFsaXplIHRoZW0gdG8gc3RyaW5ncyBvciBVaW50OEFycmF5czogJHtpbnZhbGlkSXRlbX0uYCk7XG5cdH1cbn07XG4iLCAiaW1wb3J0IHtCSU5BUllfRU5DT0RJTkdTfSBmcm9tICcuLi9hcmd1bWVudHMvZW5jb2Rpbmctb3B0aW9uLmpzJztcbmltcG9ydCB7VFJBTlNGT1JNX1RZUEVTfSBmcm9tICcuLi9zdGRpby90eXBlLmpzJztcbmltcG9ydCB7dmVyYm9zZUxvZywgc2VyaWFsaXplVmVyYm9zZU1lc3NhZ2V9IGZyb20gJy4vbG9nLmpzJztcbmltcG9ydCB7aXNGdWxsVmVyYm9zZX0gZnJvbSAnLi92YWx1ZXMuanMnO1xuXG4vLyBgaWdub3JlYCBvcHRzLW91dCBvZiBgdmVyYm9zZWAgZm9yIGEgc3BlY2lmaWMgc3RyZWFtLlxuLy8gYGlwY2AgY2Fubm90IHVzZSBwaXBpbmcuXG4vLyBgaW5oZXJpdGAgd291bGQgcmVzdWx0IGluIGRvdWJsZSBwcmludGluZy5cbi8vIFRoZXkgY2FuIGFsc28gbGVhZCB0byBkb3VibGUgcHJpbnRpbmcgd2hlbiBwYXNzaW5nIGZpbGUgZGVzY3JpcHRvciBpbnRlZ2VycyBvciBgcHJvY2Vzcy5zdGQqYC5cbi8vIFRoaXMgb25seSBsZWF2ZXMgd2l0aCBgcGlwZWAgYW5kIGBvdmVybGFwcGVkYC5cbmV4cG9ydCBjb25zdCBzaG91bGRMb2dPdXRwdXQgPSAoe3N0ZGlvSXRlbXMsIGVuY29kaW5nLCB2ZXJib3NlSW5mbywgZmROdW1iZXJ9KSA9PiBmZE51bWJlciAhPT0gJ2FsbCdcblx0JiYgaXNGdWxsVmVyYm9zZSh2ZXJib3NlSW5mbywgZmROdW1iZXIpXG5cdCYmICFCSU5BUllfRU5DT0RJTkdTLmhhcyhlbmNvZGluZylcblx0JiYgZmRVc2VzVmVyYm9zZShmZE51bWJlcilcblx0JiYgKHN0ZGlvSXRlbXMuc29tZSgoe3R5cGUsIHZhbHVlfSkgPT4gdHlwZSA9PT0gJ25hdGl2ZScgJiYgUElQRURfU1RESU9fVkFMVUVTLmhhcyh2YWx1ZSkpXG5cdHx8IHN0ZGlvSXRlbXMuZXZlcnkoKHt0eXBlfSkgPT4gVFJBTlNGT1JNX1RZUEVTLmhhcyh0eXBlKSkpO1xuXG4vLyBQcmludGluZyBpbnB1dCBzdHJlYW1zIHdvdWxkIGJlIGNvbmZ1c2luZy5cbi8vIEZpbGVzIGFuZCBzdHJlYW1zIGNhbiBwcm9kdWNlIGJpZyBvdXRwdXRzLCB3aGljaCB3ZSBkb24ndCB3YW50IHRvIHByaW50LlxuLy8gV2UgY291bGQgcHJpbnQgYHN0ZGlvWzMrXWAgYnV0IGl0IG9mdGVuIGlzIHJlZGlyZWN0ZWQgdG8gZmlsZXMgYW5kIHN0cmVhbXMsIHdpdGggdGhlIHNhbWUgaXNzdWUuXG4vLyBTbyB3ZSBvbmx5IHByaW50IHN0ZG91dCBhbmQgc3RkZXJyLlxuY29uc3QgZmRVc2VzVmVyYm9zZSA9IGZkTnVtYmVyID0+IGZkTnVtYmVyID09PSAxIHx8IGZkTnVtYmVyID09PSAyO1xuXG5jb25zdCBQSVBFRF9TVERJT19WQUxVRVMgPSBuZXcgU2V0KFsncGlwZScsICdvdmVybGFwcGVkJ10pO1xuXG4vLyBgdmVyYm9zZTogJ2Z1bGwnYCBwcmludGluZyBsb2dpYyB3aXRoIGFzeW5jIG1ldGhvZHNcbmV4cG9ydCBjb25zdCBsb2dMaW5lcyA9IGFzeW5jIChsaW5lc0l0ZXJhYmxlLCBzdHJlYW0sIGZkTnVtYmVyLCB2ZXJib3NlSW5mbykgPT4ge1xuXHRmb3IgYXdhaXQgKGNvbnN0IGxpbmUgb2YgbGluZXNJdGVyYWJsZSkge1xuXHRcdGlmICghaXNQaXBpbmdTdHJlYW0oc3RyZWFtKSkge1xuXHRcdFx0bG9nTGluZShsaW5lLCBmZE51bWJlciwgdmVyYm9zZUluZm8pO1xuXHRcdH1cblx0fVxufTtcblxuLy8gYHZlcmJvc2U6ICdmdWxsJ2AgcHJpbnRpbmcgbG9naWMgd2l0aCBzeW5jIG1ldGhvZHNcbmV4cG9ydCBjb25zdCBsb2dMaW5lc1N5bmMgPSAobGluZXNBcnJheSwgZmROdW1iZXIsIHZlcmJvc2VJbmZvKSA9PiB7XG5cdGZvciAoY29uc3QgbGluZSBvZiBsaW5lc0FycmF5KSB7XG5cdFx0bG9nTGluZShsaW5lLCBmZE51bWJlciwgdmVyYm9zZUluZm8pO1xuXHR9XG59O1xuXG4vLyBXaGVuIGBzdWJwcm9jZXNzLnN0ZG91dHxzdGRlcnIucGlwZSgpYCBpcyBjYWxsZWQsIGB2ZXJib3NlYCBiZWNvbWVzIGEgbm9vcC5cbi8vIFRoaXMgcHJldmVudHMgdGhlIGZvbGxvd2luZyBwcm9ibGVtczpcbi8vICAtIGAucGlwZSgpYCBhY2hpZXZlcyB0aGUgc2FtZSByZXN1bHQgYXMgdXNpbmcgYHN0ZG91dDogJ2luaGVyaXQnYCwgYHN0ZG91dDogc3RyZWFtYCwgZXRjLiB3aGljaCBhbHNvIG1ha2UgYHZlcmJvc2VgIGEgbm9vcC5cbi8vICAgIEZvciBleGFtcGxlLCBgc3VicHJvY2Vzcy5zdGRvdXQucGlwZShwcm9jZXNzLnN0ZGluKWAgd291bGQgcHJpbnQgZWFjaCBsaW5lIHR3aWNlLlxuLy8gIC0gV2hlbiBjaGFpbmluZyBzdWJwcm9jZXNzZXMgd2l0aCBgc3VicHJvY2Vzcy5waXBlKG90aGVyU3VicHJvY2VzcylgLCBvbmx5IHRoZSBsYXN0IG9uZSBzaG91bGQgcHJpbnQgaXRzIG91dHB1dC5cbi8vIERldGVjdGluZyB3aGV0aGVyIGAucGlwZSgpYCBpcyBpbXBvc3NpYmxlIHdpdGhvdXQgbW9ua2V5LXBhdGNoaW5nIGl0LCBzbyB3ZSB1c2UgdGhlIGZvbGxvd2luZyB1bmRvY3VtZW50ZWQgcHJvcGVydHkuXG4vLyBUaGlzIGlzIG5vdCBhIGNyaXRpY2FsIGJlaGF2aW9yIHNpbmNlIGNoYW5nZXMgb2YgdGhlIGZvbGxvd2luZyBwcm9wZXJ0eSB3b3VsZCBvbmx5IG1ha2UgYHZlcmJvc2VgIG1vcmUgdmVyYm9zZS5cbmNvbnN0IGlzUGlwaW5nU3RyZWFtID0gc3RyZWFtID0+IHN0cmVhbS5fcmVhZGFibGVTdGF0ZS5waXBlcy5sZW5ndGggPiAwO1xuXG4vLyBXaGVuIGB2ZXJib3NlYCBpcyBgZnVsbGAsIHByaW50IHN0ZG91dHxzdGRlcnJcbmNvbnN0IGxvZ0xpbmUgPSAobGluZSwgZmROdW1iZXIsIHZlcmJvc2VJbmZvKSA9PiB7XG5cdGNvbnN0IHZlcmJvc2VNZXNzYWdlID0gc2VyaWFsaXplVmVyYm9zZU1lc3NhZ2UobGluZSk7XG5cdHZlcmJvc2VMb2coe1xuXHRcdHR5cGU6ICdvdXRwdXQnLFxuXHRcdHZlcmJvc2VNZXNzYWdlLFxuXHRcdGZkTnVtYmVyLFxuXHRcdHZlcmJvc2VJbmZvLFxuXHR9KTtcbn07XG4iLCAiaW1wb3J0IHt3cml0ZUZpbGVTeW5jLCBhcHBlbmRGaWxlU3luY30gZnJvbSAnbm9kZTpmcyc7XG5pbXBvcnQge3Nob3VsZExvZ091dHB1dCwgbG9nTGluZXNTeW5jfSBmcm9tICcuLi92ZXJib3NlL291dHB1dC5qcyc7XG5pbXBvcnQge3J1bkdlbmVyYXRvcnNTeW5jfSBmcm9tICcuLi90cmFuc2Zvcm0vZ2VuZXJhdG9yLmpzJztcbmltcG9ydCB7c3BsaXRMaW5lc1N5bmN9IGZyb20gJy4uL3RyYW5zZm9ybS9zcGxpdC5qcyc7XG5pbXBvcnQge2pvaW5Ub1N0cmluZywgam9pblRvVWludDhBcnJheSwgYnVmZmVyVG9VaW50OEFycmF5fSBmcm9tICcuLi91dGlscy91aW50LWFycmF5LmpzJztcbmltcG9ydCB7RklMRV9UWVBFU30gZnJvbSAnLi4vc3RkaW8vdHlwZS5qcyc7XG5pbXBvcnQge3RydW5jYXRlTWF4QnVmZmVyU3luY30gZnJvbSAnLi9tYXgtYnVmZmVyLmpzJztcblxuLy8gQXBwbHkgYHN0ZG91dGAvYHN0ZGVycmAgb3B0aW9ucywgYWZ0ZXIgc3Bhd25pbmcsIGluIHN5bmMgbW9kZVxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybU91dHB1dFN5bmMgPSAoe2ZpbGVEZXNjcmlwdG9ycywgc3luY1Jlc3VsdDoge291dHB1dH0sIG9wdGlvbnMsIGlzTWF4QnVmZmVyLCB2ZXJib3NlSW5mb30pID0+IHtcblx0aWYgKG91dHB1dCA9PT0gbnVsbCkge1xuXHRcdHJldHVybiB7b3V0cHV0OiBBcnJheS5mcm9tKHtsZW5ndGg6IDN9KX07XG5cdH1cblxuXHRjb25zdCBzdGF0ZSA9IHt9O1xuXHRjb25zdCBvdXRwdXRGaWxlcyA9IG5ldyBTZXQoW10pO1xuXHRjb25zdCB0cmFuc2Zvcm1lZE91dHB1dCA9IG91dHB1dC5tYXAoKHJlc3VsdCwgZmROdW1iZXIpID0+XG5cdFx0dHJhbnNmb3JtT3V0cHV0UmVzdWx0U3luYyh7XG5cdFx0XHRyZXN1bHQsXG5cdFx0XHRmaWxlRGVzY3JpcHRvcnMsXG5cdFx0XHRmZE51bWJlcixcblx0XHRcdHN0YXRlLFxuXHRcdFx0b3V0cHV0RmlsZXMsXG5cdFx0XHRpc01heEJ1ZmZlcixcblx0XHRcdHZlcmJvc2VJbmZvLFxuXHRcdH0sIG9wdGlvbnMpKTtcblx0cmV0dXJuIHtvdXRwdXQ6IHRyYW5zZm9ybWVkT3V0cHV0LCAuLi5zdGF0ZX07XG59O1xuXG5jb25zdCB0cmFuc2Zvcm1PdXRwdXRSZXN1bHRTeW5jID0gKFxuXHR7cmVzdWx0LCBmaWxlRGVzY3JpcHRvcnMsIGZkTnVtYmVyLCBzdGF0ZSwgb3V0cHV0RmlsZXMsIGlzTWF4QnVmZmVyLCB2ZXJib3NlSW5mb30sXG5cdHtidWZmZXIsIGVuY29kaW5nLCBsaW5lcywgc3RyaXBGaW5hbE5ld2xpbmUsIG1heEJ1ZmZlcn0sXG4pID0+IHtcblx0aWYgKHJlc3VsdCA9PT0gbnVsbCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IHRydW5jYXRlZFJlc3VsdCA9IHRydW5jYXRlTWF4QnVmZmVyU3luYyhyZXN1bHQsIGlzTWF4QnVmZmVyLCBtYXhCdWZmZXIpO1xuXHRjb25zdCB1aW50OEFycmF5UmVzdWx0ID0gYnVmZmVyVG9VaW50OEFycmF5KHRydW5jYXRlZFJlc3VsdCk7XG5cdGNvbnN0IHtzdGRpb0l0ZW1zLCBvYmplY3RNb2RlfSA9IGZpbGVEZXNjcmlwdG9yc1tmZE51bWJlcl07XG5cdGNvbnN0IGNodW5rcyA9IHJ1bk91dHB1dEdlbmVyYXRvcnNTeW5jKFt1aW50OEFycmF5UmVzdWx0XSwgc3RkaW9JdGVtcywgZW5jb2RpbmcsIHN0YXRlKTtcblx0Y29uc3Qge3NlcmlhbGl6ZWRSZXN1bHQsIGZpbmFsUmVzdWx0ID0gc2VyaWFsaXplZFJlc3VsdH0gPSBzZXJpYWxpemVDaHVua3Moe1xuXHRcdGNodW5rcyxcblx0XHRvYmplY3RNb2RlLFxuXHRcdGVuY29kaW5nLFxuXHRcdGxpbmVzLFxuXHRcdHN0cmlwRmluYWxOZXdsaW5lLFxuXHRcdGZkTnVtYmVyLFxuXHR9KTtcblxuXHRsb2dPdXRwdXRTeW5jKHtcblx0XHRzZXJpYWxpemVkUmVzdWx0LFxuXHRcdGZkTnVtYmVyLFxuXHRcdHN0YXRlLFxuXHRcdHZlcmJvc2VJbmZvLFxuXHRcdGVuY29kaW5nLFxuXHRcdHN0ZGlvSXRlbXMsXG5cdFx0b2JqZWN0TW9kZSxcblx0fSk7XG5cblx0Y29uc3QgcmV0dXJuZWRSZXN1bHQgPSBidWZmZXJbZmROdW1iZXJdID8gZmluYWxSZXN1bHQgOiB1bmRlZmluZWQ7XG5cblx0dHJ5IHtcblx0XHRpZiAoc3RhdGUuZXJyb3IgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0d3JpdGVUb0ZpbGVzKHNlcmlhbGl6ZWRSZXN1bHQsIHN0ZGlvSXRlbXMsIG91dHB1dEZpbGVzKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmV0dXJuZWRSZXN1bHQ7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0c3RhdGUuZXJyb3IgPSBlcnJvcjtcblx0XHRyZXR1cm4gcmV0dXJuZWRSZXN1bHQ7XG5cdH1cbn07XG5cbi8vIEFwcGxpZXMgdHJhbnNmb3JtIGdlbmVyYXRvcnMgdG8gYHN0ZG91dGAvYHN0ZGVycmBcbmNvbnN0IHJ1bk91dHB1dEdlbmVyYXRvcnNTeW5jID0gKGNodW5rcywgc3RkaW9JdGVtcywgZW5jb2RpbmcsIHN0YXRlKSA9PiB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHJ1bkdlbmVyYXRvcnNTeW5jKGNodW5rcywgc3RkaW9JdGVtcywgZW5jb2RpbmcsIGZhbHNlKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRzdGF0ZS5lcnJvciA9IGVycm9yO1xuXHRcdHJldHVybiBjaHVua3M7XG5cdH1cbn07XG5cbi8vIFRoZSBjb250ZW50cyBpcyBjb252ZXJ0ZWQgdG8gdGhyZWUgc3RhZ2VzOlxuLy8gIC0gc2VyaWFsaXplZFJlc3VsdDogdXNlZCB3aGVuIHRoZSB0YXJnZXQgaXMgYSBmaWxlIHBhdGgvVVJMIG9yIGEgZmlsZSBkZXNjcmlwdG9yIChpbmNsdWRpbmcgJ2luaGVyaXQnKVxuLy8gIC0gZmluYWxSZXN1bHQvcmV0dXJuZWRSZXN1bHQ6IHJldHVybmVkIGFzIGByZXN1bHQuc3RkKmBcbmNvbnN0IHNlcmlhbGl6ZUNodW5rcyA9ICh7Y2h1bmtzLCBvYmplY3RNb2RlLCBlbmNvZGluZywgbGluZXMsIHN0cmlwRmluYWxOZXdsaW5lLCBmZE51bWJlcn0pID0+IHtcblx0aWYgKG9iamVjdE1vZGUpIHtcblx0XHRyZXR1cm4ge3NlcmlhbGl6ZWRSZXN1bHQ6IGNodW5rc307XG5cdH1cblxuXHRpZiAoZW5jb2RpbmcgPT09ICdidWZmZXInKSB7XG5cdFx0cmV0dXJuIHtzZXJpYWxpemVkUmVzdWx0OiBqb2luVG9VaW50OEFycmF5KGNodW5rcyl9O1xuXHR9XG5cblx0Y29uc3Qgc2VyaWFsaXplZFJlc3VsdCA9IGpvaW5Ub1N0cmluZyhjaHVua3MsIGVuY29kaW5nKTtcblx0aWYgKGxpbmVzW2ZkTnVtYmVyXSkge1xuXHRcdHJldHVybiB7c2VyaWFsaXplZFJlc3VsdCwgZmluYWxSZXN1bHQ6IHNwbGl0TGluZXNTeW5jKHNlcmlhbGl6ZWRSZXN1bHQsICFzdHJpcEZpbmFsTmV3bGluZVtmZE51bWJlcl0sIG9iamVjdE1vZGUpfTtcblx0fVxuXG5cdHJldHVybiB7c2VyaWFsaXplZFJlc3VsdH07XG59O1xuXG5jb25zdCBsb2dPdXRwdXRTeW5jID0gKHtzZXJpYWxpemVkUmVzdWx0LCBmZE51bWJlciwgc3RhdGUsIHZlcmJvc2VJbmZvLCBlbmNvZGluZywgc3RkaW9JdGVtcywgb2JqZWN0TW9kZX0pID0+IHtcblx0aWYgKCFzaG91bGRMb2dPdXRwdXQoe1xuXHRcdHN0ZGlvSXRlbXMsXG5cdFx0ZW5jb2RpbmcsXG5cdFx0dmVyYm9zZUluZm8sXG5cdFx0ZmROdW1iZXIsXG5cdH0pKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgbGluZXNBcnJheSA9IHNwbGl0TGluZXNTeW5jKHNlcmlhbGl6ZWRSZXN1bHQsIGZhbHNlLCBvYmplY3RNb2RlKTtcblxuXHR0cnkge1xuXHRcdGxvZ0xpbmVzU3luYyhsaW5lc0FycmF5LCBmZE51bWJlciwgdmVyYm9zZUluZm8pO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHN0YXRlLmVycm9yID8/PSBlcnJvcjtcblx0fVxufTtcblxuLy8gV2hlbiB0aGUgYHN0ZCpgIHRhcmdldCBpcyBhIGZpbGUgcGF0aC9VUkwgb3IgYSBmaWxlIGRlc2NyaXB0b3JcbmNvbnN0IHdyaXRlVG9GaWxlcyA9IChzZXJpYWxpemVkUmVzdWx0LCBzdGRpb0l0ZW1zLCBvdXRwdXRGaWxlcykgPT4ge1xuXHRmb3IgKGNvbnN0IHtwYXRoLCBhcHBlbmR9IG9mIHN0ZGlvSXRlbXMuZmlsdGVyKCh7dHlwZX0pID0+IEZJTEVfVFlQRVMuaGFzKHR5cGUpKSkge1xuXHRcdGNvbnN0IHBhdGhTdHJpbmcgPSB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgPyBwYXRoIDogcGF0aC50b1N0cmluZygpO1xuXHRcdGlmIChhcHBlbmQgfHwgb3V0cHV0RmlsZXMuaGFzKHBhdGhTdHJpbmcpKSB7XG5cdFx0XHRhcHBlbmRGaWxlU3luYyhwYXRoLCBzZXJpYWxpemVkUmVzdWx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0b3V0cHV0RmlsZXMuYWRkKHBhdGhTdHJpbmcpO1xuXHRcdFx0d3JpdGVGaWxlU3luYyhwYXRoLCBzZXJpYWxpemVkUmVzdWx0KTtcblx0XHR9XG5cdH1cbn07XG4iLCAiaW1wb3J0IHtpc1VpbnQ4QXJyYXksIGNvbmNhdFVpbnQ4QXJyYXlzfSBmcm9tICcuLi91dGlscy91aW50LWFycmF5LmpzJztcbmltcG9ydCB7c3RyaXBOZXdsaW5lfSBmcm9tICcuLi9pby9zdHJpcC1uZXdsaW5lLmpzJztcblxuLy8gUmV0cmlldmUgYHJlc3VsdC5hbGxgIHdpdGggc3luY2hyb25vdXMgbWV0aG9kc1xuZXhwb3J0IGNvbnN0IGdldEFsbFN5bmMgPSAoWywgc3Rkb3V0LCBzdGRlcnJdLCBvcHRpb25zKSA9PiB7XG5cdGlmICghb3B0aW9ucy5hbGwpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAoc3Rkb3V0ID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gc3RkZXJyO1xuXHR9XG5cblx0aWYgKHN0ZGVyciA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIHN0ZG91dDtcblx0fVxuXG5cdGlmIChBcnJheS5pc0FycmF5KHN0ZG91dCkpIHtcblx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheShzdGRlcnIpXG5cdFx0XHQ/IFsuLi5zdGRvdXQsIC4uLnN0ZGVycl1cblx0XHRcdDogWy4uLnN0ZG91dCwgc3RyaXBOZXdsaW5lKHN0ZGVyciwgb3B0aW9ucywgJ2FsbCcpXTtcblx0fVxuXG5cdGlmIChBcnJheS5pc0FycmF5KHN0ZGVycikpIHtcblx0XHRyZXR1cm4gW3N0cmlwTmV3bGluZShzdGRvdXQsIG9wdGlvbnMsICdhbGwnKSwgLi4uc3RkZXJyXTtcblx0fVxuXG5cdGlmIChpc1VpbnQ4QXJyYXkoc3Rkb3V0KSAmJiBpc1VpbnQ4QXJyYXkoc3RkZXJyKSkge1xuXHRcdHJldHVybiBjb25jYXRVaW50OEFycmF5cyhbc3Rkb3V0LCBzdGRlcnJdKTtcblx0fVxuXG5cdHJldHVybiBgJHtzdGRvdXR9JHtzdGRlcnJ9YDtcbn07XG4iLCAiaW1wb3J0IHtvbmNlfSBmcm9tICdub2RlOmV2ZW50cyc7XG5pbXBvcnQge0Rpc2NhcmRlZEVycm9yfSBmcm9tICcuLi9yZXR1cm4vZmluYWwtZXJyb3IuanMnO1xuXG4vLyBJZiBgZXJyb3JgIGlzIGVtaXR0ZWQgYmVmb3JlIGBzcGF3bmAsIGBleGl0YCB3aWxsIG5ldmVyIGJlIGVtaXR0ZWQuXG4vLyBIb3dldmVyLCBgZXJyb3JgIG1pZ2h0IGJlIGVtaXR0ZWQgYWZ0ZXIgYHNwYXduYC5cbi8vIEluIHRoYXQgY2FzZSwgYGV4aXRgIHdpbGwgc3RpbGwgYmUgZW1pdHRlZC5cbi8vIFNpbmNlIHRoZSBgZXhpdGAgZXZlbnQgY29udGFpbnMgdGhlIHNpZ25hbCBuYW1lLCB3ZSB3YW50IHRvIG1ha2Ugc3VyZSB3ZSBhcmUgbGlzdGVuaW5nIGZvciBpdC5cbi8vIFRoaXMgZnVuY3Rpb24gYWxzbyB0YWtlcyBpbnRvIGFjY291bnQgdGhlIGZvbGxvd2luZyB1bmxpa2VseSBjYXNlczpcbi8vICAtIGBleGl0YCBiZWluZyBlbWl0dGVkIGluIHRoZSBzYW1lIG1pY3JvdGFzayBhcyBgc3Bhd25gXG4vLyAgLSBgZXJyb3JgIGJlaW5nIGVtaXR0ZWQgbXVsdGlwbGUgdGltZXNcbmV4cG9ydCBjb25zdCB3YWl0Rm9yRXhpdCA9IGFzeW5jIChzdWJwcm9jZXNzLCBjb250ZXh0KSA9PiB7XG5cdGNvbnN0IFtleGl0Q29kZSwgc2lnbmFsXSA9IGF3YWl0IHdhaXRGb3JFeGl0T3JFcnJvcihzdWJwcm9jZXNzKTtcblx0Y29udGV4dC5pc0ZvcmNlZnVsbHlUZXJtaW5hdGVkID8/PSBmYWxzZTtcblx0cmV0dXJuIFtleGl0Q29kZSwgc2lnbmFsXTtcbn07XG5cbmNvbnN0IHdhaXRGb3JFeGl0T3JFcnJvciA9IGFzeW5jIHN1YnByb2Nlc3MgPT4ge1xuXHRjb25zdCBbc3Bhd25QYXlsb2FkLCBleGl0UGF5bG9hZF0gPSBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoW1xuXHRcdG9uY2Uoc3VicHJvY2VzcywgJ3NwYXduJyksXG5cdFx0b25jZShzdWJwcm9jZXNzLCAnZXhpdCcpLFxuXHRdKTtcblxuXHRpZiAoc3Bhd25QYXlsb2FkLnN0YXR1cyA9PT0gJ3JlamVjdGVkJykge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXG5cdHJldHVybiBleGl0UGF5bG9hZC5zdGF0dXMgPT09ICdyZWplY3RlZCdcblx0XHQ/IHdhaXRGb3JTdWJwcm9jZXNzRXhpdChzdWJwcm9jZXNzKVxuXHRcdDogZXhpdFBheWxvYWQudmFsdWU7XG59O1xuXG5jb25zdCB3YWl0Rm9yU3VicHJvY2Vzc0V4aXQgPSBhc3luYyBzdWJwcm9jZXNzID0+IHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gYXdhaXQgb25jZShzdWJwcm9jZXNzLCAnZXhpdCcpO1xuXHR9IGNhdGNoIHtcblx0XHRyZXR1cm4gd2FpdEZvclN1YnByb2Nlc3NFeGl0KHN1YnByb2Nlc3MpO1xuXHR9XG59O1xuXG4vLyBSZXRyaWV2ZSB0aGUgZmluYWwgZXhpdCBjb2RlIGFuZHxvciBzaWduYWwgbmFtZVxuZXhwb3J0IGNvbnN0IHdhaXRGb3JTdWNjZXNzZnVsRXhpdCA9IGFzeW5jIGV4aXRQcm9taXNlID0+IHtcblx0Y29uc3QgW2V4aXRDb2RlLCBzaWduYWxdID0gYXdhaXQgZXhpdFByb21pc2U7XG5cblx0aWYgKCFpc1N1YnByb2Nlc3NFcnJvckV4aXQoZXhpdENvZGUsIHNpZ25hbCkgJiYgaXNGYWlsZWRFeGl0KGV4aXRDb2RlLCBzaWduYWwpKSB7XG5cdFx0dGhyb3cgbmV3IERpc2NhcmRlZEVycm9yKCk7XG5cdH1cblxuXHRyZXR1cm4gW2V4aXRDb2RlLCBzaWduYWxdO1xufTtcblxuLy8gV2hlbiB0aGUgc3VicHJvY2VzcyBmYWlscyBkdWUgdG8gYW4gYGVycm9yYCBldmVudFxuY29uc3QgaXNTdWJwcm9jZXNzRXJyb3JFeGl0ID0gKGV4aXRDb2RlLCBzaWduYWwpID0+IGV4aXRDb2RlID09PSB1bmRlZmluZWQgJiYgc2lnbmFsID09PSB1bmRlZmluZWQ7XG4vLyBXaGVuIHRoZSBzdWJwcm9jZXNzIGZhaWxzIGR1ZSB0byBhIG5vbi0wIGV4aXQgY29kZSBvciB0byBhIHNpZ25hbCB0ZXJtaW5hdGlvblxuZXhwb3J0IGNvbnN0IGlzRmFpbGVkRXhpdCA9IChleGl0Q29kZSwgc2lnbmFsKSA9PiBleGl0Q29kZSAhPT0gMCB8fCBzaWduYWwgIT09IG51bGw7XG4iLCAiaW1wb3J0IHtEaXNjYXJkZWRFcnJvcn0gZnJvbSAnLi4vcmV0dXJuL2ZpbmFsLWVycm9yLmpzJztcbmltcG9ydCB7aXNNYXhCdWZmZXJTeW5jfSBmcm9tICcuLi9pby9tYXgtYnVmZmVyLmpzJztcbmltcG9ydCB7aXNGYWlsZWRFeGl0fSBmcm9tICcuL2V4aXQtYXN5bmMuanMnO1xuXG4vLyBSZXRyaWV2ZSBleGl0IGNvZGUsIHNpZ25hbCBuYW1lIGFuZCBlcnJvciBpbmZvcm1hdGlvbiwgd2l0aCBzeW5jaHJvbm91cyBtZXRob2RzXG5leHBvcnQgY29uc3QgZ2V0RXhpdFJlc3VsdFN5bmMgPSAoe2Vycm9yLCBzdGF0dXM6IGV4aXRDb2RlLCBzaWduYWwsIG91dHB1dH0sIHttYXhCdWZmZXJ9KSA9PiB7XG5cdGNvbnN0IHJlc3VsdEVycm9yID0gZ2V0UmVzdWx0RXJyb3IoZXJyb3IsIGV4aXRDb2RlLCBzaWduYWwpO1xuXHRjb25zdCB0aW1lZE91dCA9IHJlc3VsdEVycm9yPy5jb2RlID09PSAnRVRJTUVET1VUJztcblx0Y29uc3QgaXNNYXhCdWZmZXIgPSBpc01heEJ1ZmZlclN5bmMocmVzdWx0RXJyb3IsIG91dHB1dCwgbWF4QnVmZmVyKTtcblx0cmV0dXJuIHtcblx0XHRyZXN1bHRFcnJvcixcblx0XHRleGl0Q29kZSxcblx0XHRzaWduYWwsXG5cdFx0dGltZWRPdXQsXG5cdFx0aXNNYXhCdWZmZXIsXG5cdH07XG59O1xuXG5jb25zdCBnZXRSZXN1bHRFcnJvciA9IChlcnJvciwgZXhpdENvZGUsIHNpZ25hbCkgPT4ge1xuXHRpZiAoZXJyb3IgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBlcnJvcjtcblx0fVxuXG5cdHJldHVybiBpc0ZhaWxlZEV4aXQoZXhpdENvZGUsIHNpZ25hbCkgPyBuZXcgRGlzY2FyZGVkRXJyb3IoKSA6IHVuZGVmaW5lZDtcbn07XG4iLCAiaW1wb3J0IHtzcGF3blN5bmN9IGZyb20gJ25vZGU6Y2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQge2hhbmRsZUNvbW1hbmR9IGZyb20gJy4uL2FyZ3VtZW50cy9jb21tYW5kLmpzJztcbmltcG9ydCB7bm9ybWFsaXplT3B0aW9uc30gZnJvbSAnLi4vYXJndW1lbnRzL29wdGlvbnMuanMnO1xuaW1wb3J0IHttYWtlRXJyb3IsIG1ha2VFYXJseUVycm9yLCBtYWtlU3VjY2Vzc1Jlc3VsdH0gZnJvbSAnLi4vcmV0dXJuL3Jlc3VsdC5qcyc7XG5pbXBvcnQge2hhbmRsZVJlc3VsdH0gZnJvbSAnLi4vcmV0dXJuL3JlamVjdC5qcyc7XG5pbXBvcnQge2hhbmRsZVN0ZGlvU3luY30gZnJvbSAnLi4vc3RkaW8vaGFuZGxlLXN5bmMuanMnO1xuaW1wb3J0IHtzdHJpcE5ld2xpbmV9IGZyb20gJy4uL2lvL3N0cmlwLW5ld2xpbmUuanMnO1xuaW1wb3J0IHthZGRJbnB1dE9wdGlvbnNTeW5jfSBmcm9tICcuLi9pby9pbnB1dC1zeW5jLmpzJztcbmltcG9ydCB7dHJhbnNmb3JtT3V0cHV0U3luY30gZnJvbSAnLi4vaW8vb3V0cHV0LXN5bmMuanMnO1xuaW1wb3J0IHtnZXRNYXhCdWZmZXJTeW5jfSBmcm9tICcuLi9pby9tYXgtYnVmZmVyLmpzJztcbmltcG9ydCB7Z2V0QWxsU3luY30gZnJvbSAnLi4vcmVzb2x2ZS9hbGwtc3luYy5qcyc7XG5pbXBvcnQge2dldEV4aXRSZXN1bHRTeW5jfSBmcm9tICcuLi9yZXNvbHZlL2V4aXQtc3luYy5qcyc7XG5cbi8vIE1haW4gc2hhcmVkIGxvZ2ljIGZvciBhbGwgc3luYyBtZXRob2RzOiBgZXhlY2FTeW5jKClgLCBgJC5zeW5jKClgXG5leHBvcnQgY29uc3QgZXhlY2FDb3JlU3luYyA9IChyYXdGaWxlLCByYXdBcmd1bWVudHMsIHJhd09wdGlvbnMpID0+IHtcblx0Y29uc3Qge2ZpbGUsIGNvbW1hbmRBcmd1bWVudHMsIGNvbW1hbmQsIGVzY2FwZWRDb21tYW5kLCBzdGFydFRpbWUsIHZlcmJvc2VJbmZvLCBvcHRpb25zLCBmaWxlRGVzY3JpcHRvcnN9ID0gaGFuZGxlU3luY0FyZ3VtZW50cyhyYXdGaWxlLCByYXdBcmd1bWVudHMsIHJhd09wdGlvbnMpO1xuXHRjb25zdCByZXN1bHQgPSBzcGF3blN1YnByb2Nlc3NTeW5jKHtcblx0XHRmaWxlLFxuXHRcdGNvbW1hbmRBcmd1bWVudHMsXG5cdFx0b3B0aW9ucyxcblx0XHRjb21tYW5kLFxuXHRcdGVzY2FwZWRDb21tYW5kLFxuXHRcdHZlcmJvc2VJbmZvLFxuXHRcdGZpbGVEZXNjcmlwdG9ycyxcblx0XHRzdGFydFRpbWUsXG5cdH0pO1xuXHRyZXR1cm4gaGFuZGxlUmVzdWx0KHJlc3VsdCwgdmVyYm9zZUluZm8sIG9wdGlvbnMpO1xufTtcblxuLy8gQ29tcHV0ZSBhcmd1bWVudHMgdG8gcGFzcyB0byBgY2hpbGRfcHJvY2Vzcy5zcGF3blN5bmMoKWBcbmNvbnN0IGhhbmRsZVN5bmNBcmd1bWVudHMgPSAocmF3RmlsZSwgcmF3QXJndW1lbnRzLCByYXdPcHRpb25zKSA9PiB7XG5cdGNvbnN0IHtjb21tYW5kLCBlc2NhcGVkQ29tbWFuZCwgc3RhcnRUaW1lLCB2ZXJib3NlSW5mb30gPSBoYW5kbGVDb21tYW5kKHJhd0ZpbGUsIHJhd0FyZ3VtZW50cywgcmF3T3B0aW9ucyk7XG5cdGNvbnN0IHN5bmNPcHRpb25zID0gbm9ybWFsaXplU3luY09wdGlvbnMocmF3T3B0aW9ucyk7XG5cdGNvbnN0IHtmaWxlLCBjb21tYW5kQXJndW1lbnRzLCBvcHRpb25zfSA9IG5vcm1hbGl6ZU9wdGlvbnMocmF3RmlsZSwgcmF3QXJndW1lbnRzLCBzeW5jT3B0aW9ucyk7XG5cdHZhbGlkYXRlU3luY09wdGlvbnMob3B0aW9ucyk7XG5cdGNvbnN0IGZpbGVEZXNjcmlwdG9ycyA9IGhhbmRsZVN0ZGlvU3luYyhvcHRpb25zLCB2ZXJib3NlSW5mbyk7XG5cdHJldHVybiB7XG5cdFx0ZmlsZSxcblx0XHRjb21tYW5kQXJndW1lbnRzLFxuXHRcdGNvbW1hbmQsXG5cdFx0ZXNjYXBlZENvbW1hbmQsXG5cdFx0c3RhcnRUaW1lLFxuXHRcdHZlcmJvc2VJbmZvLFxuXHRcdG9wdGlvbnMsXG5cdFx0ZmlsZURlc2NyaXB0b3JzLFxuXHR9O1xufTtcblxuLy8gT3B0aW9ucyBub3JtYWxpemF0aW9uIGxvZ2ljIHNwZWNpZmljIHRvIHN5bmMgbWV0aG9kc1xuY29uc3Qgbm9ybWFsaXplU3luY09wdGlvbnMgPSBvcHRpb25zID0+IG9wdGlvbnMubm9kZSAmJiAhb3B0aW9ucy5pcGMgPyB7Li4ub3B0aW9ucywgaXBjOiBmYWxzZX0gOiBvcHRpb25zO1xuXG4vLyBPcHRpb25zIHZhbGlkYXRpb24gbG9naWMgc3BlY2lmaWMgdG8gc3luYyBtZXRob2RzXG5jb25zdCB2YWxpZGF0ZVN5bmNPcHRpb25zID0gKHtpcGMsIGlwY0lucHV0LCBkZXRhY2hlZCwgY2FuY2VsU2lnbmFsfSkgPT4ge1xuXHRpZiAoaXBjSW5wdXQpIHtcblx0XHR0aHJvd0ludmFsaWRTeW5jT3B0aW9uKCdpcGNJbnB1dCcpO1xuXHR9XG5cblx0aWYgKGlwYykge1xuXHRcdHRocm93SW52YWxpZFN5bmNPcHRpb24oJ2lwYzogdHJ1ZScpO1xuXHR9XG5cblx0aWYgKGRldGFjaGVkKSB7XG5cdFx0dGhyb3dJbnZhbGlkU3luY09wdGlvbignZGV0YWNoZWQ6IHRydWUnKTtcblx0fVxuXG5cdGlmIChjYW5jZWxTaWduYWwpIHtcblx0XHR0aHJvd0ludmFsaWRTeW5jT3B0aW9uKCdjYW5jZWxTaWduYWwnKTtcblx0fVxufTtcblxuY29uc3QgdGhyb3dJbnZhbGlkU3luY09wdGlvbiA9IHZhbHVlID0+IHtcblx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlIFwiJHt2YWx1ZX1cIiBvcHRpb24gY2Fubm90IGJlIHVzZWQgd2l0aCBzeW5jaHJvbm91cyBtZXRob2RzLmApO1xufTtcblxuY29uc3Qgc3Bhd25TdWJwcm9jZXNzU3luYyA9ICh7ZmlsZSwgY29tbWFuZEFyZ3VtZW50cywgb3B0aW9ucywgY29tbWFuZCwgZXNjYXBlZENvbW1hbmQsIHZlcmJvc2VJbmZvLCBmaWxlRGVzY3JpcHRvcnMsIHN0YXJ0VGltZX0pID0+IHtcblx0Y29uc3Qgc3luY1Jlc3VsdCA9IHJ1blN1YnByb2Nlc3NTeW5jKHtcblx0XHRmaWxlLFxuXHRcdGNvbW1hbmRBcmd1bWVudHMsXG5cdFx0b3B0aW9ucyxcblx0XHRjb21tYW5kLFxuXHRcdGVzY2FwZWRDb21tYW5kLFxuXHRcdGZpbGVEZXNjcmlwdG9ycyxcblx0XHRzdGFydFRpbWUsXG5cdH0pO1xuXHRpZiAoc3luY1Jlc3VsdC5mYWlsZWQpIHtcblx0XHRyZXR1cm4gc3luY1Jlc3VsdDtcblx0fVxuXG5cdGNvbnN0IHtyZXN1bHRFcnJvciwgZXhpdENvZGUsIHNpZ25hbCwgdGltZWRPdXQsIGlzTWF4QnVmZmVyfSA9IGdldEV4aXRSZXN1bHRTeW5jKHN5bmNSZXN1bHQsIG9wdGlvbnMpO1xuXHRjb25zdCB7b3V0cHV0LCBlcnJvciA9IHJlc3VsdEVycm9yfSA9IHRyYW5zZm9ybU91dHB1dFN5bmMoe1xuXHRcdGZpbGVEZXNjcmlwdG9ycyxcblx0XHRzeW5jUmVzdWx0LFxuXHRcdG9wdGlvbnMsXG5cdFx0aXNNYXhCdWZmZXIsXG5cdFx0dmVyYm9zZUluZm8sXG5cdH0pO1xuXHRjb25zdCBzdGRpbyA9IG91dHB1dC5tYXAoKHN0ZGlvT3V0cHV0LCBmZE51bWJlcikgPT4gc3RyaXBOZXdsaW5lKHN0ZGlvT3V0cHV0LCBvcHRpb25zLCBmZE51bWJlcikpO1xuXHRjb25zdCBhbGwgPSBzdHJpcE5ld2xpbmUoZ2V0QWxsU3luYyhvdXRwdXQsIG9wdGlvbnMpLCBvcHRpb25zLCAnYWxsJyk7XG5cdHJldHVybiBnZXRTeW5jUmVzdWx0KHtcblx0XHRlcnJvcixcblx0XHRleGl0Q29kZSxcblx0XHRzaWduYWwsXG5cdFx0dGltZWRPdXQsXG5cdFx0aXNNYXhCdWZmZXIsXG5cdFx0c3RkaW8sXG5cdFx0YWxsLFxuXHRcdG9wdGlvbnMsXG5cdFx0Y29tbWFuZCxcblx0XHRlc2NhcGVkQ29tbWFuZCxcblx0XHRzdGFydFRpbWUsXG5cdH0pO1xufTtcblxuY29uc3QgcnVuU3VicHJvY2Vzc1N5bmMgPSAoe2ZpbGUsIGNvbW1hbmRBcmd1bWVudHMsIG9wdGlvbnMsIGNvbW1hbmQsIGVzY2FwZWRDb21tYW5kLCBmaWxlRGVzY3JpcHRvcnMsIHN0YXJ0VGltZX0pID0+IHtcblx0dHJ5IHtcblx0XHRhZGRJbnB1dE9wdGlvbnNTeW5jKGZpbGVEZXNjcmlwdG9ycywgb3B0aW9ucyk7XG5cdFx0Y29uc3Qgbm9ybWFsaXplZE9wdGlvbnMgPSBub3JtYWxpemVTcGF3blN5bmNPcHRpb25zKG9wdGlvbnMpO1xuXHRcdHJldHVybiBzcGF3blN5bmMoZmlsZSwgY29tbWFuZEFyZ3VtZW50cywgbm9ybWFsaXplZE9wdGlvbnMpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHJldHVybiBtYWtlRWFybHlFcnJvcih7XG5cdFx0XHRlcnJvcixcblx0XHRcdGNvbW1hbmQsXG5cdFx0XHRlc2NhcGVkQ29tbWFuZCxcblx0XHRcdGZpbGVEZXNjcmlwdG9ycyxcblx0XHRcdG9wdGlvbnMsXG5cdFx0XHRzdGFydFRpbWUsXG5cdFx0XHRpc1N5bmM6IHRydWUsXG5cdFx0fSk7XG5cdH1cbn07XG5cbi8vIFRoZSBgZW5jb2RpbmdgIG9wdGlvbiBpcyBoYW5kbGVkIGJ5IEV4ZWNhLCBub3QgYnkgYGNoaWxkX3Byb2Nlc3Muc3Bhd25TeW5jKClgXG5jb25zdCBub3JtYWxpemVTcGF3blN5bmNPcHRpb25zID0gKHtlbmNvZGluZywgbWF4QnVmZmVyLCAuLi5vcHRpb25zfSkgPT4gKHsuLi5vcHRpb25zLCBlbmNvZGluZzogJ2J1ZmZlcicsIG1heEJ1ZmZlcjogZ2V0TWF4QnVmZmVyU3luYyhtYXhCdWZmZXIpfSk7XG5cbmNvbnN0IGdldFN5bmNSZXN1bHQgPSAoe2Vycm9yLCBleGl0Q29kZSwgc2lnbmFsLCB0aW1lZE91dCwgaXNNYXhCdWZmZXIsIHN0ZGlvLCBhbGwsIG9wdGlvbnMsIGNvbW1hbmQsIGVzY2FwZWRDb21tYW5kLCBzdGFydFRpbWV9KSA9PiBlcnJvciA9PT0gdW5kZWZpbmVkXG5cdD8gbWFrZVN1Y2Nlc3NSZXN1bHQoe1xuXHRcdGNvbW1hbmQsXG5cdFx0ZXNjYXBlZENvbW1hbmQsXG5cdFx0c3RkaW8sXG5cdFx0YWxsLFxuXHRcdGlwY091dHB1dDogW10sXG5cdFx0b3B0aW9ucyxcblx0XHRzdGFydFRpbWUsXG5cdH0pXG5cdDogbWFrZUVycm9yKHtcblx0XHRlcnJvcixcblx0XHRjb21tYW5kLFxuXHRcdGVzY2FwZWRDb21tYW5kLFxuXHRcdHRpbWVkT3V0LFxuXHRcdGlzQ2FuY2VsZWQ6IGZhbHNlLFxuXHRcdGlzR3JhY2VmdWxseUNhbmNlbGVkOiBmYWxzZSxcblx0XHRpc01heEJ1ZmZlcixcblx0XHRpc0ZvcmNlZnVsbHlUZXJtaW5hdGVkOiBmYWxzZSxcblx0XHRleGl0Q29kZSxcblx0XHRzaWduYWwsXG5cdFx0c3RkaW8sXG5cdFx0YWxsLFxuXHRcdGlwY091dHB1dDogW10sXG5cdFx0b3B0aW9ucyxcblx0XHRzdGFydFRpbWUsXG5cdFx0aXNTeW5jOiB0cnVlLFxuXHR9KTtcbiIsICJpbXBvcnQge29uY2UsIG9ufSBmcm9tICdub2RlOmV2ZW50cyc7XG5pbXBvcnQge1xuXHR2YWxpZGF0ZUlwY01ldGhvZCxcblx0dGhyb3dPbkVhcmx5RGlzY29ubmVjdCxcblx0ZGlzY29ubmVjdCxcblx0Z2V0U3RyaWN0UmVzcG9uc2VFcnJvcixcbn0gZnJvbSAnLi92YWxpZGF0aW9uLmpzJztcbmltcG9ydCB7Z2V0SXBjRW1pdHRlciwgaXNDb25uZWN0ZWR9IGZyb20gJy4vZm9yd2FyZC5qcyc7XG5pbXBvcnQge2FkZFJlZmVyZW5jZSwgcmVtb3ZlUmVmZXJlbmNlfSBmcm9tICcuL3JlZmVyZW5jZS5qcyc7XG5cbi8vIExpa2UgYFtzdWJdcHJvY2Vzcy5vbmNlKCdtZXNzYWdlJylgIGJ1dCBwcm9taXNlLWJhc2VkXG5leHBvcnQgY29uc3QgZ2V0T25lTWVzc2FnZSA9ICh7YW55UHJvY2VzcywgY2hhbm5lbCwgaXNTdWJwcm9jZXNzLCBpcGN9LCB7cmVmZXJlbmNlID0gdHJ1ZSwgZmlsdGVyfSA9IHt9KSA9PiB7XG5cdHZhbGlkYXRlSXBjTWV0aG9kKHtcblx0XHRtZXRob2ROYW1lOiAnZ2V0T25lTWVzc2FnZScsXG5cdFx0aXNTdWJwcm9jZXNzLFxuXHRcdGlwYyxcblx0XHRpc0Nvbm5lY3RlZDogaXNDb25uZWN0ZWQoYW55UHJvY2VzcyksXG5cdH0pO1xuXG5cdHJldHVybiBnZXRPbmVNZXNzYWdlQXN5bmMoe1xuXHRcdGFueVByb2Nlc3MsXG5cdFx0Y2hhbm5lbCxcblx0XHRpc1N1YnByb2Nlc3MsXG5cdFx0ZmlsdGVyLFxuXHRcdHJlZmVyZW5jZSxcblx0fSk7XG59O1xuXG5jb25zdCBnZXRPbmVNZXNzYWdlQXN5bmMgPSBhc3luYyAoe2FueVByb2Nlc3MsIGNoYW5uZWwsIGlzU3VicHJvY2VzcywgZmlsdGVyLCByZWZlcmVuY2V9KSA9PiB7XG5cdGFkZFJlZmVyZW5jZShjaGFubmVsLCByZWZlcmVuY2UpO1xuXHRjb25zdCBpcGNFbWl0dGVyID0gZ2V0SXBjRW1pdHRlcihhbnlQcm9jZXNzLCBjaGFubmVsLCBpc1N1YnByb2Nlc3MpO1xuXHRjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXHR0cnkge1xuXHRcdHJldHVybiBhd2FpdCBQcm9taXNlLnJhY2UoW1xuXHRcdFx0Z2V0TWVzc2FnZShpcGNFbWl0dGVyLCBmaWx0ZXIsIGNvbnRyb2xsZXIpLFxuXHRcdFx0dGhyb3dPbkRpc2Nvbm5lY3QoaXBjRW1pdHRlciwgaXNTdWJwcm9jZXNzLCBjb250cm9sbGVyKSxcblx0XHRcdHRocm93T25TdHJpY3RFcnJvcihpcGNFbWl0dGVyLCBpc1N1YnByb2Nlc3MsIGNvbnRyb2xsZXIpLFxuXHRcdF0pO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGRpc2Nvbm5lY3QoYW55UHJvY2Vzcyk7XG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gZmluYWxseSB7XG5cdFx0Y29udHJvbGxlci5hYm9ydCgpO1xuXHRcdHJlbW92ZVJlZmVyZW5jZShjaGFubmVsLCByZWZlcmVuY2UpO1xuXHR9XG59O1xuXG5jb25zdCBnZXRNZXNzYWdlID0gYXN5bmMgKGlwY0VtaXR0ZXIsIGZpbHRlciwge3NpZ25hbH0pID0+IHtcblx0aWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0Y29uc3QgW21lc3NhZ2VdID0gYXdhaXQgb25jZShpcGNFbWl0dGVyLCAnbWVzc2FnZScsIHtzaWduYWx9KTtcblx0XHRyZXR1cm4gbWVzc2FnZTtcblx0fVxuXG5cdGZvciBhd2FpdCAoY29uc3QgW21lc3NhZ2VdIG9mIG9uKGlwY0VtaXR0ZXIsICdtZXNzYWdlJywge3NpZ25hbH0pKSB7XG5cdFx0aWYgKGZpbHRlcihtZXNzYWdlKSkge1xuXHRcdFx0cmV0dXJuIG1lc3NhZ2U7XG5cdFx0fVxuXHR9XG59O1xuXG5jb25zdCB0aHJvd09uRGlzY29ubmVjdCA9IGFzeW5jIChpcGNFbWl0dGVyLCBpc1N1YnByb2Nlc3MsIHtzaWduYWx9KSA9PiB7XG5cdGF3YWl0IG9uY2UoaXBjRW1pdHRlciwgJ2Rpc2Nvbm5lY3QnLCB7c2lnbmFsfSk7XG5cdHRocm93T25FYXJseURpc2Nvbm5lY3QoaXNTdWJwcm9jZXNzKTtcbn07XG5cbmNvbnN0IHRocm93T25TdHJpY3RFcnJvciA9IGFzeW5jIChpcGNFbWl0dGVyLCBpc1N1YnByb2Nlc3MsIHtzaWduYWx9KSA9PiB7XG5cdGNvbnN0IFtlcnJvcl0gPSBhd2FpdCBvbmNlKGlwY0VtaXR0ZXIsICdzdHJpY3Q6ZXJyb3InLCB7c2lnbmFsfSk7XG5cdHRocm93IGdldFN0cmljdFJlc3BvbnNlRXJyb3IoZXJyb3IsIGlzU3VicHJvY2Vzcyk7XG59O1xuIiwgImltcG9ydCB7b25jZSwgb259IGZyb20gJ25vZGU6ZXZlbnRzJztcbmltcG9ydCB7dmFsaWRhdGVJcGNNZXRob2QsIGRpc2Nvbm5lY3QsIGdldFN0cmljdFJlc3BvbnNlRXJyb3J9IGZyb20gJy4vdmFsaWRhdGlvbi5qcyc7XG5pbXBvcnQge2dldElwY0VtaXR0ZXIsIGlzQ29ubmVjdGVkfSBmcm9tICcuL2ZvcndhcmQuanMnO1xuaW1wb3J0IHthZGRSZWZlcmVuY2UsIHJlbW92ZVJlZmVyZW5jZX0gZnJvbSAnLi9yZWZlcmVuY2UuanMnO1xuXG4vLyBMaWtlIGBbc3ViXXByb2Nlc3Mub24oJ21lc3NhZ2UnKWAgYnV0IHByb21pc2UtYmFzZWRcbmV4cG9ydCBjb25zdCBnZXRFYWNoTWVzc2FnZSA9ICh7YW55UHJvY2VzcywgY2hhbm5lbCwgaXNTdWJwcm9jZXNzLCBpcGN9LCB7cmVmZXJlbmNlID0gdHJ1ZX0gPSB7fSkgPT4gbG9vcE9uTWVzc2FnZXMoe1xuXHRhbnlQcm9jZXNzLFxuXHRjaGFubmVsLFxuXHRpc1N1YnByb2Nlc3MsXG5cdGlwYyxcblx0c2hvdWxkQXdhaXQ6ICFpc1N1YnByb2Nlc3MsXG5cdHJlZmVyZW5jZSxcbn0pO1xuXG4vLyBTYW1lIGJ1dCB1c2VkIGludGVybmFsbHlcbmV4cG9ydCBjb25zdCBsb29wT25NZXNzYWdlcyA9ICh7YW55UHJvY2VzcywgY2hhbm5lbCwgaXNTdWJwcm9jZXNzLCBpcGMsIHNob3VsZEF3YWl0LCByZWZlcmVuY2V9KSA9PiB7XG5cdHZhbGlkYXRlSXBjTWV0aG9kKHtcblx0XHRtZXRob2ROYW1lOiAnZ2V0RWFjaE1lc3NhZ2UnLFxuXHRcdGlzU3VicHJvY2Vzcyxcblx0XHRpcGMsXG5cdFx0aXNDb25uZWN0ZWQ6IGlzQ29ubmVjdGVkKGFueVByb2Nlc3MpLFxuXHR9KTtcblxuXHRhZGRSZWZlcmVuY2UoY2hhbm5lbCwgcmVmZXJlbmNlKTtcblx0Y29uc3QgaXBjRW1pdHRlciA9IGdldElwY0VtaXR0ZXIoYW55UHJvY2VzcywgY2hhbm5lbCwgaXNTdWJwcm9jZXNzKTtcblx0Y29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblx0Y29uc3Qgc3RhdGUgPSB7fTtcblx0c3RvcE9uRGlzY29ubmVjdChhbnlQcm9jZXNzLCBpcGNFbWl0dGVyLCBjb250cm9sbGVyKTtcblx0YWJvcnRPblN0cmljdEVycm9yKHtcblx0XHRpcGNFbWl0dGVyLFxuXHRcdGlzU3VicHJvY2Vzcyxcblx0XHRjb250cm9sbGVyLFxuXHRcdHN0YXRlLFxuXHR9KTtcblx0cmV0dXJuIGl0ZXJhdGVPbk1lc3NhZ2VzKHtcblx0XHRhbnlQcm9jZXNzLFxuXHRcdGNoYW5uZWwsXG5cdFx0aXBjRW1pdHRlcixcblx0XHRpc1N1YnByb2Nlc3MsXG5cdFx0c2hvdWxkQXdhaXQsXG5cdFx0Y29udHJvbGxlcixcblx0XHRzdGF0ZSxcblx0XHRyZWZlcmVuY2UsXG5cdH0pO1xufTtcblxuY29uc3Qgc3RvcE9uRGlzY29ubmVjdCA9IGFzeW5jIChhbnlQcm9jZXNzLCBpcGNFbWl0dGVyLCBjb250cm9sbGVyKSA9PiB7XG5cdHRyeSB7XG5cdFx0YXdhaXQgb25jZShpcGNFbWl0dGVyLCAnZGlzY29ubmVjdCcsIHtzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsfSk7XG5cdFx0Y29udHJvbGxlci5hYm9ydCgpO1xuXHR9IGNhdGNoIHt9XG59O1xuXG5jb25zdCBhYm9ydE9uU3RyaWN0RXJyb3IgPSBhc3luYyAoe2lwY0VtaXR0ZXIsIGlzU3VicHJvY2VzcywgY29udHJvbGxlciwgc3RhdGV9KSA9PiB7XG5cdHRyeSB7XG5cdFx0Y29uc3QgW2Vycm9yXSA9IGF3YWl0IG9uY2UoaXBjRW1pdHRlciwgJ3N0cmljdDplcnJvcicsIHtzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsfSk7XG5cdFx0c3RhdGUuZXJyb3IgPSBnZXRTdHJpY3RSZXNwb25zZUVycm9yKGVycm9yLCBpc1N1YnByb2Nlc3MpO1xuXHRcdGNvbnRyb2xsZXIuYWJvcnQoKTtcblx0fSBjYXRjaCB7fVxufTtcblxuY29uc3QgaXRlcmF0ZU9uTWVzc2FnZXMgPSBhc3luYyBmdW5jdGlvbiAqICh7YW55UHJvY2VzcywgY2hhbm5lbCwgaXBjRW1pdHRlciwgaXNTdWJwcm9jZXNzLCBzaG91bGRBd2FpdCwgY29udHJvbGxlciwgc3RhdGUsIHJlZmVyZW5jZX0pIHtcblx0dHJ5IHtcblx0XHRmb3IgYXdhaXQgKGNvbnN0IFttZXNzYWdlXSBvZiBvbihpcGNFbWl0dGVyLCAnbWVzc2FnZScsIHtzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsfSkpIHtcblx0XHRcdHRocm93SWZTdHJpY3RFcnJvcihzdGF0ZSk7XG5cdFx0XHR5aWVsZCBtZXNzYWdlO1xuXHRcdH1cblx0fSBjYXRjaCB7XG5cdFx0dGhyb3dJZlN0cmljdEVycm9yKHN0YXRlKTtcblx0fSBmaW5hbGx5IHtcblx0XHRjb250cm9sbGVyLmFib3J0KCk7XG5cdFx0cmVtb3ZlUmVmZXJlbmNlKGNoYW5uZWwsIHJlZmVyZW5jZSk7XG5cblx0XHRpZiAoIWlzU3VicHJvY2Vzcykge1xuXHRcdFx0ZGlzY29ubmVjdChhbnlQcm9jZXNzKTtcblx0XHR9XG5cblx0XHRpZiAoc2hvdWxkQXdhaXQpIHtcblx0XHRcdGF3YWl0IGFueVByb2Nlc3M7XG5cdFx0fVxuXHR9XG59O1xuXG5jb25zdCB0aHJvd0lmU3RyaWN0RXJyb3IgPSAoe2Vycm9yfSkgPT4ge1xuXHRpZiAoZXJyb3IpIHtcblx0XHR0aHJvdyBlcnJvcjtcblx0fVxufTtcbiIsICJpbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnO1xuaW1wb3J0IHtzZW5kTWVzc2FnZX0gZnJvbSAnLi9zZW5kLmpzJztcbmltcG9ydCB7Z2V0T25lTWVzc2FnZX0gZnJvbSAnLi9nZXQtb25lLmpzJztcbmltcG9ydCB7Z2V0RWFjaE1lc3NhZ2V9IGZyb20gJy4vZ2V0LWVhY2guanMnO1xuaW1wb3J0IHtnZXRDYW5jZWxTaWduYWx9IGZyb20gJy4vZ3JhY2VmdWwuanMnO1xuXG4vLyBBZGQgcHJvbWlzZS1iYXNlZCBJUEMgbWV0aG9kcyBpbiBjdXJyZW50IHByb2Nlc3NcbmV4cG9ydCBjb25zdCBhZGRJcGNNZXRob2RzID0gKHN1YnByb2Nlc3MsIHtpcGN9KSA9PiB7XG5cdE9iamVjdC5hc3NpZ24oc3VicHJvY2VzcywgZ2V0SXBjTWV0aG9kcyhzdWJwcm9jZXNzLCBmYWxzZSwgaXBjKSk7XG59O1xuXG4vLyBHZXQgcHJvbWlzZS1iYXNlZCBJUEMgaW4gdGhlIHN1YnByb2Nlc3NcbmV4cG9ydCBjb25zdCBnZXRJcGNFeHBvcnQgPSAoKSA9PiB7XG5cdGNvbnN0IGFueVByb2Nlc3MgPSBwcm9jZXNzO1xuXHRjb25zdCBpc1N1YnByb2Nlc3MgPSB0cnVlO1xuXHRjb25zdCBpcGMgPSBwcm9jZXNzLmNoYW5uZWwgIT09IHVuZGVmaW5lZDtcblxuXHRyZXR1cm4ge1xuXHRcdC4uLmdldElwY01ldGhvZHMoYW55UHJvY2VzcywgaXNTdWJwcm9jZXNzLCBpcGMpLFxuXHRcdGdldENhbmNlbFNpZ25hbDogZ2V0Q2FuY2VsU2lnbmFsLmJpbmQodW5kZWZpbmVkLCB7XG5cdFx0XHRhbnlQcm9jZXNzLFxuXHRcdFx0Y2hhbm5lbDogYW55UHJvY2Vzcy5jaGFubmVsLFxuXHRcdFx0aXNTdWJwcm9jZXNzLFxuXHRcdFx0aXBjLFxuXHRcdH0pLFxuXHR9O1xufTtcblxuLy8gUmV0cmlldmUgdGhlIGBpcGNgIHNoYXJlZCBieSBib3RoIHRoZSBjdXJyZW50IHByb2Nlc3MgYW5kIHRoZSBzdWJwcm9jZXNzXG5jb25zdCBnZXRJcGNNZXRob2RzID0gKGFueVByb2Nlc3MsIGlzU3VicHJvY2VzcywgaXBjKSA9PiAoe1xuXHRzZW5kTWVzc2FnZTogc2VuZE1lc3NhZ2UuYmluZCh1bmRlZmluZWQsIHtcblx0XHRhbnlQcm9jZXNzLFxuXHRcdGNoYW5uZWw6IGFueVByb2Nlc3MuY2hhbm5lbCxcblx0XHRpc1N1YnByb2Nlc3MsXG5cdFx0aXBjLFxuXHR9KSxcblx0Z2V0T25lTWVzc2FnZTogZ2V0T25lTWVzc2FnZS5iaW5kKHVuZGVmaW5lZCwge1xuXHRcdGFueVByb2Nlc3MsXG5cdFx0Y2hhbm5lbDogYW55UHJvY2Vzcy5jaGFubmVsLFxuXHRcdGlzU3VicHJvY2Vzcyxcblx0XHRpcGMsXG5cdH0pLFxuXHRnZXRFYWNoTWVzc2FnZTogZ2V0RWFjaE1lc3NhZ2UuYmluZCh1bmRlZmluZWQsIHtcblx0XHRhbnlQcm9jZXNzLFxuXHRcdGNoYW5uZWw6IGFueVByb2Nlc3MuY2hhbm5lbCxcblx0XHRpc1N1YnByb2Nlc3MsXG5cdFx0aXBjLFxuXHR9KSxcbn0pO1xuIiwgImltcG9ydCB7Q2hpbGRQcm9jZXNzfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IHtcblx0UGFzc1Rocm91Z2gsXG5cdFJlYWRhYmxlLFxuXHRXcml0YWJsZSxcblx0RHVwbGV4LFxufSBmcm9tICdub2RlOnN0cmVhbSc7XG5pbXBvcnQge2NsZWFudXBDdXN0b21TdHJlYW1zfSBmcm9tICcuLi9zdGRpby9oYW5kbGUuanMnO1xuaW1wb3J0IHttYWtlRWFybHlFcnJvcn0gZnJvbSAnLi9yZXN1bHQuanMnO1xuaW1wb3J0IHtoYW5kbGVSZXN1bHR9IGZyb20gJy4vcmVqZWN0LmpzJztcblxuLy8gV2hlbiB0aGUgc3VicHJvY2VzcyBmYWlscyB0byBzcGF3bi5cbi8vIFdlIGVuc3VyZSB0aGUgcmV0dXJuZWQgZXJyb3IgaXMgYWx3YXlzIGJvdGggYSBwcm9taXNlIGFuZCBhIHN1YnByb2Nlc3MuXG5leHBvcnQgY29uc3QgaGFuZGxlRWFybHlFcnJvciA9ICh7ZXJyb3IsIGNvbW1hbmQsIGVzY2FwZWRDb21tYW5kLCBmaWxlRGVzY3JpcHRvcnMsIG9wdGlvbnMsIHN0YXJ0VGltZSwgdmVyYm9zZUluZm99KSA9PiB7XG5cdGNsZWFudXBDdXN0b21TdHJlYW1zKGZpbGVEZXNjcmlwdG9ycyk7XG5cblx0Y29uc3Qgc3VicHJvY2VzcyA9IG5ldyBDaGlsZFByb2Nlc3MoKTtcblx0Y3JlYXRlRHVtbXlTdHJlYW1zKHN1YnByb2Nlc3MsIGZpbGVEZXNjcmlwdG9ycyk7XG5cdE9iamVjdC5hc3NpZ24oc3VicHJvY2Vzcywge3JlYWRhYmxlLCB3cml0YWJsZSwgZHVwbGV4fSk7XG5cblx0Y29uc3QgZWFybHlFcnJvciA9IG1ha2VFYXJseUVycm9yKHtcblx0XHRlcnJvcixcblx0XHRjb21tYW5kLFxuXHRcdGVzY2FwZWRDb21tYW5kLFxuXHRcdGZpbGVEZXNjcmlwdG9ycyxcblx0XHRvcHRpb25zLFxuXHRcdHN0YXJ0VGltZSxcblx0XHRpc1N5bmM6IGZhbHNlLFxuXHR9KTtcblx0Y29uc3QgcHJvbWlzZSA9IGhhbmRsZUR1bW15UHJvbWlzZShlYXJseUVycm9yLCB2ZXJib3NlSW5mbywgb3B0aW9ucyk7XG5cdHJldHVybiB7c3VicHJvY2VzcywgcHJvbWlzZX07XG59O1xuXG5jb25zdCBjcmVhdGVEdW1teVN0cmVhbXMgPSAoc3VicHJvY2VzcywgZmlsZURlc2NyaXB0b3JzKSA9PiB7XG5cdGNvbnN0IHN0ZGluID0gY3JlYXRlRHVtbXlTdHJlYW0oKTtcblx0Y29uc3Qgc3Rkb3V0ID0gY3JlYXRlRHVtbXlTdHJlYW0oKTtcblx0Y29uc3Qgc3RkZXJyID0gY3JlYXRlRHVtbXlTdHJlYW0oKTtcblx0Y29uc3QgZXh0cmFTdGRpbyA9IEFycmF5LmZyb20oe2xlbmd0aDogZmlsZURlc2NyaXB0b3JzLmxlbmd0aCAtIDN9LCBjcmVhdGVEdW1teVN0cmVhbSk7XG5cdGNvbnN0IGFsbCA9IGNyZWF0ZUR1bW15U3RyZWFtKCk7XG5cdGNvbnN0IHN0ZGlvID0gW3N0ZGluLCBzdGRvdXQsIHN0ZGVyciwgLi4uZXh0cmFTdGRpb107XG5cdE9iamVjdC5hc3NpZ24oc3VicHJvY2Vzcywge1xuXHRcdHN0ZGluLFxuXHRcdHN0ZG91dCxcblx0XHRzdGRlcnIsXG5cdFx0YWxsLFxuXHRcdHN0ZGlvLFxuXHR9KTtcbn07XG5cbmNvbnN0IGNyZWF0ZUR1bW15U3RyZWFtID0gKCkgPT4ge1xuXHRjb25zdCBzdHJlYW0gPSBuZXcgUGFzc1Rocm91Z2goKTtcblx0c3RyZWFtLmVuZCgpO1xuXHRyZXR1cm4gc3RyZWFtO1xufTtcblxuY29uc3QgcmVhZGFibGUgPSAoKSA9PiBuZXcgUmVhZGFibGUoe3JlYWQoKSB7fX0pO1xuY29uc3Qgd3JpdGFibGUgPSAoKSA9PiBuZXcgV3JpdGFibGUoe3dyaXRlKCkge319KTtcbmNvbnN0IGR1cGxleCA9ICgpID0+IG5ldyBEdXBsZXgoe3JlYWQoKSB7fSwgd3JpdGUoKSB7fX0pO1xuXG5jb25zdCBoYW5kbGVEdW1teVByb21pc2UgPSBhc3luYyAoZXJyb3IsIHZlcmJvc2VJbmZvLCBvcHRpb25zKSA9PiBoYW5kbGVSZXN1bHQoZXJyb3IsIHZlcmJvc2VJbmZvLCBvcHRpb25zKTtcbiIsICJpbXBvcnQge2NyZWF0ZVJlYWRTdHJlYW0sIGNyZWF0ZVdyaXRlU3RyZWFtfSBmcm9tICdub2RlOmZzJztcbmltcG9ydCB7QnVmZmVyfSBmcm9tICdub2RlOmJ1ZmZlcic7XG5pbXBvcnQge1JlYWRhYmxlLCBXcml0YWJsZSwgRHVwbGV4fSBmcm9tICdub2RlOnN0cmVhbSc7XG5pbXBvcnQge2dlbmVyYXRvclRvU3RyZWFtfSBmcm9tICcuLi90cmFuc2Zvcm0vZ2VuZXJhdG9yLmpzJztcbmltcG9ydCB7aGFuZGxlU3RkaW99IGZyb20gJy4vaGFuZGxlLmpzJztcbmltcG9ydCB7VFlQRV9UT19NRVNTQUdFfSBmcm9tICcuL3R5cGUuanMnO1xuXG4vLyBIYW5kbGUgYGlucHV0YCwgYGlucHV0RmlsZWAsIGBzdGRpbmAsIGBzdGRvdXRgIGFuZCBgc3RkZXJyYCBvcHRpb25zLCBiZWZvcmUgc3Bhd25pbmcsIGluIGFzeW5jIG1vZGVcbmV4cG9ydCBjb25zdCBoYW5kbGVTdGRpb0FzeW5jID0gKG9wdGlvbnMsIHZlcmJvc2VJbmZvKSA9PiBoYW5kbGVTdGRpbyhhZGRQcm9wZXJ0aWVzQXN5bmMsIG9wdGlvbnMsIHZlcmJvc2VJbmZvLCBmYWxzZSk7XG5cbmNvbnN0IGZvcmJpZGRlbklmQXN5bmMgPSAoe3R5cGUsIG9wdGlvbk5hbWV9KSA9PiB7XG5cdHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBcXGAke29wdGlvbk5hbWV9XFxgIG9wdGlvbiBjYW5ub3QgYmUgJHtUWVBFX1RPX01FU1NBR0VbdHlwZV19LmApO1xufTtcblxuLy8gQ3JlYXRlIHN0cmVhbXMgdXNlZCBpbnRlcm5hbGx5IGZvciBwaXBpbmcgd2hlbiB1c2luZyBzcGVjaWZpYyB2YWx1ZXMgZm9yIHRoZSBgc3RkKmAgb3B0aW9ucywgaW4gYXN5bmMgbW9kZS5cbi8vIEZvciBleGFtcGxlLCBgc3Rkb3V0OiB7ZmlsZX1gIGNyZWF0ZXMgYSBmaWxlIHN0cmVhbSwgd2hpY2ggaXMgcGlwZWQgZnJvbS90by5cbmNvbnN0IGFkZFByb3BlcnRpZXMgPSB7XG5cdGZpbGVOdW1iZXI6IGZvcmJpZGRlbklmQXN5bmMsXG5cdGdlbmVyYXRvcjogZ2VuZXJhdG9yVG9TdHJlYW0sXG5cdGFzeW5jR2VuZXJhdG9yOiBnZW5lcmF0b3JUb1N0cmVhbSxcblx0bm9kZVN0cmVhbTogKHt2YWx1ZX0pID0+ICh7c3RyZWFtOiB2YWx1ZX0pLFxuXHR3ZWJUcmFuc2Zvcm0oe3ZhbHVlOiB7dHJhbnNmb3JtLCB3cml0YWJsZU9iamVjdE1vZGUsIHJlYWRhYmxlT2JqZWN0TW9kZX19KSB7XG5cdFx0Y29uc3Qgb2JqZWN0TW9kZSA9IHdyaXRhYmxlT2JqZWN0TW9kZSB8fCByZWFkYWJsZU9iamVjdE1vZGU7XG5cdFx0Y29uc3Qgc3RyZWFtID0gRHVwbGV4LmZyb21XZWIodHJhbnNmb3JtLCB7b2JqZWN0TW9kZX0pO1xuXHRcdHJldHVybiB7c3RyZWFtfTtcblx0fSxcblx0ZHVwbGV4OiAoe3ZhbHVlOiB7dHJhbnNmb3JtfX0pID0+ICh7c3RyZWFtOiB0cmFuc2Zvcm19KSxcblx0bmF0aXZlKCkge30sXG59O1xuXG5jb25zdCBhZGRQcm9wZXJ0aWVzQXN5bmMgPSB7XG5cdGlucHV0OiB7XG5cdFx0Li4uYWRkUHJvcGVydGllcyxcblx0XHRmaWxlVXJsOiAoe3ZhbHVlfSkgPT4gKHtzdHJlYW06IGNyZWF0ZVJlYWRTdHJlYW0odmFsdWUpfSksXG5cdFx0ZmlsZVBhdGg6ICh7dmFsdWU6IHtmaWxlfX0pID0+ICh7c3RyZWFtOiBjcmVhdGVSZWFkU3RyZWFtKGZpbGUpfSksXG5cdFx0d2ViU3RyZWFtOiAoe3ZhbHVlfSkgPT4gKHtzdHJlYW06IFJlYWRhYmxlLmZyb21XZWIodmFsdWUpfSksXG5cdFx0aXRlcmFibGU6ICh7dmFsdWV9KSA9PiAoe3N0cmVhbTogUmVhZGFibGUuZnJvbSh2YWx1ZSl9KSxcblx0XHRhc3luY0l0ZXJhYmxlOiAoe3ZhbHVlfSkgPT4gKHtzdHJlYW06IFJlYWRhYmxlLmZyb20odmFsdWUpfSksXG5cdFx0c3RyaW5nOiAoe3ZhbHVlfSkgPT4gKHtzdHJlYW06IFJlYWRhYmxlLmZyb20odmFsdWUpfSksXG5cdFx0dWludDhBcnJheTogKHt2YWx1ZX0pID0+ICh7c3RyZWFtOiBSZWFkYWJsZS5mcm9tKEJ1ZmZlci5mcm9tKHZhbHVlKSl9KSxcblx0fSxcblx0b3V0cHV0OiB7XG5cdFx0Li4uYWRkUHJvcGVydGllcyxcblx0XHRmaWxlVXJsOiAoe3ZhbHVlfSkgPT4gKHtzdHJlYW06IGNyZWF0ZVdyaXRlU3RyZWFtKHZhbHVlKX0pLFxuXHRcdGZpbGVQYXRoOiAoe3ZhbHVlOiB7ZmlsZSwgYXBwZW5kfX0pID0+ICh7c3RyZWFtOiBjcmVhdGVXcml0ZVN0cmVhbShmaWxlLCBhcHBlbmQgPyB7ZmxhZ3M6ICdhJ30gOiB7fSl9KSxcblx0XHR3ZWJTdHJlYW06ICh7dmFsdWV9KSA9PiAoe3N0cmVhbTogV3JpdGFibGUuZnJvbVdlYih2YWx1ZSl9KSxcblx0XHRpdGVyYWJsZTogZm9yYmlkZGVuSWZBc3luYyxcblx0XHRhc3luY0l0ZXJhYmxlOiBmb3JiaWRkZW5JZkFzeW5jLFxuXHRcdHN0cmluZzogZm9yYmlkZGVuSWZBc3luYyxcblx0XHR1aW50OEFycmF5OiBmb3JiaWRkZW5JZkFzeW5jLFxuXHR9LFxufTtcbiIsICJpbXBvcnQge29uLCBvbmNlfSBmcm9tICdub2RlOmV2ZW50cyc7XG5pbXBvcnQge1Bhc3NUaHJvdWdoIGFzIFBhc3NUaHJvdWdoU3RyZWFtLCBnZXREZWZhdWx0SGlnaFdhdGVyTWFya30gZnJvbSAnbm9kZTpzdHJlYW0nO1xuaW1wb3J0IHtmaW5pc2hlZH0gZnJvbSAnbm9kZTpzdHJlYW0vcHJvbWlzZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZXJnZVN0cmVhbXMoc3RyZWFtcykge1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoc3RyZWFtcykpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBhbiBhcnJheSwgZ290IFxcYCR7dHlwZW9mIHN0cmVhbXN9XFxgLmApO1xuXHR9XG5cblx0Zm9yIChjb25zdCBzdHJlYW0gb2Ygc3RyZWFtcykge1xuXHRcdHZhbGlkYXRlU3RyZWFtKHN0cmVhbSk7XG5cdH1cblxuXHRjb25zdCBvYmplY3RNb2RlID0gc3RyZWFtcy5zb21lKCh7cmVhZGFibGVPYmplY3RNb2RlfSkgPT4gcmVhZGFibGVPYmplY3RNb2RlKTtcblx0Y29uc3QgaGlnaFdhdGVyTWFyayA9IGdldEhpZ2hXYXRlck1hcmsoc3RyZWFtcywgb2JqZWN0TW9kZSk7XG5cdGNvbnN0IHBhc3NUaHJvdWdoU3RyZWFtID0gbmV3IE1lcmdlZFN0cmVhbSh7XG5cdFx0b2JqZWN0TW9kZSxcblx0XHR3cml0YWJsZUhpZ2hXYXRlck1hcms6IGhpZ2hXYXRlck1hcmssXG5cdFx0cmVhZGFibGVIaWdoV2F0ZXJNYXJrOiBoaWdoV2F0ZXJNYXJrLFxuXHR9KTtcblxuXHRmb3IgKGNvbnN0IHN0cmVhbSBvZiBzdHJlYW1zKSB7XG5cdFx0cGFzc1Rocm91Z2hTdHJlYW0uYWRkKHN0cmVhbSk7XG5cdH1cblxuXHRyZXR1cm4gcGFzc1Rocm91Z2hTdHJlYW07XG59XG5cbmNvbnN0IGdldEhpZ2hXYXRlck1hcmsgPSAoc3RyZWFtcywgb2JqZWN0TW9kZSkgPT4ge1xuXHRpZiAoc3RyZWFtcy5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gZ2V0RGVmYXVsdEhpZ2hXYXRlck1hcmsob2JqZWN0TW9kZSk7XG5cdH1cblxuXHRjb25zdCBoaWdoV2F0ZXJNYXJrcyA9IHN0cmVhbXNcblx0XHQuZmlsdGVyKCh7cmVhZGFibGVPYmplY3RNb2RlfSkgPT4gcmVhZGFibGVPYmplY3RNb2RlID09PSBvYmplY3RNb2RlKVxuXHRcdC5tYXAoKHtyZWFkYWJsZUhpZ2hXYXRlck1hcmt9KSA9PiByZWFkYWJsZUhpZ2hXYXRlck1hcmspO1xuXHRyZXR1cm4gTWF0aC5tYXgoLi4uaGlnaFdhdGVyTWFya3MpO1xufTtcblxuY2xhc3MgTWVyZ2VkU3RyZWFtIGV4dGVuZHMgUGFzc1Rocm91Z2hTdHJlYW0ge1xuXHQjc3RyZWFtcyA9IG5ldyBTZXQoW10pO1xuXHQjZW5kZWQgPSBuZXcgU2V0KFtdKTtcblx0I2Fib3J0ZWQgPSBuZXcgU2V0KFtdKTtcblx0I29uRmluaXNoZWQ7XG5cdCN1bnBpcGVFdmVudCA9IFN5bWJvbCgndW5waXBlJyk7XG5cdCNzdHJlYW1Qcm9taXNlcyA9IG5ldyBXZWFrTWFwKCk7XG5cblx0YWRkKHN0cmVhbSkge1xuXHRcdHZhbGlkYXRlU3RyZWFtKHN0cmVhbSk7XG5cblx0XHRpZiAodGhpcy4jc3RyZWFtcy5oYXMoc3RyZWFtKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuI3N0cmVhbXMuYWRkKHN0cmVhbSk7XG5cblx0XHR0aGlzLiNvbkZpbmlzaGVkID8/PSBvbk1lcmdlZFN0cmVhbUZpbmlzaGVkKHRoaXMsIHRoaXMuI3N0cmVhbXMsIHRoaXMuI3VucGlwZUV2ZW50KTtcblx0XHRjb25zdCBzdHJlYW1Qcm9taXNlID0gZW5kV2hlblN0cmVhbXNEb25lKHtcblx0XHRcdHBhc3NUaHJvdWdoU3RyZWFtOiB0aGlzLFxuXHRcdFx0c3RyZWFtLFxuXHRcdFx0c3RyZWFtczogdGhpcy4jc3RyZWFtcyxcblx0XHRcdGVuZGVkOiB0aGlzLiNlbmRlZCxcblx0XHRcdGFib3J0ZWQ6IHRoaXMuI2Fib3J0ZWQsXG5cdFx0XHRvbkZpbmlzaGVkOiB0aGlzLiNvbkZpbmlzaGVkLFxuXHRcdFx0dW5waXBlRXZlbnQ6IHRoaXMuI3VucGlwZUV2ZW50LFxuXHRcdH0pO1xuXHRcdHRoaXMuI3N0cmVhbVByb21pc2VzLnNldChzdHJlYW0sIHN0cmVhbVByb21pc2UpO1xuXG5cdFx0c3RyZWFtLnBpcGUodGhpcywge2VuZDogZmFsc2V9KTtcblx0fVxuXG5cdGFzeW5jIHJlbW92ZShzdHJlYW0pIHtcblx0XHR2YWxpZGF0ZVN0cmVhbShzdHJlYW0pO1xuXG5cdFx0aWYgKCF0aGlzLiNzdHJlYW1zLmhhcyhzdHJlYW0pKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgc3RyZWFtUHJvbWlzZSA9IHRoaXMuI3N0cmVhbVByb21pc2VzLmdldChzdHJlYW0pO1xuXHRcdGlmIChzdHJlYW1Qcm9taXNlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR0aGlzLiNzdHJlYW1Qcm9taXNlcy5kZWxldGUoc3RyZWFtKTtcblxuXHRcdHN0cmVhbS51bnBpcGUodGhpcyk7XG5cdFx0YXdhaXQgc3RyZWFtUHJvbWlzZTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufVxuXG5jb25zdCBvbk1lcmdlZFN0cmVhbUZpbmlzaGVkID0gYXN5bmMgKHBhc3NUaHJvdWdoU3RyZWFtLCBzdHJlYW1zLCB1bnBpcGVFdmVudCkgPT4ge1xuXHR1cGRhdGVNYXhMaXN0ZW5lcnMocGFzc1Rocm91Z2hTdHJlYW0sIFBBU1NUSFJPVUdIX0xJU1RFTkVSU19DT1VOVCk7XG5cdGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cblx0dHJ5IHtcblx0XHRhd2FpdCBQcm9taXNlLnJhY2UoW1xuXHRcdFx0b25NZXJnZWRTdHJlYW1FbmQocGFzc1Rocm91Z2hTdHJlYW0sIGNvbnRyb2xsZXIpLFxuXHRcdFx0b25JbnB1dFN0cmVhbXNVbnBpcGUocGFzc1Rocm91Z2hTdHJlYW0sIHN0cmVhbXMsIHVucGlwZUV2ZW50LCBjb250cm9sbGVyKSxcblx0XHRdKTtcblx0fSBmaW5hbGx5IHtcblx0XHRjb250cm9sbGVyLmFib3J0KCk7XG5cdFx0dXBkYXRlTWF4TGlzdGVuZXJzKHBhc3NUaHJvdWdoU3RyZWFtLCAtUEFTU1RIUk9VR0hfTElTVEVORVJTX0NPVU5UKTtcblx0fVxufTtcblxuY29uc3Qgb25NZXJnZWRTdHJlYW1FbmQgPSBhc3luYyAocGFzc1Rocm91Z2hTdHJlYW0sIHtzaWduYWx9KSA9PiB7XG5cdHRyeSB7XG5cdFx0YXdhaXQgZmluaXNoZWQocGFzc1Rocm91Z2hTdHJlYW0sIHtzaWduYWwsIGNsZWFudXA6IHRydWV9KTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRlcnJvck9yQWJvcnRTdHJlYW0ocGFzc1Rocm91Z2hTdHJlYW0sIGVycm9yKTtcblx0XHR0aHJvdyBlcnJvcjtcblx0fVxufTtcblxuY29uc3Qgb25JbnB1dFN0cmVhbXNVbnBpcGUgPSBhc3luYyAocGFzc1Rocm91Z2hTdHJlYW0sIHN0cmVhbXMsIHVucGlwZUV2ZW50LCB7c2lnbmFsfSkgPT4ge1xuXHRmb3IgYXdhaXQgKGNvbnN0IFt1bnBpcGVkU3RyZWFtXSBvZiBvbihwYXNzVGhyb3VnaFN0cmVhbSwgJ3VucGlwZScsIHtzaWduYWx9KSkge1xuXHRcdGlmIChzdHJlYW1zLmhhcyh1bnBpcGVkU3RyZWFtKSkge1xuXHRcdFx0dW5waXBlZFN0cmVhbS5lbWl0KHVucGlwZUV2ZW50KTtcblx0XHR9XG5cdH1cbn07XG5cbmNvbnN0IHZhbGlkYXRlU3RyZWFtID0gc3RyZWFtID0+IHtcblx0aWYgKHR5cGVvZiBzdHJlYW0/LnBpcGUgIT09ICdmdW5jdGlvbicpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBhIHJlYWRhYmxlIHN0cmVhbSwgZ290OiBcXGAke3R5cGVvZiBzdHJlYW19XFxgLmApO1xuXHR9XG59O1xuXG5jb25zdCBlbmRXaGVuU3RyZWFtc0RvbmUgPSBhc3luYyAoe3Bhc3NUaHJvdWdoU3RyZWFtLCBzdHJlYW0sIHN0cmVhbXMsIGVuZGVkLCBhYm9ydGVkLCBvbkZpbmlzaGVkLCB1bnBpcGVFdmVudH0pID0+IHtcblx0dXBkYXRlTWF4TGlzdGVuZXJzKHBhc3NUaHJvdWdoU3RyZWFtLCBQQVNTVEhST1VHSF9MSVNURU5FUlNfUEVSX1NUUkVBTSk7XG5cdGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cblx0dHJ5IHtcblx0XHRhd2FpdCBQcm9taXNlLnJhY2UoW1xuXHRcdFx0YWZ0ZXJNZXJnZWRTdHJlYW1GaW5pc2hlZChvbkZpbmlzaGVkLCBzdHJlYW0sIGNvbnRyb2xsZXIpLFxuXHRcdFx0b25JbnB1dFN0cmVhbUVuZCh7XG5cdFx0XHRcdHBhc3NUaHJvdWdoU3RyZWFtLFxuXHRcdFx0XHRzdHJlYW0sXG5cdFx0XHRcdHN0cmVhbXMsXG5cdFx0XHRcdGVuZGVkLFxuXHRcdFx0XHRhYm9ydGVkLFxuXHRcdFx0XHRjb250cm9sbGVyLFxuXHRcdFx0fSksXG5cdFx0XHRvbklucHV0U3RyZWFtVW5waXBlKHtcblx0XHRcdFx0c3RyZWFtLFxuXHRcdFx0XHRzdHJlYW1zLFxuXHRcdFx0XHRlbmRlZCxcblx0XHRcdFx0YWJvcnRlZCxcblx0XHRcdFx0dW5waXBlRXZlbnQsXG5cdFx0XHRcdGNvbnRyb2xsZXIsXG5cdFx0XHR9KSxcblx0XHRdKTtcblx0fSBmaW5hbGx5IHtcblx0XHRjb250cm9sbGVyLmFib3J0KCk7XG5cdFx0dXBkYXRlTWF4TGlzdGVuZXJzKHBhc3NUaHJvdWdoU3RyZWFtLCAtUEFTU1RIUk9VR0hfTElTVEVORVJTX1BFUl9TVFJFQU0pO1xuXHR9XG5cblx0aWYgKHN0cmVhbXMuc2l6ZSA+IDAgJiYgc3RyZWFtcy5zaXplID09PSBlbmRlZC5zaXplICsgYWJvcnRlZC5zaXplKSB7XG5cdFx0aWYgKGVuZGVkLnNpemUgPT09IDAgJiYgYWJvcnRlZC5zaXplID4gMCkge1xuXHRcdFx0YWJvcnRTdHJlYW0ocGFzc1Rocm91Z2hTdHJlYW0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbmRTdHJlYW0ocGFzc1Rocm91Z2hTdHJlYW0pO1xuXHRcdH1cblx0fVxufTtcblxuY29uc3QgYWZ0ZXJNZXJnZWRTdHJlYW1GaW5pc2hlZCA9IGFzeW5jIChvbkZpbmlzaGVkLCBzdHJlYW0sIHtzaWduYWx9KSA9PiB7XG5cdHRyeSB7XG5cdFx0YXdhaXQgb25GaW5pc2hlZDtcblx0XHRpZiAoIXNpZ25hbC5hYm9ydGVkKSB7XG5cdFx0XHRhYm9ydFN0cmVhbShzdHJlYW0pO1xuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAoIXNpZ25hbC5hYm9ydGVkKSB7XG5cdFx0XHRlcnJvck9yQWJvcnRTdHJlYW0oc3RyZWFtLCBlcnJvcik7XG5cdFx0fVxuXHR9XG59O1xuXG5jb25zdCBvbklucHV0U3RyZWFtRW5kID0gYXN5bmMgKHtwYXNzVGhyb3VnaFN0cmVhbSwgc3RyZWFtLCBzdHJlYW1zLCBlbmRlZCwgYWJvcnRlZCwgY29udHJvbGxlcjoge3NpZ25hbH19KSA9PiB7XG5cdHRyeSB7XG5cdFx0YXdhaXQgZmluaXNoZWQoc3RyZWFtLCB7XG5cdFx0XHRzaWduYWwsXG5cdFx0XHRjbGVhbnVwOiB0cnVlLFxuXHRcdFx0cmVhZGFibGU6IHRydWUsXG5cdFx0XHR3cml0YWJsZTogZmFsc2UsXG5cdFx0fSk7XG5cdFx0aWYgKHN0cmVhbXMuaGFzKHN0cmVhbSkpIHtcblx0XHRcdGVuZGVkLmFkZChzdHJlYW0pO1xuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAoc2lnbmFsLmFib3J0ZWQgfHwgIXN0cmVhbXMuaGFzKHN0cmVhbSkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoaXNBYm9ydEVycm9yKGVycm9yKSkge1xuXHRcdFx0YWJvcnRlZC5hZGQoc3RyZWFtKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZXJyb3JTdHJlYW0ocGFzc1Rocm91Z2hTdHJlYW0sIGVycm9yKTtcblx0XHR9XG5cdH1cbn07XG5cbmNvbnN0IG9uSW5wdXRTdHJlYW1VbnBpcGUgPSBhc3luYyAoe3N0cmVhbSwgc3RyZWFtcywgZW5kZWQsIGFib3J0ZWQsIHVucGlwZUV2ZW50LCBjb250cm9sbGVyOiB7c2lnbmFsfX0pID0+IHtcblx0YXdhaXQgb25jZShzdHJlYW0sIHVucGlwZUV2ZW50LCB7c2lnbmFsfSk7XG5cblx0aWYgKCFzdHJlYW0ucmVhZGFibGUpIHtcblx0XHRyZXR1cm4gb25jZShzaWduYWwsICdhYm9ydCcsIHtzaWduYWx9KTtcblx0fVxuXG5cdHN0cmVhbXMuZGVsZXRlKHN0cmVhbSk7XG5cdGVuZGVkLmRlbGV0ZShzdHJlYW0pO1xuXHRhYm9ydGVkLmRlbGV0ZShzdHJlYW0pO1xufTtcblxuY29uc3QgZW5kU3RyZWFtID0gc3RyZWFtID0+IHtcblx0aWYgKHN0cmVhbS53cml0YWJsZSkge1xuXHRcdHN0cmVhbS5lbmQoKTtcblx0fVxufTtcblxuY29uc3QgZXJyb3JPckFib3J0U3RyZWFtID0gKHN0cmVhbSwgZXJyb3IpID0+IHtcblx0aWYgKGlzQWJvcnRFcnJvcihlcnJvcikpIHtcblx0XHRhYm9ydFN0cmVhbShzdHJlYW0pO1xuXHR9IGVsc2Uge1xuXHRcdGVycm9yU3RyZWFtKHN0cmVhbSwgZXJyb3IpO1xuXHR9XG59O1xuXG4vLyBUaGlzIGlzIHRoZSBlcnJvciB0aHJvd24gYnkgYGZpbmlzaGVkKClgIG9uIGBzdHJlYW0uZGVzdHJveSgpYFxuY29uc3QgaXNBYm9ydEVycm9yID0gZXJyb3IgPT4gZXJyb3I/LmNvZGUgPT09ICdFUlJfU1RSRUFNX1BSRU1BVFVSRV9DTE9TRSc7XG5cbmNvbnN0IGFib3J0U3RyZWFtID0gc3RyZWFtID0+IHtcblx0aWYgKHN0cmVhbS5yZWFkYWJsZSB8fCBzdHJlYW0ud3JpdGFibGUpIHtcblx0XHRzdHJlYW0uZGVzdHJveSgpO1xuXHR9XG59O1xuXG4vLyBgc3RyZWFtLmRlc3Ryb3koZXJyb3IpYCBjcmFzaGVzIHRoZSBwcm9jZXNzIHdpdGggYHVuY2F1Z2h0RXhjZXB0aW9uYCBpZiBubyBgZXJyb3JgIGV2ZW50IGxpc3RlbmVyIGV4aXN0cyBvbiBgc3RyZWFtYC5cbi8vIFdlIHRha2UgY2FyZSBvZiBlcnJvciBoYW5kbGluZyBvbiB1c2VyIGJlaGFsZiwgc28gd2UgZG8gbm90IHdhbnQgdGhpcyB0byBoYXBwZW4uXG5jb25zdCBlcnJvclN0cmVhbSA9IChzdHJlYW0sIGVycm9yKSA9PiB7XG5cdGlmICghc3RyZWFtLmRlc3Ryb3llZCkge1xuXHRcdHN0cmVhbS5vbmNlKCdlcnJvcicsIG5vb3ApO1xuXHRcdHN0cmVhbS5kZXN0cm95KGVycm9yKTtcblx0fVxufTtcblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5jb25zdCB1cGRhdGVNYXhMaXN0ZW5lcnMgPSAocGFzc1Rocm91Z2hTdHJlYW0sIGluY3JlbWVudCkgPT4ge1xuXHRjb25zdCBtYXhMaXN0ZW5lcnMgPSBwYXNzVGhyb3VnaFN0cmVhbS5nZXRNYXhMaXN0ZW5lcnMoKTtcblx0aWYgKG1heExpc3RlbmVycyAhPT0gMCAmJiBtYXhMaXN0ZW5lcnMgIT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSkge1xuXHRcdHBhc3NUaHJvdWdoU3RyZWFtLnNldE1heExpc3RlbmVycyhtYXhMaXN0ZW5lcnMgKyBpbmNyZW1lbnQpO1xuXHR9XG59O1xuXG4vLyBOdW1iZXIgb2YgdGltZXMgYHBhc3NUaHJvdWdoU3RyZWFtLm9uKClgIGlzIGNhbGxlZCByZWdhcmRsZXNzIG9mIHN0cmVhbXM6XG4vLyAgLSBvbmNlIGR1ZSB0byBgZmluaXNoZWQocGFzc1Rocm91Z2hTdHJlYW0pYFxuLy8gIC0gb25jZSBkdWUgdG8gYG9uKHBhc3NUaHJvdWdoU3RyZWFtKWBcbmNvbnN0IFBBU1NUSFJPVUdIX0xJU1RFTkVSU19DT1VOVCA9IDI7XG5cbi8vIE51bWJlciBvZiB0aW1lcyBgcGFzc1Rocm91Z2hTdHJlYW0ub24oKWAgaXMgY2FsbGVkIHBlciBzdHJlYW06XG4vLyAgLSBvbmNlIGR1ZSB0byBgc3RyZWFtLnBpcGUocGFzc1Rocm91Z2hTdHJlYW0pYFxuY29uc3QgUEFTU1RIUk9VR0hfTElTVEVORVJTX1BFUl9TVFJFQU0gPSAxO1xuIiwgImltcG9ydCB7ZmluaXNoZWR9IGZyb20gJ25vZGU6c3RyZWFtL3Byb21pc2VzJztcbmltcG9ydCB7aXNTdGFuZGFyZFN0cmVhbX0gZnJvbSAnLi4vdXRpbHMvc3RhbmRhcmQtc3RyZWFtLmpzJztcblxuLy8gU2ltaWxhciB0byBgU3RyZWFtLnBpcGVsaW5lKHNvdXJjZSwgZGVzdGluYXRpb24pYCwgYnV0IGRvZXMgbm90IGRlc3Ryb3kgc3RhbmRhcmQgc3RyZWFtc1xuZXhwb3J0IGNvbnN0IHBpcGVTdHJlYW1zID0gKHNvdXJjZSwgZGVzdGluYXRpb24pID0+IHtcblx0c291cmNlLnBpcGUoZGVzdGluYXRpb24pO1xuXHRvblNvdXJjZUZpbmlzaChzb3VyY2UsIGRlc3RpbmF0aW9uKTtcblx0b25EZXN0aW5hdGlvbkZpbmlzaChzb3VyY2UsIGRlc3RpbmF0aW9uKTtcbn07XG5cbi8vIGBzb3VyY2UucGlwZShkZXN0aW5hdGlvbilgIG1ha2VzIGBkZXN0aW5hdGlvbmAgZW5kIHdoZW4gYHNvdXJjZWAgZW5kcy5cbi8vIEJ1dCBpdCBkb2VzIG5vdCBwcm9wYWdhdGUgYWJvcnRzIG9yIGVycm9ycy4gVGhpcyBmdW5jdGlvbiBkb2VzIGl0LlxuY29uc3Qgb25Tb3VyY2VGaW5pc2ggPSBhc3luYyAoc291cmNlLCBkZXN0aW5hdGlvbikgPT4ge1xuXHRpZiAoaXNTdGFuZGFyZFN0cmVhbShzb3VyY2UpIHx8IGlzU3RhbmRhcmRTdHJlYW0oZGVzdGluYXRpb24pKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dHJ5IHtcblx0XHRhd2FpdCBmaW5pc2hlZChzb3VyY2UsIHtjbGVhbnVwOiB0cnVlLCByZWFkYWJsZTogdHJ1ZSwgd3JpdGFibGU6IGZhbHNlfSk7XG5cdH0gY2F0Y2gge31cblxuXHRlbmREZXN0aW5hdGlvblN0cmVhbShkZXN0aW5hdGlvbik7XG59O1xuXG5leHBvcnQgY29uc3QgZW5kRGVzdGluYXRpb25TdHJlYW0gPSBkZXN0aW5hdGlvbiA9PiB7XG5cdGlmIChkZXN0aW5hdGlvbi53cml0YWJsZSkge1xuXHRcdGRlc3RpbmF0aW9uLmVuZCgpO1xuXHR9XG59O1xuXG4vLyBXZSBkbyB0aGUgc2FtZSB0aGluZyBpbiB0aGUgb3RoZXIgZGlyZWN0aW9uIGFzIHdlbGwuXG5jb25zdCBvbkRlc3RpbmF0aW9uRmluaXNoID0gYXN5bmMgKHNvdXJjZSwgZGVzdGluYXRpb24pID0+IHtcblx0aWYgKGlzU3RhbmRhcmRTdHJlYW0oc291cmNlKSB8fCBpc1N0YW5kYXJkU3RyZWFtKGRlc3RpbmF0aW9uKSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHRyeSB7XG5cdFx0YXdhaXQgZmluaXNoZWQoZGVzdGluYXRpb24sIHtjbGVhbnVwOiB0cnVlLCByZWFkYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlfSk7XG5cdH0gY2F0Y2gge31cblxuXHRhYm9ydFNvdXJjZVN0cmVhbShzb3VyY2UpO1xufTtcblxuZXhwb3J0IGNvbnN0IGFib3J0U291cmNlU3RyZWFtID0gc291cmNlID0+IHtcblx0aWYgKHNvdXJjZS5yZWFkYWJsZSkge1xuXHRcdHNvdXJjZS5kZXN0cm95KCk7XG5cdH1cbn07XG4iLCAiaW1wb3J0IG1lcmdlU3RyZWFtcyBmcm9tICdAc2luZHJlc29yaHVzL21lcmdlLXN0cmVhbXMnO1xuaW1wb3J0IHtpc1N0YW5kYXJkU3RyZWFtfSBmcm9tICcuLi91dGlscy9zdGFuZGFyZC1zdHJlYW0uanMnO1xuaW1wb3J0IHtpbmNyZW1lbnRNYXhMaXN0ZW5lcnN9IGZyb20gJy4uL3V0aWxzL21heC1saXN0ZW5lcnMuanMnO1xuaW1wb3J0IHtUUkFOU0ZPUk1fVFlQRVN9IGZyb20gJy4uL3N0ZGlvL3R5cGUuanMnO1xuaW1wb3J0IHtwaXBlU3RyZWFtc30gZnJvbSAnLi9waXBlbGluZS5qcyc7XG5cbi8vIEhhbmRsZSBgaW5wdXRgLCBgaW5wdXRGaWxlYCwgYHN0ZGluYCwgYHN0ZG91dGAgYW5kIGBzdGRlcnJgIG9wdGlvbnMsIGFmdGVyIHNwYXduaW5nLCBpbiBhc3luYyBtb2RlXG4vLyBXaGVuIG11bHRpcGxlIGlucHV0IHN0cmVhbXMgYXJlIHVzZWQsIHdlIG1lcmdlIHRoZW0gdG8gZW5zdXJlIHRoZSBvdXRwdXQgc3RyZWFtIGVuZHMgb25seSBvbmNlIGVhY2ggaW5wdXQgc3RyZWFtIGhhcyBlbmRlZFxuZXhwb3J0IGNvbnN0IHBpcGVPdXRwdXRBc3luYyA9IChzdWJwcm9jZXNzLCBmaWxlRGVzY3JpcHRvcnMsIGNvbnRyb2xsZXIpID0+IHtcblx0Y29uc3QgcGlwZUdyb3VwcyA9IG5ldyBNYXAoKTtcblxuXHRmb3IgKGNvbnN0IFtmZE51bWJlciwge3N0ZGlvSXRlbXMsIGRpcmVjdGlvbn1dIG9mIE9iamVjdC5lbnRyaWVzKGZpbGVEZXNjcmlwdG9ycykpIHtcblx0XHRmb3IgKGNvbnN0IHtzdHJlYW19IG9mIHN0ZGlvSXRlbXMuZmlsdGVyKCh7dHlwZX0pID0+IFRSQU5TRk9STV9UWVBFUy5oYXModHlwZSkpKSB7XG5cdFx0XHRwaXBlVHJhbnNmb3JtKHN1YnByb2Nlc3MsIHN0cmVhbSwgZGlyZWN0aW9uLCBmZE51bWJlcik7XG5cdFx0fVxuXG5cdFx0Zm9yIChjb25zdCB7c3RyZWFtfSBvZiBzdGRpb0l0ZW1zLmZpbHRlcigoe3R5cGV9KSA9PiAhVFJBTlNGT1JNX1RZUEVTLmhhcyh0eXBlKSkpIHtcblx0XHRcdHBpcGVTdGRpb0l0ZW0oe1xuXHRcdFx0XHRzdWJwcm9jZXNzLFxuXHRcdFx0XHRzdHJlYW0sXG5cdFx0XHRcdGRpcmVjdGlvbixcblx0XHRcdFx0ZmROdW1iZXIsXG5cdFx0XHRcdHBpcGVHcm91cHMsXG5cdFx0XHRcdGNvbnRyb2xsZXIsXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRmb3IgKGNvbnN0IFtvdXRwdXRTdHJlYW0sIGlucHV0U3RyZWFtc10gb2YgcGlwZUdyb3Vwcy5lbnRyaWVzKCkpIHtcblx0XHRjb25zdCBpbnB1dFN0cmVhbSA9IGlucHV0U3RyZWFtcy5sZW5ndGggPT09IDEgPyBpbnB1dFN0cmVhbXNbMF0gOiBtZXJnZVN0cmVhbXMoaW5wdXRTdHJlYW1zKTtcblx0XHRwaXBlU3RyZWFtcyhpbnB1dFN0cmVhbSwgb3V0cHV0U3RyZWFtKTtcblx0fVxufTtcblxuLy8gV2hlbiB1c2luZyB0cmFuc2Zvcm1zLCBgc3VicHJvY2Vzcy5zdGRpbnxzdGRvdXR8c3RkZXJyfHN0ZGlvYCBpcyBkaXJlY3RseSBtdXRhdGVkXG5jb25zdCBwaXBlVHJhbnNmb3JtID0gKHN1YnByb2Nlc3MsIHN0cmVhbSwgZGlyZWN0aW9uLCBmZE51bWJlcikgPT4ge1xuXHRpZiAoZGlyZWN0aW9uID09PSAnb3V0cHV0Jykge1xuXHRcdHBpcGVTdHJlYW1zKHN1YnByb2Nlc3Muc3RkaW9bZmROdW1iZXJdLCBzdHJlYW0pO1xuXHR9IGVsc2Uge1xuXHRcdHBpcGVTdHJlYW1zKHN0cmVhbSwgc3VicHJvY2Vzcy5zdGRpb1tmZE51bWJlcl0pO1xuXHR9XG5cblx0Y29uc3Qgc3RyZWFtUHJvcGVydHkgPSBTVUJQUk9DRVNTX1NUUkVBTV9QUk9QRVJUSUVTW2ZkTnVtYmVyXTtcblx0aWYgKHN0cmVhbVByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRzdWJwcm9jZXNzW3N0cmVhbVByb3BlcnR5XSA9IHN0cmVhbTtcblx0fVxuXG5cdHN1YnByb2Nlc3Muc3RkaW9bZmROdW1iZXJdID0gc3RyZWFtO1xufTtcblxuY29uc3QgU1VCUFJPQ0VTU19TVFJFQU1fUFJPUEVSVElFUyA9IFsnc3RkaW4nLCAnc3Rkb3V0JywgJ3N0ZGVyciddO1xuXG4vLyBNb3N0IGBzdGQqYCBvcHRpb24gdmFsdWVzIGludm9sdmUgcGlwaW5nIGBzdWJwcm9jZXNzLnN0ZCpgIHRvIGEgc3RyZWFtLlxuLy8gVGhlIHN0cmVhbSBpcyBlaXRoZXIgcGFzc2VkIGJ5IHRoZSB1c2VyIG9yIGNyZWF0ZWQgaW50ZXJuYWxseS5cbmNvbnN0IHBpcGVTdGRpb0l0ZW0gPSAoe3N1YnByb2Nlc3MsIHN0cmVhbSwgZGlyZWN0aW9uLCBmZE51bWJlciwgcGlwZUdyb3VwcywgY29udHJvbGxlcn0pID0+IHtcblx0aWYgKHN0cmVhbSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0c2V0U3RhbmRhcmRTdHJlYW1NYXhMaXN0ZW5lcnMoc3RyZWFtLCBjb250cm9sbGVyKTtcblxuXHRjb25zdCBbaW5wdXRTdHJlYW0sIG91dHB1dFN0cmVhbV0gPSBkaXJlY3Rpb24gPT09ICdvdXRwdXQnXG5cdFx0PyBbc3RyZWFtLCBzdWJwcm9jZXNzLnN0ZGlvW2ZkTnVtYmVyXV1cblx0XHQ6IFtzdWJwcm9jZXNzLnN0ZGlvW2ZkTnVtYmVyXSwgc3RyZWFtXTtcblx0Y29uc3Qgb3V0cHV0U3RyZWFtcyA9IHBpcGVHcm91cHMuZ2V0KGlucHV0U3RyZWFtKSA/PyBbXTtcblx0cGlwZUdyb3Vwcy5zZXQoaW5wdXRTdHJlYW0sIFsuLi5vdXRwdXRTdHJlYW1zLCBvdXRwdXRTdHJlYW1dKTtcbn07XG5cbi8vIE11bHRpcGxlIHN1YnByb2Nlc3NlcyBtaWdodCBiZSBwaXBpbmcgZnJvbS90byBgcHJvY2Vzcy5zdGQqYCBhdCB0aGUgc2FtZSB0aW1lLlxuLy8gVGhpcyBpcyBub3QgbmVjZXNzYXJpbHkgYW4gZXJyb3IgYW5kIHNob3VsZCBub3QgcHJpbnQgYSBgbWF4TGlzdGVuZXJzYCB3YXJuaW5nLlxuY29uc3Qgc2V0U3RhbmRhcmRTdHJlYW1NYXhMaXN0ZW5lcnMgPSAoc3RyZWFtLCB7c2lnbmFsfSkgPT4ge1xuXHRpZiAoaXNTdGFuZGFyZFN0cmVhbShzdHJlYW0pKSB7XG5cdFx0aW5jcmVtZW50TWF4TGlzdGVuZXJzKHN0cmVhbSwgTUFYX0xJU1RFTkVSU19JTkNSRU1FTlQsIHNpZ25hbCk7XG5cdH1cbn07XG5cbi8vIGBzb3VyY2UucGlwZShkZXN0aW5hdGlvbilgIGFkZHMgYXQgbW9zdCAxIGxpc3RlbmVyIGZvciBlYWNoIGV2ZW50LlxuLy8gSWYgYHN0ZGluYCBvcHRpb24gaXMgYW4gYXJyYXksIHRoZSB2YWx1ZXMgbWlnaHQgYmUgY29tYmluZWQgd2l0aCBgbWVyZ2Utc3RyZWFtc2AuXG4vLyBUaGF0IGxpYnJhcnkgYWxzbyBsaXN0ZW5zIGZvciBgc291cmNlYCBlbmQsIHdoaWNoIGFkZHMgMSBtb3JlIGxpc3RlbmVyLlxuY29uc3QgTUFYX0xJU1RFTkVSU19JTkNSRU1FTlQgPSAyO1xuIiwgIi8qKlxuICogVGhpcyBpcyBub3QgdGhlIHNldCBvZiBhbGwgcG9zc2libGUgc2lnbmFscy5cbiAqXG4gKiBJdCBJUywgaG93ZXZlciwgdGhlIHNldCBvZiBhbGwgc2lnbmFscyB0aGF0IHRyaWdnZXJcbiAqIGFuIGV4aXQgb24gZWl0aGVyIExpbnV4IG9yIEJTRCBzeXN0ZW1zLiAgTGludXggaXMgYVxuICogc3VwZXJzZXQgb2YgdGhlIHNpZ25hbCBuYW1lcyBzdXBwb3J0ZWQgb24gQlNELCBhbmRcbiAqIHRoZSB1bmtub3duIHNpZ25hbHMganVzdCBmYWlsIHRvIHJlZ2lzdGVyLCBzbyB3ZSBjYW5cbiAqIGNhdGNoIHRoYXQgZWFzaWx5IGVub3VnaC5cbiAqXG4gKiBXaW5kb3dzIHNpZ25hbHMgYXJlIGEgZGlmZmVyZW50IHNldCwgc2luY2UgdGhlcmUgYXJlXG4gKiBzaWduYWxzIHRoYXQgdGVybWluYXRlIFdpbmRvd3MgcHJvY2Vzc2VzLCBidXQgZG9uJ3RcbiAqIHRlcm1pbmF0ZSAob3IgZG9uJ3QgZXZlbiBleGlzdCkgb24gUG9zaXggc3lzdGVtcy5cbiAqXG4gKiBEb24ndCBib3RoZXIgd2l0aCBTSUdLSUxMLiAgSXQncyB1bmNhdGNoYWJsZSwgd2hpY2hcbiAqIG1lYW5zIHRoYXQgd2UgY2FuJ3QgZmlyZSBhbnkgY2FsbGJhY2tzIGFueXdheS5cbiAqXG4gKiBJZiBhIHVzZXIgZG9lcyBoYXBwZW4gdG8gcmVnaXN0ZXIgYSBoYW5kbGVyIG9uIGEgbm9uLVxuICogZmF0YWwgc2lnbmFsIGxpa2UgU0lHV0lOQ0ggb3Igc29tZXRoaW5nLCBhbmQgdGhlblxuICogZXhpdCwgaXQnbGwgZW5kIHVwIGZpcmluZyBgcHJvY2Vzcy5lbWl0KCdleGl0JylgLCBzb1xuICogdGhlIGhhbmRsZXIgd2lsbCBiZSBmaXJlZCBhbnl3YXkuXG4gKlxuICogU0lHQlVTLCBTSUdGUEUsIFNJR1NFR1YgYW5kIFNJR0lMTCwgd2hlbiBub3QgcmFpc2VkXG4gKiBhcnRpZmljaWFsbHksIGluaGVyZW50bHkgbGVhdmUgdGhlIHByb2Nlc3MgaW4gYVxuICogc3RhdGUgZnJvbSB3aGljaCBpdCBpcyBub3Qgc2FmZSB0byB0cnkgYW5kIGVudGVyIEpTXG4gKiBsaXN0ZW5lcnMuXG4gKi9cbmV4cG9ydCBjb25zdCBzaWduYWxzOiBOb2RlSlMuU2lnbmFsc1tdID0gW11cbnNpZ25hbHMucHVzaCgnU0lHSFVQJywgJ1NJR0lOVCcsICdTSUdURVJNJylcblxuaWYgKHByb2Nlc3MucGxhdGZvcm0gIT09ICd3aW4zMicpIHtcbiAgc2lnbmFscy5wdXNoKFxuICAgICdTSUdBTFJNJyxcbiAgICAnU0lHQUJSVCcsXG4gICAgJ1NJR1ZUQUxSTScsXG4gICAgJ1NJR1hDUFUnLFxuICAgICdTSUdYRlNaJyxcbiAgICAnU0lHVVNSMicsXG4gICAgJ1NJR1RSQVAnLFxuICAgICdTSUdTWVMnLFxuICAgICdTSUdRVUlUJyxcbiAgICAnU0lHSU9UJ1xuICAgIC8vIHNob3VsZCBkZXRlY3QgcHJvZmlsZXIgYW5kIGVuYWJsZS9kaXNhYmxlIGFjY29yZGluZ2x5LlxuICAgIC8vIHNlZSAjMjFcbiAgICAvLyAnU0lHUFJPRidcbiAgKVxufVxuXG5pZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2xpbnV4Jykge1xuICBzaWduYWxzLnB1c2goJ1NJR0lPJywgJ1NJR1BPTEwnLCAnU0lHUFdSJywgJ1NJR1NUS0ZMVCcpXG59XG4iLCAiLy8gTm90ZTogc2luY2UgbnljIHVzZXMgdGhpcyBtb2R1bGUgdG8gb3V0cHV0IGNvdmVyYWdlLCBhbnkgbGluZXNcbi8vIHRoYXQgYXJlIGluIHRoZSBkaXJlY3Qgc3luYyBmbG93IG9mIG55YydzIG91dHB1dENvdmVyYWdlIGFyZVxuLy8gaWdub3JlZCwgc2luY2Ugd2UgY2FuIG5ldmVyIGdldCBjb3ZlcmFnZSBmb3IgdGhlbS5cbi8vIGdyYWIgYSByZWZlcmVuY2UgdG8gbm9kZSdzIHJlYWwgcHJvY2VzcyBvYmplY3QgcmlnaHQgYXdheVxuaW1wb3J0IHsgc2lnbmFscyB9IGZyb20gJy4vc2lnbmFscy5qcydcbmV4cG9ydCB7IHNpZ25hbHMgfVxuXG4vLyBqdXN0IGEgbG9vc2VuZWQgcHJvY2VzcyB0eXBlIHNvIHdlIGNhbiBkbyBzb21lIGV2aWwgdGhpbmdzXG50eXBlIFByb2Nlc3NSRSA9IE5vZGVKUy5Qcm9jZXNzICYge1xuICByZWFsbHlFeGl0OiAoY29kZT86IG51bWJlciB8IHVuZGVmaW5lZCB8IG51bGwpID0+IGFueVxuICBlbWl0OiAoZXY6IHN0cmluZywgLi4uYTogYW55W10pID0+IGFueVxufVxuXG5jb25zdCBwcm9jZXNzT2sgPSAocHJvY2VzczogYW55KTogcHJvY2VzcyBpcyBQcm9jZXNzUkUgPT5cbiAgISFwcm9jZXNzICYmXG4gIHR5cGVvZiBwcm9jZXNzID09PSAnb2JqZWN0JyAmJlxuICB0eXBlb2YgcHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJyAmJlxuICB0eXBlb2YgcHJvY2Vzcy5lbWl0ID09PSAnZnVuY3Rpb24nICYmXG4gIHR5cGVvZiBwcm9jZXNzLnJlYWxseUV4aXQgPT09ICdmdW5jdGlvbicgJiZcbiAgdHlwZW9mIHByb2Nlc3MubGlzdGVuZXJzID09PSAnZnVuY3Rpb24nICYmXG4gIHR5cGVvZiBwcm9jZXNzLmtpbGwgPT09ICdmdW5jdGlvbicgJiZcbiAgdHlwZW9mIHByb2Nlc3MucGlkID09PSAnbnVtYmVyJyAmJlxuICB0eXBlb2YgcHJvY2Vzcy5vbiA9PT0gJ2Z1bmN0aW9uJ1xuXG5jb25zdCBrRXhpdEVtaXR0ZXIgPSBTeW1ib2wuZm9yKCdzaWduYWwtZXhpdCBlbWl0dGVyJylcbmNvbnN0IGdsb2JhbDogdHlwZW9mIGdsb2JhbFRoaXMgJiB7IFtrRXhpdEVtaXR0ZXJdPzogRW1pdHRlciB9ID0gZ2xvYmFsVGhpc1xuY29uc3QgT2JqZWN0RGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkuYmluZChPYmplY3QpXG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IHRha2VzIGFuIGV4aXQgY29kZSBhbmQgc2lnbmFsIGFzIGFyZ3VtZW50c1xuICpcbiAqIEluIHRoZSBjYXNlIG9mIHNpZ25hbCBleGl0cyAqb25seSosIGEgcmV0dXJuIHZhbHVlIG9mIHRydWVcbiAqIHdpbGwgaW5kaWNhdGUgdGhhdCB0aGUgc2lnbmFsIGlzIGJlaW5nIGhhbmRsZWQsIGFuZCB3ZSBzaG91bGRcbiAqIG5vdCBzeW50aGV0aWNhbGx5IGV4aXQgd2l0aCB0aGUgc2lnbmFsIHdlIHJlY2VpdmVkLiBSZWdhcmRsZXNzXG4gKiBvZiB0aGUgaGFuZGxlciByZXR1cm4gdmFsdWUsIHRoZSBoYW5kbGVyIGlzIHVubG9hZGVkIHdoZW4gYW5cbiAqIG90aGVyd2lzZSBmYXRhbCBzaWduYWwgaXMgcmVjZWl2ZWQsIHNvIHlvdSBnZXQgZXhhY3RseSAxIHNob3RcbiAqIGF0IGl0LCB1bmxlc3MgeW91IGFkZCBhbm90aGVyIG9uRXhpdCBoYW5kbGVyIGF0IHRoYXQgcG9pbnQuXG4gKlxuICogSW4gdGhlIGNhc2Ugb2YgbnVtZXJpYyBjb2RlIGV4aXRzLCB3ZSBtYXkgYWxyZWFkeSBoYXZlIGNvbW1pdHRlZFxuICogdG8gZXhpdGluZyB0aGUgcHJvY2VzcywgZm9yIGV4YW1wbGUgdmlhIGEgZmF0YWwgZXhjZXB0aW9uIG9yXG4gKiB1bmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24sIHNvIGl0IGlzIGltcG9zc2libGUgdG8gc3RvcCBzYWZlbHkuXG4gKi9cbmV4cG9ydCB0eXBlIEhhbmRsZXIgPSAoXG4gIGNvZGU6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQsXG4gIHNpZ25hbDogTm9kZUpTLlNpZ25hbHMgfCBudWxsXG4pID0+IHRydWUgfCB2b2lkXG50eXBlIEV4aXRFdmVudCA9ICdhZnRlckV4aXQnIHwgJ2V4aXQnXG50eXBlIEVtaXR0ZWQgPSB7IFtrIGluIEV4aXRFdmVudF06IGJvb2xlYW4gfVxudHlwZSBMaXN0ZW5lcnMgPSB7IFtrIGluIEV4aXRFdmVudF06IEhhbmRsZXJbXSB9XG5cbi8vIHRlZW55IHNwZWNpYWwgcHVycG9zZSBlZVxuY2xhc3MgRW1pdHRlciB7XG4gIGVtaXR0ZWQ6IEVtaXR0ZWQgPSB7XG4gICAgYWZ0ZXJFeGl0OiBmYWxzZSxcbiAgICBleGl0OiBmYWxzZSxcbiAgfVxuXG4gIGxpc3RlbmVyczogTGlzdGVuZXJzID0ge1xuICAgIGFmdGVyRXhpdDogW10sXG4gICAgZXhpdDogW10sXG4gIH1cblxuICBjb3VudDogbnVtYmVyID0gMFxuICBpZDogbnVtYmVyID0gTWF0aC5yYW5kb20oKVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmIChnbG9iYWxba0V4aXRFbWl0dGVyXSkge1xuICAgICAgcmV0dXJuIGdsb2JhbFtrRXhpdEVtaXR0ZXJdXG4gICAgfVxuICAgIE9iamVjdERlZmluZVByb3BlcnR5KGdsb2JhbCwga0V4aXRFbWl0dGVyLCB7XG4gICAgICB2YWx1ZTogdGhpcyxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICB9KVxuICB9XG5cbiAgb24oZXY6IEV4aXRFdmVudCwgZm46IEhhbmRsZXIpIHtcbiAgICB0aGlzLmxpc3RlbmVyc1tldl0ucHVzaChmbilcbiAgfVxuXG4gIHJlbW92ZUxpc3RlbmVyKGV2OiBFeGl0RXZlbnQsIGZuOiBIYW5kbGVyKSB7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMubGlzdGVuZXJzW2V2XVxuICAgIGNvbnN0IGkgPSBsaXN0LmluZGV4T2YoZm4pXG4gICAgLyogYzggaWdub3JlIHN0YXJ0ICovXG4gICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgLyogYzggaWdub3JlIHN0b3AgKi9cbiAgICBpZiAoaSA9PT0gMCAmJiBsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwXG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKGksIDEpXG4gICAgfVxuICB9XG5cbiAgZW1pdChcbiAgICBldjogRXhpdEV2ZW50LFxuICAgIGNvZGU6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgc2lnbmFsOiBOb2RlSlMuU2lnbmFscyB8IG51bGxcbiAgKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZW1pdHRlZFtldl0pIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICB0aGlzLmVtaXR0ZWRbZXZdID0gdHJ1ZVxuICAgIGxldCByZXQ6IGJvb2xlYW4gPSBmYWxzZVxuICAgIGZvciAoY29uc3QgZm4gb2YgdGhpcy5saXN0ZW5lcnNbZXZdKSB7XG4gICAgICByZXQgPSBmbihjb2RlLCBzaWduYWwpID09PSB0cnVlIHx8IHJldFxuICAgIH1cbiAgICBpZiAoZXYgPT09ICdleGl0Jykge1xuICAgICAgcmV0ID0gdGhpcy5lbWl0KCdhZnRlckV4aXQnLCBjb2RlLCBzaWduYWwpIHx8IHJldFxuICAgIH1cbiAgICByZXR1cm4gcmV0XG4gIH1cbn1cblxuYWJzdHJhY3QgY2xhc3MgU2lnbmFsRXhpdEJhc2Uge1xuICBhYnN0cmFjdCBvbkV4aXQoY2I6IEhhbmRsZXIsIG9wdHM/OiB7IGFsd2F5c0xhc3Q/OiBib29sZWFuIH0pOiAoKSA9PiB2b2lkXG4gIGFic3RyYWN0IGxvYWQoKTogdm9pZFxuICBhYnN0cmFjdCB1bmxvYWQoKTogdm9pZFxufVxuXG5jb25zdCBzaWduYWxFeGl0V3JhcCA9IDxUIGV4dGVuZHMgU2lnbmFsRXhpdEJhc2U+KGhhbmRsZXI6IFQpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkV4aXQoY2I6IEhhbmRsZXIsIG9wdHM/OiB7IGFsd2F5c0xhc3Q/OiBib29sZWFuIH0pIHtcbiAgICAgIHJldHVybiBoYW5kbGVyLm9uRXhpdChjYiwgb3B0cylcbiAgICB9LFxuICAgIGxvYWQoKSB7XG4gICAgICByZXR1cm4gaGFuZGxlci5sb2FkKClcbiAgICB9LFxuICAgIHVubG9hZCgpIHtcbiAgICAgIHJldHVybiBoYW5kbGVyLnVubG9hZCgpXG4gICAgfSxcbiAgfVxufVxuXG5jbGFzcyBTaWduYWxFeGl0RmFsbGJhY2sgZXh0ZW5kcyBTaWduYWxFeGl0QmFzZSB7XG4gIG9uRXhpdCgpIHtcbiAgICByZXR1cm4gKCkgPT4ge31cbiAgfVxuICBsb2FkKCkge31cbiAgdW5sb2FkKCkge31cbn1cblxuY2xhc3MgU2lnbmFsRXhpdCBleHRlbmRzIFNpZ25hbEV4aXRCYXNlIHtcbiAgLy8gXCJTSUdIVVBcIiB0aHJvd3MgYW4gYEVOT1NZU2AgZXJyb3Igb24gV2luZG93cyxcbiAgLy8gc28gdXNlIGEgc3VwcG9ydGVkIHNpZ25hbCBpbnN0ZWFkXG4gIC8qIGM4IGlnbm9yZSBzdGFydCAqL1xuICAjaHVwU2lnID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJyA/ICdTSUdJTlQnIDogJ1NJR0hVUCdcbiAgLyogYzggaWdub3JlIHN0b3AgKi9cbiAgI2VtaXR0ZXIgPSBuZXcgRW1pdHRlcigpXG4gICNwcm9jZXNzOiBQcm9jZXNzUkVcbiAgI29yaWdpbmFsUHJvY2Vzc0VtaXQ6IFByb2Nlc3NSRVsnZW1pdCddXG4gICNvcmlnaW5hbFByb2Nlc3NSZWFsbHlFeGl0OiBQcm9jZXNzUkVbJ3JlYWxseUV4aXQnXVxuXG4gICNzaWdMaXN0ZW5lcnM6IHsgW2sgaW4gTm9kZUpTLlNpZ25hbHNdPzogKCkgPT4gdm9pZCB9ID0ge31cbiAgI2xvYWRlZDogYm9vbGVhbiA9IGZhbHNlXG5cbiAgY29uc3RydWN0b3IocHJvY2VzczogUHJvY2Vzc1JFKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuI3Byb2Nlc3MgPSBwcm9jZXNzXG4gICAgLy8geyA8c2lnbmFsPjogPGxpc3RlbmVyIGZuPiwgLi4uIH1cbiAgICB0aGlzLiNzaWdMaXN0ZW5lcnMgPSB7fVxuICAgIGZvciAoY29uc3Qgc2lnIG9mIHNpZ25hbHMpIHtcbiAgICAgIHRoaXMuI3NpZ0xpc3RlbmVyc1tzaWddID0gKCkgPT4ge1xuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gb3RoZXIgbGlzdGVuZXJzLCBhbiBleGl0IGlzIGNvbWluZyFcbiAgICAgICAgLy8gU2ltcGxlc3Qgd2F5OiByZW1vdmUgdXMgYW5kIHRoZW4gcmUtc2VuZCB0aGUgc2lnbmFsLlxuICAgICAgICAvLyBXZSBrbm93IHRoYXQgdGhpcyB3aWxsIGtpbGwgdGhlIHByb2Nlc3MsIHNvIHdlIGNhblxuICAgICAgICAvLyBzYWZlbHkgZW1pdCBub3cuXG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuI3Byb2Nlc3MubGlzdGVuZXJzKHNpZylcbiAgICAgICAgbGV0IHsgY291bnQgfSA9IHRoaXMuI2VtaXR0ZXJcbiAgICAgICAgLy8gVGhpcyBpcyBhIHdvcmthcm91bmQgZm9yIHRoZSBmYWN0IHRoYXQgc2lnbmFsLWV4aXQgdjMgYW5kIHNpZ25hbFxuICAgICAgICAvLyBleGl0IHY0IGFyZSBub3QgYXdhcmUgb2YgZWFjaCBvdGhlciwgYW5kIGVhY2ggd2lsbCBhdHRlbXB0IHRvIGxldFxuICAgICAgICAvLyB0aGUgb3RoZXIgaGFuZGxlIGl0LCBzbyBuZWl0aGVyIG9mIHRoZW0gZG8uIFRvIGNvcnJlY3QgdGhpcywgd2VcbiAgICAgICAgLy8gZGV0ZWN0IGlmIHdlJ3JlIHRoZSBvbmx5IGhhbmRsZXIgKmV4Y2VwdCogZm9yIHByZXZpb3VzIHZlcnNpb25zXG4gICAgICAgIC8vIG9mIHNpZ25hbC1leGl0LCBhbmQgaW5jcmVtZW50IGJ5IHRoZSBjb3VudCBvZiBsaXN0ZW5lcnMgaXQgaGFzXG4gICAgICAgIC8vIGNyZWF0ZWQuXG4gICAgICAgIC8qIGM4IGlnbm9yZSBzdGFydCAqL1xuICAgICAgICBjb25zdCBwID0gcHJvY2VzcyBhcyB1bmtub3duIGFzIHtcbiAgICAgICAgICBfX3NpZ25hbF9leGl0X2VtaXR0ZXJfXz86IHsgY291bnQ6IG51bWJlciB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHR5cGVvZiBwLl9fc2lnbmFsX2V4aXRfZW1pdHRlcl9fID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgIHR5cGVvZiBwLl9fc2lnbmFsX2V4aXRfZW1pdHRlcl9fLmNvdW50ID09PSAnbnVtYmVyJ1xuICAgICAgICApIHtcbiAgICAgICAgICBjb3VudCArPSBwLl9fc2lnbmFsX2V4aXRfZW1pdHRlcl9fLmNvdW50XG4gICAgICAgIH1cbiAgICAgICAgLyogYzggaWdub3JlIHN0b3AgKi9cbiAgICAgICAgaWYgKGxpc3RlbmVycy5sZW5ndGggPT09IGNvdW50KSB7XG4gICAgICAgICAgdGhpcy51bmxvYWQoKVxuICAgICAgICAgIGNvbnN0IHJldCA9IHRoaXMuI2VtaXR0ZXIuZW1pdCgnZXhpdCcsIG51bGwsIHNpZylcbiAgICAgICAgICAvKiBjOCBpZ25vcmUgc3RhcnQgKi9cbiAgICAgICAgICBjb25zdCBzID0gc2lnID09PSAnU0lHSFVQJyA/IHRoaXMuI2h1cFNpZyA6IHNpZ1xuICAgICAgICAgIGlmICghcmV0KSBwcm9jZXNzLmtpbGwocHJvY2Vzcy5waWQsIHMpXG4gICAgICAgICAgLyogYzggaWdub3JlIHN0b3AgKi9cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuI29yaWdpbmFsUHJvY2Vzc1JlYWxseUV4aXQgPSBwcm9jZXNzLnJlYWxseUV4aXRcbiAgICB0aGlzLiNvcmlnaW5hbFByb2Nlc3NFbWl0ID0gcHJvY2Vzcy5lbWl0XG4gIH1cblxuICBvbkV4aXQoY2I6IEhhbmRsZXIsIG9wdHM/OiB7IGFsd2F5c0xhc3Q/OiBib29sZWFuIH0pIHtcbiAgICAvKiBjOCBpZ25vcmUgc3RhcnQgKi9cbiAgICBpZiAoIXByb2Nlc3NPayh0aGlzLiNwcm9jZXNzKSkge1xuICAgICAgcmV0dXJuICgpID0+IHt9XG4gICAgfVxuICAgIC8qIGM4IGlnbm9yZSBzdG9wICovXG5cbiAgICBpZiAodGhpcy4jbG9hZGVkID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5sb2FkKClcbiAgICB9XG5cbiAgICBjb25zdCBldiA9IG9wdHM/LmFsd2F5c0xhc3QgPyAnYWZ0ZXJFeGl0JyA6ICdleGl0J1xuICAgIHRoaXMuI2VtaXR0ZXIub24oZXYsIGNiKVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB0aGlzLiNlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKGV2LCBjYilcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy4jZW1pdHRlci5saXN0ZW5lcnNbJ2V4aXQnXS5sZW5ndGggPT09IDAgJiZcbiAgICAgICAgdGhpcy4jZW1pdHRlci5saXN0ZW5lcnNbJ2FmdGVyRXhpdCddLmxlbmd0aCA9PT0gMFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMudW5sb2FkKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsb2FkKCkge1xuICAgIGlmICh0aGlzLiNsb2FkZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLiNsb2FkZWQgPSB0cnVlXG5cbiAgICAvLyBUaGlzIGlzIHRoZSBudW1iZXIgb2Ygb25TaWduYWxFeGl0J3MgdGhhdCBhcmUgaW4gcGxheS5cbiAgICAvLyBJdCdzIGltcG9ydGFudCBzbyB0aGF0IHdlIGNhbiBjb3VudCB0aGUgY29ycmVjdCBudW1iZXIgb2ZcbiAgICAvLyBsaXN0ZW5lcnMgb24gc2lnbmFscywgYW5kIGRvbid0IHdhaXQgZm9yIHRoZSBvdGhlciBvbmUgdG9cbiAgICAvLyBoYW5kbGUgaXQgaW5zdGVhZCBvZiB1cy5cbiAgICB0aGlzLiNlbWl0dGVyLmNvdW50ICs9IDFcblxuICAgIGZvciAoY29uc3Qgc2lnIG9mIHNpZ25hbHMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGZuID0gdGhpcy4jc2lnTGlzdGVuZXJzW3NpZ11cbiAgICAgICAgaWYgKGZuKSB0aGlzLiNwcm9jZXNzLm9uKHNpZywgZm4pXG4gICAgICB9IGNhdGNoIChfKSB7fVxuICAgIH1cblxuICAgIHRoaXMuI3Byb2Nlc3MuZW1pdCA9IChldjogc3RyaW5nLCAuLi5hOiBhbnlbXSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuI3Byb2Nlc3NFbWl0KGV2LCAuLi5hKVxuICAgIH1cbiAgICB0aGlzLiNwcm9jZXNzLnJlYWxseUV4aXQgPSAoY29kZT86IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLiNwcm9jZXNzUmVhbGx5RXhpdChjb2RlKVxuICAgIH1cbiAgfVxuXG4gIHVubG9hZCgpIHtcbiAgICBpZiAoIXRoaXMuI2xvYWRlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuI2xvYWRlZCA9IGZhbHNlXG5cbiAgICBzaWduYWxzLmZvckVhY2goc2lnID0+IHtcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gdGhpcy4jc2lnTGlzdGVuZXJzW3NpZ11cbiAgICAgIC8qIGM4IGlnbm9yZSBzdGFydCAqL1xuICAgICAgaWYgKCFsaXN0ZW5lcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpc3RlbmVyIG5vdCBkZWZpbmVkIGZvciBzaWduYWw6ICcgKyBzaWcpXG4gICAgICB9XG4gICAgICAvKiBjOCBpZ25vcmUgc3RvcCAqL1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy4jcHJvY2Vzcy5yZW1vdmVMaXN0ZW5lcihzaWcsIGxpc3RlbmVyKVxuICAgICAgICAvKiBjOCBpZ25vcmUgc3RhcnQgKi9cbiAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICAvKiBjOCBpZ25vcmUgc3RvcCAqL1xuICAgIH0pXG4gICAgdGhpcy4jcHJvY2Vzcy5lbWl0ID0gdGhpcy4jb3JpZ2luYWxQcm9jZXNzRW1pdFxuICAgIHRoaXMuI3Byb2Nlc3MucmVhbGx5RXhpdCA9IHRoaXMuI29yaWdpbmFsUHJvY2Vzc1JlYWxseUV4aXRcbiAgICB0aGlzLiNlbWl0dGVyLmNvdW50IC09IDFcbiAgfVxuXG4gICNwcm9jZXNzUmVhbGx5RXhpdChjb2RlPzogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCkge1xuICAgIC8qIGM4IGlnbm9yZSBzdGFydCAqL1xuICAgIGlmICghcHJvY2Vzc09rKHRoaXMuI3Byb2Nlc3MpKSB7XG4gICAgICByZXR1cm4gMFxuICAgIH1cbiAgICB0aGlzLiNwcm9jZXNzLmV4aXRDb2RlID0gY29kZSB8fCAwXG4gICAgLyogYzggaWdub3JlIHN0b3AgKi9cblxuICAgIHRoaXMuI2VtaXR0ZXIuZW1pdCgnZXhpdCcsIHRoaXMuI3Byb2Nlc3MuZXhpdENvZGUsIG51bGwpXG4gICAgcmV0dXJuIHRoaXMuI29yaWdpbmFsUHJvY2Vzc1JlYWxseUV4aXQuY2FsbChcbiAgICAgIHRoaXMuI3Byb2Nlc3MsXG4gICAgICB0aGlzLiNwcm9jZXNzLmV4aXRDb2RlXG4gICAgKVxuICB9XG5cbiAgI3Byb2Nlc3NFbWl0KGV2OiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogYW55IHtcbiAgICBjb25zdCBvZyA9IHRoaXMuI29yaWdpbmFsUHJvY2Vzc0VtaXRcbiAgICBpZiAoZXYgPT09ICdleGl0JyAmJiBwcm9jZXNzT2sodGhpcy4jcHJvY2VzcykpIHtcbiAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhpcy4jcHJvY2Vzcy5leGl0Q29kZSA9IGFyZ3NbMF1cbiAgICAgICAgLyogYzggaWdub3JlIHN0YXJ0ICovXG4gICAgICB9XG4gICAgICAvKiBjOCBpZ25vcmUgc3RhcnQgKi9cbiAgICAgIGNvbnN0IHJldCA9IG9nLmNhbGwodGhpcy4jcHJvY2VzcywgZXYsIC4uLmFyZ3MpXG4gICAgICAvKiBjOCBpZ25vcmUgc3RhcnQgKi9cbiAgICAgIHRoaXMuI2VtaXR0ZXIuZW1pdCgnZXhpdCcsIHRoaXMuI3Byb2Nlc3MuZXhpdENvZGUsIG51bGwpXG4gICAgICAvKiBjOCBpZ25vcmUgc3RvcCAqL1xuICAgICAgcmV0dXJuIHJldFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2cuY2FsbCh0aGlzLiNwcm9jZXNzLCBldiwgLi4uYXJncylcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgcHJvY2VzcyA9IGdsb2JhbFRoaXMucHJvY2Vzc1xuLy8gd3JhcCBzbyB0aGF0IHdlIGNhbGwgdGhlIG1ldGhvZCBvbiB0aGUgYWN0dWFsIGhhbmRsZXIsIHdpdGhvdXRcbi8vIGV4cG9ydGluZyBpdCBkaXJlY3RseS5cbmV4cG9ydCBjb25zdCB7XG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgcHJvY2VzcyBpcyBleGl0aW5nLCB3aGV0aGVyIHZpYSBzaWduYWwsIGV4cGxpY2l0XG4gICAqIGV4aXQsIG9yIHJ1bm5pbmcgb3V0IG9mIHN0dWZmIHRvIGRvLlxuICAgKlxuICAgKiBJZiB0aGUgZ2xvYmFsIHByb2Nlc3Mgb2JqZWN0IGlzIG5vdCBzdWl0YWJsZSBmb3IgaW5zdHJ1bWVudGF0aW9uLFxuICAgKiB0aGVuIHRoaXMgd2lsbCBiZSBhIG5vLW9wLlxuICAgKlxuICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBtYXkgYmUgdXNlZCB0byB1bmxvYWQgc2lnbmFsLWV4aXQuXG4gICAqL1xuICBvbkV4aXQsXG5cbiAgLyoqXG4gICAqIExvYWQgdGhlIGxpc3RlbmVycy4gIExpa2VseSB5b3UgbmV2ZXIgbmVlZCB0byBjYWxsIHRoaXMsIHVubGVzc1xuICAgKiBkb2luZyBhIHJhdGhlciBkZWVwIGludGVncmF0aW9uIHdpdGggc2lnbmFsLWV4aXQgZnVuY3Rpb25hbGl0eS5cbiAgICogTW9zdGx5IGV4cG9zZWQgZm9yIHRoZSBiZW5lZml0IG9mIHRlc3RpbmcuXG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgbG9hZCxcblxuICAvKipcbiAgICogVW5sb2FkIHRoZSBsaXN0ZW5lcnMuICBMaWtlbHkgeW91IG5ldmVyIG5lZWQgdG8gY2FsbCB0aGlzLCB1bmxlc3NcbiAgICogZG9pbmcgYSByYXRoZXIgZGVlcCBpbnRlZ3JhdGlvbiB3aXRoIHNpZ25hbC1leGl0IGZ1bmN0aW9uYWxpdHkuXG4gICAqIE1vc3RseSBleHBvc2VkIGZvciB0aGUgYmVuZWZpdCBvZiB0ZXN0aW5nLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHVubG9hZCxcbn0gPSBzaWduYWxFeGl0V3JhcChcbiAgcHJvY2Vzc09rKHByb2Nlc3MpID8gbmV3IFNpZ25hbEV4aXQocHJvY2VzcykgOiBuZXcgU2lnbmFsRXhpdEZhbGxiYWNrKClcbilcbiIsICJpbXBvcnQge2FkZEFib3J0TGlzdGVuZXJ9IGZyb20gJ25vZGU6ZXZlbnRzJztcbmltcG9ydCB7b25FeGl0fSBmcm9tICdzaWduYWwtZXhpdCc7XG5cbi8vIElmIHRoZSBgY2xlYW51cGAgb3B0aW9uIGlzIHVzZWQsIGNhbGwgYHN1YnByb2Nlc3Mua2lsbCgpYCB3aGVuIHRoZSBwYXJlbnQgcHJvY2VzcyBleGl0c1xuZXhwb3J0IGNvbnN0IGNsZWFudXBPbkV4aXQgPSAoc3VicHJvY2Vzcywge2NsZWFudXAsIGRldGFjaGVkfSwge3NpZ25hbH0pID0+IHtcblx0aWYgKCFjbGVhbnVwIHx8IGRldGFjaGVkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgcmVtb3ZlRXhpdEhhbmRsZXIgPSBvbkV4aXQoKCkgPT4ge1xuXHRcdHN1YnByb2Nlc3Mua2lsbCgpO1xuXHR9KTtcblx0YWRkQWJvcnRMaXN0ZW5lcihzaWduYWwsICgpID0+IHtcblx0XHRyZW1vdmVFeGl0SGFuZGxlcigpO1xuXHR9KTtcbn07XG4iLCAiaW1wb3J0IHtub3JtYWxpemVQYXJhbWV0ZXJzfSBmcm9tICcuLi9tZXRob2RzL3BhcmFtZXRlcnMuanMnO1xuaW1wb3J0IHtnZXRTdGFydFRpbWV9IGZyb20gJy4uL3JldHVybi9kdXJhdGlvbi5qcyc7XG5pbXBvcnQge1NVQlBST0NFU1NfT1BUSU9OUywgZ2V0VG9TdHJlYW0sIGdldEZyb21TdHJlYW19IGZyb20gJy4uL2FyZ3VtZW50cy9mZC1vcHRpb25zLmpzJztcbmltcG9ydCB7aXNEZW5vRXhlY1BhdGh9IGZyb20gJy4uL2FyZ3VtZW50cy9maWxlLXVybC5qcyc7XG5cbi8vIE5vcm1hbGl6ZSBhbmQgdmFsaWRhdGUgYXJndW1lbnRzIHBhc3NlZCB0byBgc291cmNlLnBpcGUoZGVzdGluYXRpb24pYFxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVBpcGVBcmd1bWVudHMgPSAoe3NvdXJjZSwgc291cmNlUHJvbWlzZSwgYm91bmRPcHRpb25zLCBjcmVhdGVOZXN0ZWR9LCAuLi5waXBlQXJndW1lbnRzKSA9PiB7XG5cdGNvbnN0IHN0YXJ0VGltZSA9IGdldFN0YXJ0VGltZSgpO1xuXHRjb25zdCB7XG5cdFx0ZGVzdGluYXRpb24sXG5cdFx0ZGVzdGluYXRpb25TdHJlYW0sXG5cdFx0ZGVzdGluYXRpb25FcnJvcixcblx0XHRmcm9tLFxuXHRcdHVucGlwZVNpZ25hbCxcblx0fSA9IGdldERlc3RpbmF0aW9uU3RyZWFtKGJvdW5kT3B0aW9ucywgY3JlYXRlTmVzdGVkLCBwaXBlQXJndW1lbnRzKTtcblx0Y29uc3Qge3NvdXJjZVN0cmVhbSwgc291cmNlRXJyb3J9ID0gZ2V0U291cmNlU3RyZWFtKHNvdXJjZSwgZnJvbSk7XG5cdGNvbnN0IHtvcHRpb25zOiBzb3VyY2VPcHRpb25zLCBmaWxlRGVzY3JpcHRvcnN9ID0gU1VCUFJPQ0VTU19PUFRJT05TLmdldChzb3VyY2UpO1xuXHRyZXR1cm4ge1xuXHRcdHNvdXJjZVByb21pc2UsXG5cdFx0c291cmNlU3RyZWFtLFxuXHRcdHNvdXJjZU9wdGlvbnMsXG5cdFx0c291cmNlRXJyb3IsXG5cdFx0ZGVzdGluYXRpb24sXG5cdFx0ZGVzdGluYXRpb25TdHJlYW0sXG5cdFx0ZGVzdGluYXRpb25FcnJvcixcblx0XHR1bnBpcGVTaWduYWwsXG5cdFx0ZmlsZURlc2NyaXB0b3JzLFxuXHRcdHN0YXJ0VGltZSxcblx0fTtcbn07XG5cbmNvbnN0IGdldERlc3RpbmF0aW9uU3RyZWFtID0gKGJvdW5kT3B0aW9ucywgY3JlYXRlTmVzdGVkLCBwaXBlQXJndW1lbnRzKSA9PiB7XG5cdHRyeSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0ZGVzdGluYXRpb24sXG5cdFx0XHRwaXBlT3B0aW9uczoge2Zyb20sIHRvLCB1bnBpcGVTaWduYWx9ID0ge30sXG5cdFx0fSA9IGdldERlc3RpbmF0aW9uKGJvdW5kT3B0aW9ucywgY3JlYXRlTmVzdGVkLCAuLi5waXBlQXJndW1lbnRzKTtcblx0XHRjb25zdCBkZXN0aW5hdGlvblN0cmVhbSA9IGdldFRvU3RyZWFtKGRlc3RpbmF0aW9uLCB0byk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRlc3RpbmF0aW9uLFxuXHRcdFx0ZGVzdGluYXRpb25TdHJlYW0sXG5cdFx0XHRmcm9tLFxuXHRcdFx0dW5waXBlU2lnbmFsLFxuXHRcdH07XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0cmV0dXJuIHtkZXN0aW5hdGlvbkVycm9yOiBlcnJvcn07XG5cdH1cbn07XG5cbi8vIFBpcGluZyBzdWJwcm9jZXNzZXMgY2FuIHVzZSB0aHJlZSBzeW50YXhlczpcbi8vICAtIHNvdXJjZS5waXBlKCdjb21tYW5kJywgY29tbWFuZEFyZ3VtZW50cywgcGlwZU9wdGlvbnNPckRlc3RpbmF0aW9uT3B0aW9ucylcbi8vICAtIHNvdXJjZS5waXBlYGNvbW1hbmQgY29tbWFuZEFyZ3VtZW50YCBvciBzb3VyY2UucGlwZShwaXBlT3B0aW9uc09yRGVzdGluYXRpb25PcHRpb25zKWBjb21tYW5kIGNvbW1hbmRBcmd1bWVudGBcbi8vICAtIHNvdXJjZS5waXBlKGV4ZWNhKC4uLiksIHBpcGVPcHRpb25zKVxuY29uc3QgZ2V0RGVzdGluYXRpb24gPSAoYm91bmRPcHRpb25zLCBjcmVhdGVOZXN0ZWQsIGZpcnN0QXJndW1lbnQsIC4uLnBpcGVBcmd1bWVudHMpID0+IHtcblx0aWYgKEFycmF5LmlzQXJyYXkoZmlyc3RBcmd1bWVudCkpIHtcblx0XHRjb25zdCBkZXN0aW5hdGlvbiA9IGNyZWF0ZU5lc3RlZChtYXBEZXN0aW5hdGlvbkFyZ3VtZW50cywgYm91bmRPcHRpb25zKShmaXJzdEFyZ3VtZW50LCAuLi5waXBlQXJndW1lbnRzKTtcblx0XHRyZXR1cm4ge2Rlc3RpbmF0aW9uLCBwaXBlT3B0aW9uczogYm91bmRPcHRpb25zfTtcblx0fVxuXG5cdGlmICh0eXBlb2YgZmlyc3RBcmd1bWVudCA9PT0gJ3N0cmluZycgfHwgZmlyc3RBcmd1bWVudCBpbnN0YW5jZW9mIFVSTCB8fCBpc0Rlbm9FeGVjUGF0aChmaXJzdEFyZ3VtZW50KSkge1xuXHRcdGlmIChPYmplY3Qua2V5cyhib3VuZE9wdGlvbnMpLmxlbmd0aCA+IDApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1BsZWFzZSB1c2UgLnBpcGUoXCJmaWxlXCIsIC4uLiwgb3B0aW9ucykgb3IgLnBpcGUoZXhlY2EoXCJmaWxlXCIsIC4uLiwgb3B0aW9ucykpIGluc3RlYWQgb2YgLnBpcGUob3B0aW9ucykoXCJmaWxlXCIsIC4uLikuJyk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgW3Jhd0ZpbGUsIHJhd0FyZ3VtZW50cywgcmF3T3B0aW9uc10gPSBub3JtYWxpemVQYXJhbWV0ZXJzKGZpcnN0QXJndW1lbnQsIC4uLnBpcGVBcmd1bWVudHMpO1xuXHRcdGNvbnN0IGRlc3RpbmF0aW9uID0gY3JlYXRlTmVzdGVkKG1hcERlc3RpbmF0aW9uQXJndW1lbnRzKShyYXdGaWxlLCByYXdBcmd1bWVudHMsIHJhd09wdGlvbnMpO1xuXHRcdHJldHVybiB7ZGVzdGluYXRpb24sIHBpcGVPcHRpb25zOiByYXdPcHRpb25zfTtcblx0fVxuXG5cdGlmIChTVUJQUk9DRVNTX09QVElPTlMuaGFzKGZpcnN0QXJndW1lbnQpKSB7XG5cdFx0aWYgKE9iamVjdC5rZXlzKGJvdW5kT3B0aW9ucykubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignUGxlYXNlIHVzZSAucGlwZShvcHRpb25zKWBjb21tYW5kYCBvciAucGlwZSgkKG9wdGlvbnMpYGNvbW1hbmRgKSBpbnN0ZWFkIG9mIC5waXBlKG9wdGlvbnMpKCRgY29tbWFuZGApLicpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7ZGVzdGluYXRpb246IGZpcnN0QXJndW1lbnQsIHBpcGVPcHRpb25zOiBwaXBlQXJndW1lbnRzWzBdfTtcblx0fVxuXG5cdHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgdGVtcGxhdGUgc3RyaW5nLCBhbiBvcHRpb25zIG9iamVjdCwgb3IgYW4gRXhlY2Egc3VicHJvY2VzczogJHtmaXJzdEFyZ3VtZW50fWApO1xufTtcblxuLy8gRm9yY2UgYHN0ZGluOiAncGlwZSdgIHdpdGggdGhlIGRlc3RpbmF0aW9uIHN1YnByb2Nlc3NcbmNvbnN0IG1hcERlc3RpbmF0aW9uQXJndW1lbnRzID0gKHtvcHRpb25zfSkgPT4gKHtvcHRpb25zOiB7Li4ub3B0aW9ucywgc3RkaW46ICdwaXBlJywgcGlwZWQ6IHRydWV9fSk7XG5cbmNvbnN0IGdldFNvdXJjZVN0cmVhbSA9IChzb3VyY2UsIGZyb20pID0+IHtcblx0dHJ5IHtcblx0XHRjb25zdCBzb3VyY2VTdHJlYW0gPSBnZXRGcm9tU3RyZWFtKHNvdXJjZSwgZnJvbSk7XG5cdFx0cmV0dXJuIHtzb3VyY2VTdHJlYW19O1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHJldHVybiB7c291cmNlRXJyb3I6IGVycm9yfTtcblx0fVxufTtcbiIsICJpbXBvcnQge21ha2VFYXJseUVycm9yfSBmcm9tICcuLi9yZXR1cm4vcmVzdWx0LmpzJztcbmltcG9ydCB7YWJvcnRTb3VyY2VTdHJlYW0sIGVuZERlc3RpbmF0aW9uU3RyZWFtfSBmcm9tICcuLi9pby9waXBlbGluZS5qcyc7XG5cbi8vIFdoZW4gcGFzc2luZyBpbnZhbGlkIGFyZ3VtZW50cyB0byBgc291cmNlLnBpcGUoKWAsIHRocm93IGFzeW5jaHJvbm91c2x5LlxuLy8gV2UgYWxzbyBhYm9ydCBib3RoIHN1YnByb2Nlc3Nlcy5cbmV4cG9ydCBjb25zdCBoYW5kbGVQaXBlQXJndW1lbnRzRXJyb3IgPSAoe1xuXHRzb3VyY2VTdHJlYW0sXG5cdHNvdXJjZUVycm9yLFxuXHRkZXN0aW5hdGlvblN0cmVhbSxcblx0ZGVzdGluYXRpb25FcnJvcixcblx0ZmlsZURlc2NyaXB0b3JzLFxuXHRzb3VyY2VPcHRpb25zLFxuXHRzdGFydFRpbWUsXG59KSA9PiB7XG5cdGNvbnN0IGVycm9yID0gZ2V0UGlwZUFyZ3VtZW50c0Vycm9yKHtcblx0XHRzb3VyY2VTdHJlYW0sXG5cdFx0c291cmNlRXJyb3IsXG5cdFx0ZGVzdGluYXRpb25TdHJlYW0sXG5cdFx0ZGVzdGluYXRpb25FcnJvcixcblx0fSk7XG5cdGlmIChlcnJvciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgY3JlYXRlTm9uQ29tbWFuZEVycm9yKHtcblx0XHRcdGVycm9yLFxuXHRcdFx0ZmlsZURlc2NyaXB0b3JzLFxuXHRcdFx0c291cmNlT3B0aW9ucyxcblx0XHRcdHN0YXJ0VGltZSxcblx0XHR9KTtcblx0fVxufTtcblxuY29uc3QgZ2V0UGlwZUFyZ3VtZW50c0Vycm9yID0gKHtzb3VyY2VTdHJlYW0sIHNvdXJjZUVycm9yLCBkZXN0aW5hdGlvblN0cmVhbSwgZGVzdGluYXRpb25FcnJvcn0pID0+IHtcblx0aWYgKHNvdXJjZUVycm9yICE9PSB1bmRlZmluZWQgJiYgZGVzdGluYXRpb25FcnJvciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGRlc3RpbmF0aW9uRXJyb3I7XG5cdH1cblxuXHRpZiAoZGVzdGluYXRpb25FcnJvciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0YWJvcnRTb3VyY2VTdHJlYW0oc291cmNlU3RyZWFtKTtcblx0XHRyZXR1cm4gZGVzdGluYXRpb25FcnJvcjtcblx0fVxuXG5cdGlmIChzb3VyY2VFcnJvciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0ZW5kRGVzdGluYXRpb25TdHJlYW0oZGVzdGluYXRpb25TdHJlYW0pO1xuXHRcdHJldHVybiBzb3VyY2VFcnJvcjtcblx0fVxufTtcblxuLy8gU3BlY2lmaWMgZXJyb3IgcmV0dXJuIHZhbHVlIHdoZW4gcGFzc2luZyBpbnZhbGlkIGFyZ3VtZW50cyB0byBgc3VicHJvY2Vzcy5waXBlKClgIG9yIHdoZW4gdXNpbmcgYHVucGlwZVNpZ25hbGBcbmV4cG9ydCBjb25zdCBjcmVhdGVOb25Db21tYW5kRXJyb3IgPSAoe2Vycm9yLCBmaWxlRGVzY3JpcHRvcnMsIHNvdXJjZU9wdGlvbnMsIHN0YXJ0VGltZX0pID0+IG1ha2VFYXJseUVycm9yKHtcblx0ZXJyb3IsXG5cdGNvbW1hbmQ6IFBJUEVfQ09NTUFORF9NRVNTQUdFLFxuXHRlc2NhcGVkQ29tbWFuZDogUElQRV9DT01NQU5EX01FU1NBR0UsXG5cdGZpbGVEZXNjcmlwdG9ycyxcblx0b3B0aW9uczogc291cmNlT3B0aW9ucyxcblx0c3RhcnRUaW1lLFxuXHRpc1N5bmM6IGZhbHNlLFxufSk7XG5cbmNvbnN0IFBJUEVfQ09NTUFORF9NRVNTQUdFID0gJ3NvdXJjZS5waXBlKGRlc3RpbmF0aW9uKSc7XG4iLCAiLy8gTGlrZSBCYXNoLCB3ZSBhd2FpdCBib3RoIHN1YnByb2Nlc3Nlcy4gVGhpcyBpcyB1bmxpa2Ugc29tZSBvdGhlciBzaGVsbHMgd2hpY2ggb25seSBhd2FpdCB0aGUgZGVzdGluYXRpb24gc3VicHJvY2Vzcy5cbi8vIExpa2UgQmFzaCB3aXRoIHRoZSBgcGlwZWZhaWxgIG9wdGlvbiwgaWYgZWl0aGVyIHN1YnByb2Nlc3MgZmFpbHMsIHRoZSB3aG9sZSBwaXBlIGZhaWxzLlxuLy8gTGlrZSBCYXNoLCBpZiBib3RoIHN1YnByb2Nlc3NlcyBmYWlsLCB3ZSByZXR1cm4gdGhlIGZhaWx1cmUgb2YgdGhlIGRlc3RpbmF0aW9uLlxuLy8gVGhpcyBlbnN1cmVzIGJvdGggc3VicHJvY2Vzc2VzJyBlcnJvcnMgYXJlIHByZXNlbnQsIHVzaW5nIGBlcnJvci5waXBlZEZyb21gLlxuZXhwb3J0IGNvbnN0IHdhaXRGb3JCb3RoU3VicHJvY2Vzc2VzID0gYXN5bmMgc3VicHJvY2Vzc1Byb21pc2VzID0+IHtcblx0Y29uc3QgW1xuXHRcdHtzdGF0dXM6IHNvdXJjZVN0YXR1cywgcmVhc29uOiBzb3VyY2VSZWFzb24sIHZhbHVlOiBzb3VyY2VSZXN1bHQgPSBzb3VyY2VSZWFzb259LFxuXHRcdHtzdGF0dXM6IGRlc3RpbmF0aW9uU3RhdHVzLCByZWFzb246IGRlc3RpbmF0aW9uUmVhc29uLCB2YWx1ZTogZGVzdGluYXRpb25SZXN1bHQgPSBkZXN0aW5hdGlvblJlYXNvbn0sXG5cdF0gPSBhd2FpdCBzdWJwcm9jZXNzUHJvbWlzZXM7XG5cblx0aWYgKCFkZXN0aW5hdGlvblJlc3VsdC5waXBlZEZyb20uaW5jbHVkZXMoc291cmNlUmVzdWx0KSkge1xuXHRcdGRlc3RpbmF0aW9uUmVzdWx0LnBpcGVkRnJvbS5wdXNoKHNvdXJjZVJlc3VsdCk7XG5cdH1cblxuXHRpZiAoZGVzdGluYXRpb25TdGF0dXMgPT09ICdyZWplY3RlZCcpIHtcblx0XHR0aHJvdyBkZXN0aW5hdGlvblJlc3VsdDtcblx0fVxuXG5cdGlmIChzb3VyY2VTdGF0dXMgPT09ICdyZWplY3RlZCcpIHtcblx0XHR0aHJvdyBzb3VyY2VSZXN1bHQ7XG5cdH1cblxuXHRyZXR1cm4gZGVzdGluYXRpb25SZXN1bHQ7XG59O1xuIiwgImltcG9ydCB7ZmluaXNoZWR9IGZyb20gJ25vZGU6c3RyZWFtL3Byb21pc2VzJztcbmltcG9ydCBtZXJnZVN0cmVhbXMgZnJvbSAnQHNpbmRyZXNvcmh1cy9tZXJnZS1zdHJlYW1zJztcbmltcG9ydCB7aW5jcmVtZW50TWF4TGlzdGVuZXJzfSBmcm9tICcuLi91dGlscy9tYXgtbGlzdGVuZXJzLmpzJztcbmltcG9ydCB7cGlwZVN0cmVhbXN9IGZyb20gJy4uL2lvL3BpcGVsaW5lLmpzJztcblxuLy8gVGhlIHBpcGluZyBiZWhhdmlvciBpcyBsaWtlIEJhc2guXG4vLyBJbiBwYXJ0aWN1bGFyLCB3aGVuIG9uZSBzdWJwcm9jZXNzIGV4aXRzLCB0aGUgb3RoZXIgaXMgbm90IHRlcm1pbmF0ZWQgYnkgYSBzaWduYWwuXG4vLyBJbnN0ZWFkLCBpdHMgc3Rkb3V0IChmb3IgdGhlIHNvdXJjZSkgb3Igc3RkaW4gKGZvciB0aGUgZGVzdGluYXRpb24pIGNsb3Nlcy5cbi8vIElmIHRoZSBzdWJwcm9jZXNzIHVzZXMgaXQsIGl0IHdpbGwgbWFrZSBpdCBlcnJvciB3aXRoIFNJR1BJUEUgb3IgRVBJUEUgKGZvciB0aGUgc291cmNlKSBvciBlbmQgKGZvciB0aGUgZGVzdGluYXRpb24pLlxuLy8gSWYgaXQgZG9lcyBub3QgdXNlIGl0LCBpdCB3aWxsIGNvbnRpbnVlIHJ1bm5pbmcuXG4vLyBUaGlzIGFsbG93cyBmb3Igc3VicHJvY2Vzc2VzIHRvIGdyYWNlZnVsbHkgZXhpdCBhbmQgbG93ZXIgdGhlIGNvdXBsaW5nIGJldHdlZW4gc3VicHJvY2Vzc2VzLlxuZXhwb3J0IGNvbnN0IHBpcGVTdWJwcm9jZXNzU3RyZWFtID0gKHNvdXJjZVN0cmVhbSwgZGVzdGluYXRpb25TdHJlYW0sIG1heExpc3RlbmVyc0NvbnRyb2xsZXIpID0+IHtcblx0Y29uc3QgbWVyZ2VkU3RyZWFtID0gTUVSR0VEX1NUUkVBTVMuaGFzKGRlc3RpbmF0aW9uU3RyZWFtKVxuXHRcdD8gcGlwZU1vcmVTdWJwcm9jZXNzU3RyZWFtKHNvdXJjZVN0cmVhbSwgZGVzdGluYXRpb25TdHJlYW0pXG5cdFx0OiBwaXBlRmlyc3RTdWJwcm9jZXNzU3RyZWFtKHNvdXJjZVN0cmVhbSwgZGVzdGluYXRpb25TdHJlYW0pO1xuXHRpbmNyZW1lbnRNYXhMaXN0ZW5lcnMoc291cmNlU3RyZWFtLCBTT1VSQ0VfTElTVEVORVJTX1BFUl9QSVBFLCBtYXhMaXN0ZW5lcnNDb250cm9sbGVyLnNpZ25hbCk7XG5cdGluY3JlbWVudE1heExpc3RlbmVycyhkZXN0aW5hdGlvblN0cmVhbSwgREVTVElOQVRJT05fTElTVEVORVJTX1BFUl9QSVBFLCBtYXhMaXN0ZW5lcnNDb250cm9sbGVyLnNpZ25hbCk7XG5cdGNsZWFudXBNZXJnZWRTdHJlYW1zTWFwKGRlc3RpbmF0aW9uU3RyZWFtKTtcblx0cmV0dXJuIG1lcmdlZFN0cmVhbTtcbn07XG5cbi8vIFdlIHVzZSBgbWVyZ2Utc3RyZWFtc2AgdG8gYWxsb3cgZm9yIG11bHRpcGxlIHNvdXJjZXMgdG8gcGlwZSB0byB0aGUgc2FtZSBkZXN0aW5hdGlvbi5cbmNvbnN0IHBpcGVGaXJzdFN1YnByb2Nlc3NTdHJlYW0gPSAoc291cmNlU3RyZWFtLCBkZXN0aW5hdGlvblN0cmVhbSkgPT4ge1xuXHRjb25zdCBtZXJnZWRTdHJlYW0gPSBtZXJnZVN0cmVhbXMoW3NvdXJjZVN0cmVhbV0pO1xuXHRwaXBlU3RyZWFtcyhtZXJnZWRTdHJlYW0sIGRlc3RpbmF0aW9uU3RyZWFtKTtcblx0TUVSR0VEX1NUUkVBTVMuc2V0KGRlc3RpbmF0aW9uU3RyZWFtLCBtZXJnZWRTdHJlYW0pO1xuXHRyZXR1cm4gbWVyZ2VkU3RyZWFtO1xufTtcblxuY29uc3QgcGlwZU1vcmVTdWJwcm9jZXNzU3RyZWFtID0gKHNvdXJjZVN0cmVhbSwgZGVzdGluYXRpb25TdHJlYW0pID0+IHtcblx0Y29uc3QgbWVyZ2VkU3RyZWFtID0gTUVSR0VEX1NUUkVBTVMuZ2V0KGRlc3RpbmF0aW9uU3RyZWFtKTtcblx0bWVyZ2VkU3RyZWFtLmFkZChzb3VyY2VTdHJlYW0pO1xuXHRyZXR1cm4gbWVyZ2VkU3RyZWFtO1xufTtcblxuY29uc3QgY2xlYW51cE1lcmdlZFN0cmVhbXNNYXAgPSBhc3luYyBkZXN0aW5hdGlvblN0cmVhbSA9PiB7XG5cdHRyeSB7XG5cdFx0YXdhaXQgZmluaXNoZWQoZGVzdGluYXRpb25TdHJlYW0sIHtjbGVhbnVwOiB0cnVlLCByZWFkYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlfSk7XG5cdH0gY2F0Y2gge31cblxuXHRNRVJHRURfU1RSRUFNUy5kZWxldGUoZGVzdGluYXRpb25TdHJlYW0pO1xufTtcblxuY29uc3QgTUVSR0VEX1NUUkVBTVMgPSBuZXcgV2Vha01hcCgpO1xuXG4vLyBOdW1iZXIgb2YgbGlzdGVuZXJzIHNldCB1cCBvbiBgc291cmNlU3RyZWFtYCBieSBlYWNoIGBzb3VyY2VTdHJlYW0ucGlwZShkZXN0aW5hdGlvblN0cmVhbSlgXG4vLyBUaG9zZSBhcmUgYWRkZWQgYnkgYG1lcmdlLXN0cmVhbXNgXG5jb25zdCBTT1VSQ0VfTElTVEVORVJTX1BFUl9QSVBFID0gMjtcbi8vIE51bWJlciBvZiBsaXN0ZW5lcnMgc2V0IHVwIG9uIGBkZXN0aW5hdGlvblN0cmVhbWAgYnkgZWFjaCBgc291cmNlU3RyZWFtLnBpcGUoZGVzdGluYXRpb25TdHJlYW0pYFxuLy8gVGhvc2UgYXJlIGFkZGVkIGJ5IGBmaW5pc2hlZCgpYCBpbiBgY2xlYW51cE1lcmdlZFN0cmVhbXNNYXAoKWBcbmNvbnN0IERFU1RJTkFUSU9OX0xJU1RFTkVSU19QRVJfUElQRSA9IDE7XG4iLCAiaW1wb3J0IHthYm9ydGVkfSBmcm9tICdub2RlOnV0aWwnO1xuaW1wb3J0IHtjcmVhdGVOb25Db21tYW5kRXJyb3J9IGZyb20gJy4vdGhyb3cuanMnO1xuXG4vLyBXaGVuIHBhc3NpbmcgYW4gYHVucGlwZVNpZ25hbGAgb3B0aW9uLCBhYm9ydCBwaXBpbmcgd2hlbiB0aGUgc2lnbmFsIGlzIGFib3J0ZWQuXG4vLyBIb3dldmVyLCBkbyBub3QgdGVybWluYXRlIHRoZSBzdWJwcm9jZXNzZXMuXG5leHBvcnQgY29uc3QgdW5waXBlT25BYm9ydCA9ICh1bnBpcGVTaWduYWwsIHVucGlwZUNvbnRleHQpID0+IHVucGlwZVNpZ25hbCA9PT0gdW5kZWZpbmVkXG5cdD8gW11cblx0OiBbdW5waXBlT25TaWduYWxBYm9ydCh1bnBpcGVTaWduYWwsIHVucGlwZUNvbnRleHQpXTtcblxuY29uc3QgdW5waXBlT25TaWduYWxBYm9ydCA9IGFzeW5jICh1bnBpcGVTaWduYWwsIHtzb3VyY2VTdHJlYW0sIG1lcmdlZFN0cmVhbSwgZmlsZURlc2NyaXB0b3JzLCBzb3VyY2VPcHRpb25zLCBzdGFydFRpbWV9KSA9PiB7XG5cdGF3YWl0IGFib3J0ZWQodW5waXBlU2lnbmFsLCBzb3VyY2VTdHJlYW0pO1xuXHRhd2FpdCBtZXJnZWRTdHJlYW0ucmVtb3ZlKHNvdXJjZVN0cmVhbSk7XG5cdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCdQaXBlIGNhbmNlbGVkIGJ5IGB1bnBpcGVTaWduYWxgIG9wdGlvbi4nKTtcblx0dGhyb3cgY3JlYXRlTm9uQ29tbWFuZEVycm9yKHtcblx0XHRlcnJvcixcblx0XHRmaWxlRGVzY3JpcHRvcnMsXG5cdFx0c291cmNlT3B0aW9ucyxcblx0XHRzdGFydFRpbWUsXG5cdH0pO1xufTtcbiIsICJpbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICdpcy1wbGFpbi1vYmonO1xuaW1wb3J0IHtub3JtYWxpemVQaXBlQXJndW1lbnRzfSBmcm9tICcuL3BpcGUtYXJndW1lbnRzLmpzJztcbmltcG9ydCB7aGFuZGxlUGlwZUFyZ3VtZW50c0Vycm9yfSBmcm9tICcuL3Rocm93LmpzJztcbmltcG9ydCB7d2FpdEZvckJvdGhTdWJwcm9jZXNzZXN9IGZyb20gJy4vc2VxdWVuY2UuanMnO1xuaW1wb3J0IHtwaXBlU3VicHJvY2Vzc1N0cmVhbX0gZnJvbSAnLi9zdHJlYW1pbmcuanMnO1xuaW1wb3J0IHt1bnBpcGVPbkFib3J0fSBmcm9tICcuL2Fib3J0LmpzJztcblxuLy8gUGlwZSBhIHN1YnByb2Nlc3MnIGBzdGRvdXRgL2BzdGRlcnJgL2BzdGRpb2AgaW50byBhbm90aGVyIHN1YnByb2Nlc3MnIGBzdGRpbmBcbmV4cG9ydCBjb25zdCBwaXBlVG9TdWJwcm9jZXNzID0gKHNvdXJjZUluZm8sIC4uLnBpcGVBcmd1bWVudHMpID0+IHtcblx0aWYgKGlzUGxhaW5PYmplY3QocGlwZUFyZ3VtZW50c1swXSkpIHtcblx0XHRyZXR1cm4gcGlwZVRvU3VicHJvY2Vzcy5iaW5kKHVuZGVmaW5lZCwge1xuXHRcdFx0Li4uc291cmNlSW5mbyxcblx0XHRcdGJvdW5kT3B0aW9uczogey4uLnNvdXJjZUluZm8uYm91bmRPcHRpb25zLCAuLi5waXBlQXJndW1lbnRzWzBdfSxcblx0XHR9KTtcblx0fVxuXG5cdGNvbnN0IHtkZXN0aW5hdGlvbiwgLi4ubm9ybWFsaXplZEluZm99ID0gbm9ybWFsaXplUGlwZUFyZ3VtZW50cyhzb3VyY2VJbmZvLCAuLi5waXBlQXJndW1lbnRzKTtcblx0Y29uc3QgcHJvbWlzZSA9IGhhbmRsZVBpcGVQcm9taXNlKHsuLi5ub3JtYWxpemVkSW5mbywgZGVzdGluYXRpb259KTtcblx0cHJvbWlzZS5waXBlID0gcGlwZVRvU3VicHJvY2Vzcy5iaW5kKHVuZGVmaW5lZCwge1xuXHRcdC4uLnNvdXJjZUluZm8sXG5cdFx0c291cmNlOiBkZXN0aW5hdGlvbixcblx0XHRzb3VyY2VQcm9taXNlOiBwcm9taXNlLFxuXHRcdGJvdW5kT3B0aW9uczoge30sXG5cdH0pO1xuXHRyZXR1cm4gcHJvbWlzZTtcbn07XG5cbi8vIEFzeW5jaHJvbm91cyBsb2dpYyB3aGVuIHBpcGluZyBzdWJwcm9jZXNzZXNcbmNvbnN0IGhhbmRsZVBpcGVQcm9taXNlID0gYXN5bmMgKHtcblx0c291cmNlUHJvbWlzZSxcblx0c291cmNlU3RyZWFtLFxuXHRzb3VyY2VPcHRpb25zLFxuXHRzb3VyY2VFcnJvcixcblx0ZGVzdGluYXRpb24sXG5cdGRlc3RpbmF0aW9uU3RyZWFtLFxuXHRkZXN0aW5hdGlvbkVycm9yLFxuXHR1bnBpcGVTaWduYWwsXG5cdGZpbGVEZXNjcmlwdG9ycyxcblx0c3RhcnRUaW1lLFxufSkgPT4ge1xuXHRjb25zdCBzdWJwcm9jZXNzUHJvbWlzZXMgPSBnZXRTdWJwcm9jZXNzUHJvbWlzZXMoc291cmNlUHJvbWlzZSwgZGVzdGluYXRpb24pO1xuXHRoYW5kbGVQaXBlQXJndW1lbnRzRXJyb3Ioe1xuXHRcdHNvdXJjZVN0cmVhbSxcblx0XHRzb3VyY2VFcnJvcixcblx0XHRkZXN0aW5hdGlvblN0cmVhbSxcblx0XHRkZXN0aW5hdGlvbkVycm9yLFxuXHRcdGZpbGVEZXNjcmlwdG9ycyxcblx0XHRzb3VyY2VPcHRpb25zLFxuXHRcdHN0YXJ0VGltZSxcblx0fSk7XG5cdGNvbnN0IG1heExpc3RlbmVyc0NvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cdHRyeSB7XG5cdFx0Y29uc3QgbWVyZ2VkU3RyZWFtID0gcGlwZVN1YnByb2Nlc3NTdHJlYW0oc291cmNlU3RyZWFtLCBkZXN0aW5hdGlvblN0cmVhbSwgbWF4TGlzdGVuZXJzQ29udHJvbGxlcik7XG5cdFx0cmV0dXJuIGF3YWl0IFByb21pc2UucmFjZShbXG5cdFx0XHR3YWl0Rm9yQm90aFN1YnByb2Nlc3NlcyhzdWJwcm9jZXNzUHJvbWlzZXMpLFxuXHRcdFx0Li4udW5waXBlT25BYm9ydCh1bnBpcGVTaWduYWwsIHtcblx0XHRcdFx0c291cmNlU3RyZWFtLFxuXHRcdFx0XHRtZXJnZWRTdHJlYW0sXG5cdFx0XHRcdHNvdXJjZU9wdGlvbnMsXG5cdFx0XHRcdGZpbGVEZXNjcmlwdG9ycyxcblx0XHRcdFx0c3RhcnRUaW1lLFxuXHRcdFx0fSksXG5cdFx0XSk7XG5cdH0gZmluYWxseSB7XG5cdFx0bWF4TGlzdGVuZXJzQ29udHJvbGxlci5hYm9ydCgpO1xuXHR9XG59O1xuXG4vLyBgLnBpcGUoKWAgYXdhaXRzIHRoZSBzdWJwcm9jZXNzIHByb21pc2VzLlxuLy8gV2hlbiBpbnZhbGlkIGFyZ3VtZW50cyBhcmUgcGFzc2VkIHRvIGAucGlwZSgpYCwgd2UgdGhyb3cgYW4gZXJyb3IsIHdoaWNoIHByZXZlbnRzIGF3YWl0aW5nIHRoZW0uXG4vLyBXZSBuZWVkIHRvIGVuc3VyZSB0aGlzIGRvZXMgbm90IGNyZWF0ZSB1bmhhbmRsZWQgcmVqZWN0aW9ucy5cbmNvbnN0IGdldFN1YnByb2Nlc3NQcm9taXNlcyA9IChzb3VyY2VQcm9taXNlLCBkZXN0aW5hdGlvbikgPT4gUHJvbWlzZS5hbGxTZXR0bGVkKFtzb3VyY2VQcm9taXNlLCBkZXN0aW5hdGlvbl0pO1xuIiwgImltcG9ydCB7b259IGZyb20gJ25vZGU6ZXZlbnRzJztcbmltcG9ydCB7Z2V0RGVmYXVsdEhpZ2hXYXRlck1hcmt9IGZyb20gJ25vZGU6c3RyZWFtJztcbmltcG9ydCB7Z2V0RW5jb2RpbmdUcmFuc2Zvcm1HZW5lcmF0b3J9IGZyb20gJy4uL3RyYW5zZm9ybS9lbmNvZGluZy10cmFuc2Zvcm0uanMnO1xuaW1wb3J0IHtnZXRTcGxpdExpbmVzR2VuZXJhdG9yfSBmcm9tICcuLi90cmFuc2Zvcm0vc3BsaXQuanMnO1xuaW1wb3J0IHt0cmFuc2Zvcm1DaHVua1N5bmMsIGZpbmFsQ2h1bmtzU3luY30gZnJvbSAnLi4vdHJhbnNmb3JtL3J1bi1zeW5jLmpzJztcblxuLy8gSXRlcmF0ZSBvdmVyIGxpbmVzIG9mIGBzdWJwcm9jZXNzLnN0ZG91dGAsIHVzZWQgYnkgYHN1YnByb2Nlc3MucmVhZGFibGV8ZHVwbGV4fGl0ZXJhYmxlKClgXG5leHBvcnQgY29uc3QgaXRlcmF0ZU9uU3VicHJvY2Vzc1N0cmVhbSA9ICh7c3VicHJvY2Vzc1N0ZG91dCwgc3VicHJvY2VzcywgYmluYXJ5LCBzaG91bGRFbmNvZGUsIGVuY29kaW5nLCBwcmVzZXJ2ZU5ld2xpbmVzfSkgPT4ge1xuXHRjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXHRzdG9wUmVhZGluZ09uRXhpdChzdWJwcm9jZXNzLCBjb250cm9sbGVyKTtcblx0cmV0dXJuIGl0ZXJhdGVPblN0cmVhbSh7XG5cdFx0c3RyZWFtOiBzdWJwcm9jZXNzU3Rkb3V0LFxuXHRcdGNvbnRyb2xsZXIsXG5cdFx0YmluYXJ5LFxuXHRcdHNob3VsZEVuY29kZTogIXN1YnByb2Nlc3NTdGRvdXQucmVhZGFibGVPYmplY3RNb2RlICYmIHNob3VsZEVuY29kZSxcblx0XHRlbmNvZGluZyxcblx0XHRzaG91bGRTcGxpdDogIXN1YnByb2Nlc3NTdGRvdXQucmVhZGFibGVPYmplY3RNb2RlLFxuXHRcdHByZXNlcnZlTmV3bGluZXMsXG5cdH0pO1xufTtcblxuY29uc3Qgc3RvcFJlYWRpbmdPbkV4aXQgPSBhc3luYyAoc3VicHJvY2VzcywgY29udHJvbGxlcikgPT4ge1xuXHR0cnkge1xuXHRcdGF3YWl0IHN1YnByb2Nlc3M7XG5cdH0gY2F0Y2gge30gZmluYWxseSB7XG5cdFx0Y29udHJvbGxlci5hYm9ydCgpO1xuXHR9XG59O1xuXG4vLyBJdGVyYXRlIG92ZXIgbGluZXMgb2YgYHN1YnByb2Nlc3Muc3Rkb3V0YCwgdXNlZCBieSBgcmVzdWx0LnN0ZG91dGAgYW5kIHRoZSBgdmVyYm9zZTogJ2Z1bGwnYCBvcHRpb24uXG4vLyBBcHBsaWVzIHRoZSBgbGluZXNgIGFuZCBgZW5jb2RpbmdgIG9wdGlvbnMuXG5leHBvcnQgY29uc3QgaXRlcmF0ZUZvclJlc3VsdCA9ICh7c3RyZWFtLCBvblN0cmVhbUVuZCwgbGluZXMsIGVuY29kaW5nLCBzdHJpcEZpbmFsTmV3bGluZSwgYWxsTWl4ZWR9KSA9PiB7XG5cdGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cdHN0b3BSZWFkaW5nT25TdHJlYW1FbmQob25TdHJlYW1FbmQsIGNvbnRyb2xsZXIsIHN0cmVhbSk7XG5cdGNvbnN0IG9iamVjdE1vZGUgPSBzdHJlYW0ucmVhZGFibGVPYmplY3RNb2RlICYmICFhbGxNaXhlZDtcblx0cmV0dXJuIGl0ZXJhdGVPblN0cmVhbSh7XG5cdFx0c3RyZWFtLFxuXHRcdGNvbnRyb2xsZXIsXG5cdFx0YmluYXJ5OiBlbmNvZGluZyA9PT0gJ2J1ZmZlcicsXG5cdFx0c2hvdWxkRW5jb2RlOiAhb2JqZWN0TW9kZSxcblx0XHRlbmNvZGluZyxcblx0XHRzaG91bGRTcGxpdDogIW9iamVjdE1vZGUgJiYgbGluZXMsXG5cdFx0cHJlc2VydmVOZXdsaW5lczogIXN0cmlwRmluYWxOZXdsaW5lLFxuXHR9KTtcbn07XG5cbmNvbnN0IHN0b3BSZWFkaW5nT25TdHJlYW1FbmQgPSBhc3luYyAob25TdHJlYW1FbmQsIGNvbnRyb2xsZXIsIHN0cmVhbSkgPT4ge1xuXHR0cnkge1xuXHRcdGF3YWl0IG9uU3RyZWFtRW5kO1xuXHR9IGNhdGNoIHtcblx0XHRzdHJlYW0uZGVzdHJveSgpO1xuXHR9IGZpbmFsbHkge1xuXHRcdGNvbnRyb2xsZXIuYWJvcnQoKTtcblx0fVxufTtcblxuY29uc3QgaXRlcmF0ZU9uU3RyZWFtID0gKHtzdHJlYW0sIGNvbnRyb2xsZXIsIGJpbmFyeSwgc2hvdWxkRW5jb2RlLCBlbmNvZGluZywgc2hvdWxkU3BsaXQsIHByZXNlcnZlTmV3bGluZXN9KSA9PiB7XG5cdGNvbnN0IG9uU3Rkb3V0Q2h1bmsgPSBvbihzdHJlYW0sICdkYXRhJywge1xuXHRcdHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG5cdFx0aGlnaFdhdGVyTWFyazogSElHSF9XQVRFUl9NQVJLLFxuXHRcdC8vIEJhY2t3YXJkIGNvbXBhdGliaWxpdHkgd2l0aCBvbGRlciBuYW1lIGZvciB0aGlzIG9wdGlvblxuXHRcdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvcHVsbC81MjA4MCNkaXNjdXNzaW9uX3IxNTI1MjI3ODYxXG5cdFx0Ly8gQHRvZG8gUmVtb3ZlIGFmdGVyIHJlbW92aW5nIHN1cHBvcnQgZm9yIE5vZGUgMjFcblx0XHRoaWdoV2F0ZXJtYXJrOiBISUdIX1dBVEVSX01BUkssXG5cdH0pO1xuXHRyZXR1cm4gaXRlcmF0ZU9uRGF0YSh7XG5cdFx0b25TdGRvdXRDaHVuayxcblx0XHRjb250cm9sbGVyLFxuXHRcdGJpbmFyeSxcblx0XHRzaG91bGRFbmNvZGUsXG5cdFx0ZW5jb2RpbmcsXG5cdFx0c2hvdWxkU3BsaXQsXG5cdFx0cHJlc2VydmVOZXdsaW5lcyxcblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9PQkpFQ1RfSElHSF9XQVRFUl9NQVJLID0gZ2V0RGVmYXVsdEhpZ2hXYXRlck1hcmsodHJ1ZSk7XG5cbi8vIFRoZSBgaGlnaFdhdGVyTWFya2Agb2YgYGV2ZW50cy5vbigpYCBpcyBtZWFzdXJlZCBpbiBudW1iZXIgb2YgZXZlbnRzLCBub3QgaW4gYnl0ZXMuXG4vLyBOb3Qga25vd2luZyB0aGUgYXZlcmFnZSBhbW91bnQgb2YgYnl0ZXMgcGVyIGBkYXRhYCBldmVudCwgd2UgdXNlIHRoZSBzYW1lIGhldXJpc3RpYyBhcyBzdHJlYW1zIGluIG9iamVjdE1vZGUsIHNpbmNlIHRoZXkgaGF2ZSB0aGUgc2FtZSBpc3N1ZS5cbi8vIFRoZXJlZm9yZSwgd2UgdXNlIHRoZSB2YWx1ZSBvZiBgZ2V0RGVmYXVsdEhpZ2hXYXRlck1hcmsodHJ1ZSlgLlxuLy8gTm90ZTogdGhpcyBvcHRpb24gZG9lcyBub3QgZXhpc3Qgb24gTm9kZSAxOCwgYnV0IHRoaXMgaXMgb2sgc2luY2UgdGhlIGxvZ2ljIHdvcmtzIHdpdGhvdXQgaXQuIEl0IGp1c3QgY29uc3VtZXMgbW9yZSBtZW1vcnkuXG5jb25zdCBISUdIX1dBVEVSX01BUksgPSBERUZBVUxUX09CSkVDVF9ISUdIX1dBVEVSX01BUks7XG5cbmNvbnN0IGl0ZXJhdGVPbkRhdGEgPSBhc3luYyBmdW5jdGlvbiAqICh7b25TdGRvdXRDaHVuaywgY29udHJvbGxlciwgYmluYXJ5LCBzaG91bGRFbmNvZGUsIGVuY29kaW5nLCBzaG91bGRTcGxpdCwgcHJlc2VydmVOZXdsaW5lc30pIHtcblx0Y29uc3QgZ2VuZXJhdG9ycyA9IGdldEdlbmVyYXRvcnMoe1xuXHRcdGJpbmFyeSxcblx0XHRzaG91bGRFbmNvZGUsXG5cdFx0ZW5jb2RpbmcsXG5cdFx0c2hvdWxkU3BsaXQsXG5cdFx0cHJlc2VydmVOZXdsaW5lcyxcblx0fSk7XG5cblx0dHJ5IHtcblx0XHRmb3IgYXdhaXQgKGNvbnN0IFtjaHVua10gb2Ygb25TdGRvdXRDaHVuaykge1xuXHRcdFx0eWllbGQgKiB0cmFuc2Zvcm1DaHVua1N5bmMoY2h1bmssIGdlbmVyYXRvcnMsIDApO1xuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAoIWNvbnRyb2xsZXIuc2lnbmFsLmFib3J0ZWQpIHtcblx0XHRcdHRocm93IGVycm9yO1xuXHRcdH1cblx0fSBmaW5hbGx5IHtcblx0XHR5aWVsZCAqIGZpbmFsQ2h1bmtzU3luYyhnZW5lcmF0b3JzKTtcblx0fVxufTtcblxuY29uc3QgZ2V0R2VuZXJhdG9ycyA9ICh7YmluYXJ5LCBzaG91bGRFbmNvZGUsIGVuY29kaW5nLCBzaG91bGRTcGxpdCwgcHJlc2VydmVOZXdsaW5lc30pID0+IFtcblx0Z2V0RW5jb2RpbmdUcmFuc2Zvcm1HZW5lcmF0b3IoYmluYXJ5LCBlbmNvZGluZywgIXNob3VsZEVuY29kZSksXG5cdGdldFNwbGl0TGluZXNHZW5lcmF0b3IoYmluYXJ5LCBwcmVzZXJ2ZU5ld2xpbmVzLCAhc2hvdWxkU3BsaXQsIHt9KSxcbl0uZmlsdGVyKEJvb2xlYW4pO1xuIiwgImltcG9ydCB7c2V0SW1tZWRpYXRlfSBmcm9tICdub2RlOnRpbWVycy9wcm9taXNlcyc7XG5pbXBvcnQgZ2V0U3RyZWFtLCB7Z2V0U3RyZWFtQXNBcnJheUJ1ZmZlciwgZ2V0U3RyZWFtQXNBcnJheX0gZnJvbSAnZ2V0LXN0cmVhbSc7XG5pbXBvcnQge2lzQXJyYXlCdWZmZXJ9IGZyb20gJy4uL3V0aWxzL3VpbnQtYXJyYXkuanMnO1xuaW1wb3J0IHtzaG91bGRMb2dPdXRwdXQsIGxvZ0xpbmVzfSBmcm9tICcuLi92ZXJib3NlL291dHB1dC5qcyc7XG5pbXBvcnQge2l0ZXJhdGVGb3JSZXN1bHR9IGZyb20gJy4vaXRlcmF0ZS5qcyc7XG5pbXBvcnQge2hhbmRsZU1heEJ1ZmZlcn0gZnJvbSAnLi9tYXgtYnVmZmVyLmpzJztcbmltcG9ydCB7Z2V0U3RyaXBGaW5hbE5ld2xpbmV9IGZyb20gJy4vc3RyaXAtbmV3bGluZS5qcyc7XG5cbi8vIFJldHJpZXZlIGByZXN1bHQuc3Rkb3V0fHN0ZGVycnxhbGx8c3RkaW9bKl1gXG5leHBvcnQgY29uc3QgZ2V0U3RyZWFtT3V0cHV0ID0gYXN5bmMgKHtzdHJlYW0sIG9uU3RyZWFtRW5kLCBmZE51bWJlciwgZW5jb2RpbmcsIGJ1ZmZlciwgbWF4QnVmZmVyLCBsaW5lcywgYWxsTWl4ZWQsIHN0cmlwRmluYWxOZXdsaW5lLCB2ZXJib3NlSW5mbywgc3RyZWFtSW5mb30pID0+IHtcblx0Y29uc3QgbG9nUHJvbWlzZSA9IGxvZ091dHB1dEFzeW5jKHtcblx0XHRzdHJlYW0sXG5cdFx0b25TdHJlYW1FbmQsXG5cdFx0ZmROdW1iZXIsXG5cdFx0ZW5jb2RpbmcsXG5cdFx0YWxsTWl4ZWQsXG5cdFx0dmVyYm9zZUluZm8sXG5cdFx0c3RyZWFtSW5mbyxcblx0fSk7XG5cblx0aWYgKCFidWZmZXIpIHtcblx0XHRhd2FpdCBQcm9taXNlLmFsbChbcmVzdW1lU3RyZWFtKHN0cmVhbSksIGxvZ1Byb21pc2VdKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBzdHJpcEZpbmFsTmV3bGluZVZhbHVlID0gZ2V0U3RyaXBGaW5hbE5ld2xpbmUoc3RyaXBGaW5hbE5ld2xpbmUsIGZkTnVtYmVyKTtcblx0Y29uc3QgaXRlcmFibGUgPSBpdGVyYXRlRm9yUmVzdWx0KHtcblx0XHRzdHJlYW0sXG5cdFx0b25TdHJlYW1FbmQsXG5cdFx0bGluZXMsXG5cdFx0ZW5jb2RpbmcsXG5cdFx0c3RyaXBGaW5hbE5ld2xpbmU6IHN0cmlwRmluYWxOZXdsaW5lVmFsdWUsXG5cdFx0YWxsTWl4ZWQsXG5cdH0pO1xuXHRjb25zdCBbb3V0cHV0XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcblx0XHRnZXRTdHJlYW1Db250ZW50cyh7XG5cdFx0XHRzdHJlYW0sXG5cdFx0XHRpdGVyYWJsZSxcblx0XHRcdGZkTnVtYmVyLFxuXHRcdFx0ZW5jb2RpbmcsXG5cdFx0XHRtYXhCdWZmZXIsXG5cdFx0XHRsaW5lcyxcblx0XHR9KSxcblx0XHRsb2dQcm9taXNlLFxuXHRdKTtcblx0cmV0dXJuIG91dHB1dDtcbn07XG5cbmNvbnN0IGxvZ091dHB1dEFzeW5jID0gYXN5bmMgKHtzdHJlYW0sIG9uU3RyZWFtRW5kLCBmZE51bWJlciwgZW5jb2RpbmcsIGFsbE1peGVkLCB2ZXJib3NlSW5mbywgc3RyZWFtSW5mbzoge2ZpbGVEZXNjcmlwdG9yc319KSA9PiB7XG5cdGlmICghc2hvdWxkTG9nT3V0cHV0KHtcblx0XHRzdGRpb0l0ZW1zOiBmaWxlRGVzY3JpcHRvcnNbZmROdW1iZXJdPy5zdGRpb0l0ZW1zLFxuXHRcdGVuY29kaW5nLFxuXHRcdHZlcmJvc2VJbmZvLFxuXHRcdGZkTnVtYmVyLFxuXHR9KSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGxpbmVzSXRlcmFibGUgPSBpdGVyYXRlRm9yUmVzdWx0KHtcblx0XHRzdHJlYW0sXG5cdFx0b25TdHJlYW1FbmQsXG5cdFx0bGluZXM6IHRydWUsXG5cdFx0ZW5jb2RpbmcsXG5cdFx0c3RyaXBGaW5hbE5ld2xpbmU6IHRydWUsXG5cdFx0YWxsTWl4ZWQsXG5cdH0pO1xuXHRhd2FpdCBsb2dMaW5lcyhsaW5lc0l0ZXJhYmxlLCBzdHJlYW0sIGZkTnVtYmVyLCB2ZXJib3NlSW5mbyk7XG59O1xuXG4vLyBXaGVuIHVzaW5nIGBidWZmZXI6IGZhbHNlYCwgdXNlcnMgbmVlZCB0byByZWFkIGBzdWJwcm9jZXNzLnN0ZG91dHxzdGRlcnJ8YWxsYCByaWdodCBhd2F5XG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9leGVjYS9pc3N1ZXMvNzMwIGFuZCBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL2V4ZWNhL3B1bGwvNzI5I2Rpc2N1c3Npb25fcjE0NjU0OTYzMTBcbmNvbnN0IHJlc3VtZVN0cmVhbSA9IGFzeW5jIHN0cmVhbSA9PiB7XG5cdGF3YWl0IHNldEltbWVkaWF0ZSgpO1xuXHRpZiAoc3RyZWFtLnJlYWRhYmxlRmxvd2luZyA9PT0gbnVsbCkge1xuXHRcdHN0cmVhbS5yZXN1bWUoKTtcblx0fVxufTtcblxuY29uc3QgZ2V0U3RyZWFtQ29udGVudHMgPSBhc3luYyAoe3N0cmVhbSwgc3RyZWFtOiB7cmVhZGFibGVPYmplY3RNb2RlfSwgaXRlcmFibGUsIGZkTnVtYmVyLCBlbmNvZGluZywgbWF4QnVmZmVyLCBsaW5lc30pID0+IHtcblx0dHJ5IHtcblx0XHRpZiAocmVhZGFibGVPYmplY3RNb2RlIHx8IGxpbmVzKSB7XG5cdFx0XHRyZXR1cm4gYXdhaXQgZ2V0U3RyZWFtQXNBcnJheShpdGVyYWJsZSwge21heEJ1ZmZlcn0pO1xuXHRcdH1cblxuXHRcdGlmIChlbmNvZGluZyA9PT0gJ2J1ZmZlcicpIHtcblx0XHRcdHJldHVybiBuZXcgVWludDhBcnJheShhd2FpdCBnZXRTdHJlYW1Bc0FycmF5QnVmZmVyKGl0ZXJhYmxlLCB7bWF4QnVmZmVyfSkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBhd2FpdCBnZXRTdHJlYW0oaXRlcmFibGUsIHttYXhCdWZmZXJ9KTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRyZXR1cm4gaGFuZGxlQnVmZmVyZWREYXRhKGhhbmRsZU1heEJ1ZmZlcih7XG5cdFx0XHRlcnJvcixcblx0XHRcdHN0cmVhbSxcblx0XHRcdHJlYWRhYmxlT2JqZWN0TW9kZSxcblx0XHRcdGxpbmVzLFxuXHRcdFx0ZW5jb2RpbmcsXG5cdFx0XHRmZE51bWJlcixcblx0XHR9KSk7XG5cdH1cbn07XG5cbi8vIE9uIGZhaWx1cmUsIGByZXN1bHQuc3Rkb3V0fHN0ZGVycnxhbGxgIHNob3VsZCBjb250YWluIHRoZSBjdXJyZW50bHkgYnVmZmVyZWQgc3RyZWFtXG4vLyBUaGV5IGFyZSBhdXRvbWF0aWNhbGx5IGNsb3NlZCBhbmQgZmx1c2hlZCBieSBOb2RlLmpzIHdoZW4gdGhlIHN1YnByb2Nlc3MgZXhpdHNcbi8vIFdoZW4gYGJ1ZmZlcmAgaXMgYGZhbHNlYCwgYHN0cmVhbVByb21pc2VgIGlzIGB1bmRlZmluZWRgIGFuZCB0aGVyZSBpcyBubyBidWZmZXJlZCBkYXRhIHRvIHJldHJpZXZlXG5leHBvcnQgY29uc3QgZ2V0QnVmZmVyZWREYXRhID0gYXN5bmMgc3RyZWFtUHJvbWlzZSA9PiB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIGF3YWl0IHN0cmVhbVByb21pc2U7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0cmV0dXJuIGhhbmRsZUJ1ZmZlcmVkRGF0YShlcnJvcik7XG5cdH1cbn07XG5cbi8vIEVuc3VyZSB3ZSBhcmUgcmV0dXJuaW5nIFVpbnQ4QXJyYXlzIHdoZW4gdXNpbmcgYGVuY29kaW5nOiAnYnVmZmVyJ2BcbmNvbnN0IGhhbmRsZUJ1ZmZlcmVkRGF0YSA9ICh7YnVmZmVyZWREYXRhfSkgPT4gaXNBcnJheUJ1ZmZlcihidWZmZXJlZERhdGEpXG5cdD8gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyZWREYXRhKVxuXHQ6IGJ1ZmZlcmVkRGF0YTtcbiIsICJpbXBvcnQge2ZpbmlzaGVkfSBmcm9tICdub2RlOnN0cmVhbS9wcm9taXNlcyc7XG5cbi8vIFdyYXBzIGBmaW5pc2hlZChzdHJlYW0pYCB0byBoYW5kbGUgdGhlIGZvbGxvd2luZyBjYXNlOlxuLy8gIC0gV2hlbiB0aGUgc3VicHJvY2VzcyBleGl0cywgTm9kZS5qcyBhdXRvbWF0aWNhbGx5IGNhbGxzIGBzdWJwcm9jZXNzLnN0ZGluLmRlc3Ryb3koKWAsIHdoaWNoIHdlIG5lZWQgdG8gaWdub3JlLlxuLy8gIC0gSG93ZXZlciwgd2Ugc3RpbGwgbmVlZCB0byB0aHJvdyBpZiBgc3VicHJvY2Vzcy5zdGRpbi5kZXN0cm95KClgIGlzIGNhbGxlZCBiZWZvcmUgc3VicHJvY2VzcyBleGl0LlxuZXhwb3J0IGNvbnN0IHdhaXRGb3JTdHJlYW0gPSBhc3luYyAoc3RyZWFtLCBmZE51bWJlciwgc3RyZWFtSW5mbywge2lzU2FtZURpcmVjdGlvbiwgc3RvcE9uRXhpdCA9IGZhbHNlfSA9IHt9KSA9PiB7XG5cdGNvbnN0IHN0YXRlID0gaGFuZGxlU3RkaW5EZXN0cm95KHN0cmVhbSwgc3RyZWFtSW5mbyk7XG5cdGNvbnN0IGFib3J0Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblx0dHJ5IHtcblx0XHRhd2FpdCBQcm9taXNlLnJhY2UoW1xuXHRcdFx0Li4uKHN0b3BPbkV4aXQgPyBbc3RyZWFtSW5mby5leGl0UHJvbWlzZV0gOiBbXSksXG5cdFx0XHRmaW5pc2hlZChzdHJlYW0sIHtjbGVhbnVwOiB0cnVlLCBzaWduYWw6IGFib3J0Q29udHJvbGxlci5zaWduYWx9KSxcblx0XHRdKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAoIXN0YXRlLnN0ZGluQ2xlYW5lZFVwKSB7XG5cdFx0XHRoYW5kbGVTdHJlYW1FcnJvcihlcnJvciwgZmROdW1iZXIsIHN0cmVhbUluZm8sIGlzU2FtZURpcmVjdGlvbik7XG5cdFx0fVxuXHR9IGZpbmFsbHkge1xuXHRcdGFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xuXHR9XG59O1xuXG4vLyBJZiBgc3VicHJvY2Vzcy5zdGRpbmAgaXMgZGVzdHJveWVkIGJlZm9yZSBiZWluZyBmdWxseSB3cml0dGVuIHRvLCBpdCBpcyBjb25zaWRlcmVkIGFib3J0ZWQgYW5kIHNob3VsZCB0aHJvdyBhbiBlcnJvci5cbi8vIFRoaXMgY2FuIGhhcHBlbiBmb3IgZXhhbXBsZSB3aGVuIHVzZXIgY2FsbGVkIGBzdWJwcm9jZXNzLnN0ZGluLmRlc3Ryb3koKWAgYmVmb3JlIGBzdWJwcm9jZXNzLnN0ZGluLmVuZCgpYC5cbi8vIEhvd2V2ZXIsIE5vZGUuanMgY2FsbHMgYHN1YnByb2Nlc3Muc3RkaW4uZGVzdHJveSgpYCBvbiBleGl0IGZvciBjbGVhbnVwIHB1cnBvc2VzLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2Jsb2IvMGI0Y2RiNGI0Mjk1NmNiZDcwMTkwNThlNDA5ZTA2NzAwYTE5OWUxMS9saWIvaW50ZXJuYWwvY2hpbGRfcHJvY2Vzcy5qcyNMMjc4XG4vLyBUaGlzIGlzIG5vcm1hbCBhbmQgc2hvdWxkIG5vdCB0aHJvdyBhbiBlcnJvci5cbi8vIFRoZXJlZm9yZSwgd2UgbmVlZCB0byBkaWZmZXJlbnRpYXRlIGJldHdlZW4gYm90aCBzaXR1YXRpb25zIHRvIGtub3cgd2hldGhlciB0byB0aHJvdyBhbiBlcnJvci5cbi8vIFVuZm9ydHVuYXRlbHksIGV2ZW50cyAoYGNsb3NlYCwgYGVycm9yYCwgYGVuZGAsIGBleGl0YCkgY2Fubm90IGJlIHVzZWQgYmVjYXVzZSBgLmRlc3Ryb3koKWAgY2FuIHRha2UgYW4gYXJiaXRyYXJ5IGFtb3VudCBvZiB0aW1lLlxuLy8gRm9yIGV4YW1wbGUsIGBzdGRpbjogJ3BpcGUnYCBpcyBpbXBsZW1lbnRlZCBhcyBhIFRDUCBzb2NrZXQsIGFuZCBpdHMgYC5kZXN0cm95KClgIG1ldGhvZCB3YWl0cyBmb3IgVENQIGRpc2Nvbm5lY3Rpb24uXG4vLyBUaGVyZWZvcmUgYC5kZXN0cm95KClgIG1pZ2h0IGVuZCBiZWZvcmUgb3IgYWZ0ZXIgc3VicHJvY2VzcyBleGl0LCBiYXNlZCBvbiBPUyBzcGVlZCBhbmQgbG9hZC5cbi8vIFRoZSBvbmx5IHdheSB0byBkZXRlY3QgdGhpcyBpcyB0byBzcHkgb24gYHN1YnByb2Nlc3Muc3RkaW4uX2Rlc3Ryb3koKWAgYnkgd3JhcHBpbmcgaXQuXG4vLyBJZiBgc3VicHJvY2Vzcy5leGl0Q29kZWAgb3IgYHN1YnByb2Nlc3Muc2lnbmFsQ29kZWAgaXMgc2V0LCBpdCBtZWFucyBgLmRlc3Ryb3koKWAgaXMgYmVpbmcgY2FsbGVkIGJ5IE5vZGUuanMgaXRzZWxmLlxuY29uc3QgaGFuZGxlU3RkaW5EZXN0cm95ID0gKHN0cmVhbSwge29yaWdpbmFsU3RyZWFtczogW29yaWdpbmFsU3RkaW5dLCBzdWJwcm9jZXNzfSkgPT4ge1xuXHRjb25zdCBzdGF0ZSA9IHtzdGRpbkNsZWFuZWRVcDogZmFsc2V9O1xuXHRpZiAoc3RyZWFtID09PSBvcmlnaW5hbFN0ZGluKSB7XG5cdFx0c3B5T25TdGRpbkRlc3Ryb3koc3RyZWFtLCBzdWJwcm9jZXNzLCBzdGF0ZSk7XG5cdH1cblxuXHRyZXR1cm4gc3RhdGU7XG59O1xuXG5jb25zdCBzcHlPblN0ZGluRGVzdHJveSA9IChzdWJwcm9jZXNzU3RkaW4sIHN1YnByb2Nlc3MsIHN0YXRlKSA9PiB7XG5cdGNvbnN0IHtfZGVzdHJveX0gPSBzdWJwcm9jZXNzU3RkaW47XG5cdHN1YnByb2Nlc3NTdGRpbi5fZGVzdHJveSA9ICguLi5kZXN0cm95QXJndW1lbnRzKSA9PiB7XG5cdFx0c2V0U3RkaW5DbGVhbmVkVXAoc3VicHJvY2Vzcywgc3RhdGUpO1xuXHRcdF9kZXN0cm95LmNhbGwoc3VicHJvY2Vzc1N0ZGluLCAuLi5kZXN0cm95QXJndW1lbnRzKTtcblx0fTtcbn07XG5cbmNvbnN0IHNldFN0ZGluQ2xlYW5lZFVwID0gKHtleGl0Q29kZSwgc2lnbmFsQ29kZX0sIHN0YXRlKSA9PiB7XG5cdGlmIChleGl0Q29kZSAhPT0gbnVsbCB8fCBzaWduYWxDb2RlICE9PSBudWxsKSB7XG5cdFx0c3RhdGUuc3RkaW5DbGVhbmVkVXAgPSB0cnVlO1xuXHR9XG59O1xuXG4vLyBXZSBpZ25vcmUgRVBJUEVzIG9uIHdyaXRhYmxlIHN0cmVhbXMgYW5kIGFib3J0cyBvbiByZWFkYWJsZSBzdHJlYW1zIHNpbmNlIHRob3NlIGNhbiBoYXBwZW4gbm9ybWFsbHkuXG4vLyBXaGVuIG9uZSBzdHJlYW0gZXJyb3JzLCB0aGUgZXJyb3IgaXMgcHJvcGFnYXRlZCB0byB0aGUgb3RoZXIgc3RyZWFtcyBvbiB0aGUgc2FtZSBmaWxlIGRlc2NyaXB0b3IuXG4vLyBUaG9zZSBvdGhlciBzdHJlYW1zIG1pZ2h0IGhhdmUgYSBkaWZmZXJlbnQgZGlyZWN0aW9uIGR1ZSB0byB0aGUgYWJvdmUuXG4vLyBXaGVuIHRoaXMgaGFwcGVucywgdGhlIGRpcmVjdGlvbiBvZiBib3RoIHRoZSBpbml0aWFsIHN0cmVhbSBhbmQgdGhlIG90aGVycyBzaG91bGQgdGhlbiBiZSB0YWtlbiBpbnRvIGFjY291bnQuXG4vLyBUaGVyZWZvcmUsIHdlIGtlZXAgdHJhY2sgb2Ygd2hldGhlciBhIHN0cmVhbSBlcnJvciBpcyBjdXJyZW50bHkgcHJvcGFnYXRpbmcuXG5jb25zdCBoYW5kbGVTdHJlYW1FcnJvciA9IChlcnJvciwgZmROdW1iZXIsIHN0cmVhbUluZm8sIGlzU2FtZURpcmVjdGlvbikgPT4ge1xuXHRpZiAoIXNob3VsZElnbm9yZVN0cmVhbUVycm9yKGVycm9yLCBmZE51bWJlciwgc3RyZWFtSW5mbywgaXNTYW1lRGlyZWN0aW9uKSkge1xuXHRcdHRocm93IGVycm9yO1xuXHR9XG59O1xuXG5jb25zdCBzaG91bGRJZ25vcmVTdHJlYW1FcnJvciA9IChlcnJvciwgZmROdW1iZXIsIHN0cmVhbUluZm8sIGlzU2FtZURpcmVjdGlvbiA9IHRydWUpID0+IHtcblx0aWYgKHN0cmVhbUluZm8ucHJvcGFnYXRpbmcpIHtcblx0XHRyZXR1cm4gaXNTdHJlYW1FcGlwZShlcnJvcikgfHwgaXNTdHJlYW1BYm9ydChlcnJvcik7XG5cdH1cblxuXHRzdHJlYW1JbmZvLnByb3BhZ2F0aW5nID0gdHJ1ZTtcblx0cmV0dXJuIGlzSW5wdXRGaWxlRGVzY3JpcHRvcihzdHJlYW1JbmZvLCBmZE51bWJlcikgPT09IGlzU2FtZURpcmVjdGlvblxuXHRcdD8gaXNTdHJlYW1FcGlwZShlcnJvcilcblx0XHQ6IGlzU3RyZWFtQWJvcnQoZXJyb3IpO1xufTtcblxuLy8gVW5mb3J0dW5hdGVseSwgd2UgY2Fubm90IHVzZSB0aGUgc3RyZWFtJ3MgY2xhc3Mgb3IgcHJvcGVydGllcyB0byBrbm93IHdoZXRoZXIgaXQgaXMgcmVhZGFibGUgb3Igd3JpdGFibGUuXG4vLyBGb3IgZXhhbXBsZSwgYHN1YnByb2Nlc3Muc3RkaW5gIGlzIHRlY2huaWNhbGx5IGEgRHVwbGV4LCBidXQgY2FuIG9ubHkgYmUgdXNlZCBhcyBhIHdyaXRhYmxlLlxuLy8gVGhlcmVmb3JlLCB3ZSBuZWVkIHRvIHVzZSB0aGUgZmlsZSBkZXNjcmlwdG9yJ3MgZGlyZWN0aW9uIChgc3RkaW5gIGlzIGlucHV0LCBgc3Rkb3V0YCBpcyBvdXRwdXQsIGV0Yy4pLlxuLy8gSG93ZXZlciwgd2hpbGUgYHN1YnByb2Nlc3Muc3RkKmAgYW5kIHRyYW5zZm9ybXMgZm9sbG93IHRoYXQgZGlyZWN0aW9uLCBhbnkgc3RyZWFtIHBhc3NlZCB0aGUgYHN0ZCpgIG9wdGlvbiBoYXMgdGhlIG9wcG9zaXRlIGRpcmVjdGlvbi5cbi8vIEZvciBleGFtcGxlLCBgc3VicHJvY2Vzcy5zdGRpbmAgaXMgYSB3cml0YWJsZSwgYnV0IHRoZSBgc3RkaW5gIG9wdGlvbiBpcyBhIHJlYWRhYmxlLlxuZXhwb3J0IGNvbnN0IGlzSW5wdXRGaWxlRGVzY3JpcHRvciA9ICh7ZmlsZURlc2NyaXB0b3JzfSwgZmROdW1iZXIpID0+IGZkTnVtYmVyICE9PSAnYWxsJyAmJiBmaWxlRGVzY3JpcHRvcnNbZmROdW1iZXJdLmRpcmVjdGlvbiA9PT0gJ2lucHV0JztcblxuLy8gV2hlbiBgc3RyZWFtLmRlc3Ryb3koKWAgaXMgY2FsbGVkIHdpdGhvdXQgYW4gYGVycm9yYCBhcmd1bWVudCwgc3RyZWFtIGlzIGFib3J0ZWQuXG4vLyBUaGlzIGlzIHRoZSBvbmx5IHdheSB0byBhYm9ydCBhIHJlYWRhYmxlIHN0cmVhbSwgd2hpY2ggY2FuIGJlIHVzZWZ1bCBpbiBzb21lIGluc3RhbmNlcy5cbi8vIFRoZXJlZm9yZSwgd2UgaWdub3JlIHRoaXMgZXJyb3Igb24gcmVhZGFibGUgc3RyZWFtcy5cbmV4cG9ydCBjb25zdCBpc1N0cmVhbUFib3J0ID0gZXJyb3IgPT4gZXJyb3I/LmNvZGUgPT09ICdFUlJfU1RSRUFNX1BSRU1BVFVSRV9DTE9TRSc7XG5cbi8vIFdoZW4gYHN0cmVhbS53cml0ZSgpYCBpcyBjYWxsZWQgYnV0IHRoZSB1bmRlcmx5aW5nIHNvdXJjZSBoYXMgYmVlbiBjbG9zZWQsIGBFUElQRWAgaXMgZW1pdHRlZC5cbi8vIFdoZW4gcGlwaW5nIHN1YnByb2Nlc3NlcywgdGhlIHNvdXJjZSBzdWJwcm9jZXNzIHVzdWFsbHkgZGVjaWRlcyB3aGVuIHRvIHN0b3AgcGlwaW5nLlxuLy8gSG93ZXZlciwgdGhlcmUgYXJlIHNvbWUgaW5zdGFuY2VzIHdoZW4gdGhlIGRlc3RpbmF0aW9uIGRvZXMgaW5zdGVhZCwgc3VjaCBhcyBgLi4uIHwgaGVhZCAtbjFgLlxuLy8gSXQgbm90aWZpZXMgdGhlIHNvdXJjZSBieSB1c2luZyBgRVBJUEVgLlxuLy8gVGhlcmVmb3JlLCB3ZSBpZ25vcmUgdGhpcyBlcnJvciBvbiB3cml0YWJsZSBzdHJlYW1zLlxuY29uc3QgaXNTdHJlYW1FcGlwZSA9IGVycm9yID0+IGVycm9yPy5jb2RlID09PSAnRVBJUEUnO1xuIiwgImltcG9ydCB7Z2V0U3RyZWFtT3V0cHV0fSBmcm9tICcuLi9pby9jb250ZW50cy5qcyc7XG5pbXBvcnQge3dhaXRGb3JTdHJlYW0sIGlzSW5wdXRGaWxlRGVzY3JpcHRvcn0gZnJvbSAnLi93YWl0LXN0cmVhbS5qcyc7XG5cbi8vIFJlYWQgdGhlIGNvbnRlbnRzIG9mIGBzdWJwcm9jZXNzLnN0ZCpgIGFuZHxvciB3YWl0IGZvciBpdHMgY29tcGxldGlvblxuZXhwb3J0IGNvbnN0IHdhaXRGb3JTdGRpb1N0cmVhbXMgPSAoe3N1YnByb2Nlc3MsIGVuY29kaW5nLCBidWZmZXIsIG1heEJ1ZmZlciwgbGluZXMsIHN0cmlwRmluYWxOZXdsaW5lLCB2ZXJib3NlSW5mbywgc3RyZWFtSW5mb30pID0+IHN1YnByb2Nlc3Muc3RkaW8ubWFwKChzdHJlYW0sIGZkTnVtYmVyKSA9PiB3YWl0Rm9yU3VicHJvY2Vzc1N0cmVhbSh7XG5cdHN0cmVhbSxcblx0ZmROdW1iZXIsXG5cdGVuY29kaW5nLFxuXHRidWZmZXI6IGJ1ZmZlcltmZE51bWJlcl0sXG5cdG1heEJ1ZmZlcjogbWF4QnVmZmVyW2ZkTnVtYmVyXSxcblx0bGluZXM6IGxpbmVzW2ZkTnVtYmVyXSxcblx0YWxsTWl4ZWQ6IGZhbHNlLFxuXHRzdHJpcEZpbmFsTmV3bGluZSxcblx0dmVyYm9zZUluZm8sXG5cdHN0cmVhbUluZm8sXG59KSk7XG5cbi8vIFJlYWQgdGhlIGNvbnRlbnRzIG9mIGBzdWJwcm9jZXNzLnN0ZCpgIG9yIGBzdWJwcm9jZXNzLmFsbGAgYW5kfG9yIHdhaXQgZm9yIGl0cyBjb21wbGV0aW9uXG5leHBvcnQgY29uc3Qgd2FpdEZvclN1YnByb2Nlc3NTdHJlYW0gPSBhc3luYyAoe3N0cmVhbSwgZmROdW1iZXIsIGVuY29kaW5nLCBidWZmZXIsIG1heEJ1ZmZlciwgbGluZXMsIGFsbE1peGVkLCBzdHJpcEZpbmFsTmV3bGluZSwgdmVyYm9zZUluZm8sIHN0cmVhbUluZm99KSA9PiB7XG5cdGlmICghc3RyZWFtKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3Qgb25TdHJlYW1FbmQgPSB3YWl0Rm9yU3RyZWFtKHN0cmVhbSwgZmROdW1iZXIsIHN0cmVhbUluZm8pO1xuXHRpZiAoaXNJbnB1dEZpbGVEZXNjcmlwdG9yKHN0cmVhbUluZm8sIGZkTnVtYmVyKSkge1xuXHRcdGF3YWl0IG9uU3RyZWFtRW5kO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IFtvdXRwdXRdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuXHRcdGdldFN0cmVhbU91dHB1dCh7XG5cdFx0XHRzdHJlYW0sXG5cdFx0XHRvblN0cmVhbUVuZCxcblx0XHRcdGZkTnVtYmVyLFxuXHRcdFx0ZW5jb2RpbmcsXG5cdFx0XHRidWZmZXIsXG5cdFx0XHRtYXhCdWZmZXIsXG5cdFx0XHRsaW5lcyxcblx0XHRcdGFsbE1peGVkLFxuXHRcdFx0c3RyaXBGaW5hbE5ld2xpbmUsXG5cdFx0XHR2ZXJib3NlSW5mbyxcblx0XHRcdHN0cmVhbUluZm8sXG5cdFx0fSksXG5cdFx0b25TdHJlYW1FbmQsXG5cdF0pO1xuXHRyZXR1cm4gb3V0cHV0O1xufTtcbiIsICJpbXBvcnQgbWVyZ2VTdHJlYW1zIGZyb20gJ0BzaW5kcmVzb3JodXMvbWVyZ2Utc3RyZWFtcyc7XG5pbXBvcnQge3dhaXRGb3JTdWJwcm9jZXNzU3RyZWFtfSBmcm9tICcuL3N0ZGlvLmpzJztcblxuLy8gYGFsbGAgaW50ZXJsZWF2ZXMgYHN0ZG91dGAgYW5kIGBzdGRlcnJgXG5leHBvcnQgY29uc3QgbWFrZUFsbFN0cmVhbSA9ICh7c3Rkb3V0LCBzdGRlcnJ9LCB7YWxsfSkgPT4gYWxsICYmIChzdGRvdXQgfHwgc3RkZXJyKVxuXHQ/IG1lcmdlU3RyZWFtcyhbc3Rkb3V0LCBzdGRlcnJdLmZpbHRlcihCb29sZWFuKSlcblx0OiB1bmRlZmluZWQ7XG5cbi8vIFJlYWQgdGhlIGNvbnRlbnRzIG9mIGBzdWJwcm9jZXNzLmFsbGAgYW5kfG9yIHdhaXQgZm9yIGl0cyBjb21wbGV0aW9uXG5leHBvcnQgY29uc3Qgd2FpdEZvckFsbFN0cmVhbSA9ICh7c3VicHJvY2VzcywgZW5jb2RpbmcsIGJ1ZmZlciwgbWF4QnVmZmVyLCBsaW5lcywgc3RyaXBGaW5hbE5ld2xpbmUsIHZlcmJvc2VJbmZvLCBzdHJlYW1JbmZvfSkgPT4gd2FpdEZvclN1YnByb2Nlc3NTdHJlYW0oe1xuXHQuLi5nZXRBbGxTdHJlYW0oc3VicHJvY2VzcywgYnVmZmVyKSxcblx0ZmROdW1iZXI6ICdhbGwnLFxuXHRlbmNvZGluZyxcblx0bWF4QnVmZmVyOiBtYXhCdWZmZXJbMV0gKyBtYXhCdWZmZXJbMl0sXG5cdGxpbmVzOiBsaW5lc1sxXSB8fCBsaW5lc1syXSxcblx0YWxsTWl4ZWQ6IGdldEFsbE1peGVkKHN1YnByb2Nlc3MpLFxuXHRzdHJpcEZpbmFsTmV3bGluZSxcblx0dmVyYm9zZUluZm8sXG5cdHN0cmVhbUluZm8sXG59KTtcblxuY29uc3QgZ2V0QWxsU3RyZWFtID0gKHtzdGRvdXQsIHN0ZGVyciwgYWxsfSwgWywgYnVmZmVyU3Rkb3V0LCBidWZmZXJTdGRlcnJdKSA9PiB7XG5cdGNvbnN0IGJ1ZmZlciA9IGJ1ZmZlclN0ZG91dCB8fCBidWZmZXJTdGRlcnI7XG5cdGlmICghYnVmZmVyKSB7XG5cdFx0cmV0dXJuIHtzdHJlYW06IGFsbCwgYnVmZmVyfTtcblx0fVxuXG5cdGlmICghYnVmZmVyU3Rkb3V0KSB7XG5cdFx0cmV0dXJuIHtzdHJlYW06IHN0ZGVyciwgYnVmZmVyfTtcblx0fVxuXG5cdGlmICghYnVmZmVyU3RkZXJyKSB7XG5cdFx0cmV0dXJuIHtzdHJlYW06IHN0ZG91dCwgYnVmZmVyfTtcblx0fVxuXG5cdHJldHVybiB7c3RyZWFtOiBhbGwsIGJ1ZmZlcn07XG59O1xuXG4vLyBXaGVuIGBzdWJwcm9jZXNzLnN0ZG91dGAgaXMgaW4gb2JqZWN0TW9kZSBidXQgbm90IGBzdWJwcm9jZXNzLnN0ZGVycmAgKG9yIHRoZSBvcHBvc2l0ZSksIHdlIG5lZWQgdG8gdXNlIGJvdGg6XG4vLyAgLSBgZ2V0U3RyZWFtQXNBcnJheSgpYCBmb3IgdGhlIGNodW5rcyBpbiBvYmplY3RNb2RlLCB0byByZXR1cm4gYXMgYW4gYXJyYXkgd2l0aG91dCBjaGFuZ2luZyBlYWNoIGNodW5rXG4vLyAgLSBgZ2V0U3RyZWFtQXNBcnJheUJ1ZmZlcigpYCBvciBgZ2V0U3RyZWFtKClgIGZvciB0aGUgY2h1bmtzIG5vdCBpbiBvYmplY3RNb2RlLCB0byBjb252ZXJ0IHRoZW0gZnJvbSBCdWZmZXJzIHRvIHN0cmluZyBvciBVaW50OEFycmF5XG4vLyBXZSBkbyB0aGlzIGJ5IGVtdWxhdGluZyB0aGUgQnVmZmVyIC0+IHN0cmluZ3xVaW50OEFycmF5IGNvbnZlcnNpb24gcGVyZm9ybWVkIGJ5IGBnZXQtc3RyZWFtYCB3aXRoIG91ciBvd24sIHdoaWNoIGlzIGlkZW50aWNhbC5cbmNvbnN0IGdldEFsbE1peGVkID0gKHthbGwsIHN0ZG91dCwgc3RkZXJyfSkgPT4gYWxsXG5cdCYmIHN0ZG91dFxuXHQmJiBzdGRlcnJcblx0JiYgc3Rkb3V0LnJlYWRhYmxlT2JqZWN0TW9kZSAhPT0gc3RkZXJyLnJlYWRhYmxlT2JqZWN0TW9kZTtcbiIsICJpbXBvcnQge3ZlcmJvc2VMb2csIHNlcmlhbGl6ZVZlcmJvc2VNZXNzYWdlfSBmcm9tICcuL2xvZy5qcyc7XG5pbXBvcnQge2lzRnVsbFZlcmJvc2V9IGZyb20gJy4vdmFsdWVzLmpzJztcblxuLy8gV2hlbiBgdmVyYm9zZWAgaXMgYCdmdWxsJ2AsIHByaW50IElQQyBtZXNzYWdlcyBmcm9tIHRoZSBzdWJwcm9jZXNzXG5leHBvcnQgY29uc3Qgc2hvdWxkTG9nSXBjID0gdmVyYm9zZUluZm8gPT4gaXNGdWxsVmVyYm9zZSh2ZXJib3NlSW5mbywgJ2lwYycpO1xuXG5leHBvcnQgY29uc3QgbG9nSXBjT3V0cHV0ID0gKG1lc3NhZ2UsIHZlcmJvc2VJbmZvKSA9PiB7XG5cdGNvbnN0IHZlcmJvc2VNZXNzYWdlID0gc2VyaWFsaXplVmVyYm9zZU1lc3NhZ2UobWVzc2FnZSk7XG5cdHZlcmJvc2VMb2coe1xuXHRcdHR5cGU6ICdpcGMnLFxuXHRcdHZlcmJvc2VNZXNzYWdlLFxuXHRcdGZkTnVtYmVyOiAnaXBjJyxcblx0XHR2ZXJib3NlSW5mbyxcblx0fSk7XG59O1xuIiwgImltcG9ydCB7Y2hlY2tJcGNNYXhCdWZmZXJ9IGZyb20gJy4uL2lvL21heC1idWZmZXIuanMnO1xuaW1wb3J0IHtzaG91bGRMb2dJcGMsIGxvZ0lwY091dHB1dH0gZnJvbSAnLi4vdmVyYm9zZS9pcGMuanMnO1xuaW1wb3J0IHtnZXRGZFNwZWNpZmljVmFsdWV9IGZyb20gJy4uL2FyZ3VtZW50cy9zcGVjaWZpYy5qcyc7XG5pbXBvcnQge2xvb3BPbk1lc3NhZ2VzfSBmcm9tICcuL2dldC1lYWNoLmpzJztcblxuLy8gSXRlcmF0ZSB0aHJvdWdoIElQQyBtZXNzYWdlcyBzZW50IGJ5IHRoZSBzdWJwcm9jZXNzXG5leHBvcnQgY29uc3Qgd2FpdEZvcklwY091dHB1dCA9IGFzeW5jICh7XG5cdHN1YnByb2Nlc3MsXG5cdGJ1ZmZlcjogYnVmZmVyQXJyYXksXG5cdG1heEJ1ZmZlcjogbWF4QnVmZmVyQXJyYXksXG5cdGlwYyxcblx0aXBjT3V0cHV0LFxuXHR2ZXJib3NlSW5mbyxcbn0pID0+IHtcblx0aWYgKCFpcGMpIHtcblx0XHRyZXR1cm4gaXBjT3V0cHV0O1xuXHR9XG5cblx0Y29uc3QgaXNWZXJib3NlID0gc2hvdWxkTG9nSXBjKHZlcmJvc2VJbmZvKTtcblx0Y29uc3QgYnVmZmVyID0gZ2V0RmRTcGVjaWZpY1ZhbHVlKGJ1ZmZlckFycmF5LCAnaXBjJyk7XG5cdGNvbnN0IG1heEJ1ZmZlciA9IGdldEZkU3BlY2lmaWNWYWx1ZShtYXhCdWZmZXJBcnJheSwgJ2lwYycpO1xuXG5cdGZvciBhd2FpdCAoY29uc3QgbWVzc2FnZSBvZiBsb29wT25NZXNzYWdlcyh7XG5cdFx0YW55UHJvY2Vzczogc3VicHJvY2Vzcyxcblx0XHRjaGFubmVsOiBzdWJwcm9jZXNzLmNoYW5uZWwsXG5cdFx0aXNTdWJwcm9jZXNzOiBmYWxzZSxcblx0XHRpcGMsXG5cdFx0c2hvdWxkQXdhaXQ6IGZhbHNlLFxuXHRcdHJlZmVyZW5jZTogdHJ1ZSxcblx0fSkpIHtcblx0XHRpZiAoYnVmZmVyKSB7XG5cdFx0XHRjaGVja0lwY01heEJ1ZmZlcihzdWJwcm9jZXNzLCBpcGNPdXRwdXQsIG1heEJ1ZmZlcik7XG5cdFx0XHRpcGNPdXRwdXQucHVzaChtZXNzYWdlKTtcblx0XHR9XG5cblx0XHRpZiAoaXNWZXJib3NlKSB7XG5cdFx0XHRsb2dJcGNPdXRwdXQobWVzc2FnZSwgdmVyYm9zZUluZm8pO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBpcGNPdXRwdXQ7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0QnVmZmVyZWRJcGNPdXRwdXQgPSBhc3luYyAoaXBjT3V0cHV0UHJvbWlzZSwgaXBjT3V0cHV0KSA9PiB7XG5cdGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChbaXBjT3V0cHV0UHJvbWlzZV0pO1xuXHRyZXR1cm4gaXBjT3V0cHV0O1xufTtcbiIsICJpbXBvcnQge29uY2V9IGZyb20gJ25vZGU6ZXZlbnRzJztcbmltcG9ydCB7aXNTdHJlYW0gYXMgaXNOb2RlU3RyZWFtfSBmcm9tICdpcy1zdHJlYW0nO1xuaW1wb3J0IHt0aHJvd09uVGltZW91dH0gZnJvbSAnLi4vdGVybWluYXRlL3RpbWVvdXQuanMnO1xuaW1wb3J0IHt0aHJvd09uQ2FuY2VsfSBmcm9tICcuLi90ZXJtaW5hdGUvY2FuY2VsLmpzJztcbmltcG9ydCB7dGhyb3dPbkdyYWNlZnVsQ2FuY2VsfSBmcm9tICcuLi90ZXJtaW5hdGUvZ3JhY2VmdWwuanMnO1xuaW1wb3J0IHtpc1N0YW5kYXJkU3RyZWFtfSBmcm9tICcuLi91dGlscy9zdGFuZGFyZC1zdHJlYW0uanMnO1xuaW1wb3J0IHtUUkFOU0ZPUk1fVFlQRVN9IGZyb20gJy4uL3N0ZGlvL3R5cGUuanMnO1xuaW1wb3J0IHtnZXRCdWZmZXJlZERhdGF9IGZyb20gJy4uL2lvL2NvbnRlbnRzLmpzJztcbmltcG9ydCB7d2FpdEZvcklwY091dHB1dCwgZ2V0QnVmZmVyZWRJcGNPdXRwdXR9IGZyb20gJy4uL2lwYy9idWZmZXItbWVzc2FnZXMuanMnO1xuaW1wb3J0IHtzZW5kSXBjSW5wdXR9IGZyb20gJy4uL2lwYy9pcGMtaW5wdXQuanMnO1xuaW1wb3J0IHt3YWl0Rm9yQWxsU3RyZWFtfSBmcm9tICcuL2FsbC1hc3luYy5qcyc7XG5pbXBvcnQge3dhaXRGb3JTdGRpb1N0cmVhbXN9IGZyb20gJy4vc3RkaW8uanMnO1xuaW1wb3J0IHt3YWl0Rm9yRXhpdCwgd2FpdEZvclN1Y2Nlc3NmdWxFeGl0fSBmcm9tICcuL2V4aXQtYXN5bmMuanMnO1xuaW1wb3J0IHt3YWl0Rm9yU3RyZWFtfSBmcm9tICcuL3dhaXQtc3RyZWFtLmpzJztcblxuLy8gUmV0cmlldmUgcmVzdWx0IG9mIHN1YnByb2Nlc3M6IGV4aXQgY29kZSwgc2lnbmFsLCBlcnJvciwgc3RyZWFtcyAoc3Rkb3V0L3N0ZGVyci9hbGwpXG5leHBvcnQgY29uc3Qgd2FpdEZvclN1YnByb2Nlc3NSZXN1bHQgPSBhc3luYyAoe1xuXHRzdWJwcm9jZXNzLFxuXHRvcHRpb25zOiB7XG5cdFx0ZW5jb2RpbmcsXG5cdFx0YnVmZmVyLFxuXHRcdG1heEJ1ZmZlcixcblx0XHRsaW5lcyxcblx0XHR0aW1lb3V0RHVyYXRpb246IHRpbWVvdXQsXG5cdFx0Y2FuY2VsU2lnbmFsLFxuXHRcdGdyYWNlZnVsQ2FuY2VsLFxuXHRcdGZvcmNlS2lsbEFmdGVyRGVsYXksXG5cdFx0c3RyaXBGaW5hbE5ld2xpbmUsXG5cdFx0aXBjLFxuXHRcdGlwY0lucHV0LFxuXHR9LFxuXHRjb250ZXh0LFxuXHR2ZXJib3NlSW5mbyxcblx0ZmlsZURlc2NyaXB0b3JzLFxuXHRvcmlnaW5hbFN0cmVhbXMsXG5cdG9uSW50ZXJuYWxFcnJvcixcblx0Y29udHJvbGxlcixcbn0pID0+IHtcblx0Y29uc3QgZXhpdFByb21pc2UgPSB3YWl0Rm9yRXhpdChzdWJwcm9jZXNzLCBjb250ZXh0KTtcblx0Y29uc3Qgc3RyZWFtSW5mbyA9IHtcblx0XHRvcmlnaW5hbFN0cmVhbXMsXG5cdFx0ZmlsZURlc2NyaXB0b3JzLFxuXHRcdHN1YnByb2Nlc3MsXG5cdFx0ZXhpdFByb21pc2UsXG5cdFx0cHJvcGFnYXRpbmc6IGZhbHNlLFxuXHR9O1xuXG5cdGNvbnN0IHN0ZGlvUHJvbWlzZXMgPSB3YWl0Rm9yU3RkaW9TdHJlYW1zKHtcblx0XHRzdWJwcm9jZXNzLFxuXHRcdGVuY29kaW5nLFxuXHRcdGJ1ZmZlcixcblx0XHRtYXhCdWZmZXIsXG5cdFx0bGluZXMsXG5cdFx0c3RyaXBGaW5hbE5ld2xpbmUsXG5cdFx0dmVyYm9zZUluZm8sXG5cdFx0c3RyZWFtSW5mbyxcblx0fSk7XG5cdGNvbnN0IGFsbFByb21pc2UgPSB3YWl0Rm9yQWxsU3RyZWFtKHtcblx0XHRzdWJwcm9jZXNzLFxuXHRcdGVuY29kaW5nLFxuXHRcdGJ1ZmZlcixcblx0XHRtYXhCdWZmZXIsXG5cdFx0bGluZXMsXG5cdFx0c3RyaXBGaW5hbE5ld2xpbmUsXG5cdFx0dmVyYm9zZUluZm8sXG5cdFx0c3RyZWFtSW5mbyxcblx0fSk7XG5cdGNvbnN0IGlwY091dHB1dCA9IFtdO1xuXHRjb25zdCBpcGNPdXRwdXRQcm9taXNlID0gd2FpdEZvcklwY091dHB1dCh7XG5cdFx0c3VicHJvY2Vzcyxcblx0XHRidWZmZXIsXG5cdFx0bWF4QnVmZmVyLFxuXHRcdGlwYyxcblx0XHRpcGNPdXRwdXQsXG5cdFx0dmVyYm9zZUluZm8sXG5cdH0pO1xuXHRjb25zdCBvcmlnaW5hbFByb21pc2VzID0gd2FpdEZvck9yaWdpbmFsU3RyZWFtcyhvcmlnaW5hbFN0cmVhbXMsIHN1YnByb2Nlc3MsIHN0cmVhbUluZm8pO1xuXHRjb25zdCBjdXN0b21TdHJlYW1zRW5kUHJvbWlzZXMgPSB3YWl0Rm9yQ3VzdG9tU3RyZWFtc0VuZChmaWxlRGVzY3JpcHRvcnMsIHN0cmVhbUluZm8pO1xuXG5cdHRyeSB7XG5cdFx0cmV0dXJuIGF3YWl0IFByb21pc2UucmFjZShbXG5cdFx0XHRQcm9taXNlLmFsbChbXG5cdFx0XHRcdHt9LFxuXHRcdFx0XHR3YWl0Rm9yU3VjY2Vzc2Z1bEV4aXQoZXhpdFByb21pc2UpLFxuXHRcdFx0XHRQcm9taXNlLmFsbChzdGRpb1Byb21pc2VzKSxcblx0XHRcdFx0YWxsUHJvbWlzZSxcblx0XHRcdFx0aXBjT3V0cHV0UHJvbWlzZSxcblx0XHRcdFx0c2VuZElwY0lucHV0KHN1YnByb2Nlc3MsIGlwY0lucHV0KSxcblx0XHRcdFx0Li4ub3JpZ2luYWxQcm9taXNlcyxcblx0XHRcdFx0Li4uY3VzdG9tU3RyZWFtc0VuZFByb21pc2VzLFxuXHRcdFx0XSksXG5cdFx0XHRvbkludGVybmFsRXJyb3IsXG5cdFx0XHR0aHJvd09uU3VicHJvY2Vzc0Vycm9yKHN1YnByb2Nlc3MsIGNvbnRyb2xsZXIpLFxuXHRcdFx0Li4udGhyb3dPblRpbWVvdXQoc3VicHJvY2VzcywgdGltZW91dCwgY29udGV4dCwgY29udHJvbGxlciksXG5cdFx0XHQuLi50aHJvd09uQ2FuY2VsKHtcblx0XHRcdFx0c3VicHJvY2Vzcyxcblx0XHRcdFx0Y2FuY2VsU2lnbmFsLFxuXHRcdFx0XHRncmFjZWZ1bENhbmNlbCxcblx0XHRcdFx0Y29udGV4dCxcblx0XHRcdFx0Y29udHJvbGxlcixcblx0XHRcdH0pLFxuXHRcdFx0Li4udGhyb3dPbkdyYWNlZnVsQ2FuY2VsKHtcblx0XHRcdFx0c3VicHJvY2Vzcyxcblx0XHRcdFx0Y2FuY2VsU2lnbmFsLFxuXHRcdFx0XHRncmFjZWZ1bENhbmNlbCxcblx0XHRcdFx0Zm9yY2VLaWxsQWZ0ZXJEZWxheSxcblx0XHRcdFx0Y29udGV4dCxcblx0XHRcdFx0Y29udHJvbGxlcixcblx0XHRcdH0pLFxuXHRcdF0pO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnRleHQudGVybWluYXRpb25SZWFzb24gPz89ICdvdGhlcic7XG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKFtcblx0XHRcdHtlcnJvcn0sXG5cdFx0XHRleGl0UHJvbWlzZSxcblx0XHRcdFByb21pc2UuYWxsKHN0ZGlvUHJvbWlzZXMubWFwKHN0ZGlvUHJvbWlzZSA9PiBnZXRCdWZmZXJlZERhdGEoc3RkaW9Qcm9taXNlKSkpLFxuXHRcdFx0Z2V0QnVmZmVyZWREYXRhKGFsbFByb21pc2UpLFxuXHRcdFx0Z2V0QnVmZmVyZWRJcGNPdXRwdXQoaXBjT3V0cHV0UHJvbWlzZSwgaXBjT3V0cHV0KSxcblx0XHRcdFByb21pc2UuYWxsU2V0dGxlZChvcmlnaW5hbFByb21pc2VzKSxcblx0XHRcdFByb21pc2UuYWxsU2V0dGxlZChjdXN0b21TdHJlYW1zRW5kUHJvbWlzZXMpLFxuXHRcdF0pO1xuXHR9XG59O1xuXG4vLyBUcmFuc2Zvcm1zIHJlcGxhY2UgYHN1YnByb2Nlc3Muc3RkKmAsIHdoaWNoIG1lYW5zIHRoZXkgYXJlIG5vdCBleHBvc2VkIHRvIHVzZXJzLlxuLy8gSG93ZXZlciwgd2Ugc3RpbGwgd2FudCB0byB3YWl0IGZvciB0aGVpciBjb21wbGV0aW9uLlxuY29uc3Qgd2FpdEZvck9yaWdpbmFsU3RyZWFtcyA9IChvcmlnaW5hbFN0cmVhbXMsIHN1YnByb2Nlc3MsIHN0cmVhbUluZm8pID0+XG5cdG9yaWdpbmFsU3RyZWFtcy5tYXAoKHN0cmVhbSwgZmROdW1iZXIpID0+IHN0cmVhbSA9PT0gc3VicHJvY2Vzcy5zdGRpb1tmZE51bWJlcl1cblx0XHQ/IHVuZGVmaW5lZFxuXHRcdDogd2FpdEZvclN0cmVhbShzdHJlYW0sIGZkTnVtYmVyLCBzdHJlYW1JbmZvKSk7XG5cbi8vIFNvbWUgYHN0ZGluYC9gc3Rkb3V0YC9gc3RkZXJyYCBvcHRpb25zIGNyZWF0ZSBhIHN0cmVhbSwgZS5nLiB3aGVuIHBhc3NpbmcgYSBmaWxlIHBhdGguXG4vLyBUaGUgYC5waXBlKClgIG1ldGhvZCBhdXRvbWF0aWNhbGx5IGVuZHMgdGhhdCBzdHJlYW0gd2hlbiBgc3VicHJvY2Vzc2AgZW5kcy5cbi8vIFRoaXMgbWFrZXMgc3VyZSB3ZSB3YWl0IGZvciB0aGUgY29tcGxldGlvbiBvZiB0aG9zZSBzdHJlYW1zLCBpbiBvcmRlciB0byBjYXRjaCBhbnkgZXJyb3IuXG5jb25zdCB3YWl0Rm9yQ3VzdG9tU3RyZWFtc0VuZCA9IChmaWxlRGVzY3JpcHRvcnMsIHN0cmVhbUluZm8pID0+IGZpbGVEZXNjcmlwdG9ycy5mbGF0TWFwKCh7c3RkaW9JdGVtc30sIGZkTnVtYmVyKSA9PiBzdGRpb0l0ZW1zXG5cdC5maWx0ZXIoKHt2YWx1ZSwgc3RyZWFtID0gdmFsdWV9KSA9PiBpc05vZGVTdHJlYW0oc3RyZWFtLCB7Y2hlY2tPcGVuOiBmYWxzZX0pICYmICFpc1N0YW5kYXJkU3RyZWFtKHN0cmVhbSkpXG5cdC5tYXAoKHt0eXBlLCB2YWx1ZSwgc3RyZWFtID0gdmFsdWV9KSA9PiB3YWl0Rm9yU3RyZWFtKHN0cmVhbSwgZmROdW1iZXIsIHN0cmVhbUluZm8sIHtcblx0XHRpc1NhbWVEaXJlY3Rpb246IFRSQU5TRk9STV9UWVBFUy5oYXModHlwZSksXG5cdFx0c3RvcE9uRXhpdDogdHlwZSA9PT0gJ25hdGl2ZScsXG5cdH0pKSk7XG5cbi8vIEZhaWxzIHdoZW4gdGhlIHN1YnByb2Nlc3MgZW1pdHMgYW4gYGVycm9yYCBldmVudFxuY29uc3QgdGhyb3dPblN1YnByb2Nlc3NFcnJvciA9IGFzeW5jIChzdWJwcm9jZXNzLCB7c2lnbmFsfSkgPT4ge1xuXHRjb25zdCBbZXJyb3JdID0gYXdhaXQgb25jZShzdWJwcm9jZXNzLCAnZXJyb3InLCB7c2lnbmFsfSk7XG5cdHRocm93IGVycm9yO1xufTtcbiIsICJpbXBvcnQge2NyZWF0ZURlZmVycmVkfSBmcm9tICcuLi91dGlscy9kZWZlcnJlZC5qcyc7XG5cbi8vIFdoZW4gdXNpbmcgbXVsdGlwbGUgYC5yZWFkYWJsZSgpYC9gLndyaXRhYmxlKClgL2AuZHVwbGV4KClgLCBgZmluYWxgIGFuZCBgZGVzdHJveWAgc2hvdWxkIHdhaXQgZm9yIG90aGVyIHN0cmVhbXNcbmV4cG9ydCBjb25zdCBpbml0aWFsaXplQ29uY3VycmVudFN0cmVhbXMgPSAoKSA9PiAoe1xuXHRyZWFkYWJsZURlc3Ryb3k6IG5ldyBXZWFrTWFwKCksXG5cdHdyaXRhYmxlRmluYWw6IG5ldyBXZWFrTWFwKCksXG5cdHdyaXRhYmxlRGVzdHJveTogbmV3IFdlYWtNYXAoKSxcbn0pO1xuXG4vLyBFYWNoIGZpbGUgZGVzY3JpcHRvciArIGB3YWl0TmFtZWAgaGFzIGl0cyBvd24gYXJyYXkgb2YgcHJvbWlzZXMuXG4vLyBFYWNoIHByb21pc2UgaXMgYSBzaW5nbGUgYC5yZWFkYWJsZSgpYC9gLndyaXRhYmxlKClgL2AuZHVwbGV4KClgIGNhbGwuXG5leHBvcnQgY29uc3QgYWRkQ29uY3VycmVudFN0cmVhbSA9IChjb25jdXJyZW50U3RyZWFtcywgc3RyZWFtLCB3YWl0TmFtZSkgPT4ge1xuXHRjb25zdCB3ZWFrTWFwID0gY29uY3VycmVudFN0cmVhbXNbd2FpdE5hbWVdO1xuXHRpZiAoIXdlYWtNYXAuaGFzKHN0cmVhbSkpIHtcblx0XHR3ZWFrTWFwLnNldChzdHJlYW0sIFtdKTtcblx0fVxuXG5cdGNvbnN0IHByb21pc2VzID0gd2Vha01hcC5nZXQoc3RyZWFtKTtcblx0Y29uc3QgcHJvbWlzZSA9IGNyZWF0ZURlZmVycmVkKCk7XG5cdHByb21pc2VzLnB1c2gocHJvbWlzZSk7XG5cdGNvbnN0IHJlc29sdmUgPSBwcm9taXNlLnJlc29sdmUuYmluZChwcm9taXNlKTtcblx0cmV0dXJuIHtyZXNvbHZlLCBwcm9taXNlc307XG59O1xuXG4vLyBXYWl0IGZvciBvdGhlciBzdHJlYW1zLCBidXQgc3RvcCB3YWl0aW5nIHdoZW4gc3VicHJvY2VzcyBlbmRzXG5leHBvcnQgY29uc3Qgd2FpdEZvckNvbmN1cnJlbnRTdHJlYW1zID0gYXN5bmMgKHtyZXNvbHZlLCBwcm9taXNlc30sIHN1YnByb2Nlc3MpID0+IHtcblx0cmVzb2x2ZSgpO1xuXHRjb25zdCBbaXNTdWJwcm9jZXNzRXhpdF0gPSBhd2FpdCBQcm9taXNlLnJhY2UoW1xuXHRcdFByb21pc2UuYWxsU2V0dGxlZChbdHJ1ZSwgc3VicHJvY2Vzc10pLFxuXHRcdFByb21pc2UuYWxsKFtmYWxzZSwgLi4ucHJvbWlzZXNdKSxcblx0XSk7XG5cdHJldHVybiAhaXNTdWJwcm9jZXNzRXhpdDtcbn07XG4iLCAiaW1wb3J0IHtmaW5pc2hlZH0gZnJvbSAnbm9kZTpzdHJlYW0vcHJvbWlzZXMnO1xuaW1wb3J0IHtpc1N0cmVhbUFib3J0fSBmcm9tICcuLi9yZXNvbHZlL3dhaXQtc3RyZWFtLmpzJztcblxuZXhwb3J0IGNvbnN0IHNhZmVXYWl0Rm9yU3VicHJvY2Vzc1N0ZGluID0gYXN5bmMgc3VicHJvY2Vzc1N0ZGluID0+IHtcblx0aWYgKHN1YnByb2Nlc3NTdGRpbiA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dHJ5IHtcblx0XHRhd2FpdCB3YWl0Rm9yU3VicHJvY2Vzc1N0ZGluKHN1YnByb2Nlc3NTdGRpbik7XG5cdH0gY2F0Y2gge31cbn07XG5cbmV4cG9ydCBjb25zdCBzYWZlV2FpdEZvclN1YnByb2Nlc3NTdGRvdXQgPSBhc3luYyBzdWJwcm9jZXNzU3Rkb3V0ID0+IHtcblx0aWYgKHN1YnByb2Nlc3NTdGRvdXQgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHRyeSB7XG5cdFx0YXdhaXQgd2FpdEZvclN1YnByb2Nlc3NTdGRvdXQoc3VicHJvY2Vzc1N0ZG91dCk7XG5cdH0gY2F0Y2gge31cbn07XG5cbmV4cG9ydCBjb25zdCB3YWl0Rm9yU3VicHJvY2Vzc1N0ZGluID0gYXN5bmMgc3VicHJvY2Vzc1N0ZGluID0+IHtcblx0YXdhaXQgZmluaXNoZWQoc3VicHJvY2Vzc1N0ZGluLCB7Y2xlYW51cDogdHJ1ZSwgcmVhZGFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZX0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHdhaXRGb3JTdWJwcm9jZXNzU3Rkb3V0ID0gYXN5bmMgc3VicHJvY2Vzc1N0ZG91dCA9PiB7XG5cdGF3YWl0IGZpbmlzaGVkKHN1YnByb2Nlc3NTdGRvdXQsIHtjbGVhbnVwOiB0cnVlLCByZWFkYWJsZTogdHJ1ZSwgd3JpdGFibGU6IGZhbHNlfSk7XG59O1xuXG4vLyBXaGVuIGByZWFkYWJsZWAgb3IgYHdyaXRhYmxlYCBhYm9ydHMvZXJyb3JzLCBhd2FpdHMgdGhlIHN1YnByb2Nlc3MsIGZvciB0aGUgcmVhc29uIG1lbnRpb25lZCBhYm92ZVxuZXhwb3J0IGNvbnN0IHdhaXRGb3JTdWJwcm9jZXNzID0gYXN5bmMgKHN1YnByb2Nlc3MsIGVycm9yKSA9PiB7XG5cdGF3YWl0IHN1YnByb2Nlc3M7XG5cdGlmIChlcnJvcikge1xuXHRcdHRocm93IGVycm9yO1xuXHR9XG59O1xuXG5leHBvcnQgY29uc3QgZGVzdHJveU90aGVyU3RyZWFtID0gKHN0cmVhbSwgaXNPcGVuLCBlcnJvcikgPT4ge1xuXHRpZiAoZXJyb3IgJiYgIWlzU3RyZWFtQWJvcnQoZXJyb3IpKSB7XG5cdFx0c3RyZWFtLmRlc3Ryb3koZXJyb3IpO1xuXHR9IGVsc2UgaWYgKGlzT3Blbikge1xuXHRcdHN0cmVhbS5kZXN0cm95KCk7XG5cdH1cbn07XG4iLCAiaW1wb3J0IHtSZWFkYWJsZX0gZnJvbSAnbm9kZTpzdHJlYW0nO1xuaW1wb3J0IHtjYWxsYmFja2lmeX0gZnJvbSAnbm9kZTp1dGlsJztcbmltcG9ydCB7QklOQVJZX0VOQ09ESU5HU30gZnJvbSAnLi4vYXJndW1lbnRzL2VuY29kaW5nLW9wdGlvbi5qcyc7XG5pbXBvcnQge2dldEZyb21TdHJlYW19IGZyb20gJy4uL2FyZ3VtZW50cy9mZC1vcHRpb25zLmpzJztcbmltcG9ydCB7aXRlcmF0ZU9uU3VicHJvY2Vzc1N0cmVhbSwgREVGQVVMVF9PQkpFQ1RfSElHSF9XQVRFUl9NQVJLfSBmcm9tICcuLi9pby9pdGVyYXRlLmpzJztcbmltcG9ydCB7Y3JlYXRlRGVmZXJyZWR9IGZyb20gJy4uL3V0aWxzL2RlZmVycmVkLmpzJztcbmltcG9ydCB7YWRkQ29uY3VycmVudFN0cmVhbSwgd2FpdEZvckNvbmN1cnJlbnRTdHJlYW1zfSBmcm9tICcuL2NvbmN1cnJlbnQuanMnO1xuaW1wb3J0IHtcblx0c2FmZVdhaXRGb3JTdWJwcm9jZXNzU3RkaW4sXG5cdHdhaXRGb3JTdWJwcm9jZXNzU3Rkb3V0LFxuXHR3YWl0Rm9yU3VicHJvY2Vzcyxcblx0ZGVzdHJveU90aGVyU3RyZWFtLFxufSBmcm9tICcuL3NoYXJlZC5qcyc7XG5cbi8vIENyZWF0ZSBhIGBSZWFkYWJsZWAgc3RyZWFtIHRoYXQgZm9yd2FyZHMgZnJvbSBgc3Rkb3V0YCBhbmQgYXdhaXRzIHRoZSBzdWJwcm9jZXNzXG5leHBvcnQgY29uc3QgY3JlYXRlUmVhZGFibGUgPSAoe3N1YnByb2Nlc3MsIGNvbmN1cnJlbnRTdHJlYW1zLCBlbmNvZGluZ30sIHtmcm9tLCBiaW5hcnk6IGJpbmFyeU9wdGlvbiA9IHRydWUsIHByZXNlcnZlTmV3bGluZXMgPSB0cnVlfSA9IHt9KSA9PiB7XG5cdGNvbnN0IGJpbmFyeSA9IGJpbmFyeU9wdGlvbiB8fCBCSU5BUllfRU5DT0RJTkdTLmhhcyhlbmNvZGluZyk7XG5cdGNvbnN0IHtzdWJwcm9jZXNzU3Rkb3V0LCB3YWl0UmVhZGFibGVEZXN0cm95fSA9IGdldFN1YnByb2Nlc3NTdGRvdXQoc3VicHJvY2VzcywgZnJvbSwgY29uY3VycmVudFN0cmVhbXMpO1xuXHRjb25zdCB7cmVhZGFibGVFbmNvZGluZywgcmVhZGFibGVPYmplY3RNb2RlLCByZWFkYWJsZUhpZ2hXYXRlck1hcmt9ID0gZ2V0UmVhZGFibGVPcHRpb25zKHN1YnByb2Nlc3NTdGRvdXQsIGJpbmFyeSk7XG5cdGNvbnN0IHtyZWFkLCBvblN0ZG91dERhdGFEb25lfSA9IGdldFJlYWRhYmxlTWV0aG9kcyh7XG5cdFx0c3VicHJvY2Vzc1N0ZG91dCxcblx0XHRzdWJwcm9jZXNzLFxuXHRcdGJpbmFyeSxcblx0XHRlbmNvZGluZyxcblx0XHRwcmVzZXJ2ZU5ld2xpbmVzLFxuXHR9KTtcblx0Y29uc3QgcmVhZGFibGUgPSBuZXcgUmVhZGFibGUoe1xuXHRcdHJlYWQsXG5cdFx0ZGVzdHJveTogY2FsbGJhY2tpZnkob25SZWFkYWJsZURlc3Ryb3kuYmluZCh1bmRlZmluZWQsIHtzdWJwcm9jZXNzU3Rkb3V0LCBzdWJwcm9jZXNzLCB3YWl0UmVhZGFibGVEZXN0cm95fSkpLFxuXHRcdGhpZ2hXYXRlck1hcms6IHJlYWRhYmxlSGlnaFdhdGVyTWFyayxcblx0XHRvYmplY3RNb2RlOiByZWFkYWJsZU9iamVjdE1vZGUsXG5cdFx0ZW5jb2Rpbmc6IHJlYWRhYmxlRW5jb2RpbmcsXG5cdH0pO1xuXHRvblN0ZG91dEZpbmlzaGVkKHtcblx0XHRzdWJwcm9jZXNzU3Rkb3V0LFxuXHRcdG9uU3Rkb3V0RGF0YURvbmUsXG5cdFx0cmVhZGFibGUsXG5cdFx0c3VicHJvY2Vzcyxcblx0fSk7XG5cdHJldHVybiByZWFkYWJsZTtcbn07XG5cbi8vIFJldHJpZXZlIGBzdGRvdXRgIChvciBvdGhlciBzdHJlYW0gZGVwZW5kaW5nIG9uIGBmcm9tYClcbmV4cG9ydCBjb25zdCBnZXRTdWJwcm9jZXNzU3Rkb3V0ID0gKHN1YnByb2Nlc3MsIGZyb20sIGNvbmN1cnJlbnRTdHJlYW1zKSA9PiB7XG5cdGNvbnN0IHN1YnByb2Nlc3NTdGRvdXQgPSBnZXRGcm9tU3RyZWFtKHN1YnByb2Nlc3MsIGZyb20pO1xuXHRjb25zdCB3YWl0UmVhZGFibGVEZXN0cm95ID0gYWRkQ29uY3VycmVudFN0cmVhbShjb25jdXJyZW50U3RyZWFtcywgc3VicHJvY2Vzc1N0ZG91dCwgJ3JlYWRhYmxlRGVzdHJveScpO1xuXHRyZXR1cm4ge3N1YnByb2Nlc3NTdGRvdXQsIHdhaXRSZWFkYWJsZURlc3Ryb3l9O1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFJlYWRhYmxlT3B0aW9ucyA9ICh7cmVhZGFibGVFbmNvZGluZywgcmVhZGFibGVPYmplY3RNb2RlLCByZWFkYWJsZUhpZ2hXYXRlck1hcmt9LCBiaW5hcnkpID0+IGJpbmFyeVxuXHQ/IHtyZWFkYWJsZUVuY29kaW5nLCByZWFkYWJsZU9iamVjdE1vZGUsIHJlYWRhYmxlSGlnaFdhdGVyTWFya31cblx0OiB7cmVhZGFibGVFbmNvZGluZywgcmVhZGFibGVPYmplY3RNb2RlOiB0cnVlLCByZWFkYWJsZUhpZ2hXYXRlck1hcms6IERFRkFVTFRfT0JKRUNUX0hJR0hfV0FURVJfTUFSS307XG5cbmV4cG9ydCBjb25zdCBnZXRSZWFkYWJsZU1ldGhvZHMgPSAoe3N1YnByb2Nlc3NTdGRvdXQsIHN1YnByb2Nlc3MsIGJpbmFyeSwgZW5jb2RpbmcsIHByZXNlcnZlTmV3bGluZXN9KSA9PiB7XG5cdGNvbnN0IG9uU3Rkb3V0RGF0YURvbmUgPSBjcmVhdGVEZWZlcnJlZCgpO1xuXHRjb25zdCBvblN0ZG91dERhdGEgPSBpdGVyYXRlT25TdWJwcm9jZXNzU3RyZWFtKHtcblx0XHRzdWJwcm9jZXNzU3Rkb3V0LFxuXHRcdHN1YnByb2Nlc3MsXG5cdFx0YmluYXJ5LFxuXHRcdHNob3VsZEVuY29kZTogIWJpbmFyeSxcblx0XHRlbmNvZGluZyxcblx0XHRwcmVzZXJ2ZU5ld2xpbmVzLFxuXHR9KTtcblxuXHRyZXR1cm4ge1xuXHRcdHJlYWQoKSB7XG5cdFx0XHRvblJlYWQodGhpcywgb25TdGRvdXREYXRhLCBvblN0ZG91dERhdGFEb25lKTtcblx0XHR9LFxuXHRcdG9uU3Rkb3V0RGF0YURvbmUsXG5cdH07XG59O1xuXG4vLyBGb3J3YXJkcyBkYXRhIGZyb20gYHN0ZG91dGAgdG8gYHJlYWRhYmxlYFxuY29uc3Qgb25SZWFkID0gYXN5bmMgKHJlYWRhYmxlLCBvblN0ZG91dERhdGEsIG9uU3Rkb3V0RGF0YURvbmUpID0+IHtcblx0dHJ5IHtcblx0XHRjb25zdCB7dmFsdWUsIGRvbmV9ID0gYXdhaXQgb25TdGRvdXREYXRhLm5leHQoKTtcblx0XHRpZiAoZG9uZSkge1xuXHRcdFx0b25TdGRvdXREYXRhRG9uZS5yZXNvbHZlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlYWRhYmxlLnB1c2godmFsdWUpO1xuXHRcdH1cblx0fSBjYXRjaCB7fVxufTtcblxuLy8gV2hlbiBgc3VicHJvY2Vzcy5zdGRvdXRgIGVuZHMvYWJvcnRzL2Vycm9ycywgZG8gdGhlIHNhbWUgb24gYHJlYWRhYmxlYC5cbi8vIEF3YWl0IHRoZSBzdWJwcm9jZXNzLCBmb3IgdGhlIHNhbWUgcmVhc29uIGFzIGFib3ZlLlxuZXhwb3J0IGNvbnN0IG9uU3Rkb3V0RmluaXNoZWQgPSBhc3luYyAoe3N1YnByb2Nlc3NTdGRvdXQsIG9uU3Rkb3V0RGF0YURvbmUsIHJlYWRhYmxlLCBzdWJwcm9jZXNzLCBzdWJwcm9jZXNzU3RkaW59KSA9PiB7XG5cdHRyeSB7XG5cdFx0YXdhaXQgd2FpdEZvclN1YnByb2Nlc3NTdGRvdXQoc3VicHJvY2Vzc1N0ZG91dCk7XG5cdFx0YXdhaXQgc3VicHJvY2Vzcztcblx0XHRhd2FpdCBzYWZlV2FpdEZvclN1YnByb2Nlc3NTdGRpbihzdWJwcm9jZXNzU3RkaW4pO1xuXHRcdGF3YWl0IG9uU3Rkb3V0RGF0YURvbmU7XG5cblx0XHRpZiAocmVhZGFibGUucmVhZGFibGUpIHtcblx0XHRcdHJlYWRhYmxlLnB1c2gobnVsbCk7XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGF3YWl0IHNhZmVXYWl0Rm9yU3VicHJvY2Vzc1N0ZGluKHN1YnByb2Nlc3NTdGRpbik7XG5cdFx0ZGVzdHJveU90aGVyUmVhZGFibGUocmVhZGFibGUsIGVycm9yKTtcblx0fVxufTtcblxuLy8gV2hlbiBgcmVhZGFibGVgIGFib3J0cy9lcnJvcnMsIGRvIHRoZSBzYW1lIG9uIGBzdWJwcm9jZXNzLnN0ZG91dGBcbmV4cG9ydCBjb25zdCBvblJlYWRhYmxlRGVzdHJveSA9IGFzeW5jICh7c3VicHJvY2Vzc1N0ZG91dCwgc3VicHJvY2Vzcywgd2FpdFJlYWRhYmxlRGVzdHJveX0sIGVycm9yKSA9PiB7XG5cdGlmIChhd2FpdCB3YWl0Rm9yQ29uY3VycmVudFN0cmVhbXMod2FpdFJlYWRhYmxlRGVzdHJveSwgc3VicHJvY2VzcykpIHtcblx0XHRkZXN0cm95T3RoZXJSZWFkYWJsZShzdWJwcm9jZXNzU3Rkb3V0LCBlcnJvcik7XG5cdFx0YXdhaXQgd2FpdEZvclN1YnByb2Nlc3Moc3VicHJvY2VzcywgZXJyb3IpO1xuXHR9XG59O1xuXG5jb25zdCBkZXN0cm95T3RoZXJSZWFkYWJsZSA9IChzdHJlYW0sIGVycm9yKSA9PiB7XG5cdGRlc3Ryb3lPdGhlclN0cmVhbShzdHJlYW0sIHN0cmVhbS5yZWFkYWJsZSwgZXJyb3IpO1xufTtcbiIsICJpbXBvcnQge1dyaXRhYmxlfSBmcm9tICdub2RlOnN0cmVhbSc7XG5pbXBvcnQge2NhbGxiYWNraWZ5fSBmcm9tICdub2RlOnV0aWwnO1xuaW1wb3J0IHtnZXRUb1N0cmVhbX0gZnJvbSAnLi4vYXJndW1lbnRzL2ZkLW9wdGlvbnMuanMnO1xuaW1wb3J0IHthZGRDb25jdXJyZW50U3RyZWFtLCB3YWl0Rm9yQ29uY3VycmVudFN0cmVhbXN9IGZyb20gJy4vY29uY3VycmVudC5qcyc7XG5pbXBvcnQge1xuXHRzYWZlV2FpdEZvclN1YnByb2Nlc3NTdGRvdXQsXG5cdHdhaXRGb3JTdWJwcm9jZXNzU3RkaW4sXG5cdHdhaXRGb3JTdWJwcm9jZXNzLFxuXHRkZXN0cm95T3RoZXJTdHJlYW0sXG59IGZyb20gJy4vc2hhcmVkLmpzJztcblxuLy8gQ3JlYXRlIGEgYFdyaXRhYmxlYCBzdHJlYW0gdGhhdCBmb3J3YXJkcyB0byBgc3RkaW5gIGFuZCBhd2FpdHMgdGhlIHN1YnByb2Nlc3NcbmV4cG9ydCBjb25zdCBjcmVhdGVXcml0YWJsZSA9ICh7c3VicHJvY2VzcywgY29uY3VycmVudFN0cmVhbXN9LCB7dG99ID0ge30pID0+IHtcblx0Y29uc3Qge3N1YnByb2Nlc3NTdGRpbiwgd2FpdFdyaXRhYmxlRmluYWwsIHdhaXRXcml0YWJsZURlc3Ryb3l9ID0gZ2V0U3VicHJvY2Vzc1N0ZGluKHN1YnByb2Nlc3MsIHRvLCBjb25jdXJyZW50U3RyZWFtcyk7XG5cdGNvbnN0IHdyaXRhYmxlID0gbmV3IFdyaXRhYmxlKHtcblx0XHQuLi5nZXRXcml0YWJsZU1ldGhvZHMoc3VicHJvY2Vzc1N0ZGluLCBzdWJwcm9jZXNzLCB3YWl0V3JpdGFibGVGaW5hbCksXG5cdFx0ZGVzdHJveTogY2FsbGJhY2tpZnkob25Xcml0YWJsZURlc3Ryb3kuYmluZCh1bmRlZmluZWQsIHtcblx0XHRcdHN1YnByb2Nlc3NTdGRpbixcblx0XHRcdHN1YnByb2Nlc3MsXG5cdFx0XHR3YWl0V3JpdGFibGVGaW5hbCxcblx0XHRcdHdhaXRXcml0YWJsZURlc3Ryb3ksXG5cdFx0fSkpLFxuXHRcdGhpZ2hXYXRlck1hcms6IHN1YnByb2Nlc3NTdGRpbi53cml0YWJsZUhpZ2hXYXRlck1hcmssXG5cdFx0b2JqZWN0TW9kZTogc3VicHJvY2Vzc1N0ZGluLndyaXRhYmxlT2JqZWN0TW9kZSxcblx0fSk7XG5cdG9uU3RkaW5GaW5pc2hlZChzdWJwcm9jZXNzU3RkaW4sIHdyaXRhYmxlKTtcblx0cmV0dXJuIHdyaXRhYmxlO1xufTtcblxuLy8gUmV0cmlldmUgYHN0ZGluYCAob3Igb3RoZXIgc3RyZWFtIGRlcGVuZGluZyBvbiBgdG9gKVxuZXhwb3J0IGNvbnN0IGdldFN1YnByb2Nlc3NTdGRpbiA9IChzdWJwcm9jZXNzLCB0bywgY29uY3VycmVudFN0cmVhbXMpID0+IHtcblx0Y29uc3Qgc3VicHJvY2Vzc1N0ZGluID0gZ2V0VG9TdHJlYW0oc3VicHJvY2VzcywgdG8pO1xuXHRjb25zdCB3YWl0V3JpdGFibGVGaW5hbCA9IGFkZENvbmN1cnJlbnRTdHJlYW0oY29uY3VycmVudFN0cmVhbXMsIHN1YnByb2Nlc3NTdGRpbiwgJ3dyaXRhYmxlRmluYWwnKTtcblx0Y29uc3Qgd2FpdFdyaXRhYmxlRGVzdHJveSA9IGFkZENvbmN1cnJlbnRTdHJlYW0oY29uY3VycmVudFN0cmVhbXMsIHN1YnByb2Nlc3NTdGRpbiwgJ3dyaXRhYmxlRGVzdHJveScpO1xuXHRyZXR1cm4ge3N1YnByb2Nlc3NTdGRpbiwgd2FpdFdyaXRhYmxlRmluYWwsIHdhaXRXcml0YWJsZURlc3Ryb3l9O1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFdyaXRhYmxlTWV0aG9kcyA9IChzdWJwcm9jZXNzU3RkaW4sIHN1YnByb2Nlc3MsIHdhaXRXcml0YWJsZUZpbmFsKSA9PiAoe1xuXHR3cml0ZTogb25Xcml0ZS5iaW5kKHVuZGVmaW5lZCwgc3VicHJvY2Vzc1N0ZGluKSxcblx0ZmluYWw6IGNhbGxiYWNraWZ5KG9uV3JpdGFibGVGaW5hbC5iaW5kKHVuZGVmaW5lZCwgc3VicHJvY2Vzc1N0ZGluLCBzdWJwcm9jZXNzLCB3YWl0V3JpdGFibGVGaW5hbCkpLFxufSk7XG5cbi8vIEZvcndhcmRzIGRhdGEgZnJvbSBgd3JpdGFibGVgIHRvIGBzdGRpbmBcbmNvbnN0IG9uV3JpdGUgPSAoc3VicHJvY2Vzc1N0ZGluLCBjaHVuaywgZW5jb2RpbmcsIGRvbmUpID0+IHtcblx0aWYgKHN1YnByb2Nlc3NTdGRpbi53cml0ZShjaHVuaywgZW5jb2RpbmcpKSB7XG5cdFx0ZG9uZSgpO1xuXHR9IGVsc2Uge1xuXHRcdHN1YnByb2Nlc3NTdGRpbi5vbmNlKCdkcmFpbicsIGRvbmUpO1xuXHR9XG59O1xuXG4vLyBFbnN1cmVzIHRoYXQgdGhlIHdyaXRhYmxlIGBmaW5hbGAgYW5kIHJlYWRhYmxlIGBlbmRgIGV2ZW50cyBhd2FpdHMgdGhlIHN1YnByb2Nlc3MuXG4vLyBMaWtlIHRoaXMsIGFueSBzdWJwcm9jZXNzIGZhaWx1cmUgaXMgcHJvcGFnYXRlZCBhcyBhIHN0cmVhbSBgZXJyb3JgIGV2ZW50LCBpbnN0ZWFkIG9mIGJlaW5nIGxvc3QuXG4vLyBUaGUgdXNlciBkb2VzIG5vdCBuZWVkIHRvIGBhd2FpdGAgdGhlIHN1YnByb2Nlc3MgYW55bW9yZSwgYnV0IG5vdyBuZWVkcyB0byBhd2FpdCB0aGUgc3RyZWFtIGNvbXBsZXRpb24gb3IgZXJyb3IuXG4vLyBXaGVuIG11bHRpcGxlIHdyaXRhYmxlcyBhcmUgdGFyZ2V0aW5nIHRoZSBzYW1lIHN0cmVhbSwgdGhleSB3YWl0IGZvciBlYWNoIG90aGVyLCB1bmxlc3MgdGhlIHN1YnByb2Nlc3MgZW5kcyBmaXJzdC5cbmNvbnN0IG9uV3JpdGFibGVGaW5hbCA9IGFzeW5jIChzdWJwcm9jZXNzU3RkaW4sIHN1YnByb2Nlc3MsIHdhaXRXcml0YWJsZUZpbmFsKSA9PiB7XG5cdGlmIChhd2FpdCB3YWl0Rm9yQ29uY3VycmVudFN0cmVhbXMod2FpdFdyaXRhYmxlRmluYWwsIHN1YnByb2Nlc3MpKSB7XG5cdFx0aWYgKHN1YnByb2Nlc3NTdGRpbi53cml0YWJsZSkge1xuXHRcdFx0c3VicHJvY2Vzc1N0ZGluLmVuZCgpO1xuXHRcdH1cblxuXHRcdGF3YWl0IHN1YnByb2Nlc3M7XG5cdH1cbn07XG5cbi8vIFdoZW4gYHN1YnByb2Nlc3Muc3RkaW5gIGVuZHMvYWJvcnRzL2Vycm9ycywgZG8gdGhlIHNhbWUgb24gYHdyaXRhYmxlYC5cbmV4cG9ydCBjb25zdCBvblN0ZGluRmluaXNoZWQgPSBhc3luYyAoc3VicHJvY2Vzc1N0ZGluLCB3cml0YWJsZSwgc3VicHJvY2Vzc1N0ZG91dCkgPT4ge1xuXHR0cnkge1xuXHRcdGF3YWl0IHdhaXRGb3JTdWJwcm9jZXNzU3RkaW4oc3VicHJvY2Vzc1N0ZGluKTtcblx0XHRpZiAod3JpdGFibGUud3JpdGFibGUpIHtcblx0XHRcdHdyaXRhYmxlLmVuZCgpO1xuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRhd2FpdCBzYWZlV2FpdEZvclN1YnByb2Nlc3NTdGRvdXQoc3VicHJvY2Vzc1N0ZG91dCk7XG5cdFx0ZGVzdHJveU90aGVyV3JpdGFibGUod3JpdGFibGUsIGVycm9yKTtcblx0fVxufTtcblxuLy8gV2hlbiBgd3JpdGFibGVgIGFib3J0cy9lcnJvcnMsIGRvIHRoZSBzYW1lIG9uIGBzdWJwcm9jZXNzLnN0ZGluYFxuZXhwb3J0IGNvbnN0IG9uV3JpdGFibGVEZXN0cm95ID0gYXN5bmMgKHtzdWJwcm9jZXNzU3RkaW4sIHN1YnByb2Nlc3MsIHdhaXRXcml0YWJsZUZpbmFsLCB3YWl0V3JpdGFibGVEZXN0cm95fSwgZXJyb3IpID0+IHtcblx0YXdhaXQgd2FpdEZvckNvbmN1cnJlbnRTdHJlYW1zKHdhaXRXcml0YWJsZUZpbmFsLCBzdWJwcm9jZXNzKTtcblx0aWYgKGF3YWl0IHdhaXRGb3JDb25jdXJyZW50U3RyZWFtcyh3YWl0V3JpdGFibGVEZXN0cm95LCBzdWJwcm9jZXNzKSkge1xuXHRcdGRlc3Ryb3lPdGhlcldyaXRhYmxlKHN1YnByb2Nlc3NTdGRpbiwgZXJyb3IpO1xuXHRcdGF3YWl0IHdhaXRGb3JTdWJwcm9jZXNzKHN1YnByb2Nlc3MsIGVycm9yKTtcblx0fVxufTtcblxuY29uc3QgZGVzdHJveU90aGVyV3JpdGFibGUgPSAoc3RyZWFtLCBlcnJvcikgPT4ge1xuXHRkZXN0cm95T3RoZXJTdHJlYW0oc3RyZWFtLCBzdHJlYW0ud3JpdGFibGUsIGVycm9yKTtcbn07XG4iLCAiaW1wb3J0IHtEdXBsZXh9IGZyb20gJ25vZGU6c3RyZWFtJztcbmltcG9ydCB7Y2FsbGJhY2tpZnl9IGZyb20gJ25vZGU6dXRpbCc7XG5pbXBvcnQge0JJTkFSWV9FTkNPRElOR1N9IGZyb20gJy4uL2FyZ3VtZW50cy9lbmNvZGluZy1vcHRpb24uanMnO1xuaW1wb3J0IHtcblx0Z2V0U3VicHJvY2Vzc1N0ZG91dCxcblx0Z2V0UmVhZGFibGVPcHRpb25zLFxuXHRnZXRSZWFkYWJsZU1ldGhvZHMsXG5cdG9uU3Rkb3V0RmluaXNoZWQsXG5cdG9uUmVhZGFibGVEZXN0cm95LFxufSBmcm9tICcuL3JlYWRhYmxlLmpzJztcbmltcG9ydCB7XG5cdGdldFN1YnByb2Nlc3NTdGRpbixcblx0Z2V0V3JpdGFibGVNZXRob2RzLFxuXHRvblN0ZGluRmluaXNoZWQsXG5cdG9uV3JpdGFibGVEZXN0cm95LFxufSBmcm9tICcuL3dyaXRhYmxlLmpzJztcblxuLy8gQ3JlYXRlIGEgYER1cGxleGAgc3RyZWFtIGNvbWJpbmluZyBib3RoIGBzdWJwcm9jZXNzLnJlYWRhYmxlKClgIGFuZCBgc3VicHJvY2Vzcy53cml0YWJsZSgpYFxuZXhwb3J0IGNvbnN0IGNyZWF0ZUR1cGxleCA9ICh7c3VicHJvY2VzcywgY29uY3VycmVudFN0cmVhbXMsIGVuY29kaW5nfSwge2Zyb20sIHRvLCBiaW5hcnk6IGJpbmFyeU9wdGlvbiA9IHRydWUsIHByZXNlcnZlTmV3bGluZXMgPSB0cnVlfSA9IHt9KSA9PiB7XG5cdGNvbnN0IGJpbmFyeSA9IGJpbmFyeU9wdGlvbiB8fCBCSU5BUllfRU5DT0RJTkdTLmhhcyhlbmNvZGluZyk7XG5cdGNvbnN0IHtzdWJwcm9jZXNzU3Rkb3V0LCB3YWl0UmVhZGFibGVEZXN0cm95fSA9IGdldFN1YnByb2Nlc3NTdGRvdXQoc3VicHJvY2VzcywgZnJvbSwgY29uY3VycmVudFN0cmVhbXMpO1xuXHRjb25zdCB7c3VicHJvY2Vzc1N0ZGluLCB3YWl0V3JpdGFibGVGaW5hbCwgd2FpdFdyaXRhYmxlRGVzdHJveX0gPSBnZXRTdWJwcm9jZXNzU3RkaW4oc3VicHJvY2VzcywgdG8sIGNvbmN1cnJlbnRTdHJlYW1zKTtcblx0Y29uc3Qge3JlYWRhYmxlRW5jb2RpbmcsIHJlYWRhYmxlT2JqZWN0TW9kZSwgcmVhZGFibGVIaWdoV2F0ZXJNYXJrfSA9IGdldFJlYWRhYmxlT3B0aW9ucyhzdWJwcm9jZXNzU3Rkb3V0LCBiaW5hcnkpO1xuXHRjb25zdCB7cmVhZCwgb25TdGRvdXREYXRhRG9uZX0gPSBnZXRSZWFkYWJsZU1ldGhvZHMoe1xuXHRcdHN1YnByb2Nlc3NTdGRvdXQsXG5cdFx0c3VicHJvY2Vzcyxcblx0XHRiaW5hcnksXG5cdFx0ZW5jb2RpbmcsXG5cdFx0cHJlc2VydmVOZXdsaW5lcyxcblx0fSk7XG5cdGNvbnN0IGR1cGxleCA9IG5ldyBEdXBsZXgoe1xuXHRcdHJlYWQsXG5cdFx0Li4uZ2V0V3JpdGFibGVNZXRob2RzKHN1YnByb2Nlc3NTdGRpbiwgc3VicHJvY2Vzcywgd2FpdFdyaXRhYmxlRmluYWwpLFxuXHRcdGRlc3Ryb3k6IGNhbGxiYWNraWZ5KG9uRHVwbGV4RGVzdHJveS5iaW5kKHVuZGVmaW5lZCwge1xuXHRcdFx0c3VicHJvY2Vzc1N0ZG91dCxcblx0XHRcdHN1YnByb2Nlc3NTdGRpbixcblx0XHRcdHN1YnByb2Nlc3MsXG5cdFx0XHR3YWl0UmVhZGFibGVEZXN0cm95LFxuXHRcdFx0d2FpdFdyaXRhYmxlRmluYWwsXG5cdFx0XHR3YWl0V3JpdGFibGVEZXN0cm95LFxuXHRcdH0pKSxcblx0XHRyZWFkYWJsZUhpZ2hXYXRlck1hcmssXG5cdFx0d3JpdGFibGVIaWdoV2F0ZXJNYXJrOiBzdWJwcm9jZXNzU3RkaW4ud3JpdGFibGVIaWdoV2F0ZXJNYXJrLFxuXHRcdHJlYWRhYmxlT2JqZWN0TW9kZSxcblx0XHR3cml0YWJsZU9iamVjdE1vZGU6IHN1YnByb2Nlc3NTdGRpbi53cml0YWJsZU9iamVjdE1vZGUsXG5cdFx0ZW5jb2Rpbmc6IHJlYWRhYmxlRW5jb2RpbmcsXG5cdH0pO1xuXHRvblN0ZG91dEZpbmlzaGVkKHtcblx0XHRzdWJwcm9jZXNzU3Rkb3V0LFxuXHRcdG9uU3Rkb3V0RGF0YURvbmUsXG5cdFx0cmVhZGFibGU6IGR1cGxleCxcblx0XHRzdWJwcm9jZXNzLFxuXHRcdHN1YnByb2Nlc3NTdGRpbixcblx0fSk7XG5cdG9uU3RkaW5GaW5pc2hlZChzdWJwcm9jZXNzU3RkaW4sIGR1cGxleCwgc3VicHJvY2Vzc1N0ZG91dCk7XG5cdHJldHVybiBkdXBsZXg7XG59O1xuXG5jb25zdCBvbkR1cGxleERlc3Ryb3kgPSBhc3luYyAoe3N1YnByb2Nlc3NTdGRvdXQsIHN1YnByb2Nlc3NTdGRpbiwgc3VicHJvY2Vzcywgd2FpdFJlYWRhYmxlRGVzdHJveSwgd2FpdFdyaXRhYmxlRmluYWwsIHdhaXRXcml0YWJsZURlc3Ryb3l9LCBlcnJvcikgPT4ge1xuXHRhd2FpdCBQcm9taXNlLmFsbChbXG5cdFx0b25SZWFkYWJsZURlc3Ryb3koe3N1YnByb2Nlc3NTdGRvdXQsIHN1YnByb2Nlc3MsIHdhaXRSZWFkYWJsZURlc3Ryb3l9LCBlcnJvciksXG5cdFx0b25Xcml0YWJsZURlc3Ryb3koe1xuXHRcdFx0c3VicHJvY2Vzc1N0ZGluLFxuXHRcdFx0c3VicHJvY2Vzcyxcblx0XHRcdHdhaXRXcml0YWJsZUZpbmFsLFxuXHRcdFx0d2FpdFdyaXRhYmxlRGVzdHJveSxcblx0XHR9LCBlcnJvciksXG5cdF0pO1xufTtcbiIsICJpbXBvcnQge0JJTkFSWV9FTkNPRElOR1N9IGZyb20gJy4uL2FyZ3VtZW50cy9lbmNvZGluZy1vcHRpb24uanMnO1xuaW1wb3J0IHtnZXRGcm9tU3RyZWFtfSBmcm9tICcuLi9hcmd1bWVudHMvZmQtb3B0aW9ucy5qcyc7XG5pbXBvcnQge2l0ZXJhdGVPblN1YnByb2Nlc3NTdHJlYW19IGZyb20gJy4uL2lvL2l0ZXJhdGUuanMnO1xuXG4vLyBDb252ZXJ0IHRoZSBzdWJwcm9jZXNzIHRvIGFuIGFzeW5jIGl0ZXJhYmxlXG5leHBvcnQgY29uc3QgY3JlYXRlSXRlcmFibGUgPSAoc3VicHJvY2VzcywgZW5jb2RpbmcsIHtcblx0ZnJvbSxcblx0YmluYXJ5OiBiaW5hcnlPcHRpb24gPSBmYWxzZSxcblx0cHJlc2VydmVOZXdsaW5lcyA9IGZhbHNlLFxufSA9IHt9KSA9PiB7XG5cdGNvbnN0IGJpbmFyeSA9IGJpbmFyeU9wdGlvbiB8fCBCSU5BUllfRU5DT0RJTkdTLmhhcyhlbmNvZGluZyk7XG5cdGNvbnN0IHN1YnByb2Nlc3NTdGRvdXQgPSBnZXRGcm9tU3RyZWFtKHN1YnByb2Nlc3MsIGZyb20pO1xuXHRjb25zdCBvblN0ZG91dERhdGEgPSBpdGVyYXRlT25TdWJwcm9jZXNzU3RyZWFtKHtcblx0XHRzdWJwcm9jZXNzU3Rkb3V0LFxuXHRcdHN1YnByb2Nlc3MsXG5cdFx0YmluYXJ5LFxuXHRcdHNob3VsZEVuY29kZTogdHJ1ZSxcblx0XHRlbmNvZGluZyxcblx0XHRwcmVzZXJ2ZU5ld2xpbmVzLFxuXHR9KTtcblx0cmV0dXJuIGl0ZXJhdGVPblN0ZG91dERhdGEob25TdGRvdXREYXRhLCBzdWJwcm9jZXNzU3Rkb3V0LCBzdWJwcm9jZXNzKTtcbn07XG5cbmNvbnN0IGl0ZXJhdGVPblN0ZG91dERhdGEgPSBhc3luYyBmdW5jdGlvbiAqIChvblN0ZG91dERhdGEsIHN1YnByb2Nlc3NTdGRvdXQsIHN1YnByb2Nlc3MpIHtcblx0dHJ5IHtcblx0XHR5aWVsZCAqIG9uU3Rkb3V0RGF0YTtcblx0fSBmaW5hbGx5IHtcblx0XHRpZiAoc3VicHJvY2Vzc1N0ZG91dC5yZWFkYWJsZSkge1xuXHRcdFx0c3VicHJvY2Vzc1N0ZG91dC5kZXN0cm95KCk7XG5cdFx0fVxuXG5cdFx0YXdhaXQgc3VicHJvY2Vzcztcblx0fVxufTtcbiIsICJpbXBvcnQge2luaXRpYWxpemVDb25jdXJyZW50U3RyZWFtc30gZnJvbSAnLi9jb25jdXJyZW50LmpzJztcbmltcG9ydCB7Y3JlYXRlUmVhZGFibGV9IGZyb20gJy4vcmVhZGFibGUuanMnO1xuaW1wb3J0IHtjcmVhdGVXcml0YWJsZX0gZnJvbSAnLi93cml0YWJsZS5qcyc7XG5pbXBvcnQge2NyZWF0ZUR1cGxleH0gZnJvbSAnLi9kdXBsZXguanMnO1xuaW1wb3J0IHtjcmVhdGVJdGVyYWJsZX0gZnJvbSAnLi9pdGVyYWJsZS5qcyc7XG5cbi8vIEFkZCBtZXRob2RzIHRvIGNvbnZlcnQgdGhlIHN1YnByb2Nlc3MgdG8gYSBzdHJlYW0gb3IgaXRlcmFibGVcbmV4cG9ydCBjb25zdCBhZGRDb252ZXJ0ZWRTdHJlYW1zID0gKHN1YnByb2Nlc3MsIHtlbmNvZGluZ30pID0+IHtcblx0Y29uc3QgY29uY3VycmVudFN0cmVhbXMgPSBpbml0aWFsaXplQ29uY3VycmVudFN0cmVhbXMoKTtcblx0c3VicHJvY2Vzcy5yZWFkYWJsZSA9IGNyZWF0ZVJlYWRhYmxlLmJpbmQodW5kZWZpbmVkLCB7c3VicHJvY2VzcywgY29uY3VycmVudFN0cmVhbXMsIGVuY29kaW5nfSk7XG5cdHN1YnByb2Nlc3Mud3JpdGFibGUgPSBjcmVhdGVXcml0YWJsZS5iaW5kKHVuZGVmaW5lZCwge3N1YnByb2Nlc3MsIGNvbmN1cnJlbnRTdHJlYW1zfSk7XG5cdHN1YnByb2Nlc3MuZHVwbGV4ID0gY3JlYXRlRHVwbGV4LmJpbmQodW5kZWZpbmVkLCB7c3VicHJvY2VzcywgY29uY3VycmVudFN0cmVhbXMsIGVuY29kaW5nfSk7XG5cdHN1YnByb2Nlc3MuaXRlcmFibGUgPSBjcmVhdGVJdGVyYWJsZS5iaW5kKHVuZGVmaW5lZCwgc3VicHJvY2VzcywgZW5jb2RpbmcpO1xuXHRzdWJwcm9jZXNzW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGNyZWF0ZUl0ZXJhYmxlLmJpbmQodW5kZWZpbmVkLCBzdWJwcm9jZXNzLCBlbmNvZGluZywge30pO1xufTtcbiIsICIvLyBUaGUgcmV0dXJuIHZhbHVlIGlzIGEgbWl4aW4gb2YgYHN1YnByb2Nlc3NgIGFuZCBgUHJvbWlzZWBcbmV4cG9ydCBjb25zdCBtZXJnZVByb21pc2UgPSAoc3VicHJvY2VzcywgcHJvbWlzZSkgPT4ge1xuXHRmb3IgKGNvbnN0IFtwcm9wZXJ0eSwgZGVzY3JpcHRvcl0gb2YgZGVzY3JpcHRvcnMpIHtcblx0XHRjb25zdCB2YWx1ZSA9IGRlc2NyaXB0b3IudmFsdWUuYmluZChwcm9taXNlKTtcblx0XHRSZWZsZWN0LmRlZmluZVByb3BlcnR5KHN1YnByb2Nlc3MsIHByb3BlcnR5LCB7Li4uZGVzY3JpcHRvciwgdmFsdWV9KTtcblx0fVxufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLXRvcC1sZXZlbC1hd2FpdFxuY29uc3QgbmF0aXZlUHJvbWlzZVByb3RvdHlwZSA9IChhc3luYyAoKSA9PiB7fSkoKS5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG5cbmNvbnN0IGRlc2NyaXB0b3JzID0gWyd0aGVuJywgJ2NhdGNoJywgJ2ZpbmFsbHknXS5tYXAocHJvcGVydHkgPT4gW1xuXHRwcm9wZXJ0eSxcblx0UmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobmF0aXZlUHJvbWlzZVByb3RvdHlwZSwgcHJvcGVydHkpLFxuXSk7XG4iLCAiaW1wb3J0IHtzZXRNYXhMaXN0ZW5lcnN9IGZyb20gJ25vZGU6ZXZlbnRzJztcbmltcG9ydCB7c3Bhd259IGZyb20gJ25vZGU6Y2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQge01heEJ1ZmZlckVycm9yfSBmcm9tICdnZXQtc3RyZWFtJztcbmltcG9ydCB7aGFuZGxlQ29tbWFuZH0gZnJvbSAnLi4vYXJndW1lbnRzL2NvbW1hbmQuanMnO1xuaW1wb3J0IHtub3JtYWxpemVPcHRpb25zfSBmcm9tICcuLi9hcmd1bWVudHMvb3B0aW9ucy5qcyc7XG5pbXBvcnQge1NVQlBST0NFU1NfT1BUSU9OU30gZnJvbSAnLi4vYXJndW1lbnRzL2ZkLW9wdGlvbnMuanMnO1xuaW1wb3J0IHthZGRJcGNNZXRob2RzfSBmcm9tICcuLi9pcGMvbWV0aG9kcy5qcyc7XG5pbXBvcnQge21ha2VFcnJvciwgbWFrZVN1Y2Nlc3NSZXN1bHR9IGZyb20gJy4uL3JldHVybi9yZXN1bHQuanMnO1xuaW1wb3J0IHtoYW5kbGVSZXN1bHR9IGZyb20gJy4uL3JldHVybi9yZWplY3QuanMnO1xuaW1wb3J0IHtoYW5kbGVFYXJseUVycm9yfSBmcm9tICcuLi9yZXR1cm4vZWFybHktZXJyb3IuanMnO1xuaW1wb3J0IHtoYW5kbGVTdGRpb0FzeW5jfSBmcm9tICcuLi9zdGRpby9oYW5kbGUtYXN5bmMuanMnO1xuaW1wb3J0IHtzdHJpcE5ld2xpbmV9IGZyb20gJy4uL2lvL3N0cmlwLW5ld2xpbmUuanMnO1xuaW1wb3J0IHtwaXBlT3V0cHV0QXN5bmN9IGZyb20gJy4uL2lvL291dHB1dC1hc3luYy5qcyc7XG5pbXBvcnQge3N1YnByb2Nlc3NLaWxsfSBmcm9tICcuLi90ZXJtaW5hdGUva2lsbC5qcyc7XG5pbXBvcnQge2NsZWFudXBPbkV4aXR9IGZyb20gJy4uL3Rlcm1pbmF0ZS9jbGVhbnVwLmpzJztcbmltcG9ydCB7cGlwZVRvU3VicHJvY2Vzc30gZnJvbSAnLi4vcGlwZS9zZXR1cC5qcyc7XG5pbXBvcnQge21ha2VBbGxTdHJlYW19IGZyb20gJy4uL3Jlc29sdmUvYWxsLWFzeW5jLmpzJztcbmltcG9ydCB7d2FpdEZvclN1YnByb2Nlc3NSZXN1bHR9IGZyb20gJy4uL3Jlc29sdmUvd2FpdC1zdWJwcm9jZXNzLmpzJztcbmltcG9ydCB7YWRkQ29udmVydGVkU3RyZWFtc30gZnJvbSAnLi4vY29udmVydC9hZGQuanMnO1xuaW1wb3J0IHtjcmVhdGVEZWZlcnJlZH0gZnJvbSAnLi4vdXRpbHMvZGVmZXJyZWQuanMnO1xuaW1wb3J0IHttZXJnZVByb21pc2V9IGZyb20gJy4vcHJvbWlzZS5qcyc7XG5cbi8vIE1haW4gc2hhcmVkIGxvZ2ljIGZvciBhbGwgYXN5bmMgbWV0aG9kczogYGV4ZWNhKClgLCBgJGAsIGBleGVjYU5vZGUoKWBcbmV4cG9ydCBjb25zdCBleGVjYUNvcmVBc3luYyA9IChyYXdGaWxlLCByYXdBcmd1bWVudHMsIHJhd09wdGlvbnMsIGNyZWF0ZU5lc3RlZCkgPT4ge1xuXHRjb25zdCB7ZmlsZSwgY29tbWFuZEFyZ3VtZW50cywgY29tbWFuZCwgZXNjYXBlZENvbW1hbmQsIHN0YXJ0VGltZSwgdmVyYm9zZUluZm8sIG9wdGlvbnMsIGZpbGVEZXNjcmlwdG9yc30gPSBoYW5kbGVBc3luY0FyZ3VtZW50cyhyYXdGaWxlLCByYXdBcmd1bWVudHMsIHJhd09wdGlvbnMpO1xuXHRjb25zdCB7c3VicHJvY2VzcywgcHJvbWlzZX0gPSBzcGF3blN1YnByb2Nlc3NBc3luYyh7XG5cdFx0ZmlsZSxcblx0XHRjb21tYW5kQXJndW1lbnRzLFxuXHRcdG9wdGlvbnMsXG5cdFx0c3RhcnRUaW1lLFxuXHRcdHZlcmJvc2VJbmZvLFxuXHRcdGNvbW1hbmQsXG5cdFx0ZXNjYXBlZENvbW1hbmQsXG5cdFx0ZmlsZURlc2NyaXB0b3JzLFxuXHR9KTtcblx0c3VicHJvY2Vzcy5waXBlID0gcGlwZVRvU3VicHJvY2Vzcy5iaW5kKHVuZGVmaW5lZCwge1xuXHRcdHNvdXJjZTogc3VicHJvY2Vzcyxcblx0XHRzb3VyY2VQcm9taXNlOiBwcm9taXNlLFxuXHRcdGJvdW5kT3B0aW9uczoge30sXG5cdFx0Y3JlYXRlTmVzdGVkLFxuXHR9KTtcblx0bWVyZ2VQcm9taXNlKHN1YnByb2Nlc3MsIHByb21pc2UpO1xuXHRTVUJQUk9DRVNTX09QVElPTlMuc2V0KHN1YnByb2Nlc3MsIHtvcHRpb25zLCBmaWxlRGVzY3JpcHRvcnN9KTtcblx0cmV0dXJuIHN1YnByb2Nlc3M7XG59O1xuXG4vLyBDb21wdXRlIGFyZ3VtZW50cyB0byBwYXNzIHRvIGBjaGlsZF9wcm9jZXNzLnNwYXduKClgXG5jb25zdCBoYW5kbGVBc3luY0FyZ3VtZW50cyA9IChyYXdGaWxlLCByYXdBcmd1bWVudHMsIHJhd09wdGlvbnMpID0+IHtcblx0Y29uc3Qge2NvbW1hbmQsIGVzY2FwZWRDb21tYW5kLCBzdGFydFRpbWUsIHZlcmJvc2VJbmZvfSA9IGhhbmRsZUNvbW1hbmQocmF3RmlsZSwgcmF3QXJndW1lbnRzLCByYXdPcHRpb25zKTtcblx0Y29uc3Qge2ZpbGUsIGNvbW1hbmRBcmd1bWVudHMsIG9wdGlvbnM6IG5vcm1hbGl6ZWRPcHRpb25zfSA9IG5vcm1hbGl6ZU9wdGlvbnMocmF3RmlsZSwgcmF3QXJndW1lbnRzLCByYXdPcHRpb25zKTtcblx0Y29uc3Qgb3B0aW9ucyA9IGhhbmRsZUFzeW5jT3B0aW9ucyhub3JtYWxpemVkT3B0aW9ucyk7XG5cdGNvbnN0IGZpbGVEZXNjcmlwdG9ycyA9IGhhbmRsZVN0ZGlvQXN5bmMob3B0aW9ucywgdmVyYm9zZUluZm8pO1xuXHRyZXR1cm4ge1xuXHRcdGZpbGUsXG5cdFx0Y29tbWFuZEFyZ3VtZW50cyxcblx0XHRjb21tYW5kLFxuXHRcdGVzY2FwZWRDb21tYW5kLFxuXHRcdHN0YXJ0VGltZSxcblx0XHR2ZXJib3NlSW5mbyxcblx0XHRvcHRpb25zLFxuXHRcdGZpbGVEZXNjcmlwdG9ycyxcblx0fTtcbn07XG5cbi8vIE9wdGlvbnMgbm9ybWFsaXphdGlvbiBsb2dpYyBzcGVjaWZpYyB0byBhc3luYyBtZXRob2RzLlxuLy8gUHJldmVudCBwYXNzaW5nIHRoZSBgdGltZW91dGAgb3B0aW9uIGRpcmVjdGx5IHRvIGBjaGlsZF9wcm9jZXNzLnNwYXduKClgLlxuY29uc3QgaGFuZGxlQXN5bmNPcHRpb25zID0gKHt0aW1lb3V0LCBzaWduYWwsIC4uLm9wdGlvbnN9KSA9PiB7XG5cdGlmIChzaWduYWwgIT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcInNpZ25hbFwiIG9wdGlvbiBoYXMgYmVlbiByZW5hbWVkIHRvIFwiY2FuY2VsU2lnbmFsXCIgaW5zdGVhZC4nKTtcblx0fVxuXG5cdHJldHVybiB7Li4ub3B0aW9ucywgdGltZW91dER1cmF0aW9uOiB0aW1lb3V0fTtcbn07XG5cbmNvbnN0IHNwYXduU3VicHJvY2Vzc0FzeW5jID0gKHtmaWxlLCBjb21tYW5kQXJndW1lbnRzLCBvcHRpb25zLCBzdGFydFRpbWUsIHZlcmJvc2VJbmZvLCBjb21tYW5kLCBlc2NhcGVkQ29tbWFuZCwgZmlsZURlc2NyaXB0b3JzfSkgPT4ge1xuXHRsZXQgc3VicHJvY2Vzcztcblx0dHJ5IHtcblx0XHRzdWJwcm9jZXNzID0gc3Bhd24oZmlsZSwgY29tbWFuZEFyZ3VtZW50cywgb3B0aW9ucyk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0cmV0dXJuIGhhbmRsZUVhcmx5RXJyb3Ioe1xuXHRcdFx0ZXJyb3IsXG5cdFx0XHRjb21tYW5kLFxuXHRcdFx0ZXNjYXBlZENvbW1hbmQsXG5cdFx0XHRmaWxlRGVzY3JpcHRvcnMsXG5cdFx0XHRvcHRpb25zLFxuXHRcdFx0c3RhcnRUaW1lLFxuXHRcdFx0dmVyYm9zZUluZm8sXG5cdFx0fSk7XG5cdH1cblxuXHRjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXHRzZXRNYXhMaXN0ZW5lcnMoTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLCBjb250cm9sbGVyLnNpZ25hbCk7XG5cblx0Y29uc3Qgb3JpZ2luYWxTdHJlYW1zID0gWy4uLnN1YnByb2Nlc3Muc3RkaW9dO1xuXHRwaXBlT3V0cHV0QXN5bmMoc3VicHJvY2VzcywgZmlsZURlc2NyaXB0b3JzLCBjb250cm9sbGVyKTtcblx0Y2xlYW51cE9uRXhpdChzdWJwcm9jZXNzLCBvcHRpb25zLCBjb250cm9sbGVyKTtcblxuXHRjb25zdCBjb250ZXh0ID0ge307XG5cdGNvbnN0IG9uSW50ZXJuYWxFcnJvciA9IGNyZWF0ZURlZmVycmVkKCk7XG5cdHN1YnByb2Nlc3Mua2lsbCA9IHN1YnByb2Nlc3NLaWxsLmJpbmQodW5kZWZpbmVkLCB7XG5cdFx0a2lsbDogc3VicHJvY2Vzcy5raWxsLmJpbmQoc3VicHJvY2VzcyksXG5cdFx0b3B0aW9ucyxcblx0XHRvbkludGVybmFsRXJyb3IsXG5cdFx0Y29udGV4dCxcblx0XHRjb250cm9sbGVyLFxuXHR9KTtcblx0c3VicHJvY2Vzcy5hbGwgPSBtYWtlQWxsU3RyZWFtKHN1YnByb2Nlc3MsIG9wdGlvbnMpO1xuXHRhZGRDb252ZXJ0ZWRTdHJlYW1zKHN1YnByb2Nlc3MsIG9wdGlvbnMpO1xuXHRhZGRJcGNNZXRob2RzKHN1YnByb2Nlc3MsIG9wdGlvbnMpO1xuXG5cdGNvbnN0IHByb21pc2UgPSBoYW5kbGVQcm9taXNlKHtcblx0XHRzdWJwcm9jZXNzLFxuXHRcdG9wdGlvbnMsXG5cdFx0c3RhcnRUaW1lLFxuXHRcdHZlcmJvc2VJbmZvLFxuXHRcdGZpbGVEZXNjcmlwdG9ycyxcblx0XHRvcmlnaW5hbFN0cmVhbXMsXG5cdFx0Y29tbWFuZCxcblx0XHRlc2NhcGVkQ29tbWFuZCxcblx0XHRjb250ZXh0LFxuXHRcdG9uSW50ZXJuYWxFcnJvcixcblx0XHRjb250cm9sbGVyLFxuXHR9KTtcblx0cmV0dXJuIHtzdWJwcm9jZXNzLCBwcm9taXNlfTtcbn07XG5cbi8vIEFzeW5jaHJvbm91cyBsb2dpYywgYXMgb3Bwb3NlZCB0byB0aGUgcHJldmlvdXMgbG9naWMgd2hpY2ggY2FuIGJlIHJ1biBzeW5jaHJvbm91c2x5LCBpLmUuIGNhbiBiZSByZXR1cm5lZCB0byB1c2VyIHJpZ2h0IGF3YXlcbmNvbnN0IGhhbmRsZVByb21pc2UgPSBhc3luYyAoe3N1YnByb2Nlc3MsIG9wdGlvbnMsIHN0YXJ0VGltZSwgdmVyYm9zZUluZm8sIGZpbGVEZXNjcmlwdG9ycywgb3JpZ2luYWxTdHJlYW1zLCBjb21tYW5kLCBlc2NhcGVkQ29tbWFuZCwgY29udGV4dCwgb25JbnRlcm5hbEVycm9yLCBjb250cm9sbGVyfSkgPT4ge1xuXHRjb25zdCBbXG5cdFx0ZXJyb3JJbmZvLFxuXHRcdFtleGl0Q29kZSwgc2lnbmFsXSxcblx0XHRzdGRpb1Jlc3VsdHMsXG5cdFx0YWxsUmVzdWx0LFxuXHRcdGlwY091dHB1dCxcblx0XSA9IGF3YWl0IHdhaXRGb3JTdWJwcm9jZXNzUmVzdWx0KHtcblx0XHRzdWJwcm9jZXNzLFxuXHRcdG9wdGlvbnMsXG5cdFx0Y29udGV4dCxcblx0XHR2ZXJib3NlSW5mbyxcblx0XHRmaWxlRGVzY3JpcHRvcnMsXG5cdFx0b3JpZ2luYWxTdHJlYW1zLFxuXHRcdG9uSW50ZXJuYWxFcnJvcixcblx0XHRjb250cm9sbGVyLFxuXHR9KTtcblx0Y29udHJvbGxlci5hYm9ydCgpO1xuXHRvbkludGVybmFsRXJyb3IucmVzb2x2ZSgpO1xuXG5cdGNvbnN0IHN0ZGlvID0gc3RkaW9SZXN1bHRzLm1hcCgoc3RkaW9SZXN1bHQsIGZkTnVtYmVyKSA9PiBzdHJpcE5ld2xpbmUoc3RkaW9SZXN1bHQsIG9wdGlvbnMsIGZkTnVtYmVyKSk7XG5cdGNvbnN0IGFsbCA9IHN0cmlwTmV3bGluZShhbGxSZXN1bHQsIG9wdGlvbnMsICdhbGwnKTtcblx0Y29uc3QgcmVzdWx0ID0gZ2V0QXN5bmNSZXN1bHQoe1xuXHRcdGVycm9ySW5mbyxcblx0XHRleGl0Q29kZSxcblx0XHRzaWduYWwsXG5cdFx0c3RkaW8sXG5cdFx0YWxsLFxuXHRcdGlwY091dHB1dCxcblx0XHRjb250ZXh0LFxuXHRcdG9wdGlvbnMsXG5cdFx0Y29tbWFuZCxcblx0XHRlc2NhcGVkQ29tbWFuZCxcblx0XHRzdGFydFRpbWUsXG5cdH0pO1xuXHRyZXR1cm4gaGFuZGxlUmVzdWx0KHJlc3VsdCwgdmVyYm9zZUluZm8sIG9wdGlvbnMpO1xufTtcblxuY29uc3QgZ2V0QXN5bmNSZXN1bHQgPSAoe2Vycm9ySW5mbywgZXhpdENvZGUsIHNpZ25hbCwgc3RkaW8sIGFsbCwgaXBjT3V0cHV0LCBjb250ZXh0LCBvcHRpb25zLCBjb21tYW5kLCBlc2NhcGVkQ29tbWFuZCwgc3RhcnRUaW1lfSkgPT4gJ2Vycm9yJyBpbiBlcnJvckluZm9cblx0PyBtYWtlRXJyb3Ioe1xuXHRcdGVycm9yOiBlcnJvckluZm8uZXJyb3IsXG5cdFx0Y29tbWFuZCxcblx0XHRlc2NhcGVkQ29tbWFuZCxcblx0XHR0aW1lZE91dDogY29udGV4dC50ZXJtaW5hdGlvblJlYXNvbiA9PT0gJ3RpbWVvdXQnLFxuXHRcdGlzQ2FuY2VsZWQ6IGNvbnRleHQudGVybWluYXRpb25SZWFzb24gPT09ICdjYW5jZWwnIHx8IGNvbnRleHQudGVybWluYXRpb25SZWFzb24gPT09ICdncmFjZWZ1bENhbmNlbCcsXG5cdFx0aXNHcmFjZWZ1bGx5Q2FuY2VsZWQ6IGNvbnRleHQudGVybWluYXRpb25SZWFzb24gPT09ICdncmFjZWZ1bENhbmNlbCcsXG5cdFx0aXNNYXhCdWZmZXI6IGVycm9ySW5mby5lcnJvciBpbnN0YW5jZW9mIE1heEJ1ZmZlckVycm9yLFxuXHRcdGlzRm9yY2VmdWxseVRlcm1pbmF0ZWQ6IGNvbnRleHQuaXNGb3JjZWZ1bGx5VGVybWluYXRlZCxcblx0XHRleGl0Q29kZSxcblx0XHRzaWduYWwsXG5cdFx0c3RkaW8sXG5cdFx0YWxsLFxuXHRcdGlwY091dHB1dCxcblx0XHRvcHRpb25zLFxuXHRcdHN0YXJ0VGltZSxcblx0XHRpc1N5bmM6IGZhbHNlLFxuXHR9KVxuXHQ6IG1ha2VTdWNjZXNzUmVzdWx0KHtcblx0XHRjb21tYW5kLFxuXHRcdGVzY2FwZWRDb21tYW5kLFxuXHRcdHN0ZGlvLFxuXHRcdGFsbCxcblx0XHRpcGNPdXRwdXQsXG5cdFx0b3B0aW9ucyxcblx0XHRzdGFydFRpbWUsXG5cdH0pO1xuIiwgImltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJ2lzLXBsYWluLW9iaic7XG5pbXBvcnQge0ZEX1NQRUNJRklDX09QVElPTlN9IGZyb20gJy4uL2FyZ3VtZW50cy9zcGVjaWZpYy5qcyc7XG5cbi8vIERlZXAgbWVyZ2Ugc3BlY2lmaWMgb3B0aW9ucyBsaWtlIGBlbnZgLiBTaGFsbG93IG1lcmdlIHRoZSBvdGhlciBvbmVzLlxuZXhwb3J0IGNvbnN0IG1lcmdlT3B0aW9ucyA9IChib3VuZE9wdGlvbnMsIG9wdGlvbnMpID0+IHtcblx0Y29uc3QgbmV3T3B0aW9ucyA9IE9iamVjdC5mcm9tRW50cmllcyhcblx0XHRPYmplY3QuZW50cmllcyhvcHRpb25zKS5tYXAoKFtvcHRpb25OYW1lLCBvcHRpb25WYWx1ZV0pID0+IFtcblx0XHRcdG9wdGlvbk5hbWUsXG5cdFx0XHRtZXJnZU9wdGlvbihvcHRpb25OYW1lLCBib3VuZE9wdGlvbnNbb3B0aW9uTmFtZV0sIG9wdGlvblZhbHVlKSxcblx0XHRdKSxcblx0KTtcblx0cmV0dXJuIHsuLi5ib3VuZE9wdGlvbnMsIC4uLm5ld09wdGlvbnN9O1xufTtcblxuY29uc3QgbWVyZ2VPcHRpb24gPSAob3B0aW9uTmFtZSwgYm91bmRPcHRpb25WYWx1ZSwgb3B0aW9uVmFsdWUpID0+IHtcblx0aWYgKERFRVBfT1BUSU9OUy5oYXMob3B0aW9uTmFtZSkgJiYgaXNQbGFpbk9iamVjdChib3VuZE9wdGlvblZhbHVlKSAmJiBpc1BsYWluT2JqZWN0KG9wdGlvblZhbHVlKSkge1xuXHRcdHJldHVybiB7Li4uYm91bmRPcHRpb25WYWx1ZSwgLi4ub3B0aW9uVmFsdWV9O1xuXHR9XG5cblx0cmV0dXJuIG9wdGlvblZhbHVlO1xufTtcblxuY29uc3QgREVFUF9PUFRJT05TID0gbmV3IFNldChbJ2VudicsIC4uLkZEX1NQRUNJRklDX09QVElPTlNdKTtcbiIsICJpbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICdpcy1wbGFpbi1vYmonO1xuaW1wb3J0IHtub3JtYWxpemVQYXJhbWV0ZXJzfSBmcm9tICcuL3BhcmFtZXRlcnMuanMnO1xuaW1wb3J0IHtpc1RlbXBsYXRlU3RyaW5nLCBwYXJzZVRlbXBsYXRlc30gZnJvbSAnLi90ZW1wbGF0ZS5qcyc7XG5pbXBvcnQge2V4ZWNhQ29yZVN5bmN9IGZyb20gJy4vbWFpbi1zeW5jLmpzJztcbmltcG9ydCB7ZXhlY2FDb3JlQXN5bmN9IGZyb20gJy4vbWFpbi1hc3luYy5qcyc7XG5pbXBvcnQge21lcmdlT3B0aW9uc30gZnJvbSAnLi9iaW5kLmpzJztcblxuLy8gV3JhcHMgZXZlcnkgZXhwb3J0ZWQgbWV0aG9kcyB0byBwcm92aWRlIHRoZSBmb2xsb3dpbmcgZmVhdHVyZXM6XG4vLyAgLSB0ZW1wbGF0ZSBzdHJpbmcgc3ludGF4OiBleGVjYWBjb21tYW5kIGFyZ3VtZW50YFxuLy8gIC0gb3B0aW9ucyBiaW5kaW5nOiBib3VuZEV4ZWNhID0gZXhlY2Eob3B0aW9ucylcbi8vICAtIG9wdGlvbmFsIGFyZ3VtZW50L29wdGlvbnM6IGV4ZWNhKGZpbGUpLCBleGVjYShmaWxlLCBhcmdzKSwgZXhlY2EoZmlsZSwgb3B0aW9ucyksIGV4ZWNhKGZpbGUsIGFyZ3MsIG9wdGlvbnMpXG4vLyBgbWFwQXJndW1lbnRzKClgIGFuZCBgc2V0Qm91bmRFeGVjYSgpYCBhbGxvd3MgZm9yIG1ldGhvZC1zcGVjaWZpYyBsb2dpYy5cbmV4cG9ydCBjb25zdCBjcmVhdGVFeGVjYSA9IChtYXBBcmd1bWVudHMsIGJvdW5kT3B0aW9ucywgZGVlcE9wdGlvbnMsIHNldEJvdW5kRXhlY2EpID0+IHtcblx0Y29uc3QgY3JlYXRlTmVzdGVkID0gKG1hcEFyZ3VtZW50cywgYm91bmRPcHRpb25zLCBzZXRCb3VuZEV4ZWNhKSA9PiBjcmVhdGVFeGVjYShtYXBBcmd1bWVudHMsIGJvdW5kT3B0aW9ucywgZGVlcE9wdGlvbnMsIHNldEJvdW5kRXhlY2EpO1xuXHRjb25zdCBib3VuZEV4ZWNhID0gKC4uLmV4ZWNhQXJndW1lbnRzKSA9PiBjYWxsQm91bmRFeGVjYSh7XG5cdFx0bWFwQXJndW1lbnRzLFxuXHRcdGRlZXBPcHRpb25zLFxuXHRcdGJvdW5kT3B0aW9ucyxcblx0XHRzZXRCb3VuZEV4ZWNhLFxuXHRcdGNyZWF0ZU5lc3RlZCxcblx0fSwgLi4uZXhlY2FBcmd1bWVudHMpO1xuXG5cdGlmIChzZXRCb3VuZEV4ZWNhICE9PSB1bmRlZmluZWQpIHtcblx0XHRzZXRCb3VuZEV4ZWNhKGJvdW5kRXhlY2EsIGNyZWF0ZU5lc3RlZCwgYm91bmRPcHRpb25zKTtcblx0fVxuXG5cdHJldHVybiBib3VuZEV4ZWNhO1xufTtcblxuY29uc3QgY2FsbEJvdW5kRXhlY2EgPSAoe21hcEFyZ3VtZW50cywgZGVlcE9wdGlvbnMgPSB7fSwgYm91bmRPcHRpb25zID0ge30sIHNldEJvdW5kRXhlY2EsIGNyZWF0ZU5lc3RlZH0sIGZpcnN0QXJndW1lbnQsIC4uLm5leHRBcmd1bWVudHMpID0+IHtcblx0aWYgKGlzUGxhaW5PYmplY3QoZmlyc3RBcmd1bWVudCkpIHtcblx0XHRyZXR1cm4gY3JlYXRlTmVzdGVkKG1hcEFyZ3VtZW50cywgbWVyZ2VPcHRpb25zKGJvdW5kT3B0aW9ucywgZmlyc3RBcmd1bWVudCksIHNldEJvdW5kRXhlY2EpO1xuXHR9XG5cblx0Y29uc3Qge2ZpbGUsIGNvbW1hbmRBcmd1bWVudHMsIG9wdGlvbnMsIGlzU3luY30gPSBwYXJzZUFyZ3VtZW50cyh7XG5cdFx0bWFwQXJndW1lbnRzLFxuXHRcdGZpcnN0QXJndW1lbnQsXG5cdFx0bmV4dEFyZ3VtZW50cyxcblx0XHRkZWVwT3B0aW9ucyxcblx0XHRib3VuZE9wdGlvbnMsXG5cdH0pO1xuXHRyZXR1cm4gaXNTeW5jXG5cdFx0PyBleGVjYUNvcmVTeW5jKGZpbGUsIGNvbW1hbmRBcmd1bWVudHMsIG9wdGlvbnMpXG5cdFx0OiBleGVjYUNvcmVBc3luYyhmaWxlLCBjb21tYW5kQXJndW1lbnRzLCBvcHRpb25zLCBjcmVhdGVOZXN0ZWQpO1xufTtcblxuY29uc3QgcGFyc2VBcmd1bWVudHMgPSAoe21hcEFyZ3VtZW50cywgZmlyc3RBcmd1bWVudCwgbmV4dEFyZ3VtZW50cywgZGVlcE9wdGlvbnMsIGJvdW5kT3B0aW9uc30pID0+IHtcblx0Y29uc3QgY2FsbEFyZ3VtZW50cyA9IGlzVGVtcGxhdGVTdHJpbmcoZmlyc3RBcmd1bWVudClcblx0XHQ/IHBhcnNlVGVtcGxhdGVzKGZpcnN0QXJndW1lbnQsIG5leHRBcmd1bWVudHMpXG5cdFx0OiBbZmlyc3RBcmd1bWVudCwgLi4ubmV4dEFyZ3VtZW50c107XG5cdGNvbnN0IFtpbml0aWFsRmlsZSwgaW5pdGlhbEFyZ3VtZW50cywgaW5pdGlhbE9wdGlvbnNdID0gbm9ybWFsaXplUGFyYW1ldGVycyguLi5jYWxsQXJndW1lbnRzKTtcblx0Y29uc3QgbWVyZ2VkT3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhtZXJnZU9wdGlvbnMoZGVlcE9wdGlvbnMsIGJvdW5kT3B0aW9ucyksIGluaXRpYWxPcHRpb25zKTtcblx0Y29uc3Qge1xuXHRcdGZpbGUgPSBpbml0aWFsRmlsZSxcblx0XHRjb21tYW5kQXJndW1lbnRzID0gaW5pdGlhbEFyZ3VtZW50cyxcblx0XHRvcHRpb25zID0gbWVyZ2VkT3B0aW9ucyxcblx0XHRpc1N5bmMgPSBmYWxzZSxcblx0fSA9IG1hcEFyZ3VtZW50cyh7ZmlsZTogaW5pdGlhbEZpbGUsIGNvbW1hbmRBcmd1bWVudHM6IGluaXRpYWxBcmd1bWVudHMsIG9wdGlvbnM6IG1lcmdlZE9wdGlvbnN9KTtcblx0cmV0dXJuIHtcblx0XHRmaWxlLFxuXHRcdGNvbW1hbmRBcmd1bWVudHMsXG5cdFx0b3B0aW9ucyxcblx0XHRpc1N5bmMsXG5cdH07XG59O1xuIiwgIi8vIE1haW4gbG9naWMgZm9yIGBleGVjYUNvbW1hbmQoKWBcbmV4cG9ydCBjb25zdCBtYXBDb21tYW5kQXN5bmMgPSAoe2ZpbGUsIGNvbW1hbmRBcmd1bWVudHN9KSA9PiBwYXJzZUNvbW1hbmQoZmlsZSwgY29tbWFuZEFyZ3VtZW50cyk7XG5cbi8vIE1haW4gbG9naWMgZm9yIGBleGVjYUNvbW1hbmRTeW5jKClgXG5leHBvcnQgY29uc3QgbWFwQ29tbWFuZFN5bmMgPSAoe2ZpbGUsIGNvbW1hbmRBcmd1bWVudHN9KSA9PiAoey4uLnBhcnNlQ29tbWFuZChmaWxlLCBjb21tYW5kQXJndW1lbnRzKSwgaXNTeW5jOiB0cnVlfSk7XG5cbi8vIENvbnZlcnQgYGV4ZWNhQ29tbWFuZChjb21tYW5kKWAgaW50byBgZXhlY2EoZmlsZSwgLi4uY29tbWFuZEFyZ3VtZW50cylgXG5jb25zdCBwYXJzZUNvbW1hbmQgPSAoY29tbWFuZCwgdW51c2VkQXJndW1lbnRzKSA9PiB7XG5cdGlmICh1bnVzZWRBcmd1bWVudHMubGVuZ3RoID4gMCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBjb21tYW5kIGFuZCBpdHMgYXJndW1lbnRzIG11c3QgYmUgcGFzc2VkIGFzIGEgc2luZ2xlIHN0cmluZzogJHtjb21tYW5kfSAke3VudXNlZEFyZ3VtZW50c30uYCk7XG5cdH1cblxuXHRjb25zdCBbZmlsZSwgLi4uY29tbWFuZEFyZ3VtZW50c10gPSBwYXJzZUNvbW1hbmRTdHJpbmcoY29tbWFuZCk7XG5cdHJldHVybiB7ZmlsZSwgY29tbWFuZEFyZ3VtZW50c307XG59O1xuXG4vLyBDb252ZXJ0IGBjb21tYW5kYCBzdHJpbmcgaW50byBhbiBhcnJheSBvZiBmaWxlIG9yIGFyZ3VtZW50cyB0byBwYXNzIHRvICRgJHsuLi5maWxlT3JDb21tYW5kQXJndW1lbnRzfWBcbmV4cG9ydCBjb25zdCBwYXJzZUNvbW1hbmRTdHJpbmcgPSBjb21tYW5kID0+IHtcblx0aWYgKHR5cGVvZiBjb21tYW5kICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBjb21tYW5kIG11c3QgYmUgYSBzdHJpbmc6ICR7U3RyaW5nKGNvbW1hbmQpfS5gKTtcblx0fVxuXG5cdGNvbnN0IHRyaW1tZWRDb21tYW5kID0gY29tbWFuZC50cmltKCk7XG5cdGlmICh0cmltbWVkQ29tbWFuZCA9PT0gJycpIHtcblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHRjb25zdCB0b2tlbnMgPSBbXTtcblx0Zm9yIChjb25zdCB0b2tlbiBvZiB0cmltbWVkQ29tbWFuZC5zcGxpdChTUEFDRVNfUkVHRVhQKSkge1xuXHRcdC8vIEFsbG93IHNwYWNlcyB0byBiZSBlc2NhcGVkIGJ5IGEgYmFja3NsYXNoIGlmIG5vdCBtZWFudCBhcyBhIGRlbGltaXRlclxuXHRcdGNvbnN0IHByZXZpb3VzVG9rZW4gPSB0b2tlbnMuYXQoLTEpO1xuXHRcdGlmIChwcmV2aW91c1Rva2VuICYmIHByZXZpb3VzVG9rZW4uZW5kc1dpdGgoJ1xcXFwnKSkge1xuXHRcdFx0Ly8gTWVyZ2UgcHJldmlvdXMgdG9rZW4gd2l0aCBjdXJyZW50IG9uZVxuXHRcdFx0dG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXSA9IGAke3ByZXZpb3VzVG9rZW4uc2xpY2UoMCwgLTEpfSAke3Rva2VufWA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRva2Vucy5wdXNoKHRva2VuKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG9rZW5zO1xufTtcblxuY29uc3QgU1BBQ0VTX1JFR0VYUCA9IC8gKy9nO1xuIiwgIi8vIFNldHMgYCQuc3luY2AgYW5kIGAkLnNgXG5leHBvcnQgY29uc3Qgc2V0U2NyaXB0U3luYyA9IChib3VuZEV4ZWNhLCBjcmVhdGVOZXN0ZWQsIGJvdW5kT3B0aW9ucykgPT4ge1xuXHRib3VuZEV4ZWNhLnN5bmMgPSBjcmVhdGVOZXN0ZWQobWFwU2NyaXB0U3luYywgYm91bmRPcHRpb25zKTtcblx0Ym91bmRFeGVjYS5zID0gYm91bmRFeGVjYS5zeW5jO1xufTtcblxuLy8gTWFpbiBsb2dpYyBmb3IgYCRgXG5leHBvcnQgY29uc3QgbWFwU2NyaXB0QXN5bmMgPSAoe29wdGlvbnN9KSA9PiBnZXRTY3JpcHRPcHRpb25zKG9wdGlvbnMpO1xuXG4vLyBNYWluIGxvZ2ljIGZvciBgJC5zeW5jYFxuY29uc3QgbWFwU2NyaXB0U3luYyA9ICh7b3B0aW9uc30pID0+ICh7Li4uZ2V0U2NyaXB0T3B0aW9ucyhvcHRpb25zKSwgaXNTeW5jOiB0cnVlfSk7XG5cbi8vIGAkYCBpcyBsaWtlIGBleGVjYWAgYnV0IHdpdGggc2NyaXB0LWZyaWVuZGx5IG9wdGlvbnM6IGB7c3RkaW46ICdpbmhlcml0JywgcHJlZmVyTG9jYWw6IHRydWV9YFxuY29uc3QgZ2V0U2NyaXB0T3B0aW9ucyA9IG9wdGlvbnMgPT4gKHtvcHRpb25zOiB7Li4uZ2V0U2NyaXB0U3RkaW5PcHRpb24ob3B0aW9ucyksIC4uLm9wdGlvbnN9fSk7XG5cbmNvbnN0IGdldFNjcmlwdFN0ZGluT3B0aW9uID0gKHtpbnB1dCwgaW5wdXRGaWxlLCBzdGRpb30pID0+IGlucHV0ID09PSB1bmRlZmluZWQgJiYgaW5wdXRGaWxlID09PSB1bmRlZmluZWQgJiYgc3RkaW8gPT09IHVuZGVmaW5lZFxuXHQ/IHtzdGRpbjogJ2luaGVyaXQnfVxuXHQ6IHt9O1xuXG4vLyBXaGVuIHVzaW5nICQoLi4uKS5waXBlKC4uLiksIG1vc3Qgc2NyaXB0LWZyaWVuZGx5IG9wdGlvbnMgc2hvdWxkIGFwcGx5IHRvIGJvdGggY29tbWFuZHMuXG4vLyBIb3dldmVyLCBzb21lIG9wdGlvbnMgKGxpa2UgYHN0ZGluOiAnaW5oZXJpdCdgKSB3b3VsZCBjcmVhdGUgaXNzdWVzIHdpdGggcGlwaW5nLCBpLmUuIGNhbm5vdCBiZSBkZWVwLlxuZXhwb3J0IGNvbnN0IGRlZXBTY3JpcHRPcHRpb25zID0ge3ByZWZlckxvY2FsOiB0cnVlfTtcbiIsICJpbXBvcnQge2NyZWF0ZUV4ZWNhfSBmcm9tICcuL2xpYi9tZXRob2RzL2NyZWF0ZS5qcyc7XG5pbXBvcnQge21hcENvbW1hbmRBc3luYywgbWFwQ29tbWFuZFN5bmN9IGZyb20gJy4vbGliL21ldGhvZHMvY29tbWFuZC5qcyc7XG5pbXBvcnQge21hcE5vZGV9IGZyb20gJy4vbGliL21ldGhvZHMvbm9kZS5qcyc7XG5pbXBvcnQge21hcFNjcmlwdEFzeW5jLCBzZXRTY3JpcHRTeW5jLCBkZWVwU2NyaXB0T3B0aW9uc30gZnJvbSAnLi9saWIvbWV0aG9kcy9zY3JpcHQuanMnO1xuaW1wb3J0IHtnZXRJcGNFeHBvcnR9IGZyb20gJy4vbGliL2lwYy9tZXRob2RzLmpzJztcblxuZXhwb3J0IHtwYXJzZUNvbW1hbmRTdHJpbmd9IGZyb20gJy4vbGliL21ldGhvZHMvY29tbWFuZC5qcyc7XG5leHBvcnQge0V4ZWNhRXJyb3IsIEV4ZWNhU3luY0Vycm9yfSBmcm9tICcuL2xpYi9yZXR1cm4vZmluYWwtZXJyb3IuanMnO1xuXG5leHBvcnQgY29uc3QgZXhlY2EgPSBjcmVhdGVFeGVjYSgoKSA9PiAoe30pKTtcbmV4cG9ydCBjb25zdCBleGVjYVN5bmMgPSBjcmVhdGVFeGVjYSgoKSA9PiAoe2lzU3luYzogdHJ1ZX0pKTtcbmV4cG9ydCBjb25zdCBleGVjYUNvbW1hbmQgPSBjcmVhdGVFeGVjYShtYXBDb21tYW5kQXN5bmMpO1xuZXhwb3J0IGNvbnN0IGV4ZWNhQ29tbWFuZFN5bmMgPSBjcmVhdGVFeGVjYShtYXBDb21tYW5kU3luYyk7XG5leHBvcnQgY29uc3QgZXhlY2FOb2RlID0gY3JlYXRlRXhlY2EobWFwTm9kZSk7XG5leHBvcnQgY29uc3QgJCA9IGNyZWF0ZUV4ZWNhKG1hcFNjcmlwdEFzeW5jLCB7fSwgZGVlcFNjcmlwdE9wdGlvbnMsIHNldFNjcmlwdFN5bmMpO1xuXG5jb25zdCB7XG5cdHNlbmRNZXNzYWdlLFxuXHRnZXRPbmVNZXNzYWdlLFxuXHRnZXRFYWNoTWVzc2FnZSxcblx0Z2V0Q2FuY2VsU2lnbmFsLFxufSA9IGdldElwY0V4cG9ydCgpO1xuZXhwb3J0IHtcblx0c2VuZE1lc3NhZ2UsXG5cdGdldE9uZU1lc3NhZ2UsXG5cdGdldEVhY2hNZXNzYWdlLFxuXHRnZXRDYW5jZWxTaWduYWwsXG59O1xuIiwgImltcG9ydCB7IEFjdGlvbiwgQWN0aW9uUGFuZWwsIERldGFpbCwgRm9ybSwgdXNlTmF2aWdhdGlvbiB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHVzZUVuY29kZXIgZnJvbSBcIi4vdXRpbHMvZW5jb2Rlci50c1wiO1xuaW1wb3J0IHRydW5jYXRlVGV4dCBmcm9tIFwiLi91dGlscy90cnVuY2F0ZS50c1wiO1xuXG5mdW5jdGlvbiBDb21tYW5kKCkge1xuICBjb25zdCBbc291cmNlLCBzZXRTb3VyY2VdID0gdXNlU3RhdGUoXCJ0ZXh0XCIpO1xuICBjb25zdCB7IGVuY29kZSwgZGVjb2RlIH0gPSB1c2VFbmNvZGVyKCk7XG4gIGNvbnN0IHsgcHVzaCB9ID0gdXNlTmF2aWdhdGlvbigpO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUVuY29kZURlY29kZSh2YWx1ZXM6IHsgb3A6IHN0cmluZzsgdHlwZTogc3RyaW5nOyBpbnB1dDogc3RyaW5nIHwgc3RyaW5nW10gfSkge1xuICAgIGNvbnN0IHsgb3AsIHR5cGUsIGlucHV0IH0gPSB2YWx1ZXM7XG4gICAgY29uc3QgZGF0YSA9IHR5cGUgPT09IFwiZmlsZVwiID8gaW5wdXRbMF0gOiBpbnB1dDtcbiAgICBjb25zdCByZXN1bHQgPSBvcCA9PT0gXCJlbmNvZGVcIiA/IGF3YWl0IGVuY29kZSh0eXBlLCBkYXRhIGFzIHN0cmluZykgOiBhd2FpdCBkZWNvZGUodHlwZSwgZGF0YSBhcyBzdHJpbmcpO1xuXG4gICAgbGV0IHByZXZpZXcgPSBgXFxgXFxgXFxgXFxuJHt0cnVuY2F0ZVRleHQocmVzdWx0LnRleHQpfVxcblxcYFxcYFxcYGA7XG4gICAgaWYgKHJlc3VsdC5maWxlICYmIHJlc3VsdC50ZXh0Lm1hdGNoKC9eaW1hZ2VcXC8vKSkgcHJldmlldyA9IGAhW10oJHtyZXN1bHQuZGF0YX0pYDtcblxuICAgIHB1c2goXG4gICAgICA8RGV0YWlsXG4gICAgICAgIG1hcmtkb3duPXtwcmV2aWV3fVxuICAgICAgICBhY3Rpb25zPXtcbiAgICAgICAgICA8QWN0aW9uUGFuZWw+XG4gICAgICAgICAgICA8QWN0aW9uLkNvcHlUb0NsaXBib2FyZCBjb250ZW50PXtyZXN1bHQuZmlsZSA/IHsgZmlsZTogcmVzdWx0LmZpbGUgfSA6IHJlc3VsdC50ZXh0fSAvPlxuICAgICAgICAgICAge3Jlc3VsdC5kYXRhICYmIDxBY3Rpb24uQ29weVRvQ2xpcGJvYXJkIHRpdGxlPVwiQ29weSBEYXRhIHRvIENsaXBib2FyZFwiIGNvbnRlbnQ9e3Jlc3VsdC5kYXRhfSAvPn1cbiAgICAgICAgICA8L0FjdGlvblBhbmVsPlxuICAgICAgICB9XG4gICAgICAvPixcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Rm9ybVxuICAgICAgYWN0aW9ucz17XG4gICAgICAgIDxBY3Rpb25QYW5lbD5cbiAgICAgICAgICA8QWN0aW9uLlN1Ym1pdEZvcm0gdGl0bGU9XCJTdWJtaXRcIiBvblN1Ym1pdD17aGFuZGxlRW5jb2RlRGVjb2RlfSAvPlxuICAgICAgICA8L0FjdGlvblBhbmVsPlxuICAgICAgfVxuICAgID5cbiAgICAgIDxGb3JtLkRyb3Bkb3duIGlkPVwib3BcIj5cbiAgICAgICAgPEZvcm0uRHJvcGRvd24uSXRlbSB2YWx1ZT1cImVuY29kZVwiIHRpdGxlPVwiRW5jb2RlXCIgLz5cbiAgICAgICAgPEZvcm0uRHJvcGRvd24uSXRlbSB2YWx1ZT1cImRlY29kZVwiIHRpdGxlPVwiRGVjb2RlXCIgLz5cbiAgICAgIDwvRm9ybS5Ecm9wZG93bj5cbiAgICAgIDxGb3JtLkRyb3Bkb3duIGlkPVwidHlwZVwiIG9uQ2hhbmdlPXtzZXRTb3VyY2V9PlxuICAgICAgICA8Rm9ybS5Ecm9wZG93bi5JdGVtIHZhbHVlPVwidGV4dFwiIHRpdGxlPVwiUGxhaW4gVGV4dFwiIC8+XG4gICAgICAgIDxGb3JtLkRyb3Bkb3duLkl0ZW0gdmFsdWU9XCJmaWxlXCIgdGl0bGU9XCJGaWxlXCIgLz5cbiAgICAgIDwvRm9ybS5Ecm9wZG93bj5cbiAgICAgIHtzb3VyY2UgPT09IFwidGV4dFwiICYmIDxGb3JtLlRleHRBcmVhIGlkPVwiaW5wdXRcIiAvPn1cbiAgICAgIHtzb3VyY2UgPT09IFwiZmlsZVwiICYmIDxGb3JtLkZpbGVQaWNrZXIgaWQ9XCJpbnB1dFwiIHRpdGxlPVwiXCIgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbj17ZmFsc2V9IC8+fVxuICAgIDwvRm9ybT5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tbWFuZDtcbiIsICJpbXBvcnQgeyBwcm9taXNlcyBhcyBmcyB9IGZyb20gXCJmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGNyeXB0byBmcm9tIFwibm9kZTpjcnlwdG9cIjtcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBnZXREYXRhVXJpLCBnZXRGaWxlSW5mbyB9IGZyb20gXCIuL2ZpbGUudHNcIjtcblxuY29uc3QgdG1wID0gcGF0aC5qb2luKGVudmlyb25tZW50LnN1cHBvcnRQYXRoLCBcImVuY29kZXJcIik7XG5mcy5ta2Rpcih0bXAsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuXG50eXBlIEVuY29kZXJSZXN1bHQgPSB7IHRleHQ6IHN0cmluZzsgZGF0YT86IHN0cmluZzsgZmlsZT86IHN0cmluZyB9O1xuXG5mdW5jdGlvbiB1c2VFbmNvZGVyKCkge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBhc3luYyBmdW5jdGlvbiBob3VzZWtlZXBpbmcoKSB7XG4gICAgICAgIChhd2FpdCBmcy5yZWFkZGlyKHRtcCkpLmZvckVhY2goKGZpbGUpID0+IGZzLnJtKHBhdGguam9pbih0bXAsIGZpbGUpKSk7XG4gICAgICB9XG4gICAgICBob3VzZWtlZXBpbmcoKTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgYXN5bmMgZnVuY3Rpb24gZW5jb2RlKHR5cGU6IHN0cmluZywgZGF0YTogc3RyaW5nKTogUHJvbWlzZTxFbmNvZGVyUmVzdWx0PiB7XG4gICAgaWYgKHR5cGUgPT09IFwidGV4dFwiKSByZXR1cm4geyB0ZXh0OiBCdWZmZXIuZnJvbShkYXRhKS50b1N0cmluZyhcImJhc2U2NFwiKSB9O1xuXG4gICAgY29uc3QgZmlsZSA9IGF3YWl0IGZzLnJlYWRGaWxlKGRhdGEpO1xuICAgIGNvbnN0IHRleHQgPSBmaWxlLnRvU3RyaW5nKFwiYmFzZTY0XCIpO1xuXG4gICAgcmV0dXJuIHsgdGV4dCwgZGF0YTogZ2V0RGF0YVVyaSh0ZXh0LCBhd2FpdCBnZXRGaWxlSW5mbyhkYXRhKSkgfTtcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGRlY29kZSh0eXBlOiBzdHJpbmcsIGRhdGE6IHN0cmluZyk6IFByb21pc2U8RW5jb2RlclJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3VsdCA9XG4gICAgICB0eXBlID09PSBcInRleHRcIlxuICAgICAgICA/IEJ1ZmZlci5mcm9tKGRhdGEucmVwbGFjZSgvXmRhdGE6Lio7YmFzZTY0LC8sIFwiXCIpLCBcImJhc2U2NFwiKVxuICAgICAgICA6IEJ1ZmZlci5mcm9tKGF3YWl0IGZzLnJlYWRGaWxlKGRhdGEsIFwidXRmOFwiKSwgXCJiYXNlNjRcIik7XG5cbiAgICBjb25zdCBmaWxlID0gcGF0aC5qb2luKHRtcCwgY3J5cHRvLnJhbmRvbVVVSUQoKSk7XG4gICAgYXdhaXQgZnMud3JpdGVGaWxlKGZpbGUsIHJlc3VsdCBhcyB1bmtub3duIGFzIERhdGFWaWV3KTtcbiAgICBjb25zdCBpbmZvID0gYXdhaXQgZ2V0RmlsZUluZm8oZmlsZSk7XG5cbiAgICBpZiAoaW5mby5taW1lID09PSBcImltYWdlL3N2Zyt4bWxcIikgaW5mby5leHRlbnNpb24gPSBcInN2Z1wiO1xuICAgIGlmIChpbmZvLmV4dGVuc2lvbiAhPT0gXCI/Pz9cIikge1xuICAgICAgYXdhaXQgZnMucmVuYW1lKGZpbGUsIGAke2ZpbGV9LiR7aW5mby5leHRlbnNpb259YCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0ZXh0OiBgJHtpbmZvLm1pbWV9YCxcbiAgICAgICAgZmlsZTogYCR7ZmlsZX0uJHtpbmZvLmV4dGVuc2lvbn1gLFxuICAgICAgICBkYXRhOiBnZXREYXRhVXJpKEJ1ZmZlci5mcm9tKHJlc3VsdC5idWZmZXIpLnRvU3RyaW5nKFwiYmFzZTY0XCIpLCBpbmZvKSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgYXdhaXQgZnMucm0oZmlsZSk7XG4gICAgcmV0dXJuIHsgdGV4dDogcmVzdWx0LnRvU3RyaW5nKCkgfTtcbiAgfVxuXG4gIHJldHVybiB7IGVuY29kZSwgZGVjb2RlIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUVuY29kZXI7XG4iLCAidHlwZSBGaWxlID0geyBtaW1lPzogc3RyaW5nOyBleHRlbnNpb24/OiBzdHJpbmcgfTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEZpbGVJbmZvKGZpbGU6IHN0cmluZykge1xuICBjb25zdCB7IGV4ZWNhIH0gPSBhd2FpdCBpbXBvcnQoXCJleGVjYVwiKTtcbiAgY29uc3QgZGF0YTogRmlsZSA9IHt9O1xuXG4gIGxldCBwcm9jZXNzO1xuICBwcm9jZXNzID0gYXdhaXQgZXhlY2FgL3Vzci9iaW4vZmlsZSAtYiAke2ZpbGV9IC0tbWltZS10eXBlYDtcbiAgZGF0YS5taW1lID0gcHJvY2Vzcy5zdGRvdXQ7XG4gIHByb2Nlc3MgPSBhd2FpdCBleGVjYWAvdXNyL2Jpbi9maWxlIC1iICR7ZmlsZX0gLS1leHRlbnNpb25gO1xuICBkYXRhLmV4dGVuc2lvbiA9IHByb2Nlc3Muc3Rkb3V0O1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0YVVyaShiYXNlNjQ6IHN0cmluZywgaW5mbz86IEZpbGUpIHtcbiAgcmV0dXJuIGBkYXRhOiR7aW5mbz8ubWltZX07YmFzZTY0LCR7YmFzZTY0fWA7XG59XG4iLCAiZnVuY3Rpb24gdHJ1bmNhdGVUZXh0KHRleHQ6IHN0cmluZywgbGVuZ3RoOiBudW1iZXIgPSAxMDAwLCBzdWZmaXg6IHN0cmluZyA9IFwiPC4uLj5cIikge1xuICBpZiAodGV4dC5sZW5ndGggPiBsZW5ndGgpIHJldHVybiBgJHt0ZXh0LnN1YnN0cmluZygwLCBsZW5ndGgpfSAke3N1ZmZpeH1gO1xuICByZXR1cm4gdGV4dDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJ1bmNhdGVUZXh0O1xuIl0s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QUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsVUFBVTtBQUFBLE1BQ1YsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFDaEIsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsU0FBUztBQUFBLE1BQ1QsVUFBVTtBQUFBLE1BQ1YsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsWUFBWTtBQUFBLE1BQ1osWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2Qsa0JBQWtCO0FBQUEsTUFDbEIsb0JBQW9CO0FBQUEsTUFDcEIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIsc0JBQXNCO0FBQUEsTUFDdEIsc0JBQXNCO0FBQUEsTUFDdEIsY0FBYztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsTUFDakIsc0JBQXNCO0FBQUEsTUFDdEIsa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsMEJBQTBCO0FBQUEsTUFDMUIsb0JBQW9CO0FBQUEsTUFDcEIsb0JBQW9CO0FBQUEsTUFDcEIsZUFBZTtBQUFBLE1BQ2Ysa0JBQWtCO0FBQUEsTUFDbEIsdUJBQXVCO0FBQUEsTUFDdkIsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsMkJBQTJCO0FBQUEsTUFDM0IscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIsWUFBWTtBQUFBLE1BQ1osZUFBZTtBQUFBLE1BQ2Ysb0JBQW9CO0FBQUEsTUFDcEIsZ0JBQWdCO0FBQUEsTUFDaEIsZ0JBQWdCO0FBQUEsTUFDaEIsd0JBQXdCO0FBQUEsTUFDeEIsa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIseUJBQXlCO0FBQUEsTUFDekIsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsZ0JBQWdCO0FBQUEsTUFDaEIsNEJBQTRCO0FBQUEsTUFDNUIsd0JBQXdCO0FBQUEsTUFDeEIsb0JBQW9CO0FBQUEsTUFDcEIsd0JBQXdCO0FBQUEsTUFDeEIsd0JBQXdCO0FBQUEsTUFDeEIsb0JBQW9CO0FBQUEsTUFDcEIsb0JBQW9CO0FBQUEsTUFDcEIsa0NBQWtDO0FBQUEsTUFDbEMsNEJBQTRCO0FBQUEsTUFDNUIsc0JBQXNCO0FBQUEsTUFDdEIsaUJBQWlCO0FBQUEsTUFDakIsNkJBQTZCO0FBQUEsTUFDN0IseUJBQXlCO0FBQUEsTUFDekIscUJBQXFCO0FBQUEsTUFDckIseUJBQXlCO0FBQUEsTUFDekIseUJBQXlCO0FBQUEsTUFDekIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIsbUNBQW1DO0FBQUEsTUFDbkMsNkJBQTZCO0FBQUEsTUFDN0IsdUJBQXVCO0FBQUEsTUFDdkIsbUJBQW1CO0FBQUEsTUFDbkIsK0JBQStCO0FBQUEsTUFDL0IsMkJBQTJCO0FBQUEsTUFDM0IsdUJBQXVCO0FBQUEsTUFDdkIsMkJBQTJCO0FBQUEsTUFDM0IsMkJBQTJCO0FBQUEsTUFDM0IsdUJBQXVCO0FBQUEsTUFDdkIsdUJBQXVCO0FBQUEsTUFDdkIscUNBQXFDO0FBQUEsTUFDckMseUJBQXlCO0FBQUEsTUFDekIsK0JBQStCO0FBQUEsTUFDL0IsaUJBQWlCO0FBQUEsTUFDakIsNkJBQTZCO0FBQUEsTUFDN0IseUJBQXlCO0FBQUEsTUFDekIscUJBQXFCO0FBQUEsTUFDckIseUJBQXlCO0FBQUEsTUFDekIseUJBQXlCO0FBQUEsTUFDekIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIsbUNBQW1DO0FBQUEsTUFDbkMsdUJBQXVCO0FBQUEsTUFDdkIsNkJBQTZCO0FBQUEsTUFDN0IscUJBQXFCO0FBQUEsTUFDckIscUNBQXFDO0FBQUEsTUFDckMsaUNBQWlDO0FBQUEsTUFDakMsaUNBQWlDO0FBQUEsTUFDakMsaUNBQWlDO0FBQUEsTUFDakMsaUNBQWlDO0FBQUEsTUFDakMseUJBQXlCO0FBQUEsTUFDekIseUJBQXlCO0FBQUEsTUFDekIseUJBQXlCO0FBQUEsTUFDekIseUJBQXlCO0FBQUEsTUFDekIsNkJBQTZCO0FBQUEsTUFDN0IsNkJBQTZCO0FBQUEsTUFDN0IsNkJBQTZCO0FBQUEsTUFDN0IsNkJBQTZCO0FBQUEsTUFDN0IsNkJBQTZCO0FBQUEsTUFDN0IsNkJBQTZCO0FBQUEsTUFDN0IsNkNBQTZDO0FBQUEsTUFDN0MsaUNBQWlDO0FBQUEsTUFDakMsaUNBQWlDO0FBQUEsTUFDakMsV0FBVztBQUFBLE1B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UUFDTCxRQUFPO0FBQUEsUUFDUCxRQUFPO0FBQUEsUUFDUCxhQUFZO0FBQUEsUUFDWixVQUFTO0FBQUEsTUFDVDtBQUFBLE1BQ0E7QUFBQSxRQUNBLE1BQUs7QUFBQSxRQUNMLFFBQU87QUFBQSxRQUNQLFFBQU87QUFBQSxRQUNQLGFBQVk7QUFBQSxRQUNaLFVBQVM7QUFBQSxNQUNUO0FBQUEsTUFDQTtBQUFBLFFBQ0EsTUFBSztBQUFBLFFBQ0wsUUFBTztBQUFBLFFBQ1AsUUFBTztBQUFBLFFBQ1AsYUFBWTtBQUFBLFFBQ1osVUFBUztBQUFBLE1BQ1Q7QUFBQSxNQUNBO0FBQUEsUUFDQSxNQUFLO0FBQUEsUUFDTCxRQUFPO0FBQUEsUUFDUCxRQUFPO0FBQUEsUUFDUCxhQUNBO0FBQUEsUUFDQSxVQUFTO0FBQUEsTUFDVDtBQUFBLE1BQ0E7QUFBQSxRQUNBLE1BQUs7QUFBQSxRQUNMLFFBQU87QUFBQSxRQUNQLFFBQU87QUFBQSxRQUNQLGFBQVk7QUFBQSxRQUNaLFVBQVM7QUFBQSxNQUNUO0FBQUEsTUFDQTtBQUFBLFFBQ0EsTUFBSztBQUFBLFFBQ0wsUUFBTztBQUFBLFFBQ1AsUUFBTztBQUFBLFFBQ1AsYUFBWTtBQUFBLFFBQ1osVUFBUztBQUFBLE1BQ1Q7QUFBQSxNQUNBO0FBQUEsUUFDQSxNQUFLO0FBQUEsUUFDTCxRQUFPO0FBQUEsUUFDUCxRQUFPO0FBQUEsUUFDUCxhQUFZO0FBQUEsUUFDWixVQUFTO0FBQUEsUUFDVCxRQUFPO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxRQUNBLE1BQUs7QUFBQSxRQUNMLFFBQU87QUFBQSxRQUNQLFFBQU87QUFBQSxRQUNQLGFBQVk7QUFBQSxRQUNaLFVBQVM7QUFBQSxNQUNUO0FBQUEsTUFDQTtBQUFBLFFBQ0EsTUFBSztBQUFBLFFBQ0wsUUFBTztBQUFBLFFBQ1AsUUFBTztBQUFBLFFBQ1AsYUFBWTtBQUFBLFFBQ1osVUFBUztBQUFBLE1BQ1Q7QUFBQSxNQUNBO0FBQUEsUUFDQSxNQUFLO0FBQUEsUUFDTCxRQUFPO0FBQUEsUUFDUCxRQUFPO0FBQUEsUUFDUCxhQUFZO0FBQUEsUUFDWixVQUFTO0FBQUEsTUFDVDtBQUFBLE1BQ0E7QUFBQSxRQUNBLE1BQUs7QUFBQSxRQUNMLFFBQU87QUFBQSxRQUNQLFFBQU87QUFBQSxRQUNQLGFBQVk7QUFBQSxRQUNaLFVBQVM7QUFBQSxNQUNUO0FBQUEsTUFDQTtBQUFBLFFBQ0EsTUFBSztBQUFBLFFBQ0wsUUFBTztBQUFBLFFBQ1AsUUFBTztBQUFBLFFBQ1AsYUFBWTtBQUFBLFFBQ1osVUFBUztBQUFBLE1BQ1Q7QUFBQSxNQUNBO0FBQUEsUUFDQSxNQUFLO0FBQUEsUUFDTCxRQUFPO0FBQUEsUUFDUCxRQUFPO0FBQUEsUUFDUCxhQUFZO0FBQUEsUUFDWixVQUFTO0FBQUEsTUFDVDtBQUFBLE1BQ0E7QUFBQSxRQUNBLE1BQUs7QUFBQSxRQUNMLFFBQU87QUFBQSxRQUNQLFFBQU87QUFBQSxRQUNQLGFBQVk7QUFBQSxRQUNaLFVBQVM7QUFBQSxNQUNUO0FBQUEsTUFDQTtBQUFBLFFBQ0EsTUFBSztBQUFBLFFBQ0wsUUFBTztBQUFBLFFBQ1AsUUFBTztBQUFBLFFBQ1AsYUFBWTtBQUFBLFFBQ1osVUFBUztBQUFBLE1BQ1Q7QUFBQSxNQUNBO0FBQUEsUUFDQSxNQUFLO0FBQUEsUUFDTCxRQUFPO0FBQUEsUUFDUCxRQUFPO0FBQUEsUUFDUCxhQUFZO0FBQUEsUUFDWixVQUFTO0FBQUEsTUFDVDtBQUFBLE1BQ0E7QUFBQSxRQUNBLE1BQUs7QUFBQSxRQUNMLFFBQU87QUFBQSxRQUNQLFFBQU87QUFBQSxRQUNQLGFBQVk7QUFBQSxRQUNaLFVBQVM7QUFBQSxRQUNULFFBQU87QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLFFBQ0EsTUFBSztBQUFBLFFBQ0wsUUFBTztBQUFBLFFBQ1AsUUFBTztBQUFBLFFBQ1AsYUFBWTtBQUFBLFFBQ1osVUFBUztBQUFBLFFBQ1QsUUFBTztBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsUUFDQSxNQUFLO0FBQUEsUUFDTCxRQUFPO0FBQUEsUUFDUCxRQUFPO0FBQUEsUUFDUCxhQUFZO0FBQUEsUUFDWixVQUFTO0FBQUEsTUFDVDtBQUFBLE1BQ0E7QUFBQSxRQUNBLE1BQUs7QUFBQSxRQUNMLFFBQU87QUFBQSxRQUNQLFFBQU87QUFBQSxRQUNQLGFBQVk7QUFBQSxRQUNaLFVBQVM7QUFBQSxNQUNUO0FBQUEsTUFDQTtBQUFBLFFBQ0EsTUFBSztBQUFBLFFBQ0wsUUFBTztBQUFBLFFBQ1AsUUFBTztBQUFBLFFBQ1AsYUFBWTtBQUFBLFFBQ1osVUFBUztBQUFBLE1BQ1Q7QUFBQSxNQUNBO0FBQUEsUUFDQSxNQUFLO0FBQUEsUUFDTCxRQUFPO0FBQUEsUUFDUCxRQUFPO0FBQUEsUUFDUCxhQUFZO0FBQUEsUUFDWixVQUFTO0FBQUEsTUFDVDtBQUFBLE1BQ0E7QUFBQSxRQUNBLE1BQUs7QUFBQSxRQUNMLFFBQU87QUFBQSxRQUNQLFFBQU87QUFBQSxRQUNQLGFBQVk7QUFBQSxRQUNaLFVBQVM7QUFBQSxNQUNUO0FBQUEsTUFDQTtBQUFBLFFBQ0EsTUFBSztBQUFBLFFBQ0wsUUFBTztBQUFBLFFBQ1AsUUFBTztBQUFBLFFBQ1AsYUFBWTtBQUFBLFFBQ1osVUFBUztBQUFBLE1BQ1Q7QUFBQSxNQUNBO0FBQUEsUUFDQSxNQUFLO0FBQUEsUUFDTCxRQUFPO0FBQUEsUUFDUCxRQUFPO0FBQUEsUUFDUCxhQUFZO0FBQUEsUUFDWixVQUFTO0FBQUEsTUFDVDtBQUFBLE1BQ0E7QUFBQSxRQUNBLE1BQUs7QUFBQSxRQUNMLFFBQU87QUFBQSxRQUNQLFFBQU87QUFBQSxRQUNQLGFBQVk7QUFBQSxRQUNaLFVBQVM7QUFBQSxNQUNUO0FBQUEsTUFDQTtBQUFBLFFBQ0EsTUFBSztBQUFBLFFBQ0wsUUFBTztBQUFBLFFBQ1AsUUFBTztBQUFBLFFBQ1AsYUFBWTtBQUFBLFFBQ1osVUFBUztBQUFBLE1BQ1Q7QUFBQSxNQUNBO0FBQUEsUUFDQSxNQUFLO0FBQUEsUUFDTCxRQUFPO0FBQUEsUUFDUCxRQUFPO0FBQUEsUUFDUCxhQUFZO0FBQUEsUUFDWixVQUFTO0FBQUEsTUFDVDtBQUFBLE1BQ0E7QUFBQSxRQUNBLE1BQUs7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QUMsbUJBQU8sWUFBUCxFQUFrQixPQUFNLFVBQVMsVUFBVSxvQkFBb0IsQ0FDbEU7QUFBQTtBQUFBLElBR0YscUJBQUMsaUJBQUssVUFBTCxFQUFjLElBQUcsUUFDaEIscUJBQUMsaUJBQUssU0FBUyxNQUFkLEVBQW1CLE9BQU0sVUFBUyxPQUFNLFVBQVMsR0FDbEQscUJBQUMsaUJBQUssU0FBUyxNQUFkLEVBQW1CLE9BQU0sVUFBUyxPQUFNLFVBQVMsQ0FDcEQ7QUFBQSxJQUNBLHFCQUFDLGlCQUFLLFVBQUwsRUFBYyxJQUFHLFFBQU8sVUFBVSxhQUNqQyxxQkFBQyxpQkFBSyxTQUFTLE1BQWQsRUFBbUIsT0FBTSxRQUFPLE9BQU0sY0FBYSxHQUNwRCxxQkFBQyxpQkFBSyxTQUFTLE1BQWQsRUFBbUIsT0FBTSxRQUFPLE9BQU0sUUFBTyxDQUNoRDtBQUFBLElBQ0MsV0FBVyxVQUFVLHFCQUFDLGlCQUFLLFVBQUwsRUFBYyxJQUFHLFNBQVE7QUFBQSxJQUMvQyxXQUFXLFVBQVUscUJBQUMsaUJBQUssWUFBTCxFQUFnQixJQUFHLFNBQVEsT0FBTSxJQUFHLHdCQUF3QixPQUFPO0FBQUEsRUFDNUY7QUFFSjtBQUVBLElBQU8sd0JBQVE7IiwKICAibmFtZXMiOiBbImV4cHJlc3Npb24iLCAicHJvY2VzcyIsICJpbXBvcnRfbm9kZV9wcm9jZXNzIiwgImltcG9ydF9ub2RlX3V0aWwiLCAicHJvY2VzcyIsICJpbXBvcnRfbm9kZV9wcm9jZXNzIiwgInR0eSIsICJpbXBvcnRfbm9kZV91dGlsIiwgImltcG9ydF9ub2RlX3Byb2Nlc3MiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZnMiLCAicGF0aCIsICJpIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImZzIiwgInBhdGgiLCAidSIsICJvIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImZzIiwgInBhdGgiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAicGF0aCIsICJpIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgInBhdGhLZXkiLCAiZW52aXJvbm1lbnQiLCAicGxhdGZvcm0iLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAicGF0aCIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJwYXRoIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImZzIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgInBhdGgiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAic3Bhd24iLCAic3Bhd25TeW5jIiwgInBsYXRmb3JtIiwgImluaXRfZGVmYXVsdCIsICJwYXRoIiwgImltcG9ydF9ub2RlX3V0aWwiLCAiaW1wb3J0X25vZGVfY2hpbGRfcHJvY2VzcyIsICJpbXBvcnRfbm9kZV91cmwiLCAiaW5pdF9kZWZhdWx0IiwgImV4ZWNGaWxlQ2FsbGJhY2siLCAiaW1wb3J0X25vZGVfcHJvY2VzcyIsICJpbXBvcnRfbm9kZV9wYXRoIiwgInByb2Nlc3MiLCAiZXhlY1BhdGgiLCAicGF0aCIsICJzaWduYWxzIiwgImltcG9ydF9ub2RlX29zIiwgInNpZ25hbHMiLCAiaW1wb3J0X25vZGVfb3MiLCAibm9ybWFsaXplU2lnbmFsIiwgImlzQ29ubmVjdGVkIiwgImltcG9ydF9ub2RlX2V2ZW50cyIsICJpbXBvcnRfbm9kZV9ldmVudHMiLCAiaW1wb3J0X3Byb21pc2VzIiwgImltcG9ydF9ub2RlX2V2ZW50cyIsICJpbXBvcnRfbm9kZV9ldmVudHMiLCAiaW1wb3J0X25vZGVfdXRpbCIsICJpbXBvcnRfcHJvbWlzZXMiLCAiaW5pdF9ncmFjZWZ1bCIsICJpbXBvcnRfcHJvbWlzZXMiLCAiaW1wb3J0X25vZGVfcHJvY2VzcyIsICJpbXBvcnRfbm9kZV9wYXRoIiwgImluaXRfbm9kZSIsICJwYXRoIiwgImNvcnJlY3RFbmNvZGluZyIsICJpbXBvcnRfbm9kZV9wYXRoIiwgImltcG9ydF9ub2RlX3Byb2Nlc3MiLCAicGF0aCIsICJwcm9jZXNzIiwgImltcG9ydF9ub2RlX3BhdGgiLCAiaW1wb3J0X25vZGVfcHJvY2VzcyIsICJpbml0X2dyYWNlZnVsIiwgImluaXRfbm9kZSIsICJjcm9zc1NwYXduIiwgInByb2Nlc3MiLCAicGF0aCIsICJvYmplY3RUb1N0cmluZyIsICJpZGVudGl0eSIsICJpZGVudGl0eSIsICJ0ZXh0RW5jb2RlciIsICJ0ZXh0RGVjb2RlciIsICJpZGVudGl0eSIsICJpbXBvcnRfbm9kZV9ldmVudHMiLCAiaW1wb3J0X3Byb21pc2VzIiwgImltcG9ydF9ub2RlX3V0aWwiLCAibWlsbGlzZWNvbmRzIiwgImNvdW50IiwgImlzUmVhZGFibGVTdHJlYW0iLCAiaXNXcml0YWJsZVN0cmVhbSIsICJpbXBvcnRfbm9kZV9wcm9jZXNzIiwgImlzV3JpdGFibGVTdHJlYW0iLCAicHJvY2VzcyIsICJpbml0X2FycmF5IiwgImFkZERlZmF1bHRWYWx1ZSIsICJpbml0X2FycmF5IiwgImltcG9ydF9ub2RlX2ZzIiwgImltcG9ydF9ub2RlX3R0eSIsICJ0dHkiLCAiYWRkUHJvcGVydGllcyIsICJvcHRpb25OYW1lIiwgInZhbHVlIiwgImltcG9ydF9ub2RlX2ZzIiwgInN0cmlwRmluYWxOZXdsaW5lIiwgIkxGIiwgImltcG9ydF9ub2RlX2J1ZmZlciIsICJpbXBvcnRfbm9kZV9zdHJpbmdfZGVjb2RlciIsICJ0ZXh0RW5jb2RlciIsICJpbXBvcnRfbm9kZV91dGlsIiwgImlkZW50aXR5R2VuZXJhdG9yIiwgImVuY29kaW5nIiwgImdlbmVyYXRvcnMiLCAiaW1wb3J0X25vZGVfZnMiLCAic3RyaXBGaW5hbE5ld2xpbmUiLCAicGF0aCIsICJpbXBvcnRfbm9kZV9ldmVudHMiLCAiaW1wb3J0X25vZGVfY2hpbGRfcHJvY2VzcyIsICJpbXBvcnRfbm9kZV9ldmVudHMiLCAidGhyb3dPbkRpc2Nvbm5lY3QiLCAiaW1wb3J0X25vZGVfZXZlbnRzIiwgImltcG9ydF9ub2RlX3Byb2Nlc3MiLCAicHJvY2VzcyIsICJpbXBvcnRfbm9kZV9jaGlsZF9wcm9jZXNzIiwgImltcG9ydF9ub2RlX3N0cmVhbSIsICJpbXBvcnRfbm9kZV9mcyIsICJpbXBvcnRfbm9kZV9idWZmZXIiLCAiaW1wb3J0X25vZGVfc3RyZWFtIiwgImFkZFByb3BlcnRpZXMiLCAiaW1wb3J0X25vZGVfZXZlbnRzIiwgImltcG9ydF9ub2RlX3N0cmVhbSIsICJpbXBvcnRfcHJvbWlzZXMiLCAibm9vcCIsICJQYXNzVGhyb3VnaFN0cmVhbSIsICJhYm9ydGVkIiwgImluY3JlbWVudCIsICJpbXBvcnRfcHJvbWlzZXMiLCAiaW5pdF9zaWduYWxzIiwgImdsb2JhbCIsICJwcm9jZXNzIiwgImluaXRfc2lnbmFscyIsICJpIiwgImNvdW50IiwgImEiLCAiaW1wb3J0X25vZGVfZXZlbnRzIiwgImltcG9ydF9wcm9taXNlcyIsICJpbXBvcnRfbm9kZV91dGlsIiwgImltcG9ydF9ub2RlX2V2ZW50cyIsICJpbXBvcnRfbm9kZV9zdHJlYW0iLCAic3RyaXBGaW5hbE5ld2xpbmUiLCAiaW1wb3J0X3Byb21pc2VzIiwgImdldFN0cmVhbUNvbnRlbnRzIiwgImluaXRfY29udGVudHMiLCAic3RyaXBGaW5hbE5ld2xpbmUiLCAiaW1wb3J0X3Byb21pc2VzIiwgImluaXRfY29udGVudHMiLCAic3RyaXBGaW5hbE5ld2xpbmUiLCAic3RyaXBGaW5hbE5ld2xpbmUiLCAiaXNWZXJib3NlIiwgImltcG9ydF9ub2RlX2V2ZW50cyIsICJpbml0X2dyYWNlZnVsIiwgImluaXRfY29udGVudHMiLCAic3RyaXBGaW5hbE5ld2xpbmUiLCAiaW1wb3J0X3Byb21pc2VzIiwgImltcG9ydF9ub2RlX3N0cmVhbSIsICJpbXBvcnRfbm9kZV91dGlsIiwgInJlYWRhYmxlIiwgImltcG9ydF9ub2RlX3N0cmVhbSIsICJpbXBvcnRfbm9kZV91dGlsIiwgIndyaXRhYmxlIiwgImltcG9ydF9ub2RlX3N0cmVhbSIsICJpbXBvcnRfbm9kZV91dGlsIiwgImR1cGxleCIsICJpbXBvcnRfbm9kZV9ldmVudHMiLCAiaW1wb3J0X25vZGVfY2hpbGRfcHJvY2VzcyIsICJtYXBBcmd1bWVudHMiLCAiYm91bmRPcHRpb25zIiwgInNldEJvdW5kRXhlY2EiLCAiaW5pdF9jb21tYW5kIiwgImdldENhbmNlbFNpZ25hbCIsICJnZXRFYWNoTWVzc2FnZSIsICJnZXRPbmVNZXNzYWdlIiwgInNlbmRNZXNzYWdlIiwgImluaXRfY29tbWFuZCIsICJpbml0X25vZGUiLCAiaW1wb3J0X2FwaSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X25vZGVfcGF0aCIsICJleGVjYSIsICJwcm9jZXNzIiwgInBhdGgiLCAiZnMiLCAiY3J5cHRvIl0KfQo=
