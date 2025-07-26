
import './App.css'
import { Button } from './components/Button'
import { PlusIcon } from './icons/PlusIcon'

function App() {

  return (
    <>
  <Button startIcon={<PlusIcon size='lg'/>} variant='secondry' text="Share Brain" size='md' onClick={()=>{}}/>
  <Button variant='primary' text="Add Content" size='md' onClick={()=>{}}/>
    </>
  )
}

export default App
