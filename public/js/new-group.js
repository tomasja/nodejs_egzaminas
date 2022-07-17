if (!localStorage.getItem('token')) {
	location.replace('./login.html');
}

document.addEventListener('DOMContentLoaded', async () => {
	document.querySelector('form').addEventListener('submit', async (e) => {
		e.preventDefault();
		const data = {
			newGroupName: e.target.elements.newGroupName.value,
		};
		try {
			const response = await fetch('http://localhost:8080/api/groups', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					'Content-Type': 'application/json',
				},
			});
			const res = await response.json();
			console.log();
			if (res.details) {
				return alert('Bad data!');
			} else {
				location.replace('./groups.html');
			}
		} catch (err) {
			alert('Not save');
			console.log(err);
		}
		console.log(data);
	});
});
