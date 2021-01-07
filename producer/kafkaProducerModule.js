"use strict";
var KafkaProducerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaProducerModule = void 0;
const tslib_1 = require("tslib");
const engine_1 = require("@appolo/engine");
const producerClient_1 = require("./src/producerClient");
let KafkaProducerModule = KafkaProducerModule_1 = class KafkaProducerModule extends engine_1.Module {
    constructor() {
        super(...arguments);
        this.Defaults = {
            id: "kafkaProducer",
            maxConnectTime: null,
            reconnectOnError: false
        };
    }
    static for(options) {
        return { type: KafkaProducerModule_1, options };
    }
    get exports() {
        return [{ id: this.moduleOptions.id, type: producerClient_1.ProducerClient }];
    }
};
KafkaProducerModule = KafkaProducerModule_1 = tslib_1.__decorate([
    engine_1.module()
], KafkaProducerModule);
exports.KafkaProducerModule = KafkaProducerModule;
//# sourceMappingURL=kafkaProducerModule.js.map