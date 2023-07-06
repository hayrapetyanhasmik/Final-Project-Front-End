import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {store} from './app/store'

ReactDOM.createRoot(document.getElementById('root')as HTMLElement).render(
  
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    
  
)
