# Cannon Project Example

Example project for interacting with tokens running by default on a [Cannon](https://usecannon.com) network.

## Usage

First, spin up the Cannon node defined at the [`cannon.json`](cannon.json) file using the `cannon` command and leave it running:

```
npx hardhat cannon
```

Then, you can make transfers using the `transfer` task:

```
npx hardhat --network localhost transfer dai 100 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
```
