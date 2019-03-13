// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import XLSX from 'xlsx'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuex from 'vuex'
import Vueditor from 'vueditor'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import emojiComponet from 'vueditor/dist/plugins/emoji.min.js'
import emojiComponet from '@/plugins/emoji'

let config = {
 
  // buttons on the toolbar, you can use '|' or 'divider' as the separator
  toolbar: [
    'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
    'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
    'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
    'insertOrderedList', 'insertUnorderedList', '|', 'emoji', 'picture', 'tables', '|', 'switchView'
  ],

  // the font-family select's options, "val" refer to the actual css value, "abbr" refer to the option's text
  // "abbr" is optional when equals to "val";
  fontName: [
   
    {val: "arial black"}, {val: "times new roman"}, {val: "Courier New"}
  ],

  // the font-size select's options
  fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],

  // the emoji list, you can get full list here: http://unicode.org/emoji/charts/full-emoji-list.html
  emoji: ["1f603"],
  //emoji: [{val:"1f603"}],

  // default is Chinese, to set to English use lang: 'en'
  //lang: 'en',

  // mode options: default | iframe
  mode: 'default',

  // if mode is set to 'iframe', specify a HTML file path here
  iframePath: '',

   // your file upload url, the return result must be a string refer to the uploaded image, leave it empty will end up with local preview
  fileuploadUrl: '',
  plugins: [
    {
      name: 'emoji',
      // the toolbar element, will produce: '<a href="javascript:;" title="Insert Emoji" unselectable="on"><i class="icon-smile-o"></i></a>',
      element: {
        type: 'button',
        lang: {
          title: 'Insert Emoji'
        },
        className: 'icon-smile-o'
      },
      // the component object
      component: emojiComponet
    }
  ]
  
};

Vue.use(BootstrapVue)
Vue.use(Vuetify)
Vue.use(XLSX)
Vue.use(axios)
Vue.use(Vuex)
Vue.use(Vueditor, config)

library.add(faDownload)
Vue.component('fa-icon', FontAwesomeIcon)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
