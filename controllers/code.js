/**
 * Created by user on 4/26/15.
 */

var models = require('../../models');
var CodeModel = models.Code;
var LangModel = models.Lang;

var index = function (req, res, next) {
    // 找到所有语言
    LangModel.find().toArray(function(err, docs) {
        console.log(docs);
        res.render('index', {
            'kv' : docs,
        });
    });
};

exports.index = index;