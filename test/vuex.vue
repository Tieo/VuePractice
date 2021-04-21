
new Vue({
    data(){
        return {
            count: 0
        }
    }
},
template:<template>
  <div>{{count}}</div>

</template>

<script>
import Vue from 'vue'
import Vuex, { mapActions, mapGetters } from 'vuex'
import 'es6-promise/auto'
import { mapState } from 'vuex'
import { SOME_MUTATION } from './mutation-types'
import { mapMutations } from 'vuex'
import { createNamespacedHelpers } from 'vuex'
import VueRouter from 'vue-router'

Vue.use(Vuex)
Vue.user(VueRouter)

const store = new Vuex.Store({
    state:{
        count:0
    },
    mutations:{
        increment (state){
            state.count++
        }
    }
})

const Counter = {
    template: '<div>{{ count }}</div>',
    computed: {
        count() {
            return this.$store.state.count // 변경되면, computed 속성이 다시 변경되고, 관련 DOM 업데이트가 트리거 된다.
        } //but 컴포넌트가 전역 저장소 단독 항목에 의존하게 한다. 
    } //
}


const app = new Vue({
    el: '#app',
    store, 
    components: {Counter},
    template:
    <div class="app">
    <counter></counter>
    </div>
})

const store = new Vuex.Store({
    state:{
        todos:[
            {id: 1, text: '...', done: true},
            {id: 2, text: '...', done: false}
        ]
    },
    getters:{
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        }
    } 

})

const store = new Vuex.Store({
    state:{
        todos:[
            {id: 1, text: '...', done: true},
            {id: 2, text: '...', done: false}
        ]
    },
    getters:{
        doneTodosCount () {
            return this.$store.getters.doneTodosCount
        }
    } 
})

const store = new Vuex.Store({
    state:{
        todos:[
            {id: 1, text: '...', done: true},
            {id: 2, text: '...', done: false}
        ]
    },
    getters:{
        getTodoById: (state) => (id) =>{
            return state.todos.find(todo => todo.id === id)
        }
    } 
})

const store = new Vuex.Store({
    state:{
        count:1
    },
    mutations:{
        increment (state, payload ){
            state.count += payload.amount// payload n 적용 
        }
    }
})

const store = new Vuex.Store({
    state: { ... },
    mutations: {
        // 
        [SOME_MUTATION] (state) {
            //변이 상태
        }
    }
})

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations:{
        increment (state) {
            state.count++
        }
    },
    actions: {
        increment (context) {
            context.commit('increment')
        }
    }
})

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations:{
        increment (state) {
            state.count++
        }
    },
    actions: {
        incrementAsync ({commit}) {
            steTimeout(() => {
            commit('increment')
            }, 1000)
        }
    }
})


const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations:{
        increment (state) {
            state.count++
        }
    },
    actions: {
        checkout({commit, state}, products){
            // 장바구니에 현재 있는 항목 저장
            const savedCartItems = [...state.cart.added]
            //결제 요청을 보낸 후 장바구니를 비웁니다. 
            commit(types.CHECKOUT_REQUEST)
            //상점 API는 성공 콜백 및 실패 콜백을 받는다. 
            shop.buyProducts(
                products,
                //요청 성공 핸들러 
                () => commit(types.CHECKOUT_SUCCESS),
                // 요청 실패 핸들러
                () => commit(types.CHECKOUT_FAILURE, savedCartItems)
            )
        }
        }
    }
)
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations:{
        increment (state) {
            state.count++
        }
    },
    actions: {
        actionA ({ commit }) {
            return new Promist((resolve, reject)=>{
                steTimeout(()=>{
                    commit('someMutation')
                    resolve()
                }, 1000)
            })
        }
    }
})
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations:{
        increment (state) {
            state.count++
        }
    },
    actions: {
        actionB ({ dispatch, commit }) {
            return dispatch('actionA').then(() => {
                commit('someOtherMutation')
            }
        }
    }
})

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations:{
        increment (state) {
            state.count++
        }
    },
    // getData() 및 getOtherData()가 Promise를 반환한다고 가정
    actions: {
        async actionA ({ commit }) {
            commit('gotData', await getData())
        },
        async actionB ({ dispatch, commit }) {
            await dispatch('actionA') // actionA가 끝나기를 기다린다.
            commit('gotOtherData', await getOtherData())
        }
    }
})

const moduleA = {
    state: () => ({ 'a':'a' }),
    mutations: { 'b':'b' },
    actions: { 'c':'c' },
    getters: { 'd':'d' }
}

const moduleB = {
    state: () => ({ 'e':'e' }),
    mutations: { 'f':'f' },
    actions: { 'g':'g' }
}

const store = new Vuex.Store({
    modules: {
        a: moduleA,
        b: moduleB
    }
})

const moduleA = {
    state: () =>({
        count: 0
    }),
    mutations: {
        increment (state){
            //state는 지역 모듈 상태입니다. 
            state.count++
        }
    },
    getters: {
        doubleCount (state) {
            return state.count*2
        }
    }
}
const moduleA ={
    // ...
    actions: {
        incrementIfOddOnRootSum ({ state, commit, rootState }) {
            if ((state.count + rootState.count)%2 ===1){
                commit('increment')
            }
        }
    }
}
const moduleA = {
    getters:{
        sumWithRootCount (state, getters, rootState) {
            return state.count + rootState.count
        }
    }
}

const store = new Vuex.Store({
    modules: {
        account:{
            namespaced: true,

            //모듈 자산
            state: () => ({ 'a':'a' }), //모듈 상태는 이미 중첩되어 있고, namespace 옵션의 영향을 받지 않는다. 
            getters:{
                isAdmin() {  } // -> getters['account/isAdmin']
            },
            actions: {
                login() { } // -> dispatch('account/login')
            },
            mutations: {
                login() { } // -> commit('account/login')
            },
        
            //중첩 모듈 
            modules: {
                //부모 모듈로부터 namespace를 상속 받음
                myPage: {
                    state: () => ({ }),
                    getters: {
                        profile() { } // -> getters['account/profile']
                    }
                },
                //namespace를 더 중첩
                posts: {
                    namespaced: true, 
                    state: () => ({ }),
                    getters: {
                        popular () { } // -> getters['account/posts/popular']
                    }
                }
            }

        }
    }
})

const store = new Vuex.Store({
    modules: {
        foo: {
            namespaced: true, 

            getters: {
                //'getters'는 해당 모듈의 지역화된 getters
                //getters의 4번째 인자를 통해서 rootGetters 사용 가능
                someGetter (state, getters, rootState, rootGetters) {
                    getters.someOtherGetter // -> 'foo/someOtherGetter'
                    rootGetters.someOtherGetter // -> 'someOtherGetter'
                },
                someOtherGetter: state => { },
                someOtherAction ({ dispatch }){
                    dispatch('someAction')
                }

            },
            modules:{
                foo: {
                    namespaced: true,

                    actions:{
                        someAction:{
                            root: true, 
                            handler (namespacedContext, payload) { }// -> 'someAction'
                        }
                    }
                }
            },
            actions: {
                //dispatch와 commit도 해당 모듈의 지역화된 것
                //전역 dispatch/commit을 위한 'root' 옵션 설정 가능   

                someAction ({ dispatch, commit, getters, rootGetters }) {
    
                    getters.someGetter // -> 'foo/someGetter'
                    rootGetters.someGetter // -> 'someGetter'

                    dispatch('someOtherAction') // -> 'foo/someOtherAction'
                    dispatch('someOtherAction', null, {root: true})//-> 'someOtherAction'

                    commit('someMutation') // -> 'foo/someMutation'
                    commit('someMutation', null, {root:true}) // -> 'someMuation'
                },
                someOtherAction (ctx, payload) { }
            }

        }
    }
})

const { mapState, mapActions} = createNamespacedHelpers('some/nested/module')
const myPlugin = store => {
    //저장소가 초기화될 때 불립니다. 
    store.subscribe((mutation, state) => {
        //매 변이시마다 불립니다. 
        //변이는 { type, payload } 포맷으로 제공됩니다. 

    })
}

const store = new Vuex.Store({
    // ...
    plugins: [myPlugin]
})

const User = {
    template: '<div> User </div>'
}

const router = new VueRouter({
    routes: [
        //동적 세그먼트는 콜론으로 시작
        {path: '/user/:id', component:User}
    ]
})

const User = {
    template: '<div> User {{ $route.params.id }}</div>'
}

store.state.a // -> moduleA 의 상태
store.state.b  // -> moduleB의 상태 
store.getters.doneTodos // ->[{id: 1, text: '...', done: true}]
store.getters.getTodoById(2) // ->{ id:2, text: '...', dnoe: false}
store.dispatch('increment')
store.dispatch('actionA').then(()=> {
    //...
})
store.registerModule('myModule', {
    //...
})

// 'nested/myModule' 중첩 모듈 등록
store.registerModule(['nested', 'myModule'], {
    //...
})


//payload와 함께 dispatch 
store.dispatch('incrementAsync', {
    amount: 10
})

//객체와 함께 디스패치
store.dispatch({
    type: 'incrementAsync',
    amount:10
})

store.commit({
    type:'increment', //객체 스타일 commit, 'increment' mutation이 일으킬 수 있는 모든 상태변화는 이 순간에 이루어진다. 
    amount:10
})

console.log(store.state.count)

export const SOME_MUTATION = 'SOME_MUTATION'

export default {
    methods:{
        increment(){
            this.count++
        },
        ...mapMutations([
            'increment'// this.increment()를 this.$store.commit('increment')에 매핑
        ]),
        ...mapMutations({
            add: 'increment' //this.add()를 this.$store.commit('increment')에 매핑한다. 
        }),
        ...mapActions([
            'increment' //this.increment()을 this.$store.dispatch('increment')에 매핑
            // mapActions는 payload를 지원합니다.
            ,'incrementBy' //this.incrementBy(amount)를 this.$store.dispatch('incrementBy', amount)에 매핑
        ]),
        ...mapActions({
            add: 'increment'// this.add()을 this.$store.dispatch('increment')에 매핑
        })

    },
    computed: mapState({
        count: state => state.count,
        countAlias: 'count',
        countPlusLocalState (state){
            return state.count + this.localCount
        }
        //'count' // this.count를 store.state.count에 매핑한다. 
    }),
    computed: {
        //getter를 객체 전개 연산자(Object Spread Operator)로 계산하여 추가한다.
        ...mapGetters([
            'doneTodosCount',
            'anotherGetter'],
            {doneCount: 'doneTodosCount'}
            // ...
        )
    },
    computed: {
        ...mapState({
            a: state => state.some.nested.module.a,
            b: state => state.some.nested.module.b
        })
    },
    methods: {
        ...mapActions([
            'some/nested/module/foo', //-> this['some/nested/module/foo']()
            'some/nested/module/bar' // -> this['some/nested/module/bar']()
        ]),
        ...mapActions('some/nested/module', [
            'foo', //-> this.foo()
            'bar' // -> this.bar() 
        ])
    },
    computed: {
        // 'some/nested/module' 에서 찾음
        ...mapState({
            a: state => state.a,
            b: state => state.b
        })
    },
    methods: {
        // 'some/nested/module'에서 찾음
        ...mapActions([
            'foo',
            'bar'
        ])
    }



}
</script>

<style>

</style>
)