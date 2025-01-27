"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/dayjs/plugin/quarterOfYear.js
var require_quarterOfYear = __commonJS({
  "node_modules/dayjs/plugin/quarterOfYear.js"(exports2, module2) {
    !function(t, n) {
      "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = n() : "function" == typeof define && define.amd ? define(n) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_quarterOfYear = n();
    }(exports2, function() {
      "use strict";
      var t = "month", n = "quarter";
      return function(e, i) {
        var r = i.prototype;
        r.quarter = function(t2) {
          return this.$utils().u(t2) ? Math.ceil((this.month() + 1) / 3) : this.month(this.month() % 3 + 3 * (t2 - 1));
        };
        var s = r.add;
        r.add = function(e2, i2) {
          return e2 = Number(e2), this.$utils().p(i2) === n ? this.add(3 * e2, t) : s.bind(this)(e2, i2);
        };
        var u = r.startOf;
        r.startOf = function(e2, i2) {
          var r2 = this.$utils(), s2 = !!r2.u(i2) || i2;
          if (r2.p(e2) === n) {
            var o = this.quarter() - 1;
            return s2 ? this.month(3 * o).startOf(t).startOf("day") : this.month(3 * o + 2).endOf(t).endOf("day");
          }
          return u.bind(this)(e2, i2);
        };
      };
    });
  }
});

// node_modules/dayjs/dayjs.min.js
var require_dayjs_min = __commonJS({
  "node_modules/dayjs/dayjs.min.js"(exports2, module2) {
    !function(t, e) {
      "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
    }(exports2, function() {
      "use strict";
      var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
        var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
        return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
      } }, m = function(t2, e2, n2) {
        var r2 = String(t2);
        return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
      }, v = { s: m, z: function(t2) {
        var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
        return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
      }, m: function t2(e2, n2) {
        if (e2.date() < n2.date()) return -t2(n2, e2);
        var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
        return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
      }, a: function(t2) {
        return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
      }, p: function(t2) {
        return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t2) {
        return void 0 === t2;
      } }, g = "en", D = {};
      D[g] = M;
      var p = "$isDayjsObject", S = function(t2) {
        return t2 instanceof _ || !(!t2 || !t2[p]);
      }, w = function t2(e2, n2, r2) {
        var i2;
        if (!e2) return g;
        if ("string" == typeof e2) {
          var s2 = e2.toLowerCase();
          D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
          var u2 = e2.split("-");
          if (!i2 && u2.length > 1) return t2(u2[0]);
        } else {
          var a2 = e2.name;
          D[a2] = e2, i2 = a2;
        }
        return !r2 && i2 && (g = i2), i2 || !r2 && g;
      }, O = function(t2, e2) {
        if (S(t2)) return t2.clone();
        var n2 = "object" == typeof e2 ? e2 : {};
        return n2.date = t2, n2.args = arguments, new _(n2);
      }, b = v;
      b.l = w, b.i = S, b.w = function(t2, e2) {
        return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
      };
      var _ = function() {
        function M2(t2) {
          this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
        }
        var m2 = M2.prototype;
        return m2.parse = function(t2) {
          this.$d = function(t3) {
            var e2 = t3.date, n2 = t3.utc;
            if (null === e2) return /* @__PURE__ */ new Date(NaN);
            if (b.u(e2)) return /* @__PURE__ */ new Date();
            if (e2 instanceof Date) return new Date(e2);
            if ("string" == typeof e2 && !/Z$/i.test(e2)) {
              var r2 = e2.match($);
              if (r2) {
                var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
              }
            }
            return new Date(e2);
          }(t2), this.init();
        }, m2.init = function() {
          var t2 = this.$d;
          this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
        }, m2.$utils = function() {
          return b;
        }, m2.isValid = function() {
          return !(this.$d.toString() === l);
        }, m2.isSame = function(t2, e2) {
          var n2 = O(t2);
          return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
        }, m2.isAfter = function(t2, e2) {
          return O(t2) < this.startOf(e2);
        }, m2.isBefore = function(t2, e2) {
          return this.endOf(e2) < O(t2);
        }, m2.$g = function(t2, e2, n2) {
          return b.u(t2) ? this[e2] : this.set(n2, t2);
        }, m2.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m2.valueOf = function() {
          return this.$d.getTime();
        }, m2.startOf = function(t2, e2) {
          var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {
            var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
            return r2 ? i2 : i2.endOf(a);
          }, $2 = function(t3, e3) {
            return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
          }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
          switch (f2) {
            case h:
              return r2 ? l2(1, 0) : l2(31, 11);
            case c:
              return r2 ? l2(1, M3) : l2(0, M3 + 1);
            case o:
              var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
              return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
            case a:
            case d:
              return $2(v2 + "Hours", 0);
            case u:
              return $2(v2 + "Minutes", 1);
            case s:
              return $2(v2 + "Seconds", 2);
            case i:
              return $2(v2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m2.endOf = function(t2) {
          return this.startOf(t2, false);
        }, m2.$set = function(t2, e2) {
          var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
          if (o2 === c || o2 === h) {
            var y2 = this.clone().set(d, 1);
            y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
          } else l2 && this.$d[l2]($2);
          return this.init(), this;
        }, m2.set = function(t2, e2) {
          return this.clone().$set(t2, e2);
        }, m2.get = function(t2) {
          return this[b.p(t2)]();
        }, m2.add = function(r2, f2) {
          var d2, l2 = this;
          r2 = Number(r2);
          var $2 = b.p(f2), y2 = function(t2) {
            var e2 = O(l2);
            return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
          };
          if ($2 === c) return this.set(c, this.$M + r2);
          if ($2 === h) return this.set(h, this.$y + r2);
          if ($2 === a) return y2(1);
          if ($2 === o) return y2(7);
          var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
          return b.w(m3, this);
        }, m2.subtract = function(t2, e2) {
          return this.add(-1 * t2, e2);
        }, m2.format = function(t2) {
          var e2 = this, n2 = this.$locale();
          if (!this.isValid()) return n2.invalidDate || l;
          var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {
            return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
          }, d2 = function(t3) {
            return b.s(s2 % 12 || 12, t3, "0");
          }, $2 = f2 || function(t3, e3, n3) {
            var r3 = t3 < 12 ? "AM" : "PM";
            return n3 ? r3.toLowerCase() : r3;
          };
          return r2.replace(y, function(t3, r3) {
            return r3 || function(t4) {
              switch (t4) {
                case "YY":
                  return String(e2.$y).slice(-2);
                case "YYYY":
                  return b.s(e2.$y, 4, "0");
                case "M":
                  return a2 + 1;
                case "MM":
                  return b.s(a2 + 1, 2, "0");
                case "MMM":
                  return h2(n2.monthsShort, a2, c2, 3);
                case "MMMM":
                  return h2(c2, a2);
                case "D":
                  return e2.$D;
                case "DD":
                  return b.s(e2.$D, 2, "0");
                case "d":
                  return String(e2.$W);
                case "dd":
                  return h2(n2.weekdaysMin, e2.$W, o2, 2);
                case "ddd":
                  return h2(n2.weekdaysShort, e2.$W, o2, 3);
                case "dddd":
                  return o2[e2.$W];
                case "H":
                  return String(s2);
                case "HH":
                  return b.s(s2, 2, "0");
                case "h":
                  return d2(1);
                case "hh":
                  return d2(2);
                case "a":
                  return $2(s2, u2, true);
                case "A":
                  return $2(s2, u2, false);
                case "m":
                  return String(u2);
                case "mm":
                  return b.s(u2, 2, "0");
                case "s":
                  return String(e2.$s);
                case "ss":
                  return b.s(e2.$s, 2, "0");
                case "SSS":
                  return b.s(e2.$ms, 3, "0");
                case "Z":
                  return i2;
              }
              return null;
            }(t3) || i2.replace(":", "");
          });
        }, m2.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m2.diff = function(r2, d2, l2) {
          var $2, y2 = this, M3 = b.p(d2), m3 = O(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
            return b.m(y2, m3);
          };
          switch (M3) {
            case h:
              $2 = D2() / 12;
              break;
            case c:
              $2 = D2();
              break;
            case f:
              $2 = D2() / 3;
              break;
            case o:
              $2 = (g2 - v2) / 6048e5;
              break;
            case a:
              $2 = (g2 - v2) / 864e5;
              break;
            case u:
              $2 = g2 / n;
              break;
            case s:
              $2 = g2 / e;
              break;
            case i:
              $2 = g2 / t;
              break;
            default:
              $2 = g2;
          }
          return l2 ? $2 : b.a($2);
        }, m2.daysInMonth = function() {
          return this.endOf(c).$D;
        }, m2.$locale = function() {
          return D[this.$L];
        }, m2.locale = function(t2, e2) {
          if (!t2) return this.$L;
          var n2 = this.clone(), r2 = w(t2, e2, true);
          return r2 && (n2.$L = r2), n2;
        }, m2.clone = function() {
          return b.w(this.$d, this);
        }, m2.toDate = function() {
          return new Date(this.valueOf());
        }, m2.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m2.toISOString = function() {
          return this.$d.toISOString();
        }, m2.toString = function() {
          return this.$d.toUTCString();
        }, M2;
      }(), k = _.prototype;
      return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function(t2) {
        k[t2[1]] = function(e2) {
          return this.$g(e2, t2[0], t2[1]);
        };
      }), O.extend = function(t2, e2) {
        return t2.$i || (t2(e2, _, O), t2.$i = true), O;
      }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
        return O(1e3 * t2);
      }, O.en = D[g], O.Ls = D, O.p = {}, O;
    });
  }
});

// node_modules/dayjs/plugin/advancedFormat.js
var require_advancedFormat = __commonJS({
  "node_modules/dayjs/plugin/advancedFormat.js"(exports2, module2) {
    !function(e, t) {
      "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_advancedFormat = t();
    }(exports2, function() {
      "use strict";
      return function(e, t) {
        var r = t.prototype, n = r.format;
        r.format = function(e2) {
          var t2 = this, r2 = this.$locale();
          if (!this.isValid()) return n.bind(this)(e2);
          var s = this.$utils(), a = (e2 || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(e3) {
            switch (e3) {
              case "Q":
                return Math.ceil((t2.$M + 1) / 3);
              case "Do":
                return r2.ordinal(t2.$D);
              case "gggg":
                return t2.weekYear();
              case "GGGG":
                return t2.isoWeekYear();
              case "wo":
                return r2.ordinal(t2.week(), "W");
              case "w":
              case "ww":
                return s.s(t2.week(), "w" === e3 ? 1 : 2, "0");
              case "W":
              case "WW":
                return s.s(t2.isoWeek(), "W" === e3 ? 1 : 2, "0");
              case "k":
              case "kk":
                return s.s(String(0 === t2.$H ? 24 : t2.$H), "k" === e3 ? 1 : 2, "0");
              case "X":
                return Math.floor(t2.$d.getTime() / 1e3);
              case "x":
                return t2.$d.getTime();
              case "z":
                return "[" + t2.offsetName() + "]";
              case "zzz":
                return "[" + t2.offsetName("long") + "]";
              default:
                return e3;
            }
          });
          return n.bind(this)(a);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/weekOfYear.js
var require_weekOfYear = __commonJS({
  "node_modules/dayjs/plugin/weekOfYear.js"(exports2, module2) {
    !function(e, t) {
      "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_weekOfYear = t();
    }(exports2, function() {
      "use strict";
      var e = "week", t = "year";
      return function(i, n, r) {
        var f = n.prototype;
        f.week = function(i2) {
          if (void 0 === i2 && (i2 = null), null !== i2) return this.add(7 * (i2 - this.week()), "day");
          var n2 = this.$locale().yearStart || 1;
          if (11 === this.month() && this.date() > 25) {
            var f2 = r(this).startOf(t).add(1, t).date(n2), s = r(this).endOf(e);
            if (f2.isBefore(s)) return 1;
          }
          var a = r(this).startOf(t).date(n2).startOf(e).subtract(1, "millisecond"), o = this.diff(a, e, true);
          return o < 0 ? r(this).startOf("week").week() : Math.ceil(o);
        }, f.weeks = function(e2) {
          return void 0 === e2 && (e2 = null), this.week(e2);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/utc.js
var require_utc = __commonJS({
  "node_modules/dayjs/plugin/utc.js"(exports2, module2) {
    !function(t, i) {
      "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = i() : "function" == typeof define && define.amd ? define(i) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_utc = i();
    }(exports2, function() {
      "use strict";
      var t = "minute", i = /[+-]\d\d(?::?\d\d)?/g, e = /([+-]|\d\d)/g;
      return function(s, f, n) {
        var u = f.prototype;
        n.utc = function(t2) {
          var i2 = { date: t2, utc: true, args: arguments };
          return new f(i2);
        }, u.utc = function(i2) {
          var e2 = n(this.toDate(), { locale: this.$L, utc: true });
          return i2 ? e2.add(this.utcOffset(), t) : e2;
        }, u.local = function() {
          return n(this.toDate(), { locale: this.$L, utc: false });
        };
        var o = u.parse;
        u.parse = function(t2) {
          t2.utc && (this.$u = true), this.$utils().u(t2.$offset) || (this.$offset = t2.$offset), o.call(this, t2);
        };
        var r = u.init;
        u.init = function() {
          if (this.$u) {
            var t2 = this.$d;
            this.$y = t2.getUTCFullYear(), this.$M = t2.getUTCMonth(), this.$D = t2.getUTCDate(), this.$W = t2.getUTCDay(), this.$H = t2.getUTCHours(), this.$m = t2.getUTCMinutes(), this.$s = t2.getUTCSeconds(), this.$ms = t2.getUTCMilliseconds();
          } else r.call(this);
        };
        var a = u.utcOffset;
        u.utcOffset = function(s2, f2) {
          var n2 = this.$utils().u;
          if (n2(s2)) return this.$u ? 0 : n2(this.$offset) ? a.call(this) : this.$offset;
          if ("string" == typeof s2 && (s2 = function(t2) {
            void 0 === t2 && (t2 = "");
            var s3 = t2.match(i);
            if (!s3) return null;
            var f3 = ("" + s3[0]).match(e) || ["-", 0, 0], n3 = f3[0], u3 = 60 * +f3[1] + +f3[2];
            return 0 === u3 ? 0 : "+" === n3 ? u3 : -u3;
          }(s2), null === s2)) return this;
          var u2 = Math.abs(s2) <= 16 ? 60 * s2 : s2, o2 = this;
          if (f2) return o2.$offset = u2, o2.$u = 0 === s2, o2;
          if (0 !== s2) {
            var r2 = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
            (o2 = this.local().add(u2 + r2, t)).$offset = u2, o2.$x.$localOffset = r2;
          } else o2 = this.utc();
          return o2;
        };
        var h = u.format;
        u.format = function(t2) {
          var i2 = t2 || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
          return h.call(this, i2);
        }, u.valueOf = function() {
          var t2 = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
          return this.$d.valueOf() - 6e4 * t2;
        }, u.isUTC = function() {
          return !!this.$u;
        }, u.toISOString = function() {
          return this.toDate().toISOString();
        }, u.toString = function() {
          return this.toDate().toUTCString();
        };
        var l = u.toDate;
        u.toDate = function(t2) {
          return "s" === t2 && this.$offset ? n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : l.call(this);
        };
        var c = u.diff;
        u.diff = function(t2, i2, e2) {
          if (t2 && this.$u === t2.$u) return c.call(this, t2, i2, e2);
          var s2 = this.local(), f2 = n(t2).local();
          return c.call(s2, f2, i2, e2);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/timezone.js
var require_timezone = __commonJS({
  "node_modules/dayjs/plugin/timezone.js"(exports2, module2) {
    !function(t, e) {
      "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_timezone = e();
    }(exports2, function() {
      "use strict";
      var t = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, e = {};
      return function(n, i, o) {
        var r, a = function(t2, n2, i2) {
          void 0 === i2 && (i2 = {});
          var o2 = new Date(t2), r2 = function(t3, n3) {
            void 0 === n3 && (n3 = {});
            var i3 = n3.timeZoneName || "short", o3 = t3 + "|" + i3, r3 = e[o3];
            return r3 || (r3 = new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: t3, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: i3 }), e[o3] = r3), r3;
          }(n2, i2);
          return r2.formatToParts(o2);
        }, u = function(e2, n2) {
          for (var i2 = a(e2, n2), r2 = [], u2 = 0; u2 < i2.length; u2 += 1) {
            var f2 = i2[u2], s2 = f2.type, m = f2.value, c = t[s2];
            c >= 0 && (r2[c] = parseInt(m, 10));
          }
          var d = r2[3], l = 24 === d ? 0 : d, h = r2[0] + "-" + r2[1] + "-" + r2[2] + " " + l + ":" + r2[4] + ":" + r2[5] + ":000", v = +e2;
          return (o.utc(h).valueOf() - (v -= v % 1e3)) / 6e4;
        }, f = i.prototype;
        f.tz = function(t2, e2) {
          void 0 === t2 && (t2 = r);
          var n2, i2 = this.utcOffset(), a2 = this.toDate(), u2 = a2.toLocaleString("en-US", { timeZone: t2 }), f2 = Math.round((a2 - new Date(u2)) / 1e3 / 60), s2 = 15 * -Math.round(a2.getTimezoneOffset() / 15) - f2;
          if (!Number(s2)) n2 = this.utcOffset(0, e2);
          else if (n2 = o(u2, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(s2, true), e2) {
            var m = n2.utcOffset();
            n2 = n2.add(i2 - m, "minute");
          }
          return n2.$x.$timezone = t2, n2;
        }, f.offsetName = function(t2) {
          var e2 = this.$x.$timezone || o.tz.guess(), n2 = a(this.valueOf(), e2, { timeZoneName: t2 }).find(function(t3) {
            return "timezonename" === t3.type.toLowerCase();
          });
          return n2 && n2.value;
        };
        var s = f.startOf;
        f.startOf = function(t2, e2) {
          if (!this.$x || !this.$x.$timezone) return s.call(this, t2, e2);
          var n2 = o(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
          return s.call(n2, t2, e2).tz(this.$x.$timezone, true);
        }, o.tz = function(t2, e2, n2) {
          var i2 = n2 && e2, a2 = n2 || e2 || r, f2 = u(+o(), a2);
          if ("string" != typeof t2) return o(t2).tz(a2);
          var s2 = function(t3, e3, n3) {
            var i3 = t3 - 60 * e3 * 1e3, o2 = u(i3, n3);
            if (e3 === o2) return [i3, e3];
            var r2 = u(i3 -= 60 * (o2 - e3) * 1e3, n3);
            return o2 === r2 ? [i3, o2] : [t3 - 60 * Math.min(o2, r2) * 1e3, Math.max(o2, r2)];
          }(o.utc(t2, i2).valueOf(), f2, a2), m = s2[0], c = s2[1], d = o(m).utcOffset(c);
          return d.$x.$timezone = a2, d;
        }, o.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, o.tz.setDefault = function(t2) {
          r = t2;
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/relativeTime.js
var require_relativeTime = __commonJS({
  "node_modules/dayjs/plugin/relativeTime.js"(exports2, module2) {
    !function(r, e) {
      "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = e() : "function" == typeof define && define.amd ? define(e) : (r = "undefined" != typeof globalThis ? globalThis : r || self).dayjs_plugin_relativeTime = e();
    }(exports2, function() {
      "use strict";
      return function(r, e, t) {
        r = r || {};
        var n = e.prototype, o = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
        function i(r2, e2, t2, o2) {
          return n.fromToBase(r2, e2, t2, o2);
        }
        t.en.relativeTime = o, n.fromToBase = function(e2, n2, i2, d2, u) {
          for (var f, a, s, l = i2.$locale().relativeTime || o, h = r.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], m = h.length, c = 0; c < m; c += 1) {
            var y = h[c];
            y.d && (f = d2 ? t(e2).diff(i2, y.d, true) : i2.diff(e2, y.d, true));
            var p = (r.rounding || Math.round)(Math.abs(f));
            if (s = f > 0, p <= y.r || !y.r) {
              p <= 1 && c > 0 && (y = h[c - 1]);
              var v = l[y.l];
              u && (p = u("" + p)), a = "string" == typeof v ? v.replace("%d", p) : v(p, n2, y.l, s);
              break;
            }
          }
          if (n2) return a;
          var M = s ? l.future : l.past;
          return "function" == typeof M ? M(a) : M.replace("%s", a);
        }, n.to = function(r2, e2) {
          return i(r2, e2, this, true);
        }, n.from = function(r2, e2) {
          return i(r2, e2, this);
        };
        var d = function(r2) {
          return r2.$u ? t.utc() : t();
        };
        n.toNow = function(r2) {
          return this.to(d(this), r2);
        }, n.fromNow = function(r2) {
          return this.from(d(this), r2);
        };
      };
    });
  }
});

// src/date-time.tsx
var date_time_exports = {};
__export(date_time_exports, {
  default: () => date_time_default
});
module.exports = __toCommonJS(date_time_exports);
var import_react = require("react");
var import_api = require("@raycast/api");

// node_modules/chrono-node/dist/esm/results.js
var import_quarterOfYear = __toESM(require_quarterOfYear(), 1);
var import_dayjs2 = __toESM(require_dayjs_min(), 1);

// node_modules/chrono-node/dist/esm/types.js
var Meridiem;
(function(Meridiem2) {
  Meridiem2[Meridiem2["AM"] = 0] = "AM";
  Meridiem2[Meridiem2["PM"] = 1] = "PM";
})(Meridiem || (Meridiem = {}));
var Weekday;
(function(Weekday2) {
  Weekday2[Weekday2["SUNDAY"] = 0] = "SUNDAY";
  Weekday2[Weekday2["MONDAY"] = 1] = "MONDAY";
  Weekday2[Weekday2["TUESDAY"] = 2] = "TUESDAY";
  Weekday2[Weekday2["WEDNESDAY"] = 3] = "WEDNESDAY";
  Weekday2[Weekday2["THURSDAY"] = 4] = "THURSDAY";
  Weekday2[Weekday2["FRIDAY"] = 5] = "FRIDAY";
  Weekday2[Weekday2["SATURDAY"] = 6] = "SATURDAY";
})(Weekday || (Weekday = {}));
var Month;
(function(Month2) {
  Month2[Month2["JANUARY"] = 1] = "JANUARY";
  Month2[Month2["FEBRUARY"] = 2] = "FEBRUARY";
  Month2[Month2["MARCH"] = 3] = "MARCH";
  Month2[Month2["APRIL"] = 4] = "APRIL";
  Month2[Month2["MAY"] = 5] = "MAY";
  Month2[Month2["JUNE"] = 6] = "JUNE";
  Month2[Month2["JULY"] = 7] = "JULY";
  Month2[Month2["AUGUST"] = 8] = "AUGUST";
  Month2[Month2["SEPTEMBER"] = 9] = "SEPTEMBER";
  Month2[Month2["OCTOBER"] = 10] = "OCTOBER";
  Month2[Month2["NOVEMBER"] = 11] = "NOVEMBER";
  Month2[Month2["DECEMBER"] = 12] = "DECEMBER";
})(Month || (Month = {}));

// node_modules/chrono-node/dist/esm/utils/dayjs.js
function implyTheNextDay(component, targetDayJs) {
  targetDayJs = targetDayJs.add(1, "day");
  implySimilarDate(component, targetDayJs);
  implySimilarTime(component, targetDayJs);
}
function assignSimilarDate(component, targetDayJs) {
  component.assign("day", targetDayJs.date());
  component.assign("month", targetDayJs.month() + 1);
  component.assign("year", targetDayJs.year());
}
function assignSimilarTime(component, targetDayJs) {
  component.assign("hour", targetDayJs.hour());
  component.assign("minute", targetDayJs.minute());
  component.assign("second", targetDayJs.second());
  component.assign("millisecond", targetDayJs.millisecond());
  if (component.get("hour") < 12) {
    component.assign("meridiem", Meridiem.AM);
  } else {
    component.assign("meridiem", Meridiem.PM);
  }
}
function implySimilarDate(component, targetDayJs) {
  component.imply("day", targetDayJs.date());
  component.imply("month", targetDayJs.month() + 1);
  component.imply("year", targetDayJs.year());
}
function implySimilarTime(component, targetDayJs) {
  component.imply("hour", targetDayJs.hour());
  component.imply("minute", targetDayJs.minute());
  component.imply("second", targetDayJs.second());
  component.imply("millisecond", targetDayJs.millisecond());
}

// node_modules/chrono-node/dist/esm/timezone.js
var import_dayjs = __toESM(require_dayjs_min(), 1);
var TIMEZONE_ABBR_MAP = {
  ACDT: 630,
  ACST: 570,
  ADT: -180,
  AEDT: 660,
  AEST: 600,
  AFT: 270,
  AKDT: -480,
  AKST: -540,
  ALMT: 360,
  AMST: -180,
  AMT: -240,
  ANAST: 720,
  ANAT: 720,
  AQTT: 300,
  ART: -180,
  AST: -240,
  AWDT: 540,
  AWST: 480,
  AZOST: 0,
  AZOT: -60,
  AZST: 300,
  AZT: 240,
  BNT: 480,
  BOT: -240,
  BRST: -120,
  BRT: -180,
  BST: 60,
  BTT: 360,
  CAST: 480,
  CAT: 120,
  CCT: 390,
  CDT: -300,
  CEST: 120,
  CET: {
    timezoneOffsetDuringDst: 2 * 60,
    timezoneOffsetNonDst: 60,
    dstStart: (year) => getLastWeekdayOfMonth(year, Month.MARCH, Weekday.SUNDAY, 2),
    dstEnd: (year) => getLastWeekdayOfMonth(year, Month.OCTOBER, Weekday.SUNDAY, 3)
  },
  CHADT: 825,
  CHAST: 765,
  CKT: -600,
  CLST: -180,
  CLT: -240,
  COT: -300,
  CST: -360,
  CT: {
    timezoneOffsetDuringDst: -5 * 60,
    timezoneOffsetNonDst: -6 * 60,
    dstStart: (year) => getNthWeekdayOfMonth(year, Month.MARCH, Weekday.SUNDAY, 2, 2),
    dstEnd: (year) => getNthWeekdayOfMonth(year, Month.NOVEMBER, Weekday.SUNDAY, 1, 2)
  },
  CVT: -60,
  CXT: 420,
  ChST: 600,
  DAVT: 420,
  EASST: -300,
  EAST: -360,
  EAT: 180,
  ECT: -300,
  EDT: -240,
  EEST: 180,
  EET: 120,
  EGST: 0,
  EGT: -60,
  EST: -300,
  ET: {
    timezoneOffsetDuringDst: -4 * 60,
    timezoneOffsetNonDst: -5 * 60,
    dstStart: (year) => getNthWeekdayOfMonth(year, Month.MARCH, Weekday.SUNDAY, 2, 2),
    dstEnd: (year) => getNthWeekdayOfMonth(year, Month.NOVEMBER, Weekday.SUNDAY, 1, 2)
  },
  FJST: 780,
  FJT: 720,
  FKST: -180,
  FKT: -240,
  FNT: -120,
  GALT: -360,
  GAMT: -540,
  GET: 240,
  GFT: -180,
  GILT: 720,
  GMT: 0,
  GST: 240,
  GYT: -240,
  HAA: -180,
  HAC: -300,
  HADT: -540,
  HAE: -240,
  HAP: -420,
  HAR: -360,
  HAST: -600,
  HAT: -90,
  HAY: -480,
  HKT: 480,
  HLV: -210,
  HNA: -240,
  HNC: -360,
  HNE: -300,
  HNP: -480,
  HNR: -420,
  HNT: -150,
  HNY: -540,
  HOVT: 420,
  ICT: 420,
  IDT: 180,
  IOT: 360,
  IRDT: 270,
  IRKST: 540,
  IRKT: 540,
  IRST: 210,
  IST: 330,
  JST: 540,
  KGT: 360,
  KRAST: 480,
  KRAT: 480,
  KST: 540,
  KUYT: 240,
  LHDT: 660,
  LHST: 630,
  LINT: 840,
  MAGST: 720,
  MAGT: 720,
  MART: -510,
  MAWT: 300,
  MDT: -360,
  MESZ: 120,
  MEZ: 60,
  MHT: 720,
  MMT: 390,
  MSD: 240,
  MSK: 180,
  MST: -420,
  MT: {
    timezoneOffsetDuringDst: -6 * 60,
    timezoneOffsetNonDst: -7 * 60,
    dstStart: (year) => getNthWeekdayOfMonth(year, Month.MARCH, Weekday.SUNDAY, 2, 2),
    dstEnd: (year) => getNthWeekdayOfMonth(year, Month.NOVEMBER, Weekday.SUNDAY, 1, 2)
  },
  MUT: 240,
  MVT: 300,
  MYT: 480,
  NCT: 660,
  NDT: -90,
  NFT: 690,
  NOVST: 420,
  NOVT: 360,
  NPT: 345,
  NST: -150,
  NUT: -660,
  NZDT: 780,
  NZST: 720,
  OMSST: 420,
  OMST: 420,
  PDT: -420,
  PET: -300,
  PETST: 720,
  PETT: 720,
  PGT: 600,
  PHOT: 780,
  PHT: 480,
  PKT: 300,
  PMDT: -120,
  PMST: -180,
  PONT: 660,
  PST: -480,
  PT: {
    timezoneOffsetDuringDst: -7 * 60,
    timezoneOffsetNonDst: -8 * 60,
    dstStart: (year) => getNthWeekdayOfMonth(year, Month.MARCH, Weekday.SUNDAY, 2, 2),
    dstEnd: (year) => getNthWeekdayOfMonth(year, Month.NOVEMBER, Weekday.SUNDAY, 1, 2)
  },
  PWT: 540,
  PYST: -180,
  PYT: -240,
  RET: 240,
  SAMT: 240,
  SAST: 120,
  SBT: 660,
  SCT: 240,
  SGT: 480,
  SRT: -180,
  SST: -660,
  TAHT: -600,
  TFT: 300,
  TJT: 300,
  TKT: 780,
  TLT: 540,
  TMT: 300,
  TVT: 720,
  ULAT: 480,
  UTC: 0,
  UYST: -120,
  UYT: -180,
  UZT: 300,
  VET: -210,
  VLAST: 660,
  VLAT: 660,
  VUT: 660,
  WAST: 120,
  WAT: 60,
  WEST: 60,
  WESZ: 60,
  WET: 0,
  WEZ: 0,
  WFT: 720,
  WGST: -120,
  WGT: -180,
  WIB: 420,
  WIT: 540,
  WITA: 480,
  WST: 780,
  WT: 0,
  YAKST: 600,
  YAKT: 600,
  YAPT: 600,
  YEKST: 360,
  YEKT: 360
};
function getNthWeekdayOfMonth(year, month, weekday, n, hour = 0) {
  let dayOfMonth = 0;
  let i = 0;
  while (i < n) {
    dayOfMonth++;
    const date = new Date(year, month - 1, dayOfMonth);
    if (date.getDay() === weekday)
      i++;
  }
  return new Date(year, month - 1, dayOfMonth, hour);
}
function getLastWeekdayOfMonth(year, month, weekday, hour = 0) {
  const oneIndexedWeekday = weekday === 0 ? 7 : weekday;
  const date = new Date(year, month - 1 + 1, 1, 12);
  const firstWeekdayNextMonth = date.getDay() === 0 ? 7 : date.getDay();
  let dayDiff;
  if (firstWeekdayNextMonth === oneIndexedWeekday)
    dayDiff = 7;
  else if (firstWeekdayNextMonth < oneIndexedWeekday)
    dayDiff = 7 + firstWeekdayNextMonth - oneIndexedWeekday;
  else
    dayDiff = firstWeekdayNextMonth - oneIndexedWeekday;
  date.setDate(date.getDate() - dayDiff);
  return new Date(year, month - 1, date.getDate(), hour);
}
function toTimezoneOffset(timezoneInput, date, timezoneOverrides = {}) {
  if (timezoneInput == null) {
    return null;
  }
  if (typeof timezoneInput === "number") {
    return timezoneInput;
  }
  const matchedTimezone = timezoneOverrides[timezoneInput] ?? TIMEZONE_ABBR_MAP[timezoneInput];
  if (matchedTimezone == null) {
    return null;
  }
  if (typeof matchedTimezone == "number") {
    return matchedTimezone;
  }
  if (date == null) {
    return null;
  }
  if ((0, import_dayjs.default)(date).isAfter(matchedTimezone.dstStart(date.getFullYear())) && !(0, import_dayjs.default)(date).isAfter(matchedTimezone.dstEnd(date.getFullYear()))) {
    return matchedTimezone.timezoneOffsetDuringDst;
  }
  return matchedTimezone.timezoneOffsetNonDst;
}

// node_modules/chrono-node/dist/esm/results.js
import_dayjs2.default.extend(import_quarterOfYear.default);
var ReferenceWithTimezone = class {
  constructor(input) {
    input = input ?? /* @__PURE__ */ new Date();
    if (input instanceof Date) {
      this.instant = input;
    } else {
      this.instant = input.instant ?? /* @__PURE__ */ new Date();
      this.timezoneOffset = toTimezoneOffset(input.timezone, this.instant);
    }
  }
  getDateWithAdjustedTimezone() {
    return new Date(this.instant.getTime() + this.getSystemTimezoneAdjustmentMinute(this.instant) * 6e4);
  }
  getSystemTimezoneAdjustmentMinute(date, overrideTimezoneOffset) {
    if (!date || date.getTime() < 0) {
      date = /* @__PURE__ */ new Date();
    }
    const currentTimezoneOffset = -date.getTimezoneOffset();
    const targetTimezoneOffset = overrideTimezoneOffset ?? this.timezoneOffset ?? currentTimezoneOffset;
    return currentTimezoneOffset - targetTimezoneOffset;
  }
};
var ParsingComponents = class _ParsingComponents {
  constructor(reference, knownComponents) {
    this._tags = /* @__PURE__ */ new Set();
    this.reference = reference;
    this.knownValues = {};
    this.impliedValues = {};
    if (knownComponents) {
      for (const key in knownComponents) {
        this.knownValues[key] = knownComponents[key];
      }
    }
    const refDayJs = (0, import_dayjs2.default)(reference.instant);
    this.imply("day", refDayJs.date());
    this.imply("month", refDayJs.month() + 1);
    this.imply("year", refDayJs.year());
    this.imply("hour", 12);
    this.imply("minute", 0);
    this.imply("second", 0);
    this.imply("millisecond", 0);
  }
  get(component) {
    if (component in this.knownValues) {
      return this.knownValues[component];
    }
    if (component in this.impliedValues) {
      return this.impliedValues[component];
    }
    return null;
  }
  isCertain(component) {
    return component in this.knownValues;
  }
  getCertainComponents() {
    return Object.keys(this.knownValues);
  }
  imply(component, value) {
    if (component in this.knownValues) {
      return this;
    }
    this.impliedValues[component] = value;
    return this;
  }
  assign(component, value) {
    this.knownValues[component] = value;
    delete this.impliedValues[component];
    return this;
  }
  delete(component) {
    delete this.knownValues[component];
    delete this.impliedValues[component];
  }
  clone() {
    const component = new _ParsingComponents(this.reference);
    component.knownValues = {};
    component.impliedValues = {};
    for (const key in this.knownValues) {
      component.knownValues[key] = this.knownValues[key];
    }
    for (const key in this.impliedValues) {
      component.impliedValues[key] = this.impliedValues[key];
    }
    return component;
  }
  isOnlyDate() {
    return !this.isCertain("hour") && !this.isCertain("minute") && !this.isCertain("second");
  }
  isOnlyTime() {
    return !this.isCertain("weekday") && !this.isCertain("day") && !this.isCertain("month") && !this.isCertain("year");
  }
  isOnlyWeekdayComponent() {
    return this.isCertain("weekday") && !this.isCertain("day") && !this.isCertain("month");
  }
  isDateWithUnknownYear() {
    return this.isCertain("month") && !this.isCertain("year");
  }
  isValidDate() {
    const date = this.dateWithoutTimezoneAdjustment();
    if (date.getFullYear() !== this.get("year"))
      return false;
    if (date.getMonth() !== this.get("month") - 1)
      return false;
    if (date.getDate() !== this.get("day"))
      return false;
    if (this.get("hour") != null && date.getHours() != this.get("hour"))
      return false;
    if (this.get("minute") != null && date.getMinutes() != this.get("minute"))
      return false;
    return true;
  }
  toString() {
    return `[ParsingComponents {
            tags: ${JSON.stringify(Array.from(this._tags).sort())}, 
            knownValues: ${JSON.stringify(this.knownValues)}, 
            impliedValues: ${JSON.stringify(this.impliedValues)}}, 
            reference: ${JSON.stringify(this.reference)}]`;
  }
  dayjs() {
    return (0, import_dayjs2.default)(this.date());
  }
  date() {
    const date = this.dateWithoutTimezoneAdjustment();
    const timezoneAdjustment = this.reference.getSystemTimezoneAdjustmentMinute(date, this.get("timezoneOffset"));
    return new Date(date.getTime() + timezoneAdjustment * 6e4);
  }
  addTag(tag) {
    this._tags.add(tag);
    return this;
  }
  addTags(tags) {
    for (const tag of tags) {
      this._tags.add(tag);
    }
    return this;
  }
  tags() {
    return new Set(this._tags);
  }
  dateWithoutTimezoneAdjustment() {
    const date = new Date(this.get("year"), this.get("month") - 1, this.get("day"), this.get("hour"), this.get("minute"), this.get("second"), this.get("millisecond"));
    date.setFullYear(this.get("year"));
    return date;
  }
  static createRelativeFromReference(reference, fragments) {
    let date = (0, import_dayjs2.default)(reference.instant);
    for (const key in fragments) {
      date = date.add(fragments[key], key);
    }
    const components = new _ParsingComponents(reference);
    components.addTag("result/relativeDate");
    if (fragments["hour"] || fragments["minute"] || fragments["second"]) {
      components.addTag("result/relativeDateAndTime");
      assignSimilarTime(components, date);
      assignSimilarDate(components, date);
      if (reference.timezoneOffset !== null) {
        components.assign("timezoneOffset", -reference.instant.getTimezoneOffset());
      }
    } else {
      implySimilarTime(components, date);
      if (reference.timezoneOffset !== null) {
        components.imply("timezoneOffset", -reference.instant.getTimezoneOffset());
      }
      if (fragments["d"]) {
        components.assign("day", date.date());
        components.assign("month", date.month() + 1);
        components.assign("year", date.year());
      } else if (fragments["week"]) {
        components.assign("day", date.date());
        components.assign("month", date.month() + 1);
        components.assign("year", date.year());
        components.imply("weekday", date.day());
      } else {
        components.imply("day", date.date());
        if (fragments["month"]) {
          components.assign("month", date.month() + 1);
          components.assign("year", date.year());
        } else {
          components.imply("month", date.month() + 1);
          if (fragments["year"]) {
            components.assign("year", date.year());
          } else {
            components.imply("year", date.year());
          }
        }
      }
    }
    return components;
  }
};
var ParsingResult = class _ParsingResult {
  constructor(reference, index, text, start, end) {
    this.reference = reference;
    this.refDate = reference.instant;
    this.index = index;
    this.text = text;
    this.start = start || new ParsingComponents(reference);
    this.end = end;
  }
  clone() {
    const result = new _ParsingResult(this.reference, this.index, this.text);
    result.start = this.start ? this.start.clone() : null;
    result.end = this.end ? this.end.clone() : null;
    return result;
  }
  date() {
    return this.start.date();
  }
  addTag(tag) {
    this.start.addTag(tag);
    if (this.end) {
      this.end.addTag(tag);
    }
    return this;
  }
  addTags(tags) {
    this.start.addTags(tags);
    if (this.end) {
      this.end.addTags(tags);
    }
    return this;
  }
  tags() {
    const combinedTags = new Set(this.start.tags());
    if (this.end) {
      for (const tag of this.end.tags()) {
        combinedTags.add(tag);
      }
    }
    return combinedTags;
  }
  toString() {
    const tags = Array.from(this.tags()).sort();
    return `[ParsingResult {index: ${this.index}, text: '${this.text}', tags: ${JSON.stringify(tags)} ...}]`;
  }
};

// node_modules/chrono-node/dist/esm/utils/pattern.js
function repeatedTimeunitPattern(prefix, singleTimeunitPattern, connectorPattern = "\\s{0,5},?\\s{0,5}") {
  const singleTimeunitPatternNoCapture = singleTimeunitPattern.replace(/\((?!\?)/g, "(?:");
  return `${prefix}${singleTimeunitPatternNoCapture}(?:${connectorPattern}${singleTimeunitPatternNoCapture}){0,10}`;
}
function extractTerms(dictionary) {
  let keys;
  if (dictionary instanceof Array) {
    keys = [...dictionary];
  } else if (dictionary instanceof Map) {
    keys = Array.from(dictionary.keys());
  } else {
    keys = Object.keys(dictionary);
  }
  return keys;
}
function matchAnyPattern(dictionary) {
  const joinedTerms = extractTerms(dictionary).sort((a, b) => b.length - a.length).join("|").replace(/\./g, "\\.");
  return `(?:${joinedTerms})`;
}

// node_modules/chrono-node/dist/esm/calculation/years.js
var import_dayjs4 = __toESM(require_dayjs_min(), 1);
function findMostLikelyADYear(yearNumber) {
  if (yearNumber < 100) {
    if (yearNumber > 50) {
      yearNumber = yearNumber + 1900;
    } else {
      yearNumber = yearNumber + 2e3;
    }
  }
  return yearNumber;
}
function findYearClosestToRef(refDate, day, month) {
  const refMoment = (0, import_dayjs4.default)(refDate);
  let dateMoment = refMoment;
  dateMoment = dateMoment.month(month - 1);
  dateMoment = dateMoment.date(day);
  dateMoment = dateMoment.year(refMoment.year());
  const nextYear = dateMoment.add(1, "y");
  const lastYear = dateMoment.add(-1, "y");
  if (Math.abs(nextYear.diff(refMoment)) < Math.abs(dateMoment.diff(refMoment))) {
    dateMoment = nextYear;
  } else if (Math.abs(lastYear.diff(refMoment)) < Math.abs(dateMoment.diff(refMoment))) {
    dateMoment = lastYear;
  }
  return dateMoment.year();
}

// node_modules/chrono-node/dist/esm/locales/en/constants.js
var WEEKDAY_DICTIONARY = {
  sunday: 0,
  sun: 0,
  "sun.": 0,
  monday: 1,
  mon: 1,
  "mon.": 1,
  tuesday: 2,
  tue: 2,
  "tue.": 2,
  wednesday: 3,
  wed: 3,
  "wed.": 3,
  thursday: 4,
  thurs: 4,
  "thurs.": 4,
  thur: 4,
  "thur.": 4,
  thu: 4,
  "thu.": 4,
  friday: 5,
  fri: 5,
  "fri.": 5,
  saturday: 6,
  sat: 6,
  "sat.": 6
};
var FULL_MONTH_NAME_DICTIONARY = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12
};
var MONTH_DICTIONARY = {
  ...FULL_MONTH_NAME_DICTIONARY,
  jan: 1,
  "jan.": 1,
  feb: 2,
  "feb.": 2,
  mar: 3,
  "mar.": 3,
  apr: 4,
  "apr.": 4,
  jun: 6,
  "jun.": 6,
  jul: 7,
  "jul.": 7,
  aug: 8,
  "aug.": 8,
  sep: 9,
  "sep.": 9,
  sept: 9,
  "sept.": 9,
  oct: 10,
  "oct.": 10,
  nov: 11,
  "nov.": 11,
  dec: 12,
  "dec.": 12
};
var INTEGER_WORD_DICTIONARY = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12
};
var ORDINAL_WORD_DICTIONARY = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5,
  sixth: 6,
  seventh: 7,
  eighth: 8,
  ninth: 9,
  tenth: 10,
  eleventh: 11,
  twelfth: 12,
  thirteenth: 13,
  fourteenth: 14,
  fifteenth: 15,
  sixteenth: 16,
  seventeenth: 17,
  eighteenth: 18,
  nineteenth: 19,
  twentieth: 20,
  "twenty first": 21,
  "twenty-first": 21,
  "twenty second": 22,
  "twenty-second": 22,
  "twenty third": 23,
  "twenty-third": 23,
  "twenty fourth": 24,
  "twenty-fourth": 24,
  "twenty fifth": 25,
  "twenty-fifth": 25,
  "twenty sixth": 26,
  "twenty-sixth": 26,
  "twenty seventh": 27,
  "twenty-seventh": 27,
  "twenty eighth": 28,
  "twenty-eighth": 28,
  "twenty ninth": 29,
  "twenty-ninth": 29,
  "thirtieth": 30,
  "thirty first": 31,
  "thirty-first": 31
};
var TIME_UNIT_DICTIONARY_NO_ABBR = {
  second: "second",
  seconds: "second",
  minute: "minute",
  minutes: "minute",
  hour: "hour",
  hours: "hour",
  day: "d",
  days: "d",
  week: "week",
  weeks: "week",
  month: "month",
  months: "month",
  quarter: "quarter",
  quarters: "quarter",
  year: "year",
  years: "year"
};
var TIME_UNIT_DICTIONARY = {
  s: "second",
  sec: "second",
  second: "second",
  seconds: "second",
  m: "minute",
  min: "minute",
  mins: "minute",
  minute: "minute",
  minutes: "minute",
  h: "hour",
  hr: "hour",
  hrs: "hour",
  hour: "hour",
  hours: "hour",
  d: "d",
  day: "d",
  days: "d",
  w: "w",
  week: "week",
  weeks: "week",
  mo: "month",
  mon: "month",
  mos: "month",
  month: "month",
  months: "month",
  qtr: "quarter",
  quarter: "quarter",
  quarters: "quarter",
  y: "year",
  yr: "year",
  year: "year",
  years: "year",
  ...TIME_UNIT_DICTIONARY_NO_ABBR
};
var NUMBER_PATTERN = `(?:${matchAnyPattern(INTEGER_WORD_DICTIONARY)}|[0-9]+|[0-9]+\\.[0-9]+|half(?:\\s{0,2}an?)?|an?\\b(?:\\s{0,2}few)?|few|several|the|a?\\s{0,2}couple\\s{0,2}(?:of)?)`;
function parseNumberPattern(match) {
  const num = match.toLowerCase();
  if (INTEGER_WORD_DICTIONARY[num] !== void 0) {
    return INTEGER_WORD_DICTIONARY[num];
  } else if (num === "a" || num === "an" || num == "the") {
    return 1;
  } else if (num.match(/few/)) {
    return 3;
  } else if (num.match(/half/)) {
    return 0.5;
  } else if (num.match(/couple/)) {
    return 2;
  } else if (num.match(/several/)) {
    return 7;
  }
  return parseFloat(num);
}
var ORDINAL_NUMBER_PATTERN = `(?:${matchAnyPattern(ORDINAL_WORD_DICTIONARY)}|[0-9]{1,2}(?:st|nd|rd|th)?)`;
function parseOrdinalNumberPattern(match) {
  let num = match.toLowerCase();
  if (ORDINAL_WORD_DICTIONARY[num] !== void 0) {
    return ORDINAL_WORD_DICTIONARY[num];
  }
  num = num.replace(/(?:st|nd|rd|th)$/i, "");
  return parseInt(num);
}
var YEAR_PATTERN = `(?:[1-9][0-9]{0,3}\\s{0,2}(?:BE|AD|BC|BCE|CE)|[1-2][0-9]{3}|[5-9][0-9]|2[0-5])`;
function parseYear(match) {
  if (/BE/i.test(match)) {
    match = match.replace(/BE/i, "");
    return parseInt(match) - 543;
  }
  if (/BCE?/i.test(match)) {
    match = match.replace(/BCE?/i, "");
    return -parseInt(match);
  }
  if (/(AD|CE)/i.test(match)) {
    match = match.replace(/(AD|CE)/i, "");
    return parseInt(match);
  }
  const rawYearNumber = parseInt(match);
  return findMostLikelyADYear(rawYearNumber);
}
var SINGLE_TIME_UNIT_PATTERN = `(${NUMBER_PATTERN})\\s{0,3}(${matchAnyPattern(TIME_UNIT_DICTIONARY)})`;
var SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");
var SINGLE_TIME_UNIT_NO_ABBR_PATTERN = `(${NUMBER_PATTERN})\\s{0,3}(${matchAnyPattern(TIME_UNIT_DICTIONARY_NO_ABBR)})`;
var TIME_UNIT_CONNECTOR_PATTERN = `\\s{0,5},?(?:\\s*and)?\\s{0,5}`;
var TIME_UNITS_PATTERN = repeatedTimeunitPattern(`(?:(?:about|around)\\s{0,3})?`, SINGLE_TIME_UNIT_PATTERN, TIME_UNIT_CONNECTOR_PATTERN);
var TIME_UNITS_NO_ABBR_PATTERN = repeatedTimeunitPattern(`(?:(?:about|around)\\s{0,3})?`, SINGLE_TIME_UNIT_NO_ABBR_PATTERN, TIME_UNIT_CONNECTOR_PATTERN);
function parseTimeUnits(timeunitText) {
  const fragments = {};
  let remainingText = timeunitText;
  let match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
  while (match) {
    collectDateTimeFragment(fragments, match);
    remainingText = remainingText.substring(match[0].length).trim();
    match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
  }
  if (Object.keys(fragments).length == 0) {
    return null;
  }
  return fragments;
}
function collectDateTimeFragment(fragments, match) {
  if (match[0].match(/^[a-zA-Z]+$/)) {
    return;
  }
  const num = parseNumberPattern(match[1]);
  const unit = TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
  fragments[unit] = num;
}

// node_modules/chrono-node/dist/esm/common/parsers/AbstractParserWithWordBoundary.js
var AbstractParserWithWordBoundaryChecking = class {
  constructor() {
    this.cachedInnerPattern = null;
    this.cachedPattern = null;
  }
  innerPatternHasChange(context, currentInnerPattern) {
    return this.innerPattern(context) !== currentInnerPattern;
  }
  patternLeftBoundary() {
    return `(\\W|^)`;
  }
  pattern(context) {
    if (this.cachedInnerPattern) {
      if (!this.innerPatternHasChange(context, this.cachedInnerPattern)) {
        return this.cachedPattern;
      }
    }
    this.cachedInnerPattern = this.innerPattern(context);
    this.cachedPattern = new RegExp(`${this.patternLeftBoundary()}${this.cachedInnerPattern.source}`, this.cachedInnerPattern.flags);
    return this.cachedPattern;
  }
  extract(context, match) {
    const header = match[1] ?? "";
    match.index = match.index + header.length;
    match[0] = match[0].substring(header.length);
    for (let i = 2; i < match.length; i++) {
      match[i - 1] = match[i];
    }
    return this.innerExtract(context, match);
  }
};

// node_modules/chrono-node/dist/esm/locales/en/parsers/ENTimeUnitWithinFormatParser.js
var PATTERN_WITH_OPTIONAL_PREFIX = new RegExp(`(?:(?:within|in|for)\\s*)?(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
var PATTERN_WITH_PREFIX = new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
var PATTERN_WITH_PREFIX_STRICT = new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${TIME_UNITS_NO_ABBR_PATTERN})(?=\\W|$)`, "i");
var ENTimeUnitWithinFormatParser = class extends AbstractParserWithWordBoundaryChecking {
  constructor(strictMode) {
    super();
    this.strictMode = strictMode;
  }
  innerPattern(context) {
    if (this.strictMode) {
      return PATTERN_WITH_PREFIX_STRICT;
    }
    return context.option.forwardDate ? PATTERN_WITH_OPTIONAL_PREFIX : PATTERN_WITH_PREFIX;
  }
  innerExtract(context, match) {
    if (match[0].match(/^for\s*the\s*\w+/)) {
      return null;
    }
    const timeUnits = parseTimeUnits(match[1]);
    if (!timeUnits) {
      return null;
    }
    return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
  }
};

// node_modules/chrono-node/dist/esm/locales/en/parsers/ENMonthNameLittleEndianParser.js
var PATTERN = new RegExp(`(?:on\\s{0,3})?(${ORDINAL_NUMBER_PATTERN})(?:\\s{0,3}(?:to|\\-|\\\u2013|until|through|till)?\\s{0,3}(${ORDINAL_NUMBER_PATTERN}))?(?:-|/|\\s{0,3}(?:of)?\\s{0,3})(${matchAnyPattern(MONTH_DICTIONARY)})(?:(?:-|/|,?\\s{0,3})(${YEAR_PATTERN}(?!\\w)))?(?=\\W|$)`, "i");
var DATE_GROUP = 1;
var DATE_TO_GROUP = 2;
var MONTH_NAME_GROUP = 3;
var YEAR_GROUP = 4;
var ENMonthNameLittleEndianParser = class extends AbstractParserWithWordBoundaryChecking {
  innerPattern() {
    return PATTERN;
  }
  innerExtract(context, match) {
    const result = context.createParsingResult(match.index, match[0]);
    const month = MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
    const day = parseOrdinalNumberPattern(match[DATE_GROUP]);
    if (day > 31) {
      match.index = match.index + match[DATE_GROUP].length;
      return null;
    }
    result.start.assign("month", month);
    result.start.assign("day", day);
    if (match[YEAR_GROUP]) {
      const yearNumber = parseYear(match[YEAR_GROUP]);
      result.start.assign("year", yearNumber);
    } else {
      const year = findYearClosestToRef(context.refDate, day, month);
      result.start.imply("year", year);
    }
    if (match[DATE_TO_GROUP]) {
      const endDate = parseOrdinalNumberPattern(match[DATE_TO_GROUP]);
      result.end = result.start.clone();
      result.end.assign("day", endDate);
    }
    return result;
  }
};

// node_modules/chrono-node/dist/esm/locales/en/parsers/ENMonthNameMiddleEndianParser.js
var PATTERN2 = new RegExp(`(${matchAnyPattern(MONTH_DICTIONARY)})(?:-|/|\\s*,?\\s*)(${ORDINAL_NUMBER_PATTERN})(?!\\s*(?:am|pm))\\s*(?:(?:to|\\-)\\s*(${ORDINAL_NUMBER_PATTERN})\\s*)?(?:(?:-|/|\\s*,\\s*|\\s+)(${YEAR_PATTERN}))?(?=\\W|$)(?!\\:\\d)`, "i");
var MONTH_NAME_GROUP2 = 1;
var DATE_GROUP2 = 2;
var DATE_TO_GROUP2 = 3;
var YEAR_GROUP2 = 4;
var ENMonthNameMiddleEndianParser = class extends AbstractParserWithWordBoundaryChecking {
  constructor(shouldSkipYearLikeDate) {
    super();
    this.shouldSkipYearLikeDate = shouldSkipYearLikeDate;
  }
  innerPattern() {
    return PATTERN2;
  }
  innerExtract(context, match) {
    const month = MONTH_DICTIONARY[match[MONTH_NAME_GROUP2].toLowerCase()];
    const day = parseOrdinalNumberPattern(match[DATE_GROUP2]);
    if (day > 31) {
      return null;
    }
    if (this.shouldSkipYearLikeDate) {
      if (!match[DATE_TO_GROUP2] && !match[YEAR_GROUP2] && match[DATE_GROUP2].match(/^2[0-5]$/)) {
        return null;
      }
    }
    const components = context.createParsingComponents({
      day,
      month
    }).addTag("parser/ENMonthNameMiddleEndianParser");
    if (match[YEAR_GROUP2]) {
      const year = parseYear(match[YEAR_GROUP2]);
      components.assign("year", year);
    } else {
      const year = findYearClosestToRef(context.refDate, day, month);
      components.imply("year", year);
    }
    if (!match[DATE_TO_GROUP2]) {
      return components;
    }
    const endDate = parseOrdinalNumberPattern(match[DATE_TO_GROUP2]);
    const result = context.createParsingResult(match.index, match[0]);
    result.start = components;
    result.end = components.clone();
    result.end.assign("day", endDate);
    return result;
  }
};

// node_modules/chrono-node/dist/esm/locales/en/parsers/ENMonthNameParser.js
var PATTERN3 = new RegExp(`((?:in)\\s*)?(${matchAnyPattern(MONTH_DICTIONARY)})\\s*(?:(?:,|-|of)?\\s*(${YEAR_PATTERN})?)?(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`, "i");
var PREFIX_GROUP = 1;
var MONTH_NAME_GROUP3 = 2;
var YEAR_GROUP3 = 3;
var ENMonthNameParser = class extends AbstractParserWithWordBoundaryChecking {
  innerPattern() {
    return PATTERN3;
  }
  innerExtract(context, match) {
    const monthName = match[MONTH_NAME_GROUP3].toLowerCase();
    if (match[0].length <= 3 && !FULL_MONTH_NAME_DICTIONARY[monthName]) {
      return null;
    }
    const result = context.createParsingResult(match.index + (match[PREFIX_GROUP] || "").length, match.index + match[0].length);
    result.start.imply("day", 1);
    result.start.addTag("parser/ENMonthNameParser");
    const month = MONTH_DICTIONARY[monthName];
    result.start.assign("month", month);
    if (match[YEAR_GROUP3]) {
      const year = parseYear(match[YEAR_GROUP3]);
      result.start.assign("year", year);
    } else {
      const year = findYearClosestToRef(context.refDate, 1, month);
      result.start.imply("year", year);
    }
    return result;
  }
};

// node_modules/chrono-node/dist/esm/locales/en/parsers/ENYearMonthDayParser.js
var PATTERN4 = new RegExp(`([0-9]{4})[-\\.\\/\\s](?:(${matchAnyPattern(MONTH_DICTIONARY)})|([0-9]{1,2}))[-\\.\\/\\s]([0-9]{1,2})(?=\\W|$)`, "i");
var YEAR_NUMBER_GROUP = 1;
var MONTH_NAME_GROUP4 = 2;
var MONTH_NUMBER_GROUP = 3;
var DATE_NUMBER_GROUP = 4;
var ENYearMonthDayParser = class extends AbstractParserWithWordBoundaryChecking {
  constructor(strictMonthDateOrder) {
    super();
    this.strictMonthDateOrder = strictMonthDateOrder;
  }
  innerPattern() {
    return PATTERN4;
  }
  innerExtract(context, match) {
    const year = parseInt(match[YEAR_NUMBER_GROUP]);
    let day = parseInt(match[DATE_NUMBER_GROUP]);
    let month = match[MONTH_NUMBER_GROUP] ? parseInt(match[MONTH_NUMBER_GROUP]) : MONTH_DICTIONARY[match[MONTH_NAME_GROUP4].toLowerCase()];
    if (month < 1 || month > 12) {
      if (this.strictMonthDateOrder) {
        return null;
      }
      if (day >= 1 && day <= 12) {
        [month, day] = [day, month];
      }
    }
    if (day < 1 || day > 31) {
      return null;
    }
    return {
      day,
      month,
      year
    };
  }
};

// node_modules/chrono-node/dist/esm/locales/en/parsers/ENSlashMonthFormatParser.js
var PATTERN5 = new RegExp("([0-9]|0[1-9]|1[012])/([0-9]{4})", "i");
var MONTH_GROUP = 1;
var YEAR_GROUP4 = 2;
var ENSlashMonthFormatParser = class extends AbstractParserWithWordBoundaryChecking {
  innerPattern() {
    return PATTERN5;
  }
  innerExtract(context, match) {
    const year = parseInt(match[YEAR_GROUP4]);
    const month = parseInt(match[MONTH_GROUP]);
    return context.createParsingComponents().imply("day", 1).assign("month", month).assign("year", year);
  }
};

// node_modules/chrono-node/dist/esm/common/parsers/AbstractTimeExpressionParser.js
function primaryTimePattern(leftBoundary, primaryPrefix, primarySuffix, flags) {
  return new RegExp(`${leftBoundary}${primaryPrefix}(\\d{1,4})(?:(?:\\.|:|\uFF1A)(\\d{1,2})(?:(?::|\uFF1A)(\\d{2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${primarySuffix}`, flags);
}
function followingTimePatten(followingPhase, followingSuffix) {
  return new RegExp(`^(${followingPhase})(\\d{1,4})(?:(?:\\.|\\:|\\\uFF1A)(\\d{1,2})(?:(?:\\.|\\:|\\\uFF1A)(\\d{1,2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${followingSuffix}`, "i");
}
var HOUR_GROUP = 2;
var MINUTE_GROUP = 3;
var SECOND_GROUP = 4;
var MILLI_SECOND_GROUP = 5;
var AM_PM_HOUR_GROUP = 6;
var AbstractTimeExpressionParser = class {
  constructor(strictMode = false) {
    this.cachedPrimaryPrefix = null;
    this.cachedPrimarySuffix = null;
    this.cachedPrimaryTimePattern = null;
    this.cachedFollowingPhase = null;
    this.cachedFollowingSuffix = null;
    this.cachedFollowingTimePatten = null;
    this.strictMode = strictMode;
  }
  patternFlags() {
    return "i";
  }
  primaryPatternLeftBoundary() {
    return `(^|\\s|T|\\b)`;
  }
  primarySuffix() {
    return `(?!/)(?=\\W|$)`;
  }
  followingSuffix() {
    return `(?!/)(?=\\W|$)`;
  }
  pattern(context) {
    return this.getPrimaryTimePatternThroughCache();
  }
  extract(context, match) {
    const startComponents = this.extractPrimaryTimeComponents(context, match);
    if (!startComponents) {
      if (match[0].match(/^\d{4}/)) {
        match.index += 4;
        return null;
      }
      match.index += match[0].length;
      return null;
    }
    const index = match.index + match[1].length;
    const text = match[0].substring(match[1].length);
    const result = context.createParsingResult(index, text, startComponents);
    match.index += match[0].length;
    const remainingText = context.text.substring(match.index);
    const followingPattern = this.getFollowingTimePatternThroughCache();
    const followingMatch = followingPattern.exec(remainingText);
    if (text.match(/^\d{3,4}/) && followingMatch) {
      if (followingMatch[0].match(/^\s*([+-])\s*\d{2,4}$/)) {
        return null;
      }
      if (followingMatch[0].match(/^\s*([+-])\s*\d{2}\W\d{2}/)) {
        return null;
      }
    }
    if (!followingMatch || followingMatch[0].match(/^\s*([+-])\s*\d{3,4}$/)) {
      return this.checkAndReturnWithoutFollowingPattern(result);
    }
    result.end = this.extractFollowingTimeComponents(context, followingMatch, result);
    if (result.end) {
      result.text += followingMatch[0];
    }
    return this.checkAndReturnWithFollowingPattern(result);
  }
  extractPrimaryTimeComponents(context, match, strict2 = false) {
    const components = context.createParsingComponents();
    let minute = 0;
    let meridiem = null;
    let hour = parseInt(match[HOUR_GROUP]);
    if (hour > 100) {
      if (this.strictMode || match[MINUTE_GROUP] != null) {
        return null;
      }
      minute = hour % 100;
      hour = Math.floor(hour / 100);
    }
    if (hour > 24) {
      return null;
    }
    if (match[MINUTE_GROUP] != null) {
      if (match[MINUTE_GROUP].length == 1 && !match[AM_PM_HOUR_GROUP]) {
        return null;
      }
      minute = parseInt(match[MINUTE_GROUP]);
    }
    if (minute >= 60) {
      return null;
    }
    if (hour > 12) {
      meridiem = Meridiem.PM;
    }
    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12)
        return null;
      const ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
      if (ampm == "a") {
        meridiem = Meridiem.AM;
        if (hour == 12) {
          hour = 0;
        }
      }
      if (ampm == "p") {
        meridiem = Meridiem.PM;
        if (hour != 12) {
          hour += 12;
        }
      }
    }
    components.assign("hour", hour);
    components.assign("minute", minute);
    if (meridiem !== null) {
      components.assign("meridiem", meridiem);
    } else {
      if (hour < 12) {
        components.imply("meridiem", Meridiem.AM);
      } else {
        components.imply("meridiem", Meridiem.PM);
      }
    }
    if (match[MILLI_SECOND_GROUP] != null) {
      const millisecond = parseInt(match[MILLI_SECOND_GROUP].substring(0, 3));
      if (millisecond >= 1e3)
        return null;
      components.assign("millisecond", millisecond);
    }
    if (match[SECOND_GROUP] != null) {
      const second = parseInt(match[SECOND_GROUP]);
      if (second >= 60)
        return null;
      components.assign("second", second);
    }
    return components;
  }
  extractFollowingTimeComponents(context, match, result) {
    const components = context.createParsingComponents();
    if (match[MILLI_SECOND_GROUP] != null) {
      const millisecond = parseInt(match[MILLI_SECOND_GROUP].substring(0, 3));
      if (millisecond >= 1e3)
        return null;
      components.assign("millisecond", millisecond);
    }
    if (match[SECOND_GROUP] != null) {
      const second = parseInt(match[SECOND_GROUP]);
      if (second >= 60)
        return null;
      components.assign("second", second);
    }
    let hour = parseInt(match[HOUR_GROUP]);
    let minute = 0;
    let meridiem = -1;
    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
    } else if (hour > 100) {
      minute = hour % 100;
      hour = Math.floor(hour / 100);
    }
    if (minute >= 60 || hour > 24) {
      return null;
    }
    if (hour >= 12) {
      meridiem = Meridiem.PM;
    }
    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) {
        return null;
      }
      const ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
      if (ampm == "a") {
        meridiem = Meridiem.AM;
        if (hour == 12) {
          hour = 0;
          if (!components.isCertain("day")) {
            components.imply("day", components.get("day") + 1);
          }
        }
      }
      if (ampm == "p") {
        meridiem = Meridiem.PM;
        if (hour != 12)
          hour += 12;
      }
      if (!result.start.isCertain("meridiem")) {
        if (meridiem == Meridiem.AM) {
          result.start.imply("meridiem", Meridiem.AM);
          if (result.start.get("hour") == 12) {
            result.start.assign("hour", 0);
          }
        } else {
          result.start.imply("meridiem", Meridiem.PM);
          if (result.start.get("hour") != 12) {
            result.start.assign("hour", result.start.get("hour") + 12);
          }
        }
      }
    }
    components.assign("hour", hour);
    components.assign("minute", minute);
    if (meridiem >= 0) {
      components.assign("meridiem", meridiem);
    } else {
      const startAtPM = result.start.isCertain("meridiem") && result.start.get("hour") > 12;
      if (startAtPM) {
        if (result.start.get("hour") - 12 > hour) {
          components.imply("meridiem", Meridiem.AM);
        } else if (hour <= 12) {
          components.assign("hour", hour + 12);
          components.assign("meridiem", Meridiem.PM);
        }
      } else if (hour > 12) {
        components.imply("meridiem", Meridiem.PM);
      } else if (hour <= 12) {
        components.imply("meridiem", Meridiem.AM);
      }
    }
    if (components.date().getTime() < result.start.date().getTime()) {
      components.imply("day", components.get("day") + 1);
    }
    return components;
  }
  checkAndReturnWithoutFollowingPattern(result) {
    if (result.text.match(/^\d$/)) {
      return null;
    }
    if (result.text.match(/^\d\d\d+$/)) {
      return null;
    }
    if (result.text.match(/\d[apAP]$/)) {
      return null;
    }
    const endingWithNumbers = result.text.match(/[^\d:.](\d[\d.]+)$/);
    if (endingWithNumbers) {
      const endingNumbers = endingWithNumbers[1];
      if (this.strictMode) {
        return null;
      }
      if (endingNumbers.includes(".") && !endingNumbers.match(/\d(\.\d{2})+$/)) {
        return null;
      }
      const endingNumberVal = parseInt(endingNumbers);
      if (endingNumberVal > 24) {
        return null;
      }
    }
    return result;
  }
  checkAndReturnWithFollowingPattern(result) {
    if (result.text.match(/^\d+-\d+$/)) {
      return null;
    }
    const endingWithNumbers = result.text.match(/[^\d:.](\d[\d.]+)\s*-\s*(\d[\d.]+)$/);
    if (endingWithNumbers) {
      if (this.strictMode) {
        return null;
      }
      const startingNumbers = endingWithNumbers[1];
      const endingNumbers = endingWithNumbers[2];
      if (endingNumbers.includes(".") && !endingNumbers.match(/\d(\.\d{2})+$/)) {
        return null;
      }
      const endingNumberVal = parseInt(endingNumbers);
      const startingNumberVal = parseInt(startingNumbers);
      if (endingNumberVal > 24 || startingNumberVal > 24) {
        return null;
      }
    }
    return result;
  }
  getPrimaryTimePatternThroughCache() {
    const primaryPrefix = this.primaryPrefix();
    const primarySuffix = this.primarySuffix();
    if (this.cachedPrimaryPrefix === primaryPrefix && this.cachedPrimarySuffix === primarySuffix) {
      return this.cachedPrimaryTimePattern;
    }
    this.cachedPrimaryTimePattern = primaryTimePattern(this.primaryPatternLeftBoundary(), primaryPrefix, primarySuffix, this.patternFlags());
    this.cachedPrimaryPrefix = primaryPrefix;
    this.cachedPrimarySuffix = primarySuffix;
    return this.cachedPrimaryTimePattern;
  }
  getFollowingTimePatternThroughCache() {
    const followingPhase = this.followingPhase();
    const followingSuffix = this.followingSuffix();
    if (this.cachedFollowingPhase === followingPhase && this.cachedFollowingSuffix === followingSuffix) {
      return this.cachedFollowingTimePatten;
    }
    this.cachedFollowingTimePatten = followingTimePatten(followingPhase, followingSuffix);
    this.cachedFollowingPhase = followingPhase;
    this.cachedFollowingSuffix = followingSuffix;
    return this.cachedFollowingTimePatten;
  }
};

// node_modules/chrono-node/dist/esm/locales/en/parsers/ENTimeExpressionParser.js
var ENTimeExpressionParser = class extends AbstractTimeExpressionParser {
  constructor(strictMode) {
    super(strictMode);
  }
  followingPhase() {
    return "\\s*(?:\\-|\\\u2013|\\~|\\\u301C|to|until|through|till|\\?)\\s*";
  }
  primaryPrefix() {
    return "(?:(?:at|from)\\s*)??";
  }
  primarySuffix() {
    return "(?:\\s*(?:o\\W*clock|at\\s*night|in\\s*the\\s*(?:morning|afternoon)))?(?!/)(?=\\W|$)";
  }
  extractPrimaryTimeComponents(context, match) {
    const components = super.extractPrimaryTimeComponents(context, match);
    if (!components) {
      return components;
    }
    if (match[0].endsWith("night")) {
      const hour = components.get("hour");
      if (hour >= 6 && hour < 12) {
        components.assign("hour", components.get("hour") + 12);
        components.assign("meridiem", Meridiem.PM);
      } else if (hour < 6) {
        components.assign("meridiem", Meridiem.AM);
      }
    }
    if (match[0].endsWith("afternoon")) {
      components.assign("meridiem", Meridiem.PM);
      const hour = components.get("hour");
      if (hour >= 0 && hour <= 6) {
        components.assign("hour", components.get("hour") + 12);
      }
    }
    if (match[0].endsWith("morning")) {
      components.assign("meridiem", Meridiem.AM);
      const hour = components.get("hour");
      if (hour < 12) {
        components.assign("hour", components.get("hour"));
      }
    }
    return components.addTag("parser/ENTimeExpressionParser");
  }
  extractFollowingTimeComponents(context, match, result) {
    const followingComponents = super.extractFollowingTimeComponents(context, match, result);
    if (followingComponents) {
      followingComponents.addTag("parser/ENTimeExpressionParser");
    }
    return followingComponents;
  }
};

// node_modules/chrono-node/dist/esm/utils/timeunits.js
function reverseTimeUnits(timeUnits) {
  const reversed = {};
  for (const key in timeUnits) {
    reversed[key] = -timeUnits[key];
  }
  return reversed;
}
function addImpliedTimeUnits(components, timeUnits) {
  const output = components.clone();
  let date = components.dayjs();
  for (const key in timeUnits) {
    date = date.add(timeUnits[key], key);
  }
  if ("day" in timeUnits || "d" in timeUnits || "week" in timeUnits || "month" in timeUnits || "year" in timeUnits) {
    output.imply("day", date.date());
    output.imply("month", date.month() + 1);
    output.imply("year", date.year());
  }
  if ("second" in timeUnits || "minute" in timeUnits || "hour" in timeUnits) {
    output.imply("second", date.second());
    output.imply("minute", date.minute());
    output.imply("hour", date.hour());
  }
  return output;
}

// node_modules/chrono-node/dist/esm/locales/en/parsers/ENTimeUnitAgoFormatParser.js
var PATTERN6 = new RegExp(`(${TIME_UNITS_PATTERN})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`, "i");
var STRICT_PATTERN = new RegExp(`(${TIME_UNITS_NO_ABBR_PATTERN})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`, "i");
var ENTimeUnitAgoFormatParser = class extends AbstractParserWithWordBoundaryChecking {
  constructor(strictMode) {
    super();
    this.strictMode = strictMode;
  }
  innerPattern() {
    return this.strictMode ? STRICT_PATTERN : PATTERN6;
  }
  innerExtract(context, match) {
    const timeUnits = parseTimeUnits(match[1]);
    if (!timeUnits) {
      return null;
    }
    const outputTimeUnits = reverseTimeUnits(timeUnits);
    return ParsingComponents.createRelativeFromReference(context.reference, outputTimeUnits);
  }
};

// node_modules/chrono-node/dist/esm/locales/en/parsers/ENTimeUnitLaterFormatParser.js
var PATTERN7 = new RegExp(`(${TIME_UNITS_PATTERN})\\s{0,5}(?:later|after|from now|henceforth|forward|out)(?=(?:\\W|$))`, "i");
var STRICT_PATTERN2 = new RegExp(`(${TIME_UNITS_NO_ABBR_PATTERN})\\s{0,5}(later|after|from now)(?=\\W|$)`, "i");
var GROUP_NUM_TIMEUNITS = 1;
var ENTimeUnitLaterFormatParser = class extends AbstractParserWithWordBoundaryChecking {
  constructor(strictMode) {
    super();
    this.strictMode = strictMode;
  }
  innerPattern() {
    return this.strictMode ? STRICT_PATTERN2 : PATTERN7;
  }
  innerExtract(context, match) {
    const timeUnits = parseTimeUnits(match[GROUP_NUM_TIMEUNITS]);
    if (!timeUnits) {
      return null;
    }
    return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
  }
};

// node_modules/chrono-node/dist/esm/common/abstractRefiners.js
var Filter = class {
  refine(context, results) {
    return results.filter((r) => this.isValid(context, r));
  }
};
var MergingRefiner = class {
  refine(context, results) {
    if (results.length < 2) {
      return results;
    }
    const mergedResults = [];
    let curResult = results[0];
    let nextResult = null;
    for (let i = 1; i < results.length; i++) {
      nextResult = results[i];
      const textBetween = context.text.substring(curResult.index + curResult.text.length, nextResult.index);
      if (!this.shouldMergeResults(textBetween, curResult, nextResult, context)) {
        mergedResults.push(curResult);
        curResult = nextResult;
      } else {
        const left = curResult;
        const right = nextResult;
        const mergedResult = this.mergeResults(textBetween, left, right, context);
        context.debug(() => {
          console.log(`${this.constructor.name} merged ${left} and ${right} into ${mergedResult}`);
        });
        curResult = mergedResult;
      }
    }
    if (curResult != null) {
      mergedResults.push(curResult);
    }
    return mergedResults;
  }
};

// node_modules/chrono-node/dist/esm/common/refiners/AbstractMergeDateRangeRefiner.js
var AbstractMergeDateRangeRefiner = class extends MergingRefiner {
  shouldMergeResults(textBetween, currentResult, nextResult) {
    return !currentResult.end && !nextResult.end && textBetween.match(this.patternBetween()) != null;
  }
  mergeResults(textBetween, fromResult, toResult) {
    if (!fromResult.start.isOnlyWeekdayComponent() && !toResult.start.isOnlyWeekdayComponent()) {
      toResult.start.getCertainComponents().forEach((key) => {
        if (!fromResult.start.isCertain(key)) {
          fromResult.start.imply(key, toResult.start.get(key));
        }
      });
      fromResult.start.getCertainComponents().forEach((key) => {
        if (!toResult.start.isCertain(key)) {
          toResult.start.imply(key, fromResult.start.get(key));
        }
      });
    }
    if (fromResult.start.date().getTime() > toResult.start.date().getTime()) {
      let fromMoment = fromResult.start.dayjs();
      let toMoment = toResult.start.dayjs();
      if (toResult.start.isOnlyWeekdayComponent() && toMoment.add(7, "days").isAfter(fromMoment)) {
        toMoment = toMoment.add(7, "days");
        toResult.start.imply("day", toMoment.date());
        toResult.start.imply("month", toMoment.month() + 1);
        toResult.start.imply("year", toMoment.year());
      } else if (fromResult.start.isOnlyWeekdayComponent() && fromMoment.add(-7, "days").isBefore(toMoment)) {
        fromMoment = fromMoment.add(-7, "days");
        fromResult.start.imply("day", fromMoment.date());
        fromResult.start.imply("month", fromMoment.month() + 1);
        fromResult.start.imply("year", fromMoment.year());
      } else if (toResult.start.isDateWithUnknownYear() && toMoment.add(1, "years").isAfter(fromMoment)) {
        toMoment = toMoment.add(1, "years");
        toResult.start.imply("year", toMoment.year());
      } else if (fromResult.start.isDateWithUnknownYear() && fromMoment.add(-1, "years").isBefore(toMoment)) {
        fromMoment = fromMoment.add(-1, "years");
        fromResult.start.imply("year", fromMoment.year());
      } else {
        [toResult, fromResult] = [fromResult, toResult];
      }
    }
    const result = fromResult.clone();
    result.start = fromResult.start;
    result.end = toResult.start;
    result.index = Math.min(fromResult.index, toResult.index);
    if (fromResult.index < toResult.index) {
      result.text = fromResult.text + textBetween + toResult.text;
    } else {
      result.text = toResult.text + textBetween + fromResult.text;
    }
    return result;
  }
};

// node_modules/chrono-node/dist/esm/locales/en/refiners/ENMergeDateRangeRefiner.js
var ENMergeDateRangeRefiner = class extends AbstractMergeDateRangeRefiner {
  patternBetween() {
    return /^\s*(to|-|–|until|through|till)\s*$/i;
  }
};

// node_modules/chrono-node/dist/esm/calculation/mergingCalculation.js
function mergeDateTimeResult(dateResult, timeResult) {
  const result = dateResult.clone();
  const beginDate = dateResult.start;
  const beginTime = timeResult.start;
  result.start = mergeDateTimeComponent(beginDate, beginTime);
  if (dateResult.end != null || timeResult.end != null) {
    const endDate = dateResult.end == null ? dateResult.start : dateResult.end;
    const endTime = timeResult.end == null ? timeResult.start : timeResult.end;
    const endDateTime = mergeDateTimeComponent(endDate, endTime);
    if (dateResult.end == null && endDateTime.date().getTime() < result.start.date().getTime()) {
      const nextDayJs = endDateTime.dayjs().add(1, "day");
      if (endDateTime.isCertain("day")) {
        assignSimilarDate(endDateTime, nextDayJs);
      } else {
        implySimilarDate(endDateTime, nextDayJs);
      }
    }
    result.end = endDateTime;
  }
  return result;
}
function mergeDateTimeComponent(dateComponent, timeComponent) {
  const dateTimeComponent = dateComponent.clone();
  if (timeComponent.isCertain("hour")) {
    dateTimeComponent.assign("hour", timeComponent.get("hour"));
    dateTimeComponent.assign("minute", timeComponent.get("minute"));
    if (timeComponent.isCertain("second")) {
      dateTimeComponent.assign("second", timeComponent.get("second"));
      if (timeComponent.isCertain("millisecond")) {
        dateTimeComponent.assign("millisecond", timeComponent.get("millisecond"));
      } else {
        dateTimeComponent.imply("millisecond", timeComponent.get("millisecond"));
      }
    } else {
      dateTimeComponent.imply("second", timeComponent.get("second"));
      dateTimeComponent.imply("millisecond", timeComponent.get("millisecond"));
    }
  } else {
    dateTimeComponent.imply("hour", timeComponent.get("hour"));
    dateTimeComponent.imply("minute", timeComponent.get("minute"));
    dateTimeComponent.imply("second", timeComponent.get("second"));
    dateTimeComponent.imply("millisecond", timeComponent.get("millisecond"));
  }
  if (timeComponent.isCertain("timezoneOffset")) {
    dateTimeComponent.assign("timezoneOffset", timeComponent.get("timezoneOffset"));
  }
  if (timeComponent.isCertain("meridiem")) {
    dateTimeComponent.assign("meridiem", timeComponent.get("meridiem"));
  } else if (timeComponent.get("meridiem") != null && dateTimeComponent.get("meridiem") == null) {
    dateTimeComponent.imply("meridiem", timeComponent.get("meridiem"));
  }
  if (dateTimeComponent.get("meridiem") == Meridiem.PM && dateTimeComponent.get("hour") < 12) {
    if (timeComponent.isCertain("hour")) {
      dateTimeComponent.assign("hour", dateTimeComponent.get("hour") + 12);
    } else {
      dateTimeComponent.imply("hour", dateTimeComponent.get("hour") + 12);
    }
  }
  dateTimeComponent.addTags(dateComponent.tags());
  dateTimeComponent.addTags(timeComponent.tags());
  return dateTimeComponent;
}

// node_modules/chrono-node/dist/esm/common/refiners/AbstractMergeDateTimeRefiner.js
var AbstractMergeDateTimeRefiner = class extends MergingRefiner {
  shouldMergeResults(textBetween, currentResult, nextResult) {
    return (currentResult.start.isOnlyDate() && nextResult.start.isOnlyTime() || nextResult.start.isOnlyDate() && currentResult.start.isOnlyTime()) && textBetween.match(this.patternBetween()) != null;
  }
  mergeResults(textBetween, currentResult, nextResult) {
    const result = currentResult.start.isOnlyDate() ? mergeDateTimeResult(currentResult, nextResult) : mergeDateTimeResult(nextResult, currentResult);
    result.index = currentResult.index;
    result.text = currentResult.text + textBetween + nextResult.text;
    return result;
  }
};

// node_modules/chrono-node/dist/esm/locales/en/refiners/ENMergeDateTimeRefiner.js
var ENMergeDateTimeRefiner = class extends AbstractMergeDateTimeRefiner {
  patternBetween() {
    return new RegExp("^\\s*(T|at|after|before|on|of|,|-|\\.|\u2219|:)?\\s*$");
  }
};

// node_modules/chrono-node/dist/esm/common/refiners/ExtractTimezoneAbbrRefiner.js
var TIMEZONE_NAME_PATTERN = new RegExp("^\\s*,?\\s*\\(?([A-Z]{2,4})\\)?(?=\\W|$)", "i");
var ExtractTimezoneAbbrRefiner = class {
  constructor(timezoneOverrides) {
    this.timezoneOverrides = timezoneOverrides;
  }
  refine(context, results) {
    const timezoneOverrides = context.option.timezones ?? {};
    results.forEach((result) => {
      const suffix = context.text.substring(result.index + result.text.length);
      const match = TIMEZONE_NAME_PATTERN.exec(suffix);
      if (!match) {
        return;
      }
      const timezoneAbbr = match[1].toUpperCase();
      const refDate = result.start.date() ?? result.refDate ?? /* @__PURE__ */ new Date();
      const tzOverrides = { ...this.timezoneOverrides, ...timezoneOverrides };
      const extractedTimezoneOffset = toTimezoneOffset(timezoneAbbr, refDate, tzOverrides);
      if (extractedTimezoneOffset == null) {
        return;
      }
      context.debug(() => {
        console.log(`Extracting timezone: '${timezoneAbbr}' into: ${extractedTimezoneOffset} for: ${result.start}`);
      });
      const currentTimezoneOffset = result.start.get("timezoneOffset");
      if (currentTimezoneOffset !== null && extractedTimezoneOffset != currentTimezoneOffset) {
        if (result.start.isCertain("timezoneOffset")) {
          return;
        }
        if (timezoneAbbr != match[1]) {
          return;
        }
      }
      if (result.start.isOnlyDate()) {
        if (timezoneAbbr != match[1]) {
          return;
        }
      }
      result.text += match[0];
      if (!result.start.isCertain("timezoneOffset")) {
        result.start.assign("timezoneOffset", extractedTimezoneOffset);
      }
      if (result.end != null && !result.end.isCertain("timezoneOffset")) {
        result.end.assign("timezoneOffset", extractedTimezoneOffset);
      }
    });
    return results;
  }
};

// node_modules/chrono-node/dist/esm/common/refiners/ExtractTimezoneOffsetRefiner.js
var TIMEZONE_OFFSET_PATTERN = new RegExp("^\\s*(?:\\(?(?:GMT|UTC)\\s?)?([+-])(\\d{1,2})(?::?(\\d{2}))?\\)?", "i");
var TIMEZONE_OFFSET_SIGN_GROUP = 1;
var TIMEZONE_OFFSET_HOUR_OFFSET_GROUP = 2;
var TIMEZONE_OFFSET_MINUTE_OFFSET_GROUP = 3;
var ExtractTimezoneOffsetRefiner = class {
  refine(context, results) {
    results.forEach(function(result) {
      if (result.start.isCertain("timezoneOffset")) {
        return;
      }
      const suffix = context.text.substring(result.index + result.text.length);
      const match = TIMEZONE_OFFSET_PATTERN.exec(suffix);
      if (!match) {
        return;
      }
      context.debug(() => {
        console.log(`Extracting timezone: '${match[0]}' into : ${result}`);
      });
      const hourOffset = parseInt(match[TIMEZONE_OFFSET_HOUR_OFFSET_GROUP]);
      const minuteOffset = parseInt(match[TIMEZONE_OFFSET_MINUTE_OFFSET_GROUP] || "0");
      let timezoneOffset = hourOffset * 60 + minuteOffset;
      if (timezoneOffset > 14 * 60) {
        return;
      }
      if (match[TIMEZONE_OFFSET_SIGN_GROUP] === "-") {
        timezoneOffset = -timezoneOffset;
      }
      if (result.end != null) {
        result.end.assign("timezoneOffset", timezoneOffset);
      }
      result.start.assign("timezoneOffset", timezoneOffset);
      result.text += match[0];
    });
    return results;
  }
};

// node_modules/chrono-node/dist/esm/common/refiners/OverlapRemovalRefiner.js
var OverlapRemovalRefiner = class {
  refine(context, results) {
    if (results.length < 2) {
      return results;
    }
    const filteredResults = [];
    let prevResult = results[0];
    for (let i = 1; i < results.length; i++) {
      const result = results[i];
      if (result.index >= prevResult.index + prevResult.text.length) {
        filteredResults.push(prevResult);
        prevResult = result;
        continue;
      }
      let kept = null;
      let removed = null;
      if (result.text.length > prevResult.text.length) {
        kept = result;
        removed = prevResult;
      } else {
        kept = prevResult;
        removed = result;
      }
      context.debug(() => {
        console.log(`${this.constructor.name} remove ${removed} by ${kept}`);
      });
      prevResult = kept;
    }
    if (prevResult != null) {
      filteredResults.push(prevResult);
    }
    return filteredResults;
  }
};

// node_modules/chrono-node/dist/esm/common/refiners/ForwardDateRefiner.js
var import_dayjs6 = __toESM(require_dayjs_min(), 1);
var ForwardDateRefiner = class {
  refine(context, results) {
    if (!context.option.forwardDate) {
      return results;
    }
    results.forEach((result) => {
      let refMoment = (0, import_dayjs6.default)(context.refDate);
      if (result.start.isOnlyTime() && refMoment.isAfter(result.start.dayjs())) {
        refMoment = refMoment.add(1, "day");
        implySimilarDate(result.start, refMoment);
        if (result.end && result.end.isOnlyTime()) {
          implySimilarDate(result.end, refMoment);
          if (result.start.dayjs().isAfter(result.end.dayjs())) {
            refMoment = refMoment.add(1, "day");
            implySimilarDate(result.end, refMoment);
          }
        }
        context.debug(() => {
          console.log(`${this.constructor.name} adjusted ${result} time result (${result.start})`);
        });
      }
      if (result.start.isOnlyWeekdayComponent() && refMoment.isAfter(result.start.dayjs())) {
        if (refMoment.day() >= result.start.get("weekday")) {
          refMoment = refMoment.day(result.start.get("weekday") + 7);
        } else {
          refMoment = refMoment.day(result.start.get("weekday"));
        }
        result.start.imply("day", refMoment.date());
        result.start.imply("month", refMoment.month() + 1);
        result.start.imply("year", refMoment.year());
        context.debug(() => {
          console.log(`${this.constructor.name} adjusted ${result} weekday (${result.start})`);
        });
        if (result.end && result.end.isOnlyWeekdayComponent()) {
          if (refMoment.day() > result.end.get("weekday")) {
            refMoment = refMoment.day(result.end.get("weekday") + 7);
          } else {
            refMoment = refMoment.day(result.end.get("weekday"));
          }
          result.end.imply("day", refMoment.date());
          result.end.imply("month", refMoment.month() + 1);
          result.end.imply("year", refMoment.year());
          context.debug(() => {
            console.log(`${this.constructor.name} adjusted ${result} weekday (${result.end})`);
          });
        }
      }
      if (result.start.isDateWithUnknownYear() && refMoment.isAfter(result.start.dayjs())) {
        for (let i = 0; i < 3 && refMoment.isAfter(result.start.dayjs()); i++) {
          result.start.imply("year", result.start.get("year") + 1);
          context.debug(() => {
            console.log(`${this.constructor.name} adjusted ${result} year (${result.start})`);
          });
          if (result.end && !result.end.isCertain("year")) {
            result.end.imply("year", result.end.get("year") + 1);
            context.debug(() => {
              console.log(`${this.constructor.name} adjusted ${result} month (${result.start})`);
            });
          }
        }
      }
    });
    return results;
  }
};

// node_modules/chrono-node/dist/esm/common/refiners/UnlikelyFormatFilter.js
var UnlikelyFormatFilter = class extends Filter {
  constructor(strictMode) {
    super();
    this.strictMode = strictMode;
  }
  isValid(context, result) {
    if (result.text.replace(" ", "").match(/^\d*(\.\d*)?$/)) {
      context.debug(() => {
        console.log(`Removing unlikely result '${result.text}'`);
      });
      return false;
    }
    if (!result.start.isValidDate()) {
      context.debug(() => {
        console.log(`Removing invalid result: ${result} (${result.start})`);
      });
      return false;
    }
    if (result.end && !result.end.isValidDate()) {
      context.debug(() => {
        console.log(`Removing invalid result: ${result} (${result.end})`);
      });
      return false;
    }
    if (this.strictMode) {
      return this.isStrictModeValid(context, result);
    }
    return true;
  }
  isStrictModeValid(context, result) {
    if (result.start.isOnlyWeekdayComponent()) {
      context.debug(() => {
        console.log(`(Strict) Removing weekday only component: ${result} (${result.end})`);
      });
      return false;
    }
    if (result.start.isOnlyTime() && (!result.start.isCertain("hour") || !result.start.isCertain("minute"))) {
      context.debug(() => {
        console.log(`(Strict) Removing uncertain time component: ${result} (${result.end})`);
      });
      return false;
    }
    return true;
  }
};

// node_modules/chrono-node/dist/esm/common/parsers/ISOFormatParser.js
var PATTERN8 = new RegExp("([0-9]{4})\\-([0-9]{1,2})\\-([0-9]{1,2})(?:T([0-9]{1,2}):([0-9]{1,2})(?::([0-9]{1,2})(?:\\.(\\d{1,4}))?)?(Z|([+-]\\d{2}):?(\\d{2})?)?)?(?=\\W|$)", "i");
var YEAR_NUMBER_GROUP2 = 1;
var MONTH_NUMBER_GROUP2 = 2;
var DATE_NUMBER_GROUP2 = 3;
var HOUR_NUMBER_GROUP = 4;
var MINUTE_NUMBER_GROUP = 5;
var SECOND_NUMBER_GROUP = 6;
var MILLISECOND_NUMBER_GROUP = 7;
var TZD_GROUP = 8;
var TZD_HOUR_OFFSET_GROUP = 9;
var TZD_MINUTE_OFFSET_GROUP = 10;
var ISOFormatParser = class extends AbstractParserWithWordBoundaryChecking {
  innerPattern() {
    return PATTERN8;
  }
  innerExtract(context, match) {
    const components = context.createParsingComponents({
      "year": parseInt(match[YEAR_NUMBER_GROUP2]),
      "month": parseInt(match[MONTH_NUMBER_GROUP2]),
      "day": parseInt(match[DATE_NUMBER_GROUP2])
    });
    if (match[HOUR_NUMBER_GROUP] != null) {
      components.assign("hour", parseInt(match[HOUR_NUMBER_GROUP]));
      components.assign("minute", parseInt(match[MINUTE_NUMBER_GROUP]));
      if (match[SECOND_NUMBER_GROUP] != null) {
        components.assign("second", parseInt(match[SECOND_NUMBER_GROUP]));
      }
      if (match[MILLISECOND_NUMBER_GROUP] != null) {
        components.assign("millisecond", parseInt(match[MILLISECOND_NUMBER_GROUP]));
      }
      if (match[TZD_GROUP] != null) {
        let offset = 0;
        if (match[TZD_HOUR_OFFSET_GROUP]) {
          const hourOffset = parseInt(match[TZD_HOUR_OFFSET_GROUP]);
          let minuteOffset = 0;
          if (match[TZD_MINUTE_OFFSET_GROUP] != null) {
            minuteOffset = parseInt(match[TZD_MINUTE_OFFSET_GROUP]);
          }
          offset = hourOffset * 60;
          if (offset < 0) {
            offset -= minuteOffset;
          } else {
            offset += minuteOffset;
          }
        }
        components.assign("timezoneOffset", offset);
      }
    }
    return components.addTag("parser/ISOFormatParser");
  }
};

// node_modules/chrono-node/dist/esm/common/refiners/MergeWeekdayComponentRefiner.js
var MergeWeekdayComponentRefiner = class extends MergingRefiner {
  mergeResults(textBetween, currentResult, nextResult) {
    const newResult = nextResult.clone();
    newResult.index = currentResult.index;
    newResult.text = currentResult.text + textBetween + newResult.text;
    newResult.start.assign("weekday", currentResult.start.get("weekday"));
    if (newResult.end) {
      newResult.end.assign("weekday", currentResult.start.get("weekday"));
    }
    return newResult;
  }
  shouldMergeResults(textBetween, currentResult, nextResult) {
    const weekdayThenNormalDate = currentResult.start.isOnlyWeekdayComponent() && !currentResult.start.isCertain("hour") && nextResult.start.isCertain("day");
    return weekdayThenNormalDate && textBetween.match(/^,?\s*$/) != null;
  }
};

// node_modules/chrono-node/dist/esm/configurations.js
function includeCommonConfiguration(configuration2, strictMode = false) {
  configuration2.parsers.unshift(new ISOFormatParser());
  configuration2.refiners.unshift(new MergeWeekdayComponentRefiner());
  configuration2.refiners.unshift(new ExtractTimezoneOffsetRefiner());
  configuration2.refiners.unshift(new OverlapRemovalRefiner());
  configuration2.refiners.push(new ExtractTimezoneAbbrRefiner());
  configuration2.refiners.push(new OverlapRemovalRefiner());
  configuration2.refiners.push(new ForwardDateRefiner());
  configuration2.refiners.push(new UnlikelyFormatFilter(strictMode));
  return configuration2;
}

// node_modules/chrono-node/dist/esm/locales/en/parsers/ENCasualDateParser.js
var import_dayjs10 = __toESM(require_dayjs_min(), 1);

// node_modules/chrono-node/dist/esm/common/casualReferences.js
var import_dayjs8 = __toESM(require_dayjs_min(), 1);
function now(reference) {
  const targetDate = (0, import_dayjs8.default)(reference.instant);
  const component = new ParsingComponents(reference, {});
  assignSimilarDate(component, targetDate);
  assignSimilarTime(component, targetDate);
  if (reference.timezoneOffset !== null) {
    component.assign("timezoneOffset", targetDate.utcOffset());
  }
  component.addTag("casualReference/now");
  return component;
}
function today(reference) {
  const targetDate = (0, import_dayjs8.default)(reference.instant);
  const component = new ParsingComponents(reference, {});
  assignSimilarDate(component, targetDate);
  implySimilarTime(component, targetDate);
  component.addTag("casualReference/today");
  return component;
}
function yesterday(reference) {
  return theDayBefore(reference, 1).addTag("casualReference/yesterday");
}
function theDayBefore(reference, numDay) {
  return theDayAfter(reference, -numDay);
}
function tomorrow(reference) {
  return theDayAfter(reference, 1).addTag("casualReference/tomorrow");
}
function theDayAfter(reference, nDays) {
  let targetDate = (0, import_dayjs8.default)(reference.instant);
  const component = new ParsingComponents(reference, {});
  targetDate = targetDate.add(nDays, "day");
  assignSimilarDate(component, targetDate);
  implySimilarTime(component, targetDate);
  return component;
}
function tonight(reference, implyHour = 22) {
  const targetDate = (0, import_dayjs8.default)(reference.instant);
  const component = new ParsingComponents(reference, {});
  assignSimilarDate(component, targetDate);
  component.imply("hour", implyHour);
  component.imply("meridiem", Meridiem.PM);
  component.addTag("casualReference/tonight");
  return component;
}
function evening(reference, implyHour = 20) {
  const component = new ParsingComponents(reference, {});
  component.imply("meridiem", Meridiem.PM);
  component.imply("hour", implyHour);
  component.addTag("casualReference/evening");
  return component;
}
function midnight(reference) {
  const component = new ParsingComponents(reference, {});
  const targetDate = (0, import_dayjs8.default)(reference.instant);
  if (targetDate.hour() > 2) {
    implyTheNextDay(component, targetDate);
  }
  component.assign("hour", 0);
  component.imply("minute", 0);
  component.imply("second", 0);
  component.imply("millisecond", 0);
  component.addTag("casualReference/midnight");
  return component;
}
function morning(reference, implyHour = 6) {
  const component = new ParsingComponents(reference, {});
  component.imply("meridiem", Meridiem.AM);
  component.imply("hour", implyHour);
  component.imply("minute", 0);
  component.imply("second", 0);
  component.imply("millisecond", 0);
  component.addTag("casualReference/morning");
  return component;
}
function afternoon(reference, implyHour = 15) {
  const component = new ParsingComponents(reference, {});
  component.imply("meridiem", Meridiem.PM);
  component.imply("hour", implyHour);
  component.imply("minute", 0);
  component.imply("second", 0);
  component.imply("millisecond", 0);
  component.addTag("casualReference/afternoon");
  return component;
}
function noon(reference) {
  const component = new ParsingComponents(reference, {});
  component.imply("meridiem", Meridiem.AM);
  component.imply("hour", 12);
  component.imply("minute", 0);
  component.imply("second", 0);
  component.imply("millisecond", 0);
  component.addTag("casualReference/noon");
  return component;
}

// node_modules/chrono-node/dist/esm/locales/en/parsers/ENCasualDateParser.js
var PATTERN9 = /(now|today|tonight|tomorrow|tmr|tmrw|yesterday|last\s*night)(?=\W|$)/i;
var ENCasualDateParser = class extends AbstractParserWithWordBoundaryChecking {
  innerPattern(context) {
    return PATTERN9;
  }
  innerExtract(context, match) {
    let targetDate = (0, import_dayjs10.default)(context.refDate);
    const lowerText = match[0].toLowerCase();
    let component = context.createParsingComponents();
    switch (lowerText) {
      case "now":
        component = now(context.reference);
        break;
      case "today":
        component = today(context.reference);
        break;
      case "yesterday":
        component = yesterday(context.reference);
        break;
      case "tomorrow":
      case "tmr":
      case "tmrw":
        component = tomorrow(context.reference);
        break;
      case "tonight":
        component = tonight(context.reference);
        break;
      default:
        if (lowerText.match(/last\s*night/)) {
          if (targetDate.hour() > 6) {
            targetDate = targetDate.add(-1, "day");
          }
          assignSimilarDate(component, targetDate);
          component.imply("hour", 0);
        }
        break;
    }
    component.addTag("parser/ENCasualDateParser");
    return component;
  }
};

// node_modules/chrono-node/dist/esm/locales/en/parsers/ENCasualTimeParser.js
var PATTERN10 = /(?:this)?\s{0,3}(morning|afternoon|evening|night|midnight|midday|noon)(?=\W|$)/i;
var ENCasualTimeParser = class extends AbstractParserWithWordBoundaryChecking {
  innerPattern() {
    return PATTERN10;
  }
  innerExtract(context, match) {
    let component = null;
    switch (match[1].toLowerCase()) {
      case "afternoon":
        component = afternoon(context.reference);
        break;
      case "evening":
      case "night":
        component = evening(context.reference);
        break;
      case "midnight":
        component = midnight(context.reference);
        break;
      case "morning":
        component = morning(context.reference);
        break;
      case "noon":
      case "midday":
        component = noon(context.reference);
        break;
    }
    if (component) {
      component.addTag("parser/ENCasualTimeParser");
    }
    return component;
  }
};

// node_modules/chrono-node/dist/esm/common/calculation/weekdays.js
function createParsingComponentsAtWeekday(reference, weekday, modifier) {
  const refDate = reference.getDateWithAdjustedTimezone();
  const daysToWeekday = getDaysToWeekday(refDate, weekday, modifier);
  let components = new ParsingComponents(reference);
  components = addImpliedTimeUnits(components, { "day": daysToWeekday });
  components.assign("weekday", weekday);
  return components;
}
function getDaysToWeekday(refDate, weekday, modifier) {
  const refWeekday = refDate.getDay();
  switch (modifier) {
    case "this":
      return getDaysForwardToWeekday(refDate, weekday);
    case "last":
      return getBackwardDaysToWeekday(refDate, weekday);
    case "next":
      if (refWeekday == Weekday.SUNDAY) {
        return weekday == Weekday.SUNDAY ? 7 : weekday;
      }
      if (refWeekday == Weekday.SATURDAY) {
        if (weekday == Weekday.SATURDAY)
          return 7;
        if (weekday == Weekday.SUNDAY)
          return 8;
        return 1 + weekday;
      }
      if (weekday < refWeekday && weekday != Weekday.SUNDAY) {
        return getDaysForwardToWeekday(refDate, weekday);
      } else {
        return getDaysForwardToWeekday(refDate, weekday) + 7;
      }
  }
  return getDaysToWeekdayClosest(refDate, weekday);
}
function getDaysToWeekdayClosest(refDate, weekday) {
  const backward = getBackwardDaysToWeekday(refDate, weekday);
  const forward = getDaysForwardToWeekday(refDate, weekday);
  return forward < -backward ? forward : backward;
}
function getDaysForwardToWeekday(refDate, weekday) {
  const refWeekday = refDate.getDay();
  let forwardCount = weekday - refWeekday;
  if (forwardCount < 0) {
    forwardCount += 7;
  }
  return forwardCount;
}
function getBackwardDaysToWeekday(refDate, weekday) {
  const refWeekday = refDate.getDay();
  let backwardCount = weekday - refWeekday;
  if (backwardCount >= 0) {
    backwardCount -= 7;
  }
  return backwardCount;
}

// node_modules/chrono-node/dist/esm/locales/en/parsers/ENWeekdayParser.js
var PATTERN11 = new RegExp(`(?:(?:\\,|\\(|\\\uFF08)\\s*)?(?:on\\s*?)?(?:(this|last|past|next)\\s*)?(${matchAnyPattern(WEEKDAY_DICTIONARY)}|weekend|weekday)(?:\\s*(?:\\,|\\)|\\\uFF09))?(?:\\s*(this|last|past|next)\\s*week)?(?=\\W|$)`, "i");
var PREFIX_GROUP2 = 1;
var WEEKDAY_GROUP = 2;
var POSTFIX_GROUP = 3;
var ENWeekdayParser = class extends AbstractParserWithWordBoundaryChecking {
  innerPattern() {
    return PATTERN11;
  }
  innerExtract(context, match) {
    const prefix = match[PREFIX_GROUP2];
    const postfix = match[POSTFIX_GROUP];
    let modifierWord = prefix || postfix;
    modifierWord = modifierWord || "";
    modifierWord = modifierWord.toLowerCase();
    let modifier = null;
    if (modifierWord == "last" || modifierWord == "past") {
      modifier = "last";
    } else if (modifierWord == "next") {
      modifier = "next";
    } else if (modifierWord == "this") {
      modifier = "this";
    }
    const weekday_word = match[WEEKDAY_GROUP].toLowerCase();
    let weekday;
    if (WEEKDAY_DICTIONARY[weekday_word] !== void 0) {
      weekday = WEEKDAY_DICTIONARY[weekday_word];
    } else if (weekday_word == "weekend") {
      weekday = modifier == "last" ? Weekday.SUNDAY : Weekday.SATURDAY;
    } else if (weekday_word == "weekday") {
      const refWeekday = context.reference.getDateWithAdjustedTimezone().getDay();
      if (refWeekday == Weekday.SUNDAY || refWeekday == Weekday.SATURDAY) {
        weekday = modifier == "last" ? Weekday.FRIDAY : Weekday.MONDAY;
      } else {
        weekday = refWeekday - 1;
        weekday = modifier == "last" ? weekday - 1 : weekday + 1;
        weekday = weekday % 5 + 1;
      }
    } else {
      return null;
    }
    return createParsingComponentsAtWeekday(context.reference, weekday, modifier);
  }
};

// node_modules/chrono-node/dist/esm/locales/en/parsers/ENRelativeDateFormatParser.js
var import_dayjs12 = __toESM(require_dayjs_min(), 1);
var PATTERN12 = new RegExp(`(this|last|past|next|after\\s*this)\\s*(${matchAnyPattern(TIME_UNIT_DICTIONARY)})(?=\\s*)(?=\\W|$)`, "i");
var MODIFIER_WORD_GROUP = 1;
var RELATIVE_WORD_GROUP = 2;
var ENRelativeDateFormatParser = class extends AbstractParserWithWordBoundaryChecking {
  innerPattern() {
    return PATTERN12;
  }
  innerExtract(context, match) {
    const modifier = match[MODIFIER_WORD_GROUP].toLowerCase();
    const unitWord = match[RELATIVE_WORD_GROUP].toLowerCase();
    const timeunit = TIME_UNIT_DICTIONARY[unitWord];
    if (modifier == "next" || modifier.startsWith("after")) {
      const timeUnits = {};
      timeUnits[timeunit] = 1;
      return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
    if (modifier == "last" || modifier == "past") {
      const timeUnits = {};
      timeUnits[timeunit] = -1;
      return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
    const components = context.createParsingComponents();
    let date = (0, import_dayjs12.default)(context.reference.instant);
    if (unitWord.match(/week/i)) {
      date = date.add(-date.get("d"), "d");
      components.imply("day", date.date());
      components.imply("month", date.month() + 1);
      components.imply("year", date.year());
    } else if (unitWord.match(/month/i)) {
      date = date.add(-date.date() + 1, "d");
      components.imply("day", date.date());
      components.assign("year", date.year());
      components.assign("month", date.month() + 1);
    } else if (unitWord.match(/year/i)) {
      date = date.add(-date.date() + 1, "d");
      date = date.add(-date.month(), "month");
      components.imply("day", date.date());
      components.imply("month", date.month() + 1);
      components.assign("year", date.year());
    }
    return components;
  }
};

// node_modules/chrono-node/dist/esm/common/parsers/SlashDateFormatParser.js
var PATTERN13 = new RegExp("([^\\d]|^)([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})(?:[\\/\\.\\-]([0-9]{4}|[0-9]{2}))?(\\W|$)", "i");
var OPENING_GROUP = 1;
var ENDING_GROUP = 5;
var FIRST_NUMBERS_GROUP = 2;
var SECOND_NUMBERS_GROUP = 3;
var YEAR_GROUP5 = 4;
var SlashDateFormatParser = class {
  constructor(littleEndian) {
    this.groupNumberMonth = littleEndian ? SECOND_NUMBERS_GROUP : FIRST_NUMBERS_GROUP;
    this.groupNumberDay = littleEndian ? FIRST_NUMBERS_GROUP : SECOND_NUMBERS_GROUP;
  }
  pattern() {
    return PATTERN13;
  }
  extract(context, match) {
    const index = match.index + match[OPENING_GROUP].length;
    const indexEnd = match.index + match[0].length - match[ENDING_GROUP].length;
    if (index > 0) {
      const textBefore = context.text.substring(0, index);
      if (textBefore.match("\\d/?$")) {
        return;
      }
    }
    if (indexEnd < context.text.length) {
      const textAfter = context.text.substring(indexEnd);
      if (textAfter.match("^/?\\d")) {
        return;
      }
    }
    const text = context.text.substring(index, indexEnd);
    if (text.match(/^\d\.\d$/) || text.match(/^\d\.\d{1,2}\.\d{1,2}\s*$/)) {
      return;
    }
    if (!match[YEAR_GROUP5] && text.indexOf("/") < 0) {
      return;
    }
    const result = context.createParsingResult(index, text);
    let month = parseInt(match[this.groupNumberMonth]);
    let day = parseInt(match[this.groupNumberDay]);
    if (month < 1 || month > 12) {
      if (month > 12) {
        if (day >= 1 && day <= 12 && month <= 31) {
          [day, month] = [month, day];
        } else {
          return null;
        }
      }
    }
    if (day < 1 || day > 31) {
      return null;
    }
    result.start.assign("day", day);
    result.start.assign("month", month);
    if (match[YEAR_GROUP5]) {
      const rawYearNumber = parseInt(match[YEAR_GROUP5]);
      const year = findMostLikelyADYear(rawYearNumber);
      result.start.assign("year", year);
    } else {
      const year = findYearClosestToRef(context.refDate, day, month);
      result.start.imply("year", year);
    }
    return result.addTag("parser/SlashDateFormatParser");
  }
};

// node_modules/chrono-node/dist/esm/locales/en/parsers/ENTimeUnitCasualRelativeFormatParser.js
var PATTERN14 = new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
var PATTERN_NO_ABBR = new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${TIME_UNITS_NO_ABBR_PATTERN})(?=\\W|$)`, "i");
var ENTimeUnitCasualRelativeFormatParser = class extends AbstractParserWithWordBoundaryChecking {
  constructor(allowAbbreviations = true) {
    super();
    this.allowAbbreviations = allowAbbreviations;
  }
  innerPattern() {
    return this.allowAbbreviations ? PATTERN14 : PATTERN_NO_ABBR;
  }
  innerExtract(context, match) {
    const prefix = match[1].toLowerCase();
    let timeUnits = parseTimeUnits(match[2]);
    if (!timeUnits) {
      return null;
    }
    switch (prefix) {
      case "last":
      case "past":
      case "-":
        timeUnits = reverseTimeUnits(timeUnits);
        break;
    }
    return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
  }
};

// node_modules/chrono-node/dist/esm/locales/en/refiners/ENMergeRelativeAfterDateRefiner.js
function IsPositiveFollowingReference(result) {
  return result.text.match(/^[+-]/i) != null;
}
function IsNegativeFollowingReference(result) {
  return result.text.match(/^-/i) != null;
}
var ENMergeRelativeAfterDateRefiner = class extends MergingRefiner {
  shouldMergeResults(textBetween, currentResult, nextResult) {
    if (!textBetween.match(/^\s*$/i)) {
      return false;
    }
    return IsPositiveFollowingReference(nextResult) || IsNegativeFollowingReference(nextResult);
  }
  mergeResults(textBetween, currentResult, nextResult, context) {
    let timeUnits = parseTimeUnits(nextResult.text);
    if (IsNegativeFollowingReference(nextResult)) {
      timeUnits = reverseTimeUnits(timeUnits);
    }
    const components = ParsingComponents.createRelativeFromReference(new ReferenceWithTimezone(currentResult.start.date()), timeUnits);
    return new ParsingResult(currentResult.reference, currentResult.index, `${currentResult.text}${textBetween}${nextResult.text}`, components);
  }
};

// node_modules/chrono-node/dist/esm/locales/en/refiners/ENMergeRelativeFollowByDateRefiner.js
function hasImpliedEarlierReferenceDate(result) {
  return result.text.match(/\s+(before|from)$/i) != null;
}
function hasImpliedLaterReferenceDate(result) {
  return result.text.match(/\s+(after|since)$/i) != null;
}
var ENMergeRelativeFollowByDateRefiner = class extends MergingRefiner {
  patternBetween() {
    return /^\s*$/i;
  }
  shouldMergeResults(textBetween, currentResult, nextResult) {
    if (!textBetween.match(this.patternBetween())) {
      return false;
    }
    if (!hasImpliedEarlierReferenceDate(currentResult) && !hasImpliedLaterReferenceDate(currentResult)) {
      return false;
    }
    return !!nextResult.start.get("day") && !!nextResult.start.get("month") && !!nextResult.start.get("year");
  }
  mergeResults(textBetween, currentResult, nextResult) {
    let timeUnits = parseTimeUnits(currentResult.text);
    if (hasImpliedEarlierReferenceDate(currentResult)) {
      timeUnits = reverseTimeUnits(timeUnits);
    }
    const components = ParsingComponents.createRelativeFromReference(new ReferenceWithTimezone(nextResult.start.date()), timeUnits);
    return new ParsingResult(nextResult.reference, currentResult.index, `${currentResult.text}${textBetween}${nextResult.text}`, components);
  }
};

// node_modules/chrono-node/dist/esm/locales/en/refiners/ENExtractYearSuffixRefiner.js
var YEAR_SUFFIX_PATTERN = new RegExp(`^\\s*(${YEAR_PATTERN})`, "i");
var YEAR_GROUP6 = 1;
var ENExtractYearSuffixRefiner = class {
  refine(context, results) {
    results.forEach(function(result) {
      if (!result.start.isDateWithUnknownYear()) {
        return;
      }
      const suffix = context.text.substring(result.index + result.text.length);
      const match = YEAR_SUFFIX_PATTERN.exec(suffix);
      if (!match) {
        return;
      }
      context.debug(() => {
        console.log(`Extracting year: '${match[0]}' into : ${result}`);
      });
      const year = parseYear(match[YEAR_GROUP6]);
      if (result.end != null) {
        result.end.assign("year", year);
      }
      result.start.assign("year", year);
      result.text += match[0];
    });
    return results;
  }
};

// node_modules/chrono-node/dist/esm/locales/en/refiners/ENUnlikelyFormatFilter.js
var ENUnlikelyFormatFilter = class extends Filter {
  constructor() {
    super();
  }
  isValid(context, result) {
    const text = result.text.trim();
    if (text === context.text.trim()) {
      return true;
    }
    if (text.toLowerCase() === "may") {
      const textBefore = context.text.substring(0, result.index).trim();
      if (!textBefore.match(/\b(in)$/i)) {
        context.debug(() => {
          console.log(`Removing unlikely result: ${result}`);
        });
        return false;
      }
    }
    if (text.toLowerCase().endsWith("the second")) {
      const textAfter = context.text.substring(result.index + result.text.length).trim();
      if (textAfter.length > 0) {
        context.debug(() => {
          console.log(`Removing unlikely result: ${result}`);
        });
      }
      return false;
    }
    return true;
  }
};

// node_modules/chrono-node/dist/esm/locales/en/configuration.js
var ENDefaultConfiguration = class {
  createCasualConfiguration(littleEndian = false) {
    const option = this.createConfiguration(false, littleEndian);
    option.parsers.push(new ENCasualDateParser());
    option.parsers.push(new ENCasualTimeParser());
    option.parsers.push(new ENMonthNameParser());
    option.parsers.push(new ENRelativeDateFormatParser());
    option.parsers.push(new ENTimeUnitCasualRelativeFormatParser());
    option.refiners.push(new ENUnlikelyFormatFilter());
    return option;
  }
  createConfiguration(strictMode = true, littleEndian = false) {
    const options = includeCommonConfiguration({
      parsers: [
        new SlashDateFormatParser(littleEndian),
        new ENTimeUnitWithinFormatParser(strictMode),
        new ENMonthNameLittleEndianParser(),
        new ENMonthNameMiddleEndianParser(littleEndian),
        new ENWeekdayParser(),
        new ENSlashMonthFormatParser(),
        new ENTimeExpressionParser(strictMode),
        new ENTimeUnitAgoFormatParser(strictMode),
        new ENTimeUnitLaterFormatParser(strictMode)
      ],
      refiners: [new ENMergeDateTimeRefiner()]
    }, strictMode);
    options.parsers.unshift(new ENYearMonthDayParser(strictMode));
    options.refiners.unshift(new ENMergeRelativeFollowByDateRefiner());
    options.refiners.unshift(new ENMergeRelativeAfterDateRefiner());
    options.refiners.unshift(new OverlapRemovalRefiner());
    options.refiners.push(new ENMergeDateTimeRefiner());
    options.refiners.push(new ENExtractYearSuffixRefiner());
    options.refiners.push(new ENMergeDateRangeRefiner());
    return options;
  }
};

// node_modules/chrono-node/dist/esm/chrono.js
var Chrono = class _Chrono {
  constructor(configuration2) {
    this.defaultConfig = new ENDefaultConfiguration();
    configuration2 = configuration2 || this.defaultConfig.createCasualConfiguration();
    this.parsers = [...configuration2.parsers];
    this.refiners = [...configuration2.refiners];
  }
  clone() {
    return new _Chrono({
      parsers: [...this.parsers],
      refiners: [...this.refiners]
    });
  }
  parseDate(text, referenceDate, option) {
    const results = this.parse(text, referenceDate, option);
    return results.length > 0 ? results[0].start.date() : null;
  }
  parse(text, referenceDate, option) {
    const context = new ParsingContext(text, referenceDate, option);
    let results = [];
    this.parsers.forEach((parser) => {
      const parsedResults = _Chrono.executeParser(context, parser);
      results = results.concat(parsedResults);
    });
    results.sort((a, b) => {
      return a.index - b.index;
    });
    this.refiners.forEach(function(refiner) {
      results = refiner.refine(context, results);
    });
    return results;
  }
  static executeParser(context, parser) {
    const results = [];
    const pattern = parser.pattern(context);
    const originalText = context.text;
    let remainingText = context.text;
    let match = pattern.exec(remainingText);
    while (match) {
      const index = match.index + originalText.length - remainingText.length;
      match.index = index;
      const result = parser.extract(context, match);
      if (!result) {
        remainingText = originalText.substring(match.index + 1);
        match = pattern.exec(remainingText);
        continue;
      }
      let parsedResult = null;
      if (result instanceof ParsingResult) {
        parsedResult = result;
      } else if (result instanceof ParsingComponents) {
        parsedResult = context.createParsingResult(match.index, match[0]);
        parsedResult.start = result;
      } else {
        parsedResult = context.createParsingResult(match.index, match[0], result);
      }
      const parsedIndex = parsedResult.index;
      const parsedText = parsedResult.text;
      context.debug(() => console.log(`${parser.constructor.name} extracted (at index=${parsedIndex}) '${parsedText}'`));
      results.push(parsedResult);
      remainingText = originalText.substring(parsedIndex + parsedText.length);
      match = pattern.exec(remainingText);
    }
    return results;
  }
};
var ParsingContext = class {
  constructor(text, refDate, option) {
    this.text = text;
    this.reference = new ReferenceWithTimezone(refDate);
    this.option = option ?? {};
    this.refDate = this.reference.instant;
  }
  createParsingComponents(components) {
    if (components instanceof ParsingComponents) {
      return components;
    }
    return new ParsingComponents(this.reference, components);
  }
  createParsingResult(index, textOrEndIndex, startComponents, endComponents) {
    const text = typeof textOrEndIndex === "string" ? textOrEndIndex : this.text.substring(index, textOrEndIndex);
    const start = startComponents ? this.createParsingComponents(startComponents) : null;
    const end = endComponents ? this.createParsingComponents(endComponents) : null;
    return new ParsingResult(this.reference, index, text, start, end);
  }
  debug(block) {
    if (this.option.debug) {
      if (this.option.debug instanceof Function) {
        this.option.debug(block);
      } else {
        const handler = this.option.debug;
        handler.debug(block);
      }
    }
  }
};

// node_modules/chrono-node/dist/esm/locales/en/index.js
var configuration = new ENDefaultConfiguration();
var casual = new Chrono(configuration.createCasualConfiguration(false));
var strict = new Chrono(configuration.createConfiguration(true, false));
var GB = new Chrono(configuration.createCasualConfiguration(true));

// node_modules/chrono-node/dist/esm/index.js
var casual2 = casual;
function parseDate(text, ref, option) {
  return casual2.parseDate(text, ref, option);
}

// src/date-time.tsx
var import_dayjs13 = __toESM(require_dayjs_min());
var import_advancedFormat = __toESM(require_advancedFormat());
var import_weekOfYear = __toESM(require_weekOfYear());
var import_utc = __toESM(require_utc());
var import_timezone3 = __toESM(require_timezone());
var import_relativeTime = __toESM(require_relativeTime());
import_dayjs13.default.extend(import_advancedFormat.default);
import_dayjs13.default.extend(import_weekOfYear.default);
import_dayjs13.default.extend(import_utc.default);
import_dayjs13.default.extend(import_timezone3.default);
import_dayjs13.default.extend(import_relativeTime.default);
function handleConversion(input, timezone) {
  if (input.match(/^\d+$/)) {
    input = new Date(parseInt(input, 10) * 1e3).toString();
  }
  const parsedDate = parseDate(input);
  if (!parsedDate || parsedDate.toString() === "Invalid Date") return [];
  const date = (0, import_dayjs13.default)(parsedDate).tz(timezone);
  const fromNow = date.fromNow();
  return [
    { label: "Unix (s)", value: date.unix() },
    { label: "Unix (ms)", value: date.valueOf() },
    { label: "Human Readable", value: date.format("MMMM Do, YYYY [at] hh:mm:ss A (zzz)") },
    { label: "DateTime", value: date.format("YYYY-MM-DD HH:mm:ss") },
    { label: "UTC", value: date.toString() },
    { label: "ISO 8601", value: date.toISOString() },
    { label: "Week of Year", value: date.format("wo dddd [of] YYYY") },
    { label: "In / Ago", value: String(fromNow).charAt(0).toUpperCase() + String(fromNow).slice(1) }
  ];
}
function Command() {
  const [input, setInput] = (0, import_react.useState)("now");
  const [timezone, setTimezone] = (0, import_react.useState)(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [items, setItems] = (0, import_react.useState)([]);
  async function onTimezoneChange(value) {
    setTimezone(value);
    setItems(handleConversion(input, value));
  }
  async function onSearchTextChange(value) {
    setInput(value);
    setItems(handleConversion(value, timezone));
  }
  return /* @__PURE__ */ _jsx(
    import_api.List,
    {
      searchBarPlaceholder: "Date",
      filtering: false,
      searchText: input,
      onSearchTextChange,
      searchBarAccessory: /* @__PURE__ */ _jsx(import_api.List.Dropdown, { tooltip: "Timezone", onChange: onTimezoneChange, defaultValue: timezone }, Intl.supportedValuesOf("timeZone").map((zone, index) => /* @__PURE__ */ _jsx(import_api.List.Dropdown.Item, { key: index, value: zone, title: zone })))
    },
    items.map((item, index) => /* @__PURE__ */ _jsx(
      import_api.List.Item,
      {
        key: index,
        title: `${item.value}`,
        accessories: [{ tag: { value: item.label, color: import_api.Color.SecondaryText } }],
        actions: /* @__PURE__ */ _jsx(import_api.ActionPanel, null, /* @__PURE__ */ _jsx(import_api.Action.CopyToClipboard, { content: item.value }), /* @__PURE__ */ _jsx(import_api.Action.Paste, { content: item.value }))
      }
    ))
  );
}
var date_time_default = Command;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL2RheWpzL3BsdWdpbi9xdWFydGVyT2ZZZWFyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kYXlqcy9kYXlqcy5taW4uanMiLCAiLi4vbm9kZV9tb2R1bGVzL2RheWpzL3BsdWdpbi9hZHZhbmNlZEZvcm1hdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZGF5anMvcGx1Z2luL3dlZWtPZlllYXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2RheWpzL3BsdWdpbi91dGMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2RheWpzL3BsdWdpbi90aW1lem9uZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZGF5anMvcGx1Z2luL3JlbGF0aXZlVGltZS5qcyIsICIuLi9zcmMvZGF0ZS10aW1lLnRzeCIsICIuLi9ub2RlX21vZHVsZXMvY2hyb25vLW5vZGUvc3JjL3Jlc3VsdHMudHMiLCAiLi4vbm9kZV9tb2R1bGVzL2Nocm9uby1ub2RlL3NyYy90eXBlcy50cyIsICIuLi9ub2RlX21vZHVsZXMvY2hyb25vLW5vZGUvc3JjL3V0aWxzL2RheWpzLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvdGltZXpvbmUudHMiLCAiLi4vbm9kZV9tb2R1bGVzL2Nocm9uby1ub2RlL3NyYy91dGlscy9wYXR0ZXJuLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvY2FsY3VsYXRpb24veWVhcnMudHMiLCAiLi4vbm9kZV9tb2R1bGVzL2Nocm9uby1ub2RlL3NyYy9sb2NhbGVzL2VuL2NvbnN0YW50cy50cyIsICIuLi9ub2RlX21vZHVsZXMvY2hyb25vLW5vZGUvc3JjL2NvbW1vbi9wYXJzZXJzL0Fic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeS50cyIsICIuLi9ub2RlX21vZHVsZXMvY2hyb25vLW5vZGUvc3JjL2xvY2FsZXMvZW4vcGFyc2Vycy9FTlRpbWVVbml0V2l0aGluRm9ybWF0UGFyc2VyLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvbG9jYWxlcy9lbi9wYXJzZXJzL0VOTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvbG9jYWxlcy9lbi9wYXJzZXJzL0VOTW9udGhOYW1lTWlkZGxlRW5kaWFuUGFyc2VyLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvbG9jYWxlcy9lbi9wYXJzZXJzL0VOTW9udGhOYW1lUGFyc2VyLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvbG9jYWxlcy9lbi9wYXJzZXJzL0VOWWVhck1vbnRoRGF5UGFyc2VyLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvbG9jYWxlcy9lbi9wYXJzZXJzL0VOU2xhc2hNb250aEZvcm1hdFBhcnNlci50cyIsICIuLi9ub2RlX21vZHVsZXMvY2hyb25vLW5vZGUvc3JjL2NvbW1vbi9wYXJzZXJzL0Fic3RyYWN0VGltZUV4cHJlc3Npb25QYXJzZXIudHMiLCAiLi4vbm9kZV9tb2R1bGVzL2Nocm9uby1ub2RlL3NyYy9sb2NhbGVzL2VuL3BhcnNlcnMvRU5UaW1lRXhwcmVzc2lvblBhcnNlci50cyIsICIuLi9ub2RlX21vZHVsZXMvY2hyb25vLW5vZGUvc3JjL3V0aWxzL3RpbWV1bml0cy50cyIsICIuLi9ub2RlX21vZHVsZXMvY2hyb25vLW5vZGUvc3JjL2xvY2FsZXMvZW4vcGFyc2Vycy9FTlRpbWVVbml0QWdvRm9ybWF0UGFyc2VyLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvbG9jYWxlcy9lbi9wYXJzZXJzL0VOVGltZVVuaXRMYXRlckZvcm1hdFBhcnNlci50cyIsICIuLi9ub2RlX21vZHVsZXMvY2hyb25vLW5vZGUvc3JjL2NvbW1vbi9hYnN0cmFjdFJlZmluZXJzLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvY29tbW9uL3JlZmluZXJzL0Fic3RyYWN0TWVyZ2VEYXRlUmFuZ2VSZWZpbmVyLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvbG9jYWxlcy9lbi9yZWZpbmVycy9FTk1lcmdlRGF0ZVJhbmdlUmVmaW5lci50cyIsICIuLi9ub2RlX21vZHVsZXMvY2hyb25vLW5vZGUvc3JjL2NhbGN1bGF0aW9uL21lcmdpbmdDYWxjdWxhdGlvbi50cyIsICIuLi9ub2RlX21vZHVsZXMvY2hyb25vLW5vZGUvc3JjL2NvbW1vbi9yZWZpbmVycy9BYnN0cmFjdE1lcmdlRGF0ZVRpbWVSZWZpbmVyLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvbG9jYWxlcy9lbi9yZWZpbmVycy9FTk1lcmdlRGF0ZVRpbWVSZWZpbmVyLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvY29tbW9uL3JlZmluZXJzL0V4dHJhY3RUaW1lem9uZUFiYnJSZWZpbmVyLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvY29tbW9uL3JlZmluZXJzL0V4dHJhY3RUaW1lem9uZU9mZnNldFJlZmluZXIudHMiLCAiLi4vbm9kZV9tb2R1bGVzL2Nocm9uby1ub2RlL3NyYy9jb21tb24vcmVmaW5lcnMvT3ZlcmxhcFJlbW92YWxSZWZpbmVyLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvY29tbW9uL3JlZmluZXJzL0ZvcndhcmREYXRlUmVmaW5lci50cyIsICIuLi9ub2RlX21vZHVsZXMvY2hyb25vLW5vZGUvc3JjL2NvbW1vbi9yZWZpbmVycy9Vbmxpa2VseUZvcm1hdEZpbHRlci50cyIsICIuLi9ub2RlX21vZHVsZXMvY2hyb25vLW5vZGUvc3JjL2NvbW1vbi9wYXJzZXJzL0lTT0Zvcm1hdFBhcnNlci50cyIsICIuLi9ub2RlX21vZHVsZXMvY2hyb25vLW5vZGUvc3JjL2NvbW1vbi9yZWZpbmVycy9NZXJnZVdlZWtkYXlDb21wb25lbnRSZWZpbmVyLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvY29uZmlndXJhdGlvbnMudHMiLCAiLi4vbm9kZV9tb2R1bGVzL2Nocm9uby1ub2RlL3NyYy9sb2NhbGVzL2VuL3BhcnNlcnMvRU5DYXN1YWxEYXRlUGFyc2VyLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvY29tbW9uL2Nhc3VhbFJlZmVyZW5jZXMudHMiLCAiLi4vbm9kZV9tb2R1bGVzL2Nocm9uby1ub2RlL3NyYy9sb2NhbGVzL2VuL3BhcnNlcnMvRU5DYXN1YWxUaW1lUGFyc2VyLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvY29tbW9uL2NhbGN1bGF0aW9uL3dlZWtkYXlzLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvbG9jYWxlcy9lbi9wYXJzZXJzL0VOV2Vla2RheVBhcnNlci50cyIsICIuLi9ub2RlX21vZHVsZXMvY2hyb25vLW5vZGUvc3JjL2xvY2FsZXMvZW4vcGFyc2Vycy9FTlJlbGF0aXZlRGF0ZUZvcm1hdFBhcnNlci50cyIsICIuLi9ub2RlX21vZHVsZXMvY2hyb25vLW5vZGUvc3JjL2NvbW1vbi9wYXJzZXJzL1NsYXNoRGF0ZUZvcm1hdFBhcnNlci50cyIsICIuLi9ub2RlX21vZHVsZXMvY2hyb25vLW5vZGUvc3JjL2xvY2FsZXMvZW4vcGFyc2Vycy9FTlRpbWVVbml0Q2FzdWFsUmVsYXRpdmVGb3JtYXRQYXJzZXIudHMiLCAiLi4vbm9kZV9tb2R1bGVzL2Nocm9uby1ub2RlL3NyYy9sb2NhbGVzL2VuL3JlZmluZXJzL0VOTWVyZ2VSZWxhdGl2ZUFmdGVyRGF0ZVJlZmluZXIudHMiLCAiLi4vbm9kZV9tb2R1bGVzL2Nocm9uby1ub2RlL3NyYy9sb2NhbGVzL2VuL3JlZmluZXJzL0VOTWVyZ2VSZWxhdGl2ZUZvbGxvd0J5RGF0ZVJlZmluZXIudHMiLCAiLi4vbm9kZV9tb2R1bGVzL2Nocm9uby1ub2RlL3NyYy9sb2NhbGVzL2VuL3JlZmluZXJzL0VORXh0cmFjdFllYXJTdWZmaXhSZWZpbmVyLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvbG9jYWxlcy9lbi9yZWZpbmVycy9FTlVubGlrZWx5Rm9ybWF0RmlsdGVyLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvbG9jYWxlcy9lbi9jb25maWd1cmF0aW9uLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvY2hyb25vLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9jaHJvbm8tbm9kZS9zcmMvbG9jYWxlcy9lbi9pbmRleC50cyIsICIuLi9ub2RlX21vZHVsZXMvY2hyb25vLW5vZGUvc3JjL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIhZnVuY3Rpb24odCxuKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1uKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShuKToodD1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOnR8fHNlbGYpLmRheWpzX3BsdWdpbl9xdWFydGVyT2ZZZWFyPW4oKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgdD1cIm1vbnRoXCIsbj1cInF1YXJ0ZXJcIjtyZXR1cm4gZnVuY3Rpb24oZSxpKXt2YXIgcj1pLnByb3RvdHlwZTtyLnF1YXJ0ZXI9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuJHV0aWxzKCkudSh0KT9NYXRoLmNlaWwoKHRoaXMubW9udGgoKSsxKS8zKTp0aGlzLm1vbnRoKHRoaXMubW9udGgoKSUzKzMqKHQtMSkpfTt2YXIgcz1yLmFkZDtyLmFkZD1mdW5jdGlvbihlLGkpe3JldHVybiBlPU51bWJlcihlKSx0aGlzLiR1dGlscygpLnAoaSk9PT1uP3RoaXMuYWRkKDMqZSx0KTpzLmJpbmQodGhpcykoZSxpKX07dmFyIHU9ci5zdGFydE9mO3Iuc3RhcnRPZj1mdW5jdGlvbihlLGkpe3ZhciByPXRoaXMuJHV0aWxzKCkscz0hIXIudShpKXx8aTtpZihyLnAoZSk9PT1uKXt2YXIgbz10aGlzLnF1YXJ0ZXIoKS0xO3JldHVybiBzP3RoaXMubW9udGgoMypvKS5zdGFydE9mKHQpLnN0YXJ0T2YoXCJkYXlcIik6dGhpcy5tb250aCgzKm8rMikuZW5kT2YodCkuZW5kT2YoXCJkYXlcIil9cmV0dXJuIHUuYmluZCh0aGlzKShlLGkpfX19KSk7IiwgIiFmdW5jdGlvbih0LGUpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWUoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGUpOih0PVwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6dHx8c2VsZikuZGF5anM9ZSgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciB0PTFlMyxlPTZlNCxuPTM2ZTUscj1cIm1pbGxpc2Vjb25kXCIsaT1cInNlY29uZFwiLHM9XCJtaW51dGVcIix1PVwiaG91clwiLGE9XCJkYXlcIixvPVwid2Vla1wiLGM9XCJtb250aFwiLGY9XCJxdWFydGVyXCIsaD1cInllYXJcIixkPVwiZGF0ZVwiLGw9XCJJbnZhbGlkIERhdGVcIiwkPS9eKFxcZHs0fSlbLS9dPyhcXGR7MSwyfSk/Wy0vXT8oXFxkezAsMn0pW1R0XFxzXSooXFxkezEsMn0pPzo/KFxcZHsxLDJ9KT86PyhcXGR7MSwyfSk/Wy46XT8oXFxkKyk/JC8seT0vXFxbKFteXFxdXSspXXxZezEsNH18TXsxLDR9fER7MSwyfXxkezEsNH18SHsxLDJ9fGh7MSwyfXxhfEF8bXsxLDJ9fHN7MSwyfXxaezEsMn18U1NTL2csTT17bmFtZTpcImVuXCIsd2Vla2RheXM6XCJTdW5kYXlfTW9uZGF5X1R1ZXNkYXlfV2VkbmVzZGF5X1RodXJzZGF5X0ZyaWRheV9TYXR1cmRheVwiLnNwbGl0KFwiX1wiKSxtb250aHM6XCJKYW51YXJ5X0ZlYnJ1YXJ5X01hcmNoX0FwcmlsX01heV9KdW5lX0p1bHlfQXVndXN0X1NlcHRlbWJlcl9PY3RvYmVyX05vdmVtYmVyX0RlY2VtYmVyXCIuc3BsaXQoXCJfXCIpLG9yZGluYWw6ZnVuY3Rpb24odCl7dmFyIGU9W1widGhcIixcInN0XCIsXCJuZFwiLFwicmRcIl0sbj10JTEwMDtyZXR1cm5cIltcIit0KyhlWyhuLTIwKSUxMF18fGVbbl18fGVbMF0pK1wiXVwifX0sbT1mdW5jdGlvbih0LGUsbil7dmFyIHI9U3RyaW5nKHQpO3JldHVybiFyfHxyLmxlbmd0aD49ZT90OlwiXCIrQXJyYXkoZSsxLXIubGVuZ3RoKS5qb2luKG4pK3R9LHY9e3M6bSx6OmZ1bmN0aW9uKHQpe3ZhciBlPS10LnV0Y09mZnNldCgpLG49TWF0aC5hYnMoZSkscj1NYXRoLmZsb29yKG4vNjApLGk9biU2MDtyZXR1cm4oZTw9MD9cIitcIjpcIi1cIikrbShyLDIsXCIwXCIpK1wiOlwiK20oaSwyLFwiMFwiKX0sbTpmdW5jdGlvbiB0KGUsbil7aWYoZS5kYXRlKCk8bi5kYXRlKCkpcmV0dXJuLXQobixlKTt2YXIgcj0xMioobi55ZWFyKCktZS55ZWFyKCkpKyhuLm1vbnRoKCktZS5tb250aCgpKSxpPWUuY2xvbmUoKS5hZGQocixjKSxzPW4taTwwLHU9ZS5jbG9uZSgpLmFkZChyKyhzPy0xOjEpLGMpO3JldHVybisoLShyKyhuLWkpLyhzP2ktdTp1LWkpKXx8MCl9LGE6ZnVuY3Rpb24odCl7cmV0dXJuIHQ8MD9NYXRoLmNlaWwodCl8fDA6TWF0aC5mbG9vcih0KX0scDpmdW5jdGlvbih0KXtyZXR1cm57TTpjLHk6aCx3Om8sZDphLEQ6ZCxoOnUsbTpzLHM6aSxtczpyLFE6Zn1bdF18fFN0cmluZyh0fHxcIlwiKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL3MkLyxcIlwiKX0sdTpmdW5jdGlvbih0KXtyZXR1cm4gdm9pZCAwPT09dH19LGc9XCJlblwiLEQ9e307RFtnXT1NO3ZhciBwPVwiJGlzRGF5anNPYmplY3RcIixTPWZ1bmN0aW9uKHQpe3JldHVybiB0IGluc3RhbmNlb2YgX3x8ISghdHx8IXRbcF0pfSx3PWZ1bmN0aW9uIHQoZSxuLHIpe3ZhciBpO2lmKCFlKXJldHVybiBnO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlKXt2YXIgcz1lLnRvTG93ZXJDYXNlKCk7RFtzXSYmKGk9cyksbiYmKERbc109bixpPXMpO3ZhciB1PWUuc3BsaXQoXCItXCIpO2lmKCFpJiZ1Lmxlbmd0aD4xKXJldHVybiB0KHVbMF0pfWVsc2V7dmFyIGE9ZS5uYW1lO0RbYV09ZSxpPWF9cmV0dXJuIXImJmkmJihnPWkpLGl8fCFyJiZnfSxPPWZ1bmN0aW9uKHQsZSl7aWYoUyh0KSlyZXR1cm4gdC5jbG9uZSgpO3ZhciBuPVwib2JqZWN0XCI9PXR5cGVvZiBlP2U6e307cmV0dXJuIG4uZGF0ZT10LG4uYXJncz1hcmd1bWVudHMsbmV3IF8obil9LGI9djtiLmw9dyxiLmk9UyxiLnc9ZnVuY3Rpb24odCxlKXtyZXR1cm4gTyh0LHtsb2NhbGU6ZS4kTCx1dGM6ZS4kdSx4OmUuJHgsJG9mZnNldDplLiRvZmZzZXR9KX07dmFyIF89ZnVuY3Rpb24oKXtmdW5jdGlvbiBNKHQpe3RoaXMuJEw9dyh0LmxvY2FsZSxudWxsLCEwKSx0aGlzLnBhcnNlKHQpLHRoaXMuJHg9dGhpcy4keHx8dC54fHx7fSx0aGlzW3BdPSEwfXZhciBtPU0ucHJvdG90eXBlO3JldHVybiBtLnBhcnNlPWZ1bmN0aW9uKHQpe3RoaXMuJGQ9ZnVuY3Rpb24odCl7dmFyIGU9dC5kYXRlLG49dC51dGM7aWYobnVsbD09PWUpcmV0dXJuIG5ldyBEYXRlKE5hTik7aWYoYi51KGUpKXJldHVybiBuZXcgRGF0ZTtpZihlIGluc3RhbmNlb2YgRGF0ZSlyZXR1cm4gbmV3IERhdGUoZSk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUmJiEvWiQvaS50ZXN0KGUpKXt2YXIgcj1lLm1hdGNoKCQpO2lmKHIpe3ZhciBpPXJbMl0tMXx8MCxzPShyWzddfHxcIjBcIikuc3Vic3RyaW5nKDAsMyk7cmV0dXJuIG4/bmV3IERhdGUoRGF0ZS5VVEMoclsxXSxpLHJbM118fDEscls0XXx8MCxyWzVdfHwwLHJbNl18fDAscykpOm5ldyBEYXRlKHJbMV0saSxyWzNdfHwxLHJbNF18fDAscls1XXx8MCxyWzZdfHwwLHMpfX1yZXR1cm4gbmV3IERhdGUoZSl9KHQpLHRoaXMuaW5pdCgpfSxtLmluaXQ9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLiRkO3RoaXMuJHk9dC5nZXRGdWxsWWVhcigpLHRoaXMuJE09dC5nZXRNb250aCgpLHRoaXMuJEQ9dC5nZXREYXRlKCksdGhpcy4kVz10LmdldERheSgpLHRoaXMuJEg9dC5nZXRIb3VycygpLHRoaXMuJG09dC5nZXRNaW51dGVzKCksdGhpcy4kcz10LmdldFNlY29uZHMoKSx0aGlzLiRtcz10LmdldE1pbGxpc2Vjb25kcygpfSxtLiR1dGlscz1mdW5jdGlvbigpe3JldHVybiBifSxtLmlzVmFsaWQ9ZnVuY3Rpb24oKXtyZXR1cm4hKHRoaXMuJGQudG9TdHJpbmcoKT09PWwpfSxtLmlzU2FtZT1mdW5jdGlvbih0LGUpe3ZhciBuPU8odCk7cmV0dXJuIHRoaXMuc3RhcnRPZihlKTw9biYmbjw9dGhpcy5lbmRPZihlKX0sbS5pc0FmdGVyPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIE8odCk8dGhpcy5zdGFydE9mKGUpfSxtLmlzQmVmb3JlPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuZW5kT2YoZSk8Tyh0KX0sbS4kZz1mdW5jdGlvbih0LGUsbil7cmV0dXJuIGIudSh0KT90aGlzW2VdOnRoaXMuc2V0KG4sdCl9LG0udW5peD1mdW5jdGlvbigpe3JldHVybiBNYXRoLmZsb29yKHRoaXMudmFsdWVPZigpLzFlMyl9LG0udmFsdWVPZj1mdW5jdGlvbigpe3JldHVybiB0aGlzLiRkLmdldFRpbWUoKX0sbS5zdGFydE9mPWZ1bmN0aW9uKHQsZSl7dmFyIG49dGhpcyxyPSEhYi51KGUpfHxlLGY9Yi5wKHQpLGw9ZnVuY3Rpb24odCxlKXt2YXIgaT1iLncobi4kdT9EYXRlLlVUQyhuLiR5LGUsdCk6bmV3IERhdGUobi4keSxlLHQpLG4pO3JldHVybiByP2k6aS5lbmRPZihhKX0sJD1mdW5jdGlvbih0LGUpe3JldHVybiBiLncobi50b0RhdGUoKVt0XS5hcHBseShuLnRvRGF0ZShcInNcIiksKHI/WzAsMCwwLDBdOlsyMyw1OSw1OSw5OTldKS5zbGljZShlKSksbil9LHk9dGhpcy4kVyxNPXRoaXMuJE0sbT10aGlzLiRELHY9XCJzZXRcIisodGhpcy4kdT9cIlVUQ1wiOlwiXCIpO3N3aXRjaChmKXtjYXNlIGg6cmV0dXJuIHI/bCgxLDApOmwoMzEsMTEpO2Nhc2UgYzpyZXR1cm4gcj9sKDEsTSk6bCgwLE0rMSk7Y2FzZSBvOnZhciBnPXRoaXMuJGxvY2FsZSgpLndlZWtTdGFydHx8MCxEPSh5PGc/eSs3OnkpLWc7cmV0dXJuIGwocj9tLUQ6bSsoNi1EKSxNKTtjYXNlIGE6Y2FzZSBkOnJldHVybiAkKHYrXCJIb3Vyc1wiLDApO2Nhc2UgdTpyZXR1cm4gJCh2K1wiTWludXRlc1wiLDEpO2Nhc2UgczpyZXR1cm4gJCh2K1wiU2Vjb25kc1wiLDIpO2Nhc2UgaTpyZXR1cm4gJCh2K1wiTWlsbGlzZWNvbmRzXCIsMyk7ZGVmYXVsdDpyZXR1cm4gdGhpcy5jbG9uZSgpfX0sbS5lbmRPZj1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5zdGFydE9mKHQsITEpfSxtLiRzZXQ9ZnVuY3Rpb24odCxlKXt2YXIgbixvPWIucCh0KSxmPVwic2V0XCIrKHRoaXMuJHU/XCJVVENcIjpcIlwiKSxsPShuPXt9LG5bYV09ZitcIkRhdGVcIixuW2RdPWYrXCJEYXRlXCIsbltjXT1mK1wiTW9udGhcIixuW2hdPWYrXCJGdWxsWWVhclwiLG5bdV09ZitcIkhvdXJzXCIsbltzXT1mK1wiTWludXRlc1wiLG5baV09ZitcIlNlY29uZHNcIixuW3JdPWYrXCJNaWxsaXNlY29uZHNcIixuKVtvXSwkPW89PT1hP3RoaXMuJEQrKGUtdGhpcy4kVyk6ZTtpZihvPT09Y3x8bz09PWgpe3ZhciB5PXRoaXMuY2xvbmUoKS5zZXQoZCwxKTt5LiRkW2xdKCQpLHkuaW5pdCgpLHRoaXMuJGQ9eS5zZXQoZCxNYXRoLm1pbih0aGlzLiRELHkuZGF5c0luTW9udGgoKSkpLiRkfWVsc2UgbCYmdGhpcy4kZFtsXSgkKTtyZXR1cm4gdGhpcy5pbml0KCksdGhpc30sbS5zZXQ9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdGhpcy5jbG9uZSgpLiRzZXQodCxlKX0sbS5nZXQ9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXNbYi5wKHQpXSgpfSxtLmFkZD1mdW5jdGlvbihyLGYpe3ZhciBkLGw9dGhpcztyPU51bWJlcihyKTt2YXIgJD1iLnAoZikseT1mdW5jdGlvbih0KXt2YXIgZT1PKGwpO3JldHVybiBiLncoZS5kYXRlKGUuZGF0ZSgpK01hdGgucm91bmQodCpyKSksbCl9O2lmKCQ9PT1jKXJldHVybiB0aGlzLnNldChjLHRoaXMuJE0rcik7aWYoJD09PWgpcmV0dXJuIHRoaXMuc2V0KGgsdGhpcy4keStyKTtpZigkPT09YSlyZXR1cm4geSgxKTtpZigkPT09bylyZXR1cm4geSg3KTt2YXIgTT0oZD17fSxkW3NdPWUsZFt1XT1uLGRbaV09dCxkKVskXXx8MSxtPXRoaXMuJGQuZ2V0VGltZSgpK3IqTTtyZXR1cm4gYi53KG0sdGhpcyl9LG0uc3VidHJhY3Q9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdGhpcy5hZGQoLTEqdCxlKX0sbS5mb3JtYXQ9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcyxuPXRoaXMuJGxvY2FsZSgpO2lmKCF0aGlzLmlzVmFsaWQoKSlyZXR1cm4gbi5pbnZhbGlkRGF0ZXx8bDt2YXIgcj10fHxcIllZWVktTU0tRERUSEg6bW06c3NaXCIsaT1iLnoodGhpcykscz10aGlzLiRILHU9dGhpcy4kbSxhPXRoaXMuJE0sbz1uLndlZWtkYXlzLGM9bi5tb250aHMsZj1uLm1lcmlkaWVtLGg9ZnVuY3Rpb24odCxuLGkscyl7cmV0dXJuIHQmJih0W25dfHx0KGUscikpfHxpW25dLnNsaWNlKDAscyl9LGQ9ZnVuY3Rpb24odCl7cmV0dXJuIGIucyhzJTEyfHwxMix0LFwiMFwiKX0sJD1mfHxmdW5jdGlvbih0LGUsbil7dmFyIHI9dDwxMj9cIkFNXCI6XCJQTVwiO3JldHVybiBuP3IudG9Mb3dlckNhc2UoKTpyfTtyZXR1cm4gci5yZXBsYWNlKHksKGZ1bmN0aW9uKHQscil7cmV0dXJuIHJ8fGZ1bmN0aW9uKHQpe3N3aXRjaCh0KXtjYXNlXCJZWVwiOnJldHVybiBTdHJpbmcoZS4keSkuc2xpY2UoLTIpO2Nhc2VcIllZWVlcIjpyZXR1cm4gYi5zKGUuJHksNCxcIjBcIik7Y2FzZVwiTVwiOnJldHVybiBhKzE7Y2FzZVwiTU1cIjpyZXR1cm4gYi5zKGErMSwyLFwiMFwiKTtjYXNlXCJNTU1cIjpyZXR1cm4gaChuLm1vbnRoc1Nob3J0LGEsYywzKTtjYXNlXCJNTU1NXCI6cmV0dXJuIGgoYyxhKTtjYXNlXCJEXCI6cmV0dXJuIGUuJEQ7Y2FzZVwiRERcIjpyZXR1cm4gYi5zKGUuJEQsMixcIjBcIik7Y2FzZVwiZFwiOnJldHVybiBTdHJpbmcoZS4kVyk7Y2FzZVwiZGRcIjpyZXR1cm4gaChuLndlZWtkYXlzTWluLGUuJFcsbywyKTtjYXNlXCJkZGRcIjpyZXR1cm4gaChuLndlZWtkYXlzU2hvcnQsZS4kVyxvLDMpO2Nhc2VcImRkZGRcIjpyZXR1cm4gb1tlLiRXXTtjYXNlXCJIXCI6cmV0dXJuIFN0cmluZyhzKTtjYXNlXCJISFwiOnJldHVybiBiLnMocywyLFwiMFwiKTtjYXNlXCJoXCI6cmV0dXJuIGQoMSk7Y2FzZVwiaGhcIjpyZXR1cm4gZCgyKTtjYXNlXCJhXCI6cmV0dXJuICQocyx1LCEwKTtjYXNlXCJBXCI6cmV0dXJuICQocyx1LCExKTtjYXNlXCJtXCI6cmV0dXJuIFN0cmluZyh1KTtjYXNlXCJtbVwiOnJldHVybiBiLnModSwyLFwiMFwiKTtjYXNlXCJzXCI6cmV0dXJuIFN0cmluZyhlLiRzKTtjYXNlXCJzc1wiOnJldHVybiBiLnMoZS4kcywyLFwiMFwiKTtjYXNlXCJTU1NcIjpyZXR1cm4gYi5zKGUuJG1zLDMsXCIwXCIpO2Nhc2VcIlpcIjpyZXR1cm4gaX1yZXR1cm4gbnVsbH0odCl8fGkucmVwbGFjZShcIjpcIixcIlwiKX0pKX0sbS51dGNPZmZzZXQ9ZnVuY3Rpb24oKXtyZXR1cm4gMTUqLU1hdGgucm91bmQodGhpcy4kZC5nZXRUaW1lem9uZU9mZnNldCgpLzE1KX0sbS5kaWZmPWZ1bmN0aW9uKHIsZCxsKXt2YXIgJCx5PXRoaXMsTT1iLnAoZCksbT1PKHIpLHY9KG0udXRjT2Zmc2V0KCktdGhpcy51dGNPZmZzZXQoKSkqZSxnPXRoaXMtbSxEPWZ1bmN0aW9uKCl7cmV0dXJuIGIubSh5LG0pfTtzd2l0Y2goTSl7Y2FzZSBoOiQ9RCgpLzEyO2JyZWFrO2Nhc2UgYzokPUQoKTticmVhaztjYXNlIGY6JD1EKCkvMzticmVhaztjYXNlIG86JD0oZy12KS82MDQ4ZTU7YnJlYWs7Y2FzZSBhOiQ9KGctdikvODY0ZTU7YnJlYWs7Y2FzZSB1OiQ9Zy9uO2JyZWFrO2Nhc2UgczokPWcvZTticmVhaztjYXNlIGk6JD1nL3Q7YnJlYWs7ZGVmYXVsdDokPWd9cmV0dXJuIGw/JDpiLmEoJCl9LG0uZGF5c0luTW9udGg9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbmRPZihjKS4kRH0sbS4kbG9jYWxlPWZ1bmN0aW9uKCl7cmV0dXJuIERbdGhpcy4kTF19LG0ubG9jYWxlPWZ1bmN0aW9uKHQsZSl7aWYoIXQpcmV0dXJuIHRoaXMuJEw7dmFyIG49dGhpcy5jbG9uZSgpLHI9dyh0LGUsITApO3JldHVybiByJiYobi4kTD1yKSxufSxtLmNsb25lPWZ1bmN0aW9uKCl7cmV0dXJuIGIudyh0aGlzLiRkLHRoaXMpfSxtLnRvRGF0ZT1mdW5jdGlvbigpe3JldHVybiBuZXcgRGF0ZSh0aGlzLnZhbHVlT2YoKSl9LG0udG9KU09OPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuaXNWYWxpZCgpP3RoaXMudG9JU09TdHJpbmcoKTpudWxsfSxtLnRvSVNPU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJGQudG9JU09TdHJpbmcoKX0sbS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLiRkLnRvVVRDU3RyaW5nKCl9LE19KCksaz1fLnByb3RvdHlwZTtyZXR1cm4gTy5wcm90b3R5cGU9ayxbW1wiJG1zXCIscl0sW1wiJHNcIixpXSxbXCIkbVwiLHNdLFtcIiRIXCIsdV0sW1wiJFdcIixhXSxbXCIkTVwiLGNdLFtcIiR5XCIsaF0sW1wiJERcIixkXV0uZm9yRWFjaCgoZnVuY3Rpb24odCl7a1t0WzFdXT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy4kZyhlLHRbMF0sdFsxXSl9fSkpLE8uZXh0ZW5kPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQuJGl8fCh0KGUsXyxPKSx0LiRpPSEwKSxPfSxPLmxvY2FsZT13LE8uaXNEYXlqcz1TLE8udW5peD1mdW5jdGlvbih0KXtyZXR1cm4gTygxZTMqdCl9LE8uZW49RFtnXSxPLkxzPUQsTy5wPXt9LE99KSk7IiwgIiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKHQpOihlPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6ZXx8c2VsZikuZGF5anNfcGx1Z2luX2FkdmFuY2VkRm9ybWF0PXQoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtyZXR1cm4gZnVuY3Rpb24oZSx0KXt2YXIgcj10LnByb3RvdHlwZSxuPXIuZm9ybWF0O3IuZm9ybWF0PWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMscj10aGlzLiRsb2NhbGUoKTtpZighdGhpcy5pc1ZhbGlkKCkpcmV0dXJuIG4uYmluZCh0aGlzKShlKTt2YXIgcz10aGlzLiR1dGlscygpLGE9KGV8fFwiWVlZWS1NTS1ERFRISDptbTpzc1pcIikucmVwbGFjZSgvXFxbKFteXFxdXSspXXxRfHdvfHd3fHd8V1d8V3x6enp8enxnZ2dnfEdHR0d8RG98WHx4fGt7MSwyfXxTL2csKGZ1bmN0aW9uKGUpe3N3aXRjaChlKXtjYXNlXCJRXCI6cmV0dXJuIE1hdGguY2VpbCgodC4kTSsxKS8zKTtjYXNlXCJEb1wiOnJldHVybiByLm9yZGluYWwodC4kRCk7Y2FzZVwiZ2dnZ1wiOnJldHVybiB0LndlZWtZZWFyKCk7Y2FzZVwiR0dHR1wiOnJldHVybiB0Lmlzb1dlZWtZZWFyKCk7Y2FzZVwid29cIjpyZXR1cm4gci5vcmRpbmFsKHQud2VlaygpLFwiV1wiKTtjYXNlXCJ3XCI6Y2FzZVwid3dcIjpyZXR1cm4gcy5zKHQud2VlaygpLFwid1wiPT09ZT8xOjIsXCIwXCIpO2Nhc2VcIldcIjpjYXNlXCJXV1wiOnJldHVybiBzLnModC5pc29XZWVrKCksXCJXXCI9PT1lPzE6MixcIjBcIik7Y2FzZVwia1wiOmNhc2VcImtrXCI6cmV0dXJuIHMucyhTdHJpbmcoMD09PXQuJEg/MjQ6dC4kSCksXCJrXCI9PT1lPzE6MixcIjBcIik7Y2FzZVwiWFwiOnJldHVybiBNYXRoLmZsb29yKHQuJGQuZ2V0VGltZSgpLzFlMyk7Y2FzZVwieFwiOnJldHVybiB0LiRkLmdldFRpbWUoKTtjYXNlXCJ6XCI6cmV0dXJuXCJbXCIrdC5vZmZzZXROYW1lKCkrXCJdXCI7Y2FzZVwienp6XCI6cmV0dXJuXCJbXCIrdC5vZmZzZXROYW1lKFwibG9uZ1wiKStcIl1cIjtkZWZhdWx0OnJldHVybiBlfX0pKTtyZXR1cm4gbi5iaW5kKHRoaXMpKGEpfX19KSk7IiwgIiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKHQpOihlPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6ZXx8c2VsZikuZGF5anNfcGx1Z2luX3dlZWtPZlllYXI9dCgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciBlPVwid2Vla1wiLHQ9XCJ5ZWFyXCI7cmV0dXJuIGZ1bmN0aW9uKGksbixyKXt2YXIgZj1uLnByb3RvdHlwZTtmLndlZWs9ZnVuY3Rpb24oaSl7aWYodm9pZCAwPT09aSYmKGk9bnVsbCksbnVsbCE9PWkpcmV0dXJuIHRoaXMuYWRkKDcqKGktdGhpcy53ZWVrKCkpLFwiZGF5XCIpO3ZhciBuPXRoaXMuJGxvY2FsZSgpLnllYXJTdGFydHx8MTtpZigxMT09PXRoaXMubW9udGgoKSYmdGhpcy5kYXRlKCk+MjUpe3ZhciBmPXIodGhpcykuc3RhcnRPZih0KS5hZGQoMSx0KS5kYXRlKG4pLHM9cih0aGlzKS5lbmRPZihlKTtpZihmLmlzQmVmb3JlKHMpKXJldHVybiAxfXZhciBhPXIodGhpcykuc3RhcnRPZih0KS5kYXRlKG4pLnN0YXJ0T2YoZSkuc3VidHJhY3QoMSxcIm1pbGxpc2Vjb25kXCIpLG89dGhpcy5kaWZmKGEsZSwhMCk7cmV0dXJuIG88MD9yKHRoaXMpLnN0YXJ0T2YoXCJ3ZWVrXCIpLndlZWsoKTpNYXRoLmNlaWwobyl9LGYud2Vla3M9ZnVuY3Rpb24oZSl7cmV0dXJuIHZvaWQgMD09PWUmJihlPW51bGwpLHRoaXMud2VlayhlKX19fSkpOyIsICIhZnVuY3Rpb24odCxpKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1pKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShpKToodD1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOnR8fHNlbGYpLmRheWpzX3BsdWdpbl91dGM9aSgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciB0PVwibWludXRlXCIsaT0vWystXVxcZFxcZCg/Ojo/XFxkXFxkKT8vZyxlPS8oWystXXxcXGRcXGQpL2c7cmV0dXJuIGZ1bmN0aW9uKHMsZixuKXt2YXIgdT1mLnByb3RvdHlwZTtuLnV0Yz1mdW5jdGlvbih0KXt2YXIgaT17ZGF0ZTp0LHV0YzohMCxhcmdzOmFyZ3VtZW50c307cmV0dXJuIG5ldyBmKGkpfSx1LnV0Yz1mdW5jdGlvbihpKXt2YXIgZT1uKHRoaXMudG9EYXRlKCkse2xvY2FsZTp0aGlzLiRMLHV0YzohMH0pO3JldHVybiBpP2UuYWRkKHRoaXMudXRjT2Zmc2V0KCksdCk6ZX0sdS5sb2NhbD1mdW5jdGlvbigpe3JldHVybiBuKHRoaXMudG9EYXRlKCkse2xvY2FsZTp0aGlzLiRMLHV0YzohMX0pfTt2YXIgbz11LnBhcnNlO3UucGFyc2U9ZnVuY3Rpb24odCl7dC51dGMmJih0aGlzLiR1PSEwKSx0aGlzLiR1dGlscygpLnUodC4kb2Zmc2V0KXx8KHRoaXMuJG9mZnNldD10LiRvZmZzZXQpLG8uY2FsbCh0aGlzLHQpfTt2YXIgcj11LmluaXQ7dS5pbml0PWZ1bmN0aW9uKCl7aWYodGhpcy4kdSl7dmFyIHQ9dGhpcy4kZDt0aGlzLiR5PXQuZ2V0VVRDRnVsbFllYXIoKSx0aGlzLiRNPXQuZ2V0VVRDTW9udGgoKSx0aGlzLiREPXQuZ2V0VVRDRGF0ZSgpLHRoaXMuJFc9dC5nZXRVVENEYXkoKSx0aGlzLiRIPXQuZ2V0VVRDSG91cnMoKSx0aGlzLiRtPXQuZ2V0VVRDTWludXRlcygpLHRoaXMuJHM9dC5nZXRVVENTZWNvbmRzKCksdGhpcy4kbXM9dC5nZXRVVENNaWxsaXNlY29uZHMoKX1lbHNlIHIuY2FsbCh0aGlzKX07dmFyIGE9dS51dGNPZmZzZXQ7dS51dGNPZmZzZXQ9ZnVuY3Rpb24ocyxmKXt2YXIgbj10aGlzLiR1dGlscygpLnU7aWYobihzKSlyZXR1cm4gdGhpcy4kdT8wOm4odGhpcy4kb2Zmc2V0KT9hLmNhbGwodGhpcyk6dGhpcy4kb2Zmc2V0O2lmKFwic3RyaW5nXCI9PXR5cGVvZiBzJiYocz1mdW5jdGlvbih0KXt2b2lkIDA9PT10JiYodD1cIlwiKTt2YXIgcz10Lm1hdGNoKGkpO2lmKCFzKXJldHVybiBudWxsO3ZhciBmPShcIlwiK3NbMF0pLm1hdGNoKGUpfHxbXCItXCIsMCwwXSxuPWZbMF0sdT02MCorZlsxXSsgK2ZbMl07cmV0dXJuIDA9PT11PzA6XCIrXCI9PT1uP3U6LXV9KHMpLG51bGw9PT1zKSlyZXR1cm4gdGhpczt2YXIgdT1NYXRoLmFicyhzKTw9MTY/NjAqczpzLG89dGhpcztpZihmKXJldHVybiBvLiRvZmZzZXQ9dSxvLiR1PTA9PT1zLG87aWYoMCE9PXMpe3ZhciByPXRoaXMuJHU/dGhpcy50b0RhdGUoKS5nZXRUaW1lem9uZU9mZnNldCgpOi0xKnRoaXMudXRjT2Zmc2V0KCk7KG89dGhpcy5sb2NhbCgpLmFkZCh1K3IsdCkpLiRvZmZzZXQ9dSxvLiR4LiRsb2NhbE9mZnNldD1yfWVsc2Ugbz10aGlzLnV0YygpO3JldHVybiBvfTt2YXIgaD11LmZvcm1hdDt1LmZvcm1hdD1mdW5jdGlvbih0KXt2YXIgaT10fHwodGhpcy4kdT9cIllZWVktTU0tRERUSEg6bW06c3NbWl1cIjpcIlwiKTtyZXR1cm4gaC5jYWxsKHRoaXMsaSl9LHUudmFsdWVPZj1mdW5jdGlvbigpe3ZhciB0PXRoaXMuJHV0aWxzKCkudSh0aGlzLiRvZmZzZXQpPzA6dGhpcy4kb2Zmc2V0Kyh0aGlzLiR4LiRsb2NhbE9mZnNldHx8dGhpcy4kZC5nZXRUaW1lem9uZU9mZnNldCgpKTtyZXR1cm4gdGhpcy4kZC52YWx1ZU9mKCktNmU0KnR9LHUuaXNVVEM9ZnVuY3Rpb24oKXtyZXR1cm4hIXRoaXMuJHV9LHUudG9JU09TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy50b0RhdGUoKS50b0lTT1N0cmluZygpfSx1LnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudG9EYXRlKCkudG9VVENTdHJpbmcoKX07dmFyIGw9dS50b0RhdGU7dS50b0RhdGU9ZnVuY3Rpb24odCl7cmV0dXJuXCJzXCI9PT10JiZ0aGlzLiRvZmZzZXQ/bih0aGlzLmZvcm1hdChcIllZWVktTU0tREQgSEg6bW06c3M6U1NTXCIpKS50b0RhdGUoKTpsLmNhbGwodGhpcyl9O3ZhciBjPXUuZGlmZjt1LmRpZmY9ZnVuY3Rpb24odCxpLGUpe2lmKHQmJnRoaXMuJHU9PT10LiR1KXJldHVybiBjLmNhbGwodGhpcyx0LGksZSk7dmFyIHM9dGhpcy5sb2NhbCgpLGY9bih0KS5sb2NhbCgpO3JldHVybiBjLmNhbGwocyxmLGksZSl9fX0pKTsiLCAiIWZ1bmN0aW9uKHQsZSl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9ZSgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZSk6KHQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczp0fHxzZWxmKS5kYXlqc19wbHVnaW5fdGltZXpvbmU9ZSgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciB0PXt5ZWFyOjAsbW9udGg6MSxkYXk6Mixob3VyOjMsbWludXRlOjQsc2Vjb25kOjV9LGU9e307cmV0dXJuIGZ1bmN0aW9uKG4saSxvKXt2YXIgcixhPWZ1bmN0aW9uKHQsbixpKXt2b2lkIDA9PT1pJiYoaT17fSk7dmFyIG89bmV3IERhdGUodCkscj1mdW5jdGlvbih0LG4pe3ZvaWQgMD09PW4mJihuPXt9KTt2YXIgaT1uLnRpbWVab25lTmFtZXx8XCJzaG9ydFwiLG89dCtcInxcIitpLHI9ZVtvXTtyZXR1cm4gcnx8KHI9bmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXCJlbi1VU1wiLHtob3VyMTI6ITEsdGltZVpvbmU6dCx5ZWFyOlwibnVtZXJpY1wiLG1vbnRoOlwiMi1kaWdpdFwiLGRheTpcIjItZGlnaXRcIixob3VyOlwiMi1kaWdpdFwiLG1pbnV0ZTpcIjItZGlnaXRcIixzZWNvbmQ6XCIyLWRpZ2l0XCIsdGltZVpvbmVOYW1lOml9KSxlW29dPXIpLHJ9KG4saSk7cmV0dXJuIHIuZm9ybWF0VG9QYXJ0cyhvKX0sdT1mdW5jdGlvbihlLG4pe2Zvcih2YXIgaT1hKGUsbikscj1bXSx1PTA7dTxpLmxlbmd0aDt1Kz0xKXt2YXIgZj1pW3VdLHM9Zi50eXBlLG09Zi52YWx1ZSxjPXRbc107Yz49MCYmKHJbY109cGFyc2VJbnQobSwxMCkpfXZhciBkPXJbM10sbD0yND09PWQ/MDpkLGg9clswXStcIi1cIityWzFdK1wiLVwiK3JbMl0rXCIgXCIrbCtcIjpcIityWzRdK1wiOlwiK3JbNV0rXCI6MDAwXCIsdj0rZTtyZXR1cm4oby51dGMoaCkudmFsdWVPZigpLSh2LT12JTFlMykpLzZlNH0sZj1pLnByb3RvdHlwZTtmLnR6PWZ1bmN0aW9uKHQsZSl7dm9pZCAwPT09dCYmKHQ9cik7dmFyIG4saT10aGlzLnV0Y09mZnNldCgpLGE9dGhpcy50b0RhdGUoKSx1PWEudG9Mb2NhbGVTdHJpbmcoXCJlbi1VU1wiLHt0aW1lWm9uZTp0fSksZj1NYXRoLnJvdW5kKChhLW5ldyBEYXRlKHUpKS8xZTMvNjApLHM9MTUqLU1hdGgucm91bmQoYS5nZXRUaW1lem9uZU9mZnNldCgpLzE1KS1mO2lmKCFOdW1iZXIocykpbj10aGlzLnV0Y09mZnNldCgwLGUpO2Vsc2UgaWYobj1vKHUse2xvY2FsZTp0aGlzLiRMfSkuJHNldChcIm1pbGxpc2Vjb25kXCIsdGhpcy4kbXMpLnV0Y09mZnNldChzLCEwKSxlKXt2YXIgbT1uLnV0Y09mZnNldCgpO249bi5hZGQoaS1tLFwibWludXRlXCIpfXJldHVybiBuLiR4LiR0aW1lem9uZT10LG59LGYub2Zmc2V0TmFtZT1mdW5jdGlvbih0KXt2YXIgZT10aGlzLiR4LiR0aW1lem9uZXx8by50ei5ndWVzcygpLG49YSh0aGlzLnZhbHVlT2YoKSxlLHt0aW1lWm9uZU5hbWU6dH0pLmZpbmQoKGZ1bmN0aW9uKHQpe3JldHVyblwidGltZXpvbmVuYW1lXCI9PT10LnR5cGUudG9Mb3dlckNhc2UoKX0pKTtyZXR1cm4gbiYmbi52YWx1ZX07dmFyIHM9Zi5zdGFydE9mO2Yuc3RhcnRPZj1mdW5jdGlvbih0LGUpe2lmKCF0aGlzLiR4fHwhdGhpcy4keC4kdGltZXpvbmUpcmV0dXJuIHMuY2FsbCh0aGlzLHQsZSk7dmFyIG49byh0aGlzLmZvcm1hdChcIllZWVktTU0tREQgSEg6bW06c3M6U1NTXCIpLHtsb2NhbGU6dGhpcy4kTH0pO3JldHVybiBzLmNhbGwobix0LGUpLnR6KHRoaXMuJHguJHRpbWV6b25lLCEwKX0sby50ej1mdW5jdGlvbih0LGUsbil7dmFyIGk9biYmZSxhPW58fGV8fHIsZj11KCtvKCksYSk7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIHQpcmV0dXJuIG8odCkudHooYSk7dmFyIHM9ZnVuY3Rpb24odCxlLG4pe3ZhciBpPXQtNjAqZSoxZTMsbz11KGksbik7aWYoZT09PW8pcmV0dXJuW2ksZV07dmFyIHI9dShpLT02MCooby1lKSoxZTMsbik7cmV0dXJuIG89PT1yP1tpLG9dOlt0LTYwKk1hdGgubWluKG8scikqMWUzLE1hdGgubWF4KG8scildfShvLnV0Yyh0LGkpLnZhbHVlT2YoKSxmLGEpLG09c1swXSxjPXNbMV0sZD1vKG0pLnV0Y09mZnNldChjKTtyZXR1cm4gZC4keC4kdGltZXpvbmU9YSxkfSxvLnR6Lmd1ZXNzPWZ1bmN0aW9uKCl7cmV0dXJuIEludGwuRGF0ZVRpbWVGb3JtYXQoKS5yZXNvbHZlZE9wdGlvbnMoKS50aW1lWm9uZX0sby50ei5zZXREZWZhdWx0PWZ1bmN0aW9uKHQpe3I9dH19fSkpOyIsICIhZnVuY3Rpb24ocixlKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1lKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShlKToocj1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOnJ8fHNlbGYpLmRheWpzX3BsdWdpbl9yZWxhdGl2ZVRpbWU9ZSgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3JldHVybiBmdW5jdGlvbihyLGUsdCl7cj1yfHx7fTt2YXIgbj1lLnByb3RvdHlwZSxvPXtmdXR1cmU6XCJpbiAlc1wiLHBhc3Q6XCIlcyBhZ29cIixzOlwiYSBmZXcgc2Vjb25kc1wiLG06XCJhIG1pbnV0ZVwiLG1tOlwiJWQgbWludXRlc1wiLGg6XCJhbiBob3VyXCIsaGg6XCIlZCBob3Vyc1wiLGQ6XCJhIGRheVwiLGRkOlwiJWQgZGF5c1wiLE06XCJhIG1vbnRoXCIsTU06XCIlZCBtb250aHNcIix5OlwiYSB5ZWFyXCIseXk6XCIlZCB5ZWFyc1wifTtmdW5jdGlvbiBpKHIsZSx0LG8pe3JldHVybiBuLmZyb21Ub0Jhc2UocixlLHQsbyl9dC5lbi5yZWxhdGl2ZVRpbWU9byxuLmZyb21Ub0Jhc2U9ZnVuY3Rpb24oZSxuLGksZCx1KXtmb3IodmFyIGYsYSxzLGw9aS4kbG9jYWxlKCkucmVsYXRpdmVUaW1lfHxvLGg9ci50aHJlc2hvbGRzfHxbe2w6XCJzXCIscjo0NCxkOlwic2Vjb25kXCJ9LHtsOlwibVwiLHI6ODl9LHtsOlwibW1cIixyOjQ0LGQ6XCJtaW51dGVcIn0se2w6XCJoXCIscjo4OX0se2w6XCJoaFwiLHI6MjEsZDpcImhvdXJcIn0se2w6XCJkXCIscjozNX0se2w6XCJkZFwiLHI6MjUsZDpcImRheVwifSx7bDpcIk1cIixyOjQ1fSx7bDpcIk1NXCIscjoxMCxkOlwibW9udGhcIn0se2w6XCJ5XCIscjoxN30se2w6XCJ5eVwiLGQ6XCJ5ZWFyXCJ9XSxtPWgubGVuZ3RoLGM9MDtjPG07Yys9MSl7dmFyIHk9aFtjXTt5LmQmJihmPWQ/dChlKS5kaWZmKGkseS5kLCEwKTppLmRpZmYoZSx5LmQsITApKTt2YXIgcD0oci5yb3VuZGluZ3x8TWF0aC5yb3VuZCkoTWF0aC5hYnMoZikpO2lmKHM9Zj4wLHA8PXkucnx8IXkucil7cDw9MSYmYz4wJiYoeT1oW2MtMV0pO3ZhciB2PWxbeS5sXTt1JiYocD11KFwiXCIrcCkpLGE9XCJzdHJpbmdcIj09dHlwZW9mIHY/di5yZXBsYWNlKFwiJWRcIixwKTp2KHAsbix5Lmwscyk7YnJlYWt9fWlmKG4pcmV0dXJuIGE7dmFyIE09cz9sLmZ1dHVyZTpsLnBhc3Q7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgTT9NKGEpOk0ucmVwbGFjZShcIiVzXCIsYSl9LG4udG89ZnVuY3Rpb24ocixlKXtyZXR1cm4gaShyLGUsdGhpcywhMCl9LG4uZnJvbT1mdW5jdGlvbihyLGUpe3JldHVybiBpKHIsZSx0aGlzKX07dmFyIGQ9ZnVuY3Rpb24ocil7cmV0dXJuIHIuJHU/dC51dGMoKTp0KCl9O24udG9Ob3c9ZnVuY3Rpb24ocil7cmV0dXJuIHRoaXMudG8oZCh0aGlzKSxyKX0sbi5mcm9tTm93PWZ1bmN0aW9uKHIpe3JldHVybiB0aGlzLmZyb20oZCh0aGlzKSxyKX19fSkpOyIsICJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFjdGlvbiwgQWN0aW9uUGFuZWwsIENvbG9yLCBMaXN0IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgcGFyc2VEYXRlIH0gZnJvbSBcImNocm9uby1ub2RlXCI7XG5pbXBvcnQgZGF5anMgZnJvbSBcImRheWpzXCI7XG5pbXBvcnQgYWR2YW5jZWRGb3JtYXRQbHVnaW4gZnJvbSBcImRheWpzL3BsdWdpbi9hZHZhbmNlZEZvcm1hdFwiO1xuaW1wb3J0IHdlZWtPZlllYXJQbHVnaW4gZnJvbSBcImRheWpzL3BsdWdpbi93ZWVrT2ZZZWFyXCI7XG5pbXBvcnQgdXRjUGx1Z2luIGZyb20gXCJkYXlqcy9wbHVnaW4vdXRjXCI7XG5pbXBvcnQgdGltZXpvbmVQbHVnaW4gZnJvbSBcImRheWpzL3BsdWdpbi90aW1lem9uZVwiO1xuaW1wb3J0IHJlbGF0aXZlVGltZVBsdWdpbiBmcm9tIFwiZGF5anMvcGx1Z2luL3JlbGF0aXZlVGltZVwiO1xuXG5kYXlqcy5leHRlbmQoYWR2YW5jZWRGb3JtYXRQbHVnaW4pO1xuZGF5anMuZXh0ZW5kKHdlZWtPZlllYXJQbHVnaW4pO1xuZGF5anMuZXh0ZW5kKHV0Y1BsdWdpbik7XG5kYXlqcy5leHRlbmQodGltZXpvbmVQbHVnaW4pO1xuZGF5anMuZXh0ZW5kKHJlbGF0aXZlVGltZVBsdWdpbik7XG5cbmZ1bmN0aW9uIGhhbmRsZUNvbnZlcnNpb24oaW5wdXQ6IHN0cmluZywgdGltZXpvbmU6IHN0cmluZykge1xuICBpZiAoaW5wdXQubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgaW5wdXQgPSBuZXcgRGF0ZShwYXJzZUludChpbnB1dCwgMTApICogMTAwMCkudG9TdHJpbmcoKTtcbiAgfVxuICBjb25zdCBwYXJzZWREYXRlID0gcGFyc2VEYXRlKGlucHV0KTtcbiAgaWYgKCFwYXJzZWREYXRlIHx8IHBhcnNlZERhdGUudG9TdHJpbmcoKSA9PT0gXCJJbnZhbGlkIERhdGVcIikgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IGRhdGUgPSBkYXlqcyhwYXJzZWREYXRlKS50eih0aW1lem9uZSk7XG4gIGNvbnN0IGZyb21Ob3cgPSBkYXRlLmZyb21Ob3coKTtcbiAgcmV0dXJuIFtcbiAgICB7IGxhYmVsOiBcIlVuaXggKHMpXCIsIHZhbHVlOiBkYXRlLnVuaXgoKSB9LFxuICAgIHsgbGFiZWw6IFwiVW5peCAobXMpXCIsIHZhbHVlOiBkYXRlLnZhbHVlT2YoKSB9LFxuICAgIHsgbGFiZWw6IFwiSHVtYW4gUmVhZGFibGVcIiwgdmFsdWU6IGRhdGUuZm9ybWF0KFwiTU1NTSBEbywgWVlZWSBbYXRdIGhoOm1tOnNzIEEgKHp6eilcIikgfSxcbiAgICB7IGxhYmVsOiBcIkRhdGVUaW1lXCIsIHZhbHVlOiBkYXRlLmZvcm1hdChcIllZWVktTU0tREQgSEg6bW06c3NcIikgfSxcbiAgICB7IGxhYmVsOiBcIlVUQ1wiLCB2YWx1ZTogZGF0ZS50b1N0cmluZygpIH0sXG4gICAgeyBsYWJlbDogXCJJU08gODYwMVwiLCB2YWx1ZTogZGF0ZS50b0lTT1N0cmluZygpIH0sXG4gICAgeyBsYWJlbDogXCJXZWVrIG9mIFllYXJcIiwgdmFsdWU6IGRhdGUuZm9ybWF0KFwid28gZGRkZCBbb2ZdIFlZWVlcIikgfSxcbiAgICB7IGxhYmVsOiBcIkluIC8gQWdvXCIsIHZhbHVlOiBTdHJpbmcoZnJvbU5vdykuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBTdHJpbmcoZnJvbU5vdykuc2xpY2UoMSkgfSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gQ29tbWFuZCgpIHtcbiAgY29uc3QgW2lucHV0LCBzZXRJbnB1dF0gPSB1c2VTdGF0ZShcIm5vd1wiKTtcbiAgY29uc3QgW3RpbWV6b25lLCBzZXRUaW1lem9uZV0gPSB1c2VTdGF0ZShJbnRsLkRhdGVUaW1lRm9ybWF0KCkucmVzb2x2ZWRPcHRpb25zKCkudGltZVpvbmUpO1xuICBjb25zdCBbaXRlbXMsIHNldEl0ZW1zXSA9IHVzZVN0YXRlPHsgbGFiZWw6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB8IG51bWJlciB9W10+KFtdKTtcblxuICBhc3luYyBmdW5jdGlvbiBvblRpbWV6b25lQ2hhbmdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBzZXRUaW1lem9uZSh2YWx1ZSk7XG4gICAgc2V0SXRlbXMoaGFuZGxlQ29udmVyc2lvbihpbnB1dCwgdmFsdWUpKTtcbiAgfVxuICBhc3luYyBmdW5jdGlvbiBvblNlYXJjaFRleHRDaGFuZ2UodmFsdWU6IHN0cmluZykge1xuICAgIHNldElucHV0KHZhbHVlKTtcbiAgICBzZXRJdGVtcyhoYW5kbGVDb252ZXJzaW9uKHZhbHVlLCB0aW1lem9uZSkpO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8TGlzdFxuICAgICAgc2VhcmNoQmFyUGxhY2Vob2xkZXI9XCJEYXRlXCJcbiAgICAgIGZpbHRlcmluZz17ZmFsc2V9XG4gICAgICBzZWFyY2hUZXh0PXtpbnB1dH1cbiAgICAgIG9uU2VhcmNoVGV4dENoYW5nZT17b25TZWFyY2hUZXh0Q2hhbmdlfVxuICAgICAgc2VhcmNoQmFyQWNjZXNzb3J5PXtcbiAgICAgICAgPExpc3QuRHJvcGRvd24gdG9vbHRpcD1cIlRpbWV6b25lXCIgb25DaGFuZ2U9e29uVGltZXpvbmVDaGFuZ2V9IGRlZmF1bHRWYWx1ZT17dGltZXpvbmV9PlxuICAgICAgICAgIHtJbnRsLnN1cHBvcnRlZFZhbHVlc09mKFwidGltZVpvbmVcIikubWFwKCh6b25lLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPExpc3QuRHJvcGRvd24uSXRlbSBrZXk9e2luZGV4fSB2YWx1ZT17em9uZX0gdGl0bGU9e3pvbmV9IC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvTGlzdC5Ecm9wZG93bj5cbiAgICAgIH1cbiAgICA+XG4gICAgICB7aXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICA8TGlzdC5JdGVtXG4gICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICB0aXRsZT17YCR7aXRlbS52YWx1ZX1gfVxuICAgICAgICAgIGFjY2Vzc29yaWVzPXtbeyB0YWc6IHsgdmFsdWU6IGl0ZW0ubGFiZWwsIGNvbG9yOiBDb2xvci5TZWNvbmRhcnlUZXh0IH0gfV19XG4gICAgICAgICAgYWN0aW9ucz17XG4gICAgICAgICAgICA8QWN0aW9uUGFuZWw+XG4gICAgICAgICAgICAgIDxBY3Rpb24uQ29weVRvQ2xpcGJvYXJkIGNvbnRlbnQ9e2l0ZW0udmFsdWV9IC8+XG4gICAgICAgICAgICAgIDxBY3Rpb24uUGFzdGUgY29udGVudD17aXRlbS52YWx1ZX0gLz5cbiAgICAgICAgICAgIDwvQWN0aW9uUGFuZWw+XG4gICAgICAgICAgfVxuICAgICAgICAvPlxuICAgICAgKSl9XG4gICAgPC9MaXN0PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBDb21tYW5kO1xuIiwgImltcG9ydCB7IENvbXBvbmVudCwgUGFyc2VkQ29tcG9uZW50cywgUGFyc2VkUmVzdWx0LCBQYXJzaW5nUmVmZXJlbmNlIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuaW1wb3J0IHF1YXJ0ZXJPZlllYXIgZnJvbSBcImRheWpzL3BsdWdpbi9xdWFydGVyT2ZZZWFyXCI7XG5pbXBvcnQgZGF5anMsIHsgUVVuaXRUeXBlIH0gZnJvbSBcImRheWpzXCI7XG5pbXBvcnQgeyBhc3NpZ25TaW1pbGFyRGF0ZSwgYXNzaWduU2ltaWxhclRpbWUsIGltcGx5U2ltaWxhclRpbWUgfSBmcm9tIFwiLi91dGlscy9kYXlqc1wiO1xuaW1wb3J0IHsgdG9UaW1lem9uZU9mZnNldCB9IGZyb20gXCIuL3RpbWV6b25lXCI7XG5kYXlqcy5leHRlbmQocXVhcnRlck9mWWVhcik7XG5cbmV4cG9ydCBjbGFzcyBSZWZlcmVuY2VXaXRoVGltZXpvbmUge1xuICAgIHJlYWRvbmx5IGluc3RhbnQ6IERhdGU7XG4gICAgcmVhZG9ubHkgdGltZXpvbmVPZmZzZXQ/OiBudW1iZXIgfCBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoaW5wdXQ/OiBQYXJzaW5nUmVmZXJlbmNlIHwgRGF0ZSkge1xuICAgICAgICBpbnB1dCA9IGlucHV0ID8/IG5ldyBEYXRlKCk7XG4gICAgICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFudCA9IGlucHV0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbnN0YW50ID0gaW5wdXQuaW5zdGFudCA/PyBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy50aW1lem9uZU9mZnNldCA9IHRvVGltZXpvbmVPZmZzZXQoaW5wdXQudGltZXpvbmUsIHRoaXMuaW5zdGFudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgSlMgZGF0ZSAoc3lzdGVtIHRpbWV6b25lKSB3aXRoIHRoZSB7IHllYXIsIG1vbnRoLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kIH0gZXF1YWwgdG8gdGhlIHJlZmVyZW5jZS5cbiAgICAgKiBUaGUgb3V0cHV0J3MgaW5zdGFudCBpcyBOT1QgdGhlIHJlZmVyZW5jZSdzIGluc3RhbnQgd2hlbiB0aGUgcmVmZXJlbmNlJ3MgYW5kIHN5c3RlbSdzIHRpbWV6b25lIGFyZSBkaWZmZXJlbnQuXG4gICAgICovXG4gICAgZ2V0RGF0ZVdpdGhBZGp1c3RlZFRpbWV6b25lKCkge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUodGhpcy5pbnN0YW50LmdldFRpbWUoKSArIHRoaXMuZ2V0U3lzdGVtVGltZXpvbmVBZGp1c3RtZW50TWludXRlKHRoaXMuaW5zdGFudCkgKiA2MDAwMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG1pbnV0ZXMgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBKUyBkYXRlJ3MgdGltZXpvbmUgYW5kIHRoZSByZWZlcmVuY2UgdGltZXpvbmUuXG4gICAgICogQHBhcmFtIGRhdGVcbiAgICAgKiBAcGFyYW0gb3ZlcnJpZGVUaW1lem9uZU9mZnNldFxuICAgICAqL1xuICAgIGdldFN5c3RlbVRpbWV6b25lQWRqdXN0bWVudE1pbnV0ZShkYXRlPzogRGF0ZSwgb3ZlcnJpZGVUaW1lem9uZU9mZnNldD86IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGlmICghZGF0ZSB8fCBkYXRlLmdldFRpbWUoKSA8IDApIHtcbiAgICAgICAgICAgIC8vIEphdmFzY3JpcHQgZGF0ZSB0aW1lem9uZSBjYWxjdWxhdGlvbiBnb3QgZWZmZWN0IHdoZW4gdGhlIHRpbWUgZXBvY2ggPCAwXG4gICAgICAgICAgICAvLyBlLmcuIG5ldyBEYXRlKCdUdWUgRmViIDAyIDEzMDAgMDA6MDA6MDAgR01UKzA5MDAgKEpTVCknKSA9PiBUdWUgRmViIDAyIDEzMDAgMDA6MTg6NTkgR01UKzA5MTggKEpTVClcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudFRpbWV6b25lT2Zmc2V0ID0gLWRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0VGltZXpvbmVPZmZzZXQgPSBvdmVycmlkZVRpbWV6b25lT2Zmc2V0ID8/IHRoaXMudGltZXpvbmVPZmZzZXQgPz8gY3VycmVudFRpbWV6b25lT2Zmc2V0O1xuICAgICAgICByZXR1cm4gY3VycmVudFRpbWV6b25lT2Zmc2V0IC0gdGFyZ2V0VGltZXpvbmVPZmZzZXQ7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGFyc2luZ0NvbXBvbmVudHMgaW1wbGVtZW50cyBQYXJzZWRDb21wb25lbnRzIHtcbiAgICBwcml2YXRlIGtub3duVmFsdWVzOiB7IFtjIGluIENvbXBvbmVudF0/OiBudW1iZXIgfTtcbiAgICBwcml2YXRlIGltcGxpZWRWYWx1ZXM6IHsgW2MgaW4gQ29tcG9uZW50XT86IG51bWJlciB9O1xuICAgIHByaXZhdGUgcmVmZXJlbmNlOiBSZWZlcmVuY2VXaXRoVGltZXpvbmU7XG4gICAgcHJpdmF0ZSBfdGFncyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gICAgY29uc3RydWN0b3IocmVmZXJlbmNlOiBSZWZlcmVuY2VXaXRoVGltZXpvbmUsIGtub3duQ29tcG9uZW50cz86IHsgW2MgaW4gQ29tcG9uZW50XT86IG51bWJlciB9KSB7XG4gICAgICAgIHRoaXMucmVmZXJlbmNlID0gcmVmZXJlbmNlO1xuICAgICAgICB0aGlzLmtub3duVmFsdWVzID0ge307XG4gICAgICAgIHRoaXMuaW1wbGllZFZhbHVlcyA9IHt9O1xuICAgICAgICBpZiAoa25vd25Db21wb25lbnRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBrbm93bkNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtub3duVmFsdWVzW2tleSBhcyBDb21wb25lbnRdID0ga25vd25Db21wb25lbnRzW2tleSBhcyBDb21wb25lbnRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVmRGF5SnMgPSBkYXlqcyhyZWZlcmVuY2UuaW5zdGFudCk7XG4gICAgICAgIHRoaXMuaW1wbHkoXCJkYXlcIiwgcmVmRGF5SnMuZGF0ZSgpKTtcbiAgICAgICAgdGhpcy5pbXBseShcIm1vbnRoXCIsIHJlZkRheUpzLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgdGhpcy5pbXBseShcInllYXJcIiwgcmVmRGF5SnMueWVhcigpKTtcbiAgICAgICAgdGhpcy5pbXBseShcImhvdXJcIiwgMTIpO1xuICAgICAgICB0aGlzLmltcGx5KFwibWludXRlXCIsIDApO1xuICAgICAgICB0aGlzLmltcGx5KFwic2Vjb25kXCIsIDApO1xuICAgICAgICB0aGlzLmltcGx5KFwibWlsbGlzZWNvbmRcIiwgMCk7XG4gICAgfVxuXG4gICAgZ2V0KGNvbXBvbmVudDogQ29tcG9uZW50KTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIGlmIChjb21wb25lbnQgaW4gdGhpcy5rbm93blZhbHVlcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMua25vd25WYWx1ZXNbY29tcG9uZW50XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21wb25lbnQgaW4gdGhpcy5pbXBsaWVkVmFsdWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbXBsaWVkVmFsdWVzW2NvbXBvbmVudF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpc0NlcnRhaW4oY29tcG9uZW50OiBDb21wb25lbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudCBpbiB0aGlzLmtub3duVmFsdWVzO1xuICAgIH1cblxuICAgIGdldENlcnRhaW5Db21wb25lbnRzKCk6IEFycmF5PENvbXBvbmVudD4ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5rbm93blZhbHVlcykgYXMgQXJyYXk8Q29tcG9uZW50PjtcbiAgICB9XG5cbiAgICBpbXBseShjb21wb25lbnQ6IENvbXBvbmVudCwgdmFsdWU6IG51bWJlcik6IFBhcnNpbmdDb21wb25lbnRzIHtcbiAgICAgICAgaWYgKGNvbXBvbmVudCBpbiB0aGlzLmtub3duVmFsdWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmltcGxpZWRWYWx1ZXNbY29tcG9uZW50XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBhc3NpZ24oY29tcG9uZW50OiBDb21wb25lbnQsIHZhbHVlOiBudW1iZXIpOiBQYXJzaW5nQ29tcG9uZW50cyB7XG4gICAgICAgIHRoaXMua25vd25WYWx1ZXNbY29tcG9uZW50XSA9IHZhbHVlO1xuICAgICAgICBkZWxldGUgdGhpcy5pbXBsaWVkVmFsdWVzW2NvbXBvbmVudF07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGRlbGV0ZShjb21wb25lbnQ6IENvbXBvbmVudCkge1xuICAgICAgICBkZWxldGUgdGhpcy5rbm93blZhbHVlc1tjb21wb25lbnRdO1xuICAgICAgICBkZWxldGUgdGhpcy5pbXBsaWVkVmFsdWVzW2NvbXBvbmVudF07XG4gICAgfVxuXG4gICAgY2xvbmUoKTogUGFyc2luZ0NvbXBvbmVudHMge1xuICAgICAgICBjb25zdCBjb21wb25lbnQgPSBuZXcgUGFyc2luZ0NvbXBvbmVudHModGhpcy5yZWZlcmVuY2UpO1xuICAgICAgICBjb21wb25lbnQua25vd25WYWx1ZXMgPSB7fTtcbiAgICAgICAgY29tcG9uZW50LmltcGxpZWRWYWx1ZXMgPSB7fTtcblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmtub3duVmFsdWVzKSB7XG4gICAgICAgICAgICBjb21wb25lbnQua25vd25WYWx1ZXNba2V5IGFzIENvbXBvbmVudF0gPSB0aGlzLmtub3duVmFsdWVzW2tleSBhcyBDb21wb25lbnRdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5pbXBsaWVkVmFsdWVzKSB7XG4gICAgICAgICAgICBjb21wb25lbnQuaW1wbGllZFZhbHVlc1trZXkgYXMgQ29tcG9uZW50XSA9IHRoaXMuaW1wbGllZFZhbHVlc1trZXkgYXMgQ29tcG9uZW50XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfVxuXG4gICAgaXNPbmx5RGF0ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzQ2VydGFpbihcImhvdXJcIikgJiYgIXRoaXMuaXNDZXJ0YWluKFwibWludXRlXCIpICYmICF0aGlzLmlzQ2VydGFpbihcInNlY29uZFwiKTtcbiAgICB9XG5cbiAgICBpc09ubHlUaW1lKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgIXRoaXMuaXNDZXJ0YWluKFwid2Vla2RheVwiKSAmJiAhdGhpcy5pc0NlcnRhaW4oXCJkYXlcIikgJiYgIXRoaXMuaXNDZXJ0YWluKFwibW9udGhcIikgJiYgIXRoaXMuaXNDZXJ0YWluKFwieWVhclwiKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGlzT25seVdlZWtkYXlDb21wb25lbnQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzQ2VydGFpbihcIndlZWtkYXlcIikgJiYgIXRoaXMuaXNDZXJ0YWluKFwiZGF5XCIpICYmICF0aGlzLmlzQ2VydGFpbihcIm1vbnRoXCIpO1xuICAgIH1cblxuICAgIGlzRGF0ZVdpdGhVbmtub3duWWVhcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNDZXJ0YWluKFwibW9udGhcIikgJiYgIXRoaXMuaXNDZXJ0YWluKFwieWVhclwiKTtcbiAgICB9XG5cbiAgICBpc1ZhbGlkRGF0ZSgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuZGF0ZVdpdGhvdXRUaW1lem9uZUFkanVzdG1lbnQoKTtcblxuICAgICAgICBpZiAoZGF0ZS5nZXRGdWxsWWVhcigpICE9PSB0aGlzLmdldChcInllYXJcIikpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGRhdGUuZ2V0TW9udGgoKSAhPT0gdGhpcy5nZXQoXCJtb250aFwiKSAtIDEpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGRhdGUuZ2V0RGF0ZSgpICE9PSB0aGlzLmdldChcImRheVwiKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5nZXQoXCJob3VyXCIpICE9IG51bGwgJiYgZGF0ZS5nZXRIb3VycygpICE9IHRoaXMuZ2V0KFwiaG91clwiKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5nZXQoXCJtaW51dGVcIikgIT0gbnVsbCAmJiBkYXRlLmdldE1pbnV0ZXMoKSAhPSB0aGlzLmdldChcIm1pbnV0ZVwiKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gYFtQYXJzaW5nQ29tcG9uZW50cyB7XG4gICAgICAgICAgICB0YWdzOiAke0pTT04uc3RyaW5naWZ5KEFycmF5LmZyb20odGhpcy5fdGFncykuc29ydCgpKX0sIFxuICAgICAgICAgICAga25vd25WYWx1ZXM6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5rbm93blZhbHVlcyl9LCBcbiAgICAgICAgICAgIGltcGxpZWRWYWx1ZXM6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5pbXBsaWVkVmFsdWVzKX19LCBcbiAgICAgICAgICAgIHJlZmVyZW5jZTogJHtKU09OLnN0cmluZ2lmeSh0aGlzLnJlZmVyZW5jZSl9XWA7XG4gICAgfVxuXG4gICAgZGF5anMoKSB7XG4gICAgICAgIHJldHVybiBkYXlqcyh0aGlzLmRhdGUoKSk7XG4gICAgfVxuXG4gICAgZGF0ZSgpOiBEYXRlIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuZGF0ZVdpdGhvdXRUaW1lem9uZUFkanVzdG1lbnQoKTtcbiAgICAgICAgY29uc3QgdGltZXpvbmVBZGp1c3RtZW50ID0gdGhpcy5yZWZlcmVuY2UuZ2V0U3lzdGVtVGltZXpvbmVBZGp1c3RtZW50TWludXRlKGRhdGUsIHRoaXMuZ2V0KFwidGltZXpvbmVPZmZzZXRcIikpO1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkgKyB0aW1lem9uZUFkanVzdG1lbnQgKiA2MDAwMCk7XG4gICAgfVxuXG4gICAgYWRkVGFnKHRhZzogc3RyaW5nKTogUGFyc2luZ0NvbXBvbmVudHMge1xuICAgICAgICB0aGlzLl90YWdzLmFkZCh0YWcpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBhZGRUYWdzKHRhZ3M6IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4pOiBQYXJzaW5nQ29tcG9uZW50cyB7XG4gICAgICAgIGZvciAoY29uc3QgdGFnIG9mIHRhZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhZ3MuYWRkKHRhZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGFncygpOiBTZXQ8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBuZXcgU2V0KHRoaXMuX3RhZ3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGF0ZVdpdGhvdXRUaW1lem9uZUFkanVzdG1lbnQoKSB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShcbiAgICAgICAgICAgIHRoaXMuZ2V0KFwieWVhclwiKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0KFwibW9udGhcIikgLSAxLFxuICAgICAgICAgICAgdGhpcy5nZXQoXCJkYXlcIiksXG4gICAgICAgICAgICB0aGlzLmdldChcImhvdXJcIiksXG4gICAgICAgICAgICB0aGlzLmdldChcIm1pbnV0ZVwiKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0KFwic2Vjb25kXCIpLFxuICAgICAgICAgICAgdGhpcy5nZXQoXCJtaWxsaXNlY29uZFwiKVxuICAgICAgICApO1xuXG4gICAgICAgIGRhdGUuc2V0RnVsbFllYXIodGhpcy5nZXQoXCJ5ZWFyXCIpKTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZVJlbGF0aXZlRnJvbVJlZmVyZW5jZShcbiAgICAgICAgcmVmZXJlbmNlOiBSZWZlcmVuY2VXaXRoVGltZXpvbmUsXG4gICAgICAgIGZyYWdtZW50czogeyBbYyBpbiBRVW5pdFR5cGVdPzogbnVtYmVyIH1cbiAgICApOiBQYXJzaW5nQ29tcG9uZW50cyB7XG4gICAgICAgIGxldCBkYXRlID0gZGF5anMocmVmZXJlbmNlLmluc3RhbnQpO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBmcmFnbWVudHMpIHtcbiAgICAgICAgICAgIGRhdGUgPSBkYXRlLmFkZChmcmFnbWVudHNba2V5IGFzIFFVbml0VHlwZV0sIGtleSBhcyBRVW5pdFR5cGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IG5ldyBQYXJzaW5nQ29tcG9uZW50cyhyZWZlcmVuY2UpO1xuICAgICAgICBjb21wb25lbnRzLmFkZFRhZyhcInJlc3VsdC9yZWxhdGl2ZURhdGVcIik7XG4gICAgICAgIGlmIChmcmFnbWVudHNbXCJob3VyXCJdIHx8IGZyYWdtZW50c1tcIm1pbnV0ZVwiXSB8fCBmcmFnbWVudHNbXCJzZWNvbmRcIl0pIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMuYWRkVGFnKFwicmVzdWx0L3JlbGF0aXZlRGF0ZUFuZFRpbWVcIik7XG4gICAgICAgICAgICBhc3NpZ25TaW1pbGFyVGltZShjb21wb25lbnRzLCBkYXRlKTtcbiAgICAgICAgICAgIGFzc2lnblNpbWlsYXJEYXRlKGNvbXBvbmVudHMsIGRhdGUpO1xuICAgICAgICAgICAgaWYgKHJlZmVyZW5jZS50aW1lem9uZU9mZnNldCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMuYXNzaWduKFwidGltZXpvbmVPZmZzZXRcIiwgLXJlZmVyZW5jZS5pbnN0YW50LmdldFRpbWV6b25lT2Zmc2V0KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW1wbHlTaW1pbGFyVGltZShjb21wb25lbnRzLCBkYXRlKTtcbiAgICAgICAgICAgIGlmIChyZWZlcmVuY2UudGltZXpvbmVPZmZzZXQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzLmltcGx5KFwidGltZXpvbmVPZmZzZXRcIiwgLXJlZmVyZW5jZS5pbnN0YW50LmdldFRpbWV6b25lT2Zmc2V0KCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZnJhZ21lbnRzW1wiZFwiXSkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMuYXNzaWduKFwiZGF5XCIsIGRhdGUuZGF0ZSgpKTtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzLmFzc2lnbihcIm1vbnRoXCIsIGRhdGUubW9udGgoKSArIDEpO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMuYXNzaWduKFwieWVhclwiLCBkYXRlLnllYXIoKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZyYWdtZW50c1tcIndlZWtcIl0pIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzLmFzc2lnbihcImRheVwiLCBkYXRlLmRhdGUoKSk7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50cy5hc3NpZ24oXCJtb250aFwiLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzLmFzc2lnbihcInllYXJcIiwgZGF0ZS55ZWFyKCkpO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMuaW1wbHkoXCJ3ZWVrZGF5XCIsIGRhdGUuZGF5KCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzLmltcGx5KFwiZGF5XCIsIGRhdGUuZGF0ZSgpKTtcbiAgICAgICAgICAgICAgICBpZiAoZnJhZ21lbnRzW1wibW9udGhcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50cy5hc3NpZ24oXCJtb250aFwiLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50cy5hc3NpZ24oXCJ5ZWFyXCIsIGRhdGUueWVhcigpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLmltcGx5KFwibW9udGhcIiwgZGF0ZS5tb250aCgpICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmcmFnbWVudHNbXCJ5ZWFyXCJdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLmFzc2lnbihcInllYXJcIiwgZGF0ZS55ZWFyKCkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50cy5pbXBseShcInllYXJcIiwgZGF0ZS55ZWFyKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudHM7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGFyc2luZ1Jlc3VsdCBpbXBsZW1lbnRzIFBhcnNlZFJlc3VsdCB7XG4gICAgcmVmRGF0ZTogRGF0ZTtcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIHRleHQ6IHN0cmluZztcblxuICAgIHJlZmVyZW5jZTogUmVmZXJlbmNlV2l0aFRpbWV6b25lO1xuXG4gICAgc3RhcnQ6IFBhcnNpbmdDb21wb25lbnRzO1xuICAgIGVuZD86IFBhcnNpbmdDb21wb25lbnRzO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlZmVyZW5jZTogUmVmZXJlbmNlV2l0aFRpbWV6b25lLFxuICAgICAgICBpbmRleDogbnVtYmVyLFxuICAgICAgICB0ZXh0OiBzdHJpbmcsXG4gICAgICAgIHN0YXJ0PzogUGFyc2luZ0NvbXBvbmVudHMsXG4gICAgICAgIGVuZD86IFBhcnNpbmdDb21wb25lbnRzXG4gICAgKSB7XG4gICAgICAgIHRoaXMucmVmZXJlbmNlID0gcmVmZXJlbmNlO1xuICAgICAgICB0aGlzLnJlZkRhdGUgPSByZWZlcmVuY2UuaW5zdGFudDtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICB0aGlzLnN0YXJ0ID0gc3RhcnQgfHwgbmV3IFBhcnNpbmdDb21wb25lbnRzKHJlZmVyZW5jZSk7XG4gICAgICAgIHRoaXMuZW5kID0gZW5kO1xuICAgIH1cblxuICAgIGNsb25lKCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgUGFyc2luZ1Jlc3VsdCh0aGlzLnJlZmVyZW5jZSwgdGhpcy5pbmRleCwgdGhpcy50ZXh0KTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0ID0gdGhpcy5zdGFydCA/IHRoaXMuc3RhcnQuY2xvbmUoKSA6IG51bGw7XG4gICAgICAgIHJlc3VsdC5lbmQgPSB0aGlzLmVuZCA/IHRoaXMuZW5kLmNsb25lKCkgOiBudWxsO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGRhdGUoKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0LmRhdGUoKTtcbiAgICB9XG5cbiAgICBhZGRUYWcodGFnOiBzdHJpbmcpOiBQYXJzaW5nUmVzdWx0IHtcbiAgICAgICAgdGhpcy5zdGFydC5hZGRUYWcodGFnKTtcbiAgICAgICAgaWYgKHRoaXMuZW5kKSB7XG4gICAgICAgICAgICB0aGlzLmVuZC5hZGRUYWcodGFnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBhZGRUYWdzKHRhZ3M6IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4pOiBQYXJzaW5nUmVzdWx0IHtcbiAgICAgICAgdGhpcy5zdGFydC5hZGRUYWdzKHRhZ3MpO1xuICAgICAgICBpZiAodGhpcy5lbmQpIHtcbiAgICAgICAgICAgIHRoaXMuZW5kLmFkZFRhZ3ModGFncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGFncygpOiBTZXQ8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGNvbWJpbmVkVGFnczogU2V0PHN0cmluZz4gPSBuZXcgU2V0KHRoaXMuc3RhcnQudGFncygpKTtcbiAgICAgICAgaWYgKHRoaXMuZW5kKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRhZyBvZiB0aGlzLmVuZC50YWdzKCkpIHtcbiAgICAgICAgICAgICAgICBjb21iaW5lZFRhZ3MuYWRkKHRhZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbWJpbmVkVGFncztcbiAgICB9XG5cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgY29uc3QgdGFncyA9IEFycmF5LmZyb20odGhpcy50YWdzKCkpLnNvcnQoKTtcbiAgICAgICAgcmV0dXJuIGBbUGFyc2luZ1Jlc3VsdCB7aW5kZXg6ICR7dGhpcy5pbmRleH0sIHRleHQ6ICcke3RoaXMudGV4dH0nLCB0YWdzOiAke0pTT04uc3RyaW5naWZ5KHRhZ3MpfSAuLi59XWA7XG4gICAgfVxufVxuIiwgImltcG9ydCB7IERlYnVnQ29uc3VtZSwgRGVidWdIYW5kbGVyIH0gZnJvbSBcIi4vZGVidWdnaW5nXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFyc2luZ09wdGlvbiB7XG4gICAgLyoqXG4gICAgICogVG8gcGFyc2Ugb25seSBmb3J3YXJkIGRhdGVzICh0aGUgcmVzdWx0cyBzaG91bGQgYmUgYWZ0ZXIgdGhlIHJlZmVyZW5jZSBkYXRlKS5cbiAgICAgKiBUaGlzIGVmZmVjdHMgZGF0ZS90aW1lIGltcGxpY2F0aW9uIChlLmcuIHdlZWtkYXkgb3IgdGltZSBtZW50aW9uaW5nKVxuICAgICAqL1xuICAgIGZvcndhcmREYXRlPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEFkZGl0aW9uYWwgdGltZXpvbmUga2V5d29yZHMgZm9yIHRoZSBwYXJzZXJzIHRvIHJlY29nbml6ZS5cbiAgICAgKiBBbnkgdmFsdWUgcHJvdmlkZWQgd2lsbCBvdmVycmlkZSB0aGUgZGVmYXVsdCBoYW5kbGluZyBvZiB0aGF0IHZhbHVlLlxuICAgICAqL1xuICAgIHRpbWV6b25lcz86IFRpbWV6b25lQWJick1hcDtcblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIGRlYnVnIGV2ZW50IGhhbmRsZXIuXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgZGVidWc/OiBEZWJ1Z0hhbmRsZXIgfCBEZWJ1Z0NvbnN1bWU7XG59XG5cbi8qKlxuICogU29tZSB0aW1lem9uZSBhYmJyZXZpYXRpb25zIGFyZSBhbWJpZ3VvdXMgaW4gdGhhdCB0aGV5IHJlZmVyIHRvIGRpZmZlcmVudCBvZmZzZXRzXG4gKiBkZXBlbmRpbmcgb24gdGhlIHRpbWUgb2YgeWVhciBcdTIwMTQgZGF5bGlnaHQgc2F2aW5ncyB0aW1lIChEU1QpLCBvciBub24tRFNULiBUaGlzIGludGVyZmFjZVxuICogYWxsb3dzIGRlZmluaW5nIHN1Y2ggdGltZXpvbmVzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQW1iaWd1b3VzVGltZXpvbmVNYXAge1xuICAgIHRpbWV6b25lT2Zmc2V0RHVyaW5nRHN0OiBudW1iZXI7XG4gICAgdGltZXpvbmVPZmZzZXROb25Ec3Q6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIHN0YXJ0IGRhdGUgb2YgRFNUIGZvciB0aGUgZ2l2ZW4geWVhci5cbiAgICAgKiB0aW1lem9uZS50cyBjb250YWlucyBoZWxwZXIgbWV0aG9kcyBmb3IgY29tbW9uIHN1Y2ggcnVsZXMuXG4gICAgICovXG4gICAgZHN0U3RhcnQ6ICh5ZWFyOiBudW1iZXIpID0+IERhdGU7XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBlbmQgZGF0ZSBvZiBEU1QgZm9yIHRoZSBnaXZlbiB5ZWFyLlxuICAgICAqIHRpbWV6b25lLnRzIGNvbnRhaW5zIGhlbHBlciBtZXRob2RzIGZvciBjb21tb24gc3VjaCBydWxlcy5cbiAgICAgKi9cbiAgICBkc3RFbmQ6ICh5ZWFyOiBudW1iZXIpID0+IERhdGU7XG59XG5cbi8qKlxuICogQSBtYXAgZGVzY3JpYmluZyBob3cgdGltZXpvbmUgYWJicmV2aWF0aW9ucyBzaG91bGQgbWFwIHRvIHRpbWUgb2Zmc2V0cy5cbiAqIFN1cHBvcnRzIGJvdGggdW5hbWJpZ291cyBtYXBwaW5ncyBhYmJyZXZpYXRpb24gPT4gb2Zmc2V0LFxuICogYW5kIGFtYmlndW91cyBtYXBwaW5ncywgd2hlcmUgdGhlIG9mZnNldCB3aWxsIGRlcGVuZCBvbiB3aGV0aGVyIHRoZVxuICogdGltZSBpbiBxdWVzdGlvbiBpcyBkdXJpbmcgZGF5bGlnaHQgc2F2aW5ncyB0aW1lIG9yIG5vdC5cbiAqL1xuZXhwb3J0IHR5cGUgVGltZXpvbmVBYmJyTWFwID0geyBba2V5OiBzdHJpbmddOiBudW1iZXIgfCBBbWJpZ3VvdXNUaW1lem9uZU1hcCB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFBhcnNpbmdSZWZlcmVuY2Uge1xuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSBkYXRlLiBUaGUgaW5zdGFudCAoSmF2YVNjcmlwdCBEYXRlIG9iamVjdCkgd2hlbiB0aGUgaW5wdXQgaXMgd3JpdHRlbiBvciBtZW50aW9uLlxuICAgICAqIFRoaXMgZWZmZWN0IGRhdGUvdGltZSBpbXBsaWNhdGlvbiAoZS5nLiB3ZWVrZGF5IG9yIHRpbWUgbWVudGlvbmluZykuXG4gICAgICogKGRlZmF1bHQgPSBub3cpXG4gICAgICovXG4gICAgaW5zdGFudD86IERhdGU7XG5cbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgdGltZXpvbmUuIFRoZSB0aW1lem9uZSB3aGVyZSB0aGUgaW5wdXQgaXMgd3JpdHRlbiBvciBtZW50aW9uLlxuICAgICAqIERhdGUvdGltZSBpbXBsaWNhdGlvbiB3aWxsIGFjY291bnQgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBpbnB1dCB0aW1lem9uZSBhbmQgdGhlIGN1cnJlbnQgc3lzdGVtIHRpbWV6b25lLlxuICAgICAqIChkZWZhdWx0ID0gY3VycmVudCB0aW1lem9uZSlcbiAgICAgKi9cbiAgICB0aW1lem9uZT86IHN0cmluZyB8IG51bWJlcjtcbn1cblxuLyoqXG4gKiBQYXJzZWQgcmVzdWx0IG9yIGZpbmFsIG91dHB1dC5cbiAqIEVhY2ggcmVzdWx0IG9iamVjdCByZXByZXNlbnRzIGEgZGF0ZS90aW1lIChvciBkYXRlL3RpbWUtcmFuZ2UpIG1lbnRpb25pbmcgaW4gdGhlIGlucHV0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBhcnNlZFJlc3VsdCB7XG4gICAgcmVhZG9ubHkgcmVmRGF0ZTogRGF0ZTtcbiAgICByZWFkb25seSBpbmRleDogbnVtYmVyO1xuICAgIHJlYWRvbmx5IHRleHQ6IHN0cmluZztcblxuICAgIHJlYWRvbmx5IHN0YXJ0OiBQYXJzZWRDb21wb25lbnRzO1xuICAgIHJlYWRvbmx5IGVuZD86IFBhcnNlZENvbXBvbmVudHM7XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIGEgamF2YXNjcmlwdCBkYXRlIG9iamVjdCBjcmVhdGVkIGZyb20gdGhlIGByZXN1bHQuc3RhcnRgLlxuICAgICAqL1xuICAgIGRhdGUoKTogRGF0ZTtcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gZGVidWdnaW5nIHRhZ3MgY29tYmluZWQgb2YgdGhlIGByZXN1bHQuc3RhcnRgIGFuZCBgcmVzdWx0LmVuZGAuXG4gICAgICovXG4gICAgdGFncygpOiBTZXQ8c3RyaW5nPjtcbn1cblxuLyoqXG4gKiBBIGNvbGxlY3Rpb24gb2YgcGFyc2VkIGRhdGUvdGltZSBjb21wb25lbnRzIChlLmcuIGRheSwgaG91ciwgbWludXRlLCAuLi4sIGV0YykuXG4gKlxuICogRWFjaCBwYXJzZWQgY29tcG9uZW50IGhhcyB0aHJlZSBkaWZmZXJlbnQgbGV2ZWxzIG9mIGNlcnRhaW50eS5cbiAqIC0gKkNlcnRhaW4qIChvciAqS25vd24qKTogVGhlIGNvbXBvbmVudCBpcyBkaXJlY3RseSBtZW50aW9uZWQgYW5kIHBhcnNlZC5cbiAqIC0gKkltcGxpZWQqOiBUaGUgY29tcG9uZW50IGlzIG5vdCBkaXJlY3RseSBtZW50aW9uZWQsIGJ1dCBpbXBsaWVkIGJ5IG90aGVyIHBhcnNlZCBpbmZvcm1hdGlvbi5cbiAqIC0gKlVua25vd24qOiBDb21wbGV0ZWx5IG5vIG1lbnRpb24gb2YgdGhlIGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQYXJzZWRDb21wb25lbnRzIHtcbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGUgY29tcG9uZW50IGNlcnRhaW5seSBpZiB0aGUgY29tcG9uZW50IGlzICpDZXJ0YWluKiAob3IgKktub3duKilcbiAgICAgKi9cbiAgICBpc0NlcnRhaW4oY29tcG9uZW50OiBDb21wb25lbnQpOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjb21wb25lbnQgdmFsdWUgZm9yIGVpdGhlciAqQ2VydGFpbiogb3IgKkltcGxpZWQqIHZhbHVlLlxuICAgICAqL1xuICAgIGdldChjb21wb25lbnQ6IENvbXBvbmVudCk6IG51bWJlciB8IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIGEgamF2YXNjcmlwdCBkYXRlIG9iamVjdC5cbiAgICAgKi9cbiAgICBkYXRlKCk6IERhdGU7XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIGRlYnVnZ2luZyB0YWdzIG9mIHRoZSBwYXJzZWQgY29tcG9uZW50LlxuICAgICAqL1xuICAgIHRhZ3MoKTogU2V0PHN0cmluZz47XG59XG5cbmV4cG9ydCB0eXBlIENvbXBvbmVudCA9XG4gICAgfCBcInllYXJcIlxuICAgIHwgXCJtb250aFwiXG4gICAgfCBcImRheVwiXG4gICAgfCBcIndlZWtkYXlcIlxuICAgIHwgXCJob3VyXCJcbiAgICB8IFwibWludXRlXCJcbiAgICB8IFwic2Vjb25kXCJcbiAgICB8IFwibWlsbGlzZWNvbmRcIlxuICAgIHwgXCJtZXJpZGllbVwiXG4gICAgfCBcInRpbWV6b25lT2Zmc2V0XCI7XG5cbmV4cG9ydCBlbnVtIE1lcmlkaWVtIHtcbiAgICBBTSA9IDAsXG4gICAgUE0gPSAxLFxufVxuXG5leHBvcnQgZW51bSBXZWVrZGF5IHtcbiAgICBTVU5EQVkgPSAwLFxuICAgIE1PTkRBWSA9IDEsXG4gICAgVFVFU0RBWSA9IDIsXG4gICAgV0VETkVTREFZID0gMyxcbiAgICBUSFVSU0RBWSA9IDQsXG4gICAgRlJJREFZID0gNSxcbiAgICBTQVRVUkRBWSA9IDYsXG59XG5cbmV4cG9ydCBlbnVtIE1vbnRoIHtcbiAgICBKQU5VQVJZID0gMSxcbiAgICBGRUJSVUFSWSA9IDIsXG4gICAgTUFSQ0ggPSAzLFxuICAgIEFQUklMID0gNCxcbiAgICBNQVkgPSA1LFxuICAgIEpVTkUgPSA2LFxuICAgIEpVTFkgPSA3LFxuICAgIEFVR1VTVCA9IDgsXG4gICAgU0VQVEVNQkVSID0gOSxcbiAgICBPQ1RPQkVSID0gMTAsXG4gICAgTk9WRU1CRVIgPSAxMSxcbiAgICBERUNFTUJFUiA9IDEyLFxufVxuIiwgImltcG9ydCB7IFBhcnNpbmdDb21wb25lbnRzIH0gZnJvbSBcIi4uL3Jlc3VsdHNcIjtcbmltcG9ydCBkYXlqcyBmcm9tIFwiZGF5anNcIjtcbmltcG9ydCB7IE1lcmlkaWVtIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25UaGVOZXh0RGF5KGNvbXBvbmVudDogUGFyc2luZ0NvbXBvbmVudHMsIHRhcmdldERheUpzOiBkYXlqcy5EYXlqcykge1xuICAgIHRhcmdldERheUpzID0gdGFyZ2V0RGF5SnMuYWRkKDEsIFwiZGF5XCIpO1xuICAgIGFzc2lnblNpbWlsYXJEYXRlKGNvbXBvbmVudCwgdGFyZ2V0RGF5SnMpO1xuICAgIGltcGx5U2ltaWxhclRpbWUoY29tcG9uZW50LCB0YXJnZXREYXlKcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbXBseVRoZU5leHREYXkoY29tcG9uZW50OiBQYXJzaW5nQ29tcG9uZW50cywgdGFyZ2V0RGF5SnM6IGRheWpzLkRheWpzKSB7XG4gICAgdGFyZ2V0RGF5SnMgPSB0YXJnZXREYXlKcy5hZGQoMSwgXCJkYXlcIik7XG4gICAgaW1wbHlTaW1pbGFyRGF0ZShjb21wb25lbnQsIHRhcmdldERheUpzKTtcbiAgICBpbXBseVNpbWlsYXJUaW1lKGNvbXBvbmVudCwgdGFyZ2V0RGF5SnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduU2ltaWxhckRhdGUoY29tcG9uZW50OiBQYXJzaW5nQ29tcG9uZW50cywgdGFyZ2V0RGF5SnM6IGRheWpzLkRheWpzKSB7XG4gICAgY29tcG9uZW50LmFzc2lnbihcImRheVwiLCB0YXJnZXREYXlKcy5kYXRlKCkpO1xuICAgIGNvbXBvbmVudC5hc3NpZ24oXCJtb250aFwiLCB0YXJnZXREYXlKcy5tb250aCgpICsgMSk7XG4gICAgY29tcG9uZW50LmFzc2lnbihcInllYXJcIiwgdGFyZ2V0RGF5SnMueWVhcigpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnblNpbWlsYXJUaW1lKGNvbXBvbmVudDogUGFyc2luZ0NvbXBvbmVudHMsIHRhcmdldERheUpzOiBkYXlqcy5EYXlqcykge1xuICAgIGNvbXBvbmVudC5hc3NpZ24oXCJob3VyXCIsIHRhcmdldERheUpzLmhvdXIoKSk7XG4gICAgY29tcG9uZW50LmFzc2lnbihcIm1pbnV0ZVwiLCB0YXJnZXREYXlKcy5taW51dGUoKSk7XG4gICAgY29tcG9uZW50LmFzc2lnbihcInNlY29uZFwiLCB0YXJnZXREYXlKcy5zZWNvbmQoKSk7XG4gICAgY29tcG9uZW50LmFzc2lnbihcIm1pbGxpc2Vjb25kXCIsIHRhcmdldERheUpzLm1pbGxpc2Vjb25kKCkpO1xuICAgIGlmIChjb21wb25lbnQuZ2V0KFwiaG91clwiKSA8IDEyKSB7XG4gICAgICAgIGNvbXBvbmVudC5hc3NpZ24oXCJtZXJpZGllbVwiLCBNZXJpZGllbS5BTSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29tcG9uZW50LmFzc2lnbihcIm1lcmlkaWVtXCIsIE1lcmlkaWVtLlBNKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbXBseVNpbWlsYXJEYXRlKGNvbXBvbmVudDogUGFyc2luZ0NvbXBvbmVudHMsIHRhcmdldERheUpzOiBkYXlqcy5EYXlqcykge1xuICAgIGNvbXBvbmVudC5pbXBseShcImRheVwiLCB0YXJnZXREYXlKcy5kYXRlKCkpO1xuICAgIGNvbXBvbmVudC5pbXBseShcIm1vbnRoXCIsIHRhcmdldERheUpzLm1vbnRoKCkgKyAxKTtcbiAgICBjb21wb25lbnQuaW1wbHkoXCJ5ZWFyXCIsIHRhcmdldERheUpzLnllYXIoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbXBseVNpbWlsYXJUaW1lKGNvbXBvbmVudDogUGFyc2luZ0NvbXBvbmVudHMsIHRhcmdldERheUpzOiBkYXlqcy5EYXlqcykge1xuICAgIGNvbXBvbmVudC5pbXBseShcImhvdXJcIiwgdGFyZ2V0RGF5SnMuaG91cigpKTtcbiAgICBjb21wb25lbnQuaW1wbHkoXCJtaW51dGVcIiwgdGFyZ2V0RGF5SnMubWludXRlKCkpO1xuICAgIGNvbXBvbmVudC5pbXBseShcInNlY29uZFwiLCB0YXJnZXREYXlKcy5zZWNvbmQoKSk7XG4gICAgY29tcG9uZW50LmltcGx5KFwibWlsbGlzZWNvbmRcIiwgdGFyZ2V0RGF5SnMubWlsbGlzZWNvbmQoKSk7XG59XG4iLCAiaW1wb3J0IGRheWpzIGZyb20gXCJkYXlqc1wiO1xuaW1wb3J0IHsgVGltZXpvbmVBYmJyTWFwLCBXZWVrZGF5LCBNb250aCB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBUSU1FWk9ORV9BQkJSX01BUDogVGltZXpvbmVBYmJyTWFwID0ge1xuICAgIEFDRFQ6IDYzMCxcbiAgICBBQ1NUOiA1NzAsXG4gICAgQURUOiAtMTgwLFxuICAgIEFFRFQ6IDY2MCxcbiAgICBBRVNUOiA2MDAsXG4gICAgQUZUOiAyNzAsXG4gICAgQUtEVDogLTQ4MCxcbiAgICBBS1NUOiAtNTQwLFxuICAgIEFMTVQ6IDM2MCxcbiAgICBBTVNUOiAtMTgwLFxuICAgIEFNVDogLTI0MCxcbiAgICBBTkFTVDogNzIwLFxuICAgIEFOQVQ6IDcyMCxcbiAgICBBUVRUOiAzMDAsXG4gICAgQVJUOiAtMTgwLFxuICAgIEFTVDogLTI0MCxcbiAgICBBV0RUOiA1NDAsXG4gICAgQVdTVDogNDgwLFxuICAgIEFaT1NUOiAwLFxuICAgIEFaT1Q6IC02MCxcbiAgICBBWlNUOiAzMDAsXG4gICAgQVpUOiAyNDAsXG4gICAgQk5UOiA0ODAsXG4gICAgQk9UOiAtMjQwLFxuICAgIEJSU1Q6IC0xMjAsXG4gICAgQlJUOiAtMTgwLFxuICAgIEJTVDogNjAsXG4gICAgQlRUOiAzNjAsXG4gICAgQ0FTVDogNDgwLFxuICAgIENBVDogMTIwLFxuICAgIENDVDogMzkwLFxuICAgIENEVDogLTMwMCxcbiAgICBDRVNUOiAxMjAsXG4gICAgLy8gTm90ZTogTWFueSBzb3VyY2VzIGRlZmluZSBDRVQgYXMgYSBjb25zdGFudCBVVEMrMS4gSW4gY29tbW9uIHVzYWdlLCBob3dldmVyLFxuICAgIC8vIENFVCB1c3VhbGx5IHJlZmVycyB0byB0aGUgdGltZSBvYnNlcnZlZCBpbiBtb3N0IG9mIEV1cm9wZSwgYmUgaXQgc3RhbmRhcmQgdGltZSBvciBkYXlsaWdodCBzYXZpbmcgdGltZS5cbiAgICBDRVQ6IHtcbiAgICAgICAgdGltZXpvbmVPZmZzZXREdXJpbmdEc3Q6IDIgKiA2MCxcbiAgICAgICAgdGltZXpvbmVPZmZzZXROb25Ec3Q6IDYwLFxuICAgICAgICBkc3RTdGFydDogKHllYXI6IG51bWJlcikgPT4gZ2V0TGFzdFdlZWtkYXlPZk1vbnRoKHllYXIsIE1vbnRoLk1BUkNILCBXZWVrZGF5LlNVTkRBWSwgMiksXG4gICAgICAgIGRzdEVuZDogKHllYXI6IG51bWJlcikgPT4gZ2V0TGFzdFdlZWtkYXlPZk1vbnRoKHllYXIsIE1vbnRoLk9DVE9CRVIsIFdlZWtkYXkuU1VOREFZLCAzKSxcbiAgICB9LFxuICAgIENIQURUOiA4MjUsXG4gICAgQ0hBU1Q6IDc2NSxcbiAgICBDS1Q6IC02MDAsXG4gICAgQ0xTVDogLTE4MCxcbiAgICBDTFQ6IC0yNDAsXG4gICAgQ09UOiAtMzAwLFxuICAgIENTVDogLTM2MCxcbiAgICBDVDoge1xuICAgICAgICB0aW1lem9uZU9mZnNldER1cmluZ0RzdDogLTUgKiA2MCxcbiAgICAgICAgdGltZXpvbmVPZmZzZXROb25Ec3Q6IC02ICogNjAsXG4gICAgICAgIGRzdFN0YXJ0OiAoeWVhcjogbnVtYmVyKSA9PiBnZXROdGhXZWVrZGF5T2ZNb250aCh5ZWFyLCBNb250aC5NQVJDSCwgV2Vla2RheS5TVU5EQVksIDIsIDIpLFxuICAgICAgICBkc3RFbmQ6ICh5ZWFyOiBudW1iZXIpID0+IGdldE50aFdlZWtkYXlPZk1vbnRoKHllYXIsIE1vbnRoLk5PVkVNQkVSLCBXZWVrZGF5LlNVTkRBWSwgMSwgMiksXG4gICAgfSxcbiAgICBDVlQ6IC02MCxcbiAgICBDWFQ6IDQyMCxcbiAgICBDaFNUOiA2MDAsXG4gICAgREFWVDogNDIwLFxuICAgIEVBU1NUOiAtMzAwLFxuICAgIEVBU1Q6IC0zNjAsXG4gICAgRUFUOiAxODAsXG4gICAgRUNUOiAtMzAwLFxuICAgIEVEVDogLTI0MCxcbiAgICBFRVNUOiAxODAsXG4gICAgRUVUOiAxMjAsXG4gICAgRUdTVDogMCxcbiAgICBFR1Q6IC02MCxcbiAgICBFU1Q6IC0zMDAsXG4gICAgRVQ6IHtcbiAgICAgICAgdGltZXpvbmVPZmZzZXREdXJpbmdEc3Q6IC00ICogNjAsXG4gICAgICAgIHRpbWV6b25lT2Zmc2V0Tm9uRHN0OiAtNSAqIDYwLFxuICAgICAgICBkc3RTdGFydDogKHllYXI6IG51bWJlcikgPT4gZ2V0TnRoV2Vla2RheU9mTW9udGgoeWVhciwgTW9udGguTUFSQ0gsIFdlZWtkYXkuU1VOREFZLCAyLCAyKSxcbiAgICAgICAgZHN0RW5kOiAoeWVhcjogbnVtYmVyKSA9PiBnZXROdGhXZWVrZGF5T2ZNb250aCh5ZWFyLCBNb250aC5OT1ZFTUJFUiwgV2Vla2RheS5TVU5EQVksIDEsIDIpLFxuICAgIH0sXG4gICAgRkpTVDogNzgwLFxuICAgIEZKVDogNzIwLFxuICAgIEZLU1Q6IC0xODAsXG4gICAgRktUOiAtMjQwLFxuICAgIEZOVDogLTEyMCxcbiAgICBHQUxUOiAtMzYwLFxuICAgIEdBTVQ6IC01NDAsXG4gICAgR0VUOiAyNDAsXG4gICAgR0ZUOiAtMTgwLFxuICAgIEdJTFQ6IDcyMCxcbiAgICBHTVQ6IDAsXG4gICAgR1NUOiAyNDAsXG4gICAgR1lUOiAtMjQwLFxuICAgIEhBQTogLTE4MCxcbiAgICBIQUM6IC0zMDAsXG4gICAgSEFEVDogLTU0MCxcbiAgICBIQUU6IC0yNDAsXG4gICAgSEFQOiAtNDIwLFxuICAgIEhBUjogLTM2MCxcbiAgICBIQVNUOiAtNjAwLFxuICAgIEhBVDogLTkwLFxuICAgIEhBWTogLTQ4MCxcbiAgICBIS1Q6IDQ4MCxcbiAgICBITFY6IC0yMTAsXG4gICAgSE5BOiAtMjQwLFxuICAgIEhOQzogLTM2MCxcbiAgICBITkU6IC0zMDAsXG4gICAgSE5QOiAtNDgwLFxuICAgIEhOUjogLTQyMCxcbiAgICBITlQ6IC0xNTAsXG4gICAgSE5ZOiAtNTQwLFxuICAgIEhPVlQ6IDQyMCxcbiAgICBJQ1Q6IDQyMCxcbiAgICBJRFQ6IDE4MCxcbiAgICBJT1Q6IDM2MCxcbiAgICBJUkRUOiAyNzAsXG4gICAgSVJLU1Q6IDU0MCxcbiAgICBJUktUOiA1NDAsXG4gICAgSVJTVDogMjEwLFxuICAgIElTVDogMzMwLFxuICAgIEpTVDogNTQwLFxuICAgIEtHVDogMzYwLFxuICAgIEtSQVNUOiA0ODAsXG4gICAgS1JBVDogNDgwLFxuICAgIEtTVDogNTQwLFxuICAgIEtVWVQ6IDI0MCxcbiAgICBMSERUOiA2NjAsXG4gICAgTEhTVDogNjMwLFxuICAgIExJTlQ6IDg0MCxcbiAgICBNQUdTVDogNzIwLFxuICAgIE1BR1Q6IDcyMCxcbiAgICBNQVJUOiAtNTEwLFxuICAgIE1BV1Q6IDMwMCxcbiAgICBNRFQ6IC0zNjAsXG4gICAgTUVTWjogMTIwLFxuICAgIE1FWjogNjAsXG4gICAgTUhUOiA3MjAsXG4gICAgTU1UOiAzOTAsXG4gICAgTVNEOiAyNDAsXG4gICAgTVNLOiAxODAsXG4gICAgTVNUOiAtNDIwLFxuICAgIE1UOiB7XG4gICAgICAgIHRpbWV6b25lT2Zmc2V0RHVyaW5nRHN0OiAtNiAqIDYwLFxuICAgICAgICB0aW1lem9uZU9mZnNldE5vbkRzdDogLTcgKiA2MCxcbiAgICAgICAgZHN0U3RhcnQ6ICh5ZWFyOiBudW1iZXIpID0+IGdldE50aFdlZWtkYXlPZk1vbnRoKHllYXIsIE1vbnRoLk1BUkNILCBXZWVrZGF5LlNVTkRBWSwgMiwgMiksXG4gICAgICAgIGRzdEVuZDogKHllYXI6IG51bWJlcikgPT4gZ2V0TnRoV2Vla2RheU9mTW9udGgoeWVhciwgTW9udGguTk9WRU1CRVIsIFdlZWtkYXkuU1VOREFZLCAxLCAyKSxcbiAgICB9LFxuICAgIE1VVDogMjQwLFxuICAgIE1WVDogMzAwLFxuICAgIE1ZVDogNDgwLFxuICAgIE5DVDogNjYwLFxuICAgIE5EVDogLTkwLFxuICAgIE5GVDogNjkwLFxuICAgIE5PVlNUOiA0MjAsXG4gICAgTk9WVDogMzYwLFxuICAgIE5QVDogMzQ1LFxuICAgIE5TVDogLTE1MCxcbiAgICBOVVQ6IC02NjAsXG4gICAgTlpEVDogNzgwLFxuICAgIE5aU1Q6IDcyMCxcbiAgICBPTVNTVDogNDIwLFxuICAgIE9NU1Q6IDQyMCxcbiAgICBQRFQ6IC00MjAsXG4gICAgUEVUOiAtMzAwLFxuICAgIFBFVFNUOiA3MjAsXG4gICAgUEVUVDogNzIwLFxuICAgIFBHVDogNjAwLFxuICAgIFBIT1Q6IDc4MCxcbiAgICBQSFQ6IDQ4MCxcbiAgICBQS1Q6IDMwMCxcbiAgICBQTURUOiAtMTIwLFxuICAgIFBNU1Q6IC0xODAsXG4gICAgUE9OVDogNjYwLFxuICAgIFBTVDogLTQ4MCxcbiAgICBQVDoge1xuICAgICAgICB0aW1lem9uZU9mZnNldER1cmluZ0RzdDogLTcgKiA2MCxcbiAgICAgICAgdGltZXpvbmVPZmZzZXROb25Ec3Q6IC04ICogNjAsXG4gICAgICAgIGRzdFN0YXJ0OiAoeWVhcjogbnVtYmVyKSA9PiBnZXROdGhXZWVrZGF5T2ZNb250aCh5ZWFyLCBNb250aC5NQVJDSCwgV2Vla2RheS5TVU5EQVksIDIsIDIpLFxuICAgICAgICBkc3RFbmQ6ICh5ZWFyOiBudW1iZXIpID0+IGdldE50aFdlZWtkYXlPZk1vbnRoKHllYXIsIE1vbnRoLk5PVkVNQkVSLCBXZWVrZGF5LlNVTkRBWSwgMSwgMiksXG4gICAgfSxcbiAgICBQV1Q6IDU0MCxcbiAgICBQWVNUOiAtMTgwLFxuICAgIFBZVDogLTI0MCxcbiAgICBSRVQ6IDI0MCxcbiAgICBTQU1UOiAyNDAsXG4gICAgU0FTVDogMTIwLFxuICAgIFNCVDogNjYwLFxuICAgIFNDVDogMjQwLFxuICAgIFNHVDogNDgwLFxuICAgIFNSVDogLTE4MCxcbiAgICBTU1Q6IC02NjAsXG4gICAgVEFIVDogLTYwMCxcbiAgICBURlQ6IDMwMCxcbiAgICBUSlQ6IDMwMCxcbiAgICBUS1Q6IDc4MCxcbiAgICBUTFQ6IDU0MCxcbiAgICBUTVQ6IDMwMCxcbiAgICBUVlQ6IDcyMCxcbiAgICBVTEFUOiA0ODAsXG4gICAgVVRDOiAwLFxuICAgIFVZU1Q6IC0xMjAsXG4gICAgVVlUOiAtMTgwLFxuICAgIFVaVDogMzAwLFxuICAgIFZFVDogLTIxMCxcbiAgICBWTEFTVDogNjYwLFxuICAgIFZMQVQ6IDY2MCxcbiAgICBWVVQ6IDY2MCxcbiAgICBXQVNUOiAxMjAsXG4gICAgV0FUOiA2MCxcbiAgICBXRVNUOiA2MCxcbiAgICBXRVNaOiA2MCxcbiAgICBXRVQ6IDAsXG4gICAgV0VaOiAwLFxuICAgIFdGVDogNzIwLFxuICAgIFdHU1Q6IC0xMjAsXG4gICAgV0dUOiAtMTgwLFxuICAgIFdJQjogNDIwLFxuICAgIFdJVDogNTQwLFxuICAgIFdJVEE6IDQ4MCxcbiAgICBXU1Q6IDc4MCxcbiAgICBXVDogMCxcbiAgICBZQUtTVDogNjAwLFxuICAgIFlBS1Q6IDYwMCxcbiAgICBZQVBUOiA2MDAsXG4gICAgWUVLU1Q6IDM2MCxcbiAgICBZRUtUOiAzNjAsXG59O1xuXG4vKipcbiAqIEdldCB0aGUgZGF0ZSB3aGljaCBpcyB0aGUgbnRoIG9jY3VyZW5jZSBvZiBhIGdpdmVuIHdlZWtkYXkgaW4gYSBnaXZlbiBtb250aCBhbmQgeWVhci5cbiAqXG4gKiBAcGFyYW0geWVhciBUaGUgeWVhciBmb3Igd2hpY2ggdG8gZmluZCB0aGUgZGF0ZVxuICogQHBhcmFtIG1vbnRoIFRoZSBtb250aCBpbiB3aGljaCB0aGUgZGF0ZSBvY2N1cnNcbiAqIEBwYXJhbSB3ZWVrZGF5IFRoZSB3ZWVrZGF5IG9uIHdoaWNoIHRoZSBkYXRlIG9jY3Vyc1xuICogQHBhcmFtIG4gVGhlIG50aCBvY2N1cmVuY2Ugb2YgdGhlIGdpdmVuIHdlZWtkYXkgb24gdGhlIG1vbnRoIHRvIHJldHVyblxuICogQHBhcmFtIGhvdXIgVGhlIGhvdXIgb2YgZGF5IHdoaWNoIHNob3VsZCBiZSBzZXQgb24gdGhlIHJldHVybmVkIGRhdGVcbiAqIEByZXR1cm4gVGhlIGRhdGUgd2hpY2ggaXMgdGhlIG50aCBvY2N1cmVuY2Ugb2YgYSBnaXZlbiB3ZWVrZGF5IGluIGEgZ2l2ZW5cbiAqICAgICAgICAgbW9udGggYW5kIHllYXIsIGF0IHRoZSBnaXZlbiBob3VyIG9mIGRheVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TnRoV2Vla2RheU9mTW9udGgoeWVhcjogbnVtYmVyLCBtb250aDogTW9udGgsIHdlZWtkYXk6IFdlZWtkYXksIG46IDEgfCAyIHwgMyB8IDQsIGhvdXIgPSAwKTogRGF0ZSB7XG4gICAgbGV0IGRheU9mTW9udGggPSAwO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IG4pIHtcbiAgICAgICAgZGF5T2ZNb250aCsrO1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXlPZk1vbnRoKTtcbiAgICAgICAgaWYgKGRhdGUuZ2V0RGF5KCkgPT09IHdlZWtkYXkpIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5T2ZNb250aCwgaG91cik7XG59XG5cbi8qKlxuICogR2V0IHRoZSBkYXRlIHdoaWNoIGlzIHRoZSBsYXN0IG9jY3VyZW5jZSBvZiBhIGdpdmVuIHdlZWtkYXkgaW4gYSBnaXZlbiBtb250aCBhbmQgeWVhci5cbiAqXG4gKiBAcGFyYW0geWVhciBUaGUgeWVhciBmb3Igd2hpY2ggdG8gZmluZCB0aGUgZGF0ZVxuICogQHBhcmFtIG1vbnRoIFRoZSBtb250aCBpbiB3aGljaCB0aGUgZGF0ZSBvY2N1cnNcbiAqIEBwYXJhbSB3ZWVrZGF5IFRoZSB3ZWVrZGF5IG9uIHdoaWNoIHRoZSBkYXRlIG9jY3Vyc1xuICogQHBhcmFtIGhvdXIgVGhlIGhvdXIgb2YgZGF5IHdoaWNoIHNob3VsZCBiZSBzZXQgb24gdGhlIHJldHVybmVkIGRhdGVcbiAqIEByZXR1cm4gVGhlIGRhdGUgd2hpY2ggaXMgdGhlIGxhc3Qgb2NjdXJlbmNlIG9mIGEgZ2l2ZW4gd2Vla2RheSBpbiBhIGdpdmVuXG4gKiAgICAgICAgIG1vbnRoIGFuZCB5ZWFyLCBhdCB0aGUgZ2l2ZW4gaG91ciBvZiBkYXlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExhc3RXZWVrZGF5T2ZNb250aCh5ZWFyOiBudW1iZXIsIG1vbnRoOiBNb250aCwgd2Vla2RheTogV2Vla2RheSwgaG91ciA9IDApOiBEYXRlIHtcbiAgICAvLyBQcm9jZWR1cmU6IEZpbmQgdGhlIGZpcnN0IHdlZWtkYXkgb2YgdGhlIG5leHQgbW9udGgsIGNvbXBhcmUgd2l0aCB0aGUgZ2l2ZW4gd2Vla2RheSxcbiAgICAvLyBhbmQgdXNlIHRoZSBkaWZmZXJlbmNlIHRvIGRldGVybWluZSBob3cgbWFueSBkYXlzIHRvIHN1YnRyYWN0IGZyb20gdGhlIGZpcnN0IG9mIHRoZSBuZXh0IG1vbnRoLlxuICAgIGNvbnN0IG9uZUluZGV4ZWRXZWVrZGF5ID0gd2Vla2RheSA9PT0gMCA/IDcgOiB3ZWVrZGF5O1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEgKyAxLCAxLCAxMik7XG4gICAgY29uc3QgZmlyc3RXZWVrZGF5TmV4dE1vbnRoID0gZGF0ZS5nZXREYXkoKSA9PT0gMCA/IDcgOiBkYXRlLmdldERheSgpO1xuICAgIGxldCBkYXlEaWZmO1xuICAgIGlmIChmaXJzdFdlZWtkYXlOZXh0TW9udGggPT09IG9uZUluZGV4ZWRXZWVrZGF5KSBkYXlEaWZmID0gNztcbiAgICBlbHNlIGlmIChmaXJzdFdlZWtkYXlOZXh0TW9udGggPCBvbmVJbmRleGVkV2Vla2RheSkgZGF5RGlmZiA9IDcgKyBmaXJzdFdlZWtkYXlOZXh0TW9udGggLSBvbmVJbmRleGVkV2Vla2RheTtcbiAgICBlbHNlIGRheURpZmYgPSBmaXJzdFdlZWtkYXlOZXh0TW9udGggLSBvbmVJbmRleGVkV2Vla2RheTtcbiAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgLSBkYXlEaWZmKTtcbiAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXRlLmdldERhdGUoKSwgaG91cik7XG59XG5cbi8qKlxuICogRmluZHMgYW5kIHJldHVybnMgdGltZXpvbmUgb2Zmc2V0LiBJZiB0aW1lem9uZUlucHV0IGlzIG51bWVyaWMsIGl0IGlzIHJldHVybmVkLiBPdGhlcndpc2UsIGxvb2sgZm9yIHRpbWV6b25lIG9mZnNldHNcbiAqIGluIHRoZSBmb2xsb3dpbmcgb3JkZXI6IHRpbWV6b25lT3ZlcnJpZGVzIC0+IHtAbGluayBUSU1FWk9ORV9BQkJSX01BUH0uXG4gKlxuICogQHBhcmFtIHRpbWV6b25lSW5wdXQgVXBwZXJjYXNlIHRpbWV6b25lIGFiYnJldmlhdGlvbiBvciBudW1lcmljIG9mZnNldCBpbiBtaW51dGVzXG4gKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byB1c2UgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdG8gcmV0dXJuIERTVCBvZmZzZXRzIGZvciBhbWJpZ3VvdXMgdGltZXpvbmVzXG4gKiBAcGFyYW0gdGltZXpvbmVPdmVycmlkZXMgT3ZlcnJpZGVzIGZvciB0aW1lem9uZXNcbiAqIEByZXR1cm4gdGltZXpvbmUgb2Zmc2V0IGluIG1pbnV0ZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvVGltZXpvbmVPZmZzZXQoXG4gICAgdGltZXpvbmVJbnB1dD86IHN0cmluZyB8IG51bWJlcixcbiAgICBkYXRlPzogRGF0ZSxcbiAgICB0aW1lem9uZU92ZXJyaWRlczogVGltZXpvbmVBYmJyTWFwID0ge31cbik6IG51bWJlciB8IG51bGwge1xuICAgIGlmICh0aW1lem9uZUlucHV0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aW1lem9uZUlucHV0ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIHJldHVybiB0aW1lem9uZUlucHV0O1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGNoZWRUaW1lem9uZSA9IHRpbWV6b25lT3ZlcnJpZGVzW3RpbWV6b25lSW5wdXRdID8/IFRJTUVaT05FX0FCQlJfTUFQW3RpbWV6b25lSW5wdXRdO1xuICAgIGlmIChtYXRjaGVkVGltZXpvbmUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gVGhpcyBtZWFucyB0aGF0IHdlIGhhdmUgbWF0Y2hlZCBhbiB1bmFtYmlndW91cyB0aW1lem9uZVxuICAgIGlmICh0eXBlb2YgbWF0Y2hlZFRpbWV6b25lID09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoZWRUaW1lem9uZTtcbiAgICB9XG5cbiAgICAvLyBUaGUgbWF0Y2hlZCB0aW1lem9uZSBpcyBhbiBhbWJpZ3VvdXMgdGltZXpvbmUsIHdoZXJlIHRoZSBvZmZzZXQgZGVwZW5kcyBvbiB3aGV0aGVyIHRoZSBjb250ZXh0IChyZWZEYXRlKVxuICAgIC8vIGlzIGR1cmluZyBkYXlsaWdodCBzYXZpbmdzIG9yIG5vdC5cblxuICAgIC8vIFdpdGhvdXQgcmVmRGF0ZSBhcyBjb250ZXh0LCB0aGVyZSdzIG5vIHdheSB0byBrbm93IGlmIERTVCBvciBub24tRFNUIG9mZnNldCBzaG91bGQgYmUgdXNlZC4gUmV0dXJuIG51bGwgaW5zdGVhZC5cbiAgICBpZiAoZGF0ZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBEU1Qgb2Zmc2V0IGlmIHRoZSByZWZEYXRlIGlzIGR1cmluZyBkYXlsaWdodCBzYXZpbmdzXG4gICAgaWYgKFxuICAgICAgICBkYXlqcyhkYXRlKS5pc0FmdGVyKG1hdGNoZWRUaW1lem9uZS5kc3RTdGFydChkYXRlLmdldEZ1bGxZZWFyKCkpKSAmJlxuICAgICAgICAhZGF5anMoZGF0ZSkuaXNBZnRlcihtYXRjaGVkVGltZXpvbmUuZHN0RW5kKGRhdGUuZ2V0RnVsbFllYXIoKSkpXG4gICAgKSB7XG4gICAgICAgIHJldHVybiBtYXRjaGVkVGltZXpvbmUudGltZXpvbmVPZmZzZXREdXJpbmdEc3Q7XG4gICAgfVxuXG4gICAgLy8gcmVmRGF0ZSBpcyBub3QgZHVyaW5nIERTVCA9PiByZXR1cm4gbm9uLURTVCBvZmZzZXRcbiAgICByZXR1cm4gbWF0Y2hlZFRpbWV6b25lLnRpbWV6b25lT2Zmc2V0Tm9uRHN0O1xufVxuIiwgInR5cGUgRGljdGlvbmFyeUxpa2UgPSBzdHJpbmdbXSB8IHsgW3dvcmQ6IHN0cmluZ106IHVua25vd24gfSB8IE1hcDxzdHJpbmcsIHVua25vd24+O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVwZWF0ZWRUaW1ldW5pdFBhdHRlcm4oXG4gICAgcHJlZml4OiBzdHJpbmcsXG4gICAgc2luZ2xlVGltZXVuaXRQYXR0ZXJuOiBzdHJpbmcsXG4gICAgY29ubmVjdG9yUGF0dGVybiA9IFwiXFxcXHN7MCw1fSw/XFxcXHN7MCw1fVwiXG4pOiBzdHJpbmcge1xuICAgIGNvbnN0IHNpbmdsZVRpbWV1bml0UGF0dGVybk5vQ2FwdHVyZSA9IHNpbmdsZVRpbWV1bml0UGF0dGVybi5yZXBsYWNlKC9cXCgoPyFcXD8pL2csIFwiKD86XCIpO1xuICAgIHJldHVybiBgJHtwcmVmaXh9JHtzaW5nbGVUaW1ldW5pdFBhdHRlcm5Ob0NhcHR1cmV9KD86JHtjb25uZWN0b3JQYXR0ZXJufSR7c2luZ2xlVGltZXVuaXRQYXR0ZXJuTm9DYXB0dXJlfSl7MCwxMH1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFRlcm1zKGRpY3Rpb25hcnk6IERpY3Rpb25hcnlMaWtlKTogc3RyaW5nW10ge1xuICAgIGxldCBrZXlzOiBzdHJpbmdbXTtcbiAgICBpZiAoZGljdGlvbmFyeSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGtleXMgPSBbLi4uZGljdGlvbmFyeV07XG4gICAgfSBlbHNlIGlmIChkaWN0aW9uYXJ5IGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgIGtleXMgPSBBcnJheS5mcm9tKChkaWN0aW9uYXJ5IGFzIE1hcDxzdHJpbmcsIHVua25vd24+KS5rZXlzKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhkaWN0aW9uYXJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoQW55UGF0dGVybihkaWN0aW9uYXJ5OiBEaWN0aW9uYXJ5TGlrZSk6IHN0cmluZyB7XG4gICAgLy8gVE9ETzogTW9yZSBlZmZpY2llbnQgcmVnZXggcGF0dGVybiBieSBjb25zaWRlcmluZyBkdXBsaWNhdGVkIHByZWZpeFxuXG4gICAgY29uc3Qgam9pbmVkVGVybXMgPSBleHRyYWN0VGVybXMoZGljdGlvbmFyeSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGIubGVuZ3RoIC0gYS5sZW5ndGgpXG4gICAgICAgIC5qb2luKFwifFwiKVxuICAgICAgICAucmVwbGFjZSgvXFwuL2csIFwiXFxcXC5cIik7XG5cbiAgICByZXR1cm4gYCg/OiR7am9pbmVkVGVybXN9KWA7XG59XG4iLCAiaW1wb3J0IGRheWpzIGZyb20gXCJkYXlqc1wiO1xuXG4vKipcbiAqIEZpbmQgdGhlIG1vc3QgbGlrZWx5IHllYXIsIGZyb20gYSByYXcgbnVtYmVyLiBGb3IgZXhhbXBsZTpcbiAqIDE5OTcgPT4gMTk5N1xuICogOTcgPT4gMTk5N1xuICogMTIgPT4gMjAxMlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZE1vc3RMaWtlbHlBRFllYXIoeWVhck51bWJlcjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoeWVhck51bWJlciA8IDEwMCkge1xuICAgICAgICBpZiAoeWVhck51bWJlciA+IDUwKSB7XG4gICAgICAgICAgICB5ZWFyTnVtYmVyID0geWVhck51bWJlciArIDE5MDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB5ZWFyTnVtYmVyID0geWVhck51bWJlciArIDIwMDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geWVhck51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRZZWFyQ2xvc2VzdFRvUmVmKHJlZkRhdGU6IERhdGUsIGRheTogbnVtYmVyLCBtb250aDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAvL0ZpbmQgdGhlIG1vc3QgYXBwcm9wcmlhdGVkIHllYXJcbiAgICBjb25zdCByZWZNb21lbnQgPSBkYXlqcyhyZWZEYXRlKTtcbiAgICBsZXQgZGF0ZU1vbWVudCA9IHJlZk1vbWVudDtcbiAgICBkYXRlTW9tZW50ID0gZGF0ZU1vbWVudC5tb250aChtb250aCAtIDEpO1xuICAgIGRhdGVNb21lbnQgPSBkYXRlTW9tZW50LmRhdGUoZGF5KTtcbiAgICBkYXRlTW9tZW50ID0gZGF0ZU1vbWVudC55ZWFyKHJlZk1vbWVudC55ZWFyKCkpO1xuXG4gICAgY29uc3QgbmV4dFllYXIgPSBkYXRlTW9tZW50LmFkZCgxLCBcInlcIik7XG4gICAgY29uc3QgbGFzdFllYXIgPSBkYXRlTW9tZW50LmFkZCgtMSwgXCJ5XCIpO1xuICAgIGlmIChNYXRoLmFicyhuZXh0WWVhci5kaWZmKHJlZk1vbWVudCkpIDwgTWF0aC5hYnMoZGF0ZU1vbWVudC5kaWZmKHJlZk1vbWVudCkpKSB7XG4gICAgICAgIGRhdGVNb21lbnQgPSBuZXh0WWVhcjtcbiAgICB9IGVsc2UgaWYgKE1hdGguYWJzKGxhc3RZZWFyLmRpZmYocmVmTW9tZW50KSkgPCBNYXRoLmFicyhkYXRlTW9tZW50LmRpZmYocmVmTW9tZW50KSkpIHtcbiAgICAgICAgZGF0ZU1vbWVudCA9IGxhc3RZZWFyO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRlTW9tZW50LnllYXIoKTtcbn1cbiIsICJpbXBvcnQgeyBPcFVuaXRUeXBlLCBRVW5pdFR5cGUgfSBmcm9tIFwiZGF5anNcIjtcbmltcG9ydCB7IG1hdGNoQW55UGF0dGVybiwgcmVwZWF0ZWRUaW1ldW5pdFBhdHRlcm4gfSBmcm9tIFwiLi4vLi4vdXRpbHMvcGF0dGVyblwiO1xuaW1wb3J0IHsgZmluZE1vc3RMaWtlbHlBRFllYXIgfSBmcm9tIFwiLi4vLi4vY2FsY3VsYXRpb24veWVhcnNcIjtcbmltcG9ydCB7IFRpbWVVbml0cyB9IGZyb20gXCIuLi8uLi91dGlscy90aW1ldW5pdHNcIjtcbmltcG9ydCB7IFdlZWtkYXkgfSBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IFdFRUtEQVlfRElDVElPTkFSWTogeyBbd29yZDogc3RyaW5nXTogV2Vla2RheSB9ID0ge1xuICAgIHN1bmRheTogMCxcbiAgICBzdW46IDAsXG4gICAgXCJzdW4uXCI6IDAsXG4gICAgbW9uZGF5OiAxLFxuICAgIG1vbjogMSxcbiAgICBcIm1vbi5cIjogMSxcbiAgICB0dWVzZGF5OiAyLFxuICAgIHR1ZTogMixcbiAgICBcInR1ZS5cIjogMixcbiAgICB3ZWRuZXNkYXk6IDMsXG4gICAgd2VkOiAzLFxuICAgIFwid2VkLlwiOiAzLFxuICAgIHRodXJzZGF5OiA0LFxuICAgIHRodXJzOiA0LFxuICAgIFwidGh1cnMuXCI6IDQsXG4gICAgdGh1cjogNCxcbiAgICBcInRodXIuXCI6IDQsXG4gICAgdGh1OiA0LFxuICAgIFwidGh1LlwiOiA0LFxuICAgIGZyaWRheTogNSxcbiAgICBmcmk6IDUsXG4gICAgXCJmcmkuXCI6IDUsXG4gICAgc2F0dXJkYXk6IDYsXG4gICAgc2F0OiA2LFxuICAgIFwic2F0LlwiOiA2LFxufTtcblxuZXhwb3J0IGNvbnN0IEZVTExfTU9OVEhfTkFNRV9ESUNUSU9OQVJZOiB7IFt3b3JkOiBzdHJpbmddOiBudW1iZXIgfSA9IHtcbiAgICBqYW51YXJ5OiAxLFxuICAgIGZlYnJ1YXJ5OiAyLFxuICAgIG1hcmNoOiAzLFxuICAgIGFwcmlsOiA0LFxuICAgIG1heTogNSxcbiAgICBqdW5lOiA2LFxuICAgIGp1bHk6IDcsXG4gICAgYXVndXN0OiA4LFxuICAgIHNlcHRlbWJlcjogOSxcbiAgICBvY3RvYmVyOiAxMCxcbiAgICBub3ZlbWJlcjogMTEsXG4gICAgZGVjZW1iZXI6IDEyLFxufTtcblxuZXhwb3J0IGNvbnN0IE1PTlRIX0RJQ1RJT05BUlk6IHsgW3dvcmQ6IHN0cmluZ106IG51bWJlciB9ID0ge1xuICAgIC4uLkZVTExfTU9OVEhfTkFNRV9ESUNUSU9OQVJZLFxuICAgIGphbjogMSxcbiAgICBcImphbi5cIjogMSxcbiAgICBmZWI6IDIsXG4gICAgXCJmZWIuXCI6IDIsXG4gICAgbWFyOiAzLFxuICAgIFwibWFyLlwiOiAzLFxuICAgIGFwcjogNCxcbiAgICBcImFwci5cIjogNCxcbiAgICBqdW46IDYsXG4gICAgXCJqdW4uXCI6IDYsXG4gICAganVsOiA3LFxuICAgIFwianVsLlwiOiA3LFxuICAgIGF1ZzogOCxcbiAgICBcImF1Zy5cIjogOCxcbiAgICBzZXA6IDksXG4gICAgXCJzZXAuXCI6IDksXG4gICAgc2VwdDogOSxcbiAgICBcInNlcHQuXCI6IDksXG4gICAgb2N0OiAxMCxcbiAgICBcIm9jdC5cIjogMTAsXG4gICAgbm92OiAxMSxcbiAgICBcIm5vdi5cIjogMTEsXG4gICAgZGVjOiAxMixcbiAgICBcImRlYy5cIjogMTIsXG59O1xuXG5leHBvcnQgY29uc3QgSU5URUdFUl9XT1JEX0RJQ1RJT05BUlk6IHsgW3dvcmQ6IHN0cmluZ106IG51bWJlciB9ID0ge1xuICAgIG9uZTogMSxcbiAgICB0d286IDIsXG4gICAgdGhyZWU6IDMsXG4gICAgZm91cjogNCxcbiAgICBmaXZlOiA1LFxuICAgIHNpeDogNixcbiAgICBzZXZlbjogNyxcbiAgICBlaWdodDogOCxcbiAgICBuaW5lOiA5LFxuICAgIHRlbjogMTAsXG4gICAgZWxldmVuOiAxMSxcbiAgICB0d2VsdmU6IDEyLFxufTtcblxuZXhwb3J0IGNvbnN0IE9SRElOQUxfV09SRF9ESUNUSU9OQVJZOiB7IFt3b3JkOiBzdHJpbmddOiBudW1iZXIgfSA9IHtcbiAgICBmaXJzdDogMSxcbiAgICBzZWNvbmQ6IDIsXG4gICAgdGhpcmQ6IDMsXG4gICAgZm91cnRoOiA0LFxuICAgIGZpZnRoOiA1LFxuICAgIHNpeHRoOiA2LFxuICAgIHNldmVudGg6IDcsXG4gICAgZWlnaHRoOiA4LFxuICAgIG5pbnRoOiA5LFxuICAgIHRlbnRoOiAxMCxcbiAgICBlbGV2ZW50aDogMTEsXG4gICAgdHdlbGZ0aDogMTIsXG4gICAgdGhpcnRlZW50aDogMTMsXG4gICAgZm91cnRlZW50aDogMTQsXG4gICAgZmlmdGVlbnRoOiAxNSxcbiAgICBzaXh0ZWVudGg6IDE2LFxuICAgIHNldmVudGVlbnRoOiAxNyxcbiAgICBlaWdodGVlbnRoOiAxOCxcbiAgICBuaW5ldGVlbnRoOiAxOSxcbiAgICB0d2VudGlldGg6IDIwLFxuICAgIFwidHdlbnR5IGZpcnN0XCI6IDIxLFxuICAgIFwidHdlbnR5LWZpcnN0XCI6IDIxLFxuICAgIFwidHdlbnR5IHNlY29uZFwiOiAyMixcbiAgICBcInR3ZW50eS1zZWNvbmRcIjogMjIsXG4gICAgXCJ0d2VudHkgdGhpcmRcIjogMjMsXG4gICAgXCJ0d2VudHktdGhpcmRcIjogMjMsXG4gICAgXCJ0d2VudHkgZm91cnRoXCI6IDI0LFxuICAgIFwidHdlbnR5LWZvdXJ0aFwiOiAyNCxcbiAgICBcInR3ZW50eSBmaWZ0aFwiOiAyNSxcbiAgICBcInR3ZW50eS1maWZ0aFwiOiAyNSxcbiAgICBcInR3ZW50eSBzaXh0aFwiOiAyNixcbiAgICBcInR3ZW50eS1zaXh0aFwiOiAyNixcbiAgICBcInR3ZW50eSBzZXZlbnRoXCI6IDI3LFxuICAgIFwidHdlbnR5LXNldmVudGhcIjogMjcsXG4gICAgXCJ0d2VudHkgZWlnaHRoXCI6IDI4LFxuICAgIFwidHdlbnR5LWVpZ2h0aFwiOiAyOCxcbiAgICBcInR3ZW50eSBuaW50aFwiOiAyOSxcbiAgICBcInR3ZW50eS1uaW50aFwiOiAyOSxcbiAgICBcInRoaXJ0aWV0aFwiOiAzMCxcbiAgICBcInRoaXJ0eSBmaXJzdFwiOiAzMSxcbiAgICBcInRoaXJ0eS1maXJzdFwiOiAzMSxcbn07XG5cbmV4cG9ydCBjb25zdCBUSU1FX1VOSVRfRElDVElPTkFSWV9OT19BQkJSOiB7IFt3b3JkOiBzdHJpbmddOiBPcFVuaXRUeXBlIHwgUVVuaXRUeXBlIH0gPSB7XG4gICAgc2Vjb25kOiBcInNlY29uZFwiLFxuICAgIHNlY29uZHM6IFwic2Vjb25kXCIsXG4gICAgbWludXRlOiBcIm1pbnV0ZVwiLFxuICAgIG1pbnV0ZXM6IFwibWludXRlXCIsXG4gICAgaG91cjogXCJob3VyXCIsXG4gICAgaG91cnM6IFwiaG91clwiLFxuICAgIGRheTogXCJkXCIsXG4gICAgZGF5czogXCJkXCIsXG4gICAgd2VlazogXCJ3ZWVrXCIsXG4gICAgd2Vla3M6IFwid2Vla1wiLFxuICAgIG1vbnRoOiBcIm1vbnRoXCIsXG4gICAgbW9udGhzOiBcIm1vbnRoXCIsXG4gICAgcXVhcnRlcjogXCJxdWFydGVyXCIsXG4gICAgcXVhcnRlcnM6IFwicXVhcnRlclwiLFxuICAgIHllYXI6IFwieWVhclwiLFxuICAgIHllYXJzOiBcInllYXJcIixcbn07XG5cbmV4cG9ydCBjb25zdCBUSU1FX1VOSVRfRElDVElPTkFSWTogeyBbd29yZDogc3RyaW5nXTogT3BVbml0VHlwZSB8IFFVbml0VHlwZSB9ID0ge1xuICAgIHM6IFwic2Vjb25kXCIsXG4gICAgc2VjOiBcInNlY29uZFwiLFxuICAgIHNlY29uZDogXCJzZWNvbmRcIixcbiAgICBzZWNvbmRzOiBcInNlY29uZFwiLFxuICAgIG06IFwibWludXRlXCIsXG4gICAgbWluOiBcIm1pbnV0ZVwiLFxuICAgIG1pbnM6IFwibWludXRlXCIsXG4gICAgbWludXRlOiBcIm1pbnV0ZVwiLFxuICAgIG1pbnV0ZXM6IFwibWludXRlXCIsXG4gICAgaDogXCJob3VyXCIsXG4gICAgaHI6IFwiaG91clwiLFxuICAgIGhyczogXCJob3VyXCIsXG4gICAgaG91cjogXCJob3VyXCIsXG4gICAgaG91cnM6IFwiaG91clwiLFxuICAgIGQ6IFwiZFwiLFxuICAgIGRheTogXCJkXCIsXG4gICAgZGF5czogXCJkXCIsXG4gICAgdzogXCJ3XCIsXG4gICAgd2VlazogXCJ3ZWVrXCIsXG4gICAgd2Vla3M6IFwid2Vla1wiLFxuICAgIG1vOiBcIm1vbnRoXCIsXG4gICAgbW9uOiBcIm1vbnRoXCIsXG4gICAgbW9zOiBcIm1vbnRoXCIsXG4gICAgbW9udGg6IFwibW9udGhcIixcbiAgICBtb250aHM6IFwibW9udGhcIixcbiAgICBxdHI6IFwicXVhcnRlclwiLFxuICAgIHF1YXJ0ZXI6IFwicXVhcnRlclwiLFxuICAgIHF1YXJ0ZXJzOiBcInF1YXJ0ZXJcIixcbiAgICB5OiBcInllYXJcIixcbiAgICB5cjogXCJ5ZWFyXCIsXG4gICAgeWVhcjogXCJ5ZWFyXCIsXG4gICAgeWVhcnM6IFwieWVhclwiLFxuICAgIC8vIEFsc28sIG1lcmdlIHRoZSBlbnRyaWVzIGZyb20gdGhlIGZ1bGwtbmFtZSBkaWN0aW9uYXJ5LlxuICAgIC8vIFdlIGxlYXZlIHRoZSBkdXBsaWNhdGVkIGVudHJpZXMgZm9yIHJlYWRhYmlsaXR5LlxuICAgIC4uLlRJTUVfVU5JVF9ESUNUSU9OQVJZX05PX0FCQlIsXG59O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydCBjb25zdCBOVU1CRVJfUEFUVEVSTiA9IGAoPzoke21hdGNoQW55UGF0dGVybihcbiAgICBJTlRFR0VSX1dPUkRfRElDVElPTkFSWVxuKX18WzAtOV0rfFswLTldK1xcXFwuWzAtOV0rfGhhbGYoPzpcXFxcc3swLDJ9YW4/KT98YW4/XFxcXGIoPzpcXFxcc3swLDJ9ZmV3KT98ZmV3fHNldmVyYWx8dGhlfGE/XFxcXHN7MCwyfWNvdXBsZVxcXFxzezAsMn0oPzpvZik/KWA7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU51bWJlclBhdHRlcm4obWF0Y2g6IHN0cmluZyk6IG51bWJlciB7XG4gICAgY29uc3QgbnVtID0gbWF0Y2gudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoSU5URUdFUl9XT1JEX0RJQ1RJT05BUllbbnVtXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBJTlRFR0VSX1dPUkRfRElDVElPTkFSWVtudW1dO1xuICAgIH0gZWxzZSBpZiAobnVtID09PSBcImFcIiB8fCBudW0gPT09IFwiYW5cIiB8fCBudW0gPT0gXCJ0aGVcIikge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKG51bS5tYXRjaCgvZmV3LykpIHtcbiAgICAgICAgcmV0dXJuIDM7XG4gICAgfSBlbHNlIGlmIChudW0ubWF0Y2goL2hhbGYvKSkge1xuICAgICAgICByZXR1cm4gMC41O1xuICAgIH0gZWxzZSBpZiAobnVtLm1hdGNoKC9jb3VwbGUvKSkge1xuICAgICAgICByZXR1cm4gMjtcbiAgICB9IGVsc2UgaWYgKG51bS5tYXRjaCgvc2V2ZXJhbC8pKSB7XG4gICAgICAgIHJldHVybiA3O1xuICAgIH1cblxuICAgIHJldHVybiBwYXJzZUZsb2F0KG51bSk7XG59XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGNvbnN0IE9SRElOQUxfTlVNQkVSX1BBVFRFUk4gPSBgKD86JHttYXRjaEFueVBhdHRlcm4oT1JESU5BTF9XT1JEX0RJQ1RJT05BUlkpfXxbMC05XXsxLDJ9KD86c3R8bmR8cmR8dGgpPylgO1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlT3JkaW5hbE51bWJlclBhdHRlcm4obWF0Y2g6IHN0cmluZyk6IG51bWJlciB7XG4gICAgbGV0IG51bSA9IG1hdGNoLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKE9SRElOQUxfV09SRF9ESUNUSU9OQVJZW251bV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gT1JESU5BTF9XT1JEX0RJQ1RJT05BUllbbnVtXTtcbiAgICB9XG5cbiAgICBudW0gPSBudW0ucmVwbGFjZSgvKD86c3R8bmR8cmR8dGgpJC9pLCBcIlwiKTtcbiAgICByZXR1cm4gcGFyc2VJbnQobnVtKTtcbn1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgY29uc3QgWUVBUl9QQVRURVJOID0gYCg/OlsxLTldWzAtOV17MCwzfVxcXFxzezAsMn0oPzpCRXxBRHxCQ3xCQ0V8Q0UpfFsxLTJdWzAtOV17M318WzUtOV1bMC05XXwyWzAtNV0pYDtcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVllYXIobWF0Y2g6IHN0cmluZyk6IG51bWJlciB7XG4gICAgaWYgKC9CRS9pLnRlc3QobWF0Y2gpKSB7XG4gICAgICAgIC8vIEJ1ZGRoaXN0IEVyYVxuICAgICAgICBtYXRjaCA9IG1hdGNoLnJlcGxhY2UoL0JFL2ksIFwiXCIpO1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQobWF0Y2gpIC0gNTQzO1xuICAgIH1cblxuICAgIGlmICgvQkNFPy9pLnRlc3QobWF0Y2gpKSB7XG4gICAgICAgIC8vIEJlZm9yZSBDaHJpc3QsIEJlZm9yZSBDb21tb24gRXJhXG4gICAgICAgIG1hdGNoID0gbWF0Y2gucmVwbGFjZSgvQkNFPy9pLCBcIlwiKTtcbiAgICAgICAgcmV0dXJuIC1wYXJzZUludChtYXRjaCk7XG4gICAgfVxuXG4gICAgaWYgKC8oQUR8Q0UpL2kudGVzdChtYXRjaCkpIHtcbiAgICAgICAgLy8gQW5ubyBEb21pbmksIENvbW1vbiBFcmFcbiAgICAgICAgbWF0Y2ggPSBtYXRjaC5yZXBsYWNlKC8oQUR8Q0UpL2ksIFwiXCIpO1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQobWF0Y2gpO1xuICAgIH1cblxuICAgIGNvbnN0IHJhd1llYXJOdW1iZXIgPSBwYXJzZUludChtYXRjaCk7XG4gICAgcmV0dXJuIGZpbmRNb3N0TGlrZWx5QURZZWFyKHJhd1llYXJOdW1iZXIpO1xufVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNvbnN0IFNJTkdMRV9USU1FX1VOSVRfUEFUVEVSTiA9IGAoJHtOVU1CRVJfUEFUVEVSTn0pXFxcXHN7MCwzfSgke21hdGNoQW55UGF0dGVybihUSU1FX1VOSVRfRElDVElPTkFSWSl9KWA7XG5jb25zdCBTSU5HTEVfVElNRV9VTklUX1JFR0VYID0gbmV3IFJlZ0V4cChTSU5HTEVfVElNRV9VTklUX1BBVFRFUk4sIFwiaVwiKTtcblxuY29uc3QgU0lOR0xFX1RJTUVfVU5JVF9OT19BQkJSX1BBVFRFUk4gPSBgKCR7TlVNQkVSX1BBVFRFUk59KVxcXFxzezAsM30oJHttYXRjaEFueVBhdHRlcm4oXG4gICAgVElNRV9VTklUX0RJQ1RJT05BUllfTk9fQUJCUlxuKX0pYDtcblxuY29uc3QgVElNRV9VTklUX0NPTk5FQ1RPUl9QQVRURVJOID0gYFxcXFxzezAsNX0sPyg/OlxcXFxzKmFuZCk/XFxcXHN7MCw1fWA7XG5cbmV4cG9ydCBjb25zdCBUSU1FX1VOSVRTX1BBVFRFUk4gPSByZXBlYXRlZFRpbWV1bml0UGF0dGVybihcbiAgICBgKD86KD86YWJvdXR8YXJvdW5kKVxcXFxzezAsM30pP2AsXG4gICAgU0lOR0xFX1RJTUVfVU5JVF9QQVRURVJOLFxuICAgIFRJTUVfVU5JVF9DT05ORUNUT1JfUEFUVEVSTlxuKTtcbmV4cG9ydCBjb25zdCBUSU1FX1VOSVRTX05PX0FCQlJfUEFUVEVSTiA9IHJlcGVhdGVkVGltZXVuaXRQYXR0ZXJuKFxuICAgIGAoPzooPzphYm91dHxhcm91bmQpXFxcXHN7MCwzfSk/YCxcbiAgICBTSU5HTEVfVElNRV9VTklUX05PX0FCQlJfUEFUVEVSTixcbiAgICBUSU1FX1VOSVRfQ09OTkVDVE9SX1BBVFRFUk5cbik7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVRpbWVVbml0cyh0aW1ldW5pdFRleHQpOiBudWxsIHwgVGltZVVuaXRzIHtcbiAgICBjb25zdCBmcmFnbWVudHMgPSB7fTtcbiAgICBsZXQgcmVtYWluaW5nVGV4dCA9IHRpbWV1bml0VGV4dDtcbiAgICBsZXQgbWF0Y2ggPSBTSU5HTEVfVElNRV9VTklUX1JFR0VYLmV4ZWMocmVtYWluaW5nVGV4dCk7XG4gICAgd2hpbGUgKG1hdGNoKSB7XG4gICAgICAgIGNvbGxlY3REYXRlVGltZUZyYWdtZW50KGZyYWdtZW50cywgbWF0Y2gpO1xuICAgICAgICByZW1haW5pbmdUZXh0ID0gcmVtYWluaW5nVGV4dC5zdWJzdHJpbmcobWF0Y2hbMF0ubGVuZ3RoKS50cmltKCk7XG4gICAgICAgIG1hdGNoID0gU0lOR0xFX1RJTUVfVU5JVF9SRUdFWC5leGVjKHJlbWFpbmluZ1RleHQpO1xuICAgIH1cbiAgICBpZiAoT2JqZWN0LmtleXMoZnJhZ21lbnRzKS5sZW5ndGggPT0gMCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGZyYWdtZW50cztcbn1cblxuZnVuY3Rpb24gY29sbGVjdERhdGVUaW1lRnJhZ21lbnQoZnJhZ21lbnRzLCBtYXRjaCkge1xuICAgIGlmIChtYXRjaFswXS5tYXRjaCgvXlthLXpBLVpdKyQvKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG51bSA9IHBhcnNlTnVtYmVyUGF0dGVybihtYXRjaFsxXSk7XG4gICAgY29uc3QgdW5pdCA9IFRJTUVfVU5JVF9ESUNUSU9OQVJZW21hdGNoWzJdLnRvTG93ZXJDYXNlKCldO1xuICAgIGZyYWdtZW50c1t1bml0XSA9IG51bTtcbn1cbiIsICJpbXBvcnQgeyBQYXJzZXIsIFBhcnNpbmdDb250ZXh0IH0gZnJvbSBcIi4uLy4uL2Nocm9ub1wiO1xuaW1wb3J0IHsgUGFyc2luZ0NvbXBvbmVudHMsIFBhcnNpbmdSZXN1bHQgfSBmcm9tIFwiLi4vLi4vcmVzdWx0c1wiO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbi8qKlxuICogQSBwYXJzZXIgdGhhdCBjaGVja3MgZm9yIHdvcmQgYm91bmRhcnkgYW5kIGFwcGx5aW5nIHRoZSBpbm5lciBwYXR0ZXJuIGFuZCBleHRyYWN0aW9uLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RQYXJzZXJXaXRoV29yZEJvdW5kYXJ5Q2hlY2tpbmcgaW1wbGVtZW50cyBQYXJzZXIge1xuICAgIGFic3RyYWN0IGlubmVyUGF0dGVybihjb250ZXh0OiBQYXJzaW5nQ29udGV4dCk6IFJlZ0V4cDtcbiAgICBhYnN0cmFjdCBpbm5lckV4dHJhY3QoXG4gICAgICAgIGNvbnRleHQ6IFBhcnNpbmdDb250ZXh0LFxuICAgICAgICBtYXRjaDogUmVnRXhwTWF0Y2hBcnJheVxuICAgICk6IFBhcnNpbmdDb21wb25lbnRzIHwgUGFyc2luZ1Jlc3VsdCB8IHsgW2MgaW4gQ29tcG9uZW50XT86IG51bWJlciB9IHwgbnVsbDtcblxuICAgIC8vIE92ZXJyaWRlcyB0aGlzIG1ldGhvZCBpZiB0aGVyZSBpcyBtb3JlIGVmZmljaWVudCB3YXkgdG8gY2hlY2sgZm9yIGlubmVyIHBhdHRlcm4gY2hhbmdlLlxuICAgIGlubmVyUGF0dGVybkhhc0NoYW5nZShjb250ZXh0OiBQYXJzaW5nQ29udGV4dCwgY3VycmVudElubmVyUGF0dGVybjogUmVnRXhwKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlubmVyUGF0dGVybihjb250ZXh0KSAhPT0gY3VycmVudElubmVyUGF0dGVybjtcbiAgICB9XG5cbiAgICBwYXR0ZXJuTGVmdEJvdW5kYXJ5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgKFxcXFxXfF4pYDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhY2hlZElubmVyUGF0dGVybj86IFJlZ0V4cCA9IG51bGw7XG4gICAgcHJpdmF0ZSBjYWNoZWRQYXR0ZXJuPzogUmVnRXhwID0gbnVsbDtcblxuICAgIHBhdHRlcm4oY29udGV4dDogUGFyc2luZ0NvbnRleHQpOiBSZWdFeHAge1xuICAgICAgICBpZiAodGhpcy5jYWNoZWRJbm5lclBhdHRlcm4pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pbm5lclBhdHRlcm5IYXNDaGFuZ2UoY29udGV4dCwgdGhpcy5jYWNoZWRJbm5lclBhdHRlcm4pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkUGF0dGVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhY2hlZElubmVyUGF0dGVybiA9IHRoaXMuaW5uZXJQYXR0ZXJuKGNvbnRleHQpO1xuICAgICAgICB0aGlzLmNhY2hlZFBhdHRlcm4gPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgYCR7dGhpcy5wYXR0ZXJuTGVmdEJvdW5kYXJ5KCl9JHt0aGlzLmNhY2hlZElubmVyUGF0dGVybi5zb3VyY2V9YCxcbiAgICAgICAgICAgIHRoaXMuY2FjaGVkSW5uZXJQYXR0ZXJuLmZsYWdzXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlZFBhdHRlcm47XG4gICAgfVxuXG4gICAgZXh0cmFjdChjb250ZXh0OiBQYXJzaW5nQ29udGV4dCwgbWF0Y2g6IFJlZ0V4cE1hdGNoQXJyYXkpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gbWF0Y2hbMV0gPz8gXCJcIjtcbiAgICAgICAgbWF0Y2guaW5kZXggPSBtYXRjaC5pbmRleCArIGhlYWRlci5sZW5ndGg7XG4gICAgICAgIG1hdGNoWzBdID0gbWF0Y2hbMF0uc3Vic3RyaW5nKGhlYWRlci5sZW5ndGgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMjsgaSA8IG1hdGNoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBtYXRjaFtpIC0gMV0gPSBtYXRjaFtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmlubmVyRXh0cmFjdChjb250ZXh0LCBtYXRjaCk7XG4gICAgfVxufVxuIiwgImltcG9ydCB7IFRJTUVfVU5JVFNfUEFUVEVSTiwgcGFyc2VUaW1lVW5pdHMsIFRJTUVfVU5JVFNfTk9fQUJCUl9QQVRURVJOIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgUGFyc2luZ0NvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vY2hyb25vXCI7XG5pbXBvcnQgeyBQYXJzaW5nQ29tcG9uZW50cyB9IGZyb20gXCIuLi8uLi8uLi9yZXN1bHRzXCI7XG5pbXBvcnQgeyBBYnN0cmFjdFBhcnNlcldpdGhXb3JkQm91bmRhcnlDaGVja2luZyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFyc2Vycy9BYnN0cmFjdFBhcnNlcldpdGhXb3JkQm91bmRhcnlcIjtcblxuY29uc3QgUEFUVEVSTl9XSVRIX09QVElPTkFMX1BSRUZJWCA9IG5ldyBSZWdFeHAoXG4gICAgYCg/Oig/OndpdGhpbnxpbnxmb3IpXFxcXHMqKT9gICtcbiAgICAgICAgYCg/Oig/OmFib3V0fGFyb3VuZHxyb3VnaGx5fGFwcHJveGltYXRlbHl8anVzdClcXFxccyooPzp+XFxcXHMqKT8pPygke1RJTUVfVU5JVFNfUEFUVEVSTn0pKD89XFxcXFd8JClgLFxuICAgIFwiaVwiXG4pO1xuXG5jb25zdCBQQVRURVJOX1dJVEhfUFJFRklYID0gbmV3IFJlZ0V4cChcbiAgICBgKD86d2l0aGlufGlufGZvcilcXFxccypgICtcbiAgICAgICAgYCg/Oig/OmFib3V0fGFyb3VuZHxyb3VnaGx5fGFwcHJveGltYXRlbHl8anVzdClcXFxccyooPzp+XFxcXHMqKT8pPygke1RJTUVfVU5JVFNfUEFUVEVSTn0pKD89XFxcXFd8JClgLFxuICAgIFwiaVwiXG4pO1xuXG5jb25zdCBQQVRURVJOX1dJVEhfUFJFRklYX1NUUklDVCA9IG5ldyBSZWdFeHAoXG4gICAgYCg/OndpdGhpbnxpbnxmb3IpXFxcXHMqYCArXG4gICAgICAgIGAoPzooPzphYm91dHxhcm91bmR8cm91Z2hseXxhcHByb3hpbWF0ZWx5fGp1c3QpXFxcXHMqKD86flxcXFxzKik/KT8oJHtUSU1FX1VOSVRTX05PX0FCQlJfUEFUVEVSTn0pKD89XFxcXFd8JClgLFxuICAgIFwiaVwiXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFTlRpbWVVbml0V2l0aGluRm9ybWF0UGFyc2VyIGV4dGVuZHMgQWJzdHJhY3RQYXJzZXJXaXRoV29yZEJvdW5kYXJ5Q2hlY2tpbmcge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RyaWN0TW9kZTogYm9vbGVhbikge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGlubmVyUGF0dGVybihjb250ZXh0OiBQYXJzaW5nQ29udGV4dCk6IFJlZ0V4cCB7XG4gICAgICAgIGlmICh0aGlzLnN0cmljdE1vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBQQVRURVJOX1dJVEhfUFJFRklYX1NUUklDVDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGV4dC5vcHRpb24uZm9yd2FyZERhdGUgPyBQQVRURVJOX1dJVEhfT1BUSU9OQUxfUFJFRklYIDogUEFUVEVSTl9XSVRIX1BSRUZJWDtcbiAgICB9XG5cbiAgICBpbm5lckV4dHJhY3QoY29udGV4dDogUGFyc2luZ0NvbnRleHQsIG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5KSB7XG4gICAgICAgIC8vIEV4Y2x1ZGUgXCJmb3IgdGhlIHVuaXRcIiBwaGFzZXMsIGUuZy4gXCJmb3IgdGhlIHllYXJcIlxuICAgICAgICBpZiAobWF0Y2hbMF0ubWF0Y2goL15mb3JcXHMqdGhlXFxzKlxcdysvKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGltZVVuaXRzID0gcGFyc2VUaW1lVW5pdHMobWF0Y2hbMV0pO1xuICAgICAgICBpZiAoIXRpbWVVbml0cykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFBhcnNpbmdDb21wb25lbnRzLmNyZWF0ZVJlbGF0aXZlRnJvbVJlZmVyZW5jZShjb250ZXh0LnJlZmVyZW5jZSwgdGltZVVuaXRzKTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2luZ0NvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vY2hyb25vXCI7XG5pbXBvcnQgeyBQYXJzaW5nUmVzdWx0IH0gZnJvbSBcIi4uLy4uLy4uL3Jlc3VsdHNcIjtcbmltcG9ydCB7IGZpbmRZZWFyQ2xvc2VzdFRvUmVmIH0gZnJvbSBcIi4uLy4uLy4uL2NhbGN1bGF0aW9uL3llYXJzXCI7XG5pbXBvcnQgeyBNT05USF9ESUNUSU9OQVJZIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgWUVBUl9QQVRURVJOLCBwYXJzZVllYXIgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBPUkRJTkFMX05VTUJFUl9QQVRURVJOLCBwYXJzZU9yZGluYWxOdW1iZXJQYXR0ZXJuIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgbWF0Y2hBbnlQYXR0ZXJuIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3BhdHRlcm5cIjtcbmltcG9ydCB7IEFic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeUNoZWNraW5nIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYXJzZXJzL0Fic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeVwiO1xuXG4vLyBwcmV0dGllci1pZ25vcmVcbmNvbnN0IFBBVFRFUk4gPSBuZXcgUmVnRXhwKFxuICAgIGAoPzpvblxcXFxzezAsM30pP2AgK1xuICAgICAgICBgKCR7T1JESU5BTF9OVU1CRVJfUEFUVEVSTn0pYCArXG4gICAgICAgIGAoPzpgICtcbiAgICAgICAgICAgIGBcXFxcc3swLDN9KD86dG98XFxcXC18XFxcXFx1MjAxM3x1bnRpbHx0aHJvdWdofHRpbGwpP1xcXFxzezAsM31gICtcbiAgICAgICAgICAgIGAoJHtPUkRJTkFMX05VTUJFUl9QQVRURVJOfSlgICtcbiAgICAgICAgXCIpP1wiICtcbiAgICAgICAgYCg/Oi18L3xcXFxcc3swLDN9KD86b2YpP1xcXFxzezAsM30pYCArXG4gICAgICAgIGAoJHttYXRjaEFueVBhdHRlcm4oTU9OVEhfRElDVElPTkFSWSl9KWAgK1xuICAgICAgICBcIig/OlwiICtcbiAgICAgICAgICAgIGAoPzotfC98LD9cXFxcc3swLDN9KWAgK1xuICAgICAgICAgICAgYCgke1lFQVJfUEFUVEVSTn0oPyFcXFxcdykpYCArXG4gICAgICAgIFwiKT9cIiArXG4gICAgICAgIFwiKD89XFxcXFd8JClcIixcbiAgICBcImlcIlxuKTtcblxuY29uc3QgREFURV9HUk9VUCA9IDE7XG5jb25zdCBEQVRFX1RPX0dST1VQID0gMjtcbmNvbnN0IE1PTlRIX05BTUVfR1JPVVAgPSAzO1xuY29uc3QgWUVBUl9HUk9VUCA9IDQ7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVOTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyIGV4dGVuZHMgQWJzdHJhY3RQYXJzZXJXaXRoV29yZEJvdW5kYXJ5Q2hlY2tpbmcge1xuICAgIGlubmVyUGF0dGVybigpOiBSZWdFeHAge1xuICAgICAgICByZXR1cm4gUEFUVEVSTjtcbiAgICB9XG5cbiAgICBpbm5lckV4dHJhY3QoY29udGV4dDogUGFyc2luZ0NvbnRleHQsIG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5KTogUGFyc2luZ1Jlc3VsdCB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGNvbnRleHQuY3JlYXRlUGFyc2luZ1Jlc3VsdChtYXRjaC5pbmRleCwgbWF0Y2hbMF0pO1xuXG4gICAgICAgIGNvbnN0IG1vbnRoID0gTU9OVEhfRElDVElPTkFSWVttYXRjaFtNT05USF9OQU1FX0dST1VQXS50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgY29uc3QgZGF5ID0gcGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybihtYXRjaFtEQVRFX0dST1VQXSk7XG4gICAgICAgIGlmIChkYXkgPiAzMSkge1xuICAgICAgICAgICAgLy8gZS5nLiBcIls5NiBBdWddXCIgPT4gXCI5WzYgQXVnXVwiLCB3ZSBuZWVkIHRvIHNoaWZ0IGF3YXkgZnJvbSB0aGUgbmV4dCBudW1iZXJcbiAgICAgICAgICAgIG1hdGNoLmluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFtEQVRFX0dST1VQXS5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oXCJtb250aFwiLCBtb250aCk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oXCJkYXlcIiwgZGF5KTtcblxuICAgICAgICBpZiAobWF0Y2hbWUVBUl9HUk9VUF0pIHtcbiAgICAgICAgICAgIGNvbnN0IHllYXJOdW1iZXIgPSBwYXJzZVllYXIobWF0Y2hbWUVBUl9HUk9VUF0pO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbihcInllYXJcIiwgeWVhck51bWJlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB5ZWFyID0gZmluZFllYXJDbG9zZXN0VG9SZWYoY29udGV4dC5yZWZEYXRlLCBkYXksIG1vbnRoKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseShcInllYXJcIiwgeWVhcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2hbREFURV9UT19HUk9VUF0pIHtcbiAgICAgICAgICAgIGNvbnN0IGVuZERhdGUgPSBwYXJzZU9yZGluYWxOdW1iZXJQYXR0ZXJuKG1hdGNoW0RBVEVfVE9fR1JPVVBdKTtcblxuICAgICAgICAgICAgcmVzdWx0LmVuZCA9IHJlc3VsdC5zdGFydC5jbG9uZSgpO1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oXCJkYXlcIiwgZW5kRGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzaW5nQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi9jaHJvbm9cIjtcbmltcG9ydCB7IGZpbmRZZWFyQ2xvc2VzdFRvUmVmIH0gZnJvbSBcIi4uLy4uLy4uL2NhbGN1bGF0aW9uL3llYXJzXCI7XG5pbXBvcnQgeyBNT05USF9ESUNUSU9OQVJZIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgT1JESU5BTF9OVU1CRVJfUEFUVEVSTiwgcGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybiB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IFlFQVJfUEFUVEVSTiwgcGFyc2VZZWFyIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgbWF0Y2hBbnlQYXR0ZXJuIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3BhdHRlcm5cIjtcbmltcG9ydCB7IEFic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeUNoZWNraW5nIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYXJzZXJzL0Fic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeVwiO1xuXG4vLyBwcmV0dGllci1pZ25vcmVcbmNvbnN0IFBBVFRFUk4gPSBuZXcgUmVnRXhwKFxuICAgIGAoJHttYXRjaEFueVBhdHRlcm4oTU9OVEhfRElDVElPTkFSWSl9KWAgK1xuICAgICAgICBcIig/Oi18L3xcXFxccyosP1xcXFxzKilcIiArXG4gICAgICAgIGAoJHtPUkRJTkFMX05VTUJFUl9QQVRURVJOfSkoPyFcXFxccyooPzphbXxwbSkpXFxcXHMqYCArXG4gICAgICAgIFwiKD86XCIgK1xuICAgICAgICAgICAgXCIoPzp0b3xcXFxcLSlcXFxccypcIiArXG4gICAgICAgICAgICBgKCR7T1JESU5BTF9OVU1CRVJfUEFUVEVSTn0pXFxcXHMqYCArXG4gICAgICAgIFwiKT9cIiArXG4gICAgICAgIFwiKD86XCIgK1xuICAgICAgICAgICAgYCg/Oi18L3xcXFxccyosXFxcXHMqfFxcXFxzKylgICtcbiAgICAgICAgICAgIGAoJHtZRUFSX1BBVFRFUk59KWAgK1xuICAgICAgICBcIik/XCIgK1xuICAgICAgICBcIig/PVxcXFxXfCQpKD8hXFxcXDpcXFxcZClcIixcbiAgICBcImlcIlxuKTtcblxuY29uc3QgTU9OVEhfTkFNRV9HUk9VUCA9IDE7XG5jb25zdCBEQVRFX0dST1VQID0gMjtcbmNvbnN0IERBVEVfVE9fR1JPVVAgPSAzO1xuY29uc3QgWUVBUl9HUk9VUCA9IDQ7XG5cbi8qKlxuICogVGhlIHBhcnNlciBmb3IgcGFyc2luZyBVUydzIGRhdGUgZm9ybWF0IHRoYXQgYmVnaW4gd2l0aCBtb250aCdzIG5hbWUuXG4gKiAgLSBKYW51YXJ5IDEzXG4gKiAgLSBKYW51YXJ5IDEzLCAyMDEyXG4gKiAgLSBKYW51YXJ5IDEzIC0gMTUsIDIwMTJcbiAqIE5vdGU6IFdhdGNoIG91dCBmb3I6XG4gKiAgLSBKYW51YXJ5IDEyOjAwXG4gKiAgLSBKYW51YXJ5IDEyLjQ0XG4gKiAgLSBKYW51YXJ5IDEyMjIzNDRcbiAqICAtIEphbnVhcnkgMjEgKHdoZW4gc2hvdWxkU2tpcFllYXJMaWtlRGF0ZT10cnVlKVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFTk1vbnRoTmFtZU1pZGRsZUVuZGlhblBhcnNlciBleHRlbmRzIEFic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeUNoZWNraW5nIHtcbiAgICBzaG91bGRTa2lwWWVhckxpa2VEYXRlOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3Ioc2hvdWxkU2tpcFllYXJMaWtlRGF0ZTogYm9vbGVhbikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNob3VsZFNraXBZZWFyTGlrZURhdGUgPSBzaG91bGRTa2lwWWVhckxpa2VEYXRlO1xuICAgIH1cblxuICAgIGlubmVyUGF0dGVybigpOiBSZWdFeHAge1xuICAgICAgICByZXR1cm4gUEFUVEVSTjtcbiAgICB9XG5cbiAgICBpbm5lckV4dHJhY3QoY29udGV4dDogUGFyc2luZ0NvbnRleHQsIG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5KSB7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gTU9OVEhfRElDVElPTkFSWVttYXRjaFtNT05USF9OQU1FX0dST1VQXS50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgY29uc3QgZGF5ID0gcGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybihtYXRjaFtEQVRFX0dST1VQXSk7XG4gICAgICAgIGlmIChkYXkgPiAzMSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTa2lwIHRoZSBjYXNlIHdoZXJlIHRoZSBkYXkgbG9va3MgbGlrZSBhIHllYXIgKGV4OiBKYW51YXJ5IDIxKVxuICAgICAgICBpZiAodGhpcy5zaG91bGRTa2lwWWVhckxpa2VEYXRlKSB7XG4gICAgICAgICAgICBpZiAoIW1hdGNoW0RBVEVfVE9fR1JPVVBdICYmICFtYXRjaFtZRUFSX0dST1VQXSAmJiBtYXRjaFtEQVRFX0dST1VQXS5tYXRjaCgvXjJbMC01XSQvKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBjb250ZXh0XG4gICAgICAgICAgICAuY3JlYXRlUGFyc2luZ0NvbXBvbmVudHMoe1xuICAgICAgICAgICAgICAgIGRheTogZGF5LFxuICAgICAgICAgICAgICAgIG1vbnRoOiBtb250aCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYWRkVGFnKFwicGFyc2VyL0VOTW9udGhOYW1lTWlkZGxlRW5kaWFuUGFyc2VyXCIpO1xuXG4gICAgICAgIGlmIChtYXRjaFtZRUFSX0dST1VQXSkge1xuICAgICAgICAgICAgY29uc3QgeWVhciA9IHBhcnNlWWVhcihtYXRjaFtZRUFSX0dST1VQXSk7XG4gICAgICAgICAgICBjb21wb25lbnRzLmFzc2lnbihcInllYXJcIiwgeWVhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB5ZWFyID0gZmluZFllYXJDbG9zZXN0VG9SZWYoY29udGV4dC5yZWZEYXRlLCBkYXksIG1vbnRoKTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMuaW1wbHkoXCJ5ZWFyXCIsIHllYXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghbWF0Y2hbREFURV9UT19HUk9VUF0pIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGV4dCBjYW4gYmUgJ3JhbmdlJyB2YWx1ZS4gU3VjaCBhcyAnSmFudWFyeSAxMiAtIDEzLCAyMDEyJ1xuICAgICAgICBjb25zdCBlbmREYXRlID0gcGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybihtYXRjaFtEQVRFX1RPX0dST1VQXSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGNvbnRleHQuY3JlYXRlUGFyc2luZ1Jlc3VsdChtYXRjaC5pbmRleCwgbWF0Y2hbMF0pO1xuICAgICAgICByZXN1bHQuc3RhcnQgPSBjb21wb25lbnRzO1xuICAgICAgICByZXN1bHQuZW5kID0gY29tcG9uZW50cy5jbG9uZSgpO1xuICAgICAgICByZXN1bHQuZW5kLmFzc2lnbihcImRheVwiLCBlbmREYXRlKTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBGVUxMX01PTlRIX05BTUVfRElDVElPTkFSWSwgTU9OVEhfRElDVElPTkFSWSB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IFBhcnNpbmdDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uL2Nocm9ub1wiO1xuaW1wb3J0IHsgZmluZFllYXJDbG9zZXN0VG9SZWYgfSBmcm9tIFwiLi4vLi4vLi4vY2FsY3VsYXRpb24veWVhcnNcIjtcbmltcG9ydCB7IG1hdGNoQW55UGF0dGVybiB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wYXR0ZXJuXCI7XG5pbXBvcnQgeyBZRUFSX1BBVFRFUk4sIHBhcnNlWWVhciB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IEFic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeUNoZWNraW5nIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYXJzZXJzL0Fic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeVwiO1xuXG5jb25zdCBQQVRURVJOID0gbmV3IFJlZ0V4cChcbiAgICBgKCg/OmluKVxcXFxzKik/YCArXG4gICAgICAgIGAoJHttYXRjaEFueVBhdHRlcm4oTU9OVEhfRElDVElPTkFSWSl9KWAgK1xuICAgICAgICBgXFxcXHMqYCArXG4gICAgICAgIGAoPzpgICtcbiAgICAgICAgYCg/Oix8LXxvZik/XFxcXHMqKCR7WUVBUl9QQVRURVJOfSk/YCArXG4gICAgICAgIFwiKT9cIiArXG4gICAgICAgIFwiKD89W15cXFxcc1xcXFx3XXxcXFxccytbXjAtOV18XFxcXHMrJHwkKVwiLFxuICAgIFwiaVwiXG4pO1xuXG5jb25zdCBQUkVGSVhfR1JPVVAgPSAxO1xuY29uc3QgTU9OVEhfTkFNRV9HUk9VUCA9IDI7XG5jb25zdCBZRUFSX0dST1VQID0gMztcblxuLyoqXG4gKiBUaGUgcGFyc2VyIGZvciBwYXJzaW5nIG1vbnRoIG5hbWUgYW5kIHllYXIuXG4gKiAtIEphbnVhcnksIDIwMTJcbiAqIC0gSmFudWFyeSAyMDEyXG4gKiAtIEphbnVhcnlcbiAqIChpbikgSmFuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVOTW9udGhOYW1lUGFyc2VyIGV4dGVuZHMgQWJzdHJhY3RQYXJzZXJXaXRoV29yZEJvdW5kYXJ5Q2hlY2tpbmcge1xuICAgIGlubmVyUGF0dGVybigpOiBSZWdFeHAge1xuICAgICAgICByZXR1cm4gUEFUVEVSTjtcbiAgICB9XG5cbiAgICBpbm5lckV4dHJhY3QoY29udGV4dDogUGFyc2luZ0NvbnRleHQsIG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5KSB7XG4gICAgICAgIGNvbnN0IG1vbnRoTmFtZSA9IG1hdGNoW01PTlRIX05BTUVfR1JPVVBdLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgLy8gc2tpcCBzb21lIHVubGlrZWx5IHdvcmRzIFwiamFuXCIsIFwibWFyXCIsIC4uXG4gICAgICAgIGlmIChtYXRjaFswXS5sZW5ndGggPD0gMyAmJiAhRlVMTF9NT05USF9OQU1FX0RJQ1RJT05BUllbbW9udGhOYW1lXSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXN1bHQgPSBjb250ZXh0LmNyZWF0ZVBhcnNpbmdSZXN1bHQoXG4gICAgICAgICAgICBtYXRjaC5pbmRleCArIChtYXRjaFtQUkVGSVhfR1JPVVBdIHx8IFwiXCIpLmxlbmd0aCxcbiAgICAgICAgICAgIG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoXG4gICAgICAgICk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseShcImRheVwiLCAxKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFkZFRhZyhcInBhcnNlci9FTk1vbnRoTmFtZVBhcnNlclwiKTtcblxuICAgICAgICBjb25zdCBtb250aCA9IE1PTlRIX0RJQ1RJT05BUllbbW9udGhOYW1lXTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbihcIm1vbnRoXCIsIG1vbnRoKTtcblxuICAgICAgICBpZiAobWF0Y2hbWUVBUl9HUk9VUF0pIHtcbiAgICAgICAgICAgIGNvbnN0IHllYXIgPSBwYXJzZVllYXIobWF0Y2hbWUVBUl9HUk9VUF0pO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbihcInllYXJcIiwgeWVhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB5ZWFyID0gZmluZFllYXJDbG9zZXN0VG9SZWYoY29udGV4dC5yZWZEYXRlLCAxLCBtb250aCk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoXCJ5ZWFyXCIsIHllYXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2luZ0NvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vY2hyb25vXCI7XG5pbXBvcnQgeyBNT05USF9ESUNUSU9OQVJZIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgbWF0Y2hBbnlQYXR0ZXJuIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3BhdHRlcm5cIjtcbmltcG9ydCB7IEFic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeUNoZWNraW5nIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYXJzZXJzL0Fic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeVwiO1xuXG4vKlxuICAgIERhdGUgZm9ybWF0IHdpdGggc2xhc2ggXCIvXCIgYmV0d2VlbiBudW1iZXJzIGxpa2UgRU5TbGFzaERhdGVGb3JtYXRQYXJzZXIsXG4gICAgYnV0IHRoaXMgcGFyc2VyIGV4cGVjdCB5ZWFyIGJlZm9yZSBtb250aCBhbmQgZGF0ZS5cbiAgICAtIFlZWVkvTU0vRERcbiAgICAtIFlZWVktTU0tRERcbiAgICAtIFlZWVkuTU0uRERcbiovXG5jb25zdCBQQVRURVJOID0gbmV3IFJlZ0V4cChcbiAgICBgKFswLTldezR9KVstXFxcXC5cXFxcL1xcXFxzXWAgK1xuICAgICAgICBgKD86KCR7bWF0Y2hBbnlQYXR0ZXJuKE1PTlRIX0RJQ1RJT05BUlkpfSl8KFswLTldezEsMn0pKVstXFxcXC5cXFxcL1xcXFxzXWAgK1xuICAgICAgICBgKFswLTldezEsMn0pYCArXG4gICAgICAgIFwiKD89XFxcXFd8JClcIixcbiAgICBcImlcIlxuKTtcblxuY29uc3QgWUVBUl9OVU1CRVJfR1JPVVAgPSAxO1xuY29uc3QgTU9OVEhfTkFNRV9HUk9VUCA9IDI7XG5jb25zdCBNT05USF9OVU1CRVJfR1JPVVAgPSAzO1xuY29uc3QgREFURV9OVU1CRVJfR1JPVVAgPSA0O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFTlllYXJNb250aERheVBhcnNlciBleHRlbmRzIEFic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeUNoZWNraW5nIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0cmljdE1vbnRoRGF0ZU9yZGVyOiBib29sZWFuKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgaW5uZXJQYXR0ZXJuKCk6IFJlZ0V4cCB7XG4gICAgICAgIHJldHVybiBQQVRURVJOO1xuICAgIH1cblxuICAgIGlubmVyRXh0cmFjdChjb250ZXh0OiBQYXJzaW5nQ29udGV4dCwgbWF0Y2g6IFJlZ0V4cE1hdGNoQXJyYXkpIHtcbiAgICAgICAgY29uc3QgeWVhciA9IHBhcnNlSW50KG1hdGNoW1lFQVJfTlVNQkVSX0dST1VQXSk7XG4gICAgICAgIGxldCBkYXkgPSBwYXJzZUludChtYXRjaFtEQVRFX05VTUJFUl9HUk9VUF0pO1xuICAgICAgICBsZXQgbW9udGggPSBtYXRjaFtNT05USF9OVU1CRVJfR1JPVVBdXG4gICAgICAgICAgICA/IHBhcnNlSW50KG1hdGNoW01PTlRIX05VTUJFUl9HUk9VUF0pXG4gICAgICAgICAgICA6IE1PTlRIX0RJQ1RJT05BUllbbWF0Y2hbTU9OVEhfTkFNRV9HUk9VUF0udG9Mb3dlckNhc2UoKV07XG5cbiAgICAgICAgaWYgKG1vbnRoIDwgMSB8fCBtb250aCA+IDEyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdHJpY3RNb250aERhdGVPcmRlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRheSA+PSAxICYmIGRheSA8PSAxMikge1xuICAgICAgICAgICAgICAgIFttb250aCwgZGF5XSA9IFtkYXksIG1vbnRoXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF5IDwgMSB8fCBkYXkgPiAzMSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF5OiBkYXksXG4gICAgICAgICAgICBtb250aDogbW9udGgsXG4gICAgICAgICAgICB5ZWFyOiB5ZWFyLFxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzaW5nQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi9jaHJvbm9cIjtcbmltcG9ydCB7IFBhcnNpbmdDb21wb25lbnRzIH0gZnJvbSBcIi4uLy4uLy4uL3Jlc3VsdHNcIjtcbmltcG9ydCB7IEFic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeUNoZWNraW5nIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYXJzZXJzL0Fic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeVwiO1xuXG5jb25zdCBQQVRURVJOID0gbmV3IFJlZ0V4cChcIihbMC05XXwwWzEtOV18MVswMTJdKS8oWzAtOV17NH0pXCIgKyBcIlwiLCBcImlcIik7XG5cbmNvbnN0IE1PTlRIX0dST1VQID0gMTtcbmNvbnN0IFlFQVJfR1JPVVAgPSAyO1xuXG4vKipcbiAqIE1vbnRoL1llYXIgZGF0ZSBmb3JtYXQgd2l0aCBzbGFzaCBcIi9cIiAoYWxzbyBcIi1cIiBhbmQgXCIuXCIpIGJldHdlZW4gbnVtYmVyc1xuICogLSAxMS8wNVxuICogLSAwNi8yMDA1XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVOU2xhc2hNb250aEZvcm1hdFBhcnNlciBleHRlbmRzIEFic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeUNoZWNraW5nIHtcbiAgICBpbm5lclBhdHRlcm4oKTogUmVnRXhwIHtcbiAgICAgICAgcmV0dXJuIFBBVFRFUk47XG4gICAgfVxuXG4gICAgaW5uZXJFeHRyYWN0KGNvbnRleHQ6IFBhcnNpbmdDb250ZXh0LCBtYXRjaDogUmVnRXhwTWF0Y2hBcnJheSk6IFBhcnNpbmdDb21wb25lbnRzIHtcbiAgICAgICAgY29uc3QgeWVhciA9IHBhcnNlSW50KG1hdGNoW1lFQVJfR1JPVVBdKTtcbiAgICAgICAgY29uc3QgbW9udGggPSBwYXJzZUludChtYXRjaFtNT05USF9HUk9VUF0pO1xuXG4gICAgICAgIHJldHVybiBjb250ZXh0LmNyZWF0ZVBhcnNpbmdDb21wb25lbnRzKCkuaW1wbHkoXCJkYXlcIiwgMSkuYXNzaWduKFwibW9udGhcIiwgbW9udGgpLmFzc2lnbihcInllYXJcIiwgeWVhcik7XG4gICAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlciwgUGFyc2luZ0NvbnRleHQgfSBmcm9tIFwiLi4vLi4vY2hyb25vXCI7XG5pbXBvcnQgeyBQYXJzaW5nQ29tcG9uZW50cywgUGFyc2luZ1Jlc3VsdCB9IGZyb20gXCIuLi8uLi9yZXN1bHRzXCI7XG5pbXBvcnQgeyBNZXJpZGllbSB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG4vLyBwcmV0dGllci1pZ25vcmVcbmZ1bmN0aW9uIHByaW1hcnlUaW1lUGF0dGVybihsZWZ0Qm91bmRhcnk6IHN0cmluZywgcHJpbWFyeVByZWZpeDogc3RyaW5nLCBwcmltYXJ5U3VmZml4OiBzdHJpbmcsIGZsYWdzOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIGAke2xlZnRCb3VuZGFyeX1gICtcbiAgICAgICAgICAgIGAke3ByaW1hcnlQcmVmaXh9YCArXG4gICAgICAgICAgICBgKFxcXFxkezEsNH0pYCArXG4gICAgICAgICAgICBgKD86YCArXG4gICAgICAgICAgICAgICAgYCg/OlxcXFwufDp8XHVGRjFBKWAgK1xuICAgICAgICAgICAgICAgIGAoXFxcXGR7MSwyfSlgICtcbiAgICAgICAgICAgICAgICBgKD86YCArXG4gICAgICAgICAgICAgICAgICAgIGAoPzo6fFx1RkYxQSlgICtcbiAgICAgICAgICAgICAgICAgICAgYChcXFxcZHsyfSlgICtcbiAgICAgICAgICAgICAgICAgICAgYCg/OlxcXFwuKFxcXFxkezEsNn0pKT9gICtcbiAgICAgICAgICAgICAgICBgKT9gICtcbiAgICAgICAgICAgIGApP2AgK1xuICAgICAgICAgICAgYCg/OlxcXFxzKihhXFxcXC5tXFxcXC58cFxcXFwubVxcXFwufGFtP3xwbT8pKT9gICtcbiAgICAgICAgICAgIGAke3ByaW1hcnlTdWZmaXh9YCxcbiAgICAgICAgZmxhZ3NcbiAgICApO1xufVxuXG4vLyBwcmV0dGllci1pZ25vcmVcbmZ1bmN0aW9uIGZvbGxvd2luZ1RpbWVQYXR0ZW4oZm9sbG93aW5nUGhhc2U6IHN0cmluZywgZm9sbG93aW5nU3VmZml4OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChcbiAgICAgICAgYF4oJHtmb2xsb3dpbmdQaGFzZX0pYCArXG4gICAgICAgICAgICBgKFxcXFxkezEsNH0pYCArXG4gICAgICAgICAgICBgKD86YCArXG4gICAgICAgICAgICAgICAgYCg/OlxcXFwufFxcXFw6fFxcXFxcdUZGMUEpYCArXG4gICAgICAgICAgICAgICAgYChcXFxcZHsxLDJ9KWAgK1xuICAgICAgICAgICAgICAgIGAoPzpgICtcbiAgICAgICAgICAgICAgICAgICAgYCg/OlxcXFwufFxcXFw6fFxcXFxcdUZGMUEpYCArXG4gICAgICAgICAgICAgICAgICAgIGAoXFxcXGR7MSwyfSkoPzpcXFxcLihcXFxcZHsxLDZ9KSk/YCArXG4gICAgICAgICAgICAgICAgYCk/YCArXG4gICAgICAgICAgICBgKT9gICtcbiAgICAgICAgICAgIGAoPzpcXFxccyooYVxcXFwubVxcXFwufHBcXFxcLm1cXFxcLnxhbT98cG0/KSk/YCArXG4gICAgICAgICAgICBgJHtmb2xsb3dpbmdTdWZmaXh9YCxcbiAgICAgICAgXCJpXCJcbiAgICApO1xufVxuXG5jb25zdCBIT1VSX0dST1VQID0gMjtcbmNvbnN0IE1JTlVURV9HUk9VUCA9IDM7XG5jb25zdCBTRUNPTkRfR1JPVVAgPSA0O1xuY29uc3QgTUlMTElfU0VDT05EX0dST1VQID0gNTtcbmNvbnN0IEFNX1BNX0hPVVJfR1JPVVAgPSA2O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RUaW1lRXhwcmVzc2lvblBhcnNlciBpbXBsZW1lbnRzIFBhcnNlciB7XG4gICAgYWJzdHJhY3QgcHJpbWFyeVByZWZpeCgpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZm9sbG93aW5nUGhhc2UoKTogc3RyaW5nO1xuICAgIHN0cmljdE1vZGU6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihzdHJpY3RNb2RlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5zdHJpY3RNb2RlID0gc3RyaWN0TW9kZTtcbiAgICB9XG5cbiAgICBwYXR0ZXJuRmxhZ3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwiaVwiO1xuICAgIH1cblxuICAgIHByaW1hcnlQYXR0ZXJuTGVmdEJvdW5kYXJ5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgKF58XFxcXHN8VHxcXFxcYilgO1xuICAgIH1cblxuICAgIHByaW1hcnlTdWZmaXgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAoPyEvKSg/PVxcXFxXfCQpYDtcbiAgICB9XG5cbiAgICBmb2xsb3dpbmdTdWZmaXgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAoPyEvKSg/PVxcXFxXfCQpYDtcbiAgICB9XG5cbiAgICBwYXR0ZXJuKGNvbnRleHQ6IFBhcnNpbmdDb250ZXh0KTogUmVnRXhwIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJpbWFyeVRpbWVQYXR0ZXJuVGhyb3VnaENhY2hlKCk7XG4gICAgfVxuXG4gICAgZXh0cmFjdChjb250ZXh0OiBQYXJzaW5nQ29udGV4dCwgbWF0Y2g6IFJlZ0V4cE1hdGNoQXJyYXkpOiBQYXJzaW5nUmVzdWx0IHtcbiAgICAgICAgY29uc3Qgc3RhcnRDb21wb25lbnRzID0gdGhpcy5leHRyYWN0UHJpbWFyeVRpbWVDb21wb25lbnRzKGNvbnRleHQsIG1hdGNoKTtcbiAgICAgICAgaWYgKCFzdGFydENvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBtYXRjaCBzZWVtIGxpa2UgYSB5ZWFyIGUuZy4gXCIyMDEzLjEyOi4uLlwiLFxuICAgICAgICAgICAgLy8gdGhlbiBza2lwcyB0aGUgeWVhciBwYXJ0IGFuZCB0cnkgbWF0Y2hpbmcgYWdhaW4uXG4gICAgICAgICAgICBpZiAobWF0Y2hbMF0ubWF0Y2goL15cXGR7NH0vKSkge1xuICAgICAgICAgICAgICAgIG1hdGNoLmluZGV4ICs9IDQ7IC8vIFNraXAgb3ZlciBwb3RlbnRpYWwgb3ZlcmxhcHBpbmcgcGF0dGVyblxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtYXRjaC5pbmRleCArPSBtYXRjaFswXS5sZW5ndGg7IC8vIFNraXAgb3ZlciBwb3RlbnRpYWwgb3ZlcmxhcHBpbmcgcGF0dGVyblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICBjb25zdCB0ZXh0ID0gbWF0Y2hbMF0uc3Vic3RyaW5nKG1hdGNoWzFdLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGNvbnRleHQuY3JlYXRlUGFyc2luZ1Jlc3VsdChpbmRleCwgdGV4dCwgc3RhcnRDb21wb25lbnRzKTtcbiAgICAgICAgbWF0Y2guaW5kZXggKz0gbWF0Y2hbMF0ubGVuZ3RoOyAvLyBTa2lwIG92ZXIgcG90ZW50aWFsIG92ZXJsYXBwaW5nIHBhdHRlcm5cblxuICAgICAgICBjb25zdCByZW1haW5pbmdUZXh0ID0gY29udGV4dC50ZXh0LnN1YnN0cmluZyhtYXRjaC5pbmRleCk7XG4gICAgICAgIGNvbnN0IGZvbGxvd2luZ1BhdHRlcm4gPSB0aGlzLmdldEZvbGxvd2luZ1RpbWVQYXR0ZXJuVGhyb3VnaENhY2hlKCk7XG4gICAgICAgIGNvbnN0IGZvbGxvd2luZ01hdGNoID0gZm9sbG93aW5nUGF0dGVybi5leGVjKHJlbWFpbmluZ1RleHQpO1xuXG4gICAgICAgIC8vIFBhdHRlcm4gXCI0NTYtMTJcIiwgXCIyMDIyLTEyXCIgc2hvdWxkIG5vdCBiZSB0aW1lIHdpdGhvdXQgcHJvcGVyIGNvbnRleHRcbiAgICAgICAgaWYgKHRleHQubWF0Y2goL15cXGR7Myw0fS8pICYmIGZvbGxvd2luZ01hdGNoKSB7XG4gICAgICAgICAgICAvLyBlLmcuIFwiMjAyMi0xMlwiXG4gICAgICAgICAgICBpZiAoZm9sbG93aW5nTWF0Y2hbMF0ubWF0Y2goL15cXHMqKFsrLV0pXFxzKlxcZHsyLDR9JC8pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBlLmcuIFwiMjAyMi0xMjowMS4uLlwiXG4gICAgICAgICAgICBpZiAoZm9sbG93aW5nTWF0Y2hbMF0ubWF0Y2goL15cXHMqKFsrLV0pXFxzKlxcZHsyfVxcV1xcZHsyfS8pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhZm9sbG93aW5nTWF0Y2ggfHxcbiAgICAgICAgICAgIC8vIFBhdHRlcm4gXCJZWS5ZWSAtWFhYWFwiIGlzIG1vcmUgbGlrZSB0aW1lem9uZSBvZmZzZXRcbiAgICAgICAgICAgIGZvbGxvd2luZ01hdGNoWzBdLm1hdGNoKC9eXFxzKihbKy1dKVxccypcXGR7Myw0fSQvKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoZWNrQW5kUmV0dXJuV2l0aG91dEZvbGxvd2luZ1BhdHRlcm4ocmVzdWx0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC5lbmQgPSB0aGlzLmV4dHJhY3RGb2xsb3dpbmdUaW1lQ29tcG9uZW50cyhjb250ZXh0LCBmb2xsb3dpbmdNYXRjaCwgcmVzdWx0KTtcbiAgICAgICAgaWYgKHJlc3VsdC5lbmQpIHtcbiAgICAgICAgICAgIHJlc3VsdC50ZXh0ICs9IGZvbGxvd2luZ01hdGNoWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tBbmRSZXR1cm5XaXRoRm9sbG93aW5nUGF0dGVybihyZXN1bHQpO1xuICAgIH1cblxuICAgIGV4dHJhY3RQcmltYXJ5VGltZUNvbXBvbmVudHMoXG4gICAgICAgIGNvbnRleHQ6IFBhcnNpbmdDb250ZXh0LFxuICAgICAgICBtYXRjaDogUmVnRXhwTWF0Y2hBcnJheSxcbiAgICAgICAgc3RyaWN0ID0gZmFsc2VcbiAgICApOiBudWxsIHwgUGFyc2luZ0NvbXBvbmVudHMge1xuICAgICAgICBjb25zdCBjb21wb25lbnRzID0gY29udGV4dC5jcmVhdGVQYXJzaW5nQ29tcG9uZW50cygpO1xuICAgICAgICBsZXQgbWludXRlID0gMDtcbiAgICAgICAgbGV0IG1lcmlkaWVtID0gbnVsbDtcblxuICAgICAgICAvLyAtLS0tLSBIb3Vyc1xuICAgICAgICBsZXQgaG91ciA9IHBhcnNlSW50KG1hdGNoW0hPVVJfR1JPVVBdKTtcbiAgICAgICAgaWYgKGhvdXIgPiAxMDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0cmljdE1vZGUgfHwgbWF0Y2hbTUlOVVRFX0dST1VQXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1pbnV0ZSA9IGhvdXIgJSAxMDA7XG4gICAgICAgICAgICBob3VyID0gTWF0aC5mbG9vcihob3VyIC8gMTAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3VyID4gMjQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gLS0tLS0gTWludXRlc1xuICAgICAgICBpZiAobWF0Y2hbTUlOVVRFX0dST1VQXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hbTUlOVVRFX0dST1VQXS5sZW5ndGggPT0gMSAmJiAhbWF0Y2hbQU1fUE1fSE9VUl9HUk9VUF0pIHtcbiAgICAgICAgICAgICAgICAvLyBTa2lwIHNpbmdsZSBkaWdpdCBtaW51dGUgZS5nLiBcImF0IDEuMSB4eFwiXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1pbnV0ZSA9IHBhcnNlSW50KG1hdGNoW01JTlVURV9HUk9VUF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1pbnV0ZSA+PSA2MCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaG91ciA+IDEyKSB7XG4gICAgICAgICAgICBtZXJpZGllbSA9IE1lcmlkaWVtLlBNO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gLS0tLS0gQU0gJiBQTVxuICAgICAgICBpZiAobWF0Y2hbQU1fUE1fSE9VUl9HUk9VUF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGhvdXIgPiAxMikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBjb25zdCBhbXBtID0gbWF0Y2hbQU1fUE1fSE9VUl9HUk9VUF1bMF0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChhbXBtID09IFwiYVwiKSB7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSBNZXJpZGllbS5BTTtcbiAgICAgICAgICAgICAgICBpZiAoaG91ciA9PSAxMikge1xuICAgICAgICAgICAgICAgICAgICBob3VyID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhbXBtID09IFwicFwiKSB7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSBNZXJpZGllbS5QTTtcbiAgICAgICAgICAgICAgICBpZiAoaG91ciAhPSAxMikge1xuICAgICAgICAgICAgICAgICAgICBob3VyICs9IDEyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXBvbmVudHMuYXNzaWduKFwiaG91clwiLCBob3VyKTtcbiAgICAgICAgY29tcG9uZW50cy5hc3NpZ24oXCJtaW51dGVcIiwgbWludXRlKTtcblxuICAgICAgICBpZiAobWVyaWRpZW0gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMuYXNzaWduKFwibWVyaWRpZW1cIiwgbWVyaWRpZW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGhvdXIgPCAxMikge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMuaW1wbHkoXCJtZXJpZGllbVwiLCBNZXJpZGllbS5BTSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMuaW1wbHkoXCJtZXJpZGllbVwiLCBNZXJpZGllbS5QTSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyAtLS0tLSBNaWxsaXNlY29uZFxuICAgICAgICBpZiAobWF0Y2hbTUlMTElfU0VDT05EX0dST1VQXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBtaWxsaXNlY29uZCA9IHBhcnNlSW50KG1hdGNoW01JTExJX1NFQ09ORF9HUk9VUF0uc3Vic3RyaW5nKDAsIDMpKTtcbiAgICAgICAgICAgIGlmIChtaWxsaXNlY29uZCA+PSAxMDAwKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgY29tcG9uZW50cy5hc3NpZ24oXCJtaWxsaXNlY29uZFwiLCBtaWxsaXNlY29uZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAtLS0tLSBTZWNvbmRcbiAgICAgICAgaWYgKG1hdGNoW1NFQ09ORF9HUk9VUF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3Qgc2Vjb25kID0gcGFyc2VJbnQobWF0Y2hbU0VDT05EX0dST1VQXSk7XG4gICAgICAgICAgICBpZiAoc2Vjb25kID49IDYwKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgY29tcG9uZW50cy5hc3NpZ24oXCJzZWNvbmRcIiwgc2Vjb25kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb21wb25lbnRzO1xuICAgIH1cblxuICAgIGV4dHJhY3RGb2xsb3dpbmdUaW1lQ29tcG9uZW50cyhcbiAgICAgICAgY29udGV4dDogUGFyc2luZ0NvbnRleHQsXG4gICAgICAgIG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5LFxuICAgICAgICByZXN1bHQ6IFBhcnNpbmdSZXN1bHRcbiAgICApOiBudWxsIHwgUGFyc2luZ0NvbXBvbmVudHMge1xuICAgICAgICBjb25zdCBjb21wb25lbnRzID0gY29udGV4dC5jcmVhdGVQYXJzaW5nQ29tcG9uZW50cygpO1xuXG4gICAgICAgIC8vIC0tLS0tIE1pbGxpc2Vjb25kXG4gICAgICAgIGlmIChtYXRjaFtNSUxMSV9TRUNPTkRfR1JPVVBdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IG1pbGxpc2Vjb25kID0gcGFyc2VJbnQobWF0Y2hbTUlMTElfU0VDT05EX0dST1VQXS5zdWJzdHJpbmcoMCwgMykpO1xuICAgICAgICAgICAgaWYgKG1pbGxpc2Vjb25kID49IDEwMDApIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICBjb21wb25lbnRzLmFzc2lnbihcIm1pbGxpc2Vjb25kXCIsIG1pbGxpc2Vjb25kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIC0tLS0tIFNlY29uZFxuICAgICAgICBpZiAobWF0Y2hbU0VDT05EX0dST1VQXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBzZWNvbmQgPSBwYXJzZUludChtYXRjaFtTRUNPTkRfR1JPVVBdKTtcbiAgICAgICAgICAgIGlmIChzZWNvbmQgPj0gNjApIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICBjb21wb25lbnRzLmFzc2lnbihcInNlY29uZFwiLCBzZWNvbmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGhvdXIgPSBwYXJzZUludChtYXRjaFtIT1VSX0dST1VQXSk7XG4gICAgICAgIGxldCBtaW51dGUgPSAwO1xuICAgICAgICBsZXQgbWVyaWRpZW0gPSAtMTtcblxuICAgICAgICAvLyAtLS0tLSBNaW51dGVcbiAgICAgICAgaWYgKG1hdGNoW01JTlVURV9HUk9VUF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgbWludXRlID0gcGFyc2VJbnQobWF0Y2hbTUlOVVRFX0dST1VQXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaG91ciA+IDEwMCkge1xuICAgICAgICAgICAgbWludXRlID0gaG91ciAlIDEwMDtcbiAgICAgICAgICAgIGhvdXIgPSBNYXRoLmZsb29yKGhvdXIgLyAxMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1pbnV0ZSA+PSA2MCB8fCBob3VyID4gMjQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhvdXIgPj0gMTIpIHtcbiAgICAgICAgICAgIG1lcmlkaWVtID0gTWVyaWRpZW0uUE07XG4gICAgICAgIH1cblxuICAgICAgICAvLyAtLS0tLSBBTSAmIFBNXG4gICAgICAgIGlmIChtYXRjaFtBTV9QTV9IT1VSX0dST1VQXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoaG91ciA+IDEyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFtcG0gPSBtYXRjaFtBTV9QTV9IT1VSX0dST1VQXVswXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKGFtcG0gPT0gXCJhXCIpIHtcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IE1lcmlkaWVtLkFNO1xuICAgICAgICAgICAgICAgIGlmIChob3VyID09IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbXBvbmVudHMuaXNDZXJ0YWluKFwiZGF5XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLmltcGx5KFwiZGF5XCIsIGNvbXBvbmVudHMuZ2V0KFwiZGF5XCIpICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhbXBtID09IFwicFwiKSB7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSBNZXJpZGllbS5QTTtcbiAgICAgICAgICAgICAgICBpZiAoaG91ciAhPSAxMikgaG91ciArPSAxMjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuc3RhcnQuaXNDZXJ0YWluKFwibWVyaWRpZW1cIikpIHtcbiAgICAgICAgICAgICAgICBpZiAobWVyaWRpZW0gPT0gTWVyaWRpZW0uQU0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KFwibWVyaWRpZW1cIiwgTWVyaWRpZW0uQU0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuZ2V0KFwiaG91clwiKSA9PSAxMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbihcImhvdXJcIiwgMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoXCJtZXJpZGllbVwiLCBNZXJpZGllbS5QTSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdGFydC5nZXQoXCJob3VyXCIpICE9IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKFwiaG91clwiLCByZXN1bHQuc3RhcnQuZ2V0KFwiaG91clwiKSArIDEyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXBvbmVudHMuYXNzaWduKFwiaG91clwiLCBob3VyKTtcbiAgICAgICAgY29tcG9uZW50cy5hc3NpZ24oXCJtaW51dGVcIiwgbWludXRlKTtcblxuICAgICAgICBpZiAobWVyaWRpZW0gPj0gMCkge1xuICAgICAgICAgICAgY29tcG9uZW50cy5hc3NpZ24oXCJtZXJpZGllbVwiLCBtZXJpZGllbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydEF0UE0gPSByZXN1bHQuc3RhcnQuaXNDZXJ0YWluKFwibWVyaWRpZW1cIikgJiYgcmVzdWx0LnN0YXJ0LmdldChcImhvdXJcIikgPiAxMjtcbiAgICAgICAgICAgIGlmIChzdGFydEF0UE0pIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN0YXJ0LmdldChcImhvdXJcIikgLSAxMiA+IGhvdXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gMTBwbSAtIDEgKGFtKVxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLmltcGx5KFwibWVyaWRpZW1cIiwgTWVyaWRpZW0uQU0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaG91ciA8PSAxMikge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLmFzc2lnbihcImhvdXJcIiwgaG91ciArIDEyKTtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50cy5hc3NpZ24oXCJtZXJpZGllbVwiLCBNZXJpZGllbS5QTSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChob3VyID4gMTIpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzLmltcGx5KFwibWVyaWRpZW1cIiwgTWVyaWRpZW0uUE0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChob3VyIDw9IDEyKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50cy5pbXBseShcIm1lcmlkaWVtXCIsIE1lcmlkaWVtLkFNKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21wb25lbnRzLmRhdGUoKS5nZXRUaW1lKCkgPCByZXN1bHQuc3RhcnQuZGF0ZSgpLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgY29tcG9uZW50cy5pbXBseShcImRheVwiLCBjb21wb25lbnRzLmdldChcImRheVwiKSArIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0FuZFJldHVybldpdGhvdXRGb2xsb3dpbmdQYXR0ZXJuKHJlc3VsdCkge1xuICAgICAgICAvLyBTaW5nbGUgZGlnaXQgKGUuZyBcIjFcIikgc2hvdWxkIG5vdCBiZSBjb3VudGVkIGFzIHRpbWUgZXhwcmVzc2lvbiAod2l0aG91dCBwcm9wZXIgY29udGV4dClcbiAgICAgICAgaWYgKHJlc3VsdC50ZXh0Lm1hdGNoKC9eXFxkJC8pKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRocmVlIG9yIG1vcmUgZGlnaXQgKGUuZy4gXCIyMDNcIiwgXCIyMDE0XCIpIHNob3VsZCBub3QgYmUgY291bnRlZCBhcyB0aW1lIGV4cHJlc3Npb24gKHdpdGhvdXQgcHJvcGVyIGNvbnRleHQpXG4gICAgICAgIGlmIChyZXN1bHQudGV4dC5tYXRjaCgvXlxcZFxcZFxcZCskLykpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSW5zdGVhZCBvZiBcImFtL3BtXCIsIGl0IGVuZHMgd2l0aCBcImFcIiBvciBcInBcIiAoZS5nIFwiMWFcIiwgXCIxMjNwXCIpLCB0aGlzIHNlZW1zIHVubGlrZWx5XG4gICAgICAgIGlmIChyZXN1bHQudGV4dC5tYXRjaCgvXFxkW2FwQVBdJC8pKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIGl0IGVuZHMgb25seSB3aXRoIG51bWJlcnMgb3IgZG90c1xuICAgICAgICBjb25zdCBlbmRpbmdXaXRoTnVtYmVycyA9IHJlc3VsdC50ZXh0Lm1hdGNoKC9bXlxcZDouXShcXGRbXFxkLl0rKSQvKTtcbiAgICAgICAgaWYgKGVuZGluZ1dpdGhOdW1iZXJzKSB7XG4gICAgICAgICAgICBjb25zdCBlbmRpbmdOdW1iZXJzOiBzdHJpbmcgPSBlbmRpbmdXaXRoTnVtYmVyc1sxXTtcblxuICAgICAgICAgICAgLy8gSW4gc3RyaWN0IG1vZGUgKGUuZy4gXCJhdCAxXCIgb3IgXCJhdCAxLjJcIiksIHRoaXMgc2hvdWxkIG5vdCBiZSBhY2NlcHRlZFxuICAgICAgICAgICAgaWYgKHRoaXMuc3RyaWN0TW9kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiBpdCBlbmRzIG9ubHkgd2l0aCBkb3Qgc2luZ2xlIGRpZ2l0LCBlLmcuIFwiYXQgMS4yXCJcbiAgICAgICAgICAgIGlmIChlbmRpbmdOdW1iZXJzLmluY2x1ZGVzKFwiLlwiKSAmJiAhZW5kaW5nTnVtYmVycy5tYXRjaCgvXFxkKFxcLlxcZHsyfSkrJC8pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIGl0IGVuZHMgb25seSB3aXRoIG51bWJlcnMgYWJvdmUgMjQsIGUuZy4gXCJhdCAyNVwiXG4gICAgICAgICAgICBjb25zdCBlbmRpbmdOdW1iZXJWYWwgPSBwYXJzZUludChlbmRpbmdOdW1iZXJzKTtcbiAgICAgICAgICAgIGlmIChlbmRpbmdOdW1iZXJWYWwgPiAyNCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrQW5kUmV0dXJuV2l0aEZvbGxvd2luZ1BhdHRlcm4ocmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQudGV4dC5tYXRjaCgvXlxcZCstXFxkKyQvKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBpdCBlbmRzIG9ubHkgd2l0aCBudW1iZXJzIG9yIGRvdHNcbiAgICAgICAgY29uc3QgZW5kaW5nV2l0aE51bWJlcnMgPSByZXN1bHQudGV4dC5tYXRjaCgvW15cXGQ6Ll0oXFxkW1xcZC5dKylcXHMqLVxccyooXFxkW1xcZC5dKykkLyk7XG4gICAgICAgIGlmIChlbmRpbmdXaXRoTnVtYmVycykge1xuICAgICAgICAgICAgLy8gSW4gc3RyaWN0IG1vZGUgKGUuZy4gXCJhdCAxLTNcIiBvciBcImF0IDEuMiAtIDIuM1wiKSwgdGhpcyBzaG91bGQgbm90IGJlIGFjY2VwdGVkXG4gICAgICAgICAgICBpZiAodGhpcy5zdHJpY3RNb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0aW5nTnVtYmVyczogc3RyaW5nID0gZW5kaW5nV2l0aE51bWJlcnNbMV07XG4gICAgICAgICAgICBjb25zdCBlbmRpbmdOdW1iZXJzOiBzdHJpbmcgPSBlbmRpbmdXaXRoTnVtYmVyc1syXTtcbiAgICAgICAgICAgIC8vIElmIGl0IGVuZHMgb25seSB3aXRoIGRvdCBzaW5nbGUgZGlnaXQsIGUuZy4gXCJhdCAxLjJcIlxuICAgICAgICAgICAgaWYgKGVuZGluZ051bWJlcnMuaW5jbHVkZXMoXCIuXCIpICYmICFlbmRpbmdOdW1iZXJzLm1hdGNoKC9cXGQoXFwuXFxkezJ9KSskLykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSWYgaXQgZW5kcyBvbmx5IHdpdGggbnVtYmVycyBhYm92ZSAyNCwgZS5nLiBcImF0IDI1XCJcbiAgICAgICAgICAgIGNvbnN0IGVuZGluZ051bWJlclZhbCA9IHBhcnNlSW50KGVuZGluZ051bWJlcnMpO1xuICAgICAgICAgICAgY29uc3Qgc3RhcnRpbmdOdW1iZXJWYWwgPSBwYXJzZUludChzdGFydGluZ051bWJlcnMpO1xuICAgICAgICAgICAgaWYgKGVuZGluZ051bWJlclZhbCA+IDI0IHx8IHN0YXJ0aW5nTnVtYmVyVmFsID4gMjQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWNoZWRQcmltYXJ5UHJlZml4ID0gbnVsbDtcbiAgICBwcml2YXRlIGNhY2hlZFByaW1hcnlTdWZmaXggPSBudWxsO1xuICAgIHByaXZhdGUgY2FjaGVkUHJpbWFyeVRpbWVQYXR0ZXJuID0gbnVsbDtcblxuICAgIGdldFByaW1hcnlUaW1lUGF0dGVyblRocm91Z2hDYWNoZSgpIHtcbiAgICAgICAgY29uc3QgcHJpbWFyeVByZWZpeCA9IHRoaXMucHJpbWFyeVByZWZpeCgpO1xuICAgICAgICBjb25zdCBwcmltYXJ5U3VmZml4ID0gdGhpcy5wcmltYXJ5U3VmZml4KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2FjaGVkUHJpbWFyeVByZWZpeCA9PT0gcHJpbWFyeVByZWZpeCAmJiB0aGlzLmNhY2hlZFByaW1hcnlTdWZmaXggPT09IHByaW1hcnlTdWZmaXgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlZFByaW1hcnlUaW1lUGF0dGVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FjaGVkUHJpbWFyeVRpbWVQYXR0ZXJuID0gcHJpbWFyeVRpbWVQYXR0ZXJuKFxuICAgICAgICAgICAgdGhpcy5wcmltYXJ5UGF0dGVybkxlZnRCb3VuZGFyeSgpLFxuICAgICAgICAgICAgcHJpbWFyeVByZWZpeCxcbiAgICAgICAgICAgIHByaW1hcnlTdWZmaXgsXG4gICAgICAgICAgICB0aGlzLnBhdHRlcm5GbGFncygpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2FjaGVkUHJpbWFyeVByZWZpeCA9IHByaW1hcnlQcmVmaXg7XG4gICAgICAgIHRoaXMuY2FjaGVkUHJpbWFyeVN1ZmZpeCA9IHByaW1hcnlTdWZmaXg7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlZFByaW1hcnlUaW1lUGF0dGVybjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhY2hlZEZvbGxvd2luZ1BoYXNlID0gbnVsbDtcbiAgICBwcml2YXRlIGNhY2hlZEZvbGxvd2luZ1N1ZmZpeCA9IG51bGw7XG4gICAgcHJpdmF0ZSBjYWNoZWRGb2xsb3dpbmdUaW1lUGF0dGVuID0gbnVsbDtcblxuICAgIGdldEZvbGxvd2luZ1RpbWVQYXR0ZXJuVGhyb3VnaENhY2hlKCkge1xuICAgICAgICBjb25zdCBmb2xsb3dpbmdQaGFzZSA9IHRoaXMuZm9sbG93aW5nUGhhc2UoKTtcbiAgICAgICAgY29uc3QgZm9sbG93aW5nU3VmZml4ID0gdGhpcy5mb2xsb3dpbmdTdWZmaXgoKTtcblxuICAgICAgICBpZiAodGhpcy5jYWNoZWRGb2xsb3dpbmdQaGFzZSA9PT0gZm9sbG93aW5nUGhhc2UgJiYgdGhpcy5jYWNoZWRGb2xsb3dpbmdTdWZmaXggPT09IGZvbGxvd2luZ1N1ZmZpeCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkRm9sbG93aW5nVGltZVBhdHRlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FjaGVkRm9sbG93aW5nVGltZVBhdHRlbiA9IGZvbGxvd2luZ1RpbWVQYXR0ZW4oZm9sbG93aW5nUGhhc2UsIGZvbGxvd2luZ1N1ZmZpeCk7XG4gICAgICAgIHRoaXMuY2FjaGVkRm9sbG93aW5nUGhhc2UgPSBmb2xsb3dpbmdQaGFzZTtcbiAgICAgICAgdGhpcy5jYWNoZWRGb2xsb3dpbmdTdWZmaXggPSBmb2xsb3dpbmdTdWZmaXg7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlZEZvbGxvd2luZ1RpbWVQYXR0ZW47XG4gICAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNpbmdDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uL2Nocm9ub1wiO1xuaW1wb3J0IHsgUGFyc2luZ0NvbXBvbmVudHMsIFBhcnNpbmdSZXN1bHQgfSBmcm9tIFwiLi4vLi4vLi4vcmVzdWx0c1wiO1xuaW1wb3J0IHsgTWVyaWRpZW0gfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IEFic3RyYWN0VGltZUV4cHJlc3Npb25QYXJzZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhcnNlcnMvQWJzdHJhY3RUaW1lRXhwcmVzc2lvblBhcnNlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFTlRpbWVFeHByZXNzaW9uUGFyc2VyIGV4dGVuZHMgQWJzdHJhY3RUaW1lRXhwcmVzc2lvblBhcnNlciB7XG4gICAgY29uc3RydWN0b3Ioc3RyaWN0TW9kZSkge1xuICAgICAgICBzdXBlcihzdHJpY3RNb2RlKTtcbiAgICB9XG5cbiAgICBmb2xsb3dpbmdQaGFzZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gXCJcXFxccyooPzpcXFxcLXxcXFxcXHUyMDEzfFxcXFx+fFxcXFxcdTMwMUN8dG98dW50aWx8dGhyb3VnaHx0aWxsfFxcXFw/KVxcXFxzKlwiO1xuICAgIH1cblxuICAgIHByaW1hcnlQcmVmaXgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwiKD86KD86YXR8ZnJvbSlcXFxccyopPz9cIjtcbiAgICB9XG5cbiAgICBwcmltYXJ5U3VmZml4KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcIig/OlxcXFxzKig/Om9cXFxcVypjbG9ja3xhdFxcXFxzKm5pZ2h0fGluXFxcXHMqdGhlXFxcXHMqKD86bW9ybmluZ3xhZnRlcm5vb24pKSk/KD8hLykoPz1cXFxcV3wkKVwiO1xuICAgIH1cblxuICAgIGV4dHJhY3RQcmltYXJ5VGltZUNvbXBvbmVudHMoY29udGV4dDogUGFyc2luZ0NvbnRleHQsIG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5KTogbnVsbCB8IFBhcnNpbmdDb21wb25lbnRzIHtcbiAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IHN1cGVyLmV4dHJhY3RQcmltYXJ5VGltZUNvbXBvbmVudHMoY29udGV4dCwgbWF0Y2gpO1xuICAgICAgICBpZiAoIWNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hdGNoWzBdLmVuZHNXaXRoKFwibmlnaHRcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IGhvdXIgPSBjb21wb25lbnRzLmdldChcImhvdXJcIik7XG4gICAgICAgICAgICBpZiAoaG91ciA+PSA2ICYmIGhvdXIgPCAxMikge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMuYXNzaWduKFwiaG91clwiLCBjb21wb25lbnRzLmdldChcImhvdXJcIikgKyAxMik7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50cy5hc3NpZ24oXCJtZXJpZGllbVwiLCBNZXJpZGllbS5QTSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhvdXIgPCA2KSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50cy5hc3NpZ24oXCJtZXJpZGllbVwiLCBNZXJpZGllbS5BTSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2hbMF0uZW5kc1dpdGgoXCJhZnRlcm5vb25cIikpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMuYXNzaWduKFwibWVyaWRpZW1cIiwgTWVyaWRpZW0uUE0pO1xuICAgICAgICAgICAgY29uc3QgaG91ciA9IGNvbXBvbmVudHMuZ2V0KFwiaG91clwiKTtcbiAgICAgICAgICAgIGlmIChob3VyID49IDAgJiYgaG91ciA8PSA2KSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50cy5hc3NpZ24oXCJob3VyXCIsIGNvbXBvbmVudHMuZ2V0KFwiaG91clwiKSArIDEyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXRjaFswXS5lbmRzV2l0aChcIm1vcm5pbmdcIikpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMuYXNzaWduKFwibWVyaWRpZW1cIiwgTWVyaWRpZW0uQU0pO1xuICAgICAgICAgICAgY29uc3QgaG91ciA9IGNvbXBvbmVudHMuZ2V0KFwiaG91clwiKTtcbiAgICAgICAgICAgIGlmIChob3VyIDwgMTIpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzLmFzc2lnbihcImhvdXJcIiwgY29tcG9uZW50cy5nZXQoXCJob3VyXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb21wb25lbnRzLmFkZFRhZyhcInBhcnNlci9FTlRpbWVFeHByZXNzaW9uUGFyc2VyXCIpO1xuICAgIH1cblxuICAgIGV4dHJhY3RGb2xsb3dpbmdUaW1lQ29tcG9uZW50cyhcbiAgICAgICAgY29udGV4dDogUGFyc2luZ0NvbnRleHQsXG4gICAgICAgIG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5LFxuICAgICAgICByZXN1bHQ6IFBhcnNpbmdSZXN1bHRcbiAgICApOiBQYXJzaW5nQ29tcG9uZW50cyB8IG51bGwge1xuICAgICAgICBjb25zdCBmb2xsb3dpbmdDb21wb25lbnRzID0gc3VwZXIuZXh0cmFjdEZvbGxvd2luZ1RpbWVDb21wb25lbnRzKGNvbnRleHQsIG1hdGNoLCByZXN1bHQpO1xuICAgICAgICBpZiAoZm9sbG93aW5nQ29tcG9uZW50cykge1xuICAgICAgICAgICAgZm9sbG93aW5nQ29tcG9uZW50cy5hZGRUYWcoXCJwYXJzZXIvRU5UaW1lRXhwcmVzc2lvblBhcnNlclwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9sbG93aW5nQ29tcG9uZW50cztcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgT3BVbml0VHlwZSwgUVVuaXRUeXBlIH0gZnJvbSBcImRheWpzXCI7XG5pbXBvcnQgeyBQYXJzaW5nQ29tcG9uZW50cyB9IGZyb20gXCIuLi9yZXN1bHRzXCI7XG5cbmV4cG9ydCB0eXBlIFRpbWVVbml0cyA9IHsgW2MgaW4gT3BVbml0VHlwZSB8IFFVbml0VHlwZV0/OiBudW1iZXIgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VUaW1lVW5pdHModGltZVVuaXRzOiBUaW1lVW5pdHMpOiBUaW1lVW5pdHMge1xuICAgIGNvbnN0IHJldmVyc2VkID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGltZVVuaXRzKSB7XG4gICAgICAgIC8vIG5vaW5zcGVjdGlvbiBKU1VuZmlsdGVyZWRGb3JJbkxvb3BcbiAgICAgICAgcmV2ZXJzZWRba2V5XSA9IC10aW1lVW5pdHNba2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV2ZXJzZWQgYXMgVGltZVVuaXRzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkSW1wbGllZFRpbWVVbml0cyhjb21wb25lbnRzOiBQYXJzaW5nQ29tcG9uZW50cywgdGltZVVuaXRzOiBUaW1lVW5pdHMpOiBQYXJzaW5nQ29tcG9uZW50cyB7XG4gICAgY29uc3Qgb3V0cHV0ID0gY29tcG9uZW50cy5jbG9uZSgpO1xuXG4gICAgbGV0IGRhdGUgPSBjb21wb25lbnRzLmRheWpzKCk7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGltZVVuaXRzKSB7XG4gICAgICAgIC8vIG5vaW5zcGVjdGlvbiBKU1VuZmlsdGVyZWRGb3JJbkxvb3AsVHlwZVNjcmlwdFZhbGlkYXRlVHlwZXNcbiAgICAgICAgZGF0ZSA9IGRhdGUuYWRkKHRpbWVVbml0c1trZXldLCBrZXkgYXMgUVVuaXRUeXBlKTtcbiAgICB9XG5cbiAgICBpZiAoXCJkYXlcIiBpbiB0aW1lVW5pdHMgfHwgXCJkXCIgaW4gdGltZVVuaXRzIHx8IFwid2Vla1wiIGluIHRpbWVVbml0cyB8fCBcIm1vbnRoXCIgaW4gdGltZVVuaXRzIHx8IFwieWVhclwiIGluIHRpbWVVbml0cykge1xuICAgICAgICBvdXRwdXQuaW1wbHkoXCJkYXlcIiwgZGF0ZS5kYXRlKCkpO1xuICAgICAgICBvdXRwdXQuaW1wbHkoXCJtb250aFwiLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgb3V0cHV0LmltcGx5KFwieWVhclwiLCBkYXRlLnllYXIoKSk7XG4gICAgfVxuXG4gICAgaWYgKFwic2Vjb25kXCIgaW4gdGltZVVuaXRzIHx8IFwibWludXRlXCIgaW4gdGltZVVuaXRzIHx8IFwiaG91clwiIGluIHRpbWVVbml0cykge1xuICAgICAgICBvdXRwdXQuaW1wbHkoXCJzZWNvbmRcIiwgZGF0ZS5zZWNvbmQoKSk7XG4gICAgICAgIG91dHB1dC5pbXBseShcIm1pbnV0ZVwiLCBkYXRlLm1pbnV0ZSgpKTtcbiAgICAgICAgb3V0cHV0LmltcGx5KFwiaG91clwiLCBkYXRlLmhvdXIoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cbiIsICJpbXBvcnQgeyBQYXJzaW5nQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi9jaHJvbm9cIjtcbmltcG9ydCB7IHBhcnNlVGltZVVuaXRzLCBUSU1FX1VOSVRTX05PX0FCQlJfUEFUVEVSTiwgVElNRV9VTklUU19QQVRURVJOIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgUGFyc2luZ0NvbXBvbmVudHMgfSBmcm9tIFwiLi4vLi4vLi4vcmVzdWx0c1wiO1xuaW1wb3J0IHsgQWJzdHJhY3RQYXJzZXJXaXRoV29yZEJvdW5kYXJ5Q2hlY2tpbmcgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhcnNlcnMvQWJzdHJhY3RQYXJzZXJXaXRoV29yZEJvdW5kYXJ5XCI7XG5pbXBvcnQgeyByZXZlcnNlVGltZVVuaXRzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RpbWV1bml0c1wiO1xuXG5jb25zdCBQQVRURVJOID0gbmV3IFJlZ0V4cChgKCR7VElNRV9VTklUU19QQVRURVJOfSlcXFxcc3swLDV9KD86YWdvfGJlZm9yZXxlYXJsaWVyKSg/PVxcXFxXfCQpYCwgXCJpXCIpO1xuY29uc3QgU1RSSUNUX1BBVFRFUk4gPSBuZXcgUmVnRXhwKGAoJHtUSU1FX1VOSVRTX05PX0FCQlJfUEFUVEVSTn0pXFxcXHN7MCw1fSg/OmFnb3xiZWZvcmV8ZWFybGllcikoPz1cXFxcV3wkKWAsIFwiaVwiKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRU5UaW1lVW5pdEFnb0Zvcm1hdFBhcnNlciBleHRlbmRzIEFic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeUNoZWNraW5nIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0cmljdE1vZGU6IGJvb2xlYW4pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBpbm5lclBhdHRlcm4oKTogUmVnRXhwIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyaWN0TW9kZSA/IFNUUklDVF9QQVRURVJOIDogUEFUVEVSTjtcbiAgICB9XG5cbiAgICBpbm5lckV4dHJhY3QoY29udGV4dDogUGFyc2luZ0NvbnRleHQsIG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5KSB7XG4gICAgICAgIGNvbnN0IHRpbWVVbml0cyA9IHBhcnNlVGltZVVuaXRzKG1hdGNoWzFdKTtcbiAgICAgICAgaWYgKCF0aW1lVW5pdHMpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG91dHB1dFRpbWVVbml0cyA9IHJldmVyc2VUaW1lVW5pdHModGltZVVuaXRzKTtcbiAgICAgICAgcmV0dXJuIFBhcnNpbmdDb21wb25lbnRzLmNyZWF0ZVJlbGF0aXZlRnJvbVJlZmVyZW5jZShjb250ZXh0LnJlZmVyZW5jZSwgb3V0cHV0VGltZVVuaXRzKTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2luZ0NvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vY2hyb25vXCI7XG5pbXBvcnQgeyBwYXJzZVRpbWVVbml0cywgVElNRV9VTklUU19OT19BQkJSX1BBVFRFUk4sIFRJTUVfVU5JVFNfUEFUVEVSTiB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IFBhcnNpbmdDb21wb25lbnRzIH0gZnJvbSBcIi4uLy4uLy4uL3Jlc3VsdHNcIjtcbmltcG9ydCB7IEFic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeUNoZWNraW5nIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYXJzZXJzL0Fic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeVwiO1xuXG5jb25zdCBQQVRURVJOID0gbmV3IFJlZ0V4cChcbiAgICBgKCR7VElNRV9VTklUU19QQVRURVJOfSlcXFxcc3swLDV9KD86bGF0ZXJ8YWZ0ZXJ8ZnJvbSBub3d8aGVuY2Vmb3J0aHxmb3J3YXJkfG91dClgICsgXCIoPz0oPzpcXFxcV3wkKSlcIixcbiAgICBcImlcIlxuKTtcblxuY29uc3QgU1RSSUNUX1BBVFRFUk4gPSBuZXcgUmVnRXhwKGAoJHtUSU1FX1VOSVRTX05PX0FCQlJfUEFUVEVSTn0pXFxcXHN7MCw1fShsYXRlcnxhZnRlcnxmcm9tIG5vdykoPz1cXFxcV3wkKWAsIFwiaVwiKTtcbmNvbnN0IEdST1VQX05VTV9USU1FVU5JVFMgPSAxO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFTlRpbWVVbml0TGF0ZXJGb3JtYXRQYXJzZXIgZXh0ZW5kcyBBYnN0cmFjdFBhcnNlcldpdGhXb3JkQm91bmRhcnlDaGVja2luZyB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzdHJpY3RNb2RlOiBib29sZWFuKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgaW5uZXJQYXR0ZXJuKCk6IFJlZ0V4cCB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0cmljdE1vZGUgPyBTVFJJQ1RfUEFUVEVSTiA6IFBBVFRFUk47XG4gICAgfVxuXG4gICAgaW5uZXJFeHRyYWN0KGNvbnRleHQ6IFBhcnNpbmdDb250ZXh0LCBtYXRjaDogUmVnRXhwTWF0Y2hBcnJheSkge1xuICAgICAgICBjb25zdCB0aW1lVW5pdHMgPSBwYXJzZVRpbWVVbml0cyhtYXRjaFtHUk9VUF9OVU1fVElNRVVOSVRTXSk7XG4gICAgICAgIGlmICghdGltZVVuaXRzKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUGFyc2luZ0NvbXBvbmVudHMuY3JlYXRlUmVsYXRpdmVGcm9tUmVmZXJlbmNlKGNvbnRleHQucmVmZXJlbmNlLCB0aW1lVW5pdHMpO1xuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzaW5nQ29udGV4dCwgUmVmaW5lciB9IGZyb20gXCIuLi9jaHJvbm9cIjtcbmltcG9ydCB7IFBhcnNpbmdSZXN1bHQgfSBmcm9tIFwiLi4vcmVzdWx0c1wiO1xuXG4vKipcbiAqIEEgc3BlY2lhbCB0eXBlIG9mIHtAbGluayBSZWZpbmVyfSB0byBmaWx0ZXIgdGhlIHJlc3VsdHNcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZpbHRlciBpbXBsZW1lbnRzIFJlZmluZXIge1xuICAgIGFic3RyYWN0IGlzVmFsaWQoY29udGV4dDogUGFyc2luZ0NvbnRleHQsIHJlc3VsdDogUGFyc2luZ1Jlc3VsdCk6IGJvb2xlYW47XG5cbiAgICByZWZpbmUoY29udGV4dDogUGFyc2luZ0NvbnRleHQsIHJlc3VsdHM6IFBhcnNpbmdSZXN1bHRbXSk6IFBhcnNpbmdSZXN1bHRbXSB7XG4gICAgICAgIHJldHVybiByZXN1bHRzLmZpbHRlcigocikgPT4gdGhpcy5pc1ZhbGlkKGNvbnRleHQsIHIpKTtcbiAgICB9XG59XG5cbi8qKlxuICogQSBzcGVjaWFsIHR5cGUgb2Yge0BsaW5rIFJlZmluZXJ9IHRvIG1lcmdlIGNvbnNlY3V0aXZlIHJlc3VsdHNcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1lcmdpbmdSZWZpbmVyIGltcGxlbWVudHMgUmVmaW5lciB7XG4gICAgYWJzdHJhY3Qgc2hvdWxkTWVyZ2VSZXN1bHRzKFxuICAgICAgICB0ZXh0QmV0d2Vlbjogc3RyaW5nLFxuICAgICAgICBjdXJyZW50UmVzdWx0OiBQYXJzaW5nUmVzdWx0LFxuICAgICAgICBuZXh0UmVzdWx0OiBQYXJzaW5nUmVzdWx0LFxuICAgICAgICBjb250ZXh0OiBQYXJzaW5nQ29udGV4dFxuICAgICk6IGJvb2xlYW47XG5cbiAgICBhYnN0cmFjdCBtZXJnZVJlc3VsdHMoXG4gICAgICAgIHRleHRCZXR3ZWVuOiBzdHJpbmcsXG4gICAgICAgIGN1cnJlbnRSZXN1bHQ6IFBhcnNpbmdSZXN1bHQsXG4gICAgICAgIG5leHRSZXN1bHQ6IFBhcnNpbmdSZXN1bHQsXG4gICAgICAgIGNvbnRleHQ6IFBhcnNpbmdDb250ZXh0XG4gICAgKTogUGFyc2luZ1Jlc3VsdDtcblxuICAgIHJlZmluZShjb250ZXh0OiBQYXJzaW5nQ29udGV4dCwgcmVzdWx0czogUGFyc2luZ1Jlc3VsdFtdKTogUGFyc2luZ1Jlc3VsdFtdIHtcbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXJnZWRSZXN1bHRzOiBQYXJzaW5nUmVzdWx0W10gPSBbXTtcbiAgICAgICAgbGV0IGN1clJlc3VsdCA9IHJlc3VsdHNbMF07XG4gICAgICAgIGxldCBuZXh0UmVzdWx0ID0gbnVsbDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG5leHRSZXN1bHQgPSByZXN1bHRzW2ldO1xuXG4gICAgICAgICAgICBjb25zdCB0ZXh0QmV0d2VlbiA9IGNvbnRleHQudGV4dC5zdWJzdHJpbmcoY3VyUmVzdWx0LmluZGV4ICsgY3VyUmVzdWx0LnRleHQubGVuZ3RoLCBuZXh0UmVzdWx0LmluZGV4KTtcbiAgICAgICAgICAgIGlmICghdGhpcy5zaG91bGRNZXJnZVJlc3VsdHModGV4dEJldHdlZW4sIGN1clJlc3VsdCwgbmV4dFJlc3VsdCwgY29udGV4dCkpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRSZXN1bHRzLnB1c2goY3VyUmVzdWx0KTtcbiAgICAgICAgICAgICAgICBjdXJSZXN1bHQgPSBuZXh0UmVzdWx0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0ID0gY3VyUmVzdWx0O1xuICAgICAgICAgICAgICAgIGNvbnN0IHJpZ2h0ID0gbmV4dFJlc3VsdDtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXJnZWRSZXN1bHQgPSB0aGlzLm1lcmdlUmVzdWx0cyh0ZXh0QmV0d2VlbiwgbGVmdCwgcmlnaHQsIGNvbnRleHQpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZGVidWcoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IG1lcmdlZCAke2xlZnR9IGFuZCAke3JpZ2h0fSBpbnRvICR7bWVyZ2VkUmVzdWx0fWApO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgY3VyUmVzdWx0ID0gbWVyZ2VkUmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1clJlc3VsdCAhPSBudWxsKSB7XG4gICAgICAgICAgICBtZXJnZWRSZXN1bHRzLnB1c2goY3VyUmVzdWx0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtZXJnZWRSZXN1bHRzO1xuICAgIH1cbn1cbiIsICIvKlxuICBcbiovXG5cbmltcG9ydCB7IFBhcnNpbmdSZXN1bHQgfSBmcm9tIFwiLi4vLi4vcmVzdWx0c1wiO1xuaW1wb3J0IHsgTWVyZ2luZ1JlZmluZXIgfSBmcm9tIFwiLi4vYWJzdHJhY3RSZWZpbmVyc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdE1lcmdlRGF0ZVJhbmdlUmVmaW5lciBleHRlbmRzIE1lcmdpbmdSZWZpbmVyIHtcbiAgICBhYnN0cmFjdCBwYXR0ZXJuQmV0d2VlbigpOiBSZWdFeHA7XG5cbiAgICBzaG91bGRNZXJnZVJlc3VsdHModGV4dEJldHdlZW4sIGN1cnJlbnRSZXN1bHQsIG5leHRSZXN1bHQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICFjdXJyZW50UmVzdWx0LmVuZCAmJiAhbmV4dFJlc3VsdC5lbmQgJiYgdGV4dEJldHdlZW4ubWF0Y2godGhpcy5wYXR0ZXJuQmV0d2VlbigpKSAhPSBudWxsO1xuICAgIH1cblxuICAgIG1lcmdlUmVzdWx0cyh0ZXh0QmV0d2VlbiwgZnJvbVJlc3VsdCwgdG9SZXN1bHQpOiBQYXJzaW5nUmVzdWx0IHtcbiAgICAgICAgaWYgKCFmcm9tUmVzdWx0LnN0YXJ0LmlzT25seVdlZWtkYXlDb21wb25lbnQoKSAmJiAhdG9SZXN1bHQuc3RhcnQuaXNPbmx5V2Vla2RheUNvbXBvbmVudCgpKSB7XG4gICAgICAgICAgICB0b1Jlc3VsdC5zdGFydC5nZXRDZXJ0YWluQ29tcG9uZW50cygpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZnJvbVJlc3VsdC5zdGFydC5pc0NlcnRhaW4oa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBmcm9tUmVzdWx0LnN0YXJ0LmltcGx5KGtleSwgdG9SZXN1bHQuc3RhcnQuZ2V0KGtleSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmcm9tUmVzdWx0LnN0YXJ0LmdldENlcnRhaW5Db21wb25lbnRzKCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0b1Jlc3VsdC5zdGFydC5pc0NlcnRhaW4oa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0b1Jlc3VsdC5zdGFydC5pbXBseShrZXksIGZyb21SZXN1bHQuc3RhcnQuZ2V0KGtleSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyb21SZXN1bHQuc3RhcnQuZGF0ZSgpLmdldFRpbWUoKSA+IHRvUmVzdWx0LnN0YXJ0LmRhdGUoKS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgIGxldCBmcm9tTW9tZW50ID0gZnJvbVJlc3VsdC5zdGFydC5kYXlqcygpO1xuICAgICAgICAgICAgbGV0IHRvTW9tZW50ID0gdG9SZXN1bHQuc3RhcnQuZGF5anMoKTtcbiAgICAgICAgICAgIGlmICh0b1Jlc3VsdC5zdGFydC5pc09ubHlXZWVrZGF5Q29tcG9uZW50KCkgJiYgdG9Nb21lbnQuYWRkKDcsIFwiZGF5c1wiKS5pc0FmdGVyKGZyb21Nb21lbnQpKSB7XG4gICAgICAgICAgICAgICAgdG9Nb21lbnQgPSB0b01vbWVudC5hZGQoNywgXCJkYXlzXCIpO1xuICAgICAgICAgICAgICAgIHRvUmVzdWx0LnN0YXJ0LmltcGx5KFwiZGF5XCIsIHRvTW9tZW50LmRhdGUoKSk7XG4gICAgICAgICAgICAgICAgdG9SZXN1bHQuc3RhcnQuaW1wbHkoXCJtb250aFwiLCB0b01vbWVudC5tb250aCgpICsgMSk7XG4gICAgICAgICAgICAgICAgdG9SZXN1bHQuc3RhcnQuaW1wbHkoXCJ5ZWFyXCIsIHRvTW9tZW50LnllYXIoKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZyb21SZXN1bHQuc3RhcnQuaXNPbmx5V2Vla2RheUNvbXBvbmVudCgpICYmIGZyb21Nb21lbnQuYWRkKC03LCBcImRheXNcIikuaXNCZWZvcmUodG9Nb21lbnQpKSB7XG4gICAgICAgICAgICAgICAgZnJvbU1vbWVudCA9IGZyb21Nb21lbnQuYWRkKC03LCBcImRheXNcIik7XG4gICAgICAgICAgICAgICAgZnJvbVJlc3VsdC5zdGFydC5pbXBseShcImRheVwiLCBmcm9tTW9tZW50LmRhdGUoKSk7XG4gICAgICAgICAgICAgICAgZnJvbVJlc3VsdC5zdGFydC5pbXBseShcIm1vbnRoXCIsIGZyb21Nb21lbnQubW9udGgoKSArIDEpO1xuICAgICAgICAgICAgICAgIGZyb21SZXN1bHQuc3RhcnQuaW1wbHkoXCJ5ZWFyXCIsIGZyb21Nb21lbnQueWVhcigpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG9SZXN1bHQuc3RhcnQuaXNEYXRlV2l0aFVua25vd25ZZWFyKCkgJiYgdG9Nb21lbnQuYWRkKDEsIFwieWVhcnNcIikuaXNBZnRlcihmcm9tTW9tZW50KSkge1xuICAgICAgICAgICAgICAgIHRvTW9tZW50ID0gdG9Nb21lbnQuYWRkKDEsIFwieWVhcnNcIik7XG4gICAgICAgICAgICAgICAgdG9SZXN1bHQuc3RhcnQuaW1wbHkoXCJ5ZWFyXCIsIHRvTW9tZW50LnllYXIoKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZyb21SZXN1bHQuc3RhcnQuaXNEYXRlV2l0aFVua25vd25ZZWFyKCkgJiYgZnJvbU1vbWVudC5hZGQoLTEsIFwieWVhcnNcIikuaXNCZWZvcmUodG9Nb21lbnQpKSB7XG4gICAgICAgICAgICAgICAgZnJvbU1vbWVudCA9IGZyb21Nb21lbnQuYWRkKC0xLCBcInllYXJzXCIpO1xuICAgICAgICAgICAgICAgIGZyb21SZXN1bHQuc3RhcnQuaW1wbHkoXCJ5ZWFyXCIsIGZyb21Nb21lbnQueWVhcigpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgW3RvUmVzdWx0LCBmcm9tUmVzdWx0XSA9IFtmcm9tUmVzdWx0LCB0b1Jlc3VsdF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXN1bHQgPSBmcm9tUmVzdWx0LmNsb25lKCk7XG4gICAgICAgIHJlc3VsdC5zdGFydCA9IGZyb21SZXN1bHQuc3RhcnQ7XG4gICAgICAgIHJlc3VsdC5lbmQgPSB0b1Jlc3VsdC5zdGFydDtcbiAgICAgICAgcmVzdWx0LmluZGV4ID0gTWF0aC5taW4oZnJvbVJlc3VsdC5pbmRleCwgdG9SZXN1bHQuaW5kZXgpO1xuICAgICAgICBpZiAoZnJvbVJlc3VsdC5pbmRleCA8IHRvUmVzdWx0LmluZGV4KSB7XG4gICAgICAgICAgICByZXN1bHQudGV4dCA9IGZyb21SZXN1bHQudGV4dCArIHRleHRCZXR3ZWVuICsgdG9SZXN1bHQudGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC50ZXh0ID0gdG9SZXN1bHQudGV4dCArIHRleHRCZXR3ZWVuICsgZnJvbVJlc3VsdC50ZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iLCAiLypcbiAgXG4qL1xuXG5pbXBvcnQgQWJzdHJhY3RNZXJnZURhdGVSYW5nZVJlZmluZXIgZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9yZWZpbmVycy9BYnN0cmFjdE1lcmdlRGF0ZVJhbmdlUmVmaW5lclwiO1xuXG4vKipcbiAqIE1lcmdpbmcgYmVmb3JlIGFuZCBhZnRlciByZXN1bHRzIChzZWUuIEFic3RyYWN0TWVyZ2VEYXRlUmFuZ2VSZWZpbmVyKVxuICogVGhpcyBpbXBsZW1lbnRhdGlvbiBzaG91bGQgcHJvdmlkZSBFbmdsaXNoIGNvbm5lY3RpbmcgcGhhc2VzXG4gKiAtIDIwMjAtMDItMTMgW3RvXSAyMDIwLTAyLTEzXG4gKiAtIFdlZG5lc2RheSBbLV0gRnJpZGF5XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVOTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyIGV4dGVuZHMgQWJzdHJhY3RNZXJnZURhdGVSYW5nZVJlZmluZXIge1xuICAgIHBhdHRlcm5CZXR3ZWVuKCk6IFJlZ0V4cCB7XG4gICAgICAgIHJldHVybiAvXlxccyoodG98LXxcdTIwMTN8dW50aWx8dGhyb3VnaHx0aWxsKVxccyokL2k7XG4gICAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNpbmdDb21wb25lbnRzLCBQYXJzaW5nUmVzdWx0IH0gZnJvbSBcIi4uL3Jlc3VsdHNcIjtcbmltcG9ydCB7IE1lcmlkaWVtIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgeyBhc3NpZ25TaW1pbGFyRGF0ZSwgaW1wbHlTaW1pbGFyRGF0ZSB9IGZyb20gXCIuLi91dGlscy9kYXlqc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VEYXRlVGltZVJlc3VsdChkYXRlUmVzdWx0OiBQYXJzaW5nUmVzdWx0LCB0aW1lUmVzdWx0OiBQYXJzaW5nUmVzdWx0KTogUGFyc2luZ1Jlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0ID0gZGF0ZVJlc3VsdC5jbG9uZSgpO1xuICAgIGNvbnN0IGJlZ2luRGF0ZSA9IGRhdGVSZXN1bHQuc3RhcnQ7XG4gICAgY29uc3QgYmVnaW5UaW1lID0gdGltZVJlc3VsdC5zdGFydDtcblxuICAgIHJlc3VsdC5zdGFydCA9IG1lcmdlRGF0ZVRpbWVDb21wb25lbnQoYmVnaW5EYXRlLCBiZWdpblRpbWUpO1xuICAgIGlmIChkYXRlUmVzdWx0LmVuZCAhPSBudWxsIHx8IHRpbWVSZXN1bHQuZW5kICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgZW5kRGF0ZSA9IGRhdGVSZXN1bHQuZW5kID09IG51bGwgPyBkYXRlUmVzdWx0LnN0YXJ0IDogZGF0ZVJlc3VsdC5lbmQ7XG4gICAgICAgIGNvbnN0IGVuZFRpbWUgPSB0aW1lUmVzdWx0LmVuZCA9PSBudWxsID8gdGltZVJlc3VsdC5zdGFydCA6IHRpbWVSZXN1bHQuZW5kO1xuICAgICAgICBjb25zdCBlbmREYXRlVGltZSA9IG1lcmdlRGF0ZVRpbWVDb21wb25lbnQoZW5kRGF0ZSwgZW5kVGltZSk7XG5cbiAgICAgICAgaWYgKGRhdGVSZXN1bHQuZW5kID09IG51bGwgJiYgZW5kRGF0ZVRpbWUuZGF0ZSgpLmdldFRpbWUoKSA8IHJlc3VsdC5zdGFydC5kYXRlKCkuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICAvLyBGb3IgZXhhbXBsZSwgIFwiVHVlc2RheSA5cG0gLSAxYW1cIiB0aGUgZW5kaW5nIHNob3VsZCBhY3R1YWxseSBiZSAxYW0gb24gdGhlIG5leHQgZGF5LlxuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byBhZGQgdG8gZW5kaW5nIGJ5IGFub3RoZXIgZGF5LlxuICAgICAgICAgICAgY29uc3QgbmV4dERheUpzID0gZW5kRGF0ZVRpbWUuZGF5anMoKS5hZGQoMSwgXCJkYXlcIik7XG4gICAgICAgICAgICBpZiAoZW5kRGF0ZVRpbWUuaXNDZXJ0YWluKFwiZGF5XCIpKSB7XG4gICAgICAgICAgICAgICAgYXNzaWduU2ltaWxhckRhdGUoZW5kRGF0ZVRpbWUsIG5leHREYXlKcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGltcGx5U2ltaWxhckRhdGUoZW5kRGF0ZVRpbWUsIG5leHREYXlKcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuZW5kID0gZW5kRGF0ZVRpbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGF0ZVRpbWVDb21wb25lbnQoXG4gICAgZGF0ZUNvbXBvbmVudDogUGFyc2luZ0NvbXBvbmVudHMsXG4gICAgdGltZUNvbXBvbmVudDogUGFyc2luZ0NvbXBvbmVudHNcbik6IFBhcnNpbmdDb21wb25lbnRzIHtcbiAgICBjb25zdCBkYXRlVGltZUNvbXBvbmVudCA9IGRhdGVDb21wb25lbnQuY2xvbmUoKTtcblxuICAgIGlmICh0aW1lQ29tcG9uZW50LmlzQ2VydGFpbihcImhvdXJcIikpIHtcbiAgICAgICAgZGF0ZVRpbWVDb21wb25lbnQuYXNzaWduKFwiaG91clwiLCB0aW1lQ29tcG9uZW50LmdldChcImhvdXJcIikpO1xuICAgICAgICBkYXRlVGltZUNvbXBvbmVudC5hc3NpZ24oXCJtaW51dGVcIiwgdGltZUNvbXBvbmVudC5nZXQoXCJtaW51dGVcIikpO1xuXG4gICAgICAgIGlmICh0aW1lQ29tcG9uZW50LmlzQ2VydGFpbihcInNlY29uZFwiKSkge1xuICAgICAgICAgICAgZGF0ZVRpbWVDb21wb25lbnQuYXNzaWduKFwic2Vjb25kXCIsIHRpbWVDb21wb25lbnQuZ2V0KFwic2Vjb25kXCIpKTtcblxuICAgICAgICAgICAgaWYgKHRpbWVDb21wb25lbnQuaXNDZXJ0YWluKFwibWlsbGlzZWNvbmRcIikpIHtcbiAgICAgICAgICAgICAgICBkYXRlVGltZUNvbXBvbmVudC5hc3NpZ24oXCJtaWxsaXNlY29uZFwiLCB0aW1lQ29tcG9uZW50LmdldChcIm1pbGxpc2Vjb25kXCIpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0ZVRpbWVDb21wb25lbnQuaW1wbHkoXCJtaWxsaXNlY29uZFwiLCB0aW1lQ29tcG9uZW50LmdldChcIm1pbGxpc2Vjb25kXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRhdGVUaW1lQ29tcG9uZW50LmltcGx5KFwic2Vjb25kXCIsIHRpbWVDb21wb25lbnQuZ2V0KFwic2Vjb25kXCIpKTtcbiAgICAgICAgICAgIGRhdGVUaW1lQ29tcG9uZW50LmltcGx5KFwibWlsbGlzZWNvbmRcIiwgdGltZUNvbXBvbmVudC5nZXQoXCJtaWxsaXNlY29uZFwiKSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBkYXRlVGltZUNvbXBvbmVudC5pbXBseShcImhvdXJcIiwgdGltZUNvbXBvbmVudC5nZXQoXCJob3VyXCIpKTtcbiAgICAgICAgZGF0ZVRpbWVDb21wb25lbnQuaW1wbHkoXCJtaW51dGVcIiwgdGltZUNvbXBvbmVudC5nZXQoXCJtaW51dGVcIikpO1xuICAgICAgICBkYXRlVGltZUNvbXBvbmVudC5pbXBseShcInNlY29uZFwiLCB0aW1lQ29tcG9uZW50LmdldChcInNlY29uZFwiKSk7XG4gICAgICAgIGRhdGVUaW1lQ29tcG9uZW50LmltcGx5KFwibWlsbGlzZWNvbmRcIiwgdGltZUNvbXBvbmVudC5nZXQoXCJtaWxsaXNlY29uZFwiKSk7XG4gICAgfVxuXG4gICAgaWYgKHRpbWVDb21wb25lbnQuaXNDZXJ0YWluKFwidGltZXpvbmVPZmZzZXRcIikpIHtcbiAgICAgICAgZGF0ZVRpbWVDb21wb25lbnQuYXNzaWduKFwidGltZXpvbmVPZmZzZXRcIiwgdGltZUNvbXBvbmVudC5nZXQoXCJ0aW1lem9uZU9mZnNldFwiKSk7XG4gICAgfVxuXG4gICAgaWYgKHRpbWVDb21wb25lbnQuaXNDZXJ0YWluKFwibWVyaWRpZW1cIikpIHtcbiAgICAgICAgZGF0ZVRpbWVDb21wb25lbnQuYXNzaWduKFwibWVyaWRpZW1cIiwgdGltZUNvbXBvbmVudC5nZXQoXCJtZXJpZGllbVwiKSk7XG4gICAgfSBlbHNlIGlmICh0aW1lQ29tcG9uZW50LmdldChcIm1lcmlkaWVtXCIpICE9IG51bGwgJiYgZGF0ZVRpbWVDb21wb25lbnQuZ2V0KFwibWVyaWRpZW1cIikgPT0gbnVsbCkge1xuICAgICAgICBkYXRlVGltZUNvbXBvbmVudC5pbXBseShcIm1lcmlkaWVtXCIsIHRpbWVDb21wb25lbnQuZ2V0KFwibWVyaWRpZW1cIikpO1xuICAgIH1cblxuICAgIGlmIChkYXRlVGltZUNvbXBvbmVudC5nZXQoXCJtZXJpZGllbVwiKSA9PSBNZXJpZGllbS5QTSAmJiBkYXRlVGltZUNvbXBvbmVudC5nZXQoXCJob3VyXCIpIDwgMTIpIHtcbiAgICAgICAgaWYgKHRpbWVDb21wb25lbnQuaXNDZXJ0YWluKFwiaG91clwiKSkge1xuICAgICAgICAgICAgZGF0ZVRpbWVDb21wb25lbnQuYXNzaWduKFwiaG91clwiLCBkYXRlVGltZUNvbXBvbmVudC5nZXQoXCJob3VyXCIpICsgMTIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0ZVRpbWVDb21wb25lbnQuaW1wbHkoXCJob3VyXCIsIGRhdGVUaW1lQ29tcG9uZW50LmdldChcImhvdXJcIikgKyAxMik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkYXRlVGltZUNvbXBvbmVudC5hZGRUYWdzKGRhdGVDb21wb25lbnQudGFncygpKTtcbiAgICBkYXRlVGltZUNvbXBvbmVudC5hZGRUYWdzKHRpbWVDb21wb25lbnQudGFncygpKTtcbiAgICByZXR1cm4gZGF0ZVRpbWVDb21wb25lbnQ7XG59XG4iLCAiLypcblxuKi9cblxuaW1wb3J0IHsgTWVyZ2luZ1JlZmluZXIgfSBmcm9tIFwiLi4vYWJzdHJhY3RSZWZpbmVyc1wiO1xuaW1wb3J0IHsgUGFyc2luZ1Jlc3VsdCB9IGZyb20gXCIuLi8uLi9yZXN1bHRzXCI7XG5pbXBvcnQgeyBtZXJnZURhdGVUaW1lUmVzdWx0IH0gZnJvbSBcIi4uLy4uL2NhbGN1bGF0aW9uL21lcmdpbmdDYWxjdWxhdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdE1lcmdlRGF0ZVRpbWVSZWZpbmVyIGV4dGVuZHMgTWVyZ2luZ1JlZmluZXIge1xuICAgIGFic3RyYWN0IHBhdHRlcm5CZXR3ZWVuKCk6IFJlZ0V4cDtcblxuICAgIHNob3VsZE1lcmdlUmVzdWx0cyh0ZXh0QmV0d2Vlbjogc3RyaW5nLCBjdXJyZW50UmVzdWx0OiBQYXJzaW5nUmVzdWx0LCBuZXh0UmVzdWx0OiBQYXJzaW5nUmVzdWx0KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAoKGN1cnJlbnRSZXN1bHQuc3RhcnQuaXNPbmx5RGF0ZSgpICYmIG5leHRSZXN1bHQuc3RhcnQuaXNPbmx5VGltZSgpKSB8fFxuICAgICAgICAgICAgICAgIChuZXh0UmVzdWx0LnN0YXJ0LmlzT25seURhdGUoKSAmJiBjdXJyZW50UmVzdWx0LnN0YXJ0LmlzT25seVRpbWUoKSkpICYmXG4gICAgICAgICAgICB0ZXh0QmV0d2Vlbi5tYXRjaCh0aGlzLnBhdHRlcm5CZXR3ZWVuKCkpICE9IG51bGxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBtZXJnZVJlc3VsdHModGV4dEJldHdlZW46IHN0cmluZywgY3VycmVudFJlc3VsdDogUGFyc2luZ1Jlc3VsdCwgbmV4dFJlc3VsdDogUGFyc2luZ1Jlc3VsdCk6IFBhcnNpbmdSZXN1bHQge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBjdXJyZW50UmVzdWx0LnN0YXJ0LmlzT25seURhdGUoKVxuICAgICAgICAgICAgPyBtZXJnZURhdGVUaW1lUmVzdWx0KGN1cnJlbnRSZXN1bHQsIG5leHRSZXN1bHQpXG4gICAgICAgICAgICA6IG1lcmdlRGF0ZVRpbWVSZXN1bHQobmV4dFJlc3VsdCwgY3VycmVudFJlc3VsdCk7XG5cbiAgICAgICAgcmVzdWx0LmluZGV4ID0gY3VycmVudFJlc3VsdC5pbmRleDtcbiAgICAgICAgcmVzdWx0LnRleHQgPSBjdXJyZW50UmVzdWx0LnRleHQgKyB0ZXh0QmV0d2VlbiArIG5leHRSZXN1bHQudGV4dDtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iLCAiaW1wb3J0IEFic3RyYWN0TWVyZ2VEYXRlVGltZVJlZmluZXIgZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9yZWZpbmVycy9BYnN0cmFjdE1lcmdlRGF0ZVRpbWVSZWZpbmVyXCI7XG5cbi8qKlxuICogTWVyZ2luZyBkYXRlLW9ubHkgcmVzdWx0IGFuZCB0aW1lLW9ubHkgcmVzdWx0IChzZWUuIEFic3RyYWN0TWVyZ2VEYXRlVGltZVJlZmluZXIpLlxuICogVGhpcyBpbXBsZW1lbnRhdGlvbiBzaG91bGQgcHJvdmlkZSBFbmdsaXNoIGNvbm5lY3RpbmcgcGhhc2VzXG4gKiAtIDIwMjAtMDItMTMgW2F0XSA2cG1cbiAqIC0gVG9tb3Jyb3cgW2FmdGVyXSA3YW1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRU5NZXJnZURhdGVUaW1lUmVmaW5lciBleHRlbmRzIEFic3RyYWN0TWVyZ2VEYXRlVGltZVJlZmluZXIge1xuICAgIHBhdHRlcm5CZXR3ZWVuKCk6IFJlZ0V4cCB7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiXlxcXFxzKihUfGF0fGFmdGVyfGJlZm9yZXxvbnxvZnwsfC18XFxcXC58XHUyMjE5fDopP1xcXFxzKiRcIik7XG4gICAgfVxufVxuIiwgIi8vIE1hcCBBQkJSIC0+IE9mZnNldCBpbiBtaW51dGVcbmltcG9ydCB7IFBhcnNpbmdDb250ZXh0LCBSZWZpbmVyIH0gZnJvbSBcIi4uLy4uL2Nocm9ub1wiO1xuaW1wb3J0IHsgVGltZXpvbmVBYmJyTWFwIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBQYXJzaW5nUmVzdWx0IH0gZnJvbSBcIi4uLy4uL3Jlc3VsdHNcIjtcbmltcG9ydCB7IHRvVGltZXpvbmVPZmZzZXQgfSBmcm9tIFwiLi4vLi4vdGltZXpvbmVcIjtcblxuY29uc3QgVElNRVpPTkVfTkFNRV9QQVRURVJOID0gbmV3IFJlZ0V4cChcIl5cXFxccyosP1xcXFxzKlxcXFwoPyhbQS1aXXsyLDR9KVxcXFwpPyg/PVxcXFxXfCQpXCIsIFwiaVwiKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXh0cmFjdFRpbWV6b25lQWJiclJlZmluZXIgaW1wbGVtZW50cyBSZWZpbmVyIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHRpbWV6b25lT3ZlcnJpZGVzPzogVGltZXpvbmVBYmJyTWFwKSB7fVxuXG4gICAgcmVmaW5lKGNvbnRleHQ6IFBhcnNpbmdDb250ZXh0LCByZXN1bHRzOiBQYXJzaW5nUmVzdWx0W10pOiBQYXJzaW5nUmVzdWx0W10ge1xuICAgICAgICBjb25zdCB0aW1lem9uZU92ZXJyaWRlcyA9IGNvbnRleHQub3B0aW9uLnRpbWV6b25lcyA/PyB7fTtcblxuICAgICAgICByZXN1bHRzLmZvckVhY2goKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3VmZml4ID0gY29udGV4dC50ZXh0LnN1YnN0cmluZyhyZXN1bHQuaW5kZXggKyByZXN1bHQudGV4dC5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBUSU1FWk9ORV9OQU1FX1BBVFRFUk4uZXhlYyhzdWZmaXgpO1xuICAgICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgdGltZXpvbmVBYmJyID0gbWF0Y2hbMV0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IHJlZkRhdGUgPSByZXN1bHQuc3RhcnQuZGF0ZSgpID8/IHJlc3VsdC5yZWZEYXRlID8/IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBjb25zdCB0ek92ZXJyaWRlcyA9IHsgLi4udGhpcy50aW1lem9uZU92ZXJyaWRlcywgLi4udGltZXpvbmVPdmVycmlkZXMgfTtcbiAgICAgICAgICAgIGNvbnN0IGV4dHJhY3RlZFRpbWV6b25lT2Zmc2V0ID0gdG9UaW1lem9uZU9mZnNldCh0aW1lem9uZUFiYnIsIHJlZkRhdGUsIHR6T3ZlcnJpZGVzKTtcbiAgICAgICAgICAgIGlmIChleHRyYWN0ZWRUaW1lem9uZU9mZnNldCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGV4dC5kZWJ1ZygoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBFeHRyYWN0aW5nIHRpbWV6b25lOiAnJHt0aW1lem9uZUFiYnJ9JyBpbnRvOiAke2V4dHJhY3RlZFRpbWV6b25lT2Zmc2V0fSBmb3I6ICR7cmVzdWx0LnN0YXJ0fWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lem9uZU9mZnNldCA9IHJlc3VsdC5zdGFydC5nZXQoXCJ0aW1lem9uZU9mZnNldFwiKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50VGltZXpvbmVPZmZzZXQgIT09IG51bGwgJiYgZXh0cmFjdGVkVGltZXpvbmVPZmZzZXQgIT0gY3VycmVudFRpbWV6b25lT2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgbWF5IGFscmVhZHkgaGF2ZSBleHRyYWN0ZWQgdGhlIHRpbWV6b25lIG9mZnNldCBlLmcuIFwiMTEgYW0gR01UKzA5MDAgKEpTVClcIlxuICAgICAgICAgICAgICAgIC8vIC0gaWYgdGhleSBhcmUgZXF1YWwsIHdlIGFsc28gd2FudCB0byB0YWtlIHRoZSBhYmJyZXZpYXRpb24gdGV4dCBpbnRvIHJlc3VsdFxuICAgICAgICAgICAgICAgIC8vIC0gaWYgdGhleSBhcmUgbm90IGVxdWFsLCB3ZSB0cnVzdCB0aGUgb2Zmc2V0IG1vcmVcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN0YXJ0LmlzQ2VydGFpbihcInRpbWV6b25lT2Zmc2V0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIG9mdGVuIGJlY2F1c2UgaXQncyByZWxhdGl2ZSB0aW1lIHdpdGggaW5mZXJyZWQgdGltZXpvbmUgKGUuZy4gaW4gMSBob3VyLCB0b21vcnJvdylcbiAgICAgICAgICAgICAgICAvLyBUaGVuLCB3ZSB3YW50IHRvIGRvdWJsZS1jaGVjayB0aGUgYWJiciBjYXNlIChlLmcuIFwiR0VUXCIgbm90IFwiZ2V0XCIpXG4gICAgICAgICAgICAgICAgaWYgKHRpbWV6b25lQWJiciAhPSBtYXRjaFsxXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVzdWx0LnN0YXJ0LmlzT25seURhdGUoKSkge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSB0aW1lIGlzIG5vdCBleHBsaWNpdGx5IG1lbnRpb25lZCxcbiAgICAgICAgICAgICAgICAvLyBUaGVuLCB3ZSBhbHNvIHdhbnQgdG8gZG91YmxlLWNoZWNrIHRoZSBhYmJyIGNhc2UgKGUuZy4gXCJHRVRcIiBub3QgXCJnZXRcIilcbiAgICAgICAgICAgICAgICBpZiAodGltZXpvbmVBYmJyICE9IG1hdGNoWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdC50ZXh0ICs9IG1hdGNoWzBdO1xuXG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5zdGFydC5pc0NlcnRhaW4oXCJ0aW1lem9uZU9mZnNldFwiKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oXCJ0aW1lem9uZU9mZnNldFwiLCBleHRyYWN0ZWRUaW1lem9uZU9mZnNldCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQuZW5kICE9IG51bGwgJiYgIXJlc3VsdC5lbmQuaXNDZXJ0YWluKFwidGltZXpvbmVPZmZzZXRcIikpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZW5kLmFzc2lnbihcInRpbWV6b25lT2Zmc2V0XCIsIGV4dHJhY3RlZFRpbWV6b25lT2Zmc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNpbmdDb250ZXh0LCBSZWZpbmVyIH0gZnJvbSBcIi4uLy4uL2Nocm9ub1wiO1xuaW1wb3J0IHsgUGFyc2luZ1Jlc3VsdCB9IGZyb20gXCIuLi8uLi9yZXN1bHRzXCI7XG5cbmNvbnN0IFRJTUVaT05FX09GRlNFVF9QQVRURVJOID0gbmV3IFJlZ0V4cChcIl5cXFxccyooPzpcXFxcKD8oPzpHTVR8VVRDKVxcXFxzPyk/KFsrLV0pKFxcXFxkezEsMn0pKD86Oj8oXFxcXGR7Mn0pKT9cXFxcKT9cIiwgXCJpXCIpO1xuY29uc3QgVElNRVpPTkVfT0ZGU0VUX1NJR05fR1JPVVAgPSAxO1xuY29uc3QgVElNRVpPTkVfT0ZGU0VUX0hPVVJfT0ZGU0VUX0dST1VQID0gMjtcbmNvbnN0IFRJTUVaT05FX09GRlNFVF9NSU5VVEVfT0ZGU0VUX0dST1VQID0gMztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXh0cmFjdFRpbWV6b25lT2Zmc2V0UmVmaW5lciBpbXBsZW1lbnRzIFJlZmluZXIge1xuICAgIHJlZmluZShjb250ZXh0OiBQYXJzaW5nQ29udGV4dCwgcmVzdWx0czogUGFyc2luZ1Jlc3VsdFtdKTogUGFyc2luZ1Jlc3VsdFtdIHtcbiAgICAgICAgcmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuaXNDZXJ0YWluKFwidGltZXpvbmVPZmZzZXRcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHN1ZmZpeCA9IGNvbnRleHQudGV4dC5zdWJzdHJpbmcocmVzdWx0LmluZGV4ICsgcmVzdWx0LnRleHQubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gVElNRVpPTkVfT0ZGU0VUX1BBVFRFUk4uZXhlYyhzdWZmaXgpO1xuICAgICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udGV4dC5kZWJ1ZygoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEV4dHJhY3RpbmcgdGltZXpvbmU6ICcke21hdGNoWzBdfScgaW50byA6ICR7cmVzdWx0fWApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGhvdXJPZmZzZXQgPSBwYXJzZUludChtYXRjaFtUSU1FWk9ORV9PRkZTRVRfSE9VUl9PRkZTRVRfR1JPVVBdKTtcbiAgICAgICAgICAgIGNvbnN0IG1pbnV0ZU9mZnNldCA9IHBhcnNlSW50KG1hdGNoW1RJTUVaT05FX09GRlNFVF9NSU5VVEVfT0ZGU0VUX0dST1VQXSB8fCBcIjBcIik7XG4gICAgICAgICAgICBsZXQgdGltZXpvbmVPZmZzZXQgPSBob3VyT2Zmc2V0ICogNjAgKyBtaW51dGVPZmZzZXQ7XG4gICAgICAgICAgICAvLyBObyB0aW1lem9uZXMgaGF2ZSBvZmZzZXRzIGdyZWF0ZXIgdGhhbiAxNCBob3Vycywgc28gZGlzcmVnYXJkIHRoaXMgbWF0Y2hcbiAgICAgICAgICAgIGlmICh0aW1lem9uZU9mZnNldCA+IDE0ICogNjApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWF0Y2hbVElNRVpPTkVfT0ZGU0VUX1NJR05fR1JPVVBdID09PSBcIi1cIikge1xuICAgICAgICAgICAgICAgIHRpbWV6b25lT2Zmc2V0ID0gLXRpbWV6b25lT2Zmc2V0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVzdWx0LmVuZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oXCJ0aW1lem9uZU9mZnNldFwiLCB0aW1lem9uZU9mZnNldCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oXCJ0aW1lem9uZU9mZnNldFwiLCB0aW1lem9uZU9mZnNldCk7XG4gICAgICAgICAgICByZXN1bHQudGV4dCArPSBtYXRjaFswXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxufVxuIiwgIi8qXG4gIFxuKi9cblxuaW1wb3J0IHsgUGFyc2luZ0NvbnRleHQsIFJlZmluZXIgfSBmcm9tIFwiLi4vLi4vY2hyb25vXCI7XG5pbXBvcnQgeyBQYXJzaW5nUmVzdWx0IH0gZnJvbSBcIi4uLy4uL3Jlc3VsdHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3ZlcmxhcFJlbW92YWxSZWZpbmVyIGltcGxlbWVudHMgUmVmaW5lciB7XG4gICAgcmVmaW5lKGNvbnRleHQ6IFBhcnNpbmdDb250ZXh0LCByZXN1bHRzOiBQYXJzaW5nUmVzdWx0W10pOiBQYXJzaW5nUmVzdWx0W10ge1xuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkUmVzdWx0cyA9IFtdO1xuICAgICAgICBsZXQgcHJldlJlc3VsdCA9IHJlc3VsdHNbMF07XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0c1tpXTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuaW5kZXggPj0gcHJldlJlc3VsdC5pbmRleCArIHByZXZSZXN1bHQudGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZFJlc3VsdHMucHVzaChwcmV2UmVzdWx0KTtcbiAgICAgICAgICAgICAgICBwcmV2UmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiBvdmVybGFwLCBjb21wYXJlIHRoZSBsZW5ndGggYW5kIGRpc2NhcmQgdGhlIHNob3J0ZXIgb25lXG4gICAgICAgICAgICBsZXQga2VwdCA9IG51bGw7XG4gICAgICAgICAgICBsZXQgcmVtb3ZlZCA9IG51bGw7XG4gICAgICAgICAgICBpZiAocmVzdWx0LnRleHQubGVuZ3RoID4gcHJldlJlc3VsdC50ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGtlcHQgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHByZXZSZXN1bHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGtlcHQgPSBwcmV2UmVzdWx0O1xuICAgICAgICAgICAgICAgIHJlbW92ZWQgPSByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250ZXh0LmRlYnVnKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IHJlbW92ZSAke3JlbW92ZWR9IGJ5ICR7a2VwdH1gKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcHJldlJlc3VsdCA9IGtlcHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgbGFzdCBvbmVcbiAgICAgICAgaWYgKHByZXZSZXN1bHQgIT0gbnVsbCkge1xuICAgICAgICAgICAgZmlsdGVyZWRSZXN1bHRzLnB1c2gocHJldlJlc3VsdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmlsdGVyZWRSZXN1bHRzO1xuICAgIH1cbn1cbiIsICIvKlxuICAgIEVuZm9yY2UgJ2ZvcndhcmREYXRlJyBvcHRpb24gdG8gb24gdGhlIHJlc3VsdHMuIFdoZW4gdGhlcmUgYXJlIG1pc3NpbmcgY29tcG9uZW50LFxuICAgIGUuZy4gXCJNYXJjaCAxMi0xMyAod2l0aG91dCB5ZWFyKVwiIG9yIFwiVGh1cnNkYXlcIiwgdGhlIHJlZmluZXIgd2lsbCB0cnkgdG8gYWRqdXN0IHRoZSByZXN1bHRcbiAgICBpbnRvIHRoZSBmdXR1cmUgaW5zdGVhZCBvZiB0aGUgcGFzdC5cbiovXG5cbmltcG9ydCB7IFBhcnNpbmdDb250ZXh0LCBSZWZpbmVyIH0gZnJvbSBcIi4uLy4uL2Nocm9ub1wiO1xuaW1wb3J0IHsgUGFyc2luZ1Jlc3VsdCB9IGZyb20gXCIuLi8uLi9yZXN1bHRzXCI7XG5pbXBvcnQgZGF5anMgZnJvbSBcImRheWpzXCI7XG5pbXBvcnQgeyBpbXBseVNpbWlsYXJEYXRlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2RheWpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcndhcmREYXRlUmVmaW5lciBpbXBsZW1lbnRzIFJlZmluZXIge1xuICAgIHJlZmluZShjb250ZXh0OiBQYXJzaW5nQ29udGV4dCwgcmVzdWx0czogUGFyc2luZ1Jlc3VsdFtdKTogUGFyc2luZ1Jlc3VsdFtdIHtcbiAgICAgICAgaWYgKCFjb250ZXh0Lm9wdGlvbi5mb3J3YXJkRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRzLmZvckVhY2goKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlZk1vbWVudCA9IGRheWpzKGNvbnRleHQucmVmRGF0ZSk7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuaXNPbmx5VGltZSgpICYmIHJlZk1vbWVudC5pc0FmdGVyKHJlc3VsdC5zdGFydC5kYXlqcygpKSkge1xuICAgICAgICAgICAgICAgIHJlZk1vbWVudCA9IHJlZk1vbWVudC5hZGQoMSwgXCJkYXlcIik7XG4gICAgICAgICAgICAgICAgaW1wbHlTaW1pbGFyRGF0ZShyZXN1bHQuc3RhcnQsIHJlZk1vbWVudCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5lbmQgJiYgcmVzdWx0LmVuZC5pc09ubHlUaW1lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1wbHlTaW1pbGFyRGF0ZShyZXN1bHQuZW5kLCByZWZNb21lbnQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN0YXJ0LmRheWpzKCkuaXNBZnRlcihyZXN1bHQuZW5kLmRheWpzKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZNb21lbnQgPSByZWZNb21lbnQuYWRkKDEsIFwiZGF5XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1wbHlTaW1pbGFyRGF0ZShyZXN1bHQuZW5kLCByZWZNb21lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRleHQuZGVidWcoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IGFkanVzdGVkICR7cmVzdWx0fSB0aW1lIHJlc3VsdCAoJHtyZXN1bHQuc3RhcnR9KWApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVzdWx0LnN0YXJ0LmlzT25seVdlZWtkYXlDb21wb25lbnQoKSAmJiByZWZNb21lbnQuaXNBZnRlcihyZXN1bHQuc3RhcnQuZGF5anMoKSkpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVmTW9tZW50LmRheSgpID49IHJlc3VsdC5zdGFydC5nZXQoXCJ3ZWVrZGF5XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZk1vbWVudCA9IHJlZk1vbWVudC5kYXkocmVzdWx0LnN0YXJ0LmdldChcIndlZWtkYXlcIikgKyA3KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWZNb21lbnQgPSByZWZNb21lbnQuZGF5KDxudW1iZXI+cmVzdWx0LnN0YXJ0LmdldChcIndlZWtkYXlcIikpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseShcImRheVwiLCByZWZNb21lbnQuZGF0ZSgpKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoXCJtb250aFwiLCByZWZNb21lbnQubW9udGgoKSArIDEpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseShcInllYXJcIiwgcmVmTW9tZW50LnllYXIoKSk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5kZWJ1ZygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0gYWRqdXN0ZWQgJHtyZXN1bHR9IHdlZWtkYXkgKCR7cmVzdWx0LnN0YXJ0fSlgKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZW5kICYmIHJlc3VsdC5lbmQuaXNPbmx5V2Vla2RheUNvbXBvbmVudCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFkanVzdCBkYXRlIHRvIHRoZSBjb21pbmcgd2Vla1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVmTW9tZW50LmRheSgpID4gcmVzdWx0LmVuZC5nZXQoXCJ3ZWVrZGF5XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZNb21lbnQgPSByZWZNb21lbnQuZGF5KHJlc3VsdC5lbmQuZ2V0KFwid2Vla2RheVwiKSArIDcpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gcmVmTW9tZW50LmRheSg8bnVtYmVyPnJlc3VsdC5lbmQuZ2V0KFwid2Vla2RheVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZW5kLmltcGx5KFwiZGF5XCIsIHJlZk1vbWVudC5kYXRlKCkpO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZW5kLmltcGx5KFwibW9udGhcIiwgcmVmTW9tZW50Lm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmVuZC5pbXBseShcInllYXJcIiwgcmVmTW9tZW50LnllYXIoKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZGVidWcoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSBhZGp1c3RlZCAke3Jlc3VsdH0gd2Vla2RheSAoJHtyZXN1bHQuZW5kfSlgKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJbiBjYXNlIHdoZXJlIHdlIGtub3cgdGhlIG1vbnRoLCBidXQgbm90IHdoaWNoIHllYXIgKGUuZy4gXCJpbiBEZWNlbWJlclwiLCBcIjI1dGggRGVjZW1iZXJcIiksXG4gICAgICAgICAgICAvLyB0cnkgbW92ZSB0byBhbm90aGVyIHllYXJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuaXNEYXRlV2l0aFVua25vd25ZZWFyKCkgJiYgcmVmTW9tZW50LmlzQWZ0ZXIocmVzdWx0LnN0YXJ0LmRheWpzKCkpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzICYmIHJlZk1vbWVudC5pc0FmdGVyKHJlc3VsdC5zdGFydC5kYXlqcygpKTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseShcInllYXJcIiwgcmVzdWx0LnN0YXJ0LmdldChcInllYXJcIikgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5kZWJ1ZygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IGFkanVzdGVkICR7cmVzdWx0fSB5ZWFyICgke3Jlc3VsdC5zdGFydH0pYCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZW5kICYmICFyZXN1bHQuZW5kLmlzQ2VydGFpbihcInllYXJcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5lbmQuaW1wbHkoXCJ5ZWFyXCIsIHJlc3VsdC5lbmQuZ2V0KFwieWVhclwiKSArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5kZWJ1ZygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSBhZGp1c3RlZCAke3Jlc3VsdH0gbW9udGggKCR7cmVzdWx0LnN0YXJ0fSlgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgRmlsdGVyIH0gZnJvbSBcIi4uL2Fic3RyYWN0UmVmaW5lcnNcIjtcbmltcG9ydCB7IFBhcnNpbmdSZXN1bHQgfSBmcm9tIFwiLi4vLi4vcmVzdWx0c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVbmxpa2VseUZvcm1hdEZpbHRlciBleHRlbmRzIEZpbHRlciB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzdHJpY3RNb2RlOiBib29sZWFuKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgaXNWYWxpZChjb250ZXh0LCByZXN1bHQ6IFBhcnNpbmdSZXN1bHQpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHJlc3VsdC50ZXh0LnJlcGxhY2UoXCIgXCIsIFwiXCIpLm1hdGNoKC9eXFxkKihcXC5cXGQqKT8kLykpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZGVidWcoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZW1vdmluZyB1bmxpa2VseSByZXN1bHQgJyR7cmVzdWx0LnRleHR9J2ApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmVzdWx0LnN0YXJ0LmlzVmFsaWREYXRlKCkpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZGVidWcoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZW1vdmluZyBpbnZhbGlkIHJlc3VsdDogJHtyZXN1bHR9ICgke3Jlc3VsdC5zdGFydH0pYCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdC5lbmQgJiYgIXJlc3VsdC5lbmQuaXNWYWxpZERhdGUoKSkge1xuICAgICAgICAgICAgY29udGV4dC5kZWJ1ZygoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFJlbW92aW5nIGludmFsaWQgcmVzdWx0OiAke3Jlc3VsdH0gKCR7cmVzdWx0LmVuZH0pYCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc3RyaWN0TW9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNTdHJpY3RNb2RlVmFsaWQoY29udGV4dCwgcmVzdWx0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNTdHJpY3RNb2RlVmFsaWQoY29udGV4dCwgcmVzdWx0OiBQYXJzaW5nUmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQuc3RhcnQuaXNPbmx5V2Vla2RheUNvbXBvbmVudCgpKSB7XG4gICAgICAgICAgICBjb250ZXh0LmRlYnVnKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgKFN0cmljdCkgUmVtb3Zpbmcgd2Vla2RheSBvbmx5IGNvbXBvbmVudDogJHtyZXN1bHR9ICgke3Jlc3VsdC5lbmR9KWApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHQuc3RhcnQuaXNPbmx5VGltZSgpICYmICghcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbihcImhvdXJcIikgfHwgIXJlc3VsdC5zdGFydC5pc0NlcnRhaW4oXCJtaW51dGVcIikpKSB7XG4gICAgICAgICAgICBjb250ZXh0LmRlYnVnKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgKFN0cmljdCkgUmVtb3ZpbmcgdW5jZXJ0YWluIHRpbWUgY29tcG9uZW50OiAke3Jlc3VsdH0gKCR7cmVzdWx0LmVuZH0pYCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNpbmdDb250ZXh0IH0gZnJvbSBcIi4uLy4uL2Nocm9ub1wiO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBBYnN0cmFjdFBhcnNlcldpdGhXb3JkQm91bmRhcnlDaGVja2luZyB9IGZyb20gXCIuL0Fic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeVwiO1xuXG4vLyBJU08gODYwMVxuLy8gaHR0cDovL3d3dy53My5vcmcvVFIvTk9URS1kYXRldGltZVxuLy8gLSBZWVlZLU1NLUREXG4vLyAtIFlZWVktTU0tRERUaGg6bW1UWkRcbi8vIC0gWVlZWS1NTS1ERFRoaDptbTpzc1RaRFxuLy8gLSBZWVlZLU1NLUREVGhoOm1tOnNzLnNUWkRcbi8vIC0gVFpEID0gKFogb3IgK2hoOm1tIG9yIC1oaDptbSlcblxuLy8gcHJldHRpZXItaWdub3JlXG5jb25zdCBQQVRURVJOID0gbmV3IFJlZ0V4cChcbiAgICBcIihbMC05XXs0fSlcXFxcLShbMC05XXsxLDJ9KVxcXFwtKFswLTldezEsMn0pXCIgK1xuICAgIFwiKD86VFwiICsgLy8uLlxuICAgICAgICBcIihbMC05XXsxLDJ9KTooWzAtOV17MSwyfSlcIiArIC8vIGhoOm1tXG4gICAgICAgIFwiKD86XCIgK1xuICAgICAgICAgICAgXCI6KFswLTldezEsMn0pKD86XFxcXC4oXFxcXGR7MSw0fSkpP1wiICtcbiAgICAgICAgXCIpP1wiICsgLy8gOnNzLnNcbiAgICAgICAgXCIoXCIgK1xuICAgICAgICAgICAgXCJafChbKy1dXFxcXGR7Mn0pOj8oXFxcXGR7Mn0pP1wiICtcbiAgICAgICAgXCIpP1wiICsgLy8gVFpEIChaIG9yIFx1MDBCMWhoOm1tIG9yIFx1MDBCMWhobW0gb3IgXHUwMEIxaGgpXG4gICAgXCIpP1wiICtcbiAgICBcIig/PVxcXFxXfCQpXCIsXG4gICAgXCJpXCJcbik7XG5cbmNvbnN0IFlFQVJfTlVNQkVSX0dST1VQID0gMTtcbmNvbnN0IE1PTlRIX05VTUJFUl9HUk9VUCA9IDI7XG5jb25zdCBEQVRFX05VTUJFUl9HUk9VUCA9IDM7XG5jb25zdCBIT1VSX05VTUJFUl9HUk9VUCA9IDQ7XG5jb25zdCBNSU5VVEVfTlVNQkVSX0dST1VQID0gNTtcbmNvbnN0IFNFQ09ORF9OVU1CRVJfR1JPVVAgPSA2O1xuY29uc3QgTUlMTElTRUNPTkRfTlVNQkVSX0dST1VQID0gNztcbmNvbnN0IFRaRF9HUk9VUCA9IDg7XG5jb25zdCBUWkRfSE9VUl9PRkZTRVRfR1JPVVAgPSA5O1xuY29uc3QgVFpEX01JTlVURV9PRkZTRVRfR1JPVVAgPSAxMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSVNPRm9ybWF0UGFyc2VyIGV4dGVuZHMgQWJzdHJhY3RQYXJzZXJXaXRoV29yZEJvdW5kYXJ5Q2hlY2tpbmcge1xuICAgIGlubmVyUGF0dGVybigpOiBSZWdFeHAge1xuICAgICAgICByZXR1cm4gUEFUVEVSTjtcbiAgICB9XG5cbiAgICBpbm5lckV4dHJhY3QoY29udGV4dDogUGFyc2luZ0NvbnRleHQsIG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5KSB7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBjb250ZXh0LmNyZWF0ZVBhcnNpbmdDb21wb25lbnRzKHtcbiAgICAgICAgICAgIFwieWVhclwiOiBwYXJzZUludChtYXRjaFtZRUFSX05VTUJFUl9HUk9VUF0pLFxuICAgICAgICAgICAgXCJtb250aFwiOiBwYXJzZUludChtYXRjaFtNT05USF9OVU1CRVJfR1JPVVBdKSxcbiAgICAgICAgICAgIFwiZGF5XCI6IHBhcnNlSW50KG1hdGNoW0RBVEVfTlVNQkVSX0dST1VQXSksXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobWF0Y2hbSE9VUl9OVU1CRVJfR1JPVVBdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMuYXNzaWduKFwiaG91clwiLCBwYXJzZUludChtYXRjaFtIT1VSX05VTUJFUl9HUk9VUF0pKTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMuYXNzaWduKFwibWludXRlXCIsIHBhcnNlSW50KG1hdGNoW01JTlVURV9OVU1CRVJfR1JPVVBdKSk7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFtTRUNPTkRfTlVNQkVSX0dST1VQXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50cy5hc3NpZ24oXCJzZWNvbmRcIiwgcGFyc2VJbnQobWF0Y2hbU0VDT05EX05VTUJFUl9HUk9VUF0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1hdGNoW01JTExJU0VDT05EX05VTUJFUl9HUk9VUF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMuYXNzaWduKFwibWlsbGlzZWNvbmRcIiwgcGFyc2VJbnQobWF0Y2hbTUlMTElTRUNPTkRfTlVNQkVSX0dST1VQXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hdGNoW1RaRF9HUk9VUF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBadWx1IHRpbWUgem9uZSAoWikgaXMgZXF1aXZhbGVudCB0byBVVENcbiAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hbVFpEX0hPVVJfT0ZGU0VUX0dST1VQXSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBob3VyT2Zmc2V0ID0gcGFyc2VJbnQobWF0Y2hbVFpEX0hPVVJfT0ZGU0VUX0dST1VQXSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtaW51dGVPZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hbVFpEX01JTlVURV9PRkZTRVRfR1JPVVBdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbnV0ZU9mZnNldCA9IHBhcnNlSW50KG1hdGNoW1RaRF9NSU5VVEVfT0ZGU0VUX0dST1VQXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gaG91ck9mZnNldCAqIDYwO1xuICAgICAgICAgICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0IC09IG1pbnV0ZU9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCArPSBtaW51dGVPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29tcG9uZW50cy5hc3NpZ24oXCJ0aW1lem9uZU9mZnNldFwiLCBvZmZzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wb25lbnRzLmFkZFRhZyhcInBhcnNlci9JU09Gb3JtYXRQYXJzZXJcIik7XG4gICAgfVxufVxuIiwgIi8qXG4gIFxuKi9cblxuaW1wb3J0IHsgTWVyZ2luZ1JlZmluZXIgfSBmcm9tIFwiLi4vYWJzdHJhY3RSZWZpbmVyc1wiO1xuaW1wb3J0IHsgUGFyc2luZ1Jlc3VsdCB9IGZyb20gXCIuLi8uLi9yZXN1bHRzXCI7XG5cbi8qKlxuICogTWVyZ2Ugd2Vla2RheSBjb21wb25lbnQgaW50byBtb3JlIGNvbXBsZXRlZCBkYXRhXG4gKiAtIFtTdW5kYXldIFsxMi83LzIwMTRdID0+IFtTdW5kYXkgMTIvNy8yMDE0XVxuICogLSBbVHVlc2RheV0sIFtKYW51YXJ5IDEzLCAyMDEyXSA9PiBbU3VuZGF5IDEyLzcvMjAxNF1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVyZ2VXZWVrZGF5Q29tcG9uZW50UmVmaW5lciBleHRlbmRzIE1lcmdpbmdSZWZpbmVyIHtcbiAgICBtZXJnZVJlc3VsdHModGV4dEJldHdlZW46IHN0cmluZywgY3VycmVudFJlc3VsdDogUGFyc2luZ1Jlc3VsdCwgbmV4dFJlc3VsdDogUGFyc2luZ1Jlc3VsdCk6IFBhcnNpbmdSZXN1bHQge1xuICAgICAgICBjb25zdCBuZXdSZXN1bHQgPSBuZXh0UmVzdWx0LmNsb25lKCk7XG4gICAgICAgIG5ld1Jlc3VsdC5pbmRleCA9IGN1cnJlbnRSZXN1bHQuaW5kZXg7XG4gICAgICAgIG5ld1Jlc3VsdC50ZXh0ID0gY3VycmVudFJlc3VsdC50ZXh0ICsgdGV4dEJldHdlZW4gKyBuZXdSZXN1bHQudGV4dDtcblxuICAgICAgICBuZXdSZXN1bHQuc3RhcnQuYXNzaWduKFwid2Vla2RheVwiLCBjdXJyZW50UmVzdWx0LnN0YXJ0LmdldChcIndlZWtkYXlcIikpO1xuICAgICAgICBpZiAobmV3UmVzdWx0LmVuZCkge1xuICAgICAgICAgICAgbmV3UmVzdWx0LmVuZC5hc3NpZ24oXCJ3ZWVrZGF5XCIsIGN1cnJlbnRSZXN1bHQuc3RhcnQuZ2V0KFwid2Vla2RheVwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3UmVzdWx0O1xuICAgIH1cblxuICAgIHNob3VsZE1lcmdlUmVzdWx0cyh0ZXh0QmV0d2Vlbjogc3RyaW5nLCBjdXJyZW50UmVzdWx0OiBQYXJzaW5nUmVzdWx0LCBuZXh0UmVzdWx0OiBQYXJzaW5nUmVzdWx0KTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHdlZWtkYXlUaGVuTm9ybWFsRGF0ZSA9XG4gICAgICAgICAgICBjdXJyZW50UmVzdWx0LnN0YXJ0LmlzT25seVdlZWtkYXlDb21wb25lbnQoKSAmJlxuICAgICAgICAgICAgIWN1cnJlbnRSZXN1bHQuc3RhcnQuaXNDZXJ0YWluKFwiaG91clwiKSAmJlxuICAgICAgICAgICAgbmV4dFJlc3VsdC5zdGFydC5pc0NlcnRhaW4oXCJkYXlcIik7XG4gICAgICAgIHJldHVybiB3ZWVrZGF5VGhlbk5vcm1hbERhdGUgJiYgdGV4dEJldHdlZW4ubWF0Y2goL14sP1xccyokLykgIT0gbnVsbDtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgUGFyc2VyLCBSZWZpbmVyIH0gZnJvbSBcIi4vY2hyb25vXCI7XG5cbmltcG9ydCBFeHRyYWN0VGltZXpvbmVBYmJyUmVmaW5lciBmcm9tIFwiLi9jb21tb24vcmVmaW5lcnMvRXh0cmFjdFRpbWV6b25lQWJiclJlZmluZXJcIjtcbmltcG9ydCBFeHRyYWN0VGltZXpvbmVPZmZzZXRSZWZpbmVyIGZyb20gXCIuL2NvbW1vbi9yZWZpbmVycy9FeHRyYWN0VGltZXpvbmVPZmZzZXRSZWZpbmVyXCI7XG5pbXBvcnQgT3ZlcmxhcFJlbW92YWxSZWZpbmVyIGZyb20gXCIuL2NvbW1vbi9yZWZpbmVycy9PdmVybGFwUmVtb3ZhbFJlZmluZXJcIjtcbmltcG9ydCBGb3J3YXJkRGF0ZVJlZmluZXIgZnJvbSBcIi4vY29tbW9uL3JlZmluZXJzL0ZvcndhcmREYXRlUmVmaW5lclwiO1xuaW1wb3J0IFVubGlrZWx5Rm9ybWF0RmlsdGVyIGZyb20gXCIuL2NvbW1vbi9yZWZpbmVycy9Vbmxpa2VseUZvcm1hdEZpbHRlclwiO1xuaW1wb3J0IElTT0Zvcm1hdFBhcnNlciBmcm9tIFwiLi9jb21tb24vcGFyc2Vycy9JU09Gb3JtYXRQYXJzZXJcIjtcbmltcG9ydCBNZXJnZVdlZWtkYXlDb21wb25lbnRSZWZpbmVyIGZyb20gXCIuL2NvbW1vbi9yZWZpbmVycy9NZXJnZVdlZWtkYXlDb21wb25lbnRSZWZpbmVyXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmNsdWRlQ29tbW9uQ29uZmlndXJhdGlvbihjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uLCBzdHJpY3RNb2RlID0gZmFsc2UpOiBDb25maWd1cmF0aW9uIHtcbiAgICBjb25maWd1cmF0aW9uLnBhcnNlcnMudW5zaGlmdChuZXcgSVNPRm9ybWF0UGFyc2VyKCkpO1xuXG4gICAgY29uZmlndXJhdGlvbi5yZWZpbmVycy51bnNoaWZ0KG5ldyBNZXJnZVdlZWtkYXlDb21wb25lbnRSZWZpbmVyKCkpO1xuICAgIGNvbmZpZ3VyYXRpb24ucmVmaW5lcnMudW5zaGlmdChuZXcgRXh0cmFjdFRpbWV6b25lT2Zmc2V0UmVmaW5lcigpKTtcbiAgICBjb25maWd1cmF0aW9uLnJlZmluZXJzLnVuc2hpZnQobmV3IE92ZXJsYXBSZW1vdmFsUmVmaW5lcigpKTtcblxuICAgIC8vIFVubGlrZSBFeHRyYWN0VGltZXpvbmVPZmZzZXRSZWZpbmVyLCB0aGlzIHJlZmluZXIgcmVsaWVzIG9uIGtub3dpbmcgYm90aCBkYXRlIGFuZCB0aW1lIGluIGNhc2VzIHdoZXJlIHRoZSB0elxuICAgIC8vIGlzIGFtYmlndW91cyAoaW4gdGVybXMgb2YgRFNUL25vbi1EU1QpLiBJdCB0aGVyZWZvcmUgbmVlZHMgdG8gYmUgYXBwbGllZCBhcyBsYXRlIGFzIHBvc3NpYmxlIGluIHRoZSBwYXJzaW5nLlxuICAgIGNvbmZpZ3VyYXRpb24ucmVmaW5lcnMucHVzaChuZXcgRXh0cmFjdFRpbWV6b25lQWJiclJlZmluZXIoKSk7XG4gICAgY29uZmlndXJhdGlvbi5yZWZpbmVycy5wdXNoKG5ldyBPdmVybGFwUmVtb3ZhbFJlZmluZXIoKSk7XG4gICAgY29uZmlndXJhdGlvbi5yZWZpbmVycy5wdXNoKG5ldyBGb3J3YXJkRGF0ZVJlZmluZXIoKSk7XG4gICAgY29uZmlndXJhdGlvbi5yZWZpbmVycy5wdXNoKG5ldyBVbmxpa2VseUZvcm1hdEZpbHRlcihzdHJpY3RNb2RlKSk7XG4gICAgcmV0dXJuIGNvbmZpZ3VyYXRpb247XG59XG4iLCAiaW1wb3J0IHsgUGFyc2luZ0NvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vY2hyb25vXCI7XG5pbXBvcnQgeyBQYXJzaW5nQ29tcG9uZW50cywgUGFyc2luZ1Jlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi9yZXN1bHRzXCI7XG5pbXBvcnQgZGF5anMgZnJvbSBcImRheWpzXCI7XG5pbXBvcnQgeyBBYnN0cmFjdFBhcnNlcldpdGhXb3JkQm91bmRhcnlDaGVja2luZyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFyc2Vycy9BYnN0cmFjdFBhcnNlcldpdGhXb3JkQm91bmRhcnlcIjtcbmltcG9ydCB7IGFzc2lnblNpbWlsYXJEYXRlIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2RheWpzXCI7XG5pbXBvcnQgKiBhcyByZWZlcmVuY2VzIGZyb20gXCIuLi8uLi8uLi9jb21tb24vY2FzdWFsUmVmZXJlbmNlc1wiO1xuXG5jb25zdCBQQVRURVJOID0gLyhub3d8dG9kYXl8dG9uaWdodHx0b21vcnJvd3x0bXJ8dG1yd3x5ZXN0ZXJkYXl8bGFzdFxccypuaWdodCkoPz1cXFd8JCkvaTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRU5DYXN1YWxEYXRlUGFyc2VyIGV4dGVuZHMgQWJzdHJhY3RQYXJzZXJXaXRoV29yZEJvdW5kYXJ5Q2hlY2tpbmcge1xuICAgIGlubmVyUGF0dGVybihjb250ZXh0OiBQYXJzaW5nQ29udGV4dCk6IFJlZ0V4cCB7XG4gICAgICAgIHJldHVybiBQQVRURVJOO1xuICAgIH1cblxuICAgIGlubmVyRXh0cmFjdChjb250ZXh0OiBQYXJzaW5nQ29udGV4dCwgbWF0Y2g6IFJlZ0V4cE1hdGNoQXJyYXkpOiBQYXJzaW5nQ29tcG9uZW50cyB8IFBhcnNpbmdSZXN1bHQge1xuICAgICAgICBsZXQgdGFyZ2V0RGF0ZSA9IGRheWpzKGNvbnRleHQucmVmRGF0ZSk7XG4gICAgICAgIGNvbnN0IGxvd2VyVGV4dCA9IG1hdGNoWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb250ZXh0LmNyZWF0ZVBhcnNpbmdDb21wb25lbnRzKCk7XG5cbiAgICAgICAgc3dpdGNoIChsb3dlclRleHQpIHtcbiAgICAgICAgICAgIGNhc2UgXCJub3dcIjpcbiAgICAgICAgICAgICAgICBjb21wb25lbnQgPSByZWZlcmVuY2VzLm5vdyhjb250ZXh0LnJlZmVyZW5jZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJ0b2RheVwiOlxuICAgICAgICAgICAgICAgIGNvbXBvbmVudCA9IHJlZmVyZW5jZXMudG9kYXkoY29udGV4dC5yZWZlcmVuY2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwieWVzdGVyZGF5XCI6XG4gICAgICAgICAgICAgICAgY29tcG9uZW50ID0gcmVmZXJlbmNlcy55ZXN0ZXJkYXkoY29udGV4dC5yZWZlcmVuY2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwidG9tb3Jyb3dcIjpcbiAgICAgICAgICAgIGNhc2UgXCJ0bXJcIjpcbiAgICAgICAgICAgIGNhc2UgXCJ0bXJ3XCI6XG4gICAgICAgICAgICAgICAgY29tcG9uZW50ID0gcmVmZXJlbmNlcy50b21vcnJvdyhjb250ZXh0LnJlZmVyZW5jZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJ0b25pZ2h0XCI6XG4gICAgICAgICAgICAgICAgY29tcG9uZW50ID0gcmVmZXJlbmNlcy50b25pZ2h0KGNvbnRleHQucmVmZXJlbmNlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJUZXh0Lm1hdGNoKC9sYXN0XFxzKm5pZ2h0LykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldERhdGUuaG91cigpID4gNikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RGF0ZSA9IHRhcmdldERhdGUuYWRkKC0xLCBcImRheVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGFzc2lnblNpbWlsYXJEYXRlKGNvbXBvbmVudCwgdGFyZ2V0RGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5pbXBseShcImhvdXJcIiwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbXBvbmVudC5hZGRUYWcoXCJwYXJzZXIvRU5DYXN1YWxEYXRlUGFyc2VyXCIpO1xuICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzaW5nQ29tcG9uZW50cywgUmVmZXJlbmNlV2l0aFRpbWV6b25lIH0gZnJvbSBcIi4uL3Jlc3VsdHNcIjtcbmltcG9ydCBkYXlqcyBmcm9tIFwiZGF5anNcIjtcbmltcG9ydCB7XG4gICAgYXNzaWduU2ltaWxhckRhdGUsXG4gICAgYXNzaWduU2ltaWxhclRpbWUsXG4gICAgaW1wbHlTaW1pbGFyRGF0ZSxcbiAgICBpbXBseVNpbWlsYXJUaW1lLFxuICAgIGltcGx5VGhlTmV4dERheSxcbn0gZnJvbSBcIi4uL3V0aWxzL2RheWpzXCI7XG5pbXBvcnQgeyBNZXJpZGllbSB9IGZyb20gXCIuLi90eXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbm93KHJlZmVyZW5jZTogUmVmZXJlbmNlV2l0aFRpbWV6b25lKTogUGFyc2luZ0NvbXBvbmVudHMge1xuICAgIGNvbnN0IHRhcmdldERhdGUgPSBkYXlqcyhyZWZlcmVuY2UuaW5zdGFudCk7XG4gICAgY29uc3QgY29tcG9uZW50ID0gbmV3IFBhcnNpbmdDb21wb25lbnRzKHJlZmVyZW5jZSwge30pO1xuICAgIGFzc2lnblNpbWlsYXJEYXRlKGNvbXBvbmVudCwgdGFyZ2V0RGF0ZSk7XG4gICAgYXNzaWduU2ltaWxhclRpbWUoY29tcG9uZW50LCB0YXJnZXREYXRlKTtcbiAgICBpZiAocmVmZXJlbmNlLnRpbWV6b25lT2Zmc2V0ICE9PSBudWxsKSB7XG4gICAgICAgIGNvbXBvbmVudC5hc3NpZ24oXCJ0aW1lem9uZU9mZnNldFwiLCB0YXJnZXREYXRlLnV0Y09mZnNldCgpKTtcbiAgICB9XG4gICAgY29tcG9uZW50LmFkZFRhZyhcImNhc3VhbFJlZmVyZW5jZS9ub3dcIik7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZGF5KHJlZmVyZW5jZTogUmVmZXJlbmNlV2l0aFRpbWV6b25lKTogUGFyc2luZ0NvbXBvbmVudHMge1xuICAgIGNvbnN0IHRhcmdldERhdGUgPSBkYXlqcyhyZWZlcmVuY2UuaW5zdGFudCk7XG4gICAgY29uc3QgY29tcG9uZW50ID0gbmV3IFBhcnNpbmdDb21wb25lbnRzKHJlZmVyZW5jZSwge30pO1xuICAgIGFzc2lnblNpbWlsYXJEYXRlKGNvbXBvbmVudCwgdGFyZ2V0RGF0ZSk7XG4gICAgaW1wbHlTaW1pbGFyVGltZShjb21wb25lbnQsIHRhcmdldERhdGUpO1xuICAgIGNvbXBvbmVudC5hZGRUYWcoXCJjYXN1YWxSZWZlcmVuY2UvdG9kYXlcIik7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn1cblxuLyoqXG4gKiBUaGUgcHJldmlvdXMgZGF5LiBJbXBseSB0aGUgc2FtZSB0aW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24geWVzdGVyZGF5KHJlZmVyZW5jZTogUmVmZXJlbmNlV2l0aFRpbWV6b25lKTogUGFyc2luZ0NvbXBvbmVudHMge1xuICAgIHJldHVybiB0aGVEYXlCZWZvcmUocmVmZXJlbmNlLCAxKS5hZGRUYWcoXCJjYXN1YWxSZWZlcmVuY2UveWVzdGVyZGF5XCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGhlRGF5QmVmb3JlKHJlZmVyZW5jZTogUmVmZXJlbmNlV2l0aFRpbWV6b25lLCBudW1EYXk6IG51bWJlcik6IFBhcnNpbmdDb21wb25lbnRzIHtcbiAgICByZXR1cm4gdGhlRGF5QWZ0ZXIocmVmZXJlbmNlLCAtbnVtRGF5KTtcbn1cblxuLyoqXG4gKiBUaGUgZm9sbG93aW5nIGRheSB3aXRoIGRheWpzLmFzc2lnblRoZU5leHREYXkoKVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9tb3Jyb3cocmVmZXJlbmNlOiBSZWZlcmVuY2VXaXRoVGltZXpvbmUpOiBQYXJzaW5nQ29tcG9uZW50cyB7XG4gICAgcmV0dXJuIHRoZURheUFmdGVyKHJlZmVyZW5jZSwgMSkuYWRkVGFnKFwiY2FzdWFsUmVmZXJlbmNlL3RvbW9ycm93XCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGhlRGF5QWZ0ZXIocmVmZXJlbmNlOiBSZWZlcmVuY2VXaXRoVGltZXpvbmUsIG5EYXlzOiBudW1iZXIpOiBQYXJzaW5nQ29tcG9uZW50cyB7XG4gICAgbGV0IHRhcmdldERhdGUgPSBkYXlqcyhyZWZlcmVuY2UuaW5zdGFudCk7XG4gICAgY29uc3QgY29tcG9uZW50ID0gbmV3IFBhcnNpbmdDb21wb25lbnRzKHJlZmVyZW5jZSwge30pO1xuICAgIHRhcmdldERhdGUgPSB0YXJnZXREYXRlLmFkZChuRGF5cywgXCJkYXlcIik7XG4gICAgYXNzaWduU2ltaWxhckRhdGUoY29tcG9uZW50LCB0YXJnZXREYXRlKTtcbiAgICBpbXBseVNpbWlsYXJUaW1lKGNvbXBvbmVudCwgdGFyZ2V0RGF0ZSk7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvbmlnaHQocmVmZXJlbmNlOiBSZWZlcmVuY2VXaXRoVGltZXpvbmUsIGltcGx5SG91ciA9IDIyKTogUGFyc2luZ0NvbXBvbmVudHMge1xuICAgIGNvbnN0IHRhcmdldERhdGUgPSBkYXlqcyhyZWZlcmVuY2UuaW5zdGFudCk7XG4gICAgY29uc3QgY29tcG9uZW50ID0gbmV3IFBhcnNpbmdDb21wb25lbnRzKHJlZmVyZW5jZSwge30pO1xuICAgIGFzc2lnblNpbWlsYXJEYXRlKGNvbXBvbmVudCwgdGFyZ2V0RGF0ZSk7XG4gICAgY29tcG9uZW50LmltcGx5KFwiaG91clwiLCBpbXBseUhvdXIpO1xuICAgIGNvbXBvbmVudC5pbXBseShcIm1lcmlkaWVtXCIsIE1lcmlkaWVtLlBNKTtcbiAgICBjb21wb25lbnQuYWRkVGFnKFwiY2FzdWFsUmVmZXJlbmNlL3RvbmlnaHRcIik7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxhc3ROaWdodChyZWZlcmVuY2U6IFJlZmVyZW5jZVdpdGhUaW1lem9uZSwgaW1wbHlIb3VyID0gMCk6IFBhcnNpbmdDb21wb25lbnRzIHtcbiAgICBsZXQgdGFyZ2V0RGF0ZSA9IGRheWpzKHJlZmVyZW5jZS5pbnN0YW50KTtcbiAgICBjb25zdCBjb21wb25lbnQgPSBuZXcgUGFyc2luZ0NvbXBvbmVudHMocmVmZXJlbmNlLCB7fSk7XG4gICAgaWYgKHRhcmdldERhdGUuaG91cigpIDwgNikge1xuICAgICAgICB0YXJnZXREYXRlID0gdGFyZ2V0RGF0ZS5hZGQoLTEsIFwiZGF5XCIpO1xuICAgIH1cbiAgICBhc3NpZ25TaW1pbGFyRGF0ZShjb21wb25lbnQsIHRhcmdldERhdGUpO1xuICAgIGNvbXBvbmVudC5pbXBseShcImhvdXJcIiwgaW1wbHlIb3VyKTtcbiAgICByZXR1cm4gY29tcG9uZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXZlbmluZyhyZWZlcmVuY2U6IFJlZmVyZW5jZVdpdGhUaW1lem9uZSwgaW1wbHlIb3VyID0gMjApOiBQYXJzaW5nQ29tcG9uZW50cyB7XG4gICAgY29uc3QgY29tcG9uZW50ID0gbmV3IFBhcnNpbmdDb21wb25lbnRzKHJlZmVyZW5jZSwge30pO1xuICAgIGNvbXBvbmVudC5pbXBseShcIm1lcmlkaWVtXCIsIE1lcmlkaWVtLlBNKTtcbiAgICBjb21wb25lbnQuaW1wbHkoXCJob3VyXCIsIGltcGx5SG91cik7XG4gICAgY29tcG9uZW50LmFkZFRhZyhcImNhc3VhbFJlZmVyZW5jZS9ldmVuaW5nXCIpO1xuICAgIHJldHVybiBjb21wb25lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZXN0ZXJkYXlFdmVuaW5nKHJlZmVyZW5jZTogUmVmZXJlbmNlV2l0aFRpbWV6b25lLCBpbXBseUhvdXIgPSAyMCk6IFBhcnNpbmdDb21wb25lbnRzIHtcbiAgICBsZXQgdGFyZ2V0RGF0ZSA9IGRheWpzKHJlZmVyZW5jZS5pbnN0YW50KTtcbiAgICBjb25zdCBjb21wb25lbnQgPSBuZXcgUGFyc2luZ0NvbXBvbmVudHMocmVmZXJlbmNlLCB7fSk7XG4gICAgdGFyZ2V0RGF0ZSA9IHRhcmdldERhdGUuYWRkKC0xLCBcImRheVwiKTtcbiAgICBhc3NpZ25TaW1pbGFyRGF0ZShjb21wb25lbnQsIHRhcmdldERhdGUpO1xuICAgIGNvbXBvbmVudC5pbXBseShcImhvdXJcIiwgaW1wbHlIb3VyKTtcbiAgICBjb21wb25lbnQuaW1wbHkoXCJtZXJpZGllbVwiLCBNZXJpZGllbS5QTSk7XG4gICAgY29tcG9uZW50LmFkZFRhZyhcImNhc3VhbFJlZmVyZW5jZS95ZXN0ZXJkYXlcIik7XG4gICAgY29tcG9uZW50LmFkZFRhZyhcImNhc3VhbFJlZmVyZW5jZS9ldmVuaW5nXCIpO1xuICAgIHJldHVybiBjb21wb25lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaWRuaWdodChyZWZlcmVuY2U6IFJlZmVyZW5jZVdpdGhUaW1lem9uZSk6IFBhcnNpbmdDb21wb25lbnRzIHtcbiAgICBjb25zdCBjb21wb25lbnQgPSBuZXcgUGFyc2luZ0NvbXBvbmVudHMocmVmZXJlbmNlLCB7fSk7XG4gICAgY29uc3QgdGFyZ2V0RGF0ZSA9IGRheWpzKHJlZmVyZW5jZS5pbnN0YW50KTtcbiAgICBpZiAodGFyZ2V0RGF0ZS5ob3VyKCkgPiAyKSB7XG4gICAgICAgIC8vIFVubGVzcyBpdCdzIHZlcnkgZWFybHkgbW9ybmluZyAoMH4yQU0pLCB3ZSBhc3N1bWUgdGhlIG1pZG5pZ2h0IGlzIHRoZSBjb21pbmcgbWlkbmlnaHQuXG4gICAgICAgIC8vIFRodXMsIGluY3JlYXNpbmcgdGhlIGRheSBieSAxLlxuICAgICAgICBpbXBseVRoZU5leHREYXkoY29tcG9uZW50LCB0YXJnZXREYXRlKTtcbiAgICB9XG4gICAgY29tcG9uZW50LmFzc2lnbihcImhvdXJcIiwgMCk7XG4gICAgY29tcG9uZW50LmltcGx5KFwibWludXRlXCIsIDApO1xuICAgIGNvbXBvbmVudC5pbXBseShcInNlY29uZFwiLCAwKTtcbiAgICBjb21wb25lbnQuaW1wbHkoXCJtaWxsaXNlY29uZFwiLCAwKTtcbiAgICBjb21wb25lbnQuYWRkVGFnKFwiY2FzdWFsUmVmZXJlbmNlL21pZG5pZ2h0XCIpO1xuICAgIHJldHVybiBjb21wb25lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3JuaW5nKHJlZmVyZW5jZTogUmVmZXJlbmNlV2l0aFRpbWV6b25lLCBpbXBseUhvdXIgPSA2KTogUGFyc2luZ0NvbXBvbmVudHMge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IG5ldyBQYXJzaW5nQ29tcG9uZW50cyhyZWZlcmVuY2UsIHt9KTtcbiAgICBjb21wb25lbnQuaW1wbHkoXCJtZXJpZGllbVwiLCBNZXJpZGllbS5BTSk7XG4gICAgY29tcG9uZW50LmltcGx5KFwiaG91clwiLCBpbXBseUhvdXIpO1xuICAgIGNvbXBvbmVudC5pbXBseShcIm1pbnV0ZVwiLCAwKTtcbiAgICBjb21wb25lbnQuaW1wbHkoXCJzZWNvbmRcIiwgMCk7XG4gICAgY29tcG9uZW50LmltcGx5KFwibWlsbGlzZWNvbmRcIiwgMCk7XG4gICAgY29tcG9uZW50LmFkZFRhZyhcImNhc3VhbFJlZmVyZW5jZS9tb3JuaW5nXCIpO1xuICAgIHJldHVybiBjb21wb25lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZnRlcm5vb24ocmVmZXJlbmNlOiBSZWZlcmVuY2VXaXRoVGltZXpvbmUsIGltcGx5SG91ciA9IDE1KTogUGFyc2luZ0NvbXBvbmVudHMge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IG5ldyBQYXJzaW5nQ29tcG9uZW50cyhyZWZlcmVuY2UsIHt9KTtcbiAgICBjb21wb25lbnQuaW1wbHkoXCJtZXJpZGllbVwiLCBNZXJpZGllbS5QTSk7XG4gICAgY29tcG9uZW50LmltcGx5KFwiaG91clwiLCBpbXBseUhvdXIpO1xuICAgIGNvbXBvbmVudC5pbXBseShcIm1pbnV0ZVwiLCAwKTtcbiAgICBjb21wb25lbnQuaW1wbHkoXCJzZWNvbmRcIiwgMCk7XG4gICAgY29tcG9uZW50LmltcGx5KFwibWlsbGlzZWNvbmRcIiwgMCk7XG4gICAgY29tcG9uZW50LmFkZFRhZyhcImNhc3VhbFJlZmVyZW5jZS9hZnRlcm5vb25cIik7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vb24ocmVmZXJlbmNlOiBSZWZlcmVuY2VXaXRoVGltZXpvbmUpOiBQYXJzaW5nQ29tcG9uZW50cyB7XG4gICAgY29uc3QgY29tcG9uZW50ID0gbmV3IFBhcnNpbmdDb21wb25lbnRzKHJlZmVyZW5jZSwge30pO1xuICAgIGNvbXBvbmVudC5pbXBseShcIm1lcmlkaWVtXCIsIE1lcmlkaWVtLkFNKTtcbiAgICBjb21wb25lbnQuaW1wbHkoXCJob3VyXCIsIDEyKTtcbiAgICBjb21wb25lbnQuaW1wbHkoXCJtaW51dGVcIiwgMCk7XG4gICAgY29tcG9uZW50LmltcGx5KFwic2Vjb25kXCIsIDApO1xuICAgIGNvbXBvbmVudC5pbXBseShcIm1pbGxpc2Vjb25kXCIsIDApO1xuICAgIGNvbXBvbmVudC5hZGRUYWcoXCJjYXN1YWxSZWZlcmVuY2Uvbm9vblwiKTtcbiAgICByZXR1cm4gY29tcG9uZW50O1xufVxuIiwgImltcG9ydCB7IFBhcnNpbmdDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uL2Nocm9ub1wiO1xuaW1wb3J0IHsgQWJzdHJhY3RQYXJzZXJXaXRoV29yZEJvdW5kYXJ5Q2hlY2tpbmcgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhcnNlcnMvQWJzdHJhY3RQYXJzZXJXaXRoV29yZEJvdW5kYXJ5XCI7XG5pbXBvcnQgKiBhcyBjYXN1YWxSZWZlcmVuY2VzIGZyb20gXCIuLi8uLi8uLi9jb21tb24vY2FzdWFsUmVmZXJlbmNlc1wiO1xuXG5jb25zdCBQQVRURVJOID0gLyg/OnRoaXMpP1xcc3swLDN9KG1vcm5pbmd8YWZ0ZXJub29ufGV2ZW5pbmd8bmlnaHR8bWlkbmlnaHR8bWlkZGF5fG5vb24pKD89XFxXfCQpL2k7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVOQ2FzdWFsVGltZVBhcnNlciBleHRlbmRzIEFic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeUNoZWNraW5nIHtcbiAgICBpbm5lclBhdHRlcm4oKSB7XG4gICAgICAgIHJldHVybiBQQVRURVJOO1xuICAgIH1cbiAgICBpbm5lckV4dHJhY3QoY29udGV4dDogUGFyc2luZ0NvbnRleHQsIG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5KSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKG1hdGNoWzFdLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJhZnRlcm5vb25cIjpcbiAgICAgICAgICAgICAgICBjb21wb25lbnQgPSBjYXN1YWxSZWZlcmVuY2VzLmFmdGVybm9vbihjb250ZXh0LnJlZmVyZW5jZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZXZlbmluZ1wiOlxuICAgICAgICAgICAgY2FzZSBcIm5pZ2h0XCI6XG4gICAgICAgICAgICAgICAgY29tcG9uZW50ID0gY2FzdWFsUmVmZXJlbmNlcy5ldmVuaW5nKGNvbnRleHQucmVmZXJlbmNlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJtaWRuaWdodFwiOlxuICAgICAgICAgICAgICAgIGNvbXBvbmVudCA9IGNhc3VhbFJlZmVyZW5jZXMubWlkbmlnaHQoY29udGV4dC5yZWZlcmVuY2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm1vcm5pbmdcIjpcbiAgICAgICAgICAgICAgICBjb21wb25lbnQgPSBjYXN1YWxSZWZlcmVuY2VzLm1vcm5pbmcoY29udGV4dC5yZWZlcmVuY2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5vb25cIjpcbiAgICAgICAgICAgIGNhc2UgXCJtaWRkYXlcIjpcbiAgICAgICAgICAgICAgICBjb21wb25lbnQgPSBjYXN1YWxSZWZlcmVuY2VzLm5vb24oY29udGV4dC5yZWZlcmVuY2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudC5hZGRUYWcoXCJwYXJzZXIvRU5DYXN1YWxUaW1lUGFyc2VyXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfVxufVxuIiwgImltcG9ydCB7IFdlZWtkYXkgfSBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IFBhcnNpbmdDb21wb25lbnRzLCBSZWZlcmVuY2VXaXRoVGltZXpvbmUgfSBmcm9tIFwiLi4vLi4vcmVzdWx0c1wiO1xuaW1wb3J0IHsgYWRkSW1wbGllZFRpbWVVbml0cyB9IGZyb20gXCIuLi8uLi91dGlscy90aW1ldW5pdHNcIjtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwYXJzaW5nIGNvbXBvbmVudHMgYXQgdGhlIHdlZWtkYXkgKGNvbnNpZGVyaW5nIHRoZSBtb2RpZmllcikuIFRoZSB0aW1lIGFuZCB0aW1lem9uZSBpcyBhc3N1bWUgdG8gYmVcbiAqIHNpbWlsYXIgdG8gdGhlIHJlZmVyZW5jZS5cbiAqIEBwYXJhbSByZWZlcmVuY2VcbiAqIEBwYXJhbSB3ZWVrZGF5XG4gKiBAcGFyYW0gbW9kaWZpZXIgXCJ0aGlzXCIsIFwibmV4dFwiLCBcImxhc3RcIiBtb2RpZmllciB3b3JkLiBJZiBlbXB0eSwgcmV0dXJucyB0aGUgd2Vla2RheSBjbG9zZXN0IHRvIHRoZSBgcmVmRGF0ZWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQYXJzaW5nQ29tcG9uZW50c0F0V2Vla2RheShcbiAgICByZWZlcmVuY2U6IFJlZmVyZW5jZVdpdGhUaW1lem9uZSxcbiAgICB3ZWVrZGF5OiBXZWVrZGF5LFxuICAgIG1vZGlmaWVyPzogXCJ0aGlzXCIgfCBcIm5leHRcIiB8IFwibGFzdFwiXG4pOiBQYXJzaW5nQ29tcG9uZW50cyB7XG4gICAgY29uc3QgcmVmRGF0ZSA9IHJlZmVyZW5jZS5nZXREYXRlV2l0aEFkanVzdGVkVGltZXpvbmUoKTtcbiAgICBjb25zdCBkYXlzVG9XZWVrZGF5ID0gZ2V0RGF5c1RvV2Vla2RheShyZWZEYXRlLCB3ZWVrZGF5LCBtb2RpZmllcik7XG5cbiAgICBsZXQgY29tcG9uZW50cyA9IG5ldyBQYXJzaW5nQ29tcG9uZW50cyhyZWZlcmVuY2UpO1xuICAgIGNvbXBvbmVudHMgPSBhZGRJbXBsaWVkVGltZVVuaXRzKGNvbXBvbmVudHMsIHsgXCJkYXlcIjogZGF5c1RvV2Vla2RheSB9KTtcbiAgICBjb21wb25lbnRzLmFzc2lnbihcIndlZWtkYXlcIiwgd2Vla2RheSk7XG5cbiAgICByZXR1cm4gY29tcG9uZW50cztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIG51bWJlciBvZiBkYXlzIGZyb20gcmVmRGF0ZSB0byB0aGUgd2Vla2RheS4gVGhlIHJlZkRhdGUgZGF0ZSBhbmQgdGltZXpvbmUgaW5mb3JtYXRpb24gaXMgdXNlZC5cbiAqIEBwYXJhbSByZWZEYXRlXG4gKiBAcGFyYW0gd2Vla2RheVxuICogQHBhcmFtIG1vZGlmaWVyIFwidGhpc1wiLCBcIm5leHRcIiwgXCJsYXN0XCIgbW9kaWZpZXIgd29yZC4gSWYgZW1wdHksIHJldHVybnMgdGhlIHdlZWtkYXkgY2xvc2VzdCB0byB0aGUgYHJlZkRhdGVgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5c1RvV2Vla2RheShyZWZEYXRlOiBEYXRlLCB3ZWVrZGF5OiBXZWVrZGF5LCBtb2RpZmllcj86IFwidGhpc1wiIHwgXCJuZXh0XCIgfCBcImxhc3RcIik6IG51bWJlciB7XG4gICAgY29uc3QgcmVmV2Vla2RheSA9IHJlZkRhdGUuZ2V0RGF5KCkgYXMgV2Vla2RheTtcbiAgICBzd2l0Y2ggKG1vZGlmaWVyKSB7XG4gICAgICAgIGNhc2UgXCJ0aGlzXCI6XG4gICAgICAgICAgICByZXR1cm4gZ2V0RGF5c0ZvcndhcmRUb1dlZWtkYXkocmVmRGF0ZSwgd2Vla2RheSk7XG4gICAgICAgIGNhc2UgXCJsYXN0XCI6XG4gICAgICAgICAgICByZXR1cm4gZ2V0QmFja3dhcmREYXlzVG9XZWVrZGF5KHJlZkRhdGUsIHdlZWtkYXkpO1xuICAgICAgICBjYXNlIFwibmV4dFwiOlxuICAgICAgICAgICAgLy8gRnJvbSBTdW5kYXksIHRoZSBuZXh0IFN1bmRheSBpcyA3IGRheXMgbGF0ZXIuXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIG5leHQgTW9uIGlzIDEgZGF5cyBsYXRlciwgbmV4dCBUdWVzIGlzIDIgZGF5cyBsYXRlciwgYW5kIHNvIG9uLi4uLCAocmV0dXJuIGVudW0gdmFsdWUpXG4gICAgICAgICAgICBpZiAocmVmV2Vla2RheSA9PSBXZWVrZGF5LlNVTkRBWSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3ZWVrZGF5ID09IFdlZWtkYXkuU1VOREFZID8gNyA6IHdlZWtkYXk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBGcm9tIFNhdHVyZGF5LCB0aGUgbmV4dCBTYXR1cmRheSBpcyA3IGRheXMgbGF0ZXIsIHRoZSBuZXh0IFN1bmRheSBpcyA4LWRheXMgbGF0ZXIuXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIG5leHQgTW9uIGlzICgxICsgMSkgZGF5cyBsYXRlciwgbmV4dCBUdWVzIGlzICgxICsgMikgZGF5cyBsYXRlciwgYW5kIHNvIG9uLi4uLFxuICAgICAgICAgICAgLy8gKHJldHVybiwgMiArIFtlbnVtIHZhbHVlXSBkYXlzKVxuICAgICAgICAgICAgaWYgKHJlZldlZWtkYXkgPT0gV2Vla2RheS5TQVRVUkRBWSkge1xuICAgICAgICAgICAgICAgIGlmICh3ZWVrZGF5ID09IFdlZWtkYXkuU0FUVVJEQVkpIHJldHVybiA3O1xuICAgICAgICAgICAgICAgIGlmICh3ZWVrZGF5ID09IFdlZWtkYXkuU1VOREFZKSByZXR1cm4gODtcbiAgICAgICAgICAgICAgICByZXR1cm4gMSArIHdlZWtkYXk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBGcm9tIHdlZWtkYXlzLCBuZXh0IE1vbiBpcyB0aGUgZm9sbG93aW5nIHdlZWsncyBNb24sIG5leHQgVHVlcyB0aGUgZm9sbG93aW5nIHdlZWsncyBUdWVzLCBhbmQgc28gb24uLi5cbiAgICAgICAgICAgIC8vIElmIHRoZSB3ZWVrJ3Mgd2Vla2RheSBhbHJlYWR5IHBhc3NlZCAod2Vla2RheSA8IHJlZldlZWtkYXkpLCB3ZSBzaW1wbHkgY291bnQgZm9yd2FyZCB0byBuZXh0IHdlZWtcbiAgICAgICAgICAgIC8vIChzaW1pbGFyIHRvICd0aGlzJykuIE90aGVyd2lzZSwgY291bnQgZm9yd2FyZCB0byB0aGlzIHdlZWssIHRoZW4gYWRkIGFub3RoZXIgNyBkYXlzLlxuICAgICAgICAgICAgaWYgKHdlZWtkYXkgPCByZWZXZWVrZGF5ICYmIHdlZWtkYXkgIT0gV2Vla2RheS5TVU5EQVkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RGF5c0ZvcndhcmRUb1dlZWtkYXkocmVmRGF0ZSwgd2Vla2RheSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXREYXlzRm9yd2FyZFRvV2Vla2RheShyZWZEYXRlLCB3ZWVrZGF5KSArIDc7XG4gICAgICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBnZXREYXlzVG9XZWVrZGF5Q2xvc2VzdChyZWZEYXRlLCB3ZWVrZGF5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERheXNUb1dlZWtkYXlDbG9zZXN0KHJlZkRhdGU6IERhdGUsIHdlZWtkYXk6IFdlZWtkYXkpOiBudW1iZXIge1xuICAgIGNvbnN0IGJhY2t3YXJkID0gZ2V0QmFja3dhcmREYXlzVG9XZWVrZGF5KHJlZkRhdGUsIHdlZWtkYXkpO1xuICAgIGNvbnN0IGZvcndhcmQgPSBnZXREYXlzRm9yd2FyZFRvV2Vla2RheShyZWZEYXRlLCB3ZWVrZGF5KTtcblxuICAgIHJldHVybiBmb3J3YXJkIDwgLWJhY2t3YXJkID8gZm9yd2FyZCA6IGJhY2t3YXJkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5c0ZvcndhcmRUb1dlZWtkYXkocmVmRGF0ZTogRGF0ZSwgd2Vla2RheTogV2Vla2RheSk6IG51bWJlciB7XG4gICAgY29uc3QgcmVmV2Vla2RheSA9IHJlZkRhdGUuZ2V0RGF5KCk7XG4gICAgbGV0IGZvcndhcmRDb3VudCA9IHdlZWtkYXkgLSByZWZXZWVrZGF5O1xuICAgIGlmIChmb3J3YXJkQ291bnQgPCAwKSB7XG4gICAgICAgIGZvcndhcmRDb3VudCArPSA3O1xuICAgIH1cbiAgICByZXR1cm4gZm9yd2FyZENvdW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmFja3dhcmREYXlzVG9XZWVrZGF5KHJlZkRhdGU6IERhdGUsIHdlZWtkYXk6IFdlZWtkYXkpOiBudW1iZXIge1xuICAgIGNvbnN0IHJlZldlZWtkYXkgPSByZWZEYXRlLmdldERheSgpO1xuICAgIGxldCBiYWNrd2FyZENvdW50ID0gd2Vla2RheSAtIHJlZldlZWtkYXk7XG4gICAgaWYgKGJhY2t3YXJkQ291bnQgPj0gMCkge1xuICAgICAgICBiYWNrd2FyZENvdW50IC09IDc7XG4gICAgfVxuICAgIHJldHVybiBiYWNrd2FyZENvdW50O1xufVxuIiwgImltcG9ydCB7IFBhcnNpbmdDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uL2Nocm9ub1wiO1xuaW1wb3J0IHsgUGFyc2luZ0NvbXBvbmVudHMgfSBmcm9tIFwiLi4vLi4vLi4vcmVzdWx0c1wiO1xuaW1wb3J0IHsgV0VFS0RBWV9ESUNUSU9OQVJZIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgbWF0Y2hBbnlQYXR0ZXJuIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3BhdHRlcm5cIjtcbmltcG9ydCB7IEFic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeUNoZWNraW5nIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYXJzZXJzL0Fic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeVwiO1xuaW1wb3J0IHsgY3JlYXRlUGFyc2luZ0NvbXBvbmVudHNBdFdlZWtkYXkgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2NhbGN1bGF0aW9uL3dlZWtkYXlzXCI7XG5pbXBvcnQgeyBXZWVrZGF5IH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVzXCI7XG5cbmNvbnN0IFBBVFRFUk4gPSBuZXcgUmVnRXhwKFxuICAgIFwiKD86KD86XFxcXCx8XFxcXCh8XFxcXFx1RkYwOClcXFxccyopP1wiICtcbiAgICAgICAgXCIoPzpvblxcXFxzKj8pP1wiICtcbiAgICAgICAgXCIoPzoodGhpc3xsYXN0fHBhc3R8bmV4dClcXFxccyopP1wiICtcbiAgICAgICAgYCgke21hdGNoQW55UGF0dGVybihXRUVLREFZX0RJQ1RJT05BUlkpfXx3ZWVrZW5kfHdlZWtkYXkpYCArXG4gICAgICAgIFwiKD86XFxcXHMqKD86XFxcXCx8XFxcXCl8XFxcXFx1RkYwOSkpP1wiICtcbiAgICAgICAgXCIoPzpcXFxccyoodGhpc3xsYXN0fHBhc3R8bmV4dClcXFxccyp3ZWVrKT9cIiArXG4gICAgICAgIFwiKD89XFxcXFd8JClcIixcbiAgICBcImlcIlxuKTtcblxuY29uc3QgUFJFRklYX0dST1VQID0gMTtcbmNvbnN0IFdFRUtEQVlfR1JPVVAgPSAyO1xuY29uc3QgUE9TVEZJWF9HUk9VUCA9IDM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVOV2Vla2RheVBhcnNlciBleHRlbmRzIEFic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeUNoZWNraW5nIHtcbiAgICBpbm5lclBhdHRlcm4oKTogUmVnRXhwIHtcbiAgICAgICAgcmV0dXJuIFBBVFRFUk47XG4gICAgfVxuXG4gICAgaW5uZXJFeHRyYWN0KGNvbnRleHQ6IFBhcnNpbmdDb250ZXh0LCBtYXRjaDogUmVnRXhwTWF0Y2hBcnJheSk6IFBhcnNpbmdDb21wb25lbnRzIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IG1hdGNoW1BSRUZJWF9HUk9VUF07XG4gICAgICAgIGNvbnN0IHBvc3RmaXggPSBtYXRjaFtQT1NURklYX0dST1VQXTtcbiAgICAgICAgbGV0IG1vZGlmaWVyV29yZCA9IHByZWZpeCB8fCBwb3N0Zml4O1xuICAgICAgICBtb2RpZmllcldvcmQgPSBtb2RpZmllcldvcmQgfHwgXCJcIjtcbiAgICAgICAgbW9kaWZpZXJXb3JkID0gbW9kaWZpZXJXb3JkLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgbGV0IG1vZGlmaWVyID0gbnVsbDtcbiAgICAgICAgaWYgKG1vZGlmaWVyV29yZCA9PSBcImxhc3RcIiB8fCBtb2RpZmllcldvcmQgPT0gXCJwYXN0XCIpIHtcbiAgICAgICAgICAgIG1vZGlmaWVyID0gXCJsYXN0XCI7XG4gICAgICAgIH0gZWxzZSBpZiAobW9kaWZpZXJXb3JkID09IFwibmV4dFwiKSB7XG4gICAgICAgICAgICBtb2RpZmllciA9IFwibmV4dFwiO1xuICAgICAgICB9IGVsc2UgaWYgKG1vZGlmaWVyV29yZCA9PSBcInRoaXNcIikge1xuICAgICAgICAgICAgbW9kaWZpZXIgPSBcInRoaXNcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHdlZWtkYXlfd29yZCA9IG1hdGNoW1dFRUtEQVlfR1JPVVBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGxldCB3ZWVrZGF5O1xuICAgICAgICBpZiAoV0VFS0RBWV9ESUNUSU9OQVJZW3dlZWtkYXlfd29yZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgd2Vla2RheSA9IFdFRUtEQVlfRElDVElPTkFSWVt3ZWVrZGF5X3dvcmRdO1xuICAgICAgICB9IGVsc2UgaWYgKHdlZWtkYXlfd29yZCA9PSBcIndlZWtlbmRcIikge1xuICAgICAgICAgICAgLy8gVGhpcyBkZXBlbmRzIG9uIHdoYXQgZGF5cyBhcmUgd2Vla2VuZCBzZXR0aW5nLCBidXQgdHlwaWNhbGx5OlxuICAgICAgICAgICAgLy8gJ1RoaXMvbmV4dCB3ZWVrZW5kJyBtZWFucyB0aGUgY29taW5nIFNhdHVyZGF5LCAnbGFzdCB3ZWVrZW5kJyBtZWFucyBsYXN0IFN1bmRheS5cbiAgICAgICAgICAgIHdlZWtkYXkgPSBtb2RpZmllciA9PSBcImxhc3RcIiA/IFdlZWtkYXkuU1VOREFZIDogV2Vla2RheS5TQVRVUkRBWTtcbiAgICAgICAgfSBlbHNlIGlmICh3ZWVrZGF5X3dvcmQgPT0gXCJ3ZWVrZGF5XCIpIHtcbiAgICAgICAgICAgIC8vIEluIEVuZ2xpc2gsIHRoZSBcIndlZWtkYXlcIiBtZWFucyBhbnkgZGF5IG9mIHRoZSB3ZWVrIGV4Y2VwdCB3ZWVrZW5kLlxuICAgICAgICAgICAgLy8gVGhpcyBhbHNvIGRlcGVuZHMgb24gd2hhdCBkYXlzIGFyZSB3ZWVrZW5kIHNldHRpbmcsIGJ1dCB0eXBpY2FsbHk6XG4gICAgICAgICAgICAvLyAtIE9uIHdlZWtlbmQgcmVmLCB0aGlzIG1lYW5zIHRoZSBjb21pbmcgTW9uZGF5IG9yIGxhc3QgRnJpZGF5LlxuICAgICAgICAgICAgLy8gLSBPbiB3ZWVrZGF5IHJlZiwgdGhpcyBtZWFucyB0aGUgbmV4dC9sYXN0IHdvcmtpbmcgZGF5LlxuICAgICAgICAgICAgY29uc3QgcmVmV2Vla2RheSA9IGNvbnRleHQucmVmZXJlbmNlLmdldERhdGVXaXRoQWRqdXN0ZWRUaW1lem9uZSgpLmdldERheSgpO1xuICAgICAgICAgICAgaWYgKHJlZldlZWtkYXkgPT0gV2Vla2RheS5TVU5EQVkgfHwgcmVmV2Vla2RheSA9PSBXZWVrZGF5LlNBVFVSREFZKSB7XG4gICAgICAgICAgICAgICAgd2Vla2RheSA9IG1vZGlmaWVyID09IFwibGFzdFwiID8gV2Vla2RheS5GUklEQVkgOiBXZWVrZGF5Lk1PTkRBWTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2Vla2RheSA9IHJlZldlZWtkYXkgLSAxO1xuICAgICAgICAgICAgICAgIHdlZWtkYXkgPSBtb2RpZmllciA9PSBcImxhc3RcIiA/IHdlZWtkYXkgLSAxIDogd2Vla2RheSArIDE7XG4gICAgICAgICAgICAgICAgd2Vla2RheSA9ICh3ZWVrZGF5ICUgNSkgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY3JlYXRlUGFyc2luZ0NvbXBvbmVudHNBdFdlZWtkYXkoY29udGV4dC5yZWZlcmVuY2UsIHdlZWtkYXksIG1vZGlmaWVyKTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgVElNRV9VTklUX0RJQ1RJT05BUlkgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBQYXJzaW5nQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi9jaHJvbm9cIjtcbmltcG9ydCB7IFBhcnNpbmdDb21wb25lbnRzIH0gZnJvbSBcIi4uLy4uLy4uL3Jlc3VsdHNcIjtcbmltcG9ydCBkYXlqcyBmcm9tIFwiZGF5anNcIjtcbmltcG9ydCB7IEFic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeUNoZWNraW5nIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYXJzZXJzL0Fic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeVwiO1xuaW1wb3J0IHsgbWF0Y2hBbnlQYXR0ZXJuIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3BhdHRlcm5cIjtcblxuY29uc3QgUEFUVEVSTiA9IG5ldyBSZWdFeHAoXG4gICAgYCh0aGlzfGxhc3R8cGFzdHxuZXh0fGFmdGVyXFxcXHMqdGhpcylcXFxccyooJHttYXRjaEFueVBhdHRlcm4oVElNRV9VTklUX0RJQ1RJT05BUlkpfSkoPz1cXFxccyopYCArIFwiKD89XFxcXFd8JClcIixcbiAgICBcImlcIlxuKTtcblxuY29uc3QgTU9ESUZJRVJfV09SRF9HUk9VUCA9IDE7XG5jb25zdCBSRUxBVElWRV9XT1JEX0dST1VQID0gMjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRU5SZWxhdGl2ZURhdGVGb3JtYXRQYXJzZXIgZXh0ZW5kcyBBYnN0cmFjdFBhcnNlcldpdGhXb3JkQm91bmRhcnlDaGVja2luZyB7XG4gICAgaW5uZXJQYXR0ZXJuKCk6IFJlZ0V4cCB7XG4gICAgICAgIHJldHVybiBQQVRURVJOO1xuICAgIH1cblxuICAgIGlubmVyRXh0cmFjdChjb250ZXh0OiBQYXJzaW5nQ29udGV4dCwgbWF0Y2g6IFJlZ0V4cE1hdGNoQXJyYXkpOiBQYXJzaW5nQ29tcG9uZW50cyB7XG4gICAgICAgIGNvbnN0IG1vZGlmaWVyID0gbWF0Y2hbTU9ESUZJRVJfV09SRF9HUk9VUF0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgdW5pdFdvcmQgPSBtYXRjaFtSRUxBVElWRV9XT1JEX0dST1VQXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCB0aW1ldW5pdCA9IFRJTUVfVU5JVF9ESUNUSU9OQVJZW3VuaXRXb3JkXTtcblxuICAgICAgICBpZiAobW9kaWZpZXIgPT0gXCJuZXh0XCIgfHwgbW9kaWZpZXIuc3RhcnRzV2l0aChcImFmdGVyXCIpKSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lVW5pdHMgPSB7fTtcbiAgICAgICAgICAgIHRpbWVVbml0c1t0aW1ldW5pdF0gPSAxO1xuICAgICAgICAgICAgcmV0dXJuIFBhcnNpbmdDb21wb25lbnRzLmNyZWF0ZVJlbGF0aXZlRnJvbVJlZmVyZW5jZShjb250ZXh0LnJlZmVyZW5jZSwgdGltZVVuaXRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb2RpZmllciA9PSBcImxhc3RcIiB8fCBtb2RpZmllciA9PSBcInBhc3RcIikge1xuICAgICAgICAgICAgY29uc3QgdGltZVVuaXRzID0ge307XG4gICAgICAgICAgICB0aW1lVW5pdHNbdGltZXVuaXRdID0gLTE7XG4gICAgICAgICAgICByZXR1cm4gUGFyc2luZ0NvbXBvbmVudHMuY3JlYXRlUmVsYXRpdmVGcm9tUmVmZXJlbmNlKGNvbnRleHQucmVmZXJlbmNlLCB0aW1lVW5pdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IGNvbnRleHQuY3JlYXRlUGFyc2luZ0NvbXBvbmVudHMoKTtcbiAgICAgICAgbGV0IGRhdGUgPSBkYXlqcyhjb250ZXh0LnJlZmVyZW5jZS5pbnN0YW50KTtcblxuICAgICAgICAvLyBUaGlzIHdlZWtcbiAgICAgICAgaWYgKHVuaXRXb3JkLm1hdGNoKC93ZWVrL2kpKSB7XG4gICAgICAgICAgICBkYXRlID0gZGF0ZS5hZGQoLWRhdGUuZ2V0KFwiZFwiKSwgXCJkXCIpO1xuICAgICAgICAgICAgY29tcG9uZW50cy5pbXBseShcImRheVwiLCBkYXRlLmRhdGUoKSk7XG4gICAgICAgICAgICBjb21wb25lbnRzLmltcGx5KFwibW9udGhcIiwgZGF0ZS5tb250aCgpICsgMSk7XG4gICAgICAgICAgICBjb21wb25lbnRzLmltcGx5KFwieWVhclwiLCBkYXRlLnllYXIoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGlzIG1vbnRoXG4gICAgICAgIGVsc2UgaWYgKHVuaXRXb3JkLm1hdGNoKC9tb250aC9pKSkge1xuICAgICAgICAgICAgZGF0ZSA9IGRhdGUuYWRkKC1kYXRlLmRhdGUoKSArIDEsIFwiZFwiKTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMuaW1wbHkoXCJkYXlcIiwgZGF0ZS5kYXRlKCkpO1xuICAgICAgICAgICAgY29tcG9uZW50cy5hc3NpZ24oXCJ5ZWFyXCIsIGRhdGUueWVhcigpKTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMuYXNzaWduKFwibW9udGhcIiwgZGF0ZS5tb250aCgpICsgMSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGlzIHllYXJcbiAgICAgICAgZWxzZSBpZiAodW5pdFdvcmQubWF0Y2goL3llYXIvaSkpIHtcbiAgICAgICAgICAgIGRhdGUgPSBkYXRlLmFkZCgtZGF0ZS5kYXRlKCkgKyAxLCBcImRcIik7XG4gICAgICAgICAgICBkYXRlID0gZGF0ZS5hZGQoLWRhdGUubW9udGgoKSwgXCJtb250aFwiKTtcblxuICAgICAgICAgICAgY29tcG9uZW50cy5pbXBseShcImRheVwiLCBkYXRlLmRhdGUoKSk7XG4gICAgICAgICAgICBjb21wb25lbnRzLmltcGx5KFwibW9udGhcIiwgZGF0ZS5tb250aCgpICsgMSk7XG4gICAgICAgICAgICBjb21wb25lbnRzLmFzc2lnbihcInllYXJcIiwgZGF0ZS55ZWFyKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudHM7XG4gICAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlciwgUGFyc2luZ0NvbnRleHQgfSBmcm9tIFwiLi4vLi4vY2hyb25vXCI7XG5pbXBvcnQgeyBQYXJzaW5nUmVzdWx0IH0gZnJvbSBcIi4uLy4uL3Jlc3VsdHNcIjtcbmltcG9ydCB7IGZpbmRNb3N0TGlrZWx5QURZZWFyLCBmaW5kWWVhckNsb3Nlc3RUb1JlZiB9IGZyb20gXCIuLi8uLi9jYWxjdWxhdGlvbi95ZWFyc1wiO1xuXG4vKipcbiAqIERhdGUgZm9ybWF0IHdpdGggc2xhc2ggXCIvXCIgKG9yIGRvdCBcIi5cIikgYmV0d2VlbiBudW1iZXJzLlxuICogRm9yIGV4YW1wbGVzOlxuICogLSA3LzEwXG4gKiAtIDcvMTIvMjAyMFxuICogLSA3LjEyLjIwMjBcbiAqL1xuY29uc3QgUEFUVEVSTiA9IG5ldyBSZWdFeHAoXG4gICAgXCIoW15cXFxcZF18XilcIiArXG4gICAgICAgIFwiKFswLTNdezAsMX1bMC05XXsxfSlbXFxcXC9cXFxcLlxcXFwtXShbMC0zXXswLDF9WzAtOV17MX0pXCIgK1xuICAgICAgICBcIig/OltcXFxcL1xcXFwuXFxcXC1dKFswLTldezR9fFswLTldezJ9KSk/XCIgK1xuICAgICAgICBcIihcXFxcV3wkKVwiLFxuICAgIFwiaVwiXG4pO1xuXG5jb25zdCBPUEVOSU5HX0dST1VQID0gMTtcbmNvbnN0IEVORElOR19HUk9VUCA9IDU7XG5cbmNvbnN0IEZJUlNUX05VTUJFUlNfR1JPVVAgPSAyO1xuY29uc3QgU0VDT05EX05VTUJFUlNfR1JPVVAgPSAzO1xuXG5jb25zdCBZRUFSX0dST1VQID0gNDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xhc2hEYXRlRm9ybWF0UGFyc2VyIGltcGxlbWVudHMgUGFyc2VyIHtcbiAgICBncm91cE51bWJlck1vbnRoOiBudW1iZXI7XG4gICAgZ3JvdXBOdW1iZXJEYXk6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKGxpdHRsZUVuZGlhbjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmdyb3VwTnVtYmVyTW9udGggPSBsaXR0bGVFbmRpYW4gPyBTRUNPTkRfTlVNQkVSU19HUk9VUCA6IEZJUlNUX05VTUJFUlNfR1JPVVA7XG4gICAgICAgIHRoaXMuZ3JvdXBOdW1iZXJEYXkgPSBsaXR0bGVFbmRpYW4gPyBGSVJTVF9OVU1CRVJTX0dST1VQIDogU0VDT05EX05VTUJFUlNfR1JPVVA7XG4gICAgfVxuXG4gICAgcGF0dGVybigpOiBSZWdFeHAge1xuICAgICAgICByZXR1cm4gUEFUVEVSTjtcbiAgICB9XG5cbiAgICBleHRyYWN0KGNvbnRleHQ6IFBhcnNpbmdDb250ZXh0LCBtYXRjaDogUmVnRXhwTWF0Y2hBcnJheSk6IFBhcnNpbmdSZXN1bHQge1xuICAgICAgICAvLyBCZWNhdXNlIG9mIGhvdyBwYXR0ZXJuIGlzIGV4ZWN1dGVkIG9uIHJlbWFpbmluZyB0ZXh0IGluIGBjaHJvbm8udHNgLCB0aGUgY2hhcmFjdGVyIGJlZm9yZSB0aGUgbWF0Y2ggY291bGRcbiAgICAgICAgLy8gc3RpbGwgYmUgYSBudW1iZXIgKGUuZy4gWFtYL1lZL1paXSBvciBYWFsvWVkvWlpdIG9yIFtYWC9ZWS9dWlopLiBXZSB3YW50IHRvIGNoZWNrIGFuZCBza2lwIHRoZW0uXG4gICAgICAgIGNvbnN0IGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFtPUEVOSU5HX0dST1VQXS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGluZGV4RW5kID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFtFTkRJTkdfR1JPVVBdLmxlbmd0aDtcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgY29uc3QgdGV4dEJlZm9yZSA9IGNvbnRleHQudGV4dC5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICAgICAgICAgICAgaWYgKHRleHRCZWZvcmUubWF0Y2goXCJcXFxcZC8/JFwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXhFbmQgPCBjb250ZXh0LnRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0QWZ0ZXIgPSBjb250ZXh0LnRleHQuc3Vic3RyaW5nKGluZGV4RW5kKTtcbiAgICAgICAgICAgIGlmICh0ZXh0QWZ0ZXIubWF0Y2goXCJeLz9cXFxcZFwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRleHQgPSBjb250ZXh0LnRleHQuc3Vic3RyaW5nKGluZGV4LCBpbmRleEVuZCk7XG5cbiAgICAgICAgLy8gJzEuMTInLCAnMS4xMi4xMicgaXMgbW9yZSBsaWtlIGEgdmVyc2lvbiBudW1iZXJzXG4gICAgICAgIGlmICh0ZXh0Lm1hdGNoKC9eXFxkXFwuXFxkJC8pIHx8IHRleHQubWF0Y2goL15cXGRcXC5cXGR7MSwyfVxcLlxcZHsxLDJ9XFxzKiQvKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTU0vZGQgLT4gT0tcbiAgICAgICAgLy8gTU0uZGQgLT4gTkdcbiAgICAgICAgaWYgKCFtYXRjaFtZRUFSX0dST1VQXSAmJiB0ZXh0LmluZGV4T2YoXCIvXCIpIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gY29udGV4dC5jcmVhdGVQYXJzaW5nUmVzdWx0KGluZGV4LCB0ZXh0KTtcbiAgICAgICAgbGV0IG1vbnRoID0gcGFyc2VJbnQobWF0Y2hbdGhpcy5ncm91cE51bWJlck1vbnRoXSk7XG4gICAgICAgIGxldCBkYXkgPSBwYXJzZUludChtYXRjaFt0aGlzLmdyb3VwTnVtYmVyRGF5XSk7XG4gICAgICAgIGlmIChtb250aCA8IDEgfHwgbW9udGggPiAxMikge1xuICAgICAgICAgICAgaWYgKG1vbnRoID4gMTIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF5ID49IDEgJiYgZGF5IDw9IDEyICYmIG1vbnRoIDw9IDMxKSB7XG4gICAgICAgICAgICAgICAgICAgIFtkYXksIG1vbnRoXSA9IFttb250aCwgZGF5XTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF5IDwgMSB8fCBkYXkgPiAzMSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKFwiZGF5XCIsIGRheSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oXCJtb250aFwiLCBtb250aCk7XG5cbiAgICAgICAgaWYgKG1hdGNoW1lFQVJfR1JPVVBdKSB7XG4gICAgICAgICAgICBjb25zdCByYXdZZWFyTnVtYmVyID0gcGFyc2VJbnQobWF0Y2hbWUVBUl9HUk9VUF0pO1xuICAgICAgICAgICAgY29uc3QgeWVhciA9IGZpbmRNb3N0TGlrZWx5QURZZWFyKHJhd1llYXJOdW1iZXIpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbihcInllYXJcIiwgeWVhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB5ZWFyID0gZmluZFllYXJDbG9zZXN0VG9SZWYoY29udGV4dC5yZWZEYXRlLCBkYXksIG1vbnRoKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseShcInllYXJcIiwgeWVhcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0LmFkZFRhZyhcInBhcnNlci9TbGFzaERhdGVGb3JtYXRQYXJzZXJcIik7XG4gICAgfVxufVxuIiwgImltcG9ydCB7IFRJTUVfVU5JVFNfUEFUVEVSTiwgcGFyc2VUaW1lVW5pdHMsIFRJTUVfVU5JVFNfTk9fQUJCUl9QQVRURVJOIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgUGFyc2luZ0NvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vY2hyb25vXCI7XG5pbXBvcnQgeyBQYXJzaW5nQ29tcG9uZW50cyB9IGZyb20gXCIuLi8uLi8uLi9yZXN1bHRzXCI7XG5pbXBvcnQgeyBBYnN0cmFjdFBhcnNlcldpdGhXb3JkQm91bmRhcnlDaGVja2luZyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFyc2Vycy9BYnN0cmFjdFBhcnNlcldpdGhXb3JkQm91bmRhcnlcIjtcbmltcG9ydCB7IHJldmVyc2VUaW1lVW5pdHMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdGltZXVuaXRzXCI7XG5cbmNvbnN0IFBBVFRFUk4gPSBuZXcgUmVnRXhwKGAodGhpc3xsYXN0fHBhc3R8bmV4dHxhZnRlcnxcXFxcK3wtKVxcXFxzKigke1RJTUVfVU5JVFNfUEFUVEVSTn0pKD89XFxcXFd8JClgLCBcImlcIik7XG5jb25zdCBQQVRURVJOX05PX0FCQlIgPSBuZXcgUmVnRXhwKFxuICAgIGAodGhpc3xsYXN0fHBhc3R8bmV4dHxhZnRlcnxcXFxcK3wtKVxcXFxzKigke1RJTUVfVU5JVFNfTk9fQUJCUl9QQVRURVJOfSkoPz1cXFxcV3wkKWAsXG4gICAgXCJpXCJcbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVOVGltZVVuaXRDYXN1YWxSZWxhdGl2ZUZvcm1hdFBhcnNlciBleHRlbmRzIEFic3RyYWN0UGFyc2VyV2l0aFdvcmRCb3VuZGFyeUNoZWNraW5nIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFsbG93QWJicmV2aWF0aW9uczogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBpbm5lclBhdHRlcm4oKTogUmVnRXhwIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxsb3dBYmJyZXZpYXRpb25zID8gUEFUVEVSTiA6IFBBVFRFUk5fTk9fQUJCUjtcbiAgICB9XG5cbiAgICBpbm5lckV4dHJhY3QoY29udGV4dDogUGFyc2luZ0NvbnRleHQsIG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5KSB7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGxldCB0aW1lVW5pdHMgPSBwYXJzZVRpbWVVbml0cyhtYXRjaFsyXSk7XG4gICAgICAgIGlmICghdGltZVVuaXRzKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHByZWZpeCkge1xuICAgICAgICAgICAgY2FzZSBcImxhc3RcIjpcbiAgICAgICAgICAgIGNhc2UgXCJwYXN0XCI6XG4gICAgICAgICAgICBjYXNlIFwiLVwiOlxuICAgICAgICAgICAgICAgIHRpbWVVbml0cyA9IHJldmVyc2VUaW1lVW5pdHModGltZVVuaXRzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUGFyc2luZ0NvbXBvbmVudHMuY3JlYXRlUmVsYXRpdmVGcm9tUmVmZXJlbmNlKGNvbnRleHQucmVmZXJlbmNlLCB0aW1lVW5pdHMpO1xuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBNZXJnaW5nUmVmaW5lciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vYWJzdHJhY3RSZWZpbmVyc1wiO1xuaW1wb3J0IHsgUGFyc2luZ0NvbXBvbmVudHMsIFBhcnNpbmdSZXN1bHQsIFJlZmVyZW5jZVdpdGhUaW1lem9uZSB9IGZyb20gXCIuLi8uLi8uLi9yZXN1bHRzXCI7XG5pbXBvcnQgeyBwYXJzZVRpbWVVbml0cyB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IHJldmVyc2VUaW1lVW5pdHMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdGltZXVuaXRzXCI7XG5cbmZ1bmN0aW9uIElzUG9zaXRpdmVGb2xsb3dpbmdSZWZlcmVuY2UocmVzdWx0OiBQYXJzaW5nUmVzdWx0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJlc3VsdC50ZXh0Lm1hdGNoKC9eWystXS9pKSAhPSBudWxsO1xufVxuXG5mdW5jdGlvbiBJc05lZ2F0aXZlRm9sbG93aW5nUmVmZXJlbmNlKHJlc3VsdDogUGFyc2luZ1Jlc3VsdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiByZXN1bHQudGV4dC5tYXRjaCgvXi0vaSkgIT0gbnVsbDtcbn1cblxuLyoqXG4gKiBNZXJnZXMgYSByZWxhdGl2ZSBkYXRhL3RpbWUgdGhhdCBjb21lcyBhZnRlciBhbiBhYnNvbHV0ZSBkYXRlLlxuICogLSBbMjAyMC0wMi0xM10gWysyIHdlZWtzXVxuICogLSBbbmV4dCB0dWVzZGF5XSBbKzEwIGRheXNdXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVOTWVyZ2VSZWxhdGl2ZUFmdGVyRGF0ZVJlZmluZXIgZXh0ZW5kcyBNZXJnaW5nUmVmaW5lciB7XG4gICAgc2hvdWxkTWVyZ2VSZXN1bHRzKHRleHRCZXR3ZWVuOiBzdHJpbmcsIGN1cnJlbnRSZXN1bHQ6IFBhcnNpbmdSZXN1bHQsIG5leHRSZXN1bHQ6IFBhcnNpbmdSZXN1bHQpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCF0ZXh0QmV0d2Vlbi5tYXRjaCgvXlxccyokL2kpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gSXNQb3NpdGl2ZUZvbGxvd2luZ1JlZmVyZW5jZShuZXh0UmVzdWx0KSB8fCBJc05lZ2F0aXZlRm9sbG93aW5nUmVmZXJlbmNlKG5leHRSZXN1bHQpO1xuICAgIH1cblxuICAgIG1lcmdlUmVzdWx0cyh0ZXh0QmV0d2Vlbjogc3RyaW5nLCBjdXJyZW50UmVzdWx0OiBQYXJzaW5nUmVzdWx0LCBuZXh0UmVzdWx0OiBQYXJzaW5nUmVzdWx0LCBjb250ZXh0KTogUGFyc2luZ1Jlc3VsdCB7XG4gICAgICAgIGxldCB0aW1lVW5pdHMgPSBwYXJzZVRpbWVVbml0cyhuZXh0UmVzdWx0LnRleHQpO1xuICAgICAgICBpZiAoSXNOZWdhdGl2ZUZvbGxvd2luZ1JlZmVyZW5jZShuZXh0UmVzdWx0KSkge1xuICAgICAgICAgICAgdGltZVVuaXRzID0gcmV2ZXJzZVRpbWVVbml0cyh0aW1lVW5pdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IFBhcnNpbmdDb21wb25lbnRzLmNyZWF0ZVJlbGF0aXZlRnJvbVJlZmVyZW5jZShcbiAgICAgICAgICAgIG5ldyBSZWZlcmVuY2VXaXRoVGltZXpvbmUoY3VycmVudFJlc3VsdC5zdGFydC5kYXRlKCkpLFxuICAgICAgICAgICAgdGltZVVuaXRzXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQYXJzaW5nUmVzdWx0KFxuICAgICAgICAgICAgY3VycmVudFJlc3VsdC5yZWZlcmVuY2UsXG4gICAgICAgICAgICBjdXJyZW50UmVzdWx0LmluZGV4LFxuICAgICAgICAgICAgYCR7Y3VycmVudFJlc3VsdC50ZXh0fSR7dGV4dEJldHdlZW59JHtuZXh0UmVzdWx0LnRleHR9YCxcbiAgICAgICAgICAgIGNvbXBvbmVudHNcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgTWVyZ2luZ1JlZmluZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2Fic3RyYWN0UmVmaW5lcnNcIjtcbmltcG9ydCB7IFBhcnNpbmdDb21wb25lbnRzLCBQYXJzaW5nUmVzdWx0LCBSZWZlcmVuY2VXaXRoVGltZXpvbmUgfSBmcm9tIFwiLi4vLi4vLi4vcmVzdWx0c1wiO1xuaW1wb3J0IHsgcGFyc2VUaW1lVW5pdHMgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyByZXZlcnNlVGltZVVuaXRzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RpbWV1bml0c1wiO1xuXG5mdW5jdGlvbiBoYXNJbXBsaWVkRWFybGllclJlZmVyZW5jZURhdGUocmVzdWx0OiBQYXJzaW5nUmVzdWx0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJlc3VsdC50ZXh0Lm1hdGNoKC9cXHMrKGJlZm9yZXxmcm9tKSQvaSkgIT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaGFzSW1wbGllZExhdGVyUmVmZXJlbmNlRGF0ZShyZXN1bHQ6IFBhcnNpbmdSZXN1bHQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcmVzdWx0LnRleHQubWF0Y2goL1xccysoYWZ0ZXJ8c2luY2UpJC9pKSAhPSBudWxsO1xufVxuXG4vKipcbiAqIE1lcmdlcyBhIHJlbGF0aXZlIGRhdGEvdGltZSB0aGF0IGZvbGxvdyBieSBhbiBhYnNvbHV0ZSBkYXRlLlxuICogLSBbMiB3ZWVrcyBiZWZvcmVdIFsyMDIwLTAyLTEzXVxuICogLSBbMiBkYXlzIGFmdGVyXSBbbmV4dCBGcmlkYXldXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVOTWVyZ2VSZWxhdGl2ZUZvbGxvd0J5RGF0ZVJlZmluZXIgZXh0ZW5kcyBNZXJnaW5nUmVmaW5lciB7XG4gICAgcGF0dGVybkJldHdlZW4oKTogUmVnRXhwIHtcbiAgICAgICAgcmV0dXJuIC9eXFxzKiQvaTtcbiAgICB9XG5cbiAgICBzaG91bGRNZXJnZVJlc3VsdHModGV4dEJldHdlZW46IHN0cmluZywgY3VycmVudFJlc3VsdDogUGFyc2luZ1Jlc3VsdCwgbmV4dFJlc3VsdDogUGFyc2luZ1Jlc3VsdCk6IGJvb2xlYW4ge1xuICAgICAgICAvLyBEYXRlcyBuZWVkIHRvIGJlIG5leHQgdG8gZWFjaCBvdGhlciB0byBnZXQgbWVyZ2VkXG4gICAgICAgIGlmICghdGV4dEJldHdlZW4ubWF0Y2godGhpcy5wYXR0ZXJuQmV0d2VlbigpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgYW55IHJlbGF0aXZlIHRva2VucyB3ZXJlIHN3YWxsb3dlZCBieSB0aGUgZmlyc3QgZGF0ZS5cbiAgICAgICAgLy8gRS5nLiBbPHJlbGF0aXZlX2RhdGUxPiBmcm9tXSBbPGRhdGUyPl1cbiAgICAgICAgaWYgKCFoYXNJbXBsaWVkRWFybGllclJlZmVyZW5jZURhdGUoY3VycmVudFJlc3VsdCkgJiYgIWhhc0ltcGxpZWRMYXRlclJlZmVyZW5jZURhdGUoY3VycmVudFJlc3VsdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IDxkYXRlMj4gaW1wbGllcyBhbiBhYnNvbHV0ZSBkYXRlXG4gICAgICAgIHJldHVybiAhIW5leHRSZXN1bHQuc3RhcnQuZ2V0KFwiZGF5XCIpICYmICEhbmV4dFJlc3VsdC5zdGFydC5nZXQoXCJtb250aFwiKSAmJiAhIW5leHRSZXN1bHQuc3RhcnQuZ2V0KFwieWVhclwiKTtcbiAgICB9XG5cbiAgICBtZXJnZVJlc3VsdHModGV4dEJldHdlZW46IHN0cmluZywgY3VycmVudFJlc3VsdDogUGFyc2luZ1Jlc3VsdCwgbmV4dFJlc3VsdDogUGFyc2luZ1Jlc3VsdCk6IFBhcnNpbmdSZXN1bHQge1xuICAgICAgICBsZXQgdGltZVVuaXRzID0gcGFyc2VUaW1lVW5pdHMoY3VycmVudFJlc3VsdC50ZXh0KTtcbiAgICAgICAgaWYgKGhhc0ltcGxpZWRFYXJsaWVyUmVmZXJlbmNlRGF0ZShjdXJyZW50UmVzdWx0KSkge1xuICAgICAgICAgICAgdGltZVVuaXRzID0gcmV2ZXJzZVRpbWVVbml0cyh0aW1lVW5pdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IFBhcnNpbmdDb21wb25lbnRzLmNyZWF0ZVJlbGF0aXZlRnJvbVJlZmVyZW5jZShcbiAgICAgICAgICAgIG5ldyBSZWZlcmVuY2VXaXRoVGltZXpvbmUobmV4dFJlc3VsdC5zdGFydC5kYXRlKCkpLFxuICAgICAgICAgICAgdGltZVVuaXRzXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQYXJzaW5nUmVzdWx0KFxuICAgICAgICAgICAgbmV4dFJlc3VsdC5yZWZlcmVuY2UsXG4gICAgICAgICAgICBjdXJyZW50UmVzdWx0LmluZGV4LFxuICAgICAgICAgICAgYCR7Y3VycmVudFJlc3VsdC50ZXh0fSR7dGV4dEJldHdlZW59JHtuZXh0UmVzdWx0LnRleHR9YCxcbiAgICAgICAgICAgIGNvbXBvbmVudHNcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2luZ0NvbnRleHQsIFJlZmluZXIgfSBmcm9tIFwiLi4vLi4vLi4vY2hyb25vXCI7XG5pbXBvcnQgeyBQYXJzaW5nUmVzdWx0IH0gZnJvbSBcIi4uLy4uLy4uL3Jlc3VsdHNcIjtcbmltcG9ydCB7IFlFQVJfUEFUVEVSTiwgcGFyc2VZZWFyIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuXG5jb25zdCBZRUFSX1NVRkZJWF9QQVRURVJOID0gbmV3IFJlZ0V4cChgXlxcXFxzKigke1lFQVJfUEFUVEVSTn0pYCwgXCJpXCIpO1xuY29uc3QgWUVBUl9HUk9VUCA9IDE7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFTkV4dHJhY3RZZWFyU3VmZml4UmVmaW5lciBpbXBsZW1lbnRzIFJlZmluZXIge1xuICAgIHJlZmluZShjb250ZXh0OiBQYXJzaW5nQ29udGV4dCwgcmVzdWx0czogUGFyc2luZ1Jlc3VsdFtdKTogUGFyc2luZ1Jlc3VsdFtdIHtcbiAgICAgICAgcmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmICghcmVzdWx0LnN0YXJ0LmlzRGF0ZVdpdGhVbmtub3duWWVhcigpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBzdWZmaXggPSBjb250ZXh0LnRleHQuc3Vic3RyaW5nKHJlc3VsdC5pbmRleCArIHJlc3VsdC50ZXh0Lmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCBtYXRjaCA9IFlFQVJfU1VGRklYX1BBVFRFUk4uZXhlYyhzdWZmaXgpO1xuICAgICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udGV4dC5kZWJ1ZygoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEV4dHJhY3RpbmcgeWVhcjogJyR7bWF0Y2hbMF19JyBpbnRvIDogJHtyZXN1bHR9YCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgeWVhciA9IHBhcnNlWWVhcihtYXRjaFtZRUFSX0dST1VQXSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmVuZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oXCJ5ZWFyXCIsIHllYXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbihcInllYXJcIiwgeWVhcik7XG4gICAgICAgICAgICByZXN1bHQudGV4dCArPSBtYXRjaFswXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxufVxuIiwgImltcG9ydCB7IEZpbHRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vYWJzdHJhY3RSZWZpbmVyc1wiO1xuaW1wb3J0IHsgUGFyc2luZ1Jlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi9yZXN1bHRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVOVW5saWtlbHlGb3JtYXRGaWx0ZXIgZXh0ZW5kcyBGaWx0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGlzVmFsaWQoY29udGV4dCwgcmVzdWx0OiBQYXJzaW5nUmVzdWx0KTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHRleHQgPSByZXN1bHQudGV4dC50cmltKCk7XG5cbiAgICAgICAgLy8gSWYgdGhlIHJlc3VsdCBpcyBjb25zaXN0cyBvZiB0aGUgd2hvbGUgdGV4dCAoZS5nLiBcIjIwMjRcIiwgXCJNYXlcIiwgZXRjKSxcbiAgICAgICAgLy8gdGhlbiBpdCBpcyB1bmxpa2VseSB0byBiZSBhIGRhdGUuXG4gICAgICAgIGlmICh0ZXh0ID09PSBjb250ZXh0LnRleHQudHJpbSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluIEVuZ2xpc2gsIHRoZSB3b3JkIFwibWF5XCIgaXMgYSBtb250aCBuYW1lLCBidXQgaXQgaXMgYWxzbyBhIG1vZGFsIHZlcmIuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSB0ZXh0IGJlZm9yZSBcIm1heVwiIGZvbGxvd3Mgc29tZSBhbGxvd2VkIHBhdHRlcm5zLlxuICAgICAgICBpZiAodGV4dC50b0xvd2VyQ2FzZSgpID09PSBcIm1heVwiKSB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0QmVmb3JlID0gY29udGV4dC50ZXh0LnN1YnN0cmluZygwLCByZXN1bHQuaW5kZXgpLnRyaW0oKTtcbiAgICAgICAgICAgIGlmICghdGV4dEJlZm9yZS5tYXRjaCgvXFxiKGluKSQvaSkpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmRlYnVnKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFJlbW92aW5nIHVubGlrZWx5IHJlc3VsdDogJHtyZXN1bHR9YCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbiBFbmdsaXNoLCBcInRoZSBzZWNvbmRcIiBjb3VsZCByZWZlciB0byB0aGUgb3JkaW5hbCBudW1iZXIgb3IgdGltZXVuaXQuXG4gICAgICAgIGlmICh0ZXh0LnRvTG93ZXJDYXNlKCkuZW5kc1dpdGgoXCJ0aGUgc2Vjb25kXCIpKSB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0QWZ0ZXIgPSBjb250ZXh0LnRleHQuc3Vic3RyaW5nKHJlc3VsdC5pbmRleCArIHJlc3VsdC50ZXh0Lmxlbmd0aCkudHJpbSgpO1xuICAgICAgICAgICAgaWYgKHRleHRBZnRlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5kZWJ1ZygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZW1vdmluZyB1bmxpa2VseSByZXN1bHQ6ICR7cmVzdWx0fWApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuIiwgImltcG9ydCB7IENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi4vLi4vY2hyb25vXCI7XG5cbmltcG9ydCBFTlRpbWVVbml0V2l0aGluRm9ybWF0UGFyc2VyIGZyb20gXCIuL3BhcnNlcnMvRU5UaW1lVW5pdFdpdGhpbkZvcm1hdFBhcnNlclwiO1xuaW1wb3J0IEVOTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyIGZyb20gXCIuL3BhcnNlcnMvRU5Nb250aE5hbWVMaXR0bGVFbmRpYW5QYXJzZXJcIjtcbmltcG9ydCBFTk1vbnRoTmFtZU1pZGRsZUVuZGlhblBhcnNlciBmcm9tIFwiLi9wYXJzZXJzL0VOTW9udGhOYW1lTWlkZGxlRW5kaWFuUGFyc2VyXCI7XG5pbXBvcnQgRU5Nb250aE5hbWVQYXJzZXIgZnJvbSBcIi4vcGFyc2Vycy9FTk1vbnRoTmFtZVBhcnNlclwiO1xuaW1wb3J0IEVOWWVhck1vbnRoRGF5UGFyc2VyIGZyb20gXCIuL3BhcnNlcnMvRU5ZZWFyTW9udGhEYXlQYXJzZXJcIjtcbmltcG9ydCBFTlNsYXNoTW9udGhGb3JtYXRQYXJzZXIgZnJvbSBcIi4vcGFyc2Vycy9FTlNsYXNoTW9udGhGb3JtYXRQYXJzZXJcIjtcbmltcG9ydCBFTlRpbWVFeHByZXNzaW9uUGFyc2VyIGZyb20gXCIuL3BhcnNlcnMvRU5UaW1lRXhwcmVzc2lvblBhcnNlclwiO1xuaW1wb3J0IEVOVGltZVVuaXRBZ29Gb3JtYXRQYXJzZXIgZnJvbSBcIi4vcGFyc2Vycy9FTlRpbWVVbml0QWdvRm9ybWF0UGFyc2VyXCI7XG5pbXBvcnQgRU5UaW1lVW5pdExhdGVyRm9ybWF0UGFyc2VyIGZyb20gXCIuL3BhcnNlcnMvRU5UaW1lVW5pdExhdGVyRm9ybWF0UGFyc2VyXCI7XG5pbXBvcnQgRU5NZXJnZURhdGVSYW5nZVJlZmluZXIgZnJvbSBcIi4vcmVmaW5lcnMvRU5NZXJnZURhdGVSYW5nZVJlZmluZXJcIjtcbmltcG9ydCBFTk1lcmdlRGF0ZVRpbWVSZWZpbmVyIGZyb20gXCIuL3JlZmluZXJzL0VOTWVyZ2VEYXRlVGltZVJlZmluZXJcIjtcblxuaW1wb3J0IHsgaW5jbHVkZUNvbW1vbkNvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi4vLi4vY29uZmlndXJhdGlvbnNcIjtcbmltcG9ydCBFTkNhc3VhbERhdGVQYXJzZXIgZnJvbSBcIi4vcGFyc2Vycy9FTkNhc3VhbERhdGVQYXJzZXJcIjtcbmltcG9ydCBFTkNhc3VhbFRpbWVQYXJzZXIgZnJvbSBcIi4vcGFyc2Vycy9FTkNhc3VhbFRpbWVQYXJzZXJcIjtcbmltcG9ydCBFTldlZWtkYXlQYXJzZXIgZnJvbSBcIi4vcGFyc2Vycy9FTldlZWtkYXlQYXJzZXJcIjtcbmltcG9ydCBFTlJlbGF0aXZlRGF0ZUZvcm1hdFBhcnNlciBmcm9tIFwiLi9wYXJzZXJzL0VOUmVsYXRpdmVEYXRlRm9ybWF0UGFyc2VyXCI7XG5cbmltcG9ydCBTbGFzaERhdGVGb3JtYXRQYXJzZXIgZnJvbSBcIi4uLy4uL2NvbW1vbi9wYXJzZXJzL1NsYXNoRGF0ZUZvcm1hdFBhcnNlclwiO1xuaW1wb3J0IEVOVGltZVVuaXRDYXN1YWxSZWxhdGl2ZUZvcm1hdFBhcnNlciBmcm9tIFwiLi9wYXJzZXJzL0VOVGltZVVuaXRDYXN1YWxSZWxhdGl2ZUZvcm1hdFBhcnNlclwiO1xuaW1wb3J0IEVOTWVyZ2VSZWxhdGl2ZUFmdGVyRGF0ZVJlZmluZXIgZnJvbSBcIi4vcmVmaW5lcnMvRU5NZXJnZVJlbGF0aXZlQWZ0ZXJEYXRlUmVmaW5lclwiO1xuaW1wb3J0IEVOTWVyZ2VSZWxhdGl2ZUZvbGxvd0J5RGF0ZVJlZmluZXIgZnJvbSBcIi4vcmVmaW5lcnMvRU5NZXJnZVJlbGF0aXZlRm9sbG93QnlEYXRlUmVmaW5lclwiO1xuaW1wb3J0IE92ZXJsYXBSZW1vdmFsUmVmaW5lciBmcm9tIFwiLi4vLi4vY29tbW9uL3JlZmluZXJzL092ZXJsYXBSZW1vdmFsUmVmaW5lclwiO1xuaW1wb3J0IEVORXh0cmFjdFllYXJTdWZmaXhSZWZpbmVyIGZyb20gXCIuL3JlZmluZXJzL0VORXh0cmFjdFllYXJTdWZmaXhSZWZpbmVyXCI7XG5pbXBvcnQgRU5Vbmxpa2VseUZvcm1hdEZpbHRlciBmcm9tIFwiLi9yZWZpbmVycy9FTlVubGlrZWx5Rm9ybWF0RmlsdGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVORGVmYXVsdENvbmZpZ3VyYXRpb24ge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGRlZmF1bHQgKmNhc3VhbCoge0BMaW5rIENvbmZpZ3VyYXRpb259IGZvciBFbmdsaXNoIGNocm9uby5cbiAgICAgKiBJdCBjYWxscyB7QExpbmsgY3JlYXRlQ29uZmlndXJhdGlvbn0gYW5kIGluY2x1ZGVzIGFkZGl0aW9uYWwgcGFyc2Vycy5cbiAgICAgKi9cbiAgICBjcmVhdGVDYXN1YWxDb25maWd1cmF0aW9uKGxpdHRsZUVuZGlhbiA9IGZhbHNlKTogQ29uZmlndXJhdGlvbiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMuY3JlYXRlQ29uZmlndXJhdGlvbihmYWxzZSwgbGl0dGxlRW5kaWFuKTtcbiAgICAgICAgb3B0aW9uLnBhcnNlcnMucHVzaChuZXcgRU5DYXN1YWxEYXRlUGFyc2VyKCkpO1xuICAgICAgICBvcHRpb24ucGFyc2Vycy5wdXNoKG5ldyBFTkNhc3VhbFRpbWVQYXJzZXIoKSk7XG4gICAgICAgIG9wdGlvbi5wYXJzZXJzLnB1c2gobmV3IEVOTW9udGhOYW1lUGFyc2VyKCkpO1xuICAgICAgICBvcHRpb24ucGFyc2Vycy5wdXNoKG5ldyBFTlJlbGF0aXZlRGF0ZUZvcm1hdFBhcnNlcigpKTtcbiAgICAgICAgb3B0aW9uLnBhcnNlcnMucHVzaChuZXcgRU5UaW1lVW5pdENhc3VhbFJlbGF0aXZlRm9ybWF0UGFyc2VyKCkpO1xuICAgICAgICBvcHRpb24ucmVmaW5lcnMucHVzaChuZXcgRU5Vbmxpa2VseUZvcm1hdEZpbHRlcigpKTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBkZWZhdWx0IHtATGluayBDb25maWd1cmF0aW9ufSBmb3IgRW5nbGlzaCBjaHJvbm9cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzdHJpY3RNb2RlIElmIHRoZSB0aW1ldW5pdCBtZW50aW9uaW5nIHNob3VsZCBiZSBzdHJpY3QsIG5vdCBjYXN1YWxcbiAgICAgKiBAcGFyYW0gbGl0dGxlRW5kaWFuIElmIGZvcm1hdCBzaG91bGQgYmUgZGF0ZS1maXJzdC9saXR0bGVFbmRpYW4gKGUuZy4gZW5fVUspLCBub3QgbW9udGgtZmlyc3QvbWlkZGxlRW5kaWFuIChlLmcuIGVuX1VTKVxuICAgICAqL1xuICAgIGNyZWF0ZUNvbmZpZ3VyYXRpb24oc3RyaWN0TW9kZSA9IHRydWUsIGxpdHRsZUVuZGlhbiA9IGZhbHNlKTogQ29uZmlndXJhdGlvbiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBpbmNsdWRlQ29tbW9uQ29uZmlndXJhdGlvbihcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXJzZXJzOiBbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBTbGFzaERhdGVGb3JtYXRQYXJzZXIobGl0dGxlRW5kaWFuKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IEVOVGltZVVuaXRXaXRoaW5Gb3JtYXRQYXJzZXIoc3RyaWN0TW9kZSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBFTk1vbnRoTmFtZUxpdHRsZUVuZGlhblBhcnNlcigpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgRU5Nb250aE5hbWVNaWRkbGVFbmRpYW5QYXJzZXIoLypzaG91bGRTa2lwWWVhckxpa2VEYXRlPSovIGxpdHRsZUVuZGlhbiksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBFTldlZWtkYXlQYXJzZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IEVOU2xhc2hNb250aEZvcm1hdFBhcnNlcigpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgRU5UaW1lRXhwcmVzc2lvblBhcnNlcihzdHJpY3RNb2RlKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IEVOVGltZVVuaXRBZ29Gb3JtYXRQYXJzZXIoc3RyaWN0TW9kZSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBFTlRpbWVVbml0TGF0ZXJGb3JtYXRQYXJzZXIoc3RyaWN0TW9kZSksXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZWZpbmVyczogW25ldyBFTk1lcmdlRGF0ZVRpbWVSZWZpbmVyKCldLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0cmljdE1vZGVcbiAgICAgICAgKTtcbiAgICAgICAgb3B0aW9ucy5wYXJzZXJzLnVuc2hpZnQobmV3IEVOWWVhck1vbnRoRGF5UGFyc2VyKC8qc3RyaWN0TW9udGhEYXRlT3JkZXI9Ki8gc3RyaWN0TW9kZSkpO1xuXG4gICAgICAgIC8vIFRoZXNlIHJlbGF0aXZlLWRhdGVzIGNvbnNpZGVyYXRpb24gc2hvdWxkIGJlIGRvbmUgYmVmb3JlIG90aGVyIGNvbW1vbiByZWZpbmVycy5cbiAgICAgICAgb3B0aW9ucy5yZWZpbmVycy51bnNoaWZ0KG5ldyBFTk1lcmdlUmVsYXRpdmVGb2xsb3dCeURhdGVSZWZpbmVyKCkpO1xuICAgICAgICBvcHRpb25zLnJlZmluZXJzLnVuc2hpZnQobmV3IEVOTWVyZ2VSZWxhdGl2ZUFmdGVyRGF0ZVJlZmluZXIoKSk7XG4gICAgICAgIG9wdGlvbnMucmVmaW5lcnMudW5zaGlmdChuZXcgT3ZlcmxhcFJlbW92YWxSZWZpbmVyKCkpO1xuXG4gICAgICAgIC8vIFJlLWFwcGx5IHRoZSBkYXRlIHRpbWUgcmVmaW5lciBhZ2FpbiBhZnRlciB0aGUgdGltZXpvbmUgcmVmaW5lbWVudCBhbmQgZXhjbHVzaW9uIGluIGNvbW1vbiByZWZpbmVycy5cbiAgICAgICAgb3B0aW9ucy5yZWZpbmVycy5wdXNoKG5ldyBFTk1lcmdlRGF0ZVRpbWVSZWZpbmVyKCkpO1xuXG4gICAgICAgIC8vIEV4dHJhY3QgeWVhciBhZnRlciBtZXJnaW5nIGRhdGUgYW5kIHRpbWVcbiAgICAgICAgb3B0aW9ucy5yZWZpbmVycy5wdXNoKG5ldyBFTkV4dHJhY3RZZWFyU3VmZml4UmVmaW5lcigpKTtcblxuICAgICAgICAvLyBLZWVwIHRoZSBkYXRlIHJhbmdlIHJlZmluZXIgYXQgdGhlIGVuZCAoYWZ0ZXIgYWxsIG90aGVyIHJlZmluZW1lbnRzKS5cbiAgICAgICAgb3B0aW9ucy5yZWZpbmVycy5wdXNoKG5ldyBFTk1lcmdlRGF0ZVJhbmdlUmVmaW5lcigpKTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxufVxuIiwgImltcG9ydCB7IFJlZmVyZW5jZVdpdGhUaW1lem9uZSwgUGFyc2luZ0NvbXBvbmVudHMsIFBhcnNpbmdSZXN1bHQgfSBmcm9tIFwiLi9yZXN1bHRzXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIFBhcnNlZFJlc3VsdCwgUGFyc2luZ09wdGlvbiwgUGFyc2luZ1JlZmVyZW5jZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBBc3luY0RlYnVnQmxvY2ssIERlYnVnSGFuZGxlciB9IGZyb20gXCIuL2RlYnVnZ2luZ1wiO1xuaW1wb3J0IEVORGVmYXVsdENvbmZpZ3VyYXRpb24gZnJvbSBcIi4vbG9jYWxlcy9lbi9jb25maWd1cmF0aW9uXCI7XG5cbi8qKlxuICogQ2hyb25vIGNvbmZpZ3VyYXRpb24uXG4gKiBJdCBpcyBzaW1wbHkgYW4gb3JkZXJlZCBsaXN0IG9mIHBhcnNlcnMgYW5kIHJlZmluZXJzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlndXJhdGlvbiB7XG4gICAgcGFyc2VyczogUGFyc2VyW107XG4gICAgcmVmaW5lcnM6IFJlZmluZXJbXTtcbn1cblxuLyoqXG4gKiBBbiBhYnN0cmFjdGlvbiBmb3IgQ2hyb25vICpQYXJzZXIqLlxuICpcbiAqIEVhY2ggcGFyc2VyIHNob3VsZCByZWNvZ25pemUgYW5kIGhhbmRsZSBhIGNlcnRhaW4gZGF0ZSBmb3JtYXQuXG4gKiBDaHJvbm8gdXNlcyBtdWx0aXBsZSBwYXJzZXMgKGFuZCByZWZpbmVycykgdG9nZXRoZXIgZm9yIHBhcnNpbmcgdGhlIGlucHV0LlxuICpcbiAqIFRoZSBwYXJzZXIgaW1wbGVtZW50YXRpb24gbXVzdCBwcm92aWRlIHtATGluayBwYXR0ZXJuIHwgcGF0dGVybigpfSBmb3IgdGhlIGRhdGUgZm9ybWF0LlxuICpcbiAqIFRoZSB7QExpbmsgZXh0cmFjdCB8IGV4dHJhY3QoKX0gbWV0aG9kIGlzIGNhbGxlZCB3aXRoIHRoZSBwYXR0ZXJuJ3MgKm1hdGNoKi5cbiAqIFRoZSBtYXRjaGluZyBhbmQgZXh0cmFjdGluZyBpcyBjb250cm9sbGVkIGFuZCBhZGp1c3RlZCB0byBhdm9pZCBmb3Igb3ZlcmxhcHBpbmcgcmVzdWx0cy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQYXJzZXIge1xuICAgIHBhdHRlcm4oY29udGV4dDogUGFyc2luZ0NvbnRleHQpOiBSZWdFeHA7XG4gICAgZXh0cmFjdChcbiAgICAgICAgY29udGV4dDogUGFyc2luZ0NvbnRleHQsXG4gICAgICAgIG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5XG4gICAgKTogUGFyc2luZ0NvbXBvbmVudHMgfCBQYXJzaW5nUmVzdWx0IHwgeyBbYyBpbiBDb21wb25lbnRdPzogbnVtYmVyIH0gfCBudWxsO1xufVxuXG4vKipcbiAqIEEgYWJzdHJhY3Rpb24gZm9yIENocm9ubyAqUmVmaW5lciouXG4gKlxuICogRWFjaCByZWZpbmVyIHRha2VzIHRoZSBsaXN0IG9mIHJlc3VsdHMgKGZyb20gcGFyc2VycyBvciBvdGhlciByZWZpbmVycykgYW5kIHJldHVybnMgYW5vdGhlciBsaXN0IG9mIHJlc3VsdHMuXG4gKiBDaHJvbm8gYXBwbGllcyBlYWNoIHJlZmluZXIgaW4gb3JkZXIgYW5kIHJldHVybiB0aGUgb3V0cHV0IGZyb20gdGhlIGxhc3QgcmVmaW5lci5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZWZpbmVyIHtcbiAgICByZWZpbmU6IChjb250ZXh0OiBQYXJzaW5nQ29udGV4dCwgcmVzdWx0czogUGFyc2luZ1Jlc3VsdFtdKSA9PiBQYXJzaW5nUmVzdWx0W107XG59XG5cbi8qKlxuICogVGhlIENocm9ubyBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBDaHJvbm8ge1xuICAgIHBhcnNlcnM6IEFycmF5PFBhcnNlcj47XG4gICAgcmVmaW5lcnM6IEFycmF5PFJlZmluZXI+O1xuXG4gICAgZGVmYXVsdENvbmZpZyA9IG5ldyBFTkRlZmF1bHRDb25maWd1cmF0aW9uKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWd1cmF0aW9uPzogQ29uZmlndXJhdGlvbikge1xuICAgICAgICBjb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbiB8fCB0aGlzLmRlZmF1bHRDb25maWcuY3JlYXRlQ2FzdWFsQ29uZmlndXJhdGlvbigpO1xuICAgICAgICB0aGlzLnBhcnNlcnMgPSBbLi4uY29uZmlndXJhdGlvbi5wYXJzZXJzXTtcbiAgICAgICAgdGhpcy5yZWZpbmVycyA9IFsuLi5jb25maWd1cmF0aW9uLnJlZmluZXJzXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBzaGFsbG93IGNvcHkgb2YgdGhlIENocm9ubyBvYmplY3Qgd2l0aCB0aGUgc2FtZSBjb25maWd1cmF0aW9uIChgcGFyc2Vyc2AgYW5kIGByZWZpbmVyc2ApXG4gICAgICovXG4gICAgY2xvbmUoKTogQ2hyb25vIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDaHJvbm8oe1xuICAgICAgICAgICAgcGFyc2VyczogWy4uLnRoaXMucGFyc2Vyc10sXG4gICAgICAgICAgICByZWZpbmVyczogWy4uLnRoaXMucmVmaW5lcnNdLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIHNob3J0Y3V0IGZvciBjYWxsaW5nIHtATGluayBwYXJzZSB8IHBhcnNlKCkgfSB0aGVuIHRyYW5zZm9ybSB0aGUgcmVzdWx0IGludG8gSmF2YXNjcmlwdCdzIERhdGUgb2JqZWN0XG4gICAgICogQHJldHVybiBEYXRlIG9iamVjdCBjcmVhdGVkIGZyb20gdGhlIGZpcnN0IHBhcnNlIHJlc3VsdFxuICAgICAqL1xuICAgIHBhcnNlRGF0ZSh0ZXh0OiBzdHJpbmcsIHJlZmVyZW5jZURhdGU/OiBQYXJzaW5nUmVmZXJlbmNlIHwgRGF0ZSwgb3B0aW9uPzogUGFyc2luZ09wdGlvbik6IERhdGUgfCBudWxsIHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IHRoaXMucGFyc2UodGV4dCwgcmVmZXJlbmNlRGF0ZSwgb3B0aW9uKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHMubGVuZ3RoID4gMCA/IHJlc3VsdHNbMF0uc3RhcnQuZGF0ZSgpIDogbnVsbDtcbiAgICB9XG5cbiAgICBwYXJzZSh0ZXh0OiBzdHJpbmcsIHJlZmVyZW5jZURhdGU/OiBQYXJzaW5nUmVmZXJlbmNlIHwgRGF0ZSwgb3B0aW9uPzogUGFyc2luZ09wdGlvbik6IFBhcnNlZFJlc3VsdFtdIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IG5ldyBQYXJzaW5nQ29udGV4dCh0ZXh0LCByZWZlcmVuY2VEYXRlLCBvcHRpb24pO1xuXG4gICAgICAgIGxldCByZXN1bHRzID0gW107XG4gICAgICAgIHRoaXMucGFyc2Vycy5mb3JFYWNoKChwYXJzZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZFJlc3VsdHMgPSBDaHJvbm8uZXhlY3V0ZVBhcnNlcihjb250ZXh0LCBwYXJzZXIpO1xuICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KHBhcnNlZFJlc3VsdHMpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXN1bHRzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhLmluZGV4IC0gYi5pbmRleDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5yZWZpbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChyZWZpbmVyKSB7XG4gICAgICAgICAgICByZXN1bHRzID0gcmVmaW5lci5yZWZpbmUoY29udGV4dCwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGV4ZWN1dGVQYXJzZXIoY29udGV4dDogUGFyc2luZ0NvbnRleHQsIHBhcnNlcjogUGFyc2VyKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgY29uc3QgcGF0dGVybiA9IHBhcnNlci5wYXR0ZXJuKGNvbnRleHQpO1xuXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsVGV4dCA9IGNvbnRleHQudGV4dDtcbiAgICAgICAgbGV0IHJlbWFpbmluZ1RleHQgPSBjb250ZXh0LnRleHQ7XG4gICAgICAgIGxldCBtYXRjaCA9IHBhdHRlcm4uZXhlYyhyZW1haW5pbmdUZXh0KTtcblxuICAgICAgICB3aGlsZSAobWF0Y2gpIHtcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBtYXRjaCBpbmRleCBvbiB0aGUgZnVsbCB0ZXh0O1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBtYXRjaC5pbmRleCArIG9yaWdpbmFsVGV4dC5sZW5ndGggLSByZW1haW5pbmdUZXh0Lmxlbmd0aDtcbiAgICAgICAgICAgIG1hdGNoLmluZGV4ID0gaW5kZXg7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlci5leHRyYWN0KGNvbnRleHQsIG1hdGNoKTtcbiAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgZmFpbHMsIG1vdmUgb24gYnkgMVxuICAgICAgICAgICAgICAgIHJlbWFpbmluZ1RleHQgPSBvcmlnaW5hbFRleHQuc3Vic3RyaW5nKG1hdGNoLmluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgbWF0Y2ggPSBwYXR0ZXJuLmV4ZWMocmVtYWluaW5nVGV4dCk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBwYXJzZWRSZXN1bHQ6IFBhcnNpbmdSZXN1bHQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFBhcnNpbmdSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBwYXJzZWRSZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFBhcnNpbmdDb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkUmVzdWx0ID0gY29udGV4dC5jcmVhdGVQYXJzaW5nUmVzdWx0KG1hdGNoLmluZGV4LCBtYXRjaFswXSk7XG4gICAgICAgICAgICAgICAgcGFyc2VkUmVzdWx0LnN0YXJ0ID0gcmVzdWx0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJzZWRSZXN1bHQgPSBjb250ZXh0LmNyZWF0ZVBhcnNpbmdSZXN1bHQobWF0Y2guaW5kZXgsIG1hdGNoWzBdLCByZXN1bHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBwYXJzZWRJbmRleCA9IHBhcnNlZFJlc3VsdC5pbmRleDtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZFRleHQgPSBwYXJzZWRSZXN1bHQudGV4dDtcbiAgICAgICAgICAgIGNvbnRleHQuZGVidWcoKCkgPT5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtwYXJzZXIuY29uc3RydWN0b3IubmFtZX0gZXh0cmFjdGVkIChhdCBpbmRleD0ke3BhcnNlZEluZGV4fSkgJyR7cGFyc2VkVGV4dH0nYClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChwYXJzZWRSZXN1bHQpO1xuICAgICAgICAgICAgcmVtYWluaW5nVGV4dCA9IG9yaWdpbmFsVGV4dC5zdWJzdHJpbmcocGFyc2VkSW5kZXggKyBwYXJzZWRUZXh0Lmxlbmd0aCk7XG4gICAgICAgICAgICBtYXRjaCA9IHBhdHRlcm4uZXhlYyhyZW1haW5pbmdUZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBhcnNpbmdDb250ZXh0IGltcGxlbWVudHMgRGVidWdIYW5kbGVyIHtcbiAgICByZWFkb25seSB0ZXh0OiBzdHJpbmc7XG4gICAgcmVhZG9ubHkgb3B0aW9uOiBQYXJzaW5nT3B0aW9uO1xuICAgIHJlYWRvbmx5IHJlZmVyZW5jZTogUmVmZXJlbmNlV2l0aFRpbWV6b25lO1xuXG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQuIFVzZSBgcmVmZXJlbmNlLmluc3RhbnRgIGluc3RlYWQuXG4gICAgICovXG4gICAgcmVhZG9ubHkgcmVmRGF0ZTogRGF0ZTtcblxuICAgIGNvbnN0cnVjdG9yKHRleHQ6IHN0cmluZywgcmVmRGF0ZT86IFBhcnNpbmdSZWZlcmVuY2UgfCBEYXRlLCBvcHRpb24/OiBQYXJzaW5nT3B0aW9uKSB7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgICAgIHRoaXMucmVmZXJlbmNlID0gbmV3IFJlZmVyZW5jZVdpdGhUaW1lem9uZShyZWZEYXRlKTtcbiAgICAgICAgdGhpcy5vcHRpb24gPSBvcHRpb24gPz8ge307XG5cbiAgICAgICAgdGhpcy5yZWZEYXRlID0gdGhpcy5yZWZlcmVuY2UuaW5zdGFudDtcbiAgICB9XG5cbiAgICBjcmVhdGVQYXJzaW5nQ29tcG9uZW50cyhjb21wb25lbnRzPzogeyBbYyBpbiBDb21wb25lbnRdPzogbnVtYmVyIH0gfCBQYXJzaW5nQ29tcG9uZW50cyk6IFBhcnNpbmdDb21wb25lbnRzIHtcbiAgICAgICAgaWYgKGNvbXBvbmVudHMgaW5zdGFuY2VvZiBQYXJzaW5nQ29tcG9uZW50cykge1xuICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFBhcnNpbmdDb21wb25lbnRzKHRoaXMucmVmZXJlbmNlLCBjb21wb25lbnRzKTtcbiAgICB9XG5cbiAgICBjcmVhdGVQYXJzaW5nUmVzdWx0KFxuICAgICAgICBpbmRleDogbnVtYmVyLFxuICAgICAgICB0ZXh0T3JFbmRJbmRleDogbnVtYmVyIHwgc3RyaW5nLFxuICAgICAgICBzdGFydENvbXBvbmVudHM/OiB7IFtjIGluIENvbXBvbmVudF0/OiBudW1iZXIgfSB8IFBhcnNpbmdDb21wb25lbnRzLFxuICAgICAgICBlbmRDb21wb25lbnRzPzogeyBbYyBpbiBDb21wb25lbnRdPzogbnVtYmVyIH0gfCBQYXJzaW5nQ29tcG9uZW50c1xuICAgICk6IFBhcnNpbmdSZXN1bHQge1xuICAgICAgICBjb25zdCB0ZXh0ID0gdHlwZW9mIHRleHRPckVuZEluZGV4ID09PSBcInN0cmluZ1wiID8gdGV4dE9yRW5kSW5kZXggOiB0aGlzLnRleHQuc3Vic3RyaW5nKGluZGV4LCB0ZXh0T3JFbmRJbmRleCk7XG5cbiAgICAgICAgY29uc3Qgc3RhcnQgPSBzdGFydENvbXBvbmVudHMgPyB0aGlzLmNyZWF0ZVBhcnNpbmdDb21wb25lbnRzKHN0YXJ0Q29tcG9uZW50cykgOiBudWxsO1xuICAgICAgICBjb25zdCBlbmQgPSBlbmRDb21wb25lbnRzID8gdGhpcy5jcmVhdGVQYXJzaW5nQ29tcG9uZW50cyhlbmRDb21wb25lbnRzKSA6IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQYXJzaW5nUmVzdWx0KHRoaXMucmVmZXJlbmNlLCBpbmRleCwgdGV4dCwgc3RhcnQsIGVuZCk7XG4gICAgfVxuXG4gICAgZGVidWcoYmxvY2s6IEFzeW5jRGVidWdCbG9jayk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5vcHRpb24uZGVidWcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbi5kZWJ1ZyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb24uZGVidWcoYmxvY2spO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVyOiBEZWJ1Z0hhbmRsZXIgPSA8RGVidWdIYW5kbGVyPnRoaXMub3B0aW9uLmRlYnVnO1xuICAgICAgICAgICAgICAgIGhhbmRsZXIuZGVidWcoYmxvY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwgIi8qKlxuICogQ2hyb25vIGNvbXBvbmVudHMgZm9yIEVuZ2xpc2ggc3VwcG9ydCAoKnBhcnNlcnMqLCAqcmVmaW5lcnMqLCBhbmQgKmNvbmZpZ3VyYXRpb24qKVxuICpcbiAqIEBtb2R1bGVcbiAqL1xuXG5pbXBvcnQgeyBDaHJvbm8sIFBhcnNlciwgUmVmaW5lciB9IGZyb20gXCIuLi8uLi9jaHJvbm9cIjtcbmltcG9ydCB7IFBhcnNpbmdSZXN1bHQsIFBhcnNpbmdDb21wb25lbnRzLCBSZWZlcmVuY2VXaXRoVGltZXpvbmUgfSBmcm9tIFwiLi4vLi4vcmVzdWx0c1wiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBQYXJzZWRSZXN1bHQsIFBhcnNpbmdPcHRpb24sIFBhcnNpbmdSZWZlcmVuY2UsIE1lcmlkaWVtLCBXZWVrZGF5IH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmltcG9ydCBFTkRlZmF1bHRDb25maWd1cmF0aW9uIGZyb20gXCIuL2NvbmZpZ3VyYXRpb25cIjtcblxuZXhwb3J0IHsgQ2hyb25vLCBQYXJzZXIsIFJlZmluZXIsIFBhcnNpbmdSZXN1bHQsIFBhcnNpbmdDb21wb25lbnRzLCBSZWZlcmVuY2VXaXRoVGltZXpvbmUgfTtcbmV4cG9ydCB7IENvbXBvbmVudCwgUGFyc2VkUmVzdWx0LCBQYXJzaW5nT3B0aW9uLCBQYXJzaW5nUmVmZXJlbmNlLCBNZXJpZGllbSwgV2Vla2RheSB9O1xuXG5leHBvcnQgY29uc3QgY29uZmlndXJhdGlvbiA9IG5ldyBFTkRlZmF1bHRDb25maWd1cmF0aW9uKCk7XG5cbi8qKlxuICogQ2hyb25vIG9iamVjdCBjb25maWd1cmVkIGZvciBwYXJzaW5nICpjYXN1YWwqIEVuZ2xpc2hcbiAqL1xuZXhwb3J0IGNvbnN0IGNhc3VhbCA9IG5ldyBDaHJvbm8oY29uZmlndXJhdGlvbi5jcmVhdGVDYXN1YWxDb25maWd1cmF0aW9uKGZhbHNlKSk7XG5cbi8qKlxuICogQ2hyb25vIG9iamVjdCBjb25maWd1cmVkIGZvciBwYXJzaW5nICpzdHJpY3QqIEVuZ2xpc2hcbiAqL1xuZXhwb3J0IGNvbnN0IHN0cmljdCA9IG5ldyBDaHJvbm8oY29uZmlndXJhdGlvbi5jcmVhdGVDb25maWd1cmF0aW9uKHRydWUsIGZhbHNlKSk7XG5cbi8qKlxuICogQ2hyb25vIG9iamVjdCBjb25maWd1cmVkIGZvciBwYXJzaW5nICpVSy1zdHlsZSogRW5nbGlzaFxuICovXG5leHBvcnQgY29uc3QgR0IgPSBuZXcgQ2hyb25vKGNvbmZpZ3VyYXRpb24uY3JlYXRlQ2FzdWFsQ29uZmlndXJhdGlvbih0cnVlKSk7XG5cbi8qKlxuICogQSBzaG9ydGN1dCBmb3IgZW4uY2FzdWFsLnBhcnNlKClcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlKHRleHQ6IHN0cmluZywgcmVmPzogUGFyc2luZ1JlZmVyZW5jZSB8IERhdGUsIG9wdGlvbj86IFBhcnNpbmdPcHRpb24pOiBQYXJzZWRSZXN1bHRbXSB7XG4gICAgcmV0dXJuIGNhc3VhbC5wYXJzZSh0ZXh0LCByZWYsIG9wdGlvbik7XG59XG5cbi8qKlxuICogQSBzaG9ydGN1dCBmb3IgZW4uY2FzdWFsLnBhcnNlRGF0ZSgpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURhdGUodGV4dDogc3RyaW5nLCByZWY/OiBQYXJzaW5nUmVmZXJlbmNlIHwgRGF0ZSwgb3B0aW9uPzogUGFyc2luZ09wdGlvbik6IERhdGUge1xuICAgIHJldHVybiBjYXN1YWwucGFyc2VEYXRlKHRleHQsIHJlZiwgb3B0aW9uKTtcbn1cbiIsICJpbXBvcnQgKiBhcyBlbiBmcm9tIFwiLi9sb2NhbGVzL2VuXCI7XG5pbXBvcnQgeyBDaHJvbm8sIFBhcnNlciwgUmVmaW5lciB9IGZyb20gXCIuL2Nocm9ub1wiO1xuaW1wb3J0IHsgUGFyc2luZ1Jlc3VsdCwgUGFyc2luZ0NvbXBvbmVudHMsIFJlZmVyZW5jZVdpdGhUaW1lem9uZSB9IGZyb20gXCIuL3Jlc3VsdHNcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgUGFyc2VkQ29tcG9uZW50cywgUGFyc2VkUmVzdWx0LCBQYXJzaW5nT3B0aW9uLCBQYXJzaW5nUmVmZXJlbmNlLCBNZXJpZGllbSwgV2Vla2RheSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCB7IGVuLCBDaHJvbm8sIFBhcnNlciwgUmVmaW5lciwgUGFyc2luZ1Jlc3VsdCwgUGFyc2luZ0NvbXBvbmVudHMsIFJlZmVyZW5jZVdpdGhUaW1lem9uZSB9O1xuZXhwb3J0IHsgQ29tcG9uZW50LCBQYXJzZWRDb21wb25lbnRzLCBQYXJzZWRSZXN1bHQsIFBhcnNpbmdPcHRpb24sIFBhcnNpbmdSZWZlcmVuY2UsIE1lcmlkaWVtLCBXZWVrZGF5IH07XG5cbi8vIEV4cG9ydCBhbGwgbG9jYWxlc1xuaW1wb3J0ICogYXMgZGUgZnJvbSBcIi4vbG9jYWxlcy9kZVwiO1xuaW1wb3J0ICogYXMgZnIgZnJvbSBcIi4vbG9jYWxlcy9mclwiO1xuaW1wb3J0ICogYXMgamEgZnJvbSBcIi4vbG9jYWxlcy9qYVwiO1xuaW1wb3J0ICogYXMgcHQgZnJvbSBcIi4vbG9jYWxlcy9wdFwiO1xuaW1wb3J0ICogYXMgbmwgZnJvbSBcIi4vbG9jYWxlcy9ubFwiO1xuaW1wb3J0ICogYXMgemggZnJvbSBcIi4vbG9jYWxlcy96aFwiO1xuaW1wb3J0ICogYXMgcnUgZnJvbSBcIi4vbG9jYWxlcy9ydVwiO1xuaW1wb3J0ICogYXMgZXMgZnJvbSBcIi4vbG9jYWxlcy9lc1wiO1xuaW1wb3J0ICogYXMgdWsgZnJvbSBcIi4vbG9jYWxlcy91a1wiO1xuXG5leHBvcnQgeyBkZSwgZnIsIGphLCBwdCwgbmwsIHpoLCBydSwgZXMsIHVrIH07XG5cbi8qKlxuICogQSBzaG9ydGN1dCBmb3Ige0BsaW5rIGVuIHwgY2hyb25vLmVuLnN0cmljdH1cbiAqL1xuZXhwb3J0IGNvbnN0IHN0cmljdCA9IGVuLnN0cmljdDtcblxuLyoqXG4gKiBBIHNob3J0Y3V0IGZvciB7QGxpbmsgZW4gfCBjaHJvbm8uZW4uY2FzdWFsfVxuICovXG5leHBvcnQgY29uc3QgY2FzdWFsID0gZW4uY2FzdWFsO1xuXG4vKipcbiAqIEEgc2hvcnRjdXQgZm9yIHtAbGluayBlbiB8IGNocm9uby5lbi5jYXN1YWwucGFyc2UoKX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlKHRleHQ6IHN0cmluZywgcmVmPzogUGFyc2luZ1JlZmVyZW5jZSB8IERhdGUsIG9wdGlvbj86IFBhcnNpbmdPcHRpb24pOiBQYXJzZWRSZXN1bHRbXSB7XG4gICAgcmV0dXJuIGNhc3VhbC5wYXJzZSh0ZXh0LCByZWYsIG9wdGlvbik7XG59XG5cbi8qKlxuICogQSBzaG9ydGN1dCBmb3Ige0BsaW5rIGVuIHwgY2hyb25vLmVuLmNhc3VhbC5wYXJzZURhdGUoKX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRGF0ZSh0ZXh0OiBzdHJpbmcsIHJlZj86IFBhcnNpbmdSZWZlcmVuY2UgfCBEYXRlLCBvcHRpb24/OiBQYXJzaW5nT3B0aW9uKTogRGF0ZSB8IG51bGwge1xu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QUUsQ0FBQyxLQUFHO0FBQUEsTUFBRyxFQUFDLEdBQUUsSUFBRSxTQUFTRCxJQUFFQyxJQUFFQyxJQUFFO0FBQUMsWUFBSUMsS0FBRSxPQUFPSCxFQUFDO0FBQUUsZUFBTSxDQUFDRyxNQUFHQSxHQUFFLFVBQVFGLEtBQUVELEtBQUUsS0FBRyxNQUFNQyxLQUFFLElBQUVFLEdBQUUsTUFBTSxFQUFFLEtBQUtELEVBQUMsSUFBRUY7QUFBQSxNQUFDLEdBQUUsSUFBRSxFQUFDLEdBQUUsR0FBRSxHQUFFLFNBQVNBLElBQUU7QUFBQyxZQUFJQyxLQUFFLENBQUNELEdBQUUsVUFBVSxHQUFFRSxLQUFFLEtBQUssSUFBSUQsRUFBQyxHQUFFRSxLQUFFLEtBQUssTUFBTUQsS0FBRSxFQUFFLEdBQUVFLEtBQUVGLEtBQUU7QUFBRyxnQkFBT0QsTUFBRyxJQUFFLE1BQUksT0FBSyxFQUFFRSxJQUFFLEdBQUUsR0FBRyxJQUFFLE1BQUksRUFBRUMsSUFBRSxHQUFFLEdBQUc7QUFBQSxNQUFDLEdBQUUsR0FBRSxTQUFTSixHQUFFQyxJQUFFQyxJQUFFO0FBQUMsWUFBR0QsR0FBRSxLQUFLLElBQUVDLEdBQUUsS0FBSyxFQUFFLFFBQU0sQ0FBQ0YsR0FBRUUsSUFBRUQsRUFBQztBQUFFLFlBQUlFLEtBQUUsTUFBSUQsR0FBRSxLQUFLLElBQUVELEdBQUUsS0FBSyxNQUFJQyxHQUFFLE1BQU0sSUFBRUQsR0FBRSxNQUFNLElBQUdHLEtBQUVILEdBQUUsTUFBTSxFQUFFLElBQUlFLElBQUUsQ0FBQyxHQUFFRSxLQUFFSCxLQUFFRSxLQUFFLEdBQUVFLEtBQUVMLEdBQUUsTUFBTSxFQUFFLElBQUlFLE1BQUdFLEtBQUUsS0FBRyxJQUFHLENBQUM7QUFBRSxlQUFNLEVBQUUsRUFBRUYsTUFBR0QsS0FBRUUsT0FBSUMsS0FBRUQsS0FBRUUsS0FBRUEsS0FBRUYsUUFBSztBQUFBLE1BQUUsR0FBRSxHQUFFLFNBQVNKLElBQUU7QUFBQyxlQUFPQSxLQUFFLElBQUUsS0FBSyxLQUFLQSxFQUFDLEtBQUcsSUFBRSxLQUFLLE1B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QUEsUUFDQyxLQUFLO0FBQUEsUUFDTCxPQUFPLEdBQUcsS0FBSyxLQUFLO0FBQUEsUUFDcEIsYUFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sS0FBSyxPQUFPLE9BQU8saUJBQU0sY0FBYyxFQUFFLENBQUM7QUFBQSxRQUN4RSxTQUNFLHFCQUFDLDhCQUNDLHFCQUFDLGtCQUFPLGlCQUFQLEVBQXVCLFNBQVMsS0FBSyxPQUFPLEdBQzdDLHFCQUFDLGtCQUFPLE9BQVAsRUFBYSxTQUFTLEtBQUssT0FBTyxDQUNyQztBQUFBO0FBQUEsSUFFSixDQUNEO0FBQUEsRUFDSDtBQUVKO0FBRUEsSUFBTyxvQkFBUTsiLAogICJuYW1lcyI6IFsiZXhwb3J0cyIsICJtb2R1bGUiLCAidCIsICJlIiwgImkiLCAiciIsICJzIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgInQiLCAiZSIsICJuIiwgInIiLCAiaSIsICJzIiwgInUiLCAiYSIsICJNIiwgIm0iLCAiZiIsICJsIiwgIiQiLCAieSIsICJ2IiwgImciLCAiRCIsICJvIiwgImQiLCAiYyIsICJoIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImUiLCAidCIsICJyIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImkiLCAibiIsICJmIiwgImUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAidCIsICJpIiwgImUiLCAicyIsICJmIiwgIm4iLCAidSIsICJvIiwgInIiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAidCIsICJuIiwgImkiLCAibyIsICJyIiwgImUiLCAidSIsICJmIiwgInMiLCAiYSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJyIiwgImUiLCAidCIsICJvIiwgIm4iLCAiaSIsICJkIiwgImltcG9ydF9kYXlqcyIsICJNZXJpZGllbSIsICJXZWVrZGF5IiwgIk1vbnRoIiwgImRheWpzIiwgImRheWpzIiwgInF1YXJ0ZXJPZlllYXIiLCAiaW1wb3J0X2RheWpzIiwgImRheWpzIiwgIlBBVFRFUk4iLCAiTU9OVEhfTkFNRV9HUk9VUCIsICJEQVRFX0dST1VQIiwgIkRBVEVfVE9fR1JPVVAiLCAiWUVBUl9HUk9VUCIsICJQQVRURVJOIiwgIk1PTlRIX05BTUVfR1JPVVAiLCAiWUVBUl9HUk9VUCIsICJQQVRURVJOIiwgIk1PTlRIX05BTUVfR1JPVVAiLCAiUEFUVEVSTiIsICJZRUFSX0dST1VQIiwgInN0cmljdCIsICJQQVRURVJOIiwgIlBBVFRFUk4iLCAiU1RSSUNUX1BBVFRFUk4iLCAiaW1wb3J0X2RheWpzIiwgImRheWpzIiwgIlBBVFRFUk4iLCAiWUVBUl9OVU1CRVJfR1JPVVAiLCAiTU9OVEhfTlVNQkVSX0dST1VQIiwgIkRBVEVfTlVNQkVSX0dST1VQIiwgImNvbmZpZ3VyYXRpb24iLCAiaW1wb3J0X2RheWpzIiwgImltcG9ydF9kYXlqcyIsICJkYXlqcyIsICJkYXlqcyIsICJQQVRURVJOIiwgImRheWpzIiwgIlBBVFRFUk4iLCAiUEFUVEVSTiIsICJQUkVGSVhfR1JPVVAiLCAiaW1wb3J0X2RheWpzIiwgIlBBVFRFUk4iLCAiZGF5anMiLCAiUEFUVEVSTiIsICJZRUFSX0dST1VQIiwgIlBBVFRFUk4iLCAiWUVBUl9HUk9VUCIsICJjb25maWd1cmF0aW9uIiwgImNhc3VhbCIsICJjYXN1YWwiLCAiaW1wb3J0X2RheWpzIiwgImltcG9ydF90aW1lem9uZSIsICJkYXlqcyIsICJhZHZhbmNlZEZvcm1hdFBsdWdpbiIsICJ3ZWVrT2ZZZWFyUGx1Z2luIiwgInV0Y1BsdWdpbiIsICJ0aW1lem9uZVBsdWdpbiIsICJyZWxhdGl2ZVRpbWVQbHVnaW4iXQp9Cg==
