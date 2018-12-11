const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema =  new Schema({
   
   
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
    skucode:{type:String}

});


module.exports = mongoose.model('Product', productSchema);