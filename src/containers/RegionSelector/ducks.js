/*  __
___( o)>
\ <_. )
 `---'
*/

import { createSlice } from 'redux-starter-kit'

const slice = createSlice({
  slice: 'dataselector',
  initialState: {},
  reducers: {}
})

export const { reducer } = slice

export const actions = {
  ...slice.actions,
  importData: () => (dispatch, getState) => {
    const {
      form: {
        dataselector: {
          values: { region, statistics }
        },
        connectionsettings: {
          values: { datenguideApiUrl }
        }
      }
    } = getState()
  }
}
