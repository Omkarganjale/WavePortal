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
const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners();

	const waveContractFactory = await hre.ethers.getContractFactory(
		'WavePortal',
	);
	const waveContract = await waveContractFactory.deploy();
	await waveContract.deployed();

	console.log('Contract deployed to:', waveContract.address);
	console.log('Contract deployed by:', owner.address);

	//@foo
	// console.log(waveContract);
	// console.log(owner);

	let waveCount;

	waveCount = await waveContract.getTotalWaves();

	let waveTxn = await waveContract.wave();
	await waveTxn.wait();

	waveCount = await waveContract.getTotalWaves();

	// @note connect(add) to change the signer
	waveTxn = await waveContract.connect(randomPerson).wave();
	await waveTxn.wait();

	waveCount = await waveContract.getTotalWaves();
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
