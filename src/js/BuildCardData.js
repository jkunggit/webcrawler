import Util from './Utilities';
import CardData from './CardData';
import { getStatusText } from 'http-status-codes';

/*
 * Builds the card data for the page by looping over the page passed in.
 * 
 */
export default class BuildCardData {

  constructor(pageData) {
    this.pageData = pageData;

    this.pageCrawled = new CardData('pageCrawled', 'PAGES CRAWLED', 'card', 0, []);
    this.internalUrls = new CardData('internalUrls', 'INTERAL URLs', 'card', 0, []);
    this.externalUrls = new CardData('externalUrls', 'EXTERAL URLs', 'card', 0, []);
    this.invalidUrls = new CardData('invalidUrls', 'INVALID URLs', 'card', 0, []);
    this.uniqueImages = new CardData('uniqueImages', 'UNIQUE IMAGES', 'card', 0, []);
    this.avgPageLoad = new CardData('avgPageLoad', 'AVERAGE PAGE LOAD', 'lineGraph', 0, []);
    this.avgWordCount = new CardData('avgWordCount', 'AVERAGE WORD COUNT', 'card2');
    this.avgTitleLen = new CardData('avgTitleLen', 'AVERAGE TITLE LENGTH', 'card2');
    this.pageStatusCodes = new CardData('pageStatusCodes', 'PAGE STATUS CODES', 'pieChart', 0, []);

    this.buildCardData();

  }

  getCard(id) {
    return this[id];
  }

  buildCardData() {

    if (this.pageData.length) {

      for (var index in this.pageData) {
        let item = this.pageData[index];
        //console.log('item:', item)
        let statusLabel = getStatusText(item.http_code);

        // count the number of invalid urls
        if (item.http_code != 200) {
          this.invalidUrls.value++;
          this.invalidUrls.data.push({ url: item.link, status: statusLabel });
        }

        this.avgPageLoad.value += item.total_time;
        this.avgWordCount.value += item.avg_word_len;
        this.avgTitleLen.value += item.title.length;

        this.uniqueImages.data.push(...item.images);
        this.internalUrls.data.push(...item.internal_links);
        this.externalUrls.data.push(...item.external_links);



        this.pageStatusCodes.data.push(item.http_code);

        this.pageCrawled.data.push({ url: item.link, status: statusLabel, loadTime: item.total_time.toFixed(2) + 's', avgWordCount: item.avg_word_len, titleLen: item.title.length });
        this.avgPageLoad.data.push(item.total_time);

      }

      this.pageCrawled.value = this.pageData.length;

      this.internalUrls.data = Util.deduped(this.internalUrls.data);
      this.internalUrls.value = this.internalUrls.data.length;

      this.externalUrls.data = Util.deduped(this.externalUrls.data);
      this.externalUrls.value = this.externalUrls.data.length;

      this.uniqueImages.data = Util.deduped(this.uniqueImages.data);
      this.uniqueImages.value = this.uniqueImages.data.length;

      this.avgPageLoad.value = (this.avgPageLoad.value / this.pageData.length).toFixed(2) + ' seconds';
      this.avgPageLoad.data = Util.sortObjectByKey(Util.roundData(this.avgPageLoad.data));

      this.avgWordCount.value = Math.round(this.avgWordCount.value / this.pageData.length);
      this.avgTitleLen.value = Math.round(this.avgTitleLen.value / this.pageData.length);

      this.pageStatusCodes.data = Util.sortObjectByKey(Util.frequency(this.pageStatusCodes.data));

    }
  }
}