const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = this.readFromFile();
    }

    readFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data) || [];
        } catch (error) {
            return [];
        }
    }

    saveToFile() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    }

    addProduct(product) {
        const newProduct = {
            id: this.products.length + 1,
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock
        };

        this.products.push(newProduct);
        this.saveToFile();
    }

    getProducts() {
        return this.products;
    }

    getProductById(productId) {
        return this.products.find(product => product.id === productId) || null;
    }

    updateProduct(productId, fieldToUpdate, value) {
        const productToUpdate = this.products.find(product => product.id === productId);

        if (productToUpdate) {
            productToUpdate[fieldToUpdate] = value;
            this.saveToFile();
        }
    }

    deleteProduct(productId) {
        const indexToDelete = this.products.findIndex(product => product.id === productId);

        if (indexToDelete !== -1) {
            this.products.splice(indexToDelete, 1);
            this.saveToFile();
        }
    }
}

// Ruta al archivo
const filePath = 'C:/Users/Delfi/OneDrive/Documentos/CoderHouse/BackEnd/Segunda Entrega/productos.json';


const productManager = new ProductManager(filePath);

const newProduct = {
    title: "Tablet",
    description: "Dispositivo compacto para navegación y entretenimiento",
    price: 390999.99,
    thumbnail: "tablet.jpg",
    code: "P003",
    stock: 20
};

productManager.addProduct(newProduct);

const allProducts = productManager.getProducts();
console.log("Todos los productos:", allProducts);

const productById = productManager.getProductById(1);
console.log("Producto con ID 1:", productById);

productManager.updateProduct(1, 'price', 49999.99);

const updatedProduct = productManager.getProductById(1);
console.log("Producto actualizado:", updatedProduct);

productManager.deleteProduct(2);

const remainingProducts = productManager.getProducts();
console.log("Productos después de eliminar el ID 2:", remainingProducts);
