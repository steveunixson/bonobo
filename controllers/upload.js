/* eslint-disable max-len,prefer-destructuring */
const csv = require('csvtojson');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const cyrillicToTranslit = require('cyrillic-to-translit-js');
const assert = require('assert');

const Match = require('../models/phonebase');
const log = require('../utils/log')(module);
const config = require('../config/mongodb');

function postUpload(req, res) {
  if (!req.files.xlsx || !req.body.name || !req.body.type || !req.body.comment) {
    const debugBody = req.body;
    return res.status(400).json({ error: 1, msg: 'Bad Request', debug: { debugBody } });
  }
  const csvFilePath = req.files.xlsx.path;
  const match = new Match({
    name: cyrillicToTranslit().transform(`${req.body.name}`, '_').toLowerCase(),
    type: req.body.type,
    comment: req.body.comment,
  });
  const SaveDB = async () => {
    const URI = config.database.toString();
    const matchStatus = await match.save((err, result) => result);
    const jsonArray = await csv().fromFile(csvFilePath);
    await MongoClient.connect(URI, { useNewUrlParser: true }, (err, client) => {
      assert.equal(null, err);
      log.info('Connected to DB!');
      const db = client.db(config.name);
      const collection = db.collection(cyrillicToTranslit().transform(`${req.body.name}`, '_').toLowerCase());
      collection.insertMany(jsonArray, (exception, result) => {
        if (exception) {
          console.log(exception);
        }
        return result;
      });
      log.info('INSERTED');
    });
    return { matchStatus, jsonArray };
  };
  SaveDB()
    .then(() => {
      res.status(200).render('message', { message: `Загружено в ${req.body.name}` });
    })
    .catch((err) => {
      log.error(err);
      res.status(500).render('message', { message: `Internal Error: ${err.toString()}` });
    });
  return 0;
}

function getUpload(req, res) {
  Match.find({}, (err, users) => {
    if (err) res.status(404).json({ err: 1, msg: 'Not Found' });

    res.status(200).json({ err: 0, msg: users });
  });
}

function getPhone(req, res) {
  if (!req.body.base) {
    console.log(req.body);
    return res.status(400).json({ err: 1, msg: 'No base was specified.' });
  }
  function find(name, query, cb) {
    mongoose.connection.db.collection(name, (err, collection) => {
      collection.find(query).toArray(cb);
    });
  }

  find(cyrillicToTranslit().transform(`${req.body.base}`, '_'), { id: req.body.id }, (err, docs) => {
    if (err) {
      return res.status(404).json({ err: 1, msg: 'Not Found' });
    }

    return res.status(200).json({ err: 0, msg: docs[0] });
  });
  return 0;
}

function activity(req, res) {
  const name = { name: req.body.name };
  const type = { type: req.body.type };
  const update = async () => {
    await Match.findOneAndUpdate({ name }, { $set: { type } }, () => {});
  };
  update()
    .then(() => { res.status(200).json({ err: 0, msg: 'Updated' }); })
    .catch((exception) => {
      res.status(500).json({ err: 1, msg: 'Internal Error', exception });
    });
  return 0;
}

function getTemplate(res) {
  const file = 'tmp/base.csv';
  try {
    return res.download(file);
  } catch (error) {
    return res.status(500).json({ err: 1, msg: 'Internal Error' });
  }
}

module.exports.postUpload = postUpload;
module.exports.getUpload = getUpload;
module.exports.getPhone = getPhone;
module.exports.activity = activity;
module.exports.getTemplate = getTemplate;
