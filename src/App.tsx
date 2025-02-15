import './App.css'
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { MainRoutes } from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { onApiCallRetry } from './utils/errroAPICall';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 3000,
        retry: (failureCount, error) => onApiCallRetry(failureCount, error),
      },
    },
  });

  return (
    <GoogleOAuthProvider clientId="391066358262-m64c2bprqoh4ibso55nv6eusk6gcgmol.apps.googleusercontent.com">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MainRoutes />
        </QueryClientProvider>
      </Provider>
    </GoogleOAuthProvider>
  )
}

export default App
