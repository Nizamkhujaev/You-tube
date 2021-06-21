const render = require('../../lib/render')

const GET = (req,res) => {
    res.sendFile(render('upload.html'))
}

module.exports = { GET }