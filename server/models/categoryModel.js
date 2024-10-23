const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
  {
    name: { type: String, unique: true,required:true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users",required:true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Categories',categorySchema)
