const { mhid } = require('../../lib/mhid')
const path = require('path')
const fs = require('fs')

const uploadFile = (file,username,password) => {
    let fileName = mhid(5) + file.name.replace(/\s/g, "")
    file.mv(path.join(process.cwd(), 'src', 'uploads', fileName), err => {
        if(err) console.log(err)
        let arr = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'UTF-8')
        arr = arr ? JSON.parse(arr) : []
        let id = arr.length ? arr[arr.length - 1].file_id + 1 : 1
        let newFile = {
            file_id: id,
            file_link: fileName,
            username,
            password
        }

        arr.push(newFile)
        fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), JSON.stringify(arr,null,4))
    })

    return true
}

const getUser = () => {
    try{
        let arr = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'UTF-8')
        arr = arr ? JSON.parse(arr) : []
        console.log(arr)
        return arr
    } catch(err) {
        console.log(err)
    }
}

module.exports = { uploadFile, getUser }