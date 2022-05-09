import { boot } from 'quasar/wrappers'

export default boot(async ( { app } ) => {
  app.config.globalProperties.$filters = {
    
    dateFormat(value) {
      return 'date filter: ' + value
    },

    upper(value){
        return value.toUpperCase()
    }

  }
})
