import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

let whiteList = Meteor.settings.private.apiWhitelist;

function getArtistById (req, res, next) {
	const origin = req.headers.origin;
	const allow = (whiteList.indexOf(origin) != -1) ? true : false;

	if (allow) {
		let artist = Artists.findOne({_id: req.params.id});
		if (artist) {
			artist = JSON.stringify(artist);
			res.writeHead(200, {'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET'});
			res.end(artist);
		} else {
			res.writeHead(404, {'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET'});
			res.end();
		}
	} else {
		res.writeHead(403);
		res.end();
	}
}

function getArtistByName (req, res, next) {
	const origin = req.headers.origin;
	const allow = (whiteList.indexOf(origin) != -1) ? true : false;

	if (allow) {
		let artist = Artists.findOne({name: req.params.name});
		if (artist) {
			artist = JSON.stringify(artist);
			res.writeHead(200, {'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET'});
			res.end(artist);
		} else {
			res.writeHead(404, {'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET'});
			res.end();
		}
	} else {
		res.writeHead(403);
		res.end();
	}
}

function getReleasesByArtistId (req, res, next) {
	const origin = req.headers.origin;
	const allow = (whiteList.indexOf(origin) != -1) ? true : false;

	if (allow) {
		let releases = Releases.find({artists: {$in: [req.params.id]}}).fetch();
		if (releases) {
			releases = JSON.stringify(releases);
			res.writeHead(200, {'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET'});
			res.end(releases);
		} else {
			res.writeHead(404, {'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET'});
			res.end();
		}
	} else {
		res.writeHead(403);
		res.end();
	}
}

function listArtists (req, res, next) {
	const origin = req.headers.origin;
	const allow = (whiteList.indexOf(origin) != -1) ? true : false;

	if (allow) {

		let artists = Artists.find({}, {fields: {_id: 1, name: 1}}).fetch();

		if (artists) {
			artists = JSON.stringify(artists);
			res.writeHead(200, {'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET'});
			res.end(artists);
		} else {
			res.writeHead(404, {'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET'});
			res.end();
		}
	} else {
		res.writeHead(403);
		res.end();
	}
}

function listReleases (req, res, next) {
	const origin = req.headers.origin;
	const allow = (whiteList.indexOf(origin) != -1) ? true : false;

	if (allow) {
		let releases = Releases.find({}, {fields: {_id: 1, name: 1}}).fetch();
		if (releases) {
			releases = JSON.stringify(releases);
			res.writeHead(200, {'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET'});
			res.end(releases);
		} else {
			res.writeHead(404, {'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET'});
			res.end();
		}	
	} else {
		res.writeHead(403);
		res.end();
	}
}

function listTracks (req, res, next) {
	const origin = req.headers.origin;
	const allow = (whiteList.indexOf(origin) != -1) ? true : false;

	if (allow) {
		let tracks = Tracks.find({}, {fields: {_id: 1, name: 1}}).fetch();
		if (tracks) {
			tracks = JSON.stringify(tracks);
			res.writeHead(200, {'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET'});
			res.end(tracks);
		} else {
			res.writeHead(404, {'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET'});
			res.end();
		}	
	} else {
		res.writeHead(403);
		res.end();
	}
}

const middleware = ConnectRoute( function(router) {
	router.get('/api/artistById/:id', getArtistById);
	router.get('/api/artistByName/:name', getArtistByName);
	router.get('/api/releasesByArtistId/:id', getReleasesByArtistId);
	router.get('/api/artists', listArtists);
	router.get('/api/releases', listReleases);
	router.get('/api/tracks', listTracks);
});

WebApp.connectHandlers.use(middleware);