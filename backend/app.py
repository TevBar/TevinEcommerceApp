from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enables CORS to allow React frontend to communicate with Flask

# Sample route for products
@app.route('/api/products', methods=['GET'])
def get_products():
    products = [
        {"id": 1, "name": "Product 1", "price": 10.99},
        {"id": 2, "name": "Product 2", "price": 20.99}
    ]
    return jsonify(products)

if __name__ == "__main__":
    app.run(debug=True, port=5000)  # Runs Flask on port 5000
