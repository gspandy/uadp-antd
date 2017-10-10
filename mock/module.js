'use strict';

module.exports = {
  'GET /module/queryModule.do': function (req, res) {
      res.json([
        {key:'1', name:'功能模块管理', url:'module/index.html', remark:'功能模块管理'},
        {key:'2', name:'用户管理', url:'userMgr/index.html', remark:'用户管理'}

      ]);
  },
};
