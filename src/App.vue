<template>
  <div id="app">
    <div class="img_con"> 
       <center><h1>2019</h1></center>
  <img src="./assets/lo.png" class="logo">
</div>

    <div  class="bid" >
            <calen id="calen"> </calen>

      <todo-list class="todo"></todo-list>
    </div>
    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import TodoList from './components/TodoList'
import Calen from './components/Calen'

export default {
  name: 'App',
  components: {
    Calen,
    HelloWorld,
    TodoList,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   color: #2c3e50;
 }
*{
  box-sizing: border-box;

}
#calen{
    font-family: 'Roboto Condensed', sans-serif;
    grid-column: 1 / span 6; 
    
     grid-template-rows: repeat(8,1fr);
     height: 500px;
     
    display: grid;
    grid-template-columns:repeat(7,1fr);

}
.bid{
    margin-top: 70px;
    display: grid;
    grid-template-columns: repeat(12,1fr);
    grid-column-gap: 5px;
    grid-auto-rows: 1fr;

}
.img_con{
  margin-left: 0;
  display: block;
}
.img_con>img{
  margin-left: 0;
  display: block;
}
.logo{
  display: block;
  margin: 20px auto;
  height: 75px;
}
.todo{
  grid-column: 7/ span 11;
}
</style>
