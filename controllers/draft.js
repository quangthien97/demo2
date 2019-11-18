const DraftModel = require("../models/Draft");
const moment = require("moment");
var createError = require("http-errors");

module.exports = {
  get: async (req, res) => {
    try {
      const drafts = await DraftModel.find({ isDelete: false })
        .populate("cateNews")
        .populate("createdBy");
      return res.json({
        code: 200,
        err: null,
        data: drafts
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
      const idDraft = req.params._id;
      const draft = await DraftModel.findOne({
        _id: idDraft,
        isDelete: false
      })
        .populate("cateNews")
        .populate("createdBy");
      return res.json({
        code: 200,
        err: null,
        data: draft
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
      const Draft = new DraftModel({
        title: null,
        content: null,
        cateNews: null,
        count: null,
        createdBy: req.user._id
      });
      const DraftClass = await Draft.save();
      return res.json({ code: 200, message: null, data: DraftClass });
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
      const draftCheck = await DraftModel.findOne({ _id: _id });
      if (draftCheck == null) {
        return res.json({
          data: null,
          messege: "Khong co bai viet nay",
          code: 200
        });
      }
      if (draftCheck != null) {
        if (draftCheck.createdBy.toString() == req.user._id.toString()) {
          const body = req.body;
          const draftUpdate = await DraftModel.updateOne(
            { _id: _id },
            {
              count: body.count,
              title: body.title,
              content: body.content,
              cateNews: body.cateNews,
              dateCreate: moment().format("MMMM Do YYYY, h:mm:ss a")
            }
          );
          return res.json({ code: 200, message: null, data: draftUpdate });
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
      const draftCheck = await DraftModel.findOne({ _id: _id });
      if (draftCheck == null) {
        return res.json({
          data: null,
          messege: "Khong co ban nhap nay",
          code: 200
        });
      }
      if (draftCheck != null) {
        if (draftCheck.createdBy._id.toString() == req.user._id.toString()) {
          const body = req.body;
          const draftUpdate = await DraftModel.updateOne(
            { _id: _id },
            { isDelete: true }
          );
          return res.json({ code: 200, message: "da xoa", data: draftUpdate });
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
  }
};
