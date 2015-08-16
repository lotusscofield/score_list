var sortByOrder = require('./module/sort.js');
var integrate = require('./module/integrate.js');

var express = require('express');
var	app = express();

var hbs = require('hbs');
app.set('view engine', 'html');	// 用hbs作为模版引擎
app.set('views', __dirname + '/views');	// 模版所在路径
app.engine('html', hbs.__express);

app.use(express.static('bower_components'));
app.use(express.static('public'));


var mysql = require('mysql');
app.get('*', function(res, req, next) {
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
  connection.end();
});

var deleteSQL = 'delete from score where student_id = ';
app.get('/delete',function(req, res) {
  var id = req.query.id;
  connection.query(deleteSQL + id, function (err,status, res) {
    if (err) {
      res.send(err);
    } 
    connection.end();
  });
});

app.listen(3000);
