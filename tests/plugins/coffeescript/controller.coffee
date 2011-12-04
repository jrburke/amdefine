if typeof define isnt 'function'
  define = (require('../../../amdefine'))(module)

define ->
  attach: () ->
    return 'attach'
