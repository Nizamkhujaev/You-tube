const homeRouter = require('./home')
const loginRouter = require('./login')
const accountRouter = require('./account')
const fileRouter = require('./uploads')
const register = require('./register')

module.exports = [
    homeRouter,
    loginRouter,
    accountRouter,
    fileRouter
]