// Hardhat Runtime environment or hre is imported.
// this hre object is created using hardhat.config.js on fly

/* iteration no 1 */

// const main = async () => {
// 	const waveContractFactory = await hre.ethers.getContractFactory(
// 		'WavePortal',
// 	);

// 	// deploying an instance of waveContract
// 	const waveContract = await waveContractFactory.deploy();

// 	// waiting for completion of deployment
// 	await waveContract.deployed();

// 	console.log('Contract deployed to:', waveContract.address);
// };

/* iteration no 2 */

// const main = async () => {
// 	const [owner, randomPerson] = await hre.ethers.getSigners();

// 	const waveContractFactory = await hre.ethers.getContractFactory(
// 		'WavePortal',
// 	);
// 	const waveContract = await waveContractFactory.deploy();
// 	await waveContract.deployed();

// 	console.log('Contract deployed to:', waveContract.address);
// 	console.log('Contract deployed by:', owner.address);

// 	//@foo
// 	// console.log(waveContract);
// 	// console.log(owner);

// 	let waveCount;

// 	waveCount = await waveContract.getTotalWaves();

// 	let waveTxn = await waveContract.wave();
// 	await waveTxn.wait();

// 	waveCount = await waveContract.getTotalWaves();

// 	// @note connect(add) to change the signer
// 	waveTxn = await waveContract.connect(randomPerson).wave();
// 	await waveTxn.wait();

// 	waveCount = await waveContract.getTotalWaves();
// };

/* iteration 3: Greet message */

// const main = async () => {
//   const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
//   const waveContract = await waveContractFactory.deploy();
//   await waveContract.deployed();
//   console.log('Contract addy:', waveContract.address);

//   let waveCount;
//   waveCount = await waveContract.getTotalWaves();
//   console.log(waveCount.toNumber());

//   /**
//    * Let's send a few waves!
//    */
//   let waveTxn = await waveContract.wave('A message!');
//   await waveTxn.wait(); // Wait for the transaction to be mined

//   const [_, randomPerson] = await hre.ethers.getSigners();
//   waveTxn = await waveContract.connect(randomPerson).wave('Another message!');
//   await waveTxn.wait(); // Wait for the transaction to be mined

//   let allWaves = await waveContract.getAllWaves();
//   console.log(allWaves);
// };

/* iteration 4 */

// const main = async () => {
// 	const waveContractFactory = await hre.ethers.getContractFactory(
// 		'WavePortal',
// 	);
// 	const waveContract = await waveContractFactory.deploy({
// 		value: hre.ethers.utils.parseEther('0.1'),
// 	});
// 	await waveContract.deployed();
// 	console.log('Contract addy:', waveContract.address);

// 	/*
// 	 * Get Contract balance
// 	 */
// 	let contractBalance = await hre.ethers.provider.getBalance(
// 		waveContract.address,
// 	);
// 	console.log(
// 		'Contract balance:',
// 		hre.ethers.utils.formatEther(contractBalance),
// 	);

// 	/*
// 	 * Send Wave
// 	 */
// 	let waveTxn = await waveContract.wave('A message!');
// 	await waveTxn.wait();

// 	/*
// 	 * Get Contract balance to see what happened!
// 	 */
// 	contractBalance = await hre.ethers.provider.getBalance(
// 		waveContract.address,
// 	);
// 	console.log(
// 		'Contract balance:',
// 		hre.ethers.utils.formatEther(contractBalance),
// 	);

// 	let allWaves = await waveContract.getAllWaves();
// 	console.log(allWaves);
// };

/* iteration 5 */

const main = async () => {
	const waveContractFactory = await hre.ethers.getContractFactory(
		'WavePortal',
	);
	const waveContract = await waveContractFactory.deploy({
		value: hre.ethers.utils.parseEther('0.1'),
	});
	await waveContract.deployed();
	console.log('Contract addy:', waveContract.address);

	let contractBalance = await hre.ethers.provider.getBalance(
		waveContract.address,
	);
	console.log(
		'Contract balance:',
		hre.ethers.utils.formatEther(contractBalance),
	);

	/*
	 * Let's try two waves now
	 */
	const waveTxn = await waveContract.wave('This is wave #1');
	await waveTxn.wait();

	const waveTxn2 = await waveContract.wave('This is wave #2');
	await waveTxn2.wait();

	contractBalance = await hre.ethers.provider.getBalance(
		waveContract.address,
	);
	console.log(
		'Contract balance:',
		hre.ethers.utils.formatEther(contractBalance),
	);

	let allWaves = await waveContract.getAllWaves();
	console.log(allWaves);
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

runMain();
