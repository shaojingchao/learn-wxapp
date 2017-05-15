// cnode.js

var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:[
      { id: "all", name: "全部" },
      { id: "good", name: "精华" },
      { id: "share", name: "分享" },
      { id: "ask", name: "问答" },
      { id: "job", name: "招聘" }
    ],
    activeIndex:0,
    param:{
      page: 1,
      limit: 20,
      mdrender: true,
      tab:"all"
    },
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListData(this.data.param);
  },



  onTapTag:function(e){
      var that = this;
      var tab = e.currentTarget.dataset.id;
      
      var index = e.currentTarget.dataset.index;
      console.log(tab, index);
      that.setData({
        activeIndex: index,
        "param.tab": tab,
        "param.page": 1
      });

      this.getListData(this.data.param);
      // if (tab !== 'all') {
      //   this.getListData(this.data.param);
      // } else {
      //   that.getListData();
      // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.param.page += 1;
    this.getListData(this.data.param,function(){
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  getListData: function (param,cb) {
    var _this = this;
    wx.showLoading({
      title: '加载中...',
    });

    if (param.page==1){
      _this.setData({
        list:[]
      })
    }
    wx.request({
      url: 'https://cnodejs.org/api/v1/topics',
      data: param,
      method: "GET",
      success: function (res) {
        if (res.statusCode === 200) {
          if (res.data.success === true) {
            var newList = _this.data.list.concat(res.data.data.map(function (item) {
              item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
              return item;
            }));
            _this.setData({
              list: newList
            })
          }
        }
        wx.hideLoading();
        typeof cb === "function" && cb();
      }
    })
  
  }
})