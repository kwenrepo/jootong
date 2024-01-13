exports.id = 518;
exports.ids = [518];
exports.modules = {

/***/ 6624:
/***/ ((module) => {

// Exports
module.exports = {
	"wrap": "ListArea_wrap__XLVkR",
	"inner": "ListArea_inner__yHBEc",
	"item_list_wrap": "ListArea_item_list_wrap__2yLyJ",
	"item_list_grid": "ListArea_item_list_grid___0qby",
	"item_header": "ListArea_item_header__gMyRB",
	"item_title": "ListArea_item_title__f_9sn",
	"item_body": "ListArea_item_body__Spc_5",
	"cap": "ListArea_cap__Gdzlu",
	"summary_calendar": "ListArea_summary_calendar__pNlBJ",
	"day_number": "ListArea_day_number__Q6zj4",
	"history_item": "ListArea_history_item__QOsdW",
	"text": "ListArea_text___KTwh",
	"item_bottom": "ListArea_item_bottom__XMC7o",
	"from_date": "ListArea_from_date__337fC",
	"new": "ListArea_new__EV2mZ",
	"empty": "ListArea_empty__kGBg_"
};


/***/ }),

/***/ 2504:
/***/ ((module) => {

// Exports
module.exports = {
	"wrap": "lobby_wrap__MEa8l",
	"lobby": "lobby_lobby__gC_5H"
};


/***/ }),

/***/ 2518:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ lobby)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./pages/lobby.module.scss
var lobby_module = __webpack_require__(2504);
var lobby_module_default = /*#__PURE__*/__webpack_require__.n(lobby_module);
// EXTERNAL MODULE: ./components/lobby/ListArea.module.scss
var ListArea_module = __webpack_require__(6624);
var ListArea_module_default = /*#__PURE__*/__webpack_require__.n(ListArea_module);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "recoil"
var external_recoil_ = __webpack_require__(9755);
// EXTERNAL MODULE: ./recoilStore/index.js + 2 modules
var recoilStore = __webpack_require__(338);
// EXTERNAL MODULE: ./components/Loading.js
var Loading = __webpack_require__(3033);
// EXTERNAL MODULE: ./utils/date/index.js
var date = __webpack_require__(2932);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./components/lobby/ListArea.js








function ListArea() {
    const setDataList = (0,external_recoil_.useSetRecoilState)(recoilStore/* dataListSelector */.sO);
    const getDataList = (0,external_recoil_.useRecoilValue)(recoilStore/* dataList */.sD);
    const [loading, setLoading] = (0,external_react_.useState)(true);
    const [weather, setWeather] = (0,external_react_.useState)({});
    const [totalList, setTotalList] = (0,external_react_.useState)([]);
    (0,external_react_.useEffect)(()=>{
        getCalendarList();
    }, []);
    function getCalendarList() {
        fetch("/api/data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response)=>response.json()).then((result)=>{
            if (result.status) {
                let { data  } = result;
                setDataList(data);
            }
        });
    }
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (ListArea_module_default()).wrap,
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: (ListArea_module_default()).inner,
            children: getDataList.length > 0 ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (ListArea_module_default()).item_list_wrap,
                children: /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                    className: (ListArea_module_default()).item_list_grid,
                    children: getDataList.map((item)=>{
                        return /*#__PURE__*/ jsx_runtime_.jsx("li", {
                            children: item.create_user_key !== "jt" ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                                href: `/${item.id}@${item.title}`,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (ListArea_module_default()).item_header,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: (ListArea_module_default()).item_title,
                                            children: item.title
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: (ListArea_module_default()).item_body,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: (ListArea_module_default()).cap,
                                                children: "요약"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: (ListArea_module_default()).summary_calendar,
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            className: (ListArea_module_default()).day_number,
                                                            children: [
                                                                item.summaryOfContent.year,
                                                                ".",
                                                                " ",
                                                                item.summaryOfContent.month + 1,
                                                                ".",
                                                                " ",
                                                                item.summaryOfContent.date
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            className: (ListArea_module_default()).history_item,
                                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                className: (ListArea_module_default()).text,
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                        children: item.summaryOfContent.description ? item.summaryOfContent.description : item.summaryOfContent.key
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                        children: item.summaryOfContent.value.toLocaleString("ko-KR")
                                                                    })
                                                                ]
                                                            })
                                                        })
                                                    ]
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: (ListArea_module_default()).item_bottom,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: (ListArea_module_default()).creator,
                                                children: item.create_name === "empty" ? "익명" : item.create_name
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: (0,date.getDateDiff)(item.create_date).type !== "day" ? `${(ListArea_module_default()).from_date} ${(ListArea_module_default())["new"]}` : `${(ListArea_module_default()).from_date}`,
                                                children: (0,date.getDateDiff)(item.create_date).text
                                            })
                                        ]
                                    })
                                ]
                            }) : ""
                        }, item.id);
                    })
                })
            }) : /*#__PURE__*/ jsx_runtime_.jsx(Loading/* default */.Z, {})
        })
    });
}

// EXTERNAL MODULE: ./components/Layout.js
var Layout = __webpack_require__(3412);
;// CONCATENATED MODULE: ./pages/lobby.js




function lobby() {
    return /*#__PURE__*/ jsx_runtime_.jsx(Layout/* default */.Z, {
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: (lobby_module_default()).wrap,
            children: /*#__PURE__*/ jsx_runtime_.jsx(ListArea, {})
        })
    });
}


/***/ })

};
;