#!/usr/bin/env node

var fs = require('fs'),
	exec = require('child_process').execSync;

function createSymlink(symlinkSource, symlinkDest) {
	fs.symlink(symlinkSource, symlinkDest, function(err) {
		if (err) throw err;

		exec('source ' + symlinkDest);
		return;
	});
}

function LinkException(message) {
	this.message = message;
	this.name = 'LinkException';
}

module.exports = {

	/**
	 * Links a non-dot filename from the source directory to a dot filename in the user's home folder.
	 * Allowed filenames are:
	 * 		.profile
	 * 		.bashrc
	 * 		.bash_profile
	 * @param  {string} filename The source file to link
	 * @return {void}
	 */
	linkNewFile : function(filename) {
		var home 			= require('expand-home-dir'),
			moment 			= require('moment'),
			allowedFiles	= ['profile', 'bashrc', 'bash_profile', 'foo'],
			sourceFile 		= '',
			destFile 		= '',

			// additional supporting variables
			stamp,
			backupDest,
			profileContents;

		// check for a blank filename
		if (!filename || filename.length === 0) {
			throw new LinkException('"filename" value cannot be blank.');
		}

		// check that we're linking an allowed file
		if (allowedFiles.indexOf(filename) === -1) {
			throw new LinkException('Not allowed to link "' + filename + '".');
		}

		sourceFile = __dirname + '/' + filename;
		destFile = home('~/.' + filename);

		fs.lstat(destFile, function(err, stats) {
			if (err) {
				if (err.code == 'ENOENT') {
					// file not found; skip the whole link logic and just create the symlink
					createSymlink(sourceFile, destFile);
					return;
				} else {
					// in all other cases, return the error
					throw err;
				}
			}

			if (! stats.isSymbolicLink()) {
				stamp = moment().format('YYYYMMDDHHmmSS');
				backupDest = home('~/.foo.' + stamp);
				profileContents = fs.readFileSync(destFile);

				fs.writeFileSync(backupDest, profileContents);
			}

			fs.unlinkSync(destFile);
			createSymlink(sourceFile, destFile);
			return;
		});
	}
};