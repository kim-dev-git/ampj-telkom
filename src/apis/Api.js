import Vue from 'vue'
import { fb, db } from '@/firebase'
import * as firebase from 'firebase'

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

export const allFilterBy = (_collection, _field, _operator, _value) => {
  return new Promise((res, rej) => {
    (async () => {
      try{
        let query = db.collection(_collection).where(_field, _operator, _value)
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

export let rt = (_collection) => {
  return new Promise((res, rej) => {
    (async () => {
      let refference = db.collection(_collection)
      let array = []
      await refference.onSnapshot(query => {
        let docs = query.docs
        //array = []
        for(const doc of docs) {
          const obj = doc.data()
          obj.id = doc.id
          array.push(obj)
        }
        console.log('Api:', array)
        return res(array)
      })
    })()
  })
}

export let realtime = (_collection) => {
  return new Promise((res, rej) => {
    (async () => {
      try{
        let query = db.collection(_collection)
        let response = []
        await query.onSnapshot(querySnapshot => {
          let docs = querySnapshot.docs
          response = []

          for (let doc of docs) {
            const selectedItem = doc.data()
            selectedItem.id = doc.id
            response.push(selectedItem)
          }
          console.log(response)
          return res(response)
        })
        console.log('Res', response)
        //res(response)
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

        return res(document.id)
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
        console.log('Error at API.update(' + _collection +'):', error)
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
