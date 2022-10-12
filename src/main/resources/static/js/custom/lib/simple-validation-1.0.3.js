(function(root) {
"use strict";
/**
<pre>
(function() {
	SimpleValidation("#myForm", {
		"[name=id]"
	});
})();
</pre>
 */
var validators = {
	"required": {
		valid: function(el, condition) {
			var v = el.value;
			return isEmpty(v) == condition.value ? condition.message : "";
		}
	},
	"maxlength": {
		valid: function(el, condition) {
			var v = el.value;
			var charArray = String(v).split("");
			return isEmpty(v) || (charArray.length <= condition.value) ? "" : condition.message;
		}
	},
	"minlength": {
		valid: function(el, condition) {
			var v = el.value;
			var charArray = String(v).split("");
			return isEmpty(v) || (charArray.length >= condition.value) ? "" : condition.message;
		}
	},
	"max": {
		valid: function(el, condition) {
			var v = parseFloat(el.value);
			return isEmpty(el.value) || (v <= condition.value) ? "" : condition.message;
		}
	},
	"min": {
		valid: function(el, condition) {
			var v = parseFloat(el.value);
			return isEmpty(el.value) || (v >= condition.value) ? "" : condition.message;
		}
	},
	"pattern": {
		valid: function(el, condition) {
			var v = el.value;
			
			if (isEmpty(v)) { return ""; }
			if (!Array.isArray(condition.value)) { condition.value = [condition.value]; }
			
			for (var i = 0, len = condition.value.length; i < len; i++) {
				var reg = new RegExp(condition.value[i]);
				if (reg.test(v)) { return ""; }
			}
			
			return condition.message;
		}
	},
	"compare": {
		valid: function(el, condition) {
			var v = el.value;
			var targetV = document.querySelector(condition.target).value;
			var f = v == targetV;
			
			return (f === condition.value) ? "" : condition.message;
		}
	}
	/*"file": {
		valid: function(el, condition) {
			// TODO			
			return condition.message;
		}
	}*/
};

function SimpleValidation(selector, validOptions) {
	/** variables */
	var fm; // target form
	
	/** functions */
	// 초기화
	function initialize() {
		return document.querySelector(selector);
	}

	function bind() {
		document.addEventListener("DOMContentLoaded", function() {
			fm = initialize();
		});
	}
	
	/** exec functions */
	if (document.readyState == "loading") {
		bind();
	} else {
		fm = initialize();
	}

	function valid(callback, e, exceptParams) {
		var formElements = findFormElements(fm);
		var message = null;
		if (!Array.isArray(exceptParams)) { exceptParams = []; }

		for (var i = 0, len = formElements.length; i < len; i++) {
			var el = formElements[i];
			var n = el.getAttribute("name");
			var f = true;

			for (var j = 0; j < exceptParams.length; j++) {
				if (n == exceptParams[j]) {
					f = false;
					break;
				}
			}

			if (!validOptions[n] || !f) { continue; }

			var message = validFormElement(el, validOptions[n]);
			
			if (!isEmpty(message)) {
				el.focus();
				if (e) { e.preventDefault(); }
				break;
			}
		}

		if (typeof(callback) == "function") {
			callback(message);
		} else {
			return message;
		}
	}

	function validFormElement (el, validOption) {
		for (var attr in validators) {
			if (validOption[attr]) {
				var message = validators[attr].valid(el, validOption[attr]);
				if (message) { return message; }
			}
		}
		
		return "";
	}

	return { valid: valid };
};

// check empty
function isEmpty(v) {
	return (v === undefined || v === null || v === "");
}

// 자식 요소 중 form elements 찾기
function findFormElements(el) {
	return el.querySelectorAll("input:enabled, textarea:enabled, select:enabled");
}

// 부모 요소 찾기(closest)
function closestByTagName(el, tagName) {
	tagName = tagName.toUpperCase();
	
	do {
		if (el.parentElement === null) { throw new Error("Not found Parent Element"); }
		el = el.parentElement;
	} while (el.tagName !== tagName);
	
	return el;
}

var _root = root;
_root.SimpleValidation = SimpleValidation;
})(window);