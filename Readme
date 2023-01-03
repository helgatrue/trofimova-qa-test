# Olga Trofimova's Tests

There are the results of technical assignment. In this .zip exist UI and API tests.

## Tests
### UI
- TC01-Verify user can enter new data into the table
- TC01-Verify user can edit the row in a table
- TC02-Verify broken image
- TC03-Verify user can submit the form
- TC04 - Verify the progress bar
- TC05 - Verify the tooltip
- TC06 - Verify user can drag and drop
- Drag and drop markdown and HTML files into Dillinger
- Export documents as Markdown, HTML and PDF

### API
- Positive - POST /AccountV1UserPost
- Negative - POST /AccountV1UserPost
- Positive - POST GenerateToken and Authorized
- Negative - POST Authorized
- Negative - POST /BookStore/V1/Books
-

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

This text you see here is *actually- written in Markdown! To get a feel
for Markdown's syntax, type some text into the left window and
watch the results in the right.

## Test run

Install all the dependencies.

```sh
npm install cypress --save-dev
```

For running all tests

```sh
npx cypress open
```

## Plugins

In the "TC03-Verify user can submit the form" test I verify the final fields with image comparison. The default (golden ratio snapshot) located in baseline folder.
After each run, test creates the new snapshot and compare it with default one.
https://github.com/uktrade/cypress-image-diff
