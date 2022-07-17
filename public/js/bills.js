if (!localStorage.getItem('token')) {
	location.replace('./login.html');
}

function getParameter() {
	console.log(window.location.search);
	let parameter = new URLSearchParams(window.location.search);
	console.log(parameter.get('id'));
	return parameter.get('id');
}

const group_id = getParameter();

const fetchGroupTitle = async () => {
	try {
		const response = await fetch(
			'http://localhost:8080/api/bills/group-title',
			{
				method: 'POST',
				body: JSON.stringify({ group_id }),
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					'Content-Type': 'application/json',
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

const displayGroupTitle = (data) => {
	const groupTitle = document.querySelector('h1');
	let html = '';
	data.forEach((title) => {
		html += `
		${title.name}      
        `;
	});
	groupTitle.innerHTML = html;
};

document.addEventListener('DOMContentLoaded', async () => {
	if (!localStorage.getItem('token')) location.replace('./login.html');
	const title = await fetchGroupTitle();
	displayGroupTitle(title);
});

const fetchGroupBills = async () => {
	try {
		const response = await fetch(`http://localhost:8080/api/bills`, {
			method: 'POST',
			body: JSON.stringify({ group_id }),
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
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

const displayGroupBills = (data) => {
	const bills = document.querySelector('tbody');
	let html = '';
	data.forEach((bill) => {
		html += `
        <tr>
			<td>${bill.id}</td>
			<td>${bill.description}</td>
			<td>${bill.amount}</td>
		</tr>      
        `;
	});
	bills.innerHTML = html;
};

const totalAmount = async () => {
	const table = document.querySelector('tbody');
	let sum = 0;
	for (let i = 0; i < table.rows.length; i++) {
		sum = sum + parseInt(table.rows[i].cells[2].innerHTML);
	}
	const tfoot = document.querySelector('tfoot');
	let html = `
    <tr>
		<td colspan="2"><strong>Total</strong></td>
		<td><strong>${sum}</strong></td>
	</tr>`;
	tfoot.innerHTML = html;
};

document.addEventListener('DOMContentLoaded', async () => {
	if (!localStorage.getItem('token')) location.replace('./login.html');
	const bills = await fetchGroupBills();
	displayGroupBills(bills);
	await totalAmount();
});

const fetchGroupMembers = async () => {
	console.log('Gautas ID: ' + group_id);
	try {
		const response = await fetch('http://localhost:8080/api/bills/members', {
			method: 'POST',
			body: JSON.stringify({ group_id }),
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
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

const displayGroupMembers = (data) => {
	const members = document.querySelector('#groupMembers');
	let html = '';
	data.forEach((member) => {
		html += `
		<li class="list-group-item">${member.full_name}</li>        
        `;
	});
	members.innerHTML = html;
};

document.addEventListener('DOMContentLoaded', async () => {
	if (!localStorage.getItem('token')) location.replace('./login.html');
	const members = await fetchGroupMembers();
	displayGroupMembers(members);
});

document.querySelector('form').addEventListener('submit', async (event) => {
	event.preventDefault();
	const input = {
		group_id,
		amount: event.target.elements.newBillAmount.value,
		description: event.target.elements.newBillDescription.value,
	};
	console.log(input);
	try {
		const response = await fetch('http://localhost:8080/api/bills/new', {
			method: 'POST',
			body: JSON.stringify(input),
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
			location.replace(`./bills.html?id=${group_id}`);
		}
	} catch (err) {
		alert('Not save');
		console.log(err);
	}
	console.log(input);
});
