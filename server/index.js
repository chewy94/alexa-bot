var express = require('express')
var BigNumber = require('bignumber.js')
var blockchain = require('./../blockchain')
var bodyParser = require('body-parser')
var db = require('./../aws/dynamodb')
var app = express();
var PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.listTables().then((res) => {
  console.log(res)
})

app.get('/api/v1/block', async (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'block number retrieved successfully',
    block: await blockchain.blockNumber()
  })
});

app.get('/api/v1/balance/:addr', async (req, res) => {
  var balanceWei = await blockchain.getBalance(req.params.addr)
  balanceWei = new BigNumber(balanceWei)

  res.status(200).send({
    success: 'true',
    message: 'balance retrieved successfully',
    balanceWei: balanceWei.toString(),
    balance: balanceWei.div(1e18).toString()
  })
});

app.post('/api/v1/send', async (req, res) => {
  if(!req.body.to) {
    return res.status(400).send({
      success: 'false',
      message: 'to is required'
    });
  } else if(!req.body.value) {
    return res.status(400).send({
      success: 'false',
      message: 'value is required'
    });
  }
  var value = (new BigNumber(req.body.value)).times(1e18)
  console.log(value.toString())
  var receipt = await blockchain.sendTransaction(req.body.to, value)

  res.status(200).send({
    success: 'true',
    message: 'sent transaction successfully',
    receipt
  })
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});