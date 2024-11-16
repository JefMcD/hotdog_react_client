
/*
    These are the backend servers that the React Client
    will fetch data from through the API
*/

const client_dev_server      = 'http://127.0.0.1:8000' // Django Runserver
const client_prd_server      = 'http://127.0.0.1:8001' // Apache localhost
const client_pythonanywhere  = 'https://jeffers.pythonanywhere.com' // Live Host

const server = client_pythonanywhere

export default server