<template>
  <div>
    <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs1>
            <div class="text-lg-center">
              <v-btn color="primary">Copy Data</v-btn> 
            </div>
          </v-flex>
          <v-flex xs2>
              <div class="text-lg-center">
                <upload-btn
                  title="Upload"
                  color="primary"
                  class="white--text"     
                  :loading="loading_upload"
                  :disabled="loading_upload"
                  :accept="SheetJSFT" 
                  :fileChangedCallback="_fileChanged"
                  >
                  <template slot="icon">
                    <v-icon right>cloud_upload</v-icon>
                  </template>
                </upload-btn>
              </div>
          </v-flex>
          <v-flex xs1>
              <div class="text-lg-left">
                  <v-btn color="primary" 
                  :loading="loading_export"
                  :disabled="loading_export"
                  v-on:click="export_api_data">
                  Dowload
                  <v-icon right>cloud_download</v-icon>
                </v-btn> 
              </div>
               
          </v-flex>   
        </v-layout>
    </v-flex>
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
  </div>
</template>
<script>
import UploadButton from 'vuetify-upload-button';
import XLSX from 'xlsx'
import ApiServices from '@/services/'

const make_cols = refstr => Array(XLSX.utils.decode_range(refstr).e.c + 1).fill(0).map((x,i) => ({name:XLSX.utils.encode_col(i), key:i}));
const _SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");

  export default {
    data: () => ({
      loading_export: false,
      loading_upload: true,
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
      //"snapShotProdDataItem":[{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000017","style":"BL DAKOTA","color":"BU BURGUNDY","size":"48-15","wPrice":59.95,"pPrice":47.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000024","style":"BL DAKOTA","color":"BLK BLACK","size":"48-15","wPrice":59.95,"pPrice":47.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"}]
      //"snapShotProdDataItem":[{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000017","style":"BL DAKOTA","color":"BU BURGUNDY","size":"48-15","wPrice":59.95,"pPrice":47.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000024","style":"BL DAKOTA","color":"BLK BLACK","size":"48-15","wPrice":59.95,"pPrice":47.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000031","style":"BL CHARLOTTE","color":"BLK BLACK","size":"49-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000048","style":"BL CHARLOTTE","color":"BLU BLUE","size":"49-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":2,"alert":1,"category":"Bloom Optical","role":"08 - Modern"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000055","style":"BL CHARLOTTE","color":"BU BURGUNDY","size":"49-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000062","style":"BL LILLIAN","color":"BU BURGUNDY","size":"48-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":2,"alert":1,"category":"Bloom Optical","role":"08 - Color"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000079","style":"BL LILLIAN","color":"BRN BROWN","size":"48-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":2,"alert":1,"category":"Bloom Optical","role":"08 - Modern"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000086","style":"BL LILLIAN","color":"PUR PURPLE","size":"48-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":2,"alert":1,"category":"Bloom Optical","role":"08 - Color"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000093","style":"BL PAULA","color":"PUR PURPLE","size":"49-16","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000109","style":"BL PAULA","color":"BLU BLUE","size":"49-16","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"}]
      //"snapShotProdDataItem":[{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000017","style":"BL DAKOTA","color":"BU BURGUNDY","size":"48-15","wPrice":59.95,"pPrice":47.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000024","style":"BL DAKOTA","color":"BLK BLACK","size":"48-15","wPrice":59.95,"pPrice":47.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000031","style":"BL CHARLOTTE","color":"BLK BLACK","size":"49-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000048","style":"BL CHARLOTTE","color":"BLU BLUE","size":"49-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":2,"alert":1,"category":"Bloom Optical","role":"08 - Modern"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000055","style":"BL CHARLOTTE","color":"BU BURGUNDY","size":"49-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000062","style":"BL LILLIAN","color":"BU BURGUNDY","size":"48-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":2,"alert":1,"category":"Bloom Optical","role":"08 - Color"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000079","style":"BL LILLIAN","color":"BRN BROWN","size":"48-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":2,"alert":1,"category":"Bloom Optical","role":"08 - Modern"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000086","style":"BL LILLIAN","color":"PUR PURPLE","size":"48-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":2,"alert":1,"category":"Bloom Optical","role":"08 - Color"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000093","style":"BL PAULA","color":"PUR PURPLE","size":"49-16","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000109","style":"BL PAULA","color":"BLU BLUE","size":"49-16","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"}]
      "snapShotProdDataItem":[{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000017","style":"BL DAKOTA","color":"BU BURGUNDY","size":"48-15","wPrice":59.95,"pPrice":47.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000024","style":"BL DAKOTA","color":"BLK BLACK","size":"48-15","wPrice":59.95,"pPrice":47.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000031","style":"BL CHARLOTTE","color":"BLK BLACK","size":"49-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000048","style":"BL CHARLOTTE","color":"BLU BLUE","size":"49-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":2,"alert":1,"category":"Bloom Optical","role":"08 - Modern"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000055","style":"BL CHARLOTTE","color":"BU BURGUNDY","size":"49-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000062","style":"BL LILLIAN","color":"BU BURGUNDY","size":"48-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":2,"alert":1,"category":"Bloom Optical","role":"08 - Color"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000079","style":"BL LILLIAN","color":"BRN BROWN","size":"48-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":2,"alert":1,"category":"Bloom Optical","role":"08 - Modern"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000086","style":"BL LILLIAN","color":"PUR PURPLE","size":"48-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":2,"alert":1,"category":"Bloom Optical","role":"08 - Color"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000093","style":"BL PAULA","color":"PUR PURPLE","size":"49-16","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000109","style":"BL PAULA","color":"BLU BLUE","size":"49-16","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"}],
      'test_snapshot':[{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000017","style":"BL DAKOTA","color":"BU BURGUNDY","size":"48-15","wPrice":59.95,"pPrice":47.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000024","style":"BL DAKOTA","color":"BLK BLACK","size":"48-15","wPrice":59.95,"pPrice":47.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000031","style":"BL CHARLOTTE","color":"BLK BLACK","size":"49-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000048","style":"BL CHARLOTTE","color":"BLU BLUE","size":"49-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":2,"alert":1,"category":"Bloom Optical","role":"08 - Modern"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000055","style":"BL CHARLOTTE","color":"BU BURGUNDY","size":"49-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000062","style":"BL LILLIAN","color":"BU BURGUNDY","size":"48-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":2,"alert":1,"category":"Bloom Optical","role":"08 - Color"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000079","style":"BL LILLIAN","color":"BRN BROWN","size":"48-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":2,"alert":1,"category":"Bloom Optical","role":"08 - Modern"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000086","style":"BL LILLIAN","color":"PUR PURPLE","size":"48-17","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":2,"alert":1,"category":"Bloom Optical","role":"08 - Color"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000093","style":"BL PAULA","color":"PUR PURPLE","size":"49-16","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"},{"image":"","brandId":38,"brand":"Bloom","fpc":"410878000109","style":"BL PAULA","color":"BLU BLUE","size":"49-16","wPrice":64.95,"pPrice":51.96,"status":"L_BUILD","frameFlag":null,"estRecoveryDate":null,"availableInventory":0,"ecpCount":16,"alert":1,"category":"Bloom Optical","role":"16 - Must Have"}]
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
        this.loading_export = true;
        /*
        const response = await ApiServices.getProgramFramesData()       
        this.sample_api_data = response.data.programFramesItem
        this._generateXLS(this.sample_api_data, 'programFramesItem')
        */
                
        const response = await ApiServices.getSnapShotProdData()       
        this.sample_api_data = response.data.snapShotProdDataItem
        this._generateXLS(this.sample_api_data, 'snapShotProdDataItem')
        
        this.loading_export = false;
        /*
        var WS = XLSX.utils.json_to_sheet(this.sample_api_data)         
        var wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, WS, 'ProdData')
        XLSX.writeFile(wb, 'snapShotProdDataItem.xlsx')       
        */
      },
      _generateXLS(data, filename) {
        var WS = XLSX.utils.json_to_sheet(data)         
        var wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, WS, filename)
        XLSX.writeFile(wb, filename+'.xlsx')       
      },
      _fileChanged (file) {
			  this._file(file);
      },
      _file(file) {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, {type:'binary'});
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, {header:1});

          /* Update state */
          this.data = data;
          this.cols = make_cols(ws['!ref']);

          //console.log(JSON.stringify(this.data))
          this._convertToJson(JSON.stringify(this.data))
          //console.log(this.data)				
        };
        reader.readAsBinaryString(file);		
          
      },
      _convertToJson(data)
      {
        //console.log(data);
        var arr = JSON.parse(data)			
        var labels = arr[0]
        
        var output = arr.slice(1).map(item => item.reduce((obj, val, index) => {
        obj[labels[index]] = val
        return obj
        }, {}))
        
        console.log(JSON.stringify(output))
      }
    },
    components: {
      'upload-btn': UploadButton
	}
}
</script>