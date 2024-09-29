let show = require('../db/model/model');
const { success_function, error_function } = require('../util/response-Handler');
const fileupload = require('../util/file-upload').fileUpload
const category = require('../db/model/category');
const language = require('../db/model/language')

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
        let showResponse = await show.find().populate('category').populate('language')

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

        let image = body.image;

        const regexp = /^data:/;
        const result = regexp.test(image)

        if (result === true) {
            let img_path = await fileupload(image, "movie");
            console.log("img_path", img_path);
            body.image = img_path
        }

        // Use the updateOne method to update the document by its _id
        let updateData = await show.updateOne({ _id: id }, { $set: body }).populate('category').populate('language');

        // Create the success response, no need to stringify the updateData object
        let response = success_function({
            success: true,
            statusCode: 200,
            message: "Updation successful",
            data: updateData // directly pass the updateData object
        });

        res.status(response.statusCode).send(response);
        return;
    } catch (error) {
        console.log("error", error);

        // Error handling
        let response = error_function({
            success: false,
            statusCode: 500, // Use 500 for server error, 404 is for "not found"
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

exports.filter_data = async function (req, res) {

    let query = req.query;
    console.log("query", query)





    if (query.language && query.category) {
        // Handle both language and category filters
        try {
            let category_field = await category.findOne({ category: query.category });
            console.log("category_field from both", category_field);

            let language_field = await language.findOne({ language: query.language });
            console.log("language_field from both", language_field);

            let category_id = category_field._id;
            let language_id = language_field._id;

            let ids_match = await show.find({
                category: category_id,
                language: language_id
            }).populate('language').populate('category');

            console.log('ids_match', ids_match);

            let response = success_function({
                success: true,
                statusCode: 200,
                message: "successfully filtered by both language and category",
                data: ids_match
            });

            res.status(response.statusCode).send(response);
            return;

        } catch (error) {
            console.log("error while filtering", error);

            let response = error_function({
                success: false,
                statusCode: 400,
                message: "failed"
            });

            res.status(response.statusCode).send(response);
            return;
        }

    } else if (query.category) {
        // Handle category filter
        try {
            let category_field = await category.findOne({ category: query.category });
            console.log("category_field", category_field);

            let id = category_field._id;

            let idmatch = await show.find({ category: id }).populate('category');
            console.log('idmatch', idmatch);

            let response = success_function({
                success: true,
                statusCode: 200,
                message: "successful category",
                data: idmatch
            });

            res.status(response.statusCode).send(response);
            return;

        } catch (error) {
            let response = error_function({
                success: false,
                statusCode: 400,
                message: "failed"
            });
            res.status(response.statusCode).send(response);
            return;
        }

    } else if (query.language) {
        // Handle language filter
        try {
            let language_field = await language.findOne({ language: query.language });
            console.log("language field._id", language_field._id);

            let id = language_field._id;

            let language_idmatch = await show.find({ language: id }).populate('language');
            console.log("language id match", language_idmatch);

            let response = success_function({
                success: true,
                statusCode: 200,
                message: "successful language",
                data: language_idmatch
            });

            res.status(response.statusCode).send(response);
            return;

        } catch (error) {
            console.log("error", error);

            let response = error_function({
                success: false,
                statusCode: 400,
                message: "failed"
            });

            res.status(response.statusCode).send(response);
            return;
        }
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