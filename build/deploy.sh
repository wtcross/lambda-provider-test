#!/bin/bash -ev

DPL_DIR="${HOME}/dpl"
DPL_BIN="${DPL_DIR}/bin/dpl"

git clone -b feat-lambda-provider https://github.com/wtcross/dpl.git ${DPL_DIR}
chmod +x ${DPL_BIN}
rm -rf ./node_modules
npm install --production
${DPL_BIN} --provider=lambda --access_key_id=${AWS_ACCESS_KEY} --secret_access_key=${AWS_SECRET_KEY} --function_name='test-lambda' --role='${LAMBDA_ROLE}' --handler='handler'
