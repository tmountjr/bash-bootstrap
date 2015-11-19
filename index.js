#!/usr/bin/env node

var link = require('./link.js'),
	program = require('commander');

program
	.version('1.0.0')
	.option('-f, --filename [filename]', 'Link the specified [filename]', '')
	.parse(process.argv);

// display the help if no filename was passed
if (! program.filename) {
	program.help();
}

link.linkNewFile(program.filename);
