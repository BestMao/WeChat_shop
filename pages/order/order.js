import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orders: [{
            "order_number": "HMDD20190802000000000428",
            "order_price": 13999,
            "create_time": 1564731518
        }, {
            "order_number": "HMDD20190802000000000428",
            "order_price": 13999,
            "create_time": 1564731518
        }, {
            "order_number": "HMDD20190802000000000428",
            "order_price": 13999,
            "create_time": 1564731518
        }, {
            "order_number": "HMDD20190802000000000428",
            "order_price": 13999,
            "create_time": 1564731518
        }],
        //Tabs数据
        Tabs: [{
            id: 0,
            name: '全部',
            isActive: true
        }, {
            id: 1,
            name: '待付款',
            isActive: false
        }, {
            id: 2,
            name: '待发货',
            isActive: false
        }, {
            id: 3,
            name: '退款/退货',
            isActive: false
        }]
    },
    onShow(options) {
        //判断是否登陆
        const token = wx.getStorageSync('token')
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/auth',
            });
            return;
        }

        let pages = getCurrentPages();
        let { type } = pages[pages.length - 1].options;
        this.getOrderList(type)
    },
    //获取订单方法
    async getOrderList(type) {
        // const res = await request({ url: '/my/orders/all' }, { data: type })
        // this.setData({
        //     orders: res.orders.map(v => ({...v, create_time_cn: (new Date(v.create_time * 1000).toLocaleString()) }))
        // })
        //const res = await request({ url: '/my/orders/all' }, { data: type })
        let orders = this.data.orders;
        let newOrders = orders.map(v => ({...v, create_time_cn: (new Date(v.create_time * 1000).toLocaleString()) }))
        this.setData({
            orders: newOrders
        })
    },
    //切换Tab栏
    tabsItemChange(e) {
        const id = e.detail.id;
        const Tabs = this.data.Tabs;
        Tabs.forEach((v, i) => i === id ? v.isActive = true : v.isActive = false)
        this.setData({
            Tabs
        })
    }
})