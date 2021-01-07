"use strict";
import {define, factory, IFactory, inject, singleton} from '@appolo/inject';
import {ILogger} from "@appolo/logger";
import {IProducerOptions} from "./IProducerOptions";
import {Kafka, Producer} from 'kafkajs';
import {Promises} from '@appolo/utils';


@define()
@singleton()
@factory()
export class ProducerClient implements IFactory<Producer> {

    @inject() logger: ILogger;
    @inject() moduleOptions: IProducerOptions;

    public async get(): Promise<Producer> {


        let kafka = new Kafka(this.moduleOptions.config);

        const producer = kafka.producer(this.moduleOptions.producerConfig);

        if (this.moduleOptions.reconnectOnError) {
            producer.on("producer.disconnect", () => setTimeout(() => this._connect(producer), 5000))
        }

        let [err] = await Promises.to(Promises.timeout(this._connect(producer), this.moduleOptions.maxConnectTime || Number.MAX_SAFE_INTEGER))

        if (err && !this.moduleOptions.reconnectOnError) {
            throw err;
        }

        return producer;
    }

    private async _connect(producer: Producer) {

        try {

            await producer.connect();

            this.logger.info("connected to kafka");

        } catch (e) {
            this.logger.error("failed to connect to kafka", {e});

            if (this.moduleOptions.reconnectOnError) {
                setTimeout(() => this._connect(producer), 5000);
            } else {
                throw e;
            }
        }
    }
}
