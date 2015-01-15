 #/bin/bash
JS_FILES=$(find $PWD -name '*.js')

for FILE in $JS_FILES; do
    short_name=`basename $FILE`
    filename="${short_name%.*}"
    git grep --quiet $filename 1>/dev/null
    if [ "$?" == "1" ]; then
        echo "Should delete: $FILE"
    fi
done;