// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Assessment {

    address payable public owner;
    uint256 public balance;
    uint256 public randomNumber;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event RandomNumberGenerated(uint256 randNumber);  // Renamed event

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256) {
        return balance;
    }

    function getFrequency() public view returns(uint256) {
        return balance;
    }

    function getRandomNumber() public view returns(uint256) {
        return randomNumber;  // Return the last generated random number
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // Ensure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // Perform transaction
        balance += _amount;

        // Assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // Emit the event
        emit Deposit(_amount);
    }

    // Custom error for insufficient balance
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // Withdraw the given amount
        balance -= _withdrawAmount;

        // Assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // Emit the event
        emit Withdraw(_withdrawAmount);
    }

    // Simple random number generator function
    function generateRandomNumber() public {
        require(msg.sender == owner, "You are not the owner of this account");

        // Generate random number using keccak256 and block variables
        uint256 _randNumber = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.difficulty))) % 100;

        // Store the random number
        randomNumber = _randNumber;

        // Emit the event with the generated random number
        emit RandomNumberGenerated(_randNumber);
    }
}
