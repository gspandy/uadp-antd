import {request} from 'uadp-react';
export function init() {
  request.post('queryModuleTree.do', function(res) {
      this.setState({treeData: res});
  }.bind(this));
}

export function sort(params) {
  request.post('sort.do', params, function(res) {

  }.bind(this));
}
