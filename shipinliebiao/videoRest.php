<?php
include_once("data.php");
class videoRest{
    private $allowResource = array("api");

    private $allowMethod = array("GET","POST","DELETE","PUT");

    private function setMethod(){
        //获得当前请求,保存到属性中
        $this->requestMethod = $_SERVER['REQUEST_METHOD'];
        //检查当前请求的方法,是否在被允许的方法数组中， 若不在，则抛出异常信息
        if(!in_array($this->requestMethod,$this->allowMethod)) {
            throw new Exception("请求方法不被允许",405);
        }
    }

    private function setResource(){
        //获取http://localhost后面的值，包括“/”
        $path = $_SERVER["REQUEST_URI"];
        //解析参数（?只有的字符串为过滤参数）
        $tmp = explode("?",$path);
        //判断是否含过滤参数
        if(isset($tmp[1])){
            //参数使用&间隔，分隔出每一个参数
            foreach (explode("&",$tmp[1]) as $param_str){
                //使用 = 分离出key与value值
                $param = explode("=",$param_str);
                //若value没有值，则设为""
                if (isset($param[1])) {
                    $this->requestParams[$param[0]] = $param[1];
                } else {
                    $this->requestParams[$param[0]] = "";
                }
            }
        }
        //解析资源
        //RESTful中使用/来表示资源的层级关系，使用/切割出各级的资源列表
        $tmp = explode("/",$tmp[0]);
        //因$_SERVER["REQUEST_URI"]包含/，切割后第一个元素为""，需要从数组中移除
        array_shift($tmp);
        //将资源列表保存到属性中
        $this->resources = $tmp;
        //请求的第一级资源， 为资源模块或类别，保存到requestResource中
        $this->requestResource = $tmp[0];
        //判断请求资源是否在被允许的资源数组之中，如果不在，则表示请求资源不被允许，返回异常信息
        if (!in_array($this->requestResource, $this->allowResource)) {
            throw new Exception("请求方法不被允许",405);
        }
    }

    private $statusCode = array(
        200 => "OK",
        204 => "No Content",
        400 => "Bad Request",
        403 => "Forbidden",
        404 => "Not Found",
        405 => "Method Not Allowed",
        500 => "Server Internel Error"
    );

    protected function json_exception($e){
        $code = $e->getCode();
        $message = $e->getMessage();
        //若异常吗大于200，表示出现异常，设置响应的HTTP状态码
        if ($code > 200) {
            header("HTTP/1.1".$code."".$this->statusCode[$code]);
        }
        //在头部设置返回内容的格式为JSON和编码
        header("Content-Type:application/json:charset:utf-8");
        //如果异常消息不为空，则返回消息及异常码
        if (!empty($message)) {
            echo json_encode(array(
                "message" => $message,
                "code" => $code
            ));
        }
    }

    //Api启动方法
    public function run(){
        try {
            //设置当前请求的方法
            $this->setMethod();
            //设置当前请求的资源
            $this->setResource();
            //判断请求的方法
            if ($this->requestMethod == "GET") {
                //判断请求的路径
                if ($this->resources[1] == "videos" && isset($this->requestParams["page_no"])){
                    $this->sendVideos();//返回相应视频列表数据
                } else {
                    throw new Exception("请求资源不被允许",404);
                }

            } else {
                //其他请求不支持，返回异常信息
                throw new Exception("请求方法不被允许",405);
            }

        } catch (Exception $e) {
            $this->json_exception($e);
        }
    }

    function sendVideos() {
        //判断请求的资源
        if ($this->resources[2] == "list") {
            $data = new data();
            $result = $data->getresult();
            if(isset($this->requestParams['keyword']) && !empty($this->requestParams['keyword'])){
                $count = count($result['data']);
                for($i=0;$i<$count;$i++){
                    if($result['data'][$i]['name'] ==  urldecode($this->requestParams['keyword'])){
                        echo json_encode(['code'=>200,"data"=>[['name'=>$result['data'][$i]['name'] ,'v_src'=>$result['data'][$i]['v_src']]]]);
                    }
                }
            } else {
                echo json_encode($result);
            }
        } else {
            throw new Exception("请求资源不被允许",404);
        }
    }
}
