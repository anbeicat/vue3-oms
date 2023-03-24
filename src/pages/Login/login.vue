<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { token } from '../../services/user';
import { onMounted } from 'vue'
import { useDefaultStore } from "../../store/defaultSettings"
import { dynamicRoutes, dynamicButtons } from '../../services/user';
import router from '../../router/index'
const autoLogin = true
const form = reactive({
  account: '',
  password: '',
});
const defaultStore = useDefaultStore()
// 储存token
const setAuthMsg = async (data: any) => {
  const defaultStore = useDefaultStore()
  const { tokenType, accessToken, authority, userName } = data;
  const token = `${tokenType} ${accessToken}`;
  defaultStore.getToken(token)
  useLocalStorage('token', token);
  useLocalStorage('accessToken', accessToken);
  useLocalStorage('authority', authority);
  useLocalStorage('current-user', {
    signInType: 0,
    name: userName,
    ...data,
  });
  useLocalStorage('routes', null).value = null;
  useLocalStorage('buttons', null).value = null;
  if (defaultStore.token) {
    try {
      let routes = await dynamicRoutes()
    let buttons = await dynamicButtons()
    useLocalStorage('routes', routes)
    useLocalStorage('buttons', buttons)
    defaultStore.getRoutes(routes)
    defaultStore.getButtons(buttons)
    router.push('/')
    } catch (error) {
    useLocalStorage('routes', [{ "id": "1564816631186747394", "parentId": "0", "code": "orderManagement", "name": "销售管理", "shortName": "订单", "alias": "orderManagement", "path": "/orderManagement", "source": "<SolutionOutlined />", "sort": 0, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "children": [{ "id": "1587348706406068225", "parentId": "1564816631186747394", "code": "sellPlanOneself", "name": "销售计划(自)", "alias": "sellPlanOneself", "path": "/orderManagement/sellPlanOneself", "sort": 0, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1598563140231131137", "parentId": "1564816631186747394", "code": "sellPlanAgent", "name": "销售计划(代)", "alias": "sellPlanAgent", "path": "/orderManagement/sellPlanAgent", "sort": 1, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1587350459440590849", "parentId": "1564816631186747394", "code": "sellOrderManagement", "name": "销售订单管理", "alias": "sellOrderManagement", "path": "/orderManagement/sellOrderManagement", "sort": 2, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1564853296534024194", "parentId": "1564816631186747394", "code": "advanceOrderManagement", "name": "预订订单", "shortName": "预订单", "alias": "advanceOrderManagement", "path": "/orderManagement/advanceOrderManagement", "sort": 5, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }], "hasChildren": false }, { "id": "1541328706483896321", "parentId": "0", "code": "archiveManagement", "name": "档案管理", "shortName": "档案", "alias": "archiveManagement", "path": "/archiveManagement", "source": "<FolderViewOutlined />", "sort": 1, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "children": [{ "id": "1542346299637133314", "parentId": "1541328706483896321", "code": "ProductFiles", "name": "产品档案", "alias": "ProductFiles", "path": "/archiveManagement/ProductFiles", "sort": 3, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1542349235691876354", "parentId": "1541328706483896321", "code": "buyArchives", "name": "买家档案", "shortName": "买家", "alias": "buyArchives", "path": "/archiveManagement/buyArchives", "sort": 4, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1542350846099091457", "parentId": "1541328706483896321", "code": "warehouse", "name": "仓库档案", "shortName": "仓库", "alias": "warehouse", "path": "/archiveManagement/warehouse", "sort": 5, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1620329936634146817", "parentId": "1541328706483896321", "code": "printTemplate", "name": "打印模板", "alias": "printTemplate", "path": "/archiveManagement/printTemplate", "sort": 6, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }], "hasChildren": false }, { "id": "1542341392209178626", "parentId": "0", "code": "inventoryManagement", "name": "库存管理", "shortName": "库存", "alias": "inventoryManagement", "path": "/inventoryManagement", "source": "<AppstoreOutlined />", "sort": 2, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "children": [{ "id": "1542347612567531522", "parentId": "1542341392209178626", "code": "warehouseDemand", "name": "库存查询", "alias": "warehouseDemand", "path": "/inventoryManagement/warehouseDemand", "sort": 5, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }], "hasChildren": false }, { "id": "1542348313033076737", "parentId": "0", "code": "marketSell", "name": "销售设置", "alias": "marketSell", "path": "/marketSell", "source": "<DollarCircleOutlined />", "sort": 3, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "children": [{ "id": "1542348566570364930", "parentId": "1542348313033076737", "code": "reserve", "name": "预留管理", "alias": "reserve", "path": "/marketSell/reserve", "sort": 1, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1542349827529142274", "parentId": "1542348313033076737", "code": "purchaseLimitation", "name": "限购管理", "alias": "purchaseLimitation", "path": "/marketSell/purchaseLimitation", "sort": 2, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1559714619260563458", "parentId": "1542348313033076737", "code": "freeGift", "name": "配套属性", "alias": "freeGift", "path": "/marketSell/freeGift", "sort": 3, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1542351332726435841", "parentId": "1542348313033076737", "code": "allowance", "name": "余量显示", "shortName": "余量", "alias": "allowance", "path": "/marketSell/allowance", "sort": 4, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1597777013207363586", "parentId": "1542348313033076737", "code": "orderSetting", "name": "订单设置", "alias": "orderSetting", "path": "/marketSell/orderSetting", "sort": 5, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }], "hasChildren": false }, { "id": "1542345713915162626", "parentId": "0", "code": "resourceManagement", "name": "资源管理", "shortName": "资源", "alias": "resourceManagement", "path": "/resourceManagement", "source": "<GoldOutlined />", "sort": 4, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "children": [{ "id": "1542347047582199810", "parentId": "1542345713915162626", "code": "InstitutionalManagement", "name": "机构管理", "alias": "InstitutionalManagement", "path": "/resourceManagement/InstitutionalManagement", "sort": 1, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1542347409059901441", "parentId": "1542345713915162626", "code": "UserManagement", "name": "用户管理", "alias": "UserManagement", "path": "/resourceManagement/UserManagement", "sort": 2, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1542347546041675778", "parentId": "1542345713915162626", "code": "RoleManagement", "name": "角色管理", "alias": "RoleManagement", "path": "/resourceManagement/RoleManagement", "sort": 3, "category": 1, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }], "hasChildren": false }])
    useLocalStorage('buttons', [{ "code": "ProductFiles", "buttons": [{ "id": "1542746253295775746", "parentId": "1542346299637133314", "code": "ProductFiles_restrictionsSetting", "name": "限购设置", "alias": "ProductFiles_restrictionsSetting", "path": "/archiveManagement/ProductFiles/restrictionsSetting", "sort": 1, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1542405522542718977", "parentId": "1542346299637133314", "code": "ProductFiles_switchSetting", "name": "启用/禁用", "alias": "ProductFiles_switchSetting", "path": "/archiveManagement/ProductFiles/switchSetting", "sort": 3, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1543870851739447298", "parentId": "1542346299637133314", "code": "ProductFiles_detail", "name": "产品详情", "alias": "detail", "path": "/archiveManagement/ProductFiles/detail", "sort": 5, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }] }, { "code": "InstitutionalManagement", "buttons": [{ "id": "1543770719639465986", "parentId": "1542347047582199810", "code": "InstitutionalManagement_detail", "name": "一级机构详情", "alias": "detail", "path": "/resourceManagement/InstitutionalManagement/detail", "sort": 3, "category": 2, "action": 2, "isOpen": 2, "remark": "一级机构详情", "isDeleted": 0, "hasChildren": false }, { "id": "1546325540548538370", "parentId": "1542347047582199810", "code": "InstitutionalManagement_TwoDetail", "name": "二级、三级机构详情", "alias": "detail", "path": "/resourceManagement/InstitutionalManagement/edit", "sort": 4, "category": 2, "action": 2, "isOpen": 1, "remark": "二级、三级机构详情", "isDeleted": 0, "hasChildren": false }] }, { "code": "UserManagement", "buttons": [{ "id": "1543767539820163073", "parentId": "1542347409059901441", "code": "UserManagement_add", "name": "创建", "alias": "add", "path": "/resourceManagement/UserManagement/add", "sort": 1, "category": 2, "action": 1, "isOpen": 2, "isDeleted": 0, "hasChildren": false }, { "id": "1543767674918694913", "parentId": "1542347409059901441", "code": "UserManagement_edit", "name": "编辑", "alias": "edit", "path": "/resourceManagement/UserManagement/edit", "sort": 2, "category": 2, "action": 2, "isOpen": 2, "isDeleted": 0, "hasChildren": false }, { "id": "1636602358967402498", "parentId": "1542347409059901441", "code": "editErp", "name": "用户编码", "alias": "edit", "path": "/resourceManagement/UserManagement/editErp", "sort": 3, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }] }, { "code": "RoleManagement", "buttons": [{ "id": "1542348652075446273", "parentId": "1542347546041675778", "code": "RoleManagement_edit", "name": "编辑", "alias": "edit", "path": "/resourceManagement/RoleManagement/edit", "sort": 1, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1542348782488940546", "parentId": "1542347546041675778", "code": "RoleManagement_add", "name": "创建", "alias": "add", "path": "/resourceManagement/RoleManagement/add", "sort": 2, "category": 2, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }] }, { "code": "warehouseDemand", "buttons": [{ "id": "1630752941608693761", "parentId": "1542347612567531522", "code": "warehouseDetail_frozen", "name": "冻结", "alias": "warehouseDetail_frozen", "path": "/inventoryManagement/warehouseDemand/detail/frozen", "sort": 0, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1544875353451950082", "parentId": "1542347612567531522", "code": "warehouseDemand_detail", "name": "库存明细", "alias": "detail", "path": "/inventoryManagement/warehouseDemand/detail", "sort": 1, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }] }, { "code": "reserve", "buttons": [{ "id": "1542348748158562305", "parentId": "1542348566570364930", "code": "reserve_add", "name": "新增预留", "alias": "add", "path": "/marketSell/reserve/add", "sort": 1, "category": 2, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1542348918535385089", "parentId": "1542348566570364930", "code": "reserve_edit", "name": "编辑预留", "alias": "edit", "path": "/marketSell/reserve/edit", "sort": 2, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1542349293032206338", "parentId": "1542348566570364930", "code": "reserve_detail", "name": "预留详情", "alias": "view", "path": "/marketSell/reserve/detail", "sort": 5, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1542349528521404418", "parentId": "1542348566570364930", "code": "reserve_delete", "name": "删除", "alias": "delete", "path": "/marketSell/reserve/delete", "sort": 7, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }] }, { "code": "buyArchives", "buttons": [{ "id": "1542350085738885122", "parentId": "1542349235691876354", "code": "buy_editor", "name": "编辑", "shortName": "编辑买家", "alias": "editor", "path": "/archiveManagement/buyArchives/editor", "sort": 0, "category": 2, "action": 2, "isOpen": 2, "isDeleted": 0, "hasChildren": false }, { "id": "1549271082104434690", "parentId": "1542349235691876354", "code": "buy_details", "name": "买家详情", "shortName": "买家详情", "alias": "details", "path": "/archiveManagement/buyArchives/details", "sort": 1, "category": 2, "action": 2, "isOpen": 2, "isDeleted": 0, "hasChildren": false }, { "id": "1549264400924438530", "parentId": "1542349235691876354", "code": "buy_enable", "name": "启用", "shortName": "启用", "alias": "enable", "path": "/archiveManagement/buyArchives/enable", "sort": 1, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1549264286365413377", "parentId": "1542349235691876354", "code": "buy_disable", "name": "禁用", "shortName": "禁用", "alias": "disable", "path": "/archiveManagement/buyArchives/disable", "sort": 1, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1587314249028497410", "parentId": "1542349235691876354", "code": "buy_remarks", "name": "备注", "alias": "buy_remarks", "path": "/archiveManagement/buyArchives/remarks", "sort": 2, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1549263888292409346", "parentId": "1542349235691876354", "code": "buy_send_account", "name": "发送账号", "shortName": "发送", "alias": "account", "path": "/archiveManagement/buyArchives/sendAcconut", "sort": 2, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1542350349388640258", "parentId": "1542349235691876354", "code": "buy_onesend_addount", "name": "再次发送账号", "shortName": "再次发送", "alias": "onesend_addount", "path": "/archiveManagement/buyArchives/oneSendAcconut", "sort": 3, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }] }, { "code": "purchaseLimitation", "buttons": [{ "id": "1542350007745802241", "parentId": "1542349827529142274", "code": "purchaseLimitation_add", "name": "新增限购", "alias": "add", "path": "/marketSell/purchaseLimitation/add", "sort": 1, "category": 2, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1542350180278497282", "parentId": "1542349827529142274", "code": "purchaseLimitation_edit", "name": "编辑限购", "alias": "edit", "path": "/marketSell/purchaseLimitation/edit", "sort": 2, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1542350410726141954", "parentId": "1542349827529142274", "code": "purchaseLimitation_detail", "name": "限购详情", "alias": "view", "path": "/marketSell/purchaseLimitation/detail", "sort": 3, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1542350568796876801", "parentId": "1542349827529142274", "code": "purchaseLimitation_delete", "name": "删除", "alias": "delete", "path": "/marketSell/purchaseLimitation/delete", "sort": 5, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }] }, { "code": "freeGift", "buttons": [{ "id": "1559729962204950530", "parentId": "1559714619260563458", "code": "freeGift_delete", "name": "删除", "alias": "freeGift_delete", "path": "/marketSell/freeGift/delete", "sort": 1, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1559729682541342722", "parentId": "1559714619260563458", "code": "freeGift_add", "name": "创建", "alias": "add", "path": "/marketSell/freeGift/add", "sort": 1, "category": 2, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }] }, { "code": "advanceOrderManagement", "buttons": [{ "id": "1587354832237391873", "parentId": "1564853296534024194", "code": "advanceOrder_noConsent", "name": "不同意", "alias": "advanceOrder_noConsent", "path": "/orderManagement/advanceOrderManagement/advanceOrder_noConsent", "sort": 0, "category": 2, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1587360159246741505", "parentId": "1564853296534024194", "code": "advanceOrder_consent", "name": "同意", "shortName": "同意", "alias": "advanceOrder_consent", "path": "/orderManagement/advanceOrderManagement/advanceOrder_consent", "sort": 1, "category": 2, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1587355252158525442", "parentId": "1564853296534024194", "code": "advanceOrder_changeSell", "name": "转销售单", "alias": "advanceOrder_changeSell", "path": "/orderManagement/advanceOrderManagement/TransferSalesOrders", "sort": 3, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1587355444173762561", "parentId": "1564853296534024194", "code": "advanceOrder_audit", "name": "审核", "alias": "advanceOrder_audit", "path": "/orderManagement/sellOrderManagement/audit", "sort": 4, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1589789798225309697", "parentId": "1564853296534024194", "code": "advanceOrder_Confirmation", "name": "订单确认", "alias": "advanceOrder_Confirmation", "path": "/orderManagement/advanceOrderManagement/OrderConfirmation", "sort": 5, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }] }, { "code": "sellOrderManagement", "buttons": [{ "id": "1587354153468981250", "parentId": "1587350459440590849", "code": "sellOrder_submit", "name": "提交", "shortName": "提交", "alias": "sellOrder_submit", "path": "/orderManagement/sellOrderManagement/submit", "sort": 1, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1587352413768151041", "parentId": "1587350459440590849", "code": "sellCreate_0rder", "name": "创建销售订单", "alias": "add", "path": "/orderManagement/sellOrderManagement/CreateOrder", "sort": 1, "category": 2, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1587354464862498817", "parentId": "1587350459440590849", "code": "sellOrder_stop", "name": "终止", "alias": "sellOrder_stop", "path": "/orderManagement/sellOrderManagement/stop", "sort": 2, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1587354320498749441", "parentId": "1587350459440590849", "code": "sellOrder_detail", "name": "订单详情", "alias": "detail", "path": "/orderManagement/sellOrderManagement/sellOrderDetail", "sort": 2, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1587354647331500034", "parentId": "1587350459440590849", "code": "sellOrder_editor", "name": "编辑", "shortName": "编辑", "alias": "sellOrder_editor", "path": "/orderManagement/sellOrderManagement/editor", "sort": 3, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1589495429702250498", "parentId": "1587350459440590849", "code": "sellOrder_delete", "name": "删除", "alias": "sellOrder_delete", "path": "/orderManagement/sellOrderManagement/delete", "sort": 4, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1589548520988372993", "parentId": "1587350459440590849", "code": "sellOrder_Confirmation", "name": "订单确认", "alias": "sellOrder_Confirmation", "path": "/orderManagement/sellOrderManagement/OrderConfirmation", "sort": 5, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1622798909225201666", "parentId": "1587350459440590849", "code": "sellOrder_pint", "name": "打印", "alias": "sellOrder_pint", "path": "/orderManagement/sellOrderManagement/pint", "sort": 6, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1631558579960049666", "parentId": "1587350459440590849", "code": "sellOrde_copy", "name": "复制", "alias": "sellOrde_copy", "path": "/orderManagement/sellOrderManagement/copy", "sort": 7, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }] }, { "code": "sellPlanAgent", "buttons": [{ "id": "1588051209175068673", "parentId": "1598563140231131137", "code": "sellPlan_picking", "name": "拣货", "alias": "sellPlan_picking", "path": "/orderManagement/sellPlan/sellPlan_picking", "sort": 0, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1631558393024114690", "parentId": "1598563140231131137", "code": "sellPlan_copy", "name": "复制", "alias": "sellPlan_copy", "path": "/orderManagement/sellPlanAgent/copy", "sort": 1, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }] }, { "code": "printTemplate", "buttons": [{ "id": "1622407037461884929", "parentId": "1620329936634146817", "code": "printTemplate_editor", "name": "编辑", "alias": "printTemplate_editor", "path": "/archiveManagement/printTemplate/editor", "sort": 0, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1622407500726956034", "parentId": "1620329936634146817", "code": "printTemplate_copy", "name": "复制", "alias": "printTemplate_copy", "path": "/archiveManagement/printTemplate/copy", "sort": 1, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1620333713017696257", "parentId": "1620329936634146817", "code": "createTemplate", "name": "创建模板", "alias": "add", "path": "/archiveManagement/printTemplate/createTemplate", "sort": 1, "category": 2, "action": 1, "isOpen": 1, "isDeleted": 0, "hasChildren": false }, { "id": "1622408134515650561", "parentId": "1620329936634146817", "code": "printTemplate_delete", "name": "删除", "alias": "printTemplate_delete", "path": "/archiveManagement/printTemplate/delete", "sort": 2, "category": 2, "action": 2, "isOpen": 1, "isDeleted": 0, "hasChildren": false }] }])
    router.push('/')
  }
}

  // utils.authority.setRoutes([]);
  // utils.authority.setButtons([]);
  // const authMsg: any = await `initialState`?.fetchUserMenuAuth?.();
  // if (authMsg.userMenuAuth && authMsg.userButtonAuth) {
  //   setInitialState({ ...initialState, ...authMsg, currentUser: { ...data, signInType: 0 }, });
  // }
};

// 登录
const handleSubmit = ((e: any) => {
  if (!e.errors) {
    if (e.values.account === 'admin') {
      setAuthMsg({
        "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiJTXzAwMDA4NyIsInRoaXJkX2NvZGUiOiIxMDUiLCJ0ZW5hbnRfbmFtZSI6IuWbm-W3neecgeS6muS4reWGt-mTvuWMu-iNr-eJqea1geaciemZkOi0o-S7u-WFrOWPuCIsInRlbmFudF9wcmltYXJ5X2tleV9pZCI6IjE2MDI4NjYxNTgyNzg0MTQzMzciLCJ1c2VyX25hbWUiOiJ5emxsIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsInBsYXRmb3JtIjoiMiIsInJvbGVfbmFtZSI6IiIsInVzZXJfdHlwZSI6IjIxMzI4NjkxMjEiLCJ1c2VyX2lkIjoiMTYwMjg2NjE1NzM4MTIzODc4NiIsInJvbGVfaWQiOiIxNTQxMjYyOTEwNTIxNjcxNjgxIiwicGhvbmUiOiIxODM4MjAzMzIyMiIsImdyb3VwX2lkIjoiR18wMDAwMDEiLCJhY2NvdW50IjoieXpsbCIsInBhYXNfdGVuYW50X2lkIjoiMDAwMDg3IiwiY2xpZW50X2lkIjoib21zU2VsbGVyIiwiZXhwIjoxNjc5NzM1ODcwfQ.q-l22es6JfUmozzimczbkBP_Vnp26fYeIH-83Sj4vRqrXgSKv4fei69X3gyci_4ZERYi1cA1X_0R-pIC_brqhA",
        "tokenType": "bearer",
        "refreshToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ1c2VyX2lkIjoiMTYwMjg2NjE1NzM4MTIzODc4NiIsInRva2VuX3R5cGUiOiJyZWZyZXNoX3Rva2VuIiwiY2xpZW50X2lkIjoib21zU2VsbGVyIiwiZXhwIjoxNjc5NjM5NDcxfQ.R7KqNJJy1csKZQtjxMB67_VPI-nyA7EtJBmvEVrNAgfy8RUS5P1qk81T4MuQbkX4wRalbJYgnQGen9aE7n5RQQ",
        "userId": "1602866157381238786",
        "tenantId": "S_000087",
        "authority": "",
        "userName": "yzll",
        "account": "yzll",
        "phone": "18382033222",
        "tenantName": "四川省亚中冷链医药物流有限责任公司",
        "groupId": "G_000001",
        "expiresIn": 99999
      })
    } else {
      token(e.values).then((res: any) => {
        setAuthMsg(res)
      })
    }
  }

})

</script>

<template>
  <div class="container">
    <div class="logo">
      <img src="../../assets/logo2.png" alt="logo">
    </div>
    <div class="mainRifht">
      <img class="sell_login" src="../../assets/sell_login.png" alt="sell_login">
      <div class="main">
        <div class="logoStyle">
          <span>oms管理平台卖家端</span>
        </div>
        <div>
          <a-form :model="form" @submit="handleSubmit" auto-label-width>
            <a-form-item hide-asterisk field="account" :rules="[{ required: true, message: '请输入您的账号!' }]"
              :validate-trigger="['change', 'blur']">
              <a-input class="ipt" v-model="form.account" placeholder="请输入账号">
                <template #prefix>
                  <icon-user />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item hide-asterisk field="password" :rules="[{ required: true, message: '请输入您的密码!' }]"
              :validate-trigger="['change', 'blur']">
              <a-input-password class="ipt" v-model="form.password" placeholder="请输入密码">
                <template #prefix>
                  <icon-lock />
                </template>
              </a-input-password>

            </a-form-item>
            <div class="arco-form-item link">
              <a-link href="">忘记密码</a-link>
            </div>
            <a-form-item>
              <a-button :loading="defaultStore.loading" type="primary" html-type="submit" long>登录</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="less" scoped>
.container {
  overflow: auto;
  background-image: url("../assets/sell_login_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;

  .logo {
    img {
      width: 300px;
      height: 45px;
      margin: 20px 200px;
    }

  }

  .mainRifht {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    // justify-content: center;
    .sell_login {
      width: 1112px;
      height: 762px;
    }

    .main {
      width: 480px;
      height: 477px;
      text-align: center;
      background: #fff;
      box-shadow: -2px 8px 20px 1px rgba(7, 7, 7, 0.36);
      padding: 60px 30px 80px;

      .logoStyle {
        width: 100%;
        margin-bottom: 40px;
        text-align: center;

        span {
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: 300;
          color: #333333;
          line-height: 45px;

        }
      }

      .ipt {
        width: 100%;
        height: 50px;
        border: 1px solid #333 !important;
        border-radius: 10px !important;
        background-color: #fff;
      }

      .link {
        display: flex;
        justify-content: end !important;
      }
    }
  }
}
</style>
