import React, { useState, useEffect } from 'react';
import { Contract, ethers } from 'ethers';
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [account, setAccount] = useState(null);
  const [ethWallet, setEthWallet] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [frequency, setFrequency] = useState(undefined);
  const [randomNumber, setRandomNumber] = useState(null);  // State to store the random number

  const contractABI = atm_abi.abi;
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

  // Initialize MetaMask and Ethereum wallet connection
  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
      window.ethereum.on('accountsChanged', (accounts) => {
        handleAccount(accounts);
      });
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    } else {
      alert('MetaMask is not installed. Please install MetaMask.');
    }
  };

  async function requestAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0]; // Return the first account (the user's address)
  }

  const handleAccount = (account) => {
    if (account && account.length > 0) {
      console.log('Account connected: ', account[0]);
      setAccount(account[0]);
    } else {
      console.log('No account found');
      setAccount(null);
    }
  };

  // Connect to MetaMask
  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    // Once wallet is set, we can get a reference to the deployed contract
    getATMContract();
  };

  const getFrequency = async () => {
    if (atm) {
      const frequency = await atm.getFrequency();
      setFrequency(frequency.toNumber());
    }
  };

  // Get contract reference
  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, contractABI, signer);
    setATM(atmContract);
  };

  // Get balance of the user
  const getBalance = async () => {
    if (atm) {
      const balance = await atm.getBalance();
      setBalance(balance.toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1); // depositing 1 ETH
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1); // withdrawing 1 ETH
      await tx.wait();
      getBalance();
    }
  };


// Function to fetch the random number from the contract
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

  // Initialize user and check for MetaMask and account connection
  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Connect your MetaMask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    if (frequency === undefined) {
      getFrequency();
    }


    return (
      <>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <p>Your Random Number: {randomNumber} </p> {/* Display random number */}
        <p>Times Deposited: {frequency}</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
        <button onClick={getRandomNumber}> Get Random Number </button>
      </>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

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
}
