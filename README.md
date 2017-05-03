
# List Countries

List all country names and ISO 3166-1 codes in all languages.

## Installation

Using npm:

```bash
$ npm install list-countries --save
```

Using yarn:

```bash
$ yarn add list-countries
```

## Usage

```js
// Load the module.
const list = require('list-countries')

// Initiate the module and preload desired country name translations.
// Note: Init method call is optional, if not called defaults will be used.
list.init({
  // Fallback locale is used when you try to access a list which was not loaded yet.
  fallbackLocale: 'en',

  // An array of locales for which to preload country name translations.
  locales: [ 'en' ]
})

// Load translations for multiple locales.
// Note: Loads translations for the fallback locale automatically.
list.loadLists([ 'en', 'ru', 'fr' ])

// Load a specific translation.
// Note: Does not load translations for the fallback locale automatically.
list.loadList('es')

// Get all translations.
list.all() // { en: [Object], ru: [Object], fr: [Object], es: [Object] }

// Get countries list in a specific locale.
list.get('ru') // { ... RU: 'Россия' ... }

// Check if a string is valid country code.
list.exists('US') // true
list.exists('FR') // true
list.exists('FOO') // false

// Get country name in a specific locale.
list.name('FR', 'en') // France
list.name('AR', 'fr') // Argentine
list.name('RU', 'ru') // Россия
```

## Credits

- [umpirsky](https://github.com/umpirsky/country-list) for the
  awesome country name translations.

## License

The MIT License (MIT)

Copyright (c) 2017 Ion Suman <sumanion122@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
