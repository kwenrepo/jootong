exports.id = 641;
exports.ids = [641];
exports.modules = {

/***/ 289:
/***/ ((module) => {

// Exports
module.exports = {
	"wrap": "SnsSignup_wrap__Cmy53",
	"inner": "SnsSignup_inner__n_DVJ",
	"greeting": "SnsSignup_greeting__wsgso",
	"credential": "SnsSignup_credential__b8tVe",
	"email": "SnsSignup_email__MmKIE",
	"error_message": "SnsSignup_error_message__4KVFW",
	"agree_label": "SnsSignup_agree_label__x1ZmA",
	"button_group": "SnsSignup_button_group__zx9Z0",
	"signup": "SnsSignup_signup__V5zhY",
	"loading": "SnsSignup_loading__0ttm2"
};


/***/ }),

/***/ 7641:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ SnsSignup)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SnsSignup_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(289);
/* harmony import */ var _SnsSignup_module_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_SnsSignup_module_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_Loading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3033);







function SnsSignup({ setAlertData , setSnsSignup , callbackURL  }) {
    const { data: session , update  } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.useSession)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const agree = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(false);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [errorMessage, setErrorMessage] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const startSignUp = function() {
        if (agree.current.checked && session) {
            setLoading(true);
            setErrorMessage("");
            fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(session.user)
            }).then((response)=>response.json()).then(async (data)=>{
                if (data.status) {
                    session.user = data.data;
                    await update({
                        ...session,
                        user: {
                            ...session?.user
                        }
                    });
                    setUserKey(session.user.user_key);
                    setLoading(false);
                    setAlertData({
                        isAlert: true,
                        message: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            children: [
                                "\uD83C\uDF89회원가입을 축하합니다!\uD83D\uDD25\uD83D\uDD25 ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                " [기념선물지급 - 닉네임변경권] ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                " 마이페이지에서 사용 가능합니다"
                            ]
                        }),
                        confirm: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            onClick: ()=>{
                                if (callbackURL) {
                                    window.opener.parentCallback({
                                        method: "mypage"
                                    });
                                } else {
                                    router.push("/mypage");
                                }
                            },
                            children: "마이페이지"
                        }),
                        cancel: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            onClick: ()=>{
                                if (callbackURL) {
                                    router.push(callbackURL);
                                } else {
                                    router.push("/");
                                    setSnsSignup(false);
                                    setAlertData({
                                        isAlert: false
                                    });
                                }
                            },
                            children: "확인"
                        })
                    });
                } else {
                    setErrorMessage(data.message);
                }
            });
        } else if (!agree.current.checked) {
            setErrorMessage("* 이용약관에 동의해주세요");
        }
    };
    function checkAgree() {
        agree.current.checked = true;
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_SnsSignup_module_scss__WEBPACK_IMPORTED_MODULE_6___default().wrap),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_SnsSignup_module_scss__WEBPACK_IMPORTED_MODULE_6___default().inner),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_SnsSignup_module_scss__WEBPACK_IMPORTED_MODULE_6___default().greeting),
                        children: [
                            "환영합니다, ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: "처음 오신 회원님!"
                            }),
                            " ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            "이용약관 동의 가 필요합니다!"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_SnsSignup_module_scss__WEBPACK_IMPORTED_MODULE_6___default().credential),
                        children: [
                            "로그인 하신 SNS 이메일",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_SnsSignup_module_scss__WEBPACK_IMPORTED_MODULE_6___default().email),
                                children: session?.user.email ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    type: "text",
                                    value: session?.user.email || "",
                                    readOnly: true
                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Loading__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {})
                            }),
                            errorMessage && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_SnsSignup_module_scss__WEBPACK_IMPORTED_MODULE_6___default().error_message),
                                children: errorMessage
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                        className: (_SnsSignup_module_scss__WEBPACK_IMPORTED_MODULE_6___default().agree_label),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                type: "checkbox",
                                ref: agree
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
                                onClick: ()=>{
                                    checkAgree();
                                },
                                href: "/policy/service",
                                target: "_blank",
                                children: "이용약관 동의하기"
                            })
                        ]
                    }),
                    session && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_SnsSignup_module_scss__WEBPACK_IMPORTED_MODULE_6___default().button_group),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: (_SnsSignup_module_scss__WEBPACK_IMPORTED_MODULE_6___default().signup),
                                onClick: ()=>{
                                    startSignUp();
                                },
                                children: "동의 후 계속 이용하기"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: (_SnsSignup_module_scss__WEBPACK_IMPORTED_MODULE_6___default().signout),
                                onClick: ()=>{
                                    (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.signOut)();
                                },
                                children: "취소"
                            })
                        ]
                    })
                ]
            }),
            loading && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_SnsSignup_module_scss__WEBPACK_IMPORTED_MODULE_6___default().loading),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Loading__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {})
            })
        ]
    });
}


/***/ })

};
;