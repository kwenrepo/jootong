"use strict";
exports.id = 400;
exports.ids = [400];
exports.modules = {

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

/***/ 2914:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ randomUUID)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6113);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);

const randomUUID = function(byte) {
    return (new Date().getTime().toString(36).replace(".", "").substring(5, 7) + crypto__WEBPACK_IMPORTED_MODULE_0___default().randomBytes(byte || 4).toString("hex")).toUpperCase();
};


/***/ })

};
;