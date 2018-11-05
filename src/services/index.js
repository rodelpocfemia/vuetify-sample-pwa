import ProgramFramesServices from '@/services/programframesservice.js'
import SnapShotServices from '@/services/snapshotservice.js'
import WeatherServices from '@/services/sampleweatherservice.js'

export default {
    getProgramFramesData() {
      return ProgramFramesServices().get()
    },
    getSnapShotProdData() {
      return SnapShotServices().get()
    },
    getWeatherData() {
      return WeatherServices().get()
    }
  }