'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@cosmos-client/core');
var xchainClient = require('@xchainjs/xchain-client');
var xchainCosmos = require('@xchainjs/xchain-cosmos');
var xchainUtil = require('@xchainjs/xchain-util');
var axios = require('axios');
var bech32Buffer = require('bech32-buffer');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var aspromise = asPromise;

/**
 * Callback as used by {@link util.asPromise}.
 * @typedef asPromiseCallback
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {...*} params Additional arguments
 * @returns {undefined}
 */

/**
 * Returns a promise from a node-style callback function.
 * @memberof util
 * @param {asPromiseCallback} fn Function to call
 * @param {*} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn, ctx/*, varargs */) {
    var params  = new Array(arguments.length - 1),
        offset  = 0,
        index   = 2,
        pending = true;
    while (index < arguments.length)
        params[offset++] = arguments[index++];
    return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err/*, varargs */) {
            if (pending) {
                pending = false;
                if (err)
                    reject(err);
                else {
                    var params = new Array(arguments.length - 1),
                        offset = 0;
                    while (offset < params.length)
                        params[offset++] = arguments[offset];
                    resolve.apply(null, params);
                }
            }
        };
        try {
            fn.apply(ctx || null, params);
        } catch (err) {
            if (pending) {
                pending = false;
                reject(err);
            }
        }
    });
}

var base64_1 = createCommonjsModule(function (module, exports) {

/**
 * A minimal base64 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var base64 = exports;

/**
 * Calculates the byte length of a base64 encoded string.
 * @param {string} string Base64 encoded string
 * @returns {number} Byte length
 */
base64.length = function length(string) {
    var p = string.length;
    if (!p)
        return 0;
    var n = 0;
    while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
    return Math.ceil(string.length * 3) / 4 - n;
};

// Base64 encoding table
var b64 = new Array(64);

// Base64 decoding table
var s64 = new Array(123);

// 65..90, 97..122, 48..57, 43, 47
for (var i = 0; i < 64;)
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;

/**
 * Encodes a buffer to a base64 encoded string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} Base64 encoded string
 */
base64.encode = function encode(buffer, start, end) {
    var parts = null,
        chunk = [];
    var i = 0, // output index
        j = 0, // goto index
        t;     // temporary
    while (start < end) {
        var b = buffer[start++];
        switch (j) {
            case 0:
                chunk[i++] = b64[b >> 2];
                t = (b & 3) << 4;
                j = 1;
                break;
            case 1:
                chunk[i++] = b64[t | b >> 4];
                t = (b & 15) << 2;
                j = 2;
                break;
            case 2:
                chunk[i++] = b64[t | b >> 6];
                chunk[i++] = b64[b & 63];
                j = 0;
                break;
        }
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (j) {
        chunk[i++] = b64[t];
        chunk[i++] = 61;
        if (j === 1)
            chunk[i++] = 61;
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

var invalidEncoding = "invalid encoding";

/**
 * Decodes a base64 encoded string to a buffer.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Number of bytes written
 * @throws {Error} If encoding is invalid
 */
base64.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, // goto index
        t;     // temporary
    for (var i = 0; i < string.length;) {
        var c = string.charCodeAt(i++);
        if (c === 61 && j > 1)
            break;
        if ((c = s64[c]) === undefined)
            throw Error(invalidEncoding);
        switch (j) {
            case 0:
                t = c;
                j = 1;
                break;
            case 1:
                buffer[offset++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
            case 2:
                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
            case 3:
                buffer[offset++] = (t & 3) << 6 | c;
                j = 0;
                break;
        }
    }
    if (j === 1)
        throw Error(invalidEncoding);
    return offset - start;
};

/**
 * Tests if the specified string appears to be base64 encoded.
 * @param {string} string String to test
 * @returns {boolean} `true` if probably base64 encoded, otherwise false
 */
base64.test = function test(string) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
};
});

var eventemitter = EventEmitter;

/**
 * Constructs a new event emitter instance.
 * @classdesc A minimal event emitter.
 * @memberof util
 * @constructor
 */
function EventEmitter() {

    /**
     * Registered listeners.
     * @type {Object.<string,*>}
     * @private
     */
    this._listeners = {};
}

/**
 * Registers an event listener.
 * @param {string} evt Event name
 * @param {function} fn Listener
 * @param {*} [ctx] Listener context
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.on = function on(evt, fn, ctx) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn  : fn,
        ctx : ctx || this
    });
    return this;
};

/**
 * Removes an event listener or any matching listeners if arguments are omitted.
 * @param {string} [evt] Event name. Removes all listeners if omitted.
 * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.off = function off(evt, fn) {
    if (evt === undefined)
        this._listeners = {};
    else {
        if (fn === undefined)
            this._listeners[evt] = [];
        else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length;)
                if (listeners[i].fn === fn)
                    listeners.splice(i, 1);
                else
                    ++i;
        }
    }
    return this;
};

/**
 * Emits an event by calling its listeners with the specified arguments.
 * @param {string} evt Event name
 * @param {...*} args Arguments
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.emit = function emit(evt) {
    var listeners = this._listeners[evt];
    if (listeners) {
        var args = [],
            i = 1;
        for (; i < arguments.length;)
            args.push(arguments[i++]);
        for (i = 0; i < listeners.length;)
            listeners[i].fn.apply(listeners[i++].ctx, args);
    }
    return this;
};

var float_1 = factory(factory);

/**
 * Reads / writes floats / doubles from / to buffers.
 * @name util.float
 * @namespace
 */

/**
 * Writes a 32 bit float to a buffer using little endian byte order.
 * @name util.float.writeFloatLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 32 bit float to a buffer using big endian byte order.
 * @name util.float.writeFloatBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 32 bit float from a buffer using little endian byte order.
 * @name util.float.readFloatLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 32 bit float from a buffer using big endian byte order.
 * @name util.float.readFloatBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Writes a 64 bit double to a buffer using little endian byte order.
 * @name util.float.writeDoubleLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 64 bit double to a buffer using big endian byte order.
 * @name util.float.writeDoubleBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 64 bit double from a buffer using little endian byte order.
 * @name util.float.readDoubleLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 64 bit double from a buffer using big endian byte order.
 * @name util.float.readDoubleBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

// Factory function for the purpose of node-based testing in modified global environments
function factory(exports) {

    // float: typed array
    if (typeof Float32Array !== "undefined") (function() {

        var f32 = new Float32Array([ -0 ]),
            f8b = new Uint8Array(f32.buffer),
            le  = f8b[3] === 128;

        function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
        }

        function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        /* istanbul ignore next */
        exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

        function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
        }

        function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos    ];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
        }

        /* istanbul ignore next */
        exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        /* istanbul ignore next */
        exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;

    // float: ieee754
    })(); else (function() {

        function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0)
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos);
            else if (isNaN(val))
                writeUint(2143289344, buf, pos);
            else if (val > 3.4028234663852886e+38) // +-Infinity
                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 1.1754943508222875e-38) // denormal
                writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);
            else {
                var exponent = Math.floor(Math.log(val) / Math.LN2),
                    mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
        }

        exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

        function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos),
                sign = (uint >> 31) * 2 + 1,
                exponent = uint >>> 23 & 255,
                mantissa = uint & 8388607;
            return exponent === 255
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 1.401298464324817e-45 * mantissa
                : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }

        exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);

    })();

    // double: typed array
    if (typeof Float64Array !== "undefined") (function() {

        var f64 = new Float64Array([-0]),
            f8b = new Uint8Array(f64.buffer),
            le  = f8b[7] === 128;

        function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
        }

        function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        /* istanbul ignore next */
        exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

        function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
        }

        function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos    ];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
        }

        /* istanbul ignore next */
        exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        /* istanbul ignore next */
        exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;

    // double: ieee754
    })(); else (function() {

        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
            } else if (val > 1.7976931348623157e+308) { // +-Infinity
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
                var mantissa;
                if (val < 2.2250738585072014e-308) { // denormal
                    mantissa = val / 5e-324;
                    writeUint(mantissa >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                    var exponent = Math.floor(Math.log(val) / Math.LN2);
                    if (exponent === 1024)
                        exponent = 1023;
                    mantissa = val * Math.pow(2, -exponent);
                    writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
            }
        }

        exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0),
                hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
                exponent = hi >>> 20 & 2047,
                mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 5e-324 * mantissa
                : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }

        exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);

    })();

    return exports;
}

// uint helpers

function writeUintLE(val, buf, pos) {
    buf[pos    ] =  val        & 255;
    buf[pos + 1] =  val >>> 8  & 255;
    buf[pos + 2] =  val >>> 16 & 255;
    buf[pos + 3] =  val >>> 24;
}

function writeUintBE(val, buf, pos) {
    buf[pos    ] =  val >>> 24;
    buf[pos + 1] =  val >>> 16 & 255;
    buf[pos + 2] =  val >>> 8  & 255;
    buf[pos + 3] =  val        & 255;
}

function readUintLE(buf, pos) {
    return (buf[pos    ]
          | buf[pos + 1] << 8
          | buf[pos + 2] << 16
          | buf[pos + 3] << 24) >>> 0;
}

function readUintBE(buf, pos) {
    return (buf[pos    ] << 24
          | buf[pos + 1] << 16
          | buf[pos + 2] << 8
          | buf[pos + 3]) >>> 0;
}

var inquire_1 = inquire;

/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */
function inquire(moduleName) {
    try {
        var mod = eval("quire".replace(/^/,"re"))(moduleName); // eslint-disable-line no-eval
        if (mod && (mod.length || Object.keys(mod).length))
            return mod;
    } catch (e) {} // eslint-disable-line no-empty
    return null;
}

var utf8_1 = createCommonjsModule(function (module, exports) {

/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var utf8 = exports;

/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} string String
 * @returns {number} Byte length
 */
utf8.length = function utf8_length(string) {
    var len = 0,
        c = 0;
    for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
            len += 1;
        else if (c < 2048)
            len += 2;
        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else
            len += 3;
    }
    return len;
};

/**
 * Reads UTF8 bytes as a string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */
utf8.read = function utf8_read(buffer, start, end) {
    var len = end - start;
    if (len < 1)
        return "";
    var parts = null,
        chunk = [],
        i = 0, // char offset
        t;     // temporary
    while (start < end) {
        t = buffer[start++];
        if (t < 128)
            chunk[i++] = t;
        else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
        } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

/**
 * Writes a string as UTF8 bytes.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */
utf8.write = function utf8_write(string, buffer, offset) {
    var start = offset,
        c1, // character 1
        c2; // character 2
    for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6       | 192;
            buffer[offset++] = c1       & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18      | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12      | 224;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        }
    }
    return offset - start;
};
});

var pool_1 = pool;

/**
 * An allocator as used by {@link util.pool}.
 * @typedef PoolAllocator
 * @type {function}
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */

/**
 * A slicer as used by {@link util.pool}.
 * @typedef PoolSlicer
 * @type {function}
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */

/**
 * A general purpose buffer pool.
 * @memberof util
 * @function
 * @param {PoolAllocator} alloc Allocator
 * @param {PoolSlicer} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {PoolAllocator} Pooled allocator
 */
function pool(alloc, slice, size) {
    var SIZE   = size || 8192;
    var MAX    = SIZE >>> 1;
    var slab   = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size < 1 || size > MAX)
            return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
        return buf;
    };
}

var longbits = LongBits;



/**
 * Constructs new long bits.
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @constructor
 * @param {number} lo Low 32 bits, unsigned
 * @param {number} hi High 32 bits, unsigned
 */
function LongBits(lo, hi) {

    // note that the casts below are theoretically unnecessary as of today, but older statically
    // generated converter code might still call the ctor with signed 32bits. kept for compat.

    /**
     * Low bits.
     * @type {number}
     */
    this.lo = lo >>> 0;

    /**
     * High bits.
     * @type {number}
     */
    this.hi = hi >>> 0;
}

/**
 * Zero bits.
 * @memberof util.LongBits
 * @type {util.LongBits}
 */
var zero = LongBits.zero = new LongBits(0, 0);

zero.toNumber = function() { return 0; };
zero.zzEncode = zero.zzDecode = function() { return this; };
zero.length = function() { return 1; };

/**
 * Zero hash.
 * @memberof util.LongBits
 * @type {string}
 */
var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";

/**
 * Constructs new long bits from the specified number.
 * @param {number} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.fromNumber = function fromNumber(value) {
    if (value === 0)
        return zero;
    var sign = value < 0;
    if (sign)
        value = -value;
    var lo = value >>> 0,
        hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
                hi = 0;
        }
    }
    return new LongBits(lo, hi);
};

/**
 * Constructs new long bits from a number, long or string.
 * @param {Long|number|string} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.from = function from(value) {
    if (typeof value === "number")
        return LongBits.fromNumber(value);
    if (minimal.isString(value)) {
        /* istanbul ignore else */
        if (minimal.Long)
            value = minimal.Long.fromString(value);
        else
            return LongBits.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
};

/**
 * Converts this long bits to a possibly unsafe JavaScript number.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number} Possibly unsafe number
 */
LongBits.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0,
            hi = ~this.hi     >>> 0;
        if (!lo)
            hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
};

/**
 * Converts this long bits to a long.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long} Long
 */
LongBits.prototype.toLong = function toLong(unsigned) {
    return minimal.Long
        ? new minimal.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
        /* istanbul ignore next */
        : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
};

var charCodeAt = String.prototype.charCodeAt;

/**
 * Constructs new long bits from the specified 8 characters long hash.
 * @param {string} hash Hash
 * @returns {util.LongBits} Bits
 */
LongBits.fromHash = function fromHash(hash) {
    if (hash === zeroHash)
        return zero;
    return new LongBits(
        ( charCodeAt.call(hash, 0)
        | charCodeAt.call(hash, 1) << 8
        | charCodeAt.call(hash, 2) << 16
        | charCodeAt.call(hash, 3) << 24) >>> 0
    ,
        ( charCodeAt.call(hash, 4)
        | charCodeAt.call(hash, 5) << 8
        | charCodeAt.call(hash, 6) << 16
        | charCodeAt.call(hash, 7) << 24) >>> 0
    );
};

/**
 * Converts this long bits to a 8 characters long hash.
 * @returns {string} Hash
 */
LongBits.prototype.toHash = function toHash() {
    return String.fromCharCode(
        this.lo        & 255,
        this.lo >>> 8  & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24      ,
        this.hi        & 255,
        this.hi >>> 8  & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
    );
};

/**
 * Zig-zag encodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzEncode = function zzEncode() {
    var mask =   this.hi >> 31;
    this.hi  = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo  = ( this.lo << 1                   ^ mask) >>> 0;
    return this;
};

/**
 * Zig-zag decodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo  = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi  = ( this.hi >>> 1                  ^ mask) >>> 0;
    return this;
};

/**
 * Calculates the length of this longbits when encoded as a varint.
 * @returns {number} Length
 */
LongBits.prototype.length = function length() {
    var part0 =  this.lo,
        part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
        part2 =  this.hi >>> 24;
    return part2 === 0
         ? part1 === 0
           ? part0 < 16384
             ? part0 < 128 ? 1 : 2
             : part0 < 2097152 ? 3 : 4
           : part1 < 16384
             ? part1 < 128 ? 5 : 6
             : part1 < 2097152 ? 7 : 8
         : part2 < 128 ? 9 : 10;
};

var minimal = createCommonjsModule(function (module, exports) {
var util = exports;

// used to return a Promise where callback is omitted
util.asPromise = aspromise;

// converts to / from base64 encoded strings
util.base64 = base64_1;

// base class of rpc.Service
util.EventEmitter = eventemitter;

// float handling accross browsers
util.float = float_1;

// requires modules optionally and hides the call from bundlers
util.inquire = inquire_1;

// converts to / from utf8 encoded strings
util.utf8 = utf8_1;

// provides a node-like buffer pool in the browser
util.pool = pool_1;

// utility to work with the low and high bits of a 64 bit value
util.LongBits = longbits;

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 */
util.isNode = Boolean(typeof commonjsGlobal !== "undefined"
                   && commonjsGlobal
                   && commonjsGlobal.process
                   && commonjsGlobal.process.versions
                   && commonjsGlobal.process.versions.node);

/**
 * Global object reference.
 * @memberof util
 * @type {Object}
 */
util.global = util.isNode && commonjsGlobal
           || typeof window !== "undefined" && window
           || typeof self   !== "undefined" && self
           || commonjsGlobal; // eslint-disable-line no-invalid-this

/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 * @const
 */
util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */ []; // used on prototypes

/**
 * An immutable empty object.
 * @type {Object}
 * @const
 */
util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */ {}; // used on prototypes

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || /* istanbul ignore next */ function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

/**
 * Tests if the specified value is a string.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */
util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
};

/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */
util.isObject = function isObject(value) {
    return value && typeof value === "object";
};

/**
 * Checks if a property on a message is considered to be present.
 * This is an alias of {@link util.isSet}.
 * @function
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isset =

/**
 * Checks if a property on a message is considered to be present.
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isSet = function isSet(obj, prop) {
    var value = obj[prop];
    if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
    return false;
};

/**
 * Any compatible Buffer instance.
 * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
 * @interface Buffer
 * @extends Uint8Array
 */

/**
 * Node's Buffer class if available.
 * @type {Constructor<Buffer>}
 */
util.Buffer = (function() {
    try {
        var Buffer = util.inquire("buffer").Buffer;
        // refuse to use non-node buffers if not explicitly assigned (perf reasons):
        return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */ null;
    } catch (e) {
        /* istanbul ignore next */
        return null;
    }
})();

// Internal alias of or polyfull for Buffer.from.
util._Buffer_from = null;

// Internal alias of or polyfill for Buffer.allocUnsafe.
util._Buffer_allocUnsafe = null;

/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
 * @returns {Uint8Array|Buffer} Buffer
 */
util.newBuffer = function newBuffer(sizeOrArray) {
    /* istanbul ignore next */
    return typeof sizeOrArray === "number"
        ? util.Buffer
            ? util._Buffer_allocUnsafe(sizeOrArray)
            : new util.Array(sizeOrArray)
        : util.Buffer
            ? util._Buffer_from(sizeOrArray)
            : typeof Uint8Array === "undefined"
                ? sizeOrArray
                : new Uint8Array(sizeOrArray);
};

/**
 * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
 * @type {Constructor<Uint8Array>}
 */
util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

/**
 * Any compatible Long instance.
 * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
 * @interface Long
 * @property {number} low Low bits
 * @property {number} high High bits
 * @property {boolean} unsigned Whether unsigned or not
 */

/**
 * Long.js's Long class if available.
 * @type {Constructor<Long>}
 */
util.Long = /* istanbul ignore next */ util.global.dcodeIO && /* istanbul ignore next */ util.global.dcodeIO.Long
         || /* istanbul ignore next */ util.global.Long
         || util.inquire("long");

/**
 * Regular expression used to verify 2 bit (`bool`) map keys.
 * @type {RegExp}
 * @const
 */
util.key2Re = /^true|false|0|1$/;

/**
 * Regular expression used to verify 32 bit (`int32` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;

/**
 * Regular expression used to verify 64 bit (`int64` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;

/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */
util.longToHash = function longToHash(value) {
    return value
        ? util.LongBits.from(value).toHash()
        : util.LongBits.zeroHash;
};

/**
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */
util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util.LongBits.fromHash(hash);
    if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};

/**
 * Merges the properties of the source object into the destination object.
 * @memberof util
 * @param {Object.<string,*>} dst Destination object
 * @param {Object.<string,*>} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object.<string,*>} Destination object
 */
function merge(dst, src, ifNotSet) { // used by converters
    for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === undefined || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
    return dst;
}

util.merge = merge;

/**
 * Converts the first character of a string to lower case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
};

/**
 * Creates a custom error constructor.
 * @memberof util
 * @param {string} name Error name
 * @returns {Constructor<Error>} Custom error constructor
 */
function newError(name) {

    function CustomError(message, properties) {

        if (!(this instanceof CustomError))
            return new CustomError(message, properties);

        // Error.call(this, message);
        // ^ just returns a new error instance because the ctor can be called as a function

        Object.defineProperty(this, "message", { get: function() { return message; } });

        /* istanbul ignore next */
        if (Error.captureStackTrace) // node
            Error.captureStackTrace(this, CustomError);
        else
            Object.defineProperty(this, "stack", { value: new Error().stack || "" });

        if (properties)
            merge(this, properties);
    }

    (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;

    Object.defineProperty(CustomError.prototype, "name", { get: function() { return name; } });

    CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
    };

    return CustomError;
}

util.newError = newError;

/**
 * Constructs a new protocol error.
 * @classdesc Error subclass indicating a protocol specifc error.
 * @memberof util
 * @extends Error
 * @template T extends Message<T>
 * @constructor
 * @param {string} message Error message
 * @param {Object.<string,*>} [properties] Additional properties
 * @example
 * try {
 *     MyMessage.decode(someBuffer); // throws if required fields are missing
 * } catch (e) {
 *     if (e instanceof ProtocolError && e.instance)
 *         console.log("decoded so far: " + JSON.stringify(e.instance));
 * }
 */
util.ProtocolError = newError("ProtocolError");

/**
 * So far decoded message instance.
 * @name util.ProtocolError#instance
 * @type {Message<T>}
 */

/**
 * A OneOf getter as returned by {@link util.oneOfGetter}.
 * @typedef OneOfGetter
 * @type {function}
 * @returns {string|undefined} Set field name, if any
 */

/**
 * Builds a getter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfGetter} Unbound getter
 */
util.oneOfGetter = function getOneOf(fieldNames) {
    var fieldMap = {};
    for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;

    /**
     * @returns {string|undefined} Set field name, if any
     * @this Object
     * @ignore
     */
    return function() { // eslint-disable-line consistent-return
        for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
            if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null)
                return keys[i];
    };
};

/**
 * A OneOf setter as returned by {@link util.oneOfSetter}.
 * @typedef OneOfSetter
 * @type {function}
 * @param {string|undefined} value Field name
 * @returns {undefined}
 */

/**
 * Builds a setter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfSetter} Unbound setter
 */
util.oneOfSetter = function setOneOf(fieldNames) {

    /**
     * @param {string} name Field name
     * @returns {undefined}
     * @this Object
     * @ignore
     */
    return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
                delete this[fieldNames[i]];
    };
};

/**
 * Default conversion options used for {@link Message#toJSON} implementations.
 *
 * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
 *
 * - Longs become strings
 * - Enums become string keys
 * - Bytes become base64 encoded strings
 * - (Sub-)Messages become plain objects
 * - Maps become plain objects with all string keys
 * - Repeated fields become arrays
 * - NaN and Infinity for float and double fields become strings
 *
 * @type {IConversionOptions}
 * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
 */
util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
};

// Sets up buffer utility according to the environment (called in index-minimal)
util._configure = function() {
    var Buffer = util.Buffer;
    /* istanbul ignore if */
    if (!Buffer) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
    }
    // because node 4.x buffers are incompatible & immutable
    // see: https://github.com/dcodeIO/protobuf.js/pull/665
    util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
        /* istanbul ignore next */
        function Buffer_from(value, encoding) {
            return new Buffer(value, encoding);
        };
    util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
        /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
            return new Buffer(size);
        };
};
});

var writer = Writer;



var BufferWriter; // cyclic

var LongBits$1  = minimal.LongBits,
    base64    = minimal.base64,
    utf8      = minimal.utf8;

/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @constructor
 * @param {function(*, Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @ignore
 */
function Op(fn, len, val) {

    /**
     * Function to call.
     * @type {function(Uint8Array, number, *)}
     */
    this.fn = fn;

    /**
     * Value byte length.
     * @type {number}
     */
    this.len = len;

    /**
     * Next operation.
     * @type {Writer.Op|undefined}
     */
    this.next = undefined;

    /**
     * Value to write.
     * @type {*}
     */
    this.val = val; // type varies
}

/* istanbul ignore next */
function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */
function State(writer) {

    /**
     * Current head.
     * @type {Writer.Op}
     */
    this.head = writer.head;

    /**
     * Current tail.
     * @type {Writer.Op}
     */
    this.tail = writer.tail;

    /**
     * Current buffer length.
     * @type {number}
     */
    this.len = writer.len;

    /**
     * Next state.
     * @type {State|null}
     */
    this.next = writer.states;
}

/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 */
function Writer() {

    /**
     * Current length.
     * @type {number}
     */
    this.len = 0;

    /**
     * Operations head.
     * @type {Object}
     */
    this.head = new Op(noop, 0, 0);

    /**
     * Operations tail
     * @type {Object}
     */
    this.tail = this.head;

    /**
     * Linked forked states.
     * @type {Object|null}
     */
    this.states = null;

    // When a value is written, the writer calculates its byte length and puts it into a linked
    // list of operations to perform when finish() is called. This both allows us to allocate
    // buffers of the exact required size and reduces the amount of work we have to do compared
    // to first calculating over objects and then encoding over objects. In our case, the encoding
    // part is just a linked list walk calling operations with already prepared values.
}

var create = function create() {
    return minimal.Buffer
        ? function create_buffer_setup() {
            return (Writer.create = function create_buffer() {
                return new BufferWriter();
            })();
        }
        /* istanbul ignore next */
        : function create_array() {
            return new Writer();
        };
};

/**
 * Creates a new writer.
 * @function
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */
Writer.create = create();

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
Writer.alloc = function alloc(size) {
    return new minimal.Array(size);
};

// Use Uint8Array buffer pool in the browser, just like node does with buffers
/* istanbul ignore else */
if (minimal.Array !== Array)
    Writer.alloc = minimal.pool(Writer.alloc, minimal.Array.prototype.subarray);

/**
 * Pushes a new operation to the queue.
 * @param {function(Uint8Array, number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 * @private
 */
Writer.prototype._push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
};

function writeByte(val, buf, pos) {
    buf[pos] = val & 255;
}

function writeVarint32(val, buf, pos) {
    while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
}

/**
 * Constructs a new varint writer operation instance.
 * @classdesc Scheduled varint writer operation.
 * @extends Op
 * @constructor
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @ignore
 */
function VarintOp(len, val) {
    this.len = len;
    this.next = undefined;
    this.val = val;
}

VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;

/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.uint32 = function write_uint32(value) {
    // here, the call to this.push has been inlined and a varint specific Op subclass is used.
    // uint32 is by far the most frequently used operation and benefits significantly from this.
    this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0)
                < 128       ? 1
        : value < 16384     ? 2
        : value < 2097152   ? 3
        : value < 268435456 ? 4
        :                     5,
    value)).len;
    return this;
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.int32 = function write_int32(value) {
    return value < 0
        ? this._push(writeVarint64, 10, LongBits$1.fromNumber(value)) // 10 bytes per spec
        : this.uint32(value);
};

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};

function writeVarint64(val, buf, pos) {
    while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.uint64 = function write_uint64(value) {
    var bits = LongBits$1.from(value);
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.int64 = Writer.prototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sint64 = function write_sint64(value) {
    var bits = LongBits$1.from(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.bool = function write_bool(value) {
    return this._push(writeByte, 1, value ? 1 : 0);
};

function writeFixed32(val, buf, pos) {
    buf[pos    ] =  val         & 255;
    buf[pos + 1] =  val >>> 8   & 255;
    buf[pos + 2] =  val >>> 16  & 255;
    buf[pos + 3] =  val >>> 24;
}

/**
 * Writes an unsigned 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.fixed32 = function write_fixed32(value) {
    return this._push(writeFixed32, 4, value >>> 0);
};

/**
 * Writes a signed 32 bit value as fixed 32 bits.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sfixed32 = Writer.prototype.fixed32;

/**
 * Writes an unsigned 64 bit value as fixed 64 bits.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits$1.from(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};

/**
 * Writes a signed 64 bit value as fixed 64 bits.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sfixed64 = Writer.prototype.fixed64;

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.float = function write_float(value) {
    return this._push(minimal.float.writeFloatLE, 4, value);
};

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.double = function write_double(value) {
    return this._push(minimal.float.writeDoubleLE, 8, value);
};

var writeBytes = minimal.Array.prototype.set
    ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos); // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
            buf[pos + i] = val[i];
    };

/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */
Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len)
        return this._push(writeByte, 1, 0);
    if (minimal.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    return this.uint32(len)._push(writeBytes, len, value);
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len
        ? this.uint32(len)._push(utf8.write, len, value)
        : this._push(writeByte, 1, 0);
};

/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */
Writer.prototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
Writer.prototype.reset = function reset() {
    if (this.states) {
        this.head   = this.states.head;
        this.tail   = this.states.tail;
        this.len    = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len  = 0;
    }
    return this;
};

/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @returns {Writer} `this`
 */
Writer.prototype.ldelim = function ldelim() {
    var head = this.head,
        tail = this.tail,
        len  = this.len;
    this.reset().uint32(len);
    if (len) {
        this.tail.next = head.next; // skip noop
        this.tail = tail;
        this.len += len;
    }
    return this;
};

/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */
Writer.prototype.finish = function finish() {
    var head = this.head.next, // skip noop
        buf  = this.constructor.alloc(this.len),
        pos  = 0;
    while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
    }
    // this.head = this.tail = null;
    return buf;
};

Writer._configure = function(BufferWriter_) {
    BufferWriter = BufferWriter_;
    Writer.create = create();
    BufferWriter._configure();
};

var writer_buffer = BufferWriter$1;

// extends Writer

(BufferWriter$1.prototype = Object.create(writer.prototype)).constructor = BufferWriter$1;



/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */
function BufferWriter$1() {
    writer.call(this);
}

BufferWriter$1._configure = function () {
    /**
     * Allocates a buffer of the specified size.
     * @function
     * @param {number} size Buffer size
     * @returns {Buffer} Buffer
     */
    BufferWriter$1.alloc = minimal._Buffer_allocUnsafe;

    BufferWriter$1.writeBytesBuffer = minimal.Buffer && minimal.Buffer.prototype instanceof Uint8Array && minimal.Buffer.prototype.set.name === "set"
        ? function writeBytesBuffer_set(val, buf, pos) {
          buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
          // also works for plain array values
        }
        /* istanbul ignore next */
        : function writeBytesBuffer_copy(val, buf, pos) {
          if (val.copy) // Buffer values
            val.copy(buf, pos, 0, val.length);
          else for (var i = 0; i < val.length;) // plain array values
            buf[pos++] = val[i++];
        };
};


/**
 * @override
 */
BufferWriter$1.prototype.bytes = function write_bytes_buffer(value) {
    if (minimal.isString(value))
        value = minimal._Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len)
        this._push(BufferWriter$1.writeBytesBuffer, len, value);
    return this;
};

function writeStringBuffer(val, buf, pos) {
    if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
        minimal.utf8.write(val, buf, pos);
    else if (buf.utf8Write)
        buf.utf8Write(val, pos);
    else
        buf.write(val, pos);
}

/**
 * @override
 */
BufferWriter$1.prototype.string = function write_string_buffer(value) {
    var len = minimal.Buffer.byteLength(value);
    this.uint32(len);
    if (len)
        this._push(writeStringBuffer, len, value);
    return this;
};


/**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {Buffer} Finished buffer
 */

BufferWriter$1._configure();

var reader = Reader;



var BufferReader; // cyclic

var LongBits$2  = minimal.LongBits,
    utf8$1      = minimal.utf8;

/* istanbul ignore next */
function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}

/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {Uint8Array} buffer Buffer to read from
 */
function Reader(buffer) {

    /**
     * Read buffer.
     * @type {Uint8Array}
     */
    this.buf = buffer;

    /**
     * Read buffer position.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Read buffer length.
     * @type {number}
     */
    this.len = buffer.length;
}

var create_array = typeof Uint8Array !== "undefined"
    ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    }
    /* istanbul ignore next */
    : function create_array(buffer) {
        if (Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    };

var create$1 = function create() {
    return minimal.Buffer
        ? function create_buffer_setup(buffer) {
            return (Reader.create = function create_buffer(buffer) {
                return minimal.Buffer.isBuffer(buffer)
                    ? new BufferReader(buffer)
                    /* istanbul ignore next */
                    : create_array(buffer);
            })(buffer);
        }
        /* istanbul ignore next */
        : create_array;
};

/**
 * Creates a new reader using the specified buffer.
 * @function
 * @param {Uint8Array|Buffer} buffer Buffer to read from
 * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 * @throws {Error} If `buffer` is not a valid buffer
 */
Reader.create = create$1();

Reader.prototype._slice = minimal.Array.prototype.subarray || /* istanbul ignore next */ minimal.Array.prototype.slice;

/**
 * Reads a varint as an unsigned 32 bit value.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.uint32 = (function read_uint32_setup() {
    var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
    return function read_uint32() {
        value = (         this.buf[this.pos] & 127       ) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) <<  7) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] &  15) << 28) >>> 0; if (this.buf[this.pos++] < 128) return value;

        /* istanbul ignore if */
        if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
        }
        return value;
    };
})();

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.int32 = function read_int32() {
    return this.uint32() | 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};

/* eslint-disable no-invalid-this */

function readLongVarint() {
    // tends to deopt with local vars for octet etc.
    var bits = new LongBits$2(0, 0);
    var i = 0;
    if (this.len - this.pos > 4) { // fast route (lo)
        for (; i < 4; ++i) {
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
        if (this.buf[this.pos++] < 128)
            return bits;
        i = 0;
    } else {
        for (; i < 3; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 1st..3th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 4th
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
    }
    if (this.len - this.pos > 4) { // fast route (hi)
        for (; i < 5; ++i) {
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    } else {
        for (; i < 5; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    }
    /* istanbul ignore next */
    throw Error("invalid varint encoding");
}

/* eslint-enable no-invalid-this */

/**
 * Reads a varint as a signed 64 bit value.
 * @name Reader#int64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as an unsigned 64 bit value.
 * @name Reader#uint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @name Reader#sint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */
Reader.prototype.bool = function read_bool() {
    return this.uint32() !== 0;
};

function readFixed32_end(buf, end) { // note that this uses `end`, not `pos`
    return (buf[end - 4]
          | buf[end - 3] << 8
          | buf[end - 2] << 16
          | buf[end - 1] << 24) >>> 0;
}

/**
 * Reads fixed 32 bits as an unsigned 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.fixed32 = function read_fixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4);
};

/**
 * Reads fixed 32 bits as a signed 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.sfixed32 = function read_sfixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4) | 0;
};

/* eslint-disable no-invalid-this */

function readFixed64(/* this: Reader */) {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);

    return new LongBits$2(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}

/* eslint-enable no-invalid-this */

/**
 * Reads fixed 64 bits.
 * @name Reader#fixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads zig-zag encoded fixed 64 bits.
 * @name Reader#sfixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.float = function read_float() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    var value = minimal.float.readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
};

/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.double = function read_double() {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);

    var value = minimal.float.readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */
Reader.prototype.bytes = function read_bytes() {
    var length = this.uint32(),
        start  = this.pos,
        end    = this.pos + length;

    /* istanbul ignore if */
    if (end > this.len)
        throw indexOutOfRange(this, length);

    this.pos += length;
    if (Array.isArray(this.buf)) // plain array
        return this.buf.slice(start, end);
    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, start, end);
};

/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */
Reader.prototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8$1.read(bytes, 0, bytes.length);
};

/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */
Reader.prototype.skip = function skip(length) {
    if (typeof length === "number") {
        /* istanbul ignore if */
        if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
        this.pos += length;
    } else {
        do {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
    }
    return this;
};

/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @returns {Reader} `this`
 */
Reader.prototype.skipType = function(wireType) {
    switch (wireType) {
        case 0:
            this.skip();
            break;
        case 1:
            this.skip(8);
            break;
        case 2:
            this.skip(this.uint32());
            break;
        case 3:
            while ((wireType = this.uint32() & 7) !== 4) {
                this.skipType(wireType);
            }
            break;
        case 5:
            this.skip(4);
            break;

        /* istanbul ignore next */
        default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
    }
    return this;
};

Reader._configure = function(BufferReader_) {
    BufferReader = BufferReader_;
    Reader.create = create$1();
    BufferReader._configure();

    var fn = minimal.Long ? "toLong" : /* istanbul ignore next */ "toNumber";
    minimal.merge(Reader.prototype, {

        int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
        },

        uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
        },

        sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
        },

        fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
        },

        sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
        }

    });
};

var reader_buffer = BufferReader$1;

// extends Reader

(BufferReader$1.prototype = Object.create(reader.prototype)).constructor = BufferReader$1;



/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader$1(buffer) {
    reader.call(this, buffer);

    /**
     * Read buffer.
     * @name BufferReader#buf
     * @type {Buffer}
     */
}

BufferReader$1._configure = function () {
    /* istanbul ignore else */
    if (minimal.Buffer)
        BufferReader$1.prototype._slice = minimal.Buffer.prototype.slice;
};


/**
 * @override
 */
BufferReader$1.prototype.string = function read_string_buffer() {
    var len = this.uint32(); // modifies pos
    return this.buf.utf8Slice
        ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len))
        : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @name BufferReader#bytes
 * @function
 * @returns {Buffer} Value read
 */

BufferReader$1._configure();

var service = Service;



// Extends EventEmitter
(Service.prototype = Object.create(minimal.EventEmitter.prototype)).constructor = Service;

/**
 * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
 *
 * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
 * @typedef rpc.ServiceMethodCallback
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {TRes} [response] Response message
 * @returns {undefined}
 */

/**
 * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
 * @typedef rpc.ServiceMethod
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
 * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
 */

/**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @exports rpc.Service
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 */
function Service(rpcImpl, requestDelimited, responseDelimited) {

    if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");

    minimal.EventEmitter.call(this);

    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {RPCImpl|null}
     */
    this.rpcImpl = rpcImpl;

    /**
     * Whether requests are length-delimited.
     * @type {boolean}
     */
    this.requestDelimited = Boolean(requestDelimited);

    /**
     * Whether responses are length-delimited.
     * @type {boolean}
     */
    this.responseDelimited = Boolean(responseDelimited);
}

/**
 * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
 * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
 * @param {Constructor<TReq>} requestCtor Request constructor
 * @param {Constructor<TRes>} responseCtor Response constructor
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
 * @returns {undefined}
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 */
Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {

    if (!request)
        throw TypeError("request must be specified");

    var self = this;
    if (!callback)
        return minimal.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

    if (!self.rpcImpl) {
        setTimeout(function() { callback(Error("already ended")); }, 0);
        return undefined;
    }

    try {
        return self.rpcImpl(
            method,
            requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err, response) {

                if (err) {
                    self.emit("error", err, method);
                    return callback(err);
                }

                if (response === null) {
                    self.end(/* endedByRPC */ true);
                    return undefined;
                }

                if (!(response instanceof responseCtor)) {
                    try {
                        response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                    } catch (err) {
                        self.emit("error", err, method);
                        return callback(err);
                    }
                }

                self.emit("data", response, method);
                return callback(null, response);
            }
        );
    } catch (err) {
        self.emit("error", err, method);
        setTimeout(function() { callback(err); }, 0);
        return undefined;
    }
};

/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */
Service.prototype.end = function end(endedByRPC) {
    if (this.rpcImpl) {
        if (!endedByRPC) // signal end to rpcImpl
            this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
    }
    return this;
};

var rpc_1 = createCommonjsModule(function (module, exports) {

/**
 * Streaming RPC helpers.
 * @namespace
 */
var rpc = exports;

/**
 * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
 * @typedef RPCImpl
 * @type {function}
 * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
 * @param {Uint8Array} requestData Request data
 * @param {RPCImplCallback} callback Callback function
 * @returns {undefined}
 * @example
 * function rpcImpl(method, requestData, callback) {
 *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
 *         throw Error("no such method");
 *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
 *         callback(err, responseData);
 *     });
 * }
 */

/**
 * Node-style callback as used by {@link RPCImpl}.
 * @typedef RPCImplCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
 * @returns {undefined}
 */

rpc.Service = service;
});

var roots = {};

var indexMinimal = createCommonjsModule(function (module, exports) {
var protobuf = exports;

/**
 * Build type, one of `"full"`, `"light"` or `"minimal"`.
 * @name build
 * @type {string}
 * @const
 */
protobuf.build = "minimal";

// Serialization
protobuf.Writer       = writer;
protobuf.BufferWriter = writer_buffer;
protobuf.Reader       = reader;
protobuf.BufferReader = reader_buffer;

// Utility
protobuf.util         = minimal;
protobuf.rpc          = rpc_1;
protobuf.roots        = roots;
protobuf.configure    = configure;

/* istanbul ignore next */
/**
 * Reconfigures the library according to the environment.
 * @returns {undefined}
 */
function configure() {
    protobuf.util._configure();
    protobuf.Writer._configure(protobuf.BufferWriter);
    protobuf.Reader._configure(protobuf.BufferReader);
}

// Set up buffer utility according to the environment
configure();
});

var minimal$1 = indexMinimal;

// Common aliases
var $Reader = minimal$1.Reader, $Writer = minimal$1.Writer, $util = minimal$1.util;

// Exported root namespace
var $root = minimal$1.roots["default"] || (minimal$1.roots["default"] = {});

$root.common = (function() {

    /**
     * Namespace common.
     * @exports common
     * @namespace
     */
    var common = {};

    common.Asset = (function() {

        /**
         * Properties of an Asset.
         * @memberof common
         * @interface IAsset
         * @property {string|null} [chain] Asset chain
         * @property {string|null} [symbol] Asset symbol
         * @property {string|null} [ticker] Asset ticker
         * @property {boolean|null} [synth] Asset synth
         */

        /**
         * Constructs a new Asset.
         * @memberof common
         * @classdesc Represents an Asset.
         * @implements IAsset
         * @constructor
         * @param {common.IAsset=} [properties] Properties to set
         */
        function Asset(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Asset chain.
         * @member {string} chain
         * @memberof common.Asset
         * @instance
         */
        Asset.prototype.chain = "";

        /**
         * Asset symbol.
         * @member {string} symbol
         * @memberof common.Asset
         * @instance
         */
        Asset.prototype.symbol = "";

        /**
         * Asset ticker.
         * @member {string} ticker
         * @memberof common.Asset
         * @instance
         */
        Asset.prototype.ticker = "";

        /**
         * Asset synth.
         * @member {boolean} synth
         * @memberof common.Asset
         * @instance
         */
        Asset.prototype.synth = false;

        /**
         * Creates a new Asset instance using the specified properties.
         * @function create
         * @memberof common.Asset
         * @static
         * @param {common.IAsset=} [properties] Properties to set
         * @returns {common.Asset} Asset instance
         */
        Asset.create = function create(properties) {
            return new Asset(properties);
        };

        /**
         * Encodes the specified Asset message. Does not implicitly {@link common.Asset.verify|verify} messages.
         * @function encode
         * @memberof common.Asset
         * @static
         * @param {common.IAsset} message Asset message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Asset.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chain != null && Object.hasOwnProperty.call(message, "chain"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.chain);
            if (message.symbol != null && Object.hasOwnProperty.call(message, "symbol"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.symbol);
            if (message.ticker != null && Object.hasOwnProperty.call(message, "ticker"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.ticker);
            if (message.synth != null && Object.hasOwnProperty.call(message, "synth"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.synth);
            return writer;
        };

        /**
         * Encodes the specified Asset message, length delimited. Does not implicitly {@link common.Asset.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.Asset
         * @static
         * @param {common.IAsset} message Asset message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Asset.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Asset message from the specified reader or buffer.
         * @function decode
         * @memberof common.Asset
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.Asset} Asset
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Asset.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.Asset();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.chain = reader.string();
                    break;
                case 2:
                    message.symbol = reader.string();
                    break;
                case 3:
                    message.ticker = reader.string();
                    break;
                case 4:
                    message.synth = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Asset message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.Asset
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.Asset} Asset
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Asset.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Asset message.
         * @function verify
         * @memberof common.Asset
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Asset.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chain != null && message.hasOwnProperty("chain"))
                if (!$util.isString(message.chain))
                    return "chain: string expected";
            if (message.symbol != null && message.hasOwnProperty("symbol"))
                if (!$util.isString(message.symbol))
                    return "symbol: string expected";
            if (message.ticker != null && message.hasOwnProperty("ticker"))
                if (!$util.isString(message.ticker))
                    return "ticker: string expected";
            if (message.synth != null && message.hasOwnProperty("synth"))
                if (typeof message.synth !== "boolean")
                    return "synth: boolean expected";
            return null;
        };

        /**
         * Creates an Asset message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.Asset
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.Asset} Asset
         */
        Asset.fromObject = function fromObject(object) {
            if (object instanceof $root.common.Asset)
                return object;
            var message = new $root.common.Asset();
            if (object.chain != null)
                message.chain = String(object.chain);
            if (object.symbol != null)
                message.symbol = String(object.symbol);
            if (object.ticker != null)
                message.ticker = String(object.ticker);
            if (object.synth != null)
                message.synth = Boolean(object.synth);
            return message;
        };

        /**
         * Creates a plain object from an Asset message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.Asset
         * @static
         * @param {common.Asset} message Asset
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Asset.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.chain = "";
                object.symbol = "";
                object.ticker = "";
                object.synth = false;
            }
            if (message.chain != null && message.hasOwnProperty("chain"))
                object.chain = message.chain;
            if (message.symbol != null && message.hasOwnProperty("symbol"))
                object.symbol = message.symbol;
            if (message.ticker != null && message.hasOwnProperty("ticker"))
                object.ticker = message.ticker;
            if (message.synth != null && message.hasOwnProperty("synth"))
                object.synth = message.synth;
            return object;
        };

        /**
         * Converts this Asset to JSON.
         * @function toJSON
         * @memberof common.Asset
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Asset.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
        };

        return Asset;
    })();

    common.Coin = (function() {

        /**
         * Properties of a Coin.
         * @memberof common
         * @interface ICoin
         * @property {common.IAsset|null} [asset] Coin asset
         * @property {string|null} [amount] Coin amount
         * @property {number|Long|null} [decimals] Coin decimals
         */

        /**
         * Constructs a new Coin.
         * @memberof common
         * @classdesc Represents a Coin.
         * @implements ICoin
         * @constructor
         * @param {common.ICoin=} [properties] Properties to set
         */
        function Coin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Coin asset.
         * @member {common.IAsset|null|undefined} asset
         * @memberof common.Coin
         * @instance
         */
        Coin.prototype.asset = null;

        /**
         * Coin amount.
         * @member {string} amount
         * @memberof common.Coin
         * @instance
         */
        Coin.prototype.amount = "";

        /**
         * Coin decimals.
         * @member {number|Long} decimals
         * @memberof common.Coin
         * @instance
         */
        Coin.prototype.decimals = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new Coin instance using the specified properties.
         * @function create
         * @memberof common.Coin
         * @static
         * @param {common.ICoin=} [properties] Properties to set
         * @returns {common.Coin} Coin instance
         */
        Coin.create = function create(properties) {
            return new Coin(properties);
        };

        /**
         * Encodes the specified Coin message. Does not implicitly {@link common.Coin.verify|verify} messages.
         * @function encode
         * @memberof common.Coin
         * @static
         * @param {common.ICoin} message Coin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Coin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.asset != null && Object.hasOwnProperty.call(message, "asset"))
                $root.common.Asset.encode(message.asset, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.amount);
            if (message.decimals != null && Object.hasOwnProperty.call(message, "decimals"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.decimals);
            return writer;
        };

        /**
         * Encodes the specified Coin message, length delimited. Does not implicitly {@link common.Coin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.Coin
         * @static
         * @param {common.ICoin} message Coin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Coin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Coin message from the specified reader or buffer.
         * @function decode
         * @memberof common.Coin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.Coin} Coin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Coin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.Coin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.asset = $root.common.Asset.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.amount = reader.string();
                    break;
                case 3:
                    message.decimals = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Coin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.Coin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.Coin} Coin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Coin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Coin message.
         * @function verify
         * @memberof common.Coin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Coin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.asset != null && message.hasOwnProperty("asset")) {
                var error = $root.common.Asset.verify(message.asset);
                if (error)
                    return "asset." + error;
            }
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isString(message.amount))
                    return "amount: string expected";
            if (message.decimals != null && message.hasOwnProperty("decimals"))
                if (!$util.isInteger(message.decimals) && !(message.decimals && $util.isInteger(message.decimals.low) && $util.isInteger(message.decimals.high)))
                    return "decimals: integer|Long expected";
            return null;
        };

        /**
         * Creates a Coin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.Coin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.Coin} Coin
         */
        Coin.fromObject = function fromObject(object) {
            if (object instanceof $root.common.Coin)
                return object;
            var message = new $root.common.Coin();
            if (object.asset != null) {
                if (typeof object.asset !== "object")
                    throw TypeError(".common.Coin.asset: object expected");
                message.asset = $root.common.Asset.fromObject(object.asset);
            }
            if (object.amount != null)
                message.amount = String(object.amount);
            if (object.decimals != null)
                if ($util.Long)
                    (message.decimals = $util.Long.fromValue(object.decimals)).unsigned = false;
                else if (typeof object.decimals === "string")
                    message.decimals = parseInt(object.decimals, 10);
                else if (typeof object.decimals === "number")
                    message.decimals = object.decimals;
                else if (typeof object.decimals === "object")
                    message.decimals = new $util.LongBits(object.decimals.low >>> 0, object.decimals.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a Coin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.Coin
         * @static
         * @param {common.Coin} message Coin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Coin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.asset = null;
                object.amount = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.decimals = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.decimals = options.longs === String ? "0" : 0;
            }
            if (message.asset != null && message.hasOwnProperty("asset"))
                object.asset = $root.common.Asset.toObject(message.asset, options);
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = message.amount;
            if (message.decimals != null && message.hasOwnProperty("decimals"))
                if (typeof message.decimals === "number")
                    object.decimals = options.longs === String ? String(message.decimals) : message.decimals;
                else
                    object.decimals = options.longs === String ? $util.Long.prototype.toString.call(message.decimals) : options.longs === Number ? new $util.LongBits(message.decimals.low >>> 0, message.decimals.high >>> 0).toNumber() : message.decimals;
            return object;
        };

        /**
         * Converts this Coin to JSON.
         * @function toJSON
         * @memberof common.Coin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Coin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
        };

        return Coin;
    })();

    common.PubKeySet = (function() {

        /**
         * Properties of a PubKeySet.
         * @memberof common
         * @interface IPubKeySet
         * @property {string|null} [secp256k1] PubKeySet secp256k1
         * @property {string|null} [ed25519] PubKeySet ed25519
         */

        /**
         * Constructs a new PubKeySet.
         * @memberof common
         * @classdesc Represents a PubKeySet.
         * @implements IPubKeySet
         * @constructor
         * @param {common.IPubKeySet=} [properties] Properties to set
         */
        function PubKeySet(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PubKeySet secp256k1.
         * @member {string} secp256k1
         * @memberof common.PubKeySet
         * @instance
         */
        PubKeySet.prototype.secp256k1 = "";

        /**
         * PubKeySet ed25519.
         * @member {string} ed25519
         * @memberof common.PubKeySet
         * @instance
         */
        PubKeySet.prototype.ed25519 = "";

        /**
         * Creates a new PubKeySet instance using the specified properties.
         * @function create
         * @memberof common.PubKeySet
         * @static
         * @param {common.IPubKeySet=} [properties] Properties to set
         * @returns {common.PubKeySet} PubKeySet instance
         */
        PubKeySet.create = function create(properties) {
            return new PubKeySet(properties);
        };

        /**
         * Encodes the specified PubKeySet message. Does not implicitly {@link common.PubKeySet.verify|verify} messages.
         * @function encode
         * @memberof common.PubKeySet
         * @static
         * @param {common.IPubKeySet} message PubKeySet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PubKeySet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.secp256k1 != null && Object.hasOwnProperty.call(message, "secp256k1"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.secp256k1);
            if (message.ed25519 != null && Object.hasOwnProperty.call(message, "ed25519"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.ed25519);
            return writer;
        };

        /**
         * Encodes the specified PubKeySet message, length delimited. Does not implicitly {@link common.PubKeySet.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.PubKeySet
         * @static
         * @param {common.IPubKeySet} message PubKeySet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PubKeySet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PubKeySet message from the specified reader or buffer.
         * @function decode
         * @memberof common.PubKeySet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.PubKeySet} PubKeySet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PubKeySet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.PubKeySet();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.secp256k1 = reader.string();
                    break;
                case 2:
                    message.ed25519 = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PubKeySet message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.PubKeySet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.PubKeySet} PubKeySet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PubKeySet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PubKeySet message.
         * @function verify
         * @memberof common.PubKeySet
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PubKeySet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.secp256k1 != null && message.hasOwnProperty("secp256k1"))
                if (!$util.isString(message.secp256k1))
                    return "secp256k1: string expected";
            if (message.ed25519 != null && message.hasOwnProperty("ed25519"))
                if (!$util.isString(message.ed25519))
                    return "ed25519: string expected";
            return null;
        };

        /**
         * Creates a PubKeySet message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.PubKeySet
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.PubKeySet} PubKeySet
         */
        PubKeySet.fromObject = function fromObject(object) {
            if (object instanceof $root.common.PubKeySet)
                return object;
            var message = new $root.common.PubKeySet();
            if (object.secp256k1 != null)
                message.secp256k1 = String(object.secp256k1);
            if (object.ed25519 != null)
                message.ed25519 = String(object.ed25519);
            return message;
        };

        /**
         * Creates a plain object from a PubKeySet message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.PubKeySet
         * @static
         * @param {common.PubKeySet} message PubKeySet
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PubKeySet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.secp256k1 = "";
                object.ed25519 = "";
            }
            if (message.secp256k1 != null && message.hasOwnProperty("secp256k1"))
                object.secp256k1 = message.secp256k1;
            if (message.ed25519 != null && message.hasOwnProperty("ed25519"))
                object.ed25519 = message.ed25519;
            return object;
        };

        /**
         * Converts this PubKeySet to JSON.
         * @function toJSON
         * @memberof common.PubKeySet
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PubKeySet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
        };

        return PubKeySet;
    })();

    common.Tx = (function() {

        /**
         * Properties of a Tx.
         * @memberof common
         * @interface ITx
         * @property {string|null} [id] Tx id
         * @property {string|null} [chain] Tx chain
         * @property {string|null} [fromAddress] Tx fromAddress
         * @property {string|null} [toAddress] Tx toAddress
         * @property {Array.<common.ICoin>|null} [coins] Tx coins
         * @property {Array.<common.ICoin>|null} [gas] Tx gas
         * @property {string|null} [memo] Tx memo
         */

        /**
         * Constructs a new Tx.
         * @memberof common
         * @classdesc Represents a Tx.
         * @implements ITx
         * @constructor
         * @param {common.ITx=} [properties] Properties to set
         */
        function Tx(properties) {
            this.coins = [];
            this.gas = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Tx id.
         * @member {string} id
         * @memberof common.Tx
         * @instance
         */
        Tx.prototype.id = "";

        /**
         * Tx chain.
         * @member {string} chain
         * @memberof common.Tx
         * @instance
         */
        Tx.prototype.chain = "";

        /**
         * Tx fromAddress.
         * @member {string} fromAddress
         * @memberof common.Tx
         * @instance
         */
        Tx.prototype.fromAddress = "";

        /**
         * Tx toAddress.
         * @member {string} toAddress
         * @memberof common.Tx
         * @instance
         */
        Tx.prototype.toAddress = "";

        /**
         * Tx coins.
         * @member {Array.<common.ICoin>} coins
         * @memberof common.Tx
         * @instance
         */
        Tx.prototype.coins = $util.emptyArray;

        /**
         * Tx gas.
         * @member {Array.<common.ICoin>} gas
         * @memberof common.Tx
         * @instance
         */
        Tx.prototype.gas = $util.emptyArray;

        /**
         * Tx memo.
         * @member {string} memo
         * @memberof common.Tx
         * @instance
         */
        Tx.prototype.memo = "";

        /**
         * Creates a new Tx instance using the specified properties.
         * @function create
         * @memberof common.Tx
         * @static
         * @param {common.ITx=} [properties] Properties to set
         * @returns {common.Tx} Tx instance
         */
        Tx.create = function create(properties) {
            return new Tx(properties);
        };

        /**
         * Encodes the specified Tx message. Does not implicitly {@link common.Tx.verify|verify} messages.
         * @function encode
         * @memberof common.Tx
         * @static
         * @param {common.ITx} message Tx message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Tx.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.chain != null && Object.hasOwnProperty.call(message, "chain"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.chain);
            if (message.fromAddress != null && Object.hasOwnProperty.call(message, "fromAddress"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.fromAddress);
            if (message.toAddress != null && Object.hasOwnProperty.call(message, "toAddress"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.toAddress);
            if (message.coins != null && message.coins.length)
                for (var i = 0; i < message.coins.length; ++i)
                    $root.common.Coin.encode(message.coins[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.gas != null && message.gas.length)
                for (var i = 0; i < message.gas.length; ++i)
                    $root.common.Coin.encode(message.gas[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.memo != null && Object.hasOwnProperty.call(message, "memo"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.memo);
            return writer;
        };

        /**
         * Encodes the specified Tx message, length delimited. Does not implicitly {@link common.Tx.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.Tx
         * @static
         * @param {common.ITx} message Tx message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Tx.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Tx message from the specified reader or buffer.
         * @function decode
         * @memberof common.Tx
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.Tx} Tx
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Tx.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.Tx();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.chain = reader.string();
                    break;
                case 3:
                    message.fromAddress = reader.string();
                    break;
                case 4:
                    message.toAddress = reader.string();
                    break;
                case 5:
                    if (!(message.coins && message.coins.length))
                        message.coins = [];
                    message.coins.push($root.common.Coin.decode(reader, reader.uint32()));
                    break;
                case 6:
                    if (!(message.gas && message.gas.length))
                        message.gas = [];
                    message.gas.push($root.common.Coin.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.memo = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Tx message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.Tx
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.Tx} Tx
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Tx.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Tx message.
         * @function verify
         * @memberof common.Tx
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Tx.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.chain != null && message.hasOwnProperty("chain"))
                if (!$util.isString(message.chain))
                    return "chain: string expected";
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                if (!$util.isString(message.fromAddress))
                    return "fromAddress: string expected";
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                if (!$util.isString(message.toAddress))
                    return "toAddress: string expected";
            if (message.coins != null && message.hasOwnProperty("coins")) {
                if (!Array.isArray(message.coins))
                    return "coins: array expected";
                for (var i = 0; i < message.coins.length; ++i) {
                    var error = $root.common.Coin.verify(message.coins[i]);
                    if (error)
                        return "coins." + error;
                }
            }
            if (message.gas != null && message.hasOwnProperty("gas")) {
                if (!Array.isArray(message.gas))
                    return "gas: array expected";
                for (var i = 0; i < message.gas.length; ++i) {
                    var error = $root.common.Coin.verify(message.gas[i]);
                    if (error)
                        return "gas." + error;
                }
            }
            if (message.memo != null && message.hasOwnProperty("memo"))
                if (!$util.isString(message.memo))
                    return "memo: string expected";
            return null;
        };

        /**
         * Creates a Tx message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.Tx
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.Tx} Tx
         */
        Tx.fromObject = function fromObject(object) {
            if (object instanceof $root.common.Tx)
                return object;
            var message = new $root.common.Tx();
            if (object.id != null)
                message.id = String(object.id);
            if (object.chain != null)
                message.chain = String(object.chain);
            if (object.fromAddress != null)
                message.fromAddress = String(object.fromAddress);
            if (object.toAddress != null)
                message.toAddress = String(object.toAddress);
            if (object.coins) {
                if (!Array.isArray(object.coins))
                    throw TypeError(".common.Tx.coins: array expected");
                message.coins = [];
                for (var i = 0; i < object.coins.length; ++i) {
                    if (typeof object.coins[i] !== "object")
                        throw TypeError(".common.Tx.coins: object expected");
                    message.coins[i] = $root.common.Coin.fromObject(object.coins[i]);
                }
            }
            if (object.gas) {
                if (!Array.isArray(object.gas))
                    throw TypeError(".common.Tx.gas: array expected");
                message.gas = [];
                for (var i = 0; i < object.gas.length; ++i) {
                    if (typeof object.gas[i] !== "object")
                        throw TypeError(".common.Tx.gas: object expected");
                    message.gas[i] = $root.common.Coin.fromObject(object.gas[i]);
                }
            }
            if (object.memo != null)
                message.memo = String(object.memo);
            return message;
        };

        /**
         * Creates a plain object from a Tx message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.Tx
         * @static
         * @param {common.Tx} message Tx
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Tx.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.coins = [];
                object.gas = [];
            }
            if (options.defaults) {
                object.id = "";
                object.chain = "";
                object.fromAddress = "";
                object.toAddress = "";
                object.memo = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.chain != null && message.hasOwnProperty("chain"))
                object.chain = message.chain;
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                object.fromAddress = message.fromAddress;
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                object.toAddress = message.toAddress;
            if (message.coins && message.coins.length) {
                object.coins = [];
                for (var j = 0; j < message.coins.length; ++j)
                    object.coins[j] = $root.common.Coin.toObject(message.coins[j], options);
            }
            if (message.gas && message.gas.length) {
                object.gas = [];
                for (var j = 0; j < message.gas.length; ++j)
                    object.gas[j] = $root.common.Coin.toObject(message.gas[j], options);
            }
            if (message.memo != null && message.hasOwnProperty("memo"))
                object.memo = message.memo;
            return object;
        };

        /**
         * Converts this Tx to JSON.
         * @function toJSON
         * @memberof common.Tx
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Tx.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
        };

        return Tx;
    })();

    common.Fee = (function() {

        /**
         * Properties of a Fee.
         * @memberof common
         * @interface IFee
         * @property {Array.<common.ICoin>|null} [coins] Fee coins
         * @property {string|null} [poolDeduct] Fee poolDeduct
         */

        /**
         * Constructs a new Fee.
         * @memberof common
         * @classdesc Represents a Fee.
         * @implements IFee
         * @constructor
         * @param {common.IFee=} [properties] Properties to set
         */
        function Fee(properties) {
            this.coins = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Fee coins.
         * @member {Array.<common.ICoin>} coins
         * @memberof common.Fee
         * @instance
         */
        Fee.prototype.coins = $util.emptyArray;

        /**
         * Fee poolDeduct.
         * @member {string} poolDeduct
         * @memberof common.Fee
         * @instance
         */
        Fee.prototype.poolDeduct = "";

        /**
         * Creates a new Fee instance using the specified properties.
         * @function create
         * @memberof common.Fee
         * @static
         * @param {common.IFee=} [properties] Properties to set
         * @returns {common.Fee} Fee instance
         */
        Fee.create = function create(properties) {
            return new Fee(properties);
        };

        /**
         * Encodes the specified Fee message. Does not implicitly {@link common.Fee.verify|verify} messages.
         * @function encode
         * @memberof common.Fee
         * @static
         * @param {common.IFee} message Fee message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Fee.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.coins != null && message.coins.length)
                for (var i = 0; i < message.coins.length; ++i)
                    $root.common.Coin.encode(message.coins[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.poolDeduct != null && Object.hasOwnProperty.call(message, "poolDeduct"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.poolDeduct);
            return writer;
        };

        /**
         * Encodes the specified Fee message, length delimited. Does not implicitly {@link common.Fee.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.Fee
         * @static
         * @param {common.IFee} message Fee message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Fee.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Fee message from the specified reader or buffer.
         * @function decode
         * @memberof common.Fee
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.Fee} Fee
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Fee.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.Fee();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.coins && message.coins.length))
                        message.coins = [];
                    message.coins.push($root.common.Coin.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.poolDeduct = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Fee message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.Fee
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.Fee} Fee
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Fee.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Fee message.
         * @function verify
         * @memberof common.Fee
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Fee.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.coins != null && message.hasOwnProperty("coins")) {
                if (!Array.isArray(message.coins))
                    return "coins: array expected";
                for (var i = 0; i < message.coins.length; ++i) {
                    var error = $root.common.Coin.verify(message.coins[i]);
                    if (error)
                        return "coins." + error;
                }
            }
            if (message.poolDeduct != null && message.hasOwnProperty("poolDeduct"))
                if (!$util.isString(message.poolDeduct))
                    return "poolDeduct: string expected";
            return null;
        };

        /**
         * Creates a Fee message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.Fee
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.Fee} Fee
         */
        Fee.fromObject = function fromObject(object) {
            if (object instanceof $root.common.Fee)
                return object;
            var message = new $root.common.Fee();
            if (object.coins) {
                if (!Array.isArray(object.coins))
                    throw TypeError(".common.Fee.coins: array expected");
                message.coins = [];
                for (var i = 0; i < object.coins.length; ++i) {
                    if (typeof object.coins[i] !== "object")
                        throw TypeError(".common.Fee.coins: object expected");
                    message.coins[i] = $root.common.Coin.fromObject(object.coins[i]);
                }
            }
            if (object.poolDeduct != null)
                message.poolDeduct = String(object.poolDeduct);
            return message;
        };

        /**
         * Creates a plain object from a Fee message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.Fee
         * @static
         * @param {common.Fee} message Fee
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Fee.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.coins = [];
            if (options.defaults)
                object.poolDeduct = "";
            if (message.coins && message.coins.length) {
                object.coins = [];
                for (var j = 0; j < message.coins.length; ++j)
                    object.coins[j] = $root.common.Coin.toObject(message.coins[j], options);
            }
            if (message.poolDeduct != null && message.hasOwnProperty("poolDeduct"))
                object.poolDeduct = message.poolDeduct;
            return object;
        };

        /**
         * Converts this Fee to JSON.
         * @function toJSON
         * @memberof common.Fee
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Fee.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
        };

        return Fee;
    })();

    return common;
})();

$root.types = (function() {

    /**
     * Namespace types.
     * @exports types
     * @namespace
     */
    var types = {};

    types.MsgDeposit = (function() {

        /**
         * Properties of a MsgDeposit.
         * @memberof types
         * @interface IMsgDeposit
         * @property {Array.<common.ICoin>|null} [coins] MsgDeposit coins
         * @property {string|null} [memo] MsgDeposit memo
         * @property {Uint8Array|null} [signer] MsgDeposit signer
         */

        /**
         * Constructs a new MsgDeposit.
         * @memberof types
         * @classdesc Represents a MsgDeposit.
         * @implements IMsgDeposit
         * @constructor
         * @param {types.IMsgDeposit=} [properties] Properties to set
         */
        function MsgDeposit(properties) {
            this.coins = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgDeposit coins.
         * @member {Array.<common.ICoin>} coins
         * @memberof types.MsgDeposit
         * @instance
         */
        MsgDeposit.prototype.coins = $util.emptyArray;

        /**
         * MsgDeposit memo.
         * @member {string} memo
         * @memberof types.MsgDeposit
         * @instance
         */
        MsgDeposit.prototype.memo = "";

        /**
         * MsgDeposit signer.
         * @member {Uint8Array} signer
         * @memberof types.MsgDeposit
         * @instance
         */
        MsgDeposit.prototype.signer = $util.newBuffer([]);

        /**
         * Creates a new MsgDeposit instance using the specified properties.
         * @function create
         * @memberof types.MsgDeposit
         * @static
         * @param {types.IMsgDeposit=} [properties] Properties to set
         * @returns {types.MsgDeposit} MsgDeposit instance
         */
        MsgDeposit.create = function create(properties) {
            return new MsgDeposit(properties);
        };

        /**
         * Encodes the specified MsgDeposit message. Does not implicitly {@link types.MsgDeposit.verify|verify} messages.
         * @function encode
         * @memberof types.MsgDeposit
         * @static
         * @param {types.IMsgDeposit} message MsgDeposit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgDeposit.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.coins != null && message.coins.length)
                for (var i = 0; i < message.coins.length; ++i)
                    $root.common.Coin.encode(message.coins[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.memo != null && Object.hasOwnProperty.call(message, "memo"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.memo);
            if (message.signer != null && Object.hasOwnProperty.call(message, "signer"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.signer);
            return writer;
        };

        /**
         * Encodes the specified MsgDeposit message, length delimited. Does not implicitly {@link types.MsgDeposit.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MsgDeposit
         * @static
         * @param {types.IMsgDeposit} message MsgDeposit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgDeposit.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgDeposit message from the specified reader or buffer.
         * @function decode
         * @memberof types.MsgDeposit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MsgDeposit} MsgDeposit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgDeposit.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MsgDeposit();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.coins && message.coins.length))
                        message.coins = [];
                    message.coins.push($root.common.Coin.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.memo = reader.string();
                    break;
                case 3:
                    message.signer = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MsgDeposit message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MsgDeposit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MsgDeposit} MsgDeposit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgDeposit.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgDeposit message.
         * @function verify
         * @memberof types.MsgDeposit
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgDeposit.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.coins != null && message.hasOwnProperty("coins")) {
                if (!Array.isArray(message.coins))
                    return "coins: array expected";
                for (var i = 0; i < message.coins.length; ++i) {
                    var error = $root.common.Coin.verify(message.coins[i]);
                    if (error)
                        return "coins." + error;
                }
            }
            if (message.memo != null && message.hasOwnProperty("memo"))
                if (!$util.isString(message.memo))
                    return "memo: string expected";
            if (message.signer != null && message.hasOwnProperty("signer"))
                if (!(message.signer && typeof message.signer.length === "number" || $util.isString(message.signer)))
                    return "signer: buffer expected";
            return null;
        };

        /**
         * Creates a MsgDeposit message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MsgDeposit
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MsgDeposit} MsgDeposit
         */
        MsgDeposit.fromObject = function fromObject(object) {
            if (object instanceof $root.types.MsgDeposit)
                return object;
            var message = new $root.types.MsgDeposit();
            if (object.coins) {
                if (!Array.isArray(object.coins))
                    throw TypeError(".types.MsgDeposit.coins: array expected");
                message.coins = [];
                for (var i = 0; i < object.coins.length; ++i) {
                    if (typeof object.coins[i] !== "object")
                        throw TypeError(".types.MsgDeposit.coins: object expected");
                    message.coins[i] = $root.common.Coin.fromObject(object.coins[i]);
                }
            }
            if (object.memo != null)
                message.memo = String(object.memo);
            if (object.signer != null)
                if (typeof object.signer === "string")
                    $util.base64.decode(object.signer, message.signer = $util.newBuffer($util.base64.length(object.signer)), 0);
                else if (object.signer.length)
                    message.signer = object.signer;
            return message;
        };

        /**
         * Creates a plain object from a MsgDeposit message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MsgDeposit
         * @static
         * @param {types.MsgDeposit} message MsgDeposit
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgDeposit.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.coins = [];
            if (options.defaults) {
                object.memo = "";
                if (options.bytes === String)
                    object.signer = "";
                else {
                    object.signer = [];
                    if (options.bytes !== Array)
                        object.signer = $util.newBuffer(object.signer);
                }
            }
            if (message.coins && message.coins.length) {
                object.coins = [];
                for (var j = 0; j < message.coins.length; ++j)
                    object.coins[j] = $root.common.Coin.toObject(message.coins[j], options);
            }
            if (message.memo != null && message.hasOwnProperty("memo"))
                object.memo = message.memo;
            if (message.signer != null && message.hasOwnProperty("signer"))
                object.signer = options.bytes === String ? $util.base64.encode(message.signer, 0, message.signer.length) : options.bytes === Array ? Array.prototype.slice.call(message.signer) : message.signer;
            return object;
        };

        /**
         * Converts this MsgDeposit to JSON.
         * @function toJSON
         * @memberof types.MsgDeposit
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgDeposit.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
        };

        return MsgDeposit;
    })();

    types.MsgSend = (function() {

        /**
         * Properties of a MsgSend.
         * @memberof types
         * @interface IMsgSend
         * @property {Uint8Array|null} [fromAddress] MsgSend fromAddress
         * @property {Uint8Array|null} [toAddress] MsgSend toAddress
         * @property {Array.<cosmos.base.v1beta1.ICoin>|null} [amount] MsgSend amount
         */

        /**
         * Constructs a new MsgSend.
         * @memberof types
         * @classdesc Represents a MsgSend.
         * @implements IMsgSend
         * @constructor
         * @param {types.IMsgSend=} [properties] Properties to set
         */
        function MsgSend(properties) {
            this.amount = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgSend fromAddress.
         * @member {Uint8Array} fromAddress
         * @memberof types.MsgSend
         * @instance
         */
        MsgSend.prototype.fromAddress = $util.newBuffer([]);

        /**
         * MsgSend toAddress.
         * @member {Uint8Array} toAddress
         * @memberof types.MsgSend
         * @instance
         */
        MsgSend.prototype.toAddress = $util.newBuffer([]);

        /**
         * MsgSend amount.
         * @member {Array.<cosmos.base.v1beta1.ICoin>} amount
         * @memberof types.MsgSend
         * @instance
         */
        MsgSend.prototype.amount = $util.emptyArray;

        /**
         * Creates a new MsgSend instance using the specified properties.
         * @function create
         * @memberof types.MsgSend
         * @static
         * @param {types.IMsgSend=} [properties] Properties to set
         * @returns {types.MsgSend} MsgSend instance
         */
        MsgSend.create = function create(properties) {
            return new MsgSend(properties);
        };

        /**
         * Encodes the specified MsgSend message. Does not implicitly {@link types.MsgSend.verify|verify} messages.
         * @function encode
         * @memberof types.MsgSend
         * @static
         * @param {types.IMsgSend} message MsgSend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgSend.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.fromAddress != null && Object.hasOwnProperty.call(message, "fromAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.fromAddress);
            if (message.toAddress != null && Object.hasOwnProperty.call(message, "toAddress"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.toAddress);
            if (message.amount != null && message.amount.length)
                for (var i = 0; i < message.amount.length; ++i)
                    $root.cosmos.base.v1beta1.Coin.encode(message.amount[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified MsgSend message, length delimited. Does not implicitly {@link types.MsgSend.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MsgSend
         * @static
         * @param {types.IMsgSend} message MsgSend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgSend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgSend message from the specified reader or buffer.
         * @function decode
         * @memberof types.MsgSend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MsgSend} MsgSend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgSend.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MsgSend();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.fromAddress = reader.bytes();
                    break;
                case 2:
                    message.toAddress = reader.bytes();
                    break;
                case 3:
                    if (!(message.amount && message.amount.length))
                        message.amount = [];
                    message.amount.push($root.cosmos.base.v1beta1.Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MsgSend message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MsgSend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MsgSend} MsgSend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgSend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgSend message.
         * @function verify
         * @memberof types.MsgSend
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgSend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                if (!(message.fromAddress && typeof message.fromAddress.length === "number" || $util.isString(message.fromAddress)))
                    return "fromAddress: buffer expected";
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                if (!(message.toAddress && typeof message.toAddress.length === "number" || $util.isString(message.toAddress)))
                    return "toAddress: buffer expected";
            if (message.amount != null && message.hasOwnProperty("amount")) {
                if (!Array.isArray(message.amount))
                    return "amount: array expected";
                for (var i = 0; i < message.amount.length; ++i) {
                    var error = $root.cosmos.base.v1beta1.Coin.verify(message.amount[i]);
                    if (error)
                        return "amount." + error;
                }
            }
            return null;
        };

        /**
         * Creates a MsgSend message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MsgSend
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MsgSend} MsgSend
         */
        MsgSend.fromObject = function fromObject(object) {
            if (object instanceof $root.types.MsgSend)
                return object;
            var message = new $root.types.MsgSend();
            if (object.fromAddress != null)
                if (typeof object.fromAddress === "string")
                    $util.base64.decode(object.fromAddress, message.fromAddress = $util.newBuffer($util.base64.length(object.fromAddress)), 0);
                else if (object.fromAddress.length)
                    message.fromAddress = object.fromAddress;
            if (object.toAddress != null)
                if (typeof object.toAddress === "string")
                    $util.base64.decode(object.toAddress, message.toAddress = $util.newBuffer($util.base64.length(object.toAddress)), 0);
                else if (object.toAddress.length)
                    message.toAddress = object.toAddress;
            if (object.amount) {
                if (!Array.isArray(object.amount))
                    throw TypeError(".types.MsgSend.amount: array expected");
                message.amount = [];
                for (var i = 0; i < object.amount.length; ++i) {
                    if (typeof object.amount[i] !== "object")
                        throw TypeError(".types.MsgSend.amount: object expected");
                    message.amount[i] = $root.cosmos.base.v1beta1.Coin.fromObject(object.amount[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a MsgSend message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MsgSend
         * @static
         * @param {types.MsgSend} message MsgSend
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgSend.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.amount = [];
            if (options.defaults) {
                if (options.bytes === String)
                    object.fromAddress = "";
                else {
                    object.fromAddress = [];
                    if (options.bytes !== Array)
                        object.fromAddress = $util.newBuffer(object.fromAddress);
                }
                if (options.bytes === String)
                    object.toAddress = "";
                else {
                    object.toAddress = [];
                    if (options.bytes !== Array)
                        object.toAddress = $util.newBuffer(object.toAddress);
                }
            }
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                object.fromAddress = options.bytes === String ? $util.base64.encode(message.fromAddress, 0, message.fromAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.fromAddress) : message.fromAddress;
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                object.toAddress = options.bytes === String ? $util.base64.encode(message.toAddress, 0, message.toAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.toAddress) : message.toAddress;
            if (message.amount && message.amount.length) {
                object.amount = [];
                for (var j = 0; j < message.amount.length; ++j)
                    object.amount[j] = $root.cosmos.base.v1beta1.Coin.toObject(message.amount[j], options);
            }
            return object;
        };

        /**
         * Converts this MsgSend to JSON.
         * @function toJSON
         * @memberof types.MsgSend
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgSend.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
        };

        return MsgSend;
    })();

    return types;
})();

$root.cosmos = (function() {

    /**
     * Namespace cosmos.
     * @exports cosmos
     * @namespace
     */
    var cosmos = {};

    cosmos.base = (function() {

        /**
         * Namespace base.
         * @memberof cosmos
         * @namespace
         */
        var base = {};

        base.v1beta1 = (function() {

            /**
             * Namespace v1beta1.
             * @memberof cosmos.base
             * @namespace
             */
            var v1beta1 = {};

            v1beta1.Coin = (function() {

                /**
                 * Properties of a Coin.
                 * @memberof cosmos.base.v1beta1
                 * @interface ICoin
                 * @property {string|null} [denom] Coin denom
                 * @property {string|null} [amount] Coin amount
                 */

                /**
                 * Constructs a new Coin.
                 * @memberof cosmos.base.v1beta1
                 * @classdesc Represents a Coin.
                 * @implements ICoin
                 * @constructor
                 * @param {cosmos.base.v1beta1.ICoin=} [properties] Properties to set
                 */
                function Coin(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Coin denom.
                 * @member {string} denom
                 * @memberof cosmos.base.v1beta1.Coin
                 * @instance
                 */
                Coin.prototype.denom = "";

                /**
                 * Coin amount.
                 * @member {string} amount
                 * @memberof cosmos.base.v1beta1.Coin
                 * @instance
                 */
                Coin.prototype.amount = "";

                /**
                 * Creates a new Coin instance using the specified properties.
                 * @function create
                 * @memberof cosmos.base.v1beta1.Coin
                 * @static
                 * @param {cosmos.base.v1beta1.ICoin=} [properties] Properties to set
                 * @returns {cosmos.base.v1beta1.Coin} Coin instance
                 */
                Coin.create = function create(properties) {
                    return new Coin(properties);
                };

                /**
                 * Encodes the specified Coin message. Does not implicitly {@link cosmos.base.v1beta1.Coin.verify|verify} messages.
                 * @function encode
                 * @memberof cosmos.base.v1beta1.Coin
                 * @static
                 * @param {cosmos.base.v1beta1.ICoin} message Coin message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Coin.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.denom != null && Object.hasOwnProperty.call(message, "denom"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.denom);
                    if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.amount);
                    return writer;
                };

                /**
                 * Encodes the specified Coin message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.Coin.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof cosmos.base.v1beta1.Coin
                 * @static
                 * @param {cosmos.base.v1beta1.ICoin} message Coin message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Coin.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Coin message from the specified reader or buffer.
                 * @function decode
                 * @memberof cosmos.base.v1beta1.Coin
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {cosmos.base.v1beta1.Coin} Coin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Coin.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cosmos.base.v1beta1.Coin();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.denom = reader.string();
                            break;
                        case 2:
                            message.amount = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Coin message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof cosmos.base.v1beta1.Coin
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {cosmos.base.v1beta1.Coin} Coin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Coin.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Coin message.
                 * @function verify
                 * @memberof cosmos.base.v1beta1.Coin
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Coin.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.denom != null && message.hasOwnProperty("denom"))
                        if (!$util.isString(message.denom))
                            return "denom: string expected";
                    if (message.amount != null && message.hasOwnProperty("amount"))
                        if (!$util.isString(message.amount))
                            return "amount: string expected";
                    return null;
                };

                /**
                 * Creates a Coin message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof cosmos.base.v1beta1.Coin
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {cosmos.base.v1beta1.Coin} Coin
                 */
                Coin.fromObject = function fromObject(object) {
                    if (object instanceof $root.cosmos.base.v1beta1.Coin)
                        return object;
                    var message = new $root.cosmos.base.v1beta1.Coin();
                    if (object.denom != null)
                        message.denom = String(object.denom);
                    if (object.amount != null)
                        message.amount = String(object.amount);
                    return message;
                };

                /**
                 * Creates a plain object from a Coin message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof cosmos.base.v1beta1.Coin
                 * @static
                 * @param {cosmos.base.v1beta1.Coin} message Coin
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Coin.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.denom = "";
                        object.amount = "";
                    }
                    if (message.denom != null && message.hasOwnProperty("denom"))
                        object.denom = message.denom;
                    if (message.amount != null && message.hasOwnProperty("amount"))
                        object.amount = message.amount;
                    return object;
                };

                /**
                 * Converts this Coin to JSON.
                 * @function toJSON
                 * @memberof cosmos.base.v1beta1.Coin
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Coin.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
                };

                return Coin;
            })();

            v1beta1.DecCoin = (function() {

                /**
                 * Properties of a DecCoin.
                 * @memberof cosmos.base.v1beta1
                 * @interface IDecCoin
                 * @property {string|null} [denom] DecCoin denom
                 * @property {string|null} [amount] DecCoin amount
                 */

                /**
                 * Constructs a new DecCoin.
                 * @memberof cosmos.base.v1beta1
                 * @classdesc Represents a DecCoin.
                 * @implements IDecCoin
                 * @constructor
                 * @param {cosmos.base.v1beta1.IDecCoin=} [properties] Properties to set
                 */
                function DecCoin(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DecCoin denom.
                 * @member {string} denom
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @instance
                 */
                DecCoin.prototype.denom = "";

                /**
                 * DecCoin amount.
                 * @member {string} amount
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @instance
                 */
                DecCoin.prototype.amount = "";

                /**
                 * Creates a new DecCoin instance using the specified properties.
                 * @function create
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @static
                 * @param {cosmos.base.v1beta1.IDecCoin=} [properties] Properties to set
                 * @returns {cosmos.base.v1beta1.DecCoin} DecCoin instance
                 */
                DecCoin.create = function create(properties) {
                    return new DecCoin(properties);
                };

                /**
                 * Encodes the specified DecCoin message. Does not implicitly {@link cosmos.base.v1beta1.DecCoin.verify|verify} messages.
                 * @function encode
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @static
                 * @param {cosmos.base.v1beta1.IDecCoin} message DecCoin message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DecCoin.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.denom != null && Object.hasOwnProperty.call(message, "denom"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.denom);
                    if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.amount);
                    return writer;
                };

                /**
                 * Encodes the specified DecCoin message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.DecCoin.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @static
                 * @param {cosmos.base.v1beta1.IDecCoin} message DecCoin message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DecCoin.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DecCoin message from the specified reader or buffer.
                 * @function decode
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {cosmos.base.v1beta1.DecCoin} DecCoin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DecCoin.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cosmos.base.v1beta1.DecCoin();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.denom = reader.string();
                            break;
                        case 2:
                            message.amount = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DecCoin message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {cosmos.base.v1beta1.DecCoin} DecCoin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DecCoin.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DecCoin message.
                 * @function verify
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DecCoin.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.denom != null && message.hasOwnProperty("denom"))
                        if (!$util.isString(message.denom))
                            return "denom: string expected";
                    if (message.amount != null && message.hasOwnProperty("amount"))
                        if (!$util.isString(message.amount))
                            return "amount: string expected";
                    return null;
                };

                /**
                 * Creates a DecCoin message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {cosmos.base.v1beta1.DecCoin} DecCoin
                 */
                DecCoin.fromObject = function fromObject(object) {
                    if (object instanceof $root.cosmos.base.v1beta1.DecCoin)
                        return object;
                    var message = new $root.cosmos.base.v1beta1.DecCoin();
                    if (object.denom != null)
                        message.denom = String(object.denom);
                    if (object.amount != null)
                        message.amount = String(object.amount);
                    return message;
                };

                /**
                 * Creates a plain object from a DecCoin message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @static
                 * @param {cosmos.base.v1beta1.DecCoin} message DecCoin
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DecCoin.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.denom = "";
                        object.amount = "";
                    }
                    if (message.denom != null && message.hasOwnProperty("denom"))
                        object.denom = message.denom;
                    if (message.amount != null && message.hasOwnProperty("amount"))
                        object.amount = message.amount;
                    return object;
                };

                /**
                 * Converts this DecCoin to JSON.
                 * @function toJSON
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DecCoin.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
                };

                return DecCoin;
            })();

            v1beta1.IntProto = (function() {

                /**
                 * Properties of an IntProto.
                 * @memberof cosmos.base.v1beta1
                 * @interface IIntProto
                 * @property {string|null} [int] IntProto int
                 */

                /**
                 * Constructs a new IntProto.
                 * @memberof cosmos.base.v1beta1
                 * @classdesc Represents an IntProto.
                 * @implements IIntProto
                 * @constructor
                 * @param {cosmos.base.v1beta1.IIntProto=} [properties] Properties to set
                 */
                function IntProto(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * IntProto int.
                 * @member {string} int
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @instance
                 */
                IntProto.prototype.int = "";

                /**
                 * Creates a new IntProto instance using the specified properties.
                 * @function create
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @static
                 * @param {cosmos.base.v1beta1.IIntProto=} [properties] Properties to set
                 * @returns {cosmos.base.v1beta1.IntProto} IntProto instance
                 */
                IntProto.create = function create(properties) {
                    return new IntProto(properties);
                };

                /**
                 * Encodes the specified IntProto message. Does not implicitly {@link cosmos.base.v1beta1.IntProto.verify|verify} messages.
                 * @function encode
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @static
                 * @param {cosmos.base.v1beta1.IIntProto} message IntProto message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                IntProto.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.int != null && Object.hasOwnProperty.call(message, "int"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.int);
                    return writer;
                };

                /**
                 * Encodes the specified IntProto message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.IntProto.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @static
                 * @param {cosmos.base.v1beta1.IIntProto} message IntProto message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                IntProto.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an IntProto message from the specified reader or buffer.
                 * @function decode
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {cosmos.base.v1beta1.IntProto} IntProto
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                IntProto.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cosmos.base.v1beta1.IntProto();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.int = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an IntProto message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {cosmos.base.v1beta1.IntProto} IntProto
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                IntProto.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an IntProto message.
                 * @function verify
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                IntProto.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.int != null && message.hasOwnProperty("int"))
                        if (!$util.isString(message.int))
                            return "int: string expected";
                    return null;
                };

                /**
                 * Creates an IntProto message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {cosmos.base.v1beta1.IntProto} IntProto
                 */
                IntProto.fromObject = function fromObject(object) {
                    if (object instanceof $root.cosmos.base.v1beta1.IntProto)
                        return object;
                    var message = new $root.cosmos.base.v1beta1.IntProto();
                    if (object.int != null)
                        message.int = String(object.int);
                    return message;
                };

                /**
                 * Creates a plain object from an IntProto message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @static
                 * @param {cosmos.base.v1beta1.IntProto} message IntProto
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                IntProto.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.int = "";
                    if (message.int != null && message.hasOwnProperty("int"))
                        object.int = message.int;
                    return object;
                };

                /**
                 * Converts this IntProto to JSON.
                 * @function toJSON
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                IntProto.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
                };

                return IntProto;
            })();

            v1beta1.DecProto = (function() {

                /**
                 * Properties of a DecProto.
                 * @memberof cosmos.base.v1beta1
                 * @interface IDecProto
                 * @property {string|null} [dec] DecProto dec
                 */

                /**
                 * Constructs a new DecProto.
                 * @memberof cosmos.base.v1beta1
                 * @classdesc Represents a DecProto.
                 * @implements IDecProto
                 * @constructor
                 * @param {cosmos.base.v1beta1.IDecProto=} [properties] Properties to set
                 */
                function DecProto(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DecProto dec.
                 * @member {string} dec
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @instance
                 */
                DecProto.prototype.dec = "";

                /**
                 * Creates a new DecProto instance using the specified properties.
                 * @function create
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @static
                 * @param {cosmos.base.v1beta1.IDecProto=} [properties] Properties to set
                 * @returns {cosmos.base.v1beta1.DecProto} DecProto instance
                 */
                DecProto.create = function create(properties) {
                    return new DecProto(properties);
                };

                /**
                 * Encodes the specified DecProto message. Does not implicitly {@link cosmos.base.v1beta1.DecProto.verify|verify} messages.
                 * @function encode
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @static
                 * @param {cosmos.base.v1beta1.IDecProto} message DecProto message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DecProto.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.dec != null && Object.hasOwnProperty.call(message, "dec"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.dec);
                    return writer;
                };

                /**
                 * Encodes the specified DecProto message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.DecProto.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @static
                 * @param {cosmos.base.v1beta1.IDecProto} message DecProto message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DecProto.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DecProto message from the specified reader or buffer.
                 * @function decode
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {cosmos.base.v1beta1.DecProto} DecProto
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DecProto.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cosmos.base.v1beta1.DecProto();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.dec = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DecProto message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {cosmos.base.v1beta1.DecProto} DecProto
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DecProto.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DecProto message.
                 * @function verify
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DecProto.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.dec != null && message.hasOwnProperty("dec"))
                        if (!$util.isString(message.dec))
                            return "dec: string expected";
                    return null;
                };

                /**
                 * Creates a DecProto message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {cosmos.base.v1beta1.DecProto} DecProto
                 */
                DecProto.fromObject = function fromObject(object) {
                    if (object instanceof $root.cosmos.base.v1beta1.DecProto)
                        return object;
                    var message = new $root.cosmos.base.v1beta1.DecProto();
                    if (object.dec != null)
                        message.dec = String(object.dec);
                    return message;
                };

                /**
                 * Creates a plain object from a DecProto message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @static
                 * @param {cosmos.base.v1beta1.DecProto} message DecProto
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DecProto.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.dec = "";
                    if (message.dec != null && message.hasOwnProperty("dec"))
                        object.dec = message.dec;
                    return object;
                };

                /**
                 * Converts this DecProto to JSON.
                 * @function toJSON
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DecProto.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
                };

                return DecProto;
            })();

            return v1beta1;
        })();

        return base;
    })();

    return cosmos;
})();

var MsgCompiled = $root;

const DECIMAL = 8;
const DEFAULT_GAS_VALUE = '4000000';
const DEPOSIT_GAS_VALUE = '500000000';
const MAX_TX_COUNT = 100;
/**
 * Checks whether an asset is `AssetRuneNative`
 *
 * @param {Asset} asset
 * @returns {boolean} `true` or `false`
 */
const isAssetRuneNative = (asset) => xchainUtil.assetToString(asset) === xchainUtil.assetToString(xchainUtil.AssetRuneNative);
const DENOM_RUNE_NATIVE = 'rune';
/**
 * Get denomination from Asset
 *
 * @param {Asset} asset
 * @returns {string} The denomination of the given asset.
 */
const getDenom = (asset) => {
    if (isAssetRuneNative(asset))
        return DENOM_RUNE_NATIVE;
    if (xchainUtil.isSynthAsset(asset))
        return xchainUtil.assetToString(asset).toLowerCase();
    return asset.symbol.toLowerCase();
};
/**
 * Get Asset from denomination
 *
 * @param {string} denom
 * @returns {Asset|null} The asset of the given denomination.
 */
const assetFromDenom = (denom) => {
    if (denom === DENOM_RUNE_NATIVE)
        return xchainUtil.AssetRuneNative;
    return xchainUtil.assetFromString(denom.toUpperCase());
};
/**
 * Response guard for transaction broadcast
 *
 * @param {any} response The response from the node.
 * @returns {boolean} `true` or `false`.
 */
const isBroadcastSuccess = (response) => typeof response === 'object' &&
    response !== null &&
    'logs' in response &&
    response.logs !== undefined;
/**
 * Get address prefix based on the network.
 *
 * @param {Network} network
 * @returns {string} The address prefix based on the network.
 *
 **/
const getPrefix = (network) => {
    switch (network) {
        case xchainClient.Network.Mainnet:
            return 'thor';
        case xchainClient.Network.Stagenet:
            return 'sthor';
        case xchainClient.Network.Testnet:
            return 'tthor';
    }
};
/**
 * Register type for encoding `MsgDeposit` messages
 */
const registerDepositCodecs = () => {
    core.cosmosclient.codec.register('/types.MsgDeposit', MsgCompiled.types.MsgDeposit);
};
/**
 * Register type for encoding `MsgSend` messages
 */
const registerSendCodecs = () => {
    core.cosmosclient.codec.register('/types.MsgSend', MsgCompiled.types.MsgSend);
};
/**
 * Parse transaction data from event logs
 *
 * @param {TxLog[]} logs List of tx logs
 * @param {Address} address - Address to get transaction data for
 * @returns {TxData} Parsed transaction data
 */
const getDepositTxDataFromLogs = (logs, address) => {
    var _a;
    const events = (_a = logs[0]) === null || _a === void 0 ? void 0 : _a.events;
    if (!events) {
        throw Error('No events in logs available');
    }
    const transferDataList = events.reduce((acc, { type, attributes }) => {
        if (type === 'transfer') {
            return attributes.reduce((acc2, { key, value }, index) => {
                if (index % 3 === 0)
                    acc2.push({ sender: '', recipient: '', amount: xchainUtil.baseAmount(0, DECIMAL) });
                const newData = acc2[acc2.length - 1];
                if (key === 'sender')
                    newData.sender = value;
                if (key === 'recipient')
                    newData.recipient = value;
                if (key === 'amount')
                    newData.amount = xchainUtil.baseAmount(value.replace(/rune/, ''), DECIMAL);
                return acc2;
            }, acc);
        }
        return acc;
    }, []);
    const txData = transferDataList
        // filter out txs which are not based on given address
        .filter(({ sender, recipient }) => sender === address || recipient === address)
        // transform `TransferData` -> `TxData`
        .reduce((acc, { sender, recipient, amount }) => (Object.assign(Object.assign({}, acc), { from: [...acc.from, { amount, from: sender }], to: [...acc.to, { amount, to: recipient }] })), { from: [], to: [], type: xchainClient.TxType.Transfer });
    return txData;
};
/**
 * Get the default fee.
 *
 * @returns {Fees} The default fee.
 */
const getDefaultFees = () => {
    const fee = xchainUtil.assetToBase(xchainUtil.assetAmount(0.02 /* 0.02 RUNE */, DECIMAL));
    return xchainClient.singleFee(xchainClient.FeeType.FlatFee, fee);
};
/**
 * Get transaction type.
 *
 * @param {string} txData the transaction input data
 * @param {string} encoding `base64` or `hex`
 * @returns {string} the transaction type.
 */
const getTxType = (txData, encoding) => {
    return Buffer.from(txData, encoding).toString().slice(4);
};
/**
 * Helper to get THORChain's chain id
 * @param {string} nodeUrl THORNode url
 */
const getChainId = (nodeUrl) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { data } = yield axios__default['default'].get(`${nodeUrl}/cosmos/base/tendermint/v1beta1/node_info`);
    return ((_a = data === null || data === void 0 ? void 0 : data.default_node_info) === null || _a === void 0 ? void 0 : _a.network) || Promise.reject('Could not parse chain id');
});
/**
 * Helper to get all THORChain's chain id
 * @param {ClientUrl} client urls (use `getDefaultClientUrl()` if you don't need to use custom urls)
 */
const getChainIds = (client) => __awaiter(void 0, void 0, void 0, function* () {
    return Promise.all([
        getChainId(client[xchainClient.Network.Testnet].node),
        getChainId(client[xchainClient.Network.Stagenet].node),
        getChainId(client[xchainClient.Network.Mainnet].node),
    ]).then(([testnetId, stagenetId, mainnetId]) => ({
        testnet: testnetId,
        stagenet: stagenetId,
        mainnet: mainnetId,
    }));
});
/**
 * Builds final unsigned TX
 *
 * @param cosmosSdk - CosmosSDK
 * @param txBody - txBody with encoded Msgs
 * @param signerPubkey - signerPubkey string
 * @param sequence - account sequence
 * @param gasLimit - transaction gas limit
 * @returns
 */
const buildUnsignedTx = ({ cosmosSdk, txBody, signerPubkey, sequence, gasLimit, }) => {
    const authInfo = new core.proto.cosmos.tx.v1beta1.AuthInfo({
        signer_infos: [
            {
                public_key: signerPubkey,
                mode_info: {
                    single: {
                        mode: core.proto.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT,
                    },
                },
                sequence: sequence,
            },
        ],
        fee: {
            amount: null,
            gas_limit: core.cosmosclient.Long.fromString(gasLimit),
        },
    });
    return new core.cosmosclient.TxBuilder(cosmosSdk, txBody, authInfo);
};
/**
 * Structure a MsgDeposit
 *
 * @param {MsgNativeTx} msgNativeTx Msg of type `MsgNativeTx`.
 * @param {string} nodeUrl Node url
 * @param {chainId} ChainId Chain id of the network
 *
 * @returns {Tx} The transaction details of the given transaction id.
 *
 * @throws {"Invalid client url"} Thrown if the client url is an invalid one.
 */
const buildDepositTx = ({ msgNativeTx, nodeUrl, chainId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const networkChainId = yield getChainId(nodeUrl);
    if (!networkChainId || chainId !== networkChainId) {
        throw new Error(`Invalid network (asked: ${chainId} / returned: ${networkChainId}`);
    }
    const signerAddr = msgNativeTx.signer.toString();
    const signerDecoded = bech32Buffer.decode(signerAddr);
    const msgDepositObj = {
        coins: msgNativeTx.coins,
        memo: msgNativeTx.memo,
        signer: signerDecoded.data,
    };
    const depositMsg = MsgCompiled.types.MsgDeposit.fromObject(msgDepositObj);
    return new core.proto.cosmos.tx.v1beta1.TxBody({
        messages: [core.cosmosclient.codec.packAny(depositMsg)],
        memo: msgNativeTx.memo,
    });
});
/**
 * Structure a MsgSend
 *
 * @param fromAddress - required, from address string
 * @param toAddress - required, to address string
 * @param assetAmount - required, asset amount string (e.g. "10000")
 * @param assetDenom - required, asset denom string (e.g. "rune")
 * @param memo - optional, memo string
 *
 * @returns
 */
const buildTransferTx = ({ fromAddress, toAddress, assetAmount, assetDenom, memo = '', nodeUrl, chainId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const networkChainId = yield getChainId(nodeUrl);
    if (!networkChainId || chainId !== networkChainId) {
        throw new Error(`Invalid network (asked: ${chainId} / returned: ${networkChainId}`);
    }
    const fromDecoded = bech32Buffer.decode(fromAddress);
    const toDecoded = bech32Buffer.decode(toAddress);
    const transferObj = {
        fromAddress: fromDecoded.data,
        toAddress: toDecoded.data,
        amount: [
            {
                amount: assetAmount.amount().toString(),
                denom: assetDenom,
            },
        ],
    };
    const transferMsg = MsgCompiled.types.MsgSend.fromObject(transferObj);
    return new core.proto.cosmos.tx.v1beta1.TxBody({
        messages: [core.cosmosclient.codec.packAny(transferMsg)],
        memo,
    });
});
/**
 * Get the balance of a given address.
 *
 * @param {Address} address By default, it will return the balance of the current wallet. (optional)
 * @param {Asset} asset If not set, it will return all assets available. (optional)
 * @param {cosmosClient} CosmosSDKClient
 *
 * @returns {Balance[]} The balance of the address.
 */
const getBalance = ({ address, assets, cosmosClient, }) => __awaiter(void 0, void 0, void 0, function* () {
    const balances = yield cosmosClient.getBalance(address);
    return balances
        .map((balance) => ({
        asset: (balance.denom && assetFromDenom(balance.denom)) || xchainUtil.AssetRuneNative,
        amount: xchainUtil.baseAmount(balance.amount, DECIMAL),
    }))
        .filter((balance) => !assets || assets.filter((asset) => xchainUtil.assetToString(balance.asset) === xchainUtil.assetToString(asset)).length);
});
/**
 * Get the client url.
 *
 * @returns {ClientUrl} The client url (both mainnet and testnet) for thorchain.
 */
const getDefaultClientUrl = () => {
    return {
        [xchainClient.Network.Testnet]: {
            node: 'https://testnet.thornode.thorchain.info',
            rpc: 'https://testnet-rpc.ninerealms.com',
        },
        [xchainClient.Network.Stagenet]: {
            node: 'https://stagenet-thornode.ninerealms.com',
            rpc: 'https://stagenet-rpc.ninerealms.com',
        },
        [xchainClient.Network.Mainnet]: {
            node: 'https://thornode.ninerealms.com',
            rpc: 'https://rpc.ninerealms.com',
        },
    };
};
const DEFAULT_EXPLORER_URL = 'https://viewblock.io/thorchain';
/**
 * Get default explorer urls.
 *
 * @returns {ExplorerUrls} Default explorer urls (both mainnet and testnet) for thorchain.
 */
const getDefaultExplorerUrls = () => {
    const root = {
        [xchainClient.Network.Testnet]: `${DEFAULT_EXPLORER_URL}?network=testnet`,
        [xchainClient.Network.Stagenet]: `${DEFAULT_EXPLORER_URL}?network=stagenet`,
        [xchainClient.Network.Mainnet]: DEFAULT_EXPLORER_URL,
    };
    const txUrl = `${DEFAULT_EXPLORER_URL}/tx`;
    const tx = {
        [xchainClient.Network.Testnet]: txUrl,
        [xchainClient.Network.Stagenet]: txUrl,
        [xchainClient.Network.Mainnet]: txUrl,
    };
    const addressUrl = `${DEFAULT_EXPLORER_URL}/address`;
    const address = {
        [xchainClient.Network.Testnet]: addressUrl,
        [xchainClient.Network.Stagenet]: addressUrl,
        [xchainClient.Network.Mainnet]: addressUrl,
    };
    return {
        root,
        tx,
        address,
    };
};
/**
 * Get the explorer url.
 *
 * @param {Network} network
 * @param {ExplorerUrls} Explorer urls
 * @returns {string} The explorer url for thorchain based on the given network.
 */
const getExplorerUrl = ({ root }, network) => root[network];
/**
 * Get explorer address url.
 *
 * @param {ExplorerUrls} Explorer urls
 * @param {Network} network
 * @param {Address} address
 * @returns {string} The explorer url for the given address.
 */
const getExplorerAddressUrl = ({ urls, network, address, }) => {
    const url = `${urls.address[network]}/${address}`;
    switch (network) {
        case xchainClient.Network.Mainnet:
            return url;
        case xchainClient.Network.Stagenet:
            return `${url}?network=stagenet`;
        case xchainClient.Network.Testnet:
            return `${url}?network=testnet`;
    }
};
/**
 * Get transaction url.
 *
 * @param {ExplorerUrls} Explorer urls
 * @param {Network} network
 * @param {TxHash} txID
 * @returns {string} The explorer url for the given transaction id.
 */
const getExplorerTxUrl = ({ urls, network, txID, }) => {
    const url = `${urls.tx[network]}/${txID}`;
    switch (network) {
        case xchainClient.Network.Mainnet:
            return url;
        case xchainClient.Network.Stagenet:
            return `${url}?network=stagenet`;
        case xchainClient.Network.Testnet:
            return `${url}?network=testnet`;
    }
};

/**
 * Custom Thorchain Client
 */
class Client extends xchainClient.BaseXChainClient {
    /**
     * Constructor
     *
     * Client has to be initialised with network type and phrase.
     * It will throw an error if an invalid phrase has been passed.
     *
     * @param {XChainClientParams} params
     *
     * @throws {"Invalid phrase"} Thrown if the given phase is invalid.
     */
    constructor({ network = xchainClient.Network.Testnet, phrase, clientUrl, explorerUrls, rootDerivationPaths = {
        [xchainClient.Network.Mainnet]: "44'/931'/0'/0/",
        [xchainClient.Network.Stagenet]: "44'/931'/0'/0/",
        [xchainClient.Network.Testnet]: "44'/931'/0'/0/",
    }, chainIds, }) {
        super(xchainUtil.Chain.Cosmos, { network, rootDerivationPaths, phrase });
        /**
         * Get transaction history of a given address with pagination options.
         * By default it will return the transaction history of the current wallet.
         *
         * @param {TxHistoryParams} params The options to get transaction history. (optional)
         * @returns {TxsPage} The transaction history.
         */
        this.getTransactions = (params) => __awaiter(this, void 0, void 0, function* () {
            const messageAction = undefined;
            const offset = (params === null || params === void 0 ? void 0 : params.offset) || 0;
            const limit = (params === null || params === void 0 ? void 0 : params.limit) || 10;
            const address = (params === null || params === void 0 ? void 0 : params.address) || this.getAddress();
            const txMinHeight = undefined;
            const txMaxHeight = undefined;
            const txIncomingHistory = (yield this.cosmosClient.searchTxFromRPC({
                rpcEndpoint: this.getClientUrl().rpc,
                messageAction,
                transferRecipient: address,
                limit: MAX_TX_COUNT,
                txMinHeight,
                txMaxHeight,
            })).txs;
            const txOutgoingHistory = (yield this.cosmosClient.searchTxFromRPC({
                rpcEndpoint: this.getClientUrl().rpc,
                messageAction,
                transferSender: address,
                limit: MAX_TX_COUNT,
                txMinHeight,
                txMaxHeight,
            })).txs;
            let history = txIncomingHistory
                .concat(txOutgoingHistory)
                .sort((a, b) => {
                if (a.height !== b.height)
                    return parseInt(b.height) > parseInt(a.height) ? 1 : -1;
                if (a.hash !== b.hash)
                    return a.hash > b.hash ? 1 : -1;
                return 0;
            })
                .reduce((acc, tx) => [...acc, ...(acc.length === 0 || acc[acc.length - 1].hash !== tx.hash ? [tx] : [])], [])
                .filter((params === null || params === void 0 ? void 0 : params.filterFn) ? params.filterFn : (tx) => tx)
                .filter((_, index) => index < MAX_TX_COUNT);
            // get `total` before filtering txs out for pagination
            const total = history.length;
            history = history.filter((_, index) => index >= offset && index < offset + limit);
            const txs = yield Promise.all(history.map(({ hash }) => this.getTransactionData(hash, address)));
            return {
                total,
                txs,
            };
        });
        this.clientUrl = clientUrl || getDefaultClientUrl();
        this.explorerUrls = explorerUrls || getDefaultExplorerUrls();
        this.chainIds = chainIds;
        registerSendCodecs();
        registerDepositCodecs();
        this.cosmosClient = new xchainCosmos.CosmosSDKClient({
            server: this.getClientUrl().node,
            chainId: this.getChainId(network),
            prefix: getPrefix(network),
        });
    }
    /**
     * Set/update the current network.
     *
     * @param {Network} network
     * @returns {void}
     *
     * @throws {"Network must be provided"}
     * Thrown if network has not been set before.
     */
    setNetwork(network) {
        super.setNetwork(network);
        this.cosmosClient.updatePrefix(getPrefix(this.network));
    }
    /**
     * Set/update the client URL.
     *
     * @param {ClientUrl} clientUrl The client url to be set.
     * @returns {void}
     */
    setClientUrl(clientUrl) {
        this.clientUrl = clientUrl;
    }
    /**
     * Get the client url.
     *
     * @returns {NodeUrl} The client url for thorchain based on the current network.
     */
    getClientUrl() {
        return this.clientUrl[this.network];
    }
    /**
     * Set/update the explorer URLs.
     *
     * @param {ExplorerUrls} urls The explorer urls to be set.
     * @returns {void}
     */
    setExplorerUrls(urls) {
        this.explorerUrls = urls;
    }
    /**
     * Get the explorer url.
     *
     * @returns {string} The explorer url for thorchain based on the current network.
     */
    getExplorerUrl() {
        return this.explorerUrls.root[this.network];
    }
    /**
     * Sets chain id
     *
     * @param {ChainId} chainId Chain id to update
     * @param {Network} network (optional) Network for given chainId. If `network`not set, current network of the client is used
     *
     * @returns {void}
     */
    setChainId(chainId, network) {
        this.chainIds = Object.assign(Object.assign({}, this.chainIds), { [network || this.network]: chainId });
    }
    /**
     * Gets chain id
     *
     * @param {Network} network (optional) Network to get chain id from. If `network`not set, current network of the client is used
     *
     * @returns {ChainId} Chain id based on the current network.
     */
    getChainId(network) {
        return this.chainIds[network || this.network];
    }
    /**
     * Get cosmos client
     * @returns {CosmosSDKClient} current cosmos client
     */
    getCosmosClient() {
        return this.cosmosClient;
    }
    /**
     * Get the explorer url for the given address.
     *
     * @param {Address} address
     * @returns {string} The explorer url for the given address.
     */
    getExplorerAddressUrl(address) {
        return getExplorerAddressUrl({ urls: this.explorerUrls, network: this.network, address });
    }
    /**
     * Get the explorer url for the given transaction id.
     *
     * @param {string} txID
     * @returns {string} The explorer url for the given transaction id.
     */
    getExplorerTxUrl(txID) {
        return getExplorerTxUrl({ urls: this.explorerUrls, network: this.network, txID });
    }
    /**
     * Get private key
     *
     * @param {number} index the HD wallet index (optional)
     * @returns {PrivKey} The private key generated from the given phrase
     *
     * @throws {"Phrase not set"}
     * Throws an error if phrase has not been set before
     * */
    getPrivateKey(index = 0) {
        return this.cosmosClient.getPrivKeyFromMnemonic(this.phrase, this.getFullDerivationPath(index));
    }
    /**
     * Get public key
     *
     * @param {number} index the HD wallet index (optional)
     *
     * @returns {PubKey} The public key generated from the given phrase
     *
     * @throws {"Phrase not set"}
     * Throws an error if phrase has not been set before
     **/
    getPubKey(index = 0) {
        const privKey = this.getPrivateKey(index);
        return privKey.pubKey();
    }
    /**
     * Get the current address.
     *
     * @returns {Address} The current address.
     *
     * @throws {Error} Thrown if phrase has not been set before. A phrase is needed to create a wallet and to derive an address from it.
     */
    getAddress(index = 0) {
        const address = this.cosmosClient.getAddressFromMnemonic(this.phrase, this.getFullDerivationPath(index));
        if (!address) {
            throw new Error('address not defined');
        }
        return address;
    }
    /**
     * Validate the given address.
     *
     * @param {Address} address
     * @returns {boolean} `true` or `false`
     */
    validateAddress(address) {
        return this.cosmosClient.checkAddress(address);
    }
    /**
     * Get the balance of a given address.
     *
     * @param {Address} address By default, it will return the balance of the current wallet. (optional)
     * @param {Asset} asset If not set, it will return all assets available. (optional)
     * @returns {Balance[]} The balance of the address.
     */
    getBalance(address, assets) {
        return __awaiter(this, void 0, void 0, function* () {
            return getBalance({ address, assets, cosmosClient: this.getCosmosClient() });
        });
    }
    /**
     * Get the transaction details of a given transaction id.
     *
     * @param {string} txId The transaction id.
     * @returns {Tx} The transaction details of the given transaction id.
     */
    getTransactionData(txId, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const txResult = yield this.cosmosClient.txsHashGet(txId);
            const txData = txResult && txResult.logs ? getDepositTxDataFromLogs(txResult.logs, address) : null;
            if (!txResult || !txData)
                throw new Error(`Failed to get transaction data (tx-hash: ${txId})`);
            const { from, to, type } = txData;
            return {
                hash: txId,
                asset: xchainUtil.AssetRuneNative,
                from,
                to,
                date: new Date(txResult.timestamp),
                type,
            };
        });
    }
    /**
     * Get the transaction details of a given transaction id. (from /thorchain/txs/hash)
     *
     * Node: /thorchain/txs/hash response doesn't have timestamp field.
     *
     * @param {string} txId The transaction id.
     * @returns {Tx} The transaction details of the given transaction id.
     */
    getDepositTransaction(txId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield axios__default['default'].get(`${this.getClientUrl().node}/thorchain/tx/${txId}`)).data;
            if (!result || !result.observed_tx)
                throw new Error('transaction not found');
            const from = [];
            const to = [];
            let asset;
            result.observed_tx.tx.coins.forEach((coin) => {
                from.push({
                    from: result.observed_tx.tx.from_address,
                    amount: xchainUtil.baseAmount(coin.amount, DECIMAL),
                });
                to.push({
                    to: result.observed_tx.tx.to_address,
                    amount: xchainUtil.baseAmount(coin.amount, DECIMAL),
                });
                asset = xchainUtil.assetFromString(coin.asset);
            });
            return {
                asset: asset || xchainUtil.AssetRuneNative,
                from,
                to,
                type: xchainClient.TxType.Transfer,
                hash: txId,
            };
        });
    }
    /**
     * Transaction with MsgNativeTx.
     *
     * @param {DepositParam} params The transaction options.
     * @returns {TxHash} The transaction hash.
     *
     * @throws {"insufficient funds"} Thrown if the wallet has insufficient funds.
     * @throws {"failed to broadcast transaction"} Thrown if failed to broadcast transaction.
     */
    deposit({ walletIndex = 0, asset = xchainUtil.AssetRuneNative, amount, memo }) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const balances = yield this.getBalance(this.getAddress(walletIndex));
            const runeBalance = (_b = (_a = balances.filter(({ asset }) => isAssetRuneNative(asset))[0]) === null || _a === void 0 ? void 0 : _a.amount) !== null && _b !== void 0 ? _b : xchainUtil.baseAmount(0, DECIMAL);
            const assetBalance = (_d = (_c = balances.filter(({ asset: assetInList }) => xchainUtil.assetToString(assetInList) === xchainUtil.assetToString(asset))[0]) === null || _c === void 0 ? void 0 : _c.amount) !== null && _d !== void 0 ? _d : xchainUtil.baseAmount(0, DECIMAL);
            const { average: fee } = yield this.getFees();
            if (isAssetRuneNative(asset)) {
                // amount + fee < runeBalance
                if (runeBalance.lt(amount.plus(fee))) {
                    throw new Error('insufficient funds');
                }
            }
            else {
                // amount < assetBalances && runeBalance < fee
                if (assetBalance.lt(amount) || runeBalance.lt(fee)) {
                    throw new Error('insufficient funds');
                }
            }
            const privKey = this.getPrivateKey(walletIndex);
            const signerPubkey = privKey.pubKey();
            const fromAddress = this.getAddress(walletIndex);
            const fromAddressAcc = core.cosmosclient.AccAddress.fromString(fromAddress);
            const depositTxBody = yield buildDepositTx({
                msgNativeTx: {
                    memo: memo,
                    signer: fromAddressAcc,
                    coins: [
                        {
                            asset: asset,
                            amount: amount.amount().toString(),
                        },
                    ],
                },
                nodeUrl: this.getClientUrl().node,
                chainId: this.getChainId(),
            });
            const account = yield this.getCosmosClient().getAccount(fromAddressAcc);
            const txBuilder = buildUnsignedTx({
                cosmosSdk: this.getCosmosClient().sdk,
                txBody: depositTxBody,
                signerPubkey: core.cosmosclient.codec.packAny(signerPubkey),
                gasLimit: DEPOSIT_GAS_VALUE,
                sequence: account.sequence || core.cosmosclient.Long.ZERO,
            });
            return (yield this.getCosmosClient().signAndBroadcast(txBuilder, privKey, account)) || '';
        });
    }
    /**
     * Transfer balances with MsgSend
     *
     * @param {TxParams} params The transfer options.
     * @returns {TxHash} The transaction hash.
     */
    transfer({ walletIndex = 0, asset = xchainUtil.AssetRuneNative, amount, recipient, memo }) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const balances = yield this.getBalance(this.getAddress(walletIndex));
            const runeBalance = (_b = (_a = balances.filter(({ asset }) => isAssetRuneNative(asset))[0]) === null || _a === void 0 ? void 0 : _a.amount) !== null && _b !== void 0 ? _b : xchainUtil.baseAmount(0, DECIMAL);
            const assetBalance = (_d = (_c = balances.filter(({ asset: assetInList }) => xchainUtil.assetToString(assetInList) === xchainUtil.assetToString(asset))[0]) === null || _c === void 0 ? void 0 : _c.amount) !== null && _d !== void 0 ? _d : xchainUtil.baseAmount(0, DECIMAL);
            const fee = (yield this.getFees()).average;
            if (isAssetRuneNative(asset)) {
                // amount + fee < runeBalance
                if (runeBalance.lt(amount.plus(fee))) {
                    throw new Error('insufficient funds');
                }
            }
            else {
                // amount < assetBalances && runeBalance < fee
                if (assetBalance.lt(amount) || runeBalance.lt(fee)) {
                    throw new Error('insufficient funds');
                }
            }
            const privKey = this.getPrivateKey(walletIndex);
            const from = this.getAddress(walletIndex);
            const signerPubkey = privKey.pubKey();
            const accAddress = core.cosmosclient.AccAddress.fromString(from);
            const denom = getDenom(asset);
            const txBody = yield buildTransferTx({
                fromAddress: from,
                toAddress: recipient,
                memo: memo,
                assetAmount: amount,
                assetDenom: denom,
                chainId: this.getChainId(),
                nodeUrl: this.getClientUrl().node,
            });
            const account = yield this.getCosmosClient().getAccount(accAddress);
            const txBuilder = buildUnsignedTx({
                cosmosSdk: this.getCosmosClient().sdk,
                txBody: txBody,
                gasLimit: DEFAULT_GAS_VALUE,
                signerPubkey: core.cosmosclient.codec.packAny(signerPubkey),
                sequence: account.sequence || core.cosmosclient.Long.ZERO,
            });
            return (yield this.cosmosClient.signAndBroadcast(txBuilder, privKey, account)) || '';
        });
    }
    /**
     * Transfer without broadcast balances with MsgSend
     *
     * @param {TxOfflineParams} params The transfer offline options.
     * @returns {string} The signed transaction bytes.
     */
    transferOffline({ walletIndex = 0, asset = xchainUtil.AssetRuneNative, amount, recipient, memo, from_rune_balance, from_asset_balance = xchainUtil.baseAmount(0, DECIMAL), from_account_number = '0', from_sequence = '0', }) {
        return __awaiter(this, void 0, void 0, function* () {
            const fee = (yield this.getFees()).average;
            if (isAssetRuneNative(asset)) {
                // amount + fee < runeBalance
                if (from_rune_balance.lt(amount.plus(fee))) {
                    throw new Error('insufficient funds');
                }
            }
            else {
                // amount < assetBalances && runeBalance < fee
                if (from_asset_balance.lt(amount) || from_rune_balance.lt(fee)) {
                    throw new Error('insufficient funds');
                }
            }
            const txBody = yield buildTransferTx({
                fromAddress: this.getAddress(walletIndex),
                toAddress: recipient,
                memo,
                assetAmount: amount,
                assetDenom: getDenom(asset),
                chainId: this.getChainId(),
                nodeUrl: this.getClientUrl().node,
            });
            const privKey = this.getPrivateKey(walletIndex);
            const txBuilder = buildUnsignedTx({
                cosmosSdk: this.getCosmosClient().sdk,
                txBody: txBody,
                gasLimit: DEFAULT_GAS_VALUE,
                signerPubkey: core.cosmosclient.codec.packAny(privKey.pubKey()),
                sequence: core.cosmosclient.Long.fromString(from_sequence) || core.cosmosclient.Long.ZERO,
            });
            const signDocBytes = txBuilder.signDocBytes(core.cosmosclient.Long.fromString(from_account_number));
            txBuilder.addSignature(privKey.sign(signDocBytes));
            return txBuilder.txBytes();
        });
    }
    /**
     * Gets fees from Node
     *
     * @returns {Fees}
     */
    getFees() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: { int_64_values: { NativeTransactionFee: fee }, }, } = yield axios__default['default'].get(`${this.getClientUrl().node}/thorchain/constants`);
                // validate data
                if (!fee || isNaN(fee) || fee < 0)
                    throw Error(`Invalid fee: ${fee.toString()}`);
                return xchainClient.singleFee(xchainClient.FeeType.FlatFee, xchainUtil.baseAmount(fee));
            }
            catch (_a) {
                return getDefaultFees();
            }
        });
    }
}

class MsgNativeTx {
    constructor(coins, memo, signer) {
        this.coins = coins;
        this.memo = memo;
        this.signer = signer;
    }
}
/**
 * This creates MsgNativeTx from json.
 *
 * @param value
 * @returns {MsgNativeTx}
 */
const msgNativeTxFromJson = (value) => {
    return new MsgNativeTx(value.coins, value.memo, core.cosmosclient.AccAddress.fromString(value.signer));
};

exports.Client = Client;
exports.DECIMAL = DECIMAL;
exports.DEFAULT_GAS_VALUE = DEFAULT_GAS_VALUE;
exports.DEPOSIT_GAS_VALUE = DEPOSIT_GAS_VALUE;
exports.MAX_TX_COUNT = MAX_TX_COUNT;
exports.MsgNativeTx = MsgNativeTx;
exports.assetFromDenom = assetFromDenom;
exports.buildDepositTx = buildDepositTx;
exports.buildTransferTx = buildTransferTx;
exports.buildUnsignedTx = buildUnsignedTx;
exports.getBalance = getBalance;
exports.getChainId = getChainId;
exports.getChainIds = getChainIds;
exports.getDefaultClientUrl = getDefaultClientUrl;
exports.getDefaultExplorerUrls = getDefaultExplorerUrls;
exports.getDefaultFees = getDefaultFees;
exports.getDenom = getDenom;
exports.getDepositTxDataFromLogs = getDepositTxDataFromLogs;
exports.getExplorerAddressUrl = getExplorerAddressUrl;
exports.getExplorerTxUrl = getExplorerTxUrl;
exports.getExplorerUrl = getExplorerUrl;
exports.getPrefix = getPrefix;
exports.getTxType = getTxType;
exports.isAssetRuneNative = isAssetRuneNative;
exports.isBroadcastSuccess = isBroadcastSuccess;
exports.msgNativeTxFromJson = msgNativeTxFromJson;
exports.registerDepositCodecs = registerDepositCodecs;
exports.registerSendCodecs = registerSendCodecs;
