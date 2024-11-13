// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract MyToken {

    // public variables here
    string public tokenName = "QUANTA";
    string public tokenAbbrv = "QTA";
    uint public totalSupply = 0;

    // mapping variable here
    mapping(address => uint) public balances;

    // mint function
    function mint (address _address, uint _value) public {
        totalSupply += _value;
        balances[_address] += _value;
        require(_value > 5, "Minted tokens must be greater than 5");
    }

    // burn function
    function burn (address _address, uint _value) public {
        if (balances[_address] >= _value) {
            totalSupply -= _value;
            balances[_address] -= _value;
        }
    }

    //===============================================

    function revertErr(uint _value) public pure {
        if (_value <= 5) {
            revert("Minted tokens must be greater than 5");
        }
    }

    function assertCheck(uint _value) public pure {
        assert(_value == 0);
    }
    }
