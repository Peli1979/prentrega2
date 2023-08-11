import { productService } from "../services/products.service.js";


class ProductsController{

async get(req, res) {
    try {
      const { limit, pagina, category, orderBy } = req.query;
      const data = await productService.getAllWithPagination(
        limit,
        pagina,
        category,
        orderBy
      );
      const {
        totalDocs,
        totalPages,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
      } = data;
      res.status(200).json({
        status: "success",
        msg: `Mostrando los ${data.docs.length} productos`,
        payload: data.docs,
        totalDocs: totalDocs,
        totalPages: totalPages,
        prevPage: hasPrevPage ? prevPage : null,
        nextPage: hasNextPage ? nextPage : null,
        page: page,
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage,
        prevLink: hasPrevPage
          ? `/api/products?limit=${data.limit}&pagina=${prevPage}`
          : null,
        nextLink: hasNextPage
          ? `/api/products?limit=${data.limit}&pagina=${nextPage}`
          : null,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "Error en el servidor",
        payload: {},
      });
    }}

    async post(req, res) {
        try {
            const { title, description, price, thumbnail, code, category, stock } = req.body;
            const ProductCreated = await productService.create({
              title,
              description,
              price,
              category,
              thumbnail,
              code,
              stock,
            });
            return res.status(201).json({
              status: "success",
              msg: "Producto Creado",
              payload: {
                _id: ProductCreated._id,
                title: ProductCreated.title,
                description: ProductCreated.description,
                price: ProductCreated.price,
                thumbnail: ProductCreated.thumbnail,
                code: ProductCreated.code,
                stock: ProductCreated.stock,
              },
            });
          } catch (e) {
            console.log(e);
            return res.status(500).json({
              status: "error",
              msg: "Error en el servidor",
              payload: {},
            });
          }}
        

          async put(req, res){
          try {
            const { _id } = req.params;
            const { title, description, price, thumbnail, code, stock } = req.body;
            const productUpdated = await productService.update({
              _id,
              title,
              description,
              price,
              thumbnail,
              code,
              stock,
            });
            if (productUpdated.matchedCount > 0) {
              return res.status(201).json({
                status: "success",
                msg: "product uptaded",
                payload: `Has actualizado el producto con ID ${_id}`,
              });
            } else {
              return res.status(404).json({
                status: "error",
                msg: "product not found",
                payload: {},
              });
            }
          } catch (e) {
            return res.status(500).json({
              status: "error",
              msg: "Error al actualizar el producto",
              payload: {},
            });
          }
          }

          async delete(req, res){
            try {
              const { _id } = req.params;
          
              const result = await productService.delete(_id);
          
              if (result?.deletedCount > 0) {
                return res.status(200).json({
                  status: "success",
                  msg: "Producto Eliminado",
                  payload: `Has eliminado el producto con ID ${_id}`,
                });
              } else {
                return res.status(404).json({
                  status: "error",
                  msg: "El producto no existe",
                  payload: {},
                });
              }
            } catch (e) {
              console.log(e);
              return res.status(500).json({
                status: "error",
                msg: "Error en el servidor",
                payload: {},
              });
            }

          }

          async getProductsRender(req, res){

          try {
            const { limit, pagina, category, orderBy } = req.query;
            const data = await productService.getAllWithPagination(limit, pagina, category, orderBy);
            const { totalPages, page, hasPrevPage, hasNextPage, prevPage, nextPage } = data;
            const plainProducts = data.docs.map((doc) => doc.toObject());
            const firstName = req.session.user?.firstName;
            const rol = req.session.user?.rol;
            const title = 'Listado de Productos';
            return res.status(200).render('products', {
              title,
              firstName,
              rol,
              plainProducts,
              totalPages,
              page,
              hasPrevPage,
              hasNextPage,
              prevPage,
              nextPage,
            });
          } catch (err) {
            console.log(err);
            res.status(501).send({ status: 'error', msg: 'Error en el servidor', error: err });
          }
        };

        async getAdminProducts(req, res){

        try {
          const data = await productService.getAll({});
          const dataParse = data.map((prod) => {
            return {
              id: prod._id,
              title: prod.title,
              description: prod.description,
              price: prod.price,
              thumbnail: prod.thumbnail,
              code: prod.code,
              stock: prod.stock,
            };
          });
          const title = "Administrador de Productos";
          return res.status(200).render("products-admin", { dataParse, title });
        } catch (err) {
          console.log(err);
          res
            .status(501)
            .send({ status: "error", msg: "Error en el servidor", error: err });
        }
      }};
      
        



    export const productsController = new ProductsController();
    




