"use strict";
(() => {
var exports = {};
exports.id = 198;
exports.ids = [198];
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

/***/ 3323:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _database_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7004);

async function handler(req, res) {
    if (req.method === "GET") {
        console.log("req.query.keyword =", req.query.keyword);
        await (0,_database_index__WEBPACK_IMPORTED_MODULE_0__/* .executeQuery */ .J)("SELECT * FROM data WHERE title REGEXP ?", [
            req.query.keyword
        ]).then((data)=>{
            res.send({
                status: true,
                data: data,
                message: "검색 성공"
            });
        }, function(err) {
            res.send(err);
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
var __webpack_exports__ = (__webpack_exec__(3323));
module.exports = __webpack_exports__;

})();