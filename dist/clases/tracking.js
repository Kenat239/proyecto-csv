"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const track_1 = __importDefault(require("./track"));
class Gps {
    constructor(positionTracker) {
        this.positionTracker = positionTracker;
    }
    start() {
        this.positionTracker.subscribe(c => {
            alert(`lat: ${c.latitude}; lon: ${c.longitude}`);
        });
    }
}
exports.default = Gps;
let tracker = new track_1.default(true);
let gps = new Gps(tracker);
gps.start();
