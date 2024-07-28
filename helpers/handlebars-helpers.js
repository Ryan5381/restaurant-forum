const dayjs = require('dayjs')
const Handlebars = require('handlebars')

Handlebars.registerHelper('eq', function (a, b) {
  return a === b
})

module.exports = {
  currentYear: () =>dayjs().year(),
  eq: (a, b) => a === b,
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  }
}