<?php

class Answer {
    
    function __construct() {
        $this->method;
        $this->status;
        $this->data;
    }

    public function setMethod($method) {
        $this->method = $method;
    }

    public function success($data) {
        $this->status = 'OK';
        $this->data = $data;

        return $this->make();
    }

    public function error($reason = null) {
        $this->status = 'ERR';
        $this->data = $reason;

        return $this->make();
    }

    private function make() {
        $res = array();

        if ($this->method)
            $res['method'] = $this->method;

        $res['status'] = $this->status;
        $res['data'] = $this->data;

        return $res;
    }
}