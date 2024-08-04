import db from "../db.js"; 
import jwt from "jsonwebtoken";


export const getPosts = async (req, res) => {
  const { category } = req.query;
  const query = `SELECT * FROM posts ${category ? "WHERE category = $1" : ""} ORDER BY date DESC`;
  try {
    const data = await db.query(query, category ? [category] : []);
    res.status(200).json(data.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};


export const getaPost = async (req, res) => {
  const { id } = req.params;
  const query = `SELECT posts.id AS post_id, title, content, posts.img AS posts_img, date, category, uid, username, users.img AS users_img FROM posts 
    JOIN users ON posts.uid = users.id
    WHERE posts.id = $1`;
  try {
    const data = await db.query(query, [id]);
    const { password, ...otherInformation } = data.rows[0]; // Exclude password from the response
    res.status(200).json(otherInformation);
  } catch (err) {
    res.status(500).json(err);
  }
};


export const getRelatedPosts = async (req, res) => {
  const { id } = req.params;
  const { category } = req.query;
  const query = `SELECT * FROM posts
  WHERE id != $1
  ORDER BY CASE WHEN category = $2 THEN 0 ELSE 1 END, category
  LIMIT 8`;

  try {
    const data = await db.query(query, [id, category]);
    res.status(200).json(data.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};


export const addPost = async (req, res) => {
  const query = `INSERT INTO posts (title, content, category, img, date, uid)
  VALUES ($1, $2, $3, $4, $5, $6)`;
  const userInfo = req.user;
  const { title, content, category, img, date } = req.body;
  const values = [title, content, category, img, date, userInfo.id];
  try {
    await db.query(query, values);
    res.status(200).json("Posted successfully");
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};


export const deletePost = async (req, res) => {
  let query;
  try {
    const userInfo = req.user;
    const { id } = req.params;

    query = `SELECT uid FROM posts WHERE id = $1`;
    const data = await db.query(query, [id]);
    if (data.rows.length === 0 || data.rows[0].uid !== userInfo.id)
      return res.status(403).json("You are not authorized");

    
    query = `DELETE FROM posts WHERE id = $1 AND uid = $2`;
    await db.query(query, [id, userInfo.id]);
    res.status(200).json("Deleted successfully");
  } catch (err) {
    res.status(500).json("Token is not valid");
  }
};


export const updatePost = async (req, res) => {
  let query;
  try {
    const userInfo = req.user;
    const { id } = req.params;
    query = `SELECT uid FROM posts WHERE id = $1`;
    const data = await db.query(query, [id]);
    if (data.rows.length === 0 || data.rows[0].uid !== userInfo.id)
      return res.status(403).json("You are not authorized");

 
    query = `UPDATE posts 
          SET title = $1, content = $2, category = $3, img = $4, date = $5
          WHERE id = $6 AND uid = $7`;
    const { title, content, category, img, date } = req.body;
    const values = [title, content, category, img, date, id, userInfo.id];
    await db.query(query, values);
    res.status(200).json("Updated successfully");
  } catch (err) {
    res.status(500).json("Token is not valid");
  }
};


export const addComment = async (req, res) => {
  const query = `INSERT INTO comments (post_id, user_id, comment, date)
  VALUES ($1, $2, $3, $4)`;
  const userInfo = req.user;
  const { post_id, comment, date } = req.body;
  const values = [post_id, userInfo.id, comment, date];
  try {
    await db.query(query, values);
    res.status(200).json("Comment added successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getComments = async (req, res) => {
  const { id } = req.params;
  const query = `SELECT comments.id AS comment_id, comment, date, user_id, username, users.img AS user_img FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE post_id = $1 ORDER BY date DESC`;
  try {
    const data = await db.query(query, [id]);
    res.status(200).json(data.rows);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};


export const deleteComment = async (req, res) => {
  let query;
  try {
    const userInfo = req.user;
    const { id } = req.params;

    query = `SELECT user_id FROM comments WHERE id = $1`;
    const data = await db.query(query, [id]);
    if (data.rows.length === 0 || data.rows[0].user_id !== userInfo.id)
      return res.status(403).json("You are not authorized");

    
    query = `DELETE FROM comments WHERE id = $1 AND user_id = $2`;
    await db.query(query, [id, userInfo.id]);
    res.status(200).json("Comment deleted successfully");
  } catch (err) {
    res.status(500).json("Token is not valid");
  }
};



export const updateComment = async (req, res) => {
  let query;
  try {
    const userInfo = req.user;
    const { id } = req.params;
    const { comment } = req.body;

    
    query = `SELECT user_id FROM comments WHERE id = $1`;
    const data = await db.query(query, [id]);
    if (data.rows.length === 0 || data.rows[0].user_id !== userInfo.id) {
      return res.status(403).json("You are not authorized to update this comment");
    }

    
    query = `UPDATE comments SET comment = $1 WHERE id = $2 AND user_id = $3`;
    await db.query(query, [comment, id, userInfo.id]);
    res.status(200).json("Comment updated successfully");
  } catch (err) {
    res.status(500).json("An error occurred while updating the comment");
  }
};
