(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[710],{1776:function(e,s,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/auth/forgotpassword",function(){return n(2458)}])},3033:function(e,s,n){"use strict";n.d(s,{Z:function(){return a}});var r=n(5893),t=n(8097),i=n.n(t);function a(e){let{shape:s}=e;return(0,r.jsx)("div",{className:i().wrap,children:(0,r.jsxs)("div",{className:i().loading,children:[(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{})]})})}},5486:function(e,s,n){"use strict";n.d(s,{Z:function(){return a}});var r=n(5893),t=n(4254),i=n.n(t);function a(e){let{props:s}=e;return(0,r.jsx)("div",{className:i().wrap,children:(0,r.jsxs)("div",{className:i().inner,children:[(0,r.jsx)("div",{className:i().message,children:null==s?void 0:s.message}),(0,r.jsxs)("div",{className:i().button_box,children:[null==s?void 0:s.confirm,null==s?void 0:s.cancel]})]})})}n(3299),n(7294),n(1664)},2458:function(e,s,n){"use strict";n.r(s),n.d(s,{default:function(){return d}});var r=n(5893),t=n(7561),i=n.n(t),a=n(7294),o=n(1163),c=n(3033),l=n(5486);function d(){(0,o.useRouter)();let[e,s]=(0,a.useState)(""),[n,t]=(0,a.useState)(!1),[d,u]=(0,a.useState)(!1),[_,m]=(0,a.useState)({isAlert:!1,message:"",confirm:(0,r.jsx)("button",{}),cancel:(0,r.jsx)("button",{})}),h=(0,a.useRef)({email:"",password:""});return(0,r.jsx)("div",{className:i().wrap,children:(0,r.jsxs)("div",{className:i().inner,children:[(0,r.jsx)("h1",{children:"JOOTONG"}),(0,r.jsx)("div",{className:i().title,children:"비밀번호를 찾고자하는 이메일을 입력해주세요."}),(0,r.jsxs)("div",{className:i().credential,children:[(0,r.jsx)("div",{className:i().email,children:(0,r.jsx)("input",{type:"text",maxLength:50,onChange:e=>{h.current.email=e.target.value},required:!0,placeholder:"ex) youremail@email.com"})}),d?(0,r.jsx)("a",{href:"/auth/signin",children:"로그인 하러 가기"}):(0,r.jsx)("button",{onClick:e=>{""===h.current.email?s("이메일을 입력해주세요."):(t(!0),s(""),fetch("/api/user?forgot=password",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(h.current.email)}).then(e=>e.json()).then(e=>{e.status?(s(e.message),u(!0),m({isAlert:!0,message:(0,r.jsx)("span",{children:e.message}),cancel:(0,r.jsx)("button",{onClick:()=>{m({isAlert:!1})},children:"확인"})})):s(e.message),t(!1)}))},children:"비밀번호 찾기"}),(0,r.jsx)("div",{className:i().error_message,children:n?(0,r.jsx)(c.Z,{shape:{width:"20px",height:"20px",border:"2px dashed #7c25df"}}):e})]}),_.isAlert&&(0,r.jsx)(l.Z,{props:{message:(0,r.jsx)("span",{children:_.message}),confirm:_.confirm,cancel:_.cancel}})]})})}},8097:function(e){e.exports={wrap:"Loading_wrap__gYMmd",loading:"Loading_loading__3R80z"}},4254:function(e){e.exports={wrap:"Alert_wrap__sjAzr",inner:"Alert_inner__yqBWk",message:"Alert_message__ODksr",button_box:"Alert_button_box__FJsUp"}},7561:function(e){e.exports={wrap:"forgotpassword_wrap__6wUho",inner:"forgotpassword_inner__KWSH7",title:"forgotpassword_title__Zsg3x",credential:"forgotpassword_credential__LnYAi",error_message:"forgotpassword_error_message__oEeZ3"}}},function(e){e.O(0,[664,685,774,888,179],function(){return e(e.s=1776)}),_N_E=e.O()}]);