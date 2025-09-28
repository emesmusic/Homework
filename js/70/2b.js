'use strict';
globalThis.app = globalThis.app || {};
globalThis.app.createCounter = () => {

    let value = 0;

    globalThis.app.amountOfCounters = (globalThis.app.amountOfCounters || 0) + 1;

    return {
        increment: (x) => value += (x ?? 1),
        getCount: () => value,
        reset: function () {
            value = 0;
            return this;
        }
    };
};

