#!/usr/bin/env node

var link = require('./link.js'),
	program = require('commander');

program
	.version('1.0.0')
	.option('-f, --filename [filename]', 'Link only the specified file [profile]', 'profile')
	.parse(process.argv);

link.linkNewFile(program.filename);