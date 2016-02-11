var txt = document.getElementById('txt');
var btn = document.getElementById('btn');
var todo = document.getElementById('todo');
var clr = document.getElementById('clr');
var gItems;


/*  Events Handler  */
btn.addEventListener('click', function() {
	var str = txt.value;
	if (str.length <= 2) {
		txt.style.borderColor = '#F00';
		return false;
	} else {
		store(str);
		txt.style.borderColor = '';
		txt.value = '';
	}
}, false);
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


/*  Delete Elements  */
(function() {
	var lis = document.querySelectorAll('#todo li');
	var lisL = lis.length;
	for (var i = 0; i < lisL; i++) {
		lis[i].addEventListener('click', function(e) {
			var eId = e.target.id;
			gItems = $.grep(gItems, function(value) {
				return value != gItems[eId];
			});
	 		var items = gItems;
	 		localStorage["items"] = JSON.stringify(items);
	 		window.location.reload();
		}, false)
	}
})();