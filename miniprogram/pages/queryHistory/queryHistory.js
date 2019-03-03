// miniprogram/pages/queryHistory/queryHistory.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    openid: '',
    historyData: []
  },

  formatDate: function(date){
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('/');
  },

  mapData: function(data) {
    return data.map(item => {
      return {...item, date: this.formatDate(item.currentDate)}
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({openid: app.globalData.openid});
    }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 blood pressure

    db.collection('bloodPressure').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          historyData: this.mapData(res.data)
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      },
      complete: () => {
        console.log('finish')
      }
    })
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {    
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})