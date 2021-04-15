<template>
  <div class="67 Viewer" id="Viewer" style="height: 100%;background-color: #202020" v-if="$store.state['Dialog'].dialogShow.photo_Viewer">
    <viewer
      :trigger="images"
      :options="options"
      class="viewer"
      ref="viewers"
      @inited="inited"
      v-if="images && images.length"
    >
      <img
        v-for="(item) in images"
        class="image"
        :data-source="returnDefaultImg(item,'source')"
        :key="item.fileId"
        :src="returnDefaultImg(item,'thumbnail')"
      />
    </viewer>
  </div>
</template>

<script>
  import Vue from "vue";
  import Viewer from "v-viewer";
  import "viewerjs/dist/viewer.css";

  Vue.use(Viewer);
  export default {
    name: 'PhotoViewer',
    props: {},
    components: {
      // Viewer
    },
    data: function () {
      return {
        errorImg: "this.src='/static/images/errorPageImg/errorImg.png'",//图片错误时展示出来的默认图片地址
        visible: false,
        options: {
          inline: true,
          button: true,
          url: "data-source",
          tooltip: true,
          backdrop: true,
          transition: true,
          toolbar: {
            zoomIn: "large",
            zoomOut: "large",
            oneToOne: "large",
            reset: "large",
            prev: "large",
            play: "large",
            next: "large",
            rotateLeft: "large",
            rotateRight: "large",
          },
          zIndexInline: 2017,
          zIndex: 9999
        },
        index: 0,
        images: [],
      }
    },
    computed: {},
    watch: {},
    methods: {
      returnDefaultImg (item, key) {
        var _this = this;
        var img = new Image();
        img.src = item[key];
        img.onload = function () {
          if (this.complete == true) {
            img = null;
          }
        }
        img.onerror = function () {
          _this.$set(item, key, '/static/images/errorPageImg/errorImg.png')
          img = null;
        }
        return item[key];
      },
      inited (viewer) {
        this.$viewer = viewer;
        this.$viewer.view(this.index);
      },
      view (index) {
        this.index = index;
        this.$viewer.view(this.index);
      },
      show (images, index) {
        this.images = images;
        this.index = index;
        this.visible = true;
      }
    },
    mounted () {
      // $('.viewer-fullscreen').hide()
      this.$EventBus.$on('PreviewParams', (item) => {
        this.index = item
      })
    },
    created () {

    },
    filters: {}
  }
</script>

<style scoped lang="less">
  @deep: ~'>>>';

  .image {
    display: none;
  }

  .viewer-list {
    display: flex !important;
  }

  @{deep}.popupwindow_content {
    padding: 0 !important;
  }

</style>
<style>
  .viewer-loading > img {
    /*margin: 0 auto;*/
    display: none; /* hide big images when it is loading */
  }
</style>
