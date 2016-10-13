/**
 * App Initialization 
 * 1. Iframe app would trigger handshake request to parent. 
 * 2. Parent window would respond back with app.registered event. 
      ** App communication to parent window can be done only after successful registration. 
 * 3. On app activate. 
 * 	  Parent window would trigger app.activated event 
 *    Parent window would trigger app.context-change event 
 * 4. On app deactivate 
 *    Parent window would trigger app.deactivated event (Because of user manual action / context-change)
 *    Parent window would trigger app.context-change event (if app.deactivated happened because of context change) 

   app.on('registered', function(data) {
      console.error("On app.registered event.",data)
      // Would return current AW app user (data.user);
   });
   
   app.on('activated',function(data){
   // data = {'user': {} , 'context': {} }
	console.error("On app activation.",data);
   });
   
   app.on('context-change',function(data){
    // data = {'user': {} , 'context': {} }
	console.error("On contaxt change.",data);
   });
   
   app.on('deactivated',function(data){
   // data = {} , App deactivation doesn't send any context.
	console.error("On app deactivation.",data);
   });
  
 *    
 * 
 * 
 * Default listeners provided by AW container. 

  app.postMessage('showCount',{  // To show the count on app icon at chat header.
    'count': 10,
    'id'   : ac2324ff-747b-4921-8ff8-d0f256bb5aea"
   }); 

   app.postMessage('showNotification',{  // To show desktop notification by user/stream
	'id'     : "ac2324ff-747b-4921-8ff8-d0f256bb5aea",         // Context reference id. streamId/userId
	'icon'   : null,                                          // App icon url to be shown in desktop notification.
	'title'  : "Todo app remainder",                          // Title for the desktop notification.
	'message': "Enabled desktop notification for todo app." // body content for desktop notification
	});
	
   app.postMessage('showIndicator',{
	'id':"ac2324ff-747b-4921-8ff8-d0f256bb5aea" // Context reference to show update indicator.
   });
	
 * 
 */
 
 var TodoApp = (function(todo){
	 var _app = _context = _appUser = {},
	 todo.push = function(type,obj){
		 $.extend(obj,{'id':_context.id});
		 _app.postMessage(type,obj);
	 };
	 init = function(){
		 _app = window.AAFClient.init();
		 _app.on('registered', function(data) {
		   console.error("On app.registered event.",data);
		   _appUser = data.user;
		 });
		 _app.on('activated',function(data){
		  console.error("On app activation.",data);
		  _context = data.context;
		 });
		 _app.on('context-change',function(data){
		  console.error("On context change.",data);
		  _context = data.context;
		 });
		 _app.on('deactivated',function(data){
		 console.error("On app deactivation.",data);
		 });
	}();
	return todo;
})({});
 
 






