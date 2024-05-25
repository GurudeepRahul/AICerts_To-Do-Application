### How To Run
* Clone this Project locally and run `npm install` to install all the dependencies.
* `npm start` to run the server running in port `8081`.

### Routes used

1) `GET CALL /tasks`
  * Response will have status code 200, and attributes will be `success` stating whether the data extraction is successful and an array `tasks` containing all the tasks.

2) `POST CALL /tasks`
  * Response will have status code 201 when the addition of task is successful into the array.
  * Response will have status code 400 when either `title, description, status, dueDate` is empty.

3) `GET CALL /tasks/:id`
  * Response will have status code 200 when the task ID is in the task array, the response will have success as true, and the task will have the task data.
  * Response will have status code 404 when the task Id is not in the tasks array.

4) `PUT CALL /tasks/:id`
  * Response will have status code 200 when the task ID is in the task array, the response will have success as true and the updated Task.
  * Response will have status code 404 when the task Id is not in the tasks array.

5) `DELETE CALL /tasks/:id`
  * Response will have status code 200 when the task ID is in the task array, the response will have success as true.
  * Response will have status code 404 when the task Id is not in the tasks array.  
