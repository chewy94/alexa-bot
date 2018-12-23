var Web3 = require('web3')
var net = require('net')

var web3 = new Web3(new Web3.providers.IpcProvider('../../../../../../Desktop/network_scripts/testnet/full/qdata/geth.ipc', net))

var blockNumber = async function getCurrentBlockNumber () {
  return await web3.eth.getBlockNumber()
}

var getBalance = async function getBalance (address) {
  return await web3.eth.getBalance(address)
}

var sendTransaction = async function sendTransaction (to, value) {
  return await web3.eth.sendTransaction({
    from: '0xc89065e6fffce7766bda032387ca0fb44183d3e6',
    to,
    value
  })
}

module.exports = {
  blockNumber,
  getBalance,
  sendTransaction
}