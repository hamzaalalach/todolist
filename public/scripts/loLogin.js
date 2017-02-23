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
username.addEventListener('keydown', verUsername, false);
password.addEventListener('keydown', verPassword, false);
username.addEventListener('blur', verUsername, false);
password.addEventListener('blur', verPassword, false);
document.getElementById('form').addEventListener('submit', function(e) {
	verUsername();
	verPassword();
	if (check.username && check.password) {
		return true;
	} else {
		e.preventDefault();
	}
}, false);