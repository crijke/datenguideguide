/*  __
___( o)>
\ <_. )
 `---'
*/

import { createSlice } from 'redux-starter-kit'
import gql from 'graphql-tag'
import _ from 'lodash'

import client from '../../lib/datenguide'

const slice = createSlice({
  slice: 'dataselector',
  initialState: {
    query: '',
    json: ''
  },
  reducers: {
    setGraphQLQuery: (state, action) => {
      state.query = action.payload
    },
    setJson: (state, action) => {
      state.json = action.payload
    }
  }
})

export const { reducer } = slice

export const actions = {
  ...slice.actions,
  fetchData: payload => async (dispatch, getState) => {
    dispatch(actions.setGraphQLQuery(payload))

    const parsedQuery = gql`
      ${payload}
    `

    debugger

    const json = await client.query({
      query: parsedQuery
    })
    delete json.loading
    delete json.networkStatus
    delete json.stale
    delete json.data.region.__typename
    json.data.region = _.mapValues(json.data.region, value =>
      _.isArray(value)
        ? value.map(v => {
            delete v.__typename
            return v
          })
        : value
    )
    dispatch(actions.setJson(JSON.stringify(json, null, 2)))
  }
}
