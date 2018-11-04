import PF_Service from '@/services/programframesservice.js'
import W_Service from '@/services/sampleweatherservice.js'

export default {
    getData() {
      return PF_Service().get()
    },
    getWeatherData() {
      return W_Service().get()
    }
  }