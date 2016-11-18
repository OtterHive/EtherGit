pragma solidity ^0.4.0;

contract VersionControl {
    address public fallback;
    address public creator;
    mapping (address => address) personal;

    modifier onlyCreator () {
        if (msg.sender != creator) {
            throw;
        }
        _;
    }

    function VersionControl() {
        creator = msg.sender;
    }

    function setFallback(address _fallback) onlyCreator() {
        fallback = _fallback;
    }

    function setPersonal(address _personal) {
        personal[msg.sender] = _personal;
    }

    function getVersion() returns (address) {
        return personal[msg.sender] != 0x0 ? personal[msg.sender] : fallback;
    }
}
