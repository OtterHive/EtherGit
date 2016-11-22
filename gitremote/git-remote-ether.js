#!/usr/bin/env node
/* global require */

// This is adapted from here https://github.com/axic/git-remote-mango/blob/master/git-remote-mango

const toPull = require('stream-to-pull-stream');
const pull = require('pull-stream');
const gitRemoteHelper = require('pull-git-remote-helper');
const url = require('url');
const process = require('process');

const Repo = require('./repo.js');

function die () {
    console.error.apply(console, arguments);
    process.exit(1);
}

var args = process.argv.slice(2);
if (args.length < 2) {
    die('Usage: git-remote-mango <name> <url>');
}

var repo = url.parse(args[1]);

if (repo.protocol !== 'ether:') {
    die('Invalid protocol');
}

pull(
    toPull(process.stdin),
    gitRemoteHelper(new Repo(repo.hostname, repo.auth)),
    toPull(process.stdout)
);
