# from flask import Flask, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Enable CORS

# # Define a sample product list
# products = [
#     {"id": 1, "name": "Laptop", "price": 1200},
#     {"id": 2, "name": "Phone", "price": 800},
#     {"id": 3, "name": "Headphones", "price": 200}
# ]

# # ✅ Define the missing API route
# @app.route("/api/products", methods=["GET"])
# def get_products():
#     return jsonify(products)

# if __name__ == "__main__":
#     app.run(debug=True, port=5000)
