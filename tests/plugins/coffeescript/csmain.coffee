if typeof define isnt 'function'
  define = (require('../../../amdefine'))(module)

define [
  'cs!.controller'
  'cs!./views/view'
  './views/regular'
], (controller, view, regular) ->
  return {
    controller: controller,
    regular: regular,
    view: view
  }