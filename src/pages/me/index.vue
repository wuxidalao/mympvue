<template>
  <div class="container">
    <div>
      <div v-if="userInfo.nickName" class="userinfo">
        <img :src="userInfo.avatarUrl">
        <text>{{userInfo.nickName}}</text>
      </div>
      <div v-if="!userInfo.nickName" class="userinfo">
        <img src="http://image.shengxinjing.cn/rate/unlogin.png">
        <button open-type="getUserInfo" @getuserinfo="onGetUserinfo" type="primary">登录</button>
      </div>
    </div>
    <button v-if="userInfo.openid" @click="scanBook" type="primary" size="default" class="btn">添加图书</button>
    <YearProgress></YearProgress>
  </div>
</template>

<script>
//import qcloud from "wafer2-client-sdk";
import YearProgress from "@/components/YearProgress";
//import { showSuccess } from "@/util";
//import config from "@/config";

// 获取默认环境的数据库的引用
const db = wx.cloud.database();

export default {
  components: {
    YearProgress
  },

  data() {
    return {
      userInfo: wx.getStorageSync("userInfo") || {}
    };
  },

  methods: {
    onGetUserinfo(e) {
      var userInfo = e.mp.detail.userInfo;
      // 调用云函数
      wx.cloud.callFunction({
        name: "login",
        complete: res => {
          userInfo.openid = res.result.openid;
          this.userInfo = userInfo;
          // 本地存储
          wx.setStorageSync("userInfo", userInfo);
        }
      });
      console.log(e);
    },

    async addBook(isbn) {
      console.log(isbn);
      const { result } = await wx.cloud.callFunction({
        name: "douban",
        data: { isbn }
      });
      result.count = 0;
      result.userInfo = this.userInfo;
      const add = await db.collection("imoocbooks").addBook({
        data: result
      });
      if (add._id) {
        wx.showModal({
          title: "添加成功",
          content: "《${result.title}》添加成功"
        });
      }
      console.log(bookinfo);
    },

    scanBook() {
      wx.scanCode({
        success: res => {
          const isbn = res.result;
          this.addBook(isbn);
        }
      });
    }
  },

  created() {}
};
</script>

<style scoped>
.userinfo {
  margin: 100rpx;
}

.userinfo > img {
  width: 200rpx;
  height: 200rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo > text {
  display: flex;
  justify-content: center;
}

.btn {
  width: 100%;
  margin-bottom: 10rpx;
  background: #0b988f;
}
</style>
