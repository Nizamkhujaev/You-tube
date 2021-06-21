const path = require('path')

const render = (htmlFile) => {
    return path.join(process.cwd(), 'src', 'views', htmlFile)
}

module.exports = render