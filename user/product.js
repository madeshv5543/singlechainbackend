const config = require('config');
const verify = require('../middleware/verify');
const User = require('../models/user');
const seqNo = require('../models/counter');
const Product =  require('../models/product');
const Loc = require('../models/loc');
const Timeline = require('../models/deliveryTimeline');
const UserPopulate = ['accountType', 'address', 'created', 'email', 'username']
const adhi = require('web3-adhi');
const AdhiUrl = config.adhiUrl;
const ABI = config.abi;
const Tx = require('ethereumjs-tx');
const encrypt = require('../utils/crypto');
const { adminAddress, privateKey } = config;
const Web3 = require('web3-adhi')
const contractAbi =[{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"burnToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"},{"name":"_tokenURI","type":"string"},{"name":"_details","type":"string"}],"name":"mintUniqueTokenTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_details","type":"string"}],"name":"setOrderDetails","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_taxdetails","type":"string"}],"name":"setTaxDetail","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_changes","type":"string"}],"name":"setUpgradeDetails","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"},{"name":"_details","type":"string"},{"name":"_changes","type":"string"}],"name":"transferDoc","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":true,"name":"_tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_approved","type":"address"},{"indexed":true,"name":"_tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_operator","type":"address"},{"indexed":false,"name":"_approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_testString","type":"string"}],"name":"checkstringEmpty","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"deals","outputs":[{"name":"seller","type":"address"},{"name":"buyer","type":"address"},{"name":"date","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"exists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_index","type":"uint256"}],"name":"getSaleDealAtIndex","outputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getSaleDealsCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_index","type":"uint256"}],"name":"getTaxAtIndex","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getTaxCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_index","type":"uint256"}],"name":"getUpgradeAtIndex","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getUpgradeCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"InterfaceId_ERC165","outputs":[{"name":"","type":"bytes4"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"propertyDetails","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"taxes","outputs":[{"name":"taxdetails","type":"string"},{"name":"date","type":"uint256"},{"name":"verifier","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"upgrades","outputs":[{"name":"changes","type":"string"},{"name":"date","type":"uint256"},{"name":"verifier","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];
const contractAddress = "0xef5783cf3692dd379f4e82f5241a2a3645056c7c"
const web3 = new Web3(new Web3.providers.HttpProvider("https://adhinet.com"));
const properc721Contract = web3.adh.contract(contractAbi);
const smartContract = properc721Contract.at(contractAddress); 
const upload = require('../utils/utils'); 


function checkhex (word) {
    console.log('before add', word)
    if(word.length % 2 != 0){
        let  w1 = word.substring(0, 2);
        let w2 = word.substring(2, word.length);
        return w1+'0'+w2;
    }else{
        return word;
    }
}

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


 // sent to delivery hub
const updateDeliveryHub  = (req, res, next) =>{
    let {user} = req;
    let {productId} = req.params;
    let { deliveryHub } = req.body;
    Product.findByIdAndUpdate(productId,{deliveryHub})
    .then(
        result => {
            if(!result) {
                return res.json({message: 'Cannot update the product details', status: 400, type: 'Failure'})
            }
            next()
        },
        err =>{
            return res.json({message: 'Cannot update the product details', status: 400, type: 'Failure'})
        }
    )
}

const sentToDeliveryHub = (req, res, next) => {
    let {user} = req;
    let projectFields = [...UserPopulate, 'seed'];
    let { productId } = req.params;
    Product.findById(productId)
    .populate('deliveryHub', projectFields)
    // .populate('timeline')
    .then(
        orderDetails => {
            if(!orderDetails){
                return res.json({message: 'Cannot find the product details', status:404, type:'Failure'})
            }
            if(orderDetails.currentHolder === user.email){
                create721(orderDetails, req, res, next)
            }else{
                return res.json({ message: 'You don\'t have access to transfer is product', status: 400, type: 'Failure' })
            }
        },
        err => {
            return res.json({message: 'Cannot find the product details', status:404, type:'Failure'})
        }
    )
}


const create721  = function(order, req, res, next) {
    const id = order.productId;
    const name ='productTransfort';
    const { user } = req;
    User.findOne({address: user.address})
    .then(
        userDetails => {
            if(!userDetails) {
                return res.json({message: 'Cannot find the user details', status: 400, type: 'Failure'})
            }
            const data = {
                deliveryHub : order.deliveryHub,
                name : order.name,
                unitprice : order.unitprice,
                quantity : order.quantity,
                weight : order.weight,
                description : order.description,
                certification: order.certification,
                expiry : order.expiry,
                company : order.company,
                warranty : order.warranty,
                quality : order.quality,
                type:order.type,
                skucode:order.skucode,
                currentHolder: order.currentHolder,
                createdDate : order.createdDate
            }
            let jsondata =  JSON.stringify(data);
            console.log(jsondata)
            const rawTransaction =  
            {  
                    "nonce":checkhex(web3.toHex(web3.adh.getTransactionCount(user.address))),
                    "gasPrice":1000000000,
                    "gasLimit":3000000,
                    "to":smartContract.address,
                    "value":"0x00",
                    "data":smartContract.mintUniqueTokenTo.getData(order.deliveryHub.address, id , name, JSON.stringify(data), { from : user.address }),
                    "chainId":1
            }
            let encodeHash = encrypt.signTx(userDetails.seed, user.phrase, rawTransaction )
            web3.adh.sendRawTransaction('0x' + encodeHash.toString('hex'), function(err, txnno) {
                if (!err)
                    {                           
                        req.details = {
                            host :'https://adhinet.com',
                            contractAddress : contractAddress,
                            email: order.deliveryHub.email,
                            txhash : 'http://adhichain.info/tx/' + txnno
                        }
                        next()
                    }
                else {
                    return res.json({message: 'Cannot dispatch the product', status:400, type: 'Failure'})
                }
            });
        },
        err =>{
            return res.json({message: 'Cannot find the user details', status: 400, type: 'Failure'})
        }
    )
    
}

const updateSentDeliveryHub = (req, res) =>{
    const { productId} = req.params;
    let {txhash, host, contractAddress, email }  = req.details;
    Product.findByIdAndUpdate(productId, { status: 'Dispatched', currentHolder: email})
    .then(
        productDetails =>{
            Timeline.findOneAndUpdate({orderId: productDetails.productId},{dispatchToHub: true, dispatchHubTxhash: txhash})
            .then(
                timeline =>{
                  return res.json({message: 'Product Details updated Successfully.', status: 200, type:'Success'})
                },
                err => {
                  return res.json({ message: 'Cannot update Product Details', status: 404, type:'Failure' })
                }
            )
        }
    ).catch(err => {
        return res.json({message: 'Cannot update the product details', status: 400, type: 'Failure'})
    })
}

//sent  to delivery center 
const updateDeliveryCenter  = (req, res, next) =>{
    let {user} = req;
    let {productId} = req.params;
    let { deliveryCenter } = req.body;
    Product.findByIdAndUpdate(productId,{deliveryCenter})
    .then(
        result => {
            if(!result) {
                return res.json({message: 'Cannot update the product details', status: 400, type: 'Failure'})
            }
            next()
        },
        err =>{
            return res.json({message: 'Cannot update the product details', status: 400, type: 'Failure'})
        }
    )
}

const sentToDeliveryCenter = (req, res, next) => {
    let {user} = req;
    let projectFields = [...UserPopulate, 'seed'];
    let { remark } = req.body;
    let { productId } = req.params;
    Product.findById(productId)
    .populate('deliveryHub', projectFields)
    .populate('deliveryCenter', projectFields)
    // .populate('timeline')
    .then(
        orderDetails => {
            if(!orderDetails){
                return res.json({message: 'Cannot find the product details', status:404, type:'Failure'})
            }
            if(orderDetails.currentHolder !== user.email){
                return res.json({ message: 'You don\'t have access to transfer is product', status: 400, type: 'Failure' })
            }
            const { 
                deliveryHub, 
                name, 
                unitprice, 
                quantity, 
                weight, 
                description, 
                certification,
                expiry,
                company,
                warranty,
                quality,
                type,
                skucode,
                currentHolder,
                createdDate,
                deliveryCenter
            } = orderDetails
            const data = {
                deliveryHub, 
                name, 
                unitprice, 
                quantity, 
                weight, 
                description, 
                certification,
                expiry,
                company,
                warranty,
                quality,
                type,
                skucode,
                currentHolder,
                createdDate,
                deliveryCenter
            }
            let details = {
                sender: deliveryHub.address,
                receiver: deliveryCenter.address,
                id: orderDetails.productId,
                seed: deliveryHub.seed,
                data: JSON.stringify(data),
                remark,
                email: deliveryCenter.email
            }
            setDetailsInSmartContract(req, res, next, details)
        },
        err => {
            return res.json({message: 'Cannot find the product details', status:404, type:'Failure'})
        }
    )
}


const setDetailsInSmartContract = function( req, res, next, details) {
    let { sender, receiver, id, seed, data, remark, email} = details
    data = data ?  data:"";
    remark = remark ? remark:"";
    const { user } = req;
    // let datahash = smartContract.transferDoc.getData(sender, receiver, id ,data, remark, {from : sender})
    var rawTransaction =  
    {  
          "nonce":checkhex(web3.toHex(web3.adh.getTransactionCount(sender))),
          "gasPrice":1000000000,
          "gasLimit":3000000,
          "to":smartContract.address,
          "value":"0x00",
          "data":smartContract.transferDoc.getData(sender, receiver, id ,data, remark, {from : sender}),
          "chainId":1
    }
    let encodeHash = encrypt.signTx(seed, user.phrase, rawTransaction )
    web3.adh.sendRawTransaction('0x' + encodeHash.toString('hex'), function(err, txnno) {
     if(!err) {
        req.details= {
            host :'https://adhinet.com',
            contractAddress : contractAddress,
            email,
            txhash : 'http://adhichain.info/tx/' + txnno
        }
        next()
     }else{
         return  res.json({message : 'Cannot dispatch the Product', status: 400, type: 'Failure' })
     }
    })
}

const updateSentDeliveryCenter = (req, res) =>{
    const { productId} = req.params;
    let {txhash, host, contractAddress, email }  = req.details;
    Product.findByIdAndUpdate(productId, { status: 'Dispatched', currentHolder: email})
    .then(
        productDetails =>{
            Timeline.findOneAndUpdate({orderId: productDetails.productId},{dispatchToCenter: true, dispatchCenterTxhash: txhash})
            .then(
                timeline =>{
                  return res.json({message: 'Product Details updated Successfully.', status: 200, type:'Success'})
                },
                err => {
                  return res.json({ message: 'Cannot update Product Details', status: 404, type:'Failure' })
                }
            )
        }
    ).catch(err => {
        return res.json({message: 'Cannot update the product details', status: 400, type: 'Failure'})
    })
}


//sent to delivery;

const updateDelivery  = (req, res, next) =>{
    let {user} = req;
    let {productId} = req.params;
    let { deliveryBoy } = req.body;
    Product.findByIdAndUpdate(productId,{deliveryBoy})
    .then(
        result => {
            if(!result) {
                return res.json({message: 'Cannot update the product details', status: 400, type: 'Failure'})
            }
            next()
        },
        err =>{
            return res.json({message: 'Cannot update the product details', status: 400, type: 'Failure'})
        }
    )
}

const sentToDelivery = (req, res, next) => {
    let {user} = req;
    let projectFields = [...UserPopulate, 'seed'];
    let { remark } = req.body;
    let { productId } = req.params;
    Product.findById(productId)
    .populate('deliveryHub', projectFields)
    .populate('deliveryCenter', projectFields)
    .populate('deliveryBoy', projectFields)
    // .populate('timeline')
    .then(
        orderDetails => {
            if(!orderDetails){
                return res.json({message: 'Cannot find the product details', status:404, type:'Failure'})
            }
            if(orderDetails.currentHolder !== user.email){
                return res.json({ message: 'You don\'t have access to transfer is product', status: 400, type: 'Failure' })
            }
            const { 
                deliveryHub, 
                name, 
                unitprice, 
                quantity, 
                weight, 
                description, 
                certification,
                expiry,
                company,
                warranty,
                quality,
                type,
                skucode,
                currentHolder,
                createdDate,
                deliveryCenter,
                deliveryBoy
            } = orderDetails
            const data = {
                deliveryHub, 
                name, 
                unitprice, 
                quantity, 
                weight, 
                description, 
                certification,
                expiry,
                company,
                warranty,
                quality,
                type,
                skucode,
                currentHolder,
                createdDate,
                deliveryCenter,
                deliveryPerson: deliveryBoy
            }
            let details = {
                sender: deliveryCenter.address,
                receiver: deliveryBoy.address,
                id: orderDetails.productId,
                seed: deliveryCenter.seed,
                data: JSON.stringify(data),
                remark,
                email: deliveryBoy.email
            }
            setDetailsInSmartContract(req, res, next, details)
        },
        err => {
            return res.json({message: 'Cannot find the product details', status:404, type:'Failure'})
        }
    )
}




const updateSentDelivery = (req, res) =>{
    const { productId} = req.params;
    let {txhash, host, contractAddress, email }  = req.details;
    Product.findByIdAndUpdate(productId, { status: 'OutforDelivery', currentHolder: email})
    .then(
        productDetails =>{
            Timeline.findOneAndUpdate({orderId: productDetails.productId},{dispatchToDelivery: true, dispatchDeliveryTxhash: txhash})
            .then(
                timeline =>{
                  return res.json({message: 'Product Details updated Successfully.', status: 200, type:'Success'})
                },
                err => {
                  return res.json({ message: 'Cannot update Product Details', status: 404, type:'Failure' })
                }
            )
        }
    ).catch(err => {
        return res.json({message: 'Cannot update the product details', status: 400, type: 'Failure'})
    })
}


module.exports = function(router) {
    router.post('/sentToDeliveryHub/:productId',
        verify,
        updateDeliveryHub,
        sentToDeliveryHub,
        updateSentDeliveryHub
    ),
    router.post('/sentToDeliveryCenter/:productId',
        verify,
        updateDeliveryCenter,
        sentToDeliveryCenter,
        updateSentDeliveryCenter
    ),
    router.post('/sentToDelivery/:productId',
        verify,
        updateDelivery,
        sentToDelivery,
        updateSentDelivery
    )
}