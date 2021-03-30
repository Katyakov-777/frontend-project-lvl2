install: 
	npm install

install-deps:
	npm ci

run:
	bin/gendiff.js __fixtures__/before.json  __fixtures__/after.json
test:
	npx -n --experimental-vm-modules jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8

watch:
	npx -n --experimental-vm-modules jest --watchAll

publish:
	npm publish --dry-run

lint:
	npx eslint .