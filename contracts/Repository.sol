pragma solidity ^0.4.0;

contract Repository {
    address public creator;

    uint public pointsIssued;
    mapping (address => uint) public points;

    mapping (address => bool) public collaborators;
    mapping (address => bool) public admins;

    enum ObjectType { Tree, Blob, Commit }
    struct {
        ObjectType type;
    }
    mapping (bytes32 => bytes) public refs;
    mapping (bytes32 => GitObject) public objects;

    modifier isCollaborator() {
        if (!collaborators[msg.sender]) {
            throw;
        }
        _;
    }

    modifier isAdmin() {
        if (!admins[msg.sender]) {
            throw;
        }
        _;
    }
}
