function Animate(userConfig){
  var defaultConfig = {
    stepTime: 16,//单步时间
    totalTime: 1600,//总时间
    origin:{},//开始量
    target:{}//目标量
  }
  // this.config = myFunctions.mixin(defaultConfig, userConfig);//配置
  this.config = Object.assign({},defaultConfig, userConfig);//配置
  this.stepNum = Math.ceil(this.config.totalTime/this.config.stepTime);//步数
  this.stepChange = {};//变化量
  this.current = {};//当前量
  this.currentNum = 0;//当前次数
  for(var prop in this.config.origin){
    this.stepChange[prop] = (this.config.target[prop] - this.config.origin[prop])/this.stepNum;
    this.current[prop] = this.config.origin[prop];//初始值
  }
  this.timer = null;//计时器
}

//开始运动
Animate.prototype.start = function () {
  var that = this;
  //开始
  if(this.config.onstart){
    this.config.onstart.call(that);
  }
  if(this.timer || this.currentNum === this.stepNum){
    return;
  }
  this.timer = setInterval(function () {
    that.currentNum++;
    for(var prop in that.current){
      if(that.currentNum === that.stepNum){
        that.current[prop] = that.config.target[prop];
      }else{
        that.current[prop] += that.stepChange[prop];
      } 
    }
    //变化
    if(that.config.onchange){
      that.config.onchange.call(that);
    }
    //结束
    if(that.currentNum === that.stepNum){
      that.stop();
      if(that.config.onstop){
        that.config.onstop.call(that);
      }
    }
  },this.config.stepTime);
}

//结束运动
Animate.prototype.stop = function () {
  clearInterval(this.timer);
  this.timer = null;
}