# ExamVault

Submission for Shopify 2021 Intern challenge. ExamVault is a webapp which allows users to upload images of questions (i.e. math, science, trivia) and optionally solutions along with metadata, and then provide an interface to view these questions and then the solution.

# Setup

```
git clone https://github.com/melekajacob/shopify-img-repo.git
cd shopify-img-repo/frontend
npm install
npm start
```

Now navigate to `localhost:3000` to view the application

# Architecture

ExamVault was built as a serverless application.

# Improvements

1. Currently bucket to store images is public, more work with signed URLs can be done to only give user access to images
2. Testing, both frontend and backend
3. More info given when viewing the solution, right now just shows the image
4. Mix of bootstrap and react-bootstrap in frontend, we need to standardize
