function Customer(id, name, age, address) {
  const __id = id
  const __name = name
  const __age = age
  const __address = address

  this.getCustomerID = () => __id
  this.getName = () => __name
  this.getAge = () => __age
  this.getAddress = () => __address

  this.setCustomerID = (id) => {
    __id = id
  }
  this.setName = (name) => {
    __name = name
  }
  this.setAge = (age) => {
    __age = age
  }
  this.setAddress = (address) => {
    __address = address
  }
}
