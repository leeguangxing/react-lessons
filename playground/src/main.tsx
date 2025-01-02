// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'

// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
// 	<StrictMode>
// 		<App />
// 	</StrictMode>
// )

import { createRoot } from 'mini-react-dom/client'

const element = document.createElement('div')
element.innerText = 'Hello, Mini React DOM!'

createRoot(document.getElementById('root')!).render(element)
