const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('../../config');
const isLoggedIn = require('../middleware/authorization');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res) => {
  const { group_id: groupId } = req.body;
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query(
      `INSERT INTO accounts (group_id, user_id) VALUES (${groupId}, ${req.userId} ) `,
    );
    await connection.end();
    return res.json({
      db: response,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
