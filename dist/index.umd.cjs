(function(n,o){typeof exports=="object"&&typeof module<"u"?o(exports):typeof define=="function"&&define.amd?define(["exports"],o):(n=typeof globalThis<"u"?globalThis:n||self,o(n.CssClassComposer={}))})(this,function(n){"use strict";var p=Object.defineProperty;var m=(n,o,r)=>o in n?p(n,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[o]=r;var a=(n,o,r)=>(m(n,typeof o!="symbol"?o+"":o,r),r);class o{constructor(t,s){a(this,"base");a(this,"options");a(this,"defaults");a(this,"variants");a(this,"compounds");this.options=s,this.base=this.formatClassValues(t),this.defaults=this.flatten(s.default),this.variants=this.flatten(s.variants),this.compounds=s.compounds.map(e=>this.flatten(e))}createComposer(){return t=>{if(typeof t>"u")return this.compose(this.defaults);const s=this.flatten(t),e=Object.assign({},this.defaults,s);return this.compose(e)}}compose(t){const s=Array.from(this.base),e=this.filterCompounds(t);for(const i of e)"class"in i&&s.push(...this.formatClassValues(i.class));for(const[i,c]of Object.entries(t)){const f=this.formatIdentifier(i,c);f in this.variants&&c!==!1&&s.push(this.variants[f].toString())}return this.toClassString(s)}filterCompounds(t){const s=this.filterIdentifier(t),e=[];for(const i of this.compounds)this.filterIdentifier(i).every(u=>s.includes(u))&&e.push(i);return e}filterIdentifier(t){const s=[];for(const[e,i]of Object.entries(t))e!=="class"&&i!==!1&&s.push(this.formatIdentifier(e,i));return s}formatIdentifier(t,s){return typeof s!="boolean"?`${t}.${s}`:t}flatten(t,s="",e={}){if(typeof t!="object")return e;const i=Array.isArray(t)?t.entries():Object.entries(t);for(const[c,f]of i){const u=s.length>0?`${s}.${c}`:c.toString();if(typeof f!="object"){e[u]=f;continue}this.flatten(f,u,e)}return e}toClassString(t){return t.map(s=>s.trim()).join(" ")}formatClassValues(t){return typeof t=="string"?t.split(" "):t}}function r(l,t){return new o(l,t).createComposer()}const d=r;n.CssClassComposer=o,n.ccc=d,n.cssClassComposer=r,Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})});
