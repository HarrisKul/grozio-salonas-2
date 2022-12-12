import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../context/MainContext'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
    const { setAlert } = useContext(MainContext)

    const handleRatings = (e, workerId, orderId) => {
        axios.post('/api/ratings/worker/' + workerId + '/order/' + orderId, {
            rating: e.target.value
        })
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })
            setRefresh(!refresh)
        })
        .catch(error => {
            console.log(error)
            setAlert({
                message: error.response.data,
                status: 'danger'
            })

            if(error.response.status === 401)
                navigate('/login')
        })
    }

    useEffect(() => {
        axios.get('/api/orders/user/')
            .then(resp => setOrders(resp.data))
            .catch(error => {
                console.log(error)
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })

                if(error.response.status === 401)
                    navigate('/login')
            })
    }, [setAlert, refresh])

    return (
        <>
            <div className="page-heading">
                <h1>Jūsų Užsakymai</h1>
            </div>
            {orders ?
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Užsakymo data</th>
                            <th>Salonas</th>
                            <th>Paslauga</th>
                            <th>Darbuotojas</th>
                            <th>Statusas</th>
                            <th>Meistro įvertinimas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order =>
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{new Date(order.order_date).toLocaleString('lt-LT')}</td>
                                <td>{order.service.saloon.name}</td>
                                <td>{order.service?.name}</td>
                                <td>{order.worker.first_name + ' ' + order.worker.last_name}</td>
                                <td>{order.status ? 'Patvirtintas' : 'Nepatvirtintas'}</td>
                                <td>
                                    {order.rating ? 'Jūsų įvertinimas: ' + order.rating.rating :
                                        <select onChange={(e) => handleRatings(e, order.workerId, order.id)}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    }
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                :
                <h3>Nėra registruotų užsakymų</h3>
            }
        </>
    )
}

export default Orders