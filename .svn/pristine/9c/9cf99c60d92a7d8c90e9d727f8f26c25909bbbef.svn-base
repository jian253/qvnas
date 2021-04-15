/**
 * //根据文件后缀判断文件格式图标
 * @param Suffix
 * @returns {string|*}
 */
import Vue from 'vue'
let httpUrl=Vue.prototype.$httpUrl;
//视频后缀
let videoSuffix= ['mp4', 'mkv', 'mov', 'ogg', 'flv', 'm3u8', 'avi']
let imgSuffix=['png','jpg','jpeg','webp','ico']
//默认缩略图
let Default= '/static/images/fileSuffix/misc.png'
export function fileSuffix (Suffix) {
    if (Suffix.imgThumbnail != '' && Suffix.imgThumbnail != null) {
      return httpUrl + Suffix.logicDir + '/' + Suffix.imgThumbnail
    } else if (isVideoSuffix(Suffix.fileExt)) {
      return imgDataList[0].img
    }
    if (imgSuffix.includes(Suffix.fileExt)) {
      return httpUrl + Suffix.logicDir + '/' + Suffix.fileName
    }
    let result = imgDataList.find(item => {
      return item.fileExt == Suffix.fileExt
    })
    if (result == undefined) {
      return Default
    } else {
      return result.img
    }
}
//判断是否是视频后缀
export function isVideoSuffix (value) {
  //includes 用户查找数组中是否包含给定的值，包含为true
  return videoSuffix.includes(value)
}
//文件后缀
let imgDataList= [{
  fileExt: 'mp4',
  img: '/static/images/fileSuffix/mp4.png'
}, {
  fileExt: 'exe',
  img: '/static/images/fileSuffix/exe.png'
}, {
  fileExt: 'html',
  img: '/static/images/fileSuffix/html.png'
}, {
  fileExt: 'misc',
  img: '/static/images/fileSuffix/misc.png'
}, {
  fileExt: 'zip',
  img: '/static/images/fileSuffix/rar.png'
}, {
  fileExt: 'rar',
  img: '/static/images/fileSuffix/rar.png'
}, {
  fileExt: 'mp3',
  img: '/static/images/fileSuffix/mp3.png'
}, {
  fileExt: 'wav',
  img: '/static/images/fileSuffix/mp3.png'
}, {
  fileExt: 'aac',
  img: '/static/images/fileSuffix/mp3.png'
}, {
  fileExt: 'pdf',
  img: '/static/images/fileSuffix/pdf.png'
}, {
  fileExt: 'txt',
  img: '/static/images/fileSuffix/txt.png'
}, {
  fileExt: 'js',
  img: '/static/images/fileSuffix/js.png'
}, {
  fileExt: 'gif',
  img: '/static/images/fileSuffix/ico.png'
}, {
  fileExt: 'xls',
  img: '/static/images/fileSuffix/xls.png'
}, {
  fileExt: 'csv',
  img: '/static/images/fileSuffix/xls.png'
}, {
  fileExt: 'ppt',
  img: '/static/images/fileSuffix/ppt.png'
}, {
  fileExt: 'pptx',
  img: '/static/images/fileSuffix/ppt.png'
}, {
  fileExt: 'rtf',
  img: '/static/images/fileSuffix/rtf.png'
}, {
  fileExt: 'docx',
  img: '/static/images/fileSuffix/rtf.png'
}, {
  fileExt: 'doc',
  img: '/static/images/fileSuffix/rtf.png'
}
]

