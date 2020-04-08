let ajaxTimes = 0;
export const request = (url, data) => {
    ajaxTimes++;
    // 显示加载中 效果
    wx.showLoading({
        title: "加载中",
        mask: true
    });

    return new Promise((resolve, reject) => {
        wx.request({
            data: data,
            url: `https://api-hmugo-web.itheima.net/api/public/v1${url}`,
            success: res => {
                resolve(res.data.message)
            },
            fail: err => {
                reject(err)
            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    //  关闭正在等待的图标
                    wx.hideLoading();
                }
            }
        })
    })
}