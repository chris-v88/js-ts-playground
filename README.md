# JS/TS Playground
> This is a simple web-based playground for writing and running JavaScript and TypeScript code.

You can write code, run it, and see the output right away.
The editor uses **Monaco Editor** (the same editor as VS Code) and has a clean, easy-to-use interface.

## Status:
Work in progress. More features and fixes coming soon!

Story Board:
https://trello.com/b/LpUN7PuQ/javascript-typescript-playground

## Why I choose Semantic UI CDN instead of `npm install`:
* **Easy to set up**: only need to add a link to the CDN in the HTML. No need to install anything
* **Works on GitHub Pages**: GitHub Pages only hosts static files -- using CDN means no need to build or install packages
* **No build tools needed**: No need `Node.js`, `npm`, or any build process, just open the HTML file and it works
* **Fast to start**: Anyone can run the project right away

## Features
* Write JavaScript or TypeScript code in the browser
Run your code and see the output instantly
Switch between dark and light themes _(work in progress)_
Option to save your code in local storage _(work in progress)_
Simple UI with Semantic UI for buttons and dropdowns

## How to Use
Just open the website https://chris-v88.github.io/js-ts-playground/
Start writing code in the editor
Click Run to see the output

## Folder Structure
index.html – Main HTML file.
style.css – Styles for the playground.
playground.js – JavaScript for editor and running code.

## Work in Progress
This project is not finished yet. Things I am still working on one-by-one:

**1. Better error output**

I want errors to show in a different color from normal console logs, so it’s easy to see what went wrong

**2. ESLint integration**

I want to add code linting to help catch errors and improve code quality

**3. UI improvements**

The design and layout still need work to look better and be easier to use.

**4. Settings functionality**

Some settings (like auto-run, save code, theme toggle) are currently not working yet.

## Note:
This project is for learning and experimenting. 

Feel free to create any **issues** as a feature you want to add, I can get to it whenever I have free time.
