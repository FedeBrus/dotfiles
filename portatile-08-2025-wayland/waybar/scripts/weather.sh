icon=""

case "$(curl -s 'wttr.in/Pordenone?format=%C')" in
  *Clear*) icon="滛" ;;
  *Cloud*) icon="摒" ;;
  *Rain*)  icon="流" ;;
  *Snow*)  icon="漢" ;;
  *Night*) icon="望" ;;
esac

temp=$(curl -s 'wttr.in/Pordenone?format=%t')
echo "$icon $temp"

