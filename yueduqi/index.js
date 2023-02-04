/*获取XML格式的书籍数据*/
var data = [];
function loadXML(url) {
    clear();
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var result = xmlhttp.responseXML;
            /*在这里构建目录和内容*/
            var dom = document.getElementsByTagName("header")[0];
            var h1 = document.createElement("h1");
            h1.innerHTML = result.getElementsByTagName("title")[0].childNodes[0].nodeValue;
            dom.appendChild(h1);

            var dom = document.getElementsByTagName("aside")[0];
            var index = 0;
            for(var i = 0; i < result.getElementsByTagName("section").length; i++) {
                var ul = document.createElement("ul");
                ul.innerHTML = result.getElementsByTagName("subject")[i].childNodes[0].nodeValue;
                for(var j = 0; j < result.getElementsByTagName("section")[i].getElementsByTagName("section1").length;j++){
                    data.push(result.getElementsByTagName("section")[i].getElementsByTagName("content")[j].childNodes[0].nodeValue);
                    var li = document.createElement("li");
                    li.id = index++;
                    /*在这里绑定onclick事件构建内容*/
                    li.onclick = function(){
                        document.getElementsByTagName("p")[0].innerHTML = data[this.id];
                    }
                    li.innerHTML = result.getElementsByTagName("section")[i].getElementsByTagName("subject1")[j].childNodes[0].nodeValue;
                        ul.appendChild(li);
                        dom.appendChild(ul);
                }
            }
        }
    }
    xmlhttp.open("get",url,true);
    xmlhttp.send();
}
/** 获取JSON格式的书籍数据 */
var json = {};
function loadJSON(url) {
    clear();
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var result = xmlhttp.responseText;
            result = JSON.parse(result);
            /*在这里构建目录和内容*/
            var dom = document.getElementsByTagName("header")[0];
            var h1 = document.createElement("h1") ;
            h1.innerHTML = result.title;
            dom.appendChild(h1);

            var dom = document.getElementsByTagName("aside")[0];
            for(var data in result) {
                if(data.search ("subject") != -1){
                    var ul = document.createElement("ul") ;
                    ul.innerHTML = result[data];
                    ul.value = data;
                    /*在这里绑定onclick事件构建内容*/
                    ul.onclick = function() {
                         document.getElementsByTagName("p")[0].innerHTML = result["content" + this.value.split("subject")[1]]
                    };
                     dom.appendChild(ul);
                }
            }
        }
    }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

function clear() {
    var dom = document.getElementsByTagName("header")[0];
    while (dom.hasChildNodes()) {
        dom.removeChild(dom.firstChild);
    }
    var dom = document.getElementsByTagName("aside")[0];
        while (dom.hasChildNodes ()) {
        dom.removeChild(dom.firstChild);
    }
    document.getElementsByTagName("P")[0].innerHTML = "";
}