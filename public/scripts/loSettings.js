var firstName = document.getElementById('firstName'),
	email = document.getElementById('email'),
	password = document.getElementById('password'),
	conPassword = document.getElementById('conPassword'),
	oldPassword = document.getElementById('oldPassword'),
	check = {},
	iniName = firstName.value,
	iniEmail = email.value;
function verFirstName() {
	if (/^\w{2,}$/i.test(firstName.value)) {
		check.firstName = true;
		firstName.style.border = '0.008em solid #22A39F';
	} else {
		check.firstName = false;
		firstName.style.border = '0.008em solid #FF0000';
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
function verOldPassword() {
	if (/^[\w\d\s/@]{4,20}$/i.test(oldPassword.value)) {
		check.oldPassword = true;
		oldPassword.style.border = '0.008em solid #22A39F';
	} else {
		check.oldPassword = false;
		oldPassword.style.border = '0.008em solid #FF0000';
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
	return 'The new password must contain at least 4 charaters';
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
function oldPasswordErr() {
	return 'The old password must contain at least 4 charaters';
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
email.addEventListener('keydown', verEmail, false);
password.addEventListener('keydown', verPassword, false);
conPassword.addEventListener('keydown', verConPassword, false);
oldPassword.addEventListener('keydown', verOldPassword, false);
firstName.addEventListener('blur', verFirstName, false);
email.addEventListener('blur', verEmail, false);
password.addEventListener('blur', verPassword, false);
conPassword.addEventListener('blur', verConPassword, false);
oldPassword.addEventListener('blur', verOldPassword, false);
document.getElementById('submit').addEventListener('click', function(e) {
	var errors = [];
	if (iniName != firstName.value) {
		verFirstName();
	} else {
		check.firstName = true;
	}
	if (iniEmail != email.value) {
		verEmail();
	} else {
		check.email = true;
	}
	if (password.value != '') {
		verPassword();
		verConPassword();
	} else {
		check.password = true;
		check.conPassword = true;
	}
	verOldPassword();
	if (check.firstName && check.oldPassword && check.email && check.password && check.conPassword) {
		return true;
	}
	if (!check.password) {
		errors.push(passwordErr());
	}
	if (!check.oldPassword) {
		errors.push(oldPasswordErr());
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