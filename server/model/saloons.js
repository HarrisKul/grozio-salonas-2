import { DataTypes } from 'sequelize'

const Saloons = (sequelize) => {
    const Schema = {
        address: {
            type: DataTypes.STRING, 
            allowNull: false 
        },
        name: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    }

    return sequelize.define('saloons', Schema)
}

export default Saloons