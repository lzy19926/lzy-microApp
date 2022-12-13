"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 可开闭式logger
class Logger {
    constructor({ showLoggerInfo }) {
        this.showLoggerInfo = showLoggerInfo;
    }
    log(...args) {
        if (this.showLoggerInfo) {
            console.log('--------------lzyMicroAppLogger--------------');
            console.log(...args);
        }
    }
    warn(...args) {
        if (this.showLoggerInfo) {
            console.log('--------------lzyMicroAppLogger--------------');
            console.warn(...args);
        }
    }
    error(...args) {
        if (this.showLoggerInfo) {
            console.log('--------------lzyMicroAppLogger--------------');
            console.error(...args);
        }
    }
}
exports.default = new Logger({ showLoggerInfo: true });
