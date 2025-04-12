import joblib
from sklearn.ensemble import RandomForestClassifier

# Dummy data
X = [
    [50, 0, 1, 2, 1],  # Legit
    [100, 1, 3, 4, 0], # Phish
    [60, 0, 1, 3, 1],  # Legit
    [90, 2, 2, 5, 0],  # Phish
]
y = [0, 1, 0, 1]  # 0 = Legitimate, 1 = Phishing

model = RandomForestClassifier()
model.fit(X, y)

joblib.dump(model, 'model.pkl')
