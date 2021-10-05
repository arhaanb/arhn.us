// The SHRN variable in the .env file is supposed to be a hashed password
// Run `npm run pw` (or `yarn pw`) to run this script and generate your hashed password using bcryptjs
// store the hashed password in the `.env` file as `SHRTN`

const readline = require('readline')
const bcrypt = require('bcryptjs')
const clipboardy = require('clipboardy')

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

rl.question('Enter the password you want to use: ', function (password) {
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(password, salt, function (err, hash) {
			if (err) {
				console.log(err)
			}

			console.log(`\n${hash}`)
			clipboardy.writeSync(hash)
			console.log('Add this as the `SHRTN` variable in the `.env` file.')
			console.log('(Copied to clipboard)\n')
			process.exit(0)
		})
	})
})
