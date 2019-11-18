import React, { Component } from 'react';
import { connect } from 'react-redux';

import InfoCard from '../cards/InfoCard';
import InfoCard2 from '../cards/InfoCard2';
import LineGraphCard from '../cards/LineGraphCard';
import PieGraphCard from '../cards/PieGraphCard';

import modal from '../modals/viewDetails';

class Content extends Component {
  buildInfoCard() {
    let data = {
      infoCards: {
        pageCrawled: { title: 'PAGES CRAWLED', value: 0, data: null },
        internalUrls: { title: 'INTERAL URLs', value: 0, data: null },
        externalUrls: { title: 'EXTERNAL URLs', value: 0, data: null },
        invalidUrls: { title: 'INVALID URLs', value: 0, data: null },
        uniqueImages: { title: 'UNIQUE IMAGES', value: 0, data: null }
      },
      lineGraphCard: { title: "AVERAGE PAGE LOAD", axisLabel: 'seconds', value: 0, data: null },
      infoCards2: {
        avgWordCount: { title: "AVERAGE WORD COUNT", value: 0 },
        avgTitleLen: { title: "AVERAGE TITLE LENGTH", value: 0 }
      },
      pieGraphCard: { title: "PAGE STATUS CODES", axisLabel: 'seconds', value: 0, data: null },
    }
    if (this.props.items.length) {
      let images = [];
      let internalUrls = [];
      let externalUrls = [];
      let pageLoadTime = 0;
      let pageLoadTimeArray = [];
      let avgWordLen = 0;
      let titleLen = 0;
      let statusCodes = []
      let crawledLinks = [];
      for (var key in this.props.items) {
        let item = this.props.items[key];
        //console.log('item:', item)
        // count the number of invalid urls
        if (item.http_code != 200) {
          data.infoCards.invalidUrls.value++;
        }
        //images.push(item.unique_images);
        images.push(...item.unique_images);
        //console.log(...item.unique_images)
        internalUrls.push(...item.unique_internal_links);
        externalUrls.push(...item.unique_external_links);

        pageLoadTime += item.total_time;
        avgWordLen += item.avg_word_len;
        titleLen += item.title.length;
        statusCodes.push(item.http_code);
        crawledLinks.push(item.link);

        pageLoadTimeArray.push(item.total_time.toFixed(2));

      }

      data.infoCards.pageCrawled.value = this.props.items.length;
      data.infoCards.pageCrawled.data = crawledLinks;

      internalUrls = this.deduped(internalUrls);
      data.infoCards.internalUrls.value = internalUrls.length;
      data.infoCards.internalUrls.data = internalUrls;

      externalUrls = this.deduped(externalUrls);
      data.infoCards.externalUrls.value = externalUrls.length;
      data.infoCards.externalUrls.data = externalUrls;

      images = this.deduped(images);
      data.infoCards.uniqueImages.value = images.length;
      data.infoCards.uniqueImages.data = images;

      data.lineGraphCard.value = (pageLoadTime / this.props.items.length).toFixed(2) + ' seconds';
      data.lineGraphCard.data = this.sortObjectByKey(this.frequency(pageLoadTimeArray));

      data.infoCards2.avgWordCount.value = Math.round(avgWordLen / this.props.items.length);
      data.infoCards2.avgTitleLen.value = Math.round(titleLen / this.props.items.length);

      data.pieGraphCard.data = this.sortObjectByKey(this.frequency(statusCodes));

    }
    return data;
  }

  sortObjectByKey(object) {
    return Object.entries(object)
      .sort((a, b) => a[0] - b[0])
      .reduce((a, c) => (a[c[0]] = c[1], a), {})
  }

  flattenArray(array) {
    return array.reduce((acc, e) => acc.concat(e), []);
  }

  // count the occurrences of the array elements
  frequency(array) {
    return array.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
  }

  // remove duplicates from array
  deduped(array) {
    return array.filter(function (element, index) {
      return array.indexOf(element) === index;
    });
  }

  render() {
    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }
    if (this.props.hasErrored) {
      return <p>There was no crawl data found on website</p>;
    }
    if (this.props.items.length) {
      let data = this.buildInfoCard();
      let infoCards = data.infoCards;
      let lineGraphCardData = data.lineGraphCard;
      let infoCards2 = data.infoCards2;
      let pieGraphCardData = data.pieGraphCard;

      console.log(data);
      return (
        <div>
          <div className='infoCardContainer'>
            {Object.keys(infoCards).map((key, index) => (
              <InfoCard data={infoCards[key]} key={index} />
            ))}
          </div>
          <div className='graphCard2Container'>
            <div className='graphCardContainer'>
              <LineGraphCard data={lineGraphCardData} />
            </div>
            <div className='cardInfo2Container'>
              {Object.keys(infoCards2).map((key, index) => (
                <InfoCard2 data={infoCards2[key]} key={index} />
              ))}
              <div>
                <PieGraphCard data={pieGraphCardData} />
              </div>
            </div>
          </div>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading
  };
};

export default connect(mapStateToProps)(Content);