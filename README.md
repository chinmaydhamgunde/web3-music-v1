# Spotify Web3 Music Streaming

A decentralized music streaming platform powered by Web3 technology using **Web3.js** and **React.js**, deployed on the **Sepolia network**.

## Features

- Decentralized music streaming
- Web3 integration for wallet connection (e.g., MetaMask)
- Users can listen to music stored on a decentralized network
- Built using React.js for the frontend and Web3.js for blockchain interactions
- Deployed on the Sepolia test network for testing and development

## Technologies Used

- **Frontend**: React.js
- **Blockchain**: Web3.js
- **Smart Contract**: Ethereum-based contract deployed on Sepolia network
- **Wallet Integration**: MetaMask for Web3 authentication
- **Deployment**: Sepolia Ethereum test network

## Getting Started

### Prerequisites

Before running the project locally, ensure you have the following installed:

- Node.js (LTS version recommended)
- npm or yarn
- MetaMask (or another Ethereum wallet) for interacting with Web3
- An Ethereum account with Sepolia test ETH for interacting with the smart contract

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/chinmaydhamgunde/web3-music-v1.git
    cd web3-music-v1
    ```

2. Install dependencies:
    ```bash
    npm install
    # OR
    yarn install
    ```

### Setting Up Web3

1. Install and set up MetaMask in your browser (if not already done).
2. Add Sepolia test network to MetaMask:
    - Network Name: Sepolia Test Network
    - New RPC URL: `https://rpc.sepolia.org`
    - Chain ID: `11155111`
    - Currency Symbol: `ETH`
    - Block Explorer URL: `https://sepolia.etherscan.io/`

3. Get Sepolia ETH from a faucet for testing (if needed): 
    - Visit [Sepolia Faucet](https://faucet.sepolia.org/).

### Running the Project

1. Start the React development server:
    ```bash
    npm start
    # OR
    yarn start
    ```

2. Open your browser and navigate to `http://localhost:3000` to interact with the platform.

### Connecting to MetaMask

- When you first load the app, you'll be prompted to connect your MetaMask wallet.
- Ensure that your wallet is connected to the Sepolia test network.
- Once connected, you will be able to interact with the Web3 features of the platform, such as listening to songs and interacting with the smart contract.
