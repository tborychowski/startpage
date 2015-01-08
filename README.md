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
- [ ] save order or tiles

####Client:
- [x] Add new tile
- [x] Remove tile (with confirmation)
- [ ] Add groups (all items belong to "default` group. If name provided - create another container)
- [ ] Containers have their own settings (are containers draggable?)
- [ ] Read-only view with a "key" icon (no d&d or menus); when key is clicked - authentication popup appears
- [ ] Add icons:
  - [ ] allow selecting a font-awesome icon, or:
  - [ ] allow pasting an image url (which will be e.g. converted to DataURI)
