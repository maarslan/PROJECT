const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  companyName: String,
  email: String,
  password: String,
  adress: String,
  Phone: Number,
  contractNo: String,
  menu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }]
    }
  ],
  table: [{ name: String, no: Number }],
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Company", companySchema);
