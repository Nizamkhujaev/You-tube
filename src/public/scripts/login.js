let form = document.querySelector('.auth-form')
let username = document.querySelector('#text')
let password = document.querySelector('#password')
let file = document.querySelector('#auth-input')

form.addEventListener('submit', async e => {
    e.preventDefault()
    
    let formData = new FormData()
    formData.append('file', file.files[0])
    formData.append('username', username.value)
    formData.append('password', password.value)

    let response = await fetch('/login', {
        method: 'POST',
        body: formData
    })

    response = await response.json()

    console.log(response)

    if(response) {
        if(response.username == null) {
            alert(response.message)
        } else{
            window.localStorage.setItem('token', response.token)
            window.localStorage.setItem('username', response.username)
            window.localStorage.setItem('userId', response.userId)
            window.location = '/'
        }
    }

})

let token = window.localStorage.getItem('token')

if(token) {
    window.location = '/'
}
