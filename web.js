//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
// 모듈로 따로 뺄것..

'use strict';

var http = require('http'); //http
var path = require('path'); //path
var fs = require('fs');
var Backbone = require('backbone');
var ejs = require('ejs');
//var ejslocal = require('ejs-locals');

var async = require('async'); //비동기
var user = require('./views/login');
var socketio = require('socket.io'); //소켓
var express = require('express'); //익스프레스 서버 php 같은 역활(전에 알던 서버 프로그래밍 http 출력 노드에서 대부분 이거로 처리)
//var mqtt = require('mqtt'); //mqtt사물인터넷
//var mysql = require('mysql'); //데이터베이스
 var mysql = require("mysql");
// 다양한 요청을 식별하는 router 모듈
//var server = require('./server1');  //server1.js 불러오기

var _ = require('underscore');  //underscore 되기는 됨 좀 느려짐
//mysql db를 underscore에 넣었다가 뺐다가 해야 됨-->html 파일에서 불러오기
//backbone.js(underscore가 collection이란 형태로 포함되어 있음)는 아무래도 mongo db랑 같이 쓰는 모양..
//console.log('-------each');
//_.each([1,2,3], console.log);


//server.start();
//
// ## SimpleServer `SimpleServer(obj)`
//소켓이 중심이 됨.서버 몇번 않나옴.
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy; //패스포트 로컬 안됨.페이스북 로그인 으로 해야할듯 2015.9.5

var router = express(); //라우터-->서버-->소켓 io
var server = http.createServer(router);
var io = socketio.listen(server);  //소켓 io를 사용함으로써 실시간 통신 가능 html5에 websocket란게 있지만 아직 않쓰인다고..

router.use(express.static(path.resolve(__dirname, 'client')));//get으로 들어오는 특정 함수나 html 파일 실행
var messages = [];
var sockets = [];

//express 서버 미들웨어 셋팅
router.set('port', process.env.PORT || 3000);
router.set('views', path.join(__dirname, 'views'));
router.set('view engine', 'ejs');

router.use(express.favicon());
router.use(express.logger('dev'));
router.use(express.json());
router.use(express.urlencoded());
router.use(express.methodOverride());
router.use(express.cookieParser('your secret here'));
router.use(express.session());
router.use(router.router);
router.use(express.static(path.join(__dirname, 'public')));
//router.use(router.router);
router.use(passport.initialize());
router.use(passport.session());

/*router.get('/login', function(req, res) {
  res.sendfile(path.join(__dirname+'/views/login.html'));
  //html 파일 안됨 센드 파일 안됨 2015.9.5
  //2015.9.7일 sendfile 됨
  //
});*/

router.get('/', function(req, res) {
  res.sendfile(path.join(__dirname+'/client/index.html'));
 // db 내용 출력

});

router.get('/bookbug', function(req, res) {
  res.sendfile(path.join(__dirname+'/client/index.html'));
 // db 내용 출력

});

router.get('/geek', function(req, res) {
  res.sendfile(path.join(__dirname+'/client/index.html'));
 // db 내용 출력

});

router.get('/template', function(req, res) {
  res.sendfile(path.join(__dirname+'/client/index.html'));
 // db 내용 출력

});

router.get('/bookpod', function(req, res) {
  res.sendfile(path.join(__dirname+'/client/index.html'));
 // db 내용 출력

});
router.get('/remake', function(req, res) {
  res.sendfile(path.join(__dirname+'/client/index.html'));
 // db 내용 출력

});
router.get('/story', function(req, res) {
  res.sendfile(path.join(__dirname+'/client/index.html'));
 // db 내용 출력

});
router.get('/novel', function(req, res) {
  res.sendfile(path.join(__dirname+'/client/index.html'));
 // db 내용 출력

});
router.get('/familyedu', function(req, res) {
  res.sendfile(path.join(__dirname+'/client/index.html'));
 // db 내용 출력

});

router.get('/classic', function(req, res) {
  res.sendfile(path.join(__dirname+'/client/index.html'));
 // db 내용 출력

});

router.get('/now', function(req, res) {
  res.sendfile(path.join(__dirname+'/client/index.html'));
 // db 내용 출력

});








/*
router.get('/register', function(req, res) {
  res.sendfile(path.join(__dirname+'/views/register.html'));
});*/


//index 파일은 옮기면 안됨(client 디렉토리에서 views로 옮겨봤으나 실행안됨)
//미들웨어 쓰니까 속도가 빨라짐
//insubstory.cloudapp.net 클라우드 애저 주소

router.get('/ebook', function(req, res) {
  res.sendfile(path.join(__dirname+'/views/index1.html'));
}); //ebook

router.get('/blog', function(req, res) {
  res.sendfile(path.join(__dirname+'/views/index2.html'));
});

router.get('/service', function(req, res) {
  res.sendfile(path.join(__dirname+'/views/index3.html'));
});

router.get('/download', function(req, res) {
  res.sendfile(path.join(__dirname+'/views/todayissue/20141123issue.html'));
});

router.get('/db1', function(req, res) {

  //res.sendfile(path.join(__dirname+'/views/index.ejs'));
   res.render('index',{ title: 'Express',name:'Terry' });
//   exports.index = function(req, res){
//          res.render('index', { title: 'Express',name:'Terry' });
  //      };

});




router.get('/register', function(req, res) {

  //res.sendfile(path.join(__dirname+'/views/index.ejs'));
   res.render('register',{ title: 'register',name:'loginname' });
//   exports.index = function(req, res){
//          res.render('index', { title: 'Express',name:'Terry' });
  //      };

});



router.get('/review', function(req, res) {

  //res.sendfile(path.join(__dirname+'/views/index.ejs'));
   res.render('review',{ title: 'register',name:'loginname' });
//   exports.index = function(req, res){
//          res.render('index', { title: 'Express',name:'Terry' });
  //      };

});





//router.post('/login',
//  passport.authenticate('local', {
//    successRedirect: '/loginSuccess',
//    failureRedirect: '/loginFailure'
//  })
//);


 router.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});



router.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


//passport.use(new LocalStrategy(function(username, password, done) {
//  process.nextTick(function() {
    // Auth Check Logic
//  });
//}));

router.get('/login', function(req, res) {

  res.sendfile(path.join(__dirname+'/views/login.html'));
  // res.render('login',{ title: 'login',name:'loginnamedd' });
   //login.ejs 파일에 <%변수%> 변수에 출력
//   exports.index = function(req, res){
//          res.render('index', { title: 'Express',name:'Terry' });
  //      };

});

var pool = mysql.createPool({
    host: "10.0.0.1",
    user: "insubstory",
    password: "   ",
    database: "insubstory"
}); //password 녛을것 

router.post('/register', function(req, res) {
    res.send(200,'login post');
      res.send('login posting');
    console.log('post login.');
                              // var newUser = {  //쿼리의 ? 표시로 바로 들어감

  //res.sendfile(path.join(__dirname+'/vi
                                //  console.log(body);
  pool.getConnection(function (err, connection)
                          {

                            var body=req.body;
                            //var newUser = {  //쿼리의 ? 표시로 바로 들어감

                              //      'name' : req.body.name,  // use the generateHash function in our user model
                                //    'password' : req.body.password
                                //};


             connection.query('insert into user(email,name) values (?,?)',[body.email,body.name],function(err,rows){
                                 if(err) throw err;

                                  console.log('Data received from Db:\n');
                                  console.log(rows);
                                   console.log('insert success');
                                 response.redirect('/');
                                 //  res.render('index',{ title: 'db',rows:rows });

                                  connection.release();

                            });

//   exports.index = function(req, res){
//          res.render('index', { title: 'Express',name:'Terry' });
   //    });
  //res.sendfile(path.join(__dirname+'/views/index.ejs'));
  // res.render('login',{ title: 'login',name:'loginname' });
//   exports.index = function(req, res){
//          res.render('index', { title: 'Express',name:'Terry' });
   });

});



router.get('/admin', function(req, res,next) {
//관리자화면 모든 데이터베이스
  //res.sendfile(path.join(__dirname+'/views/index.ejs'));
  pool.getConnection(function (err, connection)
                          {
                connection.query('SELECT * FROM user',function(err,rows){
                                 if(err) throw err;

  //                                console.log('Data received from Db:\n');
    //                              console.log(rows);

                                  res.render('index',{ title: 'db',rows:rows });

                                  connection.release();

                            });


//   exports.index = function(req, res){
//          res.render('index', { title: 'Express',name:'Terry' });
       });

});



router.post('/review', function(req, res,next) {


  //res.sendfile(path.join(__dirname+'/views/index.ejs'));
  pool.getConnection(function (err, connection)
                          {

                               var newUser = {  //쿼리의 ? 표시로 바로 들어감

                                    name : req.name,  // use the generateHash function in our user model
                                    password : req.password
                                };

                connection.query('insert into user(name,password) values(?,?)',newUser,function(err,rows){
                                 if(err) throw err;

                                  console.log('Data received from Db:\n');
                                  console.log(rows);

                                  res.render('index',{ title: 'db',rows:rows });

                                  connection.release();

                            });


//   exports.index = function(req, res){
//          res.render('index', { title: 'Express',name:'Terry' });
       });
});

router.get('/search', function(req, res,next) {

  //res.sendfile(path.join(__dirname+'/views/index.ejs'));
  pool.getConnection(function (err, connection)
                          {
                connection.query('SELECT * FROM editor',function(err,rows){
                                 if(err) throw err;

                                  console.log('Data received from Db:\n');
                                  console.log(rows);

                                  res.render('search',{ title: 'search',rows:rows });

                                  connection.release();

                            });


//   exports.index = function(req, res){
//          res.render('index', { title: 'Express',name:'Terry' });
       });

});

router.post('/editor', function(req, res,next) {//req로 html에서 값들을 받아서 res로 보냄
//insert editor
  //res.sendfile(path.join(__dirname+'/views/index.ejs'));
  pool.getConnection(function (err, connection)
                          {

                               var newUser = {  //쿼리의 ? 표시로 바로 들어감

                                    name : req.body.name,  // use the generateHash function in our user model
                                    password : req.body.password
                                };


                connection.query('insert into user set=?',post,function(err,rows){
                                 if(err) throw err;

                                  console.log('Data received from Db:\n');
                                  console.log(rows);

                                  res.render('editor',{ title: 'db',rows:rows });

                                  connection.release();

                            });


//   exports.index = function(req, res){
//          res.render('index', { title: 'Express',name:'Terry' });
       });

});

router.get('/comment', function(req, res,next) {

  //res.sendfile(path.join(__dirname+'/views/index.ejs'));
  pool.getConnection(function (err, connection)
                          {
                connection.query('SELECT * FROM comment',function(err,rows){
                                 if(err) throw err;

                                  console.log('Data received from Db:\n');
                                  console.log(rows);

                                  res.render('comment',{ title: 'db',rows:rows });

                                  connection.release();

                            });


//   exports.index = function(req, res){
//          res.render('index', { title: 'Express',name:'Terry' });
       });

});

/*
con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});
*/

//파일 만들기
//fs.mkdir('./newdir', 0666, function(err) {
//  if(err) throw err;
//  console.log('Created newdir');
//  });


//var path = '/newdir/test1.txt';
//fs.open(path,'a+',function(err,fd){  //a+ 파일 만들어짐
//    if(err) throw err;
//    if(fd == '9'){
//        console.log('file create.');
//    }else{
//        fs.readFile(path, 'utf8', function(err, data) {
//          console.log(data);
//        });
//    }
//  });


//데이터베이스에서 출력된 값을 express 서버의 res(html 1줄씩보내기 가능)로 html 파일에 표시해야됨(json이던 text던간에)
//익스프레스 서버는 디렉토리의 파일 /파일이름 식으로 내보맨 핸들러라고 부름.리퀘스트요구도 파일을 요구하는것임.
//웹 주소창에 ? 붙으면 데이터베이스를 쓰는거고 /가 붙으면 서버에 요구하는것임.
//conn.query('select * from user', function(err,rows,cols) {
//  if (err && err.number != mysql.ERROR_DB_CREATE_EXISTS) {
//    throw err;
//  }
//    console.log('The solution is: ', rows);
//    res.json(rows);
//});
//express.get('/users', function(req,res){
//    var query = connection.query('select * from 'user'',function(err,rows){
//        console.log(rows);
//        res.json(rows);
//    });
//    console.log(query);
//});

/*app.post('/users',function(req,res){
    var user = {'userid':req.body.userid,
                'name':req.body.name,
                'address':req.body.address};
    var query = connection.query('insert into users set ?',user,function(err,result){
        if (err) {
            console.error(err);
            throw err;
        }
        console.log(query);
        res.send(200,'success');
    });
});
*/


 //connection.query(“use insubstory”);
 // var strQuery='select * from 'user';';
 //  console.log(strQuery);
 //conn.query( strQuery);
//conn.end();



io.on('connection', function (socket) { //접속되면 콜백-->socket 실행
    messages.forEach(function (data) {
      socket.emit('message', data);
    });

    sockets.push(socket);

    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1); //splice= 접착
      updateRoster(); //맨 밑의 업데이트 로스터 실행
    });

    socket.on('message', function (msg) {
      var text = String(msg || '');

      if (!text)
        return;

      socket.get('name', function (err, name) {
        var data = {
          name: name,
          text: text
        };

        broadcast('message', data);
        messages.push(data);
      });
    });

    socket.on('identify', function (name) {
      socket.set('name', String(name || 'Anonymous'), function (err) {
        updateRoster();
      });
    });
  });

function updateRoster() {
  async.map( //콜백함수의 중첩을 해결하기 위한 모듈
    sockets,
    function (socket, callback) {
      socket.get('name', callback);
    },
    function (err, names) {
      broadcast('roster', names);
    }
  );
}

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data); //자주나옴 emit 사용자에게 메시지 보냄.
  });
}



server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  //console.log("Chat server listening at", addr.address + ":" + addr.port);
});
