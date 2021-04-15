<template>
  <div class="globalSearch" v-show="isShow">
    <div class="container">
      <!--全局搜索框-->
      <div class="Search_box">
        <div v-cloak class="optionIco" @click="showSearchContent">
          <span :style="{'backgroundImage':'url('+selectSearchList.url+')'}"></span>
        </div>
        <div class="Search_input">
          <el-input
            ref="search"
            :placeholder="searchNow"
            v-model="searchValue"
            @input="searchThrottle"
            @focus="search_input"
          >
          </el-input>
        </div>
        <div class="loading_ico" v-loading="showLoadin"></div>
      </div>
      <transition name="el-zoom-in-center">
        <div class="search_result" v-show="search_result">
          <div class="search-left">
            <div>
              <ul>
                <li class="search_result_item text_color text_size">{{$t('search.correlationMatch')}}</li>
                <li v-for="(item,index) in SearchResult" :key="index"
                    :class="{item_active:item.isActive,search_result_item:'search_result_item'}"
                    @click="itemClick(item,index)" @dblclick="item_dbclick(item)">
                  <div class="content_item">
                    <div class="item_img">
                      <img :src="fileType(item)" :onerror="errorImg">
                    </div>
                    <span class="text_color text_size item_fileName">{{item.fileName}}</span>
                    <!--                    <span class="result_icon"></span><span></span>-->
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="search-view" v-show="showBigPicture">
            <div class="view_box">
              <div class="Big">
                <img :src="suffix" class="BigPicture" :onerror="errorImg">
              </div>
              <div class="fileInfo">
                <div class="fileInfos_text">
                  <div class="text_color " style="font-weight: bold">{{current.fileName}}</div>
                  <div class="text_color ">{{$t('file.fileSize')}} : {{current.fileSize}}</div>
                  <div class="text_color ">{{$t('file.creationTime')}} : {{current.callTime}}</div>
                  <div class="text_color ">{{$t('file.fileFormat')}} : {{current.fileExt}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <search-item :showSelect="showSelect" @change='changeSearch_ico' @isLoading="loadingEvent"></search-item>
      <div class="search-error" v-if="showError">{{error}}</div>
    </div>
  </div>
</template>

<script>
  import {debounce} from "@common/common/debounceAndThrottle";
  import searchItem from "@/components/globalSearch/searchItem/searchItem";
  import {fileFind} from "@api/file/fileContact"
  import {fileSuffix} from "@common/js/fileType/fileType"
  import {GL_SEARCH_JUMP_FILE} from "@/store/mutation-typess"

  export default {
    name: "searchBox",
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    components: {
      searchItem
    },
    watch: {
      isShow: function (value) {
        if (!value) {
          this.showSelect = false
        } else {
          this.$nextTick(function () {
            this.$refs['search'].$el.children[0].focus()
          })
        }
      },
      searchValue: function (value) {
        if (value.trim().length != 0) {
          this.showLoadin = true
        } else {
          this.showLoadin = false
        }
      }
    },
    data: function () {
      return {
        selectSearchList: {
          title: this.$t('search.all'),
          url: '/static/images/deskTopGlobalSearch/option55.png'
        },
        errorImg: "this.src='/static/images/fileSuffix/ico.png'",//图片错误时展示出来的默认图片地址
        searchNow: this.$t('search.searchNow'),
        //全局搜索
        searchValue: '',
        searchFileType: 4,
        showSelect: false,
        SearchResult: [{
          fileExt: 'exe',
          fileName: '2312'
        }],
        search_result: false,
        showLoadin: false,
        error: this.$t('reminder.searchError'),
        showError: false,
        suffix: '',
        current: [],
        showBigPicture: false
      }
    },
    methods: {
      search_input () {
        //鼠標鍵入消失
        this.showSelect = false
      },
      item_dbclick (item) {
        this.$store.commit('glSearch_jump_file', item)
      },
      itemClick (item, index) {
        this.SearchResult.forEach(item => {
          item.isActive = false
        })
        this.SearchResult[index].isActive = true
        this.current = item
        this.suffix = fileSuffix(item)
      },
      fileType (item) {
        return fileSuffix(item)
      },
      async triggerSearch () {
        this.SearchResult = []
        if (this.searchValue.trim().length == 0) {
          return this.search_result = false
        }
        let {data: res} = await fileFind({
          fileName: this.searchValue,
          fileType: this.searchFileType
        })
        if (res.data.length != 0) {
          this.search_result = true
        } else {
          this.showLoadin = false
          return this.search_result = false
        }
        this.SearchResult = res.data
        this.SearchResult.forEach((item, index) => {
          item.fileSize = this.$options.filters['filterSize'](item.fileSize)
          item.isActive = false
        })
        if (res.code == 200) {
          this.showLoadin = false
          this.SearchResult[0].isActive = true
          this.current = this.SearchResult[0]
          this.suffix = fileSuffix(this.current)
          this.showBigPicture = true
        } else {
          this.showError = true
        }
      },
      searchThrottle: debounce('triggerSearch', 800, false),
      //显示搜索内容
      showSearchContent () {
        this.showSelect = !this.showSelect
      },
      changeSearch_ico (item, isShowSelect) {
        this.searchFileType = item.id
        this.showSelect = isShowSelect
        this.selectSearchList.url = item.url2
        this.searchNow=this.$t('search.searchNow')
        this.searchNow += ' '+item.title
        this.searchThrottle()
      },
      loadingEvent () {
        if (this.searchValue.trim().length !== 0) {
          return this.showLoadin = true
        }
      }

    }

  }
</script>

<style scoped lang="less">
  @deep: ~'>>>';

  /*三角*/
  .globalSearch .optionIco::before {
    content: '';
    position: absolute;
    top: 22px;
    left: 49px;
    width: 0;
    height: 0;
    border-width: 5px 5px 0px 5px; /*可设置方向*/
    border-color: #7B848C transparent;
    border-style: solid;
  }

  .globalSearch .optionIco:hover::before {
    border-color: #6b737b transparent;
  }

  /*全局搜索样式*/
  .globalSearch {
    box-sizing: border-box;
    position: fixed !important;
    top: 23%;
    left: 50%;
    width: 688px;
    /*max-height: 460px;*/
    /*min-height: 48px;*/
    opacity: 1;
    transform: translate(-50%);
    /*overflow: hidden;*/
    z-index: 9999;
    border-radius: 7px;
    border: 1px solid #eee;
    cursor: pointer;
    box-shadow: 1px 4px 2px rgba(0, 0, 0, .4);
    /*padding-left: 76px;*/
    background: #fff;
    transition: linear .5s;

    .container {
      position: relative;

      .Search_box {
        height: 48px;
      }

      .search_result {
        cursor: default;
        display: flex;
        height: 400px;
        overflow: hidden;
        background-color: #fff;
        border-top: 2px solid #7FC2F2;
        border-bottom-left-radius: 7px;
        border-bottom-right-radius: 7px;

        .search-left {
          width: 286px;
          height: 100%;
          overflow-y: auto;
          border-right: 2px solid #E6EBF0;
        }

        .search-view {
          position: relative;
          flex: 1;
          height: 400px;

          .view_box {
            width: 100%;
            position: absolute;
            top: 20%;
            left: 50%;
            text-align: center;
            transform: translate(-50%);

            .Big {
              margin: auto;
              width: 161px;
            }
          }

          .BigPicture {
            width: 100%;
            display: inline-block;
            vertical-align: middle;
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 1);
            margin-bottom: 10px;
          }

          .fileInfo {
            width: 100%;

            .fileInfos_text {
              width: 340px;
              display: flex;
              flex-direction: column;
              margin-left: 30px;
              padding-left: 92px;
              box-sizing: border-box;

              div {
                height: 28px;
                line-height: 28px;
                font-size: 12px;
                /*width: 200px;*/
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }

      .search_result_item {
        height: 30px;
        width: 260px;
        margin: auto;
        cursor: pointer;
        border-radius: 3px;

        .content_item {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;

          .item_fileName {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 200px;
          }
        }

        .item_img {
          display: inline-block;
          height: 16px;
          width: 16.73px;
          margin: 0 6px 0 8px;

          img {
            height: 100%;
            width: 100%;
          }
        }
      }

      .item_active {
        background-color: #0086E5;

        span {
          color: #fff;
        }
      }

      .result_icon {

      }

      .search-error {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #7B848C;
        font-size: 14px;
      }
    }

  }

  .Search_box {
    display: flex;
    height: 48px;

    .optionIco {
      height: 100%;
      width: 76px;
      line-height: 34px;
      background-color: #fff;
      border-bottom-left-radius: 7px;
      border-top-left-radius: 7px;

      span {
        margin-left: 15px;
        height: 20px;
        width: 22px;
        display: inline-block;
        vertical-align: bottom;
      }
    }

    .Search_input {
      flex: 1;
    }

    .loading_ico {
      width: 40px;
      height: 48px;
      line-height: 53px;
    }

    .loading_ico @{deep}.el-loading-spinner .circular {
      height: 26px;
      width: 26px;
    }

    .loading_ico @{deep}.el-loading-spinner .path {
      stroke-width: 3;
      stroke: #058BEB;
    }
  }


  .globalSearch @{deep}.el-input, .globalSearch @{deep}.el-input__inner {
    width: 100%;
    height: 100%;
    border: 0;
    font-size: 14px !important;
    padding: 0 !important;
  }
</style>
