const __path = process.cwd();
require(__path + '/config.js');

const express = require('express');

// Database
const db = require(__path + '/server/controller/mysql.js');

// Nodemailer
const { sendBroadcastEmails } = require('../controller/nodemailer');

const router = express.Router();

const checkAuth = (req, res, next) => {
  if (!req.session.username) {
    return res.redirect('/login');
  }
  next();
};

// Endpoint untuk Ban/Unban User
router.post('/ban-user', checkAuth, async (req, res) => {
  const { userId } = req.body;

  db.query('SELECT banned FROM users WHERE id = ?', [userId], (err, result) => {
    if (err || result.length === 0) {
      return res.redirect('/ad?error=User not found');
    }

    const newStatus = result[0].banned ? 0 : 1; // Toggle status (0 = unban, 1 = ban)

    db.query('UPDATE users SET banned = ? WHERE id = ?', [newStatus, userId], (updateErr) => {
      if (updateErr) {
        return res.redirect('/ad?error=Failed to update user');
      }
      res.redirect('/ad?password=' + global.password_admin);
    });
  });
});


// Tampilkan Daftar User di Admin Panel
router.get('/ad', checkAuth, (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      throw err;
    }

    if (results.length > 0) {
      res.render('index', { users: results });
    } else {
      res.send('<p>User not Found!</p>');
    }
  });
});

// Cegah Login jika User Diblokir
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
    if (err) {
      throw err;
    }

    if (result.length === 0) {
      return res.send('User tidak ditemukan atau password salah!');
    }

    if (result[0].banned) {
      return res.send('Akun Anda telah diblokir! Hubungi admin untuk informasi lebih lanjut.');
    }

    req.session.username = result[0].username;
    res.redirect('/dashboard');
  });
});

// Tambah User Baru
router.get('/add-user', checkAuth, (req, res) => {
  res.render('add-user');
});

router.post('/add-user', checkAuth, (req, res) => {
  const { username, email, password, user_type, user_keys, limit } = req.body;

  db.query(
    'INSERT INTO users (username, email, password, user_type, user_keys, `limit`, banned, otp_verified) VALUES (?, ?, ?, ?, ?, ?, 0, 1)',
    [username, email, password, user_type, user_keys, limit],
    (err) => {
      if (err) {
        throw err;
      }

      res.redirect('/ad?password=' + global.password_admin);
    }
  );
});

// Update Data User
router.post('/update-data', checkAuth, (req, res) => {
  const { userId, username, email, password, user_keys, limit, user_type } = req.body;

  /*const updatedData = {};
  if (username) updatedData.username = username;
  if (email) updatedData.email = email;
  if (password) updatedData.password = password;
  if (user_keys) updatedData.user_keys = user_keys;
  if (limit) updatedData.limit = limit;
  if (user_type) updatedData.user_type = user_type;*/

  db.query('UPDATE users SET ? WHERE id = ?', [username, email, password, user_type, user_keys, limit], (err) => {
    if (err) {
      throw err;
    }

    res.redirect('/ad?password=' + global.password_admin);
  });
});

// Hapus User
router.post('/delete-data', checkAuth, (req, res) => {
  const userId = req.body.userId;

  db.query('DELETE FROM users WHERE id = ?', [userId], (err) => {
    if (err) {
      throw err;
    }

    res.redirect('/ad?password' + global.password_admin);
  });
});

router.post('/update-premium', checkAuth, (req, res) => {
  const {
    userId, isPremium
  } = req.body;

  db.query('UPDATE users SET user_type = ? WHERE id = ?',
    [isPremium,
      userId],
    (err) => {
      if (err) {
        throw err;
      }

      res.redirect('/ad?password=DannKristi=' + global.password_admin);
    });
});

router.post('/broadcast', (req, res) => {
  const { subject, message } = req.body;

  db.query('SELECT email FROM users', (err, result) => {
    if (err) {
      throw err;
    }

    if (result.length > 0) {
      const emails = result.map(user => user.email);

      sendBroadcastEmails(emails, subject, message, (error) => {
        if (error) {
          console.log('Gagal mengirim pesan siaran:', error);
          res.send(`<script>alert('Gagal mengirim pesan siaran'); location.href = '/ad?password=${global.password_admin}';</script>`);
        } else {
          console.log('Pesan siaran terkirim');
          res.send(`<script>alert('Broadcast telah dikirim!'); location.href = '/ad?password=${global.password_admin}';</script>`);
        }
      });
    } else {
      res.send('<p>Tidak ada pengguna yang ditemukan!</p>');
    }
  });
});

module.exports = router;