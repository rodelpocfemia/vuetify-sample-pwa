<template>
  <div>
    <p class="text-lg-right">
      <v-btn color="primary" v-on:click="onexport">Dowload</v-btn>
    </p>       
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :pagination.sync="pagination"
      select-all
      item-key="name"
      class="elevation-1"
    >
      <template slot="headers" slot-scope="props">
        <tr>
          <th>
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click.native="toggleAll"
            ></v-checkbox>
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td>
            <v-checkbox
              :input-value="props.selected"
              primary
              hide-details
            ></v-checkbox>
          </td>
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.calories }}</td>
          <td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="text-xs-right">{{ props.item.protein }}</td>
          <td class="text-xs-right">{{ props.item.iron }}</td>
        </tr>
      </template>
    </v-data-table>  
    <p class="text-lg-left">
      <upload-btn
        title="Upload"
        color="primary"
        class="white--text"     
        :accept="SheetJSFT" >
        <template slot="icon">
           <v-icon right>cloud_upload</v-icon>
        </template>
    </upload-btn>
    </p>
  </div>
</template>
<script>
import UploadButton from 'vuetify-upload-button';
import XLSX from 'xlsx'
import ApiService from '@/services/services.js'

const make_cols = refstr => Array(XLSX.utils.decode_range(refstr).e.c + 1).fill(0).map((x,i) => ({name:XLSX.utils.encode_col(i), key:i}));
const _SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");

  export default {
    data: () => ({
      sample_api_data: null,
      export_data: {
      // We will make a Workbook contains 2 Worksheets
      'animals': [
                  {"name": "cat", "category": "animal"}
                  ,{"name": "dog", "category": "animal"}
                  ,{"name": "pig", "category": "animal"}
                  ,{"name": "mouse", "category": "animal"}
                ],
      'pokemons': [
                  {"name": "pikachu", "category": "pokemon"}
                  ,{"name": "Arbok", "category": "pokemon"}
                  ,{"name": "Eevee", "category": "pokemon"}
                ],
      'testdata': [{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000017","style":"BL DAKOTA","color":"BU BURGUNDY","size":"48-15","wPrice":59.95,"pPrice":47.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000024","style":"BL DAKOTA","color":"BLK BLACK","size":"48-15","wPrice":59.95,"pPrice":47.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"}],
      "snapShotProdDataItem":[{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000017","style":"BL DAKOTA","color":"BU BURGUNDY","size":"48-15","wPrice":59.95,"pPrice":47.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000024","style":"BL DAKOTA","color":"BLK BLACK","size":"48-15","wPrice":59.95,"pPrice":47.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"}]
      },
      pagination: {
        sortBy: 'name'
      },
      selected: [],
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
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
    }),

    methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.desserts.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },
      onexport () { // On Click Excel download button
    
        // export json to Worksheet of Excel
        // only array possible
        //var animalWS = XLSX.utils.json_to_sheet(this.export_data.animals) 
        //var pokemonWS = XLSX.utils.json_to_sheet(this.export_data.pokemons) 
        var WS = XLSX.utils.json_to_sheet(this.export_data.snapShotProdDataItem) 

        // A workbook is the name given to an Excel file
        var wb = XLSX.utils.book_new() // make Workbook of Excel

        // add Worksheet to Workbook
        // Workbook contains one or more worksheets
        //XLSX.utils.book_append_sheet(wb, animalWS, 'animals') // sheetAName is name of Worksheet
        //XLSX.utils.book_append_sheet(wb, pokemonWS, 'pokemons')   
        XLSX.utils.book_append_sheet(wb, WS, 'testdata') 

        // export Excel file
        XLSX.writeFile(wb, 'book.xlsx') // name of the file is 'book.xlsx'
      },
      async export_api_data(){
        console.log('export_api_data')
        const response = await ApiService.getData()
        //const response = await ApiService.getWeatherData()
        
        this.sample_api_data = JSON.stringify(response.data)
        
        console.log(this.sample_api_data)
        /*
        var WS = XLSX.utils.json_to_sheet(this.sample_api_data) 
        var wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, WS, 'ProdData')
        XLSX.writeFile(wb, 'book.xlsx')
        */
      }
    },
    components: {
      'upload-btn': UploadButton
	}
  }
</script>