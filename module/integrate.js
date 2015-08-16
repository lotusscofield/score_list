function integrate(collection) {
  var score_list = [];
  collection.forEach(function(item) {
    for (var i = 0; i < score_list.length; i++) {
      if (score_list[i].id === item.student_id) {
        score_list[i][item.course] = item.score;
        return;
      }
    }

    var obj = {};
    obj.id = item.student_id;
    obj.name = item.name;
    obj[item.course] = item.score;
    score_list.push(obj);
  });

  return score_list;
}

module.exports = integrate;
