import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Sample1 from '@/components/Sample1'
import Sample2 from '@/components/Sample2'
import Sample3 from '@/components/Sample3'
import Sample4 from '@/components/Sample4'
import VuetifyDataTable from '@/components/VuetifyDataTable'
import FrameExceptions from '@/components/FrameExceptions'
import BootstrapVueTabs from '@/components/BootstrapVueTabs'
import VueDropzone from '@/components/VueDropzone'
import BootsrapVueInputFile from '@/components/BootsrapVueInputFile'
import DashboardCard from '@/components/DashboardCard'
import Timeline from '@/components/Timeline'
import Subheaders from '@/components/Subheaders'
import VueditorSample from '@/components/VueditorSample'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/sample1',
      name: 'Sample 1',
      component: Sample1
    },
    {
      path: '/sample2',
      name: 'Samplex 2',
      component: Sample2
    },
    {
      path: '/sample3',
      name: 'Sample 3',
      component: Sample3
    },
    {
      path: '/sample4',
      name: 'Sample 4',
      component: Sample4
    },
    {
      path: '/VuetifyDataTable',
      name: 'Vuetify Data Table',
      component: VuetifyDataTable
    },
    {
      path: '/FrameExceptions',
      name: 'FrameExceptions',
      component: FrameExceptions
    },
    {
      path: '/BootstrapVueTabs',
      name: 'BootstrapVueTabs',
      component: BootstrapVueTabs
    },
    {
      path: '/VueDropzone',
      name: 'VueDropzone',
      component: VueDropzone
    },
    {
      path: '/BootsrapVueInputFile',
      name: 'BootsrapVueInputFile',
      component: BootsrapVueInputFile
    },
    {
      path: '/DashboardCard',
      name: 'DashboardCard',
      component: DashboardCard
    },
    {
      path: '/Timeline',
      name: 'Timeline',
      component: Timeline
    },
    {
      path: '/Subheaders',
      name: 'Subheaders',
      component: Subheaders
    },
    {
      path: '/VueditorSample',
      name: 'VueditorSample',
      component: VueditorSample
    }    
  ]
})
