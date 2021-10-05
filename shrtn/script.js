var btn = document.getElementById('subbtn')

function createLink(e) {
	var name1 = document.getElementById('name').value
	var link = document.getElementById('link').value
	var backlink = document.getElementById('backlink').value
	var password = document.getElementById('password').value
	e.preventDefault()
	btn.innerHTML = 'Loading'

	var data = {
		linkName: name1,
		link,
		backlink,
		password
	}

	axios.post('/api/shrtn', data).then((res) => {
		if (res.data.error == true) {
			document.getElementById('error').innerText = res.data.message
			password = ''
			btn.innerText = 'Create Link'
		} else {
			document.getElementById(
				'successlink'
			).innerText = `arhn.us/${res.data.backlink1}`
			document.getElementById('successlink').setAttribute('href', res.data.link)
			document.getElementById('before').style.display = 'none'
			document.getElementById('after').style.display = 'block'
		}
	})
}
