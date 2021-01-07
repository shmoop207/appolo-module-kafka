import {Module, module, IModuleParams} from "@appolo/engine";
import {IConsumerOptions} from "./src/IConsumerOptions";
import {ConsumerClient} from "./src/consumerClient";
import {KafkaConfig} from "kafkajs";

@module()
export class KafkaConsumerModule extends Module<IConsumerOptions> {

    protected readonly Defaults: Partial<IConsumerOptions> = {
        id: "kafkaConsumer",
        maxConnectTime: null,
        reconnectOnError: false
    }

    public static for(options: IConsumerOptions): IModuleParams {
        return {type: KafkaConsumerModule, options}
    }

    public get exports() {
        return [{id: this.moduleOptions.id, type: ConsumerClient}];
    }
}
