var ul = document.querySelector(".content");
var currentTop = 0;
var height = ul.clientHeight;
cloneFirstLi();

//克隆第一个滚动项
function cloneFirstLi() {
  ul.appendChild(ul.children[0].cloneNode(true));
}

//滚动
function scroll() {
  var animate = new Animate({
    totalTime: 1000,
    origin: {
      top: currentTop
    },
    target: {
      top: currentTop + height
    },
    onchange() {
      currentTop = this.current.top;
      ul.scrollTop = currentTop;
    },
    onstop(){
      if(currentTop === ul.scrollHeight - height){
        currentTop = 0;
        ul.scrollTop = currentTop;
      }
    }
  })
  animate.start();
  
}

setInterval(scroll, 2000);