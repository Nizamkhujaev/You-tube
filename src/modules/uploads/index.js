const router = require('express').Router()
const { POST, GET_QUERY,download } =  require('./controller')

router.route('/upload-files')
.post(POST)

router.route('/upload-files')
.get(GET_QUERY)

router.route('/download/:fileName')
.get( download )

module.exports = router