@REQ_RDRAF-115 
Feature: Admin feature
    As a user, after sign in, I can sign out
    As a user, after signning in, I can change password
    
    Background: User sign in successfully
      Given User use account with <userID>, <Password>
      And User is in "Task List"

      Examples:
        | userID     | Password   |
        | chauvu     | abC#123    |

    @id: 1
    Scenario: Sign out successfully
      When User click on the "Sign out" button
      Then User go to the "Login Page"
    
    @id: 2
    Scenario Outline: Change password
      Given User openned the "Change Password" pop-up
      When User input old <Password>, new <Password>
      And User click on the "Submit" button
      Then there is a <message>
  
      Examples:
        | Password | Password | message                      |
        | abC#123  | abC$$123 | Chagne password successfully |
        | abC#12   | abC$$123 | Password invalid             |
        |          |          | Nothing change               |
