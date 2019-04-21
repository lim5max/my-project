<template>
      <div>
 
  
            <div class="but fq" v-on:click="minusmonths">
                --
            </div>
            <div class="h1-con">   
             {{print_month}} 
            
            </div>
             
                  
       
 
            <div class="but fr" v-on:click="plusmonths"> 
                  <center>
                         -->
                  </center>
                  
            
            </div>
            <div class="days">
                  <div  v-for="(day, index) in days_li" :key="day.id" @mouseover="hoverr(index)" :class="classday(day) " @mouseout="unhoverr(index)" v-on:click.prevent="toggletoactive(day) ">{{day.name}}</div>
            </div>
 


               
            </div>
</template>

<script>
 
 import { mapState } from 'vuex';
 import {watchVuex} from'../watch_vuex'
      export default {
            name: 'ca',
            data () {
                  return {
                        months: ['ЯНВАРЬ', 'ФЕВРАЛЬ','МАРТ' ,'АПРЕЛЬ' , 'МАЙ', 'ИЮНЬ', 'ИЮЛЬ','АВГУСТ' ,'СЕНТЯБРЬ' , 'ОКТЯБРЬ','НОЯБРЬ', 'ДЕКАБРЬ' ],
                        now_month_index: 0,
                        ii: 0,
                        days_li: [],
                        go: 1,
                        active_day: 0,
                        day_is_active:0 ,
                        active_now_day: 0
                 }
            },
                  
            computed: {
                    zero_active_day(){
                     for (var i =0 ; i<6; i++){
                       if (this.days_li[i].name !=0){
                             console.log(7666)
                       }
                  }
                   
                  },
                    print_month: function(){
                            return this.months[this.now_month_index]
                     }
            },
            methods: {
                  watchVuex,
                  classday(day){
                        let trueday = false
                        let have_day_boolen=false
                        if (this.active_now_day == day.name) {
                              trueday = true; }
                        if (day.have_day){
                              have_day_boolen=true
                        }
                        return {
                              dai: !trueday,
                              having_day: have_day_boolen,
                              active_day: trueday
                        } 
                  },
                  toggletoactive(day){
                        if(day.name!=0){ 
                        this.active_now_day = day.name
                      
                        this.$store.dispatch('setNowDay', this.active_now_day)
                        
                        console.log(this.active_now_day)}
                  },
                   
                  hoverr: function(index){
                         this.days_li[index].active_is =   !this.days_li[index].active_is

                  }, 
                  unhoverr: function(index){
                         this.days_li[index].active_is =   false

                  },
                 
                  drawdate: function (nm, a){
                        this.$store.state.ready_from_firebase=0
                        var i = 1
                        var bb = []
                         
                        var now_month  = nm
                        function sortmas(mas){
                              var massive = mas
                              for( var i = 0; i<50; i++)   {
                              massive.push(0)
                              }
                              return massive
                        }
                        var nums =  1
                        var mas  =  sortmas(bb)
                        var nach = 0
                        
                        var b = nm.getDay()
                        if(b==0){
                              b=6
                        }else{
                              b--
                        }
                        console.log(b)

                        while (new Date(2019, a, nums).getMonth() == a  ){
                              
                              mas[b] = nums
                              b++
                              nums++
                  
                        }
                        for (var u = mas.length-1; u>9; u--){
                              if(mas[u]==0) {
                                    mas.splice(u, 1);
                              }
                  
                        }
                  
                        return mas
                  },
                  drawcalen: function()  {
                        var a = this.now_month_index
                        this.ii =  a
                        var day = 1
                        
                        console.log() 
                        var dataDate = new Date(2019, a, day)
                        var nm = dataDate
                        var b = nm.getDay()
                        if(b==0){
                              b=6
                        }else{
                              b--
                        }
                        console.log(b)
                        this.go = this.drawdate(dataDate, a)
                        
                        
                        var go = this.go
                        console.log(go)
                        var numbers_day  = 1
                        this.days_li = []
                        for (var p = 0; p< go.length ; p++){
                              
                              if ( go[p] !=0){
                                   
                                    this.days_li.push({
                                    name: numbers_day,
                                    text: "",
                                    active_is: false,
                                    active: false,
                                    have_day:false
                                   
                              })
                              numbers_day++
                              }else{
                                    this.days_li.push({
                                    name: '' ,
                                    
                              })
                              }
                        
                        }
                         for (var p = 0; p< go.length ; p++){
                               if ( go[p] !=0){
                                      this.active_now_day = this.days_li[p].name;
                                      this.$store.dispatch('setNowDay', this.active_now_day)
                                      break;
                               }
                         }
 
                        console.log(this.days_li)
                        
                        this.$store.dispatch('addDaysLi', this.days_li)
                        this.$store.dispatch('setNowM', this.now_month_index)
                        this.$store.dispatch('gettodosfromfire') 
                      
                                   
                             
                         return 
                  },
                  nons: function(){
                        this.days_li.push(0)
                       console.log(this.days_li)
                        return
                  },
              
                  plusmonths  : function(){
                              
                          if (this.now_month_index != 11){ 
                          this.now_month_index++ }else{

                          this.now_month_index = 0
                            }  
                         this.drawcalen()
                         this.$store.dispatch('addDaysLi',this.days_li)
                        this.watchVuex()
                  },
                  minusmonths: function(){

                        if (this.now_month_index != 0 ){ 
                        this.now_month_index--}else{

                        this.now_month_index = 11
                        }
                        
                        this.drawcalen()
                        this.$store.dispatch('addDaysLi',this.days_li)
                        this.watchVuex()
                        },
                        
                  
            },
            created: function(){
                  this.drawcalen()
                  
                  this.watchVuex()
                   
                   
                  
            },
              updated() {
              }
           
  }
      
                  
                  
                  


                  
                   
</script>

<style >
   
.h1-con{
    font-size: 1.5em;
    height: 50px;
    text-align: center;
    display: flex;
    flex-direction: column;
     
}
h1{
    text-align: center;

}




.but{
    background-color: orchid ;
    height: 100%;
  
    justify-content: center;
    grid-row: 1 / span 7;
    display: inline-flex;
    align-items: center;
  
    transition-duration: 1s;
 }
.fq{
    grid-column: 1;

}
.having_day{
      opacity: 0.5;
      border: 1px solid black;
}
.fr{
    grid-column: 7;
}

.but:hover{
    opacity: 0.5;
}
.days{
    grid-column: 2 / span 5;
    grid-row: 2 / span 6;
    background-color: azure;
    display: grid; 
     grid-template-rows: repeat(auto-fill, minmax(50px, 1fr) ) ;
    grid-template-columns: repeat(7,1fr);
    grid-gap: 2px;

}

.active_day{
      background-color: red;
      opacity: 0.8;
}
.dai{
    
     background-color: aqua;
}










.hoverday{
      opacity: 0.5;
}


.h1-con{
    grid-column: 2 / span 5;
    grid-row: 1/ span 2;
} 
.active_now_day{
      background-color: aquamarine;
}
</style>

 