// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()
const Product = require('../class/product');


router.get('/', (req, res) => {
  res.status(200).json('Hello World')
})



router.post('/product-create', (req, res) => {

  try {

    const { name, price, description } = req.body;

    if (!name || !price || !description) {
      return res.status(400).json({ message: "Всі поля є обовязкові" });
    }

    const newProduct = new Product(name, price, description);


    Product.add(newProduct);
    console.log(newProduct);

    return res.status(200).json(newProduct)

  } catch (error) {

    console.error('Помилка при створенні товару:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }


});



router.get('/product-list', (req, res) => {


  try {

    const productList = Product.getList();
    console.log('Product list:', productList);

    return res.status(200).json(productList)


  } catch (error) {

    console.error('Помилка при отриманні списку товарів', error)
    return res.status(404).json({ message: "Дані відсутні" })

  }


})

router.get('/product-update/:id', async (req, res) => {
  try {
    console.log('Received ID:', req.params.id); // Add this line to debug
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.getById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product', error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.put("/product-update/:id", (req, res) => {



  try {
    console.log(`Оновлення товару з айді: ${req.params.id}`);

    const updProduct = Product.updById(Number(req.params.id), req.body)
    if (updProduct) {
      console.log(`Оновлений товар: ${JSON.stringify(Product.getById(Number(req.params.id)))}`);
      return res.status(200)
        .json({ message: "Товар вдалося оновити" })
    }


  } catch (error) {
    console.error("Помилка при зміні даних товару", error)
    return res.status(404).json({ message: "Товар не вдалося оновити" })


  }
});

router.delete('/product-update/:id', (req, res) => {


  try {
    const productId = Number(req.params.id);
    console.log(`Видалення товару з айді: ${productId}`);

    const deletedProduct = Product.deleteById(productId);

    if (deletedProduct) {
      console.log(`Товар з айді: ${productId} видалено успішно`);
      return res.status(200).json({ message: "Товар успішно видалено" });
    }

  } catch (error) {

    console.error("Помилка при спробі видалити товар", error)
    return res.status(404).json({ message: "Товар не вдалося видалити" });

  }
});


// Експортуємо глобальний роутер
module.exports = router
