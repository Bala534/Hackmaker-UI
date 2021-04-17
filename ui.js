var express=require("express");
var app=express();
var sess = require('sess')
const methodOverride = require("method-override");
app.use(express.static("capstonestatic"));
var bodyParser=require("body-parser");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(methodOverride("_method"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/login.html");
})

app.get("/login",function(req,res){
    var mongojs=require("mongojs");
    var cs="mongodb+srv://mahesh:mahesh@cluster0.qe4fh.mongodb.net/Tie?retryWrites=true&w=majority"
    var db=mongojs(cs,["login"])
    var d={
        mail:req.query.signupemail,
        password:req.query.signuppswd,
    }
    db.login.find(d,function(err,docs){
        if(docs.length==0){
            res.sendFile(__dirname+"/login1.html");
        }
        else{
            res.sendFile(__dirname+"/ui.html");
        }   
    })
})

app.get("/salaryissue",function(req,res){
    var mongojs=require("mongojs");
    var cs="mongodb+srv://mahesh:mahesh@cluster0.qe4fh.mongodb.net/Tie?retryWrites=true&w=majority"
    var db=mongojs(cs,["salaryissue"])
    var d = {};
    db.salaryissue.find(d,function(err,docs){
        if(docs.length==0){
            res.send("please check your username and password");
        }
        else{
            res.render("salaryissue",{data:docs});
        }
    })

})

app.get("/harassmentissue",function(req,res){
    var mongojs=require("mongojs");
    var cs="mongodb+srv://mahesh:mahesh@cluster0.qe4fh.mongodb.net/Tie?retryWrites=true&w=majority"
    var db=mongojs(cs,["harassment"])
    var d = {};
    db.harassment.find(d,function(err,docs){
        if(docs.length==0){
            res.send("please check your username and password");
        }
        else{
            res.render("harassment",{data:docs});
        }
    })

})

app.get("/resignationissue",function(req,res){
    var mongojs=require("mongojs");
    var cs="mongodb+srv://mahesh:mahesh@cluster0.qe4fh.mongodb.net/Tie?retryWrites=true&w=majority"
    var db=mongojs(cs,["resignation"])
    var d = {};
    db.resignation.find(d,function(err,docs){
        if(docs.length==0){
            res.send("please check your username and password");
        }
        else{
            res.render("resignation",{data:docs});
        }
    })

})

app.get("/reimbursment",function(req,res){
    var mongojs=require("mongojs");
    var cs="mongodb+srv://mahesh:mahesh@cluster0.qe4fh.mongodb.net/Tie?retryWrites=true&w=majority"
    var db=mongojs(cs,["reimbursment"])
    var d = {};
    db.reimbursment.find(d,function(err,docs){
        if(docs.length==0){
            res.send("please check your username and password");
        }
        else{
            res.render("reimbursment",{data:docs});
        }
    })

})

app.get("/deleteissue/:msg",function(req,res){
	var mongojs=require("mongojs");
	var cs="mongodb+srv://mahesh:mahesh@cluster0.qe4fh.mongodb.net/Tie?retryWrites=true&w=majority"
	var db=mongojs(cs,["salaryissue"]);
	var msg = req.params.msg;
	var d = {
		ID:sess.ID,
		msg:msg
	}
	db.salaryissue.remove(d,function(req,res){
	})
	db.salaryissue.find({},function(err,docs){
			res.render("salaryissue",{data:docs})
	})
})

app.get("/deletecase/:case",function(req,res){
	var mongojs=require("mongojs");
	var cs="mongodb+srv://mahesh:mahesh@cluster0.qe4fh.mongodb.net/Tie?retryWrites=true&w=majority"
	var db=mongojs(cs,["harassment"]);
	var act = req.params.case;
	var d = {
		ID:sess.ID,
		case:act
	}
	db.harassment.remove(d,function(req,res){
	})
	db.harassment.find({},function(err,docs){
			res.render("harassment",{data:docs})
	})
})

app.get("/resignpurpose/:purpose",function(req,res){
	var mongojs=require("mongojs");
	var cs="mongodb+srv://mahesh:mahesh@cluster0.qe4fh.mongodb.net/Tie?retryWrites=true&w=majority"
	var db=mongojs(cs,["resignation"]);
	var purpose = req.params.purpose;
	var d = {
		ID:sess.ID,
		purpose:purpose
	}
	db.resignation.remove(d,function(req,res){
	})
	db.resignation.find({},function(err,docs){
			res.render("resignation",{data:docs})
	})
})

app.listen(process.env.PORT || 3000, function(){
    console.log('Your node js server is running');
});