<?php
header("Content-type:text/xml");
$result ="<?xml version='1.0' encoding='utf8'?>
<list>
<title>PHP教程</title>
<section>
    <subject>第一章：PHP语法</subject>
    <section1>
        <subject1>基本的PHP语法:</subject1>
        <content>PHP脚本可以放在文档中的任何位置&lt;br /&gt;php文件的默认文件扩展名
        是' .php ' &lt;br /&gt;php文件通常包含HTML标签和一些PHP脚本代码</content>
    </section1>
    <section1>
        <subject1>PHP中的注释:</subject1>
        <content>//这是PHP单行注释,/*这是PHP多行注释*/</content>
    </section1>
</section>
<section>
    <subject>第二章：PHP变量</subject>
    <section1>
        <subject1>基本的PHP语法:</subject1>
        <content>变量以 $ 符号开始,后面跟着变量的名称<br/>变量名必须以字母或下画线开始
        <br/>变量名只能包含字母、数字及下划线（A～ Z、a ～ z、0 ～ 9和 _) <br />变量名不能包含空
        格<br />变量名是区分大小写的（y和Y是两个不同的变量） <br />PHP 语句和PHP变量都是区
        分大小写的</content>
    </section1>
</section>
</list> ";
echo $result;