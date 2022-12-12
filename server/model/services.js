import { DataTypes } from 'sequelize'

const Services = (sequelize) => {
    const Schema = {
        name: {
            type: DataTypes.STRING, 
            allowNull: false 
        },
        duration: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2), 
            allowNull: false
        }
    }

    return sequelize.define('services', Schema)
}

export default Services