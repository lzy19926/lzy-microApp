// lifecycle常量
export enum lifeCycles {

    BEFOREMOUNT = 'beforemount',
    MOUNTED = 'mounted',
    CREATED = 'created',
    UNMOUNT = 'unmount',
    ERROR = 'error',
}


// app 状态
export enum appStates {
    CREATED = 'created',
    LOADING = 'loading',
    LOADED = 'loaded',
    LOAD_FAILED = 'load_failed',
    MOUNTING = 'mounting',
    MOUNTED = 'mounted',
    UNMOUNT = 'unmount',
}