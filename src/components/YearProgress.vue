<template>
  <div class="progressbar">
    <progress :percent="percent" color="pink" />
    <p>{{year}}已经过去了{{days}}天：{{percent}}%</p>
  </div>
</template>

<script>
export default {
  methods:{
    isLeapYear(){
      const year = new Date().getFullYear()
      if(year %400===0){
        return true
      }else if(year%4===0 && year%100!==0){
        return true
      }else{
        return false
      }
    },
    getDayOfYear(){
      return this.isLeapYear()?366:365
    }
  },
  computed:{
    year(){
      return new Date().getFullYear()
    },
    days(){
      let start = new Date()
      start.setMonth(0)
      start.setMonth(1)
      //start就是今年第一天
      //今天的时间戳 减去今年第一天的时间戳
      let offset = new Date().getTime()-start.getTime()
      return parseInt(offset/1000/60/60/24)+1
    },
    percent(){
      return (this.days*100/this.getDayOfYear()).toFixed(1)
    }
  }
}
</script>

<style>
.progressbar{
  width: 100%;
  text-align: center;
  font-size: 28rpx;
}
.progressbar>progress{
    margin:10rpx 0 10rpx 0;
} 
</style>