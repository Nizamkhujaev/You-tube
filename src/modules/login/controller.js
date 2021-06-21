const render = require('../../lib/render')
const model = require('./model')
let { instance } = require('../../lib/crypt')

let idd = 1;

const POST = (req,res) => {
    const { file } = req.files
    const { username, password } = req.body
    if(file) { 
      let response = model.uploadFile(file,username,password)
      console.log(response)
      if(response) {
        res.end(JSON.stringify({
            message: 'You successfully joined!',
            username: username,
            userId: instance.crypt(username + idd),
            token: instance.crypt(username)
        }))
      } else res.status(404).json({message: 'The fucking file is not defined'})
    } else {
        res.status(404).json({message: 'The file is not defined'})
    }
}

const GET = (req,res) => {
  console.log(req.method)
    res.sendFile(render('login.html'))
}

const GET_FILES = (req,res) => {
  let users = model.getUser()
  res.json(users)
}



module.exports = { GET, POST, GET_FILES }