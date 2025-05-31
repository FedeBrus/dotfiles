#!/bin/bash

if [ -f /tmp/toggle_mode_state ]; then
  MODE=$(cat /tmp/toggle_mode_state)
  if [ "$MODE" = "color" ]; then
    echo "󰌁 " # o qualsiasi icona
  elif [ "$MODE" = "grayscale" ]; then
    echo "󰹊 " # o un'altra icona
  else
    echo "?" # valore sconosciuto
  fi
else
  echo "✖" # file mancante
fi
