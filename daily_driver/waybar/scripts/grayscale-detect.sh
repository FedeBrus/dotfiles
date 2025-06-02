if [[ $(hyprshade current | tr -d '\n') == "grayscale" ]]; then
  echo '󰹊 '
else
  echo '󰌁 '
fi
