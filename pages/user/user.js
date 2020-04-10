// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {}
    },
    onShow: function() {
        const userInfo = wx.getStorageSync('userInfo');
        this.setData({
            userInfo
        })
    }
})