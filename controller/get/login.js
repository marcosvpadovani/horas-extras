const path = require("path");

exports.getLoginPage = (req, res) => {
  return res
    .status(200)
    .render(path.join(__dirname, "../../views/", "login.ejs"));
};
