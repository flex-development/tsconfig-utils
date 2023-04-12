#!/bin/sh

# Local Release Workflow
#
# 1. run typecheck
# 2. run tests
# 3. build project
# 4. run postbuild typecheck
# 5. print package size report
# 6. get new package version
# 7. get release branch name
# 8. switch to release branch
# 9. stage changes
# 10. commit changes
# 11. push release branch to origin
# 12. create pull request
#
# References:
#
# - https://cli.github.com/manual/gh_pr_create

yarn typecheck
yarn test:cov
yarn build
yarn check:types:build
yarn pkg-size
VERSION=$(jq .version package.json -r)
RELEASE_BRANCH=release/$VERSION
git switch -c $RELEASE_BRANCH
git add .
git commit -s -m "release: $(jq .tagPrefix package.json -r)$VERSION"
git push origin -u --no-verify $RELEASE_BRANCH
gh pr create --assignee @me --label scope:release --web
