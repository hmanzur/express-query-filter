'use strict'

const Sequelize = require('sequelize')

/**
 *
 * @param {object} request object
 * @param.query {object} request query params
 * @returns {object} parsed filters
 */
module.exports = (request) => {
  let parsed = {}

  if (!parsed.where) {
    parsed.where = {}
  }

  Object.keys(request.query).forEach(key => {
    if (key in ['attributes', 'exclude'] ) {
      parsed[key] = request.query[key].split(',')
    } else if (key === 'page') { // Offset
      parsed.offset = parseInt(request.query.page || 1, 10) - 1
    } else if (key === 'size') { // Limit
      parsed.limit = parseInt(request.query.size, 10)
    } else if(request.query[key]) {
      if (key.includes('__in')) { // IN
        parsed.where[key.replace('__in', '')] = {
          [Sequelize.Op.in]: request.query[key].split(',')
        }
      } else if (key.includes('__contains')) { // IN
        parsed.where[key.replace('__contains', '')] = {
          [Sequelize.Op.like]: `%${request.query[key]}%`
        }
      } else if (key.includes('__startsWith')) { // IN
        parsed.where[key.replace('__contains', '')] = {
          [Sequelize.Op.startsWith]: request.query[key]
        }
      }else if (key.includes('__endsWith')) { // IN
        parsed.where[key.replace('__endsWith', '')] = {
          [Sequelize.Op.endsWith]: request.query[key]
        }
      } else {
        parsed.where[key] = request.query[key]
      }
    }
  })
  return parsed
}
