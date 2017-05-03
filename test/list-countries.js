
'use strict'

const expect = require('chai').expect
const mock = require('mock-fs')
const path = require('path')
const list = require('../index')

const enList = { RU: 'Russia', FR: 'France' }
const ruList = { RU: 'Россия', FR: 'Франция' }
const roList = { RU: 'Rusia', FR: 'Franța' }

beforeEach(() => {
  mock({
    [path.join(__dirname, '..', 'resources', 'en.json')]: JSON.stringify(enList),
    [path.join(__dirname, '..', 'resources', 'ru.json')]: JSON.stringify(ruList),
    [path.join(__dirname, '..', 'resources', 'ro.json')]: JSON.stringify(roList)
  })
})

afterEach(() => {
  mock.restore()
  list.reset()
})

describe('loading lists', () => {
  it('should return an empty object when no lists were loaded', () => {
    expect(list.all()).to.deep.equal({})
  })
  it('should load countries lists', () => {
    list.loadList('en')
    expect(list.all()).to.deep.equal({ en: enList })
    list.loadList('ru')
    expect(list.all()).to.deep.equal({ en: enList, ru: ruList })
    list.loadList('ro')
    expect(list.all()).to.deep.equal({ en: enList, ru: ruList, ro: roList })
  })
  it('should load multiple countries lists', () => {
    expect(list.all()).to.deep.equal({})
    list.loadLists([ 'en', 'ru', 'ro' ])
    expect(list.all()).to.deep.equal({ en: enList, ru: ruList, ro: roList })
  })
  it('should autoload fallback locale', () => {
    expect(list.all()).to.deep.equal({})
    list.loadLists([ 'ru', 'ro' ])
    expect(list.all()).to.deep.equal({ en: enList, ru: ruList, ro: roList })
  })
})

describe('working with lists', () => {
  it('should return an empty object when no lists were loaded', () => {
    expect(list.get('en')).to.deep.equal({})
  })
  it('should return the right countries list', () => {
    list.loadLists([ 'en', 'ru', 'ro' ])
    expect(list.get('en')).to.deep.equal(enList)
    expect(list.get('ru')).to.deep.equal(ruList)
    expect(list.get('ro')).to.deep.equal(roList)
  })
  it('should fallback to default locale when trying to access a list which was not loaded', () => {
    list.loadList('en')
    expect(list.get('ru')).to.deep.equal(enList)
  })
  it('should validate country codes', () => {
    expect(list.exists('RU')).to.be.false
    list.loadList('en')
    expect(list.exists('RU')).to.be.true
    expect(list.exists('FR')).to.be.true
    expect(list.exists('FOO')).to.be.false
  })
  it('should return right country names', () => {
    expect(list.name('RU', 'en')).to.equal('')
    list.loadLists([ 'en', 'ru', 'ro' ])
    expect(list.name('RU', 'en')).to.equal('Russia')
    expect(list.name('RU', 'ru')).to.equal('Россия')
    expect(list.name('RU', 'ro')).to.equal('Rusia')
    expect(list.name('RU', 'foo')).to.equal('Russia')
    expect(list.name('FR', 'en')).to.equal('France')
    expect(list.name('FR', 'ru')).to.equal('Франция')
    expect(list.name('FR', 'ro')).to.equal('Franța')
  })
})
