const { MongoAPIError } = require("mongodb");
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// create and save a new contact
exports.create = async (req, res , next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

// exports.create = (req, res) => {
//     res.send({ message: "create handler" });
// };

exports.findALL = async(req, res, next) => {
    let documents = [];

    try{
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if(name){
            documents = await contactService.findByName(name);
        }else{
            documents = await contactService.find({});
        }
    } catch(error){
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
    return res.send(documents);

};
 
//  exports.findALL = (req, res) => {
//     res.send({ message: "findAll handler" });
// };
 
exports.findOne = async(req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch(error){
        return next(
            new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
        );
    }
};

// exports.findOne = (req, res) => {
//     res.send({ message: "findOne handler" });
// };

exports.update = async(req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was updated successfully"});
    }catch(error){
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

// exports.update = (req, res) => {
//     res.send({ message: "update handler" }); 
// }; 

exports.delete = async(req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was deleted successfully"});
    } catch(error){
        return next(
            new ApiError(500, `Could not delete contact with id=${req.params.id}`)
        );
    }
};

// exports.delete = (req, res) => { 
//     res.send({ message: "delete handler" }); 
// }; 

exports.deleteALL = async(_req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.deleteALL();
        return res.send({message: `${deletedCount} contacts were deleted successfully`,});
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
};

// exports.deleteALL = (req, res) => {
//     res.send({ message: "deleteAll handler" }); 
// }; 

exports.findALLFavorite = async(_req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findFavorite();
        return res.send(document);
    } catch(error){
        return next(
            new ApiError(500, "An error while retrieving favorite contacts")
        );
    }
};

// exports.findALLFavorite = (req, res) => {
//     res.send({ message: "findAllFavorite handler" }); 
// };