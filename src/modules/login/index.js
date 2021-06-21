const router = require('express').Router()
const { GET, POST,GET_FILES } =  require('./controller')

router.route('/login')
.get(GET)
.post(POST)

router.route('/users')
.get(GET_FILES)

module.exports = router