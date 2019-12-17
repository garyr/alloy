/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

// TODO: Remove this once the opt-in cookie is managed by the server.
// Due to security software flagging the `@` sign in the ORG ID
// as a security vulnerability, we are replacing it with an `_`.
export default (cookieNamePrefix, orgId) =>
  `${cookieNamePrefix}_${orgId.replace("@", "_")}`;
