#!/bin/bash

IMG=$(find /home/haida/Pictures/wallpapers/ -type f | shuf -n 1)
cp "$IMG" /tmp/color.png
convert "$IMG" -colorspace Gray /tmp/bw.png
convert "$IMG" -blur 0x8 /tmp/blurred.png
convert "$IMG" -colorspace Gray -blur 0x8 /tmp/bw_blurred.png

if [ ! -f "/tmp/toggle_mode_state" ]; then
  echo "color" >/tmp/toggle_mode_state
fi
