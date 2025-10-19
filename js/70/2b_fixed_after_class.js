'use strict';
globalThis.app = globalThis.app || {};
globalThis.app.createCounter = (function () {

    let amountOfCounters = 0;

    return () => {

        let value = 0;

        amountOfCounters++;

        return {
            globalAmountOfCounters: () => amountOfCounters,
            increment: (x) => value += (x ?? 1),
            getCount: () => value,
            reset: function () {
                value = 0;
                return this;
            }
        };
    };



})();






