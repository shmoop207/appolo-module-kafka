import {KafkaConfig, ConsumerConfig} from "kafkajs";

export interface IConsumerOptions {
    id?: string,
    maxConnectTime?: number
    reconnectOnError?: boolean
    config: KafkaConfig
    consumerConfig: ConsumerConfig

}
