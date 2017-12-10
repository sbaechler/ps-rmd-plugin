# ps-rmd-plugin

A prototype of a responsive metadata plugin for Adobe Photoshop.

The plugin supports the [RMD standard](https://github.com/universalimages/rmd) 
promoted by the [W3C Universal Image Community Group](https://www.w3.org/community/universalimages/).

[![Build Status](https://travis-ci.org/sbaechler/ps-rmd-plugin.svg?branch=master)](https://travis-ci.org/sbaechler/ps-rmd-plugin)

Use the [rmd-extension](https://github.com/universalimages/rmd-extension) to view the
generated metadata in the file info dialog.

## Installation

The plugin only supports Photoshop CC and is therefore best installed via the Creative Cloud.

You can download the binary build from the Github release page and install it yourself.
Rename the file to `universalimages.zip` and extract it. (Use the unarchiver on Mac.)
Copy the folder to `~/Library/Application Support/Adobe/CEP/extensions/`. Create the folder if it 
doens't exist.

## Development
The plugin is written using the 
[Adobe CEP](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_7.x/CEP_7.0_HTML_Extension_Cookbook.pdf) 
framework version 7.0 (Chromium 41 / IO.js 1.2).

During development, enable the developer mode to run unsigned plugins. (See the guide linked above).
The path to the preference file changes with every major version of Photoshop. 

To install the dependencies run

    npm install
    bower install
    
