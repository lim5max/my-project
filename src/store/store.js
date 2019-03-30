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
   SET_DAYS_LI(state, days_li){
     state.days_li=days_li
   },
   REMOVE_TODO(state, id){
      const imdex = state.todos.findIndex(item=> item.id===id)
      state.todos.splice(imdex,1)
    },
 
   Days_li(state, days){
     state.days_li = days
   },
   SET_NOWW_DAY(state, day){
     state.now_day = day
   },
   SET_NOW_M(state, month){
    state.nowmonth = month
  },
  gettodosfromfire(state, todos){
    state.todos = todos
    console.log(todos)
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
  Days_li({commit}, days){
    commit("Days_li", days)
  },
   setNowDay({commit}, index_day){
    commit("SET_NOWW_DAY", index_day)
  },
  setNowM({commit}, index_month){
    commit("SET_NOW_M", index_month)
  },
   addTodo({commit}, todo){
    return new Promise((resolve, reject) => {
    console.log(todo.date.getMonth())
    db.collection('todos').add({
        title:todo.title,
        date: todo.date,
        day: todo.date.getDate(),
        month: todo.date.getMonth()
      } , error => {
        // http failed, let the calling function know that action did not work out
        reject(error);
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
     resolve()
    } 
   },
   
   removeTodo({commit}, id){
     db.collection('todos').doc(id).delete()
      .then(()=>{ 
        commit('REMOVE_TODO', id)

      }) 
   },
 
  set_days_li({commit}, days_li){
    commit("SET_DAYS_LI", days_li)
  }

   },
   getters: {
    // ...
    getTodo: state =>{
      return state.todos.filter(todo => todo.day === state.now_day && todo.month === state.nowmonth);
    },
    finda: state=> (day, month)=>{
      return state.todos.find(
        todo =>{
           return todo.day === day && todo.month === month
        }
      )
    }
  }
 
})
