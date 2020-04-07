//index.js
//获取应用实例
const { request } = require('../../request/index.js')
const app = getApp()

//Page Object
Page({
    data: {
        //轮播图数据
        swiperList: [],
        //分类数据
        cateList: [],
        //楼层数据
        floorList: []
    },
    //获取轮播题数据
    getSwiperList() {
        request('/home/swiperdata').then(res => {
            this.setData({
                swiperList: res
            })
        })
    },
    //获取分类数据
    getCateList() {
        request('/home/catitems').then(res => {
            this.setData({
                cateList: res
            })
        })
    },
    //获取楼层信息
    getFoolrList() {
        request('/home/floordata').then(res => {
            this.setData({
                floorList: res
            })
        })
    },
    //options(Object)
    onLoad: function(options) {
        this.getSwiperList();
        this.getCateList();
        this.getFoolrList()
    },
    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap: function(item) {

    }
});