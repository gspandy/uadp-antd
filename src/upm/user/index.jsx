import Root from './component/Root';
import {stateContainer} from 'uadp-react';
import model from './model/UserModel';

let app = new stateContainer();

app.model(model);

app.debug(true);

app.ready(function(dispatch) {
  dispatch({type: 'initOrgTree'});
  dispatch({type:'initUserType'});
  dispatch({type:'getCurrentUserType'});
});

app.start(Root, 'root');
