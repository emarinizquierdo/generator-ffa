# FFA (BBVA Framework for Front Applications) generator [https://sites.google.com/a/bbva.com/ffa-site/]

Based on AngularJS generator [![Build Status](https://secure.travis-ci.org/yeoman/generator-angular.png?branch=master)](http://travis-ci.org/yeoman/generator-angular)

Maintainer: Eduardo Marin

Based on [angular-seed](https://github.com/angular/angular-seed/)


## Usage

Install `generator-ffa`: get into `generator-ffa` directory downloaded and execute:
```
npm install -g
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo ffa`, optionally passing an app name:
```
yo ffa [app-name]
```

## Generators

Available generators:

* [ffa](#app) (aka [ffa:app](#app))
* [ffa:constant](#constant)
* [ffa:controller](#controller)
* [ffa:directive](#directive)
* [ffa:factory](#factory)
* [ffa:filter](#filter)
* [ffa:provider](#provider)
* [ffa:route](#route)
* [ffa:service](#service)
* [ffa:view](#view)
* [ffa:value](#value)

**Note: Generators are to be run from the root directory of your app.**

### App
Sets up a new FFA (AngularJS based on) app, generating all the boilerplate you need to get started. The app generator will also install Twitter Bootstrap 3.3.2 and AngularJS modules, such as angular-route, angular-resource, angular-cookies, pascal-prethc-translate, bbva-front library and (under your responsability) ui-bootstrap.

Example:
```bash
yo ffa
```

### Route
Generates a controller and view, and configures a route in `app/scripts/app.js` connecting them.

Example:
```bash
yo ffa:route myroute
```

Produces `app/scripts/controllers/myroute.js`:
```javascript
angular.module('myModApp').controller('MyrouteCtrl', [ '$scope', function ($scope) {
  // ...
}]);
```

Produces `app/views/myroute.html`:
```html
<p>This is the myroute view</p>
```

### Controller
Generates a controller in `app/scripts/controllers`.

Example:
```bash
yo ffa:controller user
```

Produces `app/scripts/controllers/user.js`:
```javascript
angular.module('myModApp').controller('UserCtrl',[ '$scope', function ($scope) {
  // ...
}]);
```

### Dependency
Load a library in target defined directory. Interactive dialog.

### Directive
Generates a directive in `app/scripts/directives`.

Example:
```bash
yo ffa:directive myDirective
```

Produces `app/scripts/directives/myDirective.js`:
```javascript
angular.module('myModApp').directive('myDirective', function () {
  return {
    templateUrl: 'myMod/partials/myDirective.html',
    restrict: 'A',
    replace: true,
    controller: ['$scope', function($scope) {
      
    }]
  };
});
```

### Filter
Generates a filter in `app/scripts/filters`.

Example:
```bash
yo ffa:filter myFilter
```

Produces `app/scripts/filters/myFilter.js`:
```javascript
angular.module('myModApp').filter('myFilter', function () {
  return function (input) {
    return 'myFilter filter:' + input;
  };
});
```

### View
Generates an HTML view file in `app/views`.

Example:
```bash
yo ffa:view user
```

Produces `app/views/user.html`:
```html
<p>This is the user view</p>
```

### Constant
Generates an AngularJS service.

Example:
```bash
yo ffa:constant myConstant
```

Produces `app/scripts/services/myService.js`:
```javascript
angular.module('myModApp').constant('myService', function () {
  // ...
});
```

### Service
Generates an AngularJS service.

Example:
```bash
yo ffa:service myService
```

Produces `app/scripts/services/myService.js`:
```javascript
angular.module('myModApp').service('myService', function () {
  // ...
});
```

#### Background
Unannotated:
```javascript
angular.module('myMod').controller('MyCtrl', function ($scope, $http, myService) {
  // ...
});
```

Annotated:
```javascript
angular.module('myMod').controller('MyCtrl',
  ['$scope', '$http', 'myService', function ($scope, $http, myService) {

    // ...
  }]);
```

The annotations are important because minified code will rename variables, making it impossible for AngularJS to infer module names based solely on function parameters.

The recommended build process uses `ngAnnotation`, a tool that automatically adds these annotations. However, if you'd rather not use `ngAnnotation`, you have to add these annotations manually yourself.

## Contribute

See the [contributing docs](https://docs.google.com/a/bbva.com/document/d/1LEGIu0Yg-F6t6ZRGajihyvLEo4Y4baAaDd0C9TuoGk8/edit)

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
