from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle

app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def hello_world():
    return "Hello, World!"

@app.route('/predict', methods=['POST'])
def predict():
    input_values = request.json  # Expecting an array of input values

    if not input_values:
        return jsonify({'error': 'Empty input data'}), 400

    # Convert input values to float and handle errors
    try:
        final = np.array(input_values, dtype=float).reshape(1, -1)
    except ValueError:
        return jsonify({'error': 'Invalid input data format'}), 400

    print("Input values:", input_values)
    print("Final:", final)

    
    prediction = model.predict(final)  

    if prediction == 1:
        return jsonify({'prediction': 'Your driving is slow'})
    elif prediction == 2:
        return jsonify({'prediction': 'Your driving is normal'})
    elif prediction == 3:
        return jsonify({'prediction': 'Your driving is fast'})
    else:
        return jsonify({'error': 'Unknown prediction'}), 500

if __name__ == '__main__':
    app.run(debug=True)
