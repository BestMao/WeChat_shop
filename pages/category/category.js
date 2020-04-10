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
        this.Cate = await request({ url: "/categories" });
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
    }
})