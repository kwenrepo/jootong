"use strict";
(() => {
var exports = {};
exports.id = 541;
exports.ids = [541];
exports.modules = {

/***/ 7993:
/***/ ((module) => {

module.exports = require("mysql2");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 3235:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

// EXTERNAL MODULE: external "crypto"
var external_crypto_ = __webpack_require__(6113);
var external_crypto_default = /*#__PURE__*/__webpack_require__.n(external_crypto_);
;// CONCATENATED MODULE: external "nodemailer"
const external_nodemailer_namespaceObject = require("nodemailer");
var external_nodemailer_default = /*#__PURE__*/__webpack_require__.n(external_nodemailer_namespaceObject);
// EXTERNAL MODULE: ./database/index.js
var database = __webpack_require__(7004);
// EXTERNAL MODULE: ./utils/randomUUID.js
var randomUUID = __webpack_require__(2914);
// EXTERNAL MODULE: ./utils/date/index.js
var date = __webpack_require__(7297);
;// CONCATENATED MODULE: ./utils/regexp/isEmail.js
const isEmail = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

;// CONCATENATED MODULE: ./utils/regexp/isPassword.js
const isPassword = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,20}$/;

;// CONCATENATED MODULE: ./utils/regexp/isNickname.js
const isNickname = /관리(?!.)|관리자(?!.)|운영자(?!.)|운영(?!.)|주통(?!.)|주식소통(?!.)|jootong(?!.)|JOOTONG(?!.)|개새끼|씨발|씨빨|씨이발|시발|시빨|씨이빨|좆|병신|조옺|벼엉신|븅신|뱡신|뵹신|씹새|십새|씹세|강간|윤간(?!호사)|보지|자지|성폭행|김대중|노무현|이재명|윤석열|이회창|문재인|박근혜|이명박|신창원|고유정|이재용|최태원|김정주|검|빛|뻐큐|빠큐|뽀큐|섹스|쎅스|빠구리|질내사정|질외사정|sex(?!y)|fuck|admin|love(?!.)|사랑(?!.)|김관(?!.)/i;

;// CONCATENATED MODULE: ./pages/api/user/index.js








async function handler(req, res) {
    if (req.method === "GET") {
        if (req.query.checkPassword) {
            const data = req.body;
            await (0,database/* executeQuery */.J)("SELECT * FROM user WHERE user_key = ?", [
                data.user_key
            ]).then(async function(user) {
                console.log("req.query.checkPassword SELECT * FROM user WHERE user_key", user);
                if (user[0]) {
                    const currentPassword = external_crypto_default().createHash("sha512").update(data.password).digest("hex");
                    const hashedPassword = external_crypto_default().pbkdf2Sync(currentPassword, user[0].password_salt, 9132, 16, "sha512").toString("hex");
                    if (hashedPassword === user[0].password) {
                        res.send({
                            status: true,
                            message: data.user_key + " 비밀번호 확인 완료."
                        });
                    } else {
                        res.send({
                            status: false,
                            message: "비밀번호가 맞지 않습니다."
                        });
                    }
                } else {
                    res.send({
                        status: false,
                        message: "존재하지 않는 유저입니다."
                    });
                }
            }, function(err) {
                res.send({
                    status: false,
                    message: err
                });
            });
        } else if (req.query.user_key) {
            await (0,database/* executeQuery */.J)("SELECT * FROM user WHERE user_key = ?", [
                req.query.user_key
            ]).then((data)=>{
                console.log("req.query.user_key, SELECT * FROM user WHERE user_key =", req.query.user_key);
                if (data[0]) {
                    res.send({
                        status: true,
                        data: data[0],
                        message: "유저 조회 성공"
                    });
                } else {
                    res.send({
                        ststus: false,
                        message: "유저 조회 실패"
                    });
                }
            }, function(err) {
                res.send(err);
            });
        } else {
            await (0,database/* executeQuery */.J)("SELECT COUNT(*) count FROM user", []).then((data)=>{
                if (data[0].count) {
                    res.send({
                        status: true,
                        data: data[0].count,
                        message: "전체 유저 조회 성공"
                    });
                } else {
                    res.send({
                        ststus: false,
                        message: "전체 유저 조회 실패"
                    });
                }
            }, function(err) {
                res.send(err);
            });
        }
    } else if (req.method === "POST") {
        console.log("[회원가입시도] : ", req.body);
        if (req.body.provider === "credential") {
            if (!isEmail.test(req.body.email)) {
                res.send({
                    status: false,
                    message: "* 올바른 이메일 형식이 아닙니다."
                });
            } else if (!isPassword.test(req.body.password)) {
                res.send({
                    status: false,
                    message: "* 비밀번호를 다시 확인해주세요."
                });
            } else {
                let email = req.body.email;
                await (0,database/* executeQuery */.J)("SELECT email FROM user WHERE email = ?", [
                    email
                ]).then(async (data)=>{
                    if (!data[0]) {
                        let user_key = (0,randomUUID/* randomUUID */.H)(5);
                        let nickname = (0,randomUUID/* randomUUID */.H)(4);
                        const hashPassword = external_crypto_default().createHash("sha512").update(req.body.password).digest("hex");
                        external_crypto_default().randomBytes(16, (err, buf)=>{
                            const salt = buf.toString("hex");
                            external_crypto_default().pbkdf2(hashPassword, salt, 9132, 16, "sha512", async (err, key)=>{
                                const finishPassword = key.toString("hex");
                                await (0,database/* executeQuery */.J)("INSERT INTO user(email, password, password_salt, provider, nickname, sign_date, user_key) values (?, ?, ?, ?, ?, ?, ?)", [
                                    email,
                                    finishPassword,
                                    salt,
                                    req.body.provider,
                                    nickname,
                                    (0,date.getFormatedDate)(),
                                    user_key
                                ]).then(async function(data) {
                                    if (data.affectedRows) {
                                        await (0,database/* executeQuery */.J)("INSERT INTO item_all(user_key) values (?)", [
                                            user_key
                                        ]).then(function() {
                                            console.log("[회원가입성공] : ", req.body);
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
                }, function(err) {
                    res.send({
                        status: false,
                        message: err
                    });
                });
            }
        } else {
            let email1 = req.body.email;
            console.log("[SNS회원가입시도] :", email1);
            await (0,database/* executeQuery */.J)("SELECT email FROM user WHERE email = ?", [
                email1
            ]).then(async (data)=>{
                if (!data[0]) {
                    let nickname = (0,randomUUID/* randomUUID */.H)(4);
                    let user_key = (0,randomUUID/* randomUUID */.H)(5);
                    await (0,database/* executeQuery */.J)("INSERT INTO user(email, provider, nickname, sign_date, user_key) values (?, ?, ?, ?, ?)", [
                        email1,
                        req.body.provider,
                        nickname,
                        (0,date.getFormatedDate)(),
                        user_key
                    ]).then(async function(data) {
                        console.log("[SNS회원가입성공]: ", data);
                        if (data.insertId) {
                            await (0,database/* executeQuery */.J)("INSERT INTO item_all(user_key) values (?)", [
                                user_key
                            ]).then(function() {
                                res.send({
                                    status: true,
                                    data: {
                                        email: email1,
                                        user_key,
                                        nickname
                                    },
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
                } else {
                    res.send({
                        status: false,
                        message: data[0].email + " 이미 존재하는 이메일입니다."
                    });
                }
            }, function(err) {
                res.send(err);
            });
        }
    } else if (req.method === "DELETE") {
        const data1 = req.body;
        console.log("[회원탈퇴시도] :", data1);
        (0,database/* executeQuery */.J)("SELECT * FROM user WHERE user_key = ?", [
            data1.user_key
        ]).then(async function(user) {
            if (user[0]) {
                await (0,database/* executeQuery */.J)("DELETE FROM user, item_all, question USING user LEFT JOIN item_all ON user.user_key = item_all.user_key LEFT JOIN question ON user.user_key = question.user_key WHERE user.user_key = ?", [
                    data1.user_key
                ]).then(async function(result) {
                    if (result.affectedRows) {
                        await (0,database/* executeQuery */.J)("UPDATE message SET user_key = REPLACE(user_key, ?, '')", [
                            data1.user_key
                        ]).then(async function(data) {
                            console.log("[탈퇴회원 메시지삭제] room_id = ", result[0].room_id);
                            if (typeof data.affectedRows === "number") {
                                await (0,database/* executeQuery */.J)("UPDATE private_room SET create_nickname = REPLACE(create_nickname, ?, ''), target_nickname = REPLACE(target_nickname, ?, '')", [
                                    req.body.nickname,
                                    req.body.nickname
                                ]).then(async function(data) {
                                    if (typeof data.affectedRows === "number") {
                                        console.log("[회원탈퇴성공]", data);
                                        res.send({
                                            status: true,
                                            message: req.body.nickname + " : 탈퇴완료"
                                        });
                                        await (0,database/* executeQuery */.J)("SELECT * FROM private_room WHERE create_nickname = '' AND target_nickname ='' ", []).then(async function(result) {
                                            if (result[0]) {
                                                await (0,database/* executeQuery */.J)("DELETE FROM private_room, private_message USING private_room LEFT JOIN private_message ON private_room.room_id = private_message.room_id WHERE private_room.room_id = ?", [
                                                    result[0].room_id
                                                ]).then(async ()=>{
                                                    console.log("[탈퇴회원 개인채팅삭제] room_id = ", result[0].room_id);
                                                });
                                            }
                                        });
                                    } else {
                                        res.send({
                                            status: false
                                        });
                                    }
                                });
                            } else {
                                res.send({
                                    status: false
                                });
                            }
                        });
                    } else {
                        res.send({
                            status: false,
                            message: "회원탈퇴 오류 발생"
                        });
                    }
                }, function(err) {
                    res.send(err);
                });
            } else {
                res.send({
                    status: false,
                    message: "존재하지 않는 유저입니다."
                });
            }
        }, function(err) {
            res.send({
                status: false,
                message: err
            });
        });
    } else {
        if (req.query.target === "nickname") {
            console.log("[회원닉네임변경시도]:", req.body);
            const regExp = /^[가-힣a-zA-Z0-9]+$/;
            if (req.body.user_key === "XFD84427C21D" || req.body.user_key === "8N2885B0883C" || req.body.user_key === "O3E995E25F27") {
                if (isNickname.test(req.body.newNickname) || !regExp.test(req.body.newNickname)) {
                    res.send({
                        status: false,
                        message: "사용불가한 닉네임 입니다."
                    });
                } else {
                    await (0,database/* executeQuery */.J)("SELECT nickname FROM user WHERE nickname = ?", [
                        req.body.newNickname
                    ]).then(async (data)=>{
                        if (data.length) {
                            res.send({
                                status: false,
                                message: "이미 사용중인 닉네임입니다."
                            });
                        } else {
                            await (0,database/* executeQuery */.J)("UPDATE user SET nickname=? WHERE user_key = ?", [
                                req.body.newNickname,
                                req.body.user_key
                            ]).then(async function(data) {
                                if (data.affectedRows === 1) {
                                    await (0,database/* executeQuery */.J)("UPDATE private_room SET create_nickname = REPLACE(create_nickname, ?, ?), target_nickname = REPLACE(target_nickname, ?, ?)", [
                                        req.body.nickname,
                                        req.body.newNickname,
                                        req.body.nickname,
                                        req.body.newNickname
                                    ]).then(async function(data) {
                                        if (typeof data.affectedRows === "number") {
                                            res.send({
                                                status: true,
                                                nickname: req.body.newNickname,
                                                message: req.body.newNickname + " : 변경완료"
                                            });
                                        }
                                    });
                                } else {
                                    res.send({
                                        status: false,
                                        message: "에러 : 존재하지 않는 유저 입니다."
                                    });
                                }
                            }, function(err) {
                                res.send({
                                    status: false,
                                    message: err
                                });
                            });
                        }
                    }, function(err) {
                        res.send(err);
                    });
                }
                return false;
            }
            if (isNickname.test(req.body.newNickname) || !regExp.test(req.body.newNickname)) {
                res.send({
                    status: false,
                    message: "사용불가한 닉네임 입니다."
                });
            } else {
                await (0,database/* executeQuery */.J)("SELECT item_nickname FROM item_all WHERE user_key = ?", [
                    req.body.user_key
                ]).then(async function(data) {
                    let itemNickname = data[0]?.item_nickname || 0;
                    if (itemNickname > 0) {
                        await (0,database/* executeQuery */.J)("SELECT nickname FROM user WHERE nickname = ?", [
                            req.body.newNickname
                        ]).then(async (data)=>{
                            if (data.length) {
                                res.send({
                                    status: false,
                                    message: "이미 사용중인 닉네임입니다."
                                });
                            } else {
                                await (0,database/* executeQuery */.J)("UPDATE user SET nickname=? WHERE user_key = ?", [
                                    req.body.newNickname,
                                    req.body.user_key
                                ]).then(async function(data) {
                                    if (data.affectedRows === 1) {
                                        await (0,database/* executeQuery */.J)("UPDATE private_room SET create_nickname = REPLACE(create_nickname, ?, ?), target_nickname = REPLACE(target_nickname, ?, ?)", [
                                            req.body.nickname,
                                            req.body.newNickname,
                                            req.body.nickname,
                                            req.body.newNickname
                                        ]).then(async function(data) {
                                            if (typeof data.affectedRows === "number") {
                                                await (0,database/* executeQuery */.J)("UPDATE item_all SET item_nickname = item_nickname - 1, nickname_change_count = nickname_change_count + 1 WHERE user_key = ?", [
                                                    req.body.user_key
                                                ]).then(async function(data) {
                                                    if (data.affectedRows === 1) {
                                                        res.send({
                                                            status: true,
                                                            nickname: req.body.newNickname,
                                                            message: req.body.newNickname + " : 변경완료"
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    } else {
                                        res.send({
                                            status: false,
                                            message: "에러 : 존재하지 않는 유저 입니다."
                                        });
                                    }
                                }, function(err) {
                                    res.send({
                                        status: false,
                                        message: err
                                    });
                                });
                            }
                        }, function(err) {
                            res.send(err);
                        });
                    } else {
                        res.send({
                            result: false,
                            message: "닉네임 변경권이 없습니다."
                        });
                    }
                });
            }
        } else if (req.query.forgot === "password") {
            // 패스워드찾기
            await (0,database/* executeQuery */.J)("SELECT * FROM user WHERE email = ?", [
                req.body
            ]).then(async (data)=>{
                if (data[0] && data[0].provider === "credential") {
                    let password = (0,randomUUID/* randomUUID */.H)(6);
                    const hashPassword = external_crypto_default().createHash("sha512").update(password).digest("hex");
                    external_crypto_default().randomBytes(16, (err, buf)=>{
                        const salt = buf.toString("hex");
                        external_crypto_default().pbkdf2(hashPassword, salt, 9132, 16, "sha512", async (err, key)=>{
                            const finishPassword = key.toString("hex");
                            console.log("[회원 비밀번호찾기 변경]", finishPassword, salt);
                            await (0,database/* executeQuery */.J)("UPDATE user SET password = ?, password_salt = ? WHERE email = ?", [
                                finishPassword,
                                salt,
                                req.body
                            ]).then(async function(data) {
                                if (data.affectedRows) {
                                    const transporter = external_nodemailer_default().createTransport({
                                        service: "gmail",
                                        auth: {
                                            user: process.env.SMTP_USER,
                                            pass: process.env.SMTP_PASSWORD
                                        }
                                    });
                                    await transporter.sendMail({
                                        to: req.body,
                                        subject: "[JOOTONG-주식소통] 비밀번호 가 변경되었습니다.",
                                        html: `
                      <div style="padding:20px; border-bottom:1px solid #ccc;">
                        회원님의 비밀번호가 변경되었습니다.<br/>
                        로그인 후 비밀번호 를 변경 해주세요.
                        <div>
                          변경 비밀번호 : <span>${password}</span>
                        </div>

                        <a href="https://www.jootong.com">JOOTONG 돌아가기</a>
                      </div>
                      `
                                    });
                                    res.send({
                                        status: true,
                                        message: "변경된 비밀번호를 회원님의 메일로 발송했습니다!"
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
                            res.send(err);
                        });
                    }, function(err) {
                        res.send(err);
                    });
                } else {
                    if (data[0]) {
                        res.send({
                            status: false,
                            message: req.body + " 은 SNS로 가입한 계정 입니다. SNS로그인 이용 바랍니다."
                        });
                    } else {
                        res.send({
                            status: false,
                            message: req.body + " 존재하지 않는 이메일입니다."
                        });
                    }
                }
            });
        } else if (req.query.change === "password") {
            await (0,database/* executeQuery */.J)("SELECT * FROM user WHERE user_key = ?", [
                req.body.user_key
            ]).then(async function(data) {
                if (data[0].status) {
                    const currentPassword = external_crypto_default().createHash("sha512").update(req.body.current).digest("hex");
                    const hashedPassword = external_crypto_default().pbkdf2Sync(currentPassword, data[0].password_salt, 9132, 16, "sha512").toString("hex");
                    console.log("[회원 비밀번호 변경 시도]:", req.body.user_key);
                    if (hashedPassword === data[0].password) {
                        const hashPassword = external_crypto_default().createHash("sha512").update(req.body.new).digest("hex");
                        external_crypto_default().randomBytes(16, (err, buf)=>{
                            const salt = buf.toString("hex");
                            external_crypto_default().pbkdf2(hashPassword, salt, 9132, 16, "sha512", async (err, key)=>{
                                const finishPassword = key.toString("hex");
                                if (hashedPassword === finishPassword) {
                                    res.send({
                                        status: false,
                                        message: "현재 사용중인 비밀번호 입니다."
                                    });
                                    return false;
                                }
                                await (0,database/* executeQuery */.J)("UPDATE user SET password = ?, password_salt = ? WHERE user_key = ?", [
                                    finishPassword,
                                    salt,
                                    req.body.user_key
                                ]).then(async function(data) {
                                    if (data.affectedRows) {
                                        res.send({
                                            status: true,
                                            message: "비밀번호 변경 완료"
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
                            message: "비밀번호가 맞지 않습니다."
                        });
                    }
                } else {
                    res.send({
                        status: true,
                        data: 200
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
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [297,400], () => (__webpack_exec__(3235)));
module.exports = __webpack_exports__;

})();