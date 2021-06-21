console.log('fuck')
let token = window.localStorage.getItem('token');
if(!token) {
    window.location = '/login'
}

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

let liWrapper = document.querySelector('.main-section-left-wrapper')
let holder = document.querySelector('.video-block')

async function userRender() {
    let users = await request('/users', 'GET')
    if(users) {
        users.forEach(item => {
            console.log(item)

            let li = document.createElement('li')
            li.setAttribute('class', 'main-section-left-wrapper-list')
            let img = document.createElement('img')
            img.setAttribute('class', 'main-section-left-wrapper-list__img')
            let text = document.createElement('h4')
            text.setAttribute('class', 'main-section-left-wrapper-list__title')
            img.src = item.file_link
            text.textContent = item.username
            li.appendChild(img)
            li.appendChild(text)

            // console.log(li)

            li.addEventListener('click', async e => {

                let uploads = await request('/upload-files?userId=' +  item.user_id, 'GET')
                console.log(uploads)
                if(uploads){
                    holder.innerHTML = null
                    uploads.forEach(item => {
                        let videoCard = document.createElement('div')
                        videoCard.setAttribute('class', 'video-card')
                        let video = document.createElement('video')
                        let videoBottom = document.createElement('div')
                        videoBottom.setAttribute = ('class', 'video-card-bottom')
                        let a = document.createElement('a')
                        a.setAttribute('href', 'download/' + item.file_link)
                        let videoBottomImg = document.createElement('img')
                        videoBottomImg.src = ('../images/icons/download.svg')
                        videoBottomImg.style.fill = ('#fff !important')
                        videoBottom.style.display = ('flex')
                        videoBottom.style.alignItems = ('center')
                        videoBottom.style.padding = ('5px 10px')
                        videoBottomImg.style.cursor = ('pointer')
                        videoBottom.style.justifyContent = ('space-between')
                        let title = document.createElement('h4')
                        title.textContent = item.title
                        video.setAttribute('controls', 'controls')
                        video.setAttribute('class', 'video')
                        let src = document.createElement('source')
                        src.src = item.file_link

                        
                        video.appendChild(src)
                        videoCard.appendChild(video)
                        videoBottom.appendChild(title)
                        a.appendChild(videoBottomImg)
                        videoBottom.appendChild(a)
                        videoCard.appendChild(videoBottom)
                        holder.appendChild(videoCard)
                    })
                }
            })

            liWrapper.appendChild(li)


            if(localStorage.getItem('username') == item.username) {
                imgHolder.src = item.file_link
            }
            if(localStorage.getItem('username') == item.username) {
                localStorage.setItem('userIdd', item.user_id)
            }
        })
    }
}

userRender()