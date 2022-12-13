// 修改全局变量document  修改全局方法  
//!  修改document方法
function patchDocument() {
    const rawDocument = globalEnv.rawDocument;
    const rawRootDocument = globalEnv.rawRootDocument;
    function getBindTarget(target) {
        return isProxyDocument(target) ? rawDocument : target;
    }
    // create element 👇
    rawRootDocument.prototype.createElement = function createElement(tagName, options) {
        const element = globalEnv.rawCreateElement.call(getBindTarget(this), tagName, options);
        return markElement(element);
    };
    rawRootDocument.prototype.createElementNS = function createElementNS(namespaceURI, name, options) {
        const element = globalEnv.rawCreateElementNS.call(getBindTarget(this), namespaceURI, name, options);
        return markElement(element);
    };
    rawRootDocument.prototype.createDocumentFragment = function createDocumentFragment() {
        const element = globalEnv.rawCreateDocumentFragment.call(getBindTarget(this));
        return markElement(element);
    };
    // query element👇
    function querySelector(selectors) {
        var _a, _b, _c;
        const _this = getBindTarget(this);
        const currentAppName = getCurrentAppName();
        if (!currentAppName ||
            !((_a = appInstanceMap.get(currentAppName)) === null || _a === void 0 ? void 0 : _a.container) ||
            !selectors ||
            isUniqueElement(selectors) ||
            // see https://github.com/micro-zoe/micro-app/issues/56
            rawDocument !== _this) {
            return globalEnv.rawQuerySelector.call(_this, selectors);
        }
        return (_c = (_b = appInstanceMap.get(currentAppName)) === null || _b === void 0 ? void 0 : _b.querySelector(selectors)) !== null && _c !== void 0 ? _c : null;
    }
    function querySelectorAll(selectors) {
        var _a, _b, _c;
        const _this = getBindTarget(this);
        const currentAppName = getCurrentAppName();
        if (!currentAppName ||
            !((_a = appInstanceMap.get(currentAppName)) === null || _a === void 0 ? void 0 : _a.container) ||
            !selectors ||
            isUniqueElement(selectors) ||
            rawDocument !== _this) {
            return globalEnv.rawQuerySelectorAll.call(_this, selectors);
        }
        return (_c = (_b = appInstanceMap.get(currentAppName)) === null || _b === void 0 ? void 0 : _b.querySelectorAll(selectors)) !== null && _c !== void 0 ? _c : [];
    }
    rawRootDocument.prototype.querySelector = querySelector;
    rawRootDocument.prototype.querySelectorAll = querySelectorAll;
    rawRootDocument.prototype.getElementById = function getElementById(key) {
        const _this = getBindTarget(this);
        if (!getCurrentAppName() || isInvalidQuerySelectorKey(key)) {
            return globalEnv.rawGetElementById.call(_this, key);
        }
        try {
            return querySelector.call(_this, `#${key}`);
        }
        catch (_a) {
            return globalEnv.rawGetElementById.call(_this, key);
        }
    };
    rawRootDocument.prototype.getElementsByClassName = function getElementsByClassName(key) {
        const _this = getBindTarget(this);
        if (!getCurrentAppName() || isInvalidQuerySelectorKey(key)) {
            return globalEnv.rawGetElementsByClassName.call(_this, key);
        }
        try {
            return querySelectorAll.call(_this, `.${key}`);
        }
        catch (_a) {
            return globalEnv.rawGetElementsByClassName.call(_this, key);
        }
    };
    rawRootDocument.prototype.getElementsByTagName = function getElementsByTagName(key) {
        var _a;
        const _this = getBindTarget(this);
        const currentAppName = getCurrentAppName();
        if (!currentAppName ||
            isUniqueElement(key) ||
            isInvalidQuerySelectorKey(key) ||
            (!((_a = appInstanceMap.get(currentAppName)) === null || _a === void 0 ? void 0 : _a.inline) && /^script$/i.test(key))) {
            return globalEnv.rawGetElementsByTagName.call(_this, key);
        }
        try {
            return querySelectorAll.call(_this, key);
        }
        catch (_b) {
            return globalEnv.rawGetElementsByTagName.call(_this, key);
        }
    };
    rawRootDocument.prototype.getElementsByName = function getElementsByName(key) {
        const _this = getBindTarget(this);
        if (!getCurrentAppName() || isInvalidQuerySelectorKey(key)) {
            return globalEnv.rawGetElementsByName.call(_this, key);
        }
        try {
            return querySelectorAll.call(_this, `[name=${key}]`);
        }
        catch (_a) {
            return globalEnv.rawGetElementsByName.call(_this, key);
        }
    };
}
