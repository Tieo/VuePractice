<template>
  <div>
    <input
      v-model="searchData" 
      type="text"
      id="search-bar"
      @keypress.enter="onInput()" 
      placeholder="Search"
    />
    <button type="submit" @click="onInput()">검색</button>
  </div>
</template>

<script>
export default {
  name: "SearchInput", // 현재 컴포넌트의 이름을 지정해준다.
  data() {
    return {
      searchData: ""
    };
  },
  methods: {
    onInput() {
      this.$emit("searchData", this.searchData); //부모 컴포넌트와 통신하는 부분
      //첫 번째 변수인 "searchData"는 이 컴포넌트의 행위가 일어날 때의 이벤트를 명명 ★
      //두 번째 변수인 this.serachData는 부모에 올려줄 Data를 의미
      document.getElementById("search-bar").value = ""; // input data 전송 후 input 창 내 글씨 초기화
    }
  }
};
</script>

<style></style>