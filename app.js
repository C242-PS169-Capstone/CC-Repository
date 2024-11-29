// const koneksi = require('./config/database');
// const app = express();
// const PORT = process.env.PORT || 8080;

// // buat server nya
// app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));

// // create data / insert data
// app.post('/api/hearhere', (req, res) => {
//     // buat variabel penampung data dan query sql
//     const data = { ...req.body };
//     const querySql = 'INSERT INTO hearhere SET ?';

//     // jalankan query
//     koneksi.query(querySql, data, (err, rows, field) => {
//         // error handling
//         if (err) {
//             return res.status(500).json({ message: 'Gagal insert data!', error: err });
//         }

//         // jika request berhasil
//         res.status(201).json({ success: true, message: 'Berhasil insert data!' });
//     });
// });