const zeroMd = document.querySelector('zero-md')

zeroMd.addEventListener('zero-md-rendered', () => {
  const searchMathInput = document.querySelector('.search-math input')
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
    while (str.indexOf(' ') != -1) {
      str = str.replace(' ', '')
    }
    return str
  }

  searchMathInput.addEventListener('input', () => {
    const mathNodeList = document.querySelectorAll('.code')
    const searchValue = removeAccents(searchMathInput.value.toLocaleLowerCase())

    Array.from(mathNodeList).map((math) => {
      let mathName = removeAccents(
        math.querySelector('h1').textContent.toLocaleLowerCase()
      )

      function invalidSearch() {
        let preIndex = 0
        for (let i = 0; i < searchValue.length; i++) {
          let index = mathName.indexOf(searchValue[i], preIndex)

          if (index < preIndex) return false
          preIndex = index
        }

        return true
      }

      if (invalidSearch()) {
        math.style.display = 'block'
      } else {
        math.style.display = 'none'
      }
    })
  })

  searchClear.addEventListener('click', () => {
    searchMathInput.value = ''
    const mathNodeList = document.querySelectorAll('.code')

    Array.from(mathNodeList).map((elem) => {
      elem.style.display = 'block'
    })
  })
})
