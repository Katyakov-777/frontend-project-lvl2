install: 
	npm install

install-deps:
	npm ci

run:
	gendiff __fixtures__/file1.yml  __fixtures__/file2.yml
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