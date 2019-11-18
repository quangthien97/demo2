const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
const Schema = mongoose.Schema;
const moment = require("moment");
const ObjectId = mongoose.Schema.Types.ObjectId;
let timedate = moment().format();
const schema = new Schema({
  title: String,
  content: String,
  cateNews: { type: ObjectId, ref: "CateNews" },
  createdBy: { type: ObjectId, ref: "User" },
  count: Number,
  cateNews: {
    type: ObjectId,
    ref: "CateNews"
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  dateCreate: {
    type: String,
    default: moment(timedate)
      .add(7, "hour")
      .format("YYYY-MM-DD hh:mm:ss a")
  },
  tag: [{ type: ObjectId, ref: "Tag" }]
});

const NewsModel = mongoose.model("Draft", schema);

module.exports = NewsModel;
