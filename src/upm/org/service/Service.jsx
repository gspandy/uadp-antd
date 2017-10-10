import {request} from 'uadp-react';
import {Modal,message} from 'antd';
const confirm = Modal.confirm;

/**
 * 加载机构树数据
 */
export function initOrgTree(params, put, dispatch) {
  request.post('queryOrgTree.do', function(res) {
    let selectTreeKey = null;
    if(res && res.length > 0) {
      selectTreeKey = res[0].id;
    }
    put({orgTreeData: res, selectTreeKey: selectTreeKey});
    dispatch({type: 'onOrgTreeSelect', params: {selectTreeKey: selectTreeKey}});
  });
}

/**
 * 加载机构类型数据
 */
export function initOrgType(put) {
  request.post('../dict/queryDict.do', {key:'org_type'}, function (res) {
    put({orgType: res});
  });
}

export function queryOrg(id, cascade, put) {
  request.get('queryOrg.do', {id:id, cascade: cascade}, function (res) {
    put({selectTreeKey: id, cascade: cascade, dataSource: res});
  });
}

export function saveOrg(state, org, put, dispatch) {
  if(state.isNew) {
    put({loading: true});
    request.post('insertOrg.do', Object.assign({}, org, {parentId: state.selectTreeKey}), function() {
      put({loading: false, visible: false});
      dispatch({type: 'initTreeData'});
      message.success('新建机构成功！');
    },function (err) {
      put({loading: false});
      message.success('保存机构发生错误！');
    });
  }else {
    request.post('updateOrg.do', org, function() {
      put({loading: false, visible: false});
      dispatch({type: 'initTreeData'});
      message.success('修改机构成功！');
    }, function (err) {
      put({loading: false});
      message.success('修改机构发生错误！');
    });
  }
}

export function deleteOrg(org, dispatch) {
  confirm({
    title: '确认删除这条记录吗？',
    onOk() {
      request.post('delOrg.do', {id: org.id}, function(){
        dispatch({type: 'initTreeData'});
        message.success('删除机构成功！');
      });
    },
  });
}

export function queryOrgByName(params, put) {
  request.post('queryOrgByName.do', params, function(res){
    put({dataSource: res});
  });
}
