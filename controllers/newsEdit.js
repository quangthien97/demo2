const NewsModel = require("../models/News");
const RateModel = require("../models/Rate");
const ViewModel = require("../models/View");
const { NEWS } = require("../constant");

module.exports = {
  get: async (req, res) => {
    try {
      const News = await NewsModel.find({
        isDelete: false,
        status: NEWS.STATUS.NEW
      })
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
      const idNews = req.params._idNews;
      const Newss = await NewsModel.find({
        _id: idNews,
        isDelete: false
      }).populate("category");
      const rate = await RateModel.find({ News: idNews, isDelete: false });
      const View = new ViewModel({
        News: idNews,
        user: req.user._id,
        date: date
      });
      const ViewClass = await View.save();
      return res.json({
        code: 200,
        err: null,
        data: Newss,
        rate: rate
      });
    } catch (err) {
      return res.json({
        code: 400,
        err: err.messege,
        data: null
      });
    }
  },
  edit: async (req, res) => {
    try {
      const _id = req.params._id;
      const proCheck = await NewsModel.findOne({ _id: _id });
      if (proCheck == null) {
        return res.json({
          data: null,
          messege: "Khong co san pham nay",
          code: 200
        });
      }
      if (proCheck != null) {
        const body = req.body;
        const NewsUpdate = await NewsModel.updateOne(
          { _id: _id },
          {
            title: body.title,
            content: body.content,
            cateNews: body.cateNews
          }
        );
        return res.json({ code: 200, message: null, data: NewsUpdate });
      }
    } catch (err) {
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
      const proCheck = await NewsModel.findOne({ _id: _id });
      if (proCheck == null) {
        return res.json({
          data: null,
          messege: "Khong co bai viet nay",
          code: 200
        });
      }
      if (proCheck != null) {
        const body = req.body;
        const NewsUpdate = await NewsModel.updateOne(
          { _id: _id },
          { isDelete: true }
        );
        return res.json({ code: 200, message: "da xoa", data: NewsUpdate });
      }
    } catch (err) {
      return res.json({
        code: 400,
        err: err,
        data: null
      });
    }
  }
};
