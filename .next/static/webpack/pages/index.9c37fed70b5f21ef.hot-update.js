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

/***/ "./components/auth/UserStatus.js":
/*!***************************************!*\
  !*** ./components/auth/UserStatus.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ UserStatus; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _UserStatus_module_scss__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./UserStatus.module.scss */ \"./components/auth/UserStatus.module.scss\");\n/* harmony import */ var _UserStatus_module_scss__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_UserStatus_module_scss__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/react */ \"./node_modules/next-auth/react/index.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! recoil */ \"./node_modules/recoil/es/index.js\");\n/* harmony import */ var _recoilStore_userStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! #recoilStore/userStore */ \"./recoilStore/userStore.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _components_auth_Signin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! #components/auth/Signin */ \"./components/auth/Signin.js\");\n/* harmony import */ var _components_auth_Signup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! #components/auth/Signup */ \"./components/auth/Signup.js\");\n/* harmony import */ var _components_auth_SnsSignup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! #components/auth/SnsSignup */ \"./components/auth/SnsSignup.js\");\n/* harmony import */ var _components_auth_UserCard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! #components/auth/UserCard */ \"./components/auth/UserCard.js\");\n/* harmony import */ var _components_modal_Alert__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! #components/modal/Alert */ \"./components/modal/Alert.js\");\n/* harmony import */ var _components_Loading__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! #components/Loading */ \"./components/Loading.js\");\n/* harmony import */ var _utils_getTime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! #utils/getTime */ \"./utils/getTime.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction UserStatus() {\n    _s();\n    // const {data: session} = useSession();\n    const session = [];\n    // console.log(session)\n    const setUser = (0,recoil__WEBPACK_IMPORTED_MODULE_3__.useSetRecoilState)(_recoilStore_userStore__WEBPACK_IMPORTED_MODULE_4__.userSelector);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();\n    const [alertData, setAlertData] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({\n        isAlert: false,\n        message: \"\",\n        confirm: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {}, void 0, false, {\n            fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n            lineNumber: 25,\n            columnNumber: 13\n        }, this),\n        cancel: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {}, void 0, false, {\n            fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n            lineNumber: 26,\n            columnNumber: 12\n        }, this)\n    });\n    const [snsSignup, setSnsSignup] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    const [loginArea, setLoginArea] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    const [signupArea, setSignupArea] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    const [userArea, setUserArea] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    const [alarm, setAlarm] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    const [privateRoomList, setPrivateRoomList] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        setUser();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            (session === null || session === void 0 ? void 0 : session.user_key) ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_UserStatus_module_scss__WEBPACK_IMPORTED_MODULE_13___default().user_status),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        onClick: ()=>{\n                            setUserArea(!userArea);\n                        },\n                        className: \"\".concat(alarm ? (_UserStatus_module_scss__WEBPACK_IMPORTED_MODULE_13___default().alarm) : \"\"),\n                        children: [\n                            session.nickname,\n                            \" 님\"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                        lineNumber: 43,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: ()=>{\n                            (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.signOut)({\n                                callbackUrl: \"\".concat(window.location.origin)\n                            });\n                        },\n                        children: \"로그아웃\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                        lineNumber: 47,\n                        columnNumber: 13\n                    }, this),\n                    userArea && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_auth_UserCard__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                        setAlarm: setAlarm,\n                        setUserArea: setUserArea,\n                        privateRoomList: privateRoomList,\n                        setPrivateRoomList: setPrivateRoomList,\n                        setAlertData: setAlertData\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                        lineNumber: 54,\n                        columnNumber: 26\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                lineNumber: 42,\n                columnNumber: 11\n            }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_UserStatus_module_scss__WEBPACK_IMPORTED_MODULE_13___default().user_status),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: ()=>setLoginArea(true),\n                        children: \"로그인\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                        lineNumber: 58,\n                        columnNumber: 11\n                    }, this),\n                    loginArea && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"aside\", {\n                        children: !signupArea ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_auth_Signin__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                            setLoginArea: setLoginArea,\n                            setSignupArea: setSignupArea\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                            lineNumber: 63,\n                            columnNumber: 17\n                        }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_auth_Signup__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                            setSignupArea: setSignupArea,\n                            setAlertData: setAlertData\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                            lineNumber: 65,\n                            columnNumber: 17\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                        lineNumber: 61,\n                        columnNumber: 13\n                    }, this),\n                    snsSignup && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_auth_SnsSignup__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                        setAlertData: setAlertData,\n                        setSnsSignup: setSnsSignup\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                        lineNumber: 70,\n                        columnNumber: 25\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                lineNumber: 57,\n                columnNumber: 9\n            }, this),\n            alertData.isAlert && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_modal_Alert__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n                props: {\n                    message: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        children: alertData.message\n                    }, void 0, false, void 0, void 0),\n                    confirm: alertData.confirm,\n                    cancel: alertData.cancel\n                }\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                lineNumber: 75,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true);\n}\n_s(UserStatus, \"4scfj/zXMnzZfmg87eWQitKwZlY=\", false, function() {\n    return [\n        recoil__WEBPACK_IMPORTED_MODULE_3__.useSetRecoilState,\n        next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter\n    ];\n});\n_c = UserStatus;\nvar _c;\n$RefreshReg$(_c, \"UserStatus\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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IndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9hdXRoL1VzZXJTdGF0dXMuanM/MzExMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3NzIGZyb20gJy4vVXNlclN0YXR1cy5tb2R1bGUuc2Nzcyc7XHJcbmltcG9ydCB7IHNpZ25PdXQsIHVzZVNlc3Npb24sIGdldFNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoL3JlYWN0XCI7XHJcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZUNvbnRleHQsIFN1c3BlbnNlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHVzZVJlY29pbFN0YXRlLCB1c2VSZWNvaWxWYWx1ZSwgdXNlU2V0UmVjb2lsU3RhdGUgfSBmcm9tICdyZWNvaWwnO1xyXG5pbXBvcnQgeyB1c2VyU2VsZWN0b3IgfSBmcm9tIFwiI3JlY29pbFN0b3JlL3VzZXJTdG9yZVwiXHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcclxuaW1wb3J0IFNpZ25pbiBmcm9tICcjY29tcG9uZW50cy9hdXRoL1NpZ25pbic7XHJcbmltcG9ydCBTaWdudXAgZnJvbSAnI2NvbXBvbmVudHMvYXV0aC9TaWdudXAnO1xyXG5pbXBvcnQgU25zU2lnbnVwIGZyb20gXCIjY29tcG9uZW50cy9hdXRoL1Nuc1NpZ251cFwiO1xyXG5pbXBvcnQgVXNlckNhcmQgZnJvbSAnI2NvbXBvbmVudHMvYXV0aC9Vc2VyQ2FyZCc7XHJcbmltcG9ydCBBbGVydCBmcm9tICcjY29tcG9uZW50cy9tb2RhbC9BbGVydCc7XHJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIjY29tcG9uZW50cy9Mb2FkaW5nXCJcclxuaW1wb3J0IHsgZ2V0VGltZSB9IGZyb20gJyN1dGlscy9nZXRUaW1lJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVzZXJTdGF0dXMoKSB7XHJcbiAgLy8gY29uc3Qge2RhdGE6IHNlc3Npb259ID0gdXNlU2Vzc2lvbigpO1xyXG4gIGNvbnN0IHNlc3Npb24gPSBbXVxyXG4gIC8vIGNvbnNvbGUubG9nKHNlc3Npb24pXHJcbiAgY29uc3Qgc2V0VXNlciA9IHVzZVNldFJlY29pbFN0YXRlKHVzZXJTZWxlY3RvcilcclxuIFxyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xyXG4gIGNvbnN0IFthbGVydERhdGEsIHNldEFsZXJ0RGF0YV0gPSB1c2VTdGF0ZSh7XHJcbiAgICBpc0FsZXJ0OmZhbHNlLFxyXG4gICAgbWVzc2FnZTpcIlwiLFxyXG4gICAgY29uZmlybTo8YnV0dG9uPjwvYnV0dG9uPixcclxuICAgIGNhbmNlbDo8YnV0dG9uPjwvYnV0dG9uPlxyXG4gIH0pO1xyXG4gIGNvbnN0IFtzbnNTaWdudXAsIHNldFNuc1NpZ251cF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2xvZ2luQXJlYSwgc2V0TG9naW5BcmVhXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2lnbnVwQXJlYSwgc2V0U2lnbnVwQXJlYV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3VzZXJBcmVhLCBzZXRVc2VyQXJlYV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2FsYXJtLCBzZXRBbGFybV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3ByaXZhdGVSb29tTGlzdCwgc2V0UHJpdmF0ZVJvb21MaXN0XSA9IHVzZVN0YXRlKFtdKVxyXG5cclxuICB1c2VFZmZlY3QoKCk9PntcclxuICAgIHNldFVzZXIoKVxyXG4gIH0sIFtdKVxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG5cclxuICAgICAge3Nlc3Npb24/LnVzZXJfa2V5ID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzcy51c2VyX3N0YXR1c30+XHJcbiAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9eygpPT57IHNldFVzZXJBcmVhKCF1c2VyQXJlYSl9fSBjbGFzc05hbWU9e2AkeyBhbGFybSA/IGNzcy5hbGFybSA6IFwiXCJ9YH0+XHJcbiAgICAgICAgICAgICAge3Nlc3Npb24ubmlja25hbWV9IOuLmFxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgIHNpZ25PdXQoe1xyXG4gICAgICAgICAgICAgICAgICBjYWxsYmFja1VybDogYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn1gLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH19PuuhnOq3uOyVhOybg1xyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgICAgIHt1c2VyQXJlYSAmJiA8VXNlckNhcmQgc2V0QWxhcm09e3NldEFsYXJtfSBzZXRVc2VyQXJlYT17c2V0VXNlckFyZWF9IHByaXZhdGVSb29tTGlzdD17cHJpdmF0ZVJvb21MaXN0fSBzZXRQcml2YXRlUm9vbUxpc3Q9e3NldFByaXZhdGVSb29tTGlzdH0gc2V0QWxlcnREYXRhPXtzZXRBbGVydERhdGF9Lz59XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzLnVzZXJfc3RhdHVzfT5cclxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0TG9naW5BcmVhKHRydWUpfT7roZzqt7jsnbg8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgICB7bG9naW5BcmVhICYmIChcclxuICAgICAgICAgICAgPGFzaWRlPlxyXG4gICAgICAgICAgICAgIHshc2lnbnVwQXJlYSA/IChcclxuICAgICAgICAgICAgICAgIDxTaWduaW4gc2V0TG9naW5BcmVhPXtzZXRMb2dpbkFyZWF9IHNldFNpZ251cEFyZWE9e3NldFNpZ251cEFyZWF9IC8+XHJcbiAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgIDxTaWdudXAgc2V0U2lnbnVwQXJlYT17c2V0U2lnbnVwQXJlYX0gc2V0QWxlcnREYXRhPXtzZXRBbGVydERhdGF9IC8+XHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9hc2lkZT5cclxuICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAge3Nuc1NpZ251cCAmJiA8U25zU2lnbnVwIHNldEFsZXJ0RGF0YT17c2V0QWxlcnREYXRhfSBzZXRTbnNTaWdudXA9e3NldFNuc1NpZ251cH0vPiB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICB7YWxlcnREYXRhLmlzQWxlcnQgJiYgKFxyXG4gICAgICAgIDxBbGVydFxyXG4gICAgICAgICAgcHJvcHM9e3tcclxuICAgICAgICAgICAgbWVzc2FnZTogPHNwYW4+e2FsZXJ0RGF0YS5tZXNzYWdlfTwvc3Bhbj4sXHJcbiAgICAgICAgICAgIGNvbmZpcm06IGFsZXJ0RGF0YS5jb25maXJtLFxyXG4gICAgICAgICAgICBjYW5jZWw6IGFsZXJ0RGF0YS5jYW5jZWwsXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcbiAgICA8Lz5cclxuICApXHJcbn1cclxuIl0sIm5hbWVzIjpbImNzcyIsInNpZ25PdXQiLCJ1c2VTZXNzaW9uIiwiZ2V0U2Vzc2lvbiIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlQ29udGV4dCIsIlN1c3BlbnNlIiwidXNlUmVjb2lsU3RhdGUiLCJ1c2VSZWNvaWxWYWx1ZSIsInVzZVNldFJlY29pbFN0YXRlIiwidXNlclNlbGVjdG9yIiwidXNlUm91dGVyIiwiU2lnbmluIiwiU2lnbnVwIiwiU25zU2lnbnVwIiwiVXNlckNhcmQiLCJBbGVydCIsIkxvYWRpbmciLCJnZXRUaW1lIiwiVXNlclN0YXR1cyIsInNlc3Npb24iLCJzZXRVc2VyIiwicm91dGVyIiwiYWxlcnREYXRhIiwic2V0QWxlcnREYXRhIiwiaXNBbGVydCIsIm1lc3NhZ2UiLCJjb25maXJtIiwiYnV0dG9uIiwiY2FuY2VsIiwic25zU2lnbnVwIiwic2V0U25zU2lnbnVwIiwibG9naW5BcmVhIiwic2V0TG9naW5BcmVhIiwic2lnbnVwQXJlYSIsInNldFNpZ251cEFyZWEiLCJ1c2VyQXJlYSIsInNldFVzZXJBcmVhIiwiYWxhcm0iLCJzZXRBbGFybSIsInByaXZhdGVSb29tTGlzdCIsInNldFByaXZhdGVSb29tTGlzdCIsInVzZXJfa2V5IiwiZGl2IiwiY2xhc3NOYW1lIiwidXNlcl9zdGF0dXMiLCJzcGFuIiwib25DbGljayIsIm5pY2tuYW1lIiwiY2FsbGJhY2tVcmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsIm9yaWdpbiIsImFzaWRlIiwicHJvcHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/auth/UserStatus.js\n"));

/***/ })

});