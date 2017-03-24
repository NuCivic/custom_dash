### Setup
We use babel / webpack / npm to manage js dependencies.
Install node etc.

run:
`npm install`
to install required dependencies

run `npm run build`
to compile code

### Custom data handlers
To create custom data handlers you need to create a dataHandlers.js file within the js folder and populate the `Drupal.settings.dkanDash.dataHandlers` global with the handlers you want to create.

```javascript
Drupal.settings.dkanDash.dataHandlers = {
    handler1: function() {
        //stuff
    },
    handler2: function() {
        //stuff
    },    
}
```

### Custom state handlers
State handlers work largely in the same way as data handlers but they are called later in the component lifecycle. They allow you to update the component state based on the update data. See react-dash docs.

### devSettings
Use dev settings to stub the settings objecct during development. Settings object should be keyed to the dashboard entity path in the following way:
If you have two dashboard paths:
`/dashboard/foo`
`/dashboard/bar`

Provide devSettings js should look like:

```javascript
{
  dashboard__foo: {
    // .. all dash settings go here
  },
  dashboard__bar: {
    // settings for second dash here
  }
}
```
If present, these settings will be used instead of the json stored in the dashboard entity.


### Custom CSS
To create custom css create file called `custom.css` inside the css folder.
