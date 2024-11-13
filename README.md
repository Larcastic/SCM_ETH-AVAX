# My entry for the Smart Contract Management Module - ETH+AVAX Project in Metacrafters
An overview of our token, Quanta to show its functions.

# Description
In this assessment we were tasked to make a smart contract that will have at least two functions and its values visible on the frontend of the application.

# Code Details
*for the purpose of ease, the code was set to public.*
- We recycled our modified code for the Functions and Errors module made in Solidity since the smart contract used there had two and more easily readable functions.

  
The made function on our smart contract are as follows:
 - The mint function mints a token thwt we created which will be stored into the totalSupply.
```
      function mint (address _address, uint _value) public {
          totalSupply += _value;
          balances[_address] += _value;
      }
```
- The burn function reduces or destroys the token we have minted on the totalSupply.
```
       function burn (address _address, uint _value) public {
          if (balances[_address] >= _value) {
              totalSupply -= _value;
              balances[_address] -= _value;
          }
      }
```
  - The revert() function will revert the code to its previous state if ever the user were to input a _value less than or equal to 5.
     ```
       function testRevert(uint _value) public pure {
        if (_value <= 5) {
            revert("Input must be greater than 10");
        }
    }
    ```
- Finally, the assert() function assures that our smart contract's total supply will have its totalSupply at 0 at its initial state, since assert() will proceed to run if its condition set is met.
    ```
   function testAssert() public view {
        assert(totalSupply == 0);
    }
    ```
    
# Author
Lars James Manansala (larsjamesmanansala@gmail.com)
