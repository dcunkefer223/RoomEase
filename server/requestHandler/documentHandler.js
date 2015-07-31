var documentModel = require('../model/documentModel.js');
var responseHandler = require('./responseHandler.js')
//var userModel = require('../model/userModel.js')

module.exports = {
  getAllDocs : function(req, res){
    // Called by the GET '/tasks' endpoint
    // Gets all tasks based of current users dwelling_id
    var dwelling_id = req.user.dwelling_id;
    console.log('inside the documents getALL DOCS handler');
    documentModel.getDocsDwelling(dwelling_id, function(err, results){
      responseHandler(err, results, res);
    });
  },
    
  getAllDocsUser : function(req, res){
    var user_id = req.user_id;
    console.log('inside the documents get USER DOCS handler');
    documentModel.getDocsUsers(user_id, function(err, results){
      responseHandler(err, results, res);
    });
  },
  deleteDoc: function(req,res){
    var document_id = req.id;
    console.log('inside delete documents');
    documentModel.deleteDoc(document_id, function(err, results){
      responseHandler(err,results,res)
    });
  }, //end of deleteDocs:
  show: function (req,res){
    var document_id = req.id;
    documentModel.showDoc(documents, function(err, results){
      responseHandler(err,results,res)
    });
  },
  upload: function(req, res){
    //console.log(req.file.originalname)
    var documents = {
      file_name : req.file.originalname,
      dwelling_id : req.user.dwelling_id,
      user_id : req.user.id,
      filesize : 99,
      type : req.file.mimetype,
    };
    console.log(documents);
    documentModel.add(documents, function(err, results){
      responseHandler(err, results, res);
    })

    //res.json(req.file)
  }
}//end of module.exports