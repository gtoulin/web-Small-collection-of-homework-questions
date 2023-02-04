var results;
//自动加载
function loadBody(){
    $("#list").html("");
    search(1);
    var arr = Object.keys(results.data);
    for (var i = 0; i < arr.length;i++){
        if(results.data[i]){
            var text = "<div class= 'card' >" +
                "<a href= '#' >" +
                "<video controls= 'controls' class='card-img-top' src='" + results.data[i].v_src + "'></video>" +
                "<div class='card-body'> <h5 class = 'card-title' ></h5> " + results.data[i].name + "</h5> </div> " +
                "</a>" +
                " </div>";
            $("#list").append(text);
        }
    }
}

function search(page_no) {
        var send_url = "/api/videos/list?page_no=" + page_no;
        var keyword = $('#keyword').val();
        $.ajax({
            type: "get",
            url: send_url,
            data: {keyword:keyword},
            dataType: "json",
            async:false,
            headers: {
                Accept: "application/json; charset=utf-8 "
            },
            success: function (result) {
                //判断返回状态码
                if (result.code == 200) {
                    results = result;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status);
            }
        })
    }


