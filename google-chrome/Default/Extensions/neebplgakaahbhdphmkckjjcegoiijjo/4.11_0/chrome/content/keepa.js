var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.checkStringArgs = function(c, v, l) {
  if (null == c) {
    throw new TypeError("The 'this' value for String.prototype." + l + " must not be null or undefined");
  }
  if (v instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + l + " must not be a regular expression");
  }
  return c + "";
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(c, v, l) {
  c != Array.prototype && c != Object.prototype && (c[v] = l.value);
};
$jscomp.getGlobal = function(c) {
  return "undefined" != typeof window && window === c ? c : "undefined" != typeof global && null != global ? global : c;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(c, v, l, x) {
  if (v) {
    l = $jscomp.global;
    c = c.split(".");
    for (x = 0; x < c.length - 1; x++) {
      var m = c[x];
      m in l || (l[m] = {});
      l = l[m];
    }
    c = c[c.length - 1];
    x = l[c];
    v = v(x);
    v != x && null != v && $jscomp.defineProperty(l, c, {configurable:!0, writable:!0, value:v});
  }
};
$jscomp.polyfill("String.prototype.startsWith", function(c) {
  return c ? c : function(c, l) {
    var v = $jscomp.checkStringArgs(this, c, "startsWith");
    c += "";
    var m = v.length, E = c.length;
    l = Math.max(0, Math.min(l | 0, v.length));
    for (var H = 0; H < E && l < m;) {
      if (v[l++] != c[H++]) {
        return !1;
      }
    }
    return H >= E;
  };
}, "es6", "es3");
$jscomp.polyfill("String.prototype.endsWith", function(c) {
  return c ? c : function(c, l) {
    var v = $jscomp.checkStringArgs(this, c, "endsWith");
    c += "";
    void 0 === l && (l = v.length);
    l = Math.max(0, Math.min(l | 0, v.length));
    for (var m = c.length; 0 < m && 0 < l;) {
      if (v[--l] != c[--m]) {
        return !1;
      }
    }
    return 0 >= m;
  };
}, "es6", "es3");
$jscomp.findInternal = function(c, v, l) {
  c instanceof String && (c = String(c));
  for (var x = c.length, m = 0; m < x; m++) {
    var E = c[m];
    if (v.call(l, E, m, c)) {
      return {i:m, v:E};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill("Array.prototype.find", function(c) {
  return c ? c : function(c, l) {
    return $jscomp.findInternal(this, c, l).v;
  };
}, "es6", "es3");
(function() {
  var c = window, v = !1;
  String.prototype.hashCode = function() {
    var a = 0, b;
    if (0 === this.length) {
      return a;
    }
    var e = 0;
    for (b = this.length; e < b; e++) {
      var d = this.charCodeAt(e);
      a = (a << 5) - a + d;
      a |= 0;
    }
    return a;
  };
  var l = "optOut_crawl revealStock s_boxOfferListing s_boxType s_boxHorizontal webGraphType webGraphRange overlayPriceGraph".split(" "), x = window.opera || -1 < navigator.userAgent.indexOf(" OPR/"), m = -1 < navigator.userAgent.toLowerCase().indexOf("firefox"), E = -1 < navigator.userAgent.toLowerCase().indexOf("edge/"), H = /Apple Computer/.test(navigator.vendor) && /Safari/.test(navigator.userAgent), I = !x && !m && !E && !H, O = I ? "keepaChrome" : x ? "keepaOpera" : H ? "keepaSafari" : E ? 
  "keepaEdge" : "keepaFirefox", Z = m ? "Firefox" : H ? "Safari" : I ? "Chrome" : x ? "Opera" : E ? "Edge" : "Unknown", D = null, J = !1;
  try {
    J = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  } catch (a) {
  }
  if (I) {
    try {
      chrome.runtime.sendMessage("hnkcfpcejkafcihlgbojoidoihckciin", {type:"isActive"}, null, function(a) {
        chrome.runtime.lastError || a && a.isActive && (v = !0);
      });
    } catch (a) {
    }
  }
  try {
    chrome.runtime.onUpdateAvailable.addListener(function(a) {
      chrome.runtime.reload();
    });
  } catch (a) {
  }
  var P = {}, Q = 0;
  chrome.runtime.onMessage.addListener(function(a, f, e) {
    if (f.tab && f.tab.url || f.url) {
      switch(a.type) {
        case "restart":
          document.location.reload(!1);
          break;
        case "setCookie":
          chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:a.key, value:a.val, secure:!0, expirationDate:(Date.now() / 1000 | 0) + 31536E3});
          "token" == a.key ? D != a.val && 64 == a.val.length && (D = a.val, b.set("token", D), setTimeout(function() {
            document.location.reload(!1);
          }, 300)) : b.set(a.key, a.val);
          break;
        case "getCookie":
          return chrome.cookies.get({url:"https://keepa.com/extension", name:a.key}, function(a) {
            null == a ? e({value:null}) : e({value:a.value});
          }), !0;
        case "openPage":
          chrome.windows.create({url:a.url, incognito:!0});
          break;
        case "isPro":
          b.stockData ? e({value:b.stockData.pro, stockData:b.stockData}) : e({value:null});
          break;
        case "getStock":
          return b.addStockJob(a, function(d) {
            0 < d.errorCode && a.cachedStock ? e(a.cachedStock) : 5 == d.errorCode || 9 == d.errorCode ? (9 == d.errorCode && (a.getNewId = !0), setTimeout(function() {
              b.addStockJob(a, e);
            }, 1)) : e(d);
          }), !0;
        case "getFilters":
          e({value:y.getFilters()});
          break;
        case "sendData":
          f = a.val;
          if (null != f.ratings) {
            var d = f.ratings;
            if (1000 > Q) {
              if ("f1" == f.key) {
                if (d) {
                  for (var C = d.length; C--;) {
                    var g = d[C];
                    null == g || null == g.asin ? d.splice(C, 1) : (g = f.domainId + g.asin, P[g] ? d.splice(C, 1) : (P[g] = 1, Q++));
                  }
                  0 < d.length && n.sendPlainMessage(f);
                }
              } else {
                n.sendPlainMessage(f);
              }
            } else {
              P = null;
            }
          } else {
            n.sendPlainMessage(f);
          }
          e({});
          break;
        case "optionalPermissionsRequired":
          e({value:(I || m || x) && "undefined" === typeof chrome.webRequest});
          break;
        case "optionalPermissionsDenied":
          b.set("optOut_crawl", "1");
          console.log("optionalPermissionsDenied");
          e({value:!0});
          break;
        case "optionalPermissionsInContent":
          f = a.val;
          "undefined" != typeof f && (f ? (b.set("optOut_crawl", "0"), console.log("granted"), chrome.runtime.reload()) : (b.set("optOut_crawl", "1"), k.reportBug("permission denied"), console.log("denied")));
          e({value:!0});
          break;
        case "optionalPermissions":
          return "undefined" === typeof chrome.webRequest && chrome.permissions.request({permissions:["webRequest", "webRequestBlocking"]}, function(a) {
            chrome.runtime.lastError || (e({value:a}), "undefined" != typeof a && (a ? (b.set("optOut_crawl", "0"), console.log("granted"), chrome.runtime.reload()) : (b.set("optOut_crawl", "1"), k.reportBug("permission denied"), console.log("denied"))));
          }), !0;
        default:
          e({});
      }
    }
  });
  window.onload = function() {
    m ? chrome.storage.local.get(["install", "optOutCookies"], function(a) {
      a.optOutCookies && 3456E5 > Date.now() - a.optOutCookies || (a.install ? k.register() : chrome.tabs.create({url:chrome.runtime.getURL("chrome/content/onboard.html")}));
    }) : k.register();
  };
  try {
    chrome.browserAction.onClicked.addListener(function(a) {
      b.isGuest ? chrome.tabs.create({url:b.actionUrl}) : chrome.tabs.create({url:"https://keepa.com/#!manage"});
    });
  } catch (a) {
    console.log(a);
  }
  var b = {storage:chrome.storage.local, contextMenu:function() {
    try {
      chrome.contextMenus.removeAll(), chrome.contextMenus.create({title:"View products on Keepa", contexts:["page"], id:"keepaContext", documentUrlPatterns:"*://*.amazon.com/* *://*.amzn.com/* *://*.amazon.co.uk/* *://*.amazon.de/* *://*.amazon.fr/* *://*.amazon.it/* *://*.amazon.ca/* *://*.amazon.com.mx/* *://*.amazon.es/* *://*.amazon.co.jp/* *://*.amazon.in/*".split(" ")}), chrome.contextMenus.onClicked.addListener(function(a, b) {
        chrome.tabs.sendMessage(b.id, {key:"collectASINs"}, {}, function(a) {
          "undefined" != typeof a && chrome.tabs.create({url:"https://keepa.com/#!viewer/" + encodeURIComponent(JSON.stringify(a))});
        });
      });
    } catch (a) {
      console.log(a);
    }
  }, parseCookieHeader:function(a, b) {
    if (0 < b.indexOf("\n")) {
      b = b.split("\n");
      var e = 0;
      a: for (; e < b.length; ++e) {
        var d = b[e].substring(0, b[e].indexOf(";")), C = d.indexOf("=");
        d = [d.substring(0, C), d.substring(C + 1)];
        if (2 == d.length && "-" != d[1]) {
          for (C = 0; C < a.length; ++C) {
            if (a[C][0] == d[0]) {
              a[C][1] = d[1];
              continue a;
            }
          }
          a.push(d);
        }
      }
    } else {
      if (b = b.substring(0, b.indexOf(";")), e = b.indexOf("="), b = [b.substring(0, e), b.substring(e + 1)], 2 == b.length && "-" != b[1]) {
        for (e = 0; e < a.length; ++e) {
          if (a[e][0] == b[0]) {
            a[e][1] = b[1];
            return;
          }
        }
        a.push(b);
      }
    }
  }, log:function(a) {
    k.quiet || console.log(a);
  }, iframeWin:null, operationComplete:!1, counter:0, stockInit:!1, stockRequest:[], initStock:function() {
    if (!b.stockInit && "undefined" != typeof chrome.webRequest) {
      var a = ["xmlhttprequest"], f = "*://www.amazon.com/* *://www.amazon.co.uk/* *://www.amazon.es/* *://www.amazon.nl/* *://www.amazon.com.mx/* *://www.amazon.it/* *://www.amazon.in/* *://www.amazon.de/* *://www.amazon.fr/* *://www.amazon.co.jp/* *://www.amazon.ca/* *://www.amazon.com.br/* *://www.amazon.com.au/* *://www.amazon.com.mx/* *://smile.amazon.com/* *://smile.amazon.co.uk/* *://smile.amazon.es/* *://smile.amazon.nl/* *://smile.amazon.com.mx/* *://smile.amazon.it/* *://smile.amazon.in/* *://smile.amazon.de/* *://smile.amazon.fr/* *://smile.amazon.co.jp/* *://smile.amazon.ca/* *://smile.amazon.com.br/* *://smile.amazon.com.au/* *://smile.amazon.com.mx/*".split(" ");
      try {
        var e = [b.stockData.addCartHeaders, b.stockData.geoHeaders, b.stockData.setAddressHeaders, b.stockData.addressChangeHeaders, b.stockData.productPageHeaders, b.stockData.toasterHeaders];
        chrome.webRequest.onBeforeSendHeaders.addListener(function(a) {
          if (a.initiator) {
            if (a.initiator.startsWith("http")) {
              return;
            }
          } else {
            if (a.originUrl && !a.originUrl.startsWith("moz-extension")) {
              return;
            }
          }
          var d = a.requestHeaders, g = {};
          try {
            for (var u = null, f = 0; f < d.length; ++f) {
              if ("krequestid" == d[f].name) {
                u = d[f].value;
                d.splice(f--, 1);
                break;
              }
            }
            if (u) {
              var c = b.stockRequest[u];
              b.stockRequest[a.requestId] = c;
              setTimeout(function() {
                delete b.stockRequest[a.requestId];
              }, 30000);
              var k = e[c.requestType];
              for (u = 0; u < d.length; ++u) {
                var l = d[u].name.toLowerCase();
                (k[l] || "" === k[l] || k[d[u].name] || "cookie" == l || "content-type" == l || "sec-fetch-dest" == l || "sec-fetch-mode" == l || "sec-fetch-user" == l || "accept" == l || "referer" == l) && d.splice(u--, 1);
              }
              if (0 == c.requestType && 19 > c.stockSession.length) {
                return g.cancel = !0, g;
              }
              var p = b.stockData.isMobile ? "https://" + c.host + "/gp/aw/d/" + c.asin + "/" : c.referer, v;
              for (v in k) {
                var m = k[v];
                if (0 != m.length) {
                  m = m.replace("{COOKIE}", c.stockSession).replace("{REFERER}", p).replace("{ORIGIN}", c.host);
                  if (-1 < m.indexOf("{CSRF}")) {
                    if (c.csrf) {
                      m = m.replace("{CSRF}", c.csrf), c.csrf = null;
                    } else {
                      continue;
                    }
                  }
                  d.push({name:v, value:m});
                }
              }
              for (k = 0; k < d.length; ++k) {
                var n = d[k].name.toLowerCase();
                (b.stockData.stockHeaders[n] || "" === b.stockData.stockHeaders[n] || b.stockData.stockHeaders[d[k].name] || "origin" == n || "pragma" == n || "cache-control" == n || "upgrade-insecure-requests" == n) && d.splice(k--, 1);
              }
              for (var y in b.stockData.stockHeaders) {
                var x = b.stockData.stockHeaders[y];
                0 != x.length && (x = x.replace("{COOKIE}", c.stockSession).replace("{REFERER}", p).replace("{ORIGIN}", c.host).replace("{LANG}", b.stockData.languageCode[c.domainId]), d.push({name:y, value:x}));
              }
              g.requestHeaders = d;
              a.requestHeaders = d;
            } else {
              return g;
            }
          } catch (K) {
            g.cancel = !0;
          }
          return g;
        }, {urls:f, types:a}, I ? ["blocking", "requestHeaders", "extraHeaders"] : ["blocking", "requestHeaders"]);
        chrome.webRequest.onHeadersReceived.addListener(function(a) {
          if (a.initiator) {
            if (a.initiator.startsWith("http")) {
              return;
            }
          } else {
            if (a.originUrl && !a.originUrl.startsWith("moz-extension")) {
              return;
            }
          }
          var d = a.responseHeaders, e = {};
          try {
            var f = b.stockRequest[a.requestId];
            if (f) {
              var c = f.cookies || [];
              for (a = 0; a < d.length; ++a) {
                "set-cookie" == d[a].name.toLowerCase() && (b.parseCookieHeader(c, d[a].value), d.splice(a, 1), a--);
              }
              f.cookies = c;
              switch(f.requestType) {
                case 0:
                case 1:
                case 2:
                case 4:
                case 5:
                  e.responseHeaders = d;
                  break;
                case 3:
                  e.cancel = !0, setTimeout(function() {
                    f.cookies = c;
                    b.stockSessions[f.domainId + f.asin] = c;
                    f.callback();
                  }, 10);
              }
              if (0 != f.requestType) {
                d = "";
                for (a = 0; a < f.cookies.length; ++a) {
                  var k = f.cookies[a];
                  d += k[0] + "=" + k[1] + "; ";
                  "session-id" == k[0] && 16 < k[1].length && 65 > k[1].length && k[1] != f.session && (f.sessionIdMismatch = !0);
                }
                f.stockSession = d;
              }
            } else {
              return e;
            }
          } catch (ba) {
            e.cancel = !0;
          }
          return e;
        }, {urls:f, types:a}, I ? ["blocking", "responseHeaders", "extraHeaders"] : ["blocking", "responseHeaders"]);
        b.stockInit = !0;
      } catch (d) {
        k.reportBug(d, d.message + " stock exception: " + typeof chrome.webRequest + " " + ("undefined" != typeof chrome.webRequest ? typeof chrome.webRequest.onBeforeSendHeaders : "~") + " " + ("undefined" != typeof chrome.webRequest ? typeof chrome.webRequest.onHeadersReceived : "#"));
      }
    }
  }, stockData:null, isGuest:!0, actionUrl:"https://keepa.com/#!features", stockJobQueue:[], stockSessions:[], addStockJob:function(a, f) {
    a.gid = k.Guid.newGuid().substr(0, 8);
    a.requestType = -1;
    b.stockRequest[a.gid] = a;
    var e = function(a) {
      b.stockJobQueue.shift();
      f(a);
      0 < b.stockJobQueue.length && b.processStockJob(b.stockJobQueue[0][0], b.stockJobQueue[0][1]);
    };
    b.stockJobQueue.push([a, e]);
    1 == b.stockJobQueue.length && b.processStockJob(a, e);
  }, processStockJob:function(a, f) {
    if (null == b.stockData.stock) {
      console.log("stock retrieval not initialized"), f({error:"stock retrieval not initialized", errorCode:0});
    } else {
      if (0 == b.stockData.stockEnabled[a.domainId]) {
        console.log("stock retrieval not supported for domain"), f({error:"stock retrieval not supported for domain", errorCode:1});
      } else {
        if (!0 === b.stockData.pro || a.force) {
          if (!a.isMAP && a.maxQty && b.stockData.stockMaxQty && a.maxQty < b.stockData.stockMaxQty) {
            f({stock:a.maxQty, limit:!1});
          } else {
            if (null == a.oid) {
              console.log("missing oid", a), f({error:"stock retrieval failed for offer: " + a.asin + " id: " + a.gid + " missing oid.", errorCode:12});
            } else {
              if (a.onlyMaxQty && !a.isMAP) {
                f();
              } else {
                if (b.initStock(), b.stockInit) {
                  if (setTimeout(function() {
                    delete b.stockRequest[a.gid];
                    delete b.stockSessions[a.domainId + a.asin];
                  }, 3E5), a.queue = [function() {
                    for (var d = "", e = !1, g = !1, c = 0, l = 0; l < a.cookies.length; ++l) {
                      var m = a.cookies[l];
                      d += m[0] + "=" + m[1] + "; ";
                      "session-id" == m[0] && 16 < m[1].length && 65 > m[1].length && (e = !0, m[1] != a.session && (g = !0, c = m[1]));
                    }
                    a.cookie = d;
                    e && g ? (a.stockSession = d, d = b.stockData.addCartUrl, e = b.stockData.addCartPOST, a.requestType = 0, k.httpPost("https://" + a.host + d.replaceAll("{SESSION_ID}", c).replaceAll("{OFFER_ID}", a.oid).replaceAll("{ADDCART}", b.stockData.stockAdd[a.domainId]).replaceAll("{ASIN}", a.asin), e.replaceAll("{SESSION_ID}", c).replaceAll("{OFFER_ID}", a.oid).replaceAll("{ADDCART}", b.stockData.stockAdd[a.domainId]).replaceAll("{ASIN}", a.asin), function(d) {
                      var e = decodeURIComponent(a.oid).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), g = d.match(new RegExp(b.stockData.stock)), c = d.match(new RegExp(b.stockData.stockAlt)), C = d.match(new RegExp(b.stockData.stockAlt2.replaceAll("{ESCAPED_OID}", e))), u = d.match(new RegExp(b.stockData.price)), k = d.match(new RegExp(b.stockData.priceSingle.replaceAll("{ESCAPED_OID}", e)));
                      e = (new RegExp(b.stockData.limit)).test(d);
                      null == g && (g = C);
                      if (g && g[1]) {
                        d = parseInt(g[1]), g = -1, c && c[1] && (g = parseInt(c[1])), C && C[1] && (g = parseInt(C[1])), c = -1, k && 1 < k.length ? (k[1].lastIndexOf(".") == k[1].length - 2 && (k[1] += "0"), c = parseInt(k[1].replace(/[\D]/g, ""))) : u && (c = parseInt(u[1].replace(/[\D]/g, "")) / d), u = -1, 0 < g && 100 > g && d > g && (e = !0, u = g), f({stock:Math.max(d, g), orderLimit:u, limit:e, price:c});
                      } else {
                        if ((u = d.match(/automated access|api-services-support@/)) || a.isRetry) {
                          delete b.stockSessions[a.domainId + a.asin], a.cookie = null, a.stockSession = null, a.cookies = null;
                        }
                        u ? (f({error:"Amazon stock retrieval rate limited (bot detection) of offer: " + a.asin + " id: " + a.gid + " offer: " + a.oid, errorCode:5}), console.log("stock retrieval rate limited for offer: ", a.asin + " " + a.oid + " id: " + a.gid, d.length)) : f({error:"Stock retrieval failed for this offer. Try reloading the page after a while. ", errorCode:9});
                      }
                    }, !1, a.gid)) : (k.reportBug(null, "stock session issue: " + e + " " + g + " counter: " + b.counter + " c: " + JSON.stringify(a.cookies) + " " + JSON.stringify(a)), f({error:"stock session issue: " + e + " " + g, errorCode:4}));
                  }], a.getNewId && (b.stockData.geoRetry && delete b.stockSessions[a.domainId + a.asin], a.queue.unshift(function() {
                    a.requestType = 4;
                    k.httpGet("https://" + b.stockData.offerUrl.replace("{ORIGIN}", a.host).replace("{ASIN}", a.asin).replace("{SID}", a.sellerId), function(d) {
                      if (d.match(b.stockData.sellerIdBBVerify.replace("{SID}", a.sellerId))) {
                        for (var e = null, g = 0; g < b.stockData.csrfBB.length; g++) {
                          var c = d.match(new RegExp(b.stockData.csrfBB[g]));
                          if (null != c && c[1]) {
                            e = c[1];
                            break;
                          }
                        }
                        if (e) {
                          a.csrf = e[1];
                          e = null;
                          for (g = 0; g < b.stockData.offerIdBB.length; g++) {
                            if (c = d.match(new RegExp(b.stockData.offerIdBB[g])), null != c && c[1]) {
                              e = c[1];
                              break;
                            }
                          }
                          e && (a.oid = e, a.callback());
                        }
                      } else {
                        f({error:"stock retrieval failed for offer: " + a.asin + " id: " + a.gid + " mismatch oid.", errorCode:10});
                      }
                    }, !1, a.gid);
                  })), a.callback = function() {
                    return a.queue.shift()();
                  }, b.stockSessions[a.domainId + a.asin]) {
                    a.cookies = b.stockSessions[a.domainId + a.asin], a.callback();
                  } else {
                    var e = b.stockData.zipCodes[a.domainId];
                    b.stockData.domainId == a.domainId ? (a.requestType = 3, k.httpPost("https://" + a.host + b.stockData.addressChangeUrl, b.stockData.addressChangePOST.replace("{ZIPCODE}", e), null, !1, a.gid)) : (a.requestType = 1, k.httpGet("https://" + a.host + b.stockData.geoUrl, function(d) {
                      d = d.match(new RegExp(b.stockData.csrfGeo));
                      null != d ? (a.csrf = d[1], a.requestType = 5, k.httpGet("https://" + a.host + b.stockData.toasterUrl.replace("{TIME_MS}", Date.now()), function(d) {
                        a.requestType = 2;
                        k.httpGet("https://" + a.host + b.stockData.setAddressUrl, function(d) {
                          d = d.match(new RegExp(b.stockData.csrfSetAddress));
                          null != d && (a.csrf = d[1]);
                          a.requestType = 3;
                          k.httpPost("https://" + a.host + b.stockData.addressChangeUrl, b.stockData.addressChangePOST.replace("{ZIPCODE}", e), null, !1, a.gid);
                        }, !1, a.gid);
                      }, !1, a.gid)) : f({error:"stock retrieval failed for offer: " + a.asin + " id: " + a.gid + " main.", errorCode:7});
                    }, !1, a.gid));
                  }
                } else {
                  console.log("could not init stock retrieval", b.stockInit, typeof chrome.webRequest), f({error:"could not init stock retrieval", errorCode:"undefined" != typeof chrome.webRequest ? 3 : 33});
                }
              }
            }
          }
        } else {
          console.log("stock retrieval not pro"), f({error:"stock retrieval failed, not subscribed", errorCode:2});
        }
      }
    }
  }, set:function(a, c, e) {
    var d = {};
    d[a] = c;
    b.storage.set(d, e);
  }, remove:function(a, c) {
    b.storage.remove(a, c);
  }, get:function(a, c) {
    "function" != typeof c && (c = function() {
    });
    b.storage.get(a, function(a) {
      c(a);
    });
  }};
  b.contextMenu();
  var k = {quiet:!0, version:chrome.runtime.getManifest().version, browser:1, url:"https://keepa.com", testUrl:"https://test.keepa.com", getDomain:function(a) {
    switch(a) {
      case "com":
        return 1;
      case "co.uk":
        return 2;
      case "de":
        return 3;
      case "fr":
        return 4;
      case "co.jp":
        return 5;
      case "ca":
        return 6;
      case "it":
        return 8;
      case "es":
        return 9;
      case "in":
        return 10;
      case "com.mx":
        return 11;
      case "com.br":
        return 12;
      case "com.au":
        return 13;
      case "nl":
        return 14;
      default:
        return 1;
    }
  }, objectStorage:[], Guid:function() {
    var a = function(b, d, c) {
      return b.length >= d ? b : a(c + b, d, c || " ");
    }, b = function() {
      var a = (new Date).getTime();
      return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/x/g, function(b) {
        var d = (a + 16 * Math.random()) % 16 | 0;
        a = Math.floor(a / 16);
        return ("x" === b ? d : d & 7 | 8).toString(16);
      });
    };
    return {newGuid:function() {
      var e = "undefined" != typeof window.crypto.getRandomValues;
      if ("undefined" != typeof window.crypto && e) {
        e = new window.Uint16Array(16);
        window.crypto.getRandomValues(e);
        var d = "";
        for (g in e) {
          var c = e[g].toString(16);
          c = a(c, 4, "0");
          d += c;
        }
        var g = d;
      } else {
        g = b();
      }
      return g;
    }};
  }(), register:function() {
    chrome.cookies.onChanged.addListener(function(a) {
      a.removed || null == a.cookie || "keepa.com" != a.cookie.domain || "/extension" != a.cookie.path || ("token" == a.cookie.name ? D != a.cookie.value && 64 == a.cookie.value.length && (D = a.cookie.value, b.set("token", D), setTimeout(function() {
        document.location.reload(!1);
      }, 300)) : b.set(a.cookie.name, a.cookie.value));
    });
    var a = !1, c = function(e) {
      for (var d = {}, c = 0; c < e.length; d = {$jscomp$loop$prop$name$70:d.$jscomp$loop$prop$name$70}, c++) {
        d.$jscomp$loop$prop$name$70 = e[c];
        try {
          chrome.cookies.get({url:"https://keepa.com/extension", name:d.$jscomp$loop$prop$name$70}, function(d) {
            return function(c) {
              chrome.runtime.lastError && -1 < chrome.runtime.lastError.message.indexOf("No host permission") ? a || (a = !0, k.reportBug("extensionPermission restricted ### " + chrome.runtime.lastError.message)) : null != c && null != c.value && 0 < c.value.length && b.set(d.$jscomp$loop$prop$name$70, c.value);
            };
          }(d));
        } catch (g) {
          console.log(g);
        }
      }
    };
    c(l);
    chrome.cookies.get({url:"https://keepa.com/extension", name:"token"}, function(a) {
      if (null != a && 64 == a.value.length) {
        D = a.value, b.set("token", D);
      } else {
        var d = (Date.now() / 1000 | 0) + 31536E3;
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"optOut_crawl", value:"0", secure:!0, expirationDate:d});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"revealStock", value:"1", secure:!0, expirationDate:d});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"s_boxType", value:"0", secure:!0, expirationDate:d});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"s_boxOfferListing", value:"1", secure:!0, expirationDate:d});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"s_boxHorizontal", value:"0", secure:!0, expirationDate:d});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"webGraphType", value:"[1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]", secure:!0, expirationDate:d});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"webGraphRange", value:"180", secure:!0, expirationDate:d});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"overlayPriceGraph", value:"0", secure:!0, expirationDate:d});
        c(l);
        b.get("token", function(a) {
          D = (a = a.token) && 64 == a.length ? a : k.Guid.newGuid();
          chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"token", value:D, secure:!0, expirationDate:d});
        });
      }
    });
    try {
      "undefined" != typeof chrome.storage.sync && chrome.storage.sync.clear();
    } catch (e) {
    }
    window.addEventListener("message", function(a) {
      var b = a.data;
      if (b) {
        if ("string" === typeof b) {
          try {
            b = JSON.parse(b);
          } catch (u) {
            return;
          }
        }
        if (b.log) {
          console.log(b.log);
        } else {
          var c = function() {
          };
          if (a.origin != k.url && a.origin != k.testUrl) {
            var e = y.getMessage();
            if (null != e && ("function" == typeof e.onDoneC && (c = e.onDoneC, delete e.onDoneC), "undefined" == typeof e.sent && b.sandbox && a.source == document.getElementById("keepa_data").contentWindow)) {
              if (b.sandbox == e.url) {
                y.setStatTime(40);
                try {
                  a.source.postMessage({key:"data", value:e}, "*");
                } catch (u) {
                  y.abortJob(407), c();
                }
              } else {
                b.isUrlMsg ? (e.wasUrl = b.sandbox, y.abortJob(405)) : (a = y.getOutgoingMessage(e, b.sandbox), n.sendMessage(a)), c();
              }
            }
          }
        }
      }
    });
    m ? b.set("addonVersionFirefox", k.version) : b.set("addonVersionChrome", k.version);
    try {
      chrome.runtime.setUninstallURL("https://dyn.keepa.com/app/stats/?type=uninstall&version=" + O + "." + k.version);
    } catch (e) {
    }
    window.setTimeout(function() {
      n.initWebSocket();
    }, 2000);
  }, log:function(a) {
    b.log(a);
  }, lastBugReport:0, reportBug:function(a, c, e) {
    var d = Error();
    b.get(["token"], function(b) {
      var g = Date.now();
      if (!(12E5 > g - k.lastBugReport || /(dead object)|(Script error)|(setUninstallURL)|(File error: Corrupted)|(operation is insecure)|(\.location is null)/i.test(a))) {
        k.lastBugReport = g;
        g = "";
        var f = k.version;
        c = c || "";
        try {
          if (g = d.stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;"), !/(keepa|content)\.js/.test(g) || g.startsWith("https://www.amazon") || g.startsWith("https://smile.amazon") || g.startsWith("https://sellercentral")) {
            return;
          }
        } catch (U) {
        }
        try {
          g = g.replace(/chrome-extension:\/\/.*?\/content\//g, "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
        } catch (U) {
        }
        if ("object" == typeof a) {
          try {
            a = a instanceof Error ? a.toString() : JSON.stringify(a);
          } catch (U) {
          }
        }
        null == e && (e = {exception:a, additional:c, url:document.location.host, stack:g});
        e.keepaType = O;
        e.version = f;
        setTimeout(function() {
          k.httpPost("https://dyn.keepa.com/service/bugreport/?user=" + b.token + "&type=" + Z + "&version=" + f, JSON.stringify(e), null, !1);
        }, 50);
      }
    });
  }, httpGet:function(a, b, c, d) {
    var e = new XMLHttpRequest;
    b && (e.onreadystatechange = function() {
      4 == e.readyState && b.call(this, e.responseText);
    });
    e.withCredentials = c;
    e.open("GET", a, !0);
    d && e.setRequestHeader("krequestid", d);
    e.send();
  }, httpPost:function(a, b, c, d, k) {
    var e = new XMLHttpRequest;
    c && (e.onreadystatechange = function() {
      4 == e.readyState && c.call(this, e.responseText);
    });
    e.withCredentials = d;
    e.open("POST", a, !0);
    e.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    k && e.setRequestHeader("krequestid", k);
    e.send(b);
  }};
  window.addEventListener("error", function(a, b, c, d, l) {
    a = "object" === typeof a && a.srcElement && a.target ? "[object HTMLScriptElement]" == a.srcElement && "[object HTMLScriptElement]" == a.target ? "Error loading script " + JSON.stringify(a) : JSON.stringify(a) : a.toString();
    var e = "";
    d = d || 0;
    if (l && l.stack) {
      e = l.stack;
      try {
        e = l.stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;");
        if (!/(keepa|content)\.js/.test(e)) {
          return;
        }
        e = e.replace(/chrome-extension:\/\/.*?\/content\//g, "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
      } catch (u) {
      }
    }
    a = {msg:a, url:(b || document.location.toString()) + ":" + parseInt(c || 0) + ":" + parseInt(d || 0), stack:e};
    "ipbakfmnjdenbmoenhicfmoojdojjjem" != chrome.runtime.id && "blfpbjkajgamcehdbehfdioapoiibdmc" != chrome.runtime.id || console.log(a);
    k.reportBug(null, null, a);
    return !1;
  });
  var Y = 0;
  var n = {server:["wss://dyn.keepa.com", "wss://dyn-2.keepa.com"], serverIndex:0, clearTimeout:0, webSocket:null, sendPlainMessage:function(a) {
    J || (a = JSON.stringify(a), n.webSocket.send(pako.deflate(a)));
  }, sendMessage:function(a) {
    if (!J) {
      y.clearIframe();
      var b = pako.deflate(JSON.stringify(a));
      y.clearMessage();
      1 == n.webSocket.readyState && n.webSocket.send(b);
      403 == a.status && y.endSession(Y);
      c.console.clear();
    }
  }, initWebSocket:function() {
    J || b.get(["token", "optOut_crawl"], function(a) {
      var c = a.token, e = a.optOut_crawl;
      if (c && 64 == c.length) {
        var d = function() {
          if (null == n.webSocket || 1 != n.webSocket.readyState) {
            n.serverIndex %= n.server.length;
            if ("undefined" == typeof e || "undefined" == e || null == e || "null" == e) {
              e = "0";
            }
            v && (e = "1");
            "undefined" === typeof chrome.webRequest && (e = "1");
            var a = new WebSocket(n.server[n.serverIndex] + "/apps/cloud/?app=" + O + "&version=" + k.version + "&wr=" + typeof chrome.webRequest + "&optOut=" + e, c);
            a.binaryType = "arraybuffer";
            a.onmessage = function(a) {
              a = a.data;
              var c = null;
              a instanceof ArrayBuffer && (a = pako.inflate(a, {to:"string"}));
              try {
                c = JSON.parse(a);
              } catch (U) {
                k.reportBug(U, a);
                return;
              }
              108 == c.status ? 1 === c.guest ? (b.isGuest = !0, b.actionUrl = c.actionUrl) : b.isGuest = !1 : "" == c.key ? b.stockData.domainId = c.domainId : 108108 == c.timeout ? (c.stockData && (b.stockData = c.stockData, console.log("stock reveal ready")), "undefined" != typeof c.keepaBoxPlaceholder && b.set("keepaBoxPlaceholder", c.keepaBoxPlaceholder), "undefined" != typeof c.keepaBoxPlaceholderBackup && b.set("keepaBoxPlaceholderBackup", c.keepaBoxPlaceholderBackup), "undefined" != typeof c.keepaBoxPlaceholderBackupClass && 
              b.set("keepaBoxPlaceholderBackupClass", c.keepaBoxPlaceholderBackupClass), "undefined" != typeof c.keepaBoxPlaceholderAppend && b.set("keepaBoxPlaceholderAppend", c.keepaBoxPlaceholderAppend), "undefined" != typeof c.keepaBoxPlaceholderBackupAppend && b.set("keepaBoxPlaceholderBackupAppend", c.keepaBoxPlaceholderBackupAppend)) : (c.domainId && (Y = c.domainId), y.clearIframe(), y.onMessage(c));
            };
            a.onclose = function(a) {
              setTimeout(function() {
                d();
              }, 6E5 * Math.random());
            };
            a.onerror = function(b) {
              n.serverIndex++;
              a.close();
            };
            a.onopen = function() {
              y.abortJob(414);
            };
            n.webSocket = a;
          }
        };
        d();
      }
    });
  }};
  var y = function() {
    function a(a) {
      try {
        p.stats.times.push(a), p.stats.times.push(Date.now() - p.stats.start);
      } catch (t) {
      }
    }
    function f(b, c) {
      b.sent = !0;
      a(25);
      var d = b.key, e = b.messageId;
      b = b.stats;
      try {
        var w = z[G]["session-id"];
      } catch (h) {
        w = "";
      }
      d = {key:d, messageId:e, stats:b, sessionId:w, payload:[], status:200};
      for (var t in c) {
        d[t] = c[t];
      }
      return d;
    }
    function e(b) {
      G = p.domainId;
      R = x(z);
      "object" != typeof z[G] && (z[G] = {});
      "undefined" == typeof p.headers.Accept && (p.headers.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*!/!*;q=0.8");
      l(b, !b.isAjax, function(c) {
        a(0);
        var d = {payload:[]};
        if (c.match(I)) {
          d.status = 403;
        } else {
          if (b.contentFilters && 0 < b.contentFilters.length) {
            for (var e in b.contentFilters) {
              var w = c.match(new RegExp(b.contentFilters[e]));
              if (w) {
                d.payload[e] = w[1].replace(/\n/g, "");
              } else {
                d.status = 305;
                d.payload[e] = c;
                break;
              }
            }
          } else {
            d.payload = [c];
          }
        }
        try {
          b.stats.times.push(3), b.stats.times.push(k.lastBugReport);
        } catch (A) {
        }
        "undefined" == typeof b.sent && (d = f(b, d), n.sendMessage(d));
      });
    }
    function d(c) {
      G = p.domainId;
      R = x(z);
      "object" != typeof z[G] && (z[G] = {});
      "undefined" == typeof p.headers.Accept && (p.headers.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*!/!*;q=0.8");
      a(4);
      var d = new URL(c.url), e = null;
      try {
        null != c.scrapeFilters && 0 < c.scrapeFilters.length && c.scrapeFilters[0].lager && chrome.cookies.get({url:d.origin, name:"session-id"}, function(a) {
          null == a ? e = "guest" : null != a.value && 5 < a.value.length && (e = a.value);
        });
      } catch (F) {
      }
      l(c, !c.isAjax, function(t, w) {
        a(6);
        if ("undefined" == typeof c.sent) {
          var A = {};
          try {
            for (var h = t.evaluate("//comment()", t, null, XPathResult.ANY_TYPE, null), g = h.iterateNext(), l = ""; g;) {
              l += g.textContent, g = h.iterateNext();
            }
            if (t.querySelector("body").textContent.match(I) || l.match(I)) {
              A.status = 403;
              if ("undefined" != typeof c.sent) {
                return;
              }
              A = f(c, A);
              n.sendMessage(A);
              return;
            }
          } catch (W) {
          }
          a(7);
          if (c.scrapeFilters && 0 < c.scrapeFilters.length) {
            var p = {}, m = {}, M = {}, q = "", F = null, x = function() {
              if ("" === q) {
                A.payload = [F];
                A.scrapedData = M;
                for (var a in m) {
                  A[a] = m[a];
                }
              } else {
                A.status = 305, A.payload = [F, q, ""];
              }
              try {
                c.stats.times.push(99), c.stats.times.push(k.lastBugReport);
              } catch (da) {
              }
              "undefined" == typeof c.sent && (A = f(c, A), n.sendMessage(A));
            }, y = function(a, c, b) {
              var d = [];
              if (!a.selector) {
                if (!a.regExp) {
                  return q = "invalid selector, sel/regexp", !1;
                }
                d = t.querySelector("html").innerHTML.match(new RegExp(a.regExp));
                if (!d || d.length < a.reGroup) {
                  b = "regexp fail: html - " + a.name + b;
                  if (!1 === a.optional) {
                    return q = b, !1;
                  }
                  F += " // " + b;
                  return !0;
                }
                return d[a.reGroup];
              }
              var e = c.querySelectorAll(a.selector);
              0 == e.length && (e = c.querySelectorAll(a.altSelector));
              if (0 == e.length) {
                if (!0 === a.optional) {
                  return !0;
                }
                q = "selector no match: " + a.name + b;
                return !1;
              }
              if (a.parentSelector && (e = [e[0].parentNode.querySelector(a.parentSelector)], null == e[0])) {
                if (!0 === a.optional) {
                  return !0;
                }
                q = "parent selector no match: " + a.name + b;
                return !1;
              }
              if ("undefined" != typeof a.multiple && null != a.multiple && (!0 === a.multiple && 1 > e.length || !1 === a.multiple && 1 < e.length)) {
                b = "selector multiple mismatch: " + a.name + b + " found: " + e.length;
                if (!1 === a.optional) {
                  return q = b, !1;
                }
                F += " // " + b;
                return !0;
              }
              if (a.isListSelector) {
                return p[a.name] = e, !0;
              }
              if (!a.attribute) {
                return q = "selector attribute undefined?: " + a.name + b, !1;
              }
              for (var w in e) {
                if (e.hasOwnProperty(w)) {
                  c = e[w];
                  if (!c) {
                    break;
                  }
                  if (a.childNode) {
                    a.childNode = Number(a.childNode);
                    c = c.childNodes;
                    if (c.length < a.childNode) {
                      b = "childNodes fail: " + c.length + " - " + a.name + b;
                      if (!1 === a.optional) {
                        return q = b, !1;
                      }
                      F += " // " + b;
                      return !0;
                    }
                    c = c[a.childNode];
                  }
                  c = "text" == a.attribute ? c.textContent : "html" == a.attribute ? c.innerHTML : c.getAttribute(a.attribute);
                  if (!c || 0 == c.length || 0 == c.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, "").length) {
                    b = "selector attribute null: " + a.name + b;
                    if (!1 === a.optional) {
                      return q = b, !1;
                    }
                    F += " // " + b;
                    return !0;
                  }
                  if (a.regExp) {
                    var g = c.match(new RegExp(a.regExp));
                    if (!g || g.length < a.reGroup) {
                      b = "regexp fail: " + c + " - " + a.name + b;
                      if (!1 === a.optional) {
                        return q = b, !1;
                      }
                      F += " // " + b;
                      return !0;
                    }
                    d.push("undefined" == typeof g[a.reGroup] ? g[0] : g[a.reGroup]);
                  } else {
                    d.push(c);
                  }
                  if (!a.multiple) {
                    break;
                  }
                }
              }
              return a.multiple ? d : d[0];
            };
            g = !1;
            h = {};
            for (var u in c.scrapeFilters) {
              h.$jscomp$loop$prop$pageType$75 = u;
              a: {
                if (g) {
                  break;
                }
                h.$jscomp$loop$prop$pageFilter$72 = c.scrapeFilters[h.$jscomp$loop$prop$pageType$75];
                h.$jscomp$loop$prop$pageVersionTest$73 = h.$jscomp$loop$prop$pageFilter$72.pageVersionTest;
                l = t.querySelectorAll(h.$jscomp$loop$prop$pageVersionTest$73.selector);
                0 == l.length && (l = t.querySelectorAll(h.$jscomp$loop$prop$pageVersionTest$73.altSelector));
                if (0 != l.length) {
                  if ("undefined" != typeof h.$jscomp$loop$prop$pageVersionTest$73.multiple && null != h.$jscomp$loop$prop$pageVersionTest$73.multiple) {
                    if (!0 === h.$jscomp$loop$prop$pageVersionTest$73.multiple && 2 > l.length) {
                      break a;
                    }
                    if (!1 === h.$jscomp$loop$prop$pageVersionTest$73.multiple && 1 < l.length) {
                      break a;
                    }
                  }
                  if (h.$jscomp$loop$prop$pageVersionTest$73.attribute) {
                    var C = null;
                    C = "text" == h.$jscomp$loop$prop$pageVersionTest$73.attribute ? "" : l[0].getAttribute(h.$jscomp$loop$prop$pageVersionTest$73.attribute);
                    if (null == C) {
                      break a;
                    }
                  }
                  var z = h.$jscomp$loop$prop$pageType$75;
                  h.$jscomp$loop$prop$revealMAP$92 = h.$jscomp$loop$prop$pageFilter$72.revealMAP;
                  h.$jscomp$loop$prop$revealed$94 = !1;
                  h.$jscomp$loop$prop$afterAjaxFinished$95 = function(w) {
                    return function() {
                      var g = 0, h = [];
                      a(26);
                      var f = {}, k;
                      for (k in w.$jscomp$loop$prop$pageFilter$72) {
                        f.$jscomp$loop$prop$sel$81 = w.$jscomp$loop$prop$pageFilter$72[k];
                        if (!(f.$jscomp$loop$prop$sel$81.name == w.$jscomp$loop$prop$pageVersionTest$73.name || w.$jscomp$loop$prop$revealed$94 && "revealMAP" == f.$jscomp$loop$prop$sel$81.name)) {
                          var l = t;
                          if (f.$jscomp$loop$prop$sel$81.parentList) {
                            var q = [];
                            if ("undefined" != typeof p[f.$jscomp$loop$prop$sel$81.parentList]) {
                              q = p[f.$jscomp$loop$prop$sel$81.parentList];
                            } else {
                              if (!0 === y(w.$jscomp$loop$prop$pageFilter$72[f.$jscomp$loop$prop$sel$81.parentList], l, w.$jscomp$loop$prop$pageType$75)) {
                                q = p[f.$jscomp$loop$prop$sel$81.parentList];
                              } else {
                                break;
                              }
                            }
                            m[f.$jscomp$loop$prop$sel$81.parentList] || (m[f.$jscomp$loop$prop$sel$81.parentList] = []);
                            l = 0;
                            var r = {}, n;
                            for (n in q) {
                              if (q.hasOwnProperty(n)) {
                                if ("lager" == f.$jscomp$loop$prop$sel$81.name) {
                                  l++;
                                  try {
                                    var B = void 0;
                                    r.$jscomp$loop$prop$offerId$78 = void 0;
                                    f.$jscomp$loop$prop$sel$81.selector && (B = q[n].querySelector(f.$jscomp$loop$prop$sel$81.selector));
                                    f.$jscomp$loop$prop$sel$81.altSelector && (r.$jscomp$loop$prop$offerId$78 = q[n].querySelector(f.$jscomp$loop$prop$sel$81.altSelector));
                                    r.$jscomp$loop$prop$offerId$78 && (r.$jscomp$loop$prop$offerId$78 = r.$jscomp$loop$prop$offerId$78.getAttribute(f.$jscomp$loop$prop$sel$81.attribute));
                                    r.$jscomp$loop$prop$maxQty$79 = 999;
                                    if (!r.$jscomp$loop$prop$offerId$78) {
                                      try {
                                        var u = JSON.parse(f.$jscomp$loop$prop$sel$81.regExp);
                                        if (u.sel1) {
                                          try {
                                            var C = JSON.parse(q[n].querySelectorAll(u.sel1)[0].dataset[u.dataSet1]);
                                            r.$jscomp$loop$prop$offerId$78 = C[u.val1];
                                            r.$jscomp$loop$prop$maxQty$79 = C.maxQty;
                                          } catch (S) {
                                          }
                                        }
                                        if (!r.$jscomp$loop$prop$offerId$78 && u.sel2) {
                                          try {
                                            var W = JSON.parse(q[n].querySelectorAll(u.sel2)[0].dataset[u.dataSet2]);
                                            r.$jscomp$loop$prop$offerId$78 = W[u.val2];
                                            r.$jscomp$loop$prop$maxQty$79 = W.maxQty;
                                          } catch (S) {
                                          }
                                        }
                                      } catch (S) {
                                      }
                                    }
                                    if (B && r.$jscomp$loop$prop$offerId$78 && null != e) {
                                      g++;
                                      r.$jscomp$loop$prop$mapIndex$84 = n + "";
                                      r.$jscomp$loop$prop$isMAP$82 = !1;
                                      try {
                                        r.$jscomp$loop$prop$isMAP$82 = m[f.$jscomp$loop$prop$sel$81.parentList][r.$jscomp$loop$prop$mapIndex$84].isMAP || -1 != q[n].textContent.toLowerCase().indexOf("add to cart to see product details");
                                      } catch (S) {
                                      }
                                      r.$jscomp$loop$prop$busy$83 = !0;
                                      r.$jscomp$loop$prop$currentASIN$77 = c.url.match(/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/)[1];
                                      null == r.$jscomp$loop$prop$currentASIN$77 || 9 > r.$jscomp$loop$prop$currentASIN$77.length || setTimeout(function(a, w) {
                                        return function() {
                                          b.addStockJob({type:"getStock", asin:a.$jscomp$loop$prop$currentASIN$77, oid:a.$jscomp$loop$prop$offerId$78, host:d.host, maxQty:a.$jscomp$loop$prop$maxQty$79, onlyMaxQty:9 == w.$jscomp$loop$prop$sel$81.reGroup, isMAP:a.$jscomp$loop$prop$isMAP$82, referer:d.host + "/dp/" + a.$jscomp$loop$prop$currentASIN$77, domainId:c.domainId, force:!0, session:e}, function(c) {
                                            a.$jscomp$loop$prop$busy$83 && (a.$jscomp$loop$prop$busy$83 = !1, "undefined" != typeof c && (m[w.$jscomp$loop$prop$sel$81.parentList][a.$jscomp$loop$prop$mapIndex$84][w.$jscomp$loop$prop$sel$81.name] = c), 0 == --g && x(A));
                                          });
                                          setTimeout(function() {
                                            a.$jscomp$loop$prop$busy$83 && 0 == --g && (a.$jscomp$loop$prop$busy$83 = !1, console.log("timeout " + a.$jscomp$loop$prop$offerId$78), x(A));
                                          }, 4000 + 1000 * g);
                                        };
                                      }(r, f), 1);
                                    }
                                  } catch (S) {
                                  }
                                } else {
                                  if ("revealMAP" == f.$jscomp$loop$prop$sel$81.name) {
                                    if (r.$jscomp$loop$prop$revealMAP$49$85 = f.$jscomp$loop$prop$sel$81, B = void 0, B = r.$jscomp$loop$prop$revealMAP$49$85.selector ? q[n].querySelector(r.$jscomp$loop$prop$revealMAP$49$85.selector) : q[n], null != B && B.textContent.match(new RegExp(r.$jscomp$loop$prop$revealMAP$49$85.regExp))) {
                                      B = c.url.match(/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/)[1];
                                      var z = w.$jscomp$loop$prop$pageFilter$72.sellerId;
                                      "undefined" == typeof z || null == z || null == B || 2 > B.length || (z = q[n].querySelector(f.$jscomp$loop$prop$sel$81.childNode).value, null == z || 20 > z + 0 || (B = r.$jscomp$loop$prop$revealMAP$49$85.altSelector.replace("OFFERID", z).replace("ASINID", B), g++, r.$jscomp$loop$prop$mapIndex$52$86 = n + "", v(B, "GET", null, 3000, function(a) {
                                        return function(c) {
                                          try {
                                            var b = w.$jscomp$loop$prop$pageFilter$72.price;
                                            if (b && b.regExp) {
                                              if (c.match(/no valid offer--/)) {
                                                m[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86] || (m[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86] = {}), m[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86][a.$jscomp$loop$prop$revealMAP$49$85.name] = -1;
                                              } else {
                                                var d = c.match(new RegExp("price info--\x3e(?:.|\\n)*?" + b.regExp + "(?:.|\\n)*?\x3c!--")), e = c.match(/price info--\x3e(?:.|\n)*?(?:<span.*?size-small.*?">)([^]*?<\/span)(?:.|\n)*?\x3c!--/);
                                                if (!d || d.length < b.reGroup) {
                                                  F += " //  priceMAP regexp fail: " + (c + " - " + b.name + w.$jscomp$loop$prop$pageType$75);
                                                } else {
                                                  var t = d[b.reGroup];
                                                  m[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86] || (m[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86] = {});
                                                  m[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86][a.$jscomp$loop$prop$revealMAP$49$85.name] = t;
                                                  null != e && 2 == e.length && (m[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86][a.$jscomp$loop$prop$revealMAP$49$85.name + "Shipping"] = e[1].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                                }
                                              }
                                            }
                                          } catch (ea) {
                                          }
                                          0 == --g && 0 == h.length && x();
                                        };
                                      }(r), function() {
                                        0 == --g && 0 == h.length && x();
                                      })));
                                    }
                                  } else {
                                    B = y(f.$jscomp$loop$prop$sel$81, q[n], w.$jscomp$loop$prop$pageType$75);
                                    if (!1 === B) {
                                      break;
                                    }
                                    if (!0 !== B) {
                                      if (m[f.$jscomp$loop$prop$sel$81.parentList][n] || (m[f.$jscomp$loop$prop$sel$81.parentList][n] = {}), f.$jscomp$loop$prop$sel$81.multiple) {
                                        for (var D in B) {
                                          B.hasOwnProperty(D) && !f.$jscomp$loop$prop$sel$81.keepBR && (B[D] = B[D].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                        }
                                        B = B.join("\u271c\u271c");
                                        m[f.$jscomp$loop$prop$sel$81.parentList][n][f.$jscomp$loop$prop$sel$81.name] = B;
                                      } else {
                                        m[f.$jscomp$loop$prop$sel$81.parentList][n][f.$jscomp$loop$prop$sel$81.name] = f.$jscomp$loop$prop$sel$81.keepBR ? B : B.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ");
                                      }
                                    }
                                  }
                                }
                              }
                              r = {$jscomp$loop$prop$currentASIN$77:r.$jscomp$loop$prop$currentASIN$77, $jscomp$loop$prop$offerId$78:r.$jscomp$loop$prop$offerId$78, $jscomp$loop$prop$maxQty$79:r.$jscomp$loop$prop$maxQty$79, $jscomp$loop$prop$isMAP$82:r.$jscomp$loop$prop$isMAP$82, $jscomp$loop$prop$busy$83:r.$jscomp$loop$prop$busy$83, $jscomp$loop$prop$mapIndex$84:r.$jscomp$loop$prop$mapIndex$84, $jscomp$loop$prop$revealMAP$49$85:r.$jscomp$loop$prop$revealMAP$49$85, $jscomp$loop$prop$mapIndex$52$86:r.$jscomp$loop$prop$mapIndex$52$86};
                            }
                          } else {
                            q = y(f.$jscomp$loop$prop$sel$81, l, w.$jscomp$loop$prop$pageType$75);
                            if (!1 === q) {
                              break;
                            }
                            if (!0 !== q) {
                              if (f.$jscomp$loop$prop$sel$81.multiple) {
                                for (var E in q) {
                                  q.hasOwnProperty(E) && !f.$jscomp$loop$prop$sel$81.keepBR && (q[E] = q[E].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                }
                                q = q.join();
                              } else {
                                f.$jscomp$loop$prop$sel$81.keepBR || (q = q.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                              }
                              M[f.$jscomp$loop$prop$sel$81.name] = q;
                            }
                          }
                        }
                        f = {$jscomp$loop$prop$sel$81:f.$jscomp$loop$prop$sel$81};
                      }
                      try {
                        if (1 == h.length || "500".endsWith("8") && 0 < h.length) {
                          h.shift()();
                        } else {
                          for (f = 0; f < h.length; f++) {
                            setTimeout(function() {
                              0 < h.length && h.shift()();
                            }, 500 * f);
                          }
                        }
                      } catch (S) {
                      }
                      0 == g && 0 == h.length && x();
                    };
                  }(h);
                  if (h.$jscomp$loop$prop$revealMAP$92) {
                    if (g = t.querySelector(h.$jscomp$loop$prop$revealMAP$92.selector), null != g) {
                      h.$jscomp$loop$prop$url$93 = g.getAttribute(h.$jscomp$loop$prop$revealMAP$92.attribute);
                      if (null == h.$jscomp$loop$prop$url$93 || 0 == h.$jscomp$loop$prop$url$93.length) {
                        h.$jscomp$loop$prop$afterAjaxFinished$95();
                        break;
                      }
                      0 != h.$jscomp$loop$prop$url$93.indexOf("http") && (g = document.createElement("a"), g.href = c.url, h.$jscomp$loop$prop$url$93 = g.origin + h.$jscomp$loop$prop$url$93);
                      M[h.$jscomp$loop$prop$revealMAP$92.name] = "1";
                      h.$jscomp$loop$prop$url$93 = h.$jscomp$loop$prop$url$93.replace(/(mapPopover.*?)(false)/, "$1true");
                      h.$jscomp$loop$prop$xhr$90 = new XMLHttpRequest;
                      h.$jscomp$loop$prop$hasTimeout$89 = !1;
                      h.$jscomp$loop$prop$ti$91 = setTimeout(function(a) {
                        return function() {
                          a.$jscomp$loop$prop$hasTimeout$89 = !0;
                          a.$jscomp$loop$prop$afterAjaxFinished$95();
                        };
                      }(h), 4000);
                      h.$jscomp$loop$prop$xhr$90.onreadystatechange = function(a) {
                        return function() {
                          if (!a.$jscomp$loop$prop$hasTimeout$89 && 4 == a.$jscomp$loop$prop$xhr$90.readyState) {
                            clearTimeout(a.$jscomp$loop$prop$ti$91);
                            if (200 == a.$jscomp$loop$prop$xhr$90.status) {
                              var c = a.$jscomp$loop$prop$xhr$90.responseText;
                              if (a.$jscomp$loop$prop$revealMAP$92.regExp) {
                                var b = c.match(new RegExp(a.$jscomp$loop$prop$revealMAP$92.regExp));
                                if (!b || b.length < a.$jscomp$loop$prop$revealMAP$92.reGroup) {
                                  if (b = t.querySelector(a.$jscomp$loop$prop$revealMAP$92.selector)) {
                                    var d = b.cloneNode(!1);
                                    d.innerHTML = c;
                                    b.parentNode.replaceChild(d, b);
                                  }
                                } else {
                                  M[a.$jscomp$loop$prop$revealMAP$92.name] = b[a.$jscomp$loop$prop$revealMAP$92.reGroup], M[a.$jscomp$loop$prop$revealMAP$92.name + "url"] = a.$jscomp$loop$prop$url$93;
                                }
                              }
                            }
                            a.$jscomp$loop$prop$revealed$94 = !0;
                            a.$jscomp$loop$prop$afterAjaxFinished$95();
                          }
                        };
                      }(h);
                      h.$jscomp$loop$prop$xhr$90.onerror = h.$jscomp$loop$prop$afterAjaxFinished$95;
                      h.$jscomp$loop$prop$xhr$90.open("GET", h.$jscomp$loop$prop$url$93, !0);
                      h.$jscomp$loop$prop$xhr$90.send();
                    } else {
                      h.$jscomp$loop$prop$afterAjaxFinished$95();
                    }
                  } else {
                    h.$jscomp$loop$prop$afterAjaxFinished$95();
                  }
                  g = !0;
                }
              }
              h = {$jscomp$loop$prop$pageFilter$72:h.$jscomp$loop$prop$pageFilter$72, $jscomp$loop$prop$pageVersionTest$73:h.$jscomp$loop$prop$pageVersionTest$73, $jscomp$loop$prop$revealed$94:h.$jscomp$loop$prop$revealed$94, $jscomp$loop$prop$pageType$75:h.$jscomp$loop$prop$pageType$75, $jscomp$loop$prop$hasTimeout$89:h.$jscomp$loop$prop$hasTimeout$89, $jscomp$loop$prop$afterAjaxFinished$95:h.$jscomp$loop$prop$afterAjaxFinished$95, $jscomp$loop$prop$xhr$90:h.$jscomp$loop$prop$xhr$90, $jscomp$loop$prop$ti$91:h.$jscomp$loop$prop$ti$91, 
              $jscomp$loop$prop$revealMAP$92:h.$jscomp$loop$prop$revealMAP$92, $jscomp$loop$prop$url$93:h.$jscomp$loop$prop$url$93};
            }
            a(8);
            if (null == z) {
              q += " // no pageVersion matched";
              A.payload = [F, q, c.dbg1 ? w : ""];
              A.status = 308;
              a(10);
              try {
                c.stats.times.push(99), c.stats.times.push(k.lastBugReport);
              } catch (W) {
              }
              "undefined" == typeof c.sent && (A = f(c, A), n.sendMessage(A));
            }
          } else {
            a(9), A.status = 306, "undefined" == typeof c.sent && (A = f(c, A), n.sendMessage(A));
          }
        }
      });
    }
    function l(b, d, e) {
      null == L || V || P();
      K = b;
      var f = b.messageId;
      setTimeout(function() {
        null != K && K.messageId == f && (K = K = null);
      }, b.timeout);
      b.onDoneC = function() {
        K = null;
      };
      d ? (a(11), d = document.getElementById("keepa_data"), d.removeAttribute("srcdoc"), d.src = b.url) : (1 == b.httpMethod && (b.scrapeFilters && 0 < b.scrapeFilters.length && (H = b), O || (O = !0, b.l && 0 < b.l.length && (L = b.l, P()))), v(b.url, Q[b.httpMethod], b.postData, b.timeout, function(d) {
        a(12);
        if ("o0" == b.key) {
          e(d);
        } else {
          var f = document.getElementById("keepa_data_2");
          f.src = "";
          d = d.replace(/src=".*?"/g, 'src=""');
          if (null != b) {
            b.block && (d = d.replace(new RegExp(b.block, "g"), ""));
            a(13);
            var t = !1;
            f.srcdoc = d;
            a(18);
            f.onload = function() {
              a(19);
              t || (f.onload = void 0, t = !0, a(20), setTimeout(function() {
                a(21);
                var b = document.getElementById("keepa_data_2").contentWindow;
                try {
                  e(b.document, d);
                } catch (aa) {
                  k.reportBug(aa), E(410);
                }
              }, 80));
            };
          }
          c.console.clear();
        }
      }));
    }
    function g() {
      try {
        var a = document.getElementById("keepa_data");
        a.src = "";
        a.removeAttribute("srcdoc");
      } catch (M) {
      }
      try {
        var b = document.getElementById("keepa_data_2");
        b.src = "";
        b.removeAttribute("srcdoc");
      } catch (M) {
      }
      K = null;
    }
    function v(b, c, d, e, f) {
      var t = new XMLHttpRequest;
      if (f) {
        var g = !1, w = setTimeout(function() {
          g = !0;
          y.abortJob(413);
        }, e || 15000);
        t.onreadystatechange = function() {
          g || (2 == t.readyState && a(27), 4 == t.readyState && (clearTimeout(w), a(29), 503 != t.status && (0 == t.status || 399 < t.status) ? y.abortJob(415, [t.status]) : 0 == t.responseText.length && c == Q[0] ? y.abortJob(416) : f.call(this, t.responseText)));
        };
        t.onerror = function() {
          y.abortJob(408);
        };
      }
      t.open(c, b, !0);
      null == d ? t.send() : t.send(d);
    }
    function x(a) {
      var b = "", c = "", d;
      for (d in a[G]) {
        var e = a[G][d];
        "-" != e && (b += c + d + "=" + e + ";", c = " ");
      }
      return b;
    }
    function D(a) {
      delete z["" + a];
      localStorage.cache = pako.deflate(JSON.stringify(z), {to:"string"});
    }
    function E(a, b) {
      if (null != p) {
        try {
          if ("undefined" != typeof p.sent) {
            return;
          }
          var d = f(p, {});
          b && (d.payload = b);
          d.status = a;
          n.sendMessage(d);
          g();
        } catch (F) {
          k.reportBug(F, "abort");
        }
      }
      c.console.clear();
    }
    var H = null, p = null, I = /automated access|api-services-support@/, J = [function(a) {
    }, function(a) {
      if (null != p) {
        var b = !0;
        if (a.initiator) {
          if (a.initiator.startsWith("http")) {
            return;
          }
        } else {
          if (a.originUrl && !a.originUrl.startsWith("moz-extension")) {
            return;
          }
        }
        console.log("onBefore ### d.initiator: " + a.initiator + " ----  .documentId: " + a.documentId);
        if (p.url == a.url) {
          N = a.frameId, T = a.tabId, X = a.parentFrameId, b = !1;
        } else {
          if (N == a.parentFrameId || X == a.parentFrameId || N == a.frameId) {
            b = !1;
          }
        }
        if (-2 != N && T == a.tabId) {
          a = a.requestHeaders;
          var c = {};
          if (!a.find(function(a) {
            return "krequestid" === a.name;
          })) {
            "" === p.headers.Cookie && (b = !0);
            (p.timeout + "").endsWith("108") || (p.headers.Cookie = b ? "" : R);
            for (var d in p.headers) {
              b = !1;
              for (var e = 0; e < a.length; ++e) {
                if (a[e].name.toLowerCase() == d.toLowerCase()) {
                  "" == p.headers[d] ? (a.splice(e, 1), e--) : a[e].value = p.headers[d];
                  b = !0;
                  break;
                }
              }
              b || "" == p.headers[d] || a.push({name:m ? d.toLowerCase() : d, value:p.headers[d]});
            }
            c.requestHeaders = a;
            return c;
          }
        }
      }
    }, function(a) {
      var c = a.responseHeaders;
      try {
        if (a.initiator) {
          if (a.initiator.startsWith("http")) {
            return;
          }
        } else {
          if (a.originUrl && !a.originUrl.startsWith("moz-extension")) {
            return;
          }
        }
        console.log("d.url: " + a.url);
        if (T != a.tabId || null == p || c.find(function(a) {
          return "krequestid" === a.name;
        })) {
          return;
        }
        for (var d = (p.timeout + "").endsWith("108"), e = !1, f = [], g = 0; g < c.length; g++) {
          var h = c[g], l = h.name.toLowerCase();
          "set-cookie" == l ? (-1 < h.value.indexOf("xpires") && b.parseCookieHeader(f, h.value), console.log("removing cookie: ", c[g]), d || c.splice(g--, 1)) : "x-frame-options" == l && (c.splice(g, 1), g--);
        }
        for (g = 0; g < f.length; g++) {
          var k = f[g];
          if ("undefined" == typeof z[G][k[0]] || z[G][k[0]] != k[1]) {
            e = !0, z[G][k[0]] = k[1];
          }
        }
        !d && e && p.url == a.url && (localStorage.cache = pako.deflate(JSON.stringify(z), {to:"string"}), R = x(z));
      } catch (ca) {
      }
      return {responseHeaders:c};
    }, function(a) {
      if (null != p && p.url == a.url) {
        var b = 0;
        switch(a.error) {
          case "net::ERR_TUNNEL_CONNECTION_FAILED":
            b = 510;
            break;
          case "net::ERR_INSECURE_RESPONSE":
            b = 511;
            break;
          case "net::ERR_CONNECTION_REFUSED":
            b = 512;
            break;
          case "net::ERR_BAD_SSL_CLIENT_AUTH_CERT":
            b = 513;
            break;
          case "net::ERR_CONNECTION_CLOSED":
            b = 514;
            break;
          case "net::ERR_NAME_NOT_RESOLVED":
            b = 515;
            break;
          case "net::ERR_NAME_RESOLUTION_FAILED":
            b = 516;
            break;
          case "net::ERR_ABORTED":
          case "net::ERR_CONNECTION_ABORTED":
            b = 517;
            break;
          case "net::ERR_CONTENT_DECODING_FAILED":
            b = 518;
            break;
          case "net::ERR_NETWORK_ACCESS_DENIED":
            b = 519;
            break;
          case "net::ERR_NETWORK_CHANGED":
            b = 520;
            break;
          case "net::ERR_INCOMPLETE_CHUNKED_ENCODING":
            b = 521;
            break;
          case "net::ERR_CONNECTION_TIMED_OUT":
          case "net::ERR_TIMED_OUT":
            b = 522;
            break;
          case "net::ERR_CONNECTION_RESET":
            b = 523;
            break;
          case "net::ERR_NETWORK_IO_SUSPENDED":
            b = 524;
            break;
          case "net::ERR_EMPTY_RESPONSE":
            b = 525;
            break;
          case "net::ERR_SSL_PROTOCOL_ERROR":
            b = 526;
            break;
          case "net::ERR_ADDRESS_UNREACHABLE":
            b = 527;
            break;
          case "net::ERR_INTERNET_DISCONNECTED":
            b = 528;
            break;
          case "net::ERR_BLOCKED_BY_ADMINISTRATOR":
            b = 529;
            break;
          case "net::ERR_SSL_VERSION_OR_CIPHER_MISMATCH":
            b = 530;
            break;
          case "net::ERR_CONTENT_LENGTH_MISMATCH":
            b = 531;
            break;
          case "net::ERR_PROXY_CONNECTION_FAILED":
            b = 532;
            break;
          default:
            b = 533;
            return;
        }
        setTimeout(function() {
          y.setStatTime(33);
          y.abortJob(b);
        }, 0);
      }
    }], O = !1, V = !1, L = null, K = null, P = function() {
      V = !0;
      for (var a = 0; a < L.length; a++) {
        var b = L[a], d = window, e = 0;
        try {
          for (; e < b.path.length - 1; e++) {
            d = d[b.path[e]];
          }
          if (b.b) {
            d[b.path[e]](J[b.index], b.a, b.b);
          } else {
            d[b.path[e]](J[b.index], b.a);
          }
        } catch (q) {
          console.log(q);
        }
      }
      c.console.clear();
    }, Q = ["GET", "HEAD", "POST", "PUT", "DELETE"], z = {}, R = "", G = 1;
    try {
      localStorage.cache && (z = JSON.parse(pako.inflate(localStorage.cache, {to:"string"})));
    } catch (w) {
      setTimeout(function() {
        k.reportBug(w, pako.inflate(localStorage.cache, {to:"string"}));
      }, 2000);
    }
    var N = -2, T = -2, X = -2;
    return {onMessage:function(a) {
      "hhhh" == a.key && chrome.webRequest.onBeforeSendHeaders.addListener(function(a) {
        if (null != p) {
          var b = !0;
          if (a.initiator) {
            if (a.initiator.startsWith("http")) {
              return;
            }
          } else {
            if (a.originUrl && !a.originUrl.startsWith("moz-extension")) {
              return;
            }
          }
          p.url == a.url && (N = a.frameId, T = a.tabId, X = a.parentFrameId, b = !1);
          if (-2 != N && N == a.frameId && T == a.tabId && X == a.parentFrameId) {
            a = a.requestHeaders;
            var c = {};
            (p.timeout + "").endsWith("108") || (p.headers.Cookie = b ? "" : R);
            for (var d in p.headers) {
              b = !1;
              for (var e = 0; e < a.length; ++e) {
                if (a[e].name.toLowerCase() == d.toLowerCase()) {
                  "" == p.headers[d] ? a.splice(e, 1) : a[e].value = p.headers[d];
                  b = !0;
                  break;
                }
              }
              b || "" == p.headers[d] || a.push({name:m ? d.toLowerCase() : d, value:p.headers[d]});
            }
            c.requestHeaders = a;
            return c;
          }
        }
      }, {urls:["<all_urls>"]}, ["blocking", "requestHeaders"]);
      switch(a.key) {
        case "o0":
        case "o1":
          p = a, p.stats = {start:Date.now(), times:[]};
      }
      switch(a.key) {
        case "update":
          chrome.runtime.requestUpdateCheck(function(a, b) {
            "update_available" == a && chrome.runtime.reload();
          });
          break;
        case "o0":
          y.clearIframe();
          e(a);
          break;
        case "o1":
          y.clearIframe();
          d(a);
          break;
        case "o2":
          D(a.domainId);
          break;
        case "1":
          document.location.reload(!1);
      }
    }, clearIframe:g, endSession:D, getOutgoingMessage:f, setStatTime:a, getFilters:function() {
      return H;
    }, getMessage:function() {
      return p;
    }, clearMessage:function() {
      p = null;
      if (null != L && V) {
        V = !1;
        for (var a = 0; a < L.length; a++) {
          var b = L[a];
          if (b) {
            try {
              for (var d = window, e = 0; e < b.path.length - 1; e++) {
                d = d[b.path[e]];
              }
              d.removeListener(J[b.index]);
            } catch (q) {
            }
          }
        }
        c.console.clear();
      }
    }, abortJob:E};
  }();
})();

