function Item(itemID, itemName, QTY, untPrice) {
  const __itemID = itemID
  const __itemName = itemName
  const __QTY = QTY
  const __unitPrice = untPrice

  this.getItemID = () => __itemID
  this.getItemName = () => __itemName
  this.getQTY = () => __QTY
  this.getUnitPrice = () => __unitPrice

  this.setCustomerID = (itemID) => {
    __itemID = itemID
  }
  this.setName = (itemName) => {
    __itemName = itemName
  }
  this.setAge = (QTY) => {
    __QTY = QTY
  }
  this.setAddress = (untPrice) => {
    __unitPrice = untPrice
  }
}
