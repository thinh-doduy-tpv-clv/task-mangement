@REQ_TDRAF-115, @REQ_TDRAF-120  
Feature: Admin feature
    As a user, after sign in, I can sign out
    As a user, after signing in, I can change password
    
    Background: User sign in successfully
      #@PRECOND_TDRAF-140
      Given User use account with chauvu, abC#123 

    @TEST_TDRAF-138
    Scenario: Sign out successfully
      Given User is in "Task List"
      When User click on the "Sign out" button
      Then User go to the "Login Page"
    
    @TEST_TDRAF-139
    Scenario Outline: Change password
      Given User openned the "Change Password" pop-up
      When User input <Old_Password>, <New_Password>
      And User click on the "Submit" button
      Then there is a <message>
  
      Examples:
        | Old_Password | New_Password | message                      |
        | abC#123      | abC$$123     | Chagne password successfully |
        | abC#12       | abC$$123     | Password invalid             |
        |              |              | Nothing change               |
