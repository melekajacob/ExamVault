# ExamVault (WIP)

Full-stack web application to allow students to generate practice exams for their classes with questions and solutions submitted by their peers. The goal is for a student to be able to join a class, specify their instructor, and be able to generate several high quality practice exams that they can print or download in order to study most effectively. They can then view the accompanying practice exam solution. The questions will be sourced from uploads of other students, and the quality of the questions will be scored based upon the ratings of other students (similar to how top answers on stack overflow are the ones upvoted the most).

# Motivation 

Studies show that consistent [practice examination is the most effective method for learning efficiently](https://journals.sagepub.com/stoken/rbtfl/Z10jaVH/60XQM/full). 
However, in my academic experience, instructors often give students little to no practice tests in preparation for exams. I often found myself copy/pasting textbook questions into word documents in order to take advantage of the benefits of testing. I would then have to go back to the textbook to reference the solutions. This entire process was annoying and time-consuming, and ExamVault will (eventually) eliminate this friction of practice exam generation.

# Setup

```
git clone https://github.com/melekajacob/shopify-img-repo.git
cd shopify-img-repo/frontend
npm install
npm start
```

Now navigate to `localhost:3000` to view the application

# Architecture

ExamVault was built as a serverless application with this current structure...
![QuestionVault Diagram](https://user-images.githubusercontent.com/23385706/118370605-56aed980-b576-11eb-8bb0-56dae67d76b7.png)

# Current Work

1. Parsing the question images into text (currently thinking LATEX) in order to prevent duplicates, and eventually allow for question recommendation
2. Generating exams using parsed text
3. Allow students to review questions they have completed, and allow that to factor into scoring system (probably also want a profanity check filter to prevent malicious users from polluting question set)
4. Allowing users to create, join, and search for classes, and then generate the exams for those classes
5. Allow instructors to be created for individual (we want to 
