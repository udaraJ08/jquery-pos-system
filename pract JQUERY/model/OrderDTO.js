function Order(ordCustomerID, ordItemCode, ordItemName, ordQty, ordUnitPrice) {
  let __ordCustomerID = ordCustomerID
  let __ordItemCode = ordItemCode
  let __ordItemName = ordItemName
  let __ordQty = ordQty
  let __ordUnitPrice = ordUnitPrice

  this.getOrdCustomerID = () => __ordCustomerID
  this.getordItemCode = () => __ordItemCode
  this.getOrdItemName = () => __ordItemName
  this.getOrdQty = () => __ordQty
  this.getOrdUnitPrice = () => __ordUnitPrice

  this.setOrdCustomerID = (custID) => {
    __ordCustomerID = custID
  }
  this.setOrderItemCode = (ordItemCode) => {
    __ordItemCode = ordItemCode
  }
  this.setOrderItemName = (ordItemName) => {
    __ordItemName = ordItemName
  }
  this.setOrderQty = (ordQty) => {
    __ordQty = ordQty
  }
  this.setUnitPrice = (ordUnitPrice) => {
    __ordUnitPrice = ordUnitPrice
  }
}
