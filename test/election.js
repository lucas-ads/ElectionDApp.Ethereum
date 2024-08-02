var Election = artifacts.require("./Election.sol");

contract("Election", function (accounts) {
  it("initializes with two candidates", function () {
    return Election.deployed()
      .then((instance) => instance.candidatesCount())
      .then((count) => {
        assert.equal(count, 2);
      });
  });

  var electionInstance;
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
});
