const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/** Routers. */
const AuthRouter = require('./routes/auth');
const MockRouter = require('./routes/mock');

/** Middlewares. */
const session = require('./middlewares/session');

// Parse application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json.
app.use(bodyParser.json());

// Mimics session expiry and refresh.
app.use(
    session({
        tokenExpiresAfterSeconds: 10 * 60,
        unauthorizedAfterSeconds: 60 * 60,
        tokenRefreshDelayInSeconds: 1,
    }),
);

// CORS.
app.use((req, res, next) => {
    //res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Expose-Headers', 'Content-Length,Content-Range');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// Routes.
app.use('/api/auth', AuthRouter);
app.use('/api/mock', MockRouter);

// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
//
// // Chatroom
// const numUsers = {};
//
// io.on('connection', (socket) => {
//   let addedUser = false;
//
//   // when the client emits 'add user', this listens and executes
//   socket.on('add user', (room, username) => {
//     if (addedUser) return;
//
//     // we store the username in the socket session for this client
//     socket.username = username;
//     socket.room = room;
//     socket.join(room);
//     numUsers[room] = (numUsers[room] || 0) + 1;
//     addedUser = true;
//     socket.emit('login', {
//       username: socket.username,
//       numUsers: numUsers[room],
//       room: socket.room
//     });
//
//     // echo globally (all clients) that a person has connected
//     socket.broadcast.to(room).emit('user joined', {
//       username: socket.username,
//       numUsers: numUsers[room],
//       room: socket.room
//     });
//   });
//
//   // when the user disconnects.. perform this
//   socket.on('close', () => {
//     if (addedUser) {
//       numUsers[socket.room] = numUsers[socket.room] - 1;
//       // echo globally that this client has left
//       socket.broadcast.to(socket.room).emit('user left', {
//         username: socket.username,
//         numUsers: numUsers[socket.room],
//       });
//       addedUser = false;
//     }
//   });
//
//   // when the user disconnects.. perform this
//   socket.on('disconnect', () => {
//     if (addedUser) {
//       numUsers[socket.room] = numUsers[socket.room] - 1;
//       // echo globally that this client has left
//       socket.broadcast.to(socket.room).emit('user left', {
//         username: socket.username,
//         numUsers: numUsers[socket.room],
//       });
//       addedUser = false;
//     }
//   });
//
//   // when the client emits 'new message', this listens and executes
//   socket.on('new message', (data) => {
//     // we tell the client to execute 'new message'
//     socket.in(socket.room).emit('new message', {
//       username: socket.username,
//       message: data
//     });
//   });
// });

const server = require('http').createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

// Chatroom
const numUsers = {};
const rooms = {};

wss.on('connection', socket => {
    let addedUser = false;
    socket.on('message', (str) => {
        const info = JSON.parse(str);
        const { type, room, username, message } = info;
        // when the client emits 'add user', this listens and executes
        if (type === 'add user') {
            if (addedUser) return;
            // we store the username in the socket session for this client
            socket.username = username;
            socket.room = room;
            //socket.join(room);
            numUsers[room] = (numUsers[room] || 0) + 1;
            addedUser = true;
            rooms[room] = rooms[room] || {};
            rooms[room][username] = rooms[room][username] || socket;
            socket.send(
                JSON.stringify({
                    type: 'login',
                    username: socket.username,
                    numUsers: numUsers[room],
                    room: socket.room,
                }),
            );

            // echo globally (all clients) that a person has connected
            Object.entries(rooms[room]).filter(([k,v])=>k!==socket.username).forEach(([, sock]) =>
                sock.send(
                    JSON.stringify({
                        type: 'user joined',
                        username: socket.username,
                        numUsers: numUsers[room],
                        room: socket.room,
                    }),
                ),
            );
        }

        // when the user disconnects.. perform this
        if (type === 'disconnect') {
            if (addedUser) {
                numUsers[socket.room] = numUsers[socket.room] - 1;
                // echo globally that this client has left
                Object.entries(rooms[socket.room]).filter(([k,v])=>k!==socket.username).forEach(([, sock]) =>
                    sock.send(
                        JSON.stringify({
                            type: 'user left',
                            username: socket.username,
                            numUsers: numUsers[socket.room],
                        }),
                    ),
                );
                addedUser = false;
                delete rooms[socket.room][socket.username];
                if (!Object.keys(rooms[socket.room]).length) {
                    delete rooms[socket.room];
                }
            }
        }

        // when the client emits 'new message', this listens and executes
        if (type === 'new message') {
            // we tell the client to execute 'new message'
            Object.entries(rooms[socket.room]).filter(([k,v])=>k!==socket.username).forEach(([, sock]) =>
                sock.send(JSON.stringify({ type: 'new message', username: socket.username, message: message })),
            );
        }
    });

    socket.on('close', () => {
        if (addedUser) {
            numUsers[socket.room] = numUsers[socket.room] - 1;
            // echo globally that this client has left
            Object.entries(rooms[socket.room]).filter(([k,v])=>k!==socket.username).forEach(([, sock]) =>
                sock.send(
                    JSON.stringify({
                        type: 'user left',
                        username: socket.username,
                        numUsers: numUsers[socket.room],
                    }),
                ),
            );
            addedUser = false;
            delete rooms[socket.room][socket.username];
            if (!Object.keys(rooms[socket.room]).length) {
                delete rooms[socket.room];
            }
        }
    });
});

// run server
server.listen(8091, () => {
    console.log('Mock server is running at http://localhost:8091');
});
