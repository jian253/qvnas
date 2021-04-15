
export const deafaultBackImgListData=[
  {
    thumbnail:'/static/images/desktop_bg/thumbnail_01.jpg',
    fileName:'Wallpaper1',
    backdropImg:'/static/images/desktop_bg/backImg_01.jpg',
    mapperBackdropImg:'/static/images/desktop_bg/backImg_01.jpg',
  },
  {
    thumbnail:'/static/images/desktop_bg/thumbnail_02.jpg',
    fileName:'Wallpaper2',
    backdropImg:'/static/images/desktop_bg/backImg_02.jpg',
    mapperBackdropImg:'/static/images/desktop_bg/backImg_02.jpg',
  },
  {
    thumbnail:'/static/images/desktop_bg/thumbnail_03.jpg',
    fileName:'Wallpaper3',
    backdropImg:'/static/images/desktop_bg/backImg_03.jpg',
    mapperBackdropImg:'/static/images/desktop_bg/backImg_03.jpg',
  },
  {
    thumbnail:'/static/images/desktop_bg/thumbnail_04.jpg',
    fileName:'Wallpaper4',
    backdropImg:'/static/images/desktop_bg/backImg_04.jpg',
    mapperBackdropImg:'/static/images/desktop_bg/backImg_04.jpg',
  },
  {
    thumbnail:'/static/images/desktop_bg/thumbnail_05.jpg',
    fileName:'Wallpaper5',
    backdropImg:'/static/images/desktop_bg/backImg_05.jpg',
    mapperBackdropImg:'/static/images/desktop_bg/backImg_05.jpg',
  },
  {
    thumbnail:'/static/images/desktop_bg/thumbnail_06.jpg',
    fileName:'Wallpaper6',
    backdropImg:'/static/images/desktop_bg/backImg_06.jpg',
    mapperBackdropImg:'/static/images/desktop_bg/backImg_06.jpg',
  },
  {
    thumbnail:'/static/images/desktop_bg/thumbnail_07.jpg',
    fileName:'Wallpaper7',
    backdropImg:'/static/images/desktop_bg/backImg_07.jpg',
    mapperBackdropImg:'/static/images/desktop_bg/backImg_07.jpg',
  },
  {
    thumbnail:'/static/images/desktop_bg/thumbnail_08.jpg',
    fileName:'Wallpaper7',
    backdropImg:'/static/images/desktop_bg/backImg_08.jpg',
    mapperBackdropImg:'/static/images/desktop_bg/backImg_08.jpg',
  }
];
export function leftImgTabData (_this) {
  return[
    {
      icon:'/static/images/userSet/icon_image_selector.png',
      backgrounPosition:'0 0',
      text:_this.$t('desktop.myImage'), //我的图像
      index:0
    },
    {
      icon:'/static/images/userSet/icon_image_selector.png',
      backgrounPosition:'0 -16px',
      text:_this.$t('desktop.defaultWallpaper'),//"默认壁纸"
      index:1
    }
  ];
}
export function backgroundImgStyleListData(_this){
  return [
    {
      value: 0,
      label:_this.$t('desktop.filling')// '填充'
    }, {
      value: 1,
      label:_this.$t('desktop.centered') //'居中'
    }, {
      value: 2,
      label:_this.$t('desktop.suitable') //'最合适'
    }, {
      value: 3,
      label:_this.$t('desktop.stretch') //'拉伸'
    }, {
      value: 4,
      label:_this.$t('desktop.tiled') //'平铺'
    }
  ];
}

