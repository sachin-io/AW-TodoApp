# Installable apps

Installable apps are the apps your create which can be installed in AnywhereWorks desktop client and hub, works natively in AW. The installable application will be loaded in the **iframe** in AW.

## Basic steps
-----------
1. First step to create an installable application is, go to [AnywhereWorks Developer Console](https://developer.anywhereworks.com), and create an application of type **install**.
2. Upload your application version zip file in App Versions section, and submit for approval.
3. Once your app is being approved, then you can publish the app to be available in AnywhereWorks Marketplace. 

The installed application can be placed at any one of the allowed hotspot.

### Allowed Hotspots
|Hotspot name|Location|
|-----|---|
|`chat_topbar`|![chat_topbar](http://bit.ly/2dQbkdj)
|`profile`|![profile](http://bit.ly/2dfCi2g)

## How to build
----------
Application verison zip file should contain the following files.
1. manifest.json
2. app.js
3. assets folder

#### manifest.json

The very first thing we'll need to create is a manifest file named manifest.json. This manifest is nothing more than a metadata file in JSON format that contains properties like your app's name, version number and so on.

The must have properties in manifest.json are : 

|Property|Value|Description|
|------|--------|------|
|**name**|String|Name of your application|
|**version**|Number|The version number of your application. For eg., 1.0|
|**location**|[Hotspot](http://docs.anywhereworks.apiary.io/#introduction/installable-apps/basic-steps) name|This can be one of the provided hotspots, where your application will be shown in AnywhereWorks.|
|**iframeurl**|URL|The URL path of your application which should be loaded in the iframe|

#### app.js
Ensures app to process the requests outside of iframe. 

For eg., if app wants to process any requests based on AW context, those can be placed here.  

##### Sample 
```javascript
( function () {
   
    return {
        
        onload: function () {
            console.log( 'Application has been loaded' );
            ...
        },
        
        init : function () {
            console.log( "On initialization." );
            ...
        },
        
        save : function () {
            // Process save
        }
    }

} ());
```


#### assets ( _folder_ )

The folder should contain the icons of your app which will be displayed in AnywhereWorks hotspot. There must be three icons which represents the **active**, **inactive** and **hover** states.

The naming convention for the icons should be `icon_{hotspot name}_{state}`. 

*state* can be one of {`inactive`, `active`, `hover`}

**Note** : While uploading your application version's zip file, the folder inside the zip must be same as zip file name.

## Client side
----------

1. [Download](https://storage.googleapis.com/images.sb.a-cti.com/AW_AppFrameWork/API_SDK.zip) the AW client SDK for your installable app communication back and forth. 
2. Include the downloded SDK in your page.
3. Initialize the SDK

    ```javascript
    var app = AAFClient.init();
    ```
4. Add a listener for registered event.
    ```javascript
    app.on( 'registered', function ( data ) {
        // Would return current AW app user (data.user);
    });
    ```
    Note : You can post data to parent window only after successful registration.
5. Now, your app can listen and trigger events. 

### List of available listeners.

|Listener|Description|
|-------|-------|
|`activated`|Triggers on app activation with context|
|`context-change`|Triggers on every context change.|
|`deactivated`|Triggers on app deactivation.|

Note : Currently, the context can be **user contact** or **stream** , Will trigger for applications with `chat_topbar` hotspot scope

```javascript
app.on( 'context-change', function ( data ) {
    // Would return current AW app context along with user information 
    // (data = {'user': {} , 'context': {} });
});
```

### List of available events.

|Event|Description|
|-------|-------|
|`showCount`|Will add count badge on your app icon in AW.|
|`showNotification`|Will trigger a desktop notification with the user context you provide.|
|`showIndicator`|Will show the indicator on the user context. Represents an update.|

Note : The payload sent to trigger event must have `id` property which represents context id.
Sample code to trigger events:
```javascript
app.postMessage( 'showCount', { 
    'count': 10,
    'id' : "ac2324ff-747b-4921-8ff8-d0f256bb5aea"
}); 

app.postMessage( 'showNotification', { 
    'id' : "ac2324ff-747b-4921-8ff8-d0f256bb5aea", // Context reference id. streamId/userId
    'icon' : null, // App icon url to be shown in desktop notification.
    'title' : "Todo app remainder", // Title for the desktop notification.
    'message': "This is content from todo app." // body content for desktop notification
});

app.postMessage( 'showIndicator', {
    'id':"ac2324ff-747b-4921-8ff8-d0f256bb5aea" // Context reference to show update indicator.
});

```

#### Still have questions on how to implement ? 
##### Checkout the sample app [GitHub](https://github.com/valishah/AW-TodoApp)
