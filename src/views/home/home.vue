<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" 
    @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">

      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      @tabclick="tabclick">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  
  </div>
</template>

<script>
import HomeSwiper from'./childComps/homeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList'


import {getHomeMultidata,getHomeGoods} from "network/home"
import Scroll from 'components/common/scroll/scroll.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

export default {
  name: 'home',
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},

      },
      isShowBackTop:true,
      currentType:'pop'

    }
  },
  components: {

    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

  },
  created(){
    // 1 请求多个数据
      this.getHomeMultidata()
      // 2.请求商品数据
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')
  },
  mounted(){},
  methods: {
/*事件监听的方法
*/
  tabclick(index){
    switch(index){
      case 0:
        this.currentType='pop'
        break
      case 1:
        this.currentType='new'
        break
      case 2:
        this.currentType='sell'
        break
    }
  },
  backClick(){
    this.$refs.scroll.scrollTo(0,0)
  },
  contentScroll(position){
    this.isShowBackTop=-position.y>1000
    // 监听滚动

    
  },
  loadMore(){
    this.getHomeGoods(this.currentType)
    this.$refs.scroll.finishPullUp()

    // 重新获取高度
    this.$refs.scroll.scroll.refresh()
  },




/*事件监听的方法*/
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
          // console.log(res);
          this.banners=res.data.banner.list
          this.recommends=res.data.recommend.list

        }
      )
      },
      getHomeGoods(type){
        const page=this.goods[type].page+1
         getHomeGoods(type,page).then(res=>{
        //  console.log(res);
         this.goods[type].list.push(...res.data.list)
         this.goods[type].page+=1

      })
      }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list

    }
  }


}
</script>
<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 42px;
  z-index: 9;
}
.content{
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left:0;
  right:0;
}
</style>
