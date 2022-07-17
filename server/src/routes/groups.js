const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const DB_CONFIG = require('../../config');
const isLoggedIn = require('../middleware/authorization');

const router = express.Router();

const newGroupNameSchema = joi.object({
  newGroupName: joi.string().required(),
});

router.get('/', isLoggedIn, async (req, res) => {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(
      `SELECT * FROM accounts LEFT JOIN user_groups ON accounts.group_id=user_groups.id WHERE user_id=${req.userId} ORDER BY user_groups.id`,
    );
    await connection.end();
    return res.json(rows);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/available-groups', isLoggedIn, async (req, res) => {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(
      'SELECT * FROM user_groups ORDER BY id',
    );
    await connection.end();
    return res.json(rows);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/', isLoggedIn, async (req, res) => {
  const { newGroupName } = req.body;
  try {
    await newGroupNameSchema.validateAsync({
      newGroupName,
    });
    const name = newGroupName;
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query('INSERT INTO user_groups SET ?', {
      name,
    });
    await connection.end();
    return res.json({
      db: response,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
