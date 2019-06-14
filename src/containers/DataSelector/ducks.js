/*  __
___( o)>
\ <_. )
 `---'
*/

import { createSlice } from 'redux-starter-kit'
import _ from 'lodash'
import { actions as resultActions } from '../Results/ducks'

const slice = createSlice({
  slice: 'dataselector',
  initialState: {},
  reducers: {}
})

export const { reducer } = slice

const mapAttributeArguments = args => {
  if (args.length === 0) {
    return ''
  }
  const arglist = Object.keys(args)
    .reduce((acc, curr) => {
      acc.push(
        `${curr}: ${JSON.stringify(
          _.isArray(args[curr]) ? args[curr].map(a => a.value) : args[curr]
        )}`
      )
      return acc
    }, [])
    .join(', ')
    .replace(/"/g, '')
  return arglist ? `(${arglist})` : ''
}

const mapValueAttributes = attributes =>
  attributes.map(
    attribute => `
    ${attribute.valueattribute.value}${mapAttributeArguments(
      _.pickBy(attribute, (value, key) => key !== 'valueattribute')
    )}{
      year
      value
    }`
  )

const getGraphQLQuery = values => `{
  region(id: "${values.region.value}"){
    id
    name${mapValueAttributes(values.valueattributes)}    
  }
}
`

export const actions = {
  ...slice.actions,
  getData: () => (dispatch, getState) => {
    const { values } = getState().form.dataselector
    const query = getGraphQLQuery(values)
    dispatch(resultActions.fetchData(query))
    dispatch(
      resultActions.setCsvList({
        region: values.region,
        valueattributes: values.valueattributes.map(
          ({ valueattribute }) => valueattribute
        )
      })
    )
  }
}
