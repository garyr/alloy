import { t, ClientFunction } from "testcafe";
import createNetworkLogger from "../helpers/networkLogger";
import getResponseBody from "../helpers/networkLogger/getResponseBody";
import { responseStatus } from "../helpers/assertions";
import fixtureFactory from "../helpers/fixtureFactory";
import createResponse from "../../../src/core/createResponse";
import generalConstants from "../helpers/constants/general";

const networkLogger = createNetworkLogger();
const { ecidRegex } = generalConstants;

fixtureFactory({
  title:
    "C14400: When ID migration is disabled and no identity cookie is found but legacy s_ecid cookie is found, the ECID should not be sent on the request",
  requestHooks: [networkLogger.edgeEndpointLogs]
});

test.meta({
  ID: "C14400",
  SEVERITY: "P0",
  TEST_RUN: "Regression"
});

const apiCalls = ClientFunction(() => {
  document.cookie = "s_ecid=MCMID%7C16908443662402872073525706953453086963";

  window.alloy("configure", {
    configId: "9999999",
    orgId: "53A16ACB5CC1D3760A495C99@AdobeOrg",
    edgeBasePath: window.edgeBasePath,
    debugEnabled: true,
    idMigrationEnabled: false
  });

  return window.alloy("event", {
    viewStart: true
  });
});

const getDocumentCookie = ClientFunction(() => {
  return document.cookie;
});

test("Test C14400: When ID migration is disabled and no identity cookie is found but legacy s_ecid cookie is found, the ECID should not be sent on the request", async () => {
  await apiCalls();
  await responseStatus(networkLogger.edgeEndpointLogs.requests, 200);
  await t.expect(networkLogger.edgeEndpointLogs.requests.length).eql(1);

  const request = JSON.parse(
    networkLogger.edgeEndpointLogs.requests[0].request.body
  );

  await t.expect(request.xdm).eql(undefined);

  const response = JSON.parse(
    getResponseBody(networkLogger.edgeEndpointLogs.requests[0])
  );

  const payloads = createResponse(response).getPayloadsByType(
    "identity:result"
  );

  const ecidPayload = payloads.filter(
    payload => payload.namespace.code === "ECID"
  )[0];

  await t.expect(ecidPayload.id).match(ecidRegex);

  const documentCookie = await getDocumentCookie();

  await t
    .expect(documentCookie)
    .notContains(
      `AMCV_53A16ACB5CC1D3760A495C99%40AdobeOrg=MCMID|${ecidPayload.id}`
    );
});
