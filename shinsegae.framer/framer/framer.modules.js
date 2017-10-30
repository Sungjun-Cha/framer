require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"DynamicLoader":[function(require,module,exports){

/*
DynamicLoader Module for FramerJS
https://github.com/LucienLee/framer-DynamicLoader/

Created by Lucien Lee (@luciendeer), Jan. 12th, 2016

DynamicLoader braeks the barriars between 3rd party web development libraries and Framer, which
help you load local, external stylesheets and scripts dynamically.

Add the following line to your project in Framer Studio.
	{DynamicLoader} = require 'DynamicLoader'

[Load one file]
DynamicLoader.add('script.js').then(->
 * when script.js loaded successfully
...
).catch(->
 * when script.js loaded failed
...
)

[Load file in series]
DynamicLoader.series(['one.js', 'two.css', ...]).then( successCallback, failCallback )

[Load file in parallel]
DynamicLoader.series(['one.js', 'two.css', ...]).then( successCallback, failCallback )
 */
exports.DynamicLoader = (function() {
  function DynamicLoader() {}

  DynamicLoader.add = function(url) {
    var promise;
    promise = new Promise(function(resolve, reject) {
      var file, loaded;
      if (url.substr(url.lastIndexOf('.')) === ".js") {
        loaded = Array.prototype.find.call(document.getElementsByTagName('script'), function(element) {
          if (element.getAttribute('src') === url) {
            return element;
          }
        });
        if (loaded !== void 0) {
          return resolve('have loaded');
        }
        file = document.createElement('script');
        file.src = url;
      } else if (url.substr(url.lastIndexOf('.')) === ".css") {
        loaded = Array.prototype.find.call(document.getElementsByTagName('link'), function(element) {
          if (element.getAttribute('rel') === url) {
            return element;
          }
        });
        if (loaded !== void 0) {
          return resolve('have loaded');
        }
        file = document.createElement('link');
        file.rel = "stylesheet";
        file.href = url;
      }
      file.addEventListener('load', function() {
        return resolve(file);
      });
      file.addEventListener('error', function() {
        return reject(file);
      });
      return document.body.appendChild(file);
    });
    return promise;
  };

  DynamicLoader.series = function(urls) {
    if (!Array.isArray(urls) || urls.length === 0) {
      throw "ERROR: NO URL IN ARRAY!";
    }
    return urls.reduce((function(_this) {
      return function(promise, url) {
        return promise.then(function() {
          return _this.add(url);
        });
      };
    })(this), Promise.resolve());
  };

  DynamicLoader.parallel = function(urls) {
    if (!Array.isArray(urls) || urls.length === 0) {
      throw "ERROR: NO URL IN ARRAY!";
    }
    return Promise.all(urls.map((function(_this) {
      return function(url) {
        return _this.add(url);
      };
    })(this)));
  };

  return DynamicLoader;

})();


},{}],"TextLayer":[function(require,module,exports){
var TextLayer, convertTextLayers, convertToTextLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TextLayer = (function(superClass) {
  extend(TextLayer, superClass);

  function TextLayer(options) {
    if (options == null) {
      options = {};
    }
    this.doAutoSize = false;
    this.doAutoSizeHeight = false;
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "hsla(60, 90%, 47%, .4)" : "transparent";
    }
    if (options.color == null) {
      options.color = "red";
    }
    if (options.lineHeight == null) {
      options.lineHeight = 1.25;
    }
    if (options.fontFamily == null) {
      options.fontFamily = "Helvetica";
    }
    if (options.fontSize == null) {
      options.fontSize = 20;
    }
    if (options.text == null) {
      options.text = "Use layer.text to add text";
    }
    TextLayer.__super__.constructor.call(this, options);
    this.style.whiteSpace = "pre-line";
    this.style.outline = "none";
  }

  TextLayer.prototype.setStyle = function(property, value, pxSuffix) {
    if (pxSuffix == null) {
      pxSuffix = false;
    }
    this.style[property] = pxSuffix ? value + "px" : value;
    this.emit("change:" + property, value);
    if (this.doAutoSize) {
      return this.calcSize();
    }
  };

  TextLayer.prototype.calcSize = function() {
    var constraints, size, sizeAffectingStyles;
    sizeAffectingStyles = {
      lineHeight: this.style["line-height"],
      fontSize: this.style["font-size"],
      fontWeight: this.style["font-weight"],
      paddingTop: this.style["padding-top"],
      paddingRight: this.style["padding-right"],
      paddingBottom: this.style["padding-bottom"],
      paddingLeft: this.style["padding-left"],
      textTransform: this.style["text-transform"],
      borderWidth: this.style["border-width"],
      letterSpacing: this.style["letter-spacing"],
      fontFamily: this.style["font-family"],
      fontStyle: this.style["font-style"],
      fontVariant: this.style["font-variant"]
    };
    constraints = {};
    if (this.doAutoSizeHeight) {
      constraints.width = this.width;
    }
    size = Utils.textSize(this.text, sizeAffectingStyles, constraints);
    if (this.style.textAlign === "right") {
      this.width = size.width;
      this.x = this.x - this.width;
    } else {
      this.width = size.width;
    }
    return this.height = size.height;
  };

  TextLayer.define("autoSize", {
    get: function() {
      return this.doAutoSize;
    },
    set: function(value) {
      this.doAutoSize = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("autoSizeHeight", {
    set: function(value) {
      this.doAutoSize = value;
      this.doAutoSizeHeight = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("contentEditable", {
    set: function(boolean) {
      this._element.contentEditable = boolean;
      this.ignoreEvents = !boolean;
      return this.on("input", function() {
        if (this.doAutoSize) {
          return this.calcSize();
        }
      });
    }
  });

  TextLayer.define("text", {
    get: function() {
      return this._element.textContent;
    },
    set: function(value) {
      this._element.textContent = value;
      this.emit("change:text", value);
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("fontFamily", {
    get: function() {
      return this.style.fontFamily;
    },
    set: function(value) {
      return this.setStyle("fontFamily", value);
    }
  });

  TextLayer.define("fontSize", {
    get: function() {
      return this.style.fontSize.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("fontSize", value, true);
    }
  });

  TextLayer.define("lineHeight", {
    get: function() {
      return this.style.lineHeight;
    },
    set: function(value) {
      return this.setStyle("lineHeight", value);
    }
  });

  TextLayer.define("fontWeight", {
    get: function() {
      return this.style.fontWeight;
    },
    set: function(value) {
      return this.setStyle("fontWeight", value);
    }
  });

  TextLayer.define("fontStyle", {
    get: function() {
      return this.style.fontStyle;
    },
    set: function(value) {
      return this.setStyle("fontStyle", value);
    }
  });

  TextLayer.define("fontVariant", {
    get: function() {
      return this.style.fontVariant;
    },
    set: function(value) {
      return this.setStyle("fontVariant", value);
    }
  });

  TextLayer.define("padding", {
    set: function(value) {
      this.setStyle("paddingTop", value, true);
      this.setStyle("paddingRight", value, true);
      this.setStyle("paddingBottom", value, true);
      return this.setStyle("paddingLeft", value, true);
    }
  });

  TextLayer.define("paddingTop", {
    get: function() {
      return this.style.paddingTop.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingTop", value, true);
    }
  });

  TextLayer.define("paddingRight", {
    get: function() {
      return this.style.paddingRight.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingRight", value, true);
    }
  });

  TextLayer.define("paddingBottom", {
    get: function() {
      return this.style.paddingBottom.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingBottom", value, true);
    }
  });

  TextLayer.define("paddingLeft", {
    get: function() {
      return this.style.paddingLeft.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingLeft", value, true);
    }
  });

  TextLayer.define("textAlign", {
    set: function(value) {
      return this.setStyle("textAlign", value);
    }
  });

  TextLayer.define("textTransform", {
    get: function() {
      return this.style.textTransform;
    },
    set: function(value) {
      return this.setStyle("textTransform", value);
    }
  });

  TextLayer.define("letterSpacing", {
    get: function() {
      return this.style.letterSpacing.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("letterSpacing", value, true);
    }
  });

  TextLayer.define("length", {
    get: function() {
      return this.text.length;
    }
  });

  return TextLayer;

})(Layer);

convertToTextLayer = function(layer) {
  var css, cssObj, importPath, t;
  t = new TextLayer({
    name: layer.name,
    frame: layer.frame,
    parent: layer.parent
  });
  cssObj = {};
  css = layer._info.metadata.css;
  css.forEach(function(rule) {
    var arr;
    if (_.contains(rule, '/*')) {
      return;
    }
    arr = rule.split(': ');
    return cssObj[arr[0]] = arr[1].replace(';', '');
  });
  t.style = cssObj;
  importPath = layer.__framerImportedFromPath;
  if (_.contains(importPath, '@2x')) {
    t.fontSize *= 2;
    t.lineHeight = (parseInt(t.lineHeight) * 2) + 'px';
    t.letterSpacing *= 2;
  }
  t.y -= (parseInt(t.lineHeight) - t.fontSize) / 2;
  t.y -= t.fontSize * 0.1;
  t.x -= t.fontSize * 0.08;
  t.width += t.fontSize * 0.5;
  t.text = layer._info.metadata.string;
  layer.destroy();
  return t;
};

Layer.prototype.convertToTextLayer = function() {
  return convertToTextLayer(this);
};

convertTextLayers = function(obj) {
  var layer, prop, results;
  results = [];
  for (prop in obj) {
    layer = obj[prop];
    if (layer._info.kind === "text") {
      results.push(obj[prop] = convertToTextLayer(layer));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

Layer.prototype.frameAsTextLayer = function(properties) {
  var t;
  t = new TextLayer;
  t.frame = this.frame;
  t.superLayer = this.superLayer;
  _.extend(t, properties);
  this.destroy();
  return t;
};

exports.TextLayer = TextLayer;

exports.convertTextLayers = convertTextLayers;


},{}],"myModule":[function(require,module,exports){
var DynamicLoader, TextLayer;

exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];

TextLayer = require("TextLayer");

DynamicLoader = require("DynamicLoader");


},{"DynamicLoader":"DynamicLoader","TextLayer":"TextLayer"}],"npm":[function(require,module,exports){
exports.snowStorm = require("snowstorm");

exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{"snowstorm":"snowstorm"}],"snowstorm":[function(require,module,exports){
/** @license
 * DHTML Snowstorm! JavaScript-based snow for web pages
 * Making it snow on the internets since 2003. You're welcome.
 * -----------------------------------------------------------
 * Version 1.44.20131208 (Previous rev: 1.44.20131125)
 * Copyright (c) 2007, Scott Schiller. All rights reserved.
 * Code provided under the BSD License
 * http://schillmania.com/projects/snowstorm/license.txt
 */

/*jslint nomen: true, plusplus: true, sloppy: true, vars: true, white: true */
/*global window, document, navigator, clearInterval, setInterval */

var snowStorm = (function(window, document) {

  // --- common properties ---

  this.autoStart = true;          // Whether the snow should start automatically or not.
  this.excludeMobile = true;      // Snow is likely to be bad news for mobile phones' CPUs (and batteries.) Enable at your own risk.
  this.flakesMax = 128;           // Limit total amount of snow made (falling + sticking)
  this.flakesMaxActive = 64;      // Limit amount of snow falling at once (less = lower CPU use)
  this.animationInterval = 33;    // Theoretical "miliseconds per frame" measurement. 20 = fast + smooth, but high CPU use. 50 = more conservative, but slower
  this.useGPU = true;             // Enable transform-based hardware acceleration, reduce CPU load.
  this.className = null;          // CSS class name for further customization on snow elements
  this.excludeMobile = true;      // Snow is likely to be bad news for mobile phones' CPUs (and batteries.) By default, be nice.
  this.flakeBottom = null;        // Integer for Y axis snow limit, 0 or null for "full-screen" snow effect
  this.followMouse = true;        // Snow movement can respond to the user's mouse
  this.snowColor = '#fff';        // Don't eat (or use?) yellow snow.
  this.snowCharacter = '&bull;';  // &bull; = bullet, &middot; is square on some systems etc.
  this.snowStick = true;          // Whether or not snow should "stick" at the bottom. When off, will never collect.
  this.targetElement = null;      // element which snow will be appended to (null = document.body) - can be an element ID eg. 'myDiv', or a DOM node reference
  this.useMeltEffect = true;      // When recycling fallen snow (or rarely, when falling), have it "melt" and fade out if browser supports it
  this.useTwinkleEffect = false;  // Allow snow to randomly "flicker" in and out of view while falling
  this.usePositionFixed = false;  // true = snow does not shift vertically when scrolling. May increase CPU load, disabled by default - if enabled, used only where supported
  this.usePixelPosition = false;  // Whether to use pixel values for snow top/left vs. percentages. Auto-enabled if body is position:relative or targetElement is specified.

  // --- less-used bits ---

  this.freezeOnBlur = true;       // Only snow when the window is in focus (foreground.) Saves CPU.
  this.flakeLeftOffset = 0;       // Left margin/gutter space on edge of container (eg. browser window.) Bump up these values if seeing horizontal scrollbars.
  this.flakeRightOffset = 0;      // Right margin/gutter space on edge of container
  this.flakeWidth = 8;            // Max pixel width reserved for snow element
  this.flakeHeight = 8;           // Max pixel height reserved for snow element
  this.vMaxX = 5;                 // Maximum X velocity range for snow
  this.vMaxY = 4;                 // Maximum Y velocity range for snow
  this.zIndex = 0;                // CSS stacking order applied to each snowflake

  // --- "No user-serviceable parts inside" past this point, yadda yadda ---

  var storm = this,
  features,
  // UA sniffing and backCompat rendering mode checks for fixed position, etc.
  isIE = navigator.userAgent.match(/msie/i),
  isIE6 = navigator.userAgent.match(/msie 6/i),
  isMobile = navigator.userAgent.match(/mobile|opera m(ob|in)/i),
  isBackCompatIE = (isIE && document.compatMode === 'BackCompat'),
  noFixed = (isBackCompatIE || isIE6),
  screenX = null, screenX2 = null, screenY = null, scrollY = null, docHeight = null, vRndX = null, vRndY = null,
  windOffset = 1,
  windMultiplier = 2,
  flakeTypes = 6,
  fixedForEverything = false,
  targetElementIsRelative = false,
  opacitySupported = (function(){
    try {
      document.createElement('div').style.opacity = '0.5';
    } catch(e) {
      return false;
    }
    return true;
  }()),
  didInit = false,
  docFrag = document.createDocumentFragment();

  features = (function() {

    var getAnimationFrame;

    /**
     * hat tip: paul irish
     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     * https://gist.github.com/838785
     */

    function timeoutShim(callback) {
      window.setTimeout(callback, 1000/(storm.animationInterval || 20));
    }

    var _animationFrame = (window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        timeoutShim);

    // apply to window, avoid "illegal invocation" errors in Chrome
    getAnimationFrame = _animationFrame ? function() {
      return _animationFrame.apply(window, arguments);
    } : null;

    var testDiv;

    testDiv = document.createElement('div');

    function has(prop) {

      // test for feature support
      var result = testDiv.style[prop];
      return (result !== undefined ? prop : null);

    }

    // note local scope.
    var localFeatures = {

      transform: {
        ie:  has('-ms-transform'),
        moz: has('MozTransform'),
        opera: has('OTransform'),
        webkit: has('webkitTransform'),
        w3: has('transform'),
        prop: null // the normalized property value
      },

      getAnimationFrame: getAnimationFrame

    };

    localFeatures.transform.prop = (
      localFeatures.transform.w3 || 
      localFeatures.transform.moz ||
      localFeatures.transform.webkit ||
      localFeatures.transform.ie ||
      localFeatures.transform.opera
    );

    testDiv = null;

    return localFeatures;

  }());

  this.timer = null;
  this.flakes = [];
  this.disabled = false;
  this.active = false;
  this.meltFrameCount = 20;
  this.meltFrames = [];

  this.setXY = function(o, x, y) {

    if (!o) {
      return false;
    }

    if (storm.usePixelPosition || targetElementIsRelative) {

      o.style.left = (x - storm.flakeWidth) + 'px';
      o.style.top = (y - storm.flakeHeight) + 'px';

    } else if (noFixed) {

      o.style.right = (100-(x/screenX*100)) + '%';
      // avoid creating vertical scrollbars
      o.style.top = (Math.min(y, docHeight-storm.flakeHeight)) + 'px';

    } else {

      if (!storm.flakeBottom) {

        // if not using a fixed bottom coordinate...
        o.style.right = (100-(x/screenX*100)) + '%';
        o.style.bottom = (100-(y/screenY*100)) + '%';

      } else {

        // absolute top.
        o.style.right = (100-(x/screenX*100)) + '%';
        o.style.top = (Math.min(y, docHeight-storm.flakeHeight)) + 'px';

      }

    }

  };

  this.events = (function() {

    var old = (!window.addEventListener && window.attachEvent), slice = Array.prototype.slice,
    evt = {
      add: (old?'attachEvent':'addEventListener'),
      remove: (old?'detachEvent':'removeEventListener')
    };

    function getArgs(oArgs) {
      var args = slice.call(oArgs), len = args.length;
      if (old) {
        args[1] = 'on' + args[1]; // prefix
        if (len > 3) {
          args.pop(); // no capture
        }
      } else if (len === 3) {
        args.push(false);
      }
      return args;
    }

    function apply(args, sType) {
      var element = args.shift(),
          method = [evt[sType]];
      if (old) {
        element[method](args[0], args[1]);
      } else {
        element[method].apply(element, args);
      }
    }

    function addEvent() {
      apply(getArgs(arguments), 'add');
    }

    function removeEvent() {
      apply(getArgs(arguments), 'remove');
    }

    return {
      add: addEvent,
      remove: removeEvent
    };

  }());

  function rnd(n,min) {
    if (isNaN(min)) {
      min = 0;
    }
    return (Math.random()*n)+min;
  }

  function plusMinus(n) {
    return (parseInt(rnd(2),10)===1?n*-1:n);
  }

  this.randomizeWind = function() {
    var i;
    vRndX = plusMinus(rnd(storm.vMaxX,0.2));
    vRndY = rnd(storm.vMaxY,0.2);
    if (this.flakes) {
      for (i=0; i<this.flakes.length; i++) {
        if (this.flakes[i].active) {
          this.flakes[i].setVelocities();
        }
      }
    }
  };

  this.scrollHandler = function() {
    var i;
    // "attach" snowflakes to bottom of window if no absolute bottom value was given
    scrollY = (storm.flakeBottom ? 0 : parseInt(window.scrollY || document.documentElement.scrollTop || (noFixed ? document.body.scrollTop : 0), 10));
    if (isNaN(scrollY)) {
      scrollY = 0; // Netscape 6 scroll fix
    }
    if (!fixedForEverything && !storm.flakeBottom && storm.flakes) {
      for (i=0; i<storm.flakes.length; i++) {
        if (storm.flakes[i].active === 0) {
          storm.flakes[i].stick();
        }
      }
    }
  };

  this.resizeHandler = function() {
    if (window.innerWidth || window.innerHeight) {
      screenX = window.innerWidth - 16 - storm.flakeRightOffset;
      screenY = (storm.flakeBottom || window.innerHeight);
    } else {
      screenX = (document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth) - (!isIE ? 8 : 0) - storm.flakeRightOffset;
      screenY = storm.flakeBottom || document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;
    }
    docHeight = document.body.offsetHeight;
    screenX2 = parseInt(screenX/2,10);
  };

  this.resizeHandlerAlt = function() {
    screenX = storm.targetElement.offsetWidth - storm.flakeRightOffset;
    screenY = storm.flakeBottom || storm.targetElement.offsetHeight;
    screenX2 = parseInt(screenX/2,10);
    docHeight = document.body.offsetHeight;
  };

  this.freeze = function() {
    // pause animation
    if (!storm.disabled) {
      storm.disabled = 1;
    } else {
      return false;
    }
    storm.timer = null;
  };

  this.resume = function() {
    if (storm.disabled) {
       storm.disabled = 0;
    } else {
      return false;
    }
    storm.timerInit();
  };

  this.toggleSnow = function() {
    if (!storm.flakes.length) {
      // first run
      storm.start();
    } else {
      storm.active = !storm.active;
      if (storm.active) {
        storm.show();
        storm.resume();
      } else {
        storm.stop();
        storm.freeze();
      }
    }
  };

  this.stop = function() {
    var i;
    this.freeze();
    for (i=0; i<this.flakes.length; i++) {
      this.flakes[i].o.style.display = 'none';
    }
    storm.events.remove(window,'scroll',storm.scrollHandler);
    storm.events.remove(window,'resize',storm.resizeHandler);
    if (storm.freezeOnBlur) {
      if (isIE) {
        storm.events.remove(document,'focusout',storm.freeze);
        storm.events.remove(document,'focusin',storm.resume);
      } else {
        storm.events.remove(window,'blur',storm.freeze);
        storm.events.remove(window,'focus',storm.resume);
      }
    }
  };

  this.show = function() {
    var i;
    for (i=0; i<this.flakes.length; i++) {
      this.flakes[i].o.style.display = 'block';
    }
  };

  this.SnowFlake = function(type,x,y) {
    var s = this;
    this.type = type;
    this.x = x||parseInt(rnd(screenX-20),10);
    this.y = (!isNaN(y)?y:-rnd(screenY)-12);
    this.vX = null;
    this.vY = null;
    this.vAmpTypes = [1,1.2,1.4,1.6,1.8]; // "amplification" for vX/vY (based on flake size/type)
    this.vAmp = this.vAmpTypes[this.type] || 1;
    this.melting = false;
    this.meltFrameCount = storm.meltFrameCount;
    this.meltFrames = storm.meltFrames;
    this.meltFrame = 0;
    this.twinkleFrame = 0;
    this.active = 1;
    this.fontSize = (10+(this.type/5)*10);
    this.o = document.createElement('div');
    this.o.innerHTML = storm.snowCharacter;
    if (storm.className) {
      this.o.setAttribute('class', storm.className);
    }
    this.o.style.color = storm.snowColor;
    this.o.style.position = (fixedForEverything?'fixed':'absolute');
    if (storm.useGPU && features.transform.prop) {
      // GPU-accelerated snow.
      this.o.style[features.transform.prop] = 'translate3d(0px, 0px, 0px)';
    }
    this.o.style.width = storm.flakeWidth+'px';
    this.o.style.height = storm.flakeHeight+'px';
    this.o.style.fontFamily = 'arial,verdana';
    this.o.style.cursor = 'default';
    this.o.style.overflow = 'hidden';
    this.o.style.fontWeight = 'normal';
    this.o.style.zIndex = storm.zIndex;
    docFrag.appendChild(this.o);

    this.refresh = function() {
      if (isNaN(s.x) || isNaN(s.y)) {
        // safety check
        return false;
      }
      storm.setXY(s.o, s.x, s.y);
    };

    this.stick = function() {
      if (noFixed || (storm.targetElement !== document.documentElement && storm.targetElement !== document.body)) {
        s.o.style.top = (screenY+scrollY-storm.flakeHeight)+'px';
      } else if (storm.flakeBottom) {
        s.o.style.top = storm.flakeBottom+'px';
      } else {
        s.o.style.display = 'none';
        s.o.style.bottom = '0%';
        s.o.style.position = 'fixed';
        s.o.style.display = 'block';
      }
    };

    this.vCheck = function() {
      if (s.vX>=0 && s.vX<0.2) {
        s.vX = 0.2;
      } else if (s.vX<0 && s.vX>-0.2) {
        s.vX = -0.2;
      }
      if (s.vY>=0 && s.vY<0.2) {
        s.vY = 0.2;
      }
    };

    this.move = function() {
      var vX = s.vX*windOffset, yDiff;
      s.x += vX;
      s.y += (s.vY*s.vAmp);
      if (s.x >= screenX || screenX-s.x < storm.flakeWidth) { // X-axis scroll check
        s.x = 0;
      } else if (vX < 0 && s.x-storm.flakeLeftOffset < -storm.flakeWidth) {
        s.x = screenX-storm.flakeWidth-1; // flakeWidth;
      }
      s.refresh();
      yDiff = screenY+scrollY-s.y+storm.flakeHeight;
      if (yDiff<storm.flakeHeight) {
        s.active = 0;
        if (storm.snowStick) {
          s.stick();
        } else {
          s.recycle();
        }
      } else {
        if (storm.useMeltEffect && s.active && s.type < 3 && !s.melting && Math.random()>0.998) {
          // ~1/1000 chance of melting mid-air, with each frame
          s.melting = true;
          s.melt();
          // only incrementally melt one frame
          // s.melting = false;
        }
        if (storm.useTwinkleEffect) {
          if (s.twinkleFrame < 0) {
            if (Math.random() > 0.97) {
              s.twinkleFrame = parseInt(Math.random() * 8, 10);
            }
          } else {
            s.twinkleFrame--;
            if (!opacitySupported) {
              s.o.style.visibility = (s.twinkleFrame && s.twinkleFrame % 2 === 0 ? 'hidden' : 'visible');
            } else {
              s.o.style.opacity = (s.twinkleFrame && s.twinkleFrame % 2 === 0 ? 0 : 1);
            }
          }
        }
      }
    };

    this.animate = function() {
      // main animation loop
      // move, check status, die etc.
      s.move();
    };

    this.setVelocities = function() {
      s.vX = vRndX+rnd(storm.vMaxX*0.12,0.1);
      s.vY = vRndY+rnd(storm.vMaxY*0.12,0.1);
    };

    this.setOpacity = function(o,opacity) {
      if (!opacitySupported) {
        return false;
      }
      o.style.opacity = opacity;
    };

    this.melt = function() {
      if (!storm.useMeltEffect || !s.melting) {
        s.recycle();
      } else {
        if (s.meltFrame < s.meltFrameCount) {
          s.setOpacity(s.o,s.meltFrames[s.meltFrame]);
          s.o.style.fontSize = s.fontSize-(s.fontSize*(s.meltFrame/s.meltFrameCount))+'px';
          s.o.style.lineHeight = storm.flakeHeight+2+(storm.flakeHeight*0.75*(s.meltFrame/s.meltFrameCount))+'px';
          s.meltFrame++;
        } else {
          s.recycle();
        }
      }
    };

    this.recycle = function() {
      s.o.style.display = 'none';
      s.o.style.position = (fixedForEverything?'fixed':'absolute');
      s.o.style.bottom = 'auto';
      s.setVelocities();
      s.vCheck();
      s.meltFrame = 0;
      s.melting = false;
      s.setOpacity(s.o,1);
      s.o.style.padding = '0px';
      s.o.style.margin = '0px';
      s.o.style.fontSize = s.fontSize+'px';
      s.o.style.lineHeight = (storm.flakeHeight+2)+'px';
      s.o.style.textAlign = 'center';
      s.o.style.verticalAlign = 'baseline';
      s.x = parseInt(rnd(screenX-storm.flakeWidth-20),10);
      s.y = parseInt(rnd(screenY)*-1,10)-storm.flakeHeight;
      s.refresh();
      s.o.style.display = 'block';
      s.active = 1;
    };

    this.recycle(); // set up x/y coords etc.
    this.refresh();

  };

  this.snow = function() {
    var active = 0, flake = null, i, j;
    for (i=0, j=storm.flakes.length; i<j; i++) {
      if (storm.flakes[i].active === 1) {
        storm.flakes[i].move();
        active++;
      }
      if (storm.flakes[i].melting) {
        storm.flakes[i].melt();
      }
    }
    if (active<storm.flakesMaxActive) {
      flake = storm.flakes[parseInt(rnd(storm.flakes.length),10)];
      if (flake.active === 0) {
        flake.melting = true;
      }
    }
    if (storm.timer) {
      features.getAnimationFrame(storm.snow);
    }
  };

  this.mouseMove = function(e) {
    if (!storm.followMouse) {
      return true;
    }
    var x = parseInt(e.clientX,10);
    if (x<screenX2) {
      windOffset = -windMultiplier+(x/screenX2*windMultiplier);
    } else {
      x -= screenX2;
      windOffset = (x/screenX2)*windMultiplier;
    }
  };

  this.createSnow = function(limit,allowInactive) {
    var i;
    for (i=0; i<limit; i++) {
      storm.flakes[storm.flakes.length] = new storm.SnowFlake(parseInt(rnd(flakeTypes),10));
      if (allowInactive || i>storm.flakesMaxActive) {
        storm.flakes[storm.flakes.length-1].active = -1;
      }
    }
    storm.targetElement.appendChild(docFrag);
  };

  this.timerInit = function() {
    storm.timer = true;
    storm.snow();
  };

  this.init = function() {
    var i;
    for (i=0; i<storm.meltFrameCount; i++) {
      storm.meltFrames.push(1-(i/storm.meltFrameCount));
    }
    storm.randomizeWind();
    storm.createSnow(storm.flakesMax); // create initial batch
    storm.events.add(window,'resize',storm.resizeHandler);
    storm.events.add(window,'scroll',storm.scrollHandler);
    if (storm.freezeOnBlur) {
      if (isIE) {
        storm.events.add(document,'focusout',storm.freeze);
        storm.events.add(document,'focusin',storm.resume);
      } else {
        storm.events.add(window,'blur',storm.freeze);
        storm.events.add(window,'focus',storm.resume);
      }
    }
    storm.resizeHandler();
    storm.scrollHandler();
    if (storm.followMouse) {
      storm.events.add(isIE?document:window,'mousemove',storm.mouseMove);
    }
    storm.animationInterval = Math.max(20,storm.animationInterval);
    storm.timerInit();
  };

  this.start = function(bFromOnLoad) {
    if (!didInit) {
      didInit = true;
    } else if (bFromOnLoad) {
      // already loaded and running
      return true;
    }
    if (typeof storm.targetElement === 'string') {
      var targetID = storm.targetElement;
      storm.targetElement = document.getElementById(targetID);
      if (!storm.targetElement) {
        throw new Error('Snowstorm: Unable to get targetElement "'+targetID+'"');
      }
    }
    if (!storm.targetElement) {
      storm.targetElement = (document.body || document.documentElement);
    }
    if (storm.targetElement !== document.documentElement && storm.targetElement !== document.body) {
      // re-map handler to get element instead of screen dimensions
      storm.resizeHandler = storm.resizeHandlerAlt;
      //and force-enable pixel positioning
      storm.usePixelPosition = true;
    }
    storm.resizeHandler(); // get bounding box elements
    storm.usePositionFixed = (storm.usePositionFixed && !noFixed && !storm.flakeBottom); // whether or not position:fixed is to be used
    if (window.getComputedStyle) {
      // attempt to determine if body or user-specified snow parent element is relatlively-positioned.
      try {
        targetElementIsRelative = (window.getComputedStyle(storm.targetElement, null).getPropertyValue('position') === 'relative');
      } catch(e) {
        // oh well
        targetElementIsRelative = false;
      }
    }
    fixedForEverything = storm.usePositionFixed;
    if (screenX && screenY && !storm.disabled) {
      storm.init();
      storm.active = true;
    }
  };

  function doDelayedStart() {
    window.setTimeout(function() {
      storm.start(true);
    }, 20);
    // event cleanup
    storm.events.remove(isIE?document:window,'mousemove',doDelayedStart);
  }

  function doStart() {
    if (!storm.excludeMobile || !isMobile) {
      doDelayedStart();
    }
    // event cleanup
    storm.events.remove(window, 'load', doStart);
  }

  // hooks for starting the snow
  if (storm.autoStart) {
    storm.events.add(window, 'load', doStart, false);
  }

  return this;

}(window, document));

},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvc25vd3N0b3JtLmpzIiwiLi4vbW9kdWxlcy9ucG0uY29mZmVlIiwiLi4vbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi9tb2R1bGVzL1RleHRMYXllci5jb2ZmZWUiLCIuLi9tb2R1bGVzL0R5bmFtaWNMb2FkZXIuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGxpY2Vuc2VcclxuICogREhUTUwgU25vd3N0b3JtISBKYXZhU2NyaXB0LWJhc2VkIHNub3cgZm9yIHdlYiBwYWdlc1xyXG4gKiBNYWtpbmcgaXQgc25vdyBvbiB0aGUgaW50ZXJuZXRzIHNpbmNlIDIwMDMuIFlvdSdyZSB3ZWxjb21lLlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBWZXJzaW9uIDEuNDQuMjAxMzEyMDggKFByZXZpb3VzIHJldjogMS40NC4yMDEzMTEyNSlcclxuICogQ29weXJpZ2h0IChjKSAyMDA3LCBTY290dCBTY2hpbGxlci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogQ29kZSBwcm92aWRlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2VcclxuICogaHR0cDovL3NjaGlsbG1hbmlhLmNvbS9wcm9qZWN0cy9zbm93c3Rvcm0vbGljZW5zZS50eHRcclxuICovXHJcblxyXG4vKmpzbGludCBub21lbjogdHJ1ZSwgcGx1c3BsdXM6IHRydWUsIHNsb3BweTogdHJ1ZSwgdmFyczogdHJ1ZSwgd2hpdGU6IHRydWUgKi9cclxuLypnbG9iYWwgd2luZG93LCBkb2N1bWVudCwgbmF2aWdhdG9yLCBjbGVhckludGVydmFsLCBzZXRJbnRlcnZhbCAqL1xyXG5cclxudmFyIHNub3dTdG9ybSA9IChmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50KSB7XHJcblxyXG4gIC8vIC0tLSBjb21tb24gcHJvcGVydGllcyAtLS1cclxuXHJcbiAgdGhpcy5hdXRvU3RhcnQgPSB0cnVlOyAgICAgICAgICAvLyBXaGV0aGVyIHRoZSBzbm93IHNob3VsZCBzdGFydCBhdXRvbWF0aWNhbGx5IG9yIG5vdC5cclxuICB0aGlzLmV4Y2x1ZGVNb2JpbGUgPSB0cnVlOyAgICAgIC8vIFNub3cgaXMgbGlrZWx5IHRvIGJlIGJhZCBuZXdzIGZvciBtb2JpbGUgcGhvbmVzJyBDUFVzIChhbmQgYmF0dGVyaWVzLikgRW5hYmxlIGF0IHlvdXIgb3duIHJpc2suXHJcbiAgdGhpcy5mbGFrZXNNYXggPSAxMjg7ICAgICAgICAgICAvLyBMaW1pdCB0b3RhbCBhbW91bnQgb2Ygc25vdyBtYWRlIChmYWxsaW5nICsgc3RpY2tpbmcpXHJcbiAgdGhpcy5mbGFrZXNNYXhBY3RpdmUgPSA2NDsgICAgICAvLyBMaW1pdCBhbW91bnQgb2Ygc25vdyBmYWxsaW5nIGF0IG9uY2UgKGxlc3MgPSBsb3dlciBDUFUgdXNlKVxyXG4gIHRoaXMuYW5pbWF0aW9uSW50ZXJ2YWwgPSAzMzsgICAgLy8gVGhlb3JldGljYWwgXCJtaWxpc2Vjb25kcyBwZXIgZnJhbWVcIiBtZWFzdXJlbWVudC4gMjAgPSBmYXN0ICsgc21vb3RoLCBidXQgaGlnaCBDUFUgdXNlLiA1MCA9IG1vcmUgY29uc2VydmF0aXZlLCBidXQgc2xvd2VyXHJcbiAgdGhpcy51c2VHUFUgPSB0cnVlOyAgICAgICAgICAgICAvLyBFbmFibGUgdHJhbnNmb3JtLWJhc2VkIGhhcmR3YXJlIGFjY2VsZXJhdGlvbiwgcmVkdWNlIENQVSBsb2FkLlxyXG4gIHRoaXMuY2xhc3NOYW1lID0gbnVsbDsgICAgICAgICAgLy8gQ1NTIGNsYXNzIG5hbWUgZm9yIGZ1cnRoZXIgY3VzdG9taXphdGlvbiBvbiBzbm93IGVsZW1lbnRzXHJcbiAgdGhpcy5leGNsdWRlTW9iaWxlID0gdHJ1ZTsgICAgICAvLyBTbm93IGlzIGxpa2VseSB0byBiZSBiYWQgbmV3cyBmb3IgbW9iaWxlIHBob25lcycgQ1BVcyAoYW5kIGJhdHRlcmllcy4pIEJ5IGRlZmF1bHQsIGJlIG5pY2UuXHJcbiAgdGhpcy5mbGFrZUJvdHRvbSA9IG51bGw7ICAgICAgICAvLyBJbnRlZ2VyIGZvciBZIGF4aXMgc25vdyBsaW1pdCwgMCBvciBudWxsIGZvciBcImZ1bGwtc2NyZWVuXCIgc25vdyBlZmZlY3RcclxuICB0aGlzLmZvbGxvd01vdXNlID0gdHJ1ZTsgICAgICAgIC8vIFNub3cgbW92ZW1lbnQgY2FuIHJlc3BvbmQgdG8gdGhlIHVzZXIncyBtb3VzZVxyXG4gIHRoaXMuc25vd0NvbG9yID0gJyNmZmYnOyAgICAgICAgLy8gRG9uJ3QgZWF0IChvciB1c2U/KSB5ZWxsb3cgc25vdy5cclxuICB0aGlzLnNub3dDaGFyYWN0ZXIgPSAnJmJ1bGw7JzsgIC8vICZidWxsOyA9IGJ1bGxldCwgJm1pZGRvdDsgaXMgc3F1YXJlIG9uIHNvbWUgc3lzdGVtcyBldGMuXHJcbiAgdGhpcy5zbm93U3RpY2sgPSB0cnVlOyAgICAgICAgICAvLyBXaGV0aGVyIG9yIG5vdCBzbm93IHNob3VsZCBcInN0aWNrXCIgYXQgdGhlIGJvdHRvbS4gV2hlbiBvZmYsIHdpbGwgbmV2ZXIgY29sbGVjdC5cclxuICB0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsOyAgICAgIC8vIGVsZW1lbnQgd2hpY2ggc25vdyB3aWxsIGJlIGFwcGVuZGVkIHRvIChudWxsID0gZG9jdW1lbnQuYm9keSkgLSBjYW4gYmUgYW4gZWxlbWVudCBJRCBlZy4gJ215RGl2Jywgb3IgYSBET00gbm9kZSByZWZlcmVuY2VcclxuICB0aGlzLnVzZU1lbHRFZmZlY3QgPSB0cnVlOyAgICAgIC8vIFdoZW4gcmVjeWNsaW5nIGZhbGxlbiBzbm93IChvciByYXJlbHksIHdoZW4gZmFsbGluZyksIGhhdmUgaXQgXCJtZWx0XCIgYW5kIGZhZGUgb3V0IGlmIGJyb3dzZXIgc3VwcG9ydHMgaXRcclxuICB0aGlzLnVzZVR3aW5rbGVFZmZlY3QgPSBmYWxzZTsgIC8vIEFsbG93IHNub3cgdG8gcmFuZG9tbHkgXCJmbGlja2VyXCIgaW4gYW5kIG91dCBvZiB2aWV3IHdoaWxlIGZhbGxpbmdcclxuICB0aGlzLnVzZVBvc2l0aW9uRml4ZWQgPSBmYWxzZTsgIC8vIHRydWUgPSBzbm93IGRvZXMgbm90IHNoaWZ0IHZlcnRpY2FsbHkgd2hlbiBzY3JvbGxpbmcuIE1heSBpbmNyZWFzZSBDUFUgbG9hZCwgZGlzYWJsZWQgYnkgZGVmYXVsdCAtIGlmIGVuYWJsZWQsIHVzZWQgb25seSB3aGVyZSBzdXBwb3J0ZWRcclxuICB0aGlzLnVzZVBpeGVsUG9zaXRpb24gPSBmYWxzZTsgIC8vIFdoZXRoZXIgdG8gdXNlIHBpeGVsIHZhbHVlcyBmb3Igc25vdyB0b3AvbGVmdCB2cy4gcGVyY2VudGFnZXMuIEF1dG8tZW5hYmxlZCBpZiBib2R5IGlzIHBvc2l0aW9uOnJlbGF0aXZlIG9yIHRhcmdldEVsZW1lbnQgaXMgc3BlY2lmaWVkLlxyXG5cclxuICAvLyAtLS0gbGVzcy11c2VkIGJpdHMgLS0tXHJcblxyXG4gIHRoaXMuZnJlZXplT25CbHVyID0gdHJ1ZTsgICAgICAgLy8gT25seSBzbm93IHdoZW4gdGhlIHdpbmRvdyBpcyBpbiBmb2N1cyAoZm9yZWdyb3VuZC4pIFNhdmVzIENQVS5cclxuICB0aGlzLmZsYWtlTGVmdE9mZnNldCA9IDA7ICAgICAgIC8vIExlZnQgbWFyZ2luL2d1dHRlciBzcGFjZSBvbiBlZGdlIG9mIGNvbnRhaW5lciAoZWcuIGJyb3dzZXIgd2luZG93LikgQnVtcCB1cCB0aGVzZSB2YWx1ZXMgaWYgc2VlaW5nIGhvcml6b250YWwgc2Nyb2xsYmFycy5cclxuICB0aGlzLmZsYWtlUmlnaHRPZmZzZXQgPSAwOyAgICAgIC8vIFJpZ2h0IG1hcmdpbi9ndXR0ZXIgc3BhY2Ugb24gZWRnZSBvZiBjb250YWluZXJcclxuICB0aGlzLmZsYWtlV2lkdGggPSA4OyAgICAgICAgICAgIC8vIE1heCBwaXhlbCB3aWR0aCByZXNlcnZlZCBmb3Igc25vdyBlbGVtZW50XHJcbiAgdGhpcy5mbGFrZUhlaWdodCA9IDg7ICAgICAgICAgICAvLyBNYXggcGl4ZWwgaGVpZ2h0IHJlc2VydmVkIGZvciBzbm93IGVsZW1lbnRcclxuICB0aGlzLnZNYXhYID0gNTsgICAgICAgICAgICAgICAgIC8vIE1heGltdW0gWCB2ZWxvY2l0eSByYW5nZSBmb3Igc25vd1xyXG4gIHRoaXMudk1heFkgPSA0OyAgICAgICAgICAgICAgICAgLy8gTWF4aW11bSBZIHZlbG9jaXR5IHJhbmdlIGZvciBzbm93XHJcbiAgdGhpcy56SW5kZXggPSAwOyAgICAgICAgICAgICAgICAvLyBDU1Mgc3RhY2tpbmcgb3JkZXIgYXBwbGllZCB0byBlYWNoIHNub3dmbGFrZVxyXG5cclxuICAvLyAtLS0gXCJObyB1c2VyLXNlcnZpY2VhYmxlIHBhcnRzIGluc2lkZVwiIHBhc3QgdGhpcyBwb2ludCwgeWFkZGEgeWFkZGEgLS0tXHJcblxyXG4gIHZhciBzdG9ybSA9IHRoaXMsXHJcbiAgZmVhdHVyZXMsXHJcbiAgLy8gVUEgc25pZmZpbmcgYW5kIGJhY2tDb21wYXQgcmVuZGVyaW5nIG1vZGUgY2hlY2tzIGZvciBmaXhlZCBwb3NpdGlvbiwgZXRjLlxyXG4gIGlzSUUgPSBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9tc2llL2kpLFxyXG4gIGlzSUU2ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvbXNpZSA2L2kpLFxyXG4gIGlzTW9iaWxlID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvbW9iaWxlfG9wZXJhIG0ob2J8aW4pL2kpLFxyXG4gIGlzQmFja0NvbXBhdElFID0gKGlzSUUgJiYgZG9jdW1lbnQuY29tcGF0TW9kZSA9PT0gJ0JhY2tDb21wYXQnKSxcclxuICBub0ZpeGVkID0gKGlzQmFja0NvbXBhdElFIHx8IGlzSUU2KSxcclxuICBzY3JlZW5YID0gbnVsbCwgc2NyZWVuWDIgPSBudWxsLCBzY3JlZW5ZID0gbnVsbCwgc2Nyb2xsWSA9IG51bGwsIGRvY0hlaWdodCA9IG51bGwsIHZSbmRYID0gbnVsbCwgdlJuZFkgPSBudWxsLFxyXG4gIHdpbmRPZmZzZXQgPSAxLFxyXG4gIHdpbmRNdWx0aXBsaWVyID0gMixcclxuICBmbGFrZVR5cGVzID0gNixcclxuICBmaXhlZEZvckV2ZXJ5dGhpbmcgPSBmYWxzZSxcclxuICB0YXJnZXRFbGVtZW50SXNSZWxhdGl2ZSA9IGZhbHNlLFxyXG4gIG9wYWNpdHlTdXBwb3J0ZWQgPSAoZnVuY3Rpb24oKXtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLnN0eWxlLm9wYWNpdHkgPSAnMC41JztcclxuICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9KCkpLFxyXG4gIGRpZEluaXQgPSBmYWxzZSxcclxuICBkb2NGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICBmZWF0dXJlcyA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgZ2V0QW5pbWF0aW9uRnJhbWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYXQgdGlwOiBwYXVsIGlyaXNoXHJcbiAgICAgKiBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDExL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtYW5pbWF0aW5nL1xyXG4gICAgICogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vODM4Nzg1XHJcbiAgICAgKi9cclxuXHJcbiAgICBmdW5jdGlvbiB0aW1lb3V0U2hpbShjYWxsYmFjaykge1xyXG4gICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMC8oc3Rvcm0uYW5pbWF0aW9uSW50ZXJ2YWwgfHwgMjApKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgX2FuaW1hdGlvbkZyYW1lID0gKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgdGltZW91dFNoaW0pO1xyXG5cclxuICAgIC8vIGFwcGx5IHRvIHdpbmRvdywgYXZvaWQgXCJpbGxlZ2FsIGludm9jYXRpb25cIiBlcnJvcnMgaW4gQ2hyb21lXHJcbiAgICBnZXRBbmltYXRpb25GcmFtZSA9IF9hbmltYXRpb25GcmFtZSA/IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gX2FuaW1hdGlvbkZyYW1lLmFwcGx5KHdpbmRvdywgYXJndW1lbnRzKTtcclxuICAgIH0gOiBudWxsO1xyXG5cclxuICAgIHZhciB0ZXN0RGl2O1xyXG5cclxuICAgIHRlc3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBoYXMocHJvcCkge1xyXG5cclxuICAgICAgLy8gdGVzdCBmb3IgZmVhdHVyZSBzdXBwb3J0XHJcbiAgICAgIHZhciByZXN1bHQgPSB0ZXN0RGl2LnN0eWxlW3Byb3BdO1xyXG4gICAgICByZXR1cm4gKHJlc3VsdCAhPT0gdW5kZWZpbmVkID8gcHJvcCA6IG51bGwpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyBub3RlIGxvY2FsIHNjb3BlLlxyXG4gICAgdmFyIGxvY2FsRmVhdHVyZXMgPSB7XHJcblxyXG4gICAgICB0cmFuc2Zvcm06IHtcclxuICAgICAgICBpZTogIGhhcygnLW1zLXRyYW5zZm9ybScpLFxyXG4gICAgICAgIG1vejogaGFzKCdNb3pUcmFuc2Zvcm0nKSxcclxuICAgICAgICBvcGVyYTogaGFzKCdPVHJhbnNmb3JtJyksXHJcbiAgICAgICAgd2Via2l0OiBoYXMoJ3dlYmtpdFRyYW5zZm9ybScpLFxyXG4gICAgICAgIHczOiBoYXMoJ3RyYW5zZm9ybScpLFxyXG4gICAgICAgIHByb3A6IG51bGwgLy8gdGhlIG5vcm1hbGl6ZWQgcHJvcGVydHkgdmFsdWVcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGdldEFuaW1hdGlvbkZyYW1lOiBnZXRBbmltYXRpb25GcmFtZVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgbG9jYWxGZWF0dXJlcy50cmFuc2Zvcm0ucHJvcCA9IChcclxuICAgICAgbG9jYWxGZWF0dXJlcy50cmFuc2Zvcm0udzMgfHwgXHJcbiAgICAgIGxvY2FsRmVhdHVyZXMudHJhbnNmb3JtLm1veiB8fFxyXG4gICAgICBsb2NhbEZlYXR1cmVzLnRyYW5zZm9ybS53ZWJraXQgfHxcclxuICAgICAgbG9jYWxGZWF0dXJlcy50cmFuc2Zvcm0uaWUgfHxcclxuICAgICAgbG9jYWxGZWF0dXJlcy50cmFuc2Zvcm0ub3BlcmFcclxuICAgICk7XHJcblxyXG4gICAgdGVzdERpdiA9IG51bGw7XHJcblxyXG4gICAgcmV0dXJuIGxvY2FsRmVhdHVyZXM7XHJcblxyXG4gIH0oKSk7XHJcblxyXG4gIHRoaXMudGltZXIgPSBudWxsO1xyXG4gIHRoaXMuZmxha2VzID0gW107XHJcbiAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgdGhpcy5tZWx0RnJhbWVDb3VudCA9IDIwO1xyXG4gIHRoaXMubWVsdEZyYW1lcyA9IFtdO1xyXG5cclxuICB0aGlzLnNldFhZID0gZnVuY3Rpb24obywgeCwgeSkge1xyXG5cclxuICAgIGlmICghbykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN0b3JtLnVzZVBpeGVsUG9zaXRpb24gfHwgdGFyZ2V0RWxlbWVudElzUmVsYXRpdmUpIHtcclxuXHJcbiAgICAgIG8uc3R5bGUubGVmdCA9ICh4IC0gc3Rvcm0uZmxha2VXaWR0aCkgKyAncHgnO1xyXG4gICAgICBvLnN0eWxlLnRvcCA9ICh5IC0gc3Rvcm0uZmxha2VIZWlnaHQpICsgJ3B4JztcclxuXHJcbiAgICB9IGVsc2UgaWYgKG5vRml4ZWQpIHtcclxuXHJcbiAgICAgIG8uc3R5bGUucmlnaHQgPSAoMTAwLSh4L3NjcmVlblgqMTAwKSkgKyAnJSc7XHJcbiAgICAgIC8vIGF2b2lkIGNyZWF0aW5nIHZlcnRpY2FsIHNjcm9sbGJhcnNcclxuICAgICAgby5zdHlsZS50b3AgPSAoTWF0aC5taW4oeSwgZG9jSGVpZ2h0LXN0b3JtLmZsYWtlSGVpZ2h0KSkgKyAncHgnO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICBpZiAoIXN0b3JtLmZsYWtlQm90dG9tKSB7XHJcblxyXG4gICAgICAgIC8vIGlmIG5vdCB1c2luZyBhIGZpeGVkIGJvdHRvbSBjb29yZGluYXRlLi4uXHJcbiAgICAgICAgby5zdHlsZS5yaWdodCA9ICgxMDAtKHgvc2NyZWVuWCoxMDApKSArICclJztcclxuICAgICAgICBvLnN0eWxlLmJvdHRvbSA9ICgxMDAtKHkvc2NyZWVuWSoxMDApKSArICclJztcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIC8vIGFic29sdXRlIHRvcC5cclxuICAgICAgICBvLnN0eWxlLnJpZ2h0ID0gKDEwMC0oeC9zY3JlZW5YKjEwMCkpICsgJyUnO1xyXG4gICAgICAgIG8uc3R5bGUudG9wID0gKE1hdGgubWluKHksIGRvY0hlaWdodC1zdG9ybS5mbGFrZUhlaWdodCkpICsgJ3B4JztcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gIH07XHJcblxyXG4gIHRoaXMuZXZlbnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBvbGQgPSAoIXdpbmRvdy5hZGRFdmVudExpc3RlbmVyICYmIHdpbmRvdy5hdHRhY2hFdmVudCksIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLFxyXG4gICAgZXZ0ID0ge1xyXG4gICAgICBhZGQ6IChvbGQ/J2F0dGFjaEV2ZW50JzonYWRkRXZlbnRMaXN0ZW5lcicpLFxyXG4gICAgICByZW1vdmU6IChvbGQ/J2RldGFjaEV2ZW50JzoncmVtb3ZlRXZlbnRMaXN0ZW5lcicpXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldEFyZ3Mob0FyZ3MpIHtcclxuICAgICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKG9BcmdzKSwgbGVuID0gYXJncy5sZW5ndGg7XHJcbiAgICAgIGlmIChvbGQpIHtcclxuICAgICAgICBhcmdzWzFdID0gJ29uJyArIGFyZ3NbMV07IC8vIHByZWZpeFxyXG4gICAgICAgIGlmIChsZW4gPiAzKSB7XHJcbiAgICAgICAgICBhcmdzLnBvcCgpOyAvLyBubyBjYXB0dXJlXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKGxlbiA9PT0gMykge1xyXG4gICAgICAgIGFyZ3MucHVzaChmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGFyZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYXBwbHkoYXJncywgc1R5cGUpIHtcclxuICAgICAgdmFyIGVsZW1lbnQgPSBhcmdzLnNoaWZ0KCksXHJcbiAgICAgICAgICBtZXRob2QgPSBbZXZ0W3NUeXBlXV07XHJcbiAgICAgIGlmIChvbGQpIHtcclxuICAgICAgICBlbGVtZW50W21ldGhvZF0oYXJnc1swXSwgYXJnc1sxXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWxlbWVudFttZXRob2RdLmFwcGx5KGVsZW1lbnQsIGFyZ3MpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkRXZlbnQoKSB7XHJcbiAgICAgIGFwcGx5KGdldEFyZ3MoYXJndW1lbnRzKSwgJ2FkZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZUV2ZW50KCkge1xyXG4gICAgICBhcHBseShnZXRBcmdzKGFyZ3VtZW50cyksICdyZW1vdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhZGQ6IGFkZEV2ZW50LFxyXG4gICAgICByZW1vdmU6IHJlbW92ZUV2ZW50XHJcbiAgICB9O1xyXG5cclxuICB9KCkpO1xyXG5cclxuICBmdW5jdGlvbiBybmQobixtaW4pIHtcclxuICAgIGlmIChpc05hTihtaW4pKSB7XHJcbiAgICAgIG1pbiA9IDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKE1hdGgucmFuZG9tKCkqbikrbWluO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcGx1c01pbnVzKG4pIHtcclxuICAgIHJldHVybiAocGFyc2VJbnQocm5kKDIpLDEwKT09PTE/biotMTpuKTtcclxuICB9XHJcblxyXG4gIHRoaXMucmFuZG9taXplV2luZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGk7XHJcbiAgICB2Um5kWCA9IHBsdXNNaW51cyhybmQoc3Rvcm0udk1heFgsMC4yKSk7XHJcbiAgICB2Um5kWSA9IHJuZChzdG9ybS52TWF4WSwwLjIpO1xyXG4gICAgaWYgKHRoaXMuZmxha2VzKSB7XHJcbiAgICAgIGZvciAoaT0wOyBpPHRoaXMuZmxha2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmxha2VzW2ldLmFjdGl2ZSkge1xyXG4gICAgICAgICAgdGhpcy5mbGFrZXNbaV0uc2V0VmVsb2NpdGllcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHRoaXMuc2Nyb2xsSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGk7XHJcbiAgICAvLyBcImF0dGFjaFwiIHNub3dmbGFrZXMgdG8gYm90dG9tIG9mIHdpbmRvdyBpZiBubyBhYnNvbHV0ZSBib3R0b20gdmFsdWUgd2FzIGdpdmVuXHJcbiAgICBzY3JvbGxZID0gKHN0b3JtLmZsYWtlQm90dG9tID8gMCA6IHBhcnNlSW50KHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgKG5vRml4ZWQgPyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA6IDApLCAxMCkpO1xyXG4gICAgaWYgKGlzTmFOKHNjcm9sbFkpKSB7XHJcbiAgICAgIHNjcm9sbFkgPSAwOyAvLyBOZXRzY2FwZSA2IHNjcm9sbCBmaXhcclxuICAgIH1cclxuICAgIGlmICghZml4ZWRGb3JFdmVyeXRoaW5nICYmICFzdG9ybS5mbGFrZUJvdHRvbSAmJiBzdG9ybS5mbGFrZXMpIHtcclxuICAgICAgZm9yIChpPTA7IGk8c3Rvcm0uZmxha2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHN0b3JtLmZsYWtlc1tpXS5hY3RpdmUgPT09IDApIHtcclxuICAgICAgICAgIHN0b3JtLmZsYWtlc1tpXS5zdGljaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHRoaXMucmVzaXplSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIHx8IHdpbmRvdy5pbm5lckhlaWdodCkge1xyXG4gICAgICBzY3JlZW5YID0gd2luZG93LmlubmVyV2lkdGggLSAxNiAtIHN0b3JtLmZsYWtlUmlnaHRPZmZzZXQ7XHJcbiAgICAgIHNjcmVlblkgPSAoc3Rvcm0uZmxha2VCb3R0b20gfHwgd2luZG93LmlubmVySGVpZ2h0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNjcmVlblggPSAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aCkgLSAoIWlzSUUgPyA4IDogMCkgLSBzdG9ybS5mbGFrZVJpZ2h0T2Zmc2V0O1xyXG4gICAgICBzY3JlZW5ZID0gc3Rvcm0uZmxha2VCb3R0b20gfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodDtcclxuICAgIH1cclxuICAgIGRvY0hlaWdodCA9IGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0O1xyXG4gICAgc2NyZWVuWDIgPSBwYXJzZUludChzY3JlZW5YLzIsMTApO1xyXG4gIH07XHJcblxyXG4gIHRoaXMucmVzaXplSGFuZGxlckFsdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgc2NyZWVuWCA9IHN0b3JtLnRhcmdldEVsZW1lbnQub2Zmc2V0V2lkdGggLSBzdG9ybS5mbGFrZVJpZ2h0T2Zmc2V0O1xyXG4gICAgc2NyZWVuWSA9IHN0b3JtLmZsYWtlQm90dG9tIHx8IHN0b3JtLnRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgc2NyZWVuWDIgPSBwYXJzZUludChzY3JlZW5YLzIsMTApO1xyXG4gICAgZG9jSGVpZ2h0ID0gZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQ7XHJcbiAgfTtcclxuXHJcbiAgdGhpcy5mcmVlemUgPSBmdW5jdGlvbigpIHtcclxuICAgIC8vIHBhdXNlIGFuaW1hdGlvblxyXG4gICAgaWYgKCFzdG9ybS5kaXNhYmxlZCkge1xyXG4gICAgICBzdG9ybS5kaXNhYmxlZCA9IDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBzdG9ybS50aW1lciA9IG51bGw7XHJcbiAgfTtcclxuXHJcbiAgdGhpcy5yZXN1bWUgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmIChzdG9ybS5kaXNhYmxlZCkge1xyXG4gICAgICAgc3Rvcm0uZGlzYWJsZWQgPSAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgc3Rvcm0udGltZXJJbml0KCk7XHJcbiAgfTtcclxuXHJcbiAgdGhpcy50b2dnbGVTbm93ID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoIXN0b3JtLmZsYWtlcy5sZW5ndGgpIHtcclxuICAgICAgLy8gZmlyc3QgcnVuXHJcbiAgICAgIHN0b3JtLnN0YXJ0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdG9ybS5hY3RpdmUgPSAhc3Rvcm0uYWN0aXZlO1xyXG4gICAgICBpZiAoc3Rvcm0uYWN0aXZlKSB7XHJcbiAgICAgICAgc3Rvcm0uc2hvdygpO1xyXG4gICAgICAgIHN0b3JtLnJlc3VtZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0b3JtLnN0b3AoKTtcclxuICAgICAgICBzdG9ybS5mcmVlemUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHRoaXMuc3RvcCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGk7XHJcbiAgICB0aGlzLmZyZWV6ZSgpO1xyXG4gICAgZm9yIChpPTA7IGk8dGhpcy5mbGFrZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGhpcy5mbGFrZXNbaV0uby5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfVxyXG4gICAgc3Rvcm0uZXZlbnRzLnJlbW92ZSh3aW5kb3csJ3Njcm9sbCcsc3Rvcm0uc2Nyb2xsSGFuZGxlcik7XHJcbiAgICBzdG9ybS5ldmVudHMucmVtb3ZlKHdpbmRvdywncmVzaXplJyxzdG9ybS5yZXNpemVIYW5kbGVyKTtcclxuICAgIGlmIChzdG9ybS5mcmVlemVPbkJsdXIpIHtcclxuICAgICAgaWYgKGlzSUUpIHtcclxuICAgICAgICBzdG9ybS5ldmVudHMucmVtb3ZlKGRvY3VtZW50LCdmb2N1c291dCcsc3Rvcm0uZnJlZXplKTtcclxuICAgICAgICBzdG9ybS5ldmVudHMucmVtb3ZlKGRvY3VtZW50LCdmb2N1c2luJyxzdG9ybS5yZXN1bWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0b3JtLmV2ZW50cy5yZW1vdmUod2luZG93LCdibHVyJyxzdG9ybS5mcmVlemUpO1xyXG4gICAgICAgIHN0b3JtLmV2ZW50cy5yZW1vdmUod2luZG93LCdmb2N1cycsc3Rvcm0ucmVzdW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHRoaXMuc2hvdyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGk7XHJcbiAgICBmb3IgKGk9MDsgaTx0aGlzLmZsYWtlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB0aGlzLmZsYWtlc1tpXS5vLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHRoaXMuU25vd0ZsYWtlID0gZnVuY3Rpb24odHlwZSx4LHkpIHtcclxuICAgIHZhciBzID0gdGhpcztcclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLnggPSB4fHxwYXJzZUludChybmQoc2NyZWVuWC0yMCksMTApO1xyXG4gICAgdGhpcy55ID0gKCFpc05hTih5KT95Oi1ybmQoc2NyZWVuWSktMTIpO1xyXG4gICAgdGhpcy52WCA9IG51bGw7XHJcbiAgICB0aGlzLnZZID0gbnVsbDtcclxuICAgIHRoaXMudkFtcFR5cGVzID0gWzEsMS4yLDEuNCwxLjYsMS44XTsgLy8gXCJhbXBsaWZpY2F0aW9uXCIgZm9yIHZYL3ZZIChiYXNlZCBvbiBmbGFrZSBzaXplL3R5cGUpXHJcbiAgICB0aGlzLnZBbXAgPSB0aGlzLnZBbXBUeXBlc1t0aGlzLnR5cGVdIHx8IDE7XHJcbiAgICB0aGlzLm1lbHRpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMubWVsdEZyYW1lQ291bnQgPSBzdG9ybS5tZWx0RnJhbWVDb3VudDtcclxuICAgIHRoaXMubWVsdEZyYW1lcyA9IHN0b3JtLm1lbHRGcmFtZXM7XHJcbiAgICB0aGlzLm1lbHRGcmFtZSA9IDA7XHJcbiAgICB0aGlzLnR3aW5rbGVGcmFtZSA9IDA7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IDE7XHJcbiAgICB0aGlzLmZvbnRTaXplID0gKDEwKyh0aGlzLnR5cGUvNSkqMTApO1xyXG4gICAgdGhpcy5vID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLm8uaW5uZXJIVE1MID0gc3Rvcm0uc25vd0NoYXJhY3RlcjtcclxuICAgIGlmIChzdG9ybS5jbGFzc05hbWUpIHtcclxuICAgICAgdGhpcy5vLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBzdG9ybS5jbGFzc05hbWUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vLnN0eWxlLmNvbG9yID0gc3Rvcm0uc25vd0NvbG9yO1xyXG4gICAgdGhpcy5vLnN0eWxlLnBvc2l0aW9uID0gKGZpeGVkRm9yRXZlcnl0aGluZz8nZml4ZWQnOidhYnNvbHV0ZScpO1xyXG4gICAgaWYgKHN0b3JtLnVzZUdQVSAmJiBmZWF0dXJlcy50cmFuc2Zvcm0ucHJvcCkge1xyXG4gICAgICAvLyBHUFUtYWNjZWxlcmF0ZWQgc25vdy5cclxuICAgICAgdGhpcy5vLnN0eWxlW2ZlYXR1cmVzLnRyYW5zZm9ybS5wcm9wXSA9ICd0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KSc7XHJcbiAgICB9XHJcbiAgICB0aGlzLm8uc3R5bGUud2lkdGggPSBzdG9ybS5mbGFrZVdpZHRoKydweCc7XHJcbiAgICB0aGlzLm8uc3R5bGUuaGVpZ2h0ID0gc3Rvcm0uZmxha2VIZWlnaHQrJ3B4JztcclxuICAgIHRoaXMuby5zdHlsZS5mb250RmFtaWx5ID0gJ2FyaWFsLHZlcmRhbmEnO1xyXG4gICAgdGhpcy5vLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcclxuICAgIHRoaXMuby5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG4gICAgdGhpcy5vLnN0eWxlLmZvbnRXZWlnaHQgPSAnbm9ybWFsJztcclxuICAgIHRoaXMuby5zdHlsZS56SW5kZXggPSBzdG9ybS56SW5kZXg7XHJcbiAgICBkb2NGcmFnLmFwcGVuZENoaWxkKHRoaXMubyk7XHJcblxyXG4gICAgdGhpcy5yZWZyZXNoID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmIChpc05hTihzLngpIHx8IGlzTmFOKHMueSkpIHtcclxuICAgICAgICAvLyBzYWZldHkgY2hlY2tcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgc3Rvcm0uc2V0WFkocy5vLCBzLngsIHMueSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuc3RpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKG5vRml4ZWQgfHwgKHN0b3JtLnRhcmdldEVsZW1lbnQgIT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBzdG9ybS50YXJnZXRFbGVtZW50ICE9PSBkb2N1bWVudC5ib2R5KSkge1xyXG4gICAgICAgIHMuby5zdHlsZS50b3AgPSAoc2NyZWVuWStzY3JvbGxZLXN0b3JtLmZsYWtlSGVpZ2h0KSsncHgnO1xyXG4gICAgICB9IGVsc2UgaWYgKHN0b3JtLmZsYWtlQm90dG9tKSB7XHJcbiAgICAgICAgcy5vLnN0eWxlLnRvcCA9IHN0b3JtLmZsYWtlQm90dG9tKydweCc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcy5vLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgcy5vLnN0eWxlLmJvdHRvbSA9ICcwJSc7XHJcbiAgICAgICAgcy5vLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcclxuICAgICAgICBzLm8uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy52Q2hlY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKHMudlg+PTAgJiYgcy52WDwwLjIpIHtcclxuICAgICAgICBzLnZYID0gMC4yO1xyXG4gICAgICB9IGVsc2UgaWYgKHMudlg8MCAmJiBzLnZYPi0wLjIpIHtcclxuICAgICAgICBzLnZYID0gLTAuMjtcclxuICAgICAgfVxyXG4gICAgICBpZiAocy52WT49MCAmJiBzLnZZPDAuMikge1xyXG4gICAgICAgIHMudlkgPSAwLjI7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5tb3ZlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciB2WCA9IHMudlgqd2luZE9mZnNldCwgeURpZmY7XHJcbiAgICAgIHMueCArPSB2WDtcclxuICAgICAgcy55ICs9IChzLnZZKnMudkFtcCk7XHJcbiAgICAgIGlmIChzLnggPj0gc2NyZWVuWCB8fCBzY3JlZW5YLXMueCA8IHN0b3JtLmZsYWtlV2lkdGgpIHsgLy8gWC1heGlzIHNjcm9sbCBjaGVja1xyXG4gICAgICAgIHMueCA9IDA7XHJcbiAgICAgIH0gZWxzZSBpZiAodlggPCAwICYmIHMueC1zdG9ybS5mbGFrZUxlZnRPZmZzZXQgPCAtc3Rvcm0uZmxha2VXaWR0aCkge1xyXG4gICAgICAgIHMueCA9IHNjcmVlblgtc3Rvcm0uZmxha2VXaWR0aC0xOyAvLyBmbGFrZVdpZHRoO1xyXG4gICAgICB9XHJcbiAgICAgIHMucmVmcmVzaCgpO1xyXG4gICAgICB5RGlmZiA9IHNjcmVlblkrc2Nyb2xsWS1zLnkrc3Rvcm0uZmxha2VIZWlnaHQ7XHJcbiAgICAgIGlmICh5RGlmZjxzdG9ybS5mbGFrZUhlaWdodCkge1xyXG4gICAgICAgIHMuYWN0aXZlID0gMDtcclxuICAgICAgICBpZiAoc3Rvcm0uc25vd1N0aWNrKSB7XHJcbiAgICAgICAgICBzLnN0aWNrKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHMucmVjeWNsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoc3Rvcm0udXNlTWVsdEVmZmVjdCAmJiBzLmFjdGl2ZSAmJiBzLnR5cGUgPCAzICYmICFzLm1lbHRpbmcgJiYgTWF0aC5yYW5kb20oKT4wLjk5OCkge1xyXG4gICAgICAgICAgLy8gfjEvMTAwMCBjaGFuY2Ugb2YgbWVsdGluZyBtaWQtYWlyLCB3aXRoIGVhY2ggZnJhbWVcclxuICAgICAgICAgIHMubWVsdGluZyA9IHRydWU7XHJcbiAgICAgICAgICBzLm1lbHQoKTtcclxuICAgICAgICAgIC8vIG9ubHkgaW5jcmVtZW50YWxseSBtZWx0IG9uZSBmcmFtZVxyXG4gICAgICAgICAgLy8gcy5tZWx0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdG9ybS51c2VUd2lua2xlRWZmZWN0KSB7XHJcbiAgICAgICAgICBpZiAocy50d2lua2xlRnJhbWUgPCAwKSB7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC45Nykge1xyXG4gICAgICAgICAgICAgIHMudHdpbmtsZUZyYW1lID0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDgsIDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcy50d2lua2xlRnJhbWUtLTtcclxuICAgICAgICAgICAgaWYgKCFvcGFjaXR5U3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgcy5vLnN0eWxlLnZpc2liaWxpdHkgPSAocy50d2lua2xlRnJhbWUgJiYgcy50d2lua2xlRnJhbWUgJSAyID09PSAwID8gJ2hpZGRlbicgOiAndmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHMuby5zdHlsZS5vcGFjaXR5ID0gKHMudHdpbmtsZUZyYW1lICYmIHMudHdpbmtsZUZyYW1lICUgMiA9PT0gMCA/IDAgOiAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmFuaW1hdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgLy8gbWFpbiBhbmltYXRpb24gbG9vcFxyXG4gICAgICAvLyBtb3ZlLCBjaGVjayBzdGF0dXMsIGRpZSBldGMuXHJcbiAgICAgIHMubW92ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnNldFZlbG9jaXRpZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcy52WCA9IHZSbmRYK3JuZChzdG9ybS52TWF4WCowLjEyLDAuMSk7XHJcbiAgICAgIHMudlkgPSB2Um5kWStybmQoc3Rvcm0udk1heFkqMC4xMiwwLjEpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnNldE9wYWNpdHkgPSBmdW5jdGlvbihvLG9wYWNpdHkpIHtcclxuICAgICAgaWYgKCFvcGFjaXR5U3VwcG9ydGVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIG8uc3R5bGUub3BhY2l0eSA9IG9wYWNpdHk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubWVsdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAoIXN0b3JtLnVzZU1lbHRFZmZlY3QgfHwgIXMubWVsdGluZykge1xyXG4gICAgICAgIHMucmVjeWNsZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChzLm1lbHRGcmFtZSA8IHMubWVsdEZyYW1lQ291bnQpIHtcclxuICAgICAgICAgIHMuc2V0T3BhY2l0eShzLm8scy5tZWx0RnJhbWVzW3MubWVsdEZyYW1lXSk7XHJcbiAgICAgICAgICBzLm8uc3R5bGUuZm9udFNpemUgPSBzLmZvbnRTaXplLShzLmZvbnRTaXplKihzLm1lbHRGcmFtZS9zLm1lbHRGcmFtZUNvdW50KSkrJ3B4JztcclxuICAgICAgICAgIHMuby5zdHlsZS5saW5lSGVpZ2h0ID0gc3Rvcm0uZmxha2VIZWlnaHQrMisoc3Rvcm0uZmxha2VIZWlnaHQqMC43NSoocy5tZWx0RnJhbWUvcy5tZWx0RnJhbWVDb3VudCkpKydweCc7XHJcbiAgICAgICAgICBzLm1lbHRGcmFtZSsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzLnJlY3ljbGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5yZWN5Y2xlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHMuby5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICBzLm8uc3R5bGUucG9zaXRpb24gPSAoZml4ZWRGb3JFdmVyeXRoaW5nPydmaXhlZCc6J2Fic29sdXRlJyk7XHJcbiAgICAgIHMuby5zdHlsZS5ib3R0b20gPSAnYXV0byc7XHJcbiAgICAgIHMuc2V0VmVsb2NpdGllcygpO1xyXG4gICAgICBzLnZDaGVjaygpO1xyXG4gICAgICBzLm1lbHRGcmFtZSA9IDA7XHJcbiAgICAgIHMubWVsdGluZyA9IGZhbHNlO1xyXG4gICAgICBzLnNldE9wYWNpdHkocy5vLDEpO1xyXG4gICAgICBzLm8uc3R5bGUucGFkZGluZyA9ICcwcHgnO1xyXG4gICAgICBzLm8uc3R5bGUubWFyZ2luID0gJzBweCc7XHJcbiAgICAgIHMuby5zdHlsZS5mb250U2l6ZSA9IHMuZm9udFNpemUrJ3B4JztcclxuICAgICAgcy5vLnN0eWxlLmxpbmVIZWlnaHQgPSAoc3Rvcm0uZmxha2VIZWlnaHQrMikrJ3B4JztcclxuICAgICAgcy5vLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xyXG4gICAgICBzLm8uc3R5bGUudmVydGljYWxBbGlnbiA9ICdiYXNlbGluZSc7XHJcbiAgICAgIHMueCA9IHBhcnNlSW50KHJuZChzY3JlZW5YLXN0b3JtLmZsYWtlV2lkdGgtMjApLDEwKTtcclxuICAgICAgcy55ID0gcGFyc2VJbnQocm5kKHNjcmVlblkpKi0xLDEwKS1zdG9ybS5mbGFrZUhlaWdodDtcclxuICAgICAgcy5yZWZyZXNoKCk7XHJcbiAgICAgIHMuby5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgcy5hY3RpdmUgPSAxO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnJlY3ljbGUoKTsgLy8gc2V0IHVwIHgveSBjb29yZHMgZXRjLlxyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcblxyXG4gIH07XHJcblxyXG4gIHRoaXMuc25vdyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGFjdGl2ZSA9IDAsIGZsYWtlID0gbnVsbCwgaSwgajtcclxuICAgIGZvciAoaT0wLCBqPXN0b3JtLmZsYWtlcy5sZW5ndGg7IGk8ajsgaSsrKSB7XHJcbiAgICAgIGlmIChzdG9ybS5mbGFrZXNbaV0uYWN0aXZlID09PSAxKSB7XHJcbiAgICAgICAgc3Rvcm0uZmxha2VzW2ldLm1vdmUoKTtcclxuICAgICAgICBhY3RpdmUrKztcclxuICAgICAgfVxyXG4gICAgICBpZiAoc3Rvcm0uZmxha2VzW2ldLm1lbHRpbmcpIHtcclxuICAgICAgICBzdG9ybS5mbGFrZXNbaV0ubWVsdCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoYWN0aXZlPHN0b3JtLmZsYWtlc01heEFjdGl2ZSkge1xyXG4gICAgICBmbGFrZSA9IHN0b3JtLmZsYWtlc1twYXJzZUludChybmQoc3Rvcm0uZmxha2VzLmxlbmd0aCksMTApXTtcclxuICAgICAgaWYgKGZsYWtlLmFjdGl2ZSA9PT0gMCkge1xyXG4gICAgICAgIGZsYWtlLm1lbHRpbmcgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc3Rvcm0udGltZXIpIHtcclxuICAgICAgZmVhdHVyZXMuZ2V0QW5pbWF0aW9uRnJhbWUoc3Rvcm0uc25vdyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgdGhpcy5tb3VzZU1vdmUgPSBmdW5jdGlvbihlKSB7XHJcbiAgICBpZiAoIXN0b3JtLmZvbGxvd01vdXNlKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgdmFyIHggPSBwYXJzZUludChlLmNsaWVudFgsMTApO1xyXG4gICAgaWYgKHg8c2NyZWVuWDIpIHtcclxuICAgICAgd2luZE9mZnNldCA9IC13aW5kTXVsdGlwbGllcisoeC9zY3JlZW5YMip3aW5kTXVsdGlwbGllcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB4IC09IHNjcmVlblgyO1xyXG4gICAgICB3aW5kT2Zmc2V0ID0gKHgvc2NyZWVuWDIpKndpbmRNdWx0aXBsaWVyO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHRoaXMuY3JlYXRlU25vdyA9IGZ1bmN0aW9uKGxpbWl0LGFsbG93SW5hY3RpdmUpIHtcclxuICAgIHZhciBpO1xyXG4gICAgZm9yIChpPTA7IGk8bGltaXQ7IGkrKykge1xyXG4gICAgICBzdG9ybS5mbGFrZXNbc3Rvcm0uZmxha2VzLmxlbmd0aF0gPSBuZXcgc3Rvcm0uU25vd0ZsYWtlKHBhcnNlSW50KHJuZChmbGFrZVR5cGVzKSwxMCkpO1xyXG4gICAgICBpZiAoYWxsb3dJbmFjdGl2ZSB8fCBpPnN0b3JtLmZsYWtlc01heEFjdGl2ZSkge1xyXG4gICAgICAgIHN0b3JtLmZsYWtlc1tzdG9ybS5mbGFrZXMubGVuZ3RoLTFdLmFjdGl2ZSA9IC0xO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBzdG9ybS50YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKGRvY0ZyYWcpO1xyXG4gIH07XHJcblxyXG4gIHRoaXMudGltZXJJbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICBzdG9ybS50aW1lciA9IHRydWU7XHJcbiAgICBzdG9ybS5zbm93KCk7XHJcbiAgfTtcclxuXHJcbiAgdGhpcy5pbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgaTtcclxuICAgIGZvciAoaT0wOyBpPHN0b3JtLm1lbHRGcmFtZUNvdW50OyBpKyspIHtcclxuICAgICAgc3Rvcm0ubWVsdEZyYW1lcy5wdXNoKDEtKGkvc3Rvcm0ubWVsdEZyYW1lQ291bnQpKTtcclxuICAgIH1cclxuICAgIHN0b3JtLnJhbmRvbWl6ZVdpbmQoKTtcclxuICAgIHN0b3JtLmNyZWF0ZVNub3coc3Rvcm0uZmxha2VzTWF4KTsgLy8gY3JlYXRlIGluaXRpYWwgYmF0Y2hcclxuICAgIHN0b3JtLmV2ZW50cy5hZGQod2luZG93LCdyZXNpemUnLHN0b3JtLnJlc2l6ZUhhbmRsZXIpO1xyXG4gICAgc3Rvcm0uZXZlbnRzLmFkZCh3aW5kb3csJ3Njcm9sbCcsc3Rvcm0uc2Nyb2xsSGFuZGxlcik7XHJcbiAgICBpZiAoc3Rvcm0uZnJlZXplT25CbHVyKSB7XHJcbiAgICAgIGlmIChpc0lFKSB7XHJcbiAgICAgICAgc3Rvcm0uZXZlbnRzLmFkZChkb2N1bWVudCwnZm9jdXNvdXQnLHN0b3JtLmZyZWV6ZSk7XHJcbiAgICAgICAgc3Rvcm0uZXZlbnRzLmFkZChkb2N1bWVudCwnZm9jdXNpbicsc3Rvcm0ucmVzdW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzdG9ybS5ldmVudHMuYWRkKHdpbmRvdywnYmx1cicsc3Rvcm0uZnJlZXplKTtcclxuICAgICAgICBzdG9ybS5ldmVudHMuYWRkKHdpbmRvdywnZm9jdXMnLHN0b3JtLnJlc3VtZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHN0b3JtLnJlc2l6ZUhhbmRsZXIoKTtcclxuICAgIHN0b3JtLnNjcm9sbEhhbmRsZXIoKTtcclxuICAgIGlmIChzdG9ybS5mb2xsb3dNb3VzZSkge1xyXG4gICAgICBzdG9ybS5ldmVudHMuYWRkKGlzSUU/ZG9jdW1lbnQ6d2luZG93LCdtb3VzZW1vdmUnLHN0b3JtLm1vdXNlTW92ZSk7XHJcbiAgICB9XHJcbiAgICBzdG9ybS5hbmltYXRpb25JbnRlcnZhbCA9IE1hdGgubWF4KDIwLHN0b3JtLmFuaW1hdGlvbkludGVydmFsKTtcclxuICAgIHN0b3JtLnRpbWVySW5pdCgpO1xyXG4gIH07XHJcblxyXG4gIHRoaXMuc3RhcnQgPSBmdW5jdGlvbihiRnJvbU9uTG9hZCkge1xyXG4gICAgaWYgKCFkaWRJbml0KSB7XHJcbiAgICAgIGRpZEluaXQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChiRnJvbU9uTG9hZCkge1xyXG4gICAgICAvLyBhbHJlYWR5IGxvYWRlZCBhbmQgcnVubmluZ1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygc3Rvcm0udGFyZ2V0RWxlbWVudCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgdmFyIHRhcmdldElEID0gc3Rvcm0udGFyZ2V0RWxlbWVudDtcclxuICAgICAgc3Rvcm0udGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldElEKTtcclxuICAgICAgaWYgKCFzdG9ybS50YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTbm93c3Rvcm06IFVuYWJsZSB0byBnZXQgdGFyZ2V0RWxlbWVudCBcIicrdGFyZ2V0SUQrJ1wiJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghc3Rvcm0udGFyZ2V0RWxlbWVudCkge1xyXG4gICAgICBzdG9ybS50YXJnZXRFbGVtZW50ID0gKGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcclxuICAgIH1cclxuICAgIGlmIChzdG9ybS50YXJnZXRFbGVtZW50ICE9PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgc3Rvcm0udGFyZ2V0RWxlbWVudCAhPT0gZG9jdW1lbnQuYm9keSkge1xyXG4gICAgICAvLyByZS1tYXAgaGFuZGxlciB0byBnZXQgZWxlbWVudCBpbnN0ZWFkIG9mIHNjcmVlbiBkaW1lbnNpb25zXHJcbiAgICAgIHN0b3JtLnJlc2l6ZUhhbmRsZXIgPSBzdG9ybS5yZXNpemVIYW5kbGVyQWx0O1xyXG4gICAgICAvL2FuZCBmb3JjZS1lbmFibGUgcGl4ZWwgcG9zaXRpb25pbmdcclxuICAgICAgc3Rvcm0udXNlUGl4ZWxQb3NpdGlvbiA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBzdG9ybS5yZXNpemVIYW5kbGVyKCk7IC8vIGdldCBib3VuZGluZyBib3ggZWxlbWVudHNcclxuICAgIHN0b3JtLnVzZVBvc2l0aW9uRml4ZWQgPSAoc3Rvcm0udXNlUG9zaXRpb25GaXhlZCAmJiAhbm9GaXhlZCAmJiAhc3Rvcm0uZmxha2VCb3R0b20pOyAvLyB3aGV0aGVyIG9yIG5vdCBwb3NpdGlvbjpmaXhlZCBpcyB0byBiZSB1c2VkXHJcbiAgICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcclxuICAgICAgLy8gYXR0ZW1wdCB0byBkZXRlcm1pbmUgaWYgYm9keSBvciB1c2VyLXNwZWNpZmllZCBzbm93IHBhcmVudCBlbGVtZW50IGlzIHJlbGF0bGl2ZWx5LXBvc2l0aW9uZWQuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdGFyZ2V0RWxlbWVudElzUmVsYXRpdmUgPSAod2luZG93LmdldENvbXB1dGVkU3R5bGUoc3Rvcm0udGFyZ2V0RWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgncG9zaXRpb24nKSA9PT0gJ3JlbGF0aXZlJyk7XHJcbiAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgIC8vIG9oIHdlbGxcclxuICAgICAgICB0YXJnZXRFbGVtZW50SXNSZWxhdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmaXhlZEZvckV2ZXJ5dGhpbmcgPSBzdG9ybS51c2VQb3NpdGlvbkZpeGVkO1xyXG4gICAgaWYgKHNjcmVlblggJiYgc2NyZWVuWSAmJiAhc3Rvcm0uZGlzYWJsZWQpIHtcclxuICAgICAgc3Rvcm0uaW5pdCgpO1xyXG4gICAgICBzdG9ybS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGZ1bmN0aW9uIGRvRGVsYXllZFN0YXJ0KCkge1xyXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHN0b3JtLnN0YXJ0KHRydWUpO1xyXG4gICAgfSwgMjApO1xyXG4gICAgLy8gZXZlbnQgY2xlYW51cFxyXG4gICAgc3Rvcm0uZXZlbnRzLnJlbW92ZShpc0lFP2RvY3VtZW50OndpbmRvdywnbW91c2Vtb3ZlJyxkb0RlbGF5ZWRTdGFydCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkb1N0YXJ0KCkge1xyXG4gICAgaWYgKCFzdG9ybS5leGNsdWRlTW9iaWxlIHx8ICFpc01vYmlsZSkge1xyXG4gICAgICBkb0RlbGF5ZWRTdGFydCgpO1xyXG4gICAgfVxyXG4gICAgLy8gZXZlbnQgY2xlYW51cFxyXG4gICAgc3Rvcm0uZXZlbnRzLnJlbW92ZSh3aW5kb3csICdsb2FkJywgZG9TdGFydCk7XHJcbiAgfVxyXG5cclxuICAvLyBob29rcyBmb3Igc3RhcnRpbmcgdGhlIHNub3dcclxuICBpZiAoc3Rvcm0uYXV0b1N0YXJ0KSB7XHJcbiAgICBzdG9ybS5ldmVudHMuYWRkKHdpbmRvdywgJ2xvYWQnLCBkb1N0YXJ0LCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxuXHJcbn0od2luZG93LCBkb2N1bWVudCkpO1xyXG4iLCIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5zbm93U3Rvcm0gPSByZXF1aXJlIFwic25vd3N0b3JtXCJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXVxuXG5UZXh0TGF5ZXIgPSByZXF1aXJlIFwiVGV4dExheWVyXCJcbkR5bmFtaWNMb2FkZXIgPSByZXF1aXJlIFwiRHluYW1pY0xvYWRlclwiIiwiY2xhc3MgVGV4dExheWVyIGV4dGVuZHMgTGF5ZXJcblx0XHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zPXt9KSAtPlxuXHRcdEBkb0F1dG9TaXplID0gZmFsc2Vcblx0XHRAZG9BdXRvU2l6ZUhlaWdodCA9IGZhbHNlXG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPz0gaWYgb3B0aW9ucy5zZXR1cCB0aGVuIFwiaHNsYSg2MCwgOTAlLCA0NyUsIC40KVwiIGVsc2UgXCJ0cmFuc3BhcmVudFwiXG5cdFx0b3B0aW9ucy5jb2xvciA/PSBcInJlZFwiXG5cdFx0b3B0aW9ucy5saW5lSGVpZ2h0ID89IDEuMjVcblx0XHRvcHRpb25zLmZvbnRGYW1pbHkgPz0gXCJIZWx2ZXRpY2FcIlxuXHRcdG9wdGlvbnMuZm9udFNpemUgPz0gMjBcblx0XHRvcHRpb25zLnRleHQgPz0gXCJVc2UgbGF5ZXIudGV4dCB0byBhZGQgdGV4dFwiXG5cdFx0c3VwZXIgb3B0aW9uc1xuXHRcdEBzdHlsZS53aGl0ZVNwYWNlID0gXCJwcmUtbGluZVwiICMgYWxsb3cgXFxuIGluIC50ZXh0XG5cdFx0QHN0eWxlLm91dGxpbmUgPSBcIm5vbmVcIiAjIG5vIGJvcmRlciB3aGVuIHNlbGVjdGVkXG5cdFx0XG5cdHNldFN0eWxlOiAocHJvcGVydHksIHZhbHVlLCBweFN1ZmZpeCA9IGZhbHNlKSAtPlxuXHRcdEBzdHlsZVtwcm9wZXJ0eV0gPSBpZiBweFN1ZmZpeCB0aGVuIHZhbHVlK1wicHhcIiBlbHNlIHZhbHVlXG5cdFx0QGVtaXQoXCJjaGFuZ2U6I3twcm9wZXJ0eX1cIiwgdmFsdWUpXG5cdFx0aWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuXHRcdFxuXHRjYWxjU2l6ZTogLT5cblx0XHRzaXplQWZmZWN0aW5nU3R5bGVzID1cblx0XHRcdGxpbmVIZWlnaHQ6IEBzdHlsZVtcImxpbmUtaGVpZ2h0XCJdXG5cdFx0XHRmb250U2l6ZTogQHN0eWxlW1wiZm9udC1zaXplXCJdXG5cdFx0XHRmb250V2VpZ2h0OiBAc3R5bGVbXCJmb250LXdlaWdodFwiXVxuXHRcdFx0cGFkZGluZ1RvcDogQHN0eWxlW1wicGFkZGluZy10b3BcIl1cblx0XHRcdHBhZGRpbmdSaWdodDogQHN0eWxlW1wicGFkZGluZy1yaWdodFwiXVxuXHRcdFx0cGFkZGluZ0JvdHRvbTogQHN0eWxlW1wicGFkZGluZy1ib3R0b21cIl1cblx0XHRcdHBhZGRpbmdMZWZ0OiBAc3R5bGVbXCJwYWRkaW5nLWxlZnRcIl1cblx0XHRcdHRleHRUcmFuc2Zvcm06IEBzdHlsZVtcInRleHQtdHJhbnNmb3JtXCJdXG5cdFx0XHRib3JkZXJXaWR0aDogQHN0eWxlW1wiYm9yZGVyLXdpZHRoXCJdXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiBAc3R5bGVbXCJsZXR0ZXItc3BhY2luZ1wiXVxuXHRcdFx0Zm9udEZhbWlseTogQHN0eWxlW1wiZm9udC1mYW1pbHlcIl1cblx0XHRcdGZvbnRTdHlsZTogQHN0eWxlW1wiZm9udC1zdHlsZVwiXVxuXHRcdFx0Zm9udFZhcmlhbnQ6IEBzdHlsZVtcImZvbnQtdmFyaWFudFwiXVxuXHRcdGNvbnN0cmFpbnRzID0ge31cblx0XHRpZiBAZG9BdXRvU2l6ZUhlaWdodCB0aGVuIGNvbnN0cmFpbnRzLndpZHRoID0gQHdpZHRoXG5cdFx0c2l6ZSA9IFV0aWxzLnRleHRTaXplIEB0ZXh0LCBzaXplQWZmZWN0aW5nU3R5bGVzLCBjb25zdHJhaW50c1xuXHRcdGlmIEBzdHlsZS50ZXh0QWxpZ24gaXMgXCJyaWdodFwiXG5cdFx0XHRAd2lkdGggPSBzaXplLndpZHRoXG5cdFx0XHRAeCA9IEB4LUB3aWR0aFxuXHRcdGVsc2Vcblx0XHRcdEB3aWR0aCA9IHNpemUud2lkdGhcblx0XHRAaGVpZ2h0ID0gc2l6ZS5oZWlnaHRcblxuXHRAZGVmaW5lIFwiYXV0b1NpemVcIixcblx0XHRnZXQ6IC0+IEBkb0F1dG9TaXplXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0QGRvQXV0b1NpemUgPSB2YWx1ZVxuXHRcdFx0aWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuXHRAZGVmaW5lIFwiYXV0b1NpemVIZWlnaHRcIixcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAZG9BdXRvU2l6ZSA9IHZhbHVlXG5cdFx0XHRAZG9BdXRvU2l6ZUhlaWdodCA9IHZhbHVlXG5cdFx0XHRpZiBAZG9BdXRvU2l6ZSB0aGVuIEBjYWxjU2l6ZSgpXG5cdEBkZWZpbmUgXCJjb250ZW50RWRpdGFibGVcIixcblx0XHRzZXQ6IChib29sZWFuKSAtPlxuXHRcdFx0QF9lbGVtZW50LmNvbnRlbnRFZGl0YWJsZSA9IGJvb2xlYW5cblx0XHRcdEBpZ25vcmVFdmVudHMgPSAhYm9vbGVhblxuXHRcdFx0QG9uIFwiaW5wdXRcIiwgLT4gQGNhbGNTaXplKCkgaWYgQGRvQXV0b1NpemVcblx0QGRlZmluZSBcInRleHRcIixcblx0XHRnZXQ6IC0+IEBfZWxlbWVudC50ZXh0Q29udGVudFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QF9lbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWVcblx0XHRcdEBlbWl0KFwiY2hhbmdlOnRleHRcIiwgdmFsdWUpXG5cdFx0XHRpZiBAZG9BdXRvU2l6ZSB0aGVuIEBjYWxjU2l6ZSgpXG5cdEBkZWZpbmUgXCJmb250RmFtaWx5XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRGYW1pbHlcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udEZhbWlseVwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImZvbnRTaXplXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRTaXplLnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRTaXplXCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwibGluZUhlaWdodFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5saW5lSGVpZ2h0IFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJsaW5lSGVpZ2h0XCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwiZm9udFdlaWdodFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250V2VpZ2h0IFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250V2VpZ2h0XCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwiZm9udFN0eWxlXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRTdHlsZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250U3R5bGVcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJmb250VmFyaWFudFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250VmFyaWFudFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250VmFyaWFudFwiLCB2YWx1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdcIixcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAc2V0U3R5bGUoXCJwYWRkaW5nVG9wXCIsIHZhbHVlLCB0cnVlKVxuXHRcdFx0QHNldFN0eWxlKFwicGFkZGluZ1JpZ2h0XCIsIHZhbHVlLCB0cnVlKVxuXHRcdFx0QHNldFN0eWxlKFwicGFkZGluZ0JvdHRvbVwiLCB2YWx1ZSwgdHJ1ZSlcblx0XHRcdEBzZXRTdHlsZShcInBhZGRpbmdMZWZ0XCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ1RvcFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5wYWRkaW5nVG9wLnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInBhZGRpbmdUb3BcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nUmlnaHRcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUucGFkZGluZ1JpZ2h0LnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInBhZGRpbmdSaWdodFwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdCb3R0b21cIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUucGFkZGluZ0JvdHRvbS5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nQm90dG9tXCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ0xlZnRcIixcblx0XHRnZXQ6IC0+IEBzdHlsZS5wYWRkaW5nTGVmdC5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nTGVmdFwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInRleHRBbGlnblwiLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJ0ZXh0QWxpZ25cIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJ0ZXh0VHJhbnNmb3JtXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLnRleHRUcmFuc2Zvcm0gXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInRleHRUcmFuc2Zvcm1cIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJsZXR0ZXJTcGFjaW5nXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmxldHRlclNwYWNpbmcucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwibGV0dGVyU3BhY2luZ1wiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcImxlbmd0aFwiLCBcblx0XHRnZXQ6IC0+IEB0ZXh0Lmxlbmd0aFxuXG5jb252ZXJ0VG9UZXh0TGF5ZXIgPSAobGF5ZXIpIC0+XG5cdHQgPSBuZXcgVGV4dExheWVyXG5cdFx0bmFtZTogbGF5ZXIubmFtZVxuXHRcdGZyYW1lOiBsYXllci5mcmFtZVxuXHRcdHBhcmVudDogbGF5ZXIucGFyZW50XG5cdFxuXHRjc3NPYmogPSB7fVxuXHRjc3MgPSBsYXllci5faW5mby5tZXRhZGF0YS5jc3Ncblx0Y3NzLmZvckVhY2ggKHJ1bGUpIC0+XG5cdFx0cmV0dXJuIGlmIF8uY29udGFpbnMgcnVsZSwgJy8qJ1xuXHRcdGFyciA9IHJ1bGUuc3BsaXQoJzogJylcblx0XHRjc3NPYmpbYXJyWzBdXSA9IGFyclsxXS5yZXBsYWNlKCc7JywnJylcblx0dC5zdHlsZSA9IGNzc09ialxuXHRcblx0aW1wb3J0UGF0aCA9IGxheWVyLl9fZnJhbWVySW1wb3J0ZWRGcm9tUGF0aFxuXHRpZiBfLmNvbnRhaW5zIGltcG9ydFBhdGgsICdAMngnXG5cdFx0dC5mb250U2l6ZSAqPSAyXG5cdFx0dC5saW5lSGVpZ2h0ID0gKHBhcnNlSW50KHQubGluZUhlaWdodCkqMikrJ3B4J1xuXHRcdHQubGV0dGVyU3BhY2luZyAqPSAyXG5cdFx0XHRcdFx0XG5cdHQueSAtPSAocGFyc2VJbnQodC5saW5lSGVpZ2h0KS10LmZvbnRTaXplKS8yICMgY29tcGVuc2F0ZSBmb3IgaG93IENTUyBoYW5kbGVzIGxpbmUgaGVpZ2h0XG5cdHQueSAtPSB0LmZvbnRTaXplICogMC4xICMgc2tldGNoIHBhZGRpbmdcblx0dC54IC09IHQuZm9udFNpemUgKiAwLjA4ICMgc2tldGNoIHBhZGRpbmdcblx0dC53aWR0aCArPSB0LmZvbnRTaXplICogMC41ICMgc2tldGNoIHBhZGRpbmdcblxuXHR0LnRleHQgPSBsYXllci5faW5mby5tZXRhZGF0YS5zdHJpbmdcblx0bGF5ZXIuZGVzdHJveSgpXG5cdHJldHVybiB0XG5cbkxheWVyOjpjb252ZXJ0VG9UZXh0TGF5ZXIgPSAtPiBjb252ZXJ0VG9UZXh0TGF5ZXIoQClcblxuY29udmVydFRleHRMYXllcnMgPSAob2JqKSAtPlxuXHRmb3IgcHJvcCxsYXllciBvZiBvYmpcblx0XHRpZiBsYXllci5faW5mby5raW5kIGlzIFwidGV4dFwiXG5cdFx0XHRvYmpbcHJvcF0gPSBjb252ZXJ0VG9UZXh0TGF5ZXIobGF5ZXIpXG5cbiMgQmFja3dhcmRzIGNvbXBhYmlsaXR5LiBSZXBsYWNlZCBieSBjb252ZXJ0VG9UZXh0TGF5ZXIoKVxuTGF5ZXI6OmZyYW1lQXNUZXh0TGF5ZXIgPSAocHJvcGVydGllcykgLT5cbiAgICB0ID0gbmV3IFRleHRMYXllclxuICAgIHQuZnJhbWUgPSBAZnJhbWVcbiAgICB0LnN1cGVyTGF5ZXIgPSBAc3VwZXJMYXllclxuICAgIF8uZXh0ZW5kIHQscHJvcGVydGllc1xuICAgIEBkZXN0cm95KClcbiAgICB0XG5cbmV4cG9ydHMuVGV4dExheWVyID0gVGV4dExheWVyXG5leHBvcnRzLmNvbnZlcnRUZXh0TGF5ZXJzID0gY29udmVydFRleHRMYXllcnNcbiIsIiMjI1xuRHluYW1pY0xvYWRlciBNb2R1bGUgZm9yIEZyYW1lckpTXG5odHRwczovL2dpdGh1Yi5jb20vTHVjaWVuTGVlL2ZyYW1lci1EeW5hbWljTG9hZGVyL1xuXG5DcmVhdGVkIGJ5IEx1Y2llbiBMZWUgKEBsdWNpZW5kZWVyKSwgSmFuLiAxMnRoLCAyMDE2XG5cbkR5bmFtaWNMb2FkZXIgYnJhZWtzIHRoZSBiYXJyaWFycyBiZXR3ZWVuIDNyZCBwYXJ0eSB3ZWIgZGV2ZWxvcG1lbnQgbGlicmFyaWVzIGFuZCBGcmFtZXIsIHdoaWNoXG5oZWxwIHlvdSBsb2FkIGxvY2FsLCBleHRlcm5hbCBzdHlsZXNoZWV0cyBhbmQgc2NyaXB0cyBkeW5hbWljYWxseS5cblxuQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby5cblx0e0R5bmFtaWNMb2FkZXJ9ID0gcmVxdWlyZSAnRHluYW1pY0xvYWRlcidcblxuW0xvYWQgb25lIGZpbGVdXG5EeW5hbWljTG9hZGVyLmFkZCgnc2NyaXB0LmpzJykudGhlbigtPlxuIyB3aGVuIHNjcmlwdC5qcyBsb2FkZWQgc3VjY2Vzc2Z1bGx5XG4uLi5cbikuY2F0Y2goLT5cbiMgd2hlbiBzY3JpcHQuanMgbG9hZGVkIGZhaWxlZFxuLi4uXG4pXG5cbltMb2FkIGZpbGUgaW4gc2VyaWVzXVxuRHluYW1pY0xvYWRlci5zZXJpZXMoWydvbmUuanMnLCAndHdvLmNzcycsIC4uLl0pLnRoZW4oIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbENhbGxiYWNrIClcblxuW0xvYWQgZmlsZSBpbiBwYXJhbGxlbF1cbkR5bmFtaWNMb2FkZXIuc2VyaWVzKFsnb25lLmpzJywgJ3R3by5jc3MnLCAuLi5dKS50aGVuKCBzdWNjZXNzQ2FsbGJhY2ssIGZhaWxDYWxsYmFjayApXG5cbiMjI1xuXG5cblxuXG5jbGFzcyBleHBvcnRzLkR5bmFtaWNMb2FkZXJcblxuXHQjIFByb21pc2lmeSBzaW5nbGUgZHluYW1pYyBzY3JpcHQgbG9hZGluZ1xuXHRAYWRkID0gKHVybCkgLT5cblx0XHRwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgLT5cblx0XHRcdGlmIHVybC5zdWJzdHIoIHVybC5sYXN0SW5kZXhPZignLicpICkgaXMgXCIuanNcIlxuXHRcdFx0XHQjIGxvYWQgc2NyaXB0IG9uY2Vcblx0XHRcdFx0bG9hZGVkID0gQXJyYXkucHJvdG90eXBlLmZpbmQuY2FsbCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JyksIChlbGVtZW50KSAtPlxuXHRcdFx0XHRcdGlmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzcmMnKSBpcyB1cmwgdGhlbiByZXR1cm4gZWxlbWVudFxuXHRcdFx0XHRpZiBsb2FkZWQgaXNudCB1bmRlZmluZWQgdGhlbiByZXR1cm4gcmVzb2x2ZSAnaGF2ZSBsb2FkZWQnXG5cblx0XHRcdFx0ZmlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ3NjcmlwdCdcblx0XHRcdFx0ZmlsZS5zcmMgPSB1cmxcblx0XHRcdGVsc2UgaWYgdXJsLnN1YnN0ciggdXJsLmxhc3RJbmRleE9mKCcuJykgKSBpcyBcIi5jc3NcIlxuXHRcdFx0XHQjIGxvYWQgc3R5bGUgb25jZVxuXHRcdFx0XHRsb2FkZWQgPSBBcnJheS5wcm90b3R5cGUuZmluZC5jYWxsIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaW5rJyksIChlbGVtZW50KSAtPlxuXHRcdFx0XHRcdGlmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdyZWwnKSBpcyB1cmwgdGhlbiByZXR1cm4gZWxlbWVudFxuXHRcdFx0XHRpZiBsb2FkZWQgaXNudCB1bmRlZmluZWQgdGhlbiByZXR1cm4gcmVzb2x2ZSAnaGF2ZSBsb2FkZWQnXG5cblx0XHRcdFx0ZmlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2xpbmsnXG5cdFx0XHRcdGZpbGUucmVsID0gXCJzdHlsZXNoZWV0XCJcblx0XHRcdFx0ZmlsZS5ocmVmID0gdXJsXG5cblx0XHRcdGZpbGUuYWRkRXZlbnRMaXN0ZW5lciAnbG9hZCcsIC0+XG5cdFx0XHRcdHJlc29sdmUgZmlsZVxuXHRcdFx0ZmlsZS5hZGRFdmVudExpc3RlbmVyICdlcnJvcicsIC0+XG5cdFx0XHRcdHJlamVjdCBmaWxlXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIGZpbGVcblx0XHQpXG5cblx0XHRyZXR1cm4gcHJvbWlzZVxuXG5cdCMgRHluYW1pYyBmaWxlIGxvYWRpbmcgaW4gc2VyaWVzXG5cdEBzZXJpZXMgPSAodXJscykgLT5cblx0XHRpZiAhQXJyYXkuaXNBcnJheSh1cmxzKSBvciB1cmxzLmxlbmd0aCBpcyAwIHRoZW4gdGhyb3cgXCJFUlJPUjogTk8gVVJMIElOIEFSUkFZIVwiXG5cblx0XHRyZXR1cm4gdXJscy5yZWR1Y2UoXG5cdFx0XHQocHJvbWlzZSwgdXJsKSA9PlxuXHRcdFx0XHRyZXR1cm4gcHJvbWlzZS50aGVuKCA9PiBAYWRkKHVybCkgKVxuXHRcdFx0LFxuXHRcdFx0UHJvbWlzZS5yZXNvbHZlKCkpXG5cblx0IyBEeW5hbWljIGZpbGUgbG9hZGluZyBpbiBwYXJhbGxlbFxuXHRAcGFyYWxsZWwgPSAodXJscykgLT5cblx0XHRpZiAhQXJyYXkuaXNBcnJheSh1cmxzKSBvciB1cmxzLmxlbmd0aCBpcyAwIHRoZW4gdGhyb3cgXCJFUlJPUjogTk8gVVJMIElOIEFSUkFZIVwiXG5cblx0XHRQcm9taXNlLmFsbChcblx0XHRcdHVybHMubWFwKCAodXJsKSA9PlxuXHRcdFx0XHRyZXR1cm4gQGFkZCh1cmwpXG5cdFx0KSkiLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUtBQTs7QURBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0NNLE9BQU8sQ0FBQzs7O0VBR2IsYUFBQyxDQUFBLEdBQUQsR0FBTyxTQUFDLEdBQUQ7QUFDTixRQUFBO0lBQUEsT0FBQSxHQUFjLElBQUEsT0FBQSxDQUFRLFNBQUMsT0FBRCxFQUFVLE1BQVY7QUFDckIsVUFBQTtNQUFBLElBQUcsR0FBRyxDQUFDLE1BQUosQ0FBWSxHQUFHLENBQUMsV0FBSixDQUFnQixHQUFoQixDQUFaLENBQUEsS0FBc0MsS0FBekM7UUFFQyxNQUFBLEdBQVMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBckIsQ0FBMEIsUUFBUSxDQUFDLG9CQUFULENBQThCLFFBQTlCLENBQTFCLEVBQW1FLFNBQUMsT0FBRDtVQUMzRSxJQUFHLE9BQU8sQ0FBQyxZQUFSLENBQXFCLEtBQXJCLENBQUEsS0FBK0IsR0FBbEM7QUFBMkMsbUJBQU8sUUFBbEQ7O1FBRDJFLENBQW5FO1FBRVQsSUFBRyxNQUFBLEtBQVksTUFBZjtBQUE4QixpQkFBTyxPQUFBLENBQVEsYUFBUixFQUFyQzs7UUFFQSxJQUFBLEdBQU8sUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkI7UUFDUCxJQUFJLENBQUMsR0FBTCxHQUFXLElBUFo7T0FBQSxNQVFLLElBQUcsR0FBRyxDQUFDLE1BQUosQ0FBWSxHQUFHLENBQUMsV0FBSixDQUFnQixHQUFoQixDQUFaLENBQUEsS0FBc0MsTUFBekM7UUFFSixNQUFBLEdBQVMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBckIsQ0FBMEIsUUFBUSxDQUFDLG9CQUFULENBQThCLE1BQTlCLENBQTFCLEVBQWlFLFNBQUMsT0FBRDtVQUN6RSxJQUFHLE9BQU8sQ0FBQyxZQUFSLENBQXFCLEtBQXJCLENBQUEsS0FBK0IsR0FBbEM7QUFBMkMsbUJBQU8sUUFBbEQ7O1FBRHlFLENBQWpFO1FBRVQsSUFBRyxNQUFBLEtBQVksTUFBZjtBQUE4QixpQkFBTyxPQUFBLENBQVEsYUFBUixFQUFyQzs7UUFFQSxJQUFBLEdBQU8sUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkI7UUFDUCxJQUFJLENBQUMsR0FBTCxHQUFXO1FBQ1gsSUFBSSxDQUFDLElBQUwsR0FBWSxJQVJSOztNQVVMLElBQUksQ0FBQyxnQkFBTCxDQUFzQixNQUF0QixFQUE4QixTQUFBO2VBQzdCLE9BQUEsQ0FBUSxJQUFSO01BRDZCLENBQTlCO01BRUEsSUFBSSxDQUFDLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLFNBQUE7ZUFDOUIsTUFBQSxDQUFPLElBQVA7TUFEOEIsQ0FBL0I7YUFFQSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQWQsQ0FBMEIsSUFBMUI7SUF2QnFCLENBQVI7QUEwQmQsV0FBTztFQTNCRDs7RUE4QlAsYUFBQyxDQUFBLE1BQUQsR0FBVSxTQUFDLElBQUQ7SUFDVCxJQUFHLENBQUMsS0FBSyxDQUFDLE9BQU4sQ0FBYyxJQUFkLENBQUQsSUFBd0IsSUFBSSxDQUFDLE1BQUwsS0FBZSxDQUExQztBQUFpRCxZQUFNLDBCQUF2RDs7QUFFQSxXQUFPLElBQUksQ0FBQyxNQUFMLENBQ04sQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLE9BQUQsRUFBVSxHQUFWO0FBQ0MsZUFBTyxPQUFPLENBQUMsSUFBUixDQUFjLFNBQUE7aUJBQUcsS0FBQyxDQUFBLEdBQUQsQ0FBSyxHQUFMO1FBQUgsQ0FBZDtNQURSO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQURNLEVBSU4sT0FBTyxDQUFDLE9BQVIsQ0FBQSxDQUpNO0VBSEU7O0VBVVYsYUFBQyxDQUFBLFFBQUQsR0FBWSxTQUFDLElBQUQ7SUFDWCxJQUFHLENBQUMsS0FBSyxDQUFDLE9BQU4sQ0FBYyxJQUFkLENBQUQsSUFBd0IsSUFBSSxDQUFDLE1BQUwsS0FBZSxDQUExQztBQUFpRCxZQUFNLDBCQUF2RDs7V0FFQSxPQUFPLENBQUMsR0FBUixDQUNDLElBQUksQ0FBQyxHQUFMLENBQVUsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLEdBQUQ7QUFDVCxlQUFPLEtBQUMsQ0FBQSxHQUFELENBQUssR0FBTDtNQURFO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFWLENBREQ7RUFIVzs7Ozs7Ozs7QUQzRWIsSUFBQSxnREFBQTtFQUFBOzs7QUFBTTs7O0VBRVEsbUJBQUMsT0FBRDs7TUFBQyxVQUFROztJQUNyQixJQUFDLENBQUEsVUFBRCxHQUFjO0lBQ2QsSUFBQyxDQUFBLGdCQUFELEdBQW9COztNQUNwQixPQUFPLENBQUMsa0JBQXNCLE9BQU8sQ0FBQyxLQUFYLEdBQXNCLHdCQUF0QixHQUFvRDs7O01BQy9FLE9BQU8sQ0FBQyxRQUFTOzs7TUFDakIsT0FBTyxDQUFDLGFBQWM7OztNQUN0QixPQUFPLENBQUMsYUFBYzs7O01BQ3RCLE9BQU8sQ0FBQyxXQUFZOzs7TUFDcEIsT0FBTyxDQUFDLE9BQVE7O0lBQ2hCLDJDQUFNLE9BQU47SUFDQSxJQUFDLENBQUEsS0FBSyxDQUFDLFVBQVAsR0FBb0I7SUFDcEIsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLEdBQWlCO0VBWEw7O3NCQWFiLFFBQUEsR0FBVSxTQUFDLFFBQUQsRUFBVyxLQUFYLEVBQWtCLFFBQWxCOztNQUFrQixXQUFXOztJQUN0QyxJQUFDLENBQUEsS0FBTSxDQUFBLFFBQUEsQ0FBUCxHQUFzQixRQUFILEdBQWlCLEtBQUEsR0FBTSxJQUF2QixHQUFpQztJQUNwRCxJQUFDLENBQUEsSUFBRCxDQUFNLFNBQUEsR0FBVSxRQUFoQixFQUE0QixLQUE1QjtJQUNBLElBQUcsSUFBQyxDQUFBLFVBQUo7YUFBb0IsSUFBQyxDQUFBLFFBQUQsQ0FBQSxFQUFwQjs7RUFIUzs7c0JBS1YsUUFBQSxHQUFVLFNBQUE7QUFDVCxRQUFBO0lBQUEsbUJBQUEsR0FDQztNQUFBLFVBQUEsRUFBWSxJQUFDLENBQUEsS0FBTSxDQUFBLGFBQUEsQ0FBbkI7TUFDQSxRQUFBLEVBQVUsSUFBQyxDQUFBLEtBQU0sQ0FBQSxXQUFBLENBRGpCO01BRUEsVUFBQSxFQUFZLElBQUMsQ0FBQSxLQUFNLENBQUEsYUFBQSxDQUZuQjtNQUdBLFVBQUEsRUFBWSxJQUFDLENBQUEsS0FBTSxDQUFBLGFBQUEsQ0FIbkI7TUFJQSxZQUFBLEVBQWMsSUFBQyxDQUFBLEtBQU0sQ0FBQSxlQUFBLENBSnJCO01BS0EsYUFBQSxFQUFlLElBQUMsQ0FBQSxLQUFNLENBQUEsZ0JBQUEsQ0FMdEI7TUFNQSxXQUFBLEVBQWEsSUFBQyxDQUFBLEtBQU0sQ0FBQSxjQUFBLENBTnBCO01BT0EsYUFBQSxFQUFlLElBQUMsQ0FBQSxLQUFNLENBQUEsZ0JBQUEsQ0FQdEI7TUFRQSxXQUFBLEVBQWEsSUFBQyxDQUFBLEtBQU0sQ0FBQSxjQUFBLENBUnBCO01BU0EsYUFBQSxFQUFlLElBQUMsQ0FBQSxLQUFNLENBQUEsZ0JBQUEsQ0FUdEI7TUFVQSxVQUFBLEVBQVksSUFBQyxDQUFBLEtBQU0sQ0FBQSxhQUFBLENBVm5CO01BV0EsU0FBQSxFQUFXLElBQUMsQ0FBQSxLQUFNLENBQUEsWUFBQSxDQVhsQjtNQVlBLFdBQUEsRUFBYSxJQUFDLENBQUEsS0FBTSxDQUFBLGNBQUEsQ0FacEI7O0lBYUQsV0FBQSxHQUFjO0lBQ2QsSUFBRyxJQUFDLENBQUEsZ0JBQUo7TUFBMEIsV0FBVyxDQUFDLEtBQVosR0FBb0IsSUFBQyxDQUFBLE1BQS9DOztJQUNBLElBQUEsR0FBTyxLQUFLLENBQUMsUUFBTixDQUFlLElBQUMsQ0FBQSxJQUFoQixFQUFzQixtQkFBdEIsRUFBMkMsV0FBM0M7SUFDUCxJQUFHLElBQUMsQ0FBQSxLQUFLLENBQUMsU0FBUCxLQUFvQixPQUF2QjtNQUNDLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBSSxDQUFDO01BQ2QsSUFBQyxDQUFBLENBQUQsR0FBSyxJQUFDLENBQUEsQ0FBRCxHQUFHLElBQUMsQ0FBQSxNQUZWO0tBQUEsTUFBQTtNQUlDLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBSSxDQUFDLE1BSmY7O1dBS0EsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFJLENBQUM7RUF2Qk47O0VBeUJWLFNBQUMsQ0FBQSxNQUFELENBQVEsVUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUE7SUFBSixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxVQUFELEdBQWM7TUFDZCxJQUFHLElBQUMsQ0FBQSxVQUFKO2VBQW9CLElBQUMsQ0FBQSxRQUFELENBQUEsRUFBcEI7O0lBRkksQ0FETDtHQUREOztFQUtBLFNBQUMsQ0FBQSxNQUFELENBQVEsZ0JBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7TUFDSixJQUFDLENBQUEsVUFBRCxHQUFjO01BQ2QsSUFBQyxDQUFBLGdCQUFELEdBQW9CO01BQ3BCLElBQUcsSUFBQyxDQUFBLFVBQUo7ZUFBb0IsSUFBQyxDQUFBLFFBQUQsQ0FBQSxFQUFwQjs7SUFISSxDQUFMO0dBREQ7O0VBS0EsU0FBQyxDQUFBLE1BQUQsQ0FBUSxpQkFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUMsT0FBRDtNQUNKLElBQUMsQ0FBQSxRQUFRLENBQUMsZUFBVixHQUE0QjtNQUM1QixJQUFDLENBQUEsWUFBRCxHQUFnQixDQUFDO2FBQ2pCLElBQUMsQ0FBQSxFQUFELENBQUksT0FBSixFQUFhLFNBQUE7UUFBRyxJQUFlLElBQUMsQ0FBQSxVQUFoQjtpQkFBQSxJQUFDLENBQUEsUUFBRCxDQUFBLEVBQUE7O01BQUgsQ0FBYjtJQUhJLENBQUw7R0FERDs7RUFLQSxTQUFDLENBQUEsTUFBRCxDQUFRLE1BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLFFBQVEsQ0FBQztJQUFiLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO01BQ0osSUFBQyxDQUFBLFFBQVEsQ0FBQyxXQUFWLEdBQXdCO01BQ3hCLElBQUMsQ0FBQSxJQUFELENBQU0sYUFBTixFQUFxQixLQUFyQjtNQUNBLElBQUcsSUFBQyxDQUFBLFVBQUo7ZUFBb0IsSUFBQyxDQUFBLFFBQUQsQ0FBQSxFQUFwQjs7SUFISSxDQURMO0dBREQ7O0VBTUEsU0FBQyxDQUFBLE1BQUQsQ0FBUSxZQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxLQUFLLENBQUM7SUFBVixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxRQUFELENBQVUsWUFBVixFQUF3QixLQUF4QjtJQUFYLENBREw7R0FERDs7RUFHQSxTQUFDLENBQUEsTUFBRCxDQUFRLFVBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBaEIsQ0FBd0IsSUFBeEIsRUFBNkIsRUFBN0I7SUFBSCxDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxRQUFELENBQVUsVUFBVixFQUFzQixLQUF0QixFQUE2QixJQUE3QjtJQUFYLENBREw7R0FERDs7RUFHQSxTQUFDLENBQUEsTUFBRCxDQUFRLFlBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEtBQUssQ0FBQztJQUFWLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLFFBQUQsQ0FBVSxZQUFWLEVBQXdCLEtBQXhCO0lBQVgsQ0FETDtHQUREOztFQUdBLFNBQUMsQ0FBQSxNQUFELENBQVEsWUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsS0FBSyxDQUFDO0lBQVYsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsUUFBRCxDQUFVLFlBQVYsRUFBd0IsS0FBeEI7SUFBWCxDQURMO0dBREQ7O0VBR0EsU0FBQyxDQUFBLE1BQUQsQ0FBUSxXQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxLQUFLLENBQUM7SUFBVixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxRQUFELENBQVUsV0FBVixFQUF1QixLQUF2QjtJQUFYLENBREw7R0FERDs7RUFHQSxTQUFDLENBQUEsTUFBRCxDQUFRLGFBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEtBQUssQ0FBQztJQUFWLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLFFBQUQsQ0FBVSxhQUFWLEVBQXlCLEtBQXpCO0lBQVgsQ0FETDtHQUREOztFQUdBLFNBQUMsQ0FBQSxNQUFELENBQVEsU0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxRQUFELENBQVUsWUFBVixFQUF3QixLQUF4QixFQUErQixJQUEvQjtNQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsY0FBVixFQUEwQixLQUExQixFQUFpQyxJQUFqQztNQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsZUFBVixFQUEyQixLQUEzQixFQUFrQyxJQUFsQzthQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsYUFBVixFQUF5QixLQUF6QixFQUFnQyxJQUFoQztJQUpJLENBQUw7R0FERDs7RUFNQSxTQUFDLENBQUEsTUFBRCxDQUFRLFlBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBbEIsQ0FBMEIsSUFBMUIsRUFBK0IsRUFBL0I7SUFBSCxDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxRQUFELENBQVUsWUFBVixFQUF3QixLQUF4QixFQUErQixJQUEvQjtJQUFYLENBREw7R0FERDs7RUFHQSxTQUFDLENBQUEsTUFBRCxDQUFRLGNBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBcEIsQ0FBNEIsSUFBNUIsRUFBaUMsRUFBakM7SUFBSCxDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxRQUFELENBQVUsY0FBVixFQUEwQixLQUExQixFQUFpQyxJQUFqQztJQUFYLENBREw7R0FERDs7RUFHQSxTQUFDLENBQUEsTUFBRCxDQUFRLGVBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBckIsQ0FBNkIsSUFBN0IsRUFBa0MsRUFBbEM7SUFBSCxDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxRQUFELENBQVUsZUFBVixFQUEyQixLQUEzQixFQUFrQyxJQUFsQztJQUFYLENBREw7R0FERDs7RUFHQSxTQUFDLENBQUEsTUFBRCxDQUFRLGFBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBbkIsQ0FBMkIsSUFBM0IsRUFBZ0MsRUFBaEM7SUFBSCxDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxRQUFELENBQVUsYUFBVixFQUF5QixLQUF6QixFQUFnQyxJQUFoQztJQUFYLENBREw7R0FERDs7RUFHQSxTQUFDLENBQUEsTUFBRCxDQUFRLFdBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsUUFBRCxDQUFVLFdBQVYsRUFBdUIsS0FBdkI7SUFBWCxDQUFMO0dBREQ7O0VBRUEsU0FBQyxDQUFBLE1BQUQsQ0FBUSxlQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxLQUFLLENBQUM7SUFBVixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxRQUFELENBQVUsZUFBVixFQUEyQixLQUEzQjtJQUFYLENBREw7R0FERDs7RUFHQSxTQUFDLENBQUEsTUFBRCxDQUFRLGVBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBckIsQ0FBNkIsSUFBN0IsRUFBa0MsRUFBbEM7SUFBSCxDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxRQUFELENBQVUsZUFBVixFQUEyQixLQUEzQixFQUFrQyxJQUFsQztJQUFYLENBREw7R0FERDs7RUFHQSxTQUFDLENBQUEsTUFBRCxDQUFRLFFBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLElBQUksQ0FBQztJQUFULENBQUw7R0FERDs7OztHQTlHdUI7O0FBaUh4QixrQkFBQSxHQUFxQixTQUFDLEtBQUQ7QUFDcEIsTUFBQTtFQUFBLENBQUEsR0FBUSxJQUFBLFNBQUEsQ0FDUDtJQUFBLElBQUEsRUFBTSxLQUFLLENBQUMsSUFBWjtJQUNBLEtBQUEsRUFBTyxLQUFLLENBQUMsS0FEYjtJQUVBLE1BQUEsRUFBUSxLQUFLLENBQUMsTUFGZDtHQURPO0VBS1IsTUFBQSxHQUFTO0VBQ1QsR0FBQSxHQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0VBQzNCLEdBQUcsQ0FBQyxPQUFKLENBQVksU0FBQyxJQUFEO0FBQ1gsUUFBQTtJQUFBLElBQVUsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFYLEVBQWlCLElBQWpCLENBQVY7QUFBQSxhQUFBOztJQUNBLEdBQUEsR0FBTSxJQUFJLENBQUMsS0FBTCxDQUFXLElBQVg7V0FDTixNQUFPLENBQUEsR0FBSSxDQUFBLENBQUEsQ0FBSixDQUFQLEdBQWlCLEdBQUksQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUFQLENBQWUsR0FBZixFQUFtQixFQUFuQjtFQUhOLENBQVo7RUFJQSxDQUFDLENBQUMsS0FBRixHQUFVO0VBRVYsVUFBQSxHQUFhLEtBQUssQ0FBQztFQUNuQixJQUFHLENBQUMsQ0FBQyxRQUFGLENBQVcsVUFBWCxFQUF1QixLQUF2QixDQUFIO0lBQ0MsQ0FBQyxDQUFDLFFBQUYsSUFBYztJQUNkLENBQUMsQ0FBQyxVQUFGLEdBQWUsQ0FBQyxRQUFBLENBQVMsQ0FBQyxDQUFDLFVBQVgsQ0FBQSxHQUF1QixDQUF4QixDQUFBLEdBQTJCO0lBQzFDLENBQUMsQ0FBQyxhQUFGLElBQW1CLEVBSHBCOztFQUtBLENBQUMsQ0FBQyxDQUFGLElBQU8sQ0FBQyxRQUFBLENBQVMsQ0FBQyxDQUFDLFVBQVgsQ0FBQSxHQUF1QixDQUFDLENBQUMsUUFBMUIsQ0FBQSxHQUFvQztFQUMzQyxDQUFDLENBQUMsQ0FBRixJQUFPLENBQUMsQ0FBQyxRQUFGLEdBQWE7RUFDcEIsQ0FBQyxDQUFDLENBQUYsSUFBTyxDQUFDLENBQUMsUUFBRixHQUFhO0VBQ3BCLENBQUMsQ0FBQyxLQUFGLElBQVcsQ0FBQyxDQUFDLFFBQUYsR0FBYTtFQUV4QixDQUFDLENBQUMsSUFBRixHQUFTLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0VBQzlCLEtBQUssQ0FBQyxPQUFOLENBQUE7QUFDQSxTQUFPO0FBM0JhOztBQTZCckIsS0FBSyxDQUFBLFNBQUUsQ0FBQSxrQkFBUCxHQUE0QixTQUFBO1NBQUcsa0JBQUEsQ0FBbUIsSUFBbkI7QUFBSDs7QUFFNUIsaUJBQUEsR0FBb0IsU0FBQyxHQUFEO0FBQ25CLE1BQUE7QUFBQTtPQUFBLFdBQUE7O0lBQ0MsSUFBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQVosS0FBb0IsTUFBdkI7bUJBQ0MsR0FBSSxDQUFBLElBQUEsQ0FBSixHQUFZLGtCQUFBLENBQW1CLEtBQW5CLEdBRGI7S0FBQSxNQUFBOzJCQUFBOztBQUREOztBQURtQjs7QUFNcEIsS0FBSyxDQUFBLFNBQUUsQ0FBQSxnQkFBUCxHQUEwQixTQUFDLFVBQUQ7QUFDdEIsTUFBQTtFQUFBLENBQUEsR0FBSSxJQUFJO0VBQ1IsQ0FBQyxDQUFDLEtBQUYsR0FBVSxJQUFDLENBQUE7RUFDWCxDQUFDLENBQUMsVUFBRixHQUFlLElBQUMsQ0FBQTtFQUNoQixDQUFDLENBQUMsTUFBRixDQUFTLENBQVQsRUFBVyxVQUFYO0VBQ0EsSUFBQyxDQUFBLE9BQUQsQ0FBQTtTQUNBO0FBTnNCOztBQVExQixPQUFPLENBQUMsU0FBUixHQUFvQjs7QUFDcEIsT0FBTyxDQUFDLGlCQUFSLEdBQTRCOzs7O0FEM0o1QixJQUFBOztBQUFBLE9BQU8sQ0FBQyxLQUFSLEdBQWdCOztBQUVoQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFBO1NBQ3BCLEtBQUEsQ0FBTSx1QkFBTjtBQURvQjs7QUFHckIsT0FBTyxDQUFDLE9BQVIsR0FBa0IsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVA7O0FBRWxCLFNBQUEsR0FBWSxPQUFBLENBQVEsV0FBUjs7QUFDWixhQUFBLEdBQWdCLE9BQUEsQ0FBUSxlQUFSOzs7O0FEUmhCLE9BQU8sQ0FBQyxTQUFSLEdBQW9CLE9BQUEsQ0FBUSxXQUFSOztBQUVwQixPQUFPLENBQUMsS0FBUixHQUFnQjs7QUFFaEIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQTtTQUNwQixLQUFBLENBQU0sdUJBQU47QUFEb0I7O0FBR3JCLE9BQU8sQ0FBQyxPQUFSLEdBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQOzs7O0FEWGxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIn0=
