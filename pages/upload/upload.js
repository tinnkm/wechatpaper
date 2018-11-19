// pages/upload/upload.js
var util = require('../../utils/md5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: {},
    templateId: 'wx-test',
    template: {},
    questions: [],
    header: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'authorization': 'Bearer;' + wx.getStorageSync('token')
    }
  },
  chooseImage: function(e) {
    var questionId = e.currentTarget.dataset.questionid;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // 上传到服务器
        wx.uploadFile({
          url: 'http://rtxizu.natappfree.cc/api/file/upload/'+util.hexMD5(wx.getStorageSync('userId')+'_'+questionId),
          filePath: res.tempFilePaths[0],
          name: 'file',
          header:this.data.header,
          formData:{
            'path': res.tempFilePaths[0]
          },
          success: (data) => {
            let _temp = this.data.files;
            if (!_temp[questionId]) {
              _temp[questionId] = [];
            }
            _temp[questionId] = _temp[questionId].concat(res.tempFilePaths)
            this.setData({
              files: _temp
            });
          }
        })
      }
    })
  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files[e.currentTarget.dataset.questionid] // 需要预览的图片http链接列表
    })
  },
  sumbit (e) {
    wx.request({
      url: '/api/answerDetail',
      method:'POST',
      header:this.data.header,
      data:{
        'userId':wx.getStorageSync('userId'),
        'templateId':this.data.templateId
      },
      success:(res)=>{
        if(res.data.code === 200){
          console.log('提交成功!')
        }
      }
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
      url: 'http://rtxizu.natappfree.cc/api/template/' + this.data.templateId,
      method: 'GET',
      header: this.data.header,
      success: (res => {
        this.setData({
          template: res.data.data.template,
          questions: res.data.data.questions
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