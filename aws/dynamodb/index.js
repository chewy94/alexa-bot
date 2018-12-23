var AWS = require('aws-sdk')
AWS.config.loadFromPath('/Users/sean/Desktop/Development/Indie/Halo/alexa-bot/aws/credentials.json')
var db = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// db.listTables('',(err, data) => {
//   console.log(err)
//   console.log(data)
// })

var listTables = function listTables () {
  return new Promise((resolve, reject) => {
    db.listTables('', (err, res) => {
      if (err) reject(err)
      else resolve(res)
    })
  })
}

module.exports = {
  listTables
}