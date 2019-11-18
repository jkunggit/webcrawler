import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';

import { itemsFetchData } from '../../actions/';
import { DEFAULT_URL } from '../../constants'; // we need to get our api url

class Header extends Component {

  constructor() {
    super();
    this.crawlUrlRef = React.createRef();
    this.crawlBtnRef = React.createRef();

    this.defaultUrl = DEFAULT_URL;

  }

  // auto click the default url
  componentDidMount() {
    this.crawlBtnRef.current.click();
  }

  handleClick() {
    if (this.isValidURL(this.crawlUrlRef.current.value)) {
      console.log('valid')
      this.props.fetchData(this.crawlUrlRef.current.value);
    }
    else {
      console.log('invalid url')
    }
  }

  // TODO: Perhaps use a npm library to do the validation
  isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };

  render() {
    return (
      <div className='headerBar'>
        <Navbar bg="dark" variant="dark" >
          <Navbar.Brand href="#home">Web Crawler 1.0</Navbar.Brand>
          <Nav className="mr-auto"></Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Enter Your Website"
              ref={this.crawlUrlRef}
              defaultValue={this.defaultUrl}
              className="mr-sm-2"
            />
            <Button
              variant="outline-info"
              onClick={this.handleClick.bind(this)}
              ref={this.crawlBtnRef}
            >
              Crawl
          </Button>
          </Form>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log(dispatch)
  return {
    fetchData: (url) => dispatch(itemsFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
