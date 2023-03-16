// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appName: 'Udagram',
  apiHost: 'http://a15dbc5eb687744198147a5a31dd55f7-879789399.us-east-1.elb.amazonaws.com:8080/api/v0',
  auth0:{
    domain: 'dev-xkdox7v8jiqc317u.us.auth0.com',
    clientId: 'n2pNajitIFydRl1RxCDeVn8gtbIw3QVy'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
