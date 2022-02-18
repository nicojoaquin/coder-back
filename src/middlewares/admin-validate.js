module.exports = async (req, res, next) => {

  const {admin} = req.headers;

  if(admin === "false") {
    return res.status(401).json({
      ok: false,
      msg: "No autorizado"
    })
  }

  if(admin === "true") {
    next();
  }

};