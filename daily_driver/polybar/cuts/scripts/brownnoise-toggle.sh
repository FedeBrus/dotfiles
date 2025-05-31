#!/bin/bash

PIDFILE="/tmp/brownnoise.pid"

start_noise() {
  sox -q -c 2 -r 20000 -n -d -D synth 24:00:00 brownnoise vol 0.3 tremolo 0.03125 30 lowpass 500 bass +4 &
  echo $! >"$PIDFILE"
}

stop_noise() {
  if [ -f "$PIDFILE" ]; then
    kill "$(cat "$PIDFILE")" 2>/dev/null && rm -f "$PIDFILE"
  fi
}

toggle() {
  if [ -f "$PIDFILE" ] && ps -p "$(cat "$PIDFILE")" >/dev/null 2>&1; then
    stop_noise
  else
    start_noise
  fi
}

status() {
  if [ -f "$PIDFILE" ] && ps -p "$(cat "$PIDFILE")" >/dev/null 2>&1; then
    echo "󰓃 "
  else
    echo "󰓄 "
  fi
}

case "$1" in
toggle) toggle ;;
status) status ;;
*) echo "Usage: $0 {toggle|status}" ;;
esac
