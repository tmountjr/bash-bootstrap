#!/usr/bin/env node

var link = require('./link.js'),
	program = require('commander'),
	gitPull = require('./git.js'),
	bbserr = require('./bbserr.js'),
	pjson = require('./package.json');

program
	.version(pjson.version)
	.option('-f, --filename [filename]', 'Link the specified [filename]', '');

program
	.command('repo')
	.description('Commands to update the repository from the remote Git source.')
	.option('--soft-update', 'Update the git repo')
	.option('--hard-update', 'Force the repo to match the remote. ALL UNSAVED CHANGES WILL BE LOST.')
	.action(function(options) {
		if (options.softUpdate && options.hardUpdate) bbserr.fail('Cannot specify both "--soft-update" and "--hard-update". Please choose one or the other.');
		if (! options.softUpdate && ! options.hardUpdate) this.help();

		if (options.softUpdate) gitPull(false);
		if (options.hardUpdate) gitPull(true);

		process.exit(0);
	});

program.parse(process.argv);

// display the help if no filename was passed
if (! program.filename) {
	program.help();
}

link.linkNewFile(program.filename);

// adding a comment here to see if i can update the very file doing the updating.
// adding a second line
