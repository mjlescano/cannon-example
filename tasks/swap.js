const path = require('path');
const { task } = require('hardhat/config');

task('swap', 'execute a swap on uniswap')
  .addOptionalParam('deployment', 'deployments folder with artifacts', 'hardhat')
  .addPositionalParam('token0', 'first token symbol of the pool')
  .addPositionalParam('token1', 'second token symbol of the pool')
  .addPositionalParam('amount', 'amount of token0 you want to swap')
  .addPositionalParam('fee', 'fee configuration of the pool', 500, types.int)
  .setAction(async ({ deployment, token0, token1, amount, fee }, hre) => {
    const deploymentPath = path.resolve(hre.config.paths.deployments, deployment);
    const FactoryDeployment = require(`${deploymentPath}/factory.json`);
    const RouterDeployment = require(`${deploymentPath}/router.json`);
    const Token0Deployment = require(`${deploymentPath}/${token0}.json`);
    const Token1Deployment = require(`${deploymentPath}/${token1}.json`);

    const [signer] = await hre.ethers.getSigners();

    const Router = await hre.ethers.getContractAt(RouterDeployment.abi, RouterDeployment.address);

    const tx = await Router.exactInputSingle({
      tokenIn: Token0Deployment.address,
      tokenOut: Token1Deployment.address,
      fee,
      recipient: signer.address,
      deadline: Date.now() + 1000 * 60 * 60,
      amountIn: amount,
      amountOutMinimum: 0,
      sqrtPriceLimitX96: 0,
    });

    await tx.wait();

    console.log(Router);

    // const Factory = await hre.ethers.getContractAt(FactoryDeployment.abi, FactoryDeployment.address);
    // const pool = await Factory.getPool(Token0Deployment.address, Token1Deployment.address, fee);

    // const tx = pool.swap(
    //   signer.address,
    //   true,
    // );

    // await tx.wait();

    // console.log(pool);
  });
