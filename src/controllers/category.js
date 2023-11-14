const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../reponse/reponse");
const models = initModel(sequelize);
const { Op, where } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const getListProductByCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    // Find the category by name
    const category = await models.ProductCategory.findAll({
      where: { category_name: categoryName },
      include: {
        model: models.Product,
        as: "Products", // Assuming you have defined the association as 'products'
      },
    });

    if (!category) {
      return failCode(res, "Không tìm thấy danh mục với tên đã cung cấp.");
    }

    succesCode(res, category, "Lấy sản phẩm theo danh mục thành công!!!");
  } catch (error) {
    console.error("Sequelize error:", error);
    errorCode(res, "Lỗi Backend");
  }
};

module.exports = { getListProductByCategory };
