/* global require */

const test = require('tape');
const tests = require('abstract-pull-git-repo/tests');
const EtherRepo = require('../gitremote/repo');

const repo = new EtherRepo();

tests.repo(test, repo);
