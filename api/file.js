const express = require('express');
const router = express.Router();
const Models = require('../model');
const _ = require('underscore');

//upload
router.post('/file/:fileName', function (req, res) {
    var file = new Models.File({
        fileName : req.params.fileName,
        owner : 'yw',
        created: Date.now(),
        lastModified: Date.now(),
        content: req.body.content
    });
    file.save();
    res.json(_.omit(file.toObject(), 'content'));
});

// query
router.get('/file/:fileId', function (req, res){
    var select = '-__v';
    var metaOnly = _.contains(['true', 't'], req.query['meta_only'].toLowerCase());
    if (metaOnly)
        select = '-__v -content';
    Models.File.findById(req.params.fileId, select, function(err, file) {
        console.log(err);
        if (!file) {
            res.status(500).json({
                code: '001',
                message: '文件不存在，请检查文件ID'
            });
        }
        res.json(file);
    })
});

// modify
router.put('/file/:fileId', function (req, res){
    Models.File.findByIdAndUpdate(req.params.fileId, req.body, {new: true, fields: '-content -__v'},
        function(err, file) {
            res.json(file);
        });
});

// delete
router.delete('/file/:fileId', function (req, res) {
    Models.File.deleteOne({_id: req.params.fileId}, function(err) {
        res.json({id: req.params.fileId});
    })
});

module.exports = router;