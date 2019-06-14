import React from 'react'
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap'
import classnames from 'classnames'

import { connect } from 'react-redux'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { actions } from './ducks'

import './styles.scss'

const CSV_BASE = 'https://api-next.datengui.de/csv'

const csvUrl = (region, statistics, narrow = false) =>
  `${CSV_BASE}?region=${region}&statistics=${statistics}&narrow=${narrow}`

const CsvLink = ({ region, valueattribute }) => {
  return (
    <li>
      <a href={csvUrl(region.value, valueattribute.value)}>
        {valueattribute.value} – CSV, long format
      </a>
      <br />
      <a href={csvUrl(region.value, valueattribute.value, true)}>
        {valueattribute.value} – CSV, wide format (experimental)
      </a>
    </li>
  )
}

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
    const { query, json, csvList } = this.props
    const { activeTab } = this.state

    console.log(this.props)

    return (
      <div className="dg-results">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                this.toggle('1')
              }}
            >
              JSON
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => {
                this.toggle('2')
              }}
            >
              GraphQL
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => {
                this.toggle('3')
              }}
            >
              CSV
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="dg-results__tabcontent" activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <SyntaxHighlighter style={docco} language="json">
                  {json}
                </SyntaxHighlighter>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <SyntaxHighlighter style={docco} language="graphql">
                  {query}
                </SyntaxHighlighter>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                {csvList.region && (
                  <ul>
                    {csvList.valueattributes.map(valueattribute =>
                      CsvLink({
                        region: csvList.region,
                        valueattribute
                      })
                    )}
                  </ul>
                )}
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
