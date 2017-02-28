function XHR() {
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	this.xhr = xhr;
}
var tsk = document.getElementById('tsk'),
	submit = document.getElementById('submit'),
	todo = document.getElementById('todo'),
	clr = document.getElementById('clr');


/*  Events Handler  */
submit.addEventListener('click', function() {
	var str = tsk.value;
	if (str.length <= 2) {
		tsk.style.borderTop = '0.8em solid #F00';
		tsk.setAttribute('placeHolder', 'Type something first :D');
		return false;
	} else {
		tsk.style.borderColor = '';
		tsk.value = '';
		var xhr = new XHR().xhr;
		xhr.open('POST', '/add/' + str);
		xhr.send();
		xhr.addEventListener('readystatechange', function() {
			if (this.readyState == 4 & this.status == 200) {
				var data = JSON.parse(this.responseText),
					newDiv = document.createElement('div'),
					newLi = document.createElement("li"),
					newLiTxt = document.createTextNode(str),
					newSpan = document.createElement("span"),
					newSpanTxt = document.createTextNode(data.date),
					newRemoveBtn = document.createElement("button"),
					newEditBtn = document.createElement('button'),
					newEditBtnTxt = document.createTextNode('Edit'),
					newRemoveBtnTxt = document.createTextNode('Remove');
				newEditBtn.className = 'edit';
				newRemoveBtn.className = 'remove';
				newEditBtn.appendChild(newEditBtnTxt);
				newRemoveBtn.appendChild(newRemoveBtnTxt);
				newSpan.id = "creationDate";
				newSpan.appendChild(newSpanTxt);
				newDiv.id = data.id;
				newLi.appendChild(newLiTxt);
				newDiv.appendChild(newLi);
				newDiv.appendChild(newSpan);
				newDiv.appendChild(newEditBtn);
				newDiv.appendChild(newRemoveBtn);
				document.getElementById("todo").appendChild(newDiv);
				newRemoveBtn.addEventListener('click', remove, false);
				newEditBtn.addEventListener('click', edit, false);
			}
		}, false);
	}
}, false);
clr.addEventListener('click', function() {
		var ask = confirm('Are you sure you want to delete all today\'s tasks?');
		if (ask) {
			var xhr = new XHR().xhr;
			xhr.open('GET', '/remove/');
			xhr.send();
			todo.innerHTML = '';
	} else {
		return false;
	}
}, false);
tsk.addEventListener('keydown', function(e) {
	if (e.keyCode == 13) {
		submit.click();
	}
}, false);

/*  Delete/Edit Elements  */
(function() {
	var removeBtns = document.querySelectorAll('.remove'),
		editBtns = document.querySelectorAll('.edit'),
		removeBtnsL = removeBtns.length,
		editBtnsL = editBtns.length;
	for (var i = 0; i < removeBtnsL; i++) {
		removeBtns[i].addEventListener('click', remove, false);
		editBtns[i].addEventListener('click', edit, false);
	}
})();
function remove(e) {
	var xhr = new XHR().xhr,
		id = e.target.parentNode.id;
	xhr.open('GET', '/remove/' + id);
	xhr.send();
	document.getElementById(id).parentNode.removeChild(document.getElementById(id));
}
function edit(e) {
	var newElem,
		div = e.target.parentNode,
		li = div.querySelector('li');
	if (/([\w\d\s]+)/i.test(li.innerHTML)) {
 		modElem = prompt('Editing...', RegExp.$1);
	}
	if (modElem != li.innerHTML && modElem.length >= 3) {
		var xhr = new XHR().xhr;
		xhr.open('GET', '/edit/' + div.id + '/' + modElem);
		xhr.send();
		li.innerHTML = modElem;
	} else {
		return false;
	}
}