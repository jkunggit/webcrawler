import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import { Alert } from 'react-bootstrap';

import BuildCardData from '../../js/BuildCardData';
import InfoCard from '../cards/InfoCard';
import InfoCard2 from '../cards/InfoCard2';
import LineGraphCard from '../cards/LineGraphCard';
import PieGraphCard from '../cards/PieGraphCard';
import RootModal from '../modals/RootModal';

Alert

class Content extends Component {

  render() {

    if (this.props.isLoading) {
      return (
        <LoadingOverlay
          active={true}
          spinner
          text='Loading your content...'
          className="waitLoader"
        >
        </LoadingOverlay>
      );
    }
    if (this.props.hasErrored) {
      return (
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          The url provided is invalid.
        </Alert>
      );
    }
    if (this.props.items.length) {
      let cardsData = new BuildCardData(this.props.items);
      return (
        <div>
          <div className='infoCardContainer'>
            <InfoCard data={cardsData.getCard('pageCrawled')} />
            <InfoCard data={cardsData.getCard('internalUrls')} />
            <InfoCard data={cardsData.getCard('externalUrls')} />
            <InfoCard data={cardsData.getCard('invalidUrls')} />
            <InfoCard data={cardsData.getCard('uniqueImages')} />
          </div>
          <div className='graphCard2Container'>
            <div className='graphCardContainer'>
              <LineGraphCard data={cardsData.getCard('avgPageLoad')} />
            </div>
            <div className='cardInfo2Container'>
              <InfoCard2 data={cardsData.getCard('avgWordCount')} />
              <InfoCard2 data={cardsData.getCard('avgTitleLen')} />
              <div>
                <PieGraphCard data={cardsData.getCard('pageStatusCodes')} />
              </div>
            </div>
          </div>
          <RootModal />
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  console.log('content map to state:', state)
  return {
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading,
    showModal: state.show
  };
};

export default connect(mapStateToProps)(Content);