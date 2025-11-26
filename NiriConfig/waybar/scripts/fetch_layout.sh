#!/usr/bin/env bash

if pgrep -x "Hyprland" >/dev/null 2>&1; then
    hyprctl devices -j \
        | jq -r '.keyboards[] | .active_keymap' \
        | sort -u \
        | head -n1 \
        | cut -c1-2 \
        | tr 'a-z' 'A-Z'
    exit 0
fi

if pgrep -x "niri" >/dev/null 2>&1; then
    niri msg keyboard-layouts \
        | grep -E '^[[:space:]]*\*' \
        | awk '{print $3}' \
        | cut -c1-3 \
        | tr 'a-z' 'A-Z'

    exit 0
fi

exit 1
