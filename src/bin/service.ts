import 'dotenv/config'
import { ENV, getEnv, } from '../lib/env'
import Service from '../lib/service';
import MainConf from '../conf/main';
import LocalConf from '../conf/local';

const conf = (getEnv(ENV.CONF_FILE) == "local" ? LocalConf : MainConf)();
const service = new Service(conf)

service.start().then(() => {
    conf.logger.log(`[Keeper]: Started Keeper!`)
})