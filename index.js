"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaProducerModule = exports.KafkaConsumerModule = void 0;
exports.kafka = require("kafkajs");
var kafkaConsumerModule_1 = require("./consumer/kafkaConsumerModule");
Object.defineProperty(exports, "KafkaConsumerModule", { enumerable: true, get: function () { return kafkaConsumerModule_1.KafkaConsumerModule; } });
var kafkaProducerModule_1 = require("./producer/kafkaProducerModule");
Object.defineProperty(exports, "KafkaProducerModule", { enumerable: true, get: function () { return kafkaProducerModule_1.KafkaProducerModule; } });
//# sourceMappingURL=index.js.map