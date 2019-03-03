// miniprogram/pages/inputRecord/inputRecord.js
Page({

  /**
   * Page initial data
   */
  data: {
   
  },

  formSubmit:function(e) {
    const { highPressure, lowPressure, pulse } = e.detail.value;
    const currentDate = new Date();

    const db = wx.cloud.database();

    db.collection('bloodPressure').add({
      data: {
        highPressure,
        lowPressure,
        pulse,
        currentDate
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '保存成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '保存失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

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