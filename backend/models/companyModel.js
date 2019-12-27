const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  companyName: String,
  email: String,
  password: String,
  address: String,
  phone: Number,
  contractNo: String,
  menu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }]
    }
  ],
  table: [{ name: String, no: Number }],
  createdAt: { type: Date, default: Date.now() },
  founder: [
    {
      fullName: String,
      phone: Number,
      citizenNumber: Number,
      taxNumber: Number,
      dateOfBirth: Date
    }
  ],

  picVersion: { type: String, default: "1577294644" },
  picId: { type: String, default: "unknown-512_gn1h92.png" },
  images: [
    {
      imgId: { type: String, default: "" },
      imgVersion: { type: String, default: "" }
    }
  ]
});

module.exports = mongoose.model("Company", companySchema);
