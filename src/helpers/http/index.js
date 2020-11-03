import Axios from 'axios'

const http = Axios.create({
  baseURL: 'http://localhost:3333'
})

export default http
