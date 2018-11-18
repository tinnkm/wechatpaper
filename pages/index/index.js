//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //提交表单
  submit: function(e) {
    if(e.detail.value.name.length === 0 || e.detail.value.telphone.length === 0
      || e.detail.value.idCard.length === 0){
        wx.showToast({
          title: '姓名/手机号/身份证不得为空!',
          icon: 'none',
          duration: 1500

        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
    }else{
      //发生请求到到后台，并获得token
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: '',
        method: 'POST', //仅为示例，并非真实的接口地址
        data: {
          name: e.detail.value.name,
          telphone: e.detail.value.telphone,
          idCard: e.detail.value.idCard
        },
        success(res) {
          console.log(res.data)
          wx.setStorage({
            key: "token",
            data: data.data
          })
          wx.navigateTo({
            url: '../upload/upload'
          })
        },
        fail(res) {
          wx.showToast({
            title: '啊哦，服务器开小差了！',
            icon: 'none',
            duration: 2000
          })
        },
        complete() {
          wx.hideLoading()
        }
      })

    }
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})