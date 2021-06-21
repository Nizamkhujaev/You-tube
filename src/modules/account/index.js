const router = require('express').Router()
const { GET} =  require('./controller')

router.route('/account')
.get(GET)

module.exports = router