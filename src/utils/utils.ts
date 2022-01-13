export const isProd = (): boolean => {
  return process.env.NODE_ENV === 'development' ? true : false;
};
export const logger = (msg: string): void => {
  isProd() && console.log(msg);
};
