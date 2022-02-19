module.exports = async (req, res, next) => {

  const {admin} = req.headers;

  if(admin !== "true") {
    return res.status(401).json({
      ok: false,
      msg: "No autorizado"
    })
  }
  next();

};