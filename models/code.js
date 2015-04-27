/**
 * Created by minjie on 4/26/15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var utility = require('utility');

var CodeSchema = new Schema({
    user: {type: String},
    lang: {type: String},
    content: {type: String},
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
});

mongoose.model('Code', CodeSchema);