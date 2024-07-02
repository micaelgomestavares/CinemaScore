import { AuthContextProvider } from './services/supabase/AuthContext.tsx';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import '../app/globals.css';
import { getUserService } from './services/supabase/User/get-user.ts';

async function initializeApp() {
  const user = await getUserService();

  (ReactDOM as any).createRoot(document.getElementById('root')!).render(
    <AuthContextProvider initialUser={user}>
      <App />
    </AuthContextProvider>
  );
}

initializeApp();
