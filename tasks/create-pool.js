const path = require('path');
const { task, types } = require('hardhat/config');

task('create-pool', 'execute a swap on uniswap')
  .addOptionalParam('deployment', 'deployments folder with artifacts', 'hardhat')
  .addPositionalParam('token0', 'first token symbol of the pool')
  .addPositionalParam('token1', 'second token symbol of the pool')
  .addPositionalParam('fee', 'fee configuration of the pool', 500, types.int)
  .setAction(async ({ deployment, token0, token1, fee }, hre) => {
    const deploymentPath = path.resolve(hre.config.paths.deployments, deployment);
    const FactoryDeployment = require(`${deploymentPath}/factory.json`);
    const Token0Deployment = require(`${deploymentPath}/${token0}.json`);
    const Token1Deployment = require(`${deploymentPath}/${token1}.json`);

    console.log('Creating pool:');
    console.log(`  Token0: ${token0} (${Token0Deployment.address})`);
    console.log(`  Token1: ${token1} (${Token1Deployment.address})`);
    console.log(`     Fee: ${fee}`);

    const facotry = await hre.ethers.getContractAt(FactoryDeployment.abi, FactoryDeployment.address);

    const tx = await facotry.createPool(
      Token0Deployment.address,
      Token1Deployment.address,
      fee
    );

    await tx.wait();
  });
