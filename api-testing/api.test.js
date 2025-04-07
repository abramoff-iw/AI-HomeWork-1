const axios = require('axios');

const API_URL = 'https://fakestoreapi.com/products';

describe('Fake Store API Tests', () => {
  let products;

  beforeAll(async () => {
    const response = await axios.get(API_URL);
    products = response.data;
  });

  test('Server response code is 200', async () => {
    const response = await axios.get(API_URL);
    expect(response.status).toBe(200);
  });

  test('All products have required attributes', () => {
    products.forEach(product => {
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('rating');
      expect(product.rating).toHaveProperty('rate');
    });
  });

  test('Product titles are not empty', () => {
    products.forEach(product => {
      expect(product.title).toBeTruthy();
      expect(typeof product.title).toBe('string');
      expect(product.title.length).toBeGreaterThan(0);
    });
  });

  test('Product prices are not negative', () => {
    products.forEach(product => {
      expect(product.price).toBeGreaterThanOrEqual(0);
    });
  });

  test('Product ratings do not exceed 5', () => {
    products.forEach(product => {
      expect(product.rating.rate).toBeLessThanOrEqual(5);
    });
  });

  test('Generate list of products with defects', () => {
    const productsWithDefects = products.filter(product => {
      return !product.title || 
             product.price < 0 || 
             product.rating.rate > 5;
    });

    console.log('Products with defects:', productsWithDefects);
    expect(productsWithDefects).toBeDefined();
  });
}); 