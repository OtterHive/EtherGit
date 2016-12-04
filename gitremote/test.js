/* global require */
var test = require('tape');
var tests = require('abstract-pull-git-repo/tests');

const Repo = require('./repo.js');

tests.repo(test, new Repo('0x75778f40669feca46441a51bab0da89c86813301'));
