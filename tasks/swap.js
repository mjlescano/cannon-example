const path = require('path');
const { task } = require('hardhat/config');

task('swap', 'execute a swap on uniswap')
  .addOptionalParam('deployment', 'deployments folder with artifacts', 'hardhat')
  .addPositionalParam('token0', 'first token symbol of the pool')
  .addPositionalParam('token1', 'second token symbol of the pool')
  .addPositionalParam('fee', 'fee configuration of the pool', 500, types.int)
  .setAction(async ({ deployment, token0, token1, fee }, hre) => {
    const deploymentPath = path.resolve(hre.config.paths.deployments, deployment);
    const RouterDeployment = require(`${deploymentPath}/router.json`);
    const FactoryDeployment = require(`${deploymentPath}/factory.json`);
    const Token0Deployment = require(`${deploymentPath}/${token0}.json`);
    const Token1Deployment = require(`${deploymentPath}/${token1}.json`);

    const Facotry = await hre.ethers.getContractAt(FactoryDeployment.abi, FactoryDeployment.address);
    const pool = await Facotry.getPool(Token0Deployment.address, Token1Deployment.address, fee);

    // const Router = await hre.ethers.getContractAt(RouterDeployment.abi, RouterDeployment.address);

    console.log(pool);
  });
