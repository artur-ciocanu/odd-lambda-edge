const TargetClient = require("@adobe/target-nodejs-sdk");
const RULES = require("./rules.json");

const createTargetClient = () => {
  return new Promise(resolve => {
    const result = TargetClient.create({
      client: "targettesting",
      organizationId: "74F652E95F1B16FE0A495C92@AdobeOrg",
      logger: console,
      decisioningMethod: "on-device",
      artifactPayload: RULES,
      events: {
        clientReady: () => resolve(result)
      }
    });
  });
};

const getRequestBody = event => {
  const request = event.Records[0].cf.request;
  const body = Buffer.from(request.body.data, "base64").toString();

  return JSON.parse(body);
};

const buildResponse = body => {
  return {
    status: "200",
    statusDescription: "OK",
    headers: {
      "content-type": [{
        key: "Content-Type",
        value: "application/json"
      }]
    },
    body: JSON.stringify(body)
  }
};

const buildSuccessResponse = response => {
  return buildResponse(response);
};

const buildErrorResponse = error => {
  const response = {
    message: "Something went wrong.",
    error
  };

  return buildResponse(response);
};

const targetClientPromise = createTargetClient();

exports.handler = (event, context, callback) => {
  // extremely important otherwise execution hangs
  context.callbackWaitsForEmptyEventLoop = false; 

  const request = getRequestBody(event);
  
  targetClientPromise
  .then(client => client.getOffers({request}))
  .then(deliveryResponse => {
    console.log("Response", deliveryResponse);
    
    callback(null, buildSuccessResponse(deliveryResponse.response));
  })
  .catch(error => {
    console.log("Error", error);
    
    callback(null, buildErrorResponse(error));
  });
};
