import React, { useState, useEffect } from "react";
import Web3 from "web3";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import utils from "./utils";
import { songs } from "./songs"; // Import your song data
import "./App.css";

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [playTime, setPlayTime] = useState(0);
  const [actualListeningTime, setActualListeningTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // New state for managing current song
  const [playlist, setPlaylist] = useState(songs);

  const ABI = utils.abi;
  const CONTRACT_ADDRESS = utils.address;

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" }); // Updated method for newer versions of MetaMask
          const accounts = await web3Instance.eth.getAccounts();
          setWeb3(web3Instance);
          setAccount(accounts[0]);

          const contractInstance = new web3Instance.eth.Contract(
            ABI,
            CONTRACT_ADDRESS
          );
          setContract(contractInstance);
        } catch (error) {
          console.error("User denied account access", error);
        }
      } else {
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    }
    init();
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActualListeningTime((prevTime) => prevTime + 1);
        setPlayTime((prevTime) => prevTime + 1); // Update playTime to show current played time
      }, 1000); // Increment every second if playing
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const onListen = (e) => {
    setIsPlaying(!e.target.paused);
    setPlayTime(Math.floor(e.target.currentTime)); // Sync visual play time with audio
  };

  const handleClaim = async () => {
    if (contract && account && actualListeningTime > 0) {
      try {
        await contract.methods
          .claimReward(account, actualListeningTime)
          .send({ from: account });
        alert("Reward claimed: " + actualListeningTime + " MCOP tokens");
        setActualListeningTime(0); // Reset the actual listening timer
        setPlayTime(0); // Reset visual play time
      } catch (error) {
        console.error("Error claiming reward:", error);
        alert(`An error occurred while claiming rewards: ${error.message}`);
      }
    } else {
      alert(
        "Please listen to the music before claiming rewards or check your wallet connection."
      );
    }
  };

  const nextSong = () => {
    if (currentSongIndex + 1 < playlist.length) {
      setCurrentSongIndex(currentSongIndex + 1);
      setPlayTime(0); // Reset visual play time for the new song
    }
  };

  const prevSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      setPlayTime(0); // Reset visual play time for the new song
    }
  };

  const renderSongCard = (song, index) => (
    <div
      key={song.id}
      className="song-card"
      onClick={() => setCurrentSongIndex(index)}
      style={{
        cursor: "pointer",
        padding: "15px",
        margin: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        background: index === currentSongIndex ? "#e0e0e0" : "white",
        maxWidth: "150px",
      }}
    >
      <img
        src={song.cover}
        alt={song.name}
        style={{ width: "100%", height: "auto", marginBottom: "10px" }}
      />
      <h3 style={{ margin: "10px 0 5px" }}>{song.name}</h3>
      <p style={{ margin: 0 }}>{song.artist}</p>
    </div>
  );

  return (
    <div className="App">
      <h1>Music Reward App</h1>
      {account ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {playlist
              .slice(currentSongIndex, currentSongIndex + 1)
              .map(renderSongCard)}{" "}
            {/* Display only the current song */}
          </div>
          <AudioPlayer
            src={playlist[currentSongIndex].src}
            onListen={onListen}
            showJumpControls={false}
            customAdditionalControls={[
              <button onClick={handleClaim} key="claim">
                Claim Reward
              </button>,
              <button onClick={prevSong} key="prev">
                Previous
              </button>,
              <button onClick={nextSong} key="next">
                Next
              </button>,
            ]}
          />
          <p>
            Now Playing: {playlist[currentSongIndex].name} by{" "}
            {playlist[currentSongIndex].artist}
          </p>
          
          <p>
            Actual Listening Time for Rewards: {actualListeningTime} seconds
          </p>
          <div>
            <h2>Playlist</h2>
            <ul
              className="playlist"
              style={{ listStyleType: "none", padding: 0 }}
            >
              {playlist.map((song, index) => (
                <li
                  key={song.id}
                  onClick={() => setCurrentSongIndex(index)}
                  className={index === currentSongIndex ? "active" : ""}
                  style={{
                    padding: "5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={song.cover}
                    alt={song.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  <div>
                    <h4 style={{ margin: 0 }}>{song.name}</h4>
                    <p style={{ margin: 0 }}>{song.artist}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Please connect your wallet to use this app.</p>
      )}
    </div>
  );
}

export default App;
