from flask import Flask, request, jsonify
import joblib  # Used for loading the saved model (if saved)
import numpy as np

app = Flask(__name__)

# Load your pre-trained model (adjust according to your notebook)
model = joblib.load("C:\\Users\\Dell\\OneDrive\\Desktop\\project\\model\\model.pkl")
import joblib  # Used for loading the saved model (if saved)
import numpy as np

app = Flask(__name__)

# Load your pre-trained model (adjust according to your notebook)
model = joblib.load("C:\\Users\\Dell\\OneDrive\\Desktop\\project\\model\\model.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Get the data sent from the frontend

    # Pre-process the input data (depends on how your model expects it)
    input_data = np.array(data['input_features']).reshape(1, -1)

    # Make prediction
    prediction = model.predict(input_data)

    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Get the data sent from the frontend

    # Pre-process the input data (depends on how your model expects it)
    input_data = np.array(data['input_features']).reshape(1, -1)

    # Make prediction
    prediction = model.predict(input_data)

    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
