var xhr;
if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
} else {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
var txt = document.getElementById('txt'),
	btn = document.getElementById('btn'),
	todo = document.getElementById('todo'),
	clr = document.getElementById('clr');


/*  Events Handler  */
btn.addEventListener('click', function() {
	var str = txt.value;
	if (str.length <= 2) {
		txt.style.borderTop = '0.8em solid #F00';
		txt.setAttribute('placeHolder', 'Type something first :D');
		return false;
	} else {
		txt.style.borderColor = '';
		txt.value = '';
		xhr.open('POST', '/add/' + str);
		xhr.send();
		xhr.addEventListener('readystatechange', function() {
			if (this.readyState == 4 & this.status == 200) {
				var newLi = document.createElement("li"),
					newLiTxt = document.createTextNode(str);
				newLi.id = JSON.parse(this.responseText);
				newLi.appendChild(newLiTxt);
				document.getElementById("todo").appendChild(newLi);
			}
		}, false);
	}
}, false);
clr.addEventListener('click', function() {
		var ask = confirm('Are you sure you want to delete all today\'s tasks?');
		if (ask) {
			window.location = '/ss';
	} else {
		return false;
	}
}, false);
txt.addEventListener('keydown', function(e) {
	if (e.keyCode == 13) {
		btn.click();
	}
}, false);

/*  Delete/Edit Elements  */
(function() {
	var lis = document.querySelectorAll('#todo li');
	var lisL = lis.length;
	var divE = false;
	for (var i = 0; i < lisL; i++) {
		lis[i].addEventListener('dblclick', function(e) {
			var eId = e.target.id;
			var left = e.clientX;
			var top = e.clientY;
			var div;
			if (divE) {
				hideMenu();
			} else {
				div = document.createElement('div');
				divE = true;
				document.getElementsByTagName('body')[0].appendChild(div);
				openMenu();
			}
			function openMenu() {
				div.className = 'menu';
				div.style.top = top + 'px';
				div.style.left = left + 'px';
				var ul = document.createElement('ul'),
					li1 = document.createElement('li'),
					li1Txt = document.createTextNode('Edit');
				li1.appendChild(li1Txt);
				var li2 = document.createElement('li'),
					li2Txt = document.createTextNode('Remove');
				li2.appendChild(li2Txt);
				ul.appendChild(li1);
				ul.appendChild(li2);
				div.appendChild(ul);

				li2.addEventListener('click', function() {
					hideMenu();
					remove();
				}, false)
				li1.addEventListener('click', function() {
					hideMenu();
					edit();
				}, false)
			}
			function hideMenu() {
				var div = document.querySelector('.menu');
				div.parentNode.removeChild(div);
				divE = false;
			}
			function remove() {
		 			xhr.open('GET', '/remove/' + eId);
		 			xhr.send();
		 			document.getElementById(eId).parentNode.removeChild(e.target);
		 	}
		 	function edit() {
		 		var modElem = prompt('Editing...', e.target.innerHTML);
		 		if (modElem != e.target.innerHTML && modElem.length >= 3) {
		 			xhr.open('GET', '/edit/' + eId + '/' + modElem);
		 			xhr.send();
		 			document.getElementById(eId).innerHTML = modElem;
		 		} else {
		 			return false;
		 		}
				
		 	}
		}, false)
	}
})();