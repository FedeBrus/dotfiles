#!/bin/bash
grim -g "$(slurp -b "#00000088" -c "#ebdbb2")" - | wl-copy --type image/png &&
  notify-send "📸 Screenshot copiato nella clipboard"
