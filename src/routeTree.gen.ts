/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as AuthRegisterIndexImport } from './routes/_auth/register/index'
import { Route as AuthLoginIndexImport } from './routes/_auth/login/index'

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthRegisterIndexRoute = AuthRegisterIndexImport.update({
  path: '/register/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLoginIndexRoute = AuthLoginIndexImport.update({
  path: '/login/',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_auth/login/': {
      id: '/_auth/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginIndexImport
      parentRoute: typeof AuthImport
    }
    '/_auth/register/': {
      id: '/_auth/register/'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof AuthRegisterIndexImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthRoute: AuthRoute.addChildren({
    AuthLoginIndexRoute,
    AuthRegisterIndexRoute,
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/login/",
        "/_auth/register/"
      ]
    },
    "/_auth/login/": {
      "filePath": "_auth/login/index.tsx",
      "parent": "/_auth"
    },
    "/_auth/register/": {
      "filePath": "_auth/register/index.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
