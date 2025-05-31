#!/bin/bash

toggle_mode=$(cat /tmp/toggle_mode_state)
echo $toggle_mode
if [ "$toggle_mode" = "grayscale" ]; then
  feh --bg-fill /tmp/bw.png --bg-fill /tmp/bw.png
else
  feh --bg-fill /tmp/color.png --bg-fill /tmp/color.png
fi
