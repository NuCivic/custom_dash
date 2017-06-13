### Setup
We use babel / webpack / yarn to manage js dependencies.
Install node etc.

run: `yarn install`
to install required dependencies

run `yarn build`
to compile code

run `yarn run dev`
to develop in 'watch' mode - saving files should trigger rebuild

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

### index.js
Include all of your source files in index.js so that webpack can find them.

### Custom CSS
To create custom css create file called `custom.css` inside the css folder.

## Development

## Normal workflow
```
> yarn
> npm run dev
```

## Extended workflow
The extended workflow includes changes in react-dash library. Sometimes it's useful to work with dkan_dash and react-dash at the same time. For such cases you might want to compile react-dash, copy the files to dkan_dash and then compile dkan_dash. 
However this is not very straight forward so dkan_dash build grab from the environment variable REACT_DASH_PATH the path to the react-dash library in order to do this process automatically.

```
> yarn
> export REACT_DASH_PATH=/path/to/react-dash
> export DKAN_DASH_PATH=/path/to/dkan_dash
> yarn run dev
```