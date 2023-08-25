# Map Pins

Show a pin on a map in a YoDeck Layout based on the name of the current player.

This app does not provide the map itself. Instead, layer this over top of the map image when adding to the Layer, and make sure to check the "Allow transparency" option.

In order for things to line up, the app needs to be configured with width and height of the region where the map will display, including the entire window if the map will fill the screen.

The pin locations are configured as a JSON object, with properties for each player name, whre the value of the property is a nested object with "locX" and "locY" properties holding the coordinate for the pin for that item.

For example:

```
{
  "Player1":{"locX":464,"locY":566},
  "Player2":{"locX":475,"locY":424}
}
```
You can, of course, include other properties to make maintenance eaiser (say, location descriptions), but they will be ignored by the app. You may need trial and error to get the exact correct coordinate.

When adding this in YoDeck, the player location will not change so it's recommended to set this as a Static App.
