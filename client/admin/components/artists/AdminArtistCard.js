import React, {Component} from 'react';
import {Link} from 'react-router';

export default class AdminArtistCard extends Component {
	render() {
		const artist = this.props.artist;

		const editArtistUrl = '/admin/artist/edit/' + artist._id;

		let imageUrl = artist.imageUrl;

		if (artist.bannerImageId) {
			imageUrl = `/images/${artist.bannerImageId}?size=300x150`;
		}

		return (
			<Link to={editArtistUrl}>
				<div className="artist-card col-xs-6 col-sm-4">
					<img src={imageUrl} className="img-responsive center-block" />
					<p>{this.props.artist.name}</p>
				</div>
			</Link>
		);
	}
}