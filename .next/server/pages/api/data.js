"use strict";
(() => {
var exports = {};
exports.id = 432;
exports.ids = [432];
exports.modules = {

/***/ 7993:
/***/ ((module) => {

module.exports = require("mysql2");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 8969:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _database_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7004);
/* harmony import */ var _utils_randomUUID__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2914);
/* harmony import */ var _utils_date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7297);
/* harmony import */ var _utils_date__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_utils_date__WEBPACK_IMPORTED_MODULE_2__);



async function handler(req, res) {
    if (req.method === "GET") {
        console.log("get query", req.query.key);
        if (req.query.key) {
            console.log(req.query.key);
            await (0,_database_index__WEBPACK_IMPORTED_MODULE_0__/* .executeQuery */ .J)("SELECT * FROM data WHERE id = ?", [
                req.query.key
            ]).then((data)=>{
                console.log("data", data);
                res.send({
                    status: true,
                    data: data,
                    message: "[달력 조회]"
                });
            }, function(err) {
                res.send(err);
            });
        } else {
            await (0,_database_index__WEBPACK_IMPORTED_MODULE_0__/* .executeQuery */ .J)("SELECT * FROM data").then((data)=>{
                res.send({
                    status: true,
                    data: data,
                    message: "[달력 조회]"
                });
            }, function(err) {
                res.send(err);
            });
        }
    } else if (req.method === "POST") {
        if (req.query.keyword === "calendar") {
            console.log("[캘린더 리스트 생성]", req.body);
            const boardID = (0,_utils_randomUUID__WEBPACK_IMPORTED_MODULE_1__/* .randomUUID */ .H)(5);
            const create_date = (0,_utils_date__WEBPACK_IMPORTED_MODULE_2__.getFormatedDate)();
            await (0,_database_index__WEBPACK_IMPORTED_MODULE_0__/* .executeQuery */ .J)("INSERT INTO data (id, title, keyword, content, user_key, nickname, create_date) values (?,?,?,?,?,?,?)", [
                boardID,
                req.body.title,
                req.query.keyword,
                req.body.content,
                req.body.user_key,
                req.body.nickname,
                create_date
            ]).then(async (data)=>{
                if (data.insertId) {
                    res.send({
                        status: true,
                        data: {
                            title: req.body.title,
                            boardID
                        },
                        message: "캘린더 작성 성공"
                    });
                } else {
                    res.send({
                        status: false,
                        message: "캘린더 작성 실패"
                    });
                }
            }, function(err) {
                res.send(err);
            });
        }
    } else if (req.method === "PUT") {
        if (req.query.keyword === "calendar") {
            console.log("[캘린더 리스트 수정]", req.body);
            const create_date1 = (0,_utils_date__WEBPACK_IMPORTED_MODULE_2__.getFormatedDate)();
            await (0,_database_index__WEBPACK_IMPORTED_MODULE_0__/* .executeQuery */ .J)("UPDATE data SET title = ?, content = ?, create_date = ? WHERE id = ?", [
                req.body.title,
                req.body.content,
                create_date1,
                req.body.edit_key
            ]).then(async (data)=>{
                if (data.affectedRows) {
                    res.send({
                        status: true,
                        data: {
                            title: req.body.title
                        },
                        message: "캘린더 수정 성공"
                    });
                } else {
                    res.send({
                        status: false,
                        message: "캘린더 수정 실패"
                    });
                }
            }, function(err) {
                res.send(err);
            });
        }
    } else if (req.method === "DELETE") {
        if (req.query.keyword === "calendar") {
            console.log("[캘린더 삭제]", req.body);
            await (0,_database_index__WEBPACK_IMPORTED_MODULE_0__/* .executeQuery */ .J)("DELETE FROM data WHERE id = ?", [
                req.body.edit_key
            ]).then(async (data)=>{
                if (data.affectedRows) {
                    res.send({
                        status: true,
                        data: {
                            title: req.body.title
                        },
                        message: "캘린더 삭제 성공"
                    });
                } else {
                    res.send({
                        status: false,
                        message: "캘린더 삭제 실패"
                    });
                }
            }, function(err) {
                res.send(err);
            });
        }
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [297,400], () => (__webpack_exec__(8969)));
module.exports = __webpack_exports__;

})();