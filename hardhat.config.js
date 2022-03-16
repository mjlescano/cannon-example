require('@nomiclabs/hardhat-ethers');
require('hardhat-cannon');

require('./tasks/create-test-token');
require('./tasks/create-pool');
require('./tasks/swap');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
};
