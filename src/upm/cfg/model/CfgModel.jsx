import * as service from '../service/Service';

export default {
    namespace: 'user',
    state: {
        cfgModalProps: {
            loading: false,
            visible: false,
            isNew: true,
            editData: {},
        },
        cfgPagination: {}
    },
    reducers: {
        /*打开参数弹出窗口*/
        openCfgModal: function (state, params, putState) {
            let cfgModalProps = state.cfgModalProps;
            Object.assign(cfgModalProps, params);
            return {cfgModalProps};
        },
        /*关闭参数弹出窗口*/
        closeCfgModal: function (state, params, putState) {
            let cfgModalProps = state.cfgModalProps;
            Object.assign(cfgModalProps, {visible: false});
            return {cfgModalProps};
        },
        /*查询参数列表*/
        listCfg: function (state, params, putState) {
            service.listCfg(params, putState);
        },
        /*新增参数*/
        addCfg: function (state, params, putState, dispatch) {
            service.addCfg(state, params, putState, dispatch);
        },
        /*编辑参数*/
        editCfg: function (state, params, putState, dispatch) {
            service.editCfg(state, params, putState, dispatch);
        },
        /*删除参数*/
        deleteCfg: function (state, params, putState, dispatch) {
            service.deleteCfg(state, params, putState, dispatch);
        },
    }
}
