const fetch = require("node-fetch");
// let products = require("../database/products");
const { response } = require("express");
const ProductModel = require("../models/ProductModel");

module.exports = {
  findProducts: (req, res) => {
    fetch("https://dhfakestore.herokuapp.com/api/products")
      .then((response) => response.json())
      .then((productosSugeridos) => {
        return res.render("product", { productosSugeridos });
      });
  },

  findProductById: async (req, res) => {
    let idProduct = req.params.id;
    const productToShow = await ProductModel.filterProductById(idProduct);
    res.render("product", { productToShow });
  },

  //PRODUCTOS SUGERIDOS//              //url para esta función =>   /products/api/product/suggested
  findProductsSuggested: async (req, res) => {
    let url = "https://dhfakestore.herokuapp.com/api/products";
    fetch(url);
    let response = await fetch(url);
    let data = await response.json();

    // Código que trae los productos con valor True  //
    let trueSuggested = await data.filter((data) => data.mostwanted == true);

    trueSuggested = [
      trueSuggested[0],
      trueSuggested[1],
      trueSuggested[2],
      trueSuggested[3],
      trueSuggested[4],
    ];
    return res.render("product", {
      trueSuggested,
    });
  },

  //          /api/products/:id/related         //
  findProductsRelatedById: (req, res) => {
    let id = req.params.id;

    fetch("https://dhfakestore.herokuapp.com/api/products/" + id)
      .then((responde) => response.json())
      .then((producto) => {
        fetch("https://fakestoreapi.com/products/category/" + producto.category)
          .then((response) => response.json())
          .then((categoriaProducto) => {
            return res.render("product", { categoriaProducto });
          });
      });
  },
  findProductsMostWanted: (req, res) => {},
};
