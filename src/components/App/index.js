import React from 'react'
import Navbar from '../Navbar'
import {Row, Col, Container, Button} from 'reactstrap'

import './styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import RegionSelector from '../../containers/RegionSelector'
import DataSelector from '../../containers/DataSelector'
import Results from '../../containers/Results'

const App = () => (
  <div className="dg-app">
    <Navbar />
    <Container fluid  className="dg-app__container">
    <Row>
      <Col md={6}>
        <RegionSelector />
        <DataSelector />
      </Col>
      <Col md={6}>
        <Results/>
      </Col>
    </Row>
    </Container>
  </div>
)

export default App
