# Welcome to Money Map

This repo provides a tool for modeling out your financial trajectory, based on your savings, assets, debts, income, expenses, and plans for the future. It accounts for taxes, rules around retirement and 529 saving accounts, and uncertainty around investment returns.

For convenience, I've included a form that can be imported in a jupyter notebook, and which can render widgets widgets to easily adjust inputs to the model. There are also some tools to visualize the results of the money map in a jupyter notebook.

For an example and step-by-step instructions on using the model in a jupyter notebook see:
https://colab.research.google.com/drive/1blrIDsWdIlDt-gjOgxV4HImuQXqDSZge

This is very much a work-in-progress, so there are lots of quirks and limitations. Bear with me! I made it originally to model out my own financial situation (renter, live in NYC, married with 2 kids), and some of the capabilities for people in different situations are less developed.

# Examples:

## Static mode:

<img width="879" alt="Screenshot 2024-10-07 at 3 19 06 PM" src="https://github.com/user-attachments/assets/34cadbd2-4a3a-41ff-a8a1-5d8183027570">

## Dynamic mode:

<img width="793" alt="Screenshot 2024-10-07 at 3 19 38 PM" src="https://github.com/user-attachments/assets/7afa3332-f2dd-4214-a370-9c7effbe7e2a">

## Editing inputs:

<img width="1404" alt="Screenshot 2024-10-07 at 3 25 20 PM" src="https://github.com/user-attachments/assets/992fb442-480b-43a2-8067-7650c87306fe">

## IN-PROGRESS:

- Building a React/Flask app that makes this all much easier to use.
  To run the app locally:
  `docker compose up backend/frontend` or `docker compose up backend/frontend --build`

  If you've made changes to package.json, you need to first run `docker compose down frontend -v`, then `docker compose up frontend --build` in order to delete the existing frontend volume.

### To deploy:

#### Frontend

- Set a tag: `export TAG=v0.0.1`
- Build the frontend image: `docker build -t us-central1-docker.pkg.dev/money-map-441715/frontend/frontend:$TAG --build-arg ENV=production --build-arg GIT_VERSION=$(git rev-parse --short HEAD) ./frontend`
- Push the frontend image: `docker push us-central1-docker.pkg.dev/money-map-441715/frontend/frontend:$TAG`
- Deploy the frontend image: `gcloud run deploy frontend-service --image us-central1-docker.pkg.dev/money-map-441715/frontend/frontend:$TAG --platform managed --region us-central1 --allow-unauthenticated --set-env-vars NODE_ENV=production`

#### Backend

- Set a tag: `export TAG=v0.0.1`
- Build the backend image: `docker build -t us-central1-docker.pkg.dev/money-map-441715/backend/backend:$TAG --build-arg ENV=production ./backend`
- Push the backend image: `docker push us-central1-docker.pkg.dev/money-map-441715/backend/backend:$TAG`
- Deploy the backend image: `gcloud run deploy backend-service --image us-central1-docker.pkg.dev/money-map-441715/backend/backend:$TAG --platform managed --region us-central1 --allow-unauthenticated`

### TODO:

- IMPROVE THIS README
- Let Income, Expense, and maybe other classes grow over time (i.e., have a AAGR)
- Add a ceiling on an account, after which money goes into another account, e.g., after $50k, all deposits into a bank account instead go into a mutual fund.
- Assets can be sold
- Home purchases can occur on a specific year, rather than always occurring in 2024
- Users can set their local and state tax brackets, rather than always using NY/NYC's
- Accounts can be invested at differing degrees of aggressiveness (cautious, moderate, aggressive)
- Incorporate 401k/IRA required withdrawals
- Dynamic model improvements
  - Bond and stock market returns are correlated
