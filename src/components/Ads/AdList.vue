<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3 v-if="!loading && myAds.length !== 0">
                <h1 class="text--secondary mb-3">My Ads</h1>
                <v-card 
                    class="elevation-12 mb-3"
                    v-for="ad in myAds"
                    :key="ad.id"
                >
                    <v-layout>
                        <v-flex xs4>
                            <router-link :to="'/ad/' + ad.id">
                                <v-img
                                    :src="ad.imageSrc"
                                    height="165px"
                                ></v-img>
                            </router-link>
                        </v-flex>
                        <v-flex xs8>
                            <v-card-text>
                                <h2>{{ ad.title }}</h2>
                                <p>{{ad.description}}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    class="info"
                                    :to="'/ad/' + ad.id"
                                >OPEN</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
            <v-flex v-else-if="!loading && myAds.length === 0"  class="text-xs-center">
                <h1 class="text--secondary mb-3">You have no ads</h1>
            </v-flex>
            <v-flex v-else class="text-xs-center">
                <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
                ></v-progress-circular>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    computed: {
        myAds (){
            return this.$store.getters.myAds
        },
        loading (){
            return this.$store.getters.loading
        }
    }
}
</script>

