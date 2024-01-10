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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ UserStatus; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _UserStatus_module_scss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./UserStatus.module.scss */ \"./components/auth/UserStatus.module.scss\");\n/* harmony import */ var _UserStatus_module_scss__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_UserStatus_module_scss__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/react */ \"./node_modules/next-auth/react/index.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! recoil */ \"./node_modules/recoil/es/index.js\");\n/* harmony import */ var _recoilStore_atoms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! #recoilStore/atoms */ \"./recoilStore/atoms.js\");\n/* harmony import */ var _recoilStore_userStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! #recoilStore/userStore */ \"./recoilStore/userStore.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _components_auth_Signin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! #components/auth/Signin */ \"./components/auth/Signin.js\");\n/* harmony import */ var _components_auth_Signup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! #components/auth/Signup */ \"./components/auth/Signup.js\");\n/* harmony import */ var _components_auth_SnsSignup__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! #components/auth/SnsSignup */ \"./components/auth/SnsSignup.js\");\n/* harmony import */ var _components_auth_UserCard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! #components/auth/UserCard */ \"./components/auth/UserCard.js\");\n/* harmony import */ var _components_modal_Alert__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! #components/modal/Alert */ \"./components/modal/Alert.js\");\n/* harmony import */ var _components_Loading__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! #components/Loading */ \"./components/Loading.js\");\n/* harmony import */ var _utils_getTime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! #utils/getTime */ \"./utils/getTime.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction UserStatus() {\n    _s();\n    // const {data: session} = useSession();\n    const session = [];\n    // console.log(session)\n    const getUser = (0,recoil__WEBPACK_IMPORTED_MODULE_3__.useRecoilValue)(_recoilStore_atoms__WEBPACK_IMPORTED_MODULE_4__.user);\n    const setUser = (0,recoil__WEBPACK_IMPORTED_MODULE_3__.useSetRecoilState)(_recoilStore_userStore__WEBPACK_IMPORTED_MODULE_5__.userSelector);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();\n    const [alertData, setAlertData] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({\n        isAlert: false,\n        message: \"\",\n        confirm: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {}, void 0, false, {\n            fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n            lineNumber: 27,\n            columnNumber: 13\n        }, this),\n        cancel: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {}, void 0, false, {\n            fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n            lineNumber: 28,\n            columnNumber: 12\n        }, this)\n    });\n    const [snsSignup, setSnsSignup] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    const [loginArea, setLoginArea] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    const [signupArea, setSignupArea] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    const [userArea, setUserArea] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    const [alarm, setAlarm] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    const [privateRoomList, setPrivateRoomList] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(async ()=>{\n        async function session() {\n            return await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.getSession)();\n        }\n        session().then((res)=>{\n            setUser(res.user);\n        });\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        console.log(getUser);\n    }, [\n        getUser\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            (session === null || session === void 0 ? void 0 : session.user_key) ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_UserStatus_module_scss__WEBPACK_IMPORTED_MODULE_14___default().user_status),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        onClick: ()=>{\n                            setUserArea(!userArea);\n                        },\n                        className: \"\".concat(alarm ? (_UserStatus_module_scss__WEBPACK_IMPORTED_MODULE_14___default().alarm) : \"\"),\n                        children: [\n                            session.nickname,\n                            \" 님\"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                        lineNumber: 54,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: ()=>{\n                            (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.signOut)({\n                                callbackUrl: \"\".concat(window.location.origin)\n                            });\n                        },\n                        children: \"로그아웃\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                        lineNumber: 58,\n                        columnNumber: 13\n                    }, this),\n                    userArea && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_auth_UserCard__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n                        setAlarm: setAlarm,\n                        setUserArea: setUserArea,\n                        privateRoomList: privateRoomList,\n                        setPrivateRoomList: setPrivateRoomList,\n                        setAlertData: setAlertData\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                        lineNumber: 65,\n                        columnNumber: 26\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                lineNumber: 53,\n                columnNumber: 11\n            }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_UserStatus_module_scss__WEBPACK_IMPORTED_MODULE_14___default().user_status),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: ()=>setLoginArea(true),\n                        children: \"로그인\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                        lineNumber: 69,\n                        columnNumber: 11\n                    }, this),\n                    loginArea && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"aside\", {\n                        children: !signupArea ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_auth_Signin__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                            setLoginArea: setLoginArea,\n                            setSignupArea: setSignupArea\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                            lineNumber: 74,\n                            columnNumber: 17\n                        }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_auth_Signup__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                            setSignupArea: setSignupArea,\n                            setAlertData: setAlertData\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                            lineNumber: 76,\n                            columnNumber: 17\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                        lineNumber: 72,\n                        columnNumber: 13\n                    }, this),\n                    snsSignup && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_auth_SnsSignup__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                        setAlertData: setAlertData,\n                        setSnsSignup: setSnsSignup\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                        lineNumber: 81,\n                        columnNumber: 25\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                lineNumber: 68,\n                columnNumber: 9\n            }, this),\n            alertData.isAlert && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_modal_Alert__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n                props: {\n                    message: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        children: alertData.message\n                    }, void 0, false, void 0, void 0),\n                    confirm: alertData.confirm,\n                    cancel: alertData.cancel\n                }\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\teamguug\\\\Desktop\\\\jootong3\\\\components\\\\auth\\\\UserStatus.js\",\n                lineNumber: 86,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true);\n}\n_s(UserStatus, \"aMzwAObIs7Menh1kwgSI4SUUqXw=\", false, function() {\n    return [\n        recoil__WEBPACK_IMPORTED_MODULE_3__.useRecoilValue,\n        recoil__WEBPACK_IMPORTED_MODULE_3__.useSetRecoilState,\n        next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter\n    ];\n});\n_c = UserStatus;\nvar _c;\n$RefreshReg$(_c, \"UserStatus\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WUFFQVIsVUFBVUUsT0FBTyxrQkFDaEIsOERBQUNWLGdFQUFLQTtnQkFDSjJDLE9BQU87b0JBQ0xoQyx1QkFBUyw4REFBQ3dCO2tDQUFNM0IsVUFBVUcsT0FBTzs7b0JBQ2pDQyxTQUFTSixVQUFVSSxPQUFPO29CQUMxQkUsUUFBUU4sVUFBVU0sTUFBTTtnQkFDMUI7Ozs7Ozs7O0FBS1YsQ0FBQztHQWhGdUJYOztRQUlOWixrREFBY0E7UUFDZEMscURBQWlCQTtRQUVsQkcsa0RBQVNBOzs7S0FQRlEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9hdXRoL1VzZXJTdGF0dXMuanM/MzExMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3NzIGZyb20gJy4vVXNlclN0YXR1cy5tb2R1bGUuc2Nzcyc7XHJcbmltcG9ydCB7IHNpZ25PdXQsIHVzZVNlc3Npb24sIGdldFNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoL3JlYWN0XCI7XHJcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZUNvbnRleHQsIFN1c3BlbnNlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHVzZVJlY29pbFN0YXRlLCB1c2VSZWNvaWxWYWx1ZSwgdXNlU2V0UmVjb2lsU3RhdGUgfSBmcm9tICdyZWNvaWwnO1xyXG5pbXBvcnQgeyB1c2VyIH0gZnJvbSBcIiNyZWNvaWxTdG9yZS9hdG9tc1wiXHJcbmltcG9ydCB7IHVzZXJTZWxlY3RvciB9IGZyb20gXCIjcmVjb2lsU3RvcmUvdXNlclN0b3JlXCJcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5pbXBvcnQgU2lnbmluIGZyb20gJyNjb21wb25lbnRzL2F1dGgvU2lnbmluJztcclxuaW1wb3J0IFNpZ251cCBmcm9tICcjY29tcG9uZW50cy9hdXRoL1NpZ251cCc7XHJcbmltcG9ydCBTbnNTaWdudXAgZnJvbSBcIiNjb21wb25lbnRzL2F1dGgvU25zU2lnbnVwXCI7XHJcbmltcG9ydCBVc2VyQ2FyZCBmcm9tICcjY29tcG9uZW50cy9hdXRoL1VzZXJDYXJkJztcclxuaW1wb3J0IEFsZXJ0IGZyb20gJyNjb21wb25lbnRzL21vZGFsL0FsZXJ0JztcclxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIiNjb21wb25lbnRzL0xvYWRpbmdcIlxyXG5pbXBvcnQgeyBnZXRUaW1lIH0gZnJvbSAnI3V0aWxzL2dldFRpbWUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVXNlclN0YXR1cygpIHtcclxuICAvLyBjb25zdCB7ZGF0YTogc2Vzc2lvbn0gPSB1c2VTZXNzaW9uKCk7XHJcbiAgY29uc3Qgc2Vzc2lvbiA9IFtdXHJcbiAgLy8gY29uc29sZS5sb2coc2Vzc2lvbilcclxuICBjb25zdCBnZXRVc2VyID0gdXNlUmVjb2lsVmFsdWUodXNlcik7XHJcbiAgY29uc3Qgc2V0VXNlciA9IHVzZVNldFJlY29pbFN0YXRlKHVzZXJTZWxlY3Rvcik7XHJcbiBcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuICBjb25zdCBbYWxlcnREYXRhLCBzZXRBbGVydERhdGFdID0gdXNlU3RhdGUoe1xyXG4gICAgaXNBbGVydDpmYWxzZSxcclxuICAgIG1lc3NhZ2U6XCJcIixcclxuICAgIGNvbmZpcm06PGJ1dHRvbj48L2J1dHRvbj4sXHJcbiAgICBjYW5jZWw6PGJ1dHRvbj48L2J1dHRvbj5cclxuICB9KTtcclxuICBjb25zdCBbc25zU2lnbnVwLCBzZXRTbnNTaWdudXBdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtsb2dpbkFyZWEsIHNldExvZ2luQXJlYV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3NpZ251cEFyZWEsIHNldFNpZ251cEFyZWFdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFt1c2VyQXJlYSwgc2V0VXNlckFyZWFdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFthbGFybSwgc2V0QWxhcm1dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtwcml2YXRlUm9vbUxpc3QsIHNldFByaXZhdGVSb29tTGlzdF0gPSB1c2VTdGF0ZShbXSlcclxuXHJcbiAgdXNlRWZmZWN0KGFzeW5jICgpPT57XHJcbiAgICBhc3luYyBmdW5jdGlvbiBzZXNzaW9uKCl7XHJcbiAgICAgIHJldHVybiBhd2FpdCBnZXRTZXNzaW9uKCk7XHJcbiAgICB9XHJcbiAgICBzZXNzaW9uKCkudGhlbigocmVzKT0+e1xyXG4gICAgICBzZXRVc2VyKHJlcy51c2VyKVxyXG4gICAgfSlcclxuICB9LCBbXSlcclxuXHJcbiAgdXNlRWZmZWN0KCgpPT57XHJcbiAgICBjb25zb2xlLmxvZyhnZXRVc2VyKVxyXG4gIH0sIFtnZXRVc2VyXSlcclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuXHJcbiAgICAgIHtzZXNzaW9uPy51c2VyX2tleSA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjc3MudXNlcl9zdGF0dXN9PlxyXG4gICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXsoKT0+eyBzZXRVc2VyQXJlYSghdXNlckFyZWEpfX0gY2xhc3NOYW1lPXtgJHsgYWxhcm0gPyBjc3MuYWxhcm0gOiBcIlwifWB9PlxyXG4gICAgICAgICAgICAgIHtzZXNzaW9uLm5pY2tuYW1lfSDri5hcclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzaWduT3V0KHtcclxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2tVcmw6IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59YCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9fT7roZzqt7jslYTsm4NcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICAgICAgICB7dXNlckFyZWEgJiYgPFVzZXJDYXJkIHNldEFsYXJtPXtzZXRBbGFybX0gc2V0VXNlckFyZWE9e3NldFVzZXJBcmVhfSBwcml2YXRlUm9vbUxpc3Q9e3ByaXZhdGVSb29tTGlzdH0gc2V0UHJpdmF0ZVJvb21MaXN0PXtzZXRQcml2YXRlUm9vbUxpc3R9IHNldEFsZXJ0RGF0YT17c2V0QWxlcnREYXRhfS8+fVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzcy51c2VyX3N0YXR1c30+XHJcbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldExvZ2luQXJlYSh0cnVlKX0+66Gc6re47J24PC9idXR0b24+XHJcblxyXG4gICAgICAgICAge2xvZ2luQXJlYSAmJiAoXHJcbiAgICAgICAgICAgIDxhc2lkZT5cclxuICAgICAgICAgICAgICB7IXNpZ251cEFyZWEgPyAoXHJcbiAgICAgICAgICAgICAgICA8U2lnbmluIHNldExvZ2luQXJlYT17c2V0TG9naW5BcmVhfSBzZXRTaWdudXBBcmVhPXtzZXRTaWdudXBBcmVhfSAvPlxyXG4gICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICA8U2lnbnVwIHNldFNpZ251cEFyZWE9e3NldFNpZ251cEFyZWF9IHNldEFsZXJ0RGF0YT17c2V0QWxlcnREYXRhfSAvPlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvYXNpZGU+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIHtzbnNTaWdudXAgJiYgPFNuc1NpZ251cCBzZXRBbGVydERhdGE9e3NldEFsZXJ0RGF0YX0gc2V0U25zU2lnbnVwPXtzZXRTbnNTaWdudXB9Lz4gfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG5cclxuICAgICAge2FsZXJ0RGF0YS5pc0FsZXJ0ICYmIChcclxuICAgICAgICA8QWxlcnRcclxuICAgICAgICAgIHByb3BzPXt7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IDxzcGFuPnthbGVydERhdGEubWVzc2FnZX08L3NwYW4+LFxyXG4gICAgICAgICAgICBjb25maXJtOiBhbGVydERhdGEuY29uZmlybSxcclxuICAgICAgICAgICAgY2FuY2VsOiBhbGVydERhdGEuY2FuY2VsLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG4gICAgPC8+XHJcbiAgKVxyXG59XHJcbiJdLCJuYW1lcyI6WyJjc3MiLCJzaWduT3V0IiwidXNlU2Vzc2lvbiIsImdldFNlc3Npb24iLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZUNvbnRleHQiLCJTdXNwZW5zZSIsInVzZVJlY29pbFN0YXRlIiwidXNlUmVjb2lsVmFsdWUiLCJ1c2VTZXRSZWNvaWxTdGF0ZSIsInVzZXIiLCJ1c2VyU2VsZWN0b3IiLCJ1c2VSb3V0ZXIiLCJTaWduaW4iLCJTaWdudXAiLCJTbnNTaWdudXAiLCJVc2VyQ2FyZCIsIkFsZXJ0IiwiTG9hZGluZyIsImdldFRpbWUiLCJVc2VyU3RhdHVzIiwic2Vzc2lvbiIsImdldFVzZXIiLCJzZXRVc2VyIiwicm91dGVyIiwiYWxlcnREYXRhIiwic2V0QWxlcnREYXRhIiwiaXNBbGVydCIsIm1lc3NhZ2UiLCJjb25maXJtIiwiYnV0dG9uIiwiY2FuY2VsIiwic25zU2lnbnVwIiwic2V0U25zU2lnbnVwIiwibG9naW5BcmVhIiwic2V0TG9naW5BcmVhIiwic2lnbnVwQXJlYSIsInNldFNpZ251cEFyZWEiLCJ1c2VyQXJlYSIsInNldFVzZXJBcmVhIiwiYWxhcm0iLCJzZXRBbGFybSIsInByaXZhdGVSb29tTGlzdCIsInNldFByaXZhdGVSb29tTGlzdCIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwidXNlcl9rZXkiLCJkaXYiLCJjbGFzc05hbWUiLCJ1c2VyX3N0YXR1cyIsInNwYW4iLCJvbkNsaWNrIiwibmlja25hbWUiLCJjYWxsYmFja1VybCIsIndpbmRvdyIsImxvY2F0aW9uIiwib3JpZ2luIiwiYXNpZGUiLCJwcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/auth/UserStatus.js\n"));

/***/ })

});