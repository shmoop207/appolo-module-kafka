"use strict";
import {define, factory, IFactory, inject, singleton} from '@appolo/inject';
import {ILogger} from "@appolo/logger";
import {Kafka, Consumer} from 'kafkajs';
import {Promises} from '@appolo/utils';
import {IConsumerOptions} from "./IConsumerOptions";


@define()
@singleton()
@factory()
export class ConsumerClient implements IFactory<Consumer> {

    @inject() logger: ILogger;
    @inject() moduleOptions: IConsumerOptions

    public async get(): Promise<Consumer> {


        let kafka = new Kafka(this.moduleOptions.config);

        const consumer = kafka.consumer(this.moduleOptions.consumerConfig);

        if (this.moduleOptions.reconnectOnError) {
            consumer.on("consumer.disconnect", () => setTimeout(() => this._connect(consumer), 5000))
        }

        let [err] = await Promises.to(Promises.timeout(this._connect(consumer), this.moduleOptions.maxConnectTime || Number.MAX_SAFE_INTEGER))

        if (err && !this.moduleOptions.reconnectOnError) {
            throw err;
        }

        return consumer;
    }

    private async _connect(consumer: Consumer) {

        try {

            await consumer.connect();

            this.logger.info("connected to kafka");

        } catch (e) {
            this.logger.error("failed to connect to kafka", {e});

            if (this.moduleOptions.reconnectOnError) {
                setTimeout(() => this._connect(consumer), 5000);
            } else {
                throw e;
            }
        }
    }
}
