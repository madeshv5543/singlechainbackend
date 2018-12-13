const config = require('config');
const verify = require('../middleware/verify');
const User = require('../models/user');
const seqNo = require('../models/counter');
const Order = require('../models/purchaseOrder');
const Timeline = require('../models/orderTimeline');
const uuidv1 = require('uuid/v1');
const UserPopulate = ['accountType', 'address', 'city','walletAddress', 'companyName', 'country', 'created', 'email', 'firstName', 'lastName', 'phoneNumber','orgName','pincode', 'username']
const web3 = require('web3');
const adhi = require('web3-adhi');
const AdhiUrl = config.adhiUrl;
const ABI = config.abi;
const Tx = require('ethereumjs-tx');
const encrypt = require('../utils/crypto');
const { adminAddress, privateKey } = config;
const Web3 = require('web3-adhi')
const contractAbi =[{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"burnToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"},{"name":"_tokenURI","type":"string"},{"name":"_details","type":"string"}],"name":"mintUniqueTokenTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_details","type":"string"}],"name":"setOrderDetails","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_taxdetails","type":"string"}],"name":"setTaxDetail","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_changes","type":"string"}],"name":"setUpgradeDetails","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"},{"name":"_details","type":"string"},{"name":"_changes","type":"string"}],"name":"transferDoc","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":true,"name":"_tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_approved","type":"address"},{"indexed":true,"name":"_tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_operator","type":"address"},{"indexed":false,"name":"_approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_testString","type":"string"}],"name":"checkstringEmpty","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"deals","outputs":[{"name":"seller","type":"address"},{"name":"buyer","type":"address"},{"name":"date","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"exists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_index","type":"uint256"}],"name":"getSaleDealAtIndex","outputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getSaleDealsCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_index","type":"uint256"}],"name":"getTaxAtIndex","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getTaxCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_index","type":"uint256"}],"name":"getUpgradeAtIndex","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getUpgradeCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"InterfaceId_ERC165","outputs":[{"name":"","type":"bytes4"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"propertyDetails","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"taxes","outputs":[{"name":"taxdetails","type":"string"},{"name":"date","type":"uint256"},{"name":"verifier","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"upgrades","outputs":[{"name":"changes","type":"string"},{"name":"date","type":"uint256"},{"name":"verifier","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];
const contractAddress = "0xef5783cf3692dd379f4e82f5241a2a3645056c7c"

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



const sellerDetails = function(req, res) {
    User.find({accountType:'Seller'},{password:0})
    .then(
        docs => {
            res.json({data:docs, status:200, type:'Success'})
        },
        err => {
            res.json({message:'Cannot get Seller list', status: 400, type: 'Failure'})
        }
    )
}

const placeOrder = async function(req, res) {
    let {user}  = req;
    const {items, totalCost, sellerId } = req.body;
    let orderId;
    try{
        orderId = await getNextSequenceValue('purchaseOrder', res);
    }catch(err){
        return res.json({message : 'Cannot create purchase order', status: 400, type: 'Failure'})
    }
    if(!items || !items.length) {
        return res.json({message: 'Cannot place the empty Order', status: 400, type: 'Failure'})
    }
    User.findOne({email: user.email}) 
    .then(
        doc => {
            if(doc) {
                if(!doc) {
                    return res.json({message: 'Cannot find user details', status:404, type: 'Failure'})
                }
                User.findById(sellerId)
                .then(
                  seller => {
                      if(!seller) {
                        return res.json({message: 'Cannot find seller details', status:404, type: 'Failure'})
                      }
                     let checkCost = items.reduce((a,b) => {
                        return parseFloat(a) + parseFloat(b.total)
                      }, 0)
                      if(checkCost !== parseFloat(totalCost)) {
                          return res.json({message: 'Order details are Mis match', status: 400, type: 'Failure'})
                      }
                    let sellerid = seller._id;
                    let buyerId = doc._id;
                    let newOrder = new Order({
                          seller : sellerid,
                          buyer : buyerId,
                          orderId: orderId,
                          items : items,
                          totalCost : totalCost,
                          status:'Pending'
                      });
                    let  events = [{
                        from:sellerId,
                        date: Date.now,
                        action: 'Order Created By seller',
                        blockchain:false
                      }]
                      let newTimeline = new Timeline({
                        orderId: orderId
                      })
                      newTimeline.save()
                      .then(
                          timeline => {
                            newOrder.timeline = timeline._id;
                            newOrder.save()
                            .then(
                                order => {
                                  return res.json({message: 'Order Details Saved.', status: 200, type: 'Success'})
                                },
                                err => {
                                    return res.json({message: 'Cannot save order details', status: 500, type:'Failure'})
                                }
                            )
                          },
                          err => {
                            return res.json({message: 'Cannot save order details', status: 500, type:'Failure'})
                        }
                      )
                  },
                  err => {
                    return res.json({message: 'Cannot find seller details', status:404, type: 'Failure'})
                  }
                )
            }
        },
        err => { 
            return res.json({message: 'Cannot find user details', status:404, type: 'Failure'})
        }
    )
}

const create721  = function(order, req, res, next) {
    const id = order.orderId;
    const name ='PurchaseOrder';
    const { user } = req;
    const data ={
        seller : order.seller,
        buyer : order.buyer,
        items : order.items,
        totalValue : order.totalCost,
        createdDate : order.createdDate
    }
    const web3 = new Web3(new Web3.providers.HttpProvider("https://adhinet.com"));
    const properc721Contract = web3.adh.contract(contractAbi);
    const smartContract = properc721Contract.at(contractAddress);  
    const rawTransaction =  
            {  
                  "nonce":checkhex(web3.toHex(web3.adh.getTransactionCount(order.buyer.walletAddress))),
                  "gasPrice":1000000000,
                  "gasLimit":3000000,
                  "to":smartContract.address,
                  "value":"0x00",
                  "data":smartContract.mintUniqueTokenTo.getData(order.seller.walletAddress, id , name, JSON.stringify(data), { from : order.buyer.walletAddress }),
                  "chainId":1
            }
                let encodeHash = encrypt.signTx(order.buyer.seed, user.phrase, rawTransaction )
                web3.adh.sendRawTransaction('0x' + encodeHash.toString('hex'), function(err, txnno) {
                    if (!err)
                            {                           
                               req.details = {
                                   host :'https://adhinet.com',
                                   contractAddress : contractAddress,
                                   txhash : 'http://adhichain.info/tx/' + txnno
                               }
                               next()
                            }
                            else {
                                return res.json({message: 'purchase order created', status:200, type: 'Failure'})
                            }
                      });
}

const sellerActionApprove = function(  req, res, orderDetails) {
    let { orderId, remark } = req.body;
    const { user } = req;
    const sellerAddress = orderDetails.seller.walletAddress;
    const buyerAddress = orderDetails.buyer.walletAddress;
    const web3 = new Web3(new Web3.providers.HttpProvider("https://adhinet.com"));
    const properc721Contract = web3.adh.contract(contractAbi);
    const smartContract = properc721Contract.at(contractAddress); 
    const token = smartContract.exists(orderId)
    if(token){
        const privKey = new Buffer(privateKey, 'hex');
        const rawTransaction =  
        {  
              "nonce":checkhex(web3.toHex(web3.adh.getTransactionCount(sellerAddress))),
              "gasPrice":1000000000,
              "gasLimit":3000000,
              "to":smartContract.address,
              "value":"0x00",
              "data":smartContract.transferDoc.getData(sellerAddress, buyerAddress, orderId , "",  remark,  {from : sellerAddress}),
              "chainId":1
        }
        console.log("nonce",web3.adh.getTransactionCount(sellerAddress))
        let encodeHash = encrypt.signTx(orderDetails.seller.seed, user.phrase, rawTransaction )
        web3.adh.sendRawTransaction('0x' + encodeHash.toString('hex'), function(err, txnno) {
            if (!err)
                    {                           
                       req.details= {
                           host :'https://adhinet.com',
                           contractAddress : contractAddress,
                           txhash : 'http://adhichain.info/tx/' + txnno
                       }
                       updateSellerAccept(req, res)
                    }
                    else {
                        return res.json({message: 'cannot transfer purchase order', status:400, type: 'Failure'})
                    }
        });
    }else{
        return res.json({message: 'Cannot find the order details', status:404, type:'Failure'})
    }
}

const sellerActionReject = function( req, res, orderDetails) {
    let { orderId, remark } = req.body;
    const { user} = req;
    const sellerAddress = orderDetails.seller.walletAddress;
    const buyerAddress = orderDetails.buyer.walletAddress;
    const web3 = new Web3(new Web3.providers.HttpProvider("https://adhinet.com"));
    const properc721Contract = web3.adh.contract(contractAbi);
    const smartContract = properc721Contract.at(contractAddress);    
    const token = smartContract.exists(orderId)
    if(token){
        const rawTransaction =  
        {  
              "nonce":checkhex(web3.toHex(web3.adh.getTransactionCount(sellerAddress))),
              "gasPrice":1000000000,
              "gasLimit":3000000,
              "to":smartContract.address,
              "value":"0x00",
              "data":smartContract.transferDoc.getData(sellerAddress, buyerAddress, orderId , "",  remark,  {from : sellerAddress}),
              "chainId":1
        }
        let encodeHash = encrypt.signTx(orderDetails.seller.seed, user.phrase, rawTransaction )
        web3.adh.sendRawTransaction('0x' + encodeHash.toString('hex'), function(err, txnno) {
            if (!err)
                    {                           
                       req.details= {
                           host :'https://adhinet.com',
                           contractAddress : contractAddress,
                           txhash : 'http://adhichain.info/tx/' + txnno
                       }
                       updateSellerReject(req, res)
                    }
                    else {
                        return res.json({message: 'purchase order created', status:200, type: 'Failure'})
                    }
        });
    }else{
        return res.json({message: 'Cannot find the order details', status:404, type:'Failure'})
    }
}

const sellerAction =  function(req, res, next) {
    let { user }  = req;
    let { orderId, action } = req.body;
    let { id} = req.params;
    User.findOne({email: user.email}) 
    .then(
        doc => {
            if(doc) {
                if(!doc) {
                    return res.json({message: 'Cannot find user details', status:404, type: 'Failure'})
                }
                let projectFields = [...UserPopulate, 'seed'];
                Order.findById(id)
                .populate('buyer', projectFields)
                .populate('seller', projectFields)
                .populate('timeline')
                .then(
                    orderDetails => {
                        if(!orderDetails){
                            return res.json({message: 'Cannot find the order details', status:404, type:'Failure'})
                        }
                        if(action === 'Approve'){
                            sellerActionApprove(req, res, orderDetails)
                        }
                        else if (action === 'Reject'){
                            sellerActionReject( req, res, orderDetails)
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
};



const viewToken = function(req, res) {
    const { id } = req.params;
    const web3 = new Web3(new Web3.providers.HttpProvider("https://adhinet.com"));
    const properc721Contract = web3.adh.contract(contractAbi);
    const smartContract = properc721Contract.at(contractAddress);   
    const token = smartContract.exists(id)
    if(token) {
        const propDetails =  smartContract.propertyDetails(id);
        const upgrades = smartContract.getUpgradeCount(id)/1;
        console.log("upgra", upgrades/ 1)
       return res.json({data:JSON.parse(propDetails), status: 200, type: 'Success'})
    }else{
        return res.json({data: {}, status: 200, type:'Success'})
    }
}

const viewChanges = function(req, res) {
    const { id } = req.params;
    const web3 = new Web3(new Web3.providers.HttpProvider("https://adhinet.com"));
    const properc721Contract = web3.adh.contract(contractAbi);
    const smartContract = properc721Contract.at(contractAddress);  
    const token = smartContract.exists(id)
    if(token) {
        const upgrades = smartContract.getUpgradeCount(id)/1;
        let changes = []
        for(let i=0; i< upgrades; i++) {
            const items = smartContract.getUpgradeAtIndex(id, i)
            if(Array.isArray(items) && items.length) {
                let object ={
                    message : items[0],
                    time : items[1] / 1,
                    owner : items[2]
                }
                changes.push(object)
            }
        }
       return res.json({data:changes, status: 200, type: 'Success'})
    }else{
        return res.json({data: {}, status: 200, type:'Success'})
    }
}


const setDetails = function(req, res) {
    const web3 = new Web3(new Web3.providers.HttpProvider("https://adhinet.com"));
    const properc721Contract = web3.adh.contract(contractAbi);
    const smartContract = properc721Contract.at(contractAddress); 
    const Tx = require('ethereumjs-tx');
    const privKey = new Buffer(privateKey, 'hex');
    const  { user } = req;
    var rawTransaction =  
    {  
          "nonce":checkhex( web3.toHex(web3.adh.getTransactionCount(adminAddress))),
          "gasPrice":1000000000,
          "gasLimit":3000000,
          "to":smartContract.address,
          "value":"0x00",
          "data":smartContract.setDetails.getData(id , details, 0, 0, 0, {from:adminAddress}),
          "chainId":1
    }
    let encodeHash = encrypt.signTx(orderDetails.buyer.seed, user.phrase, rawTransaction )
    web3.adh.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, txnno) {
     if(!err) {
         req.details = {
             host: 'https://adhinet.com',
             contractAddress : '0x1ece3acb4d457f1f3a0af970d3fb4d7833b66460',
             txhash : 'http://adhichain.info/tx/'+txno
         }
         return  res.json({message : 'details set', status:200, type:'Success'})
     }else{
         return  res.json({message : 'cannot set details', status: 400, type: 'Failure' })
     }
    })
}



const myOrders = function (req, res) {
    let { user } = req;
    User.findOne({email: user.email})
    .then(
        loggedUser => {
            if(!loggedUser) {
                return res.json({message: 'Cannot find user details', status: 404, type: 'Failure'})
            }
            let query;
            if(user.accountType  === 'Seller') {
                query =  {$and : [ { seller : loggedUser._id},{status : { $nin: ["Pending","Return"] } }]}
            }else{
                query = { buyer : loggedUser._id}
            }
            Order.find(query)
            .populate('buyer', 'username')
            .populate('seller', 'username')
            .then(
                orders => {
                    return res.json({data: orders, status: 200, type: 'Success'})
                },
                err => {
                    return res.json({ message : 'Cannot get the orders list', status: 404, type: 'Failure' })
                }
            )
        },
        err => {
            return res.json({message: 'Cannot find user details', status: 404, type: 'Failure'})
        }
    )
}

const getOrderDetails = function(req, res) {
    let  { user } = req;
    let { orderId }  = req.params;
    Order.findById(orderId)
    .populate('buyer', UserPopulate)
    .populate('seller', UserPopulate)
    .populate('timeline')
    .then(
        order => {
            if(!order) {
                return res.json({ message: 'Order Not Found', status: 404, type: 'Failure'})
            }
            return res.json({ data: order, status: 200, type:'Success'})
        },
        err => {
            return res.json({message: 'Cannot find the Order details', status: 404, type: 'Failure'})
        }
    )  
}

const deleteOrder = function( req, res) {
    let { user } = req;
    let { orderId } = req.params;
    User.findOne({email: user.email})
    .then(
        loggedUser => {
            if(!loggedUser) {
                return res.json({ message: 'User not found. Canot delete the order', status: 404, type: 'Failure'})
            }
            Order.findOneAndRemove({_id:orderId,  buyer: loggedUser._id})
            .then(
                deleteItem => {
                    return res.json({ message: 'Order Deleted Successfully.', status: 200, type:'Success' })
                },
                err => {
                    return res.json({ message: 'Cannot delete the order', status: 400, type:'Failure'})
                }
            )
        },
        err => {
            return res.json({message: 'Cannot delete the order', status: 500, type:'Failure'})
        }
    )
}

const updateOrder = function(req, res) {
    let { user }  = req;
    let { orderId } = req.params;
    const {items, totalCost, sellerId } = req.body;
    if(!items || !items.length) {
        return res.json({message: 'Cannot place the empty Order', status: 400, type: 'Failure'})
    }
    User.findOne({email: user.email}) 
    .then(
        doc => {
            if(doc) {
                if(!doc) {
                    return res.json({message: 'Cannot find user details', status:404, type: 'Failure'})
                }
                User.findById(sellerId)
                .then(
                  seller => {
                      if(!seller) {
                        return res.json({message: 'Cannot find seller details', status:404, type: 'Failure'})
                      }
                     let checkCost = items.reduce((a,b) => {
                        return parseFloat(a) + parseFloat(b.total)
                      }, 0)
                      if(checkCost !== parseFloat(totalCost)) {
                          return res.json({message: 'Order details are Mis match', status: 400, type: 'Failure'})
                      }
                    let sellerid = seller._id;
                    let newOrder = {
                          seller : sellerid,
                          items : items,
                          totalCost : totalCost
                      };
                      Order.findByIdAndUpdate(orderId, newOrder)
                      .then(
                          orderupdate => {
                            return res.json({message: 'Order Details updated Successfully.', status: 200, type:'Success'})
                          },
                          err => {
                            return res.json({ message: 'Cannot update Order Details', status: 404, type:'Failure' })
                          }
                      )
                  },
                  err => {
                    return res.json({message: 'Cannot find seller details', status:404, type: 'Failure'})
                  }
                )
            }
        },
        err => { 
            return res.json({message: 'Cannot find user details', status:404, type: 'Failure'})
        }
    )
}

const sentToBlockchain = function(req, res, next) {
    let { user }  = req;
    let { orderId } = req.params;
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
                Order.findById(orderId)
                .populate('buyer', projectFields)
                .populate('seller', projectFields)
                .populate('timeline')
                .then(
                    orderDetails => {
                        if(!orderDetails){
                            return res.json({message: 'Cannot find the order details', status:404, type:'Failure'})
                        }
                        create721(orderDetails, req, res, next)
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

const resentToBlockchain = function(req, res, next) {
    let { user }  = req;
    let { orderId } = req.params;
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
                let projectfields = [...UserPopulate, 'seed']
                Order.findById(orderId)
                .populate('buyer', projectfields)
                .populate('seller', projectfields)
                .populate('timeline')
                .then(
                    orderDetails => {
                        if(!orderDetails){
                            return res.json({message: 'Cannot find the order details', status:404, type:'Failure'})
                        }
                        setOrdersDetails(orderDetails, req, res, next)
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

const setOrdersDetails = function(order, req, res, next) {
    const data ={
        seller : order.seller,
        buyer : order.buyer,
        items : order.items,
        totalValue : order.totalCost,
        createdDate : order.createdDate
    }
    const {user} = req;
    let {  remark } = req.body;
    const sellerAddress = order.seller.walletAddress;
    const buyerAddress = order.buyer.walletAddress;
    const web3 = new Web3(new Web3.providers.HttpProvider("https://adhinet.com"));
    const properc721Contract = web3.adh.contract(contractAbi);
    const smartContract = properc721Contract.at(contractAddress); 
    var rawTransaction =  
    {  
          "nonce":checkhex(web3.toHex(web3.adh.getTransactionCount(buyerAddress))),
          "gasPrice":1000000000,
          "gasLimit":3000000,
          "to":smartContract.address,
          "value":"0x00",
          "data":smartContract.transferDoc.getData(buyerAddress, sellerAddress, order.orderId , JSON.stringify(data), remark, {from : buyerAddress}),
          "chainId":1
    }
    let encodeHash = encrypt.signTx(order.buyer.seed, user.phrase, rawTransaction )
    web3.adh.sendRawTransaction('0x' + encodeHash.toString('hex'), function(err, txnno) {
     if(!err) {
        req.details= {
            host :'https://adhinet.com',
            contractAddress : contractAddress,
            txhash : 'http://adhichain.info/tx/' + txnno
        }
        next()
     }else{
         return  res.json({message : 'cannot set details', status: 400, type: 'Failure' })
     }
    })
}

const deployInAdhi = function(req, res, next, doc, orderDetails ) {
    try{
        const httpProv = new adhi.providers.HttpProvider(doc.blockchainHost);
        const blockchainInstance = new adhi(httpProv);
        const  smartcontrat = blockchainInstance.adh.contract(ABI).at(doc.contractAddress)
        const key = require('crypto').createHash('md5').update(orderDetails.orderId.trim()).digest("hex")
        console.log("key", key)
        // smartcontrat.enterStructData(orderDetails.orderId, doc.walletAddress, 'PO', JSON.stringify(orderDetails))  
        const rawTransaction = {  
            "nonce": checkhex(blockchainInstance.toHex(blockchainInstance.adh.getTransactionCount(adminAddress))),
            "gasPrice": 1000000000, 
            "gasLimit": 3000000,
            "to": doc.contractAddress,
            "value": '0x00',
            "chainId":1,
            "data" :smartcontrat.enterStructData.getData(key, doc.walletAddress, 'PO', JSON.stringify(orderDetails),{from : adminAddress})
        }
        const secret = new Buffer(privateKey, 'hex');
        const tx = new Tx(rawTransaction);
        tx.sign(secret);
        const serializedTx = tx.serialize();
        let sendString = serializedTx.toString('hex');
        blockchainInstance.adh.sendRawTransaction(`0x${sendString}`,
            function(err, result) {
                if(err) {
                    return res.json({message: 'Cannot add order details in blockchain', status:400, type:'Failure'})
                }
                req.details = {
                    txhash : doc.blockchainExplore + result,
                    host: doc.blockchainHost,
                    contractAddress: doc.contractAddress
                }
                next()
            })
    }catch(e) {
        return res.json({message: 'Cannot put the data in blockchain', status: 400, type: "Failure"})
    }
}

const deployInOrderChain =function(req, res, next, doc, orderDetails ) {
    try{
        const httpProv = new web3.providers.HttpProvider(doc.blockchainHost);
        const blockchainInstance = new web3(httpProv);
        const  smartcontrat = blockchainInstance.eth.contract(ABI).at(doc.contractAddress)
        const key = require('crypto').createHash('md5').update(orderDetails.orderId.trim()).digest("hex")
        console.log("key", key)
        // smartcontrat.enterStructData(orderDetails.orderId, doc.walletAddress, 'PO', JSON.stringify(orderDetails))  
        const rawTransaction = {  
            "nonce": checkhex(blockchainInstance.toHex(blockchainInstance.eth.getTransactionCount(adminAddress))),
            "gasPrice": 10000000000, 
            "gasLimit": 3000000,
            "to": doc.contractAddress,
            "value": '0x00',
            "data" :smartcontrat.enterStructData.getData(key, doc.walletAddress, 'PO', JSON.stringify(orderDetails),{from : adminAddress})
        }
        console.log("raw transaction", rawTransaction)
        const secret = new Buffer(privateKey, 'hex');
        const tx = new Tx(rawTransaction);
        tx.sign(secret);
        const serializedTx = tx.serialize();
        let sendString = serializedTx.toString('hex');
        blockchainInstance.eth.sendRawTransaction(`0x${sendString}`,
            function(err, result) {
                if(err) {
                    return res.json({message: 'Cannot add order details in blockchain', status:400, type:'Failure'})
                }
                req.details = {
                   txhash : doc.blockchainExplore + result,
                   host: doc.blockchainHost,
                   contractAddress: doc.contractAddress
                }

                next()
            })
    }catch(e) {
        return res.json({message: 'Cannot put the data in blockchain', status: 400, type: "Failure"})
    }
}

const updateOrderDetails = function(req, res) {
    let { orderId } = req.params;
    let {txhash, host, contractAddress }  = req.details;
    Order.findByIdAndUpdate(orderId, { status:'Active' })
    .then(
        orderupdate => {
          Timeline.findOneAndUpdate({orderId: orderupdate.orderId},{sentToseller: true, buyerblockchain : txhash, buyerhost : host, buyerContract : contractAddress })
          .then(
              timeline =>{
                return res.json({message: 'Order Details updated Successfully.', status: 200, type:'Success'})
              },
              err => {
                return res.json({ message: 'Cannot update Order Details', status: 404, type:'Failure' })
              }
          )
        },
        err => {
          return res.json({ message: 'Cannot update Order Details', status: 404, type:'Failure' })
        }
    )
}

const updateSellerAccept = function(req, res) {
    let { id } = req.params;
    let {txhash, host, contractAddress }  = req.details;
    Order.findByIdAndUpdate(id, { status:'Completed' })
    .then(
        orderupdate => {
          Timeline.findOneAndUpdate({orderId: orderupdate.orderId},{sellerConfirm: true, sellerblockchain : txhash, sellerContract : contractAddress, sellerhost : host })
          .then(
              timeline =>{
                return res.json({message: 'Order Details updated Successfully.', status: 200, type:'Success'})
              },
              err => {
                return res.json({ message: 'Cannot update Order Details', status: 404, type:'Failure' })
              }
          )
        },
        err => {
          return res.json({ message: 'Cannot update Order Details', status: 404, type:'Failure' })
        }
    )
}

const updateSellerReject = function(req, res) {
    let { id } = req.params;
    let {txhash, host, contractAddress }  = req.details;
    Order.findByIdAndUpdate(id, { status:'Return' })
    .then(
        orderupdate => {
          Timeline.findOneAndUpdate({orderId: orderupdate.orderId},{sellerConfirm: true, sellerblockchain : txhash, sellerContract : contractAddress, sellerhost : host })
          .then(
              timeline =>{
                return res.json({message: 'Order Details updated Successfully.', status: 200, type:'Success'})
              },
              err => {
                return res.json({ message: 'Cannot update Order Details', status: 404, type:'Failure' })
              }
          )
        },
        err => {
          return res.json({ message: 'Cannot update Order Details', status: 404, type:'Failure' })
        }
    )
}



const verifySeller = function(req, res, next) {
    let { user } = req;
    if(user.accountType !== 'Seller') {
        return res.status(403).send({ auth: false, message: "Access Restricted" });    
    }
    next()
}

const verifybuyer = function(req, res, next) {
    let { user } = req;
    if(user.accountType !== 'Buyer') {
        return res.status(403).send({ auth: false, message: "Access Restricted" });    
    }
    next()
}

const getDatafromBlochain = function(req, res) {
    let { user } = req;
    let {host}  = req.body;
    if(host === AdhiUrl) {
        formAdhi(req, res)
    }else{
        fromOtherChain(req, res)
    }
}

const formAdhi  = function(req, res) {
    let {host, contract, orderId} = req.body;
    try{
        const Web3 = require('web3-adhi')
        const web3 = new Web3(new Web3.providers.HttpProvider(host)); 
        const smartContract = web3.adh.contract(ABI).at(contract);
        const doc_no = orderId.trim();
        const key = require('crypto').createHash('md5').update(doc_no).digest("hex") 
        const dataHash = smartContract.verifyData(key);
        if(!dataHash) {
            return res.json({message: 'Data not found in blockchain', status: 404, type: "Failure"})
        }else{
            return res.json({data: dataHash, status: 200, type:'Success'})
        }
    }catch(e) {
        return res.json({message: 'Cannot get data from blockchain', status: 400, type: "Failure"})
    }
}

const fromOtherChain = function(req, res) {
    let {host, contract, orderId} = req.body;
    try{
        const Web3 = require('web3')
        const web3 = new Web3(new Web3.providers.HttpProvider(host)); 
        const smartContract = web3.eth.contract(ABI).at(contract);
        const doc_no = orderId.trim();
        const key = require('crypto').createHash('md5').update(doc_no).digest("hex") 
        const dataHash = smartContract.verifyData(key);
        if(!dataHash) {
            return res.json({message: 'Data not found in blockchain', status: 404, type: "Failure"})
        }else{
            return res.json({data: dataHash, status: 200, type:'Success'})
        }
    }catch(e) {
        return res.json({message: 'Cannot get data from blockchain', status: 400, type: "Failure"})
    }
}

const getCompletedOrder = function(req, res) {
    let { user } = req;
    User.findOne({email: user.email})
    .then(loggedUser => {
        if(!loggedUser) {
            return res.json({message: 'Cannot find user details', status: 404, type: 'Failure'})
        }
        let query;
        if(user.accountType  === 'Seller') {
            query =  {$and : [ { seller : loggedUser._id},{status : "Completed" }]}
        }else{
            query = { buyer : loggedUser._id, status : "Completed"}
        }
        Order.find(query)
        .populate('buyer', UserPopulate)
        .populate('seller', UserPopulate)
        .then(
            orders => {
                return res.json({data: orders, status: 200, type: 'Success'})
            },
            err => {
                return res.json({ message : 'Cannot get the orders list', status: 404, type: 'Failure' })
            }
        )
    },
    err => {
        return res.json({message: 'Cannot find user details', status: 404, type: 'Failure'})
    })
}

const getBankerList = function(req, res) {
    let { user } = req 
    User.find({ "accountType" : "Banker"})
    .then(
        users => {
            return res.json({data: users, status: 200, type: 'Success'})
        },
        err => {
            return res.json({message: 'Cannot find banker list', status: 404, type: 'Failure'})
        }
    )
}

module.exports = function(router) {
    router.get('/sellerlist',
        verify,
        sellerDetails
    );
    router.post('/placeOrder',
        verify,
        verifybuyer,
        placeOrder
    );
    router.get('/myOrder',
        verify,
        myOrders
    );
    router.get('/order/:orderId',
        verify,
        getOrderDetails
    );
    router.post('/editOrder/:orderId',
        verify,
        verifybuyer,
        updateOrder
    );
    router.post('/deleteOrder/:orderId',
        verify,
        verifybuyer,
        deleteOrder
    );
    router.post('/senttoseller/:orderId',
        verify,
        verifybuyer,
        sentToBlockchain,
        updateOrderDetails
    );
    // router.post('/sellerconfirm/:orderId',
    //     verify,
    //     verifySeller,
    //     sentToBlockchain,
    //     sellerconfirm
    // ),
    router.post('/datafromblochain',
        verify,
        getDatafromBlochain
    ),
    router.get('/getCompletedOrder',
        verify,
        getCompletedOrder
    ),
    router.get('/bankerslist',
        verify,
        getBankerList
    ),
    router.get('/blockchaindata/:id',
        verify,
        viewToken
    ),
    router.get('/orderhistory/:id',
        verify,
        viewChanges
    )
    router.post('/setDetails',
        setDetails
    ),
    router.post('/sellerAction/:id',
        verify,
        sellerAction
    ),
    router.post('/resentToSeller/:orderId',
        verify,
        resentToBlockchain,
        updateOrderDetails
    )
}