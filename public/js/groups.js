if (!localStorage.getItem('token')) {
	location.replace('./login.html');
}

const USER_DATA = localStorage.getItem('token');

const fetchMyGroups = async () => {
	try {
		const response = await fetch('http://localhost:8080/api/groups/', {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		const responseJson = await response.json();
		return responseJson;
	} catch (err) {
		alert('Unexpected error!');
		localStorage.clear();
		location.replace('./login.html');
		console.log(err);
	}
};

const displayMyGroups = (data) => {
	const container = document.querySelector('.groups-container');
	let html = '';
	data.forEach((group) => {
		html += `
		<div class="col-sm-3">
		<a href="./bills.html?id=${group.id}">
		<div class="card">
			<div class="card-body text-center">
				<h2 class="card-title">ID: ${group.id}</h2>
				<h5 class="display-6">${group.name}</h5>
			</div>
		</div>
		</a>
	</div>        
        `;
	});
	container.innerHTML = html;
};

const fetchAvailableGroups = async () => {
	try {
		const response = await fetch(
			'http://localhost:8080/api/groups/available-groups',
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		);
		const responseJson = await response.json();
		return responseJson;
	} catch (err) {
		alert('Unexpected error!');
		localStorage.clear();
		location.replace('./login.html');
		console.log(err);
	}
};

const displayAvailableGroups = (data) => {
	const container = document.querySelector('.availableGroups');
	let html = '';
	data.forEach((group) => {
		html += `
		<li class="list-group-item">ID: ${group.id} ${group.name}</li>        
        `;
	});
	container.innerHTML = html;
};

document.addEventListener('DOMContentLoaded', async () => {
	if (!localStorage.getItem('token')) location.replace('./login.html');
	const groups = await fetchMyGroups();
	displayMyGroups(groups);
	const availableGroups = await fetchAvailableGroups();
	displayAvailableGroups(availableGroups);
});

document.querySelector('form').addEventListener('submit', async (event) => {
	event.preventDefault();
	const input = {
		group_id: event.target.elements.addUserToGroup.value,
	};
	try {
		const response = await fetch('http://localhost:8080/api/accounts', {
			method: 'POST',
			body: JSON.stringify(input),
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
		});
		const res = await response.json();
		console.log(res);
		if (res.response) {
			return alert('Bad data!');
		} else {
			location.replace('./groups.html');
		}
	} catch (err) {
		alert('Not save');
		console.log(err);
	}
	console.log(input);
});

// document.getElementById('logout').addEventListener('submit', async (event) => {
// 	event.preventDefault();
// 	try {
// 		const response = await fetch('http://localhost:8080/api/auth/logout', {
// 			headers: {
// 				Authorization: `Bearer ${localStorage.getItem('token')}`,
// 			},
// 		});
// 		const res = await response.json();
// 		console.log(res);
// 		if (res.response) {
// 			return alert('Bad request!');
// 		} else {
// 			location.replace('./login.html');
// 		}
// 	} catch (err) {
// 		alert('Not save');
// 		console.log(err);
// 	}
// 	console.log(input);
// });
