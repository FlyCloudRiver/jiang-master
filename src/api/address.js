//测试
export const test='/userInfo/login'//登陆
export const test2='/bigCategory/insert'//查询ById
//厂商
export const supplierINsert='/supplier/insert'//添加
export const supplierSelect='/supplier/select' //(动态分页)查询
export const supplierDelete='/supplier/delete'//删除
export const supplierUpdate='/supplier/update'//更新
export const supplierSelectAll='/supplier/selectAll'//查询所有
//商品
export const goodsInsert='/goods/insert'//添加
export const goodsSelect='/goods/select'//分页动态查询
export const goodsDelete='/goods/delete'//删除
export const goodsUpdate='/goods/update'//修改
export const goodsSelectById='/goods/selectById'//查询ById
//分类
export const bigCategorySelectAll='/bigCategory/selectAll'//查询类list
export const selectBigCategoryById='/bigCategory/selectOne'
export const insertAll='/allCategory/insert'
export const bigCategoryInsert='/bigCategory/insert'//添加大类
export const bigCategoryUpdate='/bigCategory/update'//修改大类
export const bigCategoryDelete='/bigCategory/delete'//删除大类
export const secondaryCategoryDelete='/secondaryCategory/delete'//删除中类
export const categoryDelete='/category/delete'//删除细类
export const categoryInsert='/category/insert'//添加细类
export const categoryAndCategoryInsert='/allCategory/update'//更新中类和细类


export const categoryList='/category/selectAll'//查询细类所有
export const secondaryCategoryUpdate='/secondaryCategory/update'//修改中类
export const category='/category/selectAll'//查询
//用户
export const userInsert='/user/insert' //添加（用户名唯一）
export const userSelect='/user/select'//查找所有（分页）
export const userUpdate='/user/update'//修改
export const userDelete='/user/delete'//删除
//采购管理
export const purchaseIndert='/purchase/insert'//生成采购单
export const purchaseSelect='/purchase/select'//采购单动态分页显示
export const purchaseSelectDetail='/purchase/selectId'//获取采购单详情
export const purchaseDelete='/purchase/delete'//删除
export const purchaseUpdate='/purchase/update'//更新采购单
//库存
export const storeroomSelect='/storeroom/selectAll'//商品库存所有
export const roomList='/storeroom/select'//商品库存动态分页显示
export const storeroomInsert='/storeroom/insert'//商品进库
export const storeroomOutput='/storeroom/output'//商品出库
export const storeroomSelectInfo='/storeroom/selectInfo'//根据商品id查询交易记录
//销售
export const shipmentDelete='/shipment/delete'//删除
export const shipmentInsert='/shipment/insert'//生成销售单
export const shipmentSelect='/shipment/select'//销售单动态分页显示
export const shipmentSelectDetail='/shipment/selectDetail'//获取销售单详情
export const shipmentUpdate='/shipment/update'//更新采购单
//登录
export const userInfoLogin='/userInfo/login'//登陆
//省市区
export const provinceSelect='/province/select'//查找省份
export const provinceCity = '/province/selectCity'//查找市
export const provinceArea = '/province/selectArea'//查找区县
//查看报表
export const report = '/storeroom/selectReport'
