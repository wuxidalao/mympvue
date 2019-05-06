// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
const doubanbook = require('doubanbook')
const cheerio = require('cheerio')

cloud.init()

async function saarchDouban(isban) {
  const url = "https://book.douban.com/subject_search?search_text=" + isban
  let searchInfo = await axios.get(url)
  console.log(searchInfo.data)
  // getDouban("9787536692930")
  let reg = /window\.__DATA__ = "(.*)"/
  if (reg.test(searchInfo.data)) {
    // 数据解密
    let searchData = doubanbook(RegExp.$1)[0]
    // console.log(searchData)
    return searchData
  }
}

async function getDouban(isbn) {
  const detailInfo = await searchDouban(isbn)
  const detailPage = await axios.get(detailInfo.url)
  const $ = cheerio.load(detailPage.data)
  const info = $('#info').text().split('\n').map(v => v.trim()).filter(v => v)
  // console.log(info)
  let author = info[1]
  let publisher, price
  info.forEach(v => {
    let temp = v.split(':')
    if (temp[0] == '出版社') {
      publisher = temp[1]
    }
    if (temp[0] == '定价') {
      price = temp[1]
    }
  })
  let tags = []
  $('#db-tags-section a.tag').each((i, v) => {
    tags.push({
      title: $(v).text()
    })
  })

  const ret = {
    tags,
    author,
    publisher,
    price,
    image: detailInfo.conver_url,
    rate: detailInfo.rating.value,
    alt: detailInfo.url,
    title: detailInfo.title,
    summary: $('#link-report .intro').text()
  }
  return ret
  // console.log(ret)
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
