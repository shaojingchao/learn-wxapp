// cnode.js

var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    tab:[
      { id: "all", name: "全部" },
      { id: "good", name: "精华" },
      { id: "share", name: "分享" },
      { id: "ask", name: "问答" },
      { id: "job", name: "招聘" }
    ],
    todetails:"/pages/detail/detail?id=",
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
    this.getListData(this.data.param,function(){
      // this.createAnim();
    });
  },

/**
 * 显示动画
 */ 
  onShow: function () {
    
  },

  /**
   * 标签分类切换事件
   */ 
  onTapTag:function(e){
      var that = this;
      var tab = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      that.setData({
        activeIndex: index,
        "param.tab": tab,
        "param.page": 1
      });

      that.getListData(that.data.param,function(){
        // that.createAnim();
      });
  },

/**
 * 创建动画
 */
  createAnim:function(){
    var _this = this;
    var animation = wx.createAnimation({
      duration: 1200,
      timingFunction: 'ease',
    })
    _this.animation = animation
    animation.opacity(1).translate(0, -50).step()
    _this.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.opacity(1).translate(0, 0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 300)
  },

  /**
   * 监听用户下拉动作--获取最新数据
   */
  onPullDownRefresh: function () {
    // wx.showNavigationBarLoading()
    this.setData({
      "param.page": 1
    });
    this.getListData(this.data.param,function(){
      wx.stopPullDownRefresh({
        complete: function (res) {
          // wx.hideNavigationBarLoading()
        }
      })
    });
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
    this.getListData(this.data.param)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  getListData: function (param,cb) {
    var _this = this;
    wx.showNavigationBarLoading()
    
    /**
     *  page==1 更新列表
     */
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
        wx.hideNavigationBarLoading()
        typeof cb === "function" && cb();
      }
    })
  }
})