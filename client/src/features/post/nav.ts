import { NavigatorParams } from 'Models'
import { InboxOutlined } from '@ant-design/icons'
import React, { lazy } from 'react'
import { createNav } from '../../utils/createNav'

const PostList = lazy(() => import('./PostList'))
const PostCreate = lazy(() => import('./PostCreate'))
const PostDetail = lazy(() => import('./PostDetail'))
const PostEdit = lazy(() => import('./PostEdit'))

export const postNavName: string = 'post'

export const nav: NavigatorParams[] = [
  {
    path: `/${postNavName}/edit/:id`,
    name: 'Sửa bài viết',
    isMenu: false,
    isProtected: true,
    component: PostEdit,
    resources: postNavName
  },
  {
    path: `/${postNavName}/detail/:id`,
    name: 'Xem bài viết',
    isMenu: false,
    isProtected: true,
    component: PostDetail,
    resources: postNavName
  },

  {
    path: `/${postNavName}/create`,
    name: 'Tạo bài viết',
    isMenu: false,
    isProtected: true,
    component: PostCreate,
    resources: postNavName
  },
  {
    path: `/${postNavName}`,
    name: 'Bài viết',
    isMenu: true,
    isProtected: true,
    icon: React.createElement(InboxOutlined),
    component: PostList,
    resources: postNavName
  }
]

export const { postMenu, postNav } = createNav({
  nav,
  name: postNavName
})
