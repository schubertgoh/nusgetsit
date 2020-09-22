// for heroku backend
export const HOSTNAME = "https://protected-fortress-44914.herokuapp.com"

// local testing
// export const HOSTNAME = "http://localhost:8081"
export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://react-email-confirm-server.now.sh'
  : 'http://localhost:8080'