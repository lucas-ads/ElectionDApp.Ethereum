// SPDX-License-Identifier: MIT 
pragma solidity 0.8.7;

contract Election{
    
    // Model a Candidate
    struct Candidate{
        uint256 id;
        string name;
        uint256 voteCount;
    }

    //Store accounts that have voted
    mapping(address => bool) public voters;

    // Store Candidates
    // Fetch Candidade
    mapping(uint256 => Candidate) public candidates;

    // Store Candidates Count
    uint256 public candidatesCount;

    constructor(){
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint256 _candidateId) public {
        // require that they haven't voted bedore
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        
        // record that voter has votes
        voters[msg.sender] = true;

        // update candidate vote count
        candidates[_candidateId].voteCount++;
    }

}