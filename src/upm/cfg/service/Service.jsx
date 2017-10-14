import {request} from 'uadp-react';
import {Modal,message} from 'antd';
const confirm = Modal.confirm;

 /**
 * 查询参数列表
 */
export function listCfg(params, putState) {
  request.post('listCfg.do', params, function(res) {
    putState({cfgPagination: res});
  });
}

/**
 * 保存系统信息
 */
export function addCfg(state, params, putState, dispatch) {
  let cfgModalProps = state.cfgModalProps;
  Object.assign(cfgModalProps, {loading: true});
  putState(cfgModalProps);
  request.post('addCfg.do', params, function() {
    Object.assign(cfgModalProps, {loading: false, visible: false});
    putState(cfgModalProps);
    dispatch('listCfg', {name:''});
  });
}

/**
 * 编辑系统信息
 */
export function editCfg(state, params, putState, dispatch) {
  let cfgModalProps = state.cfgModalProps;
  Object.assign(cfgModalProps, {loading: true});
  putState(cfgModalProps);
  request.post('updateCfg.do', values, function() {
    Object.assign(cfgModalProps, {loading: false, visible: false});
    putState(cfgModalProps);
    dispatch('listCfg', {name:''});
  },function (err) {
    Object.assign(cfgModalProps, {loading: false});
    putState(cfgModalProps);
  });
}

export function deleteCfg(state, params, putState, dispatch) {
  confirm({
    title: '确认删除这条记录吗？',
    onOk() {
      request.get('deleteCfg.do', {id:params.id}, function(res) {
        message.success('删除参数成功！');
        dispatch('listCfg', {name:''});
      });
    }
  });
}