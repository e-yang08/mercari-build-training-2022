# Build@Mercari Training Program 2022

Participant individually created simple version of Mercari web application. This repository includes my implementation (with some part from Step 5 branch built upon team's idea during Hackweek).


### Features and Demo
#### Frontend and Backend
- Empty state
- List item with image
- Show listed items with image
<img  alt="demo 1" src="https://i.imgur.com/jmyG3wK.gif">

<br>

- Autofill item's detail (not fully implemented web-scraping details yet)
<img alt="demo 2" src="https://i.imgur.com/e2cHj8H.gif">

#### Frontend only
- Search bar

#### API only
- Get an item by item ID
- Delete an item by item ID
- Search items by keyword
- Search an item by brand and product ID



### User guide

1. Make sure your local environment satisfies the following conditions:
    - `node v16` (install from https://nodejs.org/en/)
    - `Python v3.7` 
3. Clone this repository
   ```
   $ git clone https://github.com/e-yang08/mercari-build-training-2022.git
   ```
2. Open a terminal and launch the database under `python` directory

   ```
   $ uvicorn main:app --reload --port 9000
   ```
3. Open another terminal and launch the web app under `typescript/simple-mercari-web` directory

   ```
   $ npm start
   ```
   
   If you're running this app for the first time, please remember to run `$ npm ci` first.
   
5. Visit http://localhost:3000 (or it'll automatically launch)



#### Notes
- I chose Python track during this program to implement API, etc.  
- The latest Step 5 branch also incorporates work from Hackweek. Our team brainstormed the idea together and I implemented the database and frontend primarily.

<br/>

### Original README template from Build@Mercari Training Program

-----


This is [@e-yang08](https://github.com/e-yang08)'s build training repository.

Build trainingの前半では個人で課題に取り組んでもらい、Web開発の基礎知識をつけていただきます。
ドキュメントには詳細なやり方は記載しません。自身で検索したり、リファレンスを確認したり、チームメイトと協力して各課題をクリアしましょう。

ドキュメントには以下のような記載があるので、課題を進める際に参考にしてください。

In the first half of Build@Mercari program, you will work on individual tasks to understand the basics of web development. Detailed instructions are not given in each step of the program, and you are encouraged to use official documents and external resources, as well as discussing tasks with your teammates and mentors.

The following icons indicate pointers for 

**:book: Reference**

* そのセクションを理解するために参考になるUdemyやサイトのリンクです。課題内容がわからないときにはまずReferenceを確認しましょう。
* Useful links for Udemy courses and external resources. First check those references if you're feeling stuck.

**:beginner: Point**

* そのセクションを理解しているかを確認するための問いです。 次のステップに行く前に、**Point**の問いに答えられるかどうか確認しましょう。
* Basic questions to understand each section. Check if you understand those **Points** before moving on to the next step.

## Tasks

- [x] **STEP1** Git ([JA](document/step1.ja.md)/[EN](document/step1.en.md))
- [x] **STEP2** Setup environment ([JA](document/step2.ja.md)
  /[EN](document/step2.en.md))
- [x] **STEP3** Develop API ([JA](document/step3.ja.md)
  /[EN](document/step3.en.md))
- [x] **STEP4** Docker ([JA](document/step4.ja.md)/[EN](document/step4.en.md))
- [x] **STEP5** (Stretch) Frontend ([JA](document/step5.ja.md)
  /[EN](document/step5.en.md))
- [ ] **STEP6** (Stretch)  Run on docker-compose ([JA](document/step6.ja.md)
  /[EN](document/step6.en.md))

### Other documents

- 効率的に開発できるようになるためのTips / Tips for efficient development ([JA](document/tips.ja.md)/[EN](document/tips.en.md))
