var exec = require('child_process').execSync,
	bbserr = require('./bbserr.js');

function pull(force) {
	var cmd = '';

	if (force == true) {
		cmd = 'git fetch --all && git reset --hard origin/master';
	} else {
		cmd = 'git pull';
	}

	cmd += ' && git pull --recurse-submodules';

	exec(cmd);
}

module.exports = pull;