export $(grep -v '^#' .env | xargs)

PROJECT_API_CHI_CONTAINER=$(eval echo $PROJECT_API_CHI_CONTAINER)
PROJECT_DATABASE_CONTAINER=$(eval echo $PROJECT_DATABASE_CONTAINER)

test_wait_postgresql() {
	# Maximum number of attempts to check PostgreSQL readiness
	max_attempts=5

	# Counter for tracking the number of attempts
	attempt_count=0

	# Check PostgreSQL readiness with a loop
	while [ $attempt_count -lt $max_attempts ]; do
		# Try to check PostgreSQL readiness with a 5-second timeout for each attempt
		if timeout 5 docker exec ${PROJECT_DATABASE_CONTAINER} pg_isready; then
			echo "PostgreSQL is ready"
			break
		else
			echo "Waiting for PostgreSQL to become ready... attempt $((attempt_count + 1))"
		fi
		attempt_count=$((attempt_count + 1))
		sleep 2
	done

	# If PostgreSQL is not ready after max_attempts, exit with an error
	if [ $attempt_count -ge $max_attempts ]; then
		echo "PostgreSQL is not ready after $max_attempts attempts. Exiting..."
		exit 1
	fi

	# Run the test if PostgreSQL is ready
	echo "PostgreSQL is ready after $attempt_count attempts. Running the test..."

	case $1 in
		"blogtag-route" )
		docker exec ${PROJECT_API_CHI_CONTAINER} go test -v \
			/api-chi/cmd/routes/auth.go /api-chi/cmd/routes/blogtag.go /api-chi/cmd/routes/blogtag_test.go
		;;

		"blogtag-service" )
		docker exec ${PROJECT_API_CHI_CONTAINER} go test -v \
			/api-chi/cmd/services/blogtag.go /api-chi/cmd/services/blogtag_test.go
		;;
	esac
}

# Print list of options
print_list() {
	echo "Pass wrong arguments! Here is list of arguments for docker test script"
	echo -e "\ttest : test all unit test"
}

# Main script
if [ $# -eq 1 ]; then
	case "$1" in
		"api-auth-middleware" )
		docker exec ${PROJECT_API_CHI_CONTAINER} go test -v \
			/api-chi/cmd/middlewares/auth.go /api-chi/cmd/middlewares/auth_test.go
		;;

		"api-auth-route" )
		docker exec ${PROJECT_API_CHI_CONTAINER} go test -v \
			/api-chi/cmd/routes/auth.go /api-chi/cmd/routes/auth_test.go
		;;

		"api-auth-service" )
		docker exec ${PROJECT_API_CHI_CONTAINER} go test -v \
			/api-chi/cmd/services/auth.go /api-chi/cmd/services/auth_test.go
		;;

		"api-blogtag-route" )
			test_wait_postgresql blogtag-route ;;

		"api-blogtag-service" )
			test_wait_postgresql blogtag-service ;;

		"coverage" )
			docker exec ${PROJECT_API_CHI_CONTAINER} go test -coverprofile=coverage.out ./...
			docker exec ${PROJECT_API_CHI_CONTAINER} go tool cover -html=coverage.out -o ./coverage.html
			docker cp ${PROJECT_API_CHI_CONTAINER}:/api-chi/coverage.html ./coverage.html
			;;

		* )
			print_list ;;
	esac
else
	print_list
fi