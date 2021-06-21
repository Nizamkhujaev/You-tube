const { mhid } = require('../../lib/mhid')
const path = require('path')
const fs = require('fs')

const uploadFile = (file,userId,title) => {
    let fileName = mhid(5) + file.name.replace(/\s/g, "")
    file.mv(path.join(process.cwd(), 'src', 'uploads', fileName), err => {
        if(err) console.log(err)
        let arr = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'files.json'), 'UTF-8')
        arr = arr ? JSON.parse(arr) : []
        let id = arr.length ? arr[arr.length - 1].file_id + 1 : 1
        let newFile = {
            file_id: id,
            file_link: fileName,
            user_id: userId,
            title
        }
        arr.push(newFile)
        fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'files.json'), JSON.stringify(arr,null,4))
    })
    return true
}

module.exports = {uploadFile}