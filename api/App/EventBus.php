<?php

class EventBus {
  function __construct() {
    $this->events = array();
  }

  function subscribe($event, $function) {
    if (!$this->events[$event])
      $this->events[$event] = array();

    push_array($this->events[$event], $function);
  }

  function invoke($event, $data) {
    if (!$this->events[$event])
      $this->events[$event] = array();

    foreach ($this->events[$event] as $subscribedFunction) {
      $subscribedFunction($data);
    }
  }
}