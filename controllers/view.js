var createError = require("http-errors");
const ViewModel = require("../models/View");
const moment = require("moment");
module.exports = {
  get: async (req, res) => {
    try {
      const view = await ViewModel.find({ isDelete: false });
      return res.json({ code: 200, err: null, data: view });
    } catch (err) {
      console.log(err);
      return res.json({ code: 400, err: err.messege, data: null });
    }
  },
  findById: async (req, res) => {
    try {
      const idNews = req.params.idNews;
      const view = await ViewModel.find({ isDelete: false, news: idNews });
      return res.json({ code: 200, err: null, data: view });
    } catch (err) {
      return res.json({ code: 400, err: err.messege, data: null });
    }
  },
  viewhomni: async (req, res) => {
    try {
      const today = moment().startOf("day");
      console.log(today);
      const viewToDay = await ViewModel.find({
        isDelete: false,
        date: {
          $gte: today.toDate(),
          $lte: moment(today)
            .endOf("day")
            .toDate()
        }
      });
      return res.json({ viewToDay });
    } catch (err) {
      console.log(err);
      return res.json({ code: 400, err: err.messege, data: null });
    }
  },
  viewthangni: async (req, res) => {
    try {
      const startMonth = moment()
        .startOf("month")
        .format("YYYY-MM-DD hh:mm");
      const endMonth = moment()
        .endOf("month")
        .format("YYYY-MM-DD hh:mm");
      const viewToMonth = await ViewModel.find({
        isDelete: false,
        date: {
          $gte: startMonth,
          $lte: endMonth
        }
      });
      return res.json({ viewToMonth });
    } catch (err) {
      console.log(err);
      return res.json({ code: 400, err: err.messege, data: null });
    }
  }
};
