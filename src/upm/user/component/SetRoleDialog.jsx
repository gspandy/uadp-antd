import React, {Component, PropTypes} from 'react';
import {Transfer, Modal, message} from 'antd';
import {connect} from 'uadp-react';
function UserModal({dispatch, visible, loading, allRole, ownerRole}){
  function onOk() {
    if(ownerRole && ownerRole.length > 0) {
      dispatch({type: 'saveUserRole'});
    }else {
      message.error('未选择角色！', 3);
    }
  }

  function onChange(targetKeys, direction, moveKeys) {
    dispatch({type: 'moveRole', scope:'self', params: targetKeys});
    console.log('targetKeys: ', targetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  }

  return (<Modal title="设置角色" okText="保存" cancelText="返回" visible = {visible} width={500}
                   confirmLoading={loading} onOk={e=>onOk()} onCancel={e=>dispatch({type: 'closeSetRoleModal'})}>
    <Transfer listStyle={{width: 200, height: 300,}}
      onChange={onChange}
      dataSource={allRole}
      notFoundContent="无"
      titles={['待选角色', '已选角色']}
      targetKeys={ownerRole}
      render={item => item.title}
    />

    </Modal>);
}

function mapStateToProps(state) {
  return {
    visible: state.setRoleProps.visible,
    loading: state.setRoleProps.loading,
    allRole: state.setRoleProps.allRole,
    ownerRole: state.setRoleProps.ownerRole,
  };
}
export default connect(mapStateToProps)(UserModal);
