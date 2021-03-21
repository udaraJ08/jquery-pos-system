let __customerIndex = undefined

$(document).ready(() => {
  customerDeleteUpdateDisable()
})

$('#btnCustomerSave').on('click', () => {
  saveCustomer()
})

$('#btnCustomerDelete').on('click', () => {
  deleteCustomer()
  customerSubmitEnable()
  customerDeleteUpdateDisable()
})

$('#btnCustomerUpdate').on('click', () => {
  saveCustomer()
  clearCustomerFields()
})

$('#btnCustomerClearAll').on('click', () => {
  clearAllAudio()
  customerDeleteUpdateDisable()
  customerSubmitEnable()
  clearCustomerTable()
  clearCustomerFields()
  clearCustomerDB()
})

function saveCustomer() {
  if (customerFieldValidator()) {
    if (__customerIndex != undefined) updateCustomerTable()
    else {
      arrPopulate()
      saveBtnAudio()
    }
    clearCustomerTable()
    customerTableLoad()
    customerValueLoader()
    clearCustomerFields()
  }
}

////////////created functions///////////////////

const customerFieldValidator = () => {
  if (
    $('input[name="name"]').val().length == 0 ||
    $('input[name="age"]').val().length == 0 ||
    $('input[name="address"]').val().length == 0
  )
    return false
  else if (
    $('input[name="name"]').val().length > 0 ||
    $('input[name="age"]').val().length > 0 ||
    $('input[name="address"]').val().length > 0
  ) {
    return true
  }
}

const customerValueLoader = () => {
  $('#tblCustomer>tr').on('click', function () {
    customerDeleteUpdateEnable()
    customerSubmitDisable()
    __customerIndex = $(this).index()
    let name = $(this).find('td:eq(1)').text()
    let address = $(this).find('td:eq(2)').text()
    let salary = $(this).find('td:eq(3)').text()
    $('input[name="name"]').val(name)
    $('input[name="age"]').val(address)
    $('input[name="address"]').val(salary)
  })
}

const arrPopulate = () => {
  customerArr.push(customerFetchForPopulate())
}

const customerTableLoad = () => {
  clearCustomerTable()
  customerArr.map((element) => {
    const row = `<tr>
    <td>${element.getCustomerID()}</td>
    <td>${element.getName()}</td>
    <td>${element.getAge()}</td>
    <td>${element.getAddress()}</td>
    </tr>`
    $('#tblCustomer').append(row)
  })
}

const customerFetchForPopulate = () => {
  const id = generateCustomerID()
  const name = $('input[name="name"]').val()
  const age = $('input[name="age"]').val()
  const address = $('input[name="address"]').val()

  return (customer = new Customer(id, name, age, address))
}

const deleteCustomer = () => {
  deleteBtnAudio()

  if (__customerIndex != undefined) {
    customerArr.splice(__customerIndex, 1)
  }
  customerTableLoad()
  clearCustomerFields()
}

const updateCustomerTable = () => {
  updateBtnAudio()
  customerArr[__customerIndex] = customerFetchForPopulate()
  customerTableLoad()
  customerSubmitEnable()
  customerDeleteUpdateDisable()
}

//use to auto generate the ID
const generateCustomerID = () => {
  const curCustID = customerArr.length
  if (curCustID == 0) return `C-00${curCustID + 1}`
  else {
    const lastCustomerID = customerArr[curCustID - 1].getCustomerID()
    const lastID = lastCustomerIDNumberFetcher(lastCustomerID)
    if (lastID > 0 && lastID < 10) return `C-00${lastID}`
    else if (lastID > 9 && lastID < 99) return `C-0${lastID}`
    else return `C-${lastID}`
  }
}

const lastCustomerIDNumberFetcher = (custNum) => {
  return parseInt(custNum.slice(2, custNum.length)) + 1
}
//auto generate ID ends here

const clearCustomerTable = () => {
  $('#tblCustomer').empty()
}

const customerSubmitDisable = () => {
  $('#btnCustomerSave').attr('disabled', true)
}

const customerSubmitEnable = () => {
  $('#btnCustomerSave').attr('disabled', false)
}

const customerDeleteUpdateDisable = () => {
  $('#btnCustomerDelete, #btnCustomerUpdate').attr('disabled', true)
}

const customerDeleteUpdateEnable = () => {
  $('#btnCustomerDelete, #btnCustomerUpdate').attr('disabled', false)
}

const customerNameFocus = () => {
  $('input[name="name"]').focus()
}

const customerDOBFocus = () => {
  $('input[name="age"]').focus()
}

const customerAddressFocus = () => {
  $('input[name="address"]').focus()
}

$('input[name="name"]').keydown((e) => {
  if (e.key == 'Enter') customerDOBFocus()
})
$('input[name="age"]').keydown((e) => {
  if (e.key == 'Enter') customerAddressFocus()
})
$('input[name="address"]').keydown((e) => {
  if (e.key == 'Enter') saveCustomer()
})

const clearCustomerDB = () => {
  customerArr.splice(0, customerArr.length)
}

const clearCustomerFields = () => {
  $('input[name="name"]').val('').focus()
  $('input[name="age"]').val('')
  $('input[name="address"]').val('')
  __customerIndex = undefined
}
