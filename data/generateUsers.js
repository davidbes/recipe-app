const bcrypt = require('bcrypt');
const fs = require('fs');
const stringify = require('csv-stringify');

const rawdata = fs.readFileSync('mocks/users_data.json');
const data = JSON.parse(rawdata);

const filtered = data.results.map(async (res) => {
	const salt = await bcrypt.genSalt(10);
	const bcryptPass = await bcrypt.hash(res.login.password, salt);

	return {
		first: res.name.first,
		last: res.name.last,
		email: res.email,
		pass: res.login.password,
		password: bcryptPass,
		image: res.picture.large,
		language: res.nat,
	};
});

Promise.all(filtered).then((res) => {
	fs.writeFileSync(
		'generated/gen_users.json',
		JSON.stringify(
			res.map((res) => {
				return {
					firstName: res.first,
					lastName: res.last,
					email: res.email,
					password: res.password,
					image: res.image,
					language: res.language,
					saved: [],
				};
			})
		)
	);

	let fileString = '';
	let separator = ',';
	let fileType = 'csv';
	let file = `generated/login_data.${fileType}`;

	res.forEach((transaction) => {
		Object.values(transaction).forEach(
			(value) => (fileString += `${value}${separator}`)
		);
		fileString = fileString.slice(0, -1);
		fileString += '\n';
	});

	fs.writeFileSync(file, fileString, 'utf8');
});
