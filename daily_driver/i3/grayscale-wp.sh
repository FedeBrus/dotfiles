#!/bin/sh

IMG=~/Pictures/grayscale/wp3028140-grayscale-wallpapers.jpg
feh --bg-fill "$IMG" --bg-fill "$IMG"
convert "$IMG" -blur 0x8 /tmp/blurred.png
