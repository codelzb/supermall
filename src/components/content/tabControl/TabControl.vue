<template>
  <div class='tab-control'>
      <div v-for="(item,index) in titles" class="tab-control-item"
       :class="{active:index===currentIndex}" :key="index" @click="itemClick(index)">
        <span>{{item}}</span>
      </div>


  </div>
</template>

<script>
export default {
  name: '',
  props:{
      titles:{
          type:Array,
          default(){
              return[]
          }
      }
  },
  data(){
    return {
        currentIndex:0
    }
  },
  components: {},
  created(){},
  mounted(){},
  methods: {
      itemClick(index){
          this.currentIndex=index;
          this.$emit('tabclick',index)
      }
  }
}
</script >
<style scoped>
.tab-control{
    display: flex;
    text-align: center;
    font-size: 15 px;
    height: 40px;
    line-height: 40px;
    background-color:#fff;
}
.tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;

}
.tab-control-item span{
    padding: 5px;
}
.active{
    color:var(--color-high-text);
    
}
.active span{
    border-bottom: 3px solid var(--color-tint);
}

</style>
