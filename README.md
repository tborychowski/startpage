startpage
====


##TODO
####Server:
- [ ] Add [PHPUnit](https://phpunit.de/getting-started.html)
- [ ] Add authentication:
  - [ ] Generate auth key & send email
  - [ ] Allow to send key only once per minute
  - [ ] Authenticate when key matches session
  - [ ] After 3 incorrect attempts - fail key, kill session

####Client:
- [ ] Add groups (all items belong to "default` group. If different is specified - this creates another container)
- [ ] Containers have their own settings (are they draggable?)
- [ ] Add icons:
  - [ ] allow selecting a font-awesome icon
  - [ ] allow pasting an image url (which will be e.g. converted to DataURI)
