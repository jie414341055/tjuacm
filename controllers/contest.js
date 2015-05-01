/**
 * Created by minjie on 5/1/15.
 */

var models = require('../models');
var moment = require('moment');

var Contest = models.Contest;
var ContestUser = models.ContestUser;

/*
 * 管理员查看历史比赛列表界面
 * 返回历史所有比赛
 **/
exports.index = function(req, res, next) {
    // 按照cid降序排序
    Contest.find({}, {},  {sort: {'cid': -1}}, function(err, contests){
        if (err) {
            return res.render('notify/notify', {
                error: '系统错误,查找历史比赛失败.'
            });
        }
        res.render('contest/index', {
            moment: moment,
            contests: contests
        });
    });
};

/*
 * 管理员新建一个比赛
 * */
exports.get_create = function(req, res, next) {
    res.render('contest/create');
};

/*
 * 管理员提交一个新建的比赛
 * */
exports.post_create = function(req, res, next) {
    var cid =  req.body['cid'] ? req.body['cid'] : null;
    var name  = req.body['name'] ? req.body['name'] : null;
    var deadline = req.body['deadline'] ? req.body['deadline'] : null;
    var st_time = req.body['st_time'] ? req.body['st_time'] : null;
    var ed_time = req.body['ed_time'] ? req.body['ed_time'] : null;

    if (!cid) {
        return res.render('notify/notify', {
            error: '请输入比赛cid.'
        });
    }
    if (!name) {
        return res.render('notify/notify', {
            error: '请输入比赛名称.'
        });
    }
    if (!ed_time) {
        return res.render('notify/notify', {
            error: '请输入比赛报名截止时间.'
        });
    }
    if (!st_time) {
        return res.render('notify/notify', {
            error: '请输入比赛开始时间.'
        });
    }
    if (!ed_time) {
        return res.render('notify/notify', {
            error: '请输入比赛结束时间.'
        });
    }

    // all good to go

    var contest = new Contest();
    contest.cid = cid;
    contest.name = name;
    contest.deadline = deadline;
    contest.st_time = st_time;
    contest.ed_time = ed_time;

    contest.save(function(err, doc) {
        if (err) {
            return res.render('notify/notify', {
                error: '比赛新建失败,重新试试?'
            });
        }
        return res.redirect('/contests');
    });
};

/*
 * 显示一个比赛已经报名的情况
 *
 */
exports.show = function(req, res, next) {
    var cid = parseInt(req.params.cid);
    if (!cid) {
        return res.render('notify/notify', {
            error: '不存在的比赛.'
        });
    }
    Contest.findOne({cid: cid}, function(err, contest) {
        if (err || !contest) {
            return res.render('notify/notify', {
                error: '不存在的比赛.'
            });
        }
        ContestUser.find({cid: cid}, function(err, users) {
            if (err) {
                return res.render('notify/notify', {
                    error: '数据库错误.' + err
                });
            }
            res.render('contest/show', {
                users : users,
                contest: contest
            });
        });
    });
};