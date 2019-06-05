import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AsyncSelect from 'react-select/async'
import { change, Field, reduxForm } from 'redux-form'

import { Card, FormGroup, Label } from 'reactstrap'

import { actions } from './ducks'
import { getRegions } from '../../lib/schema'

import './styles.scss'

const RegionSelector = ({ importData }) => (
  <Card className="dg-regionselector">
    <h5>1. Select Region</h5>
    <FormGroup>
      <Label for="region">Region</Label>
      <Field
        name="region"
        type="text"
        component={({ input }) => (
          <AsyncSelect
            isSearchable
            loadOptions={(inputValue, callback) => {
              callback(getRegions(inputValue))
            }}
            {...input}
            onBlur={event => event.preventDefault()}
            onChange={input.onChange}
          />
        )}
        id="region"
      />
    </FormGroup>
  </Card>
)

RegionSelector.propTypes = {
  importData: PropTypes.func.isRequired
}

RegionSelector.defaultProps = {}

export default connect(
  state => ({
    ...state.dataselector,
    initialValues: {}
  }),
  {
    ...actions,
    change
  }
)(reduxForm({ form: 'dataselector' })(RegionSelector))
