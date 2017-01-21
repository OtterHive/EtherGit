/* global require */
var test = require('tape');
var tests = require('abstract-pull-git-repo/tests');
var solc = require('solc');
var fs = require('fs');

var src = fs.readFileSync('./contracts/Repository.sol');

const Repo = require('./repo.js');

tests.repo(test, new Repo('0x75778f40669feca46441a51bab0da89c86813301'));
