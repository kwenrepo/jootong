"use strict";
(() => {
var exports = {};
exports.id = 748;
exports.ids = [748];
exports.modules = {

/***/ 7993:
/***/ ((module) => {

module.exports = require("mysql2");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 7004:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ executeQuery)
/* harmony export */ });
const { createPool  } = __webpack_require__(7993);
const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    connectionLimit: 30
});
pool.getConnection((err, connection)=>{
    if (err) {
        console.log("error connect to db.." + process.env.DB_HOST);
    // setTimeout(function() { pool.getConnection(); }, 2500);
    }
    console.log("[DB 연결 성공] : " + process.env.DB_HOST);
    connection.release();
});
const executeQuery = (query, arrParams)=>{
    return new Promise((resolve, reject)=>{
        try {
            pool.query(query, arrParams, (err, data)=>{
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        } catch (err) {
            reject(err);
        }
    });
};


/***/ }),

/***/ 8718:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "authOptions": () => (/* binding */ authOptions),
  "default": () => (/* binding */ _nextauth_)
});

// EXTERNAL MODULE: ./database/index.js
var database = __webpack_require__(7004);
;// CONCATENATED MODULE: external "next-auth"
const external_next_auth_namespaceObject = require("next-auth");
var external_next_auth_default = /*#__PURE__*/__webpack_require__.n(external_next_auth_namespaceObject);
;// CONCATENATED MODULE: external "next-auth/providers/credentials"
const credentials_namespaceObject = require("next-auth/providers/credentials");
var credentials_default = /*#__PURE__*/__webpack_require__.n(credentials_namespaceObject);
;// CONCATENATED MODULE: external "next-auth/providers/google"
const google_namespaceObject = require("next-auth/providers/google");
var google_default = /*#__PURE__*/__webpack_require__.n(google_namespaceObject);
;// CONCATENATED MODULE: external "next-auth/providers/naver"
const naver_namespaceObject = require("next-auth/providers/naver");
var naver_default = /*#__PURE__*/__webpack_require__.n(naver_namespaceObject);
;// CONCATENATED MODULE: external "next-auth/providers/kakao"
const kakao_namespaceObject = require("next-auth/providers/kakao");
var kakao_default = /*#__PURE__*/__webpack_require__.n(kakao_namespaceObject);
// EXTERNAL MODULE: ./utils/date/index.js
var date = __webpack_require__(7297);
// EXTERNAL MODULE: external "crypto"
var external_crypto_ = __webpack_require__(6113);
var external_crypto_default = /*#__PURE__*/__webpack_require__.n(external_crypto_);
;// CONCATENATED MODULE: ./pages/api/auth/[...nextauth].js








const authOptions = {
    providers: [
        credentials_default()({
            async authorize (credentials, req) {
                let user = {
                    provider: "credential"
                };
                return await (0,database/* executeQuery */.J)("SELECT * FROM user WHERE email = ?", [
                    credentials.email
                ]).then(async function(data) {
                    // console.log("credencial data" ,data)
                    if (data[0]) {
                        if (data[0].status) {
                            const currentPassword = external_crypto_default().createHash("sha512").update(credentials.password).digest("hex");
                            const hashedPassword = external_crypto_default().pbkdf2Sync(currentPassword, data[0].password_salt, 9132, 16, "sha512").toString("hex");
                            if (hashedPassword === data[0].password) {
                                return await (0,database/* executeQuery */.J)("SELECT item_nickname FROM item_all WHERE user_key = ? ", [
                                    data[0].user_key
                                ]).then(function(item) {
                                    user.nickname = data[0].nickname;
                                    user.item = item[0];
                                    user.user_key = data[0].user_key;
                                    credentials.email === "admin" ? user.email = "admin" : "";
                                    return user;
                                }, function(err) {
                                    return user;
                                });
                            } else {
                                user.message = "비밀번호가 맞지 않습니다.";
                                return user;
                            }
                        }
                    // else {
                    //   const diff = new Date(getFormatedDate()) - new Date("", data[0].withdraw_date);
                    //   const day = parseInt(diff / (1000 * 60 * 60 * 24));
                    //   // console.log("DELETE day", day)
                    //   if(day >= 0){
                    //     return await executeQuery("DELETE FROM user WHERE user_key = ? ", [data[0].user_key]).then(async function(data){
                    //       return session;
                    //     }, function(err){
                    //       console.log("nextauth [DELETE FROM user WHERE user_key] error: ", err)
                    //       return session;
                    //     });
                    //   } else {
                    //     session.user.status = data[0].status;
                    //     return session;
                    //   }
                    // }
                    } else {
                        user.message = "존재하지 않는 이메일입니다.";
                        return user;
                    }
                }, function(err) {
                    user.message = err;
                    return user;
                });
            }
        }),
        google_default()({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        naver_default()({
            clientId: process.env.NAVER_CLIENT_ID,
            clientSecret: process.env.NAVER_SECRET
        }),
        kakao_default()({
            clientId: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_SECRET
        })
    ],
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout"
    },
    secret: process.env.JWT_SECRET,
    session: {
        maxAge: 60 * 300
    },
    callbacks: {
        async signIn ({ user  }) {
            // console.log("signUser:", user)
            if (user.email) {
                return true;
            } else if (!user.user_key) {
                return  true ? "https://www.jootong.com?error=" + user.message : 0;
            }
            return true;
        },
        async jwt ({ token , account , user , trigger , session  }) {
            if (trigger === "update") {
                token.user = session.user;
            } else if (user) {
                token.user = user;
            }
            if (account) {
                token.provider = account.provider;
            }
            return token;
        },
        async session ({ session , token  }) {
            if (token.user.provider === "credential") {
                session.user = token.user;
                return session;
            } else {
                // console.log("session", session)
                return await (0,database/* executeQuery */.J)("SELECT * FROM user WHERE email = ?", [
                    session.user.email
                ]).then(async (data)=>{
                    if (data.length) {
                        if (data[0].status) {
                            return await (0,database/* executeQuery */.J)("SELECT item_nickname FROM item_all WHERE user_key = ? ", [
                                data[0].user_key
                            ]).then(function(item) {
                                session.user.nickname = data[0].nickname;
                                session.user.user_key = data[0].user_key;
                                session.user.provider = data[0].provider;
                                session.user.item = item[0];
                                return session;
                            }, function(err) {
                                return session;
                            });
                        } else {
                            const diff = new Date((0,date.getFormatedDate)()) - new Date(data[0].withdraw_date);
                            const day = parseInt(diff / (1000 * 60 * 60 * 24));
                            if (day >= 0) {
                                return await (0,database/* executeQuery */.J)("DELETE FROM user WHERE user_key = ? ", [
                                    data[0].user_key
                                ]).then(async function(data) {
                                    return session;
                                }, function(err) {
                                    console.log("nextauth [DELETE FROM user WHERE user_key] error: ", err);
                                    return session;
                                });
                            } else {
                                session.user.status = data[0].status;
                                return session;
                            }
                        }
                    } else {
                        session.user.provider = token.provider;
                        return session;
                    }
                }, function(err) {
                    return session;
                });
            }
        },
        async redirect ({ url  }) {
            return url;
        }
    }
};
/* harmony default export */ const _nextauth_ = (external_next_auth_default()(authOptions));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [297], () => (__webpack_exec__(8718)));
module.exports = __webpack_exports__;

})();