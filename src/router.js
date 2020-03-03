import VueRouter from 'vue-router'
import Foo from './components/Foo'
import Voo from './components/Voo'
import Login from './pages/Login'

export default new VueRouter({
    routes : [
      {
        path: '/foo',
        component: Foo,
        children: [
          {
            path: 'voo',
            component: Voo,
            
          }
        ]
      },
      { path: '/login', component: Login }
    ]
  })