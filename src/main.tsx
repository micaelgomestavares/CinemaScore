import { AuthContextProvider } from './services/supabase/AuthContext.tsx';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../app/globals.css';

import { getUserService } from './services/supabase/User/get-user.ts';
const user = await getUserService();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthContextProvider initialUser={user} >
        <App />
    </AuthContextProvider>
)
