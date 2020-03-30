"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GeoLocationPositionTracker {
    constructor(enableHighAccuracy = true) {
        this.enableHighAccuracy = enableHighAccuracy;
    }
    subscribe(onNewPosition) {
        const options = {
            enableHighAccuracy: this.enableHighAccuracy,
            maximumAge: 15000
        };
        navigator.geolocation.watchPosition((position) => {
            onNewPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, null, options);
    }
}
exports.default = GeoLocationPositionTracker;
