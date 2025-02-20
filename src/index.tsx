import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {router} from "./app/routes/Routes.tsx";
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore.ts';
import {GoogleOAuthProvider} from "@react-oauth/google";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="">
      <RouterProvider router={router}/>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
)
