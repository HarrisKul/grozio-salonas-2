import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

//Admino komponentai
import Saloons from './pages/admin/Saloons/Saloons'
import NewSaloon from './pages/admin/Saloons/New'
import EditSaloon from './pages/admin/Saloons/Edit'
import Services from './pages/admin/Services/Services'
import NewService from './pages/admin/Services/New'
import EditService from './pages/admin/Services/Edit'
import Workers from './pages/admin/Workers/Workers'
import NewWorker from './pages/admin/Workers/New'
import EditWorker from './pages/admin/Workers/Edit'
import Orders from './pages/admin/Orders/Orders'
import EditOrder from './pages/admin/Orders/Edit'
//Vartotojo komponentai
import PublicSaloons from './pages/Saloons'
import PublicWorkers from './pages/Workers'
import PublicNewOrder from './pages/NewOrder'
import PublicOrders from './pages/Orders'

//Autentifikacijos komponentai
import Login from './pages/Login'
import Register from './pages/Register'

//Kontekstas
import MainContext from './context/MainContext'

//Baziniai komponentai
import Header from './components/Header/Header'
import Alert from './components/Alert/Alert'
import './App.css';

const App = () => {

  const [alert, setAlert] = useState({
    message: '',
    status: ''
  })
  const [userInfo, setUserInfo] = useState({})

  const contextValues = { alert, setAlert, userInfo, setUserInfo }

  useEffect(() => {
    axios.get('/api/users/check-auth/')
    .then(resp => {
      setUserInfo(resp.data)
    })
  }, [])

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <div className="container">
          <Alert />
          <Routes>
            {/* Admin keliai */}
            {userInfo.role === 1 &&
              <Route path="admin">
                <Route index element={<Saloons />} />
                <Route path="saloons/new" element={<NewSaloon />} />
                <Route path="saloons/edit/:id" element={<EditSaloon />} />
                <Route path="services" element={<Services />} />
                <Route path="services/new" element={<NewService />} />
                <Route path="services/edit/:id" element={<EditService />} />
                <Route path="workers" element={<Workers />} />
                <Route path="workers/new" element={<NewWorker />} />
                <Route path="workers/edit/:id" element={<EditWorker />} />
                <Route path="orders" element={<Orders />} />
                <Route path="orders/edit/:id" element={<EditOrder />} />
              </Route>
            }
            {/* Vieši keliai */}
            <Route path="/" element={<PublicSaloons />} />
            <Route path="workers" element={<PublicWorkers />} />
            {userInfo.id &&
              <>
                <Route path="new-order/:saloonId" element={<PublicNewOrder />} />
                <Route path="orders" element={<PublicOrders />} />
              </>
            }
            
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  )
}

export default App
