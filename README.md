# Todo App
A Todo Installable application for anywhereworks.

## Downloads 
- Basic setup for installable app [Download Zip](https://github.com/valishah/AW-TodoApp/tree/master/war/releases/v1.0)
- AnywhereWorks app framework SDK [Download SDK](https://github.com/valishah/AW-TodoApp/blob/master/war/lib/aaf_sdk_min.js)

#### SDK Usage 
 - Inject SDK into Html/Jsp 
 - Initiate SDK `var app = AAFClient.init()`
 - Default listeners
 ```javascript
 app.on('registered', function(data) {
  // Would return current AW app user (data.user);
 });
 
 app.on('activated',function(data){
   // data = {'user': {} , 'context': {} }
 });
 
 app.on('context-change',function(data){
  // data = {'user': {} , 'context': {} }
 });
 
 app.on('deactivated',function(data){
   // data = {} , App deactivation doesn't send any context.
 });
 ````
 - Default events 
 ``` javascript 
 // To show the count on app icon at chat header.
 app.postMessage('showCount',{  
  'count': 10,
  'id'   : context-id // userId / streamId
 }); 
  
  // To trigger desktop notification w.r.t user/stream
  app.postMessage('showNotification',{  
	  'id'     : context-id
	  'icon'   : null,          // App icon url to be shown in desktop notification.
	  'title'  : title          // Title for the desktop notification. Ex :"Todo app remainder",
	  'message': message        // body content for desktop notification. Ex : "Enabled desktop notification for todo app."
	});
	
  // To show the app update indicator on recent contact/stream view context.
  app.postMessage('showIndicator',{
	  'id' : context-id // Context reference to show update indicator.
  });
 ```
 #### Note : 
  Default events can be triggered only on successful app registration with AW app. (After registered event)
  
 
