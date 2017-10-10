import {request} from 'uadp-react';
import {Modal,message} from 'antd';
const confirm = Modal.confirm;
/**
 * 加载机构树数据
 */
export function initOrgTree(params, put, dispatch) {
  request.post('../org/queryOrgTree.do', function(res) {
    let selectTreeKey = null;
    if(res && res.length > 0) {
      selectTreeKey = res[0].id;
    }
    put({orgTreeData: res, selectTreeKey: selectTreeKey});
    dispatch({type: 'onOrgTreeSelect', params: {selectTreeKey: selectTreeKey}});
  });
}

export function initOrgType(state, put) {
  request.post('../dict/queryDict.do', {key:'org_type'}, function (res) {
    let roleProps = state.roleProps;
    Object.assign(roleProps, {orgType: res});
    put({roleProps: roleProps});
  });
}

export function queryRoleList(orgId, put) {
  request.post('queryRoleList.do', {orgId: orgId}, function(res) {
    put({dataSource: res, selectTreeKey: orgId});
  });
}

export function queryModuleTree(state, put) {
  request.post('../module/queryModuleTree.do', function(res) {
    let moduleProps = state.moduleProps;
    Object.assign(moduleProps, {moduleTree: res});
    put({moduleProps: moduleProps});
  });
}

export function saveRole(state, params, put, dispatch) {
  let roleProps = state.roleProps;
  if(roleProps.isNew) {
    Object.assign(roleProps, {loading: true});
    put(roleProps);
    request.post('insertRole.do',Object.assign(params, {toOrgId: state.selectTreeKey}), function() {
      Object.assign(roleProps, {loading: false, visible: false});
      put(roleProps);
      dispatch({type: 'refreshRoleList'});
      message.success('新建角色成功！');
    },function (err) {
      Object.assign(roleProps, {loading: false});
      put(roleProps);
      message.success('新建角色失败！');
    });
  }else {
    request.post('updateRole.do', params, function() {
      Object.assign(roleProps, {loading: false, visible: false});
      put(roleProps);
      dispatch({type: 'refreshRoleList'});
      message.success('修改角色成功！');
    }, function (err) {
      Object.assign(roleProps, {loading: false});
      put(roleProps);
      message.success('修改角色失败！');
    });
  }
}

export function deleteRole(state, params, put, dispatch) {
  confirm({
    title: '确认删除这条记录吗？',
    onOk() {
      request.get('deleteRole.do', params, function(res) {
        message.success('删除角色成功！');
        dispatch({type: 'onOrgTreeSelect',params: {selectTreeKey: state.selectTreeKey}});
      });
    }
  });
}

export function queryRoleModuleList(state, params, put) {
  let moduleProps = state.moduleProps;
  Object.assign(moduleProps, {visible: true, isSet: params.isSet});
  request.post('queryRoleModuleList.do', params, function(res) {
    Object.assign(moduleProps, {selectedModules: res});
    put({moduleProps: moduleProps, setRoleId: params.roleId});
  });
}

export function updateRoleModule(state, params, put, dispatch) {
  let p = {roleId: state.setRoleId, 'modules[]': params.selectedModules};
  request.post('updateRoleModule.do', p, function(res) {
    dispatch({type: 'closeModuleModal'});
    message.success('设置角色功能模块成功！');
  });
}

export function filterTree(selectedModules, moduleTree) {
  let rtn = [];
  for(let i = 0; i < selectedModules.length; i++) {
      if(!existTree(selectedModules[i], moduleTree)) {
        rtn.push(selectedModules[i]);
      }
  }
  return rtn;
}

export function getCurrentUserType(state, params, put, dispatch) {
  request.post('../user/getCurrentUserType.do', function (res) {
    put({currentUserType: res});
  })
}

function existTree(module, moduleTree) {
  for(let i = 0; i < moduleTree.length; i++) {
    if(moduleTree[i].children != null && moduleTree[i].children.length > 0) {
      if(module == moduleTree[i].key) {
        return true;
      }else {
        return existTree(module, moduleTree[i].children);
      }
    }

  }
  return false;
}

