require('@nomiclabs/hardhat-ethers');
require('hardhat-interact');
require('hardhat-cannon');

require('./tasks/transfer');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
};
