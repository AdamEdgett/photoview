import React from 'react';
import PropTypes from 'prop-types';
import { difference, union, without, nth, head, isNil, isEmpty } from 'ramda';

const PHOTO_TIMER = 5 * 1000;
const NEW_PHOTO_TIMER = 8 * 1000;
let photoTimer;

class Slideshow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPhotos: props.photos || [],
      currentIndex: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    const newestPhotos = difference((nextProps.photos || []), (this.props.photos || []));
    this.setState({
      newPhotos: union(newestPhotos, this.state.newPhotos),
    });
  }

  render() {
    const { photos } = this.props;
    const { newPhotos, currentIndex } = this.state;

    let photoSrc;
    if (!isNil(newPhotos) && !isEmpty(newPhotos)) {
      photoSrc = head(newPhotos);
      if (!photoTimer) photoTimer = setTimeout(() => {
        photoTimer = null;
        this.setState({ newPhotos: without([photoSrc], newPhotos )})
      }, NEW_PHOTO_TIMER)
    }
    else if (photos) {
      photoSrc = nth(currentIndex, photos);
      if (!photoTimer) photoTimer = setTimeout(() => {
        photoTimer = null;
        let newIndex = this.state.currentIndex + 1;
        if (newIndex > photos.length - 1) newIndex = 0;
        this.setState({
          currentIndex: newIndex,
        })
      }, PHOTO_TIMER);
    }

    let image;
    if (photoSrc) {
      image = <img className='photo' src={`/static/images/${photoSrc}`} />;
    }

    return (
      <div className='slideshow'>
        {image}
      </div>
    );
  }
}

Slideshow.propTypes = {
  photos: PropTypes.array,
};

export default Slideshow;
