var express = require('express');
var router = express.Router();
var SqlManager = require('../mysql.js');

SqlManager.connect('localhost', 'kllilizxc', 'zZ3232131', 'mine');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
  return;
});

router.post('/signin/:username/:password', function(req, res, next) {
  var username = req.params.username;
  var password = req.params.password;

  SqlManager.validateUser(username, password, function(result) {
    if(result.code)
      req.session.username = username;

    res.json(result);
    return;
  });
});

router.post('/signup', function(req, res, next) {
  var username = req.body.username
  var password = req.body.password
  var email = req.body.email
  var phone = req.body.phone
  var realName = req.body.realName
  var sex = req.body.sex
  var accountName = req.body.accountName
  var familyAddr = req.body.familyAddr

  SqlManager.addUser([ username, password, email, phone, realName, sex, '', null, accountName, familyAddr ], function(result) {
    if (result.code)
      req.session.username = username;

    res.json(result);
    return;
  });
});

router.post('/userInfo', function(req, res, next) {
  if(!req.session.username) {
    res.json({ code: 0, err: 'You need login first' });
    return;
  }

  SqlManager.updateUserInfo(req.session.username, req.body, function(result) {
    res.json(result);
    return;
  });
});

router.get('/userInfo', function(req, res, next) {
  var username = req.session.username;

  if(username) {
    SqlManager.getUserInfo(username, function(data) {
      res.json(data);
      return;
    });
  } else {
    res.json({ code: 0, err: 'You need login first' });
  }
  return;
});

router.post('/deal', function(req, res, next) {
  var dealSuccess = true; //TODO
  if(dealSuccess) {
    if(!req.session.stocksHold)
      req.session.stocksHold = []
    
    req.session.stocksHold.push(req.body);
    console.log(req.session.stocksHold)
    res.json({ code: 1 }) //TODO
    return;
    addStock(req, function(result) {
      res.json(result);
      return;
    })
  } else {
    res.json({ code: 1 }) //TODO
    return;
  }
})

router.get('/stocksHold', function(req, res, next) {
  var username = req.session.username;
  if(!username) {
    res.json({ code: 0, err: 'You need login first' })
    return;
  }

  console.log(req.session.stocksHold)
  res.json({ code: 1, result: req.session.stocksHold }) //TODO
  return;
  SqlManager.getStocksHold(req.params.username, function (data) {
    res.json(data);
    return;
  })
})

function addStock(req, callback) {
  var username = req.session.username;
  console.log(username)
  if(!username) {
    callback({ code: 0, err: 'You need login first' }); 
  }

  var body = req.body;
  var data = [username, body.stockId, body.count, body.price, body.type, body.action];

  SqlManager.addStockHold(data, function (result) {
    callback(result);
  })
}

router.post('/stocksHold', function(req, res, next) {
  addStock(req, function(result) {
    res.json(result);
    return;
  })
})

router.get('/stockInfo', function(req, res, next) {
  SqlManager.getStockInfo(function(data) {
    res.json(data);
    return;
  })
})

module.exports = router;
