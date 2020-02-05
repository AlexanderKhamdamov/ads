import * as fb from 'firebase'

class Ad {
    constructor (title, description, ownerId, imageSrc='', promo = false, id=null){
        this.title = title
        this.description = description        
        this.ownerId = ownerId
        this.imageSrc = imageSrc
        this.promo = promo
        this.id = id
    }
}

export default {
    state: {
        ads: []
    },
    mutations: {
        createAd (state, payload){
            state.ads.push(payload)
        },
        loadAds (state, payload){
            state.ads = payload
        },
        updateAd (state, {title, description, id}){
            const ad = state.ads.find(a => {
                return a.id === id
            })
            ad.title = title
            ad.description = description
        }
    },
    actions: {
        async createAd ({commit, getters}, payload){
            commit('clearError')
            commit('setLoading', true)
            
            const userId = fb.auth().currentUser.uid
            const image = payload.image
                        
            try {
                const newAd = new Ad(
                    payload.title,
                    payload.description,
                    userId,
                    '',
                    payload.promo
                )
                
                const ad = await fb.database().ref('ads').push(newAd)
                const imageExt = image.name.slice(image.name.lastIndexOf('.'))

                const fileData = await fb.storage().ref(`ads/${ad.key}.${imageExt}`).put(image)
                const imageSrc = await fileData.ref.getDownloadURL()

                await fb.database().ref('ads').child(ad.key).update({
                    imageSrc                    
                })

                commit('setLoading', false)
                commit('createAd', {
                    ...newAd,
                    id: ad.key,
                    imageSrc
                })
                               
            } catch (error){
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }         
        },
        async fetchAds ({commit}){
            commit('clearError')
            commit('setLoading', true)
                                                
            try {
                
                const fbval = await fb.database().ref('ads').once('value')
                const ads = fbval.val()

                const resultAds = []

                Object.keys(ads).forEach(key => {
                  const ad = ads[key]
                  resultAds.push(
                      new Ad(
                        ad.title,
                        ad.description,        
                        ad.ownerId,
                        ad.imageSrc,
                        ad.promo,
                        key
                      )
                  )  
                })

                commit('loadAds', resultAds)
                commit('setLoading', false)                   
            } catch (error){
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }          
        },
        async updateAd ({commit}, {title, description, id}){
            commit('clearError')
            commit('setLoading', true)

            try {
                await fb.database().ref('ads').child(id).update({
                    title, description
                })                
                commit('updateAd', {
                  title, description, id  
                })
                commit('setLoading', false)                
                               
            } catch (error){
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }         
        }
    },
    getters: {
        ads (state){
            return state.ads
        },
        promoAds (state){
            return state.ads.filter(ad => {
                return ad.promo
            })
        },
        myAds (state){
            const userId = fb.auth().currentUser.uid
            return state.ads.filter(a => {
                return a.ownerId === userId
            })
        },
        adById (state){
            return adId => {
                return state.ads.find(ad => ad.id === adId)
            }
        },
        getUserId (state){
            return fb.auth().currentUser.uid
        }
    }
}