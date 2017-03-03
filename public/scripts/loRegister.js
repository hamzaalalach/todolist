var name = document.getElementById('firstName'),
	username = document.getElementById('username'),
	email = document.getElementById('email'),
	password = document.getElementById('password'),
	conPassword = document.getElementById('conPassword'),
	check = {},
	alert = document.getElementById('alerts');
function verFirstName() {
	if (/^\w{2,}$/i.test(firstName.value)) {
		check.firstName = true;
		firstName.style.border = '0.008em solid #22A39F';
	} else {
		check.firstName = false;
		firstName.style.border = '0.008em solid #FF0000';
	}
}
function verUsername() {
	if (/^[a-z0-9-_]{6,20}$/i.test(username.value)) {
		check.username = true;
		username.style.border = '0.008em solid #22A39F';
	} else {
		check.username = false;
		username.style.border = '0.008em solid #FF0000';
	}
}
function verEmail() {
	if (/^[a-z0-9-_.]+@[a-z0-9]+\.[\w]{2,3}$/i.test(email.value)) {
		check.email = true;
		email.style.border = '0.008em solid #22A39F';
	} else {
		check.email = false;
		email.style.border = '0.008em solid #FF0000';
	}
}
function verPassword() {
	if (/^[\w\d\s/@]{4,20}$/i.test(password.value)) {
		check.password = true;
		password.style.border = '0.008em solid #22A39F';
	} else {
		check.password = false;
		password.style.border = '0.008em solid #FF0000';
	}
}
function verConPassword() {
	if (conPassword.value === password.value && password.value != '') {
		check.conPassword = true;
		conPassword.style.border = '0.008em solid #22A39F';
	} else {
		check.conPassword = false;
		conPassword.style.border = '0.008em solid #FF0000';
	}
}
function passwordErr() {
	return 'The password must contain at least 4 charaters';
}
function usernameErr() {
	return 'The username must contain at least 6 charaters';
}
function firstNameErr() {
	return 'The first name must contain at least 2 charaters';
}
function emailErr() {
	return 'Enter a valid email';
}
function conPasswordErr() {
	return 'Passwords don\'t match';
}
function genErr(errors) {
	var snackbar = document.getElementById('snackbar'),
		errorsL = errors.length;
	snackbar.innerHTML = '';
	for (var i = 0; i < errorsL; i++) {
		var newErr = document.createTextNode(errors[i]),
			newLi = document.createElement('li');
		newLi.appendChild(newErr);
		snackbar.appendChild(newLi);
	}
	snackbar.className = 'show';
	setTimeout(function() {
		snackbar.className = '';
	}, 5000);
}
firstName.addEventListener('keydown', verFirstName, false);
username.addEventListener('keydown', verUsername, false);
email.addEventListener('keydown', verEmail, false);
password.addEventListener('keydown', verPassword, false);
conPassword.addEventListener('keydown', verConPassword, false);
firstName.addEventListener('blur', verFirstName, false);
username.addEventListener('blur', verUsername, false);
email.addEventListener('blur', verEmail, false);
password.addEventListener('blur', verPassword, false);
conPassword.addEventListener('blur', verConPassword, false);
document.getElementById('form').addEventListener('submit', function(e) {
	verFirstName();
	verUsername();
	verEmail();
	verPassword();
	verConPassword();
	if (check.firstName && check.username && check.email && check.password && check.conPassword) {
		return true;
	} else {
		e.preventDefault();
		passwordErr();
		usernameErr();
		firstNameErr();
		emailErr();
		conPasswordErr();
	}
}, false);
document.getElementById('form').addEventListener('submit', function(e) {
	var errors = [];
	verFirstName();
	verUsername();
	verEmail();
	verPassword();
	verConPassword();
	if (check.firstName && check.username && check.email && check.password && check.conPassword) {
		return true;
	}
	if (!check.password) {
		errors.push(passwordErr());
	}
	if (!check.username) {
		errors.push(usernameErr());
	}
	if (!check.firstName) {
		errors.push(firstNameErr());
	}
	if (!check.email) {
		errors.push(emailErr());
	}
	if (!check.conPassword) {
		errors.push(conPasswordErr());
	}
	if (errors.length !== 0) {
		genErr(errors);
		e.preventDefault();
	}
}, false);