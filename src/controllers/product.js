const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../reponse/reponse");
const models = initModel(sequelize);
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const getListAllProducts = async (req, res) => {
  try {
    const products = await models.Product.findAll({
      include: ["category"],
    });

    succesCode(res, products, `Lấy danh sách products thành công!!!`);
  } catch (error) {
    errorCode(res, "Lỗi Backend");
  }
};

const getListBannerProducts = async (req, res) => {
  try {
    const banner = await models.Product.findAll({
      order: [["creation_date", "DESC"]], // Order by creation_date in descending order
      limit: 3, // Limit the result to 3 records
      include: ["category"],
    });

    succesCode(res, banner, `Lấy danh sách 3 sản phẩm mới nhất thành công!!!`);
  } catch (error) {
    errorCode(res, "Lỗi Backend");
  }
};
const searchProducts = async (req, res) => {
  try {
    const { startDate, endDate, minPrice, maxPrice } = req.query;

    // Build the dynamic conditions for the query
    const conditions = {};

    if (startDate && endDate) {
      conditions.creation_date = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    if (minPrice && maxPrice) {
      conditions.price = {
        [Op.between]: [parseInt(minPrice), parseInt(maxPrice)],
      };
    }

    const products = await models.Product.findAll({
      where: conditions,
      include: ["category"],
    });

    succesCode(res, products, "Tìm kiếm sản phẩm thành công!!!");
  } catch (error) {
    errorCode(res, "Lỗi Backend");
  }
};

const searchProductsByName = async (req, res) => {
  try {
    const { name } = req.params;

    // Decode the URL-encoded parameter
    const decodedName = decodeURIComponent(name);

    // Build the dynamic conditions for the query
    const conditions = {};

    if (decodedName) {
      conditions.product_name = {
        [Op.like]: `%${decodedName}%`, // Case-insensitive search for product name
      };
    }

    const products = await models.Product.findAll({
      where: conditions,
      include: ["category"],
    });

    succesCode(res, products, "Tìm kiếm sản phẩm theo tên thành công!!!");
  } catch (error) {
    console.error("Sequelize error:", error);
    errorCode(res, "Lỗi Backend");
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await models.Product.findOne({
      where: { product_id: productId }, // Adjust this line based on your actual column name
      include: ["category"],
    });

    if (product) {
      succesCode(res, product, "Lấy thông tin sản phẩm theo ID thành công!!!");
    } else {
      failCode(res, "Không tìm thấy sản phẩm với ID đã cung cấp.");
    }
  } catch (error) {
    console.error("Sequelize error:", error);
    errorCode(res, "Lỗi Backend");
  }
};

module.exports = {
  getListAllProducts,
  getListBannerProducts,
  searchProducts,
  searchProductsByName,
  getProductById,
};
