/**
 * Created by minjie on 5/1/15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var utility = require('utility');
// var shortid = require('shortid');

var ContestUserSchema = new Schema({
    cid: {type: Number},
    name: {type: String},   //姓名
    sid: {type: String},    //学号
    school: {type: String}, //学院
    grade: {type: String},  //年级
    ojid: {type: String},   //OJ账号
    email: {type: String},  //email
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
});

mongoose.model('ContestUser', ContestUserSchema);