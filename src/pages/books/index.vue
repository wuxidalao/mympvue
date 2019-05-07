<template>
  <div>
    <ul v-for="book in books" wx:key="id">
      <li>{{book.title}}</li>
    </ul>
  </div>
</template>

<script>
const db = wx.cloud.database();
export default {
  data() {
    return {
      books: []
    };
  },

  components: {},

  methods: {
    async getBooks() {
      console.log("获取数据");
      const books = await db.collection("test").get();
      this.books = books.data;
      console.log(books.data);
    }
  },

  created() {
    this.getBooks();
  }
};
</script>

<style scoped>
</style>
