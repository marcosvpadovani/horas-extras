require("dotenv").config();
const { Servidor } = require("../../model/index");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (typeof username !== "string" || username.length <= 1)
      return res
        .status(400)
        .json({ message: "Uma ou mas informações estão erradas." });

    if (typeof password !== "string" || password.length <= 1)
      return res
        .status(400)
        .json({ message: "Uma ou mas informações estão erradas." });

    const user = await Servidor.findOne({ where: { matricula: username } });

    if (!user)
      return res.status(400).json({ message: "Servidor não encontrado." });

    if (!(await bcrypt.compare(password, username.senha)))
      return res
        .status(403)
        .json({ message: "Matricula ou senha incorretas." });

    username.senha = "";

    const token = jwt.sign({ username }, process.env.JWT, { expiresIn: "24h" });

    if (!token)
      return res.status(400).json({
        message: "An err happened on trying to set up the authentication token",
      });

    return res
      .status(200)
      .cookie("auth", token, {
        httpOnly: true,
        path: "/",
        expires: new Date(Date.now() + 86400000),
      })
      .json({ message: "Successfully authenticated" });
  } catch (error) {
    console.log(error);
  }
};
