"use strict";
var ProducerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProducerModule = void 0;
const tslib_1 = require("tslib");
const engine_1 = require("@appolo/engine");
const producerClient_1 = require("./src/producerClient");
let ProducerModule = ProducerModule_1 = class ProducerModule extends engine_1.Module {
    constructor() {
        super(...arguments);
        this.Defaults = {
            id: "kafkaProducer",
            maxConnectTime: null,
            reconnectOnError: false
        };
    }
    static for(options) {
        return { type: ProducerModule_1, options };
    }
    get exports() {
        return [{ id: this.moduleOptions.id, type: producerClient_1.ProducerClient }];
    }
};
ProducerModule = ProducerModule_1 = tslib_1.__decorate([
    engine_1.module()
], ProducerModule);
exports.ProducerModule = ProducerModule;
//# sourceMappingURL=producerModule.js.map