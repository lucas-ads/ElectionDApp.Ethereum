var Election = artifacts.require("./Election.sol");

contract("Election", function (accounts) {
  var electionInstance;

  it("initializes with two candidates", function () {
    return Election.deployed()
      .then((instance) => instance.candidatesCount())
      .then((count) => {
        assert.equal(count, 2);
      });
  });

  it("it initializes the candidates with the correct values", function () {
    return Election.deployed()
      .then((instance) => {
        electionInstance = instance;
        return electionInstance.candidates(1);
      })
      .then((candidate) => {
        assert.equal(candidate[0], 1, "contains the correct id");
        assert.equal(candidate[1], "Candidate 1", "contains the correct name");
        assert.equal(candidate[2], 0, "contains the correct votes count");
        return electionInstance.candidates(2);
      })
      .then((candidate) => {
        assert.equal(candidate[0], 2, "contains the correct id");
        assert.equal(candidate[1], "Candidate 2", "contains the correct name");
        assert.equal(candidate[2], 0, "contains the correct votes count");
      });
  });

  it("allows a voter to cast a vote", function () {
    return Election.deployed()
      .then((instance) => {
        electionInstance = instance;
        candidateId = 1;
        return electionInstance.vote(candidateId, { from: accounts[0] });
      })
      .then((receipt) => {
        return electionInstance.voters(accounts[0]);
      })
      .then((voted) => {
        assert(voted, "the voter was marked as voted");
        return electionInstance.candidates(candidateId);
      })
      .then((candidate) => {
        var voteCount = candidate[2];
        assert.equal(voteCount, 1, "increments the candidate's vote count");
      });
  });

  // Errors on the exception handling

  //   it("throws an exception for invalid candidates", function () {
  //     return Election.deployed()
  //       .then((instance) => {
  //         electionInstance = instance;
  //         return electionInstance.vote(1, { from: accounts[1] });
  //       })
  //       .then(assert.fail)
  //       .catch((error) => {
  //         console.log(JSON.stringify(error.stack.AssertionError));
  //         assert(
  //           error.message.indexOf("revert") >= 0,
  //           "error message must contain revert"
  //         );
  //         return electionInstance.candidates(1);
  //       })
  //       .then((candidate1) => {
  //         var voteCount = candidate1[2];
  //         assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
  //         return electionInstance.candidates(2);
  //       })
  //       .then((candidate2) => {
  //         var voteCount = candidate2[2];
  //         assert.equal(voteCount, 0, "candidate 2 did not receive any votes");
  //       });
  //   });

  //     it("throws an exception for double voting", function () {
  //       return Election.deployed()
  //         .then((instance) => {
  //           electionInstance = instance;
  //           candidateId = 2;
  //           electionInstance.vote(candidateId, { from: accounts[3] });
  //           return electionInstance.candidates(candidateId);
  //         })
  //         .then((candidate) => {
  //           var voteCount = candidate[2].toNumber();
  //           assert.equal(voteCount, 1, "accepts first vote");
  //           candidateId = 2;
  //           // Try to vote again
  //           return electionInstance.vote(candidateId, { from: accounts[3] });
  //         });
  //     .then(assert.fail)
  //     .catch((error) => {
  //       assert(
  //         error.message.indexOf("revert") >= 0,
  //         "error message must contain revert"
  //       );
  //       return electionInstance.candidates(1);
  //     })
  //     .then((candidate1) => {
  //       var voteCount = candidate1[2];
  //       assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
  //       return electionInstance.candidates(2);
  //     })
  //     .then((candidate2) => {
  //       var voteCount = candidate2[2];
  //       assert.equal(voteCount, 1, "candidate 2 did not receive any votes");
  //     });
  //   });
});
