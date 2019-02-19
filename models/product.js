const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema =  new Schema({
    productId: {
      type: String
    },
    name:{type:String} ,
    unitprice: {type:Number},
    quantity: {type:Number},
    weight: {type:Number},
    description: {type:String},
    expiry:{type:Date} ,
    certification: {type:String},
    company: {type:String},
    warranty :{type:Number},
    quality :{type:String},
    manufacturer :{type:String},
    type : {type:String},
    unitofquantity:{type:String},
    image:{type:String},
    skucode:{type:String},
    currentHolder: String,
    deliveryHub:
      { type : Schema.Types.ObjectId, ref:'User'},
    deliveryCenter: 
      { type : Schema.Types.ObjectId, ref:'User'},
    deliveryBoy: 
      { type : Schema.Types.ObjectId, ref:'User'},
    timeline: {type: Schema.Types.ObjectId, ref:'DeliveryTimeline'},
    createdDate : {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      default: 'New'
    }
});


module.exports = mongoose.model('Product', productSchema);