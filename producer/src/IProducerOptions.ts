import {KafkaConfig, ProducerConfig} from "kafkajs";

export interface IProducerOptions {
    id?: string,
    maxConnectTime?: number
    reconnectOnError?: boolean
    config: KafkaConfig
    producerConfig?: ProducerConfig

}
