<?php
$arr = array(
    'title' => 'PHP教程',
    'subject1' => '第一章：PHP语法',
    'content1' => 'PHP脚本可以放在文档中的任何位置<br />php文件的默认文件扩展名
    是.php<br />php文件通常包含HTML标签和一些PHP脚本代码<br />PHP中的每个代码行都必
    须以分号结束<br />PHP有两种在浏览器输出文本的基础指令：echo和print',
    'subject2' => '第二章：PHP变量' ,
    'content2' => '变量以$符号开始, 后面跟着变量的名称<br />变量名必须以字母或下
    画线开始<br />变量名只能包含字母、数字及下画线（ A- Z, a ～ z、0 ～ 9和 _) <br />变量名不
    能包含空格<br />变量名是区分大小写的（y和Y是两个不同的变量） <br />PHP 语句和PHP变
    量都是区分大小写的',
    'subject3' => '第N章： ...',
    'content3' => '未完待续',
);
echo json_encode($arr);
