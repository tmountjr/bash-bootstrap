var colors = require('colors');

module.exports = {
	display : function(message) {
		console.log("\n" + message.red);
	},

	fail : function(message) {
		this.display(message);
		process.exit(1);
	}
};