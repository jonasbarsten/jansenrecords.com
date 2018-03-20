import React, {Component} from 'react';

export default class ArtistCard extends Component {
	render() {

		const artist = this.props.artist;
		let imageUrl = artist.imageUrl;

		if (artist.bannerImageId) {
			imageUrl = `/images/${artist.bannerImageId}?size=300x150`;
		}

		return (
			<div className="artist-card col-xs-6 col-sm-4 hover" onClick={this.props.onClick}>
				<img src={imageUrl} className="img-responsive" />
				<span>{this.props.artist.name}</span>
			</div>
		);
	}
}