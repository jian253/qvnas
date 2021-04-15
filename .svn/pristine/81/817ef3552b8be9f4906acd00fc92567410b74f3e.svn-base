<template>
  <!--选择搜索内容-->
  <div class="selectSearchContent" v-show="showSelect" >
    <ul >
      <li :class="{selectClass:index==current}" @click="toggleSearchContent(index,item)" :key="index"
          v-for="(item,index) in selectSearchImages" v-cloak>
        <span  :style="{'backgroundImage':'url('+item.url+')'}"></span>
        {{item.title}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "searchItem",
    props: {
      showSelect: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        current: 4,
        //搜索选择内容数据
        selectSearchImages: [{
          id:5,
          title:this.$t('search.document'),
          url: '/static/images/deskTopGlobalSearch/option1.png',
          url2: '/static/images/deskTopGlobalSearch/option11.png',
          url1: '/static/images/deskTopGlobalSearch/option1.png',
        }, {
          id:3,
          title: this.$t('search.photo'),
          url: '/static/images/deskTopGlobalSearch/option2.png',
          url2: '/static/images/deskTopGlobalSearch/option22.png',
          url1: '/static/images/deskTopGlobalSearch/option2.png',
        }, {
          id:2,
          title: this.$t('search.music'),
          url: '/static/images/deskTopGlobalSearch/option3.png',
          url2: '/static/images/deskTopGlobalSearch/option33.png',
          url1: '/static/images/deskTopGlobalSearch/option3.png',
        }, {
          id:1,
          title: this.$t('search.video'),
          url: '/static/images/deskTopGlobalSearch/option4.png',
          url2: '/static/images/deskTopGlobalSearch/option44.png',
          url1: '/static/images/deskTopGlobalSearch/option4.png',
        }, {
          id:4,
          title: this.$t('search.all'),
          url: '/static/images/deskTopGlobalSearch/option5.png',
          url2: '/static/images/deskTopGlobalSearch/option55.png',
          url1: '/static/images/deskTopGlobalSearch/option5.png'
        },],
      }
    }, methods: {
      //点击搜索里的下拉菜单之后隐藏下拉菜单
      toggleSearchContent (index, item) {
        this.current = index
        for (let i = 0; i < this.selectSearchImages.length; i++) {
          this.selectSearchImages[i].url=this.selectSearchImages[i].url1
        }
        this.selectSearchImages[index].url=this.selectSearchImages[index].url2
        this.$emit('change',this.selectSearchImages[index],false)
        this.$emit('isLoading')
      },
    },
    created () {
      this.toggleSearchContent(this.current)
    }
  }
</script>

<style scoped lang="less">
  /*选择搜索内容*/
  .selectSearchContent {
    /*display: none;*/
    width: 190px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
    border: 1px solid #BCC4CC;
    border-radius: 6px;
    position: absolute;
    top: 41px;
    left: 10px;
    z-index: 99999;
  }

  .selectSearchContent ul li {
    line-height: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    font-size: 13px;
    color: #707880;
  }

  .selectSearchContent ul li:hover {
    background-color: rgba(230, 245, 255, 1);
    color: deepskyblue;
  }

  .selectSearchContent ul li span {
    width: 22px;
    height: 20px;
    margin: 9px 20px 0 18px;
  }

  .selectSearchContent ul li:nth-child(1):hover span {
    background-image: url("/static/images/deskTopGlobalSearch/option11.png") !important;
  }

  .selectSearchContent ul li:nth-child(2):hover span {
    background: url("/static/images/deskTopGlobalSearch/option22.png") !important;
  }

  .selectSearchContent ul li:nth-child(3):hover span {
    background: url("/static/images/deskTopGlobalSearch/option33.png") !important;
  }

  .selectSearchContent ul li:nth-child(4):hover span {
    background: url("/static/images/deskTopGlobalSearch/option44.png") !important;
  }

  .selectSearchContent ul li:nth-child(5):hover span {
    background: url("/static/images/deskTopGlobalSearch/option55.png") !important;
  }

  .selectClass {
    color: deepskyblue !important;
  }
</style>
