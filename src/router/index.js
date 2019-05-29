import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index.vue'
import Grad from '../pageDetail/grad.vue'
import Markey from '../pageDetail/markey.vue'
// import Index from '@/components/Index'
import StoreManageOut from '../pageDetail/StoreManageOut.vue'
import StoreManageOutDetail from '../pageDetail/storeManageout/storeManageOutDetail.vue'
import StoreManageIn from '../pageDetail/storeManageIn.vue'
import PurchasingManage from '../pageDetail/purchasingManage.vue'
import StoreManageInDetail from '../pageDetail/StoreManageIn/storeManagInDetail.vue'
import PurchasingManageAddNew from '../pageDetail/purchasingManage/purchasingManageAddNew.vue'
import PurchasingManageDetail from '../pageDetail/purchasingManage/purchasingManageDetail.vue'
import orderManagement from '../pageDetail/orderManagement.vue'
import orderManagementAddNew from '../pageDetail/orderManagement/orderManagementAddNew.vue'
import orderManagementDetail from '../pageDetail/orderManagement/orderManagementDetail.vue'
import supplier from '../pageDetail/supplier.vue'

import goodsManage from '../pageDetail/goodsManage/goodsManage.vue'
import addGoods from '../pageDetail/goodsManage/addGoods.vue'

import totalInventory from '../pageDetail/totalInventory.vue'
import UserManagement from '../pageDetail/userManagement.vue'
import userManagement1 from '../pageDetail/userManagement.1.vue'
import purchasingManageUpdate from '../pageDetail/purchasingManage/purchasingManageUpdate.vue'
import purchasingManage1 from '../pageDetail/purchasingManage.1.vue'
import SalesList from '../pageDetail/SalesList.vue'
import saleListDetail from '../pageDetail/salesList/saleListDetail.vue'
import salesListAddNew from '../pageDetail/salesList/salesListAddNew.vue'
import loading from '../components/loadIng.vue'
import saleListMobile from '../pageDetail/salesList/saleListMobile.vue'
import totalInventoryDetail from '../pageDetail/totalInventory/totalInventoryDetail.vue'
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
      children: [{
        path: 'Grad',
        name: '首页',
        component: Grad,
      }, {
        path: 'Markey',
        name: '第二页',
        component: Markey
      }, {
        path: 'StoreManageOut',
        name: '出库管理',
        component: StoreManageOut
      }, {
        path: 'StoreManageOutDetail',
        name: '出库详情',
        component: StoreManageOutDetail
      }, {
        path: 'StoreManageIn',
        name: '入库管理',
        component: StoreManageIn
      },
      {
        path: 'StoreManageInDetail',
        name: '入库详情',
        component: StoreManageInDetail
      }, {
        path: 'PurchasingManage',
        name: '采购单',
        component: PurchasingManage
      }, {
        path: 'PurchasingManageAddNew',
        name: '采购新增',
        component: PurchasingManageAddNew,
      }, {
        path: 'PurchasingManageDetail',
        name: '采购详情',
        component: PurchasingManageDetail
      },  {
        path: 'orderManagementAddNew',
        name: '订单新增',
        component: orderManagementAddNew
      }, {
        path: 'orderManagementDetail',
        name: '订单详情',
        component: orderManagementDetail
      }, {
        path: 'orderManagement',
        name: '订单管理',
        component: orderManagement
      },{
        path:'supplier',
        name:"厂商",
        component:supplier
      },{
        path:'goodsManage',
        name:'商品资料管理',
        component:goodsManage
      },{
        path:'addGoods',
        name:'新增商品',
        component:addGoods
      },{
        path:'totalInventory',
        name:'总库存',
        component:totalInventory
      },{
        path:'UserManagement',
        name:'分类管理',
        component:UserManagement
      },{
        path:'userManagement1',
        name:'用户管理',
        component:userManagement1
      },{
        path:'purchasingManageUpdate',
        name:"采购更新",
        component:purchasingManageUpdate
      },{
        path:'purchasingManage1',
        name:'采购管理',
        component:purchasingManage1
      },{
        path:'SalesList',
        name:'销售单',
        component:SalesList
      },{
        path:'saleListDetail',
        name:'销售单详情',
        component:saleListDetail
      },{
        path:'salesListAddNew',
        name:'销售单新增',
        component:salesListAddNew
      },{
        path:'saleListMobile',
        name:'销售单修改',
        component:saleListMobile
      },{
        path:'totalInventoryDetail',
        name:'库存详情',
        component:totalInventoryDetail
      }

      ]
    }
  ]
})
