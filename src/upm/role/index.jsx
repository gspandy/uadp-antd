import roleModel from './model/RoleModel';
import {stateContainer} from 'uadp-react';
import Root from './component/Root';
let app = new stateContainer();

app.model(roleModel);

app.debug(true);

app.ready(function(dispatch) {
  //初始化机构树
  dispatch({type: 'initTreeData'});
  //初始化功能模块树
  dispatch({type: 'initModuleTree'});
  //初始化机构类型
  dispatch({type: 'initOrgType'});
  //获取用户类型
  dispatch({type: 'getCurrentUserType'});
});

app.start(Root, 'root');
