/**
 * Created by minjie on 5/1/15.
 */

var models = require('../models');
var moment = require('moment');
var mail = require('../common/mail');

var Contest = models.Contest;
var ContestUser = models.ContestUser;

/*
 * 注册比赛界面
 * 如果过了截止时间,则弹到提示页面
 * */
exports.index = function(req, res, next) {
    var cid = parseInt(req.params.cid);
    Contest.findOne({cid: cid}, function(err, contest) {
        if (err || !contest) {
            return res.render('contest_user/index', {
                error: '不存在该比赛.'
            });
        }
        var deadline = contest.deadline;
        var now = new Date();
        if (now > deadline) {
            return res.render('contest_user/index', {
                error: '报名已截止.'
            });
        }
        res.render('contest_user/index', {
            contest_name: contest.name,
            cid: cid
        });
    });

};

/*
 * 提交报名信息
 * 需要 姓名|学院|学号|年级|toj账号|email
 * */
exports.submit = function(req, res, next) {
    var cid = req.body['cid'] ? req.body['cid'] : null;
    var name  = req.body['name'] ? req.body['name'] : null;
    var sid = req.body['sid'] ? req.body['sid'] : null;
    var email = req.body['email'] ? req.body['email'] : null;
    var school = req.body['school'] ? req.body['school'] : null;
    var grade = req.body['grade'] ? req.body['grade'] : null;
    var ojid  = req.body['ojid'] ? req.body['ojid'] : null;

    if (!name) {
        return res.render('contest_user/index', {
            error: '请输入姓名.'
        });
    }
    if (!sid) {
        return res.render('contest_user/index', {
            error: '请输入学号.'
        });
    }
    if (!email) {
        return res.render('contest_user/index', {
            error: '请输入邮箱.'
        });
    }
    if (!school) {
        return res.render('contest_user/index', {
            error: '请输入学院.'
        });
    }
    if (!grade) {
        return res.render('contest_user/index', {
            error: '请输入年级.'
        });
    }
    if (!ojid) {
        return res.render('contest_user/index', {
            error: '请输入TOJ账号.'
        });
    }

    Contest.findOne({cid: cid}, function(err, contest) {
        if (err || !contest) {
            return res.render('contest_user/index', {
                error: '不存在该比赛.'
            });
        }

        var deadline = contest.deadline;
        var now = new Date();
        if (now > deadline) {
            return res.render('contest_user/index', {
                error: '报名已截止.'
            });
        }

        contest.reg_num += 1;

        contest.save(function(err, cont) {
            var cu = new ContestUser();
            cu.cid = cid;
            cu.name = name;
            cu.sid = sid;
            cu.email = email;
            cu.school = school;
            cu.grade = grade;
            cu.ojid = ojid;

            cu.save(function(err, doc) {
                if (err) {
                    return res.render('contest_user/index', {
                        error: '报名失败,请稍后再试.'
                    });
                }

                // 发送报名邮件
                mail.sendRegisterContest(cu, cont.name)
                res.render('contest_user/index', {
                    success: '报名成功,我们已经将报名信息发至您的邮箱,请查收.'
                });
            });
        });

    });
}
