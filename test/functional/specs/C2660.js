import { t, ClientFunction } from "testcafe";
import createNetworkLogger from "../helpers/networkLogger";
import { responseStatus } from "../helpers/assertions/index";
import fixtureFactory from "../helpers/fixtureFactory";
import environmentContextConfig from "../helpers/constants/environmentContextConfig";
import configureAlloyInstance from "../helpers/configureAlloyInstance";

const networkLogger = createNetworkLogger();

fixtureFactory({
  title: "C2660 - Context data is captured before user consents.",
  requestHooks: [networkLogger.edgeEndpointLogs]
});

test.meta({
  ID: "C2660",
  SEVERITY: "P0",
  TEST_RUN: "Regression"
});

const setConsentPending = ClientFunction(() => {
  window.alloy("configure", {
    defaultConsent: { general: "pending" }
  });
});

const setConsentIn = ClientFunction(() => {
  window.alloy("setConsent", { general: "in" });
});

const pushHistory = ClientFunction(() => {
  return window.history.pushState({}, "page 2", "bar.html");
});

const resizeViewPort = ClientFunction(() => {
  const width = 640;
  const height = 480;
  return window.resizeTo(width, height);
});

const triggerAlloyEvent = ClientFunction(() => {
  return window.alloy("event", {
    xdm: {
      web: {
        webPageDetails: {
          URL: "https://alloyio.com/functional-test/alloyTestPage.html"
        }
      }
    }
  });
});

test("C2660 - Context data is captured before user consents.", async () => {
  await configureAlloyInstance("alloy", environmentContextConfig);

  await setConsentPending();

  await pushHistory();

  await resizeViewPort();

  await triggerAlloyEvent();

  await setConsentIn();

  await responseStatus(networkLogger.edgeEndpointLogs.requests, 200);
  await t.expect(networkLogger.edgeEndpointLogs.requests.length).eql(1);

  const request = networkLogger.edgeEndpointLogs.requests[0].request.body;
  const stringifyRequest = JSON.parse(request);

  await t.expect(stringifyRequest.events[0].xdm.environment).ok();
  await t.expect(stringifyRequest.events[0].xdm.web.webPageDetails).ok();

  await t.expect(stringifyRequest.events[0].xdm.device).notOk();
  await t.expect(stringifyRequest.events[0].xdm.placeContext).notOk();
});
