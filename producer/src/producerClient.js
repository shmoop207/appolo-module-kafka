"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProducerClient = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const kafkajs_1 = require("kafkajs");
const utils_1 = require("@appolo/utils");
let ProducerClient = class ProducerClient {
    async get() {
        let kafka = new kafkajs_1.Kafka(this.moduleOptions.config);
        const producer = kafka.producer(this.moduleOptions.producerConfig);
        if (this.moduleOptions.reconnectOnError) {
            producer.on("producer.disconnect", () => this._reconnect(producer));
        }
        let [err] = await utils_1.Promises.to(utils_1.Promises.timeout(this._connect(producer), this.moduleOptions.maxConnectTime || Number.MAX_SAFE_INTEGER));
        if (err && !this.moduleOptions.reconnectOnError) {
            throw err;
        }
        return producer;
    }
    async _connect(producer) {
        try {
            await producer.connect();
            this.logger.info("connected to kafka");
        }
        catch (e) {
            this.logger.error("failed to connect to kafka", { e });
            if (this.moduleOptions.reconnectOnError) {
                this._reconnect(producer);
            }
            else {
                throw e;
            }
        }
    }
    _reconnect(producer) {
        clearTimeout(this._interval);
        this._interval = setTimeout(() => this._connect(producer), 5000);
    }
};
tslib_1.__decorate([
    (0, inject_1.inject)()
], ProducerClient.prototype, "logger", void 0);
tslib_1.__decorate([
    (0, inject_1.inject)()
], ProducerClient.prototype, "moduleOptions", void 0);
ProducerClient = tslib_1.__decorate([
    (0, inject_1.define)(),
    (0, inject_1.singleton)(),
    (0, inject_1.factory)()
], ProducerClient);
exports.ProducerClient = ProducerClient;
//# sourceMappingURL=producerClient.js.map