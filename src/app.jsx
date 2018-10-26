import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';

import Slideshow from 'slideshow.jsx';

class App extends React.Component {
  render() {
    const { photos } = this.props;
    if (window.location.hash === '#slideshow') {
      return <Slideshow photos={photos} />;
    }

    const renderedImages = map(photo =>
        <a href={`/static/images/${photo}`} target='_blank' key={photo}>
            <img src={`/static/images/${photo}`} key={photo} className='photo' />
        </a>
    , photos || []);

    return (
      <div className='gallery'>
        {renderedImages}
      </div>
    );
  }
}

App.propTypes = {
  photos: PropTypes.array,
};

export default App;
