<template>
    <div id="app">
        <p>{{ count }}</p>
        <p>
            <button @click="increment">+</button>
            <button @click="decrement">-</button>
        </p>
    </div>
</template>

<script>

import Vuex from 'vuex'
import 'es6-promise/auto'

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

export default {
    increment(){
    store.commit('increment')

    console.log(store.state.count) // -> 1
    }
}
</script>