# ~/.profile: executed by the command interpreter for login shells.
# This file is not read by bash(1), if ~/.bash_profile or ~/.bash_login
# exists.
# see /usr/share/doc/bash/examples/startup-files for examples.
# the files are located in the bash-doc package.

# the default umask is set in /etc/profile; for setting the umask
# for ssh logins, install and configure the libpam-umask package.
#umask 022

# if running bash
if [ -n "$BASH_VERSION" ]; then
    # include .bashrc if it exists
    if [ -f "$HOME/.bashrc" ]; then
	. "$HOME/.bashrc"
    fi
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi

# determine whether we're running on OSX or Linux - the ls configuration is different between BSD and Linux.
if [ $(uname) = 'Darwin' ]; then
	alias ls='ls -ahG'
else
	alias ls='ls -ah --color'
fi

alias ll='ls -lv'
alias whatismyip="curl -s checkip.dyndns.org|sed -e 's/.*Current IP Address: //' -e 's/<.*$//'"

function parse_git_branch () {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

green=$'\e[00;32m'
yellow=$'\e[00;33m'
blue=$'\e[00;34m'
magenta=$'\e[00;35m'
cyan=$'\e[00;36m'
grey=$'\e[00;37m'
normal=$'\e[m'

export PS1="\n\[$green\]\u@\H \[$blue\][\D{%F %T}]\[$magenta\]\$(parse_git_branch) \[$yellow\]\w\[$grey\]\n\\$ \[$normal\]"
