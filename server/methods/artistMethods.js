Meteor.methods({
	'addArtist': function (artist) {

		var artistExists = Artists.findOne({'nameLower': artist.name.toLowerCase()});

		if (artistExists) {
			return 'exists'
		} else {
			let newArtist = Artists.insert(artist);
			return newArtist;
		}

	},
	'deleteArtist': function (artistId) {

		// Delete files associated with artist from s3
		var artist = Artists.findOne({_id: artistId});

		if (artist.localImageId) {
			UserFiles.remove({_id: artist.localImageId});
		}

		// Delete artist
		Artists.remove({_id: artistId});
	},
	'changeArtistName': function (artistId, newName) {
		Artists.update({_id: artistId}, {$set: {name: newName}});
	},
	'changeArtistImage': function (file) {

		check(file, Object);
		const artistId = file.associatedId;

		// Get old image id
		var artist = Artists.findOne({_id: artistId});

		if (artist.bannerImageId) {
			Meteor.call('file.toTrash', artist.bannerImageId, 'image', (err, res) => {
				if (err) {
					console.log(err);
				}
			});
		};

		Meteor.call('file.add', file, 'image', (err, res) => {
			if (err) {
				console.log(err);
			} else {
				Artists.update({_id: artistId}, {$set: {bannerImageId: res.localId}});
				// Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.image.awsKey': res.awsKey, 'profile.image.localId': res.localId}});
			}
		});

		// // Update to new image
		// var link = UserFiles.findOne({_id: imageId}).link();

		// Artists.update({_id: artistId}, {$set: {
		// 	localImageId: imageId,
		// 	lastChanged: new Date()
		// }});

		// // Remove old image
		// if (oldId) {
		// 	UserFiles.remove({_id: oldId});
		// }
		
	},
	'updateArtist': function (artistId, field, content) {

		var setObject = {}

		setObject[field] = content;

		Artists.update(
			{_id: artistId},
			{
				$set: setObject
			}
		);
	},
	'addLinkToArtist': function (link, artistId) {

		// Schema validation done by simple schema

		Artists.update({_id: artistId}, {$push: {links: link}});
	},
	'removeLinkFromArtist': function (link, artistId) {

		// Schema validation done by simple schema

		Artists.update({_id: artistId}, {$pull: {links: {id: link.id}}});
	},
	'reorderArtistLinks': function (artistId, link, index) {

		Artists.update(
			{_id: artistId, 'links.id': link.id}, 
			{$set: {'links.$.sortIndex': index}}
		);
	},
	'updateSongkickId': function (artistId, songkickId) {
		Artists.update({_id: artistId}, {$set: {songkickId: songkickId}});
	},
	'artistView': function (id) {
		Artists.update({_id: id}, {$inc: {views: 1}});
	},
	'artistApiView': function (id) {
		Artists.update({_id: id}, {$inc: {apiViews: 1}});
	}
})