<template>
    <v-container>
        <v-layout row>
            <v-flex sm6 offset-sm3>
                <h1 class="text--secondary nb3">Create New Ad</h1>
                <v-form ref="form" v-model="valid" validation>
                  <v-text-field                    
                    name="title" 
                    label="Titile" 
                    type="text"
                    v-model="title"
                    :rules="[v => !!v || 'Title is required']"
                    ></v-text-field>
                  <v-textarea
                    name="description" 
                    label="Description" 
                    type="text"
                    v-model="description"                    
                    ></v-textarea>
                </v-form>
                <v-layout class="mb-3" row>
                    <v-flex xs12>
                        <v-btn
                            color="blue-grey"
                            class="white--text"
                            @click="triggerUpload"
                            >
                            Upload
                            <v-icon right dark>cloud_upload</v-icon>
                        </v-btn>
                        <input 
                            ref="fileInput" 
                            type="file" 
                            style="display: none" 
                            accept="image/*"
                            @change="onFileChange"
                        >
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>                   
                        <img :src="imageSrc" height="100" v-if="imageSrc">
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>                        
                        <v-switch
                            label="Add promo?"
                            v-model="promo"
                        ></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12> 
                        <v-spacer></v-spacer>                       
                        <v-btn 
                            class="success" 
                            @click="createAd"
                            :loading="loading"
                            :disabled="!valid || loading"
                        >Create</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data (){
        return {
            title: '',
            description: '',
            promo: false,
            valid: false,
            image: null,
            imageSrc: ''
        }
    },
    computed: {
        loading (){
            return this.$store.getters.loading
        }
    },
    methods: {
        triggerUpload (){
           this.$refs.fileInput.click() 
        },
        onFileChange (event){
            const file = event.target.files[0]

            const reader = new FileReader()
            reader.onload = e => {
                this.imageSrc = reader.result
            }
            reader.readAsDataURL(file)
            this.image = file
        },
        createAd (){
            if(this.$refs.form.validate() && this.image){
                const ad = {
                    title: this.title,
                    description: this.description,
                    promo: this.promo,
                    image: this.image
                } 
                
                this.$store.dispatch('createAd', ad)
                    .then(() => {
                        this.$router.push('/list')
                    })
                    .catch(()=>{})
            }
        }
    }
}
</script>

