const ProductModel = require("../models/productModel");

const getProducts = async (req, res, next) => {
  try {
    const search = req.query.search?.trim() || "";
    const category = req.query.category?.trim() || "";
    const minPrice =
      req.query.minPrice !== undefined ? Number(req.query.minPrice) : undefined;
    const maxPrice =
      req.query.maxPrice !== undefined ? Number(req.query.maxPrice) : undefined;
    const sort = req.query.sort?.trim() || "rating";

    const products = await ProductModel.getAllProducts({
      search,
      category,
      minPrice: Number.isNaN(minPrice) ? undefined : minPrice,
      maxPrice: Number.isNaN(maxPrice) ? undefined : maxPrice,
      sort,
    });

    res.json({
      products,
      total: products.length,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await ProductModel.getProductById(Number(req.params.id));

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

const getTopRatedProducts = async (req, res, next) => {
  try {
    const limit =
      req.query.limit !== undefined ? Number(req.query.limit) : 4;
    const topProducts = await ProductModel.getTopRatedProducts(
      Number.isNaN(limit) ? 4 : limit
    );

    res.json({
      products: topProducts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getTopRatedProducts,
};
