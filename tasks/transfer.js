const path = require('path');
const { task } = require('hardhat/config');

task('transfer', 'transfer tokens to another address')
  .addOptionalParam('deployment', 'deployments folder with artifacts', 'hardhat')
  .addPositionalParam('token', 'token symbol to tranfer')
  .addPositionalParam('amount', 'amount of the token')
  .addPositionalParam('address', 'transfer recipient')
  .setAction(async ({ deployment, token, amount, address }, hre) => {
    const deploymentPath = path.resolve(hre.config.paths.deployments, deployment);
    const TokenDeployment = require(`${deploymentPath}/${token}.json`);

    const [signer] = await hre.ethers.getSigners();

    const Token = await hre.ethers.getContractAt(TokenDeployment.abi, TokenDeployment.address);

    console.log('   Sender balance: ', (await Token.balanceOf(signer.address)).toString())
    console.log('Recipient balance: ', (await Token.balanceOf(address)).toString())

    console.log(`Transfering ${amount} ${token}...`);

    const tx = await Token.transfer(address, amount);

    await tx.wait();

    console.log('   Sender balance: ', (await Token.balanceOf(signer.address)).toString())
    console.log('Recipient balance: ', (await Token.balanceOf(address)).toString())
  });
