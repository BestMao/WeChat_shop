import regeneratorRuntime from '../../lib/runtime/runtime';
const { request } = require('../../request/index.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //商品列表
        goods: [],
        //按钮的显示
        btnShow: false,
        //输入值
        inputValue: ''
    },
    timeId: -1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    //输入框变化
    inputChange(e) {
        const { value } = e.detail;
        if (!value.trim()) {
            this.setData({
                btnShow: false,
                goods: [],
                inputValue: value
            })
            return
        };
        clearInterval(this.timeId);
        this.timeId = setTimeout(() => {
            this.getGoods(value);
        }, 1000);
        this.setData({
            btnShow: true
        })
    },
    //发送查询商品请求
    async getGoods(query) {
        const goods = await request({ url: "/goods/qsearch", data: { query } });
        if (this.data.btnShow === false) return
        this.setData({
            goods
        })
    },
    //点击取消按钮
    handleCancel() {
        this.setData({
            inputValue: '',
            btnShow: false,
            goods: []
        })
    }
})