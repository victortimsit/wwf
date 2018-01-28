# Template---Gulp-Eslint-Stylus

[TOC]

## Features

### All

- Concat and minifies HTML, CSS, Scripts
- BrowserSync 

### Styles

- Using Stylus pre-processor to compile .styl in .css

## Set project

You need Node.js and npm to run this template.

```
$cd yourFolderProject
$git clone https://github.com/vtimsit/Template---Gulp-Eslint-Stylus.git
$npm install gulp
$npm install stylus
$npm install allOfNodeModules
...
```

You have to install in your IDE the eslint extension.

## Usage

### Usefull commands

#### To browser sync 

Task to automatically sync browser when a changes is made on a styl, js or html file in the app directory

```
$gulp watch
```

#### To build /dist

Task to run all optimization tasks at the same time to build dist repository

```
$gulp build
```

### Other commands

#### To concat and minify CSS/JS/HTML

Task to concat and minify css & js files and transfer them to dist directory

```
$gulp useref
```

#### To transfer and minify images

Task to minify images and transfer them to dist directory

```
$gulp images
```

#### To transfer fonts

Task to transfer fonts to dist directory

```
$gulp fonts
```

#### To transfer sounds

Task to transfer sound to dist directory

```
$gulp sounds
```

#### To clean /dist

Task to clean dist directory

```
@gulp clean
```

Task to clean dist directory expect for the images

```
$gulp clean:dist
```

#### To build without clear

Default task to build dist repository (without clean)

```
$gulp default
```

