import {Module, module, IModuleParams} from "@appolo/engine";
import {IProducerOptions} from "./src/IProducerOptions";
import {ProducerClient} from "./src/producerClient";
import {KafkaConfig} from "kafkajs";

@module()
export class KafkaProducerModule extends Module<IProducerOptions> {

    protected readonly Defaults: Partial<IProducerOptions> = {
        id: "kafkaProducer",
        maxConnectTime: null,
        reconnectOnError: false
    }

    public static for(options: IProducerOptions): IModuleParams {
        return {type: KafkaProducerModule, options}
    }

    public get exports() {
        return [{id: this.moduleOptions.id, type: ProducerClient}];
    }
}
