// A simple Vending Machine that tracks quantity, price, and amount deposited.
class VendingMachine {
  constructor(quantity, price) {
    this.quantity = quantity;
    this.price = price;
    this.amountDeposited = 0;
    this.change = 0;
  }

  nickel() {
    this.amountDeposited += 5;
    return this;
  }

  dime() {
    this.amountDeposited += 10;
    return this;
  }

  quarter() {
    this.amountDeposited += 25;
    return this;
  }

  amountRemaining() {
    let remaining = this.price - this.amountDeposited;
    return remaining > 0 ? remaining : 0;
  }

  isSoldOut() {
    return this.quantity === 0;
  }

  isSufficientAmount() {
    return this.amountDeposited >= this.price;
  }

  purchase() {
    let change = this.amountDeposited - this.price;
    this.amountDeposited = 0;
    this.quantity -= 1;
    return change;
  }

  toString() {
    return 'HackerCola: quantity=' + this.quantity + ', price=' + this.price +
      'amountDeposited=' + this.amountDeposited;
  }
}

module.exports = VendingMachine;
