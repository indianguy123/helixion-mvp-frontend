export const API = {
   AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      SEND_PASSWORD_RESET_LINK: '/auth/send-reset-link',
      RESET_PASSWORD: '/auth/reset-password'
   },
   ADMIN: {
      USERS: '/admin/users',
      REGISTRATIONS: '/admin/registrations',
      USERS_SEARCH: '/admin/users/search',
      BATCH_CREATE: '/admin/users/batch',
      DEACTIVATE_USER: (id: string) => `/admin/users/${ id }/deactivate`,
   },
   EMPLOYEE: {
      DASHBOARD: '/employee/dashboard'
   },
   TRAINGPROVIDER:{
      CREATEPROGRAM:'/training-provider/create/program'
   }
}