### PARA ACTUALIZAR LA WEB (versión rápida)
 ```bash
npx expo export

git switch gh-pages

git rm -rf .
 ```
copiar dist/*

commit & push

Es decir:

git switch gh-pages
git rm -rf .
cp -r dist/* .
git add .
git commit -m "update"
git push origin gh-pages --force
git switch main