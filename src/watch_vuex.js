export function watchVuex(){
    this.$store.watch(
    (state, getters) => getters.status,
    (newValue, oldValue) => {
    console.log(`Updating from ${oldValue} to ${newValue}`);
     this.$store.days_li.forEach(day => {
                            if(this.$store.getters.finda(day.name , this.now_month_index)){
                                  day.have_day= true
          }
                                  })
    },
)
return
}