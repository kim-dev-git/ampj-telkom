import Vue from 'vue'
import { fb, db } from '@/firebase'

Vue.use(fb)

export const all = (_collection) => {
  return new Promise((res, rej) => {
    (async () => {
      try{
        let query = db.collection(_collection)
        let response = []

        await query.get().then(querySnapshot => {
          let docs = querySnapshot.docs

          for (let doc of docs) {
            const selectedItem = doc.data()
            selectedItem.id = doc.id
            response.push(selectedItem)
          }
          return response
        })
        return res(response)
      }
      catch (error) {
        console.log('Error at API.all(' + _collection + '):', error)
        return rej(error)
      }
    })()
  })
}

export const realtime = (_collection) => {
  return new Promise((res, rej) => {
    (async () => {
      try{
        let query = db.collection(_collection)
        let response = []

        await query.onSnapshot(querySnapshot => {
          let docs = querySnapshot.docs

          for (let doc of docs) {
            const selectedItem = doc.data()
            selectedItem.id = doc.id
            response.push(selectedItem)
          }
          return response
        })
        return res(response)
      }
      catch (error) {
        console.log('Error at API.realtime(' + _collection + '):', error)
        return rej(error)
      }
    })()
  })
}

export const show = (_collection, _documentId) => {
  return new Promise((res, rej) => {
    (async () => {
      try{
        const document = db.collection(_collection).doc(_documentId)
        let result = await document.get()
        let response = result.data()

        return res(response)
      }
      catch (error) {
        console.log('Error at API.show(' + _collection + '):', error)
        return rej(error)
      }
    })()
  })
}

export const store = (_collection, _documentId, _data) => {
  return new Promise((res, rej) => {
    (async () => {
      try{
        var document = db.collection(_collection).doc()
        if(_documentId) {
          document = db.collection(_collection).doc(_documentId)
        }
        await document.set(_data)

        return res()
      }
      catch (error) {
        console.log('Error at API.store(' + _collection + '):', error)
        return rej(error)
      }
    })()
  })
}

export const update = (_collection, _documentId, _data) => {
  return new Promise((res, rej) => {
    (async () => {
      try{
        var document = db.collection(_collection).doc(_documentId)
        await document.set(_data, { merge: true })

        return res()
      }
      catch (error) {
        console.log('Error at API.update(' + _collection + '):', error)
        return rej(error)
      }
    })()
  })
}

export const remove = (_collection, _documentId) => {
  return new Promise((res, rej) => {
    (async () => {
      try{
        var document = db.collection(_collection).doc(_documentId)
        await document.delete()

        return res()
      }
      catch (error) {
        console.log('Error at API.remove(' + _collection + '):', error)
        return rej(error)
      }
    })()
  })
}
