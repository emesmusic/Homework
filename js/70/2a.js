'use strict';
globalThis.app = globalThis.app || {};
globalThis.app.counter = (function () {

    let value = 0;

    return {
        increment: (x) => value += (x ?? 1),
        getCount: () => value,
        reset: function () {
            value = 0;
            return this;
        }

    };



}());
