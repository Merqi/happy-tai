<template>
  <div id="app">
    <transition :name="transitionName">
        <keep-alive include="Login">
            <router-view></router-view>
        </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      transitionName:''
    }
  },
  watch:{
    $route(to,from){
      // console.log(to,from)
      if(to.meta.index > from.meta.index){
        this.transitionName = 'slide-left'
      }else{
        this.transitionName = 'slide-right'
      }
    }
  }
}
</script>

<style lang="stylus">
#app
  width 100%
  height 100%
</style>
