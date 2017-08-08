var username = document.getElementById('username'),
	password = document.getElementById('password'),
	check = {};
function verUsername() {
	if (/^[a-z0-9-_]{6,20}$/i.test(username.value)) {
		check.username = true;
		username.style.border = '0.008em solid #22A39F';
	} else {
		check.username = false;
		username.style.border = '0.008em solid #FF0000';
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
function passwordErr() {
	return 'The password must contain at least 4 charaters';
}
function usernameErr() {
	return 'The username must contain at least 6 charaters';
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
username.addEventListener('keydown', verUsername, false);
password.addEventListener('keydown', verPassword, false);
username.addEventListener('blur', verUsername, false);
password.addEventListener('blur', verPassword, false);
document.getElementById('form').addEventListener('submit', function(e) {
	var errors = [];
	verUsername();
	verPassword();
	if (check.username && check.password) {
		return true;
	}
	if (!check.password) {
		errors.push(passwordErr());
	}
	if (!check.username) {
		errors.push(usernameErr());
	}
	if (errors.length !== 0) {
		genErr(errors);
		e.preventDefault();
	}
}, false);