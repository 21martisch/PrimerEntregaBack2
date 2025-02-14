const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ]
});

cartSchema.pre('findOne', function (next) {
  this.populate('products.product', '_id title price stock');
  next();
});

const CartModel = mongoose.model("carts", cartSchema);
module.exports = CartModel;
