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
- [ ] Read-only view with a "key" icon (no d&d or menus); when key is clicked - authentication pop-up appears (fa-lock & fa-unlock-alt)
- [ ] Allow changing icon/text & bg colours

- [ ] Add groups (all items belong to `default` group. If name provided - create another container)
- [ ] Containers have their own settings (are containers draggable?)
- [x] Add new tile
- [x] Remove a tile (with confirmation)
- [x] Add icons: allow selecting a font-awesome icon
