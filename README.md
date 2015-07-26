# Two sides

Based on the excellent [Honda otherside website](http://www.hondatheotherside.com/d.php), this Angular directive allows two Youtube videos to be played in sync. Only one video will be on the screen at a time, to switch videos press the key that is set on the directive.

##Documentation

Include twoSides module source file in html

```html
 <script src="path/to/two-sides.js"></script>
```

Set the module as a dependecy of your angular app


```javascript
angular.moudle('myApp', ['twoSides']);
```


Then declare the revealer directive in your html.

```html
<two-sides main-video="HtXAT2QgvHE" hidden-video="6vic5g7Gr3E" key="32" autoplay="true"></two-sides>
```

###Directive attributes


####main-video

````
main-video="HtXAT2QgvHE"
````

YouTube video ID of main video

####hidden-video
````
hidden-video="6vic5g7Gr3E"
````

YouTube video ID of hidden video

####autoplay (optional)

````
autoplay="true"
````
Set whether videos should automatically start to play (defaults to false)

####key (optional)

````
key="32"
````
Keyboard key to trigger swtich of videos. (defaults to the Space key)
