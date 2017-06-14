<template>
    <div class="">
        <transition name="slide-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'content',
        data () {
            return {
                
            }
        },
        methods:{
            
        },
        created(){
            
        },
        mounted(){

        }
    }
</script>

<style scoped lang='less'>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s
    }
    
    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-active {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
