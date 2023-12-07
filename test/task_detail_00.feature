@REQ_TDRAF-117 @REQ_TDRAF-120
Feature: Task List (board)
    As a user, after sign in
    I can update task or delete a task

    Background:
        Given User was signed in
        And User is at the Task List

    Scenario Outline: Create a new task in board
        Given User opens the "Task Details"
        When User input <taskname> and <description>
        And set the <priority>
        And user click on the "Save" button
        Then There is a <message>
        And The new task is appeared in "To Do"

            Examples:
            | taskname        | description      | priority | message                      |
            | Todo list day 1 | 1. Do A; 2. Do b | normal   | Create successfully          |
            |                 |                  | normal   | Please input require fieldss |
            | Todo list day 1 |                  |          | Please input require fieldss |
            |                 | 1. Do A; 2. Do b |          | Please input require fieldss |
