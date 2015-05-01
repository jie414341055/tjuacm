var mailer = require('nodemailer');
var config = require('../config');
var util = require('util');

var transport = mailer.createTransport('SMTP', config.mail_opts);
var SITE_ROOT_URL = 'http://' + config.host;

/**
 * Send an email
 * @param {Object} data 邮件对象
 */
var sendMail = function (data) {
  if (config.debug) {
    return;
  }
  // 遍历邮件数组，发送每一封邮件，如果有发送失败的，就再压入数组，同时触发mailEvent事件
  transport.sendMail(data, function (err) {
    if (err) {
      // 写为日志
      console.log(err);
    }
  });
};
exports.sendMail = sendMail;

/**
 * 发送激活通知邮件
 * @param {String} who 接收人的邮件地址
 * @param {String} token 重置用的token字符串
 * @param {String} name 接收人的用户名
 */
exports.sendActiveMail = function (who, token, name) {
  var from = util.format('%s <%s>', config.name, config.mail_opts.auth.user);
  var to = who;
  var subject = config.name + '帐号激活';
  var html = '<p>您好：' + name + '</p>' +
    '<p>我们收到您在' + config.name + '的注册信息，请点击下面的链接来激活帐户：</p>' +
    '<a href="' + SITE_ROOT_URL + '/active_account?key=' + token + '&name=' + name + '">激活链接</a>' +
    '<p>若您没有在' + config.name + '填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>' +
    '<p>' + config.name + ' 谨上。</p>';

  exports.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  });
};

/**
 * 发送密码重置通知邮件
 * @param {String} who 接收人的邮件地址
 * @param {String} token 重置用的token字符串
 * @param {String} name 接收人的用户名
 */
exports.sendResetPassMail = function (who, token, name) {
  var from = util.format('%s <%s>', config.name, config.mail_opts.auth.user);
  var to = who;
  var subject = config.name + '密码重置';
  var html = '<p>您好：' + name + '</p>' +
    '<p>我们收到您在' + config.name + '重置密码的请求，请在24小时内单击下面的链接来重置密码：</p>' +
    '<a href="' + SITE_ROOT_URL + '/reset_pass?key=' + token + '&name=' + name + '">重置密码链接</a>' +
    '<p>若您没有在' + config.name + '填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>' +
    '<p>' + config.name + ' 谨上。</p>';

  exports.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  });
};

/*
 * 发送比赛报名信息
 * @param {Object} cu 比赛报名人员
 * */
exports.sendRegisterContest = function(cu, contest_name) {
    var from = util.format('%s <%s>', config.name, config.mail_opts.auth.user);
    var to = cu.email;
    var subject = contest_name + '报名信息';
    var html = '<p>您的报名信息如下:</p>' +
        '<p>姓名:' + cu.name + '<br/>' +
        '学号:' + cu.sid + '<br/>' +
        '学院:' + cu.school + '<br/>' +
        '年级:' + cu.grade + '<br/>' +
        'TOJ账号:' + cu.ojid + '</p>' +
        '<p>祝比赛顺利!</p>';

    exports.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: html
    });
};