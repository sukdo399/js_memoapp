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
		// console.log(memoList[i].text);
		// console.log(memoList[i].date);
		result = result + memoList[i].date.toString() + " " + memoList[i].text + "\n";
	}
	return result;
}

function save_click() {
	var memoObj = new Object();
	memoObj.date = new Date();
	memoObj.text = memo.value;
	memoList.push(memoObj);
	memo.value = "";
	alert(getMemoTexts());
}
