# Bash Bootstrap

Install this package globally to centrally manage your `~/.profile`, `~/.bashrc`, and `~/.bash_profile` files:

```shell
npm install -g tmountjr/bash-bootstrap
```

## Usage

This package will automatically create an executable called `bashupdate`.

To re-link one of your bash configuration scripts to the version in this package, run the following command:

```shell
bashupdate -f [profile | bashrc | bash_profile]
```

The only files allowed to be updated via this script are `~/.profile`, `~/.bashrc`, and `~/.bash_profile`. Attempting to link another dotfile will result in an error.

### "repo" command

To do a package self-update, run one of the following commands:

```shell
bashupdate repo --soft-update
```

or

```shell
bashupdate repo --hard-update
```

Running `--soft-update` will simply pull the repo down without discarding any changes. Running `--hard-update` will reset the repo to the most recent commit, discarding any existing work.