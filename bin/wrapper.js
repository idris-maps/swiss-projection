const readline = require('readline')

module.exports = func => {
  const reader = readline.createInterface({
    input: process.stdin,
  })
  
  reader.on('line', line => {
    const json = JSON.parse(line)
    console.log(JSON.stringify(func(json)))
  })
}
