import debug from 'debug';
export default class logger {
    log: debug.Debugger;
    error: debug.Debugger;
    debug: debug.Debugger;
    constructor(identify: string);
}
declare global {
    var logger: {
        new (identify: string): logger;
    };
}
