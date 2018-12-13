const config = require('config');
const verify = require('../middleware/verify');
const User = require('../models/user');
const seqNo = require('../models/counter');
const Order = require('../models/purchaseOrder');
const Loc = require('../models/loc');
const Timeline = require('../models/orderTimeline');
const UserPopulate = ['accountType', 'address', 'city','walletAddress', 'companyName', 'country', 'created', 'email', 'firstName', 'lastName', 'phoneNumber','orgName','pincode', 'username']
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

 const createLoc = async function(req, res) {
    const { order, banker, accNo, goodsValue, shipmentDate, expiryDate, portOfDestination, portOfDeparture, seller, buyer} = req.body;
    let locId;
    let {email} = req.user;
    try{
        locId = await getNextSequenceValue('loc', res);
    }catch(err){
        return res.json({message : 'Cannot create loc', status: 400, type: 'Failure'})
    }
    locId = parseInt("10"+locId)
    let newLoc = new Loc({
        order,
        banker,
        accNo,
        goodsValue,
        shipmentDate,
        expiryDate,
        seller,
        buyer,
        portOfDestination,
        portOfDeparture,
        locId,
        currentholder: email
    })
    let newTimeline = new Timeline({
        orderId: locId
    })
    newTimeline.save()
    .then(
        timeline => {
         newLoc.timeline = timeline._id;
         newLoc.save()
          .then(
              loc => {
                return res.json({message: 'LOC Details Saved.', status: 200, type: 'Success'})
              },
              err => {
                  return res.json({message: 'Cannot save loc details', status: 500, type:'Failure'})
              }
          )
        },
        err => {
          return res.json({message: 'Cannot save loc details', status: 500, type:'Failure'})
      }
    )
    // newLoc.save(  function saveLoc (err, loc)  {
    //     if(err) {
    //      return   res.json({ message: 'Cannot create a loc', status: 400, type: 'Faliure' })
    //     }
    //     res.json({ message: 'Loc Document Created Successfully', status: 200, type: 'Success' })
    // })
 }

 const updateLoc = function(req, res) {
     let locDetails = req.body;
     let {id} = req.params;
     Loc.findByIdAndUpdate(id, locDetails)
     .then(
         locDetails => {
            res.json({ message:' Loc details updated successfully', status: 200, type: 'Success' })
         },
         err => {
             res.json({message: 'Cannot update the loc details', status: 400, type: 'Failure'})
         }
     )
 }

 const validateLocform = ( req, res, next) => {
     if(!req.body.hasOwnProperty('order')){
         res.json({ message: 'Please select the order for loc', status: 400, type: 'Failure'})
     }
     if(!req.body.hasOwnProperty('banker')) {
        return res.json({ message: 'Please select the banker', status: 400, type: 'Failure'})
     }
     if(!req.body.hasOwnProperty('accNo')) {
       return  res.json({ message: 'Enter your account Details', status: 400, type: 'Failure'})
     }
     if(!req.body.hasOwnProperty('goodsValue')) {
        return res.json({ message: 'Enter Goods Value', status: 400, type: 'Failure' })
     }
     if(!req.body.hasOwnProperty('shipmentDate')) {
        return res.json( { message: 'Select the shipment Date', status: 400, type: 'Failure'}) 
     }
     if(!req.body.hasOwnProperty('expiryDate')) {
        return res.json( { message: 'Select the expiry date of loc', status: 400, type: 'Failure'})
     }
     if(!req.body.hasOwnProperty('portOfDestination')) {
        return res.json({ message: 'Enter the port of destination', status: 400, type: 'Failure'})
     }
     if(!req.body.hasOwnProperty('portOfDeparture')) {
        return res.json({ message: 'Enter the port of departure', status: 400, type: 'Failure' })
     }
     next()
 }

 const getLocDetails = (req, res) => {
     let {id} = req.params;
     Loc.findById(id)
     .populate('seller', UserPopulate)
     .populate('buyer', UserPopulate)
     .populate('banker', UserPopulate)
     .populate('sellerBank', UserPopulate)
     .populate('timeline')
     .then(
         locDetails => {
            if(!locDetails) {
                return res.json({ message: 'Cannot find loc details', status : 400, type: 'Failure'})
            }else{
                res.json({data:locDetails, status: 200, type: 'Success'})
            }
         },
         err => {
             res.json({ message: 'Cannot find order details', status: 404, type: 'Failure'})
         }
     )
 }

 const sentToBanker = function(req, res, next) {
    let { user }  = req;
    let { locId } = req.params;
    User.findOne({email: user.email}) 
    .then(
        doc => {
            if(doc) {
                if(!doc) {
                    return res.json({message: 'Cannot find user details', status:404, type: 'Failure'})
                }
                // if(!doc.blockchainExplore || !doc.blockchainHost) {
                //     return res.json({ message: 'Update the blockchain details in profile infromation.' })
                // }
                let projectFields = [...UserPopulate, 'seed'];
                Loc.findById(locId)
                .populate('seller', projectFields)
                .populate('buyer', projectFields)
                .populate('banker', projectFields)
                .populate('timeline')
                .then(
                    orderDetails => {
                        if(!orderDetails){
                            return res.json({message: 'Cannot find the order details', status:404, type:'Failure'})
                        }
                        if(orderDetails.currentholder === user.email){
                            create721(orderDetails, req, res, next)
                        }else{
                            return res.json({ message: 'You don\'t have access to transfer is document', status: 400, type: 'Failure' })
                        }
                    },
                    err => {
                        return res.json({message: 'Cannot find the order details', status:404, type:'Failure'})
                    }
                )
            }
        },
        err => { 
            return res.json({message: 'Cannot find user details', status:404, type: 'Failure'})
        }
    )
}

 const getLocList = (req, res) => {
     let { email } = req.user;
     User.findOne({email})
     .then(
         userDetails => {
            if(!userDetails) {
                return res.json({ message: 'User not found', status: 404, type:'Failure' })
            }
            Loc.find({$or : [{ seller: userDetails._id }, { buyer : userDetails._id }, {banker: userDetails._id}, { sellerBank : userDetails._id}]})
            .populate('seller', UserPopulate)
            .populate('buyer', UserPopulate)
            .then(
                loslist => {
                    res.json({ data: loslist, status: 200, type: 'Success'})
                },
                err => {
                    res.json({ message: 'cannot find loc list', status: 400, type: 'Failure' })
                }
            )
         },
         error => {
            return res.json({ message: 'User not found', status: 404, type:'Failure' })
         }
     )
 }

 const create721  = function(order, req, res, next) {
    const id = order.locId;
    const name ='LetterOfCredit';
    const { user } = req;
    const data = {
        seller : order.seller,
        buyer : order.buyer,
        buyerBanker : order.banker,
        accNo : order.accNo,
        goodsValue : order.goodsValue,
        shipmentDate : order.shipmentDate,
        portOfDeparture: order.portOfDeparture,
        portOfDestination : order.portOfDestination,
        expiryDate : order.expiryDate,
        createdDate : order.createdDate
    }
    const rawTransaction =  
            {  
                  "nonce":checkhex(web3.toHex(web3.adh.getTransactionCount(order.buyer.walletAddress))),
                  "gasPrice":1000000000,
                  "gasLimit":3000000,
                  "to":smartContract.address,
                  "value":"0x00",
                  "data":smartContract.mintUniqueTokenTo.getData(order.banker.walletAddress, id , name, JSON.stringify(data), { from : order.buyer.walletAddress }),
                  "chainId":1
            }
                let encodeHash = encrypt.signTx(order.buyer.seed, user.phrase, rawTransaction )
                web3.adh.sendRawTransaction('0x' + encodeHash.toString('hex'), function(err, txnno) {
                    if (!err)
                            {                           
                               req.details = {
                                   host :'https://adhinet.com',
                                   contractAddress : contractAddress,
                                   email: order.banker.email,
                                   txhash : 'http://adhichain.info/tx/' + txnno
                               }
                               next()
                            }
                            else {
                                return res.json({message: 'purchase order created', status:200, type: 'Failure'})
                            }
                      });
}

const updateLocDetails = function(req, res) {
    let { locId } = req.params;
    let {txhash, host, contractAddress, email }  = req.details;
    Loc.findByIdAndUpdate(locId, { status:'Active', currentholder: email  })
    .then(
        locupdate => {
          Timeline.findOneAndUpdate({orderId: locupdate.locId},{sentToseller: true, buyerblockchain : txhash, buyerhost : host, buyerContract : contractAddress })
          .then(
              timeline =>{
                return res.json({message: 'Loc Details updated Successfully.', status: 200, type:'Success'})
              },
              err => {
                return res.json({ message: 'Cannot update Loc Details', status: 404, type:'Failure' })
              }
          )
        },
        err => {
          return res.json({ message: 'Cannot update Loc Details', status: 404, type:'Failure' })
        }
    )
}

const sentToSellerBank  = function (req, res, next) {
    let { locId } = req.params;
    let { banker } = req.body;
    let { email } = req.user;
    Loc.findOneAndUpdate({_id : locId, currentholder : email},{ sellerBank: banker})
    .then(
        locDetails => {
            if(!locDetails) {
                return res.json({ message : 'Cannot Transfer Loc Document', status: 400, type:'Failure'})
            }else{
                let projectFields = [...UserPopulate, 'seed'];
                Loc.findById(locId)
                .populate('seller', projectFields)
                .populate('buyer', projectFields)
                .populate('banker', projectFields)
                .populate('sellerBank', projectFields)
                .then(
                    lcdetails => {
                        if(lcdetails.currentholder === email){
                            transferToSellerBank(lcdetails, req, res, next )
                        }else{
                            return res.json({ message: 'you don\'t have access to transfer this loc.', status: 400, type: 'Failure' })
                        }
                    }
                )
         
            }
        }
    ).catch(err => {
        return res.json({ message: 'Cannot Transfer Loc Document', status:400, type:'Failure'})
    })
}

const transferToSellerBank = (lc, req, res, next) => {
    const {locId} = req.params;
    let { remark} = req.body;
    remark = remark ?  remark : 'Approve And Transfer To Seller Bank';
    const { seller, buyer, banker, accNo, goodsValue, shipmentDate, portOfDeparture, portOfDestination, expiryDate, createdDate, sellerBank} = lc;
    const data = {
        seller,
        buyer,
        buyerBanker : banker,
        accNo ,
        goodsValue ,
        shipmentDate ,
        portOfDeparture,
        portOfDestination ,
        expiryDate ,
        createdDate,
        sellerBank
    };
    let details = {
        sender: banker.walletAddress,
        receiver: sellerBank.walletAddress,
        id: lc.locId,
        seed: banker.seed,
        data : JSON.stringify(data),
        remark,
        email: sellerBank.email
    }
    setDetailsInSmartContract(req, res, next, details)
}

const sentTobuyer = function(req, res, next) {
    let { locId} = req.params;
    let { remark } = req.body;
    let { email} = req.user;
    let projectFields = [...UserPopulate, 'seed'];
    Loc.findById(locId)
    .populate('buyer', projectFields)
    .populate('banker', projectFields)
    .then(
        lcdetails => {
            if(lcdetails.currentholder === email){
                let { buyer, banker} = lcdetails;
                let details = {
                    sender: banker.walletAddress,
                    receiver: buyer.walletAddress,
                    id: lcdetails.locId,
                    data: null,
                    seed: banker.seed,
                    remark,
                    email: buyer.email
                }
                setDetailsInSmartContract(req, res, next, details  )
            }else{
                return res.json({ message: 'you don\'t have access to transfer this loc.', status: 400, type: 'Failure' })
            }
        }
    ).catch(err => {
        return res.json({ message: 'Cannot Transfer Loc Document', status:400, type:'Failure'})
    })
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
         return  res.json({message : 'Cannot transfer loc Document', status: 400, type: 'Failure' })
     }
    })
}

const updateSentToSellerBank = function(req, res) {
    let { locId } = req.params;
    let {email, host, contractAddress, txhash} = req.details;
    Loc.findByIdAndUpdate(locId, { status:'Active', currentholder: email  })
    .then(
        locupdate => {
          Timeline.findOneAndUpdate({orderId: locupdate.locId},{buyerBankerConfirm: true, buyerBankerchain : txhash, buyerBankerhost : host, buyerBankerContract : contractAddress })
          .then(
              timeline =>{
                return res.json({message: 'Loc Details updated Successfully.', status: 200, type:'Success'})
              },
              err => {
                return res.json({ message: 'Cannot update Loc Details', status: 404, type:'Failure' })
              }
          )
        },
        err => {
          return res.json({ message: 'Cannot update Loc Details', status: 404, type:'Failure' })
        }
    )
}

const updateReturnToBuyer = function(req, res) {
    let { locId} = req.params;
    let {email, host, contractAddress, txhash} = req.details;
    Loc.findByIdAndUpdate(locId, { status:'Return', currentholder: email  })
    .then(
        locupdate => {
          Timeline.findOneAndUpdate({orderId: locupdate.locId},{buyerBankerConfirm: false, buyerBankerchain : txhash, buyerBankerhost : host, buyerBankerContract : contractAddress })
          .then(
              timeline =>{
                return res.json({message: 'LOC Details updated Successfully.', status: 200, type:'Success'})
              },
              err => {
                return res.json({ message: 'Cannot update LOC Details', status: 404, type:'Failure' })
              }
          )
        },
        err => {
          return res.json({ message: 'Cannot update LOC Details', status: 404, type:'Failure' })
        }
    )
}

const resendToBank = function(req, res, next) {
    let { locId} = req.params;
    let { remark } = req.body;
    let {user} = req;
    let projectFields = [...UserPopulate, 'seed'];
    Loc.findById(locId)
    .populate('seller', projectFields)
    .populate('buyer', projectFields)
    .populate('banker', projectFields)
    .populate('sellerBank', projectFields)
    .then(
        lcdetails => {
            if(!lcdetails){
                return res.json({ message: 'Cannot find the loc document', status: 400, type:"Failure"})
            }
            if(lcdetails.currentholder !== user.email) {
                return res.json({ message: 'You don\'t have access to transfer this document', status: 400, type: 'Failure'})
            }
            const { seller, buyer, banker, accNo, goodsValue, shipmentDate, portOfDeparture, portOfDestination, expiryDate, createdDate} = lcdetails;
            const data = {
                seller,
                buyer,
                buyerBanker : banker,
                accNo ,
                goodsValue ,
                shipmentDate ,
                portOfDeparture,
                portOfDestination ,
                expiryDate ,
                createdDate
            };
            let details = {
                sender: buyer.walletAddress,
                receiver: banker.walletAddress,
                id: lcdetails.locId,
                seed: buyer.seed,
                data : JSON.stringify(data),
                remark,
                email: banker.email
            }
            setDetailsInSmartContract(req, res, next, details);
        }
    ).catch( err => {
        return res.json({ message: 'Cannot transfer the loc document', status: 400, type:"Failure"})
    })
}

const updateResentToBank = function(req, res) {
    let { locId } = req.params;
    let {txhash, host, contractAddress, email }  = req.details;
    Loc.findByIdAndUpdate(locId, { status:'Active', currentholder: email  })
    .then(
        locupdate => {
          Timeline.findOneAndUpdate({orderId: locupdate.locId},{sentToseller: true, buyerblockchain : txhash, buyerhost : host, buyerContract : contractAddress })
          .then(
              timeline =>{
                return res.json({message: 'LOC Details updated Successfully.', status: 200, type:'Success'})
              },
              err => {
                return res.json({ message: 'Cannot update LOC Details', status: 404, type:'Failure' })
              }
          )
        },
        err => {
          return res.json({ message: 'Cannot update LOC Details', status: 404, type:'Failure' })
        }
    )
}

const sentToSeller = function(req, res, next) {
    let { locId} = req.params;
    let { email } = req.user;
    let { remark } = req.body;
    remark = remark ? remark : 'Approve And Transfer To Seller'
    let projectFields = [...UserPopulate, 'seed'];
    Loc.findById(locId)
    .populate('seller', projectFields)
    .populate('sellerBank', projectFields)
    .then(
        lcdetails => {
            if(!lcdetails){
                return res.json({ message: 'Cannot find the LOC document', status: 400, type: 'Failure'})
            }
            if(lcdetails.currentholder !== email){
                return res.json({ message: 'you don\'t have access to transfer this document', status: 400, type: 'Failure'})
            }
            const { seller, sellerBank } = lcdetails;
            let details = {
                sender: sellerBank.walletAddress,
                receiver: seller.walletAddress,
                id: lcdetails.locId,
                seed: sellerBank.seed,
                data : null,
                remark,
                email: seller.email
            }
            setDetailsInSmartContract(req, res, next, details);
        }
    ).catch(
        err => {
            return res.json({ message: ' cannot transfer the LOC document', status: 400, type:'Failure'})
        }
    )
}

const updateSentToSeller  = function( req, res){
    let { locId } = req.params;
    let {txhash, host, contractAddress, email }  = req.details;
    Loc.findByIdAndUpdate(locId, { status:'Active', currentholder: email  })
    .then(
        locupdate => {
          Timeline.findOneAndUpdate({orderId: locupdate.locId},{sellerBankerConfirm: true, sellerBankerchain : txhash, sellerBankerhost : host, sellerBankerContract : contractAddress })
          .then(
              timeline =>{
                return res.json({message: 'LOC Details updated Successfully.', status: 200, type:'Success'})
              },
              err => {
                return res.json({ message: 'Cannot update LOC Details', status: 404, type:'Failure' })
              }
          )
        },
        err => {
          return res.json({ message: 'Cannot update LOC Details', status: 404, type:'Failure' })
        }
    )
}

const returnToBuyerBank = function(req, res, next) {
    const { locId} = req.params;
    const { remark } = req.body;
    let { email } = req.user;
    let projectFields = [...UserPopulate, 'seed'];
    Loc.findById(locId)
    .populate('banker', projectFields)
    .populate('sellerBank', projectFields)
    .then(
        lcdetails => {
            if(!lcdetails){
                return res.json({ message: 'Cannot find the LOC document', status: 400, type: 'Failure'})
            }
            if(lcdetails.currentholder !== email){
                return res.json({ message: 'you don\'t have access to transfer this document', status: 400, type: 'Failure'})
            }
            const { banker, sellerBank } = lcdetails;
            let details = {
                sender: sellerBank.walletAddress,
                receiver: banker.walletAddress,
                id: lcdetails.locId,
                seed: sellerBank.seed,
                data : null,
                remark,
                email: banker.email
            }
            setDetailsInSmartContract(req, res, next, details);
        }
    ).catch(
        err => {
            return res.json({ message: ' cannot transfer the LOC document', status: 400, type:'Failure'})
        }
    )
}

const updateReturnToBank  = function( req, res){
    let { locId } = req.params;
    let {txhash, host, contractAddress, email }  = req.details;
    Loc.findByIdAndUpdate(locId, { status:'Return', currentholder: email  })
    .then(
        locupdate => {
          Timeline.findOneAndUpdate({orderId: locupdate.locId},{sellerBankerConfirm: false, sellerBankerchain : txhash, sellerBankerhost : host, sellerBankerContract : contractAddress })
          .then(
              timeline =>{
                return res.json({message: 'LOC Details updated Successfully.', status: 200, type:'Success'})
              },
              err => {
                return res.json({ message: 'Cannot update LOC Details', status: 404, type:'Failure' })
              }
          )
        },
        err => {
          return res.json({ message: 'Cannot update LOC Details', status: 404, type:'Failure' })
        }
    )
}

const sellerConfirm = function ( req, res, next) {
    let {locId} = req.params;
    let { remark} = req.body;
    let { email } = req.user;
    let projectFields = ['seed', ...UserPopulate];
    Loc.findById(locId)
    .populate('seller', projectFields)
    .populate('buyer', projectFields)
    .then(
         lcdetails => {
            if(!lcdetails){
                return res.json({ message: 'Cannot find the LOC document', status: 400, type: 'Failure'})
            }
            if(lcdetails.currentholder !== email){
                return res.json({ message: 'you don\'t have access to transfer this document', status: 400, type: 'Failure'})
            }
            const { seller, buyer } = lcdetails;
            let details = {
                sender: seller.walletAddress,
                receiver: buyer.walletAddress,
                id: lcdetails.locId,
                seed: seller.seed,
                data : null,
                remark,
                email: buyer.email
            }
            setDetailsInSmartContract(req, res, next, details);
        }
    ).catch( err => {
        return res.json({ message: 'Cannot transfer the LOC document', status : 400, type : 'Failure' })
    })
}

const updateSellerConfirm = function(req, res) {
    let { locId } = req.params;
    let {txhash, host, contractAddress, email }  = req.details;
    Loc.findByIdAndUpdate(locId, { status:'Completed', currentholder: email  })
    .then(
        locupdate => {
          Timeline.findOneAndUpdate({orderId: locupdate.locId},{sellerConfirm: true, sellerblockchain : txhash, sellerhost : host, sellerContract : contractAddress })
          .then(
              timeline =>{
                return res.json({message: 'LOC Details updated Successfully.', status: 200, type:'Success'})
              },
              err => {
                return res.json({ message: 'Cannot update LOC Details', status: 404, type:'Failure' })
              }
          )
        },
        err => {
          return res.json({ message: 'Cannot update LOC Details', status: 404, type:'Failure' })
        }
    )
}


const returnToSellerBank = function(req, res, next) {
    let {locId} = req.params;
    let { remark} = req.body;
    let { email } = req.user;
    let projectFields = ['seed', ...UserPopulate];
    Loc.findById(locId)
    .populate('seller', projectFields)
    .populate('sellerBank', projectFields)
    .then(
         lcdetails => {
            if(!lcdetails){
                return res.json({ message: 'Cannot find the LOC document', status: 400, type: 'Failure'})
            }
            if(lcdetails.currentholder !== email){
                return res.json({ message: 'you don\'t have access to transfer this document', status: 400, type: 'Failure'})
            }
            const { seller, sellerBank } = lcdetails;
            let details = {
                sender: seller.walletAddress,
                receiver: sellerBank.walletAddress,
                id: lcdetails.locId,
                seed: seller.seed,
                data : null,
                remark,
                email: sellerBank.email
            }
            setDetailsInSmartContract(req, res, next, details);
        }
    ).catch( err => {
        return res.json({ message: 'Cannot transfer the LOC document', status : 400, type : 'Failure' })
    })
}

const updateReturnToSellerBank = function (req, res){
    let { locId } = req.params;
    let {txhash, host, contractAddress, email }  = req.details;
    Loc.findByIdAndUpdate(locId, { status:'Return', currentholder: email  })
    .then(
        locupdate => {
          Timeline.findOneAndUpdate({orderId: locupdate.locId},{sellerConfirm: false, sellerblockchain : txhash, sellerhost : host, sellerContract : contractAddress })
          .then(
              timeline =>{
                return res.json({message: 'LOC Details updated Successfully.', status: 200, type:'Success'})
              },
              err => {
                return res.json({ message: 'Cannot update LOC Details', status: 404, type:'Failure' })
              }
          )
        },
        err => {
          return res.json({ message: 'Cannot update LOC Details', status: 404, type:'Failure' })
        }
    )
}


module.exports = function(router) {
    router.post('/createLoc',
        verify,
        validateLocform,
        createLoc
    ),
    router.get('/loclist',
         verify,
         getLocList
    ),
    router.get('/loc/:id',
        verify,
        getLocDetails
    ),
    router.post('/editLoc/:id',
        verify,
        validateLocform,
        updateLoc
    ),
    router.post('/sentToBanker/:locId',
        verify,
        sentToBanker,
        updateLocDetails
    ),
    router.post('/sentToBuyer/:locId',
        verify,
        sentTobuyer,
        updateReturnToBuyer
    ),
    router.post('/sentToSellerBank/:locId',
        verify,
        sentToSellerBank,
        updateSentToSellerBank
    ),
    router.post('/resentToSellerBank/:locId',
        verify,
        sentToSellerBank,
        updateSentToSellerBank
    ),
    router.post('/resentToBank/:locId',
        verify,
        resendToBank,
        updateResentToBank
    ),
    router.post('/transferToSeller/:locId',
        verify,
        sentToSeller,
        updateSentToSeller
    ),
    router.post('/returnToBuyerBank/:locId',
        verify,
        returnToBuyerBank,
        updateReturnToBank
    ),
    router.post('/sellerConfirm/:locId',
        verify,
        sellerConfirm,
        updateSellerConfirm
    ),
    router.post('/returnToSellerBank/:locId',
        verify,
        returnToSellerBank,
        updateReturnToSellerBank
    )
}