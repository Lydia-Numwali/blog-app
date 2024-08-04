import db from "../db.js"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  let query = `SELECT * FROM users WHERE username = $1 OR email = $2`;
  try {
    const data = await db.query(query, [req.body.username, req.body.email]);
    if (data.rows.length)
      return res.status(409).json("User or email already exists");
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    query = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`;
    await db.query(query, [req.body.username, req.body.email, hashedPassword]);
    res.status(200).json("User has been successfully created");
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};


export const login = async (req, res) => {
  
  let query = `SELECT * FROM users WHERE username = $1 OR email = $1`;
  try {
    const data = await db.query(query, [req.body.username]);

    if (data.rows.length === 0)
      return res.status(404).json("Username or email not found");

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      data.rows[0].password
    );
    if (!isPasswordCorrect) return res.status(400).json("Password incorrect");
    const token = jwt.sign({ id: data.rows[0].id }, process.env.JWT_KEY);

    const { password, ...otherInformation } = data.rows[0];

   
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3600000, 
      })
      .status(200)
      .json(otherInformation);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};


export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none", 
      secure: true, 
    })
    .status(200)
    .json("Logged out successfully");
};
