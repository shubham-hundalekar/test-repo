// const express = require("express")
// const app = express()

// function calculateSum(n){
//     let ans = 0;
//     for(let i=0;i<=n;i++){
//         ans=ans+i;
//     }
//     return ans;
// }

// app.get("/", (req,res)=>{
//     const n = req.query.n;
//     const ans = calculateSum(n);
//     res.send("Hi your ans is : "+ans);
// });

// app.listen(3001)

// ---------------------------------------------------
//Implementation of methods 

const express = require("express")
const app = express()
app.use(express.json())
const user  = [{
    name:"John",
    kidneys: [{
        healthy:false
    }]
    
}]

app.get("/",(req,res)=>{
    let johnsKidneys = user[0].kidneys
    console.log(johnsKidneys)
    let totalKidneys = johnsKidneys.length
    let numberofHealtyKidneys = 0
    for(let i=0;i<johnsKidneys.length;i++){
        if(johnsKidneys[i].healthy){
            numberofHealtyKidneys+=1;
        }
    }
    let numberofUnHealtyKidneys = totalKidneys -  numberofHealtyKidneys

    res.json({
        totalKidneys,
        numberofHealtyKidneys,
        numberofUnHealtyKidneys
    })

})

app.post("/",(req,res)=>{

    const isHealthy = req.body.isHealthy;
    user[0].kidneys.push({
        healthy:isHealthy
    })
    res.json({
        msg : "done"
     })
})

app.put("/",(req,res)=>{
    for(let i=0;i<user[0].kidneys.length;i++){
        user[0].kidneys[i].healthy = true;
    }
    res.json({})
})

function isThereAtLeastOneUnhealthy(){
    let atleatOneUnhealthyKidney = false
    
    for(let i = 0;i<user[0].kidneys.length;i++){
        if(!user[0].kidneys[i].healthy){
            atleatOneUnhealthyKidney = true
               
        }
    }
    return atleatOneUnhealthyKidney;
}

app.delete("/", (req,res)=>{
    if(isThereAtLeastOneUnhealthy()){
        const newKidneys = []
        for(let i = 0;i<user[0].kidneys.length;i++){
            if(user[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy:true
                })
            }
        }
        user[0].kidneys = newKidneys;
        res.json({
            msg:"Done!"
        })
    }
    else
    {
        res.status(411).json({
            msg:"You have no bad kidneys"
        })
    }


})

app.listen(3000);
console.log("new line added")