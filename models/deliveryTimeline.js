const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliveryTimeline = new Schema({
        dispatchToHub: {
            type:Boolean,
            default: false
        },
        dispatchToCenter: {
            type:Boolean,
            default: false
        },
        dispatchToDelivery: {
            type: Boolean,
            default: false
        },
        delivered: {
            type: Boolean,
            default: false
        },
        dispatchHubTxhash: String,
        dispatchCenterTxhash: String,
        dispatchDeliveryTxhash: String,
        deliveredTxhash: String,
        orderId:String
});
module.exports = mongoose.model('DeliveryTimeline', deliveryTimeline);