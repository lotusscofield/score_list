
function sortByOrder(sortKey, order, list) {
	if (order === "asc") {
		result = list.sort(function(a,b) {
			return (parseInt(a[sortKey]) - parseInt(b[sortKey]));
		});
	}	else {
		result = list.sort(function(a,b) {
			return (parseInt(b[sortKey]) - parseInt(a[sortKey]));
		});
	}

	return result;
}

module.exports = sortByOrder;
