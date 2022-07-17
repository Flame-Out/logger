# Flame logger
## To use the **flame logger** insttal with `npm i @flame-out/logger` and add in your entry file:

```ts
// src/index.ts
// import logger and global config
import "@flame-out/logger"
// Use LoggerName env to setup logger application name
process.env.LoggerName = "AppName"
// Create new logger instance
const log = new global.logger("LoggerInstance");
// All logger prints on respectives console stdout
log.log("log")
log.debug("debug")
log.error("error")
```
## And add this to the tsconfig file:
```json
// /tsconfig.json
{
  "compilerOptions": {
  //...
    "types": [
      //...
      "@flame-out/logger/build"
    ],
    //...
  }
  //...
}
```

## To see log output define the env DEBUG to "\*". you can also filter the debug output by providing a wildcard match string: "app:\*", "\*:debug:\*"

now when you start the application you will see this on console

[16/07/2022 21:09:32]| [AppName:LoggerInstance] | check +0ms

[16/07/2022 21:09:32]| [AppName:DEBUG:LoggerInstance] | check +0ms

[16/07/2022 21:09:32]| [AppName:ERROR:LoggerInstance] | check +0ms

# Log output
 **Flame Logger** create a folder called logs with dinamic folders name as the current date whit the files "log.log", "debug.log" and "error.log" with all your application log
