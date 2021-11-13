import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import './App.css';
import { abi } from './utils/WavePortal.json';
import LoadContainer from './Components/LoadContainer';
import Footer from './Components/Footer';

// deployed on rinkeby at 0x8F9C31a4c214Ad2921251e5eB1A9E34862260085
// v2 deployed at 0xc248818111298D37AF1AEf1d11B8f4eC123A1E81
// v3 deployed at 0x8B43F4c791fD7c81332Ef733BBbe6437Ca662e4f
// v4 deployed at 0x12BC712fc3592070Cd4D70cDD2bdDa9316078274

const contractAddress = '0x12BC712fc3592070Cd4D70cDD2bdDa9316078274';
const contractABI = abi;

export default function App() {
	// state variable  to store our user's public wallet.

	const [currentAccount, setCurrentAccount] = useState('');

	const [allWaves, setAllWaves] = useState([]);

	const [greeting, setGreeting] = useState('Hi');

	const [isLoading, setIsLoading] = useState(false);
	const [loadingMsg, setLoadingMsg] = useState('Loading...');

	const [isWaving, setIsWaving] = useState(false);
	const [waveBtnMsg, setWaveBtnMsg] = useState('Wave at Me');

	// check for access to window.ethereum
	const checkIfWalletIsConnected = async () => {
		setIsLoading(true);
		setLoadingMsg('Checking Wallet requirements');

		try {
			const { ethereum } = window;

			if (!ethereum) {
				console.log('Make sure you have metamask!');
				return;
			} else {
				console.log('We have the ethereum object', ethereum);
			}

			// check if we are authorized to access the public address of user
			const accounts = await ethereum.request({ method: 'eth_accounts' });

			if (accounts.length !== 0) {
				const account = accounts[0];
				console.log(`Found an authorized account ${account}`);
				setCurrentAccount(account);
				getAllWaves();
			} else {
				console.log('No accounts are accessible');
			}
		} catch (error) {
			console.log(error);
		}

		setIsLoading(false);
		setLoadingMsg('Loading...');
	};

	// This runs our function when the page loads.
	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

    useEffect( () => {
        getAllWaves();
    },[currentAccount])

	const connectWallet = async () => {
		setIsLoading(true);
		setLoadingMsg('Requesting wallet');

		try {
			const { ethereum } = window;

			if (!ethereum) {
				alert('Get MetaMask!');
				return;
			}

			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});

			console.log('Connected', accounts[0]);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
		}

		setIsLoading(false);
		setLoadingMsg('Loading...');
	};

	const wave = async () => {
		setIsWaving(true);
		setWaveBtnMsg('Waving');

		try {
			const { ethereum } = window;

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const wavePortalContract = new ethers.Contract(
					contractAddress,
					contractABI,
					signer,
				);

				await wavePortalContract.wave(greeting);
				console.log('Waved to omkar with greeting as ', greeting);
			} else {
				console.log("Ethereum object doesn't exist!");
			}
		} catch (error) {
			console.log(error);
		}

		setWaveBtnMsg('Wave at Me');
		setIsWaving(false);
	};

	const getAllWaves = async () => {
		try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const wavePortalContract = new ethers.Contract(
					contractAddress,
					contractABI,
					signer,
				);

				const waves = await wavePortalContract.getAllWaves();

				let wavesCleaned = [];
				waves.forEach((wave) => {
					wavesCleaned.push({
						address: wave.waver,
						timestamp: new Date(wave.timestamp * 1000),
						message: wave.message,
					});
				});

				setAllWaves(wavesCleaned);
			} else {
				console.log("Ethereum object doesn't exist!");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getTotalWaves = async () => {
		setIsLoading(true);

		try {
			const { ethereum } = window;

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const wavePortalContract = new ethers.Contract(
					contractAddress,
					contractABI,
					signer,
				);

				let count = await wavePortalContract.getTotalWaves();
				console.log('Retrieved total wave count...', count.toNumber());
			} else {
				console.log("Ethereum object doesn't exist!");
			}
		} catch (error) {
			console.log(error);
		}

		setIsLoading(false);
	};

	const onChange = (e) => setGreeting(e.target.value);

	return (
        
		<div className='mainContainer'>
			{isLoading ? (
				<LoadContainer isLoading={isLoading} loadingMsg={loadingMsg} />
			) : (
				<div className='dataContainer'>
					<div className='header'>Hey there!</div>

					<div className='bio'>
						I am Omkar, an Engineering undergrad and a web3 enthusiast.
						<br />
						This is my first web3 project and Hop in if you find
						this interesting.
						<br />
                        Get <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>metamask</a> and <a href='https://faucets.chain.link/rinkeby'>rinkeby test ether</a> to read greetings.
					</div>

                    {!currentAccount && (
						<button className='waveButton' onClick={connectWallet}>
							Connect Wallet
						</button>
					)}

                    {currentAccount && (
						<input
							type='text'
                            placeholder="Messages are immutable"
                            className='usrtxt type-1'
							onChange={(e) => {
								onChange(e);
							}}
                            required
						/>
					)}

					<button
						className='waveButton'
						onClick={wave}
						disable={isWaving.toString()}
					>
						{waveBtnMsg}
					</button>

					

					{allWaves.map((wave, index) => {
						return (
							<div
                                className='element'
								key={index}
								
							>
								<div>Address: {wave.address}</div>
								<div>Time: {wave.timestamp.toString()}</div>
								<div>Message: {wave.message}</div>
							</div>
						);
					})}
				</div>
			)}

            
		</div>
	);
}
