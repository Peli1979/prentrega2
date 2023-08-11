export const productValidator = (req, res, next) => {

    const { title, description, price, thumbnail, code, category, stock } = req.body;
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Por favor completa todos los campos")}
      else {
        return next()
      };
    


    }
export const productUpdateValidator = (req, res, next) => {
    const { _id } = req.params;
    const { title, description, price, thumbnail, code, stock } = req.body;
    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      !stock ||
      !_id
    ) {
      console.log("Por favor completa todos los campos")}
     
      
      else {
        return next()
      };
    }

    export const userValidator = (req, res, next) => {
        const { email, username, password, rol } = req.body;
        if (!email || !username || !password || !rol) {
          console.log(
            "validation error: please complete email, username, password and rol."
          );
          return res.status(400).json({
            status: "error",
            msg: "please complete email, username, password and rol.",
            payload: {},
          });
        }}

  
     export const userUpdateValidator = (req, res, next) => {
      const { _id } = req.params;
		const { email, username, password, rol } = req.body;
		if (!email || !username || !password || !rol || !_id) {
			console.log(
				"validation error: please complete email, username, password and rol."
			);
			return res.status(400).json({
				status: "error",
				msg: "please complete email, username, password and rol.",
				payload: {},
			});
    }}