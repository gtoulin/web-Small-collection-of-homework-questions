function house(){
    this.num = 0; //贷款金额
    this.year = 0; //贷款年限
    this.yearRate = 0; //年利率
    this.status = 0; //贷款方式:0表示等额本息、1表示等额本金
    this.outputinfo = {
        hkAmount:0,   //月供
        totalRate:0,  //总利息
        totalPrice:0  //还款金额
    }
    //等额本息计算房贷方式
    this.computeMethod1= function() {
        //还款月数
        var month= parseInt(this.year)*12;
        //月利率
        var monthRate = parseFloat(this.yearRate) / 12;
        //贷款金额
        var loansNum = parseFloat(this.num) * 10000;
        //月供
        var hkAmount = (loansNum * monthRate * Math.pow((1 + monthRate),month))/(Math.pow((1+monthRate),month)-1);
        //总利息＝还款月数x每月月供额度－贷款金额
        var totalRate = month * hkAmount - loansNum;
        //还款总额＝总利息＋贷款金额
        var totalPrice = totalRate + loansNum;
        //将结果赋值给outputinfo
        this.outputinfo.hkAmount = hkAmount.toFixed(2);
        this.outputinfo.totalRate = totalRate.toFixed(2);
        this.outputinfo.totalPrice = totalPrice.toFixed(2); 
    }
    //等额本金计算房贷方式
    this.computeMethod2 = function() {
        //还款月数
        var month= parseInt(this.year)*12;
        //月利率
        var monthRate = parseFloat(this.yearRate) / 12;
        //贷款金额
        var loansNum = parseFloat(this.num) * 10000;
        //每月应还本金=贷款金额/还款月数
        var everymonthyh = loansNum / month;
        //月供额度＝（贷款金额／还款月数）＋（贷款金额－累计已还本金） x月利率
        var hkAmount = loansNum / month + loansNum * monthRate;
        //总利息＝{(贷款金额/还款月数+贷款金额*月利率)+贷款金额/还款金额=(1+月利率;)/2*还款月数-贷款金额}
        var totalRate = ((everymonthyh+loansNum*monthRate)+loansNum/month*(1+monthRate))/2*month-loansNum;
        //还款总额＝总利息＋贷款金额
        var totalPrice = totalRate + loansNum;
        //将结果赋值给outputinfo
        this.outputinfo.hkAmount = hkAmount.toFixed(2);
        this.outputinfo.totalRate = totalRate.toFixed(2);
        this.outputinfo.totalPrice = totalPrice.toFixed(2); 
    }
}
var house = new house();
function getInputDate(){
    //获取贷款金额
    var loansNum = document.getElementById('loansAmount').value;
    //获取贷款年限
    var yearLimit = document.getElementById('loansYear').value;
    //获取贷款年利率
    var loansSelect = document.getElementById('loansRate').value;
    //监听select选择的是等额本金还是等额本息
    var selectObj = document.getElementById('selectedBox').value;
    //设置贷款金额为1万~一千万元
    var numReg = new RegExp("^([0-9]{1,3}|1000)$");
    //设置贷款年限为5~30年
    var yearReg = new RegExp("^([5-9]|[12][0-9]|30)$");
    if(numReg.test(loansNum) && yearReg.test(yearLimit)){
        //给house对象中的输入框属性赋值
        house.num = loansNum;
        house.year = yearLimit;
        house.yearRate = loansSelect;
        house.status = selectObj;
        return true
    }else{
        //验证不通过
        return false;
    }
}
//显示计算结果函数
function showResult(){
    //把计算结果保存到一个数组中
    var result= [house.outputinfo.hkAmount, house.outputinfo.totalPrice,house.outputinfo.totalRate];
    //定义一个显示文本的数组
    var text = ['月供','还款总额','总利息'];
    //显示计算结果
    var html = '<tr><th>项目</th><th>金额</th></tr>';
    for(var i=0;i<text.length;i++){
        var tableObj = document.getElementById('calResult');
        html +='<tr class="cal-hkResult"><td class="cal-title">'+text[i]+'</td><td class="cal-price">'+result[i]+'</td></tr>';
        tableObj.innerHTML = html;
    }
}
//定义点击事件处理函数
function calResult(){
    //获取用户输入的值
    if(getInputDate()){
        //判断等额本金还是等额本息，分别调用不同的方法
        if(house.status == 0){
            house.computeMethod1();
        }else if(house.status == 1){
            house.computeMethod2();
        }
        //显示计算结果
        showResult();
    }else{
        //验证不通过，清空显示结果
        document.getElementById('calResult').innerHTML = '贷款金额范围在1万～1000万元，贷款年限范围在5～30年';
    }
}
