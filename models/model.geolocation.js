var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GeolocationSchema = new Schema({
    name: {}
});

module.exports = mongoose.model('Geolocation', GeolocationSchema);
