Release History

V0.5 - Used to build complex applications

Changes:

- Added Bindster.setModel(newModel) to set a new after starting Bindster.

- Added Binster.setController(newController) to set a new controller after starting Bindster

- Added trigger attribute which will inject code when the model is updated as a result of binding

- Added testing framework that allows values to be set and testing based on their bound values

- Added pleaseselect tag on selects to specify the text to be displayed when the bound value matches no value in the select options

- Added regex match tag to onarrival so a range of urls can be specified

- Added onhide and onshow events that can be used for animations

Fixes:

- Improved handling of complex binding expressions such that they can handle binderrors

- Prevented extra onarrival calls for pages

- sorting of data values on binding to selects was not working

- binding to booleans in selects handled correctly now

V0.5

 



 
