const mongoose=require("mongoose")


const firmSchema=new mongoose.Schema({
    firmname:{
        type:String,
        require:true,
        unique:true,
         
    },
    area:{
        type:String,
        require:true,
    },
       category:{
        type:[
            {
                type:String,
                enum:['veg','non-veg']
            }
        ]
       
    },

    region:{
        type:[
            {
                type:String,
                enum:['south-indian','north-indian','chinese','bakery']
            }
        ]
       
    },
    offer:{
        type:String
    },
    image:{
        type:String
    },

    vendor:[
       {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vendor'
       }
    ],
    product:[{
        type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
    }]

})

module.exports=mongoose.model("Firm",firmSchema)