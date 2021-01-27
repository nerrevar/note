import mongodb from 'mongodb'

import config from './db.config'

function initClient () {
  return mongodb.MongoClient(
    `${config.protocol}://${config.username}:${config.password}@${config.host}/${config.dbname}?${config.textOptions}`,
    config.options
  )
}

const signIn = async (login, password) => {
  const client = initClient()
  let result = {
    status: false,
    message: 'Invalid username or password',
  }

  try {
    await client.connect()
    const user = await client.db().collection('user').findOne({login: login})
    if (!user)
      throw result
    if (password === user.password)
      result = {
        status: true,
        user: user,
      }
  }
  catch (e) {
    result = {
      status: false,
      message: e.message,
    }
  }
  finally {
    client.close()
  }
  return await result
}

const fetchNotes = async (login) => {
  const client = initClient()
  let result = {}
  try {
    await client.connect()
    const user = await client.db().collection('user').findOne({login: login})
    result = {
      status: true,
      notes: user.notes,
    }
  }
  catch (e){
    result = {
      status: false,
      message: e.message,
    }
  }
  finally {
    await client.close()
  }
  return await result
}

const addNote = async (login, title, text) => {
  const client = initClient()
  let result = {}
  try {
    await client.connect()
    await client.db().collection('user').findOneAndUpdate(
      { login: login },
      {
        $addToSet: {
          notes: {
            checked: false,
            title: title,
            text: text,
            created: Date.now()
          }
        }
      }
    )
  }
  catch (e) {
    return {
      status: false,
      message: e.message,
    }
  }
  finally {
    await client.close()
  }
  return { status: true }
}

export default {
  signIn,
  fetchNotes,
  addNote,
}
