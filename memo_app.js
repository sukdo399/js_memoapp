var memoList = [];

window.addEventListener('DOMContentLoaded', function(){
	$("#save").click(save_click);
});

function deleteMemo(node){
	var del_uid = node.getAttribute('uid');
	$("input[uid="+del_uid+"]").parent().parent().empty();

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
	var date = memoObj.date.getDate()  + "-" + (memoObj.date.getMonth()+1) + "-" + memoObj.date.getFullYear() + " " +
memoObj.date.getHours() + ":" + memoObj.date.getMinutes() + ":" + memoObj.date.getSeconds();
	var text = memoObj.text;

	$("#memo_table").find('tbody')
	.append($('<tr>')
		.append($('<td>')
			.html(date)
		)
		.append($('<td>')
			.html(text)
		)
		.append($('<td>')
			.append($('<input>')
				.attr('type', 'button')
				.attr('value', 'delete')
				.attr('uid', uid)
				.attr('onclick', 'deleteMemo(this)')
			)
		)
	);
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
	addMemoTable();
}
