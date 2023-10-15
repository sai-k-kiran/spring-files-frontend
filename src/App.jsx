import Sidebar from './components/shared/sidebar'
import './App.css'
import { useEffect, useState } from 'react'
import { getCustomers } from './services/client.js'
import { Spinner } from '@chakra-ui/react'

const App = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchCustomers = () => {
    setLoading(true)
    getCustomers().then(res => {
      setCustomers(res.data)
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  if(loading){
    return (
      <div className='outer'>
        <div className='inner'>
          <div className='center'>
            <Spinner
              thickness='12px'
              speed='0.65s'
              emptyColor='transparent'
              color='rgb(49, 151, 149)'
              height='200px'
              width='200px'
            />
          </div>
        </div>
      </div>
    )
  }

  
  return(
    <div className = "App">
       <Sidebar customer={customers} fetchCustomers={fetchCustomers} loading={loading}/>
    </div>
  )
}

export default App
