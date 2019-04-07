import React, { Component } from 'react'
import { Button, Card, Col, Row, FormGroup, Label, Input } from 'reactstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AsyncSelect from 'react-select/lib/Async'
import Select from 'react-select'
import { Field, reduxForm, change, FieldArray } from 'redux-form'
import schema from '../../lib/schema.json'
import mappings from '../../lib/mappings.json'

import { actions } from './ducks'
import { getStatistics } from '../../lib/schema'

import './styles.scss'

const ClassifierForm = ({ fields, meta: { error, submitFailed } }) => (
  <div>
    {fields.map(field => (
      <FormGroup>
        <Label for={`${field.parent}.classifiers.${field.id}`}>
          {field.id} - {field.name}
        </Label>
        <Field
          name={`${field.parent}.${field.id}`}
          type="text"
          component={({ input }) => (
            <Select
              isMulti
              options={field.options}
              {...input}
              onBlur={event => event.preventDefault()}
              onChange={input.onChange}
            />
          )}
          id="statistics"
        />
      </FormGroup>
    ))}
  </div>
)

class ValueAttribute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classifiers: [],
      sources: []
    }
  }

  render() {
    const { field } = this.props
    return (
      <Card className="dg-valueattributeselector__statistic">
        <FormGroup>
          <Label>Data</Label>
          <Field
            name={`${field}.valueattribute`}
            type="text"
            component={({ input }) => (
              <AsyncSelect
                isSearchable
                loadOptions={(inputValue, callback) => {
                  callback(getStatistics(inputValue))
                }}
                {...input}
                onBlur={event => event.preventDefault()}
                onChange={option => {
                  const { args } = schema[option.value]
                  const classifiers = Object.keys(args).reduce((acc, curr) => {
                    acc.push({
                      id: curr,
                      parent: field,
                      name: args[curr].name,
                      options: args[curr].values.map(v => ({
                        value: v.value,
                        label: v.name
                      }))
                    })
                    return acc
                  }, [])
                  const sources = mappings[option.value].map(s => ({
                    id: s.name,
                    value: `R${s.name}`,
                    label: `${s.name} - ${s.title_de}`
                  }))
                  this.setState({ classifiers, sources })
                  input.onChange(option)
                }}
              />
            )}
          />
        </FormGroup>
        <Row form>
          <Col>
            <FormGroup>
              <Label for="year">Year</Label>
              <Field
                name={`${field}.year`}
                type="text"
                component={({ input }) => (
                  <Input {...input} type="text" id="exampleAddress" />
                )}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="year">Source Statistics</Label>
              <Field
                name={`${field}.statistics`}
                type="text"
                component={({ input }) => (
                  <Select
                    isMulti
                    options={this.state.sources}
                    {...input}
                    onBlur={event => event.preventDefault()}
                    onChange={input.onChange}
                  />
                )}
              />
            </FormGroup>
          </Col>
        </Row>
        <FieldArray
          name={`${field}.classifiers`}
          component={ClassifierForm}
          fields={this.state.classifiers}
        />
      </Card>
    )
  }
}

ValueAttribute.propTypes = {
  fields: PropTypes.any,
  meta: PropTypes.any
}

const ValueAttributeForm = ({ fields, meta: { error, submitFailed } }) => (
  <div>
    {fields.map((field, index) => {
      return <ValueAttribute field={field} key={`${field}${index}`} />
    })}
    <Button
      className="dg-valueattributeselector__addbutton"
      onClick={() => fields.push({})}
      outline
    >
      Add
    </Button>
  </div>
)

const DataSelector = ({ getData }) => (
  <div>
    <Card className="dg-valueattributeselector">
      <h5>2. Select Data</h5>
      <FieldArray name="valueattributes" component={ValueAttributeForm} />
    </Card>
    <Button onClick={() => getData()} color="primary" className="dg-app__go">
      Get Data
    </Button>
  </div>
)

DataSelector.propTypes = {
  importData: PropTypes.func.isRequired
}

DataSelector.defaultProps = {}

export default connect(
  state => ({
    ...state.dataselector,
    initialValues: {}
  }),
  {
    ...actions,
    change
    // onSubmit: (values, dispatch, props) => dispatch(actions.addTodo(values))
  }
)(reduxForm({ form: 'dataselector' })(DataSelector))
