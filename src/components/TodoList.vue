<template>
<div>
  <label > I wanna </label>
  <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" >
  <label > Hour </label>

  <select v-model="selectedh">
    
  <option class="h1" v-for="option in optionsh" v-bind:value="option.value" :key="option.id">
    {{ option.text }}
  </option>


  </select>
    <label >Minutes</label>

  <select v-model="selectedm">
  <option v-for="option in optionsm" v-bind:value="option.value" :key="option.id">
    {{ option.text }}
  </option>
 
</select>
{{selectedh}}
<button  @click="addTodo">
    add todo</button>
    <div class="todos">

        <div class="todo" v-for="(todo, index) in todos" :id="todo.id">
      <div>  plans:  {{todo.title}}   В - {{todo.date.getHours()}} часов :и :  {{todo.date.getMinutes()}} минут</div>
                <div class="deletebutton" @click="deletetodo(todo)"  >+</div> 
        </div>
    </div>
    </div>
</template>
<script>
export default {
  name: 'todo-list',

  
  data () {
    return {
      newTodo: ' ',
      optionsh:[],
      optionsm:[],
      idForTodo: 3,
      id:0,
      selectedh:-1,
      selectedm:-1,
      nowday:0,
      nowmonth:0,
    
    } 
    
  },
 
  computed: {
      todos(){
      
          return this.$store.getters.getTodo.sort((a,b)=> {
              return a.date - b.date
          }
              
          )
      }},
  methods: {
         deletetodo(todo  ){
             this.$store.dispatch('removeTodo', todo.id)

         },
         addTodo(){
             
             if(this.newTodo.trim()  != '' && this.selectedm!= -1 &&this.selectedh!=-1){
              let  date = new Date()
              date.setFullYear(2019)
              date.setHours(this.selectedh)
              date.setMonth(this.$store.state.nowmonth)
              date.setMinutes(this.selectedm)
               date.setDate(this.$store.state.now_day)
                console.log(date)
              let todo = {
                    date: date,
                    title: this.newTodo,
                    id: this.id,

                }
               this.newTodo = ''
             this.id++
             this.$store.dispatch('addTodo' , todo)
                 
             }
        
            this.newTodo=""
            this.idForTodo++
        }
    },
    created : function(){
        this.$store.dispatch('gettodosfromfire')

        this.nowday=this.$store.state.now_day
        this.nowmonth=this.$store.state.nowmonth
        for(var i=0; i!=24 ; i++){
            this.optionsh.push({
                text: i,
                id: i,
                value: i
            })
            
        }for(var i=0; i!=60 ; i++){
            this.optionsm.push({
                text: i,
                id: i,
                value: i
            })
            
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  >
 .h1{
     width: 30px;
 }
 .todos{
     display: inline;
     justify-content: space-between;
    flex-wrap: nowrap;
    width: 100%;
     max-height: 30px;
    background-color: bisque;
 }
 .deletebutton{
     max-width: 30px;
     background-color: rebeccapurple;
     transform: rotate(120deg);
     border-radius: 30px;
     text-align: center;
     line-height: 30px;
     max-height: 30px;
 }
</style>
