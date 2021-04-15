<template>
  <div class="2 file" v-if="fileManage_Panel">
    <div class="file-tab">
      <!--导航栏头部-->
      <div class="file-nav">
        <div class="file-left">
          <gl-button-style type="white" size="mini" @click.stop="buttonBefore_Rear(1)" :disable="buttonRear"><span
            class="iconfont  icon-8_qianjinhoutui1"></span></gl-button-style>
          <gl-button-style type="white" size="mini" @click.stop="buttonBefore_Rear(0)" :disable="buttonBefore"><span
            class="iconfont  icon-8_qianjinhoutui"></span></gl-button-style>
          <gl-button-style type="white" size="mini" @click.stop="globalUpdete(true)"><span
            class="btn iconfont  icon-ziyuan"></span></gl-button-style>
        </div>
        <div class="file-input-box">
          <div class="file-input">
            <div class="file-input-Switch">
              <div :class="{'file-input-Switch-container':true,'initPath0':trueHidePathListShow==false}"
                   v-if="trueShowPathType=='0'">
                <el-dropdown class="showHideListBtnDropdown" placement="bottom-start" trigger="click"
                             @command="hidePathListDeal" v-show="trueHidePathListShow==false">
                  <span class="showHideListBtn"></span>
                  <el-dropdown-menu slot="dropdown" class="showHideListBtnDropdownList">
                    <el-dropdown-item v-for="(item,index) in hidePathArray" :command="item" :key="index">
                      {{item.folderName}}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <div class="file-input-border-show"
                     @click.stop="inputBar">
                  <ul>
                    <li v-if="index==reversePathArray.length-1" v-for="(item,index) in reversePathArray" :key="index"
                        class="path-style showLi lastLi">
                      <span class="path" @click.stop="clickPath(item,index)">{{item.folderName}}</span>
                    </li>
                    <li v-else v-show="item.show!=false"
                        :class="{'path-style':true,'showLi':true,'prevLi':true,'hideLi':item.hidden==true}">
                      <span class="path" @click.stop="clickPath(item,index)">{{item.folderName}}</span>
                      <i class="iconfont icon-you"></i>
                    </li>
                    <li style="display: flex ;height:28px;width: 50px;flex-shriSwitch-viewnk: 0;"></li>
                  </ul>
                </div>
              </div>
              <div class="file-input-Switch-container" v-if="trueShowPathType=='1'">
                <el-autocomplete
                  ref="inputVal"
                  @blur="loseFocus"
                  class="inline-input inputbox"
                  v-model="path"
                  :fetch-suggestions="pathSearch"
                  @select="selectSearchList"
                  autocomplete="off"
                  popper-class="pathSearchListCalss"
                  :trigger-on-focus="false"
                ></el-autocomplete>
              </div>
              <div class="file-input-Switch-container" v-if="trueShowPathType=='2'">
                <div class="searchResultAddress file-input-border-show"
                >
                  {{$t('common.searchResults')+':'+oldFileObj.path+$t('file.allSubFiles')}}
                  <!--                  搜索结果(所有子文件夹)-->
                </div>
              </div>
            </div>
            <div class="file-input-Favorites">
              <button></button>
            </div>
          </div>
        </div>
        <div class="file-right">
          <el-input v-model="Inquire" :placeholder="$t('common.search')" prefix-icon="iconfont icon-chazhao2"
                    size="small" clearable
                    @input="searchResult_throttle"></el-input>
        </div>
      </div>
      <!--按钮组-->  <!---->
      <div class="file-btnList">
        <el-dropdown trigger="click" placement="bottom-start" class="el_dropdown_Class">
          <span class="el-dropdown-link" @click.stop="BtnUpload">
            {{$t('file.upload')}}
            <!--       上传-->
            <i class="iconfont icon-xiala2"></i>
      </span>
          <el-dropdown-menu slot="dropdown" class="dropdowns fixed-el-dropdown-menu">
            <el-dropdown-item v-if="rightTabType==0">
              <el-upload
                action="#"
                class="upload-demo menuEnable"
                style="width: 100%"
                :http-request="BtnUploadFile"
                :on-success="handleUploaded"
                :before-upload="handlebefore"
                ref="Success"
                :file-list="fileList"
                :show-file-list="false"
              >
                <i class="iconfont icon-shangchuan iconStyle"> <span
                  style="font-size: 12px">{{$t('file.uploadFiles')}}</span></i><!--上传文件-->
              </el-upload>
            </el-dropdown-item>
            <el-dropdown-item v-else style="">
              <i class="iconfont icon-shangchuan menuDisable " style="display: block;width: 100%;height: 100%"> <span
                style="font-size: 12px">{{$t('file.uploadFiles')}}</span></i>
            </el-dropdown-item>
            <!--            <el-dropdown-item class="iconfont icon-shangchuan">上传-覆盖</el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click" placement="bottom-start" @command="newBtnClickFolder">
      <span class="el-dropdown-link">
        {{$t('user.add')}}<!--新增--><i class="iconfont icon-xiala2"></i>
      </span>
          <el-dropdown-menu slot="dropdown" class="dropdowns fixed-el-dropdown-menu">
            <el-dropdown-item v-if="rightTabType==0" command="a"><span
              style="font-size: 12px" class="iconfont icon-xinjianwenjianjia1 iconStyle"></span><span class="text_size">{{$t('file.createFolder')}}
              <!--新建文件夹--></span>
            </el-dropdown-item>
            <el-dropdown-item v-else command="b" style="background-color: transparent;color: #96A0AA;cursor: default">
              <span class="iconfont icon-xinjianwenjianjia1 menuDisable iconStyle" style="width: 16px"></span>
              <span class="text_size">{{$t('file.createFolder')}} <!--新建文件夹--></span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click" placement="bottom-start" @command="OperationFolder">
      <span class="el-dropdown-link">
        {{$t('common.operating')}}<!--操作--><i class="iconfont icon-xiala2"></i>
      </span>
          <el-dropdown-menu slot="dropdown"
                            :class="uploadedFolder==null||rightTabType==1?'dropdown dropdowns fixed-el-dropdown-menu':'dropdowns fixed-el-dropdown-menu'">
            <el-dropdown-item
              :class="[`${(PreviewIsDisable==false||this.currentHighlight==null)?'menuDisable':'menuEnable'}`]"
              command="e"><span class="iconfont icon-yulantupian iconStyle"></span><span class="text_size">{{$t('file.preview')}}
              <!--预览--></span>
            </el-dropdown-item>
            <el-dropdown-item
              :class="[`${(playVideoIsDisable==false||this.currentHighlight==null)?'menuDisable':'menuEnable'}`]"
              command="a"><span class="iconfont icon-bofang2 iconStyle"></span><span class="text_size">{{$t('file.play')}}
              <!--播放--></span>
            </el-dropdown-item>
            <el-dropdown-item
              :class="[`${(this.currentHighlight==null)?'menuDisable':'menuEnable'}`]"
              command="b"><span
              class="iconfont icon-shanchu1 iconStyle"></span> <span class="text_size">{{$t('user.delete')}}
              <!--删除--></span>
            </el-dropdown-item>
            <el-dropdown-item
              :class="[`${(this.currentHighlight==null)?'menuDisable':'menuEnable'}`]"
              command="c"><span
              class="iconfont icon-zhongmingming iconStyle"></span><span class="text_size">{{$t('file.rename')}}
              <!--重命名--></span>
            </el-dropdown-item>
            <!--            <el-dropdown-item class="iconfont icon-shuxing"><span>属性</span></el-dropdown-item>-->
            <el-dropdown-item
              :class="[`${(currentHighlight==null||downloadIsDisable==false)?'menuDisable':'menuEnable'}`]"
              command="d">
              <span class="iconfont icon-xiazai2 iconStyle"></span><span class="text_size">{{$t('file.download')}}
              <!--下载--></span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="Switch-view">
          <gl-dropdown @SwitchView="switchDisplay"></gl-dropdown>
        </div>
      </div>
    </div>
    <div class="file-content">
      <div :class="{'file-content-left':true ,'fadeIn':isMenuLoad}">
        <div class="el-tree-node__content tree-title" @click.stop="isShowDrop">
          <i class="el-tree-node__expand-icon el-icon-caret-right tree-title-icon" @click.stop="isShowDrop"></i><span
          class="tree-title-text">QV-nas</span>
        </div>
        <div class=showContainer id="showContainer">
          <el-tree :data="folderList"
                   ref="treeRef"
                   :props="defaultProps"
                   :check-on-click-node="true"
                   node-key="menuId"
                   :highlight-current="true"
                   :default-expanded-keys="currentNodes"
                   :current-node-key="pathId"
                   :expand-on-click-node="true"
                   @node-contextmenu="rightClickMenu"
                   @node-click="handleNodeClick"
                   icon-class="folder-close"
          >
            <span class="custom-tree-node" slot-scope="{node,data }">
              <span  :class="{'el-tree-node__expand-icon':true,'el-icon-caret-right':data.children.length>0,'el-icon-caret-none':data.children.length==0,'expanded':node.expanded==true} ">
              </span>
              <i v-if="node.expanded==true" class="icon iconfont folderStatus openFolderStatus" >&#xe63a;</i>
              <i v-else class="icon iconfont folderStatus closeFolderStatus">&#xe639;</i>
              <span class="el-tree-node__label">{{ data.folderName }}</span>
           </span>
            <!--:auto-expand-parent="true"-->
          </el-tree>
          <!--右击tree菜单-->
          <vue-context-menu class="right-menu rightMenu"
                            :target="contextMenuTarget"
                            :show.sync="contextMenuVisible"
                            ref="contextMenuREF">
            <div>
              <div class="Drop-down-style  Drop-down-style1 firstDropDown">[{{uploadedFolder.folderName}}]
              </div>
            </div>
            <div>
              <div @click.stop="newFolderWindow(1)" class="Drop-down-style"><span
                class="iconfont icon-xinjianwenjianjia1"> </span>{{$t('file.createFolder')}} <!--新建文件夹-->
              </div>
            </div>
            <div v-if="uploadedFolder.parentId!=0">
              <div @click.stop="delFolderOrFile(1)" class="Drop-down-style"><span
                class="iconfont icon-shanchu1"></span>{{$t('user.delete')}}<!--删除-->
              </div>
            </div>
            <div>
              <el-upload
                class="upload-demo menuEnable"
                action="#"
                :http-request="BtnUploadFile"
                :show-file-list="false"
                ref="uploadFiles"
                :on-success="handleUploaded"
                :on-error="onerror"
                :before-upload="handlebefore"
                :file-list="fileList">
                <div @click="hideMenu" class="Drop-down-style">
                  <span class="iconfont icon-shangchuan"></span> {{$t('file.upload')}}
                  <!--上传-->
                </div>
              </el-upload>
            </div>
            <div v-if="uploadedFolder.parentId!=0">
              <div class="Drop-down-style"
                   @click.stop="fileOrFolderRenameWindow"><span
                class="iconfont icon-zhongmingming"></span>{{$t('file.rename')}}<!--重命名-->
              </div>
            </div>
          </vue-context-menu>
        </div>
      </div>
      <div class="borderRight" v-Drag>
      </div>
      <!--@update:show="(show) => contextMenuVisible1 = show"-->
      <div class="file-content-right" id="file-content-right">
        <!--右击table显示菜单-->
        <VueContextMenu class="right-menu"
                        :target="contextMenuTarget1"
                        v-if="rightTabType!=1"
                        :show.sync="contextMenuVisible1"
                        ref="contextMenu1REF"
        >
          <div v-show="playVideoIsDisable==true">
            <div class="menuEnable Drop-down-style"
                 @click.stop="playVideoIsDisable && playVideoFun()"><span class="iconfont icon-bofang2"></span>{{$t('file.play')}}
              <!--播放-->
            </div>
          </div>
          <div v-show="PreviewIsDisable==true">
            <div class="menuEnable Drop-down-style"
                 @click.stop="PreviewIsDisable && dbclickInitListTableRow(uploadedFolder)">
              <span class="iconfont icon-yulantupian"></span>{{$t('file.preview')}}<!--预览-->
            </div>
          </div>
          <div v-show="newWindowIsDisable==true">
            <div class="menuEnable Drop-down-style"
                 @click.stop="newWindowIsDisable && _blakViewWinowFun()"><span
              class="iconfont icon-tianjiaxinyemian"></span>{{$t('file.openInaNewTab')}}<!--在新选项卡中打开-->
            </div>
          </div>
          <div>
            <div class="Drop-down-style" @click.stop="newFolderWindow(currentHighlight==null?1:0)"><span
              class="iconfont icon-xinjianwenjianjia1"></span>{{$t('file.createFolder')}} <!--新建文件夹-->
            </div>
          </div>
          <div v-if="uploadedFolder.trueFile==false">
            <el-upload
              class="Drop-down-style upload-demo"
              action=""
              :http-request="uploadFile"
              :show-file-list="false"
              :on-success="handleUploaded"
              ref="upload"
              :file-list="fileList"
              :on-error="onerror"
              :before-upload="handlebefore"
            >
              <div @click="hideMenu" class="right_upload_title">
                <!--如果是文件则禁用上传-->
                <span class="iconfont icon-shangchuan"></span>{{$t('file.uploadTo')}}<!--上传至-->
                {{uploadedFolder.folderName}}
              </div>
            </el-upload>
          </div>
          <div v-else>
            <div class="Drop-down-style menuDisable" style="height: 100%;"><span
              class="iconfont icon-shangchuan"></span>{{$t('file.uploadTo')}}<!--上传至-->
            </div>
          </div>
          <div>
            <div :class="[`${currentHighlight==null?'menuDisable':'menuEnable'} Drop-down-style`]"
                 @click.stop="delFolderOrFile"><span class="iconfont icon-shanchu1"></span>{{$t('user.delete')}}
              <!--删除-->
            </div>
          </div>
          <div>
            <div :class="[`${currentHighlight==null?'menuDisable':'menuEnable'} Drop-down-style`]"
                 @click.stop="fileOrFolderRenameWindow"><span class="iconfont icon-zhongmingming"></span>{{$t('file.rename')}}
              <!--重命名-->
            </div>
          </div>
          <div>
            <div
              :class="[`${currentHighlight==null||downloadIsDisable==false?'menuDisable':'menuEnable'} Drop-down-style`]"
              @click.stop="downloadIsDisable && downloadFile()"><span class="iconfont icon-xiazai2"></span>{{$t('file.download')}}
              <!--下载-->
            </div>
          </div>
        </VueContextMenu>
        <!--右击空白处-->
        <!--@update:show="(show) => contextMenuVisible2 = show"-->
        <VueContextMenu class="right-menu RightMenu"
                        :target="contextMenuTarget2"
                        v-if="rightTabType!=1"
                        :show.sync="contextMenuVisible2"
                        ref="contextMenu2REF"
        >
          <div v-show="playVideoIsDisable==true">
            <div class="menuEnable Drop-down-style"
                 @click.stop="playVideoIsDisable && playVideoFun()"><span class="iconfont icon-bofang2"></span>{{$t('file.play')}}
              <!--播放-->
            </div>
          </div>
          <div v-show="PreviewIsDisable==true">
            <div class="menuEnable Drop-down-style"
                 @click.stop="PreviewIsDisable && dbclickInitListTableRow(uploadedFolder)">
              <div><span class="iconfont icon-yulantupian"></span>{{$t('file.preview')}}<!--预览--></div>
            </div>
          </div>
          <div v-show="newWindowIsDisable==true">
            <div class="menuEnable Drop-down-style"
                 @click="newWindowIsDisable && _blakViewWinowFun()"><span class="iconfont icon-tianjiaxinyemian"></span>{{$t('file.openInaNewTab')}}
              <!--在新选项卡中打开-->
            </div>
          </div>
          <div>
            <div class="Drop-down-style" @click.stop="newFolderWindow(currentHighlight==null?1:0)"><span
              class="iconfont icon-xinjianwenjianjia1"></span>{{$t('file.createFolder')}} <!--新建文件夹-->
            </div>
          </div>
          <div v-if="uploadedFolder.trueFile==false"><!--uploadedFolder.trueFile==false-->
            <el-upload
              class=" Drop-down-style upload-demo"
              action=""
              :http-request="uploadFile"
              :show-file-list="true"
              :on-success="handleUploaded"
              ref="uploadFiless"
              :on-error="onerror"
              :before-upload="handlebefore"
              :file-list="[]"
            >
              <!--<div style="height: 35px;padding: 0 20px"></div>-->
              <div @click="hideMenu" class="right_upload_title">
                <span class="iconfont icon-shangchuan"></span>{{$t('file.uploadTo')}}<!--上传至-->
                {{uploadedFolder.folderName}}
              </div>
            </el-upload>
          </div>
          <div v-else>
            <div class="Drop-down-style menuDisable" style="height: 100%;"><span
              class="iconfont icon-shangchuan"></span>{{$t('file.uploadTo')}}<!--上传至-->
            </div>
          </div>
          <div>
            <div :class="[`${currentHighlight==null?'menuDisable':'menuEnable'} Drop-down-style`]"
                 @click.stop="delFolderOrFile"><span class="iconfont icon-shanchu1"></span>{{$t('user.delete')}}
              <!--删除-->
            </div>
          </div>
          <div>
            <div :class="[`${currentHighlight==null?'menuDisable':'menuEnable'} Drop-down-style`]"
                 @click.stop="fileOrFolderRenameWindow"><span class="iconfont icon-zhongmingming"></span>{{$t('file.rename')}}
              <!--重命名-->
            </div>
          </div>
          <div>
            <div
              :class="[`${currentHighlight==null||downloadIsDisable==false?'menuDisable':'menuEnable'} Drop-down-style`]"
              @click.stop="downloadIsDisable && downloadFile()"><span class="iconfont icon-xiazai2"></span>{{$t('file.download')}}
              <!--下载-->
            </div>
          </div>
        </VueContextMenu>
        <div class="blank blank-zindex" ref="blankRef" @click="leftClickBlank"
             @contextmenu.stop="isDisabledMenu && rightClickBlank($event)"></div>
        <gl-load-animation :is-load-show="isLoad" :is-show-mask="true" v-if="rightTabType==0"></gl-load-animation>
        <gl-load-animation :is-load-show="isLoad" :is-show-mask="true" v-if="rightTabType==1"></gl-load-animation>

        <div class="file-list-container initListContainer" ref="tableContainerRef" v-if="rightTabType==0"
             @click="isTriggerClick && selectInitListTableRow(null)">
          <div v-show="initListSortType!=0" class="teild-display-container" @click="leftClickBlank"
               @contextmenu="rightClickBlank">
            <ul v-show="initListSortType==1||initListSortType==2||initListSortType==3||initListSortType==4"
                :class="{'container-file':true,'container-file-1':initListSortType==1,'container-file-2':initListSortType==2,'container-file-3':initListSortType==3,'container-file-4':initListSortType==4}">
              <li v-show="isShowFolderLoad==false" :class="{items:true,'fadeIn':true} "
                  v-for="(item,index) in saveFileList"
                  :key="index" @click.stop="selectInitListTableRow(item,index)"
                  @dblclick.stop="dbclickInitListTableRow(item)"
                  @contextmenu="contentListRightMenu(item,null,$event)"
                  @mouseleave="tooltipOut($event)">
                <div class="itemsBorder" v-if="item.trueFile==true">
                  <div class="itemsHover">
                    <img class="img" :src="iconSuffix(item)" :onerror="errorImg">
                  </div>
                  <div class="text" @mouseenter="tooltipOver($event,item)">{{item.fileName}}</div>
                </div>
                <div class="itemsBorder" v-if="item.trueFile==false">
                  <div class="itemsHover">
                    <img class="img" :onerror="errorImg" src="/static/images/fileSuffix/folder.png" alt="">
                  </div>
                  <div class="text" @mouseenter="tooltipOver($event,item)">{{item.folderName}}</div>
                </div>
              </li>
              <li v-show="isShowFolderLoad==true&&(initListSortType!=1&&initListSortType!=0)"
                  v-for="(item2,index2) in saveFileList" :key="`load${index2}`" class="FolderLoad">
                <span style="display:none;">{{item2}}</span>
                <div class="itemsHover">
                  <img src="/static/images/global/loadGif.gif" alt="" class="imgs">
                </div>
              </li>
              <!--填充格子-->
              <li
                :class="{items:true,'copyitems':true}"
                v-for="(item3,index3) in showListAlternate" :key="`copySearchList${index3}`"
              >
                <span>{{item3.val}}</span>
              </li>
            </ul>
          </div>
          <div v-show="initListSortType==0" class="table-display-container">
            <!--table表格-->
            <el-table
              fixed
              class="initListTable"
              :data="saveFileList"
              style="width: 100%;"
              @row-click="selectInitListTableRow"
              @row-dblclick="dbclickInitListTableRow"
              highlight-current-row
              border
              height="100%"
              ref="tableStatusRef"
              @row-contextmenu="contentListRightMenu"
              @current-change="getHighlight"
            >
              <el-table-column
                prop="fileName"
                :label="$t('user.name')"
                align="left"
                :show-overflow-tooltip="true">
                <template slot-scope="saveFileList">
                  <img v-if="saveFileList.row.trueFile==true" class="img" :src="iconSuffix(saveFileList.row)"
                       :onerror="errorImg">
                  <img v-if="saveFileList.row.trueFile==false" class="img" :onerror="errorImg"
                       src="/static/images/fileSuffix/folder.png"
                  >
                  <span>{{saveFileList.row.fileName}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="fileSize"
                :label="$t('common.size')"
                align="right"
                :show-overflow-tooltip="true">
                <template slot-scope="saveFileList">
                  <span v-if="saveFileList.row.trueFile==true">
                    {{saveFileList.row.fileSize|filterSize}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="fileExt"
                :label="$t('file.fileType')"
                align="left"
                :show-overflow-tooltip="true">
                <template slot-scope="saveFileList">
                  <div v-if="saveFileList.row.trueFile==true">
                    {{saveFileList.row.fileExt.toLocaleUpperCase()+' '+$t('file.file')}}<!--文件-->
                  </div>
                  <div v-else>{{$t('file.folder')}}<!--文件夹--></div>
                </template>
              </el-table-column>
              <el-table-column
                prop="updateTime"
                :label="$t('file.modifiedDate')"
                align="right"
                :show-overflow-tooltip="true">
                <template slot-scope="saveFileList">
                  {{saveFileList.row.updateTime}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!--搜索-->
        <div class="file-list-container searchListContainer" v-if="rightTabType==1">
          <div v-show="searchListSortType!=0" class="teild-display-container">
            <ul v-show="searchListSortType==1||searchListSortType==2||searchListSortType==3||searchListSortType==4"
                :class="{'container-file':true,'container-file-1':searchListSortType==1,'container-file-2':searchListSortType==2,'container-file-3':searchListSortType==3,'container-file-4':searchListSortType==4}">
              <li v-if="isShowFolderLoad==false"
                  :class="{items:true,'fadeIn':true,'checkedActiveFile':item.active==undefined?false:item.active}"
                  v-for="(item,index) in dealTreeResultList"
                  :key="index" @click.stop="selectSearchListTableRow(item)"
                  @dblclick.stop="clickSearchResultFile(item)"
                  @mouseleave.stop="tooltipOut($event)">
                <div class="itemsBorder" v-if="item.trueFile==true">
                  <div class="itemsHover">
                    <img class="img" :src="iconSuffix(item)" :onerror="errorImg">
                  </div>
                  <div class="text" @mouseenter.stop="tooltipOver($event,item)">{{item.fileName}}</div>
                </div>
                <div class="itemsBorder" v-if="item.trueFile==false">
                  <div class="itemsHover">
                    <img class="img" :onerror="errorImg" src="/static/images/fileSuffix/folder.png" alt=""
                         @dblclick.stop="clickSearchResultFile(item)">
                  </div>
                  <div class="text" @mouseenter.stop="tooltipOver($event,item)">{{item.folderName }}</div>
                </div>
              </li>
              <li v-show="isShowFolderLoad==true&&(initListSortType!=1&&initListSortType!=0)"
                  v-for="(item2,index2) in saveFileList" :key="`load${index2}`" class="FolderLoad">
                <span style="display:none;">{{item2}}</span>
                <img src="/static/images/global/loadGif.gif" alt="" class="imgs">
              </li>
              <!--填充格子-->
              <li
                :class="{items:true,'copyitems':true}"
                v-for="(item3,index3) in searchListAlternate" :key="`copyInitList${index3}`"
              >
                <span>{{item3.val}}</span>
              </li>
            </ul>
          </div>
          <div v-show="searchListSortType==0" class="table-display-container">
            <el-table
              class="searchListTable"
              fixed
              :data="dealTreeResultList"
              style="width: 100%;"
              height="100%"
              @row-click="selectSearchListTableRow"
              @row-dblclick="dbclickSearchListTableRow"
              highlight-current-row
              border
              ref="resultRef"
            >
              <el-table-column
                prop="fileName"
                :label="$t('user.name')"
                align="left"
                :show-overflow-tooltip="true">
                <template slot-scope="dealTreeResultList">
                  <img v-if="dealTreeResultList.row.trueFile==true" class="img"
                       :src="iconSuffix(dealTreeResultList.row)" :onerror="errorImg">
                  <img v-if="dealTreeResultList.row.trueFile==false" :onerror="errorImg" class="img"
                       src="/static/images/fileSuffix/folder.png"
                       alt=""
                       @dblclick.stop="clickSearchResultFile(item)">
                  <span>{{dealTreeResultList.row.fileName}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="fileSize"
                :label="$t('common.size')"
                align="right"
                :show-overflow-tooltip="true">
                <template slot-scope="dealTreeResultList">
                  <span v-if="dealTreeResultList.row.trueFile==true">
                    {{dealTreeResultList.row.fileSize|filterSize}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="fileExt"
                :label="$t('file.fileType')"
                align="left"
                :show-overflow-tooltip="true">
                <template slot-scope="dealTreeResultList">
                  <div v-if="dealTreeResultList.row.trueFile==true">
                    {{dealTreeResultList.row.fileExt.toLocaleUpperCase()+' '+$t('file.file')}}<!--文件-->
                  </div>
                  <div v-else>{{$t('file.folder')}}<!--文件夹--></div>
                </template>
              </el-table-column>
              <el-table-column
                prop="updateTime"
                :label="$t('file.modifiedDate')"
                align="right"
                :show-overflow-tooltip="true">
                <template slot-scope="dealTreeResultList">
                  {{dealTreeResultList.row.updateTime}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="alarm-footer">
          <div class="alarm-footer-right">
            <span class="alarm-footer-right-text" v-show="rightTabType==0">{{saveFileList.length+' '+$t('common.items')}}</span>
            <span class="alarm-footer-right-text" v-show="rightTabType==1">{{dealTreeResultList.length+' '+$t('common.items')}}
              <!--个项目--></span>
            <span style="width: 1px;height: 23px;border-left: 1px solid #ccc;margin-top: 2px"></span>
            <span class="alarm-footer-right-icon iconfont icon-ziyuan" :title="$t('common.refresh')"
                  @click="footerRefresh"></span><!--刷新-->
          </div>
        </div>
      </div>
    </div>
    <!--警告对话框-->
    <gl-warning-dialog :is-show="showWarning" @warningDialogClose="warningClose">
      <template>
        <span>{{errorMessage}}</span>
      </template>
    </gl-warning-dialog>
    <!--删除对话框-->
    <gl-warning-dialog :is-show="showDelete" icon="caveat" :cancel-btn="true" @warningDialogCancel="cancelEvent"
                       @warningDialogClose="determineEvent">
      <template>
        <span>{{$t('reminder.delete')}}</span><!--是否确定要删除-->
      </template>
    </gl-warning-dialog>
    <!--鼠标文件或文件夹经过显示的title-->
    <gl-tooltip :isShow="showTile" :coordinate="coordinate" @change="tooltipOut" ref="tooltipRef">
      <template>
        <div>{{$t('user.name')}}: {{TooltipInfo.name}}</div><!--名称-->
        <div v-show="TooltipInfo.type==true">{{$t('file.creationTime')}}: {{TooltipInfo.creationTime}}</div><!--创建时间-->
        <div v-show="TooltipInfo.type==true">{{$t('common.size')}}: {{TooltipInfo.size|filterSize}}</div><!--大小-->
      </template>
    </gl-tooltip>
  </div>
</template>

<script>
  let timeout = null
  let timeout1 = null
  let timeout2 = null
  let timeout3 = null
  let loseFocusTimer = null;//搜索下拉框失去焦点
  import Vue from 'vue'
  import {mapState} from 'vuex'
  // import {createNamespacedHelpers} from 'vuex'
  // const {mapState, mapMutations} = createNamespacedHelpers('file')
  import {debounce} from '@common/common/debounceAndThrottle'
  import axios from 'axios'
  import {component as VueContextMenu} from '@xunlei/vue-context-menu'
  import {fileCheck, fileDelete, fileList, updateFile} from '@api/file/fileContact'
  import {folderMenu, folderRemove, folderPath} from '@api/folder/folderContact'
  import {fileSuffix, isVideoSuffix} from "@common/js/fileType/fileType"
  import {findFolderPath, assign_compatible} from "@common/js/publicMethod/publicMethod"
  import {
    rightToJudge,
    sharedFolderInvalid,
    sharingProhibited, sharedParent
  } from "@common/js/authority/Authority"

  export default {
    name: 'FileMenu',
    props: ['isShowUploads'],
    components: {VueContextMenu},
    data: function () {
      return {
        //权限id
        sharedFolder: [],    //1  2  3 禁止 可读写 只读
        TooltipInfo: {
          type: '',
          name: '',
          creationTime: '',
          updateTime: '',
          size: ''
        },
        showTile: false,
        coordinate: {top: 0, left: 0},
        // isShowTreeMenu: false,//是否显示右击tree菜单
        // isShowContentMenu: false, //是否在右击空白处显示菜单
        errorImg: "this.src='/static/images/fileSuffix/ico.png'",//图片错误时展示出来的默认图片地址
        httpUrl: this.$httpUrl,
        trueShowPathType: 0,//0 path  1 搜索路径  2 搜索结果
        // 文件请求参数
        folderList: [],
        defaultProps: {
          // children: 'children',
          label: 'folderName'
        },
        fileList: [],
        //路径数组
        pathArray: [{menuId: '1', folderName: 'root'}],
        reversePathArray: [],//处理过隐藏属性值的路径列表
        hidePathArray: [],//隐藏的路径列表
        trueHidePathListShow: true,//是否展示隐藏的列表
        //路径 / /格式
        path: "/root",
        //当前选中的node节点
        pathId: 1,
        //当前展开的node节点
        currentNodeArray: [],
        //node节点
        currentNodes: [],
        //存储点击过的路径
        pathDirectory: [],
        //控制前进按钮禁用状态
        buttonBefore: true,
        buttonRear: true,
        //存储文件列表数据
        saveFileList: [],
        //存储点击节点时的状态
        isStatic: [],
        //是否显示加载动画
        isLoad: false,
        isShowFolderLoad: false,
        //控制刷新动画是否显示
        isMenuLoad: false,
        //标志位
        Sign: null,
        //控制切换树标题的状态
        flag: null,
        initFilterList: [],//筛选初始列表
        //是否显示搜索结果DOM 节点
        treeResult: {
          menuId: "99999999",
          parentId: "0",
          trueFile: false,
          folderName: this.$t('common.searchResults'),/*搜索结果*/
          children: [],
          fileName: this.$t('common.searchResults'),
          treeType: 1,
          path: '/root'
        },
        initTreeNode: null,
        //当前的dom节点
        nowFileObj: {//新增的自定义属性
          path: '/root',//拼接路径
          treeType: 0,//0 treeDom  1 searchTreeDom
          trueFile: false,//是否是文件
        },
        //搜索前的节点
        oldFileObj: {//新增的自定义属性
          path: '/root',//拼接路径
          treeType: 0,//0 treeDom  1 searchTreeDom
          trueFile: false,//是否是文件
          trueDelete: 0,//需要考虑该节点是否被删除   0 未删除 ，找到当前节点查询数据，清除搜索内容时，返回到当前节点   // 1被删除 不再进行数据查询 将查询结果列表重置[]  清除搜索内容时，停留在搜索结果节点，不跳转
        },
        dealTreeResultFolderList: [],//用来处理平铺文件夹数据
        dealTreeResultList: [],//用来处理排序好的查询结果列表
        rightTabType: 0,//0 文件及文件夹展示列表 1文件及文件夹跳转路径 即搜索结果列表
        //控制输入查询输入时往tree push节点的次数
        nodeFrequency: 0,
        //文件查询 默认值
        Inquire: null,
        prevList: [],//后退列表
        nextList: [],//下一个列表
        // ClickTreeOrTableList: null,//判断右击的是树还是table
        showDelete: false,//是否显示删除对话框
        showWarning: false,//是否显示警告对话框
        fileSize: 0,
        nameLength: 0,
        Is_it_allowed: true,
        initListSortType: 0,//树节点列表展示方式 0 列表展示 1平铺展示 2小图标 3 中图标   4大图标
        searchListSortType: 0,//树节点列表查询结果 0 列表展示 1平铺展示 2小图标 3 中图标   4大图标
        initListSortTypeArr: [0, 1, 2, 3, 4],
        searchListSortTypeArr: [0, 1, 2, 3, 4],
        nowInitSelectRow: null,//初始列表 用于保存无论任何展示方式，选中的数据
        nowSearchSelectRow: null,//搜索列表 用于保存无论任何展示方式，选中的数据
        Unfold: 1,//展开标志 第一次获取不将root push到展开数组,
        music: {//音乐播放器弹框
          menuId: "66",
          parentId: "",
          children: [],
          menuName: "",
          orderNum: 66,
          isFixed: 0,
          isParent: true,
          inputText: "New Group",
          url: "/static/images/desktop/music.png",
          isStyle: true
        },
        PhotoViewer: {//图片预览弹框参数
          menuId: "67",
          parentId: "",
          children: [],
          menuName: "",
          isFixed: 0,
          orderNum: 67,
          isParent: true,
          inputText: "New Group",
          url: "/static/images/desktop/PhotoViewer_32.png",
          isStyle: true
        },
        contextMenuTarget: null, // 可右键区域，这里也可以绑定$refs
        contextMenuVisible: false,
        contextMenuTarget1: null,//表格
        contextMenuVisible1: false,
        contextMenuTarget2: null,//空白
        contextMenuVisible2: false,
        isTriggerClick: true,//是否触发点击事件
        currentHighlight: null,//table当前高亮的元素
        uploadedFolder: [],//存储操作事件对象
        FolderData: null,
        newWindowIsDisable: true,//新选项卡事件是否触发
        playVideoIsDisable: true,//播放按钮是否禁用
        PreviewIsDisable: true,//预览按钮是否禁用
        downloadIsDisable: true,//下载是否禁用
        nodeId: [],
        isShowUpload: true,//是否启用上传按钮
        // persent:null,
        // contextMenuTree: document.body,//是否显示右击content list菜单
        saveUploadFileList: [],
        errorMessage: '',//错误信息
        isNewNameOrNewFolder: '',//用来判断是重命名还是新建文件夹
        isDisabledMenu: true,//是否禁用右击空白或单击空白处显示菜单事件
        showListAlternate: [],//用来替补列表空缺div
        searchListAlternate: [],//用来替补列表空缺div
        source: ''
      }
    },
    computed: {
      ...mapState('Dialog', {
        fileManage_Panel: state => state.dialogShow.fileManage_Panel
      }),
      ...mapState({
        currentAuthority: state => state.currentAuthorityList,
        currentUserInfo: state => state.currentUserInfo,
        sharedParentId: state => state.AuthorityParentId,
        allSearchState: state => state.search_obj
      })
    },
    watch: {
      //监听全局搜索
      allSearchState (obj) {
        this.allSearchDeal(obj);
      },
      //监听vuex中userNumber的变化
      fileManage_Panel (val) {
        if (val) {
          this.sharedFolder = this.currentAuthority
          this.$nextTick(() => {
            this.initLoadFun();//初始加载方法
          });
        } else {
          this.initData()
        }
      },
      //监听当前tree选中的状态
      pathId: function (id) {
        if (this.$store.state.Dialog.dialogShow.fileManage_Panel !== false) {
          this.$refs.treeRef.setCurrentKey(id)
        }
      },
      //监听节点数据变化 重新点击节点时清空状态
      isStatic: function (value) {
        value = []
      },
      pathArray: {
        handler (val) {
          this.reversePathArray = JSON.parse(JSON.stringify(this.pathArray));
          this.$nextTick(() => {
            try {
              this.resizePathShow();//自适应长度
            } catch (e) {
            }
          });
        },
        deep: true
      },
      prevList: {
        handler (newList, oldList) { //特别注意，不能用箭头函数，箭头函数，this指向全局
          // console.log(newList)
          if (newList.length < 2) {
            this.buttonRear = true
          } else {
            this.buttonRear = false
          }
        },
        deep: true  // 可以深度检测到 obj 对象的属性值的变化
      },
      nextList: {
        handler (newList, oldList) { //特别注意，不能用箭头函数，箭头函数，this指向全局
          // console.log(newList)
          this.buttonBefore = newList.length < 2;
        },
        deep: true  // 可以深度检测到 obj 对象的属性值的变化
      },
      saveFileList: {
        handler (newName, oldName) {
          // console.log(newName)
          this.dealAlterNate();
        },
        deep: true
      },
      dealTreeResultList: {
        handler (newName, oldName) {
          this.dealAlterNate();
        },
        deep: true
      },
      currentHighlight: function (value) {
        this.currentHighlight = value
      },
      rightTabType: function (value) {
        let _this = this;
        if (value == 1) {//说明是搜索结果 只允许右击表格显示右击菜单
          this.currentHighlight = null
          this.uploadedFolder = this.$refs.treeRef.getCurrentNode();
          $(".active_items_style").removeClass("active_items_style")
        } else {
          this.Inquire = "";
        }
        this.$nextTick(() => {
          this.dealAlterNate();
        });
      },
      initListSortType: function (value) {
        this.searchListSortType = value;
        this.dealAlterNate();
      },
      searchListSortType: function (value) {
        this.initListSortType = value;
        this.dealAlterNate();
      },
      contextMenuVisible: function (val) {
        if (val) {
          this.$nextTick(() => {
            this.dealContextMenuPositionFun('contextMenuREF');
          });
        }
      },
      contextMenuVisible1: function (val) {
        if (val) {
          this.$nextTick(() => {
            this.dealContextMenuPositionFun('contextMenu1REF');
          });
        }
      },
      contextMenuVisible2: function (val) {
        if (val) {
          this.$nextTick(() => {
            this.dealContextMenuPositionFun('contextMenu2REF');
          });
        }
      }
    },
    methods: {
      async allSearchDeal(obj){
        if (obj != null&&this.folderList[0]&&this.folderList[0].menuId) {
          let {data: res} = await folderPath({
            path: obj.filePath
          })
          if (res.code == 200) {
            this.$nextTick(()=>{
              this.handleNodeClick(res.data, 0)
            });
          } else if (res.code == 4001) {
            this.errorMessage = this.$t('reminder.deleteFrequency')
            this.showWarning = true
          } else {
            this.errorMessage = this.$t('reminder.searchError')
            this.showWarning = true
          }
          this.$store.commit('glSearch_jump_file', null)
        }
      },
      async initLoadFun () {//初始加载方法
        let _this = this;
        await this.getFolderData();
        this.contextMenuTarget = this.$refs.treeRef.$el
        this.contextMenuTarget1 = this.$refs.tableContainerRef
        this.contextMenuTarget2 = this.$refs.blankRef
        this.$EventBus.$on('deleteItem', (indexs, type) => {
          // console.log('执行次数')
          if (type == 1) {
            // console.log('清空了')
            this.saveUploadFileList = indexs;
          } else {
            // console.log('删除一个')
            this.saveUploadFileList.forEach((item, index) => {
              if (item.index == indexs) {
                this.saveUploadFileList.splice(index, 1)
              }
            })
          }
        });
        //用来处理绑定事件失效
        this.$nextTick(() => {
          $("#file-content-right").resize(function () {
            _this.dealAlterNate();
            //计算路径导航栏
            _this.resizePathShow();//自适应长度
            /* var sumWidth=0;
             $("file-input-border-show>ul>li").each((index,ele)=>{
             sumWidth=$(ele).width()+sumWidth;
             });
             if(sumWidth>$(".file-input-border-show").width()){
             //代表开始溢出

             }*/
          });
          window.addEventListener('resize', () => {
            _this.contextMenuVisible1 = false;
            _this.contextMenuVisible2 = false;
            _this.contextMenuVisible = false;
          });
          this.OpenFolderInit();
        });
      },
      async initData () {
        await this.$parent.$parent.$refs.uploadRef.closeFileManage();//在重新赋值前 取消掉还在上传的文件
        await assign_compatible()
        Object.assign(this.$data, this.$options.data.call(this))
      },
      dealContextMenuPositionFun (refName) {
        try {
          let getWidth = $(this.$refs[refName].$el).width() + 2;
          let getHeight = $(this.$refs[refName].$el).height() + 2;
          let getLeft = this.$refs[refName].x;
          let getTop = this.$refs[refName].y;
          if ((getWidth + getLeft) > $(window).width()) {
            getLeft = $(window).width() - getWidth;
          }
          if (getTop > $(window).height() - getHeight) {
            getTop = $(window).height() - getHeight;
          }
          this.$refs[refName].x = getLeft;
          this.$refs[refName].y = getTop;
          this.$refs[refName].style.left = getLeft + "px";
          this.$refs[refName].style.top = getTop + "px";
        } catch (e) {
        }
      },
      dealAlterNate () {
        this.$nextTick(() => {
          let dealContainerWidth = $("#file-content-right").width() + 10;
          let dealArr = [];
          let dealWidthArr = [0, 0, (66 + 20 + 20), (24 + 24 + 128), (30 + 30 + 258)];
          let getLength = this.rightTabType == 1 ? this.dealTreeResultList.length : this.saveFileList.length;
          let dealListSortType = this.rightTabType == 1 ? this.searchListSortType : this.initListSortType;
          if (dealContainerWidth != undefined && dealContainerWidth >= 470 && (dealListSortType == 2 || dealListSortType == 3 || dealListSortType == 4)) {
            let rowNum = parseInt(dealContainerWidth / dealWidthArr[parseInt(dealListSortType)]);
            let colNum = Math.ceil(getLength / rowNum);
            let dealLength = (rowNum * colNum) - getLength;
            for (let i = 0; i < dealLength; i++) {
              dealArr.push({});
            }
            if (this.rightTabType == 1) {
              this.searchListAlternate = dealArr;
              $(".searchListContainer").addClass("listContainerCenter1");
            } else {
              this.showListAlternate = dealArr;
              $(".initListContainer").addClass("listContainerCenter0");
            }
          } else {
            if (this.rightTabType == 1) {
              this.searchListAlternate = [];
              $(".searchListContainer").removeClass("listContainerCenter1");
            } else {
              this.showListAlternate = [];
              $(".initListContainer").removeClass("listContainerCenter0");
            }
          }
        });
      },
      tooltipOver (e, item) {
        this.TooltipInfo.type = item.trueFile
        if (item.trueFile == true) {
          this.TooltipInfo.name = item.fileName
          this.TooltipInfo.creationTime = item.creationTime
          this.TooltipInfo.size = item.fileSize
          this.TooltipInfo.updateTime = item.updateTime
        } else {
          this.TooltipInfo.name = item.folderName
        }
        this.coordinate = {
          event: e,
          top: e.clientY,
          left: e.clientX
        }
        this.showTile = true
      },
      tooltipOut (e) {
        this.showTile = false
      },
      //根据文件后缀判断文件格式图标
      iconSuffix (item) {
        return fileSuffix(item)
      },
      //播放 如果播放的是音乐则打开音乐播放器
      playVideoFun () {
        if (this.uploadedFolder.fileExt == 'mp3' || this.uploadedFolder.fileExt == 'aac' || this.uploadedFolder.fileExt == 'wav') {
          this.dbclickInitListTableRow(this.uploadedFolder)
        } else if (isVideoSuffix(this.uploadedFolder.fileExt)) {
          let url = this.httpUrl + this.uploadedFolder.logicDir + '/' + this.uploadedFolder.fileName
          this.$emit('refreshVideoplay', url);
        }
        this.hideMenu()
      },
      _blakViewWinowFun () {
        // if ()
        try {
          Vue.prototype.playIframeWindow.close();
        } catch (e) {
        }
        this.hideMenu()
        let url = this.httpUrl + this.uploadedFolder.logicDir + '/' + this.uploadedFolder.fileName
        //console.log(url)
        let routeData = this.$router.resolve({
          name: "playIframe",
          query: {
            url: encodeURIComponent(url),
            fileExt: this.uploadedFolder.fileExt
          }
        });

        Vue.prototype.playIframeWindow = window.open(url, 'blakViewWinow')//在新选项卡中打开
        //Vue.prototype.playIframeWindow = window.open(routeData.href, 'blakViewWinow')//在新选项卡中打开
      },
      //搜索结果表格触发右击菜单
      searchResultsMenu () {

      },
      //切换视图
      switchDisplay (num) {//0,1 叠加切换展示方式
        this.rightMenuIsDisable()
        if (num != 0) {//如果不为0说明不是表格
          this.isTriggerClick = true
          $('.blank').removeClass('blank-zindex')
          // $('.file-list-container').css('top', '0px')
          // $('.table-display-container').css('margin-top', '0px')
        } else {
          $('.blank').addClass('blank-zindex')
          // $('.file-list-container').css('top', '26px')
          // $('.table-display-container').css('margin-top', '-26px')
        }
        if (num == 0 || num == 1 || num == 2 || num == 3 || num == 4) {
          if (this.rightTabType == 0) {
            this.initListSortType = num;
          } else {
            this.searchListSortType = num;
          }
        } else {
          let nowArr = [];
          let nowVal = 0;
          let oldArr = [];
          if (this.rightTabType == 0) {
            nowVal = this.initListSortType;
            oldArr = this.initListSortTypeArr;

          } else {
            nowVal = this.searchListSortType;
            oldArr = this.searchListSortTypeArr;
          }

          oldArr.forEach(function (item1, index1) {
            if (item1 == nowVal) {
              oldArr.splice(index1, 1)
            }
          })
          nowArr = oldArr
          nowArr.push(nowVal);
          nowVal = nowArr[0];
          if (this.rightTabType == 0) {
            this.initListSortType = nowArr[0];
          } else {
            this.searchListSortType = nowArr[0];
          }
        }
      },
      //表格 初始列表点击事件 删除选中的节点
      selectInitListTableRow (item, index) {
        // console.log(item)
        if (!item) {
          return
        }
        this.isTriggerClick = true
        if (this.initListSortType == 0) {//说明点击的是表格
          this.isTriggerClick = false
          this.uploadedFolder = item  //上传文件到的文件夹
          this.checkedActiveFileFun(item, 0);
        } else {
          if (item == null) {//说明单击的是空白处
            let node = this.$refs.treeRef.getCurrentNode();
            this.uploadedFolder = node
            // console.log(this.uploadedFolder)
            // this.rightMenuIsDisable()
            $(".active_items_style").removeClass("active_items_style")
            // $(".current-row").removeClass("current-row")
            this.$refs.tableStatusRef.setCurrentRow(-1);
            this.currentHighlight = null
          } else {
            // console.log(1)
            this.uploadedFolder = item//将单击的数据给保存
            this.checkedActiveFileFun(item, 0);
            this.$refs.tableStatusRef.setCurrentRow(item);
          }
        }
        this.rightMenuIsDisable()
      },
      //表格 查询结果表格点击事件
      selectSearchListTableRow (item) {
        this.checkedActiveFileFun(item, 1);
      },
      //表格双击触发事件  //预览图片
      async dbclickInitListTableRow (item) {
        // console.log(item)
        this.hideMenu()
        if (item.trueFile == true && item.fileExt == 'mp3' || item.trueFile == true && item.fileExt == 'aac' || item.trueFile == true && item.fileExt == 'wav') {//打开MP3播放器
          this.$emit('OpenMusic', '66', this.music)
          let musicInformation = {
            title: item.fileName,
            artist: ' ',
            src: this.httpUrl + item.logicDir + '/' + item.fileName,
            pic: '/static/images/fileSuffix/mp3.png',
            fileId: item.fileId,
          }
          this.$EventBus.$emit('musicParams', musicInformation)
        } else if (item.fileExt == 'png' || item.fileExt == 'gif' || item.fileExt == 'jpg' || item.fileExt == 'webp' || item.fileExt == 'ico') {//图片预览器
          this.dealPreviewPictureList(item);//处理预览图片列表
          //this.$emit('OpenPreview', '67', this.PhotoViewer, item, 1)
        } else if (item.trueFile === false) {//打开文件夹
          this.clickFolder(item)
          this.nodeOpenEvent()
        } else if (isVideoSuffix(item.fileExt)) {
          await this.playVideoFun();
          this.$nextTick(function () {
            $(".playVideoContainer").PopupWindow("outerwitchzindex", parseInt($("div#2_dialog").css("zIndex")) + 3);
          });
        } else {//下载文件
          this.downloadFile()
        }
      },
      //表格 查询结果表格点击事件
      dbclickSearchListTableRow (item) {
        this.clickSearchResultFile(item);
      },
      checkedActiveFileFun (item, type) {
        if (item == null) {
          //console.log('item为空');
          return
        }
        let nowIndex = null;
        let getList = [];
        if (type == 1) {
          this.nowSearchSelectRow = JSON.parse(JSON.stringify(item));
          getList = JSON.parse(JSON.stringify(this.dealTreeResultList))
        } else {
          this.nowInitSelectRow = JSON.parse(JSON.stringify(item));
          getList = JSON.parse(JSON.stringify(this.saveFileList));
        }
        type == 0 ? getList = JSON.parse(JSON.stringify(this.saveFileList)) : getList = JSON.parse(JSON.stringify(this.dealTreeResultList));
        getList.forEach((value, index) => {
          if (value.trueFile == true) {//文件
            //如果文件则判断 fileId
            if (value.fileId == item.fileId) {
              nowIndex = index;
              this.addSelectColor(index, type);
            }
          } else {//文件夹
            //如果文件夹则判断 menuId
            if (value.menuId == item.menuId) {
              nowIndex = index;
              this.addSelectColor(index, type);
            }
          }
        });
      },
      //单击添加样式
      addSelectColor (index, type) {
        if (type == 0) {//0 初始列表   1搜索列表
          $(".initListContainer .teild-display-container .items .itemsBorder").removeClass("active_items_style");
          $(".initListContainer .teild-display-container .items .itemsBorder").eq(index).addClass("active_items_style");
        } else {
          $(".searchListContainer .teild-display-container .items .itemsBorder").removeClass("active_items_style");
          $(".searchListContainer .teild-display-container .items .itemsBorder").eq(index).addClass("active_items_style");
        }
      },
      //查询文件结果
      createSearchResultsTreeDom () {
        //this.oldFileObj = this.nowFileObj;
        if (this.isStatic.length == 1) {
          this.isStatic = []
        }
        //只允许第一次添加搜索节点
        if (this.nodeFrequency == 0) {
          this.folderList.push(this.treeResult)
          this.pathDirectory.push(this.treeResult)
        }
        this.nodeFrequency = 1
        clearTimeout(timeout2)
        this.$nextTick(() => {
          this.pathId = this.treeResult.menuId;
          this.$refs.treeRef.setCurrentKey(this.treeResult.menuId)
        })
      },
      //搜索结果
      async searchResults () {
        //删除便不做操作  只针对处于搜索节点时
        if (this.$refs.treeRef.getCurrentNode().menuId == "99999999") {
          let trueHasTree = (this.$refs.treeRef.getNode(this.oldFileObj.menuId) == null || this.$refs.treeRef.getNode(this.oldFileObj.menuId) == undefined);
          if ((this.treeResult.trueDelete == 1 && this.nodeFrequency == 1) || (trueHasTree && this.nodeFrequency == 1)) {
            this.dealTreeResultList = [];
            return false;
          }
        } else {

        }
        //以下操作需要加载动画
        this.isLoad = false;
        this.isShowFolderLoad = false
        clearTimeout(timeout3);
        this.isLoad = true
        this.isShowFolderLoad = true
        let _this = this;
        //清空返回原节点  只针对处于搜索节点时
        if (this.Inquire.trim() == "" && this.$refs.treeRef.getCurrentNode().menuId == "99999999") {//返回之前节点
          this.pathId = this.oldFileObj.menuId
          this.$nextTick(() => {
            let node = JSON.parse(JSON.stringify(this.$refs.treeRef.getNode(this.pathId).data));
            //let node = this.$refs.treeRef.getCurrentNode();
            this.handleNodeClick(node, 0, 1);
          })
          return false;
        } else {

          //拿到查询结果没有
          let searchFilePath = this.nowFileObj.path;//当前目录下查询
          let searchFileName = this.Inquire.trim();//要查询的文件名称
          let {data: res} = await fileList({
            filePath: searchFilePath,
            fileName: searchFileName
          })
          //把所有值置空
          this.dealTreeResultList = [];
          this.dealTreeResultFolderList = [];
          let getFolderlist = [];
          let getFilelist = [];
          let dealFolderlist = [];
          if (res.data == undefined) {
            getFolderlist = [];
            getFilelist = [];
          } else {
            getFolderlist = res.data.folderlist;
            getFilelist = res.data.filelist;
          }
          //给每个查询出来的文件添加 fileObj 用来跳转的
          getFilelist.forEach((item) => {
            item.path = this.nowFileObj.path;
            item.menuId = this.nowFileObj.menuId;
            item.parentId = this.nowFileObj.parentId;
            item.children = this.nowFileObj.children;
            item.folderName = this.nowFileObj.folderName;
            item.fileExt = item.fileExt.toLowerCase();
            item.fileName = this.fileToLowerCase(item.fileName);//用来做字母排序
            item.treeType = 0;
            item.trueFile = true;
          });
          //当上一个下一个或点击时保存了搜索节点，所以需要将搜索节点排除
          if ((this.oldFileObj.menuId != this.nowFileObj.menuId) && this.nowFileObj.menuId !== "99999999") {//不相等时说明点击了新的节点 //所以可以初始化一次
            this.oldFileObj = this.nowFileObj;
            this.treeResult.trueDelete = 0;
          }
          //文件夹列表  需要递归成平铺列表数据
          if (getFolderlist.length > 0) {
            if (this.oldFileObj.menuId == getFolderlist[0].menuId) {
              getFolderlist[0].children.forEach((item) => {
                this.dealSearchResultFolderlist(item);
              });
            } else {
              getFolderlist.forEach((item) => {
                this.dealSearchResultFolderlist(item);
              });
            }
          }
          dealFolderlist = JSON.parse(JSON.stringify(this.dealTreeResultFolderList));
          let newDealFolderlist = dealFolderlist.concat(getFilelist);
          this.dealTreeResultList = JSON.parse(JSON.stringify(newDealFolderlist));
          //可以拿到分开的文件夹 文件列表 接着做排序处理 (暂时没有做)
          this.createSearchResultsTreeDom();//跳转到当前节点
          this.trueShowPathType = 2;
          this.rightTabType = 1;//显示搜索结果列表
          this.prevList.push(this.treeResult);
          this.prevList = this.dealPrevList(this.prevList);
          this.nextList = [];//一旦做了新的操作 下一个列表就应该清空 以当前节点做末尾
        }
        timeout3 = setTimeout(function () {
          _this.isLoad = false
          _this.isShowFolderLoad = false
          clearTimeout(timeout3)
        }, 200);
      },
      searchResult_throttle: debounce('searchResults', 500, false),
      //右侧搜索结果 文件夹列表  需要递归成平铺列表数据
      dealSearchResultFolderlist (data) {
        // 如果非数组直接返回
        data.trueFile = false;
        data.treeType = 0;//普通节点
        data.fileName = data.folderName;
        this.dealTreeResultFolderList.push(data);
        if (data.children.length > 0) {
          data.children.forEach((curItem, index) => {
            this.dealSearchResultFolderlist(curItem);
          });
        } else {
          return false;
        }
      },
      //点击文件访问对应路径目录
      clickSearchResultFile (item) {
        this.rightTabType = 0;
        this.trueShowPathType = 0;
        if (item.trueFile) {
          let index = item.filePath.indexOf('/', 15)
          let path = item.filePath.slice(index)
          let result = findFolderPath(this.folderList, path, {})
          this.pathId = result.menuId
        } else {
          this.pathId = item.menuId
        }
        this.$nextTick(() => {
          let node = this.$refs.treeRef.getCurrentNode()
          this.handleNodeClick(node)
        })
      },
      //点击tree标题展开tree
      isShowDrop () {
        let icon = document.querySelector('.tree-title-icon')
        if (this.flag == 1) {
          $('#showContainer').slideDown()
          icon.style.transform = "rotate(0deg)"
          this.flag--
        } else {
          $('#showContainer').slideUp()
          icon.style.transform = "rotate(90deg)"
          this.flag++
        }
      },
      //打开文件夹初始时的操作
      OpenFolderInit () {
        try {
          this.pathId = this.folderList[0].menuId;
        } catch (err) {
          return false;
        }
        this.$nextTick(async () => {
          if (this.$store.state.search_obj != null) {
            this.allSearchDeal(this.$store.state.search_obj);
          } else {
            let node = this.$refs.treeRef.getCurrentNode();
            this.initTreeNode = node;
            this.handleNodeClick(node);
          }
          $('.blank').addClass('blank-zindex')
          this.$store.commit('deleteUser_boj')
        });
      },
      //双击文件访问对应路径目录
      clickFolder (item) {
        if (item.trueFile == true) {
          this.dbclickInitListTableRow(item)
        }
        this.pathId = item.menuId
        this.$nextTick(() => {
          let node = this.$refs.treeRef.getCurrentNode()
          this.handleNodeClick(node)
        })
      },
      //关闭全部展开的树
      collapseAll () {
        let self = this;
        // 将没有转换成树的原数据
        let list = this.folderList;
        for (let i = 0; i < list.length; i++) {
          self.$refs.treeRef.store.nodesMap[list[i].menuId].expanded = false
        }
      },
      resizePathShow () {
        if (this.trueShowPathType != 0) {//判断是否是li的展示方式 否则不做操作
          this.trueHidePathListShow = true;
          return false;
        }
        let allLiWidth = 0;//所有li的总和
        let reverseAllWidth = 0;//倒序记录宽度
        let reverseEleArr = [];//倒序元素组合
        let trueHide = false;//是否需要隐藏部分元素
        let newPathArr = JSON.parse(JSON.stringify(this.pathArray));
        let bigWidth = $(".file-input-border-show").width();
        let hideIndex = 0;
        let copyHidePathArray = [];
        // console.log( $(".file-input-border-show>ul>li.showLi"))
        $(".file-input-border-show>ul>li.showLi").each((index, element) => {
          newPathArr[index].index = index;
          reverseEleArr.unshift(element);
          allLiWidth = ($(element).width() + 18) + allLiWidth;
          if (allLiWidth > (bigWidth - 60)) {
            trueHide = true;
          }
        });
        if (trueHide == true) {//需要考虑倒序放下多少
          for (let i = 0; i < reverseEleArr.length; i++) {
            if (($(reverseEleArr[i]).width() + 18) + reverseAllWidth <= bigWidth - 60) {
              reverseAllWidth = ($(reverseEleArr[i]).width() + 18) + reverseAllWidth;
              newPathArr[(newPathArr.length - 1) - i].show = true;
              newPathArr[(newPathArr.length - 1) - i].hidden = false;
            } else {
              if (hideIndex == 0) {
                newPathArr[(newPathArr.length - 1) - i].show = true;
                newPathArr[(newPathArr.length - 1) - i].hidden = true;
              } else {
                newPathArr[(newPathArr.length - 1) - i].show = false;
                newPathArr[(newPathArr.length - 1) - i].hidden = false;
              }
              reverseAllWidth = ($(reverseEleArr[i]).width() + 18) + reverseAllWidth;
              hideIndex = hideIndex + 1;
              copyHidePathArray.unshift(newPathArr[(newPathArr.length - 1) - i]);
            }
          }
        } else {
          newPathArr.forEach((item, index) => {
            item.show = true;
            item.hidden = false;
            ////this.$set(this.pathArray, index, item);
          });
        }
        this.hidePathArray = copyHidePathArray;
        copyHidePathArray.length > 1 ? this.trueHidePathListShow = false : this.trueHidePathListShow = true;
        this.reversePathArray = JSON.parse(JSON.stringify(newPathArr));
      },
      hidePathListDeal (command) {
        this.clickPath(command, command.index)
      },
      initPathSearch () {
        this.treeResult.trueDelete = 0;
        let getNowTreeListTree = [];
        let newPrevList = [];
        let newNextList = [];
        let initDealTreeResultList = [];
        let initSaveFileList = [];
        let hasRemoveSearch = 0;
        //初始路径搜索列表
        this.folderList.forEach((item, index) => {
          getNowTreeListTree.push(this.$refs.treeRef.getNode(item.menuId).data);
        });
        this.initFilterList = [];//遍历重新处理文件名 及路径等文件夹属性值
        getNowTreeListTree.forEach((item) => {
          if (item.menuId != "99999999") {//除搜索节点外的所有一级节点处理
            let path = '/' + item.folderName;
            this.$set(this.$refs.treeRef.getNode(item.menuId).data, 'path', path);  //同步刷新
            let newObj = {
              value: path,
              menuId: item.menuId
            }
            this.initFilterList.push(newObj);
            this.dealFilterFileList(item);
          }
        });
        //初始展示列表
        this.saveFileList.forEach((item) => {
          if (this.$refs.treeRef.getNode(item.menuId) != null && this.$refs.treeRef.getNode(item.menuId) != undefined) {
            if (!item.trueFile) {//判断文件夹或文件 将文件夹重新赋值
              initSaveFileList.push(this.$refs.treeRef.getNode(item.menuId).data);
            } else {
              initSaveFileList.push(item);
            }
          }
        });
        //处理搜索判断
        if (this.$refs.treeRef.getNode("99999999") != null) {
          if (this.nodeFrequency == 1) {//是否搜索过
            if (this.$refs.treeRef.getNode(this.oldFileObj.menuId) == null || this.$refs.treeRef.getNode(this.oldFileObj.menuId) == undefined) {
              hasRemoveSearch = 1;//查询节点被删除
              //如果搜索节点 之前保留的查询节点被删除 则将查询结果列表置空
              this.treeResult.trueDelete = 1;
              this.dealTreeResultList = [];
            }
          }
        }
        //搜索结果列表
        this.dealTreeResultList.forEach((item) => {
          if (this.$refs.treeRef.getNode(item.menuId) != null && this.$refs.treeRef.getNode(item.menuId) != undefined) {
            if (!item.trueFile) {//判断文件夹或文件 将文件夹重新赋值
              initDealTreeResultList.push(this.$refs.treeRef.getNode(item.menuId).data);
            } else {
              initDealTreeResultList.push(item);
            }
          }
        });
        this.dealTreeResultList = JSON.parse(JSON.stringify(initDealTreeResultList));
        this.saveFileList = JSON.parse(JSON.stringify(initSaveFileList));
        //刷新上一个 下一个
        this.prevList.forEach(item => {
          if (hasRemoveSearch == 1) {
            //因为搜所节点被删除 所以下一个列表相关的搜索结果节点不做保留，将移除掉
            if (this.$refs.treeRef.getNode(item.menuId) != null && this.$refs.treeRef.getNode(item.menuId) != undefined && this.$refs.treeRef.getNode(item.menuId) != "99999999") {
              newPrevList.push(this.$refs.treeRef.getNode(item.menuId).data);
            }
          } else {
            if (this.$refs.treeRef.getNode(item.menuId) != null && this.$refs.treeRef.getNode(item.menuId) != undefined) {
              newPrevList.push(this.$refs.treeRef.getNode(item.menuId).data);
            }
          }
        });
        this.nextList.forEach(item => {
          if (hasRemoveSearch == 1) {
            //因为搜所节点被删除 所以下一个列表相关的搜索结果节点不做保留，将移除掉
            if (this.$refs.treeRef.getNode(item.menuId) != null && this.$refs.treeRef.getNode(item.menuId) != undefined && this.$refs.treeRef.getNode(item.menuId) != "99999999") {
              newNextList.push(this.$refs.treeRef.getNode(item.menuId).data);
            }
          } else {
            if (this.$refs.treeRef.getNode(item.menuId) != null && this.$refs.treeRef.getNode(item.menuId) != undefined) {
              newNextList.push(this.$refs.treeRef.getNode(item.menuId).data);
            }
          }
        });
        this.prevList = JSON.parse(JSON.stringify(newPrevList));
        this.nextList = JSON.parse(JSON.stringify(newNextList));
      },
      //路径回车搜索
      pathSearch (queryString, cb) {
        //拿到查询的值 进行筛选
        let initList = JSON.parse(JSON.stringify(this.initFilterList));
        let nowPath = this.$refs.treeRef.getCurrentNode().path;
        let keyword = queryString;
        let dealInitList = [];
        if (nowPath == queryString) {
          dealInitList = [];
        } else {
          if (keyword == "") {
            keyword = "/";
          }
          let arrLength = keyword.split("/");
          dealInitList = initList.filter((item) => {
            let nowValue = item.value;
            let arrLength1 = nowValue.split("/");
            return item.value.indexOf(keyword) > -1 && arrLength.length == arrLength1.length;
          });
        }
        cb(dealInitList);
      },
      //初次搜索列表
      dealFilterFileList (data) {
        // 如果非数组直接返回
        this.$set(this.$refs.treeRef.getNode(data.menuId).data, 'fileName', data.folderName);  //同步刷新
        this.$set(this.$refs.treeRef.getNode(data.menuId).data, 'trueFile', false);  //同步刷新
        this.$set(this.$refs.treeRef.getNode(data.menuId).data, 'treeType', 0);  //同步刷新
        if (data.children.length > 0) {
          data.children.forEach((curItem, index) => {
            //拼接路径
            let path = data.path + '/' + curItem.folderName;
            this.$set(this.$refs.treeRef.getNode(curItem.menuId).data, 'path', path);  //同步刷新
            let newObj = {
              value: path,
              menuId: curItem.menuId
            }
            this.initFilterList.push(newObj);
            this.dealFilterFileList(curItem);
          });
        } else {
          return false;
        }
      },
      selectSearchList (item) {
        try {
          clearTimeout(loseFocusTimer);
        } catch (e) {
        }
        this.searchReplAcePath(item);
      },
      //点击筛选列表替换路径
      async searchReplAcePath (item) {
        this.pathId = item.menuId
        // console.log("----------------------------");
        // console.log(item);
        await this.handleNodeClick(item, 0);
        this.trueShowPathType = 0;
      },
      //失去焦点
      loseFocus () {
        let _this = this;
        loseFocusTimer = setTimeout(function () {
          _this.trueShowPathType = 0;
          clearTimeout(loseFocusTimer);
        }, 300);
      },
      pathDivClick () {
        let str = ""
        this.pathArray.forEach((item) => {
          str = str + "/" + item.folderName;
        });
        this.path = str;
        this.trueShowPathType = 1
      },
      //双击输入框时操作
      inputBar: function () {
        this.trueShowPathType = 1;
        //当点击输入框将路径给input
        let newArray = []
        this.pathArray.forEach(item => {
          newArray.push(item.folderName)
        })
        this.path = this.splicePath(newArray, 0)
        this.$nextTick(function () {
          $('.inputbox').select()
          this.$refs.inputVal.focus()
        })
      },
      //获取文件夹结构
      async getFolderData () {
        let {data: res} = await folderMenu()
        //this.$http.get('/folder/menu?lang=' + 'zh_CN')
        if (res.code != 200) {
          this.errorMessage = this.$t('reminder.folder')/*文件夹列表加载失败*/
          this.showWarning = true
        }
        // console.log(res)
        this.folderList = res.data
        this.$nextTick(() => {
          this.initPathSearch();
          this.filter_node()
        });
      },
      //遍历树生成 对象 路径  data要遍历的对像 id需要查找目标 indexArray空数组
      findIndexArray (data, id, indexArray) {
        let arr = Array.from(indexArray)
        for (let i = 0, len = data.length; i < len; i++) {
          arr.push(data[i])//注意这里生成的是对象路径
          if (data[i].menuId == id) {
            // console.log(data[i].data)
            return arr
          }
          let children = data[i].children
          if (children && children.length) {
            let result = this.findIndexArray(children, id, arr)
            if (result) return result
          }
          arr.pop()
        }
        return false
      },
      //点击路径跳往对应的路径
      clickPath (item, index) {
        this.pathId = item.menuId
        this.pathArray.splice(index + 1)
        this.$nextTick(function () {
          let node = this.$refs.treeRef.getCurrentNode()
          this.handleNodeClick(node, null, 0)
          this.currentNodeArray.push(item.parentId)
          if (this.currentNodes.indexOf(item.parentId) == -1) {//说明没找到
            this.currentNodes.push(item.parentId)
          }
        })
      },
      //发起请求查询文件 在这里拿到的只有当前dom 的子文件
      async getFileList (path, data) {
        let shared = data.path.substr(0, 7)
        let key = shared == '/shared' ? 0 : 1
        let node = this.$refs.treeRef.getCurrentNode();
        this.isLoad = true
        this.isShowFolderLoad = true
        let {data: res} = await fileList({
          filePath: path,
          type: key
        })
        // this.$http.get('/file/list?filePath=' + path)
        if (res.code != 200) {
          this.errorMessage = this.$t('reminder.folder')/*文件列表加载失败*/
          this.showWarning = true
          return
        }
        let _this = this;
        let getValList = [];
        try {
          getValList = res.data.filelist;
        } catch (e) {
        }
        this.$nextTick(function () {
          //对获取的数据进行过滤
          getValList.forEach((item) => {
            let fdStart = item.filePath.indexOf(path)
            //后缀转小写
            item.fileExt = item.fileExt.toLowerCase()
            //转换小写
            item.fileName = this.fileToLowerCase(item.fileName)
            if (fdStart == 0) {
              let trueChildStr = item.filePath.slice(path.length, item.filePath.length)
              if (trueChildStr.split('/').length == 1) {
                item.trueFile = true;
                item.treeType = 0;
                item.path = path
                item.menuId = node.menuId
                this.saveFileList.push(item)
              }
            }
          })
          // console.log(this.saveFileList)
          clearTimeout(timeout)
          timeout = setTimeout(function () {
            _this.isLoad = false
            _this.isShowFolderLoad = false
          }, 200,)
        })
      },
      //截取文件名后缀转换成小写
      fileToLowerCase (fileName) {
        let s = fileName.lastIndexOf(".");
        //打印的是长度最后的一个点的长度
        //截取0到9位的字符窜
        let string = fileName.slice(0, s)
        //拼接字符串
        return string + '.' + fileName.substring(s + 1).toLowerCase()
      },
      //树形点击事件 optionType 0 是否是上一个下一个以及刷新   1 搜索结果点击
      // type 判断是否局部刷新 局部刷新原理获取当前选中的节点 进行刷新 而我们做了不允许点击重复一个节点
      handleNodeClick (data, optionType, type) {
        // console.log(data)
        // if (data.menuId == this.folderList[0].menuId) {//防止跳转root 还记录着其他节点
        //   this.nodeId = [];
        // }
        this.pathId = data.menuId;
        if (data.menuId != "99999999") {
          this.isDisabledMenu = true
          this.treeResult.trueDelete = 0;
          data = JSON.parse(JSON.stringify(this.$refs.treeRef.getNode(data.menuId).data));
          let getExpendArr = JSON.parse(JSON.stringify(this.currentNodeArray));
          getExpendArr.push(data.menuId + "");
          let getNowExpendArr = getExpendArr.filter((x, index, self) => self.indexOf(x) == index)
          this.currentNodeArray = JSON.parse(JSON.stringify(getNowExpendArr));
        } else {
          this.isDisabledMenu = false
        }
        if (type != 1) {
          //不允许重复点击一个节点
          if (this.nodeId.includes(data.menuId)) {
            return
          } else {
            this.nodeId.push(data.menuId)
            if (this.nodeId.length > 1) {
              this.nodeId.shift()
            }
          }
        }
        this.saveFileList = [];
        //每次请求将右击值给清空
        this.currentHighlight = null
        this.uploadedFolder = data;
        $(".active_items_style").removeClass("active_items_style")
        // this.isRequest = data
        this.$nextTick(() => {
          //如果等于1不将其展开
          if (this.Unfold == 1) {
            this.Unfold = 2
          } else {
          }
          this.saveFileList = []
          if (data.treeType == 1) {//判断点击是搜索结果节点
            //0 上一个下一个
            this.Inquire = '';
            this.rightTabType = 1;
            this.trueShowPathType = 2;
            if (optionType == 0) {
            } else {
              this.prevList.push(data);
              this.prevList = this.dealPrevList(this.prevList);
              this.nextList = [];//一旦做了新的操作 下一个列表就应该清空 以当前节点做末尾
            }
          } else {//非搜索结果节点
            //防止增加删改子节点 导致树节点 和列表的文件夹不一致
            let getDomData = this.$refs.treeRef.getNode(this.$refs.treeRef.getCurrentNode().menuId).data;
            data.children = JSON.parse(JSON.stringify(getDomData.children));
            //为节点添加属性
            data.children.forEach((item) => {
              item.trueFile = false;
              item.treeType = 0;
              item.fileName = item.folderName
              this.saveFileList.push(item)
            });
            //递归拼接路径 返回对象
            this.pathArray = this.findIndexArray(this.folderList, data.menuId, []);
            //遍历对象生成数组
            let newArray = [];
            this.pathArray.forEach(item => {
              newArray.push(item.folderName)
            });
            //拼接路径
            let path = this.splicePath(newArray, 0)
            this.rightTabType = 0;
            this.trueShowPathType = 0;
            //0 上一个下一个
            if (optionType == 0) {
            } else {
              data.fileName = data.folderName;
              data.trueFile = false;
              data.path = path;
              data.treeType = 0;
              this.nowFileObj = data;
              this.prevList.push(data);
              this.prevList = this.dealPrevList(this.prevList);
              this.nextList = [];//一旦做了新的操作 下一个列表就应该清空 以当前节点做末尾
            }
            this.nodeOpenEvent()//点击展开列表
            path = '/home/user/file' + path
            this.getFileList(path, data);
            // console.log('这里')
          }
        })
      },
      //点击文件夹将节点展开
      nodeOpenEvent (node) {
        this.$nextTick(() => {
          let current = this.$refs.treeRef.getCurrentNode()
          if (this.$refs.treeRef.getNode(current) && this.$refs.treeRef.getNode(current).parent) {
            this.expandParents(this.$refs.treeRef.getNode(current).parent)
          }
        })
      },
      expandParents (node) {
        // 展开所有祖宗节点
        node.expanded = true
        if (node.parent) {
          this.expandParents(node.parent)
        }
      },
      //拼接路径 传1在路径前面不加斜杠，不传0在路径前面加斜杠
      splicePath (nodePath, type) {
        let path = ''
        nodePath.forEach((item, index) => {
          if (type == 1) {
            if (index == 0) {
              path += item
            } else {
              path += '/' + item
            }
          } else {
            path += '/' + item
          }
        })
        return path
      },
      // 保存路径的前进与后退 保存当前treeObj
      pathHistory (fileObj) {
        //在这里我可以拿到dom 节点 fileObj
        this.prevList.push(fileObj);
        this.prevList = this.dealPrevList(this.prevList);
        this.nextList = [];//一旦做了新的操作 下一个列表就应该清空 以当前节点做末尾
      },
      //点击前进按钮 请求下一个路径  type 为1的时候是后退 为0的时候是前进
      buttonBefore_Rear (type) {
        this.Inquire = "";
        let getPrevList = JSON.parse(JSON.stringify(this.prevList));
        let getNextList = JSON.parse(JSON.stringify(this.nextList));

        if (type == 1) {
          //拿到列表的的最后一个
          let fileObj = getPrevList[getPrevList.length - 2];
          this.pathId = fileObj.menuId;
          this.nowFileObj = JSON.parse(JSON.stringify(this.$refs.treeRef.getNode(this.pathId).data));
          //除里当前dom树的展示
          this.handleNodeClick(fileObj, 0);
          //处理列表数据
          if (this.nextList.length == 0) {
            getNextList.unshift(getPrevList[getPrevList.length - 1]);
          }
          //将当前fileObj添加到下一个列表最前面
          getNextList.unshift(fileObj);
          //将当前fileObj从后退列表移除 即删除数组最后一个
          getPrevList.pop();

        } else {
          //拿到列表的的最前面一个
          let fileObj = getNextList[1];
          this.pathId = fileObj.menuId;
          this.nowFileObj = JSON.parse(JSON.stringify(this.$refs.treeRef.getNode(this.pathId).data));
          //除里当前dom树的展示
          //拿到列表的的最后一个
          this.handleNodeClick(fileObj, 0);
          //处理列表数据
          //将当前fileObj添加后退列表最后一个
          getPrevList.push(fileObj);
          //将当前fileObj 从下一个列表移除  即移除第一个
          getNextList.shift();
        }
        //最后赋值
        this.prevList = this.dealPrevList(getPrevList);
        this.nextList = this.dealNextList(getNextList)
        this.nodeOpenEvent()//调用树展开的方法
      },
      dealPrevList (getList) {//限制后退列表长度20
        let dealList = [];
        if (getList.length <= 20) {
          dealList = getList;
        } else {//截取后面20个
          dealList = getList.slice(getList.length - 20, getList.length);
        }
        return dealList;
      },
      dealNextList (getList) {//限制下一个列表长度20
        //截取前面20个
        let dealList = [];
        if (getList.length <= 20) {
          dealList = getList;
        } else {//截取前面20个
          dealList = getList.slice(0, 20);
        }
        return dealList;
      },
      onerror () {
      },
      //上传文件到当前目录
      uploadFile (params) {
        if (sharingProhibited(this.uploadedFolder)) {
          return;
        }
        if (this.fileSize > 1 || this.nameLength > 40 || !rightToJudge(this.uploadedFolder, this)) {
          return
        }
        // updateFile(params, this, false)
        updateFile(params, this, false, axios.CancelToken.source())
      },
      //上传时的函数  监听上传进度
      //上传完成
      handleUploaded (res, file, fileList) {
        this.$refs.uploadFiless.clearFiles()
        this.$refs.upload.clearFiles()
        this.$refs.Success.clearFiles()
        this.$refs.uploadFiles.clearFiles()
      },
      clearUploadFile () {
      },
      BtnUpload(){//按钮上传默认以当前选中的节点上传
        this.uploadedFolder = this.$refs.treeRef.getCurrentNode();
      },
      //上传之前的钩子
      handlebefore (file) {
        if (sharingProhibited(this.uploadedFolder)) {
          this.errorMessage = this.$t('reminder.sharedError')/*共享文件夹不支持此操作*/
          this.showWarning = true
          this.clearUploadFile()
          return;
        }
        if (!rightToJudge(this.uploadedFolder, this)) {
          this.errorMessage = this.$t('reminder.authority')/*您没有权限对此文件夹执行操作*/
          this.showWarning = true
          this.clearUploadFile()
          return file
        }
        let name = this.getByteLength(file.name)
        this.nameLength = name
        if (this.nameLength > 40) {
          this.errorMessage = this.$t('reminder.uploadFileError')/*上传文件名称不允许超过40字节*/
          this.showWarning = true
          this.clearUploadFile()
          return file
        }
        let size = this.ConversionSize(file.size)
        this.fileSize = size
        // console.log(this.fileSize)
        if (size > 0.9) {
          this.errorMessage = this.$t('reminder.uploadSizeError')/*上传文件名称不允许超过40字节*/
          this.showWarning = true
          this.clearUploadFile()
          return file
        }
        this.nameLength = 0
        this.fileSize = 0
        this.openUploadDialog(file.name)
      },
      //取消文件警告弹框
      warningClose () {
        this.showWarning = false
      },
      hideMenu () {
        this.contextMenuVisible1 = false
        this.contextMenuVisible = false
        this.contextMenuVisible2 = false
      },
      //判断字符串的文件名字节长度
      getByteLength (str = '') {
        let len = 0;
        for (let i = 0; i < str.length; i++) {
          if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
            len += 2;
          } else {
            len++;
          }
        }
        return len;
      },
      ConversionSize (size) {
        if (!size) return "";
        let num = 1024.00; //byte
        if (size < Math.pow(num, 4))
          return (size / Math.pow(num, 3)); //G
      },
      //在当前目录下上传文件  //右击tree上传文件
      BtnUploadFile (params) {
        if (sharingProhibited(this.uploadedFolder)) {
          return;
        }
        if (this.fileSize > 1 || this.nameLength > 40 || !rightToJudge(this.uploadedFolder, this)) {
          return
        }
        updateFile(params, this, true, axios.CancelToken.source())
      },
      //文件上传打开打开弹框
      openUploadDialog (name) {
        this.$emit('NewUploadDialog', 1)
        this.$notify({
          title: this.$t('file.upload'),/*'上传'*/
          message: `${name}+${this.$t('file.uploadQueue')}`,
          type: 'success',
          offset: 56,
          duration: 2000
        })
      },
      //创建重命名及文件重命名弹框
      fileOrFolderRenameWindow () {
        this.hideMenu()
        // let path = this.rightClickPath(this.uploadedFolder.menuId)
        this.isNewNameOrNewFolder = 'NewName'
        this.$emit('newFolderOrNewName', '2', '2_child', this.uploadedFolder, this.isNewNameOrNewFolder)
        // this.$EventBus.$emit('rightClickData', this.uploadedFolder, path, null, this.Rename)
      },
      //重名名文件或文件夹
      async fileOrFolderRename (data, flag) {
        this.FolderData = data
        if (flag == 1) {//说明是重命名文件夹
          //await this.getParentId(this.folderList, data.menuId, data)
          this.$set(this.$refs.treeRef.getNode(data.menuId).data, 'folderName', this.FolderData.folderName);
          this.$nextTick(() => {
            this.initPathSearch();
          });
        } else {//文件
          this.newFileName(this.FolderData)
        }
      },
      //文件命名
      newFileName (FolderData) {
        if (this.rightTabType == 1) {
          this.dealTreeResultList.forEach((item) => {
            if (item.fileId == FolderData.fileId) {
              this.$set(item, 'fileName', FolderData.fileName)
              this.$set(item, 'fileExt', FolderData.fileExt)
            }
          })
        } else {
          this.saveFileList.forEach((item) => {
            if (item.fileId == FolderData.fileId) {
              this.$set(item, 'fileName', FolderData.fileName)
              this.$set(item, 'fileExt', FolderData.fileExt)
            }
          })
        }
      },
      Download () {
        let path = this.uploadedFolder.path + '/' + this.uploadedFolder.fileName
        let dealDownUrl = '/api' + '/file/download' + '?filePath=' + encodeURIComponent(path);
        let link = document.createElement('a');
        link.href = dealDownUrl;
        link.download = this.uploadedFolder.fileName;
        //link.target = "_blank"; // 针对 ie模式 的浏览器
        // 触发点击
        document.body.appendChild(link);
        link.click();
      },
      async downloadFile () {
        this.hideMenu()
        if (rightToJudge(this.uploadedFolder, this) == false) {
          this.errorMessage = this.$t('reminder.authority')/*您没有权限对此文件夹执行操作*/
          this.showWarning = true
          return
        }
        const downloadPath = this.uploadedFolder.path + '/' + this.uploadedFolder.fileName
        const {data: res} = await fileCheck({filePath: downloadPath})
        if (res.code == 10000) {
          this.errorMessage = this.$t('reminder.downloadAddressError')/*文件下载地址不正确*/
          this.showWarning = true
          return false
        } else if (res.code !== 200) {
          this.errorMessage = this.$t('reminder.fileDownloadFailed')/*下载失败*/
          this.showWarning = true
          return false
        } else {
          this.Download()
        }
      },
      //文件下载校验
      async fileCheck (file) {
        // console.log(file)
        let File = file.path + '/' + file.fileName;
        let fileName = file.fileName;
        let _this = this;
        let xmlhttp = null;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
          xmlhttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) {// code for IE
          try {
            xmlhttp = new ActiveXObject("MSXML2.XMLHTTP");
          } catch (e) {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          }
        }
        xmlhttp.open('GET', '/file/download?filePath=' + File, true);
        xmlhttp.responseType = 'blob';
        xmlhttp.onload = function (e) {
          //返回状态正常
          if (this.status == 200) {
            let responseBlob = this.response;//Blob数据
            let blob = new Blob([xmlhttp.response]);
            if (responseBlob && responseBlob.size > 0) {
              if (myBrowserIE() == 'ie' || myBrowserIE() == 'edge') {
                window.navigator.msSaveBlob(blob, fileName);
              } else {
                if (typeof window.chrome !== undefined) {
                  // Chrome version
                  let link = document.createElement('a');
                  link.href = window.URL.createObjectURL(blob);
                  link.download = fileName;
                  link.target = "_blank"; // 针对 ie模式 的浏览器
                  // 触发点击
                  document.body.appendChild(link);
                  link.click();
                  // 然后移除
                  document.body.removeChild(link);

                } else {
                  // Firefox version
                  // let file = new File([xhr.response], filename, { type: 'application/force-download' });
                  let file = new File([xhr.response], fileName);
                  window.open(URL.createObjectURL(file));
                }
              }
              //判断不是文件，此条件需要修改，后端需要配合返回错误代码少于10个字符
            } else {
              _this.errorMessage = '文件下载失败!'
              _this.showWarning = true
            }
          } else {
            if (this.status == 10000) {
              _this.errorMessage = '文件不存在!'
              _this.showWarning = true
            } else {
              _this.errorMessage = '文件下载失败!'
              _this.showWarning = true
            }
          }
        };
        try {
          xmlhttp.send();
          // showMsg(i18n_public_page.i18n_download_start, 'info', vm);
        } catch (e) {
          this.errorMessage = '文件下载失败!'
          this.showWarning = true
        }
      },
      downloadFileFun (filePath) {
        let dealName = Math.random();
        let $Iframe = $('<iframe style="display:none;opacity:0"> </iframe> ');
        $Iframe.attr("name", "downLoadIFrame" + dealName);
        $Iframe.attr("id", "downLoadIFrame" + dealName);
        //$Iframe.css("display", "none");
        $("body").append($Iframe);
        let form = document.createElement("form");
        document.getElementsByTagName('body')[0].appendChild(form);
        form.setAttribute('style', 'display:none');
        form.setAttribute('target', 'downLoadIFrame' + dealName);
        form.setAttribute('method', 'get');
        //请求路径
        form.setAttribute('action', 'file/download');
        //参数
        let input1 = document.createElement('input');
        input1.setAttribute('type', 'hidden');
        input1.setAttribute('name', 'filePath');
        input1.setAttribute('value', filePath);
        form.appendChild(input1);
        //提交表单
        form.submit();
        // 监听iframe回调
        $Iframe.on("load", function () {
          $(form).remove();
          $Iframe.remove();
        });
      },
      //发起下载请求
      // download (src, fileNames, type) {
      //   // console.log(type.fileExt)
      //   // if (type.fileExt !== 'zip') {
      //   let x = new XMLHttpRequest();
      //   x.open("GET", 'api/image/home/user/file/root/test001/test002/test003/0000000@2020050722574110_1610409939284.mp4', true);
      //   // x.responseType = 'blob';
      //   x.setRequestHeader("Content-Type", 'application/force-download')
      //   x.onload = function (e) {
      //     let url = window.URL.createObjectURL(x.response)
      //     //console.log(url)
      //     let a = document.createElement('a');
      //     a.href = url
      //     a.download = '0000000@2020050722574110_1610409939284.mp4'
      //     a.click()
      //   }
      //   x.send();
      //   // } else {
      //   //   let $eleForm = $("<form method='get'></form>");
      //   //   $eleForm.attr("action", 'http://192.168.3.131:9001/image/home/user/file/root/test001/test002/test003/Qv-nas_1610373010820.ico');
      //   //   $(document.body).append($eleForm);
      //   //   //提交表单，实现下载
      //   //   $eleForm.submit();
      //   // }
      // },
      //全局刷新前调用 可以防止树节点重新赋值全部收起
      saveCurrentNode () {
        let treeCompInstance = this.$refs["treeRef"];
        let allNodes = treeCompInstance.store._getAllNodes();
        // console.log(allNodes)
        let defaultExpandedNodes = [];
        allNodes.forEach(node => {
          node.expanded && defaultExpandedNodes.push(node.data.menuId);
        });
        // console.log(defaultExpandedNodes)
        this.currentNodes = defaultExpandedNodes
      },
      //全局刷新事件
      async globalUpdete (hasclick) {//true 需要重新点击当前节点  false 不在点击当前节点
        this.saveCurrentNode()
        this.isMenuLoad = true
        this.isStatic = []
        let node = this.$refs.treeRef.getCurrentNode()
        if (node.treeType == 1) {//如果是搜索结果状态 则取初始化节点
          node = this.initTreeNode;
        }
        await this.getFolderData();//刷新列表数据//nodeFrequency == 1   代表添加过搜索节点
        if (this.nodeFrequency == 1) {
          this.folderList.push(this.treeResult);
          this.pathDirectory.push(this.treeResult);
        }
        this.pathId = node.menuId;
        this.$refs.treeRef.setCurrentKey(this.pathId);
        if (hasclick == true) {
          let getNowNode = this.$refs.treeRef.getCurrentNode();
          this.handleNodeClick(getNowNode, 0, 1);
        }
        clearTimeout(timeout1)
        timeout1 = setTimeout(() => {
          this.isMenuLoad = false
        }, 500)
      },
      //局部刷新
      async partialRefresh () {
        this.$nextTick(function () {
          let getNowNode = this.$refs.treeRef.getCurrentNode();
          this.handleNodeClick(getNowNode, 0, 1);
          this.initPathSearch();
        })
        // this.handleNodeClick(node, 1)
      },
      //尾部刷新
      async footerRefresh () {
        let node = this.$refs.treeRef.getCurrentNode()
        if (node.menuId == "99999999") {
          var _this = this;
          this.nextList = [];
          var saveSearchResults = JSON.parse(JSON.stringify(this.dealTreeResultList));
          this.dealTreeResultList = [];
          this.isLoad = false;
          this.isShowFolderLoad = false
          clearTimeout(timeout3);
          this.isLoad = true
          this.isShowFolderLoad = true
          timeout3 = setTimeout(function () {
            _this.dealTreeResultList = JSON.parse(JSON.stringify(saveSearchResults));
            _this.isLoad = false
            _this.isShowFolderLoad = false
            clearTimeout(timeout3)
          }, 200);
        } else {
          let getNowNode = this.$refs.treeRef.getCurrentNode();
          this.handleNodeClick(getNowNode, 0, 1);
          await this.initPathSearch();
        }
      },
      //右击菜单树添加菜单  路径
      rightClickMenu (e, data) {
        if (data.menuId == "99999999") {
        } else {
          this.uploadedFolder = data
          this.$refs.contextMenuREF.contextMenuHandler(e)
        }
      },
      //右键转换成路径  type 传1的话路径不包含文件名
      rightClickPath (menuId, type) {
        let arrayObj = this.findIndexArray(this.folderList, menuId, [])
        let newArray = []
        arrayObj.forEach(item => {
          newArray.push(item.folderName)
        })
        if (type == 1) {
          newArray.pop()//最后一个出载
        }
        let path = this.splicePath(newArray, 0)
        return path
      },
      //创建文件夹弹框  flag 为1说明是tree的右击事件 0是表格
      newFolderWindow (flag) {
        let node = this.$refs.treeRef.getCurrentNode();
        this.hideMenu()
        this.isNewNameOrNewFolder = 'NewFolder'
        this.$emit('newFolderOrNewName', '2', '2_child', this.uploadedFolder, this.isNewNameOrNewFolder, node, flag)
      },
      // 新建文件夹
      async newFolders (newFolder, flag) {
        let node = this.$refs.treeRef.getCurrentNode()
        let length = node&&node.children.length
        if (flag == 0) {//当前目录新建文件夹
          this.$refs.treeRef.append(newFolder, node)
          this.saveFileList.splice(length, 0, newFolder)
        } else {//右击tree 当前目录下
          this.$refs.treeRef.append(newFolder, this.uploadedFolder)
          if (node.menuId === this.uploadedFolder.menuId) {//说明需要push节点
            this.saveFileList.splice(length, 0, newFolder)
          }
        }
        await this.initPathSearch();//处理刷新后的数据
        this.activeFolder(newFolder)
      },
      //新建文件夹后选中文件夹
      activeFolder (newFolder) {
        this.$nextTick(() => {
          let result = ''
          this.saveFileList.forEach(item => {
            if (newFolder.menuId == item.menuId) {
              return result = item
            }
          })
          if (this.rightTabType !== 1) {
            this.$refs.tableStatusRef.setCurrentRow(result);
            this.checkedActiveFileFun(result, this.rightTabType);
          }
          this.uploadedFolder = newFolder
        })
      },
      //删除文件夹
      delFolderOrFile (flag) {
        this.hideMenu()
        this.showDelete = true
      },
      //取消删除
      cancelEvent () {
        this.showDelete = false
      },
      //确定删除 文件夹路径 文件夹名称 文件夹id
      async determineEvent () {
        if (sharedFolderInvalid(this.uploadedFolder)) {
          this.errorMessage = this.$t('reminder.sharedError')/*共享文件夹不支持此操作*/
          this.showWarning = true
          this.showDelete = false
          return
        }
        if (sharedFolderInvalid(this.uploadedFolder) || !rightToJudge(this.uploadedFolder, this)) {
          this.errorMessage = this.$t('reminder.authority')/*您没有权限对此文件夹执行操作*/
          this.showWarning = true
          this.showDelete = false
          return
        }
        this.showDelete = false
        if (this.uploadedFolder.trueFile === true) {//删除文件
          let {data: res} = await fileDelete({
            fileName: this.uploadedFolder.fileName,
            filePath: this.uploadedFolder.filePath,
            userId: 2
          })
          // this.$http.delete('/file/delete?fileName=' + this.uploadedFolder.fileName + '&filePath=' + this.uploadedFolder.filePath + '&userId=' + 2)
          if (res.code == 200) {
            this.showDelete = false
            this.deleteFileOrFolder(this.uploadedFolder) //掉用删除的方法把展示区的文件删除
          }
          if (res.code === 4001) {
            this.showDelete = false
            this.errorMessage = this.$t('reminder.deleteFrequency')/*'超出访问次数,删除错误!'*/
            this.showWarning = true
            return
          }
          if (res.code !== 200) {
            this.showDelete = false
            this.errorMessage = this.$t('reminder.failedToDelete') /*'删除文件失败!'*/
            this.showWarning = true
          }
        } else {//删除文件夹
          if (this.uploadedFolder.parentId == 0) {
            return
          }
          let path = this.rightClickPath(this.uploadedFolder.menuId, 1)
          let {data: res} = await folderRemove({
            filePath: path,
            folderName: this.uploadedFolder.folderName,
            menuId: this.uploadedFolder.menuId,
            userId: 2
          })
          // this.$http.delete('/folder/remove?filePath=' + path + '&folderName=' + this.uploadedFolder.folderName + '&menuId=' + this.uploadedFolder.menuId + '&userId=' + 2)
          if (res.code == 200) {
            this.showDelete = false
            this.deleteFileOrFolder(this.uploadedFolder)
          }
          if (res.code === 4001) {
            this.showDelete = false
            this.errorMessage = this.$t('reminder.deleteFrequency')/*'超出访问次数,删除错误!'*/
            this.showWarning = true
            return
          }
          if (res.code !== 200) {
            this.showDelete = false
            this.errorMessage = this.$t('reminder.failedToDelete') /*'删除失败!'*/
            this.showWarning = true
          }
        }
      },
      //删除文件将文件从展示区删除
      async deleteFileOrFolder (fileParams) {
        if (fileParams.trueFile == true) {//删除文件
          this.saveFileList.forEach((item, index) => {
            if (item.fileId == fileParams.fileId) {
              this.saveFileList.splice(index, 1)
            }
          });
        } else {//文件夹
          //展开的列表里也要删除
          // let nodeIndex = this.currentNodes.indexOf(fileParams.menuId)
          // if (nodeIndex != -1) {
          //   this.currentNodes.splice(nodeIndex, 1)
          // }
          let node = this.$refs.treeRef.getCurrentNode();
          this.$refs.treeRef.remove(fileParams);
          if (node.menuId == fileParams.menuId) {//如果删除的是当前选中的就跳到root路径
            this.nodeId=[]
            // this.nodeId.forEach((item, indexs) => {
            //   if (item == node.menuId) {
            //     this.nodeId.splice(indexs, 1)
            //   }
            // });
            this.saveFileList = [];
            // this.pathId = this.folderList[0].menuId;
            await this.handleNodeClick(this.folderList[0], 0, 1);
          } else {
            this.saveFileList.forEach((value, index) => {
              if (value.menuId == fileParams.menuId) {
                this.saveFileList.splice(index, 1)//splice从哪个位置开始删除，删除几个 插入谁
              }
            })
          }
          this.rightTabType = 0;//当是搜索结果时需要切换成普通页面展示
        }
        this.$nextTick(() => {
          //清空选中状态
          this.uploadedFolder = []
          this.leftClickBlank()
          this.initPathSearch();
        });
      },
      //右击表格显示菜单事件
      contentListRightMenu (data, value, e) {
        this.$refs.tableStatusRef.setCurrentRow(data);//右击表格选中
        this.checkedActiveFileFun(data, this.rightTabType);//右击视图选中
        // let node = this.$refs.treeRef.getCurrentNode();
        this.uploadedFolder = data
        this.rightMenuIsDisable()
      },
      //右击空白处
      rightClickBlank (e) {
        this.rightMenuIsDisable()
        // console.log(this.currentHighlight)
        if (this.currentHighlight == null) {//如果当前没有选中则 上传以左侧的选中为主
          this.uploadedFolder = this.$refs.treeRef.getCurrentNode();
        }
      },
      //获取表格当前高亮的行
      getHighlight (currentRow) {
        this.currentHighlight = currentRow;
      },
      //左击空白处 移除选中装态
      leftClickBlank () {
        try {
          if (this.rightTabType == 1) {
            this.$refs.resultRef.setCurrentRow(-1);
          } else {
            $(".active_items_style").removeClass("active_items_style")
            this.$refs.tableStatusRef.setCurrentRow(-1);
          }
          this.currentHighlight = null
          this.uploadedFolder = this.$refs.treeRef.getCurrentNode();
        } catch (e) {

        }
      },
      //新建文件夹-
      newBtnClickFolder (command) {
        if (command == 'a') {
          this.uploadedFolder = this.$refs.treeRef.getCurrentNode();
          this.newFolderWindow(1)
        }
      },
      OperationFolder (command) {
        this.rightMenuIsDisable()
        if (this.uploadedFolder.parentId == this.sharedParentId && this.currentHighlight != null || this.uploadedFolder.menuId == this.sharedParentId && this.currentHighlight == null) {
          this.errorMessage = this.$t('reminder.sharedError')/*共享文件夹不支持此操作*/
          this.showWarning = true
          return
        }
        if (command == 'a') {//播放
          if (this.playVideoIsDisable == false) return
          this.playVideoFun()
        } else if (command == 'b') {//删除
          if (this.currentHighlight == null) return
          this.delFolderOrFile()
        } else if (command == 'c') {//重命名
          if (this.currentHighlight == null) return
          this.fileOrFolderRenameWindow()
        } else if (command == 'd') {//下载
          if (this.currentHighlight == null || this.downloadIsDisable == false) return
          this.downloadFile()
        } else if (command == 'e') {//预览
          if (this.PreviewIsDisable == false) return
          this.dealPreviewPictureList(this.uploadedFolder);
          //this.$emit('OpenPreview', '67', this.PhotoViewer, this.uploadedFolder, 1)
        }
      },
      dealPreviewPictureList (fileObj) {//用来处理预览图片列表
        let imgSuffix = ['png', 'gif', 'jpg', 'webp', 'ico']
        //先判断是初始列表展示还是搜索结果列表展示
        //筛选出对应的图片
        let obj = {};
        let getObjList = [];
        let getNowIndex = 0;
        if (this.rightTabType == 1) {
          this.dealTreeResultList.forEach((item, index) => {
            if (item.trueFile == true && imgSuffix.includes(item.fileExt)) {
              getObjList.push(item);
            }
          });
        } else {
          this.saveFileList.forEach((item, index) => {
            if (item.trueFile == true && imgSuffix.includes(item.fileExt)) {
              getObjList.push(item);
            }
          });
        }
        getObjList.forEach((item, index) => {
          if (item.fileId == fileObj.fileId) {
            //找到当前对象的索引值
            getNowIndex = index;
          }
        });
        obj.list = getObjList;
        obj.index = getNowIndex;
        this.$emit('OpenPreview', '67', this.PhotoViewer, obj, 1)
      },
      //右击菜单调用判断是否禁用
      rightMenuIsDisable () {
        let img_Suffix = ['jpg', 'png', 'gif', 'webp', 'ico']
        let music_Suffix = ['mp3', 'aac', 'wav']
        try {
          if (this.uploadedFolder.trueFile == false) {//右击文件夹
            this.newWindowIsDisable = false
            this.playVideoIsDisable = false
            this.PreviewIsDisable = false
            this.downloadIsDisable = false
          } else if (this.uploadedFolder.trueFile == true && isVideoSuffix(this.uploadedFolder.fileExt) || music_Suffix.includes(this.uploadedFolder.fileExt)) {//如果右击的是文件
            this.newWindowIsDisable = true
            this.playVideoIsDisable = true
            this.PreviewIsDisable = false
            this.downloadIsDisable = true
          } else if (img_Suffix.includes(this.uploadedFolder.fileExt)) {
            this.newWindowIsDisable = true
            this.playVideoIsDisable = false
            this.PreviewIsDisable = true
            this.downloadIsDisable = true
          } else {//文件
            this.newWindowIsDisable = true//允许在新页面打开
            this.playVideoIsDisable = false//禁用播放
            this.PreviewIsDisable = false//禁用预览
            this.downloadIsDisable = true//允许下载
            this.isShowUpload = false//不显示上传
          }
        } catch (e) {
        }
      },
      //过滤节点 共享文件夹增加权限 获取文件夹保存权限文件夹id
      filter_node () {
        let AuthorityId = [],
          AuthorityParentId = '',
          nodes = []
        let [SharedFolder] = this.folderList.filter(item => item.folderName == sharedParent)
        if (!SharedFolder) return
        AuthorityParentId = SharedFolder.menuId
        SharedFolder.children.forEach((item, index) => {
          this.sharedFolder[index] == 1 ? nodes.push(item) : AuthorityId.push(item.menuId)
        })
        nodes.length && nodes.forEach(item => this.$refs.treeRef.remove(item.menuId))
        this.$store.commit('AuthorityListId', {AuthorityId, AuthorityParentId})
      }
    },
    mounted () {
      this.$EventBus.$on('successFolder', (newFolder, flag) => {
        this.newFolders(newFolder, flag)
      })
      this.$EventBus.$on('folderError', (message) => {//接收错误信息
        this.errorMessage = message
        this.showWarning = true
      })
    },
    component: {},
    filters: {},
    created () {
    },
    directives: {
      Drag: {
        bind: function (el) {
          el.addEventListener('mousedown', function (e) {
            var borderRight = document.querySelector('.borderRight')
            var file_content_left = document.querySelector('.file-content-left')
            //鼠标按下将样式条的位置给鼠标
            var x = e.pageX - borderRight.offsetLeft
            //获取在弹框内的鼠标位置
            document.addEventListener('mousemove', move)

            function move (e) {
              // console.log(e.pageX-x)
              let movePosition = e.pageX - x
              borderRight.style.left = (e.pageX - x) + 'px'
              // console.log( borderRight.style.left)
              file_content_left.style.width = borderRight.offsetLeft - 4 + 'px'
              if (movePosition <= 200) {
                borderRight.style.left = 205 + 'px'
              } else if (movePosition >= 400) {
                borderRight.style.left = 405 + 'px'
              } else {
                borderRight.style.left = borderRight.style.left
              }
            }

            document.addEventListener('mouseup', mouseup)

            function mouseup (e) {
              // console.log(e.pageX + '鼠标弹起的坐标')
              document.removeEventListener('mousemove', move)
              document.removeEventListener('mouseup', mouseup)
            }
          })
        }
      }
    },
    destroyed () {
      this.$EventBus.$off('deleteItem')
      //this.$EventBus.$off('musicParams')
      this.$EventBus.$off('folderError')
      this.$EventBus.$off('folderError')
    }
  }

  //判断浏览器(可以判断ie和其他浏览器,不能区分是ie几)
  function myBrowserIE () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf('Opera') > -1;
    if (isOpera) {
      return 'Opera';
    }
    ; //判断是否Opera浏览器
    if (userAgent.indexOf('Firefox') > -1) {
      return 'FF';
    } //判断是否Firefox浏览器
    if (userAgent.indexOf('Chrome') > -1) {
      return 'Chrome';
    }
    if (userAgent.indexOf('Safari') > -1) {
      return 'Safari';
    } //判断是否Safari浏览器

    var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf('Edge') > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    if (isIE && !isOpera) {
      return 'ie';
    } else if (isEdge) {
      return 'edge';//edge
    } else if (isIE11) {
      return 'ie'; //IE11
    } else {
      return -1;//不是ie浏览器(不知道是什么浏览器)
    }

  }
</script>

<style lang="less" scoped>
  @deep: ~'>>>';
  @{deep} .list-item {
    display: inline-block;
    /*margin-right: 10px;*/
  }

  @{deep}.list-enter-active, .list-leave-active {
    transition: all 0.5s;
  }

  @{deep}.list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    /*transform: translateY(30px);*/
  }

  /*下拉列表样式*/
  .showHideListBtnDropdownList @{deep}.el-dropdown-menu__item {
    padding: 0 10px;
    max-width: 200px;
    min-width: 50px;
    overflow: hidden;
    height: 26px;
    line-height: 26px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .showHideListBtnDropdownList {
    padding: 5px;
  }

  .file-btnList @{deep} .el-dropdown {
    display: inline-block;
    border: 1px solid #C8D2DC !important;
    background-color: #F5FAFF;
    border-radius: 4px;
    /* padding: 5px 15px; */
    min-width: 59px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
  }

  .file-btnList @{deep} .el-dropdown:hover {
    border: 1px solid #B4BEC8 !important;
  }

  .file-btnList @{deep} .iconfont {
    font-size: 12px !important;
  }

  @{deep}.el-dropdown:active {
    background-image: linear-gradient(#ebf0f5, #e6ebf0);
    background-color: #E6EBF0;
  }

  .dropdowns {
    border-color: #C8D2DC;
    background-color: #FFFFFF;
    padding: 4px;
    border-radius: 0 !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    margin-top: 0px !important;
  }

  .dropdowns @{deep}.el-dropdown-menu__item {
    line-height: 26px;
    height: 26px;
    display: flex;
    padding: 0;
    width: 110px;
  }

  .el-dropdown-menu @{deep} .iconfont {
    font-size: 18px !important;
  }

  @{deep}.el-popper {
    width: 125px !important;
  }

  @{deep}.el-popper {
    padding: 0px !important;
  }

  @{deep}.el-dropdown-link {
    /*display: block;*/
    padding: 0 4px;
    /*width: 100%;*/
    /*height: 100%;*/
  }

  .el-dropdown-menu @{deep} .el-dropdown-menu__item:hover {
    background-color: #0086E5;
    color: #fff;
  }

  @{deep}.fixed-el-dropdown-menu .el-dropdown-menu__item {
    font-size: 12px;
    margin: 5px 10px;
    padding: 0;
    line-height: 26px;
    width: 136px;
    height: 28px;
  }

  @{deep}.dropdowns.fixed-el-dropdown-menu {
    padding: 6px 6px !important;
  }

  /*@{deep}ul#dropdown {
    padding: 6px;
  }*/

  @{deep}.el-autocomplete-suggestion.el-popper.pathSearchListCalss .el-popper @{deep} {
    padding: 0px !important;
  }

  .el-dropdown-menu__item span {
    /*padding-left: 10px;*/
    font-size: 12px !important;
  }

  //没有选中的时候下拉菜单的样式
  .dropdown .iconfont {
    color: #96A0AA !important;
    cursor: default !important;
  }

  .dropdown .iconfont:hover {
    background-color: #fff !important;
    color: #96A0AA !important;
  }

  /*树形控件图标样式*/
  @{deep}.el-tree {
    margin-right: 10px;
  }


  @{deep}.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #0086E5;
    color: #fff;
    border-radius: 3px;
    overflow: hidden; //溢出隐藏
    white-space: nowrap; //强制显示一行
    text-overflow: ellipsis; //超出用点点点
  }

  @{deep}.el-tree-node__content:nth-child(1) {
    /*background-color: black;*/
  }

  //设置树形展开最后一项的图标颜色
  @{deep}.el-tree-node__expand-icon.is-leaf {
    color: transparent !important;
    cursor: default;
  }

  /*  .file-content-left@{deep} .iconfont:hover {
      color: deepskyblue;
    }*/

  @{deep}.el-tree-node:focus > .el-tree-node__content {
    border-radius: 3px !important;
    padding: 3px 0;
    background-color: #ffffff;
  }

  @{deep}.el-tree-node__content:hover {
    background-color: #E6F5FF;
  }

  @{deep}.el-tree-node__content {
    /*margin-right: 10px;*/
    padding: 3px 0;
  }

  @{deep}.el-tree-node__label {
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @{deep}span.el-tree-node__expand-icon.el-icon-caret-right {
    margin-left: 12px;
  }

  //搜索结果icon样式
  @{deep}span.is-leaf.el-tree-node__expand-icon.el-icon-caret-right {
    color: #606266;
  }

  @{deep}.file-input-Switch-container @{deep}.el-autocomplete.inline-input.inputbox @{deep}input.el-input__inner {
    height: 26px
  }

  @{deep}.showHideListBtnDropdownList @{deep}.el-dropdown-menu__item {
    width: 360px;
    min-width: auto;
    font-size: 12px;
    line-height: 30px;
  }

  /*  @{deep}.el-tree-node__expand-icon{
  color: black;
  }*/
  .file {
    width: 100%;
    height: 100%;
    /*background-color: pink;*/
    box-sizing: border-box;
    position: relative;

    .file-tab {
      position: absolute;
      height: 85px;
      width: 100%;
      box-sizing: border-box;
      z-index: 6;

      .file-nav {
        height: 36px;
        width: 100%;
        margin-bottom: 8px;
        padding-left: 108px;
        overflow: hidden;
        display: flex;
        align-items: center;
        padding-right: 189px;
        box-sizing: border-box;

        .file-left {
          justify-content: flex-start;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          margin-left: -108px;
          margin-right: 5px;
        }

        .file-right {
          width: 189px;
          display: inline-flex;
          -webkit-flex-shrink: 0;
          flex-shrink: 0;
          align-items: center;
          margin-right: -189px;
          margin-left: 5px;
          height: 28px;
          /*line-height: 28px;*/
        }

        .icon-8_qianjinhoutui1, .icon-8_qianjinhoutui, .icon-shuaxin {
          font-size: 14px !important;
          /*color: #505A64;*/
          /*font-weight: bold;*/
        }

        .icon-shuaxin {
          font-weight: bold
        }

        span.el-dropdown-link.el-dropdown-selfdefine {
          display: inline-block;
          width: 100%;
          height: 100%;
        }

        .file-input-box {
          width: 100%;
          height: 28px;
          line-height: 28px;
          flex-shrink: 1;
          overflow: hidden;

          input {
            /*display: block;*/
            width: 100%;
            height: 26px;
            box-sizing: border-box;
            padding-left: 10px;
            font-size: 13px;
            color: #505A64;
            vertical-align: bottom;
          }

          input:focus {
            outline: none;
          }

          .file-input-Switch-container {
            height: 28px;
          }

          .file-input-border-show {
            border: 1px solid #C8D2DC;
            height: 26px;
          }

          .file-input-Switch {
            width: 100%;
            height: 100%;

            ul {
              display: flex;
              -webkit-flex-wrap: nowrap;
              -ms-flex-wrap: nowrap;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              padding-left: 10px;
            }

            .searchResultAddress {
              font-size: 13px;
              padding-left: 10px;

              &:hover {
                color: #0090D9;
                font-weight: bold;
              }
            }
          }

          .initPath0 {
            position: relative;
            box-sizing: border-box;
            padding-left: 26px;

            ul {
              padding-left: 0;
            }

            @{deep}.showHideListBtnDropdown {
              position: absolute;
              top: 0;
              left: 0;
              z-index: 99;
              width: 27px;
              height: 26px;
              background: #fff;
              border: 1px solid #c8d2dc;
              border-right: 0;

              .showHideListBtn {
                background-repeat: no-repeat;
                background-image: url(/static/images/global/sprite-sf4679593a0.png);
                background-position: -94px 0;
                background-color: #FFFFFF;
                cursor: pointer;
                width: 26px;
                height: 26px;
                display: inline-block;

                &:hover {
                  background-position: -94px -24px;
                }
              }
            }
          }

        }
      }

      .prevLi {
        box-sizing: border-box;
        //flex-shrink: 1;
        display: inline-block;
        //overflow: hidden;
        width: auto;
        padding-right: 18px;
      }

      .hideLi {
        flex-shrink: 1;
        overflow: hidden;
        min-width: 46px;
      }

      .lastLi {
        flex-shrink: 0;
      }

      .path-style {
        font-size: 12px;

        .path {
          max-width: 260px;
          display: inline-block;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      /*.path-style:nth-child(1) {
        padding-left: 10px;
      }*/

      .file-input {
        display: flex;
      }

      .path:hover {
        color: deepskyblue !important;
        font-weight: 700 !important;
        cursor: pointer !important;
      }

      @{deep}.icon-you {
        font-size: 18px !important;
        vertical-align: middle;
        margin-right: -18px;
        float: right;
      }

      .file-input-Favorites {
        width: 40px;
        height: 26px;
        border: 1px solid #C8D2DC;
        border-left: 0px;
        display: flex;
        justify-content: center;
        align-items: center;

        button {
          outline: none;
          border: 0;
          cursor: pointer;
          /*display: inline-block;*/
          width: 24px;
          height: 24px;
          background: url("/static/images/global/sprite-sf4679593a0.png") -70px -144px;
        }

        button:hover {
          background: url("/static/images/global/sprite-sf4679593a0.png") -70px -168px;
        }
      }
    }

    .file-right {
      @{deep}.el-input__prefix .el-input__icon.iconfont.icon-chazhao2 {
        font-size: 16px !important;
        line-height: 30px;
      }

      width: 189px;
      display: inline-flex;
      flex-shrink: 0;

      @{deep}.el-input__inner {
        border-radius: 0;
      }

      @{deep}.el-input--small .el-input__inner {
        height: 28px;
        line-height: 27px;
      }
    }
  }

  .file-left-btn-style {
    width: 32px;
    height: 28px;
    margin: 5px 0 5px 5px;
    display: inline-block;
  }

  /*按钮组样式*/

  .file-btnList {
    /*height: 28px;*/
    padding: 0 5px;
    /*margin-bottom: 4px;*/
    //切换按钮
    .Switch-view {
      position: absolute;
      right: 22px;
      top: 44px;
      width: 70px;
      height: 30px;
      display: flex;

    }
  }


  .file-content {
    padding-top: 85px;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    /*background-color: deepskyblue;*/
    position: relative;
    overflow: hidden;

    .file-content-left {
      position: relative;
      width: 233px;
      /* background-color: pink; */
      overflow-y: auto;
      height: 100%;
      /*margin-bottom: -264px;*/
      box-sizing: border-box;
      min-width: 200px;
      max-width: 400px;

      .tree-title {
        height: 26px;
        margin-right: 10px;

        .tree-title-text {
          font-size: 12px;
          color: #505a64;
          font-weight: bold;
          padding-left: 2px;
        }
      }
    }

    .borderRight {
      position: absolute;
      left: 240px;
      width: 4px;
      box-sizing: border-box;
      cursor: col-resize;
      height: 100%;
      z-index: 2;
      background: url('/static/images/fileManager/shadow_category.png') repeat-y center;
    }

    .file-content-right {
      flex-direction: column;
      display: flex;
      flex: 1;
      /*background-color: pink;*/
      position: relative;
      /*padding-left: 10px;*/
      margin-left: 20px;
      overflow: hidden;
      box-sizing: border-box;

      .file-list-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 29px;
        /*background-color: #00A4EF;*/
        /* z-index: 1;*/
        box-sizing: border-box;

        ul {
          display: flex;
          flex-wrap: wrap;
        }

        .teild-display-container {
          height: 100%;
          overflow: auto;

          .container-file {
            box-sizing: border-box;
            padding: 5px 10px 10px 15px;
            flex: 1;

            .items {
              cursor: pointer;
              float: left;

              .img {
                max-height: 128px;
                max-width: 128px;
                width: auto;
                height: auto;
              }

              .text {
                /*margin-top: 4px;*/
                text-align: center;
                font-size: 12px;
                color: #3C3C3C;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }

            .FolderLoad {
              position: relative;
              float: left;
              width: 128px;
              height: 128px;
              margin: 5px 29px 10px 27px;

              .imgs {
                display: block;
                width: 24px;
                height: 24px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 999;
              }
            }

            .active_items_style {
              background: #E6F5FF;
              border: 1px solid #A6DAFF !important;;
            }
          }

          .container-file-1 {
            display: inline-flex;
            flex-flow: column wrap;
            height: 99%;
            width: auto;

            .items {
              height: 26px;
              margin-bottom: 3px;
              margin-right: 12px;
              /*border: 1px solid transparent;*/
              max-width: 275px;
              min-width: 117px;

              .itemsBorder {
                height: 26px;
                border: 1px solid transparent;
                /*max-width: 275px;*/
                /*min-width: 117px;*/
                display: flex;
                align-items: center;
                /*justify-content: center;*/

                img {
                  display: inline-block;
                  width: 20px;
                  height: 20px;
                  /*vertical-align: middle;*/
                  /*margin-left: -24px;*/
                  /*margin-right: 4px;*/
                  padding: 0 4px;
                  z-index: 0;
                }
              }

              .text {
                display: inline-block;
                height: 24px;
                vertical-align: middle;
                max-width: 230px;
                /*padding-left: 5px;*/
                text-align: left;
                line-height: 24px;
                box-sizing: border-box;
                /*padding-right: 25px;*/
              }
            }

            .active_items_style {
              background: #E6F5FF;
              border: 1px solid #A6DAFF !important;;
            }

          }

          .container-file-2 {
            box-sizing: border-box;

            .items {
              float: left;
              /*transition-timing-function: ease-out;*/
              /*transition-duration: 218ms;*/
              /*transition-property: margin;*/
              padding: 0px;
              margin: 0px 20px 8px;
              z-index: 0;

              .itemsBorder {
                border: 1px solid transparent;
                height: 96px;
                width: 64px;

                .itemsHover {
                  height: 66px;
                  width: 64px;
                  display: table-cell;
                  text-align: center;
                  vertical-align: bottom;
                  z-index: 0;

                  img {
                    max-height: 64px;
                    max-width: 64px;
                    width: auto;
                    height: auto;
                  }
                }

                .text {
                  display: block;
                  overflow: hidden;
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  max-height: 28px;
                  margin-top: 4px;
                  line-height: 24px;
                  font-size: 12px;
                  max-width: 64px;
                  height: 24px;
                }
              }
            }

            .FolderLoad {
              height: 66px;
              width: 66px;
              margin: 0px 20px 8px;
            }

            .active_items_style {
              background: #E6F5FF;
              border: 1px solid #A6DAFF !important;;
            }
          }

          .container-file-3 {
            box-sizing: border-box;

            .items {
              float: left;
              padding: 0px;
              margin: 0px 24px 8px;
              transition-timing-function: ease-out;
              transition-duration: 218ms;
              transition-property: margin;
              height: 158px;
              width: 128px;
              z-index: 0;

              .itemsBorder {
                border: 1px solid transparent;
                height: 158px;
                width: 128px;

                .itemsHover {
                  height: 130px;
                  width: 128px;
                  display: table-cell;
                  text-align: center;
                  vertical-align: bottom;
                }

                .itemsHover > img {
                  max-height: 120px;
                  max-width: 128px;
                  width: auto;
                  height: auto;
                }
              }


              .text {
                width: 128px;
                height: 24px;
                line-height: 24px;
                margin-top: 4px;
                text-align: center;
                font-size: 12px;
                color: #3C3C3C;
              }
            }

            .FolderLoad {
              position: relative;
              float: left;
              width: 128px;
              height: 128px;
              margin: 5px 29px 10px 27px;

              .imgs {
                display: block;
                width: 24px;
                height: 24px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 999;
              }
            }

            .active_items_style {
              background: #E6F5FF;
              border: 1px solid #A6DAFF !important;;
            }
          }

          .container-file-4 {
            box-sizing: border-box;

            .items {
              float: left;
              transition-timing-function: ease-out;
              transition-duration: 218ms;
              transition-property: margin;
              padding: 0px;
              margin: 0 30px 8px;
              /*margin: 0px 65px 8px;*/

              .itemsBorder {
                border: 1px solid transparent;
                height: 284px;
                width: 256px;
              }

              .itemsHover {
                height: 258px;
                width: 256px;
                display: table-cell;
                text-align: center;
                vertical-align: bottom;
              }

              .itemsHover .img {
                max-height: 256px;
                max-width: 256px;
              }

              .text {
                height: 24px;
                width: 256px;
                line-height: 24px;
              }
            }

            .FolderLoad {
              height: 284px;
              width: 256px;
              //margin: 0px 17px 8px;
              margin: 0 30px 8px;
            }

            .active_items_style {
              background: #E6F5FF;
              border: 1px solid #A6DAFF !important;;
            }
          }

          .items:hover {
            background-color: #E6F5FF;
            /*z-index: 333;*/
          }
        }

        .table-display-container {
          height: 100%;
        }
      }

      .blank {
        /*background-color: pink;*/
        height: 100%;
        /*width: 100%;*/
        margin-bottom: 38px;
        margin-right: 10px;
      }

      .blank-zindex {
        z-index: 3;
        margin-top: 26px;
      }

      .alarm-footer {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 29px;
        line-height: 29px;
        border-top: 1px solid #EBF0F5;
        border-bottom: 1px solid #D7E1EB;
        box-sizing: border-box;
        /*background-color: #00A66E;*/

        .alarm-footer-right {
          display: flex;
          flex: 1;
          height: 100%;
          justify-content: flex-end;
          vertical-align: middle;
          padding-right: 5px;
          line-height: 29px;

          .alarm-footer-right-text {
            color: #0086E5;
            padding: 2px 8px 2px 2px;
            font-size: 12px;
            line-height: 25px;
          }

          .alarm-footer-right-icon {
            color: #0086E6;
            font-size: 12px;
            font-weight: bold;
            cursor: pointer;
            margin-left: 10px;
          }
        }
      }
    }
  }

  .FolderLoad {
    /*background: url("");*/
  }

  /*路径搜索样式修改*/
  @{deep}.el-autocomplete.inline-input.inputbox {
    width: 100%;
  }

  @{deep}.el-autocomplete.inline-input.inputbox input.el-input__inner {
    height: 28px;
    width: 100%;
    border-radius: 0;
    font-size: 12px;
    padding-top: 0;
    margin-top: 0px;
    float: left;
    padding-left: 10px;
  }

  @{deep}.pathSearchListCalss {
    margin-top: 1px;
  }

  @{deep}.pathSearchListCalss .el-autocomplete-suggestion__wrap {
    padding: 0;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  @{deep}.pathSearchListCalss .el-autocomplete-suggestion li {
    font-size: 12px;
    padding-left: 10px;
  }

  @{deep}.pathSearchListCalss .el-popper .popper__arrow {
    display: none;
  }

  /*表格的padding值 及样式*/
  @{deep}.el-table td, .el-table th {
    padding: 1px 5px !important;
  }

  @{deep}.el-table td {
    border: 0 !important;
    border-bottom: 1px solid #EBEEF5 !important;
  }

  @{deep}.el-table th > .cell {
    text-align: center;
    color: #0086E5;
    font-size: 12px;
    font-weight: 400;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @{deep}.el-table .cell {
    font-size: 12px;
    line-height: 24px;
  }

  @{deep}.el-table--border {
    border: 0;
    display: flex;
    flex-direction: column;
    overflow-y: auto !important;
  }

  @{deep}.el-table__body-wrapper {
    flex: 1;
    box-sizing: border-box;
    overflow-y: auto !important;
  }

  @{deep}.el-table--border::after {
    width: 0;
    background-color: #fff;
  }

  @{deep}.el-table::before {
    background-color: #fff;
  }

  @{deep}.tableSelect {
    background: #ecf5ff;
  }

  @{deep}.el-table .cell img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }

  @{deep}.el-table .cell span {
    vertical-align: middle;
  }

  /*上传文件*/
  @{deep}.el-upload {
    width: 100%;
    height: 100%;
    text-align: left;
  }

  @{deep} td.table_td_h {
    padding: 17px 0;
  }

  @{deep} .right-menu {
    display: none;
    position: fixed;
    background: #fff;
    border: 1px solid #bababa;
    z-index: 999;
    padding: 0px 2px 0px 2px;
    box-shadow: 2px 2px 3px 0px rgba(51, 42, 40, 0.7);
    border-radius: 1px;
  }

  .right-menu > div {
    border-bottom: 1px solid #e8eaed;
  }

  .right-menu > div:last-child {
    border: 0;
  }

  .icon-xuanxiangka1 {
    font-size: 16px !important
  }

  //右键下拉样式下拉
  .Drop-down-style {
    /*box-sizing: border-box;*/
    display: flex;
    align-items: center;
    min-width: 125px;
    max-width: 400px;
    height: 30px;
    /*margin: 3px;*/
    line-height: 30px;
    text-align: left;
    padding: 0 5px;
    margin: 2px;
    color: #505A64;
    cursor: pointer;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    .right_upload_title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      align-items: center
    }

    .iconfont {
      font-size: 20px;
      text-align: center;
      /* line-height: 23px; */
      padding-right: 5px;
      vertical-align: inherit;
      line-height: 10px;
    }
  }

  .Drop-down-style:hover {
    background: #0086E5;
    color: #fff;
  }

  .Drop-down-style1:hover {
    cursor: default !important;
    background: #fff !important;
    color: #505A64 !important;
  }

  .firstDropDown {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center
  }

  .menu-disable {
    cursor: no-drop;
    color: #96A0AA;
  }

  //菜单禁止样式
  .menuEnable {
    cursor: pointer;
    /*width: 100%;*/

    @{deep}.el-upload {
      cursor: pointer !important;
    }
  }

  .menuDisable {
    cursor: default !important;
    color: #96A0AA !important;
    background-color: #fff !important;
    height: 28px;
    width: 125px;

    @{deep}.el-upload {
      cursor: default !important;
    }
  }

  .el-dropdown-menu__item i {
    margin-right: 0px !important;
  }

  .iconStyle {
    margin: 0 5px;
  }

  .iconStyles {
    margin: 5px 0;
  }

  .menuDisable:hover {
    background-color: #fff !important;
    color: #96A0AA !important;
    cursor: default !important;
  }

  @{deep}.el-table__header-wrapper {
    position: relative;
    z-index: 5;
  }

  @{deep}.el-table__body {
    position: absolute;
    z-index: 5;
  }

  @{deep}.popper__arrow {
    visibility: hidden;
  }

  /*重整平铺布局*/
  .listContainerCenter0.file-list-container .teild-display-container ul.container-file, .listContainerCenter1.file-list-container .teild-display-container ul.container-file {
    justify-content: center !important;
  }

  .listContainerCenter0 ul.container-file .copyitems, .listContainerCenter1 ul.container-file .copyitems {
    background: #fff !important;
    box-sizing: border-box;
    cursor: initial !important;
    overflow: hidden;
    display: inline-flex;
    order: 999;
  }

  .listContainerCenter0 ul.container-file .copyitems:hover, .listContainerCenter1 ul.container-file .copyitems:hover {
    background: #fff !important;
  }

  .listContainerCenter0 .container-file-2 .copyitems, .listContainerCenter1 .container-file-2 .copyitems {
    width: 66px;
  }

  .listContainerCenter0 .container-file-3 .copyitems, .listContainerCenter1 .container-file-3 .copyitems {
    width: 128px;
  }

  .listContainerCenter0 .container-file-4 .copyitems, .listContainerCenter1 .container-file-4 .copyitems {
    width: 258px;
  }

  .file-content-right .file-list-container .container-file-2, .file-content-right .file-list-container .container-file-3, .file-content-right .file-list-container .container-file-4 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .folderStatus {
    color: #eeb22f;
    font-size: 18px;
    margin-left: 6px;
    margin-right: 6px;
  }
  span.el-tree-node__expand-icon.el-icon-caret-none {
    padding-left: 24px;
  }
  span.el-tree-node__expand-icon.folder-close {
    display: none;
  }
  span.custom-tree-node {
    display: inline-flex;
    align-items: center;
  }
</style>
