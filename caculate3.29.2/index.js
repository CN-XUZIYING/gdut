window.sign=0;


function start() {
	quesitonsHtmlArr = new Array();//所有题目字段，可用于下载
    answerHtmlArr = new Array();//字符串，页面备用
    answerSign=0;


    subject = document.getElementById("subject").value;     //题目数
    range = document.getElementById("range").value;     //数字范围
    
    if(subject == 0 || subject < 0 || subject >10000 ) {alert("请输入正确题目数量，不大于10000道");return; }
    if(range == 0 || range < 0) {alert("请输入正确题目范围");return; }
    sign=1;

    s = new Array();   //存数字
        for (s_i = 0; s_i <= subject; s_i++) {
            s [s_i] = new Array();
            for (s_j = 0; s_j <= 4; s_j++) {  //s_j==1-4时，存运算数
                s[s_i][s_j] = 1;

            }
        }
    arr = new Array();  //存字符串
        for (arr_i = 0; arr_i <= subject; arr_i++) {
            arr [arr_i] = new Array();
            for (arr_j = 0; arr_j <= 4; arr_j++) { //arr_j==0时存运算符个数，arr_j==1-3时存入运算符，arr_j==4时存入结果
                arr[arr_i][arr_j] = '';
            }
        }
    problem = new Array();    //存储整道题目，用于打印和计算结果

    i = 1;  //第几号题目
    while(i <= subject){
        pro();
        if (conform()){
            console.log('第'+i+'题: ');
            console.log(problem[i]+" = " + arr[i][4].toString());
            quesitonsHtmlArr += ('<li>' + '第' + i + '题： ' + problem[i].toString() + ' = ' + "<input class='userA' type='text'/>"  + '</li>' );
            i++;
        }
    }
    document.getElementById("question-text").innerHTML = quesitonsHtmlArr;
}


function conform() {
    var ci = 1;
    Queue = polish();   //Queue是一个全局队列，将会用于计算后缀表达式
    sum = workPolish();    //sum此时暂存未化简的结果
    sum = huajian(sum);    //sum此时是化简后的分数
    if (sum == "#") {
        return 0;
    }
    if (sum != "#" ){
        arr[i][4] = sum;
        for(ci = 1; ci < i; ci++){
            if (arr[ci][4].toString()==arr[i][4].toString()) {     //与ci题结果相同
                if (arr[ci][0]==arr[i][0]) {      //运算符个数也相同
                    var str_a = "";     //存入ci题所有运算符
                    var str_b = "";     //存入ci题所有运算数
                    switch (arr[i][0]) {
                        case 1:   //一个运算符
                            str_b = s[ci][1].toString() + s[ci][2].toString();
                            if( arr[ci][1]==arr[i][1] && str_b.indexOf(s[i][1].toString())!=-1 )   //运算符和运算数也相同
                                return 0;
                            break;
                        case 2:
                            str_a = arr[ci][1] + arr[ci][2];
                            str_b = s[ci][1].toString() + s[ci][2].toString() + s[ci][3].toString();
                            if( str_a.indexOf(arr[i][1])!=-1 && str_a.indexOf(arr[i][2])!=-1
                                && str_b.indexOf(s[i][1].toString())!=-1 && str_b.indexOf(s[i][2].toString())!=-1 && str_b.indexOf(s[i][3].toString())!=-1 )
                                return 0;
                            break;
                        case 3:
                            str_a = arr[ci][1] + arr[ci][2] + arr[ci][3];
                            str_b = s[ci][1].toString() + s[ci][2].toString() + s[ci][3].toString() + s[ci][4].toString();
                            if( str_a.indexOf(arr[i][1])!=-1 && str_a.indexOf(arr[i][2])!=-1 && str_a.indexOf(arr[i][3])!=-1
                                && str_b.indexOf(s[i][1].toString())!=-1 && str_b.indexOf(s[i][2].toString())!=-1 && str_b.indexOf(s[i][3].toString())!=-1 && str_b.indexOf(s[i][4].toString())!=-1 )
                                return 0;
                            break;
                    }//end switch
                }
            }
        }
        return 1;
    }//end if
}



function polish() {      //中缀转后缀
    var str_p = problem[i].toString(); //中缀表达式转字符串
    var middleArr = str_p.split('');   //中缀表达式转数组
    var opStack = [];   //运算符栈
    var outputQueue = [];   //输出队列，后缀表达式
    var pi = 0;
    while (pi < middleArr.length) {
        var ch = middleArr[pi].toString();
        var out;
        switch (ch) {
            case "+":
            case "-":
                if (opStack.length > 0) {   //栈不空
                    out = opStack.pop();    //取出栈顶元素
                    if (out != "(") {    //栈顶不是左括号
                        outputQueue.push(out);  //栈顶元素添加到后缀表达式
                    }
                    else {    //栈顶元素是左括号
                        opStack.push(out);   //把刚刚的栈顶元素放回去
                    }
                }
                opStack.push(ch);     //当前运算符进栈
                pi++;
                break;

            case "*":
            case "/":
                if (opStack.length > 0) {   //栈不空
                    out = opStack.pop();    //取出栈顶元素
                    if (out == "*" || out == "/") {    //栈顶是乘号或除号
                        outputQueue.push(out);  //栈顶元素添加到后缀表达式
                    }
                    else {    //栈顶不是乘号也不是除号
                        opStack.push(out);   //把刚刚的栈顶元素放回去
                    }
                }
                opStack.push(ch);     //当前运算符进栈
                pi++;
                break;

            case "(":
                opStack.push(ch);
                pi++;
                break;
            case ")":
                out = opStack.pop();    //取出栈顶元素
                while (out != null && out != "(") {    //直到遇到左括号
                    outputQueue.push(out);  //栈顶元素添加到后缀表达式
                    out = opStack.pop();
                }
                pi++;
                break;

            default:    //遇到数字
                while ( pi < middleArr.length && (ch >= '0' && ch <= '9' ) ) {
                    outputQueue.push(ch);  //直接添加到输出队列
                    pi++;
                    if (pi < middleArr.length)
                        ch = middleArr[pi];
                }
                outputQueue.push(' ');  //添加空格作为数值之间的分隔符
        }//end switch

    }//end while

    while (opStack.length != 0){    //已遍历完中缀表达式，若运算符栈不为空
        out = opStack.pop();    //取出栈顶元素
        outputQueue.push(out);  //添加到后缀表达式
    }

    return outputQueue;

}//end polish


function workPolish() {    //计算中缀表达式
    var value = "";     //用于还原运算数
    var value2= "";
    var numStack = [];  //运算数栈
    // var vue = "";
    while (Queue.length > 0) {
        var cur = Queue.shift();    //取队头
        if (cur >= '0' && cur <= '9' ) {    //遇到数字
            value = "";
            while(cur != ' ') { //不是空格
                value2 = cur;
                value = value + value2;
                cur = Queue.shift();    //继续取队头
            }
            numStack.push(value.toString());     //压入运算数栈
        }
        else if(cur != ' '){     //出现了运算符，则取出两个运算数
            var y = numStack.pop();
            var x = numStack.pop();
            var vue = worktwo(x, y, cur);
            numStack.push(vue);
        }
    }//end while
    return numStack;        //这个结果是还没化简的
}


function worktwo (fir, sec, cur) {
    if(fir.toString().indexOf('/') == -1 && sec.toString().indexOf('/') == -1) {    //两数都不是分数
        fir = Number(fir);
        sec = Number(sec);
        switch(cur) {
            case '+': return (fir + sec);
            case '-': return (fir - sec);
            case '*': return (fir * sec);
            case '/': return fir + '/' + sec;
        }
    }
    else if(fir.toString().indexOf('/') != -1 && sec.toString().indexOf('/') == -1){    //第一个数为分数
        var fractional = fir.split('/');   //字符串分割成数组  fractional【0】分子/fractional【1】分母
        switch(cur) {
            case '+': return ( Number(fractional[1]) * Number(sec) + Number(fractional[0]) ) + '/' + Number(fractional[1]);
            case '-': return ( Number(fractional[0]) - Number(fractional[1]) * Number(sec) ) + '/' + Number(fractional[1]);
            case '*': return ( Number(fractional[0]) * Number(sec) ) + '/' + Number(fractional[1]);
            case '/': return Number(fractional[0]) + '/' + ( Number(fractional[1]) * Number(sec) );
        }

    }
    else if(fir.toString().indexOf('/') == -1 && sec.toString().indexOf('/') != -1){    //第二个数为分数
        var fractional = sec.split('/');
        switch(cur) {
            case '+': return Number(fractional[1]) * Number(fir) + Number(fractional[0]) + '/' + Number(fractional[1]);
            case '-': return ( Number(fractional[1]) * Number(fir) - Number(fractional[0]) ) + '/' + Number(fractional[1]);
            case '*': return ( Number(fractional[0]) * Number(fir) ) + '/' + Number(fractional[1]);
            case '/': return ( Number(fractional[1]) * Number(fir) ) + '/' + Number(fractional[0]);
        }
    }
    else if(fir.toString().indexOf('/') != -1 && sec.toString().indexOf('/') != -1){    //两个数都是分数
        var fractional1 = fir.split('/');
        var fractional2 = sec.split('/');
        switch(cur) {
            case '+': return ( Number(fractional2[1]) * Number(fractional1[0]) + Number(fractional2[0]) * Number(fractional1[1]) ) + '/' + (Number(fractional1[1]) * Number(fractional2[1]) );
            case '-': return ( Number(fractional1[0]) * Number(fractional2[1]) - Number(fractional2[0]) * Number(fractional1[1]) ) + '/' + (Number( fractional1[1]) * Number(fractional2[1]) );
            case '*': return ( Number(fractional1[0]) * Number(fractional2[0]) ) + '/' + ( Number(fractional1[1]) * Number(fractional2[1]) );
            case '/': return ( Number(fractional1[0]) * Number(fractional2[1]) ) + '/' + ( Number(fractional1[1]) * Number(fractional2[0]) );
        }
    }
}


function factor(fx, fy) {       // 找最大公因数
    var t = 0;
    while(fy) {
        t = fx%fy;    //取余
        fx = fy;
        fy = t;
    }
    return fx;
}


function fenShu (a, b, ft) {     // 分数化简 （a为分子，b为分母，mf为最大公因数）
    if(ft == 1) {         // 最大公因数是1
        if(a > b) {    // 分子大，则转化为真分式
            return parseInt(a/b) + '’' + a%b + '/' + b;
        }
        else if(a < b) {      // 分子小
            return a + '/' + b;
        }
        //若最大公因数为1,且a==b，那么a=b=1，而b==1这种情况已经在huajian（num）里面解决了，所以这里不写
    }
    else {      //最大公因数不是1,eg:a=12, b=18, ft=6
        var fa = a/ft;
        var fb = b/ft;
        if( fb==1) {
            return fa;
        }
        else {      //此时最大公因数是1，回到前面部分，所以这里用递归
            return fenShu(fa, fb, factor(fa, fb));
        }
    }
}


function huajian(num) {
    num = num.toString();
    if (num.indexOf('/') == -1) {       //不是分数
        if (num >= 0)  return num;
        else return "#";        //"#"用于标记无效题目
    }
    else {          //若是分数，化简
        var arr = num.split('/');
        arr[0] = Number(arr[0]);        //分子
        arr[1] = Number(arr[1]);        //分母
        if (arr[0] < 0 || arr[1] <= 0)
            return "#";
        if (arr[1] == 1)
            return arr[0];
        else
            return fenShu(arr[0], arr[1], factor(arr[0], arr[1]));
    }
}


function pro(){
        var operatorNum = randomNum(1,3);       //题目会使用多少个符号？
        arr[i][0] = operatorNum;
        var num = 1, op = 1;
        while (num <= operatorNum+1 && op <= operatorNum){
            if (arr[i][op-1] != "/")
                s[i][num] = randomNum(0,range);      //生成运算数
            else
                s[i][num] = randomNum(1,range);      //生成运算数
            arr[i][op] = randomOperator();      //生成运算符
            num++;
            op++;
        }
        var brack;   //控制括号
        switch (operatorNum) {//控制括号
            case 1:
                problem[i] = s[i][1] + arr[i][1] + s[i][2];
                break;
            case 2:
                brack = randomNum(1,2);
                if (brack == 1)
                    problem[i] = s[i][1] + arr[i][1] + s[i][2] + arr[i][2] +s[i][3];
                else
                    problem[i] = s[i][1] + arr[i][1] + "(" + s[i][2] + arr[i][2] +s[i][3] + ")";
                break;
            case 3:
                brack = randomNum(1,5)
                if (brack == 1)
                    problem[i] = s[i][1] + arr[i][1] + s[i][2] + arr[i][2] +s[i][3] + arr[i][3] + s[i][4];
                else if (brack == 2)
                    problem[i] = "(" + s[i][1] + arr[i][1] + s[i][2] + ")" + arr[i][2] +s[i][3] + arr[i][3] + s[i][4];
                else if (brack == 3)
                    problem[i] = s[i][1] + arr[i][1] + "(" + s[i][2] + arr[i][2] +s[i][3] + ")" + arr[i][3] + s[i][4];
                else if (brack == 4)
                    problem[i] = s[i][1] + arr[i][1] + s[i][2] + arr[i][2] + "(" +s[i][3] + arr[i][3] + s[i][4] + ")";
                else
                    problem[i] = s[i][1] + arr[i][1] +"("  + s[i][2] + arr[i][2] +s[i][3] + arr[i][3] + s[i][4] + ")";
                break;
        }//end switch
    }//end start


    function randomNum(min,max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


    function randomOperator() {
        var operator;
        operator = randomNum(1,4);
        if (operator == 1)
            return "+";
        else if (operator == 2)
            return "-";
        else if (operator ==3)
            return "*";
        else
            return "/";
    }
function showAnswer(){
    if(sign == 0 ){alert("请先出题");return false;}
    if(answerSign==1){alert("已输出答案，查看上方答案栏");return false;}
   
    var j;
    for(j = 1;j <= subject;j++)
    {
        answerHtmlArr += '<li>'+ '第' + j +'题：'+ arr[j][4] +'</li>';
    }
    document.getElementById('answer-text').innerHTML=answerHtmlArr;
    
    answerSign=1;


}

function marking(){
    if(sign ==0 ){alert("请先出题");return false;}
    var j,tureTotal,flaseTotal;
    var userAnswer=document.getElementsByClassName("userA")
    userAn = [];
    trueAnswer = new Array();
    trueAnswer="<p>正确题号:";
     flaseAnswer = new Array();
    flaseAnswer="<p>错误题号：";
    tureTotal=0;
    flaseTotal=0;


    for(j = 1;j <= subject;j++)
    {
       if(userAnswer[j-1].value == arr[j][4])
           { trueAnswer+= j + ',';tureTotal++;}
       else
         { flaseAnswer += j+',';flaseTotal++;}
        userAn[j] = userAnswer[j-1].value;

    }
    console.log(userAn);
    console.log(tureTotal);
    console.log(flaseTotal);
    trueAnswer+="</p><h>共"+tureTotal+"题</h>";
    flaseAnswer+="</p><h>共"+flaseTotal+"题</h>";
    console.log(trueAnswer);
    console.log(flaseAnswer);
    
    document.getElementById("Right").innerHTML = trueAnswer;
    document.getElementById("Fault").innerHTML = flaseAnswer;
        
}


function downloadQuestion(){
    if(sign ==0 ){alert("请先出题");return false;}
    var question = quesitonsHtmlArr.toString();
    var name = "question.txt";
    question = question.split("<input class='userA' type='text'/></li>");
    question = question.join("\n");
    question = question.split("<li>");
    question = question.join("");

    download(name,question)
}


function donloadAnswer(){
    if(sign ==0 ){alert("请先出题");return false;}
    var answer =answerHtmlArr.toString();
    var name = "answer.txt";
    answer = answer.split("</li>");
    answer = answer.join("\n");
    answer = answer.split("<li>");
    answer = answer.join("");
    download(name,answer)
}


function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}
