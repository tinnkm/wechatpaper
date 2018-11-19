// pages/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: {},
    questions: [{
        questionId: '1',
        questionTitle: '题目1'
      },
      {
        questionId: '2',
        questionTitle: '题目2'
      }
    ]
  },
  chooseImage: function(e) {
    var questionId = e.currentTarget.dataset.questionid;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // 上传到服务器
        let _temp = this.data.files; 
        if (!_temp[questionId]){
          _temp[questionId] = []; 
        }
        _temp[questionId] = _temp[questionId].concat(res.tempFilePaths)
        this.setData({
          files: _temp
        });
      }
    })
  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files[e.currentTarget.dataset.questionid] // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 获取页面加载
    wx.request({
      url: '',
      method:'e',
      data:'',
      success:(res => {
        this.setData({
          questions:res.data
        })
      })
    })
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