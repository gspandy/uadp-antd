// import {stateContainer} from 'uadp-react';
import SysModel from './model/SysModel';
import {stateContainer} from 'uadp-react';
import Root from './component/Root';
let app = new stateContainer();

app.model(SysModel);

app.debug(true);

app.ready(function(dispatch) {
  dispatch({type:'querySys',params:{name:''}});
});

app.start(Root, 'root');
