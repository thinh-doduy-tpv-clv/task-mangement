@REQ_TDRAF-157, @REQ_TDRAF-120
Feature: Task List (board)
    As a user, after sign in
    I can update task or delete a task

    Background:
        #@PRECOND_TDRAF-162
        Given User was signed in
        And User is at the Task List

    @TEST_TDRAF-160
    Scenario Outline: Update a new task in board
        Given User opens the "Task Details" by doule-click the task <taskname>
        When User input <taskname> and <description>
        And change the <priority>, <status>
        And user click on the "Save" button
        Then There is a <message>
        And The new task is appeared in "To Do"

            Examples:
            | taskname        | taskname        | description               | priority | status     | message              |
            | Todo list day 1 | Todo list day 2 | 1. Do A; 2. Do b          | normal   | To Do      | Updated successfully |
            | Todo list day 1 |                 | 1. Do A; 2. Do b          | normal   | In process | Task name is null    |
            | Todo list day 1 | Todo list day 1 |                           | normal   | Completed  | Description is null  |
            | Todo list day 1 | Todo list day 3 | 1. Do A; 2. Do b; 3. Do c | High     | To Do      | Updated successfully |
            | Todo list day 1 | Todo list day 3 | 1. Do A; 2. Do b; 3. Do c | High     | Archived   | Can NOT do it        |

    @TEST_TDRAF-161
    Scenario Outline: Delete task in board
        Given User created a <taskname> with <status
        When User click on the "Trash" icon
        And Confirm action
        Then This task is deleted with message

            Examples:
            | taskname        | status     | message              |
            | Todo list day 1 | To Do      | Deleted successfully |
            | Todo list day 2 | In process | Deleted successfully |
            | Todo list day 3 | Completed  | Deleted successfully |
            | Todo list day 4 | Archived   | Can NOT delete task  |
