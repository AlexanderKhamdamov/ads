<template>
    <div v-if="!loading">
        <v-container fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                            v-for="ad in promoAds"
                            :key="ad.id"
                            :src="ad.imageSrc"
                        >
                            <div class="car-link">
                                <v-btn class="error" :to="'/ad/' + ad.id">{{ad.title}}</v-btn>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>            
        </v-container>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex 
                    xs12
                    sm6
                    md4
                    v-for="ad in ads"
                    :key="ad.id"
                >
                    <v-card>
                        <router-link :to="'/ad/' + ad.id">
                            <v-img
                            :src="ad.imageSrc"
                            aspect-ratio="2.75"
                            ></v-img>
                        </router-link>

                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">{{ad.title}}</h3>
                            <div>{{ad.description}}</div>
                            </div>
                        </v-card-title>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat :to="'/ad/' + ad.id">Open</v-btn>
                            <app-buy-modal :ad="ad"></app-buy-modal>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>            
        </v-container>
    </div>

    <div v-else>
        <v-container>
            <v-layout row>
                <v-flex xs12 class="text-xs-center">
                    <v-progress-circular
                    :size="50"
                    color="primary"
                    indeterminate
                    ></v-progress-circular>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>

export default {
   computed: {
       promoAds (){                      
           return this.$store.getters.promoAds
       },
       ads () {
           return this.$store.getters.ads
       },
       loading (){
           return this.$store.getters.loading
       }
   }
}
</script>

<style>
.car-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(0, 0, 0, .5);
    transform: translate(-50%, 0);
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px 5px 0 0 
}
</style>


