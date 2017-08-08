var express = require('express');
var router = express.Router();

var VendingMachine = require('../models/vending-machine');
var vendingMachine = new VendingMachine(100, 75);
var hackerColaMessage, changeMessage, purchaseDisabledProp;

function doRender(res) {
  res.render('index', { title: 'Hacker Cola',
                        vendingMachine: vendingMachine,
                        hackerColaMessage: hackerColaMessage,
                        changeMessage: changeMessage,
                        readyToPurchase: vendingMachine.isSufficientAmount()
                      }
  );
}

/* GET home page. */
router.get('/', function(req, res, next) {
  doRender(res);
});

router.get('/nickel', function(req, res, next) {
  vendingMachine.nickel();
  res.redirect('/');
});

router.get('/dime', function(req, res, next) {
  vendingMachine.dime();
  res.redirect('/');
});

router.get('/quarter', function(req, res, next) {
  vendingMachine.quarter();
  res.redirect('/');
});

router.get('/purchase', function(req, res, next) {
  if (!vendingMachine.isSoldOut() && vendingMachine.isSufficientAmount()) {
    let change = vendingMachine.purchase();
    hackerColaMessage = 'Enjoy your Hacker Cola!';
    changeMessage = 'Your change is ' + change + ' cents.';
  }
  res.redirect('/');
});

module.exports = router;
