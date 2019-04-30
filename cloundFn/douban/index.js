// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

getDouban(isban) {
  const url = "https://book.douban.com/subject/" + isban
}

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    isbn
  } = event
  if (isbn) {
    return getDouban(isbn)
  } else {
    return {
      code: -1,
      msg: '请扫描正确的二维码'
    }
  }
}
