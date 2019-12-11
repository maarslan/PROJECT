export class Product {
  [{
    name: String,
    price: {
      type: Number,
      currency: ["TRY", "EUR", "USD"]
    },
    description: String,
    state: Boolean,
    imgUrl: String,
    category: String
  }];
}
