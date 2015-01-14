startpage
====


##TODO
####Server:
- [x] Add [PHPUnit](https://phpunit.de/getting-started.html)
- [ ] Authentication:
  - [ ] Generate auth key & send email
  - [ ] Allow to send key only once per minute
  - [ ] Authenticate when key matches session
  - [ ] After 3 incorrect attempts - kill session
- [x] save order or tiles
- [ ] Add input validation
- [ ] update appcache manifest when data (|| icons) changed

####Client:
- [x] Add new tile
- [x] Remove a tile (with confirmation)
- [ ] Add groups (all items belong to `default` group. If name provided - create another container)
- [ ] Containers have their own settings (are containers draggable?)
- [ ] Read-only view with a "key" icon (no d&d or menus); when key is clicked - authentication pop-up appears

- [x] Add icons: allow selecting a font-awesome icon
- [ ] allow changing icon/text & bg colours
