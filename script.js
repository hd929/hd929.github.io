const zeroMd = document.querySelector('zero-md')

zeroMd.addEventListener('zero-md-rendered', () => {
  const searchMathInput = document.querySelector('.search-math input')
  const mathList = document.querySelectorAll('ul')
  const searchClear = document.querySelector('.search-clear')

  function removeAccents(str) {
    var AccentsMap = [
      'aàảãáạăằẳẵắặâầẩẫấậ',
      'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
      'dđ',
      'DĐ',
      'eèẻẽéẹêềểễếệ',
      'EÈẺẼÉẸÊỀỂỄẾỆ',
      'iìỉĩíị',
      'IÌỈĨÍỊ',
      'oòỏõóọôồổỗốộơờởỡớợ',
      'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
      'uùủũúụưừửữứự',
      'UÙỦŨÚỤƯỪỬỮỨỰ',
      'yỳỷỹýỵ',
      'YỲỶỸÝỴ',
    ]
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g')
      var char = AccentsMap[i][0]
      str = str.replace(re, char)
    }
    return str
  }

  searchMathInput.addEventListener('input', () => {
    Array.from(mathList).map((elem) => {
      const leElements = elem.querySelectorAll('li')

      Array.from(leElements).map((liElem) => {
        if (
          removeAccents(liElem.textContent.toLocaleLowerCase()).includes(
            removeAccents(searchMathInput.value).toLowerCase()
          )
        ) {
          liElem.style.display = 'block'
        } else {
          liElem.style.display = 'none'
        }
      })
    })
  })

  searchClear.addEventListener('click', () => {
    searchMathInput.value = ''

    Array.from(mathList).map((elem) => {
      const leElements = elem.querySelectorAll('li')

      Array.from(leElements).map((liElem) => {
        liElem.style.display = 'block'
      })
    })
  })
})
