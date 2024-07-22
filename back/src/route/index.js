// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()
const Product = require('../class/product');





// Підключіть файли роутів
// const test = require('./test')
// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
// router.use('/', test)
// Використовуйте інші файли роутів, якщо є

router.get('/', (req, res) => {
  res.status(200).json('Hello World')
})


// router.get('/product-create', (req, res) => {
//   res.status(200).json('Hello World')


// })

router.post('/product-create', (req, res) => {

  try {

    const { ProductName, ProductPrice, ProductDescription } = req.body;

    if (!ProductName || !ProductPrice || !ProductDescription) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product(ProductName, ProductPrice, ProductDescription);


    Product.add(newProduct);
    console.log(newProduct)
    return res.status(200).json(newProduct)
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }


});



router.get('/product-list', (req, res) => {
  const productList = Product.getList();

  if (productList) {
    return res.status(200)
      .json(productList)
  } else {
    return res.status(404).json({ message: "Дані відсутні" })

  }

})


router.get('/product-update/:id', (req, res) => {
  const product = Product.getById(Number(req.params.id));

  if (product) {
    return res.status(200)
      .json(product)

  } else {
    return res.status(404).json({ message: "Такий товар не знайдено" })

  }

})


router.put("/product-update/:id", (req, res) => {

  const updProduct = Product.updById(Number(req.params.id), req.body)


  if (updProduct) {
    return res.status(200)
      .json({ message: "Товар не вдалося оновити" })

  } else {
    return res.status(404).json({ message: "Товар не вдалося оновити" })

  }


})

router.delete('/product-update/:id', (req, res) => {


  const deletedProduct = Product.deleteById(Number(req.params.id))


  if (deletedProduct) {
    return res.status(200)
      .json({ message: "Товар успішно видалено" })

  } else {
    return res.status(404).json({ message: "Товар не вдалося видалити" })

  }




})

// Експортуємо глобальний роутер
module.exports = router
