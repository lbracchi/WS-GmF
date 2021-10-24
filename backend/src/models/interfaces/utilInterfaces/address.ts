export default interface Address {
    street: String,
    civicNumber: String,
    city: String,
    coordinates: {
        x: Number,
        y: Number
    }
}