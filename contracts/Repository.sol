pragma solidity ^0.4.6;

contract Repository {
    mapping (bytes32 => Ref) refs;

    struct Ref {
        address owner;
        string hash;
    }

    modifier onlyNew (bytes32 refname) {
        if (refs[refname].owner != 0x0) {
            throw;
        }
        _;
    }

    modifier neverMaster (bytes32 refname) {
        if (refname == 'master') {
            throw;
        }
        _;
    }

    modifier onlyOwner (bytes32 refname) {
        if (msg.sender != refs[refname].owner) {
            throw;
        }
        _;
    }

    function createRef (bytes32 refname, string hash) neverMaster(refname) onlyNew(refname) {
        refs[refname] = Ref(msg.sender, hash);
    }

    function updateRef (bytes32 refname, string hash) neverMaster(refname) onlyOwner(refname) {
        refs[refname].hash = hash;
    }

    function deleteRef (bytes32 refname) neverMaster(refname) onlyOwner(refname) {
        delete refs[refname];
    }
}
