// pages/category/category.js
import regeneratorRuntime from '../../lib/runtime/runtime';
const { request } = require('../../request/index.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //右侧栏数据
        rightList: [],
        //左侧栏数据
        leftList: [],
        //选中序号
        tapIndex: 0,
        //初始化滑动条高度
        scrollTop: 0
    },
    //总数据
    Cate: [],
    //获取分类信息
    async getCateList() {
        this.Cate = await request('/categories')
        wx.setStorageSync('cates', { time: Date.now(), data: this.Cate })
        let leftList = this.Cate.map(v => v.cat_name)
        let rightList = this.Cate[0].children;
        this.setData({
            leftList,
            rightList
        })
    },
    //点击事件
    handelTap(e) {
        const tapIndex = e.currentTarget.dataset.index;
        let rightList = this.Cate[tapIndex].children;
        this.setData({
            tapIndex,
            rightList,
            scrollTop: 0
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const Cates = wx.getStorageSync('cates')
        if (!Cates) {
            this.getCateList()
        } else {
            if (Date.now() - Cates.time > 1000 * 10) {
                this.getCateList()
            } else {
                this.Cate = Cates.data;
                let leftList = this.Cate.map(v => v.cat_name)
                let rightList = this.Cate[0].children;
                this.setData({
                    leftList,
                    rightList
                })
            }
        }
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