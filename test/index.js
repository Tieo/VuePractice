let app = new Vue({
    el: '#app',
    data: {
        message: 'Hi, Hello Vue World!'
    }
})

let app2 = new Vue({
    el: '#app-2',
    data: {
        message: '이 페이지는 ' + new Date() + '에 로드 되었습니다.'
    }
})

let app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
})

let app4 = new Vue({
    el:'#app-4',
    data: {
        todos: [
            { text: 'JavaScript 배우기' },
            { text: 'Vue 배우기' },
            { text: '무언가 멋진 것을 만들기' }
        ]
    }
})

let app5 = new Vue({
    el:'#app-5',
    data: {
        message: '안녕하세요! Vue.js!'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }

})

new Vue({
    methods: {
        fetchData() {
            axios.get('www.google.com');
        }
    },
    created: function() {
        this.fetchData();
    }
})

let app6 = new Vue({
    el:'#app-6',
    data: {
        show: false
    }
})

Vue.component('app-header', {
    template: '<h1>Header Component</h1>'
});

var appHeader = {
    template: '<h1>Header Component</h1>'
}

let app7 = new Vue({
    el:'#app-7',
    components: {
        'app-header': appHeader
    }
})

//하위 컴포넌트: childComponent

var childComponent = {
    props: ['propsdata'],
    template: '<p>{{propsdata}}</p>'
    }

//상위 컴포넌트: root 컴포넌트
let app8 = new Vue({
    el:'#app-8',
    components:{
        'child-component':childComponent
    },
    data:{
        message: 'hellooooooooooooooooo vue.js'
    }
})

//하위 컴포넌트: childComponent
let childComponent1 = {
    methods:{
        sendEvent: function(){
            this.$emit('update');
        }
    }
}

//상위 컴포넌트: root 컴포넌트
new Vue({
    el: '#app-9',
    components:{
        'child-component': childComponent1
    },
    methods: {
        showAlert: function(){
            alert('event received');
        }
    }
})