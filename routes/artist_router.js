const express = require ('express');

const ArtistRouter = express.Router();

const ArtistModel = require ('../models/Artist');

ArtistRouter.post('/addartist', async (req,res)=>{
	try{
		let artist = ArtistModel({
			name: req.body.name,
			description: req.body.description,
			specialty: req.body.specialty
		});

		artist = await artist.save();

		res.send(artist);
	}catch(e){
		console.log(e)
	}
});
	
ArtistRouter.get('/showartists', async (req, res)=> {
	try{
		let artists = await ArtistModel.find();
		res.send(artists)
	}catch(e){
		console.log(e)
	}
});

ArtistRouter.get('/showartistbyid/:id', async(req, res)=>{
	try{
		let artist = await ArtistModel.findById(req.params.id);
		res.send(artist);
	}catch(e){
		console.log(e)
	}
});

// ArtistRouter.put('/updateartist/:id', async (req, res)=> {
// 	let id = {"_id":req.params.id};
// 	let updates = {
// 		"name": req.body.name,
// 		"description": req.body.description,
// 		"specialty": req.body.specialty
// 	}
// 	ArtistModel.findOneAndUpdate(id, updates, {new:true}).then(result=>{
// 		if(!result){
// 			return res.send("No update");
// 		}else{
// 			return res.json({"result": result});
// 		}
// 	});

ArtistRouter.delete('/deleteartist/:id', async(req, res)=>{
	try{
		let deletedArtist = await ArtistModel.findByIdAndDelete(req.params.id);
		res.send(deletedArtist);
	}catch(e){
		console.log(e);
	}
});


module.exports = ArtistRouter;