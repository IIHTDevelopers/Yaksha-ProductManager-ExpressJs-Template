const request = require('supertest');
const express = require('express');
const router = require('../../modules/product/routes/product.routes');

const ProductController = require('../../modules/product/controller/product.controller');
const ProductServiceImpl = require('../../modules/product/service/impl/product.serviceImpl');

const app = express();
app.use(express.json());
app.use(router);

jest.mock('../../modules/product/service/impl/product.serviceImpl');

let productControllerBoundaryTest = `ProductController boundary test`;

describe('Product Controller', () => {
    describe('boundary', () => {
        it(`${productControllerBoundaryTest} should create a new product`, async () => {
            const mReq = {
                body: {
                    name: 'Test Product',
                    description: 'Test product description',
                    price: 19.99,
                    category: 'Electronics',
                    image: 'test_image.jpg',
                    ratings: [4, 5],
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const mockProduct = {
                _id: 'mockProductId',
                ...mReq.body,
            };

            ProductServiceImpl.prototype.createProduct.mockResolvedValueOnce(mockProduct);

            await new ProductController().createProduct(mReq, mRes, mNext);

            expect(ProductServiceImpl.prototype.createProduct).toHaveBeenCalledWith(mReq.body);
            expect(mRes.status).toHaveBeenCalledWith(201);
            expect(mRes.json).toHaveBeenCalledWith(mockProduct);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${productControllerBoundaryTest} should retrieve a product by ID`, async () => {
            const productId = 'mockProductId';
            const mockProduct = {
                _id: productId,
                name: 'Test Product',
                description: 'Test product description',
                price: 19.99,
                category: 'Electronics',
                image: 'test_image.jpg',
                ratings: [4, 5],
            };

            const mReq = {
                params: { id: productId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            ProductServiceImpl.prototype.getProduct.mockResolvedValueOnce(mockProduct);

            await new ProductController().getProduct(mReq, mRes, mNext);

            expect(ProductServiceImpl.prototype.getProduct).toHaveBeenCalledWith(productId);
            expect(mRes.json).toHaveBeenCalledWith(mockProduct);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${productControllerBoundaryTest} should update a product by ID`, async () => {
            const productId = 'mockProductId';
            const updatedProductData = {
                name: 'Updated Test Product',
                description: 'Updated test product description',
                price: 29.99,
                category: 'Electronics',
                image: 'updated_test_image.jpg',
                ratings: [4, 5, 4],
            };
            const updatedProduct = {
                _id: productId,
                ...updatedProductData,
            };

            const mReq = {
                params: { id: productId },
                body: updatedProductData,
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            ProductServiceImpl.prototype.updateProduct.mockResolvedValueOnce(updatedProduct);

            await new ProductController().updateProduct(mReq, mRes, mNext);

            expect(ProductServiceImpl.prototype.updateProduct).toHaveBeenCalledWith(productId, updatedProductData);
            expect(mRes.json).toHaveBeenCalledWith(updatedProduct);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${productControllerBoundaryTest} should delete a product by ID`, async () => {
            const productId = 'mockProductId';
            const deletedProduct = {
                _id: productId,
                name: 'Test Product',
                description: 'Test product description',
                price: 19.99,
                category: 'Electronics',
                image: 'test_image.jpg',
                ratings: [4, 5],
            };

            const mReq = {
                params: { id: productId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            ProductServiceImpl.prototype.deleteProduct.mockResolvedValueOnce(deletedProduct);

            await new ProductController().deleteProduct(mReq, mRes, mNext);

            expect(ProductServiceImpl.prototype.deleteProduct).toHaveBeenCalledWith(productId);
            expect(mRes.json).toHaveBeenCalledWith(deletedProduct);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${productControllerBoundaryTest} should return a 404 error when getting product with invalid ID`, async () => {
            const productId = 'invalidProductId';

            const mReq = {
                params: { id: productId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            ProductServiceImpl.prototype.getProduct.mockRejectedValueOnce(new Error('Product not found.'));

            await new ProductController().getProduct(mReq, mRes, mNext);

            expect(ProductServiceImpl.prototype.getProduct).toHaveBeenCalledWith(productId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Product not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${productControllerBoundaryTest} should return a 404 error when updating product with invalid ID`, async () => {
            const productId = 'invalidProductId';
            const updatedProductData = {
                name: 'Updated Test Product',
                description: 'Updated test product description',
                price: 29.99,
                category: 'Electronics',
                image: 'updated_test_image.jpg',
                ratings: [4, 5, 4],
            };

            const mReq = {
                params: { id: productId },
                body: updatedProductData,
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            ProductServiceImpl.prototype.updateProduct.mockRejectedValueOnce(new Error('Product not found.'));

            await new ProductController().updateProduct(mReq, mRes, mNext);

            expect(ProductServiceImpl.prototype.updateProduct).toHaveBeenCalledWith(productId, updatedProductData);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Product not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${productControllerBoundaryTest} should return a 404 error when deleting product with invalid ID`, async () => {
            const productId = 'invalidProductId';

            const mReq = {
                params: { id: productId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            ProductServiceImpl.prototype.deleteProduct.mockRejectedValueOnce(new Error('Product not found.'));

            await new ProductController().deleteProduct(mReq, mRes, mNext);

            expect(ProductServiceImpl.prototype.deleteProduct).toHaveBeenCalledWith(productId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Product not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${productControllerBoundaryTest} should return a 404 error when getting product by invalid ID`, async () => {
            const productId = 'invalidProductId';

            const mReq = {
                params: { id: productId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            ProductServiceImpl.prototype.getProduct.mockRejectedValueOnce(new Error('Product not found.'));

            await new ProductController().getProduct(mReq, mRes, mNext);

            expect(ProductServiceImpl.prototype.getProduct).toHaveBeenCalledWith(productId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Product not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${productControllerBoundaryTest} should return a 404 error when updating product by invalid ID`, async () => {
            const productId = 'invalidProductId';
            const updatedProductData = {
                name: 'Updated Product',
                description: 'Updated product description',
                price: 29.99,
                category: 'Updated Electronics',
                image: 'updated_test_image.jpg',
                ratings: [4, 5],
            };

            const mReq = {
                params: { id: productId },
                body: updatedProductData,
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            ProductServiceImpl.prototype.updateProduct.mockRejectedValueOnce(new Error('Product not found.'));

            await new ProductController().updateProduct(mReq, mRes, mNext);

            expect(ProductServiceImpl.prototype.updateProduct).toHaveBeenCalledWith(productId, updatedProductData);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Product not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${productControllerBoundaryTest} should retrieve all products`, async () => {
            const mockProducts = [
                { _id: 'product_id1', name: 'Product 1' },
                { _id: 'product_id2', name: 'Product 2' },
            ];

            const mReq = {};
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            ProductServiceImpl.prototype.getAllProducts.mockResolvedValueOnce(mockProducts);

            await new ProductController().getAllProducts(mReq, mRes, mNext);

            expect(ProductServiceImpl.prototype.getAllProducts).toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockProducts);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${productControllerBoundaryTest} should handle error when retrieving all products`, async () => {
            const mReq = {};
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            ProductServiceImpl.prototype.getAllProducts.mockRejectedValueOnce(new Error('Failed to retrieve products.'));

            await new ProductController().getAllProducts(mReq, mRes, mNext);

            expect(ProductServiceImpl.prototype.getAllProducts).toHaveBeenCalled();
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to retrieve products.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${productControllerBoundaryTest} should retrieve top rated products`, async () => {
            const limit = 5;
            const mockTopRatedProducts = [
                { _id: 'product_id1', name: 'Top Rated Product 1', ratings: 4.8 },
                { _id: 'product_id2', name: 'Top Rated Product 2', ratings: 4.7 },
            ];

            const mReq = {
                params: { limit: limit.toString() },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            ProductServiceImpl.prototype.getTopRatedProducts.mockResolvedValueOnce(mockTopRatedProducts);

            await new ProductController().getTopRatedProducts(mReq, mRes, mNext);

            expect(ProductServiceImpl.prototype.getTopRatedProducts).toHaveBeenCalledWith(limit);
            expect(mRes.json).toHaveBeenCalledWith(mockTopRatedProducts);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${productControllerBoundaryTest} should handle error when retrieving top rated products`, async () => {
            const limit = 5;
            const mReq = {
                params: { limit: limit.toString() },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            ProductServiceImpl.prototype.getTopRatedProducts.mockRejectedValueOnce(new Error('Failed to retrieve top rated products.'));

            await new ProductController().getTopRatedProducts(mReq, mRes, mNext);

            expect(ProductServiceImpl.prototype.getTopRatedProducts).toHaveBeenCalledWith(limit);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to retrieve top rated products.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${productControllerBoundaryTest} should search for products by name and description`, async () => {
            const mockSearchResults = [
                { _id: 'product_id1', name: 'Product 1' },
                { _id: 'product_id2', name: 'Product 2' },
            ];

            const mReq = {
                query: { name: 'Product', description: 'Test' },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            ProductServiceImpl.prototype.searchProduct.mockResolvedValueOnce(mockSearchResults);

            await new ProductController().searchProduct(mReq, mRes, mNext);

            expect(ProductServiceImpl.prototype.searchProduct).toHaveBeenCalledWith('Product', 'Test');
            expect(mRes.json).toHaveBeenCalledWith(mockSearchResults);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${productControllerBoundaryTest} should handle error when searching for products`, async () => {
            const mReq = {
                query: { name: 'Product', description: 'Test' },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            ProductServiceImpl.prototype.searchProduct.mockRejectedValueOnce(new Error('Failed to search products.'));

            await new ProductController().searchProduct(mReq, mRes, mNext);

            expect(ProductServiceImpl.prototype.searchProduct).toHaveBeenCalledWith('Product', 'Test');
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to search products.' });
            expect(mNext).not.toHaveBeenCalled();
        });
    });
});
