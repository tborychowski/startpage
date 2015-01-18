startpage
====


##TODO
####Server:
- [ ] Add input validation
- [ ] Update appcache manifest when data (|| icons) changed
- [ ] Authentication:
  - [ ] Generate auth key & send email
  - [ ] Allow to send key only once per minute
  - [ ] Authenticate when key matches session
  - [ ] After 3 incorrect attempts - kill session
- [x] Add [PHPUnit](https://phpunit.de/getting-started.html)
- [x] Save order or tiles


####Client:
- [ ] Read-only view (just links) | edit mode (fa-lock & fa-unlock-alt ?)
- [ ] Allow changing tile bg colour (and match the text color)
- [ ] context-menu:
  - [ ] on board: edit mode | view mode/add tile/add group
  - [x] on tile: edit/del tile | 
  - [ ] on group: del group

- [ ] Groups:
  - [ ] first group has "app" layout - all consecutive are lists
  - [ ] group settings? (name, bg, layout, minimize?)
- [x] Add new tile
- [x] Remove a tile
- [x] Allow to select a font-awesome icon for a tile

###Build/Architecture/Future
- [x] Do I need Angular? (no!)
- [x] ES6? (CommonJS for now)
- [ ] Note-tiles?

 
