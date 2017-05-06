
'use strict'

const path = require('path')
const debug = require('debug')('list-countries')

const defaultSettings = {
  fallbackLocale: 'en',
  locales: [ 'en' ]
}

let settings = Object.assign(Object.create(null), defaultSettings)

let lists = Object.create(null)

/**
 * Initiate the module.
 *
 * @param  {Object|undefined} options
 *
 * @return {Void}
 */

exports.init = options => {
  if (typeof options === 'object') {
    // Specify a fallback locale.
    if (options.fallbackLocale) settings.fallbackLocale = options.fallbackLocale

    // List of locales to preload countries lists for.
    if (options.locales) settings.locales = options.locales
  } else {
    settings = Object.assign(Object.create(null), defaultSettings)
  }

  // Loading lists of countries is sync because it should be called
  // only once and then all lists will be saved in memory for faster access.
  exports.loadLists(settings.locales)
}

/**
 * Load countries lists for given locales.
 *
 * @param  {Array} locales
 *
 * @return {Void}
 */

exports.loadLists = locales => {
  locales.forEach(exports.loadList)
  if (!lists[settings.fallbackLocale]) exports.loadList(settings.fallbackLocale)
}

/**
 * Load countries list for a locale.
 *
 * @param  {String} locale
 *
 * @return {Void}
 */

exports.loadList = locale => {
  try {
    if (!lists[locale]) {
      lists[locale] = require(path.join(__dirname, 'resources', locale + '.json'))
    }
    debug('loaded countries list for [' + locale + ']')
  } catch (err) {
    debug('failed to load countries list for [' + locale + ']')
  }
}

/**
 * Check if a list for the `locale` was loaded.
 *
 * @param  {String} locale
 *
 * @return {Boolean}
 */

exports.loaded = locale => !!lists[locale]

/**
 * Get all loaded countries lists.
 *
 * @return {Object}
 */

exports.all = () => lists

/**
 * Reset loaded countries lists.
 */

exports.reset = () => (lists = Object.create(null))

/**
 * Get list of countries for a specific locale.
 *
 * @param  {String} locale
 *
 * @return {Object}
 */

exports.get = locale => lists[locale] || lists[settings.fallbackLocale] || {}

/**
 * Check if given code is a valid country code.
 *
 * @param  {String} code
 *
 * @return {Boolean}
 */

exports.exists = code => !!exports.get(settings.fallbackLocale)[code]

/**
 * Get country name in a specific locale.
 *
 * @param  {String} code
 * @param  {String} locale
 *
 * @return {String}
 */

exports.name = (code, locale) => exports.get(locale)[code] || ''
