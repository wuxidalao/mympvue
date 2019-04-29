// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //   const {
  //     a,
  //     b
  //   } = event
  const wxcontext = cloud.getWXContext()

  return {
    openid: wxcontext.OPENID,
    // sun: a + b
  }
}
