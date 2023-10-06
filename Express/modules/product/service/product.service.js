class ProductService {
    async getAllProducts() { }
    async createProduct(productData) { }
    async searchProduct(name, description) { }
    async getProduct(productId) { }
    async updateProduct(productId, updatedProduct) { }
    async deleteProduct(productId) { }
    async getTopRatedProducts(limit) { }
}

module.exports = ProductService;
