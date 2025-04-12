from flask import Flask, request, jsonify
import joblib
from extract_features import extract_features
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = joblib.load('model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    url = data.get('url', '')
    features = extract_features(url)
    result = model.predict([features])[0]
    return jsonify({'result': 'Phishing' if result == 1 else 'Legitimate'})

if __name__ == '__main__':
    app.run(debug=True)
