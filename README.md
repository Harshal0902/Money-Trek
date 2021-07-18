# Money Trek

Manage your expenses while traveling with just a click of the bill and we will do the rest.

## Why the name **Money Trek**

The name is a combination of two words **Money** and **Trek**. **Trek** is a homonym for **Track** and we built this app keeping travel expenses in mind hence **Trek**.
## 💡 Inspiration

Whenever I plan a trip with my friends, it becomes very hard for me to keep track of my budget during the trip, and handling various bills is very hard.

## 💻 What it does

Money Trek is a money splitting web app where you can keep track of your budgets and calculate how much money you have to give or take from your friends. This web app can be very useful during trips and other occasions where calculation of budget and who pays for what is necessary.

## ⚙️ How it works

- User need to Log In/Sign Up
- Then user need to send friend request to their friends whit whom they want to go on the trip.
- In the split bill section, user need to upload the picture of the bill, and it will automatically recognize the grand total of the bill and split it between the friends.
- The splitting of bills is based on number of friends on a trip(i.e. accepted your friend request for going on a trip).
- Then user can check how much money they have to give or take from their friends
- User can put up the marker in the Trip page, where can check afterwards where they visited

## 🔨 How we built it

- Forntend: HTML, CSS, jQuerry
- Backend: Django
- Database: CockroachDB

## 🧠 Challenges we ran into

One of the biggest challenge was using backend Django with CockroachDB, as none of us has any experience of doing that.

## 🏅 Accomplishments that we're proud of

We are happy that we completed the project in this short frame of time and we learned a lot from this hackathon

## 📖 What we learned

How to integrate backend Django with CockroachDB, and collaboration.

## 🚀 What's next for Money Trek

- Adding more languages
- Information of nearby place(eg. hotel, restaurant)

## Installing and running
```
pip install requirements.txt
python manage.py runserver
```
