const model = require('./model')
const path = require('path')

const POST = (req,res) => {
    const { file } = req.files
    const { userId,title } = req.body
    if(file) { 
      let response = model.uploadFile(file,userId,title)
      console.log(response)
      if(response) {
        res.end(JSON.stringify({message: 'You successfully uploaded!'}))
      } else res.status(404).json({message: 'The fucking file is not defined'})
    } else {
        res.status(404).json({message: 'The file is not defined'})
    }
}

const GET_QUERY = (req,res) => {
  const { userId } = req.query
  let users = require('../../database/users.json')
  let files = require('../../database/files.json')
  users = users.map(user => {
    user.user_id = files.find(file => file.user_id == user.user_id)
    return user
  })
  if(userId) {
    return res.json(files.filter(file => file.user_id == userId))
  } else {
    res.json( users )
  }
}

const download = (req,res) => {
  res.download(path.join(process.cwd(), 'src', 'uploads', req.params.fileName))
}

module.exports = { POST, GET_QUERY, download }