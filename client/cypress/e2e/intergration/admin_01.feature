@REQ_TDRAF-115, @REQ_TDRAF-120
Feature: Admin feature
    As a user, I can sign in.
    As a user, I can reset my password when I forgot it.

    Background:
      #@PRECOND_TDRAF-145
      Given User have registered account
      And The account has "Username" is chauvu
      And "password" is "abC#123"
      And Email is "vuminhchaucyberlogictec@gamil.com"
    
    @TEST_TDRAF-141
    Scenario Outline: Sign in unsuccessfully
      Given User is in the "Login Page"
      When User input <userID>, <Password>
      And User click on the "Sign" button
      Then User can NOT sign in
      And There is a <message>
  
      Examples:
        | userID | Password | message                        |
        | chauvu | abC      | Invalid User name and Password | 
        | chauvU | abC#123  | Invalid User name and Password |
        |        |          | Invalid User name and Password |

    #AC2
    @TEST_TDRAF-142
    Scenario Outline: Sign in successfully
      Given User is in the "Login Page"
      When User input <userID>, <Password>
      And User click on the "Sign" button
      Then There is a message "Welcome!"
      And User go to the "Task List"
  
      Examples:
        | userID     | Password   |
        | chauvu     | abC#123    |
        | manhnguyen | 123456abc# |
    
    #AC4: Forgot password 
    @TEST_TDRAF-143
    Scenario Outline: Reset Password successfully
      Given User is in the "Forgot Password Page"
      And User go to the "Reset Password Page"
      When User update new <Password> at "Reset Password Page"
      And User verify it one more times
      Then There is a message "Reset Password Successfully"
      And User back to the "Login Page"
      And User can login with new password

        Examples:
          | Password |
          | 12345678 |

    @@TEST_TDRAF-144
    Scenario Outline: Reset Password unsuccessfully
      Given User is at the "Forgot Password Page"
      When User input <userID>, <Email>
      And User click on the "Submit" button
      Then User can NOT reset password
      And There is a <message>

        Examples:
          | userID | Email                             | message                          |
          |        |                                   | Please input user name and Email |
          | chauvu | vuminhchaucyberlogictec@gamilcom  | Invalid User name and Email      |
          | chauv  | vuminhchaucyberlogictec@gamil.com | Invalid User name and Email      |
          | chauv  | vuminhchaucyberlogictec@gamilcom  | Invalid User name and Email      |                   

