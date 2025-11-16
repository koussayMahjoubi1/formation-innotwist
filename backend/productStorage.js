class ProductStorage {
  constructor() {
    this.products = [];
  }

  createProduct(name, description) {
    if (!name || !description) {
      return { success: false, message: 'Name and description are required' };
    }

    const product = {
      id: Date.now().toString(),
      name,
      description,
      createdAt: new Date()
    };
    this.products.push(product);
    return { success: true, product };
  }

  listProducts() {
    return { success: true, products: [...this.products] };
  }

  updateProduct(id, updates) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      return { success: false, message: 'Product not found' };
    }
    const current = this.products[index];
    const updated = { ...current, ...updates };
    this.products[index] = updated;
    return { success: true, product: updated };
  }

  deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      return { success: false, message: 'Product not found' };
    }
    const [removed] = this.products.splice(index, 1);
    return { success: true, product: removed };
  }
}

module.exports = new ProductStorage();
