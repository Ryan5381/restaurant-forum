const dayjs = require('dayjs')
const Handlebars = require('handlebars')

Handlebars.registerHelper('eq', function (a, b) {
  return a === b
})

module.exports = {
  currentYear: () =>dayjs().year(),
  eq: (a, b) => a === b
}