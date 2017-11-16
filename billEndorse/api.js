var express = require('express');
var router = express.Router();

var config = require('./config.json');
process.users = config.mockupUsers;
process.loginUsers = [];


function validateUser(user) {
    var users = process.users;
    var validUser = null;
    users.forEach(function(usr) {
        if (usr.username == user.username && usr.passwd == user.passwd) {
            validUser = usr;
        }
    });
    return validUser;
}

router.post('/login', function(req, res, next) {
    console.log('login: begin.');
    var user = {
        username: req.body.username,
        passwd: req.body.passwd
    };
    console.log("user:", user);
    var validUser = validateUser(user);
    if (validUser != null) {
        process.loginUsers[validUser.username] = validUser;
        res.send({success: true, user: validUser});
    } else {
        res.send({success: false, msg:"login failed", msgCode:"Err_201"});
    }
});

router.post('/logout', function(req, res, next) {

    process.loginUsers[req.body.username] = null;
    res.send({success: true});
});

var FUNCTION = {
    PublishBill : 'pub',
    EndrRequest : 'endrRequst',
    EndrResponse : 'endrResponse',
    QueryMyBill : 'queryMyBill',
    QueryBillInfo : 'queryBillInfo',
    QueryMyUnBill : 'queryMyUnBill',
    QueryBillHistInfo : 'queryBillHistInfo',
    QueryAll : 'queryAll'
}



router.post('/publihBill', function(req, res, next) {

    var data = req.body["data"];
    var args = transform(data);
    process.bc.invoke(FUNCTION.PublishBill, args).then(function (result) {
        console.log(result);
        res.send({success: true, result:result.result})
    }, function (err) {
        console.log(err);
        res.send({success: false, msg:err, msgCode:"Err_202"});
    });
});

router.post('/endrRequest', function(req, res, next) {

    var data = req.body["data"];
    var args = transform(data);
    process.bc.invoke(FUNCTION.EndrRequest, args).then(function (result) {
        console.log(result);
        res.send({success: true, result:result.result})
    }, function (err) {
        console.log(err);
        res.send({success: false, msg:err, msgCode:"Err_202"});
    });
});

router.post('/endrResponse', function(req, res, next) {

    var data = req.body["data"];
    var args = transform(data);
    process.bc.invoke(FUNCTION.EndrResponse, args).then(function (result) {
        console.log(result);
        res.send({success: true, result:result.result})
    }, function (err) {
        console.log(err);
        res.send({success: false, msg:err, msgCode:"Err_202"});
    });
});

router.post('/queryMyBill', function(req, res, next) {

    var data = req.body["data"];
    var args = transform(data);
    process.bc.query(FUNCTION.QueryMyBill, args).then(function (result) {
        console.log(result);
        res.send({success: true, result:result})
    }, function (err) {
        console.log(err);
        res.send({success: false, msg:err, msgCode:"Err_202"});
    });
});

router.post('/queryMyUnBill', function(req, res, next) {

    var data = req.body["data"];
    var args = transform(data);
    process.bc.query(FUNCTION.QueryMyUnBill, args).then(function (result) {
        console.log(result);
        res.send({success: true, result:result})
    }, function (err) {
        console.log(err);
        res.send({success: false, msg:err, msgCode:"Err_202"});
    });
});

router.post('/queryBillInfo', function(req, res, next) {

    var data = req.body["data"];
    var args = transform(data);
    console.log(args);
    process.bc.query(FUNCTION.QueryBillInfo, args).then(function (result) {
        console.log(result);
        res.send({success: true, result:result})
    }, function (err) {
        console.log(err);
        res.send({success: false, msg:err, msgCode:"Err_202"});
    });
});

router.post('/queryBillHistInfo', function(req, res, next) {

    var data = req.body["data"];
    var args = transform(data);
    process.bc.query(FUNCTION.QueryBillHistInfo, args).then(function (result) {
        console.log(result);
        res.send({success: true, result:result})
    }, function (err) {
        console.log(err);
        res.send({success: false, msg:err, msgCode:"Err_202"});
    });
});

router.post('/queryAll', function(req, res, next) {

    var data = req.body["data"];
    var args = transform(data);
    process.bc.query(FUNCTION.QueryAll, args).then(function (result) {
        console.log(result);
        res.send({success: true, result:result})
    }, function (err) {
        console.log(err);
        res.send({success: false, msg:err, msgCode:"Err_202"});
    });
});

function transform(obj){
    var arr = [];
    for(var item in obj){
        arr.push(obj[item]);
    }
    return arr;
}

module.exports = router;
