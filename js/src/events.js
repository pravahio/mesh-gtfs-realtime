class Events {
    constructor(moduleN) {
        this.moduleName = moduleN
        this.fnMap = new Map()
    }

    on(type, fn) {
        this.fnMap[type] = fn
        return this
    }

    get(type) {
        return this.fnMap[type]
    }
}

export { Events }
