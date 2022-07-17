const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('../../config');
const isLoggedIn = require('../middleware/authorization');

const router = express.Router();

const newBillSchema = joi.object({
  group_id: joi.number().required(),
  amount: joi.number().required(),
  description: joi.string().required(),
});

router.post('/', isLoggedIn, async (req, res) => {
  try {
    const { group_id: groupId } = req.body;
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(
      `SELECT * FROM bills WHERE group_id=${groupId}`,
    );
    await connection.end();
    return res.json(rows);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/group-title', isLoggedIn, async (req, res) => {
  try {
    const { group_id: groupId } = req.body;
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(
      `SELECT name FROM user_groups WHERE id=${groupId}`,
    );
    await connection.end();
    return res.json(rows);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/members', isLoggedIn, async (req, res) => {
  try {
    const { group_id: groupId } = req.body;
    const connection = await mysql.createConnection(DB_CONFIG);
    const [members] = await connection.query(
      `SELECT full_name FROM accounts JOIN users ON accounts.user_id=users.id WHERE group_id=${groupId} AND users.id<>${req.userId}`,
    );
    await connection.end();
    return res.json(members);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post('/new', isLoggedIn, async (req, res) => {
  const billData = req.body;
  try {
    await newBillSchema.validateAsync(billData);
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query(
      'INSERT INTO bills SET ?',
      billData,
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
