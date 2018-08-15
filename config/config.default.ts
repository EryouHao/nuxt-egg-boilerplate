import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

// 提供给 config.{env}.ts 使用
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>

// 应用本身的配置 Scheme
export interface BizConfig {
  serverUrl: string,
}

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig
  
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1534233329979_5259'
  
  // add your config here
  config.middleware = [ 'nuxt' ]
  
  return config
}

