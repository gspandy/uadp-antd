import React, {Component} from 'react';
import {Modal, Form, Tree, Button} from 'antd';
import {connect} from 'uadp-react';
import '../css/css.less';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
function ModuleModal ({dispatch, isSet, selectedModules, visible, loading, moduleTree}) {
  function onConfirm() {
    dispatch({type: 'updateRoleModule',params: {selectedModules: selectedModules}});
  }
  function onCheck(info) {
    if(isSet) {
      dispatch({type: 'checkModules', params: info});
    }
  }
  let title = (isSet ? '设置功能模块': '查看功能模块');
  let loop = function(data) {
    return data.map((item) => {
      if (item.children && item.children.length > 0) {
        return <TreeNode title={item.name} key={'' + item.key}>{loop(item.children)}</TreeNode>;
      }

      return <TreeNode title={item.name} key={'' + item.key} isLeaf={item.isLeaf}/>;
    });
  }
  let footer =(<div>
      <Button onClick={()=>dispatch({type: 'closeModuleModal'})}>返回</Button>
    {isSet?<Button type="primary" loading={loading} onClick={e=>onConfirm()}>保存</Button>:''}
  </div>);
  return (<Modal title={title} width={400} footer={footer} visible = {visible} onCancel={e=>dispatch({type:'closeModuleModal'})}>
    <div className="overflow">
    <Tree checkable
          defaultExpandedKeys={selectedModules}
          checkedKeys={selectedModules}
          onCheck={onCheck}>
      {loop(moduleTree)}
    </Tree>
    </div>
  </Modal>);
}

function mapStateToProps(state) {
  return {
    isSet: state.moduleProps.isSet,
    selectedModules: state.moduleProps.selectedModules,
    visible: state.moduleProps.visible,
    loading: state.moduleProps.loading,
    moduleTree: state.moduleProps.moduleTree,
  };
}
export default connect(mapStateToProps)(ModuleModal);
