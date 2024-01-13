"use strict";
(() => {
var exports = {};
exports.id = 156;
exports.ids = [156];
exports.modules = {

/***/ 7993:
/***/ ((module) => {

module.exports = require("mysql2");

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

/***/ 345:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _database_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7004);
/* harmony import */ var _utils_date__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7297);
/* harmony import */ var _utils_date__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_utils_date__WEBPACK_IMPORTED_MODULE_1__);


async function handler(req, res) {
    if (req.method === "GET") {
        if (req.query.all) {
            await (0,_database_index__WEBPACK_IMPORTED_MODULE_0__/* .executeQuery */ .J)("SELECT * FROM question", []).then(async function(data) {
                res.send({
                    status: true,
                    data: data,
                    message: "전체 문의내역 조회 성공"
                });
            });
        } else if (req.query.user_key) {
            let { user_key  } = req.query;
            await (0,_database_index__WEBPACK_IMPORTED_MODULE_0__/* .executeQuery */ .J)("SELECT * FROM question WHERE user_key = ?", [
                user_key
            ]).then(async function(data) {
                if (data.length) {
                    res.send({
                        status: true,
                        data: data,
                        message: user_key + " :문의내역 조회 성공"
                    });
                } else {
                    res.send({
                        status: false,
                        data: data,
                        message: user_key + " :문의내역 없음"
                    });
                }
            });
        }
    } else if (req.method === "POST") {
        console.log("[회원문의시도]", req.body);
        let date = (0,_utils_date__WEBPACK_IMPORTED_MODULE_1__.getFormatedDate)();
        await (0,_database_index__WEBPACK_IMPORTED_MODULE_0__/* .executeQuery */ .J)("INSERT INTO question(user_key, title, content, create_date) values (?, ?, ?, ?)", [
            req.body.user_key,
            req.body.question.title,
            req.body.question.content,
            date
        ]).then(async function(data) {
            if (data.affectedRows) {
                res.send({
                    status: true,
                    message: "문의가 완료 되었습니다."
                });
            }
        });
    } else if (req.method === "PUT") {
        let date1 = (0,_utils_date__WEBPACK_IMPORTED_MODULE_1__.getFormatedDate)();
        console.log(req.body);
        (0,_database_index__WEBPACK_IMPORTED_MODULE_0__/* .executeQuery */ .J)("UPDATE question SET answer = ?, answer_date = ? WHERE idx = ?", [
            req.body.content,
            date1,
            req.body.idx
        ]).then(async function(data) {
            if (data.changedRows) {
                res.send({
                    status: true,
                    message: "답변 완료."
                });
            } else {
                res.send({
                    status: false,
                    message: "에러 : 존재하지 문의 입니다.."
                });
            }
        }, function(err) {
            res.send({
                status: false,
                message: err
            });
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
var __webpack_exports__ = __webpack_require__.X(0, [297], () => (__webpack_exec__(345)));
module.exports = __webpack_exports__;

})();