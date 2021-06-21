const render = require('../../lib/render')

const GET = (req, res) => {
    res.sendFile(render('index.html'))
}

module.exports = { GET }