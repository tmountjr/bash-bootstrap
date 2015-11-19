var exec = require('child_process').exec,
	bbserr = require('./bbserr.js');

function pull(force) {
	var cmd = '';

	if (force == true) {
		cmd = 'git fetch --all && git reset --hard origin/master';
	} else {
		cmd = 'git pull';
	}

	exec(cmd, function(err, stdout, stderr) {
		if (err) bbserr.fail('Unable to pull from git. Error was: ' + stderr);
		process.exit(0);
	});
}

module.exports = pull;