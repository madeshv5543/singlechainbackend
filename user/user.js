const config = require('config');
const verify = require('../middleware/verify');
const User = require('../models/user');
const seqNo = require('../models/counter');
const Transaction = require('../models/transaction');
const upload = require('../utils/utils');
const provider =   config.get('etheriumhost'); 
const web3 = require('../utils/web3.singleton')(`${provider}`);
const Campaign =  require('../models/campaign');
const walletUtils= require('../utils/wallet');
// const tokenOneAbi = config.get('indabi');
const Tx = require('ethereumjs-tx');
function decryptSeed (seed, password) {
    const encrypt = require('../utils/crypto');
    return encrypt.decrypt('aes256',password,seed)
}

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

// const icontractAddress = config.get('indcontractAddress');
// const inContract =  web3.eth.contract(tokenOneAbi).at(icontractAddress)

module.exports = function(router) {
    router.get('/user',
        verify,
        (req, res) => {
            const { user } = req;
            User.findOne({"email":user.email},{password: 0})
            .then(
                userDetails => {
                    if(!userDetails){
                        return res.json({ message: 'User Not found', status: 401, type: 'Failure' })
                    }
                    return res.json({data:userDetails, status:200, type:'Success' } )
                },
                err =>{
                    return res.json({ message: 'User details cannot find . please try again later', status: 500, type: 'Failure'})
                }
            )
        }
    );

    router.post('/edituser',
        verify,
        upload.any(),
        (req, res) =>{
            const { user } = req;
            const userUpdateDetails = req.body;
            if(userUpdateDetails.fieldname1) {
                userUpdateDetails.filename1 = req.files[0].filename
            }
            if(userUpdateDetails.fieldname2 && userUpdateDetails.fieldname1){
                userUpdateDetails.filename2 = req.files[1].filename;
            }
            if(userUpdateDetails.filename2 && !userUpdateDetails.fieldname1) {
                userUpdateDetails.filename2 = req.files[0].filename;
            }
            if('fieldname1' in req.body){
                delete userUpdateDetails.fieldname1
            }
            if('fieldname2' in req.body){
                delete userUpdateDetails.fieldname2
            }
            User.findOne({"email":user.email})  
            .then(
                userDetails => {
                    if(!userDetails){
                        return res.json({ message: 'User Not found', status: 401, type: 'Failure' })
                    }
                    User.findOneAndUpdate({"email":user.email}, userUpdateDetails)
                        .then( doc => {
                            return res.json({ message: "User details updated successfully.", status: 200, type:'Success' })
                        },
                        err => {
                            return res.json({ message: 'User details cannot update. please try again later', status: 500, type: 'Failure'})
                        })
                },
                err =>{
                    return res.json({ message: 'User details cannot find . please try again later', status: 500, type: 'Failure'})
                }
            )
        }
    )
    router.post('/createCounterPO',
        function(req, res) {
            let counter = new seqNo({
                title : 'purchaseOrder',
                sequence_value : 0
            })
            counter.save( function saveCallback(err, count){
                if(err) {
                    return res.json({message : 'Cannot create counter', status: 404, type : 'Failure'})
                }else{
                    res.json({message: 'Counter Created Successfully', status: 200, type: 'Success'})
                }
            })
        }
    ),
    router.post('/createCounterLoc',
        function(req, res) {
            let counter = new seqNo({
                title : 'bol',
                sequence_value : 0
            })
            counter.save( function saveCallback(err, count){
                if(err) {
                    return res.json({message : 'Cannot create counter', status: 404, type : 'Failure'})
                }else{
                    res.json({message: 'Counter Created Successfully', status: 200, type: 'Success'})
                }
            })
        }
    )
}