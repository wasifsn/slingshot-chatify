(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{1:function(t,e){},"276a":function(t,e,s){"use strict";var a=s("8055"),n=s.n(a),o=n()("http://localhost:3000");e["a"]=o},"2e13":function(t,e,s){"use strict";s.r(e);var a,n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-layout",{attrs:{view:"lHh Lpr lFf"}},[s("q-header",{attrs:{elevated:""}},[s("q-toolbar",[s("q-btn",{attrs:{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu"},on:{click:function(e){t.leftDrawerOpen=!t.leftDrawerOpen}}}),s("q-toolbar-title",[s("span",[s("router-link",{staticClass:"mainTitle",attrs:{to:"/"}},[t._v("Chatify")])],1)]),s("div",[t._v("Chatify v 1.0.0")])],1),s("q-tabs",{attrs:{align:"left"}},[s("q-route-tab",{attrs:{to:{path:"/",params:{userId:123}},label:"User Login"}}),s("q-route-tab",{attrs:{to:"/chat",label:"Chat Page"}})],1)],1),s("q-drawer",{attrs:{dark:"","show-if-above":"",bordered:"",elevated:"","content-class":"bg-grey-2"},model:{value:t.leftDrawerOpen,callback:function(e){t.leftDrawerOpen=e},expression:"leftDrawerOpen"}},[s("q-list",{attrs:{bordered:"",padding:""}},[s("q-item-label",{attrs:{header:""}},[t._v("Chat Room Data")]),t._l(t.rooms,(function(e,a){return s("q-item",{key:a,attrs:{clickable:"",tag:"div"}},[s("q-item-section",{attrs:{avatar:""}},[s("q-icon",{attrs:{name:"chat"}})],1),s("q-item-section",[s("q-item-label",{},[t._v("Users in Chat Room: "+t._s(e))]),t._l(t.roomData,(function(e,a){return s("q-item-label",{key:a,attrs:{caption:""}},[t._v(t._s(e.name))])}))],2)],1)}))],2)],1),s("q-page-container",[s("q-page",{staticClass:"flex flex-center"},[s("div",{staticClass:"container"},[s("q-btn",{attrs:{color:"amber",glossy:"","text-color":"black",push:"",label:"Second"},on:{click:t.increment}}),s("div",[t._v(t._s(t.count))]),s("div",{staticClass:"q-pa-md"},[s("q-card",{staticClass:"my-card"},[s("q-parallax",{attrs:{src:"https://cdn.quasar.dev/img/parallax1.jpg",height:150}}),s("q-card-section",[s("div",{staticClass:"text-h6"},[t._v("Slingshot Inc.")]),s("div",{staticClass:"text-subtitle2"},[t._v(t._s(t.welcome_msg))])])],1)],1),t.joinee_msg?s("div",{staticClass:"joinee_disconnect"},[t._v(t._s(t.joinee_msg))]):t._e(),t.disconnectionMsg?s("div",{staticClass:"joinee_disconnect"},[t._v(t._s(t.disconnectionMsg))]):t._e(),s("div",{staticClass:"messagelist"},[s("div",{staticClass:"q-pa-md row justify-center"},[s("div",{staticStyle:{width:"100%","max-width":"400px"}},[s("q-chat-message",{attrs:{label:t.todyDate}}),t.locationMsgArr.length>0?s("div",t._l(t.locationMsgArr,(function(e){return s("div",{key:t.locationMsgArr[e.text]},[e.text.toString().includes("https://google.com/maps")?s("span",[s("a",{attrs:{target:"_blank",href:e.text}},[t._v("This is my Location")]),t._v("\n                    - "+t._s(t.messageReceivedTime(e))+"\n                  ")]):s("div",[t._v(t._s(e.text)+" - "+t._s(t.messageReceivedTime(e)))])])})),0):t._e(),s("q-chat-message",{attrs:{name:"Jane",avatar:"https://cdn.quasar.dev/img/avatar3.jpg",text:["doing fine, how r you?"],stamp:"4 minutes ago"}})],1)])]),s("form",{on:{submit:function(e){return e.preventDefault(),t.send_msg(e)}}},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"exampleInputEmail1"}},[t._v("Please type in your Instant Message")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.msg_text,expression:"msg_text"}],staticClass:"form-control main_ipt_box",attrs:{type:"text",id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"Enter Message"},domProps:{value:t.msg_text},on:{input:function(e){e.target.composing||(t.msg_text=e.target.value)}}})]),s("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Submit")])]),s("q-btn",{attrs:{color:"amber",glossy:"","text-color":"black",push:"",label:"Location"},on:{click:t.send_location}})],1),s("router-view")],1)],1)],1)},o=[],c=s("c47a"),r=s.n(c),i=(s("8055"),s("683f"),s("c1df")),l=s.n(i),d=s("276a"),f=(a={name:"MyLayout",data:function(){return{rooms:[],roomData:[],moment:l.a,locationMsgArr:[],locationMsg:"",LocationUser:{},disconnectionMsg:null,joinee_msg:null,messageList:[],msg_text:"",welcome_msg:null,socket:d["a"],count:0,leftDrawerOpen:!1}},computed:{},methods:{messageReceivedTime:function(t){return l()(t.createdAt).startOf().fromNow()},send_location:function(){var t=this;if(!navigator.geolocation)return alert("Your browser does not support Location Support");navigator.geolocation.getCurrentPosition((function(e){var s=e.coords,a=s.longitude,n=s.latitude,o={longitude:a,latitude:n};t.socket.emit("sendLocation","https://google.com/maps?q=".concat(o.latitude,",").concat(o.longitude),(function(e){e?(t.locationMsg=e,t.locationMsgArr.push(e)):alert("Something went wrong the Location is not Sent!")}))}))},send_msg:function(t){var e=this;console.log(t.target),e.socket.emit("new_msg",this.msg_text,(function(t){t?alert("The Message was not sent"):console.log("message is delivered successfully")})),e.msg_text=""},increment:function(){this.socket.emit("increment"),console.log(this.count)}},mounted:function(){},created:function(){var t=this;this.socket.on("countUpdated",(function(e){t.count=e})),this.socket.on("welcome_msg",(function(e){console.log(e),t.welcome_msg=e.text;e.createdAt})),this.socket.on("broadcast_msg",(function(e){t.locationMsgArr.push(e)})),this.socket.on("new_joinee",(function(e){t.joinee_msg=e.text})),this.socket.on("disconnectMessage",(function(e){t.disconnectionMsg=e.text})),this.socket.on("LocationUser",(function(e){t.LocationUser=e,console.log(t.LocationUser)})),this.socket.on("roomData",(function(e){var s=e.room,a=e.roomData;t.rooms.push(s),t.roomData=a,console.log(t.rooms,t.roomData)}))}},r()(a,"mounted",(function(){})),r()(a,"computed",{todyDate:function(){var t=new Date,e=t.toDateString();return e}}),a),m=f,b=(s("fd07"),s("2877")),u=s("eebe"),j=s.n(u),g=s("4d5a"),h=s("e359"),p=s("65c6"),v=s("9c40"),_=s("429b"),k=s("7867"),y=s("6ac5"),w=s("9404"),x=s("1c1c"),q=s("0170"),C=s("66e5"),z=s("4074"),D=s("0016"),M=s("09e3"),Q=s("9989"),L=s("f09f"),S=s("639d"),O=s("a370"),T=s("8169"),I=Object(b["a"])(m,n,o,!1,null,null,null);e["default"]=I.exports;j()(I,"components",{QLayout:g["a"],QHeader:h["a"],QToolbar:p["a"],QBtn:v["a"],QTabs:_["a"],QRouteTab:k["a"],QToolbarTitle:y["a"],QDrawer:w["a"],QList:x["a"],QItemLabel:q["a"],QItem:C["a"],QItemSection:z["a"],QIcon:D["a"],QPageContainer:M["a"],QPage:Q["a"],QCard:L["a"],QParallax:S["a"],QCardSection:O["a"],QChatMessage:T["a"]})},4678:function(t,e,s){var a={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-SG":"cdab","./en-SG.js":"cdab","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"73332","./en-il.js":"73332","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(t){var e=o(t);return s(e)}function o(t){if(!s.o(a,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return a[t]}n.keys=function(){return Object.keys(a)},n.resolve=o,t.exports=n,n.id="4678"},5358:function(t,e,s){},fd07:function(t,e,s){"use strict";var a=s("5358"),n=s.n(a);n.a}}]);