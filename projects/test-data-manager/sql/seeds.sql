-- Seed data for Test Data Manager integration tests

INSERT INTO users (name, email, city, role, salary) VALUES
  ('Hariom Singh', 'hariom@qa.com', 'Delhi', 'sdet', 90000.00),
  ('Rahul Sharma', 'rahul@dev.com', 'Mumbai', 'developer', 110000.00),
  ('Priya Patel', 'priya@qa.com', 'Delhi', 'sdet', 95000.00),
  ('Amit Verma', 'amit@ops.com', 'Bangalore', 'devops', 125000.00)
ON CONFLICT (email) DO NOTHING;

INSERT INTO orders (user_id, product_name, amount, status) VALUES
  (1, 'MacBook Pro M3', 199999.00, 'completed'),
  (1, 'Wireless Mechanical Keyboard', 8500.00, 'completed'),
  (2, '4K UltraWide Monitor', 45000.00, 'pending'),
  (3, 'Ergonomic Chair', 18000.00, 'completed');
