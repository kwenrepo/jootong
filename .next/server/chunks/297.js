"use strict";
exports.id = 297;
exports.ids = [297];
exports.modules = {

/***/ 9740:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDateDiff": () => (/* binding */ getDateDiff)
/* harmony export */ });
/* harmony import */ var _getFormatedDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2734);

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

/***/ 2734:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ 3078:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ 7297:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
const _getToday = __webpack_require__(3078);
const _getFormatedDate = __webpack_require__(2734);
const _getDateDiff = __webpack_require__(9740);
module.exports = {
    getToday: _getToday.getToday,
    getFormatedDate: _getFormatedDate.getFormatedDate,
    getDateDiff: _getDateDiff.getDateDiff
};


/***/ })

};
;