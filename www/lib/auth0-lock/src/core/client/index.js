import Immutable, { List, Map } from 'immutable';
import { dataFns } from '../../utils/data_utils';
// TODO: this module should depend from social stuff
import { STRATEGIES as SOCIAL_STRATEGIES } from '../../connection/social/index';
import { STRATEGIES as ENTERPRISE_STRATEGIES } from '../../connection/enterprise';

const { initNS, get } = dataFns(["client"]);

export function hasFreeSubscription(m) {
  return ["free", "dev"].indexOf(get(m, ["tenant", "subscription"])) > -1;
}

export function connection(m, strategyName, name) {
  // TODO: this function should take a client, not a map with a client
  // key.
  const connections = strategy(m, strategyName).get("connections", List());
  return connections.find(withName(name)) || Map();
}

function strategy(m, name) {
  // TODO: this function should take a client, not a map with a client
  // key.
  return m.getIn(["client", "strategies"], List()).find(withName(name))
    || Map();
}

function withName(name) {
  return x => x.get("name") === name;
}

function strategyNameToConnectionType(str) {
  if (str === "auth0") {
    return "database";
  } else if (str === "email" || str === "sms") {
    return "passwordless";
  } else if (SOCIAL_STRATEGIES[str]) {
    return "social";
  } else if (ENTERPRISE_STRATEGIES[str]) {
    return "enterprise";
  } else {
    return "unknown";
  }
}

const emptyConnections = Immutable.fromJS({
  database: [],
  enterprise: [],
  passwordless: [],
  social: [],
  unknown: [] // TODO: should be oauth2
});

export function initClient(m, client) {
  return initNS(m, formatClient(client));
}

function formatClient(o) {
  return new Immutable.fromJS({
    id: o.id,
    tenant: {
      name: o.tenant,
      subscription: o.subscription
    },
    connections: formatClientConnections(o)
  })
}

function formatClientConnections(o) {
  const result = emptyConnections.toJS();

  for (var i=0; i < (o.strategies || []).length; i++) {
    const strategy = o.strategies[i];
    const connectionType = strategyNameToConnectionType(strategy.name);
    const connections = strategy.connections.map(connection => {
      return formatClientConnection(connectionType, strategy.name, connection);
    });
    result[connectionType].push(...connections);
  }

  return result;
}

function formatClientConnection(connectionType, strategyName, connection) {
  const result = {
    name: connection.name,
    strategy: strategyName,
    type: connectionType
  };

  if (connectionType === "database") {
    result.passwordPolicy = connection.passwordPolicy || "none";
    result.allowSignup = typeof connection.showSignup === "boolean"
      ? connection.showSignup
      : true;
    result.allowForgot = typeof connection.showForgot === "boolean"
      ? connection.showForgot
      : true;
    result.requireUsername = typeof connection.requires_username === "boolean"
      ? connection.requires_username
      : false;
  }

  if (connectionType === "enterprise") {
    const domains = connection.domain_aliases || [];
    if (connection.domain) {
      domains.unshift(connection.domain);
    }
    result.domains = domains;
  }

  return result;
}

export function clientConnections(m) {
  return get(m, "connections", emptyConnections);
}
