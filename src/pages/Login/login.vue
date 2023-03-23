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
    let routes = await dynamicRoutes()
    let buttons = await dynamicButtons()
    useLocalStorage('routes', routes)
    useLocalStorage('buttons', buttons)
    defaultStore.getRoutes(routes)
    defaultStore.getButtons(buttons)
    router.push('/')
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
    token(e.values).then((res: any) => {
      setAuthMsg(res)
    })
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
