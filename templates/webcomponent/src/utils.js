import qs from 'qs';

const debug = isDebugMode() ? true : false;
const fetchHeader = (debug) ? 'https://pre-lighthouse4.alibaba-inc.com/api/common/mbox/' : 'https://lighthouse4.alibaba-inc.com/api/common/mbox/';

export function queryData(args) {
  return fetch(`${fetchHeader}funnelAnalyse?${qs.stringify(args)}`).then(res => res.json());
}

export function isDebugMode() {
  return getURLArgs().debug;
}

export function getReactAttribute(props) {
  let __reactEventHandlers = {};
  Object.keys(props).map((key) => {
    if (key.indexOf('__reactEventHandlers') > -1) __reactEventHandlers = {...props[key]};
  });
  
  if (isDebugMode()) {
    console.log(`__reactEventHandlers:`);
    console.log(__reactEventHandlers);
  }
  
  return __reactEventHandlers;
}

function getURLArgs() {
  return qs.parse(window.location.search, { ignoreQueryPrefix: true });
}
