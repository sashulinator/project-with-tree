import { createRoot } from 'react-dom/client'

import getRootElement from '../lib/dom/get-root-element'
import App from './app'

createRoot(getRootElement()).render(<App />)
