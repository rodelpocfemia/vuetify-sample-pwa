<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="programFramesItems"
      :search="search"
      :pagination.sync="pagination"
      hide-actions
      class="elevation-1"
    >
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.fpc }}</td>
        <td class="text-xs-right">{{ props.item.programKey }}</td>
        <td class="text-xs-right">{{ props.item.roleType }}</td>
        <td class="text-xs-right">{{ props.item.moduleId }}</td>
        <td class="text-xs-right">{{ props.item.inventoryAlertLevel }}</td>
        <td class="text-xs-right">{{ props.item.wholesalePrice }}</td>
        <td class="text-xs-right">{{ props.item.purchasePrice }}</td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
    <v-btn color="primary" @click="viewpage">asdf</v-btn> 
  </div>
</template>
<script>
import ApiServices from '@/services/'

  export default {
    data () {
      return {
        search: '',
        pagination: {},
        selected: [],
        headers: [
          {
            text: 'FPC',
            align: 'left',
            sortable: true,
            value: 'fpc'
          },
          { text: 'Program Key', value: 'programKey' },
          { text: 'Role Type', value: 'roleType' },
          { text: 'Module ID', value: 'moduleId' },
          { text: 'Inventory Alert Level', value: 'inventoryAlertLevel' },
          { text: 'Whole Sale Price', value: 'wholesalePrice' },
          { text: 'Purchase Price', value: 'purchasePrice' }
        ],
        //"programFramesItems":[{"fpc":"409717007973","programKey":"VWFD","roleType":"MODULE","moduleId":10,"inventoryAlertLevel":1,"wholesalePrice":55.59,"purchasePrice":48.92},{"fpc":"409717008000","programKey":"VWFD","roleType":"MODULE","moduleId":14,"inventoryAlertLevel":1,"wholesalePrice":41.59,"purchasePrice":37.43},{"fpc":"409717008017","programKey":"VWFD","roleType":"POOL","moduleId":0,"inventoryAlertLevel":1,"wholesalePrice":56.0,"purchasePrice":49.28},{"fpc":"409717007973","programKey":"VWFD","roleType":"MODULE","moduleId":10,"inventoryAlertLevel":1,"wholesalePrice":55.59,"purchasePrice":48.92},{"fpc":"409717008000","programKey":"VWFD","roleType":"MODULE","moduleId":14,"inventoryAlertLevel":1,"wholesalePrice":41.59,"purchasePrice":37.43},{"fpc":"409717008017","programKey":"VWFD","roleType":"POOL","moduleId":0,"inventoryAlertLevel":1,"wholesalePrice":56.0,"purchasePrice":49.28}],
        "programFramesItems": null
      }
    },
    methods: {
      async load_data(){       
        const response = await ApiServices.getProgramFramesData()
        this.programFramesItems = JSON.stringify(response.data.programFramesItem)
        this.programFramesItems = JSON.parse(this.programFramesItems)
      },
      viewpage() {
            console.log(this.pagination.rowsPerPage)
            console.log(this.pagination.totalItems)
            console.log(this.pages)
            console.log(this.programFramesItems)
        }
    },
    mounted: function() {
      this.load_data()
      console.log(this.programFramesItems)
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          c == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    }
  }
</script>