const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  products: [
    {
      name: String,
      price: {
        type: Number,
        currency: ["TRY", "EUR", "USD"]
      },
      description: String,
      state: Boolean,
      imgUrl: String,
      category: String
    }
  ]
});
module.exports = mongoose.model("Menu", menuSchema);
