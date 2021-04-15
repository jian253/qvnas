import getUserList from "../json/userContact/getUserList"
import pageOption from "../json/puclic/index.js"
export default {
  'post|/mock/getUserList':(params) => {
    //var info = JSON.parse(params.body);//传值传json字符串
    let newOption=JSON.parse(JSON.stringify(pageOption));
    let dataList=JSON.parse(JSON.stringify(getUserList));
    var info = JSON.parse(params);
    var [index, size, total] = [info.pageIndex, info.pageSize, dataList.length];
    var len = total / size;
    var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len;
    var newDataList = dataList.slice(index * size, (index + 1) * size);
    newOption.data.total=total;
    newOption.data.list=newDataList;
    newOption.data.pageNum=index;
    newOption.data.pageSize= size;
    newOption.data.size= totalPages;
    newOption.data.endRow= newDataList.length;
    newOption.data.pages= index;
    newOption.data.lastPage= totalPages;
    return {
      newOption
    };
  }
}
