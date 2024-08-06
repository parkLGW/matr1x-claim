window = global
const navigator = {
    appName:"Netscape"
}

function l(A) {
    var t = new Array
      , e = 0;
    for (var s in A)
        t[e] = s,
        e++;
    var i = t.sort()
      , n = {};
    for (var s in i)
        n[i[s]] = A[i[s]];
    return n
}

bytesToWords = function(t) {
    for (var e = [], n = 0, r = 0; n < t.length; n++,
    r += 8)
        e[r >>> 5] |= t[n] << 24 - r % 32;
    return e
}

wordsToBytes=function(t) {
    for (var e = [], n = 0; n < 32 * t.length; n += 8)
        e.push(t[n >>> 5] >>> 24 - n % 32 & 255);
    return e
}

bytesToHex=function(t) {
    for (var e = [], n = 0; n < t.length; n++)
        e.push((t[n] >>> 4).toString(16)),
        e.push((15 & t[n]).toString(16));
    return e.join("")
}

rotl=function(t, e) {
    return t << e | t >>> 32 - e
}

endian= function(t) {
    if (t.constructor == Number)
        return 16711935 & rotl(t, 8) | 4278255360 & rotl(t, 24);
    for (var e = 0; e < t.length; e++)
        t[e] = endian(t[e]);
    return t
}

utf8_stringToBytes= function(t) {
    for (var e = [], n = 0; n < unescape(encodeURIComponent(t)).length; n++)
        e.push(255 & t.charCodeAt(n));
    return e
}

bin_stringToBytes = function(t) {
    for (var e = [], n = 0; n < t.length; n++)
        e.push(255 & t.charCodeAt(n));
    return e
}

bin_bytesToString= function(t) {
    for (var e = [], n = 0; n < t.length; n++)
        e.push(String.fromCharCode(t[n]));
    return e.join("")
}

ifunc = function(t) {
    function e(t) {
        return !!t.constructor && "function" === typeof t.constructor.isBuffer && t.constructor.isBuffer(t)
    }
    function n(t) {
        return "function" === typeof t.readFloatLE && "function" === typeof t.slice && e(t.slice(0, 0))
    }
    t.exports = function(t) {
        return null != t && (e(t) || n(t) || !!t._isBuffer)
    }
}

var s = function(t, n) {
    t.constructor == String ? t = n && "binary" === n.encoding ? bin_stringToBytes(t) : utf8_stringToBytes(t) : ifunc(t) ? t = Array.prototype.slice.call(t, 0) : Array.isArray(t) || t.constructor === Uint8Array || (t = t.toString());
    for (var a = bytesToWords(t), u = 8 * t.length, c = 1732584193, l = -271733879, d = -1732584194, h = 271733878, f = 0; f < a.length; f++)
        a[f] = 16711935 & (a[f] << 8 | a[f] >>> 24) | 4278255360 & (a[f] << 24 | a[f] >>> 8);
    a[u >>> 5] |= 128 << u % 32,
    a[14 + (u + 64 >>> 9 << 4)] = u;
    var p = s._ff
        , m = s._gg
        , g = s._hh
        , y = s._ii;
    for (f = 0; f < a.length; f += 16) {
        var v = c
            , _ = l
            , b = d
            , w = h;
        c = p(c, l, d, h, a[f + 0], 7, -680876936),
        h = p(h, c, l, d, a[f + 1], 12, -389564586),
        d = p(d, h, c, l, a[f + 2], 17, 606105819),
        l = p(l, d, h, c, a[f + 3], 22, -1044525330),
        c = p(c, l, d, h, a[f + 4], 7, -176418897),
        h = p(h, c, l, d, a[f + 5], 12, 1200080426),
        d = p(d, h, c, l, a[f + 6], 17, -1473231341),
        l = p(l, d, h, c, a[f + 7], 22, -45705983),
        c = p(c, l, d, h, a[f + 8], 7, 1770035416),
        h = p(h, c, l, d, a[f + 9], 12, -1958414417),
        d = p(d, h, c, l, a[f + 10], 17, -42063),
        l = p(l, d, h, c, a[f + 11], 22, -1990404162),
        c = p(c, l, d, h, a[f + 12], 7, 1804603682),
        h = p(h, c, l, d, a[f + 13], 12, -40341101),
        d = p(d, h, c, l, a[f + 14], 17, -1502002290),
        l = p(l, d, h, c, a[f + 15], 22, 1236535329),
        c = m(c, l, d, h, a[f + 1], 5, -165796510),
        h = m(h, c, l, d, a[f + 6], 9, -1069501632),
        d = m(d, h, c, l, a[f + 11], 14, 643717713),
        l = m(l, d, h, c, a[f + 0], 20, -373897302),
        c = m(c, l, d, h, a[f + 5], 5, -701558691),
        h = m(h, c, l, d, a[f + 10], 9, 38016083),
        d = m(d, h, c, l, a[f + 15], 14, -660478335),
        l = m(l, d, h, c, a[f + 4], 20, -405537848),
        c = m(c, l, d, h, a[f + 9], 5, 568446438),
        h = m(h, c, l, d, a[f + 14], 9, -1019803690),
        d = m(d, h, c, l, a[f + 3], 14, -187363961),
        l = m(l, d, h, c, a[f + 8], 20, 1163531501),
        c = m(c, l, d, h, a[f + 13], 5, -1444681467),
        h = m(h, c, l, d, a[f + 2], 9, -51403784),
        d = m(d, h, c, l, a[f + 7], 14, 1735328473),
        l = m(l, d, h, c, a[f + 12], 20, -1926607734),
        c = g(c, l, d, h, a[f + 5], 4, -378558),
        h = g(h, c, l, d, a[f + 8], 11, -2022574463),
        d = g(d, h, c, l, a[f + 11], 16, 1839030562),
        l = g(l, d, h, c, a[f + 14], 23, -35309556),
        c = g(c, l, d, h, a[f + 1], 4, -1530992060),
        h = g(h, c, l, d, a[f + 4], 11, 1272893353),
        d = g(d, h, c, l, a[f + 7], 16, -155497632),
        l = g(l, d, h, c, a[f + 10], 23, -1094730640),
        c = g(c, l, d, h, a[f + 13], 4, 681279174),
        h = g(h, c, l, d, a[f + 0], 11, -358537222),
        d = g(d, h, c, l, a[f + 3], 16, -722521979),
        l = g(l, d, h, c, a[f + 6], 23, 76029189),
        c = g(c, l, d, h, a[f + 9], 4, -640364487),
        h = g(h, c, l, d, a[f + 12], 11, -421815835),
        d = g(d, h, c, l, a[f + 15], 16, 530742520),
        l = g(l, d, h, c, a[f + 2], 23, -995338651),
        c = y(c, l, d, h, a[f + 0], 6, -198630844),
        h = y(h, c, l, d, a[f + 7], 10, 1126891415),
        d = y(d, h, c, l, a[f + 14], 15, -1416354905),
        l = y(l, d, h, c, a[f + 5], 21, -57434055),
        c = y(c, l, d, h, a[f + 12], 6, 1700485571),
        h = y(h, c, l, d, a[f + 3], 10, -1894986606),
        d = y(d, h, c, l, a[f + 10], 15, -1051523),
        l = y(l, d, h, c, a[f + 1], 21, -2054922799),
        c = y(c, l, d, h, a[f + 8], 6, 1873313359),
        h = y(h, c, l, d, a[f + 15], 10, -30611744),
        d = y(d, h, c, l, a[f + 6], 15, -1560198380),
        l = y(l, d, h, c, a[f + 13], 21, 1309151649),
        c = y(c, l, d, h, a[f + 4], 6, -145523070),
        h = y(h, c, l, d, a[f + 11], 10, -1120210379),
        d = y(d, h, c, l, a[f + 2], 15, 718787259),
        l = y(l, d, h, c, a[f + 9], 21, -343485551),
        c = c + v >>> 0,
        l = l + _ >>> 0,
        d = d + b >>> 0,
        h = h + w >>> 0
    }
    return endian([c, l, d, h])
};
s._ff = function(t, e, n, r, i, o, s) {
    var a = t + (e & n | ~e & r) + (i >>> 0) + s;
    return (a << o | a >>> 32 - o) + e
}
,
s._gg = function(t, e, n, r, i, o, s) {
    var a = t + (e & r | n & ~r) + (i >>> 0) + s;
    return (a << o | a >>> 32 - o) + e
}
,
s._hh = function(t, e, n, r, i, o, s) {
    var a = t + (e ^ n ^ r) + (i >>> 0) + s;
    return (a << o | a >>> 32 - o) + e
}
,
s._ii = function(t, e, n, r, i, o, s) {
    var a = t + (n ^ (e | ~r)) + (i >>> 0) + s;
    return (a << o | a >>> 32 - o) + e
}

function sign(t, n) {
    if (void 0 === t || null === t)
        throw new Error("Illegal argument " + t);
    var r = wordsToBytes(s(t, n));
    return n && n.asBytes ? r : n && n.asString ? bin_bytesToString(r) : bytesToHex(r)
}


var g, y = {
    decode: function(t) {
        var e;
        if (void 0 === d) {
            var n = "0123456789ABCDEF"
              , r = " \f\n\r\t\u2028\u2029";
            for (d = {},
            e = 0; e < 16; ++e)
                d[n.charAt(e)] = e;
            for (n = n.toLowerCase(),
            e = 10; e < 16; ++e)
                d[n.charAt(e)] = e;
            for (e = 0; e < r.length; ++e)
                d[r.charAt(e)] = -1
        }
        var i = []
          , o = 0
          , s = 0;
        for (e = 0; e < t.length; ++e) {
            var a = t.charAt(e);
            if ("=" == a)
                break;
            if (a = d[a],
            -1 != a) {
                if (void 0 === a)
                    throw new Error("Illegal character at offset " + e);
                o |= a,
                ++s >= 2 ? (i[i.length] = o,
                o = 0,
                s = 0) : o <<= 4
            }
        }
        if (s)
            throw new Error("Hex encoding incomplete: 4 bits missing");
        return i
    }
}, v = {
    decode: function(t) {
        var e;
        if (void 0 === g) {
            var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
              , r = "= \f\n\r\t\u2028\u2029";
            for (g = Object.create(null),
            e = 0; e < 64; ++e)
                g[n.charAt(e)] = e;
            for (g["-"] = 62,
            g["_"] = 63,
            e = 0; e < r.length; ++e)
                g[r.charAt(e)] = -1
        }
        var i = []
          , o = 0
          , s = 0;
        for (e = 0; e < t.length; ++e) {
            var a = t.charAt(e);
            if ("=" == a)
                break;
            if (a = g[a],
            -1 != a) {
                if (void 0 === a)
                    throw new Error("Illegal character at offset " + e);
                o |= a,
                ++s >= 4 ? (i[i.length] = o >> 16,
                i[i.length] = o >> 8 & 255,
                i[i.length] = 255 & o,
                o = 0,
                s = 0) : o <<= 6
            }
        }
        switch (s) {
        case 1:
            throw new Error("Base64 encoding incomplete: at least 2 bits missing");
        case 2:
            i[i.length] = o >> 10;
            break;
        case 3:
            i[i.length] = o >> 16,
            i[i.length] = o >> 8 & 255;
            break
        }
        return i
    },
    re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
    unarmor: function(t) {
        var e = v.re.exec(t);
        if (e)
            if (e[1])
                t = e[1];
            else {
                if (!e[2])
                    throw new Error("RegExp out of sync");
                t = e[2]
            }
        return v.decode(t)
    }
}

x = function() {
    function t(e, n) {
        this.hexDigits = "0123456789ABCDEF",
        e instanceof t ? (this.enc = e.enc,
        this.pos = e.pos) : (this.enc = e,
        this.pos = n)
    }
    return t.prototype.get = function(t) {
        if (void 0 === t && (t = this.pos++),
        t >= this.enc.length)
            throw new Error("Requesting byte offset " + t + " on a stream of length " + this.enc.length);
        return "string" === typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t]
    }
    ,
    t.prototype.hexByte = function(t) {
        return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
    }
    ,
    t.prototype.hexDump = function(t, e, n) {
        for (var r = "", i = t; i < e; ++i)
            if (r += this.hexByte(this.get(i)),
            !0 !== n)
                switch (15 & i) {
                case 7:
                    r += "  ";
                    break;
                case 15:
                    r += "\n";
                    break;
                default:
                    r += " "
                }
        return r
    }
    ,
    t.prototype.isASCII = function(t, e) {
        for (var n = t; n < e; ++n) {
            var r = this.get(n);
            if (r < 32 || r > 176)
                return !1
        }
        return !0
    }
    ,
    t.prototype.parseStringISO = function(t, e) {
        for (var n = "", r = t; r < e; ++r)
            n += String.fromCharCode(this.get(r));
        return n
    }
    ,
    t.prototype.parseStringUTF = function(t, e) {
        for (var n = "", r = t; r < e; ) {
            var i = this.get(r++);
            n += i < 128 ? String.fromCharCode(i) : i > 191 && i < 224 ? String.fromCharCode((31 & i) << 6 | 63 & this.get(r++)) : String.fromCharCode((15 & i) << 12 | (63 & this.get(r++)) << 6 | 63 & this.get(r++))
        }
        return n
    }
    ,
    t.prototype.parseStringBMP = function(t, e) {
        for (var n, r, i = "", o = t; o < e; )
            n = this.get(o++),
            r = this.get(o++),
            i += String.fromCharCode(n << 8 | r);
        return i
    }
    ,
    t.prototype.parseTime = function(t, e, n) {
        var r = this.parseStringISO(t, e)
          , i = (n ? M : S).exec(r);
        return i ? (n && (i[1] = +i[1],
        i[1] += +i[1] < 70 ? 2e3 : 1900),
        r = i[1] + "-" + i[2] + "-" + i[3] + " " + i[4],
        i[5] && (r += ":" + i[5],
        i[6] && (r += ":" + i[6],
        i[7] && (r += "." + i[7]))),
        i[8] && (r += " UTC",
        "Z" != i[8] && (r += i[8],
        i[9] && (r += ":" + i[9]))),
        r) : "Unrecognized time: " + r
    }
    ,
    t.prototype.parseInteger = function(t, e) {
        var n, r = this.get(t), i = r > 127, o = i ? 255 : 0, s = "";
        while (r == o && ++t < e)
            r = this.get(t);
        if (n = e - t,
        0 === n)
            return i ? -1 : 0;
        if (n > 4) {
            s = r,
            n <<= 3;
            while (0 == (128 & (+s ^ o)))
                s = +s << 1,
                --n;
            s = "(" + n + " bit)\n"
        }
        i && (r -= 256);
        for (var a = new b(r), u = t + 1; u < e; ++u)
            a.mulAdd(256, this.get(u));
        return s + a.toString()
    }
    ,
    t.prototype.parseBitString = function(t, e, n) {
        for (var r = this.get(t), i = (e - t - 1 << 3) - r, o = "(" + i + " bit)\n", s = "", a = t + 1; a < e; ++a) {
            for (var u = this.get(a), c = a == e - 1 ? r : 0, l = 7; l >= c; --l)
                s += u >> l & 1 ? "1" : "0";
            if (s.length > n)
                return o + E(s, n)
        }
        return o + s
    }
    ,
    t.prototype.parseOctetString = function(t, e, n) {
        if (this.isASCII(t, e))
            return E(this.parseStringISO(t, e), n);
        var r = e - t
          , i = "(" + r + " byte)\n";
        n /= 2,
        r > n && (e = t + n);
        for (var o = t; o < e; ++o)
            i += this.hexByte(this.get(o));
        return r > n && (i += w),
        i
    }
    ,
    t.prototype.parseOID = function(t, e, n) {
        for (var r = "", i = new b, o = 0, s = t; s < e; ++s) {
            var a = this.get(s);
            if (i.mulAdd(128, 127 & a),
            o += 7,
            !(128 & a)) {
                if ("" === r)
                    if (i = i.simplify(),
                    i instanceof b)
                        i.sub(80),
                        r = "2." + i.toString();
                    else {
                        var u = i < 80 ? i < 40 ? 0 : 1 : 2;
                        r = u + "." + (i - 40 * u)
                    }
                else
                    r += "." + i.toString();
                if (r.length > n)
                    return E(r, n);
                i = new b,
                o = 0
            }
        }
        return o > 0 && (r += ".incomplete"),
        r
    }
    ,
    t
}()
k = function() {
    function t(t) {
        var e = t.get();
        if (this.tagClass = e >> 6,
        this.tagConstructed = 0 !== (32 & e),
        this.tagNumber = 31 & e,
        31 == this.tagNumber) {
            var n = new b;
            do {
                e = t.get(),
                n.mulAdd(128, 127 & e)
            } while (128 & e);
            this.tagNumber = n.simplify()
        }
    }
    return t.prototype.isUniversal = function() {
        return 0 === this.tagClass
    }
    ,
    t.prototype.isEOC = function() {
        return 0 === this.tagClass && 0 === this.tagNumber
    }
    ,
    t
}()
L = function() {
    function t(t, e, n, r, i) {
        if (!(r instanceof k))
            throw new Error("Invalid tag value.");
        this.stream = t,
        this.header = e,
        this.length = n,
        this.tag = r,
        this.sub = i
    }
    return t.prototype.typeName = function() {
        switch (this.tag.tagClass) {
        case 0:
            switch (this.tag.tagNumber) {
            case 0:
                return "EOC";
            case 1:
                return "BOOLEAN";
            case 2:
                return "INTEGER";
            case 3:
                return "BIT_STRING";
            case 4:
                return "OCTET_STRING";
            case 5:
                return "NULL";
            case 6:
                return "OBJECT_IDENTIFIER";
            case 7:
                return "ObjectDescriptor";
            case 8:
                return "EXTERNAL";
            case 9:
                return "REAL";
            case 10:
                return "ENUMERATED";
            case 11:
                return "EMBEDDED_PDV";
            case 12:
                return "UTF8String";
            case 16:
                return "SEQUENCE";
            case 17:
                return "SET";
            case 18:
                return "NumericString";
            case 19:
                return "PrintableString";
            case 20:
                return "TeletexString";
            case 21:
                return "VideotexString";
            case 22:
                return "IA5String";
            case 23:
                return "UTCTime";
            case 24:
                return "GeneralizedTime";
            case 25:
                return "GraphicString";
            case 26:
                return "VisibleString";
            case 27:
                return "GeneralString";
            case 28:
                return "UniversalString";
            case 30:
                return "BMPString"
            }
            return "Universal_" + this.tag.tagNumber.toString();
        case 1:
            return "Application_" + this.tag.tagNumber.toString();
        case 2:
            return "[" + this.tag.tagNumber.toString() + "]";
        case 3:
            return "Private_" + this.tag.tagNumber.toString()
        }
    }
    ,
    t.prototype.content = function(t) {
        if (void 0 === this.tag)
            return null;
        void 0 === t && (t = 1 / 0);
        var e = this.posContent()
          , n = Math.abs(this.length);
        if (!this.tag.isUniversal())
            return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + n, t);
        switch (this.tag.tagNumber) {
        case 1:
            return 0 === this.stream.get(e) ? "false" : "true";
        case 2:
            return this.stream.parseInteger(e, e + n);
        case 3:
            return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e, e + n, t);
        case 4:
            return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + n, t);
        case 6:
            return this.stream.parseOID(e, e + n, t);
        case 16:
        case 17:
            return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
        case 12:
            return E(this.stream.parseStringUTF(e, e + n), t);
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 26:
            return E(this.stream.parseStringISO(e, e + n), t);
        case 30:
            return E(this.stream.parseStringBMP(e, e + n), t);
        case 23:
        case 24:
            return this.stream.parseTime(e, e + n, 23 == this.tag.tagNumber)
        }
        return null
    }
    ,
    t.prototype.toString = function() {
        return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
    }
    ,
    t.prototype.toPrettyString = function(t) {
        void 0 === t && (t = "");
        var e = t + this.typeName() + " @" + this.stream.pos;
        if (this.length >= 0 && (e += "+"),
        e += this.length,
        this.tag.tagConstructed ? e += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (e += " (encapsulates)"),
        e += "\n",
        null !== this.sub) {
            t += "  ";
            for (var n = 0, r = this.sub.length; n < r; ++n)
                e += this.sub[n].toPrettyString(t)
        }
        return e
    }
    ,
    t.prototype.posStart = function() {
        return this.stream.pos
    }
    ,
    t.prototype.posContent = function() {
        return this.stream.pos + this.header
    }
    ,
    t.prototype.posEnd = function() {
        return this.stream.pos + this.header + Math.abs(this.length)
    }
    ,
    t.prototype.toHexString = function() {
        return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
    }
    ,
    t.decodeLength = function(t) {
        var e = t.get()
          , n = 127 & e;
        if (n == e)
            return n;
        if (n > 6)
            throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
        if (0 === n)
            return null;
        e = 0;
        for (var r = 0; r < n; ++r)
            e = 256 * e + t.get();
        return e
    }
    ,
    t.prototype.getHexStringValue = function() {
        var t = this.toHexString()
          , e = 2 * this.header
          , n = 2 * this.length;
        return t.substr(e, n)
    }
    ,
    t.decode = function(e) {
        var n;
        n = e instanceof x ? e : new x(e,0);
        var r = new x(n)
          , i = new k(n)
          , o = t.decodeLength(n)
          , s = n.pos
          , a = s - r.pos
          , u = null
          , c = function() {
            var e = [];
            if (null !== o) {
                var r = s + o;
                while (n.pos < r)
                    e[e.length] = t.decode(n);
                if (n.pos != r)
                    throw new Error("Content size is not correct for container starting at offset " + s)
            } else
                try {
                    for (; ; ) {
                        var i = t.decode(n);
                        if (i.tag.isEOC())
                            break;
                        e[e.length] = i
                    }
                    o = s - n.pos
                } catch (a) {
                    throw new Error("Exception while decoding undefined length content: " + a)
                }
            return e
        };
        if (i.tagConstructed)
            u = c();
        else if (i.isUniversal() && (3 == i.tagNumber || 4 == i.tagNumber))
            try {
                if (3 == i.tagNumber && 0 != n.get())
                    throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                u = c();
                for (var l = 0; l < u.length; ++l)
                    if (u[l].tag.isEOC())
                        throw new Error("EOC is not supposed to be actual content.")
            } catch (d) {
                u = null
            }
        if (null === u) {
            if (null === o)
                throw new Error("We can't skip over an invalid tag with undefined length at offset " + s);
            n.pos = s + Math.abs(o)
        }
        return new t(r,a,o,i,u)
    }
    ,
    t
}()



function q(t, e) {
    var n = z[t.charCodeAt(e)];
    return null == n ? -1 : n
}

function V(t) {
    var e, n = 1;
    return 0 != (e = t >>> 16) && (t = e,
    n += 16),
    0 != (e = t >> 8) && (t = e,
    n += 8),
    0 != (e = t >> 4) && (t = e,
    n += 4),
    0 != (e = t >> 2) && (t = e,
    n += 2),
    0 != (e = t >> 1) && (t = e,
    n += 1),
    n
}

var j = function() {
    function t(t) {
        this.m = t,
        this.mp = t.invDigit(),
        this.mpl = 32767 & this.mp,
        this.mph = this.mp >> 15,
        this.um = (1 << t.DB - 15) - 1,
        this.mt2 = 2 * t.t
    }
    return t.prototype.convert = function(t) {
        var e = R();
        return t.abs().dlShiftTo(this.m.t, e),
        e.divRemTo(this.m, null, e),
        t.s < 0 && e.compareTo(Y.ZERO) > 0 && this.m.subTo(e, e),
        e
    }
    ,
    t.prototype.revert = function(t) {
        var e = R();
        return t.copyTo(e),
        this.reduce(e),
        e
    }
    ,
    t.prototype.reduce = function(t) {
        while (t.t <= this.mt2)
            t[t.t++] = 0;
        for (var e = 0; e < this.m.t; ++e) {
            var n = 32767 & t[e]
              , r = n * this.mpl + ((n * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
            n = e + this.m.t,
            t[n] += this.m.am(0, r, t, e, 0, this.m.t);
            while (t[n] >= t.DV)
                t[n] -= t.DV,
                t[++n]++
        }
        t.clamp(),
        t.drShiftTo(this.m.t, t),
        t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
    }
    ,
    t.prototype.mulTo = function(t, e, n) {
        t.multiplyTo(e, n),
        this.reduce(n)
    }
    ,
    t.prototype.sqrTo = function(t, e) {
        t.squareTo(e),
        this.reduce(e)
    }
    ,
    t
}()

var r = "0123456789abcdefghijklmnopqrstuvwxyz";
function i(t) {
    return r.charAt(t)
}

var A = 0xdeadbeefcafe, O = 15715070 == (16777215 & A),Y = function() {
    function t(t, e, n) {
        null != t && ("number" == typeof t ? this.fromNumber(t, e, n) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
    }
    return t.prototype.toString = function(t) {
        if (this.s < 0)
            return "-" + this.negate().toString(t);
        var e;
        if (16 == t)
            e = 4;
        else if (8 == t)
            e = 3;
        else if (2 == t)
            e = 1;
        else if (32 == t)
            e = 5;
        else {
            if (4 != t)
                return this.toRadix(t);
            e = 2
        }
        var n, r = (1 << e) - 1, o = !1, s = "", a = this.t, u = this.DB - a * this.DB % e;
        if (a-- > 0) {
            u < this.DB && (n = this[a] >> u) > 0 && (o = !0,
            s = i(n));
            while (a >= 0)
                u < e ? (n = (this[a] & (1 << u) - 1) << e - u,
                n |= this[--a] >> (u += this.DB - e)) : (n = this[a] >> (u -= e) & r,
                u <= 0 && (u += this.DB,
                --a)),
                n > 0 && (o = !0),
                o && (s += i(n))
        }
        return o ? s : "0"
    }
    ,
    t.prototype.negate = function() {
        var e = R();
        return t.ZERO.subTo(this, e),
        e
    }
    ,
    t.prototype.abs = function() {
        return this.s < 0 ? this.negate() : this
    }
    ,
    t.prototype.compareTo = function(t) {
        var e = this.s - t.s;
        if (0 != e)
            return e;
        var n = this.t;
        if (e = n - t.t,
        0 != e)
            return this.s < 0 ? -e : e;
        while (--n >= 0)
            if (0 != (e = this[n] - t[n]))
                return e;
        return 0
    }
    ,
    t.prototype.bitLength = function() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + V(this[this.t - 1] ^ this.s & this.DM)
    }
    ,
    t.prototype.mod = function(e) {
        var n = R();
        return this.abs().divRemTo(e, null, n),
        this.s < 0 && n.compareTo(t.ZERO) > 0 && e.subTo(n, n),
        n
    }
    ,
    t.prototype.modPowInt = function(t, e) {
        var n;
        return n = t < 256 || e.isEven() ? new I(e) : new j(e),
        this.exp(t, n)
    }
    ,
    t.prototype.clone = function() {
        var t = R();
        return this.copyTo(t),
        t
    }
    ,
    t.prototype.intValue = function() {
        if (this.s < 0) {
            if (1 == this.t)
                return this[0] - this.DV;
            if (0 == this.t)
                return -1
        } else {
            if (1 == this.t)
                return this[0];
            if (0 == this.t)
                return 0
        }
        return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
    }
    ,
    t.prototype.byteValue = function() {
        return 0 == this.t ? this.s : this[0] << 24 >> 24
    }
    ,
    t.prototype.shortValue = function() {
        return 0 == this.t ? this.s : this[0] << 16 >> 16
    }
    ,
    t.prototype.signum = function() {
        return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
    }
    ,
    t.prototype.toByteArray = function() {
        var t = this.t
          , e = [];
        e[0] = this.s;
        var n, r = this.DB - t * this.DB % 8, i = 0;
        if (t-- > 0) {
            r < this.DB && (n = this[t] >> r) != (this.s & this.DM) >> r && (e[i++] = n | this.s << this.DB - r);
            while (t >= 0)
                r < 8 ? (n = (this[t] & (1 << r) - 1) << 8 - r,
                n |= this[--t] >> (r += this.DB - 8)) : (n = this[t] >> (r -= 8) & 255,
                r <= 0 && (r += this.DB,
                --t)),
                0 != (128 & n) && (n |= -256),
                0 == i && (128 & this.s) != (128 & n) && ++i,
                (i > 0 || n != this.s) && (e[i++] = n)
        }
        return e
    }
    ,
    t.prototype.equals = function(t) {
        return 0 == this.compareTo(t)
    }
    ,
    t.prototype.min = function(t) {
        return this.compareTo(t) < 0 ? this : t
    }
    ,
    t.prototype.max = function(t) {
        return this.compareTo(t) > 0 ? this : t
    }
    ,
    t.prototype.and = function(t) {
        var e = R();
        return this.bitwiseTo(t, o, e),
        e
    }
    ,
    t.prototype.or = function(t) {
        var e = R();
        return this.bitwiseTo(t, s, e),
        e
    }
    ,
    t.prototype.xor = function(t) {
        var e = R();
        return this.bitwiseTo(t, a, e),
        e
    }
    ,
    t.prototype.andNot = function(t) {
        var e = R();
        return this.bitwiseTo(t, u, e),
        e
    }
    ,
    t.prototype.not = function() {
        for (var t = R(), e = 0; e < this.t; ++e)
            t[e] = this.DM & ~this[e];
        return t.t = this.t,
        t.s = ~this.s,
        t
    }
    ,
    t.prototype.shiftLeft = function(t) {
        var e = R();
        return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e),
        e
    }
    ,
    t.prototype.shiftRight = function(t) {
        var e = R();
        return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e),
        e
    }
    ,
    t.prototype.getLowestSetBit = function() {
        for (var t = 0; t < this.t; ++t)
            if (0 != this[t])
                return t * this.DB + c(this[t]);
        return this.s < 0 ? this.t * this.DB : -1
    }
    ,
    t.prototype.bitCount = function() {
        for (var t = 0, e = this.s & this.DM, n = 0; n < this.t; ++n)
            t += l(this[n] ^ e);
        return t
    }
    ,
    t.prototype.testBit = function(t) {
        var e = Math.floor(t / this.DB);
        return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
    }
    ,
    t.prototype.setBit = function(t) {
        return this.changeBit(t, s)
    }
    ,
    t.prototype.clearBit = function(t) {
        return this.changeBit(t, u)
    }
    ,
    t.prototype.flipBit = function(t) {
        return this.changeBit(t, a)
    }
    ,
    t.prototype.add = function(t) {
        var e = R();
        return this.addTo(t, e),
        e
    }
    ,
    t.prototype.subtract = function(t) {
        var e = R();
        return this.subTo(t, e),
        e
    }
    ,
    t.prototype.multiply = function(t) {
        var e = R();
        return this.multiplyTo(t, e),
        e
    }
    ,
    t.prototype.divide = function(t) {
        var e = R();
        return this.divRemTo(t, e, null),
        e
    }
    ,
    t.prototype.remainder = function(t) {
        var e = R();
        return this.divRemTo(t, null, e),
        e
    }
    ,
    t.prototype.divideAndRemainder = function(t) {
        var e = R()
          , n = R();
        return this.divRemTo(t, e, n),
        [e, n]
    }
    ,
    t.prototype.modPow = function(t, e) {
        var n, r, i = t.bitLength(), o = W(1);
        if (i <= 0)
            return o;
        n = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6,
        r = i < 8 ? new I(e) : e.isEven() ? new N(e) : new j(e);
        var s = []
          , a = 3
          , u = n - 1
          , c = (1 << n) - 1;
        if (s[1] = r.convert(this),
        n > 1) {
            var l = R();
            r.sqrTo(s[1], l);
            while (a <= c)
                s[a] = R(),
                r.mulTo(l, s[a - 2], s[a]),
                a += 2
        }
        var d, h, f = t.t - 1, p = !0, m = R();
        i = V(t[f]) - 1;
        while (f >= 0) {
            i >= u ? d = t[f] >> i - u & c : (d = (t[f] & (1 << i + 1) - 1) << u - i,
            f > 0 && (d |= t[f - 1] >> this.DB + i - u)),
            a = n;
            while (0 == (1 & d))
                d >>= 1,
                --a;
            if ((i -= a) < 0 && (i += this.DB,
            --f),
            p)
                s[d].copyTo(o),
                p = !1;
            else {
                while (a > 1)
                    r.sqrTo(o, m),
                    r.sqrTo(m, o),
                    a -= 2;
                a > 0 ? r.sqrTo(o, m) : (h = o,
                o = m,
                m = h),
                r.mulTo(m, s[d], o)
            }
            while (f >= 0 && 0 == (t[f] & 1 << i))
                r.sqrTo(o, m),
                h = o,
                o = m,
                m = h,
                --i < 0 && (i = this.DB - 1,
                --f)
        }
        return r.revert(o)
    }
    ,
    t.prototype.modInverse = function(e) {
        var n = e.isEven();
        if (this.isEven() && n || 0 == e.signum())
            return t.ZERO;
        var r = e.clone()
          , i = this.clone()
          , o = W(1)
          , s = W(0)
          , a = W(0)
          , u = W(1);
        while (0 != r.signum()) {
            while (r.isEven())
                r.rShiftTo(1, r),
                n ? (o.isEven() && s.isEven() || (o.addTo(this, o),
                s.subTo(e, s)),
                o.rShiftTo(1, o)) : s.isEven() || s.subTo(e, s),
                s.rShiftTo(1, s);
            while (i.isEven())
                i.rShiftTo(1, i),
                n ? (a.isEven() && u.isEven() || (a.addTo(this, a),
                u.subTo(e, u)),
                a.rShiftTo(1, a)) : u.isEven() || u.subTo(e, u),
                u.rShiftTo(1, u);
            r.compareTo(i) >= 0 ? (r.subTo(i, r),
            n && o.subTo(a, o),
            s.subTo(u, s)) : (i.subTo(r, i),
            n && a.subTo(o, a),
            u.subTo(s, u))
        }
        return 0 != i.compareTo(t.ONE) ? t.ZERO : u.compareTo(e) >= 0 ? u.subtract(e) : u.signum() < 0 ? (u.addTo(e, u),
        u.signum() < 0 ? u.add(e) : u) : u
    }
    ,
    t.prototype.pow = function(t) {
        return this.exp(t, new C)
    }
    ,
    t.prototype.gcd = function(t) {
        var e = this.s < 0 ? this.negate() : this.clone()
          , n = t.s < 0 ? t.negate() : t.clone();
        if (e.compareTo(n) < 0) {
            var r = e;
            e = n,
            n = r
        }
        var i = e.getLowestSetBit()
          , o = n.getLowestSetBit();
        if (o < 0)
            return e;
        i < o && (o = i),
        o > 0 && (e.rShiftTo(o, e),
        n.rShiftTo(o, n));
        while (e.signum() > 0)
            (i = e.getLowestSetBit()) > 0 && e.rShiftTo(i, e),
            (i = n.getLowestSetBit()) > 0 && n.rShiftTo(i, n),
            e.compareTo(n) >= 0 ? (e.subTo(n, e),
            e.rShiftTo(1, e)) : (n.subTo(e, n),
            n.rShiftTo(1, n));
        return o > 0 && n.lShiftTo(o, n),
        n
    }
    ,
    t.prototype.isProbablePrime = function(t) {
        var e, n = this.abs();
        if (1 == n.t && n[0] <= D[D.length - 1]) {
            for (e = 0; e < D.length; ++e)
                if (n[0] == D[e])
                    return !0;
            return !1
        }
        if (n.isEven())
            return !1;
        e = 1;
        while (e < D.length) {
            var r = D[e]
              , i = e + 1;
            while (i < D.length && r < P)
                r *= D[i++];
            r = n.modInt(r);
            while (e < i)
                if (r % D[e++] == 0)
                    return !1
        }
        return n.millerRabin(t)
    }
    ,
    t.prototype.copyTo = function(t) {
        for (var e = this.t - 1; e >= 0; --e)
            t[e] = this[e];
        t.t = this.t,
        t.s = this.s
    }
    ,
    t.prototype.fromInt = function(t) {
        this.t = 1,
        this.s = t < 0 ? -1 : 0,
        t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
    }
    ,
    t.prototype.fromString = function(e, n) {
        var r;
        if (16 == n)
            r = 4;
        else if (8 == n)
            r = 3;
        else if (256 == n)
            r = 8;
        else if (2 == n)
            r = 1;
        else if (32 == n)
            r = 5;
        else {
            if (4 != n)
                return void this.fromRadix(e, n);
            r = 2
        }
        this.t = 0,
        this.s = 0;
        var i = e.length
          , o = !1
          , s = 0;
        while (--i >= 0) {
            var a = 8 == r ? 255 & +e[i] : q(e, i);
            a < 0 ? "-" == e.charAt(i) && (o = !0) : (o = !1,
            0 == s ? this[this.t++] = a : s + r > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - s) - 1) << s,
            this[this.t++] = a >> this.DB - s) : this[this.t - 1] |= a << s,
            s += r,
            s >= this.DB && (s -= this.DB))
        }
        8 == r && 0 != (128 & +e[0]) && (this.s = -1,
        s > 0 && (this[this.t - 1] |= (1 << this.DB - s) - 1 << s)),
        this.clamp(),
        o && t.ZERO.subTo(this, this)
    }
    ,
    t.prototype.clamp = function() {
        var t = this.s & this.DM;
        while (this.t > 0 && this[this.t - 1] == t)
            --this.t
    }
    ,
    t.prototype.dlShiftTo = function(t, e) {
        var n;
        for (n = this.t - 1; n >= 0; --n)
            e[n + t] = this[n];
        for (n = t - 1; n >= 0; --n)
            e[n] = 0;
        e.t = this.t + t,
        e.s = this.s
    }
    ,
    t.prototype.drShiftTo = function(t, e) {
        for (var n = t; n < this.t; ++n)
            e[n - t] = this[n];
        e.t = Math.max(this.t - t, 0),
        e.s = this.s
    }
    ,
    t.prototype.lShiftTo = function(t, e) {
        for (var n = t % this.DB, r = this.DB - n, i = (1 << r) - 1, o = Math.floor(t / this.DB), s = this.s << n & this.DM, a = this.t - 1; a >= 0; --a)
            e[a + o + 1] = this[a] >> r | s,
            s = (this[a] & i) << n;
        for (a = o - 1; a >= 0; --a)
            e[a] = 0;
        e[o] = s,
        e.t = this.t + o + 1,
        e.s = this.s,
        e.clamp()
    }
    ,
    t.prototype.rShiftTo = function(t, e) {
        e.s = this.s;
        var n = Math.floor(t / this.DB);
        if (n >= this.t)
            e.t = 0;
        else {
            var r = t % this.DB
              , i = this.DB - r
              , o = (1 << r) - 1;
            e[0] = this[n] >> r;
            for (var s = n + 1; s < this.t; ++s)
                e[s - n - 1] |= (this[s] & o) << i,
                e[s - n] = this[s] >> r;
            r > 0 && (e[this.t - n - 1] |= (this.s & o) << i),
            e.t = this.t - n,
            e.clamp()
        }
    }
    ,
    t.prototype.subTo = function(t, e) {
        var n = 0
          , r = 0
          , i = Math.min(t.t, this.t);
        while (n < i)
            r += this[n] - t[n],
            e[n++] = r & this.DM,
            r >>= this.DB;
        if (t.t < this.t) {
            r -= t.s;
            while (n < this.t)
                r += this[n],
                e[n++] = r & this.DM,
                r >>= this.DB;
            r += this.s
        } else {
            r += this.s;
            while (n < t.t)
                r -= t[n],
                e[n++] = r & this.DM,
                r >>= this.DB;
            r -= t.s
        }
        e.s = r < 0 ? -1 : 0,
        r < -1 ? e[n++] = this.DV + r : r > 0 && (e[n++] = r),
        e.t = n,
        e.clamp()
    }
    ,
    t.prototype.multiplyTo = function(e, n) {
        var r = this.abs()
          , i = e.abs()
          , o = r.t;
        n.t = o + i.t;
        while (--o >= 0)
            n[o] = 0;
        for (o = 0; o < i.t; ++o)
            n[o + r.t] = r.am(0, i[o], n, o, 0, r.t);
        n.s = 0,
        n.clamp(),
        this.s != e.s && t.ZERO.subTo(n, n)
    }
    ,
    t.prototype.squareTo = function(t) {
        var e = this.abs()
          , n = t.t = 2 * e.t;
        while (--n >= 0)
            t[n] = 0;
        for (n = 0; n < e.t - 1; ++n) {
            var r = e.am(n, e[n], t, 2 * n, 0, 1);
            (t[n + e.t] += e.am(n + 1, 2 * e[n], t, 2 * n + 1, r, e.t - n - 1)) >= e.DV && (t[n + e.t] -= e.DV,
            t[n + e.t + 1] = 1)
        }
        t.t > 0 && (t[t.t - 1] += e.am(n, e[n], t, 2 * n, 0, 1)),
        t.s = 0,
        t.clamp()
    }
    ,
    t.prototype.divRemTo = function(e, n, r) {
        var i = e.abs();
        if (!(i.t <= 0)) {
            var o = this.abs();
            if (o.t < i.t)
                return null != n && n.fromInt(0),
                void (null != r && this.copyTo(r));
            null == r && (r = R());
            var s = R()
              , a = this.s
              , u = e.s
              , c = this.DB - V(i[i.t - 1]);
            c > 0 ? (i.lShiftTo(c, s),
            o.lShiftTo(c, r)) : (i.copyTo(s),
            o.copyTo(r));
            var l = s.t
              , d = s[l - 1];
            if (0 != d) {
                var h = d * (1 << this.F1) + (l > 1 ? s[l - 2] >> this.F2 : 0)
                  , f = this.FV / h
                  , p = (1 << this.F1) / h
                  , m = 1 << this.F2
                  , g = r.t
                  , y = g - l
                  , v = null == n ? R() : n;
                s.dlShiftTo(y, v),
                r.compareTo(v) >= 0 && (r[r.t++] = 1,
                r.subTo(v, r)),
                t.ONE.dlShiftTo(l, v),
                v.subTo(s, s);
                while (s.t < l)
                    s[s.t++] = 0;
                while (--y >= 0) {
                    var _ = r[--g] == d ? this.DM : Math.floor(r[g] * f + (r[g - 1] + m) * p);
                    if ((r[g] += s.am(0, _, r, y, 0, l)) < _) {
                        s.dlShiftTo(y, v),
                        r.subTo(v, r);
                        while (r[g] < --_)
                            r.subTo(v, r)
                    }
                }
                null != n && (r.drShiftTo(l, n),
                a != u && t.ZERO.subTo(n, n)),
                r.t = l,
                r.clamp(),
                c > 0 && r.rShiftTo(c, r),
                a < 0 && t.ZERO.subTo(r, r)
            }
        }
    }
    ,
    t.prototype.invDigit = function() {
        if (this.t < 1)
            return 0;
        var t = this[0];
        if (0 == (1 & t))
            return 0;
        var e = 3 & t;
        return e = e * (2 - (15 & t) * e) & 15,
        e = e * (2 - (255 & t) * e) & 255,
        e = e * (2 - ((65535 & t) * e & 65535)) & 65535,
        e = e * (2 - t * e % this.DV) % this.DV,
        e > 0 ? this.DV - e : -e
    }
    ,
    t.prototype.isEven = function() {
        return 0 == (this.t > 0 ? 1 & this[0] : this.s)
    }
    ,
    t.prototype.exp = function(e, n) {
        if (e > 4294967295 || e < 1)
            return t.ONE;
        var r = R()
          , i = R()
          , o = n.convert(this)
          , s = V(e) - 1;
        o.copyTo(r);
        while (--s >= 0)
            if (n.sqrTo(r, i),
            (e & 1 << s) > 0)
                n.mulTo(i, o, r);
            else {
                var a = r;
                r = i,
                i = a
            }
        return n.revert(r)
    }
    ,
    t.prototype.chunkSize = function(t) {
        return Math.floor(Math.LN2 * this.DB / Math.log(t))
    }
    ,
    t.prototype.toRadix = function(t) {
        if (null == t && (t = 10),
        0 == this.signum() || t < 2 || t > 36)
            return "0";
        var e = this.chunkSize(t)
          , n = Math.pow(t, e)
          , r = W(n)
          , i = R()
          , o = R()
          , s = "";
        this.divRemTo(r, i, o);
        while (i.signum() > 0)
            s = (n + o.intValue()).toString(t).substr(1) + s,
            i.divRemTo(r, i, o);
        return o.intValue().toString(t) + s
    }
    ,
    t.prototype.fromRadix = function(e, n) {
        this.fromInt(0),
        null == n && (n = 10);
        for (var r = this.chunkSize(n), i = Math.pow(n, r), o = !1, s = 0, a = 0, u = 0; u < e.length; ++u) {
            var c = q(e, u);
            c < 0 ? "-" == e.charAt(u) && 0 == this.signum() && (o = !0) : (a = n * a + c,
            ++s >= r && (this.dMultiply(i),
            this.dAddOffset(a, 0),
            s = 0,
            a = 0))
        }
        s > 0 && (this.dMultiply(Math.pow(n, s)),
        this.dAddOffset(a, 0)),
        o && t.ZERO.subTo(this, this)
    }
    ,
    t.prototype.fromNumber = function(e, n, r) {
        if ("number" == typeof n)
            if (e < 2)
                this.fromInt(1);
            else {
                this.fromNumber(e, r),
                this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), s, this),
                this.isEven() && this.dAddOffset(1, 0);
                while (!this.isProbablePrime(n))
                    this.dAddOffset(2, 0),
                    this.bitLength() > e && this.subTo(t.ONE.shiftLeft(e - 1), this)
            }
        else {
            var i = []
              , o = 7 & e;
            i.length = 1 + (e >> 3),
            n.nextBytes(i),
            o > 0 ? i[0] &= (1 << o) - 1 : i[0] = 0,
            this.fromString(i, 256)
        }
    }
    ,
    t.prototype.bitwiseTo = function(t, e, n) {
        var r, i, o = Math.min(t.t, this.t);
        for (r = 0; r < o; ++r)
            n[r] = e(this[r], t[r]);
        if (t.t < this.t) {
            for (i = t.s & this.DM,
            r = o; r < this.t; ++r)
                n[r] = e(this[r], i);
            n.t = this.t
        } else {
            for (i = this.s & this.DM,
            r = o; r < t.t; ++r)
                n[r] = e(i, t[r]);
            n.t = t.t
        }
        n.s = e(this.s, t.s),
        n.clamp()
    }
    ,
    t.prototype.changeBit = function(e, n) {
        var r = t.ONE.shiftLeft(e);
        return this.bitwiseTo(r, n, r),
        r
    }
    ,
    t.prototype.addTo = function(t, e) {
        var n = 0
          , r = 0
          , i = Math.min(t.t, this.t);
        while (n < i)
            r += this[n] + t[n],
            e[n++] = r & this.DM,
            r >>= this.DB;
        if (t.t < this.t) {
            r += t.s;
            while (n < this.t)
                r += this[n],
                e[n++] = r & this.DM,
                r >>= this.DB;
            r += this.s
        } else {
            r += this.s;
            while (n < t.t)
                r += t[n],
                e[n++] = r & this.DM,
                r >>= this.DB;
            r += t.s
        }
        e.s = r < 0 ? -1 : 0,
        r > 0 ? e[n++] = r : r < -1 && (e[n++] = this.DV + r),
        e.t = n,
        e.clamp()
    }
    ,
    t.prototype.dMultiply = function(t) {
        this[this.t] = this.am(0, t - 1, this, 0, 0, this.t),
        ++this.t,
        this.clamp()
    }
    ,
    t.prototype.dAddOffset = function(t, e) {
        if (0 != t) {
            while (this.t <= e)
                this[this.t++] = 0;
            this[e] += t;
            while (this[e] >= this.DV)
                this[e] -= this.DV,
                ++e >= this.t && (this[this.t++] = 0),
                ++this[e]
        }
    }
    ,
    t.prototype.multiplyLowerTo = function(t, e, n) {
        var r = Math.min(this.t + t.t, e);
        n.s = 0,
        n.t = r;
        while (r > 0)
            n[--r] = 0;
        for (var i = n.t - this.t; r < i; ++r)
            n[r + this.t] = this.am(0, t[r], n, r, 0, this.t);
        for (i = Math.min(t.t, e); r < i; ++r)
            this.am(0, t[r], n, r, 0, e - r);
        n.clamp()
    }
    ,
    t.prototype.multiplyUpperTo = function(t, e, n) {
        --e;
        var r = n.t = this.t + t.t - e;
        n.s = 0;
        while (--r >= 0)
            n[r] = 0;
        for (r = Math.max(e - this.t, 0); r < t.t; ++r)
            n[this.t + r - e] = this.am(e - r, t[r], n, 0, 0, this.t + r - e);
        n.clamp(),
        n.drShiftTo(1, n)
    }
    ,
    t.prototype.modInt = function(t) {
        if (t <= 0)
            return 0;
        var e = this.DV % t
          , n = this.s < 0 ? t - 1 : 0;
        if (this.t > 0)
            if (0 == e)
                n = this[0] % t;
            else
                for (var r = this.t - 1; r >= 0; --r)
                    n = (e * n + this[r]) % t;
        return n
    }
    ,
    t.prototype.millerRabin = function(e) {
        var n = this.subtract(t.ONE)
          , r = n.getLowestSetBit();
        if (r <= 0)
            return !1;
        var i = n.shiftRight(r);
        e = e + 1 >> 1,
        e > D.length && (e = D.length);
        for (var o = R(), s = 0; s < e; ++s) {
            o.fromInt(D[Math.floor(Math.random() * D.length)]);
            var a = o.modPow(i, this);
            if (0 != a.compareTo(t.ONE) && 0 != a.compareTo(n)) {
                var u = 1;
                while (u++ < r && 0 != a.compareTo(n))
                    if (a = a.modPowInt(2, this),
                    0 == a.compareTo(t.ONE))
                        return !1;
                if (0 != a.compareTo(n))
                    return !1
            }
        }
        return !0
    }
    ,
    t.prototype.square = function() {
        var t = R();
        return this.squareTo(t),
        t
    }
    ,
    t.prototype.gcda = function(t, e) {
        var n = this.s < 0 ? this.negate() : this.clone()
          , r = t.s < 0 ? t.negate() : t.clone();
        if (n.compareTo(r) < 0) {
            var i = n;
            n = r,
            r = i
        }
        var o = n.getLowestSetBit()
          , s = r.getLowestSetBit();
        if (s < 0)
            e(n);
        else {
            o < s && (s = o),
            s > 0 && (n.rShiftTo(s, n),
            r.rShiftTo(s, r));
            var a = function() {
                (o = n.getLowestSetBit()) > 0 && n.rShiftTo(o, n),
                (o = r.getLowestSetBit()) > 0 && r.rShiftTo(o, r),
                n.compareTo(r) >= 0 ? (n.subTo(r, n),
                n.rShiftTo(1, n)) : (r.subTo(n, r),
                r.rShiftTo(1, r)),
                n.signum() > 0 ? setTimeout(a, 0) : (s > 0 && r.lShiftTo(s, r),
                setTimeout((function() {
                    e(r)
                }
                ), 0))
            };
            setTimeout(a, 10)
        }
    }
    ,
    t.prototype.fromNumberAsync = function(e, n, r, i) {
        if ("number" == typeof n)
            if (e < 2)
                this.fromInt(1);
            else {
                this.fromNumber(e, r),
                this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), s, this),
                this.isEven() && this.dAddOffset(1, 0);
                var o = this
                  , a = function() {
                    o.dAddOffset(2, 0),
                    o.bitLength() > e && o.subTo(t.ONE.shiftLeft(e - 1), o),
                    o.isProbablePrime(n) ? setTimeout((function() {
                        i()
                    }
                    ), 0) : setTimeout(a, 0)
                };
                setTimeout(a, 0)
            }
        else {
            var u = []
              , c = 7 & e;
            u.length = 1 + (e >> 3),
            n.nextBytes(u),
            c > 0 ? u[0] &= (1 << c) - 1 : u[0] = 0,
            this.fromString(u, 256)
        }
    }
    ,
    t
}()
function R() {
    return new Y(null)
}
var B = "undefined" !== typeof navigator;
B && O && "Microsoft Internet Explorer" == navigator.appName ? (Y.prototype.am = function(t, e, n, r, i, o) {
    var s = 32767 & e
        , a = e >> 15;
    while (--o >= 0) {
        var u = 32767 & this[t]
            , c = this[t++] >> 15
            , l = a * u + c * s;
        u = s * u + ((32767 & l) << 15) + n[r] + (1073741823 & i),
        i = (u >>> 30) + (l >>> 15) + a * c + (i >>> 30),
        n[r++] = 1073741823 & u
    }
    return i
}
,
T = 30) : B && O && "Netscape" != navigator.appName ? (Y.prototype.am = function(t, e, n, r, i, o) {
    while (--o >= 0) {
        var s = e * this[t++] + n[r] + i;
        i = Math.floor(s / 67108864),
        n[r++] = 67108863 & s
    }
    return i
}
,
T = 26) : (Y.prototype.am = function(t, e, n, r, i, o) {
    var s = 16383 & e
        , a = e >> 14;
    while (--o >= 0) {
        var u = 16383 & this[t]
            , c = this[t++] >> 14
            , l = a * u + c * s;
        u = s * u + ((16383 & l) << 14) + n[r] + i,
        i = (u >> 28) + (l >> 14) + a * c,
        n[r++] = 268435455 & u
    }
    return i
}
,
T = 28),
Y.prototype.DB = T,
Y.prototype.DM = (1 << T) - 1,
Y.prototype.DV = 1 << T;

function W(t) {
    var e = R();
    return e.fromInt(t),
    e
}
var $ = 52;
Y.prototype.FV = Math.pow(2, $),
Y.prototype.F1 = $ - T,
Y.prototype.F2 = 2 * T - $;
Y.ZERO = W(0),
Y.ONE = W(1)
var U, F, z = [];
for (U = "0".charCodeAt(0),
F = 0; F <= 9; ++F)
    z[U++] = F;
for (U = "a".charCodeAt(0),
F = 10; F < 36; ++F)
    z[U++] = F;
for (U = "A".charCodeAt(0),
F = 10; F < 36; ++F)
    z[U++] = F;

function H(t, e) {
    return new Y(t,e)
}

var n9242 = function(t, e, n) {
    var r = n(62876)
      , i = n(15941)
      , o = Object.getOwnPropertyDescriptors || function(t) {
        for (var e = Object.keys(t), n = {}, r = 0; r < e.length; r++)
            n[e[r]] = Object.getOwnPropertyDescriptor(t, e[r]);
        return n
    }
      , s = /%[sdj%]/g;
    e.format = function(t) {
        if (!T(t)) {
            for (var e = [], n = 0; n < arguments.length; n++)
                e.push(l(arguments[n]));
            return e.join(" ")
        }
        n = 1;
        for (var r = arguments, i = r.length, o = String(t).replace(s, (function(t) {
            if ("%%" === t)
                return "%";
            if (n >= i)
                return t;
            switch (t) {
            case "%s":
                return String(r[n++]);
            case "%d":
                return Number(r[n++]);
            case "%j":
                try {
                    return JSON.stringify(r[n++])
                } catch (e) {
                    return "[Circular]"
                }
            default:
                return t
            }
        }
        )), a = r[n]; n < i; a = r[++n])
            M(a) || !A(a) ? o += " " + a : o += " " + l(a);
        return o
    }
    ,
    e.deprecate = function(t, n) {
        if ("undefined" !== typeof r && !0 === r.noDeprecation)
            return t;
        if ("undefined" === typeof r)
            return function() {
                return e.deprecate(t, n).apply(this, arguments)
            }
            ;
        var o = !1;
        function s() {
            if (!o) {
                if (r.throwDeprecation)
                    throw new Error(n);
                r.traceDeprecation ? i.trace(n) : i.error(n),
                o = !0
            }
            return t.apply(this, arguments)
        }
        return s
    }
    ;
    var a = {}
      , u = /^$/;
    if ({
        NODE_ENV: "production",
        VUE_APP_BASE_API: "https://api.matr1x.io",
        BASE_URL: "/"
    }.NODE_DEBUG) {
        var c = {
            NODE_ENV: "production",
            VUE_APP_BASE_API: "https://api.matr1x.io",
            BASE_URL: "/"
        }.NODE_DEBUG;
        c = c.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(),
        u = new RegExp("^" + c + "$","i")
    }
    function l(t, n) {
        var r = {
            seen: [],
            stylize: h
        };
        return arguments.length >= 3 && (r.depth = arguments[2]),
        arguments.length >= 4 && (r.colors = arguments[3]),
        w(n) ? r.showHidden = n : n && e._extend(r, n),
        L(r.showHidden) && (r.showHidden = !1),
        L(r.depth) && (r.depth = 2),
        L(r.colors) && (r.colors = !1),
        L(r.customInspect) && (r.customInspect = !0),
        r.colors && (r.stylize = d),
        p(r, t, r.depth)
    }
    function d(t, e) {
        var n = l.styles[e];
        return n ? "[" + l.colors[n][0] + "m" + t + "[" + l.colors[n][1] + "m" : t
    }
    function h(t, e) {
        return t
    }
    function f(t) {
        var e = {};
        return t.forEach((function(t, n) {
            e[t] = !0
        }
        )),
        e
    }
    function p(t, n, r) {
        if (t.customInspect && n && P(n.inspect) && n.inspect !== e.inspect && (!n.constructor || n.constructor.prototype !== n)) {
            var i = n.inspect(r, t);
            return T(i) || (i = p(t, i, r)),
            i
        }
        var o = m(t, n);
        if (o)
            return o;
        var s = Object.keys(n)
          , a = f(s);
        if (t.showHidden && (s = Object.getOwnPropertyNames(n)),
        D(n) && (s.indexOf("message") >= 0 || s.indexOf("description") >= 0))
            return g(n);
        if (0 === s.length) {
            if (P(n)) {
                var u = n.name ? ": " + n.name : "";
                return t.stylize("[Function" + u + "]", "special")
            }
            if (k(n))
                return t.stylize(RegExp.prototype.toString.call(n), "regexp");
            if (O(n))
                return t.stylize(Date.prototype.toString.call(n), "date");
            if (D(n))
                return g(n)
        }
        var c, l = "", d = !1, h = ["{", "}"];
        if (b(n) && (d = !0,
        h = ["[", "]"]),
        P(n)) {
            var w = n.name ? ": " + n.name : "";
            l = " [Function" + w + "]"
        }
        return k(n) && (l = " " + RegExp.prototype.toString.call(n)),
        O(n) && (l = " " + Date.prototype.toUTCString.call(n)),
        D(n) && (l = " " + g(n)),
        0 !== s.length || d && 0 != n.length ? r < 0 ? k(n) ? t.stylize(RegExp.prototype.toString.call(n), "regexp") : t.stylize("[Object]", "special") : (t.seen.push(n),
        c = d ? y(t, n, r, a, s) : s.map((function(e) {
            return v(t, n, r, a, e, d)
        }
        )),
        t.seen.pop(),
        _(c, l, h)) : h[0] + l + h[1]
    }
    function m(t, e) {
        if (L(e))
            return t.stylize("undefined", "undefined");
        if (T(e)) {
            var n = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
            return t.stylize(n, "string")
        }
        return E(e) ? t.stylize("" + e, "number") : w(e) ? t.stylize("" + e, "boolean") : M(e) ? t.stylize("null", "null") : void 0
    }
    function g(t) {
        return "[" + Error.prototype.toString.call(t) + "]"
    }
    function y(t, e, n, r, i) {
        for (var o = [], s = 0, a = e.length; s < a; ++s)
            R(e, String(s)) ? o.push(v(t, e, n, r, String(s), !0)) : o.push("");
        return i.forEach((function(i) {
            i.match(/^\d+$/) || o.push(v(t, e, n, r, i, !0))
        }
        )),
        o
    }
    function v(t, e, n, r, i, o) {
        var s, a, u;
        if (u = Object.getOwnPropertyDescriptor(e, i) || {
            value: e[i]
        },
        u.get ? a = u.set ? t.stylize("[Getter/Setter]", "special") : t.stylize("[Getter]", "special") : u.set && (a = t.stylize("[Setter]", "special")),
        R(r, i) || (s = "[" + i + "]"),
        a || (t.seen.indexOf(u.value) < 0 ? (a = M(n) ? p(t, u.value, null) : p(t, u.value, n - 1),
        a.indexOf("\n") > -1 && (a = o ? a.split("\n").map((function(t) {
            return "  " + t
        }
        )).join("\n").slice(2) : "\n" + a.split("\n").map((function(t) {
            return "   " + t
        }
        )).join("\n"))) : a = t.stylize("[Circular]", "special")),
        L(s)) {
            if (o && i.match(/^\d+$/))
                return a;
            s = JSON.stringify("" + i),
            s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (s = s.slice(1, -1),
            s = t.stylize(s, "name")) : (s = s.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"),
            s = t.stylize(s, "string"))
        }
        return s + ": " + a
    }
    function _(t, e, n) {
        var r = t.reduce((function(t, e) {
            return e.indexOf("\n") >= 0 && 0,
            t + e.replace(/\u001b\[\d\d?m/g, "").length + 1
        }
        ), 0);
        return r > 60 ? n[0] + ("" === e ? "" : e + "\n ") + " " + t.join(",\n  ") + " " + n[1] : n[0] + e + " " + t.join(", ") + " " + n[1]
    }
    function b(t) {
        return Array.isArray(t)
    }
    function w(t) {
        return "boolean" === typeof t
    }
    function M(t) {
        return null === t
    }
    function S(t) {
        return null == t
    }
    function E(t) {
        return "number" === typeof t
    }
    function T(t) {
        return "string" === typeof t
    }
    function x(t) {
        return "symbol" === typeof t
    }
    function L(t) {
        return void 0 === t
    }
    function k(t) {
        return A(t) && "[object RegExp]" === C(t)
    }
    function A(t) {
        return "object" === typeof t && null !== t
    }
    function O(t) {
        return A(t) && "[object Date]" === C(t)
    }
    function D(t) {
        return A(t) && ("[object Error]" === C(t) || t instanceof Error)
    }
    function P(t) {
        return "function" === typeof t
    }
    function Y(t) {
        return null === t || "boolean" === typeof t || "number" === typeof t || "string" === typeof t || "symbol" === typeof t || "undefined" === typeof t
    }
    function C(t) {
        return Object.prototype.toString.call(t)
    }
    function I(t) {
        return t < 10 ? "0" + t.toString(10) : t.toString(10)
    }
    e.debuglog = function(t) {
        if (t = t.toUpperCase(),
        !a[t])
            if (u.test(t)) {
                var n = r.pid;
                a[t] = function() {
                    var r = e.format.apply(e, arguments);
                    i.error("%s %d: %s", t, n, r)
                }
            } else
                a[t] = function() {}
                ;
        return a[t]
    }
    ,
    e.inspect = l,
    l.colors = {
        bold: [1, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        white: [37, 39],
        grey: [90, 39],
        black: [30, 39],
        blue: [34, 39],
        cyan: [36, 39],
        green: [32, 39],
        magenta: [35, 39],
        red: [31, 39],
        yellow: [33, 39]
    },
    l.styles = {
        special: "cyan",
        number: "yellow",
        boolean: "yellow",
        undefined: "grey",
        null: "bold",
        string: "green",
        date: "magenta",
        regexp: "red"
    },
    e.types = n(10606),
    e.isArray = b,
    e.isBoolean = w,
    e.isNull = M,
    e.isNullOrUndefined = S,
    e.isNumber = E,
    e.isString = T,
    e.isSymbol = x,
    e.isUndefined = L,
    e.isRegExp = k,
    e.types.isRegExp = k,
    e.isObject = A,
    e.isDate = O,
    e.types.isDate = O,
    e.isError = D,
    e.types.isNativeError = D,
    e.isFunction = P,
    e.isPrimitive = Y,
    e.isBuffer = n(42051);
    var j = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function N() {
        var t = new Date
          , e = [I(t.getHours()), I(t.getMinutes()), I(t.getSeconds())].join(":");
        return [t.getDate(), j[t.getMonth()], e].join(" ")
    }
    function R(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    e.log = function() {
        i.log("%s - %s", N(), e.format.apply(e, arguments))
    }
    ,
    e.inherits = n(81923),
    e._extend = function(t, e) {
        if (!e || !A(e))
            return t;
        var n = Object.keys(e)
          , r = n.length;
        while (r--)
            t[n[r]] = e[n[r]];
        return t
    }
    ;
    var H = "undefined" !== typeof Symbol ? Symbol("util.promisify.custom") : void 0;
    function B(t, e) {
        if (!t) {
            var n = new Error("Promise was rejected with a falsy value");
            n.reason = t,
            t = n
        }
        return e(t)
    }
    function $(t) {
        if ("function" !== typeof t)
            throw new TypeError('The "original" argument must be of type Function');
        function e() {
            for (var e = [], n = 0; n < arguments.length; n++)
                e.push(arguments[n]);
            var i = e.pop();
            if ("function" !== typeof i)
                throw new TypeError("The last argument must be of type Function");
            var o = this
              , s = function() {
                return i.apply(o, arguments)
            };
            t.apply(this, e).then((function(t) {
                r.nextTick(s.bind(null, null, t))
            }
            ), (function(t) {
                r.nextTick(B.bind(null, t, s))
            }
            ))
        }
        return Object.setPrototypeOf(e, Object.getPrototypeOf(t)),
        Object.defineProperties(e, o(t)),
        e
    }
    e.promisify = function(t) {
        if ("function" !== typeof t)
            throw new TypeError('The "original" argument must be of type Function');
        if (H && t[H]) {
            var e = t[H];
            if ("function" !== typeof e)
                throw new TypeError('The "util.promisify.custom" argument must be of type Function');
            return Object.defineProperty(e, H, {
                value: e,
                enumerable: !1,
                writable: !1,
                configurable: !0
            }),
            e
        }
        function e() {
            for (var e, n, r = new Promise((function(t, r) {
                e = t,
                n = r
            }
            )), i = [], o = 0; o < arguments.length; o++)
                i.push(arguments[o]);
            i.push((function(t, r) {
                t ? n(t) : e(r)
            }
            ));
            try {
                t.apply(this, i)
            } catch (s) {
                n(s)
            }
            return r
        }
        return Object.setPrototypeOf(e, Object.getPrototypeOf(t)),
        H && Object.defineProperty(e, H, {
            value: e,
            enumerable: !1,
            writable: !1,
            configurable: !0
        }),
        Object.defineProperties(e, o(t))
    }
    ,
    e.promisify.custom = H,
    e.callbackify = $
}

var n52504 = function(t, e, n) {
    "use strict";
    var r = n(62876)
      , i = n(15941);
    function o(t) {
        return o = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" === typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ,
        o(t)
    }
    function s(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    var a, u, c = n(15907), l = c.codes, d = l.ERR_AMBIGUOUS_ARGUMENT, h = l.ERR_INVALID_ARG_TYPE, f = l.ERR_INVALID_ARG_VALUE, p = l.ERR_INVALID_RETURN_VALUE, m = l.ERR_MISSING_ARGS, g = n(70158), y = n(28657), v = y.inspect, _ = n(28657).types, b = _.isPromise, w = _.isRegExp, M = Object.assign ? Object.assign : n(85865).assign, S = Object.is ? Object.is : n(62640);
    new Map;
    function E() {
        var t = n(13716);
        a = t.isDeepEqual,
        u = t.isDeepStrictEqual
    }
    var T = !1
      , x = t.exports = D
      , L = {};
    function k(t) {
        if (t.message instanceof Error)
            throw t.message;
        throw new g(t)
    }
    function A(t, e, n, o, s) {
        var a, u = arguments.length;
        if (0 === u)
            a = "Failed";
        else if (1 === u)
            n = t,
            t = void 0;
        else {
            if (!1 === T) {
                T = !0;
                var c = r.emitWarning ? r.emitWarning : i.warn.bind(i);
                c("assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.", "DeprecationWarning", "DEP0094")
            }
            2 === u && (o = "!=")
        }
        if (n instanceof Error)
            throw n;
        var l = {
            actual: t,
            expected: e,
            operator: void 0 === o ? "fail" : o,
            stackStartFn: s || A
        };
        void 0 !== n && (l.message = n);
        var d = new g(l);
        throw a && (d.message = a,
        d.generatedMessage = !0),
        d
    }
    function O(t, e, n, r) {
        if (!n) {
            var i = !1;
            if (0 === e)
                i = !0,
                r = "No value argument passed to `assert.ok()`";
            else if (r instanceof Error)
                throw r;
            var o = new g({
                actual: n,
                expected: !0,
                message: r,
                operator: "==",
                stackStartFn: t
            });
            throw o.generatedMessage = i,
            o
        }
    }
    function D() {
        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
            e[n] = arguments[n];
        O.apply(void 0, [D, e.length].concat(e))
    }
    function P(t, e, n) {
        if (arguments.length < 2)
            throw new m("actual","expected");
        void 0 === a && E(),
        u(t, e) && k({
            actual: t,
            expected: e,
            message: n,
            operator: "notDeepStrictEqual",
            stackStartFn: P
        })
    }
    x.fail = A,
    x.AssertionError = g,
    x.ok = D,
    x.equal = function t(e, n, r) {
        if (arguments.length < 2)
            throw new m("actual","expected");
        e != n && k({
            actual: e,
            expected: n,
            message: r,
            operator: "==",
            stackStartFn: t
        })
    }
    ,
    x.notEqual = function t(e, n, r) {
        if (arguments.length < 2)
            throw new m("actual","expected");
        e == n && k({
            actual: e,
            expected: n,
            message: r,
            operator: "!=",
            stackStartFn: t
        })
    }
    ,
    x.deepEqual = function t(e, n, r) {
        if (arguments.length < 2)
            throw new m("actual","expected");
        void 0 === a && E(),
        a(e, n) || k({
            actual: e,
            expected: n,
            message: r,
            operator: "deepEqual",
            stackStartFn: t
        })
    }
    ,
    x.notDeepEqual = function t(e, n, r) {
        if (arguments.length < 2)
            throw new m("actual","expected");
        void 0 === a && E(),
        a(e, n) && k({
            actual: e,
            expected: n,
            message: r,
            operator: "notDeepEqual",
            stackStartFn: t
        })
    }
    ,
    x.deepStrictEqual = function t(e, n, r) {
        if (arguments.length < 2)
            throw new m("actual","expected");
        void 0 === a && E(),
        u(e, n) || k({
            actual: e,
            expected: n,
            message: r,
            operator: "deepStrictEqual",
            stackStartFn: t
        })
    }
    ,
    x.notDeepStrictEqual = P,
    x.strictEqual = function t(e, n, r) {
        if (arguments.length < 2)
            throw new m("actual","expected");
        S(e, n) || k({
            actual: e,
            expected: n,
            message: r,
            operator: "strictEqual",
            stackStartFn: t
        })
    }
    ,
    x.notStrictEqual = function t(e, n, r) {
        if (arguments.length < 2)
            throw new m("actual","expected");
        S(e, n) && k({
            actual: e,
            expected: n,
            message: r,
            operator: "notStrictEqual",
            stackStartFn: t
        })
    }
    ;
    var Y = function t(e, n, r) {
        var i = this;
        s(this, t),
        n.forEach((function(t) {
            t in e && (void 0 !== r && "string" === typeof r[t] && w(e[t]) && e[t].test(r[t]) ? i[t] = r[t] : i[t] = e[t])
        }
        ))
    };
    function C(t, e, n, r, i, o) {
        if (!(n in t) || !u(t[n], e[n])) {
            if (!r) {
                var s = new Y(t,i)
                  , a = new Y(e,i,t)
                  , c = new g({
                    actual: s,
                    expected: a,
                    operator: "deepStrictEqual",
                    stackStartFn: o
                });
                throw c.actual = t,
                c.expected = e,
                c.operator = o.name,
                c
            }
            k({
                actual: t,
                expected: e,
                message: r,
                operator: o.name,
                stackStartFn: o
            })
        }
    }
    function I(t, e, n, r) {
        if ("function" !== typeof e) {
            if (w(e))
                return e.test(t);
            if (2 === arguments.length)
                throw new h("expected",["Function", "RegExp"],e);
            if ("object" !== o(t) || null === t) {
                var i = new g({
                    actual: t,
                    expected: e,
                    message: n,
                    operator: "deepStrictEqual",
                    stackStartFn: r
                });
                throw i.operator = r.name,
                i
            }
            var s = Object.keys(e);
            if (e instanceof Error)
                s.push("name", "message");
            else if (0 === s.length)
                throw new f("error",e,"may not be an empty object");
            return void 0 === a && E(),
            s.forEach((function(i) {
                "string" === typeof t[i] && w(e[i]) && e[i].test(t[i]) || C(t, e, i, n, s, r)
            }
            )),
            !0
        }
        return void 0 !== e.prototype && t instanceof e || !Error.isPrototypeOf(e) && !0 === e.call({}, t)
    }
    function j(t) {
        if ("function" !== typeof t)
            throw new h("fn","Function",t);
        try {
            t()
        } catch (e) {
            return e
        }
        return L
    }
    function N(t) {
        return b(t) || null !== t && "object" === o(t) && "function" === typeof t.then && "function" === typeof t.catch
    }
    function R(t) {
        return Promise.resolve().then((function() {
            var e;
            if ("function" === typeof t) {
                if (e = t(),
                !N(e))
                    throw new p("instance of Promise","promiseFn",e)
            } else {
                if (!N(t))
                    throw new h("promiseFn",["Function", "Promise"],t);
                e = t
            }
            return Promise.resolve().then((function() {
                return e
            }
            )).then((function() {
                return L
            }
            )).catch((function(t) {
                return t
            }
            ))
        }
        ))
    }
    function H(t, e, n, r) {
        if ("string" === typeof n) {
            if (4 === arguments.length)
                throw new h("error",["Object", "Error", "Function", "RegExp"],n);
            if ("object" === o(e) && null !== e) {
                if (e.message === n)
                    throw new d("error/message",'The error message "'.concat(e.message, '" is identical to the message.'))
            } else if (e === n)
                throw new d("error/message",'The error "'.concat(e, '" is identical to the message.'));
            r = n,
            n = void 0
        } else if (null != n && "object" !== o(n) && "function" !== typeof n)
            throw new h("error",["Object", "Error", "Function", "RegExp"],n);
        if (e === L) {
            var i = "";
            n && n.name && (i += " (".concat(n.name, ")")),
            i += r ? ": ".concat(r) : ".";
            var s = "rejects" === t.name ? "rejection" : "exception";
            k({
                actual: void 0,
                expected: n,
                operator: t.name,
                message: "Missing expected ".concat(s).concat(i),
                stackStartFn: t
            })
        }
        if (n && !I(e, n, r, t))
            throw e
    }
    function B(t, e, n, r) {
        if (e !== L) {
            if ("string" === typeof n && (r = n,
            n = void 0),
            !n || I(e, n)) {
                var i = r ? ": ".concat(r) : "."
                  , o = "doesNotReject" === t.name ? "rejection" : "exception";
                k({
                    actual: e,
                    expected: n,
                    operator: t.name,
                    message: "Got unwanted ".concat(o).concat(i, "\n") + 'Actual message: "'.concat(e && e.message, '"'),
                    stackStartFn: t
                })
            }
            throw e
        }
    }
    function $() {
        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
            e[n] = arguments[n];
        O.apply(void 0, [$, e.length].concat(e))
    }
    x.throws = function t(e) {
        for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
            r[i - 1] = arguments[i];
        H.apply(void 0, [t, j(e)].concat(r))
    }
    ,
    x.rejects = function t(e) {
        for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
            r[i - 1] = arguments[i];
        return R(e).then((function(e) {
            return H.apply(void 0, [t, e].concat(r))
        }
        ))
    }
    ,
    x.doesNotThrow = function t(e) {
        for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
            r[i - 1] = arguments[i];
        B.apply(void 0, [t, j(e)].concat(r))
    }
    ,
    x.doesNotReject = function t(e) {
        for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
            r[i - 1] = arguments[i];
        return R(e).then((function(e) {
            return B.apply(void 0, [t, e].concat(r))
        }
        ))
    }
    ,
    x.ifError = function t(e) {
        if (null !== e && void 0 !== e) {
            var n = "ifError got unwanted exception: ";
            "object" === o(e) && "string" === typeof e.message ? 0 === e.message.length && e.constructor ? n += e.constructor.name : n += e.message : n += v(e);
            var r = new g({
                actual: e,
                expected: null,
                operator: "ifError",
                message: n,
                stackStartFn: t
            })
              , i = e.stack;
            if ("string" === typeof i) {
                var s = i.split("\n");
                s.shift();
                for (var a = r.stack.split("\n"), u = 0; u < s.length; u++) {
                    var c = a.indexOf(s[u]);
                    if (-1 !== c) {
                        a = a.slice(0, c);
                        break
                    }
                }
                r.stack = "".concat(a.join("\n"), "\n").concat(s.join("\n"))
            }
            throw r
        }
    }
    ,
    x.strict = M($, x, {
        equal: x.strictEqual,
        deepEqual: x.deepStrictEqual,
        notEqual: x.notStrictEqual,
        notDeepEqual: x.notDeepStrictEqual
    }),
    x.strict.strict = x.strict
}
var G = function() {
    function t() {
        this.i = 0,
        this.j = 0,
        this.S = []
    }
    return t.prototype.init = function(t) {
        var e, n, r;
        for (e = 0; e < 256; ++e)
            this.S[e] = e;
        for (n = 0,
        e = 0; e < 256; ++e)
            n = n + this.S[e] + t[e % t.length] & 255,
            r = this.S[e],
            this.S[e] = this.S[n],
            this.S[n] = r;
        this.i = 0,
        this.j = 0
    }
    ,
    t.prototype.next = function() {
        var t;
        return this.i = this.i + 1 & 255,
        this.j = this.j + this.S[this.i] & 255,
        t = this.S[this.i],
        this.S[this.i] = this.S[this.j],
        this.S[this.j] = t,
        this.S[t + this.S[this.i] & 255]
    }
    ,
    t
}();
function J() {
    return new G
}
var K, X, Z = 256, Q = null;
if (null == Q) {
    Q = [],
    X = 0;
    var tt = void 0;
    if (window.crypto && window.crypto.getRandomValues) {
        var et = new Uint32Array(256);
        for (window.crypto.getRandomValues(et),
        tt = 0; tt < et.length; ++tt)
            Q[X++] = 255 & et[tt]
    }
    var nt = 0
        , rt = function(t) {
        if (nt = nt || 0,
        nt >= 256 || X >= Z)
            window.removeEventListener ? window.removeEventListener("mousemove", rt, !1) : window.detachEvent && window.detachEvent("onmousemove", rt);
        else
            try {
                var e = t.x + t.y;
                Q[X++] = 255 & e,
                nt += 1
            } catch (n) {}
    };
    window.addEventListener ? window.addEventListener("mousemove", rt, !1) : window.attachEvent && window.attachEvent("onmousemove", rt)
}
function it() {
    if (null == K) {
        K = J();
        while (X < Z) {
            var t = Math.floor(65536 * Math.random());
            Q[X++] = 255 & t
        }
        for (K.init(Q),
        X = 0; X < Q.length; ++X)
            Q[X] = 0;
        X = 0
    }
    return K.next()
}
var ot = function() {
    function t() {}
    return t.prototype.nextBytes = function(t) {
        for (var e = 0; e < t.length; ++e)
            t[e] = it()
    }
    ,
    t
}()
var st = function(t, e, n) {
    var r = n9242
      , i = n52504;
    function o() {
        return (new Date).getTime()
    }
    var s, a = Array.prototype.slice, u = {};
    s = "undefined" !== typeof n.g && n.g.console ? n.g.console : "undefined" !== typeof window && window.console ? window.console : {};
    for (var c = [[p, "log"], [m, "info"], [g, "warn"], [y, "error"], [v, "time"], [_, "timeEnd"], [b, "trace"], [w, "dir"], [M, "assert"]], l = 0; l < c.length; l++) {
        var d = c[l]
          , h = d[0]
          , f = d[1];
        s[f] || (s[f] = h)
    }
    function p() {}
    function m() {
        s.log.apply(s, arguments)
    }
    function g() {
        s.log.apply(s, arguments)
    }
    function y() {
        s.warn.apply(s, arguments)
    }
    function v(t) {
        u[t] = o()
    }
    function _(t) {
        var e = u[t];
        if (!e)
            throw new Error("No such label: " + t);
        delete u[t];
        var n = o() - e;
        s.log(t + ": " + n + "ms")
    }
    function b() {
        var t = new Error;
        t.name = "Trace",
        t.message = r.format.apply(null, arguments),
        s.error(t.stack)
    }
    function w(t) {
        s.log(r.inspect(t) + "\n")
    }
    function M(t) {
        if (!t) {
            var e = a.call(arguments, 1);
            i.ok(!1, r.format.apply(null, e))
        }
    }
    t.exports = s
}

function ut(t, e) {
    if (e < t.length + 11)
        return st.error("Message too long for RSA"),
        null;
    var n = []
      , r = t.length - 1;
    while (r >= 0 && e > 0) {
        var i = t.charCodeAt(r--);
        i < 128 ? n[--e] = i : i > 127 && i < 2048 ? (n[--e] = 63 & i | 128,
        n[--e] = i >> 6 | 192) : (n[--e] = 63 & i | 128,
        n[--e] = i >> 6 & 63 | 128,
        n[--e] = i >> 12 | 224)
    }
    n[--e] = 0;
    var o = new ot
      , s = [];
    while (e > 2) {
        s[0] = 0;
        while (0 == s[0])
            o.nextBytes(s);
        n[--e] = s[0]
    }
    return n[--e] = 2,
    n[--e] = 0,
    new Y(n)
}

var ct = function() {
    function t() {
        this.n = null,
        this.e = 0,
        this.d = null,
        this.p = null,
        this.q = null,
        this.dmp1 = null,
        this.dmq1 = null,
        this.coeff = null
    }
    return t.prototype.doPublic = function(t) {
        return t.modPowInt(this.e, this.n)
    }
    ,
    t.prototype.doPrivate = function(t) {
        if (null == this.p || null == this.q)
            return t.modPow(this.d, this.n);
        var e = t.mod(this.p).modPow(this.dmp1, this.p)
          , n = t.mod(this.q).modPow(this.dmq1, this.q);
        while (e.compareTo(n) < 0)
            e = e.add(this.p);
        return e.subtract(n).multiply(this.coeff).mod(this.p).multiply(this.q).add(n)
    }
    ,
    t.prototype.setPublic = function(t, e) {
        null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = H(t, 16),
        this.e = parseInt(e, 16)) : st.error("Invalid RSA public key")
    }
    ,
    t.prototype.encrypt = function(t) {
        var e = this.n.bitLength() + 7 >> 3
          , n = ut(t, e);
        if (null == n)
            return null;
        var r = this.doPublic(n);
        if (null == r)
            return null;
        for (var i = r.toString(16), o = i.length, s = 0; s < 2 * e - o; s++)
            i = "0" + i;
        return i
    }
    ,
    t.prototype.setPrivate = function(t, e, n) {
        null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = H(t, 16),
        this.e = parseInt(e, 16),
        this.d = H(n, 16)) : st.error("Invalid RSA private key")
    }
    ,
    t.prototype.setPrivateEx = function(t, e, n, r, i, o, s, a) {
        null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = H(t, 16),
        this.e = parseInt(e, 16),
        this.d = H(n, 16),
        this.p = H(r, 16),
        this.q = H(i, 16),
        this.dmp1 = H(o, 16),
        this.dmq1 = H(s, 16),
        this.coeff = H(a, 16)) : st.error("Invalid RSA private key")
    }
    ,
    t.prototype.generate = function(t, e) {
        var n = new ot
          , r = t >> 1;
        this.e = parseInt(e, 16);
        for (var i = new Y(e,16); ; ) {
            for (; ; )
                if (this.p = new Y(t - r,1,n),
                0 == this.p.subtract(Y.ONE).gcd(i).compareTo(Y.ONE) && this.p.isProbablePrime(10))
                    break;
            for (; ; )
                if (this.q = new Y(r,1,n),
                0 == this.q.subtract(Y.ONE).gcd(i).compareTo(Y.ONE) && this.q.isProbablePrime(10))
                    break;
            if (this.p.compareTo(this.q) <= 0) {
                var o = this.p;
                this.p = this.q,
                this.q = o
            }
            var s = this.p.subtract(Y.ONE)
              , a = this.q.subtract(Y.ONE)
              , u = s.multiply(a);
            if (0 == u.gcd(i).compareTo(Y.ONE)) {
                this.n = this.p.multiply(this.q),
                this.d = i.modInverse(u),
                this.dmp1 = this.d.mod(s),
                this.dmq1 = this.d.mod(a),
                this.coeff = this.q.modInverse(this.p);
                break
            }
        }
    }
    ,
    t.prototype.decrypt = function(t) {
        var e = H(t, 16)
          , n = this.doPrivate(e);
        return null == n ? null : lt(n, this.n.bitLength() + 7 >> 3)
    }
    ,
    t.prototype.generateAsync = function(t, e, n) {
        var r = new ot
          , i = t >> 1;
        this.e = parseInt(e, 16);
        var o = new Y(e,16)
          , s = this
          , a = function() {
            var e = function() {
                if (s.p.compareTo(s.q) <= 0) {
                    var t = s.p;
                    s.p = s.q,
                    s.q = t
                }
                var e = s.p.subtract(Y.ONE)
                  , r = s.q.subtract(Y.ONE)
                  , i = e.multiply(r);
                0 == i.gcd(o).compareTo(Y.ONE) ? (s.n = s.p.multiply(s.q),
                s.d = o.modInverse(i),
                s.dmp1 = s.d.mod(e),
                s.dmq1 = s.d.mod(r),
                s.coeff = s.q.modInverse(s.p),
                setTimeout((function() {
                    n()
                }
                ), 0)) : setTimeout(a, 0)
            }
              , u = function() {
                s.q = R(),
                s.q.fromNumberAsync(i, 1, r, (function() {
                    s.q.subtract(Y.ONE).gcda(o, (function(t) {
                        0 == t.compareTo(Y.ONE) && s.q.isProbablePrime(10) ? setTimeout(e, 0) : setTimeout(u, 0)
                    }
                    ))
                }
                ))
            }
              , c = function() {
                s.p = R(),
                s.p.fromNumberAsync(t - i, 1, r, (function() {
                    s.p.subtract(Y.ONE).gcda(o, (function(t) {
                        0 == t.compareTo(Y.ONE) && s.p.isProbablePrime(10) ? setTimeout(u, 0) : setTimeout(c, 0)
                    }
                    ))
                }
                ))
            };
            setTimeout(c, 0)
        };
        setTimeout(a, 0)
    }
    ,
    t.prototype.sign = function(t, e, n) {
        var r = ht(n)
          , i = r + e(t).toString()
          , o = at(i, this.n.bitLength() / 4);
        if (null == o)
            return null;
        var s = this.doPrivate(o);
        if (null == s)
            return null;
        var a = s.toString(16);
        return 0 == (1 & a.length) ? a : "0" + a
    }
    ,
    t.prototype.verify = function(t, e, n) {
        var r = H(e, 16)
          , i = this.doPublic(r);
        if (null == i)
            return null;
        var o = i.toString(16).replace(/^1f+00/, "")
          , s = ft(o);
        return s == n(t).toString()
    }
    ,
    t
}();
var gt = function() {
    var t = function(e, n) {
        return t = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
        }
        ,
        t(e, n)
    };
    return function(e, n) {
        if ("function" !== typeof n && null !== n)
            throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
        function r() {
            this.constructor = e
        }
        t(e, n),
        e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype,
        new r)
    }
}(),
yt = function(t) {
    function e(n) {
        var r = t.call(this) || this;
        return n && ("string" === typeof n ? r.parseKey(n) : (e.hasPrivateKeyProperty(n) || e.hasPublicKeyProperty(n)) && r.parsePropertiesFrom(n)),
        r
    }
    return gt(e, t),
    e.prototype.parseKey = function(t) {
        try {
            var e = 0
              , n = 0
              , r = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/
              , i = r.test(t) ? y.decode(t) : v.unarmor(t)
              , o = L.decode(i);
            if (3 === o.sub.length && (o = o.sub[2].sub[0]),
            9 === o.sub.length) {
                e = o.sub[1].getHexStringValue(),
                this.n = H(e, 16),
                n = o.sub[2].getHexStringValue(),
                this.e = parseInt(n, 16);
                var s = o.sub[3].getHexStringValue();
                this.d = H(s, 16);
                var a = o.sub[4].getHexStringValue();
                this.p = H(a, 16);
                var u = o.sub[5].getHexStringValue();
                this.q = H(u, 16);
                var c = o.sub[6].getHexStringValue();
                this.dmp1 = H(c, 16);
                var l = o.sub[7].getHexStringValue();
                this.dmq1 = H(l, 16);
                var d = o.sub[8].getHexStringValue();
                this.coeff = H(d, 16)
            } else {
                if (2 !== o.sub.length)
                    return !1;
                var h = o.sub[1]
                  , f = h.sub[0];
                e = f.sub[0].getHexStringValue(),
                this.n = H(e, 16),
                n = f.sub[1].getHexStringValue(),
                this.e = parseInt(n, 16)
            }
            return !0
        } catch (p) {
            console.log(p)
            return !1
        }
    }
    ,
    e.prototype.getPrivateBaseKey = function() {
        var t = {
            array: [new mt.asn1.DERInteger({
                int: 0
            }), new mt.asn1.DERInteger({
                bigint: this.n
            }), new mt.asn1.DERInteger({
                int: this.e
            }), new mt.asn1.DERInteger({
                bigint: this.d
            }), new mt.asn1.DERInteger({
                bigint: this.p
            }), new mt.asn1.DERInteger({
                bigint: this.q
            }), new mt.asn1.DERInteger({
                bigint: this.dmp1
            }), new mt.asn1.DERInteger({
                bigint: this.dmq1
            }), new mt.asn1.DERInteger({
                bigint: this.coeff
            })]
        }
          , e = new mt.asn1.DERSequence(t);
        return e.getEncodedHex()
    }
    ,
    e.prototype.getPrivateBaseKeyB64 = function() {
        return p(this.getPrivateBaseKey())
    }
    ,
    e.prototype.getPublicBaseKey = function() {
        var t = new mt.asn1.DERSequence({
            array: [new mt.asn1.DERObjectIdentifier({
                oid: "1.2.840.113549.1.1.1"
            }), new mt.asn1.DERNull]
        })
          , e = new mt.asn1.DERSequence({
            array: [new mt.asn1.DERInteger({
                bigint: this.n
            }), new mt.asn1.DERInteger({
                int: this.e
            })]
        })
          , n = new mt.asn1.DERBitString({
            hex: "00" + e.getEncodedHex()
        })
          , r = new mt.asn1.DERSequence({
            array: [t, n]
        });
        return r.getEncodedHex()
    }
    ,
    e.prototype.getPublicBaseKeyB64 = function() {
        return p(this.getPublicBaseKey())
    }
    ,
    e.wordwrap = function(t, e) {
        if (e = e || 64,
        !t)
            return t;
        var n = "(.{1," + e + "})( +|$\n?)|(.{1," + e + "})";
        return t.match(RegExp(n, "g")).join("\n")
    }
    ,
    e.prototype.getPrivateKey = function() {
        var t = "-----BEGIN RSA PRIVATE KEY-----\n";
        return t += e.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
        t += "-----END RSA PRIVATE KEY-----",
        t
    }
    ,
    e.prototype.getPublicKey = function() {
        var t = "-----BEGIN PUBLIC KEY-----\n";
        return t += e.wordwrap(this.getPublicBaseKeyB64()) + "\n",
        t += "-----END PUBLIC KEY-----",
        t
    }
    ,
    e.hasPublicKeyProperty = function(t) {
        return t = t || {},
        t.hasOwnProperty("n") && t.hasOwnProperty("e")
    }
    ,
    e.hasPrivateKeyProperty = function(t) {
        return t = t || {},
        t.hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
    }
    ,
    e.prototype.parsePropertiesFrom = function(t) {
        this.n = t.n,
        this.e = t.e,
        t.hasOwnProperty("d") && (this.d = t.d,
        this.p = t.p,
        this.q = t.q,
        this.dmp1 = t.dmp1,
        this.dmq1 = t.dmq1,
        this.coeff = t.coeff)
    }
    ,
    e
}(ct),

vt = {
    i: "3.2.1"
},
_t = function(t, e, n) {
    var r = n9242
      , i = n52504;
    function o() {
        return (new Date).getTime()
    }
    var s, a = Array.prototype.slice, u = {};
    s = "undefined" !== typeof n.g && n.g.console ? n.g.console : "undefined" !== typeof window && window.console ? window.console : {};
    for (var c = [[p, "log"], [m, "info"], [g, "warn"], [y, "error"], [v, "time"], [_, "timeEnd"], [b, "trace"], [w, "dir"], [M, "assert"]], l = 0; l < c.length; l++) {
        var d = c[l]
          , h = d[0]
          , f = d[1];
        s[f] || (s[f] = h)
    }
    function p() {}
    function m() {
        s.log.apply(s, arguments)
    }
    function g() {
        s.log.apply(s, arguments)
    }
    function y() {
        s.warn.apply(s, arguments)
    }
    function v(t) {
        u[t] = o()
    }
    function _(t) {
        var e = u[t];
        if (!e)
            throw new Error("No such label: " + t);
        delete u[t];
        var n = o() - e;
        s.log(t + ": " + n + "ms")
    }
    function b() {
        var t = new Error;
        t.name = "Trace",
        t.message = r.format.apply(null, arguments),
        s.error(t.stack)
    }
    function w(t) {
        s.log(r.inspect(t) + "\n")
    }
    function M(t) {
        if (!t) {
            var e = a.call(arguments, 1);
            i.ok(!1, r.format.apply(null, e))
        }
    }
    t.exports = s
},
bt = function() {
    function t(t) {
        void 0 === t && (t = {}),
        t = t || {},
        this.default_key_size = t.default_key_size ? parseInt(t.default_key_size, 10) : 1024,
        this.default_public_exponent = t.default_public_exponent || "010001",
        this.log = t.log || !1,
        this.key = null
    }
    return t.prototype.setKey = function(t) {
        this.log && this.key && _t.warn("A key was already set, overriding existing."),
        this.key = new yt(t)
    }
    ,
    t.prototype.setPrivateKey = function(t) {
        this.setKey(t)
    }
    ,
    t.prototype.setPublicKey = function(t) {
        this.setKey(t)
    }
    ,
    t.prototype.decrypt = function(t) {
        try {
            return this.getKey().decrypt(m(t))
        } catch (e) {
            return !1
        }
    }
    ,
    t.prototype.encrypt = function(t) {
        try {
            return p(this.getKey().encrypt(t))
        } catch (e) {
            return !1
        }
    }
    ,
    t.prototype.sign = function(t, e, n) {
        try {
            return p(this.getKey().sign(t, e, n))
        } catch (r) {
            return !1
        }
    }
    ,
    t.prototype.verify = function(t, e, n) {
        try {
            return this.getKey().verify(t, m(e), n)
        } catch (r) {
            return !1
        }
    }
    ,
    t.prototype.getKey = function(t) {
        if (!this.key) {
            if (this.key = new yt,
            t && "[object Function]" === {}.toString.call(t))
                return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
            this.key.generate(this.default_key_size, this.default_public_exponent)
        }
        return this.key
    }
    ,
    t.prototype.getPrivateKey = function() {
        return this.getKey().getPrivateKey()
    }
    ,
    t.prototype.getPrivateKeyB64 = function() {
        return this.getKey().getPrivateBaseKeyB64()
    }
    ,
    t.prototype.getPublicKey = function() {
        return this.getKey().getPublicKey()
    }
    ,
    t.prototype.getPublicKeyB64 = function() {
        return this.getKey().getPublicBaseKeyB64()
    }
    ,
    t.version = vt.i,
    t
}()
  , wt = bt;

const Mt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
          , St = "="
          , Et = "0123456789abcdefghijklmnopqrstuvwxyz";
function Tt(t) {
    return Et.charAt(t)
}
function xt(t) {
    let e, n, r = "";
    for (e = 0; e + 3 <= t.length; e += 3)
        n = parseInt(t.substring(e, e + 3), 16),
        r += Mt.charAt(n >> 6) + Mt.charAt(63 & n);
    e + 1 == t.length ? (n = parseInt(t.substring(e, e + 1), 16),
    r += Mt.charAt(n << 2)) : e + 2 == t.length && (n = parseInt(t.substring(e, e + 2), 16),
    r += Mt.charAt(n >> 2) + Mt.charAt((3 & n) << 4));
    while ((3 & r.length) > 0)
        r += St;
    return r
}
function Lt(t) {
    let e, n = "", r = 0, i = 0;
    for (e = 0; e < t.length; ++e) {
        if (t.charAt(e) == St)
            break;
        const o = Mt.indexOf(t.charAt(e));
        o < 0 || (0 == r ? (n += Tt(o >> 2),
        i = 3 & o,
        r = 1) : 1 == r ? (n += Tt(i << 2 | o >> 4),
        i = 15 & o,
        r = 2) : 2 == r ? (n += Tt(i),
        n += Tt(o >> 2),
        i = 3 & o,
        r = 3) : (n += Tt(i << 2 | o >> 4),
        n += Tt(15 & o),
        r = 0))
    }
    return 1 == r && (n += Tt(i << 2)),
    n
}
class kt extends wt {
    constructor(t) {
        super(t)
    }
    encrypt(t) {
        try {
            const e = (this.getKey().n.bitLength() + 7 >> 3) - 11;
            let n = 0
              , r = [];
            while (n <= t.length - 1) {
                const e = t.charCodeAt(n);
                e < 128 ? r.push(t[n]) : e > 127 && e < 2048 ? r.push(null, t[n]) : r.push(null, null, t[n]),
                n++
            }
            if (r.length <= e)
                return xt(this.getKey().encrypt(t));
            {
                let t = "";
                while (r.length > 0) {
                    let n = e;
                    while (null === r[n - 1])
                        n -= 1;
                    const i = r.slice(0, n).filter((t=>null !== t)).join("");
                    t += this.getKey().encrypt(i),
                    r.splice(0, n)
                }
                return xt(t)
            }
        } catch (e) {
            console.log(e)
            return !1
        }
    }
    decrypt(t) {
        try {
            const e = Lt(t)
              , n = this.getKey().n.bitLength() / 4;
            if (e <= n)
                return this.getKey().decrypt(e);
            {
                const t = e.match(new RegExp(".{1," + n + "}","g"))
                  , r = t.reduce(((t,e)=>t + this.getKey().decrypt(e)), "");
                return r
            }
        } catch (e) {
            return !1
        }
    }
}

function gen_timestamp() {
    return Math.round((new Date).getTime())
}

function get_sign(data,request_id,timestamp,token){
    return sign(data+request_id+'matr1x@illusioncolors3823553288'+timestamp+token)
}

function encrypt_data(t) {
    A = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOsvUaNHMM59o9v91onETvXxmGApLaeOG6N70y0KFedWDDQHVK/2WAcdkv1AXhmwlenWfkyrvZ1LkzdYth06EeT2T4j5xYYxTLmIE/edrG0yvGkqbmeVU3QKdkMw+npviOEnWL9zQaCQum1C2bCngR3SwsgtYEzDhfP7AM2t8VNwIDAQAB'

    const i = new kt({
        default_key_size: 1024
    });
    i.setPublicKey(A);
    const n = i.encrypt(t);
    return n
}

function request_id(prefix) {
    for (var A = [], t = "0123456789abcdef", e = 0; e < 32; e++)
        A[e] = t.substr(Math.floor(16 * Math.random()), 1);
    A[14] = "4",
    A[19] = t.substr(3 & A[19] | 8, 1),
    A[8] = A[13] = A[18] = A[23];
    var s = A.join("");
    return prefix+s
}