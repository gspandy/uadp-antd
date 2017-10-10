import * as service from '../service/Service';

export default {
  namespace:'org',
  state: {
    loading: false,
    visible: false,
    isNew: true,
    editData: {},
    orgType: [],
    cascade: false,
    orgTreeData: [],
    dataSource: [],
  },
  reducers: {
    /*初始化加载机构树*/
    initTreeData: function (state, params, put, dispatch) {
      service.initOrgTree(params, put, dispatch);
    },
    /*初始化机构类型*/
    initOrgType: function (state, params, put) {
      service.initOrgType(put);
    },
    /*选中组织机构树*/
    onOrgTreeSelect: function (state, params, put) {
      service.queryOrg(params.selectTreeKey, state.cascade, put);
    },
    /*选中/取消级联显示复选框*/
    onCascadeCheck: function (state, params, put) {
      service.queryOrg(state.selectTreeKey, params.cascade, put);
    },
    /*打开机构弹出框*/
    openOrgModal: function (state, params) {
      return {...params, visible: true};
    },
    /*关闭机构弹出框*/
    closeOrgModal: function (state, params) {
      return {visible: false};
    },
    /*保存组织机构*/
    saveOrg: function (state, params, put, dispatch) {
      service.saveOrg(state, params, put, dispatch);
    },
    /*删除机构*/
    deleteOrg: function (state, params, put, dispatch) {
      service.deleteOrg(params, dispatch);
    }
  }
}
