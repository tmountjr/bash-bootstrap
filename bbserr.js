var colors = require('colors');

module.exports = {
	display : function(message) {
		console.log("\n" + ("(Error)" + message).red);
	},

	warn : function(message) {
		console.log("\n" + ("(Warning) " + message).yellow);
	},

	fail : function(message) {
		this.display(message);
		process.exit(1);
	}
};