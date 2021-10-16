const Token = artifacts.require("Token");
const ShopInChain = artifacts.require("ShopInChain");

module.exports = async function(deployer) {

  // Deploy Token
  await deployer.deploy(Token);
  const token = await Token.deployed()

  // Deploy ShopInChain
  await deployer.deploy(ShopInChain, token.address);
  const shopInChain = await ShopInChain.deployed()

  // Transfer all tokens to ShopInChain (1 billion)
  await token.transfer(shopInChain.address, '1000000000000000000000000000')
};
