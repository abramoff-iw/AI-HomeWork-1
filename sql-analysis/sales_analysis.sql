-- DDL: Create and populate the orders table
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer TEXT,
    amount REAL,
    order_date DATE
);

INSERT INTO orders (customer, amount, order_date) VALUES
('Alice', 5000, '2024-03-01'),
('Bob', 8000, '2024-03-05'),
('Alice', 3000, '2024-03-15'),
('Charlie', 7000, '2024-02-20'),
('Alice', 10000, '2024-02-28'),
('Bob', 4000, '2024-02-10'),
('Charlie', 9000, '2024-03-22'),
('Alice', 2000, '2024-03-30');

-- Task 1: Calculate total sales volume for March 2024
SELECT SUM(amount) as total_sales_march
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';
-- Result is 27k instead of expected 22k, checked by my own table and I see that's correct result - 5+8+3+9+2=27k

-- Task 2: Find the customer who spent the most overall
SELECT 
    customer,
    SUM(amount) as total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;
-- Result is 20k instead of expected 18k, checked by my own table and I see that's correct result - 5+3+10+2=20k


-- Task 3: Calculate average order value for the last 3 months
SELECT
    AVG(amount) as average_order_value
FROM orders
WHERE order_date BETWEEN DATE('2024-03-31', '-3 months') AND  DATE('2024-03-31');
-- Result is 6000, I think expected result in the description was generated using ChatGPT because it gave me expected result 5750 as well
-- but when I asked to explain and prove the answer, it turned out that GPT got total of all orders 46k instead of 48k