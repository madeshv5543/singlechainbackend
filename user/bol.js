const config = require('config');
const verify = require('../middleware/verify');
const User = require('../models/user');
const seqNo = require('../models/counter');
const Order = require('../models/purchaseOrder');
const Bol = require('../models/bol');
const Timeline = require('../models/orderTimeline');
const UserPopulate = ['accountType', 'address', 'city','walletAddress', 'companyName', 'country', 'created', 'email', 'firstName', 'lastName', 'phoneNumber','orgName','pincode', 'username'];
const encrypt = require('../utils/crypto');
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

 const validateBolform = ( req, res, next) => {
    if(!req.body.order){
      return  res.json({ message: 'Please select the order for loc', status: 400, type: 'Failure'})
    }
    if(!req.body.shipmentDate) {
       return res.json( { message: 'Select the shipment Date', status: 400, type: 'Failure'}) 
    }
    if(!req.body.shipmentType) {
       return res.json( { message: 'Select the Shipment Type', status: 400, type: 'Failure'})
    }
    if(!req.body.notes) {
       return res.json({ message: 'Enter the notes', status: 400, type: 'Failure'})
    }
    if(!req.body.receiver) {
       return res.json({ message: 'Receiver should not be empty', status: 400, type: 'Failure' })
    }
    if(!req.body.shipper) {
        return res.json( { message: 'Shipper should not be empty', status: 400, type: 'Failure'})
    }
    next()
}

 const createBol = async function(req, res) {
    let documents =[];
    for( file of req.files){
        let obj ={
            fileName: file.filename,
            actualName:file.originalname
        }
        documents.push(obj)
    }
    let { order, shipmentDate, shipmentType, notes, receiver, shipper } = req.body;
    let bolId;
    try{
        bolId = await getNextSequenceValue('bol', res);
    }catch(err){
        return res.json({message : 'Cannot create loc', status: 400, type: 'Failure'})
    }
    bolId = parseInt('30'+ bolId);
    newbol = new Bol({
        order: order,
        receiver,
        shipper,
        notes,
        shipmentDate,
        shipmentType,
        bolId,
        documents 
    });
    let newTimeline = new Timeline({
        orderId: bolId
    })
    newTimeline.save()
    .then(
        timeline => {
         newbol.timeline = timeline._id;
         newbol.save()
          .then(
              loc => {
                return res.json({message: 'BOL Details Saved.', status: 200, type: 'Success'})
              },
              err => {
                  return res.json({message: 'Cannot save BOL details', status: 500, type:'Failure'})
              }
          )
        },
        err => {
          return res.json({message: 'Cannot save BOL details', status: 500, type:'Failure'})
      }
    )
 }

 const getBolList = function(req, res) {
    let { email } = req.user;
    User.findOne({email})
    .then(
        userdetails => {
            if(!userdetails) {
              return  res.json({ message: 'Cannot find the userdetails ', status: 500, type: 'Failure' })
            }
            Bol.find({$or : [{ shipper: userdetails._id }, { receiver : userdetails._id }]})
            .populate('shipper', UserPopulate)
            .populate('receiver', UserPopulate)
            .then(
                bolList => {
                    return res.json({ data: bolList,  status: 200, type: 'Success'})
                },
                err => {
                    return res.json({message: 'Cannot get the BOL list', status: 500, type: 'Failure'})
                }
            )
        },
        err => {
            res.json({ message: 'Cannot find the user details', status: 500, type: 'Failure' })
        }
    )
 }

 const getBolDetails = function(req, res){
    let {id} = req.params;
    Bol.findById(id)
    .populate('shipper', UserPopulate)
    .populate('receiver', UserPopulate)
    .populate('order')
    .populate('timeline')   
    .then(
        bolDetails => {
            res.json({ data: bolDetails, status: 200, type : 'Success' })
        },
        err =>{
            res.json({ message: 'Cannot get the BOL details', status: 400, type: 'Failure'})
        }
    )
 }

 const editBolDetails = function(req, res) {
     let { id } = req.params;
     let  bolDetails = req.body;
     Bol.findByIdAndUpdate(id, bolDetails)
     .then(
         boldetails => {
            res.json({ message: 'Bol Details updated Successfully', status: 200, type: 'Success' })
         },
         err => {
             return res.json({ message: 'Cannot update Bol details', status: 400, type:"Failure" })
         }
     )
 }

 const deleteBol = function(req, res) {
     let { id } = req.params;
     Bol.findByIdAndDelete(id)
     .then(
         boldetails => {
            return res.json({ message: 'BOL Document deleted Successfully', status: 200, type:'success' })
         },
         err => {
             return res.json({ message: 'Cannot delete the BOl Document', status: 400, type: 'Failure'})
         }
     )
 }

 const BolSentToBuyer = function(req, res, next) {
    let { user }  = req;
    let { id } = req.params;
    User.findOne({email: user.email})
    .then(
        userdetails => {
            if(!userdetails) {
                return res.json({message: 'Cannot find user details', status:404, type: 'Failure'})
            }
            const projectFields = [...UserPopulate, 'seed'];
            Bol.findById(id)
            .populate('shipper', projectFields)
            .populate('receiver', projectFields)
            .populate('order')
            .then(
                bolDetails => {
                    create721(bolDetails, req, res, next)
                },
                err=>{
                    return res.json({ message: 'Cannot find BOL Document', status: 404, type: 'Failure' })
                }
            )
        },
        err =>{
            return res.json({ message: 'Cannot transfer the BOL Document' })
        }
    )

 }

 const create721  = function(order, req, res, next) {
    const id = order.bolId;
    const name ='BillOfLading';
    const { user } = req;
    let purchaseOrder ={
        purchaseOrderId: order.order.orderId,
        totalValue: order.order.totalCost,
        items: order.order.items
    }
    const data = {
        shipper : order.shipper,
        receiver : order.receiver,
        shipmentDate : order.shipmentDate,
        shipmentType: order.shipmentType,
        createdDate : order.createdDate,
        purchaseOrder
    }
    const rawTransaction =  
            {  
                  "nonce":checkhex(web3.toHex(web3.adh.getTransactionCount(order.shipper.walletAddress))),
                  "gasPrice":1000000000,
                  "gasLimit":3000000,
                  "to":smartContract.address,
                  "value":"0x00",
                  "data":smartContract.mintUniqueTokenTo.getData(order.receiver.walletAddress, id , name, JSON.stringify(data), { from : order.shipper.walletAddress }),
                  "chainId":1
            }
                let encodeHash = encrypt.signTx(order.shipper.seed, user.phrase, rawTransaction )
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
                                return res.json({message: 'Cannot Transfer the BOL Document', status:400, type: 'Failure'})
                            }
                      });
}

const updateSentToBuyer = function(req, res) {
    let { id } = req.params;
    let { host, contractAddress, txhash} = req.details;
    Bol.findByIdAndUpdate(id, { status:'Active'  })
    .then(
        locupdate => {
          Timeline.findOneAndUpdate({orderId: locupdate.bolId },{sentToBuyer: true, sellerblockchain : txhash, sellerhost : host, sellerContract : contractAddress })
          .then(
              timeline =>{
                return res.json({message: 'BOL Details updated Successfully.', status: 200, type:'Success'})
              },
              err => {
                return res.json({ message: 'Cannot update BOL Details', status: 404, type:'Failure' })
              }
          )
        },
        err => {
          return res.json({ message: 'Cannot update BOL Details', status: 404, type:'Failure' })
        }
    )
}

const setDetailsInSmartContract = function( req, res, next, details) {
    let { sender, receiver, id, seed, data, remark} = details
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
            txhash : 'http://adhichain.info/tx/' + txnno
        }
        next()
     }else{
         return  res.json({message : 'Cannot transfer BOL Document', status: 400, type: 'Failure' })
     }
    })
}

const resentTOBuyer = function (req, res, next) {
    let { user }  = req;
    let { id } = req.params;
    const {remark} = req.body;
    User.findOne({email: user.email})
    .then(
        userdetails => {
            if(!userdetails) {
                return res.json({message: 'Cannot find user details', status:404, type: 'Failure'})
            }
            const projectFields = [...UserPopulate, 'seed'];
            Bol.findById(id)
            .populate('shipper', projectFields)
            .populate('receiver', projectFields)
            .populate('order')
            .then(
                bolDetails => {
                    const {orderId, totalCost, items} = bolDetails.order;
                    const { shipper, receiver, shipmentType, shipmentDate, createdDate } = bolDetails;
                    let purchaseOrder ={
                        purchaseOrderId: orderId,
                        totalValue: totalCost,
                        items: items
                    }
                    const data = {
                        shipper,
                        receiver ,
                        shipmentDate ,
                        shipmentType,
                        createdDate ,
                        purchaseOrder
                    }
                    const details ={
                        sender: shipper.walletAddress,
                        receiver: receiver.walletAddress,
                        id: bolDetails.bolId,
                        seed: shipper.seed,
                        data: JSON.stringify(data),
                        remark
                    }
                    setDetailsInSmartContract(req, res, next, details)
                },
                err=>{
                    return res.json({ message: 'Cannot find BOL Document', status: 404, type: 'Failure' })
                }
            )
        },
        err =>{
            return res.json({ message: 'Cannot transfer the BOL Document' })
        }
    )
}


const ApproveBol = function(req, res, next) {
    let { user }  = req;
    let { id } = req.params;
    const {remark} = req.body;
    User.findOne({email: user.email})
    .then(
        userData => {
            if(!userData){
                return res.json({ message: 'Cannot find the user Details', status: 400, type:'Failure'})
            }
            const projectFields = [...UserPopulate, 'seed'];
            Bol.findById(id)
            .populate('shipper', projectFields)
            .populate('receiver', projectFields)
            .populate('order')
            .then(
                bolDetails => {
                    if(!bolDetails){
                        return res.json({ message: 'Cannot find the BOL document', status: 400, type: 'Failure'  })
                    }
                    const { shipper, receiver } = bolDetails;
                    const details ={
                        sender: receiver.walletAddress,
                        receiver: shipper.walletAddress,
                        id: bolDetails.bolId,
                        seed: receiver.seed,
                        data: null,
                        remark
                    }
                    setDetailsInSmartContract(req, res, next, details)
                },
                err =>{
                    return res.json({ message: 'Cannot find the BOL document', status: 400, type: 'Failure'  })
                }
            )
            setDetailsInSmartContract(req, res, next, details)
        }
    )
}

const updateBuyerAction = function(req, res) {
    let {action} = req.body;
    let queryBol;
    if(action === 'Approve')
    queryBol  = { status: 'Completed' }
    else{
        queryBol = { status: 'Return'}
    }
    let { id } = req.params;
    let { host, contractAddress, txhash} = req.details;
    let timelineQuery;
    if(action === 'Approve')
    timelineQuery  = {buyerConfirm: true, buyerblockchain : txhash, buyerhost : host, buyerContract : contractAddress }
    else{
        timelineQuery  = {buyerConfirm: false, buyerblockchain : txhash, buyerhost : host, buyerContract : contractAddress }
    }
    Bol.findByIdAndUpdate(id, queryBol)
    .then(
        locupdate => {
          Timeline.findOneAndUpdate({orderId: locupdate.bolId },timelineQuery)
          .then(
              timeline =>{
                return res.json({message: 'BOL Details updated Successfully.', status: 200, type:'Success'})
              },
              err => {
                return res.json({ message: 'Cannot update BOL Details', status: 404, type:'Failure' })
              }
          )
        },
        err => {
          return res.json({ message: 'Cannot update BOL Details', status: 404, type:'Failure' })
        }
    )
}


 

 module.exports = function(router) {
     router.post('/createBol', 
        verify,
        upload.any(),
        validateBolform,
        createBol
     ),
     router.get('/bol',
        verify,
        getBolList
     )
     router.get('/bol/:id',
        verify,
        getBolDetails
     ),
     router.post('/editbol/:id',
        verify,
        validateBolform,
        editBolDetails 
    ),
    router.post('/deleteBol/:id',
        verify,
        deleteBol
    ),
    router.post('/bolSentToBuyer/:id',
        verify,
        BolSentToBuyer,
        updateSentToBuyer
    ),
    router.post('/bolResentToBuyer/:id',
        verify,
        resentTOBuyer,
        updateSentToBuyer
    ),
    router.post('/bolBuyerAction/:id',
        verify,
        ApproveBol,
        updateBuyerAction
    )
 }