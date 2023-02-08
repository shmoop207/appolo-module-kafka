"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerClient = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const kafkajs_1 = require("kafkajs");
const utils_1 = require("@appolo/utils");
let ConsumerClient = class ConsumerClient {
    async get() {
        let kafka = new kafkajs_1.Kafka(this.moduleOptions.config);
        const consumer = kafka.consumer(this.moduleOptions.consumerConfig);
        if (this.moduleOptions.reconnectOnError) {
            consumer.on("consumer.disconnect", () => setTimeout(() => this._connect(consumer), 5000));
        }
        let [err] = await utils_1.Promises.to(utils_1.Promises.timeout(this._connect(consumer), this.moduleOptions.maxConnectTime || Number.MAX_SAFE_INTEGER));
        if (err && !this.moduleOptions.reconnectOnError) {
            throw err;
        }
        return consumer;
    }
    async _connect(consumer) {
        try {
            await consumer.connect();
            this.logger.info("connected to kafka");
        }
        catch (e) {
            this.logger.error("failed to connect to kafka", { e });
            if (this.moduleOptions.reconnectOnError) {
                setTimeout(() => this._connect(consumer), 5000);
            }
            else {
                throw e;
            }
        }
    }
};
tslib_1.__decorate([
    (0, inject_1.inject)()
], ConsumerClient.prototype, "logger", void 0);
tslib_1.__decorate([
    (0, inject_1.inject)()
], ConsumerClient.prototype, "moduleOptions", void 0);
ConsumerClient = tslib_1.__decorate([
    (0, inject_1.define)(),
    (0, inject_1.singleton)(),
    (0, inject_1.factory)()
], ConsumerClient);
exports.ConsumerClient = ConsumerClient;
//# sourceMappingURL=consumerClient.js.map