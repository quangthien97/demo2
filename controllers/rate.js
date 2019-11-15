var createError = require("http-errors");
const NewsModel = require("../models/News");
const RateModel = require("../models/Rate");

module.exports = {
  get: async (req, res) => {
    try {
      const rates = await RateModel.find({ isDelete: false })
        .populate("createdBy")
        .populate("news");
      return res.json({
        code: 200,
        err: null,
        data: rates
      });
    } catch (err) {
      return res.json({
        code: 400,
        err: err.messege,
        data: null
      });
    }
  },
  createRate: async (req, res) => {
    try {
      const idNews = req.params._idNews;
      const comment = req.body.comment;
      const score = req.body.score;
      const newsCheck = await NewsModel.findOne({
        _id: idNews,
        isDelete: false
      });
      if (!newsCheck) {
        return res.json({
          message: "khong co san pham nay"
        });
      } else {
        const Rate = new RateModel({
          news: idNews,
          comment: comment,
          score: score,
          createdBy: req.user._id
        });
        const RateClass = await Rate.save();
        const rated = await RateModel.find({ news: idRate.news });
        let scoreRate = rated.map(x => x.score);
        let averageTest = scoreRate.reduce((a, b) => a + b) / scoreRate.length;
        let average = Math.round(averageTest * 100 + Number.EPSILON) / 100;
        let ratePro = await NewsModel.findOneAndUpdate(
          { _id: idNews },
          { $inc: { ratingCount: 1 }, avangeRating: average }
        );
        return res.json({
          code: 200,
          err: null,
          data: RateClass,
          avgRate: average
        });
      }
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
      const idRate = req.params._idRate;
      const score = req.body.score;
      const comment = req.body.comment;
      const checkRate = await RateModel.findOne({ _id: idRate });
      if (checkRate.createdBy.toString() == req.user._id.toString()) {
        const rateUpdate = await RateModel.findOneAndUpdate(
          { _id: idRate },
          { comment: comment, score: score }
        );
        const rated = await RateModel.find({ news: idRate.news });
        let scoreRate = rated.map(x => x.score);
        let averageTest = scoreRate.reduce((a, b) => a + b) / scoreRate.length;
        let average = Math.round(averageTest * 100 + Number.EPSILON) / 100;
        const rateNews = await NewsModel.findOneAndUpdate(
          { _id: checkRate.news },
          { $inc: { ratingCount: 1 }, avangeRating: average }
        );
        return res.json({
          code: 200,
          data: rateUpdate,
          err: null,
          avg: average
        });
      }
    } catch (err) {
      return res.json({
        code: 400,
        messege: err.message,
        data: null
      });
    }
  },
  delete: async (req, res) => {
    try {
      const idRate = req.params._idNews;
      const rateCheck = await RateModel.findOne({
        _id: idRate,
        isDelete: false
      });
      if (!rateCheck) {
        return res.json({
          message: "khong co binh luan nay"
        });
      }
      if (
        rateCheck.createdBy.toString() == req.user._id.toString() ||
        req.user.role === "admin"
      ) {
        const rateUpdate = await RateModel.findOneAndUpdate(
          { _id: idRate },
          { isDelete: true }
        );
        const rated = await RateModel.find({ news: idRate.news });
        let scoreRate = rated.map(x => x.score);
        let averageTest = scoreRate.reduce((a, b) => a + b) / scoreRate.length;
        let average = Math.round(averageTest * 100 + Number.EPSILON) / 100;
        let ratePro = await NewsModel.findOneAndUpdate(
          { _id: idNews },
          { $inc: { ratingCount: -1 }, avangeRating: average }
        );
        return res.json({
          code: 200,
          err: null,
          data: rateUpdate,
          avgRate: average
        });
      } else {
        return res.json({ message: "khong co quyen thay doi" });
      }
    } catch (err) {
      return res.json({
        code: 400,
        err: err,
        data: null
      });
    }
  },
  getRate: async (req, res) => {
    try {
      const idRate = req.params._idRate;
      const rates = await RateModel.find({ _id: idRate, isDelete: false })
        .populate("createdBy")
        .populate("news");
      return res.json({
        code: 200,
        err: null,
        data: rates
      });
    } catch (err) {
      return res.json({
        code: 400,
        err: err.messege,
        data: null
      });
    }
  }
};
