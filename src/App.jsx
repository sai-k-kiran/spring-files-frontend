import Sidebar from './components/shared/sidebar'
import './App.css'
import { useEffect, useState } from 'react'
import { getCustomers } from './services/client.js'
import { Spinner, Text } from '@chakra-ui/react'

const App = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getCustomers().then(res => {
      setCustomers(res.data)
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  if(loading){
    return(
      <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
    )
  }
  
  return(
    <div className = "App">
       <Sidebar customer={customers} />
    </div>
  )
}

export default App
