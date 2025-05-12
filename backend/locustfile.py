from locust import HttpUser, task, between, tag
import random
import json

class BackendUser(HttpUser):
    wait_time = between(1, 5)  # Wait between 1-5 seconds between tasks
    
    def on_start(self):
        # Login to get a token
        response = self.client.post("/api/user/login", json={
            "email": "test@example.com",
            "password": "password123"
        })
        if response.status_code == 200 and response.json().get("success"):
            self.token = response.json().get("token")
            # Store token for subsequent requests
            self.client.headers.update({"token": self.token})
        else:
            # If login fails, try to register
            register_response = self.client.post("/api/user/register", json={
                "name": "Test User",
                "email": f"test{random.randint(1000, 9999)}@example.com",
                "password": "password123"
            })
            if register_response.status_code == 200 and register_response.json().get("success"):
                self.token = register_response.json().get("token")
                self.client.headers.update({"token": self.token})
    
    # User API Endpoints
    @tag('user')
    @task(2)
    def login_user(self):
        self.client.post("/api/user/login", json={
            "email": "test@example.com",
            "password": "password123"
        })
    
    @tag('user')
    @task(1)
    def register_user(self):
        random_num = random.randint(1000, 9999)
        self.client.post("/api/user/register", json={
            "name": f"Test User {random_num}",
            "email": f"testuser{random_num}@example.com",
            "password": "password123"
        })
    
    # Product API Endpoints
    @tag('product')
    @task(10)
    def get_products(self):
        self.client.get("/api/product/list")
    
    @tag('product')
    @task(2)
    def add_product(self):
        if hasattr(self, 'token'):
            random_num = random.randint(1000, 9999)
            self.client.post("/api/product/add", json={
                "title": f"Test Product {random_num}",
                "description": f"Description for product {random_num}",
                "price": random.randint(50, 500),
                "category": random.choice(["Tops", "Bottoms", "Shirts"]),
                "subCategory": random.choice(["Men", "Women", "Kids"]),
                "sizes": ["S", "M", "L", "XL"],
                "BestSell": random.choice([True, False]),
                "image": ["https://via.placeholder.com/150"]
            })
    
    # Cart API Endpoints
    @tag('cart')
    @task(5)
    def get_cart(self):
        if hasattr(self, 'token'):
            self.client.post("/api/cart/get", json={})
    
    @tag('cart')
    @task(3)
    def add_to_cart(self):
        if hasattr(self, 'token'):
            product_ids = ["6768ffd6ad9c9ad645022b9d", "64bfc9c4b5e9fc00002", "prod123"]
            sizes = ["S", "M", "L", "XL"]
            self.client.post("/api/cart/add", json={
                "itemId": random.choice(product_ids),
                "size": random.choice(sizes)
            })
    
    @tag('cart')
    @task(2)
    def remove_from_cart(self):
        if hasattr(self, 'token'):
            product_ids = ["6768ffd6ad9c9ad645022b9d", "64bfc9c4b5e9fc00002", "prod123"]
            sizes = ["S", "M", "L", "XL"]
            self.client.post("/api/cart/delete", json={
                "itemId": random.choice(product_ids),
                "size": random.choice(sizes)
            })
    
    @tag('cart')
    @task(2)
    def update_cart(self):
        if hasattr(self, 'token'):
            product_ids = ["6768ffd6ad9c9ad645022b9d", "64bfc9c4b5e9fc00002", "prod123"]
            sizes = ["S", "M", "L", "XL"]
            self.client.post("/api/cart/update", json={
                "itemId": random.choice(product_ids),
                "size": random.choice(sizes),
                "quantity": random.randint(1, 10)
            })
    
    # Order API Endpoints
    @tag('order')
    @task(3)
    def get_user_orders(self):
        if hasattr(self, 'token'):
            self.client.post("/api/order/userorders", json={})
    
    @tag('order')
    @task(1)
    def place_order(self):
        if hasattr(self, 'token'):
            product_ids = ["6768ffd6ad9c9ad645022b9d", "64bfc9c4b5e9fc00002", "prod123"]
            sizes = ["S", "M", "L", "XL"]
            
            # Create random items for the order
            items = []
            for _ in range(random.randint(1, 3)):
                items.append({
                    "productId": random.choice(product_ids),
                    "quantity": random.randint(1, 5),
                    "size": random.choice(sizes)
                })
            
            # Calculate a random amount
            amount = random.randint(100, 1000)
            
            self.client.post("/api/order/place", json={
                "items": items,
                "amount": amount,
                "address": {
                    "firstName": "Test",
                    "lastName": "User",
                    "email": "test@example.com",
                    "street": "123 Main St",
                    "city": "Test City",
                    "state": "TS",
                    "zipcode": "12345",
                    "country": "Test Country",
                    "phone": "1234567890"
                },
                "paymentMethod": random.choice(["cod", "stripe", "credit card"])
            })
    
    @tag('order')
    @task(1)
    def get_all_orders(self):
        if hasattr(self, 'token'):
            self.client.post("/api/order/list", json={})
    
    @tag('order')
    @task(1)
    def update_order_status(self):
        if hasattr(self, 'token'):
            # This would typically be an admin function
            # For testing purposes, we're including it with a random order ID
            order_ids = ["order1", "order2", "order3"]
            statuses = ["Order Placed", "Processing", "Shipped", "Delivered"]
            
            self.client.post("/api/order/status", json={
                "orderId": random.choice(order_ids),
                "status": random.choice(statuses)
            })
    
    # Combined operations to simulate real user behavior
    @tag('user_flow')
    @task(2)
    def browse_and_purchase_flow(self):
        if hasattr(self, 'token'):
            # Browse products
            self.client.get("/api/product/list")
            
            # Add items to cart
            product_ids = ["6768ffd6ad9c9ad645022b9d", "64bfc9c4b5e9fc00002"]
            sizes = ["S", "M", "L", "XL"]
            
            for _ in range(random.randint(1, 3)):
                self.client.post("/api/cart/add", json={
                    "itemId": random.choice(product_ids),
                    "size": random.choice(sizes)
                })
            
            # Get cart
            self.client.post("/api/cart/get", json={})
            
            # Place order (20% chance)
            if random.random() < 0.2:
                items = []
                for _ in range(random.randint(1, 3)):
                    items.append({
                        "productId": random.choice(product_ids),
                        "quantity": random.randint(1, 5),
                        "size": random.choice(sizes)
                    })
                
                self.client.post("/api/order/place", json={
                    "items": items,
                    "amount": random.randint(100, 1000),
                    "address": {
                        "firstName": "Test",
                        "lastName": "User",
                        "email": "test@example.com",
                        "street": "123 Main St",
                        "city": "Test City",
                        "state": "TS",
                        "zipcode": "12345",
                        "country": "Test Country",
                        "phone": "1234567890"
                    },
                    "paymentMethod": random.choice(["cod", "stripe", "credit card"])
                })
                
                # Check orders after placing an order
                self.client.post("/api/order/userorders", json={})