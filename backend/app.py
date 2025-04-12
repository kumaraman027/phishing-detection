from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import requests
from urllib.parse import urlparse
import socket
import validators
import json

app = Flask(__name__)
CORS(app)

model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

def get_safe_browsing_status(url):
    api_key = "AIzaSyArkH8PyW2wYl4biJspTXSjsJ3-wbj3PwI"
    endpoint = f"https://safebrowsing.googleapis.com/v4/threatMatches:find?key={api_key}"

    body = {
        "client": {
            "clientId": "yourapp-name",
            "clientVersion": "1.0"
        },
        "threatInfo": {
            "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
            "platformTypes": ["ANY_PLATFORM"],
            "threatEntryTypes": ["URL"],
            "threatEntries": [{"url": url}]
        }
    }

    try:
        res = requests.post(endpoint, data=json.dumps(body))
        matches = res.json().get("matches")
        return "Unsafe" if matches else "Safe"
    except Exception:
        return "Unknown"

def get_ip_info(domain):
    try:
        ip_address = socket.gethostbyname(domain)
        response = requests.get(f"https://ipinfo.io/{ip_address}/json")
        data = response.json()

        return {
            "ip": ip_address,
            "country": data.get("country", "N/A"),
            "region": data.get("region", "N/A"),
            "city": data.get("city", "N/A"),
            "org": data.get("org", "N/A"),
            "isp": data.get("org", "N/A"),
        }
    except Exception as e:
        return {
            "ip": "N/A",
            "country": "N/A",
            "region": "N/A",
            "city": "N/A",
            "org": "N/A",
            "isp": "N/A",
            "error": str(e)
        }

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data or 'url' not in data:
        return jsonify({'result': 'Error: No URL provided'})

    url = data['url']
    if not validators.url(url):
        return jsonify({'result': 'Invalid URL'}), 400

    url_vec = vectorizer.transform([url])
    prediction = model.predict(url_vec)[0]
    result = "Phishing" if prediction == 1 else "Legitimate"

    trust_score = 85 if result == "Legitimate" else 20
    response_data = {
        "result": result,
        "trustScore": trust_score
    }

    if result == "Legitimate":
        try:
            parsed_url = urlparse(url)
            domain = parsed_url.netloc
            ip_info = get_ip_info(domain)
            safe_browsing = get_safe_browsing_status(url)
            response_data.update(ip_info)
            response_data["safeBrowsing"] = safe_browsing
        except Exception as e:
            response_data["error"] = str(e)

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)
