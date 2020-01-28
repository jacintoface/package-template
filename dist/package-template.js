(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Vuex = factory());
}(this, (function () { 'use strict';

    function jQuery () {
        console.log(888999);
    }

    return jQuery;

})));
