pragma solidity ^0.4.6;

contract Repository {
    mapping (bytes32 => string) refs;

    function createRef (bytes32 refname, string hash) {
        refs[refname] = hash;
    }

    function updateRef (bytes32 refname, string hash) {
        refs[refname] = hash;
    }

    function deleteRef (bytes32 refname) {
        delete refs[refname];
    }
}
