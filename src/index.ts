import debug from 'debug'
import path from 'path'
import fs from 'fs'

const loggerError = debug
const loggerLog = debug
const loggerDebug = debug

loggerLog.formatArgs = loggerError.formatArgs = loggerDebug.formatArgs = LogHandeler
loggerLog.log = console.log.bind(console)
loggerDebug.log = console.debug.bind(console)

function LogHandeler(this: debug.Debugger, args: string[]) {
  const name = this.namespace
  const dateTime = new Date().toLocaleString("PT-BR")
  const c = parseInt(this.color)
  const FilePath = path.resolve(process.cwd() + "/logs/" + new Date().toLocaleDateString().replace(/\//g, "-"))
  const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
  const prefix = ` ${colorCode};1m[${name}]\u001b[0m | `
  args[0] = "\x1b[32m" + `[${dateTime}]` + "\x1b[0m" + "|" + prefix + args[0].split('\n').join('\n' + '                       ' + prefix)
  args.push(colorCode + 'm+' + debug.humanize(this.diff) + '\u001b[0m')
  if (!fs.existsSync(FilePath)) {
    fs.mkdirSync(FilePath, { recursive: true })
  }

  const logger = loggerWrite[name.substring(name.indexOf(":") + 1, name.lastIndexOf(":"))](FilePath)
  // eslint-disable-next-line no-control-regex
  logger.write(`${args.join(' ').replace(/\u001b[^m]*?m|\s\s/g, "")} \n`)
}

const loggerWrite: {
  [key: string]: (FilePath: string) => fs.WriteStream
} = {
  "debug": (FilePath: string) => fs.createWriteStream(path.join(FilePath, "debug.log"), { flags: 'a', }),
  "error": (FilePath: string) => fs.createWriteStream(path.join(FilePath, "error.log"), { flags: 'a' }),
  ":": (FilePath: string) => fs.createWriteStream(path.join(FilePath, "log.log"), { flags: 'a' })
}

export default class logger {
  public log: debug.Debugger
  public error: debug.Debugger
  public debug: debug.Debugger
  constructor(identify: string) {
    const appName = process.env.LoggerName || "app"
    this.log = loggerLog(`${appName}:${identify}`)
    this.error = loggerError(`${appName}:error:${identify}`)
    this.debug = loggerDebug(`${appName}:debug:${identify}`)
  }
}


global.logger = logger

declare global {
  var logger: { new(identify: string): logger }
}