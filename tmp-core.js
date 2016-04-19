
var dListSeats = new DoublyList();
var dListProduction = new DoublyList();
var dListWeight = new DoublyList();
var dListPrice = new DoublyList();

function loadData(){
	$.ajax({
	  url: 'db/core.php',
	  type: "GET",
	  success: function(data){
		var planes = JSON.parse(data);
		console.log(planes);

		createListByIndexSort(dListProduction, 'production', planes);
		createListByIndexSort(dListSeats, 'seats', planes);
		createListByIndexSort(dListWeight, 'weight', planes);
		createListByIndexSort(dListPrice, 'price', planes);
		
		init(dListPrice, 'price');
		init(dListSeats, 'seats');
		init(dListProduction, 'production');
		init(dListWeight, 'weight');
		synhronize('price');
		
		jQuery('#main-block').show();
		jQuery('#load-data-btn').hide();
	  }
	});
}


function createListByIndexSort(list, param, planes) {
	var indexArray = [];
	for (plane in planes) {
		var newUser = {};
		newUser['name'] = planes[plane].name;
		newUser['img'] = planes[plane].img;
		newUser[param] = planes[plane][param];
	    indexArray.push(newUser);
	};
	
	indexArray.sort(function(a,b){
		return parseFloat(a[param]) - parseFloat(b[param]);
	});
	for (plane in indexArray) {		
	    list.add(indexArray[plane]);
	    console.log(list.tail.data);
	};
	console.log('------------------------------------------------');
}

/*
function getParameterByName(name, param){
	for (plane in Planes) {
	    if (Planes[plane].name == name){
	    	var newUser = {};
			newUser['name'] = name;
			newUser[param] = Planes[plane][param];	  
			return newUser;  	
	    }
	};
	return null;
}*/

function init(list, param){
	list.currentNode = list.head;
	first(param, false);
}

function first(param, sync){
	sync = sync == undefined ? true : false;
	var list;
	switch (param){
		case 'price': list = dListPrice; break;
		case 'weight': list = dListWeight; break;
		case 'production':list = dListProduction; break;
		case 'seats': list = dListSeats; break;
	}
	jQuery('#by-' + param + ' .item-first > h4').html("None");
	jQuery('#by-' + param + ' .item-first > span').html("");
	jQuery('#by-' + param + ' .item-current > h4').html(list.head.data.name);
	jQuery('#by-' + param + ' .item-current > span').html(list.head.data[param]);
	jQuery('#by-' + param + ' .item-last > h4').html(list.head.next.data.name);
	jQuery('#by-' + param + ' .item-last > span').html(list.head.next.data[param]);	
	list.currentNode = list.head;
	jQuery('#by-' + param + ' .item-current > img').attr('src', list.currentNode.data.img);
	synhronize(param, sync);
}

function last(param, sync){
	sync = sync == undefined ? true : false;
	var list;
	switch (param){
		case 'price': list = dListPrice; break;
		case 'weight': list = dListWeight; break;
		case 'production':list = dListProduction; break;
		case 'seats': list = dListSeats; break;
	}
	jQuery('#by-' + param + ' .item-first > h4').html(list.tail.previous.data.name);
	jQuery('#by-' + param + ' .item-first > span').html(list.tail.previous.data[param]);
	jQuery('#by-' + param + ' .item-current > h4').html(list.tail.data.name);
	jQuery('#by-' + param + ' .item-current > span').html(list.tail.data[param]);
	jQuery('#by-' + param + ' .item-last > h4').html("None");
	jQuery('#by-' + param + ' .item-last > span').html("");
	list.currentNode = list.tail;
	jQuery('#by-' + param + ' .item-current > img').attr('src', list.currentNode.data.img);
	synhronize(param, sync);
}

function prev(param, sync){
	sync = sync == undefined ? true : false;
	var list;
	switch (param){
		case 'price': list = dListPrice; break;
		case 'weight': list = dListWeight; break;
		case 'production':list = dListProduction; break;
		case 'seats': list = dListSeats; break;
	}
	if (list.currentNode.previous) {
		jQuery('#by-' + param + ' .item-first > h4').html(list.currentNode.previous.previous ? list.currentNode.previous.previous.data.name : 'None');
		jQuery('#by-' + param + ' .item-first > span').html(list.currentNode.previous.previous ? list.currentNode.previous.previous.data[param] : '');
		jQuery('#by-' + param + ' .item-current > h4').html(list.currentNode.previous.data.name);
		jQuery('#by-' + param + ' .item-current > span').html(list.currentNode.previous.data[param]);			
		jQuery('#by-' + param + ' .item-last > h4').html(list.currentNode.previous.next.data.name);
		jQuery('#by-' + param + ' .item-last > span').html(list.currentNode.previous.next.data[param]);
		list.currentNode = list.currentNode.previous;
		jQuery('#by-' + param + ' .item-current > img').attr('src', list.currentNode.data.img);
		synhronize(param, sync);
	} else {
		alert("No previous element: " + list.currentNode.data.name + " is the first");
	}
}

function next(param, sync){
	sync = sync == undefined ? true : false;
	var list;
	switch (param){
		case 'price': list = dListPrice; break;
		case 'weight': list = dListWeight; break;
		case 'production':list = dListProduction; break;
		case 'seats': list = dListSeats; break;
	}
	if (list.currentNode.next) {
		jQuery('#by-' + param + ' .item-first > h4').html(list.currentNode.next.previous.data.name);
		jQuery('#by-' + param + ' .item-first > span').html(list.currentNode.next.previous.data[param]);
		jQuery('#by-' + param + ' .item-current > h4').html(list.currentNode.next.data.name);
		jQuery('#by-' + param + ' .item-current > span').html(list.currentNode.next.data[param]);			
		jQuery('#by-' + param + ' .item-last > h4').html(list.currentNode.next.next ? list.currentNode.next.next.data.name : 'None');
		jQuery('#by-' + param + ' .item-last > span').html(list.currentNode.next.next ? list.currentNode.next.next.data[param] : '');
		list.currentNode = list.currentNode.next;
		jQuery('#by-' + param + ' .item-current > img').attr('src', list.currentNode.data.img);
		synhronize(param, sync);
	} else {
		alert("No next element: " + list.currentNode.data.name + " is the last");
	}
}

function synhronize(param){
	var list;
	switch (param) {
		case 'price': 
			setCurrent('seats', dListSeats.searchByName(dListPrice.currentNode.data.name));
			setCurrent('production', dListProduction.searchByName(dListPrice.currentNode.data.name));
			setCurrent('weight', dListWeight.searchByName(dListPrice.currentNode.data.name));
			break;
		case 'seats': 
			setCurrent('price', dListPrice.searchByName(dListSeats.currentNode.data.name));
			setCurrent('production', dListProduction.searchByName(dListSeats.currentNode.data.name));
			setCurrent('weight', dListWeight.searchByName(dListSeats.currentNode.data.name));
			break;
		case 'production': 
			setCurrent('seats', dListSeats.searchByName(dListProduction.currentNode.data.name));
			setCurrent('price', dListPrice.searchByName(dListProduction.currentNode.data.name));
			setCurrent('weight', dListWeight.searchByName(dListProduction.currentNode.data.name));
			break;
		case 'weight': 
			setCurrent('seats', dListSeats.searchByName(dListWeight.currentNode.data.name));
			setCurrent('production', dListProduction.searchByName(dListWeight.currentNode.data.name));
			setCurrent('price', dListPrice.searchByName(dListWeight.currentNode.data.name));
			break;
	}
}

function setCurrent(param, node){
	var list;
	switch (param){
		case 'price': list = dListPrice; break;
		case 'weight': list = dListWeight; break;
		case 'production':list = dListProduction; break;
		case 'seats': list = dListSeats; break;
	}
	if (node) {
		jQuery('#by-' + param + ' .item-first > h4').html(node.previous ? node.previous.data.name : 'None');
		jQuery('#by-' + param + ' .item-first > span').html(node.previous ? node.previous.data[param] : '');
		jQuery('#by-' + param + ' .item-current > h4').html(node.data.name);
		jQuery('#by-' + param + ' .item-current > span').html(node.data[param]);			
		jQuery('#by-' + param + ' .item-last > h4').html(node.next ? node.next.data.name : 'None');
		jQuery('#by-' + param + ' .item-last > span').html(node.next ? node.next.data[param] : '');
		list.currentNode = node;
		jQuery('#by-' + param + ' .item-current > img').attr('src', list.currentNode.data.img);
	} 
}
