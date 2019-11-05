const createError = require("http-errors");
const NewsModel = require("../models/News");
const LikeModel = require("../models/Like");

module.exports = {
  get: async (req, res) => {
    try {
      if (req.user.role == "admin") {
        const likes = await LikeModel.find({ isDelete: false })
          .populate("createdBy")
          .populate("news");
        return res.json({
          code: 200,
          err: null,
          data: likes
        });
      }
      if (req.user.role == "customer") {
        const likes = await LikeModel.find({
          isDelete: false,
          createdBy: req.user._id
        })
          .populate("createdBy")
          .populate("news");
        return res.json({
          code: 200,
          err: null,
          data: likes
        });
      }
    } catch (err) {
      return res.json({
        code: 400,
        err: err.messege,
        data: null
      });
    }
  },
  like: async (req, res) => {
    try {
      const idNews = req.params._idNews;
      const likeCheck = await LikeModel.findOne({
        news: idNews,
        createdBy: req.user._id
      });
      if (!likeCheck) {
        const Like = new LikeModel({ news: idNews, createdBy: req.user._id });
        const newlike = await Like.save();
        const liked = await NewsModel.findOneAndUpdate(
          { _id: idNews },
          { $inc: { countLike: 1 } }
        );
        const likedd = await NewsModel.findOne({ _id: idNews });
        return res.json({
          code: 200,
          message: "like thanh cong",
          likeCount: likedd.countLike,
          data: null
        });
      }
      if (likeCheck.isDelete == true) {
        const unlike = await LikeModel.findOneAndUpdate(
          { news: idNews, createdBy: req.user._id },
          { isDelete: false }
        );
        const liked = await NewsModel.findOneAndUpdate(
          { _id: idNews },
          { $inc: { countLike: 1 } }
        );
        const likedd = await NewsModel.findOne({ _id: idNews });
        return res.json({
          code: 200,
          message: "like thanh cong",
          likeCount: likedd.countLike
        });
      } else {
        const liked = await NewsModel.findOne({ _id: idNews, isDelete: false });
        console.log(liked);
        return res.json({
          code: 200,
          message: "da like bai nay",
          likeCount: liked.countLike
        });
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
  unlike: async (req, res) => {
    try {
      const idNews = req.params._idNews;
      const likeCheck = await LikeModel.findOne({
        news: idNews,
        createdBy: req.user._id
      });
      if (!likeCheck) {
        const liked = await NewsModel.findOne({ _id: idNews, isDelete: false });
        return res.json({
          code: 200,
          message: "chua like bai nay",
          likeCount: liked.countLike
        });
      } else {
        if (likeCheck.isDelete === false) {
          const unlike = await LikeModel.findOneAndUpdate(
            { news: idNews, createdBy: req.user._id },
            { isDelete: true }
          );
          const liked = await NewsModel.findOneAndUpdate(
            { _id: idNews },
            { $inc: { countLike: -1 } }
          );
          const likedd = await NewsModel.findOne({ _id: idNews });
          return res.json({
            code: 200,
            message: "unlike thanh cong",
            likeCount: likedd.countLike
          });
        } else {
          const liked = await NewsModel.findOne({ _id: idNews });
          return res.json({
            code: 200,
            message: "chua like bai nay",
            likeCount: liked.countLike
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
  delete: async (req, res) => {
    try {
      const _id = req.params._id;
      const name = req.body.name;
      const cateCheck = await CateNewsModel.findOne({ _id: _id });
      if (cateCheck == null) {
        return res.json({
          data: null,
          messege: "Khong co san pham nay",
          code: 200
        });
      }
      if (cateCheck != null) {
        const cateDelete = await CateNewsModel.updateOne(
          { _id: _id },
          { isDelete: true }
        );
        const proCate = await NewsModel.updateMany(
          { category: _id },
          { isDelete: true }
        );
        return res.json({
          code: 200,
          data: { cateDelete },
          err: null
        });
      }
    } catch (err) {
      console.log(err);
      return res.json({ code: 400, err: err, data: null });
    }
  }
};
