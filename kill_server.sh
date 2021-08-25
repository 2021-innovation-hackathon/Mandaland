echo "kill every node process"
kill -9 `ps -ef | grep node | grep -v grep | awk '{print $2}'` 