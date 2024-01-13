exports.id = 598;
exports.ids = [598];
exports.modules = {

/***/ 2646:
/***/ ((module) => {

// Exports
module.exports = {
	"wrap": "Header_wrap__kcyi3",
	"inner": "Header_inner__JQGFI",
	"left_area": "Header_left_area__TPwow",
	"logo": "Header_logo__tL_od",
	"right_area": "Header_right_area___vjGx",
	"create_room": "Header_create_room__gzEkv",
	"search": "Header_search__y8rvy"
};


/***/ }),

/***/ 5168:
/***/ ((module) => {

// Exports
module.exports = {
	"wrap": "Signin_wrap__vQbEq",
	"inner": "Signin_inner__9LdS5",
	"title": "Signin_title__vGdV4",
	"credential": "Signin_credential__GImb_",
	"email": "Signin_email__SlYWA",
	"login": "Signin_login__LBElf",
	"error_message": "Signin_error_message__u_BWj",
	"util_box": "Signin_util_box__jqarS",
	"agree_label": "Signin_agree_label__CrOMC",
	"signup": "Signin_signup__BsVBX",
	"forgot_password": "Signin_forgot_password__obQ_F",
	"sns_login": "Signin_sns_login__NY9nD",
	"sns_list": "Signin_sns_list__PlRQ4",
	"google_login": "Signin_google_login__fXmmQ",
	"naver_login": "Signin_naver_login__ENrum",
	"kakao_login": "Signin_kakao_login__UPYXW",
	"loading": "Signin_loading__wGoCH"
};


/***/ }),

/***/ 8204:
/***/ ((module) => {

// Exports
module.exports = {
	"wrap": "Signup_wrap__IP__H",
	"inner": "Signup_inner__bBLc0",
	"credential": "Signup_credential__jjaKf",
	"box": "Signup_box__oJEfa",
	"password_hidden": "Signup_password_hidden__tlvOm",
	"password_on": "Signup_password_on__7zOkr",
	"error_message": "Signup_error_message__xMy_o",
	"agree_label": "Signup_agree_label__35npv",
	"signup": "Signup_signup__S589I",
	"greeting": "Signup_greeting__4Rq4q",
	"button_wrap": "Signup_button_wrap__Gn6IJ",
	"loading": "Signup_loading___h5fs"
};


/***/ }),

/***/ 6862:
/***/ ((module) => {

// Exports
module.exports = {
	"wrap": "UserCard_wrap__zqSK_",
	"title": "UserCard_title__01pn8",
	"nickname": "UserCard_nickname__v5x8I",
	"bridge": "UserCard_bridge__modwg",
	"mypage": "UserCard_mypage__VM155",
	"message_list": "UserCard_message_list__AtzP9",
	"room_title": "UserCard_room_title__HoOyn",
	"delete": "UserCard_delete__It50s",
	"message": "UserCard_message__VJWBF",
	"text": "UserCard_text__yKMNV",
	"date": "UserCard_date__DVy0d",
	"red_dot": "UserCard_red_dot__bdnz1",
	"loading": "UserCard_loading__sGiQS"
};


/***/ }),

/***/ 9980:
/***/ ((module) => {

// Exports
module.exports = {
	"user_status": "UserStatus_user_status__01gA4",
	"alarm": "UserStatus_alarm__niXJL",
	"my_point": "UserStatus_my_point__RRJtQ"
};


/***/ }),

/***/ 9598:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Header)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./components/Header.module.scss
var Header_module = __webpack_require__(2646);
var Header_module_default = /*#__PURE__*/__webpack_require__.n(Header_module);
// EXTERNAL MODULE: ./components/auth/UserStatus.module.scss
var UserStatus_module = __webpack_require__(9980);
var UserStatus_module_default = /*#__PURE__*/__webpack_require__.n(UserStatus_module);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "recoil"
var external_recoil_ = __webpack_require__(9755);
// EXTERNAL MODULE: ./recoilStore/index.js + 2 modules
var recoilStore = __webpack_require__(338);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./components/auth/Signin.module.scss
var Signin_module = __webpack_require__(5168);
var Signin_module_default = /*#__PURE__*/__webpack_require__.n(Signin_module);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./components/Loading.js
var Loading = __webpack_require__(3033);
;// CONCATENATED MODULE: ./components/auth/Signin.js








function Signin({ setLoginArea , setSignupArea  }) {
    const getUser = (0,external_recoil_.useRecoilValue)(recoilStore/* user */.EA);
    const setUser = (0,external_recoil_.useSetRecoilState)(recoilStore/* userSelector */.np);
    const [errorMessage, setErrorMessage] = (0,external_react_.useState)("");
    const [loading, setLoading] = (0,external_react_.useState)(false);
    const [email, setEmail] = (0,external_react_.useState)("");
    const [agree, setAgree] = (0,external_react_.useState)(false);
    const [password, setPassword] = (0,external_react_.useState)("");
    const login = function(e) {
        e.preventDefault();
        setLoading(true);
        (0,react_.signIn)("credentials", {
            email,
            password,
            callbackUrl: window.location.href,
            redirect: false
        }).then(async ({ ok , error  })=>{
            const session = await (0,react_.getSession)();
            console.log(session);
            if (ok && session) {
                if (agree) localStorage.setItem("login", email);
                setUser(session.user);
            } else {
                setErrorMessage(error);
            }
            setLoading(false);
        });
    };
    (0,external_react_.useEffect)(()=>{
        if (getUser.user_key) {
            setLoginArea(false);
            return false;
        }
        if (localStorage.getItem("login")) setEmail(localStorage.getItem("login"));
    }, [
        getUser
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (Signin_module_default()).wrap,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (Signin_module_default()).inner,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h1", {
                        className: (Signin_module_default()).title,
                        children: [
                            "JOOTONG 로그인",
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                className: (Signin_module_default()).cancel,
                                onClick: ()=>{
                                    setLoginArea(false);
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (Signin_module_default()).credential,
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (Signin_module_default()).email,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            type: "text",
                                            value: email,
                                            maxLength: 50,
                                            onChange: (e)=>{
                                                setEmail(e.target.value);
                                            },
                                            placeholder: "이메일을 입력해주세요"
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (Signin_module_default()).password,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            type: "password",
                                            value: password,
                                            maxLength: 20,
                                            onChange: (e)=>{
                                                setPassword(e.target.value);
                                            },
                                            required: true,
                                            placeholder: "비밀번호"
                                        })
                                    }),
                                    errorMessage && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (Signin_module_default()).error_message,
                                        children: errorMessage
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        className: (Signin_module_default()).login,
                                        onClick: (e)=>{
                                            login(e);
                                        },
                                        children: "로그인"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: (Signin_module_default()).util_box,
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                        className: (Signin_module_default()).agree_label,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "checkbox",
                                                checked: agree,
                                                onChange: ()=>{
                                                    setAgree(!agree);
                                                }
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: "아이디 기억"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        className: (Signin_module_default()).signup,
                                        onClick: (e)=>setSignupArea(true),
                                        children: "간편 회원가입"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        href: "/auth/forgotpassword",
                                        className: (Signin_module_default()).forgot_password,
                                        children: "비밀번호 찾기"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (Signin_module_default()).sns_login,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                                children: "SNS 계정 으로 로그인"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: (Signin_module_default()).sns_list,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (Signin_module_default()).google_login,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            className: (Signin_module_default()).google,
                                            onClick: ()=>(0,react_.signIn)("google", {
                                                    callbackUrl: window.location.href + "?fromSNS"
                                                })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (Signin_module_default()).naver_login,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            className: (Signin_module_default()).naver,
                                            onClick: ()=>(0,react_.signIn)("naver", {
                                                    callbackUrl: window.location.href + "?fromSNS"
                                                })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (Signin_module_default()).kakao_login,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            className: (Signin_module_default()).kakao,
                                            onClick: ()=>(0,react_.signIn)("kakao", {
                                                    callbackUrl: window.location.href + "?fromSNS"
                                                })
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            loading && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (Signin_module_default()).loading,
                children: /*#__PURE__*/ jsx_runtime_.jsx(Loading/* default */.Z, {})
            })
        ]
    });
}

// EXTERNAL MODULE: ./components/auth/Signup.module.scss
var Signup_module = __webpack_require__(8204);
var Signup_module_default = /*#__PURE__*/__webpack_require__.n(Signup_module);
// EXTERNAL MODULE: ./utils/regexp/isEmail.js
var isEmail = __webpack_require__(5137);
// EXTERNAL MODULE: ./utils/regexp/isPassword.js
var isPassword = __webpack_require__(1967);
;// CONCATENATED MODULE: ./components/auth/Signup.js











function Signup({ setSignupArea , setAlertData  }) {
    const setUser = (0,external_recoil_.useSetRecoilState)(recoilStore/* userSelector */.np);
    const router = (0,router_.useRouter)();
    const email = (0,external_react_.useRef)();
    const password = (0,external_react_.useRef)();
    const checkedPassword = (0,external_react_.useRef)();
    const agree = (0,external_react_.useRef)();
    const [passwordHidden, setPasswordHidden] = (0,external_react_.useState)(true);
    const [errorMessage, setErrorMessage] = (0,external_react_.useState)("");
    const [loading, setLoading] = (0,external_react_.useState)(false);
    const changeEmail = function(e) {
        if (!isEmail/* isEmail.test */.J.test(e.target.value)) {
            setErrorMessage("* 올바른 이메일 형식이 아닙니다");
        } else {
            setErrorMessage("");
            email.current.value = e.target.value;
        }
    };
    const changePassword = function(e) {
        password.current = e.target.value;
        if (password.current || checkedPassword.current) {
            if (password.current.length < 8) {
                setErrorMessage("* 비밀번호는 8글자 이상 입니다.");
            } else if (!isPassword/* isPassword.test */.L.test(password.current)) {
                setErrorMessage("* 비밀번호는 (필수)문자+숫자 조합입니다.");
            } else if (checkedPassword.current && password.current !== checkedPassword.current) {
                setErrorMessage("* 비밀번호를 확인해주세요");
            } else {
                setErrorMessage("");
            }
        } else {
            setErrorMessage("");
        }
    };
    const passwordCheck = function(e) {
        checkedPassword.current = e.target.value;
        if (password.current.length < 8) {
            setErrorMessage("* 비밀번호는 8글자 이상 입니다.");
        } else if (!isPassword/* isPassword.test */.L.test(password.current)) {
            setErrorMessage("* 비밀번호는 문자+숫자 조합입니다.");
        } else if (password.current !== checkedPassword.current) {
            setErrorMessage("* 비밀번호를 확인해주세요");
        } else {
            setErrorMessage("");
        }
    };
    function checkAgree() {
        agree.current.checked = true;
    }
    const startSignUp = function() {
        if (email.current.value && checkedPassword.current && agree.current.checked && checkedPassword.current === password.current) {
            setLoading(true);
            setErrorMessage("");
            let user = {
                email: email.current.value,
                password: password.current,
                provider: "credential"
            };
            fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }).then((response)=>response.json()).then((data)=>{
                if (data.status) {
                    (0,react_.signIn)("credentials", {
                        email: data.email,
                        password: password.current,
                        callbackUrl: window.location.href,
                        redirect: false
                    }).then(async ({ ok , error  })=>{
                        const session = await (0,react_.getSession)();
                        if (ok && session) {
                            setUser(session.user);
                            setAlertData({
                                isAlert: true,
                                message: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                    children: [
                                        "\uD83C\uDF89회원가입을 축하합니다!\uD83D\uDD25\uD83D\uDD25 ",
                                        /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                        " [기념선물지급 - 닉네임변경권] ",
                                        /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                        " 마이페이지에서 사용 가능합니다"
                                    ]
                                }),
                                confirm: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                    href: "/mypage",
                                    children: "마이페이지"
                                }),
                                cancel: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                    onClick: ()=>{
                                        setAlertData({
                                            isAlert: false
                                        });
                                    },
                                    children: "확인"
                                })
                            });
                        } else {
                            setErrorMessage(error);
                        }
                    });
                } else {
                    setErrorMessage(data.code || data.message || "일시적인 에러, 다시 시도해 주세요.");
                }
                setLoading(false);
            });
        } else if (!email.current.value) {
            setErrorMessage("* 이메일을 확인해 주세요");
        } else if (password.current !== checkedPassword.current || !password.current) {
            setErrorMessage("* 비밀번호를 다시 확인해주세요");
        } else if (!agree.current.checked) {
            setErrorMessage("* 이용약관에 동의해주세요");
        }
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (Signup_module_default()).wrap,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: (Signup_module_default()).inner,
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h1", {
                    children: [
                        "JOOTONG",
                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                            className: (Signup_module_default()).cancel,
                            onClick: ()=>{
                                setSignupArea(false);
                            }
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (Signup_module_default()).credential,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: `${(Signup_module_default()).email} ${(Signup_module_default()).box}`,
                            children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                ref: email,
                                type: "text",
                                maxLength: 50,
                                onBlur: (e)=>{
                                    changeEmail(e);
                                },
                                placeholder: "이메일@exam.com"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: `${(Signup_module_default()).password} ${(Signup_module_default()).box}`,
                            children: passwordHidden ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        type: "password",
                                        maxLength: 20,
                                        onBlur: (e)=>{
                                            changePassword(e);
                                        },
                                        placeholder: "비밀번호 8자리 이상"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        className: (Signup_module_default()).password_hidden,
                                        onClick: ()=>{
                                            setPasswordHidden(!passwordHidden);
                                        }
                                    })
                                ]
                            }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        type: "text",
                                        maxLength: 20,
                                        onBlur: (e)=>{
                                            changePassword(e);
                                        },
                                        placeholder: "비밀번호 8자리 이상"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        className: (Signup_module_default()).password_on,
                                        onClick: ()=>{
                                            setPasswordHidden(!passwordHidden);
                                        }
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: `${(Signup_module_default()).password_confirm} ${(Signup_module_default()).box}`,
                            children: passwordHidden ? /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                type: "password",
                                maxLength: 20,
                                onBlur: (e)=>{
                                    passwordCheck(e);
                                },
                                placeholder: "비밀번호 확인"
                            }) : /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                type: "text",
                                maxLength: 20,
                                onBlur: (e)=>{
                                    passwordCheck(e);
                                },
                                placeholder: "비밀번호 확인"
                            })
                        }),
                        errorMessage && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (Signup_module_default()).error_message,
                            children: errorMessage
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                    className: (Signup_module_default()).agree_label,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                            type: "checkbox",
                            ref: agree
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            onClick: ()=>{
                                checkAgree();
                            },
                            href: "/policy/service",
                            target: "_blank",
                            children: "[필수]이용약관 동의하기"
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    className: (Signup_module_default()).signup,
                    onClick: ()=>{
                        startSignUp();
                    },
                    children: "가입하기"
                }),
                loading && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: (Signup_module_default()).loading,
                    children: /*#__PURE__*/ jsx_runtime_.jsx(Loading/* default */.Z, {})
                })
            ]
        })
    });
}

// EXTERNAL MODULE: ./components/auth/SnsSignup.js
var SnsSignup = __webpack_require__(7641);
// EXTERNAL MODULE: ./components/auth/UserCard.module.scss
var UserCard_module = __webpack_require__(6862);
var UserCard_module_default = /*#__PURE__*/__webpack_require__.n(UserCard_module);
// EXTERNAL MODULE: ./utils/date/index.js
var date = __webpack_require__(2932);
;// CONCATENATED MODULE: ./components/auth/UserCard.js









function UserCard({ setUserArea , setAlarm , privateRoomList , setPrivateRoomList , setAlertData  }) {
    const getUser = (0,external_recoil_.useRecoilValue)(recoilStore/* user */.EA);
    const [loading, setLoading] = (0,external_react_.useState)(false);
    return getUser && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (UserCard_module_default()).wrap,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                className: (UserCard_module_default()).title,
                children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    className: (UserCard_module_default()).nickname,
                    children: getUser.nickname
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (UserCard_module_default()).bridge,
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        className: (UserCard_module_default()).mypage,
                        href: "/mypage",
                        children: "마이페이지"
                    })
                })
            }),
            privateRoomList.length > 0 && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (UserCard_module_default()).message_list,
                children: privateRoomList.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {}))
            }),
            loading && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (UserCard_module_default()).loading,
                children: /*#__PURE__*/ jsx_runtime_.jsx(Loading/* default */.Z, {})
            })
        ]
    });
}

// EXTERNAL MODULE: ./components/modal/Alert.js
var Alert = __webpack_require__(5486);
;// CONCATENATED MODULE: ./components/auth/UserStatus.js












function UserStatus() {
    const getUser = (0,external_recoil_.useRecoilValue)(recoilStore/* user */.EA);
    const setUser = (0,external_recoil_.useSetRecoilState)(recoilStore/* userSelector */.np);
    const [alertData, setAlertData] = (0,external_react_.useState)({
        isAlert: false,
        message: "",
        confirm: /*#__PURE__*/ jsx_runtime_.jsx("button", {}),
        cancel: /*#__PURE__*/ jsx_runtime_.jsx("button", {})
    });
    const [snsSignup, setSnsSignup] = (0,external_react_.useState)(false);
    const [loginArea, setLoginArea] = (0,external_react_.useState)(false);
    const [signupArea, setSignupArea] = (0,external_react_.useState)(false);
    const [userArea, setUserArea] = (0,external_react_.useState)(false);
    const [alarm, setAlarm] = (0,external_react_.useState)(false);
    const [privateRoomList, setPrivateRoomList] = (0,external_react_.useState)([]);
    (0,external_react_.useEffect)(()=>{
        async function session() {
            return await (0,react_.getSession)();
        }
        session().then((session)=>{
            console.log("session?", session);
            if (session) setUser(session.user);
        });
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            getUser?.user_key ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (UserStatus_module_default()).user_status,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                        onClick: ()=>{
                            setUserArea(!userArea);
                        },
                        className: `${alarm ? (UserStatus_module_default()).alarm : ""}`,
                        children: [
                            getUser.nickname,
                            " 님"
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        onClick: ()=>{
                            (0,react_.signOut)({
                                callbackUrl: `${window.location.origin}`
                            });
                        },
                        children: "로그아웃"
                    }),
                    userArea && /*#__PURE__*/ jsx_runtime_.jsx(UserCard, {
                        setAlarm: setAlarm,
                        setUserArea: setUserArea,
                        privateRoomList: privateRoomList,
                        setPrivateRoomList: setPrivateRoomList,
                        setAlertData: setAlertData
                    })
                ]
            }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (UserStatus_module_default()).user_status,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        onClick: ()=>setLoginArea(true),
                        children: "로그인"
                    }),
                    loginArea && /*#__PURE__*/ jsx_runtime_.jsx("aside", {
                        children: !signupArea ? /*#__PURE__*/ jsx_runtime_.jsx(Signin, {
                            setLoginArea: setLoginArea,
                            setSignupArea: setSignupArea
                        }) : /*#__PURE__*/ jsx_runtime_.jsx(Signup, {
                            setSignupArea: setSignupArea,
                            setAlertData: setAlertData
                        })
                    }),
                    snsSignup && /*#__PURE__*/ jsx_runtime_.jsx(SnsSignup/* default */.Z, {
                        setAlertData: setAlertData,
                        setSnsSignup: setSnsSignup
                    })
                ]
            }),
            alertData.isAlert && /*#__PURE__*/ jsx_runtime_.jsx(Alert/* default */.Z, {
                props: {
                    message: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        children: alertData.message
                    }),
                    confirm: alertData.confirm,
                    cancel: alertData.cancel
                }
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/Header.js




function Header() {
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (Header_module_default()).wrap,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: (Header_module_default()).inner,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: (Header_module_default()).left_area,
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (Header_module_default()).logo,
                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "/",
                            children: "JOOTONG"
                        })
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (Header_module_default()).right_area,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            className: (Header_module_default()).create_room,
                            href: "/create"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (Header_module_default()).search,
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/search",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "20",
                                    height: "20",
                                    viewBox: "0 0 50 50",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                        d: "M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"
                                    })
                                })
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(UserStatus, {})
                    ]
                })
            ]
        })
    });
}


/***/ }),

/***/ 7544:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDateDiff": () => (/* binding */ getDateDiff)
/* harmony export */ });
/* harmony import */ var _getFormatedDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2624);

const getDateDiff = (target)=>{
    const diff = new Date((0,_getFormatedDate__WEBPACK_IMPORTED_MODULE_0__.getFormatedDate)()) - new Date(target);
    const day = parseInt(diff / (1000 * 60 * 60 * 24));
    const hour = parseInt(diff / (60 * 60 * 1000));
    const minute = parseInt(diff / (60 * 1000));
    if (day) {
        return {
            type: "day",
            number: day,
            text: day + "일전"
        };
    } else if (hour) {
        return {
            type: "hour",
            number: hour,
            text: hour + "시간전"
        };
    } else {
        return {
            number: minute,
            text: minute + "분전"
        };
    }
};


/***/ }),

/***/ 2624:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFormatedDate": () => (/* binding */ getFormatedDate)
/* harmony export */ });
const getFormatedDate = (data = {})=>{
    let date = data.target ? new Date(data.target) : new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month < 10 ? month = "0" + month : null;
    let day = date.getDate();
    day < 10 ? day = "0" + day : null;
    let hour = date.getHours();
    hour < 10 ? hour = "0" + hour : null;
    let minute = date.getMinutes();
    minute < 10 ? minute = "0" + minute : null;
    let second = date.getSeconds();
    second < 10 ? second = "0" + second : null;
    switch(data.format){
        case "YYYY/MM/DD":
            return year + "/" + month + "/" + day;
        case "HH:mm":
            return hour + ":" + minute;
        case "HH":
            return hour;
        case "YYYY, MM, DD":
            return year + "," + month + "," + day;
        case "YYYYMMDD":
            return year + month + day;
        case "YYYY-MM-DD":
            return year + "-" + month + "-" + day;
        default:
            return year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;
    }
};


/***/ }),

/***/ 8634:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getToday": () => (/* binding */ getToday)
/* harmony export */ });
// 오늘 날짜 구하기
const getToday = ()=>{
    const date = new Date();
    const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
    const kst = 9 * 60 * 60 * 1000;
    const today = new Date(utc + kst);
    return today;
};


/***/ }),

/***/ 2932:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
const _getToday = __webpack_require__(8634);
const _getFormatedDate = __webpack_require__(2624);
const _getDateDiff = __webpack_require__(7544);
module.exports = {
    getToday: _getToday.getToday,
    getFormatedDate: _getFormatedDate.getFormatedDate,
    getDateDiff: _getDateDiff.getDateDiff
};


/***/ }),

/***/ 5137:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ isEmail)
/* harmony export */ });
const isEmail = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;


/***/ }),

/***/ 1967:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "L": () => (/* binding */ isPassword)
/* harmony export */ });
const isPassword = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,20}$/;


/***/ })

};
;