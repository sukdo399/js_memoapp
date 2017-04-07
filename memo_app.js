var url = "";
// TODO: get from login method.
var username = "";

$(document).ready(function() {
	$("#save").click(save_click);

	$.ajax({
		url: url + username + '/notes',
		dataType: 'json',
		type: 'GET',
		data: {},
		success: function(result){
			for(var i = 0 ; i < result['results'].length; i++){

				// TODO: remove duplicated code...
				// addmemoTable(result['results'][i]);

				$("#memo_table").find('tbody')
				.append($('<tr>')
					.append($('<td>')
						.html(result['results'][i].date)
					)
					.append($('<td>')
						.html(result['results'][i].note)
					)
					.append($('<td>')
						.append($('<input>')
							.attr('type', 'button')
							.attr('value', 'delete')
							.attr('id', result['results'][i].id)
							.attr('onclick', 'deleteMemo(this)')
						)
					)
				);
			}
		},
		error: function(result){
			alert('load error');
		}
	});
});

function deleteMemo(node){
	var del_id = node.getAttribute('id');

	$.ajax({
		url: url + username + '/notes/' + del_id,
		dataType: 'json',
		type: 'DELETE',
		data: {},
		success: function(result){
			$("input[id=" + del_id +"]").parent().parent().empty();
		},
		error: function(result){
			alert('delete error');
		}
	});

}

function addMemoTable(memoResult){
	var id = memoResult['results'][0].id;
	var date = memoResult['results'][0].date;
	var note = memoResult['results'][0].note;

	$("#memo_table").find('tbody')
	.append($('<tr>')
		.append($('<td>')
			.html(date)
		)
		.append($('<td>')
			.html(note)
		)
		.append($('<td>')
			.append($('<input>')
				.attr('type', 'button')
				.attr('value', 'delete')
				.attr('id', id)
				.attr('onclick', 'deleteMemo(this)')
			)
		)
	);
}

function save_click() {
	var date = new Date();
	var dateString = date.getDate()  + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	var id = date.valueOf();

	$.ajax({
		url: url + username + '/notes',
		dataType: 'json',
		type: 'POST',
		data: {
			id: id,
			note: memo.value,
			date: dateString,
		},
		success: function(result){
			memo.value = "";
			addMemoTable(result);
		},
		error: function(result){
			alert('save error');
		}
	});
}
