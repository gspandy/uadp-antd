import {stateContainer} from 'uadp-react';
import OrgModel from './model/OrgModel';
import Root from './component/Root';
let app = new stateContainer();

app.model(OrgModel);
app.debug(true);
app.ready(function(dispatch) {
  //初始化机构树
  dispatch({type: 'initTreeData'});
  //初始化机构类型
  dispatch({type: 'initOrgType'});
});

app.start(Root, 'root');
