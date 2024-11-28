import { APIProvider } from '@vis.gl/react-google-maps';
import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { PrimeReactProvider } from 'primereact/api';
import AppRouter from './routes/app.routes';

function App() {
  return (
    <PrimeReactProvider>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
        <AppRouter />
      </APIProvider>
    </PrimeReactProvider>
  )
}

export default App
