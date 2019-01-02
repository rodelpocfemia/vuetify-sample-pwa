<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="700">
            <v-card>
                <v-card-title class="primary" primary-title>
                    <h3>Add A New Exception</h3>
                </v-card-title>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex xs1>
                           <div class="text-lg-left" style="padding:0px;">
                                <p class="text-lg-left" style="padding: 20px 0;">Brand</p>
                            </div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="text-lg-left" style="padding:0px;">
                                <v-switch v-model="switch1"></v-switch>
                            </div>
                        </v-flex>
                    </v-layout> 
                    <v-layout row wrap>
                        <v-flex xs1>
                           <div class="text-lg-left" style="padding:0px;">
                                <p class="text-lg-left" style="padding: 20px 0;">UPC</p>
                            </div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="text-lg-left" style="padding:0px;">
                                <v-text-field label="Enter UPC" append-icon="search"
                                ></v-text-field>
                            </div>
                        </v-flex>
                         <v-flex xs3>
                           <div class="text-lg-center" style="padding:0px;">
                                <p class="text-lg-center" style="padding: 20px 0;">OR</p>
                            </div>
                        </v-flex>
                        <v-flex xs5>
                            <div class="text-lg-left" style="padding:0px;">
                                <v-text-field box label="Drag files here"></v-text-field>
                            </div>
                        </v-flex>
                    </v-layout> 
                    <v-layout row wrap>
                        <v-flex xs8>
                           <div class="text-lg-left" style="padding:0px;">
                               <v-data-table
                                    :headers="headers"
                                    :items="desserts"
                                    class="elevation-1"
                                >
                                    <template slot="items" slot-scope="props">
                                    <td>{{ props.item.name }}</td>
                                    <td class="text-xs-right">{{ props.item.calories }}</td>
                                    <td class="text-xs-right">{{ props.item.fat }}</td>                                    
                                    </template>
                                </v-data-table>
                           </div>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs2>
                           <div class="text-lg-left" style="padding:5px;">
                                <p class="text-lg-left" style="padding: 20px 0;">Frame Flag</p>
                            </div>
                        </v-flex>
                        <v-flex xs4>
                            <div class="text-lg-left" style="padding:5px;">
                                <v-select
                                :items="['All', 'No Longer in Program', 'Out of Stock', 'Hide from ECP']"
                                label="Select Frame Flag"
                                solo
                                ></v-select>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click.native="close">Cancel</v-btn>
                <v-btn color="primary" flat @click.native="close">Finished</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
  export default {
    name: 'program-exceptions-add',
    data () {
      return {
        switch1: true,
        show1: false,
        title: 'Preliminary report',
        email: '',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          counter: value => value.length <= 20 || 'Max 20 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        },
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' }         
        ],
        desserts: [
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          }]
      }
    },
    props: {
        dialog: {
        default: false
      }
    },
    methods: {
        close() {
            this.$emit('update:dialog', false)
      }
    }
  }
</script>