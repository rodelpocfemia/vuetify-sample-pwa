import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Sample1 from '@/components/Sample1'
import Sample2 from '@/components/Sample2'
import Sample3 from '@/components/Sample3'

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
    }
  ]
})
