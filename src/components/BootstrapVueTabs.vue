<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <!-- Render Tabs -->
        <b-tab :title="`Tab ${i}`" v-for="i in snapShotNamesItems" :key="i.snapShotId" @click="tabSelected(i.snapShotId)">
           <template slot="title">
            {{i.snapShotName}}
          </template>
          
          <v-data-table
            :headers="headers"
            :items="sampledynamic"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.calories }}</td>
              <td class="text-xs-right">{{ props.item.fat }}</td>
              <td class="text-xs-right">{{ props.item.carbs }}</td>
              <td class="text-xs-right">{{ props.item.protein }}</td>
              <td class="text-xs-right">{{ props.item.iron }}</td>
            </template>
          </v-data-table>
          <br>
          <b-btn size="sm" variant="danger" class="float-right" @click="()=>closeTab(i)">
            Close tab
          </b-btn>
        </b-tab>

        <!-- New Tab Button (Using tabs slot) -->
        <b-nav-item slot="tabs" @click.prevent="newTab" href="#">
          +
        </b-nav-item>

        <!-- Render this if no tabs -->
        <div slot="empty" class="text-center text-muted">
          There are no open tabs
          <br> Open a new tab using + button.
        </div>
      </b-tabs>
    </b-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      snapShotNamesItems: [
        {
          "snapShotId": 0,
          "snapShotName": "sample 0"
        },
        {
          "snapShotId": 1,
          "snapShotName": "sample 1"
        },
        {
          "snapShotId": 4,
          "snapShotName": "sample 4"
        }
      ],
      tabs: [1,2,3,4],
      tabCounter: 5,
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
        sampledynamic: [],
        desserts1: [         
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          }
        ],
        desserts2: [
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
          }
        ]
    }
  },
  methods: {
    closeTab (x) {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i] === x) {
          this.tabs.splice(i, 1)
        }
      }
    },
    newTab () {
      this.tabs.push(this.tabCounter++)
    },
    tabSelected(id) {
      console.log(id)
      if (id==0)
        this.sampledynamic = this.desserts1
      else
        this.sampledynamic = this.desserts2
    }
  }
}
</script>

<!-- dynamic-tabs.vue -->