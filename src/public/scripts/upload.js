let token = window.localStorage.getItem('token');
if(!token) {
    window.location = '/login'
}

console.log('fuck')

let imgHolder = document.querySelector('#img-holder')

async function request (path, method, body) {
	let response = await fetch(path, {
		method,
		headers: {
			token: localStorage.getItem('token'),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})

	return await response.json()
}

async function userRender() {
    let users = await request('/users', 'GET')
    if(users) {
        users.forEach(item => {
            if(localStorage.getItem('username') == item.username) {
                imgHolder.src = item.file_link
            }
        })
    }
}

userRender()

let form = document.querySelector('.upload-video-form')
let fileInput = document.querySelector('#input-file')
let input = document.querySelector('.upload-video-form__input-text')

form.addEventListener('submit', async e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', fileInput.files[0])
    formData.append('title', input.value)
    formData.append('userId', localStorage.getItem('userIdd'))

    let response = await fetch('/upload-files', {
        method: 'POST',
        body: formData
    })

    response = await response.json()

    form.reset()
})