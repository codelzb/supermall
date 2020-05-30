<template>
<!-- ref 一般绑定子组件 -->
  <div class='wrapper' ref="wrapper">
      <div class="content">
           <slot></slot>
      </div>

  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: '',
  props:{
      probeType:{
          type:Number,
          default:1
      },
      pullUpLoad:{
          type:Boolean,
          default:false
      }
  },
  data(){
    return {
        scroll:null
    }
  },
  components: {},
  created(){},
  mounted(){
    //   1 创建bscroll对象
      this.scroll=new BScroll(this.$refs.wrapper,{
        click:true,
        // probeType:3
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad



      })
//  2 监听滚动位置
     this.scroll.on('scroll',(position)=>{
         this.$emit('scroll',position)
     })
    //  3 监听上拉事件
    this.scroll.on('pullingUp',()=>{
        // console.log('加载');
        this.$emit('pullingUp')
        
    })

  },
  methods: {
      scrollTo(x,y,time=300){
          this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
          this.scroll.finishPullUp()
      }
  }
}
</script >
<style scoped>
</style>
