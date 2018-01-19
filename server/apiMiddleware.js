import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

const whiteList = Meteor.settings.private.apiWhitelist;

function getArtist (req, res, next) {
	let artist = Artists.findOne({_id: req.params.id});
	if (artist) {
		artist = JSON.stringify(artist);
		res.writeHead(200, {'Access-Control-Allow-Origin': whiteList, 'Access-Control-Allow-Methods': 'GET'});
		res.end(artist);
	} else {
		next();
	}
}

function listArtists (req, res, next) {
	let artists = Artists.find({}, {fields: {_id: 1, name: 1}}).fetch();
	if (artists) {
		artists = JSON.stringify(artists);
		res.writeHead(200, {'Access-Control-Allow-Origin': whiteList, 'Access-Control-Allow-Methods': 'GET'});
		res.end(artists);
	} else {
		next();
	}
}

function listReleases (req, res, next) {
	let releases = Releases.find({}, {fields: {_id: 1, name: 1}}).fetch();
	if (releases) {
		releases = JSON.stringify(releases);
		res.writeHead(200, {'Access-Control-Allow-Origin': whiteList, 'Access-Control-Allow-Methods': 'GET'});
		res.end(releases);
	} else {
		next();
	}
}

const middleware = ConnectRoute( function(router) {
	router.get('/api/artist/:id', getArtist);
	router.get('/api/artists', listArtists);
	router.get('/api/releases', listReleases);
});

WebApp.connectHandlers.use(middleware);