let __orderIndex = undefined

$(document).ready(() => {
  orderDeleteUpdateDisable()
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  $('#todayDate').html(`${year}-${month}-${day}`)
  fetchFromOrderTable()
  populateCmbCustomerID()
})

$('#btnOrderSave').on('click', () => {
  orderSave()
})

$('#btnOrderUpdate').on('click', () => {
  orderSave()
})

$('#btnOrderDelete').on('click', () => {
  deleteOrder()
})

$('#inptCash').keyup(() => {
  setOrderBalance()
})

$('#btnOrderClearAll').on('click', () => {
  clearAllAudio()
  clearOrderTable()
  clearOrderField()
  setOrderPrices()
  orderArr.splice(0, orderArr.length)
})

const orderSave = () => {
  if (__orderIndex != undefined) {
    orderUpdater()
  } else orderArrPopulate()
  orderTableLoad()
  fetchFromOrderTable()
  clearOrderField()
  __orderIndex = undefined
}

const orderArrPopulate = () => {
  if (fieldValidator()) {
    saveBtnAudio()
    if (!checkExists(fetchOrderDataForPopulate().getordItemCode())) {
      orderArr.push(fetchOrderDataForPopulate())
      setOrderPrices()
    } else {
      orderTableLoad()
    }
  }
}

const deleteOrder = () => {
  fetchFromOrderTable()
  orderRemover()
  commonOrderUpdateDelete()
  clearOrderField()
}

const orderUpdater = () => {
  updateBtnAudio()
  fetchFromOrderTable()
  updateOrder()
  commonOrderUpdateDelete()
}

const commonOrderUpdateDelete = () => {
  setOrderPrices()
  orderDeleteUpdateDisable()
  orderSubmitEnable()
  orderTableLoad()
}

/////created functions/////

const populateCmbCustomerID = () => {
  customerArr.map((element) => {
    let row = `<option>${element.getOrdCustomerID()}</option>`
    $('#cmbOrderCustomerID').append(row)
  })
}

const fieldValidator = () => {
  if (
    $('input[name="orderCustomerID"]').val().length == 0 ||
    $('input[name="orderItemCode"]').val().length == 0 ||
    $('input[name="orderItemName"]').val().length == 0 ||
    $('input[name="orderItemQTY"]').val().length == 0 ||
    $('input[name="orderUnitPrice"]').val().length == 0
  )
    return false
  else if (
    $('input[name="orderCustomerID"]').val().length > 0 ||
    $('input[name="orderItemCode"]').val().length > 0 ||
    $('input[name="orderItemName"]').val().length > 0 ||
    $('input[name="orderItemQTY"]').val().length > 0 ||
    $('input[name="orderUnitPrice"]').val().length > 0
  ) {
    return true
  }
}

const setOrderBalance = () => {
  let cash = Number($('#inptCash').val())
  const subTotal = Number($('#orderSubTotal').html())
  $('#orderBalance').html(cash - subTotal)
}

const updateOrder = () => {
  if (fieldValidator()) orderArr[__orderIndex] = fetchOrderDataForPopulate()
}

const orderRemover = () => {
  deleteBtnAudio()
  orderArr.splice(__orderIndex, 1)
}

const checkExists = (itemID) => {
  if (orderArr.length == 0) {
    return false
  } else {
    for (let i = 0; i < orderArr.length; i++) {
      if (itemID === orderArr[i].getordItemCode()) {
        const curQTY = $('input[name="orderItemQTY"]').val()
        const orderQty = orderArr[i].getOrdQty()
        orderArr[i].setOrderQty(parseInt(orderQty) + Number(curQTY))
        setOrderPrices()
        return true
      }
    }
  }
  return false
}

const updateQty = () => {
  const curQTY = $('input[name="orderItemQTY"]').val()
  const curUnitPrice = $('input[name="orderUnitPrice"]').val()

  const newTot = Number(curQTY) * Number(curUnitPrice)
  const curTot = $('#orderTotal').html()
  $('#orderTotal').html(Number(curTot) + newTot)
}

const orderTableLoad = () => {
  clearOrderTable()
  orderArr.map((element) => {
    const row = `
   <tr>
   <td>${element.getOrdCustomerID()}</td>
   <td>${element.getordItemCode()}</td>
   <td>${element.getOrdItemName()}</td>
   <td>${element.getOrdQty()}</td>
   <td>${element.getOrdUnitPrice()}</td>
   </tr>`

    $('#tblOrder').append(row)
  })
}

const fetchOrderDataForPopulate = () => {
  const customerID = $('input[name="orderCustomerID"]').val()
  const itemCode = $('input[name="orderItemCode"]').val()
  const itemName = $('input[name="orderItemName"]').val()
  const itemQTY = $('input[name="orderItemQTY"]').val()
  const orderUnitPrice = $('input[name="orderUnitPrice"]').val()

  return (order = new Order(
    customerID,
    itemCode,
    itemName,
    itemQTY,
    orderUnitPrice
  ))
}

const fetchFromOrderTable = () => {
  $('#tblOrder>tr').on('click', function () {
    orderSubmitDisable()
    orderDeleteUpdateEnable()
    __orderIndex = $(this).index()
    let customerID = $(this).find('td:eq(0)').text()
    let itemCode = $(this).find('td:eq(1)').text()
    let itemName = $(this).find('td:eq(2)').text()
    let QTY = $(this).find('td:eq(3)').text()
    let unitPrice = $(this).find('td:eq(4)').text()

    $('input[name="orderCustomerID"]').val(customerID)
    $('input[name="orderItemCode"]').val(itemCode)
    $('input[name="orderItemName"]').val(itemName)
    $('input[name="orderItemQTY"]').val(QTY)
    $('input[name="orderUnitPrice"]').val(unitPrice)
  })
}

const setOrderPrices = () => {
  let totCalc = 0

  orderArr.map((element) => {
    totCalc += Number(element.getOrdQty()) * Number(element.getOrdUnitPrice())
  })
  $('#orderTotal').html(totCalc)
  $('#orderSubTotal').html(totCalc - discounter(totCalc))
  $('#orderDiscount').html(discounter(totCalc))
}

const discounter = (total) => {
  if (total >= 2000 && total < 5000) return (total / 100) * 10
  else if (total >= 5000) return (total / 100) * 20
  else return 0
}

const orderSubmitDisable = () => {
  $('#btnOrderSave').attr('disabled', true)
}

const orderSubmitEnable = () => {
  $('#btnOrderSave').attr('disabled', false)
}

const orderDeleteUpdateDisable = () => {
  $('#btnOrderDelete, #btnOrderUpdate').attr('disabled', true)
}

const orderDeleteUpdateEnable = () => {
  $('#btnOrderDelete, #btnOrderUpdate').attr('disabled', false)
}

const clearOrderTable = () => {
  $('#tblOrder').empty()
}

$('input[name="orderCustomerID"]').keydown((e) => {
  if (e.key == 'Enter') $('input[name="orderItemCode"]').focus()
})
$('input[name="orderItemCode"]').keydown((e) => {
  if (e.key == 'Enter') $('input[name="orderItemName"]').focus()
})
$('input[name="orderItemName"]').keydown((e) => {
  if (e.key == 'Enter') $('input[name="orderItemQTY"]').focus()
})
$('input[name="orderItemQTY"]').keydown((e) => {
  if (e.key == 'Enter') $('input[name="orderUnitPrice"]').focus()
})
$('input[name="orderUnitPrice"]').keydown((e) => {
  if (e.key == 'Enter') orderSave()
})

const clearOrderField = () => {
  $('input[name="orderCustomerID"]').val('').focus()
  $('input[name="orderItemCode"]').val('')
  $('input[name="orderItemName"]').val('')
  $('input[name="orderItemQTY"]').val('')
  $('input[name="orderUnitPrice"]').val('')
  __index = undefined
}
