<template>
  <div>
    <div class="container">
      <div v-if="userInfo.nickName">
        <img :src="userInfo.avatarUrl">
        <text>{{userInfo.nickName}}</text>
      </div>
      <div v-if="!userInfo.nickName">
        <img src="http://image.shengxinjing.cn/rate/unlogin.png">
        <button open-type="getUserInfo" @getuserinfo="onGetUserinfo">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    }
  },

  created() {}
};
</script>

<style scoped>
</style>
