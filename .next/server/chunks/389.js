exports.id = 389;
exports.ids = [389];
exports.modules = {

/***/ 3212:
/***/ ((module) => {

// Exports
module.exports = {
	"wrap": "CalendarEditor_wrap__ek0OH",
	"calendar_wrap": "CalendarEditor_calendar_wrap__m_760",
	"set_title": "CalendarEditor_set_title__WKQtj",
	"calendar": "CalendarEditor_calendar__L4L13",
	"calendar_header": "CalendarEditor_calendar_header__ocRzq",
	"button_box": "CalendarEditor_button_box__EmEsd",
	"prev": "CalendarEditor_prev__F5F3U",
	"next": "CalendarEditor_next__o1hNR",
	"summary_list": "CalendarEditor_summary_list__SReJG",
	"title": "CalendarEditor_title__Ur_yT",
	"item_list": "CalendarEditor_item_list__ggoZ6",
	"on": "CalendarEditor_on__P9zC3",
	"group_name": "CalendarEditor_group_name__CsTTb",
	"detail_list": "CalendarEditor_detail_list__BQfc6",
	"calendar_days": "CalendarEditor_calendar_days__ibwXJ",
	"calendar_date": "CalendarEditor_calendar_date__LoD4F",
	"day_number": "CalendarEditor_day_number__zsukM",
	"history_item": "CalendarEditor_history_item__BcQh4",
	"key": "CalendarEditor_key__e56As",
	"value": "CalendarEditor_value__OVkWA",
	"delete": "CalendarEditor_delete__lkeQR",
	"able": "CalendarEditor_able__KgC_g",
	"empty": "CalendarEditor_empty__nATw3",
	"edit_box": "CalendarEditor_edit_box__8b4SH",
	"inner": "CalendarEditor_inner__gOktH",
	"button_wrap": "CalendarEditor_button_wrap__YtTZg",
	"confirm": "CalendarEditor_confirm__Mlhlw",
	"cancel": "CalendarEditor_cancel__41kdB"
};


/***/ }),

/***/ 1886:
/***/ ((module) => {

// Exports
module.exports = {
	"wrap": "CalendarViewer_wrap__S938u",
	"calendar_wrap": "CalendarViewer_calendar_wrap__5VQ2o",
	"set_title": "CalendarViewer_set_title__0xfhX",
	"calendar": "CalendarViewer_calendar__3u9wA",
	"calendar_header": "CalendarViewer_calendar_header__C9bbk",
	"button_box": "CalendarViewer_button_box__3hCJo",
	"prev": "CalendarViewer_prev__yrWuA",
	"next": "CalendarViewer_next__VX3CE",
	"summary_list": "CalendarViewer_summary_list__IkD_Q",
	"title": "CalendarViewer_title__dSAwG",
	"item_list": "CalendarViewer_item_list__Jw1bN",
	"on": "CalendarViewer_on__WzURB",
	"group_name": "CalendarViewer_group_name__jaT21",
	"detail_list": "CalendarViewer_detail_list___bsH9",
	"calendar_days": "CalendarViewer_calendar_days__D_7Kb",
	"calendar_date": "CalendarViewer_calendar_date__cvJzv",
	"day_number": "CalendarViewer_day_number__egB_1",
	"history_item": "CalendarViewer_history_item__iC4W3",
	"key": "CalendarViewer_key__mT345",
	"value": "CalendarViewer_value__QX9Uz",
	"able": "CalendarViewer_able__e_Q4z",
	"button_wrap": "CalendarViewer_button_wrap__84Cgj",
	"confirm": "CalendarViewer_confirm__WDXby",
	"capture": "CalendarViewer_capture__i6i15",
	"edit": "CalendarViewer_edit__upR2m",
	"delete": "CalendarViewer_delete__Zn4aK"
};


/***/ }),

/***/ 5389:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "c": () => (/* reexport */ CalendarEditor),
  "X": () => (/* reexport */ CalendarViewer)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./components/calendar/CalendarEditor.module.scss
var CalendarEditor_module = __webpack_require__(3212);
var CalendarEditor_module_default = /*#__PURE__*/__webpack_require__.n(CalendarEditor_module);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "recoil"
var external_recoil_ = __webpack_require__(9755);
// EXTERNAL MODULE: ./recoilStore/index.js + 2 modules
var recoilStore = __webpack_require__(338);
// EXTERNAL MODULE: ./utils/date/index.js
var date = __webpack_require__(2932);
// EXTERNAL MODULE: ./components/modal/Alert.js
var Alert = __webpack_require__(5486);
;// CONCATENATED MODULE: ./components/calendar/CalendarEditor.js








function CalendarEditor({ title , setTitle , isEdit , setIsEdit , editDataList =[] , setViewList  }) {
    const getUser = (0,external_recoil_.useRecoilValue)(recoilStore/* user */.EA);
    const router = (0,router_.useRouter)();
    const [alertData, setAlertData] = (0,external_react_.useState)({
        isAlert: false,
        message: "",
        confirm: /*#__PURE__*/ jsx_runtime_.jsx("button", {}),
        cancel: /*#__PURE__*/ jsx_runtime_.jsx("button", {})
    });
    const [selectMonth, setSelectMonth] = (0,external_react_.useState)(new Date((0,date.getToday)()));
    const [currentCalendar, setCurrentCalendar] = (0,external_react_.useState)({
        year: "",
        month: "",
        yearMonth: "",
        list: []
    });
    const [monthItemList, setMonthItemList] = (0,external_react_.useState)([]);
    const [summaryList, setSummaryList] = (0,external_react_.useState)([]);
    const [editDate, setEditDate] = (0,external_react_.useState)(0);
    const [addItem, setAddItem] = (0,external_react_.useState)({});
    function updateCurrentCalendar() {
        console.log("monthItemList", monthItemList);
        const year = selectMonth.getFullYear();
        const month = selectMonth.getMonth();
        const yearMonth = String(year) + String(month);
        const startIndex = new Date(year, month, 0).getDay() + 1;
        const totalIndex = new Date(year, month + 1, 0).getDate() + startIndex;
        const monthItem = monthItemList?.reduce((acc, current)=>{
            if (yearMonth === current.yearMonth) {
                acc[current.date] = acc[current.date] || [];
                acc[current.date].push({
                    key: current.key,
                    value: current.value,
                    explain: current.explain,
                    yearMonth
                });
            }
            return acc;
        }, {});
        let tempCalendar = [];
        for(let i = 0; i < totalIndex; i++){
            if (i < startIndex) {
                tempCalendar.push(null);
            } else {
                tempCalendar.push({
                    start: i === startIndex ? true : false,
                    number: i - startIndex + 1,
                    item: monthItem[i - startIndex + 1]
                });
            }
        }
        setCurrentCalendar({
            year,
            month,
            yearMonth,
            list: tempCalendar
        });
    }
    function updateSummary() {
        const getKeyValues = monthItemList.reduce((acc, current)=>{
            if (currentCalendar.yearMonth === current.yearMonth) {
                acc[current.key] = acc[current.key] || [];
                acc[current.key].push({
                    value: current.value,
                    explain: current.explain
                });
            }
            return acc;
        }, {});
        const getKeyValueArray = Object.keys(getKeyValues).map((key)=>{
            return {
                key,
                total: getKeyValues[key].reduce((acc, current)=>{
                    acc += current.value;
                    return acc;
                }, 0),
                detailList: [],
                detailValues: getKeyValues[key].reduce((acc, current)=>{
                    acc[current.explain] = acc[current.explain] || [];
                    acc[current.explain].push({
                        value: current.value,
                        explain: current.explain
                    });
                    return acc;
                }, {})
            };
        });
        getKeyValueArray.map((item)=>{
            item.detailList = Object.keys(item.detailValues).map((key)=>{
                return {
                    key,
                    total: item.detailValues[key].reduce((acc, current)=>{
                        acc += current.value;
                        return acc;
                    }, 0)
                };
            });
        });
        console.log("getKeyValueArray", getKeyValueArray);
        setSummaryList(getKeyValueArray);
    }
    function save() {
        if (title === "") {
            setAlertData({
                isAlert: true,
                message: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    children: "이름을 작성해 주세요."
                }),
                cancel: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    onClick: ()=>{
                        setAlertData({
                            isAlert: false
                        });
                    },
                    children: "확인"
                })
            });
            return false;
        } else if (monthItemList.length < 1) {
            setAlertData({
                isAlert: true,
                message: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    children: "입력된 데이터가 없습니다."
                }),
                cancel: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    onClick: ()=>{
                        setAlertData({
                            isAlert: false
                        });
                    },
                    children: "확인"
                })
            });
            return false;
        } else if (!getUser.user_key) {
            setAlertData({
                isAlert: true,
                message: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    children: "익명으로 저장 하시면 수정이 불가합니다."
                }),
                confirm: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    onClick: ()=>{
                        let arrayToJson = JSON.stringify(monthItemList);
                        let data = {
                            user_key: getUser.user_key || "",
                            title,
                            content: arrayToJson,
                            nickname: getUser.nickname || ""
                        };
                        fetch("/api/data?keyword=calendar", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        }).then((response)=>response.json()).then((result)=>{
                            if (result.status) {
                                const { data  } = result;
                                setAlertData({
                                    isAlert: true,
                                    message: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: "저장이 완료 되었습니다."
                                    }),
                                    confirm: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        onClick: ()=>{
                                            router.push({
                                                pathname: "/" + data.boardID + "@" + data.title
                                            });
                                        },
                                        children: "보러가기"
                                    }),
                                    cancel: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        onClick: ()=>{
                                            router.back();
                                        },
                                        children: "확인"
                                    })
                                });
                            }
                        });
                    },
                    children: "확인 "
                }),
                cancel: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    onClick: ()=>{
                        router.push("/signin");
                    },
                    children: "로그인"
                })
            });
            return false;
        } else {
            let arrayToJson = JSON.stringify(monthItemList);
            let data = {
                user_key: getUser.user_key || "",
                title,
                content: arrayToJson,
                nickname: getUser.nickname || ""
            };
            fetch("/api/data?keyword=calendar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then((response)=>response.json()).then((result)=>{
                if (result.status) {
                    const { data  } = result;
                    setAlertData({
                        isAlert: true,
                        message: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            children: "저장이 완료 되었습니다."
                        }),
                        confirm: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                            onClick: ()=>{
                                router.push({
                                    pathname: "/" + data.boardID + "@" + data.title
                                });
                            },
                            children: "보러가기"
                        }),
                        cancel: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                            onClick: ()=>{
                                router.back();
                            },
                            children: "확인"
                        })
                    });
                }
            });
        }
    }
    function edit() {
        if (title === "") {
            setAlertData({
                isAlert: true,
                message: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    children: "이름을 작성해 주세요."
                }),
                cancel: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    onClick: ()=>{
                        setAlertData({
                            isAlert: false
                        });
                    },
                    children: "확인"
                })
            });
            return false;
        } else if (monthItemList.length < 1) {
            setAlertData({
                isAlert: true,
                message: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    children: "입력된 데이터가 없습니다."
                }),
                cancel: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    onClick: ()=>{
                        setAlertData({
                            isAlert: false
                        });
                    },
                    children: "확인"
                })
            });
            return false;
        }
        let arrayToJson = JSON.stringify(monthItemList);
        console.log("arrayToJson", arrayToJson);
        let data = {
            title,
            content: arrayToJson,
            edit_key: router.query.calendar.split("@")[0]
        };
        fetch("/api/data?keyword=calendar", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response)=>response.json()).then((result)=>{
            if (result.status) {
                const { data  } = result;
                setAlertData({
                    isAlert: true,
                    message: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        children: "수정이 완료 되었습니다."
                    }),
                    confirm: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        onClick: ()=>{
                            setViewList(monthItemList);
                            setIsEdit({
                                ...isEdit,
                                status: false
                            });
                        },
                        children: "확인"
                    })
                });
            }
        });
    }
    const addItemHandler = {
        add: function(e) {
            let { name , value  } = e.target;
            if (name === "value") value = value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
            setAddItem({
                ...addItem,
                [name]: name === "value" ? Number(value) : value,
                yearMonth: currentCalendar.yearMonth
            });
        },
        reset: function() {
            setAddItem({
                key: "",
                value: "",
                explain: ""
            });
        },
        edit: function(i, target) {
            setEditDate(i);
            const found = monthItemList.findIndex((item)=>item.date === i && item.explain === target.explain && item.yearMonth === target.yearMonth);
            setAddItem({
                key: target.key,
                value: target.value || 0,
                explain: target.explain || target.key,
                isEdit: true,
                editIndex: found
            });
        }
    };
    const itemListManager = {
        add: function() {
            if (!addItem.key) {
                setAlertData({
                    isAlert: true,
                    message: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        children: "항목을 입력해주세요."
                    }),
                    cancel: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        onClick: ()=>{
                            setAlertData({
                                isAlert: false
                            });
                        },
                        children: "확인"
                    })
                });
                return false;
            }
            const isCheckIndex = monthItemList.findIndex((item)=>item.date === editDate && item.explain === addItem.explain && item.key === addItem.key && item.yearMonth === addItem.yearMonth);
            if (isCheckIndex >= 0) monthItemList.splice(isCheckIndex, 1);
            setMonthItemList([
                ...monthItemList,
                {
                    key: addItem.key || "",
                    value: addItem.value || 0,
                    explain: addItem.explain || addItem.key,
                    year: currentCalendar.year,
                    month: currentCalendar.month,
                    date: editDate,
                    yearMonth: currentCalendar.yearMonth
                }
            ]);
            setEditDate("");
            addItemHandler["reset"]();
        },
        cancel: function() {
            setEditDate("");
            addItemHandler["reset"]();
        },
        delete: function(date, target) {
            let deleteList = monthItemList.filter((item)=>{
                return item.date !== date || item.explain !== target.explain || item.key !== target.key || item.yearMonth !== target.yearMonth;
            });
            setMonthItemList(deleteList);
        },
        edit: function() {
            monthItemList[addItem.editIndex].key = addItem.key;
            monthItemList[addItem.editIndex].value = addItem.value || 0;
            monthItemList[addItem.editIndex].explain = addItem.explain || addItem.key;
            monthItemList[addItem.editIndex].yearMonth = addItem.yearMonth;
            setMonthItemList([
                ...monthItemList
            ]);
            setEditDate("");
            addItemHandler["reset"]();
        }
    };
    const changeCalendar = {
        prev: function() {
            setSelectMonth(new Date(currentCalendar.year, currentCalendar.month - 1, 1));
        },
        next: function() {
            setSelectMonth(new Date(currentCalendar.year, currentCalendar.month + 1, 1));
        }
    };
    (0,external_react_.useEffect)(()=>{
        updateCurrentCalendar();
    }, [
        monthItemList
    ]);
    (0,external_react_.useEffect)(()=>{
        if (selectMonth) {
            updateCurrentCalendar();
        }
    }, [
        selectMonth
    ]);
    (0,external_react_.useEffect)(()=>{
        updateSummary();
    }, [
        currentCalendar
    ]);
    (0,external_react_.useEffect)(()=>{
        if (editDataList.length > 0) {
            setTitle(title);
            setMonthItemList(editDataList);
        }
    }, [
        editDataList
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                className: (CalendarEditor_module_default()).wrap,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (CalendarEditor_module_default()).calendar_wrap,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: `${(CalendarEditor_module_default()).set_title}`,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                    type: "text",
                                    value: title || "",
                                    onChange: (e)=>setTitle(e.target.value),
                                    placeholder: "달력 이름을 지어주세요."
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: (CalendarEditor_module_default()).calendar,
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: (CalendarEditor_module_default()).calendar_header,
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h1", {
                                                children: [
                                                    currentCalendar.year,
                                                    ". ",
                                                    currentCalendar.month + 1,
                                                    "월"
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: (CalendarEditor_module_default()).button_box,
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                        className: (CalendarEditor_module_default()).prev,
                                                        onClick: ()=>{
                                                            changeCalendar["prev"]();
                                                        },
                                                        children: "prev"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                        className: (CalendarEditor_module_default()).next,
                                                        onClick: ()=>{
                                                            changeCalendar["next"]();
                                                        },
                                                        children: "next"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    summaryList?.length > 0 && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: (CalendarEditor_module_default()).summary_list,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: (CalendarEditor_module_default()).title,
                                                children: "이번달 간추린 내역"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                                className: (CalendarEditor_module_default()).item_list,
                                                children: summaryList.map((item)=>{
                                                    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                                        children: [
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                className: (CalendarEditor_module_default()).group_name,
                                                                onClick: (e)=>{
                                                                    let height = e.target.closest("li").getBoundingClientRect().height;
                                                                    let scrollHeight = e.target.closest("li").scrollHeight;
                                                                    height === scrollHeight ? e.target.closest("li").style.height = `24px` : e.target.closest("li").style.height = `${scrollHeight}px`;
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                        children: item.key
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                        children: item.total.toLocaleString("ko-KR")
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {})
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: (CalendarEditor_module_default()).detail_list,
                                                                children: item.detailList.map((detail)=>{
                                                                    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                                children: detail.key
                                                                            }),
                                                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                                children: detail.total.toLocaleString("ko-KR")
                                                                            })
                                                                        ]
                                                                    }, detail.key + new Date().getTime());
                                                                })
                                                            })
                                                        ]
                                                    }, item.key + new Date().getTime());
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                        className: (CalendarEditor_module_default()).calendar_days,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: "일"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: "월"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: "화"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: "수"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: "목"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: "금"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: "토"
                                            })
                                        ]
                                    }),
                                    currentCalendar.list.length > 0 && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (CalendarEditor_module_default()).calendar_date,
                                        children: currentCalendar.list.map((day, index)=>{
                                            return day ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: day.start ? `${(CalendarEditor_module_default()).able} ${(CalendarEditor_module_default()).start}` : (CalendarEditor_module_default()).able,
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    setEditDate(day.number);
                                                },
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: (CalendarEditor_module_default()).day_number,
                                                        children: day.number
                                                    }),
                                                    day.item?.map((item, index)=>{
                                                        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            className: (CalendarEditor_module_default()).history_item,
                                                            onClick: (e)=>{
                                                                e.preventDefault();
                                                                addItemHandler["edit"](day.number, item);
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                    className: (CalendarEditor_module_default()).key,
                                                                    children: [
                                                                        "[",
                                                                        item.key,
                                                                        "]"
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                    className: (CalendarEditor_module_default()).value,
                                                                    children: [
                                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                            children: item.explain ? item.explain : ""
                                                                        }),
                                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                            children: item.value.toLocaleString("ko-KR")
                                                                        }),
                                                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                                            className: (CalendarEditor_module_default())["delete"],
                                                                            onClick: (e)=>{
                                                                                e.stopPropagation();
                                                                                itemListManager["delete"](day.number, item);
                                                                            }
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        }, index + new Date());
                                                    })
                                                ]
                                            }, day.number) : /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: (CalendarEditor_module_default()).empty
                                            }, index + new Date().getTime());
                                        })
                                    }),
                                    editDate > 0 && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (CalendarEditor_module_default()).edit_box,
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: (CalendarEditor_module_default()).inner,
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h1", {
                                                    children: [
                                                        editDate,
                                                        "일"
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("dl", {
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                            children: "그룹(항목)"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                type: "text",
                                                                placeholder: "치킨",
                                                                name: "key",
                                                                value: addItem.key || "",
                                                                onChange: (e)=>{
                                                                    addItemHandler["add"](e);
                                                                }
                                                            })
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("dl", {
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                            children: "내역"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                type: "text",
                                                                placeholder: "0",
                                                                name: "value",
                                                                value: (addItem.value || 0).toLocaleString(),
                                                                onChange: (e)=>{
                                                                    addItemHandler["add"](e);
                                                                }
                                                            })
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("dl", {
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                            children: "설명"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                type: "text",
                                                                placeholder: "굽네치킨",
                                                                name: "explain",
                                                                value: addItem.explain || "",
                                                                onChange: (e)=>{
                                                                    addItemHandler["add"](e);
                                                                }
                                                            })
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: (CalendarEditor_module_default()).button_box,
                                                    children: [
                                                        addItem.isEdit ? /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                            onClick: ()=>{
                                                                itemListManager["edit"]();
                                                            },
                                                            children: "수정"
                                                        }) : /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                            onClick: ()=>{
                                                                itemListManager["add"]();
                                                            },
                                                            children: "추가"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                            onClick: ()=>{
                                                                itemListManager["cancel"]();
                                                            },
                                                            children: "취소"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (CalendarEditor_module_default()).button_wrap,
                        children: isEdit?.status ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                    className: (CalendarEditor_module_default()).confirm,
                                    onClick: ()=>edit(),
                                    children: "수정하기"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                    className: (CalendarEditor_module_default()).cancel,
                                    onClick: ()=>{
                                        setIsEdit({
                                            ...isEdit,
                                            status: false
                                        });
                                    },
                                    children: "취소하기"
                                })
                            ]
                        }) : /*#__PURE__*/ jsx_runtime_.jsx("button", {
                            className: (CalendarEditor_module_default()).confirm,
                            onClick: ()=>save(),
                            children: "저장하고 공유하기"
                        })
                    })
                ]
            }),
            alertData.isAlert && /*#__PURE__*/ jsx_runtime_.jsx(Alert/* default */.Z, {
                props: {
                    message: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        children: alertData.message
                    }),
                    confirm: alertData.confirm,
                    cancel: alertData.cancel
                }
            })
        ]
    });
}

// EXTERNAL MODULE: ./components/calendar/CalendarViewer.module.scss
var CalendarViewer_module = __webpack_require__(1886);
var CalendarViewer_module_default = /*#__PURE__*/__webpack_require__.n(CalendarViewer_module);
// EXTERNAL MODULE: external "html2canvas"
var external_html2canvas_ = __webpack_require__(7276);
var external_html2canvas_default = /*#__PURE__*/__webpack_require__.n(external_html2canvas_);
// EXTERNAL MODULE: external "file-saver"
var external_file_saver_ = __webpack_require__(8109);
var external_file_saver_default = /*#__PURE__*/__webpack_require__.n(external_file_saver_);
;// CONCATENATED MODULE: ./components/calendar/CalendarViewer.js










function CalendarViewer({ title , setTitle , isEdit , setIsEdit , viewList =[]  }) {
    const getUser = (0,external_recoil_.useRecoilValue)(recoilStore/* user */.EA);
    const router = (0,router_.useRouter)();
    const captureRef = (0,external_react_.useRef)(null);
    const [alertData, setAlertData] = (0,external_react_.useState)({
        isAlert: false,
        message: "",
        confirm: /*#__PURE__*/ jsx_runtime_.jsx("button", {}),
        cancel: /*#__PURE__*/ jsx_runtime_.jsx("button", {})
    });
    const [selectMonth, setSelectMonth] = (0,external_react_.useState)(new Date((0,date.getToday)()));
    const [currentCalendar, setCurrentCalendar] = (0,external_react_.useState)({
        year: "",
        month: "",
        yearMonth: "",
        list: []
    });
    const [monthItemList, setMonthItemList] = (0,external_react_.useState)([]);
    const [summaryList, setSummaryList] = (0,external_react_.useState)([]);
    const [editDate, setEditDate] = (0,external_react_.useState)(0);
    const [addItem, setAddItem] = (0,external_react_.useState)({});
    function updateCurrentCalendar() {
        console.log("monthItemList", monthItemList);
        const year = selectMonth.getFullYear();
        const month = selectMonth.getMonth();
        const yearMonth = String(year) + String(month);
        const startIndex = new Date(year, month, 0).getDay() + 1;
        const totalIndex = new Date(year, month + 1, 0).getDate() + startIndex;
        const monthItem = monthItemList?.reduce((acc, current)=>{
            if (yearMonth === current.yearMonth) {
                acc[current.date] = acc[current.date] || [];
                acc[current.date].push({
                    key: current.key,
                    value: current.value,
                    explain: current.explain,
                    yearMonth
                });
            }
            return acc;
        }, {});
        let tempCalendar = [];
        for(let i = 0; i < totalIndex; i++){
            if (i < startIndex) {
                tempCalendar.push(null);
            } else {
                tempCalendar.push({
                    start: i === startIndex ? true : false,
                    number: i - startIndex + 1,
                    item: monthItem[i - startIndex + 1]
                });
            }
        }
        setCurrentCalendar({
            year,
            month,
            yearMonth,
            list: tempCalendar
        });
    }
    function updateSummary() {
        const getKeyValues = monthItemList.reduce((acc, current)=>{
            if (currentCalendar.yearMonth === current.yearMonth) {
                acc[current.key] = acc[current.key] || [];
                acc[current.key].push({
                    value: current.value,
                    explain: current.explain
                });
            }
            return acc;
        }, {});
        const getKeyValueArray = Object.keys(getKeyValues).map((key)=>{
            return {
                key,
                total: getKeyValues[key].reduce((acc, current)=>{
                    acc += current.value;
                    return acc;
                }, 0),
                detailList: [],
                detailValues: getKeyValues[key].reduce((acc, current)=>{
                    acc[current.explain] = acc[current.explain] || [];
                    acc[current.explain].push({
                        value: current.value,
                        explain: current.explain
                    });
                    return acc;
                }, {})
            };
        });
        getKeyValueArray.map((item)=>{
            item.detailList = Object.keys(item.detailValues).map((key)=>{
                return {
                    key,
                    total: item.detailValues[key].reduce((acc, current)=>{
                        acc += current.value;
                        return acc;
                    }, 0)
                };
            });
        });
        setSummaryList(getKeyValueArray);
    }
    const changeCalendar = {
        prev: function() {
            setSelectMonth(new Date(currentCalendar.year, currentCalendar.month - 1, 1));
        },
        next: function() {
            setSelectMonth(new Date(currentCalendar.year, currentCalendar.month + 1, 1));
        }
    };
    function share() {
        navigator.clipboard.writeText(window.location.href).then(()=>{
            /* clipboard successfully set */ setAlertData({
                isAlert: true,
                message: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    children: "URL 이 복사되었습니다."
                }),
                confirm: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    onClick: ()=>{
                        setAlertData({
                            isAlert: false
                        });
                    },
                    children: "확인"
                })
            });
        }, ()=>{
            /* clipboard write failed */ setAlertData({
                isAlert: true,
                message: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    children: "죄송합니다 다시 시도해 주세요."
                }),
                confirm: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    onClick: ()=>{
                        setAlertData({
                            isAlert: false
                        });
                    },
                    children: "확인"
                })
            });
        });
    }
    async function capture() {
        if (!captureRef.current) return;
        try {
            const target = captureRef.current;
            const canvas = await external_html2canvas_default()(target, {
                scale: 1
            });
            canvas.toBlob((blob)=>{
                if (blob !== null) {
                    external_file_saver_default()(blob, `calendar_${currentCalendar.year}_${currentCalendar.month + 1}.png`);
                }
            });
        } catch (error) {
            console.error("Error converting div to image:", error);
        }
    }
    ;
    function calendarDelete() {
        setAlertData({
            isAlert: true,
            message: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                children: [
                    "정말 삭제 하시겠습니까? ",
                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                    " 삭제 후 복구가 불가합니다."
                ]
            }),
            confirm: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                onClick: ()=>{
                    let data = {
                        edit_key: router.query.calendar.split("@")[0]
                    };
                    fetch("/api/data?keyword=calendar", {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    }).then((response)=>response.json()).then((result)=>{
                        if (result.status) {
                            const { data  } = result;
                            setAlertData({
                                isAlert: true,
                                message: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    children: "삭제가 완료 되었습니다"
                                }),
                                confirm: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                    onClick: ()=>{
                                        router.push("/");
                                    },
                                    children: "확인"
                                })
                            });
                        }
                    });
                },
                children: "삭제"
            }),
            cancel: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                onClick: ()=>{
                    setAlertData({
                        isAlert: false
                    });
                },
                children: "취소"
            })
        });
    }
    (0,external_react_.useEffect)(()=>{
        updateCurrentCalendar();
    }, [
        monthItemList
    ]);
    (0,external_react_.useEffect)(()=>{
        if (selectMonth) {
            updateCurrentCalendar();
        }
    }, [
        selectMonth
    ]);
    (0,external_react_.useEffect)(()=>{
        updateSummary();
    }, [
        currentCalendar
    ]);
    (0,external_react_.useEffect)(()=>{
        if (viewList.length) {
            setTitle(title);
            setMonthItemList(viewList);
        }
    }, [
        viewList
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                className: (CalendarViewer_module_default()).wrap,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (CalendarViewer_module_default()).calendar_wrap,
                        ref: captureRef,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: `${(CalendarViewer_module_default()).set_title}`,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    children: title || ""
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: (CalendarViewer_module_default()).calendar,
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: (CalendarViewer_module_default()).calendar_header,
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h1", {
                                                children: [
                                                    currentCalendar.year,
                                                    ". ",
                                                    currentCalendar.month + 1,
                                                    "월"
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: (CalendarViewer_module_default()).button_box,
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                        className: (CalendarViewer_module_default()).prev,
                                                        onClick: ()=>{
                                                            changeCalendar["prev"]();
                                                        },
                                                        children: "prev"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                        className: (CalendarViewer_module_default()).next,
                                                        onClick: ()=>{
                                                            changeCalendar["next"]();
                                                        },
                                                        children: "next"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    summaryList?.length > 0 && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: (CalendarViewer_module_default()).summary_list,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: (CalendarViewer_module_default()).title,
                                                children: "이번달 간추린 내역"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                                className: (CalendarViewer_module_default()).item_list,
                                                children: summaryList.map((item)=>{
                                                    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                                        children: [
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                className: (CalendarViewer_module_default()).group_name,
                                                                onClick: (e)=>{
                                                                    let height = e.target.closest("li").getBoundingClientRect().height;
                                                                    let scrollHeight = e.target.closest("li").scrollHeight;
                                                                    height === scrollHeight ? e.target.closest("li").style.height = `24px` : e.target.closest("li").style.height = `${scrollHeight}px`;
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                        children: item.key
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                        children: item.total.toLocaleString("ko-KR")
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {})
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: (CalendarViewer_module_default()).detail_list,
                                                                children: item.detailList.map((detail)=>{
                                                                    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                                children: detail.key
                                                                            }),
                                                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                                children: detail.total.toLocaleString("ko-KR")
                                                                            })
                                                                        ]
                                                                    }, detail.key + new Date().getTime());
                                                                })
                                                            })
                                                        ]
                                                    }, item.key + new Date().getTime());
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                        className: (CalendarViewer_module_default()).calendar_days,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: "일"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: "월"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: "화"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: "수"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: "목"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: "금"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: "토"
                                            })
                                        ]
                                    }),
                                    currentCalendar.list.length > 0 && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (CalendarViewer_module_default()).calendar_date,
                                        children: currentCalendar.list.map((day, index)=>{
                                            return day ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: day.start ? `${(CalendarViewer_module_default()).able} ${(CalendarViewer_module_default()).start}` : (CalendarViewer_module_default()).able,
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    setEditDate(day.number);
                                                },
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: (CalendarViewer_module_default()).day_number,
                                                        children: day.number
                                                    }),
                                                    day.item?.map((item, index)=>{
                                                        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            className: (CalendarViewer_module_default()).history_item,
                                                            children: [
                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                    className: (CalendarViewer_module_default()).key,
                                                                    children: [
                                                                        "[",
                                                                        item.key,
                                                                        "]"
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                    className: (CalendarViewer_module_default()).value,
                                                                    children: [
                                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                            children: item.explain ? item.explain : ""
                                                                        }),
                                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                            children: item.value.toLocaleString("ko-KR")
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        }, index + new Date());
                                                    })
                                                ]
                                            }, day.number) : /*#__PURE__*/ jsx_runtime_.jsx("p", {}, index + new Date().getTime());
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (CalendarViewer_module_default()).button_wrap,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                className: (CalendarViewer_module_default()).confirm,
                                onClick: ()=>share(),
                                children: "공유 하기"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                className: (CalendarViewer_module_default()).capture,
                                onClick: ()=>capture(),
                                children: "캡쳐 하기"
                            }),
                            getUser.user_key === isEdit.user_key && /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                className: (CalendarViewer_module_default()).edit,
                                onClick: ()=>setIsEdit({
                                        ...isEdit,
                                        status: true
                                    }),
                                children: "수정 하기"
                            }),
                            getUser.user_key === isEdit.user_key && /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                className: (CalendarViewer_module_default())["delete"],
                                onClick: ()=>{
                                    calendarDelete();
                                },
                                children: "삭제 하기"
                            })
                        ]
                    })
                ]
            }),
            alertData.isAlert && /*#__PURE__*/ jsx_runtime_.jsx(Alert/* default */.Z, {
                props: {
                    message: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        children: alertData.message
                    }),
                    confirm: alertData.confirm,
                    cancel: alertData.cancel
                }
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/calendar/index.js





/***/ })

};
;