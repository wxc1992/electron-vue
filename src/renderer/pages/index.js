
import Login from './Login.vue';
// 喜马拉雅新的菜单 --一下是新的
// // 信评3.0 start
  
// 信评的数据管理
const NewdataManage =()=>
      import(/*webpackChunkName: "NewdataManage"*/'../components/newCreating/newdataManage.vue')
const NewdataUpdate =()=>
      import(/*webpackChunkName: "NewdataUpdate"*/'../components/newCreating/datamanage/dataUpdate.vue')
const NewupdateAudit =()=>
      import(/*webpackChunkName: "NewupdateAudit"*/'../components/newCreating/datamanage/updateAudit.vue')
const subjectprotect =()=>
      import(/*webpackChunkName: "subjectprotect"*/'../components/newCreating/datamanage/subjectprotect.vue')
const newComment =()=>
      import(/*webpackChunkName: "newComment"*/'../components/newCreating/comment.vue')
const newCommentApply =()=>
      import(/*webpackChunkName: "newCommentApply"*/'../components/newCreating/comment/applyComment.vue')
const myComment =()=>
      import(/*webpackChunkName: "myComment"*/'../components/newCreating/comment/mycomment.vue')
const commenmain =()=>
      import(/*webpackChunkName: "commenmain"*/'../components/newCreating/comment/commentMain.vue')
const finance =()=>
      import(/*webpackChunkName: "finance"*/'../components/newCreating/financeData.vue')
const deepComment =()=>
      import(/*webpackChunkName: "deepComment"*/'../components/newCreating/deepComment.vue')
const creatingWhite =()=>
      import(/*webpackChunkName: "creatingWhite"*/'../components/newCreating/creatingWhite.vue')
const creatingHome=()=>
      import(/*webpackChunkName: "creatingHome"*/'../components/newCreating/marshome.vue')
// 信评3.0 end

import newHome from './newHmly.vue';

const newCreating =()=>
      import(/*webpackChunkName: "newCreating"*/'./newCreating.vue')
const newCreatingMars=()=>
      import(/*webpackChunkName: "newCreatingMars"*/'../components/newCreating/mars.vue')
const creatingMain=()=>
      import(/*webpackChunkName: "creatingMain"*/'../components/newCreating/creatingMain.vue')

export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: newHome,
    children: [
      {
        path: '/newSSG',
        component: newCreating,
        meta:{appCode:'ssg3.0'},
        children: [
          {
            path: 'newSSGhome',
            name: 'newSSGhome',
            component: creatingHome,
            meta:{activeName:'/newSSG'}
          },
          {
            path: 'newCreatingMars',
            name: 'newCreatingMars',
            component: newCreatingMars,
            meta:{activeName:'/newSSG'}
          },
          {
            path: 'creating_main',
            name: 'creating_main',
            component: creatingMain,
            meta:{activeName:'/newSSG'}
          },
          {
            path: 'comment',
            component: newComment,
            children: [
              {
                  path:':id',
                  meta:{
                    activeName:'/newSSG/comment/:id'
                  },
                  component:commenmain
              },
              {
                path:'newCommentApply',
                name: 'newCommentApply',
                component:newCommentApply
              },
              {
                path:'mycomment',
                name: 'mycomment',
                component:myComment
              },
            ]
          },

          {
            path: 'creating_f',
            component: finance,
            name: 'creating_f',
            meta:{activeName:'/newSSG'}
          },
          {
            path: 'deep_comment',
            component: deepComment,
            name: 'deep_comment',
            meta:{activeName:'/newSSG'}
          },
          {
            path: 'creating_white',
            component: creatingWhite,
            name: 'creating_white',
            meta:{activeName:'/newSSG'}
          },
          {
            path: 'datanamagement',
            component: NewdataManage,
            name: 'datanamagement',
            meta:{activeName:'/newSSG'},
            children: [
              {
                  path:'dataUpdate',
                  name: 'dataUpdate',
                  meta:{
                    activeName:'/newSSG/datanamagement/dataUpdate'
                  },
                  component:NewdataUpdate
              },
              {
                  path:'updateAudit',
                  name: 'updateAudit',
                  meta:{
                    activeName:'/newSSG/datanamagement/updateAudit'
                  },
                  component:NewupdateAudit
              },
              {
                path:'subjectProtect',
                name: 'subjectProtect',
                meta:{
                  activeName:'/newSSG/datanamagement/subjectProtect'
                },
                component:subjectprotect
            }
            ]
          },
        ]
      }
    ],
  },

];

