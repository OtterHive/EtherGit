pragma solidity ^0.4.0;

contract EtherGit {
    address public creator;
    bool public killSwitchStatus;
    mapping (bytes32 => Repository) public repositories;

    struct Repository {
        address owner;
        bytes data;
    }

    modifier killSwitch() {
        if (killSwitchStatus) {
            throw;
        }
        _;
    }

    function toggleKillSwitch() {
        killSwitchStatus = !killSwitchStatus;
    }

    function EtherGit() {
        creator = msg.sender;
    }

    function createRepository(bytes32 name, bytes data) killSwitch() {
        repositories[name] = Repository(msg.sender, data);
    }
}
