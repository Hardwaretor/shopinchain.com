const Token = artifacts.require('Token')
const ShopInChain = artifacts.require('ShopInChain')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('ShopInChain', ([deployer, investor]) => {
  let token, shopInChain

  before(async () => {
    token = await Token.new()
    shopInChain = await ShopInChain.new(token.address)
    // Transfer all tokens to ShopInChain (1 billion)
    await token.transfer(shopInChain.address, tokens('1000000000'))
  })

  describe('Token deployment', async () => {
    it('contract has a name', async () => {
      const name = await token.name()
      assert.equal(name, 'SHOP')
    })
  })

  describe('ShopInChain deployment', async () => {
    it('contract has a name', async () => {
      const name = await shopInChain.name()
      assert.equal(name, 'ShopInChain VR Shop')
    })

    it('contract has tokens', async () => {
      let balance = await token.balanceOf(shopInChain.address)
      assert.equal(balance.toString(), tokens('1000000000'))
    })
  })

  describe('buyTokens()', async () => {
    let result

    before(async () => {
      // Purchase tokens before each example
      result = await shopInChain.buyTokens({ from: investor, value: web3.utils.toWei('1', 'ether')})
    })

    it('Allows user to instantly purchase tokens from shopInChain for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('100'))

      // Check shopInChain balance after purchase
      let shopInChainBalance
      shopInChainBalance = await token.balanceOf(shopInChain.address)
      assert.equal(shopInChainBalance.toString(), tokens('999999900'))
      shopInChainBalance = await web3.eth.getBalance(shopInChain.address)
      assert.equal(shopInChainBalance.toString(), web3.utils.toWei('1', 'Ether'))

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, token.address)
      assert.equal(event.amount.toString(), tokens('100').toString())
      assert.equal(event.rate.toString(), '100')
    })
  })

  describe('sellTokens()', async () => {
    let result

    before(async () => {
      // Investor must approve tokens before the purchase
      await token.approve(shopInChain.address, tokens('100'), { from: investor })
      // Investor sells tokens
      result = await shopInChain.sellTokens(tokens('100'), { from: investor })
    })

    it('Allows user to instantly sell tokens to shopInChain for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('0'))

      // Check shopInChain balance after purchase
      let shopInChainBalance
      shopInChainBalance = await token.balanceOf(shopInChain.address)
      assert.equal(shopInChainBalance.toString(), tokens('1000000000'))
      shopInChainBalance = await web3.eth.getBalance(shopInChain.address)
      assert.equal(shopInChainBalance.toString(), web3.utils.toWei('0', 'Ether'))

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, token.address)
      assert.equal(event.amount.toString(), tokens('100').toString())
      assert.equal(event.rate.toString(), '100')

      // FAILURE: investor can't sell more tokens than they have
      await shopInChain.sellTokens(tokens('500'), { from: investor }).should.be.rejected;
    })
  })

})