"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const loggerError = debug_1.default;
const loggerLog = debug_1.default;
const loggerDebug = debug_1.default;
loggerLog.formatArgs = loggerError.formatArgs = loggerDebug.formatArgs = LogHandeler;
loggerLog.log = console.log.bind(console);
loggerDebug.log = console.debug.bind(console);
function LogHandeler(args) {
    const name = this.namespace;
    const dateTime = new Date().toLocaleString("PT-BR");
    const c = parseInt(this.color);
    const FilePath = path_1.default.resolve(process.cwd() + "/logs/" + new Date().toLocaleDateString().replace(/\//g, "-"));
    const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
    const prefix = ` ${colorCode};1m[${name}]\u001b[0m | `;
    args[0] = "\x1b[32m" + `[${dateTime}]` + "\x1b[0m" + "|" + prefix + args[0].split('\n').join('\n' + '                       ' + prefix);
    args.push(colorCode + 'm+' + debug_1.default.humanize(this.diff) + '\u001b[0m');
    if (!fs_1.default.existsSync(FilePath)) {
        fs_1.default.mkdirSync(FilePath, { recursive: true });
    }
    const logger = loggerWrite[name.substring(name.indexOf(":") + 1, name.lastIndexOf(":"))](FilePath);
    // eslint-disable-next-line no-control-regex
    logger.write(`${args.join(' ').replace(/\u001b[^m]*?m|\s\s/g, "")} \n`);
}
const loggerWrite = {
    "debug": (FilePath) => fs_1.default.createWriteStream(path_1.default.join(FilePath, "debug.log"), { flags: 'a', }),
    "error": (FilePath) => fs_1.default.createWriteStream(path_1.default.join(FilePath, "error.log"), { flags: 'a' }),
    ":": (FilePath) => fs_1.default.createWriteStream(path_1.default.join(FilePath, "log.log"), { flags: 'a' })
};
class logger {
    constructor(identify) {
        const appName = process.env.LoggerName || "app";
        this.log = loggerLog(`${appName}:${identify}`);
        this.error = loggerError(`${appName}:error:${identify}`);
        this.debug = loggerDebug(`${appName}:debug:${identify}`);
    }
}
exports.default = logger;
global.logger = logger;
