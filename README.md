# Cannon Project Example

Example project for interacting with UniswapV3 running by default on a [Cannon](https://usecannon.com) network.

## Usage

First, spin up the Cannon node defined at the [`cannon.json`](cannon.json) file using the `cannon` command and leave it running:

```
npx hardhat cannon
```

Then, make sure to initialize the created pools with the initial prices:

```
npx hardhat --network localhost init-pool dai 1 usdc 1 500
```

Now, you will be able to execute your swap on the local Cannon network with the following task:

```
npx hardhat --network localhost swap dai usdc 10 500
```
