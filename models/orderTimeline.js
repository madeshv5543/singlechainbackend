const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderTimeline = new Schema({
        sentToseller: {
            type:Boolean,
            default: false
        },
        sellerConfirm: {
            type:Boolean,
            default: false
        },
        buyerBankerConfirm: {
            type: Boolean,
            default: false
        },
        sellerBankerConfirm: {
            type: Boolean,
            default: false
        },
        buyerblockchain:String,
        sellerblockchain:String,
        buyerhost:String,
        sellerhost: String,
        buyerContract:String,
        sellerContract:String,
        buyerBankerchain: String,
        buyerBankerhost: String,
        buyerBankerContract : String,
        sellerBankerchain : String,
        sellerBankerContract : String,
        sellerBankerhost: String,
        sentToBuyer: {
            type: Boolean,
            default: false
        },
        buyerConfirm: {
            type: Boolean,
            default: false
        },
        orderId:String
});
module.exports = mongoose.model('Timeline', orderTimeline);