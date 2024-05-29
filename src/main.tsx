import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import '@/index.css'
import privateRoutes from './Routes/PrivateRoutes'
import axios from 'axios'

const isAuthenticated = () => {
  return true;
};
function App() {
  const router = createBrowserRouter([
    isAuthenticated() ? privateRoutes() : {},
  ]);
  return <RouterProvider router={router} />;
}
axios.interceptors.request.use(function (config:any) {
  const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  config.metadata = { startTime: new Date() };
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use((response:any) => {
  const startTime:any = response.config.metadata.startTime;
  const responseTime:any = new Date().getTime() - startTime;
  const modifiedResponse:any = {
    data: response.data,
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
    responseTime: responseTime,
  };
  return modifiedResponse;
}, function (error) {
  return Promise.reject(error);
});
ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <App />
      <Toaster />
    </ThemeProvider>
)
