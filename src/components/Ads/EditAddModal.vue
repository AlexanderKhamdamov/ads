<template>
    <v-dialog width="400px" v-model="modal">
        <v-btn class="warrning" flat slot="activator">Edit</v-btn>

        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-title>
                            <h1>Edit Ad</h1>
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field 
                                name="title" 
                                label="Title" 
                                type="text"
                                v-model="editedTitle"
                            ></v-text-field>
                            <v-textarea 
                                name="discription" 
                                label="Discription" 
                                type="text"
                                v-model="editedDiscription"
                            ></v-textarea>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat @click="onCancel">Cancel</v-btn>
                            <v-btn flat class="success" @click="onSave">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['ad'],
    data (){
        return {
            editedTitle: this.ad.title,
            editedDiscription: this.ad.description,
            modal: false
        }
    },
    methods: {
        onCancel (){
            this.editedTitle = this.ad.title,
            this.editedDiscription = this.ad.description,
            this.modal = false
        },
        onSave (){
            if(this.editedTitle !== '' && this.editedDiscription !== ''){
                this.$store.dispatch('updateAd', {
                    title: this.editedTitle,
                    description: this.editedDiscription,
                    id: this.ad.id
                })

                this.modal = false
            }
        }
    }
}
</script>
