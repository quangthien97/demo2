const NewsModel = require("../models/News");
const RateModel = require("../models/Rate");
const LikeModel = require("../models/Like");
const ViewModel = require("../models/View");
const moment = require("moment");
const CateNewsModel = require("../models/CateNews");
var createError = require("http-errors");

module.exports = {
  get: async (req, res) => {
    try {
      const News = await NewsModel.find({ isDelete: false })
        .populate("cateNews")
        .populate("createdBy");
      return res.json({
        code: 200,
        err: null,
        data: News
      });
    } catch (err) {
      return res.json({
        code: 400,
        err: err.messege,
        data: null
      });
    }
  },
  findById: async (req, res) => {
    try {
      let timedate = moment().format();
      const idNews = req.params._idNews;
      const News = await NewsModel.find({
        _id: idNews,
        isDelete: false
      })
        .populate("cateNews")
        .populate("createdBy");
      const view = new ViewModel({
        news: idNews,
        date: moment(timedate)
          .add(7, "hour")
          .format("YYYY-MM-DD hh:mm:ss a")
      });
      const viewClass = await view.save();
      const newsUpdateView = await NewsModel.findOneAndUpdate(
        {
          _id: idNews
        },
        { $inc: { view: 1 } }
      );
      return res.json({
        code: 200,
        err: null,
        data: News,
        view: viewClass
      });
    } catch (err) {
      console.log(err);
      return res.json({
        code: 400,
        err: err.messege,
        data: null
      });
    }
  },
  create: async (req, res) => {
    try {
      const body = req.body;
      const News = new NewsModel({
        title: body.title,
        content: body.content,
        cateNews: body.cateNews,
        createdBy: req.user._id
      });
      const NewsClass = await News.save();
      return res.json({ code: 200, message: null, data: NewsClass });
    } catch (err) {
      return res.json({
        code: 400,
        err: err,
        data: null
      });
    }
  },
  edit: async (req, res) => {
    try {
      const _id = req.params._id;
      const newsCheck = await NewsModel.findOne({ _id: _id });
      if (newsCheck == null) {
        return res.json({
          data: null,
          messege: "Khong co bai viet nay",
          code: 200
        });
      }
      if (newsCheck != null) {
        console.log(newsCheck);
        console.log(req.user._id);
        if (newsCheck.createdBy.toString() == req.user._id.toString()) {
          const body = req.body;
          const NewsUpdate = await NewsModel.updateOne(
            { _id: _id },
            {
              title: body.title,
              content: body.content,
              cateNews: body.cateNews,
              dateCreate: moment().format("MMMM Do YYYY, h:mm:ss a")
            }
          );
          return res.json({ code: 200, message: null, data: NewsUpdate });
        } else {
          return res.json({
            data: null,
            message: "Khong co quyen thay doi"
          });
        }
      }
    } catch (err) {
      console.log(err);
      return res.json({
        code: 400,
        err: err,
        data: null
      });
    }
  },
  delete: async (req, res) => {
    try {
      const _id = req.params._id;
      const newsCheck = await NewsModel.findOne({ _id: _id });
      if (newsCheck == null) {
        return res.json({
          data: null,
          messege: "Khong co san pham nay",
          code: 200
        });
      }
      if (newsCheck != null) {
        if (newsCheck.createdBy._id.toString() == req.user._id.toString()) {
          const body = req.body;
          const NewsUpdate = await NewsModel.updateOne(
            { _id: _id },
            { isDelete: true }
          );
          return res.json({ code: 200, message: "da xoa", data: NewsUpdate });
        } else {
          return res.json({
            code: 300,
            data: null,
            message: "KHong co quyen xoa"
          });
        }
      }
    } catch (err) {
      return res.json({
        code: 400,
        err: err,
        data: null
      });
    }
  },
  getFav: async (req, res) => {
    try {
      const _id = req.params._id;
      const newsCheck = await NewsModel.findOne({ _id: _id });
      if (newsCheck == null) {
        return res.json({
          data: null,
          messege: "Khong co san pham nay",
          code: 200
        });
      }
      if (newsCheck != null) {
        if (newsCheck.createdBy._id.toString() == req.user._id.toString()) {
          const body = req.body;
          const NewsUpdate = await NewsModel.updateOne(
            { _id: _id },
            { isDelete: true }
          );
          return res.json({ code: 200, message: "da xoa", data: NewsUpdate });
        } else {
          return res.json({
            code: 300,
            data: null,
            message: "KHong co quyen xoa"
          });
        }
      }
    } catch (err) {
      return res.json({
        code: 400,
        err: err,
        data: null
      });
    }
  },
  getBestNews: async (req, res) => {
    try {
      const Newss = await NewsModel.find({ isDelete: false }).sort({
        avangeRating: "desc"
      });
      return res.json({
        code: 200,
        err: null,
        data: Newss
      });
    } catch (err) {
      return res.json({
        code: 400,
        err: err,
        data: null
      });
    }
  }
};
