import * as fb from 'firebase'

class Order {
    constructor (name, phone, adId, done = false, id = null){
        this.name = name
        this.phone = phone
        this.adId = adId
        this.done = done
        this.id = id
    }
}

export default {
   state: {
       orders: []
   },
   mutations: {
       loadOrders (state, payload){
           state.orders = payload
       }
   },
   actions: {
       async createOrder ({commit}, {name, phone, adId, ownerId}){
          const order = new Order(name, phone, adId)
          commit('clearError')

          try {
              await fb.database().ref(`/users/${ownerId}/orders`).push(order)
          } catch (error) {
              commit('setError', error.message)
              throw error
          }
        },
        async fetchOrders({commit, getters}){
            commit('setLoading', true)
            commit('clearError')

            const resultOrders = []
            const userId = fb.auth().currentUser.uid            

            try {
                const fbval = await fb.database().ref(`users/${userId}/orders`).once('value')
                const orders = fbval.val()

                const resultOrders = []


                Object.keys(orders).forEach(key => {
                    const o = orders[key]                    
                    resultOrders.push(
                        new Order(o.name, o.phone, o.adId, o.done, key)
                    )
                })                

                commit('loadOrders', resultOrders)
                commit('setLoading', false)
            } catch (error){
                commit('setLoading', false)
                commit('setError', error.message)
            }
        },
        async markOrderDone ({commit}, payload){
            commit('clearError')
            const userId = fb.auth().currentUser.uid
            
            try {
                await fb.database().ref(`/users/${userId}/orders`).child(payload.id).update({
                    done: !payload.done
                })
            } catch (error) {
                commit('setError', error.message)
                throw error
            }
        }
   },
   getters: {
       doneOrders (state){
            return state.orders.filter(o => o.done)
       },
       undoOrders (state){
            return state.orders.filter(o=> !o.done)
       },
       orders (state, getters){
           return getters.undoOrders.concat(getters.doneOrders)
       }
   } 
}