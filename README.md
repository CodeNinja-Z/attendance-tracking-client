# Project

Attendance Tracking app built with Ruby on Rails for the API and React for the Client. This repo is the Client repo.

Heroku link for the Client/Front-end: https://attendance-tracking-client.herokuapp.com/

Use the above link as the entry to access the app on Heroku. The link below is where the API is located at. It won't return anything when going to the link but I'll list it here, too for your reference.

Heroku link for the API/Back-end: https://attendance-tracking-api.herokuapp.com/

* React version: 17.0.1

* Ruby version: 3.0.0

* Rails version: 6.1.3

According to the requirement of having tests and validations, the API/Back-end was implemented model validations, controller exception handlers and full test suites covering all endpoints. The Client/Front-end was implemented form validations and error handlers as well.

## Please describe your process for approaching the code challenge. What kind of planning did you do? Did your plans change as you began coding?

1. **System Design**
I did a system design before coding. After reading the requirement, I understood that the app needs a Authentication/Authorization service. It needs a database to store all the clock logs and user information. It also needs a back-end service to map the data to the database and pass data to a front-end service, not surprisingly. The front-end service will just be in charge of rendering the data.

2. **Plan the API/Back-end**
Next, I thought about how many models/tables I needed and the relationship between them (User model & AttendanceLog model). I listed the attributes I needed for each model, as well as what database columns I should add index on for query faster. Furthermore, I thought about some helper methods and queries I may need to write and went over them on my mind. Lastly, I thought about what third-party libraries I needed to use.

3. **How the client/Front-end should look like**
After finish designing the API, the next thing will be the client. I pictured how my front-end UI should look like, and how the data needs to be presented, as well as how to pass new data to the API. I also thought about what third-party libraries I should include.

4. **What tools I need to implement this project**
The assignment asks using Ruby on Rails alone, but given that HiMama's current technology stack for front-end and back-end services are React + Ruby on Rails. So I decided to implement the project into two apps, using React for the client, and use Ruby on Rails for the API.

## Describe the schema design you chose. Why did you choose this design? What other alternatives did you consider?

1. Describe the schema design you chose. Why did you choose this design?

My schema has two models. Please read below to understand the purpose of each attribute and their usage.

* User model attributes

  ** first_name - for knowing who a user is and how to address them
  
  ** last_name - for knowing who a user is and how to address them
  
  ** email - for sign up and login (i.e. Authenticaton & Authorization)
  
  ** password_digest - for sign up and login (i.e. Authenticaton & Authorization)
  
I implemented JWT auth as my Auth Service, where after a user sign up or login, the server gives the user a JWT token as her indentity and it saves in the browser local storage. For any following request she makes, she needs to include the token in request header in order to be authorized to access any API endpiont.

User has_many Attendance Logs.

* AttendanceLog model attributes

  ** user_id - foreign key, belongs_to User model
  
  ** name - only accepts two values. a log is either a 'ClockIn' or 'ClockOut' log

  ** occured_at - the timestamp to the log
  
  ** description - optional field, can be filled or not just for record. for example 'for lunch'
  
  ** clock_in_log_id - this field is for self-reference in the model. for each clock_out_log, it should have a paired clock_in_log, vice versa. having self-reference also allows me write a query like attendance_log.clock_in_log to get a clock_out_log's paired clock_in_log for easier calculation in instance method.
  
Attendance Log belongs to User. A clock_out_log belongs to a clock_in_log. A clock_in_log has one clock_out_log.

2. What other alternatives did you consider?

Another way of designing the database would be having duo tables for the Clock Events. I could have a table only store the clock event type/name and the other table saves the actual clock events

* EventType table
  
  ** id
  
  ** name - either "ClockIn" or "ClockOut"
  
EventType has_many ClockEvents

* ClockEvent table

  ** event_type_id - foreign key, belongs_to
  
  ** user_id - foreign key, belongs_to
  
  ** occured_at
  
  ** description
  
ClockEvent belongs_to EventType

## If you were given another day to work on this, how would you spend it? What if you were given a month?

1. If you were given another day to work on this, how would you spend it?

* The front-end edit/update attendance log functionality isn't fully implemented because of the time limit (4 hours in the assignment requirement). I'll get it done if I had more time. However, the back-end functionality for this is done and covered by test suites. Please refer to the API endpoint to have a look.

* Add Jest and Enzyme to test the Front-end code.

* Organize the back-end data in a better way. Currently, I did all the data calculation and formatting on the back-end. I can offload some of work to the front-end so it could save a few database queries, and the app will work faster overall. As a back-end centric engineer, I have the mindset to do more things for the front-end so their life will be easier. But sometimes offloading some work to the front-end actually makes the app perform even better.

2. What if you were given a month?

* Keep records of every modified attendance log to avoid any malicious purpose. This can be done either by creating an AuditAttendanceLogs table to save all the modified records of AttendanceLogs table, or using PostgreSQL's Trigger Function (doing the same thing without having to have a Rails model). Rails doesn't support Trigger Functions so in order to do so I need to operate in PostgreSQL database directly. I know what is Trigger Function and what problem it solves but I don't have experience with it. Need to do more reading for getting it done this way.

* Have better notifications. Send notification to users at the beginning and the end of weekdays to remind them to clock in/out. If an abnormal long hour is clocked, send notification to the user (who might forget to clock out), and their managers (if any).

* Make the user be able to search logs by date/month, do some filtering and sorting.

* Write more error handlers on both the back-end and front-end.

* Polish the UI to make it appealing to use.
