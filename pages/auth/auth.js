import { login } from "../../utils/asyncWx.js";
const { request } = require('../../request/index.js')
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    async handleGetUserInfo(e) {
        try {
            const { encryptedData, rawData, iv, signature } = e.detail
            const code = await login()
                //发送获取token请求
            const params = { encryptedData, rawData, iv, signature, code }
            const { token } = await request({ url: "/users/wxlogin", data: loginParams, method: "post" });
            wx.setStorageSync('token', 123456)
                //wx.setStorageSync('token', token)
            wx.navigateBack({
                delta: 1
            });
        } catch (err) {
            console.log(err);
        }
    }
})