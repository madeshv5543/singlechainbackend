const config = require('config');
const verify = require('../middleware/verify');
const User = require('../models/user');
const Product = require('../models/product');
const upload = require('../utils/utils');
const seqNo = require('../models/counter');
const Timeline = require('../models/deliveryTimeline');
const uuidv1 = require('uuid/v1');
const mongoose = require('mongoose')
const UserPopulate = ['accountType', 'address', 'city', 'companyName', 'country', 'created', 'email', 'firstName', 'lastName', 'phoneNumber', 'pincode', 'username']

function getNextSequenceValue(sequenceName, res){
    return new Promise((resolve, reject)=> {
        seqNo.findOneAndUpdate(
          { title : sequenceName },
          { $inc : { "sequence_value": 1 }},
            function getSqgno(err, doc){
                if(err) {
                    reject(null)
                }else{
                    resolve(doc.sequence_value)
                }
            });
    })   
 }

module.exports = function (router) {
    router.post('/productOrder',
        verify,
        upload.single('urlimg'),
       async (req, res) => {
           const {user} = req;
            const requireParams = [
                'name',
                'unitprice',
                'quantity',
                'weight',
                'description',
                'expiry',
                'certification',
                'company',
                'warranty',
                'quality',
                'manufacturer',
                'type',
                'skucode',
                'unitofquantity'
            ];
            let isValid = requireParams.reduce((acc, p) => (acc & p in req.body), true)
            if (!isValid) {
                return res.json({
                    message: 'A require Param is not present ',
                    status: 400,
                    type: 'Failure'
                });
            };
            let productId;
            try{
                productId = await getNextSequenceValue('product', res);
            }catch(err){
                return res.json({message : 'Cannot create Product', status: 400, type: 'Failure'})
            }
            const {
                name,
                unitprice,
                quantity,
                weight,
                description,
                expiry,
                certification,
                company,
                warranty,
                quality,
                manufacturer,
                type,
                unitofquantity,
                skucode,
                image
            } = req.body
            var newproduct = new Product({
                name,
                unitprice,
                quantity,
                weight,
                description,
                expiry,
                certification,
                company,
                warranty,
                quality,
                manufacturer,
                type,
                skucode,
                unitofquantity,
                image,
                productId,
                currentHolder: user.email
            });
            if (req.file) {
                newproduct.image = req.file.filename
                console.log(newproduct.image)
            }

    let newTimeline = new Timeline({
        orderId: productId
    })
    newTimeline.save()
    .then(
        result => {
            newproduct.timeline = result._id;
            newproduct.save()
            .then(
                doc => {
                    return res.json({
                        message: 'Product added successfully',
                        status: 200,
                        type: 'Success'
                    })
                },
                err => {
                    return res.json({
                        message: 'Cannot save  product details. Try after sometime',
                        status: 500,
                        type: 'Failure'
                    })
                }
            )
        },
        err => {
            return res.json({
                message: 'Cannot save product details. Try after sometime',
                status: 500,
                type: 'Failure'
            })
        }
        )}
    );
    router.get('/productlist',
        verify,
        (req, res) => {
            Product.find({})
                .then(
                    result => {
                        return res.json({
                            data: result,
                            status: 200,
                            type: "Success"
                        })
                    },
                    // err => {
                    //     return res.json({message: 'User list not found', status:401, type:"Failure"})
                    // }
                )
        }
    )
    router.get('/product/:productId',
        verify,
        (req, res) => {
            const {
                productId
            } = req.params
            Product.findById(productId)
            .populate('timeline')
                .then(
                    doc => {
                        if (!doc) {
                            return res.json({
                                message: "Cannot find  details",
                                status: '204',
                                type: 'Failure'
                            })
                        }
                        res.json({
                            data: doc,
                            status: 200,
                            type: 'suceess'
                        })
                    },
                    err => {
                        return res.json({
                            message: 'Cannot find campaign details. Try after sometime',
                            status: 500,
                            type: 'Failure'
                        })
                    },
                )
        }
    )
    router.post('/updateProduct/:productId',
        verify,
        upload.single('urlimg'),
        (req, res) => {
            const {
                productId
            } = req.params;
            const requireParams = [
                'name',
                'unitprice',
                'quantity',
                'weight',
                'description',
                'expiry',
                'certification',
                'company',
                'warranty',
                'quality',
                'manufacturer',
                'type',
                'skucode',
                'unitofquantity'
            ];
            let productdata = req.body
            console.log(productdata)
            if (req.file) {
                productdata.image = req.file.filename
            }
            let isValid = requireParams.reduce((acc, p) => (acc & p in req.body), true)
            if (!isValid) {
                return res.json({
                    message: 'A require Param is not present ',
                    status: 400,
                    type: 'Failure'
                });
            }
            Product.findById(productId)
                .then(doc => {
                        if (!doc) {
                            return res.json({
                                message: "Cannot find camapign details",
                                status: '204',
                                type: 'Failure'
                            })
                        }
                        Product.findByIdAndUpdate(productId, productdata)
                            .then(saveres => {
                                    console.log("res", saveres)
                                    return res.json({
                                        data: saveres,
                                        status: 200,
                                        type: 'Success'
                                    })
                                },
                                err => {
                                    console.log(err) // return res.json({message: 'Cannot campaign details. Try after sometime', status:500, type: 'Failure'})
                                })

                    },
                    err => {
                        return res.json({
                            message: 'Cannot update campaign details. Try after sometime',
                            status: 500,
                            type: 'Failure'
                        })
                    })
        }
    )
    router.post('/remove/:productId',
        verify,
        (req, res) => {
            const {
                productId
            } = req.params
            Product.findByIdAndRemove(productId)
                .then(
                    doc => {
                        if (!doc) {
                            return res.json({
                                message: "Cannot find  details",
                                status: '204',
                                type: 'Failure'
                            })
                        }
                        res.json({
                            data: doc,
                            status: 200,
                            type: 'sucess'
                        })
                        console.log(res)
                    },
                    err => {
                        return res.json({
                            message: 'Cannot find campaign details. Try after sometime',
                            status: 500,
                            type: 'Failure'
                        })
                    }
                )
            err => {
                return res.json({
                    message: 'Cannot remove campaign details. Try after sometime',
                    status: 500,
                    type: 'Failure'
                })
            }
        }

    )

}