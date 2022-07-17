const createUser = async (data) => {
	try {
		const response = await fetch('http://localhost:8080/api/auth/register', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const user = await response.json();
		return user;
	} catch (err) {
		alert('err');
		console.log(err);
	}
};

document.querySelector('form').addEventListener('submit', async (event) => {
	event.preventDefault();
	const input = {
		full_name: event.target.elements.full_name.value,
		email: event.target.elements.email.value,
		password: event.target.elements.password.value,
		repPassword: event.target.elements.repPassword.value,
	};
	console.log(input);
	if (!input.full_name || !input.email || !input.password || !input.repPassword)
		return alert('Please fill all data!');
	const user = await createUser(input);
	if (user.insertId) {
		location.replace('../login.html');
	} else {
		alert('User is not created!');
	}
});
