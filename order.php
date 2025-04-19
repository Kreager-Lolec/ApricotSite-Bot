<?php
// Немає потреби в session_start(), якщо використовуємо GET-параметри
$client_name = isset($_GET['client_name']) ? htmlspecialchars($_GET['client_name'], ENT_QUOTES, 'UTF-8') : 'Невідоме ім’я';
$phone       = isset($_GET['phone']) ? htmlspecialchars($_GET['phone'], ENT_QUOTES, 'UTF-8') : 'Невідомий номер';
$quantity    = isset($_GET['quantity']) ? (int)$_GET['quantity'] : 0;
$total       = isset($_GET['total']) ? (int)$_GET['total'] : 0;
?>
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>Дякуємо за замовлення</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; background: #f7f7f7; color: #333; text-align: center; padding: 50px; }
    .thankyou-container { background: #fff; padding: 40px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); display: inline-block; }
    h1 { color: #28a745; }
  </style>
  
  <!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1419711925660129');
fbq('track', 'PageView');
fbq('track', 'Lead');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1419711925660129&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
</head>
<body>
  <div class="thankyou-container">
    <h1>Дякуємо за Ваше замовлення!</h1>
    <p>Ім'я: <strong><?= $client_name; ?></strong></p>
    <p>Телефон: <strong><?= $phone; ?></strong></p>
    <p>Кількість саджанців: <strong><?= $quantity; ?></strong></p>
    <p>Загальна сума замовлення: <strong><?= $total; ?> грн</strong></p>
    <p>Наш менеджер зв'яжеться з Вами найближчим часом для підтвердження замовлення.</p>
  </div>
</body>
</html>
