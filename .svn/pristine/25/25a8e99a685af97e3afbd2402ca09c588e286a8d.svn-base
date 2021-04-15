<template>
  <div :class="[container(size),'btn-box']">
          <span :class="isType(type,disable)">
            <button type="button" @click="clickEvent($event,disable)" :style="FontColor(type,disable)">
              <slot>
                  {{$t('common.yes')}}
              </slot>
            </button>
          </span>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'white'
      },
      disable: {
        type: Boolean,
        default: false
      },
      size:{
        type:String,
        default:'small'
      }
    },
    components: {},
    data: function () {
      return {}
    },
    computed: {},
    watch: {},
    methods: {
      clickEvent (e,disabled) {
        if (disabled==true){
          return
        }
        this.$emit('click', e)
      },
      FontColor (types) {
        if (types == 'blue') {
          return 'color:#fff'
        } else if (types == 'red') {
          return 'color:#fff'
        } else if (types == 'white') {
          return 'color: #505A64'
        }
      },
      isType (types, disabled) {
        if (types == 'blue'&&disabled==false) {
          return 'blue'
        } else if (types == 'red'&&disabled==false) {
          return 'red'
        } else if (types == 'white'&&disabled==false) {
          return 'white'
        } else if (types == 'blue' && disabled == true) {
          return 'blue disabledBlue'
        } else if (types == 'red' && disabled == true) {
          return 'red disabledRed'
        } else if (types == 'white' && disabled == true) {
          return 'white disabledWhite'
        }
      },
      container(sizes){
        if (sizes=='small'){//小
            return 'small'
        }else if (sizes=='mini'){//迷你
            return 'mini'
        }else if (sizes=='medium'){//大
          return 'medium'
        }else if (sizes=='adapt'){//自适应
          return 'adapt'
        }
      }
    },
    filters: {}
  }
</script>

<style scoped lang="less">
  .btn-box > span {
    display: inline-block;
    height: 26px;
    /*width: 82px;*/
    box-sizing: border-box;
    text-align: center;
    border-radius: 3px;
    user-select: none;
  }
  .small{
    min-width: 52px;
    width:auto;
  }
  .mini{
    min-width: 30px;
    width:auto;
  }
  .medium{
    min-width: 84px;
    width:auto;
  }
  .adapt{
    width: auto;
  }
  .btn-box {
    display: inline-block;
    height: 28px;
    margin-right: 6px;

    .white {
      width: 100%;
      height: 100%;
      border: solid 1px #C8D2DC;
      background-image: linear-gradient(#f5faff, #ebf0f5);
      background-color: #EBF0F5;
    }

    .white:hover {
      border: solid 1px #B4BEC8;
      background-image: linear-gradient(#f5faff, #e7ecf1);
      background-color: #E7ECF1;
    }

    .white:active {
      border: solid 1px #B4BEC8;
      background-image: linear-gradient(#ebf0f5, #e1e6eb);
      background-color: #E1E6EB;
    }

    .disabledWhite {
      border: solid 1px #C8D2DC !important;
      background-image: linear-gradient(#f5faff, #f0f5fa) !important;
      background-color: #F0F5FA !important;
    }

    .disabledWhite button {
      cursor: default !important;
      color: #96A0AA !important;
    }

    .blue {
      width: 100%;
      height: 100%;
      border: solid 1px #1687D9;
      background-image: linear-gradient(#32AAFF, #1994EB);
      background-color: #1994EB;
    }

    .blue:hover {
      border: solid 1px #07c;
      background-image: linear-gradient(#25A4FF, #028AEB);
      background-color: #028AEB;
    }

    .blue:active {
      border: solid 1px #07c;
      background-image: linear-gradient(#1897F2, #0182DF);
      background-color: #0182DF;
    }

    .disabledBlue {
      border: solid 1px #1687D9 !important;
      background-image: linear-gradient(#32AAFF, #1994EB) !important;
      background-color: #1994EB !important;
    }

    .disabledBlue button {
      cursor: default !important;
      color: #99D4FF !important;
    }

    .red {
      width: 100%;
      height: 100%;
      border: solid 1px #D14949;
      background-image: linear-gradient(#FA7070, #EB5F5F);
      background-color: #EB5F5F;
    }

    .red:hover {
      border: solid 1px #C43B38;
      background-image: linear-gradient(#F96868, #DF4848);
      background-color: #DF4848;
    }

    .red:active {
      border: solid 1px #C43B38;
      background-image: linear-gradient(#E85656, #D94646);
      background-color: #D94646;
    }

    .disabledRed {
      border: solid 1px #D14949 !important;
      background-image: linear-gradient(#FA7070, #EB5F5F) !important;
      background-color: #EB5F5F !important;
    }

    .disabledRed button {
      cursor: default !important;
      color: #F5A1A1 !important
    }

    button {
      width: 100%;
      display: inline-block;
      outline: none;
      /* width: 26px; */
      line-height: 1;
      height: 100%;
      background-color: transparent;
      border: 0;
      font-size: 12px;
      /*color: #fff;*/
      cursor: pointer;
    }
  }
</style>
