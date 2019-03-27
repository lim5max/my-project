import Vue from 'vue'
import Vuex from 'vuex'
 
import db from '../firebase'
Vue.use(Vuex)
export default new Vuex.Store({
 state: {
   todos: [],
   newTodo: 0,
   days_li:[],
   nowmonth:0,
   day:1,
   now_day: 0
 },
 mutations: {
 
   ADD_TODO(state, todo){
     state.todos.push({
       date: todo.date,
       title: todo.title,
       id: todo.id,
       month: todo.month,
       day:todo.day
     })
   },
 
   REMOVE_TODO(state, id){
      const imdex = state.todos.findIndex(item=> item.id===id)
      state.todos.splice(imdex,1)
    },
 
   CLEAR_TODO(state){
     state.newTodo = ''
   },
   SET_NOWW_DAY(state, day){
     state.now_day = day
   },
   SET_NOW_M(state, day){
    state.nowmonth = day
  },
  gettodosfromfire(state, todos){
    state.todos = todos
  }
  },
 actions: {
  gettodosfromfire( {commit} ){
    console.log(2)
    db.collection('todos').get()
    .then(querySnapshot=>{
      let mass = []
      querySnapshot.forEach(doc=>{
        var date = new Date();
        let timestamp = doc.data().date
        date.setTime(timestamp)
        const data = {
          id: doc.id,
          title: doc.data().title,
          date : doc.data().date.toDate(),
          day: doc.data().day,
          month: doc.data().month,

        }
        mass.push(data)
      })
      commit('gettodosfromfire', mass)
    })
    
  },
   setNowDay({commit}, index_day){
    commit("SET_NOWW_DAY", index_day)
  },
  setNowM({commit}, index_day){
    commit("SET_NOW_M", index_day)
  },
   addTodo({commit}, todo){

    db.collection('todos').add({
        title:todo.title,
        date: todo.date,
        day: todo.date.getDate(),
        month: todo.date.getMonth()
      })
      .then(docRef => {
        console.log(docRef.id)
        commit('ADD_TODO' , {
          id: docRef.id,
          title: todo.title,
          day: todo.date.getDate(),
          month: todo.date.getMonth(),
          date: todo.date
      })
      })
     
  
   },
   
   removeTodo({commit}, id){
     db.collection('todos').doc(id).delete()
      .then(()=>{ 
        commit('REMOVE_TODO', id)

      })
   },
 
 

   },
   getters: {
    // ...
    getTodo: state =>{
      return state.todos.filter(todo => todo.day === state.now_day && todo.month === state.nowmonth);
    },
    
  }
 
})
