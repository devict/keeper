import 'dotenv/config'
import { assertEnv, ENV, getEnv, } from '../lib/env'
import Service from '../lib/service';
import { ServiceOptions } from '../types/service';

assertEnv()

const serviceOptions: ServiceOptions = require(`../conf/${getEnv(ENV.CONF_FILE)}.js`)

const service = new Service(serviceOptions)

service.start().then(() => {
    serviceOptions.logger.log(`[Keeper]: Started Keeper!`)
})