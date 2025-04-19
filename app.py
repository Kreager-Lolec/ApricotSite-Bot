import threading
import time
import requests
from flask import Flask, request, jsonify
import ConstantFile

app = Flask(__name__)

# Ваш Telegram бот та інший код (ендпоінт /webhook, тощо)
# ...


@app.route('/test_send', methods=['GET'])
def test_send():
    result = send_message(ConstantFile.myId, "Тестове повідомлення")
    return jsonify(result)


@app.route('/webhook', methods=['GET', 'POST'])
def webhook():
    if request.method == 'GET':
        return "Цей ендпоінт приймає лише POST-запити", 405
    data = request.get_json(force=True)
    if "update_id" in data:
        # Обробка оновлення від Telegram (наприклад, /start)
        message = data.get("message", {})
        text = message.get("text", "")
        chat_id = message.get("chat", {}).get("id")
        if text.strip() == "/start":
            send_message(chat_id, "Привіт! Я живий і готовий приймати замовлення!")
        return jsonify({"status": "ok"}), 200
    else:
        # Обробка замовлення від PHP-скрипта
        name = data.get('name', 'Невідоме імʼя')
        phone = data.get('phone', 'Невідомий номер')
        quantity = data.get('quantity', '0')
        additional_products = data.get('additional_products', 'Немає')
        total_price = data.get('total_price', '0')
        message_text = (
            f"<b>Нове замовлення</b>\n"
            f"Ім'я: {name}\n"
            f"Телефон: {phone}\n"
            f"Кількість товарів: {quantity}\n"
            f"Додаткові товари: {additional_products}\n"
            f"Сумарна ціна: {total_price}"
        )
        send_order_to_telegram(message_text)
        return jsonify({"status": "ok"}), 200

# Функції для відправки повідомлень у Telegram
def send_message(chat_id, text):
    url = ConstantFile.url
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML"
    }
    try:
        response = requests.post(url, json=payload)
        return response.json()
    except Exception as e:
        print("Помилка відправки повідомлення:", e)
        return None

def send_order_to_telegram(message):
    # Надсилаємо повідомлення в основний чат
    TELEGRAM_CHAT_ID = ConstantFile.myId  # Замініть на свій ID
    return send_message(TELEGRAM_CHAT_ID, message)

# Функція, що періодично надсилає запит на сервер для підтримки активності
def keep_alive():
    # URL, який потрібно "пінгувати" (наприклад, коренева сторінка)
    url = ConstantFile.urlsite  # Замініть на свій URL
    while True:
        time.sleep(29 * 60)  # 29 хвилин (29*60 секунд)
        try:
            response = requests.get(url)
            print(f"Ping виконано, статус: {response.status_code}")
        except Exception as e:
            print("Помилка пінгу:", e)


if __name__ == '__main__':
    # Створюємо і запускаємо фоновий потік для keep_alive (daemon=True, щоб він не блокував вихід)
    print("start")
    t = threading.Thread(target=keep_alive, daemon=True)
    t.start()
    # Запускаємо Flask‑сервер
    app.run(host="0.0.0.0", port=8080)
