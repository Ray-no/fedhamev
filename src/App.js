import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3Modal from "web3modal";
import { Web3Provider } from "ethers";


function App() {
  const [connectedWallet, setConnectedWallet] = useState(false);
  const [web3Provider, setWeb3Provider] = useState(null);

  // Function to handle wallet connection
  // Function to handle wallet connection
const connectWallet = async () => {
  try {
    const providerOptions = {
      injected: {
        display: {
          name: "MetaMask",
        },
        package: null, // Set to null for MetaMask injected provider
      },
    };

    const web3Modal = new Web3Modal({ providerOptions });
    const provider = await web3Modal.connect();
    // Directly create Web3Provider instance
    const web3Provider = new Web3Provider(provider);
    setConnectedWallet(true);
    setWeb3Provider(web3Provider);
    console.log("Wallet connected!");
  } catch (error) {
    console.error("Error connecting wallet:", error);
    setConnectedWallet(false);
  }
};


  // Check if wallet is connected on component mount
  useEffect(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      // Check if MetaMask is already connected
      connectWallet();
    }
  }, []);

  return (
    <div className="App">
      {/* Cool Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span className="navbar-text">FEDHA.IO</span>
        </div>
        <div className="navbar-right">
          <button className="wallet-button" disabled={connectedWallet}>
            Wallet Creation
          </button>
        </div>
      </nav>

      {/* Mid Section */}
      <div className="mid-section">
        <h1 className="welcome-text">Welcome To Fedha.io</h1>
        <button
          className="connect-wallet-button"
          disabled={connectedWallet}
          onClick={connectWallet}
        >
          {connectedWallet ? "Connected" : "Connect Wallet"}
        </button>
        {connectedWallet && <p>Connected account: {web3Provider.getAddress()}</p>}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Fedha.io. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
