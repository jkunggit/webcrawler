import React from 'react';
import { Modal } from 'react-bootstrap';
var ReactBsTable = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

const TableModal = (props) => {
  const options = {
    sortIndicator: false  // disable sort indicator
  };

  function pageCrawledTable() {
    return (
      <BootstrapTable data={props.dataArray} options={options}>
        <TableHeaderColumn dataField='url' isKey dataSort width={'60%'}>Crawl Page Link</TableHeaderColumn>
        <TableHeaderColumn dataField='status' dataSort width={'10%'}>Page Status</TableHeaderColumn>
        <TableHeaderColumn dataField='loadTime' dataSort width={'10%'}>Load Time</TableHeaderColumn>
        <TableHeaderColumn dataField='avgWordCount' dataSort width={'10%'}>Average Word Count</TableHeaderColumn>
        <TableHeaderColumn dataField='titleLen' dataSort width={'10%'}>Title Length</TableHeaderColumn>
      </BootstrapTable>
    );
  }

  function invalidUrlsTable() {
    return (
      <BootstrapTable data={props.dataArray} options={options}>
        <TableHeaderColumn dataField='url' isKey dataSort width={'80%'}>Invalid Link</TableHeaderColumn>
        <TableHeaderColumn dataField='status' dataSort width={'20%'}>Status</TableHeaderColumn>
      </BootstrapTable>
    );
  }

  function showUrls() {
    // the data is in an array. We need to format it as an array of objects
    const data = props.dataArray.map((item, index) => {
      return { index: index, url: item }
    });
    return (
      <BootstrapTable data={data}>
        <TableHeaderColumn dataField='index' isKey dataSort width={'5%'} >#</TableHeaderColumn>
        <TableHeaderColumn dataField='url' dataSort width={'95%'} >Link</TableHeaderColumn>
      </BootstrapTable>
    );
  }


  function getTable() {
    switch (props.id) {
      case 'pageCrawled':
        return pageCrawledTable();
      case 'invalidUrls':
        return invalidUrlsTable();
      case 'internalUrls':
      case 'externalUrls':
      case 'uniqueImages':
        return showUrls();
      default:
        return null;
    }
  }

  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.headerTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {getTable()}
      </Modal.Body>
    </React.Fragment>
  );
}

export default TableModal;