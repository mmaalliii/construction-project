
const requestDal = require("../dal/request-memory-accessor");
const Request = require("../models/request");
const sendEmail=require('../email')
const initiatorDal=require("../dal/initiator-memory-accessor");

class RequestController{
    addrequest = async(req,res)=>{

      const {userId,name,email,phone,addressProject,comments,initiatorsArr}=req.body;
        const date=new Date();
        const request= await requestDal.addRequestDetails({userId,name,email,phone,addressProject,comments,date});
        initiatorsArr=JSON.parse(initiatorsArr);
        const requestId=request.toJSON().requestId;
        const initiatorObjectsArr=initiatorsArr.map(initiator=> {return {'initiatorId':initiator, 'requestId':requestId}});
         const requestInitiators=await requestDal.addInitiatorsOfrequest(initiatorObjectsArr)
        sendEmailToInitiators(requestId,initiatorsArr,name,email,phone,addressProject,comments);
        res.send(requestInitiators); 
      }


    }



        //what do we have to return? , do we need promise.all 

var sendEmailToInitiators=async(requestId,initiatorsArr,name,email,phone,addressProject,comments)=>{
    
     //var initiatorsEmails=initiatorsArr.map(async(initiator)=> {return await initiatorDal.getInitiatorEmailById(initiator)})
     var initiatorsEmails = await initiatorDal.getInitiatorsEmailById(initiatorsArr);
     initiatorsEmails=initiatorsEmails.conditions.map(initiator=>initiator.toJSON().email)
     sendEmail(requestId,initiatorsEmails,name,email,phone,addressProject,comments);

}
const requestController = new RequestController();
module.exports = requestController;





