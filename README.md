# Minnpost Minneapolis Zoning Map

Basic look at zoning in Minneapolis.

You can see this project in action at *[published story link goes here]()*.

*Unless otherwise noted, MinnPost projects on [Github](https://github.com/minnpost) are story-driven and meant for transparency sake and not focused on re-use.  For a list of our more reusable projects, go to [code.minnpost.com](http://code.minnpost.com).*

[![Build Status](https://travis-ci.org/MinnPost/minnpost-minneapolis-zoning-map.svg?branch=master)](https://travis-ci.org/MinnPost/minnpost-minneapolis-zoning-map)

## Data

* Primary Zoning boundaries from [Minneapolis Data Portal](http://opendata.minneapolismn.gov/datasets/eac15cee3f2d4ec4887e1f8995955ef1_0).
* [Zoning descriptions](http://www.minneapolismn.gov/zoning/zoning_zoning-district-descriptions) from Minneapolis Planning Division.

## Development and running locally

### Prerequisites

All commands are assumed to be on the [command line](http://en.wikipedia.org/wiki/Command-line_interface), often called the Terminal, unless otherwise noted.  The following will install technologies needed for the other steps and will only needed to be run once on your computer so there is a good chance you already have these technologies on your computer.

1. Install [Git](http://git-scm.com/).
    * On a Mac, install [Homebrew](http://brew.sh/), then do: `brew install git`
1. Install [NodeJS](http://nodejs.org/).
    * On a Mac, do: `brew install node`
1. Install [Grunt](http://gruntjs.com/): `npm install -g grunt-cli`
1. Install [Bower](http://bower.io/): `npm install -g bower`
1. Install [Sass](http://sass-lang.com/): `gem install sass`
    * On a Mac do: `sudo gem install sass`
1. Install [Compass](http://compass-style.org/): `gem install compass`
    * On a Mac do: `sudo gem install compass`

### Get code and install packages

Get the code for this project and install the necessary dependency libraries and packages.

1. Check out this code with [Git](http://git-scm.com/): `git clone https://github.com/MinnPost/minnpost-minneapolis-zoning-map.git`
1. Go into the template directory: `cd minnpost-minneapolis-zoning-map`
1. Install NodeJS packages: `npm install`
1. Install Bower components: `bower install`

### Data processing

1. The `Makefile` runs tasks such as downloading sources and converting data.  This will also link the Tilemill project into the Mapbox directory for editing in Tilemill.
    * Run: `make all`
1. To create or update a new tile layer, export from Tilemill and upload to Mapbox (update an existing map if already there).

### Running locally

1. Run: `grunt server`
    * This will run a local webserver for development and you can view the application in your web browser at [http://localhost:8871](http://localhost:8871).
    * This will also run [BrowserSync](http://www.browsersync.io/) so any development changes will appear in the browser automatically; note that compiling SASS can take a few seconds.
1. By default, running a local server will show you the local development version.  But there are other builds that you can view by changing the query parameters.  Do note that you may have to run the build and deploy things for things to work normally.
    * Local build: [localhost:8871/?mpDeployment=build](http://localhost:8871/?mpDeployment=build)
    * Build deployed on S3: [localhost:8871/?mpDeployment=deploy](http://localhost:8871/?mpDeployment=deploy)
    * Embedded version with local build: [localhost:8871/?mpDeployment=build&mpEmbed=true](http://localhost:8871/?mpDeployment=build&mpEmbed=true)
    * Embedded version with S3 build: [localhost:8871/?mpDeployment=deploy&mpEmbed=true](http://localhost:8871/?mpDeployment=deploy&mpEmbed=true)

### Developing

Development will depend on what libraries are used.  But here are a few common parts.

* `js/app.js` is the main application and will contain the top logic.

Adding libraries is not difficult, but there are a few steps.

1. User bower to install the appropriate library: `bower install library --save`
1. Add the appropriate reference in `js/config.js` so that RequireJS knows about it.
1. Add an entry in the `dependencyMap` object in `bower.json`.  This is used to automatically collect resources in the build process.  It is possible, like with `minnpost-styles` that multiple entries will need to be made, one ber `.js` file.  Here is an example:

```
// Should be bower identifier.  Order matters for build, meaning
// that any dependencies should come first.
"library": {
  // Name used for reference in RequireJS (some modules
  // expect dependencies with specific case, otherwise its
  // arbitrary and you can just use the library name from above).
  // If this is not a JS library, do not include.
  "rname": "library",
  // (optional) Path to un-minified JS files within bower_components
  // excluding .js suffix.
  "js": ["library/dist/library"],
  // (optional) Path to un-minified CSS files within bower_components
  // excluding .css suffix.
  "css": ["library/dist/css/library"],
  // (optional) Path to un-minified IE-specific CSS files
  // within bower_components excluding .css suffix.
  "ie": ["library/dist/css/library.ie"],
  // (optional) Folder where images are; these will be copied to the
  // dist/images folder.
  "images": ["library/dist/css/images"],
  // What is expected to be returned when using as a RequireJS dependency.
  // Some specific libraries, like jQuery use $, or backbone returns the Backbone class.
  // If this is not a JS library, do not include.
  "returns": "Library"
}
```

### Testing

There are basic QUnit tests in the `tests` folder.

1. Run with: `grunt test`
1. OR for more descriptive tests, go to `tests/index.html` in the browser.

### Build

To build or compile all the assets together for easy and efficient deployment, do the following.  It will create all the files in the `dist/` folder.

1. Run: `grunt`

### Deploy

Deploying will push the relevant files up to Amazon's AWS S3 so that they can be easily referenced on the MinnPost site.  This is specific to MinnPost, and your deployment might be different.

1. Run: `grunt deploy`
    * This will output a bit of HTML to if you want to use the project as an embed.

There are to main ways to include the necessary HTML in a page in order to run the project.

1. Copy the relevant parts from `index.html`.
    * This has the benefit of showing messages to users that have older browsers or have Javascript turned off.  This also uses the build that separates out the third-party libraries that are used and are less likely to change; this gains a bit of performance for users.
1. Copy the embed output from `grunt deploy` (still in development).

## Hacks

*List any hacks used in this project, such as forked repos.  Link to pull request or repo and issue.*

## About Us

MinnData, the MinnPost data team, is Alan and Tom aided by MinnPost reports and editors and all the awesome contributors to open source projects we utilize.  See our work at [minnpost.com/data](http://minnpost.com/data).

```

                                                   .--.
                                                   `.  \
                                                     \  \
                                                      .  \
                                                      :   .
                                                      |    .
                                                      |    :
                                                      |    |
      ..._  ___                                       |    |
     `."".`''''""--..___                              |    |
     ,-\  \             ""-...__         _____________/    |
     / ` " '                    `""""""""                  .
     \                                                      L
     (>                                                      \
    /                                                         \
    \_    ___..---.                                            L
      `--'         '.                                           \
                     .                                           \_
                    _/`.                                           `.._
                 .'     -.                                             `.
                /     __.-Y     /''''''-...___,...--------.._            |
               /   _."    |    /                ' .      \   '---..._    |
              /   /      /    /                _,. '    ,/           |   |
              \_,'     _.'   /              /''     _,-'            _|   |
                      '     /               `-----''               /     |
                      `...-'                                       `...-'

```
