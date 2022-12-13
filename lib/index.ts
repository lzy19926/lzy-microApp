import { MicroAppElement } from './microApp_element'
import logger from './logger';

// 也就是start方法
export function runTest({
    showLoggerInfo = true
}) {

    // 初始化logger
    logger.showLoggerInfo = showLoggerInfo
    // 启动,初始化customELE
    customElements.define('micro-app-element', MicroAppElement);
}