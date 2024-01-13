"use strict";
(() => {
var exports = {};
exports.id = 743;
exports.ids = [743];
exports.modules = {

/***/ 3722:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _utils_date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7297);
/* harmony import */ var _utils_date__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_date__WEBPACK_IMPORTED_MODULE_0__);

async function handler(req, res) {
    if (req.method === "GET") {
        console.log("[날씨 조회]");
        const url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth"; /*URL*/ 
        let queryParams = "?" + encodeURIComponent("serviceKey") + "=" + "GHwA0ggnlqf2BHlg8AgzTpPqnqB0TUpQ8z9jjRBArg4fbLLAhHu7kxzr1Lb1pzJv9kSc%2BFQdg%2BXJ1t0Qc1BoTA%3D%3D"; /*Service Key*/ 
        queryParams += "&" + encodeURIComponent("returnType") + "=" + encodeURIComponent("json"); /**/ 
        queryParams += "&" + encodeURIComponent("searchDate") + "=" + encodeURIComponent((0,_utils_date__WEBPACK_IMPORTED_MODULE_0__.getFormatedDate)({
            format: "YYYY-MM-DD"
        })); /**/ 
        queryParams += "&" + encodeURIComponent("InformCode") + "=" + encodeURIComponent("PM10"); /**/ 
        fetch(url + queryParams, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response)=>response.json()).then((data)=>{
            if (data.response.header.resultCode === "00") {
                res.send({
                    status: true,
                    data: data.response.body.items,
                    message: "날씨(먼지) 조회 성공"
                });
            }
        });
    }
    res.send(200);
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [297], () => (__webpack_exec__(3722)));
module.exports = __webpack_exports__;

})();