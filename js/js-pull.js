
function $(id) {
    return typeof id === 'string' ? document.getElementById(id): id
}


/*当网页加载完成的时候*/

window.onload = function () {
    waterfall('main', 'box');

    /*监听网页滚动时间*/

    window.onscroll = function () {

       

    };


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




