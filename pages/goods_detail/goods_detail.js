import regeneratorRuntime from '../../lib/runtime/runtime';
const { request } = require('../../request/index.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //详情数据
        goodInfo: {},
        //是否被保存
        isCollect: false
    },
    GoodInfo: {},
    //获取详情数据
    async getGoodInfo(goods_id) {
        const goodInfo = await request({ url: "/goods/detail", data: { goods_id } });
        this.GoodInfo = goodInfo
            //获取收藏信息
        let collect = wx.getStorageSync("collect") || [];
        let index = collect.findIndex(v => v.goods_id === this.GoodInfo.goods_id)
        this.setData({
            goodInfo: {
                goods_name: goodInfo.goods_name,
                goods_price: goodInfo.goods_price,
                goods_introduce: goodInfo.goods_introduce,
                pics: goodInfo.pics
            },
            isCollect: index !== -1 ? true : false
        })

    },
    //添加购物车
    handleCartAdd() {
        let cart = wx.getStorageSync("cart") || [];
        let index = cart.findIndex(v => v.goods_id === this.GoodInfo.goods_id)
        if (index === -1) {
            this.GoodInfo.num = 1
            this.GoodInfo.checked = true
            cart.push(this.GoodInfo)
        } else {
            cart[index].num++
        }
        wx.setStorageSync('cart', cart)
        wx.showToast({
            title: '已经加入购物车',
            icon: 'success',
            // true 防止用户 手抖 疯狂点击按钮 
            mask: true
        })
    },
    //点击收藏
    collectHandle() {
        let collect = wx.getStorageSync("collect") || [];
        let isCollect = false
        let index = collect.findIndex(v => v.goods_id === this.GoodInfo.goods_id)
        if (index === -1) {
            collect.push(
                this.GoodInfo
            );
            isCollect = true
        } else {
            collect.splice(index, 1)
            isCollect = false
        }
        wx.setStorageSync("collect", collect)
        this.setData({ isCollect })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function(options) {
        let pages = getCurrentPages();
        let goods_id = pages[pages.length - 1].options.goods_id
        this.getGoodInfo(goods_id)
    }
})