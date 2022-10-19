const Products = require('../model/Products');
const LikedProducts = require('../model/LikedProducts');
const multer = require('multer');
let fs = require('fs-extra');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(__dirname);
        fs.mkdirsSync(__dirname + '/uploads/images');
        cb(null, 'uploads/images');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const getProducts = async (req, res) => {
    const mobiles = await Products.find({ type: 'mobile' });
    const websites = await Products.find({ type: 'web' });
    const recents = await Products.find(
        {
            "date": 
            {
                $gte: new Date((new Date().getTime() - (15 * 24 * 60 * 60 * 1000)))
            }
        }
    )
    .sort({ "date": -1 })
    return res.send({
        mobiles: mobiles,
        websites: websites,
        recents: recents,
    });
}

const searchProducts = async (req, res) => {
    const { keyword } = req.query;
    const searchResults = await Products.find({productName:{$regex: keyword, $options: 'i'}});
    if(searchResults){
        return res.send({
            searchResults: searchResults,
        });
    }else{
        return res.send({
            status: 'error',
            searchResults: [],
        });
    }
}

const createNewProduct = async (req, res) => {
    const {
        productInfo,
    } = req.body;
    const { productName, category, year, description, imageList } = productInfo;
    const newProduct = new Products({
        productName,
        category,
        year,
        description,
        imageList,
        type: 'web',
        liked: false,
        viewed: false,
    })

    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
}

const deleteProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Products.findById(id);
    if (!product) {
        return res.status(404).send({
          message: `Collection with ID: ${id} does not exist in database.`,
        });
    }
    await Products.findByIdAndDelete(id);
    const products = await Products.find({});

    res.status(200).json(products);
}

const deleteProducts = async(req, res) => {
    await Products.remove({});
}

const addLikedProduct = async (req, res) => {
    const {
        userId: userId, 
        productId: productId,
    } = req.body;
    const existed = await Products.findById(productId);
    if(existed){
        existed.liked= existed.liked + 1;
        existed.save();
        return res.send({
            status: 'ok',
            message: 'already exist',
        });
    }else{
        return res.send({
            status: 'error',
            message: 'dont exist',
        });
    }
}

const addViewedProduct = async (req, res) => {
    const {
        userId: userId, 
        productId: productId,
    } = req.body;
    const existed = await Products.findById(productId);
    if(existed){
        existed.viewed = existed.viewed + 1;
        existed.save();
        return res.send({
            status: 'ok',
            message: 'already exist',
        });
    }else{
        return res.send({
            status: 'error',
            message: 'dont exist',
        });
    }
}

const getYearlyProducts = async(req, res) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const lastDay = new Date(date.getFullYear(), 12, 30);
    const counts = await Products.find({createdDate: {$gte: firstDay, $lt: lastDay}}).count();
    return res.send({
        status: 'ok',
        counts: counts,
    })
}

const getMonthlyProducts = async(req, res) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const counts = await Products.find({createdDate: {$gte: firstDay, $lt: lastDay}}).count();
    return res.send({
        status: 'ok',
        counts: counts,
    })
}

const getDailyProducts = async(req, res) => {
    let start = new Date();
    start.setHours(0,0,0,0);
    let end = new Date();
    end.setHours(23,59,59,999);
    const counts = await Products.find({createdDate: {$gte: start, $lt: end}}).count();
    return res.send({
        status: 'ok',
        counts: counts,
    })
}

const getTopProducts = async (req, res) => {
    const query = {};
    const sort = { liked: -1, viewed: -1 };
    const limit = 6;
    const topProducts = await Products.find(query).sort(sort).limit(limit);
    return res.send({
        status: 'ok',
        products: topProducts,
    });
}

const getAllProducts = async (req, res) => {
    const query = {};
    const sort = { liked: -1, viewed: -1 };
    const products = await Products.find(query).sort(sort);
    return res.send({
        status: 'ok',
        products: products,
    });
}

const getNewProducts = async (req, res) => {
    const query = {};
    const sort = { createdDate: -1 };
    const limit = 6;
    const topProducts = await Products.find(query).sort(sort).limit(limit);
    return res.send({
        status: 'ok',
        products: topProducts,
    });
}

const getAllNewProducts = async (req, res) => {
    const query = {};
    const sort = { createdDate: -1 };
    const products = await Products.find(query).sort(sort);
    return res.send({
        status: 'ok',
        products: products,
    });
}

const uploadProductImage = async(req, res) => {
    let upload = multer({ storage: storage}).single('Users_pic');
    try{
        upload(req, res, function(err) {
            const files = req?.files?.images;
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any
            
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!files || files.length === 0) {
                return res.status(404).send('');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
            let filePaths = [];
            if(files.length > 1){
                files.map(file => {
                    const filePath = '/uploads/products/' + Date.now() + file.name;
                    file.mv('./public' + filePath);
                    filePaths.push(filePath);
                })
            }else{
                const filePath = '/uploads/products/' + Date.now() + files.name;
                files.mv('./public' + filePath);
                filePaths.push(filePath);
            }
            res.status(200).json(filePaths);
        });
    }catch(error){
        return res.send(error);
    }
}

const getProductById = async (req, res) => {
    const { id } = req.query;
    const product = await Products.find({_id: id});
    if(product){
        res.status(200).json(product[0]);
    }else{
        res.status(404).send({ message: 'something error' })
    }
}

const getProductByName = async (req, res) => {
    const {
        productName, 
    } = req.body;
    const product = await Products.find({productName: productName});
    if(product){
        res.status(200).json(product[0]);
    }else{
        res.status(404).send({ message: 'something error' })
    }
}

const upDateProduct = async (req, res) => {
    const { id } = req.params;
    const {
        productInfo, 
    } = req.body;
    
    const product = await Products.findById(id);
    if(!product){
        return res.status(404).send({
            message: `product with ID: ${id} does not exist in database.`,
        });
    }

    product.updatedAt = Date.now();
    product.productName = productInfo?.productName;
    product.category = productInfo?.category;
    product.year = productInfo?.year
    product.description = productInfo?.description;
    product.imageList = productInfo?.imageList;

    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
}

module.exports = {
    getProducts,
    searchProducts,
    createNewProduct,
    getProductById,
    getProductByName,
    deleteProductById,
    deleteProducts,
    addLikedProduct,
    addViewedProduct,
    getYearlyProducts,
    getMonthlyProducts,
    getDailyProducts,
    getTopProducts,
    getAllProducts,
    getNewProducts,
    getAllNewProducts,
    uploadProductImage,
    upDateProduct
};
  