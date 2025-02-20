from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enables CORS to allow React frontend to communicate with Flask

# Sample data (Replace with a database in production)
customers = [
    {"id": 1, "name": "Alice", "email": "alice@example.com", "phone": "123-456-7890"},
    {"id": 2, "name": "Bob", "email": "bob@example.com", "phone": "987-654-3210"}
]

products = [
    {"id": 1, "name": "Laptop", "price": 1200},
    {"id": 2, "name": "Phone", "price": 800},
    {"id": 3, "name": "Headphones", "price": 200}
]

orders = [
    {"id": 1, "customer_id": 1, "total": 1500},
    {"id": 2, "customer_id": 2, "total": 800}
]

# ✅ Get all customers
@app.route("/api/customers", methods=["GET"])
def get_customers():
    return jsonify(customers)

# ✅ Create a new customer
@app.route("/api/customers", methods=["POST"])
def add_customer():
    data = request.json  # Get new customer data from request
    new_customer = {
        "id": customers[-1]["id"] + 1 if customers else 1,  # Auto-increment ID
        "name": data["name"],
        "email": data["email"],
        "phone": data["phone"]
    }
    customers.append(new_customer)  # Add new customer to the list
    return jsonify({"message": "Customer added successfully", "customer": new_customer}), 201

# ✅ Update a customer
@app.route("/api/customers/<int:customer_id>", methods=["PUT"])
def update_customer(customer_id):
    data = request.json  # Get updated customer data from request
    for customer in customers:
        if customer["id"] == customer_id:
            customer.update(data)
            return jsonify({"message": "Customer updated successfully", "customer": customer}), 200
    return jsonify({"error": "Customer not found"}), 404

# ✅ Delete a customer
@app.route("/api/customers/<int:customer_id>", methods=["DELETE"])
def delete_customer(customer_id):
    global customers
    customers = [customer for customer in customers if customer["id"] != customer_id]
    return jsonify({"message": "Customer deleted successfully"}), 200

# ✅ Get all products
@app.route("/api/products", methods=["GET"])
def get_products():
    return jsonify(products)

# ✅ Create a new product (Fix for 405 error)
@app.route("/api/products", methods=["POST"])
def add_product():
    data = request.json  # Get new product data from request
    if not data or "name" not in data or "price" not in data:
        return jsonify({"error": "Invalid product data"}), 400

    new_product = {
        "id": len(products) + 1,  # Generate a new unique ID
        "name": data["name"],
        "price": data["price"]
    }
    products.append(new_product)  # Add new product to the list
    return jsonify({"message": "Product added successfully", "product": new_product}), 201

# ✅ Get all orders
@app.route("/api/orders", methods=["GET"])
def get_orders():
    return jsonify(orders)

# ✅ Get count of customers, products, and orders
@app.route("/api/counts", methods=["GET"])
def get_counts():
    counts = {
        "customers": len(customers),
        "products": len(products),
        "orders": len(orders),
    }
    return jsonify(counts)

if __name__ == "__main__":
    app.run(debug=True, port=5000)  # Ensure Flask runs on port 5000
