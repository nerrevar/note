export default {
  protocol: 'mongodb+srv',
  username: 'note',
  password: '0QkNsz1wddA3jDZd',
  host: 'nerrevar.rmcl8.gcp.mongodb.net',
  dbname: 'notes',
  textOptions: 'retryWrites=true&w=majority',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // validateOptions: true,
    connectTimeoutMS: 10000,
  },
}
