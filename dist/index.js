var a = Object.defineProperty;
var l = (o, t, s) => t in o ? a(o, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : o[t] = s;
var f = (o, t, s) => (l(o, typeof t != "symbol" ? t + "" : t, s), s);
class u {
  constructor(t, s) {
    f(this, "base");
    f(this, "options");
    f(this, "defaults");
    f(this, "variants");
    f(this, "compounds");
    this.options = s, this.base = this.formatClassValues(t), this.defaults = this.flatten(s.default), this.variants = this.flatten(s.variants), this.compounds = s.compounds.map((e) => this.flatten(e));
  }
  createComposer() {
    return (t) => {
      if (typeof t > "u")
        return this.compose(this.defaults);
      const s = this.flatten(t), e = Object.assign({}, this.defaults, s);
      return this.compose(e);
    };
  }
  compose(t) {
    const s = Array.from(this.base), e = this.filterCompounds(t);
    for (const n of e)
      "class" in n && s.push(...this.formatClassValues(n.class));
    for (const [n, r] of Object.entries(t)) {
      const i = this.formatIdentifier(n, r);
      i in this.variants && r !== !1 && s.push(this.variants[i].toString());
    }
    return this.toClassString(s);
  }
  filterCompounds(t) {
    const s = this.filterIdentifier(t), e = [];
    for (const n of this.compounds)
      this.filterIdentifier(n).every((c) => s.includes(c)) && e.push(n);
    return e;
  }
  filterIdentifier(t) {
    const s = [];
    for (const [e, n] of Object.entries(t))
      e !== "class" && n !== !1 && s.push(this.formatIdentifier(e, n));
    return s;
  }
  formatIdentifier(t, s) {
    return typeof s != "boolean" ? `${t}.${s}` : t;
  }
  flatten(t, s = "", e = {}) {
    if (typeof t != "object")
      return e;
    const n = Array.isArray(t) ? t.entries() : Object.entries(t);
    for (const [r, i] of n) {
      const c = s.length > 0 ? `${s}.${r}` : r.toString();
      if (typeof i != "object") {
        e[c] = i;
        continue;
      }
      this.flatten(i, c, e);
    }
    return e;
  }
  toClassString(t) {
    return t.map((s) => s.trim()).join(" ");
  }
  formatClassValues(t) {
    return typeof t == "string" ? t.split(" ") : t;
  }
}
function d(o, t) {
  return new u(o, t).createComposer();
}
const p = d;
export {
  u as CssClassComposer,
  p as ccc,
  d as cssClassComposer
};
