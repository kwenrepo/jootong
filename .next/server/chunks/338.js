"use strict";
exports.id = 338;
exports.ids = [338];
exports.modules = {

/***/ 338:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "sD": () => (/* reexport */ dataList),
  "sO": () => (/* reexport */ dataListSelector),
  "EA": () => (/* reexport */ user),
  "np": () => (/* reexport */ userSelector)
});

// UNUSED EXPORTS: calendarDataList, calendarDataListSelector

// EXTERNAL MODULE: external "recoil"
var external_recoil_ = __webpack_require__(9755);
;// CONCATENATED MODULE: ./recoilStore/atoms.js

const user = (0,external_recoil_.atom)({
    key: "user" + new Date().getTime(),
    default: {
        user_key: "",
        nickname: ""
    }
});
const dataList = (0,external_recoil_.atom)({
    key: "dataList" + new Date().getTime(),
    default: []
});
const calendarDataList = (0,external_recoil_.atom)({
    key: "calendar" + new Date().getTime(),
    default: []
});

;// CONCATENATED MODULE: ./recoilStore/selectors.js


const userSelector = (0,external_recoil_.selector)({
    key: "userSelector" + new Date().getTime(),
    get: ({ get  })=>get(user),
    set: ({ set  }, session)=>{
        set(user, session);
    }
});
const dataListSelector = (0,external_recoil_.selector)({
    key: "dataListSelector" + new Date().getTime(),
    get: ({ get  })=>get(dataList),
    set: ({ set  }, newList)=>{
        newList = newList.map((item)=>{
            item.summaryOfContent = Object.values(JSON.parse(item.content))[0];
            return item;
        });
        set(dataList, newList);
    }
});
const calendarDataListSelector = (0,external_recoil_.selector)({
    key: "calendarDataListSelector" + new Date().getTime(),
    get: ({ get  })=>get(calendarDataList),
    set: ({ set  }, newList)=>{
        newList = newList.map((item)=>{
            item.summaryOfContent = Object.values(JSON.parse(item.content))[0];
            return item;
        });
        set(calendarDataList, newList);
    }
});

;// CONCATENATED MODULE: ./recoilStore/index.js








/***/ })

};
;