# Cannon Project Example

Example project for interacting with UniswapV3 running by default on a [Cannon](https://usecannon.com) network.

## Usage

First, spin up the Cannon node defined at the [`cannon.json`](cannon.json) file using the `cannon` command and leave it running:

```
npx hardhat cannon
```

On another terminal, create a pair of test tokens that later will be used to swap on a pool, this command will also assign `10000` tokens to the user.

```
npx hardhat --network localhost create-test-token --name 'Synthetix USD' --symbol 'sUSD' --mint 10000
npx hardhat --network localhost create-test-token --name 'USD Coin' --symbol 'USDC' --mint 10000
```

Then, create a pool on uniswap composed of the previously created tokens:

```
npx hardhat --network localhost create-pool sUSD USDC 500
```

Now, you can simply swap between your tokens, like so:

```
npx hardhat --network localhost swap sUSD USDC 500
```
