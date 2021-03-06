/**
 * Created by minjie on 05/01/15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var utility = require('utility');
// var shortid = require('shortid');

var ContestSchema = new Schema({
    cid: {type: Number, unique: true},
    name: {type: String},
    st_time: {type: Date},
    ed_time: {type: Date},
    deadline: {type: Date}, //报名截止时间
    reg_num: {type: Number, default: 0},    //报名人数
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
});

mongoose.model('Contest', ContestSchema);