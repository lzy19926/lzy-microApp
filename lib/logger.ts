// 可开闭式logger
class Logger {
    showLoggerInfo: boolean

    constructor({ showLoggerInfo }) {
        this.showLoggerInfo = showLoggerInfo
    }

    log(...args: any[]) {
        if (this.showLoggerInfo) {
            console.log('--------------lzyMicroAppLogger--------------');
            console.log(...args);
        }
    }

    warn(...args: any[]) {
        if (this.showLoggerInfo) {
            console.log('--------------lzyMicroAppLogger--------------');
            console.warn(...args);
        }
    }

    error(...args: any[]) {
        if (this.showLoggerInfo) {
            console.log('--------------lzyMicroAppLogger--------------');
            console.error(...args);
        }
    }
}

export default new Logger({ showLoggerInfo: true })