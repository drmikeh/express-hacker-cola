var express = require('express');
var router = express.Router();

var VendingMachine = require('../models/vending-machine');
var vendingMachine = new VendingMachine(100, 75);
var hackerColaMessage, changeMessage, purchaseDisabledProp;

function doRender(res) {
  res.render('index', { title: 'Hacker Cola',
                        vendingMachine: vendingMachine,
                        hackerColaMessage: hackerColaMessage,
                        changeMessage: changeMessage
                      }
  );
}

/* GET home page. */
router.get('/', function(req, res, next) {
  doRender(res);
});

function updateDisabled() {
  purchaseDisabledProp = vendingMachine.isSufficientAmount() ? '' : 'disabled';
}


router.get('/nickel', function(req, res, next) {
  vendingMachine.nickel();
  updateDisabled();
  doRender(res);
});

router.get('/dime', function(req, res, next) {
  vendingMachine.dime();
  updateDisabled();
  doRender(res);
});

router.get('/quarter', function(req, res, next) {
  vendingMachine.quarter();
  updateDisabled();
  doRender(res);
});

router.get('/purchase', function(req, res, next) {
  if (!vendingMachine.isSoldOut() && vendingMachine.isSufficientAmount()) {
    let change = vendingMachine.purchase();
    hackerColaMessage = 'Enjoy your Hacker Cola!';
    changeMessage = 'Your change is ' + change + ' cents.';
    updateDisabled();
  }
  doRender(res);
});

module.exports = router;
