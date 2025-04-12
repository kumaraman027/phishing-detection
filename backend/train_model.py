import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import joblib

# Load dataset
df = pd.read_csv("dataset_phishing.csv")
df = df.sample(frac=1).reset_index(drop=True)  # shuffle

# Only keep 'URL' and 'Label'

df = df[['url', 'status']]

df['status'] = df['status'].map({'legitimate': 0, 'phishing': 1})


# Split data
X_train, X_test, y_train, y_test = train_test_split(df['url'], df['status'], test_size=0.2, random_state=42)


# Vectorize URLs
vectorizer = TfidfVectorizer()
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Train model
model = LogisticRegression()
model.fit(X_train_vec, y_train)

# Save model and vectorizer
joblib.dump(model, "model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("✅ Model and vectorizer saved successfully.")
