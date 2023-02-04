<?php
class data{
    public $result = [
        "code"=>200,
        "data"=>[
            ["name"=>"视频1", "v_src"=>"video/coffee.mp4"],
            ["name"=>"视频2", "v_src"=>"video/coffee.mp4"],
            ["name"=>"视频3", "v_src"=>"video/coffee.mp4"],
            ["name"=>"视频4", "v_src"=>"video/coffee.mp4"],
            ["name"=>"视频5", "v_src"=>"video/coffee.mp4"],
            ["name"=>"视频6", "v_src"=>"video/coffee.mp4"],
        ]
    ];

    function getresult(){
        return $this->result;
    }
}
