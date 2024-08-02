Election.deployed().then(function (instance) {
  election = instance;
});

election.candidatesCount();
election.candidates(1);
election.candidates(2);

election.candidates(2).then(function (c) {
  candidate = c;
});

//Show all candidates info
candidate;

//Show first struct's info (candidate id)
candidate[0];

//Show second struct's info (candidate name)
candidate[1];

//Show third struct's info (candidate votes)
candidate[2];

web3.eth.getAccounts();
web3.eth.getAccounts().then((acc) => {
  accounts = acc;
});
accounts[0];
