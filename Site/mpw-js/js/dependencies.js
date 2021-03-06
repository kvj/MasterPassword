// If crypto.subtle is not supported, try crypto.webkitSubtle instead.
if (window.crypto && !window.crypto.subtle && window.crypto.webkitSubtle)
    window.crypto.subtle = window.crypto.webkitSubtle;
if ((!window.crypto || !window.crypto.subtle) && window.SubtleCrypto)
    window.crypto = { subtle: window.SubtleCrypto }

// If Web Crypto API is not supported we include a JS crypto library
// https://code.google.com/p/crypto-js/
if (!window.crypto || !window.crypto.subtle) {
    document.write("<script src=https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/hmac-sha256.js><\/script>");
    document.write("<script src=https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/lib-typedarrays-min.js><\/script>");
}

// If Typed Arrays are not supported we include the polyfill
// https://github.com/inexorabletash/polyfill
window.ArrayBuffer || document.write("<script src=js/typedarray-polyfill.js><\/script>");

// If TextEncoder is not supported we include the polyfill
// https://github.com/inexorabletash/text-encoding
window.TextEncoder || document.write("<script src=js/encoding-polyfill.js><\/script>");
	
// If Promise is not supported we include the polyfill
// https://github.com/taylorhakes/promise-polyfill
window.Promise || document.write("<script src=js/promise-polyfill.js><\/script>");

// If setImmediate is not implemented we include the polyfill
window.setImmediate || document.write("<script src=js/setImmediate-polyfill.js><\/script>");

// Test for required ES6 features
// Use an eval call to avoid a hard-fail on ES5 parsers.
var ES6 = false;
var esdir = "es5/";
try {
    // Use ES6 code if the ES6 class, let, destructive assignment and rest arguments are supported.
    eval("class $ES6 { constructor() { let b = true; this.b = b; } } var [ES6, esdir] = ((...args) => args)(new $ES6().b, '')");
} catch (e) {
}

// If ES6 is not supported we must include traceur-runtime.js
ES6 || document.write("<script src=js/mpw-js/traceur-runtime.js><\/script>");

// Include the scrypt implementation
var SCRYPTASM_PATH = (window.location + '').replace(/[^/]*(#[^#]*)?$/, 'js/mpw-js/scrypt-asm.js');
document.write("<script src=js/mpw-js/" + esdir + "scrypt.js?1><\/script>");

// Include the MPW class
document.write("<script src=js/mpw-js/" + esdir + "mpw.js?1><\/script>");
