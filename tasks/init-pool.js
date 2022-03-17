const path = require('path');
const { task } = require('hardhat/config');
const { encodeSqrtRatioX96 } = require('@uniswap/v3-sdk');
const { abi: poolAbi } = require('@uniswap/v3-periphery/artifacts/@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json');

task('init-pool', 'initialize the given pool with its initial prices')
  .addOptionalParam('deployment', 'deployments folder with artifacts', 'hardhat')
  .addPositionalParam('token0', 'first token symbol of the pool')
  .addPositionalParam('token0price', 'first token initial price')
  .addPositionalParam('token1', 'second token symbol of the pool')
  .addPositionalParam('token1price', 'second token  initial price')
  .addPositionalParam('fee', 'fee configuration of the pool', 500, types.int)
  .setAction(async ({ deployment, token0, token0price, token1, token1price, fee }, hre) => {
    const deploymentPath = path.resolve(hre.config.paths.deployments, deployment);
    const FactoryDeployment = require(`${deploymentPath}/factory.json`);
    const Token0Deployment = require(`${deploymentPath}/${token0}.json`);
    const Token1Deployment = require(`${deploymentPath}/${token1}.json`);

    const Factory = await hre.ethers.getContractAt(FactoryDeployment.abi, FactoryDeployment.address);

    console.log(Token0Deployment.address, Token1Deployment.address, fee)

    const poolAddress = await Factory.getPool(Token0Deployment.address, Token1Deployment.address, fee);

    console.log(poolAddress)

    const Pool = await hre.ethers.getContractAt(poolAbi, '0x0932128636AE3aAFb8b6c4037ce0C943a5AFb234');

    const tx = await Pool.initialize(encodeSqrtRatioX96(token0price, token1price).toString());

    const receipt = await tx.wait();

    console.log(receipt)
  });
