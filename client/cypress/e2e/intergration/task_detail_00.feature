@REQ_TDRAF-157, @REQ_TDRAF-120
Feature: Task List (board)
    As a user, after sign in
    I can create a new task

    Background:
        #@PRECOND_TDRAF-159
        Given User was signed in
        And User is at the Task List

    @id: 1
    Scenario Outline: Validation data in Task Details
        Given User openned the "Task Details"
        When User input <taskname> and <description>
        And set the <priority>
        And user click on the "Save" button
        Then There is a <message>

            Examples:
                | taskname     | description      | priority | message                      |
                | task name 01 |                  | low      | Please input require fieldss |
                |              |                  | high     | Please input require fieldss |
                |              | test description | normal   | Please input require fieldss |

    @TEST_TDRAF-158
    Scenario Outline: Create a new task in board successfully
        Given User opens the "Task Details"
        When User input <taskname> and <description>
        And set the <priority>
        And user click on the "Save" button
        Then There is a <message>

            Examples:
                | taskname        | description      | priority | message              |
                | Todo list day 1 | 1. Do A; 2. Do b | normal   | Created successfully |

    @id: 2
    Scenario Outline: Create a new task in board successfully without set priority
        Given User opens the "Task Details"
        When User input <taskname> and <description>
        And user click on the "Save" button
        Then There is a <message>
        And task's priority is "To Do"
            Examples:
            | taskname        | description      | message              |
            | Todo list day 1 | 1. Do A; 2. Do b | Created successfully |
