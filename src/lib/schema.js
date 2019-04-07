import flexsearch from 'flexsearch'

import regions from './names.json'
import schema from './schema.json'

// move to server?

const regionIndex = flexsearch.create()
Object.keys(regions).forEach(key => regionIndex.add(key, `${key} - ${regions[key]}`))

const statisticsIndex = flexsearch.create()
Object.keys(schema).forEach(key => statisticsIndex.add(key, `${key} - ${schema[key].name}`))

export const getRegions = filter =>
  regionIndex
    .search(filter)
    .map(id => ({ value: id, label: `${id} - ${regions[id]}` }))

export const getStatistics = filter => {
  const statistics =
    filter === '*' ? Object.keys(schema) : statisticsIndex.search(filter)
  return statistics.map(id => ({
    value: id,
    label: `${id} - ${schema[id].name}`
  }))
}
