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
        const goodInfo = await request("/goods/detail", { goods_id })
        this.GoodInfo = goodInfo
        this.setData({
            goodInfo: {
                goods_name: goodInfo.goods_name,
                goods_price: goodInfo.goods_price,
                goods_introduce: goodInfo.goods_introduce,
                pics: goodInfo.pics
            }
        })

    },
    //添加购物车
    handleCartAdd() {
        let cart = wx.getStorageSync("cart") || [];
        let index = cart.findIndex(v => v.goods_id === this.GoodInfo.goods_id)
        if (index === -1) {
            this.GoodInfo.num = 1
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
        let index = collect.findIndex(v => v.goods_id === this.GoodInfo.goods_id)
        console.log(index);
        if (index === -1) {
            collect.push({
                goods_id: this.GoodInfo.goods_id,
                isCollect: true
            })
        } else {
            collect[index].isCollect = !collect[index].isCollect
            this.setData({
                isCollect: collect[index].isCollect
            })
        }
        wx.setStorageSync("collect", collect)

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getGoodInfo(options.goods_id)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})