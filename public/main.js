$(function() {
  var order = $("thead th").data('order');
  var sorted = [];

  function makeTable(collection) {
    var out = collection.map(function(val) {
      return ("<tr>" + "<td>" + val.id + "</td>" + "<td>" + val.name + "</td>" + "<td>" +
      val.chinese + "</td>" + "<td>" + val.math + "</td>" + "<td>" + val.english + "</td>" + "<td>" + "删除" + "</td>" + "</tr>");
    }).join();

    return out;
  }

  $("thead").on("click", "th", function() {
    var key = $(this).data('tip');
    $.get('/sort', {sortKey: key, order: order}, function(result) {
      sorted = makeTable(result);
      $("tbody").empty();
      $("tbody").append(sorted);
    });

    if(order === "asc") {
      order = "desc";
    } else {
      order = "asc";
    }
  });

  $(".table-score-tbody").on("click", "td", function() {
    var key = $(this).data('id');
    $.get('/delete', {id: key}, function(res) {
        $.get('/', function(res) {});
    });
  });

});
