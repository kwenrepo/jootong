(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[603],{2774:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/search",function(){return s(5628)}])},723:function(e,t,s){"use strict";s.d(t,{Z:function(){return _}});var n=s(5893),r=s(111),a=s.n(r),c=s(1664),i=s.n(c);function _(){return(0,n.jsx)("footer",{className:a().footer,children:(0,n.jsx)("div",{className:a().inner,children:(0,n.jsxs)("ul",{children:[(0,n.jsx)("li",{children:"JOOTONG"}),(0,n.jsx)("li",{children:(0,n.jsx)(i(),{href:"/support",children:"Support"})})]})})})}},3412:function(e,t,s){"use strict";s.d(t,{Z:function(){return o}});var n=s(5893),r=s(3961),a=s.n(r),c=s(9008),i=s.n(c),_=s(9598),l=s(723);function o(e){let{children:t,title:s,footer:r}=e;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(i(),{children:[(0,n.jsx)("title",{children:s||"JOOTONG-주간통계"}),(0,n.jsx)("meta",{name:"description",content:"재미로 보는 통계, 주간 통계, 통계, 날씨, 엔터"}),(0,n.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"}),(0,n.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,n.jsxs)("div",{id:a().root,children:[(0,n.jsx)(_.Z,{}),(0,n.jsx)("div",{className:a().container,children:t}),(0,n.jsx)(l.Z,{})]})]})}},5628:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return m}});var n=s(5893),r=s(8958),a=s.n(r),c=s(7294),i=s(5486),_=s(3412),l=s(1163),o=s(1664),h=s.n(o),d=s(2932);function m(){(0,l.useRouter)();let[e,t]=(0,c.useState)(""),[s,r]=(0,c.useState)(e),[o,m]=(0,c.useState)([]),[u,x]=(0,c.useState)({isAlert:!1,message:"",confirm:(0,n.jsx)("button",{}),cancel:(0,n.jsx)("button",{})});return(0,c.useEffect)(()=>{let e=setTimeout(()=>t(s),300);return()=>clearTimeout(e)},[s]),(0,c.useEffect)(()=>{fetch("/api/search?keyword=".concat(e),{method:"GET",headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>{if(e.status){let{data:t}=e;console.log(t),t.length?m(t.map(e=>(console.log(e),e.summaryOfContent=Object.values(JSON.parse(e.content))[0],e))):m([])}})},[e]),(0,n.jsxs)(_.Z,{children:[(0,n.jsxs)("div",{className:a().wrap,children:[(0,n.jsxs)("div",{className:a().get_search_key,children:[(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 50 50",children:(0,n.jsx)("path",{d:"M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"})}),(0,n.jsx)("input",{type:"text",placeholder:"검색어를 입력해 주세요.",value:s,onChange:e=>{r(e.target.value)}})]}),e&&0===o.length&&(0,n.jsxs)("div",{className:a().search_result,children:[e," 관련 검색 내용이 없습니다."]}),o.length>0&&(0,n.jsxs)("div",{className:a().search_result,children:[(0,n.jsxs)("span",{className:a().result_lenght,children:[e," 관련 ",(0,n.jsxs)("b",{children:[o.length,"개"]}),"의 결과를 찾았습니다."]}),(0,n.jsx)("ul",{className:a().item_list_grid,children:o.map(e=>(0,n.jsx)("li",{children:(0,n.jsxs)(h(),{href:"/".concat(e.id,"@").concat(e.title),children:[(0,n.jsx)("div",{className:a().item_header,children:(0,n.jsx)("span",{className:a().item_title,children:e.title})}),(0,n.jsxs)("div",{className:a().item_body,children:[(0,n.jsx)("div",{className:a().cap,children:"요약달력"}),(0,n.jsx)("div",{className:a().summary_calendar,children:(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{className:a().day_number,children:[e.summaryOfContent.year,"."," ",e.summaryOfContent.month+1,"."," ",e.summaryOfContent.date]}),(0,n.jsx)("div",{className:a().history_item,children:(0,n.jsxs)("div",{className:a().text,children:[(0,n.jsx)("span",{children:e.summaryOfContent.description?e.summaryOfContent.description:e.summaryOfContent.key}),(0,n.jsx)("span",{children:e.summaryOfContent.value.toLocaleString("ko-KR")})]})})]})})]}),(0,n.jsx)("div",{className:a().item_bottom,children:(0,n.jsx)("span",{className:"day"!==(0,d.getDateDiff)(e.create_date).type?"".concat(a().from_date," ").concat(a().new):"".concat(a().from_date),children:(0,d.getDateDiff)(e.create_date).text})})]})},e.create_date))})]})]}),u.isAlert&&(0,n.jsx)(i.Z,{props:{message:(0,n.jsx)("span",{children:u.message}),confirm:u.confirm,cancel:u.cancel}})]})}s(3033)},111:function(e){e.exports={footer:"Footer_footer__BcpJO",inner:"Footer_inner__3q9Lf"}},3961:function(e){e.exports={root:"Layout_root__hfcc3",container:"Layout_container__d2hr0"}},8958:function(e){e.exports={wrap:"search_wrap__X6ZsL",get_search_key:"search_get_search_key__8vcdf",search_result:"search_search_result____vTF",result_lenght:"search_result_lenght__6pCIx",item_list_grid:"search_item_list_grid__S_yAa",item_header:"search_item_header__6WOQ_",item_title:"search_item_title__gIX2H",item_body:"search_item_body__L2N52",cap:"search_cap__x2BbN",summary_calendar:"search_summary_calendar__ZpgJP",day_number:"search_day_number__jhVQ7",history_item:"search_history_item__orRn2",text:"search_text__Ty5J7",item_bottom:"search_item_bottom__zhcyl",from_date:"search_from_date__ffSHh",new:"search_new__sp7Nv"}},9008:function(e,t,s){e.exports=s(3121)}},function(e){e.O(0,[664,685,598,774,888,179],function(){return e(e.s=2774)}),_N_E=e.O()}]);