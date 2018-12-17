const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const locSchema = new Schema({
    order: { type : Schema.Types.ObjectId, ref:'Order'},
    banker : { type: Schema.Types.ObjectId, ref: 'User'},
    seller : { type: Schema.Types.ObjectId, ref: 'User'},
    buyer : {type: Schema.Types.ObjectId, ref:'User'},
    accNo : String,
    goodsValue : Number,
    shipmentDate : Date,
    expiryDate: Date,
    portOfDestination : String,
    portOfDeparture: String,
    sellerBank: { type : Schema.Types.ObjectId, ref:'User'},
    status : {
        type: String,
        default : 'New'
    },
    documets:Array,
    timeline: {type: Schema.Types.ObjectId, ref:'Timeline'},
    currentholder : String,
    createdDate : {
        type: Date,
        default: Date.now
    },
    locId : String
});

module.exports = mongoose.model('Loc', locSchema )