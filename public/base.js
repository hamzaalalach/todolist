var txt = document.getElementById('txt'),
	btn = document.getElementById('btn'),
	todo = document.getElementById('todo'),
	clr = document.getElementById('clr'),
	gItems;


/*  Events Handler  */
// btn.addEventListener('click', function() {
// 	var str = txt.value;
// 	if (str.length <= 2) {
// 		txt.style.borderTop = '0.8em solid #F00';
// 		txt.setAttribute('placeHolder', 'Type something first :D');
// 		return false;
// 	} else {
// 		store(str);
// 		txt.style.borderColor = '';
// 		txt.value = '';
// 	}
// }, false);
clr.addEventListener('click', function() {
	if (gItems.length !== 0) {
		var ask = confirm('Are you sure you want to delete all today\'s tasks?');
		if (ask) {
			var i = gItems.length;
			var b = 0;
			while (b < i) {
				gItems.shift();
				b++;
				var items = gItems;
				localStorage["items"] = JSON.stringify(items);
				window.location.reload();
			}
		}
	} else {
		return false;
	}
}, false);
txt.addEventListener('keydown', function(e) {
	if (e.keyCode == 13) {
		btn.click();
	}
}, false);


/*  Init  */
(function() {
	if (localStorage["items"]) {
		gItems = JSON.parse(localStorage["items"]);
	} else {
		var items = [];
		localStorage["items"] = JSON.stringify(items);
		gItems = JSON.parse(localStorage["items"]);
	}
	var i = gItems.length - 1;
	var b = 0;
	while(b <= i){
		var li = document.createElement('li');
		li.id = b;
		li.innerHTML = gItems[b];
		todo.appendChild(li);
		b++;
	}
})();


/*  Store Elements  */
function store(str) {
	var i = gItems.length; 
	gItems[i] = str;
	var li = document.createElement('li');
	li.innerHTML = gItems[i];
	todo.appendChild(li);
	var items = gItems;
	localStorage["items"] = JSON.stringify(items);
	window.location.reload();
}


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
				gItems = $.grep(gItems, function(value) {
					return value != gItems[eId];
				});
		 		var items = gItems;
		 		localStorage["items"] = JSON.stringify(items);
		 		window.location.reload();
		 	}
		 	function edit() {
		 		var modElem = prompt('Editing...', e.target.innerHTML);
		 		if (modElem != e.target.innerHTML && modElem.length >= 3) {
		 			var gItemsL = gItems.length;
					for (var i = 0; i < gItemsL; i++) {
						gItems[eId] = modElem;
					}
			 		var items = gItems;
			 		localStorage["items"] = JSON.stringify(items);
			 		window.location.reload();
		 		} else {
		 			return false;
		 		}
				
		 	}
		}, false)
	}
})();