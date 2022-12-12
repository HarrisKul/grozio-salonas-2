import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import MainContext from '../context/MainContext'
import axios from 'axios'

const Saloons = () => {
    const [saloons, setSaloons] = useState([])
    const [sort, setSort] = useState('')
    const { setAlert, userInfo } = useContext(MainContext)

    useEffect(() => {
        let url = '/api/saloons/'

        if(sort == '1' || sort == '2')
            url += '?sort=' + sort

        console.log(url)

        axios.get(url)
        .then(resp => setSaloons(resp.data))
        .catch(error => {
            console.log(error)
            setAlert({
                message: error.response.data,
                status: 'danger'
            })
        })
    }, [sort])

    return (
        <>
            <h1>Salonų sąrašas</h1>
            <select onChange={(e) => setSort(e.target.value)}>
                <option>Pagal ID</option>
                <option value="1">Pagal pavadinimą A-Ž</option>
                <option value="2">Pagal pavadinimą Ž-A</option>
            </select>
            {saloons && saloons.map(saloon =>
                <div key={saloon.id} style={{ marginBottom: 30, borderBottom: '3px solid black' }}>
                    <div><strong>{saloon.name}</strong></div>
                    <div>{saloon.address}</div>
                    <div>{saloon.phone}</div>
                    <div>
                        <Link 
                            to={userInfo.id ? '/new-order/' + saloon.id : '/login'} 
                            className="btn btn-primary"
                        >
                            Rezervuoti laiką
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default Saloons