hyprctl devices -j |
  jq -r '.keyboards[] | .active_keymap' |
  sort -u |
  head -n1 |
  cut -c1-2 |
  tr 'a-z' 'A-Z'
