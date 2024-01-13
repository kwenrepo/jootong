"use strict";
(() => {
var exports = {};
exports.id = 367;
exports.ids = [367];
exports.modules = {

/***/ 7993:
/***/ ((module) => {

module.exports = require("mysql2");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 3010:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6113);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _database_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7004);
/* harmony import */ var _utils_randomUUID__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2914);
/* harmony import */ var _utils_date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7297);
/* harmony import */ var _utils_date__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_utils_date__WEBPACK_IMPORTED_MODULE_3__);




async function handler(req, res) {
    if (req.method === "POST") {
        console.log("[운영자 등록] : ", req.body);
        let email = req.body.email;
        await (0,_database_index__WEBPACK_IMPORTED_MODULE_1__/* .executeQuery */ .J)("SELECT email FROM user WHERE email = ?", [
            email
        ]).then(async (data)=>{
            if (!data[0]) {
                let user_key = (0,_utils_randomUUID__WEBPACK_IMPORTED_MODULE_2__/* .randomUUID */ .H)(5);
                let nickname = (0,_utils_randomUUID__WEBPACK_IMPORTED_MODULE_2__/* .randomUUID */ .H)(4);
                const hashPassword = crypto__WEBPACK_IMPORTED_MODULE_0___default().createHash("sha512").update(req.body.password).digest("hex");
                crypto__WEBPACK_IMPORTED_MODULE_0___default().randomBytes(16, (err, buf)=>{
                    const salt = buf.toString("hex");
                    crypto__WEBPACK_IMPORTED_MODULE_0___default().pbkdf2(hashPassword, salt, 9132, 16, "sha512", async (err, key)=>{
                        const finishPassword = key.toString("hex");
                        await (0,_database_index__WEBPACK_IMPORTED_MODULE_1__/* .executeQuery */ .J)("INSERT INTO user(email, password, password_salt, provider, nickname, sign_date, user_key) values (?, ?, ?, ?, ?, ?, ?)", [
                            email,
                            finishPassword,
                            salt,
                            req.body.provider,
                            nickname,
                            (0,_utils_date__WEBPACK_IMPORTED_MODULE_3__.getFormatedDate)(),
                            user_key
                        ]).then(async function(data) {
                            if (data.affectedRows) {
                                await (0,_database_index__WEBPACK_IMPORTED_MODULE_1__/* .executeQuery */ .J)("INSERT INTO item_all(user_key) values (?)", [
                                    user_key
                                ]).then(function() {
                                    res.send({
                                        status: true,
                                        email,
                                        message: req.body.email + ": 회원가입 성공"
                                    });
                                }, function(err) {
                                    res.send({
                                        status: false,
                                        message: err + ": 회원가입, 아이템 초기화 실패"
                                    });
                                });
                            } else {
                                res.send({
                                    status: false,
                                    message: data.message
                                });
                            }
                        }, function(err) {
                            res.send(err);
                        });
                    }, function(err) {
                        res.send({
                            status: false,
                            message: err
                        });
                    });
                }, function(err) {
                    res.send({
                        status: false,
                        message: err
                    });
                });
            } else {
                res.send({
                    status: false,
                    message: data[0].email + " 이미 존재하는 이메일입니다."
                });
            }
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [297,400], () => (__webpack_exec__(3010)));
module.exports = __webpack_exports__;

})();