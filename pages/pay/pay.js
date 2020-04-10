import { requestPayment, showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
const { request } = require('../../request/index.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //收货地址
        address: {},
        //购物车
        cart: [],
        //总价
        totalPrice: 0,
        //总数量
        totalNum: 0
    },
    onShow() {
        //收货地址接收
        const address = wx.getStorageSync('address');
        //购物车接收
        let cart = wx.getStorageSync('cart') || [];
        cart = cart.filter(v => v.checked);
        let totalPrice = 0;
        let totalNum = 0;
        cart.forEach(v => {
            totalPrice += v.num * v.goods_price;
            totalNum += v.num
        });
        this.setData({
            cart,
            totalPrice,
            totalNum,
            address
        })
    },
    //支付
    async play() {
        try {
            const token = wx.getStorageSync('token');
            if (!token) {
                wx.navigateTo({
                    url: '/pages/auth/auth',
                })
            } else {
                //订单参数
                const order_price = this.data.totalPrice;
                const consignee_add = this.data.address.all;
                const cart = this.data.cart
                let goods = [];
                cart.forEach(v => goods.push({
                    goods_id: v.goods_id,
                    goods_number: v.num,
                    goods_price: v.price
                }))
                const oderParams = { order_price, consignee_add, goods };
                //发送请求获取订单号参数
                const { order_number } = await request({ url: "/my/orders/create", method: "POST", data: oderParams });
                //发支付接口
                const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "POST", data: { order_number } });
                //发起微信支付
                await requestPayment(pay)
                    //查看后台订单状态
                const res = await request({ url: "/my/orders/chkOrder", method: "POST", data: { order_number } });
                await showToast({ title: "支付成功" });
                //删除支付后对商品
                let newCart = wx.getStorageSync("cart");
                newCart = newCart.filter(v => !v.checked);
                wx.setStorageSync("cart", newCart);
                // 支付成功了 跳转到订单页面
                wx.navigateTo({
                    url: '/pages/order/index'
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
})