// pages/feedback/feedback.js
Page({
    data: {
        Tabs: [{
            id: 0,
            name: '体验问题',
            isActive: true
        }, {
            id: 1,
            name: '商品、商家投诉',
            isActive: false
        }],
        //图片数组
        imageList: [],
        //文本输入内容
        inputText: ''
    },
    // 被选中的图片路径 数组
    UpLoadImgs: [],
    //Tabs切换
    tabsItemChange(e) {
        const id = e.detail.id;
        const Tabs = this.data.Tabs;
        Tabs.forEach((v, i) => i === id ? v.isActive = true : v.isActive = false)
        this.setData({
            Tabs
        })
    },
    //添加图片
    addImgs() {
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: res => {
                this.setData({
                    imageList: [...res.tempFilePaths, ...this.data.imageList]
                })
            }
        })
    },
    //删除图片
    removeImgs(e) {
        const { index } = e.currentTarget.dataset;
        const imageList = this.data.imageList;
        imageList.splice(index, 1);
        this.setData({ imageList });
    },
    //输入栏同步数据
    handleInputText(e) {
        this.setData({
            inputText: e.detail.value
        })
    },
    //提交表单
    handleFormSubmit() {
        const { imageList, inputText } = this.data;
        if (!inputText.trim()) {
            wx.showToast({
                title: '输入不合法',
                icon: 'none',
                mask: true
            })
        };
        // 显示正在等待的图片
        wx.showLoading({
            title: "正在上传中",
            mask: true
        });
        //判断是否存在图片
        if (imageList.length != 0) {
            //循化上次图片
            imageList.forEach((v, i) => {
                    wx.uploadFile({
                        filePath: v,
                        name: 'file',
                        url: 'https://imgchr.com/i/MjaXxU',
                        success: (res) => {
                            console.log(res);
                            let url = res.cookies[0];
                            console.log(url);
                            //将成功上传到服务器到地址返回存储
                            this.UpLoadImgs.push(url);
                            //判断是否为最后一张图片
                            if (i === imageList.length - 1) {
                                wx.hideLoading();
                                console.log("把文本的内容和外网的图片数组 提交到后台中");
                                this.setData({
                                    inputText: "",
                                    imageList: []
                                });
                                // 返回上一个页面
                                wx.navigateBack({
                                    delta: 1
                                });
                            }
                        },
                        fail: (err) => {}
                    })
                })
                // wx.hideLoading();
                // console.log("只是提交了文本");
                // wx.navigateBack({
                //     delta: 1
                // });
        } else {
            wx.hideLoading();
            console.log("只是提交了文本");
            wx.navigateBack({
                delta: 1
            });
        }
    }
})