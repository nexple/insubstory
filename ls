[1mdiff --git a/server.js b/server.js[m
[1mdeleted file mode 100644[m
[1mindex 88085c8..0000000[m
[1m--- a/server.js[m
[1m+++ /dev/null[m
[36m@@ -1,84 +0,0 @@[m
[31m-//[m
[31m-// # SimpleServer[m
[31m-//[m
[31m-// A simple chat server using Socket.IO, Express, and Async.[m
[31m-//[m
[31m-var http = require('http');[m
[31m-var path = require('path');[m
[31m-[m
[31m-var async = require('async');[m
[31m-var socketio = require('socket.io');[m
[31m-var express = require('express');[m
[31m-[m
[31m-//[m
[31m-// ## SimpleServer `SimpleServer(obj)`[m
[31m-//[m
[31m-// Creates a new instance of SimpleServer with the following options:[m
[31m-//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.[m
[31m-//[m
[31m-var router = express();[m
[31m-var server = http.createServer(router);[m
[31m-var io = socketio.listen(server);[m
[31m-[m
[31m-router.use(express.static(path.resolve(__dirname, 'client')));[m
[31m-var messages = [];[m
[31m-var sockets = [];[m
[31m-[m
[31m-io.on('connection', function (socket) {[m
[31m-    messages.forEach(function (data) {[m
[31m-      socket.emit('message', data);[m
[31m-    });[m
[31m-[m
[31m-    sockets.push(socket);[m
[31m-[m
[31m-    socket.on('disconnect', function () {[m
[31m-      sockets.splice(sockets.indexOf(socket), 1);[m
[31m-      updateRoster();[m
[31m-    });[m
[31m-[m
[31m-    socket.on('message', function (msg) {[m
[31m-      var text = String(msg || '');[m
[31m-[m
[31m-      if (!text)[m
[31m-        return;[m
[31m-[m
[31m-      socket.get('name', function (err, name) {[m
[31m-        var data = {[m
[31m-          name: name,[m
[31m-          text: text[m
[31m-        };[m
[31m-[m
[31m-        broadcast('message', data);[m
[31m-        messages.push(data);[m
[31m-      });[m
[31m-    });[m
[31m-[m
[31m-    socket.on('identify', function (name) {[m
[31m-      socket.set('name', String(name || 'Anonymous'), function (err) {[m
[31m-        updateRoster();[m
[31m-      });[m
[31m-    });[m
[31m-  });[m
[31m-[m
[31m-function updateRoster() {[m
[31m-  async.map([m
[31m-    sockets,[m
[31m-    function (socket, callback) {[m
[31m-      socket.get('name', callback);[m
[31m-    },[m
[31m-    function (err, names) {[m
[31m-      broadcast('roster', names);[m
[31m-    }[m
[31m-  );[m
[31m-}[m
[31m-[m
[31m-function broadcast(event, data) {[m
[31m-  sockets.forEach(function (socket) {[m
[31m-    socket.emit(event, data);[m
[31m-  });[m
[31m-}[m
[31m-[m
[31m-server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){[m
[31m-  var addr = server.address();[m
[31m-  console.log("Chat server listening at", addr.address + ":" + addr.port);[m
[31m-});[m
[1mdiff --git a/web2.js b/web2.js[m
[1mdeleted file mode 100644[m
[1mindex 799414a..0000000[m
[1m--- a/web2.js[m
[1m+++ /dev/null[m
[36m@@ -1,3 +0,0 @@[m
[31m-[m
[31m-hello world[m
[31m-[m
