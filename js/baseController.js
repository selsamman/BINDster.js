// A controller that contains basic validation and can be extended

function BaseController() {};

BaseController.prototype = {

	// validators
	isName: function () {this.doesMatch("[^0-9A-Za-z \']", "name")},
	isEmail: function () {this.doesMatch("^[^\@ ]+\@[^\@ \.]+\.[^\@ ]+", "email")},
	isNumeric: function () {this.doesMatch("[^0-9]", "numeric")},
	isNumeric: function () {this.doesMatch("[^0-9A-Za-z]", "alphanumeric")},
	isPhone: function () {this.doesMatch("[^0-9 \(\)-]", "phone")},
	notEmpty: function() {
		if (!this.value || this.value.length == 0) {
			throw {message: "required"};
		}
	},
	isMinLength: function(len) {
		if (this.isEmpty() || this.value.length < len) 
			throw {message: "minlength", minlength: len}
	},
	isMaxlength: function(len) {
		if (this.isEmpty || this.value.length > len) 
			throw {message: "maxlength", maxlength: len}
	},
	isEmpty: function(value) {
		return this.value == null || this.value.length == 0
	},
	
	// parsers
	parseCurrency: function() {
		if (!this.value) return this.value;
		var n = this.value;
		n = n.replace(/[^0-9\.\-]/g, "");
		var f = parseFloat(n);
		if (isNaN(f))
			throw {message: "currency"};
		var result = Math.floor(f * 100 + .5) / 100;
		return result;
	},
	parseDate: function() {
		if (this.value == null || this.value.length == "") return null;
		var parsed = Date.parse(this.value);
		if (isNaN(parsed)) {
			throw {message: "date"}
		}
		return new Date(parsed);
	},
	
	// Formatters	
	formatDate: function()	{
		if (!this.value) return this.value;
		var date = this.value;
		return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
	},

	// Format, Parse, Validate common functiosn
	formatCurrency: function(prependSymbol) {
		if(!this.value) return "";
		prependSymbol = (prependSymbol ? prependSymbol : "$") + " ";
		var n = (Math.round(this.value * 100) / 100) + "";
		n = n.replace(/\.([0-9])$/, ".$10");
		return prependSymbol + this.addCommas(n);
	},
	addCommas: function (nStr)	{
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	},
	doesMatch: function(regex, error) {
		if (this.value != null && this.value.length > 0 && !(this.value + "").match(regex))
			throw error ? {message: error} : " Incorrect Format";
	}

}
