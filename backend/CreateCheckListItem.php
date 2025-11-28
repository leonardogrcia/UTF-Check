<?php

// This code sample uses the 'Unirest' library:
// http://unirest.io/php.html
$query = array(
  'idCard' => '5abbe4b7ddc1b351ef961414',
  'key' => '33740801537c194565b4ee75a229f2fd',
  'token' => '04e616cf5dde7330c335cd802f89c3c750d0d46141b129c296881089911fdd4a'
);

$response = Unirest\Request::post(
  'https://api.trello.com/1/checklists',
  $query
);

// var_dump($response)