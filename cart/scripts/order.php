<?php
$name 	= $_POST["name"];
$email 	= $_POST["email"];
$tel 	= $_POST["tel"];
$goods 	= $_POST["goods"];

$headers  = 'MIME-Version: 1.0' . "\r\n"; //стандартные строки заголовки для почтового сервера
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$to = "shop@gmail.com";//емейл продовца, которому будет приходить заказ

$user_message = "Ваш заказ принят!";
$shop_message = "<br>$name, $email, $goods";//сообщение для продавца

mail($email, "Заказ с сайта", $user_message, $headers);	//письмо отправляется продавцу и клиенту
mail($to, "Новый заказ", $shop_message, $headers);

$messages = array("message" => "Ваш заказ принят!");//массив прогонятеся через json encode
print json_encode($messages);//выводим на экран
exit;
?>