export const request = (url, data) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `https://api-hmugo-web.itheima.net/api/public/v1${url}`,
            success: res => {
                resolve(res.data.message)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}