@REQ_TDRAF-117 @REQ_TDRAF-120
Feature: Task List (board)
    As a user, after sign in
    I can change status of task by drag and drop

    Background:
        Given User was signed in
        And User is at the Task List

    Scenario Outline: Chagne status by drag and drop
        Given User created a <taskname>
        When User drag this task from <column>
        And drop to  <column>
        Then There is a <message> 
        And The status of task is changed

            Examples:
            | taskname        | column     | column     | message              |
            | Todo list day 1 | To Do      | In Process | Updated successfully |
            | Todo list day 1 | To Do      | Completed  | Updated successfully |
            | Todo list day 1 | To Do      | Archived   | Updated successfully |
            | Todo list day 1 | In Process | Completed  | Updated successfully |
            | Todo list day 1 | In Process | Archived   | Updated successfully |
            | Todo list day 1 | In Process | To Do      | Updated successfully |
            | Todo list day 1 | Completd   | Archived   | Updated successfully |
            | Todo list day 1 | Completd   | In Process | Updated successfully |
            | Todo list day 1 | Completd   | To Do      | Updated successfully |
            | Todo list day 1 | Archived   | Completd   | Can NOT do it        |
            | Todo list day 1 | Archived   | In Process | Can NOT do it        |
            | Todo list day 1 | Archived   | To Do      | Can NOT do it        |