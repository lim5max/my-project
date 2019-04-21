export function watchVuex(){
    this.$store.watch(
    (state, getters) => getters.status,
    (newValue, oldValue) => {
    console.log(`Updating from ${oldValue} to ${newValue}`);
    console.log(this.$store.state.daysLi)
     this.$store.state.daysLi.forEach(day => {
                            if(this.$store.getters.finda(day.name , this.now_month_index)){
                                  day.have_day= true
          }
                                  })
    },
)
return
}