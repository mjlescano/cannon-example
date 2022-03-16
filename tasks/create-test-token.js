const path = require('path');
const fs = require('fs');
const { task, types } = require('hardhat/config');

task('create-test-token', 'create an ERC20 token on the given network')
  .addParam('name')
  .addParam('symbol')
  .addOptionalParam('deployment', 'deployments folder with artifacts', 'hardhat')
  .addOptionalParam('mint', 'how many tokens should the user receive', 0, types.int)
  .setAction(async ({ name, symbol, deployment, mint }, hre) => {
    const TestToken = await hre.ethers.getContractFactory('contracts/TestToken.sol:TestToken');
    const token = await TestToken.deploy(name, symbol);

    const { abi } = await hre.artifacts.readArtifact('contracts/TestToken.sol:TestToken');
    const deploymentData = {
      abi,
      address: token.address,
      deployTxnHash: token.deployTransaction.hash
    };

    const deploymentPath = path.resolve(hre.config.paths.deployments, deployment, `${symbol}.json`);
    fs.writeFileSync(deploymentPath, JSON.stringify(deploymentData, null, 2));

    await token.deployTransaction.wait();

    if (typeof mint === 'number' && mint > 0) {
      const tx = await token.mint(mint);
      await tx.wait();
    }
  });
