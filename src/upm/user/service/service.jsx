import {request} from 'uadp-react';
import {Modal, message} from 'antd';
const confirm = Modal.confirm;
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

export function queryUserListByOrgId(orgId, put) {
  request.post('queryUserListByOrgId.do', {orgId: orgId}, function(res) {
    put({dataSource: res, selectTreeKey: orgId});
  });
}

export function generatePinyin(state, params, put) {
  request.post('pinyin.do', {userName: params.name}, function(res) {
    state.userProps.editUser.pinyin = res;
    put({userProps: state.userProps});
  });
}

/**
 * 初始化用户类型
 */
export function initUserType(state, put) {
  request.post('../dict/queryDict.do', {key:'user_type'}, function (res) {
    let userProps = state.userProps;
    Object.assign(userProps, {userType: res});
    put({userProps: userProps});
  });
}

export function saveUser(state, params, put, dispatch) {
  let userProps = state.userProps;
  if(userProps.isNew) {
    Object.assign(userProps, {loading: true});
    put({userProps: userProps});
    request.post('insertUser.do',Object.assign(params, {toOrgId: state.selectTreeKey}), function(res) {

      if(res.success) {
        Object.assign(userProps, {loading: false, visible: false});
        message.success(res.msg, 3);
      }else {
        Object.assign(userProps, {loading: false});
        message.error(res.msg, 3);
      }
      put({userProps: userProps});
      dispatch({type: 'refreshUserList'});
    },function (err) {
      Object.assign(userProps, {loading: false});
      put({userProps: userProps});
      message.success('新建用户失败！');
    });
  }else {
    request.post('updateUser.do', params, function() {
      Object.assign(userProps, {loading: false, visible: false});
      put(userProps);
      dispatch({type: 'refreshUserList'});
      message.success('修改角色成功！');
    }, function (err) {
      Object.assign(userProps, {loading: false});
      put(userProps);
      message.success('修改用户失败！');
    });
  }
}

export function deleteUser(state, params, put, dispatch) {
  confirm({
    title: '确认删除这条记录吗？',
    onOk() {
      request.get('deleteUser.do', params, function(res) {
        message.success('删除用户成功！');
        dispatch({type: 'onOrgTreeSelect',params: {selectTreeKey: state.selectTreeKey}});
      });
    }
  });
}

export function resetPassword(state, params, put, dispatch) {
  let resetPasswordProps = state.resetPasswordProps;
  Object.assign(resetPasswordProps, {loading: true});

  put({resetPasswordProps: resetPasswordProps});
  request.post('resetPassword.do', params, function() {
    Object.assign(resetPasswordProps, {loading: false, visible: false});
    put(resetPasswordProps);
    message.success('重置密码成功！');
  }, function (err) {
    Object.assign(resetPasswordProps, {loading: false});
    put(resetPasswordProps);
    message.success('重置密码失败！');
  });
}

export function openSetRoleModal(state, params, put, dispatch) {
  request.post('ownerRole.do', {orgId: params.toOrgId, uid: params.uid}, function(res) {
    let setRoleProps = state.setRoleProps;
    setRoleProps.allRole = res.allRole;
    setRoleProps.setUid = params.uid;
    let ownerRole = [];
    /*if(res.ownerRole && res.ownerRole.length > 0) {
      for(let i = 0; i < res.ownerRole.length; i++) {
        for(let j = 0; j < res.allRole.length; j++) {
          if(res.ownerRole[i].key == res.allRole[j]) {
            ownerRole.push(res.allRole[j]);
            break;
          }
        }
      }
    }*/
    setRoleProps.ownerRole = res.ownerRole;
    put({setRoleProps: setRoleProps});
  });
}

export function saveUserRole(state, params, put, dispatch) {
  let setRoleProps = state.setRoleProps;
  request.post('updateUserRole.do', {uid: setRoleProps.setUid, roles: setRoleProps.ownerRole}, function(res) {
    dispatch({type: 'closeSetRoleModal'});
    message.success('设置用户角色成功',3);
  });
}

export function getCurrentUserType(state, params, put, dispatch) {
  request.post('getCurrentUserType.do', function (res) {
    put({currentUserType: res});
  })
}
