import axios from 'axios'

export default() => {
  return axios.create({    
    baseURL: `https://localhost:44333/api/v1/Snapshots/download/proddata`,
    //baseURL: `https://localhost:44333/api/Modules`,
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      //'Access-Control-Allow-Origin': '*'
    }
  })
}