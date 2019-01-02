<template>
  <v-app :dark="darkTheme">
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app      
    >
      <v-toolbar flat color="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="./assets/logo.png">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Frame Dream</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="_selected(item)" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped" color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>       
        <v-btn slot="activator" flat icon>
          <v-icon>edit</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(item, index) in coloritems" :key="index" @click="_changecolor(item)">
            <v-list-tile-title><div :class="item.colorname"><v-badge></v-badge></div></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn icon>
        <v-switch v-model="darkTheme"></v-switch>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed app>
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>
<script>
import colors from 'vuetify/es5/util/colors'
export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{ title: 'Inspire', icon: 'bubble_chart', path: '/'},
              { title: 'Sample Tabs', icon: 'dashboard', path: '/sample1'},
              { title: 'Sample Data Table', icon: 'question_answer', path: '/sample2' },
              { title: 'Sample Loading buttons', icon: 'android', path: '/sample3' },
              { title: 'Grid system', icon: 'android', path: '/sample4' },
              { title: 'Vuetify Data Table', icon: 'dashboard', path: '/VuetifyDataTable' },
              { title: 'Frame Exceptions', icon: 'dashboard', path: '/FrameExceptions' },
              { title: 'Bootstrap Vue Tabs', icon: 'dashboard', path: '/BootstrapVueTabs' },
              { title: 'Vue Dropzone', icon: 'cloud_upload', path: '/VueDropzone' },
              { title: 'BootsrapVueInputFile', icon: 'cloud_upload', path: '/BootsrapVueInputFile' },
              { title: 'DashboardCard', icon: 'dashboard', path: '/DashboardCard' }
              ],
      coloritems: [{ title: 'Blue', color: colors.blue, colorname: 'blue' },
                  { title: 'Green', color: colors.green, colorname: 'green' },
                  { title: 'Purple', color: colors.purple, colorname: 'purple' },
                  { title: 'Red', color: colors.red.darken1, colorname: 'red' },
                  { title: 'Brown', color: colors.brown.darken1, colorname: 'brown' }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      darkTheme: false
    }
  },
  methods: {
    _selected(selected)
    {
      console.log(selected.icon)
      //this.$vuetify.theme.primary = colors.purple;
    },
    _changecolor(selected) {
      this.$vuetify.theme.primary = selected.color;
    }
  },
  name: 'App'
}
</script>
