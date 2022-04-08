import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./style.css";

const contractABI = require("./Counter.json");
const YOUR_CONTRACT_ADDRESS = "0xf9e08779375Be47E3109ED8bbC700619B82361dc";

export default function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [metaMaskEnabled, setMetaMaskEnabled] = useState(false);

  let getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(
      YOUR_CONTRACT_ADDRESS,
      contractABI.abi,
      signer
    );
    return contract;
  };

  let incrementCount = async () => {
    const tx = await getContract().increment();
    alert("Once block is mined, Value will be auto updated");
    // await tx.wait();
    // fetchCurrentValue();
  };

  let fetchCurrentValue = async () => {
    let count_ = await getContract().getCount();
    console.log(+count_.toString());
    setCount(count_.toString());
    setLoading(false);
  };

  const checkedWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        setMetaMaskEnabled(false);
        return;
      }

      // Change network to rinkeby
      await ethereum.enable();
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(4).toString(16)}` }],
      });
      console.log("Connected", accounts[0]);
      localStorage.setItem("walletAddress", accounts[0]);
      setMetaMaskEnabled(true);

      // Listen to event
      listenToEvent();

      // Fetch the current counter value
      fetchCurrentValue();
    } catch (error) {
      console.log(error);
      setMetaMaskEnabled(false);
    }
  };

  useEffect(() => {
    checkedWallet();
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        checkedWallet();
      });
    }
  }, []);

  let listenToEvent = async () => {
    getContract().on("counterIncremented", async (sender, value, event) => {
      // Called when anyone changes the value
      setCount(+value.toString());
    });
  };

  return (
    <div class="root">
      {!metaMaskEnabled && <h1>Connect to Metamask</h1>}
      {metaMaskEnabled && (
        <div>
          {!loading && (
            <div>
              <h1 class="text">{count}</h1>
              <button onClick={incrementCount} class="button">
                +
              </button>
            </div>
          )}
          {loading && <div class="loader"></div>}
        </div>
      )}
    </div>
  );
}
