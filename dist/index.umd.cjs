(function(n,i){typeof exports=="object"&&typeof module<"u"?i(exports):typeof define=="function"&&define.amd?define(["exports"],i):(n=typeof globalThis<"u"?globalThis:n||self,i(n.ClassVariants={}))})(this,function(n){"use strict";var p=Object.defineProperty;var m=(n,i,r)=>i in n?p(n,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[i]=r;var c=(n,i,r)=>(m(n,typeof i!="symbol"?i+"":i,r),r);class i{constructor(t,e){c(this,"base");c(this,"options");c(this,"defaults");c(this,"variants");c(this,"compounds");this.options=e,this.base=this.formatClassValues(t),this.defaults=this.flatten(e.default),this.variants=this.flatten(e.variants),this.compounds=e.compounds.map(s=>this.flatten(s))}createComposer(){return t=>{if(typeof t>"u")return this.compose(this.defaults);const e=this.flatten(t),s=Object.assign({},this.defaults,e);return this.compose(s)}}compose(t){const e=Array.from(this.base),s=this.filterCompounds(t);for(const o of s)"class"in o&&e.push(...this.formatClassValues(o.class));for(const[o,a]of Object.entries(t)){const f=this.formatIdentifier(o,a);f in this.variants&&a!==!1&&e.push(this.variants[f].toString())}return this.toClassString(e)}filterCompounds(t){const e=this.filterIdentifier(t),s=[];for(const o of this.compounds)this.filterIdentifier(o).every(u=>e.includes(u))&&s.push(o);return s}filterIdentifier(t){const e=[];for(const[s,o]of Object.entries(t))s!=="class"&&o!==!1&&e.push(this.formatIdentifier(s,o));return e}formatIdentifier(t,e){return typeof e!="boolean"?`${t}.${e}`:t}flatten(t,e="",s={}){if(typeof t!="object")return s;const o=Array.isArray(t)?t.entries():Object.entries(t);for(const[a,f]of o){const u=e.length>0?`${e}.${a}`:a.toString();if(typeof f!="object"){s[u]=f;continue}this.flatten(f,u,s)}return s}toClassString(t){return t.map(e=>e.trim()).join(" ")}formatClassValues(t){return typeof t=="string"?t.split(" "):t}}function r(l,t){return new i(l,t).createComposer()}const d=r;n.ClassVariants=i,n.cc=d,n.createComposer=r,Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})});