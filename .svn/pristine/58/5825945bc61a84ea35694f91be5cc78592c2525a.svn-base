<template>
  <div>
    <div v-cloak class="dropdown-container" v-closeLayer="outsideClose">
      <span class="box1"><button @click="handleClick"
                                 :style="{'background':'url('+url+')','backgroundPosition':position}"></button></span>
      <span class="box2" id="box2" @click="isShow=!isShow"><button></button></span>
    </div>

    <ul class="dropdown-m" id="dropdown" ref="ViewDropdown" v-show="isShow" v-cloak>
      <li @click="onclicks(0)">
        <span class="icon1 icon"></span> {{$t('title.listView')}}
      </li>
      <li @click="onclicks(1)">
        <span class="icon2 icon"></span> {{$t('title.tiledView')}}
      </li>
      <li @click="onclicks(2)">
        <span class="icon3 icon"></span> {{$t('title.smallIcon')}}
      </li>
      <li @click="onclicks(3)">
        <span class="icon4 icon"></span> {{$t('title.middleIcon')}}
      </li>
      <li @click="onclicks(4)">
        <span class="icon5 icon"></span> {{$t('title.bigIcon')}}
      </li>
    </ul>
  </div>

</template>

<script>
  export default {
    props: {},
    components: {},
    data: function () {
      return {
        isShow:false,
        flag: 0,
        url: '/static/images/global/sprite-sf4679593a0.png',
        position: '-118px -145px',
        positions: [{
          title: this.$t('title.listView'),
          url: '/static/images/global/sprite-sf4679593a0.png',
          position: "-118px -145px"
        }, {
          title: this.$t('title.tiledView'),
          url: '/static/images/global/sprite-sf4679593a0.png',
          position: "-118px -217px"
        }, {
          title: this.$t('title.smallIcon'),
          url: '/static/images/global/sprite-sf4679593a0.png',
          position: "-118px -289px"
        }, {
          title: this.$t('title.middleIcon'),
          url: '/static/images/global/sprite-sf4679593a0.png',
          position: "-118px -361px"
        }, {
          title: this.$t('title.bigIcon'),
          url: '/static/images/global/sprite-sf4679593a0.png',
          position: "-118px -433px"
        }]
      }
    },
    computed: {},
    watch: {
      isShow(val){
        console.log(val)
      }
    },
    methods: {
      outsideClose() {
        this.isShow = false
      },
      handleClick () {
        this.flag++
        if (this.flag === 5) {
          this.flag = 0
        }
        if (this.flag == 0) {
          this.url = this.positions[0].url
          this.position = this.positions[0].position
        } else if (this.flag == 1) {
          this.url = this.positions[1].url
          this.position = this.positions[1].position
        } else if (this.flag == 2) {
          this.url = this.positions[2].url
          this.position = this.positions[2].position
        } else if (this.flag == 3) {
          this.url = this.positions[3].url
          this.position = this.positions[3].position
        } else if (this.flag == 4) {
          this.url = this.positions[4].url
          this.position = this.positions[4].position
        }
        this.$emit('SwitchView', this.flag)
      },
      onclicks (index) {
        this.isShow=false
        this.$emit('SwitchView', index)
        this.flag = index
        this.url = this.positions[index].url
        this.position = this.positions[index].position
      }
    },
    filters: {},
    mounted () {
    },
    // directives: {
    //   closeDropDown: {
    //     bind(el, binding, vnode) {
    //       console.log(el)
    //       function documentHandler(e) {
    //         if (el.contains(e.target)) {
    //           return false
    //         }
    //         if (binding.expression) {
    //           binding.value(e)
    //         }
    //       }
    //
    //       function KeyUp(e) {
    //         if (e.keyCode == 27) {
    //           if (binding.expression) {
    //             binding.value(e)
    //           }
    //         }
    //       }
    //       el.__vueClickOutSize__ = documentHandler
    //       el.__vueKeyup__ = KeyUp
    //
    //       document.addEventListener('keyup', KeyUp)
    //       document.addEventListener('click', documentHandler)
    //     },
    //     unbind(el, binding) {
    //       document.removeEventListener('click', el.__vueClickOutSize__)
    //       delete  el.__vueClickOutSize__
    //
    //       document.removeEventListener('keyup', el.__vueKeyup__)
    //       delete  el.__vueKeyup__
    //     }
    //   }
    // },
  }
</script>

<style scoped lang="less">
  .dropdown-container:hover {
    background-image: linear-gradient(#f5faff, #ebf0f5);
    background-color: #EBF0F5;
    border: solid 1px #B4BEC8;
  }

  .dropdown-container:active {
    background-image: linear-gradient(#ebf0f5, #e6ebf0);
    background-color: #E6EBF0;
  }

  .dropdown-container {
    box-sizing: border-box;
    background-image: linear-gradient(#f5faff, #f0f5fa);
    background-color: #F0F5FA;
    border: solid 1px #C8D2DC;
    width: 57px;
    height: 28px;
    border-radius: 3px;
    display: flex;

    .box1 {
      box-sizing: border-box;
      display: inline-block;
      height: 100%;
      /*margin-top: 3px;*/

      width: 32px;
      border-right: 1px solid #C8D2DC;

      button {
        margin-left: 3px;
        margin-top: 2px;
        width: 24px;
        height: 24px;
        padding-right: 22px;
      }
    }

    .box2 {
      background-image: url("/static/images/fileManager/bt_dropdown.png");
      background-repeat: no-repeat;
      background-position: top center;
      display: inline-block;
      height: 100%;
      width: 23px;

      button {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
  }

  .dropdown-m {
    position: fixed;
    z-index: 9999;
    list-style: none;
    margin-top: 10px;
    padding: 10px;
    font-size: 20px;
    border: 0px solid black;
    float: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    background: #fff;
  }

  .icon {
    margin-right: 5px;
    text-decoration: none;
    color: #505A64;
    /* padding: 10px; */
    width: 20px;
    height: 20px;
    display: inline-block;
  }

  .dropdown-m .icon:hover {
    color: #fff;
  }

  .icon1 {
    background: url("/static/images/global/sprite-sf4679593a0.png") -118px -145px;
  }

  .icon2 {
    background: url("/static/images/global/sprite-sf4679593a0.png") -118px -217px;
  }

  .icon3 {
    background: url("/static/images/global/sprite-sf4679593a0.png") -118px -289px;
  }

  .icon4 {
    background: url("/static/images/global/sprite-sf4679593a0.png") -118px -361px;
  }

  .icon5 {
    background: url("/static/images/global/sprite-sf4679593a0.png") -118px -433px;
  }

  .dropdown-m li {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 2px 8px;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    color: #505A64;
    text-overflow: ellipsis;
  }

  .dropdown-m li:hover {
    background: #0086E5;
    color: #fff;
  }

  #dropdown li:nth-child(1):hover span {
    background-position: -118px -169px;
  }

  #dropdown li:nth-child(2):hover span {
    background-position: -118px -241px;
  }

  #dropdown li:nth-child(3):hover span {
    background-position: -118px -314px;
  }

  #dropdown li:nth-child(4):hover span {
    background-position: -118px -385px;
  }

  #dropdown li:nth-child(5):hover span {
    background-position: -118px -457px;
  }

  .content {
    margin: 40px;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background-color: transparent;
  }

  .show {
    display: block;
  }
</style>
