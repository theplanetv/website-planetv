export $(grep -v '^#' .env | xargs)

PROJECT_API_CHI_IMAGE=$(eval echo $PROJECT_API_CHI_IMAGE)
PROJECT_DATABASE_IMAGE=$(eval echo $PROJECT_DATABASE_IMAGE)
PROJECT_NEXT_IMAGE=$(eval echo $PROJECT_NEXT_IMAGE)
PROJECT_API_CHI_CONTAINER=$(eval echo $PROJECT_API_CHI_CONTAINER)
PROJECT_DATABASE_CONTAINER=$(eval echo $PROJECT_DATABASE_CONTAINER)
PROJECT_NEXT_CONTAINER=$(eval echo $PROJECT_NEXT_CONTAINER)

remove_web_next_image() {
  docker rmi ${PROJECT_NEXT_IMAGE}
}
remove_images() {
  docker rmi ${PROJECT_DATABASE_IMAGE} ${PROJECT_API_CHI_IMAGE} ${PROJECT_NEXT_IMAGE}
}

print_list() {
  echo "Pass wrong arguments! Here is list of arguments for docker test script"
  echo -e "\tremove-images : remove all image"
}

# Main script
if [ $# -eq 1 ]; then
  case "$1" in
  "remove-images")
    remove_images
  ;;

  "rebuild")
    docker compose down
    remove_images
    docker compose up -d
  ;;

  "rebuild-web-next")
    docker compose stop
    remove_web_next_image
    docker compose up -d
  ;;

  *)
    print_list
  ;;
  esac
else
  print_list
fi
