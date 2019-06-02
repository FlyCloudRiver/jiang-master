import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index.vue'

import welcome from '../components/welcome.vue'

//采购管理
import purchasingManage from '../pageDetail/purchasingManage/purchasingManage.vue'
import PurchasingManageAddNew from '../pageDetail/purchasingManage/purchasingManageAddNew.vue'
import PurchasingManageDetail from '../pageDetail/purchasingManage/purchasingManageDetail.vue'
//厂商管理
import supplierManage from '../pageDetail/supplierManage/supplierManage'
//商品管理
import goodsManage from '../pageDetail/goodsManage/goodsManage.vue'
import addGoods from '../pageDetail/goodsManage/addGoods.vue'
//库存管理
import storageRoom from '../pageDetail/storageManage/storageRoom.vue'
import storageRoomDetail from '../pageDetail/storageManage/storageRoomDetail.vue'
//分类管理
import categoriesManage from '../pageDetail/categoriesManage/categories.vue'
//用户管理
import userManage from '../pageDetail/userManage/userManage.vue'
import purchasingManageUpdate from '../pageDetail/purchasingManage/purchasingManageUpdate.vue'

//销售管理
import shipmentManage from '../pageDetail/shipmentManage/shipmentManage.vue'
import shipmentDetail from '../pageDetail/shipmentManage/shipmentDetail.vue'
import shipmentAddManage from '../pageDetail/shipmentManage/shipmentAddManage.vue'
import shipmentUpdateManage from '../pageDetail/shipmentManage/shipmentUpdateManage.vue'
//登录
import loading from '../components/loadIng.vue'
//报表
import report from '../pageDetail/reportPage/report.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/loading'
    },
    {
      path:'/loading',
      name:'登录页',
      component:loading
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      children: [
     {
        path: 'purchasingManage',
        name: '采购单',
        component: purchasingManage
      }, {
        path: 'PurchasingManageAddNew',
        name: '采购新增',
        component: PurchasingManageAddNew,
      }, {
        path: 'PurchasingManageDetail',
        name: '采购详情',
        component: PurchasingManageDetail
      }, {
        path:'supplierManage',
        name:"厂商管理",
        component:supplierManage
      },{
        path:'goodsManage',
        name:'商品管理',
        component:goodsManage
      },{
        path:'addGoods',
        name:'新增商品',
        component:addGoods
      },{
        path:'storageRoom',
        name:'总库存',
        component:storageRoom
      },{
        path:'categoriesManage',
        name:'分类管理',
        component:categoriesManage
      },{
        path:'userManage',
        name:'用户管理',
        component:userManage
      },{
        path:'purchasingManageUpdate',
        name:"采购更新",
        component:purchasingManageUpdate
      },{
        path:'shipmentManage',
        name:'销售单管理',
        component:shipmentManage
      },{
        path:'shipmentDetail',
        name:'销售单详情',
        component:shipmentDetail
      },{
        path:'shipmentAddManage',
        name:'新增销售单',
        component:shipmentAddManage
      },{
        path:'shipmentUpdateManage',
        name:'修改销售单',
        component:shipmentUpdateManage
      },{
        path:'storageRoomDetail',
        name:'库存详情',
        component:storageRoomDetail
      },{
          path:'report',
          name:'报表',
          component:report
        },
        {
          path:'welcome',
          name:'欢迎界面',
          component:welcome
        }

      ]
    }
  ]
})
