# My entry for the Smart Contract Management Module - ETH+AVAX Project in Metacrafters
A modified, personalized version of the project template provided to us.

# Description
In this assessment we were tasked to modify the template that will have at least two new functions and a decorative frontend.
This README.md shows the major modifications and beautifications made on our provided base template

# Code Details
The 2 new functions on our smart contract are as follows:
 - The getFrequency() function displays the amount of deposits made by the user.
  - Assesment.sol
```
    function getFrequency() public view returns(uint256) {
        return balance;
    }
```
  - index.js (const)
```
      const getFrequency = async () => {
    if (atm) {
      const frequency = await atm.getFrequency();
      setFrequency(frequency.toNumber());
    }
  };

```
- The getRandomNumber() allows us to display a random number with a push of a button on our frontend.
  * p.s. The Solidity smart contract runs on Remix IDE solely but sometimes Metamask had errors implementing this function with hardhat to jsx in my end. I made a respectable amount of off-screen research for this part finding ways to fix this but settled to implement a remediating measure instead. I placed a try/catch block at the index.js side to keep the project running and generate random numbers amidst the errors.*
  - Assessment.sol
```
    function generateRandomNumber() public {
        require(msg.sender == owner, "You are not the owner of this account");

        // Generate random number using keccak256 and block variables
        uint256 _randNumber = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.difficulty))) % 100;

        // Store the random number
        randomNumber = _randNumber;

        // Emit the event with the generated random number
        emit RandomNumberGenerated(_randNumber);
    }
```
  - index.js (const)
```
const getRandomNumber = async () => {
  try {
    if (atm) {
      let tx = await atm.generateRandomNumber();
      await tx.wait(); // Wait for the transaction to be mined
      const random = await atm.getRandomNumber();
      setRandomNumber(random.toString());  // Update state with the new random number from the contract
    }
  } catch (error) {
    console.error("Error generating random number from contract:", error);

    // Fallback to generating a random number in JavaScript
    const randomJavaScriptNumber = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
    setRandomNumber(randomJavaScriptNumber.toString());  // Update state with the JavaScript random number
  }
};
```
- For the frontend decorations (html/css part of the code at the end), We implemented a pulsing animation for the text header with a drop shadow, placed a background based on the default wallpaper used in Windows XP (Bliss), changed the font style to Tahoma (WinXP's default font), and changed the layout to have the buttons and texts at the center of the page.
  - index.js
```
return (
    <main className="container">
      <header>
        <h1 className="pulse-text">Welcome to My Program!</h1>
      </header>
      <section>
        {initUser()}
      </section>
      
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            color: white;
          }
          50% {
            transform: scale(1.1);
            color: white;
          }
          100% {
            transform: scale(1);
            color: white;
          }
        }

        .pulse-text {
          font-size: 2.5rem;
          animation: pulse 3s infinite;
        }

        .container {
          text-align: center;
          text-shadow: 2px 2px 4px #000000;
          background-image: url("https://r4.wallpaperflare.com/wallpaper/765/406/516/landscape-4k-bliss-windows-xp-wallpaper-9866fd2850207c2810ac117e5862c4aa.jpg");
          background-size: cover;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: Tahoma, sans-serif;
          min-height: 100vh;
        }
      `}</style>
    </main>
  );
```

# Author
Lars James Manansala (larsjamesmanansala@gmail.com)
