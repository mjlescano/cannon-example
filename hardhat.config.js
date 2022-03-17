require('@nomiclabs/hardhat-ethers');
require('hardhat-cannon');
require('hardhat-interact');

require('./tasks/swap');
require('./tasks/init-pool');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
};
