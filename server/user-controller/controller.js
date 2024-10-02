let show = require('../db/model/model');
const { success_function, error_function } = require('../util/response-Handler');
const fileupload = require('../util/file-upload').fileUpload
const category = require('../db/model/category');
const language = require('../db/model/language')
const path = require('path'); 
const fileDelete = require('../util/delete-file').fileDelete

exports.add = async function (req, res) {
    try {
        let body = req.body;

        let body_category = body.category;
        console.log("category", body_category);

        let match = await category.findOne({ category: body_category });
        console.log("match", match)

        let id = match._id;
        console.log("id", id)

        body.category = id;

        // let language = body.language;
        // console.log("language",language);

        let language_match = await language.findOne({ language: body.language });
        console.log("languagematch", language_match);

        let language_id = language_match._id;
        console.log("language_id", language_id);

        body.language = language_id



        let image = body.image;

        if (image) {
            let img_path = await fileupload(image, "movie");
            console.log("img_path", img_path);
            body.image = img_path
        }

        let new_movie = await show.create(body);

        let response = success_function({
            success: true,
            statusCode: 200,
            message: "added successfully"
        })
        res.status(response.statusCode).send(response)
        return;
    } catch (error) {
        console.log("error", error);

        let response = error_function({
            success: false,
            statusCode: 404,
            message: "failed"
        })
        res.status(response.statusCode).send(response)
        return;
    }
}


exports.get_datas = async function (req, res) {
    

    try {
        // let c_category= await category.findOne(category._id);
        // console.log("c_category :",c_category)

        let c_category = await category.findOne({category :req.query.category});
        console.log("c_category :", c_category);

        let l_language = await language.findOne({language : req.query.language});

        let categoryQuery= c_category;
        let languageQuery = l_language;

        console.log("category Query :",categoryQuery);
        console.log("language Query :",languageQuery);




        let fillterarr = [];

        if(categoryQuery){
            fillterarr.push({category : categoryQuery})
        }

        if(languageQuery){
            fillterarr.push({language : languageQuery})
        }


        let showResponse = await show.find(fillterarr.length > 0 ? {$and : fillterarr}:{}).populate('category').populate('language');
        console.log("showResponse :",showResponse);


      


        let response = success_function({
            success: true,
            statusCode: 200,
            message: "fetching successfull",
            data: showResponse
        })
        res.status(response.statusCode).send(response);
        return;
    } catch (error) {
        console.log("error", error);
        let response = error_function({
            success: false,
            statusCode: 404,
            message: "failed"
        })
        res.status(response.statusCode).send(response);
        return;
    }
}

exports.get_data = async function (req, res) {
    let id = req.params.id;

    try {
        let singleMovie = await show.findOne({ _id: id }).populate('category').populate('language');

        let response = success_function({
            success: true,
            statusCode: 200,
            message: "fetching successfull",
            data: singleMovie
        })
        res.status(response.statusCode).send(response)
        return;
    } catch (error) {
        console.log("error", error);

        let response = error_function({
            success: false,
            statusCode: 404,
            message: "failed"
        })
        res.status(response.statusCode).send(response);
        return;
    }
}







exports.update_data = async function (req, res) {
    try {
        let body = req.body;
        let id = req.params.id;



        // Initialize img_path
         // Set to the existing image if not updated


         let splittedImg;
        if(body.image){
            let image_path = await show.findOne({_id:id})
            console.log('image_path',image_path)
             splittedImg = image_path.image.split('/')[2] // Extract the file name
             console.log("image_path.image",image_path.image);

           let  img_path = await fileupload(body.image, "movie");
            console.log("img_path", img_path);
             body.image = img_path;
        }
        
        

       

        // Update the document using updateOne
        let updateData = await show.updateOne({ _id: id }, { $set: body }).populate('category').populate('language');

        // If the image was updated, delete the old image
        if(body.image) {
            const imagePath = path.join('./uploads', 'movie', splittedImg);
            fileDelete(imagePath);
        }

        // Create the success response
        let response = success_function({
            success: true,
            statusCode: 200,
            message: "Updation successful",
            data: updateData
        });

        res.status(response.statusCode).send(response);
        return;
    } catch (error) {
        console.log("error", error);

        // Error handling
        let response = error_function({
            success: false,
            statusCode: 500,
            message: "Failed to update data"
        });

        res.status(response.statusCode).send(response);
        return;
    }
};

exports.delete_data = async function (req, res) {
    let id = req.params.id;

    try {
        let delete_Data = await show.deleteOne({ _id: id });

        let response = success_function({
            success: true,
            statusCode: 200,
            message: "deletion successfull",


        })

        res.status(response.statusCode).send(response);
        return;


    } catch (error) {
        console.log("error", error);

        let response = error_function({
            success: false,
            statusCode: 400,
            message: "deletion failed"
        })
        res.status(response.statusCode).send(response);
        return;
    }

}










exports.selectcategory = async function (req, res) {
    try {
        let selectcategory = await category.find();
        console.log("category : ", selectcategory);
        let response = success_function({
            sucess: true,
            statusCode: 200,
            message: "category fetched from collection",
            data: selectcategory
        });
        res.status(response.statusCode).send(response);
        return;
    } catch (error) {
        console.log("error", error);
        let response = error_function({
            success: false,
            statusCode: 400,
            message: "category fetching failed",

        });
        res.status(response.statusCode).send(response);
        return;
    }

}

exports.selectlanguage = async function (req, res) {
    try {
        let selectlanguage = await language.find();

        let response = success_function({
            sucess: true,
            statusCode: 200,
            message: "language fetched from collection",
            data: selectlanguage
        });
        res.status(response.statusCode).send(response);
        return;
    } catch (error) {
        console.log("error", error);
        let response = error_function({
            success: false,
            statusCode: 400,
            message: "language fetching failed",

        });
        res.status(response.statusCode).send(response);
        return;
    }
}