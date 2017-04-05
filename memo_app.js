var memoList = [];
var memo;

window.addEventListener('DOMContentLoaded', function(){
	memo = document.getElementById("memo");

	var save_button = document.getElementById('save');
	save_button.addEventListener('click', save_click);
});

function getMemoTexts(){
	var result = "";
	for(var i=0; i < memoList.length; i ++){
		result = result + memoList[i].date + " " + memoList[i].text + "\n";
	}
	return result;
}

function deleteMemo(node){
	var del_node = node.parentNode.parentNode;
	var del_uid = node.getAttribute('uid');


	del_node.parentNode.removeChild(del_node);

	var memoObj = memoList.filter(function ( obj ) {
		return obj.uid.toString() === del_uid;
	})[0];
	// console.dir(memoObj);
	var index = memoList.indexOf(memoObj);
	if (index > -1) {
		memoList.splice(index, 1);
	}
}

function addMemoTable(){
	var memoObj = memoList[memoList.length-1];

	var uid = memoObj.uid;
	var date = memoObj.date;
	var text = memoObj.text;

	var m_table = document.getElementById("memo_table");
	// if(m_table.hasAttribute("border") == false){
	// 	m_table.setAttribute("border", "1");
	// }

	var tr = document.createElement('tr');
	var td_date = tr.appendChild(document.createElement('td'));
	td_date.innerHTML = date.getDate()  + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + " " +
date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	var td_memo = tr.appendChild(document.createElement('td'));
	td_memo.innerHTML = text;

	var td_delete = tr.appendChild(document.createElement('td'));
	var delete_button = document.createElement('input');
	delete_button.setAttribute("type", "button");
	delete_button.setAttribute("value", "delete");
	delete_button.setAttribute("uid", uid); 	// cast to string.
	delete_button.setAttribute("onclick", "deleteMemo(this)");
	td_delete.appendChild(delete_button);

	m_table.appendChild(tr);
}

function save_click() {
	var memoObj = new Object();
	date = new Date();
	// assume that date.valueOf() is "most likely" a unique number
	memoObj.uid = date.valueOf();
	memoObj.date = date;
	memoObj.text = memo.value;
	memoList.push(memoObj);
	memo.value = "";
	// alert(getMemoTexts());
	addMemoTable();
}
