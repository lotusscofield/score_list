var sortByOrder = require('./module/sort.js');
var integrate = require('./module/integrate.js');


var express = require('express');
var	app = express();

var hbs = require('hbs');
app.set('view engine', 'html');	// 用hbs作为模版引擎
app.set('views', __dirname + '/views');	// 模版所在路径
app.engine('html', hbs.__express);

app.use(express.static('node_modules'));
app.use(express.static('public'));

var body_parser = require('body-parser');
app.use(body_parser.urlencoded({
  extended: true
}));

var mysql = require('mysql');
app.all('*', function(res, req, next) {
  connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'zxc',
    database : 'student'
  });
  connection.connect(function(err) {
    if(err) {
      throw err;
    } else {
      next();
    }
  });
});

var integrated = [];

app.get('/', function(req, res){
  connection.query('select student.student_id,name,score,course from score,student,course where student.student_id = score.student_id and course.course_id = score.course_id;',
  function(err, rows, fields) {
    if (err) {
      throw err;
    }
    integrated = integrate(rows);
  });

  res.render('index', {title:'score list', integrated: integrated});
  connection.end();
});

app.get('/sort', function(req, res) {
  var key = req.query.sortKey;
  var ord = req.query.order;
  res.send(sortByOrder(key, ord, integrated));
});

app.get('/delete',function(req, res) {
  var id = req.query.id;
  var deleteSQL = 'delete from score where student_id = ' + id;
  connection.query(deleteSQL, function (err,rows) {
    if (err) {
      throw err;
    }
    res.send("yeah");
    connection.end();
  });
});

  // var addSQL2 = '';
app.post('/add',function(req, res) {
  var name = req.body.name;
  var chinese = req.body.chinese;
  var math = req.body.math;
  var english = req.body.english;

  var addSQL1 = 'insert into student(name) values("' + name + '")';
  connection.query(addSQL1, function (err,rows) {
    if (err) {
      throw err;
    }
    var id = rows.insertId;
    var addSQL2 = 'insert into score(student_id,course_id,score) values(' + id + ',' + '1,' +  chinese + '),' + '(' + id + ',' + '2,' +  math + '),' + '(' + id + ',' + '3,' +  english + ');';
    connection.query(addSQL2, function (err,rows) {
      if (err) {
        throw err;
      }
      res.send({id:id});
      connection.end();
    });

  });
});

app.listen(3000);
