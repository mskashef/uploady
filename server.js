// const express = require('express');
// const app = express();
// const connection = require('./dbConnection');
// app.use(express.urlencoded({extended: false}));
// const backEndUrl = 'http://localhost:5000';
// const frontEndUrl = 'http://localhost:3000';
// app.get('/', async (req, res) => {
//     const con = connection();
//     con.connect((err) => {
//         if (err) throw err;
//         con.query("select * from users",  (err, result) => {
//             if (err) throw err;
//             res.send(result);
//         });
//     });
// });
// const encode = (n) => {
//     let res = '';
//     let map = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     while (n !== 0) {
//         let rem = n % map.length;
//         res = map[rem] + res;
//         n = Math.floor(n / map.length);
//     }
//     return res;
// };
// app.get('/:url', async (req, res) => {
//     res.send(encode(new Date().getTime()))
// });
// app.get('/:shortUrl', async (req, res) => {
//     res.send("b");
// });
// app.listen(process.env.PORT || 5000);
