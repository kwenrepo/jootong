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

/***/ "./recoilStore/userStore.js":
/*!**********************************!*\
  !*** ./recoilStore/userStore.js ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"userSelector\": function() { return /* binding */ userSelector; }\n/* harmony export */ });\n/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! recoil */ \"./node_modules/recoil/es/index.js\");\n/* harmony import */ var _atoms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./atoms */ \"./recoilStore/atoms.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/react */ \"./node_modules/next-auth/react/index.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function session() {\n    return await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.getSession)();\n}\nconst userSelector = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.selector)({\n    key: \"userSelector\",\n    get: (param)=>{\n        let { get  } = param;\n        const user = get(user);\n        return user;\n    },\n    set: (param, session)=>{\n        let { set  } = param;\n        set(_atoms__WEBPACK_IMPORTED_MODULE_1__.user, session);\n    }\n});\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZWNvaWxTdG9yZS91c2VyU3RvcmUuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBa0M7QUFDSDtBQUNjO0FBRTdDLGVBQWVHLFVBQVM7SUFDdEIsT0FBTyxNQUFNRCwyREFBVUE7QUFDekI7QUFFTyxNQUFNRSxlQUFlSixnREFBUUEsQ0FBQztJQUNuQ0ssS0FBSTtJQUNKQyxLQUFLLFNBQWE7WUFBWixFQUFFQSxJQUFHLEVBQUU7UUFDWCxNQUFNTCxPQUFPSyxJQUFJTDtRQUNqQixPQUFPQTtJQUNUO0lBQ0FNLEtBQUssUUFBUUosVUFBWTtZQUFuQixFQUFDSSxJQUFHLEVBQUM7UUFDVEEsSUFBSU4sd0NBQUlBLEVBQUVFO0lBQ1o7QUFDRixHQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3JlY29pbFN0b3JlL3VzZXJTdG9yZS5qcz9kYzc0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNlbGVjdG9yIH0gZnJvbSBcInJlY29pbFwiO1xyXG5pbXBvcnQgeyB1c2VyIH0gZnJvbSBcIi4vYXRvbXNcIjtcclxuaW1wb3J0IHsgZ2V0U2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGgvcmVhY3RcIjtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNlc3Npb24oKXtcclxuICByZXR1cm4gYXdhaXQgZ2V0U2Vzc2lvbigpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdXNlclNlbGVjdG9yID0gc2VsZWN0b3Ioe1xyXG4gIGtleTpcInVzZXJTZWxlY3RvclwiLFxyXG4gIGdldDogKHsgZ2V0IH0pID0+IHtcclxuICAgIGNvbnN0IHVzZXIgPSBnZXQodXNlcik7XHJcbiAgICByZXR1cm4gdXNlcjtcclxuICB9LFxyXG4gIHNldDogKHtzZXR9LCBzZXNzaW9uKSA9PiB7XHJcbiAgICBzZXQodXNlciwgc2Vzc2lvbik7XHJcbiAgfVxyXG59KVxyXG4iXSwibmFtZXMiOlsic2VsZWN0b3IiLCJ1c2VyIiwiZ2V0U2Vzc2lvbiIsInNlc3Npb24iLCJ1c2VyU2VsZWN0b3IiLCJrZXkiLCJnZXQiLCJzZXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./recoilStore/userStore.js\n"));

/***/ })

});