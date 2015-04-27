/**
 * Created by user on 4/26/15.
 */


var models = require('../models');
var moment = require('moment');

var CodeModel = models.Code;

var index = function (req, res, next) {
    res.render('code/index');
};

exports.index = index;

var submit = function(req, res, next) {
    var poster =  req.body['poster'] ? req.body['poster'] : '匿名用户';
    var syntax = req.body['syntax'];
    var content = req.body['content'];

    //console.log(req);
    console.log(poster);
    var code = new CodeModel();
    code.user = poster;
    code.lang = syntax;
    code.content = content;

    code.save(function(err, doc) {
        if (err) {
            return res.render('notify/notify', {
                error: '提交失败,重新试试?'
            });
        }
        return res.redirect('/code/' + code._id);
    });
};

exports.submit = submit;

var show = function(req, res, next) {
    var code_id = req.params.id;
    CodeModel.findOne({_id: code_id}, function(err, code) {
        if (err) {
            return res.render('notify/notify', {
                error: '代码不存在。'
            });
        }
        res.render('code/show', {
            code: code,
            when: moment(code.create_at).format('YYYY:MM:DD HH:mm:ss')
        });
    });
};

exports.show = show;