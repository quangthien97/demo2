const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const schema = new Schema({
  news: {
    type: ObjectId,
    ref: "News"
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  date: Date,
  view: {
    type: Number,
    default: 0
  }
});

const StatisticModel = mongoose.model("Statistic", schema);

module.exports = StatisticModel;
