"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./recoilStore/selectors.js":
/*!**********************************!*\
  !*** ./recoilStore/selectors.js ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"userSelector\": function() { return /* binding */ userSelector; }\n/* harmony export */ });\n/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! recoil */ \"./node_modules/recoil/es/index.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ \"./recoilStore/index.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst userSelector = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.selector)({\n    key: \"userSelector\",\n    get: (param)=>{\n        let { get  } = param;\n        return get(_index__WEBPACK_IMPORTED_MODULE_1__.user);\n    },\n    set: (param, session)=>{\n        let { set  } = param;\n        set(_index__WEBPACK_IMPORTED_MODULE_1__.user, session);\n    }\n});\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZWNvaWxTdG9yZS9zZWxlY3RvcnMuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFrQztBQUNIO0FBRXhCLE1BQU1FLGVBQWVGLGdEQUFRQSxDQUFDO0lBQ25DRyxLQUFJO0lBQ0pDLEtBQUssU0FBV0E7WUFBVixFQUFDQSxJQUFHLEVBQUM7ZUFBS0EsSUFBSUgsd0NBQUlBO0lBQUE7SUFDeEJJLEtBQUssUUFBUUMsVUFBWTtZQUFuQixFQUFDRCxJQUFHLEVBQUM7UUFDVEEsSUFBSUosd0NBQUlBLEVBQUVLO0lBQ1o7QUFDRixHQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3JlY29pbFN0b3JlL3NlbGVjdG9ycy5qcz82NDQ3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNlbGVjdG9yIH0gZnJvbSBcInJlY29pbFwiO1xyXG5pbXBvcnQgeyB1c2VyIH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VyU2VsZWN0b3IgPSBzZWxlY3Rvcih7XHJcbiAga2V5OlwidXNlclNlbGVjdG9yXCIsXHJcbiAgZ2V0OiAoe2dldH0pID0+IGdldCh1c2VyKSxcclxuICBzZXQ6ICh7c2V0fSwgc2Vzc2lvbikgPT4ge1xyXG4gICAgc2V0KHVzZXIsIHNlc3Npb24pO1xyXG4gIH1cclxufSlcclxuIl0sIm5hbWVzIjpbInNlbGVjdG9yIiwidXNlciIsInVzZXJTZWxlY3RvciIsImtleSIsImdldCIsInNldCIsInNlc3Npb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./recoilStore/selectors.js\n"));

/***/ })

});