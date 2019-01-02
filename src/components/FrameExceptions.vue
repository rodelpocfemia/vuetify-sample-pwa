<template>
  <div>
    <v-flex xs12>
        <!--Header buttons-->
        <v-layout row wrap>
          <v-flex xs3>
            <div class="text-lg-center" style="padding:5px;">
              <v-select 
                :items="['All','RayBan', 'Turi', 'Gucci']"
                label="Select Brand"
                solo
                ></v-select>
            </div>
          </v-flex>
          <v-flex xs3>
              <div class="text-lg-center" style="padding:5px;">
                <v-select
                :items="['All', 'No Longer in Program', 'Out of Stock', 'Hide from ECP']"
                label="Select Frame Exceptions"
                solo
                ></v-select>
              </div>
          </v-flex>
          <v-flex xs3>
              <div class="text-lg-center" style="padding:5px;">
                 
              </div>
          </v-flex>  
          <v-flex xs3>
              <div class="text-lg-right" style="padding:5px;">
                 <v-btn fab dark color="primary" @click="dialog=true">
                    <v-icon dark>add</v-icon>
                </v-btn>
              </div>
          </v-flex>   
        </v-layout>
        <!--Table section-->
        <v-layout row wrap>
            <v-flex xs12>
                <div class="text-lg-center" style="padding:5px;">
                    <v-card>
                        <v-card-title>
                        Nutrition
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Search"
                            single-line
                            hide-details
                        ></v-text-field>
                        </v-card-title>
                        <v-data-table
                        :headers="headers"
                        :items="desserts"
                        :search="search"
                        >
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.name }}</td>
                            <td class="text-xs-right">{{ props.item.calories }}</td>
                            <td class="text-xs-right">{{ props.item.fat }}</td>
                            <td class="text-xs-right">{{ props.item.carbs }}</td>
                            <td class="text-xs-right">{{ props.item.protein }}</td>
                            <td class="text-xs-right">{{ props.item.iron }}</td>
                        </template>
                        <v-alert slot="no-results" :value="true" color="error" icon="warning">
                            Your search for "{{ search }}" found no results.
                        </v-alert>
                        </v-data-table>
                    </v-card>
                </div>
            </v-flex>
        </v-layout>
        <!--Bottom section-->
         <v-layout row wrap>
             <v-flex xs12>
                 <div class="text-lg-right" style="padding:5px;">
                     <v-btn color="primary">Dowload<v-icon right>cloud_download</v-icon></v-btn>
                 </div>
             </v-flex>
         </v-layout>
    </v-flex>

    <!--Add new component-->
    <frame-exceptions-add :dialog.sync="dialog"></frame-exceptions-add>
  </div>
</template>
<script>
import frameexceptionadd from '@/usercomponents/frameexceptionadd'
  export default {
    components: {
        'frame-exceptions-add': frameexceptionadd
    },
    data () {
      return {
        dialog: false,
        search: '',
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' }
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
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%'
          },
          {
            value: false,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%'
          },
          {
            value: false,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%'
          },
          {
            value: false,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%'
          },
          {
            value: false,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%'
          },
          {
            value: false,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%'
          },
          {
            value: false,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%'
          },
          {
            value: false,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%'
          }
        ]
      }
    }
  }
</script>