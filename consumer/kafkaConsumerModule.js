"use strict";
var KafkaConsumerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaConsumerModule = void 0;
const tslib_1 = require("tslib");
const engine_1 = require("@appolo/engine");
const consumerClient_1 = require("./src/consumerClient");
let KafkaConsumerModule = KafkaConsumerModule_1 = class KafkaConsumerModule extends engine_1.Module {
    constructor() {
        super(...arguments);
        this.Defaults = {
            id: "kafkaConsumer",
            maxConnectTime: null,
            reconnectOnError: false
        };
    }
    static for(options) {
        return { type: KafkaConsumerModule_1, options };
    }
    get exports() {
        return [{ id: this.moduleOptions.id, type: consumerClient_1.ConsumerClient }];
    }
};
KafkaConsumerModule = KafkaConsumerModule_1 = tslib_1.__decorate([
    (0, engine_1.module)()
], KafkaConsumerModule);
exports.KafkaConsumerModule = KafkaConsumerModule;
//# sourceMappingURL=kafkaConsumerModule.js.map