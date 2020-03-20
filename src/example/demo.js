
//获取元素
const arr=Array.from(document.querySelectorAll('.ele'));


//生成随机新元素
function newRndEle() {
    const rndarr = [2, 4]
    return rndarr[randomEle(0,2)]
}
//随机函数
function randomEle(min,max){
    return Math.floor(Math.random() * (max-min) + min)
}

//在空格子中添加随机元素
function newEle(time){
    let ele=randomEle(0,16)
    let count=0
    while(count<time){
        if(arr[ele].classList[1]=='notEmpty'){
            ele=randomEle(0,16)
        }else{
            arr[ele].innerHTML=newRndEle();
            arr[ele].classList.add('notEmpty')
            ele=randomEle(0,16);            
            count++
        }
    }
}


//初始化
(function init(){
    newEle(2)
})()

//移动元素
function moveEle(arr){
    arr.forEach((rowarr,index)=>{
        rowarr.forEach((ele,index)=>{
            if(ele==rowarr[index+1]){
                rowarr[index]=ele*2
                this.score = ele*2
                rowarr.splice(index+1,1)
                this.moved = true 
            }
        })
    })
    return arr
}
//赋值
function assign(sortedArr,innerArr){
    const sortedInner=moveEle.call(this,innerArr)
    for(let i=0;i<4;i++){


        for(let j=0;j<4;j++){
            if(sortedInner[i][j]){
                sortedArr[i][j].innerHTML=sortedInner[i][j]
                sortedArr[i][j].classList.add('notEmpty')
            }else{
                sortedArr[i][j].innerHTML=''
                sortedArr[i][j].classList.remove('notEmpty')
            }
        }
    }
}

//监听键盘事件
document.body.onkeydown = function (event) {
    this.moved = false
    this.over = false
    this.score = 0
    this.reverse = false
    this.sortedArr = []
    this.innerArr= []
    let length=Math.sqrt(arr.length)
    const key = event.keyCode
    this.reverse = ((key)=>{
        if(key == 37 || key == 38){
            return false
        }else if(key == 39 || key == 40){
            return true
        }
    })(key)
    this.direction=((key)=>{
        if(key == 37 || key == 39){
            return true
        }else if(key == 38 || key == 40){
            return false
        }
    })(key)

    sort.call(this)
    
    assign(this.sortedArr,this.innerArr,this.direction)
    //排序
    function sort(){
        const innerArr = []
        const sortedArr = []
        if(this.direction){
            for(let i=0; i < length; i++){
                sortedArr[i] = arr.slice(i*length,i*length+length)
            }
        }else{
            for(let i=0; i < length; i++){

                sortedArr[i] = new Array()
                for(let j = 0; j < length; j++){
                    sortedArr[i].push(arr[length*j+i])
                }
            }
        }
        for(let i=0; i < length; i++){
            if(this.reverse){
                // console.log('reverse')
                sortedArr[i].reverse()
            }
            innerArr[i]=new Array()
            sortedArr[i].forEach((ele,index)=>{
                if(ele.innerHTML != '' && index>=1 && sortedArr[i][index-1].innerHTML == ''){
                    this.moved = true              
                }
                console.log()
                if(ele.innerHTML != ''){
                    innerArr[i].push(ele.innerHTML) 
                }
            })
        }
        this.sortedArr = sortedArr
        this.innerArr = innerArr
    }


    //是否产生新元素
    if(this.moved){
        newEle(1)
    }
    
    //判断是否结束
    if(document.querySelectorAll('.notEmpty').length == length*length){
        this.over = true
    }
    if(this.over){
        alert('结束')
    }

    console.log(this.score)

}