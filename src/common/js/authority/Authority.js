import store from "@/store";
/**
 * @Description: 如果需要新增共享文件夹或者共享文件夹id发生改变可直接修改下面变量
 * @author kai
 * @date 2021/2/23 14:41
 */
export const sharedParent='shared'
export let sharedParentId=store.state.AuthorityParentId    //'751'
export const sharedFolderName=['video', 'photo', 'audio', 'other'] //根据路径判断当前要操作的路径是否在里面 ['/shared','/shared/video', '/shared/photo', '/shared/audio', '/shared/other']
export const KeepName=['video', 'photo', 'audio', 'other','shared']//创建用户时保留该字段
// export let sharedFolderId=store.state.AuthorityId //['752','753','754','755']

//防止共享文件夹被删除  禁止在/shared新建文件夹  上传文件到共享文件目录下不需要此操作
export function sharedFolderInvalid (data) {
  // console.log(data)
  if (data.trueFile){
    return false
  }
  return store.state.AuthorityId.includes(data.menuId)
  // data.menuId
}
//防止在共享文件夹进行操作
export function sharingProhibited (data) {
  // console.log(data)
 return (data.menuId == store.state.AuthorityParentId && data.folderName == sharedParent);
 // return (data.menuId == sharedParentId && data.folderName == sharedParent);
}
//只读权限判断  3不允许 上传 删除 修改 下载
export function rightToJudge (data,_this) {
  // console.log(data)
  let paths=null
  let path=null
  if (data.trueFile){
    paths = data.path.substr(15, 7)//截取路径 '/shared'
    path = data.path.substr(23, 5)//截取路径 ''
  }else {
    paths =data.path.substr(0, 7)
    path = data.path.substr(8, 5)
  }
  let index = sharedFolderName.indexOf(path)
  return !(paths == '/'+sharedParent && _this.sharedFolder[index] === 3);
}
