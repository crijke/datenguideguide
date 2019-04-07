import React from 'react'
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from 'reactstrap'
import classnames from 'classnames'

import { connect } from 'react-redux'
import { actions } from './ducks'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import './styles.scss'

class Results extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      activeTab: '1'
    }
  }


  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render() {
    const { query, json } = this.props
    return (
      <div className="dg-results">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1')
              }}
            >
              GraphQL
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                this.toggle('2')
              }}
            >
              JSON
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent
          className="dg-results__tabcontent"
          activeTab={this.state.activeTab}
        >
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <SyntaxHighlighter style={docco} language="graphql">{query}</SyntaxHighlighter>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <SyntaxHighlighter style={docco} language="json">{json}</SyntaxHighlighter>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state.results,
    initialValues: {}
  }),
  actions
)(Results)
