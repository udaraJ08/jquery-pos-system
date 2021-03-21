let __index = undefined

$(document).ready(() => {
  itemDeleteUpdateDisable()
})

$('#btnItemSave').on('click', () => {
  saveitem()
})

$('#btnItemDelete').on('click', () => {
  deleteItem()
  itemSubmitEnable()
  itemDeleteUpdateDisable()
})

$('#btnItemUpdate').on('click', () => {
  saveitem()
  clearItemFields()
})

$('#btnItemClear').on('click', () => {
  clearAllAudio()
  clearTable()
  clearItemFields()
  clearItemDB()
})

function saveitem() {
  if (itemFieldValidator()) {
    if (__index != undefined) updateTable()
    else {
      itemArrPopulate()
      saveBtnAudio()
    }
    itemTableLoad()
    valueLoader()
    clearItemFields()
    itemSubmitEnable()
    itemDeleteUpdateDisable()
  }
}
////////////created functions////////////

const itemFieldValidator = () => {
  if (
    $('input[name="itemID"]').val().length == 0 ||
    $('input[name="itemName"]').val().length == 0 ||
    $('input[name="QTY"]').val().length == 0 ||
    $('input[name="untPrice"]').val().length == 0
  )
    return false
  else if (
    $('input[name="itemID"]').val().length > 0 &&
    $('input[name="itemName"]').val().length > 0 &&
    $('input[name="QTY"]').val().length > 0 &&
    $('input[name="untPrice"]').val().length > 0
  ) {
    return true
  }
}

const deleteItem = () => {
  deleteBtnAudio()
  if (__index != undefined) {
    itemArr.splice(__index, 1)
  }
  itemTableLoad()
  clearItemFields()
}

const itemArrPopulate = () => {
  itemArr.push(itemFetchForPopulate())
}

const itemFetchForPopulate = () => {
  const itemID = $('input[name="itemID"]').val()
  const itemName = $('input[name="itemName"]').val()
  const QTY = $('input[name="QTY"]').val()
  const unitPrice = $('input[name="untPrice"]').val()

  return (item = new Item(itemID, itemName, QTY, unitPrice))
}

const valueLoader = () => {
  $('#tblitem>tr').on('click', function () {
    itemDeleteUpdateEnable()
    itemSubmitDisable()
    __index = $(this).index()
    let itemID = $(this).find('td:eq(0)').text()
    let itemName = $(this).find('td:eq(1)').text()
    let QTY = $(this).find('td:eq(2)').text()
    let unitPrice = $(this).find('td:eq(3)').text()
    $('input[name="itemID"]').val(itemID)
    $('input[name="itemName"]').val(itemName)
    $('input[name="QTY"]').val(QTY)
    $('input[name="untPrice"]').val(unitPrice)
  })
}

const itemTableLoad = () => {
  clearTable()
  itemArr.map((element) => {
    const row = `<tr>
    <td>${element.getItemID()}</td>
    <td>${element.getItemName()}</td>
    <td>${element.getQTY()}</td>
    <td>${element.getUnitPrice()}</td>
    </tr>`
    $('#tblitem').append(row)
  })
}

const updateTable = () => {
  updateBtnAudio()
  itemArr[__index] = itemFetchForPopulate()
  itemTableLoad()
}

const clearTable = () => {
  $('#tblitem').empty()
}

const itemSubmitDisable = () => {
  $('#btnItemSave').attr('disabled', true)
}

const itemSubmitEnable = () => {
  $('#btnItemSave').attr('disabled', false)
}

const itemDeleteUpdateDisable = () => {
  $('#btnItemDelete, #btnItemUpdate').attr('disabled', true)
}

const itemDeleteUpdateEnable = () => {
  $('#btnItemDelete, #btnItemUpdate').attr('disabled', false)
}

const clearItemDB = () => {
  itemArr.splice(0, itemArr.length)
}

const itemIDFocus = () => {
  $('input[name="itemID"]').focus()
}

const itemNameFocus = () => {
  $('input[name="itemName"]').focus()
}

const itemQTYFocus = () => {
  $('input[name="QTY"]').focus()
}

const itemUnitPriceFocus = () => {
  $('input[name="untPrice"]').focus()
}

const clearItemFields = () => {
  $('input[name="itemID"]').val('').focus()
  $('input[name="itemName"]').val('')
  $('input[name="QTY"]').val('')
  $('input[name="untPrice"]').val('')
  __index = undefined
}

$('input[name="itemID"]').keydown((e) => {
  if (e.key == 'Enter') itemNameFocus()
})
$('input[name="itemName"]').keydown((e) => {
  if (e.key == 'Enter') itemQTYFocus()
})
$('input[name="QTY"]').keydown((e) => {
  if (e.key == 'Enter') itemUnitPriceFocus()
})
$('input[name="untPrice"]').keydown((e) => {
  if (e.key == 'Enter') saveitem()
})
