const db = require('../models/index');
const { Op } = require("sequelize");
const { json } = require('sequelize');
const {sequelize} = require('../models/sequelize');

const Initiator = db.initiator
const User = db.user
const Opinion=db.opinion
const Project=db.project

class InitiatorDataAccessor {
    getAllInitiators = async ()=>{
      const initiators=await Initiator.findAll({      
        group: ['Initiator.id'] ,
        include:
        [
        {model:Opinion,as:"opinion_initiator",attributes:[]},
        {model:Project,as:"initiatorProject",required: false,attributes:[]},
        {model:User,as:'initiator_user',attributes:[]},

],
      attributes:['id','hp','phone', 'address','tama38','pinuyBinuy','description','logo','company_name',
      [sequelize.col('initiator_user.name'), 'name']
      ,[sequelize.fn('COUNT',sequelize.col('initiatorProject.idProject')),'numOfProject']
      ,[sequelize.fn('AVG',sequelize.col('opinion_initiator.stars')),'rating']]
,order:['name']
      })
      return initiators;
    };

    

    getInitiatorById = async (id)=>{
      const initiator=await Initiator.findOne({
        where:{
          id:id        
        }
      })
      return initiator;
    }

    getInitiatorsEmailById = async (idArr)=>{
      console.log({idArr});
      const res= await User.findAll({
        attributes:['userName'],
        where:{
          id: {
            [Op.or]: idArr
          }          
        }
      })
      console.log(`kk`,json(res));
      return json(res);
    }

    search = async(pinuiBinuy,tama38)=>{
      const initiators=await Initiator.findAll({
        where:{
          [Op.or]:{pinuiBinuy:pinuiBinuy, tama38:tama38}
        }

      })
      return initiators;
    }



    addInitiator=async(initiatorData)=>{
      const initiator=Initiator.create(initiatorData);
      return initiator;
    }

    deleteInitiator=async(initiatorId)=>{
      await Initiator.destroy({
        where:{
          id:initiatorId
        }
      })
    }


    updateInitiator=async(initiatorId,initiatorData)=>{
      const initiator=await Initiator.update(initiatorData,{
        where:{id:initiatorId}})
        return initiator;
    };

    }

  const initiatorDataAccessor=new InitiatorDataAccessor(); 
  module.exports=initiatorDataAccessor;

  









  

      // await PostModel.findAll({
    //   group: ['posts.id'],
    //   order: [['createdAt', 'DESC']],
    //   include: [
    //     {
    //       model: CategoryModel,
    //       attributes: ['title'],
    //       where: { title: categoryTitle }
    //     },
    //     { model: CommentModel },
    //     { model: UserModel, attributes: ['fullname', 'id'] }
    //   ],
    //   attributes: [
    //     'title', 'content', 'description', 'thumbnail', 'baner', 'createdAt', 'updatedAt',
    //     [Sequelize.fn('COUNT', 'comment.id'), 'commentsCounter']
    //   ]
    // });
    //,group:'opinionInitiator'
//,attributes:[[db.sequelize.fn("AVG",db.sequelize.col("stars")),'avg']],raw: true

  //   attributes:['opinionInitiator',[db.sequelize.fn("AVG",db.sequelize.col("stars")),'avg']],
  //   

  // })
