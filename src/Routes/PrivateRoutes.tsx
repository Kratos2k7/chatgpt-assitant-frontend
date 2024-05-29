import GeneralError from '@/pages/errors/general-error'

export default function privateRoutes() {
    return {
            path: '/',
            lazy: async () => {
              const AppShell = await import('../components/app-shell')
              return { Component: AppShell.default }
            },
            errorElement: <GeneralError />,
            children: [
              {
                index: true,
                lazy: async () => ({
                  Component: (await import('../pages/mainPage')).default,
                }),
              },  
            ],
    }
}