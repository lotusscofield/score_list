$(function() {
  var order = $("thead th").data('order');
  var sorted = [];

  function makeTable(collection) {
    var out = collection.map(function(val) {
      var id  = val.id;
      return ("<tr id=" + id + ">" + "<td>" + val.name + "</td>" + "<td>" +
      val.chinese + "</td>" + "<td>" + val.math + "</td>" + "<td>" + val.english + "</td>" + "<td class='delete' data-id=" + id + ">" + "删除" + "</td>" + "</tr>");
    }).join();

    return out;
  }

  $("thead").on("click", "th", function() {
    var key = $(this).data('tip');
    $.get('/sort', {sortKey: key, order: order}, function(result) {
      sorted = makeTable(result);
      $("tbody").html(sorted);
    });

    if(order === "asc") {
      order = "desc";
    } else {
      order = "asc";
    }
  });

  $("tbody").on("click", ".delete", function() {
    var key = $(this).data('id');
    $.get('/delete', {id: key}, function(res) {
      var a = confirm("Are you sure to delete？");
        if (a) {
          $("tbody #" + key).remove();
        }
    });
  });

  $("tfoot").on("click", ".add", function() {
    var add_name = $("#add_name").val();
    var add_chinese = $("#add_chinese").val();
    var add_math = $("#add_math").val();
    var add_english = $("#add_english").val();

    $.ajax({
      url: '/add',
      type: "POST",
      data:{name:add_name, chinese:add_chinese, math:add_math, english:add_english},
      success:function(resq) {
        var id = resq.id;
        var newRecord = "<tr id=" + id + ">" + id + "<td>" + add_name + "</td>" + "<td>" +
        add_chinese + "</td>" + "<td>" + add_math + "</td>" + "<td>" + add_english + "</td>" +
        "<td class='delete' data-id=" + id + ">" + "删除" + "</td>" + "</tr>";
        $("tbody").append(newRecord);

        $("#add_name").val('');
        $("#add_chinese").val('');
        $("#add_math").val('');
        $("#add_english").val('');
      }
    });
});



});
