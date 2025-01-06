import './App.css'
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { MainRoutes } from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { onApiCallRetry } from './utils/errroAPICall';
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
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MainRoutes />
      </QueryClientProvider>
    </Provider>
  )
}

export default App
