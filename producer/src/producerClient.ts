"use strict";
import {define, factory, IFactory, inject, singleton} from '@appolo/inject';
import {ILogger} from "@appolo/logger";
import {IProducerOptions} from "./IProducerOptions";
import {Kafka, Producer} from 'kafkajs';
import {Promises} from '@appolo/utils';
import Timeout = NodeJS.Timeout;


@define()
@singleton()
@factory()
export class ProducerClient implements IFactory<Producer> {

    @inject() logger: ILogger;
    @inject() moduleOptions: IProducerOptions;

    private _interval:Timeout

    public async get(): Promise<Producer> {


        let kafka = new Kafka(this.moduleOptions.config);

        const producer = kafka.producer(this.moduleOptions.producerConfig);

        if (this.moduleOptions.reconnectOnError) {
            producer.on("producer.disconnect", () =>this._reconnect(producer))
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
                this._reconnect(producer)
            } else {
                throw e;
            }
        }
    }

    private _reconnect(producer: Producer){
        clearTimeout(this._interval)
        this._interval = setTimeout(() => this._connect(producer), 5000);
    }
}
