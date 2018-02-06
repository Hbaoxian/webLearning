
function $(id) {
    return typeof id === 'string' ? document.getElementById(id): id
}


/*当网页加载完成的时候*/

window.onload = function () {
    waterfall('main', 'box');

    /*监听网页滚动时间*/

    window.onscroll = function () {
        /*判断是否符合加载新图的条件*/
        if (checkWillLoad()) {

            var data = {'dataiamge':[
                    {'img':'1'},
                    {'img':'1'},
                    {'img':'2'},
                    {'img':'3'},
                    {'img':'4'},
                    {'img':'1'},
                    {'img':'2'},
                    {'img':'3'},
                    {'img':'4'},
                    {'img':'1'},
                    {'img':'2'},
                    {'img':'3'},
                    {'img':'4'},
                ]}

                for (var  i = 0 ; i < data.dataiamge.length ; i++) {
                    var box = document.createElement('div');
                    box.className = 'box';
                    $('main').appendChild(box);

                    /*创建pic*/

                    var newPic = document.createElement('div');
                    newPic.className='pic';
                    box.appendChild(newPic);


                    var newImg = document.createElement('img');
                    newImg.src = '/img/pic' + data.dataiamge[i].img +'.png';
                    newPic.appendChild(newImg);

                }
                waterfall('main', 'box');

        }
    };


}

/*判断是否加载新的元素*/
function checkWillLoad() {
    /*取出所有的盒子*/
    var allBox = $('main').getElementsByClassName('box');

    /*、拿到最后一个盒子*/
    var lastBox = allBox[allBox.length - 1];
    /*求出最后一个盒子的头部偏移量*/
    var lastBoxOffsetTop = lastBox.offsetTop;
    /*求出浏览器的高度 有的浏览器拿不到  通过标准模式和混杂模式  所有浏览器能拿到的高度遍历 */
    var screenHeight = document.body.offsetHeight || document.documentElement.clientHeight;
    //求出页面的偏移量
    // alert(screenHeight);

    /*顶部的偏移量*/
    var scrollTopHeight = document.body.scrollTop;

    // alert(scrollTopHeight);
    // alert('lastBoxOffsetTop:' + lastBoxOffsetTop + ' scrollTopHeight :' + scrollTopHeight + ' screenHeight' + screenHeight)

    return lastBoxOffsetTop  >   screenHeight ;
}


function waterfall(parent, box) {

    //让父盒子居中


    /*1 拿到父盒子里面的所有子盒子*/

    var allBox = $(parent).getElementsByClassName(box);

    /*、取出盒子宽度*/

    var boxwith = allBox[0].offsetWidth;

    /*、求出浏览器宽度*/
    var  screenWith = document.body.offsetWidth;

    /*求出真实的列数*/
    var cols = Math.floor(screenWith/ boxwith);

    /*需要让main居中显示*/


    // alert(boxwith * cols);
    $(parent).style.width = boxwith * cols + 'px';
    $(parent).style.margin= '0 auto';
    //alert(cols);

    /*、子盒子定位*/
    /*1.1 数组保存所有高度*/

    var heightArr = [];

    /*js 瀑布流实现逻辑*/



    for (var  i =0 ;i < allBox.length ; i++) {
        /*求单个盒子高度*/

        var boxheight = allBox[i].offsetHeight;
        /*第一行的数据*/
        if (i < cols) {
            heightArr.push(boxheight);
        }else {
            /*第二行盒子的布局*/
            var minBoxheight = Math.min.apply(this,heightArr);

            /*请求出盒子最矮的索引*/
            var minBoxIndex = getMinBoxIndex(minBoxheight, heightArr);
            /*其余几个布局*/
            allBox[i].style.position = 'absolute';
            allBox[i].style.top = minBoxheight + 'px';
            allBox[i].style.left = minBoxIndex * boxwith + 'px';
            heightArr[minBoxIndex] += boxheight;
        }

    }
}

function getMinBoxIndex(minHeigt, boxArray) {

    for (var i = 0 ;i < boxArray.length; i++) {
        if (minHeigt == boxArray[i]){
            return i;
        }
    }



}




