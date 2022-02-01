import{d as m,r as c,c as p,a as n,b as d,Q as v,o as u,w as b,e as M,f,g as h,h as C,i as y,j as $,k as w,l as k,q as V}from"./vendor.17493baf.js";const L=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}};L();var _=(e,t)=>{const i=e.__vccOpts||e;for(const[l,o]of t)i[l]=o;return i};const A=m({props:{editMode:Boolean},setup(){return{detailNotes:c("Lorem ipsum")}}}),I={class:"card-detail"},S=n("div",{class:"divider"},null,-1),N={class:"notes"},B=n("p",{class:"notes-header"},"Notes",-1);function F(e,t,i,l,o,s){return u(),p("div",I,[S,n("div",N,[B,d(v,{modelValue:e.detailNotes,"onUpdate:modelValue":t[0]||(t[0]=a=>e.detailNotes=a),borderless:!e.editMode,readonly:e.editMode,class:"notes-content",placeholder:"Helpful notes about this position and/or company",type:"textarea",dense:""},null,8,["modelValue","borderless","readonly"])])])}var D=_(A,[["render",F]]);const z=m({components:{DetailCard:D},setup(){const e=c(!1),t=c("Company"),i=c("Position"),l=c("Accepted"),o=c(!1);return{editMode:e,companyField:t,positionField:i,statusField:l,detailMode:o,detailIcon:"fas fa-chevron-down",detailAltIcon:"fas fa-chevron-up"}},methods:{toggleDetail(){this.detailMode=!this.detailMode;const e=this.detailAltIcon;this.detailAltIcon=this.detailIcon,this.detailIcon=e}}}),O={class:"card"},Q={class:"card-basic"},j={class:"left"},q=n("div",{class:"separator"},null,-1),P={class:"right"},T=$("Accepted"),Y={key:0,class:"actions"},E={key:1,class:"actions"};function U(e,t,i,l,o,s){const a=y("DetailCard");return u(),p("div",O,[n("div",Q,[n("div",j,[d(v,{modelValue:e.companyField,"onUpdate:modelValue":t[0]||(t[0]=r=>e.companyField=r),class:"company",placeholder:"Company",autogrow:!1,borderless:!e.editMode,readonly:!e.editMode,dense:""},null,8,["modelValue","borderless","readonly"]),d(v,{modelValue:e.positionField,"onUpdate:modelValue":t[1]||(t[1]=r=>e.positionField=r),class:"position",placeholder:"Position",autogrow:!1,borderless:!e.editMode,readonly:!e.editMode,dense:""},null,8,["modelValue","borderless","readonly"])]),q,n("div",P,[d(M,{class:"status"},{default:b(()=>[T]),_:1}),e.editMode?h("",!0):(u(),p("div",Y,[d(f,{flat:"",round:"",icon:"fas fa-pen",size:"sm",onClick:t[2]||(t[2]=r=>e.editMode=!0)}),d(f,{ref:"detailToggleBtn",flat:"",round:"",icon:e.detailIcon,size:"sm",onClick:t[3]||(t[3]=r=>e.toggleDetail())},null,8,["icon"])])),e.editMode?(u(),p("div",E,[d(f,{flat:"",round:"",icon:"fas fa-trash-alt",size:"sm"}),d(f,{flat:"",round:"",icon:"fas fa-times",size:"sm",onClick:t[4]||(t[4]=r=>e.editMode=!1)}),d(f,{flat:"",round:"",icon:"fas fa-check",size:"sm"}),d(f,{ref:"detailToggleBtn",flat:"",round:"",icon:e.detailIcon,size:"sm",onClick:t[5]||(t[5]=r=>e.toggleDetail())},null,8,["icon"])])):h("",!0)])]),e.detailMode?(u(),C(a,{key:0,editMode:e.editMode},null,8,["editMode"])):h("",!0)])}var J=_(z,[["render",U]]);const G=m({components:{StandardCard:J},data(){return{newJob:c(!1)}}}),H={class:"content-wrap"},K={id:"job-list"},R=n("div",{class:"add-button"},[n("i",{class:"fas fa-plus"})],-1);function W(e,t,i,l,o,s){const a=y("StandardCard");return u(),p("div",H,[n("div",K,[d(a)]),R])}var X=_(G,[["render",W]]);const Z=m({name:"App",components:{StatusList:X},mounted(){const e=document.querySelector(".header");let t=window.scrollY;window.addEventListener("scroll",()=>{t>30&&t<window.scrollY?e.classList.add("header--hidden"):e.classList.remove("header--hidden"),t=window.scrollY})}}),x={class:"page-container"},ee=n("header",{class:"header"},"Job App Tracker",-1),te=n("footer",{class:"footer"},[n("a",{href:"https://github.com/L23de/job-app-tracker",target:"_blank"},[$("View on Github "),n("span",{class:"fab fa-github"})])],-1);function oe(e,t,i,l,o,s){const a=y("StatusList");return u(),p("div",x,[ee,d(a),te])}var se=_(Z,[["render",oe]]);const g=w(se);g.use(k,{plugins:{},iconSet:V});g.mount("#app");
