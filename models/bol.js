const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bolSchema =  new Schema({
    order: { type : Schema.Types.ObjectId, ref:'Order'},
    receiver : { type: Schema.Types.ObjectId, ref: 'User'},
    shipper : { type: Schema.Types.ObjectId, ref: 'User'},
    shipmentDate: { type: Date},
    timeline: {type: Schema.Types.ObjectId, ref:'Timeline'},
    shipmentType:String,
    documents: Array,
    notes:String,
    createdDate : {
        type: Date,
        default: Date.now
    },
    status : {
        type: String,
        default : 'New'
    },
    bolId: String
});
module.exports = mongoose.model('Bol', bolSchema)